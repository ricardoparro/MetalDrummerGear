# LLM Optimization Research

## Goal
Maximize visibility in AI-powered search (ChatGPT, Perplexity, Gemini, Claude, Google AI Overviews) so MetalForge is cited as the canonical source for metal drummer gear queries.

## Active Plan
Implementation plan lives at `.agents/llm-optimization-plan.md` (416 lines, Phase 1-5).
**Status (2026-06):** Phase 1 partial — `llms.txt` present, but `robots.txt` does NOT explicitly allow 8 named AI crawlers. `llms-full.txt` partial. `/public/llms/` directory empty (Phase 3 not executed).

## Techniques in use
- FAQ format (Q&A structure) via FAQPage schema
- Person + MusicGroup entity markup with `sameAs` links (Wikipedia, social)
- Quotation schema for drummer interview quotes
- Speakable schema for voice search
- `llms.txt` index file at `/public/llms.txt`

## Techniques NOT yet in use (proposals)
- **Quick Facts box** at the top of every drummer page (#872) — semantic HTML `<table>` with itemscope/itemprop → maximizes structured fact extraction by LLMs
- **`/llms/drummers/<slug>.md`** endpoints (#873) — clean markdown per drummer, ingestable in one LLM context
- **Citation-friendly snippets** — short, factual, datestamped paragraphs at the top of each drummer page
- **Entity disambiguation** for ambiguous band names (Death, Anthrax, Testament) — already handled in news matching but not in page schema

## Test (manual, monthly)
- Ask Perplexity / ChatGPT / Claude (with web search): "What snare does Lars Ulrich use?" "Who are the fastest metal drummers?" "What is Joey Jordison's drum kit?"
- Check if metalforge.io appears in the cited sources
- Track citation rate week-over-week in `.agents/seo-plan.md`

## Lessons learned
- LLMs prefer structured facts (tables, lists) over prose for extraction.
- AI crawler User-Agents (GPTBot, ClaudeBot, PerplexityBot, anthropic-ai, Google-Extended, Applebot-Extended, cohere-ai, ChatGPT-User) must be explicitly allowed in robots.txt — implicit `User-agent: *` allow is not enough for some.
- Markdown content (`*.md`) endpoints have measurable LLM ingest preference vs. parsing React-rendered HTML.

*Updated: 2026-06-05*
