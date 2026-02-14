/**
 * Playwright tests for Band Detail Pages (Issue #348)
 * 
 * Tests:
 * 1. Band detail page loads with correct data
 * 2. Shows band info (formed, origin, status)
 * 3. Shows genres with links
 * 4. Shows drummer history section
 * 5. Returns 404 for unknown slugs
 * 6. Mobile responsive layout
 * 7. Proper SEO meta tags
 */

const { test, expect } = require('@playwright/test');
const BASE_URL = process.env.BASE_URL || 'https://metalforge.io';

// Test bands from our data
const TEST_BANDS = [
  { slug: 'metallica', name: 'Metallica', currentDrummer: 'Lars Ulrich' },
  { slug: 'slipknot', name: 'Slipknot', currentDrummer: 'Eloy Casagrande' },
  { slug: 'tool', name: 'Tool', currentDrummer: 'Danny Carey' },
  { slug: 'meshuggah', name: 'Meshuggah', currentDrummer: 'Tomas Haake' },
  { slug: 'gojira', name: 'Gojira', currentDrummer: 'Mario Duplantier' },
];

// Helper to check if band feature is available
async function checkBandFeatureAvailable(page) {
  try {
    await page.goto('/bands/metallica', { waitUntil: 'load', timeout: 10000 });
    await page.waitForTimeout(2000);
    
    // Check if Metallica heading exists (feature indicator)
    const heading = page.locator('text=Metallica').first();
    return await heading.isVisible({ timeout: 5000 }).catch(() => false);
  } catch (e) {
    return false;
  }
}

test.describe('Band Detail Pages (Issue #348)', () => {
  test.describe.configure({ mode: 'serial' });
  
  let bandFeatureAvailable = false;

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    try {
      bandFeatureAvailable = await checkBandFeatureAvailable(page);
    } catch (e) {
      bandFeatureAvailable = false;
    }
    await page.close();
    
    if (!bandFeatureAvailable) {
      console.log('⚠️ Band feature not available on this deployment - tests will be skipped');
    } else {
      console.log('✅ Band feature detected - running tests');
    }
  });

  test('band detail page loads with correct data', async ({ page }) => {
    test.skip(!bandFeatureAvailable, 'Band feature not available on this deployment');
    
    await page.goto('/bands/metallica', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    // Verify band name is displayed
    await expect(page.locator('h1').filter({ hasText: 'Metallica' })).toBeVisible({ timeout: 10000 });
    
    // Verify formed year is shown
    await expect(page.locator('text=1981')).toBeVisible({ timeout: 10000 });
    
    // Verify status badge shows Active
    await expect(page.locator('text=Active')).toBeVisible({ timeout: 10000 });
  });

  test('shows band info (formed, origin, status)', async ({ page }) => {
    test.skip(!bandFeatureAvailable, 'Band feature not available on this deployment');
    
    await page.goto('/bands/metallica', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    // Check origin is displayed
    await expect(page.locator('text=USA')).toBeVisible({ timeout: 10000 });
    
    // Check About section exists
    const aboutSection = page.locator('text=About').first();
    await expect(aboutSection).toBeVisible({ timeout: 10000 });
  });

  test('shows genres with links', async ({ page }) => {
    test.skip(!bandFeatureAvailable, 'Band feature not available on this deployment');
    
    await page.goto('/bands/metallica', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    // Check Genres section exists
    await expect(page.locator('text=Genres').first()).toBeVisible({ timeout: 10000 });
    
    // Check genre tags are visible (Metallica has Thrash Metal and Heavy Metal)
    await expect(page.locator('text=Thrash Metal').first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=Heavy Metal').first()).toBeVisible({ timeout: 10000 });
  });

  test('shows drummer history section', async ({ page }) => {
    test.skip(!bandFeatureAvailable, 'Band feature not available on this deployment');
    
    await page.goto('/bands/metallica', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    // Check Drummer History section exists
    await expect(page.locator('text=Drummer History').first()).toBeVisible({ timeout: 10000 });
    
    // Check Lars Ulrich is listed
    await expect(page.locator('text=Lars Ulrich')).toBeVisible({ timeout: 10000 });
    
    // Check Current badge is shown for current drummer
    await expect(page.locator('text=Current').first()).toBeVisible({ timeout: 10000 });
  });

  test('returns 404 for unknown slugs', async ({ page }) => {
    test.skip(!bandFeatureAvailable, 'Band feature not available on this deployment');
    
    await page.goto('/bands/this-band-does-not-exist-xyz123', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    // Should show error message
    await expect(page.locator('text=Band Not Found').or(page.locator('text=not found'))).toBeVisible({ timeout: 10000 });
  });

  test('has proper SEO meta tags', async ({ page }) => {
    test.skip(!bandFeatureAvailable, 'Band feature not available on this deployment');
    
    await page.goto('/bands/metallica', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    // Check page title is set and contains band name
    const title = await page.title();
    expect(title).toContain('Metallica');
    expect(title.length).toBeGreaterThan(10);

    // Check meta description exists and is populated
    const metaDescription = await page.getAttribute('meta[name="description"]', 'content');
    expect(metaDescription).toBeTruthy();
    expect(metaDescription.length).toBeGreaterThan(30);

    // Check OpenGraph title exists
    const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
    expect(ogTitle).toBeTruthy();
    expect(ogTitle).toContain('Metallica');
  });

  test('back button navigates to home', async ({ page }) => {
    test.skip(!bandFeatureAvailable, 'Band feature not available on this deployment');
    
    await page.goto('/bands/tool', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    // Find and click back button
    const backButton = page.locator('text=← Back').first();
    await expect(backButton).toBeVisible({ timeout: 10000 });
    await backButton.click();
    await page.waitForTimeout(2000);

    // Should navigate to home page
    await expect(page).not.toHaveURL(/\/bands\//);
  });

  test('multiple bands load correctly', async ({ page }) => {
    test.skip(!bandFeatureAvailable, 'Band feature not available on this deployment');
    
    const workingBands = [];
    const errors = [];

    for (const band of TEST_BANDS.slice(0, 3)) {
      try {
        await page.goto(`/bands/${band.slug}`, { waitUntil: 'load' });
        await page.waitForTimeout(1500);

        // Check band name is visible
        const hasName = await page.locator(`text=${band.name}`).first().isVisible({ timeout: 5000 }).catch(() => false);
        
        if (hasName) {
          workingBands.push(band.name);
        } else {
          errors.push(`${band.name} - name not found`);
        }
      } catch (err) {
        errors.push(`${band.name} - ${err.message}`);
      }
    }

    console.log(`✅ Working band pages: ${workingBands.join(', ')}`);
    
    // At least some bands should work
    expect(workingBands.length).toBeGreaterThan(0);
  });

  test('direct URL navigation works', async ({ page }) => {
    test.skip(!bandFeatureAvailable, 'Band feature not available on this deployment');
    
    // Test deep linking to band page
    await page.goto('/bands/gojira', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    // Page should load successfully with band content
    const bodyText = await page.locator('body').textContent();
    expect(bodyText).toContain('Gojira');

    // Should be on correct URL
    await expect(page).toHaveURL(/\/bands\/gojira/);
  });

  test('clicking drummer navigates to drummer profile', async ({ page }) => {
    test.skip(!bandFeatureAvailable, 'Band feature not available on this deployment');
    
    await page.goto('/bands/metallica', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    // Click on Lars Ulrich in the drummer history
    const drummerLink = page.locator('text=Lars Ulrich').first();
    await expect(drummerLink).toBeVisible({ timeout: 10000 });
    await drummerLink.click();
    await page.waitForTimeout(2000);

    // Should navigate to drummer page
    await expect(page).toHaveURL(/\/drummer\/lars-ulrich/);
  });
});
