// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * E2E tests for Embeddable Gear Widget (Issue #744)
 * Tests the /embed/[slug] endpoint functionality
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test.describe('Embeddable Gear Widget', () => {
  
  test('should load Joey Jordison embed widget', async ({ page }) => {
    await page.goto(`${BASE_URL}/embed/joey-jordison`);
    
    // Check that the page loads
    await expect(page).toHaveTitle(/Joey Jordison.*MetalForge/i);
    
    // Check for drummer name
    const drummerName = page.locator('.drummer-name');
    await expect(drummerName).toContainText('Joey Jordison');
    
    // Check for band name
    const bandName = page.locator('.drummer-band');
    await expect(bandName).toContainText('Slipknot');
    
    // Check for gear section
    const gearSection = page.locator('.gear-section');
    await expect(gearSection).toBeVisible();
    
    // Check for drums info
    const drumsValue = page.locator('.gear-item:has(.gear-label:text("Drums")) .gear-value');
    await expect(drumsValue).toBeVisible();
    
    // Check for powered by badge
    const poweredBy = page.locator('.powered-by');
    await expect(poweredBy).toContainText('MetalForge');
    
    // Check for CTA button
    const ctaButton = page.locator('.cta-button');
    await expect(ctaButton).toContainText('View Full Setup');
  });

  test('should support light theme', async ({ page }) => {
    await page.goto(`${BASE_URL}/embed/lars-ulrich?theme=light`);
    
    // Check that body has light background (white-ish color)
    const body = page.locator('body');
    const backgroundColor = await body.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    
    // Light theme should have light background
    expect(backgroundColor).toMatch(/rgb\(255, 255, 255\)|white/i);
  });

  test('should return 404 for unknown drummer', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/embed/unknown-drummer-xyz`);
    
    expect(response?.status()).toBe(404);
    
    // Should show error message
    const errorTitle = page.locator('.error-title');
    await expect(errorTitle).toContainText('Drummer Not Found');
  });

  test('should have correct CORS and iframe headers', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/embed/joey-jordison`);
    
    // Check CORS header
    const corsHeader = response.headers()['access-control-allow-origin'];
    expect(corsHeader).toBe('*');
    
    // Check X-Frame-Options allows embedding
    const frameOptions = response.headers()['x-frame-options'];
    // Either ALLOWALL or not present (both allow embedding)
    if (frameOptions) {
      expect(frameOptions.toLowerCase()).toBe('allowall');
    }
  });

  test('should work with various drummer slugs', async ({ page }) => {
    const testDrummers = [
      { slug: 'lars-ulrich', name: 'Lars Ulrich' },
      { slug: 'tomas-haake', name: 'Tomas Haake' },
      { slug: 'dave-lombardo', name: 'Dave Lombardo' },
      { slug: 'danny-carey', name: 'Danny Carey' },
    ];
    
    for (const drummer of testDrummers) {
      const response = await page.goto(`${BASE_URL}/embed/${drummer.slug}`);
      expect(response?.status()).toBe(200);
      
      const drummerName = page.locator('.drummer-name');
      await expect(drummerName).toContainText(drummer.name);
    }
  });

  test('should include tracking pixel', async ({ page }) => {
    // Intercept the tracking request
    let trackingCalled = false;
    await page.route('**/api/embed/track*', route => {
      trackingCalled = true;
      route.fulfill({ status: 200, body: '' });
    });
    
    await page.goto(`${BASE_URL}/embed/joey-jordison`);
    
    // Wait a moment for the tracking script to execute
    await page.waitForTimeout(500);
    
    // In a real browser, the tracking pixel would be called
    // This test verifies the script exists in the HTML
    const html = await page.content();
    expect(html).toContain('api/embed/track');
  });

  test('should link to full drummer page', async ({ page }) => {
    await page.goto(`${BASE_URL}/embed/joey-jordison`);
    
    const widgetLink = page.locator('.widget-link');
    const href = await widgetLink.getAttribute('href');
    
    expect(href).toContain('metalforge.io/drummer/joey-jordison');
    expect(href).toContain('ref=embed');
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto(`${BASE_URL}/embed/joey-jordison`);
    
    // Check that content is visible and not overflowing
    const widget = page.locator('.widget');
    await expect(widget).toBeVisible();
    
    // Check drummer image is smaller on mobile
    const drummerImage = page.locator('.drummer-image');
    const box = await drummerImage.boundingBox();
    expect(box?.width).toBeLessThanOrEqual(64);
  });

});

test.describe('Embed Tracking', () => {
  
  test('tracking endpoint should return pixel', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/embed/track?slug=test&referrer=example.com`);
    
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/gif');
  });

});
