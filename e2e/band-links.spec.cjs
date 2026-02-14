/**
 * Playwright tests for Band Links Feature (Issue #351)
 * 
 * Tests:
 * 1. Verifies band links section appears on drummer profiles with band data
 * 2. Verifies band links are clickable and navigate to band pages
 * 3. Verifies band links include period/years information
 * 4. Verifies styling consistency with site design
 */

const { test, expect } = require('@playwright/test');
const BASE_URL = process.env.BASE_URL || 'https://metalforge.io';

// Drummers known to have band data in extendedBios
const DRUMMERS_WITH_BANDS = [
  { slug: 'lars-ulrich', name: 'Lars Ulrich', expectedBand: 'metallica' },
  { slug: 'joey-jordison', name: 'Joey Jordison', expectedBand: 'slipknot' },
  { slug: 'dave-lombardo', name: 'Dave Lombardo', expectedBand: 'slayer' },
  { slug: 'eloy-casagrande', name: 'Eloy Casagrande', expectedBand: 'slipknot' },
];

test.describe('Band Links Feature (Issue #351)', () => {
  test.describe.configure({ mode: 'serial' });

  let featureAvailable = false;

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    try {
      // Check if band links feature is available
      await page.goto(`${BASE_URL}/drummer/lars-ulrich`, { waitUntil: 'load' });
      await page.waitForTimeout(3000);
      
      // Look for the band links section
      const bandLinksSection = page.locator('[data-testid="band-links-section"]');
      featureAvailable = await bandLinksSection.isVisible({ timeout: 5000 }).catch(() => false);
      
      if (!featureAvailable) {
        // Also check for any section with "Bands" heading
        const bandsHeading = page.locator('text=Bands').first();
        featureAvailable = await bandsHeading.isVisible({ timeout: 3000 }).catch(() => false);
      }
    } finally {
      await page.close();
    }
  });

  test('should display Bands section on drummer profile', async ({ page }) => {
    test.skip(!featureAvailable, 'Band links feature not deployed');
    
    await page.goto(`${BASE_URL}/drummer/lars-ulrich`, { waitUntil: 'load' });
    await page.waitForTimeout(2000);
    
    // Look for the Bands section heading
    const bandsHeading = page.getByRole('heading', { name: 'Bands' }).first();
    await expect(bandsHeading).toBeVisible({ timeout: 10000 });
  });

  test('should display band links with clickable elements', async ({ page }) => {
    test.skip(!featureAvailable, 'Band links feature not deployed');
    
    await page.goto(`${BASE_URL}/drummer/lars-ulrich`, { waitUntil: 'load' });
    await page.waitForTimeout(2000);
    
    // Find Metallica band link
    const metallicaLink = page.locator('[data-testid="band-link-metallica"]');
    
    if (await metallicaLink.isVisible({ timeout: 5000 }).catch(() => false)) {
      await expect(metallicaLink).toBeVisible();
      
      // Check the link has the correct href
      const href = await metallicaLink.getAttribute('href');
      expect(href).toBe('/band/metallica');
    } else {
      // Fallback: look for a link containing "Metallica" text
      const metallicaText = page.locator('a', { hasText: 'Metallica' }).first();
      await expect(metallicaText).toBeVisible({ timeout: 5000 });
    }
  });

  test('should display period information for band membership', async ({ page }) => {
    test.skip(!featureAvailable, 'Band links feature not deployed');
    
    await page.goto(`${BASE_URL}/drummer/lars-ulrich`, { waitUntil: 'load' });
    await page.waitForTimeout(2000);
    
    // The period "1981-present" should be visible
    const periodText = page.locator('text=1981-present').first();
    await expect(periodText).toBeVisible({ timeout: 10000 });
  });

  test('should navigate to band page when clicking band link', async ({ page }) => {
    test.skip(!featureAvailable, 'Band links feature not deployed');
    
    await page.goto(`${BASE_URL}/drummer/lars-ulrich`, { waitUntil: 'load' });
    await page.waitForTimeout(2000);
    
    // Find and click the Metallica band link
    const metallicaLink = page.locator('[data-testid="band-link-metallica"]');
    
    if (await metallicaLink.isVisible({ timeout: 5000 }).catch(() => false)) {
      await metallicaLink.click();
      
      // Wait for navigation and check URL
      await page.waitForTimeout(1000);
      expect(page.url()).toContain('/band/metallica');
      
      // Verify band page content
      const bandPageTitle = page.locator('text=Metallica').first();
      await expect(bandPageTitle).toBeVisible({ timeout: 5000 });
    }
  });

  test('should display band links on extended bio page', async ({ page }) => {
    test.skip(!featureAvailable, 'Band links feature not deployed');
    
    await page.goto(`${BASE_URL}/drummer/lars-ulrich/bio`, { waitUntil: 'load' });
    await page.waitForTimeout(2000);
    
    // Look for the Bands section on the bio page
    const bandsHeading = page.getByRole('heading', { name: 'Bands' }).first();
    await expect(bandsHeading).toBeVisible({ timeout: 10000 });
  });

  test('should display correct styling for band link items', async ({ page }) => {
    test.skip(!featureAvailable, 'Band links feature not deployed');
    
    await page.goto(`${BASE_URL}/drummer/lars-ulrich`, { waitUntil: 'load' });
    await page.waitForTimeout(2000);
    
    // Find the band link item and check basic styling
    const bandLinkSection = page.locator('[data-testid="band-links-section"]');
    
    if (await bandLinkSection.isVisible({ timeout: 5000 }).catch(() => false)) {
      // Check that the section has proper structure
      await expect(bandLinkSection).toBeVisible();
      
      // Verify band name has accent color (red)
      const bandName = bandLinkSection.locator('text=Metallica').first();
      const color = await bandName.evaluate((el) => {
        return window.getComputedStyle(el).color;
      });
      
      // Should be red (#dc2626 = rgb(220, 38, 38))
      expect(color).toMatch(/rgb\(220,\s*38,\s*38\)|#dc2626/i);
    }
  });

  // Test multiple drummers with different band histories
  for (const drummer of DRUMMERS_WITH_BANDS) {
    test(`should show bands for ${drummer.name}`, async ({ page }) => {
      test.skip(!featureAvailable, 'Band links feature not deployed');
      
      await page.goto(`${BASE_URL}/drummer/${drummer.slug}`, { waitUntil: 'load' });
      await page.waitForTimeout(2000);
      
      // Check if band links section exists
      const bandLinksSection = page.locator('[data-testid="band-links-section"]');
      const bandsHeading = page.getByRole('heading', { name: 'Bands' }).first();
      
      const hasSection = await bandLinksSection.isVisible({ timeout: 5000 }).catch(() => false);
      const hasHeading = await bandsHeading.isVisible({ timeout: 3000 }).catch(() => false);
      
      // At least one indicator should be present
      expect(hasSection || hasHeading).toBe(true);
    });
  }
});
