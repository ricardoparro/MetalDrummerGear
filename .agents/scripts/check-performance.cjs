#!/usr/bin/env node
/**
 * L4 — Performance verifier. Runs Lighthouse (mobile emulation, simulated
 * throttling, performance category only) against a fixed list of LIVE
 * metalforge.io URLs every two weeks and diffs the result against the
 * previous run. Output:
 *   - .agents/seo/perf-history/<date>.json (next run's baseline, committed)
 *   - Umbrella issue `performance-watch`   (when a URL regressed OR is
 *     chronically slow — see the absolute thresholds below)
 *   - Optional Telegram one-liner on regression / chronic-set change
 *
 * Why this exists: #4410 (perf-budget.yml) gates the BUILD on every PR —
 * prevention. This loop measures PRODUCTION every two weeks — detection. CDN
 * changes, AdSense/GTM drift, and small regressions that individually pass
 * the PR gate but accumulate over months only show up by re-measuring the
 * live site. Both are needed; neither substitutes for the other.
 *
 * Baseline context (epic #4407, mid-2026): mobile homepage was ≈63
 * performance / TBT ~2.9s before the epic started driving it down. This loop
 * is how we SEE that number move.
 *
 * 2026-09-07 — absolute thresholds added. For its first two months this loop
 * was regression-only: it flagged fortnight-over-fortnight drops and nothing
 * else, so pages that were terrible from day one (hubs LCP ~12s, album article
 * LCP ~26s, scores 49-58 — stable since the 2026-07-15 baseline) never
 * appeared anywhere. Now any URL below SCORE_FLOOR or above LCP_CEILING_MS is
 * listed as "chronic" in the same umbrella issue, and the umbrella stays open
 * until both the regression list AND the chronic list are empty.
 *
 * Reuses generate-digest.cjs / watchdog.cjs conventions verbatim: the GitHub
 * REST helper style (Bearer GITHUB_TOKEN, api.github.com), postToTelegram,
 * and the single auto-maintained umbrella issue (marker comment + label).
 *
 * Required env (live runs only): GITHUB_TOKEN (+ REPO or GITHUB_REPOSITORY).
 * Optional env: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, CHROME_PATH.
 *
 * Local run:
 *   CHROME_PATH=/path/to/chrome GITHUB_TOKEN=ghp_... \
 *   node .agents/scripts/check-performance.cjs --history-dir .agents/seo/perf-history
 *
 * Flags:
 *   --self-test   Pure delta/regression logic against inline fixtures, no
 *                 network, no chrome. Exit non-zero on mismatch.
 *   --dry-run     Still runs Lighthouse for real, but prints the Telegram
 *                 message + issue body instead of sending/mutating GitHub.
 *
 * Exit codes:
 *   0 — completed (a detected regression is NOT a failure)
 *   1 — the check itself errored (chrome/lighthouse unusable, etc.)
 */

const fs = require('node:fs');
const path = require('node:path');
const https = require('node:https');
const { execFile } = require('node:child_process');
const os = require('node:os');

function argv(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 && i + 1 < process.argv.length ? process.argv[i + 1] : fallback;
}
function hasFlag(name) { return process.argv.includes(`--${name}`); }

const HISTORY_DIR = argv('history-dir', '.agents/seo/perf-history');
const OUT = argv('out', '/tmp/performance.json');
const PER_URL_TIMEOUT_MS = parseInt(argv('timeout', '120000'), 10);

const REPO = process.env.REPO || process.env.GITHUB_REPOSITORY || 'ricardoparro/MetalDrummerGear';

function log(msg) { process.stderr.write(`[performance] ${msg}\n`); }
function isoToday() { return new Date().toISOString().split('T')[0]; }
function fmtNow(now) { return now.toISOString().slice(0, 16).replace('T', ' ') + ' UTC'; }

/* ---------------------------------------------------------------------------
 * Fixed URL list — homepage, a drummer profile, both gear hubs, one album
 * article, one top-10 list. Real, sitemap-verified paths. Extend here.
 * ------------------------------------------------------------------------- */
const URLS = [
  { label: 'Homepage', url: 'https://metalforge.io/' },
  { label: 'Drummer profile (Lars Ulrich)', url: 'https://metalforge.io/drummer/lars-ulrich' },
  { label: 'Drumsticks hub', url: 'https://metalforge.io/drumsticks' },
  { label: 'Cymbals hub', url: 'https://metalforge.io/cymbals' },
  { label: 'Album article (Sacrament drum setup)', url: 'https://metalforge.io/articles/sacrament-drum-setup' },
  { label: 'Top-10 list (best death metal drummers)', url: 'https://metalforge.io/lists/best-death-metal-drummers' },
];

// The digest reads the homepage row specifically — keep this key in sync with
// the URLS entry above if the homepage URL ever changes.
const HOMEPAGE_URL = 'https://metalforge.io/';

/* ---------------------------------------------------------------------------
 * Regression thresholds — flag when ANY url crosses one of these vs the
 * previous snapshot.
 * ------------------------------------------------------------------------- */
const SCORE_DROP_THRESHOLD = 5;     // performance score points
const TBT_WORSEN_PCT = 0.20;        // total blocking time, relative
const TRANSFER_GROW_PCT = 0.15;     // total transfer bytes, relative

/* ---------------------------------------------------------------------------
 * Absolute ("chronic") thresholds — flag a URL that is bad in itself, whether
 * or not it moved since last fortnight. LCP 4000ms is Google's own "poor"
 * boundary for Core Web Vitals; score 60 is where Lighthouse turns the score
 * orange→red-adjacent and roughly where our hubs/articles have sat since July.
 * ------------------------------------------------------------------------- */
const SCORE_FLOOR = 60;             // performance score below this = chronic
const LCP_CEILING_MS = 4000;        // largest contentful paint above this = chronic

const ISSUE_MARKER = '<!-- l4-performance-watch-umbrella -->';
const ISSUE_TITLE_PREFIX = '📉 L4 Performance Watch';
const ISSUE_LABEL = 'performance-watch';

/* ---------------------------------------------------------------------------
 * Lighthouse runner + metric extraction.
 * ------------------------------------------------------------------------- */
function runLighthouse(url) {
  return new Promise((resolve, reject) => {
    const outPath = path.join(os.tmpdir(), `lh-${Date.now()}-${Math.random().toString(36).slice(2)}.json`);
    const args = [
      'lighthouse', url,
      '--output=json',
      `--output-path=${outPath}`,
      '--only-categories=performance',
      '--form-factor=mobile',
      '--screenEmulation.mobile',
      '--throttling-method=simulate',
      '--quiet',
      '--chrome-flags=--headless=new --no-sandbox --disable-gpu',
      '--max-wait-for-load=45000',
    ];
    execFile('npx', args, {
      timeout: PER_URL_TIMEOUT_MS,
      maxBuffer: 20 * 1024 * 1024,
      env: process.env, // inherits CHROME_PATH so chrome-launcher finds the installed binary
    }, (err) => {
      if (err) { reject(new Error(`lighthouse failed for ${url}: ${err.message}`)); return; }
      try {
        const lhr = JSON.parse(fs.readFileSync(outPath, 'utf8'));
        fs.unlinkSync(outPath);
        resolve(lhr);
      } catch (e) {
        reject(new Error(`cannot parse lighthouse output for ${url}: ${e.message}`));
      }
    });
  });
}

/**
 * Pure: LHR JSON -> our flat metric shape. Exported for testability.
 */
function extractMetrics(lhr) {
  const audits = lhr.audits || {};
  const cat = lhr.categories && lhr.categories.performance;
  const performanceScore = cat && typeof cat.score === 'number' ? Math.round(cat.score * 100) : null;
  const numeric = (id) => (audits[id] && typeof audits[id].numericValue === 'number') ? audits[id].numericValue : null;

  const networkItems = (audits['network-requests'] && audits['network-requests'].details && audits['network-requests'].details.items) || [];
  const biggestJsRequests = networkItems
    .filter(i => i.resourceType === 'Script')
    .map(i => ({ url: i.url, transferSize: i.transferSize || 0 }))
    .sort((a, b) => b.transferSize - a.transferSize)
    .slice(0, 2);

  return {
    performanceScore,
    fcp: numeric('first-contentful-paint'),
    lcp: numeric('largest-contentful-paint'),
    tbt: numeric('total-blocking-time'),
    cls: numeric('cumulative-layout-shift'),
    speedIndex: numeric('speed-index'),
    totalBytes: numeric('total-byte-weight'),
    biggestJsRequests,
  };
}

/* ---------------------------------------------------------------------------
 * PURE delta / regression logic (unit-tested via --self-test, no network).
 * prevByUrl may be null (first run — nothing to diff against).
 * ------------------------------------------------------------------------- */
function detectRegressions(prevByUrl, currByUrl) {
  if (!prevByUrl) return [];
  const regressions = [];
  for (const [url, curr] of Object.entries(currByUrl)) {
    const prev = prevByUrl[url];
    if (!prev) continue; // new URL, no baseline yet
    const reasons = [];

    if (typeof prev.performanceScore === 'number' && typeof curr.performanceScore === 'number') {
      const scoreDelta = prev.performanceScore - curr.performanceScore;
      if (scoreDelta > SCORE_DROP_THRESHOLD) {
        reasons.push(`score ${prev.performanceScore} → ${curr.performanceScore} (−${scoreDelta}pts)`);
      }
    }
    if (typeof prev.tbt === 'number' && prev.tbt > 0 && typeof curr.tbt === 'number') {
      const tbtPct = (curr.tbt - prev.tbt) / prev.tbt;
      if (tbtPct > TBT_WORSEN_PCT) {
        reasons.push(`TBT ${Math.round(prev.tbt)}ms → ${Math.round(curr.tbt)}ms (+${Math.round(tbtPct * 100)}%)`);
      }
    }
    if (typeof prev.totalBytes === 'number' && prev.totalBytes > 0 && typeof curr.totalBytes === 'number') {
      const transferPct = (curr.totalBytes - prev.totalBytes) / prev.totalBytes;
      if (transferPct > TRANSFER_GROW_PCT) {
        reasons.push(`transfer ${Math.round(prev.totalBytes / 1024)}KB → ${Math.round(curr.totalBytes / 1024)}KB (+${Math.round(transferPct * 100)}%)`);
      }
    }

    if (reasons.length > 0) {
      regressions.push({ url, label: curr.label || prev.label || url, reasons, prev, curr });
    }
  }
  return regressions;
}

/**
 * Pure: URLs that are bad on absolute terms this run (no baseline needed).
 * Returned in worst-first order (lowest score, then highest LCP).
 */
function detectChronic(currByUrl) {
  const chronic = [];
  for (const [url, curr] of Object.entries(currByUrl || {})) {
    const reasons = [];
    if (typeof curr.performanceScore === 'number' && curr.performanceScore < SCORE_FLOOR) {
      reasons.push(`score ${curr.performanceScore} (< ${SCORE_FLOOR})`);
    }
    if (typeof curr.lcp === 'number' && curr.lcp > LCP_CEILING_MS) {
      reasons.push(`LCP ${(curr.lcp / 1000).toFixed(1)}s (> ${LCP_CEILING_MS / 1000}s)`);
    }
    if (reasons.length > 0) chronic.push({ url, label: curr.label || url, reasons, curr });
  }
  chronic.sort((a, b) => {
    const sa = typeof a.curr.performanceScore === 'number' ? a.curr.performanceScore : 101;
    const sb = typeof b.curr.performanceScore === 'number' ? b.curr.performanceScore : 101;
    if (sa !== sb) return sa - sb;
    return (b.curr.lcp || 0) - (a.curr.lcp || 0);
  });
  return chronic;
}

function loadPrevSnapshot(historyDir, currentFileName) {
  if (!fs.existsSync(historyDir)) return null;
  const files = fs.readdirSync(historyDir)
    .filter(f => /^\d{4}-\d{2}-\d{2}\.json$/.test(f) && f !== currentFileName)
    .sort();
  if (files.length === 0) return null;
  const file = files[files.length - 1];
  try {
    return { file, data: JSON.parse(fs.readFileSync(path.join(historyDir, file), 'utf8')) };
  } catch (e) {
    log(`WARN: cannot parse ${file}: ${e.message}`);
    return null;
  }
}

/* ---------------------------------------------------------------------------
 * GitHub REST + Telegram helpers — copied verbatim from watchdog.cjs.
 * ------------------------------------------------------------------------- */
function ghRequest(method, urlPath) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN missing');
  return new Promise((resolve, reject) => {
    const req = https.request({
      method,
      hostname: 'api.github.com',
      path: urlPath,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'metalforge-perf-check/1.0',
      },
    }, (res) => {
      let body = '';
      res.on('data', (c) => body += c);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(body ? JSON.parse(body) : null);
        } else {
          reject(new Error(`GH ${method} ${urlPath} → ${res.statusCode}: ${body.slice(0, 300)}`));
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

function ghWrite(method, urlPath, payload) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN missing');
  const body = JSON.stringify(payload);
  return new Promise((resolve, reject) => {
    const req = https.request({
      method,
      hostname: 'api.github.com',
      path: urlPath,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'metalforge-perf-check/1.0',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    }, (res) => {
      let chunks = '';
      res.on('data', (c) => chunks += c);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(chunks ? JSON.parse(chunks) : null);
        } else {
          reject(new Error(`GH ${method} ${urlPath} → ${res.statusCode}: ${chunks.slice(0, 300)}`));
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function postToTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    process.stderr.write('Telegram skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID missing.\n');
    return Promise.resolve(false);
  }
  const body = JSON.stringify({
    chat_id: chatId,
    text,
    parse_mode: 'HTML',
    disable_web_page_preview: true,
  });
  return new Promise((resolve) => {
    const req = https.request({
      method: 'POST',
      hostname: 'api.telegram.org',
      path: `/bot${token}/sendMessage`,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    }, (res) => {
      let chunks = '';
      res.on('data', (c) => chunks += c);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          process.stderr.write('Telegram: sent.\n');
          resolve(true);
        } else {
          process.stderr.write(`Telegram failed (${res.statusCode}): ${chunks.slice(0, 300)}\n`);
          resolve(false);
        }
      });
    });
    req.on('error', (e) => { process.stderr.write(`Telegram error: ${e.message}\n`); resolve(false); });
    req.write(body);
    req.end();
  });
}

const esc = (s) => String(s).replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));

/* ---------------------------------------------------------------------------
 * Message + issue body builders.
 * ------------------------------------------------------------------------- */
function buildIssueBody(regressions, now, prevFile, chronic = []) {
  const lines = [];
  lines.push(ISSUE_MARKER);
  lines.push('');
  lines.push(`_Auto-maintained by \`.agents/scripts/check-performance.cjs\` (L4). Last checked ${fmtNow(now)}. Compared vs \`${prevFile || '(no previous snapshot)'}\`._`);
  lines.push('');
  lines.push(`## 📉 ${regressions.length} URL${regressions.length === 1 ? '' : 's'} regressed`);
  lines.push('');
  if (regressions.length === 0) {
    lines.push('_None this fortnight._');
  } else {
    lines.push('| URL | Regression |');
    lines.push('| --- | --- |');
    for (const r of regressions) {
      lines.push(`| ${r.label} (\`${r.url}\`) | ${r.reasons.join('; ')} |`);
    }
  }
  lines.push('');
  lines.push(`Thresholds: score drop >${SCORE_DROP_THRESHOLD}pts · TBT worsens >${Math.round(TBT_WORSEN_PCT * 100)}% · transfer grows >${Math.round(TRANSFER_GROW_PCT * 100)}% (any URL, vs the previous fortnight's snapshot).`);
  lines.push('');
  lines.push(`## 🐌 ${chronic.length} URL${chronic.length === 1 ? '' : 's'} chronically slow`);
  lines.push('');
  if (chronic.length === 0) {
    lines.push('_None — every measured URL is above the absolute bar._');
  } else {
    lines.push('| URL | Why it is flagged | FCP → LCP | TBT | Biggest script |');
    lines.push('| --- | --- | --- | --- | --- |');
    for (const c of chronic) {
      const m = c.curr;
      const fcp = typeof m.fcp === 'number' ? `${(m.fcp / 1000).toFixed(1)}s` : '?';
      const lcp = typeof m.lcp === 'number' ? `${(m.lcp / 1000).toFixed(1)}s` : '?';
      const tbt = typeof m.tbt === 'number' ? `${Math.round(m.tbt)}ms` : '?';
      const big = (m.biggestJsRequests && m.biggestJsRequests[0])
        ? `\`${m.biggestJsRequests[0].url.split('/').pop().replace(/-[0-9a-f]{32}\.js$/, '-*.js')}\` ${Math.round(m.biggestJsRequests[0].transferSize / 1024)}KB`
        : '?';
      lines.push(`| ${c.label} (\`${c.url}\`) | ${c.reasons.join('; ')} | ${fcp} → ${lcp} | ${tbt} | ${big} |`);
    }
    lines.push('');
    lines.push(`Absolute bar: score ≥ ${SCORE_FLOOR} and LCP ≤ ${LCP_CEILING_MS / 1000}s (Google's "poor" CWV boundary). These rows are NOT new this fortnight — they are the pages that have been slow all along and only show up here because the bar is absolute.`);
    lines.push('');
    lines.push('How to read a row: a small FCP with a huge LCP means the page paints its shell fast but the element Lighthouse counts as "largest content" only arrives after a big lazy JS chunk downloads and parses on simulated slow 4G. The fix is almost never "compress images" — it is getting the above-the-fold content out from behind that chunk (render it from the small eager bundle / `/api/init` data, split the chunk per entity, or give the LCP image a real `<img>` with `fetchpriority=high` instead of a JS-driven one).');
    lines.push('');
    lines.push('Before filing new work for a chronic row, search open issues labelled `performance` — a fix may already be queued.');
  }
  lines.push('');
  lines.push('Baseline context: mobile homepage was ≈63 performance / TBT ~2.9s before epic #4407 started driving it down — this loop is how we watch that number move over time.');
  lines.push('');
  lines.push('This issue closes automatically once a run shows no regressions AND no chronically slow URLs.');
  return lines.join('\n');
}

function buildTelegramText(regressions, now, chronic = [], chronicChanged = false) {
  const lines = [];
  if (regressions.length > 0) {
    const worst = regressions[0];
    lines.push('📉 <b>L4 Performance</b> — fortnightly Lighthouse regression');
    lines.push(`<i>${fmtNow(now)} · ${regressions.length} URL${regressions.length === 1 ? '' : 's'} regressed${chronic.length ? ` · ${chronic.length} chronically slow` : ''}</i>`);
    lines.push(`Worst: ${esc(worst.label)} — ${esc(worst.reasons[0])}`);
  } else {
    const worst = chronic[0];
    lines.push('🐌 <b>L4 Performance</b> — chronically slow pages changed');
    lines.push(`<i>${fmtNow(now)} · no regressions · ${chronic.length} URL${chronic.length === 1 ? '' : 's'} below the absolute bar (score &lt; ${SCORE_FLOOR} or LCP &gt; ${LCP_CEILING_MS / 1000}s)</i>`);
    if (worst) lines.push(`Worst: ${esc(worst.label)} — ${esc(worst.reasons.join(', '))}`);
  }
  lines.push(`<a href="https://github.com/${REPO}/actions">Actions tab →</a>`);
  void chronicChanged;
  return lines.join('\n');
}

/* ---------------------------------------------------------------------------
 * Umbrella-issue upsert — same open/edit/close model as watchdog.cjs.
 * ------------------------------------------------------------------------- */
async function findUmbrellaIssue() {
  const q = encodeURIComponent(`repo:${REPO} is:issue is:open in:title "${ISSUE_TITLE_PREFIX}"`);
  const res = await ghRequest('GET', `/search/issues?q=${q}&per_page=20`);
  const items = (res && res.items) || [];
  const match = items.find(i => i.title.startsWith(ISSUE_TITLE_PREFIX)) || items[0];
  return match || null;
}

async function ensureLabel() {
  try {
    await ghRequest('GET', `/repos/${REPO}/labels/${encodeURIComponent(ISSUE_LABEL)}`);
  } catch (e) {
    if (/→ 404/.test(e.message)) {
      await ghWrite('POST', `/repos/${REPO}/labels`, {
        name: ISSUE_LABEL, color: 'B60205',
        description: 'Live-site Lighthouse regressions — auto-managed by check-performance.cjs (L4)',
      }).catch(() => {});
    }
  }
}

async function upsertUmbrellaIssue(regressions, now, prevFile, chronic = []) {
  const existing = await findUmbrellaIssue();
  const actionable = regressions.length + chronic.length;
  if (actionable === 0) {
    if (existing) {
      await ghWrite('POST', `/repos/${REPO}/issues/${existing.number}/comments`, {
        body: `🤖 L4 Performance ${fmtNow(now)}: no regressions vs \`${prevFile || '(none)'}\` and no URL below the absolute bar. Closing.`,
      });
      await ghWrite('PATCH', `/repos/${REPO}/issues/${existing.number}`, { state: 'closed' });
      process.stderr.write(`  Closed umbrella issue #${existing.number}.\n`);
    }
    return;
  }
  await ensureLabel();
  const parts = [];
  if (regressions.length) parts.push(`${regressions.length} regressed`);
  if (chronic.length) parts.push(`${chronic.length} chronically slow`);
  const title = `${ISSUE_TITLE_PREFIX} — ${parts.join(' · ')}`;
  const body = buildIssueBody(regressions, now, prevFile, chronic);
  const summary = `${regressions.length} regressed vs \`${prevFile || '(none)'}\`, ${chronic.length} chronically slow (score < ${SCORE_FLOOR} or LCP > ${LCP_CEILING_MS / 1000}s).`;
  if (existing) {
    await ghWrite('PATCH', `/repos/${REPO}/issues/${existing.number}`, { title, body, state: 'open' });
    await ghWrite('POST', `/repos/${REPO}/issues/${existing.number}/comments`, {
      body: `🤖 L4 Performance ${fmtNow(now)}: ${summary}`,
    });
    process.stderr.write(`  Updated umbrella issue #${existing.number}.\n`);
  } else {
    const created = await ghWrite('POST', `/repos/${REPO}/issues`, {
      title, body, labels: [ISSUE_LABEL],
    });
    process.stderr.write(`  Opened umbrella issue #${created && created.number}.\n`);
  }
}

/* ---------------------------------------------------------------------------
 * Self-test — pure delta/regression logic against inline fixtures. No network.
 * ------------------------------------------------------------------------- */
function selfTest() {
  let failures = 0;
  const check = (name, got, want) => {
    const ok = got === want;
    process.stdout.write(`${ok ? 'PASS' : 'FAIL'} — ${name} (got ${got}, want ${want})\n`);
    if (!ok) failures++;
  };

  const baseline = { label: 'Homepage', performanceScore: 63, tbt: 2900, totalBytes: 800_000 };

  // First run — no previous snapshot at all.
  check('first run (no previous snapshot) → 0 regressions',
    detectRegressions(null, { 'https://metalforge.io/': baseline }).length, 0);

  // Score drop: >5pts regresses, <=5pts does not.
  check('score drop 6pts → regression',
    detectRegressions(
      { u: baseline },
      { u: { ...baseline, performanceScore: 57 } },
    ).length, 1);
  check('score drop 5pts (not >5) → no regression',
    detectRegressions(
      { u: baseline },
      { u: { ...baseline, performanceScore: 58 } },
    ).length, 0);

  // TBT: >20% worsening regresses, <=20% does not.
  check('TBT +24% → regression',
    detectRegressions(
      { u: baseline },
      { u: { ...baseline, tbt: 3600 } },
    ).length, 1);
  check('TBT +10% → no regression',
    detectRegressions(
      { u: baseline },
      { u: { ...baseline, tbt: 3200 } },
    ).length, 0);

  // Transfer bytes: >15% growth regresses, <=15% does not.
  check('transfer +20% → regression',
    detectRegressions(
      { u: baseline },
      { u: { ...baseline, totalBytes: 960_000 } },
    ).length, 1);
  check('transfer +10% → no regression',
    detectRegressions(
      { u: baseline },
      { u: { ...baseline, totalBytes: 880_000 } },
    ).length, 0);

  // New URL with no prior baseline is never a regression.
  check('new URL, no baseline → 0 regressions',
    detectRegressions({ other: baseline }, { u: { ...baseline, performanceScore: 30 } }).length, 0);

  // Improvement (recovery) never triggers, even a large one.
  check('score improves 20pts → 0 regressions',
    detectRegressions(
      { u: { ...baseline, performanceScore: 40 } },
      { u: { ...baseline, performanceScore: 60 } },
    ).length, 0);

  // Recovery path end-to-end: a run that regressed vs its own previous, then
  // the NEXT run returns to baseline → 0 regressions (umbrella issue closes).
  const degraded = { u: { ...baseline, performanceScore: 50, tbt: 4000 } };
  const regressedOnce = detectRegressions({ u: baseline }, degraded);
  check('degraded run vs baseline → 1 regression (sets up recovery check)', regressedOnce.length, 1);
  const recovered = detectRegressions(degraded, { u: baseline });
  check('recovered run vs degraded → 0 regressions', recovered.length, 0);

  // Multiple URLs — only the regressed one is reported.
  const multi = detectRegressions(
    { a: baseline, b: baseline },
    { a: { ...baseline, performanceScore: 40 }, b: baseline },
  );
  check('multi-URL: only the regressed one reported', multi.length, 1);
  check('multi-URL: correct url flagged', multi[0] && multi[0].url, 'a');

  // Absolute ("chronic") thresholds — independent of any baseline.
  const good = { label: 'Good', performanceScore: 80, lcp: 1000, fcp: 800, tbt: 700 };
  check('score 80 / LCP 1.0s → not chronic', detectChronic({ u: good }).length, 0);
  check('score 59 → chronic', detectChronic({ u: { ...good, performanceScore: 59 } }).length, 1);
  check('score 60 (not < 60) → not chronic', detectChronic({ u: { ...good, performanceScore: 60 } }).length, 0);
  check('LCP 4001ms → chronic', detectChronic({ u: { ...good, lcp: 4001 } }).length, 1);
  check('LCP 4000ms (not > 4000) → not chronic', detectChronic({ u: { ...good, lcp: 4000 } }).length, 0);
  check('score 49 + LCP 26s → one row, two reasons',
    detectChronic({ u: { ...good, performanceScore: 49, lcp: 26052 } })[0].reasons.length, 2);
  const ranked = detectChronic({
    a: { ...good, performanceScore: 58, lcp: 11739 },
    b: { ...good, performanceScore: 49, lcp: 26052 },
    c: good,
  });
  check('chronic: only the bad URLs listed', ranked.length, 2);
  check('chronic: worst (lowest score) first', ranked[0].url, 'b');
  check('null metrics → not chronic (no false positives on a failed audit)',
    detectChronic({ u: { label: 'x', performanceScore: null, lcp: null } }).length, 0);
  check('chronic set signature is order-independent',
    chronicSignature([{ url: 'b' }, { url: 'a' }]), chronicSignature([{ url: 'a' }, { url: 'b' }]));

  process.stdout.write(failures === 0 ? '\nself-test: PASS\n' : `\nself-test: FAIL (${failures})\n`);
  return failures === 0;
}

/** Pure: stable identity of a chronic set, to notice when it changes run-to-run. */
function chronicSignature(chronic) {
  return (chronic || []).map(c => c.url).sort().join('|');
}

/* ---------------------------------------------------------------------------
 * Main live path.
 * ------------------------------------------------------------------------- */
async function main() {
  const dryRun = hasFlag('dry-run');
  const now = new Date();
  log(`L4 Performance check for ${REPO} @ ${now.toISOString()} — ${URLS.length} URLs`);
  if (process.env.CHROME_PATH) log(`  CHROME_PATH=${process.env.CHROME_PATH}`);

  const byUrl = {};
  for (const target of URLS) {
    log(`  lighthouse: ${target.label} (${target.url})`);
    const lhr = await runLighthouse(target.url);
    const metrics = extractMetrics(lhr);
    byUrl[target.url] = { label: target.label, ...metrics };
    log(`    score=${metrics.performanceScore} TBT=${Math.round(metrics.tbt || 0)}ms LCP=${Math.round(metrics.lcp || 0)}ms transfer=${Math.round((metrics.totalBytes || 0) / 1024)}KB`);
  }

  fs.mkdirSync(HISTORY_DIR, { recursive: true });
  const todayFileName = `${isoToday()}.json`;
  const prev = loadPrevSnapshot(HISTORY_DIR, todayFileName);

  const snapshot = { generatedAt: now.toISOString(), byUrl };
  fs.writeFileSync(path.join(HISTORY_DIR, todayFileName), JSON.stringify(snapshot, null, 2));
  log(`wrote ${path.join(HISTORY_DIR, todayFileName)}`);

  const regressions = detectRegressions(prev && prev.data && prev.data.byUrl, byUrl);
  log(`${regressions.length} regression(s) vs ${prev ? prev.file : '(no previous snapshot)'}`);
  const chronic = detectChronic(byUrl);
  const prevChronic = detectChronic(prev && prev.data && prev.data.byUrl);
  const chronicChanged = chronicSignature(chronic) !== chronicSignature(prevChronic);
  log(`${chronic.length} chronically slow URL(s) (score < ${SCORE_FLOOR} or LCP > ${LCP_CEILING_MS}ms)${chronicChanged ? ' — set changed vs previous snapshot' : ''}`);

  const report = {
    generatedAt: now.toISOString(),
    urls: URLS,
    prevHistoryFile: prev ? prev.file : null,
    regressions,
    chronic,
    thresholds: { SCORE_DROP_THRESHOLD, TBT_WORSEN_PCT, TRANSFER_GROW_PCT, SCORE_FLOOR, LCP_CEILING_MS },
    byUrl,
  };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(report, null, 2));
  log(`wrote ${OUT}`);

  // Telegram only when something a human should notice happened: a regression,
  // or the chronic set changed (a page crossed the bar in either direction).
  // A stable chronic set is already visible in the umbrella issue + digest.
  const notify = regressions.length > 0 || (chronic.length > 0 && chronicChanged);

  if (dryRun) {
    if (regressions.length + chronic.length > 0) {
      process.stdout.write('\n--- ISSUE BODY (dry-run) ---\n' + buildIssueBody(regressions, now, prev && prev.file, chronic) + '\n');
      if (notify) process.stdout.write('\n--- TELEGRAM (dry-run) ---\n' + buildTelegramText(regressions, now, chronic, chronicChanged) + '\n');
    } else {
      process.stdout.write('\nNo regressions, nothing chronic. (Would close umbrella issue if open, no Telegram message.)\n');
    }
    return;
  }

  await upsertUmbrellaIssue(regressions, now, prev && prev.file, chronic);
  if (notify) {
    await postToTelegram(buildTelegramText(regressions, now, chronic, chronicChanged));
  }
}

/* ---------------------------------------------------------------------------
 * Entry point.
 * ------------------------------------------------------------------------- */
// Only run when executed directly — generate-digest.cjs requires this file for
// the thresholds + detectChronic so the digest and the loop can never disagree.
if (require.main === module) {
  (async () => {
    if (hasFlag('self-test')) {
      const ok = selfTest();
      process.exit(ok ? 0 : 1);
    }
    await main();
    process.exit(0);
  })().catch(e => {
    log(`FATAL: ${e.stack || e.message || e}`);
    process.exit(1);
  });
}

module.exports = {
  extractMetrics, detectRegressions, detectChronic, chronicSignature, buildIssueBody, buildTelegramText,
  URLS, HOMEPAGE_URL, SCORE_DROP_THRESHOLD, TBT_WORSEN_PCT, TRANSFER_GROW_PCT, SCORE_FLOOR, LCP_CEILING_MS,
};
