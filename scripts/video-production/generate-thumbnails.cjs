#!/usr/bin/env node
/**
 * 60-Second Setup Build - Thumbnail Generator
 * 
 * Generates thumbnail images for video series using sharp.
 * Creates branded templates with drummer info and price overlays.
 * 
 * Usage: node scripts/video-production/generate-thumbnails.cjs
 * 
 * Requirements: npm install sharp
 */

const fs = require('fs');
const path = require('path');

// Note: PNG generation via sharp has font issues with emojis
// Use browser screenshot or Puppeteer instead for high-quality exports

const videoData = require('./video-production-data.json');

// MetalForge brand colors
const COLORS = {
  black: '#0a0a0a',
  orange: '#ff6b00',
  gray: '#1a1a1a',
  white: '#ffffff',
  red: '#dc2626',
  gold: '#fbbf24'
};

// Generate SVG thumbnail template
function generateSVGTemplate(drummer) {
  const escapedName = drummer.name.replace(/'/g, "\\'");
  const escapedBand = drummer.band.replace(/'/g, "\\'");
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a1a"/>
      <stop offset="100%" style="stop-color:#0a0a0a"/>
    </linearGradient>
    <linearGradient id="priceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#ff6b00"/>
      <stop offset="100%" style="stop-color:#fbbf24"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="shadow">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>
  
  <!-- Background -->
  <rect width="1080" height="1920" fill="url(#bgGradient)"/>
  
  <!-- Decorative elements -->
  <circle cx="540" cy="960" r="400" fill="none" stroke="#ff6b00" stroke-width="2" opacity="0.2"/>
  <circle cx="540" cy="960" r="500" fill="none" stroke="#ff6b00" stroke-width="1" opacity="0.1"/>
  
  <!-- Top section - "BUILDING" text -->
  <text x="540" y="180" font-family="Impact, sans-serif" font-size="48" fill="#666666" text-anchor="middle">
    BUILDING
  </text>
  
  <!-- Drummer name -->
  <text x="540" y="280" font-family="Impact, sans-serif" font-size="72" fill="${COLORS.white}" text-anchor="middle" filter="url(#shadow)">
    ${escapedName.toUpperCase()}
  </text>
  
  <!-- Band name -->
  <text x="540" y="350" font-family="Arial, sans-serif" font-size="36" fill="${COLORS.orange}" text-anchor="middle">
    ${escapedBand}
  </text>
  
  <!-- Drummer image placeholder -->
  <rect x="190" y="450" width="700" height="700" rx="20" fill="#333333" stroke="${COLORS.orange}" stroke-width="3"/>
  <text x="540" y="820" font-family="Arial, sans-serif" font-size="24" fill="#666666" text-anchor="middle">
    [DRUMMER PHOTO]
  </text>
  <text x="540" y="860" font-family="Arial, sans-serif" font-size="18" fill="#444444" text-anchor="middle">
    ${drummer.profileImage}
  </text>
  
  <!-- Price badge -->
  <rect x="290" y="1200" width="500" height="120" rx="20" fill="url(#priceGradient)" filter="url(#glow)"/>
  <text x="540" y="1245" font-family="Impact, sans-serif" font-size="28" fill="#000000" text-anchor="middle">
    SETUP COST
  </text>
  <text x="540" y="1300" font-family="JetBrains Mono, monospace" font-size="56" fill="#000000" text-anchor="middle" font-weight="bold">
    ${drummer.gear.totalCostFormatted}
  </text>
  
  <!-- Gear icons row -->
  <text x="220" y="1400" font-size="40">🥁</text>
  <text x="320" y="1400" font-size="40">🪘</text>
  <text x="420" y="1400" font-size="40">🔔</text>
  <text x="520" y="1400" font-size="40">⚙️</text>
  <text x="620" y="1400" font-size="40">🥢</text>
  
  <!-- Genre tag -->
  <rect x="340" y="1450" width="400" height="50" rx="25" fill="none" stroke="${COLORS.white}" stroke-width="2" opacity="0.5"/>
  <text x="540" y="1485" font-family="Arial, sans-serif" font-size="22" fill="${COLORS.white}" text-anchor="middle" opacity="0.8">
    ${drummer.genre}
  </text>
  
  <!-- Bottom CTA -->
  <text x="540" y="1600" font-family="Arial, sans-serif" font-size="28" fill="${COLORS.white}" text-anchor="middle">
    Explore full setup →
  </text>
  <text x="540" y="1650" font-family="Arial, sans-serif" font-size="24" fill="${COLORS.orange}" text-anchor="middle">
    metalforge.io/${drummer.name.toLowerCase().replace(/\s+/g, '-')}
  </text>
  
  <!-- MetalForge branding -->
  <rect x="390" y="1750" width="300" height="80" rx="10" fill="${COLORS.orange}"/>
  <text x="540" y="1805" font-family="Impact, sans-serif" font-size="36" fill="#000000" text-anchor="middle">
    METALFORGE
  </text>
  
  <!-- Corner accents -->
  <path d="M0,0 L100,0 L100,10 L10,10 L10,100 L0,100 Z" fill="${COLORS.orange}" opacity="0.8"/>
  <path d="M1080,0 L980,0 L980,10 L1070,10 L1070,100 L1080,100 Z" fill="${COLORS.orange}" opacity="0.8"/>
  <path d="M0,1920 L100,1920 L100,1910 L10,1910 L10,1820 L0,1820 Z" fill="${COLORS.orange}" opacity="0.8"/>
  <path d="M1080,1920 L980,1920 L980,1910 L1070,1910 L1070,1820 L1080,1820 Z" fill="${COLORS.orange}" opacity="0.8"/>
</svg>`;
}

// Generate HTML template for easy editing
function generateHTMLTemplate(drummer) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Thumbnail: ${drummer.name}</title>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;700&family=JetBrains+Mono:wght@700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      background: #000; 
      display: flex; 
      justify-content: center; 
      align-items: center; 
      min-height: 100vh;
    }
    .thumbnail {
      width: 1080px;
      height: 1920px;
      background: linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%);
      position: relative;
      overflow: hidden;
      font-family: 'Inter', sans-serif;
    }
    .building {
      position: absolute;
      top: 120px;
      width: 100%;
      text-align: center;
      font-family: 'Bebas Neue', sans-serif;
      font-size: 48px;
      color: #666;
      letter-spacing: 8px;
    }
    .drummer-name {
      position: absolute;
      top: 180px;
      width: 100%;
      text-align: center;
      font-family: 'Bebas Neue', sans-serif;
      font-size: 80px;
      color: #fff;
      text-shadow: 0 4px 20px rgba(0,0,0,0.8);
    }
    .band-name {
      position: absolute;
      top: 280px;
      width: 100%;
      text-align: center;
      font-size: 36px;
      color: #ff6b00;
    }
    .photo-placeholder {
      position: absolute;
      top: 380px;
      left: 140px;
      width: 800px;
      height: 700px;
      background: #222;
      border: 3px solid #ff6b00;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #666;
    }
    .photo-placeholder img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 17px;
    }
    .price-badge {
      position: absolute;
      top: 1130px;
      left: 190px;
      width: 700px;
      height: 140px;
      background: linear-gradient(90deg, #ff6b00, #fbbf24);
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-shadow: 0 0 40px rgba(255, 107, 0, 0.5);
    }
    .price-label {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 28px;
      color: #000;
    }
    .price-value {
      font-family: 'JetBrains Mono', monospace;
      font-size: 64px;
      font-weight: bold;
      color: #000;
    }
    .genre-tag {
      position: absolute;
      top: 1320px;
      left: 190px;
      width: 700px;
      height: 60px;
      border: 2px solid rgba(255,255,255,0.3);
      border-radius: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgba(255,255,255,0.7);
      font-size: 24px;
    }
    .cta {
      position: absolute;
      top: 1450px;
      width: 100%;
      text-align: center;
    }
    .cta-text {
      font-size: 32px;
      color: #fff;
      margin-bottom: 10px;
    }
    .cta-url {
      font-size: 28px;
      color: #ff6b00;
    }
    .logo {
      position: absolute;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%);
      background: #ff6b00;
      padding: 20px 60px;
      border-radius: 10px;
      font-family: 'Bebas Neue', sans-serif;
      font-size: 42px;
      color: #000;
    }
    .corner {
      position: absolute;
      width: 80px;
      height: 80px;
      border: 3px solid #ff6b00;
    }
    .corner.tl { top: 20px; left: 20px; border-right: none; border-bottom: none; }
    .corner.tr { top: 20px; right: 20px; border-left: none; border-bottom: none; }
    .corner.bl { bottom: 20px; left: 20px; border-right: none; border-top: none; }
    .corner.br { bottom: 20px; right: 20px; border-left: none; border-top: none; }
  </style>
</head>
<body>
  <div class="thumbnail">
    <div class="corner tl"></div>
    <div class="corner tr"></div>
    <div class="corner bl"></div>
    <div class="corner br"></div>
    
    <div class="building">BUILDING</div>
    <div class="drummer-name">${drummer.name.toUpperCase()}</div>
    <div class="band-name">${drummer.band}</div>
    
    <div class="photo-placeholder">
      <!-- Replace with actual photo -->
      <span>[DRUMMER PHOTO]</span>
      <span style="font-size: 14px; margin-top: 10px;">${drummer.profileImage}</span>
    </div>
    
    <div class="price-badge">
      <div class="price-label">SETUP COST</div>
      <div class="price-value">${drummer.gear.totalCostFormatted}</div>
    </div>
    
    <div class="genre-tag">${drummer.genre}</div>
    
    <div class="cta">
      <div class="cta-text">Explore full setup →</div>
      <div class="cta-url">metalforge.io/${drummer.name.toLowerCase().replace(/\s+/g, '-')}</div>
    </div>
    
    <div class="logo">METALFORGE</div>
  </div>
</body>
</html>`;
}

// Main function
async function main() {
  console.log('='.repeat(60));
  console.log('60-SECOND SETUP BUILD - Thumbnail Generator');
  console.log('='.repeat(60));
  console.log();
  
  const outputDir = path.join(__dirname, 'thumbnails');
  
  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  for (const drummer of videoData) {
    const slug = drummer.name.toLowerCase().replace(/\s+/g, '-');
    
    // Generate SVG template
    const svgContent = generateSVGTemplate(drummer);
    const svgPath = path.join(outputDir, `thumbnail-${slug}.svg`);
    fs.writeFileSync(svgPath, svgContent);
    console.log(`✅ SVG: ${svgPath}`);
    
    // Generate HTML template
    const htmlContent = generateHTMLTemplate(drummer);
    const htmlPath = path.join(outputDir, `thumbnail-${slug}.html`);
    fs.writeFileSync(htmlPath, htmlContent);
    console.log(`✅ HTML: ${htmlPath}`);
    
    // Note: PNG generation with sharp may fail due to emoji fonts
    // Use browser screenshot or Puppeteer for high-quality PNG exports
    // The HTML templates work better for this purpose
    
    console.log();
  }
  
  console.log('='.repeat(60));
  console.log(`Thumbnails generated in: ${outputDir}`);
  console.log();
  console.log('Next steps:');
  console.log('1. Open HTML files in browser for live preview');
  console.log('2. Take screenshots or use Puppeteer for high-res exports');
  console.log('3. Replace photo placeholders with actual drummer images');
  console.log('='.repeat(60));
}

main().catch(console.error);
