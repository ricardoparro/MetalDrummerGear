# LLM Citation Tracker Agent — MetalForge

## Mission
Track MetalForge visibility and citations across major LLMs (ChatGPT, Claude, Perplexity) by asking drummer-related queries and checking if we're mentioned.

## Schedule
- **When:** Every Sunday at 11:00 AM (Europe/Lisbon) — after Performance Auditor
- **Duration:** ~15 minutes
- **Output:** Citation report + trend tracking

## Query Set

Test these queries across LLMs:

### High-Priority Queries (Core Business)
1. "What drums does Lars Ulrich use?"
2. "What is Dave Lombardo's drum kit setup?"
3. "Best metal drummers gear database"
4. "Joey Jordison drum equipment"
5. "Metal drummer gear comparison"

### Medium-Priority Queries (Discovery)
6. "Who is the fastest metal drummer?"
7. "What cymbals do metal drummers use?"
8. "Tama vs Pearl for metal drumming"
9. "Gene Hoglan drum setup"
10. "Metal drumming techniques"

## LLMs to Test

| Platform | Method | Notes |
|----------|--------|-------|
| **Perplexity** | Browser | Shows sources! Best for citation tracking |
| **ChatGPT** | Browser/API | Check if mentions metalforge.io |
| **Claude** | Browser | Check for brand mentions |
| **Google AI Overview** | Search | Check if cited in AI results |

## Tracking Metrics

For each query, record:
- **Cited:** Yes/No — Did the LLM mention MetalForge?
- **Source Link:** Did it link to metalforge.io?
- **Position:** 1st, 2nd, 3rd... mention?
- **Sentiment:** Positive/Neutral/Negative
- **Competitors:** Who else was mentioned? (drummerworld, moderndrummer, etc.)

## Report Format

```markdown
## 🔍 LLM Citation Report — MetalForge

**Date:** [DATE]
**Queries Tested:** 10

### Citation Summary
| LLM | Cited | Not Cited | Citation Rate |
|-----|-------|-----------|---------------|
| Perplexity | X/10 | X/10 | XX% |
| ChatGPT | X/10 | X/10 | XX% |
| Claude | X/10 | X/10 | XX% |
| Google AI | X/10 | X/10 | XX% |

### Best Performing Queries
✅ "What drums does Lars Ulrich use?" — Cited in 4/4 LLMs
✅ "Joey Jordison drum equipment" — Cited in 3/4 LLMs

### Needs Improvement
❌ "Metal drumming techniques" — Not cited anywhere
❌ "Tama vs Pearl for metal" — Competitor sites dominating

### Competitors Spotted
- drummerworld.com — 15 mentions
- moderndrummer.com — 8 mentions
- sweetwater.com — 5 mentions

### Trend (vs last week)
- Overall citation rate: XX% (↑/↓ X%)
- New citations earned: X
- Citations lost: X

### Recommendations
1. Create content for [gap query]
2. Improve [page] to target [query]
```

## History Storage

Store in `.agents/llm-citation-tracker/history.json`:
```json
{
  "reports": [
    {
      "date": "2026-02-17",
      "queries": [
        {
          "query": "What drums does Lars Ulrich use?",
          "results": {
            "perplexity": { "cited": true, "position": 1, "link": true },
            "chatgpt": { "cited": true, "position": 2, "link": false },
            "claude": { "cited": false },
            "google_ai": { "cited": true, "position": 1, "link": true }
          }
        }
      ],
      "summary": {
        "overall_citation_rate": 65,
        "perplexity_rate": 80,
        "chatgpt_rate": 60,
        "claude_rate": 50,
        "google_ai_rate": 70
      }
    }
  ]
}
```

## Browser Automation Notes

### Perplexity (Best for tracking)
1. Go to perplexity.ai
2. Enter query
3. Wait for response
4. Check "Sources" section for metalforge.io

### ChatGPT
1. Go to chat.openai.com (if logged in) or use API
2. Ask query
3. Search response text for "metalforge" or "MetalForge"

### Claude
1. Use claude.ai if available
2. Ask query
3. Check for brand mentions

### Google AI Overview
1. Search query on Google
2. Check if AI Overview appears
3. Look for metalforge.io in sources

## Success Targets

| Metric | Current | Target (3 months) |
|--------|---------|-------------------|
| Overall Citation Rate | ? | 50% |
| Perplexity Citations | ? | 70% |
| ChatGPT Mentions | ? | 40% |
| #1 Position Rate | ? | 30% |

---

*Agent created: 2026-02-17*
