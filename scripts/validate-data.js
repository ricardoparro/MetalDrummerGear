#!/usr/bin/env node

/**
 * Data Validation Script for Metal Drummer Gear
 * Validates drummer data consistency before deploy
 *
 * Validations:
 * 1. Gear vs Endorsements - brand matching
 * 2. Required fields - all mandatory data present
 * 3. Unique IDs - no duplicates, sequential
 * 4. Valid URLs - proper format for images and endorsements
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Brand name mapping for gear to endorsement matching
const BRAND_ALIASES = {
  // Drums
  'tama': ['tama'],
  'pearl': ['pearl'],
  'sonor': ['sonor'],
  'dw': ['dw', 'dw drums'],
  'mapex': ['mapex'],
  'ddrum': ['ddrum'],
  'ocdp': ['ocdp', 'orange county drum'],
  'sjc': ['sjc'],

  // Cymbals
  'zildjian': ['zildjian'],
  'sabian': ['sabian'],
  'paiste': ['paiste'],
  'meinl': ['meinl'],

  // Sticks
  'vic firth': ['vic firth'],
  'promark': ['promark'],
  'vater': ['vater'],
  'ahead': ['ahead'],
  'wincent': ['wincent'],
};

/**
 * Extract brand name from gear string
 */
function extractBrand(gearString) {
  if (!gearString) return null;
  const lowerGear = gearString.toLowerCase();

  for (const [brand, aliases] of Object.entries(BRAND_ALIASES)) {
    for (const alias of aliases) {
      if (lowerGear.startsWith(alias) || lowerGear.includes(alias + ' ')) {
        return brand;
      }
    }
  }
  return null;
}

/**
 * Check if endorsements contain the brand
 */
function hasEndorsement(endorsements, brand) {
  if (!brand || !endorsements) return true; // Skip if no brand detected

  return endorsements.some(e => {
    const endorsementLower = e.name.toLowerCase();
    const aliases = BRAND_ALIASES[brand] || [brand];
    return aliases.some(alias => endorsementLower.includes(alias));
  });
}

/**
 * Validate URL format
 */
function isValidUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Validate YouTube ID format (11 characters, alphanumeric with - and _)
 */
function isValidYoutubeId(id) {
  return typeof id === 'string' && /^[a-zA-Z0-9_-]{11}$/.test(id);
}

/**
 * Validate a single drummer's data
 */
function validateDrummer(drummer) {
  const errors = [];

  // Required top-level fields
  const requiredFields = ['id', 'name', 'band', 'genre', 'country', 'image', 'bio', 'gear', 'endorsements', 'videos'];
  for (const field of requiredFields) {
    if (drummer[field] === undefined || drummer[field] === null) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  // Required gear fields
  if (drummer.gear) {
    const requiredGearFields = ['drums', 'snare', 'cymbals', 'hardware', 'sticks'];
    for (const field of requiredGearFields) {
      if (!drummer.gear[field]) {
        errors.push(`Missing gear field: ${field}`);
      }
    }
  }

  // At least 1 endorsement
  if (!drummer.endorsements || drummer.endorsements.length === 0) {
    errors.push('Must have at least 1 endorsement');
  }

  // At least 1 video with valid youtubeId
  if (!drummer.videos || drummer.videos.length === 0) {
    errors.push('Must have at least 1 video');
  } else {
    const validVideos = drummer.videos.filter(v => isValidYoutubeId(v.youtubeId));
    if (validVideos.length === 0) {
      errors.push('Must have at least 1 video with valid youtubeId');
    }
    // Check all video IDs
    for (const video of drummer.videos) {
      if (!isValidYoutubeId(video.youtubeId)) {
        errors.push(`Invalid YouTube ID: ${video.youtubeId} for video "${video.title}"`);
      }
    }
  }

  // Validate image URL
  if (drummer.image && !isValidUrl(drummer.image)) {
    errors.push(`Invalid image URL: ${drummer.image}`);
  }

  // Validate endorsement URLs
  if (drummer.endorsements) {
    for (const endorsement of drummer.endorsements) {
      if (!endorsement.url || !isValidUrl(endorsement.url)) {
        errors.push(`Invalid endorsement URL for ${endorsement.name}: ${endorsement.url}`);
      }
    }
  }

  // Gear vs Endorsements validation
  if (drummer.gear && drummer.endorsements) {
    // Check drums
    const drumBrand = extractBrand(drummer.gear.drums);
    if (drumBrand && !hasEndorsement(drummer.endorsements, drumBrand)) {
      errors.push(`Gear/Endorsement mismatch: drums (${drummer.gear.drums.split(' ')[0]} not in endorsements)`);
    }

    // Check cymbals
    const cymbalBrand = extractBrand(drummer.gear.cymbals);
    if (cymbalBrand && !hasEndorsement(drummer.endorsements, cymbalBrand)) {
      errors.push(`Gear/Endorsement mismatch: cymbals (${drummer.gear.cymbals.split(' ')[0]} not in endorsements)`);
    }

    // Check sticks
    const stickBrand = extractBrand(drummer.gear.sticks);
    if (stickBrand && !hasEndorsement(drummer.endorsements, stickBrand)) {
      errors.push(`Gear/Endorsement mismatch: sticks (${drummer.gear.sticks.split(' ')[0]} not in endorsements)`);
    }
  }

  return errors;
}

/**
 * Validate all drummers
 */
async function validateAll() {
  console.log('Validating drummer data...\n');

  // Import the drummers data
  const apiPath = join(__dirname, '..', 'api', 'drummers', 'index.js');
  const apiUrl = pathToFileURL(apiPath).href;

  // We need to extract the drummers array from the module
  // Since it's exported as a handler, we need to read the file and parse it
  const fs = await import('fs');
  const fileContent = fs.readFileSync(apiPath, 'utf-8');

  // Extract the drummers array from the file content
  const arrayMatch = fileContent.match(/const drummers = \[([\s\S]*?)\];/);
  if (!arrayMatch) {
    console.error('Could not find drummers array in api/drummers/index.js');
    process.exit(1);
  }

  // Create a function to evaluate the array
  const drummersCode = `[${arrayMatch[1]}]`;
  const drummers = eval(drummersCode);

  let hasErrors = false;
  const results = [];

  // Validate each drummer
  for (const drummer of drummers) {
    const errors = validateDrummer(drummer);
    if (errors.length > 0) {
      hasErrors = true;
      results.push({ drummer, status: 'error', errors });
    } else {
      results.push({ drummer, status: 'ok', errors: [] });
    }
  }

  // Check for duplicate IDs
  const ids = drummers.map(d => d.id);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicateIds.length > 0) {
    console.log(`\nDuplicate IDs found: ${duplicateIds.join(', ')}`);
    hasErrors = true;
  }

  // Check for sequential IDs
  const sortedIds = [...ids].sort((a, b) => a - b);
  const expectedIds = Array.from({ length: sortedIds.length }, (_, i) => i + 1);
  const missingIds = expectedIds.filter(id => !sortedIds.includes(id));
  if (missingIds.length > 0) {
    console.log(`\nNon-sequential IDs - missing: ${missingIds.join(', ')}`);
    hasErrors = true;
  }

  // Print results
  for (const result of results) {
    if (result.status === 'ok') {
      console.log(`\u2705 ${result.drummer.name} - OK`);
    } else {
      console.log(`\u274C ${result.drummer.name} - ERRORS:`);
      for (const error of result.errors) {
        console.log(`   - ${error}`);
      }
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  const okCount = results.filter(r => r.status === 'ok').length;
  const errorCount = results.filter(r => r.status === 'error').length;
  console.log(`Total: ${drummers.length} drummers`);
  console.log(`Passed: ${okCount}`);
  console.log(`Failed: ${errorCount}`);

  if (hasErrors) {
    console.log('\nValidation FAILED');
    process.exit(1);
  } else {
    console.log('\nValidation PASSED');
    process.exit(0);
  }
}

// Run validation
validateAll().catch(err => {
  console.error('Validation script error:', err);
  process.exit(1);
});
