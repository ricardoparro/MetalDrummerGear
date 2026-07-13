#!/usr/bin/env node
/**
 * Issue #4205: fail CI if committed public/llms/*.md output has drifted from
 * what `npm run generate:llms` currently produces.
 *
 * Run this AFTER `npm run generate:llms` has already overwritten the working
 * tree. It compares the working tree against git HEAD for everything under
 * public/llms/, ignoring the "Last updated: YYYY-MM-DD" stamp every generator
 * writes (that line churns on every run regardless of real content drift —
 * a plain `git diff --exit-code` would fail every single day). New files that
 * generation produces but were never committed, and committed files a
 * generator no longer produces, always count as drift.
 */

const { execFileSync } = require('child_process');

const REPO_ROOT = execFileSync('git', ['rev-parse', '--show-toplevel'], { encoding: 'utf-8' }).trim();
const LLMS_PATH = 'public/llms';

// Lines carrying the volatile "generated today" stamp — the only ones where
// an ISO date is allowed to differ without counting as real drift.
const DATE_STAMP_LINE = /last[ _-]?updated|^#\s*generated\b/i;
const ISO_DATE = /\d{4}-\d{2}-\d{2}/g;

function normalizeLine(line) {
  return DATE_STAMP_LINE.test(line) ? line.replace(ISO_DATE, 'YYYY-MM-DD') : line;
}

function git(args) {
  return execFileSync('git', args, { cwd: REPO_ROOT, encoding: 'utf-8', maxBuffer: 1024 * 1024 * 64 });
}

// Diffs one modified file with zero context and reports whether every
// changed hunk is *only* a date-stamp substitution.
function isDateOnlyChange(path) {
  const diff = git(['diff', '--no-color', '-U0', '--', path]);
  const hunks = diff.split(/^@@.*@@.*$/m).slice(1);
  for (const hunk of hunks) {
    const removed = [];
    const added = [];
    for (const line of hunk.split('\n')) {
      if (line.startsWith('-') && !line.startsWith('---')) removed.push(line.slice(1));
      else if (line.startsWith('+') && !line.startsWith('+++')) added.push(line.slice(1));
    }
    if (removed.length !== added.length) return false;
    for (let i = 0; i < removed.length; i++) {
      if (normalizeLine(removed[i]) !== normalizeLine(added[i])) return false;
    }
  }
  return true;
}

const status = git(['status', '--porcelain', '--', LLMS_PATH])
  .split('\n')
  .filter(Boolean)
  .map(line => ({ code: line.slice(0, 2), path: line.slice(3) }));

const drifted = [];

for (const { code, path } of status) {
  if (code.includes('?')) {
    drifted.push(`  NEW (generated but never committed): ${path}`);
  } else if (code.includes('D')) {
    drifted.push(`  MISSING (committed but no longer generated): ${path}`);
  } else if (!isDateOnlyChange(path)) {
    drifted.push(`  CHANGED: ${path}`);
  }
}

if (drifted.length) {
  console.error(`public/llms/ has drifted from what the generators currently produce (${drifted.length} file(s)):\n`);
  console.error(drifted.join('\n'));
  console.error('\nRun `npm run generate:llms` and commit the results.\n');
  console.error('Full diff:\n');
  console.error(git(['diff', '--no-color', '--', LLMS_PATH]));
  process.exit(1);
}

console.log('public/llms/ is up to date with source data.');
