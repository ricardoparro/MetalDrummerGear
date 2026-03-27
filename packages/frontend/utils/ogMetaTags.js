/**
 * Open Graph Meta Tags Utility
 * Issue #672: Centralized OG tag management for better social sharing
 * 
 * This module provides consistent Open Graph and Twitter Card meta tags
 * across all pages for improved social media sharing.
 */

import { Platform } from 'react-native';

// Default OG image for the site
const DEFAULT_OG_IMAGE = 'https://metalforge.io/og-image.png';
const SITE_NAME = 'MetalForge';
const TWITTER_HANDLE = '@MetalDrumGear';
const BASE_URL = 'https://metalforge.io';

/**
 * Set a meta tag in the document head
 * @param {string} name - Meta tag name or property
 * @param {string} content - Meta tag content
 * @param {boolean} isProperty - If true, use property attribute instead of name
 */
function setMeta(name, content, isProperty = false) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;
  
  const attr = isProperty ? 'property' : 'name';
  let meta = document.querySelector(`meta[${attr}="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attr, name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

/**
 * Set canonical URL link
 * @param {string} url - Canonical URL
 */
function setCanonical(url) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;
  
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url);
}

/**
 * Update all OG meta tags for a page
 * @param {Object} options - Meta tag options
 * @param {string} options.title - Page title
 * @param {string} options.description - Page description
 * @param {string} options.url - Page URL (relative or absolute)
 * @param {string} [options.image] - OG image URL (defaults to site default)
 * @param {string} [options.type] - OG type (defaults to 'website')
 * @param {string} [options.keywords] - Keywords for the page
 * @param {string} [options.twitterCard] - Twitter card type (defaults to 'summary_large_image')
 * @param {boolean} [options.setTitle] - Whether to set document.title (defaults to true)
 * @param {boolean} [options.setCanonical] - Whether to set canonical URL (defaults to true)
 */
export function updateOgMeta({
  title,
  description,
  url,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  keywords,
  twitterCard = 'summary_large_image',
  setTitle: shouldSetTitle = true,
  setCanonical: shouldSetCanonical = true,
}) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;

  // Normalize URL to absolute
  const absoluteUrl = url.startsWith('http') ? url : `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
  
  // Normalize image URL to absolute
  const absoluteImage = image.startsWith('http') ? image : `${BASE_URL}${image.startsWith('/') ? '' : '/'}${image}`;

  // Set document title
  if (shouldSetTitle) {
    document.title = title;
  }

  // Standard meta tags
  setMeta('description', description);
  if (keywords) {
    setMeta('keywords', keywords);
  }

  // Open Graph tags
  setMeta('og:title', title, true);
  setMeta('og:description', description, true);
  setMeta('og:type', type, true);
  setMeta('og:url', absoluteUrl, true);
  setMeta('og:image', absoluteImage, true);
  setMeta('og:site_name', SITE_NAME, true);

  // Twitter Card tags
  setMeta('twitter:card', twitterCard);
  setMeta('twitter:site', TWITTER_HANDLE);
  setMeta('twitter:title', title);
  setMeta('twitter:description', description);
  setMeta('twitter:image', absoluteImage);

  // Canonical URL
  if (shouldSetCanonical) {
    setCanonical(absoluteUrl);
  }
}

/**
 * Reset meta tags to homepage defaults
 */
export function resetToHomepageMeta() {
  updateOgMeta({
    title: 'MetalForge - Discover What Pro Metal Drummers Play',
    description: 'Explore the drum kits, cymbals, and gear used by legendary metal drummers. Discover what Lars Ulrich, Joey Jordison, Dave Lombardo and 50+ pro drummers play, compare setups, and find your perfect gear.',
    url: '/',
    image: DEFAULT_OG_IMAGE,
    type: 'website',
    keywords: 'metal drummers, drum gear, metal drumming, Lars Ulrich, Joey Jordison, Dave Lombardo, drum kits, cymbals',
  });
}

/**
 * Update OG meta for a drummer profile page
 * @param {Object} drummer - Drummer object
 */
export function updateDrummerMeta(drummer) {
  if (!drummer) return;
  
  const title = `${drummer.name} Drum Kit & Gear Setup | MetalForge`;
  const description = `Explore ${drummer.name}'s complete drum setup: ${drummer.kit || 'drums'}, ${drummer.cymbals || 'cymbals'}, and more. Discover the gear behind ${drummer.band}'s legendary sound.`;
  const slug = drummer.id || drummer.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  
  updateOgMeta({
    title,
    description,
    url: `/drummer/${slug}`,
    image: drummer.image || DEFAULT_OG_IMAGE,
    type: 'profile',
    keywords: `${drummer.name} drum kit, ${drummer.name} gear, ${drummer.band} drummer, ${drummer.name} setup, metal drummer equipment`,
  });
}

/**
 * Update OG meta for a genre page
 * @param {Object} genre - Genre object
 * @param {boolean} isList - Whether this is the genres list page
 */
export function updateGenreMeta(genre, isList = false) {
  if (isList) {
    updateOgMeta({
      title: 'Metal Genres - Explore Thrash, Death, Black, Prog & More | MetalForge',
      description: 'Explore metal subgenres and discover the best drummers in thrash, death, black, progressive, nu-metal, groove, metalcore, and more.',
      url: '/genres',
      keywords: 'metal genres, thrash metal drummers, death metal drummers, black metal drummers, progressive metal drummers',
    });
    return;
  }

  if (!genre) return;

  const title = `${genre.name} Drummers - Gear, Videos & Bio | MetalForge`;
  updateOgMeta({
    title,
    description: genre.description,
    url: `/genre/${genre.slug}`,
    image: genre.image || DEFAULT_OG_IMAGE,
    keywords: genre.keywords?.join(', '),
  });
}

/**
 * Update OG meta for a brand page
 * @param {Object} brand - Brand object
 * @param {boolean} isList - Whether this is the brands list page
 */
export function updateBrandMeta(brand, isList = false) {
  if (isList) {
    updateOgMeta({
      title: 'Metal Drum & Cymbal Brands - Tama, Pearl, Zildjian & More | MetalForge',
      description: 'Explore top drum and cymbal brands used by metal drummers. Discover which legendary drummers play Tama, Pearl, DW, Zildjian, Paiste, Meinl, and Sabian.',
      url: '/brands',
      keywords: 'drum brands, cymbal brands, Tama drums, Pearl drums, Zildjian cymbals, Paiste cymbals, metal drummer equipment',
    });
    return;
  }

  if (!brand) return;

  const title = brand.metaTitle || `${brand.name} Metal Drummers - Who Plays ${brand.name} | MetalForge`;
  const description = brand.metaDescription || brand.description;
  
  updateOgMeta({
    title,
    description,
    url: `/brands/${brand.slug}`,
    image: brand.image || brand.logo || DEFAULT_OG_IMAGE,
    keywords: brand.keywords?.join(', ') || `${brand.name} drums, ${brand.name} metal drummers`,
  });
}

/**
 * Update OG meta for a technique page
 * @param {Object} technique - Technique object (null for index page)
 */
export function updateTechniqueMeta(technique) {
  if (!technique) {
    updateOgMeta({
      title: 'Metal Drumming Techniques - Blast Beats, Double Bass & More | MetalForge',
      description: 'Master metal drumming techniques. Learn blast beats, double bass, gravity blasts, polyrhythms and more. Tutorials, pro tips, and gear recommendations.',
      url: '/techniques',
      keywords: 'metal drumming techniques, blast beat, double bass, gravity blast, polyrhythms, drum tutorial',
    });
    return;
  }

  updateOgMeta({
    title: technique.metaTitle,
    description: technique.metaDescription,
    url: `/techniques/${technique.slug}`,
    type: 'article',
    keywords: technique.seoKeywords?.join(', '),
  });
}

/**
 * Update OG meta for a gear comparison page
 * @param {Object} comparison - Comparison object (null for index page)
 */
export function updateGearComparisonMeta(comparison) {
  if (!comparison) {
    updateOgMeta({
      title: 'Drum Gear Comparisons - Kits, Cymbals & More | MetalForge',
      description: 'Compare drum kits, cymbals, snares, and hardware. Find the perfect gear for your metal drumming setup with our detailed comparisons.',
      url: '/compare',
      keywords: 'drum gear comparison, cymbal comparison, drum kit comparison, metal drummer gear',
    });
    return;
  }

  updateOgMeta({
    title: comparison.metaTitle,
    description: comparison.metaDescription,
    url: `/compare/${comparison.slug}`,
    type: 'article',
  });
}

/**
 * Update OG meta for drummer comparison page
 * @param {Array} drummers - Array of drummer objects being compared
 */
export function updateDrummerComparisonMeta(drummers = []) {
  if (!drummers || drummers.length === 0) {
    updateOgMeta({
      title: 'Compare Drummer Gear | MetalForge',
      description: 'Compare drum kits, cymbals, and gear setups between legendary metal drummers. Side-by-side comparisons of the best in metal.',
      url: '/compare',
      keywords: 'compare drummer gear, drum kit comparison, metal drummer comparison',
    });
    return;
  }

  const names = drummers.map(d => d.name).join(' vs ');
  const title = `${names} Gear Comparison | MetalForge`;
  const description = `Compare the drum gear setups of ${names}. Side-by-side breakdown of kits, cymbals, snares, and hardware.`;
  
  // Build URL with query params
  const params = drummers.map((d, i) => `d${i + 1}=${d.id}`).join('&');
  
  updateOgMeta({
    title,
    description,
    url: `/compare?${params}`,
    keywords: drummers.map(d => `${d.name} gear`).join(', ') + ', drummer comparison',
  });
}

/**
 * Update OG meta for band page
 * @param {Object} band - Band object
 */
export function updateBandPageMeta(band) {
  if (!band) return;

  updateOgMeta({
    title: band.metaTitle,
    description: band.metaDescription,
    url: `/bands/${band.slug}`,
    image: band.image || DEFAULT_OG_IMAGE,
    keywords: band.keywords?.join(', '),
  });
}

/**
 * Update OG meta for spotlights archive page
 */
export function updateSpotlightsMeta() {
  updateOgMeta({
    title: 'Drummer Spotlights Archive | MetalForge',
    description: 'Explore our weekly Drummer Spotlight archive featuring legendary metal drummers, their gear, and what makes them iconic.',
    url: '/spotlights',
    keywords: 'metal drummer spotlight, featured drummers, legendary drummers, weekly spotlight',
  });
}

/**
 * Update OG meta for budget gear page
 */
export function updateBudgetGearMeta() {
  updateOgMeta({
    title: 'Gear by Budget - Find Drum Kits in Your Price Range | MetalForge',
    description: 'Find professional drum setups that fit your budget. Browse gear from entry level to premium, used by legendary metal drummers.',
    url: '/budget',
    keywords: 'budget drum gear, affordable drum kits, drum gear price range, metal drummer budget',
  });
}

/**
 * Update OG meta for birthday calendar page
 * @param {number|null} month - Selected month (1-12) or null for all
 * @param {Array} todaysBirthdays - Array of drummers with birthdays today
 */
export function updateBirthdayCalendarMeta(month = null, todaysBirthdays = []) {
  const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
  
  let title, description;
  
  if (todaysBirthdays.length > 0) {
    const names = todaysBirthdays.map(d => d.name).join(', ');
    title = `🎂 Today: ${names} Birthday! | Metal Drummer Birthday Calendar`;
    description = `Celebrate ${names}'s birthday today! Browse the complete metal drummer birthday calendar.`;
  } else if (month) {
    const monthName = MONTH_NAMES[month - 1];
    title = `${monthName} Metal Drummer Birthdays | MetalForge`;
    description = `See which legendary metal drummers were born in ${monthName}. Complete birthday calendar for metal drummers.`;
  } else {
    title = 'Metal Drummer Birthday Calendar | MetalForge';
    description = 'Never miss a metal drummer birthday! Browse our complete calendar of legendary drummers\' birthdays. Share and celebrate with the metal community.';
  }

  const url = month ? `/birthdays?month=${month}` : '/birthdays';
  
  updateOgMeta({
    title,
    description,
    url,
    keywords: 'metal drummer birthdays, drummer birthday calendar, rock drummer birthdays',
  });
}

/**
 * Update OG meta for gear news page
 */
export function updateGearNewsMeta() {
  updateOgMeta({
    title: 'Latest Gear Updates | MetalForge',
    description: 'Stay updated with the latest gear changes from metal\'s elite drummers. Gear updates, new setups, and brand news from MetalForge.',
    url: '/gear-news',
    keywords: 'gear updates, drummer gear news, new drum gear, metal drummer equipment changes',
  });
}

/**
 * Generate dynamic OG image URL for quiz results
 * Issue #682: Branded social share images
 * @param {Object} drummer - Drummer object with name
 * @param {number} matchPercentage - Match percentage
 * @returns {string} Dynamic OG image URL
 */
function getQuizOgImageUrl(drummer, matchPercentage) {
  const drummerSlug = drummer.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const match = matchPercentage || 85;
  return `${BASE_URL}/api/og/quiz?drummer=${drummerSlug}&match=${match}`;
}

/**
 * Update OG meta for quiz page
 * Issue #682: Dynamic OG images with MetalForge branding
 * @param {Object|null} drummer - Matched drummer for result pages
 * @param {number} matchPercentage - Match percentage for result pages
 */
export function updateQuizPageMeta(drummer = null, matchPercentage = 0) {
  if (drummer) {
    const drummerSlug = drummer.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const title = `I Drum Like ${drummer.name}! | Which Metal Drummer Are You? | Quiz`;
    const description = `I matched with ${drummer.name} (${drummer.band}) - ${matchPercentage}% match! Take the Metal Drummer Quiz to find out which legendary drummer's setup and style matches yours!`;
    
    // Issue #682: Use dynamic OG image with MetalForge branding
    updateOgMeta({
      title,
      description,
      url: `/quiz?result=${drummerSlug}`,
      image: getQuizOgImageUrl(drummer, matchPercentage),
    });
    return;
  }

  updateOgMeta({
    title: 'Which Metal Drummer Are You? | Quiz',
    description: 'Take our quiz to find out which legendary metal drummer\'s setup and style matches yours! Answer 8 quick questions to discover your drummer match.',
    url: '/quiz',
    image: 'https://metalforge.io/og-quiz.png',
    keywords: 'metal drummer quiz, which drummer are you, drummer personality quiz',
  });
}

/**
 * Update OG meta for top 10 list or article page
 * @param {Object} list - List or article object
 */
export function updateListArticleMeta(list) {
  if (!list) return;

  const urlBase = list.isAlbumArticle ? 'articles' : 'lists';
  
  updateOgMeta({
    title: `${list.title} | MetalForge`,
    description: list.seoDescription || list.description,
    url: `/${urlBase}/${list.slug}`,
    image: list.ogImage ? `https://metalforge.io${list.ogImage}` : DEFAULT_OG_IMAGE,
    type: 'article',
    keywords: list.seoKeywords?.join(', '),
  });
}

/**
 * Update OG meta for BPM range page
 * @param {string} rangeSlug - BPM range slug
 * @param {Object} rangeData - BPM range data
 */
export function updateBpmRangeMeta(rangeSlug, rangeData) {
  if (!rangeData) {
    updateOgMeta({
      title: 'BPM Ranges - Metal Songs by Tempo | MetalForge',
      description: 'Explore metal songs organized by BPM. Find songs at your preferred tempo for practice or performance.',
      url: '/bpm',
      keywords: 'metal songs bpm, tempo metal songs, drumming bpm, metal song speed',
    });
    return;
  }

  updateOgMeta({
    title: rangeData.title,
    description: rangeData.description,
    url: `/bpm/${rangeSlug}`,
    keywords: `${rangeData.title}, metal songs bpm, drumming tempo`,
  });
}

/**
 * Update OG meta for who-uses gear finder page
 * @param {string} searchQuery - Current search query
 */
export function updateWhoUsesMeta(searchQuery = '') {
  const title = searchQuery 
    ? `Who Uses ${searchQuery}? - Gear Finder | MetalForge`
    : 'Gear Finder - Who Uses What? | MetalForge';
  
  const description = searchQuery
    ? `Find out which metal drummers use ${searchQuery}. Discover pro setups featuring your favorite gear.`
    : 'Find out which pro metal drummers use specific gear. Search by brand, model, or gear type.';
  
  updateOgMeta({
    title,
    description,
    url: searchQuery ? `/who-uses?q=${encodeURIComponent(searchQuery)}` : '/who-uses',
    keywords: `drum gear finder, who uses ${searchQuery || 'drums'}, metal drummer gear, ${searchQuery || 'drum equipment'} users`,
  });
}

/**
 * Update OG meta for drummer vs drummer comparison page
 * @param {Object} comparison - Drummer comparison object
 */
export function updateDrummerVsComparisonMeta(comparison) {
  if (!comparison) return;

  const title = comparison.metaTitle || `${comparison.drummer1.name} vs ${comparison.drummer2.name} | MetalForge`;
  const description = comparison.metaDescription || comparison.intro;

  updateOgMeta({
    title,
    description,
    url: `/drummers/${comparison.slug}`,
    type: 'article',
    keywords: `${comparison.drummer1.name} vs ${comparison.drummer2.name}, drummer comparison, metal drummer showdown`,
  });
}

/**
 * Update OG meta for kit builder page
 */
export function updateKitBuilderMeta() {
  updateOgMeta({
    title: 'Virtual Kit Builder - Design Your Dream Drum Setup | MetalForge',
    description: 'Build your dream drum kit with our virtual kit builder. Mix and match shells, cymbals, and hardware from your favorite metal drummers.',
    url: '/kit-builder',
    keywords: 'virtual drum kit, drum kit builder, design drum setup, metal drum kit',
  });
}

/**
 * Update OG meta for kit quiz page
 */
export function updateKitQuizMeta() {
  updateOgMeta({
    title: 'Find Your Perfect Drum Kit Quiz | MetalForge',
    description: 'Take our quiz to find the perfect drum kit for your playing style. Get personalized recommendations based on your preferences.',
    url: '/kit-quiz',
    image: 'https://metalforge.io/og-quiz.png',
    keywords: 'drum kit quiz, find drum kit, drum kit recommendation, metal drum kit',
  });
}

/**
 * Update OG meta for BPM tap calculator page
 */
export function updateBpmTapMeta() {
  updateOgMeta({
    title: 'BPM Tap Calculator - Find Song Tempo | MetalForge',
    description: 'Tap to find the BPM of any song. Our tap tempo calculator helps you quickly determine the beats per minute of any track.',
    url: '/bpm-tap',
    keywords: 'bpm tap, tap tempo, beats per minute calculator, find song bpm',
  });
}

/**
 * Update OG meta for gear guide page
 * @param {string} category - Gear category (cymbals, snares, etc.)
 * @param {Object} categoryData - Category data with meta info
 */
export function updateGearGuideMeta(category, categoryData) {
  if (!categoryData) {
    updateOgMeta({
      title: 'Metal Drumming Gear Guide - Cymbals, Snares, Pedals & More | MetalForge',
      description: 'Complete guide to metal drumming gear. Expert recommendations for cymbals, snares, kick pedals, and hardware.',
      url: '/gear',
      keywords: 'metal drum gear guide, cymbal guide, snare drum guide, kick pedal guide',
    });
    return;
  }

  updateOgMeta({
    title: categoryData.metaTitle || `${categoryData.title} | MetalForge`,
    description: categoryData.metaDescription || categoryData.description,
    url: `/gear/${category}`,
    keywords: categoryData.keywords?.join(', '),
  });
}

/**
 * Update OG meta for quotes page
 */
export function updateQuotesPageMeta() {
  updateOgMeta({
    title: 'Drummer Quotes - Wisdom from Metal Legends | MetalForge',
    description: 'Inspirational quotes from legendary metal drummers. Wisdom, insights, and memorable words from the greatest drummers in metal.',
    url: '/quotes',
    keywords: 'drummer quotes, metal drummer wisdom, inspirational drummer quotes, legendary drummers',
  });
}

/**
 * Update OG meta for drummer battle page (Issue #689)
 * @param {Object} drummer1 - First drummer object
 * @param {Object} drummer2 - Second drummer object
 * @param {string} battleSlug - Battle URL slug
 */
export function updateBattleMeta(drummer1, drummer2, battleSlug) {
  if (!drummer1 || !drummer2) {
    updateOgMeta({
      title: 'Drummer Battle - Vote for Your Favorite | MetalForge',
      description: 'Weekly drummer battles! Vote for your favorite metal drummer and see who has better gear. New matchup every Monday.',
      url: '/battles',
      keywords: 'drummer battle, drummer vote, metal drummer poll, who has better gear',
    });
    return;
  }

  const title = `${drummer1.name} vs ${drummer2.name}: Who Has Better Gear? | Vote Now`;
  const description = `Cast your vote in this week's Drummer Battle! ${drummer1.name} (${drummer1.band}) vs ${drummer2.name} (${drummer2.band}). Compare their gear and vote for the winner!`;

  updateOgMeta({
    title,
    description,
    url: `/battles/${battleSlug}`,
    type: 'article',
    keywords: `${drummer1.name} vs ${drummer2.name}, drummer battle, drummer vote, ${drummer1.band} drummer, ${drummer2.band} drummer`,
  });

  // Add Poll schema for SEO (Schema: Thing > CreativeWork > Poll)
  if (typeof document !== 'undefined') {
    const pollSchema = {
      '@context': 'https://schema.org',
      '@type': 'Poll',
      name: title,
      description: description,
      url: `${BASE_URL}/battles/${battleSlug}`,
      dateCreated: new Date().toISOString().split('T')[0],
      author: {
        '@type': 'Organization',
        name: 'MetalForge',
        url: BASE_URL,
      },
      about: [
        {
          '@type': 'Person',
          name: drummer1.name,
          description: `Drummer for ${drummer1.band}`,
          sameAs: drummer1.sameAs || [],
        },
        {
          '@type': 'Person',
          name: drummer2.name,
          description: `Drummer for ${drummer2.band}`,
          sameAs: drummer2.sameAs || [],
        },
      ],
    };

    let script = document.querySelector('script[data-schema="battle-poll"]');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema', 'battle-poll');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(pollSchema);
  }
}

/**
 * Update OG meta for "How to Sound Like" guide page
 * Issue #685: SEO content hub for drummer sound guides
 * @param {Object|null} guide - Guide object (null for hub page)
 */
export function updateSoundLikeGuideMeta(guide = null) {
  if (!guide) {
    // Hub page
    updateOgMeta({
      title: 'How to Sound Like Your Favorite Metal Drummer | Complete Guides | MetalForge',
      description: 'Master the techniques, gear, and tuning of legendary metal drummers. Comprehensive guides to help you sound like Joey Jordison, Danny Carey, Lars Ulrich, and more.',
      url: '/guides',
      keywords: 'how to sound like metal drummer, drummer technique guide, drum gear guide, metal drumming tutorial',
    });
    return;
  }

  // Individual guide page
  updateOgMeta({
    title: `${guide.title} | MetalForge`,
    description: guide.description,
    url: `/guides/${guide.slug}`,
    image: guide.ogImage ? `${BASE_URL}${guide.ogImage}` : DEFAULT_OG_IMAGE,
    type: 'article',
    keywords: guide.seoKeywords?.join(', '),
  });
}

/**
 * Update OG meta for tools hub page (Issue #729)
 * Central landing page showcasing all interactive tools
 */
export function updateToolsHubMeta() {
  updateOgMeta({
    title: 'The Ultimate Metal Drummer Toolkit | Interactive Tools | MetalForge',
    description: 'Discover 5 interactive tools for metal drummers: Drum Kit Builder, Gear Comparison Tool, Evolution Timeline, Drummer Quiz, and Stage Name Generator. Build, compare, learn, and have fun!',
    url: '/tools',
    image: 'https://metalforge.io/og-tools-hub.png',
    keywords: 'metal drummer tools, drum kit builder, gear comparison, drummer quiz, stage name generator, metal drumming timeline',
  });

  // Add ItemList schema for SEO (Schema.org ItemList)
  if (typeof document !== 'undefined') {
    const toolsSchema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'The Ultimate Metal Drummer Toolkit',
      description: '5 interactive tools for metal drummers to build kits, compare gear, explore history, find their drummer match, and generate stage names.',
      url: `${BASE_URL}/tools`,
      numberOfItems: 5,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Drum Kit Builder',
          description: 'Build your dream metal drum kit with gear from legendary drummers.',
          url: `${BASE_URL}/kit-builder`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Gear Comparison Tool',
          description: 'Compare drummer setups side-by-side to find the perfect gear combination.',
          url: `${BASE_URL}/tools/compare`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Evolution Timeline',
          description: 'Explore 50+ years of metal drumming history from 1970 to present.',
          url: `${BASE_URL}/history`,
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Which Drummer Are You? Quiz',
          description: 'Take our quiz to find out which legendary metal drummer matches your style.',
          url: `${BASE_URL}/kit-quiz`,
        },
        {
          '@type': 'ListItem',
          position: 5,
          name: 'Stage Name Generator',
          description: 'Generate your brutal metal drummer stage name for your next project.',
          url: `${BASE_URL}/tools/metal-drummer-name-generator`,
        },
      ],
    };

    let script = document.querySelector('script[data-schema="tools-hub"]');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema', 'tools-hub');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(toolsSchema);
  }
}

/**
 * Update OG meta for signature licks page (Issue #799)
 * SEO: Unique page titles and meta descriptions for feature pages
 */
export function updateSignatureLicksMeta() {
  updateOgMeta({
    title: 'Metal Drummer Signature Licks — Learn Iconic Drum Patterns | MetalForge',
    description: 'Learn the signature drum patterns and fills that define metal\'s greatest drummers. From blast beats to groove fills, master the licks that made them legends.',
    url: '/signature-licks',
    keywords: 'signature drum licks, metal drum patterns, drum fills, blast beat patterns, groove metal fills, iconic drum patterns',
  });
}

/**
 * Update OG meta for guess the kit game (Issue #799)
 * SEO: Unique page titles and meta descriptions for feature pages
 */
export function updateGuessTheKitMeta() {
  updateOgMeta({
    title: 'Guess the Kit — Metal Drummer Trivia Game | MetalForge',
    description: 'Test your metal gear knowledge! Can you identify which legendary drummer owns this kit? Daily challenges with shareable results.',
    url: '/guess-the-kit',
    keywords: 'guess the kit, metal drummer trivia, drum kit quiz, metal gear trivia, drummer guessing game',
  });
}

/**
 * Update OG meta for gear statistics page (Issue #695, #769)
 * Issue #769: Uses dynamic OG image API
 */
export function updateGearStatsMeta() {
  updateOgMeta({
    title: 'Metal Drummer Gear Statistics — Data-Driven Insights | MetalForge',
    description: 'Most popular cymbals, drums, and gear among 60+ legendary metal drummers. See what the pros actually use (with real stats).',
    url: '/stats',
    image: `${BASE_URL}/api/og/stats`,
    keywords: 'metal drummer gear statistics, best cymbals for metal, most popular metal drums, metal drum setup cost, drummer gear brands, professional drum equipment',
  });

  // Add Dataset schema for SEO (Schema.org Dataset)
  if (typeof document !== 'undefined') {
    const datasetSchema = {
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: 'Metal Drummer Gear Statistics',
      description: 'Comprehensive gear statistics from 60+ professional metal drummers including brand preferences, equipment costs, and genre-specific insights.',
      url: `${BASE_URL}/stats/gear-insights`,
      creator: {
        '@type': 'Organization',
        name: 'MetalForge',
        url: BASE_URL,
      },
      datePublished: '2026-03-12',
      dateModified: new Date().toISOString().split('T')[0],
      keywords: ['metal drumming', 'drum equipment', 'cymbal brands', 'drum kit statistics', 'professional drummers'],
      license: 'https://creativecommons.org/licenses/by-nc/4.0/',
      variableMeasured: [
        'Cymbal brand usage percentage',
        'Drum kit brand usage percentage',
        'Average setup cost by genre',
        'Snare drum model frequency',
      ],
    };

    let script = document.querySelector('script[data-schema="gear-stats-dataset"]');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema', 'gear-stats-dataset');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(datasetSchema);
  }
}

export default {
  updateOgMeta,
  resetToHomepageMeta,
  updateDrummerMeta,
  updateGenreMeta,
  updateBrandMeta,
  updateTechniqueMeta,
  updateGearComparisonMeta,
  updateDrummerComparisonMeta,
  updateBandPageMeta,
  updateSpotlightsMeta,
  updateBudgetGearMeta,
  updateBirthdayCalendarMeta,
  updateGearNewsMeta,
  updateQuizPageMeta,
  updateListArticleMeta,
  updateBpmRangeMeta,
  updateWhoUsesMeta,
  updateDrummerVsComparisonMeta,
  updateKitBuilderMeta,
  updateKitQuizMeta,
  updateBpmTapMeta,
  updateGearGuideMeta,
  updateQuotesPageMeta,
  updateBattleMeta,
  updateSoundLikeGuideMeta,
  updateGearStatsMeta,
  updateToolsHubMeta,
  updateSignatureLicksMeta,
  updateGuessTheKitMeta,
};
