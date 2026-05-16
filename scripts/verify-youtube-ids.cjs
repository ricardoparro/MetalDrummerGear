#!/usr/bin/env node
// Scans the repo for YouTube video IDs and reports which are broken.
// Verifies via YouTube's oEmbed endpoint (200 = working, 401 = embedding
// disabled, 404 = removed/private). Run locally or in CI from a host that
// has network egress to youtube.com (the agent sandbox does not).
//
// Usage:
//   node scripts/verify-youtube-ids.cjs            # scan and report
//   node scripts/verify-youtube-ids.cjs --json out.json  # also write JSON

const fs = require('fs');
const path = require('path');
const https = require('https');

const REPO_ROOT = path.resolve(__dirname, '..');
const CONCURRENCY = 8;
const REQUEST_TIMEOUT_MS = 10000;
const PER_ID_RETRIES = 1;

const SCAN_DIRS = [
  'packages/frontend/data',
  'packages/frontend/components',
  'api',
  'packages/backend/src',
];
const EXTRA_FILES = [
  'packages/frontend/App.js',
];

const ID_PATTERNS = [
  /youtube\.com\/embed\/([A-Za-z0-9_-]{11})/g,
  /youtube\.com\/watch\?v=([A-Za-z0-9_-]{11})/g,
  /youtu\.be\/([A-Za-z0-9_-]{11})/g,
  /\b(?:youtubeId|videoId|youtube|video)\s*:\s*['"]([A-Za-z0-9_-]{11})['"]/g,
];

function walk(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (/\.(js|jsx|cjs|mjs|ts|tsx)$/.test(entry.name)) out.push(full);
  }
  return out;
}

function collectFiles() {
  const files = new Set();
  for (const d of SCAN_DIRS) walk(path.join(REPO_ROOT, d)).forEach(f => files.add(f));
  for (const f of EXTRA_FILES) {
    const p = path.join(REPO_ROOT, f);
    if (fs.existsSync(p)) files.add(p);
  }
  return [...files];
}

function extractIds(files) {
  const idToLocations = new Map();
  for (const file of files) {
    const text = fs.readFileSync(file, 'utf8');
    const lines = text.split('\n');
    for (const pattern of ID_PATTERNS) {
      pattern.lastIndex = 0;
      let m;
      while ((m = pattern.exec(text)) !== null) {
        const id = m[1];
        const offset = m.index;
        const line = text.slice(0, offset).split('\n').length;
        const rel = path.relative(REPO_ROOT, file);
        if (!idToLocations.has(id)) idToLocations.set(id, []);
        idToLocations.get(id).push({ file: rel, line, snippet: lines[line - 1].trim().slice(0, 120) });
      }
    }
  }
  return idToLocations;
}

function fetchStatus(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { timeout: REQUEST_TIMEOUT_MS, headers: { 'User-Agent': 'metalforge-youtube-verifier/1.0' } }, (res) => {
      res.resume();
      resolve({ status: res.statusCode });
    });
    req.on('error', (err) => resolve({ status: 0, error: err.code || err.message }));
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, error: 'TIMEOUT' }); });
  });
}

async function checkId(id) {
  const oembed = `https://www.youtube.com/oembed?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D${id}&format=json`;
  let last;
  for (let attempt = 0; attempt <= PER_ID_RETRIES; attempt++) {
    last = await fetchStatus(oembed);
    if (last.status !== 0) break;
    await new Promise(r => setTimeout(r, 500 * (attempt + 1)));
  }
  if (last.status === 200) return { id, state: 'ok' };
  if (last.status === 401) return { id, state: 'broken', reason: 'embedding_disabled' };
  if (last.status === 404) return { id, state: 'broken', reason: 'not_found' };
  if (last.status === 0) return { id, state: 'unknown', reason: `network:${last.error}` };
  return { id, state: 'unknown', reason: `http:${last.status}` };
}

async function runWithConcurrency(items, worker, concurrency) {
  const results = [];
  let cursor = 0;
  const total = items.length;
  let done = 0;
  async function next() {
    while (cursor < total) {
      const i = cursor++;
      const r = await worker(items[i], i);
      results[i] = r;
      done++;
      if (done % 25 === 0 || done === total) {
        process.stderr.write(`  checked ${done}/${total}\n`);
      }
    }
  }
  await Promise.all(Array.from({ length: concurrency }, next));
  return results;
}

function formatReport(idToLocations, results) {
  const byState = { ok: [], broken: [], unknown: [] };
  for (const r of results) byState[r.state].push(r);

  const lines = [];
  lines.push(`# YouTube Video Verification Report`);
  lines.push('');
  lines.push(`- Unique IDs scanned: **${results.length}**`);
  lines.push(`- Working: **${byState.ok.length}**`);
  lines.push(`- Broken: **${byState.broken.length}**`);
  lines.push(`- Unknown (network errors): **${byState.unknown.length}**`);
  lines.push('');

  if (byState.broken.length > 0) {
    lines.push(`## Broken videos (${byState.broken.length})`);
    lines.push('');
    for (const r of byState.broken) {
      const locs = idToLocations.get(r.id) || [];
      lines.push(`### \`${r.id}\` — ${r.reason}`);
      lines.push(`https://www.youtube.com/watch?v=${r.id}`);
      lines.push('');
      for (const l of locs) {
        lines.push(`- \`${l.file}:${l.line}\` — ${'`'}${l.snippet}${'`'}`);
      }
      lines.push('');
    }
  }

  if (byState.unknown.length > 0) {
    lines.push(`## Unknown (could not verify) (${byState.unknown.length})`);
    lines.push('');
    for (const r of byState.unknown.slice(0, 20)) {
      lines.push(`- \`${r.id}\` — ${r.reason}`);
    }
    if (byState.unknown.length > 20) lines.push(`- ... and ${byState.unknown.length - 20} more`);
    lines.push('');
  }

  return { markdown: lines.join('\n'), byState };
}

(async () => {
  const args = process.argv.slice(2);
  const jsonIdx = args.indexOf('--json');
  const jsonOut = jsonIdx >= 0 ? args[jsonIdx + 1] : null;

  process.stderr.write('Scanning files...\n');
  const files = collectFiles();
  process.stderr.write(`  ${files.length} source files\n`);

  const idToLocations = extractIds(files);
  const ids = [...idToLocations.keys()];
  process.stderr.write(`  ${ids.length} unique YouTube IDs\n`);
  process.stderr.write(`Verifying via oEmbed (concurrency=${CONCURRENCY})...\n`);

  const results = await runWithConcurrency(ids, checkId, CONCURRENCY);
  const { markdown, byState } = formatReport(idToLocations, results);

  process.stdout.write(markdown + '\n');

  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, markdown + '\n');
  }
  if (jsonOut) {
    const payload = {
      scannedAt: new Date().toISOString(),
      totals: { scanned: results.length, ok: byState.ok.length, broken: byState.broken.length, unknown: byState.unknown.length },
      broken: byState.broken.map(r => ({ id: r.id, reason: r.reason, locations: idToLocations.get(r.id) || [] })),
      unknown: byState.unknown.map(r => ({ id: r.id, reason: r.reason })),
    };
    fs.writeFileSync(jsonOut, JSON.stringify(payload, null, 2));
    process.stderr.write(`Wrote ${jsonOut}\n`);
  }

  // Always exit 0 — this is informational, not a gate.
  process.exit(0);
})();
