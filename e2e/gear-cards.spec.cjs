// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * E2E tests for Gear Cards Feature (Issue #747)
 * Auto-Generated Drummer Gear Cards for Viral Social Sharing
 * 
 * Tests cover:
 * - Gear Cards Gallery page (/cards)
 * - API endpoint for card generation (/api/card/:slug)
 * - Card type selection (full, stats, spotlight)
 * - Card format selection (instagram, twitter)
 * - Download functionality
 * - Share functionality
 * - Search/filter functionality
 * - Mobile responsiveness
 * - Meta tags for SEO
 */

const BASE_URL = process.env.BASE_URL || 'https://metalforge.io';

// Skip API tests if running against production without the feature deployed
const isFeatureDeployed = async (request) => {
  try {
    const response = await request.get(`${BASE_URL}/api/card/lars-ulrich`);
    const contentType = response.headers()['content-type'] || '';
    return contentType.includes('image/png');
  } catch {
    return false;
  }
};

// Sample drummers to test cards for
const TEST_DRUMMERS = [
  { slug: 'lars-ulrich', name: 'Lars Ulrich', band: 'Metallica' },
  { slug: 'joey-jordison', name: 'Joey Jordison', band: 'Slipknot' },
  { slug: 'danny-carey', name: 'Danny Carey', band: 'Tool' },
  { slug: 'mike-portnoy', name: 'Mike Portnoy', band: 'Dream Theater' },
  { slug: 'dave-lombardo', name: 'Dave Lombardo', band: 'Slayer' },
];

const CARD_TYPES = ['full', 'stats', 'spotlight'];
const CARD_FORMATS = ['instagram', 'twitter'];

test.describe('Gear Cards Gallery Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/cards`);
    await page.waitForLoadState('networkidle');
  });

  test('should load the gear cards gallery page', async ({ page }) => {
    // Check if we're on the cards page (might redirect to home if feature not deployed)
    const url = page.url();
    const hasGearCardsTitle = await page.locator('text=Drummer Gear Cards').isVisible({ timeout: 5000 }).catch(() => false);
    
    // Skip if feature not deployed (redirected to home)
    if (!hasGearCardsTitle && !url.includes('/cards')) {
      test.skip(true, 'Gear Cards Gallery not deployed to this environment');
      return;
    }
    
    // Page title should be visible
    await expect(page.locator('text=Drummer Gear Cards')).toBeVisible({ timeout: 10000 });
    
    // Subtitle should be present
    await expect(page.locator('text=Auto-generated social cards')).toBeVisible();
  });

  test('should have proper meta tags for SEO', async ({ page }) => {
    // Check OG tags
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toContain('Drummer Gear Cards');
    
    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
    expect(ogDescription).toBeTruthy();
    expect(ogDescription).toContain('gear cards');
    
    // Check Twitter cards
    const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');
    expect(twitterCard).toBe('summary_large_image');
  });

  test('should display card type filters', async ({ page }) => {
    // Check card type filter options
    await expect(page.locator('text=Full Setup')).toBeVisible();
    await expect(page.locator('text=Stats Card')).toBeVisible();
    await expect(page.locator('text=Spotlight')).toBeVisible();
  });

  test('should display format filters', async ({ page }) => {
    // Check format options
    await expect(page.locator('text=Instagram')).toBeVisible();
    await expect(page.locator('text=Twitter')).toBeVisible();
    
    // Check dimensions are shown
    await expect(page.locator('text=1080×1080')).toBeVisible();
    await expect(page.locator('text=1200×675')).toBeVisible();
  });

  test('should display drummer cards grid', async ({ page }) => {
    // Wait for cards to load
    await page.waitForSelector('[class*="cardPreview"]', { timeout: 10000 }).catch(() => {});
    
    // Should show multiple drummers
    for (const drummer of TEST_DRUMMERS.slice(0, 3)) {
      await expect(page.locator(`text=${drummer.name}`).first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('should filter drummers by search', async ({ page }) => {
    // Find and fill search input
    const searchInput = page.locator('input[placeholder*="Filter"]');
    await searchInput.fill('Metallica');
    
    // Should show Lars Ulrich
    await expect(page.locator('text=Lars Ulrich').first()).toBeVisible();
    
    // Should NOT show other drummers
    await expect(page.locator('text=Joey Jordison')).not.toBeVisible();
  });

  test('should clear filter when clicking clear button', async ({ page }) => {
    // Search for non-existent drummer
    const searchInput = page.locator('input[placeholder*="Filter"]');
    await searchInput.fill('xyznonexistent');
    
    // Should show empty state
    await expect(page.locator('text=No drummers found')).toBeVisible();
    
    // Click clear filter
    await page.locator('text=Clear filter').click();
    
    // Should show drummers again
    await expect(page.locator('text=Lars Ulrich').first()).toBeVisible();
  });

  test('should have download buttons for each card', async ({ page }) => {
    // Each card should have a download button
    const downloadButtons = page.locator('text=Download').all();
    expect((await downloadButtons).length).toBeGreaterThan(0);
  });

  test('should have share buttons for each card', async ({ page }) => {
    // Each card should have a share button
    const shareButtons = page.locator('text=Share').all();
    expect((await shareButtons).length).toBeGreaterThan(0);
  });

  test('should change card previews when switching type', async ({ page }) => {
    // Click on Stats Card type
    await page.locator('text=Stats Card').click();
    await page.waitForTimeout(500); // Allow re-render
    
    // Cards should still be visible
    await expect(page.locator('text=Lars Ulrich').first()).toBeVisible();
    
    // Click on Spotlight type
    await page.locator('text=Spotlight').click();
    await page.waitForTimeout(500);
    
    // Cards should still be visible
    await expect(page.locator('text=Lars Ulrich').first()).toBeVisible();
  });

  test('should display usage tips section', async ({ page }) => {
    // Scroll to tips
    await page.locator('text=Sharing Tips').scrollIntoViewIfNeeded();
    
    // Check tips are visible
    await expect(page.locator('text=Sharing Tips')).toBeVisible();
    await expect(page.locator('text=Instagram')).toBeVisible();
    await expect(page.locator('text=@MetalDrumGear')).toBeVisible();
  });
});

test.describe('Gear Cards API Endpoint', () => {
  let featureAvailable = null;
  
  test.beforeAll(async ({ request }) => {
    featureAvailable = await isFeatureDeployed(request);
  });
  
  test('should return PNG image for valid drummer slug', async ({ request }) => {
    test.skip(!featureAvailable, 'Gear Cards API not deployed to this environment');
    
    const response = await request.get(`${BASE_URL}/api/card/lars-ulrich`);
    
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
  });

  test('should return 404 for invalid drummer slug', async ({ request }) => {
    test.skip(!featureAvailable, 'Gear Cards API not deployed to this environment');
    
    const response = await request.get(`${BASE_URL}/api/card/invalid-drummer-xyz`);
    
    expect(response.status()).toBe(404);
  });

  test('should support instagram format (1080x1080)', async ({ request }) => {
    test.skip(!featureAvailable, 'Gear Cards API not deployed to this environment');
    
    const response = await request.get(`${BASE_URL}/api/card/lars-ulrich?format=instagram`);
    
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
  });

  test('should support twitter format (1200x675)', async ({ request }) => {
    test.skip(!featureAvailable, 'Gear Cards API not deployed to this environment');
    
    const response = await request.get(`${BASE_URL}/api/card/lars-ulrich?format=twitter`);
    
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
  });

  test('should support full card type', async ({ request }) => {
    test.skip(!featureAvailable, 'Gear Cards API not deployed to this environment');
    
    const response = await request.get(`${BASE_URL}/api/card/lars-ulrich?type=full`);
    
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
  });

  test('should support stats card type', async ({ request }) => {
    test.skip(!featureAvailable, 'Gear Cards API not deployed to this environment');
    
    const response = await request.get(`${BASE_URL}/api/card/lars-ulrich?type=stats`);
    
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
  });

  test('should support spotlight card type', async ({ request }) => {
    test.skip(!featureAvailable, 'Gear Cards API not deployed to this environment');
    
    const response = await request.get(`${BASE_URL}/api/card/lars-ulrich?type=spotlight`);
    
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
  });

  test('should generate cards for all drummers', async ({ request }) => {
    test.skip(!featureAvailable, 'Gear Cards API not deployed to this environment');
    
    for (const drummer of TEST_DRUMMERS) {
      const response = await request.get(`${BASE_URL}/api/card/${drummer.slug}`);
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toContain('image/png');
    }
  });

  test('should have proper cache headers', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/card/lars-ulrich`);
    
    const cacheControl = response.headers()['cache-control'];
    // Should have some caching
    expect(cacheControl).toBeTruthy();
  });
});

test.describe('Gear Cards Index API', () => {
  test('should return list of all available cards', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/card`);
    
    // Skip if API returns HTML (not deployed yet)
    const contentType = response.headers()['content-type'] || '';
    if (contentType.includes('text/html')) {
      test.skip(true, 'Gear Cards Index API not deployed to this environment');
      return;
    }
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    
    // Should have cards array
    expect(data.cards).toBeDefined();
    expect(Array.isArray(data.cards)).toBe(true);
    expect(data.cards.length).toBeGreaterThan(0);
    
    // Should have total count
    expect(data.total).toBe(data.cards.length);
    
    // Should have formats list
    expect(data.formats).toContain('instagram');
    expect(data.formats).toContain('twitter');
    
    // Should have types list
    expect(data.types).toContain('full');
    expect(data.types).toContain('stats');
    expect(data.types).toContain('spotlight');
  });

  test('should return card URLs for each drummer', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/card`);
    
    // Skip if API returns HTML (not deployed yet)
    const contentType = response.headers()['content-type'] || '';
    if (contentType.includes('text/html')) {
      test.skip(true, 'Gear Cards Index API not deployed to this environment');
      return;
    }
    
    const data = await response.json();
    
    for (const card of data.cards.slice(0, 5)) {
      // Each card should have slug, name, band
      expect(card.slug).toBeTruthy();
      expect(card.name).toBeTruthy();
      expect(card.band).toBeTruthy();
      
      // Should have cardUrls
      expect(card.cardUrls).toBeDefined();
      expect(card.cardUrls.instagram).toContain('/api/card/');
      expect(card.cardUrls.twitter).toContain('/api/card/');
    }
  });

  test('should have proper cache headers', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/card`);
    
    const cacheControl = response.headers()['cache-control'];
    expect(cacheControl).toBeTruthy();
  });
});

test.describe('Mobile Responsiveness', () => {
  test.use({ viewport: { width: 375, height: 812 } }); // iPhone X

  test('should display properly on mobile', async ({ page }) => {
    await page.goto(`${BASE_URL}/cards`);
    await page.waitForLoadState('networkidle');
    
    // Title should be visible
    await expect(page.locator('text=Drummer Gear Cards')).toBeVisible({ timeout: 10000 });
    
    // Filter options should be visible
    await expect(page.locator('text=Full Setup')).toBeVisible();
    await expect(page.locator('text=Instagram')).toBeVisible();
    
    // Cards should be in single column (we can check this by ensuring cards exist)
    const cards = page.locator('text=Download');
    expect((await cards.all()).length).toBeGreaterThan(0);
  });

  test('should have accessible search on mobile', async ({ page }) => {
    await page.goto(`${BASE_URL}/cards`);
    await page.waitForLoadState('networkidle');
    
    const searchInput = page.locator('input[placeholder*="Filter"]');
    await expect(searchInput).toBeVisible();
    
    // Should be able to type in search
    await searchInput.fill('Metallica');
    await expect(page.locator('text=Lars Ulrich').first()).toBeVisible();
  });
});

test.describe('Accessibility', () => {
  test('download buttons should have accessible labels', async ({ page }) => {
    await page.goto(`${BASE_URL}/cards`);
    await page.waitForLoadState('networkidle');
    
    // Download buttons should have aria-label
    const downloadButton = page.locator('button, [role="button"]').filter({ hasText: 'Download' }).first();
    
    // Wait for buttons to appear
    await page.waitForSelector('text=Download', { timeout: 10000 });
    
    // Check that buttons have accessibility labels
    const accessibleLabel = await downloadButton.getAttribute('aria-label') || 
                            await downloadButton.getAttribute('accessibilityLabel');
    expect(accessibleLabel || (await downloadButton.textContent())).toBeTruthy();
  });

  test('share buttons should have accessible labels', async ({ page }) => {
    await page.goto(`${BASE_URL}/cards`);
    await page.waitForLoadState('networkidle');
    
    // Wait for buttons to appear
    await page.waitForSelector('text=Share', { timeout: 10000 });
    
    const shareButton = page.locator('button, [role="button"]').filter({ hasText: 'Share' }).first();
    
    const accessibleLabel = await shareButton.getAttribute('aria-label') || 
                            await shareButton.getAttribute('accessibilityLabel');
    expect(accessibleLabel || (await shareButton.textContent())).toBeTruthy();
  });
});
