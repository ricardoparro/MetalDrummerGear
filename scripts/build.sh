#!/bin/bash
set -e
npx patch-package
node scripts/generate-responsive-images.cjs
node scripts/generate-llms-full.cjs
node scripts/generate-llms-index.cjs
cd packages/frontend
npx expo export --platform web --clear
node scripts/inject-ga.cjs
# LCP Optimization (#752): Inject modulepreload for main bundle
node scripts/inject-bundle-preload.cjs
cp -r ../../public/* dist/
# Pre-render sitemap.xml as a static file (no serverless cold-start on crawl).
# Runs after the public/* copy so it overrides any stale committed sitemap.
node ../../scripts/generate-sitemap.mjs
