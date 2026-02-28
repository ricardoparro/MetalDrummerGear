// Featured Drummer Module Tests (Issue #494)
const mockDrummers = [
  { id: 1, name: 'Lars Ulrich', band: 'Metallica', spotlight: {} },
  { id: 5, name: 'Tomas Haake', band: 'Meshuggah', spotlight: {} },
  { id: 14, name: 'Danny Carey', band: 'Tool', spotlight: {} },
];
const FEATURED_ROTATION = [5, 14, 4, 1, 15, 3, 6, 12, 8, 21, 2, 10, 7, 11, 9, 13, 16, 17, 18, 19, 20];

function getWeekNumber(date = new Date()) {
  return Math.floor((date - new Date('2024-01-01')) / (7 * 24 * 60 * 60 * 1000));
}
function getWeeklyFeaturedId(date = new Date()) {
  return FEATURED_ROTATION[getWeekNumber(date) % FEATURED_ROTATION.length];
}
function checkBirthday(d, days = 0) {
  if (!d.birthMonth || !d.birthDay) return null;
  const today = new Date(); today.setHours(0,0,0,0);
  let bd = new Date(today.getFullYear(), d.birthMonth - 1, d.birthDay); bd.setHours(0,0,0,0);
  if (bd.getTime() === today.getTime()) return { isToday: true, daysUntil: 0 };
  if (bd < today) bd = new Date(today.getFullYear() + 1, d.birthMonth - 1, d.birthDay);
  const diff = Math.round((bd - today) / (1000 * 60 * 60 * 24));
  return diff <= days ? { isToday: false, daysUntil: diff } : null;
}
function toSlug(n) { return n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }
function getFeaturedDrummer(drummers, birthdayData = []) {
  const spot = drummers.filter(d => d.spotlight);
  for (const d of spot) {
    const bi = birthdayData.find(b => b.slug === toSlug(d.name));
    if (bi && checkBirthday(bi, 0)?.isToday) return { drummer: d, type: 'birthday', isBirthdayFeature: true };
  }
  const drummer = drummers.find(d => d.id === getWeeklyFeaturedId()) || spot[0];
  return drummer ? { drummer, type: 'weekly', isBirthdayFeature: false } : null;
}

describe('Featured Drummer (Issue #494)', () => {
  test('getWeekNumber returns positive', () => expect(getWeekNumber()).toBeGreaterThan(0));
  test('getWeekNumber returns 0 for epoch', () => expect(getWeekNumber(new Date('2024-01-01'))).toBe(0));
  test('getWeeklyFeaturedId returns from rotation', () => expect(FEATURED_ROTATION).toContain(getWeeklyFeaturedId()));
  test('checkBirthday detects today', () => {
    const today = new Date();
    expect(checkBirthday({ birthMonth: today.getMonth() + 1, birthDay: today.getDate() }, 0)).toEqual({ isToday: true, daysUntil: 0 });
  });
  test('getFeaturedDrummer returns weekly by default', () => {
    const r = getFeaturedDrummer(mockDrummers, []);
    expect(r.type).toBe('weekly');
  });
  test('getFeaturedDrummer returns birthday on birthday', () => {
    const today = new Date();
    const bd = [{ slug: 'lars-ulrich', birthMonth: today.getMonth() + 1, birthDay: today.getDate() }];
    expect(getFeaturedDrummer(mockDrummers, bd).type).toBe('birthday');
  });
  test('FEATURED_ROTATION has 21 unique IDs', () => expect(new Set(FEATURED_ROTATION).size).toBe(21));
});
