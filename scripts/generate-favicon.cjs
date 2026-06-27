'use strict';
// Generates all favicon PNG sizes + multi-size ICO from the SVG master.
// Usage: node scripts/generate-favicon.cjs
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SVG_SRC = path.join(ROOT, 'packages/frontend/web/favicon.svg');
const WEB_DIR = path.join(ROOT, 'packages/frontend/web');
const PUBLIC_DIR = path.join(ROOT, 'public');
const ASSETS_DIR = path.join(ROOT, 'packages/frontend/assets');

async function renderPNG(svgBuf, size) {
  return sharp(svgBuf)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
}

function buildICO(pngEntries) {
  // pngEntries: [{size, buf}]
  // ICO file format: 6-byte header + n*16-byte directory + image data
  const count = pngEntries.length;
  const headerSize = 6 + count * 16;

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);     // Reserved
  header.writeUInt16LE(1, 2);     // Type: 1 = ICO
  header.writeUInt16LE(count, 4); // Number of images

  const dir = Buffer.alloc(count * 16);
  let dataOffset = headerSize;
  for (let i = 0; i < count; i++) {
    const { size, buf } = pngEntries[i];
    const base = i * 16;
    dir.writeUInt8(size >= 256 ? 0 : size, base);     // Width  (0 = 256)
    dir.writeUInt8(size >= 256 ? 0 : size, base + 1); // Height (0 = 256)
    dir.writeUInt8(0, base + 2);                       // Colour count
    dir.writeUInt8(0, base + 3);                       // Reserved
    dir.writeUInt16LE(1, base + 4);                    // Colour planes
    dir.writeUInt16LE(32, base + 6);                   // Bits per pixel
    dir.writeUInt32LE(buf.length, base + 8);           // Data size
    dir.writeUInt32LE(dataOffset, base + 12);          // Offset
    dataOffset += buf.length;
  }

  return Buffer.concat([header, dir, ...pngEntries.map(e => e.buf)]);
}

async function main() {
  const svgBuf = fs.readFileSync(SVG_SRC);

  // Sizes and their output file names
  const specs = [
    { size: 16,  name: 'favicon-16x16.png' },
    { size: 32,  name: 'favicon-32x32.png' },
    { size: 48,  name: 'favicon-48x48.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 512, name: 'favicon-512x512.png' },
  ];

  const rendered = {};
  for (const { size, name } of specs) {
    console.log(`Rendering ${size}x${size}…`);
    const buf = await renderPNG(svgBuf, size);
    rendered[name] = buf;
    // Write to web dir
    fs.writeFileSync(path.join(WEB_DIR, name), buf);
    console.log(`  → packages/frontend/web/${name}`);
    // Mirror to public dir
    fs.writeFileSync(path.join(PUBLIC_DIR, name), buf);
    console.log(`  → public/${name}`);
  }

  // Update Expo assets/favicon.png (32x32)
  fs.writeFileSync(path.join(ASSETS_DIR, 'favicon.png'), rendered['favicon-32x32.png']);
  console.log('  → packages/frontend/assets/favicon.png');

  // Copy SVG to public
  fs.copyFileSync(SVG_SRC, path.join(PUBLIC_DIR, 'favicon.svg'));
  console.log('  → public/favicon.svg');

  // Multi-size favicon.ico (16, 32, 48)
  console.log('Building favicon.ico (16, 32, 48)…');
  const icoEntries = [16, 32, 48].map(size => ({
    size,
    buf: rendered[`favicon-${size}x${size}.png`],
  }));
  const icoBuf = buildICO(icoEntries);
  fs.writeFileSync(path.join(WEB_DIR, 'favicon.ico'), icoBuf);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.ico'), icoBuf);
  console.log(`  → favicon.ico (${icoBuf.length} bytes, 3 sizes)`);

  console.log('\nAll favicon assets generated successfully.');
}

main().catch(err => { console.error(err); process.exit(1); });
