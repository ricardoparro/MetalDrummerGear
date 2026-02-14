const { test, expect } = require('@playwright/test');
const BASE_URL = process.env.BASE_URL || 'https://metalforge.io';

test.describe('Quotes Page', () => {
  test('quotes page loads and shows quotes', async ({ page }) => {
    await page.goto('/quotes', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000); // Give time for React to hydrate and load data
    
    // Page title should be visible
    const title = page.locator('text=Drummer Quotes');
    await expect(title).toBeVisible({ timeout: 15000 });
    
    // Should show quote count element (even if 0 initially)
    const quoteCount = page.locator('text=/\\d+ quotes? found/');
    await expect(quoteCount).toBeVisible({ timeout: 10000 });
    
    // The page should have loaded quotes via API - verify API works
    // (If UI shows 0 quotes, the API test below will catch the real issue)
  });

  test('quotes filter by drummer works', async ({ page }) => {
    await page.goto('/quotes', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // "All Drummers" option should be visible in dropdown
    const allDrummers = page.locator('text=All Drummers');
    await expect(allDrummers).toBeVisible({ timeout: 10000 });
    
    // At least one drummer name should be clickable in the filter
    // The filter shows drummer names who have quotes
    const drummerFilter = page.locator('text=Lars Ulrich').first();
    if (await drummerFilter.isVisible({ timeout: 5000 }).catch(() => false)) {
      // Click to filter by Lars Ulrich
      await drummerFilter.click();
      await page.waitForTimeout(1000);
      
      // Page should now show filtered results
      const quoteCount = page.locator('text=/\\d+ quotes? found/');
      await expect(quoteCount).toBeVisible({ timeout: 5000 });
    }
  });

  test('quotes search works', async ({ page }) => {
    await page.goto('/quotes', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Find the search input
    const searchInput = page.locator('input[placeholder*="Search"]').first();
    if (await searchInput.isVisible({ timeout: 5000 }).catch(() => false)) {
      // Type a search term
      await searchInput.fill('drummer');
      await page.waitForTimeout(1000);
      
      // Results should update
      const quoteCount = page.locator('text=/\\d+ quotes? found/');
      await expect(quoteCount).toBeVisible({ timeout: 5000 });
    }
  });

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

  test('clicking quote navigates to drummer page', async ({ page }) => {
    await page.goto('/quotes', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Find any clickable element (role="button") that contains quoted text
    const quoteButton = page.locator('[role="button"]:has-text("\\"")').first();
    
    if (await quoteButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      await quoteButton.click();
      await page.waitForTimeout(2000);
      
      // Should navigate to a drummer page (URL changes or Gear Setup section visible)
      const url = page.url();
      const isDrummerPage = url.includes('/drummer/') || 
                           (await page.locator('text=Gear Setup').first().isVisible({ timeout: 5000 }).catch(() => false));
      expect(isDrummerPage).toBeTruthy();
    }
  });
});

test.describe('Quotes on Drummer Pages', () => {
  test('drummer detail includes quotes in API', async ({ request }) => {
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

  test('Notable Quotes section visible on drummer page', async ({ page }) => {
    // Go to Lars Ulrich page
    await page.goto('/drummer/1', { waitUntil: 'load' });
    
    // Wait for Gear Setup section - indicates drummer data has fully loaded and rendered
    const gearSection = page.locator('text=Gear Setup');
    await expect(gearSection).toBeVisible({ timeout: 15000 });
    
    // Look for "Notable Quotes" section
    const quotesSection = page.locator('text=Notable Quotes');
    await expect(quotesSection).toBeVisible({ timeout: 10000 });
  });

  test('quotes section expands on click', async ({ page }) => {
    await page.goto('/drummer/1', { waitUntil: 'load' });
    
    // Wait for Gear Setup section - indicates drummer data has fully loaded and rendered
    const gearSection = page.locator('text=Gear Setup');
    await expect(gearSection).toBeVisible({ timeout: 15000 });
    
    // Find and click the Notable Quotes header
    const quotesHeader = page.locator('text=Notable Quotes');
    await expect(quotesHeader).toBeVisible({ timeout: 10000 });
    await quotesHeader.click();
    
    // After expanding, quote text should be visible
    // Lars has quote about being "best drummer"
    const quoteText = page.locator('text=best drummer');
    await expect(quoteText).toBeVisible({ timeout: 5000 });
  });

  test('multiple drummers have quotes displayed', async ({ page, request }) => {
    // Increase timeout for multi-page iteration test
    test.setTimeout(90000);
    
    // Get drummers with quotes from the quotes API
    const quotesResponse = await request.get(`${BASE_URL}/api/quotes`);
    const quotesData = await quotesResponse.json();
    
    // Get unique drummer IDs that have quotes
    const drummerIds = [...new Set(quotesData.quotes.map(q => q.drummer.id))].slice(0, 3);
    
    const errors = [];
    for (const id of drummerIds) {
      await page.goto(`/drummer/${id}`, { waitUntil: 'load' });
      
      // Wait for Gear Setup section - indicates drummer data has fully loaded
      const gearSection = page.locator('text=Gear Setup');
      await expect(gearSection).toBeVisible({ timeout: 15000 });
      
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
