// @ts-check
const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://metalforge.io';

// Collect all errors
const errors = [];

function logError(page, feature, error) {
  errors.push({ page, feature, error });
  console.log(`❌ [${page}] ${feature}: ${error}`);
}

function logSuccess(page, feature) {
  console.log(`✅ [${page}] ${feature}`);
}

test.describe('MetalForge Full Site Audit', () => {
  
  test.beforeEach(async ({ page }) => {
    // Listen for console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log(`  🔴 Console Error: ${msg.text()}`);
      }
    });
    
    // Listen for page crashes
    page.on('pageerror', err => {
      console.log(`  💥 Page Error: ${err.message}`);
    });
  });

  test('1. Homepage', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    
    // Check hero loads
    const title = await page.locator('text=Metal Drummer Gear Database').first();
    if (await title.isVisible()) {
      logSuccess('Homepage', 'Hero title visible');
    } else {
      logError('Homepage', 'Hero title', 'Not visible');
    }
    
    // Check drummer cards load
    await page.waitForTimeout(2000);
    const drummerCards = page.locator('[data-testid="drummer-card"], a[href*="/drummer/"]');
    const cardCount = await drummerCards.count();
    if (cardCount > 0) {
      logSuccess('Homepage', `${cardCount} drummer cards loaded`);
    } else {
      logError('Homepage', 'Drummer cards', 'No cards found');
    }
    
    // Test search
    const searchInput = page.locator('input[placeholder*="Search"], input[type="search"], input[type="text"]').first();
    if (await searchInput.isVisible()) {
      await searchInput.fill('Lars');
      await page.waitForTimeout(1000);
      logSuccess('Homepage', 'Search input works');
    } else {
      logError('Homepage', 'Search', 'Search input not found');
    }
  });

  test('2. Drummer Profile - Lars Ulrich', async ({ page }) => {
    await page.goto(`${BASE_URL}/drummer/lars-ulrich`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Check name displays
    const name = page.locator('text=Lars Ulrich').first();
    if (await name.isVisible()) {
      logSuccess('Drummer Profile', 'Name visible');
    } else {
      logError('Drummer Profile', 'Name', 'Not visible');
    }
    
    // Check gear section
    const gearSection = page.locator('text=/Drums|Cymbals|Hardware|Snare/i').first();
    if (await gearSection.isVisible()) {
      logSuccess('Drummer Profile', 'Gear section visible');
    } else {
      logError('Drummer Profile', 'Gear section', 'Not visible');
    }
    
    // Check videos section
    const videos = page.locator('iframe[src*="youtube"], [data-testid="video"]');
    const videoCount = await videos.count();
    console.log(`  📹 Found ${videoCount} video embeds`);
  });

  test('3. Quiz', async ({ page }) => {
    await page.goto(`${BASE_URL}/quiz`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Check quiz loads
    const quizTitle = page.locator('text=/quiz|match|style/i').first();
    if (await quizTitle.isVisible()) {
      logSuccess('Quiz', 'Quiz page loaded');
    } else {
      logError('Quiz', 'Quiz page', 'Did not load properly');
    }
    
    // Try starting quiz
    const startBtn = page.locator('button, [role="button"]').filter({ hasText: /start|begin|take/i }).first();
    if (await startBtn.isVisible()) {
      await startBtn.click();
      await page.waitForTimeout(1000);
      
      // Check question appears
      const question = page.locator('text=/question|prefer|style|choose/i').first();
      if (await question.isVisible()) {
        logSuccess('Quiz', 'First question appeared');
      } else {
        logError('Quiz', 'Quiz flow', 'Question did not appear after start');
      }
    }
  });

  test('4. Compare Tool', async ({ page }) => {
    await page.goto(`${BASE_URL}/compare`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Check compare page loads
    const compareTitle = page.locator('text=/compare|versus|vs/i').first();
    if (await compareTitle.isVisible()) {
      logSuccess('Compare', 'Compare page loaded');
    } else {
      logError('Compare', 'Compare page', 'Did not load');
    }
    
    // Try selecting drummers
    const selectors = page.locator('select, [role="combobox"], [data-testid="drummer-select"]');
    const selectorCount = await selectors.count();
    console.log(`  🔽 Found ${selectorCount} drummer selectors`);
  });

  test('5. Battle Page', async ({ page }) => {
    await page.goto(`${BASE_URL}/battle`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Check battle loads
    const battleContent = page.locator('text=/vote|battle|vs/i').first();
    if (await battleContent.isVisible()) {
      logSuccess('Battle', 'Battle page loaded');
    } else {
      logError('Battle', 'Battle page', 'Did not load');
    }
    
    // Check for NaN in votes
    const pageText = await page.textContent('body');
    if (pageText && pageText.includes('NaN')) {
      logError('Battle', 'Vote display', 'Contains NaN');
    } else {
      logSuccess('Battle', 'No NaN in votes');
    }
    
    // Try voting
    const voteBtn = page.locator('button').filter({ hasText: /vote/i }).first();
    if (await voteBtn.isVisible()) {
      await voteBtn.click();
      await page.waitForTimeout(1000);
      logSuccess('Battle', 'Vote button clickable');
    }
  });

  test('6. Articles List', async ({ page }) => {
    await page.goto(`${BASE_URL}/articles`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Check articles load
    const articles = page.locator('a[href*="/articles/"]');
    const articleCount = await articles.count();
    if (articleCount > 0) {
      logSuccess('Articles', `${articleCount} article links found`);
      
      // Click first article
      const firstArticle = articles.first();
      await firstArticle.click();
      await page.waitForTimeout(2000);
      
      // Check article content loads
      const articleBody = page.locator('article, [data-testid="article-content"], p').first();
      if (await articleBody.isVisible()) {
        logSuccess('Articles', 'Article detail page loads');
      } else {
        logError('Articles', 'Article detail', 'Content did not load');
      }
    } else {
      logError('Articles', 'Articles list', 'No articles found');
    }
  });

  test('7. Kit Builder', async ({ page }) => {
    await page.goto(`${BASE_URL}/kit-builder`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Check page loads without crash
    const pageText = await page.textContent('body');
    if (pageText && pageText.toLowerCase().includes('error')) {
      logError('Kit Builder', 'Page load', 'Error text found on page');
    } else {
      logSuccess('Kit Builder', 'Page loaded without error text');
    }
    
    // Check for kit builder UI
    const builderUI = page.locator('text=/build|kit|drums|add/i').first();
    if (await builderUI.isVisible()) {
      logSuccess('Kit Builder', 'Builder UI visible');
    } else {
      logError('Kit Builder', 'Builder UI', 'Not visible');
    }
    
    // Check for price display
    const priceDisplay = page.locator('text=/EUR|USD|\\$|€|price|cost/i').first();
    if (await priceDisplay.isVisible()) {
      logSuccess('Kit Builder', 'Price display visible');
    }
  });

  test('8. Birthdays Calendar', async ({ page }) => {
    await page.goto(`${BASE_URL}/birthdays`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Check calendar loads
    const calendar = page.locator('text=/birthday|march|april|january/i').first();
    if (await calendar.isVisible()) {
      logSuccess('Birthdays', 'Calendar content visible');
    } else {
      logError('Birthdays', 'Calendar', 'Content not visible');
    }
  });

  test('9. History/Timeline', async ({ page }) => {
    await page.goto(`${BASE_URL}/history`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Check history loads
    const historyContent = page.locator('text=/history|timeline|year|era/i').first();
    if (await historyContent.isVisible()) {
      logSuccess('History', 'History content visible');
    } else {
      logError('History', 'History page', 'Content not visible');
    }
  });

  test('10. Gear Stats', async ({ page }) => {
    await page.goto(`${BASE_URL}/gear-stats`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Check stats load
    const stats = page.locator('text=/stats|popular|brand|used/i').first();
    if (await stats.isVisible()) {
      logSuccess('Gear Stats', 'Stats content visible');
    } else {
      logError('Gear Stats', 'Stats page', 'Content not visible');
    }
  });

  test('11. News Page', async ({ page }) => {
    await page.goto(`${BASE_URL}/news`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    
    // Check news loads - look for news items by data-testid or news source text
    const newsItems = page.locator('[data-testid="news-item"]');
    let newsCount = await newsItems.count();
    
    // Fallback: check for news source indicators (Blabbermouth, Loudwire, Metal Injection)
    if (newsCount === 0) {
      const sourceIndicators = page.locator('text=/Blabbermouth|Loudwire|Metal Injection/');
      newsCount = await sourceIndicators.count();
    }
    
    if (newsCount > 0) {
      logSuccess('News', `${newsCount} news items found`);
    } else {
      logError('News', 'News feed', 'No news items found');
    }
    
    // Check for placeholder images showing "DR" or "MF"
    const images = page.locator('img[src*="ui-avatars"]');
    const imgCount = await images.count();
    console.log(`  🖼️ Found ${imgCount} placeholder images`);
  });

  test('12. Signature Licks', async ({ page }) => {
    await page.goto(`${BASE_URL}/signature-licks`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    const content = page.locator('text=/signature|lick|technique|pattern/i').first();
    if (await content.isVisible()) {
      logSuccess('Signature Licks', 'Page loaded');
    } else {
      logError('Signature Licks', 'Page', 'Content not visible');
    }
  });

  test('13. Endorsement Tracker', async ({ page }) => {
    await page.goto(`${BASE_URL}/endorsements`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    const content = page.locator('text=/endorsement|brand|sponsor/i').first();
    if (await content.isVisible()) {
      logSuccess('Endorsements', 'Page loaded');
    } else {
      logError('Endorsements', 'Page', 'Content not visible');
    }
  });

  test('14. Practice Routine Generator', async ({ page }) => {
    await page.goto(`${BASE_URL}/practice-routine`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    const content = page.locator('text=/practice|routine|exercise|warm/i').first();
    if (await content.isVisible()) {
      logSuccess('Practice Routine', 'Page loaded');
    } else {
      logError('Practice Routine', 'Page', 'Content not visible or 404');
    }
  });

  test('15. Name Generator', async ({ page }) => {
    await page.goto(`${BASE_URL}/name-generator`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    const content = page.locator('text=/name|generator|metal|stage/i').first();
    if (await content.isVisible()) {
      logSuccess('Name Generator', 'Page loaded');
      
      // Try generating a name
      const generateBtn = page.locator('button').filter({ hasText: /generate/i }).first();
      if (await generateBtn.isVisible()) {
        await generateBtn.click();
        await page.waitForTimeout(500);
        logSuccess('Name Generator', 'Generate button works');
      }
    } else {
      logError('Name Generator', 'Page', 'Content not visible');
    }
  });

  test('16. Dream Setup Builder', async ({ page }) => {
    await page.goto(`${BASE_URL}/dream-setup`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    const content = page.locator('text=/dream|setup|build|customize/i').first();
    if (await content.isVisible()) {
      logSuccess('Dream Setup', 'Page loaded');
    } else {
      logError('Dream Setup', 'Page', 'Content not visible');
    }
  });

  test('17. Navigation & Links', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    
    // Check main nav links
    const navLinks = page.locator('nav a, header a');
    const navCount = await navLinks.count();
    console.log(`  🔗 Found ${navCount} navigation links`);
    
    // Check footer links
    const footerLinks = page.locator('footer a');
    const footerCount = await footerLinks.count();
    console.log(`  🔗 Found ${footerCount} footer links`);
  });

  test('18. Mobile Responsiveness Check', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Check mobile menu or hamburger
    const mobileMenu = page.locator('[data-testid="mobile-menu"], button[aria-label*="menu"], .hamburger');
    if (await mobileMenu.first().isVisible()) {
      logSuccess('Mobile', 'Mobile menu found');
    } else {
      console.log('  📱 No dedicated mobile menu found (may use full nav)');
    }
    
    // Check search works on mobile
    const searchInput = page.locator('input').first();
    if (await searchInput.isVisible()) {
      await searchInput.tap();
      await page.waitForTimeout(500);
      logSuccess('Mobile', 'Search input tappable');
    }
  });

  test.afterAll(async () => {
    console.log('\n' + '='.repeat(60));
    console.log('AUDIT SUMMARY');
    console.log('='.repeat(60));
    
    if (errors.length === 0) {
      console.log('✅ All features passed!');
    } else {
      console.log(`❌ ${errors.length} issues found:\n`);
      errors.forEach((err, i) => {
        console.log(`${i + 1}. [${err.page}] ${err.feature}: ${err.error}`);
      });
    }
    
    console.log('='.repeat(60));
  });
});
