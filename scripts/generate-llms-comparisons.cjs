#!/usr/bin/env node
/**
 * Generate public/llms/comparisons.md — side-by-side drummer gear comparison
 * reference for AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.).
 * Issue #1190: comparisons are the last rich content surface missing from /llms/.
 *
 * Data source: packages/frontend/data/drummerComparisons.js (single source of truth).
 * Mirrors the extraction pattern of sibling generate-llms-bands.cjs.
 */

const fs = require('fs');
const path = require('path');

const comparisonsPath = path.join(__dirname, '../packages/frontend/data/drummerComparisons.js');
const content = fs.readFileSync(comparisonsPath, 'utf-8');

// Extract the `export const drummerComparisons = { ... };` object literal.
// The object ends just before the first export function comment block.
const objectMatch = content.match(/export const drummerComparisons\s*=\s*(\{[\s\S]*?\});\s*\n\/\*\*/);
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

const today = new Date().toISOString().split('T')[0];

const CATEGORY_LABELS = {
  thrash: 'Thrash Metal',
  extreme: 'Extreme / Death / Black Metal',
  progressive: 'Progressive Metal',
  other: 'Alternative / Nu-Metal',
};

function formatCategory(cat) {
  return CATEGORY_LABELS[cat] || cat.charAt(0).toUpperCase() + cat.slice(1);
}

function renderComparison(c) {
  const parts = [];
  parts.push(`## ${c.title}`);
  parts.push('');

  const meta = [];
  if (c.category) meta.push(`**Category:** ${formatCategory(c.category)}`);
  meta.push(`**URL:** https://metalforge.io/vs/${c.slug}`);
  if (meta.length) { parts.push(meta.join(' · ')); parts.push(''); }

  if (c.metaDescription) {
    parts.push(c.metaDescription.trim());
    parts.push('');
  }

  if (c.comparison) {
    if (c.comparison.style) {
      parts.push(`**Playing style:** ${c.comparison.style}`);
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

  if (c.verdict) {
    parts.push(`**Verdict:** ${c.verdict}`);
    parts.push('');
  }

  // Canonical link
  const drummer1Slug = Array.isArray(c.drummers) ? c.drummers[0] : '';
  const drummer2Slug = Array.isArray(c.drummers) ? c.drummers[1] : '';
  if (drummer1Slug) parts.push(`[${c.drummers[0]} profile](https://metalforge.io/drummer/${drummer1Slug})`);
  if (drummer2Slug) parts.push(`[${c.drummers[1]} profile](https://metalforge.io/drummer/${drummer2Slug})`);
  parts.push('');

  return parts.join('\n');
}

const comparisonList = Object.values(drummerComparisons);
comparisonList.sort((a, b) => (a.title || '').localeCompare(b.title || ''));

const header = [
  '# Metal Drummer Comparisons — MetalForge',
  '',
  '> Side-by-side gear, technique, and influence comparisons between legendary metal drummers.',
  '> Optimised for AI crawlers answering "X vs Y drummer" and "who has heavier gear" queries.',
  '>',
  `> Last updated: ${today} · ${comparisonList.length} curated comparisons`,
  '',
  '---',
  '',
].join('\n');

const body = comparisonList.map(renderComparison).join('\n---\n\n');

const out = header + body;
const outPath = path.join(__dirname, '../public/llms/comparisons.md');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, out);

console.log(`Wrote ${outPath} (${comparisonList.length} comparisons, ${out.length} chars)`);
