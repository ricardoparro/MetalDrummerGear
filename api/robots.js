// Vercel Serverless Function - robots.txt

export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, max-age=86400');

  const robotsTxt = `User-agent: *
Allow: /
Crawl-delay: 10

# Block aggressive bots
User-agent: AhrefsBot
Crawl-delay: 30

User-agent: SemrushBot
Crawl-delay: 30

User-agent: MJ12bot
Crawl-delay: 30

Sitemap: https://metalforge.io/sitemap.xml

# LLM/AI Discovery
# See https://metalforge.io/llms.txt for AI-friendly site information
`;

  res.status(200).send(robotsTxt);
}
