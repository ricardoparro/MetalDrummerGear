// @ts-check
const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://metalforge.io';

test.describe('Debug Failing Pages', () => {
  
  test('Debug Birthdays page', async ({ page }) => {
    page.on('console', msg => {
      if (msg.type() === 'error') console.log('BROWSER ERROR:', msg.text());
    });
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

    await page.goto(`${BASE_URL}/birthdays`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000); // Extra wait
    
    const body = await page.textContent('body');
    console.log('Birthdays page content length:', body?.length);
    console.log('Content preview:', body?.substring(0, 1000));
    
    await page.screenshot({ path: 'test-results/birthdays-debug.png', fullPage: true });
  });

  test('Debug Kit builder page', async ({ page }) => {
    page.on('console', msg => {
      if (msg.type() === 'error') console.log('BROWSER ERROR:', msg.text());
    });
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

    await page.goto(`${BASE_URL}/kit-builder`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000); // Extra wait
    
    const body = await page.textContent('body');
    console.log('Kit builder page content length:', body?.length);
    console.log('Content preview:', body?.substring(0, 1000));
    
    await page.screenshot({ path: 'test-results/kit-builder-debug.png', fullPage: true });
  });

  test('Debug Gear Stats page', async ({ page }) => {
    page.on('console', msg => {
      if (msg.type() === 'error') console.log('BROWSER ERROR:', msg.text());
    });
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

    await page.goto(`${BASE_URL}/gear-stats`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000);
    
    const body = await page.textContent('body');
    console.log('Gear stats page content length:', body?.length);
    console.log('Content preview:', body?.substring(0, 1000));
  });
});
