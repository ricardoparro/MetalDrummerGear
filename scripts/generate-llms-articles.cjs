#!/usr/bin/env node
/**
 * Generate public/llms/articles/<slug>.md - one clean Markdown breakdown per article.
 * Issue #1058 - expose the article corpus to the /llms/*.md surface (#873/#1017).
 *
 * AI crawlers (GPTBot, ClaudeBot, PerplexityBot, ...) can ingest a full album/kit gear
 * breakdown in one request without parsing React/HTML. Mirrors the sibling generator
 * generate-llms-drummers.cjs (regex + controlled eval over the data module, same min-words
 * guard) so both stay in sync from a single source of truth.
 *
 * Source of truth: packages/frontend/data/albumArticles.js -> ALBUM_ARTICLES.
 * Two article shapes share the same gear sub-objects: album drum-setup articles
 * (albumTitle present) and "what's in <drummer>'s kit" breakdowns (no albumTitle).
 */

const fs = require('fs');
const path = require('path');

// --- Load articles (same regex+eval extraction as the sibling generators) ---------
const articlesPath = path.join(__dirname, '../packages/frontend/data/albumArticles.js');
const articlesContent = fs.readFileSync(articlesPath, 'utf-8');

const objMatch = articlesContent.match(/export const ALBUM_ARTICLES = (\{[\s\S]*?\});\s*(?:\/\/|export|$)/);
if (!objMatch) {
  console.error('Could not extract ALBUM_ARTICLES from packages/frontend/data/albumArticles.js');
  process.exit(1);
}

let articles;
try {
  articles = eval(`(function() { return ${objMatch[1]}; })()`);
} catch (e) {
  console.error('Error parsing ALBUM_ARTICLES:', e);
  process.exit(1);
}

const today = new Date().toISOString().split('T')[0];
const BASE = 'https://metalforge.io';
const MIN_WORDS = 300;

function generateSlug(name) {
  return String(name).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// Drummer back-link points at the per-drummer markdown only when it actually exists,
// so we never emit an orphan link (a handful of article drummers have no /llms md).
const drummerMdDir = path.join(__dirname, '../public/llms/drummers');
const drummerMdSlugs = new Set(
  fs.existsSync(drummerMdDir)
    ? fs.readdirSync(drummerMdDir).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''))
    : []
);

function drummerLink(name) {
  if (!name) return null;
  const slug = generateSlug(name);
  return drummerMdSlugs.has(slug) ? `[${name}](/llms/drummers/${slug}.md)` : name;
}

// Join a gear sub-object's `setup`/`items` array into a single readable line.
function listModels(arr) {
  if (!Array.isArray(arr)) return null;
  const parts = arr
    .map((x) => (x && (x.model || x.brand)) ? `${x.model || x.brand}` : null)
    .filter(Boolean);
  return parts.length ? parts.join('; ') : null;
}

function buildMarkdown(article) {
  const slug = article.slug;
  const isAlbum = Boolean(article.albumTitle);
  const type = isAlbum ? 'Album Drum Setup' : 'Kit Breakdown';
  const sourceUrl = `${BASE}/articles/${slug}`;

  let md = `# ${article.title}\n\n`;
  if (article.description) md += `> ${article.description}\n\n`;

  md += `**Type:** ${type}\n`;
  const dLink = drummerLink(article.drummer);
  if (dLink) md += `**Drummer(s):** ${dLink}\n`;
  if (isAlbum) {
    const ba = [article.artist, article.albumTitle && `*${article.albumTitle}*${article.year ? ` (${article.year})` : ''}`]
      .filter(Boolean).join(' — ');
    if (ba) md += `**Band / Album:** ${ba}\n`;
  } else if (article.band) {
    md += `**Band / Album:** ${article.band}\n`;
  }
  if (article.genre) md += `**Genre:** ${article.genre}\n`;
  md += `\n`;

  // --- Overview (full intro prose — the bulk of the word count) -----------------
  if (article.intro && article.intro.content) {
    md += `## Overview\n\n${article.intro.content}\n\n`;
  }

  // --- Gear Breakdown (bullets + supporting prose) -----------------------------
  md += `## Gear Breakdown\n\n`;
  const k = article.drumKit || {};
  const s = article.snare || {};
  const c = article.cymbals || {};
  const h = article.hardware || {};

  const drumsLine = [k.brand, k.model].filter(Boolean).join(' ');
  if (drumsLine) md += `- **Drums:** ${drumsLine}${k.finish ? ` (${k.finish} finish)` : ''}\n`;
  const snareLine = [s.brand, s.model].filter(Boolean).join(' ');
  if (snareLine) md += `- **Snare:** ${snareLine}${s.size ? `, ${s.size}` : ''}\n`;
  const cymbalsLine = [c.brand, c.series].filter(Boolean).join(' — ') || listModels(c.setup);
  if (cymbalsLine) md += `- **Cymbals:** ${cymbalsLine}\n`;
  const hardwareLine = listModels(h.items);
  if (hardwareLine) md += `- **Hardware / Pedals:** ${hardwareLine}\n`;
  const heads = s.heads || h.heads;
  if (heads) md += `- **Heads:** ${heads}\n`;
  if (s.tuningSetting) md += `- **Snare tuning:** ${s.tuningSetting}\n`;
  md += `\n`;

  // Supporting prose adds depth and guarantees the word-count gate.
  if (k.description) md += `### ${k.title || 'Drum Kit'}\n\n${k.description}\n\n`;
  if (s.description) md += `### ${s.title || 'Snare'}\n\n${s.description}\n\n`;
  if (c.description) md += `### ${c.title || 'Cymbals'}\n\n${c.description}\n\n`;

  // --- Key Facts ----------------------------------------------------------------
  const facts = [];
  if (article.intro && Array.isArray(article.intro.keyPoints)) facts.push(...article.intro.keyPoints);
  if (Array.isArray(k.notes)) facts.push(...k.notes);
  if (k.estimatedValue) facts.push(`Estimated kit value: ${k.estimatedValue}`);
  if (s.estimatedValue) facts.push(`Estimated snare value: ${s.estimatedValue}`);
  if (facts.length) {
    md += `## Key Facts\n\n`;
    for (const f of facts) md += `- ${f}\n`;
    md += `\n`;
  }

  // --- Footer / cross-links (always >=3 internal links) -------------------------
  md += `**Source:** ${sourceUrl}\n\n`;
  md += `**More LLM resources:** [Site index](/llms.txt) · [Full database](/llms-full.txt) · [Master FAQ](/llms/faq.md) · [Drummer index](/llms/index.md)\n\n`;
  md += `*Last updated: ${today} · Source: [MetalForge.io](${BASE})*\n`;

  return { slug, md };
}

// --- Write files -----------------------------------------------------------------
const outDir = path.join(__dirname, '../public/llms/articles');
fs.mkdirSync(outDir, { recursive: true });

let written = 0;
let minWords = Infinity;
let thin = 0;
for (const key of Object.keys(articles)) {
  const article = articles[key];
  if (!article || !article.slug) {
    console.warn(`Skipping entry "${key}" — missing slug.`);
    continue;
  }
  const { slug, md } = buildMarkdown(article);
  const words = md.split(/\s+/).filter(Boolean).length;
  if (words < MIN_WORDS) {
    console.warn(`⚠️  ${slug}.md is thin (${words} words < ${MIN_WORDS}) — skipping to avoid emitting a stub.`);
    thin++;
    continue;
  }
  fs.writeFileSync(path.join(outDir, `${slug}.md`), md);
  if (words < minWords) minWords = words;
  written++;
}

console.log(`✅ Generated public/llms/articles/*.md — ${written} articles (min ${minWords} words/file)${thin ? `, ${thin} thin skipped` : ''}`);
