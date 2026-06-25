#!/usr/bin/env node
/**
 * Renders the JSON report from check-indexation.cjs into:
 *   - Umbrella issue body (Markdown) — only ACTIONABLE rows
 *   - .agents/seo/indexation-snapshot.md — every URL by class (CEO reads it)
 */

const fs = require('node:fs');
const path = require('node:path');

function argv(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 && i + 1 < process.argv.length ? process.argv[i + 1] : fallback;
}

const REPORT = argv('report', 'indexation.json');
const ISSUE_OUT = argv('issue', 'issue-body.md');
const SNAPSHOT_OUT = argv('snapshot', '.agents/seo/indexation-snapshot.md');

const report = JSON.parse(fs.readFileSync(REPORT, 'utf8'));
const results = (report.results || []).filter(r => !r._error);

// Bucket every result by class.
const byClass = {};
for (const r of results) {
  if (!byClass[r.class]) byClass[r.class] = [];
  byClass[r.class].push(r);
}

// Actionable buckets — these are the things the CEO Agent should open ai-fix
// issues for. Other classes (indexed, excluded-noindex, etc.) live only in the
// snapshot file, not the umbrella issue.
const ACTIONABLE = ['crawled-not-indexed', 'error-404', 'error-5xx', 'soft-404', 'error-4xx-other', 'duplicate'];
const REGRESSIONS = report.regressions || [];

const fmtUrl = u => `\`${u.replace(/\|/g, '\\|')}\``;

function rowFor(r) {
  const last = r.lastCrawlTime ? r.lastCrawlTime.split('T')[0] : '—';
  const can = r.googleCanonical && r.googleCanonical !== r.url ? `canonical → ${r.googleCanonical}` : '';
  return `| ${fmtUrl(r.url)} | ${r.coverageState || r.class} | ${last} | ${can} |`;
}

function emitTable(lines, title, group, max = null) {
  lines.push(`### ${title} (${group.length})`);
  lines.push('');
  if (group.length === 0) { lines.push('_(none)_'); lines.push(''); return; }
  lines.push('| URL | Coverage state | Last crawl | Notes |');
  lines.push('| --- | --- | --- | --- |');
  const shown = max && group.length > max ? group.slice(0, max) : group;
  for (const r of shown) lines.push(rowFor(r));
  if (max && group.length > max) lines.push(`| _…and ${group.length - max} more — see snapshot file_ | | | |`);
  lines.push('');
}

function header(lines) {
  lines.push(`**Generated:** ${report.generatedAt}`);
  lines.push(`**Site:** ${report.site || '—'}`);
  lines.push(`**Sitemap URLs total:** ${report.sitemapUrlCount} · **Inspected this run:** ${report.inspectedCount} (cap ${report.inspectionCap})`);
  lines.push(`**Compared against:** ${report.prevHistoryFile || '_(first run — no prior week, no regressions detected yet)_'}`);
  lines.push('');
  lines.push('**Counts:** ' + Object.entries(report.counts || {}).map(([k, v]) => `\`${k}\`=${v}`).join(' · '));
  lines.push('');
  if (results.length > 0) {
    const indexedCount = (report.counts.indexed || 0) + (report.counts['indexed-with-issues'] || 0) + (report.counts['indexed-not-in-sitemap'] || 0);
    const pct = (100 * indexedCount / results.length).toFixed(1);
    lines.push(`**Indexed share:** ${indexedCount} / ${results.length} = **${pct}%**`);
    lines.push('');
  }
}

function classRules(lines) {
  lines.push('## Classification map');
  lines.push('');
  lines.push('| Class | What it means | Actionable? |');
  lines.push('| --- | --- | --- |');
  lines.push('| `indexed` | Submitted and indexed. ✅ | No |');
  lines.push('| `indexed-with-issues` | Indexed but PARTIAL verdict (mobile usability, etc.) | Investigate when high-traffic |');
  lines.push('| `crawled-not-indexed` | Google saw it, decided not to index it. **Quality issue.** | **YES** — improve content, expand, or remove from sitemap |');
  lines.push('| `discovered-not-indexed` | Google found the URL but never crawled it. **Internal-link issue.** | Boost via internal linking, hub pages |');
  lines.push('| `excluded-noindex` | Page tells Google not to index (`noindex` meta). | No (intentional) |');
  lines.push('| `redirect-or-canonical` | URL redirects or alt-canonical-points-elsewhere. | No |');
  lines.push('| `duplicate` | Duplicate without canonical pointer. **Canonical issue.** | Set canonical or merge |');
  lines.push('| `error-404`, `error-5xx`, `soft-404` | Broken page. | **YES** — fix or remove from sitemap |');
  lines.push('| `blocked-by-robots` | robots.txt forbids crawling. | Investigate if unintentional |');
  lines.push('| `unknown` | Could not classify coverage state. | Investigate |');
  lines.push('');
}

// ---- Umbrella issue body — actionable rows only ----
const umbrellaLines = [];
umbrellaLines.push(`> 🤖 **Auto-generated** by \`.github/workflows/check-indexation.yml\` — refreshed weekly.`);
umbrellaLines.push('');
header(umbrellaLines);
umbrellaLines.push('## What this is');
umbrellaLines.push('');
umbrellaLines.push('The **L3 loop** — Indexation Health. Every URL in `sitemap.xml` is inspected via the Google Search Console URL Inspection API; this umbrella surfaces only the URLs that are in actionable trouble (Google rejected them, broke, or regressed). The full per-URL classification lives in `.agents/seo/indexation-snapshot.md` (CEO Agent reads it every run).');
umbrellaLines.push('');
classRules(umbrellaLines);

umbrellaLines.push('## Actionable now');
umbrellaLines.push('');

if (REGRESSIONS.length > 0) {
  umbrellaLines.push(`### ⚠️ Regressions (${REGRESSIONS.length}) — URLs that WERE indexed last week and are NOT now`);
  umbrellaLines.push('');
  umbrellaLines.push('| URL | Last week | This week |');
  umbrellaLines.push('| --- | --- | --- |');
  for (const r of REGRESSIONS.slice(0, 40)) {
    umbrellaLines.push(`| ${fmtUrl(r.url)} | \`${r.prev}\` | \`${r.curr}\` |`);
  }
  if (REGRESSIONS.length > 40) umbrellaLines.push(`| _…and ${REGRESSIONS.length - 40} more_ | | |`);
  umbrellaLines.push('');
}

emitTable(umbrellaLines, '🔴 Crawled, not indexed — Google rejected the content', byClass['crawled-not-indexed'] || [], 50);
emitTable(umbrellaLines, '💥 4xx errors', [...(byClass['error-404'] || []), ...(byClass['error-4xx-other'] || []), ...(byClass['soft-404'] || [])], 30);
emitTable(umbrellaLines, '💥 5xx errors', byClass['error-5xx'] || [], 30);
emitTable(umbrellaLines, '🔁 Duplicate without canonical', byClass['duplicate'] || [], 30);

umbrellaLines.push('## Context');
umbrellaLines.push('');
emitTable(umbrellaLines, '🌫️ Discovered, not indexed — known to Google, never crawled', byClass['discovered-not-indexed'] || [], 30);
emitTable(umbrellaLines, '🤷 Unknown classification', byClass['unknown'] || [], 10);

umbrellaLines.push('---');
umbrellaLines.push('');
umbrellaLines.push('**How to act:**');
umbrellaLines.push('');
umbrellaLines.push('- 🔴 **crawled-not-indexed** → highest leverage. Google fetched the page and decided it was not worth indexing. Either expand the content (often a thin page), add unique value (FAQ, schema, internal links), or remove from sitemap. File an `ai-fix` per cluster (e.g. "All `/articles/X-drum-setup` flagged crawled-not-indexed — expand to 500+ words with FAQ schema").');
umbrellaLines.push('- 💥 **4xx / 5xx** → broken page in sitemap. Either fix or remove. File one `ai-fix` per pattern.');
umbrellaLines.push('- 🔁 **duplicate** → canonical mismatch. Add `<link rel="canonical">` or merge content.');
umbrellaLines.push('- ⚠️ **regressions** → urgent. Was indexed last week, not now. Cross-check with recent merges.');
umbrellaLines.push('- 🌫️ **discovered-not-indexed** → no internal links pointing at it. Add via hub pages or relatedAlbum chains. Lower priority than `crawled-not-indexed`.');
umbrellaLines.push('');

const umbrella = umbrellaLines.join('\n');
fs.mkdirSync(path.dirname(ISSUE_OUT), { recursive: true });
fs.writeFileSync(ISSUE_OUT, umbrella);

// ---- Snapshot file ----
const snapshotLines = [];
snapshotLines.push('# Indexation Health — weekly snapshot');
snapshotLines.push('');
snapshotLines.push('*Auto-written by `.github/workflows/check-indexation.yml`. CEO Agent: read this every run when deciding which pages need content expansion or internal-link boosting.*');
snapshotLines.push('');
header(snapshotLines);
classRules(snapshotLines);
snapshotLines.push('## All inspected URLs, grouped by class');
snapshotLines.push('');

const ALL_CLASSES = [
  'crawled-not-indexed', 'error-404', 'error-5xx', 'soft-404', 'error-4xx-other',
  'duplicate', 'duplicate-google-canonical',
  'discovered-not-indexed',
  'indexed-with-issues', 'indexed', 'indexed-not-in-sitemap', 'indexed-but-blocked',
  'excluded-noindex', 'redirect-or-canonical', 'blocked-by-robots',
  'unknown',
];
for (const cls of ALL_CLASSES) {
  if (!byClass[cls]) continue;
  emitTable(snapshotLines, `\`${cls}\``, byClass[cls], 100);
}

fs.mkdirSync(path.dirname(SNAPSHOT_OUT), { recursive: true });
fs.writeFileSync(SNAPSHOT_OUT, snapshotLines.join('\n'));

// Side channel for the workflow to read.
const actionableCount =
  (byClass['crawled-not-indexed']?.length || 0) +
  (byClass['error-404']?.length || 0) +
  (byClass['error-5xx']?.length || 0) +
  (byClass['soft-404']?.length || 0) +
  (byClass['error-4xx-other']?.length || 0) +
  (byClass['duplicate']?.length || 0) +
  REGRESSIONS.length;
fs.writeFileSync('/tmp/indexation-actionable-count.txt', String(actionableCount));

process.stderr.write(`[render-indexation] wrote ${ISSUE_OUT} and ${SNAPSHOT_OUT} (actionable=${actionableCount}, regressions=${REGRESSIONS.length})\n`);
