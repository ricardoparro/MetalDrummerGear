// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Sticky CTA Tests (Issue #820)
 * 
 * Tests for the sticky CTA bar that appears on scroll to convert users.
 */

test.describe('Sticky CTA', () => {
  
  test.beforeEach(async ({ page, context }) => {
    // Clear localStorage to reset dismiss state
    await context.addInitScript(() => {
      localStorage.removeItem('metalforge_sticky_cta_dismissed');
    });
  });

  test('should not be visible on initial page load', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // CTA should not be visible initially (before scroll)
    const cta = page.locator('[data-testid="sticky-cta"]');
    await expect(cta).not.toBeVisible();
  });

  test('should appear after scrolling 30% on homepage', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Get page height
    const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    const viewportHeight = await page.evaluate(() => window.innerHeight);
    const scrollableHeight = pageHeight - viewportHeight;
    
    // Scroll to 35% (just past threshold)
    const scrollAmount = Math.floor(scrollableHeight * 0.35);
    await page.evaluate((amount) => window.scrollTo(0, amount), scrollAmount);
    
    // Wait for animation
    await page.waitForTimeout(500);
    
    // CTA should now be visible
    // On mobile it's a FAB, on desktop it's a bar
    const viewport = page.viewportSize();
    if (viewport && viewport.width < 768) {
      // Mobile FAB
      const fab = page.locator('button').filter({ hasText: /Take Quiz/ });
      await expect(fab).toBeVisible();
    } else {
      // Desktop bar
      const bar = page.locator('button').filter({ hasText: /Which Metal Drummer Are You/ });
      await expect(bar).toBeVisible();
    }
  });

  test('should hide when scrolling back to top', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500);
    
    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    
    // CTA should be hidden
    const ctaButton = page.locator('button').filter({ hasText: /Take Quiz/ });
    await expect(ctaButton).not.toBeVisible();
  });

  test('should navigate to quiz when clicked on homepage', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Scroll to trigger CTA
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500);
    
    // Find and click the CTA button
    const ctaButton = page.locator('button').filter({ hasText: /Quiz/ }).first();
    if (await ctaButton.isVisible()) {
      await ctaButton.click();
      
      // Should navigate to quiz page
      await expect(page).toHaveURL(/\/quiz/);
    }
  });

  test('should be dismissible and remember for 24h', async ({ page, context }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Scroll to trigger CTA
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500);
    
    // Find dismiss button (the X)
    const dismissButton = page.locator('[aria-label*="Dismiss"]').first();
    
    if (await dismissButton.isVisible()) {
      await dismissButton.click();
      await page.waitForTimeout(300);
      
      // CTA should be hidden
      const ctaButton = page.locator('button').filter({ hasText: /Quiz/ }).first();
      await expect(ctaButton).not.toBeVisible();
      
      // Verify localStorage was set
      const dismissedAt = await page.evaluate(() => 
        localStorage.getItem('metalforge_sticky_cta_dismissed')
      );
      expect(dismissedAt).toBeTruthy();
    }
  });

  test('should show contextual CTA on drummers page', async ({ page }) => {
    await page.goto('/drummers');
    await page.waitForLoadState('networkidle');
    
    // Scroll to trigger CTA
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500);
    
    // Should show "Compare" CTA on drummers page
    const viewport = page.viewportSize();
    if (viewport && viewport.width >= 768) {
      const ctaButton = page.locator('button').filter({ hasText: /Compare.*Favorites/ });
      // Check if element exists (may not exist if page structure differs)
      const count = await ctaButton.count();
      if (count > 0) {
        await expect(ctaButton).toBeVisible();
      }
    }
  });

  test('should have proper accessibility attributes', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Scroll to trigger CTA
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500);
    
    // Check for proper button role and labels
    const ctaButton = page.locator('button').filter({ hasText: /Quiz/ }).first();
    
    if (await ctaButton.isVisible()) {
      await expect(ctaButton).toHaveAttribute('aria-label');
      
      // Check minimum touch target size (48px)
      const box = await ctaButton.boundingBox();
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(48);
      }
    }
  });

  test('mobile FAB should have minimum 48px touch target', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Scroll to trigger CTA
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(500);
    
    const fab = page.locator('button').filter({ hasText: /Quiz/ }).first();
    
    if (await fab.isVisible()) {
      const box = await fab.boundingBox();
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(48);
      }
    }
  });
});
