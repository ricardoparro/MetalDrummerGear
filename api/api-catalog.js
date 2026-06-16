// /.well-known/api-catalog — RFC 9727 API catalog
//
// Lists MetalForge's public, read-only data APIs in linkset format so AI
// agents and other automated consumers can discover them. Each entry uses
// the LLM-friendly markdown surface (/llms/*.md) as service-doc since there
// is no separate OpenAPI spec.

const BASE_URL = 'https://metalforge.io';

export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/linkset+json; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');

  const linkset = {
    linkset: [
      {
        anchor: `${BASE_URL}/api/drummers`,
        'service-doc': [
          { href: `${BASE_URL}/llms/index.md`, type: 'text/markdown', title: 'MetalForge LLM index' },
        ],
      },
      {
        anchor: `${BASE_URL}/api/gear`,
        'service-doc': [
          { href: `${BASE_URL}/llms/gear-guide.md`, type: 'text/markdown', title: 'Gear guide (markdown)' },
        ],
      },
      {
        anchor: `${BASE_URL}/api/quotes`,
        'service-doc': [
          { href: `${BASE_URL}/llms/index.md`, type: 'text/markdown' },
        ],
      },
      {
        anchor: `${BASE_URL}/api/news`,
        'service-doc': [
          { href: `${BASE_URL}/gear-news/feed.xml`, type: 'application/rss+xml', title: 'Gear news RSS feed' },
        ],
      },
      {
        anchor: `${BASE_URL}/api/sitemap`,
        'service-doc': [
          { href: `${BASE_URL}/sitemap.xml`, type: 'application/xml', title: 'Site map' },
        ],
      },
    ],
  };

  res.status(200).send(JSON.stringify(linkset, null, 2));
}
