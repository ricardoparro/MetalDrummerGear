// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Debug Article Navigation', () => {
  test('debug article click', async ({ page }) => {
    // Listen for console logs
    page.on('console', msg => {
      console.log('BROWSER:', msg.type(), msg.text());
    });
    
    // Listen for errors
    page.on('pageerror', err => {
      console.log('PAGE ERROR:', err.message);
    });

    // Go to articles index
    console.log('Navigating to /articles...');
    await page.goto('https://metalforge.io/articles');
    await page.waitForLoadState('networkidle');
    
    // Check what's on the page
    const body1 = await page.textContent('body');
    console.log('Page content length before click:', body1?.length);
    console.log('Has articles section:', body1?.includes('Iconic Album'));
    
    // Wait for articles to load
    try {
      await page.waitForSelector('text=Iconic Album Gear Breakdowns', { timeout: 15000 });
      console.log('Found articles section!');
    } catch (e) {
      console.log('ERROR: Articles section not found');
      console.log('Body content:', body1?.substring(0, 500));
      return;
    }
    
    // Click first article
    const firstArticle = page.locator('[role="link"]').filter({ hasText: 'Master of Puppets' }).first();
    console.log('Clicking article...');
    await firstArticle.click();
    
    // Wait for any navigation/state change
    await page.waitForTimeout(3000);
    
    const urlAfter = page.url();
    console.log('URL after click:', urlAfter);
    
    // Check content
    const body2 = await page.textContent('body');
    console.log('Page content length after click:', body2?.length);
    console.log('Has drummer name:', body2?.includes('Lars Ulrich'));
    console.log('Has album title:', body2?.includes('Master of Puppets'));
    console.log('Has drum kit section:', body2?.includes('Drum Kit') || body2?.includes('drum kit'));
    
    // Screenshot
    await page.screenshot({ path: 'test-results/debug-after-click.png', fullPage: true });
    
    // Check for any loading states
    const loadingElements = await page.locator('text=Loading').all();
    console.log('Loading elements found:', loadingElements.length);
    
    // Check if there's any error message
    const errorElements = await page.locator('text=Error').all();
    console.log('Error elements found:', errorElements.length);
    
    // Print first 1000 chars
    console.log('Body content preview:', body2?.substring(0, 1000));
  });
});
