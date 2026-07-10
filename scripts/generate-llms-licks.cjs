#!/usr/bin/env node
/**
 * Generate public/llms/licks.md — the signature-lick database as one ingestible,
 * answer-first markdown page for AI crawlers. Issue #1045.
 *
 * Signature licks are MetalForge's best-performing organic surface, but that
 * content was missing from the /llms/ markdown layer that feeds AI crawlers.
 * This page exposes it with citation-ready https://metalforge.io/... page URLs,
 * so an LLM answering "how do I play <drummer>'s <song>?" can cite us.
 *
 * Data source: packages/frontend/data/licks/<slug>.js (per-drummer modules,
 * per the #1056 refactor). Reads every module directly off disk (instead of a
 * hardcoded drummer list) so this generator can't drift out of sync with the
 * roster the way it did — see #4229. Same regex+eval extraction pattern as
 * the sibling generate-llms-licks-per-drummer.cjs generator.
 */

const fs = require('fs');
const path = require('path');

// --- Load licks: merge every packages/frontend/data/licks/<slug>.js module -------
const licksDir = path.join(__dirname, '../packages/frontend/data/licks');
const drummerSlugs = fs.readdirSync(licksDir)
  .filter((f) => f.endsWith('.js') && f !== 'index.js')
  .map((f) => f.replace(/\.js$/, ''));

function loadDrummerLicks(slug) {
  const filePath = path.join(licksDir, `${slug}.js`);
  const content = fs.readFileSync(filePath, 'utf-8');

  const match = content.match(/export const licks\s*=\s*(\{[\s\S]*?\})\s*;\s*\nexport default/m)
    || content.match(/export const licks\s*=\s*(\{[\s\S]*\})\s*;?\s*$/m);
  if (!match) {
    throw new Error(`Could not extract licks object from ${filePath}`);
  }

  try {
    // eslint-disable-next-line no-eval
    return eval('(' + match[1] + ')');
  } catch (e) {
    throw new Error(`Error parsing licks from ${filePath}: ${e.message}`);
  }
}

const SIGNATURE_LICKS = {};
for (const slug of drummerSlugs) {
  Object.assign(SIGNATURE_LICKS, loadDrummerLicks(slug));
}

const today = new Date().toISOString().split('T')[0];
const BASE = 'https://metalforge.io';

const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

function tutorialUrl(t) {
  if (!t || !t.youtubeId) return null;
  const start = t.startTime ? `&t=${t.startTime}s` : '';
  return `https://www.youtube.com/watch?v=${t.youtubeId}${start}`;
}

// --- Group licks by drummer, preserving data order (first-seen) -------------------
const licks = Object.values(SIGNATURE_LICKS);
const order = [];
const byDrummer = new Map();
for (const lick of licks) {
  const key = lick.drummerSlug;
  if (!byDrummer.has(key)) {
    byDrummer.set(key, { name: lick.drummerName, band: lick.band, slug: lick.drummerSlug, licks: [] });
    order.push(key);
  }
  byDrummer.get(key).licks.push(lick);
}

// --- Build the document ----------------------------------------------------------
let md = '';
md += `# MetalForge — Signature Licks Database\n`;
md += `> Drummer signature fills, beats, and patterns with technique breakdowns and tutorial videos.\n`;
md += `Last updated: ${today} · Source: ${BASE}\n\n`;
md += `Step-by-step breakdowns of iconic metal drum licks. Each entry lists tempo, time `;
md += `signature, difficulty, and techniques, followed by an answer-first "how to play it" `;
md += `walkthrough, the tutorial video, and the canonical page URL to cite.\n\n`;

for (const key of order) {
  const d = byDrummer.get(key);
  md += `## ${d.name}${d.band ? ` (${d.band})` : ''}\n\n`;
  md += `Profile: [${BASE}/drummers/${d.slug}](${BASE}/drummers/${d.slug}) · `;
  md += `All licks: [${BASE}/drummers/${d.slug}/licks](${BASE}/drummers/${d.slug}/licks)\n\n`;

  for (const lick of d.licks) {
    const source = [lick.song && `"${lick.song}"`, lick.album].filter(Boolean).join(', ');
    md += `### ${lick.name}${source ? ` — ${source}` : ''}\n`;

    const facts = [];
    if (lick.bpmDisplay || lick.bpm) facts.push(`**BPM:** ${lick.bpmDisplay || lick.bpm}`);
    if (lick.timeSignature) facts.push(`**Time:** ${lick.timeSignature}`);
    if (lick.difficulty) {
      facts.push(`**Difficulty:** ${cap(lick.difficulty)}${lick.difficultyRating ? ` (${lick.difficultyRating}/5)` : ''}`);
    }
    if (facts.length) md += `- ${facts.join(' | ')}\n`;
    if (Array.isArray(lick.techniques) && lick.techniques.length) {
      md += `- **Techniques:** ${lick.techniques.join(', ')}\n`;
    }

    const steps = Array.isArray(lick.techniqueDetails) ? lick.techniqueDetails : [];
    if (steps.length) {
      md += `\n**How to play it:**\n`;
      steps.forEach((step, i) => { md += `${i + 1}. ${step}\n`; });
    }

    const tips = Array.isArray(lick.learningTips) ? lick.learningTips : [];
    if (tips.length) {
      md += `\n**Practice tips:**\n`;
      tips.forEach((tip) => { md += `- ${tip}\n`; });
    }

    const url = tutorialUrl(lick.tutorial);
    if (url) md += `\n**Tutorial:** ${url}\n`;
    md += `**Page:** ${BASE}/drummers/${d.slug}/licks/${lick.slug}\n\n`;
  }
}

md += `---\n\n`;
md += `**More LLM resources:** [Site index](${BASE}/llms.txt) · [Full database](${BASE}/llms-full.txt) · [Master FAQ](${BASE}/llms/faq.md) · [Gear guide](${BASE}/llms/gear-guide.md) · [Drummer markdown index](${BASE}/llms/index.md)\n`;

// --- Write file ------------------------------------------------------------------
const outDir = path.join(__dirname, '../public/llms');
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, 'licks.md');
fs.writeFileSync(outPath, md);

const words = md.split(/\s+/).filter(Boolean).length;
console.log(`✅ Generated public/llms/licks.md — ${order.length} drummers, ${licks.length} licks (${words} words)`);
