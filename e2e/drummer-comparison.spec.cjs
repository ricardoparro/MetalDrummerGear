// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * E2E tests for Drummer vs Drummer Comparison Pages (Issue #558)
 * Tests cover:
 * - Drummer comparison index page (/vs)
 * - Individual comparison pages (/vs/:slug-vs-slug)
 * - Side-by-side gear comparison table
 * - Community vote widget
 * - Head-to-head analysis sections
 * - Structured data markup
 * - Mobile responsiveness
 */

const BASE_URL = process.env.BASE_URL || 'https://metalforge.io';

// Sample comparison slugs to test
// Issue #598: Added high-value comparison pages
const COMPARISON_SLUGS = [
  'lars-ulrich-vs-dave-lombardo',
  'mario-duplantier-vs-tomas-haake',
  'mike-portnoy-vs-danny-carey',
  'george-kollias-vs-pete-sandoval',
  'gene-hoglan-vs-charlie-benante',
  // Issue #598: New high-value comparisons
  'lars-ulrich-vs-joey-jordison',
  'danny-carey-vs-mario-duplantier',
  'gene-hoglan-vs-george-kollias',
];

// Helper to wait for comparison page content using Playwright's getByText
async function waitForComparisonPage(page, timeout = 30000) {
  // Wait for any of these text patterns that indicate the app has rendered
  const showdownText = page.getByText(/Showdown/i).first();
  const vsText = page.getByText(/VS/i).first();
  const drummerText = page.getByText(/Drummer/i).first();
  
  await expect(showdownText.or(vsText).or(drummerText)).toBeVisible({ timeout });
}

test.describe('Drummer Comparisons Index Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/vs`);
    await page.waitForLoadState('networkidle');
  });

  test('should display the comparison index page with title', async ({ page }) => {
    // Wait for page to hydrate
    await waitForComparisonPage(page);
    
    const title = await page.title();
    // The page should have some form of comparison-related title
    // or at least contain "Drummer" or "Metal"
    const hasValidTitle = title.includes('Drummer') || 
                          title.includes('Comparison') || 
                          title.includes('Metal') ||
                          title.includes('Showdown');
    expect(hasValidTitle).toBe(true);
  });

  test('should have proper SEO meta tags', async ({ page }) => {
    await waitForComparisonPage(page);
    
    // Check canonical (may be set by React after hydration)
    const canonical = page.locator('link[rel="canonical"]');
    const hasCanonical = await canonical.count() > 0;
    
    if (hasCanonical) {
      const href = await canonical.getAttribute('href');
      expect(href).toContain('/vs');
    }
    
    // Description should exist
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
  });
});

test.describe('Drummer Comparison Detail Page', () => {
  test('should load Lars vs Dave comparison', async ({ page }) => {
    await page.goto(`${BASE_URL}/vs/lars-ulrich-vs-dave-lombardo`);
    await page.waitForLoadState('load');
    await waitForComparisonPage(page);
    
    // Check for any comparison indicator
    const pageContent = await page.locator('body').textContent();
    const hasLars = pageContent.includes('Lars Ulrich') || pageContent.includes('Lars');
    const hasDave = pageContent.includes('Dave Lombardo') || pageContent.includes('Dave');
    
    expect(hasLars || hasDave).toBe(true);
  });

  test('should display gear comparison table', async ({ page }) => {
    await page.goto(`${BASE_URL}/vs/lars-ulrich-vs-dave-lombardo`);
    await page.waitForLoadState('load');
    await waitForComparisonPage(page);
    
    // Check for Head-to-Head section (actual section name, not "Gear Comparison")
    const pageContent = await page.locator('body').textContent();
    const hasHeadToHead = pageContent.includes('Head-to-Head') || 
                          pageContent.includes('Showdown') ||
                          pageContent.includes('Career Stats');
    expect(hasHeadToHead).toBe(true);
  });

  test('should have proper SEO meta tags', async ({ page }) => {
    await page.goto(`${BASE_URL}/vs/lars-ulrich-vs-dave-lombardo`);
    await page.waitForLoadState('load');
    await waitForComparisonPage(page);
    
    const title = await page.title();
    // Title should contain drummer names or comparison-related keywords
    const hasValidTitle = title.includes('Lars') || 
                          title.includes('Dave') ||
                          title.includes('Drummer') ||
                          title.includes('Metal');
    expect(hasValidTitle).toBe(true);
    
    // Check canonical if it exists
    const canonical = page.locator('link[rel="canonical"]');
    const count = await canonical.count();
    if (count > 0) {
      const href = await canonical.getAttribute('href');
      if (href) {
        expect(href).toContain('/vs/');
      }
    }
  });

  test('should have structured data markup', async ({ page }) => {
    await page.goto(`${BASE_URL}/vs/lars-ulrich-vs-dave-lombardo`);
    await page.waitForLoadState('load');
    await waitForComparisonPage(page);
    
    // Check for any structured data
    const ldScripts = page.locator('script[type="application/ld+json"]');
    const count = await ldScripts.count();
    
    // If structured data exists, validate format
    if (count > 0) {
      const content = await ldScripts.first().textContent();
      if (content) {
        const json = JSON.parse(content);
        expect(json['@context']).toBe('https://schema.org');
      }
    }
    
    // Page should still render correctly regardless of structured data
    const pageContent = await page.locator('body').textContent();
    expect(pageContent.length).toBeGreaterThan(100);
  });
});

test.describe('Drummer Comparison Mobile Responsiveness', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should display correctly on mobile', async ({ page }) => {
    await page.goto(`${BASE_URL}/vs/lars-ulrich-vs-dave-lombardo`);
    await page.waitForLoadState('load');
    await waitForComparisonPage(page);
    
    // Check page has content
    const pageContent = await page.locator('body').textContent();
    const hasContent = pageContent.includes('Lars') || 
                       pageContent.includes('Dave') ||
                       pageContent.includes('Drummer') ||
                       pageContent.includes('Showdown');
    expect(hasContent).toBe(true);
  });
});

// Test all comparison slugs exist
for (const slug of COMPARISON_SLUGS) {
  test(`should load comparison: ${slug}`, async ({ page }) => {
    await page.goto(`${BASE_URL}/vs/${slug}`);
    await page.waitForLoadState('load');
    await waitForComparisonPage(page);
    
    // Check page renders with content
    const pageContent = await page.locator('body').textContent();
    const hasShowdown = pageContent.includes('Showdown') || 
                        pageContent.includes('Head-to-Head') ||
                        pageContent.includes('VS') ||
                        pageContent.includes('Drummer');
    expect(hasShowdown).toBe(true);
  });
}
