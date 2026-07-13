// CI guard (#4276): catches the "hardcoded drummer-slug array silently drifts
// from the canonical roster" bug class. Three independent occurrences of this
// exact bug were found in a single audit pass (#4273, #4274, #4275), on top of
// earlier ones (#4201, #4214, #1781): a list in api/sitemap.js is supposed to
// mirror every drummer in the roster, but nothing keeps it in sync when the
// roster grows or new per-drummer content ships, so it silently under-counts
// and real pages sit invisible to crawl discovery until someone manually
// grep-diffs it.
//
// This is not a full JS parser — it's a pragmatic heuristic that matches the
// shape of the actual bug: find bracket-matched array literals in the raw
// source, keep the ones that are pure lists of quoted kebab-case strings (not
// objects — those are structurally curated, e.g. top20GearComparisons), and of
// those, keep only the ones where every entry is itself a canonical drummer
// slug (not a compound "x-vs-y" pairing, gear slug, brand slug, etc. — those
// are curated-by-design and can legitimately be a subset). Any surviving array
// must have exactly as many entries as the canonical roster, or it has drifted.
//
// The canonical roster is read from the sitemap's own output (the real
// /drummer/<slug> entries, generated straight from the `drummers` array), not
// re-derived here, so this check can never itself drift from what the site
// actually ships.

import fs from 'node:fs';
import path from 'node:path';

const REPO_ROOT = path.resolve(import.meta.dirname, '..');
const SITEMAP_PATH = path.join(REPO_ROOT, 'api/sitemap.js');

const { buildSitemapXml } = await import(`file://${SITEMAP_PATH}`);
const xml = buildSitemapXml();

const drummerSlugs = new Set(
  [...xml.matchAll(/<loc>https:\/\/metalforge\.io\/drummer\/([a-z0-9-]+)<\/loc>/g)].map(m => m[1])
);
const canonicalCount = drummerSlugs.size;
if (canonicalCount === 0) {
  console.error('✗ check-sitemap-drift: could not extract the canonical drummer roster from sitemap output — did the /drummer/<slug> URL shape change?');
  process.exit(1);
}

// Find every bracket-matched `[...]` region in the raw source.
function findArrayLiterals(src) {
  const arrays = [];
  for (let i = 0; i < src.length; i++) {
    if (src[i] !== '[') continue;
    let depth = 1;
    let j = i + 1;
    while (j < src.length && depth > 0) {
      if (src[j] === '[') depth++;
      else if (src[j] === ']') depth--;
      j++;
    }
    if (depth !== 0) break; // unbalanced — bail rather than mis-scan
    arrays.push({ index: i, body: src.slice(i + 1, j - 1) });
  }
  return arrays;
}

const src = fs.readFileSync(SITEMAP_PATH, 'utf-8');
const SLUG_ENTRY_RE = /'([a-z0-9]+(?:-[a-z0-9]+)*)'/g;

let failed = false;
let checked = 0;

for (const { index, body } of findArrayLiterals(src)) {
  // Object arrays (e.g. top20GearComparisons, signatureGearPages) are
  // structurally curated pairs/records, not roster mirrors — skip.
  if (body.includes('{') || body.includes('`')) continue;

  const entries = [...body.matchAll(SLUG_ENTRY_RE)].map(m => m[1]);
  if (entries.length === 0) continue;

  // Only flag arrays where EVERY entry is itself a canonical single-drummer
  // slug. Compound "x-vs-y" pairings and non-drummer slugs (gear, technique,
  // brand) are curated-by-design and can legitimately be a partial subset.
  if (!entries.every(slug => drummerSlugs.has(slug))) continue;

  checked++;
  const lineNo = src.slice(0, index).split('\n').length;
  if (entries.length !== canonicalCount) {
    console.error(
      `✗ api/sitemap.js:${lineNo}: hardcoded drummer-slug array has ${entries.length} ` +
      `entries but the canonical roster has ${canonicalCount}. This array has drifted out ` +
      `of sync with the roster — add the missing slugs, or (preferably) derive it from the ` +
      `canonical roster/data module the way llmsDrummerSlugs and the /llms/licks/ list do, ` +
      `so it can't drift again.`
    );
    failed = true;
  } else {
    console.log(`✓ api/sitemap.js:${lineNo}: hardcoded drummer-slug array matches canonical roster (${entries.length})`);
  }
}

if (checked === 0) {
  console.log(`✓ no hardcoded drummer-slug arrays found in api/sitemap.js — all roster-derived lists are sourced via Object.keys()/.map() (canonical roster: ${canonicalCount} drummers)`);
}

process.exit(failed ? 1 : 0);
