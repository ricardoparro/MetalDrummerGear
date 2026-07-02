#!/usr/bin/env node
/**
 * Prune Proposals — bounds the `seo-proposal` idea bank deterministically.
 *
 * Why this exists: the SEO Agent files 5–7 `seo-proposal` issues every run and
 * the CEO only promotes up to the ai-fix cap (45), parking the rest as
 * "idea bank — they cost nothing parked". They did cost something: the open
 * seo-proposal count grew unbounded (300+), burying the signal and making the
 * issue list unusable. Prompt instructions alone never held this back, so this
 * loop is the *deterministic* backstop — it doesn't depend on an agent obeying.
 *
 * Two cull rules, applied only to UN-PROMOTED proposals (an issue that already
 * carries ai-fix / in-progress / pr-opened / hold / human* is in flight or
 * protected and is NEVER touched):
 *
 *   1. STALE  — close proposals older than STALE_DAYS. A proposal is a bet
 *               against a week of GSC/GA4 metrics; once it's weeks old the
 *               metrics it cited are gone, so re-deriving beats reviving.
 *   2. CAP    — after the stale pass, if more than BANK_CAP eligible proposals
 *               remain, close the OLDEST excess (newest reflect fresher
 *               metrics). Keeps the bank at a size the CEO can actually triage.
 *
 * Closures are reversible: each gets an explanatory comment inviting a reopen,
 * and a `pruned` label so a future run can tell auto-closed from human-closed.
 * A per-run MAX_CLOSE throttle keeps one run from tripping GitHub's secondary
 * rate limit; the daily cron drains a large backlog over a few runs.
 *
 * Required env:
 *   GITHUB_TOKEN  (+ REPO or GITHUB_REPOSITORY)
 * Optional env:
 *   PRUNE_BANK_CAP    (default 60)  — max eligible proposals to keep
 *   PRUNE_STALE_DAYS  (default 21)  — age beyond which a proposal is stale
 *   PRUNE_MAX_CLOSE   (default 100) — hard ceiling on closures per run
 *   TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID  — optional one-line summary on activity
 *
 * Flags:
 *   --self-test   run the pure selection logic against inline fixtures; no network.
 *   --dry-run     list what WOULD be closed without closing anything.
 *
 * Exit codes:
 *   0 — ran successfully (including when it closed nothing)
 *   1 — the prune itself errored
 */

const https = require('https');

const REPO = process.env.REPO || process.env.GITHUB_REPOSITORY || 'ricardoparro/MetalDrummerGear';
const BANK_CAP = parseInt(process.env.PRUNE_BANK_CAP || '60', 10);
const STALE_DAYS = parseInt(process.env.PRUNE_STALE_DAYS || '21', 10);
const MAX_CLOSE = parseInt(process.env.PRUNE_MAX_CLOSE || '100', 10);

const PROPOSAL_LABEL = 'seo-proposal';
const PRUNED_LABEL = 'pruned';

// A proposal carrying ANY of these is in flight, protected, or human-owned —
// never auto-close it regardless of age or cap. This also includes the
// verifier-umbrella labels (llm-citations, gsc-watch, indexation-watch):
// those mark single, auto-maintained issues that check-llm-citations.yml /
// check-gsc-watched-queries.yml / check-indexation.yml open once and edit
// weekly — never idea-bank content, even if seo-proposal rides along (#3488).
const PROTECTED_LABELS = new Set([
  'ai-fix', 'in-progress', 'pr-opened', 'hold', 'do-not-merge', 'wip',
  'blocked', 'human', 'needs-human', 'human-founder', 'keep',
  'llm-citations', 'gsc-watch', 'indexation-watch',
]);

// ===========================================================================
// GitHub REST helpers — same style as watchdog.cjs / generate-digest.cjs.
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
        'User-Agent': 'metalforge-prune-proposals/1.0',
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
        'User-Agent': 'metalforge-prune-proposals/1.0',
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
  if (!token || !chatId) return Promise.resolve(false);
  const body = JSON.stringify({
    chat_id: chatId, text, parse_mode: 'HTML', disable_web_page_preview: true,
  });
  return new Promise((resolve) => {
    const req = https.request({
      method: 'POST', hostname: 'api.telegram.org', path: `/bot${token}/sendMessage`,
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
    }, (res) => {
      let chunks = '';
      res.on('data', (c) => chunks += c);
      res.on('end', () => resolve(res.statusCode >= 200 && res.statusCode < 300));
    });
    req.on('error', () => resolve(false));
    req.write(body);
    req.end();
  });
}

// ===========================================================================
// PURE selection logic (unit-tested via --self-test, no network).
// Issues are plain objects: { number, created_at, labelNames: string[] }.
// ===========================================================================

/** An issue is eligible for pruning iff it is a proposal with no protected label. */
function isEligible(issue) {
  const names = issue.labelNames || [];
  if (!names.includes(PROPOSAL_LABEL)) return false;
  return !names.some((n) => PROTECTED_LABELS.has(n));
}

function ageDays(issue, now) {
  return (now.getTime() - new Date(issue.created_at).getTime()) / 86400000;
}

/**
 * Decide what to close. Returns { stale: [], capped: [], keep: [] } of issue
 * objects. Cap applies to whatever survives the stale pass, oldest-first.
 *
 * @param {object[]} issues   ALL open issues (any label); we filter internally.
 * @param {object}   opts     { cap, staleDays, now, maxClose }
 */
function selectForPrune(issues, opts) {
  const { cap = BANK_CAP, staleDays = STALE_DAYS, now = new Date(), maxClose = MAX_CLOSE } = opts || {};
  const eligible = issues.filter(isEligible);

  // 1. Stale pass.
  const stale = eligible.filter((i) => ageDays(i, now) > staleDays);
  const staleSet = new Set(stale.map((i) => i.number));

  // 2. Cap pass over the survivors (newest kept; oldest excess closed).
  const survivors = eligible.filter((i) => !staleSet.has(i.number));
  // newest first
  survivors.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const capped = survivors.slice(cap); // everything beyond the cap (the oldest)
  const keep = survivors.slice(0, cap);

  // 3. Throttle: oldest candidates close first so the bank shrinks predictably.
  const toClose = [...stale, ...capped].sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at),
  );
  const limited = toClose.slice(0, maxClose);
  const limitedSet = new Set(limited.map((i) => i.number));

  return {
    stale: stale.filter((i) => limitedSet.has(i.number)),
    capped: capped.filter((i) => limitedSet.has(i.number)),
    deferred: toClose.length - limited.length, // exceeded the per-run throttle
    eligibleCount: eligible.length,
    keepCount: keep.length,
  };
}

function closeReason(issue, now, staleDays, isStale) {
  if (isStale) {
    const age = Math.floor(ageDays(issue, now));
    return `stale (${age}d > ${staleDays}d — the GSC/GA4 metrics it cited have rolled over)`;
  }
  return `over the idea-bank cap (kept the ${BANK_CAP} newest proposals; this one is older)`;
}

function buildCloseComment(reasonText) {
  return [
    `🤖 Auto-closed by \`prune-proposals\`: ${reasonText}.`,
    '',
    'This keeps the `seo-proposal` idea bank small enough to triage. The idea is',
    "not rejected on merit — if it's still worth doing, reopen it (or the SEO",
    'Agent will re-file it against fresh metrics) and it skips the next prune for',
    `${STALE_DAYS} days. Promoted/in-flight proposals (\`ai-fix\`, \`in-progress\`,`,
    '`pr-opened`, `hold`, `human*`, `keep`) are never auto-closed.',
  ].join('\n');
}

// ===========================================================================
// Network: page through every open issue carrying the proposal label.
// ===========================================================================
async function fetchProposals() {
  const all = [];
  for (let page = 1; page <= 20; page++) { // 20×100 = 2000 cap, far above reality
    const data = await ghRequest('GET',
      `/repos/${REPO}/issues?state=open&labels=${encodeURIComponent(PROPOSAL_LABEL)}` +
      `&per_page=100&page=${page}&sort=created&direction=asc`);
    if (!Array.isArray(data) || data.length === 0) break;
    for (const it of data) {
      if (it.pull_request) continue; // the issues endpoint also returns PRs
      all.push({
        number: it.number,
        created_at: it.created_at,
        title: it.title,
        labelNames: (it.labels || []).map((l) => (typeof l === 'string' ? l : l.name)),
      });
    }
    if (data.length < 100) break;
  }
  return all;
}

async function ensurePrunedLabel() {
  try {
    await ghRequest('GET', `/repos/${REPO}/labels/${encodeURIComponent(PRUNED_LABEL)}`);
  } catch (e) {
    if (/→ 404/.test(e.message)) {
      await ghWrite('POST', `/repos/${REPO}/labels`, {
        name: PRUNED_LABEL, color: 'cccccc',
        description: 'Auto-closed from the seo-proposal idea bank by prune-proposals.cjs',
      }).catch(() => {});
    }
  }
}

async function closeIssue(issue, reasonText) {
  await ghWrite('POST', `/repos/${REPO}/issues/${issue.number}/comments`, {
    body: buildCloseComment(reasonText),
  });
  await ghWrite('POST', `/repos/${REPO}/issues/${issue.number}/labels`, {
    labels: [PRUNED_LABEL],
  }).catch(() => {});
  await ghWrite('PATCH', `/repos/${REPO}/issues/${issue.number}`, {
    state: 'closed', state_reason: 'not_planned',
  });
}

// ===========================================================================
// Self-test — inline fixtures against the pure selector. No network.
// ===========================================================================
function selfTest() {
  let failures = 0;
  const check = (name, got, want) => {
    const ok = got === want;
    process.stdout.write(`${ok ? 'PASS' : 'FAIL'} — ${name} (got ${got}, want ${want})\n`);
    if (!ok) failures++;
  };

  const now = new Date('2026-06-29T00:00:00Z');
  const iso = (daysAgo) => new Date(now.getTime() - daysAgo * 86400000).toISOString();
  const mk = (number, daysAgo, labels = ['seo-proposal']) =>
    ({ number, created_at: iso(daysAgo), labelNames: labels });

  // Eligibility.
  check('plain proposal eligible', isEligible(mk(1, 1)), true);
  check('ai-fix protected', isEligible(mk(2, 50, ['seo-proposal', 'ai-fix'])), false);
  check('in-progress protected', isEligible(mk(3, 50, ['seo-proposal', 'in-progress'])), false);
  check('human protected', isEligible(mk(4, 99, ['seo-proposal', 'human'])), false);
  check('keep protected', isEligible(mk(5, 99, ['seo-proposal', 'keep'])), false);
  check('non-proposal ignored', isEligible(mk(6, 99, ['bug'])), false);
  check('llm-citations umbrella protected', isEligible(mk(7, 99, ['seo-proposal', 'llm-citations'])), false);
  check('gsc-watch umbrella protected', isEligible(mk(8, 99, ['seo-proposal', 'gsc-watch'])), false);
  check('indexation-watch umbrella protected', isEligible(mk(9, 99, ['seo-proposal', 'indexation-watch'])), false);

  // Stale pass: 21d threshold.
  const staleOnly = [mk(10, 30), mk(11, 25), mk(12, 5), mk(13, 1)];
  let r = selectForPrune(staleOnly, { cap: 100, staleDays: 21, now });
  check('stale pass closes 2 old', r.stale.length, 2);
  check('stale pass caps nothing', r.capped.length, 0);

  // Protected old proposals survive the stale pass.
  const withProtected = [mk(20, 40, ['seo-proposal', 'ai-fix']), mk(21, 40)];
  r = selectForPrune(withProtected, { cap: 100, staleDays: 21, now });
  check('protected old not closed', r.stale.length, 1);

  // Cap pass: 5 fresh proposals, cap 3 → close oldest 2 via cap (none stale).
  const fresh = [mk(30, 1), mk(31, 2), mk(32, 3), mk(33, 4), mk(34, 5)];
  r = selectForPrune(fresh, { cap: 3, staleDays: 21, now });
  check('cap pass closes 2 oldest', r.capped.length, 2);
  check('cap pass keeps 3', r.keepCount, 3);
  // The two closed-by-cap are the oldest (#33 @4d, #34 @5d).
  const cappedNums = r.capped.map((i) => i.number).sort((a, b) => a - b);
  check('cap closes the oldest two (33)', cappedNums[0], 33);
  check('cap closes the oldest two (34)', cappedNums[1], 34);

  // #3488 regression: a verifier-umbrella issue (seo-proposal + llm-citations,
  // like the real #2211) must survive BOTH the stale pass and the cap pass,
  // even when it's old and the bank is over cap — not just isEligible().
  const umbrella = mk(70, 99, ['seo-proposal', 'llm-citations']);
  r = selectForPrune([umbrella, ...fresh], { cap: 1, staleDays: 21, now });
  check('umbrella excluded from stale pass', r.stale.some((i) => i.number === 70), false);
  check('umbrella excluded from cap pass', r.capped.some((i) => i.number === 70), false);

  // Combined: stale removes old ones first, THEN cap applies to survivors.
  const mixed = [mk(40, 40), mk(41, 30), mk(42, 5), mk(43, 4), mk(44, 3), mk(45, 2)];
  r = selectForPrune(mixed, { cap: 2, staleDays: 21, now });
  check('combined: 2 stale closed', r.stale.length, 2);
  check('combined: survivors beyond cap closed', r.capped.length, 2); // 4 fresh - cap 2
  check('combined: keep == cap', r.keepCount, 2);

  // Throttle: maxClose caps total closures, oldest first.
  const many = Array.from({ length: 10 }, (_, k) => mk(50 + k, 30 + k));
  r = selectForPrune(many, { cap: 100, staleDays: 21, now, maxClose: 4 });
  check('throttle limits to 4', r.stale.length + r.capped.length, 4);
  check('throttle reports deferred', r.deferred, 6);
  // Oldest (largest daysAgo) close first → #59 (39d) must be in the set.
  check('throttle closes oldest first', r.stale.some((i) => i.number === 59), true);

  // Empty / no-op.
  r = selectForPrune([], { cap: 60, staleDays: 21, now });
  check('empty → nothing to close', r.stale.length + r.capped.length, 0);
  r = selectForPrune(fresh, { cap: 100, staleDays: 21, now });
  check('under cap, all fresh → no-op', r.stale.length + r.capped.length, 0);

  process.stdout.write(failures === 0 ? '\nALL PASS\n' : `\n${failures} FAILED\n`);
  process.exit(failures === 0 ? 0 : 1);
}

// ===========================================================================
// Main.
// ===========================================================================
async function main() {
  const args = process.argv.slice(2);
  if (args.includes('--self-test')) return selfTest();
  const dryRun = args.includes('--dry-run');
  const now = new Date();

  const issues = await fetchProposals();
  process.stderr.write(`Open seo-proposal issues: ${issues.length}\n`);

  const plan = selectForPrune(issues, { cap: BANK_CAP, staleDays: STALE_DAYS, now, maxClose: MAX_CLOSE });
  const staleSet = new Set(plan.stale.map((i) => i.number));
  const toClose = [...plan.stale, ...plan.capped];

  process.stderr.write(
    `Eligible (un-promoted): ${plan.eligibleCount} · ` +
    `cap ${BANK_CAP} · stale>${STALE_DAYS}d\n` +
    `Closing this run: ${toClose.length} (${plan.stale.length} stale, ${plan.capped.length} over-cap)` +
    `${plan.deferred ? ` · ${plan.deferred} deferred to next run (throttle ${MAX_CLOSE})` : ''}\n`,
  );

  if (toClose.length === 0) {
    process.stderr.write('Nothing to prune. Bank within bounds.\n');
    return;
  }

  if (dryRun) {
    for (const i of toClose) {
      const isStale = staleSet.has(i.number);
      process.stdout.write(`would close #${i.number} — ${isStale ? 'STALE' : 'CAP'} — ${i.title}\n`);
    }
    return;
  }

  await ensurePrunedLabel();
  let closed = 0;
  for (const i of toClose) {
    const isStale = staleSet.has(i.number);
    try {
      await closeIssue(i, closeReason(i, now, STALE_DAYS, isStale));
      closed++;
      process.stderr.write(`  closed #${i.number} (${isStale ? 'stale' : 'cap'})\n`);
    } catch (e) {
      process.stderr.write(`  FAILED to close #${i.number}: ${e.message}\n`);
    }
  }

  process.stderr.write(`Done. Closed ${closed}/${toClose.length}.\n`);

  if (closed > 0) {
    const remaining = plan.eligibleCount - closed;
    await postToTelegram(
      `🧹 <b>Prune Proposals</b>\n` +
      `Closed ${closed} stale/over-cap seo-proposal issue${closed === 1 ? '' : 's'}. ` +
      `~${Math.max(0, remaining)} eligible remain (cap ${BANK_CAP})` +
      `${plan.deferred ? `, ${plan.deferred} deferred to next run` : ''}.`,
    ).catch(() => {});
  }
}

if (require.main === module) {
  main().catch((e) => {
    process.stderr.write(`prune-proposals failed: ${e.message}\n`);
    process.exit(1);
  });
}

module.exports = { isEligible, selectForPrune, ageDays, BANK_CAP, STALE_DAYS };
