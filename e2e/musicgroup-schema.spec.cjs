/**
 * E2E Tests for MusicGroup Schema (Issue #429)
 * Tests JSON-LD structured data for band-drummer relationships
 * 
 * Note: These tests validate the enhanced MusicGroup schema introduced in PR #431.
 * When running against production (IS_PRODUCTION_FALLBACK=true), tests will check
 * for basic schema structure instead of the new features (until PR is merged).
 */
const { test, expect } = require('@playwright/test');
const BASE_URL = process.env.BASE_URL || 'https://metalforge.io';
const IS_PRODUCTION_FALLBACK = process.env.IS_PRODUCTION_FALLBACK === 'true';

// Skip enhanced MusicGroup tests when running against production (without our changes)
const testOrSkip = IS_PRODUCTION_FALLBACK ? test.skip : test;

test.describe('MusicGroup Schema - Issue #429', () => {
  testOrSkip('drummer page includes MusicGroup in JSON-LD schema', async ({ page }) => {
    // Go to Lars Ulrich's page (Metallica - has full band data)
    await page.goto('/drummer/1', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    // Get the main JSON-LD script
    const ldJsonScript = await page.locator('script[type="application/ld+json"][data-schema="main"]');
    await expect(ldJsonScript).toBeAttached({ timeout: 10000 });
    
    const schemaText = await ldJsonScript.textContent();
    const schema = JSON.parse(schemaText);
    
    // Verify @graph structure
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@graph']).toBeDefined();
    expect(Array.isArray(schema['@graph'])).toBeTruthy();
    
    // Find MusicGroup entity in graph
    const musicGroup = schema['@graph'].find(entity => entity['@type'] === 'MusicGroup');
    expect(musicGroup).toBeDefined();
    expect(musicGroup.name).toBe('Metallica');
  });

  testOrSkip('MusicGroup schema includes genre and sameAs for bands with full data', async ({ page }) => {
    // Go to Lars Ulrich's page (Metallica - has full band data with sameAs)
    await page.goto('/drummer/1', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    const ldJsonScript = await page.locator('script[type="application/ld+json"][data-schema="main"]');
    const schemaText = await ldJsonScript.textContent();
    const schema = JSON.parse(schemaText);
    
    const musicGroup = schema['@graph'].find(entity => entity['@type'] === 'MusicGroup');
    expect(musicGroup).toBeDefined();
    
    // Verify genre is present
    expect(musicGroup.genre).toBeDefined();
    expect(Array.isArray(musicGroup.genre)).toBeTruthy();
    expect(musicGroup.genre.length).toBeGreaterThan(0);
    
    // Verify sameAs links are present (Wikipedia, Discogs, MusicBrainz, Wikidata)
    expect(musicGroup.sameAs).toBeDefined();
    expect(Array.isArray(musicGroup.sameAs)).toBeTruthy();
    expect(musicGroup.sameAs.length).toBeGreaterThan(0);
    
    // Check for Wikipedia link
    const hasWikipedia = musicGroup.sameAs.some(url => url.includes('wikipedia.org'));
    expect(hasWikipedia).toBeTruthy();
  });

  testOrSkip('Person schema references MusicGroup via memberOf', async ({ page }) => {
    await page.goto('/drummer/1', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    const ldJsonScript = await page.locator('script[type="application/ld+json"][data-schema="main"]');
    const schemaText = await ldJsonScript.textContent();
    const schema = JSON.parse(schemaText);
    
    // Find Person entity
    const person = schema['@graph'].find(entity => entity['@type'] === 'Person');
    expect(person).toBeDefined();
    expect(person.name).toBe('Lars Ulrich');
    
    // Verify memberOf references the MusicGroup
    expect(person.memberOf).toBeDefined();
    expect(person.memberOf['@id']).toBeDefined();
    
    // Find the referenced MusicGroup by @id
    const musicGroup = schema['@graph'].find(entity => 
      entity['@type'] === 'MusicGroup' && entity['@id'] === person.memberOf['@id']
    );
    expect(musicGroup).toBeDefined();
    expect(musicGroup.name).toBe('Metallica');
  });

  testOrSkip('MusicGroup schema has proper @id for entity linking', async ({ page }) => {
    await page.goto('/drummer/1', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    const ldJsonScript = await page.locator('script[type="application/ld+json"][data-schema="main"]');
    const schemaText = await ldJsonScript.textContent();
    const schema = JSON.parse(schemaText);
    
    const musicGroup = schema['@graph'].find(entity => entity['@type'] === 'MusicGroup');
    expect(musicGroup['@id']).toBeDefined();
    expect(musicGroup['@id']).toContain('metalforge.io/bands/');
    expect(musicGroup['@id']).toContain('#band');
  });

  // Issue #516: MusicGroup includes member relationship pointing to Person
  testOrSkip('MusicGroup schema includes member relationship (Issue #516)', async ({ page }) => {
    await page.goto('/drummer/1', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    const ldJsonScript = await page.locator('script[type="application/ld+json"][data-schema="main"]');
    const schemaText = await ldJsonScript.textContent();
    const schema = JSON.parse(schemaText);
    
    // Find MusicGroup and verify member relationship
    const musicGroup = schema['@graph'].find(entity => entity['@type'] === 'MusicGroup');
    expect(musicGroup).toBeDefined();
    expect(musicGroup.member).toBeDefined();
    expect(musicGroup.member['@type']).toBe('Person');
    expect(musicGroup.member['@id']).toBeDefined();
    expect(musicGroup.member.name).toBe('Lars Ulrich');
    
    // Verify @id uses slug-based URL (not numeric ID)
    expect(musicGroup.member['@id']).toContain('/drummer/lars-ulrich#person');
  });

  // Issue #516: Person schema @id uses slug-based URL
  testOrSkip('Person schema @id uses slug-based URL (Issue #516)', async ({ page }) => {
    await page.goto('/drummer/1', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    const ldJsonScript = await page.locator('script[type="application/ld+json"][data-schema="main"]');
    const schemaText = await ldJsonScript.textContent();
    const schema = JSON.parse(schemaText);
    
    const person = schema['@graph'].find(entity => entity['@type'] === 'Person');
    expect(person).toBeDefined();
    expect(person['@id']).toBeDefined();
    
    // @id should use slug-based URL, not numeric ID
    expect(person['@id']).toContain('/drummer/lars-ulrich#person');
    expect(person['@id']).not.toContain('/drummer/1#person');
    
    // Person should also have url property
    expect(person.url).toBeDefined();
    expect(person.url).toContain('/drummer/lars-ulrich');
  });

  testOrSkip('Danny Carey page includes Tool MusicGroup schema', async ({ page }) => {
    // Test Tool (Issue #355 reference)
    await page.goto('/drummer/14', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    const ldJsonScript = await page.locator('script[type="application/ld+json"][data-schema="main"]');
    const schemaText = await ldJsonScript.textContent();
    const schema = JSON.parse(schemaText);
    
    const musicGroup = schema['@graph'].find(entity => entity['@type'] === 'MusicGroup');
    expect(musicGroup).toBeDefined();
    expect(musicGroup.name).toBe('Tool');
    
    // Verify Tool has sameAs links
    expect(musicGroup.sameAs).toBeDefined();
    expect(musicGroup.sameAs.some(url => url.includes('wikipedia.org/wiki/Tool'))).toBeTruthy();
  });

  testOrSkip('Mario Duplantier page includes Gojira MusicGroup schema', async ({ page }) => {
    // Test Gojira (Issue #357 reference)
    await page.goto('/drummer/15', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    const ldJsonScript = await page.locator('script[type="application/ld+json"][data-schema="main"]');
    const schemaText = await ldJsonScript.textContent();
    const schema = JSON.parse(schemaText);
    
    const musicGroup = schema['@graph'].find(entity => entity['@type'] === 'MusicGroup');
    expect(musicGroup).toBeDefined();
    expect(musicGroup.name).toBe('Gojira');
    
    // Verify Gojira has sameAs links
    expect(musicGroup.sameAs).toBeDefined();
    expect(musicGroup.sameAs.length).toBeGreaterThan(0);
  });

  testOrSkip('MusicGroup includes foundingDate when available', async ({ page }) => {
    await page.goto('/drummer/1', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    const ldJsonScript = await page.locator('script[type="application/ld+json"][data-schema="main"]');
    const schemaText = await ldJsonScript.textContent();
    const schema = JSON.parse(schemaText);
    
    const musicGroup = schema['@graph'].find(entity => entity['@type'] === 'MusicGroup');
    expect(musicGroup.foundingDate).toBeDefined();
    expect(musicGroup.foundingDate).toBe('1981');
  });

  testOrSkip('MusicGroup includes foundingLocation when available', async ({ page }) => {
    await page.goto('/drummer/1', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    const ldJsonScript = await page.locator('script[type="application/ld+json"][data-schema="main"]');
    const schemaText = await ldJsonScript.textContent();
    const schema = JSON.parse(schemaText);
    
    const musicGroup = schema['@graph'].find(entity => entity['@type'] === 'MusicGroup');
    expect(musicGroup.foundingLocation).toBeDefined();
    expect(musicGroup.foundingLocation['@type']).toBe('Place');
    expect(musicGroup.foundingLocation.name).toBeDefined();
  });

  testOrSkip('Person schema includes nationality from drummer country', async ({ page }) => {
    await page.goto('/drummer/1', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    const ldJsonScript = await page.locator('script[type="application/ld+json"][data-schema="main"]');
    const schemaText = await ldJsonScript.textContent();
    const schema = JSON.parse(schemaText);
    
    const person = schema['@graph'].find(entity => entity['@type'] === 'Person');
    expect(person.nationality).toBeDefined();
    expect(person.nationality['@type']).toBe('Country');
    expect(person.nationality.name).toBe('Denmark');
  });

  testOrSkip('drummer without full band data gets fallback MusicGroup schema', async ({ page }) => {
    // Find a drummer whose band is not in the full bands.js registry
    // John Otto (Limp Bizkit) - ID 9
    await page.goto('/drummer/9', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    const ldJsonScript = await page.locator('script[type="application/ld+json"][data-schema="main"]');
    const schemaText = await ldJsonScript.textContent();
    const schema = JSON.parse(schemaText);
    
    // Should still have MusicGroup with basic data
    const musicGroup = schema['@graph'].find(entity => entity['@type'] === 'MusicGroup');
    expect(musicGroup).toBeDefined();
    expect(musicGroup.name).toBe('Limp Bizkit');
    
    // Fallback should at least have Wikipedia sameAs
    expect(musicGroup.sameAs).toBeDefined();
    expect(musicGroup.sameAs.some(url => url.includes('wikipedia.org'))).toBeTruthy();
  });

  testOrSkip('all drummers have valid MusicGroup schema', async ({ page, request }) => {
    // Increase timeout for multi-page test
    test.setTimeout(120000);
    
    const response = await request.get(`${BASE_URL}/api/drummers`);
    const drummers = await response.json();
    
    const errors = [];
    // Test first 10 drummers
    for (const d of drummers.slice(0, 10)) {
      await page.goto(`/drummer/${d.id}`, { waitUntil: 'load' });
      await page.waitForTimeout(1500);
      
      try {
        const ldJsonScript = await page.locator('script[type="application/ld+json"][data-schema="main"]');
        const schemaText = await ldJsonScript.textContent();
        const schema = JSON.parse(schemaText);
        
        // Verify MusicGroup exists
        const musicGroup = schema['@graph']?.find(entity => entity['@type'] === 'MusicGroup');
        if (!musicGroup) {
          errors.push(`${d.name} - missing MusicGroup in schema`);
          continue;
        }
        
        // Verify MusicGroup has name
        if (!musicGroup.name) {
          errors.push(`${d.name} - MusicGroup missing name`);
        }
        
        // Verify Person has memberOf
        const person = schema['@graph']?.find(entity => entity['@type'] === 'Person');
        if (!person?.memberOf) {
          errors.push(`${d.name} - Person missing memberOf`);
        }
      } catch (e) {
        errors.push(`${d.name} - Error parsing schema: ${e.message}`);
      }
    }
    
    expect(errors, `Schema errors:\n${errors.join('\n')}`).toHaveLength(0);
  });

  // This test always runs - verifies basic schema structure exists
  test('drummer pages have JSON-LD schema (basic check)', async ({ page }) => {
    // This test validates that schema infrastructure exists, regardless of MusicGroup features
    await page.goto('/drummer/1', { waitUntil: 'load' });
    await page.waitForTimeout(2000);

    // Verify JSON-LD script exists
    const ldJsonScript = await page.locator('script[type="application/ld+json"][data-schema="main"]');
    await expect(ldJsonScript).toBeAttached({ timeout: 10000 });
    
    const schemaText = await ldJsonScript.textContent();
    const schema = JSON.parse(schemaText);
    
    // Basic validation - should have @context and @graph or be an array
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@graph'] || Array.isArray(schema)).toBeTruthy();
    
    // Should have Person type somewhere in the schema
    const graphEntities = schema['@graph'] || [schema];
    const hasPerson = graphEntities.some(entity => 
      entity['@type'] === 'Person' || 
      (Array.isArray(entity['@type']) && entity['@type'].includes('Person'))
    );
    expect(hasPerson).toBeTruthy();
  });
});
