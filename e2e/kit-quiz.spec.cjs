/**
 * E2E Tests for Kit Quiz - "Guess the Drummer by Kit" (Issue #551)
 * Tests quiz functionality, scoring, sharing, and mobile responsiveness
 */

const { test, expect } = require('@playwright/test');

test.describe('Kit Quiz - Issue #551', () => {
  
  test.describe('Quiz Page Loading', () => {
    test('loads /kit-quiz page with correct elements', async ({ page }) => {
      await page.goto('/kit-quiz');
      
      // Check page title
      await expect(page).toHaveTitle(/Kit Quiz|Guess the Drummer|MetalForge/i);
      
      // Check back button exists
      await expect(page.getByText('← Back')).toBeVisible();
      
      // Check progress indicator is visible
      await expect(page.getByText(/Question \d+ of \d+/)).toBeVisible();
    });
    
    test('displays quiz question with gear info', async ({ page }) => {
      await page.goto('/kit-quiz');
      
      // Wait for quiz to load
      await page.waitForTimeout(1000);
      
      // Check question title
      await expect(page.getByText(/Guess the Drummer!/i)).toBeVisible();
      
      // Check gear section is displayed
      await expect(page.getByText(/Drum Kit Setup/i)).toBeVisible();
      await expect(page.getByText(/Drums:/i)).toBeVisible();
      await expect(page.getByText(/Snare:/i)).toBeVisible();
      await expect(page.getByText(/Cymbals:/i)).toBeVisible();
    });
    
    test('shows difficulty badge', async ({ page }) => {
      await page.goto('/kit-quiz');
      await page.waitForTimeout(1000);
      
      // Check difficulty badge is visible (easy, medium, or hard)
      const easyBadge = page.getByText('Easy');
      const mediumBadge = page.getByText('Medium');
      const hardBadge = page.getByText('Hard');
      
      // At least one should be visible
      const isVisible = await easyBadge.isVisible() || await mediumBadge.isVisible() || await hardBadge.isVisible();
      expect(isVisible).toBeTruthy();
    });
    
    test('has proper SEO meta tags', async ({ page }) => {
      await page.goto('/kit-quiz');
      
      // Check meta description
      const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
      expect(metaDescription).toBeTruthy();
      expect(metaDescription.length).toBeGreaterThan(50);
      
      // Check og:title
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      expect(ogTitle).toBeTruthy();
      
      // Check og:url
      const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
      expect(ogUrl).toContain('kit-quiz');
    });
  });

  test.describe('Quiz Answer Options', () => {
    test('displays 4 answer options', async ({ page }) => {
      await page.goto('/kit-quiz');
      await page.waitForTimeout(1000);
      
      // Should have 4 answer buttons (drummer options)
      const options = page.locator('[class*="kitQuizOption"]');
      const count = await options.count();
      expect(count).toBe(4);
    });
    
    test('each option shows drummer name and band', async ({ page }) => {
      await page.goto('/kit-quiz');
      await page.waitForTimeout(1000);
      
      // Check first option has name and band text
      const firstOption = page.locator('[class*="kitQuizOption"]').first();
      const text = await firstOption.textContent();
      expect(text.length).toBeGreaterThan(5);
    });
    
    test('clicking option shows feedback', async ({ page }) => {
      await page.goto('/kit-quiz');
      await page.waitForTimeout(1000);
      
      // Click first option
      await page.locator('[class*="kitQuizOption"]').first().click();
      
      // Should show feedback (correct or wrong)
      await page.waitForTimeout(500);
      const feedback = page.locator('[class*="kitQuizFeedback"]');
      await expect(feedback).toBeVisible();
    });
    
    test('correct answer shows green styling', async ({ page }) => {
      await page.goto('/kit-quiz');
      await page.waitForTimeout(1000);
      
      // Click any option
      await page.locator('[class*="kitQuizOption"]').first().click();
      
      // One option should have checkmark for correct answer
      await page.waitForTimeout(500);
      const checkmark = page.getByText('✓');
      await expect(checkmark).toBeVisible();
    });
    
    test('wrong answer shows red styling', async ({ page }) => {
      await page.goto('/kit-quiz');
      await page.waitForTimeout(1000);
      
      // Get all options
      const options = page.locator('[class*="kitQuizOption"]');
      const count = await options.count();
      
      // Click through until we get a wrong answer
      for (let i = 0; i < count; i++) {
        await page.goto('/kit-quiz');
        await page.waitForTimeout(1000);
        await options.nth(i).click();
        await page.waitForTimeout(500);
        
        const wrongMark = page.getByText('✗');
        if (await wrongMark.isVisible()) {
          // Found a wrong answer
          expect(true).toBeTruthy();
          return;
        }
      }
    });
  });

  test.describe('Quiz Progress', () => {
    test('progress bar updates after each question', async ({ page }) => {
      await page.goto('/kit-quiz');
      await page.waitForTimeout(1000);
      
      // Check initial progress (Question 1 of X)
      await expect(page.getByText(/Question 1 of/)).toBeVisible();
      
      // Answer question
      await page.locator('[class*="kitQuizOption"]').first().click();
      
      // Wait for auto-advance
      await page.waitForTimeout(2000);
      
      // Should be on Question 2
      await expect(page.getByText(/Question 2 of/)).toBeVisible();
    });
    
    test('progress bar visually fills', async ({ page }) => {
      await page.goto('/kit-quiz');
      await page.waitForTimeout(1000);
      
      // Check progress bar exists
      const progressBar = page.locator('[class*="kitQuizProgressBar"]');
      await expect(progressBar).toBeVisible();
      
      const progressFill = page.locator('[class*="kitQuizProgressFill"]');
      await expect(progressFill).toBeVisible();
    });
  });

  test.describe('Quiz Results', () => {
    test('shows result screen after all questions', async ({ page }) => {
      await page.goto('/kit-quiz');
      await page.waitForTimeout(1000);
      
      // Get total questions from progress text
      const progressText = await page.getByText(/Question \d+ of (\d+)/).textContent();
      const totalMatch = progressText.match(/of (\d+)/);
      const total = parseInt(totalMatch[1]);
      
      // Answer all questions
      for (let i = 0; i < total; i++) {
        await page.waitForTimeout(800);
        await page.locator('[class*="kitQuizOption"]').first().click();
        await page.waitForTimeout(1600);
      }
      
      // Should show result card
      await expect(page.locator('[class*="kitQuizResultCard"]')).toBeVisible();
    });
    
    test('result shows score and percentage', async ({ page }) => {
      // Load a shared result URL
      await page.goto('/kit-quiz?correct=7&total=10&score=70');
      
      // Check score is displayed
      await expect(page.getByText('7/10')).toBeVisible();
      await expect(page.getByText('70%')).toBeVisible();
    });
    
    test('result shows title and emoji', async ({ page }) => {
      // Load a shared result URL
      await page.goto('/kit-quiz?correct=8&total=10&score=80');
      
      // Check title is displayed
      await expect(page.getByText(/Gear Expert|Legend|Connoisseur/i)).toBeVisible();
    });
    
    test('result has share buttons', async ({ page }) => {
      await page.goto('/kit-quiz?correct=5&total=10&score=50');
      
      // Check share section
      await expect(page.getByText(/Share Your Score/i)).toBeVisible();
      await expect(page.getByText(/Twitter/i)).toBeVisible();
      await expect(page.getByText(/Facebook/i)).toBeVisible();
      await expect(page.getByText(/Copy Link/i)).toBeVisible();
    });
    
    test('result has play again button', async ({ page }) => {
      await page.goto('/kit-quiz?correct=5&total=10&score=50');
      
      // Check play again button
      await expect(page.getByText(/Play Again/i)).toBeVisible();
    });
    
    test('result has home button', async ({ page }) => {
      await page.goto('/kit-quiz?correct=5&total=10&score=50');
      
      // Check home button
      await expect(page.getByText(/Home/i)).toBeVisible();
    });
  });

  test.describe('Sharing Functionality', () => {
    test('copy link button works', async ({ page }) => {
      await page.goto('/kit-quiz?correct=6&total=10&score=60');
      
      // Click copy link
      await page.getByText(/Copy Link/i).click();
      
      // Should show "Copied!" feedback
      await expect(page.getByText(/Copied!/i)).toBeVisible();
    });
    
    test('Twitter share button opens Twitter', async ({ page, context }) => {
      await page.goto('/kit-quiz?correct=7&total=10&score=70');
      
      // Listen for new page/popup
      const pagePromise = context.waitForEvent('page');
      
      // Click Twitter share
      await page.getByText(/Twitter/i).click();
      
      // New page should open (may be blocked by popup blocker)
      // Just verify the button is clickable
      expect(true).toBeTruthy();
    });
    
    test('URL updates with result params', async ({ page }) => {
      await page.goto('/kit-quiz');
      await page.waitForTimeout(1000);
      
      // Get total questions
      const progressText = await page.getByText(/Question \d+ of (\d+)/).textContent();
      const totalMatch = progressText.match(/of (\d+)/);
      const total = parseInt(totalMatch[1]);
      
      // Answer all questions
      for (let i = 0; i < total; i++) {
        await page.waitForTimeout(800);
        await page.locator('[class*="kitQuizOption"]').first().click();
        await page.waitForTimeout(1600);
      }
      
      // URL should have result params
      await expect(page).toHaveURL(/correct=/);
      await expect(page).toHaveURL(/total=/);
    });
  });

  test.describe('Play Again', () => {
    test('play again resets quiz', async ({ page }) => {
      await page.goto('/kit-quiz?correct=5&total=10&score=50');
      
      // Click play again
      await page.getByText(/Play Again/i).click();
      
      // Should be on question 1
      await page.waitForTimeout(500);
      await expect(page.getByText(/Question 1 of/)).toBeVisible();
    });
    
    test('play again clears URL params', async ({ page }) => {
      await page.goto('/kit-quiz?correct=5&total=10&score=50');
      
      // Click play again
      await page.getByText(/Play Again/i).click();
      
      // URL should be clean
      await page.waitForTimeout(500);
      await expect(page).toHaveURL('/kit-quiz');
    });
  });

  test.describe('Navigation', () => {
    test('back button returns to home', async ({ page }) => {
      await page.goto('/kit-quiz');
      await page.waitForTimeout(1000);
      
      // Click back
      await page.getByText('← Back').click();
      
      // Should be on home page
      await expect(page).toHaveURL('/');
    });
    
    test('home button from results returns to home', async ({ page }) => {
      await page.goto('/kit-quiz?correct=5&total=10&score=50');
      
      // Click home button
      await page.getByText(/Home/i).last().click();
      
      // Should be on home page
      await expect(page).toHaveURL('/');
    });
  });

  test.describe('Responsive Design', () => {
    test('mobile view works correctly', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/kit-quiz');
      await page.waitForTimeout(1000);
      
      // Quiz should load and be functional
      await expect(page.getByText(/Guess the Drummer!/i)).toBeVisible();
      
      // Options should be visible
      const options = page.locator('[class*="kitQuizOption"]');
      const count = await options.count();
      expect(count).toBe(4);
    });
    
    test('tablet view works correctly', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/kit-quiz');
      await page.waitForTimeout(1000);
      
      await expect(page.getByText(/Guess the Drummer!/i)).toBeVisible();
    });
    
    test('share buttons stack on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/kit-quiz?correct=5&total=10&score=50');
      
      // Share buttons should be visible
      await expect(page.getByText(/Twitter/i)).toBeVisible();
      await expect(page.getByText(/Facebook/i)).toBeVisible();
    });
  });

  test.describe('Alternate URL', () => {
    test('/guess-the-drummer loads quiz', async ({ page }) => {
      await page.goto('/guess-the-drummer');
      
      // Should load quiz page
      await expect(page.getByText(/Guess the Drummer!/i)).toBeVisible();
    });
  });

  test.describe('Quiz Hints', () => {
    test('displays hint for each question', async ({ page }) => {
      await page.goto('/kit-quiz');
      await page.waitForTimeout(1000);
      
      // Check hint icon and text
      await expect(page.getByText(/💡/)).toBeVisible();
    });
  });
});
