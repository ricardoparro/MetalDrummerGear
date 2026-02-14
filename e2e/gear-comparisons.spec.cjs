// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * E2E tests for Gear Comparison pages
 * Issue #345: Gear comparison pages (Tama vs Pearl, etc.)
 */

test.describe('Gear Comparisons Index Page', () => {
  test('should display gear comparisons index', async ({ page }) => {
    await page.goto('/compare-gear');
    await expect(page.locator('text=Gear Comparisons')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=Drum Kit Comparisons')).toBeVisible();
    await expect(page.locator('text=Cymbal Comparisons')).toBeVisible();
  });

  test('should have SEO meta tags', async ({ page }) => {
    await page.goto('/compare-gear');
    await page.waitForLoadState('domcontentloaded');
    const title = await page.title();
    expect(title).toContain('Gear Comparisons');
  });
});

test.describe('Gear Comparison Detail Page', () => {
  test('should display comparison header', async ({ page }) => {
    await page.goto('/compare-gear/tama-vs-pearl');
    await expect(page.locator('text=Tama vs Pearl')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=VS')).toBeVisible();
  });

  test('should display verdict section', async ({ page }) => {
    await page.goto('/compare-gear/tama-vs-pearl');
    await expect(page.locator('text=Verdict')).toBeVisible({ timeout: 10000 });
  });

  test('should have structured data', async ({ page }) => {
    await page.goto('/compare-gear/tama-vs-pearl');
    await page.waitForLoadState('domcontentloaded');
    const ldScript = page.locator('script[type="application/ld+json"][data-gear-comparison]');
    await expect(ldScript).toBeAttached({ timeout: 5000 });
  });
});

test.describe('Gear Comparison - Accessories', () => {
  test('should display Evans vs Remo', async ({ page }) => {
    await page.goto('/compare-gear/evans-vs-remo');
    await expect(page.locator('text=Evans vs Remo')).toBeVisible({ timeout: 10000 });
  });

  test('should display Vic Firth vs ProMark', async ({ page }) => {
    await page.goto('/compare-gear/vic-firth-vs-promark');
    await expect(page.locator('text=Vic Firth vs ProMark')).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Mobile Responsiveness', () => {
  test('should be mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/compare-gear/tama-vs-pearl');
    await expect(page.locator('text=Tama vs Pearl')).toBeVisible({ timeout: 10000 });
  });
});
