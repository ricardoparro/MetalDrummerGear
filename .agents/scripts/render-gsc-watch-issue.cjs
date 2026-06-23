#!/usr/bin/env node
/**
 * Renders the JSON report from check-gsc-watched-queries.cjs into:
 *   - The umbrella issue body (Markdown)
 *   - The CEO-facing snapshot file (.agents/seo/gsc-watch-snapshot.md)
 *
 * Both files share the same data; the snapshot is committed every run so the
 * CEO Agent reads fresh numbers, the issue body is what GitHub displays.
 */

const fs = require('node:fs');
const path = require('node:path');

function argv(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 && i + 1 < process.argv.length ? process.argv[i + 1] : fallback;
}

const REPORT = argv('report', 'gsc-watch.json');
const ISSUE_OUT = argv('issue', 'issue-body.md');
const SNAPSHOT_OUT = argv('snapshot', '.agents/seo/gsc-watch-snapshot.md');

const report = JSON.parse(fs.readFileSync(REPORT, 'utf8'));
const results = report.results || [];

const wins = results.filter(r => r.verdict?.class === 'win');
const losses = results.filter(r => r.verdict?.class === 'loss');
const mixed = results.filter(r => r.verdict?.class === 'mixed');
const nulls = results.filter(r => r.verdict?.class === 'null');
const noData = results.filter(r => r.verdict?.class === 'no-data');
const baselining = results.filter(r => r.verdict?.class === 'baselining');
const errors = results.filter(r => r.verdict?.class === 'error');

const fmtPos = v => (v == null ? '—' : v.toFixed ? v.toFixed(1) : String(v));
const fmtCtr = v => (v == null ? '—' : `${(v * 100).toFixed(2)}%`);

function rowForTable(r) {
  const b = `b: pos ${fmtPos(r.baseline_position)} • impr ${r.baseline_impressions ?? '—'} • cl ${r.baseline_clicks ?? '—'}`;
  const c = `c: pos ${fmtPos(r.current?.position)} • impr ${r.current?.impressions ?? '—'} • cl ${r.current?.clicks ?? '—'}`;
  return `| \`${r.q.replace(/\|/g, '\\|')}\` | ${r.target_entity || ''} | ${b} | ${c} | ${r.verdict?.reason || ''} |`;
}

const lines = [];
lines.push(`> 🤖 **Auto-generated** by \`.github/workflows/check-gsc-watched-queries.yml\` — refreshed weekly.`);
lines.push('');
lines.push(`**Generated:** ${report.generatedAt}`);
lines.push(`**Site:** ${report.site || '—'} · **Window:** last ${report.lookbackDays} days`);
lines.push(`**Watches:** ${report.watchesTotal} total`);
lines.push('');
lines.push(`**Counts:** ` + (Object.entries(report.counts || {}).map(([k, v]) => `${k}=${v}`).join(' · ') || '(none)'));
lines.push('');
lines.push('## What this is');
lines.push('');
lines.push('The **L1 loop** — closes the loop on the SEO Agent / Ralph pipeline. Each watched query has a baseline captured when it was added; this run compares the last 7 days to that baseline and classifies the delta. Patterns that consistently **win** get re-enforced; patterns that consistently **null** get flagged for de-prioritisation.');
lines.push('');
lines.push('Classification rules:');
lines.push('');
lines.push('- **win** — position improved ≥3, OR impressions doubled, OR clicks went from 0 to ≥1.');
lines.push('- **loss** — position worsened ≥3, OR impressions dropped ≥50%, OR clicks halved.');
lines.push('- **mixed** — at least one win and one loss signal on the same query.');
lines.push('- **null** — moved within the noise band.');
lines.push('- **no-data** — query did not surface at all in the current window.');
lines.push('- **baselining** — entry was added without a baseline; the current numbers become the baseline next week.');
lines.push('');

// --- Tables ---
function emitTable(title, group) {
  lines.push(`## ${title} (${group.length})`);
  lines.push('');
  if (group.length === 0) {
    lines.push('_(none)_');
    lines.push('');
    return;
  }
  lines.push('| Query | Target entity | Baseline | Current | Reason |');
  lines.push('| --- | --- | --- | --- | --- |');
  for (const r of group) lines.push(rowForTable(r));
  lines.push('');
}

emitTable('🏆 Wins', wins);
emitTable('⚠️ Losses', losses);
emitTable('🔀 Mixed', mixed);
emitTable('😐 Null (no significant movement)', nulls);
emitTable('🌑 No data (query disappeared / never appeared)', noData);
emitTable('🌱 Baselining (no baseline recorded yet)', baselining);
if (errors.length > 0) emitTable('❌ Errors', errors);

lines.push('---');
lines.push('');
lines.push('**How to act on this:**');
lines.push('');
lines.push('- 🏆 Wins → note the merged PR / on-page format that moved each query. Add the pattern to `.agents/seo/learned-patterns.md` (manual or via CEO Agent prompt).');
lines.push('- ⚠️ Losses → urgent. Open `ai-fix` issue: "Investigate ranking regression for `<query>`". Often caused by a recent merge that displaced the right content.');
lines.push('- 😐 Null after 60+ days from `added_at` → consider removing from `watched-queries.json` or revisiting strategy for that intent cluster.');
lines.push('- 🌑 No-data → the page may have been deindexed; cross-check with the broken-images report and the indexation coverage report.');
lines.push('- 🌱 Baselining → no action this run; baseline records next run.');
lines.push('');
lines.push('Edit `.agents/seo/watched-queries.json` to add or remove watches. Use `node .agents/scripts/check-gsc-watched-queries.cjs --query "your query" --baseline` to print a ready-to-paste entry with the current 7-day numbers as baseline.');

const body = lines.join('\n');
fs.mkdirSync(path.dirname(ISSUE_OUT), { recursive: true });
fs.writeFileSync(ISSUE_OUT, body);

// Snapshot for the CEO reader — same body, written to the in-repo path.
fs.mkdirSync(path.dirname(SNAPSHOT_OUT), { recursive: true });
const snapshotHeader =
`# GSC Watch — weekly snapshot

*Auto-written by \`.github/workflows/check-gsc-watched-queries.yml\`. Do not edit by hand; edit \`watched-queries.json\` instead. CEO Agent: read this every run when deciding which seo-proposal patterns to keep promoting.*

`;
fs.writeFileSync(SNAPSHOT_OUT, snapshotHeader + body);

process.stderr.write(`[render-gsc] wrote ${ISSUE_OUT} (${wins.length}W ${losses.length}L ${nulls.length}N ${noData.length}ND ${baselining.length}B ${errors.length}E) and ${SNAPSHOT_OUT}\n`);
