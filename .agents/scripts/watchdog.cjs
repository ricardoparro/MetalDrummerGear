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
  // CEO cron throttled to every 3h (2026-07-23); use 4h so a single skipped
  // run (e.g. a subscription-limit window) doesn't trip the stale check.
  // CEO cron throttled to every 6h (2026-07-28); 7h leaves a little slack so a
  // single skipped run (e.g. a quota window) doesn't trip the stale check.
  { file: 'ceo-agent.yml', name: 'CEO Agent', intervalH: 7 },
  // SEO Agent's cron is '0 7,19 * * *' (2026-07-28: 12×/day → 2×/day) — the two
  // slots are 12h apart, so 12h is the true expected interval; the stale check
  // only fires past 2×+buffer (25h), i.e. a full day of silence.
  { file: 'seo-agent.yml', name: 'SEO Agent', intervalH: 12 },
  { file: 'check-gsc-watched-queries.yml', name: 'GSC Watch (L1)', intervalH: 168 },
  { file: 'check-llm-citations.yml', name: 'LLM Citations (L2)', intervalH: 168 },
  { file: 'check-indexation.yml', name: 'Indexation (L3)', intervalH: 168 },
  { file: 'check-structured-data.yml', name: 'Structured Data', intervalH: 168 },
  // Biweekly cron ('0 6 1,15 * *'); 336h = 14 days. Stale check trips only
  // past 2x+buffer, so a run landing a day or two off cadence never alarms.
  { file: 'check-performance.yml', name: 'Performance (L4)', intervalH: 336 },
  { file: 'check-backlink-signal.yml', name: 'Backlink signal', intervalH: 168 },
  // Event Scanner runs monthly (day 5); stale check trips only past 2x+buffer.
  { file: 'scan-events.yml', name: 'Event Scanner', intervalH: 720 },
  // Daily post at 17:00 UTC; 26h absorbs cron jitter.
  { file: 'x-agent.yml', name: 'X Agent', intervalH: 26 },
];

// Conclusions we treat as a hard failure of the most recent run.
const FAILED_CONCLUSIONS = new Set(['failure', 'cancelled', 'startup_failure', 'timed_out']);

const STALE_BUFFER_H = 1; // small grace on top of the 2× multiplier
const DROUGHT_WINDOW_H = 24;
const SNAPSHOT_STALE_DAYS = 8;

// Marker prefix for "the loop failed only because both Claude subscriptions
// were out of quota" alerts. The message builders partition on it, so quota
// pauses are reported in their own section instead of reading as breakage.
const QUOTA_PREFIX = '⏳ ';
// Signatures printed by run-claude.sh / .roadie/drain.sh when the primary AND
// backup subscriptions are both limited. Kept in sync with those scripts.
const QUOTA_LOG_RE = /(hit your (?:session|weekly|usage) limit|Backup subscription is also limited|Primary limited and no CLAUDE_CODE_OAUTH_TOKEN_2)/i;
// "You've hit your session limit · resets 8pm (UTC)" → scope + reset time.
const QUOTA_DETAIL_RE = /hit your (session|weekly|usage) limit\s*(?:·|\.|-)?\s*resets\s+([^\n\r]{1,40})/i;
// Cap on log bytes pulled per failed job — we only need the tail signatures.
const QUOTA_LOG_MAX_BYTES = 512 * 1024;

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
 *
 * Quota-aware (2026-07-25): agentic loops (CEO / SEO / Roadie) legitimately
 * fail when BOTH Claude subscriptions are inside a usage-limit window — the
 * failover in run-claude.sh / drain.sh worked, there was simply no quota to
 * spend. That is self-healing and needs no action, but it looked identical to
 * a real crash in the alert text. The live path attaches `run.quotaInfo`
 * (see classifyFailure) and we render those with a distinct ⏳ prefix, which
 * the message builders group into their own section. Still reported — the
 * founder wants to know when quota ran out — just never mistaken for a bug.
 */
function evalWorkflowFailure(wf, run) {
  if (!run) return [];
  if (run.status && run.status !== 'completed') return []; // still running — don't judge
  if (FAILED_CONCLUSIONS.has(run.conclusion)) {
    if (run.quotaInfo && run.quotaInfo.quota) {
      const reset = run.quotaInfo.resets ? `, resets ${run.quotaInfo.resets}` : '';
      const scope = run.quotaInfo.scope || 'usage';
      return [`${QUOTA_PREFIX}${wf.name} (${wf.file}) — both Claude subscriptions hit their ${scope} limit${reset} — self-healing, no action needed (${run.created_at})`];
    }
    return [`${wf.name} (${wf.file}) last run ${run.conclusion} — ${run.created_at}`];
  }
  return [];
}

/**
 * #3 — Stale scheduled workflow. Alert if the most recent run is older than
 * 2× the expected interval (+ buffer). Lenient by design.
 *
 * `workflowCreatedAt`, when known, covers the brand-new-workflow case: a
 * monthly/biweekly loop just added to CRITICAL_WORKFLOWS has genuinely never
 * run yet and won't hit its first cron tick for weeks. Without this grace
 * period, "no runs on record" pages every watchdog cycle from the moment the
 * workflow file lands until that first tick — a false positive, not a broken
 * loop. Same 2×interval+buffer leniency as the regular stale check applies,
 * anchored to the workflow's creation time instead of its last run.
 */
function evalWorkflowStale(wf, run, now = new Date(), workflowCreatedAt = null) {
  if (!run || !run.created_at) {
    if (workflowCreatedAt) {
      const ageSinceCreationH = (now.getTime() - new Date(workflowCreatedAt).getTime()) / 3600000;
      const thresholdH = wf.intervalH * 2 + STALE_BUFFER_H;
      if (ageSinceCreationH <= thresholdH) return [];
    }
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
 *
 * Quota-aware (2026-07-28): drain.sh treats an exhausted Claude subscription as
 * a graceful no-op (every issue logs "produced no commits ... claude said:
 * You've hit your weekly limit") rather than a job failure, so the run's
 * conclusion is `success` — evalWorkflowFailure's quota classification never
 * sees it. Without this, the drought alert misreports the exact same
 * self-healing quota pause already surfaced (correctly) for CEO/SEO as a
 * "needs attention" incident. `quotaInfo` (see collectRoadieQuotaSignal) is
 * only computed when the drought condition already holds.
 * @param {number} roadiePrsOpened  roadie/* PRs opened in last 24h
 * @param {number} prsMerged        PRs merged in last 24h
 * @param {number} openAiFix        open ai-fix issues
 * @param {{quota: boolean, scope?: string, resets?: string}|null} quotaInfo
 */
function evalRoadieDrought(roadiePrsOpened, prsMerged, openAiFix, quotaInfo = null) {
  if (roadiePrsOpened === 0 && prsMerged === 0 && openAiFix > 0) {
    if (quotaInfo && quotaInfo.quota) {
      const reset = quotaInfo.resets ? `, resets ${quotaInfo.resets}` : '';
      const scope = quotaInfo.scope || 'usage';
      return [`${QUOTA_PREFIX}Roadie (roadie.yml) — shipped nothing in ${DROUGHT_WINDOW_H}h despite ${openAiFix} ai-fix open: both Claude subscriptions hit their ${scope} limit${reset} — self-healing, no action needed`];
    }
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
 *   workflows: [{ wf, run, createdAt }],
 *   roadie: { prsOpened, prsMerged, openAiFix },
 *   snapshots: [{ path, lastCommitIso }],
 *   now: Date,
 * }
 */
function evaluateAll(state) {
  const now = state.now || new Date();
  const alerts = [];
  for (const { wf, run, createdAt } of state.workflows || []) {
    alerts.push(...evalWorkflowFailure(wf, run));
    alerts.push(...evalWorkflowStale(wf, run, now, createdAt));
  }
  if (state.roadie) {
    alerts.push(...evalRoadieDrought(state.roadie.prsOpened, state.roadie.prsMerged, state.roadie.openAiFix, state.roadie.quotaInfo));
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

// Split alerts into quota pauses (⏳-prefixed) and everything else, so both
// the Telegram message and the umbrella issue can say WHICH kind of trouble
// this is at a glance instead of lumping a self-healing quota window in with
// a genuine breakage.
function partitionAlerts(alerts) {
  const quota = [], real = [];
  for (const a of alerts) (a.startsWith(QUOTA_PREFIX) ? quota : real).push(a);
  return { quota, real };
}
const stripPrefix = (a) => a.startsWith(QUOTA_PREFIX) ? a.slice(QUOTA_PREFIX.length) : a;

function buildTelegramText(alerts, now = new Date()) {
  const { quota, real } = partitionAlerts(alerts);
  const lines = [];
  // Headline reflects the WORST class present: a quota-only cycle is a pause,
  // not an incident, and the founder should see that from the notification.
  lines.push(real.length > 0 ? '🚨 <b>Loop Watchdog</b>' : '⏳ <b>Loop Watchdog</b> — subscription limit');
  const counts = [];
  if (real.length) counts.push(`${real.length} alert${real.length === 1 ? '' : 's'}`);
  if (quota.length) counts.push(`${quota.length} quota pause${quota.length === 1 ? '' : 's'}`);
  lines.push(`<i>${now.toISOString().slice(0, 16).replace('T', ' ')} UTC · ${counts.join(' · ')}</i>`);
  if (real.length) {
    lines.push('');
    lines.push('<b>🚨 Needs attention</b>');
    for (const a of real) lines.push(`• ${esc(a)}`);
  }
  if (quota.length) {
    lines.push('');
    lines.push('<b>⏳ Claude subscription limit</b> <i>(expected, recovers by itself)</i>');
    for (const a of quota) lines.push(`• ${esc(stripPrefix(a))}`);
  }
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
  const { quota, real } = partitionAlerts(alerts);
  const counts = [];
  if (real.length) counts.push(`${real.length} active alert${real.length === 1 ? '' : 's'}`);
  if (quota.length) counts.push(`${quota.length} quota pause${quota.length === 1 ? '' : 's'}`);
  lines.push(`## ${real.length > 0 ? '🚨' : '⏳'} ${counts.join(' · ')}`);
  lines.push('');
  if (real.length) {
    lines.push('### 🚨 Needs attention');
    lines.push('');
    for (const a of real) lines.push(`- ${a}`);
    lines.push('');
  }
  if (quota.length) {
    lines.push('### ⏳ Claude subscription limit — expected, recovers by itself');
    lines.push('');
    lines.push('_Both the primary and backup subscriptions were inside a usage-limit window, so the run had no quota to spend. The failover in `run-claude.sh` / `.roadie/drain.sh` worked as designed; the next scheduled run picks up once the window resets. Recurring often ⇒ throttle loop cadence/width (see the token-budget note in `docs/loops.md`)._');
    lines.push('');
    for (const a of quota) lines.push(`- ${stripPrefix(a)}`);
    lines.push('');
  }
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

/**
 * Fetch a job's plain-text log. The GitHub logs endpoint answers 302 with a
 * signed storage URL; the signature IS the auth, so the redirect must be
 * followed WITHOUT the Authorization header (sending it can 400 on the CDN).
 * Truncated to QUOTA_LOG_MAX_BYTES — we only match tail signatures.
 */
function fetchJobLog(jobId) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return Promise.resolve('');
  const get = (options, withAuth) => new Promise((resolve, reject) => {
    const headers = {
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'metalforge-watchdog/1.0',
    };
    if (withAuth) headers['Authorization'] = `Bearer ${token}`;
    const req = https.request({ ...options, method: 'GET', headers }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        const u = new URL(res.headers.location);
        // Redirect target is pre-signed: do NOT forward the token.
        resolve(get({ hostname: u.hostname, path: u.pathname + u.search }, false));
        return;
      }
      if (res.statusCode < 200 || res.statusCode >= 300) {
        res.resume();
        reject(new Error(`log fetch → ${res.statusCode}`));
        return;
      }
      let body = '';
      res.on('data', (c) => {
        if (body.length < QUOTA_LOG_MAX_BYTES) body += c;
      });
      res.on('end', () => resolve(body));
    });
    req.on('error', reject);
    req.end();
  });
  return get({ hostname: 'api.github.com', path: `/repos/${REPO}/actions/jobs/${jobId}/logs` }, true);
}

/**
 * Decide WHY a failed run failed: an exhausted Claude subscription (expected,
 * self-healing) or something that needs a human. Reads the failed jobs' logs
 * and matches the failover scripts' own signatures.
 *
 * Degrades to `{ quota: false }` on any error — an unclassifiable failure must
 * still alert loudly rather than be silently downgraded.
 */
async function classifyFailure(run) {
  try {
    const data = await ghRequest('GET', `/repos/${REPO}/actions/runs/${run.id}/jobs?per_page=30`);
    const failed = ((data && data.jobs) || []).filter(j => FAILED_CONCLUSIONS.has(j.conclusion));
    for (const job of failed) {
      let log = '';
      try { log = await fetchJobLog(job.id); } catch { continue; }
      if (!QUOTA_LOG_RE.test(log)) continue;
      const m = log.match(QUOTA_DETAIL_RE);
      return { quota: true, scope: m ? m[1].toLowerCase() : 'usage', resets: m ? m[2].trim() : null };
    }
    return { quota: false };
  } catch (e) {
    process.stderr.write(`  couldn't classify failure of run ${run.id}: ${e.message}\n`);
    return { quota: false };
  }
}

// Only called when latestRun() found nothing, to grace-period a brand-new
// workflow (see evalWorkflowStale). Same graceful-degrade-on-error shape as
// latestRun() — a lookup hiccup here should fall back to the old strict
// behavior, not crash the watchdog.
async function workflowCreatedAt(wf) {
  try {
    const data = await ghRequest('GET', `/repos/${REPO}/actions/workflows/${wf.file}`);
    return (data && data.created_at) || null;
  } catch (e) {
    process.stderr.write(`  ${wf.file}: couldn't fetch workflow metadata (${e.message}), skipping grace period.\n`);
    return null;
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

// Roadie workflows whose logs get inspected when a drought is already
// detected, to tell "genuinely stuck" apart from "every run hit the same
// quota wall drain.sh already handled gracefully".
const ROADIE_WORKFLOW_FILES = ['roadie.yml', 'roadie-night-fleet.yml'];

/**
 * Explains a Roadie drought, if possible: were ALL of Roadie's completed runs
 * in the drought window blocked by the same quota exhaustion that CEO/SEO hit?
 * drain.sh logs the failover signature per no-op'd issue and still exits 0, so
 * these runs read as `success` to evalWorkflowFailure — this is the only place
 * that looks inside them. Only called once a drought is already confirmed
 * (evalRoadieDrought's other inputs), so the extra log-fetching cost is paid
 * only on the alerting path, never on a healthy run.
 */
async function collectRoadieQuotaSignal(since) {
  let anyRun = false;
  let allQuotaBlocked = true;
  let scope = null;
  let resets = null;
  for (const file of ROADIE_WORKFLOW_FILES) {
    let runs;
    try {
      const data = await ghRequest('GET', `/repos/${REPO}/actions/workflows/${file}/runs?per_page=30`);
      runs = ((data && data.workflow_runs) || [])
        .filter(r => r.status === 'completed' && new Date(r.created_at).getTime() >= since);
    } catch (e) {
      process.stderr.write(`  ${file}: couldn't list runs for quota signal (${e.message}).\n`);
      return { quota: false };
    }
    for (const wfRun of runs) {
      anyRun = true;
      let jobs;
      try {
        const data = await ghRequest('GET', `/repos/${REPO}/actions/runs/${wfRun.id}/jobs?per_page=30`);
        jobs = (data && data.jobs) || [];
      } catch (e) {
        process.stderr.write(`  ${file} run ${wfRun.id}: couldn't list jobs (${e.message}).\n`);
        return { quota: false };
      }
      let runHadQuota = false;
      for (const job of jobs) {
        let log = '';
        try { log = await fetchJobLog(job.id); } catch { continue; }
        if (!QUOTA_LOG_RE.test(log)) continue;
        runHadQuota = true;
        const m = log.match(QUOTA_DETAIL_RE);
        if (m && !scope) { scope = m[1].toLowerCase(); resets = m[2].trim(); }
      }
      if (!runHadQuota) allQuotaBlocked = false;
    }
  }
  if (!anyRun) return { quota: false };
  return { quota: allQuotaBlocked, scope, resets };
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

  // Fixture A2: a failure caused purely by both Claude subscriptions being out
  // of quota still alerts (the founder wants to know), but as a ⏳ quota pause
  // routed to its own section — never mistaken for breakage.
  const quotaRun = {
    status: 'completed', conclusion: 'failure', created_at: now.toISOString(),
    quotaInfo: { quota: true, scope: 'session', resets: '8pm (UTC)' },
  };
  const quotaAlerts = evalWorkflowFailure(wf, quotaRun);
  check('quota-limited failure → 1 alert', quotaAlerts.length, 1);
  check('quota alert carries the ⏳ prefix', quotaAlerts[0].startsWith(QUOTA_PREFIX), true);
  check('quota alert names the reset time', /resets 8pm \(UTC\)/.test(quotaAlerts[0]), true);
  // An unclassifiable failure must NOT be downgraded.
  check('failure with quota:false stays a hard alert',
    evalWorkflowFailure(wf, { ...failedRun, quotaInfo: { quota: false } })[0].startsWith(QUOTA_PREFIX), false);
  // Builders route the two classes into distinct sections/headlines.
  const mixed = [...quotaAlerts, 'SEO Agent (seo-agent.yml) last run failure — x'];
  check('telegram: mixed → incident headline', buildTelegramText(mixed, now).startsWith('🚨'), true);
  check('telegram: quota-only → pause headline', buildTelegramText(quotaAlerts, now).startsWith('⏳'), true);
  check('issue body: quota-only → no "Needs attention" section',
    /Needs attention/.test(buildIssueBody(quotaAlerts, now)), false);
  check('issue body: mixed → has both sections',
    /Needs attention/.test(buildIssueBody(mixed, now)) && /subscription limit/i.test(buildIssueBody(mixed, now)), true);

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

  // Fixture C2: a brand-new workflow with zero runs is exempt from "no runs
  // on record" while still inside its own 2×interval+buffer grace window
  // since creation (the check-performance.yml/scan-events.yml case: added
  // today, next cron tick weeks away).
  check('brand-new workflow inside grace window → 0 alerts',
    evalWorkflowStale(wf, null, now, new Date(now.getTime() - 1 * 3600000).toISOString()).length, 0);

  // Fixture C3: same zero-run workflow, but past its own grace window since
  // creation → still alerts (cron may genuinely be broken).
  check('workflow with no runs past grace window → 1 alert',
    evalWorkflowStale(wf, null, now, new Date(now.getTime() - 100 * 3600000).toISOString()).length, 1);

  // Fixture D: 0-PR + backlog>0 → the drought alert (the exact stall we hit).
  check('0 PRs + backlog 12 → drought alert', evalRoadieDrought(0, 0, 12).length, 1);
  check('0 PRs + empty backlog → no alert', evalRoadieDrought(0, 0, 0).length, 0);
  check('PRs shipped + backlog → no alert', evalRoadieDrought(3, 1, 12).length, 0);

  // Fixture D2 (2026-07-28): a drought caused entirely by drain.sh's graceful
  // quota no-op — same root cause as a quota-limited workflow failure, so it
  // must route the same way: ⏳-prefixed, not "needs attention".
  const droughtQuotaInfo = { quota: true, scope: 'weekly', resets: 'Jul 30, 10am (UTC)' };
  const droughtQuotaAlerts = evalRoadieDrought(0, 0, 22, droughtQuotaInfo);
  check('quota-caused drought → 1 alert', droughtQuotaAlerts.length, 1);
  check('quota-caused drought carries the ⏳ prefix', droughtQuotaAlerts[0].startsWith(QUOTA_PREFIX), true);
  check('quota-caused drought names the reset time', /resets Jul 30, 10am \(UTC\)/.test(droughtQuotaAlerts[0]), true);
  // Unclassifiable (or genuinely broken) droughts must NOT be downgraded.
  check('drought with quota:false stays a hard alert',
    evalRoadieDrought(0, 0, 22, { quota: false })[0].startsWith(QUOTA_PREFIX), false);
  check('issue body: quota-caused drought alone → no "Needs attention" section',
    /Needs attention/.test(buildIssueBody(droughtQuotaAlerts, now)), false);

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
    const createdAt = runObj ? null : await workflowCreatedAt(wf);
    // Only classify actual failures — one extra API round-trip per broken run,
    // never on the healthy path.
    if (runObj && runObj.status === 'completed' && FAILED_CONCLUSIONS.has(runObj.conclusion)) {
      runObj.quotaInfo = await classifyFailure(runObj);
      if (runObj.quotaInfo.quota) {
        process.stderr.write(`  ${wf.file}: failure is a Claude ${runObj.quotaInfo.scope}-limit pause (resets ${runObj.quotaInfo.resets || '?'}).\n`);
      }
    }
    workflows.push({ wf, run: runObj, createdAt });
  }
  const roadie = await collectRoadie();
  process.stderr.write(`  Roadie 24h: ${roadie.prsOpened} roadie/* PRs opened · ${roadie.prsMerged} merged · ${roadie.openAiFix} ai-fix open\n`);
  // Only worth explaining a drought that's actually happening — skip the log
  // fetches entirely on a healthy run.
  if (roadie.prsOpened === 0 && roadie.prsMerged === 0 && roadie.openAiFix > 0) {
    const since = now.getTime() - DROUGHT_WINDOW_H * 3600000;
    roadie.quotaInfo = await collectRoadieQuotaSignal(since);
    if (roadie.quotaInfo.quota) {
      process.stderr.write(`  Roadie drought is a Claude ${roadie.quotaInfo.scope || 'usage'}-limit pause (resets ${roadie.quotaInfo.resets || '?'}).\n`);
    }
  }
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
