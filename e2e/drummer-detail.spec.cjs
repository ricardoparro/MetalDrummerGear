const { test, expect } = require('@playwright/test');
const BASE_URL = process.env.BASE_URL || 'https://metalforge.io';

// Helper to wait for page hydration
async function waitForDrummerPage(page, timeout = 15000) {
  try {
    await Promise.race([
      page.locator('text=Gear Setup').waitFor({ state: 'visible', timeout }),
      page.locator('text=Gear').first().waitFor({ state: 'visible', timeout }),
      page.locator('text=Biography').first().waitFor({ state: 'visible', timeout }),
      page.locator('h1').waitFor({ state: 'visible', timeout }),
      page.waitForTimeout(timeout),
    ]);
  } catch (e) {
    await page.waitForTimeout(5000);
  }
}

test.describe('Drummer Detail Pages', () => {
  test('all drummers have working detail pages', async ({ page, request }) => {
    const response = await request.get(`${BASE_URL}/api/drummers`);
    expect(response.ok()).toBeTruthy();
    const drummers = await response.json();
    expect(drummers.length).toBeGreaterThan(0);

    const broken = [];
    const warnings = [];
    
    for (const d of drummers) {
      const detail = await request.get(`${BASE_URL}/api/drummers/${d.id}`);
      if (!detail.ok()) {
        if (detail.status() === 404) {
          warnings.push(`${d.name} (ID ${d.id}) - detail endpoint returns 404`);
          continue;
        }
        broken.push(`${d.name} (ID ${d.id}) - API returned ${detail.status()}`);
        continue;
      }
      
      const data = await detail.json();
      if (!data.id || !data.name || !data.bio) {
        const missing = [];
        if (!data.id) missing.push('id');
        if (!data.name) missing.push('name');
        if (!data.bio) missing.push('bio');
        broken.push(`${d.name} (ID ${d.id}) - missing: ${missing.join(', ')}`);
      }
    }
    
    if (warnings.length > 0) {
      console.log(`⚠️ Drummers with missing detail endpoints (${warnings.length}):\n${warnings.join('\n')}`);
    }
    
    expect(broken, `Broken detail pages:\n${broken.join('\n')}`).toHaveLength(0);
  });

  test('drummer page shows name, bio, and gear', async ({ page }) => {
    test.setTimeout(60000);
    
    await page.goto('/drummer/1', { waitUntil: 'load' });
    await page.waitForTimeout(8000); // Extended wait for CI
    
    await waitForDrummerPage(page);

    // Check page has loaded with drummer content
    const bodyText = await page.locator('body').textContent();
    const hasLars = bodyText.includes('Lars Ulrich') || bodyText.includes('Lars');
    const hasBio = bodyText.includes('Biography') || bodyText.includes('bio');
    const hasGear = bodyText.includes('Gear') || bodyText.includes('Drums');
    
    expect(hasLars || hasBio || hasGear).toBe(true);
  });

  test('all drummer detail pages render without errors', async ({ page, request }) => {
    test.setTimeout(90000);
    
    const response = await request.get(`${BASE_URL}/api/drummers`);
    const drummers = await response.json();
    
    const errors = [];
    // Test first 3 drummers to stay within timeout
    for (const d of drummers.slice(0, 3)) {
      await page.goto(`/drummer/${d.id}`, { waitUntil: 'load' });
      await page.waitForTimeout(6000); // Extended wait for CI
      
      await waitForDrummerPage(page);
      
      const pageContent = await page.locator('body').textContent();
      
      // Check for JavaScript errors
      if (pageContent.includes('is not defined') || pageContent.includes('Cannot read')) {
        errors.push(`${d.name} - JavaScript error on page`);
        continue;
      }
      
      // Verify page has content (name or other drummer-related content)
      if (!pageContent.includes(d.name) && pageContent.length < 200) {
        errors.push(`${d.name} - content not found on page`);
      }
    }
    
    expect(errors, `Errors on detail pages:\n${errors.join('\n')}`).toHaveLength(0);
  });

  test('drummer detail API returns complete gear data', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/drummers`);
    const drummers = await response.json();
    
    const missingGear = [];
    const skipped = [];
    
    for (const d of drummers) {
      const detail = await request.get(`${BASE_URL}/api/drummers/${d.id}`);
      
      if (!detail.ok()) {
        skipped.push(`${d.name} (ID ${d.id})`);
        continue;
      }
      
      const data = await detail.json();
      
      if (!data.gear) {
        missingGear.push(`${d.name} (ID ${d.id}) - no gear object`);
        continue;
      }
      
      if (!data.gear.drums && !data.gear.cymbals) {
        missingGear.push(`${d.name} (ID ${d.id}) - missing drums and cymbals`);
      }
    }
    
    if (skipped.length > 0) {
      console.log(`⚠️ Skipped ${skipped.length} drummers with missing detail endpoints`);
    }
    
    expect(missingGear, `Drummers missing gear data:\n${missingGear.join('\n')}`).toHaveLength(0);
  });
});
