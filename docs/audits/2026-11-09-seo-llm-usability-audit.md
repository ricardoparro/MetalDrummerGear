# MetalForge audit — SEO, LLM exposure, usability

*2026-11-09 · metalforge.io · audited against `origin/main` @ d37152ce2 and the live site*

**Fix status (branch `fix/week1-audit-repairs`, not yet merged or deployed):** section 2 items 1–6 and 8 are fixed in code, plus three more production crashes found while testing (`/battles`, `/gear-news`, `/privacy-policy`). Item 7 needs real affiliate IDs. Still open from section 2: unknown URLs outside `/drummer/` and `/bands/` still show the homepage with HTTP 200.

**Sources:** live crawl (curl as 32 user agents, 60 random sitemap URLs as Googlebot), headless mobile pass (iPhone 13 emulation, 21 page loads), desktop Chrome, GA4 UI (28 days, Oct 12 – Nov 8), committed GA4/GSC/indexation/citation/Lighthouse snapshots (290 digests since June 16), code review of `api/meta`, `vercel.json`, `middleware.js`, sitemap, robots, llms generators.

Items are **verified** unless tagged *(inferred)*.

---

## 1. Where the site stands

| | 7 days (Nov 9) | 28 days (GA4) |
|---|---|---|
| Users / sessions / views | 457 / 533 / 763 | 1,658 / 1,909 / 2,713 |
| Engagement rate | 64.5% | 63.1% |
| Avg engagement per session | — | 34s |
| Pages per session | 1.43 | 1.42 |
| GSC impressions / clicks / CTR / position | 15,137 / 307 / 2.03% / 8.1 | — |
| Key events / revenue | — | 0 / €0 |

- **Growth then plateau.** Users and clicks grew about 12× from mid-June to early October. Users have been flat at 410–470/week since Oct 5.
- **Channel mix (28d).** Organic Search 79% of sessions (70.6% engaged, 40s). Direct 20% (33% engaged, 7s). Referral 13 sessions, AI Assistant 3, Organic Social 2.
- **Device (28d).** Mobile 51.6% (65.7% engaged, 44s), desktop 47.1% (59.2%, 30s), tablet 1.3%.
- **Long tail.** 646 distinct landing pages for 1,909 sessions; the biggest single page gets 43. Articles hold attention best (51–59s); drummer profiles 19–51s; the homepage 7s; guides 4–19s.
- **Traffic is not converting to anything.** `gear_click` fired 30 times from 24 users (1.4% of users). Newsletter `form_start`: 2. Quiz started: 5 users. Site search: 2 users. Kit builder: 3. `gear_click` is the retailer-click event (one of the three button sets fired nothing); no newsletter-subscribe event existed.

---

## 2. Broken right now (fix first)

| # | Problem | Evidence | Effect |
|---|---|---|---|
| 1 | **Social preview images 404.** All `/api/card/*` and `/api/og/*` edge functions return Vercel `NOT_FOUND`; `/images/albums/*` and `/images/og/*` return the SPA shell. | 8/8 endpoint variants 404. In the 59-page sample only `/og-image.png` and `/images/drummers/*.webp` resolved; 16 pages use a relative `og:image`. | Every drummer profile, guide and album article has a dead `og:image`. |
| 2 | **Social and several AI crawlers get the empty shell.** Only 17 UA tokens are routed to the server-rendered page. | facebookexternalhit, Twitterbot, Slackbot, WhatsApp, Discordbot, LinkedInBot, TelegramBot, Applebot, DuckDuckBot, DuckAssistBot, CCBot, Amazonbot, Meta-ExternalAgent, MistralAI-User, Bytespider, Yandex all received the 11.8 KB shell: homepage title, no canonical, no OG tags. | No link previews anywhere; Common Crawl and several assistants see no content. |
| 3 | **Google-InspectionTool reload loop.** The bot page's inline script redirects any UA not matching `/bot\|crawl\|spider…/`; "Google-InspectionTool" doesn't match but is routed to that page. | 502 main-frame navigations in 6 seconds with that UA; Googlebot: 1. | GSC "Test live URL" and Rich Results Test cannot render any page. |
| 4 | **`/bands/*` shows "Band Not Found" to users.** | 3 of 3 tested (metallica, sepultura, slipknot); 49 such URLs are in the sitemap. Bots get content. | Broken page type; 8 already flagged soft-404 by Google. |
| 5 | **Soft 404s.** Unknown URLs return 200. | Users get the homepage silently; bots get a stub with a self-canonical. `/feed.xml`, `/.well-known/llms.txt`, `/sitemap-index.xml` also return the shell. `public/404.html` is unreachable. | Wasted crawl budget, index bloat, confusing dead links. |
| 6 | **The `ci_test` analytics guard is not deployed.** `urlHasCITest` is absent from live HTML; `gtag('config')` runs unconditionally. | 0 matches in live HTML; GA collect requests fired on `?ci_test=1` loads. `inject-ga.cjs` writes a snippet with no guard. | CI traffic is counted. The Direct channel (381 sessions, 7s) is probably mostly this *(inferred)*. |
| 7 | **Affiliate IDs are placeholders.** `affiliateLinks.js` uses `'metaldrummergear'` for both Thomann and Sweetwater; the "Shop" buttons are `<div>`s with no `href` and no `rel="sponsored"`. | Code + DOM inspection. | Zero revenue is possible from the site's only commerce path. |
| 8 | **Markdown-for-agents returns thin, wrong content.** `Accept: text/markdown` on `/drummer/joey-jordison` returns 1.7 KB: a one-line bio and three Lars Ulrich articles. | The static `/llms/drummers/joey-jordison.md` is 12 KB and correct. The same wrong related articles appear in the bot HTML. | Agents asking for markdown get the worst version of the page. |

---

## 3. SEO

**Architecture.** Bots and users get two different documents, chosen by user agent. The bot document is a separate text-only template (H1, description, FAQ, a few links); users get a 5.6 MB (decoded) client-rendered app whose raw HTML carries the homepage title and no canonical. Google never sees the real app.

**Consequences found in the crawl:**
- **Internal linking is nearly absent for crawlers.** The homepage bot page has one link, to itself. In the sample, 51 of 59 pages had ≤3 internal links; all 232 `/tools/compare/*` have zero. Discovery depends entirely on the sitemap.
- **Thin pages at scale.** 72 drummers produce 3,159 sitemap URLs (~44 per drummer). In the sample, 43 of 59 bot pages had under 400 words; `/vs/*` pages 113–183. Median body is 39–66 words for `/pedals/setups`, `/snares/signature`, `/cymbals/setups`, `/gear/item`, `/drummers/*/endorsements`.
- **Duplication.** `/vs/a-vs-b` and `/vs/b-vs-a` are both self-canonical; 68 pairs exist under both `/vs/` and `/tools/compare/`; 70 duplicate-title groups (mostly `/drummer/x` vs `/drummer/x/bio`); 278 `best-<gear>-for-<genre>` guides are a 15×18 template matrix.
- **Titles.** 1,921 of 3,157 exceed 60 characters. The H1 repeats the full title including "| MetalForge". 89 titles and 297 descriptions contain unescaped quotes that break the meta attribute.
- **No images in bot HTML** (0 `<img>` on every page checked), so no image search presence.
- **Sitemap.** 86% of URLs carry a hardcoded `lastmod` of 2026-07-25; all but one have priority ≥0.7. Both signals are meaningless as shipped.
- **Host duplication.** `www.metalforge.io` serves 200 instead of redirecting to the apex.
- **Bot responses are uncached** (`cache-control: public`, no max-age; every hit is a function call from `iad1`). Median TTFB 0.41s, p90 0.77s.

**Indexation (latest state of 3,151 URLs).** 80.6% indexed; 183 discovered-not-indexed, 133 duplicate, 116 crawled-not-indexed, 62 "Google chose a different canonical", 15 soft-404. Weakest: `/drummers/*/licks` 45%, `/drummers/*/gear-history` 64%, `/bands/*` 65%.

**A de-indexing wave started mid-October.** Crawled-not-indexed per run went from ≤4 to 18 → 27 → 29 → 37, and 99 previously indexed URLs flipped out — including the hubs `/drummers`, `/articles`, `/guides`, `/lists`, `/vs`, `/gear`. The team's notes call it a stale-crawl artifact; the data says otherwise.

**Queries.**
- Winners are specific gear queries at positions 3–7: "john otto cymbal setup", "eloy casagrande slipknot drum kit", "mario duplantier drum kit", "bill ward cymbals".
- The largest untapped pool is bare drummer names at positions 10–13 (halpern, ilejay, cavalera, herrera, talley, garstka, dailor): ~28k impressions in 4 weeks, 2 clicks.
- Recent losers: "john otto signature snare" (7 → 0 clicks), "best death metal drummers" (pos 7.7 → 18.6), the Danny Carey cluster, "joey jordison drum kit" (pos 7.7 → 9.6).
- The weekly query watch covers only 34 of 307 clicks; no page-level GSC data is stored.
- 81 spam-like queries ("best rust-proof drum sticks 20xx") appeared on Nov 2 and now fill half the citation-tracking list.

**Authority.** No backlink count exists anywhere (`backlinks-manual-log.json` is empty). GA4 shows 19 referring domains in 90 days sending 43 sessions total.

**Content trust.** About 900 distinct "fabricated fact" fix issues appear in the digest history, and they are still arriving daily. The same fact is stored in up to six data files, so fixes relapse. All 1,341 Article schemas have an Organization author; articles cite no external sources in the rendered page.

**Done well.** Every sitemap URL has a working bot route and a self-canonical; canonicals strip query strings; legacy slugs 301; no accidental noindex; JSON-LD parses cleanly on all pages checked; no fabricated ratings.

---

## 4. LLM exposure

- **Citations are falling.** Perplexity citation rate: 13/65 (Jul) → 74/100 (Sep 14 peak) → 47 → 27 → 39 → 17 → **16/100** (Nov 9). A stable 69-query subset also halved (27 → 13) the week after the crawler-routing change in PR #10067 *(correlation, not proven cause)*.
- **Where it wins and loses.** Album-specific 4/4, brand 2/2; drummer head terms 4/13, fact lookups 3/15, comparisons 1/6, how-to 0/2, GSC-derived 1/54.
- **Who gets cited instead.** Wikipedia (46 queries), YouTube (35), Equipboard (30), MusicRadar (29), DrumFaster (21), Drumeo (18).
- **Only Perplexity is measured.** ChatGPT, Gemini/AI Overviews, Claude and Copilot are not tracked.
- **Almost no AI traffic.** 3 "AI Assistant" sessions in 28 days. chatgpt.com and perplexity.ai have never appeared as referrers.
- **The surface is large but unfocused.** `llms.txt` is hand-maintained and stale (says 67 drummers; actual 72), has four H1s, and 19 of 61 links point to directory URLs that return the SPA shell. `llms-full.txt` is 2.08 MB — too large for any assistant to fetch in one read. 2,028 `.md` files (27 MB) have no canonical or `X-Robots-Tag`, so they are indexable duplicates of the HTML pages; when the site is cited, it is mostly these `.md` URLs rather than the real pages.
- **Markdown negotiation** covers only `/` and `/drummer/:slug`, and returns the thin version (item 8 above).
- **robots.txt** welcomes AI bots, but `Crawl-delay: 10` under `*` applies to Bingbot, OAI-SearchBot, Claude-SearchBot, Claude-User and Perplexity-User, which have no named group.

**Read:** the LLM effort has gone into volume of machine-readable files. What assistants reward is being the most trustworthy source for a fact, and the fabrication churn plus missing sources and authors work directly against that.

---

## 5. Usability

**Mobile (52% of users).**
- **A first-visit newsletter panel covers the bottom ~40% of the screen on every page**, with a floating "Take Quiz" button overlapping its consent checkbox. It produced 2 form starts in 28 days.
- **The logo is nearly invisible** in light theme: "Drummer Gear" is dark text on the dark header.
- **Pages are very long**: homepage 13.8 screens, drummer profile 15.1, article 18.8.
- **Tap targets**: 86 of 145 on the homepage are under 44px ("View Gear →" links are 87×18).
- **LCP on articles, lists and quiz is ~10.5s** on throttled mobile, matching the committed Lighthouse runs (11.5–12s; score 45–58). Homepage and drummer pages paint fast (LCP under 1s) but carry 800–2,400ms of blocking time. Every page downloads ~2.2 MB of JavaScript.

**Desktop (47%).**
- **No max-width.** On a 2,550px display content stretches edge to edge: drummer list rows span the full width, article lines run ~2,500px, and the article header is misaligned (title centred, intro squeezed left).
- **Article CLS 0.20** on desktop (poor).

**Both.**
- **The answer is buried.** On a drummer profile — the page people land on for "X drum kit" — the gear list sits about four screens down, below quick facts, bio, quotes, bands, timeline, songs and techniques. It is small text with no product images and ghost-style shop buttons.
- **The homepage leads with tools nobody uses.** Its three hero cards promote the quiz, beginner guide and compare tool; in 28 days these got 11 CTA clicks from 3 users. Homepage engagement is 7s.
- **Brand is split.** The header and browser title say "Metal Drummer Gear"; search results, schema and the domain say "MetalForge".
- **The newsletter bar stays on screen for subscribers**, showing "You're subscribed!" permanently.
- **Unknown URLs silently show the homepage**; there is no "not found" state.
- **Accessibility.** The drummer page has 17 `<h1>`s; article, list, guide, vs and quiz pages have no heading elements at all. There is no footer landmark. The page scrolls inside an inner container, so the browser's own scroll position, and GA's scroll event (which fires on almost every load), are meaningless.
- **No consent banner** although GA4 and AdSense load for EU visitors.

---

## 6. Recommended order

**Week 1 — repair what is broken**
1. Restore the OG/card image functions and the missing image directories; make every `og:image` absolute.
2. Route social unfurlers and the remaining AI crawlers to the server-rendered page; remove the self-redirect script (fixes the InspectionTool loop).
3. Fix `/bands/*` for users; return real 404s for unknown slugs.
4. Re-deploy the `ci_test` guard in the build-time GA snippet; add a `newsletter_subscribe` event and mark it and `gear_click` as key events.
5. Get real affiliate IDs (issue #529 has been open since July) and turn the shop buttons into real links with `rel="sponsored"`.

**Weeks 2–4 — stop the index decline**
6. Put real internal links in the bot HTML: hub links on the homepage, related drummers/articles everywhere.
7. Consolidate thin families: fold the seven per-drummer gear-facet pages and `/bio` into the profile; pick one of `/vs` or `/tools/compare`; canonicalise `a-vs-b`/`b-vs-a`; noindex families with a median under ~100 words.
8. Add `X-Robots-Tag: noindex` plus `Link: rel=canonical` to `/llms/**`; fix the markdown negotiation to serve the full `.md`; regenerate `llms.txt` in the build.
9. Honest `lastmod`; escape meta attributes; shorten titles; drop the title suffix from H1.

**Month 2 — earn trust and clicks**
10. One sourced record per gear fact, with the source URL shown on the page; named authors. This is the lever for both rankings on bare-name queries and AI citations.
11. Drummer profile: gear list first, with images and prominent shop links. Homepage: lead with search and popular drummers, not tools.
12. Mobile: replace the 40% newsletter panel with a slim dismissible bar; fix header contrast; 44px tap targets. Desktop: max-width ~1,200px.
13. Performance: fix the 10s+ LCP on articles/lists; longer term, replace UA-split rendering with one prerendered HTML for everyone.
14. Backlinks: the outreach issue (#5141) has been open 100 days and no backlink count exists; log a GSC Links baseline.

---

## Caveats

- **My audit added traffic to GA4 today.** Roughly 30 page loads (headless mobile and desktop Chrome), all with `?ci_test=1` in the URL, were recorded because the guard is not live. They are identifiable by that parameter in `page_location`.
- GA4 numbers likely include CI/bot traffic for the same reason; treat Direct as unreliable.
- Indexation states are up to 12 weeks stale per URL (rotating inspection).
- LLM citation data is Perplexity-only.
- Mobile timings are emulated (4× CPU, ~1.6 Mbps), not field data.
- I could not read GSC directly (local Google credentials are expired); GSC figures come from the committed snapshots.
