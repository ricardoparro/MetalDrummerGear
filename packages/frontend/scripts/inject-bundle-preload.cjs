#!/usr/bin/env node
/**
 * Inject modulepreload for main JS bundle
 * Issue #752: LCP Optimization - Preload main bundle for faster hydration
 * 
 * This script:
 * 1. Finds the main index bundle hash in dist/_expo/static/js/web/
 * 2. Injects a modulepreload link in index.html
 * 3. Adds fetchpriority="high" to the main script tag
 */

const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '../dist');
const jsDir = path.join(distDir, '_expo/static/js/web');
const indexHtmlPath = path.join(distDir, 'index.html');

function findMainBundle() {
  try {
    const files = fs.readdirSync(jsDir);
    // Find the main index bundle (largest, starts with 'index-')
    const indexBundle = files.find(f => f.startsWith('index-') && f.endsWith('.js'));
    if (indexBundle) {
      return `/_expo/static/js/web/${indexBundle}`;
    }
    console.warn('[inject-bundle-preload] Could not find index bundle');
    return null;
  } catch (err) {
    console.warn('[inject-bundle-preload] Error reading JS dir:', err.message);
    return null;
  }
}

function findCommonChunk() {
  try {
    const files = fs.readdirSync(jsDir);
    // Find the common chunk (shared React/vendor code)
    const commonBundle = files.find(f => f.startsWith('__common-') && f.endsWith('.js'));
    if (commonBundle) {
      return `/_expo/static/js/web/${commonBundle}`;
    }
    return null;
  } catch (err) {
    return null;
  }
}

function injectPreloads() {
  const mainBundle = findMainBundle();
  const commonChunk = findCommonChunk();
  
  if (!mainBundle) {
    console.log('[inject-bundle-preload] No main bundle found, skipping');
    return;
  }
  
  let html = fs.readFileSync(indexHtmlPath, 'utf-8');
  
  // Build preload links
  let preloadHtml = '';
  
  // Preload main bundle with high priority
  preloadHtml += `<link rel="modulepreload" href="${mainBundle}" fetchpriority="high" />`;
  
  // Preload common chunk (contains React core)
  if (commonChunk) {
    preloadHtml += `\n    <link rel="modulepreload" href="${commonChunk}" />`;
  }
  
  // Replace placeholder with actual preload links
  html = html.replace('<!-- MAIN_BUNDLE_PRELOAD -->', preloadHtml);
  
  // Also add fetchpriority="high" to the main script tag if present
  // Expo generates: <script src="/_expo/static/js/web/index-xxx.js" type="module"></script>
  html = html.replace(
    new RegExp(`<script src="${mainBundle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g'),
    `<script src="${mainBundle}" fetchpriority="high"`
  );
  
  fs.writeFileSync(indexHtmlPath, html);
  
  console.log('[inject-bundle-preload] Injected preloads:');
  console.log(`  - Main bundle: ${mainBundle}`);
  if (commonChunk) {
    console.log(`  - Common chunk: ${commonChunk}`);
  }
}

// Run
injectPreloads();
