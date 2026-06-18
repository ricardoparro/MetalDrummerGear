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
import { getTechniqueBySlug } from '../../packages/frontend/data/techniques.js';
// Issue #1209: lick page SSR meta for /licks, /drummers/<slug>/licks, /drummers/<slug>/licks/<slug>.
import SIGNATURE_LICKS from '../../packages/frontend/data/licks/index.js';
// Issue #1210: top-10 list page SSR meta for /lists/<slug>.
import { TOP_10_LISTS } from '../../packages/frontend/data/top10Lists.js';

const BASE_URL = 'https://metalforge.io';
const SITE_NAME = 'MetalForge';
const TWITTER_HANDLE = '@MetalDrumGear';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;
const DEFAULT_DESCRIPTION = 'Explore the drum kits, cymbals, and gear used by legendary metal drummers. Discover what Lars Ulrich, Joey Jordison, Dave Lombardo and 60+ pro drummers play.';

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
      };
    }
  }

  // Tools hub
  if (path === '/tools') {
    return {
      title: `Drummer Tools & Calculators | ${SITE_NAME}`,
      description: 'Free tools for drummers: BPM calculator, kit builder, gear comparison, name generator, and more.',
      image: `${BASE_URL}/images/og/tools-preview.png`,
      type: 'website',
      url: `${BASE_URL}/tools`,
    };
  }

  // Sound-like guides: /guides/how-to-sound-like-<drummer-slug>
  const soundLikeMatch = path.match(/^\/guides\/(how-to-sound-like-([a-z0-9-]+))$/);
  if (soundLikeMatch) {
    const drummerSlug = soundLikeMatch[2];
    const drummer = getDrummerBySlug(drummerSlug);
    if (drummer) {
      return {
        title: `How to Sound Like ${drummer.name} — Drum Gear & Setup Guide | ${SITE_NAME}`,
        description: `Replicate ${drummer.name}'s ${drummer.band} drum sound. Gear list, settings, and technique tips to get that signature tone.`,
        type: 'article',
        url: `${BASE_URL}/guides/${soundLikeMatch[1]}`,
      };
    }
  }

  // Beginner guide and other /guides/<slug> pages
  const guidesMatch = path.match(/^\/guides\/([a-z0-9-]+)$/);
  if (guidesMatch) {
    return {
      title: `Metal Drumming Guide | ${SITE_NAME}`,
      description: 'Essential guide for metal drummers covering gear, technique, and setup.',
      type: 'article',
      url: `${BASE_URL}/guides/${guidesMatch[1]}`,
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

  // Gear news
  if (path === '/gear-news') {
    return {
      title: `Metal Drum Gear News & Updates | ${SITE_NAME}`,
      description: 'Latest news about metal drumming gear: new product releases, artist announcements, and industry updates.',
      image: `${BASE_URL}/images/og/news-preview.png`,
      type: 'website',
      url: `${BASE_URL}/gear-news`,
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
          '@type': 'Article',
          headline: `${technique.title} — Metal Drumming Technique`,
          description: truncate(technique.description, 250),
          url: `${BASE_URL}/technique/${slug}`,
          publisher: { '@type': 'Organization', name: 'MetalForge', url: BASE_URL },
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

  // Guess the Kit - Issue #799
  if (path === '/guess-the-kit') {
    return {
      title: `Guess the Kit — Metal Drummer Trivia Game | ${SITE_NAME}`,
      description: 'Test your metal gear knowledge! Can you identify which legendary drummer owns this kit? Daily challenges with shareable results.',
      image: `${BASE_URL}/images/og/guess-the-kit-preview.png`,
      type: 'website',
      url: `${BASE_URL}/guess-the-kit`,
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
        },
        breadcrumbSchema: [
          { name: 'Home', url: BASE_URL },
          { name: 'Articles', url: `${BASE_URL}/articles` },
          { name: album.title, url: `${BASE_URL}/articles/${articleSlug}` },
        ],
        faqSchema: Array.isArray(album.faq) && album.faq.length > 0 ? album.faq : null,
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

  // Articles hub
  if (path === '/articles') {
    return {
      title: `Drum Gear Articles & Guides | ${SITE_NAME}`,
      description: 'In-depth articles about metal drummer gear, album recording setups, and equipment breakdowns.',
      image: DEFAULT_IMAGE,
      type: 'website',
      url: `${BASE_URL}/articles`,
    };
  }

  // Issue #1172: /bands/<slug> — band-specific SSR title + description
  // Issue #1307: FAQPage JSON-LD for band pages
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
      return {
        title: band.metaTitle || `${band.name} — Drummer, Drum Kit & Gear | ${SITE_NAME}`,
        description: truncate(
          band.metaDescription ||
            `${band.name}${drummerName ? ` drummer ${drummerName}` : ''}: full lineup, drum gear, and discography. ${band.genres?.join(', ') || 'Metal'} band breakdown.`,
          160
        ),
        image: DEFAULT_IMAGE,
        type: 'profile',
        url: `${BASE_URL}/bands/${bandMatch[1]}`,
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
    };
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
        '@type': 'CollectionPage',
        name: 'Signature Metal Drum Licks',
        description: 'Master the signature drum licks of 60+ metal legends. Step-by-step breakdowns of blast beats, double bass patterns, and iconic fills from George Kollias, Joey Jordison, and more.',
        url: `${BASE_URL}/licks`,
        publisher: { '@type': 'Organization', name: 'MetalForge', url: BASE_URL },
      }),
      breadcrumbSchema: [
        { name: 'Home', url: BASE_URL },
        { name: 'Signature Drum Licks', url: `${BASE_URL}/licks` },
      ],
    };
  }

  // Issue #1209: /drummers/<slug>/licks per-drummer hub
  const drummerLicksHubMatch = path.match(/^\/drummers\/([a-z0-9-]+)\/licks$/);
  if (drummerLicksHubMatch) {
    const [, drummerSlug] = drummerLicksHubMatch;
    const anyLick = Object.values(SIGNATURE_LICKS).find(l => l.drummerSlug === drummerSlug);
    if (anyLick) {
      return {
        title: `${anyLick.drummerName} Signature Drum Licks & Patterns | ${SITE_NAME}`,
        description: `Learn the signature drum licks of ${anyLick.drummerName} (${anyLick.band}). Step-by-step breakdowns of iconic patterns and fills.`,
        image: DEFAULT_IMAGE,
        type: 'website',
        url: `${BASE_URL}/drummers/${drummerSlug}/licks`,
        articleSchema: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${anyLick.drummerName} Signature Drum Licks`,
          description: `Learn the signature drum licks of ${anyLick.drummerName} (${anyLick.band}).`,
          url: `${BASE_URL}/drummers/${drummerSlug}/licks`,
          publisher: { '@type': 'Organization', name: 'MetalForge', url: BASE_URL },
        }),
        breadcrumbSchema: [
          { name: 'Home', url: BASE_URL },
          { name: 'Drum Licks', url: `${BASE_URL}/licks` },
          { name: `${anyLick.drummerName}`, url: `${BASE_URL}/drummers/${drummerSlug}` },
          { name: 'Licks', url: `${BASE_URL}/drummers/${drummerSlug}/licks` },
        ],
      };
    }
  }

  // Issue #1209: /drummers/<slug>/licks/<lick-slug> individual lick page
  const lickPageMatch = path.match(/^\/drummers\/([a-z0-9-]+)\/licks\/([a-z0-9-]+)$/);
  if (lickPageMatch) {
    const [, drummerSlug, lickSlug] = lickPageMatch;
    const lick = SIGNATURE_LICKS[lickSlug];
    if (lick) {
      return {
        title: `${lick.name} — ${lick.drummerName} (${lick.band}) Drum Lick | ${SITE_NAME}`,
        description: `Learn the ${lick.name} drum lick by ${lick.drummerName} of ${lick.band}. From ${lick.song} (${lick.album}). ${lick.description.slice(0, 100)}...`,
        image: DEFAULT_IMAGE,
        type: 'article',
        url: `${BASE_URL}/drummers/${drummerSlug}/licks/${lickSlug}`,
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

  // Issue #1301: /gear hub
  if (path === '/gear') {
    return {
      title: `Metal Drummer Gear Database — Cymbals, Drums, Pedals & More | ${SITE_NAME}`,
      description: 'Browse gear used by 60+ legendary metal drummers. Cymbals, snares, drum kits, pedals, sticks, and hardware — filter by brand and drummer.',
      image: DEFAULT_IMAGE,
      type: 'website',
      url: `${BASE_URL}/gear`,
    };
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
      return {
        title: `Best ${catMeta.name} for Metal — What the Pros Use | ${SITE_NAME}`,
        description: catMeta.description,
        image: DEFAULT_IMAGE,
        type: 'website',
        url: `${BASE_URL}/gear/${catSlug}`,
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
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
            { '@type': 'ListItem', position: 2, name: drummer.name, item: `${BASE_URL}/${drummerSlug}` },
            { '@type': 'ListItem', position: 3, name: categoryLabel, item: `${BASE_URL}/drummer/${drummerSlug}/${category}` },
          ],
        }),
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
