// Vercel Serverless Function - News API
// Phase 6: Dedicated /news page API endpoint (Issue #514)
// Provides news feed with filtering capabilities

import { drummers } from './drummers/index.js';

// Get all bands data for news matching
function getAllBands() {
  const bandSet = new Map();
  
  // Extract unique bands from drummers
  drummers.forEach(drummer => {
    if (drummer.band) {
      const slug = drummer.band.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      if (!bandSet.has(slug)) {
        bandSet.set(slug, {
          name: drummer.band,
          slug: slug,
        });
      }
    }
    
    // Also check bandLinks if available
    if (drummer.bandLinks) {
      drummer.bandLinks.forEach(band => {
        const slug = band.slug || band.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        if (slug && !bandSet.has(slug)) {
          bandSet.set(slug, {
            name: band.name || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            slug: slug,
          });
        }
      });
    }
  });
  
  return Array.from(bandSet.values());
}

// RSS feed sources
const RSS_FEEDS = [
  { id: 'blabbermouth', name: 'Blabbermouth', url: 'https://blabbermouth.net/feed' },
  { id: 'loudwire', name: 'Loudwire', url: 'https://loudwire.com/feed/' },
  { id: 'metalinjection', name: 'Metal Injection', url: 'https://metalinjection.net/feed' },
];

// Bands that need context keywords (common words that could appear in non-music articles)
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

// Simple in-memory cache for news (resets on cold starts, but helps with warm functions)
let newsCache = {
  items: [],
  lastFetch: null,
  ttlMs: 15 * 60 * 1000, // 15 minutes cache
};

// Generate stable ID from URL
function generateNewsId(url) {
  // Simple hash function for URL
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    const char = url.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).slice(0, 12);
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

// Match article against drummers and bands
function matchArticle(item, drummersList, bandsList) {
  const title = item.title || '';
  const content = item.contentSnippet || item.content || '';
  const searchText = `${title} ${content}`;

  if (searchText.length < 100) {
    return { matchedDrummers: [], matchedBands: [], skip: true };
  }

  const matchedDrummers = [];
  const matchedBands = [];

  // Match drummers
  for (const drummer of drummersList) {
    const result = matchDrummer(searchText, drummer);
    if (result.matched) {
      const slug = drummer.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      matchedDrummers.push({
        id: drummer.id,
        name: drummer.name,
        slug: slug,
        band: drummer.band,
        confidence: result.confidence,
        matchReason: result.reason,
      });
    }
  }

  // Match bands
  for (const band of bandsList) {
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

  // Cross-validation boost
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

// Extract image from RSS item
function extractImage(item) {
  // Try media:content
  if (item['media:content']?.url) return item['media:content'].url;
  if (item['media:thumbnail']?.url) return item['media:thumbnail'].url;
  // Try enclosure
  if (item.enclosure?.url && item.enclosure.type?.startsWith('image/')) return item.enclosure.url;
  // Try to extract from content
  const imgMatch = (item.content || item['content:encoded'] || '').match(/<img[^>]+src=["']([^"']+)["']/);
  if (imgMatch) return imgMatch[1];
  return null;
}

// Parse RSS feed
async function fetchFeed(feed) {
  try {
    const response = await fetch(feed.url, {
      headers: {
        'User-Agent': 'MetalForge/1.0 News Aggregator',
        'Accept': 'application/rss+xml, application/xml, text/xml',
      },
    });
    
    if (!response.ok) {
      console.error(`[News API] Failed to fetch ${feed.name}: ${response.status}`);
      return [];
    }
    
    const text = await response.text();
    const items = parseRssFeed(text);
    
    return items.map(item => ({
      ...item,
      source: feed.name,
      sourceId: feed.id,
    }));
  } catch (error) {
    console.error(`[News API] Error fetching ${feed.name}:`, error.message);
    return [];
  }
}

// Simple RSS parser
function parseRssFeed(xml) {
  const items = [];
  
  // Match all <item> elements
  const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/gi;
  let match;
  
  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];
    
    const title = extractXmlTag(itemXml, 'title');
    const link = extractXmlTag(itemXml, 'link');
    const pubDate = extractXmlTag(itemXml, 'pubDate');
    const description = extractXmlTag(itemXml, 'description');
    const content = extractXmlTag(itemXml, 'content:encoded') || description;
    
    // Extract media image
    let image = null;
    const mediaMatch = itemXml.match(/<media:content[^>]+url=["']([^"']+)["']/);
    const mediaThumbMatch = itemXml.match(/<media:thumbnail[^>]+url=["']([^"']+)["']/);
    const enclosureMatch = itemXml.match(/<enclosure[^>]+url=["']([^"']+)["'][^>]+type=["']image/);
    const imgMatch = content?.match(/<img[^>]+src=["']([^"']+)["']/);
    
    image = mediaMatch?.[1] || mediaThumbMatch?.[1] || enclosureMatch?.[1] || imgMatch?.[1] || null;
    
    if (title && link) {
      // Create content snippet
      let snippet = description || '';
      snippet = snippet.replace(/<[^>]+>/g, '').trim();
      snippet = snippet.slice(0, 250);
      
      items.push({
        title: decodeHtmlEntities(title),
        link,
        pubDate,
        content: content || description,
        contentSnippet: snippet,
        image,
      });
    }
  }
  
  return items;
}

// Extract XML tag content
function extractXmlTag(xml, tagName) {
  const cdataRegex = new RegExp(`<${tagName}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tagName}>`, 'i');
  const cdataMatch = xml.match(cdataRegex);
  if (cdataMatch) return cdataMatch[1];
  
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const match = xml.match(regex);
  return match ? match[1].trim() : null;
}

// Decode HTML entities
function decodeHtmlEntities(text) {
  if (!text) return '';
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/');
}

// Fetch all news
async function fetchAllNews() {
  const drummersList = drummers.map(d => ({
    id: d.id,
    name: d.name,
    band: d.band,
  }));
  const bandsList = getAllBands();
  
  const allItems = [];
  
  // Fetch all feeds in parallel
  const feedResults = await Promise.all(RSS_FEEDS.map(fetchFeed));
  
  for (const items of feedResults) {
    for (const item of items.slice(0, 25)) {
      const { matchedDrummers, matchedBands, skip } = matchArticle(item, drummersList, bandsList);
      
      if (skip) continue;
      
      // Only include items with matches
      if (matchedDrummers.length > 0 || matchedBands.length > 0) {
        allItems.push({
          id: generateNewsId(item.link),
          title: item.title,
          link: item.link,
          source: item.source,
          sourceId: item.sourceId,
          pubDate: item.pubDate,
          snippet: item.contentSnippet || '',
          image: item.image,
          drummers: matchedDrummers,
          bands: matchedBands,
        });
      }
    }
  }
  
  // Sort by date and dedupe
  const seen = new Set();
  const sortedItems = allItems
    .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
    .filter(item => {
      if (seen.has(item.link)) return false;
      seen.add(item.link);
      return true;
    })
    .slice(0, 100);
  
  return sortedItems;
}

// Check if cache is valid
function isCacheValid() {
  if (!newsCache.lastFetch) return false;
  const age = Date.now() - new Date(newsCache.lastFetch).getTime();
  return age < newsCache.ttlMs;
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=1800');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get query parameters
    const { source, drummer, band, limit = '50' } = req.query;
    const limitNum = Math.min(parseInt(limit, 10) || 50, 100);

    // Check cache
    let newsItems;
    if (isCacheValid()) {
      newsItems = newsCache.items;
    } else {
      // Fetch fresh news
      newsItems = await fetchAllNews();
      newsCache = {
        items: newsItems,
        lastFetch: new Date().toISOString(),
        ttlMs: 15 * 60 * 1000,
      };
    }

    // Apply filters
    let filteredItems = [...newsItems];

    // Filter by source
    if (source) {
      filteredItems = filteredItems.filter(item => 
        item.sourceId === source.toLowerCase()
      );
    }

    // Filter by drummer
    if (drummer) {
      const drummerLower = drummer.toLowerCase();
      filteredItems = filteredItems.filter(item =>
        item.drummers.some(d => 
          d.name.toLowerCase().includes(drummerLower) ||
          d.slug?.toLowerCase() === drummerLower
        )
      );
    }

    // Filter by band
    if (band) {
      const bandLower = band.toLowerCase();
      filteredItems = filteredItems.filter(item =>
        item.bands.some(b => 
          b.name.toLowerCase().includes(bandLower) ||
          b.slug?.toLowerCase() === bandLower
        )
      );
    }

    // Apply limit
    filteredItems = filteredItems.slice(0, limitNum);

    return res.status(200).json({
      items: filteredItems,
      lastFetch: newsCache.lastFetch,
      totalCount: filteredItems.length,
      sources: RSS_FEEDS.map(f => ({ id: f.id, name: f.name })),
    });
  } catch (error) {
    console.error('[News API] Error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch news',
      message: error.message,
    });
  }
}
