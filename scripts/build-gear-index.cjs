#!/usr/bin/env node
/**
 * Build packages/frontend/data/gearIndex.js — a brand → series → drummers index.
 * Issue #995 (split 1/4 of #871) — data layer for /gear/<brand>/<series>/drummers-using.
 *
 * Offline generator. Reads api/drummers/index.js (single source of truth), parses each
 * drummer's CURRENT gear free-text fields (drums, snare, cymbals, hardware, sticks) into
 * { brand, series } tuples, and groups drummers by the gear series they use.
 *
 * Output shape:
 *   GEAR_INDEX = {
 *     Tama: {
 *       'Starclassic Maple': [{ id, name, slug, configString }, ...],
 *       ...
 *     },
 *     ...
 *   }
 *
 * Data-extraction approach (regex + controlled eval over api/drummers/index.js)
 * intentionally mirrors the sibling generators in scripts/generate-llms-*.cjs so all
 * source-of-truth readers stay in sync.
 *
 * No UI here — that's #871.b (#996). Run: `node scripts/build-gear-index.cjs`
 */

const fs = require('fs');
const path = require('path');

// --- Config ----------------------------------------------------------------------
const MIN_DRUMMERS_PER_SERIES = 2; // skip one-off series (issue requirement)

// Gear fields to parse, in priority order. These are the CURRENT (top-level) gear
// strings on each drummer — historical gearTimeline entries are intentionally ignored.
const GEAR_FIELDS = ['drums', 'snare', 'cymbals', 'hardware', 'sticks'];

// Known brands with aliases. Longest alias wins (sorted at match time) so multi-word
// brands ("Drum Workshop", "Vic Firth") beat shorter accidental prefixes. Canonical
// name is what appears as the GEAR_INDEX top-level key.
const BRANDS = [
  { canonical: 'Tama', aliases: ['Tama'] },
  { canonical: 'Pearl', aliases: ['Pearl'] },
  { canonical: 'DW', aliases: ['Drum Workshop', 'DW'] },
  { canonical: 'Ludwig', aliases: ['Ludwig'] },
  { canonical: 'Sonor', aliases: ['Sonor'] },
  { canonical: 'Mapex', aliases: ['Mapex'] },
  { canonical: 'Gretsch', aliases: ['Gretsch'] },
  { canonical: 'Yamaha', aliases: ['Yamaha'] },
  { canonical: 'Premier', aliases: ['Premier'] },
  { canonical: 'Canopus', aliases: ['Canopus'] },
  { canonical: 'Camco', aliases: ['Camco'] },
  { canonical: 'ddrum', aliases: ['ddrum'] },
  { canonical: 'SJC', aliases: ['SJC Custom Drums', 'SJC'] },
  { canonical: 'OCDP', aliases: ['Orange County Drum & Percussion', 'OCDP'] },
  { canonical: 'Noble & Cooley', aliases: ['Noble & Cooley'] },
  // Cymbals
  { canonical: 'Zildjian', aliases: ['Zildjian'] },
  { canonical: 'Sabian', aliases: ['Sabian'] },
  { canonical: 'Paiste', aliases: ['Paiste'] },
  { canonical: 'Meinl', aliases: ['Meinl'] },
  // Sticks / hardware / heads-on-sticks-line brands
  { canonical: 'Vater', aliases: ['Vater'] },
  { canonical: 'Vic Firth', aliases: ['Vic Firth'] },
  { canonical: 'Promark', aliases: ['Pro-Mark', 'Promark', 'ProMark'] },
  { canonical: 'Ahead', aliases: ['Ahead'] },
  { canonical: 'Los Cabos', aliases: ['Los Cabos'] },
  { canonical: 'Regal Tip', aliases: ['Regal Tip'] },
  { canonical: 'Axis', aliases: ['Axis'] },
  { canonical: 'Trick', aliases: ['Trick'] },
  { canonical: 'Roland', aliases: ['Roland'] },
];

// Pre-flatten { aliasLower, alias, brand } and sort longest-alias-first.
const ALIAS_TABLE = BRANDS.flatMap((b) =>
  b.aliases.map((alias) => ({ alias, aliasLower: alias.toLowerCase(), brand: b }))
).sort((a, b) => b.alias.length - a.alias.length);

// --- Helpers ---------------------------------------------------------------------
function drummerSlug(name) {
  // Mirror scripts/generate-llms-drummers.cjs generateSlug().
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// Match a known brand at the START of a gear string. Returns { brand, rest } or null.
function matchBrand(str) {
  const lower = str.toLowerCase();
  for (const entry of ALIAS_TABLE) {
    if (lower.startsWith(entry.aliasLower)) {
      // require a word boundary after the alias (space, end, or punctuation)
      const after = str.charAt(entry.alias.length);
      if (after === '' || /[\s(,/-]/.test(after)) {
        return { brand: entry.brand.canonical, rest: str.slice(entry.alias.length).trim() };
      }
    }
  }
  return null;
}

// Derive a clean series name from the post-brand remainder.
function deriveSeries(rest) {
  // Drop any parenthetical config ("(24"x18" Bass ...)", "(Granite Sparkle)").
  let series = rest.replace(/\([^)]*\)/g, '').trim();
  // Collapse whitespace.
  series = series.replace(/\s+/g, ' ').trim();
  // Normalise a trailing generic "Series" token so "Reference Series" === "Reference".
  series = series.replace(/\bSeries\b\s*$/i, '').trim();
  return series;
}

// --- Load drummers (same regex+eval extraction as generate-llms-full.cjs) ---------
const drummersPath = path.join(__dirname, '../api/drummers/index.js');
const drummersContent = fs.readFileSync(drummersPath, 'utf-8');

const arrayMatch = drummersContent.match(
  /const drummers = (\[[\s\S]*?\]);[\s\S]*?export default function handler/
);
if (!arrayMatch) {
  console.error('Could not extract drummers array from api/drummers/index.js');
  process.exit(1);
}

let drummers;
try {
  drummers = eval(arrayMatch[1]);
} catch (e) {
  console.error('Error parsing drummers:', e);
  process.exit(1);
}

// --- Build the index -------------------------------------------------------------
// index[brand][series] = Map<drummerId, { id, name, slug, configString }>
const index = {};
const skipped = []; // gear strings whose brand we could not resolve

for (const drummer of drummers) {
  const gear = drummer.gear || {};
  const slug = drummerSlug(drummer.name);

  for (const field of GEAR_FIELDS) {
    const raw = gear[field];
    if (!raw || typeof raw !== 'string') continue;

    const configString = raw.trim();
    const matched = matchBrand(configString);
    if (!matched) {
      skipped.push(configString);
      continue;
    }

    const series = deriveSeries(matched.rest);
    if (!series) continue; // brand with no series (e.g. bare "Remo") — nothing to group on

    const brand = matched.brand;
    index[brand] = index[brand] || {};
    index[brand][series] = index[brand][series] || new Map();

    // Dedup per drummer per series (a drummer might list the same series in two fields).
    if (!index[brand][series].has(drummer.id)) {
      index[brand][series].set(drummer.id, {
        id: drummer.id,
        name: drummer.name,
        slug,
        configString,
      });
    }
  }
}

// --- Filter (>= MIN_DRUMMERS_PER_SERIES) and sort for stable output --------------
const GEAR_INDEX = {};
let seriesKept = 0;
let drummerLinks = 0;

for (const brand of Object.keys(index).sort()) {
  const seriesMap = index[brand];
  const keptSeries = {};

  for (const series of Object.keys(seriesMap).sort()) {
    const drummerList = [...seriesMap[series].values()].sort((a, b) => a.id - b.id);
    if (drummerList.length < MIN_DRUMMERS_PER_SERIES) continue;
    keptSeries[series] = drummerList;
    seriesKept += 1;
    drummerLinks += drummerList.length;
  }

  if (Object.keys(keptSeries).length > 0) {
    GEAR_INDEX[brand] = keptSeries;
  }
}

// --- Write packages/frontend/data/gearIndex.js -----------------------------------
const outPath = path.join(__dirname, '../packages/frontend/data/gearIndex.js');
const header = `/**
 * Gear Index — brand → series → drummers-using mapping.
 * Issue #995 (split 1/4 of #871): data layer for /gear/<brand>/<series>/drummers-using.
 *
 * GENERATED FILE — do not edit by hand.
 * Regenerate with: node scripts/build-gear-index.cjs
 *
 * Source of truth: api/drummers/index.js (current gear fields only).
 * Series used by fewer than ${MIN_DRUMMERS_PER_SERIES} drummers are omitted.
 *
 * Shape: GEAR_INDEX = { [brand]: { [series]: [{ id, name, slug, configString }] } }
 */

export const GEAR_INDEX = ${JSON.stringify(GEAR_INDEX, null, 2)};

export default GEAR_INDEX;
`;

fs.writeFileSync(outPath, header);

// --- Report ----------------------------------------------------------------------
console.log(`✅ Wrote ${path.relative(path.join(__dirname, '..'), outPath)}`);
console.log(
  `   ${Object.keys(GEAR_INDEX).length} brands, ${seriesKept} series (>=${MIN_DRUMMERS_PER_SERIES} drummers), ${drummerLinks} drummer links.`
);
if (skipped.length) {
  const uniqueSkipped = [...new Set(skipped)];
  console.log(`   ${uniqueSkipped.length} gear strings skipped (unknown brand):`);
  for (const s of uniqueSkipped.slice(0, 20)) console.log(`     - ${s}`);
  if (uniqueSkipped.length > 20) console.log(`     ... and ${uniqueSkipped.length - 20} more`);
}
