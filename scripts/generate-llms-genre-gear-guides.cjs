#!/usr/bin/env node
/**
 * Generate public/llms/guides/<slug>.md mirrors for GENRE_GEAR_GUIDES entries.
 *
 * Issue #4645: GENRE_GEAR_GUIDES (packages/frontend/data/genreGearGuides.js) has
 * 278 entries, each rendered as a full HTML page at /guides/<slug> with HowTo
 * schema (#4574) — but only 49 had a public/llms/guides/<slug>.md mirror for AI
 * crawlers (hand-authored across the #2952/#3254/#3713 "Genre Gear Guide batch"
 * issues, then wired into the sitemap by #4634). The other 229 (82%) were
 * completely invisible to LLM crawlers despite the HTML page and structured
 * data already existing in full.
 *
 * This mechanically renders the remaining 229 straight from the already-rich
 * GENRE_GEAR_GUIDES fields (intro, whatToLookFor, proRecommendations,
 * budgetOptions, comparison, verdict, faq, conclusion) — same regex+eval
 * extraction pattern as sibling generate-llms-*.cjs scripts. The pre-existing
 * 49 hand-authored files are left untouched (skipped) so this doesn't clobber
 * curated content; new files use a consistent, mechanically-generated format
 * derived directly from the data module fields.
 */

'use strict';
const fs = require('fs');
const path = require('path');

const BASE = 'https://metalforge.io';

// --- Load GENRE_GEAR_GUIDES from the ESM data module (regex + controlled eval,
// same pattern as scripts/generate-llms-cymbals.cjs) ---
const dataPath = path.join(__dirname, '../packages/frontend/data/genreGearGuides.js');
const dataContent = fs.readFileSync(dataPath, 'utf-8');

const objectMatch = dataContent.match(/export const GENRE_GEAR_GUIDES\s*=\s*(\{[\s\S]*\n\});/);
if (!objectMatch) {
  console.error('Could not extract GENRE_GEAR_GUIDES from genreGearGuides.js');
  process.exit(1);
}

let GENRE_GEAR_GUIDES;
try {
  // eslint-disable-next-line no-eval
  GENRE_GEAR_GUIDES = eval('(' + objectMatch[1] + ')');
} catch (e) {
  console.error('Error parsing GENRE_GEAR_GUIDES:', e);
  process.exit(1);
}

function humanize(slug) {
  return slug
    .split('-')
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ');
}

// proRecommendations/budgetOptions items are keyed generically as `.pedals`
// regardless of the guide's actual gearType (cymbals, sticks, snares, ...) —
// verified across all 278 entries.
function items(section) {
  return (section && Array.isArray(section.pedals)) ? section.pedals : [];
}

function renderItem(item, heading) {
  const parts = [];
  parts.push(`### ${heading}${item.name}${item.brand ? ` — ${item.brand}` : ''}`);
  parts.push('');
  const meta = [];
  if (item.model) meta.push(`**Model:** ${item.model}`);
  if (item.priceRange) meta.push(`**Price range:** ${item.priceRange}`);
  if (item.tier) meta.push(`**Tier:** ${item.tier}`);
  if (item.driveType) meta.push(`**Type:** ${item.driveType}`);
  if (item.material) meta.push(`**Material:** ${item.material}`);
  if (item.size) meta.push(`**Size:** ${item.size}`);
  if (item.bestFor) meta.push(`**Best for:** ${item.bestFor}`);
  if (item.rating) meta.push(`**Rating:** ${item.rating}/5`);
  if (meta.length) {
    parts.push(meta.join('  \n'));
    parts.push('');
  }
  if (item.description) {
    parts.push(item.description);
    parts.push('');
  }
  if (Array.isArray(item.pros) && item.pros.length) {
    parts.push('**Pros:**');
    for (const p of item.pros) parts.push(`- ${p}`);
    parts.push('');
  }
  if (Array.isArray(item.cons) && item.cons.length) {
    parts.push('**Cons:**');
    for (const c of item.cons) parts.push(`- ${c}`);
    parts.push('');
  }
  if (Array.isArray(item.usedBy) && item.usedBy.length) {
    parts.push('**Who uses it:**');
    for (const u of item.usedBy) {
      const band = u.band ? ` (${u.band})` : '';
      const note = u.note ? ` — ${u.note}` : '';
      parts.push(`- ${u.name}${band}${note}`);
    }
    parts.push('');
  }
  if (item.verdict) {
    parts.push(`**Verdict:** ${item.verdict}`);
    parts.push('');
  }
  return parts.join('\n');
}

function buildMarkdown(g) {
  const url = `${BASE}/guides/${g.slug}`;
  const parts = [];

  parts.push(`# ${g.title}`);
  parts.push('');
  if (g.description) {
    parts.push(`> ${g.description}`);
    parts.push('');
  }
  parts.push(`**Guide URL:** [${url}](${url})  `);
  parts.push(`**Last Updated:** ${g.dateModified || g.datePublished || ''}`);
  parts.push('');
  parts.push('---');
  parts.push('');

  // --- Intro ---
  if (g.intro) {
    parts.push(`## ${g.intro.title || 'Overview'}`);
    parts.push('');
    if (g.intro.content) {
      parts.push(g.intro.content);
      parts.push('');
    }
    if (Array.isArray(g.intro.keyPoints) && g.intro.keyPoints.length) {
      parts.push('**Key Points:**');
      parts.push('');
      for (const kp of g.intro.keyPoints) parts.push(`- ${kp}`);
      parts.push('');
    }
    parts.push('---');
    parts.push('');
  }

  // --- What to look for ---
  if (g.whatToLookFor && Array.isArray(g.whatToLookFor.features) && g.whatToLookFor.features.length) {
    parts.push(`## ${g.whatToLookFor.title || 'What to Look For'}`);
    parts.push('');
    for (const f of g.whatToLookFor.features) {
      parts.push(`### ${f.icon ? `${f.icon} ` : ''}${f.name}`);
      parts.push('');
      if (f.description) {
        parts.push(f.description);
        parts.push('');
      }
      if (f.recommendation) {
        parts.push(`**Recommendation:** ${f.recommendation}`);
        parts.push('');
      }
    }
    parts.push('---');
    parts.push('');
  }

  // --- Pro recommendations ---
  const proItems = items(g.proRecommendations);
  if (proItems.length) {
    parts.push(`## ${(g.proRecommendations && g.proRecommendations.title) || 'Top Picks'}`);
    parts.push('');
    for (const item of proItems) {
      const heading = item.rank ? `${item.rank}. ` : '';
      parts.push(renderItem(item, heading));
    }
    parts.push('---');
    parts.push('');
  }

  // --- Budget options ---
  const budgetItems = items(g.budgetOptions);
  if (budgetItems.length) {
    parts.push(`## ${(g.budgetOptions && g.budgetOptions.title) || 'Budget Options'}`);
    parts.push('');
    if (g.budgetOptions.description) {
      parts.push(g.budgetOptions.description);
      parts.push('');
    }
    for (const item of budgetItems) {
      parts.push(renderItem(item, ''));
    }
    parts.push('---');
    parts.push('');
  }

  // --- Comparison ---
  if (g.comparison && g.comparison.content) {
    parts.push(`## ${g.comparison.title || 'Comparison'}`);
    parts.push('');
    parts.push(g.comparison.content);
    parts.push('');
    if (Array.isArray(g.comparison.comparisonTable) && g.comparison.comparisonTable.length) {
      const columns = Object.keys(g.comparison.comparisonTable[0]);
      parts.push(`| ${columns.join(' | ')} |`);
      parts.push(`| ${columns.map(() => '---').join(' | ')} |`);
      for (const row of g.comparison.comparisonTable) {
        parts.push(`| ${columns.map((c) => row[c]).join(' | ')} |`);
      }
      parts.push('');
    }
    parts.push('---');
    parts.push('');
  }

  // --- Verdict ---
  if (g.verdict && Array.isArray(g.verdict.picks) && g.verdict.picks.length) {
    parts.push(`## ${g.verdict.title || 'Our Top Picks'}`);
    parts.push('');
    for (const p of g.verdict.picks) {
      parts.push(`- **${p.category}:** ${p.pedal} — ${p.reason}`);
    }
    parts.push('');
    parts.push('---');
    parts.push('');
  }

  // --- FAQ (quality gate: >= 3 Q&A pairs) ---
  if (Array.isArray(g.faq) && g.faq.length) {
    parts.push('## FAQ');
    parts.push('');
    for (const item of g.faq) {
      parts.push(`**${item.question}**`);
      parts.push(item.answer);
      parts.push('');
    }
    parts.push('---');
    parts.push('');
  }

  // --- Conclusion ---
  if (g.conclusion) {
    parts.push(`## ${g.conclusion.title || 'Conclusion'}`);
    parts.push('');
    if (g.conclusion.content) {
      parts.push(g.conclusion.content);
      parts.push('');
    }
    parts.push('---');
    parts.push('');
  }

  // --- Related links (quality gate: >= 3 internal links per file) ---
  if (Array.isArray(g.relatedArticles) && g.relatedArticles.length) {
    parts.push('## Related Guides');
    parts.push('');
    for (const slug of g.relatedArticles) {
      const label = (GENRE_GEAR_GUIDES[slug] && GENRE_GEAR_GUIDES[slug].title) || humanize(slug);
      parts.push(`- [${label}](${BASE}/guides/${slug})`);
    }
    parts.push('');
  }

  if (Array.isArray(g.relatedDrummers) && g.relatedDrummers.length) {
    parts.push('## Related Drummers');
    parts.push('');
    for (const d of g.relatedDrummers) {
      const reason = d.reason ? ` — ${d.reason}` : '';
      parts.push(`- [${d.name}](${BASE}/drummer/${d.slug})${reason}`);
    }
    parts.push('');
  }

  parts.push('---');
  parts.push('');
  parts.push('**More LLM resources:** ');
  parts.push(`[Guides Hub](${BASE}/llms/guides.md) · [Site index](${BASE}/llms.txt) · [Full database](${BASE}/llms-full.txt)`);
  parts.push('');

  return parts.join('\n');
}

// --- Generate ---
const outDir = path.join(__dirname, '../public/llms/guides');
fs.mkdirSync(outDir, { recursive: true });

const allSlugs = Object.keys(GENRE_GEAR_GUIDES);
let written = 0;
let skipped = 0;
const shortFiles = [];
const thinFaq = [];

for (const slug of allSlugs) {
  const outPath = path.join(outDir, `${slug}.md`);
  if (fs.existsSync(outPath)) {
    skipped++;
    continue;
  }

  const g = GENRE_GEAR_GUIDES[slug];
  const md = buildMarkdown(g);
  fs.writeFileSync(outPath, md);
  written++;

  const wordCount = md.split(/\s+/).filter(Boolean).length;
  if (wordCount < 300) shortFiles.push(`${slug} (${wordCount} words)`);
  if (!Array.isArray(g.faq) || g.faq.length < 3) thinFaq.push(slug);
}

console.log(`✅ Generated ${written} new public/llms/guides/<slug>.md files (${skipped} already existed, left untouched)`);
if (shortFiles.length) {
  console.error(`WARNING: ${shortFiles.length} file(s) under 300 words: ${shortFiles.join(', ')}`);
  process.exit(1);
}
if (thinFaq.length) {
  console.error(`WARNING: ${thinFaq.length} guide(s) with fewer than 3 FAQ entries: ${thinFaq.join(', ')}`);
  process.exit(1);
}
