#!/usr/bin/env node
/**
 * Generate public/llms/articles/<slug>.md - one clean Markdown breakdown per article.
 * Issue #1058 - expose the article corpus to the /llms/*.md surface (#873/#1017).
 *
 * AI crawlers (GPTBot, ClaudeBot, PerplexityBot, ...) can ingest a full album/kit gear
 * breakdown in one request without parsing React/HTML. Mirrors the sibling generator
 * generate-llms-drummers.cjs (same min-words guard) so both stay in sync from a
 * single source of truth.
 *
 * Source of truth: packages/frontend/data/albumArticles/index.js -> ALBUM_ARTICLES
 * (composed from per-drummer modules, loaded here via dynamic import()).
 * Two article shapes share the same gear sub-objects: album drum-setup articles
 * (albumTitle present) and "what's in <drummer>'s kit" breakdowns (no albumTitle).
 */

const fs = require('fs');
const path = require('path');

const today = new Date().toISOString().split('T')[0];
const BASE = 'https://metalforge.io';
const MIN_WORDS = 300;

function generateSlug(name) {
  return String(name).toLowerCase()
    .replace(/[åä]/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u')
    .replace(/é|è|ê|ë/g, 'e').replace(/í|ì|î|ï/g, 'i').replace(/ó|ò|ô/g, 'o')
    .replace(/ú|ù|û/g, 'u').replace(/ñ/g, 'n').replace(/ß/g, 'ss')
    .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
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

// Issue #7210: relatedArticles/relatedAlbums/relatedDrummers cross-links, resolved
// against real slug sets so we never emit a fabricated/broken link.
//
// relatedDrummers -> id -> slug (same regex+eval extraction generate-llms-drummers.cjs
// uses for api/drummers/index.js), validated against drummerMdSlugs above. A handful
// of entries already carry the slug directly instead of a numeric id — handle both.
const drummersPath = path.join(__dirname, '../api/drummers/index.js');
const drummersArrayMatch = fs.readFileSync(drummersPath, 'utf-8')
  .match(/const drummers = (\[[\s\S]*?\]);[\s\S]*?export default function handler/);
const drummers = drummersArrayMatch ? eval(drummersArrayMatch[1]) : [];
const drummerIdToSlug = new Map();
const drummerSlugToName = new Map();
for (const d of drummers) {
  const slug = generateSlug(d.name);
  drummerIdToSlug.set(d.id, slug);
  drummerSlugToName.set(slug, d.name);
}

function resolveDrummerRef(ref) {
  const slug = typeof ref === 'number' ? drummerIdToSlug.get(ref) : generateSlug(ref);
  if (!slug || !drummerMdSlugs.has(slug)) return null;
  return { href: `/drummer/${slug}`, label: drummerSlugToName.get(slug) || slug };
}

// relatedArticles/relatedAlbums slugs point into one of two content families:
// packages/frontend/data/albumArticles (route /articles/<slug>) or
// packages/frontend/data/top10Lists (route /lists/<slug> — confirmed against
// App.js's TopListPage + api/sitemap.js, not /top10/ or /guides/). These maps are
// populated in main() once both ESM data modules are loaded.
let albumArticleTitles = new Map();
let top10ListTitles = new Map();

function resolveArticleRef(slug) {
  if (albumArticleTitles.has(slug)) return { href: `/articles/${slug}`, label: albumArticleTitles.get(slug) };
  if (top10ListTitles.has(slug)) return { href: `/lists/${slug}`, label: top10ListTitles.get(slug) };
  return null;
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
  if (article.label) md += `**Label:** ${article.label}\n`;
  if (article.studio) md += `**Studio:** ${article.studio}\n`;
  if (article.producer) md += `**Producer:** ${article.producer}\n`;
  md += `\n`;

  // --- Overview (full intro prose — the bulk of the word count) -----------------
  if (article.intro && article.intro.content) {
    md += `## Overview\n\n${article.intro.content}\n\n`;
  }

  // --- Gear Breakdown (bullets + supporting prose) -----------------------------
  const k = article.drumKit || {};
  const s = article.snare || {};
  const c = article.cymbals || {};
  const h = article.hardware || {};

  const drumsLine = [k.brand, k.model].filter(Boolean).join(' ');
  const snareLine = [s.brand, s.model].filter(Boolean).join(' ');
  const cymbalsLine = [c.brand, c.series].filter(Boolean).join(' — ') || listModels(c.setup);
  const hardwareLine = listModels(h.items);
  const heads = s.heads || h.heads;

  // Album/kit-shaped articles carry drumKit/snare/cymbals/hardware; narrative
  // articles (e.g. tribute pieces) may have none of these — skip the heading
  // entirely rather than emit an empty "## Gear Breakdown".
  if (drumsLine || snareLine || cymbalsLine || hardwareLine || heads) {
    md += `## Gear Breakdown\n\n`;
    if (drumsLine) md += `- **Drums:** ${drumsLine}${k.finish ? ` (${k.finish} finish)` : ''}\n`;
    if (snareLine) md += `- **Snare:** ${snareLine}${s.size ? `, ${s.size}` : ''}\n`;
    if (cymbalsLine) md += `- **Cymbals:** ${cymbalsLine}\n`;
    if (hardwareLine) md += `- **Hardware / Pedals:** ${hardwareLine}\n`;
    if (heads) md += `- **Heads:** ${heads}\n`;
    if (s.tuningSetting) md += `- **Snare tuning:** ${s.tuningSetting}\n`;
    md += `\n`;
  }

  // Supporting prose adds depth and guarantees the word-count gate.
  if (k.description) md += `### ${k.title || 'Drum Kit'}\n\n${k.description}\n\n`;
  if (s.description) md += `### ${s.title || 'Snare'}\n\n${s.description}\n\n`;
  if (c.description) md += `### ${c.title || 'Cymbals'}\n\n${c.description}\n\n`;

  // --- Generic Prose Sections + Gear Legacy links (narrative articles, e.g.
  // tribute/anniversary pieces — Issue #4424) ------------------------------------
  if (Array.isArray(article.sections)) {
    for (const section of article.sections) {
      if (!section) continue;
      md += `## ${section.title}\n\n${section.content || ''}\n\n`;
      if (Array.isArray(section.keyPoints) && section.keyPoints.length) {
        for (const point of section.keyPoints) md += `- ${point}\n`;
        md += `\n`;
      }
    }
  }
  if (article.gearLegacy) {
    md += `## ${article.gearLegacy.title || 'The Gear Legacy'}\n\n`;
    if (article.gearLegacy.content) md += `${article.gearLegacy.content}\n\n`;
    if (Array.isArray(article.gearLegacy.links)) {
      for (const link of article.gearLegacy.links) {
        md += `- [${link.label}](${BASE}${link.href})${link.note ? ` — ${link.note}` : ''}\n`;
      }
      md += `\n`;
    }
  }
  if (article.conclusion) {
    md += `## ${article.conclusion.title || 'Conclusion'}\n\n`;
    if (article.conclusion.content) md += `${article.conclusion.content}\n\n`;
  }

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

  // --- FAQ (from albumArticles faq array) ----------------------------------------
  if (Array.isArray(article.faq) && article.faq.length) {
    md += `## Frequently Asked Questions\n\n`;
    for (const f of article.faq) {
      md += `**Q: ${f.question}**\n\nA: ${f.answer}\n\n`;
    }
  }

  // --- Related (relatedArticles/relatedAlbums/relatedDrummers, Issue #7210) -----
  // relatedArticles + relatedAlbums both point at "articles" in the site's sense
  // (album-setup pieces or top10 lists) so they're deduped into one list; unresolved
  // slugs are logged and skipped rather than emitted as broken links.
  const relatedArticleLinks = [];
  const seenArticleSlugs = new Set();
  for (const relSlug of [...(article.relatedArticles || []), ...(article.relatedAlbums || [])]) {
    if (seenArticleSlugs.has(relSlug)) continue;
    seenArticleSlugs.add(relSlug);
    const resolved = resolveArticleRef(relSlug);
    if (resolved) relatedArticleLinks.push(resolved);
    else console.warn(`  ↳ "${slug}": related slug "${relSlug}" resolves to neither albumArticles nor top10Lists — skipped`);
  }
  const relatedDrummerLinks = [];
  for (const ref of article.relatedDrummers || []) {
    const resolved = resolveDrummerRef(ref);
    if (resolved) relatedDrummerLinks.push(resolved);
    else console.warn(`  ↳ "${slug}": related drummer ref "${ref}" has no matching /llms/drummers md — skipped`);
  }
  if (relatedArticleLinks.length) {
    md += `## Related Articles\n\n`;
    for (const link of relatedArticleLinks) md += `- [${link.label}](${BASE}${link.href})\n`;
    md += `\n`;
  }
  if (relatedDrummerLinks.length) {
    md += `## Related Drummers\n\n`;
    for (const link of relatedDrummerLinks) md += `- [${link.label}](${BASE}${link.href})\n`;
    md += `\n`;
  }

  // --- Footer / cross-links (always >=3 internal links) -------------------------
  md += `**Source:** ${sourceUrl}\n\n`;
  md += `**More LLM resources:** [Site index](/llms.txt) · [Full database](/llms-full.txt) · [Master FAQ](/llms/faq.md) · [Drummer index](/llms/index.md)\n\n`;
  md += `*Last updated: ${today} · Source: [MetalForge.io](${BASE})*\n`;

  return { slug, md };
}

// --- Write files -----------------------------------------------------------------
async function main() {
  // ALBUM_ARTICLES is composed from ESM per-drummer modules under albumArticles/ —
  // dynamic import() loads it directly instead of regexing the (now barrel) .js file.
  const { ALBUM_ARTICLES: articles } = await import('../packages/frontend/data/albumArticles/index.js');
  const { TOP_10_LISTS } = await import('../packages/frontend/data/top10Lists.js');

  for (const a of Object.values(articles)) {
    if (a && a.slug) albumArticleTitles.set(a.slug, a.title || a.slug);
  }
  for (const l of Object.values(TOP_10_LISTS)) {
    if (l && l.slug) top10ListTitles.set(l.slug, l.title || l.slug);
  }

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
}

main();
