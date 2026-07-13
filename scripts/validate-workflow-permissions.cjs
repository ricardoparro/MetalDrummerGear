#!/usr/bin/env node
// CI guard against the `workflows: write` class of bug (#4515, #4560): that
// key looks like a plausible GITHUB_TOKEN permission scope (it isn't — GitHub
// Actions has no `workflows` permission; editing files under
// .github/workflows/** requires a PAT with the `workflow` OAuth scope
// instead) but the Actions YAML parser rejects it outright, so the *entire
// run* fails at startup with zero jobs executed. This has broken
// roadie-night-fleet.yml twice already from hand-edits via the GitHub web UI.
// Scan every workflow file's `permissions:` block and fail fast on any key
// that isn't a real GITHUB_TOKEN scope, so this ships as a red PR check
// instead of a silent 0s failure discovered hours later by the watchdog.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const WORKFLOWS_DIR = path.join(ROOT, '.github', 'workflows');

// https://docs.github.com/en/actions/security-for-github-actions/security-guides/automatic-token-authentication#permissions-for-the-github_token
const VALID_PERMISSION_KEYS = new Set([
  'actions', 'attestations', 'checks', 'contents', 'deployments',
  'discussions', 'id-token', 'issues', 'packages', 'pages',
  'pull-requests', 'repository-projects', 'security-events', 'statuses',
]);

const VALID_SCALAR_VALUES = new Set(['read-all', 'write-all', 'none']);

function findPermissionBlocks(lines) {
  const blocks = [];
  for (let i = 0; i < lines.length; i++) {
    const m = /^(\s*)permissions:\s*(.*)$/.exec(lines[i]);
    if (!m) continue;
    const [, indent, inlineValue] = m;
    if (inlineValue.trim()) {
      // Scalar form, e.g. `permissions: read-all`.
      blocks.push({ line: i + 1, entries: [{ key: inlineValue.trim(), line: i + 1, scalar: true }] });
      continue;
    }
    const entries = [];
    for (let j = i + 1; j < lines.length; j++) {
      const entryMatch = /^(\s*)([\w-]+):/.exec(lines[j]);
      if (!entryMatch) {
        if (lines[j].trim() === '') continue;
        break;
      }
      if (entryMatch[1].length <= indent.length) break;
      entries.push({ key: entryMatch[2], line: j + 1, scalar: false });
    }
    blocks.push({ line: i + 1, entries });
  }
  return blocks;
}

function validateFile(filePath) {
  const source = fs.readFileSync(filePath, 'utf8');
  const lines = source.split('\n');
  const errors = [];
  for (const block of findPermissionBlocks(lines)) {
    for (const entry of block.entries) {
      const valid = entry.scalar
        ? VALID_SCALAR_VALUES.has(entry.key)
        : VALID_PERMISSION_KEYS.has(entry.key);
      if (!valid) {
        errors.push(`${filePath}:${entry.line}: invalid permissions key "${entry.key}"`);
      }
    }
  }
  return errors;
}

function main() {
  const files = fs.readdirSync(WORKFLOWS_DIR)
    .filter((f) => f.endsWith('.yml') || f.endsWith('.yaml'))
    .map((f) => path.join(WORKFLOWS_DIR, f));

  let errors = [];
  for (const file of files) {
    errors = errors.concat(validateFile(file));
  }

  if (errors.length) {
    console.error('Invalid GitHub Actions `permissions:` keys found:\n');
    for (const err of errors) console.error(`  ${err}`);
    console.error(`\nValid keys: ${[...VALID_PERMISSION_KEYS].sort().join(', ')}`);
    console.error(`Valid scalar values: ${[...VALID_SCALAR_VALUES].sort().join(', ')}`);
    process.exit(1);
  }

  console.log(`OK: ${files.length} workflow file(s), permissions blocks valid.`);
}

main();
