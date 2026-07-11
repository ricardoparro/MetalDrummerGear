#!/usr/bin/env node
/**
 * Generate public/llms/drumsticks.md — hub/index page for every verified
 * signature/endorsed drumstick record in the DRUMSTICKS module.
 * Issue #4283: the drumsticks module (epic #4135 + #4149/#4165) grew to ~23+
 * research-verified entries with zero canonical /llms/ coverage — the only
 * tangential coverage was a top-10 list and genre buying guides, neither of
 * which is a complete index the way endorsements.md/bands.md/comparisons.md
 * are for their respective data sources.
 *
 * Reads DRUMSTICKS from packages/frontend/data/drumsticks.js (same regex+eval
 * extraction pattern as sibling generate-llms-*.cjs scripts, so no ESM import
 * is needed) and drummer names from api/drummers/index.js (drummerSlug values
 * in drumsticks.js are toSlug(drummer.name), matching packages/frontend/utils/
 * urlHelpers.js#toSlug — see DrumsticksHubPage.jsx for the same lookup).
 *
 * Count and date are derived from the live data at generation time — never
 * hardcoded — so this hub can't drift stale as more sticks are added.
 */

'use strict';
const fs = require('fs');
const path = require('path');

const BASE = 'https://metalforge.io';
const today = new Date().toISOString().split('T')[0];

// --- Load DRUMSTICKS from ESM source ---
const dataPath = path.join(__dirname, '../packages/frontend/data/drumsticks.js');
const dataContent = fs.readFileSync(dataPath, 'utf-8');

const arrayMatch = dataContent.match(/export const DRUMSTICKS = (\[[\s\S]*?\n\]);/);
if (!arrayMatch) {
  console.error('Could not extract DRUMSTICKS from drumsticks.js');
  process.exit(1);
}

let DRUMSTICKS;
try {
  // eslint-disable-next-line no-eval
  DRUMSTICKS = eval(arrayMatch[1]);
} catch (e) {
  console.error('Error parsing DRUMSTICKS:', e);
  process.exit(1);
}

// --- Load drummer names from the same source api/drummers/index.js already
// uses (see scripts/generate-llms-gear-insights.cjs), so slug -> name never
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

function drummerNameFor(stick) {
  if (!stick.drummerSlug) return null;
  return NAME_BY_SLUG[stick.drummerSlug] || stick.drummerSlug;
}

// --- Build hub markdown ---
const count = DRUMSTICKS.length;
const lines = [];
lines.push('# Metal Drummer Signature & Endorsed Drumsticks — Complete List');
lines.push('');
lines.push(`This page indexes every verified signature or artist-endorsed drumstick model catalogued in MetalForge's drumsticks database — ${count} entries, each sourced from a brand or retailer page and cross-referenced to the drummer who plays it.`);
lines.push('');
lines.push(`> Last Updated: ${today} · Source: ${BASE}`);
lines.push('');
lines.push(`For sizing, material, and tip-shape reference pages see [/llms/guides.md](${BASE}/llms/guides.md). For the ranked top-10 view see [/llms/lists/metal-drummers-signature-drumstick-models.md](${BASE}/llms/lists/metal-drummers-signature-drumstick-models.md).`);
lines.push('');
lines.push(`## All ${count} Drumstick Records`);
lines.push('');
for (const stick of DRUMSTICKS) {
  const name = drummerNameFor(stick);
  const link = stick.drummerSlug
    ? `${BASE}/drumsticks/signature/${stick.drummerSlug}`
    : null;
  const who = name ? `${name} — ` : '';
  const summary = `${stick.brand} ${stick.model} (${stick.material}, ${stick.size})`;
  if (link) {
    lines.push(`- ${who}[${summary}](${link})`);
  } else {
    lines.push(`- ${who}${summary}`);
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
const outPath = path.join(outDir, 'drumsticks.md');
fs.writeFileSync(outPath, md);

console.log(`✅ Generated public/llms/drumsticks.md — ${count} stick records linked`);
