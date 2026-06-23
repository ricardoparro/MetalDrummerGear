#!/usr/bin/env node
/**
 * Renders the JSON report from check-llm-citations.cjs into the umbrella
 * issue body (Markdown). Pure transform — no network, no GitHub.
 *
 * Layout:
 *   - Header with run timestamp + provider summary
 *   - "Not cited anywhere" table (the work list — these are the queries
 *     where competitors win and we need an ai-fix issue follow-up)
 *   - "Cited by at least one provider" table (the wins — track WoW deltas
 *     against this)
 *   - Errored queries (for debugging / re-runs)
 */

const fs = require('node:fs');
const path = require('node:path');

function argv(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 && i + 1 < process.argv.length ? process.argv[i + 1] : fallback;
}

const REPORT = argv('report', 'llm-citations.json');
const OUT = argv('out', 'issue-body.md');
const MAX_NOT_CITED = parseInt(argv('max-not-cited', '60'), 10);
const MAX_COMPETITORS_PER_ROW = parseInt(argv('max-competitors-per-row', '4'), 10);

const report = JSON.parse(fs.readFileSync(REPORT, 'utf8'));

const providers = report.providers || [];
const hasMultipleProviders = providers.length > 1;

const lines = [];
lines.push(`> 🤖 **Auto-generated** by \`.github/workflows/check-llm-citations.yml\` — refreshed weekly.`);
lines.push('');
lines.push(`**Generated:** ${report.generatedAt}`);
lines.push(`**Providers used:** ${providers.join(', ') || '(none)'}` + (report.providersSkipped?.length ? `  (skipped: ${report.providersSkipped.map(s => `${s.name} — missing ${s.missing}`).join('; ')})` : ''));
lines.push(`**Queries:** ${report.queriesTotal} total — ✅ **${report.queriesCitedAny}** cite us | ❌ **${report.queriesNotCitedAny}** do not | ⚠️ ${report.queriesErrored} errored`);
lines.push('');
lines.push('## What this is');
lines.push('');
lines.push('A weekly automated test: for each query in `.agents/llm-citation-targets.json`, ask an LLM the question and check whether `metalforge.io` appears in the response body or in the cited URLs. The goal is to make the "AI citations / week" sub-KPI on the roadmap measurable instead of a manual sample.');
lines.push('');
lines.push('Two things to act on:');
lines.push('');
lines.push('1. **Each row in the "Not cited anywhere" table is a follow-up `ai-fix` candidate.** Look at *which* competitor is winning the query, open the referring competitor page, and find the format gap (missing FAQ schema, no LLM markdown file, weak Article schema, no inline answer). Open one issue per pattern — the next weekly run verifies whether you closed it.');
lines.push('2. **Each row in the "Cited" table is a pattern to replicate.** Note which on-page format the provider chose to cite, and apply that format to similar target queries.');
lines.push('');

// ---- Not cited (the work list) ----
const notCited = report.results.filter(r => {
  const provResults = Object.values(r.providers || {});
  return provResults.length > 0
    && provResults.some(p => !p.error)
    && !provResults.some(p => p.cited);
});

lines.push(`## ❌ Not cited anywhere (${notCited.length})`);
lines.push('');
if (notCited.length === 0) {
  lines.push('_All queries cite us on at least one provider. 🎉_');
} else {
  const header = ['Query', 'Intent', 'Target entity', 'Competitors winning'];
  if (hasMultipleProviders) header.splice(3, 0, ...providers.map(p => `Body / cit (${p})`));
  lines.push(`| ${header.join(' | ')} |`);
  lines.push(`| ${header.map(() => '---').join(' | ')} |`);
  for (const [i, r] of notCited.entries()) {
    if (i >= MAX_NOT_CITED) {
      lines.push(`| _…and ${notCited.length - MAX_NOT_CITED} more — see JSON artifact_ |${' |'.repeat(header.length - 1)}`);
      break;
    }
    const compHosts = new Set();
    for (const p of providers) {
      const pr = r.providers?.[p];
      if (!pr || pr.error) continue;
      for (const url of pr.competitorCitations || []) {
        try { compHosts.add(new URL(url).hostname.replace(/^www\./, '')); } catch {}
      }
    }
    const compStr = [...compHosts].slice(0, MAX_COMPETITORS_PER_ROW).join(', ') || '_no competitor in citations_';
    const compMore = compHosts.size > MAX_COMPETITORS_PER_ROW ? ` (+${compHosts.size - MAX_COMPETITORS_PER_ROW})` : '';
    const row = [
      `\`${r.q.replace(/\|/g, '\\|')}\``,
      r.intent || '',
      r.target_entity || '',
      compStr + compMore,
    ];
    if (hasMultipleProviders) {
      const provCols = providers.map(p => {
        const pr = r.providers?.[p];
        if (!pr) return '—';
        if (pr.error) return `err: ${pr.error.slice(0, 30)}`;
        return `body=${pr.bodyMentionsUs ? 'Y' : 'N'} / cit=${(pr.usCitations || []).length}`;
      });
      row.splice(3, 0, ...provCols);
    }
    lines.push(`| ${row.join(' | ')} |`);
  }
}
lines.push('');

// ---- Cited (track wins) ----
const cited = report.results.filter(r => {
  const provResults = Object.values(r.providers || {});
  return provResults.some(p => p.cited);
});

lines.push(`## ✅ Cited by at least one provider (${cited.length})`);
lines.push('');
if (cited.length === 0) {
  lines.push('_No query cites us yet — every target is in the work list above._');
} else {
  lines.push('| Query | Target entity | Where cited |');
  lines.push('| --- | --- | --- |');
  for (const r of cited) {
    const where = [];
    for (const p of providers) {
      const pr = r.providers?.[p];
      if (!pr || pr.error || !pr.cited) continue;
      const parts = [];
      if (pr.bodyMentionsUs) parts.push('body');
      if (pr.usCitations?.length) parts.push(`${pr.usCitations.length} cit`);
      where.push(`${p}: ${parts.join(' + ')}`);
    }
    lines.push(`| \`${r.q.replace(/\|/g, '\\|')}\` | ${r.target_entity || ''} | ${where.join(' • ')} |`);
  }
}
lines.push('');

// ---- Errored ----
const errored = report.results.filter(r => {
  const provResults = Object.values(r.providers || {});
  return provResults.length > 0 && !provResults.some(p => !p.error);
});
if (errored.length > 0) {
  lines.push(`## ⚠️ Errored (${errored.length})`);
  lines.push('');
  lines.push('| Query | Errors |');
  lines.push('| --- | --- |');
  for (const r of errored) {
    const errStr = Object.entries(r.providers || {})
      .map(([p, pr]) => `${p}: ${(pr.error || '').slice(0, 60)}`)
      .join('; ');
    lines.push(`| \`${r.q.replace(/\|/g, '\\|')}\` | ${errStr} |`);
  }
  lines.push('');
}

lines.push('---');
lines.push('');
lines.push('<sub>Edit `.agents/llm-citation-targets.json` to add/remove queries or competitors. The next weekly run refreshes this body. Opening additional broken-citation issues will be deduplicated — please leave this one open.</sub>');

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, lines.join('\n'));
process.stderr.write(`[render-llm] wrote ${OUT} (notCited=${notCited.length}, cited=${cited.length}, errored=${errored.length})\n`);
