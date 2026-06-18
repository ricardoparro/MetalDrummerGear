#!/usr/bin/env node
/**
 * Generate public/llms/guides.md — LLM citation surface for MetalForge's
 * how-to-sound-like guides and beginner drummer guides.
 *
 * Issue #1329: /guides/ section was invisible to AI crawlers despite having SSR
 * meta. This script exposes every guide as citable markdown so AI assistants
 * answering "how do I sound like Joey Jordison?" have MetalForge content to quote.
 *
 * Data sources:
 *   packages/frontend/data/soundLikeGuides.js  — SOUND_LIKE_GUIDES export
 *   packages/frontend/data/beginnerGuides.js   — BEGINNER_GUIDES export
 */

const fs = require('fs');
const path = require('path');

const BASE = 'https://metalforge.io';
const today = new Date().toISOString().split('T')[0];

// ── Extract SOUND_LIKE_GUIDES ────────────────────────────────────────────────
const soundLikePath = path.join(__dirname, '../packages/frontend/data/soundLikeGuides.js');
const soundLikeContent = fs.readFileSync(soundLikePath, 'utf-8');

const soundLikeMatch = soundLikeContent.match(/export const SOUND_LIKE_GUIDES\s*=\s*(\{[\s\S]*?\n\});\s*\n/);
if (!soundLikeMatch) {
  console.error('Could not extract SOUND_LIKE_GUIDES from soundLikeGuides.js');
  process.exit(1);
}

let SOUND_LIKE_GUIDES;
try {
  SOUND_LIKE_GUIDES = eval('(' + soundLikeMatch[1] + ')');
} catch (e) {
  console.error('Error parsing SOUND_LIKE_GUIDES:', e);
  process.exit(1);
}

// ── Extract BEGINNER_GUIDES ──────────────────────────────────────────────────
const beginnerPath = path.join(__dirname, '../packages/frontend/data/beginnerGuides.js');
const beginnerContent = fs.readFileSync(beginnerPath, 'utf-8');

// Strip the AFFILIATE_LINKS const and its references so eval works cleanly
const beginnerStripped = beginnerContent
  .replace(/^const AFFILIATE_LINKS[\s\S]*?^};\n/m, '')
  .replace(/AFFILIATE_LINKS\.[a-zA-Z.[\]']+/g, '"#"');

const beginnerMatch = beginnerStripped.match(/export const BEGINNER_GUIDES\s*=\s*(\{[\s\S]*?\n\});\s*\n/);
if (!beginnerMatch) {
  console.error('Could not extract BEGINNER_GUIDES from beginnerGuides.js');
  process.exit(1);
}

let BEGINNER_GUIDES;
try {
  BEGINNER_GUIDES = eval('(' + beginnerMatch[1] + ')');
} catch (e) {
  console.error('Error parsing BEGINNER_GUIDES:', e.message);
  // Fallback: hard-code the four known beginner guide stubs from the file
  BEGINNER_GUIDES = {
    'beginner-metal-drummer-setup': {
      slug: 'beginner-metal-drummer-setup',
      title: 'The Ultimate Beginner Metal Drummer Gear Guide Under $1000',
      description: 'Complete guide to building your first metal drum kit on a budget. Expert recommendations for drums, cymbals, hardware, and accessories—all under $1000. Includes setup tips, technique basics, and upgrade paths.',
    },
    'budget-metal-drum-setup-500': {
      slug: 'budget-metal-drum-setup-500',
      title: 'The Best Budget Metal Drum Setup Under $500',
      description: 'Build a complete, gig-ready metal drum setup for under $500. Honest picks for the best entry-level complete kits, plus the cheap upgrades that make budget gear sound heavy.',
    },
    'budget-metal-drum-setup-1000': {
      slug: 'budget-metal-drum-setup-1000',
      title: 'The Best Metal Drum Setup Under $1000',
      description: 'Build a serious metal drum setup for under $1000. The mid-tier sweet spot: a real shell pack, a separate bronze cymbal set, an upgraded pedal, and the option to step into double bass.',
    },
    'budget-metal-drum-setup-2000': {
      slug: 'budget-metal-drum-setup-2000',
      title: 'The Best Metal Drum Setup Under $2000',
      description: 'Build a pro-level metal drum setup for under $2000. The top tier of our budget series: pro-grade maple/birch shells, a real B20 cymbal set, a serious double bass pedal, and a dedicated metal snare.',
    },
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function guideUrl(slug) {
  return `${BASE}/guides/${slug}`;
}

function renderSoundLikeGuide(g) {
  const parts = [];
  parts.push(`## How to Sound Like ${g.drummerName} (${g.band})`);
  parts.push('');
  parts.push(`**Genre:** ${g.genre}  `);
  parts.push(`**Guide URL:** [${guideUrl(g.slug)}](${guideUrl(g.slug)})`);
  parts.push('');
  parts.push(g.description || '');
  parts.push('');

  // Technique overview
  if (g.technique) {
    if (g.technique.overview) {
      parts.push('### Style Overview');
      parts.push('');
      parts.push(g.technique.overview.trim());
      parts.push('');
    }

    if (g.technique.stickGrip) {
      const sg = g.technique.stickGrip;
      parts.push(`**Grip:** ${sg.type} — ${sg.description}`);
      parts.push('');
    }

    if (Array.isArray(g.technique.signaturePatterns) && g.technique.signaturePatterns.length > 0) {
      parts.push('### Signature Patterns');
      parts.push('');
      for (const p of g.technique.signaturePatterns) {
        parts.push(`- **${p.name}** (${p.tempo || 'variable'}, ${p.difficulty || ''}): ${p.description}`);
      }
      parts.push('');
    }

    if (Array.isArray(g.technique.keySongs) && g.technique.keySongs.length > 0) {
      parts.push('### Key Songs to Study');
      parts.push('');
      for (const s of g.technique.keySongs) {
        parts.push(`- *${s.song}* (${s.album}, ${s.year}) — ${s.why}`);
      }
      parts.push('');
    }
  }

  // Gear summary
  if (g.gear) {
    const gearLines = [];
    if (g.gear.drumKit) {
      const kit = g.gear.drumKit;
      gearLines.push(`Drums: ${kit.brand} ${kit.model} (${kit.shells || ''} shells)`);
    }
    if (g.gear.snare) {
      gearLines.push(`Snare: ${g.gear.snare.brand} ${g.gear.snare.model}`);
    }
    if (g.gear.cymbals) {
      gearLines.push(`Cymbals: ${g.gear.cymbals.brand} ${g.gear.cymbals.series || ''}`);
    }
    if (g.gear.pedals) {
      gearLines.push(`Pedals: ${g.gear.pedals.brand} ${g.gear.pedals.model || ''}`);
    }
    if (gearLines.length > 0) {
      parts.push('### Gear Setup');
      parts.push('');
      for (const line of gearLines) {
        parts.push(`- ${line}`);
      }
      parts.push('');
    }
  }

  return parts.join('\n');
}

function renderBeginnerGuide(g) {
  const parts = [];
  parts.push(`## ${g.title}`);
  parts.push('');
  parts.push(`**URL:** [${guideUrl(g.slug)}](${guideUrl(g.slug)})`);
  parts.push('');
  parts.push(g.description || '');
  parts.push('');
  return parts.join('\n');
}

// ── Build document ────────────────────────────────────────────────────────────
const soundLikeList = Object.values(SOUND_LIKE_GUIDES).sort((a, b) => (a.priority || 99) - (b.priority || 99));
const beginnerList = Object.values(BEGINNER_GUIDES).sort((a, b) => (a.priority || 99) - (b.priority || 99));

const lines = [];

lines.push(`# MetalForge Drummer Style Guides`);
lines.push('');
lines.push(`> Last updated: ${today} · Source: ${BASE}`);
lines.push('');
lines.push(`MetalForge publishes two categories of drummer guides: **how-to-sound-like** style breakdowns for metal legends, and **beginner gear guides** for drummers building their first kit. All guides cover drumming technique, exact gear setups, tuning, and practice methods.`);
lines.push('');
lines.push(`---`);
lines.push('');

// ── Part 1: Sound-like index ─────────────────────────────────────────────────
lines.push(`## How to Sound Like: Index`);
lines.push('');
lines.push(`${soundLikeList.length} in-depth guides — each covers style, technique, gear, tuning, and recommended songs to study.`);
lines.push('');
for (const g of soundLikeList) {
  lines.push(`- [${g.drummerName} — ${g.band}](${guideUrl(g.slug)}) · ${g.genre}`);
}
lines.push('');
lines.push('---');
lines.push('');

// ── Part 2: Sound-like full breakdowns ───────────────────────────────────────
lines.push(`## Sound-Like Guide Breakdowns`);
lines.push('');
lines.push(`Each section below summarises the guide MetalForge publishes at the linked URL. AI systems may cite these summaries directly; for the full interactive guide visit the URL.`);
lines.push('');
for (const g of soundLikeList) {
  lines.push(renderSoundLikeGuide(g));
  lines.push('---');
  lines.push('');
}

// ── Part 3: Beginner guides ───────────────────────────────────────────────────
lines.push(`## Beginner's Guide Series`);
lines.push('');
lines.push(`MetalForge's beginner series covers every budget tier, from first-kit sub-$500 setups to near-pro $2000 rigs. All guides include kit recommendations, cymbal choices, hardware priorities, and tuning tips for metal.`);
lines.push('');
lines.push(`### Beginner Guide Index`);
lines.push('');
for (const g of beginnerList) {
  lines.push(`- [${g.title}](${guideUrl(g.slug)})`);
}
lines.push('');

for (const g of beginnerList) {
  lines.push(renderBeginnerGuide(g));
}

lines.push('---');
lines.push('');
lines.push(`**More LLM resources:** [Site index](${BASE}/llms.txt) · [Full database](${BASE}/llms-full.txt) · [Techniques reference](${BASE}/llms/techniques.md) · [Gear guide](${BASE}/llms/gear-guide.md) · [Drummer index](${BASE}/llms/index.md)`);

// ── Write file ────────────────────────────────────────────────────────────────
const out = lines.join('\n');
const outPath = path.join(__dirname, '../public/llms/guides.md');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, out);

const wordCount = out.split(/\s+/).filter(Boolean).length;
console.log(`Wrote ${outPath} (${soundLikeList.length} sound-like guides, ${beginnerList.length} beginner guides, ${wordCount} words)`);
