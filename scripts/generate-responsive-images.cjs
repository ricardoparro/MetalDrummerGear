#!/usr/bin/env node
/**
 * Generate responsive image sizes for mobile LCP optimization
 * Issue #465, #466 - Mobile LCP 4.4s (target: <2.5s)
 * 
 * Creates smaller versions of drummer images for mobile devices:
 * - 100w: For mobile spotlight thumbnails
 * - 200w: For mobile cards  
 * - 400w: For tablet/small screens
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const DRUMMERS_DIR = path.join(__dirname, '../public/images/drummers');
const WIDTHS = [100, 200, 400];

async function generateResponsiveImages() {
  console.log('🖼️  Generating responsive images for mobile LCP optimization...\n');

  // Get all webp files
  const files = fs.readdirSync(DRUMMERS_DIR).filter(f => f.endsWith('.webp'));
  
  let generated = 0;
  let skipped = 0;
  let errors = 0;

  for (const file of files) {
    const baseName = path.basename(file, '.webp');
    const sourcePath = path.join(DRUMMERS_DIR, file);

    for (const width of WIDTHS) {
      const outputName = `${baseName}-${width}w.webp`;
      const outputPath = path.join(DRUMMERS_DIR, outputName);

      // Skip if already exists
      if (fs.existsSync(outputPath)) {
        skipped++;
        continue;
      }

      try {
        const metadata = await sharp(sourcePath).metadata();
        
        // Skip if source is smaller than target width
        if (metadata.width && metadata.width <= width) {
          skipped++;
          continue;
        }

        await sharp(sourcePath)
          .resize(width, null, {
            withoutEnlargement: true,
            fit: 'inside',
          })
          .webp({ quality: 80, effort: 4 })
          .toFile(outputPath);

        generated++;
        console.log(`  ✅ ${outputName}`);
      } catch (err) {
        errors++;
        console.error(`  ❌ ${outputName}: ${err.message}`);
      }
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Generated: ${generated}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Errors: ${errors}`);
  console.log(`\n✨ Done! Responsive images ready for mobile LCP optimization.`);
}

generateResponsiveImages().catch(console.error);
