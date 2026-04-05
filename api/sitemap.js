// Vercel Serverless Function - sitemap.xml
// Issue #361: Added band pages
// Issue #339: Added gear category pages for SEO
// Issue #344: Added drumming technique pages
// Issue #345: Added gear comparison pages
// Issue #785: Import albumArticles dynamically from data source

import { ALBUM_ARTICLES } from '../packages/frontend/data/albumArticles.js';

// Issue #623: Content Scale Sprint - All 62 drummers now in sitemap
const drummers = [
  { id: 1, name: 'Lars Ulrich' }, { id: 2, name: 'Joey Jordison' }, { id: 3, name: 'Gene Hoglan' },
  { id: 4, name: 'Dave Lombardo' }, { id: 5, name: 'Tomas Haake' }, { id: 6, name: 'George Kollias' },
  { id: 7, name: 'Eloy Casagrande' }, { id: 8, name: 'Ray Luzier' }, { id: 9, name: 'John Otto' },
  { id: 10, name: 'Jay Weinberg' }, { id: 11, name: 'Vinnie Paul' }, { id: 12, name: 'Charlie Benante' },
  { id: 13, name: 'Mike Portnoy' }, { id: 14, name: 'Danny Carey' }, { id: 15, name: 'Mario Duplantier' },
  { id: 16, name: 'Brann Dailor' }, { id: 17, name: 'Chris Adler' }, { id: 18, name: 'Matt Halpern' },
  { id: 19, name: 'Inferno' }, { id: 20, name: 'Hellhammer' }, { id: 21, name: 'Pete Sandoval' },
  { id: 22, name: 'Art Cruz' }, { id: 23, name: 'Arin Ilejay' }, { id: 24, name: 'Navene Koperweis' },
  { id: 25, name: 'Alex Bent' }, { id: 26, name: 'Shannon Larkin' }, { id: 27, name: 'Raymond Herrera' },
  { id: 28, name: 'Morgan Ågren' }, { id: 29, name: 'Igor Cavalera' }, { id: 30, name: 'Bill Ward' },
  { id: 31, name: 'Nick Augusto' }, { id: 32, name: 'Matt Greiner' }, { id: 33, name: 'Blake Richardson' },
  { id: 34, name: 'Ben Koller' }, { id: 35, name: 'Flo Mounier' }, { id: 37, name: 'Jason Bittner' },
  { id: 38, name: 'Martin Lopez' }, { id: 39, name: 'Travis Orbin' }, { id: 40, name: 'Chris Turner' },
  { id: 41, name: 'Nicko McBrain' }, { id: 42, name: 'Scott Travis' }, { id: 43, name: 'Mikkey Dee' },
  { id: 44, name: 'Derek Roddy' }, { id: 45, name: 'Dirk Verbeuren' }, { id: 46, name: 'Frost' },
  { id: 47, name: 'Gavin Harrison' }, { id: 48, name: 'Abe Cunningham' }, { id: 49, name: 'Richard Christy' },
  { id: 50, name: 'Aquiles Priester' }, { id: 51, name: 'Paul Mazurkiewicz' }, { id: 52, name: 'Mike Mangini' },
  { id: 53, name: 'Matt Garstka' }, { id: 54, name: 'Daniel Erlandsson' }, { id: 55, name: 'Jaska Raatikainen' },
  { id: 56, name: 'Hannes Grossmann' }, { id: 57, name: 'Daray' }, { id: 58, name: 'Jocke Wallgren' },
  { id: 59, name: 'Tim Yeung' }, { id: 60, name: 'Kevin Talley' }, { id: 61, name: 'Isaac Lamb' },
  { id: 62, name: 'Ryan Van Poederooyen' },
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
  { slug: 'fastest-metal-drummers', name: 'Top 10 Fastest Metal Drummers' },
  { slug: 'death-metal-drummers', name: 'Top 10 Death Metal Drummers' },
  { slug: 'most-innovative-drummers', name: 'Top 10 Most Innovative' },
  { slug: 'thrash-metal-drummers', name: 'Top 10 Thrash Metal Drummers' },
  { slug: 'drummers-with-budget-friendly-kits', name: 'Top 10 Budget-Friendly Setups' },
  // Issue #630: Most Expensive Metal Drum Setups article page
  { slug: 'most-expensive-drum-setups', name: 'Top 10 Most Expensive Metal Drum Setups' },
  // Issue #642: Fastest Double Bass Drummers article page
  { slug: 'fastest-double-bass-drummers', name: 'Top 10 Fastest Double Bass Drummers in Metal' },
  // Issue #658: Most Brutal Drum Solos article page
  { slug: 'most-brutal-drum-solos', name: 'Top 10 Most Brutal Drum Solos in Metal History' },
];

// Issue #642, #658: Article pages (SEO-optimized with /articles/:slug route)
const articles = [
  { slug: 'most-expensive-drum-setups', name: 'Top 10 Most Expensive Metal Drum Setups' },
  { slug: 'fastest-double-bass-drummers', name: 'Top 10 Fastest Double Bass Drummers in Metal' },
  { slug: 'most-brutal-drum-solos', name: 'Top 10 Most Brutal Drum Solos in Metal History' },
];

// Issue #663: Album gear breakdown articles
// Issue #785: Dynamically generate albumArticles from ALBUM_ARTICLES data source
const albumArticles = Object.keys(ALBUM_ARTICLES).map(slug => ({
  slug,
  name: ALBUM_ARTICLES[slug].albumTitle 
    ? `${ALBUM_ARTICLES[slug].albumTitle} Drum Setup`
    : ALBUM_ARTICLES[slug].title || slug
}));

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

// Issue #344: Drumming technique pages
const techniques = [
  { slug: 'blast-beat', name: 'Blast Beat' },
  { slug: 'double-bass', name: 'Double Bass Drumming' },
  { slug: 'gravity-blast', name: 'Gravity Blast' },
  { slug: 'polyrhythms', name: 'Polyrhythms' },
  { slug: 'odd-time-signatures', name: 'Odd Time Signatures' },
  { slug: 'one-handed-roll', name: 'One-Handed Roll' },
  { slug: 'triggered-drums', name: 'Triggered Drums' },
  { slug: 'groove-drumming', name: 'Groove Metal Drumming' },
  { slug: 'linear-drumming', name: 'Linear Drumming' },
  { slug: 'fill-techniques', name: 'Metal Drum Fills' },
];

// Issue #656: Gear brand landing pages for SEO
const gearBrands = [
  // Drum Brands
  { slug: 'tama', name: 'Tama', type: 'drums' },
  { slug: 'pearl', name: 'Pearl', type: 'drums' },
  { slug: 'dw', name: 'DW (Drum Workshop)', type: 'drums' },
  { slug: 'ludwig', name: 'Ludwig', type: 'drums' },
  // Cymbal Brands
  { slug: 'zildjian', name: 'Zildjian', type: 'cymbals' },
  { slug: 'paiste', name: 'Paiste', type: 'cymbals' },
  { slug: 'meinl', name: 'Meinl', type: 'cymbals' },
  { slug: 'sabian', name: 'Sabian', type: 'cymbals' },
];

// Issue #345: Gear comparison pages for SEO
const gearComparisons = [
  { slug: 'tama-vs-pearl', name: 'Tama vs Pearl Drums' },
  { slug: 'meinl-vs-zildjian', name: 'Meinl vs Zildjian Cymbals' },
  { slug: 'tama-iron-cobra-vs-pearl-demon-drive', name: 'Tama Iron Cobra vs Pearl Demon Drive' },
  { slug: 'paiste-vs-sabian', name: 'Paiste vs Sabian Cymbals' },
  { slug: 'tama-slp-vs-pearl-sensitone', name: 'Tama SLP vs Pearl Sensitone' },
  { slug: 'sonor-vs-dw', name: 'Sonor vs DW Drums' },
];

// Issue #558, #598, #650: Drummer vs Drummer comparison pages for SEO
// Issue #650: Generate ALL drummer comparison pairs dynamically (62 drummers = 1891 pairs)
function generateAllDrummerComparisons(drummerList) {
  const comparisons = [];
  for (let i = 0; i < drummerList.length; i++) {
    for (let j = i + 1; j < drummerList.length; j++) {
      const slug1 = generateSlug(drummerList[i].name);
      const slug2 = generateSlug(drummerList[j].name);
      // Alphabetical order for consistency
      const orderedSlug = slug1 < slug2 ? `${slug1}-vs-${slug2}` : `${slug2}-vs-${slug1}`;
      comparisons.push({
        slug: orderedSlug,
        name: `${drummerList[i].name} vs ${drummerList[j].name}`
      });
    }
  }
  return comparisons;
}
const drummerComparisons = generateAllDrummerComparisons(drummers);

// Issue #685: "How to Sound Like" guides - SEO content hub
const soundLikeGuides = [
  { slug: 'how-to-sound-like-joey-jordison', name: 'How to Sound Like Joey Jordison' },
  { slug: 'how-to-sound-like-danny-carey', name: 'How to Sound Like Danny Carey' },
  { slug: 'how-to-sound-like-lars-ulrich', name: 'How to Sound Like Lars Ulrich' },
  { slug: 'how-to-sound-like-dave-lombardo', name: 'How to Sound Like Dave Lombardo' },
  { slug: 'how-to-sound-like-mario-duplantier', name: 'How to Sound Like Mario Duplantier' },
  { slug: 'how-to-sound-like-tomas-haake', name: 'How to Sound Like Tomas Haake' },
  { slug: 'how-to-sound-like-gene-hoglan', name: 'How to Sound Like Gene Hoglan' },
  { slug: 'how-to-sound-like-brann-dailor', name: 'How to Sound Like Brann Dailor' },
  { slug: 'how-to-sound-like-matt-halpern', name: 'How to Sound Like Matt Halpern' },
  { slug: 'how-to-sound-like-chris-adler', name: 'How to Sound Like Chris Adler' },
];

// Issue #702: Beginner gear guides - SEO content hub
const beginnerGuides = [
  { slug: 'beginner-metal-drummer-setup', name: 'The Ultimate Beginner Metal Drummer Gear Guide Under $1000' },
];

// Issue #704: Metal Drummer Name Generator - viral tool
const toolPages = [
  { slug: 'metal-drummer-name-generator', name: 'Metal Drummer Name Generator' },
];

// Issue #732: Top 20 Gear Comparison Tool pairs for SEO
// High-traffic matchups for auto-generation
const top20GearComparisons = [
  { d1: 'joey-jordison', d2: 'lars-ulrich' },
  { d1: 'lars-ulrich', d2: 'dave-lombardo' },
  { d1: 'joey-jordison', d2: 'george-kollias' },
  { d1: 'mario-duplantier', d2: 'tomas-haake' },
  { d1: 'mike-portnoy', d2: 'danny-carey' },
  { d1: 'gene-hoglan', d2: 'pete-sandoval' },
  { d1: 'hellhammer', d2: 'inferno' },
  { d1: 'brann-dailor', d2: 'mario-duplantier' },
  { d1: 'dave-lombardo', d2: 'gene-hoglan' },
  { d1: 'matt-halpern', d2: 'alex-bent' },
  { d1: 'nicko-mcbrain', d2: 'vinnie-paul' },
  { d1: 'charlie-benante', d2: 'dave-lombardo' },
  { d1: 'eloy-casagrande', d2: 'joey-jordison' },
  { d1: 'george-kollias', d2: 'flo-mounier' },
  { d1: 'danny-carey', d2: 'tomas-haake' },
  { d1: 'chris-adler', d2: 'brann-dailor' },
  { d1: 'joey-jordison', d2: 'vinnie-paul' },
  { d1: 'matt-garstka', d2: 'matt-halpern' },
  { d1: 'inferno', d2: 'george-kollias' },
  { d1: 'mike-portnoy', d2: 'mike-mangini' },
];

// Issue #739: Signature Gear Spotlight pages
const signatureGearPages = [
  { drummerSlug: 'joey-jordison', gearSlug: 'joey-jordison-pearl-signature-snare', name: 'Pearl Joey Jordison Signature Snare' },
  { drummerSlug: 'lars-ulrich', gearSlug: 'lars-ulrich-paiste-rude-china', name: 'Paiste 20" RUDE Wild China' },
  // Future items to be added:
  // { drummerSlug: 'danny-carey', gearSlug: 'danny-carey-paiste-giant-beat-gongs', name: 'Paiste Giant Beat Gongs' },
  // { drummerSlug: 'mario-duplantier', gearSlug: 'mario-duplantier-tama-starphonic-bronze', name: 'Tama Starphonic Bronze' },
  // { drummerSlug: 'gene-hoglan', gearSlug: 'gene-hoglan-pearl-reference-kit', name: 'Pearl Reference Pure Kit' },
];

// Issue #749: Signature Licks Database pages
const signatureLicksPages = [
  // Joey Jordison licks
  { drummerSlug: 'joey-jordison', lickSlug: 'joey-jordison-heretic-anthem-intro', name: 'Heretic Anthem Intro' },
  { drummerSlug: 'joey-jordison', lickSlug: 'joey-jordison-eyeless-blast', name: 'Eyeless Blast Section' },
  { drummerSlug: 'joey-jordison', lickSlug: 'joey-jordison-disasterpiece-chaos', name: 'Disasterpiece Chaos Fill' },
  // Lars Ulrich licks
  { drummerSlug: 'lars-ulrich', lickSlug: 'lars-ulrich-one-intro', name: 'One Intro Pattern' },
  { drummerSlug: 'lars-ulrich', lickSlug: 'lars-ulrich-enter-sandman-groove', name: 'Enter Sandman Main Groove' },
  { drummerSlug: 'lars-ulrich', lickSlug: 'lars-ulrich-master-of-puppets-gallop', name: 'Master of Puppets Gallop' },
  // Dave Lombardo licks
  { drummerSlug: 'dave-lombardo', lickSlug: 'dave-lombardo-angel-of-death-chaos', name: 'Angel of Death Opening' },
  { drummerSlug: 'dave-lombardo', lickSlug: 'dave-lombardo-raining-blood-double-bass', name: 'Raining Blood Double Bass' },
  { drummerSlug: 'dave-lombardo', lickSlug: 'dave-lombardo-seasons-thrash', name: 'Seasons in the Abyss Groove' },
  // George Kollias licks
  { drummerSlug: 'george-kollias', lickSlug: 'george-kollias-gravity-blast', name: 'Nile Gravity Blast Pattern' },
  { drummerSlug: 'george-kollias', lickSlug: 'george-kollias-polyrhythmic-mayhem', name: 'Polyrhythmic Death Metal Pattern' },
  { drummerSlug: 'george-kollias', lickSlug: 'george-kollias-sustained-blast', name: 'Sustained 250+ BPM Blast' },
  // Mario Duplantier licks
  { drummerSlug: 'mario-duplantier', lickSlug: 'mario-duplantier-polyrhythmic-groove', name: 'Gojira Polyrhythmic Groove' },
  { drummerSlug: 'mario-duplantier', lickSlug: 'mario-duplantier-blast-variation', name: 'Gojira Blast Variation' },
  { drummerSlug: 'mario-duplantier', lickSlug: 'mario-duplantier-backbone-groove', name: 'Backbone Main Groove' },
];

// Drummers with licks hub pages
const drummerLicksHubs = [
  { drummerSlug: 'joey-jordison', name: 'Joey Jordison' },
  { drummerSlug: 'lars-ulrich', name: 'Lars Ulrich' },
  { drummerSlug: 'dave-lombardo', name: 'Dave Lombardo' },
  { drummerSlug: 'george-kollias', name: 'George Kollias' },
  { drummerSlug: 'mario-duplantier', name: 'Mario Duplantier' },
];

// Issue #802: Endorsement Tracker pages
// Track brand deals and endorsement history for drummers
const endorsementDrummers = [
  'lars-ulrich', 'joey-jordison', 'tomas-haake', 'dave-lombardo',
  'george-kollias', 'eloy-casagrande', 'jay-weinberg', 'mike-portnoy',
  'danny-carey', 'mario-duplantier', 'brann-dailor', 'chris-adler',
  'matt-halpern', 'inferno', 'charlie-benante',
];

// Issue #813: Gear Price History Tracker pages
// Inflation-adjusted setup costs over time
const gearPriceHistoryDrummers = [
  'lars-ulrich',     // Kill 'Em All era (1983)
  'joey-jordison',   // Iowa era (2001)
  'dave-lombardo',   // Reign in Blood era (1986)
];

// Issue #770: SEO Blitz - Drummer Gear Category Pages
// Long-tail keyword pages at /drummer/:slug/:category
const drummerGearCategories = ['cymbals', 'drums', 'pedals', 'hardware', 'snare', 'sticks'];
const priorityDrummersForGearPages = [
  'joey-jordison', 'lars-ulrich', 'george-kollias', 'mario-duplantier',
  'dave-lombardo', 'brann-dailor', 'tomas-haake', 'danny-carey',
  'gene-hoglan', 'eloy-casagrande', 'mike-portnoy', 'vinnie-paul',
  'charlie-benante', 'ray-luzier', 'john-otto', 'jay-weinberg',
];
// Generate all drummer gear category page combinations (priority drummers × 4 main categories)
const drummerGearCategoryPages = [];
for (const drummerSlug of priorityDrummersForGearPages) {
  for (const category of ['cymbals', 'drums', 'pedals', 'hardware']) {
    drummerGearCategoryPages.push({ drummerSlug, category });
  }
}

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
    { loc: '/kit-quiz', priority: '0.9', changefreq: 'weekly' },
    { loc: '/guess-the-kit', priority: '0.95', changefreq: 'weekly' }, // Issue #706: Photo Quiz
    { loc: '/kit-builder', priority: '0.9', changefreq: 'weekly' },
    { loc: '/gear', priority: '0.9', changefreq: 'weekly' },
    { loc: '/quotes', priority: '0.9', changefreq: 'weekly' },
    { loc: '/lists', priority: '0.9', changefreq: 'weekly' },
    { loc: '/birthdays', priority: '0.9', changefreq: 'weekly' },
    // Issue #723: Metal Drummer Evolution Timeline (1970-2024)
    { loc: '/history', priority: '0.9', changefreq: 'monthly' },
    { loc: '/techniques', priority: '0.9', changefreq: 'weekly' },
    // Issue #660: Gear News page with RSS
    { loc: '/gear-news', priority: '0.9', changefreq: 'daily' },
    // Issue #689: Drummer Battle voting feature
    { loc: '/battles', priority: '0.9', changefreq: 'weekly' },
    // Issue #695: Gear Statistics data hub
    { loc: '/stats/gear-insights', priority: '0.9', changefreq: 'weekly' },
    // Issue #685: "How to Sound Like" guides hub
    { loc: '/guides', priority: '0.9', changefreq: 'weekly' },
    ...soundLikeGuides.map(g => ({ loc: `/guides/${g.slug}`, priority: '0.9', changefreq: 'monthly' })),
    // Issue #702: Beginner gear guides
    ...beginnerGuides.map(g => ({ loc: `/guides/${g.slug}`, priority: '0.95', changefreq: 'monthly' })),
    // Issue #729: Tools Hub landing page
    { loc: '/tools', priority: '0.95', changefreq: 'weekly' },
    // Issue #704: Tools pages (viral tools)
    ...toolPages.map(t => ({ loc: `/tools/${t.slug}`, priority: '0.95', changefreq: 'weekly' })),
    // Issue #721, #732: Gear Comparison Tool + Top 20 SEO comparisons
    { loc: '/tools/compare', priority: '0.95', changefreq: 'weekly' },
    ...top20GearComparisons.map(c => ({ 
      loc: `/tools/compare/${c.d1}-vs-${c.d2}`, 
      priority: '0.9', 
      changefreq: 'weekly' 
    })),
    ...gearCategories.map(c => ({ loc: `/gear/${c.slug}`, priority: '0.9', changefreq: 'weekly' })),
    ...top10Lists.map(l => ({ loc: `/lists/${l.slug}`, priority: '0.8', changefreq: 'monthly' })),
    // Issue #642: Article pages for SEO-optimized content
    ...articles.map(a => ({ loc: `/articles/${a.slug}`, priority: '0.9', changefreq: 'weekly' })),
    // Issue #663: Album gear breakdown and drummer kit articles
    ...albumArticles.map(a => ({ loc: `/articles/${a.slug}`, priority: '0.9', changefreq: 'monthly' })),
    ...drummers.map(d => ({ loc: `/drummer/${generateSlug(d.name)}`, priority: '0.8', changefreq: 'monthly' })),
    ...gearItems.map(g => ({ loc: `/gear/item/${g.slug}`, priority: '0.7', changefreq: 'monthly' })),
    ...bandPages.map(b => ({ loc: `/band/${b.slug}`, priority: '0.8', changefreq: 'monthly' })),
    ...techniques.map(t => ({ loc: `/techniques/${t.slug}`, priority: '0.8', changefreq: 'monthly' })),
    // Issue #656: Gear brand landing pages
    { loc: '/brands', priority: '0.9', changefreq: 'weekly' },
    ...gearBrands.map(b => ({ loc: `/brands/${b.slug}`, priority: '0.8', changefreq: 'monthly' })),
    // Issue #345: Gear comparison pages
    { loc: '/compare', priority: '0.9', changefreq: 'weekly' },
    ...gearComparisons.map(c => ({ loc: `/compare/${c.slug}`, priority: '0.8', changefreq: 'monthly' })),
    // Issue #558, #691: Drummer vs Drummer comparison pages (SEO play)
    { loc: '/vs', priority: '0.9', changefreq: 'weekly' },
    ...drummerComparisons.map(c => ({ loc: `/vs/${c.slug}`, priority: '0.7', changefreq: 'monthly' })),
    // Issue #739: Signature Gear Spotlight pages
    ...signatureGearPages.map(sg => ({ loc: `/drummers/${sg.drummerSlug}/signature/${sg.gearSlug}`, priority: '0.85', changefreq: 'monthly' })),
    // Issue #749: Signature Licks Database pages
    ...drummerLicksHubs.map(d => ({ loc: `/drummers/${d.drummerSlug}/licks`, priority: '0.9', changefreq: 'weekly' })),
    ...signatureLicksPages.map(sl => ({ loc: `/drummers/${sl.drummerSlug}/licks/${sl.lickSlug}`, priority: '0.85', changefreq: 'monthly' })),
    // Issue #770: SEO Blitz - Drummer Gear Category Pages (long-tail keywords)
    ...drummerGearCategoryPages.map(dgc => ({ loc: `/drummer/${dgc.drummerSlug}/${dgc.category}`, priority: '0.85', changefreq: 'monthly' })),
    // Issue #802: Endorsement Tracker pages
    { loc: '/endorsement-news', priority: '0.9', changefreq: 'weekly' },
    ...endorsementDrummers.map(slug => ({ loc: `/drummers/${slug}/endorsements`, priority: '0.85', changefreq: 'monthly' })),
    // Issue #813: Gear Price History Tracker pages
    ...gearPriceHistoryDrummers.map(slug => ({ loc: `/drummers/${slug}/gear-history`, priority: '0.9', changefreq: 'monthly' })),
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
