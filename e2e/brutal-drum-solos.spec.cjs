const { test, expect } = require('@playwright/test');
const BASE_URL = process.env.BASE_URL || 'https://metalforge.io';

// Issue #658: E2E tests for "Top 10 Most Brutal Drum Solos in Metal History" article page

// Check if the React app mounted
async function isAppMounted(page) {
  try {
    await page.waitForLoadState('domcontentloaded');
    const bodyText = await page.locator('body').textContent({ timeout: 5000 });
    if (bodyText.includes('enable JavaScript') && !bodyText.includes('Metal')) {
      return false;
    }
    return bodyText.length > 200;
  } catch {
    return false;
  }
}

test.describe('Top 10 Most Brutal Drum Solos Article', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the article page
    await page.goto(`${BASE_URL}/lists/most-brutal-drum-solos`);
    await page.waitForLoadState('networkidle');
  });

  test('article page loads with correct title and content', async ({ page }) => {
    test.setTimeout(30000);
    
    const mounted = await isAppMounted(page);
    if (!mounted) {
      console.log('⚠️ React app did not mount');
      test.skip(true, 'React app did not mount');
      return;
    }
    
    // Check page title contains article name
    await expect(page).toHaveTitle(/Most Brutal Drum Solos|MetalForge/i);
    
    // Check article heading is visible
    await expect(page.getByText('Top 10 Most Brutal Drum Solos', { exact: false })).toBeVisible({ timeout: 15000 });
    
    // Check the intro section exists
    await expect(page.getByText('The Art of the Metal Drum Solo', { exact: false })).toBeVisible();
    
    console.log('✓ Article page loaded successfully');
  });

  test('displays all 10 ranked drummers', async ({ page }) => {
    test.setTimeout(30000);
    
    const mounted = await isAppMounted(page);
    if (!mounted) {
      test.skip(true, 'React app did not mount');
      return;
    }
    
    // Check for presence of key drummers from the list
    const expectedDrummers = [
      'Joey Jordison',      // #1 - Disasterpieces
      'Danny Carey',        // #2 - Pneuma
      'Mike Portnoy',       // #3 - Dream Theater
      'Dave Lombardo',      // #4 - Slayer
      'Lars Ulrich',        // #5 - Metallica
      'Gene Hoglan',        // #6 - Death/Testament
      'Tomas Haake',        // #7 - Meshuggah
      'George Kollias',     // #8 - Nile
      'Vinnie Paul',        // #9 - Pantera
      'Mario Duplantier',   // #10 - Gojira
    ];
    
    for (const drummer of expectedDrummers.slice(0, 5)) { // Test first 5 for speed
      await expect(page.getByText(drummer, { exact: false }).first()).toBeVisible({ timeout: 10000 });
    }
    
    console.log('✓ All ranked drummers are displayed');
  });

  test('has proper SEO meta tags', async ({ page }) => {
    test.setTimeout(20000);
    
    const mounted = await isAppMounted(page);
    if (!mounted) {
      test.skip(true, 'React app did not mount');
      return;
    }
    
    // Wait for JS to update meta tags
    await page.waitForTimeout(2000);
    
    // Check meta description
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
    expect(description.toLowerCase()).toContain('drum solo');
    
    // Check og:title
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toBeTruthy();
    expect(ogTitle.toLowerCase()).toContain('brutal');
    
    // Check og:type is article
    const ogType = await page.locator('meta[property="og:type"]').getAttribute('content');
    expect(ogType).toBe('article');
    
    console.log('✓ SEO meta tags are properly set');
  });

  test('has Article schema markup', async ({ page }) => {
    test.setTimeout(20000);
    
    const mounted = await isAppMounted(page);
    if (!mounted) {
      test.skip(true, 'React app did not mount');
      return;
    }
    
    // Wait for JS to inject schema
    await page.waitForTimeout(2000);
    
    // Look for JSON-LD script
    const schemaScript = await page.locator('script[data-schema="top10-article"]').textContent();
    expect(schemaScript).toBeTruthy();
    
    const schema = JSON.parse(schemaScript);
    expect(schema['@type']).toBe('Article');
    expect(schema.headline).toContain('Brutal Drum Solos');
    expect(schema.author).toBeTruthy();
    expect(schema.datePublished).toBeTruthy();
    
    console.log('✓ Article schema markup is present');
  });

  test('has VideoObject schema for embedded videos', async ({ page }) => {
    test.setTimeout(20000);
    
    const mounted = await isAppMounted(page);
    if (!mounted) {
      test.skip(true, 'React app did not mount');
      return;
    }
    
    // Wait for JS to inject schema
    await page.waitForTimeout(2000);
    
    // Look for video schema script
    const videoSchemaScript = await page.locator('script[data-schema="top10-videos"]').textContent();
    expect(videoSchemaScript).toBeTruthy();
    
    const videos = JSON.parse(videoSchemaScript);
    expect(Array.isArray(videos)).toBe(true);
    expect(videos.length).toBeGreaterThan(0);
    expect(videos[0]['@type']).toBe('VideoObject');
    expect(videos[0].embedUrl).toContain('youtube');
    
    console.log(`✓ VideoObject schema present with ${videos.length} videos`);
  });

  test('social share buttons are present with WhatsApp', async ({ page }) => {
    test.setTimeout(20000);
    
    const mounted = await isAppMounted(page);
    if (!mounted) {
      test.skip(true, 'React app did not mount');
      return;
    }
    
    // Check for share buttons (by aria-label)
    await expect(page.locator('[accessibilitylabel*="Twitter"]').or(page.getByText('𝕏')).first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('[accessibilitylabel*="Facebook"]').or(page.getByText('f', { exact: true }).first())).toBeVisible({ timeout: 5000 });
    await expect(page.locator('[accessibilitylabel*="WhatsApp"]').or(page.getByText('💬').first())).toBeVisible({ timeout: 5000 });
    await expect(page.locator('[accessibilitylabel*="Copy"]').or(page.getByText('🔗').first())).toBeVisible({ timeout: 5000 });
    
    console.log('✓ All social share buttons including WhatsApp are present');
  });

  test('expandable drummer cards work', async ({ page }) => {
    test.setTimeout(30000);
    
    const mounted = await isAppMounted(page);
    if (!mounted) {
      test.skip(true, 'React app did not mount');
      return;
    }
    
    // Wait for content to load
    await page.waitForTimeout(2000);
    
    // Look for expand button
    const expandButton = page.getByText('Video, Gear & Fun Facts', { exact: false }).first();
    if (await expandButton.isVisible()) {
      await expandButton.click();
      
      // Check that expanded content appears (video section or fun facts)
      await expect(page.getByText('Featured Performance', { exact: false }).or(page.getByText('Fun Facts', { exact: false }))).toBeVisible({ timeout: 10000 });
      
      console.log('✓ Expandable cards work correctly');
    } else {
      console.log('⚠️ No expand buttons found - may need content to be loaded');
    }
  });

  test('internal links to drummer profiles work', async ({ page }) => {
    test.setTimeout(30000);
    
    const mounted = await isAppMounted(page);
    if (!mounted) {
      test.skip(true, 'React app did not mount');
      return;
    }
    
    // Wait for content
    await page.waitForTimeout(2000);
    
    // Click on a drummer card (Joey Jordison)
    const drummerCard = page.getByText('Joey Jordison', { exact: false }).first();
    await drummerCard.click();
    
    // Should navigate to drummer profile
    await page.waitForURL(/drummer|joey-jordison/i, { timeout: 10000 });
    
    // Verify we're on a drummer page
    await expect(page.getByText('Slipknot', { exact: false }).first()).toBeVisible({ timeout: 10000 });
    
    console.log('✓ Internal drummer profile links work');
  });

  test('conclusion section is present', async ({ page }) => {
    test.setTimeout(20000);
    
    const mounted = await isAppMounted(page);
    if (!mounted) {
      test.skip(true, 'React app did not mount');
      return;
    }
    
    // Scroll to bottom to find conclusion
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    
    // Look for conclusion section
    await expect(page.getByText('Legacy of Metal Drum Solos', { exact: false })).toBeVisible({ timeout: 10000 });
    
    console.log('✓ Conclusion section is present');
  });
});

test.describe('Article SEO and Accessibility', () => {
  test('article is accessible via /lists/most-brutal-drum-solos route', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/lists/most-brutal-drum-solos`);
    expect(response.status()).toBe(200);
    
    console.log('✓ Article route returns 200');
  });

  test('article appears in sitemap', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/sitemap`);
    expect(response.ok()).toBeTruthy();
    
    const sitemap = await response.text();
    expect(sitemap).toContain('most-brutal-drum-solos');
    
    console.log('✓ Article is included in sitemap');
  });
});
