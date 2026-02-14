// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * E2E Tests for Band FAQ Schema (Issue #363)
 * 
 * Tests that:
 * 1. FAQ schema renders on band pages that have FAQ data
 * 2. FAQ schema is valid JSON-LD
 * 3. FAQ schema is cleaned up on navigation
 */

const BASE_URL = process.env.TEST_URL || 'http://localhost:8081';

test.describe('Band FAQ Schema', () => {
  test('FAQ schema renders on Metallica band page', async ({ page }) => {
    // Navigate to Metallica band page (has FAQ data)
    await page.goto(`${BASE_URL}/bands/metallica`, { waitUntil: 'load' });
    
    // Wait for band page to load
    await expect(page.locator('h1')).toContainText('Metallica');
    
    // Check that FAQ schema script exists
    const faqScript = page.locator('script[data-schema="faq"]');
    await expect(faqScript).toHaveCount(1);
    
    // Get and parse the FAQ schema JSON
    const faqSchemaContent = await faqScript.textContent();
    const faqSchema = JSON.parse(faqSchemaContent);
    
    // Validate schema structure
    expect(faqSchema['@context']).toBe('https://schema.org');
    expect(faqSchema['@type']).toBe('FAQPage');
    expect(faqSchema.mainEntity).toBeDefined();
    expect(Array.isArray(faqSchema.mainEntity)).toBe(true);
    expect(faqSchema.mainEntity.length).toBeGreaterThan(0);
    
    // Validate first FAQ item structure
    const firstFaq = faqSchema.mainEntity[0];
    expect(firstFaq['@type']).toBe('Question');
    expect(firstFaq.name).toBeDefined();
    expect(firstFaq.acceptedAnswer).toBeDefined();
    expect(firstFaq.acceptedAnswer['@type']).toBe('Answer');
    expect(firstFaq.acceptedAnswer.text).toBeDefined();
    
    // Verify specific FAQ content for Metallica
    const questionNames = faqSchema.mainEntity.map(q => q.name);
    expect(questionNames).toContain("Who is Metallica's drummer?");
  });

  test('FAQ schema renders on Sepultura band page', async ({ page }) => {
    await page.goto(`${BASE_URL}/bands/sepultura`, { waitUntil: 'load' });
    
    // Wait for band page to load
    await expect(page.locator('h1')).toContainText('Sepultura');
    
    // Check that FAQ schema script exists
    const faqScript = page.locator('script[data-schema="faq"]');
    await expect(faqScript).toHaveCount(1);
    
    // Get and parse the FAQ schema JSON
    const faqSchemaContent = await faqScript.textContent();
    const faqSchema = JSON.parse(faqSchemaContent);
    
    // Validate schema structure
    expect(faqSchema['@type']).toBe('FAQPage');
    expect(faqSchema.mainEntity.length).toBeGreaterThan(0);
    
    // Verify specific FAQ content for Sepultura
    const questionNames = faqSchema.mainEntity.map(q => q.name);
    expect(questionNames).toContain("Who is Sepultura's current drummer?");
  });

  test('FAQ schema renders on Dream Theater band page', async ({ page }) => {
    await page.goto(`${BASE_URL}/bands/dream-theater`, { waitUntil: 'load' });
    
    // Wait for band page to load
    await expect(page.locator('h1')).toContainText('Dream Theater');
    
    // Check that FAQ schema script exists
    const faqScript = page.locator('script[data-schema="faq"]');
    await expect(faqScript).toHaveCount(1);
    
    // Get and parse the FAQ schema JSON
    const faqSchemaContent = await faqScript.textContent();
    const faqSchema = JSON.parse(faqSchemaContent);
    
    // Validate schema structure
    expect(faqSchema['@type']).toBe('FAQPage');
    expect(faqSchema.mainEntity.length).toBeGreaterThan(0);
    
    // Verify specific FAQ content for Dream Theater
    const questionNames = faqSchema.mainEntity.map(q => q.name);
    expect(questionNames).toContain("Who is Dream Theater's current drummer?");
  });

  test('Both band and FAQ schema coexist on page', async ({ page }) => {
    await page.goto(`${BASE_URL}/bands/metallica`, { waitUntil: 'load' });
    
    // Check that both schemas exist
    const bandScript = page.locator('script[data-schema="band"]');
    const faqScript = page.locator('script[data-schema="faq"]');
    
    await expect(bandScript).toHaveCount(1);
    await expect(faqScript).toHaveCount(1);
    
    // Validate band schema
    const bandSchemaContent = await bandScript.textContent();
    const bandSchema = JSON.parse(bandSchemaContent);
    expect(bandSchema['@type']).toBe('MusicGroup');
    expect(bandSchema.name).toBe('Metallica');
    
    // Validate FAQ schema
    const faqSchemaContent = await faqScript.textContent();
    const faqSchema = JSON.parse(faqSchemaContent);
    expect(faqSchema['@type']).toBe('FAQPage');
  });

  test('FAQ schema is cleaned up on navigation', async ({ page }) => {
    // Navigate to band page with FAQ
    await page.goto(`${BASE_URL}/bands/metallica`, { waitUntil: 'load' });
    await expect(page.locator('script[data-schema="faq"]')).toHaveCount(1);
    
    // Navigate back to home
    await page.locator('text=← Back').click();
    await page.waitForURL(`${BASE_URL}/`);
    
    // FAQ schema should be removed
    await expect(page.locator('script[data-schema="faq"]')).toHaveCount(0);
    await expect(page.locator('script[data-schema="band"]')).toHaveCount(0);
  });
});
