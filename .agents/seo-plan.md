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
- **2026-06-08:** 🔍 **Inaugural SEO Agent cron run** (Mondays 08:00 UTC). Audit + 1 net-new proposal.
  - **Audit:** robots.txt allows all 8 AI crawlers ✅. Quick Facts box live on drummer pages (#872 merged, commit `fbf985e`; mobile tweaks pending #1001). LLM markdown surface: `index.md` + **61/61 drummer `.md`** + `llms-full.txt` all live. GSC still **blind** (`GSC_SITE` missing, #910) — proposals run on GA4-only signal. Live Lighthouse not run (no Chrome/egress in cron sandbox); SEO fundamentals verified statically (title/meta/canonical/schema all present in code).
  - **Found the standard programmatic queue already saturated:** overnight CEO atomic-split filed + promoted the whole on-strategy batch — CEO-024 signature licks (#1008→#1010–1014), internal-linking #874 (#1005–1007), technique #870 (#992–994), gear/series #871 (#995–998), Quick Facts mobile #872 (#1001), canonical #1015. Did **not** duplicate any of it (anti-noise principle).
  - **Filed #1017** (`seo-proposal`, net-new, 🟡 LLM-citation): complete the `#873` LLM markdown surface — add `/llms/faq.md` + `/llms/gear-guide.md`, put `/llms/*.md` in the XML sitemap, refresh stale `llms.txt` (Feb-4, undercounts the surface). Only SEO lane the saturated `ai-fix` queue doesn't touch.
  - **Deferred (deliberately):** Signature-Lick **Phase 3** (remaining ~47 drummers) — holding until Phase 2 (#1010–1014) lands, to avoid over-filing an unconsumed queue (#909: no autonomous implementer; Ricardo merges).
- **2026-03-25:** SEO audit — Created #777 (Article schema for content) and #778 (WebApplication schema for tools)
- **2026-02-21:** SEO audit — MusicGroup complete (#517), Phases 1-5a done. Remaining items blocked on features.
- **2026-02-16:** Core Web Vitals optimization (#442) — YouTube facade, image preloading, CLS/INP improvements
- **2026-02-07:** Closed #292 — VideoObject schema already implemented (since #183/#186)
- **2026-02-04:** SEO audit — All Phase 3 work confirmed complete, updated plan
- **2026-02-02:** Speakable schema implemented
- **2026-02-02:** BreadcrumbList (#66) and sameAs (#67) completed
- **2026-02-01:** FAQPage (#36) and ItemList (#37) completed

---
*Last updated: 2026-06-11 by SEO Agent (audit + Phase 3a lick batch #1044 + /llms/licks.md #1045)*
