#!/usr/bin/env node
/**
 * Generates DIGEST.md — a snapshot of agent activity + business metrics
 * covering the last ~12h. Runs at 08:00 and 19:00 UTC.
 *
 * Reads:
 *   - GitHub REST API (issues, PRs, commits, workflow runs)
 *   - .agents/ceo/metrics.md (GA4 + GSC, populated by fetch-metrics.cjs)
 *   - .agents/ceo/decisions-log.md (recent decisions)
 *
 * Writes:
 *   - DIGEST.md at repo root (committed to the `digest` branch, not main)
 *   - .agents/digest/history/YYYY-MM-DD-HH.md (timestamped archive)
 *
 * Pushes:
 *   - Short version to Telegram if TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID set.
 *
 * Required env:
 *   GITHUB_TOKEN, GITHUB_REPOSITORY (auto in Actions)
 * Optional env:
 *   DIGEST_BRANCH (default 'digest') — used only for the Telegram link.
 *   TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const METRICS_FILE = path.join(REPO_ROOT, '.agents/ceo/metrics.md');
const DECISIONS_LOG = path.join(REPO_ROOT, '.agents/ceo/decisions-log.md');
const DIGEST_FILE = path.join(REPO_ROOT, 'DIGEST.md');
const HISTORY_DIR = path.join(REPO_ROOT, '.agents/digest/history');
const GSC_HIST_DIR = path.join(REPO_ROOT, '.agents/seo/gsc-history');       // L1 verifier snapshots
const IDX_HIST_DIR = path.join(REPO_ROOT, '.agents/seo/indexation-history'); // L3 verifier snapshots
const PERF_HIST_DIR = path.join(REPO_ROOT, '.agents/seo/perf-history');     // L4 verifier snapshots

const WINDOW_HOURS = 12;
const WINDOW_MS = WINDOW_HOURS * 3600 * 1000;
const now = new Date();
const since = new Date(now.getTime() - WINDOW_MS);
const sinceIso = since.toISOString();

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
        'User-Agent': 'metalforge-digest/1.0',
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

async function ghPaginated(urlPath, max = 200) {
  const out = [];
  let page = 1;
  while (out.length < max) {
    const sep = urlPath.includes('?') ? '&' : '?';
    const data = await ghRequest('GET', `${urlPath}${sep}per_page=100&page=${page}`);
    if (!Array.isArray(data) || data.length === 0) break;
    out.push(...data);
    if (data.length < 100) break;
    page++;
  }
  return out.slice(0, max);
}

function withinWindow(iso) {
  return iso && new Date(iso).getTime() >= since.getTime();
}

async function collectGitHubData() {
  const repo = process.env.GITHUB_REPOSITORY || 'ricardoparro/MetalDrummerGear';

  const openAiFix = await ghPaginated(`/repos/${repo}/issues?state=open&labels=ai-fix`);
  const openSeoProposal = await ghPaginated(`/repos/${repo}/issues?state=open&labels=seo-proposal`);
  const openHumanFounder = await ghPaginated(`/repos/${repo}/issues?state=open&labels=human-founder`);
  const openBrokenVideo = await ghPaginated(`/repos/${repo}/issues?state=open&labels=broken-video`);
  const openEventContent = await ghPaginated(`/repos/${repo}/issues?state=open&labels=event-content`);

  const closedRecently = await ghPaginated(`/repos/${repo}/issues?state=closed&since=${sinceIso}`);
  const closedIssues = closedRecently.filter(i => !i.pull_request && withinWindow(i.closed_at));

  const allOpenPRs = (await ghPaginated(`/repos/${repo}/pulls?state=open&sort=created&direction=desc`));
  const openPRs = allOpenPRs.filter(p => p.state === 'open');
  const recentlyClosedPRs = (await ghPaginated(`/repos/${repo}/pulls?state=closed&sort=updated&direction=desc`, 100))
    .filter(p => p.merged_at && withinWindow(p.merged_at));

  const commits = await ghPaginated(`/repos/${repo}/commits?sha=main&since=${sinceIso}`, 100);

  const workflowRuns = await ghRequest('GET', `/repos/${repo}/actions/runs?created=>=${sinceIso.split('T')[0]}&per_page=100`);
  const runsInWindow = (workflowRuns?.workflow_runs || []).filter(r => withinWindow(r.created_at));

  return {
    openAiFix, openSeoProposal, openHumanFounder, openBrokenVideo, openEventContent,
    closedIssues, openPRs, recentlyClosedPRs, commits, runsInWindow,
  };
}

function parseMetricsMd() {
  if (!fs.existsSync(METRICS_FILE)) return { available: false };
  const text = fs.readFileSync(METRICS_FILE, 'utf8');
  const ga4Available = !text.includes('GA4 data unavailable');
  const gscAvailable = !text.includes('GSC data unavailable');
  const grab = (label) => {
    const re = new RegExp(`\\|\\s*${label}\\s*\\|\\s*([0-9.,%]+s?)\\s*\\|`);
    const m = text.match(re);
    return m ? m[1] : null;
  };
  return {
    available: true,
    ga4Available,
    gscAvailable,
    activeUsers: grab('Active users'),
    sessions: grab('Sessions'),
    pageViews: grab('Page views'),
    engagementRate: grab('Engagement rate'),
    impressions: grab('Impressions'),
    clicks: grab('Clicks'),
    ctr: grab('CTR'),
    position: grab('Avg position'),
  };
}

// Parse "276" / "1,234" / "2.4%" → number (or null).
function parseNum(s) {
  if (s == null) return null;
  const n = parseFloat(String(s).replace(/[,%\s]/g, ''));
  return Number.isFinite(n) ? n : null;
}

// Revenue trajectory ESTIMATE. metrics.md is a 7-day window, so project ×30/7.
// AdSense revenue is modeled as pageviews × RPM until the AdSense Management API
// is connected (real revenue needs that credential). Tunables via env:
//   DIGEST_AD_RPM_EUR         €/1000 pageviews (default 3 — niche display range)
//   DIGEST_REVENUE_TARGET_EUR monthly goal to track toward (default 1000)
function estimateRevenue(metrics) {
  const rpm = parseFloat(process.env.DIGEST_AD_RPM_EUR || '3');
  const target = parseFloat(process.env.DIGEST_REVENUE_TARGET_EUR || '1000');
  const pv7 = parseNum(metrics && metrics.pageViews);
  if (!pv7 || pv7 <= 0) return { available: false, rpm, target };
  const monthlyPv = Math.round((pv7 * 30) / 7);
  const adMo = (monthlyPv * rpm) / 1000;
  const pctToTarget = target > 0 ? (adMo / target) * 100 : 0;
  const pvNeeded = rpm > 0 ? Math.round((target / rpm) * 1000) : null;
  const multiple = pvNeeded && monthlyPv ? pvNeeded / monthlyPv : null;
  return { available: true, rpm, target, monthlyPv, adMo, pctToTarget, pvNeeded, multiple };
}

// ---------------------------------------------------------------------------
// Improvement loops (L1/L2/L3/L4 verifiers) — surface whether the loops are
// moving real KPIs, over time, so "is it working?" is answerable at a glance.
//   L1 organic  ← .agents/seo/gsc-history/<date>.json      (committed weekly)
//   L2 AI cites ← the `llm-citations` umbrella issue body   (already fetched)
//   L3 index    ← .agents/seo/indexation-history/<date>.json (committed weekly)
//   L4 perf     ← .agents/seo/perf-history/<date>.json      (committed biweekly)
// ---------------------------------------------------------------------------
function twoNewestSnapshots(dir) {
  try {
    const files = fs.readdirSync(dir).filter(f => /^\d{4}-\d{2}-\d{2}\.json$/.test(f)).sort();
    return files.slice(-2).map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')));
  } catch { return []; }
}
function summariseGsc(snap) {
  if (!snap || !snap.queries) return null;
  const qs = Object.values(snap.queries);
  const impressions = qs.reduce((a, q) => a + (q.impressions || 0), 0);
  const clicks = qs.reduce((a, q) => a + (q.clicks || 0), 0);
  const avgPos = impressions ? qs.reduce((a, q) => a + (q.position || 0) * (q.impressions || 0), 0) / impressions : 0;
  return { queries: qs.length, impressions, clicks, ctr: impressions ? clicks / impressions : 0, avgPos };
}
function summariseIdx(snap) {
  if (!snap || !snap.byUrl) return null;
  const vals = Object.values(snap.byUrl);
  const c = (k) => vals.filter(v => v.class === k).length;
  // Post-rotation snapshots tag each URL sentinel/rotating; the sentinel subset
  // is the only WoW-comparable trend. Pre-rotation snapshots have no groups.
  const sent = vals.filter(v => v.group === 'sentinel');
  return {
    inspected: vals.length, sitemap: snap.sitemapUrlCount,
    indexed: c('indexed'), crawledNot: c('crawled-not-indexed'), discoveredNot: c('discovered-not-indexed'), unknown: c('unknown'),
    sentInspected: sent.length || null,
    sentIndexed: sent.length ? sent.filter(v => v.class === 'indexed').length : null,
    earning: snap.earningPages ? snap.earningPages.inSitemap : null,
    earningWindow: snap.earningPages ? snap.earningPages.windowDays : null,
  };
}
function summarisePerf(snap) {
  if (!snap || !snap.byUrl) return null;
  // Homepage key must match HOMEPAGE_URL in check-performance.cjs.
  const home = snap.byUrl['https://metalforge.io/'];
  if (!home) return null;
  return { urls: Object.keys(snap.byUrl).length, homepageScore: home.performanceScore, homepageTbt: home.tbt };
}
function l2FromIssues(gh) {
  const u = (gh.openSeoProposal || []).find(i => (i.labels || []).some(l => (l.name || l) === 'llm-citations'));
  if (!u || !u.body) return null;
  const m = u.body.match(/(\d+)\s*total\s*—\s*✅\s*\*\*(\d+)\*\*\s*cite us\s*\|\s*❌\s*\*\*(\d+)\*\*/);
  if (!m) return null;
  return { total: +m[1], cited: +m[2], notCited: +m[3], issue: u.number };
}
// Collect all three loops (each: current + previous where available).
function improvementLoops(gh) {
  const g = twoNewestSnapshots(GSC_HIST_DIR).map(summariseGsc);
  const i = twoNewestSnapshots(IDX_HIST_DIR).map(summariseIdx);
  const f = twoNewestSnapshots(PERF_HIST_DIR).map(summarisePerf);
  return {
    l1: g.length ? g[g.length - 1] : null,
    l1prev: g.length > 1 ? g[0] : null,
    l3: i.length ? i[i.length - 1] : null,
    l3prev: i.length > 1 ? i[0] : null,
    l2: l2FromIssues(gh),
    l4: f.length ? f[f.length - 1] : null,
    l4prev: f.length > 1 ? f[0] : null,
  };
}
// "(+3)" / "(−2)" / "(±0)" — raw delta; caller notes direction meaning.
function dlt(cur, prev, digits = 0) {
  if (prev == null || cur == null) return '';
  const d = cur - prev;
  if (Math.abs(d) < (digits ? 0.05 : 0.5)) return ' (±0)';
  return ` (${d > 0 ? '+' : '−'}${Math.abs(d).toFixed(digits)})`;
}
const pctStr = (x) => `${(x * 100).toFixed(1)}%`;

// ---------------------------------------------------------------------------
// Event pipeline — upcoming entries from the verified events calendar, with
// filed-issue status (Event Scanner, scan-events.cjs). Deterministic reuse of
// the scanner's own date/significance logic so digest and scanner never drift.
// ---------------------------------------------------------------------------
const EVENTS_CAL = path.join(REPO_ROOT, '.agents/events-calendar.json');
function upcomingEvents(gh, horizonDays = 67) {
  let scanner, cal;
  try {
    scanner = require('./scan-events.cjs');
    cal = JSON.parse(fs.readFileSync(EVENTS_CAL, 'utf8'));
  } catch { return []; }
  const out = [];
  for (const ev of cal.events || []) {
    const occ = scanner.nextOccurrence(ev, now);
    if (!occ || occ.daysUntil > horizonDays) continue;
    if (scanner.significance(ev, occ.anniversary) === null) continue;
    const marker = scanner.MARKER(ev.id, occ.occurrenceYear);
    const issue = (gh.openEventContent || []).find((i) => (i.body || '').includes(marker));
    out.push({ subject: ev.subject, kind: ev.kind, anniversary: occ.anniversary, daysUntil: occ.daysUntil, issue: issue ? issue.number : null });
  }
  return out.sort((a, b) => a.daysUntil - b.daysUntil);
}

function extractDecisionsSince() {
  if (!fs.existsSync(DECISIONS_LOG)) return [];
  const text = fs.readFileSync(DECISIONS_LOG, 'utf8');
  const today = now.toISOString().split('T')[0];
  const yest = new Date(now.getTime() - 24 * 3600 * 1000).toISOString().split('T')[0];
  const lines = text.split('\n');
  const headings = [];
  for (let i = 0; i < lines.length; i++) {
    if (/^## /.test(lines[i]) && (lines[i].includes(today) || lines[i].includes(yest))) {
      headings.push(lines[i].replace(/^##\s*/, '').slice(0, 120));
    }
  }
  return headings.slice(0, 6);
}

function classifyAgentRuns(runs) {
  const byWorkflow = {};
  for (const r of runs) {
    const key = r.name || r.workflow_id;
    if (!byWorkflow[key]) byWorkflow[key] = { total: 0, success: 0, failure: 0 };
    byWorkflow[key].total++;
    if (r.conclusion === 'success') byWorkflow[key].success++;
    else if (r.conclusion === 'failure' || r.conclusion === 'cancelled' || r.conclusion === 'timed_out') byWorkflow[key].failure++;
  }
  return byWorkflow;
}

function buildMarkdown(gh, metrics, decisions) {
  const stamp = now.toISOString().replace('T', ' ').slice(0, 16) + ' UTC';
  const ageHours = (iso) => Math.floor((now - new Date(iso)) / 3600000);

  const lines = [];
  lines.push(`# MetalForge — Digest`);
  lines.push('');
  lines.push(`*Generated ${stamp} · Window: last ${WINDOW_HOURS}h*`);
  lines.push('');
  lines.push('---');
  lines.push('');

  lines.push(`## 🚦 Pipeline health (last ${WINDOW_HOURS}h)`);
  lines.push('');
  lines.push('| Metric | Value |');
  lines.push('| --- | --- |');
  lines.push(`| Open \`ai-fix\` issues | **${gh.openAiFix.length}** |`);
  lines.push(`| Open \`seo-proposal\` issues | ${gh.openSeoProposal.length} |`);
  lines.push(`| Open \`human-founder\` issues | ${gh.openHumanFounder.length} |`);
  lines.push(`| Open \`broken-video\` issues | ${gh.openBrokenVideo.length} |`);
  lines.push(`| Open PRs | ${gh.openPRs.length} |`);
  lines.push(`| PRs merged in window | **${gh.recentlyClosedPRs.length}** |`);
  lines.push(`| Issues closed in window | ${gh.closedIssues.length} |`);
  lines.push(`| Commits to \`main\` in window | ${gh.commits.length} |`);
  lines.push('');

  lines.push(`## 📈 Business metrics`);
  lines.push('');
  if (!metrics.available) {
    lines.push(`_metrics.md not present — agents haven't run fetch-metrics yet._`);
  } else {
    lines.push(`| Metric | Last 7d |`);
    lines.push(`| --- | --- |`);
    if (metrics.ga4Available) {
      lines.push(`| Active users | **${metrics.activeUsers || '?'}** |`);
      lines.push(`| Sessions | ${metrics.sessions || '?'} |`);
      lines.push(`| Page views | ${metrics.pageViews || '?'} |`);
      lines.push(`| Engagement rate | ${metrics.engagementRate || '?'} |`);
    } else {
      lines.push(`| GA4 | _unavailable_ |`);
    }
    if (metrics.gscAvailable) {
      lines.push(`| GSC impressions | ${metrics.impressions || '?'} |`);
      lines.push(`| GSC clicks | ${metrics.clicks || '?'} |`);
      lines.push(`| GSC CTR | ${metrics.ctr || '?'} |`);
      lines.push(`| GSC avg position | ${metrics.position || '?'} |`);
    } else {
      lines.push(`| GSC | _unavailable_ |`);
    }
  }
  lines.push('');

  // Revenue trajectory (estimate) — watch the real curve toward the monthly goal.
  const rev = estimateRevenue(metrics);
  lines.push(`## 💰 Revenue trajectory (estimate)`);
  lines.push('');
  if (!rev.available) {
    lines.push('_No pageview data yet — needs GA4 metrics._');
  } else {
    lines.push(`> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €${rev.rpm}/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.`);
    lines.push('');
    lines.push('| Metric | Value |');
    lines.push('| --- | --- |');
    lines.push(`| Est. pageviews / mo | ~${rev.monthlyPv.toLocaleString('en-US')} |`);
    lines.push(`| Est. ad revenue / mo | **~€${rev.adMo.toFixed(2)}** |`);
    lines.push(`| Progress to €${rev.target}/mo | ${rev.pctToTarget.toFixed(1)}% |`);
    lines.push(`| Pageviews/mo needed for €${rev.target} | ~${rev.pvNeeded.toLocaleString('en-US')} (${rev.multiple.toFixed(0)}× current) |`);
  }
  lines.push('');

  // Improvement loops — is the machine actually moving KPIs?
  const loops = improvementLoops(gh);
  lines.push(`## 🔬 Improvement loops — are the KPIs moving?`);
  lines.push('');
  if (!loops.l1 && !loops.l2 && !loops.l3 && !loops.l4) {
    lines.push('_No verifier snapshots yet (L1/L2/L3 run weekly, L4 runs biweekly)._');
  } else {
    lines.push('| Loop | Now | Trend |');
    lines.push('| --- | --- | --- |');
    if (loops.l1) {
      const p = loops.l1prev;
      lines.push(`| **L1 organic** (GSC, ${loops.l1.queries} tracked queries) | ${loops.l1.clicks} clicks · ${loops.l1.impressions} impr · CTR ${pctStr(loops.l1.ctr)} · avg pos ${loops.l1.avgPos.toFixed(1)} | clicks${dlt(loops.l1.clicks, p && p.clicks)} · impr${dlt(loops.l1.impressions, p && p.impressions)} · pos${dlt(loops.l1.avgPos, p && p.avgPos, 1)} _(pos ↓ = better)_ |`);
    }
    if (loops.l2) {
      lines.push(`| **L2 AI citations** (#${loops.l2.issue}) | **${loops.l2.cited}/${loops.l2.total}** queries cite metalforge.io | _refreshed weekly_ |`);
    }
    if (loops.l3) {
      const p = loops.l3prev;
      const pct = loops.l3.inspected ? Math.round((loops.l3.indexed / loops.l3.inspected) * 100) : '?';
      if (loops.l3.sentInspected) {
        const full = loops.l3.earning != null ? ` · **full site: ${loops.l3.earning} of ${loops.l3.sitemap} sitemap URLs earned impressions (${loops.l3.earningWindow}d)**` : '';
        lines.push(`| **L3 indexation** | sentinels (fixed top-${loops.l3.sentInspected}, trend-comparable): ${loops.l3.sentIndexed}/${loops.l3.sentInspected} indexed${dlt(loops.l3.sentIndexed, p && p.sentIndexed)} · rotating sample: ${loops.l3.indexed - loops.l3.sentIndexed}/${loops.l3.inspected - loops.l3.sentInspected} indexed${full} | ${loops.l3.crawledNot} rejected-quality · ${loops.l3.discoveredNot} never-crawled |`);
      } else {
        lines.push(`| **L3 indexation** (top-${loops.l3.inspected} priority URLs — a sample, NOT the whole ${loops.l3.sitemap}-URL sitemap) | ${loops.l3.indexed} of ${loops.l3.inspected} indexed (${pct}%) · ${loops.l3.crawledNot} rejected-quality · ${loops.l3.discoveredNot} never-crawled | indexed${dlt(loops.l3.indexed, p && p.indexed)} |`);
      }
    }
    if (loops.l4) {
      const p = loops.l4prev;
      lines.push(`| **L4 performance** (${loops.l4.urls} URLs, live site) | homepage ${loops.l4.homepageScore ?? '?'} perf · TBT ${loops.l4.homepageTbt != null ? Math.round(loops.l4.homepageTbt) : '?'}ms | score${dlt(loops.l4.homepageScore, p && p.homepageScore)} · TBT${dlt(loops.l4.homepageTbt, p && p.homepageTbt)}ms _(both ↓ = better)_ |`);
    }
    lines.push('');
    lines.push('> _L1/L3 are week-over-week and L4 is fortnight-over-fortnight, all from committed verifier snapshots; L2 is the weekly citation umbrella. Rising clicks / falling avg position / more indexed / higher perf score = the loops are working._');
  }
  lines.push('');

  // Event pipeline — content ahead of predictable demand spikes.
  const events = upcomingEvents(gh);
  if (events.length) {
    lines.push(`## 📅 Event pipeline (next 67 days)`);
    lines.push('');
    lines.push('| Event | In | Page work |');
    lines.push('| --- | --- | --- |');
    for (const e of events) {
      const kind = e.kind === 'death-anniversary' ? 'anos' : 'º aniversário';
      lines.push(`| ${e.subject} — ${e.anniversary}${kind === 'anos' ? ' anos' : kind} | ${e.daysUntil}d | ${e.issue ? `#${e.issue} filed` : '_awaiting scanner run_'} |`);
    }
    lines.push('');
  }

  const byWorkflow = classifyAgentRuns(gh.runsInWindow);
  if (Object.keys(byWorkflow).length > 0) {
    lines.push(`## 🤖 Agent / workflow runs (last ${WINDOW_HOURS}h)`);
    lines.push('');
    lines.push('| Workflow | Total | ✅ | ❌ |');
    lines.push('| --- | --- | --- | --- |');
    for (const [name, s] of Object.entries(byWorkflow).sort((a, b) => b[1].total - a[1].total)) {
      lines.push(`| ${name} | ${s.total} | ${s.success} | ${s.failure} |`);
    }
    lines.push('');
  }

  if (decisions.length > 0) {
    lines.push(`## 🧠 Today's CEO decisions`);
    lines.push('');
    for (const d of decisions) lines.push(`- ${d}`);
    lines.push('');
  }

  if (gh.recentlyClosedPRs.length > 0) {
    lines.push(`## 📦 Shipped to main (${gh.recentlyClosedPRs.length})`);
    lines.push('');
    for (const pr of gh.recentlyClosedPRs.slice(0, 15)) {
      lines.push(`- #${pr.number} ${pr.title}`);
    }
    if (gh.recentlyClosedPRs.length > 15) lines.push(`- _+${gh.recentlyClosedPRs.length - 15} more_`);
    lines.push('');
  }

  const oldPRs = gh.openPRs.filter(p => ageHours(p.created_at) >= 24);
  const oldHuman = gh.openHumanFounder.filter(i => ageHours(i.created_at) >= 24);
  if (oldPRs.length > 0 || oldHuman.length > 0) {
    lines.push(`## 🔴 Needs attention`);
    lines.push('');
    for (const pr of oldPRs.slice(0, 5)) {
      lines.push(`- PR #${pr.number} — ${pr.title} _(open ${ageHours(pr.created_at)}h)_`);
    }
    for (const i of oldHuman.slice(0, 5)) {
      lines.push(`- 🧑 Issue #${i.number} — ${i.title} _(open ${ageHours(i.created_at)}h)_`);
    }
    lines.push('');
  }

  lines.push('---');
  lines.push('');
  lines.push(`_Next refresh: ${now.getUTCHours() < 8 || now.getUTCHours() >= 19 ? '08:00 UTC' : '19:00 UTC'}_`);
  lines.push(`_Source: \`.agents/scripts/generate-digest.cjs\` · History: \`.agents/digest/history/\`_`);
  lines.push('');
  return lines.join('\n');
}

function buildTelegramText(gh, metrics, fullUrl) {
  const ageHours = (iso) => Math.floor((now - new Date(iso)) / 3600000);
  const esc = (s) => String(s).replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));
  const lines = [];
  lines.push(`🤘 <b>MetalForge Digest</b>`);
  lines.push(`<i>${now.toISOString().slice(0, 16).replace('T', ' ')} UTC · last ${WINDOW_HOURS}h</i>`);
  lines.push('');
  lines.push(`<b>📊 Pipeline</b>`);
  lines.push(`• ai-fix open: <b>${gh.openAiFix.length}</b>`);
  lines.push(`• PRs open: ${gh.openPRs.length} · merged ${WINDOW_HOURS}h: <b>${gh.recentlyClosedPRs.length}</b>`);
  lines.push(`• Issues closed: ${gh.closedIssues.length}`);
  lines.push('');

  if (metrics.available && metrics.ga4Available) {
    lines.push(`<b>📈 GA4 7d</b>`);
    lines.push(`• Users: <b>${metrics.activeUsers || '?'}</b> · Sessions: ${metrics.sessions || '?'}`);
    if (metrics.gscAvailable) {
      lines.push(`• GSC impr: ${metrics.impressions || '?'} · CTR: ${metrics.ctr || '?'} · Pos: ${metrics.position || '?'}`);
    }
    lines.push('');
  }

  const rev = estimateRevenue(metrics);
  if (rev.available) {
    lines.push(`<b>💰 Rev (est, not real)</b>`);
    lines.push(`• ~€${rev.adMo.toFixed(0)}/mo ads @ €${rev.rpm}/1k · ${rev.pctToTarget.toFixed(1)}% to €${rev.target} (${rev.multiple.toFixed(0)}× pv)`);
    lines.push('');
  }

  const events = upcomingEvents(gh);
  if (events.length) {
    lines.push(`<b>📅 Eventos</b>`);
    for (const e of events.slice(0, 3)) {
      lines.push(`• ${esc(e.subject)} — ${e.anniversary} anos em ${e.daysUntil}d ${e.issue ? `(#${e.issue})` : '(por criar)'}`);
    }
    lines.push('');
  }

  const loops = improvementLoops(gh);
  if (loops.l1 || loops.l2 || loops.l3 || loops.l4) {
    lines.push(`<b>🔬 Loops (KPI trend)</b>`);
    if (loops.l1) lines.push(`• L1 Google: ${loops.l1.clicks} cliques/sem${dlt(loops.l1.clicks, loops.l1prev && loops.l1prev.clicks)} · posição média ${loops.l1.avgPos.toFixed(1)}${dlt(loops.l1.avgPos, loops.l1prev && loops.l1prev.avgPos, 1)} (menor = melhor)`);
    if (loops.l2) lines.push(`• L2 IA: ${loops.l2.cited} de ${loops.l2.total} perguntas citam o site (só Perplexity)`);
    if (loops.l3) {
      if (loops.l3.sentInspected) {
        const full = loops.l3.earning != null ? ` · site inteiro: ${loops.l3.earning} de ${loops.l3.sitemap} URLs visíveis no Google (${loops.l3.earningWindow}d)` : '';
        lines.push(`• L3 indexação: ${loops.l3.sentIndexed}/${loops.l3.sentInspected} páginas-sentinela${dlt(loops.l3.sentIndexed, loops.l3prev && loops.l3prev.sentIndexed)}${full}`);
      } else {
        lines.push(`• L3 indexação: ${loops.l3.indexed}/${loops.l3.inspected} das páginas prioritárias${dlt(loops.l3.indexed, loops.l3prev && loops.l3prev.indexed)} — amostra top-${loops.l3.inspected}, sitemap tem ${loops.l3.sitemap} URLs`);
      }
    }
    if (loops.l4) lines.push(`• L4: perf ${loops.l4.homepageScore ?? '?'}${dlt(loops.l4.homepageScore, loops.l4prev && loops.l4prev.homepageScore)} · TBT ${loops.l4.homepageTbt != null ? Math.round(loops.l4.homepageTbt) : '?'}ms`);
    lines.push('');
  }

  if (gh.recentlyClosedPRs.length > 0) {
    lines.push(`<b>📦 Shipped (${gh.recentlyClosedPRs.length})</b>`);
    for (const pr of gh.recentlyClosedPRs.slice(0, 6)) {
      lines.push(`• #${pr.number} ${esc(pr.title).slice(0, 80)}`);
    }
    if (gh.recentlyClosedPRs.length > 6) lines.push(`• <i>+${gh.recentlyClosedPRs.length - 6} more</i>`);
    lines.push('');
  }

  const oldPRs = gh.openPRs.filter(p => ageHours(p.created_at) >= 24);
  if (oldPRs.length > 0) {
    lines.push(`<b>🔴 Old PRs (>24h)</b>`);
    for (const pr of oldPRs.slice(0, 3)) {
      lines.push(`• #${pr.number} ${esc(pr.title).slice(0, 60)} (${ageHours(pr.created_at)}h)`);
    }
    lines.push('');
  }

  lines.push(`<a href="${fullUrl}">Full digest →</a>`);
  return lines.join('\n');
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

(async () => {
  process.stderr.write(`Generating digest for window ${sinceIso} → ${now.toISOString()}\n`);

  const gh = await collectGitHubData();
  process.stderr.write(`  GitHub: ${gh.openAiFix.length} ai-fix open · ${gh.openPRs.length} PRs open · ${gh.recentlyClosedPRs.length} PRs merged · ${gh.commits.length} commits\n`);

  const metrics = parseMetricsMd();
  process.stderr.write(`  Metrics: GA4=${metrics.ga4Available} GSC=${metrics.gscAvailable}\n`);

  const decisions = extractDecisionsSince();
  process.stderr.write(`  Decisions today: ${decisions.length}\n`);

  const markdown = buildMarkdown(gh, metrics, decisions);
  fs.writeFileSync(DIGEST_FILE, markdown);

  fs.mkdirSync(HISTORY_DIR, { recursive: true });
  const stamp = now.toISOString().slice(0, 13).replace('T', '-');
  fs.writeFileSync(path.join(HISTORY_DIR, `${stamp}.md`), markdown);

  process.stderr.write(`Wrote ${DIGEST_FILE} (${markdown.length} chars)\n`);

  const repo = process.env.GITHUB_REPOSITORY || 'ricardoparro/MetalDrummerGear';
  const branch = process.env.DIGEST_BRANCH || 'digest';
  const fullUrl = `https://github.com/${repo}/blob/${branch}/DIGEST.md`;
  const telegramText = buildTelegramText(gh, metrics, fullUrl);
  await postToTelegram(telegramText);

  process.exit(0);
})().catch(e => {
  process.stderr.write(`FATAL: ${e.message}\n${e.stack}\n`);
  process.exit(1);
});
