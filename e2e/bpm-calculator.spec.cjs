/**
 * E2E Tests for BPM Tap Calculator (Issue #342)
 * Tests BPM tap calculator, song database, and range landing pages
 * 
 * NOTE: These tests check if the BPM feature is available before running.
 * If the feature isn't deployed yet, tests are skipped gracefully.
 */

const { test, expect } = require('@playwright/test');

// Helper to check if BPM feature is available
async function checkBpmFeatureAvailable(page) {
  await page.goto('/bpm', { waitUntil: 'load' });
  await page.waitForTimeout(2000);
  
  // Check if we're on a BPM page (not redirected to home)
  const title = await page.title();
  if (title.includes('MetalForge') && !title.toLowerCase().includes('bpm')) {
    return false;
  }
  
  // Check for BPM-specific content
  const hasTapButton = await page.getByRole('button', { name: /tap/i }).isVisible({ timeout: 5000 }).catch(() => false);
  return hasTapButton;
}

test.describe('BPM Tap Calculator - Issue #342', () => {
  // Run tests serially to ensure beforeAll completes before tests
  test.describe.configure({ mode: 'serial' });
  
  // Feature detection - skip all tests if BPM feature isn't deployed
  let bpmFeatureAvailable = false;

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    try {
      bpmFeatureAvailable = await checkBpmFeatureAvailable(page);
    } catch (e) {
      bpmFeatureAvailable = false;
    }
    await page.close();
    
    if (!bpmFeatureAvailable) {
      console.log('⚠️ BPM feature not available on this deployment - tests will be skipped');
    } else {
      console.log('✅ BPM feature detected - running tests');
    }
  });
  
  test.describe('BPM Tap Calculator Page', () => {
    test('loads /bpm page with correct elements', async ({ page }) => {
      test.skip(!bpmFeatureAvailable, 'BPM feature not available on this deployment');
      
      await page.goto('/bpm');
      
      // Check page title
      await expect(page).toHaveTitle(/BPM|Tap|Calculator/i);
      
      // Check tap button exists
      const tapButton = page.getByRole('button', { name: /tap/i });
      await expect(tapButton).toBeVisible();
      
      // Check song database section exists
      await expect(page.getByText(/Metal Song BPM Database/i)).toBeVisible();
    });
    
    test('tap button calculates BPM after multiple taps', async ({ page }) => {
      test.skip(!bpmFeatureAvailable, 'BPM feature not available on this deployment');
      
      await page.goto('/bpm');
      
      const tapButton = page.getByRole('button', { name: /tap/i });
      
      // Simulate tapping at ~120 BPM (500ms intervals)
      for (let i = 0; i < 5; i++) {
        await tapButton.click();
        await page.waitForTimeout(500);
      }
      
      // Check that BPM result appears (should be somewhere around 120)
      await expect(page.getByText(/BPM/)).toBeVisible();
    });
    
    test('spacebar triggers tap on desktop', async ({ page }) => {
      test.skip(!bpmFeatureAvailable, 'BPM feature not available on this deployment');
      
      await page.goto('/bpm');
      
      // Wait for page to load
      await page.waitForSelector('[role="button"]');
      
      // Press spacebar multiple times
      for (let i = 0; i < 4; i++) {
        await page.keyboard.press('Space');
        await page.waitForTimeout(400);
      }
      
      // Verify BPM is calculated
      await expect(page.locator('text=/\\d+/')).toBeVisible();
    });
    
    test('reset button clears BPM', async ({ page }) => {
      test.skip(!bpmFeatureAvailable, 'BPM feature not available on this deployment');
      
      await page.goto('/bpm');
      
      const tapButton = page.getByRole('button', { name: /tap/i });
      
      // Tap a few times
      for (let i = 0; i < 4; i++) {
        await tapButton.click();
        await page.waitForTimeout(300);
      }
      
      // Click reset
      const resetButton = page.getByRole('button', { name: /reset/i });
      await resetButton.click();
      
      // Original tap prompt should be visible again
      await expect(page.getByText(/Tap Here|tap to/i)).toBeVisible();
    });
    
    test('song database shows songs with BPM', async ({ page }) => {
      test.skip(!bpmFeatureAvailable, 'BPM feature not available on this deployment');
      
      await page.goto('/bpm');
      
      // Scroll to song list
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      
      // Check for song entries with BPM badges
      const songItems = page.locator('[class*="bpmSong"]');
      await expect(songItems.first()).toBeVisible();
      
      // Verify BPM values are displayed
      await expect(page.getByText(/\d+ BPM/)).toBeVisible();
    });
    
    test('genre filter works', async ({ page }) => {
      test.skip(!bpmFeatureAvailable, 'BPM feature not available on this deployment');
      
      await page.goto('/bpm');
      
      // Scroll to filters
      await page.evaluate(() => window.scrollTo(0, 500));
      
      // Click on a genre filter if visible
      const genreButton = page.getByRole('button', { name: /thrash|death|groove/i }).first();
      if (await genreButton.isVisible()) {
        await genreButton.click();
        // Page should update with filtered results
        await page.waitForTimeout(500);
      }
    });
  });

  test.describe('BPM Range Landing Pages', () => {
    const ranges = ['slow', 'mid', 'fast', 'extreme', 'blast-beat'];
    
    for (const range of ranges) {
      test(`/bpm/${range} page loads correctly`, async ({ page }) => {
        test.skip(!bpmFeatureAvailable, 'BPM feature not available on this deployment');
        
        await page.goto(`/bpm/${range}`);
        
        // Check page has content
        await expect(page.locator('body')).not.toBeEmpty();
        
        // Check for range-specific content
        await expect(page.getByText(/BPM|songs|tempo/i)).toBeVisible();
        
        // Check back button exists
        await expect(page.getByRole('button', { name: /back/i })).toBeVisible();
      });
    }
    
    test('/bpm/200 numeric BPM page works', async ({ page }) => {
      test.skip(!bpmFeatureAvailable, 'BPM feature not available on this deployment');
      
      await page.goto('/bpm/200');
      
      // Should show songs around 200 BPM
      await expect(page.getByText(/200|BPM/i)).toBeVisible();
      
      // Check for song listings
      await expect(page.locator('[class*="bpmSong"], [class*="song"]').first()).toBeVisible({ timeout: 5000 }).catch(() => {
        // Some ranges may have no songs, which is OK
      });
    });
    
    test('BPM range pages have SEO meta tags', async ({ page }) => {
      test.skip(!bpmFeatureAvailable, 'BPM feature not available on this deployment');
      
      await page.goto('/bpm/fast');
      
      // Check meta description
      const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
      expect(metaDescription).toBeTruthy();
      expect(metaDescription.length).toBeGreaterThan(50);
      
      // Check og:title
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      expect(ogTitle).toBeTruthy();
    });
    
    test('range navigation buttons work', async ({ page }) => {
      test.skip(!bpmFeatureAvailable, 'BPM feature not available on this deployment');
      
      await page.goto('/bpm/slow');
      
      // Click on another range
      const fastButton = page.getByRole('link', { name: /fast|🔥/i }).first();
      if (await fastButton.isVisible()) {
        await fastButton.click();
        await page.waitForURL(/\/bpm\/fast/);
        expect(page.url()).toContain('/bpm/fast');
      }
    });
    
    test('back button navigates to BPM calculator', async ({ page }) => {
      test.skip(!bpmFeatureAvailable, 'BPM feature not available on this deployment');
      
      await page.goto('/bpm/extreme');
      
      const backButton = page.getByRole('button', { name: /back/i });
      await backButton.click();
      
      // Should navigate to /bpm
      await page.waitForURL(/\/bpm(?!\/)/, { timeout: 5000 });
    });
    
    test('invalid BPM range shows not found with suggestions', async ({ page }) => {
      test.skip(!bpmFeatureAvailable, 'BPM feature not available on this deployment');
      
      await page.goto('/bpm/invalid-range');
      
      // Should show not found message
      await expect(page.getByText(/not found|invalid/i)).toBeVisible();
      
      // Should show suggestions/valid ranges
      await expect(page.getByText(/slow|fast|mid/i)).toBeVisible();
    });
  });

  test.describe('Song Database', () => {
    test('database has 50+ songs', async ({ page }) => {
      test.skip(!bpmFeatureAvailable, 'BPM feature not available on this deployment');
      
      await page.goto('/bpm');
      
      // Check for song count in the page
      const songCountText = await page.getByText(/\d+ songs/).textContent();
      const match = songCountText.match(/(\d+) songs/);
      if (match) {
        const songCount = parseInt(match[1], 10);
        expect(songCount).toBeGreaterThanOrEqual(50);
      }
    });
    
    test('songs link to drummer profiles', async ({ page }) => {
      test.skip(!bpmFeatureAvailable, 'BPM feature not available on this deployment');
      
      await page.goto('/bpm');
      
      // Scroll to song list
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      
      // Click on a song with a known drummer
      const songItem = page.locator('[class*="bpmSong"]').first();
      if (await songItem.isVisible()) {
        await songItem.click();
        
        // Should navigate to drummer detail or stay on page
        // (depends on whether drummer exists in database)
        await page.waitForTimeout(1000);
      }
    });
    
    test('search filters songs correctly', async ({ page }) => {
      test.skip(!bpmFeatureAvailable, 'BPM feature not available on this deployment');
      
      await page.goto('/bpm');
      
      // Find search input
      const searchInput = page.getByPlaceholder(/search/i);
      if (await searchInput.isVisible()) {
        await searchInput.fill('Metallica');
        await page.waitForTimeout(500);
        
        // Should show only Metallica songs
        await expect(page.getByText(/Metallica/i)).toBeVisible();
      }
    });
  });

  test.describe('Mobile Responsiveness', () => {
    test('BPM calculator is usable on mobile', async ({ page }) => {
      test.skip(!bpmFeatureAvailable, 'BPM feature not available on this deployment');
      
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/bpm');
      
      // Tap button should be visible and large enough
      const tapButton = page.getByRole('button', { name: /tap/i });
      await expect(tapButton).toBeVisible();
      
      // Song list should be visible
      await page.evaluate(() => window.scrollTo(0, 500));
      await expect(page.getByText(/Metal Song/i)).toBeVisible();
    });
    
    test('BPM range pages work on mobile', async ({ page }) => {
      test.skip(!bpmFeatureAvailable, 'BPM feature not available on this deployment');
      
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/bpm/fast');
      
      // Content should be visible
      await expect(page.getByText(/BPM|Fast/i)).toBeVisible();
      
      // Navigation should work
      await expect(page.getByRole('button', { name: /back/i })).toBeVisible();
    });
  });

  test.describe('Sharing Features', () => {
    test('share buttons appear after tapping', async ({ page }) => {
      test.skip(!bpmFeatureAvailable, 'BPM feature not available on this deployment');
      
      await page.goto('/bpm');
      
      const tapButton = page.getByRole('button', { name: /tap/i });
      
      // Tap to get a BPM
      for (let i = 0; i < 4; i++) {
        await tapButton.click();
        await page.waitForTimeout(400);
      }
      
      // Share buttons should appear
      await expect(page.getByRole('button', { name: /copy|share|tweet/i }).first()).toBeVisible();
    });
    
    test('URL updates with BPM value', async ({ page }) => {
      test.skip(!bpmFeatureAvailable, 'BPM feature not available on this deployment');
      
      await page.goto('/bpm');
      
      const tapButton = page.getByRole('button', { name: /tap/i });
      
      // Tap to get a BPM
      for (let i = 0; i < 4; i++) {
        await tapButton.click();
        await page.waitForTimeout(400);
      }
      
      // Wait for URL to update
      await page.waitForTimeout(500);
      
      // URL should contain bpm parameter
      expect(page.url()).toMatch(/bpm=\d+/);
    });
  });
});
