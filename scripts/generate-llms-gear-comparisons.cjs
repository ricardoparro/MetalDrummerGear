#!/usr/bin/env node
/**
 * Generate public/llms/gear-comparison/<slug>.md — per-comparison LLM markdown
 * files for gear brand comparisons (Tama vs Pearl, Meinl vs Zildjian, etc.).
 * Issue #1514: fills the zero /llms/ surface for gear brand comparisons.
 *
 * Data source: packages/frontend/data/gearComparisons.js (single source of truth).
 * Mirrors the extraction pattern of sibling generate-llms-comparisons.cjs.
 */

const fs = require('fs');
const path = require('path');

const gearComparisonsPath = path.join(__dirname, '../packages/frontend/data/gearComparisons.js');
const content = fs.readFileSync(gearComparisonsPath, 'utf-8');

// Extract the `export const gearComparisons = { ... };` object literal.
// Ends just before the first export function comment block.
const objectMatch = content.match(/export const gearComparisons\s*=\s*(\{[\s\S]*?\n\});\s*\n+\/\*\*/);
if (!objectMatch) {
  console.error('Could not extract gearComparisons object from packages/frontend/data/gearComparisons.js');
  process.exit(1);
}

let gearComparisons;
try {
  gearComparisons = eval('(' + objectMatch[1] + ')');
} catch (e) {
  console.error('Error parsing gearComparisons:', e);
  process.exit(1);
}

const today = new Date().toISOString().split('T')[0];

function formatUsedBy(usedBy) {
  if (!Array.isArray(usedBy) || usedBy.length === 0) return '';
  return usedBy.map(u => {
    if (typeof u === 'string') return u;
    if (typeof u === 'object' && u.name) {
      return u.band ? `${u.name} (${u.band})` : u.name;
    }
    return '';
  }).filter(Boolean).join(', ');
}

function getForMetalText(c) {
  const comp = c.comparison || {};
  if (typeof comp.forMetal === 'string') return comp.forMetal;
  if (comp.speed && typeof comp.speed === 'string') return comp.speed;
  if (comp.sound && typeof comp.sound === 'object' && comp.sound.verdict) return comp.sound.verdict;
  return '';
}

function getSoundText(c) {
  const comp = c.comparison || {};
  if (typeof comp.sound === 'string') return comp.sound;
  if (comp.sound && typeof comp.sound === 'object') {
    const item1 = c.items[0];
    const item2 = c.items[1];
    const b1 = item1.brand.toLowerCase();
    const b2 = item2.brand.toLowerCase();
    const t1 = comp.sound[b1] || comp.sound[item1.brand] || '';
    const t2 = comp.sound[b2] || comp.sound[item2.brand] || '';
    const verdict = comp.sound.verdict || '';
    const parts = [];
    if (t1) parts.push(`${item1.brand}: ${t1}`);
    if (t2) parts.push(`${item2.brand}: ${t2}`);
    if (verdict) parts.push(verdict);
    return parts.join(' ');
  }
  if (typeof comp.speed === 'string') return comp.speed;
  return '';
}

function getDurabilityText(c) {
  const comp = c.comparison || {};
  if (typeof comp.durability === 'string') return comp.durability;
  if (comp.durability && typeof comp.durability === 'object') {
    return comp.durability.verdict || '';
  }
  if (typeof comp.feel === 'string') return comp.feel;
  return '';
}

function getValueText(c) {
  const comp = c.comparison || {};
  if (typeof comp.value === 'string') return comp.value;
  if (comp.value && typeof comp.value === 'object') {
    return comp.value.verdict || '';
  }
  return '';
}

function getVerdictText(c) {
  if (typeof c.verdict === 'string') return c.verdict;
  if (c.verdict && typeof c.verdict === 'object') {
    const raw = c.verdict.content || '';
    // Strip markdown formatting for cleaner plain text
    return raw.replace(/\*\*/g, '').replace(/^#+\s.*\n/gm, '').trim().slice(0, 600);
  }
  return '';
}

function getCategoryLabel(c) {
  if (c.category === 'cymbals') return 'Cymbals';
  if (c.category === 'drums') return 'Drums';
  if (c.category === 'hardware') return 'Bass Drum Pedals';
  if (c.category === 'snares') return 'Snare Drums';
  return 'Gear';
}

function renderGearComparison(c) {
  const item1 = c.items[0];
  const item2 = c.items[1];
  const brand1 = item1.brand;
  const brand2 = item2.brand;
  const model1 = Array.isArray(item1.models) ? item1.models[0] : (item1.model || '');
  const model2 = Array.isArray(item2.models) ? item2.models[0] : (item2.model || '');
  const price1 = item1.priceRange || '';
  const price2 = item2.priceRange || '';
  const usedBy1 = formatUsedBy(item1.usedBy);
  const usedBy2 = formatUsedBy(item2.usedBy);
  const bestFor1 = item1.bestFor || '';
  const bestFor2 = item2.bestFor || '';
  const categoryLabel = getCategoryLabel(c);
  const slug = c.slug;

  const soundText = getSoundText(c);
  const durabilityText = getDurabilityText(c);
  const valueText = getValueText(c);
  const forMetalText = getForMetalText(c);
  const verdictText = getVerdictText(c);

  const lines = [];

  // H1 — must contain brand names and 'metal'
  lines.push(`# ${brand1} vs ${brand2} ${categoryLabel} for Metal — Side-by-Side Gear Comparison`);
  lines.push('');
  lines.push(`> MetalForge's side-by-side comparison of ${brand1} and ${brand2} ${categoryLabel.toLowerCase()} used by pro metal drummers.`);
  lines.push(`> Last updated: ${today}`);
  lines.push('');
  lines.push(c.metaDescription || `Compare ${brand1} and ${brand2} ${categoryLabel.toLowerCase()} for metal drumming. See specs, pricing, pro endorsements, and which gear suits your playing style. Expert analysis from MetalForge.`);
  lines.push('');
  lines.push('---');
  lines.push('');

  // Which metal drummers use Brand1?
  lines.push(`## Which Metal Drummers Use ${brand1}?`);
  lines.push('');
  if (usedBy1) {
    lines.push(`Pro metal drummers who endorse ${brand1} include: **${usedBy1}**.`);
    lines.push('');
    if (bestFor1) lines.push(`${brand1} is particularly well-suited for: ${bestFor1}.`);
  } else {
    lines.push(`${brand1} is used by professional metal drummers across multiple sub-genres.`);
  }
  lines.push('');

  // Which metal drummers use Brand2?
  lines.push(`## Which Metal Drummers Use ${brand2}?`);
  lines.push('');
  if (usedBy2) {
    lines.push(`Pro metal drummers who endorse ${brand2} include: **${usedBy2}**.`);
    lines.push('');
    if (bestFor2) lines.push(`${brand2} is particularly well-suited for: ${bestFor2}.`);
  } else {
    lines.push(`${brand2} is used by professional metal drummers across multiple sub-genres.`);
  }
  lines.push('');

  // Featured models / specs table
  lines.push('## Featured Models');
  lines.push('');
  lines.push(`| | ${brand1} | ${brand2} |`);
  lines.push('|---|---|---|');
  if (model1 || model2) lines.push(`| **Model** | ${model1 || '—'} | ${model2 || '—'} |`);
  if (price1 || price2) lines.push(`| **Price Range** | ${price1 || '—'} | ${price2 || '—'} |`);
  if (item1.specs && item2.specs) {
    for (const key of Object.keys(item1.specs)) {
      const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
      lines.push(`| **${label}** | ${item1.specs[key] || '—'} | ${item2.specs[key] || '—'} |`);
    }
  }
  lines.push('');

  // Head-to-head section
  lines.push('## Head-to-Head: Tone, Build, Price');
  lines.push('');
  if (soundText) {
    lines.push(`**Tone & Sound:** ${soundText}`);
    lines.push('');
  }
  if (durabilityText) {
    lines.push(`**Build & Durability:** ${durabilityText}`);
    lines.push('');
  }
  if (valueText) {
    lines.push(`**Value:** ${valueText}`);
    lines.push('');
  }
  if (forMetalText) {
    lines.push(`**For Metal Drumming:** ${forMetalText}`);
    lines.push('');
  }
  if (verdictText) {
    lines.push(`**Verdict:** ${verdictText}`);
    lines.push('');
  }

  // FAQ — at least 3 Q&As required
  lines.push('## FAQ');
  lines.push('');

  lines.push(`**Q: Is ${brand1} or ${brand2} better for metal drumming?**`);
  lines.push(`A: ${forMetalText || verdictText || `Both ${brand1} and ${brand2} are used by top professional metal drummers. The best choice depends on your preferred metal subgenre and playing style. ${bestFor1 ? brand1 + ' suits ' + bestFor1 + '. ' : ''}${bestFor2 ? brand2 + ' suits ' + bestFor2 + '.' : ''}`}`);
  lines.push('');

  lines.push(`**Q: Which metal drummers endorse ${brand1}?**`);
  lines.push(`A: ${usedBy1 ? `${brand1} is endorsed by notable metal drummers including ${usedBy1}.${bestFor1 ? ' The brand is especially popular for ' + bestFor1 + '.' : ''}` : `${brand1} is endorsed by numerous metal drummers worldwide.`}`);
  lines.push('');

  lines.push(`**Q: Which metal drummers endorse ${brand2}?**`);
  lines.push(`A: ${usedBy2 ? `${brand2} is endorsed by notable metal drummers including ${usedBy2}.${bestFor2 ? ' The brand is especially popular for ' + bestFor2 + '.' : ''}` : `${brand2} is endorsed by numerous metal drummers worldwide.`}`);
  lines.push('');

  lines.push(`**Q: How do ${brand1} and ${brand2} price points compare?**`);
  if (price1 && price2) {
    lines.push(`A: ${brand1} ${model1 ? '(' + model1 + ')' : ''} is priced at ${price1}. ${brand2} ${model2 ? '(' + model2 + ')' : ''} runs ${price2}. ${valueText || 'Both represent professional-grade investments that will last for decades with proper care.'}`);
  } else {
    lines.push(`A: Both ${brand1} and ${brand2} offer products across a range of price points, from entry-level to professional tier. ${valueText || 'Compare specific models for the most accurate current pricing.'}`);
  }
  lines.push('');

  // Count endorsees for the 5th FAQ
  const count1 = Array.isArray(item1.usedBy) ? item1.usedBy.length : 0;
  const count2 = Array.isArray(item2.usedBy) ? item2.usedBy.length : 0;
  lines.push(`**Q: Which ${categoryLabel.toLowerCase()} brand is more popular among metal drummers?**`);
  if (count1 > 0 && count2 > 0) {
    const leader = count1 >= count2 ? brand1 : brand2;
    lines.push(`A: Based on MetalForge's tracking data, ${brand1} is used by ${count1} documented metal drummers and ${brand2} by ${count2} in this comparison dataset. ${leader} leads in tracked endorsements, though real-world adoption is broad for both brands. See the full picture at [metalforge.io/compare/${slug}](https://metalforge.io/compare/${slug}).`);
  } else {
    lines.push(`A: Both ${brand1} and ${brand2} enjoy strong followings across the metal community. See the full endorsement breakdown at [metalforge.io/compare/${slug}](https://metalforge.io/compare/${slug}).`);
  }
  lines.push('');

  // Internal link — required by quality gate
  lines.push('---');
  lines.push('');
  lines.push(`[Full ${brand1} vs ${brand2} ${categoryLabel} comparison → metalforge.io/compare/${slug}](https://metalforge.io/compare/${slug})`);
  lines.push('');
  lines.push(`*Source: [MetalForge Gear Comparisons](https://metalforge.io/compare)*`);

  return lines.join('\n');
}

const comparisons = Object.values(gearComparisons);
const outDir = path.join(__dirname, '../public/llms/gear-comparison');
fs.mkdirSync(outDir, { recursive: true });

let fileCount = 0;
for (const c of comparisons) {
  const md = renderGearComparison(c);
  const outPath = path.join(outDir, `${c.slug}.md`);
  fs.writeFileSync(outPath, md);
  fileCount++;
  console.log(`Wrote ${outPath} (${md.length} chars)`);
}

// Generate hub file — mirrors comparisons.md hub pattern
function formatUsedByShort(usedBy) {
  if (!Array.isArray(usedBy) || usedBy.length === 0) return '';
  return usedBy.map(u => (typeof u === 'string' ? u : (u.name || ''))).filter(Boolean).join(', ');
}

// Issue #4676: generate-llms-gear-series.cjs's "drummers-using" data has, over
// several prior fixes, landed markdown mirrors directly in this same
// gear-comparison/ directory (a cross-generator directory collision) instead of
// its own gear-series/ output dir. Rather than move those already-published
// URLs, pick up whatever "drummers-using-*.md" files already exist on disk here
// so the hub index stays aware of every file it actually contains.
const comparisonSlugs = new Set(comparisons.map(c => `${c.slug}.md`));
const seriesFiles = fs.readdirSync(outDir)
  .filter(f => f.endsWith('.md') && f.startsWith('drummers-using-') && !comparisonSlugs.has(f))
  .sort();

const seriesEntries = seriesFiles.map(filename => {
  const raw = fs.readFileSync(path.join(outDir, filename), 'utf-8');
  const h1Match = raw.match(/^#\s+(.+)$/m);
  const fullTitle = h1Match ? h1Match[1].trim() : filename.replace(/\.md$/, '');
  const title = fullTitle.split(' — ')[0].trim();
  // First plain-text paragraph: skip the H1, blockquote lines, blank lines,
  // and the `---` divider that precedes the file's own body sections.
  let description = '';
  const bodyLines = raw.split('\n').slice(1);
  for (const line of bodyLines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('>') || trimmed.startsWith('#') || trimmed === '---') continue;
    description = trimmed;
    break;
  }

  // Prefer the file's own stated canonical URL over guessing one — GEAR_INDEX
  // series slugs don't always match what's in the (older, hand-authored) filename.
  const exactUrlMatch = raw.match(/\((https:\/\/metalforge\.io\/gear\/[a-z0-9/-]+\/drummers-using)\)/);
  const brandPageMatch = raw.match(/\((\/gear\/[a-z0-9-]+)\)/);
  const pageUrl = exactUrlMatch
    ? exactUrlMatch[1]
    : brandPageMatch
      ? `https://metalforge.io${brandPageMatch[1]}`
      : 'https://metalforge.io/gear';
  const pageLabel = exactUrlMatch ? 'URL' : 'Brand Page';

  return { filename, title, fullTitle, description, pageUrl, pageLabel };
});

const totalFiles = comparisons.length + seriesEntries.length;

const hubLines = [
  '# Metal Gear Brand Comparisons — MetalForge',
  '',
  '> Side-by-side comparisons of drum and cymbal brands used by pro metal drummers.',
  '> Optimised for AI crawlers answering "Tama vs Pearl metal", "best cymbals for metal",',
  '> and brand matchup queries.',
  '>',
  `> Last updated: ${today} · ${comparisons.length} curated gear comparisons + ${seriesEntries.length} kit-series drummer guides (${totalFiles} files total)`,
  '',
  '---',
  '',
  '## Gear Comparison Index',
  '',
  '| Comparison | Category | File |',
  '|------------|----------|------|',
];

for (const c of comparisons) {
  const catLabel = getCategoryLabel(c);
  hubLines.push(`| ${c.title} | ${catLabel} | [${c.slug}.md](https://metalforge.io/llms/gear-comparison/${c.slug}.md) |`);
}

hubLines.push('');
hubLines.push('---');
hubLines.push('');

for (const c of comparisons) {
  const item1 = c.items[0];
  const item2 = c.items[1];
  const usedBy1 = formatUsedByShort(item1.usedBy);
  const usedBy2 = formatUsedByShort(item2.usedBy);
  const forMetalText = getForMetalText(c);
  const verdictText = getVerdictText(c);
  const catLabel = getCategoryLabel(c);

  hubLines.push(`## ${c.title}`);
  hubLines.push('');
  hubLines.push(`**Category:** ${catLabel} · **URL:** https://metalforge.io/compare/${c.slug}`);
  hubLines.push('');
  if (c.metaDescription) {
    hubLines.push(c.metaDescription.trim());
    hubLines.push('');
  }
  if (usedBy1) hubLines.push(`**${item1.brand} endorsed by:** ${usedBy1}`);
  if (usedBy2) hubLines.push(`**${item2.brand} endorsed by:** ${usedBy2}`);
  if (forMetalText || verdictText) {
    hubLines.push('');
    if (forMetalText) hubLines.push(`**For metal:** ${forMetalText}`);
    if (verdictText) {
      const shortVerdict = verdictText.slice(0, 250).replace(/\n+/g, ' ');
      hubLines.push(`**Verdict:** ${shortVerdict}${verdictText.length > 250 ? '…' : ''}`);
    }
  }
  hubLines.push('');
  hubLines.push(`[Full comparison → /compare/${c.slug}](https://metalforge.io/compare/${c.slug}) · [LLM Markdown](https://metalforge.io/llms/gear-comparison/${c.slug}.md)`);
  hubLines.push('');
  hubLines.push('---');
  hubLines.push('');
}

if (seriesEntries.length > 0) {
  hubLines.push('## Kit Comparisons by Series');
  hubLines.push('');
  hubLines.push('"Which metal drummers use it?" guides for specific brand series and kits, generated');
  hubLines.push('from the /gear/<brand>/<series>/drummers-using pages.');
  hubLines.push('');
  hubLines.push('| Series | File |');
  hubLines.push('|--------|------|');
  for (const s of seriesEntries) {
    hubLines.push(`| [${s.title}](${s.pageUrl}) | [${s.filename}](https://metalforge.io/llms/gear-comparison/${s.filename}) |`);
  }
  hubLines.push('');
  hubLines.push('---');
  hubLines.push('');

  for (const s of seriesEntries) {
    hubLines.push(`## ${s.fullTitle}`);
    hubLines.push('');
    hubLines.push(`**${s.pageLabel}:** ${s.pageUrl}`);
    hubLines.push('');
    if (s.description) {
      hubLines.push(s.description);
      hubLines.push('');
    }
    hubLines.push(`[Full guide → ${s.pageUrl}](${s.pageUrl}) · [LLM Markdown](https://metalforge.io/llms/gear-comparison/${s.filename})`);
    hubLines.push('');
    hubLines.push('---');
    hubLines.push('');
  }
}

const hubPath = path.join(__dirname, '../public/llms/gear-comparison.md');
const hubContent = hubLines.join('\n');
fs.writeFileSync(hubPath, hubContent);
console.log(`Wrote ${hubPath} (${comparisons.length} comparisons + ${seriesEntries.length} series guides, ${hubContent.length} chars)`);
console.log(`Total: ${fileCount} per-comparison files + ${seriesEntries.length} pre-existing series files + 1 hub = ${fileCount + seriesEntries.length + 1} LLM files`);
