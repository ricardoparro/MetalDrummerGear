# Technical SEO Research

## Core Web Vitals (2024 Standards)

### Largest Contentful Paint (LCP)
- **Target:** < 2.5 seconds
- **Measures:** Loading performance
- **Fix:** Optimize images, use CDN, preload critical resources

### Cumulative Layout Shift (CLS)
- **Target:** < 0.1
- **Measures:** Visual stability
- **Fix:** Set image dimensions, avoid inserting content above existing content

### Interaction to Next Paint (INP)
- **Target:** < 200ms
- **Measures:** Responsiveness
- **Fix:** Minimize JavaScript, use web workers

## Structured Data (Schema.org)

### Currently Implemented
- ✅ Person schema for drummers
- ✅ WebSite schema

### To Implement
- [ ] FAQPage schema
- [ ] BreadcrumbList schema
- [ ] ItemList schema (for drummer list)
- [ ] MusicGroup schema (for bands)
- [ ] Product schema (for gear items)

### Validation Tools
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org Validator: https://validator.schema.org/

## XML Sitemap

### Format
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://metal-drummer-gear.vercel.app/</loc>
    <lastmod>2026-01-31</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://metal-drummer-gear.vercel.app/drummer/lars-ulrich</loc>
    <lastmod>2026-01-31</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

### Implementation
- Generate dynamically from drummer list API
- Create `/api/sitemap` endpoint
- Add to robots.txt

## robots.txt

```
User-agent: *
Allow: /

Sitemap: https://metal-drummer-gear.vercel.app/sitemap.xml
```

## Meta Tags Checklist

### Per Page
- [ ] `<title>` — unique, 50-60 chars
- [ ] `<meta name="description">` — unique, 150-160 chars
- [ ] `<link rel="canonical">` — self-referencing
- [ ] `<meta name="robots">` — index, follow

### Social
- [ ] `og:title`
- [ ] `og:description`
- [ ] `og:image` — 1200x630px
- [ ] `og:url`
- [ ] `twitter:card` — summary_large_image
- [ ] `twitter:title`
- [ ] `twitter:description`
- [ ] `twitter:image`

## Image Optimization

### Formats
- WebP for modern browsers (30% smaller)
- JPEG fallback for older browsers
- PNG only for transparency needs

### Sizing
- Serve appropriately sized images
- Use `srcset` for responsive images
- Lazy load below-fold images

### Alt Text
- Descriptive: "Lars Ulrich playing Tama drums at Metallica concert"
- Include keywords naturally
- Don't keyword stuff

---

*Research compiled: 2026-01-31*
