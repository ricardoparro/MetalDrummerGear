#!/usr/bin/env node
// CI guard against #4273/#4274/#4275-class drift: a hand-maintained array of
// drummer slugs in api/sitemap.js is supposed to mirror the full drummer
// roster (or another canonical data source) but silently falls behind
// whenever the roster grows or new per-drummer content ships elsewhere
// without a matching sitemap edit. This exact bug class recurred 3+ times in
// a single SEO audit pass (#4273, #4274, #4275), on top of #4201/#4214
// (the base `drummers` roster array itself) and #1781 (a similar drift for
// per-brand LLM files).
//
// This scans api/sitemap.js for any remaining flat, hand-written arrays of
// drummer-slug strings and fails the build if their length doesn't match the
// canonical `drummers` roster count. It intentionally does NOT try to be a
// general-purpose JS parser — it targets the specific shape these arrays
// take in this file (see extractCandidateArrays below).

const fs = require('fs');
const path = require('path');

const SITEMAP_PATH = path.join(__dirname, '..', 'api', 'sitemap.js');

// Arrays that are INTENTIONALLY a curated subset of the roster, not a 1:1
// mirror of it. Keyed by the label extractCandidateArrays() derives for them
// (the const name, or the destination URL template for inline arrays). Keep
// this list short, and document *why* each entry is safe.
const SKIP_LIST = new Set([
  // Issue #2389 (+ #3611/#4122/#4128): explicit /vs/ URL overrides for pairs
  // the all-pairs generator can't produce — either a drummer missing from
  // `drummers`, or a curated non-alphabetical slug order. Always a handful
  // of pairs, never the full roster.
  'inline array → /vs/${slug}',
  // Not drummer slugs at all — a fixed set of gear-category route segments /
  // pedal-detection keywords that happen to be flat lowercase string arrays
  // and would otherwise false-positive against the roster count.
  'GEAR_CATEGORIES',
  'PEDAL_KEYWORDS',
]);

const MIN_CANDIDATE_LENGTH = 3;
// Slugs are lowercase URL path segments. Deliberately allows single-word
// slugs (e.g. "frost", "daray", "hellhammer") since several real drummer
// stage names have no hyphen — a stricter "must contain a hyphen" pattern
// silently excludes those and let a real drift bug through undetected.
const SLUG_RE = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;

function stripLineComments(text) {
  return text.replace(/\/\/[^\n]*/g, '');
}

// Finds the `]` matching the `[` at openIdx, counting only square-bracket
// depth (fine here: none of the candidate arrays contain nested `[`).
function findMatchingBracket(source, openIdx) {
  let depth = 0;
  for (let i = openIdx; i < source.length; i++) {
    if (source[i] === '[') depth++;
    else if (source[i] === ']') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function getCanonicalRosterCount(source) {
  const constIdx = source.indexOf('const drummers = [');
  if (constIdx === -1) {
    throw new Error('could not locate `const drummers = [...]` in api/sitemap.js');
  }
  const openIdx = source.indexOf('[', constIdx);
  const closeIdx = findMatchingBracket(source, openIdx);
  const body = source.slice(openIdx + 1, closeIdx);
  const idMatches = body.match(/\{\s*id:\s*\d+/g) || [];
  if (idMatches.length === 0) {
    throw new Error('parsed 0 entries out of `drummers` in api/sitemap.js — check the parser');
  }
  return idMatches.length;
}

// Finds every `const NAME = [...]` or inline `...([...])` array in the file
// whose elements are ALL quoted kebab-case slug strings, and returns each as
// a { label, count } candidate for the roster-count comparison below.
function extractCandidateArrays(source) {
  // No `consumed`-range skip here: a genuine flat-string candidate array
  // never contains a nested `[`, so there's no risk of re-matching inside
  // one. Container literals that DON'T qualify (e.g. the big `urls = [...]`
  // array of objects in buildSitemapXml) are deliberately still scanned
  // through, since they hold legitimate nested inline slug arrays (e.g. the
  // curated /vs/ overrides) that must not be shadowed by the container.
  const candidates = [];
  const bracketRe = /\[/g;
  let m;
  while ((m = bracketRe.exec(source))) {
    const openIdx = m.index;

    const before = source.slice(Math.max(0, openIdx - 80), openIdx);
    const constMatch = before.match(/const\s+(\w+)\s*=\s*$/);
    const spreadMatch = before.match(/\.\.\.\(\s*$/);
    if (!constMatch && !spreadMatch) continue;

    const closeIdx = findMatchingBracket(source, openIdx);
    if (closeIdx === -1) continue;

    const bodyNoComments = stripLineComments(source.slice(openIdx + 1, closeIdx));
    const firstChar = bodyNoComments.trim()[0];
    if (firstChar !== "'" && firstChar !== '"') continue; // not a flat string array

    const items = bodyNoComments.split(',').map((s) => s.trim()).filter(Boolean);
    if (items.length < MIN_CANDIDATE_LENGTH) continue;

    const isFlatSlugArray = items.every((item) => {
      const strMatch = item.match(/^'([^']*)'$/) || item.match(/^"([^"]*)"$/);
      return strMatch && SLUG_RE.test(strMatch[1]);
    });
    if (!isFlatSlugArray) continue;

    let label;
    if (constMatch) {
      label = constMatch[1];
    } else {
      const after = source.slice(closeIdx, closeIdx + 200);
      const locMatch = after.match(/loc:\s*`([^`]*)`/);
      label = locMatch ? `inline array → ${locMatch[1]}` : `inline array near offset ${openIdx}`;
    }

    candidates.push({ label, count: items.length });
  }
  return candidates;
}

function main() {
  const source = fs.readFileSync(SITEMAP_PATH, 'utf8');
  const rosterCount = getCanonicalRosterCount(source);
  const candidates = extractCandidateArrays(source);

  const failures = candidates.filter((c) => !SKIP_LIST.has(c.label) && c.count !== rosterCount);

  if (failures.length > 0) {
    console.error(
      `\ncheck-sitemap-drift: found ${failures.length} hardcoded drummer-slug array(s) in api/sitemap.js out of sync with the ${rosterCount}-drummer roster:\n`
    );
    for (const f of failures) {
      console.error(`  - ${f.label}: ${f.count} entries, expected ${rosterCount}`);
    }
    console.error(
      `\nEach array above is a hand-maintained list of drummer slugs that's supposed to mirror ` +
      `the full roster (\`drummers\`, currently ${rosterCount} entries) but has drifted out of ` +
      `sync — same bug class as #4273/#4274/#4275/#4201/#4214/#1781.\n\n` +
      `Fix: either (preferred) convert the array to a derivation off an imported canonical data ` +
      `module (Object.keys(...)/.map(...) — see \`endorsementDrummers\` or \`llmsDrummerSlugs\` in ` +
      `api/sitemap.js for the pattern), or update the hardcoded list to match.\n` +
      `If this array is a genuinely curated, non-1:1 subset by design, add its label to SKIP_LIST ` +
      `in scripts/check-sitemap-drift.cjs with a comment explaining why.\n`
    );
    process.exitCode = 1;
    return;
  }

  const checked = candidates.filter((c) => !SKIP_LIST.has(c.label)).length;
  console.log(
    `check-sitemap-drift: OK - ${checked} hardcoded drummer-slug array(s) in api/sitemap.js match the ${rosterCount}-drummer roster (${SKIP_LIST.size} skip-listed).`
  );
}

main();
