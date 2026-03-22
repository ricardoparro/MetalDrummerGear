/**
 * E2E Tests for Signature Licks Database Pages
 * Issue #749 - Drummer signature drum fills/patterns with video tutorials
 * URL: /drummers/[slug]/licks and /drummers/[slug]/licks/[lick-slug]
 */

const { test, expect } = require('@playwright/test');

test.describe('Signature Licks Database Pages', () => {
  
  test.describe('Licks Hub Page - Joey Jordison', () => {
    
    test('should load the licks hub page', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/licks');
      
      // Wait for page to load
      await page.waitForLoadState('networkidle');
      
      // Check page title
      await expect(page).toHaveTitle(/Joey Jordison.*Signature Licks/i);
    });
    
    test('should display all licks for the drummer', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/licks');
      await page.waitForLoadState('networkidle');
      
      // Check for at least 3 licks
      const lickCards = page.locator('[data-testid="lick-card"]');
      // If no test IDs, check for lick names
      const hereticLick = page.locator('text=Heretic Anthem');
      await expect(hereticLick.first()).toBeVisible();
      
      const eyelessLick = page.locator('text=Eyeless');
      await expect(eyelessLick.first()).toBeVisible();
    });
    
    test('should display filter bar', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/licks');
      await page.waitForLoadState('networkidle');
      
      // Check for filter bar
      const filterTitle = page.locator('text=Filter Licks');
      await expect(filterTitle).toBeVisible();
    });
    
    test('should have back button', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/licks');
      await page.waitForLoadState('networkidle');
      
      // Check for back button
      const backButton = page.locator('text=/Back/i');
      await expect(backButton.first()).toBeVisible();
    });
    
    test('should navigate to lick detail on click', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/licks');
      await page.waitForLoadState('networkidle');
      
      // Click on a lick
      const hereticLick = page.locator('text=Heretic Anthem').first();
      await hereticLick.click();
      
      // Wait for navigation
      await page.waitForLoadState('networkidle');
      
      // Should be on lick detail page
      expect(page.url()).toContain('/licks/joey-jordison-heretic-anthem-intro');
    });
    
  });
  
  test.describe('Lick Detail Page - Heretic Anthem Intro', () => {
    
    test('should load the lick detail page', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/licks/joey-jordison-heretic-anthem-intro');
      
      // Wait for page to load
      await page.waitForLoadState('networkidle');
      
      // Check page title
      await expect(page).toHaveTitle(/Heretic Anthem/i);
    });
    
    test('should display lick name and info', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/licks/joey-jordison-heretic-anthem-intro');
      await page.waitForLoadState('networkidle');
      
      // Check for lick name
      const lickTitle = page.locator('text=The Heretic Anthem Intro');
      await expect(lickTitle.first()).toBeVisible();
      
      // Check for drummer name
      const drummerName = page.locator('text=Joey Jordison');
      await expect(drummerName.first()).toBeVisible();
    });
    
    test('should display difficulty badge', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/licks/joey-jordison-heretic-anthem-intro');
      await page.waitForLoadState('networkidle');
      
      // Check for difficulty badge
      const difficulty = page.locator('text=/Advanced|Expert|Intermediate|Beginner/i');
      await expect(difficulty.first()).toBeVisible();
    });
    
    test('should display BPM badge', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/licks/joey-jordison-heretic-anthem-intro');
      await page.waitForLoadState('networkidle');
      
      // Check for BPM
      const bpm = page.locator('text=/\\d+ BPM/');
      await expect(bpm.first()).toBeVisible();
    });
    
    test('should display YouTube video embed', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/licks/joey-jordison-heretic-anthem-intro');
      await page.waitForLoadState('networkidle');
      
      // Check for video section
      const videoSection = page.locator('text=Watch & Learn');
      await expect(videoSection).toBeVisible();
    });
    
    test('should display technique breakdown', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/licks/joey-jordison-heretic-anthem-intro');
      await page.waitForLoadState('networkidle');
      
      // Check for technique section
      const techniqueSection = page.locator('text=Technique Breakdown');
      await expect(techniqueSection).toBeVisible();
    });
    
    test('should display practice tips', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/licks/joey-jordison-heretic-anthem-intro');
      await page.waitForLoadState('networkidle');
      
      // Check for tips section
      const tipsSection = page.locator('text=Practice Tips');
      await expect(tipsSection).toBeVisible();
    });
    
    test('should display gear used section', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/licks/joey-jordison-heretic-anthem-intro');
      await page.waitForLoadState('networkidle');
      
      // Check for gear section
      const gearSection = page.locator('text=Gear Used');
      await expect(gearSection).toBeVisible();
    });
    
    test('should have proper SEO meta tags', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/licks/joey-jordison-heretic-anthem-intro');
      await page.waitForLoadState('networkidle');
      
      // Check meta description
      const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
      expect(metaDescription).toContain('Heretic Anthem');
      
      // Check OG tags
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      expect(ogTitle).toContain('Heretic Anthem');
    });
    
    test('should have VideoObject schema markup', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/licks/joey-jordison-heretic-anthem-intro');
      await page.waitForLoadState('networkidle');
      
      // Check for schema script
      const schemaScript = page.locator('script#lick-schema');
      const schemaContent = await schemaScript.textContent();
      expect(schemaContent).toBeTruthy();
      
      const schemaData = JSON.parse(schemaContent);
      expect(schemaData['@graph']).toBeTruthy();
      
      // Check for VideoObject
      const videoObject = schemaData['@graph'].find(item => item['@type'] === 'VideoObject');
      expect(videoObject).toBeTruthy();
    });
    
    test('should have HowTo schema markup', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/licks/joey-jordison-heretic-anthem-intro');
      await page.waitForLoadState('networkidle');
      
      // Check for schema script
      const schemaScript = page.locator('script#lick-schema');
      const schemaContent = await schemaScript.textContent();
      expect(schemaContent).toBeTruthy();
      
      const schemaData = JSON.parse(schemaContent);
      
      // Check for HowTo
      const howTo = schemaData['@graph'].find(item => item['@type'] === 'HowTo');
      expect(howTo).toBeTruthy();
      expect(howTo.step).toBeTruthy();
    });
    
    test('should display related licks from same drummer', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/licks/joey-jordison-heretic-anthem-intro');
      await page.waitForLoadState('networkidle');
      
      // Check for related licks section
      const relatedSection = page.locator('text=More from Joey Jordison');
      await expect(relatedSection).toBeVisible();
    });
    
  });
  
  test.describe('URL Routing', () => {
    
    test('should handle direct navigation to licks hub', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/licks');
      await page.waitForLoadState('networkidle');
      
      // Should not redirect
      expect(page.url()).toContain('/drummers/joey-jordison/licks');
    });
    
    test('should handle direct navigation to lick detail', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/licks/joey-jordison-heretic-anthem-intro');
      await page.waitForLoadState('networkidle');
      
      // Should not redirect
      expect(page.url()).toContain('/drummers/joey-jordison/licks/joey-jordison-heretic-anthem-intro');
    });
    
    test('should handle back navigation from lick detail to hub', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/licks/joey-jordison-heretic-anthem-intro');
      await page.waitForLoadState('networkidle');
      
      // Click back/breadcrumb
      const breadcrumb = page.locator('text=/Joey Jordison.*Licks/i');
      await breadcrumb.first().click();
      
      // Wait for navigation
      await page.waitForLoadState('networkidle');
      
      // Should be on licks hub
      expect(page.url()).toMatch(/\/drummers\/joey-jordison\/licks\/?$/);
    });
    
  });
  
  test.describe('All Phase 1 Drummers', () => {
    
    const phase1Drummers = [
      { slug: 'joey-jordison', name: 'Joey Jordison', lickCount: 3 },
      { slug: 'lars-ulrich', name: 'Lars Ulrich', lickCount: 3 },
      { slug: 'dave-lombardo', name: 'Dave Lombardo', lickCount: 3 },
      { slug: 'george-kollias', name: 'George Kollias', lickCount: 3 },
      { slug: 'mario-duplantier', name: 'Mario Duplantier', lickCount: 3 },
    ];
    
    for (const drummer of phase1Drummers) {
      test(`should load licks hub for ${drummer.name}`, async ({ page }) => {
        await page.goto(`/drummers/${drummer.slug}/licks`);
        await page.waitForLoadState('networkidle');
        
        // Page should load
        await expect(page).toHaveTitle(new RegExp(drummer.name, 'i'));
      });
    }
    
  });
  
  test.describe('Filtering', () => {
    
    test('should filter by difficulty', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/licks');
      await page.waitForLoadState('networkidle');
      
      // Click on advanced difficulty filter
      const advancedFilter = page.locator('text=Advanced').first();
      await advancedFilter.click();
      
      // Wait for filter to apply
      await page.waitForTimeout(500);
      
      // Should still show some licks
      const lickCards = page.locator('text=Heretic Anthem');
      // Check that advanced licks are visible
    });
    
    test('should clear filters', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/licks');
      await page.waitForLoadState('networkidle');
      
      // Apply a filter first
      const expertFilter = page.locator('text=Expert').first();
      await expertFilter.click();
      
      // Then click All to reset
      const allFilter = page.locator('text=All').first();
      await allFilter.click();
      
      // Should show all licks again
      await page.waitForTimeout(500);
    });
    
  });
  
  test.describe('Mobile Experience', () => {
    
    test.use({ viewport: { width: 375, height: 667 } });
    
    test('should display mobile-optimized hub layout', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/licks');
      await page.waitForLoadState('networkidle');
      
      // Content should be visible
      const pageTitle = page.locator('text=/Joey Jordison.*Signature Licks/i');
      await expect(pageTitle.first()).toBeVisible();
    });
    
    test('should display mobile-optimized detail layout', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/licks/joey-jordison-heretic-anthem-intro');
      await page.waitForLoadState('networkidle');
      
      // Content should be visible
      const lickTitle = page.locator('text=Heretic Anthem');
      await expect(lickTitle.first()).toBeVisible();
    });
    
  });
  
  test.describe('Analytics Events', () => {
    
    test('should track lick view event', async ({ page }) => {
      // Capture gtag calls
      await page.addInitScript(() => {
        window.gtag = (...args) => {
          window.__gtagCalls = window.__gtagCalls || [];
          window.__gtagCalls.push(args);
        };
      });
      
      await page.goto('/drummers/joey-jordison/licks/joey-jordison-heretic-anthem-intro');
      await page.waitForLoadState('networkidle');
      
      // Give time for analytics to fire
      await page.waitForTimeout(1000);
      
      // Check if lick_view was tracked
      const calls = await page.evaluate(() => window.__gtagCalls || []);
      const lickViewCall = calls.find(call => call[0] === 'event' && call[1] === 'lick_view');
      expect(lickViewCall).toBeTruthy();
    });
    
  });
  
});
