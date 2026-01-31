// Vercel Serverless Function - sitemap.xml

const drummers = [
  { id: 1, name: 'Lars Ulrich' },
  { id: 2, name: 'Joey Jordison' },
  { id: 3, name: 'Gene Hoglan' },
  { id: 4, name: 'Dave Lombardo' },
  { id: 5, name: 'Tomas Haake' },
  { id: 6, name: 'George Kollias' },
  { id: 7, name: 'Eloy Casagrande' },
  { id: 8, name: 'Ray Luzier' },
  { id: 9, name: 'John Otto' },
  { id: 10, name: 'Jay Weinberg' },
  { id: 11, name: 'Vinnie Paul' },
  { id: 12, name: 'Charlie Benante' },
  { id: 13, name: 'Mike Portnoy' },
];

const BASE_URL = 'https://metalforge.io';

// Generate URL-friendly slug from drummer name
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, max-age=86400');

  const today = new Date().toISOString().split('T')[0];

  const urls = [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    ...drummers.map(d => ({
      loc: `/drummer/${generateSlug(d.name)}`,
      priority: '0.8',
      changefreq: 'monthly'
    }))
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${BASE_URL}${url.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  res.status(200).send(sitemap);
}
