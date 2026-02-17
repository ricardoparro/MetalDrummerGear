# AGENTS.md - MetalDrummerGear

Guidelines for AI agents working on this repository.

## Protected Code Patterns

These patterns are critical and should NOT be modified without explicit approval:

| File | Pattern | Reason |
|------|---------|--------|
| `playwright.config.cjs` | `ci_test` in BASE_URL | Required for GA4 exclusion. See #461 |
| `index.html` | `urlHasCITest` check | GA4 CI traffic filter |
