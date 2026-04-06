// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Article Navigation', () => {
  test('clicking article from /articles page should navigate', async ({ page }) => {
    // Go to articles index
    await page.goto('https://metalforge.io/articles');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Take screenshot before click
    await page.screenshot({ path: 'test-results/before-click.png' });
    
    // Wait for articles to load
    await page.waitForSelector('text=Iconic Album Gear Breakdowns', { timeout: 10000 });
    
    // Find and click the first article
    const firstArticle = page.locator('[role="link"]').filter({ hasText: 'Setup' }).first();
    const articleText = await firstArticle.textContent();
    console.log('Clicking article:', articleText);
    
    // Get current URL
    const urlBefore = page.url();
    console.log('URL before click:', urlBefore);
    
    await firstArticle.click();
    
    // Wait for navigation
    await page.waitForTimeout(2000);
    
    // Get URL after click
    const urlAfter = page.url();
    console.log('URL after click:', urlAfter);
    
    // Take screenshot after click
    await page.screenshot({ path: 'test-results/after-click.png' });
    
    // Check that URL changed
    expect(urlAfter).not.toBe(urlBefore);
    expect(urlAfter).toContain('/articles/');
    
    // Check that content loaded
    const pageContent = await page.textContent('body');
    console.log('Page has content:', pageContent?.length > 1000);
  });
});
