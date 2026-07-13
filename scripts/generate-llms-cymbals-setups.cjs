#!/usr/bin/env node
/**
 * Generate public/llms/cymbals/setups/<drummer>.md — the /llms/ markdown
 * mirror of the /cymbals/setups/<drummer> pages (Issue #4306/#4382, epic
 * #4303 phase 3/4). Issue #4518: the live route shipped with 56 pages but no
 * markdown citation surface was ever generated for it — the parallel
 * /pedals/setups/<drummer> surface has both (scripts/generate-llms-pedals.cjs),
 * this script brings /cymbals/setups to parity.
 *
 * Data sources (both read live, no hardcoded drummer/slug list):
 *  - packages/frontend/data/cymbalSetups.js (CYMBAL_SETUPS / DRUMMER_CYMBALS)
 *  - packages/frontend/data/cymbalSetupPages.js (generateCymbalSetupDirectAnswer
 *    / pieceLabel) — extracted and reused verbatim so the /llms/ file and the
 *    live /cymbals/setups/<slug> page never say different things.
 *  - packages/frontend/data/cymbalReferencePages.js (TYPES_TABLE) — real,
 *    already-published cymbal-type descriptions used to add setup context,
 *    same discipline as generate-llms-pedals.cjs's drive-type/config context.
 *  - api/drummers/index.js (drummer name/band, matched to a cymbal record via
 *    toSlug(name) === setup.drummerSlug — same convention the live
 *    CymbalSetupPage.jsx component uses)
 */

const fs = require('fs');
const path = require('path');

const BASE = 'https://metalforge.io';

function loadModuleConsts(filePath, constNames) {
  const src = fs.readFileSync(filePath, 'utf-8');
  const body = src
    .replace(/^import[^\n]*\n/gm, '')
    .replace(/export default[\s\S]*$/, '')
    .replace(/export function/g, 'function')
    .replace(/export const/g, 'const');
  const wrapped = `(function(){\n${body}\nreturn {${constNames.join(',')}};\n})()`;
  try {
    return eval(wrapped);
  } catch (e) {
    throw new Error(`Could not load ${constNames.join(', ')} from ${filePath}: ${e.message}`);
  }
}

const { CYMBAL_SETUPS } = loadModuleConsts(
  path.join(__dirname, '../packages/frontend/data/cymbalSetups.js'),
  ['CYMBAL_SETUPS']
);

const { generateCymbalSetupDirectAnswer, pieceLabel } = loadModuleConsts(
  path.join(__dirname, '../packages/frontend/data/cymbalSetupPages.js'),
  ['generateCymbalSetupDirectAnswer', 'pieceLabel']
);

const { TYPES_TABLE } = loadModuleConsts(
  path.join(__dirname, '../packages/frontend/data/cymbalReferencePages.js'),
  ['TYPES_TABLE']
);

const TYPE_LABELS = {
  'hi-hat': 'Hi-hat',
  crash: 'Crash',
  ride: 'Ride',
  china: 'China',
  splash: 'Splash',
  stack: 'Stack',
};

function typeContext(pieceType) {
  const label = TYPE_LABELS[pieceType];
  if (!label) return null;
  const row = TYPES_TABLE.find((r) => r.type === label);
  return row ? `**${row.type}:** ${row.metalRole}` : null;
}

const drummersPath = path.join(__dirname, '../api/drummers/index.js');
const drummersContent = fs.readFileSync(drummersPath, 'utf-8');
const drummersMatch = drummersContent.match(/const drummers = (\[[\s\S]*?\]);[\s\S]*?export default function handler/);
if (!drummersMatch) {
  console.error('Could not extract drummers array from api/drummers/index.js');
  process.exit(1);
}
const drummers = eval(drummersMatch[1]);

function toSlug(name) {
  return name.toLowerCase()
    .replace(/[åä]/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u')
    .replace(/é|è|ê|ë/g, 'e').replace(/í|ì|î|ï/g, 'i').replace(/ó|ò|ô/g, 'o')
    .replace(/ú|ù|û/g, 'u').replace(/ñ/g, 'n').replace(/ß/g, 'ss')
    .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

const drummerBySlug = {};
for (const d of drummers) {
  drummerBySlug[toSlug(d.name)] = d;
}

const cymbalDrummers = CYMBAL_SETUPS
  .map((setup) => {
    const drummer = drummerBySlug[setup.drummerSlug];
    if (!drummer) return null;
    return { setup, slug: setup.drummerSlug, name: drummer.name, band: drummer.band };
  })
  .filter(Boolean)
  .sort((a, b) => a.name.localeCompare(b.name));

if (cymbalDrummers.length !== CYMBAL_SETUPS.length) {
  console.error(`Drummer lookup mismatch: ${CYMBAL_SETUPS.length} CYMBAL_SETUPS records, ${cymbalDrummers.length} resolved to a roster drummer.`);
  process.exit(1);
}

const today = new Date().toISOString().split('T')[0];

// ---------------------------------------------------------------------------
// Per-drummer setup files — public/llms/cymbals/setups/<slug>.md
// ---------------------------------------------------------------------------

function buildSetupMarkdown({ setup, slug, name, band }) {
  const directAnswer = generateCymbalSetupDirectAnswer({ setup, drummerName: name });
  const url = `${BASE}/cymbals/setups/${slug}`;
  const drummerUrl = `${BASE}/drummer/${slug}`;

  const parts = [];
  parts.push(`# What Cymbals Does ${name} Use? Full Setup`);
  parts.push('');
  parts.push(`**Band:** ${band} | **Brand(s):** ${setup.brands.length ? setup.brands.join(' & ') : 'unspecified'}`);
  parts.push('');
  parts.push('---');
  parts.push('');
  parts.push('## Direct Answer');
  parts.push('');
  parts.push(directAnswer);
  parts.push('');

  parts.push('## Cymbal Breakdown');
  parts.push('');
  if (setup.pieces.length > 0) {
    parts.push('| Piece | Size | Series | Model |');
    parts.push('|-------|------|--------|-------|');
    for (const piece of setup.pieces) {
      parts.push(`| ${TYPE_LABELS[piece.type] || piece.type} | ${piece.sizeIn}" | ${piece.series || '—'} | ${piece.model} |`);
    }
    parts.push('');
  }
  parts.push(`Verified roster hardware entry: "${setup.summary}." Source: ${setup.source}.`);
  parts.push('');

  const seenTypes = [...new Set(setup.pieces.map((p) => p.type))];
  const contextLines = seenTypes.map(typeContext).filter(Boolean);
  if (contextLines.length) {
    parts.push('## Setup Context');
    parts.push('');
    for (const line of contextLines) {
      parts.push(`- ${line}`);
    }
    parts.push('');
  }

  parts.push('## FAQ');
  parts.push('');
  parts.push(`**Q: What cymbals does ${name} use?**`);
  parts.push(`A: ${directAnswer}`);
  parts.push('');

  parts.push('## More Resources');
  parts.push('');
  parts.push(`- [Full cymbal setup page](${url})`);
  parts.push(`- [${name}'s Drummer Profile](${drummerUrl})`);
  parts.push(`- [Cymbals Guide](${BASE}/llms/cymbals.md)`);
  parts.push(`- [All LLM Resources](${BASE}/llms/index.md)`);
  parts.push('');
  parts.push('---');
  parts.push('');
  parts.push(`*Last updated: ${today} · Source: [MetalForge.io](${BASE})*`);

  return parts.join('\n');
}

// ---------------------------------------------------------------------------
// Write files
// ---------------------------------------------------------------------------

const outRoot = path.join(__dirname, '../public/llms');
const setupsDir = path.join(outRoot, 'cymbals/setups');
fs.mkdirSync(setupsDir, { recursive: true });

let written = 0;
const shortFiles = [];
for (const entry of cymbalDrummers) {
  const md = buildSetupMarkdown(entry);
  fs.writeFileSync(path.join(setupsDir, `${entry.slug}.md`), md);
  const wordCount = md.split(/\s+/).filter(Boolean).length;
  if (wordCount < 150) shortFiles.push(`${entry.slug} (${wordCount} words)`);
  written++;
}

console.log(`Wrote ${written} per-drummer cymbal setup files to public/llms/cymbals/setups/.`);
if (shortFiles.length) {
  console.error(`WARNING: ${shortFiles.length} setup file(s) under 150 words: ${shortFiles.join(', ')}`);
  process.exit(1);
}
