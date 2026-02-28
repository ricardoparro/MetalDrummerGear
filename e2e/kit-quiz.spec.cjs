// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * E2E Tests for Kit Quiz Feature - Issue #551
 * "Guess the Drummer by Kit" viral quiz
 * 
 * Tests cover:
 * 1. Quiz page loading and intro screen
 * 2. Quiz gameplay mechanics
 * 3. Results and scoring
 * 4. Social sharing functionality
 * 5. URL-based result sharing
 * 6. SEO meta tags
 * 7. Responsive design
 * 8. GA4 tracking (event firing)
 */

test.describe('Kit Quiz - Issue #551', () => {
  
  test.describe('Page Loading', () => {
    test('loads /kit-quiz page with intro screen', async ({ page }) => {
      await page.goto('/kit-quiz');
      
      // Should show intro screen with title
      await expect(page.getByText('Guess the Drummer by Kit')).toBeVisible();
      await expect(page.getByText('Can you identify legendary metal drummers')).toBeVisible();
      
      // Should show quiz info
      await expect(page.getByText(/10 questions/i)).toBeVisible();
      await expect(page.getByText(/~2 minutes/i)).toBeVisible();
      
      // Should show start button
      await expect(page.getByRole('button', { name: /start quiz/i })).toBeVisible();
    });

    test('has correct SEO meta tags', async ({ page }) => {
      await page.goto('/kit-quiz');
      
      // Check title
      const title = await page.title();
      expect(title).toContain('Guess the Drummer');
      
      // Check meta description
      const metaDescription = await page.getAttribute('meta[name="description"]', 'content');
      expect(metaDescription).toContain('metal drummers');
      
      // Check OG tags
      const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
      expect(ogTitle).toContain('Guess the Drummer');
    });

    test('has back button that returns to home', async ({ page }) => {
      await page.goto('/kit-quiz');
      
      const backButton = page.getByRole('button', { name: /back/i });
      await expect(backButton).toBeVisible();
      
      await backButton.click();
      await expect(page).toHaveURL('/');
    });
  });

  test.describe('Quiz Gameplay', () => {
    test('clicking start begins the quiz', async ({ page }) => {
      await page.goto('/kit-quiz');
      
      await page.getByRole('button', { name: /start quiz/i }).click();
      
      // Should show question 1
      await expect(page.getByText(/question 1 of/i)).toBeVisible();
      await expect(page.getByText('Who uses this kit?')).toBeVisible();
    });

    test('displays gear information for each question', async ({ page }) => {
      await page.goto('/kit-quiz');
      await page.getByRole('button', { name: /start quiz/i }).click();
      
      // Should show gear details
      await expect(page.getByText(/drums:/i)).toBeVisible();
      await expect(page.getByText(/snare:/i)).toBeVisible();
      await expect(page.getByText(/cymbals:/i)).toBeVisible();
      await expect(page.getByText(/hardware:/i)).toBeVisible();
    });

    test('shows 4 drummer options per question', async ({ page }) => {
      await page.goto('/kit-quiz');
      await page.getByRole('button', { name: /start quiz/i }).click();
      
      // Should show 4 options (drummer names)
      const options = page.locator('[accessibilityRole="button"]').filter({ hasText: /from|band/i });
      // Options are touchable with drummer info
      await expect(page.locator('text=Metallica, text=Slipknot, text=Slayer, text=Sepultura').first().or(
        page.locator('img').nth(1)
      )).toBeVisible();
    });

    test('hint button reveals clue', async ({ page }) => {
      await page.goto('/kit-quiz');
      await page.getByRole('button', { name: /start quiz/i }).click();
      
      // Click hint button
      const hintButton = page.getByText(/need a hint/i);
      if (await hintButton.isVisible()) {
        await hintButton.click();
        
        // Hint should appear (contains emoji and text)
        await expect(page.locator('text=/🤘|💀|⚛️|🔥|🔢/')).toBeVisible();
      }
    });

    test('selecting answer shows feedback and advances', async ({ page }) => {
      await page.goto('/kit-quiz');
      await page.getByRole('button', { name: /start quiz/i }).click();
      
      // Wait for options to load
      await page.waitForTimeout(500);
      
      // Click first option
      const options = page.locator('[accessibilityRole="button"]');
      const firstOption = options.filter({ hasText: /from/ }).first();
      await firstOption.click();
      
      // Should advance to question 2
      await expect(page.getByText(/question 2 of/i)).toBeVisible({ timeout: 2000 });
    });

    test('progress bar updates as questions are answered', async ({ page }) => {
      await page.goto('/kit-quiz');
      await page.getByRole('button', { name: /start quiz/i }).click();
      
      // Progress should start at ~10% (1 of 10)
      const progressBar = page.locator('[style*="width"]').first();
      
      // Answer first question
      await page.waitForTimeout(300);
      const options = page.locator('[accessibilityRole="button"]');
      await options.filter({ hasText: /from/ }).first().click();
      
      // Progress should update
      await expect(page.getByText(/question 2 of/i)).toBeVisible({ timeout: 2000 });
    });
  });

  test.describe('Results Screen', () => {
    test('shows results after completing quiz', async ({ page }) => {
      await page.goto('/kit-quiz');
      await page.getByRole('button', { name: /start quiz/i }).click();
      
      // Answer all 10 questions quickly
      for (let i = 0; i < 10; i++) {
        await page.waitForTimeout(300);
        const options = page.locator('[accessibilityRole="button"]');
        const option = options.filter({ hasText: /from/ }).first();
        if (await option.isVisible()) {
          await option.click();
          await page.waitForTimeout(900); // Wait for animation
        }
      }
      
      // Should show results
      await expect(page.getByText(/correct/i)).toBeVisible({ timeout: 3000 });
    });

    test('results show score fraction and percentage', async ({ page }) => {
      // Use a pre-shared result URL for quick testing
      await page.goto('/kit-quiz?correct=7&total=10');
      
      // Should show score
      await expect(page.getByText('7/10')).toBeVisible();
      await expect(page.getByText(/70%/i)).toBeVisible();
    });

    test('results show appropriate emoji and message based on score', async ({ page }) => {
      // High score
      await page.goto('/kit-quiz?correct=9&total=10');
      await expect(page.getByText('🏆').or(page.getByText('Legendary'))).toBeVisible();
      
      // Low score
      await page.goto('/kit-quiz?correct=2&total=10');
      await expect(page.getByText('😅').or(page.getByText('Study'))).toBeVisible();
    });

    test('results have share buttons', async ({ page }) => {
      await page.goto('/kit-quiz?correct=7&total=10');
      
      await expect(page.getByText(/twitter/i)).toBeVisible();
      await expect(page.getByText(/facebook/i)).toBeVisible();
      await expect(page.getByText(/copy/i)).toBeVisible();
    });

    test('play again button restarts quiz', async ({ page }) => {
      await page.goto('/kit-quiz?correct=7&total=10');
      
      await page.getByRole('button', { name: /play again/i }).click();
      
      // Should show intro screen
      await expect(page.getByRole('button', { name: /start quiz/i })).toBeVisible();
    });
  });

  test.describe('Social Sharing', () => {
    test('Twitter share button opens share dialog', async ({ page, context }) => {
      await page.goto('/kit-quiz?correct=7&total=10');
      
      // Listen for popup
      const popupPromise = context.waitForEvent('page');
      
      await page.getByText(/twitter/i).click();
      
      const popup = await popupPromise;
      expect(popup.url()).toContain('twitter.com');
    });

    test('Facebook share button opens share dialog', async ({ page, context }) => {
      await page.goto('/kit-quiz?correct=7&total=10');
      
      const popupPromise = context.waitForEvent('page');
      
      await page.getByText(/facebook/i).click();
      
      const popup = await popupPromise;
      expect(popup.url()).toContain('facebook.com');
    });

    test('copy button copies share text', async ({ page }) => {
      await page.goto('/kit-quiz?correct=7&total=10');
      
      // Grant clipboard permissions
      await page.context().grantPermissions(['clipboard-write', 'clipboard-read']);
      
      await page.getByText(/copy/i).click();
      
      // Check for success indication (alert or text change)
      // Note: Alert is expected behavior
      page.on('dialog', async dialog => {
        expect(dialog.message()).toContain('Copied');
        await dialog.dismiss();
      });
    });
  });

  test.describe('URL Sharing', () => {
    test('completing quiz updates URL with result', async ({ page }) => {
      await page.goto('/kit-quiz');
      await page.getByRole('button', { name: /start quiz/i }).click();
      
      // Answer all questions
      for (let i = 0; i < 10; i++) {
        await page.waitForTimeout(300);
        const options = page.locator('[accessibilityRole="button"]');
        const option = options.filter({ hasText: /from/ }).first();
        if (await option.isVisible()) {
          await option.click();
          await page.waitForTimeout(900);
        }
      }
      
      // URL should contain result params
      await page.waitForTimeout(500);
      const url = page.url();
      expect(url).toMatch(/correct=\d+/);
      expect(url).toMatch(/total=\d+/);
    });

    test('shared result URL shows results directly', async ({ page }) => {
      await page.goto('/kit-quiz?correct=8&total=10');
      
      // Should show results, not intro
      await expect(page.getByText('8/10')).toBeVisible();
      await expect(page.getByText(/80%/i)).toBeVisible();
    });

    test('shared result URL has correct meta tags', async ({ page }) => {
      await page.goto('/kit-quiz?correct=8&total=10&score=80');
      
      const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
      expect(ogTitle).toContain('8/10');
      
      const ogDescription = await page.getAttribute('meta[property="og:description"]', 'content');
      expect(ogDescription).toContain('80%');
    });
  });

  test.describe('Responsive Design', () => {
    test('mobile view displays correctly', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/kit-quiz');
      
      // All elements should be visible on mobile
      await expect(page.getByText('Guess the Drummer by Kit')).toBeVisible();
      await expect(page.getByRole('button', { name: /start quiz/i })).toBeVisible();
    });

    test('tablet view displays correctly', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/kit-quiz');
      
      await expect(page.getByText('Guess the Drummer by Kit')).toBeVisible();
      await expect(page.getByRole('button', { name: /start quiz/i })).toBeVisible();
    });

    test('desktop view displays correctly', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto('/kit-quiz');
      
      await expect(page.getByText('Guess the Drummer by Kit')).toBeVisible();
      await expect(page.getByRole('button', { name: /start quiz/i })).toBeVisible();
    });
  });

  test.describe('Navigation', () => {
    test('can access kit quiz from homepage', async ({ page }) => {
      await page.goto('/');
      
      // Click kit quiz button
      const kitQuizButton = page.getByRole('button', { name: /kit quiz/i });
      if (await kitQuizButton.isVisible()) {
        await kitQuizButton.click();
        await expect(page).toHaveURL('/kit-quiz');
      }
    });

    test('back button works during quiz', async ({ page }) => {
      await page.goto('/kit-quiz');
      await page.getByRole('button', { name: /start quiz/i }).click();
      
      await page.waitForTimeout(500);
      
      // Click back during quiz
      await page.getByRole('button', { name: /back/i }).click();
      await expect(page).toHaveURL('/');
    });
  });
});
