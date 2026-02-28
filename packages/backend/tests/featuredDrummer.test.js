// Featured Drummer Module Tests (Issue #494)
const mockDrummers = [
  { id: 1, name: 'Lars Ulrich', band: 'Metallica', spotlight: { quickFacts: [], iconicMoment: 'Test', gearHighlight: 'Test' } },
  { id: 5, name: 'Tomas Haake', band: 'Meshuggah', spotlight: { quickFacts: [], iconicMoment: 'Test', gearHighlight: 'Test' } },
  { id: 14, name: 'Danny Carey', band: 'Tool', spotlight: { quickFacts: [], iconicMoment: 'Test', gearHighlight: 'Test' } },
  { id: 4, name: 'Dave Lombardo', band: 'Slayer', spotlight: { quickFacts: [], iconicMoment: 'Test', gearHighlight: 'Test' } },
  { id: 15, name: 'Mario Duplantier', band: 'Gojira', spotlight: { quickFacts: [], iconicMoment: 'Test', gearHighlight: 'Test' } },
];

const FEATURED_ROTATION = [5, 14, 4, 1, 15, 3, 6, 12, 8, 21, 2, 10, 7, 11, 9, 13, 16, 17, 18, 19, 20];

function getWeekNumber(date = new Date()) {
  const epochStart = new Date('2024-01-01');
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  return Math.floor((date - epochStart) / msPerWeek);
}

function getWeeklyFeaturedId(date = new Date()) {
  const week = getWeekNumber(date);
  return FEATURED_ROTATION[week % FEATURED_ROTATION.length];
}

function checkBirthday(drummer, lookAheadDays = 0) {
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

function toSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function getFeaturedDrummer(drummers, birthdayData = []) {
  const spotlightDrummers = drummers.filter(d => d.spotlight);
  for (const d of spotlightDrummers) {
    const bi = birthdayData.find(b => b.slug === toSlug(d.name) || b.name === d.name);
    if (bi && checkBirthday(bi, 0)?.isToday) {
      return { drummer: d, reason: '🎂 Happy Birthday!', type: 'birthday', isBirthdayFeature: true };
    }
  }
  const featuredId = getWeeklyFeaturedId();
  const drummer = drummers.find(d => d.id === featuredId) || spotlightDrummers[0];
  return drummer ? { drummer, reason: "This Week's Featured", type: 'weekly', isBirthdayFeature: false } : null;
}

describe('Featured Drummer Module', () => {
  describe('getWeekNumber', () => {
    it('returns positive for current date', () => expect(getWeekNumber()).toBeGreaterThan(0));
    it('increments weekly', () => expect(getWeekNumber(new Date('2025-01-08'))).toBe(getWeekNumber(new Date('2025-01-01')) + 1));
    it('returns 0 for epoch', () => expect(getWeekNumber(new Date('2024-01-01'))).toBe(0));
  });

  describe('getWeeklyFeaturedId', () => {
    it('returns ID from rotation', () => expect(FEATURED_ROTATION).toContain(getWeeklyFeaturedId()));
    it('rotates based on week', () => {
      expect(getWeeklyFeaturedId(new Date('2024-01-01'))).toBe(FEATURED_ROTATION[0]);
      expect(getWeeklyFeaturedId(new Date('2024-01-08'))).toBe(FEATURED_ROTATION[1]);
    });
  });

  describe('checkBirthday', () => {
    it('returns null without data', () => expect(checkBirthday({}, 0)).toBeNull());
    it('detects today', () => {
      const today = new Date();
      expect(checkBirthday({ birthMonth: today.getMonth() + 1, birthDay: today.getDate() }, 0)).toEqual({ isToday: true, daysUntil: 0 });
    });
  });

  describe('getFeaturedDrummer', () => {
    it('returns drummer with metadata', () => {
      const r = getFeaturedDrummer(mockDrummers, []);
      expect(r.drummer).toBeDefined();
      expect(r.type).toBe('weekly');
    });
    it('returns birthday type on birthday', () => {
      const today = new Date();
      const bd = [{ slug: 'lars-ulrich', name: 'Lars Ulrich', birthMonth: today.getMonth() + 1, birthDay: today.getDate() }];
      const r = getFeaturedDrummer(mockDrummers, bd);
      expect(r.type).toBe('birthday');
      expect(r.drummer.name).toBe('Lars Ulrich');
    });
    it('returns null for empty drummers', () => expect(getFeaturedDrummer([], [])).toBeNull());
  });

  describe('FEATURED_ROTATION', () => {
    it('has no duplicates', () => expect(new Set(FEATURED_ROTATION).size).toBe(FEATURED_ROTATION.length));
    it('has 21 drummers', () => expect(FEATURED_ROTATION.length).toBe(21));
  });
});
