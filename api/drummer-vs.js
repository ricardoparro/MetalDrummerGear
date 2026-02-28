// API endpoint for drummer vs drummer comparisons (Issue #558)
// Returns comparison data for SEO and social sharing

const drummerComparisons = {
  'danny-carey-vs-mario-duplantier': {
    slug: 'danny-carey-vs-mario-duplantier',
    title: 'Danny Carey vs Mario Duplantier',
    drummers: ['danny-carey', 'mario-duplantier'],
    category: 'progressive'
  },
  'lars-ulrich-vs-dave-lombardo': {
    slug: 'lars-ulrich-vs-dave-lombardo',
    title: 'Lars Ulrich vs Dave Lombardo',
    drummers: ['lars-ulrich', 'dave-lombardo'],
    category: 'thrash'
  },
  'joey-jordison-vs-chris-adler': {
    slug: 'joey-jordison-vs-chris-adler', 
    title: 'Joey Jordison vs Chris Adler',
    drummers: ['joey-jordison', 'chris-adler'],
    category: 'extreme'
  },
  'gene-hoglan-vs-tomas-haake': {
    slug: 'gene-hoglan-vs-tomas-haake',
    title: 'Gene Hoglan vs Tomas Haake',
    drummers: ['gene-hoglan', 'tomas-haake'],
    category: 'technical'
  },
  'mike-portnoy-vs-danny-carey': {
    slug: 'mike-portnoy-vs-danny-carey',
    title: 'Mike Portnoy vs Danny Carey',
    drummers: ['mike-portnoy', 'danny-carey'],
    category: 'progressive'
  }
};

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'public, s-maxage=3600');
  res.status(200).json({
    comparisons: Object.values(drummerComparisons),
    count: Object.keys(drummerComparisons).length
  });
}
