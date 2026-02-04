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
        // Skip external URLs (Wikipedia etc.) - they rate limit and block automated requests
        // Only validate internal image paths that we control
        if (d.image.startsWith('http')) {
          // For external URLs, just verify it's a valid image URL pattern
          const isValidImageUrl = /\.(jpg|jpeg|png|gif|webp)$/i.test(d.image) || 
                                  d.image.includes('upload.wikimedia.org');
          if (!isValidImageUrl) {
            broken.push(`${d.name} (invalid external image URL: ${d.image})`);
          }
          continue;
        }
        // Validate internal image paths
        const url = `${BASE_URL}${d.image}`;
        const r = await request.get(url).catch(() => null);
        if (!r || ![200, 301, 302, 304].includes(r.status())) {
          broken.push(`${d.name} (HTTP ${r?.status() || 'error'})`);
        } else {
          // Check content-type is actually an image, not HTML fallback
          const contentType = r.headers()['content-type'] || '';
          if (!contentType.startsWith('image/')) {
            broken.push(`${d.name} (not an image: ${contentType})`);
          }
        }
      } else {
        broken.push(`${d.name} (no image URL)`);
      }
    }
    expect(broken, `Broken images:\n${broken.join('\n')}`).toHaveLength(0);
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
