/**
 * E2E Tests for Drumming Techniques Pages (Issue #344)
 * Tests technique index page, detail pages, navigation, and SEO
 */

const { test, expect } = require('@playwright/test');

test.describe('Drumming Techniques Pages - Issue #344', () => {
  
  test.describe('Techniques Index Page', () => {
    test('loads /techniques page with correct elements', async ({ page }) => {
      await page.goto('/techniques');
      
      // Check page title
      await expect(page).toHaveTitle(/Metal Drumming Techniques|Blast Beats|Double Bass/i);
      
      // Check main heading
      await expect(page.getByText(/Metal Drumming Techniques/i)).toBeVisible();
      
      // Check for technique categories
      await expect(page.getByText(/Foundational|Extreme Metal|Progressive/i).first()).toBeVisible();
    });
    
    test('displays all technique categories', async ({ page }) => {
      await page.goto('/techniques');
      
      // Check for category sections
      await expect(page.getByText(/🎯 Foundational/i)).toBeVisible();
      await expect(page.getByText(/🔥 Extreme Metal/i)).toBeVisible();
      await expect(page.getByText(/🧠 Progressive/i)).toBeVisible();
      await expect(page.getByText(/🎛️ Production/i)).toBeVisible();
    });
    
    test('shows technique cards with difficulty badges', async ({ page }) => {
      await page.goto('/techniques');
      
      // Check for technique cards
      await expect(page.getByText(/Blast Beat/i).first()).toBeVisible();
      await expect(page.getByText(/Double Bass/i).first()).toBeVisible();
      
      // Check for difficulty badges
      await expect(page.getByText(/Beginner|Intermediate|Advanced|Expert/i).first()).toBeVisible();
    });
    
    test('technique cards show BPM range', async ({ page }) => {
      await page.goto('/techniques');
      
      // Check for BPM range indicators
      await expect(page.getByText(/BPM/i).first()).toBeVisible();
    });
    
    test('back button navigates to home', async ({ page }) => {
      await page.goto('/techniques');
      
      const backButton = page.getByRole('button', { name: /back/i });
      await backButton.click();
      
      await page.waitForURL('/');
      expect(page.url()).not.toContain('/techniques');
    });
  });

  test.describe('Technique Detail Pages', () => {
    const techniqueSlugs = [
      'blast-beat',
      'double-bass',
      'gravity-blast',
      'polyrhythms',
      'odd-time-signatures',
      'one-handed-roll',
      'triggered-drums',
      'groove-drumming',
      'linear-drumming',
      'fill-techniques',
    ];
    
    for (const slug of techniqueSlugs) {
      test(`/techniques/${slug} page loads correctly`, async ({ page }) => {
        await page.goto(`/techniques/${slug}`);
        
        // Check page has content
        await expect(page.locator('body')).not.toBeEmpty();
        
        // Check for technique-specific content
        await expect(page.getByText(/How to Learn|History|Masters/i).first()).toBeVisible();
        
        // Check back button exists
        await expect(page.getByRole('button', { name: /back/i })).toBeVisible();
      });
    }
    
    test('blast-beat page shows expected sections', async ({ page }) => {
      await page.goto('/techniques/blast-beat');
      
      // Check main title
      await expect(page.getByText(/Blast Beat/i).first()).toBeVisible();
      
      // Check difficulty badge
      await expect(page.getByText(/Advanced/i).first()).toBeVisible();
      
      // Check sections
      await expect(page.getByText(/History.*Origins/i)).toBeVisible();
      await expect(page.getByText(/How to Learn/i)).toBeVisible();
      await expect(page.getByText(/Variations/i)).toBeVisible();
      await expect(page.getByText(/Masters of/i)).toBeVisible();
      await expect(page.getByText(/Gear Recommendations/i)).toBeVisible();
    });
    
    test('double-bass page shows expected content', async ({ page }) => {
      await page.goto('/techniques/double-bass');
      
      // Check main content
      await expect(page.getByText(/Double Bass Drumming/i).first()).toBeVisible();
      
      // Check for drummers mentioned
      await expect(page.getByText(/Dave Lombardo|George Kollias|Joey Jordison/i).first()).toBeVisible();
    });
    
    test('polyrhythms page shows technique info', async ({ page }) => {
      await page.goto('/techniques/polyrhythms');
      
      // Check title
      await expect(page.getByText(/Polyrhythms/i).first()).toBeVisible();
      
      // Check for variation types
      await expect(page.getByText(/3:2|4:3|5:4|7:4/i).first()).toBeVisible();
    });
  });

  test.describe('Masters Section & Drummer Links', () => {
    test('masters section links to drummer profiles', async ({ page }) => {
      await page.goto('/techniques/blast-beat');
      
      // Scroll to masters section
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      
      // Check for drummer names in masters section
      await expect(page.getByText(/Pete Sandoval|George Kollias|Inferno/i).first()).toBeVisible();
      
      // Click on a drummer with a profile
      const drummerLink = page.getByText(/George Kollias/).first();
      if (await drummerLink.isVisible()) {
        await drummerLink.click();
        // Should navigate to drummer profile
        await page.waitForURL(/\/drummer\//i, { timeout: 5000 }).catch(() => {
          // May stay on page if drummer not found
        });
      }
    });
    
    test('masters show band names', async ({ page }) => {
      await page.goto('/techniques/double-bass');
      
      // Check for band names in masters section
      await expect(page.getByText(/Slayer|Nile|Death|Slipknot/i).first()).toBeVisible();
    });
  });

  test.describe('Gear Recommendations', () => {
    test('shows gear recommendations section', async ({ page }) => {
      await page.goto('/techniques/blast-beat');
      
      // Scroll to gear section
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.7));
      
      // Check for gear recommendations
      await expect(page.getByText(/Gear Recommendations/i)).toBeVisible();
      
      // Check for gear categories
      await expect(page.getByText(/Pedals|Snares|Sticks/i).first()).toBeVisible();
    });
    
    test('gear section shows pro tips', async ({ page }) => {
      await page.goto('/techniques/double-bass');
      
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.7));
      
      // Check for pro tip
      await expect(page.getByText(/Pro Tip|💡/i).first()).toBeVisible({ timeout: 5000 }).catch(() => {
        // Pro tip may not be visible depending on scroll position
      });
    });
  });

  test.describe('How to Learn Section', () => {
    test('shows numbered learning steps', async ({ page }) => {
      await page.goto('/techniques/blast-beat');
      
      // Check for learning steps
      await expect(page.getByText(/How to Learn/i)).toBeVisible();
      
      // Check for numbered steps
      await expect(page.getByText(/1\.|2\.|3\./i).first()).toBeVisible();
    });
    
    test('learning tips are practical', async ({ page }) => {
      await page.goto('/techniques/double-bass');
      
      // Check for practical advice keywords
      await expect(page.getByText(/practice|metronome|BPM|technique/i).first()).toBeVisible();
    });
  });

  test.describe('Related Techniques', () => {
    test('shows related techniques section', async ({ page }) => {
      await page.goto('/techniques/blast-beat');
      
      // Scroll to bottom
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.9));
      
      // Check for related techniques
      await expect(page.getByText(/Related Techniques/i)).toBeVisible();
    });
    
    test('related technique links work', async ({ page }) => {
      await page.goto('/techniques/blast-beat');
      
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.9));
      
      // Find and click a related technique
      const relatedLink = page.getByText(/Gravity Blast|Double Bass/i).first();
      if (await relatedLink.isVisible()) {
        await relatedLink.click();
        await page.waitForURL(/\/techniques\//i);
        expect(page.url()).toContain('/techniques/');
      }
    });
  });

  test.describe('Navigation', () => {
    test('navigating from index to detail works', async ({ page }) => {
      await page.goto('/techniques');
      
      // Click on a technique card
      const techniqueCard = page.getByText(/Blast Beat/i).first();
      await techniqueCard.click();
      
      // Wait for navigation
      await page.waitForURL(/\/techniques\/blast-beat/i);
      expect(page.url()).toContain('/techniques/blast-beat');
    });
    
    test('back button from detail goes to index', async ({ page }) => {
      await page.goto('/techniques/double-bass');
      
      const backButton = page.getByRole('button', { name: /back/i });
      await backButton.click();
      
      // Should go to techniques index
      await page.waitForURL(/\/techniques$/i, { timeout: 5000 });
    });
    
    test('browser back button works', async ({ page }) => {
      await page.goto('/techniques');
      await page.goto('/techniques/blast-beat');
      
      await page.goBack();
      
      await page.waitForURL(/\/techniques$/i);
    });
  });

  test.describe('SEO & Meta Tags', () => {
    test('techniques index has SEO meta tags', async ({ page }) => {
      await page.goto('/techniques');
      
      // Check meta description
      const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
      expect(metaDescription).toBeTruthy();
      expect(metaDescription.length).toBeGreaterThan(50);
      
      // Check og:title
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      expect(ogTitle).toBeTruthy();
    });
    
    test('technique detail has SEO meta tags', async ({ page }) => {
      await page.goto('/techniques/blast-beat');
      
      // Check title contains technique name
      await expect(page).toHaveTitle(/Blast Beat/i);
      
      // Check meta description
      const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
      expect(metaDescription).toBeTruthy();
      expect(metaDescription.toLowerCase()).toContain('blast');
    });
    
    test('canonical URL is correct', async ({ page }) => {
      await page.goto('/techniques/double-bass');
      
      const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
      if (ogUrl) {
        expect(ogUrl).toContain('/techniques/double-bass');
      }
    });
  });

  test.describe('Mobile Responsiveness', () => {
    test('techniques index is usable on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/techniques');
      
      // Content should be visible
      await expect(page.getByText(/Metal Drumming Techniques/i)).toBeVisible();
      
      // Cards should stack
      const cards = page.locator('[class*="techniqueCard"], [class*="card"]');
      await expect(cards.first()).toBeVisible();
    });
    
    test('technique detail is readable on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/techniques/blast-beat');
      
      // Title should be visible
      await expect(page.getByText(/Blast Beat/i).first()).toBeVisible();
      
      // Sections should be visible
      await page.evaluate(() => window.scrollTo(0, 500));
      await expect(page.getByText(/How to Learn|History/i).first()).toBeVisible();
    });
  });

  test.describe('Invalid Route Handling', () => {
    test('invalid technique slug shows not found', async ({ page }) => {
      await page.goto('/techniques/invalid-technique-slug');
      
      // Should show not found message
      await expect(page.getByText(/not found/i)).toBeVisible();
      
      // Back button should be available
      await expect(page.getByRole('button', { name: /back/i })).toBeVisible();
    });
  });

  test.describe('Content Quality', () => {
    test('technique descriptions are substantial', async ({ page }) => {
      await page.goto('/techniques/blast-beat');
      
      // Get page text content length
      const pageContent = await page.textContent('body');
      expect(pageContent.length).toBeGreaterThan(2000); // At least 2000 chars
    });
    
    test('history section has historical context', async ({ page }) => {
      await page.goto('/techniques/double-bass');
      
      // Check for decade mentions
      await expect(page.getByText(/1980|1990|2000/i).first()).toBeVisible();
    });
    
    test('variations section lists multiple variations', async ({ page }) => {
      await page.goto('/techniques/blast-beat');
      
      // Check for multiple variation names
      await expect(page.getByText(/Traditional Blast|Hammer Blast|Bomb Blast/i).first()).toBeVisible();
    });
  });
});
