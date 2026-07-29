#!/usr/bin/env node
// CI guard: parse every api/**/*.js file with `node --check` before merge.
//
// Why this exists: #5126 shipped a duplicate top-level `const
// LEGACY_ARTICLE_SLUG_REDIRECTS` in api/meta/[...path].js (two Roadie PRs
// implementing the same issue, merged ~1 minute apart with no conflict) and
// caused a hard SyntaxError in production for ~23h across every crawler UA
// — with zero CI signal, because no pull_request-triggered workflow parsed
// or imported anything under api/**. `verify-data-modules.yml` only covers
// packages/frontend/data/**. This is the api/ sibling: a pure syntax gate,
// cheap and fast, that would have caught this specific class of failure
// instantly.

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const API_DIR = path.join(ROOT, 'api');

function collectJsFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...collectJsFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      out.push(full);
    }
  }
  return out;
}

const files = collectJsFiles(API_DIR).sort();

if (!files.length) {
  console.error(`✗ no .js files found under ${path.relative(ROOT, API_DIR)}/ — check ROOT/API_DIR paths`);
  process.exit(1);
}

let failed = false;
for (const file of files) {
  const rel = path.relative(ROOT, file);
  const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  if (result.status !== 0) {
    console.error(`✗ ${rel}`);
    console.error(result.stderr.trim());
    failed = true;
  } else {
    console.log(`✓ ${rel}`);
  }
}

console.log(`\n${files.length} file(s) checked under api/`);
process.exit(failed ? 1 : 0);
