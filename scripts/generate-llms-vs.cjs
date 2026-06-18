#!/usr/bin/env node
/**
 * Generate public/llms/vs/<slug>.md — one per-pair comparison Markdown file
 * per curated drummer comparison. Issue #1276: AI citation surface for fine-grained
 * "X vs Y gear" queries that /llms/comparisons.md can't answer with specific data.
 *
 * Data sources:
 *   packages/frontend/data/drummerComparisons.js  — curated comparison pairs
 *   api/drummers/index.js                          — structured gear per drummer
 *
 * Pattern mirrors generate-llms-techniques-per-slug.cjs (per-slug files).
 */

'use strict';

const fs = require('fs');
const path = require('path');

// --- Load drummerComparisons -----------------------------------------------
const comparisonsPath = path.join(__dirname, '../packages/frontend/data/drummerComparisons.js');
const comparisonsContent = fs.readFileSync(comparisonsPath, 'utf-8');

// Extract the object literal; ends just before the first `export function` comment.
const compObjectMatch = comparisonsContent.match(/export const drummerComparisons\s*=\s*(\{[\s\S]*?\});\s*\n\/\*\*/);
if (!compObjectMatch) {
  console.error('Could not extract drummerComparisons object from drummerComparisons.js');
  process.exit(1);
}
let drummerComparisons;
try {
  drummerComparisons = eval('(' + compObjectMatch[1] + ')');
} catch (e) {
  console.error('Error parsing drummerComparisons:', e);
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

// Build slug → drummer lookup
function nameToSlug(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}
const drummerBySlug = {};
for (const d of drummers) {
  drummerBySlug[nameToSlug(d.name)] = d;
}

// --- Helpers ---------------------------------------------------------------
const today = new Date().toISOString().split('T')[0];
const BASE = 'https://metalforge.io';

const CATEGORY_LABELS = {
  thrash: 'Thrash Metal',
  extreme: 'Extreme / Death / Black Metal',
  progressive: 'Progressive Metal',
  other: 'Alternative / Nu-Metal',
};

function formatCategory(cat) {
  return CATEGORY_LABELS[cat] || (cat ? cat.charAt(0).toUpperCase() + cat.slice(1) : 'Metal');
}

function gearLine(label, value, fallback) {
  const v = value || fallback;
  return v ? `- **${label}:** ${v}` : null;
}

function buildGearSection(drummer, drummerName) {
  if (!drummer) {
    return `- **Drums:** See [${drummerName} profile](${BASE}/drummer/${nameToSlug(drummerName)})\n`;
  }
  const g = drummer.gear || {};
  const lines = [
    gearLine('Drums', g.drums, 'Custom setup'),
    gearLine('Cymbals', g.cymbals, 'Custom cymbal selection'),
    gearLine('Snare', g.snare, 'Signature snare'),
    gearLine('Pedals/Hardware', g.hardware, g.pedals || null),
    gearLine('Sticks', g.sticks, null),
  ].filter(Boolean);
  return lines.join('\n') + '\n';
}

function buildKeyDifferences(c, d1, d2) {
  const parts = [];
  if (c.comparison && c.comparison.gear) {
    parts.push(c.comparison.gear.trim());
  }
  if (c.comparison && c.comparison.technique) {
    parts.push(c.comparison.technique.trim());
  }
  if (parts.length === 0 && c.verdict) {
    // Fall back to first sentence of verdict
    parts.push(c.verdict.split('.')[0].trim() + '.');
  }
  return parts.slice(0, 2).join(' ');
}

function buildFAQAnswer(c, d1Name, d2Name, d1, d2) {
  const g1 = d1 && d1.gear ? d1.gear : null;
  const g2 = d2 && d2.gear ? d2.gear : null;
  const kit1 = g1 ? g1.drums || 'custom drums' : 'custom drums';
  const kit2 = g2 ? g2.drums || 'custom drums' : 'custom drums';
  const cymbals1 = g1 ? (g1.cymbals || '').split(' ')[0] || 'signature cymbals' : 'signature cymbals';
  const cymbals2 = g2 ? (g2.cymbals || '').split(' ')[0] || 'signature cymbals' : 'signature cymbals';

  let gearDiff = '';
  if (c.comparison && c.comparison.gear) {
    gearDiff = ` ${c.comparison.gear.trim()}`;
  }
  return `${d1Name} plays ${kit1} with ${cymbals1} cymbals, while ${d2Name} uses ${kit2} with ${cymbals2} cymbals.${gearDiff}`;
}

function buildVerdict(c) {
  return c.verdict ? c.verdict.trim() : '';
}

function buildMarkdown(c) {
  const slug1 = Array.isArray(c.drummers) ? c.drummers[0] : '';
  const slug2 = Array.isArray(c.drummers) ? c.drummers[1] : '';
  const d1 = drummerBySlug[slug1] || null;
  const d2 = drummerBySlug[slug2] || null;

  const d1Name = d1 ? d1.name : (slug1 ? slug1.replace(/-/g, ' ').replace(/\b\w/g, s => s.toUpperCase()) : 'Drummer 1');
  const d2Name = d2 ? d2.name : (slug2 ? slug2.replace(/-/g, ' ').replace(/\b\w/g, s => s.toUpperCase()) : 'Drummer 2');
  const band1 = d1 ? d1.band : '';
  const band2 = d2 ? d2.band : '';
  const vsUrl = `${BASE}/vs/${c.slug}`;
  const category = formatCategory(c.category);

  const parts = [];

  // Title
  parts.push(`# ${d1Name} vs ${d2Name} — Drum Kit Comparison`);
  parts.push('');

  // Lead
  const bandClause1 = band1 ? ` (${band1})` : '';
  const bandClause2 = band2 ? ` (${band2})` : '';
  parts.push(`> Side-by-side gear comparison between ${d1Name}${bandClause1} and ${d2Name}${bandClause2}.`);
  parts.push('');

  // Meta
  const metaLine = [`**Category:** ${category}`, `**URL:** ${vsUrl}`].join(' · ');
  parts.push(metaLine);
  parts.push('');

  if (c.metaDescription) {
    parts.push(c.metaDescription.trim());
    parts.push('');
  }

  parts.push('---');
  parts.push('');

  // Drummer 1 Setup
  parts.push(`## ${d1Name} Setup`);
  parts.push('');
  parts.push(buildGearSection(d1, d1Name).trimEnd());
  parts.push('');

  // Drummer 2 Setup
  parts.push(`## ${d2Name} Setup`);
  parts.push('');
  parts.push(buildGearSection(d2, d2Name).trimEnd());
  parts.push('');

  // Style comparison (from curated data)
  if (c.comparison && c.comparison.style) {
    parts.push('## Playing Style');
    parts.push('');
    parts.push(c.comparison.style.trim());
    parts.push('');
  }

  // Technique comparison
  if (c.comparison && c.comparison.technique) {
    parts.push('## Technique');
    parts.push('');
    parts.push(c.comparison.technique.trim());
    parts.push('');
  }

  // Key Differences
  const keyDiff = buildKeyDifferences(c, d1, d2);
  if (keyDiff) {
    parts.push('## Key Differences');
    parts.push('');
    parts.push(keyDiff);
    parts.push('');
  }

  // Influence
  if (c.comparison && c.comparison.influence) {
    parts.push('## Influence & Legacy');
    parts.push('');
    parts.push(c.comparison.influence.trim());
    parts.push('');
  }

  // Verdict
  const verdict = buildVerdict(c);
  if (verdict) {
    parts.push('## Verdict');
    parts.push('');
    parts.push(verdict);
    parts.push('');
  }

  // FAQ
  parts.push('## FAQ');
  parts.push('');

  // Main gear comparison FAQ
  parts.push(`**Q: What are the main differences between ${d1Name}'s and ${d2Name}'s drum kits?**`);
  parts.push(`A: ${buildFAQAnswer(c, d1Name, d2Name, d1, d2)}`);
  parts.push('');

  // Who plays bigger/heavier kit FAQ
  if (d1 && d1.gear && d1.gear.drums && d2 && d2.gear && d2.gear.drums) {
    parts.push(`**Q: What drums does ${d1Name} play vs ${d2Name}?**`);
    parts.push(`A: ${d1Name} plays ${d1.gear.drums}. ${d2Name} plays ${d2.gear.drums}.`);
    parts.push('');
  }

  // Category FAQ
  parts.push(`**Q: Who is the better ${category.toLowerCase()} drummer, ${d1Name} or ${d2Name}?**`);
  if (verdict) {
    const shortVerdict = verdict.split('.')[0].trim() + '.';
    parts.push(`A: Both are legends in their own right. ${shortVerdict} See the full analysis at [metalforge.io/vs/${c.slug}](${vsUrl}).`);
  } else {
    parts.push(`A: Both ${d1Name} and ${d2Name} are iconic ${category.toLowerCase()} drummers. Compare their full setups and technique at [metalforge.io/vs/${c.slug}](${vsUrl}).`);
  }
  parts.push('');

  // Cymbals FAQ if data available
  if (d1 && d1.gear && d1.gear.cymbals && d2 && d2.gear && d2.gear.cymbals) {
    parts.push(`**Q: What cymbals do ${d1Name} and ${d2Name} use?**`);
    parts.push(`A: ${d1Name} uses ${d1.gear.cymbals}. ${d2Name} uses ${d2.gear.cymbals}.`);
    parts.push('');
  }

  // Footer links
  parts.push('---');
  parts.push('');
  parts.push(`*Full comparison: [metalforge.io/vs/${c.slug}](${vsUrl})*`);
  parts.push('');
  if (slug1) parts.push(`*[${d1Name} drummer profile](${BASE}/drummer/${slug1})*`);
  if (slug2) parts.push(`*[${d2Name} drummer profile](${BASE}/drummer/${slug2})*`);
  parts.push('');
  parts.push(`---`);
  parts.push('');
  parts.push(`*Last updated: ${today} · Source: [MetalForge.io](${BASE})*`);

  return parts.join('\n');
}

// --- Generate files --------------------------------------------------------
const outDir = path.join(__dirname, '../public/llms/vs');
fs.mkdirSync(outDir, { recursive: true });

const compList = Object.values(drummerComparisons);
let written = 0;
let minWords = Infinity;
const results = [];

for (const c of compList) {
  if (!c.slug) continue;
  const md = buildMarkdown(c);
  const outPath = path.join(outDir, `${c.slug}.md`);
  fs.writeFileSync(outPath, md, 'utf-8');
  const words = md.split(/\s+/).filter(Boolean).length;
  if (words < minWords) minWords = words;
  results.push({ slug: c.slug, words });
  written++;
}

console.log(`✅ Generated public/llms/vs/*.md — ${written} comparison files (min ${minWords} words/file)`);
const failing = results.filter(r => r.words < 200);
if (failing.length > 0) {
  console.warn(`⚠️  ${failing.length} file(s) below 200-word minimum:`);
  for (const r of failing) console.warn(`   ${r.slug}: ${r.words} words`);
}
for (const r of results) {
  console.log(`   ${r.slug}: ${r.words} words`);
}
