#!/usr/bin/env node
/**
 * Renders the JSON report from check-structured-data.cjs into:
 *   - Umbrella issue body (Markdown) — only ACTIONABLE failures, grouped
 *     @type → field → list of URLs, plus a one-line summary.
 *   - .agents/seo/structured-data-snapshot.md — full picture for the CEO Agent.
 *
 * Kept separate so the crawler stays pure (input → JSON) and the issue layout
 * can evolve without touching network code.
 */

const fs = require('node:fs');
const path = require('node:path');

function argv(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 && i + 1 < process.argv.length ? process.argv[i + 1] : fallback;
}

const REPORT = argv('report', 'structured-data.json');
const ISSUE_OUT = argv('issue', 'issue-body.md');
const SNAPSHOT_OUT = argv('snapshot', '.agents/seo/structured-data-snapshot.md');
const MAX_URLS_PER_GROUP = parseInt(argv('max-urls-per-group', '40'), 10);

const report = JSON.parse(fs.readFileSync(REPORT, 'utf8'));
const results = report.results || [];

const fmtUrl = u => `\`${String(u).replace(/\|/g, '\\|')}\``;

const counts = report.counts || {};
const okCount = counts.ok || 0;
const missing = counts['missing-fields'] || 0;
const invalid = counts['invalid-json'] || 0;
const noJsonld = counts['no-jsonld'] || 0;
const pageError = counts['page-error'] || 0;
const withIssues = missing + invalid;
const wow = report.wow || { newFailures: [], fixed: [] };

// Build: @type -> field -> [urls]  (actionable: missing-fields + invalid-json)
const byTypeField = {};        // missing-fields
const invalidByUrl = [];       // invalid-json pages
for (const r of results) {
  if (r.class === 'invalid-json') {
    invalidByUrl.push({ url: r.url, parseErrors: r.parseErrors || [] });
  }
  for (const p of r.problems || []) {
    byTypeField[p.type] = byTypeField[p.type] || {};
    byTypeField[p.type][p.field] = byTypeField[p.type][p.field] || [];
    byTypeField[p.type][p.field].push(r.url);
  }
}

const actionableCount = withIssues + invalidByUrl.length;

function summaryLine() {
  const delta = report.prevHistoryFile
    ? `WoW: +${wow.newFailures.length} new, −${wow.fixed.length} fixed`
    : 'WoW: _(first run — no prior week)_';
  return `**${report.sampledCount} URLs scanned · ${okCount} clean · ${withIssues + invalidByUrl.length} with issues · ${delta}**`;
}

function header(lines) {
  lines.push(`**Generated:** ${report.generatedAt}`);
  lines.push(`**Sitemap URLs total:** ${report.sitemapUrlCount} · **Sampled this run:** ${report.sampledCount} (cap ${report.limit})`);
  lines.push(`**Compared against:** ${report.prevHistoryFile || '_(first run — no prior week, no deltas yet)_'}`);
  lines.push('');
  lines.push(summaryLine());
  lines.push('');
  lines.push('**Counts:** ' + Object.entries(counts).map(([k, v]) => `\`${k}\`=${v}`).join(' · '));
  lines.push('');
  // Sample coverage — no silent truncation.
  const sampled = report.byTypeSampled || {};
  const avail = report.byTypeAvailable || {};
  lines.push('**Sample coverage (by URL type):** ' +
    Object.keys(avail).sort().map(t => `\`${t}\` ${sampled[t] || 0}/${avail[t]}`).join(' · '));
  if ((report.skipped || []).length > 0) {
    lines.push('');
    lines.push('> ⚠️ Cap reached — not every URL was scanned this run: ' +
      report.skipped.map(s => `\`${s.type}\` ${s.skipped} skipped`).join(', ') + '.');
  }
  lines.push('');
}

function classRules(lines) {
  lines.push('## Classification');
  lines.push('');
  lines.push('| Class | Meaning | Actionable |');
  lines.push('| --- | --- | --- |');
  lines.push('| `ok` | Every JSON-LD node has all Google-required fields for its `@type`. ✅ | No |');
  lines.push('| `missing-fields` | A node is missing/empty a Google-required field (e.g. `VideoObject.uploadDate`). | **YES** — fix the data source / renderer |');
  lines.push('| `invalid-json` | A `<script type="application/ld+json">` block failed `JSON.parse`. | **YES** — malformed schema, no rich result |');
  lines.push('| `no-jsonld` | Page emitted no JSON-LD at all. | Context (intentional for some routes) |');
  lines.push('| `page-error` | Page fetch failed (non-2xx / network). | Investigate (overlaps indexation loop) |');
  lines.push('');
}

function emitMissingGroups(lines) {
  const types = Object.keys(byTypeField).sort();
  if (types.length === 0) { lines.push('_(no missing-field failures)_'); lines.push(''); return; }
  for (const type of types) {
    const fields = byTypeField[type];
    const total = Object.values(fields).reduce((a, urls) => a + urls.length, 0);
    lines.push(`### \`${type}\` — ${total} missing-field hit(s)`);
    lines.push('');
    for (const field of Object.keys(fields).sort()) {
      const urls = [...new Set(fields[field])];
      lines.push(`**\`${field}\`** missing on ${urls.length} URL(s):`);
      lines.push('');
      for (const u of urls.slice(0, MAX_URLS_PER_GROUP)) lines.push(`- ${fmtUrl(u)}`);
      if (urls.length > MAX_URLS_PER_GROUP) lines.push(`- _…and ${urls.length - MAX_URLS_PER_GROUP} more — see snapshot file_`);
      lines.push('');
    }
  }
}

function emitInvalid(lines) {
  if (invalidByUrl.length === 0) { lines.push('_(no parse errors)_'); lines.push(''); return; }
  lines.push('| URL | Parse error |');
  lines.push('| --- | --- |');
  for (const r of invalidByUrl.slice(0, MAX_URLS_PER_GROUP)) {
    const err = (r.parseErrors[0]?.error || 'parse error').replace(/\|/g, '\\|');
    lines.push(`| ${fmtUrl(r.url)} | ${err} |`);
  }
  if (invalidByUrl.length > MAX_URLS_PER_GROUP) lines.push(`| _…and ${invalidByUrl.length - MAX_URLS_PER_GROUP} more_ | |`);
  lines.push('');
}

/* ---- Umbrella issue body — actionable failures only ---- */
const u = [];
u.push('> 🤖 **Auto-generated** by `.github/workflows/check-structured-data.yml` — refreshed weekly.');
u.push('');
header(u);
u.push('## What this is');
u.push('');
u.push('Weekly **Structured-Data Validation**. We extract the live, rendered JSON-LD from a type-balanced sample of sitemap URLs and assert the **Google-required fields** for each node\'s `@type` — catching rich-result gaps (e.g. `VideoObject` *Missing field `uploadDate`*) **before** Google Search Console flags them. Full per-URL detail lives in `.agents/seo/structured-data-snapshot.md` (the CEO Agent reads it every run).');
u.push('');
classRules(u);

if (report.prevHistoryFile && (wow.newFailures.length > 0 || wow.fixed.length > 0)) {
  u.push('## Week-over-week');
  u.push('');
  if (wow.newFailures.length > 0) {
    u.push(`### ⚠️ New failures (${wow.newFailures.length}) — were clean last week`);
    u.push('');
    for (const f of wow.newFailures.slice(0, MAX_URLS_PER_GROUP)) u.push(`- ${fmtUrl(f.url)} → \`${f.class}\``);
    if (wow.newFailures.length > MAX_URLS_PER_GROUP) u.push(`- _…and ${wow.newFailures.length - MAX_URLS_PER_GROUP} more_`);
    u.push('');
  }
  if (wow.fixed.length > 0) {
    u.push(`### ✅ Fixed since last week (${wow.fixed.length})`);
    u.push('');
    for (const f of wow.fixed.slice(0, 20)) u.push(`- ${fmtUrl(f.url)} (was \`${f.was}\`)`);
    if (wow.fixed.length > 20) u.push(`- _…and ${wow.fixed.length - 20} more_`);
    u.push('');
  }
}

u.push('## Missing required fields (grouped by `@type` → field)');
u.push('');
emitMissingGroups(u);

u.push('## Invalid JSON-LD (failed to parse)');
u.push('');
emitInvalid(u);

u.push('---');
u.push('');
u.push('**How to fix:**');
u.push('');
u.push('- **Missing field** → the JSON-LD is assembled at render time from the data modules. Find where the node is built (e.g. the `VideoObject` for a lick page, the `Article` for an album article) and ensure the required field is always populated. A missing `uploadDate` usually means the source record has no date — backfill it or derive a sensible default.');
u.push('- **Invalid JSON** → a template is emitting malformed JSON (unescaped quote, trailing comma, undefined interpolated as a bare token). Fix the serializer so `JSON.stringify` always produces the block.');
u.push('- Re-run `node .agents/scripts/check-structured-data.cjs --self-test` after changing the ruleset to confirm the validator still behaves.');
u.push('');
u.push('<sub>This is the single umbrella issue for structured-data validation. The weekly run refreshes this body in place; it auto-closes when 0 actionable failures remain. Please leave it open.</sub>');

fs.mkdirSync(path.dirname(ISSUE_OUT), { recursive: true });
fs.writeFileSync(ISSUE_OUT, u.join('\n'));

/* ---- Snapshot file — full picture for the CEO ---- */
const s = [];
s.push('# Structured-Data Validation — weekly snapshot');
s.push('');
s.push('*Auto-written by `.github/workflows/check-structured-data.yml`. CEO Agent: read this every run when deciding which JSON-LD gaps to file `ai-fix` issues for. This catches the class of bug GSC flags as "Missing field X" before Google does.*');
s.push('');
header(s);
classRules(s);

s.push('## Missing required fields (grouped by `@type` → field)');
s.push('');
emitMissingGroups(s);

s.push('## Invalid JSON-LD (failed to parse)');
s.push('');
emitInvalid(s);

// Every scanned URL, by class.
s.push('## All scanned URLs, by class');
s.push('');
const byClass = {};
for (const r of results) (byClass[r.class] = byClass[r.class] || []).push(r);
for (const cls of ['missing-fields', 'invalid-json', 'page-error', 'no-jsonld', 'ok']) {
  const arr = byClass[cls] || [];
  s.push(`### \`${cls}\` (${arr.length})`);
  s.push('');
  if (arr.length === 0) { s.push('_(none)_'); s.push(''); continue; }
  const shown = arr.slice(0, 200);
  for (const r of shown) {
    const note = r.class === 'missing-fields'
      ? ' — ' + (r.problems || []).map(p => `${p.type}.${p.field}`).join(', ')
      : (r.class === 'page-error' ? ` — ${r.error || ''}` : '');
    s.push(`- ${fmtUrl(r.url)}${note}`);
  }
  if (arr.length > 200) s.push(`- _…and ${arr.length - 200} more_`);
  s.push('');
}

fs.mkdirSync(path.dirname(SNAPSHOT_OUT), { recursive: true });
fs.writeFileSync(SNAPSHOT_OUT, s.join('\n'));

// Side channel for the workflow.
fs.writeFileSync('/tmp/structured-data-actionable-count.txt', String(actionableCount));

process.stderr.write(`[render-structured-data] wrote ${ISSUE_OUT} and ${SNAPSHOT_OUT} (actionable=${actionableCount}, new=${wow.newFailures.length}, fixed=${wow.fixed.length})\n`);
