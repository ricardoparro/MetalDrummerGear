// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * E2E Tests for "How to Sound Like [Drummer]" Guides (Issue #685)
 * 
 * Tests the SEO content hub at /guides and individual guide pages.
 */

test.describe('Sound Like Guides - Hub Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/guides');
    // Wait for the page to be interactive
    await page.waitForLoadState('domcontentloaded');
  });

  test('should display guides hub page with correct title', async ({ page }) => {
    // Check page title contains guides
    const title = await page.title();
    expect(title.toLowerCase()).toContain('sound like');
  });

  test('should display hero section with guide count', async ({ page }) => {
    // Look for the hero title
    const heroTitle = page.locator('text=How to Sound Like Your Favorite Metal Drummer');
    await expect(heroTitle).toBeVisible({ timeout: 10000 });
  });

  test('should display all 10 guide cards', async ({ page }) => {
    // Wait for guides to load
    await page.waitForTimeout(2000);
    
    // Check for drummer names in guide cards
    const drummerNames = [
      'Joey Jordison',
      'Danny Carey',
      'Lars Ulrich',
      'Dave Lombardo',
      'Mario Duplantier',
      'Tomas Haake',
      'Gene Hoglan',
      'Brann Dailor',
      'Matt Halpern',
      'Chris Adler'
    ];

    for (const name of drummerNames) {
      const card = page.locator(`text=${name}`).first();
      await expect(card).toBeVisible({ timeout: 5000 });
    }
  });

  test('should navigate to individual guide when clicking card', async ({ page }) => {
    // Wait for guides to load
    await page.waitForTimeout(1000);

    // Click on Joey Jordison guide
    await page.locator('text=Joey Jordison').first().click();
    
    // Should navigate to guide page
    await expect(page).toHaveURL(/\/guides\/how-to-sound-like-joey-jordison/);
  });

  test('should have back button that works', async ({ page }) => {
    const backButton = page.locator('text=← Back');
    await expect(backButton).toBeVisible();
    
    await backButton.click();
    
    // Should navigate back to home
    await expect(page).toHaveURL('/');
  });
});

test.describe('Sound Like Guides - Individual Guide Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/guides/how-to-sound-like-joey-jordison');
    await page.waitForLoadState('domcontentloaded');
  });

  test('should display guide title', async ({ page }) => {
    const title = page.locator('text=How to Sound Like Joey Jordison');
    await expect(title.first()).toBeVisible({ timeout: 10000 });
  });

  test('should display drummer name and band', async ({ page }) => {
    const drummerInfo = page.locator('text=Joey Jordison');
    await expect(drummerInfo.first()).toBeVisible();
    
    const bandInfo = page.locator('text=Slipknot');
    await expect(bandInfo.first()).toBeVisible();
  });

  test('should have section navigation tabs', async ({ page }) => {
    const sections = ['Intro', 'Technique', 'Gear', 'Tuning', 'Practice', 'FAQ'];
    
    for (const section of sections) {
      const tab = page.locator(`text=${section}`).first();
      await expect(tab).toBeVisible({ timeout: 5000 });
    }
  });

  test('should switch sections when clicking tabs', async ({ page }) => {
    // Click on Technique tab
    await page.locator('text=Technique').first().click();
    
    // Should show technique content
    const techniqueContent = page.locator('text=Signature Patterns');
    await expect(techniqueContent).toBeVisible({ timeout: 5000 });
    
    // Click on Gear tab
    await page.locator('text=Gear').first().click();
    
    // Should show gear content
    const gearContent = page.locator('text=Drum Kit');
    await expect(gearContent.first()).toBeVisible({ timeout: 5000 });
  });

  test('should have share buttons', async ({ page }) => {
    // Share button for Twitter/X
    const twitterShare = page.locator('text=Share').first();
    await expect(twitterShare).toBeVisible({ timeout: 5000 });
  });

  test('should have related content section', async ({ page }) => {
    // Scroll down to find related content
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Wait a bit for lazy loading
    await page.waitForTimeout(1000);
    
    const relatedContent = page.locator('text=Related Content');
    await expect(relatedContent).toBeVisible({ timeout: 5000 });
  });

  test('should have correct meta tags for SEO', async ({ page }) => {
    // Check OG title
    const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
    expect(ogTitle).toContain('Joey Jordison');
    
    // Check OG description
    const ogDescription = await page.getAttribute('meta[property="og:description"]', 'content');
    expect(ogDescription).toBeTruthy();
    expect(ogDescription.length).toBeGreaterThan(50);
    
    // Check canonical URL
    const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
    expect(canonical).toContain('/guides/how-to-sound-like-joey-jordison');
  });

  test('should have HowTo schema markup', async ({ page }) => {
    // Check for HowTo schema
    const schemaScript = await page.locator('script[data-schema="guide-howto"]').textContent();
    expect(schemaScript).toBeTruthy();
    
    const schema = JSON.parse(schemaScript);
    expect(schema['@type']).toBe('HowTo');
    expect(schema.name).toContain('Joey Jordison');
  });

  test('should have FAQ schema markup', async ({ page }) => {
    // Switch to FAQ section first to ensure it's loaded
    await page.locator('text=FAQ').first().click();
    await page.waitForTimeout(500);
    
    // Check for FAQ schema
    const schemaScript = await page.locator('script[data-schema="guide-faq"]').textContent();
    expect(schemaScript).toBeTruthy();
    
    const schema = JSON.parse(schemaScript);
    expect(schema['@type']).toBe('FAQPage');
    expect(schema.mainEntity.length).toBeGreaterThan(0);
  });

  test('should navigate back to guides hub', async ({ page }) => {
    await page.locator('text=← Back to Guides').click();
    
    // Should go back to guides hub
    await expect(page).toHaveURL('/guides');
  });
});

test.describe('Sound Like Guides - Different Drummers', () => {
  const testDrummers = [
    { slug: 'how-to-sound-like-danny-carey', name: 'Danny Carey', band: 'Tool' },
    { slug: 'how-to-sound-like-lars-ulrich', name: 'Lars Ulrich', band: 'Metallica' },
    { slug: 'how-to-sound-like-tomas-haake', name: 'Tomas Haake', band: 'Meshuggah' },
  ];

  for (const drummer of testDrummers) {
    test(`should load ${drummer.name} guide correctly`, async ({ page }) => {
      await page.goto(`/guides/${drummer.slug}`);
      await page.waitForLoadState('domcontentloaded');
      
      // Check drummer name is visible
      const drummerName = page.locator(`text=${drummer.name}`);
      await expect(drummerName.first()).toBeVisible({ timeout: 10000 });
      
      // Check band is visible
      const band = page.locator(`text=${drummer.band}`);
      await expect(band.first()).toBeVisible({ timeout: 5000 });
    });
  }
});

test.describe('Sound Like Guides - Mobile Responsiveness', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE

  test('should display correctly on mobile', async ({ page }) => {
    await page.goto('/guides');
    await page.waitForLoadState('domcontentloaded');
    
    // Hero title should be visible
    const heroTitle = page.locator('text=How to Sound Like');
    await expect(heroTitle.first()).toBeVisible({ timeout: 10000 });
    
    // Guide cards should be visible
    const joeyCard = page.locator('text=Joey Jordison');
    await expect(joeyCard.first()).toBeVisible({ timeout: 5000 });
  });

  test('should have scrollable section tabs on mobile', async ({ page }) => {
    await page.goto('/guides/how-to-sound-like-joey-jordison');
    await page.waitForLoadState('domcontentloaded');
    
    // Section tabs should be visible
    const introTab = page.locator('text=Intro').first();
    await expect(introTab).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Sound Like Guides - Analytics', () => {
  test('should track guide_view event', async ({ page }) => {
    // Capture analytics events
    const events = [];
    await page.exposeFunction('trackEvent', (event) => {
      events.push(event);
    });

    await page.addInitScript(() => {
      window.gtag = function(command, eventName, params) {
        if (command === 'event') {
          window.trackEvent({ eventName, params });
        }
      };
    });

    await page.goto('/guides/how-to-sound-like-joey-jordison');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);

    // Check if guide_view event was tracked
    const guideViewEvent = events.find(e => e.eventName === 'guide_view');
    expect(guideViewEvent).toBeTruthy();
    expect(guideViewEvent.params.guide_slug).toBe('how-to-sound-like-joey-jordison');
  });
});
