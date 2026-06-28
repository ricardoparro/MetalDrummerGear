#!/usr/bin/env node
/**
 * Generates all favicon assets from the master SVG:
 *   favicon-16x16.png, favicon-32x32.png, favicon-48x48.png,
 *   favicon-180x180.png (apple-touch-icon), favicon-512x512.png,
 *   favicon.ico  (embedded 16 + 32 + 48 PNG frames)
 *
 * Output mirrors to both public/ and packages/frontend/web/
 *
 * Requires: sharp  (already in the project's node_modules)
 * Run:      node scripts/generate-favicons.js
 */

const path = require('path');
const fs   = require('fs');
const sharp = require('sharp');

const ROOT   = path.resolve(__dirname, '..');
const SVG    = path.join(ROOT, 'packages/frontend/web/favicon.svg');
const DESTS  = [
  path.join(ROOT, 'public'),
  path.join(ROOT, 'packages/frontend/web'),
];
const EXPO_ASSETS = path.join(ROOT, 'packages/frontend/assets');

const svgBuf = fs.readFileSync(SVG);

const SIZES = [16, 32, 48, 180, 512];

async function renderPng(size) {
  return sharp(svgBuf)
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/**
 * Builds a multi-image .ico file.
 * Modern ICO files embed PNG frames directly (works in all current browsers).
 * Format:
 *   ICONDIR  (6 bytes)
 *   ICONDIRENTRY * n  (16 bytes each)
 *   PNG data for each image
 */
function buildIco(frames) {
  const count  = frames.length;
  const HEADER = 6;
  const ENTRY  = 16;
  const dataOffset = HEADER + count * ENTRY;

  const header = Buffer.alloc(HEADER);
  header.writeUInt16LE(0,     0); // reserved
  header.writeUInt16LE(1,     2); // type: 1 = ICO
  header.writeUInt16LE(count, 4);

  const entries = Buffer.alloc(count * ENTRY);
  let offset = dataOffset;
  frames.forEach(({ size, png }, i) => {
    const base = i * ENTRY;
    const dim  = size >= 256 ? 0 : size; // 0 encodes 256
    entries.writeUInt8(dim,       base +  0); // width
    entries.writeUInt8(dim,       base +  1); // height
    entries.writeUInt8(0,         base +  2); // color count (0 = not indexed)
    entries.writeUInt8(0,         base +  3); // reserved
    entries.writeUInt16LE(1,      base +  4); // planes
    entries.writeUInt16LE(32,     base +  6); // bit count
    entries.writeUInt32LE(png.length, base + 8);
    entries.writeUInt32LE(offset,     base + 12);
    offset += png.length;
  });

  return Buffer.concat([header, entries, ...frames.map(f => f.png)]);
}

async function main() {
  console.log('Generating favicon assets from', SVG);

  const pngBySize = {};
  for (const size of SIZES) {
    process.stdout.write(`  Rendering ${size}×${size} …`);
    pngBySize[size] = await renderPng(size);
    console.log(` ${pngBySize[size].length} bytes`);
  }

  // Write PNG files to each destination
  for (const dest of DESTS) {
    fs.mkdirSync(dest, { recursive: true });

    for (const size of SIZES) {
      const name = size === 180 ? 'apple-touch-icon.png' : `favicon-${size}x${size}.png`;
      fs.writeFileSync(path.join(dest, name), pngBySize[size]);
      console.log(`  Written ${path.relative(ROOT, path.join(dest, name))}`);
    }

    // Build and write ICO (16 + 32 + 48 frames)
    const ico = buildIco([
      { size: 16, png: pngBySize[16] },
      { size: 32, png: pngBySize[32] },
      { size: 48, png: pngBySize[48] },
    ]);
    fs.writeFileSync(path.join(dest, 'favicon.ico'), ico);
    console.log(`  Written ${path.relative(ROOT, path.join(dest, 'favicon.ico'))} (${ico.length} bytes)`);

    // Also copy the master SVG
    fs.copyFileSync(SVG, path.join(dest, 'favicon.svg'));
    console.log(`  Written ${path.relative(ROOT, path.join(dest, 'favicon.svg'))}`);
  }

  // Expo assets/ — 180×180 used by app.json web.favicon (as generic icon)
  fs.mkdirSync(EXPO_ASSETS, { recursive: true });
  fs.writeFileSync(path.join(EXPO_ASSETS, 'favicon.png'), pngBySize[180]);
  console.log(`  Written packages/frontend/assets/favicon.png (180×180)`);

  console.log('\nDone.');
}

main().catch(err => { console.error(err); process.exit(1); });
