#!/usr/bin/env node
/**
 * Generate public/llms/pedals*.md — the /llms/ markdown surface for the
 * /pedals hub, its 3 reference pages, and the 56 per-drummer
 * /pedals/setups/<slug> pages. Issue #4431: #4393 (phase 3/4 of epic #4387)
 * scoped this markdown surface as part of shipping the setup pages, but it
 * was never generated — zero /llms/pedals*.md files existed.
 *
 * Data sources (both read live, no hardcoded drummer/slug list — the #4229/
 * #4232 lesson that a hand-maintained TARGET list drifts from the data):
 *  - packages/frontend/data/pedals.js (PEDALS / DRUMMER_PEDALS, #4391)
 *  - packages/frontend/data/pedalReferencePages.js (PILLAR_PAGE + the 3
 *    reference pages, #4392)
 *  - api/drummers/index.js (drummer name/band, matched to a pedal record via
 *    toSlug(name) === pedal.drummerSlug — same convention the live
 *    PedalSetupPage.jsx component uses)
 *
 * The per-drummer direct-answer FAQ line is generated with the exact same
 * logic as packages/frontend/data/pedalSetupPages.js
 * (generatePedalSetupDirectAnswer) so the /llms/ file and the live page never
 * say different things about the same drummer's pedal.
 */

const fs = require('fs');
const path = require('path');

const BASE = 'https://metalforge.io';

// ---------------------------------------------------------------------------
// Load live data (regex+eval extraction pattern shared by the sibling
// generate-llms-*.cjs scripts — these are plain ESM data modules with no
// bundler available at generate time).
// ---------------------------------------------------------------------------

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

const { PEDALS, getPedalsByBrand } = loadModuleConsts(
  path.join(__dirname, '../packages/frontend/data/pedals.js'),
  ['PEDALS', 'getPedalsByBrand']
);

const { hasBrand } = loadModuleConsts(
  path.join(__dirname, '../packages/frontend/data/brands.js'),
  ['hasBrand']
);

// pedalBrands.js imports live functions from pedals.js/brands.js rather than
// plain consts, so loadModuleConsts (which just strips import lines) can't
// load it directly — wrap it and inject those two functions instead.
function loadPedalBrands() {
  const filePath = path.join(__dirname, '../packages/frontend/data/pedalBrands.js');
  const body = fs.readFileSync(filePath, 'utf-8')
    .replace(/^import[^\n]*\n/gm, '')
    .replace(/export default[\s\S]*$/, '')
    .replace(/export function/g, 'function')
    .replace(/export const/g, 'const');
  const wrapped = `(function(getPedalsByBrand, hasFullBrandPage){\n${body}\nreturn { PEDAL_BRANDS, getConfirmedPedalsForBrand, hasBrandMuseumPage, generateBrandCanonicalUrl };\n})`;
  // eslint-disable-next-line no-eval
  return eval(wrapped)(getPedalsByBrand, hasBrand);
}

const { PEDAL_BRANDS, getConfirmedPedalsForBrand, hasBrandMuseumPage, generateBrandCanonicalUrl } = loadPedalBrands();

const {
  PILLAR_PAGE,
  DRIVE_TYPES_PAGE,
  SINGLE_VS_DOUBLE_PAGE,
  SETUP_TUNING_PAGE,
  REFERENCE_PAGE_ORDER,
} = loadModuleConsts(
  path.join(__dirname, '../packages/frontend/data/pedalReferencePages.js'),
  ['PILLAR_PAGE', 'DRIVE_TYPES_PAGE', 'SINGLE_VS_DOUBLE_PAGE', 'SETUP_TUNING_PAGE', 'REFERENCE_PAGE_ORDER']
);

const REFERENCE_PAGES = {
  'drive-types': DRIVE_TYPES_PAGE,
  'single-vs-double': SINGLE_VS_DOUBLE_PAGE,
  'setup-tuning': SETUP_TUNING_PAGE,
};

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

const pedalDrummers = PEDALS
  .map((pedal) => {
    const drummer = drummerBySlug[pedal.drummerSlug];
    if (!drummer) return null;
    return { pedal, slug: pedal.drummerSlug, name: drummer.name, band: drummer.band };
  })
  .filter(Boolean)
  .sort((a, b) => a.name.localeCompare(b.name));

if (pedalDrummers.length !== PEDALS.length) {
  console.error(`Drummer lookup mismatch: ${PEDALS.length} PEDALS records, ${pedalDrummers.length} resolved to a roster drummer.`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Direct-answer FAQ text — mirrors packages/frontend/data/pedalSetupPages.js
// (pedalDescriptor / pedalConfigPhrase / generatePedalSetupDirectAnswer)
// verbatim so the /llms/ file and the live /pedals/setups/<slug> page always
// agree.
// ---------------------------------------------------------------------------

function pedalDescriptor(pedal) {
  if (pedal.brand && pedal.model) return `${pedal.brand} ${pedal.model}`;
  return pedal.brand || null;
}

function pedalConfigPhrase(pedal) {
  if (pedal.configuration === 'double') return 'double pedal';
  if (pedal.configuration === 'single') return /\(x2\)/i.test(pedal.summary) ? 'single pedals (x2)' : 'single pedal';
  return 'pedal';
}

function generateDirectAnswer(pedal, drummerName) {
  const descriptor = pedalDescriptor(pedal);
  if (!descriptor) {
    return `${drummerName} plays a ${pedal.summary}.`;
  }
  const configPhrase = pedalConfigPhrase(pedal);
  const driveSuffix = pedal.driveType ? ` (${pedal.driveType}-drive)` : '';
  const article = configPhrase.endsWith('(x2)') ? '' : (/^[aeiou]/i.test(descriptor) ? 'an ' : 'a ');
  return `${drummerName} plays ${article}${descriptor} ${configPhrase}${driveSuffix}.`;
}

// Short, factual drive-type / configuration context pulled from the reference
// pages' own tables — used to round out thin per-drummer entries (e.g. a
// null-brand summary) with real reference content instead of padding.
const DRIVE_TYPE_LABELS = { chain: 'Chain drive', belt: 'Belt drive', direct: 'Direct drive' };
const driveTypeRow = (driveType) => DRIVE_TYPES_PAGE.table.find((r) => r.driveType === DRIVE_TYPE_LABELS[driveType]);
const CONFIG_LABELS = { double: 'Double pedal', single: 'Single pedal' };
const configRow = (configuration) => SINGLE_VS_DOUBLE_PAGE.table.find((r) => r.configuration === CONFIG_LABELS[configuration]);

function driveTypeContext(driveType) {
  const row = driveTypeRow(driveType);
  if (!row) return null;
  return `${row.driveType}: ${row.feel} ${row.response}`;
}

function configContext(configuration) {
  const row = configRow(configuration);
  if (!row) return null;
  return `${row.configuration}: ${row.mechanism} Best suited to ${row.bestFor.charAt(0).toLowerCase()}${row.bestFor.slice(1)}`;
}

const today = new Date().toISOString().split('T')[0];

// ---------------------------------------------------------------------------
// Per-drummer setup files — public/llms/pedals/setups/<slug>.md
// ---------------------------------------------------------------------------

function buildSetupMarkdown({ pedal, slug, name, band }) {
  const directAnswer = generateDirectAnswer(pedal, name);
  const url = `${BASE}/pedals/setups/${slug}`;
  const drummerUrl = `${BASE}/drummer/${slug}`;

  const parts = [];
  parts.push(`# What Pedals Does ${name} Use? Full Setup`);
  parts.push('');
  parts.push(`**Band:** ${band} | **Configuration:** ${pedal.configuration} | **Drive Type:** ${pedal.driveType || 'unknown'}`);
  parts.push('');
  parts.push('---');
  parts.push('');
  parts.push('## Direct Answer');
  parts.push('');
  parts.push(directAnswer);
  parts.push('');

  parts.push('## Pedal Breakdown');
  parts.push('');
  parts.push('| Field | Value |');
  parts.push('|-------|-------|');
  parts.push(`| Brand | ${pedal.brand || '—'} |`);
  parts.push(`| Model | ${pedal.model || '—'} |`);
  parts.push(`| Configuration | ${pedal.configuration} |`);
  parts.push(`| Drive Type | ${pedal.driveType || '—'} |`);
  parts.push('');
  parts.push(`Verified roster hardware entry: "${pedal.summary}." Source: ${pedal.source}.`);
  parts.push('');

  const driveCtx = driveTypeContext(pedal.driveType);
  const configCtx = configContext(pedal.configuration);
  if (driveCtx || configCtx) {
    parts.push('## Setup Context');
    parts.push('');
    if (driveCtx) {
      parts.push(`- ${driveCtx}`);
    }
    if (configCtx) {
      parts.push(`- ${configCtx}`);
    }
    parts.push('');
  }

  parts.push('## FAQ');
  parts.push('');
  parts.push(`**Q: What pedals does ${name} use?**`);
  parts.push(`A: ${directAnswer}`);
  parts.push('');

  parts.push('## More Resources');
  parts.push('');
  parts.push(`- [Full pedal setup page](${url})`);
  parts.push(`- [${name}'s Drummer Profile](${drummerUrl})`);
  parts.push(`- [Pedals Guide](${BASE}/llms/pedals.md)`);
  parts.push(`- [All LLM Resources](${BASE}/llms/index.md)`);
  parts.push('');
  parts.push('---');
  parts.push('');
  parts.push(`*Last updated: ${today} · Source: [MetalForge.io](${BASE})*`);

  return parts.join('\n');
}

// ---------------------------------------------------------------------------
// Reference page files — public/llms/pedals/<slug>.md
// ---------------------------------------------------------------------------

function buildReferenceMarkdown(page) {
  const url = `${BASE}/pedals/${page.slug}`;
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

  if (Array.isArray(page.table) && page.table.length) {
    const columns = Object.keys(page.table[0]);
    parts.push('## Reference Table');
    parts.push('');
    parts.push(`| ${columns.join(' | ')} |`);
    parts.push(`| ${columns.map(() => '---').join(' | ')} |`);
    for (const row of page.table) {
      parts.push(`| ${columns.map((c) => row[c]).join(' | ')} |`);
    }
    if (page.tableSource) {
      parts.push('');
      parts.push(`*Table source: [${page.tableSource.label}](${page.tableSource.url})*`);
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
  parts.push(`- [Pedals Guide](${BASE}/llms/pedals.md)`);
  parts.push(`- [All LLM Resources](${BASE}/llms/index.md)`);
  parts.push('');
  parts.push(`*Last updated: ${today} · Source: [MetalForge.io](${BASE})*`);

  return parts.join('\n');
}

// ---------------------------------------------------------------------------
// Brand page files — public/llms/pedals/brands/<brand>.md
// Issue #4432 (split 1/3 of #4394): mirrors buildSetupMarkdown/buildReferenceMarkdown
// above — confirmed drummers are read live from PEDAL_BRANDS/PEDALS via
// getConfirmedPedalsForBrand, never hardcoded.
// ---------------------------------------------------------------------------

function buildBrandMarkdown(brand) {
  const url = generateBrandCanonicalUrl(brand.slug);
  const confirmed = getConfirmedPedalsForBrand(brand)
    .map((pedal) => {
      const drummer = drummerBySlug[pedal.drummerSlug];
      return drummer ? { pedal, name: drummer.name, band: drummer.band } : null;
    })
    .filter(Boolean);

  const parts = [];
  parts.push(`# ${brand.name} Bass Drum Pedals: Metal-Relevant Lines & Which Drummers Use Them`);
  parts.push('');
  if (brand.founded) parts.push(`**Founded:** ${brand.founded}`);
  if (brand.parent) parts.push(`**${brand.parent}**`);
  if (brand.founded || brand.parent) parts.push('');
  parts.push('---');
  parts.push('');
  parts.push('## Overview');
  parts.push('');
  parts.push(brand.positioning);
  parts.push('');

  parts.push('## Metal-Relevant Lines');
  parts.push('');
  parts.push('| Line | Description |');
  parts.push('|------|-------------|');
  for (const line of brand.notableLines) {
    parts.push(`| ${line.name} | ${line.description} |`);
  }
  parts.push('');

  parts.push(`## Confirmed Metal Drummers (${confirmed.length})`);
  parts.push('');
  if (confirmed.length > 0) {
    parts.push('| Drummer | Band | Pedal | Setup Page |');
    parts.push('|---------|------|-------|------------|');
    for (const { pedal, name, band } of confirmed) {
      parts.push(`| [${name}](${BASE}/pedals/setups/${pedal.drummerSlug}) | ${band} | ${pedal.summary} | [Markdown](${BASE}/llms/pedals/setups/${pedal.drummerSlug}.md) |`);
    }
  } else {
    parts.push(`We haven't verified a ${brand.name} pedal setup played by one of our mapped metal drummers yet.`);
  }
  parts.push('');

  parts.push('## Source');
  parts.push('');
  parts.push(`[${brand.source.label}](${brand.source.url})`);
  parts.push('');

  parts.push('---');
  parts.push('');
  parts.push(`- [Live page](${url})`);
  if (hasBrandMuseumPage(brand.slug)) {
    parts.push(`- [Full brand history](${BASE}/brands/${brand.slug})`);
  }
  parts.push(`- [All Pedal Brands](${BASE}/pedals/brands)`);
  parts.push(`- [Pedals Guide](${BASE}/llms/pedals.md)`);
  parts.push(`- [All LLM Resources](${BASE}/llms/index.md)`);
  parts.push('');
  parts.push(`*Last updated: ${today} · Source: [MetalForge.io](${BASE})*`);

  return parts.join('\n');
}

// ---------------------------------------------------------------------------
// Hub file — public/llms/pedals.md
// ---------------------------------------------------------------------------

function buildHubMarkdown() {
  const parts = [];
  parts.push(`# ${PILLAR_PAGE.h1}`);
  parts.push('');
  parts.push(`> ${PILLAR_PAGE.description}`);
  parts.push('');
  parts.push(`Covers ${pedalDrummers.length} verified drummer pedal setups and ${REFERENCE_PAGE_ORDER.length} reference guides. Optimised for AI crawlers answering "what bass drum pedal does <drummer> use" queries.`);
  parts.push('');
  parts.push(`For drive-type and setup reference pages see [${BASE}/pedals](${BASE}/pedals). For a buying guide matching drive type to playing style and budget tier (roughly €150-900) see [${BASE}/pedals/best-for-metal](${BASE}/pedals/best-for-metal).`);
  parts.push('');
  parts.push('---');
  parts.push('');
  parts.push('## Overview');
  parts.push('');
  parts.push(PILLAR_PAGE.intro);
  parts.push('');

  parts.push('## How to Choose a Pedal');
  parts.push('');
  for (const item of PILLAR_PAGE.howToChoose) {
    parts.push(`### ${item.heading}`);
    parts.push('');
    parts.push(item.body);
    parts.push('');
  }

  parts.push('## Reference Guides');
  parts.push('');
  for (const slug of REFERENCE_PAGE_ORDER) {
    const page = REFERENCE_PAGES[slug];
    parts.push(`- [${page.h1}](${BASE}/llms/pedals/${slug}.md) — ${page.description}`);
  }
  parts.push('');

  parts.push('## Pedal Brands on the Roster');
  parts.push('');
  for (const brand of PILLAR_PAGE.brands) {
    const pedalBrand = PEDAL_BRANDS.find((b) => b.name === brand.name);
    const link = pedalBrand ? ` [Brand page](${BASE}/llms/pedals/brands/${pedalBrand.slug}.md)` : '';
    parts.push(`- **${brand.name}:** ${brand.note}${link}`);
  }
  parts.push('');

  parts.push('## Best for Metal');
  parts.push('');
  parts.push(PILLAR_PAGE.bestForMetal);
  parts.push('');

  parts.push('## FAQ');
  parts.push('');
  for (const item of PILLAR_PAGE.faq) {
    parts.push(`**Q: ${item.question}**`);
    parts.push(`A: ${item.answer}`);
    parts.push('');
  }

  parts.push(`## All ${pedalDrummers.length} Drummer Pedal Setups`);
  parts.push('');
  parts.push('| Drummer | Band | Pedal | Setup Page |');
  parts.push('|---------|------|-------|------------|');
  for (const { pedal, slug, name, band } of pedalDrummers) {
    const descriptor = pedalDescriptor(pedal) || pedal.summary;
    parts.push(`| [${name}](${BASE}/pedals/setups/${slug}) | ${band} | ${descriptor} | [Markdown](${BASE}/llms/pedals/setups/${slug}.md) |`);
  }
  parts.push('');

  parts.push('---');
  parts.push('');
  parts.push(`- [Pedals Guide (live page)](${BASE}/pedals)`);
  parts.push(`- [All LLM Resources](${BASE}/llms/index.md)`);
  parts.push(`- [Site index](${BASE}/llms.txt)`);
  parts.push('');
  parts.push(`*Last updated: ${today} · ${pedalDrummers.length} drummers, ${REFERENCE_PAGE_ORDER.length} reference guides · Source: [MetalForge.io](${BASE})*`);

  return parts.join('\n');
}

// ---------------------------------------------------------------------------
// Write files
// ---------------------------------------------------------------------------

const outRoot = path.join(__dirname, '../public/llms');
const setupsDir = path.join(outRoot, 'pedals/setups');
const brandsDir = path.join(outRoot, 'pedals/brands');
fs.mkdirSync(setupsDir, { recursive: true });
fs.mkdirSync(brandsDir, { recursive: true });

fs.writeFileSync(path.join(outRoot, 'pedals.md'), buildHubMarkdown());

for (const slug of REFERENCE_PAGE_ORDER) {
  const md = buildReferenceMarkdown(REFERENCE_PAGES[slug]);
  fs.writeFileSync(path.join(outRoot, 'pedals', `${slug}.md`), md);
}

let written = 0;
const shortFiles = [];
for (const entry of pedalDrummers) {
  const md = buildSetupMarkdown(entry);
  fs.writeFileSync(path.join(setupsDir, `${entry.slug}.md`), md);
  const wordCount = md.split(/\s+/).filter(Boolean).length;
  if (wordCount < 100) shortFiles.push(`${entry.slug} (${wordCount} words)`);
  written++;
}

let brandsWritten = 0;
for (const brand of PEDAL_BRANDS) {
  const md = buildBrandMarkdown(brand);
  fs.writeFileSync(path.join(brandsDir, `${brand.slug}.md`), md);
  const wordCount = md.split(/\s+/).filter(Boolean).length;
  if (wordCount < 100) shortFiles.push(`brands/${brand.slug} (${wordCount} words)`);
  brandsWritten++;
}

const totalFiles = 1 + REFERENCE_PAGE_ORDER.length + written + brandsWritten;
console.log(`Wrote public/llms/pedals.md, ${REFERENCE_PAGE_ORDER.length} reference pages, ${written} per-drummer setup files, ${brandsWritten} brand pages (${totalFiles} total).`);
if (shortFiles.length) {
  console.error(`WARNING: ${shortFiles.length} setup file(s) under 100 words: ${shortFiles.join(', ')}`);
  process.exit(1);
}
