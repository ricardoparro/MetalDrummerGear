#!/usr/bin/env node
/**
 * Validate packages/frontend/data/techniques.js `masters[].slug` values against
 * the drummer roster (api/drummers/index.js). Issue #4767 (absorbing #4520):
 * a master slug that doesn't resolve to a real roster drummer must never
 * generate a /drummer/<slug> link anywhere — page components or /llms/
 * mirrors. This script is the source of truth for that check; run it in CI
 * or before shipping techniques.js changes.
 *
 * Exit code 1 (and non-empty output) if any master has a non-null slug that
 * does not match a roster drummer.
 */

const fs = require('fs');
const path = require('path');

const techniquesPath = path.join(__dirname, '../packages/frontend/data/techniques.js');
const drummersPath = path.join(__dirname, '../api/drummers/index.js');

function extractTechniques() {
  const content = fs.readFileSync(techniquesPath, 'utf-8');
  const match = content.match(/export const techniques\s*=\s*(\{[\s\S]*?\n\});\s*$/m);
  if (!match) throw new Error('Could not extract techniques object');
  return eval('(' + match[1] + ')');
}

function extractDrummers() {
  const content = fs.readFileSync(drummersPath, 'utf-8');
  const match = content.match(/const drummers\s*=\s*(\[[\s\S]*?\n\]);/);
  if (!match) throw new Error('Could not extract drummers array');
  return eval('(' + match[1] + ')');
}

// Mirrors api/meta/[...path].js _normalizeDrummerSlug — the canonical slug
// derivation used site-wide for /drummer/<slug> resolution.
function normalizeDrummerSlug(name) {
  return name.toLowerCase()
    .replace(/[åä]/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u')
    .replace(/é|è|ê|ë/g, 'e').replace(/í|ì|î|ï/g, 'i').replace(/ó|ò|ô/g, 'o')
    .replace(/ú|ù|û/g, 'u').replace(/ñ/g, 'n').replace(/ß/g, 'ss')
    .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

const techniques = extractTechniques();
const drummers = extractDrummers();
const rosterSlugs = new Set(drummers.map(d => normalizeDrummerSlug(d.name)));

let checked = 0;
let broken = 0;
let nullSlugs = 0;
const issues = [];

for (const technique of Object.values(techniques)) {
  for (const master of technique.masters || []) {
    checked++;
    if (master.slug === null || master.slug === undefined) {
      nullSlugs++;
      continue;
    }
    if (!rosterSlugs.has(master.slug)) {
      broken++;
      issues.push({ technique: technique.slug, name: master.name, slug: master.slug });
    }
  }
}

console.log(`Checked ${checked} master entries across ${Object.keys(techniques).length} techniques.`);
console.log(`  ${checked - nullSlugs - broken} resolve to a real roster drummer.`);
console.log(`  ${nullSlugs} have no roster profile (slug: null — rendered as plain text, no link).`);
console.log(`  ${broken} reference a slug NOT in the roster (would emit a broken /drummer/<slug> link).`);

if (issues.length > 0) {
  console.log('\nBroken slugs:');
  for (const issue of issues) {
    console.log(`  [${issue.technique}] "${issue.name}" -> slug "${issue.slug}" not found in roster`);
  }
  process.exit(1);
}

console.log('\nAll non-null master slugs resolve to real roster drummers. No broken /drummer/<slug> links.');
