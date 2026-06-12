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
- **2026-06-12:** 🔍 **SEO Agent run** (Fri). Audit + 1 net-new proposal; **anti-noise hold** on everything else (queue saturated).
  - **Audit (static — no Chrome/egress):** robots.txt allows all 8 AI crawlers ✅. Quick Facts box live (#872). LLM markdown surface live: `index.md`+`faq.md`+`gear-guide.md`+**61 drummer `.md`**, all in sitemap (#1019-1022); `articles/*.md` (#1058) + `licks.md` (#1045) in queue. Sitemap is comprehensive (drummers, gear, techniques, vs, licks, guides, tools…). **GSC still blind** (`GSC_SITE` missing, #910) — GA4-only signal.
  - **Verified two canonical/duplicate-content candidates are already CLOSED (did not re-file):** (1) drummer profile numeric-vs-slug `/drummer/2` → slug canonical fixed by #1015; (2) gear-category sub-pages `/drummer/:slug/:category` normalize to slug canonical server-side (`api/gear/[slug]/[category].js:245`). Mature canonical handling.
  - **Queue saturation acknowledged:** overnight/early-AM Actions runs already filed the full data-aligned batch — #1042 (/licks index hub), #1045 (/llms/licks.md), #1047-1050 (signature licks Phase 3, 8 drummers), #1051 (/facts orphan→sitemap), #1053 (/drummers + /quiz → sitemap), #1054 (/quiz canonical), #1058 (article LLM markdown). These map 1:1 to the GA4 top-page + proven-lick signal. Did **not** duplicate any (anti-noise).
  - **Filed #1062** (`seo-proposal`, 🟡 schema polish, net-new): add `SearchAction` (sitelinks searchbox) to the **homepage `WebSite`** JSON-LD (App.js:4290). Today only a deep `WebPage` SearchAction exists on `/tools/gear-search` — doesn't qualify for the rich result, which must hang off the site-wide `WebSite` entity. Search endpoint `/tools/gear-search?q={term}` is real (GearSearch.js:345). Unblocks the long-deferred Phase 5b "SearchAction (if implemented)" item now that search exists. The one SEO lane the saturated queue doesn't touch.
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
*Last updated: 2026-06-12 by SEO Agent (audit + #1062 SearchAction proposal; anti-noise hold on saturated queue)*
