#!/usr/bin/env node
/**
 * Generate public/llms/snares/signature/<drummer>.md — the /llms/ markdown
 * mirror of the /snares/signature/<drummer> pages (Issue #4311, epic #4308
 * phase 3/4). Issue #4578: the live route shipped with 10 pages (one per
 * SIGNATURE_SNARES entry) but no markdown citation surface was ever
 * generated for it — the parallel /cymbals/setups and /pedals/setups
 * surfaces both have one (generate-llms-cymbals-setups.cjs,
 * generate-llms-pedals.cjs), this script brings /snares/signature to parity.
 *
 * Data sources (both read live, no hardcoded drummer/slug list):
 *  - packages/frontend/data/snares.js (SIGNATURE_SNARES = SNARES.filter(s =>
 *    s.isSignature))
 *  - packages/frontend/data/signatureSnarePages.js
 *    (generateSignatureSnareDirectAnswer) — extracted and reused verbatim so
 *    the /llms/ file and the live /snares/signature/<slug> page never say
 *    different things.
 *  - packages/frontend/data/snareReferencePages.js (SHELLS_TABLE,
 *    SIZES_TABLE) — real, already-published snare reference descriptions
 *    used to add setup context, same discipline as generate-llms-pedals.cjs's
 *    drive-type/config context and generate-llms-cymbals-setups.cjs's
 *    cymbal-type context.
 *  - api/drummers/index.js (drummer name/band, matched to a snare record via
 *    toSlug(name) === snare.drummerSlug — same convention the live
 *    SignatureSnarePage.jsx component uses)
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

const { SIGNATURE_SNARES } = loadModuleConsts(
  path.join(__dirname, '../packages/frontend/data/snares.js'),
  ['SIGNATURE_SNARES']
);

const { generateSignatureSnareDirectAnswer } = loadModuleConsts(
  path.join(__dirname, '../packages/frontend/data/signatureSnarePages.js'),
  ['generateSignatureSnareDirectAnswer']
);

const { SHELLS_TABLE, SIZES_TABLE } = loadModuleConsts(
  path.join(__dirname, '../packages/frontend/data/snareReferencePages.js'),
  ['SHELLS_TABLE', 'SIZES_TABLE']
);

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

const signatureDrummers = SIGNATURE_SNARES
  .map((snare) => {
    const drummer = drummerBySlug[snare.drummerSlug];
    if (!drummer) return null;
    return { snare, slug: snare.drummerSlug, name: drummer.name, band: drummer.band };
  })
  .filter(Boolean)
  .sort((a, b) => a.name.localeCompare(b.name));

if (signatureDrummers.length !== SIGNATURE_SNARES.length) {
  console.error(`Drummer lookup mismatch: ${SIGNATURE_SNARES.length} SIGNATURE_SNARES records, ${signatureDrummers.length} resolved to a roster drummer.`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Setup context — real reference-page content, matched to this snare's size
// and shell material, mirroring driveTypeContext/configContext in
// generate-llms-pedals.cjs and typeContext in generate-llms-cymbals-setups.cjs.
// ---------------------------------------------------------------------------

const PARSED_SIZES = SIZES_TABLE
  .map((row) => {
    const m = row.size.match(/^(\d+(?:\.\d+)?)"\s*x\s*(\d+(?:\.\d+)?)"(?:[–-](\d+(?:\.\d+)?)")?$/);
    if (!m) return null;
    const diam = parseFloat(m[1]);
    const depthMin = parseFloat(m[2]);
    const depthMax = m[3] ? parseFloat(m[3]) : depthMin;
    return { diam, depthMin, depthMax, row };
  })
  .filter(Boolean);

function sizeContext(sizeIn, depthIn) {
  const match = PARSED_SIZES.find((p) => p.diam === sizeIn && depthIn >= p.depthMin && depthIn <= p.depthMax);
  if (!match) return null;
  return `**${match.row.size} (${match.row.category}):** ${match.row.why}`;
}

function shellContext(shellMaterial) {
  if (!shellMaterial) return [];
  return shellMaterial.split('/')
    .map((token) => token.trim())
    .map((material) => {
      const row = SHELLS_TABLE.find((r) => r.material === material);
      return row ? `**${row.material} shell:** ${row.tone} ${row.metalRole}` : null;
    })
    .filter(Boolean);
}

const today = new Date().toISOString().split('T')[0];

// ---------------------------------------------------------------------------
// Per-drummer signature files — public/llms/snares/signature/<slug>.md
// ---------------------------------------------------------------------------

function buildSignatureMarkdown({ snare, slug, name, band }) {
  const directAnswer = generateSignatureSnareDirectAnswer({ snare, drummerName: name });
  const url = `${BASE}/snares/signature/${slug}`;
  const drummerUrl = `${BASE}/drummer/${slug}`;

  const parts = [];
  parts.push(`# What Snare Does ${name} Use? ${snare.brand} ${snare.model}`);
  parts.push('');
  parts.push(`**Band:** ${band} | **Brand:** ${snare.brand} | **Size:** ${snare.sizeIn}x${snare.depthIn}"`);
  parts.push('');
  parts.push('---');
  parts.push('');
  parts.push('## Direct Answer');
  parts.push('');
  parts.push(directAnswer);
  parts.push('');

  parts.push('## Snare Specs');
  parts.push('');
  parts.push('| Field | Value |');
  parts.push('|-------|-------|');
  parts.push(`| Brand | ${snare.brand || '—'} |`);
  parts.push(`| Model | ${snare.model || '—'} |`);
  parts.push(`| Size | ${snare.sizeIn}" |`);
  parts.push(`| Depth | ${snare.depthIn}" |`);
  parts.push(`| Shell Material | ${snare.shellMaterial || '—'} |`);
  parts.push('');
  parts.push(`Verified roster hardware entry: "${snare.summary}." Source: ${snare.source}.`);
  parts.push('');

  const contextLines = [sizeContext(snare.sizeIn, snare.depthIn), ...shellContext(snare.shellMaterial)].filter(Boolean);
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
  parts.push(`**Q: What snare does ${name} use?**`);
  parts.push(`A: ${directAnswer}`);
  parts.push('');
  parts.push(`**Q: What size is ${name}'s ${snare.brand} ${snare.model} snare?**`);
  const shellSuffix = snare.shellMaterial ? `, with a ${snare.shellMaterial} shell` : '';
  parts.push(`A: ${name}'s signature snare measures ${snare.sizeIn}x${snare.depthIn}"${shellSuffix}.`);
  parts.push('');

  parts.push('## More Resources');
  parts.push('');
  parts.push(`- [Full signature snare page](${url})`);
  parts.push(`- [${name}'s Drummer Profile](${drummerUrl})`);
  parts.push(`- [Snares Guide](${BASE}/llms/snares.md)`);
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

const outDir = path.join(__dirname, '../public/llms/snares/signature');
fs.mkdirSync(outDir, { recursive: true });

let written = 0;
const shortFiles = [];
for (const entry of signatureDrummers) {
  const md = buildSignatureMarkdown(entry);
  fs.writeFileSync(path.join(outDir, `${entry.slug}.md`), md);
  const wordCount = md.split(/\s+/).filter(Boolean).length;
  if (wordCount < 150) shortFiles.push(`${entry.slug} (${wordCount} words)`);
  written++;
}

console.log(`Wrote ${written} per-drummer signature snare files to public/llms/snares/signature/.`);
if (shortFiles.length) {
  console.error(`WARNING: ${shortFiles.length} signature file(s) under 150 words: ${shortFiles.join(', ')}`);
  process.exit(1);
}
