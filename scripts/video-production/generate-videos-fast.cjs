/**
 * 60-Second Setup Build Video Generator (Fast Version)
 * 
 * Uses Playwright's video recording to capture CSS animations directly.
 * Much faster than frame-by-frame generation.
 * 
 * Usage: node scripts/video-production/generate-videos-fast.cjs [drummer-slug]
 *        node scripts/video-production/generate-videos-fast.cjs --all
 */

const { chromium } = require('playwright');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Load production data
const productionData = require('./video-production-data.json');

// Configuration
const CONFIG = {
  width: 1080,
  height: 1920,
  duration: 60000, // ms
  outputDir: path.join(__dirname, '../../public/videos/60s-builds'),
  tempDir: path.join(__dirname, 'temp-videos'),
  colors: {
    primary: '#0a0a0a',
    orange: '#ff6b00', 
    gold: '#fbbf24',
    white: '#ffffff',
    gray: '#1a1a1a'
  }
};

/**
 * Generate animated HTML for the entire video duration
 */
function generateAnimatedHTML(drummer) {
  const gearItems = drummer.gear?.items || [];
  const totalCost = drummer.gear?.totalCost || 0;
  const totalCostFormatted = drummer.gear?.totalCostFormatted || '€0';
  const drummerSlug = drummer.name.toLowerCase().replace(/\s+/g, '-');
  
  // Build gear items HTML
  const gearHTML = gearItems.map((item, idx) => `
    <div class="gear-item" style="animation-delay: ${8 + idx * 5}s;">
      <div class="gear-icon">${item.icon}</div>
      <div class="gear-info">
        <div class="gear-category">${item.category}</div>
        <div class="gear-name">${item.name.substring(0, 40)}${item.name.length > 40 ? '...' : ''}</div>
      </div>
      <div class="gear-price">€${item.estimatedPrice?.toLocaleString() || 0}</div>
    </div>
  `).join('');
  
  // Endorsements for stats
  const endorsementCount = drummer.endorsements?.length || 0;
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;600;700;900&family=JetBrains+Mono:wght@600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      width: ${CONFIG.width}px;
      height: ${CONFIG.height}px;
      background: linear-gradient(180deg, #0a0a0a 0%, #151515 30%, #1a1a1a 70%, #0a0a0a 100%);
      font-family: 'Inter', sans-serif;
      color: #ffffff;
      overflow: hidden;
      position: relative;
    }
    
    /* ═══════════════════════════════════════════════ */
    /* BACKGROUND EFFECTS                              */
    /* ═══════════════════════════════════════════════ */
    
    .grid-bg {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background-image: 
        linear-gradient(rgba(255,107,0,0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,107,0,0.02) 1px, transparent 1px);
      background-size: 50px 50px;
    }
    
    .vignette {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%);
      pointer-events: none;
    }
    
    .glow {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 600px; height: 600px;
      background: radial-gradient(circle, rgba(255,107,0,0.15) 0%, transparent 70%);
      animation: glow-pulse 4s ease-in-out infinite;
    }
    
    @keyframes glow-pulse {
      0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
      50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
    }
    
    /* ═══════════════════════════════════════════════ */
    /* WATERMARK                                       */
    /* ═══════════════════════════════════════════════ */
    
    .watermark {
      position: absolute;
      top: 50px; right: 50px;
      font-family: 'Bebas Neue', sans-serif;
      font-size: 28px;
      color: rgba(255,107,0,0.4);
      letter-spacing: 4px;
      z-index: 100;
    }
    
    /* ═══════════════════════════════════════════════ */
    /* HOOK SECTION (0-3s)                             */
    /* ═══════════════════════════════════════════════ */
    
    .hook {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 60px;
      opacity: 0;
      animation: 
        fade-in 0.5s ease-out 0s forwards,
        fade-out 0.3s ease-out 2.7s forwards;
    }
    
    .hook-pre {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 48px;
      color: #888;
      letter-spacing: 8px;
      opacity: 0;
      transform: translateY(30px);
      animation: slide-up 0.4s ease-out 0.3s forwards;
    }
    
    .hook-name {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 100px;
      color: #ff6b00;
      line-height: 1;
      margin: 20px 0;
      text-shadow: 0 0 60px rgba(255,107,0,0.6);
      opacity: 0;
      transform: scale(0.8);
      animation: pop-in 0.5s ease-out 0.5s forwards;
    }
    
    .hook-band {
      font-size: 36px;
      color: #ccc;
      opacity: 0;
      animation: fade-in 0.3s ease-out 1s forwards;
    }
    
    .hook-price {
      font-family: 'JetBrains Mono', monospace;
      font-size: 72px;
      color: #fbbf24;
      margin-top: 50px;
      text-shadow: 0 0 40px rgba(251,191,36,0.5);
      opacity: 0;
      transform: scale(1.5);
      animation: price-reveal 0.6s ease-out 1.5s forwards;
    }
    
    /* ═══════════════════════════════════════════════ */
    /* BUILD SECTION (3-48s)                           */
    /* ═══════════════════════════════════════════════ */
    
    .build {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      display: flex;
      flex-direction: column;
      padding: 80px 50px;
      opacity: 0;
      animation: 
        fade-in 0.5s ease-out 3s forwards,
        fade-out 0.3s ease-out 47.7s forwards;
    }
    
    .build-header {
      text-align: center;
      margin-bottom: 40px;
    }
    
    .build-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 56px;
      color: #ff6b00;
      letter-spacing: 4px;
    }
    
    .build-subtitle {
      font-size: 28px;
      color: #888;
      margin-top: 8px;
    }
    
    .gear-list {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 16px;
      overflow: hidden;
      padding: 20px 0;
    }
    
    .gear-item {
      background: linear-gradient(135deg, rgba(255,107,0,0.08) 0%, rgba(30,30,30,0.95) 100%);
      border: 1px solid rgba(255,107,0,0.25);
      border-radius: 20px;
      padding: 28px 32px;
      display: flex;
      align-items: center;
      gap: 24px;
      opacity: 0;
      transform: translateX(-100px);
      animation: slide-in-left 0.6s ease-out forwards;
    }
    
    .gear-icon {
      font-size: 48px;
      min-width: 60px;
      text-align: center;
    }
    
    .gear-info {
      flex: 1;
      overflow: hidden;
    }
    
    .gear-category {
      font-size: 16px;
      color: #ff6b00;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: 600;
    }
    
    .gear-name {
      font-size: 22px;
      font-weight: 700;
      color: #fff;
      margin-top: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .gear-price {
      font-family: 'JetBrains Mono', monospace;
      font-size: 30px;
      color: #fbbf24;
      font-weight: 700;
    }
    
    /* ═══════════════════════════════════════════════ */
    /* RUNNING TOTAL                                   */
    /* ═══════════════════════════════════════════════ */
    
    .total-box {
      position: absolute;
      bottom: 120px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      opacity: 0;
      animation: fade-in 0.5s ease-out 5s forwards;
    }
    
    .total-label {
      font-size: 20px;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 3px;
      margin-bottom: 12px;
    }
    
    .total-value {
      font-family: 'JetBrains Mono', monospace;
      font-size: 64px;
      color: #fbbf24;
      text-shadow: 0 0 40px rgba(251,191,36,0.4);
    }
    
    .total-counter {
      animation: counter-up 45s linear 3s forwards;
    }
    
    /* ═══════════════════════════════════════════════ */
    /* REVEAL SECTION (48-52s)                         */
    /* ═══════════════════════════════════════════════ */
    
    .reveal {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      opacity: 0;
      animation: 
        fade-in 0.5s ease-out 48s forwards,
        fade-out 0.3s ease-out 51.7s forwards;
    }
    
    .reveal-icon {
      font-size: 120px;
      animation: bounce 0.8s ease-in-out infinite;
      margin-bottom: 30px;
    }
    
    .reveal-label {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 48px;
      color: #888;
      letter-spacing: 6px;
    }
    
    .reveal-total {
      font-family: 'JetBrains Mono', monospace;
      font-size: 108px;
      color: #fbbf24;
      text-shadow: 0 0 80px rgba(251,191,36,0.8);
      margin-top: 20px;
    }
    
    .reveal-name {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 42px;
      color: #ff6b00;
      margin-top: 30px;
    }
    
    /* ═══════════════════════════════════════════════ */
    /* STATS SECTION (52-56s)                          */
    /* ═══════════════════════════════════════════════ */
    
    .stats {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 30px;
      padding: 100px 60px;
      opacity: 0;
      animation: 
        fade-in 0.5s ease-out 52s forwards,
        fade-out 0.3s ease-out 55.7s forwards;
    }
    
    .stat-card {
      width: 100%;
      background: linear-gradient(135deg, rgba(255,107,0,0.1) 0%, rgba(26,26,26,0.95) 100%);
      border: 2px solid rgba(255,107,0,0.3);
      border-radius: 24px;
      padding: 36px 40px;
      text-align: center;
      transform: translateY(50px);
      opacity: 0;
    }
    
    .stat-card:nth-child(1) { animation: slide-up 0.5s ease-out 52.2s forwards; }
    .stat-card:nth-child(2) { animation: slide-up 0.5s ease-out 52.6s forwards; }
    .stat-card:nth-child(3) { animation: slide-up 0.5s ease-out 53s forwards; }
    
    .stat-value {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 72px;
      color: #ff6b00;
      line-height: 1;
    }
    
    .stat-label {
      font-size: 22px;
      color: #888;
      margin-top: 8px;
      letter-spacing: 2px;
    }
    
    /* ═══════════════════════════════════════════════ */
    /* CTA SECTION (56-60s)                            */
    /* ═══════════════════════════════════════════════ */
    
    .cta {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      opacity: 0;
      animation: fade-in 0.5s ease-out 56s forwards;
    }
    
    .cta-logo {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 96px;
      color: #ff6b00;
      letter-spacing: 10px;
      text-shadow: 0 0 60px rgba(255,107,0,0.5);
      margin-bottom: 40px;
    }
    
    .cta-bolt {
      display: inline-block;
      animation: bolt-flash 0.5s ease-in-out infinite alternate;
    }
    
    .cta-text {
      font-size: 36px;
      color: #fff;
      margin-bottom: 30px;
    }
    
    .cta-url {
      font-family: 'JetBrains Mono', monospace;
      font-size: 28px;
      color: #fbbf24;
      background: rgba(251,191,36,0.1);
      padding: 20px 40px;
      border-radius: 16px;
      border: 3px solid #fbbf24;
    }
    
    .cta-hashtags {
      margin-top: 50px;
      font-size: 20px;
      color: #666;
    }
    
    /* ═══════════════════════════════════════════════ */
    /* PROGRESS BAR                                    */
    /* ═══════════════════════════════════════════════ */
    
    .progress {
      position: absolute;
      bottom: 0; left: 0;
      width: 0;
      height: 8px;
      background: linear-gradient(90deg, #ff6b00, #fbbf24);
      animation: progress-fill 60s linear forwards;
    }
    
    /* ═══════════════════════════════════════════════ */
    /* ANIMATIONS                                      */
    /* ═══════════════════════════════════════════════ */
    
    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes fade-out {
      from { opacity: 1; }
      to { opacity: 0; }
    }
    
    @keyframes slide-up {
      from { opacity: 0; transform: translateY(50px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slide-in-left {
      from { opacity: 0; transform: translateX(-100px); }
      to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes pop-in {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }
    
    @keyframes price-reveal {
      0% { opacity: 0; transform: scale(1.5); }
      50% { opacity: 1; transform: scale(1.1); }
      100% { opacity: 1; transform: scale(1); }
    }
    
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }
    
    @keyframes bolt-flash {
      from { opacity: 1; text-shadow: 0 0 20px #fbbf24; }
      to { opacity: 0.7; text-shadow: 0 0 40px #fbbf24; }
    }
    
    @keyframes progress-fill {
      from { width: 0; }
      to { width: 100%; }
    }
  </style>
</head>
<body>
  <!-- Background -->
  <div class="grid-bg"></div>
  <div class="glow"></div>
  <div class="vignette"></div>
  
  <!-- Watermark -->
  <div class="watermark">METALFORGE</div>
  
  <!-- HOOK: 0-3s -->
  <div class="hook">
    <div class="hook-pre">BUILDING</div>
    <div class="hook-name">${drummer.name.toUpperCase()}'S</div>
    <div class="hook-band">${drummer.band} • ${drummer.genre}</div>
    <div class="hook-price">${totalCostFormatted}</div>
  </div>
  
  <!-- BUILD: 3-48s -->
  <div class="build">
    <div class="build-header">
      <div class="build-title">${drummer.name.toUpperCase()}</div>
      <div class="build-subtitle">${drummer.band} Signature Setup</div>
    </div>
    <div class="gear-list">
      ${gearHTML}
    </div>
    <div class="total-box">
      <div class="total-label">Running Total</div>
      <div class="total-value total-counter">${totalCostFormatted}</div>
    </div>
  </div>
  
  <!-- REVEAL: 48-52s -->
  <div class="reveal">
    <div class="reveal-icon">🥁</div>
    <div class="reveal-label">TOTAL SETUP COST</div>
    <div class="reveal-total">${totalCostFormatted}</div>
    <div class="reveal-name">${drummer.name}'s Complete Rig</div>
  </div>
  
  <!-- STATS: 52-56s -->
  <div class="stats">
    <div class="stat-card">
      <div class="stat-value">${gearItems.length}</div>
      <div class="stat-label">SIGNATURE PIECES</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${endorsementCount}</div>
      <div class="stat-label">BRAND ENDORSEMENTS</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${totalCostFormatted}</div>
      <div class="stat-label">TOTAL INVESTMENT</div>
    </div>
  </div>
  
  <!-- CTA: 56-60s -->
  <div class="cta">
    <div class="cta-logo"><span class="cta-bolt">⚡</span> METALFORGE <span class="cta-bolt">⚡</span></div>
    <div class="cta-text">Explore the full setup</div>
    <div class="cta-url">metalforge.io/${drummerSlug}</div>
    <div class="cta-hashtags">#MetalDrummer #DrumSetup #${drummer.name.replace(/\s+/g, '')} #${drummer.band.replace(/\s+/g, '')}</div>
  </div>
  
  <!-- Progress bar -->
  <div class="progress"></div>
</body>
</html>
  `;
}

/**
 * Record video using Playwright
 */
async function recordVideo(drummer, browser) {
  const drummerSlug = drummer.name.toLowerCase().replace(/\s+/g, '-');
  const tempVideoPath = path.join(CONFIG.tempDir, `${drummerSlug}-temp.webm`);
  const finalVideoPath = path.join(CONFIG.outputDir, `metalforge-60s-${drummerSlug}-v1.mp4`);
  
  console.log(`  Recording video for ${drummer.name}...`);
  
  // Create context with video recording
  const context = await browser.newContext({
    viewport: { width: CONFIG.width, height: CONFIG.height },
    recordVideo: {
      dir: CONFIG.tempDir,
      size: { width: CONFIG.width, height: CONFIG.height }
    }
  });
  
  const page = await context.newPage();
  
  // Generate and load the animated HTML
  const html = generateAnimatedHTML(drummer);
  await page.setContent(html, { waitUntil: 'load' });
  
  // Wait for full animation (60 seconds)
  console.log(`  ⏱️  Recording 60 seconds...`);
  await page.waitForTimeout(CONFIG.duration + 1000); // +1s buffer
  
  // Close context to finalize video
  await context.close();
  
  // Find the recorded video file
  const tempFiles = fs.readdirSync(CONFIG.tempDir);
  const videoFile = tempFiles.find(f => f.endsWith('.webm') && f.includes(drummerSlug)) 
    || tempFiles.find(f => f.endsWith('.webm'));
  
  if (!videoFile) {
    console.error(`  ✗ No video file found for ${drummer.name}`);
    return null;
  }
  
  const recordedVideoPath = path.join(CONFIG.tempDir, videoFile);
  
  // Convert to MP4 using FFmpeg
  console.log(`  Converting to MP4...`);
  try {
    execSync([
      'ffmpeg', '-y',
      '-i', recordedVideoPath,
      '-t', '60', // Trim to exactly 60 seconds
      '-c:v', 'libx264',
      '-preset', 'medium',
      '-crf', '18',
      '-pix_fmt', 'yuv420p',
      '-movflags', '+faststart',
      '-an', // No audio for now
      finalVideoPath
    ].join(' '), { stdio: 'pipe' });
    
    // Clean up temp file
    fs.unlinkSync(recordedVideoPath);
    
    console.log(`  ✓ Video saved: ${finalVideoPath}`);
    return finalVideoPath;
    
  } catch (error) {
    console.error(`  ✗ FFmpeg error: ${error.message}`);
    return null;
  }
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);
  const targetSlug = args[0];
  
  // Target drummers
  const targetDrummers = ['joey-jordison', 'lars-ulrich', 'george-kollias', 'mario-duplantier', 'dave-lombardo'];
  
  // Filter drummers
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
    console.log('Usage: node generate-videos-fast.cjs [drummer-slug|--all]');
    console.log('Available:', targetDrummers.join(', '));
    process.exit(1);
  }
  
  if (drummers.length === 0) {
    console.error('No matching drummers found');
    process.exit(1);
  }
  
  // Ensure directories exist
  [CONFIG.outputDir, CONFIG.tempDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
  
  console.log('');
  console.log('🎥 MetalForge 60-Second Build Video Generator');
  console.log('━'.repeat(55));
  console.log(`Target: ${drummers.map(d => d.name).join(', ')}`);
  console.log(`Output: ${CONFIG.outputDir}`);
  console.log(`Format: ${CONFIG.width}x${CONFIG.height} vertical, 60 seconds`);
  console.log('━'.repeat(55));
  
  // Launch browser
  const browser = await chromium.launch({ headless: true });
  
  const results = [];
  for (const drummer of drummers) {
    console.log(`\n🎬 ${drummer.name}`);
    const result = await recordVideo(drummer, browser);
    results.push({ drummer: drummer.name, video: result });
  }
  
  await browser.close();
  
  // Clean temp directory
  if (fs.existsSync(CONFIG.tempDir)) {
    try {
      fs.rmSync(CONFIG.tempDir, { recursive: true });
    } catch (e) {}
  }
  
  // Summary
  console.log('\n' + '━'.repeat(55));
  console.log('📊 SUMMARY');
  console.log('━'.repeat(55));
  
  const successful = results.filter(r => r.video);
  const failed = results.filter(r => !r.video);
  
  console.log(`✅ Generated: ${successful.length}/${results.length}`);
  successful.forEach(r => console.log(`   • ${r.drummer}`));
  
  if (failed.length > 0) {
    console.log(`❌ Failed: ${failed.length}`);
    failed.forEach(r => console.log(`   • ${r.drummer}`));
  }
  
  console.log('━'.repeat(55));
  console.log(`📁 Output: ${CONFIG.outputDir}`);
  console.log('');
}

main().catch(console.error);
