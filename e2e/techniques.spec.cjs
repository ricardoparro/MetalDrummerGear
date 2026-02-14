const { test, expect } = require('@playwright/test');

test.describe('Techniques Pages (Issue #344)', () => {
  test.describe('Techniques Index Page', () => {
    test('techniques page loads and shows all techniques', async ({ page }) => {
      await page.goto('/techniques', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      
      const title = page.locator('text=Metal Drumming Techniques');
      await expect(title).toBeVisible({ timeout: 15000 });
      
      const blastBeatCard = page.locator('text=Blast Beat').first();
      await expect(blastBeatCard).toBeVisible({ timeout: 10000 });
    });

    test('clicking a technique navigates to detail', async ({ page }) => {
      await page.goto('/techniques', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      
      await page.locator('text=Blast Beat').first().click();
      await page.waitForURL('**/techniques/blast-beat');
      
      const title = page.locator('text=Blast Beat').first();
      await expect(title).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('Technique Detail Pages', () => {
    test('blast-beat page loads with all sections', async ({ page }) => {
      await page.goto('/techniques/blast-beat', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      
      const title = page.locator('text=Blast Beat').first();
      await expect(title).toBeVisible({ timeout: 15000 });
      
      const whatIs = page.locator('text=What is Blast Beat');
      await expect(whatIs).toBeVisible({ timeout: 10000 });
      
      const history = page.locator('text=History & Origins');
      await expect(history).toBeVisible({ timeout: 5000 });
      
      const howToLearn = page.locator('text=How to Learn');
      await expect(howToLearn).toBeVisible({ timeout: 5000 });
    });

    test('back button returns to techniques list', async ({ page }) => {
      await page.goto('/techniques/blast-beat', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      
      const backButton = page.locator('text=← Back to Techniques');
      await expect(backButton).toBeVisible({ timeout: 10000 });
      await backButton.click();
      
      await page.waitForURL('**/techniques');
      
      const title = page.locator('text=Metal Drumming Techniques');
      await expect(title).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('Homepage Techniques Section', () => {
    test('homepage shows techniques section', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      
      const sectionTitle = page.locator('text=🥁 Drumming Techniques');
      await expect(sectionTitle).toBeVisible({ timeout: 15000 });
    });
  });

  test.describe('Content Quality', () => {
    test('techniques have substantial content', async ({ page }) => {
      await page.goto('/techniques/blast-beat', { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);
      
      const bodyText = await page.textContent('body');
      expect(bodyText.length).toBeGreaterThan(500);
    });
  });
});
