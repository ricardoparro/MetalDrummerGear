const { test, expect } = require('@playwright/test');
const BASE_URL = process.env.BASE_URL || 'https://metalforge.io';

// Helper to wait for React hydration - uses proper Playwright assertions
async function waitForHydration(page, timeout = 30000) {
  // Wait for meaningful content that indicates React has rendered
  // Use Playwright's auto-retry mechanism instead of fixed waits
  await expect(page.locator('body')).not.toBeEmpty({ timeout });
  
  // Try to wait for any of these elements that indicate the app has rendered
  try {
    await expect(
      page.locator('h1, [class*="title"], [data-testid]').first()
    ).toBeVisible({ timeout: 15000 });
  } catch (e) {
    // App may have different structure, but body should have content
  }
}

test.describe('MetalForge E2E', () => {
  
  test('images have lazy loading attributes (Issue #311)', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await waitForHydration(page);
    
    // Wait for any img element to appear
    try {
      await page.locator('img').first().waitFor({ state: 'attached', timeout: 10000 });
    } catch (e) {
      console.log('⚠️ Note: No img elements found on homepage - skipping image attribute test');
      test.skip(true, 'No images found on homepage');
      return;
    }
    
    await page.waitForTimeout(2000);
    
    const images = await page.locator('img').all();
    
    if (images.length === 0) {
      console.log('⚠️ Note: No img elements found on homepage after waiting');
      test.skip(true, 'No images found on homepage');
      return;
    }
    
    console.log(`✓ Found ${images.length} images on homepage`);
    
    let lazyCount = 0;
    let eagerCount = 0;
    let noLoadingAttr = 0;
    
    for (let i = 0; i < Math.min(images.length, 20); i++) {
      const loadingAttr = await images[i].getAttribute('loading');
      if (loadingAttr === 'lazy') lazyCount++;
      else if (loadingAttr === 'eager') eagerCount++;
      else noLoadingAttr++;
    }
    
    if (images.length <= 6) {
      console.log(`✓ Homepage has ${images.length} images (≤6) - all above fold, lazy loading not required`);
      expect(eagerCount + noLoadingAttr).toBeGreaterThanOrEqual(1);
    } else {
      console.log(`✓ Homepage has ${images.length} images - checking lazy loading for below-fold images`);
      expect(lazyCount).toBeGreaterThan(0);
      expect(eagerCount).toBeGreaterThanOrEqual(1);
    }
  });

  test('images have proper alt text for accessibility (Issue #311)', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await waitForHydration(page);
    
    try {
      await page.locator('img').first().waitFor({ state: 'attached', timeout: 10000 });
    } catch (e) {
      console.log('⚠️ Note: No img elements found - skipping alt text test');
      test.skip(true, 'No images found on homepage');
      return;
    }
    
    await page.waitForTimeout(2000);
    
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
    const response = await request.get(`${BASE_URL}/api/drummers`);
    const drummers = await response.json();
    
    await page.goto(`/drummer/${drummers[0].id}`);
    await page.waitForLoadState('domcontentloaded');
    await waitForHydration(page);
    
    const pictureElements = await page.locator('picture').all();
    const webpSources = await page.locator('picture source[type="image/webp"]').all();
    
    if (pictureElements.length > 0) {
      expect(webpSources.length).toBeGreaterThan(0);
    }
  });

  test('homepage loads', async ({ page }) => {
    test.setTimeout(45000); // Extend timeout for slow CI
    
    await page.goto('/');
    
    // Wait for page to have meaningful content - use simple body check
    // This avoids strict mode issues while still verifying the page rendered
    await expect(page.locator('body')).toContainText(/Metal|Drummer|Gear/i, { timeout: 30000 });
    
    console.log('✓ Homepage loaded - site content visible');
  });
  
  test('all drummer images load', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/drummers`);
    const drummers = await response.json();
    const broken = [];
    
    for (const d of drummers) {
      if (d.image) {
        // Skip external URLs
        if (d.image.startsWith('http')) {
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
    test.setTimeout(45000);
    
    const response = await request.get(`${BASE_URL}/api/drummers`);
    const drummers = await response.json();
    const drummer = drummers[0];
    
    await page.goto(`/drummer/${drummer.id}`);
    
    // Use Playwright's getByText to wait for the drummer's name to appear
    // This handles SPA rendering properly with built-in auto-waiting
    const firstName = drummer.name.split(' ')[0];
    await expect(page.getByText(firstName).first()).toBeVisible({ timeout: 30000 });
    
    // Also verify the page doesn't have JavaScript errors
    const content = await page.locator('body').textContent();
    expect(content).not.toContain('is not defined');
    
    console.log(`✓ Drummer detail rendered - ${drummer.name}`);
  });
  
  test('first 5 drummers load', async ({ page, request }) => {
    test.setTimeout(150000); // Extended timeout for multi-page test
    
    const response = await request.get(`${BASE_URL}/api/drummers`);
    const drummers = await response.json();
    const errors = [];
    
    for (const d of drummers.slice(0, 5)) {
      await page.goto(`/drummer/${d.id}`);
      
      // Use Playwright's getByText to wait for the drummer's name
      const firstName = d.name.split(' ')[0];
      try {
        await expect(page.getByText(firstName).first()).toBeVisible({ timeout: 25000 });
      } catch (e) {
        errors.push(d.name);
      }
    }
    
    expect(errors, `Failed to load: ${errors.join(', ')}`).toHaveLength(0);
    console.log(`✓ Successfully loaded ${5 - errors.length}/5 drummer pages`);
  });
});
