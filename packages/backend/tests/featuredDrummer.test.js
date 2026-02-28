// Featured Drummer Module Tests (Issue #494)
// Tests for curated weekly rotation with birthday overrides

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
  
  // Priority 1: Birthday today
  for (const d of spotlightDrummers) {
    const bi = birthdayData.find(b => b.slug === toSlug(d.name) || b.name === d.name);
    if (bi && checkBirthday(bi, 0)?.isToday) {
      return { drummer: d, reason: `🎂 Happy Birthday ${d.name.split(' ')[0]}!`, type: 'birthday', isBirthdayFeature: true };
    }
  }
  
  // Priority 2: Weekly rotation
  const featuredId = getWeeklyFeaturedId();
  const drummer = drummers.find(d => d.id === featuredId) || spotlightDrummers[0];
  return drummer ? { drummer, reason: "This Week's Featured", type: 'weekly', isBirthdayFeature: false } : null;
}

describe('Featured Drummer Module (Issue #494)', () => {
  describe('getWeekNumber', () => {
    it('returns positive week number for current date', () => {
      expect(getWeekNumber()).toBeGreaterThan(0);
    });

    it('increments by 1 for each week', () => {
      const week1 = getWeekNumber(new Date('2025-01-01'));
      const week2 = getWeekNumber(new Date('2025-01-08'));
      expect(week2).toBe(week1 + 1);
    });

    it('returns 0 for epoch start date', () => {
      expect(getWeekNumber(new Date('2024-01-01'))).toBe(0);
    });

    it('returns deterministic values for same date', () => {
      const date = new Date('2025-06-15');
      expect(getWeekNumber(date)).toBe(getWeekNumber(date));
    });
  });

  describe('getWeeklyFeaturedId', () => {
    it('returns ID from FEATURED_ROTATION array', () => {
      const id = getWeeklyFeaturedId();
      expect(FEATURED_ROTATION).toContain(id);
    });

    it('rotates through drummers based on week number', () => {
      const week0Id = getWeeklyFeaturedId(new Date('2024-01-01'));
      const week1Id = getWeeklyFeaturedId(new Date('2024-01-08'));
      expect(week0Id).toBe(FEATURED_ROTATION[0]); // Tomas Haake (id: 5)
      expect(week1Id).toBe(FEATURED_ROTATION[1]); // Danny Carey (id: 14)
    });

    it('cycles back to beginning after full rotation', () => {
      const totalWeeks = FEATURED_ROTATION.length;
      const startDate = new Date('2024-01-01');
      const cycleDate = new Date(startDate.getTime() + totalWeeks * 7 * 24 * 60 * 60 * 1000);
      expect(getWeeklyFeaturedId(cycleDate)).toBe(FEATURED_ROTATION[0]);
    });
  });

  describe('checkBirthday', () => {
    it('returns null for drummer without birthday data', () => {
      expect(checkBirthday({}, 0)).toBeNull();
    });

    it('returns isToday=true for birthday today', () => {
      const today = new Date();
      const drummer = { birthMonth: today.getMonth() + 1, birthDay: today.getDate() };
      const result = checkBirthday(drummer, 0);
      expect(result).toEqual({ isToday: true, daysUntil: 0 });
    });

    it('returns isToday=false for upcoming birthday within lookAhead', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const drummer = { birthMonth: tomorrow.getMonth() + 1, birthDay: tomorrow.getDate() };
      const result = checkBirthday(drummer, 7);
      expect(result).toEqual({ isToday: false, daysUntil: 1 });
    });

    it('returns null for birthday outside lookAhead window', () => {
      const farFuture = new Date();
      farFuture.setDate(farFuture.getDate() + 30);
      const drummer = { birthMonth: farFuture.getMonth() + 1, birthDay: farFuture.getDate() };
      expect(checkBirthday(drummer, 7)).toBeNull();
    });
  });

  describe('getFeaturedDrummer', () => {
    it('returns drummer object with metadata', () => {
      const result = getFeaturedDrummer(mockDrummers, []);
      expect(result).toBeDefined();
      expect(result.drummer).toBeDefined();
      expect(result.reason).toBeDefined();
      expect(result.type).toBeDefined();
    });

    it('returns weekly type when no birthday', () => {
      const result = getFeaturedDrummer(mockDrummers, []);
      expect(result.type).toBe('weekly');
      expect(result.isBirthdayFeature).toBe(false);
    });

    it('returns birthday type when drummer has birthday today', () => {
      const today = new Date();
      const birthdayData = [{
        slug: 'lars-ulrich',
        name: 'Lars Ulrich',
        birthMonth: today.getMonth() + 1,
        birthDay: today.getDate(),
      }];
      const result = getFeaturedDrummer(mockDrummers, birthdayData);
      expect(result.type).toBe('birthday');
      expect(result.isBirthdayFeature).toBe(true);
      expect(result.drummer.name).toBe('Lars Ulrich');
    });

    it('returns null for empty drummers array', () => {
      expect(getFeaturedDrummer([], [])).toBeNull();
    });

    it('falls back to first spotlight drummer if featured ID not found', () => {
      const drilldownDrummers = [
        { id: 999, name: 'Unknown', band: 'Test', spotlight: { quickFacts: [], iconicMoment: 'T', gearHighlight: 'T' } },
      ];
      const result = getFeaturedDrummer(drilldownDrummers, []);
      expect(result.drummer.id).toBe(999);
    });
  });

  describe('FEATURED_ROTATION', () => {
    it('has no duplicate drummer IDs', () => {
      const uniqueIds = new Set(FEATURED_ROTATION);
      expect(uniqueIds.size).toBe(FEATURED_ROTATION.length);
    });

    it('has 21 drummers in rotation', () => {
      expect(FEATURED_ROTATION.length).toBe(21);
    });

    it('starts with Tomas Haake (ID: 5)', () => {
      expect(FEATURED_ROTATION[0]).toBe(5);
    });
  });

  describe('toSlug', () => {
    it('converts name to lowercase slug', () => {
      expect(toSlug('Lars Ulrich')).toBe('lars-ulrich');
    });

    it('handles special characters', () => {
      expect(toSlug("Joey Jordison's")).toBe('joey-jordison-s');
    });

    it('removes leading/trailing hyphens', () => {
      expect(toSlug('  Test Name  ')).toBe('test-name');
    });
  });
});
