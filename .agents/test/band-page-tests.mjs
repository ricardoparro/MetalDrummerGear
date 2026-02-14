#!/usr/bin/env node
/**
 * Band Page Tests (Issue #349)
 * Tests the drummerHistory section on band pages
 * Run with: node .agents/test/band-page-tests.mjs
 * Requires: playwright installed
 */

import { chromium } from 'playwright';

const BASE_URL = process.env.TEST_URL || 'https://metalforge.io';
const TIMEOUT = 30000;

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

async function testBandPageLoads(page) {
  console.log('\n--- Band Page Load Test ---\n');
  
  // Test Slipknot band page (has multiple drummers)
  await page.goto(`${BASE_URL}/band/slipknot`, { waitUntil: 'networkidle' });
  
  // Check page title
  const title = await page.title();
  if (title.toLowerCase().includes('slipknot')) {
    log('pass', 'Page title contains band name');
  } else {
    log('fail', `Page title doesn't contain band name: ${title}`);
  }
  
  // Check for band name heading
  const bandName = await page.locator('text=Slipknot').first();
  if (await bandName.isVisible()) {
    log('pass', 'Band name is visible');
  } else {
    log('fail', 'Band name is not visible');
  }
}

async function testDrummerHistorySection(page) {
  console.log('\n--- Drummer History Section Test ---\n');
  
  await page.goto(`${BASE_URL}/band/slipknot`, { waitUntil: 'networkidle' });
  
  // Check for Drummer History section title
  const historyTitle = await page.locator('text=Drummer History').first();
  if (await historyTitle.isVisible()) {
    log('pass', 'Drummer History section exists');
  } else {
    log('fail', 'Drummer History section not found');
    return;
  }
  
  // Check for drummer entries (Slipknot has 3 drummers)
  const joeyEntry = await page.locator('text=Joey Jordison').first();
  const jayEntry = await page.locator('text=Jay Weinberg').first();
  const eloyEntry = await page.locator('text=Eloy Casagrande').first();
  
  if (await joeyEntry.isVisible()) {
    log('pass', 'Joey Jordison appears in drummer history');
  } else {
    log('warn', 'Joey Jordison not found in drummer history');
  }
  
  if (await jayEntry.isVisible()) {
    log('pass', 'Jay Weinberg appears in drummer history');
  } else {
    log('warn', 'Jay Weinberg not found in drummer history');
  }
  
  if (await eloyEntry.isVisible()) {
    log('pass', 'Eloy Casagrande appears in drummer history');
  } else {
    log('warn', 'Eloy Casagrande not found in drummer history');
  }
}

async function testCurrentVsFormerBadges(page) {
  console.log('\n--- Current vs Former Member Badges Test ---\n');
  
  await page.goto(`${BASE_URL}/band/slipknot`, { waitUntil: 'networkidle' });
  
  // Check for CURRENT badge (Eloy is current)
  const currentBadge = await page.locator('text=CURRENT').first();
  if (await currentBadge.isVisible()) {
    log('pass', 'CURRENT badge is visible for current drummer');
  } else {
    log('fail', 'CURRENT badge not found');
  }
  
  // Check for FORMER badge (Joey and Jay are former)
  const formerBadges = await page.locator('text=FORMER').count();
  if (formerBadges >= 2) {
    log('pass', `FORMER badges found for ex-members: ${formerBadges}`);
  } else {
    log('warn', `Expected at least 2 FORMER badges, found ${formerBadges}`);
  }
}

async function testDrummerPeriodDates(page) {
  console.log('\n--- Drummer Period Dates Test ---\n');
  
  await page.goto(`${BASE_URL}/band/slipknot`, { waitUntil: 'networkidle' });
  
  // Check for period dates (📅)
  const periodDates = await page.locator('text=📅').count();
  if (periodDates >= 3) {
    log('pass', `Period dates displayed for each drummer: ${periodDates}`);
  } else {
    log('warn', `Expected at least 3 period dates, found ${periodDates}`);
  }
  
  // Check for specific period format (e.g., "1995-2013")
  const periodFormat = await page.locator('text=/\\d{4}-\\d{4}|\\d{4}-present/i').first();
  if (await periodFormat.isVisible()) {
    log('pass', 'Period dates are in correct format');
  } else {
    log('warn', 'Period date format may not be standard');
  }
}

async function testDrummerProfileLinks(page) {
  console.log('\n--- Drummer Profile Links Test ---\n');
  
  await page.goto(`${BASE_URL}/band/slipknot`, { waitUntil: 'networkidle' });
  
  // Check for drummer links by looking for testid
  const drummerLinks = await page.locator('[data-testid^="drummer-link-"]').count();
  if (drummerLinks >= 1) {
    log('pass', `Drummer profile links found: ${drummerLinks}`);
  } else {
    log('warn', 'No drummer profile links found');
  }
}

async function testBandPageSEO(page) {
  console.log('\n--- Band Page SEO Test ---\n');
  
  await page.goto(`${BASE_URL}/band/slipknot`, { waitUntil: 'networkidle' });
  
  // Check meta description
  const metaDesc = await page.$('meta[name="description"]');
  if (metaDesc) {
    const content = await metaDesc.getAttribute('content');
    if (content && content.length > 50) {
      log('pass', 'Meta description is present and adequate length');
    } else {
      log('warn', 'Meta description may be too short');
    }
  } else {
    log('fail', 'Meta description is missing');
  }
}

async function testBandWithSingleDrummer(page) {
  console.log('\n--- Single Drummer Band Test (Metallica) ---\n');
  
  await page.goto(`${BASE_URL}/band/metallica`, { waitUntil: 'networkidle' });
  
  // Check Metallica only shows Lars
  const larsEntry = await page.locator('text=Lars Ulrich').first();
  if (await larsEntry.isVisible()) {
    log('pass', 'Lars Ulrich is shown for Metallica');
  } else {
    log('fail', 'Lars Ulrich not found on Metallica page');
  }
  
  // Should have CURRENT badge for Lars
  const currentBadge = await page.locator('text=CURRENT').first();
  if (await currentBadge.isVisible()) {
    log('pass', 'Lars marked as CURRENT member');
  } else {
    log('warn', 'CURRENT badge not found for Lars');
  }
}

async function testDisbandedBandStatus(page) {
  console.log('\n--- Disbanded Band Status Test (Slayer) ---\n');
  
  await page.goto(`${BASE_URL}/band/slayer`, { waitUntil: 'networkidle' });
  
  // Check for Disbanded status badge
  const disbandedBadge = await page.locator('text=Disbanded').first();
  if (await disbandedBadge.isVisible()) {
    log('pass', 'Disbanded status badge is shown');
  } else {
    log('warn', 'Disbanded status badge not found');
  }
}

async function testFAQSection(page) {
  console.log('\n--- FAQ Section Test ---\n');
  
  await page.goto(`${BASE_URL}/band/slipknot`, { waitUntil: 'networkidle' });
  
  // Check for FAQ section
  const faqTitle = await page.locator('text=Frequently Asked Questions').first();
  if (await faqTitle.isVisible()) {
    log('pass', 'FAQ section is present');
  } else {
    log('warn', 'FAQ section not found');
  }
}

async function test404BandPage(page) {
  console.log('\n--- 404 Band Page Test ---\n');
  
  await page.goto(`${BASE_URL}/band/nonexistent-band`, { waitUntil: 'networkidle' });
  
  // Check for "not found" message
  const notFound = await page.locator('text=not found').first();
  if (await notFound.isVisible()) {
    log('pass', 'Shows "not found" for invalid band');
  } else {
    log('warn', 'No "not found" message for invalid band');
  }
  
  // Check back button is present
  const backButton = await page.locator('text=Back').first();
  if (await backButton.isVisible()) {
    log('pass', 'Back button is present on 404 page');
  } else {
    log('fail', 'Back button missing on 404 page');
  }
}

async function runTests() {
  console.log('🥁 MetalForge Band Page Tests (Issue #349)\n');
  console.log(`Testing against: ${BASE_URL}\n`);
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();
  page.setDefaultTimeout(TIMEOUT);
  
  try {
    await testBandPageLoads(page);
    await testDrummerHistorySection(page);
    await testCurrentVsFormerBadges(page);
    await testDrummerPeriodDates(page);
    await testDrummerProfileLinks(page);
    await testBandPageSEO(page);
    await testBandWithSingleDrummer(page);
    await testDisbandedBandStatus(page);
    await testFAQSection(page);
    await test404BandPage(page);
  } catch (error) {
    log('fail', `Test error: ${error.message}`);
  } finally {
    await browser.close();
  }
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(50));
  console.log(`✅ Passed: ${results.passed.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  console.log(`⚠️ Warnings: ${results.warnings.length}`);
  
  if (results.failed.length > 0) {
    console.log('\n❌ Failed tests:');
    results.failed.forEach(f => console.log(`  - ${f}`));
  }
  
  // Exit code based on failures
  process.exit(results.failed.length > 0 ? 1 : 0);
}

runTests().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
