#!/usr/bin/env node
/**
 * Generate public/llms/endorsement-news.md — endorsement changes and brand deals
 * for tracked metal drummers.
 * Issue #1586: LLM surface for gear change + endorsement feeds.
 *
 * Data source: packages/frontend/data/endorsementNews.js.
 * Same regex+eval+string-replace extraction pattern as generate-llms-endorsements.cjs.
 */

'use strict';
const fs = require('fs');
const path = require('path');

const BASE = 'https://metalforge.io';
const today = new Date().toISOString().split('T')[0];

const dataPath = path.join(__dirname, '../packages/frontend/data/endorsementNews.js');
const dataContent = fs.readFileSync(dataPath, 'utf-8');

// Replace constant refs with string values so eval works standalone
function replaceConstants(str) {
  return str
    .replace(/ENDORSEMENT_CHANGE_TYPES\.SIGNED/g, "'signed'")
    .replace(/ENDORSEMENT_CHANGE_TYPES\.RENEWED/g, "'renewed'")
    .replace(/ENDORSEMENT_CHANGE_TYPES\.SWITCHED/g, "'switched'")
    .replace(/ENDORSEMENT_CHANGE_TYPES\.ENDED/g, "'ended'")
    .replace(/ENDORSEMENT_CHANGE_TYPES\.SIGNATURE/g, "'signature'")
    .replace(/ENDORSEMENT_CATEGORIES\.DRUMS/g, "'drums'")
    .replace(/ENDORSEMENT_CATEGORIES\.CYMBALS/g, "'cymbals'")
    .replace(/ENDORSEMENT_CATEGORIES\.STICKS/g, "'sticks'")
    .replace(/ENDORSEMENT_CATEGORIES\.HEADS/g, "'heads'")
    .replace(/ENDORSEMENT_CATEGORIES\.HARDWARE/g, "'hardware'")
    .replace(/ENDORSEMENT_CATEGORIES\.ELECTRONICS/g, "'electronics'");
}

// Extract ENDORSEMENT_NEWS array — ends with `];\n\n/**\n * Comprehensive...`
const newsMatch = dataContent.match(/export const ENDORSEMENT_NEWS = (\[[\s\S]*?\n\]);\s*\n+\/\*\*/);
if (!newsMatch) {
  console.error('Could not extract ENDORSEMENT_NEWS from endorsementNews.js');
  process.exit(1);
}

let ENDORSEMENT_NEWS;
try {
  // eslint-disable-next-line no-eval
  ENDORSEMENT_NEWS = eval('(' + replaceConstants(newsMatch[1]) + ')');
} catch (e) {
  console.error('Error parsing ENDORSEMENT_NEWS:', e);
  process.exit(1);
}

// Extract ENDORSEMENT_TIMELINE object — same pattern as generate-llms-endorsements.cjs
const timelineMatch = dataContent.match(/export const ENDORSEMENT_TIMELINE = (\{[\s\S]*\});\s*\n+\/\*\*/);
if (!timelineMatch) {
  console.error('Could not extract ENDORSEMENT_TIMELINE from endorsementNews.js');
  process.exit(1);
}

let ENDORSEMENT_TIMELINE;
try {
  // eslint-disable-next-line no-eval
  ENDORSEMENT_TIMELINE = eval('(' + replaceConstants(timelineMatch[1]) + ')');
} catch (e) {
  console.error('Error parsing ENDORSEMENT_TIMELINE:', e);
  process.exit(1);
}

function cap(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

function formatCategory(cat) {
  const MAP = {
    drums: 'Drums',
    cymbals: 'Cymbals',
    sticks: 'Drumsticks',
    heads: 'Drumheads',
    hardware: 'Hardware/Pedals',
    electronics: 'Electronics',
  };
  return MAP[cat] || cap(cat);
}

// Build brand → current endorsers mapping from ENDORSEMENT_TIMELINE
const brandDrummers = {};
for (const drummer of Object.values(ENDORSEMENT_TIMELINE)) {
  for (const [cat, info] of Object.entries(drummer.currentEndorsements || {})) {
    const brand = info.brand;
    if (!brand) continue;
    if (!brandDrummers[brand]) brandDrummers[brand] = [];
    brandDrummers[brand].push({
      slug: drummer.slug,
      name: drummer.name,
      band: drummer.band,
      cat,
      since: info.since,
      signature: info.signature,
      model: info.model,
    });
  }
}

// Sort news newest first
const sortedNews = [...ENDORSEMENT_NEWS].sort((a, b) => new Date(b.date) - new Date(a.date));

const lines = [];

lines.push('# Metal Drummer Endorsement News — MetalForge');
lines.push('');
lines.push('Brand endorsement changes for professional metal drummers. See https://metalforge.io/endorsement-news');
lines.push('');
lines.push(`> Last updated: ${today} · ${Object.keys(ENDORSEMENT_TIMELINE).length} drummers tracked · ${Object.keys(brandDrummers).length} brands`);
lines.push('');
lines.push('---');
lines.push('');

// Section 1: Current Endorsements by Brand
lines.push('## Current Endorsements by Brand');
lines.push('');

const brandsSorted = Object.keys(brandDrummers).sort();
for (const brand of brandsSorted) {
  lines.push(`### ${brand}`);
  lines.push('');
  const seen = new Set();
  for (const e of brandDrummers[brand]) {
    const key = `${e.slug}-${e.cat}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const since = e.since ? ` — since ${e.since}` : '';
    const sigNote = e.signature ? ' (signature model)' : '';
    lines.push(`- ${e.name} (${e.band}) — ${formatCategory(e.cat)}${since}${sigNote} — /drummer/${e.slug}`);
  }
  lines.push('');
}

lines.push('---');
lines.push('');

// Section 2: Recent Endorsement News (from ENDORSEMENT_NEWS)
lines.push('## Recent Endorsement News');
lines.push('');
for (const news of sortedNews) {
  lines.push(`### ${news.title} — ${news.date}`);
  lines.push('');
  lines.push(news.description || news.headline || '');
  lines.push('');
  if (news.brands) {
    if (Array.isArray(news.brands.kept) && news.brands.kept.length > 0) {
      lines.push(`**Brands retained:** ${news.brands.kept.join(', ')}`);
    }
    if (Array.isArray(news.brands.new) && news.brands.new.length > 0) {
      lines.push(`**Brands signed:** ${news.brands.new.join(', ')}`);
    }
  }
  if (news.source) lines.push(`**Source:** ${news.source}`);
  if (news.drummerSlug) lines.push(`**Profile:** ${BASE}/drummer/${news.drummerSlug}`);
  lines.push('');
}

lines.push('---');
lines.push('');

// Section 3: Endorsement Timelines by Drummer
lines.push('## Endorsement Timelines by Drummer');
lines.push('');
for (const drummer of Object.values(ENDORSEMENT_TIMELINE)) {
  lines.push(`### ${drummer.name} (${drummer.band})`);
  lines.push('');

  if (Array.isArray(drummer.timeline) && drummer.timeline.length > 0) {
    const chronological = [...drummer.timeline].sort((a, b) => a.year - b.year);
    for (const ev of chronological) {
      let action;
      switch (ev.changeType) {
        case 'signed':
          action = ev.to ? `Signed with ${ev.to}` : `Signed (${ev.brand || ''})`;
          break;
        case 'renewed':
          action = `Renewed ${ev.brand} deal`;
          break;
        case 'switched':
          action = `Switched from ${ev.from} to ${ev.to}`;
          break;
        case 'ended':
          action = `Ended ${ev.brand} endorsement`;
          break;
        case 'signature':
          action = `Signature product: ${ev.brand} ${ev.product || ''}`;
          break;
        default:
          action = cap(ev.changeType);
      }
      let entry = `- **${ev.year}** (${formatCategory(ev.category)}): ${action}`;
      if (ev.notes) entry += ` — ${ev.notes}`;
      lines.push(entry);
    }
  } else {
    for (const [cat, info] of Object.entries(drummer.currentEndorsements || {})) {
      const since = info.since ? ` (since ${info.since})` : '';
      lines.push(`- ${formatCategory(cat)}: ${info.brand}${since}`);
    }
  }
  lines.push(`- Profile: ${BASE}/drummer/${drummer.slug}`);
  lines.push('');
}

lines.push('---');
lines.push('');
lines.push('## More Resources');
lines.push('');
lines.push(`- [Endorsement News Feed](${BASE}/endorsement-news)`);
lines.push(`- [Endorsement Hub](${BASE}/llms/endorsements.md)`);
lines.push(`- [Gear News](${BASE}/llms/gear-news.md)`);
lines.push(`- [All LLM Resources](${BASE}/llms/index.md)`);
lines.push('');
lines.push(`*Last updated: ${today} · Source: [MetalForge.io](${BASE})*`);

const out = lines.join('\n');
const outPath = path.join(__dirname, '../public/llms/endorsement-news.md');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, out);

const drummerCount = Object.keys(ENDORSEMENT_TIMELINE).length;
const brandCount = Object.keys(brandDrummers).length;
console.log(`Wrote ${outPath} (${drummerCount} drummers, ${brandCount} brands, ${out.length} chars)`);
