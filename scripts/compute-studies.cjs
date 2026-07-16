#!/usr/bin/env node
/**
 * Stats engine for the /studies content family (epic #4763).
 *
 * Deterministic, offline generator — no LLM calls, no network requests.
 *
 * Phase 1 (#4764): reads the drummer roster (api/drummers/index.js), the single
 * source of truth also used by scripts/build-gear-index.cjs, and counts brand
 * usage across five gear categories: kits (drums), snares, cymbals, sticks, and
 * pedals (parsed from hardware). Every drummer contributes at most once per
 * brand per category — a dual-brand cymbal setup ("Sabian AAX / Zildjian A
 * Series") counts toward both Sabian and Zildjian. Output:
 * packages/frontend/data/studies/mostUsedGearBrands.js, consumed by
 * /studies/most-used-gear-brands-metal.
 *
 * Phase 2 (#4765) adds three more computation sections, each writing its own
 * generated file:
 *   - Tempo by subgenre, from packages/frontend/data/metalSongsBpm.js. Output:
 *     data/studies/tempoBySubgenre.js.
 *   - Drum endorsement landscape, merging phase 1's per-category brand rankings
 *     with signature-model counts from drumsticks.js/snares.js. Output:
 *     data/studies/drumEndorsementLandscape.js.
 *   - Kit configurations (bass-pedal setup + cymbal-setup size), from the
 *     roster plus cymbalSetups.js. Output: data/studies/kitConfigurations.js.
 *
 * Run: `node scripts/compute-studies.cjs` — running it twice must produce
 * byte-identical files (verified in the PR for this issue).
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

// Same convention as packages/frontend/App.js's similar-drummers panel
// (`drummer.genre.split(/\s*[\/,]\s*/)`, `genres[0]`): a compound genre string
// like "Progressive Metal / Djent" buckets under its first listed genre.
function primaryGenre(genreStr) {
  return (genreStr || '').split(/\s*[\/,]\s*/)[0].trim();
}

function mean(nums) {
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function median(nums) {
  const sorted = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
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

// slug -> { id, name, slug, band, genre }, for cross-referencing drummer slugs
// found in other data modules (metalSongsBpm.js, drumsticks.js, etc.) back to
// a live roster entry — a slug not in this map gets no /drummer/:slug link.
const ROSTER_BY_SLUG = new Map(
  drummers.map((d) => [drummerSlug(d.name), { id: d.id, name: d.name, slug: drummerSlug(d.name), band: d.band, genre: d.genre }])
);

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

// ===================================================================================
// Study 2/4: Tempo by Subgenre (issue #4765, phase 2/3 of epic #4763)
// ===================================================================================
// Source: packages/frontend/data/metalSongsBpm.js. That module's own header states
// its BPMs are "approximate and based on common tempo markings" — not per-song audio
// analysis. The songs epic's verified-BPM phase (#4759) has not merged as of this
// script's snapshot date, so this study's methodology must say so plainly (binding
// rule 3): every number here traces back to that approximate dataset, not a verified
// one.
const SONGS_BPM_VERIFIED = false; // flip once #4759 (songs epic phase 1) merges

const songsPath = path.join(__dirname, '../packages/frontend/data/metalSongsBpm.js');
const songsContent = fs.readFileSync(songsPath, 'utf-8');
const songsMatch = songsContent.match(/export const metalSongs = (\[[\s\S]*?\]);[\s\S]*?export function getAllBands/);
if (!songsMatch) {
  console.error('Could not extract metalSongs array from data/metalSongsBpm.js');
  process.exit(1);
}
let songs;
try {
  songs = eval(songsMatch[1]);
} catch (e) {
  console.error('Error parsing metalSongs:', e);
  process.exit(1);
}

const TEMPO_RANGE_DEFS = [
  { key: 'slow', min: 40, max: 89, label: 'Doom/Sludge' },
  { key: 'mid', min: 90, max: 129, label: 'Groove/Heavy' },
  { key: 'fast', min: 130, max: 169, label: 'Thrash/Power' },
  { key: 'extreme', min: 170, max: 250, label: 'Death/Black' },
  { key: 'blast', min: 251, max: 400, label: 'Grindcore/Blast' },
];
function tempoRangeKey(bpm) {
  return TEMPO_RANGE_DEFS.find((r) => bpm >= r.min && bpm <= r.max)?.key || 'extreme';
}
function tempoDistribution(list) {
  const dist = { slow: 0, mid: 0, fast: 0, extreme: 0, blast: 0 };
  for (const s of list) dist[tempoRangeKey(s.bpm)]++;
  return dist;
}
function genreLabel(slug) {
  return slug.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
}
function songDrummerLink(slug) {
  const roster = ROSTER_BY_SLUG.get(slug);
  return { slug, name: roster ? roster.name : genreLabel(slug), inRoster: !!roster };
}

const bpms = songs.map((s) => s.bpm);
const genreGroups = new Map();
for (const s of songs) {
  if (!genreGroups.has(s.genre)) genreGroups.set(s.genre, []);
  genreGroups.get(s.genre).push(s);
}

const genreStats = [...genreGroups.entries()]
  .map(([genre, list]) => {
    const genreBpms = list.map((s) => s.bpm);
    return {
      genre,
      label: genreLabel(genre),
      songCount: list.length,
      avgBpm: Math.round(mean(genreBpms) * 10) / 10,
      medianBpm: median(genreBpms),
      minBpm: Math.min(...genreBpms),
      maxBpm: Math.max(...genreBpms),
      tempoDistribution: tempoDistribution(list),
    };
  })
  .sort((a, b) => b.songCount - a.songCount || a.genre.localeCompare(b.genre));

const hallOfSpeed = songs
  .filter((s) => s.bpm >= 200)
  .map((s) => ({
    id: s.id,
    song: s.song,
    band: s.band,
    year: s.year,
    bpm: s.bpm,
    genre: s.genre,
    genreLabel: genreLabel(s.genre),
    drummer: songDrummerLink(s.drummer),
  }))
  .sort((a, b) => b.bpm - a.bpm || a.song.localeCompare(b.song));

const TEMPO_BY_SUBGENRE = {
  generatedAt: SNAPSHOT_DATE,
  totalSongs: songs.length,
  bpmVerified: SONGS_BPM_VERIFIED,
  overall: {
    avgBpm: Math.round(mean(bpms) * 10) / 10,
    medianBpm: median(bpms),
    minBpm: Math.min(...bpms),
    maxBpm: Math.max(...bpms),
    tempoDistribution: tempoDistribution(songs),
  },
  genres: genreStats,
  hallOfSpeed,
};

// --- Self-test -----------------------------------------------------------------------
function selfTestTempo() {
  const errors = [];

  const sumSongCount = genreStats.reduce((a, g) => a + g.songCount, 0);
  if (sumSongCount !== songs.length) {
    errors.push(`genre songCounts sum to ${sumSongCount}, expected ${songs.length}`);
  }

  for (const g of genreStats) {
    const distSum = Object.values(g.tempoDistribution).reduce((a, b) => a + b, 0);
    if (distSum !== g.songCount) {
      errors.push(`[${g.genre}] tempoDistribution sums to ${distSum}, expected songCount ${g.songCount}`);
    }
    if (!Number.isFinite(g.avgBpm) || !Number.isFinite(g.medianBpm)) {
      errors.push(`[${g.genre}] avgBpm/medianBpm not finite`);
    }
    if (g.minBpm > g.medianBpm || g.medianBpm > g.maxBpm) {
      errors.push(`[${g.genre}] min/median/max out of order: ${g.minBpm}/${g.medianBpm}/${g.maxBpm}`);
    }
  }

  const overallDistSum = Object.values(TEMPO_BY_SUBGENRE.overall.tempoDistribution).reduce((a, b) => a + b, 0);
  if (overallDistSum !== songs.length) {
    errors.push(`overall tempoDistribution sums to ${overallDistSum}, expected ${songs.length}`);
  }

  const expectedHallCount = songs.filter((s) => s.bpm >= 200).length;
  if (hallOfSpeed.length !== expectedHallCount) {
    errors.push(`hallOfSpeed has ${hallOfSpeed.length} entries, expected ${expectedHallCount}`);
  }
  if (hallOfSpeed.some((s) => s.bpm < 200)) {
    errors.push('hallOfSpeed contains an entry below 200 BPM');
  }
  for (let i = 1; i < hallOfSpeed.length; i++) {
    if (hallOfSpeed[i - 1].bpm < hallOfSpeed[i].bpm) {
      errors.push('hallOfSpeed is not sorted descending by bpm');
      break;
    }
  }

  if (errors.length > 0) {
    console.error('tempo-by-subgenre self-test FAILED:\n' + errors.map((e) => `  - ${e}`).join('\n'));
    process.exit(1);
  }
}

selfTestTempo();

const tempoOutPath = path.join(outDir, 'tempoBySubgenre.js');
const tempoHeader = `/**
 * Tempo by Subgenre study — average/median/max BPM per subgenre across the
 * ${songs.length}-song curated database, tempo-range distribution, and the
 * 200+ BPM "hall of speed."
 *
 * GENERATED FILE — do not edit by hand.
 * Regenerate with: node scripts/compute-studies.cjs
 *
 * Source of truth: packages/frontend/data/metalSongsBpm.js. That module's BPMs
 * are approximate — sourced from common tempo markings, not per-song verified
 * audio analysis (see its own header comment). The songs epic's verified-BPM
 * phase (issue #4759) has not merged as of this snapshot (bpmVerified: false
 * below); once it has, re-run this script and flip SONGS_BPM_VERIFIED in
 * scripts/compute-studies.cjs. Dataset snapshot date: ${SNAPSHOT_DATE}.
 *
 * Consumed by: /studies/metal-tempo-by-subgenre (packages/frontend/pages) and
 * the bot-facing SSR handler (api/meta/[...path].js).
 */

export const TEMPO_BY_SUBGENRE = ${JSON.stringify(TEMPO_BY_SUBGENRE, null, 2)};

export default TEMPO_BY_SUBGENRE;
`;
fs.writeFileSync(tempoOutPath, tempoHeader);

// ===================================================================================
// Study 3/4: Drum Endorsement Landscape (issue #4765, phase 2/3 of epic #4763)
// ===================================================================================
// Merges phase 1's already-computed per-category brand rankings (STUDY.categories)
// into a cross-category "brand reach" ranking, layers in signature-model counts from
// drumsticks.js (endorsementType) and snares.js (isSignature), and cross-tabs the
// kits category against each drummer's primary genre. Reuses phase 1's STUDY.categories
// rather than re-parsing gear text, so the two studies can never disagree about what a
// "brand" is or how a drummer's gear string was matched.

// --- Brand reach: union of drummers across all 5 categories ------------------------
const reachMap = new Map(); // brand -> { drummerId -> drummer, categories: Set }
for (const cat of CATEGORIES) {
  for (const b of STUDY.categories[cat.key].ranked) {
    if (!reachMap.has(b.brand)) reachMap.set(b.brand, { drummers: new Map(), categories: new Set() });
    const entry = reachMap.get(b.brand);
    entry.categories.add(cat.key);
    for (const d of b.drummers) entry.drummers.set(d.id, d);
  }
}
const brandReach = [...reachMap.entries()]
  .map(([brand, entry]) => {
    const list = [...entry.drummers.values()].sort((a, b) => a.id - b.id);
    return {
      brand,
      count: list.length,
      percent: Math.round((list.length / TOTAL_DRUMMERS) * 1000) / 10,
      categories: CATEGORIES.filter((c) => entry.categories.has(c.key)).map((c) => c.key),
      drummers: list,
    };
  })
  .sort((a, b) => b.count - a.count || a.brand.localeCompare(b.brand));

// --- Signature-model counts: drumsticks.js + snares.js ------------------------------
const drumsticksPath = path.join(__dirname, '../packages/frontend/data/drumsticks.js');
const drumsticksContent = fs.readFileSync(drumsticksPath, 'utf-8');
const drumsticksMatch = drumsticksContent.match(/export const DRUMSTICKS = (\[[\s\S]*?\]);[\s\S]*?export const DRUMMER_STICKS/);
if (!drumsticksMatch) {
  console.error('Could not extract DRUMSTICKS array from data/drumsticks.js');
  process.exit(1);
}
const DRUMSTICKS = eval(drumsticksMatch[1]);

const snaresPath = path.join(__dirname, '../packages/frontend/data/snares.js');
const snaresContent = fs.readFileSync(snaresPath, 'utf-8');
const snaresMatch = snaresContent.match(/export const SNARES = (\[[\s\S]*?\]);[\s\S]*?export const DRUMMER_SNARE/);
if (!snaresMatch) {
  console.error('Could not extract SNARES array from data/snares.js');
  process.exit(1);
}
const SNARES = eval(snaresMatch[1]);

function groupSignatureModels(items, { brandField, endorsedTest, drummerSlugField }) {
  const byBrand = new Map();
  let endorsedCount = 0;
  for (const item of items) {
    if (!endorsedTest(item)) continue;
    endorsedCount++;
    const brand = item[brandField];
    if (!brand) continue;
    if (!byBrand.has(brand)) byBrand.set(brand, { brand, modelCount: 0, drummers: [] });
    const entry = byBrand.get(brand);
    entry.modelCount++;
    const slug = item[drummerSlugField];
    const roster = slug ? ROSTER_BY_SLUG.get(slug) : null;
    entry.drummers.push(roster || { slug, name: slug ? genreLabel(slug) : null, id: null, band: null, genre: null });
  }
  return {
    totalModels: items.length,
    endorsedModelCount: endorsedCount,
    byBrand: [...byBrand.values()].sort((a, b) => b.modelCount - a.modelCount || a.brand.localeCompare(b.brand)),
  };
}

const stickSignatures = groupSignatureModels(DRUMSTICKS, {
  brandField: 'brand',
  endorsedTest: (s) => s.endorsementType === 'signature-model',
  drummerSlugField: 'drummerSlug',
});
const stickArtistEndorsements = groupSignatureModels(DRUMSTICKS, {
  brandField: 'brand',
  endorsedTest: (s) => s.endorsementType === 'artist-endorsement',
  drummerSlugField: 'drummerSlug',
});
const snareSignatures = groupSignatureModels(SNARES, {
  brandField: 'brand',
  endorsedTest: (s) => s.isSignature === true,
  drummerSlugField: 'drummerSlug',
});

// --- Brand x genre: kits category cross-tabbed against each drummer's primary genre -
const kitsGenreMap = new Map(); // genre -> { brand -> count }
const genreTotals = new Map();
for (const b of STUDY.categories.kits.ranked) {
  for (const d of b.drummers) {
    const genre = primaryGenre(ROSTER_BY_SLUG.get(d.slug)?.genre);
    if (!genre) continue;
    if (!kitsGenreMap.has(genre)) kitsGenreMap.set(genre, new Map());
    const brandMap = kitsGenreMap.get(genre);
    brandMap.set(b.brand, (brandMap.get(b.brand) || 0) + 1);
    genreTotals.set(genre, (genreTotals.get(genre) || 0) + 1);
  }
}
// Only genre buckets with >=2 drummers are broken out individually — n=1 buckets are
// too thin to say anything about a brand "pattern," so they're rolled into an honest
// "Other (n=1 genres)" remainder instead of implying a 100%-one-brand finding.
const GENRE_BUCKET_MIN = 2;
const genreBrandMatrix = [...kitsGenreMap.entries()]
  .filter(([genre]) => genreTotals.get(genre) >= GENRE_BUCKET_MIN)
  .map(([genre, brandMap]) => {
    const brands = [...brandMap.entries()]
      .map(([brand, count]) => ({ brand, count }))
      .sort((a, b) => b.count - a.count || a.brand.localeCompare(b.brand));
    return { genre, totalDrummers: genreTotals.get(genre), topBrand: brands[0].brand, topBrandCount: brands[0].count, brands };
  })
  .sort((a, b) => b.totalDrummers - a.totalDrummers || a.genre.localeCompare(b.genre));
const genreBucketDrummerCount = genreBrandMatrix.reduce((a, g) => a + g.totalDrummers, 0);
const otherGenreDrummerCount = [...genreTotals.values()].reduce((a, c) => a + c, 0) - genreBucketDrummerCount;

const DRUM_ENDORSEMENT_LANDSCAPE = {
  generatedAt: SNAPSHOT_DATE,
  totalDrummers: TOTAL_DRUMMERS,
  brandReach,
  signatureModels: {
    sticks: { signature: stickSignatures, artistEndorsement: stickArtistEndorsements },
    snares: { signature: snareSignatures },
    cymbalsCaveat:
      'cymbalSetups.js tracks cymbal line/series per piece but not a per-drummer signature-model flag the way ' +
      'drumsticks.js and snares.js do, so cymbal signature-model counts are not included here — see brandReach ' +
      'above for cymbal brand usage.',
  },
  genreBrandMatrix: {
    bucketMinDrummers: GENRE_BUCKET_MIN,
    buckets: genreBrandMatrix,
    otherGenreDrummerCount,
  },
};

// --- Self-test -----------------------------------------------------------------------
function selfTestEndorsement() {
  const errors = [];

  for (const b of brandReach) {
    const uniqueIds = new Set(b.drummers.map((d) => d.id));
    if (uniqueIds.size !== b.count) {
      errors.push(`[brandReach/${b.brand}] count (${b.count}) != unique drummer ids (${uniqueIds.size})`);
    }
    if (b.count > TOTAL_DRUMMERS) {
      errors.push(`[brandReach/${b.brand}] count (${b.count}) exceeds roster size`);
    }
    if (b.categories.length === 0) {
      errors.push(`[brandReach/${b.brand}] has no source categories`);
    }
  }

  for (const [label, group] of [
    ['sticks.signature', stickSignatures],
    ['sticks.artistEndorsement', stickArtistEndorsements],
    ['snares.signature', snareSignatures],
  ]) {
    const sumModelCount = group.byBrand.reduce((a, b) => a + b.modelCount, 0);
    if (sumModelCount !== group.endorsedModelCount) {
      errors.push(`[${label}] byBrand modelCounts sum to ${sumModelCount}, expected endorsedModelCount ${group.endorsedModelCount}`);
    }
  }
  if (stickSignatures.endorsedModelCount + stickArtistEndorsements.endorsedModelCount > DRUMSTICKS.length) {
    errors.push('sticks signature + artist-endorsement counts exceed total DRUMSTICKS entries');
  }

  for (const bucket of genreBrandMatrix) {
    const sumBrandCounts = bucket.brands.reduce((a, b) => a + b.count, 0);
    if (sumBrandCounts !== bucket.totalDrummers) {
      errors.push(`[genreBrandMatrix/${bucket.genre}] brand counts sum to ${sumBrandCounts}, expected totalDrummers ${bucket.totalDrummers}`);
    }
    if (bucket.totalDrummers < GENRE_BUCKET_MIN) {
      errors.push(`[genreBrandMatrix/${bucket.genre}] has ${bucket.totalDrummers} drummers, below bucketMinDrummers ${GENRE_BUCKET_MIN}`);
    }
  }
  if (otherGenreDrummerCount < 0) {
    errors.push(`otherGenreDrummerCount is negative: ${otherGenreDrummerCount}`);
  }

  if (errors.length > 0) {
    console.error('drum-endorsement-landscape self-test FAILED:\n' + errors.map((e) => `  - ${e}`).join('\n'));
    process.exit(1);
  }
}

selfTestEndorsement();

const endorsementOutPath = path.join(outDir, 'drumEndorsementLandscape.js');
const endorsementHeader = `/**
 * Drum Endorsement Landscape study — which brands endorse the most drummers
 * across the current ${TOTAL_DRUMMERS}-drummer roster (union of kits/snares/
 * cymbals/sticks/pedals brand usage), signature-model counts from drumsticks.js
 * and snares.js, and a kit-brand x primary-genre cross-tab.
 *
 * GENERATED FILE — do not edit by hand.
 * Regenerate with: node scripts/compute-studies.cjs
 *
 * Source of truth: this script's own phase-1 STUDY.categories (api/drummers/index.js
 * gear fields), plus packages/frontend/data/drumsticks.js and data/snares.js.
 * Dataset snapshot date: ${SNAPSHOT_DATE}.
 *
 * Methodology: brandReach counts a drummer once per brand regardless of how many
 * categories that brand appears in for them (e.g. a drummer playing Tama kits and
 * Tama... hardware still counts once for Tama's reach). Signature-model counts are
 * separate: they count named product models (drumsticks.js/snares.js entries), not
 * drummers, so one drummer with two signature snares would count twice there.
 * Cymbals have no per-model signature flag in this codebase (see
 * signatureModels.cymbalsCaveat) — this is a real data-coverage gap, not an
 * implication that no metal drummer has a signature cymbal line. genreBrandMatrix
 * only breaks out genre buckets with >= ${GENRE_BUCKET_MIN} drummers (bucketMinDrummers);
 * the remaining ${otherGenreDrummerCount} drummers are in single-drummer genre buckets,
 * too thin to support a brand "pattern" claim.
 *
 * Consumed by: /studies/drum-endorsement-landscape (packages/frontend/pages) and
 * the bot-facing SSR handler (api/meta/[...path].js).
 */

export const DRUM_ENDORSEMENT_LANDSCAPE = ${JSON.stringify(DRUM_ENDORSEMENT_LANDSCAPE, null, 2)};

export default DRUM_ENDORSEMENT_LANDSCAPE;
`;
fs.writeFileSync(endorsementOutPath, endorsementHeader);

// ===================================================================================
// Study 4/4: Metal Kit Configurations (issue #4765, phase 2/3 of epic #4763)
// ===================================================================================
// Bass-pedal setup (double bass / twin single pedals / double pedal / single pedal),
// parsed from the roster's `gear.drums` + `gear.hardware` fields, and cymbal-setup
// size (piece count), from cymbalSetups.js's verified 56-drummer subset — both
// broken down by each drummer's primary genre.

// --- Bass-pedal configuration -------------------------------------------------------
// Classification priority (checked in order, first match wins):
//   1. drums field says "Bass Drums" (plural — one drummer spells out two distinct
//      shell sizes joined by "&", another says "x2"; both are plural "Bass Drums" in
//      the source text) -> physical twin kick drums ("double bass"), regardless of
//      what pedal hardware is also listed (a double-bass setup can still list "Double
//      Pedal" hardware, which this study treats as secondary to the physical kit).
//   2. hardware field says "Single Pedal(s) (x2)" -> one kick, two independent single
//      pedals (functionally double-kick, mechanically different from a double pedal).
//   3. hardware field says "Double Pedal" -> one kick, one twin-beater pedal.
//   4. hardware field says "Single ... Pedal" (and not plural "Pedals") -> one kick,
//      one single-beater pedal — the traditional setup.
//   5. Anything else (e.g. a generic "Bass Drum Pedals" with no single/double
//      qualifier) is left unspecified rather than guessed.
function classifyPedalSetup(drums, hardware) {
  if (/\bbass drums\b/i.test(drums)) return 'doubleBass';
  if (/single pedals?\s*\(x\s*2\)/i.test(hardware)) return 'twinSinglePedals';
  if (/double pedal/i.test(hardware)) return 'doublePedal';
  if (/single (bass drum )?pedal\b/i.test(hardware) && !/pedals\b/i.test(hardware)) return 'singlePedal';
  return 'unspecified';
}
const PEDAL_CONFIG_KEYS = ['doubleBass', 'twinSinglePedals', 'doublePedal', 'singlePedal', 'unspecified'];
function emptyPedalCounts() {
  return { doubleBass: 0, twinSinglePedals: 0, doublePedal: 0, singlePedal: 0, unspecified: 0 };
}

const pedalOverall = emptyPedalCounts();
const pedalByGenre = new Map(); // genre -> counts
const pedalGenreTotals = new Map();
for (const d of drummers) {
  const config = classifyPedalSetup(d.gear?.drums || '', d.gear?.hardware || '');
  pedalOverall[config]++;
  const genre = primaryGenre(d.genre);
  if (!genre) continue;
  if (!pedalByGenre.has(genre)) pedalByGenre.set(genre, emptyPedalCounts());
  pedalByGenre.get(genre)[config]++;
  pedalGenreTotals.set(genre, (pedalGenreTotals.get(genre) || 0) + 1);
}
const pedalConfigByGenre = [...pedalByGenre.entries()]
  .filter(([genre]) => pedalGenreTotals.get(genre) >= GENRE_BUCKET_MIN)
  .map(([genre, counts]) => ({ genre, totalDrummers: pedalGenreTotals.get(genre), ...counts }))
  .sort((a, b) => b.totalDrummers - a.totalDrummers || a.genre.localeCompare(b.genre));

// --- Cymbal-setup size (piece count), from cymbalSetups.js's verified subset -------
const cymbalSetupsPath = path.join(__dirname, '../packages/frontend/data/cymbalSetups.js');
const cymbalSetupsContent = fs.readFileSync(cymbalSetupsPath, 'utf-8');
const cymbalSetupsMatch = cymbalSetupsContent.match(/export const CYMBAL_SETUPS = (\[[\s\S]*?\]);[\s\S]*?export const DRUMMER_CYMBALS/);
if (!cymbalSetupsMatch) {
  console.error('Could not extract CYMBAL_SETUPS array from data/cymbalSetups.js');
  process.exit(1);
}
const CYMBAL_SETUPS = eval(cymbalSetupsMatch[1]);

const PIECE_TYPES = ['hi-hat', 'crash', 'ride', 'china', 'splash', 'stack', 'other'];
const pieceTypeCounts = Object.fromEntries(PIECE_TYPES.map((t) => [t, 0]));
for (const setup of CYMBAL_SETUPS) {
  for (const piece of setup.pieces) {
    pieceTypeCounts[PIECE_TYPES.includes(piece.type) ? piece.type : 'other']++;
  }
}

const setupSizes = CYMBAL_SETUPS.map((s) => ({ drummerSlug: s.drummerSlug, pieceCount: s.pieces.length }));
const pieceCounts = setupSizes.map((s) => s.pieceCount);

const cymbalSizeByGenreMap = new Map();
for (const s of setupSizes) {
  const genre = primaryGenre(ROSTER_BY_SLUG.get(s.drummerSlug)?.genre);
  if (!genre) continue;
  if (!cymbalSizeByGenreMap.has(genre)) cymbalSizeByGenreMap.set(genre, []);
  cymbalSizeByGenreMap.get(genre).push(s.pieceCount);
}
const cymbalSizeByGenre = [...cymbalSizeByGenreMap.entries()]
  .filter(([, counts]) => counts.length >= GENRE_BUCKET_MIN)
  .map(([genre, counts]) => ({
    genre,
    datasetSize: counts.length,
    avgPieces: Math.round(mean(counts) * 10) / 10,
    medianPieces: median(counts),
  }))
  .sort((a, b) => b.datasetSize - a.datasetSize || a.genre.localeCompare(b.genre));

// --- Explicit full shell configurations (small supplementary n) --------------------
// gear.drums normally names only brand/series, not shell sizes. A handful of roster
// entries additionally spell out every shell size in parentheses — those are pulled
// out here verbatim rather than invented for the rest of the roster.
//
// Parsing: every `<n>"` or `<n>"x<n>"` token in the parenthetical is one shell size.
// The bass-drum size(s) are whichever tokens appear before the word "Bass" (its own
// comma segment may additionally say "x2", meaning that one size is doubled — see
// Mario Duplantier below, whose two physical kicks share a single size). Every
// remaining token (toms + floor toms) is counted as one shell each.
const SHELL_CONFIG_RE = /\((?=[^)]*bass)(?=[^)]*(tom|floor))[^)]*\)/i;
const SIZE_TOKEN_RE = /\d+"(?:x\d+"?)?/g;
function countSizeTokens(str) {
  return (str.match(SIZE_TOKEN_RE) || []).length;
}
const explicitShellConfigs = [];
for (const d of drummers) {
  const drumsText = d.gear?.drums || '';
  const match = drumsText.match(SHELL_CONFIG_RE);
  if (!match) continue;
  const detail = match[0];
  const bassIdx = detail.search(/bass/i);
  const rawBassTokenCount = countSizeTokens(detail.slice(0, bassIdx));
  const bassSegmentEnd = detail.indexOf(',', bassIdx);
  const bassSegment = detail.slice(bassIdx, bassSegmentEnd === -1 ? undefined : bassSegmentEnd);
  const bassCount = rawBassTokenCount * (/x\s*2/i.test(bassSegment) ? 2 : 1);
  const tomCount = Math.max(countSizeTokens(detail) - rawBassTokenCount, 0);
  explicitShellConfigs.push({
    drummerName: d.name,
    drummerSlug: drummerSlug(d.name),
    band: d.band,
    genre: primaryGenre(d.genre),
    raw: drumsText,
    bassCount,
    tomCount,
    totalShells: bassCount + tomCount,
  });
}
explicitShellConfigs.sort((a, b) => b.totalShells - a.totalShells || a.drummerName.localeCompare(b.drummerName));

const KIT_CONFIGURATIONS = {
  generatedAt: SNAPSHOT_DATE,
  totalDrummers: TOTAL_DRUMMERS,
  pedalConfig: {
    overall: pedalOverall,
    bucketMinDrummers: GENRE_BUCKET_MIN,
    byGenre: pedalConfigByGenre,
  },
  cymbalSetupSize: {
    datasetSize: CYMBAL_SETUPS.length,
    avgPieces: Math.round(mean(pieceCounts) * 10) / 10,
    medianPieces: median(pieceCounts),
    minPieces: Math.min(...pieceCounts),
    maxPieces: Math.max(...pieceCounts),
    bucketMinDrummers: GENRE_BUCKET_MIN,
    byGenre: cymbalSizeByGenre,
    pieceTypeCounts,
  },
  explicitShellConfigs,
};

// --- Self-test -----------------------------------------------------------------------
function selfTestKitConfigurations() {
  const errors = [];

  const pedalSum = PEDAL_CONFIG_KEYS.reduce((a, k) => a + pedalOverall[k], 0);
  if (pedalSum !== TOTAL_DRUMMERS) {
    errors.push(`pedalConfig.overall sums to ${pedalSum}, expected ${TOTAL_DRUMMERS}`);
  }
  for (const bucket of pedalConfigByGenre) {
    const bucketSum = PEDAL_CONFIG_KEYS.reduce((a, k) => a + bucket[k], 0);
    if (bucketSum !== bucket.totalDrummers) {
      errors.push(`[pedalConfig/${bucket.genre}] counts sum to ${bucketSum}, expected totalDrummers ${bucket.totalDrummers}`);
    }
  }

  if (CYMBAL_SETUPS.length === 0) errors.push('CYMBAL_SETUPS is empty');
  const pieceTypeSum = Object.values(pieceTypeCounts).reduce((a, b) => a + b, 0);
  const totalPieces = CYMBAL_SETUPS.reduce((a, s) => a + s.pieces.length, 0);
  if (pieceTypeSum !== totalPieces) {
    errors.push(`pieceTypeCounts sums to ${pieceTypeSum}, expected total pieces ${totalPieces}`);
  }
  if (!Number.isFinite(KIT_CONFIGURATIONS.cymbalSetupSize.avgPieces)) {
    errors.push('cymbalSetupSize.avgPieces is not finite');
  }
  for (const g of cymbalSizeByGenre) {
    if (g.datasetSize < GENRE_BUCKET_MIN) {
      errors.push(`[cymbalSetupSize/${g.genre}] datasetSize ${g.datasetSize} below bucketMinDrummers ${GENRE_BUCKET_MIN}`);
    }
  }

  for (const c of explicitShellConfigs) {
    if (c.totalShells <= 0) errors.push(`[explicitShellConfigs/${c.drummerSlug}] non-positive totalShells`);
  }

  if (errors.length > 0) {
    console.error('kit-configurations self-test FAILED:\n' + errors.map((e) => `  - ${e}`).join('\n'));
    process.exit(1);
  }
}

selfTestKitConfigurations();

const kitConfigOutPath = path.join(outDir, 'kitConfigurations.js');
const kitConfigHeader = `/**
 * Kit Configurations study — bass-pedal setup (double bass / twin single pedals /
 * double pedal / single pedal) across all ${TOTAL_DRUMMERS} roster drummers, and
 * cymbal-setup size (piece count) across cymbalSetups.js's verified
 * ${CYMBAL_SETUPS.length}-drummer subset, both broken down by primary genre.
 *
 * GENERATED FILE — do not edit by hand.
 * Regenerate with: node scripts/compute-studies.cjs
 *
 * Source of truth: api/drummers/index.js (gear.drums + gear.hardware, current gear
 * only) and packages/frontend/data/cymbalSetups.js. Dataset snapshot date: ${SNAPSHOT_DATE}.
 *
 * Methodology: pedalConfig classification is text-pattern based against the literal
 * drums/hardware strings (see classifyPedalSetup in scripts/compute-studies.cjs) —
 * "unspecified" means neither field contained an unambiguous single/double-pedal
 * marker, not that the drummer has no pedal. gear.drums names only brand/series for
 * most of the roster, not full shell sizes, so a roster-wide "kit pieces" table isn't
 * possible from this data; explicitShellConfigs instead lists the ${explicitShellConfigs.length}
 * roster entries whose drums field does spell out every shell size, verbatim, as a
 * small supplementary table rather than a genre-wide claim. cymbalSetupSize covers
 * only the ${CYMBAL_SETUPS.length} of ${TOTAL_DRUMMERS} drummers cymbalSetups.js has parsed
 * (gear.verified: true subset) — see that module's own header for the excluded list.
 * byGenre breakdowns only include genre buckets with >= ${GENRE_BUCKET_MIN} drummers.
 *
 * Consumed by: /studies/metal-kit-configurations (packages/frontend/pages) and the
 * bot-facing SSR handler (api/meta/[...path].js).
 */

export const KIT_CONFIGURATIONS = ${JSON.stringify(KIT_CONFIGURATIONS, null, 2)};

export default KIT_CONFIGURATIONS;
`;
fs.writeFileSync(kitConfigOutPath, kitConfigHeader);

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

console.log(`✅ Wrote ${path.relative(path.join(__dirname, '..'), tempoOutPath)}`);
console.log(`   Dataset: ${songs.length} songs, bpmVerified=${SONGS_BPM_VERIFIED}`);
console.log(`   Overall: avg ${TEMPO_BY_SUBGENRE.overall.avgBpm} BPM, ${hallOfSpeed.length} songs >= 200 BPM`);
console.log(`   Top genre by song count: ${genreStats[0].label} (${genreStats[0].songCount} songs, avg ${genreStats[0].avgBpm} BPM)`);

console.log(`✅ Wrote ${path.relative(path.join(__dirname, '..'), endorsementOutPath)}`);
console.log(`   Brand reach top: ${brandReach[0].brand} (${brandReach[0].count} drummers, ${brandReach[0].percent}%)`);
console.log(`   Stick signature models: ${stickSignatures.endorsedModelCount}, snare signature models: ${snareSignatures.endorsedModelCount}`);
console.log(`   Genre buckets (>=${GENRE_BUCKET_MIN} drummers): ${genreBrandMatrix.length}`);

console.log(`✅ Wrote ${path.relative(path.join(__dirname, '..'), kitConfigOutPath)}`);
console.log(`   Pedal config: ${JSON.stringify(pedalOverall)}`);
console.log(`   Cymbal setup size: ${CYMBAL_SETUPS.length} drummers, avg ${KIT_CONFIGURATIONS.cymbalSetupSize.avgPieces} pieces`);
console.log(`   Explicit shell configs: ${explicitShellConfigs.length}`);
