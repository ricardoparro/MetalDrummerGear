#!/usr/bin/env node
/**
 * Generate public/llms/drumsticks/signature/<slug>.md — the /llms/ markdown
 * surface for the 30 live /drumsticks/signature/<drummer> pages. Issue #4577:
 * DRUMMER_STICKS (packages/frontend/data/drumsticks.js) has 30 confirmed
 * drummer->stick mappings, each with a live sitemapped page (api/sitemap.js),
 * but zero corresponding /llms/ markdown mirrors existed — no citation
 * surface for "what drumsticks does <drummer> use" queries. Mirrors the
 * pattern already shipped for /pedals/setups/<drummer>
 * (scripts/generate-llms-pedals.cjs).
 *
 * Data sources (both read live, no hardcoded drummer/slug list):
 *  - packages/frontend/data/drumsticks.js (DRUMSTICKS / DRUMMER_STICKS)
 *  - packages/frontend/data/drumstickBrands.js (DRUMSTICK_BRANDS, for the
 *    optional brand cross-link — same getBrandForStick() lookup the live
 *    SignatureStickPage.jsx uses)
 *  - api/drummers/index.js (drummer name/band)
 *
 * Field set and direct-answer wording mirror
 * packages/frontend/data/signatureStickPages.js
 * (getSignatureStickPageData / generateSignatureStickDescription) and the
 * "Stick Specs" table in packages/frontend/components/SignatureStickPage.jsx
 * so the /llms/ file and the live page never disagree.
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

const { DRUMSTICKS, DRUMMER_STICKS } = loadModuleConsts(
  path.join(__dirname, '../packages/frontend/data/drumsticks.js'),
  ['DRUMSTICKS', 'DRUMMER_STICKS']
);

const { DRUMSTICK_BRANDS } = loadModuleConsts(
  path.join(__dirname, '../packages/frontend/data/drumstickBrands.js'),
  ['DRUMSTICK_BRANDS']
);

function getStickById(id) {
  return DRUMSTICKS.find((s) => s.id === id) || null;
}

function getBrandForStick(stick) {
  if (!stick || !stick.brand) return null;
  return DRUMSTICK_BRANDS.find((b) => b.dataBrandNames.includes(stick.brand)) || null;
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
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const drummerBySlug = {};
for (const d of drummers) {
  drummerBySlug[toSlug(d.name)] = d;
}

const stickDrummers = Object.keys(DRUMMER_STICKS)
  .map((slug) => {
    const stick = getStickById(DRUMMER_STICKS[slug][0]);
    const drummer = drummerBySlug[slug];
    if (!stick || !drummer) return null;
    return { stick, slug, name: drummer.name, band: drummer.band };
  })
  .filter(Boolean)
  .sort((a, b) => a.name.localeCompare(b.name));

if (stickDrummers.length !== Object.keys(DRUMMER_STICKS).length) {
  console.error(`Drummer lookup mismatch: ${Object.keys(DRUMMER_STICKS).length} DRUMMER_STICKS entries, ${stickDrummers.length} resolved to a roster drummer + stick record.`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Direct-answer text — mirrors generateSignatureStickDescription() in
// packages/frontend/data/signatureStickPages.js verbatim.
// ---------------------------------------------------------------------------

function generateDirectAnswer(stick, drummerName) {
  return `${drummerName} plays the ${stick.brand} ${stick.model} — ${stick.material}, ${stick.size} ` +
    `(${stick.diameterIn}" dia. x ${stick.lengthIn}" long), ${stick.tip.toLowerCase()} tip.`;
}

function endorsementContext(stick, drummerName) {
  if (stick.endorsementType === 'signature-model') {
    return `This is a dedicated signature model bearing ${drummerName}'s name, developed in partnership with ${stick.brand}.`;
  }
  if (stick.endorsementType === 'artist-endorsement') {
    return `This is an artist-endorsed stock model ${drummerName} plays — not a named signature series.`;
  }
  return null;
}

const today = new Date().toISOString().split('T')[0];

// ---------------------------------------------------------------------------
// Per-drummer file — public/llms/drumsticks/signature/<slug>.md
// ---------------------------------------------------------------------------

function buildSignatureMarkdown({ stick, slug, name, band }) {
  const directAnswer = generateDirectAnswer(stick, name);
  const url = `${BASE}/drumsticks/signature/${slug}`;
  const drummerUrl = `${BASE}/drummer/${slug}`;
  const brand = getBrandForStick(stick);

  const parts = [];
  parts.push(`# What Drumsticks Does ${name} Use? ${stick.brand} ${stick.model}`);
  parts.push('');
  parts.push(`**Band:** ${band} | **Brand:** ${stick.brand} | **Model:** ${stick.model}`);
  parts.push('');
  parts.push('---');
  parts.push('');
  parts.push('## Direct Answer');
  parts.push('');
  parts.push(directAnswer);
  parts.push('');

  parts.push('## Stick Specs');
  parts.push('');
  parts.push('| Field | Value |');
  parts.push('|-------|-------|');
  parts.push(`| Brand | ${stick.brand} |`);
  parts.push(`| Model | ${stick.model} |`);
  parts.push(`| Size | ${stick.size} |`);
  parts.push(`| Diameter | ${stick.diameterIn}" |`);
  parts.push(`| Length | ${stick.lengthIn}" |`);
  parts.push(`| Material | ${stick.material} |`);
  parts.push(`| Tip | ${stick.tip} |`);
  parts.push(`| Taper | ${stick.taper} |`);
  parts.push('');

  const endorsementCtx = endorsementContext(stick, name);
  if (endorsementCtx) {
    parts.push(endorsementCtx);
    parts.push('');
  }

  if (stick.notes) {
    parts.push(`**Note:** ${stick.notes}`);
    parts.push('');
  }

  parts.push(`Verified roster entry. Source: ${stick.source}.`);
  parts.push('');

  parts.push('## FAQ');
  parts.push('');
  parts.push(`**Q: What drumsticks does ${name} use?**`);
  parts.push(`A: ${directAnswer}`);
  parts.push('');

  parts.push('## More Resources');
  parts.push('');
  parts.push(`- [Full signature stick page](${url})`);
  parts.push(`- [${name}'s Drummer Profile](${drummerUrl})`);
  if (brand) {
    parts.push(`- [${brand.name} Drumsticks Brand Guide](${BASE}/llms/drumsticks/brands/${brand.slug}.md)`);
  }
  parts.push(`- [Drumsticks Guide](${BASE}/llms/drumsticks.md)`);
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

const outDir = path.join(__dirname, '../public/llms/drumsticks/signature');
fs.mkdirSync(outDir, { recursive: true });

let written = 0;
const shortFiles = [];
for (const entry of stickDrummers) {
  const md = buildSignatureMarkdown(entry);
  fs.writeFileSync(path.join(outDir, `${entry.slug}.md`), md);
  const wordCount = md.split(/\s+/).filter(Boolean).length;
  if (wordCount < 150) shortFiles.push(`${entry.slug} (${wordCount} words)`);
  written++;
}

console.log(`Wrote ${written} per-drummer signature stick files to public/llms/drumsticks/signature/.`);
if (shortFiles.length) {
  console.error(`WARNING: ${shortFiles.length} file(s) under 150 words: ${shortFiles.join(', ')}`);
  process.exit(1);
}

module.exports = { stickDrummers };
