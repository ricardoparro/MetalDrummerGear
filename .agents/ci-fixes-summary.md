# CI Failures Fix Summary

**Date:** 2026-02-14
**PRs Fixed:** #394, #393, #392, #390

## Root Causes Identified

### 1. Missing `data/genres.js` file (PR #394)
- **Issue:** `App.js` imported `./data/genres` but the file was never created
- **Error:** `Error: Unable to resolve module ./data/genres from App.js`
- **Fix:** Created `packages/frontend/data/genres.js` with genre data structure for SEO landing pages

### 2. Missing comma in `data/extendedBios.js` (Multiple PRs)
- **Issue:** Missing comma between Mario Duplantier and Paul Bostaph entries
- **Error:** `SyntaxError: Unexpected token, expected ","`
- **Fix:** Added missing comma after the Mario Duplantier entry closing brace
- **Affected PRs:** #394, #392, #390

### 3. Duplicate function declarations (PR #392, #390)
- **Issue:** Multiple PRs added the same functions with different implementations
- **Duplicates found:**
  - `BandPage` function (two versions at different line numbers)
  - `BandLinksSection` function (two versions with different signatures)
  - `isBandPage` helper function
  - `getBandSlugFromURL` helper function
- **Error:** `SyntaxError: Identifier 'X' has already been declared`
- **Fix:** Removed duplicate function declarations, keeping the correct version

### 4. E2E test feature detection too loose (PR #393)
- **Issue:** The `beforeAll` feature detection matched any text containing "Bands"
- **Fix:** Updated to use more specific pattern matching: `getByRole('heading', { name: /^🎸?\s*Bands$/i })`

## Commits Made

### PR #394 (feature/339-gear-category-pages)
```
fix: Add missing genres.js and fix extendedBios.js syntax error
- Created genres.js with genre data structure for SEO landing pages
- Fixed missing comma in extendedBios.js
```

### PR #392 (fix/351-band-links-complete)
```
fix: Remove duplicate BandPage and isBandPage functions, fix extendedBios syntax
- Removed duplicate BandPage function (lines 5282-5471)
- Removed duplicate isBandPage and getBandSlugFromURL helper functions
- Fixed missing comma in extendedBios.js
```

### PR #390 (feature/351-band-links-final)
```
fix: Remove duplicate BandLinksSection function, fix extendedBios.js syntax
- Removed duplicate BandLinksSection function
- Fixed missing comma in extendedBios.js
```

### PR #393 (feature/349-drummer-history-final)
```
fix(e2e): Improve band-links feature detection to prevent false positives
- Use regex pattern for heading name to match both '🎸 Bands' and 'Bands'
- Add logging for feature detection status
```

## Prevention Recommendations

1. **Run local build before pushing:** `cd packages/frontend && npx expo export --platform web`
2. **Check for merge conflicts:** Always resolve `<<<<<<<` markers before committing
3. **Coordinate PR merges:** When multiple PRs modify the same files (especially `App.js`, `bands.js`, `extendedBios.js`), ensure they're merged in sequence and updated with main
4. **Add CI pre-commit hooks:** Consider adding a git pre-commit hook that runs `expo export` to catch build errors early

## Files Most Prone to Conflicts
- `packages/frontend/App.js` - Large file with many feature additions
- `packages/frontend/data/bands.js` - Multiple PRs add band data
- `packages/frontend/data/extendedBios.js` - Multiple PRs add drummer bios
