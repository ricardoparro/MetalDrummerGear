#!/bin/bash
set -e
npx patch-package
node scripts/generate-responsive-images.cjs
node scripts/generate-llms-full.cjs
node scripts/generate-llms-index.cjs
cd packages/frontend
npx expo export --platform web --clear
node scripts/inject-ga.cjs
cp -r ../../public/* dist/
