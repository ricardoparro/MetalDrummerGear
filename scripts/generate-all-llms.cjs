#!/usr/bin/env node
// Single entry point for local, CI and deployment generation. Existing files
// remain inputs where a generator explicitly preserves hand-authored sections.
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const ROOT = path.join(__dirname, '..');
const STAMP = /((?:last[ _-]?updated|^#\s*generated)[:*\s"']*)(\d{4}-\d{2}-\d{2})/gim;

function normalizeStamps(text) {
  return text.replace(STAMP, '$1YYYY-MM-DD');
}

function preserveUnchangedContent(previous, generated) {
  // Only retain the previous stamp when the entire document is unchanged.
  // An actual edit keeps the generator's new date; never normalize prose dates.
  return previous !== undefined && normalizeStamps(previous) === normalizeStamps(generated)
    ? previous : generated;
}

function outputFiles(root) {
  const files = [];
  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const file = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(file);
      else if (entry.name.endsWith('.md')) files.push(file);
    }
  }
  walk(path.join(root, 'public/llms'));
  const full = path.join(root, 'public/llms-full.txt');
  if (fs.existsSync(full)) files.push(full);
  return files.sort();
}

function generatorOrder(names) {
  // Profiles discover sibling outputs on disk; articles/guides discover profile
  // mirrors; the index counts guides and discovers article mirrors. Run these
  // consumers after their producers, including when new entities are added.
  const last = ['generate-llms-drummers.cjs', 'generate-llms-articles.cjs',
    'generate-llms-genre-gear-guides.cjs', 'generate-llms-index.cjs'];
  return [...names.filter(name => !last.includes(name)).sort(),
    ...last.filter(name => names.includes(name))];
}

function main() {
  const previous = new Map(outputFiles(ROOT).map(file => [file, fs.readFileSync(file, 'utf8')]));
  const generators = generatorOrder(fs.readdirSync(__dirname)
    .filter(name => /^generate-llms-.*\.cjs$/.test(name)));
  for (const script of generators) {
    execFileSync(process.execPath, [path.join(__dirname, script)], { cwd: ROOT, stdio: 'inherit' });
  }
  let retained = 0;
  for (const file of outputFiles(ROOT)) {
    const generated = fs.readFileSync(file, 'utf8');
    const stable = preserveUnchangedContent(previous.get(file), generated);
    if (stable !== generated) {
      fs.writeFileSync(file, stable);
      retained++;
    }
  }
  console.log(`Ran all ${generators.length} LLM generators; retained ${retained} unchanged document dates.`);
}

if (require.main === module) main();
module.exports = { generatorOrder, normalizeStamps, outputFiles, preserveUnchangedContent };
