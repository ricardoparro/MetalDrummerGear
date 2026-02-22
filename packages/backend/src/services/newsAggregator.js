const Parser = require('rss-parser');
const crypto = require('crypto');
const parser = new Parser();

const RSS_FEEDS = [
  { id: 'blabbermouth', name: 'Blabbermouth', url: 'https://blabbermouth.net/feed' },
  { id: 'loudwire', name: 'Loudwire', url: 'https://loudwire.com/feed/' },
  { id: 'metalinjection', name: 'Metal Injection', url: 'https://metalinjection.net/feed' },
];

// Bands that need context keywords (common words)
const AMBIGUOUS_BANDS = [
  'death', 'anthrax', 'testament', 'exodus',
  'overkill', 'destruction', 'kreator', 'accept',
  'tank', 'anvil', 'riot', 'raven'
];

// Context keywords that indicate music article
const MUSIC_CONTEXT_KEYWORDS = [
  'band', 'metal', 'drummer', 'album', 'tour', 'concert',
  'guitar', 'bass', 'vocals', 'singer', 'release',
  'record', 'music', 'song', 'track', 'ep', 'lp'
];

// Generate stable ID from URL
function generateNewsId(url) {
  return crypto.createHash('md5').update(url).digest('hex').slice(0, 12);
}

// Extract image from RSS item
function extractImage(item) {
  if (item['media:content']?.$.url) return item['media:content'].$.url;
  if (item.enclosure?.url) return item.enclosure.url;
  const imgMatch = item.content?.match(/<img[^>]+src="([^"]+)"/);
  if (imgMatch) return imgMatch[1];
  return null;
}

// Word boundary regex for accurate matching
function createWordBoundaryRegex(text) {
  const escaped = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`\\b${escaped}\\b`, 'i');
}

// Check if text has music context keywords
function hasMusicContext(text) {
  const lowerText = text.toLowerCase();
  return MUSIC_CONTEXT_KEYWORDS.some(keyword => {
    // Use word boundaries for short keywords to avoid false positives
    // e.g., 'ep' should not match 'reported', 'lp' should not match 'help'
    if (keyword.length <= 2) {
      const regex = new RegExp(`\\b${keyword}\\b`, 'i');
      return regex.test(lowerText);
    }
    return lowerText.includes(keyword);
  });
}

// Smart drummer matching
function matchDrummer(searchText, drummer) {
  const fullNameRegex = createWordBoundaryRegex(drummer.name);

  // Primary: Full name match
  if (fullNameRegex.test(searchText)) {
    return { matched: true, confidence: 'high', reason: 'full_name' };
  }

  // Secondary: Band + Last name
  const nameParts = drummer.name.split(' ');
  if (nameParts.length >= 2) {
    const lastName = nameParts[nameParts.length - 1];
    const lastNameRegex = createWordBoundaryRegex(lastName);
    const bandRegex = createWordBoundaryRegex(drummer.band);

    if (lastNameRegex.test(searchText) && bandRegex.test(searchText)) {
      return { matched: true, confidence: 'medium', reason: 'band_plus_lastname' };
    }
  }

  return { matched: false };
}

// Smart band matching (handles ambiguous names)
function matchBand(searchText, band) {
  const bandRegex = createWordBoundaryRegex(band.name);

  if (!bandRegex.test(searchText)) {
    return { matched: false };
  }

  // Check if band name is ambiguous
  const isAmbiguous = AMBIGUOUS_BANDS.includes(band.name.toLowerCase());

  if (isAmbiguous) {
    // Require music context for ambiguous bands
    if (!hasMusicContext(searchText)) {
      return { matched: false, reason: 'ambiguous_no_context' };
    }
    return { matched: true, confidence: 'medium', reason: 'ambiguous_with_context' };
  }

  return { matched: true, confidence: 'high', reason: 'unique_name' };
}

// Main matching function
function matchArticle(item, drummers, bands) {
  const title = item.title || '';
  const content = item.contentSnippet || item.content || '';
  const searchText = `${title} ${content}`;

  // Skip very short articles
  if (searchText.length < 100) {
    return { matchedDrummers: [], matchedBands: [], skip: true };
  }

  const matchedDrummers = [];
  const matchedBands = [];

  // Match drummers
  for (const drummer of drummers) {
    const result = matchDrummer(searchText, drummer);
    if (result.matched) {
      matchedDrummers.push({
        id: drummer.id,
        name: drummer.name,
        slug: drummer.slug || drummer.id.toString(),
        band: drummer.band,
        confidence: result.confidence,
        matchReason: result.reason,
      });
    }
  }

  // Match bands
  for (const band of bands) {
    const result = matchBand(searchText, band);
    if (result.matched) {
      matchedBands.push({
        name: band.name,
        slug: band.slug,
        confidence: result.confidence,
        matchReason: result.reason,
      });
    }
  }

  // Cross-validation boost: if article matches band AND its drummer, boost confidence
  for (const drummer of matchedDrummers) {
    const bandMatch = matchedBands.find(b =>
      b.name.toLowerCase() === drummer.band.toLowerCase()
    );
    if (bandMatch) {
      drummer.confidence = 'high';
      drummer.crossValidated = true;
      bandMatch.confidence = 'high';
      bandMatch.crossValidated = true;
    }
  }

  return { matchedDrummers, matchedBands };
}

// Fetch a single feed
async function fetchFeed(feed) {
  try {
    const parsed = await parser.parseURL(feed.url);
    return { feed, items: parsed.items || [] };
  } catch (error) {
    console.error(`[NewsAggregator] Failed to fetch ${feed.name}:`, error.message);
    return { feed, items: [] };
  }
}

// Fetch all feeds and match articles
async function fetchAllNews(drummers, bands) {
  const allNews = [];

  for (const feed of RSS_FEEDS) {
    const { items } = await fetchFeed(feed);

    for (const item of items.slice(0, 25)) {
      const { matchedDrummers, matchedBands, skip } = matchArticle(item, drummers, bands);

      if (skip) continue;

      if (matchedDrummers.length > 0 || matchedBands.length > 0) {
        allNews.push({
          id: generateNewsId(item.link),
          title: item.title,
          link: item.link,
          source: feed.name,
          sourceId: feed.id,
          pubDate: item.pubDate || item.isoDate,
          snippet: (item.contentSnippet || '').slice(0, 250),
          image: extractImage(item),
          drummers: matchedDrummers,
          bands: matchedBands,
        });
      }
    }
  }

  // Sort and dedupe
  const seen = new Set();
  return allNews
    .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
    .filter(item => {
      if (seen.has(item.link)) return false;
      seen.add(item.link);
      return true;
    })
    .slice(0, 100);
}

module.exports = {
  RSS_FEEDS,
  AMBIGUOUS_BANDS,
  MUSIC_CONTEXT_KEYWORDS,
  fetchFeed,
  fetchAllNews,
  matchArticle,
  matchDrummer,
  matchBand,
  hasMusicContext,
  generateNewsId,
  extractImage,
  createWordBoundaryRegex,
  parser,
};
