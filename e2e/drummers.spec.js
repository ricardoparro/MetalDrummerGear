// @ts-check
const { test, expect } = require('@playwright/test');

const BASE_URL = process.env.BASE_URL || 'https://metalforge.io';
const API_URL = process.env.API_URL || 'https://metalforge.io';

test.describe('MetalForge E2E Tests', () => {
  
  test.describe('Homepage', () => {
    
    test('should load and display drummers', async ({ page }) => {
      await page.goto('/');
      
      // Wait for the page to load
      await expect(page.locator('text=Metal Drummer Gear')).toBeVisible({ timeout: 15000 });
      
      // Should show drummer cards - look for known drummer names
      const drummerText = page.locator('text=/Lars Ulrich|Joey Jordison|Dave Lombardo/i').first();
      await expect(drummerText).toBeVisible({ timeout: 10000 });
    });
    
  });
  
  test.describe('Drummer Images', () => {
    
    test('all drummer images should load (no 404s)', async ({ request }) => {
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
            // Accept 200, 301, 302, 304, 405 (HEAD not allowed but resource exists)
            const validStatuses = [200, 301, 302, 304, 405];
            if (!validStatuses.includes(imgResponse.status())) {
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
        console.log('\\n❌ Broken images found:');
        brokenImages.forEach(img => {
          console.log(`   - ${img.name}: ${img.status || img.error}`);
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
      
      // Should show drummer name (give it time to load)
      await expect(page.locator(`text=${firstDrummer.name}`).first()).toBeVisible({ timeout: 15000 });
      
      // Should show back button
      const backButton = page.locator('text=/Back|← Back/i');
      await expect(backButton.first()).toBeVisible();
      
      // Should NOT show "undefined" or critical errors
      const pageContent = await page.locator('body').textContent();
      expect(pageContent).not.toContain('undefined is not');
      expect(pageContent).not.toContain('is not defined');
      
      // Page should have substantial content (not blank)
      expect(pageContent?.length).toBeGreaterThan(200);
    });
    
    test('first 5 drummer pages should load without JS errors', async ({ page, request }) => {
      const response = await request.get(`${API_URL}/api/drummers`);
      const drummers = await response.json();
      const testDrummers = drummers.slice(0, 5);
      
      const errors = [];
      
      // Collect console errors
      page.on('console', msg => {
        if (msg.type() === 'error') {
          const text = msg.text();
          if (text.includes('is not defined') || text.includes('Cannot read')) {
            errors.push({ drummer: 'unknown', error: text });
          }
        }
      });
      
      for (const drummer of testDrummers) {
        await page.goto(`/drummer/${drummer.id}`);
        await page.waitForLoadState('domcontentloaded');
        
        // Check page has content
        const nameVisible = await page.locator(`text=${drummer.name}`).first()
          .isVisible({ timeout: 10000 })
          .catch(() => false);
        
        if (!nameVisible) {
          errors.push({ drummer: drummer.name, error: 'Name not visible on page' });
        }
      }
      
      if (errors.length > 0) {
        console.log('\\n❌ Errors found:');
        errors.forEach(e => console.log(`   - ${e.drummer}: ${e.error}`));
      }
      
      expect(errors, 'Drummer pages have errors').toHaveLength(0);
    });
    
  });
  
  test.describe('Navigation', () => {
    
    test('clicking drummer should navigate to detail and back', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Find and click a drummer card
      const drummerCard = page.locator('[role="button"]')
        .filter({ hasText: /Lars Ulrich/i })
        .first();
      
      if (await drummerCard.isVisible()) {
        await drummerCard.click();
        
        // Should navigate to detail page
        await page.waitForURL(/\/drummer\/\d+/, { timeout: 10000 });
        
        // Should show the drummer's name
        await expect(page.locator('text=Lars Ulrich').first()).toBeVisible();
        
        // Click back
        const backButton = page.locator('text=/Back|← Back/i').first();
        await backButton.click();
        
        // Should be back on homepage
        await expect(page.locator('text=Metal Drummer Gear')).toBeVisible({ timeout: 10000 });
      }
    });
    
  });
  
});
