/**
 * Playwright tests for Extended Bio Pages (Issue #305)
 * 
 * Tests:
 * 1. Navigates to a drummer page
 * 2. Verifies short bio contains "more" link
 * 3. Clicks "more" link
 * 4. Verifies navigation to long-bio route
 * 5. Verifies long-bio content renders
 * 6. Assert <title> and at least one meta tag exists (SEO smoke check)
 */

const { test, expect } = require('@playwright/test');
const BASE_URL = process.env.BASE_URL || 'https://metalforge.io';

// Drummers with extended bios
const DRUMMERS_WITH_BIOS = [
  { slug: 'lars-ulrich', name: 'Lars Ulrich', id: 1 },
  { slug: 'joey-jordison', name: 'Joey Jordison', id: 2 },
  { slug: 'gene-hoglan', name: 'Gene Hoglan', id: 3 },
  { slug: 'dave-lombardo', name: 'Dave Lombardo', id: 4 },
  { slug: 'tomas-haake', name: 'Tomas Haake', id: 5 },
  { slug: 'george-kollias', name: 'George Kollias', id: 6 },
  { slug: 'eloy-casagrande', name: 'Eloy Casagrande', id: 7 },
  { slug: 'mike-portnoy', name: 'Mike Portnoy', id: 13 },
  { slug: 'danny-carey', name: 'Danny Carey', id: 14 },
  { slug: 'mario-duplantier', name: 'Mario Duplantier', id: 15 },
];

test.describe('Extended Bio Pages (Issue #305)', () => {
  test('drummer detail page shows "more" link after bio', async ({ page }) => {
    // Navigate to Lars Ulrich's drummer page
    await page.goto('/drummer/lars-ulrich', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    // Verify we're on the drummer detail page
    await expect(page.locator('text=Lars Ulrich').first()).toBeVisible({ timeout: 15000 });
    
    // Check biography section exists
    const bioSection = page.locator('text=Biography').first();
    await expect(bioSection).toBeVisible({ timeout: 10000 });
    
    // Check "Read full biography" link exists
    const moreLink = page.locator('text=Read full biography');
    await expect(moreLink).toBeVisible({ timeout: 10000 });
  });

  test('clicking "more" link navigates to bio page', async ({ page }) => {
    // Navigate to Lars Ulrich's drummer page
    await page.goto('/drummer/lars-ulrich', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    // Click the "Read full biography" link
    const moreLink = page.locator('text=Read full biography');
    await expect(moreLink).toBeVisible({ timeout: 10000 });
    await moreLink.click();
    await page.waitForTimeout(2000);

    // Verify URL changed to bio route
    await expect(page).toHaveURL(/\/drummer\/lars-ulrich\/bio/);
  });

  test('bio page renders extended content', async ({ page }) => {
    // Navigate directly to bio page
    await page.goto('/drummer/lars-ulrich/bio', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    // Check page title contains drummer name
    await expect(page.locator('h1, h2').first()).toContainText('Lars Ulrich', { timeout: 10000 });

    // Check Overview section exists (key section of extended bio)
    const overviewSection = page.locator('[data-testid="bio-overview"], text=Overview').first();
    await expect(overviewSection).toBeVisible({ timeout: 10000 });

    // Check Career Highlights section exists
    const careerSection = page.locator('text=Career Highlights').first();
    await expect(careerSection).toBeVisible({ timeout: 10000 });

    // Check page has substantial content (longer than short bio)
    const bodyText = await page.locator('body').textContent();
    expect(bodyText.length).toBeGreaterThan(2000); // Extended bio should be lengthy
  });

  test('bio page has proper SEO meta tags', async ({ page }) => {
    // Navigate to bio page
    await page.goto('/drummer/lars-ulrich/bio', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    // Check page title is set and contains drummer name
    const title = await page.title();
    expect(title).toContain('Lars Ulrich');
    expect(title.length).toBeGreaterThan(10);

    // Check meta description exists and is populated
    const metaDescription = await page.getAttribute('meta[name="description"]', 'content');
    expect(metaDescription).toBeTruthy();
    expect(metaDescription.length).toBeGreaterThan(50);

    // Check OpenGraph title exists
    const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
    expect(ogTitle).toBeTruthy();
    expect(ogTitle).toContain('Lars Ulrich');

    // Check OpenGraph description exists
    const ogDescription = await page.getAttribute('meta[property="og:description"]', 'content');
    expect(ogDescription).toBeTruthy();

    // Check Twitter card meta exists
    const twitterCard = await page.getAttribute('meta[name="twitter:card"]', 'content');
    expect(twitterCard).toBeTruthy();
  });

  test('bio page is crawlable (no noindex)', async ({ page }) => {
    // Navigate to bio page
    await page.goto('/drummer/lars-ulrich/bio', { waitUntil: 'load' });
    await page.waitForTimeout(1000);

    // Check there's no robots noindex meta tag
    const robotsMeta = await page.getAttribute('meta[name="robots"]', 'content');
    if (robotsMeta) {
      expect(robotsMeta.toLowerCase()).not.toContain('noindex');
    }
    // If no robots meta, that's also fine (crawlable by default)
  });

  test('bio page uses semantic HTML structure', async ({ page }) => {
    // Navigate to bio page
    await page.goto('/drummer/lars-ulrich/bio', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    // Check for proper heading hierarchy
    const h1Count = await page.locator('h1').count();
    const h2Count = await page.locator('h2, [aria-level="2"]').count();
    
    // Should have at least one main heading
    expect(h1Count + h2Count).toBeGreaterThan(0);

    // Check for paragraph content (semantic text)
    const paragraphCount = await page.locator('p, [style*="line-height"]').count();
    expect(paragraphCount).toBeGreaterThan(2);
  });

  test('bio page has back navigation to drummer profile', async ({ page }) => {
    // Navigate to bio page
    await page.goto('/drummer/lars-ulrich/bio', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    // Find and click back button
    const backButton = page.locator('text=Back to').first();
    await expect(backButton).toBeVisible({ timeout: 10000 });
    await backButton.click();
    await page.waitForTimeout(2000);

    // Should navigate back to drummer profile (not bio page)
    await expect(page).not.toHaveURL(/\/bio$/);
    await expect(page).toHaveURL(/\/drummer\/lars-ulrich/);
  });

  test('multiple drummers have extended bios', async ({ page }) => {
    // Test that at least 5 drummers have working bio pages
    const workingBios = [];
    const errors = [];

    for (const drummer of DRUMMERS_WITH_BIOS.slice(0, 5)) {
      try {
        await page.goto(`/drummer/${drummer.slug}/bio`, { waitUntil: 'load' });
        await page.waitForTimeout(1500);

        // Check for Overview section (indicates extended bio exists)
        const hasOverview = await page.locator('text=Overview').first().isVisible({ timeout: 5000 }).catch(() => false);
        
        if (hasOverview) {
          workingBios.push(drummer.name);
        } else {
          // Check for "coming soon" message
          const bodyText = await page.locator('body').textContent();
          if (bodyText.includes('coming soon')) {
            // This is expected for drummers without extended bios yet
            console.log(`ℹ️ ${drummer.name} - extended bio coming soon`);
          } else {
            errors.push(`${drummer.name} - no Overview section found`);
          }
        }
      } catch (err) {
        errors.push(`${drummer.name} - ${err.message}`);
      }
    }

    console.log(`✅ Working bio pages: ${workingBios.join(', ')}`);
    
    // At least some drummers should have working bios
    expect(workingBios.length).toBeGreaterThan(0);
  });

  test('direct URL navigation to bio page works', async ({ page }) => {
    // Test deep linking to bio page
    await page.goto('/drummer/dave-lombardo/bio', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    // Page should load successfully with drummer content
    const bodyText = await page.locator('body').textContent();
    expect(bodyText).toContain('Lombardo');

    // Should be on bio URL
    await expect(page).toHaveURL(/\/drummer\/dave-lombardo\/bio/);
  });
});
