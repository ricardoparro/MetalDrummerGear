#!/usr/bin/env node
// Scans the repo for YouTube video IDs and reports which are broken.
// Verifies via YouTube's oEmbed endpoint (200 = working, 401 = embedding
// disabled, 404 = removed/private). Run locally or in CI from a host that
// has network egress to youtube.com (the agent sandbox does not).
//
// Usage:
//   node scripts/verify-youtube-ids.cjs            # scan and report
//   node scripts/verify-youtube-ids.cjs --json out.json  # also write JSON
//   node scripts/verify-youtube-ids.cjs --create-issues  # open one GitHub issue per broken video
//
// --create-issues requires GITHUB_TOKEN and GITHUB_REPOSITORY (set by Actions).
// Issues are tagged with `broken-video` and an id-specific marker so the script
// is idempotent: re-runs do not create duplicates, and issues for IDs that
// became OK again are closed automatically.

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

function ghRequest(method, path, body) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPOSITORY;
  if (!token || !repo) throw new Error('GITHUB_TOKEN and GITHUB_REPOSITORY must be set');
  const data = body ? JSON.stringify(body) : null;
  const opts = {
    method,
    hostname: 'api.github.com',
    path: path.replace('{repo}', repo),
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'metalforge-youtube-verifier/1.0',
    },
  };
  if (data) {
    opts.headers['Content-Type'] = 'application/json';
    opts.headers['Content-Length'] = Buffer.byteLength(data);
  }
  return new Promise((resolve, reject) => {
    const req = https.request(opts, (res) => {
      let chunks = '';
      res.on('data', (c) => chunks += c);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(chunks ? JSON.parse(chunks) : null);
        } else {
          reject(new Error(`GitHub API ${method} ${path} → ${res.statusCode}: ${chunks.slice(0, 300)}`));
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

function markerFor(id) { return `<!-- broken-video-id:${id} -->`; }
const UMBRELLA_MARKER = '<!-- broken-video-umbrella -->';

async function ensureLabel(name, color, description) {
  try {
    await ghRequest('POST', '/repos/{repo}/labels', { name, color, description });
  } catch (e) {
    // 422 = already exists, that's fine
    if (!String(e.message).includes('422')) throw e;
  }
}

async function findUmbrellaIssue() {
  const repo = process.env.GITHUB_REPOSITORY;
  const q = encodeURIComponent(`repo:${repo} is:issue is:open label:broken-video "${UMBRELLA_MARKER}" in:body`);
  const res = await ghRequest('GET', `/search/issues?q=${q}`);
  return res.items && res.items.length > 0 ? res.items[0] : null;
}

function buildUmbrellaBody(brokenList, idToLocations) {
  const lines = [];
  lines.push(UMBRELLA_MARKER);
  lines.push('');
  lines.push(`**${brokenList.length} YouTube videos** are broken (oEmbed 401/404). Verified by \`.github/workflows/verify-youtube.yml\`.`);
  lines.push('');
  lines.push(`This is an **umbrella issue** — a single PR removing all listed IDs closes it. The verifier re-opens / re-uses this issue on the next run.`);
  lines.push('');
  lines.push(`## Broken IDs`);
  lines.push('');
  lines.push(`| ID | Reason | Locations | Watch URL |`);
  lines.push(`|---|---|---|---|`);
  for (const r of brokenList) {
    const locs = idToLocations.get(r.id) || [];
    const locStr = locs.map(l => `\`${l.file}:${l.line}\``).join('<br>') || '_unknown_';
    const reason = r.reason === 'embedding_disabled' ? 'embedding disabled (401)'
                : r.reason === 'not_found' ? 'not found (404)'
                : r.reason;
    lines.push(`| \`${r.id}\` | ${reason} | ${locStr} | [▶](https://www.youtube.com/watch?v=${r.id}) |`);
  }
  lines.push('');
  lines.push(`## How to fix`);
  lines.push('');
  lines.push(`Same pattern as PR #911 and #944:`);
  lines.push(`1. For each ID in the table, remove the matching \`{ youtubeId: '<id>', ... }\` line in the listed file.`);
  lines.push(`2. \`node --check\` the touched files.`);
  lines.push(`3. Empty \`videos: []\` arrays render-guard themselves — no further work needed.`);
  lines.push(`4. Open one PR with \`Closes #<this-issue>\`.`);
  lines.push('');
  lines.push(`When all IDs in this list start working again, this issue closes automatically.`);
  return lines.join('\n');
}

async function closeStaleIndividualIssues(brokenIds) {
  // Back-compat: close any per-ID broken-video issues created by older script versions.
  // (We no longer create those — only the umbrella.)
  const repo = process.env.GITHUB_REPOSITORY;
  let closed = 0;
  try {
    const q = encodeURIComponent(`repo:${repo} is:issue is:open label:broken-video`);
    const res = await ghRequest('GET', `/search/issues?q=${q}&per_page=100`);
    for (const issue of (res.items || [])) {
      const idMatch = (issue.body || '').match(/<!-- broken-video-id:([A-Za-z0-9_-]{11}) -->/);
      if (!idMatch) continue;
      const id = idMatch[1];
      // Close if the ID is no longer broken (works for old scheme).
      if (!brokenIds.has(id)) {
        await ghRequest('PATCH', `/repos/{repo}/issues/${issue.number}`, {
          state: 'closed',
          state_reason: 'completed',
        });
        await ghRequest('POST', `/repos/{repo}/issues/${issue.number}/comments`, {
          body: `Closing automatically — \`${id}\` is no longer flagged as broken by \`verify-youtube\`.`,
        });
        closed++;
      }
    }
  } catch (e) {
    process.stderr.write(`  close-sweep (individual) failed: ${e.message}\n`);
  }
  return closed;
}

async function syncIssues(idToLocations, results) {
  await ensureLabel('broken-video', 'd73a4a', 'Broken YouTube video reference detected by verify-youtube workflow');
  await ensureLabel('ai-fix', '7057ff', 'Issues Ralph can implement automatically');

  const brokenList = results.filter(r => r.state === 'broken')
    .sort((a, b) => a.id.localeCompare(b.id));
  const brokenIds = new Set(brokenList.map(r => r.id));

  // Sweep legacy per-ID issues regardless of the umbrella outcome.
  const closedIndividual = await closeStaleIndividualIssues(brokenIds);

  const existing = await findUmbrellaIssue();

  if (brokenList.length === 0) {
    if (existing) {
      try {
        await ghRequest('PATCH', `/repos/{repo}/issues/${existing.number}`, {
          state: 'closed',
          state_reason: 'completed',
        });
        await ghRequest('POST', `/repos/{repo}/issues/${existing.number}/comments`, {
          body: `Closing automatically — all previously broken YouTube videos are working again.`,
        });
        process.stderr.write(`Umbrella issue #${existing.number} closed (0 broken)\n`);
      } catch (e) {
        process.stderr.write(`  failed to close umbrella: ${e.message}\n`);
      }
    } else {
      process.stderr.write('No broken videos, no existing umbrella — nothing to do.\n');
    }
    process.stderr.write(`Issues: legacy_closed=${closedIndividual}\n`);
    return { opened: 0, updated: 0, skipped: 0, closed: closedIndividual };
  }

  const body = buildUmbrellaBody(brokenList, idToLocations);
  const title = `${brokenList.length} broken YouTube videos detected`;

  let opened = 0, updated = 0, skipped = 0;
  try {
    if (existing) {
      if (existing.body !== body || existing.title !== title) {
        await ghRequest('PATCH', `/repos/{repo}/issues/${existing.number}`, { title, body });
        updated++;
        process.stderr.write(`Umbrella issue #${existing.number} updated (${brokenList.length} broken)\n`);
      } else {
        skipped++;
        process.stderr.write(`Umbrella issue #${existing.number} unchanged (${brokenList.length} broken)\n`);
      }
    } else {
      const created = await ghRequest('POST', `/repos/{repo}/issues`, {
        title,
        body,
        labels: ['broken-video', 'ai-fix'],
      });
      opened++;
      process.stderr.write(`Umbrella issue #${created.number} created (${brokenList.length} broken)\n`);
    }
  } catch (e) {
    process.stderr.write(`  failed to sync umbrella: ${e.message}\n`);
  }

  process.stderr.write(`Issues: opened=${opened} updated=${updated} skipped=${skipped} legacy_closed=${closedIndividual}\n`);
  return { opened, updated, skipped, closed: closedIndividual };
}

(async () => {
  const args = process.argv.slice(2);
  const jsonIdx = args.indexOf('--json');
  const jsonOut = jsonIdx >= 0 ? args[jsonIdx + 1] : null;
  const createIssues = args.includes('--create-issues');

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

  if (createIssues) {
    process.stderr.write('Syncing GitHub issues...\n');
    await syncIssues(idToLocations, results);
  }

  // Always exit 0 — this is informational, not a gate.
  process.exit(0);
})();
