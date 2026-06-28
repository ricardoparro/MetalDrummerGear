#!/usr/bin/env node
/**
 * Structured-Data (JSON-LD) validation verifier.
 *
 * For a priority/type-balanced sample of URLs in metalforge.io/sitemap.xml,
 * fetch the rendered HTML, extract every `<script type="application/ld+json">`
 * block, parse it, flatten any `@graph`, and assert the Google-required fields
 * for each node's `@type`. Output:
 *   - .agents/seo/structured-data-history/YYYY-MM-DD.json (machine report + baseline)
 *   - The renderer turns this into the umbrella issue + snapshot.
 *
 * Why this exists: Google Search Console flags rich-result eligibility loss for
 * the LIVE, RENDERED JSON-LD — e.g. VideoObject "Missing field uploadDate". A
 * `node --check` or a build-time lint cannot catch this: the JSON-LD is assembled
 * at render time from data modules, so a missing/empty field only shows up in the
 * shipped HTML. This loop extracts the real JSON-LD off live pages and asserts the
 * exact field set Google requires per type — catching the gap BEFORE Google does.
 *
 * Pure: no GitHub calls. Reads the previous-run history JSON if present (for WoW
 * deltas); writes a new one + the report JSON.
 *
 * Local run:
 *   node .agents/scripts/check-structured-data.cjs \
 *     --history-dir .agents/seo/structured-data-history \
 *     --limit 150 \
 *     --json /tmp/structured-data.json
 *
 * Self-test (no network — exercises the rule engine against inline fixtures):
 *   node .agents/scripts/check-structured-data.cjs --self-test
 *
 * Flags:
 *   --self-test         Run the field-validator against GOOD + BAD fixtures, exit non-zero on mismatch.
 *   --json <path>       Where to write the report JSON (default /tmp/structured-data.json).
 *   --limit <n>         Cap total URLs sampled (default 150).
 *   --history-dir <d>   History dir for WoW diff (default .agents/seo/structured-data-history).
 *   --sitemap <url>     Override sitemap URL.
 *   --concurrency <n>   Page-fetch concurrency (default 6).
 *
 * Exit codes:
 *   0 — completed (or self-test passed)
 *   1 — fatal (sitemap unreachable, no pages) / self-test failed
 */

const fs = require('node:fs');
const path = require('node:path');

function argv(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 && i + 1 < process.argv.length ? process.argv[i + 1] : fallback;
}
function hasFlag(name) { return process.argv.includes(`--${name}`); }

const SITEMAP_URL = argv('sitemap', 'https://metalforge.io/sitemap.xml');
const HISTORY_DIR = argv('history-dir', '.agents/seo/structured-data-history');
const OUT = argv('json', '/tmp/structured-data.json');
const LIMIT = parseInt(argv('limit', '150'), 10);
const CONCURRENCY = parseInt(argv('concurrency', '6'), 10);
const PER_PAGE_TIMEOUT_MS = parseInt(argv('page-timeout', '15000'), 10);

const USER_AGENT =
  'MetalForge-StructuredDataCheck/1.0 (+https://metalforge.io; bot; contact via GH issues)';

function log(msg) { process.stderr.write(`[structured-data] ${msg}\n`); }
function isoToday() { return new Date().toISOString().split('T')[0]; }

/* ---------------------------------------------------------------------------
 * RULESET — Google-required fields only, to avoid noise.
 * Each entry maps a JSON-LD @type to a list of required-field checks. A check is
 * either a string (field must be present and non-empty) or a {field, each}
 * descriptor for array fields whose members each need sub-fields.
 * ------------------------------------------------------------------------- */
const REQUIRED_FIELDS = {
  VideoObject: ['name', 'description', 'thumbnailUrl', 'uploadDate'],
  Article: ['headline', 'image', 'datePublished'],
  BlogPosting: ['headline', 'image', 'datePublished'],
  NewsArticle: ['headline', 'image', 'datePublished'],
  FAQPage: [
    { field: 'mainEntity', nonEmptyArray: true, each: ['name', { field: 'acceptedAnswer', subField: 'text' }] },
  ],
  HowTo: ['name', { field: 'step', nonEmptyArray: true }],
  MusicAlbum: ['name'],
  MusicRecording: ['name'],
  BreadcrumbList: [
    { field: 'itemListElement', nonEmptyArray: true, each: ['position', 'name', 'item'] },
  ],
  Product: ['name', 'offers'],
};

const KNOWN_TYPES = new Set(Object.keys(REQUIRED_FIELDS));

/* True when a value is "present & non-empty" by Google's eligibility bar. */
function isEmpty(v) {
  if (v === undefined || v === null) return true;
  if (typeof v === 'string') return v.trim() === '';
  if (Array.isArray(v)) return v.length === 0;
  if (typeof v === 'object') return Object.keys(v).length === 0;
  return false;
}

/* Normalize @type which can be a string or an array of strings. */
function typesOf(node) {
  const t = node && node['@type'];
  if (!t) return [];
  return Array.isArray(t) ? t.map(String) : [String(t)];
}

/**
 * Validate a single JSON-LD node against the ruleset for each of its @types.
 * Returns an array of { type, field, reason } missing-field records (empty = ok).
 */
function validateNode(node) {
  const problems = [];
  if (!node || typeof node !== 'object') return problems;
  for (const type of typesOf(node)) {
    const rules = REQUIRED_FIELDS[type];
    if (!rules) continue; // type not in our ruleset → ignored (no noise)
    for (const rule of rules) {
      if (typeof rule === 'string') {
        if (isEmpty(node[rule])) problems.push({ type, field: rule, reason: 'missing-or-empty' });
        continue;
      }
      // Object rule.
      const val = node[rule.field];
      if (rule.nonEmptyArray) {
        const arr = Array.isArray(val) ? val : (isEmpty(val) ? [] : [val]);
        if (arr.length === 0) {
          problems.push({ type, field: rule.field, reason: 'empty-array' });
          continue;
        }
        if (rule.each) {
          arr.forEach((member, idx) => {
            for (const sub of rule.each) {
              if (typeof sub === 'string') {
                if (isEmpty(member?.[sub])) {
                  problems.push({ type, field: `${rule.field}[${idx}].${sub}`, reason: 'missing-or-empty' });
                }
              } else {
                // {field, subField}: e.g. acceptedAnswer.text
                const inner = member?.[sub.field];
                if (isEmpty(inner?.[sub.subField])) {
                  problems.push({ type, field: `${rule.field}[${idx}].${sub.field}.${sub.subField}`, reason: 'missing-or-empty' });
                }
              }
            }
          });
        }
      } else if (rule.subField) {
        const inner = node[rule.field];
        if (isEmpty(inner?.[rule.subField])) {
          problems.push({ type, field: `${rule.field}.${rule.subField}`, reason: 'missing-or-empty' });
        }
      } else {
        if (isEmpty(val)) problems.push({ type, field: rule.field, reason: 'missing-or-empty' });
      }
    }
  }
  return problems;
}

/**
 * Flatten one parsed JSON-LD payload into a flat list of nodes, expanding
 * @graph and top-level arrays.
 */
function flattenGraph(parsed) {
  const nodes = [];
  const visit = obj => {
    if (!obj || typeof obj !== 'object') return;
    if (Array.isArray(obj)) { obj.forEach(visit); return; }
    if (Array.isArray(obj['@graph'])) {
      obj['@graph'].forEach(visit);
      // A wrapper that ALSO carries its own @type still counts as a node.
      if (obj['@type']) nodes.push(obj);
      return;
    }
    nodes.push(obj);
  };
  visit(parsed);
  return nodes;
}

/* Extract every <script type="application/ld+json">…</script> block body. */
function extractLdJsonBlocks(html) {
  const blocks = [];
  const re = /<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (const m of html.matchAll(re)) blocks.push(m[1].trim());
  return blocks;
}

/* ---------------------------------------------------------------------------
 * URL sampling — type-balanced, priority-ordered, capped, NO silent truncation.
 * ------------------------------------------------------------------------- */
const URL_TYPE_PATTERNS = [
  { type: 'articles', rx: /^\/articles\// },
  { type: 'licks', rx: /^\/drummers\/[^/]+\/licks\// },
  { type: 'drummer', rx: /^\/drummer\// },
  { type: 'guides', rx: /^\/guides\// },
  { type: 'bands', rx: /^\/bands\// },
  { type: 'lists', rx: /^\/lists\// },
];
const EXCLUDED = /^\/llms\//;

function urlType(pathname) {
  for (const { type, rx } of URL_TYPE_PATTERNS) if (rx.test(pathname)) return type;
  return 'other';
}

function parseSitemap(xml) {
  const out = [];
  for (const m of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const block = m[1];
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1]?.trim();
    if (!loc) continue;
    const priority = parseFloat(block.match(/<priority>([^<]+)<\/priority>/)?.[1] ?? '0.5');
    out.push({ url: loc, priority });
  }
  // Fallback: sitemaps without <url> wrappers (just <loc>).
  if (out.length === 0) {
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      out.push({ url: m[1].trim(), priority: 0.5 });
    }
  }
  return out;
}

/**
 * Pick a type-balanced sample: round-robin across URL types by descending
 * priority within each type, capped at `limit`. Returns { sample, skipped,
 * byTypeAvailable, byTypeSampled }.
 */
function selectSample(urls, limit) {
  const groups = new Map(); // type -> [{url, priority}]
  for (const u of urls) {
    let pathname;
    try { pathname = new URL(u.url).pathname; } catch { continue; }
    if (EXCLUDED.test(pathname)) continue; // /llms/* excluded by spec
    const t = urlType(pathname);
    if (!groups.has(t)) groups.set(t, []);
    groups.get(t).push({ ...u, _type: t });
  }
  for (const arr of groups.values()) {
    arr.sort((a, b) => b.priority - a.priority || a.url.localeCompare(b.url));
  }

  const byTypeAvailable = {};
  for (const [t, arr] of groups) byTypeAvailable[t] = arr.length;

  // Round-robin so every type gets coverage before any type is exhausted.
  const order = [...groups.keys()].sort();
  const cursors = Object.fromEntries(order.map(t => [t, 0]));
  const sample = [];
  let progressed = true;
  while (sample.length < limit && progressed) {
    progressed = false;
    for (const t of order) {
      if (sample.length >= limit) break;
      const arr = groups.get(t);
      if (cursors[t] < arr.length) {
        sample.push(arr[cursors[t]++]);
        progressed = true;
      }
    }
  }

  const byTypeSampled = {};
  for (const s of sample) byTypeSampled[s._type] = (byTypeSampled[s._type] || 0) + 1;

  const skipped = [];
  for (const [t, arr] of groups) {
    const taken = cursors[t];
    if (taken < arr.length) skipped.push({ type: t, available: arr.length, sampled: taken, skipped: arr.length - taken });
  }

  return { sample, skipped, byTypeAvailable, byTypeSampled };
}

/* ---------------------------------------------------------------------------
 * Networking.
 * ------------------------------------------------------------------------- */
async function fetchWithTimeout(url, opts, timeoutMs) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(url, { ...opts, signal: ctrl.signal });
  } finally {
    clearTimeout(t);
  }
}

async function fetchSitemap(url) {
  log(`fetching ${url}`);
  const r = await fetchWithTimeout(url, { headers: { 'User-Agent': USER_AGENT } }, 30_000);
  if (!r.ok) throw new Error(`sitemap ${r.status}`);
  return await r.text();
}

async function fetchPage(url) {
  try {
    const r = await fetchWithTimeout(url, {
      headers: { 'User-Agent': USER_AGENT, 'Accept': 'text/html' },
      redirect: 'follow',
    }, PER_PAGE_TIMEOUT_MS);
    if (!r.ok) return { url, status: r.status, error: `page ${r.status}` };
    return { url, status: r.status, html: await r.text() };
  } catch (e) {
    return { url, status: 0, error: e.message || String(e) };
  }
}

async function pool(items, n, worker) {
  const out = new Array(items.length);
  let i = 0;
  async function run() {
    while (true) {
      const idx = i++;
      if (idx >= items.length) return;
      out[idx] = await worker(items[idx], idx);
      if (idx % 25 === 0 && idx > 0) log(`  scanned ${idx}/${items.length}`);
    }
  }
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, run));
  return out;
}

/**
 * Analyze one page's HTML → classification + the per-node problems.
 * class: 'ok' | 'invalid-json' | 'missing-fields' | 'page-error' | 'no-jsonld'
 */
function analyzePage(url, html) {
  const blocks = extractLdJsonBlocks(html);
  if (blocks.length === 0) {
    return { url, class: 'no-jsonld', blocks: 0, problems: [], parseErrors: [] };
  }
  const problems = [];
  const parseErrors = [];
  let nodeCount = 0;
  for (const [bi, raw] of blocks.entries()) {
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      parseErrors.push({ block: bi, error: e.message });
      continue;
    }
    for (const node of flattenGraph(parsed)) {
      nodeCount++;
      for (const p of validateNode(node)) problems.push(p);
    }
  }
  let cls;
  if (parseErrors.length > 0) cls = 'invalid-json';
  else if (problems.length > 0) cls = 'missing-fields';
  else cls = 'ok';
  return { url, class: cls, blocks: blocks.length, nodeCount, problems, parseErrors };
}

/* ---------------------------------------------------------------------------
 * Self-test — exercises the rule engine, no network.
 * ------------------------------------------------------------------------- */
function selfTest() {
  let pass = true;
  const fail = msg => { pass = false; process.stderr.write(`[self-test] FAIL: ${msg}\n`); };

  // GOOD fixture — must produce ZERO failures.
  const goodHtml = `
    <script type="application/ld+json">
    {"@context":"https://schema.org","@graph":[
      {"@type":"VideoObject","name":"Lars Ulrich — One (live)","description":"A full breakdown of the double-bass intro.","thumbnailUrl":"https://metalforge.io/t.jpg","uploadDate":"2024-01-02"},
      {"@type":"Article","headline":"How Lars plays One","image":"https://metalforge.io/a.jpg","datePublished":"2024-01-02"},
      {"@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Is it hard?","acceptedAnswer":{"@type":"Answer","text":"Yes, but learnable."}}]}
    ]}
    </script>`;
  const good = analyzePage('https://metalforge.io/good', goodHtml);
  if (good.class !== 'ok') fail(`GOOD fixture classified '${good.class}', expected 'ok'`);
  if (good.problems.length !== 0) fail(`GOOD fixture had ${good.problems.length} problems, expected 0: ${JSON.stringify(good.problems)}`);

  // BAD fixture — VideoObject missing uploadDate, FAQPage with empty mainEntity.
  const badHtml = `
    <script type="application/ld+json">
    {"@context":"https://schema.org","@graph":[
      {"@type":"VideoObject","name":"Some lick","description":"desc","thumbnailUrl":"https://metalforge.io/t.jpg"},
      {"@type":"FAQPage","mainEntity":[]}
    ]}
    </script>`;
  const bad = analyzePage('https://metalforge.io/bad', badHtml);
  if (bad.class !== 'missing-fields') fail(`BAD fixture classified '${bad.class}', expected 'missing-fields'`);
  const expected = [
    { type: 'VideoObject', field: 'uploadDate', reason: 'missing-or-empty' },
    { type: 'FAQPage', field: 'mainEntity', reason: 'empty-array' },
  ];
  const got = bad.problems;
  const same = got.length === expected.length &&
    expected.every(e => got.some(g => g.type === e.type && g.field === e.field && g.reason === e.reason));
  if (!same) fail(`BAD fixture problems mismatch.\n  expected: ${JSON.stringify(expected)}\n  got:      ${JSON.stringify(got)}`);

  // Invalid-JSON fixture — must classify as invalid-json.
  const brokenHtml = `<script type="application/ld+json">{ not: valid json, }</script>`;
  const broken = analyzePage('https://metalforge.io/broken', brokenHtml);
  if (broken.class !== 'invalid-json') fail(`BROKEN fixture classified '${broken.class}', expected 'invalid-json'`);

  const ruleCount = Object.keys(REQUIRED_FIELDS).length;
  if (pass) {
    process.stderr.write(`[self-test] PASS — GOOD=0 problems, BAD=exact 2 problems, invalid-json detected (${ruleCount} @type rules)\n`);
    process.stdout.write(`SELF-TEST PASS (${ruleCount} rules)\n`);
    process.exit(0);
  } else {
    process.exit(1);
  }
}

/* ---------------------------------------------------------------------------
 * Main.
 * ------------------------------------------------------------------------- */
async function main() {
  if (hasFlag('self-test')) { selfTest(); return; }

  let xml;
  try {
    xml = await fetchSitemap(SITEMAP_URL);
  } catch (e) {
    log(`FATAL: cannot fetch sitemap: ${e.message}`);
    process.exit(1);
  }
  const all = parseSitemap(xml);
  if (all.length === 0) {
    log('FATAL: sitemap returned zero URLs');
    process.exit(1);
  }
  log(`sitemap: ${all.length} URLs`);

  const { sample, skipped, byTypeAvailable, byTypeSampled } = selectSample(all, LIMIT);
  log(`sampling ${sample.length}/${all.length} URLs (cap ${LIMIT}); by-type sampled: ${JSON.stringify(byTypeSampled)}`);
  if (skipped.length > 0) {
    for (const s of skipped) {
      log(`  SKIPPED (cap reached): type='${s.type}' sampled ${s.sampled}/${s.available} (${s.skipped} not scanned)`);
    }
  } else {
    log('  no URLs skipped — full coverage within cap');
  }

  const pageResults = await pool(sample, CONCURRENCY, async ({ url }) => {
    const pr = await fetchPage(url);
    if (pr.error) return { url, class: 'page-error', error: pr.error, status: pr.status, problems: [], parseErrors: [] };
    return analyzePage(url, pr.html);
  });

  const counts = {};
  for (const r of pageResults) counts[r.class] = (counts[r.class] || 0) + 1;

  // History baseline (keyed by URL) for WoW diff.
  fs.mkdirSync(HISTORY_DIR, { recursive: true });
  const historyFile = path.join(HISTORY_DIR, `${isoToday()}.json`);

  // Diff vs the most recent prior history file.
  const prevFiles = fs.readdirSync(HISTORY_DIR)
    .filter(f => /^\d{4}-\d{2}-\d{2}\.json$/.test(f) && f !== path.basename(historyFile))
    .sort();
  let newFailures = [];
  let fixed = [];
  let prevHistoryFile = null;
  if (prevFiles.length > 0) {
    prevHistoryFile = prevFiles[prevFiles.length - 1];
    const prev = JSON.parse(fs.readFileSync(path.join(HISTORY_DIR, prevHistoryFile), 'utf8'));
    const prevByUrl = prev.byUrl || {};
    for (const r of pageResults) {
      const wasFailing = prevByUrl[r.url] && prevByUrl[r.url].class !== 'ok' && prevByUrl[r.url].class !== 'no-jsonld';
      const nowFailing = r.class !== 'ok' && r.class !== 'no-jsonld' && r.class !== 'page-error';
      if (!wasFailing && nowFailing) newFailures.push({ url: r.url, class: r.class });
      if (wasFailing && !nowFailing) fixed.push({ url: r.url, was: prevByUrl[r.url].class });
    }
    log(`compared against ${prevHistoryFile}: ${newFailures.length} new failures, ${fixed.length} fixed`);
  }

  const report = {
    generatedAt: new Date().toISOString(),
    sitemapUrl: SITEMAP_URL,
    sitemapUrlCount: all.length,
    sampledCount: sample.length,
    limit: LIMIT,
    byTypeAvailable,
    byTypeSampled,
    skipped,
    prevHistoryFile,
    counts,
    wow: { newFailures, fixed },
    ruleset: REQUIRED_FIELDS,
    results: pageResults,
  };

  // Write history (compact, keyed by URL).
  const historyShape = {
    generatedAt: report.generatedAt,
    sitemapUrlCount: all.length,
    sampledCount: sample.length,
    byUrl: {},
  };
  for (const r of pageResults) {
    historyShape.byUrl[r.url] = {
      class: r.class,
      problems: (r.problems || []).map(p => `${p.type}.${p.field}`),
    };
  }
  fs.writeFileSync(historyFile, JSON.stringify(historyShape, null, 2));
  log(`wrote ${historyFile}`);

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(report, null, 2));
  log(`wrote ${OUT}`);
  log(`summary: ${Object.entries(counts).map(([k, v]) => `${k}=${v}`).join(' · ')}`);
}

module.exports = { validateNode, flattenGraph, extractLdJsonBlocks, analyzePage, selectSample, REQUIRED_FIELDS };

// Only run when invoked directly (so requiring the module for tests/renderer is pure).
if (require.main === module) {
  main().catch(e => {
    log(`FATAL: ${e.stack || e.message || e}`);
    process.exit(1);
  });
}
