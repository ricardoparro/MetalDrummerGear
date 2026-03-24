/**
 * E2E Tests for Drummer Gear Evolution Timeline Pages
 * Issue #767 - Visual History of Setup Changes
 * URL: /drummers/[slug]/evolution
 */

const { test, expect } = require('@playwright/test');

test.describe('Drummer Gear Evolution Timeline Pages', () => {
  
  test.describe('Evolution Page - Lars Ulrich', () => {
    
    test('should load the evolution timeline page', async ({ page }) => {
      await page.goto('/drummers/lars-ulrich/evolution');
      await page.waitForLoadState('networkidle');
      
      // Check page title contains evolution-related keywords
      await expect(page).toHaveTitle(/Lars Ulrich.*Evolution|Gear Evolution/i);
    });
    
    test('should display drummer name and info', async ({ page }) => {
      await page.goto('/drummers/lars-ulrich/evolution');
      await page.waitForLoadState('networkidle');
      
      const drummerName = page.locator('text=Lars Ulrich');
      await expect(drummerName.first()).toBeVisible();
      
      const bandName = page.locator('text=Metallica');
      await expect(bandName.first()).toBeVisible();
    });
    
    test('should display era timeline navigation', async ({ page }) => {
      await page.goto('/drummers/lars-ulrich/evolution');
      await page.waitForLoadState('networkidle');
      
      const timelineSection = page.locator('text=Timeline');
      await expect(timelineSection.first()).toBeVisible();
      
      const killEmAllEra = page.locator('text=/Kill.*Em.*All|1981-1984/i');
      await expect(killEmAllEra.first()).toBeVisible();
    });
    
    test('should display gear setup section', async ({ page }) => {
      await page.goto('/drummers/lars-ulrich/evolution');
      await page.waitForLoadState('networkidle');
      
      const gearSection = page.locator('text=Gear Setup');
      await expect(gearSection.first()).toBeVisible();
      
      const drumsCategory = page.locator('text=/drums/i');
      await expect(drumsCategory.first()).toBeVisible();
      
      const cymbalsCategory = page.locator('text=/cymbals/i');
      await expect(cymbalsCategory.first()).toBeVisible();
    });
    
    test('should have back button', async ({ page }) => {
      await page.goto('/drummers/lars-ulrich/evolution');
      await page.waitForLoadState('networkidle');
      
      const backButton = page.locator('text=/Back/i');
      await expect(backButton.first()).toBeVisible();
    });
    
    test('should allow switching between eras', async ({ page }) => {
      await page.goto('/drummers/lars-ulrich/evolution');
      await page.waitForLoadState('networkidle');
      
      const blackAlbumEra = page.locator('text=/Black Album|1989-1996/i').first();
      await blackAlbumEra.click();
      
      await page.waitForTimeout(500);
      
      const eraDetails = page.locator('text=Black Album');
      await expect(eraDetails.first()).toBeVisible();
    });
    
    test('should display Then vs Now toggle', async ({ page }) => {
      await page.goto('/drummers/lars-ulrich/evolution');
      await page.waitForLoadState('networkidle');
      
      const thenVsNow = page.locator('text=/Then vs Now/i');
      await expect(thenVsNow.first()).toBeVisible();
    });
    
    test('should display share buttons', async ({ page }) => {
      await page.goto('/drummers/lars-ulrich/evolution');
      await page.waitForLoadState('networkidle');
      
      const shareButton = page.locator('text=/Share/i');
      await expect(shareButton.first()).toBeVisible();
    });
    
    test('should display other drummers with timelines', async ({ page }) => {
      await page.goto('/drummers/lars-ulrich/evolution');
      await page.waitForLoadState('networkidle');
      
      const otherTimelines = page.locator('text=/More Gear Evolutions/i');
      await expect(otherTimelines.first()).toBeVisible();
      
      const joeyJordison = page.locator('text=Joey Jordison');
      await expect(joeyJordison.first()).toBeVisible();
    });
    
  });
  
  test.describe('Evolution Page - Joey Jordison', () => {
    
    test('should load Joey Jordison evolution page', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/evolution');
      await page.waitForLoadState('networkidle');
      
      const drummerName = page.locator('text=Joey Jordison');
      await expect(drummerName.first()).toBeVisible();
    });
    
    test('should display Slipknot-related eras', async ({ page }) => {
      await page.goto('/drummers/joey-jordison/evolution');
      await page.waitForLoadState('networkidle');
      
      const iowaEra = page.locator('text=/Iowa/i');
      await expect(iowaEra.first()).toBeVisible();
    });
    
  });
  
  test.describe('Evolution Page - Dave Lombardo', () => {
    
    test('should load Dave Lombardo evolution page', async ({ page }) => {
      await page.goto('/drummers/dave-lombardo/evolution');
      await page.waitForLoadState('networkidle');
      
      const drummerName = page.locator('text=Dave Lombardo');
      await expect(drummerName.first()).toBeVisible();
    });
    
    test('should display Reign in Blood era', async ({ page }) => {
      await page.goto('/drummers/dave-lombardo/evolution');
      await page.waitForLoadState('networkidle');
      
      const reignEra = page.locator('text=/Reign in Blood/i');
      await expect(reignEra.first()).toBeVisible();
    });
    
  });
  
  test.describe('Non-existent Evolution Page', () => {
    
    test('should show "no data" message for drummer without evolution data', async ({ page }) => {
      await page.goto('/drummers/alex-bent/evolution');
      await page.waitForLoadState('networkidle');
      
      const noDataMessage = page.locator('text=/No Evolution Data|not available/i');
      await expect(noDataMessage.first()).toBeVisible();
    });
    
  });
  
  test.describe('Link from Drummer Profile', () => {
    
    test('should show evolution link on Lars Ulrich profile', async ({ page }) => {
      await page.goto('/drummer/lars-ulrich');
      await page.waitForLoadState('networkidle');
      
      const evolutionLink = page.locator('text=/Evolution Timeline|Gear Evolution/i');
      await expect(evolutionLink.first()).toBeVisible();
    });
    
    test('should navigate to evolution page from profile', async ({ page }) => {
      await page.goto('/drummer/lars-ulrich');
      await page.waitForLoadState('networkidle');
      
      const evolutionLink = page.locator('text=/View Evolution Timeline/i');
      await evolutionLink.click();
      
      await page.waitForLoadState('networkidle');
      
      expect(page.url()).toContain('/drummers/lars-ulrich/evolution');
    });
    
  });
  
});
