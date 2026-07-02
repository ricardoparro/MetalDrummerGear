#!/usr/bin/env node
/**
 * Loop Watchdog — detects when the automation pipeline is broken or idle and
 * alerts via Telegram (the same channel the digest uses).
 *
 * Why this exists: the loops grade themselves. When Roadie ran 51 minutes,
 * opened 0 PRs, and spammed a single issue 2000× nothing flagged it — the
 * workflow "succeeded", the digest looked thin but not broken, and silence read
 * as health. This watchdog puts an external liveness check on the whole system:
 *   1. Did any critical workflow's most recent run fail?
 *   2. Did Roadie ship nothing in 24h while ai-fix backlog is non-empty?
 *      (the exact 0-PR stall above)
 *   3. Has any scheduled workflow gone quiet far past its expected interval?
 *   4. Are the verifier snapshots stale on disk?
 *
 * On any alert: one Telegram message + a single auto-maintained umbrella issue
 * (`🚨 Loop Watchdog`, label `ops`) so there's a durable record. When healthy
 * it stays silent — except a weekly "all loops healthy" heartbeat (Mondays) so
 * that silence can't be confused with "the watchdog itself died".
 *
 * Reuses generate-digest.cjs conventions verbatim: the GitHub REST helper style
 * (Bearer GITHUB_TOKEN, api.github.com) and postToTelegram (HTML, resolves
 * false if the Telegram secrets are missing).
 *
 * Required env:
 *   GITHUB_TOKEN  (+ REPO or GITHUB_REPOSITORY)
 * Optional env:
 *   TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
 *   WATCHDOG_HEARTBEAT_DAY (default 'Mon') — weekday for the healthy heartbeat
 *
 * Flags:
 *   --self-test   run the pure alert-evaluation functions against inline
 *                 fixtures and exit non-zero on mismatch. No network.
 *   --dry-run     print the Telegram message + issue body instead of sending.
 *
 * Exit codes:
 *   0 — ran successfully (including when it found and reported problems)
 *   1 — the watchdog itself errored. A detected problem is NOT an error.
 */

const https = require('https');

const REPO = process.env.REPO || process.env.GITHUB_REPOSITORY || 'ricardoparro/MetalDrummerGear';
const HEARTBEAT_DAY = process.env.WATCHDOG_HEARTBEAT_DAY || 'Mon';

const ISSUE_MARKER = '<!-- loop-watchdog-umbrella -->';
const ISSUE_TITLE_PREFIX = '🚨 Loop Watchdog';
const ISSUE_LABEL = 'ops';

// ---------------------------------------------------------------------------
// Critical workflows + their expected scheduling interval (hours). Stale check
// is lenient: we only alert past 2× interval + buffer, to avoid false alarms
// from a single skipped/queued run.
// ---------------------------------------------------------------------------
const CRITICAL_WORKFLOWS = [
  // Roadie runs daytime-only, so its real gap spans the overnight window. Use a
  // 14h expected interval so a normal quiet night never trips the stale check.
  { file: 'roadie.yml', name: 'Roadie', intervalH: 14 },
  { file: 'roadie-night-fleet.yml', name: 'Roadie Night Fleet', intervalH: 24 },
  { file: 'pr-merger.yml', name: 'PR Merger', intervalH: 1 },
  { file: 'ceo-agent.yml', name: 'CEO Agent', intervalH: 3 },
  // SEO Agent's cron is '0 7,13,19 * * *' — daytime slots are 6h apart, but
  // 19:00 → 07:00 next day is a 12h overnight gap. Use 12h (not the 6h
  // daytime cadence) so that normal overnight gap never trips the stale check.
  { file: 'seo-agent.yml', name: 'SEO Agent', intervalH: 12 },
  { file: 'check-gsc-watched-queries.yml', name: 'GSC Watch (L1)', intervalH: 168 },
  { file: 'check-llm-citations.yml', name: 'LLM Citations (L2)', intervalH: 168 },
  { file: 'check-indexation.yml', name: 'Indexation (L3)', intervalH: 168 },
  { file: 'check-structured-data.yml', name: 'Structured Data', intervalH: 168 },
];

// Conclusions we treat as a hard failure of the most recent run.
const FAILED_CONCLUSIONS = new Set(['failure', 'cancelled', 'startup_failure', 'timed_out']);

const STALE_BUFFER_H = 1; // small grace on top of the 2× multiplier
const DROUGHT_WINDOW_H = 24;
const SNAPSHOT_STALE_DAYS = 8;

// ===========================================================================
// GitHub REST helper — same style as generate-digest.cjs collectGitHubData().
// ===========================================================================
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
        'User-Agent': 'metalforge-watchdog/1.0',
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
        'User-Agent': 'metalforge-watchdog/1.0',
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

// ===========================================================================
// Telegram — copied verbatim from generate-digest.cjs.
// ===========================================================================
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

// ===========================================================================
// PURE alert-evaluation functions (unit-tested via --self-test, no network).
// Each takes plain data and returns an array of short alert strings.
// ===========================================================================

/**
 * #1 — Critical-workflow failure. Given a workflow descriptor and its most
 * recent run object, alert if that run's conclusion is a hard failure.
 */
function evalWorkflowFailure(wf, run) {
  if (!run) return [];
  if (run.status && run.status !== 'completed') return []; // still running — don't judge
  if (FAILED_CONCLUSIONS.has(run.conclusion)) {
    return [`${wf.name} (${wf.file}) last run ${run.conclusion} — ${run.created_at}`];
  }
  return [];
}

/**
 * #3 — Stale scheduled workflow. Alert if the most recent run is older than
 * 2× the expected interval (+ buffer). Lenient by design.
 */
function evalWorkflowStale(wf, run, now = new Date()) {
  if (!run || !run.created_at) {
    return [`${wf.name} (${wf.file}) has no runs on record`];
  }
  const ageH = (now.getTime() - new Date(run.created_at).getTime()) / 3600000;
  const thresholdH = wf.intervalH * 2 + STALE_BUFFER_H;
  if (ageH > thresholdH) {
    return [`${wf.name} hasn't run since ${run.created_at} (${Math.floor(ageH)}h ago, expected ≤${wf.intervalH}h)`];
  }
  return [];
}

/**
 * #2 — Roadie output drought. The exact stall we hit: Roadie burned a run but
 * shipped nothing while the backlog was non-empty.
 * @param {number} roadiePrsOpened  roadie/* PRs opened in last 24h
 * @param {number} prsMerged        PRs merged in last 24h
 * @param {number} openAiFix        open ai-fix issues
 */
function evalRoadieDrought(roadiePrsOpened, prsMerged, openAiFix) {
  if (roadiePrsOpened === 0 && prsMerged === 0 && openAiFix > 0) {
    return [`Roadie shipped nothing in ${DROUGHT_WINDOW_H}h despite ${openAiFix} ai-fix open`];
  }
  return [];
}

/**
 * #4 — Verifier snapshot freshness. Given {path, lastCommitIso} entries, alert
 * on any older than SNAPSHOT_STALE_DAYS.
 */
function evalSnapshotFreshness(snapshots, now = new Date()) {
  const alerts = [];
  for (const s of snapshots) {
    if (!s.lastCommitIso) continue;
    const ageDays = (now.getTime() - new Date(s.lastCommitIso).getTime()) / 86400000;
    if (ageDays > SNAPSHOT_STALE_DAYS) {
      alerts.push(`${s.path} not updated in ${Math.floor(ageDays)}d (expected ≤${SNAPSHOT_STALE_DAYS}d)`);
    }
  }
  return alerts;
}

/**
 * Combine all checks from a pre-collected snapshot of state. Pure: takes data,
 * returns alerts. This is what the fixtures in --self-test exercise.
 *
 * state = {
 *   workflows: [{ wf, run }],
 *   roadie: { prsOpened, prsMerged, openAiFix },
 *   snapshots: [{ path, lastCommitIso }],
 *   now: Date,
 * }
 */
function evaluateAll(state) {
  const now = state.now || new Date();
  const alerts = [];
  for (const { wf, run } of state.workflows || []) {
    alerts.push(...evalWorkflowFailure(wf, run));
    alerts.push(...evalWorkflowStale(wf, run, now));
  }
  if (state.roadie) {
    alerts.push(...evalRoadieDrought(state.roadie.prsOpened, state.roadie.prsMerged, state.roadie.openAiFix));
  }
  if (state.snapshots) {
    alerts.push(...evalSnapshotFreshness(state.snapshots, now));
  }
  return alerts;
}

// ===========================================================================
// Message + issue body builders (pure-ish; just string formatting).
// ===========================================================================
const esc = (s) => String(s).replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));

function actionsUrl() {
  return `https://github.com/${REPO}/actions`;
}

function buildTelegramText(alerts, now = new Date()) {
  const lines = [];
  lines.push('🚨 <b>Loop Watchdog</b>');
  lines.push(`<i>${now.toISOString().slice(0, 16).replace('T', ' ')} UTC · ${alerts.length} alert${alerts.length === 1 ? '' : 's'}</i>`);
  lines.push('');
  for (const a of alerts) lines.push(`• ${esc(a)}`);
  lines.push('');
  lines.push(`<a href="${actionsUrl()}">Actions tab →</a>`);
  return lines.join('\n');
}

function buildHeartbeatText(now = new Date()) {
  const lines = [];
  lines.push('✅ <b>Loop Watchdog</b> — all loops healthy');
  lines.push(`<i>${now.toISOString().slice(0, 16).replace('T', ' ')} UTC · weekly heartbeat</i>`);
  lines.push('');
  lines.push('No failed/stale critical workflows, no Roadie drought, snapshots fresh.');
  lines.push(`<a href="${actionsUrl()}">Actions tab →</a>`);
  return lines.join('\n');
}

function buildIssueBody(alerts, now = new Date()) {
  const lines = [];
  lines.push(ISSUE_MARKER);
  lines.push('');
  lines.push(`_Auto-maintained by \`.agents/scripts/watchdog.cjs\`. Last checked ${now.toISOString().slice(0, 16).replace('T', ' ')} UTC._`);
  lines.push('');
  lines.push(`## 🚨 ${alerts.length} active alert${alerts.length === 1 ? '' : 's'}`);
  lines.push('');
  for (const a of alerts) lines.push(`- ${a}`);
  lines.push('');
  lines.push(`[Actions tab →](${actionsUrl()})`);
  lines.push('');
  lines.push('This issue closes automatically once all checks pass.');
  return lines.join('\n');
}

// ===========================================================================
// Network-backed collectors (only run in the live path, not in --self-test).
// ===========================================================================
async function latestRun(wf) {
  try {
    const data = await ghRequest('GET',
      `/repos/${REPO}/actions/workflows/${wf.file}/runs?per_page=1`);
    return (data && data.workflow_runs && data.workflow_runs[0]) || null;
  } catch (e) {
    // A 404 means the workflow file doesn't exist on the default branch yet —
    // treat as "no runs" rather than crashing the whole watchdog.
    if (/→ 404/.test(e.message)) {
      process.stderr.write(`  ${wf.file}: not found (404), skipping.\n`);
      return null;
    }
    // A 403 means the GITHUB_TOKEN lacks `actions: read` (granted in watchdog.yml).
    // Degrade gracefully instead of a FATAL crash so one permission hiccup can't
    // take the whole liveness check offline.
    if (/→ 403/.test(e.message)) {
      process.stderr.write(`  ${wf.file}: not accessible (403 — needs actions:read), skipping.\n`);
      return null;
    }
    throw e;
  }
}

// Max pages (100/page) to walk when counting recent PR activity. Sized well
// above the repo's real 24h PR volume so the window boundary is always found;
// just a backstop against runaway pagination.
const PR_SCAN_MAX_PAGES = 10;

async function collectRoadie() {
  const since = Date.now() - DROUGHT_WINDOW_H * 3600000;

  // roadie/* PRs opened + PRs merged in the last 24h, via the primary pulls
  // REST API rather than /search/issues. The search index is eventually
  // consistent and previously lagged far enough behind a merge burst to read
  // back 0 opened + 0 merged while dozens of PRs had actually shipped hours
  // earlier — a false "Roadie shipped nothing" alert. The pulls endpoint reads
  // straight from the primary store, so it can't go stale like that.
  const seenOpened = new Set();
  let prsMerged = 0;

  // Closed PRs, newest-updated first. Merging always bumps updated_at, so a
  // page whose oldest updated_at already falls outside the window means every
  // earlier page is outside it too — safe to stop there.
  for (let page = 1; page <= PR_SCAN_MAX_PAGES; page++) {
    const closed = await ghRequest('GET',
      `/repos/${REPO}/pulls?state=closed&sort=updated&direction=desc&per_page=100&page=${page}`);
    if (!Array.isArray(closed) || closed.length === 0) break;
    for (const pr of closed) {
      if (pr.merged_at && new Date(pr.merged_at).getTime() >= since) prsMerged++;
      if (pr.created_at && new Date(pr.created_at).getTime() >= since &&
          pr.head && typeof pr.head.ref === 'string' && pr.head.ref.startsWith('roadie/')) {
        seenOpened.add(pr.number);
      }
    }
    if (new Date(closed[closed.length - 1].updated_at).getTime() < since) break;
  }

  // Still-open PRs, newest-created first — same window logic on created_at.
  for (let page = 1; page <= PR_SCAN_MAX_PAGES; page++) {
    const open = await ghRequest('GET',
      `/repos/${REPO}/pulls?state=open&sort=created&direction=desc&per_page=100&page=${page}`);
    if (!Array.isArray(open) || open.length === 0) break;
    let anyInWindow = false;
    for (const pr of open) {
      if (pr.created_at && new Date(pr.created_at).getTime() >= since) {
        anyInWindow = true;
        if (pr.head && typeof pr.head.ref === 'string' && pr.head.ref.startsWith('roadie/')) {
          seenOpened.add(pr.number);
        }
      }
    }
    if (!anyInWindow) break;
  }

  // Open ai-fix issue count — a point-in-time snapshot (not a recency window),
  // so search-index lag isn't a correctness concern here.
  const fixQ = encodeURIComponent(`repo:${REPO} is:issue is:open label:ai-fix`);
  const fixRes = await ghRequest('GET', `/search/issues?q=${fixQ}&per_page=1`);
  const openAiFix = fixRes ? (fixRes.total_count ?? 0) : 0;

  return { prsOpened: seenOpened.size, prsMerged, openAiFix };
}

async function collectSnapshots() {
  // #4 — verifier snapshot freshness via the commits API (cheap, optional).
  const files = [
    '.agents/seo/indexation-snapshot.md',
    '.agents/seo/gsc-watch-snapshot.md',
  ];
  const out = [];
  for (const f of files) {
    try {
      const commits = await ghRequest('GET',
        `/repos/${REPO}/commits?path=${encodeURIComponent(f)}&per_page=1`);
      const last = Array.isArray(commits) && commits[0];
      if (!last) continue; // file not tracked / no commits — skip silently
      const iso = last.commit?.committer?.date || last.commit?.author?.date || null;
      out.push({ path: f, lastCommitIso: iso });
    } catch (e) {
      process.stderr.write(`  snapshot ${f}: ${e.message}\n`);
    }
  }
  return out;
}

// ===========================================================================
// Umbrella-issue upsert (mirrors the indexation loop's open/edit/close model).
// ===========================================================================
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
        name: ISSUE_LABEL, color: 'd73a4a',
        description: 'Operational alerts — auto-managed by watchdog.cjs',
      }).catch(() => {});
    }
  }
}

async function upsertUmbrellaIssue(alerts, now = new Date()) {
  const existing = await findUmbrellaIssue();
  if (alerts.length === 0) {
    if (existing) {
      await ghWrite('POST', `/repos/${REPO}/issues/${existing.number}/comments`, {
        body: `🤖 Watchdog ${now.toISOString().slice(0, 16).replace('T', ' ')} UTC: all checks pass. Closing.`,
      });
      await ghWrite('PATCH', `/repos/${REPO}/issues/${existing.number}`, { state: 'closed' });
      process.stderr.write(`  Closed umbrella issue #${existing.number}.\n`);
    }
    return;
  }
  await ensureLabel();
  const title = `${ISSUE_TITLE_PREFIX} — ${alerts.length} active alert${alerts.length === 1 ? '' : 's'}`;
  const body = buildIssueBody(alerts, now);
  if (existing) {
    await ghWrite('PATCH', `/repos/${REPO}/issues/${existing.number}`, { title, body, state: 'open' });
    await ghWrite('POST', `/repos/${REPO}/issues/${existing.number}/comments`, {
      body: `🤖 Watchdog ${now.toISOString().slice(0, 16).replace('T', ' ')} UTC: ${alerts.length} active alert(s).`,
    });
    process.stderr.write(`  Updated umbrella issue #${existing.number}.\n`);
  } else {
    const created = await ghWrite('POST', `/repos/${REPO}/issues`, {
      title, body, labels: [ISSUE_LABEL],
    });
    process.stderr.write(`  Opened umbrella issue #${created && created.number}.\n`);
  }
}

// ===========================================================================
// Self-test — inline fixtures against the pure evaluators. No network.
// ===========================================================================
function selfTest() {
  let failures = 0;
  const check = (name, got, want) => {
    const ok = got === want;
    process.stdout.write(`${ok ? 'PASS' : 'FAIL'} — ${name} (got ${got}, want ${want})\n`);
    if (!ok) failures++;
  };

  const now = new Date('2026-06-28T12:00:00Z');
  const wf = { file: 'roadie.yml', name: 'Roadie', intervalH: 14 };

  // Fixture A: a failed workflow run → exactly 1 alert.
  const failedRun = { status: 'completed', conclusion: 'failure', created_at: now.toISOString() };
  check('failed workflow → 1 alert', evalWorkflowFailure(wf, failedRun).length, 1);

  // A cancelled run also alerts.
  check('cancelled workflow → 1 alert',
    evalWorkflowFailure(wf, { status: 'completed', conclusion: 'cancelled', created_at: now.toISOString() }).length, 1);

  // A still-running run is not judged.
  check('in-progress workflow → 0 alerts',
    evalWorkflowFailure(wf, { status: 'in_progress', conclusion: null, created_at: now.toISOString() }).length, 0);

  // Fixture B: a healthy, recent success → 0 alerts (failure + stale both clear).
  const healthyRun = {
    status: 'completed', conclusion: 'success',
    created_at: new Date(now.getTime() - 1 * 3600000).toISOString(),
  };
  check('healthy recent success → 0 failure alerts', evalWorkflowFailure(wf, healthyRun).length, 0);
  check('healthy recent success → 0 stale alerts', evalWorkflowStale(wf, healthyRun, now).length, 0);

  // Fixture C: stale workflow (last run way past 2× interval) → 1 alert.
  const staleRun = {
    status: 'completed', conclusion: 'success',
    created_at: new Date(now.getTime() - 100 * 3600000).toISOString(), // 100h vs 14h*2+1
  };
  check('stale workflow → 1 alert', evalWorkflowStale(wf, staleRun, now).length, 1);

  // Fixture D: 0-PR + backlog>0 → the drought alert (the exact stall we hit).
  check('0 PRs + backlog 12 → drought alert', evalRoadieDrought(0, 0, 12).length, 1);
  check('0 PRs + empty backlog → no alert', evalRoadieDrought(0, 0, 0).length, 0);
  check('PRs shipped + backlog → no alert', evalRoadieDrought(3, 1, 12).length, 0);

  // Fixture E: stale snapshot → 1 alert; fresh → 0.
  check('stale snapshot → 1 alert', evalSnapshotFreshness(
    [{ path: 'x.md', lastCommitIso: new Date(now.getTime() - 10 * 86400000).toISOString() }], now).length, 1);
  check('fresh snapshot → 0 alerts', evalSnapshotFreshness(
    [{ path: 'x.md', lastCommitIso: new Date(now.getTime() - 2 * 86400000).toISOString() }], now).length, 0);

  // Fixture F: full healthy state via evaluateAll → 0 alerts.
  const healthyState = {
    now,
    workflows: CRITICAL_WORKFLOWS.map(w => ({
      wf: w,
      run: { status: 'completed', conclusion: 'success', created_at: now.toISOString() },
    })),
    roadie: { prsOpened: 2, prsMerged: 1, openAiFix: 10 },
    snapshots: [{ path: 'a.md', lastCommitIso: now.toISOString() }],
  };
  check('healthy full state → 0 alerts', evaluateAll(healthyState).length, 0);

  // Fixture G: broken state via evaluateAll → at least the failure + drought.
  const brokenState = {
    now,
    workflows: [{ wf, run: failedRun }],
    roadie: { prsOpened: 0, prsMerged: 0, openAiFix: 12 },
    snapshots: [],
  };
  check('broken full state → ≥2 alerts', evaluateAll(brokenState).length >= 2, true);

  process.stdout.write(failures === 0 ? '\nself-test: PASS\n' : `\nself-test: FAIL (${failures})\n`);
  return failures === 0;
}

// ===========================================================================
// Main live path.
// ===========================================================================
function isHeartbeatDay(now = new Date()) {
  const day = now.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' }); // e.g. "Mon"
  return day === HEARTBEAT_DAY;
}

async function run({ dryRun }) {
  const now = new Date();
  process.stderr.write(`Loop Watchdog for ${REPO} @ ${now.toISOString()}\n`);

  // Collect state.
  const workflows = [];
  for (const wf of CRITICAL_WORKFLOWS) {
    const runObj = await latestRun(wf);
    workflows.push({ wf, run: runObj });
  }
  const roadie = await collectRoadie();
  process.stderr.write(`  Roadie 24h: ${roadie.prsOpened} roadie/* PRs opened · ${roadie.prsMerged} merged · ${roadie.openAiFix} ai-fix open\n`);
  const snapshots = await collectSnapshots();

  const alerts = evaluateAll({ now, workflows, roadie, snapshots });
  process.stderr.write(`  ${alerts.length} alert(s).\n`);

  if (alerts.length > 0) {
    const text = buildTelegramText(alerts, now);
    if (dryRun) {
      process.stdout.write('\n--- TELEGRAM (dry-run) ---\n' + text + '\n');
      process.stdout.write('\n--- ISSUE BODY (dry-run) ---\n' + buildIssueBody(alerts, now) + '\n');
    } else {
      await postToTelegram(text);
      await upsertUmbrellaIssue(alerts, now);
    }
  } else {
    // Healthy. Close any lingering umbrella issue, then maybe heartbeat.
    if (dryRun) {
      process.stdout.write('\nNo alerts. (Would close umbrella issue if open.)\n');
      if (isHeartbeatDay(now)) {
        process.stdout.write('\n--- TELEGRAM heartbeat (dry-run) ---\n' + buildHeartbeatText(now) + '\n');
      }
    } else {
      await upsertUmbrellaIssue(alerts, now);
      if (isHeartbeatDay(now)) {
        await postToTelegram(buildHeartbeatText(now));
      } else {
        process.stderr.write('  Healthy, not heartbeat day — staying silent.\n');
      }
    }
  }
  return alerts;
}

// ===========================================================================
// Entry point.
// ===========================================================================
(async () => {
  const args = process.argv.slice(2);
  if (args.includes('--self-test')) {
    const ok = selfTest();
    process.exit(ok ? 0 : 1);
  }
  const dryRun = args.includes('--dry-run');
  await run({ dryRun });
  process.exit(0);
})().catch(e => {
  // Only internal errors are non-zero. A detected problem exits 0 via run().
  process.stderr.write(`FATAL: ${e.message}\n${e.stack}\n`);
  process.exit(1);
});

module.exports = {
  evalWorkflowFailure, evalWorkflowStale, evalRoadieDrought,
  evalSnapshotFreshness, evaluateAll, buildTelegramText, buildIssueBody,
};
