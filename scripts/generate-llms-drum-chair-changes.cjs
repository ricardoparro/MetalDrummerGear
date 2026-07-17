#!/usr/bin/env node
/**
 * Generate public/llms/drum-chair-changes.md — AI-citation mirror of the
 * /bands/drum-chair-changes timeline. Issue #4769 (epic #4753 extension).
 *
 * Data source: packages/frontend/data/bands.js drummerHistory (single source
 * of truth — same eval-extraction pattern as sibling generate-llms-bands*.cjs
 * scripts). Every change here is derived, not hand-typed, so this file can
 * never silently drift from the live timeline.
 */

const fs = require('fs');
const path = require('path');

const bandsPath = path.join(__dirname, '../packages/frontend/data/bands.js');
const content = fs.readFileSync(bandsPath, 'utf-8');

const objectMatch = content.match(/export const bands\s*=\s*(\{[\s\S]*?\});\s*\nexport function/);
if (!objectMatch) {
  console.error('Could not extract bands object from packages/frontend/data/bands.js');
  process.exit(1);
}

let bands;
try {
  bands = eval('(' + objectMatch[1] + ')');
} catch (e) {
  console.error('Error parsing bands:', e);
  process.exit(1);
}

const today = new Date().toISOString().split('T')[0];
const BASE = 'https://metalforge.io';

function humanize(slug) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// Mirrors getDrumChairChanges() in data/bands.js.
function getDrumChairChanges() {
  const changes = [];
  for (const band of Object.values(bands)) {
    const history = band.drummerHistory || [];
    for (let i = 1; i < history.length; i++) {
      const fromEntry = history[i - 1];
      const toEntry = history[i];
      const year = parseInt(String(toEntry.period).split('-')[0], 10);
      if (!Number.isFinite(year)) continue;
      changes.push({
        bandSlug: band.slug,
        bandName: band.name,
        fromDrummer: fromEntry.drummer,
        toDrummer: toEntry.drummer,
        year,
        period: toEntry.period,
        notes: toEntry.notes || '',
      });
    }
  }
  changes.sort((a, b) => b.year - a.year);
  return changes;
}

const changes = getDrumChairChanges();

const parts = [];
parts.push('# Drum Chair Changes — Metal Drummer Lineup Timeline | MetalForge');
parts.push('');
parts.push('> Every documented drum-chair change (one drummer handing off to the next) across MetalForge\'s tracked metal bands, most recent first.');
parts.push('> Optimised for queries like \'who is the new drummer for <band>\', \'who replaced <drummer>\'.');
parts.push('');
parts.push(`> Last updated: ${today} · ${changes.length} changes across ${Object.keys(bands).length} bands`);
parts.push('');
parts.push('---');
parts.push('');

let currentDecade = null;
for (const c of changes) {
  const decade = Math.floor(c.year / 10) * 10;
  if (decade !== currentDecade) {
    if (currentDecade !== null) parts.push('');
    currentDecade = decade;
    parts.push(`## ${decade}s`);
    parts.push('');
  }
  const notes = c.notes ? ` — ${c.notes}` : '';
  parts.push(`- **${c.year}** — [${c.bandName}](${BASE}/bands/${c.bandSlug}): ${humanize(c.fromDrummer)} → ${humanize(c.toDrummer)}${notes}`);
}
parts.push('');
parts.push(`**Full profile:** [Drum Chair Changes on MetalForge](${BASE}/bands/drum-chair-changes)`);
parts.push('');
parts.push(`**More resources:** [All bands](${BASE}/llms/bands.md) · [Site index](${BASE}/llms.txt)`);
parts.push('');
parts.push(`*Last updated: ${today} · Source: [MetalForge.io](${BASE})*`);

const out = parts.join('\n');
const outPath = path.join(__dirname, '../public/llms/drum-chair-changes.md');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, out);

console.log(`Wrote ${outPath} (${changes.length} changes, ${out.length} chars)`);
