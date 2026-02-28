// Featured Drummer rotation configuration (Issue #494)
// Curated weekly rotation with birthday overrides

/**
 * Manual override for special events/news
 * Set to null for normal rotation, or specify a drummer to override
 * @example
 * {
 *   id: 5,                    // Drummer ID
 *   reason: 'Meshuggah tour', // Display reason
 *   until: '2026-03-15',      // Auto-expire date (optional)
 * }
 */
export const MANUAL_OVERRIDE = null;

/**
 * Curated list of featured drummer IDs with reasons
 * These drummers rotate weekly on the homepage spotlight
 * Order matters - this is the rotation sequence
 */
export const FEATURED_ROTATION = [
  {
    id: 5,  // Tomas Haake
    reason: 'Polyrhythm Pioneer',
    highlight: 'Meshuggah\'s mathematical precision',
  },
  {
    id: 14, // Danny Carey
    reason: 'Progressive Virtuoso',
    highlight: 'Tool\'s polymetric complexity',
  },
  {
    id: 4,  // Dave Lombardo
    reason: 'Thrash Metal Legend',
    highlight: 'Slayer\'s godfather of speed',
  },
  {
    id: 1,  // Lars Ulrich
    reason: 'Metal Icon',
    highlight: 'Metallica\'s driving force',
  },
  {
    id: 15, // Mario Duplantier
    reason: 'Modern Metal Innovator',
    highlight: 'Gojira\'s explosive power',
  },
  {
    id: 3,  // Gene Hoglan
    reason: 'The Atomic Clock',
    highlight: 'Death/Testament\'s precision',
  },
  {
    id: 2,  // Joey Jordison
    reason: 'Extreme Metal Legend',
    highlight: 'Slipknot\'s aggressive pioneer',
  },
  {
    id: 6,  // George Kollias
    reason: 'Speed King',
    highlight: 'Nile\'s technical mastery',
  },
  {
    id: 16, // Brann Dailor
    reason: 'Progressive Powerhouse',
    highlight: 'Mastodon\'s complex grooves',
  },
  {
    id: 17, // Chris Adler
    reason: 'Groove Metal Master',
    highlight: 'Lamb of God\'s signature sound',
  },
];

/**
 * Get the current ISO week number
 */
export function getISOWeekNumber(date = new Date()) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

/**
 * Get simple week number since epoch for consistent rotation
 */
export function getWeeksSinceEpoch(date = new Date()) {
  const epochStart = new Date('2024-01-01');
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  return Math.floor((date - epochStart) / msPerWeek);
}

/**
 * Check if a drummer has a birthday within N days
 */
export function checkBirthdayInRange(birthdayData, drummerSlug, days = 7, fromDate = new Date()) {
  if (!birthdayData || !drummerSlug) return null;
  const birthday = birthdayData.find(b => b.slug === drummerSlug);
  if (!birthday) return null;
  const today = new Date(fromDate);
  today.setHours(0, 0, 0, 0);
  const currentYearBirthday = new Date(today.getFullYear(), birthday.birthMonth - 1, birthday.birthDay);
  currentYearBirthday.setHours(0, 0, 0, 0);
  if (currentYearBirthday < today) {
    currentYearBirthday.setFullYear(currentYearBirthday.getFullYear() + 1);
  }
  const diffDays = Math.ceil((currentYearBirthday - today) / (1000 * 60 * 60 * 24));
  if (diffDays >= 0 && diffDays <= days) {
    const age = currentYearBirthday.getFullYear() - birthday.birthYear;
    return { ...birthday, daysUntil: diffDays, isToday: diffDays === 0, upcomingAge: age };
  }
  return null;
}

function toSlug(name) {
  return name.toLowerCase().replace(/[åä]/g, 'a').replace(/[ö]/g, 'o').replace(/[ü]/g, 'u').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/**
 * Get upcoming spotlight birthdays (within next 7 days)
 */
export function getUpcomingSpotlightBirthdays(drummers, birthdayData, days = 7) {
  if (!drummers || !birthdayData) return [];
  const today = new Date();
  const upcoming = [];
  for (const featured of FEATURED_ROTATION) {
    const drummer = drummers.find(d => d.id === featured.id);
    if (!drummer) continue;
    const slug = toSlug(drummer.name);
    const birthdayInfo = checkBirthdayInRange(birthdayData, slug, days, today);
    if (birthdayInfo) {
      upcoming.push({ drummer, birthday: birthdayInfo, featured });
    }
  }
  return upcoming.sort((a, b) => a.birthday.daysUntil - b.birthday.daysUntil);
}

/**
 * Get the currently featured drummer with rotation logic
 * Priority: Manual Override > Birthday Override > Weekly Rotation
 */
export function getFeaturedDrummer(drummers, birthdayData = null, date = new Date()) {
  if (!drummers || drummers.length === 0) return null;
  
  // 1. Check manual override
  if (MANUAL_OVERRIDE) {
    if (MANUAL_OVERRIDE.until) {
      const expiry = new Date(MANUAL_OVERRIDE.until);
      if (date <= expiry) {
        const drummer = drummers.find(d => d.id === MANUAL_OVERRIDE.id);
        if (drummer && drummer.spotlight) {
          return { ...drummer, featuredReason: MANUAL_OVERRIDE.reason, featuredType: 'manual', featuredUntil: MANUAL_OVERRIDE.until };
        }
      }
    } else {
      const drummer = drummers.find(d => d.id === MANUAL_OVERRIDE.id);
      if (drummer && drummer.spotlight) {
        return { ...drummer, featuredReason: MANUAL_OVERRIDE.reason, featuredType: 'manual' };
      }
    }
  }
  
  // 2. Check birthday override (within 3 days)
  if (birthdayData) {
    const upcomingBirthdays = getUpcomingSpotlightBirthdays(drummers, birthdayData, 3);
    if (upcomingBirthdays.length > 0) {
      const { drummer, birthday } = upcomingBirthdays[0];
      if (drummer.spotlight) {
        const reason = birthday.isToday ? `🎂 Happy Birthday! Turning ${birthday.upcomingAge}` : `🎂 Birthday in ${birthday.daysUntil} day${birthday.daysUntil > 1 ? 's' : ''}!`;
        return { ...drummer, featuredReason: reason, featuredType: 'birthday', birthday };
      }
    }
  }
  
  // 3. Weekly rotation from curated list
  const weekNumber = getWeeksSinceEpoch(date);
  const rotationIndex = weekNumber % FEATURED_ROTATION.length;
  const featuredEntry = FEATURED_ROTATION[rotationIndex];
  const drummer = drummers.find(d => d.id === featuredEntry.id);
  
  if (!drummer || !drummer.spotlight) {
    for (const entry of FEATURED_ROTATION) {
      const fallback = drummers.find(d => d.id === entry.id && d.spotlight);
      if (fallback) {
        return { ...fallback, featuredReason: entry.reason, featuredHighlight: entry.highlight, featuredType: 'rotation', rotationIndex };
      }
    }
    return null;
  }
  
  return { ...drummer, featuredReason: featuredEntry.reason, featuredHighlight: featuredEntry.highlight, featuredType: 'rotation', rotationIndex };
}

/**
 * Get the schedule of upcoming featured drummers
 */
export function getFeaturedSchedule(drummers, weeks = 12) {
  if (!drummers || drummers.length === 0) return [];
  const schedule = [];
  const today = new Date();
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  for (let i = 0; i < weeks; i++) {
    const weekDate = new Date(today.getTime() + i * msPerWeek);
    const weekNumber = getWeeksSinceEpoch(weekDate);
    const rotationIndex = weekNumber % FEATURED_ROTATION.length;
    const featuredEntry = FEATURED_ROTATION[rotationIndex];
    const drummer = drummers.find(d => d.id === featuredEntry.id);
    if (drummer) {
      schedule.push({ week: i, weekNumber, startDate: weekDate, drummer, reason: featuredEntry.reason, highlight: featuredEntry.highlight, isCurrent: i === 0 });
    }
  }
  return schedule;
}

/**
 * Get past featured drummers (for archive)
 */
export function getFeaturedHistory(drummers, weeks = 12) {
  if (!drummers || drummers.length === 0) return [];
  const history = [];
  const today = new Date();
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  for (let i = 0; i < weeks; i++) {
    const weekDate = new Date(today.getTime() - i * msPerWeek);
    const weekNumber = getWeeksSinceEpoch(weekDate);
    const rotationIndex = weekNumber % FEATURED_ROTATION.length;
    const featuredEntry = FEATURED_ROTATION[rotationIndex];
    const drummer = drummers.find(d => d.id === featuredEntry.id);
    if (drummer) {
      history.push({ week: -i, weekNumber, startDate: weekDate, drummer, reason: featuredEntry.reason, highlight: featuredEntry.highlight, isCurrent: i === 0 });
    }
  }
  return history;
}

export default { FEATURED_ROTATION, MANUAL_OVERRIDE, getFeaturedDrummer, getFeaturedSchedule, getFeaturedHistory, getUpcomingSpotlightBirthdays, getISOWeekNumber, getWeeksSinceEpoch, checkBirthdayInRange };
