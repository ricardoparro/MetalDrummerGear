#!/usr/bin/env node
/**
 * Unit Tests for bands.js data (Issue #349)
 * Validates band data structure and drummer history entries
 * Run with: node .agents/test/bands-data-tests.mjs
 */

import { getBand, getAllBandSlugs, hasBand } from '../../packages/frontend/data/bands.js';

let passed = 0;
let failed = 0;

function test(name, condition) {
  if (condition) {
    console.log(`✅ ${name}`);
    passed++;
  } else {
    console.log(`❌ ${name}`);
    failed++;
  }
}

function testGroup(name) {
  console.log(`\n--- ${name} ---\n`);
}

// Test band data retrieval
testGroup('Band Data Retrieval');

test('getAllBandSlugs returns array', Array.isArray(getAllBandSlugs()));
test('getAllBandSlugs returns at least 3 bands', getAllBandSlugs().length >= 3);
test('hasBand returns true for existing band', hasBand('slipknot'));
test('hasBand returns false for non-existing band', !hasBand('nonexistent'));
test('getBand returns object for existing band', typeof getBand('slipknot') === 'object');
test('getBand returns null for non-existing band', getBand('nonexistent') === null);

// Test band structure
testGroup('Band Structure (Slipknot)');

const slipknot = getBand('slipknot');
test('Band has name property', slipknot?.name === 'Slipknot');
test('Band has slug property', slipknot?.slug === 'slipknot');
test('Band has formed year', typeof slipknot?.formed === 'number');
test('Band has origin', typeof slipknot?.origin === 'string');
test('Band has genres array', Array.isArray(slipknot?.genres));
test('Band has status (active/disbanded/hiatus)', ['active', 'disbanded', 'hiatus'].includes(slipknot?.status));
test('Band has drummerHistory array', Array.isArray(slipknot?.drummerHistory));

// Test drummer history structure
testGroup('Drummer History Structure (Slipknot)');

const drummerHistory = slipknot?.drummerHistory || [];
test('drummerHistory has at least 3 entries', drummerHistory.length >= 3);

const firstDrummer = drummerHistory[0];
test('Drummer entry has drummer slug', typeof firstDrummer?.drummer === 'string');
test('Drummer entry has period', typeof firstDrummer?.period === 'string');

// Check for current vs former drummers
const currentDrummers = drummerHistory.filter(d => d.period?.toLowerCase().includes('present'));
const formerDrummers = drummerHistory.filter(d => !d.period?.toLowerCase().includes('present'));
test('Has at least one current drummer', currentDrummers.length >= 1);
test('Has at least one former drummer', formerDrummers.length >= 1);

// Test Metallica (single drummer band)
testGroup('Single Drummer Band (Metallica)');

const metallica = getBand('metallica');
test('Metallica band exists', metallica !== null);
test('Metallica has exactly 1 drummer in history', metallica?.drummerHistory?.length === 1);
test('Metallica drummer is Lars Ulrich', metallica?.drummerHistory?.[0]?.drummer === 'lars-ulrich');
test('Lars is current (period includes present)', metallica?.drummerHistory?.[0]?.period?.toLowerCase().includes('present'));

// Test Slayer (disbanded band with alternating drummers)
testGroup('Multi-tenure Drummers (Slayer)');

const slayer = getBand('slayer');
test('Slayer band exists', slayer !== null);
test('Slayer status is disbanded', slayer?.status === 'disbanded');
test('Slayer has multiple drummer entries', slayer?.drummerHistory?.length >= 4);

// Check for Dave Lombardo appearing multiple times (2 tenures)
const lombardoEntries = slayer?.drummerHistory?.filter(d => d.drummer === 'dave-lombardo') || [];
test('Dave Lombardo has 2 tenures', lombardoEntries.length === 2);

// Test FAQ data
testGroup('FAQ Data');

const faq = slipknot?.faq;
test('Band has FAQ array', Array.isArray(faq));
test('FAQ has at least 1 entry', faq?.length >= 1);

const firstFaq = faq?.[0];
test('FAQ entry has question (q or question)', firstFaq?.q || firstFaq?.question);
test('FAQ entry has answer (a or answer)', firstFaq?.a || firstFaq?.answer);

// Test SEO fields
testGroup('SEO Fields');

test('Band has metaTitle', typeof slipknot?.metaTitle === 'string');
test('Band has metaDescription', typeof slipknot?.metaDescription === 'string');
test('Band has summary', typeof slipknot?.summary === 'string');
test('Band has keywords array', Array.isArray(slipknot?.keywords));

// Test related bands
testGroup('Related Bands');

test('Band has relatedBands array', Array.isArray(slipknot?.relatedBands));
test('relatedBands contains valid slugs', slipknot?.relatedBands?.every(slug => typeof slug === 'string'));

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 UNIT TEST SUMMARY');
console.log('='.repeat(50));
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);

process.exit(failed > 0 ? 1 : 0);
