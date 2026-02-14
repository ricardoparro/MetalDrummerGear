// Vercel Serverless Function - sitemap.xml
// Issue #361: Added band pages
// Issue #339: Added gear category pages for SEO
// Issue #345: Added gear comparison pages for SEO

const drummers = [
  { id: 1, name: 'Lars Ulrich' }, { id: 2, name: 'Joey Jordison' }, { id: 3, name: 'Gene Hoglan' },
  { id: 4, name: 'Dave Lombardo' }, { id: 5, name: 'Tomas Haake' }, { id: 6, name: 'George Kollias' },
  { id: 7, name: 'Eloy Casagrande' }, { id: 8, name: 'Ray Luzier' }, { id: 9, name: 'John Otto' },
  { id: 10, name: 'Jay Weinberg' }, { id: 11, name: 'Vinnie Paul' }, { id: 12, name: 'Charlie Benante' },
  { id: 13, name: 'Mike Portnoy' }, { id: 14, name: 'Danny Carey' }, { id: 15, name: 'Mario Duplantier' },
  { id: 16, name: 'Brann Dailor' }, { id: 17, name: 'Chris Adler' }, { id: 18, name: 'Matt Halpern' },
  { id: 19, name: 'Inferno' }, { id: 20, name: 'Hellhammer' }, { id: 21, name: 'Pete Sandoval' },
];

const gearItems = [
  { slug: 'tama-iron-cobra-900-double-pedal', name: 'Tama Iron Cobra 900' },
  { slug: 'meinl-byzance-series-cymbals', name: 'Meinl Byzance Series' },
  { slug: 'paiste-rude-series-cymbals', name: 'Paiste RUDE Series' },
  { slug: 'zildjian-a-custom-series-cymbals', name: 'Zildjian A Custom' },
  { slug: 'vic-firth-american-classic-5b', name: 'Vic Firth 5B' },
  { slug: 'pearl-demon-drive-double-pedal', name: 'Pearl Demon Drive' },
  { slug: 'tama-starclassic-walnut-birch-drums', name: 'Tama Starclassic' },
  { slug: 'pearl-reference-series-drums', name: 'Pearl Reference' },
  { slug: 'sonor-sq2-heavy-beech-drums', name: 'Sonor SQ2' },
  { slug: 'sabian-hhx-series-cymbals', name: 'Sabian HHX' },
];

const top10Lists = [
  { slug: 'fastest-drummers', name: 'Top 10 Fastest Metal Drummers' },
  { slug: 'death-metal-drummers', name: 'Top 10 Death Metal Drummers' },
  { slug: 'most-innovative-drummers', name: 'Top 10 Most Innovative' },
  { slug: 'thrash-metal-drummers', name: 'Top 10 Thrash Metal Drummers' },
  { slug: 'progressive-metal-drummers', name: 'Top 10 Progressive Metal' },
];

const bandPages = [
  { slug: 'metallica', name: 'Metallica' },
  { slug: 'death', name: 'Death' },
];

// Issue #339: Gear category pages for SEO
const gearCategories = [
  { slug: 'cymbals', name: 'Metal Cymbals' },
  { slug: 'snares', name: 'Metal Snare Drums' },
  { slug: 'drums', name: 'Metal Drum Kits' },
  { slug: 'pedals', name: 'Metal Bass Drum Pedals' },
  { slug: 'sticks', name: 'Metal Drumsticks' },
  { slug: 'hardware', name: 'Metal Drum Hardware' },
];

// Issue #345: Gear comparison pages for SEO (high-value brand matchups)
const gearComparisons = [
  // Drum kit comparisons
  { slug: 'tama-vs-pearl-drums', name: 'Tama vs Pearl Drums' },
  { slug: 'dw-vs-yamaha-drums', name: 'DW vs Yamaha Drums' },
  { slug: 'mapex-vs-sonor-drums', name: 'Mapex vs Sonor Drums' },
  { slug: 'tama-vs-dw-drums', name: 'Tama vs DW Drums' },
  // Cymbal comparisons
  { slug: 'meinl-vs-zildjian-cymbals', name: 'Meinl vs Zildjian Cymbals' },
  { slug: 'sabian-vs-paiste-cymbals', name: 'Sabian vs Paiste Cymbals' },
  { slug: 'zildjian-vs-paiste-cymbals', name: 'Zildjian vs Paiste Cymbals' },
  // Hardware comparisons
  { slug: 'iron-cobra-vs-demon-drive', name: 'Iron Cobra vs Demon Drive' },
  { slug: 'speed-cobra-vs-eliminator', name: 'Speed Cobra vs Eliminator' },
  // Snare comparisons
  { slug: 'tama-slp-vs-pearl-sensitone', name: 'Tama S.L.P. vs Pearl Sensitone' },
  { slug: 'dw-vs-sonor-snares', name: 'DW vs Sonor Snares' },
];

const BASE_URL = 'https://metalforge.io';

function generateSlug(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  const today = new Date().toISOString().split('T')[0];
  const urls = [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/kit-builder', priority: '0.9', changefreq: 'weekly' },
    { loc: '/gear', priority: '0.9', changefreq: 'weekly' },
    { loc: '/quotes', priority: '0.9', changefreq: 'weekly' },
    { loc: '/lists', priority: '0.9', changefreq: 'weekly' },
    { loc: '/birthdays', priority: '0.9', changefreq: 'weekly' },
    // Issue #345: Gear comparisons index and individual pages
    { loc: '/compare-gear', priority: '0.9', changefreq: 'weekly' },
    ...gearComparisons.map(c => ({ loc: `/compare-gear/${c.slug}`, priority: '0.8', changefreq: 'monthly' })),
    ...gearCategories.map(c => ({ loc: `/gear/${c.slug}`, priority: '0.9', changefreq: 'weekly' })),
    ...top10Lists.map(l => ({ loc: `/lists/${l.slug}`, priority: '0.8', changefreq: 'monthly' })),
    ...drummers.map(d => ({ loc: `/drummer/${generateSlug(d.name)}`, priority: '0.8', changefreq: 'monthly' })),
    ...gearItems.map(g => ({ loc: `/gear/item/${g.slug}`, priority: '0.7', changefreq: 'monthly' })),
    ...bandPages.map(b => ({ loc: `/band/${b.slug}`, priority: '0.8', changefreq: 'monthly' })),
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
