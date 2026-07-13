#!/usr/bin/env node
/**
 * Generate public/llms/drumsticks/signature/<slug>.md — one markdown citation
 * file per drummer in DRUMMER_STICKS. Issue #4577: the 30 live
 * /drumsticks/signature/<drummer> pages (#4138, epic #4135 phase 3/4) have
 * zero /llms/ markdown mirrors — this fills that gap, matching the
 * /pedals/setups/<slug>.md precedent (#4497) and the /cymbals/setups/<slug>.md
 * precedent (#4518).
 *
 * Reads DRUMMER_STICKS/DRUMSTICKS from packages/frontend/data/drumsticks.js
 * and drummer names/bands from api/drummers/index.js (same regex+eval
 * extraction pattern as the sibling generate-llms-*.cjs scripts). Content is
 * built directly from the same fields the live SignatureStickPage.jsx /
 * signatureStickPages.js render — brand, model, size, diameter, length,
 * material, tip, taper, source, notes — so the two surfaces can never
 * disagree.
 */

'use strict';
const fs = require('fs');
const path = require('path');

const BASE = 'https://metalforge.io';
const today = new Date().toISOString().split('T')[0];

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

// DRUMMER_STICKS: drummerSlug -> stick id[], derived the same way
// packages/frontend/data/drumsticks.js derives it. Only the first stick per
// drummer is used, mirroring getSignatureStickPageData() in
// signatureStickPages.js (getSticksForDrummer(slug)[0]).
const stickById = {};
for (const stick of DRUMSTICKS) {
  stickById[stick.id] = stick;
}
const DRUMMER_STICKS = DRUMSTICKS.reduce((map, stick) => {
  if (!stick.drummerSlug) return map;
  if (!map[stick.drummerSlug]) map[stick.drummerSlug] = [];
  map[stick.drummerSlug].push(stick.id);
  return map;
}, {});

const { DRUMSTICK_BRANDS } = (() => {
  const src = fs.readFileSync(path.join(__dirname, '../packages/frontend/data/drumstickBrands.js'), 'utf-8');
  const body = src
    .replace(/^import[^\n]*\n/gm, '')
    .replace(/export default[\s\S]*$/, '')
    .replace(/export function/g, 'function')
    .replace(/export const/g, 'const');
  // eslint-disable-next-line no-eval
  return eval(`(function(){\n${body}\nreturn {DRUMSTICK_BRANDS};\n})()`);
})();

function brandForStick(stick) {
  return DRUMSTICK_BRANDS.find((b) => b.dataBrandNames && b.dataBrandNames.includes(stick.brand)) || null;
}

const signatureDrummers = Object.keys(DRUMMER_STICKS)
  .map((slug) => {
    const drummer = drummerBySlug[slug];
    const stick = stickById[DRUMMER_STICKS[slug][0]];
    if (!drummer || !stick) return null;
    return { slug, name: drummer.name, band: drummer.band, stick };
  })
  .filter(Boolean)
  .sort((a, b) => a.name.localeCompare(b.name));

if (signatureDrummers.length !== Object.keys(DRUMMER_STICKS).length) {
  console.error(`Drummer lookup mismatch: ${Object.keys(DRUMMER_STICKS).length} DRUMMER_STICKS entries, ${signatureDrummers.length} resolved to a roster drummer.`);
  process.exit(1);
}

function buildMarkdown({ slug, name, band, stick }) {
  const url = `${BASE}/drumsticks/signature/${slug}`;
  const drummerUrl = `${BASE}/drummer/${slug}`;
  const brand = brandForStick(stick);

  const parts = [];
  parts.push(`# What Drumsticks Does ${name} Use? ${stick.brand} ${stick.model}`);
  parts.push('');
  parts.push(`**Band:** ${band} | **Brand:** ${stick.brand} | **Model:** ${stick.model}`);
  parts.push('');
  parts.push('---');
  parts.push('');
  parts.push('## Direct Answer');
  parts.push('');
  parts.push(`${name} plays the ${stick.brand} ${stick.model} — ${stick.material}, ${stick.size} (${stick.diameterIn}" diameter x ${stick.lengthIn}" long), ${stick.tip.toLowerCase()} tip, ${stick.taper.toLowerCase()} taper.`);
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
  parts.push(`| Endorsement | ${stick.endorsementType === 'signature-model' ? 'Signature model' : 'Artist endorsement (stock model)'} |`);
  parts.push('');
  parts.push(`Verified roster hardware entry. Source: ${stick.source}.`);
  parts.push('');

  if (stick.notes) {
    parts.push('## Notes');
    parts.push('');
    parts.push(stick.notes);
    parts.push('');
  }

  parts.push('## FAQ');
  parts.push('');
  parts.push(`**Q: What drumsticks does ${name} use?**`);
  parts.push(`A: ${name} plays the ${stick.brand} ${stick.model}, a ${stick.material.toLowerCase()} stick sized ${stick.size} (${stick.diameterIn}" x ${stick.lengthIn}") with a ${stick.tip.toLowerCase()} tip and ${stick.taper.toLowerCase()} taper.`);
  parts.push('');
  parts.push(`**Q: Is this a true signature model or just an endorsement?**`);
  parts.push(`A: ${stick.endorsementType === 'signature-model'
    ? `It's a named signature model — the ${stick.brand} ${stick.model} is designed and marketed specifically for ${name}.`
    : `It's an artist endorsement of a stock ${stick.brand} model, not a custom signature stick designed for ${name}.`}`);
  parts.push('');

  parts.push('## More Resources');
  parts.push('');
  parts.push(`- [Full signature stick page](${url})`);
  parts.push(`- [${name}'s Drummer Profile](${drummerUrl})`);
  if (brand) {
    parts.push(`- [${brand.name} Drumstick Brand Guide](${BASE}/llms/drumsticks/brands/${brand.slug}.md)`);
  }
  parts.push(`- [Drumsticks Guide](${BASE}/llms/drumsticks.md)`);
  parts.push(`- [All LLM Resources](${BASE}/llms/index.md)`);
  parts.push('');
  parts.push('---');
  parts.push('');
  parts.push(`*Last updated: ${today} · Source: [MetalForge.io](${BASE})*`);

  return parts.join('\n');
}

const outDir = path.join(__dirname, '../public/llms/drumsticks/signature');
fs.mkdirSync(outDir, { recursive: true });

let written = 0;
const shortFiles = [];
for (const entry of signatureDrummers) {
  const md = buildMarkdown(entry);
  fs.writeFileSync(path.join(outDir, `${entry.slug}.md`), md);
  const wordCount = md.split(/\s+/).filter(Boolean).length;
  if (wordCount < 150) shortFiles.push(`${entry.slug} (${wordCount} words)`);
  written++;
}

console.log(`✅ Generated ${written} signature drumstick pages in public/llms/drumsticks/signature/`);
if (shortFiles.length) {
  console.error(`WARNING: ${shortFiles.length} signature file(s) under 150 words: ${shortFiles.join(', ')}`);
  process.exit(1);
}
