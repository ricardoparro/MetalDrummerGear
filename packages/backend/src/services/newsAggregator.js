const Parser = require('rss-parser');
const parser = new Parser();

const RSS_FEEDS = [
  { id: 'blabbermouth', name: 'Blabbermouth', url: 'https://blabbermouth.net/feed' },
  { id: 'loudwire', name: 'Loudwire', url: 'https://loudwire.com/feed/' },
  { id: 'metalinjection', name: 'Metal Injection', url: 'https://metalinjection.net/feed' },
];

let drummerNames = [];
let bandNames = [];

function initializeMatchLists(drummers) {
  drummerNames = drummers.map(d => d.name.toLowerCase());
  bandNames = [...new Set(drummers.map(d => d.band.toLowerCase()))];
}

async function fetchFeed(feed) {
  try {
    const parsed = await parser.parseURL(feed.url);
    return { feed, items: parsed.items || [] };
  } catch (error) {
    console.error(`[NewsAggregator] Failed to fetch ${feed.name}:`, error.message);
    return { feed, items: [] };
  }
}

module.exports = {
  RSS_FEEDS,
  initializeMatchLists,
  fetchFeed,
  parser,
};
