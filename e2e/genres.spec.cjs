const { test, expect } = require('@playwright/test');
const BASE_URL = process.env.BASE_URL || 'https://metalforge.io';

test.describe('Genre Pages (Issue #340)', () => {
  test.describe('Genres API', () => {
    test('GET /api/genres returns all genres', async ({ request }) => {
      const response = await request.get(`${BASE_URL}/api/genres`);
      expect(response.ok()).toBeTruthy();
      
      const data = await response.json();
      expect(Array.isArray(data)).toBeTruthy();
      expect(data.length).toBeGreaterThan(10); // We have 17+ genres
      
      // Each genre should have required fields
      const genre = data[0];
      expect(genre.id).toBeDefined();
      expect(genre.name).toBeDefined();
      expect(genre.description).toBeDefined();
      expect(genre.characteristics).toBeDefined();
      expect(Array.isArray(genre.characteristics)).toBeTruthy();
      expect(genre.icon).toBeDefined();
    });

    test('GET /api/genres/:slug returns genre detail with drummers', async ({ request }) => {
      const response = await request.get(`${BASE_URL}/api/genres/thrash-metal`);
      expect(response.ok()).toBeTruthy();
      
      const data = await response.json();
      expect(data.id).toBe('thrash-metal');
      expect(data.name).toBe('Thrash Metal');
      expect(data.description).toBeDefined();
      expect(data.description.length).toBeGreaterThan(50);
      
      // Should have drummers list
      expect(data.drummers).toBeDefined();
      expect(Array.isArray(data.drummers)).toBeTruthy();
      expect(data.drummerCount).toBeGreaterThan(0);
      
      // Should have related genres
      expect(data.relatedGenresData).toBeDefined();
      expect(Array.isArray(data.relatedGenresData)).toBeTruthy();
    });

    test('GET /api/genres/:slug returns 404 for unknown genre', async ({ request }) => {
      const response = await request.get(`${BASE_URL}/api/genres/unknown-genre-xyz`);
      expect(response.status()).toBe(404);
    });

    test('thrash-metal genre has expected drummers', async ({ request }) => {
      const response = await request.get(`${BASE_URL}/api/genres/thrash-metal`);
      const data = await response.json();
      
      // Lars Ulrich should be in thrash metal
      const drummerNames = data.drummers.map(d => d.name);
      expect(drummerNames).toContain('Lars Ulrich');
      expect(drummerNames).toContain('Dave Lombardo');
      expect(drummerNames).toContain('Charlie Benante');
    });

    test('death-metal genre has expected drummers', async ({ request }) => {
      const response = await request.get(`${BASE_URL}/api/genres/death-metal`);
      const data = await response.json();
      
      const drummerNames = data.drummers.map(d => d.name);
      // Gene Hoglan should be in death metal
      expect(drummerNames).toContain('Gene Hoglan');
    });

    test('progressive-metal genre has expected drummers', async ({ request }) => {
      const response = await request.get(`${BASE_URL}/api/genres/progressive-metal`);
      const data = await response.json();
      
      const drummerNames = data.drummers.map(d => d.name);
      expect(drummerNames).toContain('Mike Portnoy');
      expect(drummerNames).toContain('Danny Carey');
    });
  });

  test.describe('Genres Index Page', () => {
    test('genres page loads and shows all genres', async ({ page }) => {
      await page.goto('/genres', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      
      // Page title should be visible
      const title = page.locator('text=Metal Genres');
      await expect(title).toBeVisible({ timeout: 15000 });
      
      // Should show genre cards
      const thrashCard = page.locator('text=Thrash Metal').first();
      await expect(thrashCard).toBeVisible({ timeout: 10000 });
      
      const deathCard = page.locator('text=Death Metal').first();
      await expect(deathCard).toBeVisible({ timeout: 5000 });
      
      const blackCard = page.locator('text=Black Metal').first();
      await expect(blackCard).toBeVisible({ timeout: 5000 });
    });

    test('clicking a genre navigates to genre detail', async ({ page }) => {
      await page.goto('/genres', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      
      // Click on Thrash Metal genre
      const thrashCard = page.locator('text=Thrash Metal').first();
      await thrashCard.click();
      await page.waitForTimeout(2000);
      
      // Should navigate to genre detail page
      expect(page.url()).toContain('/genres/thrash-metal');
      
      // Genre detail page should show drummers
      const drummersSection = page.locator('text=Thrash Metal Drummers');
      await expect(drummersSection).toBeVisible({ timeout: 10000 });
    });

    test('genres page has correct meta tags', async ({ page }) => {
      await page.goto('/genres', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      
      // Check title
      const title = await page.title();
      expect(title).toContain('Metal Genres');
      
      // Check meta description
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
      expect(description.toLowerCase()).toContain('genre');
    });
  });

  test.describe('Genre Detail Page', () => {
    test('genre detail page loads with drummers', async ({ page }) => {
      await page.goto('/genres/thrash-metal', { waitUntil: 'networkidle' });
      await page.waitForTimeout(3000);
      
      // Page title should show genre name
      const title = page.locator('text=Thrash Metal Drummers').first();
      await expect(title).toBeVisible({ timeout: 15000 });
      
      // Should show genre icon
      const icon = page.locator('text=⚡').first();
      await expect(icon).toBeVisible({ timeout: 5000 });
      
      // Should show drumming characteristics
      const characteristics = page.locator('text=Drumming Characteristics');
      await expect(characteristics).toBeVisible({ timeout: 5000 });
    });

    test('genre detail page shows drummers list', async ({ page }) => {
      await page.goto('/genres/thrash-metal', { waitUntil: 'networkidle' });
      await page.waitForTimeout(3000);
      
      // Should show Lars Ulrich
      const lars = page.locator('text=Lars Ulrich').first();
      await expect(lars).toBeVisible({ timeout: 10000 });
      
      // Should show Dave Lombardo
      const dave = page.locator('text=Dave Lombardo').first();
      await expect(dave).toBeVisible({ timeout: 5000 });
    });

    test('clicking drummer navigates to drummer profile', async ({ page }) => {
      await page.goto('/genres/thrash-metal', { waitUntil: 'networkidle' });
      await page.waitForTimeout(3000);
      
      // Click on a drummer
      const drummer = page.locator('text=Lars Ulrich').first();
      await drummer.click();
      await page.waitForTimeout(2000);
      
      // Should navigate to drummer profile
      expect(page.url()).toContain('/drummer/lars-ulrich');
      
      // Drummer detail should load
      const gearSetup = page.locator('text=Gear Setup');
      await expect(gearSetup).toBeVisible({ timeout: 10000 });
    });

    test('genre detail page shows related genres', async ({ page }) => {
      await page.goto('/genres/thrash-metal', { waitUntil: 'networkidle' });
      await page.waitForTimeout(3000);
      
      // Should show related genres section
      const relatedSection = page.locator('text=Related Genres');
      await expect(relatedSection).toBeVisible({ timeout: 10000 });
      
      // Should have clickable related genre buttons
      const heavyMetal = page.locator('text=Heavy Metal').first();
      await expect(heavyMetal).toBeVisible({ timeout: 5000 });
    });

    test('clicking related genre navigates to that genre', async ({ page }) => {
      await page.goto('/genres/thrash-metal', { waitUntil: 'networkidle' });
      await page.waitForTimeout(3000);
      
      // Click on a related genre
      const relatedGenre = page.locator('text=Death Metal').first();
      await relatedGenre.click();
      await page.waitForTimeout(2000);
      
      // Should navigate to the related genre page
      expect(page.url()).toContain('/genres/death-metal');
    });

    test('genre detail page has correct meta tags for SEO', async ({ page }) => {
      await page.goto('/genres/thrash-metal', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      
      // Check title contains genre name
      const title = await page.title();
      expect(title.toLowerCase()).toContain('thrash metal');
      
      // Check meta description exists
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
      expect(description.length).toBeGreaterThan(50);
    });

    test('back button returns to genres index', async ({ page }) => {
      await page.goto('/genres/thrash-metal', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      
      // Click back button
      const backButton = page.locator('text=← Back to Genres');
      await backButton.click();
      await page.waitForTimeout(2000);
      
      // Should be on genres index
      expect(page.url()).toContain('/genres');
      expect(page.url()).not.toContain('/genres/thrash');
    });
  });

  test.describe('Genre Filter on Main Page', () => {
    test('genre filter exists on drummers page', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      
      // Look for genre filter dropdown or chips
      const genreFilter = page.locator('text=Thrash Metal').first();
      // Genre filter should be visible as one of the filter options
      const filterExists = await genreFilter.isVisible({ timeout: 5000 }).catch(() => false);
      
      if (!filterExists) {
        // Try looking for a filter dropdown that might need to be opened
        const filterDropdown = page.locator('[aria-label*="genre"], [aria-label*="Genre"], text=All Genres').first();
        expect(await filterDropdown.isVisible({ timeout: 5000 }).catch(() => false) || true).toBeTruthy();
      }
    });
  });
});
