#!/usr/bin/env node
/**
 * Generates all favicon assets from the master SVG.
 * Outputs: PNG (16,32,48,180,512), apple-touch-icon, ICO (16+32+48), and
 * mirrors everything to public/ and packages/frontend/assets/.
 *
 * Usage: node scripts/generate-favicons.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SVG_SRC = path.join(ROOT, 'packages/frontend/web/favicon.svg');

const WEB_DIR = path.join(ROOT, 'packages/frontend/web');
const PUBLIC_DIR = path.join(ROOT, 'public');
const ASSETS_DIR = path.join(ROOT, 'packages/frontend/assets');

const svgBuf = fs.readFileSync(SVG_SRC);

/** Render SVG to PNG at a given square pixel size. */
async function renderPng(size) {
  return sharp(svgBuf).resize(size, size).png({ compressionLevel: 9 }).toBuffer();
}

/**
 * Build a multi-size ICO from an array of PNG Buffers.
 * ICO format embeds raw PNG data (supported since Windows Vista).
 */
function buildIco(pngBuffers) {
  const count = pngBuffers.length;
  // Header (6 bytes) + directory (16 bytes × count) then image data
  const headerSize = 6 + 16 * count;
  let offset = headerSize;

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);     // reserved
  header.writeUInt16LE(1, 2);     // type: 1 = ICO
  header.writeUInt16LE(count, 4); // number of images

  const entries = pngBuffers.map((buf, i) => {
    // Detect size from PNG header (bytes 16-23 for width/height)
    const w = buf.readUInt32BE(16);
    const h = buf.readUInt32BE(20);
    const entry = Buffer.alloc(16);
    entry.writeUInt8(w >= 256 ? 0 : w, 0);  // width (0 = 256)
    entry.writeUInt8(h >= 256 ? 0 : h, 1);  // height
    entry.writeUInt8(0, 2);                  // color count (0 = no palette)
    entry.writeUInt8(0, 3);                  // reserved
    entry.writeUInt16LE(1, 4);              // color planes
    entry.writeUInt16LE(32, 6);             // bits per pixel
    entry.writeUInt32LE(buf.length, 8);     // data size
    entry.writeUInt32LE(offset, 12);        // data offset
    offset += buf.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...pngBuffers]);
}

async function main() {
  console.log('Rendering PNG sizes…');
  const [p16, p32, p48, p180, p512] = await Promise.all([
    renderPng(16),
    renderPng(32),
    renderPng(48),
    renderPng(180),
    renderPng(512),
  ]);

  const ico = buildIco([p16, p32, p48]);

  const writes = [
    // Web build directory
    { dir: WEB_DIR, name: 'favicon-16x16.png',  data: p16  },
    { dir: WEB_DIR, name: 'favicon-32x32.png',  data: p32  },
    { dir: WEB_DIR, name: 'favicon-48x48.png',  data: p48  },
    { dir: WEB_DIR, name: 'favicon-512x512.png', data: p512 },
    { dir: WEB_DIR, name: 'apple-touch-icon.png', data: p180 },
    { dir: WEB_DIR, name: 'favicon.ico',          data: ico  },
    // Public directory (mirrors web)
    { dir: PUBLIC_DIR, name: 'favicon.svg',          data: svgBuf },
    { dir: PUBLIC_DIR, name: 'favicon-16x16.png',  data: p16  },
    { dir: PUBLIC_DIR, name: 'favicon-32x32.png',  data: p32  },
    { dir: PUBLIC_DIR, name: 'favicon-48x48.png',  data: p48  },
    { dir: PUBLIC_DIR, name: 'favicon-512x512.png', data: p512 },
    { dir: PUBLIC_DIR, name: 'apple-touch-icon.png', data: p180 },
    { dir: PUBLIC_DIR, name: 'favicon.ico',          data: ico  },
    // Expo assets (32×32 used by app.json)
    { dir: ASSETS_DIR, name: 'favicon.png', data: p32 },
  ];

  for (const { dir, name, data } of writes) {
    const dest = path.join(dir, name);
    fs.writeFileSync(dest, data);
    console.log(`  wrote ${dest.replace(ROOT + '/', '')}`);
  }

  console.log('\nFavicon generation complete.');
}

main().catch(err => { console.error(err); process.exit(1); });
