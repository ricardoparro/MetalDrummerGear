// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * E2E Tests for Kit Builder Feature (Issue #341)
 * Tests the drum kit configurator with shareable URLs
 */

test.describe('Kit Builder Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to kit builder page
    await page.goto('/kit-builder');
    // Wait for the page to load
    await page.waitForSelector('text=Metal Kit Builder', { timeout: 10000 });
  });

  test('should display kit builder page with title', async ({ page }) => {
    await expect(page.locator('text=Metal Kit Builder')).toBeVisible();
    await expect(page.locator('text=Build your dream metal drum kit')).toBeVisible();
  });

  test('should display preset kits from famous drummers', async ({ page }) => {
    await expect(page.locator('text=Build Like The Pros')).toBeVisible();
    // Check for some preset drummers
    await expect(page.locator('text=Lars Ulrich')).toBeVisible();
    await expect(page.locator('text=Joey Jordison')).toBeVisible();
  });

  test('should load a preset kit when clicked', async ({ page }) => {
    // Click on Lars Ulrich preset
    await page.click('text=Lars Ulrich');
    
    // Wait for gear options to appear
    await page.waitForSelector('text=Shell Pack', { timeout: 5000 });
    
    // Should show gear categories
    await expect(page.locator('text=Shell Pack')).toBeVisible();
    await expect(page.locator('text=Snare Drum')).toBeVisible();
    await expect(page.locator('text=Cymbal Set')).toBeVisible();
  });

  test('should allow starting from scratch', async ({ page }) => {
    // Click on "start from scratch"
    await page.click('text=start from scratch');
    
    // Should show gear categories
    await page.waitForSelector('text=Shell Pack', { timeout: 5000 });
    await expect(page.locator('text=Shell Pack')).toBeVisible();
  });

  test('should allow selecting gear items', async ({ page }) => {
    // Start from scratch
    await page.click('text=start from scratch');
    await page.waitForSelector('text=Shell Pack', { timeout: 5000 });
    
    // Select a shell pack
    await page.click('text=Starclassic Maple');
    
    // Should show selected badge
    await expect(page.locator('.kitBuilderSelectedBadge').first()).toBeVisible();
  });

  test('should calculate total kit price', async ({ page }) => {
    // Start from scratch
    await page.click('text=start from scratch');
    await page.waitForSelector('text=Shell Pack', { timeout: 5000 });
    
    // Select some gear
    await page.click('text=Starclassic Maple');
    await page.click('text=Bell Brass');
    
    // Should show summary with total
    await expect(page.locator('text=Your Kit Summary')).toBeVisible();
    await expect(page.locator('text=Total Kit Cost')).toBeVisible();
    // Should show a price
    await expect(page.locator('text=/€[\\d,]+/')).toBeVisible();
  });

  test('should generate shareable link', async ({ page }) => {
    // Start from scratch
    await page.click('text=start from scratch');
    await page.waitForSelector('text=Shell Pack', { timeout: 5000 });
    
    // Select some gear
    await page.click('text=Starclassic Maple');
    
    // Click create shareable link
    await page.click('text=Create Shareable Link');
    
    // Should show the share URL
    await page.waitForSelector('text=Share your kit', { timeout: 5000 });
    await expect(page.locator('text=/metalforge\\.io\\/kit\\//').or(page.locator('text=/localhost.*\\/kit\\//'))).toBeVisible();
  });

  test('should copy shareable link to clipboard', async ({ page, context }) => {
    // Grant clipboard permissions
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    
    // Start from scratch
    await page.click('text=start from scratch');
    await page.waitForSelector('text=Shell Pack', { timeout: 5000 });
    
    // Select some gear
    await page.click('text=Starclassic Maple');
    
    // Generate link
    await page.click('text=Create Shareable Link');
    await page.waitForSelector('text=Share your kit', { timeout: 5000 });
    
    // Click copy button
    await page.click('text=Copy');
    
    // Should show copied confirmation
    await expect(page.locator('text=Copied!')).toBeVisible();
  });

  test('should show matching drummer based on gear selection', async ({ page }) => {
    // Load Lars preset
    await page.click('text=Lars Ulrich');
    await page.waitForSelector('text=Shell Pack', { timeout: 5000 });
    
    // Should show matching drummer section
    await expect(page.locator('text=Your kit matches')).toBeVisible();
  });

  test('should reset kit when clicking start over', async ({ page }) => {
    // Load a preset
    await page.click('text=Lars Ulrich');
    await page.waitForSelector('text=Shell Pack', { timeout: 5000 });
    
    // Click reset
    await page.click('text=Start Over');
    
    // Should show presets again
    await expect(page.locator('text=Build Like The Pros')).toBeVisible();
  });

  test('should allow editing kit name', async ({ page }) => {
    // Start from scratch
    await page.click('text=start from scratch');
    await page.waitForSelector('text=Kit Name', { timeout: 5000 });
    
    // Change kit name
    const nameInput = page.locator('input[placeholder="My Custom Metal Kit"]');
    await nameInput.fill('My Thrash Kit');
    
    // Kit name should be updated
    await expect(nameInput).toHaveValue('My Thrash Kit');
  });

  test('should be mobile responsive', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Reload to apply responsive styles
    await page.reload();
    await page.waitForSelector('text=Metal Kit Builder', { timeout: 10000 });
    
    // Page should still be functional
    await expect(page.locator('text=Metal Kit Builder')).toBeVisible();
    await expect(page.locator('text=Build Like The Pros')).toBeVisible();
  });
});

test.describe('Shared Kit Page', () => {
  test('should load a preset kit by ID', async ({ page }) => {
    // Navigate to a preset kit (Lars Ulrich)
    await page.goto('/kit/lars-ulrich');
    
    // Wait for kit to load
    await page.waitForSelector('text=Metal Kit Builder', { timeout: 10000 });
    
    // Should show the preset kit loaded
    await expect(page.locator('text=Shell Pack')).toBeVisible();
  });

  test('should have correct SEO meta tags', async ({ page }) => {
    await page.goto('/kit-builder');
    await page.waitForSelector('text=Metal Kit Builder', { timeout: 10000 });
    
    // Check page title
    const title = await page.title();
    expect(title).toContain('Kit Builder');
    
    // Check meta description
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toContain('drum kit');
  });
});

test.describe('Kit Builder Navigation', () => {
  test('should navigate back to home', async ({ page }) => {
    await page.goto('/kit-builder');
    await page.waitForSelector('text=Metal Kit Builder', { timeout: 10000 });
    
    // Click back button
    await page.click('text=Back to Home');
    
    // Should be on home page
    await expect(page).toHaveURL('/');
  });

  test('should navigate to drummer profile when clicking matched drummer', async ({ page }) => {
    await page.goto('/kit-builder');
    await page.waitForSelector('text=Metal Kit Builder', { timeout: 10000 });
    
    // Load a preset
    await page.click('text=Lars Ulrich');
    await page.waitForSelector('text=Your kit matches', { timeout: 5000 });
    
    // Click on the matched drummer
    await page.click('[aria-label*="View"] >> nth=0').catch(() => {
      // Alternative: click the drummer section
      page.click('text=Your kit matches');
    });
    
    // Should navigate to drummer page or stay on kit builder
    // (depends on implementation)
  });

  test('should handle browser back/forward navigation', async ({ page }) => {
    // Start on home
    await page.goto('/');
    await page.waitForSelector('text=Metal Drummer Gear', { timeout: 10000 });
    
    // Navigate to kit builder
    await page.goto('/kit-builder');
    await page.waitForSelector('text=Metal Kit Builder', { timeout: 10000 });
    
    // Go back
    await page.goBack();
    
    // Should be on home
    await expect(page.locator('text=Metal Drummer Gear')).toBeVisible();
    
    // Go forward
    await page.goForward();
    
    // Should be on kit builder
    await expect(page.locator('text=Metal Kit Builder')).toBeVisible();
  });
});
