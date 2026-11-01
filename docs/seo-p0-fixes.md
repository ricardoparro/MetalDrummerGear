# SEO / LLM P0 fixes — 2026-11-01

Local implementation on `codex/metalforge-p0`, based on main `4b90baa`.
Publishing and production verification require a later approved release.

## Changes

- Add OAI-SearchBot, Claude-SearchBot, Claude-User, Perplexity-User and
  Google-InspectionTool to all 99 existing bot-conditioned route rules and
  homepage middleware. Keep per-family routes and explicit Markdown negotiation.
  Handle lowercase bingbot in both layers. Preserve existing crawler access policy.
- Run all 42 LLM generators in deployment through the same command as local/CI.
  Order profile consumers and the index after their producers. Keep existing
  authored-section preservation. Retain old timestamps when content is unchanged.
- Refresh generated Markdown and the full-text database from current source data.
- Omit unknown gear from comparison/battle FAQs; remove invented custom kits,
  signature snares, pedals, cymbal brands and default price estimates from the
  affected templates. Endorsement FAQs require endorsement records, rather than
  treating gear use as proof of sponsorship. Preserve curated comparison prose.
- Remove request-time freshness from comparison and band schema, and the fixed
  comparison publication date that was applied to every pair.
- Add crawler/content regression tests to `npm test` and routing CI. Fix the
  route checker to recognize named-segment coverage. Extend freshness checks to
  `llms-full.txt` and staged changes; show full diffs only with `--verbose`.

## Verification

- `npm test`: 31 new regression tests + 34 existing backend tests pass.
- `bash scripts/build.sh`: production export succeeds; sitemap has 3,159 URLs.
- All 2,028 LLM documents remain byte-identical on repeat generation, including
  when the clock is advanced to 2026-11-02. Generated documents match the export.
- Data-module verification, sitemap drift, bot-rewrite coverage and JS/shell
  syntax checks pass. Final generation/freshness check passes against the commit.
- `npm run lint`: unavailable — `Missing script: "lint"`.
- Bundle budget remains a pre-existing failure: 5,595.7 KB vs 5,021.0 KB budget
  (111.4%). Performance work remains P1; the budget was not raised.
- Generated Markdown uses intentional two-space line breaks; whitespace checking
  ignores trailing blanks for those Markdown outputs.

## Release checks

After an approved deployment, request `/`, `/drummers`, `/drummer/joey-jordison`,
`/drummer/joey-jordison/cymbals` and `/articles/slipknot-self-titled-drum-setup`
with each newly supported crawler UA. Expect `X-Meta-Handler: hit-v1`, the correct
canonical/title and rendered content. Verify browser requests retain the app,
Markdown requests retain Markdown, and CDN responses do not mix representations.
Local tests execute the real middleware/meta handler and inspect route conditions;
they cannot certify Vercel/CDN behavior before deployment.

## Boundary

P0 only. No SSR migration, 404 redesign, performance changes, analytics changes,
new pages, link-building or new monitoring providers. Existing manually maintained
Markdown and preserved editorial sections still need the planned P1 source-data
consolidation; running generators is not a full independent fact-check of them.
