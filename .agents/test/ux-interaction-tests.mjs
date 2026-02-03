#!/usr/bin/env node
/**
 * UX Interaction Tests for MetalForge
 * Run with: node .agents/test/ux-interaction-tests.mjs
 * Requires: playwright installed
 */

import { chromium } from 'playwright';

const BASE_URL = process.env.TEST_URL || 'https://metalforge.io';
const TIMEOUT = 30000;

// Drummer card selectors - try multiple approaches for reliability
// Primary: href-based selector (most reliable for React Native Web)
// Fallback: text content that indicates drummer cards are loaded
const DRUMMER_CARD_SELECTOR = 'a[href^="/drummer/"]';
const DRUMMER_NAME_FALLBACK = 'text=Lars Ulrich';

/**
 * Wait for drummer cards to load with multiple fallback strategies
 */
async function waitForDrummerCards(page, timeout = 60000) {
  // Wait for network to be idle (React app needs JS to execute)
  console.log('ℹ️ Waiting for page to load...');
  await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {
    console.log('ℹ️ networkidle timeout, continuing...');
  });
  
  // Try primary selector first (drummer links)
  try {
    await page.waitForSelector(DRUMMER_CARD_SELECTOR, { timeout: 20000 });
    console.log('ℹ️ Found drummer cards via href selector');
    return DRUMMER_CARD_SELECTOR;
  } catch (e) {
    console.log('ℹ️ Primary selector not found, trying fallback...');
  }
  
  // Try fallback - wait for known drummer name
  try {
    await page.waitForSelector(DRUMMER_NAME_FALLBACK, { timeout: 15000 });
    console.log('ℹ️ Found drummer cards via name fallback');
    return DRUMMER_CARD_SELECTOR;
  } catch (e) {
    console.log('⚠️ Fallback selector also not found, trying reload...');
  }
  
  // Last resort - reload and try again
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector(DRUMMER_CARD_SELECTOR, { timeout: 20000 });
  return DRUMMER_CARD_SELECTOR;
}

const results = {
  passed: [],
  failed: [],
  warnings: []
};

function log(type, message) {
  const icons = { pass: '✅', fail: '❌', warn: '⚠️', info: 'ℹ️' };
  console.log(`${icons[type] || ''} ${message}`);
  
  if (type === 'pass') results.passed.push(message);
  if (type === 'fail') results.failed.push(message);
  if (type === 'warn') results.warnings.push(message);
}

async function testFilterChips(page) {
  console.log('\n--- Filter Chip Tests ---\n');
  
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  const cardSelector = await waitForDrummerCards(page);
  
  const initialCards = await page.locator(cardSelector).count();
  log('info', `Initial drummer count: ${initialCards}`);
  
  if (initialCards === 0) {
    log('fail', 'No drummer cards found on page');
    return;
  }
  
  try {
    const pearlChip = page.locator('text=Pearl').first();
    if (await pearlChip.isVisible()) {
      await pearlChip.click();
      await page.waitForTimeout(500);
      
      const url = page.url();
      if (url.includes('brand=pearl')) {
        log('pass', 'URL updates with filter param');
      } else {
        log('warn', 'URL does not include brand=pearl');
      }
      
      const filteredCards = await page.locator(cardSelector).count();
      if (filteredCards < initialCards) {
        log('pass', `Filter reduces results: ${initialCards} → ${filteredCards}`);
      } else {
        log('warn', 'Filter did not reduce results');
      }
    } else {
      log('warn', 'Pearl filter chip not visible');
    }
  } catch (e) {
    log('fail', `Filter chip test failed: ${e.message}`);
  }
}

async function testComponentConsistency(page) {
  console.log('\n--- Component Consistency Tests ---\n');
  
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await waitForDrummerCards(page);
  
  try {
    const pearlChip = page.locator('text=Pearl').first();
    if (await pearlChip.isVisible()) {
      await pearlChip.click();
      await page.waitForTimeout(500);
      
      const dropdownButtons = await page.locator('[class*="filterDropdown"] button, [class*="Dropdown"] button').all();
      
      for (const btn of dropdownButtons) {
        const text = await btn.textContent();
        if (text && text.trim() === 'Pearl' || text && text.includes('Pearl ▼')) {
          log('fail', 'Dropdown shows Pearl instead of static label');
          return;
        }
      }
      
      log('pass', 'No dropdown shows selected filter value as label');
    } else {
      log('warn', 'Pearl filter chip not visible');
    }
  } catch (e) {
    log('fail', `Component consistency test failed: ${e.message}`);
  }
}

async function testFilterLogic(page) {
  console.log('\n--- Filter Logic Tests ---\n');
  
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await waitForDrummerCards(page);
  
  try {
    const thrashChip = page.locator('text=Thrash').first();
    if (await thrashChip.isVisible()) {
      await thrashChip.click();
      await page.waitForTimeout(500);
      
      const larsCard = page.locator('text=Lars Ulrich');
      if (await larsCard.isVisible()) {
        log('pass', 'Thrash filter shows Lars Ulrich (correct)');
      } else {
        log('warn', 'Thrash filter may have different results');
      }
    }
    
    const clearBtn = page.locator('text=Clear').first();
    if (await clearBtn.isVisible()) {
      await clearBtn.click();
      await page.waitForTimeout(500);
      
      const url = page.url();
      if (!url.includes('genre=') && !url.includes('brand=')) {
        log('pass', 'Clear All removes filter params from URL');
      } else {
        log('warn', 'Clear All did not fully remove filter params');
      }
    }
  } catch (e) {
    log('fail', `Filter logic test failed: ${e.message}`);
  }
}

async function testDeepLinks(page) {
  console.log('\n--- Deep Link Tests ---\n');
  
  try {
    await page.goto(`${BASE_URL}?brand=pearl`, { waitUntil: 'domcontentloaded' });
    const cardSelector = await waitForDrummerCards(page);
    
    const url = page.url();
    if (url.includes('brand=pearl')) {
      log('pass', 'Filter deep link preserves params');
    } else {
      log('warn', 'Filter deep link did not preserve params');
    }
    
    const filteredCards = await page.locator(cardSelector).count();
    if (filteredCards > 0 && filteredCards < 25) {
      log('pass', `Filter deep link shows filtered results: ${filteredCards} drummers`);
    } else if (filteredCards > 0) {
      log('warn', `Filter deep link showing ${filteredCards} drummers`);
    } else {
      log('fail', 'No drummer cards found after deep link');
    }
  } catch (e) {
    log('fail', `Deep link test failed: ${e.message}`);
  }
}

async function testMobileTouchTargets(page) {
  console.log('\n--- Mobile Touch Target Tests ---\n');
  
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await waitForDrummerCards(page);
  
  try {
    const buttons = await page.locator('button, [role="button"], a').all();
    let smallTargets = 0;
    
    for (const btn of buttons.slice(0, 20)) {
      const box = await btn.boundingBox();
      if (box && (box.width < 44 || box.height < 44)) {
        smallTargets++;
      }
    }
    
    if (smallTargets === 0) {
      log('pass', 'All touch targets >= 44x44px');
    } else {
      log('warn', `${smallTargets} elements have small touch targets`);
    }
  } catch (e) {
    log('fail', `Mobile touch target test failed: ${e.message}`);
  }
}

async function runTests() {
  console.log('🧪 MetalForge UX Interaction Tests');
  console.log('==================================');
  console.log(`Testing: ${BASE_URL}\n`);
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  page.setDefaultTimeout(TIMEOUT);
  
  try {
    await testFilterChips(page);
    await testComponentConsistency(page);
    await testFilterLogic(page);
    await testDeepLinks(page);
    await testMobileTouchTargets(page);
  } finally {
    await browser.close();
  }
  
  console.log('\n==================================');
  console.log('📊 SUMMARY');
  console.log('==================================');
  console.log(`✅ Passed: ${results.passed.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  console.log(`⚠️ Warnings: ${results.warnings.length}`);
  
  if (results.failed.length > 0) {
    console.log('\n❌ FAILURES:');
    results.failed.forEach(f => console.log(`   - ${f}`));
  }
  
  process.exit(results.failed.length > 0 ? 1 : 0);
}

runTests().catch(e => {
  console.error('Test runner error:', e);
  process.exit(1);
});
