/**
 * Dynamic Meta Tags API Endpoint
 * Issue #769: Add Rich Social Meta Tags (Open Graph + Twitter Cards) to All Pages
 * 
 * Serves HTML with proper Open Graph and Twitter Card meta tags for social crawlers.
 * This enables rich link previews when sharing MetalForge links on social platforms.
 */

import { drummers } from '../drummers/index.js';
import { genres as GENRES } from '../../packages/frontend/data/genres.js';

const BASE_URL = 'https://metalforge.io';
const SITE_NAME = 'MetalForge';
const TWITTER_HANDLE = '@MetalDrumGear';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;
const DEFAULT_DESCRIPTION = 'Explore the drum kits, cymbals, and gear used by legendary metal drummers. Discover what Lars Ulrich, Joey Jordison, Dave Lombardo and 60+ pro drummers play.';

// Helper: Get drummer by slug
function getDrummerBySlug(slug) {
  // Normalize slug for matching
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

// Helper: Truncate text to max length
function truncate(text, maxLength) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

// Generate meta tags for different page types
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

  // Quiz result (dynamic OG image)
  const quizResultMatch = path.match(/^\/quiz\/result\??(.*)/);
  if (quizResultMatch || path.startsWith('/quiz/result')) {
    return {
      title: `My Metal Drummer Match! 🤘 | ${SITE_NAME}`,
      description: 'I just discovered which legendary metal drummer matches my style! Take the quiz and find your match.',
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
      description: 'Browse 60+ legendary metal drummers and explore their complete gear setups. From Lars Ulrich to George Kollias, discover what the pros play.',
      image: DEFAULT_IMAGE,
      type: 'website',
      url: `${BASE_URL}/drummers`,
    };
  }

  // Compare page
  if (path === '/compare' || path.startsWith('/compare')) {
    return {
      title: `Drummer Gear Comparison Tool | ${SITE_NAME}`,
      description: 'Compare drum setups side-by-side. See how your favorite metal drummers\' gear stacks up against each other.',
      image: `${BASE_URL}/images/og/compare-preview.png`,
      type: 'website',
      url: `${BASE_URL}/compare`,
    };
  }

  // VS comparison pages
  const vsMatch = path.match(/^\/vs\/([a-z0-9-]+)-vs-([a-z0-9-]+)$/);
  if (vsMatch) {
    const [, slug1, slug2] = vsMatch;
    const drummer1 = getDrummerBySlug(slug1);
    const drummer2 = getDrummerBySlug(slug2);
    
    if (drummer1 && drummer2) {
      return {
        title: `${drummer1.name} vs ${drummer2.name} — Gear Comparison | ${SITE_NAME}`,
        description: `Compare ${drummer1.name} (${drummer1.band}) vs ${drummer2.name} (${drummer2.band}) — drums, cymbals, hardware side-by-side.`,
        image: `${BASE_URL}/api/og/compare?d1=${slug1}&d2=${slug2}`,
        type: 'article',
        url: `${BASE_URL}/vs/${slug1}-vs-${slug2}`,
      };
    }
  }

  // Tools hub
  if (path === '/tools') {
    return {
      title: `Drummer Tools & Calculators | ${SITE_NAME}`,
      description: 'Free tools for drummers: BPM calculator, kit builder, gear comparison, name generator, and more. Level up your drumming!',
      image: `${BASE_URL}/images/og/tools-preview.png`,
      type: 'website',
      url: `${BASE_URL}/tools`,
    };
  }

  // Specific tools
  const toolMatch = path.match(/^\/tools\/([a-z0-9-]+)$/);
  if (toolMatch) {
    const [, toolSlug] = toolMatch;
    const toolMeta = {
      'bpm-calculator': {
        title: 'BPM Tap Tempo Calculator',
        description: 'Find the tempo of any song by tapping along. Perfect for drummers learning new tracks.',
      },
      'kit-builder': {
        title: 'Virtual Drum Kit Builder',
        description: 'Build your dream drum kit piece by piece. Select shells, cymbals, hardware, and see the total cost.',
      },
      'name-generator': {
        title: 'Metal Drummer Name Generator',
        description: 'Generate your brutal metal drummer stage name! Perfect for bands, social media, or just for fun.',
      },
      'gear-finder': {
        title: 'Gear Finder Tool',
        description: 'Find which drummers use specific gear. Search by brand, model, or category.',
      },
    };
    
    const tool = toolMeta[toolSlug] || { title: 'Drummer Tool', description: 'Useful tool for metal drummers.' };
    return {
      title: `${tool.title} | ${SITE_NAME}`,
      description: tool.description,
      image: `${BASE_URL}/images/og/tools-preview.png`,
      type: 'website',
      url: `${BASE_URL}/tools/${toolSlug}`,
    };
  }

  // Techniques hub
  if (path === '/techniques') {
    return {
      title: `Metal Drumming Techniques — Master the Skills | ${SITE_NAME}`,
      description: 'Learn essential metal drumming techniques: blast beats, double bass, polyrhythms, and more. Tips from the pros.',
      image: `${BASE_URL}/images/og/techniques-preview.png`,
      type: 'website',
      url: `${BASE_URL}/techniques`,
    };
  }

  // Specific technique
  const techniqueMatch = path.match(/^\/techniques\/([a-z0-9-]+)$/);
  if (techniqueMatch) {
    const [, techniqueSlug] = techniqueMatch;
    const techniqueName = techniqueSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return {
      title: `${techniqueName} Technique Guide | ${SITE_NAME}`,
      description: `Master the ${techniqueName.toLowerCase()} technique with tips from legendary metal drummers. Step-by-step guide with video examples.`,
      image: `${BASE_URL}/images/og/techniques-preview.png`,
      type: 'article',
      url: `${BASE_URL}/techniques/${techniqueSlug}`,
    };
  }

  // Brand pages
  const brandMatch = path.match(/^\/brands\/([a-z0-9-]+)$/);
  if (brandMatch) {
    const [, brandSlug] = brandMatch;
    const brandName = brandSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return {
      title: `${brandName} — Drummers Who Use ${brandName} | ${SITE_NAME}`,
      description: `Discover which legendary metal drummers use ${brandName} gear. See their complete setups and endorsement details.`,
      image: `${BASE_URL}/images/og/brand-${brandSlug}.png`,
      type: 'website',
      url: `${BASE_URL}/brands/${brandSlug}`,
    };
  }

  // Genres hub
  if (path === '/genres') {
    return {
      title: `Metal Genres — Explore Drumming by Genre | ${SITE_NAME}`,
      description: 'Explore metal drumming by genre. From thrash and death to progressive and metalcore — discover the drummers and gear that define each style.',
      image: DEFAULT_IMAGE,
      type: 'website',
      url: `${BASE_URL}/genres`,
      articleSchema: [
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Metal Drummer Genres — Gear & Setups by Style',
          url: `${BASE_URL}/genres`,
          description: 'Explore metal drumming by genre: thrash, death, black, progressive, nu-metal, groove, metalcore, and hardcore. Discover the drummers and gear that define each style.',
        },
      ],
    };
  }

  // Genre pages
  const genreMatch = path.match(/^\/genre\/([a-z0-9-]+)$/);
  if (genreMatch) {
    const [, genreSlug] = genreMatch;
    const genreData = GENRES[genreSlug];
    const genreName = genreData
      ? genreData.name
      : genreSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const faqItems = genreData?.faq || [];
    const articleSchema = [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `${genreName} Drummers — Gear & Setups`,
        url: `${BASE_URL}/genre/${genreSlug}`,
        description: `Explore ${genreName.toLowerCase()} drummers and their complete gear setups on MetalForge.`,
      },
    ];
    if (faqItems.length > 0) {
      articleSchema.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      });
    }
    return {
      title: `${genreName} Drummers — Gear & Setups | ${SITE_NAME}`,
      description: `Explore ${genreName.toLowerCase()} drummers and their gear. From icons to rising stars, see what powers the ${genreName.toLowerCase()} sound.`,
      image: DEFAULT_IMAGE,
      type: 'website',
      url: `${BASE_URL}/genre/${genreSlug}`,
      articleSchema,
    };
  }

  // Sound-like guides
  const soundLikeMatch = path.match(/^\/sound-like\/([a-z0-9-]+)$/);
  if (soundLikeMatch) {
    const [, drummerSlug] = soundLikeMatch;
    const drummer = getDrummerBySlug(drummerSlug);
    if (drummer) {
      return {
        title: `How to Sound Like ${drummer.name} | ${SITE_NAME}`,
        description: `Get the ${drummer.band} sound! Complete gear guide and technique tips to achieve ${drummer.name}'s legendary drum tone.`,
        image: `${BASE_URL}/api/og/guide?drummer=${drummerSlug}`,
        type: 'article',
        url: `${BASE_URL}/sound-like/${drummerSlug}`,
      };
    }
  }

  // Beginner guide
  if (path === '/beginner-guide') {
    const articleSchema = [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: "Metal Drumming Beginner's Guide",
        url: `${BASE_URL}/beginner-guide`,
        description: 'Start your metal drumming journey! Essential gear recommendations, technique basics, and tips from legendary drummers.',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What gear does a beginner metal drummer need?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A beginner metal drummer needs a drum kit (acoustic or electronic), drumsticks (5A or 5B nylon-tip work well), a practice pad, a metronome, and hearing protection. An acoustic kit should include a bass drum, snare, hi-hat, crash, and ride cymbal as a minimum setup.',
            },
          },
          {
            '@type': 'Question',
            name: 'How long does it take to learn metal drumming?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'With consistent daily practice (30–60 minutes), most beginners can play basic metal beats within 3–6 months. Mastering double bass technique, blast beats, and complex polyrhythms typically takes 2–4 years of dedicated practice.',
            },
          },
          {
            '@type': 'Question',
            name: 'What drumsticks are best for beginner metal drummers?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Beginner metal drummers typically start with 5A or 5B drumsticks. 5B sticks are slightly thicker and heavier, offering more power for metal playing. Nylon tips provide a brighter cymbal sound and are more durable than wood tips.',
            },
          },
          {
            '@type': 'Question',
            name: 'Should a beginner metal drummer get an acoustic or electronic drum kit?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Electronic kits are ideal for beginners with space or noise constraints — they are quieter, require less tuning, and often include practice features. Acoustic kits give a more authentic feel and response. If space and neighbors allow, an entry-level acoustic kit provides the best learning experience for metal drumming.',
            },
          },
        ],
      },
    ];
    return {
      title: `Metal Drumming Beginner's Guide | ${SITE_NAME}`,
      description: 'Start your metal drumming journey! Essential gear recommendations, technique basics, and tips from legendary drummers.',
      image: `${BASE_URL}/images/og/beginner-guide-preview.png`,
      type: 'article',
      url: `${BASE_URL}/beginner-guide`,
      articleSchema,
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
      articleSchema: [
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `Drummer Gear Cards Gallery | ${SITE_NAME}`,
          url: `${BASE_URL}/cards`,
          description: 'Beautiful shareable gear cards for every drummer. Download and share on Instagram, Twitter, and more!',
        },
      ],
    };
  }

  // Drummer profile pages (root slug like /joey-jordison)
  const drummerMatch = path.match(/^\/([a-z0-9-]+)$/);
  if (drummerMatch) {
    const [, slug] = drummerMatch;
    const drummer = getDrummerBySlug(slug);
    
    if (drummer) {
      const brands = getPrimaryBrands(drummer.gear);
      const brandsText = brands.length > 0 ? brands.join(', ') : 'pro gear';
      
      return {
        title: `${drummer.name} — Complete Gear Setup | ${SITE_NAME}`,
        description: truncate(
          `Explore ${drummer.name}'s complete drum setup: ${brandsText}. ${drummer.band} legend's gear breakdown with videos, specs, and prices.`,
          160
        ),
        image: `${BASE_URL}/api/card/${slug}?format=twitter`,
        type: 'profile',
        url: `${BASE_URL}/${slug}`,
      };
    }
  }

  // Drummer profile with /drummer/ prefix
  const drummerPrefixMatch = path.match(/^\/drummer\/([a-z0-9-]+)$/);
  if (drummerPrefixMatch) {
    const [, slug] = drummerPrefixMatch;
    const drummer = getDrummerBySlug(slug);
    
    if (drummer) {
      const brands = getPrimaryBrands(drummer.gear);
      const brandsText = brands.length > 0 ? brands.join(', ') : 'pro gear';
      
      return {
        title: `${drummer.name} — Complete Gear Setup | ${SITE_NAME}`,
        description: truncate(
          `Explore ${drummer.name}'s complete drum setup: ${brandsText}. ${drummer.band} legend's gear breakdown with videos, specs, and prices.`,
          160
        ),
        image: `${BASE_URL}/api/card/${slug}?format=twitter`,
        type: 'profile',
        url: `${BASE_URL}/${slug}`,
      };
    }
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

// Generate HTML with meta tags
function generateMetaHtml(meta) {
  const schemaBlock = meta.articleSchema
    ? `\n  <script type="application/ld+json">\n  ${JSON.stringify(meta.articleSchema, null, 2)}\n  </script>`
    : '';
  return `<!DOCTYPE html>
<html lang="en">
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
  <meta name="theme-color" content="#dc2626">${schemaBlock}

  <!-- Redirect to actual page for browsers -->
  <meta http-equiv="refresh" content="0; url=${meta.url}">
  <script>window.location.href = "${meta.url}";</script>
</head>
<body>
  <p>Redirecting to <a href="${meta.url}">${meta.title}</a>...</p>
</body>
</html>`;
}

export default function handler(req, res) {
  // Get path from query parameter
  const pathname = req.query.path || '/';
  
  // Generate meta tags for the path
  const meta = getMetaForPath(pathname);
  
  // Set response headers
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  
  // Return HTML with meta tags
  res.status(200).send(generateMetaHtml(meta));
}
