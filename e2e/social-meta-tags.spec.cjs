/**
 * E2E Tests for Social Meta Tags
 * Issue #769: Add Rich Social Meta Tags (Open Graph + Twitter Cards) to All Pages
 * 
 * Tests that:
 * 1. Homepage has proper OG and Twitter meta tags
 * 2. Dynamic OG image endpoints work correctly
 * 3. Meta API returns valid HTML for crawlers
 */

const { test, expect } = require('@playwright/test');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const PROD_URL = 'https://metalforge.io';

test.describe('Social Meta Tags', () => {
  
  test.describe('Homepage Meta Tags', () => {
    test('should have Open Graph meta tags', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      
      // Check OG title
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      expect(ogTitle).toContain('MetalForge');
      
      // Check OG description
      const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
      expect(ogDescription).toBeTruthy();
      expect(ogDescription.length).toBeGreaterThan(50);
      
      // Check OG image
      const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
      expect(ogImage).toContain('og-image.png');
      
      // Check OG type
      const ogType = await page.locator('meta[property="og:type"]').getAttribute('content');
      expect(ogType).toBe('website');
      
      // Check OG site name
      const ogSiteName = await page.locator('meta[property="og:site_name"]').getAttribute('content');
      expect(ogSiteName).toBe('MetalForge');
    });
    
    test('should have Twitter Card meta tags', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      
      // Check Twitter card type
      const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');
      expect(twitterCard).toBe('summary_large_image');
      
      // Check Twitter site handle
      const twitterSite = await page.locator('meta[name="twitter:site"]').getAttribute('content');
      expect(twitterSite).toBe('@MetalDrumGear');
      
      // Check Twitter title
      const twitterTitle = await page.locator('meta[name="twitter:title"]').getAttribute('content');
      expect(twitterTitle).toContain('MetalForge');
      
      // Check Twitter image
      const twitterImage = await page.locator('meta[name="twitter:image"]').getAttribute('content');
      expect(twitterImage).toContain('og-image.png');
    });
    
    test('should have image dimensions for OG', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      
      // Check OG image dimensions
      const ogImageWidth = await page.locator('meta[property="og:image:width"]').getAttribute('content');
      const ogImageHeight = await page.locator('meta[property="og:image:height"]').getAttribute('content');
      
      expect(ogImageWidth).toBe('1200');
      expect(ogImageHeight).toBe('630');
    });
  });
  
  test.describe('OG Image API Endpoints', () => {
    test('should generate homepage OG image', async ({ request }) => {
      const response = await request.get('/api/og');
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toContain('image/png');
    });
    
    test('should generate drummer OG image', async ({ request }) => {
      const response = await request.get('/api/og/drummer?slug=joey-jordison');
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toContain('image/png');
    });
    
    test('should generate stats OG image', async ({ request }) => {
      const response = await request.get('/api/og/stats');
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toContain('image/png');
    });
    
    test('should generate tools OG image', async ({ request }) => {
      const response = await request.get('/api/og/tools');
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toContain('image/png');
    });
    
    test('should generate quiz OG image', async ({ request }) => {
      const response = await request.get('/api/og/quiz?drummer=lars-ulrich&match=85');
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toContain('image/png');
    });
  });
  
  test.describe('Meta API for Crawlers', () => {
    test('should return HTML with meta tags for homepage', async ({ request }) => {
      const response = await request.get('/api/meta?path=/');
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toContain('text/html');
      
      const html = await response.text();
      expect(html).toContain('og:title');
      expect(html).toContain('twitter:card');
      expect(html).toContain('MetalForge');
    });
    
    test('should return HTML with drummer meta tags', async ({ request }) => {
      const response = await request.get('/api/meta/joey-jordison');
      expect(response.status()).toBe(200);
      
      const html = await response.text();
      expect(html).toContain('Joey Jordison');
      expect(html).toContain('Slipknot');
      expect(html).toContain('og:type');
    });
    
    test('should return HTML with quiz meta tags', async ({ request }) => {
      const response = await request.get('/api/meta/quiz');
      expect(response.status()).toBe(200);
      
      const html = await response.text();
      expect(html).toContain('Which Legendary Metal Drummer');
      expect(html).toContain('quiz');
    });
    
    test('should return HTML with stats meta tags', async ({ request }) => {
      const response = await request.get('/api/meta/stats');
      expect(response.status()).toBe(200);
      
      const html = await response.text();
      expect(html).toContain('Statistics');
      expect(html).toContain('60+');
    });
  });
  
  test.describe('Card API for Social Sharing', () => {
    test('should generate Twitter format card', async ({ request }) => {
      const response = await request.get('/api/card/joey-jordison?format=twitter');
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toContain('image/png');
    });
    
    test('should generate Instagram format card', async ({ request }) => {
      const response = await request.get('/api/card/lars-ulrich');
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toContain('image/png');
    });
  });
});

test.describe('Client-side Meta Tag Updates', () => {
  test('should update meta tags on navigation to drummer page', async ({ page }) => {
    // Start on homepage
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Initial homepage meta
    let ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toContain('MetalForge');
    
    // Navigate to a drummer page
    await page.click('text=Lars Ulrich');
    await page.waitForURL(/lars-ulrich|drummer/, { timeout: 10000 });
    
    // Wait for meta tags to update
    await page.waitForTimeout(500);
    
    // Check updated meta tags
    ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toContain('Lars Ulrich');
  });
  
  test('should update meta tags on navigation to quiz', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Navigate to quiz
    await page.click('text=Take the Quiz');
    await page.waitForURL(/quiz/, { timeout: 10000 });
    
    // Wait for meta update
    await page.waitForTimeout(500);
    
    // Check quiz meta
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle.toLowerCase()).toContain('quiz');
  });
});
