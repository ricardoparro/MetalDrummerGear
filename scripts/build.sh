#!/bin/bash
set -e
npx patch-package
node scripts/generate-responsive-images.cjs
npm run generate:llms
# Issue #7149: lightweight browser catalog so /articles/<slug> only downloads
# its own per-drummer chunk instead of the full ~10MB albumArticles bundle.
node scripts/generate-album-articles-catalog.mjs
# Issue #9106: lightweight browser catalog so /lists/<slug> can paint its
# header before the ~860KB top10Lists rankings module resolves.
node scripts/generate-top10-lists-catalog.mjs
cd packages/frontend
npx expo export --platform web --clear
node scripts/inject-ga.cjs
# LCP Optimization (#752): Inject modulepreload for main bundle
node scripts/inject-bundle-preload.cjs
cp -r ../../public/* dist/
# Pre-render sitemap.xml as a static file (no serverless cold-start on crawl).
# Runs after the public/* copy so it overrides any stale committed sitemap.
node ../../scripts/generate-sitemap.mjs
