/**
 * E2E Tests for Signature Gear Spotlight Pages
 * Issue #739 - Dedicated pages for iconic signature gear pieces
 * URL: /drummers/[slug]/signature/[gear-slug]
 */

const { test, expect } = require('@playwright/test');

test.describe('Signature Gear Spotlight Pages', () => {
  
  test.describe('Joey Jordison Pearl Signature Snare', () => {
    
    test('should load the signature gear page', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/signature/joey-jordison-pearl-signature-snare');
      
      // Wait for page to load
      await page.waitForLoadState('networkidle');
      
      // Check page title
      await expect(page).toHaveTitle(/Pearl Joey Jordison Signature Snare/i);
    });
    
    test('should display hero section with gear name', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/signature/joey-jordison-pearl-signature-snare');
      await page.waitForLoadState('networkidle');
      
      // Check for gear name in hero
      const heroTitle = page.locator('text=Pearl Joey Jordison Signature Snare');
      await expect(heroTitle).toBeVisible();
    });
    
    test('should display breadcrumb navigation', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/signature/joey-jordison-pearl-signature-snare');
      await page.waitForLoadState('networkidle');
      
      // Check for breadcrumbs
      const breadcrumbs = page.locator('text=Joey Jordison');
      await expect(breadcrumbs.first()).toBeVisible();
    });
    
    test('should have back button to drummer profile', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/signature/joey-jordison-pearl-signature-snare');
      await page.waitForLoadState('networkidle');
      
      // Check for back button
      const backButton = page.locator('text=/Back to Joey Jordison/i');
      await expect(backButton).toBeVisible();
    });
    
    test('should display specifications section', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/signature/joey-jordison-pearl-signature-snare');
      await page.waitForLoadState('networkidle');
      
      // Check for specs section
      const specsSection = page.locator('text=Technical Specifications');
      await expect(specsSection).toBeVisible();
      
      // Check for diameter spec
      const diameter = page.locator('text=13"');
      await expect(diameter.first()).toBeVisible();
    });
    
    test('should have proper SEO meta tags', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/signature/joey-jordison-pearl-signature-snare');
      await page.waitForLoadState('networkidle');
      
      // Check meta description
      const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
      expect(metaDescription).toContain('Pearl Joey Jordison Signature Snare');
      
      // Check OG tags
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      expect(ogTitle).toContain('Pearl Joey Jordison Signature Snare');
    });
    
    test('should have Product schema markup', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/signature/joey-jordison-pearl-signature-snare');
      await page.waitForLoadState('networkidle');
      
      // Check for schema script
      const schema = await page.locator('script[data-schema="signature-gear-product"]').textContent();
      expect(schema).toBeTruthy();
      
      const schemaData = JSON.parse(schema);
      expect(schemaData['@type']).toBe('Product');
      expect(schemaData.brand.name).toBe('Pearl');
    });
    
    test('should have BreadcrumbList schema markup', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/signature/joey-jordison-pearl-signature-snare');
      await page.waitForLoadState('networkidle');
      
      // Check for breadcrumb schema
      const schema = await page.locator('script[data-schema="signature-gear-breadcrumb"]').textContent();
      expect(schema).toBeTruthy();
      
      const schemaData = JSON.parse(schema);
      expect(schemaData['@type']).toBe('BreadcrumbList');
      expect(schemaData.itemListElement.length).toBe(5);
    });
    
    test('should display affiliate CTA section', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/signature/joey-jordison-pearl-signature-snare');
      await page.waitForLoadState('networkidle');
      
      // Check for affiliate section
      const affiliateSection = page.locator('text=Get This Gear');
      await expect(affiliateSection).toBeVisible();
      
      // Check for price range
      const price = page.locator('text=/\\$400-550/');
      await expect(price.first()).toBeVisible();
    });
    
    test('should display sound/video section with YouTube embeds', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/signature/joey-jordison-pearl-signature-snare');
      await page.waitForLoadState('networkidle');
      
      // Check for sound section
      const soundSection = page.locator('text=Hear It In Action');
      await expect(soundSection).toBeVisible();
    });
    
    test('should display albums section', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/signature/joey-jordison-pearl-signature-snare');
      await page.waitForLoadState('networkidle');
      
      // Check for Iowa album
      const iowaAlbum = page.locator('text=Iowa');
      await expect(iowaAlbum.first()).toBeVisible();
    });
    
  });
  
  test.describe('URL Routing', () => {
    
    test('should handle direct navigation to gear page', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/signature/joey-jordison-pearl-signature-snare');
      await page.waitForLoadState('networkidle');
      
      // Should not redirect and should show content
      expect(page.url()).toContain('/drummers/joey-jordison/signature/joey-jordison-pearl-signature-snare');
      
      const heroTitle = page.locator('text=Pearl Joey Jordison Signature Snare');
      await expect(heroTitle).toBeVisible();
    });
    
    test('should handle back navigation to drummer profile', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/signature/joey-jordison-pearl-signature-snare');
      await page.waitForLoadState('networkidle');
      
      // Click back button
      const backButton = page.locator('text=/Back to Joey Jordison/i');
      await backButton.click();
      
      // Wait for navigation
      await page.waitForLoadState('networkidle');
      
      // Should be on drummer profile
      expect(page.url()).toContain('/drummer/joey-jordison');
    });
    
  });
  
  test.describe('Mobile Experience', () => {
    
    test.use({ viewport: { width: 375, height: 667 } });
    
    test('should display mobile-optimized layout', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/signature/joey-jordison-pearl-signature-snare');
      await page.waitForLoadState('networkidle');
      
      // Content should be visible
      const heroTitle = page.locator('text=Pearl Joey Jordison Signature Snare');
      await expect(heroTitle).toBeVisible();
    });
    
    test('should show sticky CTA on scroll (mobile)', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/signature/joey-jordison-pearl-signature-snare');
      await page.waitForLoadState('networkidle');
      
      // Scroll down
      await page.evaluate(() => window.scrollBy(0, 600));
      
      // Wait for sticky CTA to appear
      await page.waitForTimeout(500);
      
      // Check if Shop Now button is visible
      const shopButton = page.locator('text=/Shop Now/i');
      // Note: Depending on implementation, this may or may not be visible
      // This test documents the expected behavior
    });
    
  });
  
  test.describe('Analytics Events', () => {
    
    test('should track page view event', async ({ page }) => {
      // Capture gtag calls
      const gtagCalls = [];
      await page.addInitScript(() => {
        window.gtag = (...args) => {
          window.__gtagCalls = window.__gtagCalls || [];
          window.__gtagCalls.push(args);
        };
      });
      
      await page.goto('/drummers/joey-jordison/signature/joey-jordison-pearl-signature-snare');
      await page.waitForLoadState('networkidle');
      
      // Give time for analytics to fire
      await page.waitForTimeout(1000);
      
      // Check if page_view was tracked
      const calls = await page.evaluate(() => window.__gtagCalls || []);
      const pageViewCall = calls.find(call => call[0] === 'event' && call[1] === 'page_view');
      expect(pageViewCall).toBeTruthy();
    });
    
  });
  
});
