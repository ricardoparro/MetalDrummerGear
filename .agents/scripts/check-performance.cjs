#!/usr/bin/env node
/**
 * L4 — Performance verifier (Lighthouse vs the LIVE site, biweekly).
 *
 * Runs `npx lighthouse` (mobile emulation, simulated throttling, performance
 * category only) against a fixed list of production URLs. Output:
 *   - .agents/seo/perf-history/YYYY-MM-DD.json (next run's baseline, committed)
 *   - JSON report (--out) the renderer turns into the umbrella issue + snapshot
 *
 * Why this exists, and why it's not the same thing as the CI perf-budget gate
 * (`perf-budget.yml` / #4410): that gate tests the BUILD on a PR — prevention.
 * This loop measures PRODUCTION — detection. CDN/Vercel config drift, AdSense/
 * GTM script bloat, and slow accumulated regressions across many small PRs
 * only show up on the live site, weeks after the code that caused them merged.
 * Both are needed; neither substitutes for the other.
 *
 * Delta vs the previous snapshot flags a regression per URL when:
 *   - performance score drops more than 5 points, OR
 *   - Total Blocking Time worsens more than 20%, OR
 *   - total transfer bytes grow more than 15%.
 * A detected regression is NOT a script failure (exit 0) — it's the signal
 * this loop exists to produce. Exit 1 only when the check itself errors (e.g.
 * lighthouse cannot run at all).
 *
 * Pure-ish: the only side effect beyond writing --out/history is an optional
 * Telegram ping on regression/recovery (existing postToTelegram convention,
 * silent no-op without TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID). No GitHub calls —
 * the umbrella issue is opened/edited/closed by the workflow, same split as
 * the L1/L3/structured-data verifiers.
 *
 * Local run:
 *   CHROME_PATH=/path/to/chrome \
 *   node .agents/scripts/check-performance.cjs \
 *     --history-dir .agents/seo/perf-history \
 *     --out /tmp/perf.json
 *
 * Self-test (no network — exercises the regression/delta logic against fixtures):
 *   node .agents/scripts/check-performance.cjs --self-test
 *
 * Flags:
 *   --self-test        Run the delta engine against fixtures, exit non-zero on mismatch.
 *   --dry-run          Do the real run, but print the Telegram message instead of sending it.
 *   --history-dir <d>  History dir for WoW diff (default .agents/seo/perf-history).
 *   --out <path>       Where to write the report JSON (default /tmp/perf.json).
 *   --chrome-flags <s> Override chrome-flags passed to lighthouse.
 *
 * Exit codes:
 *   0 — completed (or self-test passed), whether or not a regression was found
 *   1 — fatal (lighthouse could not run for ANY url) / self-test failed
 */

const fs = require('node:fs');
const path = require('node:path');
const https = require('node:https');
const { execFileSync } = require('node:child_process');
const os = require('node:os');

function argv(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 && i + 1 < process.argv.length ? process.argv[i + 1] : fallback;
}
function hasFlag(name) { return process.argv.includes(`--${name}`); }

const HISTORY_DIR = argv('history-dir', '.agents/seo/perf-history');
const OUT = argv('out', '/tmp/perf.json');
const CHROME_FLAGS = argv('chrome-flags', '--headless=new --no-sandbox --disable-gpu');
const PER_URL_TIMEOUT_MS = parseInt(argv('timeout', '120000'), 10);

// Fixed URL list — easily extended. One entry per "page family" we care about
// regressing: homepage, a drummer profile, the two gear hubs, an album
// article, and a top-10 list (each a distinct rendering/data shape).
const URLS = [
  { key: 'homepage', url: 'https://metalforge.io/' },
  { key: 'drummer-lars-ulrich', url: 'https://metalforge.io/drummer/lars-ulrich' },
  { key: 'drumsticks', url: 'https://metalforge.io/drumsticks' },
  { key: 'cymbals', url: 'https://metalforge.io/cymbals' },
  { key: 'album-article', url: 'https://metalforge.io/articles/sacrament-drum-setup' },
  { key: 'top10-list', url: 'https://metalforge.io/lists/best-death-metal-drummers' },
];

// Regression thresholds — see header comment.
const THRESHOLDS = { scoreDrop: 5, tbtWorsenPct: 0.20, transferGrowPct: 0.15 };

function log(msg) { process.stderr.write(`[perf] ${msg}\n`); }
function isoToday() { return new Date().toISOString().split('T')[0]; }

/* ---------------------------------------------------------------------------
 * Telegram — existing convention (watchdog.cjs / scan-events.cjs / etc).
 * ------------------------------------------------------------------------- */
function postToTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    process.stderr.write('Telegram skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID missing.\n');
    return Promise.resolve(false);
  }
  const body = JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML', disable_web_page_preview: true });
  return new Promise((resolve) => {
    const req = https.request({
      method: 'POST',
      hostname: 'api.telegram.org',
      path: `/bot${token}/sendMessage`,
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
    }, (res) => {
      let chunks = '';
      res.on('data', (c) => chunks += c);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) { process.stderr.write('Telegram: sent.\n'); resolve(true); }
        else { process.stderr.write(`Telegram failed (${res.statusCode}): ${chunks.slice(0, 300)}\n`); resolve(false); }
      });
    });
    req.on('error', (e) => { process.stderr.write(`Telegram error: ${e.message}\n`); resolve(false); });
    req.write(body);
    req.end();
  });
}

/* ---------------------------------------------------------------------------
 * Lighthouse invocation + metric extraction.
 * ------------------------------------------------------------------------- */
function runLighthouse(url, chromeFlags) {
  const outPath = path.join(os.tmpdir(), `lh-${Math.random().toString(36).slice(2)}.json`);
  const args = [
    'lighthouse', url,
    '--output=json',
    `--output-path=${outPath}`,
    '--only-categories=performance',
    '--form-factor=mobile',
    '--throttling-method=simulate',
    `--chrome-flags=${chromeFlags}`,
    '--quiet',
    '--max-wait-for-load=45000',
  ];
  try {
    execFileSync('npx', args, { stdio: ['ignore', 'ignore', 'pipe'], timeout: PER_URL_TIMEOUT_MS });
    const lhr = JSON.parse(fs.readFileSync(outPath, 'utf8'));
    return lhr;
  } finally {
    fs.rmSync(outPath, { force: true });
  }
}

/**
 * Pull the metrics we track out of a raw Lighthouse Result (LHR) object.
 * Pure — takes/returns plain data, no I/O — so it's testable with fixtures.
 */
function extractMetrics(lhr) {
  const audits = lhr.audits || {};
  const numeric = (id) => audits[id]?.numericValue ?? null;
  const score = Math.round((lhr.categories?.performance?.score ?? 0) * 100);
  const networkRequests = audits['network-requests']?.details?.items || [];
  const jsRequests = networkRequests
    .filter(r => r.resourceType === 'Script')
    .sort((a, b) => (b.transferSize || 0) - (a.transferSize || 0));
  const biggestJs = jsRequests.slice(0, 2).map(r => ({ url: r.url, transferSize: r.transferSize || 0 }));
  const totalBytes = numeric('total-byte-weight') ?? networkRequests.reduce((a, r) => a + (r.transferSize || 0), 0);
  return {
    score,
    fcp: numeric('first-contentful-paint'),
    lcp: numeric('largest-contentful-paint'),
    tbt: numeric('total-blocking-time'),
    cls: numeric('cumulative-layout-shift'),
    speedIndex: numeric('speed-index'),
    totalBytes,
    biggestJs,
  };
}

/* ---------------------------------------------------------------------------
 * Delta / regression engine — pure, exercised by --self-test.
 * ------------------------------------------------------------------------- */
function diffUrl(key, prev, curr) {
  if (!prev) return { key, regressed: false, firstRun: true, reasons: [] };
  const reasons = [];
  if (prev.score != null && curr.score != null) {
    const drop = prev.score - curr.score;
    if (drop > THRESHOLDS.scoreDrop) reasons.push(`score ${prev.score} → ${curr.score} (−${drop})`);
  }
  if (prev.tbt != null && curr.tbt != null && prev.tbt > 0) {
    const pct = (curr.tbt - prev.tbt) / prev.tbt;
    if (pct > THRESHOLDS.tbtWorsenPct) {
      reasons.push(`TBT ${Math.round(prev.tbt)}ms → ${Math.round(curr.tbt)}ms (+${Math.round(pct * 100)}%)`);
    }
  }
  if (prev.totalBytes != null && curr.totalBytes != null && prev.totalBytes > 0) {
    const pct = (curr.totalBytes - prev.totalBytes) / prev.totalBytes;
    if (pct > THRESHOLDS.transferGrowPct) {
      reasons.push(`transfer ${prev.totalBytes}B → ${curr.totalBytes}B (+${Math.round(pct * 100)}%)`);
    }
  }
  return { key, regressed: reasons.length > 0, firstRun: false, reasons };
}

/**
 * Compare a current { key -> metrics } map against the previous one (or null
 * on the first-ever run). Returns { firstRun, diffs, regressions, recovered }.
 * `recovered` = URLs present in prev that are no longer regressing per this
 * pair-wise diff (i.e. the umbrella issue's close condition).
 */
function buildReport(prevByUrl, currByUrl) {
  const firstRun = !prevByUrl;
  const diffs = Object.entries(currByUrl).map(([key, curr]) => diffUrl(key, prevByUrl?.[key], curr));
  const regressions = diffs.filter(d => d.regressed);
  return { firstRun, diffs, regressions };
}

/* ---------------------------------------------------------------------------
 * Self-test.
 * ------------------------------------------------------------------------- */
function selfTest() {
  let pass = true;
  const fail = msg => { pass = false; process.stderr.write(`[self-test] FAIL: ${msg}\n`); };

  const base = { score: 70, tbt: 1000, totalBytes: 1_000_000, fcp: 1200, lcp: 2400, cls: 0.05, speedIndex: 2500, biggestJs: [] };

  // 1. First run — no previous snapshot at all.
  const r1 = buildReport(null, { homepage: base });
  if (!r1.firstRun) fail('first-run report did not set firstRun=true');
  if (r1.regressions.length !== 0) fail(`first-run report flagged ${r1.regressions.length} regressions, expected 0`);

  // 2. Clear regression on all three axes.
  const degraded = { ...base, score: 60, tbt: 1300, totalBytes: 1_200_000 };
  const r2 = buildReport({ homepage: base }, { homepage: degraded });
  if (r2.firstRun) fail('regression report incorrectly set firstRun=true');
  if (r2.regressions.length !== 1) fail(`regression report flagged ${r2.regressions.length} URLs, expected 1`);
  else if (r2.regressions[0].reasons.length !== 3) {
    fail(`expected 3 reasons (score/TBT/transfer), got ${r2.regressions[0].reasons.length}: ${JSON.stringify(r2.regressions[0].reasons)}`);
  }

  // 3. Minor noise — under every threshold — must NOT be flagged.
  const minor = { ...base, score: 68, tbt: 1050, totalBytes: 1_050_000 };
  const r3 = buildReport({ homepage: base }, { homepage: minor });
  if (r3.regressions.length !== 0) fail(`minor-noise report flagged ${r3.regressions.length} regressions, expected 0`);

  // 4. Recovery — previous run was the degraded state, current is back to base.
  const r4 = buildReport({ homepage: degraded }, { homepage: base });
  if (r4.regressions.length !== 0) fail(`recovery report flagged ${r4.regressions.length} regressions, expected 0 (improvement, not regression)`);

  // 5. Mixed — one URL regresses, one doesn't, in the same run.
  const r5 = buildReport({ homepage: base, drumsticks: base }, { homepage: degraded, drumsticks: minor });
  if (r5.regressions.length !== 1 || r5.regressions[0].key !== 'homepage') {
    fail(`mixed report expected exactly 1 regression on 'homepage', got: ${JSON.stringify(r5.regressions.map(d => d.key))}`);
  }

  // 6. extractMetrics() against a minimal fixture LHR.
  const fixtureLhr = {
    categories: { performance: { score: 0.63 } },
    audits: {
      'first-contentful-paint': { numericValue: 1800 },
      'largest-contentful-paint': { numericValue: 3200 },
      'total-blocking-time': { numericValue: 2900 },
      'cumulative-layout-shift': { numericValue: 0.08 },
      'speed-index': { numericValue: 4100 },
      'total-byte-weight': { numericValue: 900_000 },
      'network-requests': {
        details: {
          items: [
            { url: 'https://metalforge.io/a.js', resourceType: 'Script', transferSize: 300_000 },
            { url: 'https://metalforge.io/b.js', resourceType: 'Script', transferSize: 150_000 },
            { url: 'https://metalforge.io/c.js', resourceType: 'Script', transferSize: 50_000 },
            { url: 'https://metalforge.io/img.jpg', resourceType: 'Image', transferSize: 400_000 },
          ],
        },
      },
    },
  };
  const m = extractMetrics(fixtureLhr);
  if (m.score !== 63) fail(`extractMetrics score = ${m.score}, expected 63`);
  if (m.tbt !== 2900) fail(`extractMetrics tbt = ${m.tbt}, expected 2900`);
  if (m.biggestJs.length !== 2 || m.biggestJs[0].url !== 'https://metalforge.io/a.js' || m.biggestJs[1].url !== 'https://metalforge.io/b.js') {
    fail(`extractMetrics biggestJs mismatch: ${JSON.stringify(m.biggestJs)}`);
  }

  if (pass) {
    process.stderr.write('[self-test] PASS — first-run, regression (3-axis), minor-noise, recovery, mixed, extractMetrics\n');
    process.stdout.write('SELF-TEST PASS\n');
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
  const dryRun = hasFlag('dry-run');

  const results = [];
  for (const { key, url } of URLS) {
    log(`running lighthouse: ${key} (${url})`);
    try {
      const lhr = runLighthouse(url, CHROME_FLAGS);
      const metrics = extractMetrics(lhr);
      results.push({ key, url, ok: true, metrics });
      log(`  ${key}: score=${metrics.score} tbt=${Math.round(metrics.tbt ?? -1)}ms bytes=${metrics.totalBytes}`);
    } catch (e) {
      results.push({ key, url, ok: false, error: e.message || String(e) });
      log(`  ${key}: FAILED — ${e.message || e}`);
    }
  }

  const ok = results.filter(r => r.ok);
  if (ok.length === 0) {
    log('FATAL: lighthouse failed for every URL — see errors above.');
    process.exit(1);
  }

  const currByUrl = {};
  for (const r of ok) currByUrl[r.key] = { url: r.url, ...r.metrics };

  fs.mkdirSync(HISTORY_DIR, { recursive: true });
  const historyFile = path.join(HISTORY_DIR, `${isoToday()}.json`);
  const prevFiles = fs.readdirSync(HISTORY_DIR)
    .filter(f => /^\d{4}-\d{2}-\d{2}\.json$/.test(f) && f !== path.basename(historyFile))
    .sort();
  let prevByUrl = null;
  let prevHistoryFile = null;
  if (prevFiles.length > 0) {
    prevHistoryFile = prevFiles[prevFiles.length - 1];
    const prev = JSON.parse(fs.readFileSync(path.join(HISTORY_DIR, prevHistoryFile), 'utf8'));
    prevByUrl = prev.byUrl || {};
  }

  const { firstRun, diffs, regressions } = buildReport(prevByUrl, currByUrl);
  log(firstRun
    ? 'first run — no previous snapshot, no deltas'
    : `compared against ${prevHistoryFile}: ${regressions.length} regression(s)`);

  const generatedAt = new Date().toISOString();
  const historyShape = { generatedAt, byUrl: currByUrl };
  fs.writeFileSync(historyFile, JSON.stringify(historyShape, null, 2));
  log(`wrote ${historyFile}`);

  const report = {
    generatedAt,
    urls: URLS,
    prevHistoryFile,
    firstRun,
    failed: results.filter(r => !r.ok).map(r => ({ key: r.key, url: r.url, error: r.error })),
    results: ok.map(r => ({ key: r.key, url: r.url, ...r.metrics })),
    diffs,
    regressions,
  };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(report, null, 2));
  log(`wrote ${OUT}`);

  if (regressions.length > 0) {
    const lines = regressions.map(r => `• ${r.key}: ${r.reasons.join('; ')}`);
    const text = `⚠️ <b>L4 Performance</b>: ${regressions.length} URL(s) regressed vs ${prevHistoryFile}\n${lines.join('\n')}`;
    if (dryRun) process.stdout.write(`\n--- TELEGRAM (dry-run) ---\n${text}\n`);
    else await postToTelegram(text);
  } else if (!firstRun && prevByUrl) {
    log('no regressions this run.');
  }
}

module.exports = { extractMetrics, diffUrl, buildReport, URLS, THRESHOLDS };

if (require.main === module) {
  main().catch(e => {
    log(`FATAL: ${e.stack || e.message || e}`);
    process.exit(1);
  });
}
