#!/usr/bin/env node
/**
 * Renders the JSON report from check-gsc-watched-queries.cjs into:
 *   - The umbrella issue body (Markdown) — only ACTIONABLE rows
 *   - The CEO-facing snapshot file (.agents/seo/gsc-watch-snapshot.md)
 *     — every query, grouped by verdict class, sorted by impact
 *
 * v2: every query GSC surfaced this week (scan-all model), classified by
 * comparing to the most recent prior week. No watched-queries.json.
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

const ACTIONABLE_CLASSES = new Set(['big-loss', 'disappeared', 'ctr-gap-opportunity']);

const byClass = {
  'big-loss': [], 'disappeared': [], 'ctr-gap-opportunity': [],
  'big-win': [], 'new': [], 'null': [], 'noise': [],
};
for (const r of results) {
  const c = r.verdict?.class;
  if (byClass[c]) byClass[c].push(r);
}

const fmtPos = v => (v == null ? '—' : (typeof v === 'number' ? v.toFixed(1) : String(v)));
const fmtCtr = v => (v == null ? '—' : `${(v * 100).toFixed(2)}%`);

function row(r) {
  const q = `\`${r.q.replace(/\|/g, '\\|')}\``;
  const prev = r.prev
    ? `pos ${fmtPos(r.prev.position)} • impr ${r.prev.impressions} • cl ${r.prev.clicks}`
    : '_(new — no prior week)_';
  const curr = r.curr
    ? `pos ${fmtPos(r.curr.position)} • impr ${r.curr.impressions} • cl ${r.curr.clicks}`
    : '—';
  return `| ${q} | ${prev} | ${curr} | ${r.verdict?.reason || ''} |`;
}

function emitTable(lines, title, group, max = null) {
  lines.push(`### ${title} (${group.length})`);
  lines.push('');
  if (group.length === 0) { lines.push('_(none)_'); lines.push(''); return; }
  lines.push('| Query | Last week | This week | Reason |');
  lines.push('| --- | --- | --- | --- |');
  const shown = max && group.length > max ? group.slice(0, max) : group;
  for (const r of shown) lines.push(row(r));
  if (max && group.length > max) {
    lines.push(`| _…and ${group.length - max} more — see snapshot file for the full list_ | | | |`);
  }
  lines.push('');
}

function header(lines) {
  lines.push(`**Generated:** ${report.generatedAt}`);
  lines.push(`**Site:** ${report.site || '—'} · **Window:** last ${report.lookbackDays} days · **Compared against:** ${report.prevHistoryFile || '_(first run — no prior week)_'}`);
  lines.push(`**Queries this week:** ${report.queriesTotal}`);
  lines.push('');
  lines.push('**Counts:** ' + (Object.entries(report.counts || {}).map(([k, v]) => `${k}=${v}`).join(' · ') || '(none)'));
  lines.push('');
}

function classRules(lines) {
  lines.push('## Classification rules');
  lines.push('');
  lines.push('| Class | Trigger |');
  lines.push('| --- | --- |');
  lines.push('| **big-loss** | Position worsened ≥3 (with ≥10 prior impr), OR impressions ≤0.5x (with ≥50 prior), OR clicks halved (with ≥4 prior). |');
  lines.push('| **disappeared** | Now 0 impressions, had ≥5 clicks or ≥50 impr last week. |');
  lines.push('| **ctr-gap-opportunity** | Position 3–10, ≥20 impressions, CTR < 1% — visible but not clicked. **Brann-Dailor-pattern**. |');
  lines.push('| **big-win** | Position improved ≥3, OR impressions ≥2x, OR clicks 0→≥1 (with ≥10 impr). |');
  lines.push('| **new** | Did not appear last week, ≥5 impressions this week. |');
  lines.push('| **null** | Movement within the noise band. |');
  lines.push('| **noise** | Below action threshold (e.g. new with <5 impr, gone but had <5 clicks). |');
  lines.push('');
}

// ---- Umbrella issue body — only actionable + cited big-wins for context ----
const umbrellaLines = [];
umbrellaLines.push(`> 🤖 **Auto-generated** by \`.github/workflows/check-gsc-watched-queries.yml\` — refreshed weekly.`);
umbrellaLines.push('');
header(umbrellaLines);
umbrellaLines.push('## What this is');
umbrellaLines.push('');
umbrellaLines.push('The **L1 loop**, scan-all model — every query GSC surfaced for metalforge.io this week, classified against last week. This umbrella shows only the **actionable** classes; the full per-query snapshot lives in `.agents/seo/gsc-watch-snapshot.md` (CEO Agent reads it every run).');
umbrellaLines.push('');
classRules(umbrellaLines);
umbrellaLines.push('## Actionable now');
umbrellaLines.push('');
emitTable(umbrellaLines, '⚠️ Big losses — investigate ranking regression', byClass['big-loss']);
emitTable(umbrellaLines, '🌑 Disappeared — page possibly deindexed', byClass['disappeared']);
emitTable(umbrellaLines, '🔥 CTR-gap opportunities (Brann-Dailor pattern)', byClass['ctr-gap-opportunity'], 30);
umbrellaLines.push('## Context');
umbrellaLines.push('');
emitTable(umbrellaLines, '🏆 Big wins — replicate the pattern that drove these', byClass['big-win'], 20);
emitTable(umbrellaLines, '🌟 New queries surfacing — surface-area expansion', byClass['new'], 20);
umbrellaLines.push('---');
umbrellaLines.push('');
umbrellaLines.push('**How to act:**');
umbrellaLines.push('');
umbrellaLines.push('- ⚠️ **Big losses** → open `ai-fix` issue per query, link the recent merges that may have displaced the target page.');
umbrellaLines.push('- 🌑 **Disappeared** → cross-check `broken-images` umbrella; if both flag the same page, page may be deindexed.');
umbrellaLines.push('- 🔥 **CTR-gap opportunities** → the highest-leverage column. Pos 3–10 with <1% CTR almost always means title/snippet mismatch, **NOT** ranking problem. Open one `ai-fix` per pattern (per drummer cluster or per intent type), citing the row.');
umbrellaLines.push('- 🏆 **Big wins** → append the pattern to `.agents/seo/learned-patterns.md` and promote similar `seo-proposal` issues when triaging.');
umbrellaLines.push('- 🌟 **New queries** → if they cluster on an entity we don\'t have a dedicated page for, consider whether one is worth filing.');
umbrellaLines.push('');

const umbrellaBody = umbrellaLines.join('\n');
fs.mkdirSync(path.dirname(ISSUE_OUT), { recursive: true });
fs.writeFileSync(ISSUE_OUT, umbrellaBody);

// ---- Snapshot file for the CEO — full per-query list, all classes ----
const snapshotLines = [];
snapshotLines.push('# GSC Watch — weekly snapshot');
snapshotLines.push('');
snapshotLines.push('*Auto-written by `.github/workflows/check-gsc-watched-queries.yml`. Do not edit by hand. CEO Agent: read this every run when deciding which seo-proposal patterns to keep promoting. Scan-all model: every query GSC surfaced this week, classified against the prior week.*');
snapshotLines.push('');
header(snapshotLines);
classRules(snapshotLines);
snapshotLines.push('## All queries, grouped by class');
snapshotLines.push('');
emitTable(snapshotLines, '⚠️ Big losses', byClass['big-loss']);
emitTable(snapshotLines, '🌑 Disappeared', byClass['disappeared']);
emitTable(snapshotLines, '🔥 CTR-gap opportunities', byClass['ctr-gap-opportunity']);
emitTable(snapshotLines, '🏆 Big wins', byClass['big-win']);
emitTable(snapshotLines, '🌟 New queries surfacing', byClass['new']);
emitTable(snapshotLines, '😐 Null (within noise band)', byClass['null'], 100);
emitTable(snapshotLines, '🌫️ Noise (sub-threshold)', byClass['noise'], 50);

fs.mkdirSync(path.dirname(SNAPSHOT_OUT), { recursive: true });
fs.writeFileSync(SNAPSHOT_OUT, snapshotLines.join('\n'));

// Determine if umbrella should open: any actionable class non-empty.
const actionableCount = ACTIONABLE_CLASSES.size
  ? [...ACTIONABLE_CLASSES].reduce((acc, c) => acc + (byClass[c]?.length || 0), 0)
  : 0;

process.stderr.write(`[render-gsc] wrote ${ISSUE_OUT} and ${SNAPSHOT_OUT} (actionable=${actionableCount}, wins=${byClass['big-win'].length}, new=${byClass['new'].length})\n`);

// Emit the actionable count to a side-channel file the workflow reads.
fs.writeFileSync('/tmp/gsc-watch-actionable-count.txt', String(actionableCount));
