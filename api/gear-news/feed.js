// Vercel Serverless Function - Gear News RSS Feed
// Issue #660: Create 'Latest Gear Updates' news feed page with RSS

const BASE_URL = 'https://metalforge.io';

// Change types with labels
const CHANGE_TYPES = {
  added: 'added',
  removed: 'removed',
  updated: 'updated',
  switched: 'switched to',
  site_update: '',
  brand_launch: 'launched',
};

// Gear news entries - mirrored from frontend data
const GEAR_NEWS = [
  {
    id: 'launch-001',
    date: '2026-03-07',
    type: 'site_update',
    title: 'MetalForge Launches with 31 Verified Pro Setups',
    description: 'The ultimate resource for metal drum gear goes live, featuring detailed setups from 31 of the most influential metal drummers.',
  },
  {
    id: 'brand-tama-001',
    date: '2026-03-06',
    type: 'brand_launch',
    title: 'Tama Brand Page Now Live',
    description: 'Explore all Tama drums, hardware, and which metal drummers use them.',
    brandSlug: 'tama',
  },
  {
    id: 'brand-dw-001',
    date: '2026-03-06',
    type: 'brand_launch',
    title: 'DW (Drum Workshop) Brand Page Now Live',
    description: 'Discover DW drums and hardware used by metal\'s elite.',
    brandSlug: 'dw',
  },
  {
    id: 'brand-zildjian-001',
    date: '2026-03-05',
    type: 'brand_launch',
    title: 'Zildjian Cymbals Brand Page Now Live',
    description: 'The world\'s oldest cymbal company - see which metal drummers choose Zildjian.',
    brandSlug: 'zildjian',
  },
  {
    id: 'brand-meinl-001',
    date: '2026-03-05',
    type: 'brand_launch',
    title: 'Meinl Cymbals Brand Page Now Live',
    description: 'German engineering meets extreme metal - explore the Meinl roster.',
    brandSlug: 'meinl',
  },
  {
    id: 'drummer-matt-garstka-001',
    date: '2026-03-04',
    type: 'site_update',
    title: 'Matt Garstka Profile Added',
    description: 'Animals as Leaders\' Matt Garstka joins MetalForge with his complete Tama/Meinl setup.',
    drummerSlug: 'matt-garstka',
  },
  {
    id: 'drummer-hannes-grossmann-001',
    date: '2026-03-03',
    type: 'site_update',
    title: 'Hannes Grossmann Profile Added',
    description: 'Obscura/ex-Necrophagist drummer Hannes Grossmann added with full gear breakdown.',
    drummerSlug: 'hannes-grossmann',
  },
  {
    id: 'drummer-dirk-verbeuren-001',
    date: '2026-03-02',
    type: 'site_update',
    title: 'Dirk Verbeuren Profile Added',
    description: 'Megadeth\'s Dirk Verbeuren joins with his Tama Starclassic setup details.',
    drummerSlug: 'dirk-verbeuren',
  },
  {
    id: 'gear-jay-weinberg-001',
    date: '2026-03-01',
    type: 'added',
    title: 'Jay Weinberg adds Paiste 2002 20" Ride Cymbal',
    description: 'Slipknot\'s Jay Weinberg expands his cymbal arsenal with a Paiste 2002 20" Ride.',
    drummerSlug: 'jay-weinberg',
  },
  {
    id: 'gear-mario-duplantier-001',
    date: '2026-02-28',
    type: 'updated',
    title: 'Mario Duplantier updates snare configuration',
    description: 'Gojira\'s Mario Duplantier tweaks his Tama S.L.P. snare setup for upcoming tour.',
    drummerSlug: 'mario-duplantier',
  },
  {
    id: 'gear-george-kollias-001',
    date: '2026-02-25',
    type: 'switched',
    title: 'George Kollias switches to Paiste RUDE cymbals',
    description: 'Nile\'s George Kollias completes his switch to the full Paiste RUDE series.',
    drummerSlug: 'george-kollias',
  },
  {
    id: 'gear-matt-halpern-001',
    date: '2026-02-22',
    type: 'added',
    title: 'Matt Halpern adds Meinl Classics Custom Dark stack',
    description: 'Periphery\'s Matt Halpern incorporates Meinl Classics Custom Dark cymbals for studio work.',
    drummerSlug: 'matt-halpern',
  },
  {
    id: 'brand-pearl-001',
    date: '2026-02-20',
    type: 'brand_launch',
    title: 'Pearl Drums Brand Page Now Live',
    description: 'Explore Pearl drums, the Reference series, and Demon Drive pedals.',
    brandSlug: 'pearl',
  },
  {
    id: 'brand-paiste-001',
    date: '2026-02-18',
    type: 'brand_launch',
    title: 'Paiste Cymbals Brand Page Now Live',
    description: 'Swiss-made cymbals from the 2002 to RUDE series - all on MetalForge.',
    brandSlug: 'paiste',
  },
  {
    id: 'brand-sabian-001',
    date: '2026-02-15',
    type: 'brand_launch',
    title: 'Sabian Cymbals Brand Page Now Live',
    description: 'AAX, HHX, and more - discover Sabian\'s metal offerings.',
    brandSlug: 'sabian',
  },
];

// Escape XML special characters
function escapeXml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Format date for RSS (RFC 822)
function formatRssDate(dateString) {
  const date = new Date(dateString + 'T12:00:00Z');
  return date.toUTCString();
}

// Build link for a news item
function buildItemLink(item) {
  if (item.drummerSlug) {
    return `${BASE_URL}/drummer/${item.drummerSlug}`;
  }
  if (item.brandSlug) {
    return `${BASE_URL}/brands/${item.brandSlug}`;
  }
  return `${BASE_URL}/gear-news`;
}

export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  
  const lastBuildDate = new Date().toUTCString();
  
  const items = GEAR_NEWS
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map(item => {
      const link = buildItemLink(item);
      return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${link}</link>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${formatRssDate(item.date)}</pubDate>
      <guid isPermaLink="false">${BASE_URL}/gear-news#${item.id}</guid>
    </item>`;
    })
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>MetalForge - Latest Gear Updates</title>
    <link>${BASE_URL}/gear-news</link>
    <description>Latest gear updates from metal's elite drummers. Gear changes, new setups, and brand news from MetalForge.io</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${BASE_URL}/gear-news/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${BASE_URL}/og-image.png</url>
      <title>MetalForge</title>
      <link>${BASE_URL}</link>
    </image>
    <category>Music</category>
    <category>Drums</category>
    <category>Metal</category>
    <ttl>60</ttl>
${items}
  </channel>
</rss>`;

  res.status(200).send(rss);
}
