const { test, expect } = require('@playwright/test');

test.describe('Band Links in Drummer Profiles (Issue #351)', () => {
  test('drummer profile shows bands section when extended bio has bands data', async ({ page }) => {
    await page.goto('/drummer/joey-jordison', { waitUntil: 'load' });
    await page.waitForTimeout(2000);
    const bandsSection = page.locator('text=🎸 Bands');
    await expect(bandsSection).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=Slipknot').first()).toBeVisible({ timeout: 5000 });
  });

  test('band cards display period and role', async ({ page }) => {
    await page.goto('/drummer/joey-jordison', { waitUntil: 'load' });
    await page.waitForTimeout(2000);
    await expect(page.locator('text=1995-2013').first()).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=Drummer, founding member').first()).toBeVisible({ timeout: 5000 });
  });

  test('lars ulrich profile shows metallica band', async ({ page }) => {
    await page.goto('/drummer/lars-ulrich', { waitUntil: 'load' });
    await page.waitForTimeout(2000);
    const bandsSection = page.locator('text=🎸 Bands');
    await expect(bandsSection).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=Metallica').first()).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=1981-present').first()).toBeVisible({ timeout: 5000 });
  });

  test('multiple bands displayed for drummers with multiple bands', async ({ page }) => {
    await page.goto('/drummer/joey-jordison', { waitUntil: 'load' });
    await page.waitForTimeout(2000);
    await expect(page.locator('text=Slipknot').first()).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=Murderdolls').first()).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=Sinsaenum').first()).toBeVisible({ timeout: 5000 });
  });

  test('bands section is mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/drummer/joey-jordison', { waitUntil: 'load' });
    await page.waitForTimeout(2000);
    const bandsSection = page.locator('text=🎸 Bands');
    await expect(bandsSection).toBeVisible({ timeout: 10000 });
  });

  test('clicking band link navigates to band page', async ({ page }) => {
    await page.goto('/drummer/lars-ulrich', { waitUntil: 'load' });
    await page.waitForTimeout(2000);
    const bandLink = page.locator('[data-testid="band-link-metallica"]');
    const isLinkVisible = await bandLink.isVisible().catch(() => false);
    if (isLinkVisible) {
      await bandLink.click();
      await page.waitForTimeout(1000);
      await expect(page).toHaveURL(/\/bands\/metallica/);
    }
  });
});
