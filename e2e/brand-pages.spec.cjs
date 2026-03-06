// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * E2E tests for Gear Brand Landing Pages (Issue #656)
 * Tests cover:
 * - Brands index page (/brands)
 * - Individual brand pages (/brands/:slug)
 * - Brand information display
 * - Drummers using each brand
 * - Structured data markup
 * - Navigation and links
 */

const BASE_URL = process.env.BASE_URL || 'https://metalforge.io';

// Sample brand slugs to test
const DRUM_BRAND_SLUGS = ['tama', 'pearl', 'dw', 'ludwig'];
const CYMBAL_BRAND_SLUGS = ['zildjian', 'paiste', 'meinl', 'sabian'];
const ALL_BRAND_SLUGS = [...DRUM_BRAND_SLUGS, ...CYMBAL_BRAND_SLUGS];

/**
 * Helper to wait for lazy-loaded brand content
 */
async function waitForBrandContent(page, contentLocator, timeoutMs = 15000) {
  try {
    await contentLocator.waitFor({ state: 'visible', timeout: timeoutMs });
    return true;
  } catch {
    return false;
  }
}

test.describe('Brands Index Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/brands`);
    await page.waitForLoadState('networkidle');
  });

  test('should display the brands index page', async ({ page }) => {
    // Check page title
    const title = await page.title();
    expect(title).toContain('Brands');
    expect(title).toContain('MetalForge');
  });

  test('should display drum brands section', async ({ page }) => {
    // Check for drum brands header
    const drumBrandsHeader = page.getByText('🥁 Drum Brands');
    await expect(drumBrandsHeader).toBeVisible();

    // Check for drum brand cards
    for (const brand of DRUM_BRAND_SLUGS) {
      const brandName = brand.charAt(0).toUpperCase() + brand.slice(1);
      if (brandName === 'Dw') {
        await expect(page.getByText('DW', { exact: false })).toBeVisible();
      } else {
        await expect(page.getByText(brandName)).toBeVisible();
      }
    }
  });

  test('should display cymbal brands section', async ({ page }) => {
    // Check for cymbal brands header
    const cymbalBrandsHeader = page.getByText('🎼 Cymbal Brands');
    await expect(cymbalBrandsHeader).toBeVisible();

    // Check for cymbal brand cards
    for (const brand of CYMBAL_BRAND_SLUGS) {
      const brandName = brand.charAt(0).toUpperCase() + brand.slice(1);
      await expect(page.getByText(brandName)).toBeVisible();
    }
  });

  test('should navigate to brand detail page when clicking a brand', async ({ page }) => {
    // Click on Tama brand card
    const tamaCard = page.getByText('Tama').first();
    await tamaCard.click();

    // Verify URL changed
    await expect(page).toHaveURL(/\/brands\/tama/);

    // Verify brand page content
    await expect(page.getByText('Metal Drummers Using Tama')).toBeVisible();
  });

  test('should have back button that works', async ({ page }) => {
    // Click back button
    const backButton = page.getByRole('button', { name: /back/i });
    await backButton.click();

    // Should navigate to home
    await expect(page).toHaveURL(/^https:\/\/metalforge\.io\/?$/);
  });
});

test.describe('Brand Landing Page - Tama', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/brands/tama`);
    await page.waitForLoadState('networkidle');
  });

  test('should display the brand header', async ({ page }) => {
    // Check for brand name
    await expect(page.getByRole('heading', { name: /Tama/i }).first()).toBeVisible();

    // Check for brand type indicator
    await expect(page.getByText(/Drum Brand/i)).toBeVisible();

    // Check for founded year
    await expect(page.getByText(/Est\. 1974/i)).toBeVisible();
  });

  test('should display brand description', async ({ page }) => {
    // Check for description text
    await expect(page.getByText(/Japanese drum manufacturer/i)).toBeVisible();
  });

  test('should display drummers using this brand', async ({ page }) => {
    // Check for drummers section header
    await expect(page.getByText(/Metal Drummers Using Tama/i)).toBeVisible();

    // Should list some drummers (Lars Ulrich uses Tama)
    const drummersList = page.locator('[class*="drummer"]').first();
    await expect(drummersList).toBeVisible();
  });

  test('should display popular models section', async ({ page }) => {
    // Check for popular models header
    await expect(page.getByText(/Popular Tama Models/i)).toBeVisible();

    // Should show Starclassic Maple
    await expect(page.getByText(/Starclassic Maple/i)).toBeVisible();
  });

  test('should display FAQ section', async ({ page }) => {
    // Check for FAQ header
    await expect(page.getByText(/Frequently Asked Questions/i)).toBeVisible();

    // Should have FAQ content
    await expect(page.getByText(/What Tama drums do metal drummers use/i)).toBeVisible();
  });

  test('should have proper SEO meta tags', async ({ page }) => {
    // Check page title
    const title = await page.title();
    expect(title).toContain('Tama');
    expect(title).toContain('Metal Drummers');

    // Check meta description
    const metaDescription = await page.getAttribute('meta[name="description"]', 'content');
    expect(metaDescription).toContain('Tama');

    // Check canonical URL
    const canonicalUrl = await page.getAttribute('link[rel="canonical"]', 'href');
    expect(canonicalUrl).toBe('https://metalforge.io/brands/tama');
  });

  test('should have structured data markup', async ({ page }) => {
    // Check for brand schema
    const brandScript = await page.$('script[data-schema="brand"]');
    expect(brandScript).not.toBeNull();

    const brandSchemaContent = await brandScript.textContent();
    const brandSchema = JSON.parse(brandSchemaContent);

    // Check for Organization schema
    const orgSchema = brandSchema['@graph']?.find(item => item['@type'] === 'Organization');
    expect(orgSchema).toBeTruthy();
    expect(orgSchema.name).toBe('Tama');

    // Check for CollectionPage schema
    const collectionSchema = brandSchema['@graph']?.find(item => item['@type'] === 'CollectionPage');
    expect(collectionSchema).toBeTruthy();
  });

  test('should navigate to other brands', async ({ page }) => {
    // Find explore other brands section
    const exploreBrandsSection = page.getByText(/Explore Other Drum Brands/i);
    await expect(exploreBrandsSection).toBeVisible();

    // Click on Pearl
    const pearlLink = page.getByText(/Pearl →/i);
    await pearlLink.click();

    // Verify navigation
    await expect(page).toHaveURL(/\/brands\/pearl/);
  });

  test('should navigate to drummer profile when clicking drummer', async ({ page }) => {
    // Find a drummer in the list and click
    const drummerLink = page.locator('[role="button"]').filter({ hasText: /Lars Ulrich|George Kollias/i }).first();
    
    if (await drummerLink.count() > 0) {
      await drummerLink.click();
      
      // Should navigate to drummer page
      await expect(page).toHaveURL(/\/drummer\//);
    }
  });
});

test.describe('Brand Landing Page - Zildjian (Cymbals)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/brands/zildjian`);
    await page.waitForLoadState('networkidle');
  });

  test('should display cymbal brand information', async ({ page }) => {
    // Check for brand name
    await expect(page.getByRole('heading', { name: /Zildjian/i }).first()).toBeVisible();

    // Check for cymbal brand type
    await expect(page.getByText(/Cymbal Brand/i)).toBeVisible();

    // Check for founded year (1623!)
    await expect(page.getByText(/Est\. 1623/i)).toBeVisible();
  });

  test('should show explore other cymbal brands', async ({ page }) => {
    // Should show other cymbal brands, not drum brands
    await expect(page.getByText(/Explore Other Cymbal Brands/i)).toBeVisible();
    await expect(page.getByText(/Paiste →/i)).toBeVisible();
    await expect(page.getByText(/Meinl →/i)).toBeVisible();
  });
});

test.describe('Brand Page Navigation', () => {
  test('should handle direct URL access', async ({ page }) => {
    // Navigate directly to a brand page
    await page.goto(`${BASE_URL}/brands/pearl`);
    await page.waitForLoadState('networkidle');

    // Should show Pearl brand page
    await expect(page.getByRole('heading', { name: /Pearl/i }).first()).toBeVisible();
  });

  test('should handle invalid brand slug', async ({ page }) => {
    // Navigate to invalid brand
    await page.goto(`${BASE_URL}/brands/invalid-brand-name`);
    await page.waitForLoadState('networkidle');

    // Should show not found message
    await expect(page.getByText(/Brand Not Found/i)).toBeVisible();
  });

  test('should navigate back to brands list from brand page', async ({ page }) => {
    // Start at brand page
    await page.goto(`${BASE_URL}/brands/meinl`);
    await page.waitForLoadState('networkidle');

    // Click back
    const backButton = page.getByRole('button', { name: /back/i });
    await backButton.click();

    // Should go to brands list
    await expect(page).toHaveURL(/\/brands\/?$/);
  });
});

test.describe('Brand Pages Mobile Responsiveness', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE

  test('should be responsive on mobile', async ({ page }) => {
    await page.goto(`${BASE_URL}/brands`);
    await page.waitForLoadState('networkidle');

    // Brand cards should be visible
    await expect(page.getByText('🥁 Drum Brands')).toBeVisible();

    // Navigate to brand detail
    await page.goto(`${BASE_URL}/brands/tama`);
    await page.waitForLoadState('networkidle');

    // Content should still be accessible
    await expect(page.getByRole('heading', { name: /Tama/i }).first()).toBeVisible();
  });
});
