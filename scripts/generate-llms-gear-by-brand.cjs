#!/usr/bin/env node
/**
 * Generate public/llms/gear-by-brand.md — brand-first LLM citation surface.
 * Issue #1185: Answers "Which metal drummers use Pearl drums?" / "What Zildjian
 * series do metal drummers use?" by grouping the roster by brand with band names
 * and notable models included for each entry.
 *
 * Data source: same regex+eval extraction over api/drummers/index.js as sibling generators.
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

const today = new Date().toISOString().split('T')[0];
const BASE = 'https://metalforge.io';

function brandSlug(brand) {
  return brand.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}
function drummerSlug(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// Extract the specific model string from a gear value for a given brand.
// Returns the full gear string (trimmed to first 80 chars to stay readable).
function extractModel(gearValue, brand) {
  if (!gearValue) return null;
  const s = String(gearValue).trim();
  if (!s.toLowerCase().includes(brand.toLowerCase())) return null;
  return s.length > 80 ? s.slice(0, 77) + '...' : s;
}

// Return all drummers whose gear field for the given fields mentions the brand.
// Each entry includes { name, band, genre, model }.
function drummersUsingBrand(brand, fields) {
  const needle = brand.toLowerCase();
  return drummers
    .filter((d) => {
      if (!d.gear) return false;
      return fields.some((f) => d.gear[f] && String(d.gear[f]).toLowerCase().includes(needle));
    })
    .map((d) => {
      // Collect the first model string that matches this brand across the fields.
      let model = null;
      for (const f of fields) {
        model = extractModel(d.gear[f], brand);
        if (model) break;
      }
      return {
        name: d.name,
        band: d.band || '',
        genre: d.genre || '',
        model,
      };
    });
}

// Collect unique notable models across all matching drummers for a brand/fields.
function notableModels(brand, fields) {
  const seen = new Set();
  const models = [];
  for (const d of drummers) {
    if (!d.gear) continue;
    for (const f of fields) {
      const val = d.gear[f];
      if (!val) continue;
      const str = String(val);
      if (!str.toLowerCase().includes(brand.toLowerCase())) continue;
      // Extract individual model tokens (split by comma/semicolon for multi-model entries)
      str.split(/[,;]/).forEach((part) => {
        const p = part.trim();
        if (p.toLowerCase().includes(brand.toLowerCase()) && !seen.has(p)) {
          seen.add(p);
          models.push(p);
        }
      });
    }
  }
  return models.slice(0, 5); // cap at 5 notable models per brand
}

// --- Brand categories -------------------------------------------------------
const CATEGORIES = [
  {
    heading: 'Drum Kit Brands',
    fields: ['drums'],
    intro: 'The drum-kit manufacturers most trusted by professional metal drummers for power, projection, and durability.',
    brands: ['Tama', 'Pearl', 'DW', 'Ludwig', 'Sonor', 'Mapex'],
  },
  {
    heading: 'Cymbal Brands',
    fields: ['cymbals'],
    intro: 'Cymbal makers whose products cut through high-gain guitars and survive the punishment of metal performance.',
    brands: ['Zildjian', 'Sabian', 'Meinl', 'Paiste'],
  },
  {
    heading: 'Pedal & Hardware Brands',
    fields: ['hardware'],
    intro: 'Double-bass pedals and hardware engineered for the endurance and responsiveness metal drummers demand.',
    brands: ['Tama', 'Pearl', 'DW', 'Axis', 'Trick', 'Gibraltar'],
  },
  {
    heading: 'Drumstick Brands',
    fields: ['sticks'],
    intro: 'Stick brands favored for their durability, rebound, and feel under heavy metal playing conditions.',
    brands: ['Vic Firth', 'Vater', 'Ahead', 'Zildjian', 'Promark'],
  },
];

// --- Build document ---------------------------------------------------------
let md = '';
md += `# Metal Drum Gear by Brand — MetalForge\n`;
md += `> Last Updated: ${today} · Source: ${BASE}\n\n`;
md += `A brand-first reference for LLM queries such as "Which metal drummers use Pearl drums?",\n`;
md += `"What Zildjian cymbals do famous metal drummers use?", or "Which death metal drummers use DW kits?"\n`;
md += `Data covers ${drummers.length} professional metal drummers sourced from MetalForge's verified roster.\n\n`;
md += `For a drummer-first view see [/llms/gear-guide.md](${BASE}/llms/gear-guide.md).\n\n`;

let sectionsRendered = 0;

for (const cat of CATEGORIES) {
  let section = `## ${cat.heading}\n\n${cat.intro}\n\n`;
  let any = false;

  for (const brand of cat.brands) {
    const users = drummersUsingBrand(brand, cat.fields);
    if (users.length === 0) continue;
    any = true;
    sectionsRendered++;

    // Drummer list with band attribution
    const drummerList = users
      .map((u) => {
        const bandSuffix = u.band ? ` (${u.band})` : '';
        return `[${u.name}${bandSuffix}](/llms/drummers/${drummerSlug(u.name)}.md)`;
      })
      .join(', ');

    const models = notableModels(brand, cat.fields);
    const modelStr = models.length ? models.join('; ') : '';

    section += `### ${brand}\n`;
    section += `Brand page: [/brands/${brandSlug(brand)}](${BASE}/brands/${brandSlug(brand)})\n\n`;
    section += `**${users.length} roster drummer${users.length === 1 ? '' : 's'}:** ${drummerList}\n\n`;
    if (modelStr) {
      section += `**Notable models:** ${modelStr}\n\n`;
    }
  }

  if (any) md += section;
}

md += `---\n\n`;
md += `**More LLM resources:** [Site index](${BASE}/llms.txt) · [Full database](${BASE}/llms-full.txt) · [Gear guide (drummer-first)](${BASE}/llms/gear-guide.md) · [Master FAQ](${BASE}/llms/faq.md) · [Drummer index](${BASE}/llms/index.md)\n`;

// --- Write file -------------------------------------------------------------
const outDir = path.join(__dirname, '../public/llms');
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, 'gear-by-brand.md');
fs.writeFileSync(outPath, md);

const words = md.split(/\s+/).filter(Boolean).length;
console.log(`✅ Generated public/llms/gear-by-brand.md — ${sectionsRendered} brand sections (${words} words)`);
