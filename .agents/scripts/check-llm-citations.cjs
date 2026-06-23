#!/usr/bin/env node
/**
 * LLM citation auto-test — does any of our target queries cite metalforge.io?
 *
 * Pipeline:
 *   1. Read the target query list from .agents/llm-citation-targets.json
 *   2. For each query, fire it at the configured LLM providers (Perplexity to
 *      start; pluggable from PROVIDERS table below).
 *   3. Parse the response body + the provider's citation array, classify each
 *      hit as us / competitor / other.
 *   4. Write a JSON report. The workflow turns that report into the single
 *      umbrella issue (open / edit / close), same pattern as broken-images.
 *
 * Pure: no GitHub calls, no state mutation. Input flags / env, output JSON.
 *
 * Local run:
 *   PERPLEXITY_API_KEY=pplx-... \
 *   node .agents/scripts/check-llm-citations.cjs \
 *     --targets .agents/llm-citation-targets.json \
 *     --out /tmp/llm-citations.json
 *
 * Exit codes:
 *   0 — completed (whether or not any citations are missing)
 *   1 — fatal (no providers usable, targets file unreadable, etc.) — workflow
 *       does NOT mutate the umbrella issue in this case.
 */

const fs = require('node:fs');
const path = require('node:path');

function argv(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 && i + 1 < process.argv.length ? process.argv[i + 1] : fallback;
}

const TARGETS_FILE = argv('targets', '.agents/llm-citation-targets.json');
const OUT = argv('out', '/tmp/llm-citations.json');
const PROVIDER_FILTER = argv('providers', '').split(',').filter(Boolean);
const PER_QUERY_DELAY_MS = parseInt(argv('delay', '1500'), 10);
const PER_REQUEST_TIMEOUT_MS = parseInt(argv('timeout', '60000'), 10);

const US_DOMAIN = 'metalforge.io';

function log(msg) { process.stderr.write(`[llm-citations] ${msg}\n`); }
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function fetchWithTimeout(url, opts, ms) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { ...opts, signal: ctrl.signal });
  } finally {
    clearTimeout(t);
  }
}

/* ---------- Providers ----------
 * Each provider is a function (query) -> Promise<{ body, citations: string[] }>.
 * Add more here as keys become available; the workflow auto-enables the ones
 * whose API key env var is set. Keep them honest: never fabricate a citation
 * list; return [] if the provider does not expose one.
 */
const PROVIDERS = {
  perplexity: {
    name: 'perplexity',
    envKey: 'PERPLEXITY_API_KEY',
    async query(q) {
      const r = await fetchWithTimeout(
        'https://api.perplexity.ai/chat/completions',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // sonar = cheapest online model; latest naming as of mid-2026
            model: 'sonar',
            messages: [{ role: 'user', content: q }],
          }),
        },
        PER_REQUEST_TIMEOUT_MS,
      );
      if (!r.ok) {
        const text = await r.text().catch(() => '');
        throw new Error(`perplexity ${r.status}: ${text.slice(0, 200)}`);
      }
      const data = await r.json();
      const body = data?.choices?.[0]?.message?.content ?? '';
      // Perplexity returns a flat array of citation URLs at the top level.
      const citations = Array.isArray(data?.citations) ? data.citations : [];
      return { body, citations };
    },
  },
};

function pickProviders() {
  const all = Object.entries(PROVIDERS);
  const filtered = PROVIDER_FILTER.length
    ? all.filter(([k]) => PROVIDER_FILTER.includes(k))
    : all;
  const usable = [];
  const skipped = [];
  for (const [k, p] of filtered) {
    if (process.env[p.envKey]) usable.push(p);
    else skipped.push({ name: p.name, missing: p.envKey });
  }
  return { usable, skipped };
}

function hostnameOf(url) {
  try { return new URL(url).hostname.replace(/^www\./, ''); }
  catch { return ''; }
}

function classifyCitation(url, competitorList) {
  const host = hostnameOf(url);
  if (!host) return 'other';
  if (host === US_DOMAIN || host.endsWith('.' + US_DOMAIN)) return 'us';
  if (competitorList.some(c => host === c || host.endsWith('.' + c))) return 'competitor';
  return 'other';
}

function detectInBody(body, needle) {
  return body.toLowerCase().includes(needle.toLowerCase());
}

(async () => {
  let config;
  try {
    config = JSON.parse(fs.readFileSync(TARGETS_FILE, 'utf8'));
  } catch (e) {
    log(`FATAL: cannot read targets ${TARGETS_FILE}: ${e.message}`);
    process.exit(1);
  }
  const queries = Array.isArray(config.queries) ? config.queries : [];
  const competitors = Array.isArray(config._competitors) ? config._competitors : [];

  if (queries.length === 0) {
    log('FATAL: targets file has no queries.');
    process.exit(1);
  }

  const { usable, skipped } = pickProviders();
  if (usable.length === 0) {
    log(`FATAL: no LLM provider usable. Missing env: ${skipped.map(s => s.missing).join(', ') || '(none configured)'}`);
    process.exit(1);
  }
  log(`providers: ${usable.map(p => p.name).join(', ')}${skipped.length ? ` (skipped: ${skipped.map(s => s.name).join(', ')})` : ''}`);
  log(`queries: ${queries.length}, competitors: ${competitors.length}`);

  const results = [];
  for (let i = 0; i < queries.length; i++) {
    const target = queries[i];
    const perProvider = {};
    for (const p of usable) {
      try {
        const { body, citations } = await p.query(target.q);
        const bodyMentionsUs = detectInBody(body, US_DOMAIN);
        const classes = citations.map(url => ({ url, kind: classifyCitation(url, competitors) }));
        const usCitations = classes.filter(c => c.kind === 'us');
        const competitorCitations = classes.filter(c => c.kind === 'competitor');
        perProvider[p.name] = {
          cited: bodyMentionsUs || usCitations.length > 0,
          bodyMentionsUs,
          usCitations: usCitations.map(c => c.url),
          competitorCitations: competitorCitations.map(c => c.url),
          allCitations: citations,
          // Truncate body so the report stays small; full body is useless once
          // the YES/NO + citation list is known.
          bodyExcerpt: body.slice(0, 400),
        };
      } catch (e) {
        perProvider[p.name] = { error: e.message };
      }
      // small spacing between calls to be polite + avoid 429
      await sleep(PER_QUERY_DELAY_MS / usable.length);
    }
    results.push({ ...target, providers: perProvider });
    log(`[${i + 1}/${queries.length}] "${target.q}" — ${
      Object.entries(perProvider).map(([n, r]) =>
        r.error ? `${n}:err` : (r.cited ? `${n}:✓` : `${n}:✗`)
      ).join(' ')
    }`);
  }

  // Summary numbers — what the workflow turns into the umbrella issue title.
  let citedAny = 0, notCitedAny = 0, errCount = 0;
  for (const r of results) {
    const provResults = Object.values(r.providers);
    const anyCited = provResults.some(p => p.cited);
    const anyOk = provResults.some(p => !p.error);
    if (anyCited) citedAny++;
    else if (anyOk) notCitedAny++;
    else errCount++;
  }

  const report = {
    generatedAt: new Date().toISOString(),
    targetsFile: TARGETS_FILE,
    providers: usable.map(p => p.name),
    providersSkipped: skipped,
    queriesTotal: queries.length,
    queriesCitedAny: citedAny,
    queriesNotCitedAny: notCitedAny,
    queriesErrored: errCount,
    competitorsTracked: competitors,
    results,
  };

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(report, null, 2));
  log(`wrote ${OUT}`);
  log(`summary: cited=${citedAny}/${queries.length} not-cited=${notCitedAny} errored=${errCount}`);
})().catch(e => {
  log(`FATAL: ${e.stack || e.message || e}`);
  process.exit(1);
});
