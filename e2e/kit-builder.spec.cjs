/**
 * E2E Tests for Drum Kit Builder (Issue #341)
 * Tests kit builder functionality, preset kits, sharing, and affiliate links
 */

const { test, expect } = require('@playwright/test');

test.describe('Drum Kit Builder - Issue #341', () => {
  
  test.describe('Kit Builder Page Loading', () => {
    test('loads /kit-builder page with correct elements', async ({ page }) => {
      await page.goto('/kit-builder');
      
      // Check page title
      await expect(page).toHaveTitle(/Kit Builder|Drum Kit|MetalForge/i);
      
      // Check main title is visible
      await expect(page.getByText(/Drum Kit Builder/i)).toBeVisible();
      
      // Check subtitle
      await expect(page.getByText(/Build your dream metal kit/i)).toBeVisible();
      
      // Check back button exists
      await expect(page.getByRole('button', { name: /back/i })).toBeVisible();
    });
    
    test('displays kit name input field', async ({ page }) => {
      await page.goto('/kit-builder');
      
      // Check kit name input is present
      const kitNameInput = page.getByPlaceholder(/Metal Beast/i);
      await expect(kitNameInput).toBeVisible();
      
      // Check label
      await expect(page.getByText(/Kit Name/i)).toBeVisible();
    });
    
    test('displays category tabs', async ({ page }) => {
      await page.goto('/kit-builder');
      
      // Check all category tabs are visible
      await expect(page.getByRole('button', { name: /Shell Pack/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /Snare/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /Cymbals/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /Hardware/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /Sticks/i })).toBeVisible();
    });
    
    test('has proper SEO meta tags', async ({ page }) => {
      await page.goto('/kit-builder');
      
      // Check meta description
      const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
      expect(metaDescription).toBeTruthy();
      expect(metaDescription.length).toBeGreaterThan(50);
      
      // Check og:title
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      expect(ogTitle).toBeTruthy();
      expect(ogTitle).toContain('Kit Builder');
      
      // Check og:image for social sharing
      const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
      expect(ogImage).toBeTruthy();
      expect(ogImage).toContain('metalforge.io');
    });
  });

  test.describe('Preset Kits - "Build Like The Pros"', () => {
    test('displays preset kits section', async ({ page }) => {
      await page.goto('/kit-builder');
      
      // Check section title
      await expect(page.getByText(/Build Like The Pros/i)).toBeVisible();
      
      // Check subtitle
      await expect(page.getByText(/Start with a legendary drummer/i)).toBeVisible();
    });
    
    test('shows famous drummer presets', async ({ page }) => {
      await page.goto('/kit-builder');
      
      // Check for specific drummers in presets
      const drummers = ['Lars Ulrich', 'Joey Jordison', 'Danny Carey', 'Tomas Haake'];
      
      for (const drummer of drummers) {
        await expect(page.getByText(drummer).first()).toBeVisible();
      }
    });
    
    test('preset kits display band name and price', async ({ page }) => {
      await page.goto('/kit-builder');
      
      // Check for band names
      await expect(page.getByText('Metallica').first()).toBeVisible();
      await expect(page.getByText('Slipknot').first()).toBeVisible();
      
      // Check for price display (€ symbol)
      const priceElements = page.locator('text=/€[0-9,]+/');
      await expect(priceElements.first()).toBeVisible();
    });
    
    test('clicking preset kit loads drummer gear', async ({ page }) => {
      await page.goto('/kit-builder');
      
      // Click on Lars Ulrich preset
      await page.getByText('Lars Ulrich').first().click();
      
      // Wait for kit to load
      await page.waitForTimeout(500);
      
      // Check kit name was updated
      const kitNameInput = page.getByPlaceholder(/Metal Beast/i);
      await expect(kitNameInput).toHaveValue(/Lars Ulrich/i);
      
      // Check selected items count
      await expect(page.getByText(/5\/5/)).toBeVisible();
      
      // Check URL was updated with gear params
      await expect(page).toHaveURL(/drums=/);
    });
    
    test('preset shows active state when selected', async ({ page }) => {
      await page.goto('/kit-builder');
      
      // Click on Danny Carey preset
      const dannyPreset = page.getByText('Danny Carey').first();
      await dannyPreset.click();
      
      // Check for active badge (checkmark)
      await expect(page.locator('[class*="presetKitActiveBadge"]').first()).toBeVisible();
    });
  });

  test.describe('Gear Selection', () => {
    test('can select gear from each category', async ({ page }) => {
      await page.goto('/kit-builder');
      
      // Select drums
      await page.getByRole('button', { name: /Shell Pack/i }).click();
      await page.getByText('Tama Starclassic Maple').first().click();
      
      // Check selection badge appears
      await expect(page.locator('[class*="gearCardSelected"]').first()).toBeVisible();
      
      // Select snare
      await page.getByRole('button', { name: /Snare/i }).click();
      await page.getByText(/Lars Ulrich Signature/i).first().click();
      
      // Check category tab shows checkmark
      await expect(page.locator('[class*="categoryTabCheck"]').first()).toBeVisible();
    });
    
    test('shows gear details with brand and price', async ({ page }) => {
      await page.goto('/kit-builder');
      
      // Check gear cards show brand
      await expect(page.getByText('TAMA').first()).toBeVisible();
      
      // Check gear cards show price
      await expect(page.locator('text=/€[0-9,]+/').first()).toBeVisible();
      
      // Check "Used by" section
      await expect(page.getByText(/Used by:/i).first()).toBeVisible();
    });
    
    test('gear cards have Details and Buy buttons', async ({ page }) => {
      await page.goto('/kit-builder');
      
      // Check Details button exists
      await expect(page.getByRole('button', { name: /Details/i }).first()).toBeVisible();
      
      // Check Buy button exists
      await expect(page.getByRole('button', { name: /Buy/i }).first()).toBeVisible();
    });
    
    test('can toggle gear selection (select/deselect)', async ({ page }) => {
      await page.goto('/kit-builder');
      
      // Select a drum kit
      const drumKit = page.getByText('Tama Starclassic Maple').first();
      await drumKit.click();
      
      // Check URL has drums param
      await expect(page).toHaveURL(/drums=/);
      
      // Click again to deselect
      await drumKit.click();
      
      // Check URL no longer has that specific drum
      await page.waitForTimeout(300);
      const url = page.url();
      expect(url).not.toContain('tama-starclassic-maple');
    });
    
    test('category tabs show checkmark when gear selected', async ({ page }) => {
      await page.goto('/kit-builder');
      
      // Select drums
      await page.getByText('Tama Starclassic Maple').first().click();
      
      // Check Shell Pack tab has checkmark
      const shellPackTab = page.getByRole('button', { name: /Shell Pack/i });
      await expect(shellPackTab.locator('[class*="categoryTabCheck"]')).toBeVisible();
    });
  });

  test.describe('Kit Summary', () => {
    test('displays kit summary with all categories', async ({ page }) => {
      await page.goto('/kit-builder');
      
      // Check Your Kit title
      await expect(page.getByText(/Your Kit/i).first()).toBeVisible();
      
      // Check all categories are listed
      await expect(page.getByText(/Shell Pack/i)).toBeVisible();
      await expect(page.getByText(/Snare Drum/i)).toBeVisible();
      await expect(page.getByText(/Cymbals/i)).toBeVisible();
      await expect(page.getByText(/Hardware/i)).toBeVisible();
      await expect(page.getByText(/Sticks/i)).toBeVisible();
    });
    
    test('shows "Not selected" for empty categories', async ({ page }) => {
      await page.goto('/kit-builder');
      
      // Check for "Not selected" text
      const notSelectedElements = page.getByText(/Not selected/);
      await expect(notSelectedElements.first()).toBeVisible();
    });
    
    test('calculates and displays total price', async ({ page }) => {
      await page.goto('/kit-builder');
      
      // Select a preset to get items
      await page.getByText('Lars Ulrich').first().click();
      
      // Check total price is displayed
      await expect(page.getByText(/Estimated Total/i)).toBeVisible();
      await expect(page.locator('text=/€[0-9,]+/').first()).toBeVisible();
    });
    
    test('displays similar drummers when gear is selected', async ({ page }) => {
      await page.goto('/kit-builder');
      
      // Select a preset
      await page.getByText('Joey Jordison').first().click();
      
      // Check for similar drummers section
      await expect(page.getByText(/Drummers with Similar Gear/i)).toBeVisible();
    });
    
    test('clicking similar drummer navigates to their profile', async ({ page }) => {
      await page.goto('/kit-builder');
      
      // Select a preset
      await page.getByText('Lars Ulrich').first().click();
      
      // Wait for similar drummers to appear
      await page.waitForTimeout(500);
      
      // Click on a similar drummer link if visible
      const similarDrummer = page.locator('[class*="kitSimilarDrummer"]').first();
      if (await similarDrummer.isVisible()) {
        await similarDrummer.click();
        
        // Should navigate to drummer page
        await expect(page).toHaveURL(/drummers\//);
      }
    });
  });

  test.describe('Sharing Functionality', () => {
    test('share button is disabled when no gear selected', async ({ page }) => {
      await page.goto('/kit-builder');
      
      // Find share button
      const shareButton = page.getByRole('button', { name: /Share Kit/i });
      await expect(shareButton).toBeVisible();
      
      // Button should be disabled (has disabled style)
      await expect(shareButton).toHaveCSS('background-color', /rgb\(156, 163, 175\)|#9ca3af/i);
    });
    
    test('share button is enabled when gear is selected', async ({ page }) => {
      await page.goto('/kit-builder');
      
      // Select a preset
      await page.getByText('Lars Ulrich').first().click();
      
      // Share button should be enabled
      const shareButton = page.getByRole('button', { name: /Share Kit/i });
      await expect(shareButton).toBeVisible();
      await expect(shareButton).toHaveCSS('background-color', /rgb\(220, 38, 38\)|#dc2626/i);
    });
    
    test('clicking share opens share modal', async ({ page }) => {
      await page.goto('/kit-builder');
      
      // Select a preset
      await page.getByText('Joey Jordison').first().click();
      
      // Click share button
      await page.getByRole('button', { name: /Share Kit/i }).click();
      
      // Check modal appears
      await expect(page.getByText(/Share Your Kit/i)).toBeVisible();
      await expect(page.getByText(/Share Link/i)).toBeVisible();
    });
    
    test('share modal has copy link button', async ({ page }) => {
      await page.goto('/kit-builder');
      
      // Select a preset and open modal
      await page.getByText('Danny Carey').first().click();
      await page.getByRole('button', { name: /Share Kit/i }).click();
      
      // Check copy button exists
      await expect(page.getByRole('button', { name: /Copy Link/i })).toBeVisible();
    });
    
    test('share modal has Twitter share button', async ({ page }) => {
      await page.goto('/kit-builder');
      
      // Select a preset and open modal
      await page.getByText('Tomas Haake').first().click();
      await page.getByRole('button', { name: /Share Kit/i }).click();
      
      // Check Twitter button exists
      await expect(page.getByRole('button', { name: /Tweet/i })).toBeVisible();
    });
    
    test('can close share modal', async ({ page }) => {
      await page.goto('/kit-builder');
      
      // Open modal
      await page.getByText('George Kollias').first().click();
      await page.getByRole('button', { name: /Share Kit/i }).click();
      
      // Close modal
      await page.getByRole('button', { name: /Close/i }).click();
      
      // Modal should be hidden
      await expect(page.getByText(/Share Your Kit/i)).not.toBeVisible();
    });
  });

  test.describe('URL Sharing', () => {
    test('selected gear is reflected in URL params', async ({ page }) => {
      await page.goto('/kit-builder');
      
      // Select drums
      await page.getByText('Tama Starclassic Maple').first().click();
      
      // Check URL has drums param
      await expect(page).toHaveURL(/drums=tama-starclassic-maple/);
    });
    
    test('kit name is reflected in URL params', async ({ page }) => {
      await page.goto('/kit-builder');
      
      // Enter kit name
      const kitNameInput = page.getByPlaceholder(/Metal Beast/i);
      await kitNameInput.fill('My Thrash Kit');
      
      // Check URL has name param
      await expect(page).toHaveURL(/name=My%20Thrash%20Kit|name=My\+Thrash\+Kit/);
    });
    
    test('loading shared URL restores kit state', async ({ page }) => {
      // Load a URL with pre-configured kit
      await page.goto('/kit-builder?drums=pearl-reference-series&snare=pearl-joey&name=Test%20Kit');
      
      // Check kit name is restored
      const kitNameInput = page.getByPlaceholder(/Metal Beast/i);
      await expect(kitNameInput).toHaveValue('Test Kit');
      
      // Check gear is selected (count should show)
      await expect(page.getByText(/2\/5/)).toBeVisible();
    });
    
    test('updates meta tags based on selected kit', async ({ page }) => {
      await page.goto('/kit-builder');
      
      // Select a preset
      await page.getByText('Lars Ulrich').first().click();
      
      // Wait for meta update
      await page.waitForTimeout(500);
      
      // Check og:title includes kit info
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      expect(ogTitle).toContain('Lars');
    });
  });

  test.describe('Affiliate Links (Thomann Integration)', () => {
    test('Buy button opens Thomann search in new tab', async ({ page, context }) => {
      await page.goto('/kit-builder');
      
      // Listen for new page (tab)
      const pagePromise = context.waitForEvent('page');
      
      // Click Buy button on a gear item
      const buyButton = page.getByRole('button', { name: /Buy/i }).first();
      await buyButton.click();
      
      // Check new tab opened with Thomann URL
      const newPage = await pagePromise;
      await newPage.waitForLoadState();
      expect(newPage.url()).toContain('thomann.de');
    });
    
    test('kit summary has buy links for selected items', async ({ page }) => {
      await page.goto('/kit-builder');
      
      // Select a preset
      await page.getByText('Joey Jordison').first().click();
      
      // Check buy icons appear in summary (cart emoji)
      const buyLinks = page.locator('[class*="kitSummaryBuyLink"]');
      await expect(buyLinks.first()).toBeVisible();
    });
  });

  test.describe('Clear Kit Functionality', () => {
    test('clear button resets all selections', async ({ page }) => {
      await page.goto('/kit-builder');
      
      // Select a preset to fill the kit
      await page.getByText('Lars Ulrich').first().click();
      
      // Verify kit is filled
      await expect(page.getByText(/5\/5/)).toBeVisible();
      
      // Click clear button
      await page.getByRole('button', { name: /Clear/i }).click();
      
      // Verify kit is cleared
      await expect(page.getByText(/0\/5/)).toBeVisible();
      
      // Kit name should be cleared
      const kitNameInput = page.getByPlaceholder(/Metal Beast/i);
      await expect(kitNameInput).toHaveValue('');
    });
    
    test('clear button updates URL', async ({ page }) => {
      await page.goto('/kit-builder');
      
      // Select some gear
      await page.getByText('Tama Starclassic Maple').first().click();
      
      // Clear
      await page.getByRole('button', { name: /Clear/i }).click();
      
      // URL should be clean
      await expect(page).toHaveURL('/kit-builder');
    });
  });

  test.describe('Responsive Design', () => {
    test('mobile view shows stacked layout', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/kit-builder');
      
      // Page should still load and be functional
      await expect(page.getByText(/Drum Kit Builder/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /Shell Pack/i })).toBeVisible();
    });
    
    test('tablet view works correctly', async ({ page }) => {
      // Set tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/kit-builder');
      
      // All elements should be visible
      await expect(page.getByText(/Build Like The Pros/i)).toBeVisible();
      await expect(page.getByText(/Your Kit/i).first()).toBeVisible();
    });
    
    test('desktop view shows two-column layout', async ({ page }) => {
      // Set desktop viewport
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto('/kit-builder');
      
      // Both panels should be visible
      await expect(page.locator('[class*="kitBuilderLeftPanel"]')).toBeVisible();
      await expect(page.locator('[class*="kitBuilderRightPanel"]')).toBeVisible();
    });
    
    test('preset kits scroll horizontally on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/kit-builder');
      
      // Preset section should be scrollable
      const presetScroll = page.locator('[class*="presetKitsScroll"]');
      await expect(presetScroll).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    test('preset kit cards have proper accessibility labels', async ({ page }) => {
      await page.goto('/kit-builder');
      
      // Check for accessibility labels on preset cards
      const presetButton = page.getByRole('button', { name: /Load.*kit preset/i }).first();
      await expect(presetButton).toBeVisible();
    });
    
    test('gear cards have proper accessibility labels for links', async ({ page }) => {
      await page.goto('/kit-builder');
      
      // Check Details link accessibility
      const detailsLink = page.getByRole('link', { name: /View.*gear category/i }).first();
      await expect(detailsLink).toBeVisible();
      
      // Check Buy link accessibility
      const buyLink = page.getByRole('link', { name: /Buy.*at Thomann/i }).first();
      await expect(buyLink).toBeVisible();
    });
  });
});
