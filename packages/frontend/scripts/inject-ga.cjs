#!/usr/bin/env node
/**
 * Post-build script to inject Google Analytics, performance hints, and LCP optimizations
 * into the Expo web build (Issues #535, #752 - Mobile Performance Optimization)
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

// LCP Optimization (#752): Dynamic preload for weekly spotlight image
// Minified script to reduce parsing time
const spotlightPreload = `
    <!-- LCP: Spotlight Image Preload (#752) -->
    <script>(function(){var r=['tomas-haake','danny-carey','dave-lombardo','lars-ulrich','mario-duplantier','gene-hoglan','joey-jordison','george-kollias','brann-dailor','chris-adler'],w=Math.floor((Date.now()-1704067200000)/604800000),d=r[w%10],h=document.head,c=function(u,m){var l=document.createElement('link');l.rel='preload';l.href=u;l.as='image';l.type='image/webp';l.fetchPriority='high';l.media=m;h.appendChild(l)};c('/images/drummers/'+d+'-100w.webp','(max-width:479px)');c('/images/drummers/'+d+'-200w.webp','(min-width:480px)');})();</script>`;

// Critical CSS for fast FCP (Issues #535, #752)
const criticalCSS = `
    <style>
      /* Critical CSS for fast FCP (#535, #752) */
      body{margin:0;font-family:system-ui,-apple-system,sans-serif;background:#0a0a0a;color:#fff;-webkit-font-smoothing:antialiased}
      #root{min-height:100vh;display:flex;flex:1;background:#0a0a0a}
      /* Skeleton animation */
      @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
      .skeleton{background:linear-gradient(90deg,#1e1e1e 25%,#2a2a2a 50%,#1e1e1e 75%);background-size:200% 100%;animation:shimmer 1.5s infinite}
      /* LCP element priority */
      #critical-hero h1{content-visibility:visible}
    </style>`;

// LCP Optimization (#752): Critical hero HTML that shows before React hydrates
// This content matches the HeroSection component exactly
const criticalHeroHTML = `
      <!-- LCP Optimization (#752): Critical inline HTML for fast above-fold render -->
      <div id="critical-hero" style="display:flex;flex-direction:column;min-height:100vh;background:#0a0a0a">
        <div style="position:relative;padding:48px 20px 32px;display:flex;flex-direction:column;align-items:center;text-align:center;background:radial-gradient(ellipse at 50% 0%,rgba(220,38,38,0.08) 0%,transparent 60%)">
          <div style="font-size:48px;margin-bottom:8px">🥁</div>
          <h1 style="font-size:28px;font-weight:700;color:#fff;margin:0 0 12px;line-height:1.3">Discover what pro metal<br/>drummers actually use</h1>
          <p style="font-size:14px;color:#a1a1aa;margin:0">60 drummers • 500+ gear items • Verified setups</p>
        </div>
        <div style="display:flex;gap:12px;padding:0 16px;margin-bottom:12px">
          <div style="flex:1;height:44px;border-radius:8px;background:#141414"></div>
          <div style="flex:1;height:44px;border-radius:8px;background:#dc2626"></div>
        </div>
        <div style="margin:0 16px 16px;padding:20px;border-radius:16px;background:#141414;min-height:200px">
          <div style="display:flex;align-items:center;gap:4px;margin-bottom:16px">
            <span style="font-size:12px;font-weight:600;color:#f59e0b">⭐ DRUMMER SPOTLIGHT</span>
          </div>
          <div style="display:flex;gap:16px">
            <div style="width:100px;height:100px;border-radius:12px;background:#1e1e1e" class="skeleton"></div>
            <div style="flex:1">
              <div style="height:24px;width:60%;border-radius:4px;background:#1e1e1e;margin-bottom:8px" class="skeleton"></div>
              <div style="height:16px;width:40%;border-radius:4px;background:#1e1e1e;margin-bottom:16px" class="skeleton"></div>
              <div style="height:12px;width:80%;border-radius:4px;background:#1e1e1e;margin-bottom:6px" class="skeleton"></div>
              <div style="height:12px;width:70%;border-radius:4px;background:#1e1e1e" class="skeleton"></div>
            </div>
          </div>
        </div>
        <div style="padding:0 16px">
          <div style="height:80px;border-radius:12px;background:#141414;margin-bottom:12px" class="skeleton"></div>
          <div style="height:80px;border-radius:12px;background:#141414;margin-bottom:12px" class="skeleton"></div>
          <div style="height:80px;border-radius:12px;background:#141414" class="skeleton"></div>
        </div>
      </div>`;

// Script to remove critical hero after React hydrates
const heroCleanupScript = `
    <script>
      // Remove static content once React mounts (#752)
      var observer = new MutationObserver(function(m) {
        var h = document.getElementById('critical-hero');
        if (h && h.parentElement.childElementCount > 1) { h.remove(); observer.disconnect(); }
      });
      observer.observe(document.getElementById('root'), { childList: true });
    </script>`;

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
  
  // Inject spotlight image preload (#752)
  if (!html.includes('Spotlight Image Preload')) {
    html = html.replace('</head>', spotlightPreload + '\n  </head>');
    console.log('✅ Injected spotlight image preload (#752)');
    injectedSomething = true;
  }
  
  // Check if critical CSS is already injected (update marker to new version)
  if (!html.includes('Critical CSS for fast FCP (#535, #752)')) {
    // Remove old critical CSS if present
    html = html.replace(/<style>\s*\/\* Critical CSS for fast FCP \(Issue #535\)[\s\S]*?<\/style>/, '');
    // Inject new critical CSS
    html = html.replace('</head>', criticalCSS + '\n  </head>');
    console.log('✅ Injected critical CSS (#752)');
    injectedSomething = true;
  } else {
    console.log('✅ Critical CSS already present');
  }
  
  // Inject critical hero HTML (#752) - check for actual hero div, not just the id reference
  if (!html.includes('id="critical-hero"')) {
    // Match root div with any whitespace variations
    html = html.replace(/<div id="root"><\/div>/g, '<div id="root">' + criticalHeroHTML + '\n    </div>');
    if (html.includes('id="critical-hero"')) {
      console.log('✅ Injected critical hero HTML (#752)');
      injectedSomething = true;
    } else {
      console.log('⚠️  Could not inject critical hero HTML (root element pattern not found)');
    }
  }
  
  // Inject hero cleanup script (#752)
  if (!html.includes('Remove static content once React mounts')) {
    html = html.replace('</body>', heroCleanupScript + '\n  </body>');
    console.log('✅ Injected hero cleanup script (#752)');
    injectedSomething = true;
  }
  
  if (injectedSomething) {
    fs.writeFileSync(indexPath, html);
  }
  
  console.log('✅ Build optimization complete');
} catch (error) {
  console.error('❌ Failed to inject scripts:', error.message);
  process.exit(1);
}
