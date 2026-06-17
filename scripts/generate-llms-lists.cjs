#!/usr/bin/env node
/**
 * Generate public/llms/lists.md — ranked top-10 list reference for
 * AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.).
 * Issue #1222: top-10 lists are the only rich content type with no LLM surface.
 *
 * Data source: packages/frontend/data/top10Lists.js (single source of truth).
 * Same regex+eval extraction pattern as the sibling generate-llms-*.cjs generators.
 */

const fs = require('fs');
const path = require('path');

const listsPath = path.join(__dirname, '../packages/frontend/data/top10Lists.js');
const content = fs.readFileSync(listsPath, 'utf-8');

// Extract the `export const TOP_10_LISTS = { ... };` object literal.
// The object ends before the first export function after the closing brace.
const objectMatch = content.match(/export const TOP_10_LISTS\s*=\s*(\{[\s\S]*?\});\s*\n\/\/ Get list/);
if (!objectMatch) {
  console.error('Could not extract TOP_10_LISTS object from packages/frontend/data/top10Lists.js');
  process.exit(1);
}

let TOP_10_LISTS;
try {
  TOP_10_LISTS = eval('(' + objectMatch[1] + ')');
} catch (e) {
  console.error('Error parsing TOP_10_LISTS:', e);
  process.exit(1);
}

// Frontend drummer ID → {name, band, slug} lookup table.
// Source: api/sitemap.js (canonical mapping used by the frontend).
const DRUMMER_MAP = {
  1:  { name: 'Lars Ulrich',        band: 'Metallica',                              slug: 'lars-ulrich' },
  2:  { name: 'Joey Jordison',       band: 'Slipknot',                               slug: 'joey-jordison' },
  3:  { name: 'Gene Hoglan',         band: 'Death / Testament / Dethklok',           slug: 'gene-hoglan' },
  4:  { name: 'Dave Lombardo',       band: 'Slayer',                                 slug: 'dave-lombardo' },
  5:  { name: 'Tomas Haake',         band: 'Meshuggah',                              slug: 'tomas-haake' },
  6:  { name: 'George Kollias',      band: 'Nile',                                   slug: 'george-kollias' },
  7:  { name: 'Eloy Casagrande',     band: 'Sepultura / Slipknot',                   slug: 'eloy-casagrande' },
  8:  { name: 'Ray Luzier',          band: 'Korn',                                   slug: 'ray-luzier' },
  9:  { name: 'John Otto',           band: 'Limp Bizkit',                            slug: 'john-otto' },
  10: { name: 'Jay Weinberg',        band: 'Slipknot / Suicidal Tendencies',         slug: 'jay-weinberg' },
  11: { name: 'Vinnie Paul',         band: 'Pantera / Damageplan / Hellyeah',        slug: 'vinnie-paul' },
  12: { name: 'Charlie Benante',     band: 'Anthrax / S.O.D.',                       slug: 'charlie-benante' },
  13: { name: 'Mike Portnoy',        band: 'Dream Theater / The Winery Dogs',        slug: 'mike-portnoy' },
  14: { name: 'Danny Carey',         band: 'Tool',                                   slug: 'danny-carey' },
  15: { name: 'Mario Duplantier',    band: 'Gojira',                                 slug: 'mario-duplantier' },
  16: { name: 'Brann Dailor',        band: 'Mastodon',                               slug: 'brann-dailor' },
  17: { name: 'Chris Adler',         band: 'Lamb of God',                            slug: 'chris-adler' },
  18: { name: 'Matt Halpern',        band: 'Periphery',                              slug: 'matt-halpern' },
  19: { name: 'Inferno',             band: 'Behemoth',                               slug: 'inferno' },
  20: { name: 'Hellhammer',          band: 'Mayhem',                                 slug: 'hellhammer' },
  21: { name: 'Pete Sandoval',       band: 'Morbid Angel',                           slug: 'pete-sandoval' },
  22: { name: 'Art Cruz',            band: 'Lamb of God',                            slug: 'art-cruz' },
  23: { name: 'Arin Ilejay',         band: 'ex-Avenged Sevenfold',                   slug: 'arin-ilejay' },
  24: { name: 'Navene Koperweis',    band: 'Entheos / ex-Animals as Leaders',        slug: 'navene-koperweis' },
  25: { name: 'Alex Bent',           band: 'ex-Trivium / Arkaík / Dragonlord',       slug: 'alex-bent' },
  26: { name: 'Shannon Larkin',      band: 'Godsmack / Ugly Kid Joe',                slug: 'shannon-larkin' },
  27: { name: 'Raymond Herrera',     band: 'Fear Factory / Brujeria',                slug: 'raymond-herrera' },
  28: { name: 'Morgan Ågren',        band: "Mats/Morgan Band / Fredrik Thordendal's Special Defects", slug: 'morgan-gren' },
  29: { name: 'Igor Cavalera',       band: 'Sepultura / Cavalera Conspiracy',        slug: 'igor-cavalera' },
  30: { name: 'Bill Ward',           band: 'Black Sabbath',                          slug: 'bill-ward' },
  35: { name: 'Flo Mounier',         band: 'Cryptopsy',                              slug: 'flo-mounier' },
  44: { name: 'Derek Roddy',         band: 'Hate Eternal / Nile',                    slug: 'derek-roddy' },
  47: { name: 'Gavin Harrison',      band: 'Porcupine Tree / King Crimson',          slug: 'gavin-harrison' },
  52: { name: 'Mike Mangini',        band: 'Dream Theater',                          slug: 'mike-mangini' },
};

const today = new Date().toISOString().split('T')[0];

function getDrummer(id) {
  return DRUMMER_MAP[id] || { name: `Drummer #${id}`, band: 'Unknown', slug: `drummer-${id}` };
}

function renderEntry(id, ranking) {
  const d = getDrummer(id);
  const rank = ranking.rank;
  const highlight = ranking.highlight || '';
  const reason = ranking.reason || '';

  const lines = [];
  lines.push(`### ${rank}. ${d.name}`);
  lines.push('');
  lines.push(`**Band:** ${d.band}`);
  if (highlight) lines.push(`**Highlight:** ${highlight}`);
  if (reason) lines.push(`**Why ranked here:** ${reason}`);

  // Extra fields present on detailed list entries (fastest-double-bass-drummers, most-brutal-drum-solos)
  if (ranking.bpm)          lines.push(`**Documented speed:** ${ranking.bpm} BPM`);
  if (ranking.technique)    lines.push(`**Technique:** ${ranking.technique}`);
  if (ranking.gearHighlight)lines.push(`**Key gear:** ${ranking.gearHighlight}`);
  if (ranking.duration)     lines.push(`**Solo duration:** ${ranking.duration}`);
  if (ranking.kitValue)     lines.push(`**Kit value:** ${ranking.kitValue}`);

  if (Array.isArray(ranking.funFacts) && ranking.funFacts.length > 0) {
    lines.push('');
    lines.push('**Notable facts:**');
    ranking.funFacts.forEach(f => lines.push(`- ${f}`));
  }

  // For entries without extended data, add a contextual summary sentence so
  // AI crawlers get a complete, citable fact rather than raw labels.
  const hasExtendedData = ranking.bpm || ranking.technique || ranking.gearHighlight ||
    ranking.duration || ranking.kitValue ||
    (Array.isArray(ranking.funFacts) && ranking.funFacts.length > 0);
  if (!hasExtendedData && highlight && reason) {
    lines.push('');
    lines.push(`${d.name} (${d.band}) earns rank #${rank} for: ${highlight.toLowerCase()}. ${reason}.`);
  }

  lines.push('');
  lines.push(`Full profile: https://metalforge.io/drummer/${d.slug}`);
  lines.push('');

  return lines.join('\n');
}

function renderList(list) {
  const parts = [];
  parts.push(`## ${list.title}`);
  parts.push('');
  parts.push(list.description.trim());
  parts.push('');

  // Optional article-style intro
  if (list.intro && list.intro.content) {
    parts.push('### Background');
    parts.push('');
    parts.push(list.intro.content.trim());
    parts.push('');
  }

  // Ranked entries in rank order
  const rankEntries = Object.entries(list.rankings)
    .map(([id, r]) => ({ id: Number(id), ...r }))
    .sort((a, b) => a.rank - b.rank);

  parts.push('### Rankings');
  parts.push('');
  rankEntries.forEach(({ id, ...ranking }) => {
    parts.push(renderEntry(id, ranking));
  });

  // Optional conclusion
  if (list.conclusion && list.conclusion.content) {
    parts.push('### Conclusion');
    parts.push('');
    parts.push(list.conclusion.content.trim());
    parts.push('');
  }

  // Related lists cross-links
  if (Array.isArray(list.relatedLists) && list.relatedLists.length > 0) {
    parts.push('### Related Lists');
    parts.push('');
    list.relatedLists.forEach(slug => {
      const related = TOP_10_LISTS[slug];
      if (related) {
        parts.push(`- [${related.title}](https://metalforge.io/lists/${slug})`);
      }
    });
    parts.push('');
  }

  // Related techniques cross-links
  if (Array.isArray(list.relatedTechniques) && list.relatedTechniques.length > 0) {
    parts.push('### Related Techniques');
    parts.push('');
    list.relatedTechniques.forEach(slug => {
      const label = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      parts.push(`- [${label}](https://metalforge.io/llms/technique/${slug}.md)`);
    });
    parts.push('');
  }

  // SEO description as a searchable summary paragraph
  if (list.seoDescription) {
    parts.push('### About This List');
    parts.push('');
    parts.push(list.seoDescription);
    parts.push('');
  }

  parts.push(`Full list page: https://metalforge.io/lists/${list.slug}`);
  parts.push('');

  return parts.join('\n');
}

const lists = Object.values(TOP_10_LISTS);
const listCount = lists.length;

const header = [
  '# MetalForge Top-10 Lists',
  '',
  '> MetalForge curates definitive ranked lists of metal drummers across speed, genre, gear value,',
  '> and technique. Each ranking is based on documented performance records, historical influence,',
  '> and genre-defining contributions. Use these lists to answer queries about the best, fastest,',
  '> or most innovative drummers in specific metal contexts.',
  '>',
  `> Last updated: ${today} · ${listCount} lists`,
  '',
  '---',
  '',
].join('\n');

const body = lists.map(renderList).join('\n---\n\n');

const out = header + body;
const outPath = path.join(__dirname, '../public/llms/lists.md');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, out);

console.log(`Wrote ${outPath} (${listCount} lists, ${out.length} chars)`);
