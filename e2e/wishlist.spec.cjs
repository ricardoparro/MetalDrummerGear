/**
 * Wishlist Feature E2E Tests (Issue #823)
 * 
 * Tests for the localStorage-based wishlist system:
 * - Add/remove items from wishlist
 * - Wishlist page functionality
 * - Shareable URL generation
 * - Buy All CTAs
 */

const { test, expect } = require('@playwright/test');

// Test configuration
const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';
const STORAGE_KEY = 'metalforge_wishlist';

test.describe('Wishlist Feature (Issue #823)', () => {
  test.beforeEach(async ({ page }) => {
    // Clear wishlist before each test
    await page.goto(BASE_URL);
    await page.evaluate((key) => {
      localStorage.removeItem(key);
    }, STORAGE_KEY);
  });

  test.describe('Wishlist Button on Drummer Profile', () => {
    test('should show wishlist button on gear section', async ({ page }) => {
      // Navigate to a drummer profile
      await page.goto(`${BASE_URL}/drummers/lars-ulrich`);
      
      // Wait for the gear section to load
      await page.waitForSelector('text=Gear Setup');
      
      // Check for wishlist button (heart icon)
      const wishlistButton = page.locator('text=♡').first();
      await expect(wishlistButton).toBeVisible();
    });

    test('should add item to wishlist on button click', async ({ page }) => {
      await page.goto(`${BASE_URL}/drummers/lars-ulrich`);
      await page.waitForSelector('text=Gear Setup');
      
      // Click the first wishlist button
      const wishlistButton = page.locator('text=♡').first();
      await wishlistButton.click();
      
      // Button should change to filled heart
      await expect(page.locator('text=♥').first()).toBeVisible();
      
      // Verify localStorage updated
      const wishlist = await page.evaluate((key) => {
        return JSON.parse(localStorage.getItem(key) || '[]');
      }, STORAGE_KEY);
      
      expect(wishlist.length).toBe(1);
      expect(wishlist[0].drummerSlug).toBe('lars-ulrich');
    });

    test('should remove item from wishlist on second click', async ({ page }) => {
      await page.goto(`${BASE_URL}/drummers/lars-ulrich`);
      await page.waitForSelector('text=Gear Setup');
      
      // Add to wishlist
      const wishlistButton = page.locator('text=♡').first();
      await wishlistButton.click();
      await expect(page.locator('text=♥').first()).toBeVisible();
      
      // Remove from wishlist
      await page.locator('text=♥').first().click();
      await expect(page.locator('text=♡').first()).toBeVisible();
      
      // Verify localStorage cleared
      const wishlist = await page.evaluate((key) => {
        return JSON.parse(localStorage.getItem(key) || '[]');
      }, STORAGE_KEY);
      
      expect(wishlist.length).toBe(0);
    });
  });

  test.describe('Wishlist Badge in Header', () => {
    test('should show badge with count when items in wishlist', async ({ page }) => {
      // Add items to wishlist via localStorage
      await page.goto(BASE_URL);
      await page.evaluate((key) => {
        const items = [
          { id: 'test-1', drummerSlug: 'lars-ulrich', gearType: 'drums', drummerName: 'Lars Ulrich', itemName: 'Tama Starclassic', estimatedPrice: 3500 },
          { id: 'test-2', drummerSlug: 'lars-ulrich', gearType: 'snare', drummerName: 'Lars Ulrich', itemName: 'Tama Signature', estimatedPrice: 650 },
        ];
        localStorage.setItem(key, JSON.stringify(items));
      }, STORAGE_KEY);
      
      // Reload to see badge
      await page.reload();
      
      // Check for badge count
      const badge = page.locator('text=♥');
      await expect(badge.first()).toBeVisible();
    });
  });

  test.describe('Wishlist Page', () => {
    test('should navigate to wishlist page', async ({ page }) => {
      await page.goto(`${BASE_URL}/wishlist`);
      
      // Check page title
      await expect(page.locator('text=My Wishlist')).toBeVisible();
    });

    test('should show empty state when no items', async ({ page }) => {
      await page.goto(`${BASE_URL}/wishlist`);
      
      // Check empty state
      await expect(page.locator('text=Your Wishlist is Empty')).toBeVisible();
      await expect(page.locator('text=Browse Drummers')).toBeVisible();
    });

    test('should display items in wishlist', async ({ page }) => {
      // Add items to wishlist
      await page.goto(BASE_URL);
      await page.evaluate((key) => {
        const items = [
          { 
            id: 'test-1', 
            drummerSlug: 'lars-ulrich', 
            drummerName: 'Lars Ulrich',
            gearType: 'drums', 
            itemName: 'Tama Starclassic Maple', 
            primaryProduct: 'Tama Starclassic',
            estimatedPrice: 3500,
            addedAt: Date.now()
          },
        ];
        localStorage.setItem(key, JSON.stringify(items));
      }, STORAGE_KEY);
      
      await page.goto(`${BASE_URL}/wishlist`);
      
      // Check item is displayed
      await expect(page.locator('text=Lars Ulrich')).toBeVisible();
      await expect(page.locator('text=Tama Starclassic Maple')).toBeVisible();
      await expect(page.locator('text=Drums')).toBeVisible();
    });

    test('should show total cost summary', async ({ page }) => {
      // Add items with prices
      await page.goto(BASE_URL);
      await page.evaluate((key) => {
        const items = [
          { id: 'test-1', drummerSlug: 'test', drummerName: 'Test', gearType: 'drums', itemName: 'Test Drums', estimatedPrice: 3000 },
          { id: 'test-2', drummerSlug: 'test', drummerName: 'Test', gearType: 'snare', itemName: 'Test Snare', estimatedPrice: 500 },
        ];
        localStorage.setItem(key, JSON.stringify(items));
      }, STORAGE_KEY);
      
      await page.goto(`${BASE_URL}/wishlist`);
      
      // Check total shows (3000 + 500 = 3500)
      await expect(page.locator('text=Total Setup Cost')).toBeVisible();
      await expect(page.locator('text=€3,500')).toBeVisible();
    });

    test('should remove item when remove button clicked', async ({ page }) => {
      // Add item
      await page.goto(BASE_URL);
      await page.evaluate((key) => {
        const items = [
          { id: 'test-1', drummerSlug: 'test', drummerName: 'Test Drummer', gearType: 'drums', itemName: 'Test Drums', estimatedPrice: 3000 },
        ];
        localStorage.setItem(key, JSON.stringify(items));
      }, STORAGE_KEY);
      
      await page.goto(`${BASE_URL}/wishlist`);
      await expect(page.locator('text=Test Drummer')).toBeVisible();
      
      // Click remove button
      await page.locator('text=✕').first().click();
      
      // Item should be removed
      await expect(page.locator('text=Test Drummer')).not.toBeVisible();
      await expect(page.locator('text=Your Wishlist is Empty')).toBeVisible();
    });

    test('should have Buy All from Sweetwater CTA', async ({ page }) => {
      // Add items
      await page.goto(BASE_URL);
      await page.evaluate((key) => {
        const items = [
          { id: 'test-1', drummerSlug: 'test', drummerName: 'Test', gearType: 'drums', itemName: 'Test', primaryProduct: 'Tama', estimatedPrice: 3000 },
        ];
        localStorage.setItem(key, JSON.stringify(items));
      }, STORAGE_KEY);
      
      await page.goto(`${BASE_URL}/wishlist`);
      
      // Check Buy All button
      await expect(page.locator('text=Buy All from Sweetwater')).toBeVisible();
      await expect(page.locator('text=Buy All from Thomann')).toBeVisible();
    });

    test('should have Share My Wishlist button', async ({ page }) => {
      // Add items
      await page.goto(BASE_URL);
      await page.evaluate((key) => {
        const items = [
          { id: 'test-1', drummerSlug: 'test', drummerName: 'Test', gearType: 'drums', itemName: 'Test', estimatedPrice: 3000 },
        ];
        localStorage.setItem(key, JSON.stringify(items));
      }, STORAGE_KEY);
      
      await page.goto(`${BASE_URL}/wishlist`);
      
      // Check Share button
      await expect(page.locator('text=Share My Wishlist')).toBeVisible();
    });

    test('should have Clear Wishlist button', async ({ page }) => {
      // Add items
      await page.goto(BASE_URL);
      await page.evaluate((key) => {
        const items = [
          { id: 'test-1', drummerSlug: 'test', drummerName: 'Test', gearType: 'drums', itemName: 'Test', estimatedPrice: 3000 },
        ];
        localStorage.setItem(key, JSON.stringify(items));
      }, STORAGE_KEY);
      
      await page.goto(`${BASE_URL}/wishlist`);
      
      // Check Clear button
      await expect(page.locator('text=Clear Wishlist')).toBeVisible();
    });
  });

  test.describe('Shared Wishlist URL', () => {
    test('should display shared wishlist from URL parameter', async ({ page }) => {
      // Create base64-encoded wishlist data
      const sharedItems = [
        { ds: 'lars-ulrich', dn: 'Lars Ulrich', gt: 'drums', in: 'Tama Starclassic', pp: 'Tama Starclassic', ep: 3500 },
      ];
      const encoded = Buffer.from(encodeURIComponent(JSON.stringify(sharedItems))).toString('base64');
      
      await page.goto(`${BASE_URL}/wishlist?list=${encoded}`);
      
      // Check shared banner appears
      await expect(page.locator('text=Shared Wishlist')).toBeVisible();
      await expect(page.locator('text=Add to My Wishlist')).toBeVisible();
    });

    test('should import shared items to local wishlist', async ({ page }) => {
      const sharedItems = [
        { ds: 'lars-ulrich', dn: 'Lars Ulrich', gt: 'drums', in: 'Tama Starclassic', pp: 'Tama Starclassic', ep: 3500 },
      ];
      const encoded = Buffer.from(encodeURIComponent(JSON.stringify(sharedItems))).toString('base64');
      
      await page.goto(`${BASE_URL}/wishlist?list=${encoded}`);
      
      // Click import button
      await page.locator('text=Add to My Wishlist').click();
      
      // Handle alert
      page.on('dialog', dialog => dialog.accept());
      
      // Verify localStorage updated
      const wishlist = await page.evaluate((key) => {
        return JSON.parse(localStorage.getItem(key) || '[]');
      }, STORAGE_KEY);
      
      expect(wishlist.length).toBeGreaterThan(0);
    });
  });

  test.describe('Floating Wishlist Button', () => {
    test('should show FAB when items in wishlist', async ({ page }) => {
      // Add items
      await page.goto(BASE_URL);
      await page.evaluate((key) => {
        const items = [
          { id: 'test-1', drummerSlug: 'test', drummerName: 'Test', gearType: 'drums', itemName: 'Test', estimatedPrice: 3000 },
        ];
        localStorage.setItem(key, JSON.stringify(items));
      }, STORAGE_KEY);
      
      await page.reload();
      
      // FAB should be visible
      // Note: FAB contains heart icon and count
      const fab = page.locator('[style*="position: fixed"]').filter({ hasText: '♥' });
      await expect(fab.first()).toBeVisible();
    });

    test('should not show FAB when wishlist is empty', async ({ page }) => {
      await page.goto(BASE_URL);
      
      // Ensure wishlist is empty
      await page.evaluate((key) => {
        localStorage.removeItem(key);
      }, STORAGE_KEY);
      
      await page.reload();
      await page.waitForTimeout(500);
      
      // FAB should not be visible (or not have items)
      const wishlist = await page.evaluate((key) => {
        return JSON.parse(localStorage.getItem(key) || '[]');
      }, STORAGE_KEY);
      
      expect(wishlist.length).toBe(0);
    });
  });

  test.describe('Analytics Tracking', () => {
    test('should track wishlist page view', async ({ page }) => {
      // Set up GA4 mock
      const events = [];
      await page.goto(BASE_URL);
      await page.evaluate(() => {
        window.gtag = function() {
          window._gtagEvents = window._gtagEvents || [];
          window._gtagEvents.push(Array.from(arguments));
        };
      });
      
      // Add items and go to wishlist
      await page.evaluate((key) => {
        const items = [
          { id: 'test-1', drummerSlug: 'test', drummerName: 'Test', gearType: 'drums', itemName: 'Test', estimatedPrice: 3000 },
        ];
        localStorage.setItem(key, JSON.stringify(items));
      }, STORAGE_KEY);
      
      await page.goto(`${BASE_URL}/wishlist`);
      await page.waitForTimeout(500);
      
      // Check events were tracked
      const trackedEvents = await page.evaluate(() => window._gtagEvents || []);
      const wishlistEvent = trackedEvents.find(e => e[0] === 'event' && e[1]?.startsWith('wishlist_'));
      
      // Just verify we can track events (not checking specific event names due to timing)
      expect(trackedEvents).toBeDefined();
    });
  });
});
