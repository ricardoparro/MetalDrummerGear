#!/usr/bin/env node
/**
 * Generate public/llms/snares/brands/<slug>.md — one markdown citation file
 * per brand in SNARE_BRANDS. Issue #4488: /snares/brands/<slug> already has
 * a live HTML page per brand (#4483), but unlike the sibling
 * /cymbals/brands/<slug>.md and /drumsticks/brands/<slug>.md batches (#4478)
 * no /llms/ markdown surface was ever generated for it — this fills that gap.
 *
 * Reads SNARE_BRANDS from packages/frontend/data/snareBrands.js and SNARES
 * from packages/frontend/data/snares.js (same regex+eval extraction pattern
 * as the sibling generate-llms-*-brands.cjs scripts). Confirmed drummers per
 * brand are computed inline from SNARES, mirroring getSnaresForBrand() in
 * snareBrands.js exactly (filter by snare.brand matching one of
 * brand.dataBrandNames) — never hand-authored, so this file can never show
 * an endorsement the live page doesn't also show.
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

const { SNARE_BRANDS } = loadModuleConsts(
  path.join(__dirname, '../packages/frontend/data/snareBrands.js'),
  ['SNARE_BRANDS']
);

const { SNARES } = loadModuleConsts(
  path.join(__dirname, '../packages/frontend/data/snares.js'),
  ['SNARES']
);

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

// Mirrors getSnaresForBrand() in snareBrands.js verbatim.
function confirmedSnaresForBrand(brand) {
  if (!brand.dataBrandNames || brand.dataBrandNames.length === 0) return [];
  return SNARES.filter((snare) => snare.brand && brand.dataBrandNames.includes(snare.brand));
}

function buildBrandMarkdown(brand, allBrands) {
  const url = `${BASE}/snares/brands/${brand.slug}`;
  const confirmedSnares = confirmedSnaresForBrand(brand)
    .map((snare) => {
      const drummer = drummerBySlug[snare.drummerSlug];
      return drummer ? { snare, slug: snare.drummerSlug, name: drummer.name, band: drummer.band } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name));

  const parts = [];
  parts.push(`# ${brand.name} Snares: Metal-Relevant Models & Which Drummers Use Them`);
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

  parts.push('## Notable Models for Metal Drummers');
  parts.push('');
  for (const line of brand.notableLines) {
    parts.push(`- **${line.name}:** ${line.description}`);
  }
  parts.push('');

  parts.push(`## Confirmed Metal Drummers (${confirmedSnares.length})`);
  parts.push('');
  if (confirmedSnares.length > 0) {
    parts.push('| Drummer | Band | Snare |');
    parts.push('|---------|------|-------|');
    for (const { snare, slug, name, band } of confirmedSnares) {
      parts.push(`| [${name}](${BASE}/llms/drummers/${slug}.md) | ${band} | ${snare.summary} |`);
    }
    parts.push('');
    parts.push(`These ${confirmedSnares.length} entr${confirmedSnares.length === 1 ? 'y is' : 'ies are'} pulled directly from MetalForge's verified snares database, parsed from each drummer's roster gear record — never guessed from a photo or a forum post.`);
  } else {
    parts.push(`We haven't verified a ${brand.name} snare played by one of our mapped metal drummers yet. That's a gap in our research, not a claim that no metal drummer plays ${brand.name} — snares are only added here once a drummer's roster gear record confirms the pairing.`);
  }
  parts.push('');

  parts.push(`Source: [${brand.source.label}](${brand.source.url}).`);
  parts.push('');

  parts.push('## FAQ');
  parts.push('');
  parts.push(`**Q: What snares does ${brand.name} make for metal drummers?**`);
  parts.push(`A: ${brand.positioning}`);
  parts.push('');
  parts.push(`**Q: Which metal drummers play ${brand.name} snares?**`);
  if (confirmedSnares.length > 0) {
    const names = confirmedSnares.map((c) => c.name).join(', ');
    parts.push(`A: On our verified roster: ${names}. See the table above for each drummer's exact snare.`);
  } else {
    parts.push(`A: No drummer on our verified roster currently has a confirmed ${brand.name} snare — see the Notable Models section above for what the brand offers metal-leaning players.`);
  }
  parts.push('');
  parts.push(`**Q: What are ${brand.name}'s most metal-relevant snare models?**`);
  const lineNames = brand.notableLines.map((l) => l.name).join(', ');
  parts.push(`A: ${lineNames}. Full descriptions are in the Notable Models section above.`);
  parts.push('');

  const otherBrands = allBrands.filter((b) => b.slug !== brand.slug);
  if (otherBrands.length > 0) {
    parts.push('## Other Snare Brands We Cover');
    parts.push('');
    parts.push(`MetalForge tracks ${allBrands.length} snare brands relevant to metal drummers. Besides ${brand.name}, see:`);
    parts.push('');
    for (const other of otherBrands) {
      parts.push(`- [${other.name}](${BASE}/llms/snares/brands/${other.slug}.md)`);
    }
    parts.push('');
  }

  parts.push('## More Resources');
  parts.push('');
  parts.push(`- [Live page](${url})`);
  parts.push(`- [All Snare Brands](${BASE}/snares/brands)`);
  parts.push(`- [Snares Guide](${BASE}/llms/snares.md)`);
  parts.push(`- [All LLM Resources](${BASE}/llms/index.md)`);
  parts.push('');
  parts.push('---');
  parts.push('');
  parts.push(`*Last updated: ${today} · Source: [MetalForge.io](${BASE})*`);

  return parts.join('\n');
}

const outDir = path.join(__dirname, '../public/llms/snares/brands');
fs.mkdirSync(outDir, { recursive: true });

let written = 0;
const shortFiles = [];
for (const brand of SNARE_BRANDS) {
  const md = buildBrandMarkdown(brand, SNARE_BRANDS);
  fs.writeFileSync(path.join(outDir, `${brand.slug}.md`), md);
  const wordCount = md.split(/\s+/).filter(Boolean).length;
  if (wordCount < 150) shortFiles.push(`${brand.slug} (${wordCount} words)`);
  written++;
}

console.log(`✅ Generated ${written} snare brand pages in public/llms/snares/brands/`);
if (shortFiles.length) {
  console.error(`WARNING: ${shortFiles.length} brand file(s) under 150 words: ${shortFiles.join(', ')}`);
  process.exit(1);
}
