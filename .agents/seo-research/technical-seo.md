# Technical SEO Research

## Core Web Vitals targets
LCP <2.5s · CLS <0.1 · INP <200ms

## Schema.org — current state (2026-06)
- ✅ Person, MusicGroup, FAQPage, BreadcrumbList, ItemList
- ✅ VideoObject (drummer pages), Quotation, Speakable, Article, WebApplication
- ❌ AggregateRating (blocked: need reviews feature)
- ❌ HowTo (blocked: need setup-guide content type)
- ❌ SearchAction (blocked: site search not implemented)
- ❌ Person itemprop in HTML (Quick Facts box, #872 — open)

## Indexable surface — current state
- Sitemap: 62 drummers + gear pages + articles + top10 lists + techniques.
  Live count via `node -e "require('./api/sitemap.js')"` or scan `api/sitemap.js`.
- Programmatic growth opportunities (all `seo-proposal` candidates):
  - `/technique/<slug>/drummers` — 12 pages from `data/techniques.js`
  - `/gear/<brand>/<series>/drummers-using` — ~30-50 pages
  - `/song/<song>/drum-notation` — long-tail
  - `/drummer/<slug>/licks/<slug>` — already proven to rank (Joey Jordison Eyeless Blast top-3 by views, 2026-06-04)

## Lessons learned (2026-06)
- Organic Search drove **69% of sessions** in the first measured 7-day window.
- Lick-of-the-Day pages rank organically — pattern is investable.
- 30 broken-video issues cleared by single batch PR (#911, #944). Prevention: umbrella issue model in `verify-youtube` (#975).

## Files Needed (status)
- ✅ robots.txt with sitemap reference
- ❌ robots.txt explicit AI crawler allow rules (8 agents — see llm-optimization-plan.md Phase 1)
- ✅ XML sitemap with all drummer pages

*Updated: 2026-06-05*
