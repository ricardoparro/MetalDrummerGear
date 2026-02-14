// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * E2E Tests for BPM Calculator Feature (Issue #342)
 * Tests the tap BPM calculator and song database
 */

test.describe('BPM Calculator Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to BPM calculator page
    await page.goto('/tools/bpm');
    // Wait for the page to load
    await page.waitForSelector('text=BPM Tap Calculator', { timeout: 10000 });
  });

  test('should display BPM calculator page with title', async ({ page }) => {
    await expect(page.locator('text=BPM Tap Calculator')).toBeVisible();
    await expect(page.locator('text=Tap to find the BPM')).toBeVisible();
  });

  test('should display tap area with instructions', async ({ page }) => {
    await expect(page.locator('[data-testid="bpm-tap-button"]')).toBeVisible();
    await expect(page.locator('text=Tap here')).toBeVisible();
    await expect(page.locator('text=or press spacebar')).toBeVisible();
  });

  test('should calculate BPM when tapping multiple times', async ({ page }) => {
    const tapButton = page.locator('[data-testid="bpm-tap-button"]');
    
    // Tap 5 times at ~120 BPM (500ms intervals)
    for (let i = 0; i < 5; i++) {
      await tapButton.click();
      await page.waitForTimeout(500);
    }
    
    // Should show a BPM value
    await expect(page.locator('text=/\\d+ BPM/')).toBeVisible();
  });

  test('should show matching songs after calculating BPM', async ({ page }) => {
    const tapButton = page.locator('[data-testid="bpm-tap-button"]');
    
    // Tap to get around 120 BPM
    for (let i = 0; i < 5; i++) {
      await tapButton.click();
      await page.waitForTimeout(500);
    }
    
    // Should show matching songs section
    await expect(page.locator('[data-testid="bpm-results-section"]')).toBeVisible();
    await expect(page.locator('text=/Songs around \\d+ BPM/')).toBeVisible();
  });

  test('should respond to spacebar key presses', async ({ page }) => {
    // Press spacebar 5 times
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Space');
      await page.waitForTimeout(500);
    }
    
    // Should show a BPM value
    await expect(page.locator('text=/\\d+ BPM/')).toBeVisible();
  });

  test('should reset calculator when clicking reset button', async ({ page }) => {
    const tapButton = page.locator('[data-testid="bpm-tap-button"]');
    
    // Tap a few times
    for (let i = 0; i < 3; i++) {
      await tapButton.click();
      await page.waitForTimeout(500);
    }
    
    // Click reset
    await page.click('[data-testid="bpm-reset-button"]');
    
    // Should show "Tap here" again
    await expect(page.locator('text=Tap here')).toBeVisible();
  });

  test('should reset calculator on Escape key', async ({ page }) => {
    const tapButton = page.locator('[data-testid="bpm-tap-button"]');
    
    // Tap a few times
    for (let i = 0; i < 3; i++) {
      await tapButton.click();
      await page.waitForTimeout(500);
    }
    
    // Press Escape
    await page.keyboard.press('Escape');
    
    // Should reset
    await expect(page.locator('text=Tap here')).toBeVisible();
  });

  test('should display BPM range quick links', async ({ page }) => {
    await expect(page.locator('text=Browse by BPM Range')).toBeVisible();
    await expect(page.locator('text=60-90 BPM')).toBeVisible();
    await expect(page.locator('text=90-120 BPM')).toBeVisible();
    await expect(page.locator('text=120-150 BPM')).toBeVisible();
    await expect(page.locator('text=150-180 BPM')).toBeVisible();
  });

  test('should navigate to BPM range page when clicking range', async ({ page }) => {
    // Click on a BPM range
    await page.click('text=150-180 BPM');
    
    // Should navigate to the range page
    await expect(page).toHaveURL(/\/bpm\/150-180/);
    await expect(page.locator('text=150-180 BPM')).toBeVisible();
  });

  test('should display song database stats', async ({ page }) => {
    await expect(page.locator('text=Song Database')).toBeVisible();
    await expect(page.locator('text=/\\d+ songs/')).toBeVisible();
  });

  test('should have correct SEO meta tags', async ({ page }) => {
    // Check page title
    const title = await page.title();
    expect(title).toContain('BPM');
    
    // Check meta description
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toContain('BPM');
  });

  test('should be mobile responsive', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Reload to apply responsive styles
    await page.reload();
    await page.waitForSelector('text=BPM Tap Calculator', { timeout: 10000 });
    
    // Page should still be functional
    await expect(page.locator('text=BPM Tap Calculator')).toBeVisible();
    await expect(page.locator('[data-testid="bpm-tap-button"]')).toBeVisible();
  });
});

test.describe('BPM Range Page', () => {
  test('should display songs in the BPM range', async ({ page }) => {
    await page.goto('/bpm/150-180');
    await page.waitForSelector('text=150-180 BPM', { timeout: 10000 });
    
    // Should show range title
    await expect(page.locator('text=150-180 BPM')).toBeVisible();
    await expect(page.locator('text=Fast thrash & death metal')).toBeVisible();
  });

  test('should group songs by drummer', async ({ page }) => {
    await page.goto('/bpm/150-180');
    await page.waitForSelector('text=150-180 BPM', { timeout: 10000 });
    
    // Should show drummer groups (at least one drummer icon)
    await expect(page.locator('text=/🥁/')).toBeVisible();
  });

  test('should link to BPM calculator', async ({ page }) => {
    await page.goto('/bpm/150-180');
    await page.waitForSelector('text=150-180 BPM', { timeout: 10000 });
    
    // Should have link to calculator
    await expect(page.locator('text=Tap to find BPM')).toBeVisible();
    
    // Click the link
    await page.click('text=Tap to find BPM');
    
    // Should navigate to calculator
    await expect(page).toHaveURL(/\/tools\/bpm/);
  });

  test('should show other BPM ranges', async ({ page }) => {
    await page.goto('/bpm/150-180');
    await page.waitForSelector('text=150-180 BPM', { timeout: 10000 });
    
    // Should show other ranges section
    await expect(page.locator('text=Other BPM Ranges')).toBeVisible();
    await expect(page.locator('text=90-120 BPM')).toBeVisible();
  });

  test('should handle invalid range gracefully', async ({ page }) => {
    await page.goto('/bpm/invalid-range');
    await page.waitForSelector('text=BPM Range Not Found', { timeout: 10000 });
    
    await expect(page.locator('text=BPM Range Not Found')).toBeVisible();
  });

  test('should navigate to drummer profile when clicking song', async ({ page }) => {
    await page.goto('/bpm/150-180');
    await page.waitForSelector('text=150-180 BPM', { timeout: 10000 });
    
    // Click on a drummer name (first one visible)
    const drummerLink = page.locator('[aria-label*="View"]').first();
    if (await drummerLink.isVisible()) {
      await drummerLink.click();
      // Should navigate to drummer profile
      await expect(page).toHaveURL(/\/drummer\//);
    }
  });
});

test.describe('BPM Navigation', () => {
  test('should navigate back to home from calculator', async ({ page }) => {
    await page.goto('/tools/bpm');
    await page.waitForSelector('text=BPM Tap Calculator', { timeout: 10000 });
    
    // Click back button
    await page.click('text=Back to Home');
    
    // Should be on home page
    await expect(page).toHaveURL('/');
  });

  test('should navigate back to home from range page', async ({ page }) => {
    await page.goto('/bpm/120-150');
    await page.waitForSelector('text=120-150 BPM', { timeout: 10000 });
    
    // Click back button
    await page.click('text=Back to Home');
    
    // Should be on home page
    await expect(page).toHaveURL('/');
  });

  test('should handle browser back/forward navigation', async ({ page }) => {
    // Start on home
    await page.goto('/');
    await page.waitForSelector('text=Metal Drummer Gear', { timeout: 10000 });
    
    // Navigate to BPM calculator
    await page.goto('/tools/bpm');
    await page.waitForSelector('text=BPM Tap Calculator', { timeout: 10000 });
    
    // Navigate to BPM range
    await page.click('text=150-180 BPM');
    await page.waitForSelector('text=Fast thrash', { timeout: 10000 });
    
    // Go back to calculator
    await page.goBack();
    await expect(page.locator('text=BPM Tap Calculator')).toBeVisible();
    
    // Go back to home
    await page.goBack();
    await expect(page.locator('text=Metal Drummer Gear')).toBeVisible();
    
    // Go forward
    await page.goForward();
    await expect(page.locator('text=BPM Tap Calculator')).toBeVisible();
  });
});

test.describe('BPM Song Database', () => {
  test('should show songs from multiple drummers', async ({ page }) => {
    await page.goto('/bpm/90-120');
    await page.waitForSelector('text=90-120 BPM', { timeout: 10000 });
    
    // Should show songs
    await expect(page.locator('text=/\\d+ songs/')).toBeVisible();
    
    // Should show at least some drummer groups
    const drummerGroups = page.locator('text=/🥁/');
    await expect(drummerGroups.first()).toBeVisible();
  });

  test('should display song details correctly', async ({ page }) => {
    await page.goto('/bpm/90-120');
    await page.waitForSelector('text=90-120 BPM', { timeout: 10000 });
    
    // Should show album and year info
    await expect(page.locator('text=/\\(\\d{4}\\)/')).toBeVisible();
    
    // Should show BPM values
    await expect(page.locator('text=/\\d+ BPM/')).toBeVisible();
  });
});
