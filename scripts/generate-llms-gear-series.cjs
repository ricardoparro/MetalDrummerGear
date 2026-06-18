#!/usr/bin/env node
/**
 * Generate public/llms/gear-series/<brand-slug>-<series-slug>.md
 * One AI-citable markdown file per brand/series with ≥2 drummers.
 * Issue #1271: last major per-page-type LLM gap — gear series pages.
 *
 * Data sources:
 *   packages/frontend/data/gearIndex.js — GEAR_INDEX (brand → series → drummers)
 *   api/drummers/index.js               — id → {name, band} lookup
 */

'use strict';

const fs = require('fs');
const path = require('path');

// ── Extract GEAR_INDEX ──────────────────────────────────────────────────────

const gearIndexPath = path.join(__dirname, '../packages/frontend/data/gearIndex.js');
const gearIndexContent = fs.readFileSync(gearIndexPath, 'utf-8');

const gearIndexMatch = gearIndexContent.match(/export const GEAR_INDEX\s*=\s*(\{[\s\S]*?\n\});\s*\n/);
if (!gearIndexMatch) {
  console.error('Could not extract GEAR_INDEX from gearIndex.js');
  process.exit(1);
}

let GEAR_INDEX;
try {
  GEAR_INDEX = eval('(' + gearIndexMatch[1] + ')');
} catch (e) {
  console.error('Error parsing GEAR_INDEX:', e.message);
  process.exit(1);
}

// ── Extract id → band mapping from api/drummers/index.js ───────────────────

const drummersPath = path.join(__dirname, '../api/drummers/index.js');
const drummersContent = fs.readFileSync(drummersPath, 'utf-8');

const idToBand = {};
const idNameBandRe = /^\s{4}id:\s*(\d+),\n\s{4}name:\s*'([^']+)',\n\s{4}band:\s*'([^']+)'/gm;
let m;
while ((m = idNameBandRe.exec(drummersContent)) !== null) {
  idToBand[Number(m[1])] = { name: m[2], band: m[3] };
}

// ── Slugify (same logic as gearSeriesPages.js) ──────────────────────────────

function slugify(str) {
  return String(str)
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ── Category + price inference ───────────────────────────────────────────────

const CYMBAL_BRANDS = new Set(['Meinl', 'Paiste', 'Sabian', 'Zildjian']);

function inferCategory(brand, series) {
  if (brand === 'Vic Firth') return 'Drumsticks';
  if (CYMBAL_BRANDS.has(brand)) return 'Cymbals';
  const combined = `${brand} ${series}`.toLowerCase();
  if (/double pedal|speed cobra|falcon pedal|iron cobra/.test(combined)) return 'Hardware / Pedals';
  if (/14x|15x|snare/.test(combined) || /s\.l\.p\.|slp/.test(combined)) return 'Snare Drums';
  return 'Drums / Kits';
}

const PRICE_RANGES = {
  'Drumsticks':        '$10–$30 per pair',
  'Cymbals':           '$1,500–$4,000 (set)',
  'Hardware / Pedals': '$300–$700',
  'Snare Drums':       '$350–$800',
  'Drums / Kits':      '$2,500–$8,000',
};

// ── Gear spec hints from series name ────────────────────────────────────────

function inferSpecBullets(brand, series) {
  const combined = `${brand} ${series}`.toLowerCase();
  const lines = [];

  if (brand === 'Vic Firth') {
    if (/5a/.test(combined)) lines.push('**Size:** 5A — standard taper, lighter feel, preferred for speed');
    if (/5b/.test(combined)) lines.push('**Size:** 5B — heavier than 5A, more projection for loud stages');
    if (/2b/.test(combined)) lines.push('**Size:** 2B — large diameter, maximum power for heavy metal');
    if (/extreme/.test(combined)) lines.push('**Tip:** Nylon tip for extended durability');
    lines.push('**Material:** Hickory — standard for durability and rebound');
    lines.push('**Finish:** Natural lacquer');
  } else if (CYMBAL_BRANDS.has(brand)) {
    if (/byzance/.test(combined)) {
      lines.push('**Alloy:** B20 bronze hand-hammered in Turkey');
      lines.push('**Sound:** Dark, complex wash — articulate attack');
      lines.push('**Finish:** Traditional or Brilliant options');
    } else if (/rude/.test(combined)) {
      lines.push('**Alloy:** CuSn8 bronze');
      lines.push('**Sound:** Loud, cutting, built for rock and metal volume');
      lines.push('**Profile:** Heavy weight for maximum projection');
    } else if (/aax|hhx/.test(combined)) {
      lines.push('**Alloy:** B20 bronze');
      lines.push('**Sound:** Brilliant, focused — cuts through high-gain guitar');
      lines.push('**Finish:** Brilliant or Natural options');
    } else if (/a custom|k custom/.test(combined)) {
      lines.push('**Alloy:** B20 bronze');
      lines.push('**Sound:** Versatile — warm lows, bright attack');
      lines.push('**Sizes:** Hi-hats 14", crashes 16"–19", ride 20"–22"');
    }
  } else if (/double pedal|speed cobra|falcon/.test(combined)) {
    if (/speed cobra/.test(combined)) {
      lines.push('**Drive:** Cobra Coil spring system for rebound');
      lines.push('**Footboard:** Flexi-Glide surface');
      lines.push('**Cam:** Rotating Speedo Ring round cam');
    } else if (/demon drive/.test(combined)) {
      lines.push('**Drive:** Demon Direct Drive — direct linkage to beater');
      lines.push('**Adjustability:** Multi-step beater angle, spring tension');
    } else if (/9000 series/.test(combined)) {
      lines.push('**Drive:** Direct Drive with Delta-Lock cam');
      lines.push('**Footboard:** Low-profile, elongated board');
    } else if (/falcon/.test(combined)) {
      lines.push('**Drive:** Falcon cam — versatile chain/strap options');
      lines.push('**Material:** Aluminum alloy frame');
    } else if (/eliminator/.test(combined)) {
      lines.push('**Drive:** Cam-driven with interchangeable cams (Quad, Round, Offset)');
      lines.push('**Footboard:** Extended PowerShifter footboard');
    }
    lines.push('**Type:** Double bass drum pedal');
  } else if (/s\.l\.p\.|slp/.test(combined) || /14x|15x/.test(combined)) {
    if (/g-maple/.test(combined)) {
      lines.push('**Shell:** G-Maple (hard maple + birch hybrid)');
      lines.push('**Size:** 14"x6.5"');
    } else if (/big black steel/.test(combined)) {
      lines.push('**Shell:** Steel');
      lines.push('**Size:** 14"x6.5"');
      lines.push('**Finish:** Matte black');
    } else if (/dios.*14x/.test(combined)) {
      lines.push('**Shell:** Maple');
      lines.push('**Size:** 14"x6.5"');
    } else if (/reference.*14x6.5.*brass/.test(combined)) {
      lines.push('**Shell:** Brass');
      lines.push('**Size:** 14"x6.5"');
    } else if (/masters.*14x5\.5.*maple/.test(combined)) {
      lines.push('**Shell:** Maple');
      lines.push('**Size:** 14"x5.5"');
    }
    lines.push('**Type:** Snare Drum');
  } else {
    // Drum kit series
    if (/starclassic maple/.test(combined) && !/birch/.test(combined)) {
      lines.push('**Shell:** 100% Maple — warm low frequencies, full tone');
      lines.push('**Configuration:** Bass drum + toms + floor toms (custom configurations)');
    } else if (/starclassic bubinga/.test(combined)) {
      lines.push('**Shell:** Bubinga — dense hardwood, punchy attack and warmth');
    } else if (/starclassic walnut\/birch/.test(combined)) {
      lines.push('**Shell:** Walnut/Birch hybrid — balanced warmth and projection');
    } else if (/starclassic maple\/birch/.test(combined)) {
      lines.push('**Shell:** Maple/Birch hybrid — versatile tonal response');
    } else if (/starclassic/.test(combined)) {
      lines.push('**Shell:** Maple or Bubinga options — flagship series for pros');
    } else if (/reference pure/.test(combined)) {
      lines.push('**Shell:** 6-ply Maple/Mahogany — deep resonance');
      lines.push('**Lugs:** Free-floating for sustain');
    } else if (/reference/.test(combined)) {
      lines.push('**Shell:** SST (Superior Shell Technology) — maple/mahogany composite');
      lines.push('**Construction:** Reference-grade hardware throughout');
    } else if (/masterworks/.test(combined)) {
      lines.push('**Shell:** Custom exotic veneers over standard shell');
      lines.push('**Tier:** Pearl\'s highest custom production tier');
    } else if (/masters maple complete/.test(combined)) {
      lines.push('**Shell:** 100% Maple — 6-ply');
      lines.push('**Hardware:** Free-Floating snare system optional');
    } else if (/sq2 heavy beech/.test(combined)) {
      lines.push('**Shell:** Heavy Beech — dense, focused attack');
      lines.push('**Configuration:** Custom sizes — Haake uses 24"x18" bass + 5 toms');
    } else if (/sq2/.test(combined)) {
      lines.push('**Shell:** Configurable — Maple, Beech, or Birch options');
      lines.push('**Tier:** Sonor\'s pro custom line');
    } else if (/dios/.test(combined)) {
      lines.push('**Shell:** Maple/Poplar hybrid');
      lines.push('**Hardware:** Black chrome');
    }
    lines.push('**Type:** Acoustic Drum Kit');
  }

  return lines;
}

// ── Build drummer note from configString ─────────────────────────────────────

function buildNote(configString, category) {
  if (!configString) return 'pro-level configuration';
  const cs = String(configString);
  // For cymbals, extract sizes if present
  const sizeMatch = cs.match(/\(([^)]+)\)/);
  if (sizeMatch && category === 'Cymbals') {
    const sizes = sizeMatch[1].replace(/\s+/g, ' ').trim();
    return `${sizes}`;
  }
  // For pedals/hardware with throne combos
  if (cs.includes(',') && category === 'Hardware / Pedals') {
    const parts = cs.split(',').map(p => p.trim());
    return parts.join(' + ');
  }
  return 'standard configuration';
}

// ── Markdown template ─────────────────────────────────────────────────────────

const BASE_URL = 'https://metalforge.io';
const today = new Date().toISOString().split('T')[0];

function buildMarkdown(brand, series, drummers) {
  const category = inferCategory(brand, series);
  const priceRange = PRICE_RANGES[category];
  const brandSlug = slugify(brand);
  const seriesSlug = slugify(series);
  const pageUrl = `${BASE_URL}/gear/${brandSlug}/${seriesSlug}/drummers-using`;

  // Enrich with band info
  const enriched = drummers.map(d => ({
    ...d,
    band: (idToBand[d.id] || {}).band || '',
  }));

  const proList = enriched.length > 2
    ? `${enriched.slice(0, -1).map(d => d.name).join(', ')}, and ${enriched[enriched.length - 1].name}`
    : enriched.map(d => d.name).join(' and ');

  const relatedQuery = category === 'Cymbals'
    ? `${brand} cymbals for metal`
    : category === 'Drumsticks'
    ? `drumsticks for metal drumming`
    : category === 'Hardware / Pedals'
    ? `double bass pedal for metal`
    : category === 'Snare Drums'
    ? `${brand} snare drums for metal`
    : `${brand} drum kits for metal`;

  const specBullets = inferSpecBullets(brand, series);

  const parts = [];

  // Header
  parts.push(`# ${brand} ${series} — ${category} | MetalForge`);
  parts.push('');
  parts.push(`> The ${brand} ${series} is a pro-grade ${category.toLowerCase()} choice used by ${enriched.length} metal drummers in the MetalForge database.`);
  parts.push('');
  parts.push(`**Brand:** ${brand}  `);
  parts.push(`**Series:** ${series}  `);
  parts.push(`**Category:** ${category}  `);
  parts.push(`**Estimated Price:** ${priceRange}  `);
  parts.push(`**Drummers Using It:** ${enriched.length}  `);
  parts.push('');
  parts.push('---');
  parts.push('');

  // Drummers section
  parts.push(`## Metal Drummers Who Use the ${brand} ${series}`);
  parts.push('');
  for (const d of enriched) {
    const bandStr = d.band ? ` (${d.band})` : '';
    const note = buildNote(d.configString, category);
    const link = `[${d.name}](${BASE_URL}/drummer/${d.slug})`;
    parts.push(`- **${link}**${bandStr} — ${note}`);
  }
  parts.push('');
  parts.push(`See all ${enriched.length} drummers on the [${brand} ${series} gear page](${pageUrl}).`);
  parts.push('');

  // Gear specs section
  if (specBullets.length > 0) {
    parts.push('## Gear Specifications');
    parts.push('');
    for (const b of specBullets) parts.push(b);
    parts.push('');
  }

  // Why pros choose it
  parts.push(`## Why Metal Drummers Choose the ${brand} ${series}`);
  parts.push('');
  parts.push(buildWhySection(brand, series, category, enriched));
  parts.push('');

  // FAQ
  parts.push('## Frequently Asked Questions');
  parts.push('');

  parts.push(`**Q: Which metal drummers use the ${brand} ${series}?**`);
  parts.push(`A: ${enriched.length} metal drummers in the MetalForge database play the ${brand} ${series}: ${proList}. Each profile includes their exact setup and full kit configuration.`);
  parts.push('');

  parts.push(`**Q: Is the ${brand} ${series} good for metal drumming?**`);
  parts.push(`A: Yes — the ${brand} ${series} is a proven metal choice, endorsed by ${enriched.length} professional drummers across death, thrash, progressive, and groove metal. ${enriched[0].name}${enriched[0].band ? ` of ${enriched[0].band}` : ''} is among the signature players relying on this ${category.toLowerCase()} for high-intensity performance.`);
  parts.push('');

  parts.push(`**Q: How much does the ${brand} ${series} cost?**`);
  parts.push(`A: The ${brand} ${series} is estimated at ${priceRange} street price. Actual pricing varies by retailer, finish, and configuration. Check Thomann (EU) or Sweetwater (US) for current deals.`);
  parts.push('');

  parts.push(`**Q: Where can I find more ${brand} gear used by pro metal drummers?**`);
  parts.push(`A: MetalForge tracks all ${brand} series used by professional metal drummers. Visit [${pageUrl}](${pageUrl}) for the full drummer list with exact configurations, or search MetalForge for more ${brand} gear data.`);
  parts.push('');

  // Footer
  parts.push('---');
  parts.push('');
  parts.push(`*Source: [metalforge.io/gear/${brandSlug}/${seriesSlug}/drummers-using](${pageUrl}) · Last updated: ${today}*`);

  return parts.join('\n');
}

function buildWhySection(brand, series, category, drummers) {
  const names = drummers.slice(0, 3).map(d => d.name + (d.band ? ` (${d.band})` : ''));
  const combined = `${brand} ${series}`.toLowerCase();

  if (category === 'Drumsticks') {
    return `The ${brand} ${series} is a staple for metal drummers who need durability and consistent feel at high velocities. Pros like ${names.join(', ')} rely on the balanced weight and rebound profile of American hickory construction to execute rapid double-stroke rolls, blast beats, and heavy accents without fatigue. The ${series} model is particularly favored in live metal settings where power and articulation are equally important.`;
  }
  if (category === 'Cymbals') {
    return `The ${brand} ${series} cymbals are a go-to choice in the metal scene for their cutting projection and defined attack. Players like ${names.join(', ')} choose this series because it can punch through high-gain guitar walls in live and studio settings. The ${series} line delivers consistent response across crashes, rides, and hi-hats — essential when drummers need reliable articulation at extreme tempos.`;
  }
  if (category === 'Hardware / Pedals') {
    return `The ${brand} ${series} double pedal is trusted by metal's elite for its mechanical precision and low latency response. Drummers like ${names.join(', ')} depend on its consistent spring tension and direct drive feel for blazing double bass passages, including blast beats and polyrhythmic patterns at 200+ BPM. The pedal's adjustability allows each drummer to dial in the exact feel needed for their style.`;
  }
  if (category === 'Snare Drums') {
    return `The ${brand} ${series} snare is a metal stage workhorse prized for sharp crack and controlled overtones. Drummers like ${names.join(', ')} choose this snare because its ${/steel|brass/.test(combined) ? 'metal shell delivers maximum punch and projection' : 'maple shell balances warmth with cutting attack'} — critical when competing with distorted guitars on stage. The tight response and focused tone make it ideal for fast metal snare work across all sub-genres.`;
  }
  // Drums/kits
  return `The ${brand} ${series} is one of the most respected drum kit series in professional metal drumming. Players including ${names.join(', ')} choose this kit for its ${/bubinga/.test(combined) ? 'punchy bubinga shells and focused attack' : /walnut/.test(combined) ? 'warm walnut resonance combined with birch clarity' : /beech/.test(combined) ? 'heavy beech shells for dense, focused tone' : 'reliable maple construction and consistent tone across all dynamics'}. The ${series} stands up to the physical demands of metal touring — heavy hitting, extreme tempos, and constant travel.`;
}

// ── Main: iterate and write ───────────────────────────────────────────────────

const outDir = path.join(__dirname, '../public/llms/gear-series');
fs.mkdirSync(outDir, { recursive: true });

let written = 0;
let skipped = 0;
let minWords = Infinity;
const generated = [];

for (const [brand, seriesObj] of Object.entries(GEAR_INDEX)) {
  const brandSlug = slugify(brand);
  for (const [series, drummers] of Object.entries(seriesObj)) {
    if (!Array.isArray(drummers) || drummers.length < 2) {
      skipped++;
      continue;
    }
    const seriesSlug = slugify(series);
    const filename = `${brandSlug}-${seriesSlug}.md`;
    const md = buildMarkdown(brand, series, drummers);
    const words = md.split(/\s+/).filter(Boolean).length;

    if (words < 150) {
      console.warn(`⚠️  ${filename}: only ${words} words — below 150 minimum`);
    }

    fs.writeFileSync(path.join(outDir, filename), md, 'utf-8');
    if (words < minWords) minWords = words;
    generated.push({ filename, brand, series, drummers: drummers.length, words });
    written++;
  }
}

console.log(`\n✅ Generated public/llms/gear-series/*.md`);
console.log(`   ${written} files written, ${skipped} skipped (< 2 drummers)`);
console.log(`   Min words per file: ${minWords}`);
console.log('');
for (const g of generated) {
  console.log(`   ${g.filename} — ${g.drummers} drummers, ${g.words} words`);
}
