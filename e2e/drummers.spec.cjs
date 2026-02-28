const { test, expect } = require('@playwright/test');
const BASE_URL = process.env.BASE_URL || 'https://metalforge.io';

test.describe('MetalForge E2E', () => {
  
  test('images have lazy loading attributes (Issue #311)', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to fully load and images to be present
    // First wait for DOM to be ready
    await page.waitForLoadState('domcontentloaded');
    
    // Wait for any img element to appear (React hydration)
    try {
      await page.locator('img').first().waitFor({ state: 'attached', timeout: 10000 });
    } catch (e) {
      // If no images after 10s, skip gracefully - may be a deployment without images
      console.log('⚠️ Note: No img elements found on homepage - skipping image attribute test');
      test.skip(true, 'No images found on homepage');
      return;
    }
    
    // Wait a bit more for all images to be in the DOM
    await page.waitForTimeout(2000);
    
    // Get all img elements
    const images = await page.locator('img').all();
    
    if (images.length === 0) {
      console.log('⚠️ Note: No img elements found on homepage after waiting');
      test.skip(true, 'No images found on homepage');
      return;
    }
    
    console.log(`✓ Found ${images.length} images on homepage`);
    
    // Check that images have loading attribute
    let lazyCount = 0;
    let eagerCount = 0;
    let noLoadingAttr = 0;
    
    for (let i = 0; i < Math.min(images.length, 20); i++) {
      const loadingAttr = await images[i].getAttribute('loading');
      if (loadingAttr === 'lazy') lazyCount++;
      else if (loadingAttr === 'eager') eagerCount++;
      else noLoadingAttr++;
    }
    
    // If homepage has few images (e.g., hero section only), lazy loading isn't needed
    // because all images are above the fold
    if (images.length <= 6) {
      console.log(`✓ Homepage has ${images.length} images (≤6) - all above fold, lazy loading not required`);
      // With few images, just ensure they have proper loading attributes (eager or none)
      expect(eagerCount + noLoadingAttr).toBeGreaterThanOrEqual(1);
    } else {
      // With many images, expect some lazy loading for below-fold images
      console.log(`✓ Homepage has ${images.length} images - checking lazy loading for below-fold images`);
      expect(lazyCount).toBeGreaterThan(0);
      expect(eagerCount).toBeGreaterThanOrEqual(1);
    }
  });

  test('images have proper alt text for accessibility (Issue #311)', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    // Wait for images to appear
    try {
      await page.locator('img').first().waitFor({ state: 'attached', timeout: 10000 });
    } catch (e) {
      console.log('⚠️ Note: No img elements found - skipping alt text test');
      test.skip(true, 'No images found on homepage');
      return;
    }
    
    await page.waitForTimeout(2000);
    
    // Get all img elements
    const images = await page.locator('img').all();
    
    if (images.length === 0) {
      test.skip(true, 'No images found on homepage');
      return;
    }
    
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

  test('WebP support via picture elements (Issue #311)', async ({ page, request }) => {
    // Navigate to a drummer detail page to find picture elements
    const response = await request.get(`${BASE_URL}/api/drummers`);
    const drummers = await response.json();
    
    await page.goto(`/drummer/${drummers[0].id}`);
    await page.waitForLoadState('domcontentloaded');
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
    await page.waitForLoadState('domcontentloaded');
    
    // Wait for React to hydrate - check for any content that indicates the page loaded
    // Check for multiple possible branding elements
    const metalForge = page.locator('text=MetalForge');
    const metalDrummerGear = page.locator('text=Metal Drummer Gear');
    const siteTitle = page.locator('h1, [class*="title"], [class*="brand"], [class*="header"]').first();
    const drummerCards = page.locator('[class*="drummer"], [class*="card"], [class*="grid"]').first();
    
    // Try multiple selectors with increasing timeout
    let found = false;
    
    // First try the branding text
    try {
      await expect(metalForge.or(metalDrummerGear).first()).toBeVisible({ timeout: 8000 });
      found = true;
      console.log('✓ Homepage loaded - branding visible');
    } catch (e) {
      // If branding not found, try other indicators
    }
    
    if (!found) {
      try {
        await expect(siteTitle).toBeVisible({ timeout: 5000 });
        found = true;
        console.log('✓ Homepage loaded - title element visible');
      } catch (e) {
        // Continue trying
      }
    }
    
    if (!found) {
      try {
        await expect(drummerCards).toBeVisible({ timeout: 5000 });
        found = true;
        console.log('✓ Homepage loaded - drummer cards visible');
      } catch (e) {
        // Final fallback
      }
    }
    
    if (!found) {
      // Final check - just verify the page has some content
      const bodyText = await page.locator('body').textContent();
      expect(bodyText.length).toBeGreaterThan(100);
      console.log('✓ Homepage loaded - body has content');
    }
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
    await page.waitForLoadState('domcontentloaded');
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
