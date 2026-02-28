// Featured Drummer Module
// Curated weekly rotation with birthday/event overrides (Issue #494)
// Replaces random spotlight with editorial control

/**
 * Curated list of drummer IDs for weekly rotation
 * Order determines the rotation sequence
 * Edit this list to control which drummers get featured
 */
export const FEATURED_ROTATION = [
  5,   // Tomas Haake - Meshuggah (The Atomic Clock)
  14,  // Danny Carey - Tool (Polyrhythm master)
  4,   // Dave Lombardo - Slayer (Godfather of double bass)
  1,   // Lars Ulrich - Metallica (Most influential)
  15,  // Mario Duplantier - Gojira (Eco-metal pioneer)
  3,   // Joey Jordison - Slipknot (RIP legend)
  6,   // Gene Hoglan - Testament/Death (The Atomic Clock)
  12,  // Mike Portnoy - Dream Theater (Progressive icon)
  8,   // George Kollias - Nile (Extreme precision)
  21,  // Eloy Casagrande - Slipknot/Sepultura (New generation)
  2,   // Vinnie Paul - Pantera (Groove metal architect)
  10,  // Brann Dailor - Mastodon (Progressive beast)
  7,   // Matt Halpern - Periphery (Djent pioneer)
  11,  // Chris Adler - Lamb of God (Groove master)
  9,   // Gavin Harrison - Porcupine Tree/King Crimson (Jazz precision)
  13,  // Inferno - Behemoth (Extreme metal icon)
  16,  // Hellhammer - Mayhem (Black metal legend)
  17,  // Flo Mounier - Cryptopsy (Technical death master)
  18,  // Pete Sandoval - Morbid Angel (Blast beat pioneer)
  19,  // Derek Roddy - Hate Eternal (Speed demon)
  20,  // Matt Greiner - August Burns Red (Metalcore precision)
];

/**
 * Manual override for special events
 * Set this to feature a specific drummer for a time period
 * Takes priority over both birthday and weekly rotation
 */
export const MANUAL_OVERRIDE = {
  enabled: false,
  drummerId: null,
  reason: null,
  until: null, // ISO date string, e.g., '2026-03-15'
};

/**
 * Get the current week number since epoch for deterministic rotation
 */
export function getWeekNumber(date = new Date()) {
  const epochStart = new Date('2024-01-01');
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  return Math.floor((date - epochStart) / msPerWeek);
}

/**
 * Check if manual override is currently active
 */
export function isManualOverrideActive() {
  if (!MANUAL_OVERRIDE.enabled || !MANUAL_OVERRIDE.drummerId) return false;
  if (MANUAL_OVERRIDE.until) return new Date() < new Date(MANUAL_OVERRIDE.until);
  return true;
}

/**
 * Check if a drummer has a birthday today or within the next N days
 */
export function checkBirthday(drummer, lookAheadDays = 0) {
  if (!drummer.birthMonth || !drummer.birthDay) return null;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const currentYear = today.getFullYear();
  
  let birthdayThisYear = new Date(currentYear, drummer.birthMonth - 1, drummer.birthDay);
  birthdayThisYear.setHours(0, 0, 0, 0);
  
  if (birthdayThisYear.getTime() === today.getTime()) {
    return { isToday: true, daysUntil: 0 };
  }
  
  if (birthdayThisYear < today) {
    birthdayThisYear = new Date(currentYear + 1, drummer.birthMonth - 1, drummer.birthDay);
    birthdayThisYear.setHours(0, 0, 0, 0);
  }
  
  const diffDays = Math.round((birthdayThisYear - today) / (1000 * 60 * 60 * 24));
  return diffDays <= lookAheadDays ? { isToday: false, daysUntil: diffDays } : null;
}

/**
 * Get the drummer ID that should be featured based on weekly rotation
 */
export function getWeeklyFeaturedId(date = new Date()) {
  const week = getWeekNumber(date);
  return FEATURED_ROTATION[week % FEATURED_ROTATION.length];
}

/**
 * Helper: Convert name to URL slug
 */
function toSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

/**
 * Main function to determine the currently featured drummer
 * Priority: Manual Override > Birthday Today > Weekly Rotation
 */
export function getFeaturedDrummer(drummers, birthdayData = []) {
  // Priority 1: Manual override
  if (isManualOverrideActive()) {
    const drummer = drummers.find(d => d.id === MANUAL_OVERRIDE.drummerId);
    if (drummer) {
      return { drummer, reason: MANUAL_OVERRIDE.reason || 'Featured', type: 'manual', isBirthdayFeature: false };
    }
  }
  
  // Priority 2: Birthday today
  const spotlightDrummers = drummers.filter(d => d.spotlight);
  for (const drummer of spotlightDrummers) {
    const birthdayInfo = birthdayData.find(b => b.slug === toSlug(drummer.name) || b.name === drummer.name);
    if (birthdayInfo) {
      const birthday = checkBirthday(birthdayInfo, 0);
      if (birthday?.isToday) {
        return {
          drummer,
          reason: \`🎂 Happy Birthday \${drummer.name.split(' ')[0]}!\`,
          type: 'birthday',
          isBirthdayFeature: true,
        };
      }
    }
  }
  
  // Priority 3: Weekly rotation
  const featuredId = getWeeklyFeaturedId();
  const drummer = drummers.find(d => d.id === featuredId) || spotlightDrummers[0];
  
  if (!drummer) return null;
  
  return {
    drummer,
    reason: "This Week's Featured",
    type: 'weekly',
    isBirthdayFeature: false,
    weekNumber: (getWeekNumber() % FEATURED_ROTATION.length) + 1,
  };
}

/**
 * Get upcoming birthdays for spotlight drummers (next 7 days)
 */
export function getUpcomingSpotlightBirthdays(drummers, birthdayData = []) {
  const spotlightDrummers = drummers.filter(d => d.spotlight);
  const upcoming = [];
  
  for (const drummer of spotlightDrummers) {
    const birthdayInfo = birthdayData.find(b => b.slug === toSlug(drummer.name) || b.name === drummer.name);
    if (birthdayInfo) {
      const birthday = checkBirthday(birthdayInfo, 7);
      if (birthday && !birthday.isToday) {
        upcoming.push({ drummer, daysUntil: birthday.daysUntil });
      }
    }
  }
  
  return upcoming.sort((a, b) => a.daysUntil - b.daysUntil);
}

/**
 * Get the full rotation schedule with dates
 */
export function getFeaturedSchedule(drummers, weeks = 4) {
  const schedule = [];
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const epochStart = new Date('2024-01-01');
  
  for (let i = 0; i < weeks; i++) {
    const week = getWeekNumber() + i;
    const drummerId = FEATURED_ROTATION[week % FEATURED_ROTATION.length];
    const drummer = drummers.find(d => d.id === drummerId);
    
    if (drummer) {
      const weekStart = new Date(epochStart.getTime() + week * msPerWeek);
      const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);
      schedule.push({ drummer, weekStart, weekEnd, isCurrent: i === 0 });
    }
  }
  
  return schedule;
}

export default {
  FEATURED_ROTATION,
  MANUAL_OVERRIDE,
  getWeekNumber,
  isManualOverrideActive,
  checkBirthday,
  getWeeklyFeaturedId,
  getFeaturedDrummer,
  getUpcomingSpotlightBirthdays,
  getFeaturedSchedule,
};
