#!/usr/bin/env node
/**
 * Generate public/llms/gear-history.md — the single-request hub summarizing
 * every drummer's era-by-era gear evolution for AI crawlers. Issue #4290: the
 * hub only had 6 hand-written entries while 66 per-drummer files (and 67
 * GEAR_PRICE_HISTORY entries) already existed on disk.
 *
 * Data sources:
 *  - packages/frontend/data/gearPriceHistory.js (roster of 67 drummers —
 *    same regex+eval extraction pattern as the sibling generate-llms-*.cjs
 *    generators) for name/band/iconic era/summary/pricing.
 *  - public/llms/gear-history/<slug>.md (66 hand-authored per-drummer files)
 *    for the era timeline bullets, condensed down to 2-3 key eras per
 *    drummer to keep the hub in the ~50-150KB size target.
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../packages/frontend/data/gearPriceHistory.js');
const source = fs.readFileSync(dataPath, 'utf-8');

const cpiMatch = source.match(/export const CPI_DATA\s*=\s*(\{[\s\S]*?\n\});/);
if (!cpiMatch) {
  console.error('Could not extract CPI_DATA from packages/frontend/data/gearPriceHistory.js');
  process.exit(1);
}
const CPI_DATA = eval('(' + cpiMatch[1] + ')');

const gearMatch = source.match(/export const GEAR_PRICE_HISTORY\s*=\s*(\{[\s\S]*?\n\});/);
if (!gearMatch) {
  console.error('Could not extract GEAR_PRICE_HISTORY from packages/frontend/data/gearPriceHistory.js');
  process.exit(1);
}
let GEAR_PRICE_HISTORY;
try {
  GEAR_PRICE_HISTORY = eval('(' + gearMatch[1] + ')');
} catch (e) {
  console.error('Error parsing GEAR_PRICE_HISTORY:', e);
  process.exit(1);
}

function inflationAdjusted(price, fromYear, toYear = 2026) {
  const fromCPI = CPI_DATA[fromYear];
  const toCPI = CPI_DATA[toYear];
  if (!fromCPI || !toCPI) return price;
  return Math.round(price * (toCPI / fromCPI));
}

const perDrummerDir = path.join(__dirname, '../public/llms/gear-history');

function firstSentences(text, maxChars = 180) {
  if (!text) return '';
  const paragraph = text.split('\n\n')[0].trim();
  // Split on ". " (period-space) only, using a negative lookbehind so the
  // final dot of a "..." inside a quoted album title isn't mistaken for a
  // sentence boundary. "!"/"?" aren't treated as terminators here since they
  // often appear inside quoted album titles rather than at real sentence ends.
  const re = /(?<!\.)\.\s/g;
  let match;
  let cut = paragraph.length;
  while ((match = re.exec(paragraph))) {
    const end = match.index + 1;
    if (end >= maxChars) {
      cut = end;
      break;
    }
  }
  return paragraph.slice(0, cut).trim();
}

function parseEras(mdContent) {
  const timelineMatch = mdContent.match(/## Gear Timeline\n([\s\S]*?)\n## Key Gear Changes/);
  if (!timelineMatch) return [];
  const blocks = timelineMatch[1].split(/\n(?=### )/).map(b => b.trim()).filter(Boolean);
  return blocks.map(block => {
    const lines = block.split('\n');
    const title = lines[0].replace(/^###\s*/, '').trim();
    const bullets = lines.slice(1).filter(l => l.trim().startsWith('-'));
    return { title, bullets };
  });
}

function pickCondensedEras(eras) {
  if (eras.length <= 3) return eras;
  const mid = Math.floor(eras.length / 2);
  const picks = [eras[0], eras[mid], eras[eras.length - 1]];
  const seen = new Set();
  return picks.filter(e => {
    if (seen.has(e.title)) return false;
    seen.add(e.title);
    return true;
  });
}

const PRIORITY_LABELS = ['Kit', 'Drums', 'Snare', 'Cymbals', 'Original setup cost', 'Inflation-adjusted', 'Notable'];
const MAX_BULLETS_PER_ERA = 5;

function bulletLabel(bullet) {
  const m = bullet.match(/^-\s*\*\*([^:*]+)/);
  return m ? m[1].trim() : '';
}

function condenseBullets(bullets) {
  const relabeled = bullets.map(b => b.replace(/^(-\s*)\*\*Drums:\*\*/, '$1**Kit:**'));
  const prioritized = relabeled.filter(b => PRIORITY_LABELS.some(p => bulletLabel(b).startsWith(p)));
  const pool = prioritized.length >= 3 ? prioritized : relabeled;
  return pool.slice(0, MAX_BULLETS_PER_ERA);
}

function getActive(mdContent) {
  const m = mdContent.match(/\*\*Active:\*\*\s*(.+)/);
  return m ? m[1].trim() : null;
}

function setupBullets(setup) {
  const labelMap = [
    ['drums', 'Kit'],
    ['snare', 'Snare'],
    ['cymbals', 'Cymbals'],
    ['hardware', 'Hardware'],
    ['sticks', 'Sticks'],
    ['heads', 'Heads'],
    ['electronics', 'Electronics'],
  ];
  const lines = [];
  for (const [key, label] of labelMap) {
    const item = setup[key];
    if (!item) continue;
    lines.push(`- **${label}:** ${item.item}${item.specs ? ' — ' + item.specs : ''}`);
  }
  return lines;
}

// Fallback for the one roster entry (adrian-erlandsson) with no hand-authored
// public/llms/gear-history/<slug>.md file — build a single era straight from
// the GEAR_PRICE_HISTORY `setup` object instead.
function buildEraFromSetup(entry) {
  const bullets = setupBullets(entry.setup);
  const cost = entry.totals && entry.totals.originalTotal;
  if (cost) {
    bullets.push(`- **Original setup cost (${entry.iconicYear}):** ~$${cost.toLocaleString()}`);
    bullets.push(`- **Inflation-adjusted to 2026:** ~$${inflationAdjusted(cost, entry.iconicYear).toLocaleString()}`);
  }
  return { title: `${entry.era} (${entry.iconicYear})`, bullets: condenseBullets(bullets) };
}

function renderEra(era) {
  return [`### ${era.title}`, '', era.bullets.join('\n')].join('\n');
}

function renderDrummer(entry) {
  const { slug, name, band, albumReference, summary } = entry;
  const mdPath = path.join(perDrummerDir, `${slug}.md`);

  let active = null;
  let eras = [];

  if (fs.existsSync(mdPath)) {
    const mdContent = fs.readFileSync(mdPath, 'utf-8');
    active = getActive(mdContent);
    eras = pickCondensedEras(parseEras(mdContent)).map(e => ({ ...e, bullets: condenseBullets(e.bullets) }));
  }

  if (eras.length === 0) {
    eras = [buildEraFromSetup(entry)];
  }

  const parts = [];
  parts.push(`## ${name} — ${band}`);
  parts.push('');
  const metaLine = [];
  if (active) metaLine.push(`**Active:** ${active}`);
  metaLine.push(`**Iconic era:** ${albumReference}`);
  parts.push(metaLine.join(' | '));
  parts.push('');

  const intro = firstSentences(summary);
  if (intro) {
    parts.push(intro);
    parts.push('');
  }

  eras.forEach(era => {
    parts.push(renderEra(era));
    parts.push('');
  });

  parts.push(`[Full gear profile](https://metalforge.io/drummers/${slug}/gear-history)`);

  return parts.join('\n');
}

const roster = Object.values(GEAR_PRICE_HISTORY).sort((a, b) => a.name.localeCompare(b.name));

const today = new Date().toISOString().split('T')[0];

const header = [
  '# Metal Drummer Gear History & Equipment Timelines',
  '',
  "> Era-by-era breakdown of how legendary metal drummers' gear evolved. Includes original kit specs, endorsement changes, and inflation-adjusted prices.",
  '> Optimised for AI crawlers answering "what drums did [drummer] use in [era]" queries.',
  '>',
  `> Last updated: ${today} · ${roster.length} drummers covered`,
  '',
  '---',
  '',
].join('\n');

const body = roster.map(renderDrummer).join('\n\n---\n\n');

const tableRows = roster.map(entry => {
  const cost = entry.totals && entry.totals.originalTotal;
  const adjusted = cost ? inflationAdjusted(cost, entry.iconicYear) : null;
  return `| ${entry.name} | ${entry.albumReference} | ${cost ? '$' + cost.toLocaleString() : 'N/A'} | ${adjusted ? '~$' + adjusted.toLocaleString() : 'N/A'} |`;
}).join('\n');

const priceSummary = [
  '## Price Summary Table',
  '',
  '| Drummer | Era | Original Cost | Inflation-Adjusted (2026) |',
  '|---------|-----|--------------|--------------------------|',
  tableRows,
  '',
  '*Prices sourced from vintage catalogs, Modern Drummer archives, and Reverb market data.*',
].join('\n');

const links = roster.map(entry => `- [/drummers/${entry.slug}/gear-history](https://metalforge.io/drummers/${entry.slug}/gear-history)`).join('\n');

const footer = [
  '*Data sourced from MetalForge gear history pages. Full interactive timelines at:*',
  links,
].join('\n');

const out = [header, body, '', '---', '', priceSummary, '', '---', '', footer, ''].join('\n');

const outPath = path.join(__dirname, '../public/llms/gear-history.md');
fs.writeFileSync(outPath, out);

console.log(`Wrote ${outPath} (${roster.length} drummers, ${out.length} chars, ${(Buffer.byteLength(out) / 1024).toFixed(1)}KB)`);
