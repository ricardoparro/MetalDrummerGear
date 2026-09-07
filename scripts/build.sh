#!/bin/bash
set -e
npx patch-package
node scripts/generate-responsive-images.cjs
node scripts/generate-llms-full.cjs
node scripts/generate-llms-index.cjs
node scripts/generate-llms-techniques-per-slug.cjs
# Perf fix #7149: per-article chunks + lightweight manifest so /articles/<slug>
# doesn't fetch the whole albumArticles dataset. Must run before `expo export`
# since App.js dynamically imports these generated modules directly.
node scripts/generate-album-article-chunks.mjs
cd packages/frontend
npx expo export --platform web --clear
node scripts/inject-ga.cjs
# LCP Optimization (#752): Inject modulepreload for main bundle
node scripts/inject-bundle-preload.cjs
cp -r ../../public/* dist/
# Pre-render sitemap.xml as a static file (no serverless cold-start on crawl).
# Runs after the public/* copy so it overrides any stale committed sitemap.
node ../../scripts/generate-sitemap.mjs
