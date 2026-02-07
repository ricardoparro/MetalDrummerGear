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

### 🔄 In Progress — Performance & Media (Phase 4)
- [ ] **Core Web Vitals optimization** — HIGH PRIORITY
- [ ] **Image optimization** (WebP, lazy loading)

### 📋 Future Enhancements (Phase 5)
- [ ] AggregateRating for gear items (requires user reviews feature)
- [ ] MusicGroup schema linking drummers to their bands
- [ ] HowTo schema for gear setup guides (if content added)
- [ ] SearchAction schema for site search (if implemented)

---

## Phase Summary

| Phase | Focus | Status |
|-------|-------|--------|
| 1 | Technical Foundation | ✅ Complete |
| 2 | Content Optimization | ✅ Complete |
| 3 | Structured Data / LLM | ✅ Complete |
| 4 | Performance & Media | 🔄 In Progress |
| 5 | Future Enhancements | 📋 Planned |

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
- **2026-02-07:** Closed #292 — VideoObject schema already implemented (since #183/#186)
- **2026-02-04:** SEO audit — All Phase 3 work confirmed complete, updated plan
- **2026-02-02:** Speakable schema implemented
- **2026-02-02:** BreadcrumbList (#66) and sameAs (#67) completed
- **2026-02-01:** FAQPage (#36) and ItemList (#37) completed

---
*Last updated: 2026-02-07 by SEO Agent*
