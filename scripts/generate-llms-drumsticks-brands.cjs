#!/usr/bin/env node
/**
 * Generate public/llms/drumsticks/brands/<slug>.md — one markdown citation
 * file per brand in DRUMSTICK_BRANDS. Issue #4478: /drumsticks/brands/<slug>
 * already has a live HTML page per brand (#4139), but unlike the sibling
 * /pedals/brands/<slug>.md batch (#4432/#4431) no /llms/ markdown surface was
 * ever generated for it — this fills that gap.
 *
 * Reads DRUMSTICK_BRANDS from packages/frontend/data/drumstickBrands.js and
 * DRUMSTICKS from packages/frontend/data/drumsticks.js (same regex+eval
 * extraction pattern as the sibling generate-llms-*.cjs scripts). Confirmed
 * drummers per brand are computed inline from DRUMSTICKS, mirroring
 * getConfirmedSticksForBrand() in drumstickBrands.js exactly (filter by
 * brand.dataBrandNames.includes(stick.brand)) — never hand-authored, so this
 * file can never show an endorsement the live page doesn't also show.
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

const { DRUMSTICK_BRANDS } = loadModuleConsts(
  path.join(__dirname, '../packages/frontend/data/drumstickBrands.js'),
  ['DRUMSTICK_BRANDS']
);

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

const drummerBySlug = {};
for (const d of drummers) {
  drummerBySlug[toSlugFromName(d.name)] = d;
}

function toSlugFromName(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Mirrors getConfirmedSticksForBrand() in drumstickBrands.js verbatim.
function confirmedSticksForBrand(brand) {
  if (!brand.dataBrandNames || brand.dataBrandNames.length === 0) return [];
  return DRUMSTICKS.filter((stick) => brand.dataBrandNames.includes(stick.brand));
}

function buildBrandMarkdown(brand, allBrands) {
  const url = `${BASE}/drumsticks/brands/${brand.slug}`;
  const confirmedSticks = confirmedSticksForBrand(brand)
    .map((stick) => {
      const drummer = stick.drummerSlug ? drummerBySlug[stick.drummerSlug] : null;
      return drummer ? { stick, slug: stick.drummerSlug, name: drummer.name, band: drummer.band } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name));

  const parts = [];
  parts.push(`# ${brand.name} Drumsticks: Lines, Positioning & Which Drummers Use Them`);
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

  parts.push('## Notable Lines for Metal Drummers');
  parts.push('');
  for (const line of brand.notableLines) {
    parts.push(`- **${line.name}:** ${line.description}`);
  }
  parts.push('');

  parts.push(`## Confirmed Metal Drummers (${confirmedSticks.length})`);
  parts.push('');
  if (confirmedSticks.length > 0) {
    parts.push('| Drummer | Band | Drumstick |');
    parts.push('|---------|------|-----------|');
    for (const { stick, slug, name, band } of confirmedSticks) {
      parts.push(`| [${name}](${BASE}/drumsticks/signature/${slug}) | ${band} | ${stick.brand} ${stick.model} (${stick.material}, ${stick.size}) |`);
    }
    parts.push('');
    parts.push(`These ${confirmedSticks.length} entr${confirmedSticks.length === 1 ? 'y is' : 'ies are'} pulled directly from MetalForge's verified drumsticks database — each one cites a brand or retailer source and is cross-referenced to the drummer's profile, never guessed from a photo or a forum post.`);
  } else {
    parts.push(`We haven't verified a ${brand.name} drumstick played by one of our mapped metal drummers yet. That's a gap in our research, not a claim that no metal drummer plays ${brand.name} — endorsements are only added here once a brand, retailer, or artist page confirms the pairing.`);
  }
  parts.push('');

  parts.push(`Source: [${brand.source.label}](${brand.source.url}).`);
  parts.push('');

  parts.push('## FAQ');
  parts.push('');
  parts.push(`**Q: What drumsticks does ${brand.name} make for metal drummers?**`);
  parts.push(`A: ${brand.positioning}`);
  parts.push('');
  parts.push(`**Q: Which metal drummers play ${brand.name} drumsticks?**`);
  if (confirmedSticks.length > 0) {
    const names = confirmedSticks.map((c) => c.name).join(', ');
    parts.push(`A: On our verified roster: ${names}. See the table above for the exact model each drummer plays.`);
  } else {
    parts.push(`A: No drummer on our verified roster currently has a confirmed ${brand.name} endorsement or signature model — see the Notable Lines section above for what the brand offers metal-leaning players.`);
  }
  parts.push('');
  parts.push(`**Q: What are ${brand.name}'s most metal-relevant drumstick lines?**`);
  const lineNames = brand.notableLines.map((l) => l.name).join(', ');
  parts.push(`A: ${lineNames}. Full descriptions are in the Notable Lines section above.`);
  parts.push('');

  const otherBrands = allBrands.filter((b) => b.slug !== brand.slug);
  if (otherBrands.length > 0) {
    parts.push('## Other Drumstick Brands We Cover');
    parts.push('');
    parts.push(`MetalForge tracks ${allBrands.length} drumstick brands relevant to metal drummers. Besides ${brand.name}, see:`);
    parts.push('');
    for (const other of otherBrands) {
      parts.push(`- [${other.name}](${BASE}/llms/drumsticks/brands/${other.slug}.md)`);
    }
    parts.push('');
  }

  parts.push('## More Resources');
  parts.push('');
  parts.push(`- [Live page](${url})`);
  parts.push(`- [All Drumstick Brands](${BASE}/drumsticks/brands)`);
  parts.push(`- [Drumsticks Guide](${BASE}/llms/drumsticks.md)`);
  parts.push(`- [All LLM Resources](${BASE}/llms/index.md)`);
  parts.push('');
  parts.push('---');
  parts.push('');
  parts.push(`*Last updated: ${today} · Source: [MetalForge.io](${BASE})*`);

  return parts.join('\n');
}

const outDir = path.join(__dirname, '../public/llms/drumsticks/brands');
fs.mkdirSync(outDir, { recursive: true });

let written = 0;
const shortFiles = [];
for (const brand of DRUMSTICK_BRANDS) {
  const md = buildBrandMarkdown(brand, DRUMSTICK_BRANDS);
  fs.writeFileSync(path.join(outDir, `${brand.slug}.md`), md);
  const wordCount = md.split(/\s+/).filter(Boolean).length;
  if (wordCount < 300) shortFiles.push(`${brand.slug} (${wordCount} words)`);
  written++;
}

console.log(`✅ Generated ${written} drumstick brand pages in public/llms/drumsticks/brands/`);
if (shortFiles.length) {
  console.error(`WARNING: ${shortFiles.length} brand file(s) under 300 words: ${shortFiles.join(', ')}`);
  process.exit(1);
}
