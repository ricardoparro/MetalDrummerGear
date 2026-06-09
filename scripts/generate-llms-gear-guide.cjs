#!/usr/bin/env node
/**
 * Generate public/llms/gear-guide.md — a brand-by-brand metal drum gear guide.
 * Issue #1020 (split 2/4 of #1017).
 *
 * A single ingestible page LLMs can quote for "best metal drum kit / cymbals /
 * pedals" and gear-brand queries. Groups the roster by gear brand so each
 * brand section is backed by real drummer attributions + a /brands/<slug> link.
 *
 * Data source mirrors the sibling generate-llms-*.cjs generators: regex +
 * controlled eval over api/drummers/index.js (single source of truth).
 */

const fs = require('fs');
const path = require('path');

// --- Load drummers (same regex+eval extraction as the sibling generators) --------
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

const today = new Date().toISOString().split('T')[0];
const BASE = 'https://metalforge.io';

function brandSlug(brand) {
  return brand.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}
function drummerSlug(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// Gear categories → which drummer.gear field(s) to scan + the brands to look for.
// The first four cover the 10 brands the issue requires; pedals & sticks are
// included opportunistically ("where data exists").
const CATEGORIES = [
  {
    heading: 'Drum Brands',
    fields: ['drums'],
    blurb: 'The drum-kit makers metal drummers rely on for attack, projection, and durability.',
    brands: ['Tama', 'Pearl', 'DW', 'Ludwig', 'Sonor', 'Mapex'],
  },
  {
    heading: 'Cymbal Brands',
    fields: ['cymbals'],
    blurb: 'Bright, cutting cymbal lines that slice through high-gain guitars.',
    brands: ['Zildjian', 'Sabian', 'Meinl', 'Paiste'],
  },
  {
    heading: 'Pedals & Hardware',
    fields: ['hardware'],
    blurb: 'Double-bass pedals and hardware built to survive sustained metal abuse.',
    brands: ['Tama', 'Pearl', 'DW', 'Axis', 'Trick', 'Gibraltar'],
  },
  {
    heading: 'Drumsticks',
    fields: ['sticks'],
    blurb: 'Stick brands favored for the durability and rebound metal demands.',
    brands: ['Vic Firth', 'Vater', 'Ahead', 'Zildjian', 'Promark'],
  },
];

// Drummers whose given gear field mentions the brand.
function drummersUsingBrand(brand, fields) {
  const needle = brand.toLowerCase();
  return drummers.filter((d) => {
    if (!d.gear) return false;
    return fields.some((f) => d.gear[f] && String(d.gear[f]).toLowerCase().includes(needle));
  });
}

// --- Build the document ----------------------------------------------------------
let md = '';
md += `# MetalForge — Metal Drum Gear Guide\n`;
md += `> Last Updated: ${today} · Source: ${BASE}\n\n`;
md += `A brand-by-brand guide to the drums, cymbals, pedals, and sticks used by the world's legendary metal drummers. `;
md += `Each brand lists the roster drummers who play it; follow the brand link for the full breakdown.\n\n`;

let brandsRendered = 0;
for (const cat of CATEGORIES) {
  let section = `## ${cat.heading}\n\n${cat.blurb}\n\n`;
  let any = false;
  for (const brand of cat.brands) {
    const users = drummersUsingBrand(brand, cat.fields);
    if (users.length === 0) continue;
    any = true;
    brandsRendered++;
    const names = users
      .map((d) => `[${d.name}](/llms/drummers/${drummerSlug(d.name)}.md)`)
      .join(', ');
    section += `### ${brand}\n`;
    section += `Brand page: [/brands/${brandSlug(brand)}](${BASE}/brands/${brandSlug(brand)})\n\n`;
    section += `Used by ${users.length} roster drummer${users.length === 1 ? '' : 's'}: ${names}.\n\n`;
  }
  if (any) md += section;
}

md += `---\n\n`;
md += `**More LLM resources:** [Site index](${BASE}/llms.txt) · [Full database](${BASE}/llms-full.txt) · [Master FAQ](${BASE}/llms/faq.md) · [Drummer markdown index](${BASE}/llms/index.md)\n`;

// --- Write file ------------------------------------------------------------------
const outDir = path.join(__dirname, '../public/llms');
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, 'gear-guide.md');
fs.writeFileSync(outPath, md);

const words = md.split(/\s+/).filter(Boolean).length;
console.log(`✅ Generated public/llms/gear-guide.md — ${brandsRendered} brand sections (${words} words)`);
