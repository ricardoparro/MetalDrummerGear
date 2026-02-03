const { test, expect } = require('@playwright/test');
const BASE_URL = process.env.BASE_URL || 'https://metalforge.io';

test.describe('MetalForge E2E', () => {
  test('homepage loads', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Metal Drummer Gear')).toBeVisible({ timeout: 15000 });
  });
  
  test('all drummer images load', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/drummers`);
    const drummers = await response.json();
    const broken = [];
    for (const d of drummers) {
      if (d.image) {
        const url = d.image.startsWith('http') ? d.image : `${BASE_URL}${d.image}`;
        const r = await request.head(url).catch(() => null);
        if (!r || ![200, 301, 302, 304, 405].includes(r.status())) {
          broken.push(d.name);
        }
      }
    }
    expect(broken, `Broken: ${broken.join(', ')}`).toHaveLength(0);
  });
  
  test('drummer detail renders', async ({ page, request }) => {
    const response = await request.get(`${BASE_URL}/api/drummers`);
    const drummers = await response.json();
    await page.goto(`/drummer/${drummers[0].id}`);
    await expect(page.locator(`text=${drummers[0].name}`).first()).toBeVisible({ timeout: 15000 });
    const content = await page.locator('body').textContent();
    expect(content).not.toContain('is not defined');
  });
  
  test('first 5 drummers load', async ({ page, request }) => {
    const response = await request.get(`${BASE_URL}/api/drummers`);
    const drummers = await response.json();
    const errors = [];
    for (const d of drummers.slice(0, 5)) {
      await page.goto(`/drummer/${d.id}`, { waitUntil: 'networkidle' });
      // Wait for React to hydrate and render content
      await page.waitForTimeout(2000);
      const pageContent = await page.locator('body').textContent();
      const ok = pageContent.includes(d.name);
      if (!ok) errors.push(d.name);
    }
    expect(errors, `Failed: ${errors.join(', ')}`).toHaveLength(0);
  });
});
