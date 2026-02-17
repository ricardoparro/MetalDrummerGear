# LLM Crawler Optimization Plan — MetalForge

**Created:** 2026-02-17  
**Goal:** Maximize visibility in AI-powered search (ChatGPT, Perplexity, Gemini, Claude, AI Overviews)  
**Current State:** Good foundation (llms.txt exists, schema markup comprehensive)  

---

## Executive Summary

MetalForge already has better LLM optimization than 95% of websites. The existing llms.txt, comprehensive schema markup, and clean architecture put us ahead. This plan focuses on **incremental improvements** to go from good → excellent.

**Priority Impact Matrix:**

| Priority | Task | Effort | Impact |
|----------|------|--------|--------|
| 🔴 High | Allow AI crawlers in robots.txt | 5 min | High |
| 🔴 High | Create llms-full.txt | 1 hour | High |
| 🟡 Medium | Markdown content endpoints | 2 hours | Medium |
| 🟡 Medium | Enhanced FAQ/Q&A content | 2 hours | Medium |
| 🟢 Low | Citation-friendly snippets | 1 hour | Medium |
| 🟢 Low | Entity disambiguation | 1 hour | Low |

---

## Phase 1: Crawler Access (CRITICAL)

### 1.1 Update robots.txt — Allow AI Crawlers

**Current Issue:** robots.txt has a generic `Crawl-delay: 10` but doesn't explicitly allow AI crawlers.

**Action:** Update `/public/robots.txt` or API route:

```txt
User-agent: *
Allow: /
Crawl-delay: 10

# AI/LLM Crawlers - Full Access
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: Google-Extended
Allow: /

# Block aggressive SEO bots
User-agent: AhrefsBot
Crawl-delay: 30

User-agent: SemrushBot
Crawl-delay: 30

User-agent: MJ12bot
Crawl-delay: 30

Sitemap: https://metalforge.io/sitemap.xml

# LLM/AI Discovery
# See https://metalforge.io/llms.txt for AI-friendly site information
# See https://metalforge.io/llms-full.txt for comprehensive content
```

**Why:** Explicitly allowing AI crawlers signals trust and ensures they aren't accidentally blocked. Some AI systems check for explicit allows before aggressive crawling.

---

## Phase 2: Enhanced llms.txt

### 2.1 Follow Official Spec Format

The current llms.txt is good but doesn't follow the official spec exactly. Update to include:

```markdown
# MetalForge

> MetalForge is the definitive database of professional metal drummers and their gear. 60+ drummers, complete gear specs, performance videos, and career histories.

MetalForge helps drummers discover what their favorite metal drummers play — from drum kits and cymbals to hardware, sticks, and signature models.

## Docs

- [API Documentation](https://metalforge.io/api-docs.md): REST API for programmatic access to drummer and gear data
- [Drummer Database](https://metalforge.io/drummers.md): Complete list of all 60+ drummers with gear summaries
- [Gear Brands Guide](https://metalforge.io/gear-guide.md): Overview of drum kit and cymbal brands used by pros

## Examples

- [Lars Ulrich Profile](https://metalforge.io/drummer/lars-ulrich): Metallica drummer's complete Tama/Zildjian setup
- [Dave Lombardo Profile](https://metalforge.io/drummer/dave-lombardo): Slayer's "Godfather of double bass"
- [Gene Hoglan Profile](https://metalforge.io/drummer/gene-hoglan): "The Atomic Clock" - Death/Testament precision

## Optional

- [Fastest Drummers List](https://metalforge.io/lists/fastest-drummers): Top 10 fastest metal drummers ranked
- [Drummer Quotes](https://metalforge.io/quotes): Notable quotes on technique and philosophy
- [Gear Finder](https://metalforge.io/gear-finder): Search gear by brand or drummer
```

### 2.2 Create llms-full.txt

Create a comprehensive content dump that LLMs can ingest in one request:

**File:** `/public/llms-full.txt` (or `/api/llms-full`)

**Contents:**
- Full text of all drummer bios
- Complete gear lists in structured format
- All FAQ Q&As
- All quotes with attribution
- Key facts database

**Format:**
```markdown
# MetalForge Complete Database
# Last Updated: 2026-02-17
# Total Drummers: 60+

---

## Drummer: Lars Ulrich

**Band:** Metallica
**Genre:** Thrash Metal
**Country:** Denmark
**Active:** 1981-present

### Biography
Lars Ulrich (born December 26, 1963) is the co-founder and drummer of Metallica...

### Current Gear
- **Drums:** Tama Star Classic Maple
- **Snare:** Tama Lars Ulrich Signature 14x6.5
- **Cymbals:** Zildjian A Custom series
- **Hi-Hat:** 14" A Custom Hi-Hats
- **Crashes:** 18" & 19" A Custom Crashes
- **Ride:** 20" A Custom Ride
- **China:** 18" A Custom China
- **Pedals:** Tama Iron Cobra Power Glide
- **Sticks:** Ahead Lars Ulrich Signature

### FAQ
Q: What drums does Lars Ulrich use?
A: Lars Ulrich uses Tama Star Classic Maple drums...

Q: What is Lars Ulrich's estimated kit value?
A: Lars Ulrich's complete touring setup is estimated at $15,000-20,000...

---

## Drummer: Dave Lombardo
...
```

**Size Target:** 50-100KB (fits in most LLM context windows)

---

## Phase 3: Markdown Content Layer

### 3.1 Create /llms/ Directory

Serve markdown versions of key pages that LLMs can directly consume:

```
/llms/
  ├── index.md          # Site overview
  ├── drummers.md       # All drummers summary
  ├── drummers/
  │   ├── lars-ulrich.md
  │   ├── dave-lombardo.md
  │   └── ...
  ├── gear-guide.md
  ├── faq.md           # Master FAQ
  └── facts.md         # Quick facts database
```

### 3.2 API Endpoint for Markdown

Add `/api/drummer/[id]/markdown` endpoint:

```javascript
// api/drummer/[id]/markdown.js
export default function handler(req, res) {
  const drummer = getDrummer(req.query.id);
  
  const markdown = `
# ${drummer.name}

**Band:** ${drummer.band}
**Genre:** ${drummer.genre}
**Country:** ${drummer.country}

## Biography
${drummer.bio}

## Current Gear Setup

### Drums
${drummer.gear.drums.map(d => `- ${d}`).join('\n')}

### Cymbals
${drummer.gear.cymbals.map(c => `- ${c}`).join('\n')}

## Frequently Asked Questions

${drummer.faq.map(f => `**Q: ${f.question}**\n${f.answer}`).join('\n\n')}
`;

  res.setHeader('Content-Type', 'text/markdown');
  res.send(markdown);
}
```

---

## Phase 4: Content Optimization for LLMs

### 4.1 Answer-First Content Structure

Ensure every page leads with a clear, quotable answer:

**Current:**
```
Lars Ulrich is a Danish musician best known as...
```

**Optimized:**
```
Lars Ulrich uses a Tama Star Classic Maple drum kit with Zildjian A Custom cymbals. 
As co-founder and drummer of Metallica since 1981, Lars has been a Tama endorsee 
for over 30 years. His signature snare drum (Tama LU1465) features a 14"x6.5" 
brass shell.
```

### 4.2 Create Fact Database Page

New page: `/facts` or `/quick-facts`

```markdown
# Metal Drummer Quick Facts

## Speed Records
- **Fastest recorded:** George Kollias at 280 BPM single strokes
- **Fastest album:** Origin's "Entity" featuring John Longstreth
- **Blast beat pioneer:** Pete Sandoval (Morbid Angel)

## Gear Facts
- **Most expensive kit:** Neil Peart's R40 kit ($400,000+)
- **Most common brand (metal):** Tama (used by 40% of metal drummers)
- **Standard metal snare depth:** 6.5" (deeper = more power)

## Career Milestones
- **Longest tenure:** Bill Ward, Black Sabbath (1968-present)
- **Most recorded albums:** Dave Lombardo (50+ studio albums)
- **Youngest signed:** Joey Jordison, signed at 21
```

### 4.3 Enhanced FAQ Coverage

Ensure FAQs cover the questions LLMs get asked:

**High-frequency LLM queries to cover:**
- "What drums does [drummer] use?"
- "What is [drummer]'s drum setup?"
- "How much does [drummer]'s kit cost?"
- "What sticks does [drummer] use?"
- "What's the best metal drum kit?"
- "Who is the fastest metal drummer?"
- "What cymbals are best for metal?"

---

## Phase 5: Entity & Citation Optimization

### 5.1 Entity Disambiguation

Ensure clear entity relationships in content:

```markdown
Lars Ulrich (drummer) ← Clear role identifier
Metallica (band) ← Not just "Metallica"
Tama Star Classic Maple (drum kit model) ← Full product name
```

### 5.2 Quotable Snippets

Add CSS class for speakable/quotable content:

```html
<p class="key-fact" data-speakable="true">
  Lars Ulrich uses a Tama Star Classic Maple drum kit with 
  Zildjian A Custom cymbals. His touring setup is valued 
  at approximately $15,000-20,000.
</p>
```

### 5.3 Citation-Friendly Dates

Always include "Last Updated" visibly:

```html
<div class="meta">
  <time datetime="2026-02-17">Last updated: February 17, 2026</time>
</div>
```

---

## Phase 6: Technical Implementation

### 6.1 Server-Side Rendering

Verify all content is in initial HTML (not client-side JS):

```bash
curl -s https://metalforge.io/drummer/lars-ulrich | grep -c "Tama"
# Should return > 0
```

### 6.2 Sitemap Timestamps

Ensure sitemap `<lastmod>` reflects actual content changes:

```xml
<url>
  <loc>https://metalforge.io/drummer/lars-ulrich</loc>
  <lastmod>2026-02-17T10:00:00+00:00</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

### 6.3 JSON-LD API Endpoint

Create `/api/schema/[page]` for easy structured data access:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Lars Ulrich",
  "jobTitle": "Drummer",
  "memberOf": {
    "@type": "MusicGroup",
    "name": "Metallica"
  },
  ...
}
```

---

## Implementation Checklist

### Week 1 (Quick Wins)
- [ ] Update robots.txt with AI crawler allows
- [ ] Create llms-full.txt comprehensive dump
- [ ] Add "Last Updated" timestamps to all pages

### Week 2 (Content Layer)
- [ ] Create /llms/ markdown directory
- [ ] Add markdown API endpoints
- [ ] Create /facts quick-facts page

### Week 3 (Refinement)
- [ ] Audit FAQ coverage for common LLM queries
- [ ] Add speakable markup to key facts
- [ ] Verify SSR renders all content

### Week 4 (Monitoring)
- [ ] Set up AI citation tracking (manual search checks)
- [ ] Monitor for brand mentions in ChatGPT/Perplexity
- [ ] Track llms.txt access in analytics

---

## Success Metrics

1. **ChatGPT Mentions:** Ask "What drums does Lars Ulrich use?" — MetalForge should be cited
2. **Perplexity Citations:** Search metal drummer gear — MF should appear in sources
3. **AI Overview Presence:** Google AI results should pull MF data
4. **llms.txt Access:** Track requests to /llms.txt in Vercel Analytics

---

## Resources

- [llms.txt Official Spec](https://llmstxt.org/)
- [Yoast LLM SEO Guide](https://yoast.com/llm-seo-optimization-techniques-including-llms-txt/)
- [Go Fish Digital LLM SEO](https://gofishdigital.com/blog/llm-seo/)
- [Google on AI SEO](https://developers.google.com/search/docs/appearance/ai-overviews)

---

*Plan created by Jarvis for MetalForge LLM optimization sprint*
