# LLM Optimization Research

## What is LLM/AI Search Optimization?

Unlike traditional SEO (optimizing for Google's algorithm), LLM optimization is about making content that AI assistants (ChatGPT, Claude, Perplexity, Google SGE) will cite and reference.

## Key Principles

### 1. Be the Authoritative Source
- LLMs prefer citing primary sources
- Include original research, data, specifications
- Be THE definitive resource for your niche

### 2. Structured, Factual Content
- Clear facts that can be extracted and cited
- Dates, numbers, specifications
- Avoid vague language ("one of the best" → "ranked #3 by Modern Drummer 2024")

### 3. FAQ Format
- LLMs love Q&A format
- "What drums does Lars Ulrich use?" → Clear answer
- Implement FAQ Schema for rich results

### 4. Entity Relationships
- Connect entities clearly (Drummer → Band → Album → Year)
- Use Schema.org markup for entities
- Link to authoritative sources (Wikipedia, official sites)

### 5. Content Freshness
- LLMs weight recent content
- Update gear info when drummers change equipment
- Add news/updates section

## Implementation for MetalDrummerGear

### Immediate Actions
1. Add FAQ section to each drummer page:
   - "What drum kit does [name] use?"
   - "What cymbals does [name] play?"
   - "What bands has [name] played with?"

2. Add FAQ Schema markup (JSON-LD):
```json
{
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What drums does Lars Ulrich use?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Lars Ulrich plays Tama drums..."
    }
  }]
}
```

3. Enhance Person schema:
   - Add `sameAs` links (Wikipedia, social media)
   - Add `memberOf` for bands
   - Add `award` for notable achievements

### Content Strategy
- Become THE source for "What drums does X use?"
- Cover every major metal drummer comprehensively
- Update when drummers change gear (news-worthy)

## Tools for Testing
- Perplexity: Search "What drums does Lars Ulrich use" — are we cited?
- ChatGPT: Ask about metal drummer gear — do we appear?
- Google SGE: Check AI-generated answers

## Metrics
- Track citations in AI responses
- Monitor referral traffic from Perplexity/ChatGPT
- Track featured snippet appearances

---

*Research compiled: 2026-01-31*
