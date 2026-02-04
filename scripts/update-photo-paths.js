#!/usr/bin/env node
/**
 * Update all drummer photo paths to use local storage
 */

const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'api', 'drummers', 'index.js');

function slugify(name) {
  return name.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+$/, '')
    .replace(/^-+/, '');
}

// Read file
let content = fs.readFileSync(indexPath, 'utf8');

// Extract drummers array for name mapping
const match = content.match(/const drummers = (\[[\s\S]*?\n\]);/);
if (!match) {
  console.error('Could not extract drummers array');
  process.exit(1);
}

const drummers = eval(match[1]);
console.log(`Processing ${drummers.length} drummers`);

// Photo URLs for drummers 51-60 (found from Wikipedia)
const missingPhotoUrls = {
  51: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Cannibal_Corpse_-_2024275214539_2024-10-01_Cannibal_Corpse_-_Sven_-_1D_X_MK_II_-_1326_-_AK8I0150_%28cropped%29.jpg',
  52: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Mike_Mangini_at_Moscow_12_Jul_2011_%28cropped%29.jpg',
  53: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Matt_Garstka_-_2014_NAMM_Show_%28cropped%29.jpg',
  54: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/2023_Rock_im_Park_-_Arch_Enemy_-_Daniel_Erlandsson_-_by_2eight_-_ZSC4502.jpg',
  55: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Jaska_Raatikainen_-_Ilosaarirock_2009_2.jpg',
  56: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Hannes_wiki2.jpg',
  57: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Dariusz_Daray_Brzozowski_Hunter.JPG',
  58: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Amon_Amarth_Rockharz_2019_15.jpg',
  59: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/DevineHerecy002_sharp.jpg',
  60: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Battlecross_Mayhemfest_2013_Dallas.jpg'
};

// Build replacement map
const replacements = [];

for (const drummer of drummers) {
  const slug = slugify(drummer.name);
  const localPath = `/images/drummers/${slug}.jpg`;
  
  // Get original URL (either from data or missing photos map)
  let originalUrl = drummer.photos && drummer.photos[0] ? drummer.photos[0] : null;
  if (!originalUrl && missingPhotoUrls[drummer.id]) {
    originalUrl = missingPhotoUrls[drummer.id];
  }
  
  if (originalUrl && originalUrl.includes('wikimedia.org')) {
    replacements.push({
      id: drummer.id,
      name: drummer.name,
      slug,
      originalUrl,
      localPath
    });
  }
}

console.log(`Found ${replacements.length} URLs to replace`);

// Replace each photo URL with local path
for (const r of replacements) {
  // Escape special regex characters in URL
  const escapedUrl = r.originalUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // Replace the URL in photos array, keeping original as comment
  const regex = new RegExp(`'${escapedUrl}'(?!\\s*//\\s*Original:)`, 'g');
  const newValue = `'${r.localPath}' // Original: ${r.originalUrl}`;
  
  const before = content;
  content = content.replace(regex, newValue);
  
  if (content !== before) {
    console.log(`[${r.id}] ${r.name} - Updated`);
  }
}

// Also update image field to use slug-based names
for (const drummer of drummers) {
  const slug = slugify(drummer.name);
  const numericPattern = new RegExp(`(image: )'\/images\/drummers\/${drummer.id}\\.jpg'`, 'g');
  content = content.replace(numericPattern, `$1'/images/drummers/${slug}.jpg'`);
}

// Handle drummers 51-60 that might have empty photos arrays
for (const [idStr, url] of Object.entries(missingPhotoUrls)) {
  const id = parseInt(idStr);
  const drummer = drummers.find(d => d.id === id);
  if (drummer) {
    const slug = slugify(drummer.name);
    const localPath = `/images/drummers/${slug}.jpg`;
    
    // Look for photos: [] pattern for this drummer
    const emptyPhotosPattern = new RegExp(
      `(id: ${id},[\\s\\S]*?photos: \\[)(\\s*\\])`,
      'g'
    );
    
    if (content.match(emptyPhotosPattern)) {
      content = content.replace(
        emptyPhotosPattern,
        `$1\n      '${localPath}' // Original: ${url}\n    ]`
      );
      console.log(`[${id}] ${drummer.name} - Added local photo path`);
    }
  }
}

// Write updated content
fs.writeFileSync(indexPath, content);

// Verify
const remaining = (content.match(/https:\/\/upload\.wikimedia\.org/g) || []).length;
console.log(`\nRemaining wikimedia URLs: ${remaining}`);

if (remaining > 0) {
  // These should all be in comments now
  const inComments = (content.match(/\/\/.*https:\/\/upload\.wikimedia\.org/g) || []).length;
  console.log(`In comments: ${inComments}`);
  console.log(`Outside comments: ${remaining - inComments}`);
}

console.log('\nDone!');
