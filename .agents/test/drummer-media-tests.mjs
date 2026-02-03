#!/usr/bin/env node
/**
 * Drummer Media Validation Tests
 * Checks that all drummer images and videos are accessible
 */

const BASE_URL = process.env.TEST_URL || 'https://metalforge.io';

// ANSI colors
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

let passed = 0;
let failed = 0;
let warnings = 0;
const failures = [];

function log(status, message) {
  const icon = status === 'pass' ? `${GREEN}✓${RESET}` : 
               status === 'fail' ? `${RED}✗${RESET}` : 
               `${YELLOW}⚠${RESET}`;
  console.log(`${icon} ${message}`);
}

async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

async function checkURL(url, description) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(url, { 
      method: 'HEAD',
      signal: controller.signal,
      headers: {
        'User-Agent': 'MetalForge-MediaTest/1.0'
      }
    });
    
    clearTimeout(timeout);
    
    if (response.ok || response.status === 405) {
      // 405 = HEAD not allowed, but URL exists
      return { ok: true, status: response.status };
    }
    return { ok: false, status: response.status };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

async function testDrummerImages() {
  console.log('\n📷 Testing Drummer Images...\n');
  
  const drummers = await fetchJSON(`${BASE_URL}/api/drummers`);
  const brokenImages = [];
  
  for (const drummer of drummers) {
    // Check main image
    if (drummer.image) {
      const imageUrl = drummer.image.startsWith('http') 
        ? drummer.image 
        : `${BASE_URL}${drummer.image}`;
      
      const result = await checkURL(imageUrl, `${drummer.name} image`);
      
      if (!result.ok) {
        brokenImages.push({
          drummer: drummer.name,
          url: imageUrl,
          error: result.error || `Status ${result.status}`
        });
      }
    }
    
    // Check photos array
    if (drummer.photos && drummer.photos.length > 0) {
      for (const photo of drummer.photos) {
        const result = await checkURL(photo, `${drummer.name} photo`);
        if (!result.ok && result.status !== 429) { // Ignore rate limits
          brokenImages.push({
            drummer: drummer.name,
            url: photo,
            error: result.error || `Status ${result.status}`
          });
        }
      }
    }
  }
  
  if (brokenImages.length === 0) {
    passed++;
    log('pass', `All drummer images accessible (${drummers.length} drummers checked)`);
  } else {
    failed++;
    log('fail', `${brokenImages.length} broken images found:`);
    brokenImages.forEach(img => {
      console.log(`   ${RED}→${RESET} ${img.drummer}: ${img.error}`);
      failures.push(`Image 404: ${img.drummer} - ${img.url}`);
    });
  }
  
  return brokenImages;
}

async function testYouTubeVideos() {
  console.log('\n🎬 Testing YouTube Videos...\n');
  
  const drummerList = await fetchJSON(`${BASE_URL}/api/drummers`);
  const brokenVideos = [];
  let totalVideos = 0;
  
  // Check first 10 drummers (to avoid rate limiting)
  const sampleSize = Math.min(10, drummerList.length);
  console.log(`   Checking videos for ${sampleSize} drummers...\n`);
  
  for (let i = 0; i < sampleSize; i++) {
    const { id, name } = drummerList[i];
    
    try {
      const drummer = await fetchJSON(`${BASE_URL}/api/drummers/${id}`);
      
      if (drummer.videos && drummer.videos.length > 0) {
        for (const video of drummer.videos) {
          totalVideos++;
          if (video.youtubeId) {
            // Check if YouTube video exists via oEmbed API
            const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${video.youtubeId}&format=json`;
            
            try {
              const response = await fetch(oembedUrl);
              if (!response.ok) {
                brokenVideos.push({
                  drummer: drummer.name,
                  title: video.title,
                  youtubeId: video.youtubeId,
                  error: `HTTP ${response.status}`
                });
              }
            } catch (error) {
              brokenVideos.push({
                drummer: drummer.name,
                title: video.title,
                youtubeId: video.youtubeId,
                error: error.message
              });
            }
            
            // Small delay to avoid rate limiting
            await new Promise(r => setTimeout(r, 100));
          }
        }
      }
    } catch (error) {
      console.log(`   ${YELLOW}⚠${RESET} Could not fetch ${name}: ${error.message}`);
    }
  }
  
  if (brokenVideos.length === 0) {
    passed++;
    log('pass', `All ${totalVideos} YouTube videos accessible`);
  } else {
    failed++;
    log('fail', `${brokenVideos.length} broken videos found:`);
    brokenVideos.forEach(vid => {
      console.log(`   ${RED}→${RESET} ${vid.drummer}: "${vid.title}" (${vid.youtubeId}) - ${vid.error}`);
      failures.push(`Video broken: ${vid.drummer} - ${vid.title} (${vid.youtubeId})`);
    });
  }
  
  return brokenVideos;
}

async function testDrummerDataCompleteness() {
  console.log('\n📋 Testing Drummer Data Completeness...\n');
  
  // Get list of drummers
  const drummerList = await fetchJSON(`${BASE_URL}/api/drummers`);
  const incomplete = [];
  
  // Check first 10 drummers in detail (to avoid rate limiting)
  const sampleSize = Math.min(10, drummerList.length);
  console.log(`   Checking ${sampleSize} drummers in detail...\n`);
  
  for (let i = 0; i < sampleSize; i++) {
    const { id, name } = drummerList[i];
    
    try {
      // Fetch full drummer data from individual endpoint
      const drummer = await fetchJSON(`${BASE_URL}/api/drummers/${id}`);
      const missing = [];
      
      if (!drummer.image) missing.push('image');
      if (!drummer.bio || drummer.bio.length < 50) missing.push('bio');
      if (!drummer.gear || !drummer.gear.drums) missing.push('gear.drums');
      if (!drummer.videos || drummer.videos.length === 0) missing.push('videos');
      
      if (missing.length > 0) {
        incomplete.push({
          drummer: drummer.name,
          missing
        });
      }
      
      // Small delay between requests
      await new Promise(r => setTimeout(r, 100));
    } catch (error) {
      incomplete.push({
        drummer: name,
        missing: [`API error: ${error.message}`]
      });
    }
  }
  
  if (incomplete.length === 0) {
    passed++;
    log('pass', `All ${sampleSize} sampled drummers have complete data`);
  } else if (incomplete.length <= 2) {
    warnings++;
    log('warn', `${incomplete.length} drummers have incomplete data:`);
    incomplete.forEach(d => {
      console.log(`   ${YELLOW}→${RESET} ${d.drummer}: missing ${d.missing.join(', ')}`);
    });
  } else {
    failed++;
    log('fail', `${incomplete.length}/${sampleSize} drummers have incomplete data`);
    incomplete.slice(0, 5).forEach(d => {
      console.log(`   ${RED}→${RESET} ${d.drummer}: missing ${d.missing.join(', ')}`);
      failures.push(`Incomplete: ${d.drummer} - missing ${d.missing.join(', ')}`);
    });
    if (incomplete.length > 5) {
      console.log(`   ... and ${incomplete.length - 5} more`);
    }
  }
  
  return incomplete;
}

async function main() {
  console.log('🎸 MetalForge Drummer Media Tests');
  console.log(`📍 Testing: ${BASE_URL}`);
  console.log('═'.repeat(50));
  
  try {
    await testDrummerImages();
    await testYouTubeVideos();
    await testDrummerDataCompleteness();
  } catch (error) {
    console.error(`\n${RED}Fatal error:${RESET} ${error.message}`);
    process.exit(1);
  }
  
  console.log('\n' + '═'.repeat(50));
  console.log(`\n📊 Results: ${GREEN}${passed} passed${RESET}, ${RED}${failed} failed${RESET}, ${YELLOW}${warnings} warnings${RESET}`);
  
  if (failures.length > 0) {
    console.log(`\n${RED}Failures:${RESET}`);
    failures.forEach(f => console.log(`  • ${f}`));
  }
  
  process.exit(failed > 0 ? 1 : 0);
}

main();
