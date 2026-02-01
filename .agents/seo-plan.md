# SEO/LLM Optimization Plan — MetalForge

**Goal:** Become the #1 resource for metal drummer gear information  
**Site:** https://metalforge.io (Vercel: metal-drummer-gear.vercel.app)

## Current Status (2026-02-01)

### ✅ Completed
- **Title & Meta:** "MetalForge - Discover What Pro Metal Drummers Play" (#19)
- **robots.txt:** Proper format with sitemap reference (#18)
- **sitemap.xml:** Dynamic generation with all drummer pages (#18, #30)
- **Open Graph:** Full OG tags for social sharing
- **Twitter Card:** summary_large_image configured
- **Canonical URL:** metalforge.io set correctly
- **Person Schema:** JSON-LD for each drummer page
- **WebSite Schema:** JSON-LD for homepage
- **Google Analytics:** GA4 tracking (G-HKLHH1DCC7)

### 🔄 In Progress
- **FAQ Schema:** Issue #36 - Critical for LLM optimization
- **ItemList Schema:** Issue #37 - Collection markup for homepage

---

## Phase 1: Technical Foundation ✅ COMPLETE
- [x] Fix robots.txt and sitemap.xml (#18)
- [x] Fix page title and meta description (#19)
- [x] Add Open Graph tags
- [x] Add Twitter Card meta
- [x] Add canonical URL

## Phase 2: Content Optimization 🔄 PARTIAL
- [x] Alt text for images (via accessibilityLabel)
- [ ] Unique meta descriptions per drummer (dynamically generated ✅)
- [ ] FAQ sections per drummer (content needed)

## Phase 3: LLM Optimization 🎯 CURRENT FOCUS
- [ ] **FAQPage Schema** (#36) — HIGH PRIORITY
  - Helps AI assistants cite content accurately
  - Improves AI search visibility (Perplexity, ChatGPT, etc.)
- [ ] **ItemList Schema** (#37) — MEDIUM PRIORITY
  - Enhances collection/list representation
  - Potential for carousel rich results
- [ ] Entity relationships (sameAs links to Wikipedia, social profiles)
- [ ] Speakable schema for voice search optimization

## Phase 4: Advanced SEO (Future)
- [ ] BreadcrumbList schema
- [ ] AggregateRating for gear items (if user reviews added)
- [ ] Product schema for affiliate gear links
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

---
*Last updated: 2026-02-01 by SEO Agent*
