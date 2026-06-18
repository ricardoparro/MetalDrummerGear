#!/usr/bin/env node
/**
 * Generate public/llms/vs/<slug>.md — per-pair drum kit comparison markdown
 * for AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.).
 * Issue #1276: per-comparison LLM markdown.
 *
 * Data source: packages/frontend/data/drummerComparisons.js (curated pairs).
 * Drummer gear:  api/drummers/index.js (individual gear records).
 * Output:        public/llms/vs/<slug>.md  (one file per comparison pair)
 */

'use strict';

const fs = require('fs');
const path = require('path');

// ── 1. Extract drummerComparisons ──────────────────────────────────────────
const comparisonsPath = path.join(__dirname, '../packages/frontend/data/drummerComparisons.js');
const comparisonsContent = fs.readFileSync(comparisonsPath, 'utf-8');

// Same regex pattern used by generate-llms-comparisons.cjs
const objectMatch = comparisonsContent.match(/export const drummerComparisons\s*=\s*(\{[\s\S]*?\});\s*\n\/\*\*/);
if (!objectMatch) {
  console.error('ERROR: Could not extract drummerComparisons from packages/frontend/data/drummerComparisons.js');
  process.exit(1);
}
let drummerComparisons;
try {
  drummerComparisons = eval('(' + objectMatch[1] + ')'); // eslint-disable-line no-eval
} catch (e) {
  console.error('ERROR: Failed to parse drummerComparisons:', e.message);
  process.exit(1);
}

// ── 2. Extract drummer gear data ────────────────────────────────────────────
const drummersPath = path.join(__dirname, '../api/drummers/index.js');
const drummersContent = fs.readFileSync(drummersPath, 'utf-8');
const arrayMatch = drummersContent.match(/const drummers = (\[[\s\S]*?\]);[\s\S]*?export default function handler/);
if (!arrayMatch) {
  console.error('ERROR: Could not extract drummers array from api/drummers/index.js');
  process.exit(1);
}
let drummers;
try {
  drummers = eval(arrayMatch[1]); // eslint-disable-line no-eval
} catch (e) {
  console.error('ERROR: Failed to parse drummers array:', e.message);
  process.exit(1);
}

// Build slug → drummer lookup (same slug logic as generate-llms-index.cjs)
function toSlug(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}
const drummerBySlug = {};
for (const d of drummers) {
  drummerBySlug[toSlug(d.name)] = d;
}

// ── 3. Helpers ───────────────────────────────────────────────────────────────
const today = new Date().toISOString().split('T')[0];
const BASE = 'https://metalforge.io';

const CATEGORY_LABELS = {
  thrash: 'Thrash Metal',
  extreme: 'Extreme / Death / Black Metal',
  progressive: 'Progressive Metal',
  other: 'Alternative / Nu-Metal',
};

/**
 * Extract the pedal portion from a hardware field.
 * Looks for comma-separated items that mention "pedal"; falls back to the
 * first item, then the whole string.
 */
function extractPedals(hardware) {
  if (!hardware) return 'Custom setup';
  const parts = hardware.split(',').map(s => s.trim());
  const pedalParts = parts.filter(p => /pedal/i.test(p));
  if (pedalParts.length) return pedalParts.join(', ');
  return parts[0] || hardware;
}

function gearSection(name, gear) {
  const drums   = gear?.drums   || 'Custom setup';
  const cymbals = gear?.cymbals || 'Custom setup';
  const snare   = gear?.snare   || 'Custom setup';
  const pedals  = extractPedals(gear?.hardware);
  const sticks  = gear?.sticks  || 'Custom setup';

  return [
    `## ${name} Setup`,
    '',
    `- **Drums:** ${drums}`,
    `- **Cymbals:** ${cymbals}`,
    `- **Snare:** ${snare}`,
    `- **Pedals:** ${pedals}`,
    `- **Sticks:** ${sticks}`,
    '',
  ].join('\n');
}

/** Trim a gear name to the first 3 words for concise FAQ answers. */
function shortGear(str) {
  if (!str) return 'custom setup';
  return str.split(' ').slice(0, 3).join(' ');
}

// ── 4. Markdown builder ──────────────────────────────────────────────────────
function buildMarkdown(c) {
  const [slug1, slug2] = Array.isArray(c.drummers) ? c.drummers : ['', ''];
  const d1 = drummerBySlug[slug1];
  const d2 = drummerBySlug[slug2];

  // Names come from the curated title ("Lars Ulrich vs Dave Lombardo")
  const titleParts = c.title.split(' vs ');
  const name1 = titleParts[0] ? titleParts[0].trim() : slug1;
  const name2 = titleParts[1] ? titleParts[1].trim() : slug2;
  const band1 = d1?.band || '';
  const band2 = d2?.band || '';
  const catLabel = CATEGORY_LABELS[c.category] || (c.category
    ? c.category.charAt(0).toUpperCase() + c.category.slice(1)
    : 'Metal');

  const parts = [];

  // ── Header
  parts.push(`# ${name1} vs ${name2} — Drum Kit Comparison`);
  parts.push('');
  const d1Label = band1 ? `${name1} (${band1})` : name1;
  const d2Label = band2 ? `${name2} (${band2})` : name2;
  parts.push(`> Side-by-side gear comparison between ${d1Label} and ${d2Label}.`);
  parts.push('');
  parts.push(`**Category:** ${catLabel} · **URL:** ${BASE}/vs/${c.slug}`);
  parts.push('');
  if (c.metaDescription) {
    parts.push(c.metaDescription.trim());
    parts.push('');
  }
  parts.push('---');
  parts.push('');

  // ── Per-drummer gear tables
  parts.push(gearSection(name1, d1?.gear));
  parts.push(gearSection(name2, d2?.gear));

  // ── Key Differences (2-3 sentences drawn from curated comparison fields)
  parts.push('## Key Differences');
  parts.push('');
  const diffLines = [];
  if (c.comparison?.gear)      diffLines.push(c.comparison.gear.trim());
  if (c.comparison?.style)     diffLines.push(c.comparison.style.trim());
  if (c.comparison?.technique) diffLines.push(c.comparison.technique.trim());
  // Emit up to 3 sentences
  parts.push(diffLines.slice(0, 3).join(' '));
  parts.push('');

  // ── FAQ
  parts.push('## FAQ');
  parts.push('');

  // Q1 — gear differences
  const d1Drums    = shortGear(d1?.gear?.drums);
  const d1Cymbals  = shortGear(d1?.gear?.cymbals);
  const d2Drums    = shortGear(d2?.gear?.drums);
  const d2Cymbals  = shortGear(d2?.gear?.cymbals);
  const gearProse  = c.comparison?.gear || `Both bring unique setups to their genre.`;
  parts.push(`**Q: What are the main differences between ${name1}'s and ${name2}'s drum kits?**`);
  parts.push(`A: ${name1} plays ${d1Drums} drums with ${d1Cymbals} cymbals, while ${name2} uses ${d2Drums} drums with ${d2Cymbals} cymbals. ${gearProse}`);
  parts.push('');

  // Q2 — playing style
  if (c.comparison?.style) {
    parts.push(`**Q: How does ${name1}'s playing style differ from ${name2}'s?**`);
    let styleAnswer = c.comparison.style.trim();
    if (c.comparison?.technique) styleAnswer += ' ' + c.comparison.technique.trim();
    parts.push(`A: ${styleAnswer}`);
    parts.push('');
  }

  // Q3 — influence / verdict
  if (c.verdict) {
    parts.push(`**Q: Who is the more influential drummer — ${name1} or ${name2}?**`);
    parts.push(`A: ${c.verdict.trim()}`);
    parts.push('');
  }

  // ── Links
  parts.push('## More Resources');
  parts.push('');
  if (band1 && d1) {
    parts.push(`- [${name1} drummer profile](${BASE}/drummer/${slug1})`);
  }
  if (band2 && d2) {
    parts.push(`- [${name2} drummer profile](${BASE}/drummer/${slug2})`);
  }
  parts.push(`- [All Drummer Comparisons](${BASE}/llms/comparisons.md)`);
  parts.push(`- [Live comparison page](${BASE}/vs/${c.slug})`);
  parts.push('');

  // ── Footer
  parts.push('---');
  parts.push('');
  parts.push(`*Full comparison: [metalforge.io/vs/${c.slug}](${BASE}/vs/${c.slug})*`);
  parts.push('');
  parts.push(`*Last updated: ${today} · Source: [MetalForge.io](${BASE})*`);

  return parts.join('\n');
}

// ── 5. Write files ───────────────────────────────────────────────────────────
const outDir = path.join(__dirname, '../public/llms/vs');
fs.mkdirSync(outDir, { recursive: true });

const comparisonList = Object.values(drummerComparisons);
let written = 0;
let minWords = Infinity;
const results = [];

for (const c of comparisonList) {
  if (!c.slug) continue;
  const md = buildMarkdown(c);
  const outPath = path.join(outDir, `${c.slug}.md`);
  fs.writeFileSync(outPath, md);
  const words = md.split(/\s+/).filter(Boolean).length;
  if (words < minWords) minWords = words;
  results.push({ slug: c.slug, words });
  written++;
}

console.log(`✅  Generated public/llms/vs/*.md — ${written} files (min ${minWords} words/file)`);
for (const r of results) {
  const ok = r.words >= 200 ? '✓' : '⚠';
  console.log(`   ${ok} ${r.slug}: ${r.words} words`);
}

if (minWords < 200) {
  console.error('ERROR: One or more files have fewer than 200 words — quality gate not met.');
  process.exit(1);
}
