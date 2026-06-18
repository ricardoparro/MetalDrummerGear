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

// All 51 drummers with lick data (issue #1244 expanded from original 20 in #1218)
const TARGET_DRUMMERS = [
  { slug: 'joey-jordison',      name: 'Joey Jordison',      band: 'Slipknot',                    genre: 'Nu Metal / Death Metal' },
  { slug: 'lars-ulrich',        name: 'Lars Ulrich',        band: 'Metallica',                   genre: 'Thrash Metal' },
  { slug: 'dave-lombardo',      name: 'Dave Lombardo',      band: 'Slayer',                      genre: 'Thrash Metal' },
  { slug: 'george-kollias',     name: 'George Kollias',     band: 'Nile',                        genre: 'Technical Death Metal' },
  { slug: 'tomas-haake',        name: 'Tomas Haake',        band: 'Meshuggah',                   genre: 'Progressive Metal / Djent' },
  { slug: 'matt-greiner',       name: 'Matt Greiner',       band: 'August Burns Red',            genre: 'Metalcore' },
  { slug: 'gene-hoglan',        name: 'Gene Hoglan',        band: 'Death / Testament',           genre: 'Death Metal / Thrash Metal' },
  { slug: 'pete-sandoval',      name: 'Pete Sandoval',      band: 'Morbid Angel',                genre: 'Death Metal' },
  { slug: 'derek-roddy',        name: 'Derek Roddy',        band: 'Hate Eternal / Nile',         genre: 'Death Metal / Technical Death Metal' },
  { slug: 'brann-dailor',       name: 'Brann Dailor',       band: 'Mastodon',                    genre: 'Progressive / Sludge Metal' },
  { slug: 'mike-portnoy',       name: 'Mike Portnoy',       band: 'Dream Theater',               genre: 'Progressive Metal' },
  { slug: 'matt-garstka',       name: 'Matt Garstka',       band: 'Animals as Leaders',          genre: 'Progressive Metal / Djent' },
  { slug: 'inferno',            name: 'Inferno',            band: 'Behemoth',                    genre: 'Black / Death Metal' },
  { slug: 'hellhammer',         name: 'Hellhammer',         band: 'Mayhem',                      genre: 'Black Metal' },
  { slug: 'bill-ward',          name: 'Bill Ward',          band: 'Black Sabbath',               genre: 'Heavy Metal / Hard Rock' },
  { slug: 'charlie-benante',    name: 'Charlie Benante',    band: 'Anthrax',                     genre: 'Thrash Metal' },
  { slug: 'mario-duplantier',   name: 'Mario Duplantier',   band: 'Gojira',                      genre: 'Progressive Death Metal' },
  { slug: 'chris-adler',        name: 'Chris Adler',        band: 'Lamb of God',                 genre: 'Groove Metal' },
  { slug: 'ben-koller',         name: 'Ben Koller',         band: 'Converge',                    genre: 'Metalcore / Hardcore' },
  { slug: 'flo-mounier',        name: 'Flo Mounier',        band: 'Cryptopsy',                   genre: 'Technical Death Metal / Brutal Death Metal' },
  // Issue #1244: 31 additional drummers
  { slug: 'abe-cunningham',     name: 'Abe Cunningham',     band: 'Deftones',                    genre: 'Alternative Metal' },
  { slug: 'alex-bent',          name: 'Alex Bent',          band: 'Trivium',                     genre: 'Melodic Thrash / Metalcore' },
  { slug: 'aquiles-priester',   name: 'Aquiles Priester',   band: 'Angra',                       genre: 'Power Metal' },
  { slug: 'arin-ilejay',        name: 'Arin Ilejay',        band: 'Avenged Sevenfold',           genre: 'Heavy Metal' },
  { slug: 'art-cruz',           name: 'Art Cruz',           band: 'Lamb of God',                 genre: 'Groove Metal' },
  { slug: 'blake-richardson',   name: 'Blake Richardson',   band: 'Between the Buried and Me',   genre: 'Progressive Metal' },
  { slug: 'daniel-erlandsson',  name: 'Daniel Erlandsson',  band: 'Arch Enemy',                  genre: 'Melodic Death Metal' },
  { slug: 'danny-carey',        name: 'Danny Carey',        band: 'Tool',                        genre: 'Progressive Metal / Art Rock' },
  { slug: 'dirk-verbeuren',     name: 'Dirk Verbeuren',     band: 'Megadeth',                    genre: 'Thrash Metal' },
  { slug: 'eloy-casagrande',    name: 'Eloy Casagrande',    band: 'Sepultura',                   genre: 'Groove Metal / Thrash Metal' },
  { slug: 'gavin-harrison',     name: 'Gavin Harrison',     band: 'Porcupine Tree',              genre: 'Progressive Rock / Art Rock' },
  { slug: 'hannes-grossmann',   name: 'Hannes Grossmann',   band: 'Alkaloid / Obscura',          genre: 'Technical Death Metal' },
  { slug: 'igor-cavalera',      name: 'Igor Cavalera',      band: 'Sepultura',                   genre: 'Groove Metal / Thrash Metal' },
  { slug: 'jaska-raatikainen',  name: 'Jaska Raatikainen',  band: 'Children of Bodom',           genre: 'Melodic Death Metal' },
  { slug: 'jason-bittner',      name: 'Jason Bittner',      band: 'Shadows Fall',                genre: 'Groove Metal / Metalcore' },
  { slug: 'jay-weinberg',       name: 'Jay Weinberg',       band: 'Slipknot',                    genre: 'Nu Metal' },
  { slug: 'martin-lopez',       name: 'Martin Lopez',       band: 'Opeth',                       genre: 'Progressive Metal' },
  { slug: 'matt-halpern',       name: 'Matt Halpern',       band: 'Periphery',                   genre: 'Progressive Metal / Djent' },
  { slug: 'mike-mangini',       name: 'Mike Mangini',       band: 'Dream Theater',               genre: 'Progressive Metal' },
  { slug: 'mikkey-dee',         name: 'Mikkey Dee',         band: 'Motörhead',                   genre: 'Heavy Metal / Speed Metal' },
  { slug: 'navene-koperweis',   name: 'Navene Koperweis',   band: 'Entheos',                     genre: 'Progressive Metal / Djent' },
  { slug: 'nicko-mcbrain',      name: 'Nicko McBrain',      band: 'Iron Maiden',                 genre: 'Heavy Metal' },
  { slug: 'paul-bostaph',       name: 'Paul Bostaph',       band: 'Slayer',                      genre: 'Thrash Metal' },
  { slug: 'paul-mazurkiewicz',  name: 'Paul Mazurkiewicz',  band: 'Cannibal Corpse',             genre: 'Death Metal / Brutal Death Metal' },
  { slug: 'ray-luzier',         name: 'Ray Luzier',         band: 'Korn',                        genre: 'Nu Metal / Alternative Metal' },
  { slug: 'raymond-herrera',    name: 'Raymond Herrera',    band: 'Fear Factory',                genre: 'Industrial Metal / Groove Metal' },
  { slug: 'richard-christy',    name: 'Richard Christy',    band: 'Death',                       genre: 'Technical Death Metal / Death Metal' },
  { slug: 'scott-travis',       name: 'Scott Travis',       band: 'Judas Priest',                genre: 'Heavy Metal / Power Metal' },
  { slug: 'shannon-larkin',     name: 'Shannon Larkin',     band: 'Godsmack',                    genre: 'Hard Rock / Alternative Metal' },
  { slug: 'travis-orbin',       name: 'Travis Orbin',       band: 'Periphery',                   genre: 'Progressive Metal / Djent' },
  { slug: 'vinnie-paul',        name: 'Vinnie Paul',        band: 'Pantera',                     genre: 'Groove Metal / Thrash Metal' },
];

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
        return `[${label}](${BASE}/technique/${t})`;
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
