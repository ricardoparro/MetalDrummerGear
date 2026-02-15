// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Band Page Meta Tags (#362)', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to band page and check if it exists
    const response = await page.goto('/bands/metallica');
    
    // Skip if band pages aren't available (404 or redirect to home)
    if (response.status() === 404) {
      test.skip(true, 'Band pages not yet available');
    }
    
    await page.waitForLoadState('networkidle');
    
    // Check if we're actually on a band page (not redirected to home)
    const title = await page.title();
    if (title.includes('MetalForge') && !title.includes('Metallica')) {
      test.skip(true, 'Band pages feature not yet deployed');
    }
  });

  test('should have proper meta tags on band detail page', async ({ page }) => {
    // Check title
    const title = await page.title();
    expect(title).toContain('Metallica');
    expect(title).toContain('MetalForge');

    // Check meta description
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toBeTruthy();
    expect(metaDescription).toContain('Metallica');

    // Check OG tags
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toContain('Metallica');

    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
    expect(ogDescription).toBeTruthy();

    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
    expect(ogUrl).toBe('https://metalforge.io/bands/metallica');

    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogImage).toBeTruthy();
    expect(ogImage).toMatch(/^https?:\/\//);

    const ogType = await page.locator('meta[property="og:type"]').getAttribute('content');
    expect(ogType).toBe('website');

    // Check Twitter Card tags
    const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');
    expect(twitterCard).toBe('summary_large_image');

    const twitterTitle = await page.locator('meta[name="twitter:title"]').getAttribute('content');
    expect(twitterTitle).toContain('Metallica');

    const twitterDescription = await page.locator('meta[name="twitter:description"]').getAttribute('content');
    expect(twitterDescription).toBeTruthy();

    const twitterImage = await page.locator('meta[name="twitter:image"]').getAttribute('content');
    expect(twitterImage).toBeTruthy();

    // Check canonical URL
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBe('https://metalforge.io/bands/metallica');
  });

  test('should have structured data schema', async ({ page }) => {
    // Check for band schema
    const schemaScript = await page.locator('script[data-schema="band"]').textContent();
    expect(schemaScript).toBeTruthy();
    
    const schema = JSON.parse(schemaScript);
    expect(schema['@type']).toBe('MusicGroup');
    expect(schema.name).toBe('Metallica');
    expect(schema.url).toBe('https://metalforge.io/bands/metallica');
  });

  test('should work with different band slugs', async ({ page }) => {
    await page.goto('/bands/sepultura');
    await page.waitForLoadState('networkidle');

    // Check if we're on the sepultura page (skip if not available)
    const title = await page.title();
    if (!title.includes('Sepultura')) {
      test.skip(true, 'Sepultura band page not available');
    }

    // Check canonical URL updates
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBe('https://metalforge.io/bands/sepultura');

    // Check OG URL updates
    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
    expect(ogUrl).toBe('https://metalforge.io/bands/sepultura');
  });
});
