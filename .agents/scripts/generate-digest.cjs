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
    openAiFix, openSeoProposal, openHumanFounder, openBrokenVideo,
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
