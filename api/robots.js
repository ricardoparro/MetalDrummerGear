// Vercel Serverless Function - robots.txt

export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, max-age=86400');

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://metalforge.io/sitemap.xml

# LLM/AI Discovery
# See https://metalforge.io/llms.txt for AI-friendly site information
`;

  res.status(200).send(robotsTxt);
}
