const { test, expect } = require('@playwright/test');
const BASE_URL = process.env.BASE_URL || 'https://metalforge.io';

test.describe('Bands Page - Issue #347', () => {
  test('bands page loads and shows bands', async ({ page }) => {
    await page.goto('/bands', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    const title = page.locator('text=Metal Bands');
    await expect(title).toBeVisible({ timeout: 15000 });
    const bandsCount = page.locator('text=/\\d+ bands? found/');
    await expect(bandsCount).toBeVisible({ timeout: 10000 });
  });

  test('bands filter by genre works', async ({ page }) => {
    await page.goto('/bands', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    const allGenres = page.locator('text=All Genres');
    await expect(allGenres).toBeVisible({ timeout: 10000 });
    const thrashFilter = page.locator('text=Thrash Metal').first();
    if (await thrashFilter.isVisible({ timeout: 5000 }).catch(() => false)) {
      await thrashFilter.click();
      await page.waitForTimeout(1000);
      const bandsCount = page.locator('text=/\\d+ bands? found/');
      await expect(bandsCount).toBeVisible({ timeout: 5000 });
    }
  });

  test('bands show drummers section', async ({ page }) => {
    await page.goto('/bands', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    const drummersLabel = page.locator('text=Drummers:').first();
    await expect(drummersLabel).toBeVisible({ timeout: 10000 });
  });

  test('bands API returns data', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/bands`);
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
    expect(data.length).toBeGreaterThan(0);
    const band = data[0];
    expect(band.id).toBeDefined();
    expect(band.name).toBeDefined();
    expect(band.slug).toBeDefined();
    expect(band.genres).toBeDefined();
    expect(band.drummers).toBeDefined();
  });

  test('bands API filters by genre', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/bands?genre=Thrash`);
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
    data.forEach(band => {
      const hasThrash = band.genres.some(g => g.toLowerCase().includes('thrash'));
      expect(hasThrash).toBeTruthy();
    });
  });

  test('bands API meta/genres endpoint works', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/bands/meta/genres`);
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
    expect(data.length).toBeGreaterThan(0);
  });

  test('band detail by slug works', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/bands/metallica`);
    expect(response.ok()).toBeTruthy();
    const band = await response.json();
    expect(band.name).toBe('Metallica');
    expect(band.slug).toBe('metallica');
    expect(band.drummers).toBeDefined();
    expect(band.drummers.length).toBeGreaterThan(0);
  });

  test('bands page is mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/bands', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    const title = page.locator('text=Metal Bands');
    await expect(title).toBeVisible({ timeout: 15000 });
    const bandsCount = page.locator('text=/\\d+ bands? found/');
    await expect(bandsCount).toBeVisible({ timeout: 10000 });
  });
});
