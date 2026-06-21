# Broken-image check

Weekly crawler that finds broken images on metalforge.io and tracks them via a **single, auto-maintained GitHub issue**.

## Pieces

| File | Role |
| --- | --- |
| `.agents/scripts/check-broken-images.cjs` | Pure crawler. Fetches sitemap, extracts `<img>` / `srcset` / `og:image` / `twitter:image` URLs from every page, HEADs each, writes a JSON report. No state, no GitHub calls. |
| `.agents/scripts/render-broken-images-issue.cjs` | Pure transform. JSON report → Markdown issue body. Caps page count + per-page image count so the body stays under GitHub's 65 KB limit. |
| `.github/workflows/check-broken-images.yml` | Mutator. Runs both scripts, then `gh` opens / updates / closes the umbrella issue. |

## How issues are tracked

The workflow finds the open issue labelled `broken-images` whose title starts with `Broken images on metalforge.io`. There is exactly one such issue at a time:

- **Broken found, no issue open** → create issue with labels `broken-images`, `ai-fix`.
- **Broken found, issue open** → edit the body in place + drop a refresh comment with the new totals.
- **Zero broken, issue open** → close it with a "0 broken" comment.
- **Zero broken, no issue open** → nothing.

This avoids the weekly-pile-of-duplicates failure mode and gives Ralph one ticket to drain.

## Local run

```bash
node .agents/scripts/check-broken-images.cjs \
  --base https://metalforge.io \
  --max-pages 300 \
  --out /tmp/broken-images.json

node .agents/scripts/render-broken-images-issue.cjs \
  --report /tmp/broken-images.json \
  --out /tmp/issue-body.md
```

Flags:

- `--base` — origin to crawl (defaults to `https://metalforge.io`).
- `--max-pages` — cap (default 300). The crawler sorts by priority (`/drummer/*`, `/articles/*`, `/bands/*`, `/gear/*` first), so the cap still hits the high-value surface even on a slow run.
- `--page-timeout` / `--image-timeout` — milliseconds per fetch (defaults 15 s / 8 s).
- `--concurrency` — page fetches in parallel; image fetches use 2× that.

## Detection rules

| Kind | Trigger |
| --- | --- |
| `missing` | HTTP 404 |
| `hotlink-blocked` | HTTP 403, or 200 with non-`image/*` `Content-Type` |
| `server-error` | HTTP 5xx |
| `network` | TCP/TLS/DNS error or timeout |
| `invalid` | URL did not parse from HTML |
| `empty` | HTTP 200 with `Content-Length: 0` (non-206) |
| `other` | Any other 4xx not in the buckets above |

HEAD is used first; if the origin replies 405/501, the script falls back to a `Range: bytes=0-0` GET so it never downloads full image bodies.

## Cadence

- **Schedule:** Mondays 06:30 UTC (`cron: '30 6 * * 1'`).
- **Manual:** `workflow_dispatch` with optional `base` and `max-pages` inputs.

## Fixing reported breakage

The umbrella issue groups by page and lists the image URL + HTTP status + reason. The standard fix path:

1. **Trace to the data source.** Most drummer images come from the `image` field in `api/drummers/index.js`; album/article images from `ogImage` in `packages/frontend/data/albumArticles.js`.
2. **Drop or replace the asset.** Local assets live under `public/images/`. If the file is missing, restore it; if the slug drifted, fix the field.
3. **Hotlinked third-party images** (Wikipedia, brand sites, YouTube thumbs) that 403 or content-type-mismatch are usually anti-hotlink. Host locally.
4. The `onError` fallback in `<DrummerImage>` (App.js) is a safety net, not the primary fix — fix the source first.

The next weekly run refreshes the issue body, so once the source is fixed the entry disappears (and if everything passes, the issue auto-closes).
