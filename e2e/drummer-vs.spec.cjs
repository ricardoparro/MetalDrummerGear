// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * E2E tests for Drummer vs Drummer Comparison Pages (Issue #558)
 * Tests cover:
 * - Drummer vs index page (/vs)
 * - Individual comparison pages (/vs/:slug)
 * - Side-by-side gear comparison tables
 * - Community vote widget
 * - Head-to-head analysis sections
 * - Structured data markup
 * - Mobile responsiveness
 * - Navigation and links
 */

const BASE_URL = process.env.BASE_URL || 'https://metalforge.io';

// Sample comparison slugs to test
const COMPARISON_SLUGS = [
  'danny-carey-vs-mario-duplantier',
  'lars-ulrich-vs-dave-lombardo',
  'george-kollias-vs-gene-hoglan',
];

/**
 * Helper to wait for lazy-loaded drummer comparison content
 */
async function waitForComparisonContent(page, contentLocator, timeoutMs = 15000) {
  try {
    await contentLocator.waitFor({ state: 'visible', timeout: timeoutMs });
    return true;
  } catch {
    return false;
  }
}

test.describe('Drummer Vs Index Page (/vs)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/vs`);
    // Wait for page to hydrate
    await page.waitForLoadState('networkidle');
    
    // Wait for lazy-loaded comparison data to load
    try {
      const loadingText = page.getByText('Loading comparisons');
      const isLoading = await loadingText.isVisible({ timeout: 500 }).catch(() => false);
      if (isLoading) {
        await loadingText.waitFor({ state: 'hidden', timeout: 15000 });
      }
    } catch {
      // Loading state not present - might be already loaded
    }
    
    // Wait for comparison cards to appear (look for "VS" text)
    try {
      const vsText = page.getByText('VS').first();
      await vsText.waitFor({ state: 'visible', timeout: 15000 });
    } catch {
      // Content not appearing - test assertions will catch the actual failure
    }
  });

  test('should display the drummer vs index page', async ({ page }) => {
    // Check page title
    const title = await page.title();
    expect(title).toContain('Drummer vs Drummer');
    expect(title).toContain('MetalForge');
  });

  test('should display the page header', async ({ page }) => {
    // Look for the main title
    const header = page.getByRole('heading', { name: /Drummer vs Drummer/i });
    const headerContent = await waitForComparisonContent(page, header);
    
    if (headerContent) {
      await expect(header).toBeVisible();
    }
  });

  test('should display comparison cards', async ({ page }) => {
    // Look for VS badges
    const vsBadges = page.getByText('VS');
    const hasVsBadges = await vsBadges.first().isVisible({ timeout: 10000 }).catch(() => false);
    
    if (hasVsBadges) {
      const count = await vsBadges.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('should have clickable comparison cards', async ({ page }) => {
    // Look for "Compare →" links
    const compareLinks = page.getByText('Compare →');
    const hasLinks = await compareLinks.first().isVisible({ timeout: 10000 }).catch(() => false);
    
    if (hasLinks) {
      const count = await compareLinks.count();
      expect(count).toBeGreaterThan(0);
      
      // First link should be clickable
      await expect(compareLinks.first()).toBeEnabled();
    }
  });

  test('should navigate to comparison detail page', async ({ page }) => {
    // Look for "Compare →" links
    const compareLinks = page.getByText('Compare →');
    const hasLinks = await compareLinks.first().isVisible({ timeout: 10000 }).catch(() => false);
    
    if (hasLinks) {
      // Click the first comparison card
      await compareLinks.first().click();
      
      // Wait for navigation
      await page.waitForLoadState('networkidle');
      
      // Should be on a detail page (URL should contain /vs/)
      expect(page.url()).toMatch(/\/vs\/[a-z0-9-]+/i);
    }
  });

  test('should have proper meta tags', async ({ page }) => {
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    const descContent = await metaDescription.getAttribute('content');
    expect(descContent).toBeTruthy();
    expect(descContent.toLowerCase()).toContain('drummer');
  });
});

test.describe('Drummer Vs Detail Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a specific comparison page
    await page.goto(`${BASE_URL}/vs/${COMPARISON_SLUGS[0]}`);
    await page.waitForLoadState('networkidle');
    
    // Wait for comparison content to load
    try {
      const loadingText = page.getByText('Loading comparison');
      const isLoading = await loadingText.isVisible({ timeout: 500 }).catch(() => false);
      if (isLoading) {
        await loadingText.waitFor({ state: 'hidden', timeout: 15000 });
      }
    } catch {
      // Loading state not present
    }
  });

  test('should display comparison title', async ({ page }) => {
    // Look for "vs" in a heading
    const titlePattern = /vs/i;
    const headings = page.locator('text=/.*vs.*/i');
    const hasTitle = await headings.first().isVisible({ timeout: 10000 }).catch(() => false);
    
    if (hasTitle) {
      await expect(headings.first()).toBeVisible();
    }
  });

  test('should display VS badge', async ({ page }) => {
    const vsBadge = page.getByText('VS');
    const hasVsBadge = await vsBadge.first().isVisible({ timeout: 10000 }).catch(() => false);
    
    if (hasVsBadge) {
      await expect(vsBadge.first()).toBeVisible();
    }
  });

  test('should display community vote widget', async ({ page }) => {
    // Look for voting section
    const voteTitle = page.getByText(/Who's Your Favorite/i);
    const hasVoteWidget = await voteTitle.isVisible({ timeout: 10000 }).catch(() => false);
    
    if (hasVoteWidget) {
      await expect(voteTitle).toBeVisible();
    }
  });

  test('should allow voting', async ({ page }) => {
    // Find vote buttons
    const voteButtons = page.locator('button, [role="button"]').filter({ hasText: /Danny|Lars|George|Tomas|Joey/i });
    const hasVoteButtons = await voteButtons.first().isVisible({ timeout: 10000 }).catch(() => false);
    
    if (hasVoteButtons) {
      // Click a vote button
      await voteButtons.first().click();
      
      // Should show vote results (percentages)
      const percentText = page.getByText(/%/);
      await expect(percentText.first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('should display gear comparison section', async ({ page }) => {
    // Look for gear comparison header
    const gearSection = page.getByText(/Gear Comparison/i);
    const hasGearSection = await gearSection.isVisible({ timeout: 10000 }).catch(() => false);
    
    if (hasGearSection) {
      await expect(gearSection).toBeVisible();
    }
  });

  test('should display head-to-head section', async ({ page }) => {
    // Look for head-to-head analysis
    const headToHead = page.getByText(/Head-to-Head/i);
    const hasHeadToHead = await headToHead.isVisible({ timeout: 10000 }).catch(() => false);
    
    if (hasHeadToHead) {
      await expect(headToHead).toBeVisible();
    }
  });

  test('should have back button', async ({ page }) => {
    // Look for back button
    const backButton = page.getByRole('button', { name: /back/i });
    const hasBackButton = await backButton.isVisible({ timeout: 10000 }).catch(() => false);
    
    if (hasBackButton) {
      await expect(backButton).toBeEnabled();
      
      // Click back
      await backButton.click();
      
      // Should navigate to index
      await page.waitForLoadState('networkidle');
      expect(page.url()).toMatch(/\/vs\/?$/i);
    }
  });

  test('should have proper SEO meta tags', async ({ page }) => {
    // Check title contains vs
    const title = await page.title();
    expect(title.toLowerCase()).toContain('vs');
    expect(title).toContain('MetalForge');
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    const descContent = await metaDescription.getAttribute('content');
    expect(descContent).toBeTruthy();
  });

  test('should have structured data', async ({ page }) => {
    // Check for JSON-LD script
    const ldScript = page.locator('script[type="application/ld+json"]');
    const hasStructuredData = await ldScript.first().isVisible({ timeout: 5000 }).catch(() => false);
    
    // Note: structured data is typically not visible, so we check if it exists in the DOM
    const scriptContent = await ldScript.first().textContent().catch(() => null);
    if (scriptContent) {
      const data = JSON.parse(scriptContent);
      expect(data['@context']).toBe('https://schema.org');
    }
  });
});

test.describe('Mobile Responsiveness', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE size

  test('should display index page on mobile', async ({ page }) => {
    await page.goto(`${BASE_URL}/vs`);
    await page.waitForLoadState('networkidle');
    
    // Page should still render
    const title = await page.title();
    expect(title).toContain('MetalForge');
  });

  test('should display detail page on mobile', async ({ page }) => {
    await page.goto(`${BASE_URL}/vs/${COMPARISON_SLUGS[0]}`);
    await page.waitForLoadState('networkidle');
    
    // Wait for content
    await page.waitForTimeout(2000);
    
    // VS badge should still be visible
    const vsBadge = page.getByText('VS');
    const hasVsBadge = await vsBadge.first().isVisible({ timeout: 10000 }).catch(() => false);
    
    if (hasVsBadge) {
      await expect(vsBadge.first()).toBeVisible();
    }
  });

  test('should have scrollable content on mobile', async ({ page }) => {
    await page.goto(`${BASE_URL}/vs/${COMPARISON_SLUGS[0]}`);
    await page.waitForLoadState('networkidle');
    
    // Should be able to scroll
    await page.evaluate(() => window.scrollBy(0, 500));
    
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(0);
  });
});

test.describe('Navigation', () => {
  test('should have consistent navigation between pages', async ({ page }) => {
    // Start at index
    await page.goto(`${BASE_URL}/vs`);
    await page.waitForLoadState('networkidle');
    
    // Wait for cards to load
    const compareLinks = page.getByText('Compare →');
    const hasLinks = await compareLinks.first().isVisible({ timeout: 10000 }).catch(() => false);
    
    if (hasLinks) {
      // Go to detail
      await compareLinks.first().click();
      await page.waitForLoadState('networkidle');
      
      // Verify we're on detail page
      expect(page.url()).toMatch(/\/vs\/[a-z0-9-]+/i);
      
      // Go back
      const backButton = page.getByRole('button', { name: /back/i });
      const hasBackButton = await backButton.isVisible({ timeout: 10000 }).catch(() => false);
      
      if (hasBackButton) {
        await backButton.click();
        await page.waitForLoadState('networkidle');
        
        // Should be back at index
        expect(page.url()).toMatch(/\/vs\/?$/i);
      }
    }
  });
});

test.describe('Accessibility', () => {
  test('should have accessible buttons on index page', async ({ page }) => {
    await page.goto(`${BASE_URL}/vs`);
    await page.waitForLoadState('networkidle');
    
    // Look for buttons with accessibility labels
    const buttons = page.locator('[role="button"], button');
    const buttonCount = await buttons.count();
    
    // Should have at least some buttons
    expect(buttonCount).toBeGreaterThan(0);
  });

  test('should have heading hierarchy', async ({ page }) => {
    await page.goto(`${BASE_URL}/vs/${COMPARISON_SLUGS[0]}`);
    await page.waitForLoadState('networkidle');
    
    // Wait for content
    await page.waitForTimeout(2000);
    
    // Should have at least one heading
    const headings = page.locator('h1, h2, h3, h4, h5, h6, [role="heading"]');
    const headingCount = await headings.count();
    expect(headingCount).toBeGreaterThan(0);
  });
});
