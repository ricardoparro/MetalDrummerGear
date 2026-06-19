// Gear News Data - Issue #660
// Chronological feed of gear updates across drummers
// Manually curated for MVP, auto-generate in Phase 2

// Types of gear updates
export const CHANGE_TYPES = {
  ADDED: 'added',
  REMOVED: 'removed',
  UPDATED: 'updated',
  SWITCHED: 'switched',
  SITE_UPDATE: 'site_update',
  BRAND_LAUNCH: 'brand_launch',
};

// Get emoji for change type
export function getChangeTypeEmoji(type) {
  switch (type) {
    case CHANGE_TYPES.ADDED: return '🔥';
    case CHANGE_TYPES.REMOVED: return '💨';
    case CHANGE_TYPES.UPDATED: return '🔄';
    case CHANGE_TYPES.SWITCHED: return '⚡';
    case CHANGE_TYPES.SITE_UPDATE: return '🎉';
    case CHANGE_TYPES.BRAND_LAUNCH: return '🏷️';
    default: return '📰';
  }
}

// Get human-readable change type label
export function getChangeTypeLabel(type) {
  switch (type) {
    case CHANGE_TYPES.ADDED: return 'added';
    case CHANGE_TYPES.REMOVED: return 'removed';
    case CHANGE_TYPES.UPDATED: return 'updated';
    case CHANGE_TYPES.SWITCHED: return 'switched to';
    case CHANGE_TYPES.SITE_UPDATE: return '';
    case CHANGE_TYPES.BRAND_LAUNCH: return 'launched';
    default: return '';
  }
}

// Gear news entries - newest first
// Each entry should have: id, date, type, title, description, optional: drummerId, drummerName, drummerSlug, gearName, gearSlug, brandSlug, previousGear, note
export const GEAR_NEWS = [
  // ==========================================
  // SEED CONTENT - 15 entries for launch
  // ==========================================

  // Site Launch Entry
  {
    id: 'launch-001',
    date: '2026-03-07',
    type: CHANGE_TYPES.SITE_UPDATE,
    title: 'MetalForge Launches with 31 Verified Pro Setups',
    description: 'The ultimate resource for metal drum gear goes live, featuring detailed setups from 31 of the most influential metal drummers.',
    note: 'Full gear lists, timeline histories, and affiliate links to get your own pro gear.',
  },

  // Brand Pages Launch
  {
    id: 'brand-tama-001',
    date: '2026-03-06',
    type: CHANGE_TYPES.BRAND_LAUNCH,
    title: 'Tama Brand Page Now Live',
    description: 'Explore all Tama drums, hardware, and which metal drummers use them.',
    brandSlug: 'tama',
    note: 'See who plays Tama Starclassic, Iron Cobra, and more.',
  },
  {
    id: 'brand-dw-001',
    date: '2026-03-06',
    type: CHANGE_TYPES.BRAND_LAUNCH,
    title: 'DW (Drum Workshop) Brand Page Now Live',
    description: 'Discover DW drums and hardware used by metal\'s elite.',
    brandSlug: 'dw',
    note: 'Premium American-made drums favored by progressive metal drummers.',
  },
  {
    id: 'brand-zildjian-001',
    date: '2026-03-05',
    type: CHANGE_TYPES.BRAND_LAUNCH,
    title: 'Zildjian Cymbals Brand Page Now Live',
    description: 'The world\'s oldest cymbal company - see which metal drummers choose Zildjian.',
    brandSlug: 'zildjian',
    note: 'From A Custom to K Custom, explore the full Zildjian lineup.',
  },
  {
    id: 'brand-meinl-001',
    date: '2026-03-05',
    type: CHANGE_TYPES.BRAND_LAUNCH,
    title: 'Meinl Cymbals Brand Page Now Live',
    description: 'German engineering meets extreme metal - explore the Meinl roster.',
    brandSlug: 'meinl',
    note: 'Byzance, Classics Custom, and more for modern metal.',
  },

  // Recent Drummer Additions
  {
    id: 'drummer-matt-garstka-001',
    date: '2026-03-04',
    type: CHANGE_TYPES.SITE_UPDATE,
    title: 'Matt Garstka Profile Added',
    description: 'Animals as Leaders\' Matt Garstka joins MetalForge with his complete Tama/Meinl setup.',
    drummerId: 53,
    drummerName: 'Matt Garstka',
    drummerSlug: 'matt-garstka',
    note: 'One of the most technical drummers in modern metal.',
  },
  {
    id: 'drummer-hannes-grossmann-001',
    date: '2026-03-03',
    type: CHANGE_TYPES.SITE_UPDATE,
    title: 'Hannes Grossmann Profile Added',
    description: 'Obscura/ex-Necrophagist drummer Hannes Grossmann added with full gear breakdown.',
    drummerId: 56,
    drummerName: 'Hannes Grossmann',
    drummerSlug: 'hannes-grossmann',
    note: 'German technical death metal precision.',
  },
  {
    id: 'drummer-dirk-verbeuren-001',
    date: '2026-03-02',
    type: CHANGE_TYPES.SITE_UPDATE,
    title: 'Dirk Verbeuren Profile Added',
    description: 'Megadeth\'s Dirk Verbeuren joins with his Tama Starclassic setup details.',
    drummerId: 45,
    drummerName: 'Dirk Verbeuren',
    drummerSlug: 'dirk-verbeuren',
    note: 'Former Soilwork drummer now thrashing with Megadeth.',
  },

  // Gear Changes/Updates (hypothetical recent updates)
  {
    id: 'gear-jay-weinberg-001',
    date: '2026-03-01',
    type: CHANGE_TYPES.ADDED,
    title: 'Jay Weinberg adds Paiste 2002 20" Ride Cymbal',
    description: 'Slipknot\'s Jay Weinberg expands his cymbal arsenal with a Paiste 2002 20" Ride.',
    drummerId: 10,
    drummerName: 'Jay Weinberg',
    drummerSlug: 'jay-weinberg',
    gearName: 'Paiste 2002 20" Ride Cymbal',
    gearSlug: 'paiste-2002-20-ride',
    note: 'Adding vintage-style bite to his massive setup.',
  },
  {
    id: 'gear-mario-duplantier-001',
    date: '2026-02-28',
    type: CHANGE_TYPES.UPDATED,
    title: 'Mario Duplantier updates snare configuration',
    description: 'Gojira\'s Mario Duplantier tweaks his Tama S.L.P. snare setup for upcoming tour.',
    drummerId: 15,
    drummerName: 'Mario Duplantier',
    drummerSlug: 'mario-duplantier',
    gearName: 'Tama S.L.P. Snare',
    note: 'Refined attack for the Flying Whales.',
  },
  {
    id: 'gear-george-kollias-001',
    date: '2026-02-25',
    type: CHANGE_TYPES.SWITCHED,
    title: 'George Kollias switches to Paiste RUDE cymbals',
    description: 'Nile\'s George Kollias completes his switch to the full Paiste RUDE series.',
    drummerId: 6,
    drummerName: 'George Kollias',
    drummerSlug: 'george-kollias',
    gearName: 'Paiste RUDE Series',
    gearSlug: 'paiste-rude-series',
    previousGear: 'Meinl Byzance',
    note: 'The fastest feet in death metal demands the loudest cymbals.',
  },
  {
    id: 'gear-matt-halpern-001',
    date: '2026-02-22',
    type: CHANGE_TYPES.ADDED,
    title: 'Matt Halpern adds Meinl Classics Custom Dark stack',
    description: 'Periphery\'s Matt Halpern incorporates Meinl Classics Custom Dark cymbals for studio work.',
    drummerId: 18,
    drummerName: 'Matt Halpern',
    drummerSlug: 'matt-halpern',
    gearName: 'Meinl Classics Custom Dark Cymbals',
    note: 'Expanding the djent palette.',
  },

  // More brand launches
  {
    id: 'brand-pearl-001',
    date: '2026-02-20',
    type: CHANGE_TYPES.BRAND_LAUNCH,
    title: 'Pearl Drums Brand Page Now Live',
    description: 'Explore Pearl drums, the Reference series, and Demon Drive pedals.',
    brandSlug: 'pearl',
    note: 'Japanese precision for extreme drumming.',
  },
  {
    id: 'brand-paiste-001',
    date: '2026-02-18',
    type: CHANGE_TYPES.BRAND_LAUNCH,
    title: 'Paiste Cymbals Brand Page Now Live',
    description: 'Swiss-made cymbals from the 2002 to RUDE series - all on MetalForge.',
    brandSlug: 'paiste',
    note: 'Iconic sound for thrash and death metal.',
  },
  {
    id: 'brand-sabian-001',
    date: '2026-02-15',
    type: CHANGE_TYPES.BRAND_LAUNCH,
    title: 'Sabian Cymbals Brand Page Now Live',
    description: 'AAX, HHX, and more - discover Sabian\'s metal offerings.',
    brandSlug: 'sabian',
    note: 'Canadian craftsmanship for heavy hitters.',
  },

  // Additional gear change events to round out the feed
  {
    id: 'gear-tomas-haake-001',
    date: '2026-02-12',
    type: CHANGE_TYPES.UPDATED,
    title: 'Tomas Haake updates Sabian HHX/AAX setup for 2026 tour',
    description: 'Meshuggah\'s Tomas Haake refines his Sabian HHX and AAX cymbal configuration ahead of the 2026 European tour cycle.',
    drummerId: 5,
    drummerName: 'Tomas Haake',
    drummerSlug: 'tomas-haake',
    gearName: 'Sabian HHX & AAX Series',
    note: 'Polymetric precision demands exact cymbal articulation at every tempo.',
  },
  {
    id: 'gear-danny-carey-001',
    date: '2026-02-10',
    type: CHANGE_TYPES.UPDATED,
    title: 'Danny Carey updates Paiste Signature ride for Fear Inoculum shows',
    description: 'Tool\'s Danny Carey fine-tunes his Paiste Signature Dry Heavy Ride configuration for the Fear Inoculum anniversary live dates.',
    drummerId: 14,
    drummerName: 'Danny Carey',
    drummerSlug: 'danny-carey',
    gearName: 'Paiste Signature Dry Heavy Ride',
    note: 'Crafting the exact sonic landscape Fear Inoculum demands live.',
  },
  {
    id: 'gear-brann-dailor-001',
    date: '2026-02-08',
    type: CHANGE_TYPES.ADDED,
    title: 'Brann Dailor adds Meinl Mb8 hi-hats to Mastodon live rig',
    description: 'Mastodon\'s Brann Dailor expands his Meinl setup with Mb8 series hi-hats for increased brightness in progressive passages.',
    drummerId: 16,
    drummerName: 'Brann Dailor',
    drummerSlug: 'brann-dailor',
    gearName: 'Meinl Mb8 Hi-Hats',
    note: 'Brighter articulation to complement the melodic Mastodon live sound.',
  },
  {
    id: 'gear-lars-ulrich-001',
    date: '2026-02-05',
    type: CHANGE_TYPES.UPDATED,
    title: 'Lars Ulrich tunes Tama Starclassic kit for 2026 Metallica dates',
    description: 'Metallica\'s Lars Ulrich updates his Tama Starclassic Maple configuration with adjusted tuning ahead of 2026 M72 World Tour arena shows.',
    drummerId: 1,
    drummerName: 'Lars Ulrich',
    drummerSlug: 'lars-ulrich',
    gearName: 'Tama Starclassic Maple',
    note: 'Same iconic setup, dialed in for stadium acoustics.',
  },
  {
    id: 'gear-mike-portnoy-001',
    date: '2026-02-03',
    type: CHANGE_TYPES.UPDATED,
    title: 'Mike Portnoy refreshes Tama kit for Dream Theater reunion run',
    description: 'Dream Theater\'s Mike Portnoy updates his Tama setup — continuing his decades-long partnership — for the full 2026 touring cycle following his reunion with the band.',
    drummerId: 13,
    drummerName: 'Mike Portnoy',
    drummerSlug: 'mike-portnoy',
    gearName: 'Tama Drums',
    note: 'Decades of Tama loyalty continues through the Dream Theater reunion era.',
  },
  {
    id: 'gear-charlie-benante-001',
    date: '2026-01-28',
    type: CHANGE_TYPES.ADDED,
    title: 'Charlie Benante adds Tama Speed Cobra 910 to Pantera touring kit',
    description: 'Anthrax\'s Charlie Benante integrates the Tama Speed Cobra 910 double pedal into his Pantera reunion touring rig for maximum velocity on Dimebag tributes.',
    drummerId: 12,
    drummerName: 'Charlie Benante',
    drummerSlug: 'charlie-benante',
    gearName: 'Tama Speed Cobra 910 Double Pedal',
    note: 'Extra speed for flying in Vinnie Paul\'s legendary footsteps.',
  },
];

// Get recent news (last N days)
export function getRecentNews(days = 30) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return GEAR_NEWS.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate >= cutoffDate;
  });
}

// Get news for a specific drummer
export function getNewsByDrummer(drummerId) {
  return GEAR_NEWS.filter(item => item.drummerId === drummerId);
}

// Get news for a specific brand
export function getNewsByBrand(brandSlug) {
  return GEAR_NEWS.filter(item => item.brandSlug === brandSlug);
}

// Get all news sorted by date (newest first)
export function getAllNews() {
  return [...GEAR_NEWS].sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Format date for display
export function formatNewsDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// Format relative time for display (e.g., "2 hours ago", "3 days ago")
export function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  
  if (diffSec < 60) return 'just now';
  if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? '' : 's'} ago`;
  if (diffHour < 24) return `${diffHour} hour${diffHour === 1 ? '' : 's'} ago`;
  if (diffDay < 7) return `${diffDay} day${diffDay === 1 ? '' : 's'} ago`;
  if (diffWeek < 4) return `${diffWeek} week${diffWeek === 1 ? '' : 's'} ago`;
  
  return formatNewsDate(dateString);
}

// Get recent gear updates for homepage "Recently Updated Gear" section (Issue #715)
// Returns only gear-related updates (ADDED, UPDATED, SWITCHED) with drummer info
// Formatted for display: drummer avatar, gear text, timestamp, profile link
export function getRecentGearUpdates(limit = 5) {
  const gearTypes = [CHANGE_TYPES.ADDED, CHANGE_TYPES.UPDATED, CHANGE_TYPES.SWITCHED];
  
  return GEAR_NEWS
    .filter(item => 
      gearTypes.includes(item.type) && 
      item.drummerId && 
      item.drummerName && 
      item.drummerSlug
    )
    .slice(0, limit)
    .map(item => ({
      id: item.id,
      drummerId: item.drummerId,
      drummerName: item.drummerName,
      drummerSlug: item.drummerSlug,
      gearName: item.gearName || item.title,
      changeType: item.type,
      changeLabel: getChangeTypeLabel(item.type),
      changeEmoji: getChangeTypeEmoji(item.type),
      date: item.date,
      relativeTime: formatRelativeTime(item.date),
      note: item.note,
      previousGear: item.previousGear,
    }));
}

export default GEAR_NEWS;
