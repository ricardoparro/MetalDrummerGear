/**
 * Signature Licks Database - Issue #749
 * Drummer signature drum fills, beats, and patterns with video examples
 * 
 * Phase 1: 5 drummers × 3 licks = 15 total
 * - Joey Jordison (Slipknot)
 * - Lars Ulrich (Metallica)
 * - Dave Lombardo (Slayer)
 * - George Kollias (Nile)
 * - Mario Duplantier (Gojira)
 */

// ==========================================
// SIGNATURE LICKS DATABASE
// ==========================================

export const SIGNATURE_LICKS = {
  // ==========================================
  // JOEY JORDISON - Slipknot
  // ==========================================
  'joey-jordison-heretic-anthem-intro': {
    slug: 'joey-jordison-heretic-anthem-intro',
    name: 'The Heretic Anthem Intro',
    shortName: 'Heretic Intro',
    drummerId: 2,
    drummerName: 'Joey Jordison',
    drummerSlug: 'joey-jordison',
    band: 'Slipknot',
    song: 'The Heretic Anthem',
    album: 'Iowa (2001)',
    
    // Classification
    category: 'intro-fill',
    style: 'nu-metal',
    difficulty: 'advanced',
    difficultyRating: 4, // 1-5
    bpm: 155,
    bpmDisplay: '155 BPM',
    timeSignature: '4/4',
    
    // Description
    description: 'The iconic opening drum fill that kicks off one of metal\'s most intense songs. Joey\'s explosive snare rolls combined with double bass create the perfect foundation for the album\'s heaviest track.',
    
    // Technique breakdown
    techniques: ['blast-beat', 'double-bass', 'snare-rolls'],
    techniqueDetails: [
      'Start with rapid 32nd note snare rolls',
      'Accent the downbeats with bass drum hits',
      'Build intensity leading into the main groove',
      'Use rimshots for maximum attack',
    ],
    
    // Related tutorial video
    tutorial: {
      youtubeId: 'tUibKh0Z--c',
      startTime: 120,
      title: 'Joey Jordison Drum Breakdown',
      description: 'Breakdown of Joey\'s technique',
    },
    
    // Gear used
    gearUsed: [
      { name: 'Pearl Joey Jordison Signature Snare', type: 'snare', link: '/drummers/joey-jordison/signature/joey-jordison-pearl-signature-snare' },
      { name: 'Pearl Export Series Kit', type: 'drums', link: null },
      { name: 'Paiste 2002 Cymbals', type: 'cymbals', link: null },
      { name: 'Pearl Demon Drive Pedals', type: 'pedals', link: null },
    ],
    
    // Learning tips
    learningTips: [
      'Practice the snare roll pattern slowly at 80 BPM first',
      'Focus on even dynamics between hands',
      'Add the bass drum pattern once the hands are solid',
      'Use a practice pad to build hand speed before moving to kit',
    ],
    
    // SEO
    seo: {
      title: 'Joey Jordison Heretic Anthem Intro - Drum Fill Tutorial | MetalForge',
      description: 'Learn Joey Jordison\'s iconic Heretic Anthem intro drum fill from Slipknot\'s Iowa album. Video breakdown, tab, gear used, and practice tips.',
      keywords: ['joey jordison', 'heretic anthem', 'slipknot drums', 'drum fill tutorial', 'iowa album', 'metal drumming'],
    },
  },

  'joey-jordison-eyeless-blast': {
    slug: 'joey-jordison-eyeless-blast',
    name: 'Eyeless Blast Section',
    shortName: 'Eyeless Blast',
    drummerId: 2,
    drummerName: 'Joey Jordison',
    drummerSlug: 'joey-jordison',
    band: 'Slipknot',
    song: 'Eyeless',
    album: 'Slipknot (1999)',
    
    category: 'blast-section',
    style: 'nu-metal',
    difficulty: 'expert',
    difficultyRating: 5,
    bpm: 200,
    bpmDisplay: '200 BPM',
    timeSignature: '4/4',
    
    description: 'Joey\'s devastating blast beat section that showcases his extreme metal roots. This pattern requires incredible stamina and precision at high speeds.',
    
    techniques: ['blast-beat', 'single-stroke-roll'],
    techniqueDetails: [
      'Alternating 16th notes on snare and hi-hat',
      'Continuous double bass underneath',
      'Maintain consistent volume throughout',
      'Focus on wrist technique to avoid fatigue',
    ],
    
    gearUsed: [
      { name: 'Pearl Joey Jordison Signature Snare', type: 'snare', link: '/drummers/joey-jordison/signature/joey-jordison-pearl-signature-snare' },
      { name: 'Pearl Demon Drive Pedals', type: 'pedals', link: null },
      { name: 'Paiste 2002 14" Hi-Hats', type: 'cymbals', link: null },
    ],
    
    learningTips: [
      'Start at half speed (100 BPM) and work up gradually',
      'Practice hands and feet separately first',
      'Use a metronome religiously',
      'Take breaks to avoid injury - blast beats are physically demanding',
    ],
    
    seo: {
      title: 'Joey Jordison Eyeless Blast Beat - Drum Tutorial | MetalForge',
      description: 'Master Joey Jordison\'s intense blast beat section from Eyeless. Speed building exercises, technique tips, and video examples.',
      keywords: ['joey jordison blast beat', 'eyeless drums', 'slipknot drumming', 'extreme metal drums', 'blast beat tutorial'],
    },
  },

  'joey-jordison-disasterpiece-chaos': {
    slug: 'joey-jordison-disasterpiece-chaos',
    name: 'Disasterpiece Chaos Fill',
    shortName: 'Disasterpiece Fill',
    drummerId: 2,
    drummerName: 'Joey Jordison',
    drummerSlug: 'joey-jordison',
    band: 'Slipknot',
    song: 'Disasterpiece',
    album: 'Iowa (2001)',
    
    category: 'fill',
    style: 'nu-metal',
    difficulty: 'advanced',
    difficultyRating: 4,
    bpm: 140,
    bpmDisplay: '140 BPM',
    timeSignature: '4/4',
    
    description: 'The frantic fill that connects verses and choruses in one of Slipknot\'s most aggressive songs. Joey combines toms, snare, and double bass in a whirlwind of controlled chaos.',
    
    techniques: ['tom-fill', 'double-bass', 'dynamics'],
    techniqueDetails: [
      'Start on floor tom with accent',
      'Move through rack toms in descending pattern',
      'Incorporate snare accents between tom hits',
      'End with powerful snare hit into groove',
    ],
    
    video: {
      youtubeId: 'zRS9uKs3Rlk',
      startTime: 45,
      endTime: 65,
      title: 'Disasterpiece - Drum Cam',
      description: 'Raw drum cam footage of Joey\'s fills',
    },
    
    tutorial: null,
    
    gearUsed: [
      { name: 'Pearl Joey Jordison Signature Snare', type: 'snare', link: '/drummers/joey-jordison/signature/joey-jordison-pearl-signature-snare' },
      { name: 'Pearl Export Series Kit', type: 'drums', link: null },
      { name: 'Evans EC2 Heads', type: 'heads', link: null },
    ],
    
    learningTips: [
      'Map out the fill pattern on paper first',
      'Practice each section of the fill separately',
      'Focus on the transitions between tom groups',
      'Work on dynamics - Joey uses contrast for impact',
    ],
    
    seo: {
      title: 'Joey Jordison Disasterpiece Fill - Drum Pattern Breakdown | MetalForge',
      description: 'Learn the chaotic fill from Slipknot\'s Disasterpiece. Step-by-step breakdown with video, technique tips, and gear info.',
      keywords: ['disasterpiece drums', 'joey jordison fill', 'slipknot drum lesson', 'metal drum fills', 'iowa drums'],
    },
  },

  // ==========================================
  // LARS ULRICH - Metallica
  // ==========================================
  'lars-ulrich-one-intro': {
    slug: 'lars-ulrich-one-intro',
    name: 'One Intro Pattern',
    shortName: 'One Intro',
    drummerId: 1,
    drummerName: 'Lars Ulrich',
    drummerSlug: 'lars-ulrich',
    band: 'Metallica',
    song: 'One',
    album: '...And Justice for All (1988)',
    
    category: 'intro-groove',
    style: 'thrash-metal',
    difficulty: 'intermediate',
    difficultyRating: 3,
    bpm: 108,
    bpmDisplay: '108 BPM',
    timeSignature: '4/4',
    
    description: 'The haunting, militaristic snare pattern that opens Metallica\'s anti-war masterpiece. Lars creates tension through sparse, precise hits that build into the song\'s explosive middle section.',
    
    techniques: ['dynamics', 'ghost-notes', 'military-snare'],
    techniqueDetails: [
      'Play snare with light touch for verse sections',
      'Gradual build in intensity matches song dynamics',
      'Cross-stick pattern creates the iconic intro sound',
      'Transitions to full snare hits as song intensifies',
    ],
    
    video: {
      youtubeId: 'WM8bTdBs-cw',
      startTime: 0,
      endTime: 60,
      title: 'One - Official Music Video',
      description: 'The classic intro that defined a generation',
    },
    
    
    gearUsed: [
      { name: 'Tama Artstar ES Kit', type: 'drums', link: null },
      { name: 'Ahead Lars Ulrich Sticks', type: 'sticks', link: null },
      { name: 'Zildjian A Custom Cymbals', type: 'cymbals', link: null },
    ],
    
    learningTips: [
      'Focus on the musical context - less is more here',
      'Practice cross-stick technique for the opening',
      'Work on smooth transitions between dynamic levels',
      'Listen closely to how Lars builds tension',
    ],
    
    seo: {
      title: 'Lars Ulrich One Intro - Drum Pattern Tutorial | MetalForge',
      description: 'Learn the iconic drum intro from Metallica\'s One. Dynamic control techniques, military snare patterns, and practice tips.',
      keywords: ['lars ulrich', 'one drums', 'metallica drumming', 'drum intro tutorial', 'justice for all drums'],
    },
  },

  'lars-ulrich-enter-sandman-groove': {
    slug: 'lars-ulrich-enter-sandman-groove',
    name: 'Enter Sandman Main Groove',
    shortName: 'Sandman Groove',
    drummerId: 1,
    drummerName: 'Lars Ulrich',
    drummerSlug: 'lars-ulrich',
    band: 'Metallica',
    song: 'Enter Sandman',
    album: 'Metallica (Black Album) (1991)',
    
    category: 'main-groove',
    style: 'heavy-metal',
    difficulty: 'beginner',
    difficultyRating: 2,
    bpm: 123,
    bpmDisplay: '123 BPM',
    timeSignature: '4/4',
    
    description: 'The groove that launched a billion drummers. This straightforward but powerful pattern is the backbone of metal\'s most successful song ever. Perfect for beginners learning metal drumming.',
    
    techniques: ['groove', 'hi-hat-control', 'dynamics'],
    techniqueDetails: [
      'Solid quarter notes on hi-hat with open hi-hat accents',
      'Snare on beats 2 and 4 with power',
      'Bass drum pattern syncs with the iconic guitar riff',
      'Crash cymbal accents mark phrase endings',
    ],
    
    video: {
      youtubeId: 'CD-E-LDc384',
      startTime: 30,
      endTime: 90,
      title: 'Enter Sandman - Live',
      description: 'The groove that fills stadiums',
    },
    
    
    gearUsed: [
      { name: 'Tama Starclassic Kit', type: 'drums', link: null },
      { name: 'Zildjian Z Custom Cymbals', type: 'cymbals', link: null },
      { name: 'DW 5000 Pedals', type: 'pedals', link: null },
    ],
    
    learningTips: [
      'Start with just hi-hat and snare pattern',
      'Add bass drum once basic pattern is solid',
      'Pay attention to the open hi-hat accents',
      'Play along with the record to lock in with James\'s riff',
    ],
    
    seo: {
      title: 'Enter Sandman Drum Groove - Beginner Tutorial | MetalForge',
      description: 'Learn the Enter Sandman drum groove from Metallica. Perfect beginner metal drum lesson with video and practice tips.',
      keywords: ['enter sandman drums', 'lars ulrich groove', 'metallica beginner drums', 'metal drum lesson', 'black album drums'],
    },
  },

  'lars-ulrich-master-of-puppets-gallop': {
    slug: 'lars-ulrich-master-of-puppets-gallop',
    name: 'Master of Puppets Gallop',
    shortName: 'MOP Gallop',
    drummerId: 1,
    drummerName: 'Lars Ulrich',
    drummerSlug: 'lars-ulrich',
    band: 'Metallica',
    song: 'Master of Puppets',
    album: 'Master of Puppets (1986)',
    
    category: 'main-groove',
    style: 'thrash-metal',
    difficulty: 'intermediate',
    difficultyRating: 3,
    bpm: 212,
    bpmDisplay: '212 BPM',
    timeSignature: '4/4',
    
    description: 'The relentless thrash gallop that drives metal\'s greatest song. Lars\'s double bass pattern locks in perfectly with James and Kirk\'s iconic riff, creating the template for thrash drumming.',
    
    techniques: ['double-bass', 'gallop', 'stamina'],
    techniqueDetails: [
      'Galloping triplet feel on bass drums',
      'Ride cymbal drives the pulse',
      'Snare accents on backbeats cut through',
      'Requires stamina for 8+ minute song',
    ],
    
    video: {
      youtubeId: 'xnKhsTXoKCI',
      startTime: 20,
      endTime: 80,
      title: 'Master of Puppets - Live',
      description: 'The thrash anthem that never gets old',
    },
    
    
    gearUsed: [
      { name: 'Tama Artstar II Kit', type: 'drums', link: null },
      { name: 'Zildjian A Series Cymbals', type: 'cymbals', link: null },
      { name: 'Tama Iron Cobra Pedals', type: 'pedals', link: null },
    ],
    
    learningTips: [
      'Master the gallop pattern on bass drum first',
      'Practice at half speed for clean execution',
      'Build stamina gradually - this song is a workout',
      'Focus on keeping the ride cymbal consistent',
    ],
    
    seo: {
      title: 'Master of Puppets Gallop - Thrash Drum Tutorial | MetalForge',
      description: 'Master the iconic Master of Puppets gallop rhythm. Double bass techniques, stamina tips, and complete breakdown.',
      keywords: ['master of puppets drums', 'lars ulrich double bass', 'thrash metal gallop', 'metallica drum tutorial'],
    },
  },

  // ==========================================
  // DAVE LOMBARDO - Slayer
  // ==========================================
  'dave-lombardo-angel-of-death-chaos': {
    slug: 'dave-lombardo-angel-of-death-chaos',
    name: 'Angel of Death Opening',
    shortName: 'Angel of Death',
    drummerId: 4,
    drummerName: 'Dave Lombardo',
    drummerSlug: 'dave-lombardo',
    band: 'Slayer',
    song: 'Angel of Death',
    album: 'Reign in Blood (1986)',
    
    category: 'intro-chaos',
    style: 'thrash-metal',
    difficulty: 'expert',
    difficultyRating: 5,
    bpm: 210,
    bpmDisplay: '210 BPM',
    timeSignature: '4/4',
    
    description: 'The opening that changed thrash metal forever. Dave\'s explosive entrance after Tom Araya\'s iconic scream set the standard for extreme metal drumming. Pure controlled chaos.',
    
    techniques: ['blast-beat', 'double-bass', 'fills'],
    techniqueDetails: [
      'Immediate blast beat entry after the scream',
      'Rapid-fire snare and bass drum combination',
      'Cymbal accents drive the intensity',
      'Fills link each phrase with precision',
    ],
    
    video: {
      youtubeId: 'K6_zsJ8KPP0',
      startTime: 0,
      endTime: 30,
      title: 'Angel of Death - Official',
      description: 'The most iconic intro in thrash',
    },
    
    
    gearUsed: [
      { name: 'Tama Artstar Custom Kit', type: 'drums', link: null },
      { name: 'Paiste RUDE Cymbals', type: 'cymbals', link: null },
      { name: 'Tama Iron Cobra Pedals', type: 'pedals', link: null },
    ],
    
    learningTips: [
      'This is advanced - build up to it gradually',
      'Practice the blast beat pattern at 150 BPM first',
      'Focus on the transition from opening into groove',
      'Watch Dave\'s live performances for technique insights',
    ],
    
    seo: {
      title: 'Angel of Death Drums - Dave Lombardo Breakdown | MetalForge',
      description: 'Learn Dave Lombardo\'s legendary Angel of Death opening. The pattern that defined thrash metal drumming explained.',
      keywords: ['dave lombardo', 'angel of death drums', 'slayer drumming', 'reign in blood', 'thrash metal drums'],
    },
  },

  'dave-lombardo-raining-blood-double-bass': {
    slug: 'dave-lombardo-raining-blood-double-bass',
    name: 'Raining Blood Double Bass',
    shortName: 'Raining Blood',
    drummerId: 4,
    drummerName: 'Dave Lombardo',
    drummerSlug: 'dave-lombardo',
    band: 'Slayer',
    song: 'Raining Blood',
    album: 'Reign in Blood (1986)',
    
    category: 'main-groove',
    style: 'thrash-metal',
    difficulty: 'advanced',
    difficultyRating: 4,
    bpm: 190,
    bpmDisplay: '190 BPM',
    timeSignature: '4/4',
    
    description: 'After the thunderstorm intro comes one of metal\'s most recognizable double bass patterns. Dave\'s relentless attack creates the perfect backdrop for the song\'s apocalyptic imagery.',
    
    techniques: ['double-bass', 'groove', 'dynamics'],
    techniqueDetails: [
      'Continuous 16th notes on double bass',
      'Snare provides the backbeat anchor',
      'Hi-hat controls dynamics throughout',
      'Crash cymbal accents mark transitions',
    ],
    
    video: {
      youtubeId: 'z8ZqFlw6hYg',
      startTime: 60,
      endTime: 150,
      title: 'Raining Blood - Live',
      description: 'The storm unleashed',
    },
    
    
    gearUsed: [
      { name: 'Tama Artstar Custom Kit', type: 'drums', link: null },
      { name: 'Paiste RUDE Cymbals', type: 'cymbals', link: null },
      { name: 'DW 5000 Pedals', type: 'pedals', link: null },
    ],
    
    learningTips: [
      'Practice double bass 16ths at 120 BPM first',
      'Add snare once feet are consistent',
      'Work on stamina - this pattern is relentless',
      'Use a practice pad for bass drum technique',
    ],
    
    seo: {
      title: 'Raining Blood Double Bass Pattern - Tutorial | MetalForge',
      description: 'Master Dave Lombardo\'s double bass pattern from Raining Blood. Foot technique, speed building, and endurance tips.',
      keywords: ['raining blood drums', 'dave lombardo double bass', 'slayer drum lesson', 'thrash drumming tutorial'],
    },
  },

  'dave-lombardo-seasons-thrash': {
    slug: 'dave-lombardo-seasons-thrash',
    name: 'Seasons in the Abyss Groove',
    shortName: 'Seasons Groove',
    drummerId: 4,
    drummerName: 'Dave Lombardo',
    drummerSlug: 'dave-lombardo',
    band: 'Slayer',
    song: 'Seasons in the Abyss',
    album: 'Seasons in the Abyss (1990)',
    
    category: 'main-groove',
    style: 'thrash-metal',
    difficulty: 'intermediate',
    difficultyRating: 3,
    bpm: 174,
    bpmDisplay: '174 BPM',
    timeSignature: '4/4',
    
    description: 'A more groove-oriented approach from Dave, showing his versatility beyond pure speed. This mid-tempo thrasher demonstrates how restraint can be just as powerful as chaos.',
    
    techniques: ['groove', 'dynamics', 'hi-hat-control'],
    techniqueDetails: [
      'Driving hi-hat pattern anchors the groove',
      'Punchy snare on the backbeats',
      'Selective double bass for emphasis',
      'Dynamic control between sections',
    ],
    
    video: {
      youtubeId: 'DECp8LKurKs',
      startTime: 20,
      endTime: 80,
      title: 'Seasons in the Abyss - Video',
      description: 'The iconic desert video',
    },
    
    tutorial: null,
    
    gearUsed: [
      { name: 'Tama Artstar Custom Kit', type: 'drums', link: null },
      { name: 'Paiste RUDE Cymbals', type: 'cymbals', link: null },
      { name: 'Tama Iron Cobra Pedals', type: 'pedals', link: null },
    ],
    
    learningTips: [
      'Focus on the groove feel, not just the notes',
      'Lock in with the guitar riff',
      'Use dynamics to build tension',
      'Great song for developing pocket and feel',
    ],
    
    seo: {
      title: 'Seasons in the Abyss Drum Groove - Tutorial | MetalForge',
      description: 'Learn Dave Lombardo\'s groove from Seasons in the Abyss. Mid-tempo thrash drumming with feel and power.',
      keywords: ['seasons in the abyss drums', 'dave lombardo groove', 'slayer mid-tempo', 'thrash metal groove'],
    },
  },

  // ==========================================
  // GEORGE KOLLIAS - Nile
  // ==========================================
  'george-kollias-gravity-blast': {
    slug: 'george-kollias-gravity-blast',
    name: 'Nile Gravity Blast Pattern',
    shortName: 'Gravity Blast',
    drummerId: 6,
    drummerName: 'George Kollias',
    drummerSlug: 'george-kollias',
    band: 'Nile',
    song: 'Papyrus Containing the Spell to Preserve Its Possessor',
    album: 'In Their Darkened Shrines (2002)',
    
    category: 'blast-technique',
    style: 'death-metal',
    difficulty: 'expert',
    difficultyRating: 5,
    bpm: 280,
    bpmDisplay: '280+ BPM',
    timeSignature: '4/4',
    
    description: 'George\'s signature gravity blast technique allows for sustained extreme speeds that would be impossible with traditional alternating strokes. A masterclass in advanced technique.',
    
    techniques: ['gravity-blast', 'one-handed-roll', 'extreme-speed'],
    techniqueDetails: [
      'Use gravity and bounce off hi-hat rim',
      'Single hand creates rapid-fire snare hits',
      'Other hand maintains ride/hi-hat pattern',
      'Feet continue standard blast underneath',
    ],
    
    gearUsed: [
      { name: 'Pearl Reference Series Kit', type: 'drums', link: null },
      { name: 'Pearl Demon Drive Pedals', type: 'pedals', link: null },
      { name: 'Meinl Byzance Cymbals', type: 'cymbals', link: null },
    ],
    
    learningTips: [
      'This is a very advanced technique - build up slowly',
      'Start by just getting the bounce motion correct',
      'Practice without the kit to understand the physics',
      'Watch slow-motion videos to understand the motion',
    ],
    
    seo: {
      title: 'George Kollias Gravity Blast Tutorial | MetalForge',
      description: 'Learn George Kollias\'s gravity blast technique from Nile. Advanced one-handed roll method for extreme speeds.',
      keywords: ['george kollias', 'gravity blast', 'nile drums', 'one handed roll', 'extreme metal drumming'],
    },
  },

  'george-kollias-polyrhythmic-mayhem': {
    slug: 'george-kollias-polyrhythmic-mayhem',
    name: 'Polyrhythmic Death Metal Pattern',
    shortName: 'Poly Mayhem',
    drummerId: 6,
    drummerName: 'George Kollias',
    drummerSlug: 'george-kollias',
    band: 'Nile',
    song: 'Annihilation of the Wicked',
    album: 'Annihilation of the Wicked (2005)',
    
    category: 'polyrhythmic',
    style: 'death-metal',
    difficulty: 'expert',
    difficultyRating: 5,
    bpm: 220,
    bpmDisplay: '220 BPM',
    timeSignature: '4/4 over 5/4',
    
    description: 'George layers complex polyrhythmic patterns over brutal death metal foundations. This demonstrates his jazz-influenced approach to extreme metal drumming.',
    
    techniques: ['polyrhythms', 'independence', 'odd-groupings'],
    techniqueDetails: [
      'Feet maintain constant death metal pulse',
      'Hands play groupings of 5 over the 4',
      'Requires extreme limb independence',
      'Each limb operates somewhat independently',
    ],
    
    tutorial: null,
    
    gearUsed: [
      { name: 'Pearl Reference Series Kit', type: 'drums', link: null },
      { name: 'Pearl Demon Drive Pedals', type: 'pedals', link: null },
      { name: 'Meinl Byzance Cymbals', type: 'cymbals', link: null },
    ],
    
    learningTips: [
      'Study polyrhythms conceptually first',
      'Practice 5 over 4 with hands alone',
      'Add feet once hands are comfortable',
      'Use a polyrhythmic metronome app',
    ],
    
    seo: {
      title: 'George Kollias Polyrhythmic Patterns | MetalForge',
      description: 'Explore George Kollias\'s polyrhythmic approach to death metal. Complex patterns, independence exercises, and learning tips.',
      keywords: ['george kollias polyrhythms', 'nile complex drumming', 'death metal independence', 'polyrhythmic metal'],
    },
  },

  'george-kollias-sustained-blast': {
    slug: 'george-kollias-sustained-blast',
    name: 'Sustained 250+ BPM Blast',
    shortName: 'Sustained Blast',
    drummerId: 6,
    drummerName: 'George Kollias',
    drummerSlug: 'george-kollias',
    band: 'Nile',
    song: 'Sacrifice Unto Sebek',
    album: 'Those Whom the Gods Detest (2009)',
    
    category: 'blast-section',
    style: 'death-metal',
    difficulty: 'expert',
    difficultyRating: 5,
    bpm: 255,
    bpmDisplay: '255 BPM',
    timeSignature: '4/4',
    
    description: 'George\'s ability to sustain blast beats at 250+ BPM for extended periods is legendary. This pattern showcases his incredible stamina and technique.',
    
    techniques: ['blast-beat', 'stamina', 'technique'],
    techniqueDetails: [
      'Traditional blast pattern at extreme speed',
      'Relaxed technique prevents fatigue',
      'Proper breathing maintains oxygen flow',
      'Efficient motion minimizes energy use',
    ],
    
    gearUsed: [
      { name: 'Pearl Reference Series Kit', type: 'drums', link: null },
      { name: 'Pearl Demon Drive Pedals', type: 'pedals', link: null },
      { name: 'Evans Hybrid Heads', type: 'heads', link: null },
    ],
    
    learningTips: [
      'Build stamina incrementally over months',
      'Never sacrifice technique for speed',
      'Take breaks and avoid injury',
      'Focus on relaxation at high speeds',
    ],
    
    seo: {
      title: 'Sustained Blast Beat Training - George Kollias | MetalForge',
      description: 'Learn to sustain blast beats at extreme speeds with George Kollias\'s approach. Technique, stamina building, and injury prevention.',
      keywords: ['george kollias blast beats', 'extreme speed drumming', 'blast beat stamina', 'nile drumming'],
    },
  },

  // ==========================================
  // MARIO DUPLANTIER - Gojira
  // ==========================================
  'mario-duplantier-polyrhythmic-groove': {
    slug: 'mario-duplantier-polyrhythmic-groove',
    name: 'Gojira Polyrhythmic Groove',
    shortName: 'Poly Groove',
    drummerId: 21,
    drummerName: 'Mario Duplantier',
    drummerSlug: 'mario-duplantier',
    band: 'Gojira',
    song: 'Stranded',
    album: 'Magma (2016)',
    
    category: 'polyrhythmic',
    style: 'progressive-metal',
    difficulty: 'advanced',
    difficultyRating: 4,
    bpm: 105,
    bpmDisplay: '105 BPM',
    timeSignature: '4/4 with 3/4 overlay',
    
    description: 'Mario\'s signature approach to polyrhythms - groovy, musical, and organic. Unlike pure technical displays, his patterns serve the song while maintaining complexity.',
    
    techniques: ['polyrhythms', 'groove', 'dynamics'],
    techniqueDetails: [
      'Bass drum creates foundation in 4/4',
      'Snare and hi-hat play 3 over 4 pattern',
      'Dynamic swells add organic feel',
      'Crash accents resolve the phrases',
    ],
    
    video: {
      youtubeId: 'FNdC_3LR2AI',
      startTime: 0,
      endTime: 45,
      title: 'Stranded - Official Video',
      description: 'Polyrhythmic grooves in action',
    },
    
    
    gearUsed: [
      { name: 'Mapex Saturn V Kit', type: 'drums', link: null },
      { name: 'Paiste Signature Cymbals', type: 'cymbals', link: null },
      { name: 'DW 9000 Pedals', type: 'pedals', link: null },
    ],
    
    learningTips: [
      'Count the 3 over 4 pattern out loud first',
      'Start extremely slow - 50 BPM',
      'Feel the "resolution point" every 12 beats',
      'Mario\'s patterns are musical, not just mathematical',
    ],
    
    seo: {
      title: 'Mario Duplantier Polyrhythmic Grooves - Tutorial | MetalForge',
      description: 'Learn Mario Duplantier\'s polyrhythmic approach from Gojira. Musicality meets complexity in progressive metal drumming.',
      keywords: ['mario duplantier', 'gojira drums', 'polyrhythmic groove', 'progressive metal drums', 'stranded drums'],
    },
  },

  'mario-duplantier-blast-variation': {
    slug: 'mario-duplantier-blast-variation',
    name: 'Gojira Blast Variation',
    shortName: 'Blast Variation',
    drummerId: 21,
    drummerName: 'Mario Duplantier',
    drummerSlug: 'mario-duplantier',
    band: 'Gojira',
    song: 'Silvera',
    album: 'Magma (2016)',
    
    category: 'blast-variation',
    style: 'progressive-metal',
    difficulty: 'advanced',
    difficultyRating: 4,
    bpm: 170,
    bpmDisplay: '170 BPM',
    timeSignature: '4/4',
    
    description: 'Mario\'s blast beats are distinctive - they serve the song\'s groove while maintaining intensity. His variation includes unique accents and dynamic shifts.',
    
    techniques: ['blast-beat', 'dynamics', 'accents'],
    techniqueDetails: [
      'Modified blast with accent patterns',
      'China cymbal accents add texture',
      'Transitions smoothly into groove sections',
      'Dynamic builds within the blast itself',
    ],
    
    video: {
      youtubeId: 'iVvXB-Vwnco',
      startTime: 45,
      endTime: 100,
      title: 'Silvera - Official Video',
      description: 'Blast beats with Gojira\'s signature style',
    },
    
    tutorial: null,
    
    gearUsed: [
      { name: 'Mapex Saturn V Kit', type: 'drums', link: null },
      { name: 'Paiste Signature Cymbals', type: 'cymbals', link: null },
      { name: 'Evans Heavyweight Heads', type: 'heads', link: null },
    ],
    
    learningTips: [
      'Focus on the musical phrasing, not just speed',
      'Practice the accent patterns separately',
      'Blend power with finesse',
      'Study how Mario transitions in and out of blasts',
    ],
    
    seo: {
      title: 'Gojira Blast Beat Style - Mario Duplantier | MetalForge',
      description: 'Mario Duplantier\'s unique approach to blast beats in Gojira. Musical phrasing, accent patterns, and dynamic control.',
      keywords: ['gojira blast beat', 'mario duplantier blast', 'silvera drums', 'progressive blast beat'],
    },
  },

  'mario-duplantier-backbone-groove': {
    slug: 'mario-duplantier-backbone-groove',
    name: 'Backbone Main Groove',
    shortName: 'Backbone Groove',
    drummerId: 21,
    drummerName: 'Mario Duplantier',
    drummerSlug: 'mario-duplantier',
    band: 'Gojira',
    song: 'Backbone',
    album: 'From Mars to Sirius (2005)',
    
    category: 'main-groove',
    style: 'progressive-metal',
    difficulty: 'intermediate',
    difficultyRating: 3,
    bpm: 92,
    bpmDisplay: '92 BPM',
    timeSignature: '4/4',
    
    description: 'One of Gojira\'s grooviest tracks showcases Mario\'s pocket and feel. The slow, heavy groove is deceptively simple but requires excellent timing and dynamics.',
    
    techniques: ['groove', 'pocket', 'dynamics'],
    techniqueDetails: [
      'Heavy emphasis on the "and" of beats',
      'Powerful snare hits with space between',
      'Bass drum locks with guitar chug',
      'Ride cymbal provides wash and texture',
    ],
    
    gearUsed: [
      { name: 'Mapex Saturn Kit', type: 'drums', link: null },
      { name: 'Paiste Signature Cymbals', type: 'cymbals', link: null },
      { name: 'DW 9000 Pedals', type: 'pedals', link: null },
    ],
    
    learningTips: [
      'Play this slower than you think - sit in the pocket',
      'Leave space between notes',
      'Focus on the bass drum relationship with guitar',
      'Great song for developing feel and timing',
    ],
    
    seo: {
      title: 'Backbone Drum Groove - Gojira Tutorial | MetalForge',
      description: 'Learn the heavy groove from Gojira\'s Backbone. Mario Duplantier\'s pocket and feel in progressive metal.',
      keywords: ['backbone drums', 'mario duplantier groove', 'gojira drum lesson', 'heavy groove tutorial'],
    },
  },

  // ==========================================
  // MATT GARSTKA - Animals as Leaders (#1011, split 2/5 of #1008)
  // ==========================================
  'matt-garstka-monomyth-polyrhythm': {
    slug: 'matt-garstka-monomyth-polyrhythm',
    name: 'Monomyth Polyrhythmic Groove',
    shortName: 'Monomyth Groove',
    drummerId: 53,
    drummerName: 'Matt Garstka',
    drummerSlug: 'matt-garstka',
    band: 'Animals as Leaders',
    song: 'Monomyth',
    album: 'The Joy of Motion (2014)',

    category: 'signature-pattern',
    style: 'progressive-metal',
    difficulty: 'expert',
    difficultyRating: 5,
    bpm: 140,
    bpmDisplay: '~140 BPM',
    timeSignature: '4/4 (with superimposed groupings)',

    description: "\"Monomyth\" is the centerpiece of Animals as Leaders' 2014 record The Joy of Motion, and Matt Garstka's drumming on it is one of the clearest modern examples of how to make polyrhythm feel like groove rather than a math exercise. Over Tosin Abasi and Javier Reyes' eight-string riffing, Garstka superimposes phrases grouped in fives and sevens on top of a steady quarter-note pulse, so the kick and snare keep landing in surprising-but-locked places against the guitars. What makes it work musically is his ghost-note vocabulary: the space between the loud backbeats is filled with quiet left-hand strokes and buzzed accents that he learned from jazz and gospel-chops players, which keeps the polyrhythmic figures sounding fluid and human instead of robotic. Drummers who internalise even a single section come away with a sharper sense of subdivision and a more confident relationship to the click, because the song forces you to keep an unwavering pulse while your accents roam freely on top of it — a skill that pays off across every style, not just progressive metal. The track moves through several feels, opening with a syncopated linear pattern that shares notes between hands and feet, settling into the main groove where the displaced backbeat lives, and then opening up into more ambient, dynamic sections where Garstka pulls right back to brushes-and-whispers volume before slamming back in. For developing drummers it is a masterclass in independence and dynamic control: the limbs are doing four different things, yet the overall feel is relaxed and danceable. Learning even four bars of it forces you to internalise odd groupings, count a stable pulse underneath shifting accents, and play ghost notes cleanly at speed. It is also the perfect bridge between the worlds of progressive metal and jazz fusion, which is exactly why Garstka is regarded as one of the most influential drummers of his generation.",

    techniques: ['polyrhythms', 'linear-drumming', 'odd-time-signatures'],
    techniqueDetails: [
      'Lock a steady quarter-note pulse with the hi-hat foot or ride so the superimposed groupings have a reference',
      'Group the main figure in fives against the quarter-note pulse, counting "1-2-3-4-5" out loud until it resolves',
      'Drop quiet ghost notes between the accented backbeats to keep the groove fluid rather than mechanical',
      'Pull the dynamics right back in the ambient sections, then re-enter at full volume on the downbeat',
      'Only add the displaced kick pattern once hands and pulse are locked together',
    ],

    tutorial: {
      youtubeId: '-xUqa6pYqnY',
      startTime: 0,
      title: 'ANIMALS AS LEADERS - Monomyth (Matt Garstka Drum Playthrough)',
      description: "Matt Garstka's official drum playthrough of Monomyth",
    },

    gearUsed: [
      { name: 'Tama Star Series Kit', type: 'drums', link: null },
      { name: 'Meinl Byzance Cymbals', type: 'cymbals', link: null },
      { name: 'Tama Speed Cobra Pedals', type: 'pedals', link: null },
    ],

    learningTips: [
      'Practice the five-grouping against a metronome clicking quarter notes before adding anything else',
      'Sing the guitar riff while you play so the polyrhythm stays anchored to the music',
      'Work the ghost notes on a practice pad first to get them even and quiet',
      'Start at 90 BPM and only push tempo once the feel is relaxed, not rushed',
    ],

    seo: {
      title: 'Matt Garstka Monomyth Polyrhythm - Animals as Leaders Drum Tutorial | MetalForge',
      description: "Learn Matt Garstka's polyrhythmic groove from Animals as Leaders' Monomyth. Video playthrough, technique breakdown, and practice tips.",
      keywords: ['matt garstka', 'monomyth drums', 'animals as leaders', 'polyrhythm tutorial', 'progressive metal drumming', 'the joy of motion'],
    },
  },

  'matt-garstka-woven-web-linear': {
    slug: 'matt-garstka-woven-web-linear',
    name: 'The Woven Web Linear Groove',
    shortName: 'Woven Web Groove',
    drummerId: 53,
    drummerName: 'Matt Garstka',
    drummerSlug: 'matt-garstka',
    band: 'Animals as Leaders',
    song: 'The Woven Web',
    album: 'The Joy of Motion (2014)',

    category: 'main-groove',
    style: 'progressive-metal',
    difficulty: 'expert',
    difficultyRating: 5,
    bpm: 150,
    bpmDisplay: '~150 BPM',
    timeSignature: '4/4',

    description: "\"The Woven Web\" from The Joy of Motion (2014) is the track Matt Garstka chose to break down in his widely watched Drumeo session, and it has since become a reference point for anyone studying modern linear drumming. A linear pattern is one where no two limbs strike at the same time — every note is its own event, the hands and feet weaving in and out of each other like a single melodic line spread across the kit. Garstka uses this approach to play fast, flowing sixteenth-note figures that move seamlessly between the snare, toms, hi-hat and kick, creating the illusion of far more notes than are actually being played. Underneath the flash, the groove stays firmly in the pocket: the backbeat is always implied, and the band's djent-style guitar chugs lock to his kick drum so tightly that the riff and the drums read as one rhythmic gesture. The song also showcases his command of dynamics, ghost notes and orchestration around the kit — the way he chooses which drum each note lands on is what turns a technical exercise into a musical phrase. For students, this lick is the ideal gateway into linear playing because Garstka himself demonstrated it slowly and explained the sticking, so the logic behind each move is documented. Building it up teaches limb independence, even sixteenth-note timing, and the discipline of placing every stroke deliberately. It rewards patience: played too fast before the sticking is automatic it falls apart, but once internalised it unlocks a whole vocabulary of fills and grooves that sound impossibly fluid. It is one of the most instructive single tracks in the entire instrumental-progressive-metal catalogue. Spend time with it and you will hear your own fills start to flow more melodically, because the linear approach trains you to think of the kit as one connected instrument rather than a set of separate drums.",

    techniques: ['linear-drumming', 'groove-drumming', 'polyrhythms'],
    techniqueDetails: [
      'Map out the sticking so no two limbs ever play at the same time — this is the core of linear playing',
      'Keep the implied backbeat present even while the notes move around the kit',
      'Orchestrate the linear figure across snare, toms and hi-hat to turn it into a musical phrase',
      'Lock the kick drum to the guitar chug so drums and riff read as one rhythm',
      'Build the pattern one beat at a time at slow tempo before stringing the bars together',
    ],

    tutorial: {
      youtubeId: 'bVRNKoodHvQ',
      startTime: 0,
      title: 'Matt Garstka - "The Woven Web" By Animals As Leaders (Drumeo)',
      description: "Matt Garstka's Drumeo breakdown of The Woven Web",
    },

    gearUsed: [
      { name: 'Tama Star Series Kit', type: 'drums', link: null },
      { name: 'Meinl Byzance Cymbals', type: 'cymbals', link: null },
      { name: 'Tama Speed Cobra Pedals', type: 'pedals', link: null },
    ],

    learningTips: [
      'Write out the sticking before you play — linear drumming is a puzzle solved on paper first',
      'Loop a single beat until the sticking is automatic, then add the next beat',
      'Practice with a metronome to keep the sixteenth notes perfectly even',
      'Record yourself and listen back to make sure the backbeat still feels present',
    ],

    seo: {
      title: 'Matt Garstka The Woven Web - Linear Drumming Tutorial | MetalForge',
      description: "Learn Matt Garstka's linear groove from Animals as Leaders' The Woven Web. Drumeo breakdown, sticking guide, and practice tips.",
      keywords: ['matt garstka', 'the woven web', 'animals as leaders', 'linear drumming tutorial', 'drumeo', 'progressive metal drums'],
    },
  },

  'matt-garstka-tempting-time-groove': {
    slug: 'matt-garstka-tempting-time-groove',
    name: 'Tempting Time Odd-Meter Groove',
    shortName: 'Tempting Time',
    drummerId: 53,
    drummerName: 'Matt Garstka',
    drummerSlug: 'matt-garstka',
    band: 'Animals as Leaders',
    song: 'Tempting Time',
    album: 'Animals as Leaders (2009)',

    category: 'signature-pattern',
    style: 'progressive-metal',
    difficulty: 'expert',
    difficultyRating: 5,
    bpm: 160,
    bpmDisplay: '~160 BPM',
    timeSignature: 'mixed (shifting odd meters)',

    description: "\"Tempting Time\" comes from Animals as Leaders' 2009 self-titled debut, and although Navene Koperweis drummed on the original studio recording, Matt Garstka's live and filmed performances of it have become the definitive drumming reference for the song. It is one of the most demanding pieces in the band's catalogue: the eight-string guitar riffs lurch through constantly shifting odd meters and metric modulations, and the drummer's job is to make those jagged subdivisions feel intentional and powerful rather than confusing. Garstka attacks it with aggressive double bass, tightly controlled accents, and a relentless sense of where beat one is, no matter how the riff displaces around him. The track demands fluent counting — bars of seven, five and odd sixteenth-note groupings arrive in quick succession — and the ability to play fast double-kick figures while the hands punctuate the riff with crashes and snare accents. What separates a convincing performance from a sloppy one is dynamic control and consistency: every kick stroke has to speak evenly at speed, and the accents have to land exactly with the guitars or the whole arrangement collapses. For advancing players, learning even a section of \"Tempting Time\" is a complete workout in odd-time reading, double-bass endurance, and locking with a riff that refuses to sit still. It is the kind of piece that exposes any weakness in your time-feel, which is precisely why it has become a rite-of-passage track for modern progressive-metal drummers. Approached patiently, with the riff counted out and the tempo built up gradually, it teaches you to stay calm and grounded inside music that is deliberately trying to throw you off. Few tracks expose a shaky internal clock as ruthlessly, and few reward the work as generously: once it sits comfortably under your hands, almost any other odd-meter metal part will feel approachable by comparison, which is why it endures as a benchmark for the style.",

    techniques: ['odd-time-signatures', 'double-bass', 'fill-techniques'],
    techniqueDetails: [
      'Count the shifting meters out loud and mark where beat one lands in every bar',
      'Play the double-bass figures evenly so every kick stroke speaks at tempo',
      'Land hand accents exactly with the guitar riff so drums and guitars lock',
      'Use crashes to punctuate the ends of phrases and reset your internal count',
      'Loop one odd-meter section until the count is automatic before moving on',
    ],

    tutorial: {
      youtubeId: 'SBCvJMUEr9g',
      startTime: 0,
      title: 'Animals as Leaders - Tempting Time - Matt Garstka',
      description: "Matt Garstka performing Tempting Time",
    },

    gearUsed: [
      { name: 'Tama Star Series Kit', type: 'drums', link: null },
      { name: 'Meinl Byzance Cymbals', type: 'cymbals', link: null },
      { name: 'Tama Speed Cobra Pedals', type: 'pedals', link: null },
    ],

    learningTips: [
      'Break the song into its odd-meter sections and master the count of each one separately',
      'Build double-bass stamina with slow, even foot exercises before attempting full speed',
      'Tap the guitar rhythm with your hands away from the kit to internalise the accents',
      'Use a metronome that can subdivide so you never lose beat one in the odd bars',
    ],

    seo: {
      title: 'Matt Garstka Tempting Time - Odd-Meter Drum Tutorial | MetalForge',
      description: "Learn the odd-meter groove from Animals as Leaders' Tempting Time as played by Matt Garstka. Video, technique breakdown, and practice tips.",
      keywords: ['matt garstka', 'tempting time drums', 'animals as leaders', 'odd time signature tutorial', 'double bass', 'progressive metal drumming'],
    },
  },

  // ==========================================
  // JASKA RAATIKAINEN - Children of Bodom (#1011, split 2/5 of #1008)
  // ==========================================
  'jaska-raatikainen-sixpounder-double-bass': {
    slug: 'jaska-raatikainen-sixpounder-double-bass',
    name: 'Sixpounder Double Bass Drive',
    shortName: 'Sixpounder',
    drummerId: 55,
    drummerName: 'Jaska Raatikainen',
    drummerSlug: 'jaska-raatikainen',
    band: 'Children of Bodom',
    song: 'Sixpounder',
    album: 'Hate Crew Deathroll (2003)',

    category: 'main-groove',
    style: 'melodic-death-metal',
    difficulty: 'advanced',
    difficultyRating: 4,
    bpm: 180,
    bpmDisplay: '~180 BPM',
    timeSignature: '4/4',

    description: "\"Sixpounder\" opens Children of Bodom's 2003 album Hate Crew Deathroll and is one of Jaska Raatikainen's most recognisable performances. The record marked a turning point for the band's drumming: Raatikainen leaned harder into double-bass pedalling than on any previous Bodom album, and \"Sixpounder\" is the song where that shift is most obvious. The track rides on a fast, driving foundation — galloping double-kick patterns under Alexi Laiho and Janne Wirman's duelling guitar-and-keyboard leads — while the snare keeps a punchy, on-the-grid backbeat that gives the melodic-death chaos something solid to push against. What makes Raatikainen's playing on it so effective is restraint: rather than blasting constantly, he picks his spots, using sustained double-bass runs to lift the choruses and tight fills to mark the transitions between the neoclassical lead sections. It is a masterclass in supporting a busy, melody-driven band without cluttering the arrangement. For drummers, \"Sixpounder\" is an excellent stamina and coordination study. The double-bass passages demand even, controlled foot technique held over long stretches at high tempo, and the snare backbeat has to stay strong and consistent while the feet do the heavy lifting underneath. Because the song is built on a clear, repeating structure, it is approachable enough to learn in sections, yet fast enough to genuinely build endurance and speed. It also teaches an important musical lesson that defined Children of Bodom's sound — the drums exist to drive the song and frame the melodies, not to dominate them. Working through it develops double-bass control, backbeat consistency, and the judgement to know when to fill and when to lock in and drive. Spend a few weeks with it and you will notice your double-bass endurance and your ability to hold a steady backbeat under fast feet both improve markedly, which is exactly the foundation the rest of the Children of Bodom catalogue is built on.",

    techniques: ['double-bass', 'blast-beat', 'groove-drumming'],
    techniqueDetails: [
      'Hold an even, controlled double-bass pattern under the verse without rushing',
      'Keep the snare backbeat strong and on-grid while the feet carry the drive',
      'Lift the choruses with sustained double-kick runs rather than constant blasting',
      'Mark each transition into a lead section with a short, decisive fill',
      'Build the song in sections so the high-tempo passages develop real stamina',
    ],

    tutorial: {
      youtubeId: 'PflWgKFru-4',
      startTime: 0,
      title: 'Children of Bodom - Sixpounder',
      description: 'Reference track for the Sixpounder drum part',
    },

    gearUsed: [
      { name: 'Tama Starclassic Kit', type: 'drums', link: null },
      { name: 'Sabian Cymbals', type: 'cymbals', link: null },
      { name: 'Tama Iron Cobra Pedals', type: 'pedals', link: null },
    ],

    learningTips: [
      'Practise the double-bass pattern slowly with a metronome until both feet are perfectly even',
      'Build endurance by looping the verse groove for several minutes without stopping',
      'Keep your ankles relaxed — tension is what makes fast double bass fall apart',
      'Learn the song in sections and join them once each part is comfortable',
    ],

    seo: {
      title: 'Jaska Raatikainen Sixpounder - Double Bass Drum Tutorial | MetalForge',
      description: "Learn Jaska Raatikainen's driving double-bass groove from Children of Bodom's Sixpounder. Video, technique breakdown, and practice tips.",
      keywords: ['jaska raatikainen', 'sixpounder drums', 'children of bodom', 'double bass tutorial', 'melodic death metal drumming', 'hate crew deathroll'],
    },
  },

  'jaska-raatikainen-lake-bodom-fills': {
    slug: 'jaska-raatikainen-lake-bodom-fills',
    name: 'Lake Bodom Driving Fills',
    shortName: 'Lake Bodom',
    drummerId: 55,
    drummerName: 'Jaska Raatikainen',
    drummerSlug: 'jaska-raatikainen',
    band: 'Children of Bodom',
    song: 'Lake Bodom',
    album: 'Something Wild (1997)',

    category: 'fill',
    style: 'melodic-death-metal',
    difficulty: 'advanced',
    difficultyRating: 4,
    bpm: 200,
    bpmDisplay: '~200 BPM',
    timeSignature: '4/4',

    description: "\"Lake Bodom\" is the opening track of Children of Bodom's 1997 debut Something Wild and the song that introduced the world to the band's signature blend of neoclassical melody and aggressive melodic death metal. Jaska Raatikainen's drumming on it is fast, theatrical and full of momentum — it sets the template for the entire Bodom catalogue. The track is built around driving double-bass verses and a powerful, propulsive feel, punctuated by sharp fills that launch the song from one section to the next. Raatikainen co-founded the band in 1993 alongside the late Alexi Laiho, and his role here is to be the engine: he pushes the tempo, frames Laiho's shred leads and Janne Wirman's keyboard runs, and uses tom fills and crash accents to signal every dramatic turn in the arrangement. The drumcam footage of him performing it live shows just how physical the part is — the fills sweep across the toms with real authority while the feet keep a relentless pulse underneath. For students, \"Lake Bodom\" is a great study in fill vocabulary and transitions: the fills are fast but musical, always landing back on beat one and always serving the song's forward drive rather than showing off. Learning them develops single-stroke speed around the kit, control of dynamics so the fills cut through without flamming, and the timing discipline to place a fill exactly where the arrangement needs a lift. Combined with the double-bass-driven verses, it is a well-rounded workout that captures the youthful energy and precision that made Children of Bodom one of Finland's most influential metal exports. It remains a fan favourite and a benchmark for melodic-death-metal drumming. More than two decades after its release it still functions as a perfect teaching piece, pairing flashy, ear-catching fills with the kind of relentless drive that teaches you to keep the energy up no matter how busy your hands become.",

    techniques: ['fill-techniques', 'double-bass', 'groove-drumming'],
    techniqueDetails: [
      'Keep a relentless double-bass pulse driving the verse forward',
      'Sweep the tom fills cleanly across the kit with even single strokes',
      'Land every fill back on beat one so the song never loses momentum',
      'Use crash accents to signal each transition and dramatic turn',
      'Play the fills musically — fast but always serving the song, not showing off',
    ],

    tutorial: {
      youtubeId: 'AgmvOkDqCHI',
      startTime: 0,
      title: "Children of Bodom Jaska Raatikainen Drumcam 'Lake Bodom' / Turku, Finland",
      description: 'Live drumcam of Jaska Raatikainen playing Lake Bodom',
    },

    gearUsed: [
      { name: 'Tama Starclassic Kit', type: 'drums', link: null },
      { name: 'Sabian Cymbals', type: 'cymbals', link: null },
      { name: 'Tama Iron Cobra Pedals', type: 'pedals', link: null },
    ],

    learningTips: [
      'Practise single-stroke fills slowly around the toms before bringing them up to tempo',
      'Use a metronome and make sure every fill resolves precisely on beat one',
      'Keep the double-bass pulse steady underneath so the energy never drops',
      'Watch the live drumcam to see how the fills are orchestrated across the kit',
    ],

    seo: {
      title: 'Jaska Raatikainen Lake Bodom - Drum Fill Tutorial | MetalForge',
      description: "Learn Jaska Raatikainen's driving fills from Children of Bodom's Lake Bodom. Live drumcam, technique breakdown, and practice tips.",
      keywords: ['jaska raatikainen', 'lake bodom drums', 'children of bodom', 'drum fill tutorial', 'melodic death metal drumming', 'something wild'],
    },
  },

  'jaska-raatikainen-hate-crew-deathroll-blast': {
    slug: 'jaska-raatikainen-hate-crew-deathroll-blast',
    name: 'Hate Crew Deathroll Double-Bass Assault',
    shortName: 'Hate Crew Deathroll',
    drummerId: 55,
    drummerName: 'Jaska Raatikainen',
    drummerSlug: 'jaska-raatikainen',
    band: 'Children of Bodom',
    song: 'Hate Crew Deathroll',
    album: 'Hate Crew Deathroll (2003)',

    category: 'signature-pattern',
    style: 'melodic-death-metal',
    difficulty: 'advanced',
    difficultyRating: 4,
    bpm: 190,
    bpmDisplay: '~190 BPM',
    timeSignature: '4/4',

    description: "The title track of Children of Bodom's 2003 album Hate Crew Deathroll is one of Jaska Raatikainen's most aggressive recorded performances and a high point of the band's heaviest, most double-bass-driven era. Where earlier Bodom records leaned on neoclassical flash, Hate Crew Deathroll pushed the rhythm section to the front, and this song is built on relentless, machine-gun double-kick passages that power the verses and choruses alike. Raatikainen drives the track with sustained double-bass runs, sharp blast-influenced sections, and tightly controlled snare work that cuts through the dense guitar-and-keyboard arrangement. The challenge for any drummer attempting it is endurance and evenness: the double-bass figures are fast and long, and they have to stay perfectly consistent while the hands keep the backbeat and accents locked to the riff. It is a song that punishes tension and rewards relaxed, efficient foot technique — the only way to sustain the kick patterns at tempo is to let the pedals do the work rather than fighting them. Musically, it captures the more brutal, hardcore-influenced direction the band took in the mid-2000s, with Raatikainen acting as the relentless engine behind Alexi Laiho's vocals and leads. For advancing players it is a complete double-bass workout that also demands coordination, because the feet never really stop while the hands move between ride, hi-hat, snare and crashes. Working through it slowly and building tempo gradually develops the stamina, evenness and coordination that define extreme-metal drumming, and it pairs naturally with the band's other Hate Crew Deathroll material as a study in how to drive a fast, melody-rich metal song without ever losing the groove. It is a fitting signature for one of melodic death metal's foundational drummers. Master it and you will have one of the most demanding double-bass workouts in the genre sitting comfortably under your feet, ready to carry over into faster, more brutal material whenever you need it.",

    techniques: ['double-bass', 'blast-beat', 'odd-time-signatures'],
    techniqueDetails: [
      'Sustain long, even double-bass runs without letting the tempo drift',
      'Keep the hands locked to the riff with tight snare and accent work',
      'Stay relaxed and let the pedals rebound — tension kills speed and stamina',
      'Coordinate ride, hi-hat and crash moves over the constant kick pulse',
      'Build tempo gradually from a slow, even base to develop real endurance',
    ],

    tutorial: {
      youtubeId: 'pLXj-pcZ3EI',
      startTime: 0,
      title: 'Jaska Raatikainen (Children of Bodom) - Drum Lesson',
      description: 'Jaska Raatikainen demonstrating his double-bass technique',
    },

    gearUsed: [
      { name: 'Tama Starclassic Kit', type: 'drums', link: null },
      { name: 'Sabian Cymbals', type: 'cymbals', link: null },
      { name: 'Tama Iron Cobra Pedals', type: 'pedals', link: null },
    ],

    learningTips: [
      'Develop double-bass endurance with long, slow, even foot exercises first',
      'Keep your legs and ankles relaxed so the pedals rebound on their own',
      'Practise the hand-and-foot coordination away from full tempo until it is automatic',
      'Increase the metronome a few BPM at a time rather than jumping to full speed',
    ],

    seo: {
      title: 'Jaska Raatikainen Hate Crew Deathroll - Double Bass Drum Tutorial | MetalForge',
      description: "Learn Jaska Raatikainen's double-bass assault from Children of Bodom's Hate Crew Deathroll title track. Video, technique breakdown, and practice tips.",
      keywords: ['jaska raatikainen', 'hate crew deathroll drums', 'children of bodom', 'double bass tutorial', 'extreme metal drumming', 'melodic death metal'],
    },
  },
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Get lick by slug
 */
export function getLickBySlug(slug) {
  return SIGNATURE_LICKS[slug] || null;
}

/**
 * Get all licks for a drummer
 */
export function getLicksByDrummerSlug(drummerSlug) {
  return Object.values(SIGNATURE_LICKS).filter(
    lick => lick.drummerSlug === drummerSlug
  );
}

/**
 * Get all licks
 */
export function getAllLicks() {
  return Object.values(SIGNATURE_LICKS);
}

/**
 * Filter licks by criteria
 */
export function filterLicks({ difficulty, style, bpmMin, bpmMax, technique } = {}) {
  let results = Object.values(SIGNATURE_LICKS);
  
  if (difficulty) {
    results = results.filter(l => l.difficulty === difficulty);
  }
  
  if (style) {
    results = results.filter(l => l.style === style);
  }
  
  if (bpmMin) {
    results = results.filter(l => l.bpm >= bpmMin);
  }
  
  if (bpmMax) {
    results = results.filter(l => l.bpm <= bpmMax);
  }
  
  if (technique) {
    results = results.filter(l => l.techniques.includes(technique));
  }
  
  return results;
}

/**
 * Get unique styles from all licks
 */
export function getAvailableStyles() {
  const styles = new Set(Object.values(SIGNATURE_LICKS).map(l => l.style));
  return Array.from(styles).sort();
}

/**
 * Get unique techniques from all licks
 */
export function getAvailableTechniques() {
  const techniques = new Set();
  Object.values(SIGNATURE_LICKS).forEach(l => {
    l.techniques.forEach(t => techniques.add(t));
  });
  return Array.from(techniques).sort();
}

/**
 * Get unique difficulties
 */
export function getAvailableDifficulties() {
  return ['beginner', 'intermediate', 'advanced', 'expert'];
}

/**
 * Get BPM ranges for filtering
 */
export function getBpmRanges() {
  return [
    { label: 'Slow (< 120)', min: 0, max: 119 },
    { label: 'Medium (120-180)', min: 120, max: 180 },
    { label: 'Fast (180-220)', min: 180, max: 220 },
    { label: 'Extreme (220+)', min: 220, max: 999 },
  ];
}

/**
 * Generate Schema.org VideoObject + HowTo markup for a lick
 */
/**
 * Resolve a representative YouTube ID for a lick's thumbnail/imagery.
 * Falls back to the tutorial video when a lick has no primary video,
 * and returns null when neither exists (caller renders a placeholder).
 */
export function getLickThumbId(lick) {
  return lick?.video?.youtubeId || lick?.tutorial?.youtubeId || null;
}

export function generateLickSchema(lick) {
  const url = `https://metalforge.io/drummers/${lick.drummerSlug}/licks/${lick.slug}`;
  
  const thumbId = getLickThumbId(lick);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      // VideoObject for the main video (only when a primary video exists)
      ...(lick.video ? [{
        "@type": "VideoObject",
        "name": lick.video.title,
        "description": lick.video.description,
        "thumbnailUrl": `https://i.ytimg.com/vi/${lick.video.youtubeId}/hqdefault.jpg`,
        "uploadDate": "2024-01-01", // Approximation
        "contentUrl": `https://www.youtube.com/watch?v=${lick.video.youtubeId}`,
        "embedUrl": `https://www.youtube.com/embed/${lick.video.youtubeId}`,
        "duration": lick.video.endTime ? `PT${lick.video.endTime - (lick.video.startTime || 0)}S` : undefined,
      }] : []),
      // HowTo for learning the lick
      {
        "@type": "HowTo",
        "name": `How to Play ${lick.name}`,
        "description": lick.description,
        ...(thumbId ? { "image": `https://i.ytimg.com/vi/${thumbId}/hqdefault.jpg` } : {}),
        "totalTime": "PT30M",
        "tool": lick.gearUsed.map(g => ({
          "@type": "HowToTool",
          "name": g.name,
        })),
        "step": lick.learningTips.map((tip, index) => ({
          "@type": "HowToStep",
          "position": index + 1,
          "name": `Step ${index + 1}`,
          "text": tip,
        })),
        "supply": lick.techniques.map(t => ({
          "@type": "HowToSupply",
          "name": t.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        })),
      },
      // MusicRecording
      {
        "@type": "MusicRecording",
        "name": lick.song,
        "byArtist": {
          "@type": "MusicGroup",
          "name": lick.band,
        },
        "inAlbum": {
          "@type": "MusicAlbum",
          "name": lick.album.split(' (')[0],
        },
      },
      // Breadcrumb
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://metalforge.io" },
          { "@type": "ListItem", "position": 2, "name": lick.drummerName, "item": `https://metalforge.io/drummer/${lick.drummerSlug}` },
          { "@type": "ListItem", "position": 3, "name": "Signature Licks", "item": `https://metalforge.io/drummers/${lick.drummerSlug}/licks` },
          { "@type": "ListItem", "position": 4, "name": lick.name, "item": url },
        ],
      },
    ],
  };
  
  // Add tutorial video if available
  if (lick.tutorial) {
    schema["@graph"].push({
      "@type": "VideoObject",
      "name": lick.tutorial.title,
      "description": lick.tutorial.description,
      "thumbnailUrl": `https://i.ytimg.com/vi/${lick.tutorial.youtubeId}/hqdefault.jpg`,
      "contentUrl": `https://www.youtube.com/watch?v=${lick.tutorial.youtubeId}`,
      "embedUrl": `https://www.youtube.com/embed/${lick.tutorial.youtubeId}`,
    });
  }
  
  return schema;
}

/**
 * Generate Schema.org for the licks hub page
 */
export function generateLicksHubSchema(drummerName, drummerSlug, licks) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${drummerName} Signature Licks`,
    "description": `Learn ${drummerName}'s most iconic drum fills, patterns, and techniques with video tutorials.`,
    "url": `https://metalforge.io/drummers/${drummerSlug}/licks`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": licks.map((lick, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": lick.name,
        "url": `https://metalforge.io/drummers/${drummerSlug}/licks/${lick.slug}`,
      })),
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://metalforge.io" },
        { "@type": "ListItem", "position": 2, "name": drummerName, "item": `https://metalforge.io/drummer/${drummerSlug}` },
        { "@type": "ListItem", "position": 3, "name": "Signature Licks", "item": `https://metalforge.io/drummers/${drummerSlug}/licks` },
      ],
    },
  };
}

// Drummer slug to ID mapping (for integration)
export const DRUMMER_SLUG_MAP = {
  'joey-jordison': 2,
  'lars-ulrich': 1,
  'dave-lombardo': 4,
  'george-kollias': 6,
  'mario-duplantier': 21,
};

// ==========================================
// DISCOVERY FEATURES (Issue #759)
// ==========================================

/**
 * Get a random lick for discovery gamification
 * Optionally filter by drummer or difficulty
 */
export function getRandomLick({ drummerSlug, difficulty } = {}) {
  let licks = Object.values(SIGNATURE_LICKS);
  
  if (drummerSlug) {
    licks = licks.filter(l => l.drummerSlug === drummerSlug);
  }
  
  if (difficulty) {
    licks = licks.filter(l => l.difficulty === difficulty);
  }
  
  if (licks.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * licks.length);
  return licks[randomIndex];
}

/**
 * Get the Lick of the Day - deterministic based on current date
 * Returns the same lick for everyone on the same day
 */
export function getLickOfTheDay(date = new Date()) {
  const licks = Object.values(SIGNATURE_LICKS);
  if (licks.length === 0) return null;
  
  // Create a deterministic "seed" from the date
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  
  // Simple hash: combine date parts into a single number
  const seed = year * 10000 + month * 100 + day;
  
  // Use the seed to select a lick (modulo ensures we stay in bounds)
  const index = seed % licks.length;
  
  return licks[index];
}

/**
 * Get the date string for Lick of the Day display
 */
export function getLickOfTheDayDate(date = new Date()) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Get a playlist of all licks from a drummer for binge-watching
 * Returns licks in a logical order (by song, difficulty, etc.)
 */
export function getPlaylist(drummerSlug) {
  const licks = getLicksByDrummerSlug(drummerSlug);
  
  if (licks.length === 0) return null;
  
  // Sort by difficulty (easiest first) for a learning progression
  const sorted = [...licks].sort((a, b) => a.difficultyRating - b.difficultyRating);
  
  // Calculate total duration (estimate 2 min per lick for learning)
  const totalDuration = sorted.length * 2; // minutes
  
  return {
    drummerName: sorted[0].drummerName,
    drummerSlug: drummerSlug,
    band: sorted[0].band,
    licks: sorted,
    count: sorted.length,
    estimatedDuration: totalDuration,
    estimatedDurationDisplay: totalDuration < 60 
      ? `${totalDuration} min` 
      : `${Math.floor(totalDuration / 60)}h ${totalDuration % 60}min`,
  };
}

/**
 * Get all available playlists (one per drummer)
 */
export function getAllPlaylists() {
  const drummers = new Set(Object.values(SIGNATURE_LICKS).map(l => l.drummerSlug));
  return Array.from(drummers).map(slug => getPlaylist(slug)).filter(Boolean);
}

/**
 * Get next lick in sequence (for playlist navigation)
 */
export function getNextLickInPlaylist(currentSlug, drummerSlug) {
  const playlist = getPlaylist(drummerSlug);
  if (!playlist) return null;
  
  const currentIndex = playlist.licks.findIndex(l => l.slug === currentSlug);
  if (currentIndex === -1 || currentIndex >= playlist.licks.length - 1) {
    return playlist.licks[0]; // Loop back to start
  }
  
  return playlist.licks[currentIndex + 1];
}

/**
 * Get previous lick in sequence (for playlist navigation)
 */
export function getPreviousLickInPlaylist(currentSlug, drummerSlug) {
  const playlist = getPlaylist(drummerSlug);
  if (!playlist) return null;
  
  const currentIndex = playlist.licks.findIndex(l => l.slug === currentSlug);
  if (currentIndex <= 0) {
    return playlist.licks[playlist.licks.length - 1]; // Loop to end
  }
  
  return playlist.licks[currentIndex - 1];
}

/**
 * Generate Schema.org markup for Lick of the Day widget
 */
export function generateLickOfTheDaySchema(lick, date) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPageElement",
    "name": "Lick of the Day",
    "description": `Today's featured drum lick: ${lick.name} by ${lick.drummerName}`,
    "datePublished": date.toISOString().split('T')[0],
    "mainEntity": {
      "@type": "HowTo",
      "name": `Learn ${lick.name}`,
      "description": lick.description,
      ...(getLickThumbId(lick) ? { "image": `https://i.ytimg.com/vi/${getLickThumbId(lick)}/hqdefault.jpg` } : {}),
    },
  };
}

// Export for external use
export default SIGNATURE_LICKS;
