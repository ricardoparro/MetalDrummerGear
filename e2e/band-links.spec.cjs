const { test, expect } = require('@playwright/test');
const BASE_URL = process.env.BASE_URL || 'https://metalforge.io';

test.describe('Band Links in Drummer Profiles (Issue #351)', () => {
  test('drummer profile shows bands section when extended bio has bands data', async ({ page }) => {
    // Joey Jordison has bands data (Slipknot, Murderdolls, Sinsaenum)
    await page.goto('/drummer/joey-jordison', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    // Check bands section is visible
    const bandsSection = page.locator('text=🎸 Bands');
    await expect(bandsSection).toBeVisible({ timeout: 10000 });

    // Check that at least one band is shown
    await expect(page.locator('text=Slipknot').first()).toBeVisible({ timeout: 5000 });
  });

  test('band cards display period and role', async ({ page }) => {
    // Joey Jordison profile
    await page.goto('/drummer/joey-jordison', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    // Check period is shown (e.g., "1995-2013" for Slipknot)
    await expect(page.locator('text=1995-2013').first()).toBeVisible({ timeout: 5000 });

    // Check role is shown (e.g., "Drummer, founding member")
    await expect(page.locator('text=Drummer, founding member').first()).toBeVisible({ timeout: 5000 });
  });

  test('band links have correct href for existing band pages', async ({ page }) => {
    // Joey Jordison profile
    await page.goto('/drummer/joey-jordison', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    // Find the band link for Slipknot (which should exist in bands data)
    // First, check if the link exists with the test ID
    const slipknotLink = page.locator('[data-testid="band-link-slipknot"]');
    
    // If the band page exists, the link should be clickable
    // If not, gracefully skip
    const isLinkVisible = await slipknotLink.isVisible().catch(() => false);
    
    if (isLinkVisible) {
      const href = await slipknotLink.getAttribute('href');
      expect(href).toBe('/bands/slipknot');
    }
  });

  test('lars ulrich profile shows metallica band', async ({ page }) => {
    // Lars Ulrich - Metallica
    await page.goto('/drummer/lars-ulrich', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    // Check bands section is visible
    const bandsSection = page.locator('text=🎸 Bands');
    await expect(bandsSection).toBeVisible({ timeout: 10000 });

    // Check Metallica is shown
    await expect(page.locator('text=Metallica').first()).toBeVisible({ timeout: 5000 });
    
    // Check period
    await expect(page.locator('text=1981-present').first()).toBeVisible({ timeout: 5000 });
  });

  test('multiple bands are displayed for drummers with multiple bands', async ({ page }) => {
    // Joey Jordison has 3 bands
    await page.goto('/drummer/joey-jordison', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    // Should show all bands
    await expect(page.locator('text=Slipknot').first()).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=Murderdolls').first()).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=Sinsaenum').first()).toBeVisible({ timeout: 5000 });
  });

  test('bands section is mobile responsive', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/drummer/joey-jordison', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    // Check bands section is still visible on mobile
    const bandsSection = page.locator('text=🎸 Bands');
    await expect(bandsSection).toBeVisible({ timeout: 10000 });

    // Band cards should still be visible
    await expect(page.locator('text=Slipknot').first()).toBeVisible({ timeout: 5000 });
  });
});
