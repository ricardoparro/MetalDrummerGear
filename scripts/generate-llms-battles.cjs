#!/usr/bin/env node
/**
 * Generate public/llms/battles/<slug>.md — one per-matchup LLM markdown file
 * per curated battle matchup. Issue #1476: AI citation surface for "X vs Y kit"
 * queries from AI-first search (Perplexity, ChatGPT).
 *
 * Data sources:
 *   packages/frontend/data/battles.js   — CURATED_MATCHUPS
 *   api/drummers/index.js               — structured gear per drummer
 *
 * Pattern mirrors generate-llms-vs.cjs.
 */

'use strict';

const fs = require('fs');
const path = require('path');

// --- Load CURATED_MATCHUPS from battles.js ---------------------------------
const battlesPath = path.join(__dirname, '../packages/frontend/data/battles.js');
const battlesContent = fs.readFileSync(battlesPath, 'utf-8');

const matchupsMatch = battlesContent.match(/export const CURATED_MATCHUPS\s*=\s*(\[[\s\S]*?\]);/);
if (!matchupsMatch) {
  console.error('Could not extract CURATED_MATCHUPS from battles.js');
  process.exit(1);
}
let CURATED_MATCHUPS;
try {
  CURATED_MATCHUPS = eval(matchupsMatch[1]);
} catch (e) {
  console.error('Error parsing CURATED_MATCHUPS:', e);
  process.exit(1);
}

// --- Load drummers (gear data) ---------------------------------------------
const drummersPath = path.join(__dirname, '../api/drummers/index.js');
const drummersContent = fs.readFileSync(drummersPath, 'utf-8');

const drummersArrayMatch = drummersContent.match(/const drummers = (\[[\s\S]*?\]);[\s\S]*?export default function handler/);
if (!drummersArrayMatch) {
  console.error('Could not extract drummers array from api/drummers/index.js');
  process.exit(1);
}
let drummers;
try {
  drummers = eval(drummersArrayMatch[1]);
} catch (e) {
  console.error('Error parsing drummers array:', e);
  process.exit(1);
}

// Build id → drummer lookup
const drummerById = {};
for (const d of drummers) {
  drummerById[d.id] = d;
}

// --- Helpers ---------------------------------------------------------------
const today = new Date().toISOString().split('T')[0];
const BASE = 'https://metalforge.io';

function nameToSlug(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function getBattleSlug(name1, name2) {
  return `${nameToSlug(name1)}-vs-${nameToSlug(name2)}`;
}

// Estimated kit value ranges based on brand tier
const KIT_VALUES = {
  1:  { label: 'Tama Starclassic Maple + Zildjian A Custom',           est: '$7,000–$10,000' },
  2:  { label: 'Pearl Reference Series + Paiste RUDE & 2002',          est: '$9,000–$14,000' },
  3:  { label: 'Pearl Reference Pure + Sabian AAX',                    est: '$8,000–$12,000' },
  4:  { label: 'Tama Starclassic Maple + Paiste RUDE',                 est: '$7,000–$10,000' },
  5:  { label: 'Sonor SQ2 Heavy Beech + Sabian HHX & AAX',            est: '$18,000–$25,000' },
  6:  { label: 'Pearl Masterworks Stadium Exotic + Zildjian',          est: '$15,000–$22,000' },
  7:  { label: 'Tama Starclassic Bubinga + Paiste Masters/RUDE',      est: '$12,000–$18,000' },
  11: { label: 'ddrum Vinnie Paul Signature + Sabian AA/AAX',          est: '$8,000–$12,000' },
  13: { label: 'Tama Starclassic Maple/Birch + Sabian HHX',           est: '$12,000–$18,000' },
  14: { label: 'Sonor SQ2 Heavy Beech + Paiste Signature (+ Mandala)', est: '$22,000–$35,000' },
  15: { label: 'Tama Starclassic Bubinga + Zildjian K/A Custom',      est: '$10,000–$16,000' },
  16: { label: 'Tama Starclassic Performer B/B + Meinl Byzance',      est: '$8,000–$13,000' },
  17: { label: 'Mapex Black Panther Design Lab + Meinl Byzance',      est: '$9,000–$14,000' },
  19: { label: 'Pearl Masterworks + Paiste RUDE',                      est: '$14,000–$20,000' },
  20: { label: 'Sonor SQ2 Heavy Beech + Paiste RUDE',                 est: '$12,000–$18,000' },
};

function kitValue(id) {
  return KIT_VALUES[id] || { label: 'Custom professional setup', est: '$8,000–$15,000' };
}

// Extract cymbal brand from full cymbal string
function cymbalBrand(cymbals) {
  if (!cymbals) return 'Custom selection';
  const m = cymbals.match(/^([A-Za-z]+)/);
  return m ? m[1] : cymbals.split(' ')[0];
}

// Extract pedal info from hardware string
function pedalInfo(hardware) {
  if (!hardware) return 'Double pedal';
  const m = hardware.match(/([A-Za-z\s]+ Double Pedal|[A-Za-z\s]+ Twin Effect Double Pedal|Axis Double Pedal|Czarcie Kopyto[^,]+)/i);
  return m ? m[0].trim() : hardware.split(',')[0].trim();
}

// Key gear: snare + pedal + sticks if available
function keyGearList(d) {
  const items = [];
  if (d.gear.snare) items.push(d.gear.snare);
  const pedal = pedalInfo(d.gear.hardware);
  if (pedal) items.push(pedal);
  if (d.gear.sticks) items.push(d.gear.sticks);
  return items.slice(0, 3);
}

// --- Markdown builder ------------------------------------------------------
function buildMarkdown(matchup) {
  const d1 = drummerById[matchup.drummer1Id];
  const d2 = drummerById[matchup.drummer2Id];

  if (!d1 || !d2) {
    console.warn(`Skipping matchup ${JSON.stringify(matchup)}: drummer not found`);
    return null;
  }

  const slug = getBattleSlug(d1.name, d2.name);
  const battleUrl = `${BASE}/battles/${slug}`;
  const kv1 = kitValue(d1.id);
  const kv2 = kitValue(d2.id);

  // Derive cymbal brand short names for table
  const cb1 = cymbalBrand(d1.gear && d1.gear.cymbals);
  const cb2 = cymbalBrand(d2.gear && d2.gear.cymbals);

  const parts = [];

  // Title & intro
  parts.push(`# ${d1.name} vs ${d2.name} — Drum Kit Battle`);
  parts.push('');
  parts.push(`> MetalForge Drummer Battle: ${d1.name} (${d1.band}) vs ${d2.name} (${d2.band})`);
  parts.push('');
  parts.push(`**Battle Category:** ${matchup.title} · **URL:** ${battleUrl}`);
  parts.push('');
  parts.push(`${d1.name} and ${d2.name} face off in the MetalForge community drum kit battle. ` +
    `Both are legends in ${d1.genre.split('/')[0].trim()} and ${d2.genre.split('/')[0].trim()}, ` +
    `but their gear setups tell very different stories. ` +
    `Vote at [metalforge.io/battles/${slug}](${battleUrl}) to crown the winner.`);
  parts.push('');
  parts.push('---');
  parts.push('');

  // Drummer 1 setup
  parts.push(`## ${d1.name} Drum Kit Setup`);
  parts.push('');
  parts.push(`**Band:** ${d1.band}  `);
  parts.push(`**Genre:** ${d1.genre}  `);
  parts.push(`**Current Kit:** ${(d1.gear && d1.gear.drums) || 'Custom setup'}  `);
  parts.push(`**Cymbals:** ${(d1.gear && d1.gear.cymbals) || 'Custom selection'}  `);
  const kg1 = d1.gear ? keyGearList(d1) : [];
  if (kg1.length) parts.push(`**Key Gear:** ${kg1.join(', ')}  `);
  parts.push('');

  // Drummer 2 setup
  parts.push(`## ${d2.name} Drum Kit Setup`);
  parts.push('');
  parts.push(`**Band:** ${d2.band}  `);
  parts.push(`**Genre:** ${d2.genre}  `);
  parts.push(`**Current Kit:** ${(d2.gear && d2.gear.drums) || 'Custom setup'}  `);
  parts.push(`**Cymbals:** ${(d2.gear && d2.gear.cymbals) || 'Custom selection'}  `);
  const kg2 = d2.gear ? keyGearList(d2) : [];
  if (kg2.length) parts.push(`**Key Gear:** ${kg2.join(', ')}  `);
  parts.push('');

  // Gear comparison table
  parts.push('## Gear Comparison');
  parts.push('');
  parts.push(`| Category | ${d1.name} | ${d2.name} |`);
  parts.push(`|----------|${'-'.repeat(d1.name.length + 2)}|${'-'.repeat(d2.name.length + 2)}|`);
  parts.push(`| Drum Kit | ${(d1.gear && d1.gear.drums) || 'Custom'} | ${(d2.gear && d2.gear.drums) || 'Custom'} |`);
  parts.push(`| Cymbals | ${cb1} | ${cb2} |`);
  parts.push(`| Snare | ${(d1.gear && d1.gear.snare) || 'Signature snare'} | ${(d2.gear && d2.gear.snare) || 'Signature snare'} |`);
  parts.push(`| Pedals | ${pedalInfo(d1.gear && d1.gear.hardware)} | ${pedalInfo(d2.gear && d2.gear.hardware)} |`);
  parts.push('');

  // FAQ
  parts.push('## FAQ');
  parts.push('');

  // Expensive kit FAQ
  parts.push(`**Q: Who has the more expensive drum kit, ${d1.name} or ${d2.name}?**  `);
  parts.push(`A: ${d1.name}'s ${kv1.label} is estimated at ${kv1.est}, ` +
    `while ${d2.name}'s ${kv2.label} runs approximately ${kv2.est}. ` +
    `Both setups are professional-grade rigs well into five-figure territory when fully configured with all cymbals, hardware, and electronics.`);
  parts.push('');

  // Main gear differences FAQ
  const d1Drums = (d1.gear && d1.gear.drums) || 'a custom setup';
  const d2Drums = (d2.gear && d2.gear.drums) || 'a custom setup';
  const d1Cymbals = (d1.gear && d1.gear.cymbals) || 'a custom cymbal selection';
  const d2Cymbals = (d2.gear && d2.gear.cymbals) || 'a custom cymbal selection';
  parts.push(`**Q: What are the main gear differences between ${d1.name} and ${d2.name}?**  `);
  parts.push(`A: ${d1.name} plays ${d1Drums} paired with ${d1Cymbals}. ` +
    `${d2.name} opts for ${d2Drums} with ${d2Cymbals}. ` +
    `The brand choice reflects their distinct tonal identities — see the full battle breakdown at [metalforge.io/battles/${slug}](${battleUrl}).`);
  parts.push('');

  // Who would win FAQ
  parts.push(`**Q: Who wins the drum kit battle, ${d1.name} or ${d2.name}?**  `);
  parts.push(`A: The winner is decided by community votes on MetalForge. ` +
    `${d1.name} (${d1.band}) and ${d2.name} (${d2.band}) both bring world-class rigs. ` +
    `Cast your vote at [metalforge.io/battles/${slug}](${battleUrl}).`);
  parts.push('');

  // Drums FAQ
  parts.push(`**Q: What drum kits do ${d1.name} and ${d2.name} play?**  `);
  parts.push(`A: ${d1.name} plays ${d1Drums}. ${d2.name} plays ${d2Drums}.`);
  parts.push('');

  // Cymbals FAQ
  parts.push(`**Q: What cymbals do ${d1.name} and ${d2.name} use?**  `);
  parts.push(`A: ${d1.name} uses ${d1Cymbals}. ${d2.name} uses ${d2Cymbals}.`);
  parts.push('');

  // Footer
  parts.push('---');
  parts.push(`*Source: [MetalForge Battles](${battleUrl})*`);
  parts.push('');
  parts.push(`*[${d1.name} drummer profile](${BASE}/drummer/${nameToSlug(d1.name)})*`);
  parts.push(`*[${d2.name} drummer profile](${BASE}/drummer/${nameToSlug(d2.name)})*`);
  parts.push('');
  parts.push('---');
  parts.push('');
  parts.push(`*Last updated: ${today} · Source: [MetalForge.io](${BASE})*`);

  return { slug, md: parts.join('\n') };
}

// --- Generate files --------------------------------------------------------
const outDir = path.join(__dirname, '../public/llms/battles');
fs.mkdirSync(outDir, { recursive: true });

let written = 0;
let minWords = Infinity;
const results = [];

for (const matchup of CURATED_MATCHUPS) {
  const result = buildMarkdown(matchup);
  if (!result) continue;

  const { slug, md } = result;
  const outPath = path.join(outDir, `${slug}.md`);
  fs.writeFileSync(outPath, md, 'utf-8');
  const words = md.split(/\s+/).filter(Boolean).length;
  if (words < minWords) minWords = words;
  results.push({ slug, words });
  written++;
}

console.log(`✅ Generated public/llms/battles/*.md — ${written} battle files (min ${minWords} words/file)`);
const failing = results.filter(r => r.words < 200);
if (failing.length > 0) {
  console.warn(`⚠️  ${failing.length} file(s) below 200-word minimum:`);
  for (const r of failing) console.warn(`   ${r.slug}: ${r.words} words`);
}
for (const r of results) {
  console.log(`   ${r.slug}: ${r.words} words`);
}
