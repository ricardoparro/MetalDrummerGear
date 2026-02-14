// Drummer Birthdays Data
// Structured birthday information for the birthday calendar feature
// Issue #343: Create drummer birthday calendar (shareable evergreen content)

export const drummerBirthdays = [
  {
    slug: 'lars-ulrich',
    name: 'Lars Ulrich',
    band: 'Metallica',
    birthDate: '1963-12-26',
    birthMonth: 12,
    birthDay: 26,
    birthYear: 1963,
    birthPlace: 'Gentofte, Denmark',
    deathDate: null,
    image: '/images/drummers/lars-ulrich.webp',
    isLiving: true
  },
  {
    slug: 'joey-jordison',
    name: 'Joey Jordison',
    band: 'Slipknot',
    birthDate: '1975-04-26',
    birthMonth: 4,
    birthDay: 26,
    birthYear: 1975,
    birthPlace: 'Des Moines, Iowa, USA',
    deathDate: '2021-07-26',
    image: '/images/drummers/joey-jordison.webp',
    isLiving: false
  },
  {
    slug: 'gene-hoglan',
    name: 'Gene Hoglan',
    band: 'Testament / Death',
    birthDate: '1967-08-31',
    birthMonth: 8,
    birthDay: 31,
    birthYear: 1967,
    birthPlace: 'Dallas, Texas, USA',
    deathDate: null,
    image: '/images/drummers/gene-hoglan.webp',
    isLiving: true
  },
  {
    slug: 'dave-lombardo',
    name: 'Dave Lombardo',
    band: 'Slayer',
    birthDate: '1965-02-16',
    birthMonth: 2,
    birthDay: 16,
    birthYear: 1965,
    birthPlace: 'Havana, Cuba',
    deathDate: null,
    image: '/images/drummers/dave-lombardo.webp',
    isLiving: true
  },
  {
    slug: 'tomas-haake',
    name: 'Tomas Haake',
    band: 'Meshuggah',
    birthDate: '1971-07-13',
    birthMonth: 7,
    birthDay: 13,
    birthYear: 1971,
    birthPlace: 'Örebro, Sweden',
    deathDate: null,
    image: '/images/drummers/tomas-haake.webp',
    isLiving: true
  },
  {
    slug: 'george-kollias',
    name: 'George Kollias',
    band: 'Nile',
    birthDate: '1977-08-30',
    birthMonth: 8,
    birthDay: 30,
    birthYear: 1977,
    birthPlace: 'Korinth, Greece',
    deathDate: null,
    image: '/images/drummers/george-kollias.webp',
    isLiving: true
  },
  {
    slug: 'eloy-casagrande',
    name: 'Eloy Casagrande',
    band: 'Slipknot / Sepultura',
    birthDate: '1991-08-25',
    birthMonth: 8,
    birthDay: 25,
    birthYear: 1991,
    birthPlace: 'São Paulo, Brazil',
    deathDate: null,
    image: '/images/drummers/eloy-casagrande.webp',
    isLiving: true
  },
  {
    slug: 'mike-portnoy',
    name: 'Mike Portnoy',
    band: 'Dream Theater',
    birthDate: '1967-04-20',
    birthMonth: 4,
    birthDay: 20,
    birthYear: 1967,
    birthPlace: 'Long Beach, New York, USA',
    deathDate: null,
    image: '/images/drummers/mike-portnoy.webp',
    isLiving: true
  },
  {
    slug: 'danny-carey',
    name: 'Danny Carey',
    band: 'Tool',
    birthDate: '1961-05-10',
    birthMonth: 5,
    birthDay: 10,
    birthYear: 1961,
    birthPlace: 'Lawrence, Kansas, USA',
    deathDate: null,
    image: '/images/drummers/danny-carey.webp',
    isLiving: true
  },
  {
    slug: 'mario-duplantier',
    name: 'Mario Duplantier',
    band: 'Gojira',
    birthDate: '1981-06-19',
    birthMonth: 6,
    birthDay: 19,
    birthYear: 1981,
    birthPlace: 'Ondres, France',
    deathDate: null,
    image: '/images/drummers/mario-duplantier.webp',
    isLiving: true
  },
  {
    slug: 'paul-bostaph',
    name: 'Paul Bostaph',
    band: 'Slayer',
    birthDate: '1964-03-04',
    birthMonth: 3,
    birthDay: 4,
    birthYear: 1964,
    birthPlace: 'San Francisco, California, USA',
    deathDate: null,
    image: '/images/drummers/paul-bostaph.webp',
    isLiving: true
  },
  {
    slug: 'jon-dette',
    name: 'Jon Dette',
    band: 'Testament / Slayer',
    birthDate: '1967-08-25',
    birthMonth: 8,
    birthDay: 25,
    birthYear: 1967,
    birthPlace: 'Milwaukee, Wisconsin, USA',
    deathDate: null,
    image: '/images/drummers/jon-dette.webp',
    isLiving: true
  }
];

// Month names for display
export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Get all birthdays sorted by month/day (calendar order)
export function getAllBirthdaysSorted() {
  return [...drummerBirthdays].sort((a, b) => {
    if (a.birthMonth !== b.birthMonth) {
      return a.birthMonth - b.birthMonth;
    }
    return a.birthDay - b.birthDay;
  });
}

// Get birthdays for a specific month (1-12)
export function getBirthdaysByMonth(month) {
  return drummerBirthdays.filter(d => d.birthMonth === month)
    .sort((a, b) => a.birthDay - b.birthDay);
}

// Get today's birthdays
export function getTodaysBirthdays() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return drummerBirthdays.filter(d => d.birthMonth === month && d.birthDay === day);
}

// Get upcoming birthdays (next N days)
export function getUpcomingBirthdays(days = 30) {
  const today = new Date();
  const upcoming = [];
  
  for (let i = 0; i <= days; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() + i);
    const month = checkDate.getMonth() + 1;
    const day = checkDate.getDate();
    
    const matches = drummerBirthdays.filter(d => d.birthMonth === month && d.birthDay === day);
    matches.forEach(drummer => {
      upcoming.push({
        ...drummer,
        daysUntil: i
      });
    });
  }
  
  return upcoming;
}

// Get the next birthday
export function getNextBirthday() {
  const upcoming = getUpcomingBirthdays(365);
  return upcoming.length > 0 ? upcoming[0] : null;
}

// Calculate age for a drummer
export function calculateAge(birthYear, birthMonth, birthDay, deathDate = null) {
  const endDate = deathDate ? new Date(deathDate) : new Date();
  const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
  
  let age = endDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = endDate.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && endDate.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

// Format birthday for display
export function formatBirthday(month, day) {
  return `${MONTH_NAMES[month - 1]} ${day}`;
}

// Get drummers grouped by month
export function getBirthdaysByMonthGrouped() {
  const grouped = {};
  
  for (let month = 1; month <= 12; month++) {
    const monthBirthdays = getBirthdaysByMonth(month);
    if (monthBirthdays.length > 0) {
      grouped[month] = {
        name: MONTH_NAMES[month - 1],
        birthdays: monthBirthdays
      };
    }
  }
  
  return grouped;
}

// Get zodiac sign for a birthday
export function getZodiacSign(month, day) {
  const signs = [
    { name: 'Capricorn', emoji: '♑', start: [1, 1], end: [1, 19] },
    { name: 'Aquarius', emoji: '♒', start: [1, 20], end: [2, 18] },
    { name: 'Pisces', emoji: '♓', start: [2, 19], end: [3, 20] },
    { name: 'Aries', emoji: '♈', start: [3, 21], end: [4, 19] },
    { name: 'Taurus', emoji: '♉', start: [4, 20], end: [5, 20] },
    { name: 'Gemini', emoji: '♊', start: [5, 21], end: [6, 20] },
    { name: 'Cancer', emoji: '♋', start: [6, 21], end: [7, 22] },
    { name: 'Leo', emoji: '♌', start: [7, 23], end: [8, 22] },
    { name: 'Virgo', emoji: '♍', start: [8, 23], end: [9, 22] },
    { name: 'Libra', emoji: '♎', start: [9, 23], end: [10, 22] },
    { name: 'Scorpio', emoji: '♏', start: [10, 23], end: [11, 21] },
    { name: 'Sagittarius', emoji: '♐', start: [11, 22], end: [12, 21] },
    { name: 'Capricorn', emoji: '♑', start: [12, 22], end: [12, 31] }
  ];
  
  for (const sign of signs) {
    const [startMonth, startDay] = sign.start;
    const [endMonth, endDay] = sign.end;
    
    if (month === startMonth && day >= startDay) return sign;
    if (month === endMonth && day <= endDay) return sign;
    if (month > startMonth && month < endMonth) return sign;
  }
  
  return signs[0]; // Default to Capricorn
}

// Export for convenience
export default drummerBirthdays;
