# SEO/LLM Optimization Plan — MetalForge

**Goal:** Become the #1 resource for metal drummer gear information  
**Site:** https://metalforge.io (Vercel: metal-drummer-gear.vercel.app)

## Current Status (2026-02-07)

### ✅ Completed — Foundation (Phase 1)
- **Title & Meta:** "MetalForge - Discover What Pro Metal Drummers Play" (#19)
- **robots.txt:** Proper format with sitemap reference (#18)
- **sitemap.xml:** Dynamic generation with all drummer + gear pages (#18, #30)
- **Open Graph:** Full OG tags for social sharing
- **Twitter Card:** summary_large_image configured
- **Canonical URL:** metalforge.io set correctly
- **Google Analytics:** GA4 tracking (G-HKLHH1DCC7)

### ✅ Completed — Content Optimization (Phase 2)
- **Alt text:** All images have accessibility labels
- **Unique meta descriptions:** Dynamically generated per drummer
- **FAQ sections:** Per drummer via FAQPage schema

### ✅ Completed — Structured Data (Phase 3)
- **Person Schema:** JSON-LD for each drummer page with sameAs entity links
- **WebSite Schema:** JSON-LD for homepage
- **FAQPage Schema:** For drummer pages (#36)
- **ItemList Schema:** Collection markup for homepage (#37)
- **Product Schema:** JSON-LD for gear pages
- **BreadcrumbList Schema:** Navigation structure (#66) ✅
- **sameAs Entity Links:** Wikipedia, social profiles for LLM entity verification (#67) ✅
- **SpeakableSpecification Schema:** Voice search optimization ✅
- **VideoObject Schema:** YouTube embeds on drummer pages (#183, #186) ✅
- **Quotation Schema:** Drummer interview quotes ✅

### ✅ Completed — Performance & Media (Phase 4)
- [x] **Core Web Vitals optimization** — #442 ✅
  - YouTube facade pattern (500KB+ savings per embed)
  - Above-fold image preloading
  - Enhanced CLS prevention for videos/images
  - INP optimizations for faster interactions
  - YouTube preconnect hints
- [x] **Image optimization** (WebP, lazy loading) — #323 ✅

### ✅ Completed — Entity Relationships (Phase 5a)
- [x] **MusicGroup schema** linking drummers to bands — #517 ✅

### 📋 Future Enhancements (Phase 5b — Feature-Dependent)
- [ ] AggregateRating for gear items (requires user reviews feature)
- [ ] HowTo schema for gear setup guides (if content added)
- [ ] SearchAction schema for site search (if implemented)

---

## Phase Summary

| Phase | Focus | Status |
|-------|-------|--------|
| 1 | Technical Foundation | ✅ Complete |
| 2 | Content Optimization | ✅ Complete |
| 3 | Structured Data / LLM | ✅ Complete |
| 4 | Performance & Media | ✅ Complete |
| 5a | Entity Relationships | ✅ Complete |
| 5b | Feature-Dependent | 📋 Blocked |

---

## Metrics to Track
- Google Search Console impressions/clicks
- Rich result appearances
- AI citation frequency (manual tracking)
- Core Web Vitals scores (LCP, FID, CLS)
- Lighthouse Performance score

## Notes
- Ralph (AI agent) auto-fixes issues with `ai-fix` label
- SEO agent runs daily at 8AM (Lisboa timezone)
- All structured data uses schema.org vocabulary
- 21 drummers currently with bios, gear, videos, endorsements

## Recent Progress
- **2026-06-11:** 🔍 **SEO Agent run** (now hourly-night/3h-day cadence post `3b5bb72`). Audit + 2 net-new proposals.
  - **Audit:** robots.txt allows all 8 AI crawlers ✅. `/llms/` surface **complete**: `index.md` + `faq.md` (#1019) + `gear-guide.md` (#1020) + **61 drummer `.md`**, all sitemap-listed (#1021/#1022). `#1017` LLM-surface proposal **fully shipped** (split #1019–1022, merged). Lick pages now carry HowTo+VideoObject JSON-LD (#1010 merged). Quick Facts box live + mobile-tuned (#991/#1001). GSC still **blind** (`GSC_SITE` missing, #910) — proposals on GA4-only signal. No live Lighthouse (no Chrome in sandbox); fundamentals verified statically.
  - **📈 Traffic inflected UP:** GA4 active users **44 → 58 (+32% WoW)**, Organic Search sessions **33 → 46 (+39% WoW)**, organic = **69%** of sessions. First clear week-over-week growth — coincides with the lick/programmatic surface expansion (#1011/#1014/#992-998 all merged this week). The compound-SEO thesis is now data-backed, not just hypothesized.
  - **Pipeline now consuming:** the drain-the-queue Watcher + PR-merger (`f01d207`/`2234b60`) merged — `ai-fix` issues are being implemented + merged autonomously (Ralph→PR→merge), so filing on-strategy proposals is no longer "noise into an unconsumed queue." #909 is effectively resolved (option-B live).
  - **Lick surface status:** Phase 2 landing — #1010/#1011/#1014 **merged**, #1012 (Greiner+Koller) + #1013 (Carey+Hoglan+Haake) open `ai-fix` PRs. Coverage **10/62 drummers** today → 15/62 once #1012/#1013 merge. `/licks` HTML index hub filed earlier today (#1042, promoted).
  - **Filed #1044** (`seo-proposal`, batch, 🟠 programmatic): **Signature Licks Phase 3a** — 8 GA4/marquee drummers × 3 licks (~24 pages + 8 hubs). **Lead: Matt Halpern (drummer/18) — top-10 organic THIS week with zero lick coverage** (data-validated gap). Diverse sub-genre coverage (djent/groove/thrash/nu/prog/death). Quality gate + `--strict` YouTube guard (#984) + suggested 4-way atomic split inline.
  - **Filed #1045** (`seo-proposal`, single, 🟡 LLM-citation): **`/llms/licks.md`** — expose the proven-organic lick surface to AI crawlers. Confirmed net-new: `grep -ic lick public/llms/drummers/joey-jordison.md` = **0**; no `licks.md` exists. Our best-ranking content is invisible to the LLM markdown layer. Cheap, auto-generated, compounds with #1044.
  - **Deferred (deliberately):** Phase 3b (remaining ~39 drummers after 3a) — hold until 3a validates and #1012/#1013 land, to keep the proposal queue matched to consumption.
- **2026-06-12:** 🔍 **SEO Agent weekly run (Week 2).** Audit + 2 net-new single-fix proposals, both targeting GA4 organic darlings the saturated `ai-fix` queue doesn't touch.
  - **Audit:** robots.txt allows all 8 AI crawlers (+ Claude-Web) ✅. Quick Facts box shipped to all 62 drummer pages (#991/#1030 mobile-tuned) ✅. LLM markdown surface complete: `index.md` + `faq.md` (#1034) + `gear-guide.md` (#1035) + **61 drummer `.md`** + `llms-full.txt` (302KB) all live; `/llms/*.md` now in sitemap (#1037) ✅. Pipeline **confirmed consuming** — ~1 SEO PR/day merging since 06-08 (technique #1023/1025/1027, gear-series #1024/1026/1028/1029, lick schema #1036, lick batches #1038/1041, related-drummers #1031, canonical #1033). GSC still **blind** (#910). Live Lighthouse not run (no Chrome in sandbox); fundamentals verified statically.
  - **Found the lick/programmatic queue heavily saturated** (open `ai-fix`: Phase-2 licks #1012/#1013, Phase-3b licks #1047–1050, hubs #1042/#1045, `/facts` #1051, #874 internal-linking #1006/#1007). Did **not** duplicate any of it.
  - **NEW finding — top organic pages missing from sitemap.** The #2 page `/drummers` (10 views/wk, the 62-profile hub) and #3 page `/quiz` (7 views/wk) are real indexable routes (`App.js:17732`, `:17745`) but **absent from `api/sitemap.js`** — found by Google via internal links only, never formally declared. Same bug class as #1051 (`/facts`) but on pages *already proven to rank*.
    - **Filed #1053** (`seo-proposal`, 🔴 atomic): add `/drummers` + `/quiz` (bare paths) to sitemap.xml.
    - **Filed #1054** (`seo-proposal`, 🟠 atomic): fix `/quiz` canonical fragmentation — quiz-result variants (`/quiz?result=<slug>`, ~62) self-canonicalize via `ogMetaTags.js:401` + default `setCanonical:true`, splitting the page's ranking signal. Force canonical → `/quiz`, keep result-specific og:url for share cards. Complements #1053.
  - **Deferred (deliberately):** no new lick/technique/internal-link proposals — that queue is full and consuming; over-filing it = noise (anti-noise principle).
- **2026-06-12:** 🔍 **SEO Agent run (Week 2).** Audit + 1 net-new proposal. **Queue found freshly saturated** — an automated run the prior night (06-11 19:57 → 06-12 00:56 UTC) already filed the full on-strategy batch and the CEO promoted most to `ai-fix`; did **not** duplicate any of it (anti-noise).
  - **Shipped since the inaugural run (all merged to main):** Signature Licks **Phase 2** #1010–1014 (HowTo+VideoObject+MusicRecording+BreadcrumbList JSON-LD on lick pages + Garstka/Raatikainen/Greiner/Koller/Carey/Hoglan/Haake/Dailor/Portnoy/Casagrande); **LLM surface** #1017 → #1019 (`/llms/faq.md`) + #1020 (`/llms/gear-guide.md`) + #1021/#1022 (`/llms/*.md` in sitemap + refreshed `llms.txt`); **technique pages** #992–994 (`/technique/<slug>/drummers`); **gear/series pages** #995–998 (`/gear/<brand>/<series>/drummers-using`); **internal-linking** #1005 (related-drummers block); **canonical fix** #1015 (self-referencing on `/drummer` profiles); **Quick Facts mobile** #1001.
  - **Audit (static — no Chrome/egress in sandbox):** robots.txt allows all **8 AI crawlers** ✅ (`api/robots.js`). Sitemap (`api/sitemap.js`) comprehensive: 61 drummers, 30 lick pages (12 drummers), technique + gear/series programmatic pages, `/llms/index|faq|gear-guide.md` + 61 per-drummer `/llms/drummers/*.md`. Schema complete across **all** page types incl. the proven-organic lick surface (`generateLickSchema` emits a full `@graph`: VideoObject + HowTo + MusicRecording + BreadcrumbList). LLM surface: `index.md` + `faq.md` + `gear-guide.md` + 61 drummer md + `llms.txt`/`llms-full.txt` all live.
  - **Metrics (GA4 7d, GSC still blind #910):** Organic = **65%** (39/60 sessions). Top pages: `/` (29), **`/drummers` (10)**, **`/quiz` (7)**, Joey `/drummer/2` (6), Greiner/Koller/Casagrande/Halpern/Garstka profiles, `/articles/whats-in-mike-portnoys-kit` (3). The `/drummers` & `/quiz` index pages (now #2/#3 organic) and the Portnoy kit article are all GA4 darlings — the prior-night batch already filed sitemap+canonical fixes for the first two (#1051/#1053/#1054).
  - **Filed #1058** (`seo-proposal`, net-new, 🟡 LLM-citation): expose the **61-article corpus** to the `/llms/articles/<slug>.md` Markdown surface — the last content type absent from the per-type LLM layer (#873/#1017 did drummers+faq+gear-guide). Serves the GA4-proven "what's in <drummer>'s kit / <album> drum setup" query bucket; reuses the shipped `generate-llms-*.cjs` pattern. **The one SEO lane the saturated `ai-fix` queue doesn't touch.**
  - **Binding constraint unchanged:** **GSC blind** (`GSC_SITE` missing, #910) — the #1 KPI is unmeasurable, so all prioritization runs on GA4-only signal. Already escalated ×3; not re-spamming.
- **2026-06-12:** 🔍 **SEO Agent run** (Fri). Audit + 1 net-new proposal; **anti-noise hold** on everything else (queue saturated).
  - **Audit (static — no Chrome/egress):** robots.txt allows all 8 AI crawlers ✅. Quick Facts box live (#872). LLM markdown surface live: `index.md`+`faq.md`+`gear-guide.md`+**61 drummer `.md`**, all in sitemap (#1019-1022); `articles/*.md` (#1058) + `licks.md` (#1045) in queue. Sitemap is comprehensive (drummers, gear, techniques, vs, licks, guides, tools…). **GSC still blind** (`GSC_SITE` missing, #910) — GA4-only signal.
  - **Verified two canonical/duplicate-content candidates are already CLOSED (did not re-file):** (1) drummer profile numeric-vs-slug `/drummer/2` → slug canonical fixed by #1015; (2) gear-category sub-pages `/drummer/:slug/:category` normalize to slug canonical server-side (`api/gear/[slug]/[category].js:245`). Mature canonical handling.
  - **Queue saturation acknowledged:** overnight/early-AM Actions runs already filed the full data-aligned batch — #1042 (/licks index hub), #1045 (/llms/licks.md), #1047-1050 (signature licks Phase 3, 8 drummers), #1051 (/facts orphan→sitemap), #1053 (/drummers + /quiz → sitemap), #1054 (/quiz canonical), #1058 (article LLM markdown). These map 1:1 to the GA4 top-page + proven-lick signal. Did **not** duplicate any (anti-noise).
  - **Filed #1062** (`seo-proposal`, 🟡 schema polish, net-new): add `SearchAction` (sitelinks searchbox) to the **homepage `WebSite`** JSON-LD (App.js:4290). Today only a deep `WebPage` SearchAction exists on `/tools/gear-search` — doesn't qualify for the rich result, which must hang off the site-wide `WebSite` entity. Search endpoint `/tools/gear-search?q={term}` is real (GearSearch.js:345). Unblocks the long-deferred Phase 5b "SearchAction (if implemented)" item now that search exists. The one SEO lane the saturated queue doesn't touch.
- **2026-06-12:** 🔍 **SEO Agent run.** Audit + 1 net-new proposal (anti-noise: queue heavily saturated).
  - **Audit:** Served `/robots.txt` is the **`api/robots.js`** handler (vercel.json rewrites `/robots.txt → /api/robots`) — all **8 AI crawlers ✅** present there. ⚠️ Two *dead* static robots.txt (`public/robots.txt`, `packages/frontend/web/robots.txt`) drift from the served version but are unreachable (not worth a fix). GSC **still blind** (`GSC_SITE` missing, #910). Live Lighthouse not run (no Chrome in sandbox); fundamentals verified statically. Sitemap healthy — `/drummers`,`/quiz`,`/facts` gaps already covered by open proposals #1051/#1053/#1054.
  - **Queue saturation:** ~16 open `ai-fix`/`seo-proposal` issues, most filed overnight (06-11/12) covering the obvious wins — SearchAction (#1062), `/llms/articles/*.md` (#1058), quiz canonical (#1054), sitemap adds (#1053), `/facts` (#1051), `/licks` hub (#1042), `/llms/licks.md` (#1045), signature-lick batches (#1012/#1013/#1047-1050), signatureLicks modularization (#1056). Did **not** duplicate any.
  - **Filed #1064** (`seo-proposal`, net-new, programmatic): **complete #777's Article-schema coverage.** `api/meta/[...path].js` only hardcodes **8** of 60+ `/articles/<slug>` in `ARTICLE_METADATA`; the other **~52** (incl. top-10 GA4 page `/articles/whats-in-mike-portnoys-kit`) hit the generic fallback → duplicate title `Drum Gear Article | MetalForge`, no description, **no Article JSON-LD**. Fix = wire the fallback to `ALBUM_ARTICLES` (all 60 already carry title/description/dates/author/keywords/ogImage). One-file, atomic, Watcher-friendly; lights up ~52 already-indexed pages. Complements (no overlap) #1058.
- **2026-06-08:** 🔍 **Inaugural SEO Agent cron run** (Mondays 08:00 UTC). Audit + 1 net-new proposal.
  - **Audit:** robots.txt allows all 8 AI crawlers ✅. Quick Facts box live on drummer pages (#872 merged, commit `fbf985e`; mobile tweaks pending #1001). LLM markdown surface: `index.md` + **61/61 drummer `.md`** + `llms-full.txt` all live. GSC still **blind** (`GSC_SITE` missing, #910) — proposals run on GA4-only signal. Live Lighthouse not run (no Chrome/egress in cron sandbox); SEO fundamentals verified statically (title/meta/canonical/schema all present in code).
  - **Found the standard programmatic queue already saturated:** overnight CEO atomic-split filed + promoted the whole on-strategy batch — CEO-024 signature licks (#1008→#1010–1014), internal-linking #874 (#1005–1007), technique #870 (#992–994), gear/series #871 (#995–998), Quick Facts mobile #872 (#1001), canonical #1015. Did **not** duplicate any of it (anti-noise principle).
  - **Filed #1017** (`seo-proposal`, net-new, 🟡 LLM-citation): complete the `#873` LLM markdown surface — add `/llms/faq.md` + `/llms/gear-guide.md`, put `/llms/*.md` in the XML sitemap, refresh stale `llms.txt` (Feb-4, undercounts the surface). Only SEO lane the saturated `ai-fix` queue doesn't touch.
  - **Deferred (deliberately):** Signature-Lick **Phase 3** (remaining ~47 drummers) — holding until Phase 2 (#1010–1014) lands, to avoid over-filing an unconsumed queue (#909: no autonomous implementer; Ricardo merges).
- **2026-06-12:** 🔍 **SEO Agent run (Week 2, late).** Audit + 1 net-new proposal; anti-noise hold on everything else.
  - **Audit (static — no Chrome/egress):** robots.txt allows all 8 AI crawlers ✅. Quick Facts (#991), LLM markdown surface (index/faq/gear-guide + 61 drummer `.md`, all sitemapped #1037) ✅. Internal-linking blocks now wired into **every** drummer page — #1007 **merged** (`3f3e4f9`), #1006 `SharedGearDrummersBlock` merged (`c5351ea`), related-drummers merged (`411ca1e`). Lick batches #1011/#1012/#1013/#1014 all **merged**. GSC **still blind** (`GSC_SITE`, #910) — GA4-only signal.
  - **Queue freshly saturated:** an automated run filed **#1069** (CollectionPage+ItemList on `/drummers`) at 14:03 and CEO PR #1071 already triaged it → `ai-fix` + shipped #1007. Open `seo-proposal`/`ai-fix`: #1051/#1053/#1054/#1058/#1062/#1064/#1069 (all SEO), #1042/#1045 (lick hubs), #1047-1050 (signature licks Phase 3), #1056 (modularize). Did **not** duplicate any (anti-noise).
  - **Metrics (GA4 7d, refreshed 06-12 14:07):** 52 users / 60 sessions / 120 views. **Organic = 68% (41/60 sessions).** Top pages: `/` (32), `/drummers` (10), `/quiz` (7), drummer profiles (`/drummer/2,32,34,7,18,53`), `/articles/whats-in-mike-portnoys-kit`.
  - **Filed #1072** (`seo-proposal`, 🟢 net-new, single-file): **sitemap `<lastmod>` repair.** `api/sitemap.js:408` stamps `lastmod = today` on **every** URL on **every** request → Google discards the lastmod signal site-wide (verifiably-inaccurate trigger, per Google's sitemap docs). Fix = use real `ALBUM_ARTICLES.dateModified` for `/articles/<slug>` (60 entries carry it) + a single stable `SITE_LASTMOD` constant for all other URLs. Restores crawl-scheduling signal across the whole expanding surface — directly on-mission. Atomic, one-file, Watcher-friendly. Confirmed no prior issue touches lastmod. The one SEO lane the saturated queue doesn't touch.
- **2026-03-25:** SEO audit — Created #777 (Article schema for content) and #778 (WebApplication schema for tools)
- **2026-02-21:** SEO audit — MusicGroup complete (#517), Phases 1-5a done. Remaining items blocked on features.
- **2026-02-16:** Core Web Vitals optimization (#442) — YouTube facade, image preloading, CLS/INP improvements
- **2026-02-07:** Closed #292 — VideoObject schema already implemented (since #183/#186)
- **2026-02-04:** SEO audit — All Phase 3 work confirmed complete, updated plan
- **2026-02-02:** Speakable schema implemented
- **2026-02-02:** BreadcrumbList (#66) and sameAs (#67) completed
- **2026-02-01:** FAQPage (#36) and ItemList (#37) completed

---
*Last updated: 2026-06-12 by SEO Agent (Week 2 late run — filed #1072 sitemap-lastmod repair; queue otherwise freshly saturated/triaged, anti-noise hold). Prior proposals #1053/#1054/#1058/#1062/#1064/#1069 all CEO-approved → ai-fix. Run logs use a `merge=union` driver to stop run-log merge conflicts.*
