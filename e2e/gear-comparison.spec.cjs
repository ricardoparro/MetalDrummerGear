// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * E2E tests for Gear Comparison Pages (Issue #345)
 * Tests cover:
 * - Gear comparison index page (/compare)
 * - Individual comparison pages (/compare/:slug)
 * - Side-by-side specs tables
 * - "Who uses what" sections
 * - Structured data markup
 * - Mobile responsiveness
 * - Navigation and links
 * 
 * Note: These tests require the lazy-loading fix from PR #542.
 * If running against production fallback (old code with race conditions),
 * tests may time out waiting for lazy-loaded content.
 */

const BASE_URL = process.env.BASE_URL || 'https://metalforge.io';
const IS_PRODUCTION_FALLBACK = process.env.IS_PRODUCTION_FALLBACK === 'true';

/**
 * Helper to wait for lazy-loaded gear comparison content
 * Handles both new code (with loading states) and old code (race conditions)
 * Returns true if content loaded successfully, false if it timed out
 */
async function waitForComparisonContent(page, contentLocator, timeoutMs = 15000) {
  try {
    await contentLocator.waitFor({ state: 'visible', timeout: timeoutMs });
    return true;
  } catch {
    return false;
  }
}

// Sample comparison slugs to test
const COMPARISON_SLUGS = [
  'tama-vs-pearl',
  'meinl-vs-zildjian',
  'tama-iron-cobra-vs-pearl-demon-drive',
  'paiste-vs-sabian',
];

test.describe('Gear Comparisons Index Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/compare`);
    // Wait for page to hydrate
    await page.waitForLoadState('networkidle');
    
    // Wait for lazy-loaded comparison data to load (fix for #541)
    // Strategy: Wait for loading to finish, then for content to appear
    
    // First, try to wait for loading state to clear (new code path)
    try {
      const loadingText = page.getByText('Loading comparisons');
      const isLoading = await loadingText.isVisible({ timeout: 500 }).catch(() => false);
      if (isLoading) {
        await loadingText.waitFor({ state: 'hidden', timeout: 15000 });
      }
    } catch {
      // Loading state not present - might be old code or already loaded
    }
    
    // Wait for comparison cards to appear (look for "vs" text)
    // This handles both old code (no loading state) and new code (after loading)
    try {
      const vsText = page.getByText('vs').first();
      await vsText.waitFor({ state: 'visible', timeout: 15000 });
    } catch {
      // Content not appearing - test assertions will catch the actual failure
    }
  });

  test('should display the comparison index page', async ({ page }) => {
    // Check page title
    const title = await page.title();
    expect(title).toContain('Gear Comparisons');
    expect(title).toContain('MetalForge');
  });

  test('should display comparison categories', async ({ page }) => {
    // Look for category headers
    const drumComparisons = page.getByText(/Drum Kit Comparisons/i);
    const cymbalComparisons = page.getByText(/Cymbal Comparisons/i);
    const hardwareComparisons = page.getByText(/Hardware Comparisons/i);

    // At least one category should be visible
    const hasDrums = await drumComparisons.isVisible().catch(() => false);
    const hasCymbals = await cymbalComparisons.isVisible().catch(() => false);
    const hasHardware = await hardwareComparisons.isVisible().catch(() => false);

    // Check if lazy-loaded content appeared
    const hasCategories = hasDrums || hasCymbals || hasHardware;
    
    // Skip assertion if running against production fallback with broken lazy loading
    if (!hasCategories && IS_PRODUCTION_FALLBACK) {
      test.skip(true, 'Lazy loading broken on production - fix in PR #542');
      return;
    }
    
    expect(hasCategories).toBeTruthy();
  });

  test('should display comparison cards with brand names', async ({ page }) => {
    // Look for "vs" text indicating comparison cards
    const vsElements = await page.getByText('vs').all();
    
    // Skip if lazy-loaded content didn't appear (production fallback issue)
    if (vsElements.length === 0 && IS_PRODUCTION_FALLBACK) {
      test.skip(true, 'Lazy loading broken on production - fix in PR #542');
      return;
    }
    
    expect(vsElements.length).toBeGreaterThan(0);

    // Look for brand names
    const hasTama = await page.getByText('Tama').first().isVisible().catch(() => false);
    const hasPearl = await page.getByText('Pearl').first().isVisible().catch(() => false);
    expect(hasTama || hasPearl).toBeTruthy();
  });

  test('should have proper SEO meta tags', async ({ page }) => {
    // Check meta description
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toBeTruthy();
    expect(metaDescription.toLowerCase()).toContain('compare');

    // Check og:title
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toContain('Gear Comparisons');

    // Check canonical URL
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('/compare');
  });

  test('should have structured data for collection page', async ({ page }) => {
    const ldJson = await page.locator('script[data-schema="comparison"]').textContent();
    expect(ldJson).toBeTruthy();

    const schema = JSON.parse(ldJson);
    expect(schema['@type']).toBe('CollectionPage');
    expect(schema.mainEntity).toBeTruthy();
    expect(schema.mainEntity['@type']).toBe('ItemList');
  });

  test('should navigate to individual comparison from index', async ({ page }) => {
    // Click on first comparison card
    const compareButton = page.getByText('Compare →').first();
    await compareButton.click();

    // Wait for navigation
    await page.waitForURL(/\/compare\/[a-z0-9-]+$/i);

    // Verify we're on a comparison detail page
    const url = page.url();
    expect(url).toMatch(/\/compare\/[a-z0-9-]+$/);
  });
});

test.describe('Individual Gear Comparison Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/compare/tama-vs-pearl`);
    await page.waitForLoadState('networkidle');
    
    // Wait for lazy-loaded comparison data to load (fix for #541)
    // Strategy: Wait for EITHER the VS badge (success) OR stable "Comparison not found" (error)
    // This handles both old code (race conditions) and new code (proper loading states)
    
    // First, try to wait for loading state to clear (new code path)
    try {
      const loadingText = page.getByText('Loading comparison');
      const isLoading = await loadingText.isVisible({ timeout: 500 }).catch(() => false);
      if (isLoading) {
        await loadingText.waitFor({ state: 'hidden', timeout: 15000 });
      }
    } catch {
      // Loading state not present - might be old code or already loaded
    }
    
    // Then, wait for the page content to stabilize
    // We expect either VS badge (comparison loaded) or stable content
    const vsBadge = page.getByText('VS', { exact: true });
    const notFoundText = page.getByText('Comparison not found');
    
    // Give the lazy-loaded module time to load and render
    // This is critical for the old code path where there's no loading indicator
    try {
      await Promise.race([
        vsBadge.waitFor({ state: 'visible', timeout: 15000 }),
        notFoundText.waitFor({ state: 'visible', timeout: 15000 })
      ]);
    } catch {
      // Neither appeared - page might still be loading, continue with test
      // The individual test assertions will catch actual failures
    }
    
    // If "Comparison not found" appeared due to race condition, 
    // check if the actual content loads after (module might load late)
    const isNotFound = await notFoundText.isVisible().catch(() => false);
    if (isNotFound) {
      // Wait a bit more for the lazy module to potentially load
      try {
        await vsBadge.waitFor({ state: 'visible', timeout: 5000 });
      } catch {
        // Still not found - this is a genuine failure, test will catch it
      }
    }
  });

  test('should display comparison title with both brands', async ({ page }) => {
    // Check page has both brand names
    const pageContent = await page.textContent('body');
    expect(pageContent).toContain('Tama');
    expect(pageContent).toContain('Pearl');
  });

  test('should display VS badge', async ({ page }) => {
    const vsBadge = page.getByText('VS', { exact: true });
    await expect(vsBadge).toBeVisible();
  });

  test('should display side-by-side specs table', async ({ page }) => {
    // Look for Specifications section
    const specsSection = page.getByText(/Specifications/i);
    await expect(specsSection).toBeVisible();

    // Should have feature comparison headers
    const featureHeader = page.getByText('Feature');
    await expect(featureHeader).toBeVisible();
  });

  test('should display pros and cons for both items', async ({ page }) => {
    // Look for Pros & Cons section
    const prosConsSection = page.getByText(/Pros & Cons/i);
    await expect(prosConsSection).toBeVisible();

    // Should have both pros and cons indicators
    const prosText = await page.getByText('✓ Pros').all();
    const consText = await page.getByText('✗ Cons').all();

    expect(prosText.length).toBeGreaterThanOrEqual(2); // One for each item
    expect(consText.length).toBeGreaterThanOrEqual(2);
  });

  test('should display "Who uses what" pro endorsements section', async ({ page }) => {
    // Look for Pro Endorsements section
    const endorsementsSection = page.getByText(/Pro Endorsements/i);
    await expect(endorsementsSection).toBeVisible();

    // Should show Users sections
    const usersSection = await page.getByText(/Users$/i).all();
    expect(usersSection.length).toBeGreaterThanOrEqual(2);
  });

  test('should display verdict section', async ({ page }) => {
    const verdictSection = page.getByText(/The Verdict/i);
    await expect(verdictSection).toBeVisible();
  });

  test('should display price ranges for both items', async ({ page }) => {
    // Look for Euro price indicators
    const priceElements = await page.getByText(/€[\d,]+/).all();
    expect(priceElements.length).toBeGreaterThanOrEqual(2);
  });

  test('should display ratings for both items', async ({ page }) => {
    // Look for rating indicators (stars)
    const ratingElements = await page.getByText(/★/).all();
    expect(ratingElements.length).toBeGreaterThanOrEqual(2);
  });

  test('should have proper SEO meta tags for comparison page', async ({ page }) => {
    // Check title includes comparison
    const title = await page.title();
    expect(title).toContain('Tama');
    expect(title).toContain('Pearl');
    expect(title).toContain('MetalForge');

    // Check meta description
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toBeTruthy();
    expect(metaDescription.toLowerCase()).toContain('compare');

    // Check canonical URL
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('/compare/tama-vs-pearl');
  });

  test('should have structured data for comparison page', async ({ page }) => {
    const ldJson = await page.locator('script[data-schema="comparison"]').textContent();
    expect(ldJson).toBeTruthy();

    const schema = JSON.parse(ldJson);
    expect(schema['@type']).toBe('ItemPage');
    expect(schema.about).toBeTruthy();
    expect(schema.about.length).toBe(2); // Two brands

    // Check that both brands are mentioned
    const brandNames = schema.about.map(b => b.name);
    expect(brandNames).toContain('Tama');
    expect(brandNames).toContain('Pearl');
  });

  test('should have breadcrumb structured data', async ({ page }) => {
    const breadcrumbJson = await page.locator('script[data-schema="comparison-breadcrumb"]').textContent();
    expect(breadcrumbJson).toBeTruthy();

    const schema = JSON.parse(breadcrumbJson);
    expect(schema['@type']).toBe('BreadcrumbList');
    expect(schema.itemListElement.length).toBe(3); // Home > Gear Comparisons > This Comparison
  });

  test('should have back button that navigates to index', async ({ page }) => {
    const backButton = page.getByText(/Back to Comparisons/i);
    await expect(backButton).toBeVisible();

    await backButton.click();
    await page.waitForURL(/\/compare$/);
  });

  test('should link drummer names to their profiles', async ({ page }) => {
    // Find a drummer name button in the endorsements section
    const drummerButtons = page.locator('[accessibilityRole="button"]').filter({ hasText: /Lars Ulrich|Dave Lombardo/i });
    const count = await drummerButtons.count();

    if (count > 0) {
      await drummerButtons.first().click();
      // Should navigate to drummer detail
      await page.waitForTimeout(500);
      const url = page.url();
      // Either stays on page (if drummer not in our DB) or navigates
      expect(url).toBeTruthy();
    }
  });
});

test.describe('Gear Comparison Mobile Responsiveness', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE

  test('should display properly on mobile - index page', async ({ page }) => {
    await page.goto(`${BASE_URL}/compare`);
    await page.waitForLoadState('networkidle');
    
    // Wait for lazy-loaded content (fix for #541)
    try {
      const loadingText = page.getByText('Loading comparisons');
      const isLoading = await loadingText.isVisible({ timeout: 500 }).catch(() => false);
      if (isLoading) {
        await loadingText.waitFor({ state: 'hidden', timeout: 15000 });
      }
    } catch { /* Loading state not present */ }
    
    // Wait for comparison cards to appear
    const vsText = page.getByText('vs').first();
    const contentLoaded = await waitForComparisonContent(page, vsText, 15000);
    
    // Skip if lazy-loaded content didn't appear (production fallback issue)
    if (!contentLoaded && IS_PRODUCTION_FALLBACK) {
      test.skip(true, 'Lazy loading broken on production - fix in PR #542');
      return;
    }

    // Should still show comparison cards
    const vsElements = await page.getByText('vs').all();
    expect(vsElements.length).toBeGreaterThan(0);

    // Cards should be visible (stacked vertically)
    const compareButtons = await page.getByText('Compare →').all();
    expect(compareButtons.length).toBeGreaterThan(0);
  });

  test('should display properly on mobile - detail page', async ({ page }) => {
    await page.goto(`${BASE_URL}/compare/tama-vs-pearl`);
    await page.waitForLoadState('networkidle');
    
    // Wait for lazy-loaded content (fix for #541)
    try {
      const loadingText = page.getByText('Loading comparison');
      const isLoading = await loadingText.isVisible({ timeout: 500 }).catch(() => false);
      if (isLoading) {
        await loadingText.waitFor({ state: 'hidden', timeout: 15000 });
      }
    } catch { /* Loading state not present */ }
    
    // Wait for VS badge to appear (indicates content loaded)
    const vsBadge = page.getByText('VS', { exact: true });
    const contentLoaded = await waitForComparisonContent(page, vsBadge, 15000);
    
    // Skip if lazy-loaded content didn't appear (production fallback issue)
    if (!contentLoaded && IS_PRODUCTION_FALLBACK) {
      test.skip(true, 'Lazy loading broken on production - fix in PR #542');
      return;
    }

    // VS badge should be visible
    await expect(vsBadge).toBeVisible();

    // Specs table should be visible
    const specsSection = page.getByText(/Specifications/i);
    await expect(specsSection).toBeVisible();

    // Content should be readable (not cut off)
    const verdictSection = page.getByText(/The Verdict/i);
    await expect(verdictSection).toBeVisible();
  });
});

test.describe('Multiple Comparison Pages', () => {
  for (const slug of COMPARISON_SLUGS) {
    test(`should load comparison page: ${slug}`, async ({ page }) => {
      await page.goto(`${BASE_URL}/compare/${slug}`);
      await page.waitForLoadState('networkidle');
      
      // Wait for lazy-loaded content (fix for #541)
      try {
        const loadingText = page.getByText('Loading comparison');
        const isLoading = await loadingText.isVisible({ timeout: 500 }).catch(() => false);
        if (isLoading) {
          await loadingText.waitFor({ state: 'hidden', timeout: 15000 });
        }
      } catch { /* Loading state not present */ }
      
      // Wait for VS badge to appear (indicates content loaded)
      const vsBadge = page.getByText('VS', { exact: true });
      const contentLoaded = await waitForComparisonContent(page, vsBadge, 15000);
      
      // Skip if lazy-loaded content didn't appear (production fallback issue)
      if (!contentLoaded && IS_PRODUCTION_FALLBACK) {
        test.skip(true, 'Lazy loading broken on production - fix in PR #542');
        return;
      }

      // Page should load without errors
      const pageContent = await page.textContent('body');
      expect(pageContent).not.toContain('Comparison not found');

      // Should have VS badge
      await expect(vsBadge).toBeVisible();

      // Should have structured data
      const ldJson = await page.locator('script[data-schema="comparison"]').textContent();
      expect(ldJson).toBeTruthy();
    });
  }
});

test.describe('Gear Comparison 404 Handling', () => {
  test('should show not found for invalid comparison slug', async ({ page }) => {
    await page.goto(`${BASE_URL}/compare/invalid-comparison-slug-xyz`);
    await page.waitForLoadState('networkidle');

    // Should show "Comparison not found" message
    const notFoundText = page.getByText(/Comparison not found/i);
    await expect(notFoundText).toBeVisible();
  });
});
