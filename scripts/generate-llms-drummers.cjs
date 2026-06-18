#!/usr/bin/env node
/**
 * Generate public/llms/drummers/<slug>.md - one clean Markdown profile per drummer.
 * Issue #873 - /llms/<drummer-slug>.md markdown endpoints + populate /public/llms/
 *
 * AI crawlers (GPTBot, ClaudeBot, PerplexityBot, ...) can ingest a full drummer
 * profile in one request without parsing React/HTML. Mirrors the llms.txt philosophy.
 *
 * Style + data-extraction approach intentionally mirrors the sibling generators
 * generate-llms-full.cjs / generate-llms-index.cjs (regex + controlled eval over
 * api/drummers/index.js), so all three stay in sync from the same source of truth.
 */

const fs = require('fs');
const path = require('path');

// --- Load drummers (same regex+eval extraction as generate-llms-full.cjs) ---------
const drummersPath = path.join(__dirname, '../api/drummers/index.js');
const drummersContent = fs.readFileSync(drummersPath, 'utf-8');

const arrayMatch = drummersContent.match(/const drummers = (\[[\s\S]*?\]);[\s\S]*?export default function handler/);
if (!arrayMatch) {
  console.error('Could not extract drummers array from api/drummers/index.js');
  process.exit(1);
}

let drummers;
try {
  drummers = eval(arrayMatch[1]);
} catch (e) {
  console.error('Error parsing drummers:', e);
  process.exit(1);
}

// --- Load extended bios (optional enrichment) ------------------------------------
const extendedBiosPath = path.join(__dirname, '../packages/frontend/data/extendedBios.js');
let extendedBios = {};
try {
  const extendedBiosContent = fs.readFileSync(extendedBiosPath, 'utf-8');
  const bioMatch = extendedBiosContent.match(/export const extendedBios = (\{[\s\S]*\});/);
  if (bioMatch) {
    extendedBios = eval(`(function() { return ${bioMatch[1]}; })()`);
  }
} catch (e) {
  console.warn('Could not parse extended bios, continuing without them:', e.message);
}

// --- Load signature licks (index by drummerSlug) ---------------------------------
// ES module lick files are loaded via regex+eval, same pattern as extendedBios.
const licksDir = path.join(__dirname, '../packages/frontend/data/licks');
// Map: drummerSlug -> Array<{ slug, name }>
const licksByDrummerSlug = {};
try {
  const lickFiles = fs.readdirSync(licksDir).filter(f => f.endsWith('.js') && f !== 'index.js');
  for (const lickFile of lickFiles) {
    const lickContent = fs.readFileSync(path.join(licksDir, lickFile), 'utf-8');
    const transformed = lickContent
      .replace(/^export const /gm, 'const ')
      .replace(/^export default .*;/gm, '');
    let fileLicks;
    try {
      fileLicks = eval(`(function() { ${transformed}; return licks; })()`);
    } catch (e) {
      console.warn(`Could not parse lick file ${lickFile}:`, e.message);
      continue;
    }
    for (const lick of Object.values(fileLicks)) {
      const ds = lick.drummerSlug;
      if (!ds) continue;
      if (!licksByDrummerSlug[ds]) licksByDrummerSlug[ds] = [];
      licksByDrummerSlug[ds].push({ slug: lick.slug, name: lick.name });
    }
  }
} catch (e) {
  console.warn('Could not load signature licks, continuing without them:', e.message);
}

const today = new Date().toISOString().split('T')[0];
const BASE = 'https://metalforge.io';

function generateSlug(name) {
  return name.toLowerCase()
    .replace(/[åä]/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u')
    .replace(/é|è|ê|ë/g, 'e').replace(/í|ì|î|ï/g, 'i').replace(/ó|ò|ô/g, 'o')
    .replace(/ú|ù|û/g, 'u').replace(/ñ/g, 'n').replace(/ß/g, 'ss')
    .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// Best-effort primary brand: first brand word of the drum kit, else first endorsement.
// Returns null when nothing reliable is available (don't fabricate).
function derivePrimaryBrand(drummer) {
  if (drummer.gear && drummer.gear.drums) {
    const first = String(drummer.gear.drums).trim().split(/\s+/)[0];
    if (first && /^[A-Za-z]/.test(first)) return first;
  }
  if (drummer.endorsements && drummer.endorsements.length) {
    // Strip trailing product-category words for a cleaner brand name.
    return drummer.endorsements[0].name.replace(/\s+(Drums|Cymbals|Drumsticks|Drumheads|Hardware)$/i, '');
  }
  return null;
}

// Escape a value for safe single-line YAML (quote it, escape embedded quotes).
function yaml(value) {
  return `"${String(value).replace(/"/g, '\\"')}"`;
}

function buildMarkdown(drummer) {
  const slug = generateSlug(drummer.name);
  const extBio = extendedBios[slug] || {};
  const primaryBrand = derivePrimaryBrand(drummer);
  const profileUrl = `${BASE}/drummer/${slug}`;

  // --- YAML frontmatter (omit rows we can't derive — never fabricate) ----------
  let md = `---\n`;
  md += `name: ${yaml(drummer.name)}\n`;
  md += `band: ${yaml(drummer.band)}\n`;
  md += `genre: ${yaml(drummer.genre)}\n`;
  if (drummer.country) md += `country: ${yaml(drummer.country)}\n`;
  if (primaryBrand) md += `primary_brand: ${yaml(primaryBrand)}\n`;
  md += `profile_url: ${yaml(profileUrl)}\n`;
  md += `source: ${yaml(BASE)}\n`;
  md += `last_updated: ${yaml(today)}\n`;
  md += `---\n\n`;

  md += `# ${drummer.name} — Drum Kit & Gear Setup\n\n`;
  md += `${drummer.name}'s drum kit and gear setup. ${drummer.name} is a professional metal drummer best known for their work with ${drummer.band}`;
  md += drummer.genre ? `, a defining act in ${drummer.genre.toLowerCase()}.\n\n` : `.\n\n`;

  // --- Quick Facts table -------------------------------------------------------
  md += `## Quick Facts\n\n`;
  md += `| Fact | Value |\n|---|---|\n`;
  md += `| Name | ${drummer.name} |\n`;
  md += `| Band | ${drummer.band} |\n`;
  if (drummer.bands && drummer.bands.length > 1) {
    md += `| All bands | ${drummer.bands.map((b) => b.name).join(', ')} |\n`;
  }
  if (drummer.genre) md += `| Genre | ${drummer.genre} |\n`;
  if (drummer.country) md += `| Country | ${drummer.country} |\n`;
  if (primaryBrand) md += `| Primary brand | ${primaryBrand} |\n`;
  if (drummer.gear && drummer.gear.drums) md += `| Drum kit | ${drummer.gear.drums} |\n`;
  if (drummer.gear && drummer.gear.snare) md += `| Signature snare | ${drummer.gear.snare} |\n`;
  if (drummer.gear && drummer.gear.sticks) md += `| Sticks | ${drummer.gear.sticks} |\n`;
  md += `\n`;

  // --- Biography ---------------------------------------------------------------
  md += `## Biography\n\n${drummer.bio}\n\n`;
  if (extBio.sections && extBio.sections.overview && extBio.sections.overview.content) {
    md += `${extBio.sections.overview.content}\n\n`;
  }

  // --- Band history ------------------------------------------------------------
  if (drummer.bands && drummer.bands.length > 0) {
    md += `## Band History\n\n`;
    for (const band of drummer.bands) {
      md += `- **${band.name}** — ${band.period}${band.current ? ' (current)' : ''}\n`;
    }
    md += `\n`;
  }

  // --- Gear --------------------------------------------------------------------
  if (drummer.gear) {
    md += `## Gear\n\n`;
    const g = drummer.gear;
    if (g.drums) md += `- **Drums:** ${g.drums}\n`;
    if (g.snare) md += `- **Snare:** ${g.snare}\n`;
    if (g.cymbals) md += `- **Cymbals:** ${g.cymbals}\n`;
    if (g.hardware) md += `- **Hardware:** ${g.hardware}\n`;
    if (g.sticks) md += `- **Sticks:** ${g.sticks}\n`;
    if (g.heads) md += `- **Heads:** ${g.heads}\n`;
    if (g.pedals) md += `- **Pedals:** ${g.pedals}\n`;
    if (g.electronics) md += `- **Electronics:** ${g.electronics}\n`;
    md += `\n`;
  }

  // --- Notable songs / performances (videos) -----------------------------------
  if (drummer.videos && drummer.videos.length > 0) {
    md += `## Notable Performances\n\n`;
    for (const v of drummer.videos) {
      md += `- ${v.title}${v.year ? ` (${v.year})` : ''}\n`;
    }
    md += `\n`;
  }

  // --- FAQ (from extended bio when present, else a derived baseline) ------------
  md += `## Frequently Asked Questions\n\n`;
  let faqCount = 0;
  if (extBio.sections && extBio.sections.faq && extBio.sections.faq.items) {
    for (const faq of extBio.sections.faq.items) {
      md += `**Q: ${faq.q}**\n\nA: ${faq.a}\n\n`;
      faqCount++;
    }
  }
  // Guarantee ≥3 Q&A using only data we actually have.
  if (faqCount < 3) {
    if (drummer.gear && drummer.gear.drums) {
      md += `**Q: What drum kit does ${drummer.name} play?**\n\nA: ${drummer.name} plays a ${drummer.gear.drums}.\n\n`;
      faqCount++;
    }
    if (faqCount < 3 && drummer.gear && drummer.gear.cymbals) {
      md += `**Q: What cymbals does ${drummer.name} use?**\n\nA: ${drummer.name} uses ${drummer.gear.cymbals}.\n\n`;
      faqCount++;
    }
    if (faqCount < 3) {
      md += `**Q: What band is ${drummer.name} in?**\n\nA: ${drummer.name} drums for ${drummer.band}${drummer.genre ? `, a ${drummer.genre.toLowerCase()} band` : ''}.\n\n`;
      faqCount++;
    }
    if (faqCount < 3 && drummer.gear && drummer.gear.snare) {
      md += `**Q: What snare does ${drummer.name} use?**\n\nA: ${drummer.name} uses a ${drummer.gear.snare}.\n\n`;
      faqCount++;
    }
  }

  // --- Quotes ------------------------------------------------------------------
  if (drummer.quotes && drummer.quotes.length > 0) {
    md += `## Quotes\n\n`;
    for (const q of drummer.quotes) {
      md += `> "${q.text}"\n>\n> — ${q.source}${q.year ? ` (${q.year})` : ''}\n\n`;
    }
  }

  // --- Signature Licks cross-reference (omit section when drummer has none) -------
  const drummerLicks = licksByDrummerSlug[slug] || [];
  if (drummerLicks.length > 0) {
    md += `## Signature Licks on MetalForge\n\n`;
    md += `MetalForge has ${drummerLicks.length} signature lick tutorial(s) for ${drummer.name}:\n\n`;
    for (const lick of drummerLicks) {
      md += `- [${lick.name}](${BASE}/drummers/${slug}/licks/${lick.slug})\n`;
    }
    md += `\nEach lick page includes a video demonstration, HowTo breakdown, and gear notes.\n\n`;
  }

  // --- Footer / cross-links ----------------------------------------------------
  md += `---\n\n`;
  md += `**Full interactive profile:** [${drummer.name} on MetalForge](${profileUrl})\n\n`;
  md += `**More LLM resources:** [Site index](${BASE}/llms.txt) · [Full database](${BASE}/llms-full.txt) · [Drummer markdown index](${BASE}/llms/index.md)\n\n`;
  md += `*Last updated: ${today} · Source: [MetalForge.io](${BASE})*\n`;

  return { slug, md };
}

// --- Write files -----------------------------------------------------------------
const outDir = path.join(__dirname, '../public/llms/drummers');
fs.mkdirSync(outDir, { recursive: true });

let written = 0;
let minWords = Infinity;
for (const drummer of drummers) {
  const { slug, md } = buildMarkdown(drummer);
  fs.writeFileSync(path.join(outDir, `${slug}.md`), md);
  const words = md.split(/\s+/).filter(Boolean).length;
  if (words < minWords) minWords = words;
  written++;
}

console.log(`✅ Generated public/llms/drummers/*.md — ${written} drummers (min ${minWords} words/file)`);
