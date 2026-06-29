#!/usr/bin/env node
/**
 * Favicon generator — Issue #2923
 * Reads public/favicon.svg, renders PNG at each required size using sharp,
 * writes a multi-size favicon.ico (embedded-PNG format), and copies
 * everything to packages/frontend/web/ and packages/frontend/assets/.
 *
 * Usage: node scripts/generate-favicons.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SVG_PATH = path.join(ROOT, 'public', 'favicon.svg');

const OUTPUTS = [
  { name: 'favicon-16x16.png',   size: 16  },
  { name: 'favicon-32x32.png',   size: 32  },
  { name: 'favicon-48x48.png',   size: 48  },
  { name: 'apple-touch-icon.png',size: 180 },
  { name: 'favicon-512x512.png', size: 512 },
];

const DEST_DIRS = [
  path.join(ROOT, 'public'),
  path.join(ROOT, 'packages', 'frontend', 'web'),
];

/** Build an ICO file with embedded PNGs for the given size array. */
function buildIco(pngBuffers, sizes) {
  const count = pngBuffers.length;
  const dirSize = 16 * count;
  const headerSize = 6;
  const dataOffset = headerSize + dirSize;

  // Compute offsets for each image block
  const offsets = [];
  let offset = dataOffset;
  for (const buf of pngBuffers) {
    offsets.push(offset);
    offset += buf.length;
  }

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0,     0); // reserved
  header.writeUInt16LE(1,     2); // type: ICO
  header.writeUInt16LE(count, 4); // image count

  const directory = Buffer.alloc(dirSize);
  for (let i = 0; i < count; i++) {
    const base = i * 16;
    const sz = sizes[i];
    directory.writeUInt8(sz >= 256 ? 0 : sz, base);     // width
    directory.writeUInt8(sz >= 256 ? 0 : sz, base + 1); // height
    directory.writeUInt8(0, base + 2);                   // color count
    directory.writeUInt8(0, base + 3);                   // reserved
    directory.writeUInt16LE(1, base + 4);                // color planes
    directory.writeUInt16LE(32, base + 6);               // bits per pixel
    directory.writeUInt32LE(pngBuffers[i].length, base + 8);  // image size
    directory.writeUInt32LE(offsets[i], base + 12);           // image offset
  }

  return Buffer.concat([header, directory, ...pngBuffers]);
}

async function main() {
  const svgBuffer = fs.readFileSync(SVG_PATH);

  // Render all sizes
  const rendered = {};
  for (const { name, size } of OUTPUTS) {
    console.log(`  Rendering ${size}×${size} → ${name}`);
    rendered[name] = await sharp(svgBuffer)
      .resize(size, size)
      .png({ compressionLevel: 9 })
      .toBuffer();
  }

  // Write PNGs to all destination directories
  for (const dir of DEST_DIRS) {
    for (const { name } of OUTPUTS) {
      const dest = path.join(dir, name);
      fs.writeFileSync(dest, rendered[name]);
    }
    console.log(`  Written PNGs → ${path.relative(ROOT, dir)}/`);
  }

  // Build favicon.ico from 16, 32, 48 (standard multi-size ICO)
  const icoSizes = [16, 32, 48];
  const icoNameMap = { 16: 'favicon-16x16.png', 32: 'favicon-32x32.png', 48: 'favicon-48x48.png' };
  const icoPngs = icoSizes.map(s => rendered[icoNameMap[s]]);
  const icoBuffer = buildIco(icoPngs, icoSizes);

  for (const dir of DEST_DIRS) {
    fs.writeFileSync(path.join(dir, 'favicon.ico'), icoBuffer);
  }
  console.log(`  Written favicon.ico (${icoSizes.join('/')} px)`);

  // Write 48×48 as Expo assets/favicon.png
  const expoFavicon = path.join(ROOT, 'packages', 'frontend', 'assets', 'favicon.png');
  fs.writeFileSync(expoFavicon, rendered['favicon-48x48.png']);
  console.log(`  Written Expo asset → packages/frontend/assets/favicon.png`);

  console.log('Done.');
}

main().catch(err => { console.error(err); process.exit(1); });
