#!/usr/bin/env node
// CI guard against #4273/#4274/#4275-class drift: api/sitemap.js contains
// several drummer-slug lists that are supposed to mirror the full 67-drummer
// roster (or another canonical data module) 1:1. Left as hand-maintained
// literal arrays, they silently fall out of sync whenever the roster grows
// or new per-drummer content ships without a matching sitemap edit. This bug
// shipped 3 times independently in a single audit pass:
//   - llmsDrummerSlugs: 61 vs 67 roster (#4273)
//   - endorsementDrummers: 38 vs 67 ENDORSEMENT_TIMELINE entries (#4274)
//   - inline /llms/licks/<slug>.md array: 63 vs 67 SIGNATURE_LICKS drummers (#4275)
// on top of prior occurrences (#4201/#4214, #1781). #4276 converted all three
// to structural derivations (`drummers.map(...)`, `Object.keys(...)`,
// reusing `drummerLicksHubs`) so they can't drift again by construction, but
// this check exists as a backstop: it fails the build if any of them (or a
// newly introduced array following the same pattern) regresses to a
// hand-maintained literal whose length no longer matches its canonical
// source.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITEMAP_PATH = path.join(ROOT, 'api/sitemap.js');

// Arrays in api/sitemap.js known to have drifted before, checked by name.
// `canonicalCount` returns the true count from the canonical source, whether
// that's the roster embedded in api/sitemap.js itself or an imported data
// module.
const REGISTRY = [
  {
    varName: 'llmsDrummerSlugs',
    canonicalLabel: 'the `drummers` roster in api/sitemap.js',
    canonicalCount: (ctx) => ctx.rosterCount,
  },
  {
    varName: 'endorsementDrummers',
    canonicalLabel: 'Object.keys(ENDORSEMENT_TIMELINE) (packages/frontend/data/endorsementNews.js)',
    canonicalCount: async () => {
      const mod = await import(
        path.join(ROOT, 'packages/frontend/data/endorsementNews.js')
      );
      return Object.keys(mod.ENDORSEMENT_TIMELINE).length;
    },
  },
];

// Curated/non-1:1 flat slug arrays that intentionally do NOT mirror the full
// roster, keyed by their first entry (the generic scan below has no access
// to variable names for inline arrays). Arrays of *objects* — e.g.
// top20GearComparisons ({d1, d2} pairs), signatureGearPages — never reach
// this list at all: the scan below only considers arrays made up entirely of
// quoted strings, so object arrays are excluded by construction. Keep this
// list short, and document *why* each entry is here. Both entries below are
// currently under LARGE_ARRAY_THRESHOLD anyway (8-10 entries vs. the 20
// threshold) — they're listed as a safety net in case they grow.
const SKIP_ARRAYS = new Set([
  // Issue #2389: curated /vs/ slug overrides for pairs the all-pairs
  // generator can't produce (non-roster drummers, non-alphabetized order).
  'sean-reinert-vs-martin-lopez',
  // Issue #1703: 8 curated battle matchups' LLM markdown files — mirrors
  // CURATED_MATCHUPS (8 entries), not the 67-drummer roster.
  'brann-dailor-vs-chris-adler',
]);

function extractRosterCount(source) {
  const match = source.match(/const drummers = \[([\s\S]*?)\n\];/);
  if (!match) {
    throw new Error('could not locate `const drummers = [...]` in api/sitemap.js');
  }
  return (match[1].match(/\{\s*id:\s*\d+/g) || []).length;
}

function extractConstStatement(source, varName) {
  const re = new RegExp(`const ${varName} = ([\\s\\S]*?);\\n`);
  const match = source.match(re);
  return match ? match[1] : null;
}

function isStructurallyDerived(rhs) {
  return /\.map\(|\.reduce\(|Object\.keys\(|Object\.values\(|Object\.entries\(/.test(rhs);
}

function countQuotedEntries(rhs) {
  return (rhs.match(/'[^']*'|"[^"]*"/g) || []).length;
}

// Flags any OTHER large hand-maintained flat array of quoted slugs (>=20
// entries) that isn't already covered by REGISTRY or SKIP_ARRAYS. Curated
// subsets in this file (top20GearComparisons, signatureGearPages, the
// curated /vs/ overrides, the battles LLM list) all stay well under 20
// entries, so this threshold catches roster-mirror-shaped arrays without
// false-positiving on genuinely curated lists.
const LARGE_ARRAY_THRESHOLD = 20;

function findUnregisteredLargeArrays(source, registeredNames) {
  const flagged = [];
  const blockRe = /\[([^\[\]]*)\]/g;
  let match;
  while ((match = blockRe.exec(source))) {
    const body = match[1];
    const entries = body.match(/'[^']*'|"[^"]*"/g);
    if (!entries || entries.length < LARGE_ARRAY_THRESHOLD) continue;
    // Body must be ONLY quoted strings + commas/whitespace (flat slug array),
    // not an array of objects or mixed content.
    const stripped = body.replace(/'[^']*'|"[^"]*"/g, '').replace(/[\s,]/g, '');
    if (stripped.length > 0) continue;
    const firstEntry = entries[0].slice(1, -1);
    if (SKIP_ARRAYS.has(firstEntry)) continue;
    // Already-checked named consts show up here too (the regex has no name
    // context) — skip if this exact block belongs to a registered var.
    const isRegistered = registeredNames.some((name) => {
      const stmt = extractConstStatement(source, name);
      return stmt && stmt.includes(body);
    });
    if (isRegistered) continue;
    flagged.push({ firstEntry, count: entries.length });
  }
  return flagged;
}

async function main() {
  const source = fs.readFileSync(SITEMAP_PATH, 'utf8');
  const rosterCount = extractRosterCount(source);
  const ctx = { rosterCount };

  const failures = [];
  let checked = 0;

  for (const entry of REGISTRY) {
    const rhs = extractConstStatement(source, entry.varName);
    if (rhs === null) {
      failures.push(
        `  - ${entry.varName}: expected to find "const ${entry.varName} = ...;" in api/sitemap.js, but it's gone. ` +
        `If it was renamed or removed, update scripts/check-sitemap-drift.cjs's REGISTRY to match.`
      );
      continue;
    }
    if (isStructurallyDerived(rhs)) {
      checked++;
      continue; // sourced live from a canonical module/roster — can't drift.
    }
    const actualCount = countQuotedEntries(rhs);
    const canonicalCount = await entry.canonicalCount(ctx);
    checked++;
    if (actualCount !== canonicalCount) {
      failures.push(
        `  - ${entry.varName}: hand-maintained array has ${actualCount} entries, but ${entry.canonicalLabel} has ${canonicalCount}.`
      );
    }
  }

  const unregistered = findUnregisteredLargeArrays(
    source,
    REGISTRY.map((e) => e.varName)
  );
  for (const u of unregistered) {
    failures.push(
      `  - unregistered hardcoded array starting with '${u.firstEntry}' (${u.count} entries): looks like a roster-mirror list. ` +
      `Either derive it from a canonical data module (preferred), or register it in scripts/check-sitemap-drift.cjs's REGISTRY/SKIP_ARRAYS.`
    );
  }

  if (failures.length > 0) {
    console.error(
      `\ncheck-sitemap-drift: found ${failures.length} drummer-slug array drift issue(s) in api/sitemap.js:\n`
    );
    for (const f of failures) console.error(f);
    console.error(
      `\nEach array above is supposed to mirror a canonical data source 1:1. When it ` +
      `drifts, real content (markdown files, endorsement pages, lick pages) sits ` +
      `invisible to sitemap-driven crawl discovery.\n\n` +
      `Fix: prefer converting the array to a derivation (e.g. drummers.map(...), ` +
      `Object.keys(canonicalModule)) so it's structurally impossible to drift. If the ` +
      `array is a genuinely curated subset (not meant to be 1:1 with the roster), add it ` +
      `to SKIP_ARRAYS in scripts/check-sitemap-drift.cjs with a comment explaining why.\n`
    );
    process.exitCode = 1;
    return;
  }

  console.log(
    `check-sitemap-drift: OK - ${checked} registered array(s) in api/sitemap.js are in sync with their canonical source ` +
    `(roster: ${rosterCount} drummers), ${SKIP_ARRAYS.size} skip-listed curated array(s), no unregistered roster-mirror arrays found.`
  );
}

main().catch((err) => {
  console.error('check-sitemap-drift: unexpected error:', err);
  process.exitCode = 1;
});
