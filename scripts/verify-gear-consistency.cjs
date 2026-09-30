#!/usr/bin/env node
// Read-only cross-file drift detector for gear facts (brand/model for drums,
// cymbals, sticks, heads, hardware).
//
// Why this exists: the same bug class kept getting rediscovered by hand, one
// drummer/one file at a time — a gear fact drifts stale or gets cross-
// contaminated from another drummer's entry in a "consumer" data file, while
// packages/frontend/data/endorsementNews.js (the established source of truth,
// per .agents/ceo/decisions-log.md precedent) has the correct, current fact.
// Examples: #8180 (Martin Axenrot rig fabricated across both studies/ files),
// #7651 (stale gearIndex.js never resynced), #6130 (Arin Ilejay self-
// contradiction inside endorsementNews.js itself), #8125 ("Pearl Demon Drive"
// boilerplate cross-contaminated onto 6 unrelated drummers).
//
// `scripts/verify-data-modules.mjs` only checks structural entry counts
// (early-`}` bugs), not factual consistency. This script is the missing
// factual-consistency guard.
//
// Ground truth: packages/frontend/data/endorsementNews.js — per drummer, per
// category, `currentEndorsements[category].brand` is the current brand, and
// every `timeline[]` entry's `from`/`to` values for that category are brands
// that were once true for THAT drummer (own-history mentions are legitimate,
// not drift, even when they show up inside an otherwise "current" field —
// e.g. a model string noting "(earlier)").
//
// Scope guard: this only checks fields that represent CURRENT state. Era /
// evolution narrative content elsewhere in these files is intentional
// editorial content, not a bug, and is deliberately left unchecked.

const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'packages/frontend/data');
const CATEGORIES = ['drums', 'cymbals', 'sticks', 'heads', 'hardware'];

const UNSURE_RE = /not\s+(publicly\s+)?(documented|confirmed|announced)|unconfirmed|never\s+publicly|undocumented|brand\s+unconfirmed/i;

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Word-boundary containment check that works even when `brand` starts/ends
// with a non-word character (e.g. "British Drum Co."), where a plain `\b`
// anchor would fail to match at all.
function containsBrand(text, brand) {
  if (!text || !brand) return false;
  const re = new RegExp(`(?<![A-Za-z0-9])${escapeRegex(brand)}(?![A-Za-z0-9])`, 'i');
  return re.test(text);
}

// Multi-word brand names are routinely abbreviated to their first word in
// prose (ground truth "SJC Custom Drums" shows up as plain "SJC" — same
// company, not a different brand), so also accept a match on just the first
// word when the full name isn't found verbatim.
function brandMatches(text, brand) {
  if (containsBrand(text, brand)) return true;
  const firstWord = brand.split(/\s+/)[0];
  if (firstWord && firstWord.length >= 3 && firstWord !== brand) {
    return containsBrand(text, firstWord);
  }
  return false;
}

// A ground-truth brand field is sometimes "Brand A / Brand B" (dual
// endorsement) or "Brand A or Brand B" (uncertain-which) — split into
// individual candidates. A bare "unconfirmed" means no confident ground
// truth exists for that drummer/category, so it yields no candidates.
function parseBrandCandidates(brandField) {
  if (!brandField) return [];
  return brandField
    .split(/\s*\/\s*|\s+or\s+/i)
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((p) => !/^unconfirmed$|^unknown$|^tbd$/i.test(p));
}

function makeLineFinder(content) {
  const offsets = [0];
  for (let i = 0; i < content.length; i++) {
    if (content[i] === '\n') offsets.push(i + 1);
  }
  return (index) => {
    let lo = 0;
    let hi = offsets.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (offsets[mid] <= index) lo = mid;
      else hi = mid - 1;
    }
    return lo + 1;
  };
}

function addBrand(map, brand) {
  if (!brand) return;
  const key = brand.toLowerCase();
  if (!map.has(key)) map.set(key, brand);
}

// Generic brace/bracket-depth scanner for data files with nested objects
// (drumKit.config, product.specs, etc.) where a plain "stop at the first
// closing brace" regex would truncate before reaching the field we want.
function skipStringLiteral(content, i) {
  const quote = content[i];
  i++;
  while (i < content.length) {
    if (content[i] === '\\') { i += 2; continue; }
    if (content[i] === quote) return i + 1;
    i++;
  }
  return i;
}

function findMatchingBracket(content, openIdx) {
  let depth = 0;
  for (let i = openIdx; i < content.length; i++) {
    const c = content[i];
    if (c === '"' || c === "'" || c === '`') { i = skipStringLiteral(content, i) - 1; continue; }
    if (c === '{' || c === '[' || c === '(') depth++;
    else if (c === '}' || c === ']' || c === ')') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

// Locate the `key: {`/`key: [` (quotes around the key optional) object or
// array starting after `fromIndex` (bounded by `toIndex`) and return its
// brace-matched span.
function findKeyObjectSpan(content, key, fromIndex, toIndex) {
  const end = toIndex == null ? content.length : toIndex;
  const re = new RegExp(`["']?${key}["']?:\\s*([{[])`);
  const m = re.exec(content.slice(fromIndex, end));
  if (!m) return null;
  const openIdx = fromIndex + m.index + m[0].length - 1;
  const closeIdx = findMatchingBracket(content, openIdx);
  if (closeIdx === -1) return null;
  return { start: openIdx, end: closeIdx };
}

// Yield each top-level `{...}` object directly inside an array/object span
// (skipping over further-nested objects rather than matching into them).
function topLevelObjects(content, spanStart, spanEnd) {
  const objs = [];
  let i = spanStart + 1;
  while (i < spanEnd) {
    const c = content[i];
    if (c === '"' || c === "'" || c === '`') { i = skipStringLiteral(content, i); continue; }
    if (c === '{') {
      const close = findMatchingBracket(content, i);
      if (close === -1 || close > spanEnd) break;
      objs.push({ start: i, end: close });
      i = close + 1;
      continue;
    }
    i++;
  }
  return objs;
}

function parseSinceYear(since) {
  if (!since) return null;
  const m = /(\d{4})/.exec(since);
  return m ? parseInt(m[1], 10) : null;
}

async function loadGroundTruth() {
  const href = pathToFileURL(path.join(DATA_DIR, 'endorsementNews.js')).href;
  const mod = await import(href);
  const timeline = mod.ENDORSEMENT_TIMELINE;

  const groundTruth = {};
  const globalBrands = {};
  for (const cat of CATEGORIES) globalBrands[cat] = new Map();

  for (const slug of Object.keys(timeline)) {
    const entry = timeline[slug];
    const current = entry.currentEndorsements || {};
    const changes = entry.timeline || [];
    groundTruth[slug] = { name: entry.name || slug, categories: {} };

    for (const cat of CATEGORIES) {
      const currentField = current[cat] || {};
      const candidates = parseBrandCandidates(currentField.brand);
      const historical = new Map();
      for (const change of changes) {
        if (change.category !== cat) continue;
        addBrand(historical, change.from);
        addBrand(historical, change.to);
      }
      groundTruth[slug].categories[cat] = {
        candidates,
        historical,
        currentBrand: currentField.brand || null,
        currentModel: currentField.model || null,
        currentSinceYear: parseSinceYear(currentField.since),
      };
      for (const c of candidates) addBrand(globalBrands[cat], c);
      for (const h of historical.values()) addBrand(globalBrands[cat], h);
    }
  }

  return { groundTruth, globalBrands };
}

// Core fact-check: does `text` confidently assert a brand that is neither the
// current brand nor a brand this specific drummer once had (own-history
// mentions inside a "current" field are legitimate editorial content, not
// drift)? Returns null when there's nothing confident to say either way
// (omit-if-unsure is a pass, not a gap).
function assess(text, slug, cat, groundTruth, globalBrands) {
  if (!text) return null;
  if (UNSURE_RE.test(text)) return { status: 'pass' };

  const gt = groundTruth[slug] && groundTruth[slug].categories[cat];
  if (!gt || gt.candidates.length === 0) return null;

  for (const cand of gt.candidates) {
    if (brandMatches(text, cand)) return { status: 'pass' };
  }
  for (const hist of gt.historical.values()) {
    if (brandMatches(text, hist)) return { status: 'pass' };
  }

  const exclude = new Set([
    ...gt.candidates.map((c) => c.toLowerCase()),
    ...gt.historical.keys(),
  ]);
  const candidatesFromGlobal = [...globalBrands[cat].entries()]
    .filter(([key]) => !exclude.has(key))
    .map(([, original]) => original)
    .sort((a, b) => b.length - a.length);

  for (const brand of candidatesFromGlobal) {
    if (containsBrand(text, brand)) {
      return { status: 'mismatch', found: brand, expected: gt.candidates.join(' / ') };
    }
  }
  return null;
}

function record(mismatches, slug, cat, file, lineNo, result) {
  mismatches.push({
    slug,
    cat,
    file,
    line: lineNo,
    expected: result.expected,
    found: result.found,
  });
}

function checkAndRecord(mismatches, text, slug, cat, file, lineNo, groundTruth, globalBrands) {
  const result = assess(text, slug, cat, groundTruth, globalBrands);
  if (result && result.status === 'mismatch') {
    record(mismatches, slug, cat, file, lineNo, result);
  }
}

function getTopLevelBlocks(content, keyRe) {
  const blocks = [];
  let m;
  while ((m = keyRe.exec(content))) {
    blocks.push({ slug: m[1], start: m.index });
  }
  for (let i = 0; i < blocks.length; i++) {
    blocks[i].end = i + 1 < blocks.length ? blocks[i + 1].start : content.length;
  }
  return blocks;
}

// packages/frontend/data/soundLikeGuides.js — the `gear` sub-object of each
// `how-to-sound-like-<slug>` entry (this file's own convention is
// current-only, confirmed in #6378/#6622/#6484).
function processSoundLikeGuides(groundTruth, globalBrands, mismatches) {
  const relFile = 'packages/frontend/data/soundLikeGuides.js';
  const content = fs.readFileSync(path.join(DATA_DIR, 'soundLikeGuides.js'), 'utf8');
  const lineOf = makeLineFinder(content);

  const blocks = getTopLevelBlocks(
    content,
    /\n {2}'how-to-sound-like-([a-z0-9-]+)':\s*\{/g
  );

  const directFields = [
    { objKey: 'drumKit', cat: 'drums' },
    { objKey: 'cymbals', cat: 'cymbals' },
    { objKey: 'sticks', cat: 'sticks' },
    { objKey: 'pedals', cat: 'hardware' },
  ];

  for (const { slug, start, end } of blocks) {
    if (!groundTruth[slug]) continue;
    const block = content.slice(start, end);

    for (const { objKey, cat } of directFields) {
      const re = new RegExp(`${objKey}:\\s*\\{\\s*brand:\\s*'((?:[^'\\\\]|\\\\.)*)'`, 'd');
      const mm = re.exec(block);
      if (!mm) continue;
      const value = mm[1];
      const idx = start + mm.indices[1][0];
      checkAndRecord(mismatches, value, slug, cat, relFile, lineOf(idx), groundTruth, globalBrands);
    }

    const headsRe = /heads:\s*\{([^}]*)\}/ds.exec(block);
    if (headsRe) {
      const sub = headsRe[1];
      const subStart = start + headsRe.indices[1][0];
      for (const field of ['kick', 'snare', 'toms', 'resonant']) {
        const fieldRe = new RegExp(`${field}:\\s*'((?:[^'\\\\]|\\\\.)*)'`, 'd');
        const fm = fieldRe.exec(sub);
        if (!fm) continue;
        const value = fm[1];
        const idx = subStart + fm.indices[1][0];
        checkAndRecord(mismatches, value, slug, 'heads', relFile, lineOf(idx), groundTruth, globalBrands);
      }
    }
  }
}

// packages/frontend/data/drummerComparisons.js — each comparison entry's
// per-drummer gear fields (no era concept; always presented as current).
// `comparison.gear` is free-text prose describing both drummers in the same
// string, so we split it into clauses and only attribute a clause to a
// drummer when it names exactly one of the pair — anything ambiguous (both
// or neither named) is skipped rather than guessed, to avoid false positives.
function normalizeForClauseSplit(text) {
  return text
    .replace(/\b(?:[A-Z]\.){2,}/g, (m) => m.replace(/\./g, ''))
    .replace(/\bCo\.(?=\s)/g, 'Co');
}

// A brand string is sometimes valid ground truth for more than one category
// (e.g. Zildjian makes both cymbals and sticks), so checking every category
// against a whole free-text clause risks cross-category contamination — a
// clause that only ever talks about cymbals could get its "cymbals" brand
// mistaken for a wrong "sticks" brand. Only evaluate a category when the
// clause actually names it.
const CATEGORY_KEYWORDS = {
  drums: /\b(drums?|kit)\b/i,
  cymbals: /\bcymbals?\b/i,
  sticks: /\bsticks?\b/i,
  heads: /\bheads?\b/i,
  hardware: /\b(pedals?|hardware)\b/i,
};

function processDrummerComparisons(groundTruth, globalBrands, mismatches) {
  const relFile = 'packages/frontend/data/drummerComparisons.js';
  const content = fs.readFileSync(path.join(DATA_DIR, 'drummerComparisons.js'), 'utf8');
  const lineOf = makeLineFinder(content);

  const blocks = getTopLevelBlocks(content, /\n {2}'([a-z0-9-]+)':\s*\{/g);

  for (const { start, end } of blocks) {
    const block = content.slice(start, end);

    const drummersMatch = /drummers:\s*\[\s*'([a-z0-9-]+)'\s*,\s*'([a-z0-9-]+)'\s*\]/.exec(block);
    const gearMatch = /gear:\s*'((?:[^'\\]|\\.)*)'/d.exec(block);
    if (!drummersMatch || !gearMatch) continue;

    const [slugA, slugB] = [drummersMatch[1], drummersMatch[2]];
    if (!groundTruth[slugA] && !groundTruth[slugB]) continue;

    const rawText = gearMatch[1];
    const lineNo = lineOf(start + gearMatch.indices[1][0]);

    const tokensFor = (slug) => {
      const name = groundTruth[slug] && groundTruth[slug].name;
      if (!name) return [];
      return name.split(/\s+/).filter(Boolean);
    };
    const tokensA = tokensFor(slugA);
    const tokensB = tokensFor(slugB);
    const mentions = (clause, tokens) =>
      tokens.some((t) => new RegExp(`\\b${escapeRegex(t)}\\b`).test(clause));

    const normalized = normalizeForClauseSplit(rawText);
    const clauses = normalized.split(/(?<=[.;])\s+/);

    for (const clause of clauses) {
      const hasA = groundTruth[slugA] && mentions(clause, tokensA);
      const hasB = groundTruth[slugB] && mentions(clause, tokensB);
      const target = hasA && !hasB ? slugA : hasB && !hasA ? slugB : null;
      if (!target || !groundTruth[target]) continue;
      for (const cat of CATEGORIES) {
        if (!CATEGORY_KEYWORDS[cat].test(clause)) continue;
        checkAndRecord(mismatches, clause, target, cat, relFile, lineNo, groundTruth, globalBrands);
      }
      // clause names both or neither drummer: ambiguous, skip.
    }
  }
}

// packages/frontend/data/gearPriceHistory.js — every entry is anchored to one
// specific historical album/era (`iconicYear`/`era`, often decades before
// "now" — e.g. Vinnie Paul's documents 1990's Cowboys from Hell), and the
// vintage `item`/`notes` fields track brand continuity with THAT era, not
// with the drummer's present-day endorsement (confirmed via git history,
// e.g. commit 2506e20e, which edits the era `item` and its
// `modernEquivalent.item` together in lockstep). Comparing those vintage
// fields to currentEndorsements produces false positives whenever a
// drummer's brand changed since that era — confirmed on vinnie-paul, whose
// hardware/heads would read as false mismatches purely because his entry
// predates his 2008 ddrum/Evans switch. So the vintage fields are
// deliberately left unchecked here.
//
// `modernEquivalent.item`, however, is explicitly framed as "what this gear
// looks like today" — and whenever it names the drummer's own signature
// model (e.g. "Pro-Mark Tomas Haake Signature", #8356), that's a current-
// state claim with exactly one right answer: which brand actually makes
// that drummer's signature line right now. That's narrow enough to check
// safely without the era-anchoring problem above (a non-signature
// modernEquivalent item, like Vinnie Paul's generic "DW 9002 Double Pedal",
// is never checked, since it never names him).
function nameAppears(text, name) {
  if (!text || !name) return false;
  const last = name.split(/\s+/).filter(Boolean).pop();
  if (!last || last.length < 3) return false;
  return containsBrand(text, last);
}

function processGearPriceHistory(groundTruth, globalBrands, mismatches) {
  const relFile = 'packages/frontend/data/gearPriceHistory.js';
  const content = fs.readFileSync(path.join(DATA_DIR, 'gearPriceHistory.js'), 'utf8');
  const lineOf = makeLineFinder(content);

  const blocks = getTopLevelBlocks(content, /\n {2}'([a-z0-9-]+)':\s*\{/g);

  for (const { slug, start, end } of blocks) {
    const gt = groundTruth[slug];
    if (!gt) continue;
    const block = content.slice(start, end);

    for (const cat of CATEGORIES) {
      const catSpan = findKeyObjectSpan(block, cat, 0);
      if (!catSpan) continue;
      const meSpan = findKeyObjectSpan(block, 'modernEquivalent', catSpan.start, catSpan.end);
      if (!meSpan) continue;
      const itemRe = /item:\s*'((?:[^'\\]|\\.)*)'/d;
      const mm = itemRe.exec(block.slice(meSpan.start, meSpan.end));
      if (!mm) continue;
      const value = mm[1];
      if (!nameAppears(value, gt.name)) continue;
      const idx = start + meSpan.start + mm.indices[1][0];
      checkAndRecord(mismatches, value, slug, cat, relFile, lineOf(idx), groundTruth, globalBrands);
    }
  }
}

// packages/frontend/data/extendedBios.js — `gearHighlights` array and any
// FAQ answer whose question asks what current gear a drummer uses.
const FAQ_CATEGORY_RE = /what .* (drums?|cymbals?|sticks?|heads?|hardware|pedal) does .* (currently )?(use|play)/i;
const FAQ_KEYWORD_TO_CATEGORY = {
  drum: 'drums', drums: 'drums',
  cymbal: 'cymbals', cymbals: 'cymbals',
  stick: 'sticks', sticks: 'sticks',
  head: 'heads', heads: 'heads',
  hardware: 'hardware', pedal: 'hardware',
};

function processExtendedBios(groundTruth, globalBrands, mismatches) {
  const relFile = 'packages/frontend/data/extendedBios.js';
  const content = fs.readFileSync(path.join(DATA_DIR, 'extendedBios.js'), 'utf8');
  const lineOf = makeLineFinder(content);

  const blocks = getTopLevelBlocks(content, /\n {2}'([a-z0-9-]+)':\s*\{/g);
  const bulletRe = /-\s*\*\*(Drums|Cymbals|Sticks|Heads|Hardware)\*\*:\s*([^\n]+)/dg;
  const faqRe = /\{\s*q:\s*'((?:[^'\\]|\\.)*)',\s*a:\s*'((?:[^'\\]|\\.)*)'\s*\}/dg;

  for (const { slug, start, end } of blocks) {
    if (!groundTruth[slug]) continue;
    const block = content.slice(start, end);

    bulletRe.lastIndex = 0;
    let bm;
    while ((bm = bulletRe.exec(block))) {
      const cat = bm[1].toLowerCase();
      const value = bm[2];
      const idx = start + bm.indices[2][0];
      checkAndRecord(mismatches, value, slug, cat, relFile, lineOf(idx), groundTruth, globalBrands);
    }

    faqRe.lastIndex = 0;
    let fm;
    while ((fm = faqRe.exec(block))) {
      const question = fm[1];
      const answer = fm[2];
      const qm = FAQ_CATEGORY_RE.exec(question);
      if (!qm) continue;
      const cat = FAQ_KEYWORD_TO_CATEGORY[qm[1].toLowerCase()];
      if (!cat) continue;
      const idx = start + fm.indices[2][0];
      checkAndRecord(mismatches, answer, slug, cat, relFile, lineOf(idx), groundTruth, globalBrands);
    }
  }
}

// packages/frontend/data/drummerEvolution.js — ONLY the era block whose
// `years` string contains "Present" (the current era; older eras are
// historical, out of scope).
function processDrummerEvolution(groundTruth, globalBrands, mismatches) {
  const relFile = 'packages/frontend/data/drummerEvolution.js';
  const content = fs.readFileSync(path.join(DATA_DIR, 'drummerEvolution.js'), 'utf8');
  const lineOf = makeLineFinder(content);

  const blocks = getTopLevelBlocks(content, /\n {2}'([a-z0-9-]+)':\s*\{/g);

  for (const { slug, start, end } of blocks) {
    if (!groundTruth[slug]) continue;
    const block = content.slice(start, end);

    const eraStarts = [];
    const eraStartRe = /\n {8}id:\s*'/g;
    let em;
    while ((em = eraStartRe.exec(block))) eraStarts.push(em.index);
    if (!eraStarts.length) continue;

    for (let i = 0; i < eraStarts.length; i++) {
      const eraStart = eraStarts[i];
      const eraEnd = i + 1 < eraStarts.length ? eraStarts[i + 1] : block.length;
      const era = block.slice(eraStart, eraEnd);

      const yearsMatch = /years:\s*'([^']*)'/.exec(era);
      if (!yearsMatch || !yearsMatch[1].includes('Present')) continue;

      for (const cat of CATEGORIES) {
        const re = new RegExp(`\\n {10}${cat}:\\s*\\{\\s*item:\\s*'((?:[^'\\\\]|\\\\.)*)'`, 'd');
        const mm = re.exec(era);
        if (!mm) continue;
        const value = mm[1];
        const idx = start + eraStart + mm.indices[1][0];
        checkAndRecord(mismatches, value, slug, cat, relFile, lineOf(idx), groundTruth, globalBrands);
      }
    }
  }
}

// packages/frontend/data/licks/*.js — each per-drummer module's per-lick
// `gearUsed` array names the gear for ONE specific song/album, which (like
// drummerEvolution.js eras) is a historical snapshot, not necessarily
// current state. `album` carries a year we anchor the era to.
//
// A per-item check against endorsementNews' `since` year (either as a
// brand-drift check, or as an anachronism check on the specific model name)
// was tried and produced a wall of false positives across most of this
// directory: many drummers' signature-model naming gets reused across a
// later brand switch (e.g. Aquiles Priester's current ProMark signature
// stick and his earlier Vic Firth signature stick are both just "Aquiles
// Priester Signature"), and `since` years here are approximate enough that
// even brand-only comparisons misfire on genuinely older, undocumented gear
// (same failure mode the gearPriceHistory scope-guard above exists for).
//
// So, mirroring drummerEvolution.js's scope guard exactly: only the era
// with the LATEST album year per drummer (the closest thing this file has
// to a "Present" bucket) gets checked, and only with a plain brand-drift
// check — never an inferred cutoff year.
const LICKS_DIR = path.join(DATA_DIR, 'licks');

function extractYear(text) {
  if (!text) return null;
  const m = /\b(19|20)\d{2}\b/.exec(text);
  return m ? parseInt(m[0], 10) : null;
}

function processLicks(groundTruth, globalBrands, mismatches) {
  const files = fs.readdirSync(LICKS_DIR).filter((f) => f.endsWith('.js') && f !== 'index.js');

  for (const file of files) {
    const relFile = `packages/frontend/data/licks/${file}`;
    const content = fs.readFileSync(path.join(LICKS_DIR, file), 'utf8');
    const lineOf = makeLineFinder(content);

    const blocks = getTopLevelBlocks(content, /\n {2}"([a-z0-9-]+)":\s*\{/g)
      .map(({ start, end }) => {
        const block = content.slice(start, end);
        const slugMatch = /"drummerSlug":\s*"([a-z0-9-]+)"/.exec(block);
        const albumMatch = /"album":\s*"((?:[^"\\]|\\.)*)"/.exec(block);
        return {
          start,
          end,
          block,
          slug: slugMatch && slugMatch[1],
          eraYear: albumMatch ? extractYear(albumMatch[1]) : null,
        };
      })
      .filter((b) => b.slug && groundTruth[b.slug] && b.eraYear != null);

    if (!blocks.length) continue;
    const maxYear = Math.max(...blocks.map((b) => b.eraYear));

    for (const b of blocks) {
      if (b.eraYear !== maxYear) continue;

      const gearRe = /\{\s*"name":\s*"((?:[^"\\]|\\.)*)",\s*"type":\s*"([a-z]+)"/dg;
      let gm;
      while ((gm = gearRe.exec(b.block))) {
        const name = gm[1];
        const cat = gm[2];
        if (!CATEGORIES.includes(cat)) continue;
        const idx = b.start + gm.indices[1][0];
        checkAndRecord(mismatches, name, b.slug, cat, relFile, lineOf(idx), groundTruth, globalBrands);
      }
    }
  }
}

// packages/frontend/data/albumArticles/<drummer-slug>.js — one module per
// drummer (per CLAUDE.md's per-drummer split), each article scoped to one
// album via its own `year` field. Same scope guard as processLicks above,
// for the same empirically-confirmed reason (a full-career, per-article
// brand check false-fired across most of this directory — endorsementNews'
// `since` years are too approximate, and plenty of real, undocumented
// brand history exists that isn't fabrication): only the article with the
// LATEST `year` per drummer is checked, treated as this file's "Present"
// bucket. Only the directly-structured `brand` fields are checked
// (drumKit/snare/cymbals, and hardware.items entries whose `type` names a
// pedal or sticks) — free-text prose elsewhere in these articles is out of
// scope, same rationale as every other processor here.
const ALBUM_ARTICLES_DIR = path.join(DATA_DIR, 'albumArticles');
const ALBUM_ARTICLE_DIRECT_FIELDS = [
  { key: 'drumKit', cat: 'drums' },
  { key: 'snare', cat: 'drums' },
  { key: 'cymbals', cat: 'cymbals' },
];

function processAlbumArticles(groundTruth, globalBrands, mismatches) {
  const files = fs.readdirSync(ALBUM_ARTICLES_DIR).filter((f) => f.endsWith('.js') && f !== 'index.js');

  for (const file of files) {
    const slug = file.replace(/\.js$/, '');
    if (!groundTruth[slug]) continue;

    const relFile = `packages/frontend/data/albumArticles/${file}`;
    const content = fs.readFileSync(path.join(ALBUM_ARTICLES_DIR, file), 'utf8');
    const lineOf = makeLineFinder(content);

    const blocks = getTopLevelBlocks(content, /\n {2}"([a-z0-9-]+)":\s*\{/g)
      .map(({ start, end }) => {
        const yearMatch = /"year":\s*(\d{4})/.exec(content.slice(start, end));
        return { start, end, eraYear: yearMatch ? parseInt(yearMatch[1], 10) : null };
      })
      .filter((b) => b.eraYear != null);

    if (!blocks.length) continue;
    const maxYear = Math.max(...blocks.map((b) => b.eraYear));

    for (const { start, end, eraYear } of blocks) {
      if (eraYear !== maxYear) continue;

      for (const { key, cat } of ALBUM_ARTICLE_DIRECT_FIELDS) {
        const span = findKeyObjectSpan(content, key, start, end);
        if (!span) continue;
        const brandM = /"brand":\s*"((?:[^"\\]|\\.)*)"/d.exec(content.slice(span.start, span.end));
        if (!brandM) continue;
        const idx = span.start + brandM.indices[1][0];
        checkAndRecord(mismatches, brandM[1], slug, cat, relFile, lineOf(idx), groundTruth, globalBrands);
      }

      const hwSpan = findKeyObjectSpan(content, 'hardware', start, end);
      if (!hwSpan) continue;
      const itemsSpan = findKeyObjectSpan(content, 'items', hwSpan.start, hwSpan.end);
      if (!itemsSpan) continue;
      for (const item of topLevelObjects(content, itemsSpan.start, itemsSpan.end)) {
        const itemText = content.slice(item.start, item.end);
        const typeM = /"type":\s*"((?:[^"\\]|\\.)*)"/.exec(itemText);
        const brandM = /"brand":\s*"((?:[^"\\]|\\.)*)"/d.exec(itemText);
        if (!typeM || !brandM) continue;
        const cat = /pedal/i.test(typeM[1]) ? 'hardware' : /stick/i.test(typeM[1]) ? 'sticks' : null;
        if (!cat) continue;
        const idx = item.start + brandM.indices[1][0];
        checkAndRecord(mismatches, brandM[1], slug, cat, relFile, lineOf(idx), groundTruth, globalBrands);
      }
    }
  }
}

// packages/frontend/data/genreGearGuides.js — "best <gear> for <genre>"
// guides. `gearType` tells us which of our 5 categories (if any — some
// gearTypes like `iem`/`metronomes`/`thrones` aren't endorsement-tracked
// categories at all, and are skipped) a guide covers.
//
// `relatedDrummers`/`featuredDrummers` (`{ slug, name, reason }`) is the
// one structured spot that's reliably a CURRENT-state claim (slug is
// already given, so `reason` is checked directly, same pattern as
// extendedBios' FAQ answers) — this is exactly what #8354 fabricated
// (Pete Sandoval's `reason` claiming Evans when he's actually
// Remo/Aquarian).
//
// `proRecommendations.pedals[].usedBy[]` was also tried (checking each
// named drummer against that product's own `brand`), but many of these
// guides recommend specific classic/vintage gear tied to one famous
// session (e.g. a "best snare for thrash" pick whose `usedBy` note reads
// "Master of Puppets sessions") rather than the drummer's current
// endorsement — the same historical-vs-current ambiguity that sank a
// naive check on licks/albumArticles, so it's left out here too.
const GEARTYPE_TO_CATEGORY = {
  drumheads: 'heads',
  cymbals: 'cymbals',
  crash: 'cymbals',
  ride: 'cymbals',
  splash: 'cymbals',
  snare: 'drums',
  snares: 'drums',
  kits: 'drums',
  'bass-drum': 'drums',
  sticks: 'sticks',
  hardware: 'hardware',
  pedals: 'hardware',
};

function processGenreGearGuides(groundTruth, globalBrands, mismatches) {
  const relFile = 'packages/frontend/data/genreGearGuides.js';
  const content = fs.readFileSync(path.join(DATA_DIR, 'genreGearGuides.js'), 'utf8');
  const lineOf = makeLineFinder(content);

  const blocks = getTopLevelBlocks(content, /\n {2}'([a-z0-9-]+)':\s*\{/g);

  for (const { start, end } of blocks) {
    const block = content.slice(start, end);
    const gearTypeMatch = /gearType:\s*'([a-z-]+)'/.exec(block);
    const cat = gearTypeMatch && GEARTYPE_TO_CATEGORY[gearTypeMatch[1]];
    if (!cat) continue;

    const relRe = /\{\s*slug:\s*'([a-z0-9-]+)',\s*name:\s*'(?:[^'\\]|\\.)*',\s*reason:\s*'((?:[^'\\]|\\.)*)'\s*\}/dg;
    let rm;
    while ((rm = relRe.exec(block))) {
      const slug = rm[1];
      if (!groundTruth[slug]) continue;
      const idx = start + rm.indices[2][0];
      checkAndRecord(mismatches, rm[2], slug, cat, relFile, lineOf(idx), groundTruth, globalBrands);
    }
  }
}

async function main() {
  const { groundTruth, globalBrands } = await loadGroundTruth();
  const mismatches = [];

  processSoundLikeGuides(groundTruth, globalBrands, mismatches);
  processDrummerComparisons(groundTruth, globalBrands, mismatches);
  processExtendedBios(groundTruth, globalBrands, mismatches);
  processDrummerEvolution(groundTruth, globalBrands, mismatches);
  processGenreGearGuides(groundTruth, globalBrands, mismatches);
  processGearPriceHistory(groundTruth, globalBrands, mismatches);
  processLicks(groundTruth, globalBrands, mismatches);
  processAlbumArticles(groundTruth, globalBrands, mismatches);

  for (const m of mismatches) {
    console.log(
      `MISMATCH  ${m.slug}  ${m.cat}  ${m.file}:${m.line}  expected="${m.expected}"  found="${m.found}"`
    );
  }

  console.log(`\n${mismatches.length} mismatch(es) found across ${CATEGORIES.length} gear categories.`);
  process.exit(mismatches.length > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error('verify-gear-consistency crashed:', err);
  process.exit(1);
});
