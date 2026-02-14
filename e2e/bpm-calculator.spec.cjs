// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * E2E Tests for BPM Tap Calculator Feature (Issue #342)
 */

test.describe('BPM Tap Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/bpm');
    await page.waitForLoadState('networkidle');
  });

  test('should display BPM tap calculator page', async ({ page }) => {
    // Check main elements are present
    await expect(page.getByText(/BPM Tap Calculator/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /tap/i })).toBeVisible();
  });

  test('should calculate BPM when tapping', async ({ page }) => {
    const tapButton = page.getByRole('button', { name: /tap/i }).first();
    await expect(tapButton).toBeVisible();
    
    // Tap 4 times with ~500ms intervals (120 BPM)
    for (let i = 0; i < 4; i++) {
      await tapButton.click();
      await page.waitForTimeout(500);
    }
    
    // Check that a BPM value is displayed
    await expect(page.getByText(/\d+.*BPM/i)).toBeVisible({ timeout: 5000 });
  });

  test('should display song database', async ({ page }) => {
    // Check that songs are displayed
    await expect(page.getByText(/Metallica|Slayer|Slipknot/i).first()).toBeVisible();
  });

  test('should filter songs by search', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search|song|band/i);
    if (await searchInput.isVisible()) {
      await searchInput.fill('Metallica');
      await page.waitForTimeout(500);
      await expect(page.getByText(/Metallica/i)).toBeVisible();
    }
  });

  test('should allow keyboard spacebar tapping', async ({ page }) => {
    await page.keyboard.press('Space');
    await page.waitForTimeout(300);
    await page.keyboard.press('Space');
    await page.waitForTimeout(300);
    await page.keyboard.press('Space');
    
    // After taps, some tap indicator should be visible
    const tapIndicator = page.getByText(/tapping|taps/i);
    await expect(tapIndicator).toBeVisible({ timeout: 3000 });
  });
});

test.describe('BPM Page SEO', () => {
  test('BPM calculator page should have proper meta tags', async ({ page }) => {
    await page.goto('/bpm');
    await page.waitForLoadState('networkidle');
    
    const title = await page.title();
    expect(title.toLowerCase()).toMatch(/bpm|tap|tempo|calculator|metalforge/i);
    
    const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDesc).toBeTruthy();
  });
});

test.describe('BPM Mobile Responsiveness', () => {
  test.use({ viewport: { width: 375, height: 667 } });
  
  test('should be usable on mobile', async ({ page }) => {
    await page.goto('/bpm');
    await page.waitForLoadState('networkidle');
    
    const tapButton = page.getByRole('button', { name: /tap/i }).first();
    await expect(tapButton).toBeVisible();
  });
});
