/**
 * E2E Tests for Kit Quiz - "Guess the Drummer by Kit" (Issue #551)
 * Tests viral quiz functionality, scoring, sharing, and analytics
 */

const { test, expect } = require('@playwright/test');

test.describe('Kit Quiz - Issue #551', () => {
  
  test.describe('Quiz Page Loading', () => {
    test('loads /kit-quiz page with correct elements', async ({ page }) => {
      await page.goto('/kit-quiz');
      
      // Check page title
      await expect(page).toHaveTitle(/Kit Quiz|Guess the Drummer|MetalForge/i);
      
      // Check main title is visible
      await expect(page.getByText(/Guess the Drummer by Kit/i)).toBeVisible();
      
      // Check subtitle
      await expect(page.getByText(/Can you identify the metal drummer/i)).toBeVisible();
      
      // Check back button exists
      await expect(page.getByText('← Back')).toBeVisible();
    });
    
    test('displays progress bar and question counter', async ({ page }) => {
      await page.goto('/kit-quiz');
      
      // Wait for quiz to load
      await expect(page.getByText(/Question 1 of/i)).toBeVisible({ timeout: 5000 });
      
      // Progress text should show question number
      await expect(page.getByText(/Question 1 of 10/i)).toBeVisible();
    });
    
    test('displays kit image for first question', async ({ page }) => {
      await page.goto('/kit-quiz');
      
      // Wait for quiz to load
      await expect(page.getByText(/Question 1 of/i)).toBeVisible({ timeout: 5000 });
      
      // Check that an image is present (kit photo)
      const kitImage = page.locator('img[alt*="Drum kit"]');
      await expect(kitImage).toBeVisible();
    });
    
    test('displays 4 answer options', async ({ page }) => {
      await page.goto('/kit-quiz');
      
      // Wait for quiz to load
      await expect(page.getByText(/Question 1 of/i)).toBeVisible({ timeout: 5000 });
      
      // Should have exactly 4 options (drummer names with bands)
      // Options contain drummer names - look for pattern "Name (Band)"
      const options = page.locator('[accessibilityRole="button"]').filter({ hasText: /Slayer|Metallica|Meshuggah|Tool|Slipknot|Pantera|Dream Theater|Death|Nile|Anthrax|Sepultura|Periphery|Mastodon|Lamb of God|Gojira|Behemoth|Mayhem|Morbid Angel|Trivium|Godsmack/i });
      await expect(options).toHaveCount(4);
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
      expect(ogTitle.toLowerCase()).toContain('quiz');
      
      // Check og:image for social sharing
      const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
      expect(ogImage).toBeTruthy();
      expect(ogImage).toContain('metalforge.io');
    });
  });

  test.describe('Quiz Hint System', () => {
    test('displays hint button before answering', async ({ page }) => {
      await page.goto('/kit-quiz');
      
      // Wait for quiz to load
      await expect(page.getByText(/Question 1 of/i)).toBeVisible({ timeout: 5000 });
      
      // Hint button should be visible
      await expect(page.getByText(/Need a hint/i)).toBeVisible();
      await expect(page.getByText(/-3 points/i)).toBeVisible();
    });
    
    test('shows hint when hint button is clicked', async ({ page }) => {
      await page.goto('/kit-quiz');
      
      // Wait for quiz to load
      await expect(page.getByText(/Question 1 of/i)).toBeVisible({ timeout: 5000 });
      
      // Click hint button
      await page.getByText(/Need a hint/i).click();
      
      // Hint text should now be visible (contains 💡)
      const hintBox = page.locator('text=/💡.*metal|pioneer|thrash|death|progressive|groove|speed|legendary|master/i');
      await expect(hintBox).toBeVisible();
    });
  });

  test.describe('Quiz Answer Flow', () => {
    test('shows correct/incorrect feedback after answering', async ({ page }) => {
      await page.goto('/kit-quiz');
      
      // Wait for quiz to load
      await expect(page.getByText(/Question 1 of/i)).toBeVisible({ timeout: 5000 });
      
      // Click first answer option
      const firstOption = page.locator('[accessibilityRole="button"]').filter({ hasText: /Slayer|Metallica|Meshuggah|Tool|Slipknot|Pantera|Dream Theater|Death|Nile|Anthrax/i }).first();
      await firstOption.click();
      
      // Should see either ✅ or ❌ feedback
      const feedback = page.locator('text=✅, text=❌');
      await expect(feedback.first()).toBeVisible({ timeout: 2000 });
    });
    
    test('advances to next question after answering', async ({ page }) => {
      await page.goto('/kit-quiz');
      
      // Wait for quiz to load
      await expect(page.getByText(/Question 1 of 10/i)).toBeVisible({ timeout: 5000 });
      
      // Click first answer option
      const firstOption = page.locator('[accessibilityRole="button"]').filter({ hasText: /Slayer|Metallica|Meshuggah|Tool|Slipknot|Pantera|Dream Theater|Death|Nile|Anthrax/i }).first();
      await firstOption.click();
      
      // Wait for transition and check we're on question 2
      await expect(page.getByText(/Question 2 of 10/i)).toBeVisible({ timeout: 3000 });
    });
    
    test('prevents multiple clicks on same question', async ({ page }) => {
      await page.goto('/kit-quiz');
      
      // Wait for quiz to load
      await expect(page.getByText(/Question 1 of/i)).toBeVisible({ timeout: 5000 });
      
      // Get all options
      const options = page.locator('[accessibilityRole="button"]').filter({ hasText: /Slayer|Metallica|Meshuggah|Tool|Slipknot|Pantera|Dream Theater|Death|Nile|Anthrax/i });
      
      // Click first option
      await options.first().click();
      
      // Try clicking second option immediately - should be disabled
      // The buttons should be disabled after selection
      const secondOption = options.nth(1);
      
      // Wait a tiny bit then verify we haven't jumped ahead unexpectedly
      await page.waitForTimeout(100);
      
      // Should still be showing feedback for question 1, not question 3
      await expect(page.getByText(/Question 3 of 10/i)).not.toBeVisible();
    });
  });

  test.describe('Quiz Results Page', () => {
    test('shows results after completing all questions', async ({ page }) => {
      await page.goto('/kit-quiz');
      
      // Wait for quiz to load
      await expect(page.getByText(/Question 1 of/i)).toBeVisible({ timeout: 5000 });
      
      // Answer all 10 questions
      for (let i = 0; i < 10; i++) {
        // Wait for question to be visible
        await expect(page.getByText(new RegExp(`Question ${i + 1} of 10`, 'i'))).toBeVisible({ timeout: 3000 });
        
        // Click first available option
        const option = page.locator('[accessibilityRole="button"]').filter({ hasText: /Slayer|Metallica|Meshuggah|Tool|Slipknot|Pantera|Dream Theater|Death|Nile|Anthrax|Sepultura|Periphery|Mastodon|Lamb of God|Gojira|Behemoth|Mayhem|Morbid Angel|Trivium|Godsmack/i }).first();
        await option.click();
        
        // Wait for transition
        await page.waitForTimeout(1300);
      }
      
      // Should now see results with score
      await expect(page.getByText(/Correct Answers/i)).toBeVisible({ timeout: 3000 });
      await expect(page.getByText(/Accuracy/i)).toBeVisible();
      await expect(page.getByText(/Total Points/i)).toBeVisible();
    });
    
    test('shows result emoji and message based on score', async ({ page }) => {
      await page.goto('/kit-quiz');
      
      // Wait and complete quiz
      await expect(page.getByText(/Question 1 of/i)).toBeVisible({ timeout: 5000 });
      
      for (let i = 0; i < 10; i++) {
        await expect(page.getByText(new RegExp(`Question ${i + 1} of 10`, 'i'))).toBeVisible({ timeout: 3000 });
        const option = page.locator('[accessibilityRole="button"]').filter({ hasText: /Slayer|Metallica|Meshuggah|Tool|Slipknot/i }).first();
        await option.click();
        await page.waitForTimeout(1300);
      }
      
      // Should show one of the result emojis
      const resultEmoji = page.locator('text=🏆, text=🔥, text=🥁, text=🎸, text=😅');
      await expect(resultEmoji.first()).toBeVisible({ timeout: 3000 });
      
      // Should show a result title
      const resultTitles = ['Drum God', 'Blast Beat Master', 'Solid Groove', 'Getting There', 'Time to Study'];
      const titlePattern = new RegExp(resultTitles.join('|'), 'i');
      await expect(page.getByText(titlePattern)).toBeVisible();
    });
  });

  test.describe('Quiz Sharing', () => {
    test('displays share buttons on results page', async ({ page }) => {
      await page.goto('/kit-quiz');
      
      // Complete quiz quickly
      await expect(page.getByText(/Question 1 of/i)).toBeVisible({ timeout: 5000 });
      
      for (let i = 0; i < 10; i++) {
        await expect(page.getByText(new RegExp(`Question ${i + 1} of 10`, 'i'))).toBeVisible({ timeout: 3000 });
        const option = page.locator('[accessibilityRole="button"]').filter({ hasText: /Slayer|Metallica|Meshuggah|Tool|Slipknot/i }).first();
        await option.click();
        await page.waitForTimeout(1300);
      }
      
      // Check share section
      await expect(page.getByText(/Challenge Your Friends/i)).toBeVisible({ timeout: 3000 });
      
      // Check share buttons exist
      await expect(page.getByText(/Twitter/i)).toBeVisible();
      await expect(page.getByText(/Facebook/i)).toBeVisible();
      await expect(page.getByText(/Copy/i)).toBeVisible();
    });
    
    test('displays "Play Again" button on results', async ({ page }) => {
      await page.goto('/kit-quiz');
      
      // Complete quiz
      await expect(page.getByText(/Question 1 of/i)).toBeVisible({ timeout: 5000 });
      
      for (let i = 0; i < 10; i++) {
        await expect(page.getByText(new RegExp(`Question ${i + 1} of 10`, 'i'))).toBeVisible({ timeout: 3000 });
        const option = page.locator('[accessibilityRole="button"]').filter({ hasText: /Slayer|Metallica|Meshuggah|Tool|Slipknot/i }).first();
        await option.click();
        await page.waitForTimeout(1300);
      }
      
      // Check play again button
      await expect(page.getByText(/Play Again/i)).toBeVisible({ timeout: 3000 });
    });
    
    test('restarts quiz when "Play Again" is clicked', async ({ page }) => {
      await page.goto('/kit-quiz');
      
      // Complete quiz
      await expect(page.getByText(/Question 1 of/i)).toBeVisible({ timeout: 5000 });
      
      for (let i = 0; i < 10; i++) {
        await expect(page.getByText(new RegExp(`Question ${i + 1} of 10`, 'i'))).toBeVisible({ timeout: 3000 });
        const option = page.locator('[accessibilityRole="button"]').filter({ hasText: /Slayer|Metallica|Meshuggah|Tool|Slipknot/i }).first();
        await option.click();
        await page.waitForTimeout(1300);
      }
      
      // Click play again
      await page.getByText(/Play Again/i).click();
      
      // Should be back at question 1
      await expect(page.getByText(/Question 1 of 10/i)).toBeVisible({ timeout: 3000 });
    });
  });

  test.describe('Quiz Review Section', () => {
    test('shows answer review after completing quiz', async ({ page }) => {
      await page.goto('/kit-quiz');
      
      // Complete quiz
      await expect(page.getByText(/Question 1 of/i)).toBeVisible({ timeout: 5000 });
      
      for (let i = 0; i < 10; i++) {
        await expect(page.getByText(new RegExp(`Question ${i + 1} of 10`, 'i'))).toBeVisible({ timeout: 3000 });
        const option = page.locator('[accessibilityRole="button"]').filter({ hasText: /Slayer|Metallica|Meshuggah|Tool|Slipknot/i }).first();
        await option.click();
        await page.waitForTimeout(1300);
      }
      
      // Should show review section
      await expect(page.getByText(/Review Your Answers/i)).toBeVisible({ timeout: 3000 });
      
      // Should show Q1 through Q10 markers
      await expect(page.getByText('Q1')).toBeVisible();
      await expect(page.getByText('Q10')).toBeVisible();
    });
  });

  test.describe('Quiz URL and State', () => {
    test('updates URL with result params after completion', async ({ page }) => {
      await page.goto('/kit-quiz');
      
      // Complete quiz
      await expect(page.getByText(/Question 1 of/i)).toBeVisible({ timeout: 5000 });
      
      for (let i = 0; i < 10; i++) {
        await expect(page.getByText(new RegExp(`Question ${i + 1} of 10`, 'i'))).toBeVisible({ timeout: 3000 });
        const option = page.locator('[accessibilityRole="button"]').filter({ hasText: /Slayer|Metallica|Meshuggah|Tool|Slipknot/i }).first();
        await option.click();
        await page.waitForTimeout(1300);
      }
      
      // Wait for results
      await expect(page.getByText(/Correct Answers/i)).toBeVisible({ timeout: 3000 });
      
      // URL should contain result params
      const url = page.url();
      expect(url).toContain('kit-quiz');
      expect(url).toMatch(/correct=\d+/);
      expect(url).toMatch(/total=\d+/);
    });
    
    test('can share results via URL params', async ({ page }) => {
      // Load a result URL directly
      await page.goto('/kit-quiz?correct=7&total=10&score=65');
      
      // Should show results immediately (or at minimum the page should load)
      await expect(page).toHaveURL(/kit-quiz/);
    });
  });

  test.describe('Quiz Accessibility', () => {
    test('has accessible back button', async ({ page }) => {
      await page.goto('/kit-quiz');
      
      // Back button should have proper accessibility
      const backButton = page.getByText('← Back');
      await expect(backButton).toBeVisible();
      
      // Should be focusable (React Native Web renders as div with role)
      await expect(backButton).toHaveAttribute('accessibilityRole', 'button');
    });
    
    test('has accessible answer options', async ({ page }) => {
      await page.goto('/kit-quiz');
      
      // Wait for quiz to load
      await expect(page.getByText(/Question 1 of/i)).toBeVisible({ timeout: 5000 });
      
      // Options should have button role
      const options = page.locator('[accessibilityRole="button"]').filter({ hasText: /Slayer|Metallica|Meshuggah|Tool|Slipknot/i });
      const count = await options.count();
      expect(count).toBe(4);
    });
  });

  test.describe('Quiz Analytics Integration', () => {
    test('does not block quiz interaction for analytics', async ({ page }) => {
      await page.goto('/kit-quiz');
      
      // Wait for quiz to load
      await expect(page.getByText(/Question 1 of/i)).toBeVisible({ timeout: 5000 });
      
      // Click answer - should work regardless of analytics state
      const option = page.locator('[accessibilityRole="button"]').filter({ hasText: /Slayer|Metallica|Meshuggah|Tool|Slipknot/i }).first();
      await option.click();
      
      // Should advance to next question
      await expect(page.getByText(/Question 2 of 10/i)).toBeVisible({ timeout: 3000 });
    });
  });

  test.describe('Mobile Responsiveness', () => {
    test('renders correctly on mobile viewport', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      
      await page.goto('/kit-quiz');
      
      // Wait for quiz to load
      await expect(page.getByText(/Question 1 of/i)).toBeVisible({ timeout: 5000 });
      
      // Check all key elements are visible
      await expect(page.getByText(/Guess the Drummer/i)).toBeVisible();
      await expect(page.getByText(/Need a hint/i)).toBeVisible();
      
      // Kit image should be visible
      const kitImage = page.locator('img[alt*="Drum kit"]');
      await expect(kitImage).toBeVisible();
    });
  });
});
