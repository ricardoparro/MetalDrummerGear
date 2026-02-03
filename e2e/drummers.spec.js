// @ts-check
const { test, expect } = require('@playwright/test');

const BASE_URL = process.env.BASE_URL || 'https://metalforge.io';
const API_URL = process.env.API_URL || 'https://metalforge.io';

test.describe('MetalForge E2E Tests', () => {
  
  test.describe('Homepage', () => {
    
    test('should load homepage and display drummers', async ({ page }) => {
      await page.goto('/');
      
      // Wait for the page to load
      await expect(page.locator('text=Metal Drummer Gear')).toBeVisible({ timeout: 10000 });
      
      // Should show drummer cards
      const drummerCards = page.locator('[role="button"]').filter({ hasText: /Metallica|Slipknot|Slayer|Tool/i });
      await expect(drummerCards.first()).toBeVisible({ timeout: 10000 });
    });
    
    test('should have working search', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Find and use search
      const searchInput = page.locator('input[placeholder*="Search"]');
      if (await searchInput.isVisible()) {
        await searchInput.fill('Lars');
        await page.waitForTimeout(500);
        
        // Should show Lars Ulrich
        await expect(page.locator('text=Lars Ulrich')).toBeVisible();
      }
    });
    
  });
  
  test.describe('Drummer Images', () => {
    
    test('all drummer images should load (no 404s)', async ({ page, request }) => {
      // Fetch all drummers from API
      const response = await request.get(`${API_URL}/api/drummers`);
      expect(response.ok()).toBeTruthy();
      
      const drummers = await response.json();
      expect(drummers.length).toBeGreaterThan(0);
      
      const brokenImages = [];
      
      // Check each drummer's image
      for (const drummer of drummers) {
        if (drummer.image) {
          const imageUrl = drummer.image.startsWith('http') 
            ? drummer.image 
            : `${BASE_URL}${drummer.image}`;
          
          try {
            const imgResponse = await request.head(imageUrl);
            if (!imgResponse.ok() && imgResponse.status() !== 405) {
              brokenImages.push({
                name: drummer.name,
                url: imageUrl,
                status: imgResponse.status()
              });
            }
          } catch (error) {
            brokenImages.push({
              name: drummer.name,
              url: imageUrl,
              error: error.message
            });
          }
        }
      }
      
      // Report broken images
      if (brokenImages.length > 0) {
        console.log('Broken images found:');
        brokenImages.forEach(img => {
          console.log(`  - ${img.name}: ${img.url} (${img.status || img.error})`);
        });
      }
      
      expect(brokenImages, `${brokenImages.length} drummer images are broken`).toHaveLength(0);
    });
    
  });
  
  test.describe('Drummer Detail Pages', () => {
    
    test('drummer detail page should render correctly', async ({ page, request }) => {
      // Get first drummer
      const response = await request.get(`${API_URL}/api/drummers`);
      const drummers = await response.json();
      const firstDrummer = drummers[0];
      
      // Navigate to drummer page
      await page.goto(`/drummer/${firstDrummer.id}`);
      await page.waitForLoadState('networkidle');
      
      // Should show drummer name
      await expect(page.locator(`text=${firstDrummer.name}`).first()).toBeVisible({ timeout: 10000 });
      
      // Should show back button
      await expect(page.locator('text=Back').or(page.locator('text=← Back'))).toBeVisible();
      
      // Should NOT show error
      const errorText = page.locator('text=/error|not found|undefined/i');
      await expect(errorText).not.toBeVisible();
      
      // Page should not be blank (check for content)
      const pageContent = await page.locator('body').textContent();
      expect(pageContent?.length).toBeGreaterThan(100);
    });
    
    test('multiple drummer pages should load', async ({ page, request }) => {
      const response = await request.get(`${API_URL}/api/drummers`);
      const drummers = await response.json();
      
      // Test first 5 drummers
      const testDrummers = drummers.slice(0, 5);
      
      for (const drummer of testDrummers) {
        await page.goto(`/drummer/${drummer.id}`);
        await page.waitForLoadState('domcontentloaded');
        
        // Should show drummer name
        const nameVisible = await page.locator(`text=${drummer.name}`).first().isVisible({ timeout: 5000 }).catch(() => false);
        expect(nameVisible, `Drummer page for ${drummer.name} should show their name`).toBeTruthy();
        
        // Check no JavaScript errors
        const consoleErrors = [];
        page.on('console', msg => {
          if (msg.type() === 'error') consoleErrors.push(msg.text());
        });
        
        // Should not have critical errors
        const criticalErrors = consoleErrors.filter(e => 
          e.includes('is not defined') || 
          e.includes('Cannot read') ||
          e.includes('undefined')
        );
        expect(criticalErrors, `Drummer page for ${drummer.name} has JS errors`).toHaveLength(0);
      }
    });
    
  });
  
  test.describe('Navigation', () => {
    
    test('clicking drummer card should navigate to detail page', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Click on a drummer card
      const firstCard = page.locator('[role="button"]').filter({ hasText: /Lars Ulrich|Joey Jordison/i }).first();
      await firstCard.click();
      
      // Should navigate to detail page
      await page.waitForURL(/\/drummer\/\d+/, { timeout: 5000 });
      
      // Back button should work
      const backButton = page.locator('text=Back').or(page.locator('text=← Back'));
      await backButton.click();
      
      // Should be back on homepage
      await expect(page.locator('text=Metal Drummer Gear')).toBeVisible();
    });
    
  });
  
});
