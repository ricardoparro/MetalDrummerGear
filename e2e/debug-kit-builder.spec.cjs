// @ts-check
const { test, expect } = require('@playwright/test');

test('Debug Kit builder detailed', async ({ page }) => {
  const errors = [];
  const logs = [];
  
  page.on('console', msg => {
    logs.push(`${msg.type()}: ${msg.text()}`);
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    errors.push('PAGE ERROR: ' + err.message);
  });

  console.log('Navigating to /kit-builder...');
  await page.goto('https://metalforge.io/kit-builder');
  
  // Wait for initial load
  await page.waitForLoadState('domcontentloaded');
  console.log('DOM loaded');
  
  await page.waitForTimeout(2000);
  
  // Check what we have
  const body1 = await page.textContent('body');
  console.log('After 2s - Content length:', body1?.length);
  
  // Wait more
  await page.waitForTimeout(5000);
  
  const body2 = await page.textContent('body');
  console.log('After 7s - Content length:', body2?.length);
  
  // Print any errors
  if (errors.length > 0) {
    console.log('ERRORS FOUND:');
    errors.forEach(e => console.log('  -', e));
  }
  
  // Print last 20 console logs
  console.log('\nRecent console logs:');
  logs.slice(-20).forEach(l => console.log('  ', l));
  
  // Check if there's a loading indicator
  const hasLoading = body2?.includes('Loading');
  console.log('Has loading state:', hasLoading);
  
  // Check for kit builder content
  const hasKitBuilder = body2?.includes('Kit Builder') || body2?.includes('kit-builder') || body2?.includes('Build Your');
  console.log('Has kit builder content:', hasKitBuilder);
  
  // Print body preview
  console.log('\nBody preview:', body2?.substring(0, 500));
  
  await page.screenshot({ path: 'test-results/kit-builder-detailed.png', fullPage: true });
});
