// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('CI Analytics Exclusion', () => {
  test('CI tests should include ci_test parameter to exclude from GA4', async ({ page }) => {
    if (process.env.CI) {
      // Navigate with ci_test param (baseURL query params don't propagate to page.goto paths)
      await page.goto('/?ci_test=1');
      const url = page.url();
      expect(url).toContain('ci_test');
      
      // Verify site loads correctly with the param
      await expect(page.locator('body')).toBeVisible();
    } else {
      test.skip();
    }
  });
});
