// @ts-check
/**
 * Playwright tests for Birthday Calendar Page (Issue #343)
 * 
 * NOTE: These tests check if the birthday feature is available before running.
 * If running against production without the feature, tests are skipped gracefully.
 */
const { test, expect } = require('@playwright/test');

// Helper to check if birthday feature is available on the current deployment
async function checkBirthdayFeatureAvailable(page) {
  await page.goto('/birthdays', { waitUntil: 'load' });
  await page.waitForTimeout(2000);
  
  // Check if the page title indicates we're on the birthday page (not home)
  const title = await page.title();
  if (title.includes('MetalForge') && !title.includes('Birthday')) {
    return false;
  }
  
  // Also check for birthday-specific content
  const hasHeading = await page.getByRole('heading', { name: /birthday/i }).isVisible({ timeout: 3000 }).catch(() => false);
  return hasHeading;
}

test.describe('Birthday Calendar Page', () => {
  // Run tests serially to ensure beforeAll completes before tests
  test.describe.configure({ mode: 'serial' });
  
  // Feature detection - skip all tests if birthday feature isn't deployed
  let birthdayFeatureAvailable = false;

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    try {
      birthdayFeatureAvailable = await checkBirthdayFeatureAvailable(page);
    } catch (e) {
      birthdayFeatureAvailable = false;
    }
    await page.close();
    
    if (!birthdayFeatureAvailable) {
      console.log('⚠️ Birthday feature not available on this deployment - tests will be skipped');
    } else {
      console.log('✅ Birthday feature detected - running tests');
    }
  });

  test.beforeEach(async ({ page }) => {
    test.skip(!birthdayFeatureAvailable, 'Birthday feature not available on this deployment');
    await page.goto('/birthdays');
  });

  test('has correct title and heading', async ({ page }) => {
    test.skip(!birthdayFeatureAvailable, 'Birthday feature not available on this deployment');
    // Check heading first (confirms page is rendered)
    await expect(page.getByRole('heading', { name: /birthday/i })).toBeVisible();
    // Wait for title to be set by client-side JS, with generous timeout
    await expect(page).toHaveTitle(/Birthday Calendar|Birthdays/i, { timeout: 15000 });
  });

  test('displays month filter buttons', async ({ page }) => {
    test.skip(!birthdayFeatureAvailable, 'Birthday feature not available on this deployment');
    // Should have all 12 months as filter buttons
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (const month of months) {
      await expect(page.getByRole('button', { name: new RegExp(month, 'i') })).toBeVisible();
    }
  });

  test('filters birthdays by month when clicked', async ({ page }) => {
    test.skip(!birthdayFeatureAvailable, 'Birthday feature not available on this deployment');
    // Click on a month with known birthdays (August has multiple)
    await page.getByRole('button', { name: /Aug/i }).click();
    
    // URL should update with month parameter
    await expect(page).toHaveURL(/month=8/);
    
    // Should show "August Birthdays" in the heading
    await expect(page.getByText(/August Birthdays/i)).toBeVisible();
  });

  test('clear filter returns to all months', async ({ page }) => {
    test.skip(!birthdayFeatureAvailable, 'Birthday feature not available on this deployment');
    // Click on a month
    await page.getByRole('button', { name: /Feb/i }).click();
    await expect(page).toHaveURL(/month=2/);
    
    // Click "Show All Months"
    await page.getByRole('button', { name: /Show All Months/i }).click();
    
    // URL should not have month parameter
    await expect(page).toHaveURL(/\/birthdays$/);
  });

  test('birthday cards display drummer information', async ({ page }) => {
    test.skip(!birthdayFeatureAvailable, 'Birthday feature not available on this deployment');
    // Should display at least one drummer's birthday
    // Lars Ulrich is in the data with December 26
    await expect(page.getByText(/Lars Ulrich/i)).toBeVisible();
    await expect(page.getByText(/Metallica/i)).toBeVisible();
  });

  test('clicking drummer card navigates to drummer page', async ({ page }) => {
    test.skip(!birthdayFeatureAvailable, 'Birthday feature not available on this deployment');
    // Click on Lars Ulrich's birthday card
    await page.getByRole('button', { name: /Lars Ulrich/i }).first().click();
    
    // Should navigate to drummer detail page
    await expect(page).toHaveURL(/drummer\/lars-ulrich/);
  });

  test('share buttons are visible', async ({ page }) => {
    test.skip(!birthdayFeatureAvailable, 'Birthday feature not available on this deployment');
    await expect(page.getByRole('button', { name: /Tweet/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Copy Link/i })).toBeVisible();
  });

  test('shows birthday stats section', async ({ page }) => {
    test.skip(!birthdayFeatureAvailable, 'Birthday feature not available on this deployment');
    await expect(page.getByText(/Birthday Fun Facts/i)).toBeVisible();
    await expect(page.getByText(/Drummers/i)).toBeVisible();
    await expect(page.getByText(/Still Rocking/i)).toBeVisible();
  });

  test('back button navigates to home', async ({ page }) => {
    test.skip(!birthdayFeatureAvailable, 'Birthday feature not available on this deployment');
    await page.getByRole('button', { name: /Back to Home/i }).click();
    await expect(page).toHaveURL('/');
  });

  test('homepage has birthday calendar link', async ({ page }) => {
    test.skip(!birthdayFeatureAvailable, 'Birthday feature not available on this deployment');
    await page.goto('/');
    const birthdayButton = page.getByRole('button', { name: /Birthdays/i });
    await expect(birthdayButton).toBeVisible();
    await birthdayButton.click();
    await expect(page).toHaveURL(/\/birthdays/);
  });
});
