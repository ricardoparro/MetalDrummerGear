#!/usr/bin/env node
/**
 * Generate public/llms/gear/item/<slug>.md — one markdown citation file per
 * entry in the 10-item gearItems array. Issue #4592: the live /gear/item/<slug>
 * pages have Product + BreadcrumbList JSON-LD (#4573) but no /llms/ markdown
 * mirror, the last remaining gap across the 5 gear categories (drumsticks,
 * cymbals, snares, pedals already have one).
 *
 * Reads gearItems (slug, name, category, brand, description, drummerIds)
 * from api/gear/[slug].js and drummer name/band from api/drummers/index.js —
 * the same two sources api/meta/[...path].js's ssrDrummerLinks builds its
 * /gear/item SSR meta from, so the llms file and the live page can't disagree.
 */

'use strict';
const fs = require('fs');
const path = require('path');

const BASE = 'https://metalforge.io';
const today = new Date().toISOString().split('T')[0];

const gearPath = path.join(__dirname, '../api/gear/[slug].js');
const gearContent = fs.readFileSync(gearPath, 'utf-8');
const gearMatch = gearContent.match(/const gearItems = (\[[\s\S]*?\n\]);/);
if (!gearMatch) {
  console.error('Could not extract gearItems from api/gear/[slug].js');
  process.exit(1);
}
let gearItems;
try {
  // eslint-disable-next-line no-eval
  gearItems = eval(gearMatch[1]);
} catch (e) {
  console.error('Error parsing gearItems:', e);
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
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

const drummersById = {};
for (const d of drummers) {
  drummersById[d.id] = d;
}

function buildMarkdown(item) {
  const url = `${BASE}/gear/item/${item.slug}`;
  const usedBy = (item.drummerIds || [])
    .map((id) => drummersById[id])
    .filter(Boolean);

  const parts = [];
  parts.push(`# ${item.name}`);
  parts.push('');
  parts.push(`**Category:** ${item.category} | **Brand:** ${item.brand}`);
  parts.push('');
  parts.push('---');
  parts.push('');
  parts.push('## Overview');
  parts.push('');
  parts.push(item.description);
  parts.push('');

  if (item.specs && Object.keys(item.specs).length > 0) {
    parts.push('## Specs');
    parts.push('');
    parts.push('| Field | Value |');
    parts.push('|-------|-------|');
    for (const [key, value] of Object.entries(item.specs)) {
      const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());
      parts.push(`| ${label} | ${value} |`);
    }
    parts.push('');
  }

  parts.push('## Drummers Who Use This');
  parts.push('');
  if (usedBy.length > 0) {
    for (const d of usedBy) {
      const drummerUrl = `${BASE}/drummer/${toSlug(d.name)}`;
      parts.push(`- [${d.name}](${drummerUrl}) (${d.band})`);
    }
  } else {
    parts.push('No drummer usage data recorded for this item yet.');
  }
  parts.push('');

  parts.push('## FAQ');
  parts.push('');
  parts.push(`**Q: What is the ${item.name}?**`);
  parts.push(`A: ${item.description}`);
  parts.push('');
  if (usedBy.length > 0) {
    const names = usedBy.map((d) => d.name).join(', ');
    parts.push(`**Q: Which metal drummers use the ${item.name}?**`);
    parts.push(`A: ${names} ${usedBy.length === 1 ? 'uses' : 'use'} the ${item.name}.`);
    parts.push('');
  }

  parts.push('## More Resources');
  parts.push('');
  parts.push(`- [Full gear item page](${url})`);
  parts.push(`- [Gear Hub](${BASE}/llms/gear-guide.md)`);
  parts.push(`- [All LLM Resources](${BASE}/llms/index.md)`);
  parts.push('');
  parts.push('---');
  parts.push('');
  parts.push(`*Last updated: ${today} · Source: [MetalForge.io](${BASE})*`);

  return parts.join('\n');
}

const outDir = path.join(__dirname, '../public/llms/gear/item');
fs.mkdirSync(outDir, { recursive: true });

let written = 0;
const shortFiles = [];
for (const item of gearItems) {
  const md = buildMarkdown(item);
  fs.writeFileSync(path.join(outDir, `${item.slug}.md`), md);
  const wordCount = md.split(/\s+/).filter(Boolean).length;
  if (wordCount < 150) shortFiles.push(`${item.slug} (${wordCount} words)`);
  written++;
}

console.log(`✅ Generated ${written} gear item pages in public/llms/gear/item/`);
if (shortFiles.length) {
  console.error(`WARNING: ${shortFiles.length} gear item file(s) under 150 words: ${shortFiles.join(', ')}`);
  process.exit(1);
}
