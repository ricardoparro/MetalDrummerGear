// @ts-check
const { test, expect } = require('@playwright/test');

// Issue #345: Gear comparison pages E2E tests

test.describe('Gear Comparison Pages', () => {
  test.describe('Comparison Index Page', () => {
    test('should load the gear comparisons index page', async ({ page }) => {
      await page.goto('/compare-gear');
      
      // Check page title
      await expect(page).toHaveTitle(/Gear Comparisons/i);
      
      // Check meta description
      const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
      expect(metaDescription).toContain('Compare top drum brands');
    });

    test('should display available gear comparisons', async ({ page }) => {
      await page.goto('/compare-gear');
      
      // Wait for content to load
      await page.waitForLoadState('networkidle');
      
      // Check for comparison cards/links
      const comparisonLinks = page.locator('text=/Tama vs Pearl|Meinl vs Zildjian|Iron Cobra vs Demon Drive/i');
      await expect(comparisonLinks.first()).toBeVisible();
    });

    test('should navigate to individual comparison page', async ({ page }) => {
      await page.goto('/compare-gear');
      await page.waitForLoadState('networkidle');
      
      // Click on first comparison
      const firstComparison = page.locator('text=/Tama vs Pearl/i').first();
      await firstComparison.click();
      
      // Check URL changed
      await expect(page).toHaveURL(/\/compare-gear\/tama-vs-pearl/);
    });
  });

  test.describe('Tama vs Pearl Comparison', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/compare-gear/tama-vs-pearl');
    });

    test('should display comparison title', async ({ page }) => {
      await expect(page.locator('text=Tama vs Pearl Drums')).toBeVisible();
    });

    test('should show both brands with specs', async ({ page }) => {
      // Check for both brands
      await expect(page.locator('text=Tama').first()).toBeVisible();
      await expect(page.locator('text=Pearl').first()).toBeVisible();
      
      // Check for Starclassic and Reference models
      await expect(page.locator('text=/Starclassic/i')).toBeVisible();
      await expect(page.locator('text=/Reference/i')).toBeVisible();
    });

    test('should display pros and cons section', async ({ page }) => {
      await expect(page.locator('text=/Pros.*Cons/is').first()).toBeVisible();
    });

    test('should display specs comparison table', async ({ page }) => {
      await expect(page.locator('text=Specifications')).toBeVisible();
    });

    test('should show "Who Uses What" section with drummers', async ({ page }) => {
      // Check for drummer names in the comparison
      const drummerSection = page.locator('text=/Lars Ulrich|Joey Jordison|Gene Hoglan|Dave Lombardo/i');
      await expect(drummerSection.first()).toBeVisible();
    });

    test('should have correct meta tags for SEO', async ({ page }) => {
      // Check title
      await expect(page).toHaveTitle(/Tama vs Pearl/i);
      
      // Check meta description
      const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
      expect(metaDescription).toContain('Tama');
      expect(metaDescription).toContain('Pearl');
    });

    test('should have structured data', async ({ page }) => {
      // Check for JSON-LD structured data
      const structuredData = await page.locator('script[data-schema="gear-comparison"]').textContent();
      expect(structuredData).toBeTruthy();
      
      const parsed = JSON.parse(structuredData);
      expect(parsed['@type']).toBe('ItemPage');
      expect(parsed.about).toHaveLength(2);
      expect(parsed.about[0]['@type']).toBe('Brand');
    });

    test('should have back button to index', async ({ page }) => {
      const backButton = page.locator('text=/Back to Comparisons/i');
      await expect(backButton).toBeVisible();
      
      await backButton.click();
      await expect(page).toHaveURL('/compare-gear');
    });
  });

  test.describe('Meinl vs Zildjian Comparison', () => {
    test('should load and display cymbal comparison', async ({ page }) => {
      await page.goto('/compare-gear/meinl-vs-zildjian');
      
      await expect(page.locator('text=Meinl vs Zildjian')).toBeVisible();
      await expect(page.locator('text=/Byzance/i')).toBeVisible();
      await expect(page.locator('text=/A Custom/i')).toBeVisible();
    });
  });

  test.describe('Iron Cobra vs Demon Drive Comparison', () => {
    test('should load and display pedal comparison', async ({ page }) => {
      await page.goto('/compare-gear/tama-iron-cobra-vs-pearl-demon-drive');
      
      await expect(page.locator('text=/Iron Cobra.*Demon Drive/i')).toBeVisible();
    });

    test('should show price ranges', async ({ page }) => {
      await page.goto('/compare-gear/tama-iron-cobra-vs-pearl-demon-drive');
      
      // Check for price displays (€ symbol)
      const priceElements = page.locator('text=/€[0-9]/');
      await expect(priceElements.first()).toBeVisible();
    });
  });

  test.describe('Mobile Responsiveness', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('should display comparison page correctly on mobile', async ({ page }) => {
      await page.goto('/compare-gear/tama-vs-pearl');
      
      // Both brands should be visible
      await expect(page.locator('text=Tama').first()).toBeVisible();
      await expect(page.locator('text=Pearl').first()).toBeVisible();
      
      // VS badge should be visible
      await expect(page.locator('text=VS')).toBeVisible();
    });

    test('should have scrollable specs table on mobile', async ({ page }) => {
      await page.goto('/compare-gear/tama-vs-pearl');
      
      // Specs section should be visible
      await expect(page.locator('text=Specifications')).toBeVisible();
    });
  });

  test.describe('Navigation and Links', () => {
    test('should link to gear pages from comparison', async ({ page }) => {
      await page.goto('/compare-gear/tama-vs-pearl');
      
      // Check for links to individual gear or category pages
      // These should be present in the "Who Uses What" or specs sections
      await page.waitForLoadState('networkidle');
    });

    test('should have internal navigation working', async ({ page }) => {
      // Start at index
      await page.goto('/compare-gear');
      await page.waitForLoadState('networkidle');
      
      // Navigate to a comparison
      await page.locator('text=/Tama vs Pearl/i').first().click();
      await expect(page).toHaveURL(/\/compare-gear\/tama-vs-pearl/);
      
      // Go back
      await page.locator('text=/Back/i').first().click();
      await expect(page).toHaveURL('/compare-gear');
    });
  });
});

test.describe('Sitemap includes comparisons', () => {
  test('should include gear comparison URLs in sitemap', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    const content = await response.text();
    
    // Check for comparison index page
    expect(content).toContain('/compare-gear</loc>');
    
    // Check for individual comparison pages
    expect(content).toContain('/compare-gear/tama-vs-pearl</loc>');
    expect(content).toContain('/compare-gear/meinl-vs-zildjian</loc>');
    expect(content).toContain('/compare-gear/tama-iron-cobra-vs-pearl-demon-drive</loc>');
  });
});
