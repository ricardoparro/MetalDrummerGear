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
      const candidates = parseBrandCandidates(current[cat] && current[cat].brand);
      const historical = new Map();
      for (const change of changes) {
        if (change.category !== cat) continue;
        addBrand(historical, change.from);
        addBrand(historical, change.to);
      }
      groundTruth[slug].categories[cat] = { candidates, historical };
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

// packages/frontend/data/gearPriceHistory.js is deliberately NOT checked here.
// The issue that spawned this script assumed `modernEquivalent` is a "current
// state" pointer comparable to endorsementNews.js's currentEndorsements, but
// each gearPriceHistory.js entry is anchored to one specific historical
// album/era (`iconicYear`/`era`, often decades before "now" — e.g. Gene
// Hoglan's entry documents his 1993 Death-era rig, Vinnie Paul's documents
// 1990's Cowboys from Hell), and `modernEquivalent` tracks brand continuity
// with THAT era, not with the drummer's present-day endorsement (confirmed
// via git history, e.g. commit 2506e20e, which edits the era `item` and its
// `modernEquivalent.item` together in lockstep). Comparing modernEquivalent
// to currentEndorsements produces false positives whenever a drummer's brand
// changed since that era — confirmed on vinnie-paul, one of this issue's own
// designated should-be-clean spot-check drummers, whose hardware/heads read
// as false mismatches purely because his gearPriceHistory entry predates his
// 2008 ddrum/Evans switch. A correct check would need era-anchored ground
// truth (which brand was valid in that specific year) that
// endorsementNews.js's timeline doesn't consistently record for every
// category, so this file is left out rather than shipping a noisy check.

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

async function main() {
  const { groundTruth, globalBrands } = await loadGroundTruth();
  const mismatches = [];

  processSoundLikeGuides(groundTruth, globalBrands, mismatches);
  processDrummerComparisons(groundTruth, globalBrands, mismatches);
  processExtendedBios(groundTruth, globalBrands, mismatches);
  processDrummerEvolution(groundTruth, globalBrands, mismatches);

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
