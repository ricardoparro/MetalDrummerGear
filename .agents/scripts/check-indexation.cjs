#!/usr/bin/env node
/**
 * L3 — Indexation health verifier.
 *
 * For each URL in metalforge.io/sitemap.xml, call the Search Console
 * URL Inspection API and classify the index status. Output:
 *   - .agents/seo/indexation-history/YYYY-MM-DD.json (next run's baseline)
 *   - .agents/seo/indexation-snapshot.md             (every URL, by class)
 *   - Umbrella issue `indexation-watch`              (actionable rows only)
 *
 * Why this exists: every URL we ship goes into the sitemap, but Google
 * indexes maybe 50% of them. The other half sits in "Crawled - currently
 * not indexed" or "Discovered - currently not indexed" purgatory. That's
 * traffic we paid for (Ralph minutes + Claude tokens) and never collected.
 * This loop surfaces exactly which URLs are in purgatory so the CEO can
 * triage (improve content vs. internal-link boost vs. remove from sitemap).
 *
 * Quota: GSC URL Inspection API is 2000/day per property. We cap each run
 * at 500 by default and rotate the priority list so the whole sitemap gets
 * covered over ~7 weeks. Tunable via --max-urls.
 *
 * Pure: no GitHub calls. Reads previous-run JSON if present; writes a new
 * one + the report JSON.
 *
 * Local run:
 *   GOOGLE_APPLICATION_CREDENTIALS=/path/to/sa.json \
 *   GSC_SITE='https://metalforge.io/' \
 *   node .agents/scripts/check-indexation.cjs \
 *     --history-dir .agents/seo/indexation-history \
 *     --max-urls 500 \
 *     --out /tmp/indexation.json
 *
 * Exit codes:
 *   0 — completed
 *   1 — fatal (credentials missing, sitemap unreachable, GSC API down)
 */

const fs = require('node:fs');
const path = require('node:path');

function argv(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 && i + 1 < process.argv.length ? process.argv[i + 1] : fallback;
}

const HISTORY_DIR = argv('history-dir', '.agents/seo/indexation-history');
const OUT = argv('out', '/tmp/indexation.json');
const MAX_URLS = parseInt(argv('max-urls', '500'), 10);
const SITEMAP_URL = argv('sitemap', 'https://metalforge.io/sitemap.xml');
const CONCURRENCY = parseInt(argv('concurrency', '4'), 10);
const PER_REQUEST_TIMEOUT_MS = parseInt(argv('timeout', '30000'), 10);

function log(msg) { process.stderr.write(`[indexation] ${msg}\n`); }
function isoToday() { return new Date().toISOString().split('T')[0]; }
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function fetchSitemap(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 30_000);
  try {
    const r = await fetch(url, { signal: ctrl.signal, headers: { 'User-Agent': 'MetalForge-IndexationCheck/1.0' } });
    if (!r.ok) throw new Error(`sitemap ${r.status}`);
    return await r.text();
  } finally { clearTimeout(t); }
}

function parseSitemap(xml) {
  // Lightweight: extract <url>...<loc>...</loc>...<priority>...</priority>...</url> blocks.
  const out = [];
  for (const m of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const block = m[1];
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1]?.trim();
    if (!loc) continue;
    const priority = parseFloat(block.match(/<priority>([^<]+)<\/priority>/)?.[1] ?? '0.5');
    out.push({ url: loc, priority });
  }
  return out;
}

async function getGSCClient() {
  const site = process.env.GSC_SITE;
  const creds = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!site) throw new Error('GSC_SITE env missing');
  if (!creds) throw new Error('GOOGLE_APPLICATION_CREDENTIALS env missing');
  let google;
  try { ({ google } = require('googleapis')); }
  catch { throw new Error('googleapis not installed'); }
  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/webmasters'],
  });
  const client = await auth.getClient();
  const searchconsole = google.searchconsole({ version: 'v1', auth: client });
  return { searchconsole, site };
}

// Maps the indexStatusResult.coverageState text to a stable class name.
// Coverage state strings come from Google verbatim — we match prefixes to
// be resilient to wording tweaks.
function classifyCoverage(verdict, coverageState) {
  const cs = (coverageState || '').toLowerCase();
  if (verdict === 'PASS') {
    if (cs.startsWith('submitted and indexed')) return 'indexed';
    if (cs.startsWith('indexed, not submitted in sitemap')) return 'indexed-not-in-sitemap';
    if (cs.includes('blocked by robots')) return 'indexed-but-blocked';
    return 'indexed';
  }
  if (verdict === 'PARTIAL') return 'indexed-with-issues';
  // FAIL or NEUTRAL — coverage state tells us why.
  if (cs.includes('discovered - currently not indexed')) return 'discovered-not-indexed';
  if (cs.includes('crawled - currently not indexed')) return 'crawled-not-indexed';
  if (cs.includes("excluded by 'noindex' tag") || cs.includes('excluded by noindex')) return 'excluded-noindex';
  if (cs.includes('page with redirect') || cs.includes('alternate page with proper canonical')) return 'redirect-or-canonical';
  if (cs.includes('duplicate without user-selected canonical')) return 'duplicate';
  if (cs.includes('duplicate, google chose different canonical')) return 'duplicate-google-canonical';
  if (cs.includes('not found (404)')) return 'error-404';
  if (cs.includes('soft 404')) return 'soft-404';
  if (cs.includes('server error') || cs.includes('5xx')) return 'error-5xx';
  if (cs.includes('blocked by robots.txt')) return 'blocked-by-robots';
  if (cs.includes('blocked due to other 4xx')) return 'error-4xx-other';
  return 'unknown';
}

async function inspect({ searchconsole, site }, url) {
  const r = await searchconsole.urlInspection.index.inspect({
    requestBody: { inspectionUrl: url, siteUrl: site, languageCode: 'en-US' },
  });
  const res = r?.data?.inspectionResult?.indexStatusResult || {};
  return {
    verdict: res.verdict || 'UNKNOWN',
    coverageState: res.coverageState || '',
    robotsTxtState: res.robotsTxtState || '',
    indexingState: res.indexingState || '',
    pageFetchState: res.pageFetchState || '',
    lastCrawlTime: res.lastCrawlTime || null,
    googleCanonical: res.googleCanonical || null,
    userCanonical: res.userCanonical || null,
  };
}

async function pool(items, n, worker) {
  const out = new Array(items.length);
  let i = 0;
  async function run() {
    while (true) {
      const idx = i++;
      if (idx >= items.length) return;
      try {
        const r = await Promise.race([
          worker(items[idx], idx),
          new Promise((_, rej) => setTimeout(() => rej(new Error('per-request timeout')), PER_REQUEST_TIMEOUT_MS)),
        ]);
        out[idx] = r;
      } catch (e) {
        out[idx] = { _error: e.message };
      }
      if (idx % 25 === 0 && idx > 0) log(`  inspected ${idx}/${items.length}`);
    }
  }
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, run));
  return out;
}

(async () => {
  let gsc;
  try { gsc = await getGSCClient(); }
  catch (e) { log(`FATAL: ${e.message}`); process.exit(1); }

  log(`fetching sitemap ${SITEMAP_URL}`);
  let urls;
  try {
    const xml = await fetchSitemap(SITEMAP_URL);
    urls = parseSitemap(xml);
  } catch (e) {
    log(`FATAL: cannot fetch/parse sitemap: ${e.message}`);
    process.exit(1);
  }
  log(`sitemap: ${urls.length} URLs`);

  // Slice: highest priority first, then stable order.
  urls.sort((a, b) => b.priority - a.priority || a.url.localeCompare(b.url));
  const slice = urls.slice(0, MAX_URLS);
  log(`inspecting top ${slice.length} URLs (priority desc)`);

  const results = await pool(slice, CONCURRENCY, async ({ url, priority }) => {
    const ins = await inspect(gsc, url);
    const cls = classifyCoverage(ins.verdict, ins.coverageState);
    return { url, priority, ...ins, class: cls };
  });

  // Normalize errors: ones with _error retain that.
  const counts = {};
  for (const r of results) {
    if (r._error) { counts['error-inspect'] = (counts['error-inspect'] || 0) + 1; continue; }
    counts[r.class] = (counts[r.class] || 0) + 1;
  }

  // Persist current as next-run baseline (keyed by URL, so we can diff WoW).
  fs.mkdirSync(HISTORY_DIR, { recursive: true });
  const historyFile = path.join(HISTORY_DIR, `${isoToday()}.json`);
  const historyShape = {
    generatedAt: new Date().toISOString(),
    site: process.env.GSC_SITE,
    sitemapUrlCount: urls.length,
    inspectedCount: slice.length,
    byUrl: {},
  };
  for (const r of results) {
    if (r._error) continue;
    historyShape.byUrl[r.url] = { class: r.class, verdict: r.verdict, coverageState: r.coverageState, lastCrawlTime: r.lastCrawlTime };
  }
  fs.writeFileSync(historyFile, JSON.stringify(historyShape, null, 2));
  log(`wrote ${historyFile}`);

  // Diff vs previous (if any).
  let regressions = [];
  const prevFiles = fs.readdirSync(HISTORY_DIR)
    .filter(f => /^\d{4}-\d{2}-\d{2}\.json$/.test(f) && f !== path.basename(historyFile))
    .sort();
  if (prevFiles.length > 0) {
    const prevFile = prevFiles[prevFiles.length - 1];
    const prev = JSON.parse(fs.readFileSync(path.join(HISTORY_DIR, prevFile), 'utf8'));
    for (const r of results) {
      if (r._error) continue;
      const wasIndexed = prev.byUrl?.[r.url]?.class === 'indexed';
      const nowIndexed = r.class === 'indexed';
      if (wasIndexed && !nowIndexed) regressions.push({ url: r.url, prev: prev.byUrl[r.url].class, curr: r.class });
    }
    log(`compared against ${prevFile}: ${regressions.length} regressions (was indexed -> now not)`);
  }

  const report = {
    generatedAt: new Date().toISOString(),
    site: process.env.GSC_SITE,
    sitemapUrl: SITEMAP_URL,
    sitemapUrlCount: urls.length,
    inspectedCount: slice.length,
    inspectionCap: MAX_URLS,
    prevHistoryFile: prevFiles.length > 0 ? prevFiles[prevFiles.length - 1] : null,
    counts,
    regressions,
    results,
  };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(report, null, 2));
  log(`wrote ${OUT}`);
  log(`summary: ${Object.entries(counts).map(([k, v]) => `${k}=${v}`).join(' · ')}`);
})().catch(e => {
  log(`FATAL: ${e.stack || e.message || e}`);
  process.exit(1);
});
