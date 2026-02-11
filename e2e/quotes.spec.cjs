const { test, expect } = require('@playwright/test');
const BASE_URL = process.env.BASE_URL || 'https://metalforge.io';

/**
 * Add CI cache-busting parameter to URLs for consistent test behavior.
 * Prevents cached responses from affecting test results in CI environments.
 */
function ciParam(url) {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}ci=${Date.now()}`;
}

test.describe('Quotes Feature', () => {
  test('quotes API returns data', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/quotes`);
    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    expect(data.quotes).toBeDefined();
    expect(data.quotes.length).toBeGreaterThan(0);
    
    // Each quote should have required fields
    const quote = data.quotes[0];
    expect(quote.text).toBeDefined();
    expect(quote.drummer).toBeDefined();
    expect(quote.drummer.name).toBeDefined();
  });

  test('quotes API random endpoint works', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/quotes/random`);
    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    expect(data.text).toBeDefined();
    // API returns drummerName/drummerBand as flat fields
    expect(data.drummerName || data.drummer).toBeDefined();
  });

  test('quotes API topics endpoint works', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/quotes/topics`);
    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    // API returns array directly or wrapped in {topics: [...]}
    const topics = Array.isArray(data) ? data : data.topics;
    expect(topics).toBeDefined();
    expect(Array.isArray(topics)).toBeTruthy();
  });

  test('drummer detail includes quotes', async ({ request }) => {
    // Get a drummer that should have quotes (Lars Ulrich = id 1)
    const response = await request.get(`${BASE_URL}/api/drummers/1`);
    expect(response.ok()).toBeTruthy();
    
    const drummer = await response.json();
    expect(drummer.quotes).toBeDefined();
    expect(Array.isArray(drummer.quotes)).toBeTruthy();
    expect(drummer.quotes.length).toBeGreaterThan(0);
    
    // Each quote should have text
    expect(drummer.quotes[0].text).toBeDefined();
  });

  test('quotes section visible on drummer page', async ({ page }) => {
    // Go to Lars Ulrich page
    await page.goto('/drummer/1', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Look for "Notable Quotes" section
    const quotesSection = page.locator('text=Notable Quotes');
    await expect(quotesSection).toBeVisible({ timeout: 10000 });
  });

  test('quotes section expands on click', async ({ page }) => {
    await page.goto('/drummer/1', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Find and click the Notable Quotes header
    const quotesHeader = page.locator('text=Notable Quotes');
    await expect(quotesHeader).toBeVisible({ timeout: 10000 });
    await quotesHeader.click();
    
    // After expanding, quote text should be visible
    // Lars has quote: "I'm not the best drummer in the world..."
    const quoteText = page.locator('text=best drummer');
    await expect(quoteText).toBeVisible({ timeout: 5000 });
  });

  test('multiple drummers have quotes displayed', async ({ page, request }) => {
    // Increase timeout for multi-page iteration test
    test.setTimeout(60000);
    
    // Get drummers with quotes from the quotes API
    const quotesResponse = await request.get(`${BASE_URL}/api/quotes`);
    const quotesData = await quotesResponse.json();
    
    // Get unique drummer IDs that have quotes
    const drummerIds = [...new Set(quotesData.quotes.map(q => q.drummer.id))].slice(0, 3);
    
    const errors = [];
    for (const id of drummerIds) {
      // Use 'load' instead of 'networkidle' - GA scripts prevent networkidle from settling
      await page.goto(`/drummer/${id}`, { waitUntil: 'load' });
      await page.waitForTimeout(2500);
      
      const hasQuotesSection = await page.locator('text=Notable Quotes').isVisible({ timeout: 5000 }).catch(() => false);
      if (!hasQuotesSection) {
        const drummerResponse = await request.get(`${BASE_URL}/api/drummers/${id}`);
        const drummer = await drummerResponse.json();
        errors.push(drummer.name);
      }
    }
    
    expect(errors, `Missing quotes section for: ${errors.join(', ')}`).toHaveLength(0);
  });
});
