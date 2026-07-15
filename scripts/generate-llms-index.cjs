#!/usr/bin/env node
/**
 * Generate public/llms/index.md - Master index for LLM crawlers
 * Issue #451 - Create markdown API endpoints
 */

const fs = require('fs');
const path = require('path');

// Read the drummers index.js file and extract the array
const drummersPath = path.join(__dirname, '../api/drummers/index.js');
const drummersContent = fs.readFileSync(drummersPath, 'utf-8');

// Extract the drummers array using regex
const arrayMatch = drummersContent.match(/const drummers = (\[[\s\S]*?\]);[\s\S]*?export default function handler/);
if (!arrayMatch) {
  console.error('Could not extract drummers array');
  process.exit(1);
}

// Parse drummers
let drummers;
try {
  drummers = eval(arrayMatch[1]);
} catch (e) {
  console.error('Error parsing drummers:', e);
  process.exit(1);
}

// Load articles (ALBUM_ARTICLES) for the /llms/articles/<slug>.md index section (#1058).
// ALBUM_ARTICLES is composed from per-drummer ESM modules under
// packages/frontend/data/albumArticles/ (see index.js) — require() it directly
// rather than regex-scraping a literal object, since the barrel file
// (albumArticles.js) only re-exports it and no longer contains that literal.
const articlesIndexPath = path.join(__dirname, '../packages/frontend/data/albumArticles/index.js');
let articles = {};
try {
  ({ ALBUM_ARTICLES: articles } = require(articlesIndexPath));
} catch (e) {
  console.warn('Could not load ALBUM_ARTICLES, continuing without Articles section:', e.message);
}

// Load drummer comparison slugs for the /llms/vs/ per-pair summary (#4298)
const comparisonsPath = path.join(__dirname, '../packages/frontend/data/drummerComparisons.js');
let comparisonCount = 0;
try {
  const comparisonsContent = fs.readFileSync(comparisonsPath, 'utf-8');
  const objMatch = comparisonsContent.match(/export const drummerComparisons = (\{[\s\S]*?\n\});/);
  if (objMatch) {
    const comparisons = eval(`(function() { return ${objMatch[1]}; })()`);
    comparisonCount = Object.keys(comparisons).length;
  } else {
    console.warn('Could not extract drummerComparisons — Comparisons section will show 0 pairs.');
  }
} catch (e) {
  console.warn('Could not parse drummerComparisons, continuing without an accurate count:', e.message);
}

// Load how-to-sound-like guide count for the guides table rows + "Style Guides"
// section header in the committed index.md (#4519). Those three mentions are
// hand-maintained (this generator doesn't yet own that section of the output),
// so the count below is the source of truth to keep them in sync with — it
// isn't interpolated into `output` here, the same way #4298's comparisonCount
// backs hand-verified text until the surrounding section is fully generator-owned.
//
// Counted from the live public/llms/guides/how-to-sound-like-*.md files rather
// than packages/frontend/data/soundLikeGuides.js: that data source currently has
// entries with no corresponding generated file yet, so it overcounts vs. what's
// actually citable at /llms/guides/.
const guidesDir = path.join(__dirname, '../public/llms/guides');
let guideCount = 0;
try {
  guideCount = fs.readdirSync(guidesDir).filter((f) => f.startsWith('how-to-sound-like-') && f.endsWith('.md')).length;
} catch (e) {
  console.warn('Could not read public/llms/guides/, continuing without an accurate guide count:', e.message);
}

const today = new Date().toISOString().split('T')[0];

function generateSlug(name) {
  return name.toLowerCase()
    .replace(/[åä]/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u')
    .replace(/é|è|ê|ë/g, 'e').replace(/í|ì|î|ï/g, 'i').replace(/ó|ò|ô/g, 'o')
    .replace(/ú|ù|û/g, 'u').replace(/ñ/g, 'n').replace(/ß/g, 'ss')
    .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

let output = `# MetalForge - LLM Content Index

> Last Updated: ${today}  
> Source: https://metalforge.io

## About MetalForge

MetalForge is a comprehensive database of professional metal drummers and their gear setups. 
This index provides machine-readable links to all content optimized for LLM consumption.

---

## LLM Resources

| Resource | URL | Description |
|----------|-----|-------------|
| Main Site | https://metalforge.io | Interactive web application |
| llms.txt | https://metalforge.io/llms.txt | Site overview for LLMs |
| llms-full.txt | https://metalforge.io/llms-full.txt | Complete database dump |
| Sitemap | https://metalforge.io/sitemap.xml | XML sitemap |
| API - Drummers | https://metalforge.io/api/drummers | JSON API endpoint |
| API - Quotes | https://metalforge.io/api/quotes | Drummer quotes JSON |
| Bands | https://metalforge.io/llms/bands.md | Band & drummer-history reference (Markdown) |

---

## Drummer Profiles (${drummers.length} total)

| Drummer | Band | Genre | Profile | Markdown API |
|---------|------|-------|---------|--------------|
`;

// Generate table rows for actual drummers
for (const d of drummers) {
  const slug = generateSlug(d.name);
  output += `| ${d.name} | ${d.band} | ${d.genre} | [Profile](https://metalforge.io/drummer/${slug}) | [Markdown](https://metalforge.io/api/drummer/${slug}/markdown) |\n`;
}

// Articles — clean Markdown breakdowns of every album/kit article (#1058).
// ALBUM_ARTICLES only covers album drum-setup articles; other generators (licks,
// gear-evolution, signature-gear-guide) write their own *.md files into the same
// shared public/llms/articles/ directory with no ALBUM_ARTICLES entry at all, so
// they'd otherwise be invisible to this table despite being live and crawlable
// (they all have sitemap.js entries already). Merge those orphans in by slug (#4657).
const articleList = Object.values(articles).filter((a) => a && a.slug);
const knownSlugs = new Set(articleList.map((a) => a.slug));
const articlesDir = path.join(__dirname, '../public/llms/articles');
try {
  const orphanFiles = fs.readdirSync(articlesDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.slice(0, -3))
    .filter((slug) => !knownSlugs.has(slug))
    .sort();
  for (const slug of orphanFiles) {
    const content = fs.readFileSync(path.join(articlesDir, `${slug}.md`), 'utf-8');
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch
      ? titleMatch[1].trim()
      : slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const drummerMatch = content.match(/\*\*Drummer\(s\):\*\*\s*(.+)$/m);
    const drummer = drummerMatch
      ? Array.from(drummerMatch[1].matchAll(/\[([^\]]+)\]/g)).map((m) => m[1]).join(', ') || '—'
      : '—';
    articleList.push({ slug, title, drummer });
  }
} catch (e) {
  console.warn('Could not scan public/llms/articles/ for orphan article files:', e.message);
}
if (articleList.length > 0) {
  output += `
---

## Articles (${articleList.length} total)

Clean Markdown gear breakdowns for every album drum-setup and "what's in <drummer>'s kit" article, ingestible in one request.

| Article | Drummer | Markdown |
|---------|---------|----------|
`;
  for (const a of articleList) {
    output += `| ${a.title || a.slug} | ${a.drummer || '—'} | [Markdown](https://metalforge.io/llms/articles/${a.slug}.md) |\n`;
  }
}

// Drum Kit Comparisons (per-pair) — summary derived from drummerComparisons.js, not hand-listed (#4298)
if (comparisonCount > 0) {
  output += `
---

## Drum Kit Comparisons (per-pair)

Per-pair deep-dive files (400–600 words each) with exact gear data for both drummers. Optimised for
AI retrieval on queries like "Joey Jordison vs Lars Ulrich gear", "what drums does Hellhammer use vs Inferno?",
or "Compare Danny Carey's kit to Tomas Haake's."

Hub: [/llms/comparisons.md](https://metalforge.io/llms/comparisons.md) — aggregate overview of all ${comparisonCount} pairs.

${comparisonCount} individual per-pair comparison files live under [/llms/vs/](https://metalforge.io/llms/vs/), one per drummer
pairing, e.g. [lars-ulrich-vs-dave-lombardo.md](https://metalforge.io/llms/vs/lars-ulrich-vs-dave-lombardo.md).
Each file name follows the \`<drummer-a>-vs-<drummer-b>.md\` pattern for the two drummers being compared.
`;
}

output += `
---

## Content Categories

### By Genre
- **Thrash Metal:** Lars Ulrich (Metallica), Dave Lombardo (Slayer), Charlie Benante (Anthrax)
- **Death Metal:** Gene Hoglan (Death/Testament), George Kollias (Nile), Pete Sandoval (Morbid Angel)
- **Black Metal:** Hellhammer (Mayhem), Inferno (Behemoth)
- **Progressive Metal:** Mike Portnoy (Dream Theater), Danny Carey (Tool), Brann Dailor (Mastodon)
- **Nu-Metal:** Joey Jordison (Slipknot), Jay Weinberg (Slipknot), Ray Luzier (Korn)
- **Groove Metal:** Vinnie Paul (Pantera), Chris Adler (Lamb of God)
- **Djent:** Tomas Haake (Meshuggah), Matt Halpern (Periphery)

### Featured Collections
- [Fastest Metal Drummers](https://metalforge.io/lists/fastest-drummers)
- [Most Innovative Drummers](https://metalforge.io/lists/most-innovative-drummers)
- [Death Metal Drummers](https://metalforge.io/lists/death-metal-drummers)
- [Quick Facts](https://metalforge.io/facts)

---

## API Usage

### Get All Drummers
\`\`\`
GET https://metalforge.io/api/drummers
Accept: application/json
\`\`\`

### Get Specific Drummer
\`\`\`
GET https://metalforge.io/api/drummers/{id}
Accept: application/json
\`\`\`

### Get Drummer as Markdown
\`\`\`
GET https://metalforge.io/api/drummer/{slug}/markdown
Accept: text/markdown
\`\`\`

---

## Structured Data

All pages include Schema.org structured data:
- \`Person\` schema for drummer profiles
- \`FAQPage\` for common gear questions
- \`VideoObject\` for embedded performances
- \`Quotation\` for drummer quotes
- \`MusicGroup\` for band information

---

## Contact & Updates

- Website: https://metalforge.io
- Twitter: [@MetalDrumGear](https://twitter.com/MetalDrumGear)

For data corrections or additions, please visit the website.

---

*This index is auto-generated and updated regularly.*
`;

// Write the output
const outputPath = path.join(__dirname, '../public/llms/index.md');
fs.writeFileSync(outputPath, output);
console.log(`✅ Generated llms/index.md with ${drummers.length} drummers (${guideCount} how-to-sound-like guides)`);
