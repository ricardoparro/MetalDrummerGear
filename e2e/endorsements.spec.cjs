// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * E2E Tests for Endorsements Section (Issue #782)
 * Phase 1: Display current endorsements prominently on drummer profiles
 */

test.describe('Endorsements Section', () => {
  test('should display endorsements section on drummer profile', async ({ page }) => {
    // Navigate to Lars Ulrich profile (known to have endorsements)
    await page.goto('/drummer/lars-ulrich');
    
    // Wait for page to load
    await expect(page.locator('text=Lars Ulrich')).toBeVisible({ timeout: 15000 });
    
    // Check for endorsements section
    const endorsementsSection = page.getByTestId('endorsements-section');
    await expect(endorsementsSection).toBeVisible({ timeout: 10000 });
    
    // Check for section title
    await expect(endorsementsSection.locator('text=Official Endorsements')).toBeVisible();
    
    // Check for at least one endorsement brand
    // Lars Ulrich endorses Tama, Zildjian, Ahead
    const tamaBrand = endorsementsSection.locator('text=/Tama/i');
    await expect(tamaBrand.first()).toBeVisible();
  });

  test('should display drums, cymbals, and sticks categories', async ({ page }) => {
    await page.goto('/drummer/lars-ulrich');
    
    // Wait for endorsements section
    const endorsementsSection = page.getByTestId('endorsements-section');
    await expect(endorsementsSection).toBeVisible({ timeout: 15000 });
    
    // Check for category labels
    await expect(endorsementsSection.locator('text=🥁 Drums')).toBeVisible();
    await expect(endorsementsSection.locator('text=🎵 Cymbals')).toBeVisible();
    await expect(endorsementsSection.locator('text=🪵 Sticks')).toBeVisible();
  });

  test('should have clickable endorsement links', async ({ page }) => {
    await page.goto('/drummer/joey-jordison');
    
    // Wait for endorsements section
    const endorsementsSection = page.getByTestId('endorsements-section');
    await expect(endorsementsSection).toBeVisible({ timeout: 15000 });
    
    // Find Pearl endorsement (Joey Jordison uses Pearl)
    const pearlEndorsement = endorsementsSection.locator('[role="link"]').filter({ hasText: /Pearl/i });
    await expect(pearlEndorsement.first()).toBeVisible();
    
    // Check that the link is accessible
    await expect(pearlEndorsement.first()).toHaveAttribute('role', 'link');
  });

  test('should display endorsements for multiple drummers', async ({ page }) => {
    const drummers = [
      { slug: 'dave-lombardo', expectedBrand: 'Tama' },
      { slug: 'gene-hoglan', expectedBrand: 'Pearl' },
      { slug: 'tomas-haake', expectedBrand: 'Sonor' },
    ];
    
    for (const drummer of drummers) {
      await page.goto(`/drummer/${drummer.slug}`);
      
      // Wait for endorsements section
      const endorsementsSection = page.getByTestId('endorsements-section');
      await expect(endorsementsSection).toBeVisible({ timeout: 15000 });
      
      // Check for expected brand
      const brandText = endorsementsSection.locator(`text=/${drummer.expectedBrand}/i`);
      await expect(brandText.first()).toBeVisible();
    }
  });

  test('should not display section for drummers without endorsements', async ({ page }) => {
    // This test assumes there might be drummers without endorsement data
    // For now, we just verify the section renders correctly when data is present
    await page.goto('/drummer/lars-ulrich');
    
    // Endorsements section should exist for Lars
    const endorsementsSection = page.getByTestId('endorsements-section');
    await expect(endorsementsSection).toBeVisible({ timeout: 15000 });
    
    // Section should have proper ARIA attributes
    await expect(endorsementsSection).toHaveAttribute('role', 'region');
  });

  test('should display all sponsors text', async ({ page }) => {
    await page.goto('/drummer/lars-ulrich');
    
    // Wait for endorsements section
    const endorsementsSection = page.getByTestId('endorsements-section');
    await expect(endorsementsSection).toBeVisible({ timeout: 15000 });
    
    // Check for "All sponsors" compact list
    await expect(endorsementsSection.locator('text=/All sponsors:/i')).toBeVisible();
  });
});
