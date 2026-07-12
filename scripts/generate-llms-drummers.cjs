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

// --- Load verified snares (index by drummerSlug) ----------------------------------
// Issue #4311 (phase 3/4 of epic #4308): cross-links the /snares/signature/<drummer>
// pages (isSignature: true) or the /snares hub (verified, non-signature) into each
// drummer's markdown, same regex+eval extraction pattern used above.
const snaresPath = path.join(__dirname, '../packages/frontend/data/snares.js');
let snaresByDrummerSlug = {};
try {
  const snaresContent = fs.readFileSync(snaresPath, 'utf-8');
  const snaresMatch = snaresContent.match(/export const SNARES = (\[[\s\S]*?\n\]);/);
  if (snaresMatch) {
    const snares = eval(snaresMatch[1]);
    for (const snare of snares) {
      snaresByDrummerSlug[snare.drummerSlug] = snare;
    }
  }
} catch (e) {
  console.warn('Could not load snares, continuing without them:', e.message);
}

// --- Load verified cymbal setups (index by drummerSlug) ---------------------------
// Issue #4306 (phase 3/4 of epic #4303): cross-links the /cymbals/setups/<drummer>
// pages into each drummer's markdown, same regex+eval extraction pattern used above.
const cymbalSetupsPath = path.join(__dirname, '../packages/frontend/data/cymbalSetups.js');
let cymbalSetupsByDrummerSlug = {};
try {
  const cymbalSetupsContent = fs.readFileSync(cymbalSetupsPath, 'utf-8');
  const cymbalSetupsMatch = cymbalSetupsContent.match(/export const CYMBAL_SETUPS = (\[[\s\S]*?\n\]);/);
  if (cymbalSetupsMatch) {
    const cymbalSetups = eval(cymbalSetupsMatch[1]);
    for (const setup of cymbalSetups) {
      cymbalSetupsByDrummerSlug[setup.drummerSlug] = setup;
    }
  }
} catch (e) {
  console.warn('Could not load cymbal setups, continuing without them:', e.message);
}

// --- Load verified pedals (index by drummerSlug) -----------------------------------
// Issue #4393 (phase 3/4 of epic #4387): cross-links the /pedals/setups/<drummer>
// pages into each drummer's markdown, same regex+eval extraction pattern used above.
const pedalsPath = path.join(__dirname, '../packages/frontend/data/pedals.js');
let pedalsByDrummerSlug = {};
try {
  const pedalsContent = fs.readFileSync(pedalsPath, 'utf-8');
  const pedalsMatch = pedalsContent.match(/export const PEDALS = (\[[\s\S]*?\n\]);/);
  if (pedalsMatch) {
    const pedals = eval(pedalsMatch[1]);
    for (const pedal of pedals) {
      pedalsByDrummerSlug[pedal.drummerSlug] = pedal;
    }
  }
} catch (e) {
  console.warn('Could not load pedals, continuing without them:', e.message);
}

const today = new Date().toISOString().split('T')[0];
const BASE = 'https://metalforge.io';

// --- Preserve hand-added sections the generator doesn't itself own ----------------
// Issue #4353: ~62 drummer files carry hand-written "## Kit Overview" prose and
// per-album Q&A sections (added directly to committed .md output by ~20 separate
// "Kit Overview prose batch" / album-article issues) that have no data-source
// representation. Regenerating from scratch silently deletes them. Rather than
// hardcoding those section names, any "## " section already present in a drummer's
// committed file that this generator doesn't itself produce is treated as
// hand-added and carried forward at its original anchor position.
const KNOWN_HEADERS = new Set([
  'Quick Facts',
  'Biography',
  'Band History',
  'Gear',
  'Notable Performances',
  'Frequently Asked Questions',
  'Quotes',
  'Signature Licks on MetalForge',
  'Snare',
  'Cymbal Setup',
  'Pedal',
]);
const FOOTER_MARKER = /\n---\n\n\*\*Full interactive profile:\*\*[\s\S]*$/;

// Parse an existing generated file into its "## " sections and pick out the ones
// this generator doesn't own, noting the known headers immediately before/after
// each one so it can be reinserted in the same relative position.
function parseExtraSections(oldContent) {
  if (!oldContent) return [];
  const lines = oldContent.split('\n');
  const blocks = [];
  let current = null;
  for (const line of lines) {
    const m = line.match(/^## (.+)$/);
    if (m) {
      current = { header: m[1].trim(), bodyLines: [] };
      blocks.push(current);
    } else if (current) {
      current.bodyLines.push(line);
    }
  }
  const extras = [];
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (KNOWN_HEADERS.has(b.header)) continue;
    const body = b.bodyLines.join('\n').replace(FOOTER_MARKER, '').replace(/^\n+/, '').replace(/\n+$/, '');
    let following = null;
    for (let j = i + 1; j < blocks.length; j++) {
      if (KNOWN_HEADERS.has(blocks[j].header)) { following = blocks[j].header; break; }
    }
    let preceding = null;
    for (let j = i - 1; j >= 0; j--) {
      if (KNOWN_HEADERS.has(blocks[j].header)) { preceding = blocks[j].header; break; }
    }
    extras.push({ header: b.header, body, following, preceding });
  }
  return extras;
}

// Some known, bullet-list sections (e.g. "## Gear") have also had a hand-written
// prose paragraph appended after the list in a handful of files (e.g. cross-links
// to a "vs" comparison page — see #3443) — content this generator never itself
// produces there. Detect and preserve that trailing prose per known header so it
// isn't silently dropped when the section's bullet list is rebuilt fresh. Limited
// to headers whose generated template is *just* a bullet list with nothing after
// it — sections like "Signature Licks on MetalForge" legitimately end with their
// own trailing sentence and must not be treated as carrying hand-added extras.
const TRAILER_ELIGIBLE_HEADERS = new Set(['Band History', 'Gear', 'Notable Performances']);

function parseKnownSectionTrailers(oldContent) {
  if (!oldContent) return {};
  const lines = oldContent.split('\n');
  const blocks = [];
  let current = null;
  for (const line of lines) {
    const m = line.match(/^## (.+)$/);
    if (m) {
      current = { header: m[1].trim(), bodyLines: [] };
      blocks.push(current);
    } else if (current) {
      current.bodyLines.push(line);
    }
  }
  const trailers = {};
  for (const b of blocks) {
    if (!TRAILER_ELIGIBLE_HEADERS.has(b.header)) continue;
    const body = b.bodyLines.join('\n').replace(FOOTER_MARKER, '');
    const bodyLines = body.split('\n');
    let lastBulletIdx = -1;
    for (let i = 0; i < bodyLines.length; i++) {
      if (/^- /.test(bodyLines[i])) lastBulletIdx = i;
    }
    if (lastBulletIdx === -1) continue;
    const trailing = bodyLines.slice(lastBulletIdx + 1).join('\n').trim();
    if (trailing) trailers[b.header] = trailing;
  }
  return trailers;
}

// Merge preserved extras back into the freshly generated known sections, anchored
// by the known header that followed them (falling back to the one that preceded
// them, then to the end) so hand-added content survives regeneration.
function mergeExtraSections(knownSections, extras) {
  if (extras.length === 0) return knownSections;
  const knownHeadersPresent = new Set(knownSections.map((s) => s.header));
  const result = [];
  const used = new Set();
  for (const known of knownSections) {
    for (const extra of extras) {
      if (used.has(extra)) continue;
      if (extra.following === known.header) {
        result.push({ header: extra.header, body: extra.body });
        used.add(extra);
      }
    }
    result.push(known);
  }
  for (const extra of extras) {
    if (used.has(extra)) continue;
    if (extra.preceding && knownHeadersPresent.has(extra.preceding)) {
      const idx = result.findIndex((s) => s.header === extra.preceding);
      result.splice(idx + 1, 0, { header: extra.header, body: extra.body });
      used.add(extra);
    }
  }
  for (const extra of extras) {
    if (used.has(extra)) continue;
    result.push({ header: extra.header, body: extra.body });
    used.add(extra);
  }
  return result;
}

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

  // --- Known sections, built as a list so hand-added extras (see #4353) can be
  // spliced back in at their original position rather than concatenated in-line.
  const sections = [];

  // --- Quick Facts table -------------------------------------------------------
  let quickFacts = `| Fact | Value |\n|---|---|\n`;
  quickFacts += `| Name | ${drummer.name} |\n`;
  quickFacts += `| Band | ${drummer.band} |\n`;
  if (drummer.bands && drummer.bands.length > 1) {
    quickFacts += `| All bands | ${drummer.bands.map((b) => b.name).join(', ')} |\n`;
  }
  if (drummer.genre) quickFacts += `| Genre | ${drummer.genre} |\n`;
  if (drummer.country) quickFacts += `| Country | ${drummer.country} |\n`;
  if (primaryBrand) quickFacts += `| Primary brand | ${primaryBrand} |\n`;
  if (drummer.gear && drummer.gear.drums) quickFacts += `| Drum kit | ${drummer.gear.drums} |\n`;
  if (drummer.gear && drummer.gear.snare) quickFacts += `| Signature snare | ${drummer.gear.snare} |\n`;
  if (drummer.gear && drummer.gear.sticks) quickFacts += `| Sticks | ${drummer.gear.sticks} |\n`;
  sections.push({ header: 'Quick Facts', body: quickFacts });

  // --- Biography ---------------------------------------------------------------
  let bio = `${drummer.bio}\n`;
  if (extBio.sections && extBio.sections.overview && extBio.sections.overview.content) {
    bio += `\n${extBio.sections.overview.content}\n`;
  }
  sections.push({ header: 'Biography', body: bio });

  // --- Band history ------------------------------------------------------------
  if (drummer.bands && drummer.bands.length > 0) {
    let bandHistory = '';
    for (const band of drummer.bands) {
      bandHistory += `- **${band.name}** — ${band.period}${band.current ? ' (current)' : ''}\n`;
    }
    sections.push({ header: 'Band History', body: bandHistory });
  }

  // --- Gear --------------------------------------------------------------------
  if (drummer.gear) {
    const g = drummer.gear;
    let gear = '';
    if (g.drums) gear += `- **Drums:** ${g.drums}\n`;
    if (g.snare) gear += `- **Snare:** ${g.snare}\n`;
    if (g.cymbals) gear += `- **Cymbals:** ${g.cymbals}\n`;
    if (g.hardware) gear += `- **Hardware:** ${g.hardware}\n`;
    if (g.sticks) gear += `- **Sticks:** ${g.sticks}\n`;
    if (g.heads) gear += `- **Heads:** ${g.heads}\n`;
    if (g.pedals) gear += `- **Pedals:** ${g.pedals}\n`;
    if (g.electronics) gear += `- **Electronics:** ${g.electronics}\n`;
    sections.push({ header: 'Gear', body: gear });
  }

  // --- Notable songs / performances (videos) -----------------------------------
  if (drummer.videos && drummer.videos.length > 0) {
    let performances = '';
    for (const v of drummer.videos) {
      performances += `- ${v.title}${v.year ? ` (${v.year})` : ''}\n`;
    }
    sections.push({ header: 'Notable Performances', body: performances });
  }

  // --- FAQ (from extended bio when present, else a derived baseline) ------------
  let faq = '';
  let faqCount = 0;
  if (extBio.sections && extBio.sections.faq && extBio.sections.faq.items) {
    for (const item of extBio.sections.faq.items) {
      faq += `**Q: ${item.q}**\n\nA: ${item.a}\n\n`;
      faqCount++;
    }
  }
  // Guarantee ≥3 Q&A using only data we actually have.
  if (faqCount < 3) {
    if (drummer.gear && drummer.gear.drums) {
      faq += `**Q: What drum kit does ${drummer.name} play?**\n\nA: ${drummer.name} plays a ${drummer.gear.drums}.\n\n`;
      faqCount++;
    }
    if (faqCount < 3 && drummer.gear && drummer.gear.cymbals) {
      faq += `**Q: What cymbals does ${drummer.name} use?**\n\nA: ${drummer.name} uses ${drummer.gear.cymbals}.\n\n`;
      faqCount++;
    }
    if (faqCount < 3) {
      faq += `**Q: What band is ${drummer.name} in?**\n\nA: ${drummer.name} drums for ${drummer.band}${drummer.genre ? `, a ${drummer.genre.toLowerCase()} band` : ''}.\n\n`;
      faqCount++;
    }
    if (faqCount < 3 && drummer.gear && drummer.gear.snare) {
      faq += `**Q: What snare does ${drummer.name} use?**\n\nA: ${drummer.name} uses a ${drummer.gear.snare}.\n\n`;
      faqCount++;
    }
  }
  sections.push({ header: 'Frequently Asked Questions', body: faq.replace(/\n+$/, '') });

  // --- Quotes ------------------------------------------------------------------
  if (drummer.quotes && drummer.quotes.length > 0) {
    let quotes = '';
    for (const q of drummer.quotes) {
      quotes += `> "${q.text}"\n>\n> — ${q.source}${q.year ? ` (${q.year})` : ''}\n\n`;
    }
    sections.push({ header: 'Quotes', body: quotes.replace(/\n+$/, '') });
  }

  // --- Signature Licks cross-reference (omit section when drummer has none) -------
  const drummerLicks = licksByDrummerSlug[slug] || [];
  if (drummerLicks.length > 0) {
    let licks = `MetalForge has ${drummerLicks.length} signature lick tutorial(s) for ${drummer.name}:\n\n`;
    for (const lick of drummerLicks) {
      licks += `- [${lick.name}](${BASE}/drummers/${slug}/licks/${lick.slug})\n`;
    }
    licks += `\nEach lick page includes a video demonstration, HowTo breakdown, and gear notes.\n`;
    sections.push({ header: 'Signature Licks on MetalForge', body: licks });
  }

  // --- Snare cross-reference (Issue #4311, phase 3/4 of epic #4308) -------------
  // Omit the section entirely when there's no verified snare record — never
  // fabricate a signature-page link for an unverified drummer.
  const snareRecord = snaresByDrummerSlug[slug];
  if (snareRecord) {
    let snare;
    if (snareRecord.isSignature) {
      snare = `${drummer.name} plays a signature snare: the ${snareRecord.brand} ${snareRecord.model} ` +
        `(${snareRecord.sizeIn}x${snareRecord.depthIn}"${snareRecord.shellMaterial ? `, ${snareRecord.shellMaterial} shell` : ''}). ` +
        `Full specs: [${drummer.name}'s signature snare](${BASE}/snares/signature/${slug}).\n`;
    } else {
      snare = `${drummer.name}'s snare: ${snareRecord.summary}. See the [snares guide](${BASE}/snares) for shell, size, and tuning background.\n`;
    }
    sections.push({ header: 'Snare', body: snare });
  }

  // --- Cymbal Setup cross-reference (Issue #4306, phase 3/4 of epic #4303) ------
  // Omit the section entirely when there's no verified cymbal setup — never
  // fabricate a setup-page link for an unverified drummer.
  const cymbalSetup = cymbalSetupsByDrummerSlug[slug];
  if (cymbalSetup) {
    let cymbal = `${drummer.name}'s cymbals: ${cymbalSetup.summary}.\n\n`;
    if (cymbalSetup.pieces.length > 0) {
      cymbal += `| Piece | Size | Series | Model |\n`;
      cymbal += `|---|---|---|---|\n`;
      for (const piece of cymbalSetup.pieces) {
        cymbal += `| ${piece.type} | ${piece.sizeIn}" | ${piece.series || '—'} | ${piece.model} |\n`;
      }
      cymbal += `\n`;
    }
    cymbal += `Full breakdown: [${drummer.name}'s cymbal setup](${BASE}/cymbals/setups/${slug}).\n`;
    sections.push({ header: 'Cymbal Setup', body: cymbal });
  }

  // --- Pedal cross-reference (Issue #4393, phase 3/4 of epic #4387) ------------
  // Omit the section entirely when there's no verified pedal record — never
  // fabricate a setup-page link for an unverified drummer. Descriptor/phrase
  // logic mirrors data/pedalSetupPages.js's generatePedalSetupDirectAnswer().
  const pedalRecord = pedalsByDrummerSlug[slug];
  if (pedalRecord) {
    const descriptor = pedalRecord.brand && pedalRecord.model
      ? `${pedalRecord.brand} ${pedalRecord.model}`
      : pedalRecord.brand;
    let pedal;
    if (descriptor) {
      const configPhrase = pedalRecord.configuration === 'double' ? 'double pedal'
        : pedalRecord.configuration === 'single'
          ? (/\(x2\)/i.test(pedalRecord.summary) ? 'single pedals (x2)' : 'single pedal')
          : 'pedal';
      const driveSuffix = pedalRecord.driveType ? ` (${pedalRecord.driveType}-drive)` : '';
      const article = configPhrase.endsWith('(x2)') ? '' : (/^[aeiou]/i.test(descriptor) ? 'an ' : 'a ');
      pedal = `${drummer.name} plays ${article}${descriptor} ${configPhrase}${driveSuffix}.\n`;
    } else {
      pedal = `${drummer.name} plays a ${pedalRecord.summary}.\n`;
    }
    pedal += `\nFull breakdown: [${drummer.name}'s pedal setup](${BASE}/pedals/setups/${slug}).\n`;
    sections.push({ header: 'Pedal', body: pedal });
  }

  // --- Preserve hand-added sections (Kit Overview, per-album Q&A, ...) not
  // produced by this generator, reading them back from the previously committed
  // file so `npm run generate:llms` doesn't delete them. See #4353.
  const existingPath = path.join(outDir, `${slug}.md`);
  let existingContent = null;
  try {
    existingContent = fs.readFileSync(existingPath, 'utf-8');
  } catch (e) {
    // No previously generated file (new drummer) — nothing to preserve.
  }
  const extras = parseExtraSections(existingContent);
  const trailers = parseKnownSectionTrailers(existingContent);
  for (const section of sections) {
    if (trailers[section.header]) {
      section.body = `${section.body.replace(/\n+$/, '')}\n\n${trailers[section.header]}`;
    }
  }
  const mergedSections = mergeExtraSections(sections, extras);

  for (const section of mergedSections) {
    md += `## ${section.header}\n\n${section.body.replace(/\n+$/, '')}\n\n`;
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
