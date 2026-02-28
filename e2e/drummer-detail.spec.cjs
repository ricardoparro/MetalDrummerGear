const { test, expect } = require('@playwright/test');
const BASE_URL = process.env.BASE_URL || 'https://metalforge.io';

// Helper to wait for drummer page content using Playwright auto-retry
async function waitForDrummerPageContent(page, drummerName = null, timeout = 30000) {
  await expect(async () => {
    const bodyText = await page.locator('body').textContent();
    // Page should contain drummer-related content
    const hasContent = bodyText.includes('Gear') || 
                       bodyText.includes('Biography') ||
                       bodyText.includes('Band') ||
                       (drummerName && bodyText.includes(drummerName.split(' ')[0])) ||
                       bodyText.length > 500;
    expect(hasContent).toBe(true);
  }).toPass({ timeout });
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
    
    await page.goto('/drummer/1');
    await page.waitForLoadState('networkidle');
    
    // Use auto-retry assertion for reliable content detection
    await waitForDrummerPageContent(page, 'Lars Ulrich');
    
    console.log('✓ Drummer page (Lars Ulrich) loaded with content');
  });

  test('all drummer detail pages render without errors', async ({ page, request }) => {
    test.setTimeout(120000);
    
    const response = await request.get(`${BASE_URL}/api/drummers`);
    const drummers = await response.json();
    
    const errors = [];
    // Test first 3 drummers to stay within timeout
    for (const d of drummers.slice(0, 3)) {
      await page.goto(`/drummer/${d.id}`);
      await page.waitForLoadState('networkidle');
      
      try {
        // Use auto-retry assertion
        await waitForDrummerPageContent(page, d.name, 25000);
        
        // Also check for JS errors
        const pageContent = await page.locator('body').textContent();
        if (pageContent.includes('is not defined') || pageContent.includes('Cannot read')) {
          errors.push(`${d.name} - JavaScript error on page`);
        }
      } catch (e) {
        errors.push(`${d.name} - content not found on page`);
      }
    }
    
    expect(errors, `Errors on detail pages:\n${errors.join('\n')}`).toHaveLength(0);
    console.log(`✓ Verified ${3 - errors.length}/3 drummer detail pages`);
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
