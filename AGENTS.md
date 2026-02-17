# AGENTS.md - MetalDrummerGear

Guidelines for AI agents working on this codebase.

## Protected Code Patterns

These patterns are **critical** and must NOT be removed:

### CI Analytics Exclusion

1. **`playwright.config.cjs`** - The `ci_test` URL parameter
   - Excludes CI test traffic from Google Analytics
   - See issues #214, #461 for history
   - Removing this will pollute analytics data

2. **`index.html`** - The `urlHasCITest` check
   - Client-side check for `ci_test` URL parameter
   - Required because browser JS cannot read HTTP headers
   - Works together with the Playwright config

**Why this exists:** HTTP headers (like `X-CI-Test`) cannot be read by client-side JavaScript. The URL parameter approach ensures GA4 can detect and exclude CI traffic.
