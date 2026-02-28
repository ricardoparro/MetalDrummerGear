// Featured Drummer Module
// Curated weekly rotation with birthday/event overrides (Issue #494)
// Replaces random spotlight with editorial control

export const FEATURED_ROTATION = [
  5, 14, 4, 1, 15, 3, 6, 12, 8, 21, 2, 10, 7, 11, 9, 13, 16, 17, 18, 19, 20
];

export const MANUAL_OVERRIDE = { enabled: false, drummerId: null, reason: null, until: null };

export function getWeekNumber(date = new Date()) {
  const epochStart = new Date('2024-01-01');
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  return Math.floor((date - epochStart) / msPerWeek);
}

export function isManualOverrideActive() {
  if (!MANUAL_OVERRIDE.enabled || !MANUAL_OVERRIDE.drummerId) return false;
  if (MANUAL_OVERRIDE.until) return new Date() < new Date(MANUAL_OVERRIDE.until);
  return true;
}

export function checkBirthday(drummer, lookAheadDays = 0) {
  if (!drummer.birthMonth || !drummer.birthDay) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let bd = new Date(today.getFullYear(), drummer.birthMonth - 1, drummer.birthDay);
  bd.setHours(0, 0, 0, 0);
  if (bd.getTime() === today.getTime()) return { isToday: true, daysUntil: 0 };
  if (bd < today) bd = new Date(today.getFullYear() + 1, drummer.birthMonth - 1, drummer.birthDay);
  const days = Math.round((bd - today) / (1000 * 60 * 60 * 24));
  return days <= lookAheadDays ? { isToday: false, daysUntil: days } : null;
}

export function getWeeklyFeaturedId(date = new Date()) {
  return FEATURED_ROTATION[getWeekNumber(date) % FEATURED_ROTATION.length];
}

function toSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function getFeaturedDrummer(drummers, birthdayData = []) {
  if (isManualOverrideActive()) {
    const drummer = drummers.find(d => d.id === MANUAL_OVERRIDE.drummerId);
    if (drummer) return { drummer, reason: MANUAL_OVERRIDE.reason || 'Featured', type: 'manual', isBirthdayFeature: false };
  }
  const spotlightDrummers = drummers.filter(d => d.spotlight);
  for (const drummer of spotlightDrummers) {
    const birthdayInfo = birthdayData.find(b => b.slug === toSlug(drummer.name) || b.name === drummer.name);
    if (birthdayInfo && checkBirthday(birthdayInfo, 0)?.isToday) {
      return { drummer, reason: \`🎂 Happy Birthday \${drummer.name.split(' ')[0]}!\`, type: 'birthday', isBirthdayFeature: true };
    }
  }
  const featuredId = getWeeklyFeaturedId();
  const drummer = drummers.find(d => d.id === featuredId) || spotlightDrummers[0];
  if (!drummer) return null;
  return { drummer, reason: "This Week's Featured", type: 'weekly', isBirthdayFeature: false, weekNumber: (getWeekNumber() % FEATURED_ROTATION.length) + 1 };
}

export function getUpcomingSpotlightBirthdays(drummers, birthdayData = []) {
  const spotlightDrummers = drummers.filter(d => d.spotlight);
  const upcoming = [];
  for (const drummer of spotlightDrummers) {
    const birthdayInfo = birthdayData.find(b => b.slug === toSlug(drummer.name) || b.name === drummer.name);
    if (birthdayInfo) {
      const birthday = checkBirthday(birthdayInfo, 7);
      if (birthday && !birthday.isToday) upcoming.push({ drummer, daysUntil: birthday.daysUntil });
    }
  }
  return upcoming.sort((a, b) => a.daysUntil - b.daysUntil);
}

export function getFeaturedSchedule(drummers, weeks = 4) {
  const schedule = [];
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const epochStart = new Date('2024-01-01');
  for (let i = 0; i < weeks; i++) {
    const week = getWeekNumber() + i;
    const drummer = drummers.find(d => d.id === FEATURED_ROTATION[week % FEATURED_ROTATION.length]);
    if (drummer) {
      const weekStart = new Date(epochStart.getTime() + week * msPerWeek);
      const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);
      schedule.push({ drummer, weekStart, weekEnd, isCurrent: i === 0 });
    }
  }
  return schedule;
}

export default { FEATURED_ROTATION, MANUAL_OVERRIDE, getWeekNumber, isManualOverrideActive, checkBirthday, getWeeklyFeaturedId, getFeaturedDrummer, getUpcomingSpotlightBirthdays, getFeaturedSchedule };
