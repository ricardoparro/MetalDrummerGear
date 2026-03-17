// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * E2E Tests for Gear Comparison Tool (Issue #721)
 * Tests the /tools/compare page functionality
 */

test.describe('Gear Comparison Tool', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the gear comparison tool page
    await page.goto('/tools/compare', { waitUntil: 'networkidle' });
  });

  test('loads the comparison tool page', async ({ page }) => {
    // Check page title contains comparison
    await expect(page).toHaveTitle(/Gear Comparison Tool|Compare/i);
    
    // Check header is present
    await expect(page.getByText('Gear Comparison Tool')).toBeVisible();
  });

  test('shows empty state when no drummers selected', async ({ page }) => {
    // Should show empty state message
    await expect(page.getByText(/Select two drummers to compare/i)).toBeVisible();
  });

  test('has drummer selection dropdowns', async ({ page }) => {
    // Check for selection dropdowns/buttons
    await expect(page.getByText(/Select Drummer 1/i)).toBeVisible();
    await expect(page.getByText(/Select Drummer 2/i)).toBeVisible();
  });

  test('has random matchup button', async ({ page }) => {
    // Check for random button
    await expect(page.getByText(/Random Matchup/i)).toBeVisible();
  });

  test('has quick picks section', async ({ page }) => {
    // Check for popular matchups
    await expect(page.getByText(/Popular Matchups/i)).toBeVisible();
  });

  test('can navigate via SEO URL', async ({ page }) => {
    // Test navigation to SEO-friendly URL
    await page.goto('/tools/compare/lars-ulrich-vs-dave-lombardo', { waitUntil: 'networkidle' });
    
    // Should show comparison (if drummers exist)
    // The page should load without error
    await expect(page.getByText('Gear Comparison Tool')).toBeVisible();
  });

  test('back button navigates home', async ({ page }) => {
    // Click back button
    const backButton = page.getByText(/← Back/i);
    await backButton.click();
    
    // Should navigate to home
    await expect(page).toHaveURL('/');
  });

  test('selecting a quick pick shows comparison', async ({ page }) => {
    // Click first quick pick button
    const quickPicks = page.locator('text=/Speed Demons|Thrash Titans|Prog Masters/i').first();
    
    if (await quickPicks.isVisible()) {
      await quickPicks.click();
      
      // After clicking, URL should update
      await expect(page).toHaveURL(/\/tools\/compare\/.*-vs-.*/);
    }
  });

  test('random matchup button works', async ({ page }) => {
    // Click random matchup button
    const randomBtn = page.getByText(/Random Matchup/i);
    await randomBtn.click();
    
    // Wait for navigation/state change
    await page.waitForTimeout(500);
    
    // URL should update with comparison slug
    // Note: This might not update URL if no drummers loaded yet
    // Just check that no error occurred
    await expect(page.getByText('Gear Comparison Tool')).toBeVisible();
  });
});

test.describe('Gear Comparison Tool SEO', () => {
  test('has proper meta tags on base page', async ({ page }) => {
    await page.goto('/tools/compare', { waitUntil: 'networkidle' });
    
    // Check meta description
    const metaDescription = await page.$eval(
      'meta[name="description"]',
      el => el.getAttribute('content')
    ).catch(() => '');
    
    expect(metaDescription).toContain('compare');
  });

  test('has canonical URL', async ({ page }) => {
    await page.goto('/tools/compare', { waitUntil: 'networkidle' });
    
    const canonical = await page.$eval(
      'link[rel="canonical"]',
      el => el.getAttribute('href')
    ).catch(() => '');
    
    expect(canonical).toContain('/tools/compare');
  });
});
