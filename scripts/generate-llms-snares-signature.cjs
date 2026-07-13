#!/usr/bin/env node
/**
 * Generate public/llms/snares/signature/<drummer>.md — the /llms/ markdown
 * mirror of the /snares/signature/<drummer> pages (Issue #4311, epic #4308
 * phase 3/4). Issue #4578: the live route shipped with 10 pages but no
 * markdown citation surface was ever generated for it — the sibling
 * /pedals/setups and /cymbals/setups surfaces both have one
 * (scripts/generate-llms-pedals.cjs, scripts/generate-llms-cymbals-setups.cjs),
 * this script brings /snares/signature to parity.
 *
 * Data sources (both read live, no hardcoded drummer/slug list):
 *  - packages/frontend/data/snares.js (SIGNATURE_SNARES — the isSignature:
 *    true subset)
 *  - packages/frontend/data/signatureSnarePages.js
 *    (generateSignatureSnareDirectAnswer) — extracted and reused verbatim so
 *    the /llms/ file and the live /snares/signature/<slug> page never say
 *    different things.
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

// signatureSnarePages.js imports getSnareForDrummer from ./snares — not
// needed here since we call generateSignatureSnareDirectAnswer directly
// with a { snare, drummerName } shape, matching its own signature.
const { generateSignatureSnareDirectAnswer } = loadModuleConsts(
  path.join(__dirname, '../packages/frontend/data/signatureSnarePages.js'),
  ['generateSignatureSnareDirectAnswer']
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

const today = new Date().toISOString().split('T')[0];

// ---------------------------------------------------------------------------
// Per-drummer signature-snare files — public/llms/snares/signature/<slug>.md
// ---------------------------------------------------------------------------

function buildSignatureMarkdown({ snare, slug, name, band }, allSignatureDrummers) {
  const directAnswer = generateSignatureSnareDirectAnswer({ snare, drummerName: name });
  const url = `${BASE}/snares/signature/${slug}`;
  const drummerUrl = `${BASE}/drummer/${slug}`;

  const parts = [];
  parts.push(`# What Snare Does ${name} Use? ${snare.brand} ${snare.model}`);
  parts.push('');
  parts.push(`**Band:** ${band} | **Brand:** ${snare.brand} | **Model:** ${snare.model}`);
  parts.push('');
  parts.push('---');
  parts.push('');
  parts.push('## Direct Answer');
  parts.push('');
  parts.push(directAnswer);
  parts.push('');
  parts.push(`This is a namesake signature model — ${snare.brand} built the ${snare.model} specifically for ${name} of ${band}, rather than ${name} simply endorsing an off-the-shelf shell. That distinction is why this snare gets its own page: it's the drummer's own spec, not a generic stock configuration another drummer could also be playing.`);
  parts.push('');

  parts.push('## Snare Specs');
  parts.push('');
  parts.push('| Spec | Value |');
  parts.push('|------|-------|');
  parts.push(`| Brand | ${snare.brand} |`);
  parts.push(`| Model | ${snare.model} |`);
  parts.push(`| Size | ${snare.sizeIn}" |`);
  parts.push(`| Depth | ${snare.depthIn}" |`);
  if (snare.shellMaterial) {
    parts.push(`| Shell Material | ${snare.shellMaterial} |`);
  }
  parts.push('');
  parts.push(`Verified roster hardware entry: "${snare.summary}." Source: ${snare.source}.`);
  parts.push('');

  parts.push('## FAQ');
  parts.push('');
  parts.push(`**Q: What snare does ${name} use?**`);
  parts.push(`A: ${directAnswer}`);
  parts.push('');
  parts.push(`**Q: Is the ${snare.brand} ${snare.model} a signature model?**`);
  parts.push(`A: Yes — it's built by ${snare.brand} specifically for ${name}, one of ${allSignatureDrummers.length} confirmed namesake signature snares on MetalForge's verified roster.`);
  parts.push('');

  const others = allSignatureDrummers.filter((d) => d.slug !== slug);
  if (others.length > 0) {
    parts.push('## Other Signature Snares We Cover');
    parts.push('');
    parts.push(`MetalForge tracks ${allSignatureDrummers.length} verified drummer signature snares. Besides ${name}, see:`);
    parts.push('');
    for (const other of others) {
      parts.push(`- [${other.name} — ${other.snare.brand} ${other.snare.model}](${BASE}/llms/snares/signature/${other.slug}.md)`);
    }
    parts.push('');
  }

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

const outRoot = path.join(__dirname, '../public/llms');
const signatureDir = path.join(outRoot, 'snares/signature');
fs.mkdirSync(signatureDir, { recursive: true });

let written = 0;
const shortFiles = [];
for (const entry of signatureDrummers) {
  const md = buildSignatureMarkdown(entry, signatureDrummers);
  fs.writeFileSync(path.join(signatureDir, `${entry.slug}.md`), md);
  const wordCount = md.split(/\s+/).filter(Boolean).length;
  if (wordCount < 150) shortFiles.push(`${entry.slug} (${wordCount} words)`);
  written++;
}

console.log(`Wrote ${written} per-drummer signature snare files to public/llms/snares/signature/.`);
if (shortFiles.length) {
  console.error(`WARNING: ${shortFiles.length} signature snare file(s) under 150 words: ${shortFiles.join(', ')}`);
  process.exit(1);
}
