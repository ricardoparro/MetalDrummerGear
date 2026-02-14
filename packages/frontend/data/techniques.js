// Drumming Techniques data - Issue #344
export const TECHNIQUES = {
  'blast-beat': {
    slug: 'blast-beat',
    title: 'Blast Beat',
    emoji: '💥',
    shortDescription: 'The defining technique of extreme metal drumming',
    description: 'The blast beat is characterized by rapid alternation between kick, snare, and cymbal.',
    history: 'Evolved from punk and hardcore in the 1980s.',
    howToLearn: ['Start slow at 60-80 BPM', 'Master single strokes independently'],
    videoExamples: [{ title: 'Blast Beat Tutorial', youtubeId: 'pq4RnNlsjMQ' }],
    gearRecommendations: ['Fast double bass pedals', 'Responsive snare drum'],
    masterIds: [6, 19, 21, 20, 3, 15, 7],
    relatedTechniques: ['gravity-blast', 'double-bass'],
    difficulty: 'Advanced',
    genres: ['Death Metal', 'Black Metal', 'Grindcore']
  },
  'double-bass': {
    slug: 'double-bass',
    title: 'Double Bass Drumming',
    emoji: '🦶',
    shortDescription: 'Two bass drums or a double pedal for thunderous power',
    description: 'Uses two bass drums or a double pedal for rapid bass patterns.',
    history: 'Thrash metal drummers made it essential in the 1980s.',
    howToLearn: ['Start with alternating strokes at 80-100 BPM'],
    videoExamples: [{ title: 'Double Bass Secrets', youtubeId: 'iBUNK0kq_rU' }],
    gearRecommendations: ['Quality double pedal'],
    masterIds: [6, 5, 17, 4, 14, 15, 7, 18],
    relatedTechniques: ['blast-beat', 'triggered-drums'],
    difficulty: 'Intermediate to Advanced',
    genres: ['Thrash Metal', 'Death Metal', 'Progressive Metal']
  },
  'gravity-blast': {
    slug: 'gravity-blast',
    title: 'Gravity Blast',
    emoji: '🌊',
    shortDescription: 'Using gravity and bounce for extreme snare speeds',
    description: 'Uses gravity and bounce to achieve fast single-stroke rolls.',
    history: 'Modern innovation in extreme metal drumming.',
    howToLearn: ['Master bounce and gravity physics'],
    videoExamples: [{ title: 'Gravity Blast Tutorial', youtubeId: 'KHQdBPxJNZE' }],
    gearRecommendations: ['Responsive snare drum'],
    masterIds: [6, 19, 21],
    relatedTechniques: ['blast-beat', 'one-handed-roll'],
    difficulty: 'Expert',
    genres: ['Death Metal', 'Grindcore']
  },
  'polyrhythms': {
    slug: 'polyrhythms',
    title: 'Polyrhythms',
    emoji: '🔄',
    shortDescription: 'Multiple rhythmic patterns played simultaneously',
    description: 'Two or more rhythmic patterns played at the same time.',
    history: 'Meshuggah revolutionized polyrhythmic metal in the 1990s.',
    howToLearn: ['Understand basic relationships: 3:2, 4:3, 5:4'],
    videoExamples: [{ title: 'Meshuggah Polyrhythms', youtubeId: 'a83cGslIm50' }],
    gearRecommendations: ['Metronome with subdivisions'],
    masterIds: [5, 14, 16, 18, 13, 28],
    relatedTechniques: ['odd-time-signatures'],
    difficulty: 'Advanced',
    genres: ['Progressive Metal', 'Djent']
  },
  'one-handed-roll': {
    slug: 'one-handed-roll',
    title: 'One-Handed Roll',
    emoji: '🤚',
    shortDescription: 'Rapid roll using only one hand',
    description: 'Produces a rapid roll using stick bounce and finger control.',
    history: 'Roots in rudimental drumming.',
    howToLearn: ['Master the Moeller technique'],
    videoExamples: [{ title: 'Hand Technique', youtubeId: 'c3dBOI7EJfo' }],
    gearRecommendations: ['Quality drumsticks'],
    masterIds: [6, 13, 16, 14],
    relatedTechniques: ['gravity-blast'],
    difficulty: 'Intermediate to Advanced',
    genres: ['All Metal Genres']
  },
  'triggered-drums': {
    slug: 'triggered-drums',
    title: 'Triggered Drums',
    emoji: '⚡',
    shortDescription: 'Electronic triggers for consistent sound',
    description: 'Sensors that produce consistent sound regardless of playing dynamics.',
    history: 'Death metal bands began using triggers in the 1990s.',
    howToLearn: ['Understand trigger placement'],
    videoExamples: [{ title: 'Drum Triggers Setup', youtubeId: 'BYGz6n6C_sU' }],
    gearRecommendations: ['Quality drum triggers'],
    masterIds: [27, 2, 5, 6, 7, 17, 18],
    relatedTechniques: ['double-bass'],
    difficulty: 'Intermediate',
    genres: ['Industrial Metal', 'Death Metal']
  },
  'odd-time-signatures': {
    slug: 'odd-time-signatures',
    title: 'Odd Time Signatures',
    emoji: '🔢',
    shortDescription: 'Playing in 5/4, 7/8, and other meters',
    description: 'Meters that dont divide evenly into standard 4/4.',
    history: 'Progressive rock pioneered complex meters in the 1970s.',
    howToLearn: ['Count and subdivide each signature'],
    videoExamples: [{ title: 'Tool Time Signatures', youtubeId: 'FssULNGSZIA' }],
    gearRecommendations: ['Metronome with presets'],
    masterIds: [14, 13, 5, 16, 18, 28],
    relatedTechniques: ['polyrhythms'],
    difficulty: 'Intermediate to Advanced',
    genres: ['Progressive Metal', 'Djent']
  },
  'swivel-technique': {
    slug: 'swivel-technique',
    title: 'Swivel Technique',
    emoji: '🔄',
    shortDescription: 'Ankle rotation for efficient speed',
    description: 'Uses lateral ankle rotation for faster double bass.',
    history: 'Drummers like Derek Roddy documented the technique.',
    howToLearn: ['Practice ankle rotation motion'],
    videoExamples: [{ title: 'Swivel Tutorial', youtubeId: 'P1dnsP2ZZWE' }],
    gearRecommendations: ['Smooth double pedals'],
    masterIds: [6, 17, 21, 19],
    relatedTechniques: ['double-bass'],
    difficulty: 'Advanced',
    genres: ['Death Metal', 'Extreme Metal']
  }
};

export const DRUMMER_TECHNIQUES = {
  1: ['double-bass'],
  2: ['double-bass', 'triggered-drums'],
  3: ['blast-beat', 'double-bass'],
  4: ['double-bass', 'blast-beat'],
  5: ['polyrhythms', 'double-bass', 'odd-time-signatures'],
  6: ['blast-beat', 'double-bass', 'gravity-blast', 'swivel-technique', 'one-handed-roll'],
  7: ['double-bass', 'blast-beat', 'triggered-drums'],
  13: ['odd-time-signatures', 'polyrhythms', 'one-handed-roll'],
  14: ['polyrhythms', 'odd-time-signatures', 'double-bass', 'one-handed-roll'],
  15: ['blast-beat', 'double-bass'],
  16: ['polyrhythms', 'odd-time-signatures', 'one-handed-roll'],
  17: ['double-bass', 'triggered-drums', 'swivel-technique'],
  18: ['polyrhythms', 'double-bass', 'triggered-drums', 'odd-time-signatures'],
  19: ['blast-beat', 'gravity-blast', 'swivel-technique'],
  20: ['blast-beat'],
  21: ['blast-beat', 'double-bass', 'gravity-blast', 'swivel-technique']
};

export function getAllTechniques() { return Object.values(TECHNIQUES); }
export function getTechniqueBySlug(slug) { return TECHNIQUES[slug] || null; }
export function getTechniquesForDrummer(id) { return (DRUMMER_TECHNIQUES[id] || []).map(s => TECHNIQUES[s]).filter(Boolean); }
export function getTechniqueSlugsForDrummer(id) { return DRUMMER_TECHNIQUES[id] || []; }
