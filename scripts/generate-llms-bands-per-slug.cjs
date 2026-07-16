#!/usr/bin/env node
/**
 * Generate public/llms/bands/<slug>.md — one AI-citation markdown mirror per
 * band. Issue #4754 (epic #4753 phase 1): the previous public/llms/bands/*.md
 * files were hand-authored across two PRs (#1806, #4728) with no generator
 * behind them, so coverage silently drifted from the 35 bands in bands.js
 * (stuck at 19 files for a long stretch). This script iterates
 * `Object.keys(bands)` so coverage can never drift again — every band in the
 * data module gets exactly one mirror file, and removing a band removes its
 * file on the next `npm run generate:llms` run.
 *
 * Data source: packages/frontend/data/bands.js (single source of truth).
 * Mirrors the extraction pattern of sibling generate-llms-*.cjs scripts.
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

function titleCaseSlug(slug) {
  if (!slug) return '';
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function formatGenres(genres) {
  if (!Array.isArray(genres) || genres.length === 0) return '';
  return genres
    .map(g => g.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '))
    .join(', ');
}

function formatStatus(status) {
  if (!status) return '';
  return status.charAt(0).toUpperCase() + status.slice(1);
}

// The "current" drummer is the last drummerHistory entry whose period
// mentions "present"; falls back to the last entry in the list.
function currentDrummer(band) {
  if (!Array.isArray(band.drummerHistory) || band.drummerHistory.length === 0) return null;
  const present = [...band.drummerHistory].reverse().find(h => h.period && h.period.includes('present'));
  return present || band.drummerHistory[band.drummerHistory.length - 1];
}

function buildMarkdown(band) {
  const parts = [];
  const drummer = currentDrummer(band);
  const drummerName = drummer ? titleCaseSlug(drummer.drummer) : null;

  parts.push(`# ${band.name} — Drummer & Band Profile | MetalForge`);
  parts.push('');
  parts.push(`> Per-band AI citation reference for ${band.name}: verified drummer history, lineup, discography, and FAQ.`);
  parts.push(`> Optimised for queries like 'who is the drummer for ${band.name}'${drummerName ? `, '${drummerName} ${band.name}'` : ''}, '${band.name} band members'.`);
  parts.push('');

  parts.push('## Band Overview');
  parts.push('');
  if (drummerName) parts.push(`- **Drummer:** ${drummerName}${drummer.period ? ` (${drummer.period})` : ''}`);
  if (band.genres && band.genres.length) parts.push(`- **Genre:** ${formatGenres(band.genres)}`);
  if (band.status) parts.push(`- **Status:** ${formatStatus(band.status)}`);
  if (band.formed) parts.push(`- **Formed:** ${band.formed}`);
  if (band.origin) parts.push(`- **Origin:** ${band.origin}`);
  parts.push('');

  if (band.summary) {
    parts.push('## Summary');
    parts.push('');
    parts.push(band.summary.trim());
    parts.push('');
  }

  if (Array.isArray(band.drummerHistory) && band.drummerHistory.length > 0) {
    parts.push('## Drummer History');
    parts.push('');
    for (const h of band.drummerHistory) {
      const name = titleCaseSlug(h.drummer);
      const period = h.period ? ` — ${h.period}` : '';
      const notes = h.notes ? ` (${h.notes})` : '';
      parts.push(`- **${name}**${period}${notes}`);
    }
    parts.push('');
    if (drummerName) {
      const drummerSlug = drummer.drummer;
      parts.push(`[${drummerName} full profile →](${BASE}/drummer/${drummerSlug}) · [LLM markdown](${BASE}/llms/drummers/${drummerSlug}.md)`);
      parts.push('');
    }
  }

  if (Array.isArray(band.members) && band.members.length > 0) {
    parts.push('## Current Members');
    parts.push('');
    for (const m of band.members) {
      const period = m.period ? ` — ${m.period}` : '';
      const notes = m.notes ? ` (${m.notes})` : '';
      parts.push(`- **${m.name}** — ${m.role}${period}${notes}`);
    }
    parts.push('');
  }

  const former = band.formerMembers || band.pastMembers;
  if (Array.isArray(former) && former.length > 0) {
    parts.push('## Former Members');
    parts.push('');
    for (const m of former) {
      const period = m.period ? ` — ${m.period}` : '';
      const notes = m.notes ? ` (${m.notes})` : '';
      parts.push(`- **${m.name}** — ${m.role}${period}${notes}`);
    }
    parts.push('');
  }

  if (Array.isArray(band.discography) && band.discography.length > 0) {
    parts.push('## Discography');
    parts.push('');
    parts.push('| Album | Year | Drummer | Notes |');
    parts.push('|---|---|---|---|');
    for (const r of band.discography) {
      const title = r.title || r.name || r.album || '';
      const year = r.year || '';
      const drummerCell = r.drummer ? titleCaseSlug(r.drummer) : '—';
      const notes = r.notes || r.note || '';
      parts.push(`| ${title} | ${year} | ${drummerCell} | ${notes} |`);
    }
    parts.push('');
  }

  if (Array.isArray(band.faq) && band.faq.length > 0) {
    parts.push('## FAQ');
    parts.push('');
    for (const item of band.faq) {
      parts.push(`**Q: ${item.q}**`);
      parts.push(`A: ${item.a}`);
      parts.push('');
    }
  }

  if (Array.isArray(band.sources) && band.sources.length > 0) {
    parts.push('## Sources');
    parts.push('');
    for (const s of band.sources) parts.push(`- ${s}`);
    parts.push('');
  }

  parts.push('---');
  parts.push('');
  parts.push(`**Full band profile:** [${band.name} on MetalForge](${BASE}/bands/${band.slug})`);
  parts.push('');
  if (drummerName) {
    parts.push(`**Drummer LLM file:** [${drummerName}](${BASE}/llms/drummers/${drummer.drummer}.md)`);
    parts.push('');
  }
  parts.push(`**More resources:** [All bands](${BASE}/llms/bands.md) · [Site index](${BASE}/llms.txt)`);
  parts.push('');
  parts.push(`*Last updated: ${today} · Source: [MetalForge.io](${BASE})*`);

  return parts.join('\n');
}

const outDir = path.join(__dirname, '../public/llms/bands');
fs.mkdirSync(outDir, { recursive: true });

// Remove stale per-band files for slugs no longer in the data module so
// coverage can never silently drift upward either.
const currentSlugs = new Set(Object.keys(bands));
for (const file of fs.readdirSync(outDir)) {
  if (!file.endsWith('.md')) continue;
  const slug = file.slice(0, -3);
  if (!currentSlugs.has(slug)) fs.unlinkSync(path.join(outDir, file));
}

let written = 0;
for (const slug of Object.keys(bands)) {
  const band = bands[slug];
  const md = buildMarkdown(band);
  fs.writeFileSync(path.join(outDir, `${slug}.md`), md);
  written++;
}

console.log(`Wrote ${written} files to ${outDir} (${Object.keys(bands).length} bands in module)`);
