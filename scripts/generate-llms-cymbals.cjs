#!/usr/bin/env node
/**
 * Generate public/llms/cymbals.md — hub/index page for every verified
 * drummer cymbal setup in the CYMBAL_SETUPS module.
 * Issue #4307 (epic #4303 phase 4/4): mirrors scripts/generate-llms-drumsticks.cjs
 * (#4283) for the cymbals data source — the /cymbals hub family had zero
 * canonical /llms/ coverage despite being fully built out and sitemap-listed.
 *
 * Reads CYMBAL_SETUPS from packages/frontend/data/cymbalSetups.js (same
 * regex+eval extraction pattern as sibling generate-llms-*.cjs scripts, so no
 * ESM import is needed) and drummer names from api/drummers/index.js
 * (drummerSlug values in cymbalSetups.js are toSlug(drummer.name), matching
 * packages/frontend/utils/urlHelpers.js#toSlug).
 *
 * Count and date are derived from the live data at generation time — never
 * hardcoded — so this hub can't drift stale as more setups are added.
 */

'use strict';
const fs = require('fs');
const path = require('path');

const BASE = 'https://metalforge.io';
const today = new Date().toISOString().split('T')[0];

// --- Load CYMBAL_SETUPS from ESM source ---
const dataPath = path.join(__dirname, '../packages/frontend/data/cymbalSetups.js');
const dataContent = fs.readFileSync(dataPath, 'utf-8');

const arrayMatch = dataContent.match(/export const CYMBAL_SETUPS = (\[[\s\S]*?\n\]);/);
if (!arrayMatch) {
  console.error('Could not extract CYMBAL_SETUPS from cymbalSetups.js');
  process.exit(1);
}

let CYMBAL_SETUPS;
try {
  // eslint-disable-next-line no-eval
  CYMBAL_SETUPS = eval(arrayMatch[1]);
} catch (e) {
  console.error('Error parsing CYMBAL_SETUPS:', e);
  process.exit(1);
}

// --- Load drummer names from the same source api/drummers/index.js already
// uses (see scripts/generate-llms-drumsticks.cjs), so slug -> name never
// drifts out of sync with the canonical drummer roster.
const drummersPath = path.join(__dirname, '../api/drummers/index.js');
const drummersContent = fs.readFileSync(drummersPath, 'utf-8');
const drummersMatch = drummersContent.match(/const drummers = (\[[\s\S]*?\]);[\s\S]*?export default function handler/);
if (!drummersMatch) {
  console.error('Could not extract drummers array from api/drummers/index.js');
  process.exit(1);
}

let drummers;
try {
  // eslint-disable-next-line no-eval
  drummers = eval(drummersMatch[1]);
} catch (e) {
  console.error('Error parsing drummers:', e);
  process.exit(1);
}

function toSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const NAME_BY_SLUG = {};
for (const d of drummers) {
  NAME_BY_SLUG[toSlug(d.name)] = d.name;
}

function drummerNameFor(setup) {
  if (!setup.drummerSlug) return null;
  return NAME_BY_SLUG[setup.drummerSlug] || setup.drummerSlug;
}

// --- Build hub markdown ---
const count = CYMBAL_SETUPS.length;
const lines = [];
lines.push('# Metal Drummer Cymbal Setups — Complete List');
lines.push('');
lines.push(`This page indexes every verified cymbal setup catalogued in MetalForge's cymbals database — ${count} entries, each parsed from the drummer's roster gear record and cross-referenced to their profile.`);
lines.push('');
lines.push(`> Last Updated: ${today} · Source: ${BASE}`);
lines.push('');
lines.push(`For types, alloys, and sizing/weight reference pages see [${BASE}/cymbals](${BASE}/cymbals). For brand positioning and metal-relevant series see [${BASE}/cymbals/brands](${BASE}/cymbals/brands). For a buying guide by budget tier see [${BASE}/cymbals/best-for-metal](${BASE}/cymbals/best-for-metal).`);
lines.push('');
lines.push(`## All ${count} Cymbal Setup Records`);
lines.push('');
for (const setup of CYMBAL_SETUPS) {
  const name = drummerNameFor(setup);
  const link = setup.drummerSlug ? `${BASE}/drummer/${setup.drummerSlug}` : null;
  const who = name ? `${name} — ` : '';
  if (link) {
    lines.push(`- ${who}[${setup.summary}](${link})`);
  } else {
    lines.push(`- ${who}${setup.summary}`);
  }
}
lines.push('');
lines.push('---');
lines.push('');
lines.push('**More LLM resources:** ');
lines.push(`[Endorsements Hub](${BASE}/llms/endorsements.md) · [Gear by Brand](${BASE}/llms/gear-by-brand.md) · [Master FAQ](${BASE}/llms/faq.md) · [Site index](${BASE}/llms.txt)`);
lines.push('');

const md = lines.join('\n');

const outDir = path.join(__dirname, '../public/llms');
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, 'cymbals.md');
fs.writeFileSync(outPath, md);

console.log(`✅ Generated public/llms/cymbals.md — ${count} cymbal setup records linked`);
