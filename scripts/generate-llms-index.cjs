#!/usr/bin/env node
/**
 * Sync the "Drum Kit Comparisons (per-pair)" section of public/llms/index.md
 * with packages/frontend/data/drummerComparisons.js so the per-pair table and
 * pair counts can never drift from public/llms/vs/ again (#4298).
 *
 * This patches only the comparisons-related parts of the committed file in
 * place — everything else in public/llms/index.md is left untouched.
 */

'use strict';

const fs = require('fs');
const path = require('path');

// --- Load drummerComparisons (mirrors scripts/generate-llms-vs.cjs) --------
const comparisonsPath = path.join(__dirname, '../packages/frontend/data/drummerComparisons.js');
const comparisonsContent = fs.readFileSync(comparisonsPath, 'utf-8');

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

const comparisons = Object.values(drummerComparisons);

// --- Patch public/llms/index.md --------------------------------------------
const outputPath = path.join(__dirname, '../public/llms/index.md');
let indexContent = fs.readFileSync(outputPath, 'utf-8');

// Fix the "LLM Resources" summary row's stale "(N files)" count.
indexContent = indexContent.replace(
  /(Per-Pair Comparisons[^\n]*?)\(\d+ files\)/,
  `$1(${comparisons.length} files)`
);

// Regenerate the per-pair table itself from the curated comparisons data.
const tableRows = comparisons
  .map((c) => `| ${c.title} | [${c.slug}.md](https://metalforge.io/llms/vs/${c.slug}.md) |`)
  .join('\n');

const sectionRegex = /## Drum Kit Comparisons \(per-pair\)\n[\s\S]*?\n---\n/;
if (!sectionRegex.test(indexContent)) {
  console.error('Could not find "Drum Kit Comparisons (per-pair)" section in public/llms/index.md');
  process.exit(1);
}

const newSection = `## Drum Kit Comparisons (per-pair)

Per-pair deep-dive files (400–600 words each) with exact gear data for both drummers. Optimised for
AI retrieval on queries like "Joey Jordison vs Lars Ulrich gear", "what drums does Hellhammer use vs Inferno?",
or "Compare Danny Carey's kit to Tomas Haake's."

Hub: [/llms/comparisons.md](https://metalforge.io/llms/comparisons.md) — aggregate overview of all ${comparisons.length} pairs.

| Comparison | File |
|------------|------|
${tableRows}

---
`;

indexContent = indexContent.replace(sectionRegex, newSection);

fs.writeFileSync(outputPath, indexContent);
console.log(`✅ Synced public/llms/index.md comparisons section with ${comparisons.length} pairs`);
