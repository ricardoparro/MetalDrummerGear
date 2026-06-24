#!/usr/bin/env node
/**
 * GSC scan-all-queries verifier (L1, v2).
 *
 * Fetches EVERY query the property currently surfaces in GSC for the last 7
 * days, diffs each one against the snapshot from the previous weekly run,
 * and classifies each query. The previous-run cache lives in
 * .agents/seo/gsc-history/YYYY-MM-DD.json (one file per run, append-only).
 *
 * The v1 model — a hand-curated watched-queries.json with a static baseline
 * per entry — was useful as a seed but does not scale: GSC surfaces hundreds
 * of queries for this site and pre-declaring each one is busywork. This v2
 * uses the previous run as the rolling baseline, so:
 *   - new queries surface automatically
 *   - queries that disappear are flagged
 *   - "0% CTR opportunity" rows surface without anyone declaring them upfront
 *
 * Pure: no GitHub calls. Reads the most recent week-*.json under
 * .agents/seo/gsc-history/ if present; writes a new one + the JSON report.
 *
 * Local run:
 *   GOOGLE_APPLICATION_CREDENTIALS=/path/to/sa.json \
 *   GSC_SITE='https://metalforge.io/' \
 *   node .agents/scripts/check-gsc-watched-queries.cjs \
 *     --history-dir .agents/seo/gsc-history \
 *     --out /tmp/gsc-watch.json
 *
 * Exit codes:
 *   0 — completed (whether or not movement happened)
 *   1 — fatal (credentials missing, GSC unreachable). The workflow does NOT
 *       mutate the umbrella issue or commit anything in this case.
 */

const fs = require('node:fs');
const path = require('node:path');

function argv(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 && i + 1 < process.argv.length ? process.argv[i + 1] : fallback;
}

const HISTORY_DIR = argv('history-dir', '.agents/seo/gsc-history');
const OUT = argv('out', '/tmp/gsc-watch.json');
const LOOKBACK_DAYS = parseInt(argv('lookback', '7'), 10);
const ROW_LIMIT = parseInt(argv('row-limit', '5000'), 10);

function log(msg) { process.stderr.write(`[gsc-watch] ${msg}\n`); }
function isoDaysAgo(n) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().split('T')[0];
}
function isoToday() { return new Date().toISOString().split('T')[0]; }

async function getGSCClient() {
  const site = process.env.GSC_SITE;
  const creds = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!site) throw new Error('GSC_SITE env missing');
  if (!creds) throw new Error('GOOGLE_APPLICATION_CREDENTIALS env missing');
  let google;
  try { ({ google } = require('googleapis')); }
  catch { throw new Error('googleapis not installed'); }
  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });
  const client = await auth.getClient();
  const webmasters = google.webmasters({ version: 'v3', auth: client });
  return { webmasters, site };
}

async function fetchAllQueries({ webmasters, site }, days) {
  const startDate = isoDaysAgo(days);
  const endDate = isoToday();
  const r = await webmasters.searchanalytics.query({
    siteUrl: site,
    requestBody: {
      startDate,
      endDate,
      dimensions: ['query'],
      rowLimit: ROW_LIMIT,
    },
  });
  const rows = r.data.rows || [];
  const byQuery = {};
  for (const row of rows) {
    const q = row.keys?.[0];
    if (!q) continue;
    byQuery[q] = {
      impressions: row.impressions || 0,
      clicks: row.clicks || 0,
      position: row.position ?? null,
      ctr: row.ctr || 0,
    };
  }
  return { window: { startDate, endDate, days }, queries: byQuery };
}

function loadMostRecentHistory(dir) {
  if (!fs.existsSync(dir)) return null;
  const files = fs.readdirSync(dir)
    .filter(f => /^\d{4}-\d{2}-\d{2}\.json$/.test(f))
    .sort();
  if (files.length === 0) return null;
  const last = files[files.length - 1];
  try {
    const data = JSON.parse(fs.readFileSync(path.join(dir, last), 'utf8'));
    return { file: last, data };
  } catch (e) {
    log(`WARN: cannot parse ${last}: ${e.message}`);
    return null;
  }
}

function classify(prev, curr) {
  // Newly surfacing: not in prev, current has meaningful impressions.
  if (!prev) {
    if (curr.impressions >= 5) {
      return { class: 'new', reason: `first appearance — pos ${(curr.position ?? 0).toFixed(1)}, ${curr.impressions} impr, ${curr.clicks} cl` };
    }
    return { class: 'noise', reason: 'first appearance with <5 impressions — too small to act on' };
  }

  // Disappeared: had clicks last week, zero impressions this week.
  if (curr.impressions === 0 || curr.impressions == null) {
    if ((prev.clicks ?? 0) >= 5 || (prev.impressions ?? 0) >= 50) {
      return { class: 'disappeared', reason: `was ${prev.impressions} impr / ${prev.clicks} cl, now 0` };
    }
    return { class: 'noise', reason: 'gone but had < 5 clicks / 50 impr — not worth acting on' };
  }

  // Position delta — lower is better.
  let posDelta = 0;
  if (prev.position != null && curr.position != null) {
    posDelta = prev.position - curr.position; // positive = improved
  }

  // Impression ratio.
  const imprRatio = prev.impressions > 0 ? curr.impressions / prev.impressions : Infinity;

  // CTR-gap opportunity: position 3..10, ≥20 impressions, CTR < 1%.
  // This is the "Brann Dailor pattern" — visible but invisible.
  const isCtrGap =
    curr.position != null &&
    curr.position >= 3 && curr.position <= 10 &&
    curr.impressions >= 20 &&
    curr.ctr < 0.01;

  // Big win.
  if (posDelta >= 3 && curr.impressions >= 10) {
    return { class: 'big-win', reason: `pos ${prev.position.toFixed(1)} → ${curr.position.toFixed(1)} (↑${posDelta.toFixed(1)}) · impr ${prev.impressions} → ${curr.impressions}` };
  }
  if (imprRatio >= 2 && curr.impressions >= 20) {
    return { class: 'big-win', reason: `impr ${prev.impressions} → ${curr.impressions} (${imprRatio.toFixed(1)}x)` };
  }
  if ((prev.clicks ?? 0) === 0 && curr.clicks >= 1 && curr.impressions >= 10) {
    return { class: 'big-win', reason: `clicks 0 → ${curr.clicks} (first clicks) · pos ${(curr.position ?? 0).toFixed(1)} · ${curr.impressions} impr` };
  }

  // Big loss.
  if (posDelta <= -3 && prev.impressions >= 10) {
    return { class: 'big-loss', reason: `pos ${prev.position.toFixed(1)} → ${curr.position.toFixed(1)} (↓${(-posDelta).toFixed(1)}) · impr ${prev.impressions} → ${curr.impressions}` };
  }
  if (imprRatio <= 0.5 && prev.impressions >= 50) {
    return { class: 'big-loss', reason: `impr ${prev.impressions} → ${curr.impressions} (${imprRatio.toFixed(1)}x)` };
  }
  if ((prev.clicks ?? 0) >= 4 && curr.clicks * 2 <= prev.clicks) {
    return { class: 'big-loss', reason: `clicks ${prev.clicks} → ${curr.clicks} (≤0.5x)` };
  }

  // CTR-gap opportunity (only after we ruled out big movement).
  if (isCtrGap) {
    return { class: 'ctr-gap-opportunity', reason: `pos ${curr.position.toFixed(1)} · ${curr.impressions} impr · CTR ${(curr.ctr * 100).toFixed(2)}% (≥20 impr at top-10 with <1% CTR — title/snippet mismatch)` };
  }

  return { class: 'null', reason: `pos ${(curr.position ?? 0).toFixed(1)} · impr ${curr.impressions} (${imprRatio === Infinity ? 'new' : imprRatio.toFixed(1) + 'x'}) · cl ${curr.clicks}` };
}

(async () => {
  let gsc;
  try { gsc = await getGSCClient(); }
  catch (e) { log(`FATAL: ${e.message}`); process.exit(1); }

  log('fetching all queries from GSC...');
  const current = await fetchAllQueries(gsc, LOOKBACK_DAYS);
  const queryCount = Object.keys(current.queries).length;
  log(`fetched ${queryCount} queries (window ${current.window.startDate} → ${current.window.endDate})`);

  const prevHistory = loadMostRecentHistory(HISTORY_DIR);
  if (prevHistory) log(`prev history: ${prevHistory.file} (${Object.keys(prevHistory.data.queries || {}).length} queries)`);
  else log('no prev history — first run, every query is "new"');

  // Diff.
  const results = [];
  const prevQ = prevHistory?.data?.queries || {};
  const allQueries = new Set([...Object.keys(current.queries), ...Object.keys(prevQ)]);
  for (const q of allQueries) {
    const prev = prevQ[q];
    const curr = current.queries[q] || { impressions: 0, clicks: 0, position: null, ctr: 0 };
    const verdict = classify(prev, curr);
    results.push({ q, prev: prev ?? null, curr, verdict });
  }

  // Sort: actionable classes first, then by impact (impressions desc).
  const ORDER = ['big-loss', 'disappeared', 'ctr-gap-opportunity', 'big-win', 'new', 'null', 'noise'];
  results.sort((a, b) => {
    const ai = ORDER.indexOf(a.verdict.class);
    const bi = ORDER.indexOf(b.verdict.class);
    if (ai !== bi) return ai - bi;
    return (b.curr.impressions || 0) - (a.curr.impressions || 0);
  });

  const counts = {};
  for (const r of results) counts[r.verdict.class] = (counts[r.verdict.class] || 0) + 1;

  // Persist current as next-run baseline.
  fs.mkdirSync(HISTORY_DIR, { recursive: true });
  const historyFile = path.join(HISTORY_DIR, `${isoToday()}.json`);
  fs.writeFileSync(historyFile, JSON.stringify({
    generatedAt: new Date().toISOString(),
    site: process.env.GSC_SITE,
    window: current.window,
    queries: current.queries,
  }, null, 2));
  log(`wrote ${historyFile} (next run's baseline)`);

  // Write the report JSON for the renderer.
  const report = {
    generatedAt: new Date().toISOString(),
    site: process.env.GSC_SITE,
    lookbackDays: LOOKBACK_DAYS,
    queriesTotal: queryCount,
    prevHistoryFile: prevHistory?.file || null,
    counts,
    results,
  };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(report, null, 2));
  log(`wrote ${OUT}`);
  log(`summary: ${Object.entries(counts).map(([k, v]) => `${k}=${v}`).join(' ')}`);
})().catch(e => {
  log(`FATAL: ${e.stack || e.message || e}`);
  process.exit(1);
});
