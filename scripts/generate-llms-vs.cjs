#!/usr/bin/env node
/**
 * Generate public/llms/vs/<slug>.md — one per-pair markdown file per curated
 * drummer vs drummer comparison. Issue #1276: per-comparison LLM markdown surface.
 *
 * Data sources:
 *   packages/frontend/data/drummerComparisons.js — curated comparison pairs
 *   api/drummers/index.js — per-drummer gear data and band info
 */

const fs = require('fs');
const path = require('path');

// ── Extract drummerComparisons ─────────────────────────────────────────────
const comparisonsPath = path.join(__dirname, '../packages/frontend/data/drummerComparisons.js');
const comparisonsContent = fs.readFileSync(comparisonsPath, 'utf-8');

const objectMatch = comparisonsContent.match(/export const drummerComparisons\s*=\s*(\{[\s\S]*?\});\s*\n\/\*\*/);
if (!objectMatch) {
  console.error('Could not extract drummerComparisons object from packages/frontend/data/drummerComparisons.js');
  process.exit(1);
}

let drummerComparisons;
try {
  drummerComparisons = eval('(' + objectMatch[1] + ')');
} catch (e) {
  console.error('Error parsing drummerComparisons:', e);
  process.exit(1);
}

// ── Extract drummer gear data ──────────────────────────────────────────────
const drummersPath = path.join(__dirname, '../api/drummers/index.js');
const drummersContent = fs.readFileSync(drummersPath, 'utf-8');

const arrayMatch = drummersContent.match(/const drummers = (\[[\s\S]*?\]);[\s\S]*?export default function handler/);
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

// Build slug → drummer lookup
function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

const drummerBySlug = {};
for (const d of drummers) {
  drummerBySlug[slugify(d.name)] = d;
}

const today = new Date().toISOString().split('T')[0];
const BASE = 'https://metalforge.io';

const CATEGORY_LABELS = {
  thrash: 'Thrash Metal',
  extreme: 'Extreme / Death / Black Metal',
  progressive: 'Progressive Metal',
  other: 'Alternative / Nu-Metal',
};

function formatCategory(cat) {
  return CATEGORY_LABELS[cat] || cat.charAt(0).toUpperCase() + cat.slice(1);
}

function gearVal(val, fallback) {
  return (val && val.trim()) ? val.trim() : fallback;
}

// Extracts pedal info from the hardware field (typically starts with pedal)
function extractPedals(hardware) {
  if (!hardware) return 'Double bass pedal';
  // Hardware often starts with pedal, ends with throne. Return full field.
  return hardware;
}

function buildMarkdown(c) {
  const parts = [];

  const [slug1, slug2] = c.drummers;
  const d1 = drummerBySlug[slug1] || {};
  const d2 = drummerBySlug[slug2] || {};

  const name1 = d1.name || slug1.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const name2 = d2.name || slug2.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const band1 = d1.band || 'Unknown Band';
  const band2 = d2.band || 'Unknown Band';

  const g1 = d1.gear || {};
  const g2 = d2.gear || {};

  const vsUrl = `${BASE}/vs/${c.slug}`;
  const d1Url = `${BASE}/drummer/${slug1}`;
  const d2Url = `${BASE}/drummer/${slug2}`;

  // ── Header ─────────────────────────────────────────────────────────────
  parts.push(`# ${name1} vs ${name2} — Drum Kit Comparison`);
  parts.push('');
  parts.push(`> Side-by-side gear comparison between ${name1} (${band1}) and ${name2} (${band2}).`);
  parts.push('');

  const meta = [];
  if (c.category) meta.push(`**Category:** ${formatCategory(c.category)}`);
  meta.push(`**URL:** ${vsUrl}`);
  parts.push(meta.join(' · '));
  parts.push('');
  parts.push('---');
  parts.push('');

  // ── Drummer 1 Setup ────────────────────────────────────────────────────
  parts.push(`## ${name1} Setup`);
  parts.push('');
  parts.push(`- **Drums:** ${gearVal(g1.drums, 'Custom drum kit')}`);
  parts.push(`- **Cymbals:** ${gearVal(g1.cymbals, 'Signature cymbal selection')}`);
  parts.push(`- **Snare:** ${gearVal(g1.snare, 'Custom snare drum')}`);
  parts.push(`- **Pedals / Hardware:** ${gearVal(extractPedals(g1.hardware), 'Double bass pedal setup')}`);
  parts.push(`- **Sticks:** ${gearVal(g1.sticks, 'Signature drumsticks')}`);
  parts.push('');

  // ── Drummer 2 Setup ────────────────────────────────────────────────────
  parts.push(`## ${name2} Setup`);
  parts.push('');
  parts.push(`- **Drums:** ${gearVal(g2.drums, 'Custom drum kit')}`);
  parts.push(`- **Cymbals:** ${gearVal(g2.cymbals, 'Signature cymbal selection')}`);
  parts.push(`- **Snare:** ${gearVal(g2.snare, 'Custom snare drum')}`);
  parts.push(`- **Pedals / Hardware:** ${gearVal(extractPedals(g2.hardware), 'Double bass pedal setup')}`);
  parts.push(`- **Sticks:** ${gearVal(g2.sticks, 'Signature drumsticks')}`);
  parts.push('');

  // ── Key Differences ────────────────────────────────────────────────────
  parts.push('## Key Differences');
  parts.push('');
  if (c.comparison) {
    if (c.comparison.style) {
      parts.push(`**Style:** ${c.comparison.style}`);
      parts.push('');
    }
    if (c.comparison.technique) {
      parts.push(`**Technique:** ${c.comparison.technique}`);
      parts.push('');
    }
    if (c.comparison.gear) {
      parts.push(`**Gear:** ${c.comparison.gear}`);
      parts.push('');
    }
    if (c.comparison.influence) {
      parts.push(`**Influence:** ${c.comparison.influence}`);
      parts.push('');
    }
  }

  // ── Verdict ────────────────────────────────────────────────────────────
  if (c.verdict) {
    parts.push('## Verdict');
    parts.push('');
    parts.push(c.verdict);
    parts.push('');
  }

  // ── FAQ ────────────────────────────────────────────────────────────────
  parts.push('## FAQ');
  parts.push('');

  // Q1: Main gear differences
  const drums1 = gearVal(g1.drums, 'a custom kit');
  const drums2 = gearVal(g2.drums, 'a custom kit');
  const cymShort1 = g1.cymbals ? g1.cymbals.split(' ').slice(0, 2).join(' ') : 'signature';
  const cymShort2 = g2.cymbals ? g2.cymbals.split(' ').slice(0, 2).join(' ') : 'signature';
  const gearDiff = c.comparison && c.comparison.gear ? ` ${c.comparison.gear}` : '';
  parts.push(`**Q: What are the main differences between ${name1}'s and ${name2}'s drum kits?**`);
  parts.push(`A: ${name1} plays ${drums1} with ${cymShort1} cymbals, while ${name2} uses ${drums2} with ${cymShort2} cymbals.${gearDiff}`);
  parts.push('');

  // Q2: Who plays bigger drums
  const styleDiff = (c.comparison && c.comparison.style) || `Both ${name1} and ${name2} play professional drum kits tailored to their metal style.`;
  parts.push(`**Q: ${name1} vs ${name2} — who plays bigger drums?**`);
  parts.push(`A: ${styleDiff}`);
  parts.push('');

  // Q3: Cymbals
  const cym1Full = gearVal(g1.cymbals, 'signature cymbals');
  const cym2Full = gearVal(g2.cymbals, 'signature cymbals');
  parts.push(`**Q: What cymbals does ${name1} use compared to ${name2}?**`);
  parts.push(`A: ${name1} uses ${cym1Full}. ${name2} plays ${cym2Full}.`);
  parts.push('');

  // Q4: Influence
  const influenceDiff = (c.comparison && c.comparison.influence) || c.verdict || `Both ${name1} and ${name2} have had profound influence on metal drumming.`;
  parts.push(`**Q: Who has influenced more metal drummers — ${name1} or ${name2}?**`);
  parts.push(`A: ${influenceDiff}`);
  parts.push('');

  // ── Footer ─────────────────────────────────────────────────────────────
  parts.push('---');
  parts.push('');
  parts.push(`*Full comparison: [metalforge.io/vs/${c.slug}](${vsUrl}) · [${name1} profile](${d1Url}) · [${name2} profile](${d2Url})*`);
  parts.push('');
  parts.push(`*Last updated: ${today} · Source: [MetalForge.io](${BASE})*`);

  return parts.join('\n');
}

// ── Write files ────────────────────────────────────────────────────────────
const outDir = path.join(__dirname, '../public/llms/vs');
fs.mkdirSync(outDir, { recursive: true });

const compList = Object.values(drummerComparisons);
let written = 0;
let minWords = Infinity;
const results = [];

for (const c of compList) {
  const md = buildMarkdown(c);
  const outPath = path.join(outDir, `${c.slug}.md`);
  fs.writeFileSync(outPath, md);
  const words = md.split(/\s+/).filter(Boolean).length;
  if (words < minWords) minWords = words;
  results.push({ slug: c.slug, words });
  written++;
}

console.log(`✅ Generated public/llms/vs/*.md — ${written} comparisons (min ${minWords} words/file)`);
for (const r of results) {
  console.log(`   ${r.slug}: ${r.words} words`);
}
