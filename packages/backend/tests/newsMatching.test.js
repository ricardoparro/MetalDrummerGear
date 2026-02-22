const {
  matchDrummer,
  matchBand,
  matchArticle,
  hasMusicContext,
  createWordBoundaryRegex,
  generateNewsId,
  extractImage,
  AMBIGUOUS_BANDS,
  MUSIC_CONTEXT_KEYWORDS,
} = require('../src/services/newsAggregator');

describe('Drummer matching', () => {
  const lars = { id: 1, name: 'Lars Ulrich', band: 'Metallica', slug: 'lars-ulrich' };
  const dave = { id: 2, name: 'Dave Lombardo', band: 'Slayer', slug: 'dave-lombardo' };
  const daveMcClain = { id: 3, name: 'Dave McClain', band: 'Machine Head', slug: 'dave-mcclain' };

  test('matches full name', () => {
    const result = matchDrummer('Lars Ulrich discusses new album', lars);
    expect(result.matched).toBe(true);
    expect(result.confidence).toBe('high');
    expect(result.reason).toBe('full_name');
  });

  test('matches full name case insensitive', () => {
    const result = matchDrummer('LARS ULRICH ANNOUNCES TOUR', lars);
    expect(result.matched).toBe(true);
    expect(result.confidence).toBe('high');
  });

  test('matches band + last name', () => {
    const result = matchDrummer('Metallica drummer Ulrich talks tour', lars);
    expect(result.matched).toBe(true);
    expect(result.confidence).toBe('medium');
    expect(result.reason).toBe('band_plus_lastname');
  });

  test('rejects first name only', () => {
    const result = matchDrummer('Lars from local band plays show', lars);
    expect(result.matched).toBe(false);
  });

  test('rejects last name without band context', () => {
    const result = matchDrummer('Ulrich discusses his new project', lars);
    expect(result.matched).toBe(false);
  });

  test('rejects partial word match', () => {
    const result = matchDrummer('McLars releases new track', lars);
    expect(result.matched).toBe(false);
  });

  test('rejects embedded match', () => {
    const result = matchDrummer('UlrichLars is a cool username', lars);
    expect(result.matched).toBe(false);
  });

  test('distinguishes between drummers named Dave', () => {
    const text = 'Dave Lombardo of Slayer fame returns';
    const lombardoResult = matchDrummer(text, dave);
    const mcclainResult = matchDrummer(text, daveMcClain);

    expect(lombardoResult.matched).toBe(true);
    expect(mcclainResult.matched).toBe(false);
  });
});

describe('Band matching', () => {
  const metallica = { name: 'Metallica', slug: 'metallica' };
  const death = { name: 'Death', slug: 'death' };
  const anthrax = { name: 'Anthrax', slug: 'anthrax' };
  const slipknot = { name: 'Slipknot', slug: 'slipknot' };
  const testament = { name: 'Testament', slug: 'testament' };

  test('matches unique band name', () => {
    const result = matchBand('Metallica announces tour', metallica);
    expect(result.matched).toBe(true);
    expect(result.confidence).toBe('high');
    expect(result.reason).toBe('unique_name');
  });

  test('matches unique band case insensitive', () => {
    const result = matchBand('SLIPKNOT releases new single', slipknot);
    expect(result.matched).toBe(true);
    expect(result.confidence).toBe('high');
  });

  test('rejects partial match', () => {
    const result = matchBand('Metallicats cover band plays', metallica);
    expect(result.matched).toBe(false);
  });

  test('rejects embedded match', () => {
    const result = matchBand('MetallicaFan123 commented', metallica);
    expect(result.matched).toBe(false);
  });

  test('ambiguous band WITHOUT context - rejected', () => {
    const result = matchBand('Death is inevitable for all', death);
    expect(result.matched).toBe(false);
    expect(result.reason).toBe('ambiguous_no_context');
  });

  test('ambiguous band WITH context - accepted', () => {
    const result = matchBand('Death metal band Death releases album', death);
    expect(result.matched).toBe(true);
    expect(result.confidence).toBe('medium');
    expect(result.reason).toBe('ambiguous_with_context');
  });

  test('Anthrax disease article - rejected', () => {
    const result = matchBand('Anthrax outbreak reported in region', anthrax);
    expect(result.matched).toBe(false);
  });

  test('Anthrax band article - accepted', () => {
    const result = matchBand('Anthrax band announces new tour dates', anthrax);
    expect(result.matched).toBe(true);
  });

  test('Testament common word - rejected', () => {
    const result = matchBand('The testament was read at the ceremony', testament);
    expect(result.matched).toBe(false);
  });

  test('Testament band with context - accepted', () => {
    const result = matchBand('Testament thrash metal band tour announced', testament);
    expect(result.matched).toBe(true);
  });
});

describe('Cross-validation', () => {
  test('boosts confidence when band + drummer match', () => {
    const drummers = [{ id: 1, name: 'Lars Ulrich', band: 'Metallica', slug: 'lars-ulrich' }];
    const bands = [{ name: 'Metallica', slug: 'metallica' }];

    const result = matchArticle(
      {
        title: 'Metallica Lars Ulrich exclusive interview about the bands upcoming world tour',
        contentSnippet: 'The legendary drummer discusses the bands new direction for 2024 and beyond. Lars Ulrich shares insights about Metallica creative process and the excitement surrounding their new album release.'
      },
      drummers,
      bands
    );

    expect(result.matchedDrummers).toHaveLength(1);
    expect(result.matchedBands).toHaveLength(1);
    expect(result.matchedDrummers[0].crossValidated).toBe(true);
    expect(result.matchedDrummers[0].confidence).toBe('high');
    expect(result.matchedBands[0].crossValidated).toBe(true);
    expect(result.matchedBands[0].confidence).toBe('high');
  });

  test('no cross-validation when drummer band not matched', () => {
    const drummers = [{ id: 1, name: 'Lars Ulrich', band: 'Metallica', slug: 'lars-ulrich' }];
    const bands = [{ name: 'Slayer', slug: 'slayer' }];

    const result = matchArticle(
      { title: 'Lars Ulrich discusses his solo project in this exclusive interview about his career', contentSnippet: 'The legendary drummer talks about life outside the band.' },
      drummers,
      bands
    );

    expect(result.matchedDrummers).toHaveLength(1);
    expect(result.matchedBands).toHaveLength(0);
    expect(result.matchedDrummers[0].crossValidated).toBeUndefined();
  });
});

describe('Article matching edge cases', () => {
  test('skips very short articles', () => {
    const drummers = [{ id: 1, name: 'Lars Ulrich', band: 'Metallica' }];
    const bands = [{ name: 'Metallica', slug: 'metallica' }];

    const result = matchArticle(
      { title: 'Metallica', contentSnippet: 'Short' },
      drummers,
      bands
    );

    expect(result.skip).toBe(true);
    expect(result.matchedDrummers).toHaveLength(0);
  });

  test('matches multiple drummers in same article', () => {
    const drummers = [
      { id: 1, name: 'Lars Ulrich', band: 'Metallica', slug: 'lars-ulrich' },
      { id: 2, name: 'Dave Lombardo', band: 'Slayer', slug: 'dave-lombardo' },
    ];
    const bands = [];

    const result = matchArticle(
      {
        title: 'Legendary drummers Lars Ulrich and Dave Lombardo discuss their careers',
        contentSnippet: 'In this exclusive interview, two of the most influential metal drummers share their stories about their early days and inspirations.',
      },
      drummers,
      bands
    );

    expect(result.matchedDrummers).toHaveLength(2);
  });

  test('handles missing content gracefully', () => {
    const drummers = [{ id: 1, name: 'Lars Ulrich', band: 'Metallica' }];
    const bands = [];

    const result = matchArticle(
      { title: 'Lars Ulrich interview about his career journey and life experiences in the music industry spanning over four decades of legendary drumming' },
      drummers,
      bands
    );

    expect(result.matchedDrummers).toHaveLength(1);
  });
});

describe('Helper functions', () => {
  test('hasMusicContext detects music keywords', () => {
    expect(hasMusicContext('The band releases new album')).toBe(true);
    expect(hasMusicContext('Concert tour announced')).toBe(true);
    expect(hasMusicContext('The weather is nice today')).toBe(false);
    expect(hasMusicContext('Political news update')).toBe(false);
  });

  test('createWordBoundaryRegex handles special characters', () => {
    const regex = createWordBoundaryRegex('AC/DC');
    expect(regex.test('AC/DC rocks')).toBe(true);
    expect(regex.test('ACDC tribute')).toBe(false);
  });

  test('generateNewsId creates stable IDs', () => {
    const url = 'https://example.com/article/123';
    const id1 = generateNewsId(url);
    const id2 = generateNewsId(url);

    expect(id1).toBe(id2);
    expect(id1).toHaveLength(12);
  });

  test('generateNewsId creates unique IDs for different URLs', () => {
    const id1 = generateNewsId('https://example.com/article/1');
    const id2 = generateNewsId('https://example.com/article/2');

    expect(id1).not.toBe(id2);
  });

  test('extractImage finds media:content', () => {
    const item = { 'media:content': { $: { url: 'https://example.com/image.jpg' } } };
    expect(extractImage(item)).toBe('https://example.com/image.jpg');
  });

  test('extractImage finds enclosure', () => {
    const item = { enclosure: { url: 'https://example.com/image.png' } };
    expect(extractImage(item)).toBe('https://example.com/image.png');
  });

  test('extractImage extracts from content HTML', () => {
    const item = { content: '<p>Text <img src="https://example.com/pic.jpg" alt="test"> more</p>' };
    expect(extractImage(item)).toBe('https://example.com/pic.jpg');
  });

  test('extractImage returns null when no image found', () => {
    const item = { title: 'No image here' };
    expect(extractImage(item)).toBeNull();
  });
});

describe('Ambiguous bands list', () => {
  test('contains expected problematic band names', () => {
    expect(AMBIGUOUS_BANDS).toContain('death');
    expect(AMBIGUOUS_BANDS).toContain('anthrax');
    expect(AMBIGUOUS_BANDS).toContain('testament');
    expect(AMBIGUOUS_BANDS).toContain('exodus');
  });

  test('all entries are lowercase', () => {
    for (const band of AMBIGUOUS_BANDS) {
      expect(band).toBe(band.toLowerCase());
    }
  });
});

describe('Music context keywords', () => {
  test('contains essential music terms', () => {
    expect(MUSIC_CONTEXT_KEYWORDS).toContain('band');
    expect(MUSIC_CONTEXT_KEYWORDS).toContain('metal');
    expect(MUSIC_CONTEXT_KEYWORDS).toContain('drummer');
    expect(MUSIC_CONTEXT_KEYWORDS).toContain('album');
    expect(MUSIC_CONTEXT_KEYWORDS).toContain('tour');
  });
});
