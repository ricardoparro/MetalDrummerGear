#!/usr/bin/env node
/**
 * UX Interaction Tests for MetalForge
 * Run with: node .agents/test/ux-interaction-tests.mjs
 * Requires: playwright installed
 */

import { chromium } from 'playwright';

const BASE_URL = process.env.TEST_URL || 'https://metalforge.io';
const TIMEOUT = 20000;

// Drummer card selector - these are buttons in the grid with drummer info
// Use role-based selector since these have aria-labels with "gear details"
const DRUMMER_CARD_SELECTOR = 'role=button[name*="gear details"]';

/**
 * Wait for selector with retry logic - reloads page once on failure
 */
async function waitForSelectorWithRetry(page, selector, timeout = 30000) {
  try {
    await page.waitForSelector(selector, { timeout });
  } catch (e) {
    console.log(`⚠️ Selector "${selector}" not found, retrying after reload...`);
    console.log(`   Page URL: ${page.url()}`);
    await page.reload({ waitUntil: 'domcontentloaded' });
    try {
      await page.waitForSelector(selector, { timeout });
    } catch (retryError) {
      console.log(`❌ Selector "${selector}" still not found after retry`);
      console.log(`   Page URL: ${page.url()}`);
      throw retryError;
    }
  }
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
  
  // Navigate to homepage
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  // Wait for drummer cards to appear (they are buttons with "gear details" text)
  await waitForSelectorWithRetry(page, DRUMMER_CARD_SELECTOR, 30000);
  
  // Get initial drummer count
  const initialCards = await page.locator(DRUMMER_CARD_SELECTOR).count();
  log('info', `Initial drummer count: ${initialCards}`);
  
  // Test: Click Pearl filter
  try {
    // Find and click Pearl chip
    const pearlChip = page.locator('text=Pearl').first();
    await pearlChip.click();
    await page.waitForTimeout(500);
    
    // Check URL updated
    const url = page.url();
    if (url.includes('brand=pearl')) {
      log('pass', 'URL updates with filter param');
    } else {
      log('fail', 'URL does not include brand=pearl');
    }
    
    // Check filtered count
    const filteredCards = await page.locator(DRUMMER_CARD_SELECTOR).count();
    if (filteredCards < initialCards) {
      log('pass', `Filter reduces results: ${initialCards} → ${filteredCards}`);
    } else {
      log('warn', 'Filter did not reduce results');
    }
    
  } catch (e) {
    log('fail', `Filter chip test failed: ${e.message}`);
  }
}

async function testComponentConsistency(page) {
  console.log('\n--- Component Consistency Tests ---\n');
  
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await waitForSelectorWithRetry(page, DRUMMER_CARD_SELECTOR, 30000);
  
  try {
    // Click Pearl filter chip
    const pearlChip = page.locator('text=Pearl').first();
    await pearlChip.click();
    await page.waitForTimeout(500);
    
    // Check if any dropdown shows "Pearl" as its label (it shouldn't)
    const dropdownButtons = await page.locator('[class*="filterDropdown"] button, [class*="Dropdown"] button').all();
    
    for (const btn of dropdownButtons) {
      const text = await btn.textContent();
      if (text && text.trim() === 'Pearl' || text && text.includes('Pearl ▼')) {
        log('fail', `Dropdown shows "Pearl" instead of static label - COMPONENT CONFLICT`);
        return;
      }
    }
    
    log('pass', 'No dropdown shows selected filter value as label');
    
  } catch (e) {
    log('fail', `Component consistency test failed: ${e.message}`);
  }
}

async function testFilterLogic(page) {
  console.log('\n--- Filter Logic Tests ---\n');
  
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await waitForSelectorWithRetry(page, DRUMMER_CARD_SELECTOR, 30000);
  
  try {
    // Test Thrash filter
    const thrashChip = page.locator('text=Thrash').first();
    if (await thrashChip.isVisible()) {
      await thrashChip.click();
      await page.waitForTimeout(500);
      
      // Check that Lars Ulrich appears (Thrash Metal)
      const larsCard = page.locator('text=Lars Ulrich');
      if (await larsCard.isVisible()) {
        log('pass', 'Thrash filter shows Lars Ulrich (correct)');
      } else {
        log('fail', 'Thrash filter should show Lars Ulrich');
      }
    }
    
    // Clear and test Clear All
    const clearBtn = page.locator('text=Clear').first();
    if (await clearBtn.isVisible()) {
      await clearBtn.click();
      await page.waitForTimeout(500);
      
      const url = page.url();
      if (!url.includes('genre=') && !url.includes('brand=')) {
        log('pass', 'Clear All removes filter params from URL');
      } else {
        log('fail', 'Clear All did not remove filter params');
      }
    }
    
  } catch (e) {
    log('fail', `Filter logic test failed: ${e.message}`);
  }
}

async function testDeepLinks(page) {
  console.log('\n--- Deep Link Tests ---\n');
  
  try {
    // Note: Drummer detail pages use modal/overlay, not route-based navigation
    // Only filter deep links are supported via URL params
    
    // Test filter deep link
    await page.goto(`${BASE_URL}?brand=pearl`, { waitUntil: 'domcontentloaded' });
    await waitForSelectorWithRetry(page, DRUMMER_CARD_SELECTOR, 30000);
    
    // Pearl should be active/selected
    const url = page.url();
    if (url.includes('brand=pearl')) {
      log('pass', 'Filter deep link preserves params');
    } else {
      log('fail', 'Filter deep link did not preserve params');
    }
    
    // Verify filter is applied (should show fewer drummers)
    const filteredCards = await page.locator(DRUMMER_CARD_SELECTOR).count();
    if (filteredCards > 0 && filteredCards < 25) {
      log('pass', `Filter deep link shows filtered results: ${filteredCards} drummers`);
    } else {
      log('warn', `Filter deep link may not be working correctly: ${filteredCards} drummers`);
    }
    
  } catch (e) {
    log('fail', `Deep link test failed: ${e.message}`);
  }
}

async function testMobileTouchTargets(page) {
  console.log('\n--- Mobile Touch Target Tests ---\n');
  
  // Set mobile viewport
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await waitForSelectorWithRetry(page, DRUMMER_CARD_SELECTOR, 30000);
  
  try {
    // Check common interactive elements
    const buttons = await page.locator('button, [role="button"], a').all();
    let smallTargets = 0;
    
    for (const btn of buttons.slice(0, 20)) { // Check first 20
      const box = await btn.boundingBox();
      if (box && (box.width < 44 || box.height < 44)) {
        smallTargets++;
        const text = await btn.textContent();
        log('warn', `Small touch target: ${text?.slice(0, 20) || 'unnamed'} (${Math.round(box.width)}x${Math.round(box.height)})`);
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
  
  // Summary
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
  
  if (results.warnings.length > 0) {
    console.log('\n⚠️ WARNINGS:');
    results.warnings.forEach(w => console.log(`   - ${w}`));
  }
  
  // Exit code
  process.exit(results.failed.length > 0 ? 1 : 0);
}

runTests().catch(e => {
  console.error('Test runner error:', e);
  process.exit(1);
});
