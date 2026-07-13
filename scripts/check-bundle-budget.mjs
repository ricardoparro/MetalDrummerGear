// Perf gate (#4410, phase 3 of epic #4407): fail CI if the homepage-critical
// bundle (index-*.js + __common-*.js) grows past the budget in perf-budgets.json.
// Run after `bash scripts/build.sh`.
import fs from 'node:fs';
import path from 'node:path';

const REPO_ROOT = path.resolve(import.meta.dirname, '..');
const JS_DIR = path.join(REPO_ROOT, 'packages/frontend/dist/_expo/static/js/web');
const BUDGETS = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'perf-budgets.json'), 'utf8')).bundle;

function findChunk(prefix) {
  const files = fs.readdirSync(JS_DIR);
  const matches = files.filter(f => f.startsWith(prefix) && f.endsWith('.js'));
  if (matches.length !== 1) {
    throw new Error(`Expected exactly one "${prefix}*.js" chunk in ${JS_DIR}, found ${matches.length}: ${matches.join(', ')}`);
  }
  return matches[0];
}

const indexFile = findChunk('index-');
const commonFile = findChunk('__common-');
const indexBytes = fs.statSync(path.join(JS_DIR, indexFile)).size;
const commonBytes = fs.statSync(path.join(JS_DIR, commonFile)).size;
const totalBytes = indexBytes + commonBytes;

function kb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

const pctOfBudget = ((totalBytes / BUDGETS.budgetRawBytes) * 100).toFixed(1);

const table = [
  '| Chunk | Size |',
  '|---|---|',
  `| \`${indexFile}\` | ${kb(indexBytes)} |`,
  `| \`${commonFile}\` | ${kb(commonBytes)} |`,
  `| **Total** | **${kb(totalBytes)}** |`,
  `| Baseline (post-phase-2) | ${kb(BUDGETS.baselineRawBytes)} |`,
  `| Warn threshold | ${kb(BUDGETS.warnRawBytes)} |`,
  `| Budget (fail threshold) | ${kb(BUDGETS.budgetRawBytes)} |`,
  `| % of budget | ${pctOfBudget}% |`,
].join('\n');

console.log(table);

const summaryPath = process.env.GITHUB_STEP_SUMMARY;
if (summaryPath) {
  fs.appendFileSync(summaryPath, `## Bundle budget\n\n${table}\n\n`);
}

if (totalBytes > BUDGETS.budgetRawBytes) {
  const overBy = totalBytes - BUDGETS.budgetRawBytes;
  console.error(`\n❌ Bundle budget exceeded by ${kb(overBy)} (${pctOfBudget}% of budget). Raise perf-budgets.json's bundle.budgetRawBytes only as an explicit, reviewed change.`);
  process.exit(1);
}

if (totalBytes > BUDGETS.warnRawBytes) {
  console.warn(`\n⚠️  Bundle size is within budget but above the warn threshold (${kb(BUDGETS.warnRawBytes)}).`);
}

console.log('\n✅ Bundle within budget.');
