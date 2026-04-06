// @ts-check
const { test, expect } = require('@playwright/test');

test('Debug article detail loading', async ({ page }) => {
  // Listen for console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`🔴 Console Error: ${msg.text()}`);
    }
  });
  
  page.on('pageerror', err => {
    console.log(`💥 Page Error: ${err.message}`);
  });

  // Go to articles page
  await page.goto('https://metalforge.io/articles', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  console.log('📰 On articles page');
  
  // Get page content to see what's there
  const pageText = await page.textContent('body');
  console.log('Page contains "Album":', pageText?.includes('Album'));
  console.log('Page contains "Breakdown":', pageText?.includes('Breakdown'));
  
  // Look for any clickable article links
  const articleLinks = page.locator('text=/roots|reign|blood|master|puppets/i');
  const count = await articleLinks.count();
  console.log(`Found ${count} article text matches`);
  
  if (count > 0) {
    // Click first article
    console.log('Clicking first article...');
    await articleLinks.first().click();
    await page.waitForTimeout(3000);
    
    // Check URL changed
    const url = page.url();
    console.log('Current URL:', url);
    
    // Check for article content
    const articleContent = await page.textContent('body');
    console.log('Has "drum":', articleContent?.toLowerCase().includes('drum'));
    console.log('Has "gear":', articleContent?.toLowerCase().includes('gear'));
    console.log('Has "setup":', articleContent?.toLowerCase().includes('setup'));
    
    // Look for article body
    const articleBody = page.locator('article, [data-testid="article"], p');
    const bodyCount = await articleBody.count();
    console.log(`Found ${bodyCount} article/paragraph elements`);
  }
  
  // Take screenshot
  await page.screenshot({ path: 'test-results/article-detail-debug.png', fullPage: true });
  console.log('Screenshot saved');
});
