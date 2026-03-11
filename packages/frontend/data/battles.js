// Drummer Battle - Weekly Voting Feature (Issue #689)
// Pits two drummers against each other for weekly votes to drive engagement

/**
 * Battle data model (TypeScript-compatible interface)
 * @typedef {Object} Battle
 * @property {string} id - Unique battle ID (week-year format)
 * @property {number} drummer1Id - First drummer's ID
 * @property {number} drummer2Id - Second drummer's ID
 * @property {string} slug - SEO-friendly URL slug (drummer1-slug-vs-drummer2-slug)
 * @property {number} votes1 - Vote count for drummer 1
 * @property {number} votes2 - Vote count for drummer 2
 * @property {string} weekStart - ISO date string for battle week start (Monday)
 * @property {string} weekEnd - ISO date string for battle week end (Sunday)
 * @property {boolean} isActive - Whether this battle is currently active
 */

// Popular drummers for battle rotation (by ID) - high engagement potential
export const BATTLE_POOL = [
  1,  // Lars Ulrich
  2,  // Joey Jordison
  3,  // Gene Hoglan
  4,  // Dave Lombardo
  5,  // Tomas Haake
  6,  // George Kollias
  7,  // Eloy Casagrande
  14, // Danny Carey
  15, // Mario Duplantier
  16, // Brann Dailor
  13, // Mike Portnoy
  17, // Chris Adler
  12, // Charlie Benante
  11, // Vinnie Paul
  19, // Inferno
  20, // Hellhammer
  21, // Pete Sandoval
];

// Predefined matchups for variety (optional - can use random selection)
export const CURATED_MATCHUPS = [
  { drummer1Id: 1, drummer2Id: 4, title: 'Thrash Legends' },   // Lars vs Dave Lombardo
  { drummer1Id: 2, drummer2Id: 7, title: 'Slipknot Showdown' }, // Joey vs Eloy
  { drummer1Id: 5, drummer2Id: 15, title: 'Progressive Giants' }, // Tomas vs Mario
  { drummer1Id: 14, drummer2Id: 13, title: 'Prog Masters' },   // Danny Carey vs Portnoy
  { drummer1Id: 3, drummer2Id: 6, title: 'Death Metal Kings' }, // Gene vs George
  { drummer1Id: 19, drummer2Id: 20, title: 'Black Metal Titans' }, // Inferno vs Hellhammer
  { drummer1Id: 11, drummer2Id: 4, title: 'Groove Metal Icons' }, // Vinnie Paul vs Lombardo
  { drummer1Id: 16, drummer2Id: 17, title: 'Modern Metal Masters' }, // Brann vs Chris Adler
];

// LocalStorage key for vote tracking
export const VOTE_STORAGE_KEY = 'metalforge_battle_votes';

/**
 * Get the current week number (Monday-based, ISO week)
 * @returns {number} Week number 1-53
 */
export function getISOWeekNumber(date = new Date()) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

/**
 * Get the Monday of the current week (battle start)
 * @returns {Date}
 */
export function getWeekStart(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Get the Sunday of the current week (battle end)
 * @returns {Date}
 */
export function getWeekEnd(date = new Date()) {
  const start = getWeekStart(date);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
}

/**
 * Generate a deterministic battle for a given week
 * Uses week number as seed for consistent results across all users
 * @param {number} weekNum - ISO week number
 * @param {number} year - Year
 * @returns {Object} Battle matchup
 */
export function generateWeeklyBattle(weekNum = getISOWeekNumber(), year = new Date().getFullYear()) {
  // Use curated matchups in rotation, with deterministic selection
  const seed = (weekNum + year * 53) % CURATED_MATCHUPS.length;
  const matchup = CURATED_MATCHUPS[seed];
  
  const weekStart = getWeekStart();
  const weekEnd = getWeekEnd();
  
  return {
    id: `battle-${year}-W${weekNum}`,
    drummer1Id: matchup.drummer1Id,
    drummer2Id: matchup.drummer2Id,
    title: matchup.title,
    weekStart: weekStart.toISOString(),
    weekEnd: weekEnd.toISOString(),
    weekNum,
    year,
    isActive: true,
  };
}

/**
 * Get battle slug from drummer slugs
 * @param {string} slug1 - First drummer's slug
 * @param {string} slug2 - Second drummer's slug
 * @returns {string} Battle slug
 */
export function getBattleSlug(slug1, slug2) {
  return `${slug1}-vs-${slug2}`;
}

/**
 * Generate drummer slug from name
 * @param {string} name - Drummer name
 * @returns {string} URL-friendly slug
 */
export function generateDrummerSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Check if user has already voted in current battle
 * @param {string} battleId - Battle ID
 * @returns {number|null} - Drummer ID voted for, or null
 */
export function getUserVote(battleId) {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  
  try {
    const votes = JSON.parse(localStorage.getItem(VOTE_STORAGE_KEY) || '{}');
    return votes[battleId] || null;
  } catch (e) {
    console.error('Error reading vote from localStorage:', e);
    return null;
  }
}

/**
 * Save user's vote to localStorage
 * @param {string} battleId - Battle ID
 * @param {number} drummerId - Drummer ID voted for
 * @returns {boolean} - Success
 */
export function saveUserVote(battleId, drummerId) {
  if (typeof window === 'undefined' || !window.localStorage) return false;
  
  try {
    const votes = JSON.parse(localStorage.getItem(VOTE_STORAGE_KEY) || '{}');
    votes[battleId] = drummerId;
    localStorage.setItem(VOTE_STORAGE_KEY, JSON.stringify(votes));
    return true;
  } catch (e) {
    console.error('Error saving vote to localStorage:', e);
    return false;
  }
}

/**
 * Check if user has voted in the current battle
 * @returns {boolean}
 */
export function hasVotedThisWeek() {
  const battle = generateWeeklyBattle();
  return getUserVote(battle.id) !== null;
}

/**
 * Calculate vote percentages
 * @param {number} votes1 - Votes for drummer 1
 * @param {number} votes2 - Votes for drummer 2
 * @returns {{ percent1: number, percent2: number, total: number }}
 */
export function calculatePercentages(votes1, votes2) {
  const total = votes1 + votes2;
  if (total === 0) return { percent1: 50, percent2: 50, total: 0 };
  
  return {
    percent1: Math.round((votes1 / total) * 100),
    percent2: Math.round((votes2 / total) * 100),
    total,
  };
}

/**
 * Generate social share text for battle
 * @param {Object} drummer1 - First drummer object
 * @param {Object} drummer2 - Second drummer object
 * @param {number|null} votedFor - ID of drummer voted for
 * @returns {string}
 */
export function generateShareText(drummer1, drummer2, votedFor = null) {
  if (votedFor === drummer1.id) {
    return `🥁 I voted for ${drummer1.name} in this week's Drummer Battle on MetalForge! Who's got better gear - ${drummer1.name} or ${drummer2.name}? Cast your vote!`;
  } else if (votedFor === drummer2.id) {
    return `🥁 I voted for ${drummer2.name} in this week's Drummer Battle on MetalForge! Who's got better gear - ${drummer1.name} or ${drummer2.name}? Cast your vote!`;
  }
  return `🥁 This Week's Drummer Battle: ${drummer1.name} vs ${drummer2.name}! Who has better gear? Vote now on MetalForge!`;
}

/**
 * Get share URLs for different platforms
 * @param {string} battleSlug - Battle URL slug
 * @param {string} shareText - Pre-filled share text
 * @returns {Object} URLs for each platform
 */
export function getShareUrls(battleSlug, shareText) {
  const baseUrl = 'https://metalforge.io';
  const battleUrl = `${baseUrl}/battles/${battleSlug}`;
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(battleUrl);
  
  return {
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedText}`,
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    copy: battleUrl,
  };
}

/**
 * Track battle vote with GA4
 * @param {Object} drummer - Drummer voted for
 * @param {string} battleId - Battle ID
 */
export function trackBattleVote(drummer, battleId) {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'drummer_battle_vote', {
    event_category: 'engagement',
    event_label: drummer.name,
    drummer_id: drummer.id,
    battle_id: battleId,
    drummer_name: drummer.name,
    drummer_band: drummer.band,
  });
}

/**
 * Track battle share with GA4
 * @param {string} platform - Share platform (twitter, facebook, etc.)
 * @param {string} battleId - Battle ID
 */
export function trackBattleShare(platform, battleId) {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'drummer_battle_share', {
    event_category: 'engagement',
    event_label: platform,
    battle_id: battleId,
    share_method: platform,
  });
}

/**
 * Get time remaining in current battle
 * @returns {{ days: number, hours: number, minutes: number, isExpired: boolean }}
 */
export function getTimeRemaining() {
  const weekEnd = getWeekEnd();
  const now = new Date();
  const diff = weekEnd - now;
  
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, isExpired: true };
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return { days, hours, minutes, isExpired: false };
}

/**
 * Format time remaining for display
 * @returns {string}
 */
export function formatTimeRemaining() {
  const { days, hours, minutes, isExpired } = getTimeRemaining();
  
  if (isExpired) return 'Battle ended';
  if (days > 0) return `${days}d ${hours}h left`;
  if (hours > 0) return `${hours}h ${minutes}m left`;
  return `${minutes}m left`;
}

// Past battle results (for history page - could be loaded from API)
export const PAST_BATTLES = [
  // Placeholder for past battles - populated by API/cron
];

export default {
  BATTLE_POOL,
  CURATED_MATCHUPS,
  VOTE_STORAGE_KEY,
  generateWeeklyBattle,
  getBattleSlug,
  generateDrummerSlug,
  getUserVote,
  saveUserVote,
  hasVotedThisWeek,
  calculatePercentages,
  generateShareText,
  getShareUrls,
  trackBattleVote,
  trackBattleShare,
  getTimeRemaining,
  formatTimeRemaining,
};
