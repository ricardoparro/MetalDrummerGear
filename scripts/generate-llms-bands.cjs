#!/usr/bin/env node
/**
 * Generate public/llms/bands.md — structured band + drummer reference for
 * AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.).
 * Issue #1173: bands are the last rich content type missing from /llms/ surface.
 *
 * Data source: packages/frontend/data/bands.js (single source of truth).
 * Mirrors the extraction pattern of sibling generate-llms-techniques.cjs.
 */

const fs = require('fs');
const path = require('path');

const bandsPath = path.join(__dirname, '../packages/frontend/data/bands.js');
const content = fs.readFileSync(bandsPath, 'utf-8');

// Extract the `export const bands = { ... };` object literal.
// The object ends at the line before the first export function.
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

function renderBand(band) {
  const parts = [];
  parts.push(`## ${band.name}`);
  parts.push('');

  // Meta line: genre, status, formed/origin
  const meta = [];
  if (band.genres && band.genres.length) meta.push(`**Genre:** ${formatGenres(band.genres)}`);
  if (band.status) meta.push(`**Status:** ${formatStatus(band.status)}`);
  if (band.formed) meta.push(`**Formed:** ${band.formed}`);
  if (band.origin) meta.push(`**Origin:** ${band.origin}`);
  if (meta.length) { parts.push(meta.join(' · ')); parts.push(''); }

  // Summary
  if (band.summary) {
    parts.push(band.summary.trim());
    parts.push('');
  }

  // Drummer history
  if (Array.isArray(band.drummerHistory) && band.drummerHistory.length > 0) {
    parts.push('**Drummer history:**');
    for (const h of band.drummerHistory) {
      const name = h.drummer
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      const period = h.period ? ` — ${h.period}` : '';
      const notes = h.notes ? ` (${h.notes})` : '';
      parts.push(`- ${name}${period}${notes}`);
    }
    parts.push('');
  }

  // Discography (if present)
  if (Array.isArray(band.discography) && band.discography.length > 0) {
    const releases = band.discography
      .map(r => {
        const title = r.name || r.album || '';
        const year = r.year ? ` (${r.year})` : '';
        const note = r.note ? ` — ${r.note}` : '';
        return `${title}${year}${note}`;
      })
      .join(', ');
    parts.push(`**Key releases:** ${releases}`);
    parts.push('');
  }

  // FAQ (if present)
  if (Array.isArray(band.faq) && band.faq.length > 0) {
    parts.push('**FAQ:**');
    for (const item of band.faq) {
      parts.push(`- **${item.q}** ${item.a}`);
    }
    parts.push('');
  }

  // Canonical link
  parts.push(`[Full profile](https://metalforge.io/bands/${band.slug})`);
  parts.push('');

  return parts.join('\n');
}

const bandList = Object.values(bands);
bandList.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

const header = [
  '# Metal Bands & Their Drummers — MetalForge',
  '',
  '> Structured reference for metal bands, their drummer history, discography, and gear.',
  '> Optimised for AI crawlers answering "who drums for <band>" queries.',
  '>',
  `> Last updated: ${today} · ${bandList.length} bands`,
  '',
  '---',
  '',
].join('\n');

const body = bandList.map(renderBand).join('\n---\n\n');

const out = header + body;
const outPath = path.join(__dirname, '../public/llms/bands.md');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, out);

console.log(`Wrote ${outPath} (${bandList.length} bands, ${out.length} chars)`);
