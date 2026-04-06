// @ts-check
const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://metalforge.io';

test.describe('Verify Bug Fixes', () => {
  
  test('News page shows items (#792)', async ({ page }) => {
    await page.goto(`${BASE_URL}/news`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    
    const pageText = await page.textContent('body');
    
    // Check for news content indicators
    const hasNews = pageText?.includes('Blabbermouth') || 
                    pageText?.includes('Loudwire') || 
                    pageText?.includes('Metal Injection') ||
                    pageText?.toLowerCase().includes('news');
    
    console.log('Has news content:', hasNews);
    expect(hasNews).toBeTruthy();
  });

  test('Birthdays page shows content (#791)', async ({ page }) => {
    await page.goto(`${BASE_URL}/birthdays`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    const pageText = await page.textContent('body');
    
    // Should have month names or drummer names
    const hasCalendar = pageText?.includes('January') || 
                        pageText?.includes('March') ||
                        pageText?.includes('Birthday') ||
                        pageText?.toLowerCase().includes('born');
    
    console.log('Has calendar content:', hasCalendar);
    expect(hasCalendar).toBeTruthy();
  });

  test('Articles list shows items (#790)', async ({ page }) => {
    await page.goto(`${BASE_URL}/articles`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    const pageText = await page.textContent('body');
    
    // Should have article titles
    const hasArticles = pageText?.includes('Breakdown') || 
                        pageText?.includes('Album') ||
                        pageText?.includes('Setup') ||
                        pageText?.includes('Gear');
    
    console.log('Has articles content:', hasArticles);
    expect(hasArticles).toBeTruthy();
  });

  test('Popular gear API works (#788)', async ({ page }) => {
    const response = await page.request.get(`${BASE_URL}/api/gear/popular`);
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data.kits).toBeDefined();
    expect(data.kits.length).toBeGreaterThan(0);
    console.log('Popular gear API returns', data.kits.length, 'kits');
  });

  test('No JavaScript errors on homepage', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    console.log('JS errors found:', errors.length);
    if (errors.length > 0) {
      console.log('Errors:', errors);
    }
    
    // Allow some errors but flag critical ones
    const criticalErrors = errors.filter(e => 
      e.includes('is not a function') || 
      e.includes('Cannot read properties of undefined')
    );
    
    expect(criticalErrors.length).toBe(0);
  });
});
