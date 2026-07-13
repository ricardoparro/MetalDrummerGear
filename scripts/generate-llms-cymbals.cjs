#!/usr/bin/env node
/**
 * Generate public/llms/cymbals.md — hub/index page for every verified
 * drummer cymbal setup in the CYMBAL_SETUPS module — plus
 * public/llms/cymbals/{types,alloys,sizes-weights}.md, the /llms/ mirrors of
 * the three live /cymbals/<slug> reference pages.
 * Issue #4307 (epic #4303 phase 4/4): mirrors scripts/generate-llms-drumsticks.cjs
 * (#4283) for the cymbals data source — the /cymbals hub family had zero
 * canonical /llms/ coverage despite being fully built out and sitemap-listed.
 * Issue #4579: the types/alloys/sizes-weights reference pages themselves
 * (data/cymbalReferencePages.js, #4305) were live, sitemapped HTML routes
 * with zero /llms/ mirrors — the same gap already closed for /pedals'
 * reference pages (#4497) via scripts/generate-llms-pedals.cjs. This closes
 * it here.
 *
 * Reads CYMBAL_SETUPS from packages/frontend/data/cymbalSetups.js (same
 * regex+eval extraction pattern as sibling generate-llms-*.cjs scripts, so no
 * ESM import is needed) and drummer names from api/drummers/index.js
 * (drummerSlug values in cymbalSetups.js are toSlug(drummer.name), matching
 * packages/frontend/utils/urlHelpers.js#toSlug).
 * Reference-page content is read from data/cymbalReferencePages.js
 * (REFERENCE_PAGES/REFERENCE_PAGE_ORDER) via the loadModuleConsts eval helper
 * (borrowed from generate-llms-pedals.cjs) — the exact same object the live
 * CymbalReferencePage.jsx component renders, so the /llms/ file can never
 * state a fact the live page doesn't also state.
 *
 * Count and date are derived from the live data at generation time — never
 * hardcoded — so this hub can't drift stale as more setups are added.
 */

'use strict';
const fs = require('fs');
const path = require('path');

const BASE = 'https://metalforge.io';
const today = new Date().toISOString().split('T')[0];

// --- Load REFERENCE_PAGES / REFERENCE_PAGE_ORDER from the ESM data module.
// These are plain object/array literals (not a top-level array like
// CYMBAL_SETUPS below), so the simple array regex used elsewhere in this file
// doesn't fit — strip import/export syntax and eval the whole module body
// instead (same pattern generate-llms-pedals.cjs uses for pedalReferencePages.js).
function loadModuleConsts(filePath, constNames) {
  const src = fs.readFileSync(filePath, 'utf-8');
  const body = src
    .replace(/^import[^\n]*\n/gm, '')
    .replace(/export default[\s\S]*$/, '')
    .replace(/export function/g, 'function')
    .replace(/export const/g, 'const');
  const wrapped = `(function(){\n${body}\nreturn {${constNames.join(',')}};\n})()`;
  try {
    // eslint-disable-next-line no-eval
    return eval(wrapped);
  } catch (e) {
    throw new Error(`Could not load ${constNames.join(', ')} from ${filePath}: ${e.message}`);
  }
}

const { REFERENCE_PAGES, REFERENCE_PAGE_ORDER } = loadModuleConsts(
  path.join(__dirname, '../packages/frontend/data/cymbalReferencePages.js'),
  ['REFERENCE_PAGES', 'REFERENCE_PAGE_ORDER']
);

// --- Reference page markdown (/cymbals/types|alloys|sizes-weights) ---
// Table data lives under one of two field names depending on the page
// (table / tradeoffTable — see CymbalReferencePage.jsx); the column headers
// are derived generically from the row keys so this works unmodified for
// both shapes.
function buildReferenceMarkdown(page) {
  const url = `${BASE}/cymbals/${page.slug}`;
  const parts = [];
  parts.push(`# ${page.h1}`);
  parts.push('');
  parts.push(`> ${page.description}`);
  parts.push('');
  parts.push('---');
  parts.push('');

  for (const section of page.sections) {
    parts.push(`## ${section.heading}`);
    parts.push('');
    parts.push(section.body);
    parts.push('');
  }

  const tableData = page.table || page.tradeoffTable;
  if (Array.isArray(tableData) && tableData.length) {
    const columns = Object.keys(tableData[0]);
    parts.push('## Reference Table');
    parts.push('');
    parts.push(`| ${columns.join(' | ')} |`);
    parts.push(`| ${columns.map(() => '---').join(' | ')} |`);
    for (const row of tableData) {
      parts.push(`| ${columns.map((c) => row[c]).join(' | ')} |`);
    }
    if (page.tableSource) {
      const label = page.tableSource.label || [page.tableSource.brand, page.tableSource.line].filter(Boolean).join(' ');
      parts.push('');
      parts.push(page.tableSource.url ? `*Table source: [${label}](${page.tableSource.url})*` : `*Table source: ${label}*`);
    }
    parts.push('');
  }

  if (Array.isArray(page.faq) && page.faq.length) {
    parts.push('## FAQ');
    parts.push('');
    for (const item of page.faq) {
      parts.push(`**Q: ${item.question}**`);
      parts.push(`A: ${item.answer}`);
      parts.push('');
    }
  }

  if (Array.isArray(page.sources) && page.sources.length) {
    parts.push('## Sources');
    parts.push('');
    for (const source of page.sources) {
      parts.push(`- [${source.label}](${source.url})`);
    }
    parts.push('');
  }

  parts.push('---');
  parts.push('');
  parts.push(`- [Live page](${url})`);
  parts.push(`- [Cymbals Guide](${BASE}/llms/cymbals.md)`);
  parts.push(`- [All LLM Resources](${BASE}/llms/index.md)`);
  parts.push('');
  parts.push(`*Last updated: ${today} · Source: [MetalForge.io](${BASE})*`);

  return parts.join('\n');
}

// --- Load CYMBAL_SETUPS from ESM source ---
const dataPath = path.join(__dirname, '../packages/frontend/data/cymbalSetups.js');
const dataContent = fs.readFileSync(dataPath, 'utf-8');

const arrayMatch = dataContent.match(/export const CYMBAL_SETUPS = (\[[\s\S]*?\n\]);/);
if (!arrayMatch) {
  console.error('Could not extract CYMBAL_SETUPS from cymbalSetups.js');
  process.exit(1);
}

let CYMBAL_SETUPS;
try {
  // eslint-disable-next-line no-eval
  CYMBAL_SETUPS = eval(arrayMatch[1]);
} catch (e) {
  console.error('Error parsing CYMBAL_SETUPS:', e);
  process.exit(1);
}

// --- Load drummer names from the same source api/drummers/index.js already
// uses (see scripts/generate-llms-drumsticks.cjs), so slug -> name never
// drifts out of sync with the canonical drummer roster.
const drummersPath = path.join(__dirname, '../api/drummers/index.js');
const drummersContent = fs.readFileSync(drummersPath, 'utf-8');
const drummersMatch = drummersContent.match(/const drummers = (\[[\s\S]*?\]);[\s\S]*?export default function handler/);
if (!drummersMatch) {
  console.error('Could not extract drummers array from api/drummers/index.js');
  process.exit(1);
}

let drummers;
try {
  // eslint-disable-next-line no-eval
  drummers = eval(drummersMatch[1]);
} catch (e) {
  console.error('Error parsing drummers:', e);
  process.exit(1);
}

function toSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const NAME_BY_SLUG = {};
for (const d of drummers) {
  NAME_BY_SLUG[toSlug(d.name)] = d.name;
}

function drummerNameFor(setup) {
  if (!setup.drummerSlug) return null;
  return NAME_BY_SLUG[setup.drummerSlug] || setup.drummerSlug;
}

// --- Build hub markdown ---
const count = CYMBAL_SETUPS.length;
const lines = [];
lines.push('# Metal Drummer Cymbal Setups — Complete List');
lines.push('');
lines.push(`This page indexes every verified cymbal setup catalogued in MetalForge's cymbals database — ${count} entries, each parsed from the drummer's roster gear record and cross-referenced to their profile.`);
lines.push('');
lines.push(`> Last Updated: ${today} · Source: ${BASE}`);
lines.push('');
lines.push(`For types, alloys, and sizing/weight reference pages see the Reference Guides section below. For brand positioning and metal-relevant series see [${BASE}/cymbals/brands](${BASE}/cymbals/brands). For a buying guide by budget tier see [${BASE}/cymbals/best-for-metal](${BASE}/cymbals/best-for-metal).`);
lines.push('');
lines.push('## Reference Guides');
lines.push('');
for (const slug of REFERENCE_PAGE_ORDER) {
  const page = REFERENCE_PAGES[slug];
  lines.push(`- [${page.h1}](${BASE}/llms/cymbals/${slug}.md) — ${page.description}`);
}
lines.push('');
lines.push(`## All ${count} Cymbal Setup Records`);
lines.push('');
for (const setup of CYMBAL_SETUPS) {
  const name = drummerNameFor(setup);
  const mdLink = setup.drummerSlug ? `${BASE}/llms/cymbals/setups/${setup.drummerSlug}.md` : null;
  const profileLink = setup.drummerSlug ? `${BASE}/drummer/${setup.drummerSlug}` : null;
  const who = name ? `${name} — ` : '';
  if (mdLink) {
    lines.push(`- ${who}[${setup.summary}](${mdLink}) ([profile](${profileLink}))`);
  } else {
    lines.push(`- ${who}${setup.summary}`);
  }
}
lines.push('');
lines.push('---');
lines.push('');
lines.push('**More LLM resources:** ');
lines.push(`[Endorsements Hub](${BASE}/llms/endorsements.md) · [Gear by Brand](${BASE}/llms/gear-by-brand.md) · [Master FAQ](${BASE}/llms/faq.md) · [Site index](${BASE}/llms.txt)`);
lines.push('');

const md = lines.join('\n');

const outDir = path.join(__dirname, '../public/llms');
const refDir = path.join(outDir, 'cymbals');
fs.mkdirSync(refDir, { recursive: true });
const outPath = path.join(outDir, 'cymbals.md');
fs.writeFileSync(outPath, md);

const shortFiles = [];
for (const slug of REFERENCE_PAGE_ORDER) {
  const refMd = buildReferenceMarkdown(REFERENCE_PAGES[slug]);
  fs.writeFileSync(path.join(refDir, `${slug}.md`), refMd);
  const wordCount = refMd.split(/\s+/).filter(Boolean).length;
  if (wordCount < 200) shortFiles.push(`${slug} (${wordCount} words)`);
}

console.log(`✅ Generated public/llms/cymbals.md — ${count} cymbal setup records linked, plus ${REFERENCE_PAGE_ORDER.length} reference pages`);
if (shortFiles.length) {
  console.error(`WARNING: ${shortFiles.length} reference page(s) under 200 words: ${shortFiles.join(', ')}`);
  process.exit(1);
}
