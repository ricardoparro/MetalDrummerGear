#!/usr/bin/env node
/**
 * Generate public/llms/endorsements/<slug>.md — per-drummer endorsement detail pages.
 * Issue #1435: per-drummer decomposition of the endorsement hub (#1416).
 *
 * Reads ENDORSEMENT_TIMELINE from packages/frontend/data/endorsementNews.js.
 * Same regex+eval+string-replace extraction pattern as sibling generate-llms-*.cjs
 * scripts; constant references (ENDORSEMENT_CHANGE_TYPES.*, ENDORSEMENT_CATEGORIES.*)
 * are replaced with their string values before eval so no ESM import is needed.
 */

'use strict';
const fs = require('fs');
const path = require('path');

const BASE = 'https://metalforge.io';
const today = new Date().toISOString().split('T')[0];

// --- Load ENDORSEMENT_TIMELINE from ESM source ---
const dataPath = path.join(__dirname, '../packages/frontend/data/endorsementNews.js');
const dataContent = fs.readFileSync(dataPath, 'utf-8');

// Greedy match: everything from the opening { to the last } before the next JSDoc comment
const timelineMatch = dataContent.match(/export const ENDORSEMENT_TIMELINE = (\{[\s\S]*\});\s*\n+\/\*\*/);
if (!timelineMatch) {
  console.error('Could not extract ENDORSEMENT_TIMELINE from endorsementNews.js');
  process.exit(1);
}

// Replace constant references with their string values so eval works standalone
const objStr = timelineMatch[1]
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

let ENDORSEMENT_TIMELINE;
try {
  // eslint-disable-next-line no-eval
  ENDORSEMENT_TIMELINE = eval('(' + objStr + ')');
} catch (e) {
  console.error('Error parsing ENDORSEMENT_TIMELINE:', e);
  process.exit(1);
}

// The 15 drummers from the endorsementDrummers array in api/sitemap.js
const TARGET_SLUGS = [
  'lars-ulrich', 'joey-jordison', 'tomas-haake', 'dave-lombardo',
  'george-kollias', 'eloy-casagrande', 'jay-weinberg', 'mike-portnoy',
  'danny-carey', 'mario-duplantier', 'brann-dailor', 'chris-adler',
  'matt-halpern', 'inferno', 'charlie-benante',
];

function cap(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

function formatCategory(cat) {
  const MAP = {
    drums: 'Drums',
    cymbals: 'Cymbals',
    sticks: 'Drumsticks',
    heads: 'Drumheads',
    hardware: 'Hardware / Pedals',
    electronics: 'Electronics',
  };
  return MAP[cat] || cap(cat);
}

function buildMarkdown(drummer) {
  const { slug, name, band, currentEndorsements, timeline } = drummer;
  const profileUrl = `${BASE}/drummers/${slug}/endorsements`;
  const parts = [];

  // Title + meta
  parts.push(`# ${name} — Brand Endorsements`);
  parts.push('');
  parts.push(`**Drummer:** ${name}`);
  parts.push(`**Band:** ${band}`);
  parts.push(`**Profile:** ${profileUrl}`);
  parts.push('');
  parts.push('---');
  parts.push('');

  // Current Endorsements
  parts.push('## Current Endorsements');
  parts.push('');
  const cats = Object.entries(currentEndorsements || {});
  for (const [cat, info] of cats) {
    parts.push(`### ${formatCategory(cat)}: ${info.brand}`);
    parts.push('');
    let desc = `${name} endorses ${info.brand} for ${formatCategory(cat).toLowerCase()}.`;
    if (info.model) desc += ` They play the ${info.brand} ${info.model}.`;
    if (info.since) desc += ` This partnership began in ${info.since}.`;
    if (typeof info.signature === 'string') {
      desc += ` ${name} has a signature model: the ${info.signature}.`;
    } else if (info.signature === true) {
      desc += ` ${name} has a co-designed signature product with ${info.brand}.`;
    }
    parts.push(desc);
    parts.push('');
  }

  // Signature Models
  const sigs = [];
  for (const [, info] of cats) {
    if (typeof info.signature === 'string') {
      sigs.push(`${info.brand} ${info.signature}`);
    } else if (info.signature === true && info.model) {
      sigs.push(`${info.brand} ${info.model} (signature)`);
    }
  }
  if (Array.isArray(timeline)) {
    for (const ev of timeline) {
      if (ev.changeType === 'signature' && ev.product) {
        const label = `${ev.brand} ${ev.product} (${ev.year})`;
        if (!sigs.some(s => s.includes(ev.product))) sigs.push(label);
      }
    }
  }
  if (sigs.length) {
    parts.push('## Signature Models');
    parts.push('');
    for (const sig of sigs) parts.push(`- ${sig}`);
    parts.push('');
  }

  // Endorsement History
  if (Array.isArray(timeline) && timeline.length > 0) {
    parts.push('## Endorsement History');
    parts.push('');
    const sorted = [...timeline].sort((a, b) => a.year - b.year);
    for (const ev of sorted) {
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
      let line = `- **${ev.year}** (${formatCategory(ev.category)}): ${action}`;
      if (ev.notes) line += ` — ${ev.notes}`;
      parts.push(line);
    }
    parts.push('');
  }

  // FAQ
  const brandList = [...new Set(cats.map(([, info]) => info.brand))].join(', ');
  const drumBrand = (currentEndorsements && currentEndorsements.drums && currentEndorsements.drums.brand) || 'a major drum brand';
  const cymbalBrand = (currentEndorsements && currentEndorsements.cymbals && currentEndorsements.cymbals.brand) || null;

  parts.push('## FAQ');
  parts.push('');
  parts.push(`**Q: What brands does ${name} endorse?**`);
  parts.push(`A: ${name} endorses ${brandList}. Their primary drum endorsement is ${drumBrand}${cymbalBrand ? ` and they play ${cymbalBrand} cymbals` : ''}.`);
  parts.push('');

  const sigAnswer = sigs.length
    ? `Yes. ${name} has signature gear: ${sigs.slice(0, 2).join(', ')}.`
    : `${name} is a key ${drumBrand} endorser but does not have a dedicated signature kit model in the current lineup.`;
  parts.push(`**Q: Does ${name} have a signature drum or cymbal?**`);
  parts.push(`A: ${sigAnswer}`);
  parts.push('');

  const historyNote = (Array.isArray(timeline) && timeline.length > 0)
    ? `See the Endorsement History section above for a full timeline of ${name}'s brand deals.`
    : `${name} has maintained a stable roster of endorsements throughout their career with ${drumBrand}.`;
  parts.push(`**Q: What is ${name}'s endorsement history?**`);
  parts.push(`A: ${historyNote}`);
  parts.push('');

  // Footer
  parts.push('---');
  parts.push('');
  parts.push('## More Resources');
  parts.push('');
  parts.push(`- [${name} Endorsement Tracker](${profileUrl})`);
  parts.push(`- [${name} Drummer Profile](${BASE}/drummers/${slug})`);
  parts.push(`- [Endorsements Hub](${BASE}/llms/endorsements.md)`);
  parts.push(`- [Gear by Brand](${BASE}/llms/gear-by-brand.md)`);
  parts.push(`- [All LLM Resources](${BASE}/llms/index.md)`);
  parts.push('');
  parts.push(`*Last updated: ${today} · Source: [MetalForge.io](${BASE})*`);

  return parts.join('\n');
}

const outDir = path.join(__dirname, '../public/llms/endorsements');
fs.mkdirSync(outDir, { recursive: true });

let written = 0;
let failed = 0;
const results = [];

for (const slug of TARGET_SLUGS) {
  const drummer = ENDORSEMENT_TIMELINE[slug];
  if (!drummer) {
    console.error(`❌ ${slug}: no data in ENDORSEMENT_TIMELINE`);
    results.push({ slug, words: 0, ok: false });
    failed++;
    continue;
  }
  try {
    const md = buildMarkdown(drummer);
    const outPath = path.join(outDir, `${slug}.md`);
    fs.writeFileSync(outPath, md);
    const words = md.split(/\s+/).filter(Boolean).length;
    results.push({ slug, words, ok: true });
    written++;
  } catch (e) {
    console.error(`❌ ${slug}: ${e.message}`);
    results.push({ slug, words: 0, ok: false });
    failed++;
  }
}

console.log(`\n✅ Generated public/llms/endorsements/*.md — ${written} files (${failed} failed)`);
for (const r of results) {
  const status = r.ok ? '✓' : '✗';
  const note = r.ok && r.words < 200 ? ' ⚠ <200 words' : '';
  console.log(`   ${status} ${r.slug}: ${r.words} words${note}`);
}

if (failed > 0) process.exit(1);
