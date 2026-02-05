#!/usr/bin/env node
/**
 * Fix all image URLs to use local paths
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

// Extract drummers array
const match = content.match(/const drummers = (\[[\s\S]*?\n\]);/);
if (!match) {
  console.error('Could not extract drummers array');
  process.exit(1);
}

const drummers = eval(match[1]);
console.log(`Processing ${drummers.length} drummers`);

// Update image fields
let imageUpdates = 0;
for (const drummer of drummers) {
  const slug = slugify(drummer.name);
  const localPath = `/images/drummers/${slug}.jpg`;
  
  // Replace image field with wikimedia URL
  const imageRegex = new RegExp(
    `(id: ${drummer.id},[\\s\\S]*?image: )'https://upload\\.wikimedia\\.org[^']*'`,
    'g'
  );
  
  if (content.match(imageRegex)) {
    content = content.replace(imageRegex, `$1'${localPath}'`);
    imageUpdates++;
    console.log(`[${drummer.id}] ${drummer.name} - Updated image field`);
  }
  
  // Also update image fields with numeric paths
  const numericRegex = new RegExp(
    `(id: ${drummer.id},[\\s\\S]*?image: )'\/images\/drummers\/\\d+\\.jpg'`,
    'g'
  );
  
  if (content.match(numericRegex)) {
    content = content.replace(numericRegex, `$1'${localPath}'`);
    imageUpdates++;
    console.log(`[${drummer.id}] ${drummer.name} - Updated numeric image field`);
  }
}

// Update photos arrays - replace wikimedia URLs with local paths (keep original as comment)
let photosUpdates = 0;
for (const drummer of drummers) {
  const slug = slugify(drummer.name);
  const localPath = `/images/drummers/${slug}.jpg`;
  
  // Find photos array for this drummer and update any wikimedia URLs
  const photosRegex = new RegExp(
    `(id: ${drummer.id},[\\s\\S]*?photos: \\[\\s*)'(https://upload\\.wikimedia\\.org[^']*)'(\\s*\\])`,
    'g'
  );
  
  const matchResult = content.match(photosRegex);
  if (matchResult) {
    // Extract the original URL
    const urlMatch = matchResult[0].match(/'(https:\/\/upload\.wikimedia\.org[^']+)'/);
    if (urlMatch) {
      const originalUrl = urlMatch[1];
      content = content.replace(
        photosRegex,
        `$1'${localPath}' // Original: ${originalUrl}$3`
      );
      photosUpdates++;
      console.log(`[${drummer.id}] ${drummer.name} - Updated photos array`);
    }
  }
}

// Handle empty photos arrays for drummers 51-60
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

for (const [idStr, url] of Object.entries(missingPhotoUrls)) {
  const id = parseInt(idStr);
  const drummer = drummers.find(d => d.id === id);
  if (drummer) {
    const slug = slugify(drummer.name);
    const localPath = `/images/drummers/${slug}.jpg`;
    
    // Find empty photos array
    const emptyPhotosRegex = new RegExp(
      `(id: ${id},[\\s\\S]*?photos: \\[)(\\s*\\])`,
      'g'
    );
    
    if (content.match(emptyPhotosRegex)) {
      content = content.replace(
        emptyPhotosRegex,
        `$1\n      '${localPath}' // Original: ${url}\n    ]`
      );
      console.log(`[${id}] ${drummer.name} - Added photo to empty array`);
    }
  }
}

fs.writeFileSync(indexPath, content);

// Verify
const wikiInPhotos = (content.match(/photos:\s*\[[^\]]*upload\.wikimedia\.org[^\]]*\]/g) || []).length;
const wikiInImage = (content.match(/image:\s*'https:\/\/upload\.wikimedia\.org/g) || []).length;
const wikiInComments = (content.match(/\/\/.*https:\/\/upload\.wikimedia\.org/g) || []).length;

console.log(`\nResults:`);
console.log(`  image fields with wikimedia URLs: ${wikiInImage}`);
console.log(`  photos arrays with wikimedia URLs: ${wikiInPhotos}`);
console.log(`  URLs in comments (attributions): ${wikiInComments}`);

console.log('\nDone!');
