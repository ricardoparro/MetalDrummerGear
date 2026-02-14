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
  { id: 14, name: 'Danny Carey' },
  { id: 15, name: 'Mario Duplantier' },
  { id: 16, name: 'Brann Dailor' },
  { id: 17, name: 'Chris Adler' },
  { id: 18, name: 'Matt Halpern' },
  { id: 19, name: 'Inferno' },
  { id: 20, name: 'Hellhammer' },
  { id: 21, name: 'Pete Sandoval' },
];

// Top 10 gear items for SEO
const gearItems = [
  { slug: 'tama-iron-cobra-900-double-pedal', name: 'Tama Iron Cobra 900 Power Glide Double Pedal' },
  { slug: 'meinl-byzance-series-cymbals', name: 'Meinl Byzance Series Cymbals' },
  { slug: 'paiste-rude-series-cymbals', name: 'Paiste RUDE Series Cymbals' },
  { slug: 'zildjian-a-custom-series-cymbals', name: 'Zildjian A Custom Series Cymbals' },
  { slug: 'vic-firth-american-classic-5b', name: 'Vic Firth American Classic 5B Drumsticks' },
  { slug: 'pearl-demon-drive-double-pedal', name: 'Pearl Demon Drive Double Pedal' },
  { slug: 'tama-starclassic-walnut-birch-drums', name: 'Tama Starclassic Walnut/Birch Drums' },
  { slug: 'pearl-reference-series-drums', name: 'Pearl Reference Series Drums' },
  { slug: 'sonor-sq2-heavy-beech-drums', name: 'Sonor SQ2 Heavy Beech Drums' },
  { slug: 'sabian-hhx-series-cymbals', name: 'Sabian HHX Series Cymbals' },
];

// Top 10 Lists for SEO
const top10Lists = [
  { slug: 'fastest-drummers', name: 'Top 10 Fastest Metal Drummers' },
  { slug: 'death-metal-drummers', name: 'Top 10 Death Metal Drummers' },
  { slug: 'most-innovative-drummers', name: 'Top 10 Most Innovative Metal Drummers' },
  { slug: 'thrash-metal-drummers', name: 'Top 10 Thrash Metal Drummers' },
  { slug: 'progressive-metal-drummers', name: 'Top 10 Progressive Metal Drummers' },
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
    // Quotes collection page
    { loc: '/quotes', priority: '0.9', changefreq: 'weekly' },
    // Top 10 Lists index
    { loc: '/lists', priority: '0.9', changefreq: 'weekly' },
    // Genres index (Issue #340)
    { loc: '/genres', priority: '0.9', changefreq: 'weekly' },
    // Individual Top 10 List pages
    ...top10Lists.map(l => ({
      loc: `/lists/${l.slug}`,
      priority: '0.8',
      changefreq: 'monthly'
    })),
    // Genre detail pages (Issue #340)
    ...genres.map(g => ({
      loc: `/genres/${g.slug}`,
      priority: '0.8',
      changefreq: 'monthly'
    })),
    // Drummer pages
    ...drummers.map(d => ({
      loc: `/drummer/${generateSlug(d.name)}`,
      priority: '0.8',
      changefreq: 'monthly'
    })),
    // Gear pages
    ...gearItems.map(g => ({
      loc: `/gear/${g.slug}`,
      priority: '0.7',
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
