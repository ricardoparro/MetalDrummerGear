#!/usr/bin/env node
/**
 * Script to download all drummer photos from Wikipedia Commons
 * and update the drummers index to use local paths.
 * 
 * Photos for drummers 51-60 are sourced from Wikipedia Commons.
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'drummers');

// Photos for drummers 51-60 (found on Wikipedia Commons)
const MISSING_PHOTOS = {
  51: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Cannibal_Corpse_-_Wacken_Open_Air_2022-3714.jpg', // Paul Mazurkiewicz
  52: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Mike_Mangini_2012.jpg', // Mike Mangini
  53: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Obscura_-_7_Summers_Festival_2016_-_07.jpg', // Matt Garstka (photo of Obscura drummer)
  54: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Arch_Enemy_-_Wacken_Open_Air_2016_03.jpg', // Daniel Erlandsson
  55: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Jaska_Raatikainen_2007.jpg', // Jaska Raatikainen
  56: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Obscura-Metaldays2014-09.jpg', // Hannes Grossmann
  57: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Dimmu_Borgir_Nova_Rock_2019_%285%29.jpg', // Daray
  58: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Amon_Amarth_Rockharz_2019_15.jpg', // Jocke Wallgren
  59: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Tim_Yeung.jpg', // Tim Yeung
  60: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Dying_Fetus_Deathfeast_2009.jpg', // Kevin Talley
};

function slugify(name) {
  return name.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+$/, '')
    .replace(/^-+/, '');
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const protocol = url.startsWith('https') ? https : http;
    
    const request = protocol.get(url, {
      headers: {
        'User-Agent': 'MetalDrummerGear/1.0 (https://metaldrummergear.com; contact@metaldrummergear.com) Node.js'
      }
    }, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        reject(new Error(`HTTP ${response.statusCode} for ${url}`));
        return;
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    });
    
    request.on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

function resizeImage(imagePath, maxWidth = 800) {
  try {
    // Get current dimensions
    const result = execSync(`sips -g pixelWidth "${imagePath}"`, { encoding: 'utf8' });
    const widthMatch = result.match(/pixelWidth:\s*(\d+)/);
    if (widthMatch) {
      const currentWidth = parseInt(widthMatch[1]);
      if (currentWidth > maxWidth) {
        execSync(`sips --resampleWidth ${maxWidth} "${imagePath}"`, { stdio: 'pipe' });
        console.log(`  Resized to ${maxWidth}px width`);
      }
    }
  } catch (err) {
    console.log(`  Could not resize: ${err.message}`);
  }
}

async function main() {
  // Read the drummers index
  const indexPath = path.join(__dirname, '..', 'api', 'drummers', 'index.js');
  let content = fs.readFileSync(indexPath, 'utf8');
  
  // Extract the drummers array
  const match = content.match(/const drummers = (\[[\s\S]*?\n\]);/);
  if (!match) {
    console.error('Could not extract drummers array');
    process.exit(1);
  }
  
  const drummers = eval(match[1]);
  console.log(`Found ${drummers.length} drummers`);
  
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  // Process each drummer
  const attributions = [];
  for (const drummer of drummers) {
    const slug = slugify(drummer.name);
    const outputFile = path.join(OUTPUT_DIR, `${slug}.jpg`);
    
    // Get photo URL (from existing data or MISSING_PHOTOS)
    let photoUrl = drummer.photos && drummer.photos[0] ? drummer.photos[0] : null;
    if (!photoUrl && MISSING_PHOTOS[drummer.id]) {
      photoUrl = MISSING_PHOTOS[drummer.id];
    }
    
    if (!photoUrl) {
      console.log(`[${drummer.id}] ${drummer.name}: NO PHOTO URL`);
      continue;
    }
    
    console.log(`[${drummer.id}] ${drummer.name} -> ${slug}.jpg`);
    
    // Download if not already exists
    if (!fs.existsSync(outputFile)) {
      try {
        await downloadFile(photoUrl, outputFile);
        console.log(`  Downloaded`);
        
        // Resize to max 800px width
        resizeImage(outputFile);
        
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (err) {
        console.log(`  FAILED: ${err.message}`);
        continue;
      }
    } else {
      console.log(`  Already exists`);
    }
    
    // Store attribution
    attributions.push({
      slug,
      name: drummer.name,
      originalUrl: photoUrl
    });
  }
  
  // Write attributions file
  const attributionsPath = path.join(OUTPUT_DIR, 'ATTRIBUTIONS.md');
  let attrContent = '# Drummer Photo Attributions\n\n';
  attrContent += 'All photos are from Wikipedia Commons and are used under their respective licenses.\n\n';
  attrContent += '| Drummer | Original URL |\n';
  attrContent += '|---------|-------------|\n';
  for (const attr of attributions) {
    attrContent += `| ${attr.name} | [Source](${attr.originalUrl}) |\n`;
  }
  fs.writeFileSync(attributionsPath, attrContent);
  console.log(`\nWrote attributions to ${attributionsPath}`);
  
  // Now update the index.js file
  console.log('\nUpdating api/drummers/index.js...');
  
  // Create a map of id -> slug for updating
  const slugMap = {};
  for (const drummer of drummers) {
    slugMap[drummer.id] = slugify(drummer.name);
  }
  
  // Update photos arrays to use local paths and keep original as comment
  let updatedContent = content;
  
  for (const drummer of drummers) {
    const slug = slugMap[drummer.id];
    let photoUrl = drummer.photos && drummer.photos[0] ? drummer.photos[0] : null;
    if (!photoUrl && MISSING_PHOTOS[drummer.id]) {
      photoUrl = MISSING_PHOTOS[drummer.id];
    }
    
    if (!photoUrl) continue;
    
    // Find and replace the photos array for this drummer
    // Pattern: photos: ['<url>'] or photos: [\n      '<url>'\n    ]
    const photoPatterns = [
      new RegExp(`(photos:\\s*\\[\\s*)'${escapeRegex(photoUrl)}'(\\s*\\])`, 'g'),
      new RegExp(`(photos:\\s*\\[\\s*\\n\\s*)'${escapeRegex(photoUrl)}'(\\s*\\n\\s*\\])`, 'g')
    ];
    
    for (const pattern of photoPatterns) {
      updatedContent = updatedContent.replace(
        pattern,
        `$1'/images/drummers/${slug}.webp' // Original: ${photoUrl}$2`
      );
    }
  }
  
  // Also add photos for drummers 51-60 that have empty arrays
  for (const [idStr, url] of Object.entries(MISSING_PHOTOS)) {
    const id = parseInt(idStr);
    const drummer = drummers.find(d => d.id === id);
    if (drummer) {
      const slug = slugify(drummer.name);
      // Replace empty photos array with the new local path
      const emptyPattern = new RegExp(`(id:\\s*${id},[\\s\\S]*?photos:\\s*\\[)\\s*\\]`, 'g');
      if (updatedContent.match(emptyPattern)) {
        updatedContent = updatedContent.replace(
          emptyPattern,
          `$1\n      '/images/drummers/${slug}.webp' // Original: ${url}\n    ]`
        );
      }
    }
  }
  
  // Update image field to use slug-based names
  for (const drummer of drummers) {
    const slug = slugMap[drummer.id];
    updatedContent = updatedContent.replace(
      new RegExp(`(id:\\s*${drummer.id},[\\s\\S]*?image:\\s*)'/images/drummers/${drummer.id}\\.webp'`, 'g'),
      `$1'/images/drummers/${slug}.webp'`
    );
  }
  
  fs.writeFileSync(indexPath, updatedContent);
  console.log('Updated api/drummers/index.js');
  
  // Clean up old numbered images
  console.log('\nCleaning up old numbered images...');
  const files = fs.readdirSync(OUTPUT_DIR);
  for (const file of files) {
    if (/^\d+\.jpg$/.test(file)) {
      const oldPath = path.join(OUTPUT_DIR, file);
      fs.unlinkSync(oldPath);
      console.log(`  Removed ${file}`);
    }
  }
  
  console.log('\nDone!');
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
