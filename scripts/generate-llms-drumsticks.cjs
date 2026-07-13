#!/usr/bin/env node
/**
 * Generate public/llms/drumsticks.md — hub/index page for every verified
 * signature/endorsed drumstick record in the DRUMSTICKS module — plus
 * public/llms/drumsticks/{sizes,materials,tips}.md, the /llms/ mirrors of the
 * three live /drumsticks/<slug> reference pages.
 * Issue #4283: the drumsticks module (epic #4135 + #4149/#4165) grew to ~23+
 * research-verified entries with zero canonical /llms/ coverage — the only
 * tangential coverage was a top-10 list and genre buying guides, neither of
 * which is a complete index the way endorsements.md/bands.md/comparisons.md
 * are for their respective data sources.
 * Issue #4579: the sizes/materials/tips reference pages themselves (data/
 * drumstickReferencePages.js, #4137) were live, sitemapped HTML routes with
 * zero /llms/ mirrors — the same gap already closed for /pedals' reference
 * pages (#4497) via scripts/generate-llms-pedals.cjs. This closes it here.
 *
 * Reads DRUMSTICKS from packages/frontend/data/drumsticks.js (same regex+eval
 * extraction pattern as sibling generate-llms-*.cjs scripts, so no ESM import
 * is needed) and drummer names from api/drummers/index.js (drummerSlug values
 * in drumsticks.js are toSlug(drummer.name), matching packages/frontend/utils/
 * urlHelpers.js#toSlug — see DrumsticksHubPage.jsx for the same lookup).
 * Reference-page content is read from data/drumstickReferencePages.js
 * (REFERENCE_PAGES/REFERENCE_PAGE_ORDER) via the loadModuleConsts eval helper
 * (borrowed from generate-llms-pedals.cjs) — the exact same object the live
 * DrumstickReferencePage.jsx component renders, so the /llms/ file can never
 * state a fact the live page doesn't also state.
 *
 * Count and date are derived from the live data at generation time — never
 * hardcoded — so this hub can't drift stale as more sticks are added.
 */

'use strict';
const fs = require('fs');
const path = require('path');

const BASE = 'https://metalforge.io';
const today = new Date().toISOString().split('T')[0];

// --- Load REFERENCE_PAGES / REFERENCE_PAGE_ORDER from the ESM data module.
// These are plain object/array literals (not a top-level array like
// DRUMSTICKS below), so the simple array regex used elsewhere in this file
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
  path.join(__dirname, '../packages/frontend/data/drumstickReferencePages.js'),
  ['REFERENCE_PAGES', 'REFERENCE_PAGE_ORDER']
);

// --- Reference page markdown (/drumsticks/sizes|materials|tips) ---
// Table data lives under one of three field names depending on the page
// (table / tradeoffTable / tipShapes — see DrumstickReferencePage.jsx); the
// column headers are derived generically from the row keys so this works
// unmodified for all three shapes.
function buildReferenceMarkdown(page) {
  const url = `${BASE}/drumsticks/${page.slug}`;
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

  const tableData = page.table || page.tradeoffTable || page.tipShapes;
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
  parts.push(`- [Drumsticks Guide](${BASE}/llms/drumsticks.md)`);
  parts.push(`- [All LLM Resources](${BASE}/llms/index.md)`);
  parts.push('');
  parts.push(`*Last updated: ${today} · Source: [MetalForge.io](${BASE})*`);

  return parts.join('\n');
}

// --- Load DRUMSTICKS from ESM source ---
const dataPath = path.join(__dirname, '../packages/frontend/data/drumsticks.js');
const dataContent = fs.readFileSync(dataPath, 'utf-8');

const arrayMatch = dataContent.match(/export const DRUMSTICKS = (\[[\s\S]*?\n\]);/);
if (!arrayMatch) {
  console.error('Could not extract DRUMSTICKS from drumsticks.js');
  process.exit(1);
}

let DRUMSTICKS;
try {
  // eslint-disable-next-line no-eval
  DRUMSTICKS = eval(arrayMatch[1]);
} catch (e) {
  console.error('Error parsing DRUMSTICKS:', e);
  process.exit(1);
}

// --- Load drummer names from the same source api/drummers/index.js already
// uses (see scripts/generate-llms-gear-insights.cjs), so slug -> name never
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

function drummerNameFor(stick) {
  if (!stick.drummerSlug) return null;
  return NAME_BY_SLUG[stick.drummerSlug] || stick.drummerSlug;
}

// --- Build hub markdown ---
const count = DRUMSTICKS.length;
const lines = [];
lines.push('# Metal Drummer Signature & Endorsed Drumsticks — Complete List');
lines.push('');
lines.push(`This page indexes every verified signature or artist-endorsed drumstick model catalogued in MetalForge's drumsticks database — ${count} entries, each sourced from a brand or retailer page and cross-referenced to the drummer who plays it.`);
lines.push('');
lines.push(`> Last Updated: ${today} · Source: ${BASE}`);
lines.push('');
lines.push(`For sizing, material, and tip-shape reference pages see the Reference Guides section below. For the ranked top-10 view see [/llms/lists/metal-drummers-signature-drumstick-models.md](${BASE}/llms/lists/metal-drummers-signature-drumstick-models.md).`);
lines.push('');
lines.push('## Reference Guides');
lines.push('');
for (const slug of REFERENCE_PAGE_ORDER) {
  const page = REFERENCE_PAGES[slug];
  lines.push(`- [${page.h1}](${BASE}/llms/drumsticks/${slug}.md) — ${page.description}`);
}
lines.push('');
lines.push(`## All ${count} Drumstick Records`);
lines.push('');
for (const stick of DRUMSTICKS) {
  const name = drummerNameFor(stick);
  const link = stick.drummerSlug
    ? `${BASE}/drumsticks/signature/${stick.drummerSlug}`
    : null;
  const who = name ? `${name} — ` : '';
  const summary = `${stick.brand} ${stick.model} (${stick.material}, ${stick.size})`;
  if (link) {
    lines.push(`- ${who}[${summary}](${link})`);
  } else {
    lines.push(`- ${who}${summary}`);
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
const refDir = path.join(outDir, 'drumsticks');
fs.mkdirSync(refDir, { recursive: true });
const outPath = path.join(outDir, 'drumsticks.md');
fs.writeFileSync(outPath, md);

const shortFiles = [];
for (const slug of REFERENCE_PAGE_ORDER) {
  const refMd = buildReferenceMarkdown(REFERENCE_PAGES[slug]);
  fs.writeFileSync(path.join(refDir, `${slug}.md`), refMd);
  const wordCount = refMd.split(/\s+/).filter(Boolean).length;
  if (wordCount < 200) shortFiles.push(`${slug} (${wordCount} words)`);
}

console.log(`✅ Generated public/llms/drumsticks.md — ${count} stick records linked, plus ${REFERENCE_PAGE_ORDER.length} reference pages`);
if (shortFiles.length) {
  console.error(`WARNING: ${shortFiles.length} reference page(s) under 200 words: ${shortFiles.join(', ')}`);
  process.exit(1);
}
