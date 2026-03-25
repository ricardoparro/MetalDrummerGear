/**
 * E2E Tests for Article Schema (Issue #777)
 * Tests JSON-LD structured data for content article pages
 * 
 * Validates that Article schema is properly generated for:
 * - Album gear breakdown articles
 * - Drummer gear breakdown articles
 */
const { test, expect } = require('@playwright/test');
const BASE_URL = process.env.BASE_URL || 'https://metalforge.io';

// Test articles with their expected metadata
const ARTICLE_TEST_CASES = [
  {
    slug: 'cowboys-from-hell-drum-setup',
    expectedHeadline: "Cowboys from Hell Drum Setup",
    expectedSection: 'Album Gear Breakdown',
  },
  {
    slug: 'whats-in-vinnie-pauls-kit',
    expectedHeadline: "Vinnie Paul's Pantera Arsenal",
    expectedSection: 'Drummer Gear Breakdown',
  },
  {
    slug: 'whats-in-nicko-mcbrains-kit',
    expectedHeadline: "Nicko McBrain's Iron Maiden Arsenal",
    expectedSection: 'Drummer Gear Breakdown',
  },
];

test.describe('Article Schema (Issue #777)', () => {
  
  test('article pages should have Article structured data', async ({ page }) => {
    const testArticle = ARTICLE_TEST_CASES[0];
    await page.goto(`${BASE_URL}/articles/${testArticle.slug}`, { waitUntil: 'domcontentloaded' });
    
    // Wait for page content to load
    await page.waitForTimeout(2000);
    
    // Check for JSON-LD script with Article type
    const ldJsonScripts = await page.locator('script[type="application/ld+json"]').all();
    
    let foundArticleSchema = false;
    for (const script of ldJsonScripts) {
      const content = await script.textContent();
      try {
        const parsed = JSON.parse(content || '{}');
        if (parsed['@type'] === 'Article') {
          foundArticleSchema = true;
          
          // Verify required Article schema fields
          expect(parsed['@context']).toBe('https://schema.org');
          expect(parsed.headline).toBeDefined();
          expect(parsed.author).toBeDefined();
          expect(parsed.publisher).toBeDefined();
          expect(parsed.datePublished).toBeDefined();
          expect(parsed.mainEntityOfPage).toBeDefined();
          
          // Verify author and publisher structure
          expect(parsed.author['@type']).toBe('Organization');
          expect(parsed.publisher['@type']).toBe('Organization');
          expect(parsed.publisher.name).toBe('MetalForge');
          
          break;
        }
      } catch (e) {
        // Continue checking other scripts
      }
    }
    
    // If no client-side schema found, check meta API response
    if (!foundArticleSchema) {
      // The meta API should return Article schema in the HTML for crawlers
      const metaResponse = await page.request.get(`${BASE_URL}/api/meta/articles/${testArticle.slug}`);
      const metaHtml = await metaResponse.text();
      
      // Check that the meta API response includes Article schema
      expect(metaHtml).toContain('@type');
      expect(metaHtml).toContain('Article');
      expect(metaHtml).toContain('schema.org');
    }
  });

  test('article meta page should have og:type article', async ({ page }) => {
    const testArticle = ARTICLE_TEST_CASES[0];
    
    // Fetch the meta API endpoint directly
    const response = await page.request.get(`${BASE_URL}/api/meta/articles/${testArticle.slug}`);
    const html = await response.text();
    
    // Check for article-specific Open Graph tags
    expect(html).toContain('og:type');
    expect(html).toContain('article');
  });

  test('article schema should have proper datePublished format', async ({ page }) => {
    const testArticle = ARTICLE_TEST_CASES[0];
    
    // Fetch the meta API endpoint
    const response = await page.request.get(`${BASE_URL}/api/meta/articles/${testArticle.slug}`);
    const html = await response.text();
    
    // Check for datePublished in YYYY-MM-DD format
    const dateMatch = html.match(/"datePublished":\s*"(\d{4}-\d{2}-\d{2})"/);
    expect(dateMatch).toBeTruthy();
    
    // Verify it's a valid date
    if (dateMatch) {
      const date = new Date(dateMatch[1]);
      expect(date.toString()).not.toBe('Invalid Date');
    }
  });

  test('article schema should include keywords', async ({ page }) => {
    const testArticle = ARTICLE_TEST_CASES[0];
    
    // Fetch the meta API endpoint
    const response = await page.request.get(`${BASE_URL}/api/meta/articles/${testArticle.slug}`);
    const html = await response.text();
    
    // Check for keywords in schema
    expect(html).toContain('keywords');
  });

  test('multiple article pages should have unique schemas', async ({ page }) => {
    const schemas = [];
    
    for (const testArticle of ARTICLE_TEST_CASES.slice(0, 2)) {
      const response = await page.request.get(`${BASE_URL}/api/meta/articles/${testArticle.slug}`);
      const html = await response.text();
      
      // Extract headline from schema
      const headlineMatch = html.match(/"headline":\s*"([^"]+)"/);
      if (headlineMatch) {
        schemas.push({
          slug: testArticle.slug,
          headline: headlineMatch[1],
        });
      }
    }
    
    // Verify each article has unique headline
    expect(schemas.length).toBeGreaterThanOrEqual(2);
    expect(schemas[0].headline).not.toBe(schemas[1].headline);
  });
});
