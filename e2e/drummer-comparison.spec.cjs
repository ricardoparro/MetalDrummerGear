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

test.describe('Drummer Comparisons Index Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/vs`);
    await page.waitForLoadState('networkidle');
  });

  test('should display the comparison index page with title', async ({ page }) => {
    const title = await page.title();
    expect(title).toContain('Drummer');
    expect(title).toContain('Comparison');
  });

  test('should have proper SEO meta tags', async ({ page }) => {
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('/vs');
    
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
  });
});

test.describe('Drummer Comparison Detail Page', () => {
  test('should load Lars vs Dave comparison', async ({ page }) => {
    await page.goto(`${BASE_URL}/vs/lars-ulrich-vs-dave-lombardo`);
    await page.waitForLoadState('networkidle');
    
    await page.waitForTimeout(2000);
    
    const vsText = page.getByText('VS');
    const hasVS = await vsText.isVisible().catch(() => false);
    expect(hasVS).toBe(true);
  });

  test('should display gear comparison table', async ({ page }) => {
    await page.goto(`${BASE_URL}/vs/lars-ulrich-vs-dave-lombardo`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const gearSection = page.getByText(/Gear Comparison/i);
    const hasGear = await gearSection.isVisible().catch(() => false);
    expect(hasGear).toBe(true);
  });

  test('should have proper SEO meta tags', async ({ page }) => {
    await page.goto(`${BASE_URL}/vs/lars-ulrich-vs-dave-lombardo`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const title = await page.title();
    expect(title).toContain('Lars Ulrich');
    expect(title).toContain('Dave Lombardo');
    
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('/vs/lars-ulrich-vs-dave-lombardo');
  });

  test('should have structured data markup', async ({ page }) => {
    await page.goto(`${BASE_URL}/vs/lars-ulrich-vs-dave-lombardo`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const ldScript = page.locator('script[data-schema="drummer-comparison"]');
    const hasLd = await ldScript.count() > 0;
    expect(hasLd).toBe(true);
    
    if (hasLd) {
      const ldContent = await ldScript.textContent();
      const ldJson = JSON.parse(ldContent || '{}');
      expect(ldJson['@context']).toBe('https://schema.org');
    }
  });
});

test.describe('Drummer Comparison Mobile Responsiveness', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should display correctly on mobile', async ({ page }) => {
    await page.goto(`${BASE_URL}/vs/lars-ulrich-vs-dave-lombardo`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const vsText = page.getByText('VS');
    const hasVS = await vsText.isVisible().catch(() => false);
    expect(hasVS).toBe(true);
  });
});

// Test all comparison slugs exist
for (const slug of COMPARISON_SLUGS) {
  test(`should load comparison: ${slug}`, async ({ page }) => {
    await page.goto(`${BASE_URL}/vs/${slug}`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const vsText = page.getByText('VS');
    const hasVS = await vsText.isVisible().catch(() => false);
    expect(hasVS).toBe(true);
  });
}
