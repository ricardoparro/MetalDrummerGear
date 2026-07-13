#!/usr/bin/env node
/**
 * L4 — Performance verifier. Runs Lighthouse (mobile emulation, simulated
 * throttling, performance category only) against a fixed list of LIVE
 * metalforge.io URLs every two weeks and diffs the result against the
 * previous run. Output:
 *   - .agents/seo/perf-history/<date>.json (next run's baseline, committed)
 *   - Umbrella issue `performance-watch`   (only when a URL regressed)
 *   - Optional Telegram one-liner on regression (postToTelegram convention)
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
function buildIssueBody(regressions, now, prevFile) {
  const lines = [];
  lines.push(ISSUE_MARKER);
  lines.push('');
  lines.push(`_Auto-maintained by \`.agents/scripts/check-performance.cjs\` (L4). Last checked ${fmtNow(now)}. Compared vs \`${prevFile || '(no previous snapshot)'}\`._`);
  lines.push('');
  lines.push(`## 📉 ${regressions.length} URL${regressions.length === 1 ? '' : 's'} regressed`);
  lines.push('');
  lines.push('| URL | Regression |');
  lines.push('| --- | --- |');
  for (const r of regressions) {
    lines.push(`| ${r.label} (\`${r.url}\`) | ${r.reasons.join('; ')} |`);
  }
  lines.push('');
  lines.push(`Thresholds: score drop >${SCORE_DROP_THRESHOLD}pts · TBT worsens >${Math.round(TBT_WORSEN_PCT * 100)}% · transfer grows >${Math.round(TRANSFER_GROW_PCT * 100)}% (any URL, vs the previous fortnight's snapshot).`);
  lines.push('');
  lines.push('Baseline context: mobile homepage was ≈63 performance / TBT ~2.9s before epic #4407 started driving it down — this loop is how we watch that number move over time.');
  lines.push('');
  lines.push('This issue closes automatically once a run shows no regressions.');
  return lines.join('\n');
}

function buildTelegramText(regressions, now) {
  const worst = regressions[0];
  const lines = [];
  lines.push('📉 <b>L4 Performance</b> — fortnightly Lighthouse regression');
  lines.push(`<i>${fmtNow(now)} · ${regressions.length} URL${regressions.length === 1 ? '' : 's'} regressed</i>`);
  lines.push(`Worst: ${esc(worst.label)} — ${esc(worst.reasons[0])}`);
  lines.push(`<a href="https://github.com/${REPO}/actions">Actions tab →</a>`);
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

async function upsertUmbrellaIssue(regressions, now, prevFile) {
  const existing = await findUmbrellaIssue();
  if (regressions.length === 0) {
    if (existing) {
      await ghWrite('POST', `/repos/${REPO}/issues/${existing.number}/comments`, {
        body: `🤖 L4 Performance ${fmtNow(now)}: no regressions vs \`${prevFile || '(none)'}\`. Closing.`,
      });
      await ghWrite('PATCH', `/repos/${REPO}/issues/${existing.number}`, { state: 'closed' });
      process.stderr.write(`  Closed umbrella issue #${existing.number}.\n`);
    }
    return;
  }
  await ensureLabel();
  const title = `${ISSUE_TITLE_PREFIX} — ${regressions.length} URL${regressions.length === 1 ? '' : 's'} regressed`;
  const body = buildIssueBody(regressions, now, prevFile);
  if (existing) {
    await ghWrite('PATCH', `/repos/${REPO}/issues/${existing.number}`, { title, body, state: 'open' });
    await ghWrite('POST', `/repos/${REPO}/issues/${existing.number}/comments`, {
      body: `🤖 L4 Performance ${fmtNow(now)}: ${regressions.length} URL(s) regressed vs \`${prevFile || '(none)'}\`.`,
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

  process.stdout.write(failures === 0 ? '\nself-test: PASS\n' : `\nself-test: FAIL (${failures})\n`);
  return failures === 0;
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

  const report = {
    generatedAt: now.toISOString(),
    urls: URLS,
    prevHistoryFile: prev ? prev.file : null,
    regressions,
    byUrl,
  };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(report, null, 2));
  log(`wrote ${OUT}`);

  if (dryRun) {
    if (regressions.length > 0) {
      process.stdout.write('\n--- ISSUE BODY (dry-run) ---\n' + buildIssueBody(regressions, now, prev && prev.file) + '\n');
      process.stdout.write('\n--- TELEGRAM (dry-run) ---\n' + buildTelegramText(regressions, now) + '\n');
    } else {
      process.stdout.write('\nNo regressions. (Would close umbrella issue if open, no Telegram message.)\n');
    }
    return;
  }

  await upsertUmbrellaIssue(regressions, now, prev && prev.file);
  if (regressions.length > 0) {
    await postToTelegram(buildTelegramText(regressions, now));
  }
}

/* ---------------------------------------------------------------------------
 * Entry point.
 * ------------------------------------------------------------------------- */
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

module.exports = {
  extractMetrics, detectRegressions, buildIssueBody, buildTelegramText,
  URLS, HOMEPAGE_URL, SCORE_DROP_THRESHOLD, TBT_WORSEN_PCT, TRANSFER_GROW_PCT,
};
