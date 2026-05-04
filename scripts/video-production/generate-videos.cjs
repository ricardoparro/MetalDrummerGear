/**
 * 60-Second Setup Build Video Generator
 * 
 * Generates vertical (1080x1920) timelapse-style videos showing drummer gear builds
 * with price overlays and MetalForge branding.
 * 
 * Usage: node scripts/video-production/generate-videos.cjs [drummer-slug]
 *        node scripts/video-production/generate-videos.cjs --all
 */

const { chromium } = require('playwright');
const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Load production data
const productionData = require('./video-production-data.json');

// Configuration
const CONFIG = {
  width: 1080,
  height: 1920,
  fps: 30,
  duration: 60, // seconds
  outputDir: path.join(__dirname, '../../public/videos/60s-builds'),
  framesDir: path.join(__dirname, 'temp-frames'),
  colors: {
    primary: '#0a0a0a',
    orange: '#ff6b00',
    gold: '#fbbf24',
    white: '#ffffff',
    gray: '#1a1a1a',
    red: '#dc2626'
  }
};

// Total frames = 60 seconds * 30 fps = 1800 frames
const TOTAL_FRAMES = CONFIG.duration * CONFIG.fps;

/**
 * Generate HTML for a specific frame
 */
function generateFrameHTML(drummer, frameNumber, totalFrames) {
  const progress = frameNumber / totalFrames;
  const timeInSeconds = progress * CONFIG.duration;
  
  // Determine current phase based on timeline
  const phases = [
    { name: 'hook', start: 0, end: 3 },
    { name: 'bass', start: 3, end: 8 },
    { name: 'toms', start: 8, end: 18 },
    { name: 'snare', start: 18, end: 26 },
    { name: 'cymbals', start: 26, end: 38 },
    { name: 'hardware', start: 38, end: 48 },
    { name: 'reveal', start: 48, end: 52 },
    { name: 'stats', start: 52, end: 56 },
    { name: 'cta', start: 56, end: 60 }
  ];
  
  const currentPhase = phases.find(p => timeInSeconds >= p.start && timeInSeconds < p.end) || phases[phases.length - 1];
  const phaseProgress = (timeInSeconds - currentPhase.start) / (currentPhase.end - currentPhase.start);
  
  // Calculate running total based on phase
  const gearItems = drummer.gear?.items || [];
  const totalCost = drummer.gear?.totalCost || 0;
  
  let runningTotal = 0;
  let visibleItems = [];
  
  if (currentPhase.name === 'hook') {
    runningTotal = 0;
    visibleItems = [];
  } else if (currentPhase.name === 'bass') {
    runningTotal = Math.floor(gearItems[0]?.estimatedPrice * phaseProgress) || 0;
    if (phaseProgress > 0.3) visibleItems.push(gearItems[0]);
  } else if (currentPhase.name === 'toms') {
    runningTotal = (gearItems[0]?.estimatedPrice || 0);
    if (phaseProgress > 0.5) runningTotal += Math.floor((gearItems[1]?.estimatedPrice || 0) * ((phaseProgress - 0.5) * 2));
    visibleItems = [gearItems[0]];
    if (phaseProgress > 0.5) visibleItems.push(gearItems[1]);
  } else if (currentPhase.name === 'snare') {
    runningTotal = (gearItems[0]?.estimatedPrice || 0) + (gearItems[1]?.estimatedPrice || 0);
    runningTotal += Math.floor((gearItems[1]?.estimatedPrice || 0) * phaseProgress);
    visibleItems = [gearItems[0], gearItems[1]];
    if (phaseProgress > 0.4) visibleItems.push(gearItems[1]);
  } else if (currentPhase.name === 'cymbals') {
    runningTotal = (gearItems[0]?.estimatedPrice || 0) + (gearItems[1]?.estimatedPrice || 0) + (gearItems[1]?.estimatedPrice || 0);
    runningTotal += Math.floor((gearItems[2]?.estimatedPrice || 0) * phaseProgress);
    visibleItems = [gearItems[0], gearItems[1], gearItems[1]];
    if (phaseProgress > 0.3) visibleItems.push(gearItems[2]);
  } else if (currentPhase.name === 'hardware') {
    runningTotal = totalCost * 0.7 + Math.floor(totalCost * 0.2 * phaseProgress);
    visibleItems = gearItems.slice(0, 4);
    if (phaseProgress > 0.3) visibleItems.push(gearItems[3]);
    if (phaseProgress > 0.6) visibleItems.push(gearItems[4]);
  } else {
    runningTotal = totalCost;
    visibleItems = gearItems;
  }
  
  // Ensure running total doesn't exceed actual total
  runningTotal = Math.min(runningTotal, totalCost);
  
  // Generate animations
  const hookOpacity = currentPhase.name === 'hook' ? 1 : 0;
  const buildOpacity = ['bass', 'toms', 'snare', 'cymbals', 'hardware'].includes(currentPhase.name) ? 1 : 0;
  const revealOpacity = currentPhase.name === 'reveal' ? 1 : 0;
  const statsOpacity = currentPhase.name === 'stats' ? 1 : 0;
  const ctaOpacity = currentPhase.name === 'cta' ? 1 : 0;
  
  // Price counter animation (slot machine effect)
  const priceDigits = runningTotal.toString().padStart(6, '0').split('');
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@700&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      width: ${CONFIG.width}px;
      height: ${CONFIG.height}px;
      background: linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
      font-family: 'Inter', sans-serif;
      color: #ffffff;
      overflow: hidden;
      position: relative;
    }
    
    /* Background grid effect */
    .grid-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: 
        linear-gradient(rgba(255,107,0,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,107,0,0.03) 1px, transparent 1px);
      background-size: 40px 40px;
      opacity: 0.5;
    }
    
    /* Animated particles */
    .particles {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    
    .particle {
      position: absolute;
      width: 4px;
      height: 4px;
      background: #ff6b00;
      border-radius: 50%;
      opacity: 0.6;
    }
    
    /* Hook section */
    .hook {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      opacity: ${hookOpacity};
      transition: opacity 0.3s;
    }
    
    .hook-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 72px;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 4px;
      line-height: 1.1;
      text-shadow: 0 0 30px rgba(255,107,0,0.5);
    }
    
    .hook-title .name {
      color: #ff6b00;
      font-size: 96px;
    }
    
    .hook-subtitle {
      font-size: 36px;
      color: #888;
      margin-top: 20px;
    }
    
    .hook-price {
      font-family: 'JetBrains Mono', monospace;
      font-size: 84px;
      color: #fbbf24;
      margin-top: 40px;
      text-shadow: 0 0 40px rgba(251,191,36,0.6);
    }
    
    /* Build section */
    .build {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 60px 40px;
      opacity: ${buildOpacity};
    }
    
    .build-header {
      text-align: center;
      margin-bottom: 40px;
    }
    
    .build-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 48px;
      color: #ff6b00;
    }
    
    .build-subtitle {
      font-size: 24px;
      color: #888;
    }
    
    /* Gear items */
    .gear-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-top: 60px;
    }
    
    .gear-item {
      background: linear-gradient(135deg, rgba(255,107,0,0.1) 0%, rgba(26,26,26,0.9) 100%);
      border: 1px solid rgba(255,107,0,0.3);
      border-radius: 16px;
      padding: 24px 30px;
      display: flex;
      align-items: center;
      gap: 20px;
      transform: translateX(${phaseProgress > 0.5 ? '0' : '-100%'});
      opacity: ${phaseProgress > 0.3 ? 1 : 0};
      transition: all 0.5s ease-out;
    }
    
    .gear-icon {
      font-size: 48px;
    }
    
    .gear-info {
      flex: 1;
    }
    
    .gear-name {
      font-size: 24px;
      font-weight: 700;
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 600px;
    }
    
    .gear-category {
      font-size: 18px;
      color: #888;
      margin-top: 4px;
    }
    
    .gear-price {
      font-family: 'JetBrains Mono', monospace;
      font-size: 32px;
      color: #fbbf24;
      font-weight: 700;
    }
    
    /* Price counter */
    .price-counter {
      position: absolute;
      bottom: 160px;
      left: 0;
      width: 100%;
      text-align: center;
    }
    
    .price-label {
      font-size: 24px;
      color: #888;
      margin-bottom: 10px;
    }
    
    .price-value {
      font-family: 'JetBrains Mono', monospace;
      font-size: 72px;
      color: #fbbf24;
      text-shadow: 0 0 30px rgba(251,191,36,0.5);
      letter-spacing: 4px;
    }
    
    /* Current item highlight */
    .current-item {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      display: ${['bass', 'toms', 'snare', 'cymbals', 'hardware'].includes(currentPhase.name) ? 'block' : 'none'};
    }
    
    .current-item-icon {
      font-size: 120px;
      animation: pulse 0.5s ease-in-out infinite alternate;
    }
    
    .current-item-name {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 48px;
      margin-top: 20px;
      color: #fff;
    }
    
    .current-item-price {
      font-family: 'JetBrains Mono', monospace;
      font-size: 56px;
      color: #fbbf24;
      margin-top: 10px;
    }
    
    @keyframes pulse {
      from { transform: scale(1); }
      to { transform: scale(1.1); }
    }
    
    /* Reveal section */
    .reveal {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      opacity: ${revealOpacity};
    }
    
    .reveal-total {
      font-family: 'JetBrains Mono', monospace;
      font-size: 96px;
      color: #fbbf24;
      text-shadow: 0 0 60px rgba(251,191,36,0.8);
    }
    
    .reveal-label {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 48px;
      color: #fff;
      margin-bottom: 20px;
    }
    
    /* Stats section */
    .stats {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 60px;
      opacity: ${statsOpacity};
    }
    
    .stat-item {
      background: rgba(255,107,0,0.1);
      border: 1px solid rgba(255,107,0,0.3);
      border-radius: 12px;
      padding: 20px 40px;
      margin: 10px 0;
      text-align: center;
    }
    
    .stat-value {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 48px;
      color: #ff6b00;
    }
    
    .stat-label {
      font-size: 20px;
      color: #888;
    }
    
    /* CTA section */
    .cta {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      opacity: ${ctaOpacity};
    }
    
    .logo {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 84px;
      color: #ff6b00;
      letter-spacing: 8px;
      margin-bottom: 40px;
    }
    
    .cta-text {
      font-size: 36px;
      color: #fff;
      margin-bottom: 20px;
    }
    
    .cta-url {
      font-family: 'JetBrains Mono', monospace;
      font-size: 32px;
      color: #fbbf24;
      background: rgba(251,191,36,0.1);
      padding: 16px 32px;
      border-radius: 8px;
      border: 2px solid #fbbf24;
    }
    
    /* MetalForge watermark */
    .watermark {
      position: absolute;
      top: 40px;
      right: 40px;
      font-family: 'Bebas Neue', sans-serif;
      font-size: 24px;
      color: rgba(255,107,0,0.5);
      letter-spacing: 2px;
    }
    
    /* Progress bar */
    .progress-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 6px;
      background: linear-gradient(90deg, #ff6b00, #fbbf24);
      width: ${progress * 100}%;
    }
  </style>
</head>
<body>
  <div class="grid-bg"></div>
  
  <!-- Watermark -->
  <div class="watermark">METALFORGE</div>
  
  <!-- Hook Section -->
  <div class="hook">
    <div class="hook-title">
      BUILDING<br>
      <span class="name">${drummer.name}'s</span><br>
      SETUP
    </div>
    <div class="hook-subtitle">${drummer.band} • ${drummer.genre}</div>
    <div class="hook-price">${drummer.gear?.totalCostFormatted || '€0'}</div>
  </div>
  
  <!-- Build Section -->
  <div class="build">
    <div class="build-header">
      <div class="build-title">${drummer.name}</div>
      <div class="build-subtitle">${drummer.band}</div>
    </div>
    
    <div class="current-item">
      <div class="current-item-icon">
        ${currentPhase.name === 'bass' ? '🥁' : 
          currentPhase.name === 'toms' ? '🥁' : 
          currentPhase.name === 'snare' ? '🪘' : 
          currentPhase.name === 'cymbals' ? '🔔' : 
          currentPhase.name === 'hardware' ? '⚙️' : '🥁'}
      </div>
      <div class="current-item-name">
        ${currentPhase.name === 'bass' ? 'BASS DRUMS' : 
          currentPhase.name === 'toms' ? 'RACK TOMS' : 
          currentPhase.name === 'snare' ? 'SIGNATURE SNARE' : 
          currentPhase.name === 'cymbals' ? 'CYMBALS' : 
          currentPhase.name === 'hardware' ? 'HARDWARE' : ''}
      </div>
      <div class="current-item-price">+€${
        currentPhase.name === 'bass' ? gearItems[0]?.estimatedPrice || 0 : 
        currentPhase.name === 'snare' ? gearItems[1]?.estimatedPrice || 0 : 
        currentPhase.name === 'cymbals' ? gearItems[2]?.estimatedPrice || 0 : 
        currentPhase.name === 'hardware' ? gearItems[3]?.estimatedPrice || 0 : 0
      }</div>
    </div>
    
    <div class="price-counter">
      <div class="price-label">RUNNING TOTAL</div>
      <div class="price-value">€${runningTotal.toLocaleString()}</div>
    </div>
  </div>
  
  <!-- Reveal Section -->
  <div class="reveal">
    <div class="reveal-label">TOTAL SETUP COST</div>
    <div class="reveal-total">${drummer.gear?.totalCostFormatted || '€0'}</div>
  </div>
  
  <!-- Stats Section -->
  <div class="stats">
    <div class="stat-item">
      <div class="stat-value">${gearItems.length}</div>
      <div class="stat-label">SIGNATURE PIECES</div>
    </div>
    <div class="stat-item">
      <div class="stat-value">${drummer.endorsements?.length || 0}</div>
      <div class="stat-label">BRAND ENDORSEMENTS</div>
    </div>
    <div class="stat-item">
      <div class="stat-value">${drummer.gear?.totalCostFormatted || '€0'}</div>
      <div class="stat-label">TOTAL INVESTMENT</div>
    </div>
  </div>
  
  <!-- CTA Section -->
  <div class="cta">
    <div class="logo">⚡ METALFORGE ⚡</div>
    <div class="cta-text">Explore the full setup</div>
    <div class="cta-url">metalforge.io/${drummer.name.toLowerCase().replace(/\s+/g, '-')}</div>
  </div>
  
  <!-- Progress bar -->
  <div class="progress-bar"></div>
</body>
</html>
  `;
}

/**
 * Generate all frames for a drummer video
 */
async function generateFrames(drummer, browser) {
  const drummerSlug = drummer.name.toLowerCase().replace(/\s+/g, '-');
  const framesDir = path.join(CONFIG.framesDir, drummerSlug);
  
  // Create frames directory
  if (!fs.existsSync(framesDir)) {
    fs.mkdirSync(framesDir, { recursive: true });
  }
  
  console.log(`  Generating ${TOTAL_FRAMES} frames for ${drummer.name}...`);
  
  const page = await browser.newPage();
  await page.setViewportSize({ width: CONFIG.width, height: CONFIG.height });
  
  // Generate frames in batches for efficiency
  const batchSize = 30;
  for (let frame = 0; frame < TOTAL_FRAMES; frame++) {
    const html = generateFrameHTML(drummer, frame, TOTAL_FRAMES);
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    
    const framePath = path.join(framesDir, `frame-${String(frame).padStart(5, '0')}.png`);
    await page.screenshot({ path: framePath, type: 'png' });
    
    if (frame % 60 === 0) {
      console.log(`    Frame ${frame}/${TOTAL_FRAMES} (${Math.round(frame/TOTAL_FRAMES*100)}%)`);
    }
  }
  
  await page.close();
  console.log(`  ✓ Frames generated for ${drummer.name}`);
  
  return framesDir;
}

/**
 * Compile frames into video using FFmpeg
 */
function compileVideo(drummer, framesDir) {
  const drummerSlug = drummer.name.toLowerCase().replace(/\s+/g, '-');
  const outputPath = path.join(CONFIG.outputDir, `metalforge-60s-${drummerSlug}-v1.mp4`);
  
  console.log(`  Compiling video for ${drummer.name}...`);
  
  // FFmpeg command to compile frames into video
  const ffmpegCmd = [
    'ffmpeg',
    '-y', // Overwrite output
    '-framerate', String(CONFIG.fps),
    '-i', path.join(framesDir, 'frame-%05d.png'),
    '-c:v', 'libx264',
    '-preset', 'medium',
    '-crf', '18', // High quality
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    outputPath
  ].join(' ');
  
  try {
    execSync(ffmpegCmd, { stdio: 'pipe' });
    console.log(`  ✓ Video compiled: ${outputPath}`);
    return outputPath;
  } catch (error) {
    console.error(`  ✗ FFmpeg error: ${error.message}`);
    return null;
  }
}

/**
 * Clean up temporary frames
 */
function cleanupFrames(framesDir) {
  if (fs.existsSync(framesDir)) {
    fs.rmSync(framesDir, { recursive: true });
  }
}

/**
 * Generate video for a single drummer
 */
async function generateDrummerVideo(drummer, browser) {
  console.log(`\n🎬 Generating video for ${drummer.name}...`);
  
  const framesDir = await generateFrames(drummer, browser);
  const videoPath = compileVideo(drummer, framesDir);
  
  // Clean up frames after compilation
  cleanupFrames(framesDir);
  
  if (videoPath) {
    console.log(`✅ Video ready: ${videoPath}`);
    return videoPath;
  }
  
  return null;
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);
  const targetSlug = args[0];
  
  // Target drummers for this issue
  const targetDrummers = ['joey-jordison', 'lars-ulrich', 'george-kollias', 'mario-duplantier', 'dave-lombardo'];
  
  // Filter drummers based on argument
  let drummers;
  if (targetSlug === '--all') {
    drummers = productionData.filter(d => 
      targetDrummers.includes(d.name.toLowerCase().replace(/\s+/g, '-'))
    );
  } else if (targetSlug) {
    drummers = productionData.filter(d => 
      d.name.toLowerCase().replace(/\s+/g, '-') === targetSlug
    );
  } else {
    console.log('Usage: node generate-videos.cjs [drummer-slug|--all]');
    console.log('Available drummers:', targetDrummers.join(', '));
    process.exit(1);
  }
  
  if (drummers.length === 0) {
    console.error('No matching drummers found');
    process.exit(1);
  }
  
  // Ensure output directory exists
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }
  
  // Ensure temp frames directory exists
  if (!fs.existsSync(CONFIG.framesDir)) {
    fs.mkdirSync(CONFIG.framesDir, { recursive: true });
  }
  
  console.log('🎥 MetalForge 60-Second Build Video Generator');
  console.log('━'.repeat(50));
  console.log(`Target drummers: ${drummers.map(d => d.name).join(', ')}`);
  console.log(`Output: ${CONFIG.outputDir}`);
  console.log(`Format: ${CONFIG.width}x${CONFIG.height} @ ${CONFIG.fps}fps, ${CONFIG.duration}s`);
  console.log('━'.repeat(50));
  
  // Launch browser
  const browser = await chromium.launch({ headless: true });
  
  const results = [];
  for (const drummer of drummers) {
    const result = await generateDrummerVideo(drummer, browser);
    results.push({ drummer: drummer.name, video: result });
  }
  
  await browser.close();
  
  // Clean up temp directory
  if (fs.existsSync(CONFIG.framesDir)) {
    fs.rmSync(CONFIG.framesDir, { recursive: true });
  }
  
  // Summary
  console.log('\n' + '━'.repeat(50));
  console.log('📊 GENERATION SUMMARY');
  console.log('━'.repeat(50));
  
  const successful = results.filter(r => r.video);
  const failed = results.filter(r => !r.video);
  
  console.log(`✅ Successful: ${successful.length}`);
  for (const r of successful) {
    console.log(`   • ${r.drummer}: ${r.video}`);
  }
  
  if (failed.length > 0) {
    console.log(`❌ Failed: ${failed.length}`);
    for (const r of failed) {
      console.log(`   • ${r.drummer}`);
    }
  }
  
  console.log('━'.repeat(50));
}

main().catch(console.error);
