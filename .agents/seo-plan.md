# SEO/LLM Optimization Plan — MetalForge

**Goal:** Become the #1 resource for metal drummer gear information  
**Site:** https://metalforge.io (Vercel: metal-drummer-gear.vercel.app)

## Current Status (2026-02-02)

### ✅ Completed
- **Title & Meta:** "MetalForge - Discover What Pro Metal Drummers Play" (#19)
- **robots.txt:** Proper format with sitemap reference (#18)
- **sitemap.xml:** Dynamic generation with all drummer + gear pages (#18, #30)
- **Open Graph:** Full OG tags for social sharing
- **Twitter Card:** summary_large_image configured
- **Canonical URL:** metalforge.io set correctly
- **Person Schema:** JSON-LD for each drummer page
- **WebSite Schema:** JSON-LD for homepage
- **Google Analytics:** GA4 tracking (G-HKLHH1DCC7)
- **FAQ Schema:** FAQPage JSON-LD for drummer pages (#36) ✅
- **ItemList Schema:** Collection markup for homepage (#37) ✅
- **Product Schema:** JSON-LD for gear pages ✅

### 🔄 In Progress
- **BreadcrumbList Schema:** Issue #66 - Navigation structure for SEO
- **sameAs Entity Links:** Issue #67 - Critical for LLM entity verification

---

## Phase 1: Technical Foundation ✅ COMPLETE
- [x] Fix robots.txt and sitemap.xml (#18)
- [x] Fix page title and meta description (#19)
- [x] Add Open Graph tags
- [x] Add Twitter Card meta
- [x] Add canonical URL

## Phase 2: Content Optimization ✅ COMPLETE
- [x] Alt text for images (via accessibilityLabel)
- [x] Unique meta descriptions per drummer (dynamically generated)
- [x] FAQ sections per drummer (via FAQPage schema)

## Phase 3: LLM Optimization 🔄 IN PROGRESS
- [x] **FAQPage Schema** (#36) ✅
  - Helps AI assistants cite content accurately
  - Improves AI search visibility (Perplexity, ChatGPT, etc.)
- [x] **ItemList Schema** (#37) ✅
  - Enhances collection/list representation
  - Potential for carousel rich results
- [ ] **sameAs Entity Links** (#67) — HIGH PRIORITY 🎯
  - Links to Wikipedia, social profiles for entity verification
  - Critical for LLM knowledge graph connections
- [ ] Speakable schema for voice search optimization

## Phase 4: Advanced SEO 🔄 IN PROGRESS
- [ ] **BreadcrumbList schema** (#66) — MEDIUM PRIORITY
- [x] Product schema for affiliate gear links ✅
- [ ] AggregateRating for gear items (if user reviews added)
- [ ] Core Web Vitals optimization
- [ ] Image optimization (WebP, lazy loading)

---

## Metrics to Track
- Google Search Console impressions/clicks
- Rich result appearances
- AI citation frequency (manual tracking)
- Core Web Vitals scores

## Notes
- Ralph (AI agent) auto-fixes issues with `ai-fix` label
- SEO agent runs daily at 8AM (Lisboa timezone)
- All structured data uses schema.org vocabulary
- Phase 1-2 complete, Phase 3-4 in parallel development

## Recent Progress
- **2026-02-02:** Created #66 (BreadcrumbList) and #67 (sameAs links)
- **2026-02-01:** FAQPage (#36) and ItemList (#37) completed by Ralph

---
*Last updated: 2026-02-02 by SEO Agent*
