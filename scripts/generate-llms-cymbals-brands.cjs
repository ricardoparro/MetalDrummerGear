#!/usr/bin/env node
/**
 * Generate public/llms/cymbals/brands/<slug>.md — one markdown citation file
 * per brand in CYMBAL_BRANDS. Issue #4478: /cymbals/brands/<slug> already has
 * a live HTML page per brand (#4307), but unlike the sibling
 * /pedals/brands/<slug>.md batch (#4432/#4431) no /llms/ markdown surface was
 * ever generated for it — this fills that gap.
 *
 * Reads CYMBAL_BRANDS from packages/frontend/data/cymbalBrands.js and
 * CYMBAL_SETUPS from packages/frontend/data/cymbalSetups.js (same regex+eval
 * extraction pattern as the sibling generate-llms-*.cjs scripts). Confirmed
 * drummers per brand are computed inline from CYMBAL_SETUPS, mirroring
 * getConfirmedSetupsForBrand() in cymbalBrands.js exactly (filter by
 * setup.brands including one of brand.dataBrandNames) — never hand-authored,
 * so this file can never show an endorsement the live page doesn't also show.
 */

'use strict';
const fs = require('fs');
const path = require('path');

const BASE = 'https://metalforge.io';
const today = new Date().toISOString().split('T')[0];

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

const { CYMBAL_BRANDS } = loadModuleConsts(
  path.join(__dirname, '../packages/frontend/data/cymbalBrands.js'),
  ['CYMBAL_BRANDS']
);

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

function toSlugFromName(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const drummerBySlug = {};
for (const d of drummers) {
  drummerBySlug[toSlugFromName(d.name)] = d;
}

// Mirrors getConfirmedSetupsForBrand() in cymbalBrands.js verbatim.
function confirmedSetupsForBrand(brand) {
  if (!brand.dataBrandNames || brand.dataBrandNames.length === 0) return [];
  return CYMBAL_SETUPS.filter((setup) => setup.brands.some((b) => brand.dataBrandNames.includes(b)));
}

function buildBrandMarkdown(brand, allBrands) {
  const url = `${BASE}/cymbals/brands/${brand.slug}`;
  const confirmedSetups = confirmedSetupsForBrand(brand)
    .map((setup) => {
      const drummer = setup.drummerSlug ? drummerBySlug[setup.drummerSlug] : null;
      return drummer ? { setup, slug: setup.drummerSlug, name: drummer.name, band: drummer.band } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name));

  const parts = [];
  parts.push(`# ${brand.name} Cymbals: Metal-Relevant Series & Which Drummers Use Them`);
  parts.push('');
  parts.push(`> ${brand.positioning}`);
  parts.push('');
  parts.push('---');
  parts.push('');

  if (brand.founded || brand.parent) {
    parts.push('## Company Background');
    parts.push('');
    if (brand.founded) parts.push(`- **Founded:** ${brand.founded}`);
    if (brand.parent) parts.push(`- **Parent/Ownership:** ${brand.parent}`);
    parts.push('');
  }

  parts.push('## Notable Series for Metal Drummers');
  parts.push('');
  for (const line of brand.notableLines) {
    parts.push(`- **${line.name}:** ${line.description}`);
  }
  parts.push('');

  parts.push(`## Confirmed Metal Drummers (${confirmedSetups.length})`);
  parts.push('');
  if (confirmedSetups.length > 0) {
    parts.push('| Drummer | Band | Cymbal Setup |');
    parts.push('|---------|------|--------------|');
    for (const { setup, slug, name, band } of confirmedSetups) {
      parts.push(`| [${name}](${BASE}/cymbals/setups/${slug}) | ${band} | ${setup.summary} |`);
    }
    parts.push('');
    parts.push(`These ${confirmedSetups.length} entr${confirmedSetups.length === 1 ? 'y is' : 'ies are'} pulled directly from MetalForge's verified cymbal setups database, parsed from each drummer's roster gear record — never guessed from a photo or a forum post.`);
  } else {
    parts.push(`We haven't verified a ${brand.name} cymbal setup played by one of our mapped metal drummers yet. That's a gap in our research, not a claim that no metal drummer plays ${brand.name} — setups are only added here once a drummer's roster gear record confirms the pairing.`);
  }
  parts.push('');

  parts.push(`Source: [${brand.source.label}](${brand.source.url}).`);
  parts.push('');

  parts.push('## FAQ');
  parts.push('');
  parts.push(`**Q: What cymbals does ${brand.name} make for metal drummers?**`);
  parts.push(`A: ${brand.positioning}`);
  parts.push('');
  parts.push(`**Q: Which metal drummers play ${brand.name} cymbals?**`);
  if (confirmedSetups.length > 0) {
    const names = confirmedSetups.map((c) => c.name).join(', ');
    parts.push(`A: On our verified roster: ${names}. See the table above for each drummer's exact setup.`);
  } else {
    parts.push(`A: No drummer on our verified roster currently has a confirmed ${brand.name} cymbal setup — see the Notable Series section above for what the brand offers metal-leaning players.`);
  }
  parts.push('');
  parts.push(`**Q: What are ${brand.name}'s most metal-relevant cymbal series?**`);
  const lineNames = brand.notableLines.map((l) => l.name).join(', ');
  parts.push(`A: ${lineNames}. Full descriptions are in the Notable Series section above.`);
  parts.push('');

  const otherBrands = allBrands.filter((b) => b.slug !== brand.slug);
  if (otherBrands.length > 0) {
    parts.push('## Other Cymbal Brands We Cover');
    parts.push('');
    parts.push(`MetalForge tracks ${allBrands.length} cymbal brands relevant to metal drummers. Besides ${brand.name}, see:`);
    parts.push('');
    for (const other of otherBrands) {
      parts.push(`- [${other.name}](${BASE}/llms/cymbals/brands/${other.slug}.md)`);
    }
    parts.push('');
  }

  parts.push('## More Resources');
  parts.push('');
  parts.push(`- [Live page](${url})`);
  parts.push(`- [All Cymbal Brands](${BASE}/cymbals/brands)`);
  parts.push(`- [Cymbals Guide](${BASE}/llms/cymbals.md)`);
  parts.push(`- [All LLM Resources](${BASE}/llms/index.md)`);
  parts.push('');
  parts.push('---');
  parts.push('');
  parts.push(`*Last updated: ${today} · Source: [MetalForge.io](${BASE})*`);

  return parts.join('\n');
}

const outDir = path.join(__dirname, '../public/llms/cymbals/brands');
fs.mkdirSync(outDir, { recursive: true });

let written = 0;
const shortFiles = [];
for (const brand of CYMBAL_BRANDS) {
  const md = buildBrandMarkdown(brand, CYMBAL_BRANDS);
  fs.writeFileSync(path.join(outDir, `${brand.slug}.md`), md);
  const wordCount = md.split(/\s+/).filter(Boolean).length;
  if (wordCount < 300) shortFiles.push(`${brand.slug} (${wordCount} words)`);
  written++;
}

console.log(`✅ Generated ${written} cymbal brand pages in public/llms/cymbals/brands/`);
if (shortFiles.length) {
  console.error(`WARNING: ${shortFiles.length} brand file(s) under 300 words: ${shortFiles.join(', ')}`);
  process.exit(1);
}
