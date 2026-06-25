/**
 * Catchall Meta Tags API Endpoint
 * Issue #769: Add Rich Social Meta Tags (Open Graph + Twitter Cards) to All Pages
 * Issue #777: Add Article schema to content articles
 * 
 * Handles dynamic meta tag generation for any path.
 * Used via vercel.json rewrites for crawler user agents.
 */

import { drummers } from '../drummers/index.js';
// Issue #1064: source unique meta + Article schema for the full album/kit article
// corpus from the same data the sitemap uses (api/sitemap.js:8).
import { ALBUM_ARTICLES } from '../../packages/frontend/data/albumArticles.js';
// Issue #1172: band-specific SSR meta for /bands/<slug> and /bands index pages.
import { bands as BAND_DATA } from '../../packages/frontend/data/bands.js';
// Issue #1202: individual technique page SSR meta for /technique/<slug> and /technique/<slug>/drummers.
import { getTechniqueBySlug, getAllTechniques } from '../../packages/frontend/data/techniques.js';
// Issue #1209: lick page SSR meta for /licks, /drummers/<slug>/licks, /drummers/<slug>/licks/<slug>.
import SIGNATURE_LICKS from '../../packages/frontend/data/licks/index.js';
// Issue #1210: top-10 list page SSR meta for /lists/<slug>.
import { TOP_10_LISTS } from '../../packages/frontend/data/top10Lists.js';
// Issue #1379: /gear/<brand>/<series>/drummers-using SSR meta (~40 pages).
import { GEAR_INDEX } from '../../packages/frontend/data/gearIndex.js';
// Issue #2403 (split 1/4 of #2215): purchase-intent kit pages with richer drummer data.
import { DRUMMERS_BY_KIT } from '../../packages/frontend/data/drummersByKit.js';
// Issue #1387: gear item drummer links — authoritative drummerIds live in the gear API.
import { gearItems } from '../gear/[slug].js';
// Issue #1451: HowTo JSON-LD + Article schema for /guides/how-to-sound-like-<slug> pages.
// Issue #2202: FAQPage JSON-LD alongside HowTo for AI Overview + voice search eligibility.
import { SOUND_LIKE_GUIDES, generateGuideSchema } from '../../packages/frontend/data/soundLikeGuides.js';
// Issue #1475: drummer gear evolution pages SSR meta.
import { DRUMMER_EVOLUTION } from '../../packages/frontend/data/drummerEvolution.js';
// Issue #1473: /battles/<slug> individual pages — FAQPage + BreadcrumbList JSON-LD.
import { CURATED_MATCHUPS } from '../../packages/frontend/data/battles.js';
// Issue #1474: /drummers/<slug>/signature/<gearSlug> pages — Product + BreadcrumbList JSON-LD.
import { SIGNATURE_GEAR } from '../../packages/frontend/data/signatureGear.js';
// Issue #1522: Quotation + ItemList JSON-LD for /quotes page.
import { getAllQuotes } from '../quotes-data.js';
// Issue #1794: genre gear guide pages — /guides/best-[gear]-for-[genre]
import { GENRE_GEAR_GUIDES } from '../../packages/frontend/data/genreGearGuides.js';

const BASE_URL = 'https://metalforge.io';
const SITE_NAME = 'MetalForge';
const TWITTER_HANDLE = '@MetalDrumGear';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;
const DEFAULT_DESCRIPTION = 'Explore the drum kits, cymbals, and gear used by legendary metal drummers. Discover what Lars Ulrich, Joey Jordison, Dave Lombardo and 60+ pro drummers play.';

// Issue #1396: slug → display-name map built from the drummers roster.
// Bands store drummer references as slugs in drummerHistory; this lets us
// hydrate MusicGroup member data without a separate lookup array.
const drummerSlugToName = {};
drummers.forEach(d => {
  const slug = d.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  drummerSlugToName[slug] = d.name;
});

// Issue #1473: battle-slug → {d1, d2, title} lookup built from CURATED_MATCHUPS.
// Slugs mirror the front-end generateDrummerSlug + getBattleSlug logic so they
// resolve 1:1 with the live /battles/<slug> routes.
function _battleDrummerSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
const _drummerById = {};
drummers.forEach(d => { _drummerById[d.id] = d; });
const BATTLE_BY_SLUG = {};
for (const m of CURATED_MATCHUPS) {
  const d1 = _drummerById[m.drummer1Id];
  const d2 = _drummerById[m.drummer2Id];
  if (d1 && d2) {
    const battleSlug = `${_battleDrummerSlug(d1.name)}-vs-${_battleDrummerSlug(d2.name)}`;
    BATTLE_BY_SLUG[battleSlug] = { d1, d2, title: m.title };
  }
}

// Issue #1140: per-drummer SEO title/description overrides for pages where the
// generic "<name> — Complete Gear Setup" title under-serves a high-volume query
// cluster surfaced by GSC. Keyed by drummer slug. The drummer-page branch below
// uses an override when present, else falls back to the generic template.
//
// Joey Jordison is the single dominant organic intent on the site (~10% of weekly
// impressions: "joey jordison drum set/kit", stuck pos 6–9). Lead the title with
// the exact head terms ("Drum Set & Kit") + Slipknot, and surface the signature
// gear (Pearl signature snare, Promark TX515W) in the description to match the
// high-CTR "kit for sale" commercial intent.
const DRUMMER_META_OVERRIDES = {
  'joey-jordison': {
    title: `Joey Jordison Drum Set & Kit: Slipknot Gear Breakdown | ${SITE_NAME}`,
    description:
      "What drum set does Joey Jordison play? The Slipknot legend's Pearl Reference kit — signature snare, Promark TX515W sticks — with full specs and prices.",
  },
};

// Article data for schema.org Article structured data (Issue #777)
// Maps article slugs to their metadata for SEO schema generation
const ARTICLE_METADATA = {
  'cowboys-from-hell-drum-setup': {
    headline: "Cowboys from Hell Drum Setup: Vinnie Paul's Breakthrough Gear",
    description: "Complete breakdown of Vinnie Paul's drum gear on Pantera's Cowboys from Hell. The Tama kit, explosive snare sound, and recording techniques that launched groove metal.",
    author: 'MetalForge Editorial',
    datePublished: '2026-03-24',
    dateModified: '2026-03-24',
    image: `${BASE_URL}/images/albums/cowboys-from-hell-drums.webp`,
    articleSection: 'Album Gear Breakdown',
    keywords: ['cowboys from hell drums', 'vinnie paul drum setup', 'pantera gear'],
  },
  'mike-mangini-dream-theater-arsenal': {
    headline: "What's In Mike Mangini's Dream Theater Arsenal",
    description: "Complete breakdown of Mike Mangini's massive drum kit setup. Discover the gear the world record holder and Berklee professor uses with Dream Theater.",
    author: 'MetalForge Editorial',
    datePublished: '2026-03-24',
    dateModified: '2026-03-24',
    image: `${BASE_URL}/images/drummers/mike-mangini.webp`,
    articleSection: 'Drummer Gear Breakdown',
    keywords: ['mike mangini drum kit', 'dream theater drummer', 'progressive metal drums'],
  },
  'whats-in-mike-manginis-kit': {
    headline: "What's In Mike Mangini's Dream Theater Arsenal",
    description: "Complete breakdown of Mike Mangini's massive drum kit setup. Discover the gear the world record holder and Berklee professor uses with Dream Theater.",
    author: 'MetalForge Editorial',
    datePublished: '2026-03-24',
    dateModified: '2026-03-24',
    image: `${BASE_URL}/images/drummers/mike-mangini.webp`,
    articleSection: 'Drummer Gear Breakdown',
    keywords: ['mike mangini drum kit', 'dream theater drummer', 'progressive metal drums'],
  },
  'vinnie-paul-pantera-arsenal': {
    headline: "What's In Vinnie Paul's Pantera Arsenal (Tribute)",
    description: "Complete breakdown of Vinnie Paul's legendary drum kit setup. From Cowboys from Hell to his final days with Hellyeah, discover the gear that defined groove metal drumming.",
    author: 'MetalForge Editorial',
    datePublished: '2026-03-23',
    dateModified: '2026-03-23',
    image: `${BASE_URL}/images/drummers/vinnie-paul.webp`,
    articleSection: 'Drummer Gear Breakdown',
    keywords: ['vinnie paul drum kit', 'pantera drummer gear', 'groove metal drums'],
  },
  'whats-in-vinnie-pauls-kit': {
    headline: "What's In Vinnie Paul's Pantera Arsenal (Tribute)",
    description: "Complete breakdown of Vinnie Paul's legendary drum kit setup. From Cowboys from Hell to his final days with Hellyeah, discover the gear that defined groove metal drumming.",
    author: 'MetalForge Editorial',
    datePublished: '2026-03-23',
    dateModified: '2026-03-23',
    image: `${BASE_URL}/images/drummers/vinnie-paul.webp`,
    articleSection: 'Drummer Gear Breakdown',
    keywords: ['vinnie paul drum kit', 'pantera drummer gear', 'groove metal drums'],
  },
  'nicko-mcbrain-iron-maiden-arsenal': {
    headline: "What's In Nicko McBrain's Iron Maiden Arsenal",
    description: "Complete breakdown of Nicko McBrain's drum kit setup. Discover the gear that powers Iron Maiden's legendary galloping rhythms — achieved entirely with a single bass drum pedal.",
    author: 'MetalForge Editorial',
    datePublished: '2026-03-23',
    dateModified: '2026-03-23',
    image: `${BASE_URL}/images/drummers/nicko-mcbrain.webp`,
    articleSection: 'Drummer Gear Breakdown',
    keywords: ['nicko mcbrain drum kit', 'iron maiden drummer', 'single bass drum metal'],
  },
  'whats-in-nicko-mcbrains-kit': {
    headline: "What's In Nicko McBrain's Iron Maiden Arsenal",
    description: "Complete breakdown of Nicko McBrain's drum kit setup. Discover the gear that powers Iron Maiden's legendary galloping rhythms — achieved entirely with a single bass drum pedal.",
    author: 'MetalForge Editorial',
    datePublished: '2026-03-23',
    dateModified: '2026-03-23',
    image: `${BASE_URL}/images/drummers/nicko-mcbrain.webp`,
    articleSection: 'Drummer Gear Breakdown',
    keywords: ['nicko mcbrain drum kit', 'iron maiden drummer', 'single bass drum metal'],
  },
  'jay-weinberg-kit': {
    headline: "What's In Jay Weinberg's Slipknot Kit",
    description: "Complete breakdown of Jay Weinberg's drum setup with Slipknot. Discover the gear the former Slipknot drummer uses for their intense live performances.",
    author: 'MetalForge Editorial',
    datePublished: '2026-03-23',
    dateModified: '2026-03-23',
    image: `${BASE_URL}/images/drummers/jay-weinberg.webp`,
    articleSection: 'Drummer Gear Breakdown',
    keywords: ['jay weinberg drum kit', 'slipknot drummer gear', 'nu metal drums'],
  },
};

// Helper: Get drummer by slug
function getDrummerBySlug(slug) {
  const normalizedSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '');
  return drummers.find(d => {
    const drummerSlug = d.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    return drummerSlug === normalizedSlug;
  });
}

// Helper: Get primary brands from gear
function getPrimaryBrands(gear) {
  if (!gear) return [];
  const brands = [];
  if (gear.drums) {
    const match = gear.drums.match(/^([A-Z][a-z]+)/);
    if (match) brands.push(match[1]);
  }
  if (gear.cymbals) {
    const match = gear.cymbals.match(/^([A-Z][a-z]+)/);
    if (match) brands.push(match[1]);
  }
  return [...new Set(brands)];
}

// Helper: Truncate text
function truncate(text, maxLength) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

// Generate meta tags for path
function getMetaForPath(pathname) {
  const path = pathname.toLowerCase();
  
  // Homepage
  if (path === '/' || path === '') {
    return {
      title: `${SITE_NAME} — Metal Drummer Gear Database`,
      description: DEFAULT_DESCRIPTION,
      image: DEFAULT_IMAGE,
      type: 'website',
      url: BASE_URL,
    };
  }

  // Quiz page
  if (path === '/quiz') {
    return {
      title: `Which Legendary Metal Drummer Are You? 🤘 | ${SITE_NAME}`,
      description: 'Take the quiz and discover which legendary metal drummer matches your style! Joey Jordison? George Kollias? Lars Ulrich? Find out now!',
      image: `${BASE_URL}/images/og/quiz-preview.png`,
      type: 'website',
      url: `${BASE_URL}/quiz`,
      articleSchema: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is the MetalForge metal drummer quiz?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The MetalForge quiz asks about your drumming style, preferred genres, and gear preferences to match you with a legendary metal drummer profile. Takes about 2 minutes.',
                },
              },
              {
                '@type': 'Question',
                name: 'How many metal drummers are in the quiz?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The quiz can match you to 60+ legendary metal drummers in the MetalForge database, from Lars Ulrich and Joey Jordison to George Kollias and Tomas Haake.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is the MetalForge drummer quiz free?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, the MetalForge drummer quiz is completely free. No signup required.',
                },
              },
            ],
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
              { '@type': 'ListItem', position: 2, name: 'Drummer Quiz', item: `${BASE_URL}/quiz` },
            ],
          },
        ],
      }),
    };
  }

  // Stats hub
  if (path === '/stats') {
    return {
      title: `Metal Drummer Gear Statistics — Data-Driven Insights | ${SITE_NAME}`,
      description: 'Most popular cymbals, drums, and gear among 60+ legendary metal drummers. See what the pros actually use (with real stats).',
      image: `${BASE_URL}/images/og/stats-preview.png`,
      type: 'website',
      url: `${BASE_URL}/stats`,
      articleSchema: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Dataset',
        name: 'Metal Drummer Gear Statistics',
        description: 'Most popular cymbals, drums, and hardware among 60+ legendary metal drummers — sourced from MetalForge gear database.',
        url: `${BASE_URL}/stats`,
        creator: { '@type': 'Organization', name: 'MetalForge', url: BASE_URL },
        variableMeasured: [
          'Drum kit brand popularity',
          'Cymbal brand popularity',
          'Hardware brand usage',
          'Drumstick brand usage',
        ],
        spatialCoverage: 'Global',
        temporalCoverage: '1980/..',
      }),
      faqSchema: [
        {
          question: 'What drum brand do most metal drummers use?',
          answer: 'Tama is the most popular drum brand among metal drummers on MetalForge, used by a significant percentage of the 60+ pros in the database. DW, Pearl, and Ludwig are also widely represented.',
        },
        {
          question: 'Which cymbal brand is most popular with metal drummers?',
          answer: 'Zildjian leads cymbal adoption among metal drummers, followed closely by Meinl, Sabian, and Paiste. Many extreme metal drummers favour Meinl for their darker tone.',
        },
        {
          question: 'What pedals do professional metal drummers prefer?',
          answer: 'DW 9000 and Tama Iron Cobra are the most commonly used double bass pedals among the metal drummers profiled on MetalForge.',
        },
      ],
    };
  }

  if (path === '/stats/gear-insights') {
    return {
      title: `Metal Drummer Gear Stats & Insights — Brand Usage Data | ${SITE_NAME}`,
      description: 'Real data: which drum brands, cymbals, and pedals are most popular among 60+ pro metal drummers. Usage percentages, trends, and brand breakdowns.',
      image: `${BASE_URL}/images/og/stats-preview.png`,
      type: 'website',
      url: `${BASE_URL}/stats/gear-insights`,
      articleSchema: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Dataset',
        name: 'Metal Drummer Gear Brand Usage Statistics',
        description: 'Brand-by-brand usage percentages across 60+ pro metal drummers — drum kits, cymbals, pedals, sticks.',
        url: BASE_URL + '/stats/gear-insights',
        creator: { '@type': 'Organization', name: 'MetalForge', url: BASE_URL },
        variableMeasured: ['Drum kit brand market share', 'Cymbal brand usage %', 'Pedal brand usage %', 'Stick brand usage %'],
        temporalCoverage: '1980/..',
        spatialCoverage: 'Global',
      }),
      faqSchema: [
        {
          question: 'What drum brand do most metal drummers use?',
          answer: 'Tama is the most popular drum brand among metal drummers on MetalForge, used by a significant percentage of the 60+ pros in the database. DW, Pearl, and Ludwig are also widely represented.',
        },
        {
          question: 'Which cymbal brand is most popular with metal drummers?',
          answer: 'Zildjian leads cymbal adoption among metal drummers, followed closely by Meinl, Sabian, and Paiste. Many extreme metal drummers favour Meinl for their darker tone.',
        },
        {
          question: 'What pedals do professional metal drummers prefer?',
          answer: 'DW 9000 and Tama Iron Cobra are the most commonly used double bass pedals among the metal drummers profiled on MetalForge.',
        },
      ],
    };
  }

  // Drummers list
  if (path === '/drummers') {
    return {
      title: `All Metal Drummers — Complete Gear Database | ${SITE_NAME}`,
      description: 'Browse 60+ legendary metal drummers and explore their complete gear setups. From Lars Ulrich to George Kollias.',
      image: DEFAULT_IMAGE,
      type: 'website',
      url: `${BASE_URL}/drummers`,
      articleSchema: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Who are the best metal drummers of all time?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The greatest metal drummers include Joey Jordison (Slipknot), Dave Lombardo (Slayer), Gene Hoglan (Death/Testament), George Kollias (Nile), and Lars Ulrich (Metallica). MetalForge profiles 60+ professional metal drummers with complete gear breakdowns.',
            }
          },
          {
            '@type': 'Question',
            name: 'What drums do metal drummers use?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Most metal drummers use double bass drum kits from brands like Tama, DW (DW Drums), Pearl, and Ludwig. Popular cymbal brands include Zildjian, Meinl, Sabian, and Paiste. Many metal drummers use 22-24" bass drums for a deeper sound.',
            }
          },
          {
            '@type': 'Question',
            name: 'How can I find out what gear a metal drummer uses?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'MetalForge provides complete gear breakdowns for 60+ metal drummers including drums, cymbals, pedals, hardware, sticks, and endorsements. Visit any drummer profile page for their full setup.',
            }
          },
        ],
      }),
    };
  }

  // VS comparison pages
  const vsMatch = path.match(/^\/vs\/([a-z0-9-]+)-vs-([a-z0-9-]+)$/);
  if (vsMatch) {
    const [, slug1, slug2] = vsMatch;
    const drummer1 = getDrummerBySlug(slug1);
    const drummer2 = getDrummerBySlug(slug2);
    
    if (drummer1 && drummer2) {
      const today = new Date().toISOString().split('T')[0];
      return {
        title: `${drummer1.name} vs ${drummer2.name} — Gear Comparison | ${SITE_NAME}`,
        description: `Compare ${drummer1.name} (${drummer1.band}) vs ${drummer2.name} (${drummer2.band}) — drums, cymbals, hardware side-by-side.`,
        image: `${BASE_URL}/api/og/compare?d1=${slug1}&d2=${slug2}`,
        type: 'article',
        url: `${BASE_URL}/vs/${slug1}-vs-${slug2}`,
        articleSchema: {
          headline: `${drummer1.name} vs ${drummer2.name} — Gear Comparison`,
          description: `Compare ${drummer1.name} (${drummer1.band}) vs ${drummer2.name} (${drummer2.band}) — drums, cymbals, hardware side-by-side.`,
          author: 'MetalForge Editorial',
          datePublished: '2026-03-05',
          dateModified: today,
          image: `${BASE_URL}/api/og/compare?d1=${slug1}&d2=${slug2}`,
          articleSection: 'Drummer Comparisons',
          keywords: [drummer1.name, drummer2.name, drummer1.band, drummer2.band, 'drummer comparison', 'drum gear'],
        },
        breadcrumbSchema: [
          { name: 'Home', url: BASE_URL },
          { name: 'Drummer Comparisons', url: `${BASE_URL}/vs` },
          { name: `${drummer1.name} vs ${drummer2.name}`, url: `${BASE_URL}/vs/${slug1}-vs-${slug2}` },
        ],
        faqSchema: [
          {
            question: `What drum kit does ${drummer1.name} use?`,
            answer: `${drummer1.name} (${drummer1.band}) uses ${drummer1.gear?.drums || 'a custom drum kit'}.`,
          },
          {
            question: `What drum kit does ${drummer2.name} use?`,
            answer: `${drummer2.name} (${drummer2.band}) uses ${drummer2.gear?.drums || 'a custom drum kit'}.`,
          },
          {
            question: `What cymbals does ${drummer1.name} use?`,
            answer: `${drummer1.name} uses ${drummer1.gear?.cymbals || 'Zildjian cymbals'}.`,
          },
          {
            question: `What cymbals does ${drummer2.name} use?`,
            answer: `${drummer2.name} uses ${drummer2.gear?.cymbals || 'Zildjian cymbals'}.`,
          },
          {
            question: `How does ${drummer1.name}'s gear compare to ${drummer2.name}?`,
            answer: `${drummer1.name} (${drummer1.band}) plays ${drummer1.gear?.drums || 'a custom drum kit'} with ${drummer1.gear?.cymbals || 'cymbals'}, while ${drummer2.name} (${drummer2.band}) plays ${drummer2.gear?.drums || 'a custom drum kit'} with ${drummer2.gear?.cymbals || 'cymbals'}.`,
          },
        ],
      };
    }
  }

  // /vs hub index — Issue #1348
  if (path === '/vs') {
    return {
      title: `Metal Drummer Gear Comparisons — Side-by-Side Kit & Setup | ${SITE_NAME}`,
      description: 'Compare drum kits and gear setups of 60+ metal legends side by side. Joey Jordison vs Lars Ulrich, George Kollias vs Flo Mounier, and more.',
      image: `${BASE_URL}/images/og/compare-preview.png`,
      type: 'website',
      url: `${BASE_URL}/vs`,
      articleSchema: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Metal Drummer Gear Comparisons',
        description: 'Side-by-side comparisons of drum kits and gear setups for 60+ professional metal drummers',
        url: `${BASE_URL}/vs`,
        publisher: { '@type': 'Organization', name: 'MetalForge', url: BASE_URL },
      }),
      breadcrumbSchema: [
        { name: 'Home', url: BASE_URL },
        { name: 'Drummer Comparisons', url: `${BASE_URL}/vs` },
      ],
    };
  }

  // Tools hub
  if (path === '/tools') {
    return {
      title: `Drummer Tools & Calculators | ${SITE_NAME}`,
      description: 'Free tools for drummers: BPM calculator, kit builder, gear comparison, name generator, and more.',
      image: `${BASE_URL}/images/og/tools-preview.png`,
      type: 'website',
      url: `${BASE_URL}/tools`,
      articleSchema: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollectionPage',
            name: 'Metal Drummer Gear Tools',
            description: 'Free tools for metal drummers: gear search, kit builder, tier list, name generator, and more.',
            url: `${BASE_URL}/tools`,
            publisher: { '@type': 'Organization', name: 'MetalForge', url: BASE_URL },
            hasPart: [
              { '@type': 'WebApplication', name: 'Gear Search', url: `${BASE_URL}/tools/gear-search` },
              { '@type': 'WebApplication', name: 'Dream Set Builder', url: `${BASE_URL}/tools/dream-set-builder` },
              { '@type': 'WebApplication', name: 'Kit Builder', url: `${BASE_URL}/tools/kit-builder` },
              { '@type': 'WebApplication', name: 'Gear Comparison', url: `${BASE_URL}/tools/compare` },
              { '@type': 'WebApplication', name: 'Tier List', url: `${BASE_URL}/tools/tier-list` },
              { '@type': 'WebApplication', name: 'Name Generator', url: `${BASE_URL}/tools/metal-drummer-name-generator` },
            ],
          },
          {
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What free tools does MetalForge offer for drummers?',
                acceptedAnswer: { '@type': 'Answer', text: 'MetalForge offers 6 free tools: Gear Search (find gear by brand or drummer), Dream Set Builder (design your ideal kit), Kit Builder, Gear Comparison, Drummer Tier List, and Metal Drummer Name Generator. All are free at metalforge.io/tools.' },
              },
              {
                '@type': 'Question',
                name: 'How do I compare drummer gear setups online?',
                acceptedAnswer: { '@type': 'Answer', text: "Use MetalForge's Gear Comparison tool at metalforge.io/tools/compare to compare drum kit setups side by side between any two pro metal drummers." },
              },
              {
                '@type': 'Question',
                name: 'Is there a metal drummer name generator?',
                acceptedAnswer: { '@type': 'Answer', text: "Yes — MetalForge's Metal Drummer Name Generator at metalforge.io/tools/metal-drummer-name-generator creates unique metal drummer aliases using genre, style, and influence inputs." },
              },
            ],
          },
        ],
      }),
    };
  }

  // /guides hub index
  if (path === '/guides') {
    return {
      title: `Metal Drumming Guides — Sound Like the Legends & Beginner Tutorials | ${SITE_NAME}`,
      description: 'Step-by-step guides to sound like your favourite metal drummers. Covers kit setup, tuning, technique, and gear selection for beginners and pros.',
      image: `${BASE_URL}/images/og/techniques-preview.png`,
      type: 'website',
      url: `${BASE_URL}/guides`,
      articleSchema: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Metal Drumming Guides',
        description: 'How-to guides and tutorials for metal drummers, covering technique, gear setup, and sound recreation',
        url: `${BASE_URL}/guides`,
        publisher: { '@type': 'Organization', name: 'MetalForge', url: BASE_URL },
      }),
      breadcrumbSchema: [
        { name: 'Home', url: BASE_URL },
        { name: 'Drumming Guides', url: `${BASE_URL}/guides` },
      ],
    };
  }

  // Sound-like guides: /guides/how-to-sound-like-<drummer-slug>
  const soundLikeMatch = path.match(/^\/guides\/(how-to-sound-like-([a-z0-9-]+))$/);
  if (soundLikeMatch) {
    const guideSlug = soundLikeMatch[1];
    const drummerSlug = soundLikeMatch[2];
    const drummer = getDrummerBySlug(drummerSlug);
    const guide = SOUND_LIKE_GUIDES[guideSlug];
    if (drummer) {
      const guideUrl = `${BASE_URL}/guides/${guideSlug}`;
      const howToSchema = guide ? generateGuideSchema(guide) : null;
      return {
        title: `How to Sound Like ${drummer.name} — Drum Gear & Setup Guide | ${SITE_NAME}`,
        description: `Replicate ${drummer.name}'s ${drummer.band} drum sound. Gear list, settings, and technique tips to get that signature tone.`,
        type: 'article',
        url: guideUrl,
        articleSchema: howToSchema ? JSON.stringify(howToSchema) : null,
        // Issue #2202: FAQPage schema alongside HowTo for AI Overview + voice search unlock.
        faqSchema: guide?.faq?.length ? guide.faq : null,
        breadcrumbSchema: [
          { name: 'Home', url: BASE_URL },
          { name: 'Guides', url: `${BASE_URL}/guides` },
          { name: `How to Sound Like ${drummer.name}`, url: guideUrl },
        ],
      };
    }
  }

  // Budget guide — $500
  if (path === '/guides/budget-metal-drum-setup-500') {
    return {
      title: `Budget Metal Drum Setup Under $500 — Full Guide | ${SITE_NAME}`,
      description: 'Complete guide to building a metal-ready drum kit for under $500. Best budget shells, cymbals, hardware, and pedals for beginner metal drummers.',
      type: 'article',
      url: `${BASE_URL}/guides/budget-metal-drum-setup-500`,
    };
  }
  // Budget guide — $1000
  if (path === '/guides/budget-metal-drum-setup-1000') {
    return {
      title: `Best Metal Drum Setup Under $1000 — Buyer's Guide | ${SITE_NAME}`,
      description: 'Step up your rig: best mid-range metal drum kits, cymbals, and double-kick pedals for under $1000. Gear the pros recommend for serious beginners.',
      type: 'article',
      url: `${BASE_URL}/guides/budget-metal-drum-setup-1000`,
    };
  }
  // Budget guide — $2000
  if (path === '/guides/budget-metal-drum-setup-2000') {
    return {
      title: `Best Metal Drum Setup Under $2000 — Pro-Level Picks | ${SITE_NAME}`,
      description: 'Semi-pro metal kit for under $2000: Tama, Pearl, DW shells, Meinl/Zildjian cymbals, Iron Cobra pedals. The sweet spot before endorsement-level gear.',
      type: 'article',
      url: `${BASE_URL}/guides/budget-metal-drum-setup-2000`,
    };
  }

  // Beginner/genre gear guides and other /guides/<slug> pages
  const guidesMatch = path.match(/^\/guides\/([a-z0-9-]+)$/);
  if (guidesMatch) {
    const slug = guidesMatch[1];
    // Issue #1794: genre gear guide pages — emit keyword-matched title + Article + FAQPage JSON-LD
    const genreGuide = GENRE_GEAR_GUIDES[slug];
    if (genreGuide) {
      return {
        title: genreGuide.metaTitle,
        description: genreGuide.description,
        image: `${BASE_URL}${genreGuide.ogImage}`,
        type: 'article',
        url: `${BASE_URL}/guides/${genreGuide.slug}`,
        articleSchema: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Article',
              headline: genreGuide.title,
              description: genreGuide.description,
              author: { '@type': 'Organization', name: genreGuide.author || 'MetalForge Editorial' },
              datePublished: genreGuide.datePublished,
              dateModified: genreGuide.dateModified,
              publisher: { '@type': 'Organization', name: SITE_NAME, url: BASE_URL },
              keywords: (genreGuide.seoKeywords || []).join(', '),
            },
            ...(genreGuide.faq ? [{
              '@type': 'FAQPage',
              mainEntity: genreGuide.faq.map(q => ({
                '@type': 'Question',
                name: q.question,
                acceptedAnswer: { '@type': 'Answer', text: q.answer },
              })),
            }] : []),
          ],
        }),
        breadcrumbSchema: [
          { name: 'Home', url: BASE_URL },
          { name: 'Guides', url: `${BASE_URL}/guides` },
          { name: genreGuide.title, url: `${BASE_URL}/guides/${genreGuide.slug}` },
        ],
        faqSchema: genreGuide.faq || null,
      };
    }
    return {
      title: `Metal Drumming Guide | ${SITE_NAME}`,
      description: 'Essential guide for metal drummers covering gear, technique, and setup.',
      type: 'article',
      url: `${BASE_URL}/guides/${slug}`,
    };
  }

  // Beginner guide (legacy path)
  if (path === '/beginner-guide') {
    return {
      title: `Metal Drumming Beginner's Guide | ${SITE_NAME}`,
      description: 'Start your metal drumming journey! Essential gear recommendations, technique basics, and tips from legendary drummers.',
      image: `${BASE_URL}/images/og/beginner-guide-preview.png`,
      type: 'article',
      url: `${BASE_URL}/beginner-guide`,
    };
  }

  // Gear hub
  if (path === '/gear') {
    return {
      title: `Pro Metal Drum Gear — Kits, Cymbals & Equipment | ${SITE_NAME}`,
      description: 'Browse drum gear used by 60+ metal legends. Shop cymbals, kits, snares, pedals, sticks, and hardware — filtered by genre, brand, and price.',
      image: DEFAULT_IMAGE,
      type: 'website',
      url: `${BASE_URL}/gear`,
    };
  }

  // Issue #1823: Gear by budget hub — budget-tiered shopping experience
  if (path === '/gear-by-budget') {
    return {
      title: `Metal Drum Kit by Budget — Best Setups Under $500, $1000, $2000 | ${SITE_NAME}`,
      description: 'Find the perfect metal drum kit for your budget. Browse professional-grade setups under $500, $1000, and $2000 — curated from gear used by 60+ pro metal drummers.',
      image: DEFAULT_IMAGE,
      type: 'website',
      url: `${BASE_URL}/gear-by-budget`,
      articleSchema: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Metal Drum Kits by Budget',
        description: 'Budget-tiered metal drum kit recommendations based on what 60+ pro metal drummers use.',
        url: `${BASE_URL}/gear-by-budget`,
        publisher: { '@type': 'Organization', name: 'MetalForge', url: BASE_URL },
      }),
    };
  }

  // Gear news
  if (path === '/gear-news') {
    return {
      title: `Metal Drum Gear News & Updates | ${SITE_NAME}`,
      description: 'Latest news about metal drumming gear: new product releases, artist announcements, and industry updates.',
      image: `${BASE_URL}/images/og/news-preview.png`,
      type: 'website',
      url: `${BASE_URL}/gear-news`,
      articleSchema: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Metal Drum Gear News & Updates',
        description: 'Latest news about metal drumming gear: new product releases, artist announcements, and industry updates.',
        url: `${BASE_URL}/gear-news`,
        publisher: { '@type': 'Organization', name: 'MetalForge', url: BASE_URL },
        about: { '@type': 'Thing', name: 'Drum Gear News' },
        potentialAction: {
          '@type': 'ReadAction',
          target: `${BASE_URL}/gear-news`,
        },
      }),
    };
  }

  // Cards gallery
  if (path === '/cards') {
    return {
      title: `Drummer Gear Cards Gallery | ${SITE_NAME}`,
      description: 'Beautiful shareable gear cards for every drummer. Download and share on Instagram, Twitter, and more!',
      image: `${BASE_URL}/images/og/cards-preview.png`,
      type: 'website',
      url: `${BASE_URL}/cards`,
    };
  }

  // Techniques
  if (path === '/techniques') {
    return {
      title: `Metal Drumming Techniques — Master the Skills | ${SITE_NAME}`,
      description: 'Learn essential metal drumming techniques: blast beats, double bass, polyrhythms, and more.',
      image: `${BASE_URL}/images/og/techniques-preview.png`,
      type: 'website',
      url: `${BASE_URL}/techniques`,
      articleSchema: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Metal Drumming Techniques',
        description: 'Complete guide to metal drumming techniques: blast beats, double bass, gravity blast, polyrhythms, and more.',
        url: `${BASE_URL}/techniques`,
        publisher: { '@type': 'Organization', name: 'MetalForge', url: BASE_URL },
        hasPart: getAllTechniques().map(t => ({
          '@type': 'Article',
          name: t.title,
          url: `${BASE_URL}/technique/${t.slug}`,
        })),
      }),
      breadcrumbSchema: [
        { name: 'Home', url: BASE_URL },
        { name: 'Techniques', url: `${BASE_URL}/techniques` },
      ],
    };
  }

  // Issue #1202: Individual technique page: /technique/<slug>
  if (path.startsWith('/technique/') && !path.endsWith('/drummers')) {
    const slug = path.replace('/technique/', '');
    const technique = getTechniqueBySlug(slug);
    if (technique) {
      return {
        title: `${technique.title} — Metal Drumming Technique | ${SITE_NAME}`,
        description: truncate(`Learn ${technique.title.toLowerCase()} in metal drumming: ${technique.description}. See who plays it and how.`, 160),
        image: `${BASE_URL}/images/og/techniques-preview.png`,
        type: 'article',
        url: `${BASE_URL}/technique/${slug}`,
        articleSchema: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Article',
              headline: `${technique.title} — Metal Drumming Technique`,
              description: truncate(technique.description, 250),
              url: `${BASE_URL}/technique/${slug}`,
              publisher: { '@type': 'Organization', name: 'MetalForge', url: BASE_URL },
            },
            {
              '@type': 'DefinedTerm',
              '@id': `${BASE_URL}/technique/${slug}#term`,
              name: technique.title,
              description: truncate(technique.description, 250),
              url: `${BASE_URL}/technique/${slug}`,
              inDefinedTermSet: {
                '@type': 'DefinedTermSet',
                '@id': `${BASE_URL}/techniques#termset`,
                name: 'Metal Drumming Techniques Glossary',
                url: `${BASE_URL}/techniques`,
              },
            },
          ],
        }),
        breadcrumbSchema: [
          { name: 'Home', url: BASE_URL },
          { name: 'Techniques', url: `${BASE_URL}/techniques` },
          { name: technique.title, url: `${BASE_URL}/technique/${slug}` },
        ],
      };
    }
  }

  // Issue #1202: Technique drummers page: /technique/<slug>/drummers
  if (path.startsWith('/technique/') && path.endsWith('/drummers')) {
    const slug = path.replace('/technique/', '').replace('/drummers', '');
    const technique = getTechniqueBySlug(slug);
    if (technique) {
      const techniqueDesc = technique.description || `${technique.title} is a metal drumming technique used by many legendary metal drummers.`;
      return {
        title: `Best ${technique.title} Drummers — Who Plays It | ${SITE_NAME}`,
        description: truncate(`Discover which pro metal drummers use ${technique.title.toLowerCase()}. Gear setups, videos, and tutorials for ${technique.title.toLowerCase()} players.`, 160),
        image: `${BASE_URL}/images/og/techniques-preview.png`,
        type: 'website',
        url: `${BASE_URL}/technique/${slug}/drummers`,
        articleSchema: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${technique.title} Drummers`,
          description: `Pro metal drummers who use ${technique.title.toLowerCase()}`,
          url: `${BASE_URL}/technique/${slug}/drummers`,
          publisher: { '@type': 'Organization', name: 'MetalForge', url: BASE_URL },
        }),
        breadcrumbSchema: [
          { name: 'Home', url: BASE_URL },
          { name: 'Techniques', url: `${BASE_URL}/techniques` },
          { name: technique.title, url: `${BASE_URL}/technique/${slug}` },
          { name: 'Drummers', url: `${BASE_URL}/technique/${slug}/drummers` },
        ],
        // Issue #1310: FAQPage JSON-LD for PAA box eligibility on technique pages
        faqSchema: [
          {
            question: `What is ${technique.title}?`,
            answer: techniqueDesc,
          },
          {
            question: `Which metal drummers are best known for ${technique.title}?`,
            answer: `See the complete list of metal drummers known for ${technique.title} on MetalForge, including gear setups and performance videos.`,
          },
          {
            question: `What gear do you need for ${technique.title}?`,
            answer: `The gear requirements for ${technique.title} vary by drummer. Browse MetalForge for complete kit specs from pros who use this technique.`,
          },
        ],
      };
    }
  }

  // Issue #1410: /tools/compare hub
  if (path === '/tools/compare') {
    return {
      title: `Metal Drummer Gear Comparison Tool | ${SITE_NAME}`,
      description: "Compare any two metal drummers' gear side-by-side: kits, cymbals, pedals, sticks. See exactly how your favourite rigs stack up.",
      image: `${BASE_URL}/images/og/compare-preview.png`,
      type: 'website',
      url: `${BASE_URL}/tools/compare`,
      articleSchema: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Metal Drummer Gear Comparison Tool',
        description: 'Compare any two metal drummers gear side-by-side: kits, cymbals, pedals, sticks.',
        url: `${BASE_URL}/tools/compare`,
        publisher: { '@type': 'Organization', name: 'MetalForge', url: BASE_URL },
      }),
      faqSchema: [
        { question: 'How can I compare two metal drummers gear?', answer: 'Use MetalForge Compare Tool at /tools/compare — select any two of 60+ metal drummers to see their kits, cymbals, pedals, and hardware side-by-side with full spec breakdowns.' },
        { question: 'Who has a bigger drum kit, Lars Ulrich or Joey Jordison?', answer: 'Compare Lars Ulrich vs Joey Jordison on MetalForge. Both use large format kits with double bass; see the complete side-by-side on /tools/compare/lars-ulrich-vs-joey-jordison.' },
        { question: 'Which metal drummer uses more cymbals?', answer: 'Mike Portnoy and Danny Carey are known for having the largest cymbal configurations among metal drummers. Compare any two drummers cymbal setups on MetalForge.' },
      ],
    };
  }

  // Issue #1410: /tools/compare/<d1>-vs-<d2> individual comparison pages
  const toolsCompareMatch = path.match(/^\/tools\/compare\/([a-z0-9-]+)-vs-([a-z0-9-]+)$/);
  if (toolsCompareMatch) {
    const [, slug1, slug2] = toolsCompareMatch;
    const d1 = getDrummerBySlug(slug1);
    const d2 = getDrummerBySlug(slug2);
    if (d1 && d2) {
      return {
        title: `${d1.name} vs ${d2.name} — Drum Gear Comparison | ${SITE_NAME}`,
        description: `Side-by-side gear: ${d1.name} (${d1.band}) vs ${d2.name} (${d2.band}). Kits, cymbals, pedals, sticks — compare specs and prices.`,
        image: `${BASE_URL}/api/og/compare?d1=${slug1}&d2=${slug2}`,
        type: 'article',
        url: `${BASE_URL}/tools/compare/${slug1}-vs-${slug2}`,
        breadcrumbSchema: [
          { name: 'Home', url: BASE_URL },
          { name: 'Compare Tool', url: `${BASE_URL}/tools/compare` },
          { name: `${d1.name} vs ${d2.name}`, url: `${BASE_URL}/tools/compare/${slug1}-vs-${slug2}` },
        ],
        faqSchema: [
          { question: `What drum kit does ${d1.name} use?`, answer: `${d1.name} uses ${d1.gear?.drums || 'a custom drum kit'} with ${d1.gear?.cymbals || 'cymbal setup'}.` },
          { question: `What drum kit does ${d2.name} use?`, answer: `${d2.name} uses ${d2.gear?.drums || 'a custom drum kit'} with ${d2.gear?.cymbals || 'cymbal setup'}.` },
          { question: `Which is better, ${d1.name} or ${d2.name}?`, answer: `Both ${d1.name} (${d1.band}) and ${d2.name} (${d2.band}) are legendary metal drummers. Compare their complete gear setups on MetalForge.` },
        ],
      };
    }
  }

  // Individual gear comparison pages (tama-vs-pearl, meinl-vs-zildjian, etc.)
  // Issue #1664: FAQPage + Article JSON-LD for AI Overview eligibility
  const gearCompareMatch = path.match(/^\/compare\/([a-z0-9-]+)$/);
  if (gearCompareMatch) {
    const slug = gearCompareMatch[1];
    const [brand1, brand2] = slug.split('-vs-').map(b =>
      b.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    );
    const title = `${brand1} vs ${brand2}`;
    return {
      title: `${title} — Drum Gear Comparison | ${SITE_NAME}`,
      description: `Compare ${title} for metal drumming: specs, pro endorsements, price points, and which metal legends use each. Side-by-side gear breakdown.`,
      image: DEFAULT_IMAGE,
      type: 'article',
      url: `${BASE_URL}/compare/${slug}`,
      breadcrumbSchema: [
        { name: 'Home', url: BASE_URL },
        { name: 'Compare', url: `${BASE_URL}/compare` },
        { name: title, url: `${BASE_URL}/compare/${slug}` },
      ],
      articleSchema: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Article',
            headline: `${brand1} vs ${brand2} — Drum Gear Comparison`,
            description: `Side-by-side comparison of ${brand1} and ${brand2} for metal drumming.`,
            url: `${BASE_URL}/compare/${slug}`,
            publisher: { '@type': 'Organization', name: 'MetalForge', url: BASE_URL },
            author: { '@type': 'Organization', name: 'MetalForge' },
            about: [
              { '@type': 'Product', name: brand1 },
              { '@type': 'Product', name: brand2 },
            ],
          },
          {
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: `Is ${brand1} or ${brand2} better for metal drumming?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `Both ${brand1} and ${brand2} are used by professional metal drummers. The choice depends on playing style, budget, and personal preference. See our full comparison at metalforge.io/compare/${slug}.`,
                },
              },
              {
                '@type': 'Question',
                name: `Which pro metal drummers use ${brand1} vs ${brand2}?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `Many top metal drummers prefer ${brand1} while others choose ${brand2}. MetalForge tracks gear used by 60+ pro metal drummers — see the full breakdown at metalforge.io/compare/${slug}.`,
                },
              },
              {
                '@type': 'Question',
                name: `What is the price difference between ${brand1} and ${brand2}?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `Prices vary by product line and configuration. MetalForge's ${brand1} vs ${brand2} comparison page shows current pricing and pro-endorsed models side by side.`,
                },
              },
            ],
          },
        ],
      }),
    };
  }

  // Compare page
  if (path === '/compare') {
    return {
      title: `Drummer Gear Comparison Tool | ${SITE_NAME}`,
      description: 'Compare drum setups side-by-side. See how your favorite metal drummers\' gear stacks up.',
      image: `${BASE_URL}/images/og/compare-preview.png`,
      type: 'website',
      url: `${BASE_URL}/compare`,
    };
  }

  // Signature Licks - Issue #799
  if (path === '/signature-licks' || path === '/tools/signature-licks') {
    return {
      title: `Metal Drummer Signature Licks — Learn Iconic Drum Patterns | ${SITE_NAME}`,
      description: 'Learn the signature drum patterns and fills that define metal\'s greatest drummers. From blast beats to groove fills, master the licks that made them legends.',
      image: `${BASE_URL}/images/og/signature-licks-preview.png`,
      type: 'website',
      url: `${BASE_URL}/signature-licks`,
    };
  }

  // Kit Quiz - Issue #799
  if (path === '/kit-quiz') {
    return {
      title: `Which Metal Drummer Kit Matches Your Style? | ${SITE_NAME}`,
      description: 'Take our quiz to find the perfect drum kit for your playing style. Get personalized recommendations based on your preferences and budget.',
      image: `${BASE_URL}/og-quiz.png`,
      type: 'website',
      url: `${BASE_URL}/kit-quiz`,
      articleSchema: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Metal Drummer Kit Style Quiz',
        applicationCategory: 'GameApplication',
        url: `${BASE_URL}/kit-quiz`,
        operatingSystem: 'Any',
      }),
    };
  }

  // Kit Builder - Issue #799
  if (path === '/kit-builder' || path.startsWith('/tools/kit-builder')) {
    return {
      title: `Virtual Drum Kit Builder — Design Your Dream Setup | ${SITE_NAME}`,
      description: 'Build your dream metal drum kit piece by piece. Mix and match shells, cymbals, and hardware from legendary drummers. Get price estimates and affiliate links.',
      image: `${BASE_URL}/images/og/kit-builder-preview.png`,
      type: 'website',
      url: `${BASE_URL}/kit-builder`,
    };
  }

  // Gear Search - Issue #1350
  if (path === '/tools/gear-search' || path === '/tools/gear-finder') {
    return {
      title: `Metal Drummer Gear Search — Find Drums & Cymbals by Spec | ${SITE_NAME}`,
      description: 'Search and filter drum gear used by 60+ metal legends. Find kits, cymbals, pedals, and sticks by brand, price, or drummer.',
      type: 'website',
      url: `${BASE_URL}/tools/gear-search`,
      articleSchema: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Metal Drummer Gear Search',
        applicationCategory: 'UtilitiesApplication',
        url: `${BASE_URL}/tools/gear-search`,
        operatingSystem: 'Any',
      }),
    };
  }

  // Dream Set Builder - Issue #1350
  if (path === '/tools/dream-set-builder') {
    return {
      title: `Dream Metal Drum Kit Builder — Mix Gear from the Legends | ${SITE_NAME}`,
      description: 'Build your ultimate metal drum kit by combining gear from your favourite drummers. Mix Lars Ulrich shells with George Kollias cymbals.',
      type: 'website',
      url: `${BASE_URL}/tools/dream-set-builder`,
      articleSchema: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Dream Metal Drum Set Builder',
        applicationCategory: 'UtilitiesApplication',
        url: `${BASE_URL}/tools/dream-set-builder`,
      }),
    };
  }

  // Tier List - Issue #1350
  if (path === '/tools/tier-list') {
    return {
      title: `Metal Drummer Tier List — Rank the Greatest of All Time | ${SITE_NAME}`,
      description: 'Create your own metal drummer tier list. Rank legends like Joey Jordison, Dave Lombardo, and George Kollias from S to D tier.',
      type: 'website',
      url: `${BASE_URL}/tools/tier-list`,
      articleSchema: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Metal Drummer Tier List',
        applicationCategory: 'GameApplication',
        url: `${BASE_URL}/tools/tier-list`,
        operatingSystem: 'Any',
        description: 'Create your own metal drummer tier list ranking S to D tier.',
      }),
    };
  }

  // Name Generator - Issue #1350
  if (path.startsWith('/tools/name-generator') || path === '/tools/metal-drummer-name-generator') {
    return {
      title: `Metal Drummer Name Generator — Create Your Drummer Alias | ${SITE_NAME}`,
      description: 'Generate an epic metal drummer name in seconds. Perfect for band projects, gaming aliases, or just for fun.',
      type: 'website',
      url: `${BASE_URL}/tools/name-generator`,
      articleSchema: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Metal Drummer Name Generator',
        applicationCategory: 'UtilitiesApplication',
        url: `${BASE_URL}/tools/name-generator`,
        operatingSystem: 'Any',
      }),
    };
  }

  // Guess the Kit - Issue #799
  if (path === '/guess-the-kit') {
    return {
      title: `Guess the Kit — Metal Drummer Trivia Game | ${SITE_NAME}`,
      description: 'Test your metal gear knowledge! Can you identify which legendary drummer owns this kit? Daily challenges with shareable results.',
      image: `${BASE_URL}/images/og/guess-the-kit-preview.png`,
      type: 'website',
      url: `${BASE_URL}/guess-the-kit`,
      articleSchema: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Guess the Kit — Metal Drummer Trivia Game',
        applicationCategory: 'GameApplication',
        url: `${BASE_URL}/guess-the-kit`,
        operatingSystem: 'Any',
      }),
    };
  }

  // Birthdays Calendar - Issue #799
  if (path === '/birthdays') {
    return {
      title: `Metal Drummer Birthday Calendar | ${SITE_NAME}`,
      description: 'Never miss a metal drummer birthday! Browse our complete calendar of legendary drummers\' birthdays. Share and celebrate with the metal community.',
      image: `${BASE_URL}/images/og/birthdays-preview.png`,
      type: 'website',
      url: `${BASE_URL}/birthdays`,
      articleSchema: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Metal Drummer Birthday Calendar',
        description: 'Complete calendar of legendary metal drummer birthdays.',
        url: `${BASE_URL}/birthdays`,
        mainEntity: {
          '@type': 'ItemList',
          name: 'Metal Drummer Birthdays',
          description: 'Birthdays of 60+ professional metal drummers',
          numberOfItems: 61,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@type': 'Person',
                name: 'Lars Ulrich',
                birthDate: '1963-12-26',
                url: `${BASE_URL}/drummers/lars-ulrich`,
                memberOf: { '@type': 'MusicGroup', name: 'Metallica' },
              },
            },
            {
              '@type': 'ListItem',
              position: 2,
              item: {
                '@type': 'Person',
                name: 'Joey Jordison',
                birthDate: '1975-04-26',
                url: `${BASE_URL}/drummers/joey-jordison`,
                memberOf: { '@type': 'MusicGroup', name: 'Slipknot' },
              },
            },
            {
              '@type': 'ListItem',
              position: 3,
              item: {
                '@type': 'Person',
                name: 'Dave Lombardo',
                birthDate: '1965-02-16',
                url: `${BASE_URL}/drummers/dave-lombardo`,
                memberOf: { '@type': 'MusicGroup', name: 'Slayer' },
              },
            },
            {
              '@type': 'ListItem',
              position: 4,
              item: {
                '@type': 'Person',
                name: 'Gene Hoglan',
                birthDate: '1967-09-26',
                url: `${BASE_URL}/drummers/gene-hoglan`,
                memberOf: { '@type': 'MusicGroup', name: 'Death' },
              },
            },
            {
              '@type': 'ListItem',
              position: 5,
              item: {
                '@type': 'Person',
                name: 'Danny Carey',
                birthDate: '1961-05-10',
                url: `${BASE_URL}/drummers/danny-carey`,
                memberOf: { '@type': 'MusicGroup', name: 'Tool' },
              },
            },
            {
              '@type': 'ListItem',
              position: 6,
              item: {
                '@type': 'Person',
                name: 'Mike Portnoy',
                birthDate: '1967-04-20',
                url: `${BASE_URL}/drummers/mike-portnoy`,
                memberOf: { '@type': 'MusicGroup', name: 'Dream Theater' },
              },
            },
            {
              '@type': 'ListItem',
              position: 7,
              item: {
                '@type': 'Person',
                name: 'Charlie Benante',
                birthDate: '1962-11-27',
                url: `${BASE_URL}/drummers/charlie-benante`,
                memberOf: { '@type': 'MusicGroup', name: 'Anthrax' },
              },
            },
            {
              '@type': 'ListItem',
              position: 8,
              item: {
                '@type': 'Person',
                name: 'Vinnie Paul',
                birthDate: '1964-03-11',
                url: `${BASE_URL}/drummers/vinnie-paul`,
                memberOf: { '@type': 'MusicGroup', name: 'Pantera' },
              },
            },
            {
              '@type': 'ListItem',
              position: 9,
              item: {
                '@type': 'Person',
                name: 'Inferno',
                birthDate: '1978-08-14',
                url: `${BASE_URL}/drummers/inferno`,
                memberOf: { '@type': 'MusicGroup', name: 'Behemoth' },
              },
            },
            {
              '@type': 'ListItem',
              position: 10,
              item: {
                '@type': 'Person',
                name: 'George Kollias',
                birthDate: '1977-10-17',
                url: `${BASE_URL}/drummers/george-kollias`,
                memberOf: { '@type': 'MusicGroup', name: 'Nile' },
              },
            },
          ],
        },
      }),
    };
  }

  // Articles pages (Issue #777: Add Article schema to content articles)
  const articlesMatch = path.match(/^\/articles\/([a-z0-9-]+)$/);
  if (articlesMatch) {
    const [, articleSlug] = articlesMatch;
    const articleMeta = ARTICLE_METADATA[articleSlug];
    
    if (articleMeta) {
      return {
        title: `${articleMeta.headline} | ${SITE_NAME}`,
        description: articleMeta.description,
        image: articleMeta.image || DEFAULT_IMAGE,
        type: 'article',
        url: `${BASE_URL}/articles/${articleSlug}`,
        // Article schema data for JSON-LD
        articleSchema: {
          headline: articleMeta.headline,
          description: articleMeta.description,
          author: articleMeta.author,
          datePublished: articleMeta.datePublished,
          dateModified: articleMeta.dateModified,
          image: articleMeta.image,
          articleSection: articleMeta.articleSection,
          keywords: articleMeta.keywords,
        },
        breadcrumbSchema: [
          { name: 'Home', url: BASE_URL },
          { name: 'Articles', url: `${BASE_URL}/articles` },
          { name: articleMeta.headline, url: `${BASE_URL}/articles/${articleSlug}` },
        ],
        speakableSchema: true,
      };
    }

    // Issue #1064: derive unique title + description + Article schema from the 60
    // ALBUM_ARTICLES entries. ARTICLE_METADATA above wins on conflict (hand-tuned
    // overrides); this only fires for slugs not in that 8-entry map.
    const album = ALBUM_ARTICLES[articleSlug];
    if (album) {
      const keywords = Array.isArray(album.seoKeywords)
        ? album.seoKeywords
        : (album.seoKeywords ? [album.seoKeywords] : []);

      // Issue #1404: HowTo tutorial articles — emit HowTo JSON-LD for AI Overview eligibility
      if (album.articleSection === 'HowTo' && Array.isArray(album.howToSteps)) {
        const howToSchema = JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: album.title,
          description: album.description,
          totalTime: album.totalTime || 'PT30M',
          step: album.howToSteps.map((s, i) => ({
            '@type': 'HowToStep',
            position: i + 1,
            name: s.name,
            text: s.text,
          })),
        });
        // Build SSR crawler-visible links to referenced drummer profiles
        const ssrDrummerProfileLinks = Array.isArray(album.relatedDrummers)
          ? album.relatedDrummers
              .map(id => drummers.find(d => d.id === id))
              .filter(Boolean)
              .map(d => ({
                href: `/drummer/${d.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`,
                label: `${d.name} — Complete Gear Setup`,
              }))
          : null;
        return {
          title: `${album.title} | ${SITE_NAME}`,
          description: truncate(album.description, 160),
          image: album.ogImage || DEFAULT_IMAGE,
          type: 'article',
          url: `${BASE_URL}/articles/${articleSlug}`,
          articleSchema: howToSchema,
          breadcrumbSchema: [
            { name: 'Home', url: BASE_URL },
            { name: 'Articles', url: `${BASE_URL}/articles` },
            { name: album.title, url: `${BASE_URL}/articles/${articleSlug}` },
          ],
          faqSchema: Array.isArray(album.faq) && album.faq.length > 0 ? album.faq : null,
          ssrLinks: ssrDrummerProfileLinks && ssrDrummerProfileLinks.length > 0 ? ssrDrummerProfileLinks : null,
          speakableSchema: true,
        };
      }

      return {
        title: `${album.title} | ${SITE_NAME}`,
        description: truncate(album.description, 160),
        image: album.ogImage || DEFAULT_IMAGE,
        type: 'article',
        url: `${BASE_URL}/articles/${articleSlug}`,
        articleSchema: {
          headline: album.title,
          description: album.description,
          author: album.author || 'MetalForge Editorial',
          datePublished: album.datePublished,
          dateModified: album.dateModified || album.datePublished,
          image: album.ogImage || DEFAULT_IMAGE,
          articleSection: album.genre ? `${album.genre} Drumming` : 'Drummer Gear',
          keywords,
          about: (() => {
            const entities = [];
            if (album.relatedDrummerSlug) {
              entities.push({
                '@type': 'Person',
                name: album.drummer || album.relatedDrummerSlug,
                url: `${BASE_URL}/drummer/${album.relatedDrummerSlug}`,
                sameAs: `https://en.wikipedia.org/wiki/${encodeURIComponent((album.drummer || '').replace(/ /g, '_'))}`,
              });
            }
            if (album.albumTitle) {
              const bandName = album.artist || album.band;
              if (bandName) {
                entities.push({
                  '@type': 'MusicAlbum',
                  name: album.albumTitle,
                  byArtist: { '@type': 'MusicGroup', name: bandName },
                });
              }
            }
            return entities.length > 0 ? entities : undefined;
          })(),
          mentions: album.band ? [{ '@type': 'MusicGroup', name: album.band }] : undefined,
        },
        breadcrumbSchema: [
          { name: 'Home', url: BASE_URL },
          { name: 'Articles', url: `${BASE_URL}/articles` },
          { name: album.title, url: `${BASE_URL}/articles/${articleSlug}` },
        ],
        faqSchema: Array.isArray(album.faq) && album.faq.length > 0 ? album.faq : null,
        // Issue #1585: emit crawler-visible links to lick pages when relatedLicks is present
        ssrLinks: Array.isArray(album.relatedLicks) && album.relatedLicks.length > 0
          ? album.relatedLicks.map(l => ({
              href: `/drummers/${l.drummerSlug}/licks/${l.lickSlug}`,
              label: l.label,
            }))
          : null,
        speakableSchema: true,
      };
    }

    // Fallback for unknown articles
    return {
      title: `Drum Gear Article | ${SITE_NAME}`,
      description: 'Explore detailed drum gear breakdowns, album recording techniques, and drummer equipment analysis.',
      image: DEFAULT_IMAGE,
      type: 'article',
      url: `${BASE_URL}/articles/${articleSlug}`,
    };
  }

  // Articles hub — Issue #1324: CollectionPage+ItemList schema
  if (path === '/articles') {
    return {
      title: `Drum Gear Articles & Guides | ${SITE_NAME}`,
      description: 'In-depth articles about metal drummer gear, album recording setups, and equipment breakdowns.',
      image: DEFAULT_IMAGE,
      type: 'website',
      url: `${BASE_URL}/articles`,
      articleSchema: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Metal Drummer Gear Articles & Guides',
        description: 'In-depth articles about metal drummer gear, album recording setups, and equipment breakdowns.',
        url: `${BASE_URL}/articles`,
        publisher: { '@type': 'Organization', name: 'MetalForge', url: BASE_URL },
        hasPart: Object.values(ALBUM_ARTICLES).slice(0, 20).map(a => ({
          '@type': 'Article',
          headline: a.title,
          url: `${BASE_URL}/articles/${a.slug}`,
        })),
      }),
    };
  }

  // Issue #1172: /bands/<slug> — band-specific SSR title + description
  // Issue #1307: FAQPage JSON-LD for band pages
  // Issue #1396: MusicGroup + BreadcrumbList JSON-LD for all 19 /bands/<slug> pages
  const bandMatch = path.match(/^\/bands\/([a-z0-9-]+)$/);
  if (bandMatch) {
    const band = BAND_DATA[bandMatch[1]];
    if (band) {
      const drummerMember = band.members?.find(m => /drum/i.test(m.role));
      const drummerName = drummerMember?.name;
      const faqItems = [
        ...(drummerName ? [{
          question: `Who is the drummer for ${band.name}?`,
          answer: `The drummer for ${band.name} is ${drummerName}. Visit MetalForge for their complete gear breakdown.`,
        }] : []),
        {
          question: `What drum kit does ${band.name}'s drummer use?`,
          answer: `See the complete drum gear setup for ${band.name}'s drummer at MetalForge, including kit, cymbals, pedals, and sticks.`,
        },
        {
          question: `What genre is ${band.name}?`,
          answer: `${band.name} plays ${band.genres?.join(', ') || 'metal'}.`,
        },
      ];
      const slug = bandMatch[1];
      return {
        title: band.metaTitle || `${band.name} — Drummer, Drum Kit & Gear | ${SITE_NAME}`,
        description: truncate(
          band.metaDescription ||
            `${band.name}${drummerName ? ` drummer ${drummerName}` : ''}: full lineup, drum gear, and discography. ${band.genres?.join(', ') || 'Metal'} band breakdown.`,
          160
        ),
        image: DEFAULT_IMAGE,
        type: 'profile',
        url: `${BASE_URL}/bands/${slug}`,
        articleSchema: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'MusicGroup',
          name: band.name,
          url: `${BASE_URL}/bands/${slug}`,
          genre: band.genres || [],
          member: (band.members
            ? band.members.map(m => ({
                '@type': 'OrganizationRole',
                member: { '@type': 'Person', name: m.name },
                roleName: m.role,
              }))
            : (band.drummerHistory || []).map(h => ({
                '@type': 'OrganizationRole',
                member: { '@type': 'Person', name: drummerSlugToName[h.drummer] || h.drummer },
                roleName: 'Drums',
              }))
          ),
          ...(band.sameAs && band.sameAs.length ? { sameAs: band.sameAs } : {}),
        }),
        breadcrumbSchema: [
          { name: 'Home', url: BASE_URL },
          { name: 'Bands', url: `${BASE_URL}/bands` },
          { name: band.name, url: `${BASE_URL}/bands/${slug}` },
        ],
        faqSchema: faqItems,
      };
    }
  }

  // Issue #1172: /bands index
  if (path === '/bands') {
    return {
      title: `Metal Bands & Their Drummers | ${SITE_NAME}`,
      description: 'Browse metal bands and the drummers behind them — lineups, drum gear, and discographies.',
      image: DEFAULT_IMAGE,
      type: 'website',
      url: `${BASE_URL}/bands`,
      articleSchema: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Metal Bands & Their Drummers',
        description: 'Browse metal bands and the drummers behind them — lineups, drum gear, and discographies.',
        url: `${BASE_URL}/bands`,
        publisher: { '@type': 'Organization', name: 'MetalForge', url: BASE_URL },
        hasPart: Object.values(BAND_DATA).map(b => ({
          '@type': 'MusicGroup',
          name: b.name,
          url: `${BASE_URL}/bands/${b.slug}`,
        })),
      }),
      breadcrumbSchema: [
        { name: 'Home', url: BASE_URL },
        { name: 'Bands', url: `${BASE_URL}/bands` },
      ],
    };
  }

  // Issue #1408: /brands hub
  if (path === '/brands') {
    return {
      title: `Metal Drum & Cymbal Brands Used by Pro Drummers | ${SITE_NAME}`,
      description: 'Browse drum and cymbal brands used by 60+ metal legends. Tama, Pearl, DW, Zildjian, Paiste, Meinl, Sabian — see which pros endorse each brand.',
      image: DEFAULT_IMAGE,
      type: 'website',
      url: `${BASE_URL}/brands`,
      breadcrumbSchema: [
        { name: 'Home', url: BASE_URL },
        { name: 'Gear Brands', url: `${BASE_URL}/brands` },
      ],
    };
  }

  // Issue #1408: /brands/<slug> individual brand pages
  const BRAND_META = {
    tama: { name: 'Tama', type: 'drums' },
    pearl: { name: 'Pearl', type: 'drums' },
    dw: { name: 'DW (Drum Workshop)', type: 'drums' },
    ludwig: { name: 'Ludwig', type: 'drums' },
    zildjian: { name: 'Zildjian', type: 'cymbals' },
    paiste: { name: 'Paiste', type: 'cymbals' },
    meinl: { name: 'Meinl', type: 'cymbals' },
    sabian: { name: 'Sabian', type: 'cymbals' },
  };
  const brandPageMatch = path.match(/^\/brands\/([a-z0-9-]+)$/);
  if (brandPageMatch) {
    const brandSlug = brandPageMatch[1];
    const brand = BRAND_META[brandSlug];
    if (brand) {
      return {
        title: `${brand.name} Drums — Metal Drummers Who Use ${brand.name} | ${SITE_NAME}`,
        description: `Which metal drummers use ${brand.name} ${brand.type}? See every pro in MetalForge's database who endorses or plays ${brand.name} gear — kit specs and prices.`,
        image: DEFAULT_IMAGE,
        type: 'website',
        url: `${BASE_URL}/brands/${brandSlug}`,
        articleSchema: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'CollectionPage',
              name: `${brand.name} Metal Drummers — Who Uses ${brand.name}`,
              description: `Discover which professional metal drummers use ${brand.name} ${brand.type}.`,
              url: `${BASE_URL}/brands/${brandSlug}`,
              publisher: { '@type': 'Organization', name: 'MetalForge', url: BASE_URL },
            },
            {
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: `Which metal drummers use ${brand.name}?`,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: `Many professional metal drummers use ${brand.name} ${brand.type}. See the full list with gear specs on MetalForge.`,
                  },
                },
                {
                  '@type': 'Question',
                  name: `Is ${brand.name} good for metal drumming?`,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: `${brand.name} is one of the most popular brands among professional metal drummers. Many touring pros endorse and play ${brand.name} gear.`,
                  },
                },
                {
                  '@type': 'Question',
                  name: `What ${brand.name} ${brand.type} do pro metal drummers use?`,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: `Professional metal drummers use a range of ${brand.name} ${brand.type} models. Browse the MetalForge ${brand.name} page to see every pro and their specific gear.`,
                  },
                },
              ],
            },
          ],
        }),
        breadcrumbSchema: [
          { name: 'Home', url: BASE_URL },
          { name: 'Gear Brands', url: `${BASE_URL}/brands` },
          { name: brand.name, url: `${BASE_URL}/brands/${brandSlug}` },
        ],
      };
    }
  }

  // Issue #1209: /licks top-level hub
  if (path === '/licks') {
    return {
      title: `Signature Metal Drum Licks — Learn from the Legends | ${SITE_NAME}`,
      description: 'Master the signature drum licks of 60+ metal legends. Step-by-step breakdowns of blast beats, double bass patterns, and iconic fills from George Kollias, Joey Jordison, and more.',
      image: DEFAULT_IMAGE,
      type: 'website',
      url: `${BASE_URL}/licks`,
      articleSchema: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollectionPage',
            name: 'Signature Metal Drum Licks',
            description: 'Master the signature drum licks of 60+ metal legends. Step-by-step breakdowns of blast beats, double bass patterns, and iconic fills from George Kollias, Joey Jordison, and more.',
            url: `${BASE_URL}/licks`,
            publisher: { '@type': 'Organization', name: 'MetalForge', url: BASE_URL },
          },
          {
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What are the best metal drum licks to learn?',
                acceptedAnswer: { '@type': 'Answer', text: 'MetalForge features signature drum licks from 63 metal legends including blast beats from George Kollias, double-bass patterns from Joey Jordison, and groove licks from Brann Dailor. Browse by drummer at metalforge.io/licks.' },
              },
              {
                '@type': 'Question',
                name: 'How many signature drum licks does MetalForge have?',
                acceptedAnswer: { '@type': 'Answer', text: 'MetalForge has 157 signature lick pages covering 63 professional metal drummers, with step-by-step HowTo breakdowns and video analysis for each lick.' },
              },
              {
                '@type': 'Question',
                name: 'What technique is most common in metal drum licks?',
                acceptedAnswer: { '@type': 'Answer', text: 'Blast beats and double-bass patterns are the most common techniques in metal drum licks. Explore technique-specific licks at metalforge.io/technique/blast-beat/drummers and metalforge.io/technique/double-bass/drummers.' },
              },
            ],
          },
        ],
      }),
      breadcrumbSchema: [
        { name: 'Home', url: BASE_URL },
        { name: 'Signature Drum Licks', url: `${BASE_URL}/licks` },
      ],
    };
  }

  // Issue #1209: /drummers/<slug>/licks per-drummer hub
  // Issue #1388: FAQPage JSON-LD for AI Overview eligibility
  const drummerLicksHubMatch = path.match(/^\/drummers\/([a-z0-9-]+)\/licks$/);
  if (drummerLicksHubMatch) {
    const [, drummerSlug] = drummerLicksHubMatch;
    const allDrummerLicks = Object.values(SIGNATURE_LICKS).filter(l => l.drummerSlug === drummerSlug);
    const anyLick = allDrummerLicks[0];
    if (anyLick) {
      const lickCount = allDrummerLicks.length;
      const drummerName = anyLick.drummerName;
      const band = anyLick.band;
      const hubUrl = `${BASE_URL}/drummers/${drummerSlug}/licks`;
      return {
        title: `${drummerName} Signature Drum Licks & Patterns | ${SITE_NAME}`,
        description: `Learn the signature drum licks of ${drummerName} (${band}). Step-by-step breakdowns of iconic patterns and fills.`,
        image: DEFAULT_IMAGE,
        type: 'website',
        url: hubUrl,
        articleSchema: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'CollectionPage',
              name: `${drummerName} Signature Drum Licks`,
              description: `Learn the signature drum licks of ${drummerName} (${band}).`,
              url: hubUrl,
              publisher: { '@type': 'Organization', name: 'MetalForge', url: BASE_URL },
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
                { '@type': 'ListItem', position: 2, name: 'Drum Licks', item: `${BASE_URL}/licks` },
                { '@type': 'ListItem', position: 3, name: drummerName, item: `${BASE_URL}/drummers/${drummerSlug}` },
                { '@type': 'ListItem', position: 4, name: 'Licks', item: hubUrl },
              ],
            },
            {
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: `How many signature lick tutorials does MetalForge have for ${drummerName}?`,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: `MetalForge has ${lickCount} signature lick tutorial${lickCount !== 1 ? 's' : ''} for ${drummerName}, covering key techniques from their career.`,
                  },
                },
                {
                  '@type': 'Question',
                  name: `Are ${drummerName}'s lick tutorials free?`,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: `Yes, all ${drummerName} lick tutorials on MetalForge are free, including video demonstrations and HowTo breakdowns.`,
                  },
                },
                {
                  '@type': 'Question',
                  name: `What technique does ${drummerName} focus on in their lick tutorials?`,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: `${drummerName}'s lick tutorials on MetalForge cover their signature techniques used in ${band || 'their career'}. Each tutorial includes gear notes and a video demonstration.`,
                  },
                },
              ],
            },
          ],
        }),
      };
    }
    // Issue #1388: FAQPage for drummers with no licks yet — generic language
    const drummerForHub = getDrummerBySlug(drummerSlug);
    if (drummerForHub) {
      const hubUrl = `${BASE_URL}/drummers/${drummerSlug}/licks`;
      return {
        title: `${drummerForHub.name} Signature Drum Licks & Patterns | ${SITE_NAME}`,
        description: `Signature drum licks and patterns from ${drummerForHub.name}${drummerForHub.band ? ` (${drummerForHub.band})` : ''}. Tutorials coming soon.`,
        image: DEFAULT_IMAGE,
        type: 'website',
        url: hubUrl,
        articleSchema: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'CollectionPage',
              name: `${drummerForHub.name} Signature Drum Licks`,
              description: `Signature drum licks and patterns from ${drummerForHub.name}.`,
              url: hubUrl,
              publisher: { '@type': 'Organization', name: 'MetalForge', url: BASE_URL },
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
                { '@type': 'ListItem', position: 2, name: 'Drum Licks', item: `${BASE_URL}/licks` },
                { '@type': 'ListItem', position: 3, name: drummerForHub.name, item: `${BASE_URL}/drummers/${drummerSlug}` },
                { '@type': 'ListItem', position: 4, name: 'Licks', item: hubUrl },
              ],
            },
            {
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: `Does MetalForge have lick tutorials for ${drummerForHub.name}?`,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: `MetalForge is adding signature lick tutorials for ${drummerForHub.name}. Check back soon for step-by-step breakdowns of their iconic patterns.`,
                  },
                },
                {
                  '@type': 'Question',
                  name: `Are ${drummerForHub.name}'s lick tutorials free?`,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: `Yes, all MetalForge lick tutorials are free, including video demonstrations and HowTo breakdowns.`,
                  },
                },
                {
                  '@type': 'Question',
                  name: `What is ${drummerForHub.name} known for?`,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: `${drummerForHub.name}${drummerForHub.band ? ` of ${drummerForHub.band}` : ''} is a legendary metal drummer. Visit their MetalForge profile for complete gear breakdowns and more.`,
                  },
                },
              ],
            },
          ],
        }),
      };
    }
  }

  // Issue #1209: /drummers/<slug>/licks/<lick-slug> individual lick page
  // Issue #1347: add HowTo + VideoObject + MusicRecording JSON-LD for SSR visibility
  const lickPageMatch = path.match(/^\/drummers\/([a-z0-9-]+)\/licks\/([a-z0-9-]+)$/);
  if (lickPageMatch) {
    const [, drummerSlug, lickSlug] = lickPageMatch;
    const lick = SIGNATURE_LICKS[lickSlug];
    if (lick) {
      const lickUrl = `${BASE_URL}/drummers/${drummerSlug}/licks/${lickSlug}`;
      const thumbId = lick.video?.youtubeId || lick.tutorial?.youtubeId || null;

      const graph = [
        // VideoObject — primary performance video if present
        ...(lick.video ? [{
          '@type': 'VideoObject',
          name: lick.video.title,
          description: lick.video.description,
          thumbnailUrl: `https://i.ytimg.com/vi/${lick.video.youtubeId}/hqdefault.jpg`,
          uploadDate: '2024-01-01',
          contentUrl: `https://www.youtube.com/watch?v=${lick.video.youtubeId}`,
          embedUrl: `https://www.youtube.com/embed/${lick.video.youtubeId}`,
        }] : []),
        // HowTo — step-by-step breakdown
        {
          '@type': 'HowTo',
          name: `How to Play ${lick.name}`,
          description: lick.description,
          ...(thumbId ? { image: `https://i.ytimg.com/vi/${thumbId}/hqdefault.jpg` } : {}),
          totalTime: 'PT30M',
          tool: (lick.gearUsed || []).map(g => ({ '@type': 'HowToTool', name: g.name })),
          step: ((lick.techniqueDetails && lick.techniqueDetails.length)
            ? lick.techniqueDetails
            : (lick.learningTips || [])
          ).map((text, index) => ({
            '@type': 'HowToStep',
            position: index + 1,
            name: `Step ${index + 1}`,
            text,
          })),
          supply: (lick.techniques || []).map(t => ({
            '@type': 'HowToSupply',
            name: t.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          })),
        },
        // MusicRecording — song metadata
        {
          '@type': 'MusicRecording',
          name: lick.song,
          byArtist: { '@type': 'MusicGroup', name: lick.band },
          inAlbum: { '@type': 'MusicAlbum', name: lick.album.split(' (')[0] },
        },
        // Tutorial VideoObject if available
        ...(lick.tutorial ? [{
          '@type': 'VideoObject',
          name: lick.tutorial.title,
          description: lick.tutorial.description,
          thumbnailUrl: `https://i.ytimg.com/vi/${lick.tutorial.youtubeId}/hqdefault.jpg`,
          contentUrl: `https://www.youtube.com/watch?v=${lick.tutorial.youtubeId}`,
          embedUrl: `https://www.youtube.com/embed/${lick.tutorial.youtubeId}`,
        }] : []),
      ];

      return {
        title: `${lick.name} — ${lick.drummerName} (${lick.band}) Drum Lick | ${SITE_NAME}`,
        description: `Learn the ${lick.name} drum lick by ${lick.drummerName} of ${lick.band}. From ${lick.song} (${lick.album}). ${lick.description.slice(0, 100)}...`,
        image: DEFAULT_IMAGE,
        type: 'article',
        url: lickUrl,
        articleSchema: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }),
        breadcrumbSchema: [
          { name: 'Home', url: BASE_URL },
          { name: lick.drummerName, url: `${BASE_URL}/drummers/${drummerSlug}` },
          { name: 'Signature Licks', url: `${BASE_URL}/drummers/${drummerSlug}/licks` },
          { name: lick.name, url: lickUrl },
        ],
      };
    }
  }

  // Issue #1308: /drummers/<slug>/gear-history gear price history pages
  // Issue #1354: add BreadcrumbList JSON-LD (Home → Drummer → Gear History)
  const gearHistoryMatch = path.match(/^\/drummers\/([a-z0-9-]+)\/gear-history$/);
  if (gearHistoryMatch) {
    const [, slug] = gearHistoryMatch;
    const drummer = getDrummerBySlug(slug);
    if (drummer) {
      return {
        title: `${drummer.name} Drum Kit Evolution — Gear History & Price Timeline | ${SITE_NAME}`,
        description: `How ${drummer.name}'s drum kit and gear changed over the years. Era-by-era breakdown of kits, cymbals, and signature equipment with prices.`,
        image: `${BASE_URL}/api/card/${slug}?format=twitter`,
        type: 'article',
        url: `${BASE_URL}/drummers/${slug}/gear-history`,
        breadcrumbSchema: [
          { name: 'Home', url: BASE_URL },
          { name: drummer.name, url: `${BASE_URL}/drummers/${slug}` },
          { name: 'Gear History', url: `${BASE_URL}/drummers/${slug}/gear-history` },
        ],
      };
    }
  }

  // Issue #1475: /drummers/<slug>/evolution — gear evolution history pages (3 drummers)
  const evolutionMatch = path.match(/^\/drummers\/([^/]+)\/evolution\/?$/);
  if (evolutionMatch) {
    const [, slug] = evolutionMatch;
    const drummer = getDrummerBySlug(slug);
    const evolution = DRUMMER_EVOLUTION[slug];
    if (drummer && evolution) {
      return {
        title: `${drummer.name} Drum Kit Evolution — Complete Gear History | ${SITE_NAME}`,
        description: `How ${drummer.name}'s drum setup evolved from ${evolution.eras?.[0]?.year || evolution.eras?.[0]?.startYear || 'early career'} to today. Every kit change across ${drummer.band}'s discography.`,
        type: 'article',
        url: `${BASE_URL}/drummers/${slug}/evolution`,
        articleSchema: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Article',
              headline: `${drummer.name} Drum Kit Evolution`,
              author: { '@type': 'Organization', name: 'MetalForge' },
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
                { '@type': 'ListItem', position: 2, name: drummer.name, item: `${BASE_URL}/drummers/${slug}` },
                { '@type': 'ListItem', position: 3, name: 'Gear Evolution', item: `${BASE_URL}/drummers/${slug}/evolution` },
              ],
            },
          ],
        }),
      };
    }
  }

  // Issue #1411: /drummers/<slug>/endorsements — 15 endorsement pages (priority 0.85)
  // Issue #1452: FAQPage JSON-LD for AI Overview eligibility
  const endorsementsMatch = path.match(/^\/drummers\/([a-z0-9-]+)\/endorsements$/);
  if (endorsementsMatch) {
    const [, slug] = endorsementsMatch;
    const drummer = getDrummerBySlug(slug);
    if (drummer) {
      const endorsements = drummer.endorsements || [];
      const endorsementNames = endorsements.map(e => e.name);
      const drumsEndorsement = endorsements.find(e => /drum/i.test(e.name) && !/drumstick|drumhead/i.test(e.name));
      const cymbalEndorsement = endorsements.find(e => /cymbal/i.test(e.name));
      const primaryKit = drumsEndorsement ? drumsEndorsement.name : (drummer.gear?.drums || 'a custom drum kit');
      const cymbalBrand = cymbalEndorsement ? cymbalEndorsement.name : (drummer.gear?.cymbals || 'cymbals');
      const endorsementList = endorsementNames.length > 0
        ? endorsementNames.join(', ')
        : (drummer.gear ? [drummer.gear.drums, drummer.gear.cymbals].filter(Boolean).join(', ') : 'various gear brands');
      return {
        title: `${drummer.name} Endorsements & Gear Sponsors | ${SITE_NAME}`,
        description: `Official gear endorsements for ${drummer.name} (${drummer.band}): drum brands, cymbal sponsors, stick deals, and hardware partnerships.`,
        image: drummer.image || `${BASE_URL}/images/og/default.png`,
        type: 'article',
        url: `${BASE_URL}/drummers/${slug}/endorsements`,
        breadcrumbSchema: [
          { name: 'Home', url: BASE_URL },
          { name: 'Drummers', url: `${BASE_URL}/drummers` },
          { name: drummer.name, url: `${BASE_URL}/drummer/${slug}` },
          { name: 'Endorsements', url: `${BASE_URL}/drummers/${slug}/endorsements` },
        ],
        faqSchema: [
          {
            question: `What brands does ${drummer.name} endorse?`,
            answer: `${drummer.name} endorses ${endorsementList}. Visit MetalForge for the full breakdown of their gear sponsors and partnerships.`,
          },
          {
            question: `What drum kit does ${drummer.name} endorse?`,
            answer: `${drummer.name}'s main drum endorsement is ${primaryKit}. See the complete kit specs on MetalForge.`,
          },
          {
            question: `Does ${drummer.name} endorse cymbals?`,
            answer: `${drummer.name} endorses ${cymbalBrand}. Full cymbal setup and endorsement details are available on MetalForge.`,
          },
        ],
      };
    }
  }

  // Issue #1474: /drummers/<slug>/signature/<gearSlug> — Product + BreadcrumbList JSON-LD
  const sigGearMatch = path.match(/^\/drummers\/([^/]+)\/signature\/([^/]+)\/?$/);
  if (sigGearMatch) {
    const [, drummerSlug, gearSlug] = sigGearMatch;
    const gear = SIGNATURE_GEAR[gearSlug];
    const drummer = getDrummerBySlug(drummerSlug);
    if (gear && drummer) {
      return {
        title: `${gear.fullName} — ${drummer.name}'s Signature ${gear.gearType} | ${SITE_NAME}`,
        description: `${gear.hero.tagline}. Full specs, story, and pricing for ${drummer.name}'s ${gear.name} (${gear.model}).`,
        type: 'website',
        url: `${BASE_URL}/drummers/${drummerSlug}/signature/${gearSlug}`,
        articleSchema: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Product',
              name: gear.fullName,
              model: gear.model,
              brand: { '@type': 'Brand', name: gear.brand },
              description: gear.hero.subtitle,
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
                { '@type': 'ListItem', position: 2, name: drummer.name, item: `${BASE_URL}/drummers/${drummerSlug}` },
                { '@type': 'ListItem', position: 3, name: gear.name, item: `${BASE_URL}/drummers/${drummerSlug}/signature/${gearSlug}` },
              ],
            },
          ],
        }),
      };
    }
  }

  // Drummer profiles (root slug)
  const drummerMatch = path.match(/^\/([a-z0-9-]+)$/);
  if (drummerMatch) {
    const [, slug] = drummerMatch;
    const drummer = getDrummerBySlug(slug);
    
    if (drummer) {
      const brands = getPrimaryBrands(drummer.gear);
      const brandsText = brands.length > 0 ? brands.join(', ') : 'pro gear';
      // Issue #1140: prefer a query-matched override (e.g. Joey Jordison) when one
      // exists; otherwise use the generic per-drummer template.
      const override = DRUMMER_META_OVERRIDES[slug];
      // Issue #1163: question-led, query-matched description ("What drum kit does
      // X play?") — promotes Joey's hand-override pattern to the default template.
      const bandText = drummer.band ? `${drummer.band} ` : '';
      // Issue #1357: build related article backlinks for SSR body
      const allArticles = Object.values(ALBUM_ARTICLES);
      const relatedArticles = allArticles
        .filter(a => a.drummerId === drummer.id || (a.relatedDrummers || []).includes(drummer.id) || a.relatedDrummerSlug === slug)
        .slice(0, 3);

      return {
        title: override?.title || `${drummer.name} Drum Kit & Gear Setup | ${SITE_NAME}`,
        description: truncate(
          override?.description ||
            `What drum kit does ${drummer.name} play? The ${bandText}drummer's ${brandsText} setup — full gear breakdown with videos, specs, and prices.`,
          160
        ),
        // Issue #1161: crawler-facing sub-heading carrying the GSC-proven
        // "<drummer> drum kit/set/setup" head term in the server-rendered markup,
        // mirroring the on-page <h2> tagline added under the name H1 in DrummerDetail.
        subheading: `${drummer.name} Drum Kit, Gear & Setup`,
        image: `${BASE_URL}/api/card/${slug}?format=twitter`,
        type: 'profile',
        url: `${BASE_URL}/${slug}`,
        ssrLinks: relatedArticles.length > 0 ? relatedArticles.map(a => ({
          href: `/articles/${a.slug}`,
          label: a.title,
        })) : null,
        // Issue #1659: Person + FAQPage + MusicGroup JSON-LD for SSR crawler visibility
        articleSchema: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Person',
              name: drummer.name,
              jobTitle: 'Drummer',
              url: `${BASE_URL}/drummer/${slug}`,
              image: `${BASE_URL}/api/card/${slug}?format=twitter`,
              ...(drummer.band ? {
                memberOf: {
                  '@type': 'MusicGroup',
                  name: drummer.band,
                },
              } : {}),
              sameAs: [
                `https://en.wikipedia.org/wiki/${encodeURIComponent(drummer.name.replace(/ /g, '_'))}`,
              ],
              knowsAbout: ['Drumming', 'Metal Music', 'Percussion'],
            },
            {
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: `What drum kit does ${drummer.name} play?`,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: brands.length > 0
                      ? `${drummer.name} plays a ${brands.join(' and ')} drum kit. See the full gear setup on MetalForge.`
                      : `${drummer.name}'s full drum kit and gear setup is documented on MetalForge.`,
                  },
                },
                {
                  '@type': 'Question',
                  name: `What cymbals does ${drummer.name} use?`,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: `${drummer.name}'s cymbal setup includes gear from their complete MetalForge profile at metalforge.io/drummer/${slug}.`,
                  },
                },
                {
                  '@type': 'Question',
                  name: `What band is ${drummer.name} in?`,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: drummer.band
                      ? `${drummer.name} is the drummer of ${drummer.band}.`
                      : `${drummer.name} has performed with multiple bands. See their full career history on MetalForge.`,
                  },
                },
              ],
            },
          ],
        }),
        breadcrumbSchema: [
          { name: 'Home', url: BASE_URL },
          { name: 'Drummers', url: `${BASE_URL}/drummers` },
          { name: drummer.name, url: `${BASE_URL}/${slug}` },
        ],
      };
    }
  }

  // Issue #1210: /lists/<slug> — list-specific SSR title + description
  const listMatch = path.match(/^\/lists\/([a-z0-9-]+)$/);
  if (listMatch) {
    const [, listSlug] = listMatch;
    const list = TOP_10_LISTS[listSlug];
    if (list) {
      return {
        title: `${list.title} | ${SITE_NAME}`,
        description: list.seoDescription || list.description,
        image: DEFAULT_IMAGE,
        type: 'article',
        url: `${BASE_URL}/lists/${listSlug}`,
        articleSchema: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'ItemList',
              name: list.title,
              description: list.seoDescription || list.description,
              url: `${BASE_URL}/lists/${listSlug}`,
              numberOfItems: list.items?.length || 10,
              publisher: { '@type': 'Organization', name: 'MetalForge', url: BASE_URL },
              itemListElement: (list.items || []).slice(0, 10).map((item, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: item.name || item,
                url: item.url || `${BASE_URL}/drummer/${item.slug || ''}`,
              })),
            },
            {
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: `Who tops the ${list.title}?`,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: `The #1 ranked entry in ${list.title} on MetalForge is ${list.items?.[0]?.name || 'featured on the MetalForge ranked list'}. See the full ranked list at metalforge.io/lists/${listSlug}.`,
                  },
                },
                {
                  '@type': 'Question',
                  name: `How is the ${list.title} determined?`,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: `The ${list.title} is curated by MetalForge editors based on technique, innovation, influence, and community recognition within the metal genre.`,
                  },
                },
                {
                  '@type': 'Question',
                  name: `How many drummers are on the ${list.title}?`,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: `The ${list.title} features ${list.items?.length || 10} professional metal drummers ranked by MetalForge.`,
                  },
                },
              ],
            },
          ],
        }),
        breadcrumbSchema: [
          { name: 'Home', url: BASE_URL },
          { name: 'Ranked Lists', url: `${BASE_URL}/lists` },
          { name: list.title, url: `${BASE_URL}/lists/${listSlug}` },
        ],
      };
    }
  }

  // Issue #1210: /lists index
  if (path === '/lists') {
    return {
      title: `Top 10 Metal Drummer Lists | ${SITE_NAME}`,
      description: 'Ranked lists of the best metal drummers by speed, technique, and genre. Fastest blast beats, best double bass, most innovative and more.',
      image: DEFAULT_IMAGE,
      type: 'website',
      url: `${BASE_URL}/lists`,
    };
  }

  // Issue #1300: /gear hub
  if (path === '/gear') {
    return {
      title: `Pro Metal Drum Gear — Kits, Cymbals & Equipment | ${SITE_NAME}`,
      description: 'Browse drum gear used by 60+ metal legends. Shop cymbals, kits, snares, pedals, sticks, and hardware — filtered by genre, brand, and price.',
      image: DEFAULT_IMAGE,
      type: 'website',
      url: `${BASE_URL}/gear`,
    };
  }

  // Issue #1381: /gear/<item-slug> — individual gear item pages (10 items)
  const GEAR_ITEM_META = {
    'tama-iron-cobra-900-double-pedal': {
      name: 'Tama Iron Cobra 900 Double Pedal',
      category: 'double bass pedal',
      description: 'The Tama Iron Cobra 900 double pedal used by pro metal drummers like Eloy Casagrande and Tomas Haake.',
    },
    'meinl-byzance-series-cymbals': {
      name: 'Meinl Byzance Series Cymbals',
      category: 'cymbals',
      description: 'Meinl Byzance cymbals — favored by Tomas Haake, Matt Halpern, and top progressive metal drummers.',
    },
    'paiste-rude-series-cymbals': {
      name: 'Paiste RUDE Series Cymbals',
      category: 'cymbals',
      description: 'Paiste RUDE cymbals — the aggressive, loud choice of thrash and death metal drummers worldwide.',
    },
    'zildjian-a-custom-series-cymbals': {
      name: 'Zildjian A Custom Series Cymbals',
      category: 'cymbals',
      description: 'Zildjian A Custom cymbals — a go-to choice for metal drummers seeking bright, cutting projection.',
    },
    'vic-firth-american-classic-5b': {
      name: 'Vic Firth American Classic 5B',
      category: 'drumsticks',
      description: 'Vic Firth American Classic 5B drumsticks — widely used by metal drummers for their balance and power.',
    },
    'pearl-demon-drive-double-pedal': {
      name: 'Pearl Demon Drive Double Pedal',
      category: 'double bass pedal',
      description: 'The Pearl Demon Drive double bass pedal — favored by speed-focused metal drummers for its smooth, fast action.',
    },
    'tama-starclassic-walnut-birch-drums': {
      name: 'Tama Starclassic Walnut/Birch Drums',
      category: 'drum kit',
      description: 'Tama Starclassic Walnut/Birch drum kit — prized by metal drummers for its warm attack and projection.',
    },
    'pearl-reference-series-drums': {
      name: 'Pearl Reference Series Drums',
      category: 'drum kit',
      description: 'Pearl Reference Series drums — a multi-ply, multi-species shell used by metal drummers seeking a versatile, powerful kit.',
    },
    'sonor-sq2-heavy-beech-drums': {
      name: 'Sonor SQ2 Heavy Beech Drums',
      category: 'drum kit',
      description: 'Sonor SQ2 Heavy Beech drums — boutique German-made kits delivering punishing low-end for extreme metal.',
    },
    'sabian-hhx-series-cymbals': {
      name: 'Sabian HHX Series Cymbals',
      category: 'cymbals',
      description: 'Sabian HHX cymbals — dark, complex sound profile popular among progressive and extreme metal drummers.',
    },
  };

  const gearItemMatch = path.match(/^\/gear\/([a-z0-9-]+)$/);
  if (gearItemMatch) {
    const slug = gearItemMatch[1];
    const item = GEAR_ITEM_META[slug];
    if (item) {
      // Issue #1387: build crawler-visible drummer profile links for this gear item.
      const gearEntry = gearItems.find(g => g.slug === slug);
      const ssrDrummerLinks = gearEntry && gearEntry.drummerIds
        ? gearEntry.drummerIds
            .slice(0, 5)
            .map(id => drummers.find(d => d.id === id))
            .filter(Boolean)
            .map(d => ({
              href: `/drummer/${d.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`,
              label: `${d.name} (${d.band})`,
            }))
        : null;

      return {
        title: `${item.name} — Used by Pro Metal Drummers | ${SITE_NAME}`,
        description: item.description,
        image: DEFAULT_IMAGE,
        type: 'website',
        url: `${BASE_URL}/gear/${slug}`,
        ssrDrummerLinks: ssrDrummerLinks && ssrDrummerLinks.length > 0 ? ssrDrummerLinks : null,
        articleSchema: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
            { '@type': 'ListItem', position: 2, name: 'Gear', item: `${BASE_URL}/gear` },
            { '@type': 'ListItem', position: 3, name: item.name, item: `${BASE_URL}/gear/${slug}` },
          ],
        }),
      };
    }
  }

  // Issue #1383: /gear/<brand> — 8 brand landing pages
  const GEAR_BRAND_META = {
    tama: { name: 'Tama', type: 'drum kits', tagline: 'Premier Japanese drum manufacturer used by Eloy Casagrande, Tomas Haake, and more.' },
    pearl: { name: 'Pearl', type: 'drum kits', tagline: 'Pearl drums used by Joey Jordison, Gene Hoglan, and top metal drummers worldwide.' },
    dw: { name: 'DW', type: 'drum kits', tagline: 'Drum Workshop (DW) kits used by Danny Carey, Mike Mangini, and legendary metal drummers.' },
    ludwig: { name: 'Ludwig', type: 'drum kits', tagline: 'Ludwig drums — iconic brand used by John Bonham-influenced metal drummers.' },
    zildjian: { name: 'Zildjian', type: 'cymbals', tagline: 'Zildjian cymbals used by Lars Ulrich, Matt Greiner, and top metal drummers for 400+ years.' },
    paiste: { name: 'Paiste', type: 'cymbals', tagline: 'Paiste cymbals — Swiss precision used by Tomas Haake, Hellhammer, and extreme metal pros.' },
    meinl: { name: 'Meinl', type: 'cymbals', tagline: 'Meinl cymbals used by Matt Halpern, Gavin Harrison, and progressive metal elite.' },
    sabian: { name: 'Sabian', type: 'cymbals', tagline: 'Sabian cymbals used by Neil Peart, Charlie Benante, and leading metal drummers.' },
  };

  const gearBrandMatch = path.match(/^\/gear\/([a-z]+)$/);
  if (gearBrandMatch) {
    const brandSlug = gearBrandMatch[1];
    const brand = GEAR_BRAND_META[brandSlug];
    if (brand) {
      return {
        title: `${brand.name} ${brand.type === 'drum kits' ? 'Drums' : 'Cymbals'} — Metal Drummers Who Use ${brand.name} | ${SITE_NAME}`,
        description: brand.tagline,
        image: DEFAULT_IMAGE,
        type: 'website',
        url: `${BASE_URL}/gear/${brandSlug}`,
        articleSchema: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `Metal Drummers Who Use ${brand.name}`,
          description: brand.tagline,
          url: `${BASE_URL}/gear/${brandSlug}`,
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
              { '@type': 'ListItem', position: 2, name: 'Gear', item: `${BASE_URL}/gear` },
              { '@type': 'ListItem', position: 3, name: brand.name, item: `${BASE_URL}/gear/${brandSlug}` },
            ],
          },
        }),
      };
    }
  }

  // Issue #1301: /gear/<category> — 6 browsable category pages
  const GEAR_CATEGORY_META = {
    cymbals: {
      name: 'Metal Cymbals',
      description: 'Cymbals used by 60+ metal legends — Zildjian, Paiste, Meinl, Sabian. Filter by brand, price, and drummer.',
    },
    snares: {
      name: 'Metal Snare Drums',
      description: 'Snare drums used by pro metal drummers. Signature models, custom builds, and budget options — filter by brand and drummer.',
    },
    drums: {
      name: 'Metal Drum Kits',
      description: 'Full drum kits used by legendary metal drummers. Tama, Pearl, DW, Ludwig — filter by brand, genre, and price.',
    },
    pedals: {
      name: 'Metal Bass Drum Pedals',
      description: 'Double bass pedals and single pedals used by metal drummers. Speed plate comparisons, signature models, and pro setups.',
    },
    sticks: {
      name: 'Metal Drumsticks',
      description: 'Drumsticks used by pro metal drummers. Signature models, wood tips, nylon tips — filter by brand and drummer.',
    },
    hardware: {
      name: 'Metal Drum Hardware',
      description: 'Drum hardware used by metal drummers — hi-hat stands, snare stands, bass drum mounts, and rack systems.',
    },
  };

  const gearCategoryMatch = path.match(/^\/gear\/([a-z-]+)$/);
  if (gearCategoryMatch && !gearCategoryMatch[1].startsWith('item')) {
    const catSlug = gearCategoryMatch[1];
    const catMeta = GEAR_CATEGORY_META[catSlug];
    if (catMeta) {
      // Issue #1427: CollectionPage + BreadcrumbList + FAQPage for gear category pages
      const catName = catMeta.name;
      const catUrl = `${BASE_URL}/gear/${catSlug}`;
      const GEAR_CATEGORY_FAQ = {
        cymbals: [
          {
            question: 'What are the best cymbals for metal?',
            answer: `The most popular metal cymbals are from Zildjian (A Custom, Z Custom), Paiste (2002, Alpha), Meinl (Classics Custom, Byzance Dark), and Sabian (AAX, HH). Browse the full breakdown at ${catUrl}.`,
          },
          {
            question: 'Which metal drummers use Zildjian or Meinl cymbals?',
            answer: 'Drummers like Lars Ulrich (Metallica) and Dave Lombardo (Slayer) are known for Zildjian, while Dirk Verbeuren (Megadeth) and Marco Minnemann favour Meinl. Many pros mix brands across ride, crash, and hi-hat.',
          },
          {
            question: 'What should I look for in metal cymbals?',
            answer: 'Metal cymbals need quick response, cutting projection, and durability under heavy sticking. Look for medium-to-heavy weight crashes (16–18 inch), a loud, dry ride, and tight hi-hats. Avoid thin jazz cymbals — they crack under blast beats.',
          },
        ],
        snares: [
          {
            question: 'What are the best snare drums for metal?',
            answer: `Top metal snares include the Pearl Free-Floating, Ludwig Black Beauty, DW Collector's, and signature models from Tama and Mapex. See the full list at ${catUrl}.`,
          },
          {
            question: 'Which metal drummers use signature snare drums?',
            answer: "Joey Jordison (Slipknot) used a Tama signature snare, Lars Ulrich is known for a Ludwig Black Beauty, and Gene Hoglan plays a Pearl Free-Floating. Signature models are tuned for maximum crack and projection.",
          },
          {
            question: 'What should I look for in a metal snare drum?',
            answer: 'Choose a steel or aluminium shell (6.5–8 inch depth) for maximum crack and attack. Tighter tension heads (Remo Ambassador CS or Evans ST) reduce overtones for a dry, cutting snare sound essential in metal production.',
          },
        ],
        drums: [
          {
            question: 'What are the best drum kits for metal?',
            answer: `The most-used metal kits include Tama Starclassic, Pearl Masters, DW Collector's, and Mapex Saturn. Many pros add extra bass drums or toms. Full breakdown at ${catUrl}.`,
          },
          {
            question: 'Which metal drummers use Tama or Pearl kits?',
            answer: "Tama is favoured by drummers like Nicko McBrain (Iron Maiden) and Yoshiki (X Japan). Pearl kits are used by Gene Hoglan and Chad Smith. DW is popular across thrash and death metal.",
          },
          {
            question: 'What should I look for in a metal drum kit?',
            answer: 'Prioritise shell depth (deeper toms = more punch), a rigid hardware system, and a heavy-duty bass drum pedal mount. Birch or maple shells are common choices; avoid entry-level poplar kits for live metal performance.',
          },
        ],
        pedals: [
          {
            question: 'What are the best bass drum pedals for metal?',
            answer: `Top metal double pedals include the DW 9002, Tama Iron Cobra, Pearl Eliminator, and Mapex Falcon. Speed plate linkage and spring tension matter most for blast beats. Full comparison at ${catUrl}.`,
          },
          {
            question: 'Which metal drummers use DW or Tama pedals?',
            answer: "Dave Lombardo (Slayer) is known for DW 9002 double pedals. George Kollias (Nile) has used Pearl Eliminators. Many drummers choose based on footboard feel and spring response rather than brand loyalty.",
          },
          {
            question: 'What should I look for in a metal bass drum pedal?',
            answer: 'For metal and extreme speeds, look for a direct-drive or longboard cam pedal, adjustable spring tension, and a chain or direct-drive linkage. Heel-up playing favours a longer footboard; heel-toe technique suits compact boards.',
          },
        ],
        sticks: [
          {
            question: 'What are the best drumsticks for metal?',
            answer: `Popular metal drumstick models include Vic Firth 5B and 2B, Promark TX5BW, and Zildjian Artist Series. Hickory for durability, maple for speed. See the full breakdown at ${catUrl}.`,
          },
          {
            question: 'Which metal drummers have signature drumsticks?',
            answer: "Benny Greb, Dave Lombardo, and Lars Ulrich have signature stick lines. Most metal drummers favour heavier sticks (5B or 2B) with nylon tips for cymbal projection and wood tips for a warmer tom sound.",
          },
          {
            question: 'What should I look for in metal drumsticks?',
            answer: 'Choose hickory for durability under hard hitting; maple if you prioritise speed. Go heavier (5B, 2B) for metal to withstand rim shots and hard crashes. Nylon tips give brighter cymbal articulation; wood tips are warmer but wear faster.',
          },
        ],
        hardware: [
          {
            question: 'What drum hardware do metal drummers use?',
            answer: `Metal drummers rely on heavy-duty stands from Tama, Pearl, DW, and Gibraltar — double-braced legs, memory locks, and rack systems for large kit configurations. See gear used by pros at ${catUrl}.`,
          },
          {
            question: 'Which metal drummers use rack systems vs traditional stands?',
            answer: "Rack systems (Pearl DR-503, DW DWCP9000) are common in large metal setups — Gene Hoglan and Chris Adler use them for stability across multiple toms. Traditional stands work fine for smaller kits and touring.",
          },
          {
            question: 'What should I look for in metal drum hardware?',
            answer: 'Metal drumming requires double-braced stands rated for heavy use. Look for hi-hat stands with smooth action (for fast open-close work), snare stands with memory locks, and boom cymbal arms with ratchet tilters. Avoid single-braced stands — they wobble under hard hitting.',
          },
        ],
      };
      return {
        title: `Best ${catName} for Metal — What the Pros Use | ${SITE_NAME}`,
        description: catMeta.description,
        image: DEFAULT_IMAGE,
        type: 'website',
        url: catUrl,
        articleSchema: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `Best ${catName} for Metal`,
          description: catMeta.description,
          url: catUrl,
          publisher: { '@type': 'Organization', name: 'MetalForge', url: BASE_URL },
        }),
        breadcrumbSchema: [
          { name: 'Home', url: BASE_URL },
          { name: 'Gear', url: `${BASE_URL}/gear` },
          { name: catName, url: catUrl },
        ],
        faqSchema: GEAR_CATEGORY_FAQ[catSlug] || [],
      };
    }
  }

  // Issue #1266: /drummer/<slug>/<category> gear category pages (~90 pages)
  const drummerCategoryMatch = path.match(/^\/drummer\/([a-z0-9-]+)\/([a-z0-9-]+)$/);
  if (drummerCategoryMatch) {
    const [, drummerSlug, category] = drummerCategoryMatch;
    const drummer = getDrummerBySlug(drummerSlug);
    if (drummer) {
      const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);
      return {
        title: `${drummer.name} ${categoryLabel} — Drum Gear & Setup | ${SITE_NAME}`,
        description: `See what ${categoryLabel.toLowerCase()} ${drummer.name} uses. Complete ${drummer.band} drummer gear list with specs and prices.`,
        type: 'website',
        url: `${BASE_URL}/drummer/${drummerSlug}/${category}`,
        articleSchema: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${drummer.name} ${categoryLabel}`,
          description: `Complete ${categoryLabel.toLowerCase()} gear for ${drummer.name} (${drummer.band})`,
          url: `${BASE_URL}/drummer/${drummerSlug}/${category}`,
          publisher: { '@type': 'Organization', name: 'MetalForge', url: BASE_URL },
        }),
        breadcrumbSchema: [
          { name: 'Home', url: BASE_URL },
          { name: drummer.name, url: `${BASE_URL}/drummer/${drummerSlug}` },
          { name: categoryLabel, url: `${BASE_URL}/drummer/${drummerSlug}/${category}` },
        ],
      };
    }
  }

  // Issue #1299: /history page
  if (path === '/history') {
    return {
      title: `Metal Drum Kit History & Evolution Timeline | ${SITE_NAME}`,
      description: 'The complete history of metal drumming — from Black Sabbath in 1968 to modern extreme metal. How drum kits, techniques, and gear evolved across 50+ years.',
      image: DEFAULT_IMAGE,
      type: 'website',
      url: `${BASE_URL}/history`,
      articleSchema: JSON.stringify([
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Metal Drum Kit History & Evolution Timeline',
          description: 'The complete history of metal drumming from Black Sabbath to modern extreme metal.',
          url: `${BASE_URL}/history`,
          publisher: { '@type': 'Organization', name: 'MetalForge', url: BASE_URL },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            { '@type': 'Question', name: 'When did metal drumming begin?', acceptedAnswer: { '@type': 'Answer', text: 'Metal drumming traces its origins to Black Sabbath in 1968-1970, when Bill Ward developed the heavy, blues-influenced drumming style that defined early heavy metal.' } },
            { '@type': 'Question', name: 'When was the blast beat invented?', acceptedAnswer: { '@type': 'Answer', text: 'The blast beat emerged in the mid-1980s from hardcore punk and grindcore bands like Repulsion and Napalm Death, popularized in death metal by Pete Sandoval of Morbid Angel.' } },
            { '@type': 'Question', name: 'How have metal drum kits evolved over the decades?', acceptedAnswer: { '@type': 'Answer', text: 'Metal drum kits evolved from basic 4-piece rock setups (1970s) to double bass configurations (1980s thrash), to massive triggered electronic/acoustic hybrids (1990s-2000s extreme metal), to modern minimal precision rigs (2010s-present).' } },
          ],
        },
      ]),
    };
  }

  // Issue #1407: /battles hub page
  // Issue #1477: CollectionPage + FAQPage JSON-LD for AI Overview eligibility
  if (path === '/battles') {
    return {
      title: `Metal Drummer Battles — Vote for the Best | ${SITE_NAME}`,
      description: 'Vote in head-to-head metal drummer battles. Who has the better kit? Compare setups and cast your vote for 60+ legendary drummers.',
      image: DEFAULT_IMAGE,
      type: 'website',
      url: `${BASE_URL}/battles`,
      articleSchema: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollectionPage',
            name: 'Metal Drummer Battles — Drum Kit Showdowns',
            description: 'Vote on the greatest drummer gear matchups in metal history. 8 curated battles across thrash, death, prog, and black metal.',
            url: `${BASE_URL}/battles`,
            hasPart: CURATED_MATCHUPS.map(m => {
              const d1 = _drummerById[m.drummer1Id];
              const d2 = _drummerById[m.drummer2Id];
              if (!d1 || !d2) return null;
              const battleSlug = `${_battleDrummerSlug(d1.name)}-vs-${_battleDrummerSlug(d2.name)}`;
              return {
                '@type': 'WebPage',
                name: `${d1.name} vs ${d2.name}`,
                url: `${BASE_URL}/battles/${battleSlug}`,
              };
            }).filter(Boolean),
          },
          {
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Who is the best metal drummer?',
                acceptedAnswer: { '@type': 'Answer', text: 'MetalForge lets fans vote on legendary matchups including Lars Ulrich vs Dave Lombardo, Gene Hoglan vs George Kollias, and more.' },
              },
              {
                '@type': 'Question',
                name: 'How do MetalForge drummer battles work?',
                acceptedAnswer: { '@type': 'Answer', text: "Each week a new matchup is featured. Vote for your favorite, see the community results, and explore each drummer's full gear setup." },
              },
            ],
          },
        ],
      }),
    };
  }

  // Issue #1473: /battles/<slug> — individual curated battle pages (8 matchups)
  const battlePageMatch = path.match(/^\/battles\/([^/]+)\/?$/);
  if (battlePageMatch) {
    const battleSlug = battlePageMatch[1];
    const battle = BATTLE_BY_SLUG[battleSlug];
    if (battle) {
      const { d1, d2 } = battle;
      return {
        title: `${d1.name} vs ${d2.name} — Drum Kit Battle | ${SITE_NAME}`,
        description: `Who has the better drum kit? ${d1.name} (${d1.band}) vs ${d2.name} (${d2.band}). Full gear breakdown, specs, and community vote.`,
        image: DEFAULT_IMAGE,
        type: 'website',
        url: `${BASE_URL}/battles/${battleSlug}`,
        faqSchema: [
          {
            question: `What drum kit does ${d1.name} use?`,
            answer: `${d1.name} (${d1.band}) uses ${d1.gear?.drums || 'a custom drum kit'}. Full gear breakdown including cymbals and hardware on MetalForge.`,
          },
          {
            question: `What drum kit does ${d2.name} use?`,
            answer: `${d2.name} (${d2.band}) uses ${d2.gear?.drums || 'a custom drum kit'}. Full gear breakdown including cymbals and hardware on MetalForge.`,
          },
        ],
        breadcrumbSchema: [
          { name: 'Home', url: BASE_URL },
          { name: 'Battles', url: `${BASE_URL}/battles` },
          { name: `${d1.name} vs ${d2.name}`, url: `${BASE_URL}/battles/${battleSlug}` },
        ],
      };
    }
  }

  // Issue #1822: /spotlights hub page — CollectionPage JSON-LD
  if (path === '/spotlights') {
    return {
      title: `Metal Drummer Spotlights — Featured Profiles & Stories | ${SITE_NAME}`,
      description: 'Deep-dive spotlight features on metal drumming legends. Equipment breakdowns, career milestones, and gear stories for 60+ pro drummers.',
      image: DEFAULT_IMAGE,
      type: 'website',
      url: `${BASE_URL}/spotlights`,
      articleSchema: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Metal Drummer Spotlights',
        description: 'Curated spotlight features on professional metal drummers.',
        url: `${BASE_URL}/spotlights`,
        publisher: { '@type': 'Organization', name: 'MetalForge', url: BASE_URL },
      }),
    };
  }

  // Issue #1407: /quotes hub page
  // Issue #1522: Quotation + ItemList JSON-LD for AI citation surface
  if (path === '/quotes') {
    const allQuotes = getAllQuotes();
    // Top 5 most notable drummers — one representative quote each
    const featured = [4, 2, 1, 3, 5]
      .map(dId => allQuotes.find(q => q.drummer.id === dId))
      .filter(Boolean)
      .slice(0, 5);
    return {
      title: `Metal Drummer Quotes — Insights on Gear & Technique | ${SITE_NAME}`,
      description: "Memorable quotes from the world's greatest metal drummers on gear, technique, and the craft. From Lars Ulrich, Joey Jordison, Tomas Haake, and 60+ legends.",
      image: DEFAULT_IMAGE,
      type: 'website',
      url: `${BASE_URL}/quotes`,
      articleSchema: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Metal Drummer Quotes',
        description: 'Memorable quotes from legendary metal drummers on technique, gear, and philosophy.',
        url: `${BASE_URL}/quotes`,
        mainEntity: {
          '@type': 'ItemList',
          name: 'Metal Drummer Quotes',
          itemListElement: featured.map((q, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'Quotation',
              text: q.text,
              spokenByCharacter: {
                '@type': 'Person',
                name: q.drummer.name,
                url: `${BASE_URL}/drummer/${q.drummer.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`,
              },
            },
          })),
        },
      }),
    };
  }

  // Issue #1407: /endorsement-news hub page
  if (path === '/endorsement-news') {
    return {
      title: `Metal Drummer Endorsement News — Brand Deals & Sponsorships | ${SITE_NAME}`,
      description: 'Latest endorsement deals and brand sponsorships in metal drumming. Track which drum brands are signing which metal drummers.',
      image: DEFAULT_IMAGE,
      type: 'website',
      url: `${BASE_URL}/endorsement-news`,
      articleSchema: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Metal Drummer Endorsement News',
        description: 'Latest endorsement deals and brand sponsorships in metal drumming. Track which drum brands are signing which metal drummers.',
        url: `${BASE_URL}/endorsement-news`,
        publisher: { '@type': 'Organization', name: 'MetalForge', url: BASE_URL },
      }),
      faqSchema: [
        {
          question: 'Which metal drummers are currently endorsed by Tama?',
          answer: 'MetalForge tracks Tama endorsements across 60+ metal drummers. Visit /endorsement-news or browse individual drummer profiles to see current Tama endorsement deals.',
        },
        {
          question: 'What does it mean for a drummer to be endorsed by a brand?',
          answer: 'A drum endorsement means the brand sponsors the drummer, often providing free or discounted gear in exchange for promotion. Endorsed drummers typically use and publicly advocate for the brand.',
        },
        {
          question: 'Which drum brand has the most metal drummer endorsements?',
          answer: 'Tama and DW Drums lead metal drummer endorsements in the MetalForge database, followed by Pearl, Ludwig, Zildjian, and Meinl for cymbals.',
        },
      ],
    };
  }

  // Issue #1407: /facts hub page
  if (path === '/facts') {
    return {
      title: `Metal Drummer Quick Facts — Records, Stats & Trivia | ${SITE_NAME}`,
      description: 'Quick facts, records, and trivia about metal drummers. Fastest blast beats, most expensive kits, career milestones, and gear stats from 60+ pros.',
      image: DEFAULT_IMAGE,
      type: 'website',
      url: `${BASE_URL}/facts`,
      articleSchema: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Metal Drummer Quick Facts',
        description: 'Quick facts, records, and trivia about metal drummers. Fastest blast beats, most expensive kits, career milestones, and gear stats from 60+ pros.',
        url: `${BASE_URL}/facts`,
        publisher: { '@type': 'Organization', name: 'MetalForge', url: BASE_URL },
        about: { '@type': 'Thing', name: 'Metal Drumming' },
      }),
    };
  }

  // Issue #1357: /drummer/<slug> profile pages — SSR with related article links
  const drummerPrefixMatch = path.match(/^\/drummer\/([a-z0-9-]+)$/);
  if (drummerPrefixMatch) {
    const [, slug] = drummerPrefixMatch;
    const drummer = getDrummerBySlug(slug);
    if (drummer) {
      const brands = getPrimaryBrands(drummer.gear);
      const brandsText = brands.length > 0 ? brands.join(', ') : 'pro gear';
      const override = DRUMMER_META_OVERRIDES[slug];
      const bandText = drummer.band ? `${drummer.band} ` : '';
      const allArticles = Object.values(ALBUM_ARTICLES);
      const relatedArticles = allArticles
        .filter(a => a.drummerId === drummer.id || (a.relatedDrummers || []).includes(drummer.id) || a.relatedDrummerSlug === slug)
        .slice(0, 3);
      return {
        title: override?.title || `${drummer.name} Drum Kit & Gear Setup | ${SITE_NAME}`,
        description: truncate(
          override?.description ||
            `What drum kit does ${drummer.name} play? The ${bandText}drummer's ${brandsText} setup — full gear breakdown with videos, specs, and prices.`,
          160
        ),
        subheading: `${drummer.name} Drum Kit, Gear & Setup`,
        image: `${BASE_URL}/api/card/${slug}?format=twitter`,
        type: 'profile',
        url: `${BASE_URL}/drummer/${slug}`,
        ssrLinks: relatedArticles.length > 0 ? relatedArticles.map(a => ({
          href: `/articles/${a.slug}`,
          label: a.title,
        })) : null,
        breadcrumbSchema: [
          { name: 'Home', url: BASE_URL },
          { name: 'Drummers', url: `${BASE_URL}/drummers` },
          { name: drummer.name, url: `${BASE_URL}/drummer/${slug}` },
        ],
        articleSchema: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Person',
              name: drummer.name,
              jobTitle: 'Drummer',
              url: `${BASE_URL}/drummer/${slug}`,
              image: `${BASE_URL}/api/card/${slug}?format=twitter`,
              ...(drummer.band ? { memberOf: { '@type': 'MusicGroup', name: drummer.band } } : {}),
              sameAs: [
                `https://en.wikipedia.org/wiki/${encodeURIComponent(drummer.name.replace(/ /g, '_'))}`,
              ],
              knowsAbout: ['Drumming', 'Metal Music', 'Percussion'],
            },
            {
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: `What drum kit does ${drummer.name} play?`,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: brands.length > 0
                      ? `${drummer.name} plays a ${brands.join(' and ')} drum kit. See the full gear setup on MetalForge.`
                      : `${drummer.name} plays a professional drum kit. See the full gear setup on MetalForge.`,
                  },
                },
                {
                  '@type': 'Question',
                  name: `What cymbals does ${drummer.name} use?`,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: `${drummer.name}'s cymbal setup includes gear from their complete MetalForge profile.`,
                  },
                },
                {
                  '@type': 'Question',
                  name: `What band is ${drummer.name} in?`,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: drummer.band
                      ? `${drummer.name} is the drummer of ${drummer.band}.`
                      : `${drummer.name} has performed with multiple bands. See their full career history.`,
                  },
                },
              ],
            },
          ],
        }),
      };
    }
  }

  // Issue #1379 / #2403: /gear/<brand>/<series>/drummers-using
  // #2403 (split 1/4 of #2215): kits in DRUMMERS_BY_KIT get purchase-intent title + ItemList + FAQPage JSON-LD.
  const gearSeriesDrummersMatch = path.match(/^\/gear\/([a-z0-9-]+)\/([a-z0-9-]+)\/drummers-using$/);
  if (gearSeriesDrummersMatch) {
    const [, brandSlug, seriesSlug] = gearSeriesDrummersMatch;
    const slugify = (str) => String(str).toLowerCase().replace(/['"]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const toDisplay = (slug) => slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    let brandName = toDisplay(brandSlug);
    let seriesName = toDisplay(seriesSlug);
    outer: for (const [brand, seriesObj] of Object.entries(GEAR_INDEX)) {
      if (slugify(brand) !== brandSlug) continue;
      for (const series of Object.keys(seriesObj)) {
        if (slugify(series) === seriesSlug) {
          brandName = brand;
          seriesName = series;
          break outer;
        }
      }
    }

    const pageUrl = `${BASE_URL}/gear/${brandSlug}/${seriesSlug}/drummers-using`;
    const kitKey = `${brandSlug}/${seriesSlug}`;
    const kitDrummers = DRUMMERS_BY_KIT[kitKey] || null;

    if (kitDrummers !== null) {
      // Issue #2403: purchase-intent title format + ItemList + FAQPage JSON-LD.
      const firstDrummer = kitDrummers[0];
      const drummerNames = kitDrummers.map(d => d.name);
      const description = firstDrummer
        ? `See which pro metal drummers use the ${brandName} ${seriesName} — including ${firstDrummer.name} (${firstDrummer.band}). Full gear configs, endorsement info, and years used.`
        : `Discover which professional metal drummers use the ${brandName} ${seriesName}. Full list of artists, complete gear setups, and equipment endorsements.`;

      const itemList = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: `Metal Drummers Who Use ${brandName} ${seriesName}`,
        description,
        url: pageUrl,
        numberOfItems: kitDrummers.length,
        itemListElement: kitDrummers.map((d, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${BASE_URL}/drummer/${d.slug}`,
          name: d.name,
        })),
      };

      const faqPage = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `Which metal drummers use the ${brandName} ${seriesName}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: drummerNames.length > 0
                ? `Notable metal drummers who use the ${brandName} ${seriesName} include ${drummerNames.join(', ')}.`
                : `The ${brandName} ${seriesName} is trusted by professional metal drummers for its tone and durability.`,
            },
          },
          {
            '@type': 'Question',
            name: `Is the ${brandName} ${seriesName} good for metal drumming?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Yes — the ${brandName} ${seriesName} is used by top professional metal drummers for its durability, projection, and performance at extreme tempos.`,
            },
          },
          {
            '@type': 'Question',
            name: `Do ${brandName} ${seriesName} drummers have official endorsements?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: kitDrummers.some(d => d.endorsee)
                ? `Yes. ${kitDrummers.filter(d => d.endorsee).map(d => d.name).join(' and ')} are official ${brandName} endorsees.`
                : `Several drummers using the ${brandName} ${seriesName} are professional-level artists who rely on this kit on stage and in the studio.`,
            },
          },
        ],
      };

      return {
        title: `${seriesName} Drummers — Which Metal Drummers Use ${brandName} ${seriesName}? | ${SITE_NAME}`,
        description,
        image: DEFAULT_IMAGE,
        type: 'website',
        url: pageUrl,
        articleSchema: JSON.stringify([itemList, faqPage]),
        breadcrumbSchema: [
          { name: 'Home', url: BASE_URL },
          { name: 'Gear', url: `${BASE_URL}/gear` },
          { name: brandName, url: `${BASE_URL}/gear/${brandSlug}` },
          { name: `${seriesName} Drummers`, url: pageUrl },
        ],
      };
    }

    return {
      title: `${brandName} ${seriesName} — Metal Drummers Who Use This Gear | ${SITE_NAME}`,
      description: `Discover which professional metal drummers use ${brandName} ${seriesName}. Full list of artists, complete gear setups, and equipment endorsements.`,
      image: DEFAULT_IMAGE,
      type: 'website',
      url: pageUrl,
      articleSchema: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `Metal Drummers Who Use ${brandName} ${seriesName}`,
        description: `Professional metal drummers who use ${brandName} ${seriesName}`,
        url: pageUrl,
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
            { '@type': 'ListItem', position: 2, name: 'Gear', item: `${BASE_URL}/gear` },
            { '@type': 'ListItem', position: 3, name: brandName, item: `${BASE_URL}/gear/${brandSlug}` },
            { '@type': 'ListItem', position: 4, name: `${brandName} ${seriesName} Drummers`, item: `${BASE_URL}/gear/${brandSlug}/${seriesSlug}/drummers-using` },
          ],
        },
      }),
    };
  }

  // Issue #1579: /bpm and /bpm-tap — BPM Tap Calculator + Metal Songs BPM Database
  if (path === '/bpm' || path === '/bpm-tap') {
    return {
      title: `Metal BPM Calculator — Tap & Find Tempo | Metal Songs Database | ${SITE_NAME}`,
      description: 'Tap to find the BPM of any metal song. Browse 150+ metal songs by tempo — from doom to grindcore. Used by metal drummers to find and match tempos.',
      image: DEFAULT_IMAGE,
      type: 'website',
      url: `${BASE_URL}/bpm`,
      articleSchema: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'MetalForge BPM Tap Calculator',
        description: 'Tap to calculate BPM of any metal song. Browse 150+ metal songs sorted by tempo.',
        url: `${BASE_URL}/bpm`,
        applicationCategory: 'MusicApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        publisher: { '@type': 'Organization', name: 'MetalForge', url: BASE_URL },
      }),
      breadcrumbSchema: [
        { name: 'Home', url: BASE_URL },
        { name: 'BPM Calculator', url: `${BASE_URL}/bpm` },
      ],
    };
  }

  // Default fallback
  return {
    title: `${SITE_NAME} — Metal Drummer Gear Database`,
    description: DEFAULT_DESCRIPTION,
    image: DEFAULT_IMAGE,
    type: 'website',
    url: `${BASE_URL}${pathname}`,
  };
}

// Generate Article schema JSON-LD (Issue #777)
function generateArticleSchema(meta) {
  if (!meta.articleSchema) return '';

  // Support pre-serialized JSON-LD strings (e.g. CollectionPage, DefinedTerm types)
  if (typeof meta.articleSchema === 'string') {
    return `
  <!-- Structured Data -->
  <script type="application/ld+json">
${meta.articleSchema}
  </script>`;
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.articleSchema.headline,
    description: meta.articleSchema.description,
    image: [meta.articleSchema.image],
    author: {
      '@type': 'Organization',
      name: meta.articleSchema.author || 'MetalForge',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
        width: 512,
        height: 512,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'MetalForge',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
        width: 512,
        height: 512,
      },
    },
    datePublished: meta.articleSchema.datePublished,
    dateModified: meta.articleSchema.dateModified || meta.articleSchema.datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': meta.url,
    },
    articleSection: meta.articleSchema.articleSection || 'Drummer Gear',
    inLanguage: 'en-US',
  };
  
  // Add keywords if available
  if (meta.articleSchema.keywords && meta.articleSchema.keywords.length > 0) {
    schema.keywords = meta.articleSchema.keywords.join(', ');
  }

  // Issue #1405: about (Person entity) and mentions (MusicGroup)
  if (meta.articleSchema.about) {
    schema.about = meta.articleSchema.about;
  }
  if (meta.articleSchema.mentions) {
    schema.mentions = meta.articleSchema.mentions;
  }

  return `
  <!-- Article Structured Data (Issue #777) -->
  <script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
  </script>`;
}

// Generate FAQPage JSON-LD (Issue #1267)
function generateFaqSchema(meta) {
  if (!meta.faqSchema || !meta.faqSchema.length) return '';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: meta.faqSchema.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return `
  <!-- FAQPage Structured Data (Issue #1267) -->
  <script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
  </script>`;
}

// Generate SpeakableSpecification JSON-LD (Issue #1403)
function generateSpeakableSchema(meta) {
  if (!meta.speakableSchema) return '';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.article-lead', '.key-fact'],
  };

  return `
  <!-- SpeakableSpecification Structured Data (Issue #1403) -->
  <script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
  </script>`;
}

// Generate BreadcrumbList JSON-LD (Issue #1189)
function generateBreadcrumbSchema(meta) {
  if (!meta.breadcrumbSchema || !meta.breadcrumbSchema.length) return '';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: meta.breadcrumbSchema.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return `
  <!-- BreadcrumbList Structured Data (Issue #1189) -->
  <script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
  </script>`;
}

// Generate HTML with meta tags
function generateMetaHtml(meta, originalUrl) {
  const articleSchemaScript = generateArticleSchema(meta);
  const breadcrumbSchemaScript = generateBreadcrumbSchema(meta);
  const faqSchemaScript = generateFaqSchema(meta);
  const speakableSchemaScript = generateSpeakableSchema(meta);
  
  return `<!DOCTYPE html>
<html lang="en" prefix="og: https://ogp.me/ns#">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  
  <!-- Primary Meta Tags -->
  <title>${meta.title}</title>
  <meta name="title" content="${meta.title}">
  <meta name="description" content="${meta.description}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="${meta.type}">
  <meta property="og:url" content="${meta.url}">
  <meta property="og:site_name" content="${SITE_NAME}">
  <meta property="og:title" content="${meta.title}">
  <meta property="og:description" content="${meta.description}">
  <meta property="og:image" content="${meta.image}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${meta.title}">
  ${meta.type === 'article' ? `
  <!-- Article-specific Open Graph -->
  <meta property="article:author" content="MetalForge">
  <meta property="article:publisher" content="${BASE_URL}">
  ${meta.articleSchema?.datePublished ? `<meta property="article:published_time" content="${meta.articleSchema.datePublished}">` : ''}
  ${meta.articleSchema?.dateModified ? `<meta property="article:modified_time" content="${meta.articleSchema.dateModified}">` : ''}
  ${meta.articleSchema?.articleSection ? `<meta property="article:section" content="${meta.articleSchema.articleSection}">` : ''}
  ` : ''}
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="${TWITTER_HANDLE}">
  <meta name="twitter:creator" content="${TWITTER_HANDLE}">
  <meta name="twitter:title" content="${meta.title}">
  <meta name="twitter:description" content="${meta.description}">
  <meta name="twitter:image" content="${meta.image}">
  <meta name="twitter:image:alt" content="${meta.title}">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="${meta.url}">
  
  <!-- Favicon -->
  <link rel="icon" href="${BASE_URL}/favicon.ico">
  
  <!-- Theme Color -->
  <meta name="theme-color" content="#dc2626">
  ${articleSchemaScript}
  ${breadcrumbSchemaScript}
  ${faqSchemaScript}
  ${speakableSchemaScript}
  <!-- Redirect browsers to actual SPA -->
  <noscript>
    <meta http-equiv="refresh" content="0; url=${originalUrl}">
  </noscript>
  <script>
    // Redirect if not a crawler
    if (!/bot|crawl|spider|facebook|twitter|linkedin|whatsapp|slack|discord|telegram|pinterest/i.test(navigator.userAgent)) {
      window.location.replace("${originalUrl}");
    }
  </script>
</head>
<body>
  <main style="font-family: system-ui, sans-serif; max-width: 600px; margin: 40px auto; padding: 20px;">
    <h1>${meta.title}</h1>
    ${meta.subheading ? `<h2>${meta.subheading}</h2>` : ''}
    <p>${meta.description}</p>
    ${meta.ssrLinks && meta.ssrLinks.length > 0 ? `
    <nav aria-label="Gear Deep Dives &amp; Articles">
      <h2>Gear Deep Dives &amp; Articles</h2>
      <ul>${meta.ssrLinks.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join('')}</ul>
    </nav>` : ''}
    ${meta.ssrDrummerLinks && meta.ssrDrummerLinks.length > 0 ? `
    <section>
      <h2>Metal Drummers Who Use This Gear</h2>
      <ul>${meta.ssrDrummerLinks.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join('')}</ul>
    </section>` : ''}
    <p><a href="${meta.url}">Visit MetalForge →</a></p>
  </main>
</body>
</html>`;
}

export default function handler(req, res) {
  // Get the path from the catchall segments
  const pathSegments = req.query.path || [];
  const pathname = '/' + (Array.isArray(pathSegments) ? pathSegments.join('/') : pathSegments);
  
  // Build the original URL for redirect
  const originalUrl = `${BASE_URL}${pathname}`;
  
  // Generate meta tags
  const meta = getMetaForPath(pathname);
  
  // Set response headers
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  
  // Return HTML
  res.status(200).send(generateMetaHtml(meta, originalUrl));
}
