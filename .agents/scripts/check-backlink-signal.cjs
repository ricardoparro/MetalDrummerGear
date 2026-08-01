#!/usr/bin/env node
/**
 * Backlink signal — weekly proxy for link-building progress.
 *
 * Honesty note up front: Google Search Console's "Links" report (the actual
 * inventory of backlinks Google knows about) is NOT exposed by any public
 * API — GSC only exposes Search Analytics (queries/pages) and URL Inspection.
 * So this loop does NOT count real backlinks. It measures something related
 * but different and fully automatable: **referral domains that sent us at
 * least one click**, via the GA4 Data API (session medium = "referral").
 * A referring domain appearing here means a real link is live AND being
 * clicked — a stronger (if partial) signal than an unclicked link. It will
 * always undercount total backlinks; some links exist with zero clicks.
 *
 * For the true backlink count, `docs/loops.md` documents a manual process:
 * periodically check GSC → Links (UI-only) and append a row to
 * `.agents/seo/backlinks-manual-log.json`. The digest surfaces whichever
 * data exists (auto signal always; the manual log when present), and is
 * explicit about which is which.
 *
 * Output:
 *   - .agents/seo/referral-domains-history/YYYY-MM-DD.json (committed,
 *     next run's baseline — same pattern as gsc-history / indexation-history)
 *
 * Local run:
 *   GOOGLE_APPLICATION_CREDENTIALS=/path/to/sa.json GA4_PROPERTY_ID=... \
 *   node .agents/scripts/check-backlink-signal.cjs --out /tmp/backlinks.json
 *
 * Exit codes: 0 completed (incl. GA4 unavailable — non-fatal, see below);
 *             1 fatal internal error.
 */

const fs = require('node:fs');
const path = require('node:path');

function argv(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 && i + 1 < process.argv.length ? process.argv[i + 1] : fallback;
}

const HISTORY_DIR = argv('history-dir', '.agents/seo/referral-domains-history');
const OUT = argv('out', '/tmp/backlink-signal.json');
const WINDOW_DAYS = parseInt(argv('window-days', '90'), 10);
const TOP_N = parseInt(argv('top', '250'), 10);

function log(msg) { process.stderr.write(`[backlink-signal] ${msg}\n`); }
function isoToday() { return new Date().toISOString().split('T')[0]; }
function isoDaysAgo(n) { return new Date(Date.now() - n * 86400000).toISOString().split('T')[0]; }

// Domains that show up as "referral" but aren't a real external backlink:
// our own domain (self-referral, e.g. cross-subdomain), Google's own AMP/CSE
// cache hosts, Android app referrers, and localhost from local testing.
const NOISE_RE = /(^|\.)metalforge\.io$|^android-app:|googleusercontent\.com$|^localhost$|^127\.0\.0\.1$/i;

/** Pure: given current + previous domain lists, which domains are NEW. */
function diffNewDomains(currentDomains, previousDomains) {
  const prevSet = new Set((previousDomains || []).map(d => d.domain));
  return (currentDomains || []).filter(d => !prevSet.has(d.domain));
}

function selfTest() {
  let fails = 0;
  const check = (desc, got, want) => {
    const ok = JSON.stringify(got) === JSON.stringify(want);
    console.log(`${ok ? 'PASS' : 'FAIL'} — ${desc}${ok ? '' : ` (got ${JSON.stringify(got)}, want ${JSON.stringify(want)})`}`);
    if (!ok) fails++;
  };

  check('no previous snapshot -> everything is "new"',
    diffNewDomains([{ domain: 'a.com' }, { domain: 'b.com' }], null).map(d => d.domain),
    ['a.com', 'b.com']);

  check('identical domains -> no new ones',
    diffNewDomains([{ domain: 'a.com' }], [{ domain: 'a.com' }]),
    []);

  check('one new domain detected',
    diffNewDomains([{ domain: 'a.com' }, { domain: 'newsite.com' }], [{ domain: 'a.com' }]).map(d => d.domain),
    ['newsite.com']);

  check('a domain that disappeared is not reported as new (not this function\'s job)',
    diffNewDomains([{ domain: 'a.com' }], [{ domain: 'a.com' }, { domain: 'gone.com' }]),
    []);

  check('NOISE_RE filters self-domain and app referrers', [
    NOISE_RE.test('metalforge.io'),
    NOISE_RE.test('www.metalforge.io'),
    NOISE_RE.test('reddit.com'),
    NOISE_RE.test('android-app://com.google.android.gm'),
  ], [true, true, false, true]);

  console.log(fails === 0 ? '\nself-test: PASS' : `\nself-test: FAIL (${fails})`);
  return fails === 0;
}

async function fetchReferralDomains() {
  const propertyId = process.env.GA4_PROPERTY_ID;
  const creds = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!propertyId || !creds) {
    return { available: false, reason: !propertyId ? 'GA4_PROPERTY_ID missing' : 'GOOGLE_APPLICATION_CREDENTIALS missing' };
  }
  let BetaAnalyticsDataClient;
  try {
    ({ BetaAnalyticsDataClient } = require('@google-analytics/data'));
  } catch {
    return { available: false, reason: '@google-analytics/data not installed' };
  }
  const client = new BetaAnalyticsDataClient();
  const property = `properties/${propertyId}`;
  const [report] = await client.runReport({
    property,
    dateRanges: [{ startDate: isoDaysAgo(WINDOW_DAYS), endDate: isoToday() }],
    dimensions: [{ name: 'sessionSource' }, { name: 'sessionMedium' }],
    metrics: [{ name: 'sessions' }, { name: 'activeUsers' }],
    dimensionFilter: {
      filter: { fieldName: 'sessionMedium', stringFilter: { value: 'referral', matchType: 'EXACT' } },
    },
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    limit: TOP_N,
  });
  const num = (r, i) => parseFloat(r.metricValues[i].value || '0');
  const domains = (report.rows || [])
    .map(r => ({ domain: r.dimensionValues[0].value, sessions: num(r, 0), users: num(r, 1) }))
    .filter(d => d.domain && !NOISE_RE.test(d.domain));
  return { available: true, domains };
}

(async () => {
  if (process.argv.includes('--self-test')) {
    process.exit(selfTest() ? 0 : 1);
  }

  let ga4;
  try {
    ga4 = await fetchReferralDomains();
  } catch (e) {
    log(`FATAL: GA4 query failed: ${e.message}`);
    process.exit(1);
  }

  if (!ga4.available) {
    // Non-fatal: GA4 credentials are provisioned elsewhere in the pipeline
    // (fetch-metrics.cjs) and might not be wired into this workflow yet.
    // Don't fail the run over a config gap — just don't write a snapshot.
    log(`GA4 unavailable (${ga4.reason}) — skipping this run, no snapshot written.`);
    process.exit(0);
  }

  fs.mkdirSync(HISTORY_DIR, { recursive: true });
  const prevFiles = fs.existsSync(HISTORY_DIR)
    ? fs.readdirSync(HISTORY_DIR).filter(f => /^\d{4}-\d{2}-\d{2}\.json$/.test(f)).sort()
    : [];
  const prev = prevFiles.length
    ? JSON.parse(fs.readFileSync(path.join(HISTORY_DIR, prevFiles[prevFiles.length - 1]), 'utf8'))
    : null;
  const newDomains = diffNewDomains(ga4.domains, prev && prev.domains);

  const snapshot = {
    generatedAt: new Date().toISOString(),
    windowDays: WINDOW_DAYS,
    totalDomains: ga4.domains.length,
    newDomainsThisRun: newDomains.map(d => d.domain),
    domains: ga4.domains,
    prevSnapshotFile: prevFiles.length ? prevFiles[prevFiles.length - 1] : null,
  };

  const historyFile = path.join(HISTORY_DIR, `${isoToday()}.json`);
  fs.writeFileSync(historyFile, JSON.stringify(snapshot, null, 2));
  log(`wrote ${historyFile} — ${snapshot.totalDomains} referring domains, ${newDomains.length} new`);

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(snapshot, null, 2));
  log(`wrote ${OUT}`);
})().catch(e => {
  log(`FATAL: ${e.stack || e.message}`);
  process.exit(1);
});
