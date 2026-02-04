#!/usr/bin/env node
/**
 * Fix all drummer image fields to use local slug-based paths
 */

const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'api', 'drummers', 'index.js');
let content = fs.readFileSync(indexPath, 'utf8');

function slugify(name) {
  return name.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+$/, '')
    .replace(/^-+/, '');
}

// Extract drummers
const match = content.match(/const drummers = (\[[\s\S]*?\n\]);/);
const drummers = eval(match[1]);

console.log(`Processing ${drummers.length} drummers`);

// Create replacement map: id -> slug
const idToSlug = {};
for (const d of drummers) {
  idToSlug[d.id] = slugify(d.name);
}

// Process each drummer to update their image field
let updatedCount = 0;
for (const d of drummers) {
  const slug = idToSlug[d.id];
  const localPath = `/images/drummers/${slug}.jpg`;
  
  // Skip if already using correct local path
  if (d.image === localPath) {
    continue;
  }
  
  // Find this drummer's section and update the image field
  // Pattern: id: X, followed eventually by image: 'something'
  const drummerPattern = new RegExp(
    `(id: ${d.id},\\s*\\n\\s*name: '${d.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'[\\s\\S]*?image: )'[^']*'`,
    'g'
  );
  
  const before = content;
  content = content.replace(drummerPattern, `$1'${localPath}'`);
  
  if (content !== before) {
    updatedCount++;
    console.log(`[${d.id}] ${d.name} -> ${slug}.jpg`);
  }
}

fs.writeFileSync(indexPath, content);

// Verify
const afterMatch = content.match(/const drummers = (\[[\s\S]*?\n\]);/);
const afterDrummers = eval(afterMatch[1]);

let wikiCount = 0;
let localCount = 0;
for (const d of afterDrummers) {
  if (d.image && d.image.includes('wikimedia.org')) wikiCount++;
  if (d.image && d.image.startsWith('/images/drummers/')) localCount++;
}

console.log(`\nResults:`);
console.log(`  Updated: ${updatedCount}`);
console.log(`  Local paths: ${localCount}`);
console.log(`  Remaining wikimedia URLs: ${wikiCount}`);
