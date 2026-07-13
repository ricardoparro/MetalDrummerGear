#!/usr/bin/env node
/**
 * Renders the JSON report from check-performance.cjs into:
 *   - Umbrella issue body (Markdown) — per-URL metrics + WoW deltas, actionable
 *     regressions called out first.
 *   - .agents/seo/perf-snapshot.md — full picture for the CEO Agent.
 *
 * Kept separate so the Lighthouse runner stays pure (input → JSON) and the
 * issue layout can evolve without touching the crawler. Mirrors
 * render-structured-data-issue.cjs.
 */

const fs = require('node:fs');
const path = require('node:path');

function argv(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 && i + 1 < process.argv.length ? process.argv[i + 1] : fallback;
}

const REPORT = argv('report', 'perf.json');
const ISSUE_OUT = argv('issue', 'issue-body.md');
const SNAPSHOT_OUT = argv('snapshot', '.agents/seo/perf-snapshot.md');

// Marker comment so the workflow (and any future tooling) can find the single
// umbrella issue by body content, not just title — same convention as
// watchdog.cjs's ISSUE_MARKER.
const ISSUE_MARKER = '<!-- performance-watch-umbrella -->';

const report = JSON.parse(fs.readFileSync(REPORT, 'utf8'));
const results = report.results || [];
const diffs = report.diffs || [];
const regressions = report.regressions || [];
const failed = report.failed || [];

const byKey = Object.fromEntries(results.map(r => [r.key, r]));
const diffByKey = Object.fromEntries(diffs.map(d => [d.key, d]));

const fmtMs = v => v == null ? '—' : `${Math.round(v)}ms`;
const fmtKb = v => v == null ? '—' : `${Math.round(v / 1024)}KB`;
const fmtCls = v => v == null ? '—' : v.toFixed(3);

function header(lines) {
  lines.push(`**Generated:** ${report.generatedAt}`);
  lines.push(`**Compared against:** ${report.prevHistoryFile || '_(first run — no prior snapshot, no deltas yet)_'}`);
  lines.push('');
  lines.push(`**${results.length}/${report.urls.length} URLs measured · ${regressions.length} regressed**`);
  if (failed.length > 0) {
    lines.push('');
    lines.push(`> ⚠️ ${failed.length} URL(s) failed to measure this run: ` +
      failed.map(f => `\`${f.key}\` (${f.error})`).join(', ') + '.');
  }
  lines.push('');
}

function metricsTable(lines) {
  lines.push('| URL | Score | FCP | LCP | TBT | CLS | Speed Index | Transfer | WoW |');
  lines.push('| --- | --- | --- | --- | --- | --- | --- | --- | --- |');
  for (const r of results) {
    const d = diffByKey[r.key];
    const wow = !d || d.firstRun ? '_first run_' : (d.regressed ? `⚠️ ${d.reasons.join('; ')}` : '✅ ok');
    lines.push(`| \`${r.key}\` [→](${r.url}) | ${r.score} | ${fmtMs(r.fcp)} | ${fmtMs(r.lcp)} | ${fmtMs(r.tbt)} | ${fmtCls(r.cls)} | ${fmtMs(r.speedIndex)} | ${fmtKb(r.totalBytes)} | ${wow} |`);
  }
  lines.push('');
}

function biggestJsSection(lines) {
  lines.push('## Two biggest JS requests per URL');
  lines.push('');
  for (const r of results) {
    const top = r.biggestJs || [];
    lines.push(`**\`${r.key}\`**`);
    if (top.length === 0) { lines.push('- _(none captured)_'); continue; }
    for (const j of top) lines.push(`- ${fmtKb(j.transferSize)} — \`${j.url}\``);
  }
  lines.push('');
}

/* ---- Umbrella issue body ---- */
const u = [];
u.push(ISSUE_MARKER);
u.push('');
u.push('> 🤖 **Auto-generated** by `.github/workflows/check-performance.yml` — refreshed biweekly (1st & 15th).');
u.push('');
header(u);
u.push('## What this is');
u.push('');
u.push('**L4 — Performance verifier.** Runs Lighthouse (mobile emulation, simulated throttling) against the LIVE production site, biweekly. This is the counterpart to the CI perf-budget gate (`perf-budget.yml`, #4410): that gate tests the **build** on PRs (prevention — bundle size, request graph); this loop measures **production** (detection — CDN/Vercel changes, AdSense/GTM drift, accumulated regressions across many small merges). A regression here is the thing users and Google actually experience.');
u.push('');
u.push('**Baseline context:** current mobile homepage is ≈ **63 performance / TBT ~2.9s**. Epic #4407 is actively driving this down — this loop is how we *see* that work land (or regress).');
u.push('');
u.push('**Regression thresholds:** flagged per URL when, vs the previous snapshot, the performance score drops **>5 points**, OR Total Blocking Time worsens **>20%**, OR total transfer bytes grow **>15%**.');
u.push('');

if (regressions.length > 0) {
  u.push(`## ⚠️ Regressions (${regressions.length})`);
  u.push('');
  for (const r of regressions) {
    u.push(`### \`${r.key}\` — ${byKey[r.key]?.url || ''}`);
    for (const reason of r.reasons) u.push(`- ${reason}`);
    u.push('');
  }
} else {
  u.push(report.firstRun
    ? '## ✅ First run — no prior snapshot to diff against yet.'
    : '## ✅ No regressions this run.');
  u.push('');
}

u.push('## All URLs — current metrics');
u.push('');
metricsTable(u);
biggestJsSection(u);

u.push('---');
u.push('');
u.push('**How to fix a regression:**');
u.push('');
u.push('- Check what shipped between the two compared snapshots (`git log` on `packages/frontend/` and `api/`) — new script tags (AdSense/GTM), an eagerly-loaded chunk, an unoptimized image.');
u.push('- `perf-budgets.json` + `scripts/check-bundle-budget.mjs` (the PR-time gate) catch bundle growth before merge; if this loop flags a regression the PR gate missed, check whether the culprit is a **runtime** change (CDN header, third-party script, Vercel config) rather than a bundle-size change.');
u.push('- Re-run `node .agents/scripts/check-performance.cjs --self-test` after touching the threshold logic to confirm the delta engine still behaves.');
u.push('');
u.push('<sub>This is the single umbrella issue for the L4 performance loop. The biweekly run refreshes this body in place; it auto-closes when 0 URLs are regressing. Please leave it open.</sub>');

fs.mkdirSync(path.dirname(ISSUE_OUT), { recursive: true });
fs.writeFileSync(ISSUE_OUT, u.join('\n'));

/* ---- Snapshot file — full picture for the CEO ---- */
const s = [];
s.push('# L4 Performance — biweekly snapshot');
s.push('');
s.push('*Auto-written by `.github/workflows/check-performance.yml`. CEO Agent: read this every run to see whether performance work (e.g. epic #4407) is moving the live-site numbers, not just the CI gate.*');
s.push('');
header(s);
s.push('## All URLs — current metrics');
s.push('');
metricsTable(s);
biggestJsSection(s);

fs.mkdirSync(path.dirname(SNAPSHOT_OUT), { recursive: true });
fs.writeFileSync(SNAPSHOT_OUT, s.join('\n'));

// Side channel for the workflow.
fs.writeFileSync('/tmp/performance-actionable-count.txt', String(regressions.length));

process.stderr.write(`[render-performance] wrote ${ISSUE_OUT} and ${SNAPSHOT_OUT} (regressions=${regressions.length})\n`);
