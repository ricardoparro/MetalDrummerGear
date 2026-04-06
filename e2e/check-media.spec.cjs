// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Media Verification', () => {
  
  test('Check homepage images load', async ({ page }) => {
    const failedImages = [];
    
    page.on('response', response => {
      if (response.request().resourceType() === 'image' && !response.ok()) {
        failedImages.push({
          url: response.url(),
          status: response.status()
        });
      }
    });
    
    await page.goto('https://metalforge.io', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    
    console.log('Failed images:', failedImages.length);
    failedImages.forEach(img => console.log(`  ❌ ${img.url} (${img.status})`));
    
    expect(failedImages.length).toBeLessThan(3); // Allow some failures
  });

  test('Check drummer page images and videos', async ({ page }) => {
    const failedResources = [];
    
    page.on('response', response => {
      const type = response.request().resourceType();
      if ((type === 'image' || type === 'media') && !response.ok()) {
        failedResources.push({
          url: response.url(),
          status: response.status(),
          type: type
        });
      }
    });
    
    await page.goto('https://metalforge.io/drummer/lars-ulrich', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    
    console.log('Lars Ulrich page - Failed resources:', failedResources.length);
    failedResources.forEach(r => console.log(`  ❌ ${r.type}: ${r.url} (${r.status})`));
    
    // Check for YouTube embeds
    const iframes = page.locator('iframe[src*="youtube"]');
    const iframeCount = await iframes.count();
    console.log('YouTube embeds found:', iframeCount);
  });

  test('Check API responses', async ({ page }) => {
    const apis = [
      '/api/gear/popular',
      '/api/news',
      '/api/drummers',
      '/api/quotes'
    ];
    
    for (const api of apis) {
      const response = await page.request.get(`https://metalforge.io${api}`);
      console.log(`${api}: ${response.status()}`);
      expect(response.ok()).toBeTruthy();
    }
  });
});
