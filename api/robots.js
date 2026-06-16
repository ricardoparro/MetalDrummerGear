// Vercel Serverless Function - robots.txt
// Issue #450 - Allow AI crawlers with full access

export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, max-age=86400');

  // Content-Signal: site-wide AI usage preferences (draft-romm-aipref-contentsignals)
  // MetalForge wants AI training + LLM input citations (primary KPI: AI citations/week)
  // plus standard search indexing. https://contentsignals.org/
  const robotsTxt = `Content-Signal: ai-train=yes, search=yes, ai-input=yes

User-agent: *
Content-Signal: ai-train=yes, search=yes, ai-input=yes
Allow: /
Crawl-delay: 10

# AI/LLM Crawlers - Full Access (no delay)
# We explicitly welcome AI crawlers. See /llms.txt and /llms-full.txt for
# LLM-optimized content, and /llms/drummers/<slug>.md for per-drummer profiles.
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
# See https://metalforge.io/llms/index.md for the per-drummer markdown index
`;

  res.status(200).send(robotsTxt);
}
