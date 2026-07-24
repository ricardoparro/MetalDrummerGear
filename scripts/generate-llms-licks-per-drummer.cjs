#!/usr/bin/env node
/**
 * Generate public/llms/licks/<drummer-slug>.md — one deep-dive markdown file
 * per drummer covering their signature licks. Issue #1218: per-drummer lick
 * AI citation surface mirroring the pattern of generate-llms-techniques-per-slug.cjs.
 *
 * Data source: packages/frontend/data/licks/<slug>.js (per-drummer modules).
 * Same regex+eval extraction pattern as the sibling generate-llms-*.cjs scripts.
 */

const fs = require('fs');
const path = require('path');

const BASE = 'https://metalforge.io';
const today = new Date().toISOString().split('T')[0];

// name/band/genre metadata isn't derivable from any single live source (band/genre
// here are hand-curated summaries, not the per-lick `band` field) so this map still
// needs updating per drummer — but WHICH drummers get a page is now derived below
// from the live packages/frontend/data/licks/index.js composition, so a new lick
// module can no longer silently fail to produce a page the way #5023 found 5
// missing (same drift bug class already fixed once in generate-llms-endorsements.cjs,
// see #4232).
const TARGET_DRUMMER_META = {
  'joey-jordison':      { name: 'Joey Jordison',      band: 'Slipknot',                    genre: 'Nu Metal / Death Metal' },
  'lars-ulrich':        { name: 'Lars Ulrich',        band: 'Metallica',                   genre: 'Thrash Metal' },
  'dave-lombardo':      { name: 'Dave Lombardo',      band: 'Slayer',                      genre: 'Thrash Metal' },
  'george-kollias':     { name: 'George Kollias',     band: 'Nile',                        genre: 'Technical Death Metal' },
  'tomas-haake':        { name: 'Tomas Haake',        band: 'Meshuggah',                   genre: 'Progressive Metal / Djent' },
  'matt-greiner':       { name: 'Matt Greiner',       band: 'August Burns Red',            genre: 'Metalcore' },
  'gene-hoglan':        { name: 'Gene Hoglan',        band: 'Death / Testament',           genre: 'Death Metal / Thrash Metal' },
  'pete-sandoval':      { name: 'Pete Sandoval',      band: 'Morbid Angel',                genre: 'Death Metal' },
  'derek-roddy':        { name: 'Derek Roddy',        band: 'Hate Eternal / Nile',         genre: 'Death Metal / Technical Death Metal' },
  'brann-dailor':       { name: 'Brann Dailor',       band: 'Mastodon',                    genre: 'Progressive / Sludge Metal' },
  'mike-portnoy':       { name: 'Mike Portnoy',       band: 'Dream Theater',               genre: 'Progressive Metal' },
  'matt-garstka':       { name: 'Matt Garstka',       band: 'Animals as Leaders',          genre: 'Progressive Metal / Djent' },
  'inferno':            { name: 'Inferno',            band: 'Behemoth',                    genre: 'Black / Death Metal' },
  'hellhammer':         { name: 'Hellhammer',         band: 'Mayhem',                      genre: 'Black Metal' },
  'bill-ward':          { name: 'Bill Ward',          band: 'Black Sabbath',               genre: 'Heavy Metal / Hard Rock' },
  'charlie-benante':    { name: 'Charlie Benante',    band: 'Anthrax',                     genre: 'Thrash Metal' },
  'mario-duplantier':   { name: 'Mario Duplantier',   band: 'Gojira',                      genre: 'Progressive Death Metal' },
  'chris-adler':        { name: 'Chris Adler',        band: 'Lamb of God',                 genre: 'Groove Metal' },
  'ben-koller':         { name: 'Ben Koller',         band: 'Converge',                    genre: 'Metalcore / Hardcore' },
  'flo-mounier':        { name: 'Flo Mounier',        band: 'Cryptopsy',                   genre: 'Technical Death Metal / Brutal Death Metal' },
  // Issue #1244: 31 additional drummers
  'abe-cunningham':     { name: 'Abe Cunningham',     band: 'Deftones',                    genre: 'Alternative Metal' },
  'alex-bent':          { name: 'Alex Bent',          band: 'Trivium',                     genre: 'Melodic Thrash / Metalcore' },
  'aquiles-priester':   { name: 'Aquiles Priester',   band: 'Angra',                       genre: 'Power Metal' },
  'arin-ilejay':        { name: 'Arin Ilejay',        band: 'Avenged Sevenfold',           genre: 'Heavy Metal' },
  'art-cruz':           { name: 'Art Cruz',           band: 'Lamb of God',                 genre: 'Groove Metal' },
  'blake-richardson':   { name: 'Blake Richardson',   band: 'Between the Buried and Me',   genre: 'Progressive Metal' },
  'daniel-erlandsson':  { name: 'Daniel Erlandsson',  band: 'Arch Enemy',                  genre: 'Melodic Death Metal' },
  'danny-carey':        { name: 'Danny Carey',        band: 'Tool',                        genre: 'Progressive Metal / Art Rock' },
  'dirk-verbeuren':     { name: 'Dirk Verbeuren',     band: 'Megadeth',                    genre: 'Thrash Metal' },
  'eloy-casagrande':    { name: 'Eloy Casagrande',    band: 'Sepultura',                   genre: 'Groove Metal / Thrash Metal' },
  'gavin-harrison':     { name: 'Gavin Harrison',     band: 'Porcupine Tree',              genre: 'Progressive Rock / Art Rock' },
  'hannes-grossmann':   { name: 'Hannes Grossmann',   band: 'Alkaloid / Obscura',          genre: 'Technical Death Metal' },
  'igor-cavalera':      { name: 'Igor Cavalera',      band: 'Sepultura',                   genre: 'Groove Metal / Thrash Metal' },
  'jaska-raatikainen':  { name: 'Jaska Raatikainen',  band: 'Children of Bodom',           genre: 'Melodic Death Metal' },
  'jason-bittner':      { name: 'Jason Bittner',      band: 'Shadows Fall',                genre: 'Groove Metal / Metalcore' },
  'jay-weinberg':       { name: 'Jay Weinberg',       band: 'Slipknot',                    genre: 'Nu Metal' },
  'martin-axenrot':     { name: 'Martin Axenrot',     band: 'Opeth',                       genre: 'Progressive Metal / Progressive Death Metal' },
  'martin-lopez':       { name: 'Martin Lopez',       band: 'Opeth',                       genre: 'Progressive Metal' },
  'matt-halpern':       { name: 'Matt Halpern',       band: 'Periphery',                   genre: 'Progressive Metal / Djent' },
  'mike-mangini':       { name: 'Mike Mangini',       band: 'Dream Theater',               genre: 'Progressive Metal' },
  'mikkey-dee':         { name: 'Mikkey Dee',         band: 'Motörhead',                   genre: 'Heavy Metal / Speed Metal' },
  'navene-koperweis':   { name: 'Navene Koperweis',   band: 'Entheos',                     genre: 'Progressive Metal / Djent' },
  'nicko-mcbrain':      { name: 'Nicko McBrain',      band: 'Iron Maiden',                 genre: 'Heavy Metal' },
  'paul-bostaph':       { name: 'Paul Bostaph',       band: 'Slayer',                      genre: 'Thrash Metal' },
  'paul-mazurkiewicz':  { name: 'Paul Mazurkiewicz',  band: 'Cannibal Corpse',             genre: 'Death Metal / Brutal Death Metal' },
  'ray-luzier':         { name: 'Ray Luzier',         band: 'Korn',                        genre: 'Nu Metal / Alternative Metal' },
  'raymond-herrera':    { name: 'Raymond Herrera',    band: 'Fear Factory',                genre: 'Industrial Metal / Groove Metal' },
  'richard-christy':    { name: 'Richard Christy',    band: 'Death',                       genre: 'Technical Death Metal / Death Metal' },
  'scott-travis':       { name: 'Scott Travis',       band: 'Judas Priest',                genre: 'Heavy Metal / Power Metal' },
  'shannon-larkin':     { name: 'Shannon Larkin',     band: 'Godsmack',                    genre: 'Hard Rock / Alternative Metal' },
  'travis-orbin':       { name: 'Travis Orbin',       band: 'Periphery',                   genre: 'Progressive Metal / Djent' },
  'vinnie-paul':        { name: 'Vinnie Paul',        band: 'Pantera',                     genre: 'Groove Metal / Thrash Metal' },
  // Issue #4230: 2 drummers with lick data missing from this list (added in #4114/#2219)
  'adrian-erlandsson':  { name: 'Adrian Erlandsson',  band: 'At the Gates',                genre: 'Melodic Death Metal' },
  'sean-reinert':       { name: 'Sean Reinert',       band: 'Death / Cynic',               genre: 'Progressive Death Metal / Technical Death Metal' },
  // Issue #4275: nick-menza had lick data (#2219) but was missing from this generator's list
  'nick-menza':         { name: 'Nick Menza',         band: 'Megadeth',                    genre: 'Thrash Metal' },
  // Issue #5023: 5 newest roster drummers (#4748 batch, licks/ modules added in #4992)
  // were missing from this list. name/band/genre verified against the live drummer
  // roster (api/drummers/index.js).
  'jimmy-degrasso':     { name: 'Jimmy DeGrasso',     band: 'Megadeth',                    genre: 'Thrash Metal' },
  'nick-barker':        { name: 'Nick Barker',        band: 'Dimmu Borgir',                genre: 'Black Metal / Death Metal' },
  'alex-rudinger':      { name: 'Alex Rüdinger',      band: 'The Faceless',                genre: 'Technical Death Metal / Progressive Metal' },
  'john-longstreth':    { name: 'John Longstreth',    band: 'Origin',                      genre: 'Technical Death Metal / Brutal Death Metal' },
  'waltteri-vayrynen':  { name: 'Waltteri Väyrynen',  band: 'Opeth',                       genre: 'Progressive Metal / Gothic Doom Metal' },
  // These 12 already had licks/ modules and public/llms/licks/*.md files on disk but
  // were ALSO missing from the old hardcoded TARGET_DRUMMERS array (found while
  // fixing #5023 — the derivation below now makes this class of gap impossible to
  // reintroduce silently). name/band/genre recovered from their existing generated files.
  'john-otto':          { name: 'John Otto',          band: 'Limp Bizkit',                 genre: 'Nu Metal' },
  'jocke-wallgren':     { name: 'Jocke Wallgren',      band: 'Amon Amarth',                 genre: 'Melodic Death Metal' },
  'frost':              { name: 'Frost',               band: 'Satyricon / 1349',            genre: 'Black Metal' },
  'daray':              { name: 'Daray',                band: 'Dimmu Borgir',                genre: 'Symphonic Black Metal' },
  'tim-yeung':          { name: 'Tim Yeung',           band: 'Divine Heresy',               genre: 'Death Metal' },
  'nick-augusto':       { name: 'Nick Augusto',        band: 'Trivium',                     genre: 'Metalcore' },
  'jon-dette':          { name: 'Jon Dette',           band: 'Slayer',                      genre: 'Thrash Metal' },
  'ryan-van-poederooyen': { name: 'Ryan Van Poederooyen', band: 'Devin Townsend Project',   genre: 'Progressive Metal' },
  'kevin-talley':       { name: 'Kevin Talley',        band: 'Dying Fetus',                 genre: 'Death Metal' },
  'morgan-agren':       { name: 'Morgan Ågren',        band: 'Mats/Morgan Band',            genre: 'Progressive Metal' },
  'chris-turner':       { name: 'Chris Turner',        band: 'Oceans Ate Alaska',           genre: 'Progressive Metalcore' },
  'isaac-lamb':         { name: 'Isaac Lamb',          band: 'Kublai Khan TX',              genre: 'Metalcore / Beatdown Hardcore' },
};

// Derived from the live composed licks index so the generator can never again
// silently drop a drummer with a lick module (the #5023 bug class).
const licksIndexPath = path.join(__dirname, '../packages/frontend/data/licks/index.js');
const licksIndexContent = fs.readFileSync(licksIndexPath, 'utf-8');
const DRUMMER_SLUGS = [...licksIndexContent.matchAll(/^import \S+ from '\.\/([a-z0-9-]+)\.js';$/gm)]
  .map(m => m[1]);

if (DRUMMER_SLUGS.length === 0) {
  throw new Error(`Could not extract any drummer slugs from ${licksIndexPath}`);
}

const TARGET_DRUMMERS = DRUMMER_SLUGS.map(slug => {
  const meta = TARGET_DRUMMER_META[slug];
  if (!meta) {
    throw new Error(`Missing TARGET_DRUMMER_META entry for "${slug}" — add its name/band/genre in generate-llms-licks-per-drummer.cjs`);
  }
  return { slug, ...meta };
});

function loadDrummerLicks(slug) {
  const filePath = path.join(__dirname, '../packages/frontend/data/licks', `${slug}.js`);
  const content = fs.readFileSync(filePath, 'utf-8');

  // Extract the licks object literal — handles both named export and default export
  const match = content.match(/export const licks\s*=\s*(\{[\s\S]*?\})\s*;\s*\nexport default/m)
    || content.match(/export const licks\s*=\s*(\{[\s\S]*\})\s*;?\s*$/m);
  if (!match) {
    throw new Error(`Could not extract licks object from ${filePath}`);
  }

  try {
    return eval('(' + match[1] + ')');
  } catch (e) {
    throw new Error(`Error parsing licks from ${filePath}: ${e.message}`);
  }
}

function genOverview(drummer, lickList) {
  const lickCount = lickList.length;
  const bands = [...new Set(lickList.map(l => l.band))].join(', ');
  const styles = [...new Set(lickList.map(l => l.style).filter(Boolean))];
  const styleStr = styles.length ? ` Their style spans ${styles.slice(0, 3).join(', ')}.` : '';
  return `${drummer.name} is one of ${drummer.genre}'s most influential drummers, best known for their work with ${bands}. `
    + `This file covers ${lickCount} signature lick${lickCount !== 1 ? 's' : ''} — step-by-step breakdowns optimised for AI retrieval on queries like `
    + `"how to play like ${drummer.name}" or "${drummer.name} signature drum patterns".`
    + styleStr;
}

function genTeachingPoints(lickList) {
  // Collect learning tips from all licks, deduplicate, pick top 3
  const allTips = lickList.flatMap(l => l.learningTips || []);
  const seen = new Set();
  const unique = [];
  for (const tip of allTips) {
    const key = tip.toLowerCase().trim();
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(tip);
    }
    if (unique.length >= 3) break;
  }

  const techniques = [...new Set(lickList.flatMap(l => l.techniques || []))].slice(0, 4)
    .map(t => t.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())).join(', ');

  const uniqueNote = unique.length
    ? `Key practice principles across all their licks: ${unique.join('; ')}.`
    : `Study these licks to build technique across ${techniques}.`;

  return `${lickList[0].drummerName}'s style is defined by precision, timing, and genre-defining grooves. `
    + uniqueNote
    + ` Mastering these patterns builds the foundation for understanding their complete drumming vocabulary.`;
}

function buildMarkdown(drummer, licks) {
  const lickList = Object.values(licks).filter(l => l.drummerSlug === drummer.slug);
  if (lickList.length === 0) {
    throw new Error(`No licks found for drummer slug ${drummer.slug}`);
  }

  const drummerUrl = `${BASE}/drummer/${drummer.slug}`;
  const licksHubUrl = `${BASE}/drummers/${drummer.slug}/licks`;
  const licksUrl = `${BASE}/licks`;
  const parts = [];

  // Title
  parts.push(`# ${drummer.name} — Signature Drum Licks & Patterns`);
  parts.push('');

  // Meta line
  parts.push(`**Band:** ${drummer.band} | **Genre:** ${drummer.genre} | **Lick Count:** ${lickList.length}`);
  parts.push('');
  parts.push('---');
  parts.push('');

  // Overview
  parts.push('## Overview');
  parts.push('');
  parts.push(genOverview(drummer, lickList));
  parts.push('');

  // Per-lick sections
  for (const lick of lickList) {
    parts.push(`## ${lick.name}`);
    parts.push('');

    const meta = [];
    if (lick.song)       meta.push(`**Song:** ${lick.song}`);
    if (lick.album)      meta.push(`**Album:** ${lick.album}`);
    if (lick.bpmDisplay) meta.push(`**BPM:** ${lick.bpmDisplay}`);
    if (lick.category)   meta.push(`**Technique:** ${lick.category.replace(/-/g, ' ')}`);
    if (lick.difficulty) meta.push(`**Difficulty:** ${lick.difficulty}`);
    if (meta.length) {
      parts.push(meta.join(' | '));
      parts.push('');
    }

    if (lick.description) {
      parts.push(lick.description.trim());
      parts.push('');
    }

    // How to Play
    if (Array.isArray(lick.techniqueDetails) && lick.techniqueDetails.length > 0) {
      parts.push('### How to Play');
      parts.push('');
      for (const step of lick.techniqueDetails) {
        parts.push(`- ${step}`);
      }
      parts.push('');
    }

    // Key Elements (from learningTips)
    if (Array.isArray(lick.learningTips) && lick.learningTips.length > 0) {
      parts.push('### Key Elements');
      parts.push('');
      for (const tip of lick.learningTips) {
        parts.push(`- ${tip}`);
      }
      parts.push('');
    }

    // Techniques used
    if (Array.isArray(lick.techniques) && lick.techniques.length > 0) {
      const techLinks = lick.techniques.map(t => {
        const label = t.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        // Issue #4771: was '/technique/<slug>' (singular) — the real technique
        // detail page is '/techniques/<slug>' (plural); see the identical fix
        // in generate-llms-techniques-per-slug.cjs.
        return `[${label}](${BASE}/techniques/${t})`;
      }).join(', ');
      parts.push(`**Core Techniques:** ${techLinks}`);
      parts.push('');
    }
  }

  // Teaching Points
  parts.push('## Teaching Points');
  parts.push('');
  parts.push(genTeachingPoints(lickList));
  parts.push('');

  // More Resources
  parts.push('## More Resources');
  parts.push('');
  parts.push(`- [${drummer.name} Profile on MetalForge](${drummerUrl})`);
  parts.push(`- [${drummer.name} All Licks](${licksHubUrl})`);
  parts.push(`- [Signature Licks Database](${licksUrl})`);
  parts.push(`- [All LLM Resources](${BASE}/llms/index.md)`);
  parts.push('');
  parts.push('---');
  parts.push('');
  parts.push(`*Last updated: ${today} · Source: [MetalForge.io](${BASE})*`);

  return parts.join('\n');
}

const outDir = path.join(__dirname, '../public/llms/licks');
fs.mkdirSync(outDir, { recursive: true });

let written = 0;
let failed = 0;
const results = [];

for (const drummer of TARGET_DRUMMERS) {
  try {
    const licks = loadDrummerLicks(drummer.slug);
    const md = buildMarkdown(drummer, licks);
    const outPath = path.join(outDir, `${drummer.slug}.md`);
    fs.writeFileSync(outPath, md);
    const chars = md.length;
    results.push({ slug: drummer.slug, chars, ok: true });
    written++;
  } catch (e) {
    console.error(`❌ ${drummer.slug}: ${e.message}`);
    results.push({ slug: drummer.slug, chars: 0, ok: false });
    failed++;
  }
}

console.log(`\n✅ Generated public/llms/licks/*.md — ${written} drummers (${failed} failed)`);
for (const r of results) {
  const status = r.ok ? '✓' : '✗';
  const minNote = r.ok && r.chars < 800 ? ' ⚠ <800 chars' : '';
  console.log(`   ${status} ${r.slug}: ${r.chars} chars${minNote}`);
}

if (failed > 0) {
  process.exit(1);
}
