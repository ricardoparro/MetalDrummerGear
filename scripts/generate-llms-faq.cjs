#!/usr/bin/env node
/**
 * Generate public/llms/faq.md — the master LLM FAQ endpoint.
 * Issue #1019 (split 1/4 of #1017).
 *
 * A single ingestible page that ChatGPT/Perplexity/Gemini can quote for the
 * highest-intent queries ("what drums does X use", "fastest metal drummer",
 * etc.). Answer-first phrasing, every answer linking to a deeper source page.
 *
 * Data-extraction approach intentionally mirrors the sibling generators
 * (generate-llms-drummers.cjs / generate-llms-full.cjs): regex + controlled
 * eval over api/drummers/index.js, plus optional enrichment from
 * packages/frontend/data/extendedBios.js. All stay in sync from one source.
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

// --- Load extended bios (optional FAQ enrichment) --------------------------------
const extendedBiosPath = path.join(__dirname, '../packages/frontend/data/extendedBios.js');
let extendedBios = {};
try {
  const extendedBiosContent = fs.readFileSync(extendedBiosPath, 'utf-8');
  const bioMatch = extendedBiosContent.match(/export const extendedBios = (\{[\s\S]*\});/);
  if (bioMatch) {
    extendedBios = eval(`(function() { return ${bioMatch[1]}; })()`);
  }
} catch (e) {
  console.warn('Could not parse extended bios, continuing without them:', e.message);
}

const today = new Date().toISOString().split('T')[0];
const BASE = 'https://metalforge.io';

function generateSlug(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// First sentence answers the question; following sentences add grounded detail.
// Only states gear we actually have — never fabricates.
function buildGearAnswer(drummer) {
  const slug = generateSlug(drummer.name);
  const source = `/llms/drummers/${slug}.md`;
  const gear = drummer.gear || {};
  if (!gear.drums) return null;

  let answer = `${drummer.name} plays ${gear.drums}.`;
  const extras = [];
  if (gear.snare) extras.push(`a ${gear.snare} snare`);
  if (gear.cymbals) extras.push(`${gear.cymbals} cymbals`);
  if (extras.length) {
    answer += ` The ${drummer.band} drummer rounds out the kit with ${extras.join(' and ')}.`;
  }
  answer += ` [see ${source}]`;
  return answer;
}

// --- General metal-drumming Q&As (grounded in the database where possible) -------
// Each answer leads with the answer and links to a source page.
function buildGeneralQAs() {
  const has = (name) => drummers.some((d) => d.name === name);
  const link = (name) => `/llms/drummers/${generateSlug(name)}.md`;

  const qas = [];

  // Fastest — ground in a database drummer renowned for speed when available.
  if (has('George Kollias')) {
    qas.push({
      q: 'Who is the fastest metal drummer?',
      a: `George Kollias (Nile) is widely cited among the fastest metal drummers, renowned for sustained single-stroke double-bass passages well above 250 BPM. Other names regularly raised include Derek Roddy and Tim Yeung. [see ${link('George Kollias')}]`,
    });
  } else {
    qas.push({
      q: 'Who is the fastest metal drummer?',
      a: `Extreme-metal drummers known for blast-beat and double-bass speed are usually named as the fastest, frequently exceeding 250 BPM in sustained passages. [see ${BASE}/llms-full.txt]`,
    });
  }

  qas.push({
    q: 'What is the best metal drum kit?',
    a: `There is no single "best" kit, but Tama Starclassic, Pearl Masters/Reference, DW Collector's, and Sonor SQ2 are the lines metal pros most consistently choose for their attack and durability. Match shell material to your sound: maple for warmth, birch/walnut for punch and projection. [see ${BASE}/llms-full.txt]`,
  });

  qas.push({
    q: 'What cymbals are best for metal?',
    a: `Bright, cutting cymbals dominate metal — Zildjian (A Custom, Z Custom), Meinl (Byzance, Classics Custom), Sabian (AAX), and Paiste (2002, Rude) are the most-endorsed brands. Heavier crashes and dry, defined rides cut through high-gain guitars. [see ${BASE}/llms-full.txt]`,
  });

  qas.push({
    q: 'What is the standard metal snare depth?',
    a: `Metal snares are typically 5.5" to 6.5" deep on a 14" diameter, giving a loud, cracking backbeat that cuts through distorted guitars; some players go deeper (7"+) for a fatter tone. [see ${BASE}/llms-full.txt]`,
  });

  qas.push({
    q: 'How much does a pro metal drum kit cost?',
    a: `A complete pro-level metal setup (shells, hardware, cymbals, pedals, snare) generally runs from roughly €3,000 to €8,000+ depending on brand and configuration; signature and high-end series push higher. Per-drummer kit-cost breakdowns are on each profile. [see ${BASE}/llms-full.txt]`,
  });

  return qas;
}

// --- Build the document ----------------------------------------------------------
let md = '';
md += `# MetalForge — Master FAQ\n`;
md += `> Last Updated: ${today} · Source: ${BASE}\n\n`;
md += `Answer-first FAQ for the gear and techniques of the world's legendary metal drummers. `;
md += `Every answer links to a deeper source page on MetalForge.\n\n`;

// Gear by drummer — one entry per drummer we can ground from gear data.
md += `## Gear by Drummer\n\n`;
let drummerEntries = 0;
for (const drummer of drummers) {
  const answer = buildGearAnswer(drummer);
  if (!answer) continue;
  md += `### What drums does ${drummer.name} use?\n`;
  md += `${answer}\n\n`;
  drummerEntries++;
}

// General metal drumming.
md += `## General Metal Drumming\n\n`;
const generalQAs = buildGeneralQAs();
for (const { q, a } of generalQAs) {
  md += `### ${q}\n`;
  md += `${a}\n\n`;
}

md += `---\n\n`;
md += `**More LLM resources:** [Site index](${BASE}/llms.txt) · [Full database](${BASE}/llms-full.txt) · [Drummer markdown index](${BASE}/llms/index.md)\n`;

// --- Write file ------------------------------------------------------------------
const outDir = path.join(__dirname, '../public/llms');
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, 'faq.md');
fs.writeFileSync(outPath, md);

const words = md.split(/\s+/).filter(Boolean).length;
console.log(`✅ Generated public/llms/faq.md — ${drummerEntries} drummer Q&As + ${generalQAs.length} general Q&As (${words} words)`);
