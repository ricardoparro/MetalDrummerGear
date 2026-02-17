// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('CI Analytics Exclusion', () => {
  test('CI tests should include ci_test parameter to exclude from GA4', async ({ page }) => {
    if (process.env.CI) {
      await page.goto('/');
      const url = page.url();
      expect(url).toContain('ci_test');
    } else {
      test.skip();
    }
  });
});
