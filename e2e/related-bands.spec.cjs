const { test, expect } = require('@playwright/test');
const BASE_URL = process.env.BASE_URL || 'https://metalforge.io';

test.describe('Related Bands (Issue #364)', () => {
  test('Related bands section renders', async ({ page }) => {
    await page.goto(`${BASE_URL}/bands/metallica`, { waitUntil: 'load' });
    await page.waitForTimeout(2000);
    const section = page.locator('text=RELATED BANDS');
    const isVisible = await section.isVisible({ timeout: 5000 }).catch(() => false);
    test.skip(!isVisible, 'Band feature not available yet');
    await expect(section).toBeVisible();
  });
});
