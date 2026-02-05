#!/usr/bin/env node
/**
 * Post-build script to inject Google Analytics into the Expo web build
 */

const fs = require('fs');
const path = require('path');

const GA_ID = 'G-HKLHH1DCC7';

const gaScript = `
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}');
    </script>`;

const indexPath = path.join(__dirname, '../dist/index.html');

try {
  let html = fs.readFileSync(indexPath, 'utf8');
  
  // Check if GA is already injected
  if (html.includes(GA_ID)) {
    console.log('✅ GA4 already present in index.html');
    process.exit(0);
  }
  
  // Inject after <head> tag
  html = html.replace('<head>', '<head>' + gaScript);
  
  fs.writeFileSync(indexPath, html);
  console.log(`✅ Injected GA4 (${GA_ID}) into dist/index.html`);
} catch (error) {
  console.error('❌ Failed to inject GA:', error.message);
  process.exit(1);
}
