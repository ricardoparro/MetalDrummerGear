// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * News Page E2E Tests (Issue #514 - Phase 6)
 * Tests for the dedicated /news page with navigation from homepage
 */

test.describe('News Page', () => {
  test.beforeEach(async ({ page }) => {
    // Start at homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('can navigate to news page from homepage', async ({ page }) => {
    // Wait for the page content to load (action buttons render after data loads)
    await page.waitForSelector('text=Metal Drummer Gear', { timeout: 15000 });
    await page.waitForLoadState('networkidle');
    
    // Wait for the action buttons section to be visible (it renders after the hero section)
    await page.waitForSelector('text=Compare Drummers', { timeout: 15000 });
    
    // Scroll down to find the Metal News button (it's in the action buttons section)
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.waitForTimeout(500);
    
    // Click on the Metal News button - use text selector as React Native Web button roles may differ
    // Use .first() to target the action button, not any other "Metal News" text on the page
    const newsButton = page.getByText('📰 Metal News').first();
    await expect(newsButton).toBeVisible({ timeout: 10000 });
    await newsButton.click();
    
    // Should be on /news page
    await expect(page).toHaveURL(/\/news/);
    
    // Should see the back button indicating we're on news page
    await expect(page.getByText('← Back to Home')).toBeVisible();
  });

  test('news page loads with proper structure', async ({ page }) => {
    // Navigate directly to /news
    await page.goto('/news');
    await page.waitForLoadState('networkidle');
    
    // Should have header
    await expect(page.getByRole('heading', { name: /Metal News/i })).toBeVisible();
    await expect(page.getByText('Latest news about drummers and bands')).toBeVisible();
    
    // Should have filter chips (use .first() since sources also appear in news cards)
    await expect(page.getByText('All Sources')).toBeVisible();
    await expect(page.getByText('Blabbermouth').first()).toBeVisible();
    await expect(page.getByText('Loudwire').first()).toBeVisible();
    await expect(page.getByText('Metal Injection').first()).toBeVisible();
    
    // Should have back button
    await expect(page.getByText('← Back to Home')).toBeVisible();
  });

  test('source filter chips work', async ({ page }) => {
    await page.goto('/news');
    await page.waitForLoadState('networkidle');
    
    // Click Blabbermouth filter (use .first() to target the filter chip, not news card sources)
    const blabbermouthFilter = page.getByText('Blabbermouth').first();
    await blabbermouthFilter.click();
    
    // Wait for filter to apply
    await page.waitForTimeout(500);
    
    // Click All Sources to reset
    const allSourcesFilter = page.getByText('All Sources');
    await allSourcesFilter.click();
    
    // Filter interaction should work without errors
    await expect(page).toHaveURL(/\/news/);
  });

  test('back button navigates to home', async ({ page }) => {
    await page.goto('/news');
    await page.waitForLoadState('networkidle');
    
    // Click back button
    await page.getByText('← Back to Home').click();
    
    // Should be on homepage
    await expect(page).toHaveURL('/');
  });

  test('news page has SEO meta tags', async ({ page }) => {
    await page.goto('/news');
    await page.waitForLoadState('networkidle');
    
    // Wait for page to fully render and SEO to update
    await page.waitForTimeout(1000);
    
    // Check title (with retry for async update)
    await expect(page).toHaveTitle(/Metal News/, { timeout: 15000 });
    
    // Check meta description
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toContain('metal drummers');
    
    // Check Open Graph tags
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toContain('Metal News');
    
    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
    expect(ogUrl).toBe('https://metalforge.io/news');
    
    // Check canonical URL
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBe('https://metalforge.io/news');
  });

  test('news page has CollectionPage schema', async ({ page }) => {
    await page.goto('/news');
    await page.waitForLoadState('networkidle');
    
    // Check for JSON-LD schema
    const schema = await page.locator('script#news-page-schema').textContent();
    expect(schema).toBeTruthy();
    
    const schemaData = JSON.parse(schema);
    expect(schemaData['@type']).toBe('CollectionPage');
    expect(schemaData.name).toBe('Metal News');
    expect(schemaData.url).toBe('https://metalforge.io/news');
  });

  test('attribution footer is present', async ({ page }) => {
    await page.goto('/news');
    await page.waitForLoadState('networkidle');
    
    // Scroll to bottom to ensure attribution is visible
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);
    
    // Should have attribution text
    await expect(page.getByText('News aggregated from Blabbermouth, Loudwire, and Metal Injection')).toBeVisible();
  });
});
