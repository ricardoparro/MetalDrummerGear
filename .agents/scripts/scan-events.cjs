#!/usr/bin/env node
/**
 * Event Scanner — monthly loop that looks 7–67 days ahead in the metal events
 * calendar (drummer death/birth anniversaries, iconic album release
 * anniversaries, brand foundings) and files ai-fix issues so event pages are
 * written, merged and INDEXED before each search-demand spike — generalizing
 * the Joey Jordison 5-years play (#4424), where a news-driven spike hit a page
 * that was already ranking.
 *
 * Design rules (founder-agreed):
 *   - The scanner itself is deterministic — date arithmetic over the verified
 *     calendar (.agents/events-calendar.json). No LLM here; the LLM (Roadie)
 *     only writes the page, constrained by the fact anchors embedded in the
 *     issue this scanner files.
 *   - REFRESH > CREATE for recurring events: when the calendar entry already
 *     has a pageUrl, the issue mandates the additive-only refresh protocol
 *     (URL immutable, no section removed, ≥95% of existing characters kept,
 *     title change limited to the year count). Birthday events NEVER create
 *     new pages — they only refresh the drummer page.
 *   - L1 hook: reads the newest .agents/seo/gsc-history snapshot and embeds
 *     the entity's current impressions/avg-position in the issue. Strong
 *     current rankings ⇒ the issue demands the ultra-conservative refresh.
 *   - Dedup: one issue per event per anniversary-year, via an HTML marker in
 *     the issue body. Cap per run so the queue is never flooded.
 *
 * Required env: GITHUB_TOKEN (+ REPO or GITHUB_REPOSITORY)
 * Optional env: EVENTS_LOOKAHEAD_MIN_DAYS (7), EVENTS_LOOKAHEAD_MAX_DAYS (67),
 *               EVENTS_MAX_ISSUES (8), TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
 * Flags: --self-test (pure logic, no network) · --dry-run (print, don't file)
 * Exit codes: 0 ran fine (filing 0 issues is success), 1 the scanner errored.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const CALENDAR_FILE = path.join(REPO_ROOT, '.agents/events-calendar.json');
const GSC_HIST_DIR = path.join(REPO_ROOT, '.agents/seo/gsc-history');
const REPO = process.env.REPO || process.env.GITHUB_REPOSITORY || 'ricardoparro/MetalDrummerGear';
const MIN_DAYS = parseInt(process.env.EVENTS_LOOKAHEAD_MIN_DAYS || '7', 10);
const MAX_DAYS = parseInt(process.env.EVENTS_LOOKAHEAD_MAX_DAYS || '67', 10);
const MAX_ISSUES = parseInt(process.env.EVENTS_MAX_ISSUES || '8', 10);

const MARKER = (id, year) => `<!-- metal-event:${id}:${year} -->`;

// ===========================================================================
// GitHub REST + Telegram helpers — same conventions as watchdog.cjs.
// ===========================================================================
function ghRequest(method, urlPath, payload) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN missing');
  const body = payload ? JSON.stringify(payload) : null;
  return new Promise((resolve, reject) => {
    const req = https.request({
      method,
      hostname: 'api.github.com',
      path: urlPath,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'metalforge-event-scanner/1.0',
        ...(body ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } : {}),
      },
    }, (res) => {
      let chunks = '';
      res.on('data', (c) => chunks += c);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) resolve(chunks ? JSON.parse(chunks) : null);
        else reject(new Error(`GH ${method} ${urlPath} → ${res.statusCode}: ${chunks.slice(0, 300)}`));
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

function postToTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return Promise.resolve(false);
  const body = JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML', disable_web_page_preview: true });
  return new Promise((resolve) => {
    const req = https.request({
      method: 'POST', hostname: 'api.telegram.org', path: `/bot${token}/sendMessage`,
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
    }, (res) => { res.resume(); res.on('end', () => resolve(res.statusCode >= 200 && res.statusCode < 300)); });
    req.on('error', () => resolve(false));
    req.write(body);
    req.end();
  });
}

// ===========================================================================
// PURE logic (unit-tested via --self-test, no network).
// ===========================================================================

/** Days from `now` until the event's next occurrence; also that occurrence's
 * anniversary number. Handles year wrap (Dec→Jan windows). YYYY-MM dates
 * (day undocumented) are excluded — never schedule a page on a guessed day. */
function nextOccurrence(ev, now) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ev.date);
  if (!m) return null;
  const [, y, mo, d] = m.map(Number);
  let occ = new Date(Date.UTC(now.getUTCFullYear(), mo - 1, d));
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  if (occ < today) occ = new Date(Date.UTC(now.getUTCFullYear() + 1, mo - 1, d));
  const daysUntil = Math.round((occ - today) / 86400000);
  return { daysUntil, anniversary: occ.getUTCFullYear() - y, occurrenceYear: occ.getUTCFullYear() };
}

/** Priority (lower = more important) or null when the event doesn't qualify.
 * death > round-album > album > round-brand; birthdays only for tier "top"
 * and always as refresh-only. */
function significance(ev, anniversary) {
  const round = anniversary % 10 === 0 || anniversary % 25 === 0;
  const semiRound = anniversary % 5 === 0;
  switch (ev.kind) {
    case 'death-anniversary': return 1;
    case 'album-release': return (round || semiRound) ? 2 : 3;
    case 'birth': return ev.tier === 'top' ? 4 : null;
    case 'brand-founded': return round ? 4 : null;
    default: return null;
  }
}

/** Pull the entity's current GSC standing from the newest L1 snapshot. */
function l1Standing(ev, gscDir) {
  try {
    const files = fs.readdirSync(gscDir).filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f)).sort();
    if (!files.length) return null;
    const snap = JSON.parse(fs.readFileSync(path.join(gscDir, files[files.length - 1]), 'utf8'));
    const tokens = (ev.queryTokens || []).map((t) => t.toLowerCase());
    if (!tokens.length) return null;
    let impressions = 0, clicks = 0, wPos = 0;
    for (const [q, v] of Object.entries(snap.queries || {})) {
      if (tokens.some((t) => q.toLowerCase().includes(t))) {
        impressions += v.impressions || 0;
        clicks += v.clicks || 0;
        wPos += (v.position || 0) * (v.impressions || 0);
      }
    }
    if (!impressions) return { impressions: 0, clicks: 0, avgPosition: null, snapshot: files[files.length - 1] };
    return { impressions, clicks, avgPosition: +(wPos / impressions).toFixed(1), snapshot: files[files.length - 1] };
  } catch { return null; }
}

/** Compose the ai-fix issue for one upcoming event. */
function buildIssue(ev, occ, l1) {
  const isRefresh = !!ev.pageUrl;
  const strong = l1 && l1.impressions >= 50 && l1.avgPosition !== null && l1.avgPosition <= 15;
  const dateStr = ev.date.slice(5); // MM-DD
  const title = isRefresh
    ? `event: refresh ${ev.pageUrl} — ${ev.subject} ${ev.kind === 'death-anniversary' ? `${occ.anniversary} anos` : `${occ.anniversary}º aniversário`} (${occ.occurrenceYear}-${dateStr})`
    : `event: page for ${ev.subject} — ${occ.anniversary}º aniversário de ${ev.kind === 'album-release' ? 'lançamento' : ev.kind} (${occ.occurrenceYear}-${dateStr})`;
  const lines = [];
  lines.push(MARKER(ev.id, occ.occurrenceYear));
  lines.push('');
  lines.push(`> 🤖 Filed by the **Event Scanner** (\`.agents/scripts/scan-events.cjs\`). Search demand for this entity spikes on the event date — this page must be merged and deployed with indexing lead time. Event in **${occ.daysUntil} days**.`);
  lines.push('');
  lines.push(`## Event`);
  lines.push(`- **${ev.subject}** — ${ev.kind}, ${occ.anniversary} years on ${occ.occurrenceYear}-${dateStr} (original: ${ev.date})`);
  if (ev.factAnchors && ev.factAnchors.length) {
    lines.push('');
    lines.push('## Fact anchors (BINDING — do not state dated facts beyond these)');
    for (const f of ev.factAnchors) lines.push(`- ${f}`);
  }
  if (ev.sources && ev.sources.length) {
    lines.push('');
    lines.push('Sources: ' + ev.sources.join(' · '));
  }
  lines.push('');
  if (l1) {
    lines.push(`## Current GSC standing (L1 snapshot ${l1.snapshot})`);
    lines.push(`- Entity queries: **${l1.impressions} impressions / ${l1.clicks} clicks**, avg position **${l1.avgPosition ?? 'n/a'}** → ${strong ? '**STRONG — ultra-conservative refresh only**' : 'weak/moderate — improvements allowed'}`);
    lines.push('');
  }
  if (isRefresh) {
    lines.push('## Task: REFRESH (never a new page)');
    lines.push(`Update **${ev.pageUrl}** under the additive-only protocol:`);
    lines.push('1. URL immutable. 2. Add a new dated section for this year\'s context; update year counts.');
    lines.push('3. **Remove nothing** — the diff must retain ≥95% of the existing characters.');
    lines.push('4. Title: only the year/number may change.');
    if (strong) lines.push('5. STRONG rankings detected → touch ONLY the year count + the new section. No other edits.');
  } else {
    lines.push('## Task: CREATE the event page');
    lines.push(`- Evergreen URL (no year in the slug), e.g. \`/articles/${ev.subjectSlug}-${ev.kind === 'album-release' ? 'anniversary' : 'legacy'}\` — follow the pattern of /articles/joey-jordison-legacy (#4424).`);
    lines.push('- Our angle: the verified gear cluster — link the drummer/album pages, signature sticks, cymbal setups, snares, licks where they exist.');
    lines.push('- Article + FAQPage + Breadcrumb schema; sitemap entry; llms file; reciprocal links FROM the cluster pages.');
  }
  lines.push('');
  lines.push('## After the event');
  lines.push(`Check the first L1 snapshot after ${occ.occurrenceYear}-${dateStr}: did entity impressions spike vs ${l1 ? l1.snapshot : 'the prior snapshot'}? Note the result here before closing.`);
  return { title, body: lines.join('\n') };
}

// ===========================================================================
// Self-test
// ===========================================================================
function selfTest() {
  let fails = 0;
  const eq = (got, want, msg) => { const ok = JSON.stringify(got) === JSON.stringify(want); console.log(`${ok ? 'PASS' : 'FAIL'} — ${msg}`); if (!ok) { console.log('   got:', JSON.stringify(got), 'want:', JSON.stringify(want)); fails++; } };
  const now = new Date(Date.UTC(2026, 6, 12)); // 2026-07-12
  eq(nextOccurrence({ date: '2021-07-26' }, now), { daysUntil: 14, anniversary: 5, occurrenceYear: 2026 }, 'jordison 5th in 14d');
  eq(nextOccurrence({ date: '2001-08-28' }, now), { daysUntil: 47, anniversary: 25, occurrenceYear: 2026 }, 'iowa 25th in 47d');
  eq(nextOccurrence({ date: '1986-10-07' }, now), { daysUntil: 87, anniversary: 40, occurrenceYear: 2026 }, 'reign in blood 40th in 87d');
  eq(nextOccurrence({ date: '2020-01-24' }, now).occurrenceYear, 2027, 'reinert wraps to next year');
  eq(nextOccurrence({ date: '1975-03' }, now), null, 'month-only date excluded');
  eq(significance({ kind: 'death-anniversary' }, 5), 1, 'death always P1');
  eq(significance({ kind: 'album-release' }, 25), 2, 'round album P2');
  eq(significance({ kind: 'album-release' }, 23), 3, 'non-round album P3');
  eq(significance({ kind: 'birth', tier: 'top' }, 60), 4, 'top birthday P4');
  eq(significance({ kind: 'birth' }, 60), null, 'non-top birthday skipped');
  eq(significance({ kind: 'brand-founded' }, 403), null, 'non-round brand skipped');
  eq(significance({ kind: 'brand-founded' }, 400), 4, 'round brand P4');
  const iss = buildIssue(
    { id: 'x', subject: 'Joey Jordison', subjectSlug: 'joey-jordison', kind: 'death-anniversary', date: '2021-07-26', pageUrl: '/articles/joey-jordison-legacy', factAnchors: ['a'], queryTokens: ['jordison'] },
    { daysUntil: 14, anniversary: 5, occurrenceYear: 2026 },
    { impressions: 191, clicks: 2, avgPosition: 7.4, snapshot: '2026-07-06.json' }
  );
  eq(iss.body.includes(MARKER('x', 2026)), true, 'dedup marker embedded');
  eq(iss.body.includes('STRONG'), true, 'strong-rankings guard triggers at 191 impr/pos 7.4');
  eq(iss.body.includes('REFRESH'), true, 'pageUrl ⇒ refresh mode');
  console.log(fails === 0 ? 'ALL PASS' : `${fails} FAILED`);
  process.exit(fails === 0 ? 0 : 1);
}

// ===========================================================================
// Main
// ===========================================================================
async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const cal = JSON.parse(fs.readFileSync(CALENDAR_FILE, 'utf8'));
  const now = new Date();
  const upcoming = [];
  for (const ev of cal.events || []) {
    const occ = nextOccurrence(ev, now);
    if (!occ || occ.daysUntil < MIN_DAYS || occ.daysUntil > MAX_DAYS) continue;
    const prio = significance(ev, occ.anniversary);
    if (prio === null) continue;
    upcoming.push({ ev, occ, prio });
  }
  upcoming.sort((a, b) => a.prio - b.prio || a.occ.daysUntil - b.occ.daysUntil);
  console.log(`[scan-events] window ${MIN_DAYS}–${MAX_DAYS}d: ${upcoming.length} qualifying event(s)`);
  let filed = 0;
  const filedTitles = [];
  for (const { ev, occ } of upcoming) {
    if (filed >= MAX_ISSUES) { console.log(`[scan-events] cap ${MAX_ISSUES} reached — remaining events wait for next run`); break; }
    const marker = MARKER(ev.id, occ.occurrenceYear);
    const search = await ghRequest('GET', `/search/issues?q=${encodeURIComponent(`repo:${REPO} in:body "${marker}"`)}`).catch(() => null);
    if (search && search.total_count > 0) { console.log(`[scan-events] skip ${ev.id}:${occ.occurrenceYear} — already filed`); continue; }
    const l1 = l1Standing(ev, GSC_HIST_DIR);
    const issue = buildIssue(ev, occ, l1);
    if (dryRun) {
      console.log(`\n--- DRY RUN would file: ${issue.title}\n${issue.body.slice(0, 400)}…`);
    } else {
      const created = await ghRequest('POST', `/repos/${REPO}/issues`, { title: issue.title, body: issue.body, labels: ['ai-fix', 'seo', 'event-content'] });
      console.log(`[scan-events] filed #${created.number}: ${issue.title}`);
    }
    filedTitles.push(issue.title);
    filed++;
  }
  if (filed > 0 && !dryRun) {
    await postToTelegram(`📅 <b>Event Scanner</b>: ${filed} evento(s) na janela de ${MAX_DAYS} dias → issues criados\n• ` + filedTitles.map((t) => t.slice(0, 80)).join('\n• '));
  }
  console.log(`[scan-events] done — ${filed} issue(s) ${dryRun ? '(dry-run)' : 'filed'}`);
}

module.exports = { nextOccurrence, significance, l1Standing, MARKER };

if (require.main === module) {
  if (process.argv.includes('--self-test')) selfTest();
  else main().catch((e) => { console.error(`FATAL: ${e.stack || e.message}`); process.exit(1); });
}
