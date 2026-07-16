#!/usr/bin/env node
/**
 * Validate the technique links added by Issue #4768:
 *
 *   1. EXTREME_GENRE_TECHNIQUE_SLUGS (packages/frontend/App.js) — every slug
 *      referenced by an extreme-metal genre page's "Signature Techniques"
 *      block must resolve to a real technique in data/techniques.js.
 *   2. Every genre key in that map must resolve to a real genre in
 *      data/genres.js.
 *   3. Drummer-page "Techniques" chips are derived live from
 *      techniques.js `masters[].slug` (getTechniquesForDrummer) rather than
 *      hand-listed, so they can never reference a non-existent technique —
 *      this script re-derives that mapping and reports the count as a
 *      sanity check.
 *
 * Exit code 1 (and non-empty output) if any genre-page link targets a
 * technique slug that doesn't exist.
 */

const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '../packages/frontend/App.js');
const techniquesPath = path.join(__dirname, '../packages/frontend/data/techniques.js');
const genresPath = path.join(__dirname, '../packages/frontend/data/genres.js');

function extractTechniques() {
  const content = fs.readFileSync(techniquesPath, 'utf-8');
  const match = content.match(/export const techniques\s*=\s*(\{[\s\S]*?\n\});\s*$/m);
  if (!match) throw new Error('Could not extract techniques object');
  return eval('(' + match[1] + ')');
}

function extractGenres() {
  const content = fs.readFileSync(genresPath, 'utf-8');
  const match = content.match(/export const genres\s*=\s*(\{[\s\S]*?\n\});/);
  if (!match) throw new Error('Could not extract genres object');
  return eval('(' + match[1] + ')');
}

function extractExtremeGenreTechniqueSlugs() {
  const content = fs.readFileSync(appPath, 'utf-8');
  const match = content.match(/const EXTREME_GENRE_TECHNIQUE_SLUGS\s*=\s*(\{[\s\S]*?\n\});/);
  if (!match) throw new Error('Could not extract EXTREME_GENRE_TECHNIQUE_SLUGS from App.js');
  return eval('(' + match[1] + ')');
}

const techniques = extractTechniques();
const genres = extractGenres();
const genreTechniqueSlugs = extractExtremeGenreTechniqueSlugs();

const techniqueSlugs = new Set(Object.keys(techniques));
const genreSlugs = new Set(Object.keys(genres));

let checked = 0;
const brokenTechniqueLinks = [];
const brokenGenreKeys = [];

for (const [genreSlug, slugs] of Object.entries(genreTechniqueSlugs)) {
  if (!genreSlugs.has(genreSlug)) {
    brokenGenreKeys.push(genreSlug);
  }
  for (const slug of slugs) {
    checked++;
    if (!techniqueSlugs.has(slug)) {
      brokenTechniqueLinks.push({ genre: genreSlug, slug });
    }
  }
}

// Sanity check on the drummer-page side: re-derive the same
// masters[]-based mapping the UI uses (getTechniquesForDrummer) and confirm
// every technique it could possibly link to is a real slug (true by
// construction, since it comes straight from the techniques object).
let drummerChipLinks = 0;
for (const technique of Object.values(techniques)) {
  for (const master of technique.masters || []) {
    if (master.slug) drummerChipLinks++;
  }
}

console.log(`Genre-page signature-technique links: ${checked} across ${Object.keys(genreTechniqueSlugs).length} genres.`);
console.log(`Drummer-page technique chips (derived from masters[].slug, always valid by construction): ${drummerChipLinks} potential links across ${Object.keys(techniques).length} techniques.`);

if (brokenGenreKeys.length > 0) {
  console.log('\nEXTREME_GENRE_TECHNIQUE_SLUGS keys not found in data/genres.js:');
  for (const g of brokenGenreKeys) console.log(`  "${g}"`);
}

if (brokenTechniqueLinks.length > 0) {
  console.log('\nBroken technique slugs referenced by genre pages:');
  for (const issue of brokenTechniqueLinks) {
    console.log(`  [genre:${issue.genre}] -> technique slug "${issue.slug}" not found in techniques.js`);
  }
}

if (brokenGenreKeys.length > 0 || brokenTechniqueLinks.length > 0) {
  process.exit(1);
}

console.log('\nAll genre-page technique links resolve to real technique slugs. Zero broken /techniques/<slug> links.');
