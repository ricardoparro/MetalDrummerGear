const { test, expect } = require('@playwright/test');
const BASE_URL = process.env.BASE_URL || 'https://metalforge.io';

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
    expect(data.drummer).toBeDefined();
  });

  test('quotes API topics endpoint works', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/quotes/topics`);
    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    expect(data.topics).toBeDefined();
    expect(Array.isArray(data.topics)).toBeTruthy();
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
    // Get drummers with quotes from the quotes API
    const quotesResponse = await request.get(`${BASE_URL}/api/quotes`);
    const quotesData = await quotesResponse.json();
    
    // Get unique drummer IDs that have quotes
    const drummerIds = [...new Set(quotesData.quotes.map(q => q.drummer.id))].slice(0, 3);
    
    const errors = [];
    for (const id of drummerIds) {
      await page.goto(`/drummer/${id}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      
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
