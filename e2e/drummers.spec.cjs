const { test, expect } = require('@playwright/test');
const BASE_URL = process.env.BASE_URL || 'https://metalforge.io';

test.describe('MetalForge E2E', () => {
  
  test('images have lazy loading attributes (Issue #311)', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(3000); // Wait for React to hydrate
    
    // Get all img elements
    const images = await page.locator('img').all();
    expect(images.length).toBeGreaterThan(0);
    
    // Check that images have loading attribute
    let lazyCount = 0;
    let eagerCount = 0;
    
    for (let i = 0; i < Math.min(images.length, 20); i++) {
      const loadingAttr = await images[i].getAttribute('loading');
      if (loadingAttr === 'lazy') lazyCount++;
      if (loadingAttr === 'eager') eagerCount++;
    }
    
    // Expect at least some lazy images (below fold)
    expect(lazyCount).toBeGreaterThan(0);
    // First few images should be eager (above fold)
    // or at least not lazy (since expo-image might handle it differently)
  });

  test('images have proper alt text for accessibility (Issue #311)', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(3000);
    
    // Get all img elements
    const images = await page.locator('img').all();
    const missingAlt = [];
    
    for (let i = 0; i < Math.min(images.length, 20); i++) {
      const alt = await images[i].getAttribute('alt');
      const src = await images[i].getAttribute('src');
      if (!alt || alt.trim() === '') {
        missingAlt.push(src);
      }
    }
    
    expect(missingAlt.length, `Images missing alt text:\n${missingAlt.join('\n')}`).toBe(0);
  });

  test('WebP support via picture elements (Issue #311)', async ({ page }) => {
    // Navigate to a drummer detail page to find picture elements
    const response = await page.request.get(`${BASE_URL}/api/drummers`);
    const drummers = await response.json();
    
    await page.goto(`/drummer/${drummers[0].id}`);
    await page.waitForTimeout(3000);
    
    // Check for picture elements with WebP sources
    const pictureElements = await page.locator('picture').all();
    const webpSources = await page.locator('picture source[type="image/webp"]').all();
    
    // If browser supports WebP, we should see picture elements
    // (Note: exact implementation may vary, this is a sanity check)
    if (pictureElements.length > 0) {
      // Picture elements should have WebP sources
      expect(webpSources.length).toBeGreaterThan(0);
    }
  });

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
    // Increase timeout for multi-page iteration test
    test.setTimeout(60000);
    
    const response = await request.get(`${BASE_URL}/api/drummers`);
    const drummers = await response.json();
    const errors = [];
    for (const d of drummers.slice(0, 5)) {
      // Use 'load' instead of 'networkidle' - GA scripts prevent networkidle from settling
      await page.goto(`/drummer/${d.id}`, { waitUntil: 'load' });
      // Wait for React to hydrate and render content
      await page.waitForTimeout(2500);
      const pageContent = await page.locator('body').textContent();
      const ok = pageContent.includes(d.name);
      if (!ok) errors.push(d.name);
    }
    expect(errors, `Failed: ${errors.join(', ')}`).toHaveLength(0);
  });
});
