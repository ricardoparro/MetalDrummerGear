#!/usr/bin/env node
/**
 * Generate public/llms/gear-news.md — chronological feed of drummer gear updates.
 * Issue #1586: LLM surface for gear change + endorsement feeds.
 *
 * Data source: packages/frontend/data/gearNews.js (single source of truth).
 * Same regex+eval extraction pattern as sibling generate-llms-*.cjs scripts.
 */

'use strict';
const fs = require('fs');
const path = require('path');

const BASE = 'https://metalforge.io';
const today = new Date().toISOString().split('T')[0];

const dataPath = path.join(__dirname, '../packages/frontend/data/gearNews.js');
const dataContent = fs.readFileSync(dataPath, 'utf-8');

// Extract GEAR_NEWS array — ends with `];\n\n// Get recent news`
const newsMatch = dataContent.match(/export const GEAR_NEWS = (\[[\s\S]*?\n\]);\s*\n+\/\/ Get recent news/);
if (!newsMatch) {
  console.error('Could not extract GEAR_NEWS from gearNews.js');
  process.exit(1);
}

// Replace constant references so eval works standalone
const objStr = newsMatch[1]
  .replace(/CHANGE_TYPES\.ADDED/g, "'added'")
  .replace(/CHANGE_TYPES\.REMOVED/g, "'removed'")
  .replace(/CHANGE_TYPES\.UPDATED/g, "'updated'")
  .replace(/CHANGE_TYPES\.SWITCHED/g, "'switched'")
  .replace(/CHANGE_TYPES\.SITE_UPDATE/g, "'site_update'")
  .replace(/CHANGE_TYPES\.BRAND_LAUNCH/g, "'brand_launch'");

let GEAR_NEWS;
try {
  // eslint-disable-next-line no-eval
  GEAR_NEWS = eval('(' + objStr + ')');
} catch (e) {
  console.error('Error parsing GEAR_NEWS:', e);
  process.exit(1);
}

// Sort all entries newest first (mirrors /gear-news feed)
const sorted = [...GEAR_NEWS].sort((a, b) => new Date(b.date) - new Date(a.date));

// Subsets for the focused gear-changes section
const GEAR_CHANGE_TYPES = ['added', 'removed', 'updated', 'switched'];
const gearChanges = sorted.filter(e => GEAR_CHANGE_TYPES.includes(e.type));
const drummerEvents = sorted.filter(e => e.drummerSlug); // any event tied to a drummer

function changeTypeLabel(type) {
  const LABELS = { added: 'Added', removed: 'Removed', updated: 'Updated', switched: 'Switched' };
  return LABELS[type] || type;
}

function typeLabel(type) {
  const MAP = {
    added: 'Gear Added',
    removed: 'Gear Removed',
    updated: 'Gear Updated',
    switched: 'Gear Switched',
    site_update: 'Site Update',
    brand_launch: 'Brand Launch',
  };
  return MAP[type] || type;
}

function renderEntry(e) {
  const parts = [];
  const date = e.date;
  const type = typeLabel(e.type);
  parts.push(`### ${e.title} — ${date}`);
  parts.push('');
  parts.push(`**Type:** ${type}`);
  if (e.drummerName) parts.push(`**Drummer:** ${e.drummerName}${e.drummerSlug ? ` — /drummer/${e.drummerSlug}` : ''}`);
  if (e.gearName) parts.push(`**Gear:** ${e.gearName}`);
  if (e.previousGear) parts.push(`**Previously used:** ${e.previousGear}`);
  if (e.brandSlug) parts.push(`**Brand:** ${e.brandSlug} — ${BASE}/brand/${e.brandSlug}`);
  parts.push('');
  parts.push(e.description);
  if (e.note) parts.push(`*${e.note}*`);
  parts.push('');
  return parts.join('\n');
}

function renderGearChange(e) {
  const parts = [];
  const label = changeTypeLabel(e.type);
  const year = e.date.substring(0, 4);
  const gear = e.gearName || e.title;
  const drummer = e.drummerName || 'Unknown';
  parts.push(`### ${drummer} — ${gear} (${label}) — ${year}`);
  parts.push('');
  parts.push(e.description);
  parts.push('');
  if (e.previousGear) parts.push(`**Previously used:** ${e.previousGear}`);
  if (e.note) parts.push(`**Note:** ${e.note}`);
  if (e.drummerSlug) parts.push(`**Profile:** ${BASE}/drummer/${e.drummerSlug}`);
  parts.push('');
  return parts.join('\n');
}

const lines = [];

lines.push('# Metal Drummer Gear News — MetalForge');
lines.push('');
lines.push('Chronological feed of drummer gear updates. See full tracker at https://metalforge.io/gear-news');
lines.push('');
lines.push(`> Last updated: ${today} · ${sorted.length} total events · ${gearChanges.length} gear change events`);
lines.push('');
lines.push('---');
lines.push('');

// Section 1: Complete Chronological Feed (all entries)
lines.push('## Chronological Gear News Feed');
lines.push('');
lines.push('All gear-related events in reverse chronological order, mirroring the /gear-news page.');
lines.push('');
for (const e of sorted) {
  lines.push(renderEntry(e));
  lines.push('---');
  lines.push('');
}

// Section 2: Focused Gear Changes (ADDED/REMOVED/UPDATED/SWITCHED only)
lines.push('## Drummer Gear Changes');
lines.push('');
lines.push('Filtered view: only events where a drummer added, removed, updated, or switched specific gear.');
lines.push('');
if (gearChanges.length > 0) {
  for (const e of gearChanges) {
    lines.push(renderGearChange(e));
    lines.push('---');
    lines.push('');
  }
} else {
  lines.push('No drummer gear change events recorded.');
  lines.push('');
}

// Section 3: Drummer Activity Summary
if (drummerEvents.length > 0) {
  lines.push('## Drummer Activity Summary');
  lines.push('');

  // Group by drummer
  const byDrummer = {};
  for (const e of drummerEvents) {
    const key = e.drummerSlug;
    if (!byDrummer[key]) byDrummer[key] = { name: e.drummerName, slug: e.drummerSlug, events: [] };
    byDrummer[key].events.push(e);
  }

  for (const { name, slug, events } of Object.values(byDrummer)) {
    lines.push(`### ${name}`);
    lines.push('');
    for (const e of events) {
      const type = typeLabel(e.type);
      const gear = e.gearName ? ` — ${e.gearName}` : '';
      lines.push(`- **${e.date}** (${type})${gear}: ${e.title}`);
    }
    lines.push(`- Profile: ${BASE}/drummer/${slug}`);
    lines.push('');
  }
}

lines.push('---');
lines.push('');
lines.push('## More Resources');
lines.push('');
lines.push(`- [Gear News Feed](${BASE}/gear-news)`);
lines.push(`- [Endorsement News](${BASE}/llms/endorsement-news.md)`);
lines.push(`- [All LLM Resources](${BASE}/llms/index.md)`);
lines.push('');
lines.push(`*Last updated: ${today} · Source: [MetalForge.io](${BASE})*`);

const out = lines.join('\n');
const outPath = path.join(__dirname, '../public/llms/gear-news.md');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, out);

console.log(`Wrote ${outPath} (${sorted.length} total events, ${gearChanges.length} gear changes, ${out.length} chars)`);
