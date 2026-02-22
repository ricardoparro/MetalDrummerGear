#!/usr/bin/env node
/**
 * Post-build script to inject Google Analytics and performance hints
 * into the Expo web build (Issue #535 - Mobile Performance Optimization)
 */

const fs = require('fs');
const path = require('path');

const GA_ID = 'G-HKLHH1DCC7';

// Performance hints - preconnect and dns-prefetch for faster loading (Issue #535)
const perfHints = `
    <!-- Performance Hints (Issue #535) -->
    <link rel="preconnect" href="https://metalforge.io" crossorigin>
    <link rel="preconnect" href="https://upload.wikimedia.org" crossorigin>
    <link rel="dns-prefetch" href="https://i.ytimg.com">
    <link rel="dns-prefetch" href="https://www.googletagmanager.com">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`;

const gaScript = `
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}');
    </script>`;

// Critical CSS for fast FCP (Issue #535)
const criticalCSS = `
    <style>
      /* Critical CSS for fast FCP (Issue #535) */
      body { margin: 0; font-family: system-ui, -apple-system, sans-serif; background: #121212; color: #e0e0e0; }
      .lcp-complete { animation-play-state: running !important; }
      /* Prevent CLS by reserving space for above-fold content */
      #root { min-height: 100vh; }
    </style>`;

const indexPath = path.join(__dirname, '../dist/index.html');

try {
  let html = fs.readFileSync(indexPath, 'utf8');
  let injectedSomething = false;
  
  // Check if GA is already injected
  if (!html.includes(GA_ID)) {
    // Inject GA after <head> tag
    html = html.replace('<head>', '<head>' + gaScript);
    console.log(`✅ Injected GA4 (${GA_ID})`);
    injectedSomething = true;
  } else {
    console.log('✅ GA4 already present');
  }
  
  // Check if performance hints are already injected
  if (!html.includes('Performance Hints')) {
    // Inject performance hints at the very start of <head>
    html = html.replace('<head>', '<head>' + perfHints);
    console.log('✅ Injected performance hints (preconnect, dns-prefetch)');
    injectedSomething = true;
  } else {
    console.log('✅ Performance hints already present');
  }
  
  // Check if critical CSS is already injected
  if (!html.includes('Critical CSS for fast FCP')) {
    // Inject critical CSS after performance hints
    html = html.replace('</head>', criticalCSS + '</head>');
    console.log('✅ Injected critical CSS');
    injectedSomething = true;
  } else {
    console.log('✅ Critical CSS already present');
  }
  
  if (injectedSomething) {
    fs.writeFileSync(indexPath, html);
  }
  
  console.log('✅ Build optimization complete');
} catch (error) {
  console.error('❌ Failed to inject scripts:', error.message);
  process.exit(1);
}
