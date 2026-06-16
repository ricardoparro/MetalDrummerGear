#!/usr/bin/env node
/**
 * Rotates `.agents/ceo/decisions-log.md` so it stays gerível.
 *
 * Strategy:
 *   - Keep the last N_KEEP_DAYS days of `## YYYY-MM-DD ...` entries in
 *     decisions-log.md (the "hot" log the CEO reads every run).
 *   - Move everything older to `.agents/ceo/decisions-history/YYYY-MM.md`
 *     (the "cold" archive, one file per month, append-only).
 *   - Add a header pointer at the top of decisions-log.md telling readers
 *     where to find older entries.
 *
 * Idempotent: rerunning when nothing needs rotation is a no-op + exit 0.
 * Safe: writes new files first, only mutates decisions-log.md last.
 *
 * Run frequency: best invoked once per day from a workflow. Cheap to call
 * more often — does nothing when the log is already trimmed.
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const LOG_FILE = path.join(REPO_ROOT, '.agents/ceo/decisions-log.md');
const HISTORY_DIR = path.join(REPO_ROOT, '.agents/ceo/decisions-history');
const N_KEEP_DAYS = 7;

function log(msg) { process.stderr.write(`[rotate] ${msg}\n`); }

if (!fs.existsSync(LOG_FILE)) {
  log('decisions-log.md not found — nothing to rotate.');
  process.exit(0);
}

const text = fs.readFileSync(LOG_FILE, 'utf8');
const lines = text.split('\n');

// Find the header block (everything before the first `## YYYY-MM-DD ...`).
const dateHeading = /^## (\d{4}-\d{2}-\d{2})\b/;
let headerEnd = 0;
for (let i = 0; i < lines.length; i++) {
  if (dateHeading.test(lines[i])) { headerEnd = i; break; }
}
const header = lines.slice(0, headerEnd);

// Parse entries: each runs from its `## YYYY-MM-DD ...` heading to the line
// before the next such heading (or EOF). Lines between entries that are not
// part of an entry's body (e.g. stray `---`) get folded into the preceding
// entry, which matches how the CEO actually writes the log today.
const entries = [];
let cur = null;
for (let i = headerEnd; i < lines.length; i++) {
  const m = lines[i].match(dateHeading);
  if (m) {
    if (cur) entries.push(cur);
    cur = { date: m[1], lines: [lines[i]] };
  } else if (cur) {
    cur.lines.push(lines[i]);
  } else {
    header.push(lines[i]); // shouldn't happen if file is well-formed
  }
}
if (cur) entries.push(cur);

if (entries.length === 0) {
  log('no dated entries found — nothing to rotate.');
  process.exit(0);
}

// Decide cut-off: entries strictly older than (today - N_KEEP_DAYS) move out.
const today = new Date();
today.setUTCHours(0, 0, 0, 0);
const cutoff = new Date(today.getTime() - N_KEEP_DAYS * 24 * 3600 * 1000);

const keepEntries = [];
const moveByMonth = new Map();

for (const e of entries) {
  const d = new Date(e.date + 'T00:00:00Z');
  if (Number.isNaN(d.getTime())) {
    // Malformed date — keep in hot log so it's visible.
    keepEntries.push(e);
    continue;
  }
  if (d.getTime() >= cutoff.getTime()) {
    keepEntries.push(e);
  } else {
    const yyyymm = e.date.slice(0, 7);
    if (!moveByMonth.has(yyyymm)) moveByMonth.set(yyyymm, []);
    moveByMonth.get(yyyymm).push(e);
  }
}

if (moveByMonth.size === 0) {
  log(`all ${entries.length} entries within last ${N_KEEP_DAYS} days — no rotation needed.`);
  process.exit(0);
}

// Write archive files first (additive, low risk).
fs.mkdirSync(HISTORY_DIR, { recursive: true });
let movedCount = 0;
const archivedMonths = [];
for (const [yyyymm, batch] of moveByMonth) {
  const target = path.join(HISTORY_DIR, `${yyyymm}.md`);
  // Append new batch to the archive, preserving any existing content.
  const existing = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : `# CEO Decisions Archive — ${yyyymm}\n\n*Rotated out of decisions-log.md to keep the hot log gerível.*\n\n---\n\n`;
  // De-dupe by date+heading text: skip entries whose first line already
  // appears in the existing archive (so reruns don't double-append).
  const existingHeads = new Set();
  for (const line of existing.split('\n')) {
    if (dateHeading.test(line)) existingHeads.add(line.trim());
  }
  const appendBlocks = [];
  for (const e of batch) {
    const firstLine = e.lines[0].trim();
    if (existingHeads.has(firstLine)) continue;
    appendBlocks.push(e.lines.join('\n').replace(/\n+$/, '') + '\n\n---\n\n');
    movedCount++;
  }
  if (appendBlocks.length === 0) {
    log(`  ${yyyymm}: already archived, skip`);
    continue;
  }
  fs.writeFileSync(target, existing + appendBlocks.join(''));
  archivedMonths.push(`${yyyymm} (+${appendBlocks.length})`);
  log(`  wrote ${target}: +${appendBlocks.length} entries`);
}

if (movedCount === 0) {
  log('all candidate entries already in archive; not touching decisions-log.md.');
  process.exit(0);
}

// Rewrite the hot log: top pointer + last N_KEEP_DAYS of entries.
const archivePointer = [
  '# CEO Decisions Log — MetalForge',
  '',
  '*Record of strategic decisions and reasoning. Hot log: last 7 days. Older entries archived monthly under `.agents/ceo/decisions-history/`.*',
  '',
  `*Auto-rotated by \`.agents/scripts/rotate-decisions-log.cjs\` — last run ${new Date().toISOString().replace('T', ' ').slice(0, 16)} UTC*`,
  '',
  '---',
  '',
];

const newBody = keepEntries
  .map(e => e.lines.join('\n').replace(/\n+$/, '') + '\n\n---\n\n')
  .join('');

fs.writeFileSync(LOG_FILE, archivePointer.join('\n') + newBody);
log(`hot log rewritten: kept ${keepEntries.length} entries, archived ${movedCount} (${archivedMonths.join(', ')}).`);
process.exit(0);
