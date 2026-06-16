#!/usr/bin/env node
/**
 * Generate public/llms/techniques.md — educational reference for all metal
 * drumming techniques. Issue #1126: the last rich content type missing from
 * the /llms/ AI-crawler surface.
 *
 * Data source: packages/frontend/data/techniques.js (single source of truth,
 * same as the React renderer). Same regex+eval extraction pattern as the
 * sibling generate-llms-*.cjs generators (gear-guide, articles, licks…).
 */

const fs = require('fs');
const path = require('path');

const techniquesPath = path.join(__dirname, '../packages/frontend/data/techniques.js');
const content = fs.readFileSync(techniquesPath, 'utf-8');

// Extract the `export const techniques = { ... };` object literal.
const objectMatch = content.match(/export const techniques\s*=\s*(\{[\s\S]*?\n\});\s*$/m);
if (!objectMatch) {
  console.error('Could not extract techniques object from packages/frontend/data/techniques.js');
  process.exit(1);
}

let techniques;
try {
  techniques = eval('(' + objectMatch[1] + ')');
} catch (e) {
  console.error('Error parsing techniques:', e);
  process.exit(1);
}

const today = new Date().toISOString().split('T')[0];

function bullet(items) {
  return items.map(s => `- ${s}`).join('\n');
}

function variationBullet(v) {
  return `- **${v.name}:** ${v.description}`;
}

function masterBullet(m) {
  // Internal link to drummer profile by slug — entity-linking for LLM resolution.
  return `- ${m.name} (${m.band}) — ${m.note} — /drummer/${m.slug}`;
}

function gearRecBullets(recs) {
  if (!recs || typeof recs !== 'object') return '';
  const lines = [];
  for (const [category, items] of Object.entries(recs)) {
    if (!Array.isArray(items) || items.length === 0) continue;
    const label = category.charAt(0).toUpperCase() + category.slice(1);
    for (const item of items) {
      lines.push(`- **${label}:** ${item.name} — ${item.reason}`);
    }
  }
  return lines.join('\n');
}

function renderTechnique(t) {
  const parts = [];
  parts.push(`## ${t.title}`);
  parts.push('');
  const meta = [];
  if (t.difficulty) meta.push(`**Difficulty:** ${t.difficulty}`);
  if (t.bpmRange) meta.push(`**BPM range:** ${t.bpmRange}`);
  if (t.category) meta.push(`**Category:** ${t.category}`);
  parts.push(meta.join(' | '));
  parts.push('');
  parts.push(t.description.trim());
  parts.push('');

  if (t.history) {
    parts.push('### History');
    parts.push('');
    parts.push(t.history.trim());
    parts.push('');
  }

  if (Array.isArray(t.howToLearn) && t.howToLearn.length > 0) {
    parts.push('### How to Learn');
    parts.push('');
    parts.push(bullet(t.howToLearn));
    parts.push('');
  }

  if (Array.isArray(t.variations) && t.variations.length > 0) {
    parts.push('### Variations');
    parts.push('');
    parts.push(t.variations.map(variationBullet).join('\n'));
    parts.push('');
  }

  if (Array.isArray(t.masters) && t.masters.length > 0) {
    parts.push('### Masters');
    parts.push('');
    parts.push(t.masters.map(masterBullet).join('\n'));
    parts.push('');
  }

  const gear = gearRecBullets(t.gearRecommendations);
  if (gear) {
    parts.push('### Recommended Gear');
    parts.push('');
    parts.push(gear);
    parts.push('');
  }

  return parts.join('\n');
}

const techList = Object.values(techniques);
techList.sort((a, b) => (a.title || '').localeCompare(b.title || ''));

const header = [
  '# Metal Drumming Techniques — MetalForge',
  '',
  '> Educational reference for metal drumming techniques: how to play them, their history,',
  '> the drummers who define them, and recommended gear.',
  '>',
  `> Last updated: ${today} · ${techList.length} techniques`,
  '',
  '---',
  '',
].join('\n');

const body = techList.map(renderTechnique).join('\n---\n\n');

const out = header + body;
const outPath = path.join(__dirname, '../public/llms/techniques.md');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, out);

console.log(`Wrote ${outPath} (${techList.length} techniques, ${out.length} chars)`);
