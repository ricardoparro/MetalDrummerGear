const { test, expect } = require('@playwright/test');
const BASE_URL = process.env.BASE_URL || 'https://metalforge.io';

test.describe('Techniques Pages (Issue #344)', () => {
  test.describe('Techniques Index Page', () => {
    test('techniques page loads and shows all techniques', async ({ page }) => {
      await page.goto('/techniques', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      
      // Page title should be visible
      const title = page.locator('text=Metal Drumming Techniques');
      await expect(title).toBeVisible({ timeout: 15000 });
      
      // Should show technique cards
      const blastBeatCard = page.locator('text=Blast Beat').first();
      await expect(blastBeatCard).toBeVisible({ timeout: 10000 });
      
      const doubleBassCard = page.locator('text=Double Bass').first();
      await expect(doubleBassCard).toBeVisible({ timeout: 5000 });
      
      const gravityBlastCard = page.locator('text=Gravity Blast').first();
      await expect(gravityBlastCard).toBeVisible({ timeout: 5000 });
      
      const polyrhythmsCard = page.locator('text=Polyrhythms').first();
      await expect(polyrhythmsCard).toBeVisible({ timeout: 5000 });
    });

    test('clicking a technique navigates to technique detail', async ({ page }) => {
      await page.goto('/techniques', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      
      // Click on Blast Beat
      await page.locator('text=Blast Beat').first().click();
      await page.waitForURL('**/techniques/blast-beat');
      
      // Should show technique detail page
      const title = page.locator('text=Blast Beat').first();
      await expect(title).toBeVisible({ timeout: 10000 });
    });

    test('techniques page has correct meta tags', async ({ page }) => {
      await page.goto('/techniques', { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);
      
      // Check page title
      const pageTitle = await page.title();
      expect(pageTitle).toContain('Metal Drumming Techniques');
      
      // Check meta description
      const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
      expect(metaDesc).toContain('drumming techniques');
    });
  });

  test.describe('Technique Detail Pages', () => {
    test('blast-beat page loads with all sections', async ({ page }) => {
      await page.goto('/techniques/blast-beat', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      
      // Title should be visible
      const title = page.locator('text=Blast Beat').first();
      await expect(title).toBeVisible({ timeout: 15000 });
      
      // Should show description section
      const whatIs = page.locator('text=What is Blast Beat');
      await expect(whatIs).toBeVisible({ timeout: 10000 });
      
      // Should show history section
      const history = page.locator('text=History & Origins');
      await expect(history).toBeVisible({ timeout: 5000 });
      
      // Should show how to learn section
      const howToLearn = page.locator('text=How to Learn');
      await expect(howToLearn).toBeVisible({ timeout: 5000 });
      
      // Should show Masters section
      const masters = page.locator('text=Masters of Blast Beat');
      await expect(masters).toBeVisible({ timeout: 5000 });
      
      // Should show gear recommendations
      const gear = page.locator('text=Gear Recommendations');
      await expect(gear).toBeVisible({ timeout: 5000 });
    });

    test('double-bass page loads correctly', async ({ page }) => {
      await page.goto('/techniques/double-bass', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      
      const title = page.locator('text=Double Bass Drumming').first();
      await expect(title).toBeVisible({ timeout: 15000 });
      
      // Should show difficulty
      const difficulty = page.locator('text=Intermediate to Advanced');
      await expect(difficulty).toBeVisible({ timeout: 5000 });
    });

    test('polyrhythms page loads correctly', async ({ page }) => {
      await page.goto('/techniques/polyrhythms', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      
      const title = page.locator('text=Polyrhythms').first();
      await expect(title).toBeVisible({ timeout: 15000 });
      
      // Should mention Meshuggah in the content
      const content = await page.textContent('body');
      expect(content).toContain('Meshuggah');
    });

    test('technique detail page has correct meta tags', async ({ page }) => {
      await page.goto('/techniques/blast-beat', { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);
      
      // Check page title includes technique name
      const pageTitle = await page.title();
      expect(pageTitle.toLowerCase()).toContain('blast beat');
      
      // Check meta description
      const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
      expect(metaDesc.toLowerCase()).toContain('blast beat');
    });

    test('masters section links to drummer profiles', async ({ page }) => {
      await page.goto('/techniques/blast-beat', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      
      // Should show George Kollias as a master
      const georgeKollias = page.locator('text=George Kollias').first();
      await expect(georgeKollias).toBeVisible({ timeout: 10000 });
      
      // Click on George Kollias should navigate to his profile
      await georgeKollias.click();
      await page.waitForTimeout(2000);
      
      // Should be on drummer detail page
      const drummerName = page.locator('text=George Kollias').first();
      await expect(drummerName).toBeVisible({ timeout: 10000 });
      
      // Should show band name (Nile)
      const bandName = page.locator('text=Nile');
      await expect(bandName).toBeVisible({ timeout: 5000 });
    });

    test('related techniques section works', async ({ page }) => {
      await page.goto('/techniques/blast-beat', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      
      // Should show related techniques
      const relatedSection = page.locator('text=Related Techniques');
      await expect(relatedSection).toBeVisible({ timeout: 10000 });
      
      // Gravity Blast should be a related technique
      const gravityBlast = page.locator('text=Gravity Blast').last();
      await expect(gravityBlast).toBeVisible({ timeout: 5000 });
      
      // Click on Gravity Blast
      await gravityBlast.click();
      await page.waitForURL('**/techniques/gravity-blast');
      
      // Should navigate to Gravity Blast page
      const title = page.locator('text=Gravity Blast').first();
      await expect(title).toBeVisible({ timeout: 10000 });
    });

    test('back button returns to techniques list', async ({ page }) => {
      await page.goto('/techniques/blast-beat', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      
      // Click back button
      const backButton = page.locator('text=← Back to Techniques');
      await expect(backButton).toBeVisible({ timeout: 10000 });
      await backButton.click();
      
      await page.waitForURL('**/techniques');
      
      // Should be on techniques index
      const title = page.locator('text=Metal Drumming Techniques');
      await expect(title).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('Techniques Homepage Section', () => {
    test('homepage shows techniques section', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      
      // Should show techniques section
      const sectionTitle = page.locator('text=🥁 Drumming Techniques');
      await expect(sectionTitle).toBeVisible({ timeout: 15000 });
      
      // Should show some technique cards
      const blastBeat = page.locator('text=Blast Beat').first();
      await expect(blastBeat).toBeVisible({ timeout: 5000 });
    });

    test('clicking technique from homepage navigates to detail', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      
      // Find and click Blast Beat in the techniques section
      const blastBeat = page.locator('text=Blast Beat').first();
      await expect(blastBeat).toBeVisible({ timeout: 10000 });
      await blastBeat.click();
      
      await page.waitForURL('**/techniques/blast-beat');
      
      // Should be on blast beat detail page
      const title = page.locator('text=Blast Beat').first();
      await expect(title).toBeVisible({ timeout: 10000 });
    });

    test('View All link navigates to techniques index', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      
      // Find and click View All
      const viewAll = page.locator('text=View All').first();
      await expect(viewAll).toBeVisible({ timeout: 10000 });
      await viewAll.click();
      
      await page.waitForURL('**/techniques');
      
      // Should be on techniques index
      const title = page.locator('text=Metal Drumming Techniques');
      await expect(title).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('Technique Content Quality', () => {
    test('each technique has substantial content', async ({ page }) => {
      const techniques = [
        'blast-beat',
        'double-bass',
        'gravity-blast',
        'polyrhythms',
        'one-handed-roll',
        'triggered-drums',
        'odd-time-signatures',
        'swivel-technique'
      ];
      
      for (const slug of techniques) {
        await page.goto(`/techniques/${slug}`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1000);
        
        // Get page content length (should have at least 200+ words)
        const bodyText = await page.textContent('body');
        expect(bodyText.length).toBeGreaterThan(500);
        
        // Should have How to Learn section
        const howToLearn = page.locator('text=How to Learn');
        await expect(howToLearn).toBeVisible({ timeout: 5000 });
      }
    });

    test('techniques have video examples', async ({ page }) => {
      await page.goto('/techniques/blast-beat', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      
      // Should have video section
      const videoSection = page.locator('text=Video Examples');
      await expect(videoSection).toBeVisible({ timeout: 10000 });
      
      // Should have YouTube embeds
      const iframes = page.locator('iframe[src*="youtube.com"]');
      const count = await iframes.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('SEO and Accessibility', () => {
    test('technique pages have proper heading structure', async ({ page }) => {
      await page.goto('/techniques/blast-beat', { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);
      
      // Should have h1
      const h1Count = await page.locator('h1, [accessibilityRole="header"]').count();
      expect(h1Count).toBeGreaterThan(0);
    });

    test('technique cards have accessibility labels', async ({ page }) => {
      await page.goto('/techniques', { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);
      
      // Cards should have accessibility labels
      const cards = page.locator('[accessibilityRole="button"]');
      const count = await cards.count();
      expect(count).toBeGreaterThan(5);
    });

    test('sitemap includes technique pages', async ({ request }) => {
      const response = await request.get(`${BASE_URL}/api/sitemap`);
      expect(response.ok()).toBeTruthy();
      
      const sitemap = await response.text();
      expect(sitemap).toContain('/techniques');
      expect(sitemap).toContain('/techniques/blast-beat');
      expect(sitemap).toContain('/techniques/double-bass');
      expect(sitemap).toContain('/techniques/polyrhythms');
    });
  });

  test.describe('URL Routing', () => {
    test('direct navigation to technique page works', async ({ page }) => {
      await page.goto('/techniques/double-bass', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      
      const title = page.locator('text=Double Bass Drumming');
      await expect(title).toBeVisible({ timeout: 15000 });
    });

    test('invalid technique slug shows error', async ({ page }) => {
      await page.goto('/techniques/invalid-technique-xyz', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      
      // Should show "not found" message
      const notFound = page.locator('text=Technique not found');
      await expect(notFound).toBeVisible({ timeout: 10000 });
    });

    test('browser back button works correctly', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);
      
      // Navigate to techniques
      await page.goto('/techniques', { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);
      
      // Navigate to a technique detail
      await page.goto('/techniques/blast-beat', { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);
      
      // Go back
      await page.goBack();
      await page.waitForTimeout(1000);
      
      // Should be on techniques index
      const url = page.url();
      expect(url).toContain('/techniques');
    });
  });
});
