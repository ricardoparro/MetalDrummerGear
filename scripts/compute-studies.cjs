#!/usr/bin/env node
/**
 * Stats engine for the /studies content family (issue #4764, phase 1/3 of epic #4763).
 *
 * Deterministic, offline generator — no LLM calls, no network requests. Reads the
 * drummer roster (api/drummers/index.js), the single source of truth also used by
 * scripts/build-gear-index.cjs, and counts brand usage across five gear categories:
 * kits (drums), snares, cymbals, sticks, and pedals (parsed from hardware). Every
 * drummer contributes at most once per brand per category — a dual-brand cymbal
 * setup ("Sabian AAX / Zildjian A Series") counts toward both Sabian and Zildjian.
 *
 * Output: packages/frontend/data/studies/mostUsedGearBrands.js, consumed by
 * /studies/most-used-gear-brands-metal (the flagship study page) and by the
 * bot-facing SSR handler in api/meta/[...path].js.
 *
 * Run: `node scripts/compute-studies.cjs` — running it twice must produce a
 * byte-identical file (verified in the PR for this issue).
 */

const fs = require('fs');
const path = require('path');

// Bump this when the drummer roster changes and the script is re-run, so the
// study's methodology section and Article dateModified stay honest about when
// the underlying dataset was last counted. Intentionally NOT Date.now() —
// this script must be deterministic across repeated runs on the same source.
const SNAPSHOT_DATE = '2026-07-16';

// --- Brand alias table -----------------------------------------------------------
// Mirrors scripts/build-gear-index.cjs's BRANDS table (kept in sync so the two
// generators agree on what a "brand" is), plus a few additions this study's
// wider field coverage surfaced: Wincent (sticks), Gibraltar/Czarcie Kopyto
// (pedals — build-gear-index.cjs never needed these because it only groups
// gear strings that already resolved to a known brand+series pair).
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
  // Sticks
  { canonical: 'Vater', aliases: ['Vater'] },
  { canonical: 'Vic Firth', aliases: ['Vic Firth'] },
  { canonical: 'Promark', aliases: ['Pro-Mark', 'ProMark', 'Promark'] },
  { canonical: 'Ahead', aliases: ['Ahead'] },
  { canonical: 'Los Cabos', aliases: ['Los Cabos'] },
  { canonical: 'Regal Tip', aliases: ['Regal Tip'] },
  { canonical: 'Wincent', aliases: ['Wincent'] },
  // Pedals
  { canonical: 'Axis', aliases: ['Axis'] },
  { canonical: 'Trick', aliases: ['Trick'] },
  { canonical: 'Gibraltar', aliases: ['Gibraltar'] },
  { canonical: 'Czarcie Kopyto', aliases: ['Monolit Czarcie Kopyto', 'Czarcie Kopyto'] },
];

// Longest-alias-first so multi-word aliases ("Drum Workshop") aren't shadowed by
// a shorter unrelated match; irrelevant for the whole-string scan below (each
// brand is tested independently) but kept for consistency with build-gear-index.cjs.
const ALIAS_TABLE = BRANDS.flatMap((b) =>
  b.aliases.map((alias) => ({ alias, canonical: b.canonical }))
).sort((a, b) => b.alias.length - a.alias.length);

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Every alias whose word-boundary match appears anywhere in `str`, deduped to
// canonical brand names. Whole-string (not startsWith-only) so multi-brand
// fields like "Sabian AAX / Zildjian A Series" credit both brands.
function findBrandsIn(str) {
  const found = new Set();
  for (const entry of ALIAS_TABLE) {
    const re = new RegExp(`\\b${escapeRegExp(entry.alias)}\\b`, 'i');
    if (re.test(str)) found.add(entry.canonical);
  }
  return found;
}

function drummerSlug(name) {
  // Mirror scripts/generate-llms-drummers.cjs / scripts/build-gear-index.cjs generateSlug().
  return name
    .toLowerCase()
    .replace(/[åä]/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u')
    .replace(/é|è|ê|ë/g, 'e').replace(/í|ì|î|ï/g, 'i').replace(/ó|ò|ô/g, 'o')
    .replace(/ú|ù|û/g, 'u').replace(/ñ/g, 'n').replace(/ß/g, 'ss')
    .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// --- Load drummers (same regex+eval extraction as build-gear-index.cjs) ----------
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

const TOTAL_DRUMMERS = drummers.length;

// --- Category definitions ---------------------------------------------------------
// kits/snares/cymbals/sticks read one gear field directly. pedals is special:
// it's parsed out of the free-text `hardware` field (which also lists throne and
// rack hardware under the same brand), so only comma-separated segments that
// mention "pedal" are scanned — otherwise a drummer whose throne is one brand
// and pedal is another would wrongly credit both brands to "pedals".
const CATEGORIES = [
  { key: 'kits', label: 'Drum Kits', field: 'drums' },
  { key: 'snares', label: 'Snares', field: 'snare' },
  { key: 'cymbals', label: 'Cymbals', field: 'cymbals' },
  { key: 'sticks', label: 'Sticks', field: 'sticks' },
  { key: 'pedals', label: 'Pedals', field: 'hardware', pedalOnly: true },
];

function extractPedalText(hardwareText) {
  if (!hardwareText) return [];
  return hardwareText
    .split(',')
    .map((s) => s.trim())
    .filter((s) => /pedal/i.test(s));
}

// --- Compute -----------------------------------------------------------------------
const STUDY = { generatedAt: SNAPSHOT_DATE, totalDrummers: TOTAL_DRUMMERS, categories: {} };

for (const cat of CATEGORIES) {
  // brandCanonical -> Map<drummerId, { id, name, slug, band, configString }>
  const brandMap = new Map();
  const skipped = []; // { slug, name, raw } with no recognized brand in this category

  for (const drummer of drummers) {
    const gear = drummer.gear || {};
    const slug = drummerSlug(drummer.name);

    if (cat.pedalOnly) {
      const segments = extractPedalText(gear[cat.field]);
      if (segments.length === 0) continue; // no pedal mentioned at all — not counted, not skipped
      const brandsThisDrummer = new Set();
      for (const seg of segments) {
        for (const b of findBrandsIn(seg)) brandsThisDrummer.add(b);
      }
      if (brandsThisDrummer.size === 0) {
        skipped.push({ slug, name: drummer.name, raw: segments.join('; ') });
        continue;
      }
      for (const brand of brandsThisDrummer) {
        if (!brandMap.has(brand)) brandMap.set(brand, new Map());
        brandMap.get(brand).set(drummer.id, {
          id: drummer.id,
          name: drummer.name,
          slug,
          band: drummer.band,
          configString: segments.join('; '),
        });
      }
      continue;
    }

    const raw = gear[cat.field];
    if (!raw || typeof raw !== 'string') {
      skipped.push({ slug, name: drummer.name, raw: raw || '' });
      continue;
    }
    const brandsThisDrummer = findBrandsIn(raw);
    if (brandsThisDrummer.size === 0) {
      skipped.push({ slug, name: drummer.name, raw });
      continue;
    }
    for (const brand of brandsThisDrummer) {
      if (!brandMap.has(brand)) brandMap.set(brand, new Map());
      brandMap.get(brand).set(drummer.id, {
        id: drummer.id,
        name: drummer.name,
        slug,
        band: drummer.band,
        configString: raw,
      });
    }
  }

  const ranked = [...brandMap.entries()]
    .map(([brand, drummerMap]) => {
      const list = [...drummerMap.values()].sort((a, b) => a.id - b.id);
      return {
        brand,
        count: list.length,
        percent: Math.round((list.length / TOTAL_DRUMMERS) * 1000) / 10,
        drummers: list,
      };
    })
    .sort((a, b) => b.count - a.count || a.brand.localeCompare(b.brand));

  STUDY.categories[cat.key] = {
    label: cat.label,
    ranked,
    skippedCount: skipped.length,
    skipped,
  };
}

// --- Self-test -----------------------------------------------------------------------
// Deliberately throws (non-zero exit) rather than warns — a broken engine must not
// silently produce a wrong file, since every number on the study page traces back here.
function selfTest() {
  const errors = [];

  for (const cat of CATEGORIES) {
    const data = STUDY.categories[cat.key];

    // 1. Every (matched + skipped) drummer count must equal the roster total for
    //    non-pedal categories. Pedals is field-optional (some hardware strings
    //    never mention a pedal at all), so it only requires matched+skipped <= total.
    const matchedDrummerIds = new Set();
    for (const b of data.ranked) {
      for (const d of b.drummers) matchedDrummerIds.add(d.id);
    }
    const accountedFor = matchedDrummerIds.size + data.skipped.length;
    if (!cat.pedalOnly && accountedFor !== TOTAL_DRUMMERS) {
      errors.push(
        `[${cat.key}] matched(${matchedDrummerIds.size}) + skipped(${data.skipped.length}) = ${accountedFor}, expected ${TOTAL_DRUMMERS}`
      );
    }

    for (const b of data.ranked) {
      // 2. count must equal the number of unique drummers listed.
      const uniqueIds = new Set(b.drummers.map((d) => d.id));
      if (uniqueIds.size !== b.count) {
        errors.push(`[${cat.key}/${b.brand}] count (${b.count}) != unique drummer ids (${uniqueIds.size})`);
      }
      // 3. no NaN/undefined percentages.
      if (!Number.isFinite(b.percent)) {
        errors.push(`[${cat.key}/${b.brand}] percent is not finite: ${b.percent}`);
      }
      // 4. every brand traceable to >=1 drummer slug.
      if (b.drummers.length === 0 || b.drummers.some((d) => !d.slug)) {
        errors.push(`[${cat.key}/${b.brand}] has an entry with a missing drummer slug`);
      }
    }
  }

  if (errors.length > 0) {
    console.error('compute-studies self-test FAILED:\n' + errors.map((e) => `  - ${e}`).join('\n'));
    process.exit(1);
  }
}

selfTest();

// --- Write packages/frontend/data/studies/mostUsedGearBrands.js --------------------
const outDir = path.join(__dirname, '../packages/frontend/data/studies');
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, 'mostUsedGearBrands.js');

const header = `/**
 * Most-Used Gear Brands study — brand-frequency counts across the current
 * ${TOTAL_DRUMMERS}-drummer roster, split by kits/snares/cymbals/sticks/pedals.
 *
 * GENERATED FILE — do not edit by hand.
 * Regenerate with: node scripts/compute-studies.cjs
 *
 * Source of truth: api/drummers/index.js (current gear fields only — gearTimeline
 * historical entries are intentionally excluded, same convention as
 * scripts/build-gear-index.cjs). Dataset snapshot date: ${SNAPSHOT_DATE}.
 *
 * Methodology: a drummer counts once per brand per category (a dual-brand cymbal
 * setup like "Sabian / Zildjian" credits both). Percentages are of the full
 * ${TOTAL_DRUMMERS}-drummer roster, so a category's percentages can sum past 100%
 * when multi-brand setups are common (see "pedals", parsed only from hardware-field
 * segments that mention "pedal", to avoid crediting throne/rack brands).
 *
 * Consumed by: /studies/most-used-gear-brands-metal (packages/frontend/pages) and
 * the bot-facing SSR handler (api/meta/[...path].js).
 */

export const MOST_USED_GEAR_BRANDS = ${JSON.stringify(STUDY, null, 2)};

export default MOST_USED_GEAR_BRANDS;
`;

fs.writeFileSync(outPath, header);

// --- Report --------------------------------------------------------------------------
console.log(`✅ Wrote ${path.relative(path.join(__dirname, '..'), outPath)}`);
console.log(`   Dataset: ${TOTAL_DRUMMERS} drummers, snapshot ${SNAPSHOT_DATE}`);
for (const cat of CATEGORIES) {
  const data = STUDY.categories[cat.key];
  const top = data.ranked[0];
  console.log(
    `   ${cat.label}: ${data.ranked.length} brands, top = ${top ? `${top.brand} (${top.count}, ${top.percent}%)` : 'none'}, ${data.skippedCount} skipped`
  );
}
