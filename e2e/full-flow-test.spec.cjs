// @ts-check
const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://metalforge.io';

test.describe('MetalForge Full Flow Tests', () => {
  
  test('Homepage loads correctly', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    
    const title = await page.title();
    console.log('Homepage title:', title);
    expect(title).toContain('MetalForge');
    
    // Check for main elements
    const drummerCount = await page.locator('[role="link"]').filter({ hasText: /drummer/i }).count();
    console.log('Found drummer links:', drummerCount);
  });

  test('Drummer detail page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/drummer/lars-ulrich`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const body = await page.textContent('body');
    console.log('Has Lars Ulrich:', body?.includes('Lars Ulrich'));
    console.log('Has Metallica:', body?.includes('Metallica'));
    expect(body).toContain('Lars Ulrich');
  });

  test('Compare page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/compare`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const body = await page.textContent('body');
    console.log('Compare page has content:', body?.length);
    expect(body?.length).toBeGreaterThan(500);
  });

  test('Quiz page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/quiz`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const body = await page.textContent('body');
    console.log('Quiz page has content:', body?.includes('quiz') || body?.includes('Quiz'));
    expect(body?.toLowerCase()).toContain('quiz');
  });

  test('History/Timeline page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/history`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    const body = await page.textContent('body');
    console.log('History page content length:', body?.length);
    console.log('Has error:', body?.includes('Error') || body?.includes('error'));
    
    // Should not have React error
    expect(body).not.toContain('Rendered fewer hooks');
    expect(body?.length).toBeGreaterThan(500);
  });

  test('Tools page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/tools`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const body = await page.textContent('body');
    console.log('Tools page has content:', body?.length);
    expect(body?.length).toBeGreaterThan(500);
  });

  test('Articles index page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/articles`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    const body = await page.textContent('body');
    console.log('Articles page has content:', body?.length);
    console.log('Has album breakdowns:', body?.includes('Album') || body?.includes('Gear'));
    expect(body?.length).toBeGreaterThan(500);
  });

  test('Genres page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/genres`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const body = await page.textContent('body');
    console.log('Genres page has content:', body?.length);
    expect(body?.length).toBeGreaterThan(500);
  });

  test('News page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/news`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const body = await page.textContent('body');
    console.log('News page has content:', body?.length);
    expect(body?.length).toBeGreaterThan(500);
  });

  test('BPM tap page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/bpm`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const body = await page.textContent('body');
    console.log('BPM page has content:', body?.includes('BPM') || body?.includes('Tap'));
    expect(body?.toLowerCase()).toMatch(/bpm|tap/);
  });

  test('Birthdays page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/birthdays`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const body = await page.textContent('body');
    console.log('Birthdays page has content:', body?.length);
    expect(body?.length).toBeGreaterThan(500);
  });

  test('Kit builder page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/kit-builder`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const body = await page.textContent('body');
    console.log('Kit builder page has content:', body?.length);
    expect(body?.length).toBeGreaterThan(500);
  });

  test('Gear finder page loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/gear-finder`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const body = await page.textContent('body');
    console.log('Gear finder page has content:', body?.length);
    expect(body?.length).toBeGreaterThan(500);
  });
});
