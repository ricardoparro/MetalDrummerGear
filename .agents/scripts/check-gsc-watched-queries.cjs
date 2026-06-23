#!/usr/bin/env node
/**
 * GSC-gap CLOSURE verifier (L1).
 *
 * For each query in .agents/seo/watched-queries.json, fetch the last 7 days
 * of GSC numbers and compare to the baseline captured when the entry was
 * added. Classify each entry into win / null / loss / no-data, write a
 * JSON report. The workflow turns that into:
 *   - .agents/seo/gsc-watch-snapshot.md  (the CEO reads this each run)
 *   - An umbrella issue (open / edit / close), same lifecycle as L2
 *
 * Pure: no GitHub calls, no file mutation beyond the --out JSON.
 *
 * Local run:
 *   GOOGLE_APPLICATION_CREDENTIALS=/path/to/sa.json \
 *   GSC_SITE='https://metalforge.io/' \
 *   node .agents/scripts/check-gsc-watched-queries.cjs \
 *     --watches .agents/seo/watched-queries.json \
 *     --out /tmp/gsc-watch.json
 *
 * Also supports a one-off baseline-print mode (no watches file needed):
 *   node .agents/scripts/check-gsc-watched-queries.cjs \
 *     --query 'brann dailor drum kit' --baseline
 *   -> prints the current 7-day numbers in the exact JSON shape needed for
 *      an entry in watched-queries.json.
 *
 * Exit codes:
 *   0 — completed (whether or not movement happened)
 *   1 — fatal (credentials missing, GSC unreachable, watches unreadable).
 *       Workflow does NOT mutate the umbrella issue in this case.
 */

const fs = require('node:fs');
const path = require('node:path');

function argv(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 && i + 1 < process.argv.length ? process.argv[i + 1] : fallback;
}
function flag(name) {
  return process.argv.includes(`--${name}`);
}

const WATCHES_FILE = argv('watches', '.agents/seo/watched-queries.json');
const OUT = argv('out', '/tmp/gsc-watch.json');
const LOOKBACK_DAYS = parseInt(argv('lookback', '7'), 10);
const BASELINE_MODE = flag('baseline');
const SINGLE_QUERY = argv('query', '');

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
  if (!site) throw new Error('GSC_SITE env missing (e.g. "https://metalforge.io/")');
  if (!creds) throw new Error('GOOGLE_APPLICATION_CREDENTIALS env missing');
  let google;
  try { ({ google } = require('googleapis')); }
  catch { throw new Error('googleapis not installed (npm i googleapis)'); }
  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });
  const client = await auth.getClient();
  const webmasters = google.webmasters({ version: 'v3', auth: client });
  return { webmasters, site };
}

async function fetchQueryWindow({ webmasters, site }, query, days) {
  const startDate = isoDaysAgo(days);
  const endDate = isoToday();
  const r = await webmasters.searchanalytics.query({
    siteUrl: site,
    requestBody: {
      startDate,
      endDate,
      dimensions: ['query'],
      rowLimit: 1,
      dimensionFilterGroups: [{
        filters: [{ dimension: 'query', operator: 'equals', expression: query }],
      }],
    },
  });
  const row = (r.data.rows || [])[0];
  if (!row) {
    return {
      window: { startDate, endDate, days },
      impressions: 0,
      clicks: 0,
      position: null,
      ctr: 0,
      hasData: false,
    };
  }
  return {
    window: { startDate, endDate, days },
    impressions: row.impressions || 0,
    clicks: row.clicks || 0,
    position: row.position ?? null,
    ctr: row.ctr || 0,
    hasData: true,
  };
}

function classify(baseline, current) {
  // Tolerant comparisons: missing baseline counts as "no signal" -> null delta.
  const hasBaseline =
    baseline.baseline_impressions != null ||
    baseline.baseline_clicks != null ||
    baseline.baseline_position != null;

  if (!current.hasData) {
    return hasBaseline
      ? { class: 'no-data', reason: 'No impressions in current window — query disappeared from GSC.' }
      : { class: 'no-data', reason: 'No data yet — query not surfacing in the last 7 days.' };
  }

  if (!hasBaseline) {
    return { class: 'baselining', reason: 'No baseline recorded yet — this run becomes the baseline next week.' };
  }

  const reasons = [];
  let wins = 0, losses = 0;

  // Position: lower is better. Delta of ≥3 = significant.
  if (baseline.baseline_position != null && current.position != null) {
    const delta = baseline.baseline_position - current.position; // positive = improved
    if (delta >= 3) { wins++; reasons.push(`pos: ${baseline.baseline_position.toFixed(1)} → ${current.position.toFixed(1)} (↑${delta.toFixed(1)})`); }
    else if (delta <= -3) { losses++; reasons.push(`pos: ${baseline.baseline_position.toFixed(1)} → ${current.position.toFixed(1)} (↓${(-delta).toFixed(1)})`); }
    else reasons.push(`pos: ${baseline.baseline_position.toFixed(1)} → ${current.position.toFixed(1)} (=)`);
  }

  // Impressions: ≥2x = win; ≤0.5x = loss.
  if (baseline.baseline_impressions != null && baseline.baseline_impressions > 0) {
    const ratio = current.impressions / baseline.baseline_impressions;
    if (ratio >= 2) { wins++; reasons.push(`impr: ${baseline.baseline_impressions} → ${current.impressions} (${ratio.toFixed(1)}x)`); }
    else if (ratio <= 0.5) { losses++; reasons.push(`impr: ${baseline.baseline_impressions} → ${current.impressions} (${ratio.toFixed(1)}x)`); }
    else reasons.push(`impr: ${baseline.baseline_impressions} → ${current.impressions} (${ratio.toFixed(1)}x)`);
  } else if (current.impressions > 0 && (baseline.baseline_impressions === 0 || baseline.baseline_impressions == null)) {
    wins++;
    reasons.push(`impr: 0 → ${current.impressions} (first appearance)`);
  }

  // Clicks: 0 → ≥1 = win; first-click is the headline of the CEO's "compound organic" KPI.
  if (baseline.baseline_clicks === 0 && current.clicks >= 1) {
    wins++;
    reasons.push(`clicks: 0 → ${current.clicks} (first click)`);
  } else if (baseline.baseline_clicks != null && baseline.baseline_clicks > 0) {
    if (current.clicks >= baseline.baseline_clicks * 2) { wins++; reasons.push(`clicks: ${baseline.baseline_clicks} → ${current.clicks} (≥2x)`); }
    else if (current.clicks * 2 <= baseline.baseline_clicks) { losses++; reasons.push(`clicks: ${baseline.baseline_clicks} → ${current.clicks} (≤0.5x)`); }
    else reasons.push(`clicks: ${baseline.baseline_clicks} → ${current.clicks}`);
  }

  if (wins > 0 && losses === 0) return { class: 'win', reason: reasons.join(' · ') };
  if (losses > 0 && wins === 0) return { class: 'loss', reason: reasons.join(' · ') };
  if (wins > 0 && losses > 0) return { class: 'mixed', reason: reasons.join(' · ') };
  return { class: 'null', reason: reasons.join(' · ') };
}

(async () => {
  let gsc;
  try { gsc = await getGSCClient(); }
  catch (e) { log(`FATAL: ${e.message}`); process.exit(1); }

  // One-off baseline mode: print the JSON snippet for a new query.
  if (BASELINE_MODE && SINGLE_QUERY) {
    const current = await fetchQueryWindow(gsc, SINGLE_QUERY, LOOKBACK_DAYS);
    const entry = {
      q: SINGLE_QUERY,
      target_entity: 'TODO',
      added_at: isoToday(),
      baseline_window_days: LOOKBACK_DAYS,
      baseline_impressions: current.impressions,
      baseline_clicks: current.clicks,
      baseline_position: current.position,
      baseline_ctr: current.ctr,
      source_issue: 'TODO',
      expected_uplift: 'TODO',
    };
    console.log(JSON.stringify(entry, null, 2));
    process.exit(0);
  }

  let watches;
  try {
    const cfg = JSON.parse(fs.readFileSync(WATCHES_FILE, 'utf8'));
    watches = Array.isArray(cfg.watches) ? cfg.watches : [];
  } catch (e) {
    log(`FATAL: cannot read watches ${WATCHES_FILE}: ${e.message}`);
    process.exit(1);
  }

  if (watches.length === 0) {
    log('No watches to check. Exiting 0 with empty report.');
    fs.writeFileSync(OUT, JSON.stringify({
      generatedAt: new Date().toISOString(),
      site: process.env.GSC_SITE,
      watchesTotal: 0,
      results: [],
    }, null, 2));
    process.exit(0);
  }

  const results = [];
  for (let i = 0; i < watches.length; i++) {
    const w = watches[i];
    try {
      const current = await fetchQueryWindow(gsc, w.q, LOOKBACK_DAYS);
      const verdict = classify(w, current);
      results.push({
        ...w,
        current: {
          impressions: current.impressions,
          clicks: current.clicks,
          position: current.position,
          ctr: current.ctr,
          window: current.window,
        },
        verdict,
      });
      log(`[${i + 1}/${watches.length}] "${w.q}" — ${verdict.class}: ${verdict.reason}`);
    } catch (e) {
      results.push({ ...w, current: null, verdict: { class: 'error', reason: e.message } });
      log(`[${i + 1}/${watches.length}] "${w.q}" — ERROR: ${e.message}`);
    }
  }

  const counts = results.reduce((acc, r) => {
    acc[r.verdict.class] = (acc[r.verdict.class] || 0) + 1;
    return acc;
  }, {});

  const report = {
    generatedAt: new Date().toISOString(),
    site: process.env.GSC_SITE,
    lookbackDays: LOOKBACK_DAYS,
    watchesTotal: watches.length,
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
