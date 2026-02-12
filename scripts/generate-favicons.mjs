#!/usr/bin/env node
import sharp from 'sharp';
import { readFileSync, writeFileSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

const svgPath = join(projectRoot, 'packages/frontend/web/favicon.svg');
const webDir = join(projectRoot, 'packages/frontend/web');
const publicDir = join(projectRoot, 'public');

const svgBuffer = readFileSync(svgPath);

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-48x48.png', size: 48 },
  { name: 'apple-touch-icon.png', size: 180 },
];

async function generateFavicons() {
  console.log('Generating favicons from SVG...');
  
  for (const { name, size } of sizes) {
    const outputPath = join(webDir, name);
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(outputPath);
    console.log(`  ✓ ${name} (${size}x${size})`);
    
    // Also copy to public directory
    const publicPath = join(publicDir, name);
    copyFileSync(outputPath, publicPath);
  }
  
  // Copy SVG to public as well
  copyFileSync(svgPath, join(publicDir, 'favicon.svg'));
  
  // Generate ICO-style favicon (use 32x32 PNG as favicon.ico alternative)
  // Most modern browsers prefer SVG or PNG, but we'll provide multiple formats
  
  console.log('\n✅ All favicons generated successfully!');
  console.log('\nFiles created in packages/frontend/web/ and public/:');
  console.log('  - favicon.svg (scalable)');
  console.log('  - favicon-16x16.png');
  console.log('  - favicon-32x32.png');
  console.log('  - favicon-48x48.png');
  console.log('  - apple-touch-icon.png (180x180)');
}

generateFavicons().catch(console.error);
