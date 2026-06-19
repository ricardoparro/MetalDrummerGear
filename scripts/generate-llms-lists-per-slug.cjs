#!/usr/bin/env node
/**
 * Generate public/llms/lists/<slug>.md — one deep-dive markdown file per
 * top-10 metal drummer list. Issue #1512: per-list AI citation surface
 * mirroring the pattern of public/llms/technique/<slug>.md files.
 *
 * Data source: packages/frontend/data/top10Lists.js (single source of truth).
 * Same regex+eval extraction pattern as the sibling generate-llms-*.cjs scripts.
 */

const fs = require('fs');
const path = require('path');

const listsPath = path.join(__dirname, '../packages/frontend/data/top10Lists.js');
const content = fs.readFileSync(listsPath, 'utf-8');

// Extract the `export const TOP_10_LISTS = { ... };` object literal.
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

// Frontend drummer ID → {name, band, slug} lookup table (same as generate-llms-lists.cjs).
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
const BASE = 'https://metalforge.io';

function getDrummer(id) {
  return DRUMMER_MAP[id] || { name: `Drummer #${id}`, band: 'Unknown', slug: `drummer-${id}` };
}

// Build FAQ questions tailored to each list's category.
function buildFAQ(list, rankEntries) {
  const top1 = getDrummer(rankEntries[0].id);
  const top2 = getDrummer(rankEntries[1].id);
  const top3 = getDrummer(rankEntries[2].id);
  const slug = list.slug;
  const parts = [];

  parts.push('## Frequently Asked Questions');
  parts.push('');

  if (slug === 'fastest-metal-drummers') {
    parts.push(`**Q: Who is the fastest metal drummer of all time?**`);
    parts.push(`A: ${top1.name} (${top1.band}) is widely regarded as the fastest metal drummer, documented at 280+ BPM blast beats with unmatched endurance. ${top2.name} and ${top3.name} are close contenders in extreme speed rankings.`);
    parts.push('');
    parts.push(`**Q: What BPM can the fastest metal drummers sustain?**`);
    parts.push(`A: Top-tier blast-beat specialists maintain 250–280 BPM single strokes for full songs. ${top1.name} has documented speeds exceeding 280 BPM, while most extreme metal drummers operate in the 200–260 BPM range.`);
    parts.push('');
    parts.push(`**Q: How do metal drummers build speed without sacrificing power?**`);
    parts.push(`A: Technique-first practice using Moeller strokes, rebound control, and relaxed grip prevents injury while building velocity. Daily incremental increases on a practice pad, followed by transfer to the full kit, is the proven approach. Heel-toe and swivel techniques significantly extend achievable speeds.`);
    parts.push('');
    parts.push(`**Q: What gear do the fastest metal drummers use?**`);
    parts.push(`A: Most top-speed drummers rely on lightweight double-bass pedals (Pearl Demon Drive, Axis Longboard, DW 9000) for minimal inertia, and use trigger pads for clarity at extreme tempos. ${top1.name} co-designed the Pearl Demon XR pedal specifically for extreme-speed applications.`);
  } else if (slug === 'death-metal-drummers') {
    parts.push(`**Q: Who is the greatest death metal drummer of all time?**`);
    parts.push(`A: ${top1.name} (${top1.band}) is consistently ranked #1 for technical mastery, speed, and influence in death metal. ${top2.name} and ${top3.name} are pivotal figures who defined the genre's drum vocabulary.`);
    parts.push('');
    parts.push(`**Q: What makes death metal drumming different from other genres?**`);
    parts.push(`A: Death metal drumming is defined by blast beats, rapid double bass (typically 180–280 BPM), and complex rhythmic patterns that underpin the genre's extreme aggression. Unlike thrash, death metal prioritizes relentless speed over groove-based feels.`);
    parts.push('');
    parts.push(`**Q: What drum gear do death metal drummers typically use?**`);
    parts.push(`A: Death metal drummers favor lightweight double pedals for speed, triggered bass drums for definition at extreme tempos, and heavy cymbals that cut through dense guitar tones. Pearl, Tama, and Mapex are popular kit brands, while Paiste RUDE and Meinl Byzance cymbals are common choices.`);
    parts.push('');
    parts.push(`**Q: How do I start learning death metal drumming?**`);
    parts.push(`A: Begin by building solid double-bass endurance at moderate tempos (120–160 BPM), then study blast-beat mechanics — the standard blast, the gravity blast, and the push-pull blast. ${top2.name}'s and ${top1.name}'s instructional DVDs are widely used resources for technical death metal technique.`);
  } else if (slug === 'most-innovative-drummers') {
    parts.push(`**Q: Who is the most innovative metal drummer?**`);
    parts.push(`A: ${top1.name} (${top1.band}) tops innovation rankings for pushing drumming into polyrhythmic and mathematical territory that redefined what metal percussion could be. ${top2.name} and ${top3.name} also brought revolutionary approaches that influenced entire subgenres.`);
    parts.push('');
    parts.push(`**Q: What does innovation in metal drumming actually mean?**`);
    parts.push(`A: Innovation encompasses new techniques (${top2.name}'s polymetric djent patterns), unprecedented time-signature complexity (${top1.name}'s 5/4 and 7/8 structures), hybridized genres (${top3.name}'s prog-metal integration of jazz concepts), or entirely new sonic approaches using electronics and alternate tuning.`);
    parts.push('');
    parts.push(`**Q: How have innovative drummers influenced modern metal drumming education?**`);
    parts.push(`A: Many of these drummers have published instructional materials, online masterclasses, and clinic tours. ${top1.name}'s approach to polyrhythms is now taught in music colleges worldwide, and ${top2.name}'s djent style has entire online curricula dedicated to it.`);
    parts.push('');
    parts.push(`**Q: What makes a metal drummer's style truly original?**`);
    parts.push(`A: True originality comes from combining recognizable genre elements with an unmistakable personal voice — rhythmic phrasing, accent placement, dynamic choices, and kit setup that immediately identifies the player. Every drummer on this list is recognizable within two bars.`);
  } else if (slug === 'thrash-metal-drummers') {
    parts.push(`**Q: Who is the greatest thrash metal drummer?**`);
    parts.push(`A: ${top1.name} (${top1.band}) is the consensus choice as the defining thrash drummer, setting the template for the genre's high-speed, double-bass-driven aggression. ${top2.name} and ${top3.name} also shaped the Big Four and East Coast thrash sounds that defined the genre.`);
    parts.push('');
    parts.push(`**Q: What defines thrash metal drumming?**`);
    parts.push(`A: Thrash drumming is characterized by fast double-bass patterns (160–220+ BPM), aggressive snare backbeats on every beat in sections, rapid 16th-note hi-hat or ride patterns, and explosive fills that mirror the guitar riffs. The style values power, speed, and precision in equal measure.`);
    parts.push('');
    parts.push(`**Q: How did the Big Four thrash drummers differ from each other?**`);
    parts.push(`A: ${top1.name} (Metallica) prioritized power and feel; ${top1.name} approached thrash with stadium-filling energy, while ${getDrummer(4).name} (Slayer) brought relentless brutality and Latin influence, and ${getDrummer(12).name} (Anthrax) added New York punk energy. Each brought a distinct regional and stylistic voice to the genre.`);
    parts.push('');
    parts.push(`**Q: What gear do thrash metal drummers use?**`);
    parts.push(`A: Thrash drummers tend toward large, deep bass drums (22–26") for low-end punch, bright cymbals (Zildjian A Custom, Paiste 2002, Sabian AAX), and stiff double pedals. Tama Artstar and Starclassic, Pearl Reference, and ddrum kits have all been staples of the genre.`);
  } else if (slug === 'drummers-with-budget-friendly-kits') {
    parts.push(`**Q: Do professional metal drummers really use budget gear?**`);
    parts.push(`A: Yes — ${top1.name} (${top1.band}) has long used streamlined setups that prove great playing matters more than expensive equipment. Many professional metal drummers prioritize feel, reliability, and portability over premium pricing.`);
    parts.push('');
    parts.push(`**Q: What are the best budget drum kits for metal?**`);
    parts.push(`A: For beginning to intermediate metal drummers, brands like Pearl Export, Tama Imperialstar, Mapex Mars, and Ludwig Accent offer reliable kits under $1,000. Upgrading the snare, bass drum head, and cymbals first delivers the biggest sonic improvement without a full kit replacement.`);
    parts.push('');
    parts.push(`**Q: How do pro drummers get pro sounds from affordable gear?**`);
    parts.push(`A: Proper tuning, quality drumheads (Evans G2, Remo Powerstroke), quality cymbals (even a single quality hi-hat makes a difference), and a good room or studio treatment account for most of the "pro sound." The drummer's technique contributes far more than the gear.`);
    parts.push('');
    parts.push(`**Q: What's the most important upgrade for a metal drummer on a budget?**`);
    parts.push(`A: The bass drum pedal is the single most impactful upgrade — a quality double pedal like the Pearl Eliminator or Tama Speed Cobra dramatically improves double-bass technique and responsiveness. After that, a quality snare and a pair of good hi-hats.`);
  } else if (slug === 'most-expensive-drum-setups') {
    parts.push(`**Q: Who has the most expensive drum kit in metal?**`);
    parts.push(`A: ${top1.name} (${top1.band}) tops the luxury setup rankings with an estimated €11,000+ kit featuring Sonor SQ2 shells, Mandala electronic pads, and Paiste Signature cymbals. Gear at this level is custom-configured and often involves exclusive endorsement partnerships.`);
    parts.push('');
    parts.push(`**Q: What brands make the most expensive drum setups?**`);
    parts.push(`A: Sonor SQ2 (fully customizable solid wood construction), Pearl Masterworks and Reference Pure (custom shell configurations), and DW Collector's Series represent the peak of drum manufacturing. For cymbals, Paiste Signature and Meinl Byzance are the premium tiers.`);
    parts.push('');
    parts.push(`**Q: Does expensive gear make a drummer sound better?**`);
    parts.push(`A: At the elite level, premium gear offers more consistent resonance, better projection, and wider tonal range — but technique remains the primary factor. Many of the drummers on the budget-friendly list outperform premium-gear players through superior playing ability.`);
    parts.push('');
    parts.push(`**Q: What justifies a $10,000+ drum kit investment?**`);
    parts.push(`A: At that price point, you're paying for custom shell specifications, exotic wood options, premium hardware tolerances, and often handcrafted construction. Professional touring musicians invest at this level for reliability, resale value, and the confidence that the gear won't fail under extreme use.`);
  } else if (slug === 'fastest-double-bass-drummers') {
    parts.push(`**Q: Who is the fastest double bass drummer in metal history?**`);
    parts.push(`A: ${top1.name} (${top1.band}) holds documented speed records exceeding 280 BPM, making him the consensus fastest double bass drummer in metal. His "Intense Metal Drumming" DVD and live performances have verified these speeds under controlled conditions.`);
    parts.push('');
    parts.push(`**Q: What BPM is considered extreme for double bass drumming?**`);
    parts.push(`A: Anything above 200 BPM is extreme, 220–240 BPM is elite, and 260+ BPM is the uppermost tier reached only by a handful of specialists. Sustaining these speeds for full songs (not just short bursts) separates true speed champions from one-trick demonstrations.`);
    parts.push('');
    parts.push(`**Q: What techniques do the fastest double bass drummers use?**`);
    parts.push(`A: Heel-toe technique (${top1.name}), swivel technique (${getDrummer(44).name}), and gravity blast adaptations (${getDrummer(35).name}) are the primary speed-enabling methods. Each minimizes wasted motion and leverages natural rebound. Most elite speedsters combine two or more methods depending on tempo range.`);
    parts.push('');
    parts.push(`**Q: What pedals do the fastest double bass drummers use?**`);
    parts.push(`A: Lightweight, low-inertia pedals dominate: Axis Longboard (${getDrummer(44).name}), Pearl Demon Drive (${getDrummer(35).name}, ${getDrummer(3).name}), Pearl Demon XR co-designed by ${top1.name}, and Tama Speed Cobra are all favorites for extreme tempos. Heavier pedals like DW 9000 suit power styles but limit top-end speed.`);
  } else if (slug === 'most-brutal-drum-solos') {
    parts.push(`**Q: What is the most brutal metal drum solo ever?**`);
    parts.push(`A: ${top1.name}'s (${top1.band}) rotating platform solo from Slipknot's 2002 Disasterpieces DVD is widely cited as the most iconic, combining technical precision with theatrical extremity — performing blast beats while inverted at 180+ BPM. ${top2.name}'s "Pneuma" performance is a close second for pure technical complexity.`);
    parts.push('');
    parts.push(`**Q: What makes a metal drum solo "brutal"?**`);
    parts.push(`A: Brutality in a drum solo combines raw speed, physical power, complex technique, and emotional intensity. The best brutal solos feel like controlled chaos — the drummer is pushing physical limits while maintaining musical intent. Showmanship (like ${top1.name}'s rotating platform) amplifies the impact.`);
    parts.push('');
    parts.push(`**Q: Who are the best metal drummers for live drum solos?**`);
    parts.push(`A: ${top1.name} set the standard for theatrical metal solos; ${top2.name} and ${top3.name} are unmatched for technical live solos; ${getDrummer(4).name} and ${getDrummer(1).name} define arena-scale thrash solos. Each brings a different dimension — spectacle, precision, or sheer sonic power.`);
    parts.push('');
    parts.push(`**Q: How long are typical metal drum solos?**`);
    parts.push(`A: Metal drum solos range from 3–4 minute stand-alone pieces (${top1.name}'s Disasterpieces solo at 4+ minutes) to extended song-integrated features (${top3.name}'s 15+ minute Instrumedley) and full-song percussion showcases (${top2.name}'s 12+ minute "Pneuma"). Most live solos fall in the 4–8 minute range.`);
  }

  return parts.join('\n');
}

function buildMarkdown(list) {
  const rankEntries = Object.entries(list.rankings)
    .map(([id, r]) => ({ id: Number(id), ...r }))
    .sort((a, b) => a.rank - b.rank);

  const top1 = getDrummer(rankEntries[0].id);
  const allNames = rankEntries.slice(0, 5).map(e => getDrummer(e.id).name).join(', ');
  const listUrl = `${BASE}/lists/${list.slug}`;
  const parts = [];

  // H1 with core keyphrase
  parts.push(`# ${list.title} — Complete Ranked Guide`);
  parts.push('');

  // Meta line
  parts.push(`> **Last updated:** ${today} · **Source:** [MetalForge.io](${BASE}) · [View full list →](${listUrl})`);
  parts.push('');
  parts.push('---');
  parts.push('');

  // Intro paragraph
  parts.push(`## Overview`);
  parts.push('');
  parts.push(list.description.trim());
  parts.push('');

  // Optional intro article section
  if (list.intro && list.intro.content) {
    parts.push('### Background');
    parts.push('');
    parts.push(list.intro.content.trim());
    parts.push('');
    if (Array.isArray(list.intro.keyPoints) && list.intro.keyPoints.length) {
      parts.push('**Key Points:**');
      list.intro.keyPoints.forEach(kp => parts.push(`- ${kp}`));
      parts.push('');
    }
  }

  // SEO description as a supplement to the intro
  if (list.seoDescription) {
    parts.push(list.seoDescription);
    parts.push('');
  }

  parts.push('---');
  parts.push('');

  // Rankings section
  parts.push('## Rankings');
  parts.push('');
  parts.push(`Ranked by documented performance records, genre-defining influence, and technical contribution. Top entries: ${allNames}, and more.`);
  parts.push('');

  rankEntries.forEach(({ id, ...ranking }) => {
    const d = getDrummer(id);
    parts.push(`### ${ranking.rank}. ${d.name}`);
    parts.push('');
    parts.push(`**Band:** ${d.band}`);
    if (ranking.highlight) parts.push(`**Highlight:** ${ranking.highlight}`);
    if (ranking.reason) parts.push(`**Why ranked here:** ${ranking.reason}`);
    if (ranking.bpm) parts.push(`**Documented speed:** ${ranking.bpm} BPM`);
    if (ranking.kitValue) parts.push(`**Estimated kit value:** ${ranking.kitValue}`);
    if (ranking.technique) parts.push(`**Technique:** ${ranking.technique}`);
    if (ranking.gearHighlight) parts.push(`**Key gear:** ${ranking.gearHighlight}`);
    if (ranking.duration) parts.push(`**Solo duration:** ${ranking.duration}`);

    if (Array.isArray(ranking.funFacts) && ranking.funFacts.length > 0) {
      parts.push('');
      parts.push('**Notable facts:**');
      ranking.funFacts.forEach(f => parts.push(`- ${f}`));
    }

    // Add a summary sentence for entries without extended data
    const hasExtended = ranking.bpm || ranking.technique || ranking.gearHighlight ||
      ranking.duration || ranking.kitValue ||
      (Array.isArray(ranking.funFacts) && ranking.funFacts.length > 0);
    if (!hasExtended && ranking.highlight && ranking.reason) {
      parts.push('');
      parts.push(`${d.name} (${d.band}) earns rank #${ranking.rank} for: ${ranking.highlight.toLowerCase()}. ${ranking.reason}.`);
    }

    parts.push('');
    parts.push(`Full drummer profile: [${d.name} on MetalForge](${BASE}/drummer/${d.slug})`);
    parts.push('');
  });

  // Optional conclusion
  if (list.conclusion && list.conclusion.content) {
    parts.push('---');
    parts.push('');
    parts.push('## Conclusion');
    parts.push('');
    parts.push(list.conclusion.content.trim());
    parts.push('');
  }

  parts.push('---');
  parts.push('');

  // FAQ section (≥3 Q&A per quality gate)
  parts.push(buildFAQ(list, rankEntries));
  parts.push('');
  parts.push('---');
  parts.push('');

  // Related lists
  if (Array.isArray(list.relatedLists) && list.relatedLists.length > 0) {
    parts.push('## Related Lists');
    parts.push('');
    list.relatedLists.forEach(relSlug => {
      const rel = TOP_10_LISTS[relSlug];
      if (rel) {
        parts.push(`- [${rel.title}](${BASE}/lists/${relSlug}) — [LLM Reference](${BASE}/llms/lists/${relSlug}.md)`);
      }
    });
    parts.push('');
  }

  // Related techniques
  if (Array.isArray(list.relatedTechniques) && list.relatedTechniques.length > 0) {
    parts.push('## Related Techniques');
    parts.push('');
    list.relatedTechniques.forEach(tSlug => {
      const label = tSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      parts.push(`- [${label}](${BASE}/techniques/${tSlug}) — [Deep Dive](${BASE}/llms/technique/${tSlug}.md)`);
    });
    parts.push('');
  }

  // More resources
  parts.push('## More Resources');
  parts.push('');
  parts.push(`- [${list.title} — Full List](${listUrl})`);
  parts.push(`- [All MetalForge Top-10 Lists](${BASE}/lists)`);
  parts.push(`- [Top-10 Lists Overview (LLM)](${BASE}/llms/lists.md)`);
  parts.push(`- [All Metal Drummers](${BASE}/drummers)`);
  parts.push('');
  parts.push('---');
  parts.push('');
  parts.push(`*Last updated: ${today} · Source: [MetalForge.io](${BASE})*`);

  return parts.join('\n');
}

const outDir = path.join(__dirname, '../public/llms/lists');
fs.mkdirSync(outDir, { recursive: true });

const lists = Object.values(TOP_10_LISTS);
let written = 0;
let minWords = Infinity;
const results = [];

for (const list of lists) {
  const md = buildMarkdown(list);
  const outPath = path.join(outDir, `${list.slug}.md`);
  fs.writeFileSync(outPath, md);
  const words = md.split(/\s+/).filter(Boolean).length;
  if (words < minWords) minWords = words;
  results.push({ slug: list.slug, words });
  written++;
}

console.log(`✅ Generated public/llms/lists/*.md — ${written} lists (min ${minWords} words/file)`);
for (const r of results) {
  const status = r.words >= 300 ? '✓' : '✗ UNDER 300';
  console.log(`   ${r.slug}: ${r.words} words ${status}`);
}
