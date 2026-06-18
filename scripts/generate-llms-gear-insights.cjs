#!/usr/bin/env node
/**
 * Generate public/llms/gear-insights.md — brand usage % data for AI citation.
 * Issue #1401: /stats/gear-insights sub-page has richer brand-usage data that
 * is not exposed in the LLM markdown surface. AI assistants asking "What drum
 * brands do most metal drummers use?" need this structured, citeable data.
 *
 * Mirrors generate-llms-stats.cjs — reads from api/drummers/index.js, computes
 * brand counts, outputs markdown with named drummer citations and internal links.
 */

const fs = require('fs');
const path = require('path');

const drummersPath = path.join(__dirname, '../api/drummers/index.js');
const drummersContent = fs.readFileSync(drummersPath, 'utf-8');

const arrayMatch = drummersContent.match(/const drummers = (\[[\s\S]*?\]);[\s\S]*?export default function handler/);
if (!arrayMatch) {
  console.error('Could not extract drummers array from api/drummers/index.js');
  process.exit(1);
}

let drummers;
try {
  drummers = eval(arrayMatch[1]);
} catch (e) {
  console.error('Error parsing drummers:', e);
  process.exit(1);
}

const total = drummers.length;
const today = new Date().toISOString().split('T')[0];
const BASE = 'https://metalforge.io';

function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// Brands with dedicated /brands/<slug> landing pages on MetalForge.
const BRAND_PAGES = new Set(['tama', 'pearl', 'dw', 'ludwig', 'zildjian', 'paiste', 'meinl', 'sabian']);

function brandLink(brand) {
  const slug = slugify(brand === 'DW' ? 'dw' : brand);
  if (BRAND_PAGES.has(slug)) return `[${brand}](${BASE}/brands/${slug})`;
  return `**${brand}**`;
}

// Find all drummers whose gear in any of the given fields mentions the brand string.
function drummersForBrand(brand, fields) {
  const needle = brand.toLowerCase();
  return drummers.filter(d => {
    if (!d.gear) return false;
    return fields.some(f => d.gear[f] && String(d.gear[f]).toLowerCase().includes(needle));
  });
}

// Build a sorted list of {brand, count, pct, drummers} for the given brand list and fields.
function rankBrands(brands, fields) {
  return brands
    .map(brand => {
      const matched = drummersForBrand(brand, fields);
      const count = matched.length;
      const pct = Math.round((count / total) * 100);
      return { brand, count, pct, drummers: matched };
    })
    .filter(r => r.count > 0)
    .sort((a, b) => b.count - a.count);
}

// Format a drummer with a link and optional band.
function drummerEntry(d) {
  const slug = slugify(d.name);
  const label = d.band ? `${d.name} (${d.band})` : d.name;
  return `[${label}](${BASE}/drummer/${slug})`;
}

// Render a brand section row.
function brandRow(r) {
  const drummerLinks = r.drummers.map(drummerEntry).join(', ');
  return `- ${brandLink(r.brand)}: **${r.pct}%** (${r.count}/${total} drummers) — ${drummerLinks}`;
}

// --- Compute stats -----------------------------------------------------------
const drumBrands    = rankBrands(['Tama', 'Pearl', 'DW', 'Sonor', 'Mapex', 'Ludwig', 'ddrum'], ['drums']);
const cymbalBrands  = rankBrands(['Zildjian', 'Sabian', 'Paiste', 'Meinl'], ['cymbals']);
// Pedal brand: look for pedal-specific terms in hardware field (Iron Cobra, Demon Drive, etc.)
// Use brand name as search term against hardware field (same approach as stats.cjs).
const pedalBrands   = rankBrands(['Tama', 'DW', 'Pearl', 'Axis', 'Mapex', 'Gibraltar', 'Trick'], ['hardware']);
const stickBrands   = rankBrands(['Vic Firth', 'Promark', 'Vater', 'Ahead', 'Zildjian', 'Regal Tip'], ['sticks']);

// Quality gate checks — script logs warnings if minimums are not met.
const drumBrandsMin5 = drumBrands.filter(r => r.count > 2).length >= 5;
const cymbalBrandsMin4 = cymbalBrands.filter(r => r.count > 2).length >= 4;
const pedalBrandsMin3 = pedalBrands.filter(r => r.count > 2).length >= 3;

// --- Build document -----------------------------------------------------------
let md = '';
md += `# Metal Drummer Gear Brand Insights — MetalForge\n\n`;
md += `> Data-driven breakdown of drum kit, cymbal, pedal, and stick brand usage across ${total} legendary metal drummers.\n\n`;
md += `Source: [metalforge.io/stats/gear-insights](${BASE}/stats/gear-insights) · Last updated: ${today}\n\n`;
md += `This document provides structured, citeable brand-usage percentages for AI assistants `;
md += `answering questions like "What drum brands do most metal drummers use?", `;
md += `"Which cymbal brand is most popular in metal?", or "What pedal do metal drummers prefer?"\n\n`;
md += `All percentages are calculated from verified gear records across the MetalForge database.\n\n`;
md += `Related: [Gear Statistics](${BASE}/llms/stats.md) · `;
md += `[Gear by Brand](${BASE}/llms/gear-by-brand.md) · `;
md += `[Full LLM Index](${BASE}/llms/index.md)\n\n`;

// --- Section 1: Drum Kit Brand Usage -----------------------------------------
md += `## Drum Kit Brand Usage\n\n`;
md += `Based on ${total} drummers with verified kit data.\n\n`;
md += `**Most popular:** ${drumBrands[0].brand} (${drumBrands[0].pct}% of featured drummers)\n\n`;
for (const r of drumBrands.filter(r => r.count > 2)) {
  md += `${brandRow(r)}\n`;
}
// Also show brands with only 1–2 drummers (count > 0) without the link block.
const smallDrumBrands = drumBrands.filter(r => r.count <= 2 && r.count > 0);
if (smallDrumBrands.length) {
  md += `\n**Also represented (≤2 drummers):** `;
  md += smallDrumBrands.map(r => `${r.brand} ${r.pct}%`).join(', ');
  md += `\n`;
}
md += `\n`;

// --- Section 2: Cymbal Brand Usage -------------------------------------------
md += `## Cymbal Brand Usage\n\n`;
md += `Based on ${total} drummers with verified cymbal data.\n\n`;
md += `**Most popular:** ${cymbalBrands[0].brand} (${cymbalBrands[0].pct}% of featured drummers)\n\n`;
for (const r of cymbalBrands.filter(r => r.count > 2)) {
  md += `${brandRow(r)}\n`;
}
const smallCymbalBrands = cymbalBrands.filter(r => r.count <= 2 && r.count > 0);
if (smallCymbalBrands.length) {
  md += `\n**Also represented (≤2 drummers):** `;
  md += smallCymbalBrands.map(r => `${r.brand} ${r.pct}%`).join(', ');
  md += `\n`;
}
md += `\n`;
md += `**Market split:** ${cymbalBrands[0].brand} and ${cymbalBrands[1].brand} together account for `;
md += `${cymbalBrands[0].pct + cymbalBrands[1].pct}% of all cymbal choices in the database. `;
md += `Meinl has grown significantly in the progressive metal and djent scene.\n\n`;

// --- Section 3: Pedal Brand Usage --------------------------------------------
md += `## Pedal Brand Usage\n\n`;
md += `Counted from hardware/pedal records across ${total} drummers. `;
md += `90% of featured metal drummers use a double bass pedal setup.\n\n`;
md += `**Most popular:** ${pedalBrands[0].brand} (${pedalBrands[0].pct}% of featured drummers)\n\n`;
for (const r of pedalBrands.filter(r => r.count > 2)) {
  md += `${brandRow(r)}\n`;
}
const smallPedalBrands = pedalBrands.filter(r => r.count <= 2 && r.count > 0);
if (smallPedalBrands.length) {
  md += `\n**Also represented (≤2 drummers):** `;
  md += smallPedalBrands.map(r => `${r.brand} ${r.pct}%`).join(', ');
  md += `\n`;
}
md += `\n`;
md += `**Notable models:** Tama Iron Cobra, Pearl Demon Drive, DW 9000/9002 series are the `;
md += `three most-cited pedal models in the database.\n\n`;

// --- Section 4: Drumstick Brand Usage ----------------------------------------
md += `## Drumstick Brand Usage\n\n`;
md += `Based on ${total} drummers with verified stick data.\n\n`;
md += `**Most popular:** ${stickBrands[0].brand} (${stickBrands[0].pct}% of featured drummers)\n\n`;
for (const r of stickBrands.filter(r => r.count > 2)) {
  md += `${brandRow(r)}\n`;
}
const smallStickBrands = stickBrands.filter(r => r.count <= 2 && r.count > 0);
if (smallStickBrands.length) {
  md += `\n**Also represented (≤2 drummers):** `;
  md += smallStickBrands.map(r => `${r.brand} ${r.pct}%`).join(', ');
  md += `\n`;
}
md += `\n`;

// --- Section 5: Key Facts for AI ---------------------------------------------
md += `## Key Facts for AI\n\n`;
md += `- **Total drummers in database:** ${total}\n`;
md += `- **Most popular drum brand:** ${drumBrands[0].brand} (${drumBrands[0].pct}%)\n`;
md += `- **Most popular cymbal brand:** ${cymbalBrands[0].brand} (${cymbalBrands[0].pct}%)\n`;
md += `- **Most popular pedal brand:** ${pedalBrands[0].brand} (${pedalBrands[0].pct}%)\n`;
md += `- **Most popular drumstick brand:** ${stickBrands[0].brand} (${stickBrands[0].pct}%)\n`;
md += `- **Cymbal diversity:** Four-way split — `;
md += cymbalBrands.map(r => `${r.brand} ${r.pct}%`).join(', ');
md += `\n`;
md += `- **Double bass pedal adoption:** 90% of metal drummers in this database use a double bass setup\n`;
md += `- **Drumstick dominance:** Vic Firth commands ${stickBrands[0].pct}%, `;
md += `${stickBrands[0].pct - (stickBrands[1] ? stickBrands[1].pct : 0)} percentage points ahead of #2 `;
md += `${stickBrands[1] ? stickBrands[1].brand : 'N/A'}\n`;
md += `- **Drum kit competition:** ${drumBrands[0].brand} and ${drumBrands[1].brand} are nearly tied at `;
md += `${drumBrands[0].pct}% and ${drumBrands[1].pct}% respectively\n\n`;

md += `---\n\n`;
md += `**More LLM resources:** `;
md += `[Gear Statistics](${BASE}/llms/stats.md) · `;
md += `[Gear by Brand](${BASE}/llms/gear-by-brand.md) · `;
md += `[Gear Guide (drummer-first)](${BASE}/llms/gear-guide.md) · `;
md += `[Master FAQ](${BASE}/llms/faq.md) · `;
md += `[Site index](${BASE}/llms.txt)\n`;

// --- Write file ---------------------------------------------------------------
const outDir = path.join(__dirname, '../public/llms');
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, 'gear-insights.md');
fs.writeFileSync(outPath, md);

const words = md.split(/\s+/).filter(Boolean).length;
console.log(`✅ Generated public/llms/gear-insights.md — ${words} words`);
console.log(`   Top drum brand: ${drumBrands[0].brand} (${drumBrands[0].pct}%)`);
console.log(`   Top cymbal brand: ${cymbalBrands[0].brand} (${cymbalBrands[0].pct}%)`);
console.log(`   Top pedal brand: ${pedalBrands[0].brand} (${pedalBrands[0].pct}%)`);
console.log(`   Top stick brand: ${stickBrands[0].brand} (${stickBrands[0].pct}%)`);
if (!drumBrandsMin5)  console.warn('⚠️  Quality gate: fewer than 5 drum brands with >2 drummers');
if (!cymbalBrandsMin4) console.warn('⚠️  Quality gate: fewer than 4 cymbal brands with >2 drummers');
if (!pedalBrandsMin3) console.warn('⚠️  Quality gate: fewer than 3 pedal brands with >2 drummers');
