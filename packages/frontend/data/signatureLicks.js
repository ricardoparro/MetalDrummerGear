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
  // MATT GREINER - August Burns Red (#1012, split 3/5 of #1008)
  // ==========================================
  'matt-greiner-composure-syncopation': {
    slug: 'matt-greiner-composure-syncopation',
    name: 'Composure Syncopated Groove',
    shortName: 'Composure',
    drummerId: 32,
    drummerName: 'Matt Greiner',
    drummerSlug: 'matt-greiner',
    band: 'August Burns Red',
    song: 'Composure',
    album: 'Constellations (2009)',

    category: 'signature-pattern',
    style: 'metalcore',
    difficulty: 'expert',
    difficultyRating: 5,
    bpm: 175,
    bpmDisplay: '~175 BPM',
    timeSignature: '4/4 (heavy syncopation)',

    description: "\"Composure\" from August Burns Red's 2009 album Constellations is one of Matt Greiner's most celebrated performances and a defining moment for technical metalcore drumming. The song is a relentless display of syncopation: Greiner locks his kick drum to the band's stop-start, off-beat guitar riffing so tightly that the drums and guitars read as a single jagged rhythmic machine. What sets his playing apart is how he ornaments those syncopated hits — rather than simply doubling the riff, he weaves ghost notes, quick double-bass bursts and crash accents around the guitar stabs, turning what could be a rigid pattern into something that breathes and grooves. The track also showcases his trademark fluency moving between tight, controlled grooves and explosive fills that erupt out of the riff and land precisely back on the downbeat. For drummers, \"Composure\" is a complete study in playing with a band rather than over it: every kick and accent has a purpose tied to the arrangement, and learning it forces you to develop an internal map of where the riff lands so you can lock to it without staring at a click. It demands fast, even double bass, a strong sense of subdivision to nail the off-beat accents, and the dynamic control to make ghost notes whisper between the loud hits. Greiner has built much of his teaching career around exactly this kind of musical, riff-locked playing, and \"Composure\" is the song most often cited as the benchmark. Working through even a single section sharpens your timing, your ear for syncopation, and your ability to make a technical part feel like a groove rather than an exercise — skills that transfer directly to any modern metal style. It remains a rite-of-passage track for aspiring metalcore drummers. More than a decade on, it still appears constantly on lists of the hardest metalcore drum parts, and nailing it cleanly is a genuine milestone for any developing player.",

    techniques: ['odd-time-signatures', 'double-bass', 'fill-techniques'],
    techniqueDetails: [
      'Lock the kick drum precisely to the off-beat guitar stabs so drums and riff align',
      'Ornament the syncopated hits with ghost notes and quick double-bass bursts',
      'Keep an internal map of where the riff lands so you can lock without a click',
      'Erupt into fills out of the riff and resolve them exactly on the downbeat',
      'Build the part in sections, mastering the syncopation slowly before adding speed',
    ],

    tutorial: {
      youtubeId: 'iSoU9fs4Umo',
      startTime: 0,
      title: 'August Burns Red - Composure (Matt Greiner Drum Playthrough)',
      description: "Matt Greiner's official drum playthrough of Composure",
    },

    gearUsed: [
      { name: 'Tama Star Series Kit', type: 'drums', link: null },
      { name: 'Meinl Byzance Cymbals', type: 'cymbals', link: null },
      { name: 'Tama Speed Cobra Pedals', type: 'pedals', link: null },
    ],

    learningTips: [
      'Tap the guitar riff with your hands away from the kit until the syncopation is internalised',
      'Practise the double-bass bursts slowly so every stroke speaks evenly',
      'Loop one section with a metronome before stringing the parts together',
      'Record yourself and check that the kick lines up exactly with the riff',
    ],

    seo: {
      title: 'Matt Greiner Composure - August Burns Red Drum Tutorial | MetalForge',
      description: "Learn Matt Greiner's syncopated groove from August Burns Red's Composure. Video playthrough, technique breakdown, and practice tips.",
      keywords: ['matt greiner', 'composure drums', 'august burns red', 'metalcore drumming', 'syncopation tutorial', 'constellations'],
    },
  },

  'matt-greiner-meridian-double-bass': {
    slug: 'matt-greiner-meridian-double-bass',
    name: 'Meridian Double-Bass Groove',
    shortName: 'Meridian',
    drummerId: 32,
    drummerName: 'Matt Greiner',
    drummerSlug: 'matt-greiner',
    band: 'August Burns Red',
    song: 'Meridian',
    album: 'Constellations (2009)',

    category: 'main-groove',
    style: 'metalcore',
    difficulty: 'advanced',
    difficultyRating: 4,
    bpm: 165,
    bpmDisplay: '~165 BPM',
    timeSignature: '4/4',

    description: "\"Meridian\" opens August Burns Red's 2009 album Constellations and immediately establishes Matt Greiner as one of metalcore's most musical heavy hitters. The song is built on driving double-bass grooves that power the verses, punctuated by the kind of crisp, articulate fills that became Greiner's signature. What makes his double bass so effective here is its evenness and its relationship to the riff: rather than a constant wall of kick, he uses bursts and sustained runs that lock to the guitar rhythm and lift each section, leaving space for the band's melodic passages to breathe. The track also highlights his command of orchestration around the kit — the way he moves a groove between the hi-hat, ride and crash-bell to mark the changing sections of the song, keeping a long arrangement feeling dynamic and purposeful. For drummers, \"Meridian\" is an ideal double-bass and groove study because the patterns are demanding but logical: the feet carry the energy while the hands hold a strong, consistent backbeat and decorate the transitions with tasteful fills. Learning it develops foot endurance, the ability to keep double bass even at tempo, and the discipline to play for the song rather than over it. It is also a great lesson in dynamics and sectioning — Greiner constantly signals where the music is going with his cymbal choices and fill placement, so studying the part trains your arranging instincts as much as your hands and feet. Approached patiently, building the double-bass figures up from a slow, even base, it rewards you with a versatile vocabulary of metalcore grooves and the stamina to play them through a full song. It is a cornerstone track for anyone wanting to play in the modern metalcore style with feel and control. Spend time with it and your foot endurance and your instinct for when to drive and when to leave space will both improve noticeably.",

    techniques: ['double-bass', 'groove-drumming', 'blast-beat'],
    techniqueDetails: [
      'Drive the verses with even, controlled double-bass bursts locked to the riff',
      'Hold a strong, consistent backbeat with the hands while the feet carry the energy',
      'Move the groove between hi-hat, ride and crash-bell to mark each section',
      'Decorate the transitions with crisp, articulate fills that serve the song',
      'Build the double-bass figures up from a slow, even base to develop stamina',
    ],

    tutorial: {
      youtubeId: 'bhw2vKzNaDo',
      startTime: 0,
      title: 'August Burns Red | Meridian (Matt Greiner Drum Playthrough)',
      description: "Matt Greiner's official drum playthrough of Meridian",
    },

    gearUsed: [
      { name: 'Tama Star Series Kit', type: 'drums', link: null },
      { name: 'Meinl Byzance Cymbals', type: 'cymbals', link: null },
      { name: 'Tama Speed Cobra Pedals', type: 'pedals', link: null },
    ],

    learningTips: [
      'Develop double-bass endurance with slow, even foot exercises before full speed',
      'Keep your ankles relaxed so the pedals rebound on their own',
      'Use cymbal changes deliberately to mark the sections as Greiner does',
      'Practise the fills separately, then place them back into the groove',
    ],

    seo: {
      title: 'Matt Greiner Meridian - Double Bass Drum Tutorial | MetalForge',
      description: "Learn Matt Greiner's driving double-bass groove from August Burns Red's Meridian. Video playthrough, technique breakdown, and practice tips.",
      keywords: ['matt greiner', 'meridian drums', 'august burns red', 'double bass tutorial', 'metalcore drumming', 'constellations'],
    },
  },

  'matt-greiner-sonic-salvation-groove': {
    slug: 'matt-greiner-sonic-salvation-groove',
    name: 'Sonic Salvation Metalcore Groove',
    shortName: 'Sonic Salvation',
    drummerId: 32,
    drummerName: 'Matt Greiner',
    drummerSlug: 'matt-greiner',
    band: 'August Burns Red',
    song: 'Sonic Salvation',
    album: 'Guardians (2020)',

    category: 'main-groove',
    style: 'metalcore',
    difficulty: 'advanced',
    difficultyRating: 4,
    bpm: 170,
    bpmDisplay: '~170 BPM',
    timeSignature: '4/4 (with metric shifts)',

    description: "\"Sonic Salvation\" from August Burns Red's 2020 album Guardians shows a more mature, refined side of Matt Greiner's playing while keeping all the precision that made his earlier work famous. The track blends driving metalcore grooves with the band's progressive tendencies — there are tight, riff-locked verses, expansive melodic sections, and several metric shifts that demand a drummer who can stay grounded while the time feel moves underneath him. Greiner handles it with his characteristic blend of power and finesse: the double-bass work is fast and even, the backbeat is rock-solid, and the fills are inventive without ever derailing the groove. What is most instructive about this song is how he uses dynamics to shape a long, varied arrangement — pulling back to a simpler groove under the clean, melodic passages, then re-engaging the full double-bass assault when the heaviness returns. That sense of restraint and pacing is what separates a seasoned player from a flashy one, and it is on full display here. For drummers, \"Sonic Salvation\" is a great study in playing a modern, dynamic metal arrangement from start to finish: it requires endurance, the ability to navigate metric shifts without losing beat one, and the musical judgement to know when to drive and when to lay back. Learning it builds double-bass stamina, coordination across the kit, and the arranging instincts to support a song's emotional arc rather than just executing parts. Because Greiner filmed an official playthrough, the sticking and orchestration are documented, making it an accessible deep-dive for intermediate and advanced players alike. It is a strong example of how technical drumming can stay tasteful and song-serving even at the highest level of difficulty. It is the kind of track that grows with you — comfortable to approach in pieces, yet deep enough to keep rewarding study as your control and stamina improve over months of practice.",

    techniques: ['groove-drumming', 'double-bass', 'fill-techniques'],
    techniqueDetails: [
      'Pull back to a simpler groove under the clean, melodic passages',
      'Re-engage the full double-bass assault when the heaviness returns',
      'Navigate the metric shifts while keeping a firm sense of beat one',
      'Place inventive fills that decorate the groove without derailing it',
      'Use dynamics to shape the song arc from start to finish',
    ],

    tutorial: {
      youtubeId: 'J1fxihr8qxo',
      startTime: 0,
      title: 'August Burns Red - Sonic Salvation (Matt Greiner Drum Playthrough)',
      description: "Matt Greiner's official drum playthrough of Sonic Salvation",
    },

    gearUsed: [
      { name: 'Tama Star Series Kit', type: 'drums', link: null },
      { name: 'Meinl Byzance Cymbals', type: 'cymbals', link: null },
      { name: 'Tama Speed Cobra Pedals', type: 'pedals', link: null },
    ],

    learningTips: [
      'Map the metric shifts and count each one until beat one is automatic',
      'Practise transitioning between the laid-back and full-intensity grooves',
      'Build double-bass endurance so the part holds up across the full song',
      'Follow the official playthrough to learn the orchestration and sticking',
    ],

    seo: {
      title: 'Matt Greiner Sonic Salvation - August Burns Red Drum Tutorial | MetalForge',
      description: "Learn Matt Greiner's dynamic metalcore groove from August Burns Red's Sonic Salvation. Video playthrough, technique breakdown, and practice tips.",
      keywords: ['matt greiner', 'sonic salvation drums', 'august burns red', 'metalcore drumming', 'double bass tutorial', 'guardians'],
    },
  },

  // ==========================================
  // BEN KOLLER - Converge (#1012, split 3/5 of #1008)
  // ==========================================
  'ben-koller-concubine-grind': {
    slug: 'ben-koller-concubine-grind',
    name: 'Concubine Grind Assault',
    shortName: 'Concubine',
    drummerId: 34,
    drummerName: 'Ben Koller',
    drummerSlug: 'ben-koller',
    band: 'Converge',
    song: 'Concubine',
    album: 'Jane Doe (2001)',

    category: 'signature-pattern',
    style: 'mathcore',
    difficulty: 'expert',
    difficultyRating: 5,
    bpm: 210,
    bpmDisplay: '~210 BPM',
    timeSignature: '4/4 (frantic, riff-led)',

    description: "\"Concubine\" is the explosive opening track of Converge's landmark 2001 album Jane Doe, and Ben Koller's drumming on it is one of the most influential performances in the history of mathcore and chaotic hardcore. Lasting barely over a minute, the song is a furious blur of blast-influenced speed, lurching tempo changes and jagged accents, and Koller plays it with a wild, almost unhinged energy that nonetheless stays locked to Kurt Ballou's serrated guitar riffing. What makes his approach so distinctive is that he treats the kit like a hardcore punk drummer rather than a metal technician — there is enormous physicality and abandon in his playing, yet the precision required to track the riff's sudden stops and restarts is immense. The track careens between flat-out blasting, frantic single-stroke fills that tumble around the toms, and tight, punchy hardcore grooves, all delivered at a tempo that punishes any hesitation. For drummers, \"Concubine\" is a study in controlled chaos: it demands raw speed, fearless dynamics, and the ability to lock to a riff that is deliberately trying to throw you off, all while playing with the kind of loose, aggressive feel that gives Converge its identity. Learning even part of it builds single-stroke speed, blast-beat stamina, and the confidence to attack the kit hard without losing the thread of the arrangement. It is also a lesson in feel over polish — the goal is not robotic perfection but a performance that sounds dangerous and alive while still hitting every transition. Koller's drum-cam footage of the song reveals just how much body and motion go into it, making it a fascinating watch for anyone studying how to generate that much intensity. It remains a benchmark for extreme hardcore drumming. Decades after its release it still sounds shockingly intense, and learning to play it with that same reckless abandon is a goal worth chasing for any hardcore drummer.",

    techniques: ['blast-beat', 'fill-techniques', 'double-bass'],
    techniqueDetails: [
      'Lock the frantic groove to the guitar riff through its sudden stops and restarts',
      'Drive the fast sections with blast-influenced single strokes between snare and hi-hat',
      'Tumble single-stroke fills around the toms and resolve them on the downbeat',
      'Attack the kit hard with a loose, aggressive hardcore feel rather than rigid precision',
      'Build speed and stamina from a slower tempo before approaching full pace',
    ],

    tutorial: {
      youtubeId: '5T4iTvQ8ZUg',
      startTime: 0,
      title: 'Converge Concubine and Dark Horse Live GoPro drum cam Ben Koller',
      description: 'Ben Koller GoPro drum cam of Concubine',
    },

    gearUsed: [
      { name: 'Tama Drums', type: 'drums', link: null },
      { name: 'Zildjian Cymbals', type: 'cymbals', link: null },
      { name: 'Tama Iron Cobra Pedals', type: 'pedals', link: null },
    ],

    learningTips: [
      'Build single-stroke speed on a practice pad before taking it to the kit',
      'Work blast stamina up gradually with a metronome — start well below tempo',
      'Tap the riff to internalise its stops and restarts before playing along',
      'Focus on aggressive feel and energy, not robotic precision',
    ],

    seo: {
      title: 'Ben Koller Concubine - Converge Drum Tutorial | MetalForge',
      description: "Learn Ben Koller's grind assault from Converge's Concubine. Drum-cam footage, technique breakdown, and practice tips.",
      keywords: ['ben koller', 'concubine drums', 'converge', 'mathcore drumming', 'hardcore drum tutorial', 'jane doe'],
    },
  },

  'ben-koller-dark-horse-fills': {
    slug: 'ben-koller-dark-horse-fills',
    name: 'Dark Horse Driving Fills',
    shortName: 'Dark Horse',
    drummerId: 34,
    drummerName: 'Ben Koller',
    drummerSlug: 'ben-koller',
    band: 'Converge',
    song: 'Dark Horse',
    album: 'Axe to Fall (2009)',

    category: 'fill',
    style: 'mathcore',
    difficulty: 'advanced',
    difficultyRating: 4,
    bpm: 190,
    bpmDisplay: '~190 BPM',
    timeSignature: '4/4',

    description: "\"Dark Horse\" opens Converge's 2009 album Axe to Fall and is one of Ben Koller's most propulsive, fill-heavy performances. Compared with the all-out chaos of earlier Converge material, this song rides a more driving, almost galloping feel, and Koller fills the space with a constant stream of explosive fills and tom runs that push the song relentlessly forward. The track is a showcase of his fill vocabulary: rapid single strokes, snare-and-tom combinations and crash accents that erupt out of the groove and slam back into the pulse, all delivered with his trademark physical, hardcore-rooted energy. Underneath the flash, the groove stays urgent and powerful — the kick and snare drive hard while the hands decorate every available gap, creating a sense of perpetual motion that is central to the song's intensity. For drummers, \"Dark Horse\" is an excellent study in fill placement and forward momentum: the challenge is to play busy without ever sounding cluttered, keeping the fills musical and the groove always present beneath them. Learning it develops single-stroke speed around the kit, the coordination to move seamlessly between groove and fill, and the timing discipline to resolve every burst exactly where the song needs it. It also teaches an important lesson about energy — Koller's playing here is about momentum and feel as much as technique, and capturing that drive is as important as hitting the notes. Because there are clean drum-focused versions of the part available, the orchestration is easy to study, making it an accessible deep-dive for advancing players. It is a great track for building the kind of relentless, fill-driven playing that defines modern aggressive hardcore and mathcore drumming, and a fine example of Koller's enduring influence on the style. Few songs better demonstrate how to keep a part busy and exciting without ever burying the groove that holds it all together.",

    techniques: ['groove-drumming', 'fill-techniques', 'double-bass'],
    techniqueDetails: [
      'Keep an urgent, driving kick-and-snare groove beneath the constant fills',
      'Erupt into single-stroke tom runs and resolve them back into the pulse',
      'Decorate every available gap without letting the groove sound cluttered',
      'Use crash accents to punctuate the ends of phrases',
      'Resolve every fill exactly on the beat the song demands',
    ],

    tutorial: {
      youtubeId: 'B8ocT6G5YcI',
      startTime: 0,
      title: 'Converge - "Dark Horse" E-Kit Playthrough',
      description: 'Clean drum-focused playthrough of Dark Horse',
    },

    gearUsed: [
      { name: 'Tama Drums', type: 'drums', link: null },
      { name: 'Zildjian Cymbals', type: 'cymbals', link: null },
      { name: 'Tama Iron Cobra Pedals', type: 'pedals', link: null },
    ],

    learningTips: [
      'Practise single-stroke fills slowly around the toms before bringing them up to speed',
      'Make sure the groove stays present and urgent underneath the fills',
      'Use a metronome to land every fill precisely back on the beat',
      'Focus on momentum and feel, not just executing the notes',
    ],

    seo: {
      title: 'Ben Koller Dark Horse - Converge Drum Fill Tutorial | MetalForge',
      description: "Learn Ben Koller's driving fills from Converge's Dark Horse. Drum playthrough, technique breakdown, and practice tips.",
      keywords: ['ben koller', 'dark horse drums', 'converge', 'drum fill tutorial', 'mathcore drumming', 'axe to fall'],
    },
  },

  'ben-koller-aimless-arrow-hardcore': {
    slug: 'ben-koller-aimless-arrow-hardcore',
    name: 'Aimless Arrow Hardcore Drive',
    shortName: 'Aimless Arrow',
    drummerId: 34,
    drummerName: 'Ben Koller',
    drummerSlug: 'ben-koller',
    band: 'Converge',
    song: 'Aimless Arrow',
    album: 'Jane Doe (2001)',

    category: 'main-groove',
    style: 'mathcore',
    difficulty: 'advanced',
    difficultyRating: 4,
    bpm: 185,
    bpmDisplay: '~185 BPM',
    timeSignature: '4/4',

    description: "\"Aimless Arrow\" from Converge's 2001 masterpiece Jane Doe is a perfect example of Ben Koller's ability to balance hardcore power with mathcore unpredictability. The song moves between pounding, mid-tempo hardcore grooves and faster, more frantic passages, and Koller navigates those shifts with a physical, driving feel that never loses its sense of purpose. His playing here is less about constant blasting and more about dynamics and impact: he leans into heavy, deliberate backbeats during the slower sections, then unleashes bursts of speed and tumbling fills when the song accelerates, using the contrast to maximise intensity. The track demands a strong, confident groove, the coordination to switch gears instantly, and the kind of aggressive attack that gives Converge its visceral edge. What makes it instructive is the way Koller uses space — he does not fill every moment, instead choosing his spots so that when the fast sections and fills arrive they hit with real force. For drummers, \"Aimless Arrow\" is a great study in dynamics, gear-changing and hardcore feel: learning it develops the ability to play heavy and deliberate one moment and fast and chaotic the next, all while keeping the groove rooted and powerful. It builds single-stroke speed, coordination between hands and feet through the tempo shifts, and the musical judgement to use restraint as a tool for impact. Koller's GoPro drum-cam footage of the song captures the sheer physicality of his approach, showing how much of the intensity comes from body and motion rather than just technique. It is a foundational track for understanding how to bring hardcore energy and dynamic contrast to aggressive metal drumming, and another reason Koller is regarded as one of the most influential players in the genre. Working through it will leave you with a sharper sense of dynamics and a more powerful, confident hardcore feel that carries into everything else you play.",

    techniques: ['blast-beat', 'fill-techniques', 'groove-drumming'],
    techniqueDetails: [
      'Lean into heavy, deliberate backbeats during the mid-tempo hardcore sections',
      'Unleash bursts of speed and tumbling fills when the song accelerates',
      'Switch gears instantly between the slow and fast passages',
      'Use space and restraint so the fast sections hit with maximum force',
      'Keep the groove rooted and powerful through every tempo change',
    ],

    tutorial: {
      youtubeId: 'JWfmoA5jFMQ',
      startTime: 0,
      title: 'Converge - Aimless Arrow GoPro POV Drum Cam',
      description: 'Ben Koller GoPro drum cam of Aimless Arrow',
    },

    gearUsed: [
      { name: 'Tama Drums', type: 'drums', link: null },
      { name: 'Zildjian Cymbals', type: 'cymbals', link: null },
      { name: 'Tama Iron Cobra Pedals', type: 'pedals', link: null },
    ],

    learningTips: [
      'Practise switching between heavy mid-tempo grooves and fast bursts',
      'Build single-stroke speed gradually for the accelerated sections',
      'Use dynamics deliberately — restraint makes the fast parts hit harder',
      'Watch the drum-cam footage to see how much motion drives the intensity',
    ],

    seo: {
      title: 'Ben Koller Aimless Arrow - Converge Drum Tutorial | MetalForge',
      description: "Learn Ben Koller's hardcore drive and dynamics from Converge's Aimless Arrow. Drum-cam footage, technique breakdown, and practice tips.",
      keywords: ['ben koller', 'aimless arrow drums', 'converge', 'hardcore drum tutorial', 'mathcore drumming', 'jane doe'],
    },
  },
  // ==========================================
  // DANNY CAREY - Tool (Issue #1013)
  // ==========================================
  'danny-carey-pneuma-groove': {
    slug: 'danny-carey-pneuma-groove',
    name: 'Pneuma Main Groove',
    shortName: 'Pneuma Groove',
    drummerId: 14,
    drummerName: 'Danny Carey',
    drummerSlug: 'danny-carey',
    band: 'Tool',
    song: 'Pneuma',
    album: 'Fear Inoculum (2019)',

    category: 'main-groove',
    style: 'progressive-metal',
    difficulty: 'expert',
    difficultyRating: 5,
    bpm: 77,
    bpmDisplay: '77 BPM',
    timeSignature: '9/8',

    description: 'Pneuma is one of the defining drum performances of Tool\'s comeback record Fear Inoculum, and it showcases everything that makes Danny Carey a generational player: huge tom orchestration, hypnotic odd-time phrasing, and an almost orchestral sense of dynamics. The track lives in a rolling 9/8 pulse that Carey makes feel completely natural, layering ride-bell ostinatos over a deep, breathing kick pattern that anchors the riff cycle. What sounds like effortless groove is actually a carefully constructed grid of three-against-four and tom melodies that move around the kit in long, developing phrases rather than repeating bar to bar. Carey treats the toms as melodic instruments, using his rack and floor toms to answer the guitar figures while keeping the hi-hat and ride steady underneath. The genius of the part is restraint: he leaves enormous space, letting each accent ring before placing the next, so the groove feels meditative even at high technical difficulty. As the song builds, he gradually adds density — more bass-drum subdivisions, busier ride patterns, and longer tom runs that climax in the song\'s towering outro. Learning this groove is a masterclass in counting in nine while still feeling the downbeat, and in playing for the song instead of for the chops. Drummers studying Pneuma should focus first on internalising the 9/8 cycle by clapping and counting before ever sitting at the kit, then slowly adding limbs one at a time. The reward is an understanding of how Carey balances polyrhythmic complexity with deep, patient groove — the same approach that informs his work on Schism and Forty Six & 2. It is demanding, but few grooves teach odd-time independence and dynamic control as completely as this one. Spend time simply listening to how Carey breathes with the riff, and you will understand why this performance is held up as a modern benchmark for taste and technique in equal measure, a track every serious metal drummer eventually returns to study.',

    techniques: ['odd-time-signatures', 'polyrhythms', 'groove-drumming'],
    techniqueDetails: [
      'Count the full 9/8 cycle out loud (3+3+3) before adding any limbs',
      'Establish the steady ride-bell ostinato as your timekeeping anchor',
      'Layer the breathing kick pattern underneath, locking it to the riff cycle',
      'Add the melodic tom answers, moving around the kit in developing phrases',
      'Build dynamics gradually, leaving space between accents before the outro climax',
    ],

    tutorial: {
      youtubeId: '417-dhALb7E',
      startTime: 0,
      title: 'Danny Carey - Pneuma (Drum Cam)',
      description: 'Danny Carey performing Pneuma live, captured from the drum cam',
    },

    gearUsed: [
      { name: 'Sonor SQ2 Drum Kit', type: 'drums', link: null },
      { name: 'Paiste Signature Cymbals', type: 'cymbals', link: null },
      { name: 'DW 9000 Bass Drum Pedals', type: 'pedals', link: null },
    ],

    learningTips: [
      'Internalise the 9/8 pulse away from the kit first by clapping in groups of three',
      'Practice the ride ostinato alone until it is effortless',
      'Add the kick pattern slowly with a metronome at half tempo',
      'Prioritise space and dynamics over speed - this groove is about feel',
    ],

    seo: {
      title: 'Danny Carey Pneuma Groove - Tool Drum Tutorial | MetalForge',
      description: 'Learn Danny Carey\'s hypnotic 9/8 groove from Tool\'s Pneuma. Odd-time breakdown, tom melodies, gear, and practice tips.',
      keywords: ['danny carey', 'pneuma drums', 'tool drumming', 'odd time signature', 'fear inoculum', '9/8 groove'],
    },
  },

  'danny-carey-schism-intro': {
    slug: 'danny-carey-schism-intro',
    name: 'Schism Intro Pattern',
    shortName: 'Schism Intro',
    drummerId: 14,
    drummerName: 'Danny Carey',
    drummerSlug: 'danny-carey',
    band: 'Tool',
    song: 'Schism',
    album: 'Lateralus (2001)',

    category: 'intro-fill',
    style: 'progressive-metal',
    difficulty: 'expert',
    difficultyRating: 5,
    bpm: 134,
    bpmDisplay: '134 BPM',
    timeSignature: '5/8',

    description: 'Schism is famous for containing dozens of time-signature changes, and the drum part is the glue that makes that shifting landscape feel musical rather than chaotic. Danny Carey opens with a pattern rooted in alternating 5/8 and 7/8 groupings, locking tightly to Justin Chancellor\'s iconic bassline while leaving room for the vocal phrasing on top. Rather than counting every metric modulation as a separate event, Carey feels the larger phrase, riding subtle ghost notes and crisp hi-hat work that keep the pulse intact through each meter shift. The challenge for any drummer is to stop hearing the changes as obstacles and start hearing them as one continuous, breathing groove. Carey accomplishes this by anchoring the backbeat in consistent snare placement and using small, controlled fills to bridge the transitions between odd groupings, so the listener never loses the thread. As the song develops, the meters expand and contract repeatedly, and the famous middle section piles polyrhythmic accents over the established pulse, demanding total limb independence. This is one of the most studied drum parts in modern metal precisely because it teaches metric fluency: the ability to move between 5/8, 7/8, and other groupings without resetting your internal clock. Drummers approaching Schism should map the song section by section, counting each meter slowly before attempting to connect them at tempo. The payoff is enormous - mastering this part unlocks a deeper understanding of how Carey, like Mike Portnoy and Brann Dailor, turns complex time into something that grooves and feels inevitable. Practice the transitions in isolation, loop the trickiest bars, and keep the dynamics conversational rather than rigid. Played well, Schism does not sound like a math exercise; it sounds like one of the most hypnotic grooves in the Tool catalogue, which is exactly the point Carey is making. Stay patient with the count, trust the bassline as your reference, and the shifting meters will eventually feel as natural to play as a straight backbeat, which is the real goal of studying this iconic part.',

    techniques: ['odd-time-signatures', 'polyrhythms', 'fill-techniques'],
    techniqueDetails: [
      'Map the song section by section, counting each meter change slowly',
      'Lock the kick and snare to the bassline before adding ornamentation',
      'Feel the larger phrase rather than counting every metric modulation',
      'Use small controlled fills to bridge the 5/8 and 7/8 transitions',
      'Loop the polyrhythmic middle section to build limb independence',
    ],

    tutorial: {
      youtubeId: 'C6ff5fjhFAU',
      startTime: 0,
      title: 'Danny Carey (Tool) - Schism Drum Cam',
      description: 'Live drum-cam footage of Danny Carey playing Schism',
    },

    gearUsed: [
      { name: 'Sonor Designer Series Kit', type: 'drums', link: null },
      { name: 'Paiste Signature Cymbals', type: 'cymbals', link: null },
      { name: 'DW 9000 Bass Drum Pedals', type: 'pedals', link: null },
    ],

    learningTips: [
      'Count 5/8 and 7/8 groupings separately before connecting them',
      'Practice with the bassline so the meter changes feel anchored',
      'Slow the tempo to 60-70% until the transitions are seamless',
      'Treat the changes as one flowing groove, not separate events',
    ],

    seo: {
      title: 'Danny Carey Schism Intro - Tool Drum Tutorial | MetalForge',
      description: 'Master Danny Carey\'s shifting 5/8 and 7/8 intro from Tool\'s Schism. Time-change breakdown, technique, and practice tips.',
      keywords: ['danny carey', 'schism drums', 'tool drumming', 'odd time signature', 'lateralus', 'time changes'],
    },
  },

  'danny-carey-forty-six-and-2-outro': {
    slug: 'danny-carey-forty-six-and-2-outro',
    name: 'Forty Six & 2 Outro Solo',
    shortName: '46 & 2 Solo',
    drummerId: 14,
    drummerName: 'Danny Carey',
    drummerSlug: 'danny-carey',
    band: 'Tool',
    song: 'Forty Six & 2',
    album: 'Ænima (1996)',

    category: 'drum-solo',
    style: 'progressive-metal',
    difficulty: 'expert',
    difficultyRating: 5,
    bpm: 110,
    bpmDisplay: '110 BPM',
    timeSignature: '4/4',

    description: 'The climax of Forty Six & 2 is one of the most celebrated drum moments in progressive metal, a sprawling solo section where Danny Carey unleashes the full vocabulary of tom melodies, polyrhythmic fills, and tribal phrasing that became his signature. After the song builds through tense, restrained verses, Carey opens up into a cascading run around the kit that uses his deep toms melodically, weaving triplet and sextuplet groupings against the underlying 4/4 pulse so the fills feel like they float above the beat. This is the part that taught a generation of drummers how to think about the kit as a melodic instrument rather than just a timekeeper. The phrasing is conversational: Carey states an idea, develops it, and then answers it, building intensity through repetition and variation rather than sheer speed. Hand-foot combinations link the toms to the bass drum, creating long linear runs where no two limbs strike at once, which is why the section sounds so fluid and continuous. Underneath the flash, the groove never loses its center - the pulse stays rock solid, which is what allows the polyrhythmic ideas to land. For drummers, this outro is a complete study in tom orchestration, dynamic build, and the controlled use of odd groupings over a straight pulse. The best way to approach it is to break the section into individual fills, learn each one slowly, and only then attempt to connect them into the long developing phrase Carey plays. Pay attention to sticking and to which hand leads each tom run, because the orchestration is what gives the lines their melodic shape. Like his work on Pneuma and Schism, this solo rewards patience: practiced methodically, it builds independence, four-limb coordination, and the kind of musical phrasing that separates great metal drummers from merely fast ones. Take your time mapping the orchestration, record yourself often to check that the pulse stays steady underneath the flash, and treat the section as a long-term project rather than something to rush through in a single sitting.',

    techniques: ['fill-techniques', 'polyrhythms', 'groove-drumming'],
    techniqueDetails: [
      'Break the solo into individual fills and learn each one slowly',
      'Identify which hand leads each tom run to shape the melodic phrasing',
      'Layer triplet and sextuplet groupings over the steady 4/4 pulse',
      'Connect hand-foot combinations into flowing linear runs around the kit',
      'Build the section through repetition and variation, not raw speed',
    ],

    tutorial: {
      youtubeId: 'DhTKyuJkp9E',
      startTime: 0,
      title: 'Danny Carey - Forty Six & 2 Drum Solo Section',
      description: 'Breakdown of the Forty Six & 2 outro drum solo',
    },

    gearUsed: [
      { name: 'Sonor SQ2 Drum Kit', type: 'drums', link: null },
      { name: 'Paiste Signature Cymbals', type: 'cymbals', link: null },
      { name: 'DW 9000 Bass Drum Pedals', type: 'pedals', link: null },
    ],

    learningTips: [
      'Learn each fill in isolation before connecting the full phrase',
      'Practice tom orchestration slowly to lock in the melodic shape',
      'Keep the underlying pulse steady so the polyrhythms land cleanly',
      'Focus on smooth hand-foot linear runs rather than maximum speed',
    ],

    seo: {
      title: 'Danny Carey Forty Six & 2 Solo - Tool Drum Tutorial | MetalForge',
      description: 'Learn Danny Carey\'s legendary Forty Six & 2 outro drum solo. Tom melodies, polyrhythmic fills, gear, and practice tips.',
      keywords: ['danny carey', 'forty six and 2 drums', 'tool drum solo', 'tom melodies', 'aenima', 'polyrhythm drumming'],
    },
  },

  // ==========================================
  // GENE HOGLAN - Death (Issue #1013)
  // ==========================================
  'gene-hoglan-the-philosopher-groove': {
    slug: 'gene-hoglan-the-philosopher-groove',
    name: 'The Philosopher Groove',
    shortName: 'Philosopher Groove',
    drummerId: 3,
    drummerName: 'Gene Hoglan',
    drummerSlug: 'gene-hoglan',
    band: 'Death',
    song: 'The Philosopher',
    album: 'Individual Thought Patterns (1993)',

    category: 'main-groove',
    style: 'death-metal',
    difficulty: 'expert',
    difficultyRating: 5,
    bpm: 180,
    bpmDisplay: '180 BPM',
    timeSignature: '4/4',

    description: 'The Philosopher is a cornerstone of technical death metal drumming and one of Gene Hoglan\'s most studied performances, the track that earned him the nickname "The Atomic Clock." From the opening, Hoglan locks into a driving double-bass groove with machine-like consistency while the guitars cycle through Chuck Schuldiner\'s angular riffing. What sets the part apart is how Hoglan keeps the groove musical despite its speed: his bass-drum work is relentless but dynamically controlled, and he punctuates the riffs with crisp, perfectly placed snare accents and fills that follow the song\'s twisting structure. The verse grooves sit on continuous sixteenth-note double bass beneath a half-time snare feel, which gives the music its enormous weight, while the transitions are bridged by signature Hoglan fills that move smoothly across the toms. He famously recorded his parts with metronomic precision, and that consistency is the lesson here - the entire performance is an exercise in stamina, evenness between the feet, and the ability to play fast double bass without rushing or dragging the pulse. Drummers studying The Philosopher should begin by building double-bass endurance at a slower tempo, focusing on perfectly even strokes between left and right foot before approaching the recorded speed. The hands sit comfortably in a half-time pocket, so the real work is in the feet and in following the arrangement\'s frequent riff changes. This track is essential listening for understanding how Hoglan, alongside players like George Kollias and Dave Lombardo, built the modern double-bass vocabulary. Approach it methodically: loop the main verse groove, lock it to a metronome, and add the fills only once the feet are solid. Mastering it develops the kind of clock-like timing and lower-body control that underpins all extreme metal drumming, and it connects directly to Hoglan\'s later work on Crystal Mountain and Zero Tolerance. Keep your strokes relaxed, watch that the second kick never lags behind the first, and use short practice bursts to grow endurance safely, and over time the speed will arrive on its own without any loss of the precision that defines this classic performance.',

    techniques: ['double-bass', 'fill-techniques', 'groove-drumming'],
    techniqueDetails: [
      'Build double-bass endurance at a slower tempo with perfectly even strokes',
      'Establish the half-time snare feel over continuous sixteenth-note kick',
      'Lock the groove tightly to a metronome before adding speed',
      'Follow the riff changes, bridging sections with smooth tom fills',
      'Add the signature fills only once the feet are fully solid',
    ],

    tutorial: {
      youtubeId: 'eGope68pHf0',
      startTime: 0,
      title: 'Gene Hoglan - The Philosopher (Drum Playthrough)',
      description: 'Gene Hoglan performing The Philosopher by Death',
    },

    gearUsed: [
      { name: 'Pearl Drum Kit', type: 'drums', link: null },
      { name: 'Sabian Cymbals', type: 'cymbals', link: null },
      { name: 'Double Bass Pedals', type: 'pedals', link: null },
    ],

    learningTips: [
      'Develop even double-bass strokes before pushing the tempo',
      'Use a metronome religiously to maintain clock-like timing',
      'Keep the hands relaxed in the half-time pocket',
      'Take breaks - sustained fast double bass is physically demanding',
    ],

    seo: {
      title: 'Gene Hoglan The Philosopher - Death Drum Tutorial | MetalForge',
      description: 'Learn Gene Hoglan\'s driving double-bass groove from Death\'s The Philosopher. Technique breakdown, gear, and practice tips.',
      keywords: ['gene hoglan', 'the philosopher drums', 'death drumming', 'double bass', 'technical death metal', 'atomic clock'],
    },
  },

  'gene-hoglan-crystal-mountain-groove': {
    slug: 'gene-hoglan-crystal-mountain-groove',
    name: 'Crystal Mountain Groove',
    shortName: 'Crystal Mountain',
    drummerId: 3,
    drummerName: 'Gene Hoglan',
    drummerSlug: 'gene-hoglan',
    band: 'Death',
    song: 'Crystal Mountain',
    album: 'Symbolic (1995)',

    category: 'main-groove',
    style: 'death-metal',
    difficulty: 'expert',
    difficultyRating: 5,
    bpm: 200,
    bpmDisplay: '200 BPM',
    timeSignature: '4/4',

    description: 'Crystal Mountain, from Death\'s landmark Symbolic album, contains some of Gene Hoglan\'s most famous and most imitated drumming, including the celebrated double-ride groove and a fill that drummers have transcribed for decades. The song moves between propulsive double-bass-driven verses and more open, groove-oriented sections, and Hoglan navigates them with a combination of precision and creativity that defined the technical-yet-musical death metal sound. The signature element is his use of two ride cymbals to create a flowing, two-handed pattern that gives the groove a shimmering, almost jazz-influenced texture beneath the heavy riffing - a remarkably sophisticated idea for an extreme metal context. Underneath, his double bass remains tight and even, supporting the guitars without ever overpowering the arrangement. The famous fill near the song\'s climax is a masterclass in orchestration around the kit, a fast, melodic run that resolves perfectly back into the groove and has become a rite of passage for aspiring metal drummers. What makes Crystal Mountain so instructive is the balance it demands: you need the lower-body stamina for the double-bass sections, the coordination for the two-ride groove, and the precision to land the signature fills cleanly at tempo. Drummers should approach it in layers - first the double-bass verse groove, then the two-ride section practiced slowly to coordinate the hands, and finally the famous fill broken down note by note. Hoglan reportedly could play this part from memory years after recording it, a testament to how deeply internalised his vocabulary was. Studying Crystal Mountain alongside The Philosopher and Zero Tolerance gives a complete picture of how Hoglan shaped modern death metal drumming, blending raw power with the kind of creative, melodic thinking that most extreme players never attempt. It rewards patience and rewards listening as much as practice. Spend time with the original recording before touching the kit, hum the two-ride groove until it lives in your ear, and the famous fill will start to feel less like an obstacle and more like a natural extension of the song you already know.',

    techniques: ['double-bass', 'groove-drumming', 'fill-techniques'],
    techniqueDetails: [
      'Build the double-bass verse groove first with even, controlled strokes',
      'Practice the two-ride pattern slowly to coordinate both hands',
      'Break the famous climax fill down note by note before tempo',
      'Resolve each fill cleanly back into the main groove',
      'Layer the sections together only once each is solid in isolation',
    ],

    tutorial: {
      youtubeId: '3x7uvGofGbs',
      startTime: 0,
      title: 'Gene Hoglan - Crystal Mountain (Drum Cam)',
      description: 'Gene Hoglan performing Death\'s Crystal Mountain',
    },

    gearUsed: [
      { name: 'Pearl Drum Kit', type: 'drums', link: null },
      { name: 'Dual Ride Cymbal Setup', type: 'cymbals', link: null },
      { name: 'Double Bass Pedals', type: 'pedals', link: null },
    ],

    learningTips: [
      'Coordinate the two-ride groove at slow tempo before speeding up',
      'Develop double-bass stamina for the propulsive verse sections',
      'Transcribe and isolate the famous climax fill',
      'Listen closely to the recording to capture the feel between sections',
    ],

    seo: {
      title: 'Gene Hoglan Crystal Mountain - Death Drum Tutorial | MetalForge',
      description: 'Learn Gene Hoglan\'s legendary two-ride groove and signature fill from Death\'s Crystal Mountain. Breakdown, gear, and tips.',
      keywords: ['gene hoglan', 'crystal mountain drums', 'death drumming', 'double bass', 'symbolic album', 'two ride groove'],
    },
  },

  'gene-hoglan-zero-tolerance-groove': {
    slug: 'gene-hoglan-zero-tolerance-groove',
    name: 'Zero Tolerance Groove',
    shortName: 'Zero Tolerance',
    drummerId: 3,
    drummerName: 'Gene Hoglan',
    drummerSlug: 'gene-hoglan',
    band: 'Death',
    song: 'Zero Tolerance',
    album: 'Symbolic (1995)',

    category: 'main-groove',
    style: 'death-metal',
    difficulty: 'advanced',
    difficultyRating: 4,
    bpm: 190,
    bpmDisplay: '190 BPM',
    timeSignature: '4/4',

    description: 'Zero Tolerance, the opening track of Death\'s Symbolic, is a showcase for Gene Hoglan\'s ability to fuse raw aggression with inventive groove, and its bridge section in particular contains one of the most quoted drum patterns in death metal. The song launches with blistering blast-influenced sections and rapid double bass, then drops into a syncopated, almost danceable bridge groove that demonstrates Hoglan\'s rare gift for making technical death metal feel funky and alive. That bridge pattern - a tight interplay between snare, kick, and hi-hat with unexpected accents - is the part drummers most love to learn, because it grooves so hard while still sitting in an extreme metal arrangement. Throughout the track, Hoglan alternates between full-throttle double-bass attack and these more open, accent-driven grooves, using his fills to signal each transition with total clarity. The genius is in the contrast: the heaviness of the fast sections makes the bridge groove hit even harder, and Hoglan\'s impeccable timing keeps everything locked even as the feel shifts. For drummers, Zero Tolerance teaches both ends of the spectrum - the stamina and evenness needed for the double-bass passages, and the feel, syncopation, and accent control needed to make the bridge groove pocket correctly. Approach the song by separating these two worlds: drill the double-bass sections with a metronome for endurance and evenness, then learn the bridge groove slowly, paying close attention to where the accents fall and how the limbs interlock. Played well, that bridge will feel as good to play as it does to hear. Alongside The Philosopher and Crystal Mountain, Zero Tolerance rounds out the picture of why Hoglan is regarded as one of metal\'s most complete drummers, equally capable of overwhelming power and sophisticated, head-nodding groove within a single song. Drill the two feels apart, then practice switching between them at the exact moments the song does, and you will absorb not just the notes but the musical instinct that makes Hoglan such a compelling player to study and emulate.',

    techniques: ['double-bass', 'blast-beat', 'groove-drumming'],
    techniqueDetails: [
      'Separate the double-bass sections from the syncopated bridge groove',
      'Drill the fast double-bass passages with a metronome for evenness',
      'Learn the bridge groove slowly, mapping where each accent falls',
      'Lock the snare, kick, and hi-hat interplay so the bridge pockets',
      'Use clear fills to signal each transition between feels',
    ],

    tutorial: {
      youtubeId: '2JicEpsOgfI',
      startTime: 0,
      title: 'Death - Zero Tolerance Bridge Pattern (Gene Hoglan)',
      description: 'Breakdown of Gene Hoglan\'s Zero Tolerance bridge groove',
    },

    gearUsed: [
      { name: 'Pearl Drum Kit', type: 'drums', link: null },
      { name: 'Sabian Cymbals', type: 'cymbals', link: null },
      { name: 'Double Bass Pedals', type: 'pedals', link: null },
    ],

    learningTips: [
      'Practice the syncopated bridge groove slowly to lock the accents',
      'Build double-bass endurance separately with a metronome',
      'Focus on feel - the bridge should pocket and groove, not feel stiff',
      'Use fills to clearly mark the transitions between sections',
    ],

    seo: {
      title: 'Gene Hoglan Zero Tolerance - Death Drum Tutorial | MetalForge',
      description: 'Learn Gene Hoglan\'s syncopated bridge groove and double bass from Death\'s Zero Tolerance. Breakdown, gear, and practice tips.',
      keywords: ['gene hoglan', 'zero tolerance drums', 'death drumming', 'double bass', 'symbolic album', 'death metal groove'],
    },
  },

  // ==========================================
  // TOMAS HAAKE - Meshuggah (Issue #1013)
  // ==========================================
  'tomas-haake-bleed-groove': {
    slug: 'tomas-haake-bleed-groove',
    name: 'Bleed Double Bass Groove',
    shortName: 'Bleed Groove',
    drummerId: 5,
    drummerName: 'Tomas Haake',
    drummerSlug: 'tomas-haake',
    band: 'Meshuggah',
    song: 'Bleed',
    album: 'obZen (2008)',

    category: 'main-groove',
    style: 'djent',
    difficulty: 'expert',
    difficultyRating: 5,
    bpm: 116,
    bpmDisplay: '116 BPM',
    timeSignature: '4/4',

    description: 'Bleed is widely regarded as one of the most physically demanding drum parts in modern metal, and it cemented Tomas Haake\'s reputation as the master of relentless, machine-precise double bass. The song is built on a punishing sixteenth-note kick ostinato that pairs the feet with guitar-locked accents on the snare and cymbals, creating the hypnotic, mechanical groove that became a blueprint for the entire djent movement. What looks deceptively simple on paper is brutal in practice: the double-bass pattern runs almost continuously for the length of the song, demanding extraordinary stamina, perfectly even strokes, and total relaxation in the legs to avoid seizing up. Haake plays the part with surgical evenness, every kick stroke identical in volume and placement, while his hands punctuate the riff with precisely synchronised snare and cymbal hits that lock to the guitars\' rhythmic figures. The groove sits in a deceptively straight 4/4, but the phrasing of the accents over the constant kick creates the illusion of shifting time, which is central to Meshuggah\'s sound. For drummers, Bleed is the ultimate double-bass endurance and control study. The only way to build it is gradually: start the kick pattern at a fraction of the tempo, focus relentlessly on evenness and relaxation, and increase speed in small increments over weeks, never pushing into tension. The hands must lock perfectly with the feet, so practice the snare and cymbal accents against the kick at slow tempo until the synchronisation is automatic. This is a marathon, not a sprint - even seasoned professionals build up to full-tempo Bleed over time. Studying it develops the kind of lower-body endurance, evenness, and limb synchronisation that informs all of Haake\'s work, from Clockworks to New Millennium Cyanide Christ, and it remains a benchmark that drummers worldwide use to measure their double-bass technique. Be honest with yourself about tension, rest whenever your legs tighten, and add tempo only when every stroke stays perfectly even, because rushing this part is the surest way to build bad habits that are difficult to unlearn later.',

    techniques: ['double-bass', 'odd-time-signatures', 'polyrhythms'],
    techniqueDetails: [
      'Start the sixteenth-note kick ostinato at a fraction of full tempo',
      'Focus relentlessly on even strokes and relaxed, tension-free legs',
      'Synchronise the snare and cymbal accents tightly with the kick',
      'Increase the tempo in small increments over weeks, never forcing it',
      'Feel the constant 4/4 pulse beneath the shifting accent phrasing',
    ],

    tutorial: {
      youtubeId: 'bAJ1WTGNISk',
      startTime: 0,
      title: 'Meshuggah - Bleed - Tomas Haake Playthrough',
      description: 'Tomas Haake performing Bleed (Wincent Drumsticks playthrough)',
    },

    gearUsed: [
      { name: 'Sonor SQ2 Drum Kit', type: 'drums', link: null },
      { name: 'Sabian Cymbals', type: 'cymbals', link: null },
      { name: 'Axis Longboard Pedals', type: 'pedals', link: null },
    ],

    learningTips: [
      'Build the double-bass ostinato gradually over weeks, never rushing',
      'Keep the legs completely relaxed to sustain the constant sixteenths',
      'Lock the hand accents to the feet at slow tempo first',
      'Treat it as an endurance marathon, not a speed sprint',
    ],

    seo: {
      title: 'Tomas Haake Bleed Groove - Meshuggah Drum Tutorial | MetalForge',
      description: 'Master Tomas Haake\'s relentless double-bass groove from Meshuggah\'s Bleed. Endurance breakdown, gear, and practice tips.',
      keywords: ['tomas haake', 'bleed drums', 'meshuggah drumming', 'double bass', 'obzen album', 'djent groove'],
    },
  },

  'tomas-haake-clockworks-groove': {
    slug: 'tomas-haake-clockworks-groove',
    name: 'Clockworks Polymetric Groove',
    shortName: 'Clockworks',
    drummerId: 5,
    drummerName: 'Tomas Haake',
    drummerSlug: 'tomas-haake',
    band: 'Meshuggah',
    song: 'Clockworks',
    album: 'The Violent Sleep of Reason (2016)',

    category: 'main-groove',
    style: 'djent',
    difficulty: 'expert',
    difficultyRating: 5,
    bpm: 130,
    bpmDisplay: '130 BPM',
    timeSignature: '4/4',

    description: 'Clockworks, the opening track of The Violent Sleep of Reason, is a showcase of everything Tomas Haake brings to Meshuggah\'s mature sound: thunderous polymetric riffing, precise limb independence, and the signature illusion of shifting time over a steady underlying pulse. The drum part anchors the band\'s long, asymmetrical riff cycles by keeping a constant quarter-note or eighth-note reference - often on the ride or hi-hat - while the kick and snare follow the guitars\' odd-length groupings that repeatedly cross the barline before resolving back to the downbeat. This is the heart of the Meshuggah method: the time signature is technically 4/4, but the riffs are phrased in groupings that do not line up with it, so the music feels like it is constantly rotating until the cycle snaps back into place. Haake holds the listener\'s orientation by being the immovable anchor, his cymbal hand marking the true pulse while the rest of his body articulates the polymetric riff. Clockworks also features some of his most powerful double-bass work, locking the feet to the guitars with the evenness that has defined his playing for three decades. For drummers, this track is an advanced study in polymetric phrasing and independence - the ability to keep one limb on a steady grid while the others play a pattern that disagrees with it. The approach is to first identify the length of the riff grouping, count how many times it repeats before resolving, and then practice the steady cymbal pulse against the polymetric kick-and-snare pattern very slowly. Building this independence is challenging but transformative, and it connects directly to the language Haake established on Bleed and New Millennium Cyanide Christ. Mastering Clockworks gives drummers the tools to play with time itself, treating odd groupings as expressive rather than merely difficult. Loop the trickiest cycles until the resolution to beat one feels inevitable, keep your anchor limb absolutely steady, and you will gain an independence that transfers to almost any rhythmically adventurous music you choose to play afterwards.',

    techniques: ['polyrhythms', 'odd-time-signatures', 'double-bass'],
    techniqueDetails: [
      'Identify the length of each riff grouping and count its repetitions',
      'Hold a steady cymbal or hi-hat pulse as your timekeeping anchor',
      'Articulate the polymetric kick-and-snare pattern against that pulse',
      'Practice the independence very slowly before building tempo',
      'Track how the groupings cross the barline and resolve to the downbeat',
    ],

    tutorial: {
      youtubeId: 'axGn6qeJHcM',
      startTime: 0,
      title: 'Meshuggah - Clockworks (Drum Playthrough w/ Tomas Haake)',
      description: 'Official Tomas Haake drum playthrough of Clockworks',
    },

    gearUsed: [
      { name: 'Sonor SQ2 Drum Kit', type: 'drums', link: null },
      { name: 'Sabian Cymbals', type: 'cymbals', link: null },
      { name: 'Axis Longboard Pedals', type: 'pedals', link: null },
    ],

    learningTips: [
      'Keep one limb locked to the true pulse while the others play the riff',
      'Count the riff grouping length until you feel where it resolves',
      'Drill the polymetric independence at very slow tempo first',
      'Build double-bass evenness to match the guitar phrasing',
    ],

    seo: {
      title: 'Tomas Haake Clockworks - Meshuggah Drum Tutorial | MetalForge',
      description: 'Learn Tomas Haake\'s polymetric groove from Meshuggah\'s Clockworks. Independence breakdown, odd-time phrasing, gear, and tips.',
      keywords: ['tomas haake', 'clockworks drums', 'meshuggah drumming', 'polyrhythms', 'violent sleep of reason', 'polymetric groove'],
    },
  },

  'tomas-haake-new-millennium-cyanide-christ-groove': {
    slug: 'tomas-haake-new-millennium-cyanide-christ-groove',
    name: 'New Millennium Cyanide Christ Groove',
    shortName: 'NMCC Groove',
    drummerId: 5,
    drummerName: 'Tomas Haake',
    drummerSlug: 'tomas-haake',
    band: 'Meshuggah',
    song: 'New Millennium Cyanide Christ',
    album: 'Chaosphere (1998)',

    category: 'main-groove',
    style: 'djent',
    difficulty: 'expert',
    difficultyRating: 5,
    bpm: 120,
    bpmDisplay: '120 BPM',
    timeSignature: '4/4',

    description: 'New Millennium Cyanide Christ, from Meshuggah\'s ferocious Chaosphere album, is one of the earliest and clearest examples of the polymetric concept that would come to define an entire genre, and Tomas Haake\'s drumming is the engine that makes it work. The song is built on a riff that groups its accents in patterns that do not divide evenly into the 4/4 bar, so the music seems to lurch and rotate even though the underlying pulse never changes. Haake keeps that pulse unshakeable, typically holding a steady hand pattern while his kick and snare lock to the guitars\' displaced accents, letting the listener feel the tension between the stated meter and the phrased groupings. It is a track that sounds chaotic on first listen but reveals an iron internal logic once you find the downbeat and hear how every grouping eventually resolves to it. Haake\'s execution is characteristically precise and powerful, with the relaxed-but-relentless feel that makes Meshuggah grooves so hypnotic and heavy. For drummers, this song is an ideal introduction to polymetric playing because the concept is presented so starkly: a single repeating displaced figure against a constant pulse. The method for learning it is to count the bar in straight 4/4, clap or play the steady pulse, and then layer in the accented figure, noting how many repetitions it takes to come back around to beat one. Practiced slowly, it teaches the core independence skill of keeping time in one place while playing against it in another - the foundation of everything from Bleed to Clockworks. Studying New Millennium Cyanide Christ gives drummers a window into how Haake reshaped metal rhythm, turning displacement and odd groupings into groove rather than mere complexity, and it remains one of the most rewarding entry points into his vast rhythmic vocabulary. Once the displaced figure locks against your steady pulse, try counting out loud as you play to prove you have truly internalised the cycle, and that small test will confirm you are ready to tackle his more demanding later material.',

    techniques: ['polyrhythms', 'odd-time-signatures', 'groove-drumming'],
    techniqueDetails: [
      'Count the bar in straight 4/4 and establish the constant pulse',
      'Clap or play the steady pulse before adding the displaced accents',
      'Layer the accented riff figure against the unchanging pulse',
      'Count how many repetitions resolve the figure back to beat one',
      'Keep the feel relaxed and hypnotic rather than stiff or rushed',
    ],

    tutorial: {
      youtubeId: '4A_tSyJBsRQ',
      startTime: 0,
      title: 'Meshuggah - New Millennium Cyanide Christ (Official Video)',
      description: 'Tomas Haake drumming on New Millennium Cyanide Christ',
    },

    gearUsed: [
      { name: 'Sonor Drum Kit', type: 'drums', link: null },
      { name: 'Sabian Cymbals', type: 'cymbals', link: null },
      { name: 'Axis Longboard Pedals', type: 'pedals', link: null },
    ],

    learningTips: [
      'Find the downbeat first - everything resolves back to beat one',
      'Hold a steady hand pattern while the kick and snare displace',
      'Practice slowly to internalise the polymetric independence',
      'Use this track as your entry point into Meshuggah-style phrasing',
    ],

    seo: {
      title: 'Tomas Haake New Millennium Cyanide Christ - Meshuggah Drum Tutorial | MetalForge',
      description: 'Learn Tomas Haake\'s polymetric groove from Meshuggah\'s New Millennium Cyanide Christ. Displacement breakdown, gear, and tips.',
      keywords: ['tomas haake', 'new millennium cyanide christ drums', 'meshuggah drumming', 'polyrhythms', 'chaosphere', 'polymetric'],
    },
  },
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

  // ==========================================
  // BRANN DAILOR - Mastodon
  // ==========================================
  'brann-dailor-blood-and-thunder-groove': {
    slug: 'brann-dailor-blood-and-thunder-groove',
    name: 'Blood and Thunder Lead Groove',
    shortName: 'Blood and Thunder',
    drummerId: 16,
    drummerName: 'Brann Dailor',
    drummerSlug: 'brann-dailor',
    band: 'Mastodon',
    song: 'Blood and Thunder',
    album: 'Leviathan (2004)',

    category: 'signature-groove',
    style: 'progressive-metal',
    difficulty: 'advanced',
    difficultyRating: 4,
    bpm: 168,
    bpmDisplay: '~168 BPM',
    timeSignature: '4/4',

    description: "\"Blood and Thunder\" is the opening track of Mastodon's 2004 Moby-Dick concept record Leviathan, and it is the song that introduced most listeners to Brann Dailor's lead-from-the-front approach to metal drumming. Where most players would hold down a simple backbeat under the main riff, Dailor treats the kit like a melodic voice: instead of resting on the snare and ride, he peppers the verses with constant tom-and-snare commentary, answering the guitar phrases with rolling fills that tumble down and back up the kit. The result is a groove that never sits still yet never loses the song's relentless forward gallop. What makes the part instructive for developing drummers is the balance between drive and decoration — the kick keeps the riff's pulse locked while the hands ornament every spare sixteenth, so you learn to fill without ever stepping on the band's momentum. The verse groove relies on a busy ride and hi-hat pattern broken up by quick single-stroke bursts around the toms, while the chorus opens into wider, more anthemic accents that lock with the vocal. Played at roughly 168 BPM it demands both stamina and control: the hands have to stay relaxed enough to keep flowing for three minutes without tensing up, and the fills must land cleanly back on beat one every time so the riff snaps back into focus. Internalising even the first verse teaches you to think melodically around the kit, to phrase fills as musical answers rather than random flurries, and to keep a galloping pulse steady while your hands roam. It is the perfect entry point into Dailor's style and a masterclass in how a drummer can drive a metal song from the front rather than simply holding it down from behind. Spend time with it and you will start hearing every groove you play as an opportunity for melodic conversation rather than mere timekeeping, which is the single biggest mindset shift that separates good metal drummers from genuinely memorable ones.",

    techniques: ['groove-drumming', 'fill-techniques', 'linear-drumming'],
    techniqueDetails: [
      'Lock the galloping kick pattern to the main riff so the groove drives forward at a steady ~168 BPM',
      'Keep a busy but relaxed ride/hi-hat hand running underneath the verse so there is room to ornament',
      'Answer each guitar phrase with a short single-stroke fill that tumbles down and back up the toms',
      'Resolve every fill cleanly onto beat one so the riff snaps back into focus',
      'Open the chorus accents wider and lock them to the vocal phrasing for an anthemic lift',
    ],

    tutorial: {
      youtubeId: 'q8B4mSW5e88',
      startTime: 0,
      title: 'Brann Dailor (Mastodon) - Blood and Thunder',
      description: "Brann Dailor's drum playthrough of Blood and Thunder",
    },

    gearUsed: [
      { name: 'Tama Starclassic Kit', type: 'drums', link: null },
      { name: 'Meinl Cymbals', type: 'cymbals', link: null },
      { name: 'Tama Speed Cobra Pedals', type: 'pedals', link: null },
    ],

    learningTips: [
      'Practise the verse fills slowly so each single stroke is even before adding speed',
      'Keep your shoulders and wrists loose — this part is a three-minute endurance test',
      'Lock the kick to a metronome first, then layer the ornamentation on top',
      'Count to beat one out loud so every fill resolves back in time',
    ],

    seo: {
      title: 'Brann Dailor Blood and Thunder Groove - Mastodon Drum Tutorial | MetalForge',
      description: "Learn Brann Dailor's lead-from-the-front groove from Mastodon's Blood and Thunder. Video, technique breakdown, and practice tips.",
      keywords: ['brann dailor', 'blood and thunder drums', 'mastodon', 'leviathan album', 'metal drum fills', 'progressive metal drumming'],
    },
  },

  'brann-dailor-hearts-alive-fills': {
    slug: 'brann-dailor-hearts-alive-fills',
    name: 'Hearts Alive Melodic Fills',
    shortName: 'Hearts Alive',
    drummerId: 16,
    drummerName: 'Brann Dailor',
    drummerSlug: 'brann-dailor',
    band: 'Mastodon',
    song: 'Hearts Alive',
    album: 'Leviathan (2004)',

    category: 'signature-pattern',
    style: 'progressive-metal',
    difficulty: 'expert',
    difficultyRating: 5,
    bpm: 150,
    bpmDisplay: '~150 BPM',
    timeSignature: '4/4 (shifting)',

    description: "\"Hearts Alive\" is the thirteen-minute prog epic near the end of Mastodon's Leviathan, and it is where Brann Dailor's reputation as one of metal's most musical drummers was cemented. The track moves through a long sequence of riffs and feels, and rather than resetting to a plain backbeat at each new section Dailor narrates the journey with near-constant fills that function like a second lead instrument. His signature here is the way he weaves rolling sixteenth-note phrases between hands and feet across the whole kit, treating the toms as melodic pitches and the snare as punctuation, so the drumming sings the song's contour rather than merely keeping time. What makes the part such a rite of passage for ambitious players is the sheer density: there is almost no bar where the hands are simply marking the beat, yet the underlying pulse never wavers, because the kick and hi-hat foot keep an unshakeable reference while the upper-kit ornamentation roams freely on top. The middle sections drop into more spacious, melodic grooves before building back into a triumphant climax, demanding real dynamic control — Dailor pulls right back to let the guitars breathe, then surges forward with cascading fills as the song peaks. Learning even a single section teaches you to phrase fills musically, to maintain a rock-solid pulse while your hands are extremely busy, and to manage stamina and dynamics across a long-form composition rather than a three-minute single. It is also a study in restraint disguised as excess: every flurry is placed to answer the music, never just to show off. For drummers ready to graduate from grooves to genuinely compositional playing, \"Hearts Alive\" is one of the great modern proving grounds. Working through its sections in order also builds the mental endurance that long-form pieces require, training you to keep your focus and your time rock-solid from the first bar to the very last cymbal swell.",

    techniques: ['fill-techniques', 'groove-drumming', 'polyrhythms'],
    techniqueDetails: [
      'Keep the kick and hi-hat foot holding a steady pulse so the busy hands always have a reference',
      'Phrase the rolling sixteenth-note fills as melodies, moving across the toms like pitches',
      'Use the snare as punctuation between tom phrases rather than a constant backbeat',
      'Pull the dynamics right back in the spacious middle sections to let the guitars breathe',
      'Build cascading fills into the climax, surging forward without rushing the pulse',
    ],

    tutorial: {
      youtubeId: 'wNFyE2FlWjo',
      startTime: 0,
      title: 'Brann Dailor (Mastodon) - Hearts Alive (Drum Cam)',
      description: "Brann Dailor drum cam of Hearts Alive",
    },

    gearUsed: [
      { name: 'Tama Starclassic Kit', type: 'drums', link: null },
      { name: 'Meinl Cymbals', type: 'cymbals', link: null },
      { name: 'Tama Speed Cobra Pedals', type: 'pedals', link: null },
    ],

    learningTips: [
      'Break the song into sections and master each fill phrase one at a time',
      'Record yourself to check the pulse stays steady underneath the busy hands',
      'Practise the melodic tom phrases slowly so each note speaks clearly',
      'Work on dynamics — play the quiet sections genuinely quietly for contrast',
    ],

    seo: {
      title: 'Brann Dailor Hearts Alive Fills - Mastodon Drum Tutorial | MetalForge',
      description: "Learn Brann Dailor's melodic fills from Mastodon's prog epic Hearts Alive. Video, technique breakdown, and practice tips.",
      keywords: ['brann dailor', 'hearts alive drums', 'mastodon', 'leviathan album', 'melodic drum fills', 'progressive metal drumming'],
    },
  },

  'brann-dailor-ghost-of-karelia-groove': {
    slug: 'brann-dailor-ghost-of-karelia-groove',
    name: 'Ghost of Karelia Prog Groove',
    shortName: 'Ghost of Karelia',
    drummerId: 16,
    drummerName: 'Brann Dailor',
    drummerSlug: 'brann-dailor',
    band: 'Mastodon',
    song: 'Ghost of Karelia',
    album: 'Crack the Skye (2009)',

    category: 'signature-groove',
    style: 'progressive-metal',
    difficulty: 'advanced',
    difficultyRating: 4,
    bpm: 132,
    bpmDisplay: '~132 BPM',
    timeSignature: 'shifting (6/8 & 4/4)',

    description: "\"Ghost of Karelia\" comes from Mastodon's 2009 album Crack the Skye, the record where the band leaned fully into psychedelic prog, and it shows a more patient, hypnotic side of Brann Dailor's playing than the relentless gallop of the Leviathan era. The song breathes between a lilting compound-time feel and straighter four-four sections, and Dailor's job is to make those transitions feel seamless rather than jarring. Instead of hammering the listener, he rides the groove with a flowing, almost circular tom-and-cymbal pattern that emphasises the song's swirling, ocean-like atmosphere, then punctuates phrase endings with his trademark melodic fills. What is instructive here is the way he uses space: in the verses he holds back, locking a hypnotic pulse so the riff and vocal can dominate, and only opens up the fills when the arrangement calls for a lift. That restraint is harder than it looks for a drummer whose instinct is to fill every bar, and it is exactly the lesson developing players need — knowing when not to play is as important as knowing what to play. The shifting time signatures require you to feel the pulse in your body rather than count it bar by bar, so the groove stays relaxed instead of mathematical. The fills, when they come, still flow melodically across the toms in his signature style, but they serve the song's dreamlike arc rather than its aggression. Learning this part develops your sense of feel across compound and straight meters, your dynamic restraint, and your ability to transition between sections without telegraphing the change. It is a great study for any drummer who wants to understand how Dailor matured from a hyperactive young gun into a complete musical drummer capable of serving a long-form psychedelic concept record. More than any single fill, the lasting lesson here is patience: the confidence to leave space, trust the riff, and let the groove breathe until the moment a fill will actually mean something.",

    techniques: ['odd-time-signatures', 'fill-techniques', 'groove-drumming'],
    techniqueDetails: [
      'Feel the compound 6/8 sections in your body rather than counting them bar by bar',
      'Ride a flowing, circular tom-and-cymbal pattern to emphasise the swirling atmosphere',
      'Hold back in the verses so the riff and vocal can dominate the mix',
      'Smooth the 6/8-to-4/4 transitions so the pulse carries through without a jolt',
      'Save the melodic tom fills for phrase endings and section lifts, not every bar',
    ],

    tutorial: {
      youtubeId: 'wrbcr8hcb4c',
      startTime: 0,
      title: 'Mastodon - Ghost Of Karelia (Brann Dailor Drum Playthrough)',
      description: "Brann Dailor's drum playthrough of Ghost of Karelia",
    },

    gearUsed: [
      { name: 'Tama Starclassic Kit', type: 'drums', link: null },
      { name: 'Meinl Cymbals', type: 'cymbals', link: null },
      { name: 'Tama Speed Cobra Pedals', type: 'pedals', link: null },
    ],

    learningTips: [
      'Practise switching between 6/8 and 4/4 until the transitions feel automatic',
      'Work on playing the verses with genuine restraint before adding fills',
      'Keep the ride/tom pattern relaxed and circular rather than stiff',
      'Listen to the full song repeatedly so you internalise where the lifts belong',
    ],

    seo: {
      title: 'Brann Dailor Ghost of Karelia Groove - Mastodon Drum Tutorial | MetalForge',
      description: "Learn Brann Dailor's hypnotic prog groove from Mastodon's Ghost of Karelia. Video, technique breakdown, and practice tips.",
      keywords: ['brann dailor', 'ghost of karelia drums', 'mastodon', 'crack the skye', 'progressive metal drumming', 'odd time signatures'],
    },
  },

  // ==========================================
  // MIKE PORTNOY - Dream Theater
  // ==========================================
  'mike-portnoy-dance-of-eternity': {
    slug: 'mike-portnoy-dance-of-eternity',
    name: 'The Dance of Eternity',
    shortName: 'Dance of Eternity',
    drummerId: 13,
    drummerName: 'Mike Portnoy',
    drummerSlug: 'mike-portnoy',
    band: 'Dream Theater',
    song: 'The Dance of Eternity',
    album: 'Metropolis Pt. 2: Scenes from a Memory (1999)',

    category: 'signature-pattern',
    style: 'progressive-metal',
    difficulty: 'expert',
    difficultyRating: 5,
    bpm: 130,
    bpmDisplay: 'variable (~130 BPM core)',
    timeSignature: 'over 100 changes',

    description: "\"The Dance of Eternity\" from Dream Theater's 1999 concept album Metropolis Pt. 2: Scenes from a Memory is widely regarded as one of the most demanding pieces of drumming in progressive metal, and it is the track aspiring prog drummers point to when they talk about Mike Portnoy. In a little over six minutes the band runs through more than a hundred time-signature changes, lurching between meters such as 7/16, 15/8, 5/4 and straight 4/4 with almost no repetition, and Portnoy has to navigate every one of them while keeping the music feeling composed rather than chaotic. What makes his performance a masterclass is not just the technical execution but the phrasing: he treats each metric module as its own miniature groove, locking tightly with bassist John Myung and keyboardist Jordan Rudess so the listener feels the pulse even as it constantly mutates. The famous honky-tonk piano breakdown in the middle is a study in tasteful restraint, after which the band slams back into the metric gauntlet. For a developing drummer the value of studying this piece is enormous: it forces you to count and feel odd meters fluently, to transition between them without dropping the pulse, and to memorise long-form arrangements rather than relying on repetition. It also demands serious independence and double-bass control, because many sections layer fast kick patterns under syncopated hand figures. You do not learn \"The Dance of Eternity\" to play it at a gig so much as to rewire how you hear rhythm — after wrestling with it, ordinary odd-time passages start to feel natural. It remains the definitive benchmark for technical prog drumming and the clearest demonstration of why Portnoy is considered one of the most influential drummers of his generation. Even tackling a single page of the chart will sharpen your reading, your counting and your patience more than months of comfortable practice, which is exactly why so many serious drummers treat it as a personal milestone to conquer.",

    techniques: ['odd-time-signatures', 'fill-techniques', 'double-bass'],
    techniqueDetails: [
      'Treat each metric module (7/16, 15/8, 5/4, 4/4) as its own miniature groove and learn them one at a time',
      'Count or subdivide each section out loud until the transitions stop dropping the pulse',
      'Lock tightly with the bass and keyboard so the constantly shifting meter still feels grounded',
      'Build the double-bass independence needed to play fast kick patterns under syncopated hands',
      'Memorise the long-form arrangement rather than relying on repeated sections to find your place',
    ],

    tutorial: {
      youtubeId: 'TQiaK0Mc-38',
      startTime: 0,
      title: 'Mike Portnoy Plays THE DANCE OF ETERNITY on Drumeo',
      description: "Mike Portnoy plays The Dance of Eternity",
    },

    gearUsed: [
      { name: 'Tama Starclassic Kit', type: 'drums', link: null },
      { name: 'Sabian Cymbals', type: 'cymbals', link: null },
      { name: 'Tama Iron Cobra Pedals', type: 'pedals', link: null },
    ],

    learningTips: [
      'Drill each time signature in isolation before stringing the sections together',
      'Use a metronome that can subdivide odd meters to check your counting',
      'Practise the double-bass sections hands-and-feet separately first',
      'Be patient — this piece is learned over weeks, not in a single session',
    ],

    seo: {
      title: 'Mike Portnoy Dance of Eternity - Dream Theater Drum Tutorial | MetalForge',
      description: "Learn Mike Portnoy's legendary drumming on Dream Theater's The Dance of Eternity. Video, technique breakdown, and practice tips.",
      keywords: ['mike portnoy', 'dance of eternity drums', 'dream theater', 'scenes from a memory', 'odd time signatures', 'progressive metal drumming'],
    },
  },

  'mike-portnoy-pull-me-under-groove': {
    slug: 'mike-portnoy-pull-me-under-groove',
    name: 'Pull Me Under Groove & Fills',
    shortName: 'Pull Me Under',
    drummerId: 13,
    drummerName: 'Mike Portnoy',
    drummerSlug: 'mike-portnoy',
    band: 'Dream Theater',
    song: 'Pull Me Under',
    album: 'Images and Words (1992)',

    category: 'signature-groove',
    style: 'progressive-metal',
    difficulty: 'advanced',
    difficultyRating: 4,
    bpm: 130,
    bpmDisplay: '~130 BPM',
    timeSignature: '4/4 (with odd-meter sections)',

    description: "\"Pull Me Under\" is the song that put Dream Theater on the map, the breakout single from their 1992 album Images and Words, and Mike Portnoy himself has called it the track that opened every door for the band. For a piece that became their most recognisable radio moment, it is a surprisingly rich study in dynamic, song-serving drumming. Portnoy spends the verses laying down a patient, atmospheric groove, riding the toms and hi-hat with restraint so the vocal and clean guitar can carry the mood, then opens the kit up as the song builds toward its heavier choruses and the extended instrumental sections. What developing drummers learn from this part is the art of the build: he does not blast from the first bar but instead reserves his power, adding intensity and busier fills only as the arrangement climbs, so the payoff lands hard. The song also slips into odd-meter passages during the instrumental break, where Portnoy navigates the shifting subdivisions while keeping the groove locked with the rest of the band. His fills here are tasteful and melodic, often built from flowing tom phrases that signal section changes rather than gratuitous flurries. Because the tempo sits in a comfortable mid-range around 130 BPM, the technical demands are less about raw speed and more about feel, dynamics and arrangement awareness — which makes it an ideal entry point into Portnoy's catalogue for players not yet ready for \"The Dance of Eternity.\" Studying \"Pull Me Under\" teaches you to serve the song, to build intensity across an arrangement, and to drop tasteful fills that move the music forward. It is a reminder that even the most technical drummers earn their reputation first by playing musically. Master the way Portnoy holds back and then releases across this arrangement and you will carry that sense of pacing into every song you play, because knowing when to give the music room is a skill that never stops paying off.",

    techniques: ['groove-drumming', 'fill-techniques', 'odd-time-signatures'],
    techniqueDetails: [
      'Lay a patient, atmospheric tom-and-hi-hat groove in the verses with deliberate restraint',
      'Reserve your power — add intensity and busier fills only as the arrangement climbs',
      'Navigate the odd-meter instrumental sections while keeping the groove locked to the band',
      'Use flowing melodic tom fills to signal section changes rather than to show off',
      'Open the kit up into the choruses so the dynamic payoff lands hard',
    ],

    tutorial: {
      youtubeId: 'lKo-4rpWGSw',
      startTime: 0,
      title: 'The Iconic Drumming Behind "Pull Me Under" | Dream Theater',
      description: "Mike Portnoy breaks down and plays Pull Me Under",
    },

    gearUsed: [
      { name: 'Tama Starclassic Kit', type: 'drums', link: null },
      { name: 'Sabian Cymbals', type: 'cymbals', link: null },
      { name: 'Tama Iron Cobra Pedals', type: 'pedals', link: null },
    ],

    learningTips: [
      'Focus on dynamics — keep the verses genuinely restrained for contrast',
      'Map out where the song builds so your intensity rises with the arrangement',
      'Practise the odd-meter break slowly until the subdivisions feel natural',
      'Play along with the record to internalise the song-serving phrasing',
    ],

    seo: {
      title: 'Mike Portnoy Pull Me Under - Dream Theater Drum Tutorial | MetalForge',
      description: "Learn Mike Portnoy's dynamic groove and fills from Dream Theater's breakout hit Pull Me Under. Video, technique breakdown, and practice tips.",
      keywords: ['mike portnoy', 'pull me under drums', 'dream theater', 'images and words', 'progressive metal drumming', 'drum dynamics'],
    },
  },

  'mike-portnoy-panic-attack-double-bass': {
    slug: 'mike-portnoy-panic-attack-double-bass',
    name: 'Panic Attack Double Bass Assault',
    shortName: 'Panic Attack',
    drummerId: 13,
    drummerName: 'Mike Portnoy',
    drummerSlug: 'mike-portnoy',
    band: 'Dream Theater',
    song: 'Panic Attack',
    album: 'Octavarium (2005)',

    category: 'signature-pattern',
    style: 'progressive-metal',
    difficulty: 'expert',
    difficultyRating: 5,
    bpm: 175,
    bpmDisplay: '~175 BPM',
    timeSignature: '4/4 (with odd-meter riffs)',

    description: "\"Panic Attack\" from Dream Theater's 2005 album Octavarium opens with one of the most recognisable double-bass introductions in modern progressive metal, and it showcases the heavier, more aggressive side of Mike Portnoy's playing. The track begins with a relentless wall of sixteenth-note kick drums under a driving guitar riff, and Portnoy has to sustain that double-bass intensity while accenting the riff's rhythmic hits with his hands. It is a demanding feat of foot endurance and coordination: the legs have to keep a fast, even stream of notes flowing while the upper body locks in syncopated crashes and snare accents that punch alongside the guitar. As the song develops it moves through several riff-based sections, some in straight four and others in odd groupings, and Portnoy threads his powerful fills through the transitions to keep the momentum surging. What makes the part such a valuable study is the combination of stamina, precision and groove — fast double bass is easy to play sloppily, but here every kick note has to be even and articulate or the riff loses its menace. Developing drummers who tackle this song build serious foot technique, learning to keep the ankles relaxed so the pedals rebound naturally rather than fighting the beater, and to coordinate driving feet with accented hands. The tempo around 175 BPM leaves no room for tension, so it is also a lesson in playing fast while staying loose. Studying \"Panic Attack\" pushes your double-bass endurance, your hand-foot coordination and your ability to lock heavy accents to a riff at speed. It is the perfect counterpart to Portnoy's more cerebral odd-time epics, proving he can deliver pure aggressive power when the song demands it. If your double bass tends to fall apart at speed, this intro is the ideal diagnostic: get it sounding even and confident here and the technique will hold up across almost anything else in the metal repertoire.",

    techniques: ['double-bass', 'odd-time-signatures', 'fill-techniques'],
    techniqueDetails: [
      'Sustain an even stream of sixteenth-note double bass under the opening riff at tempo',
      'Lock syncopated crash and snare accents to the guitar hits with the hands while the feet keep driving',
      'Keep the ankles relaxed so the pedals rebound naturally rather than fighting the beater',
      'Thread powerful fills through the section transitions without dropping the double-bass momentum',
      'Stay loose at ~175 BPM — tension is the enemy of clean, fast feet',
    ],

    tutorial: {
      youtubeId: 'oa7oOdYPOSk',
      startTime: 0,
      title: 'Mike Portnoy Plays "Panic Attack" | Dream Theater',
      description: "Mike Portnoy plays Panic Attack",
    },

    gearUsed: [
      { name: 'Tama Starclassic Kit', type: 'drums', link: null },
      { name: 'Sabian Cymbals', type: 'cymbals', link: null },
      { name: 'Tama Iron Cobra Pedals', type: 'pedals', link: null },
    ],

    learningTips: [
      'Build double-bass endurance with long, slow, even foot exercises before tackling tempo',
      'Practise the hands and feet separately, then combine them slowly',
      'Use a metronome and only push the tempo when every kick note is even',
      'Take breaks — sustained fast double bass is physically demanding on the legs',
    ],

    seo: {
      title: 'Mike Portnoy Panic Attack Double Bass - Dream Theater Drum Tutorial | MetalForge',
      description: "Learn Mike Portnoy's relentless double-bass assault from Dream Theater's Panic Attack. Video, technique breakdown, and practice tips.",
      keywords: ['mike portnoy', 'panic attack drums', 'dream theater', 'octavarium album', 'double bass tutorial', 'progressive metal drumming'],
    },
  },

  // ==========================================
  // ELOY CASAGRANDE - Sepultura
  // ==========================================
  'eloy-casagrande-means-to-an-end-groove': {
    slug: 'eloy-casagrande-means-to-an-end-groove',
    name: 'Means To An End Groove',
    shortName: 'Means To An End',
    drummerId: 7,
    drummerName: 'Eloy Casagrande',
    drummerSlug: 'eloy-casagrande',
    band: 'Sepultura',
    song: 'Means To An End',
    album: 'Quadra (2020)',

    category: 'signature-groove',
    style: 'groove-metal',
    difficulty: 'advanced',
    difficultyRating: 4,
    bpm: 160,
    bpmDisplay: '~160 BPM',
    timeSignature: '4/4',

    description: "\"Means To An End\" is one of the standout singles from Sepultura's 2020 album Quadra, and the drum cam Eloy Casagrande released for it became a viral demonstration of modern groove-metal drumming. Casagrande, who later joined Slipknot, built his reputation on a rare combination of brute power and surgical precision, and this track puts both on display. The groove is anchored by a driving mid-tempo riff, and rather than simply backing it Casagrande locks his kick drum tightly to the guitar's rhythmic accents, creating that signature Sepultura sense of two instruments moving as one. Over the top he layers crisp, controlled fills and tasteful double-bass runs that fill the gaps without cluttering the pocket. What makes the part instructive is the discipline behind the flash: even his fastest figures are played with even dynamics and immaculate timing, so the groove never loses its weight. The verses sit in a tight pocket that demands relaxed wrists and a strong backbeat, while the heavier sections open into bursts of double bass and syncopated accents that lock the whole band together. For developing drummers the lesson is in marrying power with control — Casagrande hits hard but never sacrifices timing or evenness, which is exactly what separates a great groove-metal drummer from a merely loud one. Studying this song builds your ability to lock kick patterns to a riff, to drop clean fills inside a tight pocket, and to deploy double bass as an accent rather than a constant. It is a perfect modern example of how the Sepultura groove tradition has evolved, and a showcase of why Casagrande is considered one of the most exciting metal drummers of his generation. The biggest takeaway is that controlled power always reads as heavier than uncontrolled speed, so chasing evenness and timing here will make every groove you play hit noticeably harder.",

    techniques: ['double-bass', 'groove-drumming', 'fill-techniques'],
    techniqueDetails: [
      'Lock the kick drum tightly to the guitar riff so drums and guitar move as one',
      'Hold a tight verse pocket with relaxed wrists and a strong, consistent backbeat',
      'Drop clean, evenly-played fills into the gaps without cluttering the groove',
      'Deploy double-bass bursts as accents in the heavier sections rather than running them constantly',
      'Keep every fast figure even in dynamics so the groove never loses its weight',
    ],

    tutorial: {
      youtubeId: 'dQe3EwkPcFU',
      startTime: 0,
      title: '[Drum Cam] Eloy Casagrande - Means To An End (Sepultura)',
      description: "Eloy Casagrande drum cam of Means To An End",
    },

    gearUsed: [
      { name: 'Tama Starclassic Kit', type: 'drums', link: null },
      { name: 'Paiste Cymbals', type: 'cymbals', link: null },
      { name: 'Tama Speed Cobra Pedals', type: 'pedals', link: null },
    ],

    learningTips: [
      'Practise locking the kick to a riff with a metronome before adding fills',
      'Keep your wrists loose so the backbeat stays powerful but relaxed',
      'Work double-bass bursts slowly for evenness before using them as accents',
      'Record yourself to confirm the pocket stays tight under the busier figures',
    ],

    seo: {
      title: 'Eloy Casagrande Means To An End Groove - Sepultura Drum Tutorial | MetalForge',
      description: "Learn Eloy Casagrande's powerful groove from Sepultura's Means To An End. Video, technique breakdown, and practice tips.",
      keywords: ['eloy casagrande', 'means to an end drums', 'sepultura', 'quadra album', 'groove metal drumming', 'double bass tutorial'],
    },
  },

  'eloy-casagrande-isolation-blast': {
    slug: 'eloy-casagrande-isolation-blast',
    name: 'Isolation Blast & Double Bass',
    shortName: 'Isolation',
    drummerId: 7,
    drummerName: 'Eloy Casagrande',
    drummerSlug: 'eloy-casagrande',
    band: 'Sepultura',
    song: 'Isolation',
    album: 'Quadra (2020)',

    category: 'blast-section',
    style: 'groove-metal',
    difficulty: 'expert',
    difficultyRating: 5,
    bpm: 190,
    bpmDisplay: '~190 BPM',
    timeSignature: '4/4',

    description: "\"Isolation,\" another highlight from Sepultura's 2020 record Quadra, is the song Eloy Casagrande uses to show off the extreme-metal end of his vocabulary, and the official drum cam for it is a clinic in controlled aggression. Where \"Means To An End\" lives in a mid-tempo pocket, \"Isolation\" pushes into faster, more violent territory, blending blast-beat sections with relentless double bass and the tight, riff-locked grooves that define Sepultura. Casagrande moves fluidly between these gears: one moment he is riding a thrash-style groove with the kick glued to the guitar, the next he drops into a blast section where hands and feet interlock at high speed, then he surges out with a double-bass run that drives the band forward. What makes this such a valuable study is the transitions — the hardest part of extreme metal is not any single pattern but moving cleanly between feels without dropping tempo or letting the dynamics collapse. His blast beats are notably even and articulate, never a smeared wash, and his double bass stays clean even at speed because he keeps his legs relaxed and lets the pedals do the work. For developing drummers the song builds blast-beat coordination, double-bass stamina, and the ability to switch between groove and extreme feels mid-song while staying locked to the band. It also teaches articulation under pressure: at roughly 190 BPM there is no room for tension, so every limb has to stay loose and precise. Studying \"Isolation\" rounds out the picture of Casagrande as a complete modern metal drummer — equally at home in a heavy pocket or a full-throttle blast — and explains why bands at the very top of the genre have sought him out. Treat the gear changes as their own practice exercise, looping just the bars on either side of each transition, and the whole song will quickly feel less like a sprint and more like a series of grooves you can actually breathe through.",

    techniques: ['blast-beat', 'double-bass', 'groove-drumming'],
    techniqueDetails: [
      'Interlock hands and feet cleanly in the blast sections so the beat stays articulate, not a smeared wash',
      'Keep the double-bass runs even by staying relaxed and letting the pedals rebound',
      'Glue the kick to the guitar in the thrash-style groove sections',
      'Practise the transitions between groove, blast and double-bass feels without dropping tempo',
      'Stay loose at ~190 BPM so dynamics hold up under the speed',
    ],

    tutorial: {
      youtubeId: 'MyXvmX0BXlM',
      startTime: 0,
      title: '[Drum Cam] Eloy Casagrande - Isolation (Sepultura)',
      description: "Eloy Casagrande drum cam of Isolation",
    },

    gearUsed: [
      { name: 'Tama Starclassic Kit', type: 'drums', link: null },
      { name: 'Paiste Cymbals', type: 'cymbals', link: null },
      { name: 'Tama Speed Cobra Pedals', type: 'pedals', link: null },
    ],

    learningTips: [
      'Drill blast-beat coordination slowly until hands and feet interlock cleanly',
      'Build double-bass stamina with long even runs before pushing the tempo',
      'Practise the feel transitions in isolation so they stay tight in the full song',
      'Keep every limb relaxed at speed — tension kills both speed and articulation',
    ],

    seo: {
      title: 'Eloy Casagrande Isolation Blast - Sepultura Drum Tutorial | MetalForge',
      description: "Learn Eloy Casagrande's blast beats and double bass from Sepultura's Isolation. Video, technique breakdown, and practice tips.",
      keywords: ['eloy casagrande', 'isolation drums', 'sepultura', 'quadra album', 'blast beat tutorial', 'extreme metal drumming'],
    },
  },

  'eloy-casagrande-arise-double-bass': {
    slug: 'eloy-casagrande-arise-double-bass',
    name: 'Arise Double Bass Drive',
    shortName: 'Arise',
    drummerId: 7,
    drummerName: 'Eloy Casagrande',
    drummerSlug: 'eloy-casagrande',
    band: 'Sepultura',
    song: 'Arise',
    album: 'Arise (1991)',

    category: 'signature-groove',
    style: 'thrash-metal',
    difficulty: 'advanced',
    difficultyRating: 4,
    bpm: 180,
    bpmDisplay: '~180 BPM',
    timeSignature: '4/4',

    description: "\"Arise\" is the title track of Sepultura's classic 1991 thrash record, originally drummed by Igor Cavalera, and when Eloy Casagrande recorded his playthrough of it he was both honouring that legacy and stamping it with his own precision. The song is a thrash-metal benchmark: a driving, mid-to-fast tempo built on a half-time chorus groove and verses that lean into double bass and tight, riff-locked snare work. Casagrande's reading of it is a lesson in how a modern player can respect a classic part while elevating its execution — his timing is razor-sharp, his double bass is cleaner and more even than the era's recordings allowed, and his grooves sit perfectly in the pocket. The iconic half-time chorus, where the snare lands heavy on beat three over a churning riff, is one of thrash's great head-bang moments, and learning to make it feel as massive as Casagrande does is all about commitment and backbeat strength. The verses move into faster double-bass-driven patterns that demand both stamina and articulation. What developing drummers gain from studying this track is a foundation in thrash drumming: the half-time-to-double-time feel changes, the locked kick-and-riff relationship, and the disciplined double bass that powers the genre. Because the song is a relatively straightforward 4/4, the challenge is less about complexity and more about feel, power and consistency over a sustained run. Studying \"Arise\" builds your thrash vocabulary, your double-bass endurance, and your sense of how to make a heavy groove feel genuinely heavy through dynamics and commitment rather than speed alone. It is a rite of passage for any metal drummer and a chance to learn from how a top modern player approaches a foundational classic. Comparing Casagrande's reading against Igor Cavalera's original is a lesson in itself, showing how the same iconic part can be honoured note-for-note while still being sharpened by decades of evolved technique and recording clarity.",

    techniques: ['double-bass', 'groove-drumming', 'fill-techniques'],
    techniqueDetails: [
      'Commit fully to the half-time chorus, landing a heavy snare on beat three over the riff',
      'Drive the verses with clean, even double-bass patterns locked to the guitar',
      'Nail the half-time-to-double-time feel changes so each section hits with the right weight',
      'Build double-bass endurance to sustain the drive through the full song at ~180 BPM',
      'Use power and dynamics, not just speed, to make the groove feel genuinely heavy',
    ],

    tutorial: {
      youtubeId: 'ZRSM24T9iVI',
      startTime: 0,
      title: 'ARISE - SEPULTURA (DRUM PLAYTHROUGH)',
      description: "Eloy Casagrande drum playthrough of Arise",
    },

    gearUsed: [
      { name: 'Tama Starclassic Kit', type: 'drums', link: null },
      { name: 'Paiste Cymbals', type: 'cymbals', link: null },
      { name: 'Tama Speed Cobra Pedals', type: 'pedals', link: null },
    ],

    learningTips: [
      'Practise the half-time chorus with full commitment so the backbeat feels massive',
      'Work the double-bass verses slowly for evenness before reaching full tempo',
      'Drill the feel changes between half-time and double-time sections',
      'Play along with both the original and the playthrough to compare feel and execution',
    ],

    seo: {
      title: 'Eloy Casagrande Arise Double Bass - Sepultura Drum Tutorial | MetalForge',
      description: "Learn the thrash drive of Sepultura's Arise through Eloy Casagrande's playthrough. Video, technique breakdown, and practice tips.",
      keywords: ['eloy casagrande', 'arise drums', 'sepultura', 'arise album', 'thrash metal drumming', 'double bass tutorial'],
    },
  },

  // ==========================================
  // MATT HALPERN - Periphery (#1047, split 1/4 of #1044)
  // ==========================================
  'matt-halpern-icarus-lives-groove': {
    slug: 'matt-halpern-icarus-lives-groove',
    name: 'Icarus Lives! Djent Groove',
    shortName: 'Icarus Lives',
    drummerId: 18,
    drummerName: 'Matt Halpern',
    drummerSlug: 'matt-halpern',
    band: 'Periphery',
    song: 'Icarus Lives!',
    album: 'Periphery (2010)',

    category: 'main-groove',
    style: 'djent',
    difficulty: 'expert',
    difficultyRating: 5,
    bpm: 170,
    bpmDisplay: '~170 BPM',
    timeSignature: '4/4 (syncopated, polymetric accents)',

    description: "\"Icarus Lives!\" is the explosive opening statement of Periphery's 2010 self-titled debut, and Matt Halpern's drumming on it became a blueprint for the entire djent movement. From the first bar the track throws polymetric guitar riffing, sudden stops and lurching syncopation at the listener, and Halpern anchors all of it with a groove that is simultaneously machine-tight and genuinely musical. What makes his approach so influential is the way he treats the kick drum as a melodic, riff-locked voice: rather than blasting continuously, he places fast double-bass bursts precisely where Misha Mansoor's seven-string riff lands, so the drums and guitars read as a single rhythmic organism. Between those locked sections he opens up with crisp ghost-note grooves, tight hat work and fills that decorate the phrase without ever blurring the pulse. The song demands extreme limb independence, the discipline to count odd groupings against a steady backbeat, and the control to switch from delicate to devastating in a single bar. For drummers, \"Icarus Lives!\" is the definitive study in modern progressive-metal feel: it teaches you to read a riff rhythmically, to lock your feet to staccato guitar accents, and to keep beat one rock-solid while the band deliberately tries to disorient you. Learning even the main groove builds double-bass accuracy, syncopation reading and the kind of dynamic control that separates djent drumming from generic metal. It also rewards patience — the part sits comfortably under the hands once the polymetric accents are internalised, yet stays deep enough to keep teaching you about pocket and precision for months. Because Halpern has demonstrated the song in clinic and masterclass settings, the orchestration and sticking are well documented, making it an accessible deep-dive for intermediate and advanced players who want to understand how the genre's rhythmic language actually works on the kit. It remains one of the most important reference tracks in 21st-century metal drumming.",

    techniques: ['groove-drumming', 'double-bass', 'fill-techniques'],
    techniqueDetails: [
      'Lock fast double-bass bursts to the staccato guitar riff so kick and guitar read as one voice',
      'Hold a steady backbeat and a clear sense of beat one through the polymetric accents',
      'Drop into crisp ghost-note grooves between the riff-locked sections',
      'Count the odd groupings against the pulse until the syncopation feels automatic',
      'Switch between delicate and devastating dynamics within a single bar',
    ],

    tutorial: {
      youtubeId: 'WjObrWs84iM',
      startTime: 0,
      title: 'Icarus Lives - Periphery (Matt Halpern Masterclass, Drums/Bass)',
      description: "Matt Halpern's masterclass breakdown of the Icarus Lives drum part",
    },

    gearUsed: [
      { name: 'Mapex Saturn V MH Exotic Kit', type: 'drums', link: null },
      { name: 'Meinl Byzance Cymbals', type: 'cymbals', link: null },
      { name: 'Mapex Falcon Double Pedal', type: 'pedals', link: null },
    ],

    learningTips: [
      'Tap the guitar riff first so you know exactly where each kick accent lands',
      'Build double-bass speed and evenness slowly with a metronome before full tempo',
      'Practise the polymetric sections in isolation, counting out loud',
      'Keep the backbeat strong so the groove never loses its centre',
    ],

    seo: {
      title: 'Matt Halpern Icarus Lives - Periphery Drum Tutorial | MetalForge',
      description: "Learn Matt Halpern's genre-defining djent groove from Periphery's Icarus Lives. Video masterclass, technique breakdown, and practice tips.",
      keywords: ['matt halpern', 'icarus lives drums', 'periphery', 'djent drumming', 'double bass tutorial', 'progressive metal drums'],
    },
  },

  'matt-halpern-marigold-groove': {
    slug: 'matt-halpern-marigold-groove',
    name: 'Marigold Melodic Groove',
    shortName: 'Marigold',
    drummerId: 18,
    drummerName: 'Matt Halpern',
    drummerSlug: 'matt-halpern',
    band: 'Periphery',
    song: 'Marigold',
    album: 'Periphery III: Select Difficulty (2016)',

    category: 'main-groove',
    style: 'progressive-metal',
    difficulty: 'advanced',
    difficultyRating: 4,
    bpm: 150,
    bpmDisplay: '~150 BPM',
    timeSignature: '4/4 (dynamic, song-driven)',

    description: "\"Marigold\" from Periphery's 2016 album Periphery III: Select Difficulty shows the more melodic, song-serving side of Matt Halpern's playing while keeping the rhythmic sophistication that made him famous. Where much of Periphery's catalogue is built on aggression and polymetric chaos, \"Marigold\" is comparatively open and emotive, and Halpern fills that space with taste rather than density. His groove rides a relaxed but precise pocket, leaning on tasteful ghost notes, controlled cymbal work and dynamic swells that follow the song's rising and falling intensity. The track is a masterclass in restraint: he leaves room for the melody, then re-engages with smooth double-bass figures and inventive fills exactly when the arrangement calls for a lift. What is most instructive is how he shapes the song's emotional arc with dynamics — pulling back to a simple, breathing groove under the verses and opening up the full kit as the choruses swell, never overplaying. The part demands strong time, a refined touch, and the musical judgement to know when to add and when to subtract, which for many technical drummers is harder than raw speed. For students, \"Marigold\" is a great study in playing for the song: it develops dynamic control, ghost-note vocabulary, smooth double-bass phrasing and the arranging instinct to support a vocal rather than compete with it. Learning it teaches you that groove and feel can be just as impressive as flash, and that the spaces you leave are as important as the notes you play. Because Halpern recorded a clean, well-lit playthrough of the track, the orchestration, stickings and dynamic choices are easy to study in detail, making it an accessible and rewarding deep-dive for intermediate players ready to move beyond chops into musicality. It is one of the clearest examples of how a modern progressive drummer can be both technical and deeply tasteful at once.",

    techniques: ['groove-drumming', 'double-bass', 'fill-techniques'],
    techniqueDetails: [
      'Ride a relaxed, precise pocket and leave space for the melody',
      'Decorate the groove with tasteful ghost notes rather than constant fills',
      'Use dynamic swells to follow the song from quiet verses to full choruses',
      'Re-engage smooth double-bass figures exactly when the arrangement lifts',
      'Shape the emotional arc with restraint, adding and subtracting deliberately',
    ],

    tutorial: {
      youtubeId: 'DAOcYC2uEJk',
      startTime: 0,
      title: 'Periphery - Marigold (Matt Halpern Drum Playthrough)',
      description: "Matt Halpern's official drum playthrough of Marigold",
    },

    gearUsed: [
      { name: 'Mapex Saturn V MH Exotic Kit', type: 'drums', link: null },
      { name: 'Meinl Byzance Cymbals', type: 'cymbals', link: null },
      { name: 'Mapex Falcon Double Pedal', type: 'pedals', link: null },
    ],

    learningTips: [
      'Practise the verse groove quietly to master the ghost-note touch',
      'Map the dynamic build into each chorus and rehearse the transitions',
      'Keep double-bass figures smooth and even rather than aggressive',
      'Follow the official playthrough to copy the dynamic phrasing',
    ],

    seo: {
      title: 'Matt Halpern Marigold - Periphery Drum Tutorial | MetalForge',
      description: "Learn Matt Halpern's melodic, dynamic groove from Periphery's Marigold. Video playthrough, technique breakdown, and practice tips.",
      keywords: ['matt halpern', 'marigold drums', 'periphery', 'progressive metal drumming', 'dynamic drumming', 'select difficulty'],
    },
  },

  'matt-halpern-the-bad-thing-groove': {
    slug: 'matt-halpern-the-bad-thing-groove',
    name: 'The Bad Thing Double-Bass Assault',
    shortName: 'The Bad Thing',
    drummerId: 18,
    drummerName: 'Matt Halpern',
    drummerSlug: 'matt-halpern',
    band: 'Periphery',
    song: 'The Bad Thing',
    album: 'Juggernaut: Alpha (2015)',

    category: 'signature-pattern',
    style: 'djent',
    difficulty: 'expert',
    difficultyRating: 5,
    bpm: 180,
    bpmDisplay: '~180 BPM',
    timeSignature: '4/4 (shifting groupings, half-time breakdowns)',

    description: "\"The Bad Thing\" from Periphery's 2015 album Juggernaut: Alpha is one of Matt Halpern's most relentless and technically demanding performances, a track that fuses the band's djent foundations with thrash-like aggression and intricate rhythmic detail. From the outset it is a barrage of fast double-bass, jagged syncopation and abrupt metric shifts, and Halpern executes all of it with the surgical precision and physical power that define his style. The song's signature challenge is sustained kick-drum endurance married to constant riff-locking: the feet have to stay even and fast for long stretches while the hands track the guitars' stop-start phrasing and punctuate it with sharp accents. Unlike a straightforward speed workout, \"The Bad Thing\" keeps changing — sections lurch into new groupings, breakdowns drop into half-time, and fills erupt and resolve in tight, deliberate bursts — so a player has to stay mentally locked to the arrangement, never coasting on autopilot. What makes Halpern's approach so instructive is that even at full intensity the groove never sounds frantic; every note is placed, the dynamics are controlled, and the pocket holds firm beneath the chaos. For drummers, this is a high-level study in double-bass stamina, syncopation reading and the coordination required to track a deliberately disorienting riff while keeping beat one secure. Learning it builds raw foot speed and evenness, the discipline to follow complex arrangements, and the precision to make aggressive playing sound tight rather than sloppy. It is a demanding piece that rewards slow, methodical practice — breaking the metric shifts into small chunks and building tempo gradually is the only sustainable path through it. Because Halpern filmed a clear drum playthrough of the song, the stickings, foot patterns and section transitions are documented in detail, giving advanced players a reliable map for one of modern metal's most punishing grooves. It is a benchmark for anyone chasing serious djent and progressive-metal chops.",

    techniques: ['double-bass', 'groove-drumming', 'fill-techniques'],
    techniqueDetails: [
      'Hold fast, even double-bass through long, demanding stretches',
      'Track the guitars stop-start phrasing and punctuate it with sharp accents',
      'Navigate the abrupt metric shifts without losing beat one',
      'Drop cleanly into the half-time breakdowns and back into double-time',
      'Place every fill deliberately and resolve it tight on the beat',
    ],

    tutorial: {
      youtubeId: '8dfZo-zmNaU',
      startTime: 0,
      title: "Matt Halpern - Periphery - 'The Bad Thing' Drum Playthrough",
      description: "Matt Halpern's drum playthrough of The Bad Thing",
    },

    gearUsed: [
      { name: 'Mapex Saturn V MH Exotic Kit', type: 'drums', link: null },
      { name: 'Meinl Byzance Cymbals', type: 'cymbals', link: null },
      { name: 'Mapex Falcon Double Pedal', type: 'pedals', link: null },
    ],

    learningTips: [
      'Break the metric shifts into small chunks and master each before linking them',
      'Build double-bass stamina gradually with a metronome, well below tempo first',
      'Tap the riff to internalise the stop-start phrasing before playing along',
      'Use the playthrough to map the foot patterns and section transitions',
    ],

    seo: {
      title: 'Matt Halpern The Bad Thing - Periphery Drum Tutorial | MetalForge',
      description: "Learn Matt Halpern's punishing double-bass groove from Periphery's The Bad Thing. Video playthrough, technique breakdown, and practice tips.",
      keywords: ['matt halpern', 'the bad thing drums', 'periphery', 'djent drumming', 'double bass tutorial', 'juggernaut alpha'],
    },
  },

  // ==========================================
  // VINNIE PAUL - Pantera (#1047, split 1/4 of #1044)
  // ==========================================
  'vinnie-paul-walk-groove': {
    slug: 'vinnie-paul-walk-groove',
    name: 'Walk Half-Time Groove',
    shortName: 'Walk',
    drummerId: 11,
    drummerName: 'Vinnie Paul',
    drummerSlug: 'vinnie-paul',
    band: 'Pantera',
    song: 'Walk',
    album: 'Vulgar Display of Power (1992)',

    category: 'main-groove',
    style: 'groove-metal',
    difficulty: 'intermediate',
    difficultyRating: 3,
    bpm: 115,
    bpmDisplay: '~115 BPM',
    timeSignature: '4/4 (swung half-time feel)',

    description: "\"Walk\" from Pantera's 1992 album Vulgar Display of Power is one of the most recognisable grooves in all of heavy metal, and Vinnie Paul's drumming is the reason it hits so hard. The song rides a swaggering, mid-tempo half-time feel built on a deceptively simple but monstrously heavy backbeat, and Paul's genius lies in how much weight and attitude he wrings out of a relatively sparse part. The famous riff sits in an unusual rhythmic grouping, and rather than fight it, Paul lays down a rock-solid, swung pocket that lets the guitar stagger across the beat while the drums hold the listener firmly in place. His snare is enormous and perfectly placed, his hi-hat work is tight and controlled, and his fills are economical — short, punchy and always serving the groove rather than showing off. That sense of restraint and pocket is exactly what makes \"Walk\" such an important study: it proves that feel, timing and tone can be more devastating than speed or complexity. For drummers, this track is a foundational lesson in groove-metal drumming: locking a heavy half-time feel, placing a backbeat with maximum authority, and using space and dynamics to create menace. Learning it develops your pocket, your sense of swing and your ability to make a simple part feel huge — skills that translate to every style of music. It also teaches the discipline of playing for the song: the temptation to add fills is constant, but the power of \"Walk\" comes from how little Paul plays and how perfectly he places it. Because the part is approachable in difficulty yet endlessly deep in feel, it is an ideal track for intermediate players working on groove and time, while still rewarding seasoned drummers who study how Paul generated such crushing weight. It remains a benchmark for groove, attitude and pocket in metal.",

    techniques: ['groove-drumming', 'fill-techniques'],
    techniqueDetails: [
      'Lock a heavy, swung half-time pocket beneath the staggered guitar riff',
      'Place the snare backbeat with maximum authority and consistent tone',
      'Keep hi-hat work tight and controlled to anchor the groove',
      'Use short, punchy fills that serve the groove rather than show off',
      'Create menace through space and dynamics rather than busyness',
    ],

    tutorial: {
      youtubeId: 'AkFqg5wAuFk',
      startTime: 0,
      title: 'Pantera - Walk (Official Music Video)',
      description: "Vinnie Paul's iconic half-time groove on Walk",
    },

    gearUsed: [
      { name: 'ddrum Vinnie Paul Signature Series', type: 'drums', link: null },
      { name: 'Sabian AA & AAX Cymbals', type: 'cymbals', link: null },
      { name: 'ddrum Double Pedal', type: 'pedals', link: null },
    ],

    learningTips: [
      'Play to a metronome with a swing feel to nail the pocket',
      'Focus on snare tone and placement — the backbeat is the whole song',
      'Resist adding fills; practise leaving space deliberately',
      'Play along with the track to internalise the swagger and weight',
    ],

    seo: {
      title: 'Vinnie Paul Walk - Pantera Drum Tutorial | MetalForge',
      description: "Learn Vinnie Paul's crushing half-time groove from Pantera's Walk. Video, technique breakdown, and practice tips.",
      keywords: ['vinnie paul', 'walk drums', 'pantera', 'groove metal drumming', 'half-time groove', 'vulgar display of power'],
    },
  },

  'vinnie-paul-cowboys-from-hell-groove': {
    slug: 'vinnie-paul-cowboys-from-hell-groove',
    name: 'Cowboys from Hell Driving Groove',
    shortName: 'Cowboys from Hell',
    drummerId: 11,
    drummerName: 'Vinnie Paul',
    drummerSlug: 'vinnie-paul',
    band: 'Pantera',
    song: 'Cowboys from Hell',
    album: 'Cowboys from Hell (1990)',

    category: 'main-groove',
    style: 'groove-metal',
    difficulty: 'advanced',
    difficultyRating: 4,
    bpm: 135,
    bpmDisplay: '~135 BPM',
    timeSignature: '4/4',

    description: "\"Cowboys from Hell\" is the title track of Pantera's 1990 breakthrough album and the song that announced the band's reinvention as a groove-metal powerhouse — with Vinnie Paul's drumming driving the charge. The track is faster and more aggressive than the half-time crush of later hits, built on a galloping, energetic groove that demands both speed and precision. Paul opens with one of metal's most recognisable intros and then locks into a relentless, driving beat that pushes the song forward while staying perfectly in the pocket. What makes his playing here so instructive is the balance of power and control: the tempo is brisk, the kick patterns are busy and articulate, and yet every backbeat lands with crushing authority and the groove never rushes. His fills are tight and purposeful, bridging sections with bursts of single strokes and tom work that reset the energy without derailing the momentum. The song moves through several feels, and Paul navigates the transitions seamlessly, keeping the band locked together through tempo and dynamic shifts. For drummers, \"Cowboys from Hell\" is a superb study in up-tempo groove-metal playing: it develops kick-drum articulation, the stamina to drive a fast beat cleanly, and the timing discipline to keep a busy part rock-solid. Learning it builds the coordination to combine an active kick pattern with a powerful backbeat, the fill vocabulary to connect sections with authority, and the endurance to maintain intensity across a full song. It also teaches the importance of feel at speed — Paul never sacrifices groove for velocity, and capturing that balance is the real lesson. Because the part is well documented through live drum-cam footage and countless transcriptions, the orchestration and feel are accessible to study, making it a rewarding deep-dive for intermediate and advanced players who want to understand the foundations of groove metal. It remains a defining performance in Paul's catalogue and a cornerstone of the genre.",

    techniques: ['groove-drumming', 'double-bass', 'fill-techniques'],
    techniqueDetails: [
      'Drive a fast, energetic groove while keeping a powerful, in-the-pocket backbeat',
      'Articulate the busy kick patterns cleanly without rushing the tempo',
      'Bridge sections with tight single-stroke and tom fills that reset the energy',
      'Navigate the songs feel and tempo shifts seamlessly to keep the band locked',
      'Sustain intensity and stamina across the full up-tempo arrangement',
    ],

    tutorial: {
      youtubeId: '2DfYLar2QGI',
      startTime: 0,
      title: 'Pantera - Cowboys from Hell (Live Drum Cam)',
      description: "Vinnie Paul's driving groove on Cowboys from Hell",
    },

    gearUsed: [
      { name: 'ddrum Vinnie Paul Signature Series', type: 'drums', link: null },
      { name: 'Sabian AA & AAX Cymbals', type: 'cymbals', link: null },
      { name: 'ddrum Double Pedal', type: 'pedals', link: null },
    ],

    learningTips: [
      'Build kick-drum articulation slowly before taking the groove up to tempo',
      'Use a metronome to keep the fast beat from rushing',
      'Practise the fills in isolation so they land tight at speed',
      'Play along with the live drum cam to copy the feel and energy',
    ],

    seo: {
      title: 'Vinnie Paul Cowboys from Hell - Pantera Drum Tutorial | MetalForge',
      description: "Learn Vinnie Paul's driving groove-metal beat from Pantera's Cowboys from Hell. Video, technique breakdown, and practice tips.",
      keywords: ['vinnie paul', 'cowboys from hell drums', 'pantera', 'groove metal drumming', 'double bass tutorial', 'up-tempo metal groove'],
    },
  },

  'vinnie-paul-domination-double-bass': {
    slug: 'vinnie-paul-domination-double-bass',
    name: 'Domination Double-Bass Breakdown',
    shortName: 'Domination',
    drummerId: 11,
    drummerName: 'Vinnie Paul',
    drummerSlug: 'vinnie-paul',
    band: 'Pantera',
    song: 'Domination',
    album: 'Cowboys from Hell (1990)',

    category: 'signature-pattern',
    style: 'groove-metal',
    difficulty: 'expert',
    difficultyRating: 5,
    bpm: 180,
    bpmDisplay: '~180 BPM',
    timeSignature: '4/4 (fast verses into half-time breakdown)',

    description: "\"Domination\" from Pantera's 1990 album Cowboys from Hell is a Vinnie Paul tour de force, and its closing breakdown is one of the most famous double-bass passages in metal history. The song begins as a fast, aggressive thrash-influenced workout, with Paul laying down rapid kick patterns and driving grooves that showcase the speed and stamina he would become known for. But it is the legendary outro — often called one of the greatest breakdowns ever recorded — that makes the track essential study: the band drops into a slower, monstrously heavy half-time feel while Paul unleashes a relentless gallop of double-bass beneath a crushing backbeat, building tension with sheer power and control. The contrast between the frantic main sections and that titanic breakdown is the whole lesson — it demonstrates how dynamics and feel can make a passage hit harder than speed alone. Paul's execution is a study in endurance and evenness: the double-bass has to stay perfectly consistent and powerful for an extended stretch, and the backbeat has to remain authoritative on top of it, all without rushing or dragging. For drummers, \"Domination\" is a benchmark in double-bass control, groove-metal feel and dynamic arrangement: it develops foot speed and stamina, the coordination to lock a heavy backbeat over a continuous kick gallop, and the musical sense to use a tempo drop for maximum impact. Learning it builds the kind of powerful, controlled double-bass that defines the genre, along with the discipline to keep a long passage even and intense. Because the song has been transcribed, charted and covered extensively, the foot patterns and the famous breakdown are well documented, giving advancing players a clear roadmap to follow as they build the technique up to tempo over weeks of focused, patient practice. It is also a reminder that the heaviest moments in metal often come not from the fastest playing but from the most controlled, and that learning to hold back is as valuable as learning to let loose. It remains one of Vinnie Paul's defining performances and a rite of passage for any drummer serious about groove and double-bass.",

    techniques: ['double-bass', 'groove-drumming', 'fill-techniques'],
    techniqueDetails: [
      'Drive the fast main sections with rapid, articulate kick patterns',
      'Drop into the half-time breakdown with a continuous, even double-bass gallop',
      'Keep a crushing, authoritative backbeat on top of the kick gallop',
      'Hold the double-bass perfectly consistent across the long breakdown',
      'Use the tempo drop and dynamics to maximise the breakdowns impact',
    ],

    tutorial: {
      youtubeId: 'UvcKyjel5aE',
      startTime: 0,
      title: 'Pantera - Domination - Vinnie Paul Drum Cover with Drum Charts',
      description: "Drum cover of Domination with on-screen charts following Vinnie Paul's original part",
    },

    gearUsed: [
      { name: 'ddrum Vinnie Paul Signature Series', type: 'drums', link: null },
      { name: 'Sabian AA & AAX Cymbals', type: 'cymbals', link: null },
      { name: 'ddrum Double Pedal', type: 'pedals', link: null },
    ],

    learningTips: [
      'Build double-bass stamina gradually — the breakdown is a long, even passage',
      'Practise locking the backbeat over a continuous kick gallop slowly first',
      'Use a metronome to keep the double-bass even and free of rushing',
      'Study a charted version to map the foot patterns through the breakdown',
    ],

    seo: {
      title: 'Vinnie Paul Domination - Pantera Drum Tutorial | MetalForge',
      description: "Learn Vinnie Paul's legendary double-bass breakdown from Pantera's Domination. Video, technique breakdown, and practice tips.",
      keywords: ['vinnie paul', 'domination drums', 'pantera', 'double bass tutorial', 'groove metal drumming', 'cowboys from hell'],
    },
  },

  // ==========================================
  // CHARLIE BENANTE - Anthrax (#1048, split 2/4 of #1044)
  // ==========================================
  'charlie-benante-caught-in-a-mosh-groove': {
    slug: 'charlie-benante-caught-in-a-mosh-groove',
    name: 'Caught in a Mosh Syncopated Groove',
    shortName: 'Caught in a Mosh',
    drummerId: 12,
    drummerName: 'Charlie Benante',
    drummerSlug: 'charlie-benante',
    band: 'Anthrax',
    song: 'Caught in a Mosh',
    album: 'Among the Living (1987)',

    category: 'signature-pattern',
    style: 'thrash-metal',
    difficulty: 'advanced',
    difficultyRating: 4,
    bpm: 180,
    bpmDisplay: '~180 BPM',
    timeSignature: '4/4 (heavy syncopation)',

    description: "\"Caught in a Mosh\" from Anthrax's 1987 album Among the Living is one of Charlie Benante's defining performances and a blueprint for how to drum thrash with groove rather than just speed. Benante is widely credited as one of the architects of the thrash drumming vocabulary, and this track shows exactly why: he locks his kick drum to the band's stop-start, palm-muted riffing so tightly that the drums and guitars read as one jagged machine, then ornaments those syncopated hits with crisp snare accents and tom punctuations that mark every twist in the arrangement. What sets the part apart is its phrasing — rather than burying the song under constant double bass, Benante uses bursts of fast kick to drive the verses and pulls back into a swaggering, half-time-feeling pocket for the chorus, giving the song its trademark push and pull. The fills are pure Benante: fast, articulate tom rolls that erupt out of the riff and land precisely on the downbeat, signalling each section change with authority. For drummers, \"Caught in a Mosh\" is a complete study in playing with a band rather than over it: every kick and accent has a purpose tied to the riff, and learning it forces you to internalise where the guitars land so you can lock to them without staring at a click. It demands fast single and double strokes on the feet, a strong sense of subdivision to nail the off-beat accents, and the dynamic control to make the chorus breathe after the frantic verses. Working through even a single section sharpens your timing, your ear for syncopation, and your ability to make a technical thrash part feel like a groove rather than an exercise — skills that transfer directly to any aggressive metal style. Decades on, it remains a rite-of-passage track and a masterclass in the kind of riff-locked, groove-driven thrash drumming Benante helped invent.",

    techniques: ['groove-drumming', 'double-bass', 'fill-techniques'],
    techniqueDetails: [
      'Lock the kick drum precisely to the palm-muted, syncopated guitar riff',
      'Drive the verses with quick double-bass bursts rather than a constant gallop',
      'Pull back into a half-time-feeling swagger for the chorus pocket',
      'Punctuate the section changes with fast, articulate tom rolls',
      'Resolve every fill exactly on the downbeat so it serves the arrangement',
    ],

    tutorial: {
      youtubeId: 'S5jWdwruito',
      startTime: 0,
      title: 'Anthrax - Caught In a Mosh (Drum Cover)',
      description: 'Full-song drum cover following Charlie Benante\'s original part on Caught in a Mosh',
    },

    gearUsed: [
      { name: 'Tama Starclassic Kit', type: 'drums', link: null },
      { name: 'Paiste Cymbals', type: 'cymbals', link: null },
      { name: 'Tama Iron Cobra Double Pedal', type: 'pedals', link: null },
    ],

    learningTips: [
      'Tap the guitar riff with your hands away from the kit until the syncopation is internalised',
      'Practise the double-bass bursts slowly so every stroke speaks evenly',
      'Loop the verse and chorus separately before stringing them together',
      'Record yourself and check the kick lines up exactly with the riff',
    ],

    seo: {
      title: 'Charlie Benante Caught in a Mosh - Anthrax Drum Tutorial | MetalForge',
      description: "Learn Charlie Benante's syncopated thrash groove from Anthrax's Caught in a Mosh. Video, technique breakdown, and practice tips.",
      keywords: ['charlie benante', 'caught in a mosh drums', 'anthrax', 'thrash metal drumming', 'syncopation tutorial', 'among the living'],
    },
  },

  'charlie-benante-madhouse-thrash-groove': {
    slug: 'charlie-benante-madhouse-thrash-groove',
    name: 'Madhouse Thrash Groove',
    shortName: 'Madhouse',
    drummerId: 12,
    drummerName: 'Charlie Benante',
    drummerSlug: 'charlie-benante',
    band: 'Anthrax',
    song: 'Madhouse',
    album: 'Spreading the Disease (1985)',

    category: 'main-groove',
    style: 'thrash-metal',
    difficulty: 'advanced',
    difficultyRating: 4,
    bpm: 168,
    bpmDisplay: '~168 BPM',
    timeSignature: '4/4',

    description: "\"Madhouse\" from Anthrax's 1985 album Spreading the Disease was the band's breakthrough single and remains one of Charlie Benante's most instructive grooves. Where much early thrash leaned on relentless speed, \"Madhouse\" shows Benante's gift for a driving, mid-paced pocket that swings hard while still hitting with thrash intensity. The main groove is built on a propulsive kick pattern that locks to the song's chugging, gallop-flavoured riff, topped with a confident backbeat and tight hi-hat work that keeps the whole thing dancing rather than merely pummelling. What makes the part such a good study is its restraint: Benante leaves space, lets the riff breathe, and uses crisp fills to mark the transitions instead of cramming every bar with notes. The verses ride a steady, slightly syncopated groove; the pre-chorus tightens up with quicker kick figures; and the choruses open out with bigger cymbal accents that lift the song. His fills are textbook thrash — fast, even tom runs and snare-to-tom phrases that flow naturally out of the groove and snap back onto beat one. For drummers, \"Madhouse\" is an ideal introduction to Benante's style and to thrash drumming in general: it develops the coordination to lock a busy kick pattern under a solid backbeat, the timing to place syncopated accents cleanly, and the musical judgement to play for the song rather than over it. Learning it builds foot control, groove consistency at a demanding-but-manageable tempo, and a vocabulary of fills that work in any uptempo metal context. Because the song has been transcribed and covered extensively, the patterns are well documented, giving developing players a clear roadmap. More than a thrash anthem, it is a lesson in how feel and pocket separate a memorable metal drummer from a merely fast one — and Benante is one of the genre's most feel-driven players.",

    techniques: ['groove-drumming', 'double-bass', 'fill-techniques'],
    techniqueDetails: [
      'Lock the driving kick pattern to the chugging, gallop-flavoured riff',
      'Hold a confident backbeat with tight hi-hat work to keep the groove dancing',
      'Tighten the kick figures through the pre-chorus to build tension',
      'Open the choruses with bigger cymbal accents to lift the song',
      'Mark the transitions with fast, even tom fills that resolve on beat one',
    ],

    tutorial: {
      youtubeId: 'e2sMCDvXr90',
      startTime: 0,
      title: 'Madhouse + Anthrax + Drum only + Drum tab',
      description: 'Isolated drum track of Madhouse with on-screen drum tab following Charlie Benante\'s part',
    },

    gearUsed: [
      { name: 'Tama Starclassic Kit', type: 'drums', link: null },
      { name: 'Paiste Cymbals', type: 'cymbals', link: null },
      { name: 'Tama Iron Cobra Double Pedal', type: 'pedals', link: null },
    ],

    learningTips: [
      'Start at a slower tempo and lock the kick to the riff before adding speed',
      'Keep the hi-hat tight and consistent so the groove stays danceable',
      'Practise the tom fills separately, then place them back into the groove',
      'Use a metronome to keep the syncopated accents from rushing',
    ],

    seo: {
      title: 'Charlie Benante Madhouse - Anthrax Drum Tutorial | MetalForge',
      description: "Learn Charlie Benante's driving thrash groove from Anthrax's Madhouse. Video, technique breakdown, and practice tips.",
      keywords: ['charlie benante', 'madhouse drums', 'anthrax', 'thrash metal drumming', 'groove tutorial', 'spreading the disease'],
    },
  },

  'charlie-benante-indians-war-dance': {
    slug: 'charlie-benante-indians-war-dance',
    name: 'Indians War Dance Breakdown',
    shortName: 'Indians',
    drummerId: 12,
    drummerName: 'Charlie Benante',
    drummerSlug: 'charlie-benante',
    band: 'Anthrax',
    song: 'Indians',
    album: 'Among the Living (1987)',

    category: 'signature-pattern',
    style: 'thrash-metal',
    difficulty: 'expert',
    difficultyRating: 5,
    bpm: 200,
    bpmDisplay: '~200 BPM',
    timeSignature: '4/4 (fast thrash into half-time war dance)',

    description: "\"Indians\" from Anthrax's 1987 album Among the Living is one of Charlie Benante's most celebrated performances and a track every thrash drummer eventually has to confront. The song is a two-part lesson in dynamics and intensity. The main body is fast, aggressive thrash: Benante drives it with rapid kick patterns, a relentless backbeat, and the kind of precise, fluid tom fills that became his signature, all while locking tightly to the band's galloping riffs. Then comes the moment the song is famous for — the breakdown often called the \"War Dance,\" where the band drops into a slower, monstrously heavy half-time feel and Benante anchors a chant-along groove that has detonated mosh pits for decades. The contrast between the frantic main sections and that titanic breakdown is the whole point: it demonstrates how a drummer can use a tempo drop and a wide-open pocket to make a passage hit harder than speed alone ever could. Benante's execution is a study in control — the fast sections demand stamina and clean, even strokes, while the War Dance demands the discipline to lay back, leave space, and make every backbeat land like a hammer. For drummers, \"Indians\" is a benchmark in thrash feel, fill vocabulary, and dynamic arrangement: it develops foot speed and endurance, the coordination to keep a busy groove tight at high tempo, and the musical sense to use a half-time breakdown for maximum impact. Learning it builds the powerful, controlled thrash drumming Benante helped define, along with the judgement to know when to drive and when to pull back. Because the song is so widely transcribed and covered, the fast patterns and the famous breakdown are well documented, giving advancing players a clear roadmap. It remains one of Benante's defining performances and a genuine milestone for any drummer serious about thrash.",

    techniques: ['double-bass', 'groove-drumming', 'fill-techniques'],
    techniqueDetails: [
      'Drive the fast thrash sections with rapid, even kick patterns and a relentless backbeat',
      'Lock the busy groove tightly to the band\'s galloping riffs at high tempo',
      'Drop into the half-time War Dance with a wide-open, hammering pocket',
      'Leave space in the breakdown so every backbeat lands with maximum weight',
      'Connect the sections with fluid tom fills that resolve cleanly on the downbeat',
    ],

    tutorial: {
      youtubeId: 'OR6rUpbFOk0',
      startTime: 0,
      title: 'The Iconic Drumming Behind "Indians" | Anthrax',
      description: 'Drumeo breakdown of Charlie Benante\'s iconic part and War Dance breakdown on Anthrax\'s Indians',
    },

    gearUsed: [
      { name: 'Tama Starclassic Kit', type: 'drums', link: null },
      { name: 'Paiste Cymbals', type: 'cymbals', link: null },
      { name: 'Tama Iron Cobra Double Pedal', type: 'pedals', link: null },
    ],

    learningTips: [
      'Build foot speed and stamina gradually so the fast sections stay clean',
      'Practise the War Dance breakdown slowly to internalise its laid-back feel',
      'Keep the half-time backbeat authoritative without rushing into the next bar',
      'Loop the transition between the thrash sections and the breakdown',
    ],

    seo: {
      title: 'Charlie Benante Indians - Anthrax Drum Tutorial | MetalForge',
      description: "Learn Charlie Benante's thrash assault and War Dance breakdown from Anthrax's Indians. Video, technique breakdown, and practice tips.",
      keywords: ['charlie benante', 'indians drums', 'anthrax', 'thrash metal drumming', 'war dance breakdown', 'among the living'],
    },
  },

  // ==========================================
  // CHRIS ADLER - Lamb of God (#1048, split 2/4 of #1044)
  // ==========================================
  'chris-adler-laid-to-rest-groove': {
    slug: 'chris-adler-laid-to-rest-groove',
    name: 'Laid to Rest Ride-Bell Groove',
    shortName: 'Laid to Rest',
    drummerId: 17,
    drummerName: 'Chris Adler',
    drummerSlug: 'chris-adler',
    band: 'Lamb of God',
    song: 'Laid to Rest',
    album: 'Ashes of the Wake (2004)',

    category: 'signature-pattern',
    style: 'groove-metal',
    difficulty: 'expert',
    difficultyRating: 5,
    bpm: 200,
    bpmDisplay: '~200 BPM',
    timeSignature: '4/4 (heavy syncopation)',

    description: "\"Laid to Rest\" from Lamb of God's 2004 album Ashes of the Wake is the song that announced Chris Adler as one of the most influential metal drummers of his generation, and its grooves are studied by drummers worldwide. Adler's signature is a heel-up, ride-bell-driven approach where his right hand rides the bell of the cymbal while his feet weave intricate, syncopated double-bass underneath — a style that gives Lamb of God its distinctive churning, mechanical-yet-human intensity. \"Laid to Rest\" is a showcase of exactly that: the verses lock a busy kick pattern to the band's lurching riffs while the ride bell keeps a relentless pulse, and the choruses open into a punishing half-time groove that hits like a wrecking ball. What makes the part so demanding is the independence required — the hands and feet are doing very different rhythmic jobs at once, and keeping the ride bell steady while the kick syncopates against the riff takes serious coordination. Adler's fills are equally instructive: linear phrases that flow around the kit and tumble back into the groove without ever losing the pocket. For drummers, \"Laid to Rest\" is a complete study in modern groove-metal drumming: it develops four-way independence, double-bass control at speed, and the ability to lock complex kick patterns to a riff while maintaining a driving cymbal pulse. Learning it forces you to slow down and isolate the layers — feet, ride hand, backbeat — before reassembling them at tempo, which is one of the best coordination workouts in metal. Because Adler filmed clinics and the song has been transcribed exhaustively, the sticking and foot patterns are well documented, making it an accessible deep-dive for advanced players. It remains a rite-of-passage track and a benchmark for anyone wanting to play in the modern groove-metal style with power and precision.",

    techniques: ['double-bass', 'groove-drumming', 'fill-techniques'],
    techniqueDetails: [
      'Ride the bell of the cymbal with the right hand for a relentless pulse',
      'Weave the syncopated double-bass underneath, locked to the lurching riff',
      'Hold the ride-hand pulse steady while the feet syncopate against the guitars',
      'Drop into the punishing half-time chorus groove for maximum weight',
      'Flow through linear fills that tumble back into the pocket without losing time',
    ],

    tutorial: {
      youtubeId: '4eNHAm6Lip8',
      startTime: 0,
      title: 'The Iconic Drumming Behind "Laid To Rest" | Lamb Of God',
      description: 'Drumeo breakdown of Chris Adler\'s ride-bell groove and double-bass work on Laid to Rest',
    },

    gearUsed: [
      { name: 'Mapex Black Panther Kit', type: 'drums', link: null },
      { name: 'Meinl Cymbals', type: 'cymbals', link: null },
      { name: 'Trick Pro1-V Bigfoot Double Pedal', type: 'pedals', link: null },
    ],

    learningTips: [
      'Isolate the feet, ride hand, and backbeat separately before combining them',
      'Build double-bass control slowly so every stroke speaks evenly at tempo',
      'Keep the ride bell steady and even while the kick syncopates underneath',
      'Practise the linear fills slowly, then place them back into the groove',
    ],

    seo: {
      title: 'Chris Adler Laid to Rest - Lamb of God Drum Tutorial | MetalForge',
      description: "Learn Chris Adler's ride-bell groove and double-bass work from Lamb of God's Laid to Rest. Video, technique breakdown, and practice tips.",
      keywords: ['chris adler', 'laid to rest drums', 'lamb of god', 'groove metal drumming', 'double bass tutorial', 'ashes of the wake'],
    },
  },

  'chris-adler-walk-with-me-in-hell-groove': {
    slug: 'chris-adler-walk-with-me-in-hell-groove',
    name: 'Walk with Me in Hell Half-Time Groove',
    shortName: 'Walk with Me in Hell',
    drummerId: 17,
    drummerName: 'Chris Adler',
    drummerSlug: 'chris-adler',
    band: 'Lamb of God',
    song: 'Walk with Me in Hell',
    album: 'Sacrament (2006)',

    category: 'main-groove',
    style: 'groove-metal',
    difficulty: 'advanced',
    difficultyRating: 4,
    bpm: 150,
    bpmDisplay: '~150 BPM',
    timeSignature: '4/4',

    description: "\"Walk with Me in Hell\" from Lamb of God's 2006 album Sacrament is one of Chris Adler's most powerful grooves and a perfect study in how heaviness comes from feel and space rather than sheer speed. After an atmospheric intro, the song settles into a massive half-time pocket: Adler anchors a wide, deliberate backbeat while his feet lay down controlled double-bass figures that lock to the band's crushing riff, and his ride-bell work gives the groove its signature forward momentum. What makes the part so instructive is its patience — Adler resists the urge to overplay, letting the groove sit and breathe so the riff lands with maximum impact, then opening up with bigger fills and faster kick runs as the song builds. The mid-paced tempo is deceptive: keeping double bass even and powerful at that speed, under a wide half-time backbeat, demands real control and stamina, and any unevenness in the feet immediately shows. Adler's fills here are a masterclass in tasteful placement — they decorate the transitions and signal the song's dynamic shifts without ever cluttering the pocket. For drummers, \"Walk with Me in Hell\" is an ideal study in groove-metal feel and dynamics: it develops double-bass evenness at a moderate tempo, the coordination to lock a heavy backbeat over continuous kick figures, and the musical judgement to know when to drive and when to leave space. Learning it builds the kind of powerful, controlled playing that defines modern metal, along with the discipline to serve the song rather than show off. Because Adler's parts have been transcribed and covered widely, the patterns are well documented, giving advancing players a clear roadmap. It is a reminder that the heaviest moments in metal often come from the most controlled playing — and a benchmark groove for anyone learning Adler's style.",

    techniques: ['groove-drumming', 'double-bass', 'fill-techniques'],
    techniqueDetails: [
      'Anchor a wide, deliberate half-time backbeat under the crushing riff',
      'Lay down controlled double-bass figures locked to the guitar rhythm',
      'Drive the groove forward with steady ride-bell work',
      'Let the pocket sit and breathe so the riff lands with maximum impact',
      'Open up with bigger fills and faster kick runs as the song builds',
    ],

    tutorial: {
      youtubeId: 'oSvE3tqq-Yo',
      startTime: 0,
      title: 'JOEY MUHA - Lamb of God - Walk With Me in Hell DRUM COVER',
      description: 'Full-song drum cover following Chris Adler\'s half-time groove on Walk with Me in Hell',
    },

    gearUsed: [
      { name: 'Mapex Black Panther Kit', type: 'drums', link: null },
      { name: 'Meinl Cymbals', type: 'cymbals', link: null },
      { name: 'Trick Pro1-V Bigfoot Double Pedal', type: 'pedals', link: null },
    ],

    learningTips: [
      'Build double-bass evenness at a moderate tempo before pushing the speed',
      'Keep the half-time backbeat wide and authoritative without rushing',
      'Use the ride bell to keep forward momentum under the slow pocket',
      'Practise the fills separately, then place them back to mark the transitions',
    ],

    seo: {
      title: 'Chris Adler Walk with Me in Hell - Lamb of God Drum Tutorial | MetalForge',
      description: "Learn Chris Adler's powerful half-time groove from Lamb of God's Walk with Me in Hell. Video, technique breakdown, and practice tips.",
      keywords: ['chris adler', 'walk with me in hell drums', 'lamb of god', 'groove metal drumming', 'half-time groove', 'sacrament'],
    },
  },

  'chris-adler-512-groove': {
    slug: 'chris-adler-512-groove',
    name: '512 Groove & Fills',
    shortName: '512',
    drummerId: 17,
    drummerName: 'Chris Adler',
    drummerSlug: 'chris-adler',
    band: 'Lamb of God',
    song: '512',
    album: 'VII: Sturm und Drang (2015)',

    category: 'signature-pattern',
    style: 'groove-metal',
    difficulty: 'expert',
    difficultyRating: 5,
    bpm: 190,
    bpmDisplay: '~190 BPM',
    timeSignature: '4/4 (with syncopated accents)',

    description: "\"512\" from Lamb of God's 2015 album VII: Sturm und Drang earned a Grammy nomination for Best Metal Performance and stands as one of Chris Adler's most refined recorded performances. By this point in his career Adler had distilled his style into something both crushingly heavy and remarkably musical, and \"512\" puts every facet of it on display. The verses ride his trademark ride-bell pulse while intricate, syncopated double-bass figures lock to the song's angular riffing, and the choruses open into a wide, anthemic groove with a commanding backbeat. What makes the part such a rewarding study is its blend of power and nuance: the double-bass patterns are fast and demanding, but Adler shapes them around the riff with bursts and accents rather than a constant wall of kick, leaving the groove room to breathe. His fills are inventive and precise — linear phrases and tom orchestrations that move around the kit and resolve cleanly back into the pocket, marking the song's structure without ever derailing it. The track also showcases his command of dynamics across a full arrangement, pulling back under the melodic sections and re-engaging the full assault when the heaviness returns. For drummers, \"512\" is a complete study in mature groove-metal drumming: it requires four-way independence, even and controlled double bass at speed, and the musical judgement to play for the song's emotional arc. Learning it builds coordination, foot stamina, and the arranging instincts to support a dynamic metal arrangement from start to finish. Because it is one of Adler's most celebrated later performances, the part has been transcribed and analysed widely, giving advanced players a clear roadmap. It is a strong example of how technical drumming can stay tasteful and song-serving at the highest level — and a fitting capstone to Adler's tenure with the band.",

    techniques: ['double-bass', 'groove-drumming', 'fill-techniques'],
    techniqueDetails: [
      'Ride the bell pulse through the verses while the feet syncopate to the riff',
      'Shape the double-bass with bursts and accents rather than a constant wall of kick',
      'Open the choruses into a wide, anthemic groove with a commanding backbeat',
      'Pull back under the melodic sections and re-engage the full assault on the heavy parts',
      'Resolve inventive linear fills cleanly back into the pocket to mark the structure',
    ],

    tutorial: {
      youtubeId: 'KQoTU2xI-fY',
      startTime: 0,
      title: 'Lamb Of God - 512 - Drum Cover - VII: Sturm und Drang',
      description: 'Full-song drum cover following Chris Adler\'s Grammy-nominated part on 512',
    },

    gearUsed: [
      { name: 'Mapex Black Panther Kit', type: 'drums', link: null },
      { name: 'Meinl Cymbals', type: 'cymbals', link: null },
      { name: 'Trick Pro1-V Bigfoot Double Pedal', type: 'pedals', link: null },
    ],

    learningTips: [
      'Isolate the ride-bell pulse and the double-bass figures before combining them',
      'Practise the double-bass bursts slowly so they stay even at tempo',
      'Map the song\'s dynamic shifts and rehearse pulling back then re-engaging',
      'Build the linear fills slowly, then drop them back into the groove',
    ],

    seo: {
      title: 'Chris Adler 512 - Lamb of God Drum Tutorial | MetalForge',
      description: "Learn Chris Adler's Grammy-nominated groove and fills from Lamb of God's 512. Video, technique breakdown, and practice tips.",
      keywords: ['chris adler', '512 drums', 'lamb of god', 'groove metal drumming', 'double bass tutorial', 'sturm und drang'],
    },
  },

  // ===== Jay Weinberg (id 10, Slipknot) — #1049 (split 3/4 of #1044) =====
  'jay-weinberg-unsainted-groove': {
    slug: 'jay-weinberg-unsainted-groove',
    name: 'Unsainted Driving Groove',
    shortName: 'Unsainted',
    drummerId: 10,
    drummerName: 'Jay Weinberg',
    drummerSlug: 'jay-weinberg',
    band: 'Slipknot',
    song: 'Unsainted',
    album: 'We Are Not Your Kind (2019)',
    category: 'main-groove',
    style: 'nu-metal',
    difficulty: 'advanced',
    difficultyRating: 4,
    bpm: 132,
    bpmDisplay: '~132 BPM',
    timeSignature: '4/4',
    description: "\"Unsainted\" was the lead single from Slipknot's 2019 album We Are Not Your Kind and the song that announced Jay Weinberg as the band's drumming force in his own right rather than the man who replaced Joey Jordison. After an a cappella choir intro, the track erupts into a relentless, forward-driving groove, and Weinberg's playing is the engine behind its aggression. His approach here is built on power, precision and stamina: hard-hitting backbeats, busy double-bass figures that lock to the down-tuned guitar riff, and explosive crash accents that punctuate every transition. What makes the part a great study is how Weinberg combines raw physicality with control — the double bass is fast and consistent but never washes out the groove, and his hi-hat and ride work keep the pulse clear even when the kick patterns get dense. The choruses open up with a more anthemic half-time feel, teaching the contrast between verse intensity and chorus weight that defines modern Slipknot. For drummers, \"Unsainted\" is a workout in endurance and dynamic control: maintaining clean, even double-bass under a heavy backbeat for the length of the song, placing fills that lift the arrangement without derailing the groove, and using cymbal accents to mark the song's many sectional shifts. It develops foot speed and consistency, four-limb coordination, and the discipline to play loud and hard while still grooving in the pocket. Learning it gives you a window into Weinberg's signature blend of hardcore-punk energy and metal precision — the same intensity he brought to Slipknot's live shows — and it rewards patient practice because the part only sounds right when the feel stays heavy and the foot stays relentless from the first verse to the final chorus.",
    techniques: ['groove-drumming', 'double-bass', 'fill-techniques'],
    techniqueDetails: [
      'Lock fast, even double-bass figures to the down-tuned main riff',
      'Drive a hard, consistent backbeat with full-volume snare tone',
      'Open the chorus into a heavier, anthemic half-time feel',
      'Punctuate every sectional shift with crash and china accents',
      'Build the stamina to keep the foot relentless across the whole song',
    ],
    tutorial: {
      youtubeId: 'VpATBBRajP8',
      startTime: 0,
      title: 'Slipknot - Unsainted [OFFICIAL VIDEO]',
      description: "Jay Weinberg's driving groove and double-bass on Unsainted",
    },
    gearUsed: [
      { name: 'SJC Custom Drums', type: 'drums', link: null },
      { name: 'Zildjian Cymbals', type: 'cymbals', link: null },
      { name: 'DW 9000 Series Double Pedal', type: 'pedals', link: null },
    ],
    learningTips: [
      'Build double-bass stamina slowly with a metronome before full tempo',
      'Keep the backbeat loud and even — let the kick sit under it, not over it',
      'Practise the verse-to-chorus dynamic shift so the half-time feel lands',
      'Play along with the track to internalise the relentless forward drive',
    ],
    seo: {
      title: 'Jay Weinberg Unsainted - Slipknot Drum Tutorial | MetalForge',
      description: "Learn Jay Weinberg's driving double-bass groove from Slipknot's Unsainted. Video, technique breakdown, and practice tips.",
      keywords: ['jay weinberg', 'unsainted drums', 'slipknot', 'nu-metal drumming', 'double bass tutorial', 'we are not your kind'],
    },
  },
  'jay-weinberg-devil-in-i-groove': {
    slug: 'jay-weinberg-devil-in-i-groove',
    name: 'The Devil in I Groove',
    shortName: 'The Devil in I',
    drummerId: 10,
    drummerName: 'Jay Weinberg',
    drummerSlug: 'jay-weinberg',
    band: 'Slipknot',
    song: 'The Devil in I',
    album: '.5: The Gray Chapter (2014)',
    category: 'main-groove',
    style: 'nu-metal',
    difficulty: 'intermediate',
    difficultyRating: 3,
    bpm: 120,
    bpmDisplay: '~120 BPM',
    timeSignature: '4/4',
    description: "\"The Devil in I\" from .5: The Gray Chapter was the single that introduced Jay Weinberg as Slipknot's new drummer in 2014, and it remains one of the best examples of his ability to serve a song with weight and groove rather than sheer speed. The track is mid-tempo and built around a powerful, mid-paced feel, and Weinberg's part is a masterclass in pocket: a heavy, deliberate backbeat, controlled double-bass accents that reinforce the riff, and a chorus that opens into a soaring half-time feel. Rather than fill every bar, he leaves space, letting the groove breathe and the song's dynamics do the work — the verses simmer, the pre-chorus builds tension, and the chorus releases it with huge, ringing crashes and a wide-open backbeat. That sense of arrangement-awareness is exactly what makes it such a useful study. For drummers, \"The Devil in I\" teaches the fundamentals of heavy groove playing: locking a confident mid-tempo pocket, placing the snare with authority and consistent tone, and using dynamics to shape the rise and fall of the song. The double-bass passages are approachable rather than extreme, making this a great track for intermediate players developing foot control without needing blistering speed, while the half-time chorus is a lesson in how to make a part feel huge by playing fewer, bigger notes. Learning it develops your sense of time, your dynamic range, and your discipline to play for the song. It also captures Weinberg's debut-era voice in the band — physical and intense, but always grounded in groove — and it is an ideal entry point for anyone wanting to study modern Slipknot drumming before tackling the faster, busier material from later albums. Above all it rewards feel: get the pocket and the dynamics right and the part sounds enormous.",
    techniques: ['groove-drumming', 'double-bass', 'dynamics'],
    techniqueDetails: [
      'Lock a confident, heavy mid-tempo pocket beneath the main riff',
      'Place the snare backbeat with authority and consistent tone',
      'Reinforce the riff with controlled, accent-based double-bass figures',
      'Open the chorus into a wide, ringing half-time feel',
      'Use space and dynamics to shape the verse-to-chorus build',
    ],
    tutorial: {
      youtubeId: 'XEEasR7hVhA',
      startTime: 0,
      title: 'Slipknot - The Devil In I [OFFICIAL VIDEO]',
      description: "Jay Weinberg's heavy mid-tempo groove on The Devil in I",
    },
    gearUsed: [
      { name: 'SJC Custom Drums', type: 'drums', link: null },
      { name: 'Zildjian Cymbals', type: 'cymbals', link: null },
      { name: 'DW 9000 Series Double Pedal', type: 'pedals', link: null },
    ],
    learningTips: [
      'Focus on snare tone and placement — the backbeat carries the song',
      'Keep the double-bass accents tight and controlled, not constant',
      'Practise the dynamic build from verse to chorus deliberately',
      'Resist over-filling; let the groove and arrangement breathe',
    ],
    seo: {
      title: 'Jay Weinberg The Devil in I - Slipknot Drum Tutorial | MetalForge',
      description: "Learn Jay Weinberg's heavy mid-tempo groove from Slipknot's The Devil in I. Video, technique breakdown, and practice tips.",
      keywords: ['jay weinberg', 'the devil in i drums', 'slipknot', 'nu-metal drumming', 'groove metal', 'gray chapter'],
    },
  },
  'jay-weinberg-nero-forte-groove': {
    slug: 'jay-weinberg-nero-forte-groove',
    name: 'Nero Forte Syncopated Groove',
    shortName: 'Nero Forte',
    drummerId: 10,
    drummerName: 'Jay Weinberg',
    drummerSlug: 'jay-weinberg',
    band: 'Slipknot',
    song: 'Nero Forte',
    album: 'We Are Not Your Kind (2019)',
    category: 'signature-groove',
    style: 'nu-metal',
    difficulty: 'advanced',
    difficultyRating: 4,
    bpm: 150,
    bpmDisplay: '~150 BPM',
    timeSignature: '4/4',
    description: "\"Nero Forte,\" a fan-favourite from Slipknot's We Are Not Your Kind, is one of the clearest showcases of Jay Weinberg's busy, syncopated and hardcore-rooted drumming style. Where some Slipknot tracks ride a single heavy groove, \"Nero Forte\" is restless and angular: the verses bristle with stop-start kick patterns, off-beat accents and rapid-fire double-bass bursts that snap against the staccato guitar riff, while the chorus drops into a more open, driving feel that gives the song its hook. Weinberg's playing here is aggressive and dense, full of the punk energy he brought to the band, but it is also tightly controlled — every syncopated kick lands exactly with the riff, and his accents lock the whole rhythm section into a jagged, machine-like groove. That combination of chaos and precision is what makes the part such a rewarding challenge. For drummers, \"Nero Forte\" is a study in syncopation and coordination: matching intricate kick-drum figures to a syncopated riff, placing snare and crash accents in unexpected places, and switching cleanly between the busy verse and the broader chorus feel. It demands sharp four-limb independence, fast and accurate double-bass control, and a strong internal clock to keep the off-beat phrasing from drifting. Learning it develops your ability to play with the guitars rather than just under them — phrasing your kicks as part of the riff, not merely keeping time beneath it. It also captures the more adventurous side of Weinberg's writing, the kind of part that made him a standout in modern metal drumming. Because the groove is so tightly interlocked with the riff, slow, careful practice is essential: break the kick patterns down bar by bar, lock them to the guitar, and only then bring the part up to its full driving tempo so the syncopation stays razor-sharp.",
    techniques: ['groove-drumming', 'double-bass', 'accents'],
    techniqueDetails: [
      'Match intricate stop-start kick figures to the staccato guitar riff',
      'Place snare and crash accents on unexpected off-beats',
      'Fire rapid double-bass bursts cleanly within the verse groove',
      'Switch decisively between the busy verse and open chorus feel',
      'Lock the syncopation to the riff so the groove feels machine-tight',
    ],
    tutorial: {
      youtubeId: 'JGNqvH9ykfA',
      startTime: 0,
      title: 'Slipknot - Nero Forte [OFFICIAL VIDEO]',
      description: "Jay Weinberg's syncopated, riff-locked groove on Nero Forte",
    },
    gearUsed: [
      { name: 'SJC Custom Drums', type: 'drums', link: null },
      { name: 'Zildjian Cymbals', type: 'cymbals', link: null },
      { name: 'DW 9000 Series Double Pedal', type: 'pedals', link: null },
    ],
    learningTips: [
      'Break the kick patterns down bar by bar and lock them to the riff',
      'Practise slowly until the syncopation is exact before raising tempo',
      'Count the off-beat accents out loud to keep your internal clock steady',
      'Play with the guitar track to phrase your kicks as part of the riff',
    ],
    seo: {
      title: 'Jay Weinberg Nero Forte - Slipknot Drum Tutorial | MetalForge',
      description: "Learn Jay Weinberg's syncopated, riff-locked groove from Slipknot's Nero Forte. Video, technique breakdown, and practice tips.",
      keywords: ['jay weinberg', 'nero forte drums', 'slipknot', 'nu-metal drumming', 'syncopation tutorial', 'we are not your kind'],
    },
  },

  // ===== Gavin Harrison (id 47, Porcupine Tree) — #1049 (split 3/4 of #1044) =====
  'gavin-harrison-sound-of-muzak-groove': {
    slug: 'gavin-harrison-sound-of-muzak-groove',
    name: 'The Sound of Muzak 7/8 Groove',
    shortName: 'The Sound of Muzak',
    drummerId: 47,
    drummerName: 'Gavin Harrison',
    drummerSlug: 'gavin-harrison',
    band: 'Porcupine Tree',
    song: 'The Sound of Muzak',
    album: 'In Absentia (2002)',
    category: 'signature-groove',
    style: 'progressive-metal',
    difficulty: 'advanced',
    difficultyRating: 4,
    bpm: 100,
    bpmDisplay: '~100 BPM',
    timeSignature: '7/8',
    description: "\"The Sound of Muzak\" from Porcupine Tree's 2002 album In Absentia is one of the most celebrated grooves in modern progressive music, and it was the track that introduced many listeners to Gavin Harrison's extraordinary feel for odd time. The song's main riff sits in 7/8, but rather than make the meter feel lopsided or mathematical, Harrison plays it with such relaxed, funky authority that most people tap along without ever realising they are grooving in seven. That is the whole lesson of this part: making an odd time signature feel as natural and danceable as straight 4/4. His groove is built on tasteful ghost notes on the snare, a smooth hi-hat ostinato, and a kick pattern that locks perfectly to the bass line, with subtle dynamic shading that gives the part its hypnotic, head-nodding feel. For drummers, \"The Sound of Muzak\" is a foundational study in odd-time groove and ghost-note control: internalising a 7/8 pulse until it feels comfortable, placing ghost notes so they add funk and texture without cluttering the groove, and keeping the hi-hat and kick relaxed rather than rigid. It develops your sense of time in odd meters, your dynamic touch on the snare, and your ability to make complex rhythms feel musical rather than technical. Learning it is a rite of passage for any drummer interested in progressive rock and metal, because it teaches the single most important Gavin Harrison principle — that groove and feel come first, and the time signature is just the framework you make swing. Take it slowly, count the seven until it disappears into the pocket, and focus on the ghost notes and dynamics that turn a counting exercise into one of prog's all-time great grooves. Played well, it should feel effortless and deeply musical.",
    techniques: ['odd-time-signatures', 'ghost-notes', 'linear-drumming'],
    techniqueDetails: [
      'Internalise the 7/8 pulse until it feels as natural as 4/4',
      'Lock the kick pattern tightly to the bass line',
      'Add tasteful snare ghost notes for funk and texture',
      'Keep the hi-hat ostinato smooth and relaxed, not rigid',
      'Use subtle dynamics to give the groove its hypnotic head-nod feel',
    ],
    tutorial: {
      youtubeId: '4ulgVOBpNWA',
      startTime: 0,
      title: 'Porcupine Tree - The Sound Of Muzak',
      description: "Gavin Harrison's funky 7/8 ghost-note groove on The Sound of Muzak",
    },
    gearUsed: [
      { name: 'Sonor SQ2 Series Drums', type: 'drums', link: null },
      { name: 'Zildjian K Custom Special Dry Cymbals', type: 'cymbals', link: null },
      { name: 'Sonor Perfect Balance Pedal', type: 'pedals', link: null },
    ],
    learningTips: [
      'Count the 7/8 out loud slowly until the pulse feels natural',
      'Practise the ghost notes at low volume so they sit under the backbeat',
      'Lock to a bass line or click to keep the odd meter grooving',
      'Aim for a relaxed, danceable feel rather than a rigid count',
    ],
    seo: {
      title: 'Gavin Harrison The Sound of Muzak - Porcupine Tree Drum Tutorial | MetalForge',
      description: "Learn Gavin Harrison's funky 7/8 ghost-note groove from Porcupine Tree's The Sound of Muzak. Video, technique breakdown, and practice tips.",
      keywords: ['gavin harrison', 'sound of muzak drums', 'porcupine tree', 'odd time signature', '7/8 groove', 'in absentia'],
    },
  },
  'gavin-harrison-anesthetize-drum-feature': {
    slug: 'gavin-harrison-anesthetize-drum-feature',
    name: 'Anesthetize Polyrhythmic Feature',
    shortName: 'Anesthetize',
    drummerId: 47,
    drummerName: 'Gavin Harrison',
    drummerSlug: 'gavin-harrison',
    band: 'Porcupine Tree',
    song: 'Anesthetize',
    album: 'Fear of a Blank Planet (2007)',
    category: 'signature-pattern',
    style: 'progressive-metal',
    difficulty: 'expert',
    difficultyRating: 5,
    bpm: 140,
    bpmDisplay: '~140 BPM',
    timeSignature: 'mixed / odd-time',
    description: "\"Anesthetize\" is the seventeen-minute centrepiece of Porcupine Tree's 2007 album Fear of a Blank Planet, and its instrumental drum-feature section is widely regarded as one of Gavin Harrison's finest recorded moments. Across the song's shifting movements, Harrison moves from delicate, restrained verses into a heavy, polyrhythmic mid-section where the drums become a lead voice, weaving intricate patterns that play against the guitar and bass rather than simply underpinning them. This is advanced, expert-level drumming: layered polyrhythms, fluid shifts between time signatures, displaced accents, and a constant sense of tension between what the hands and feet are implying and where the actual pulse sits. What is remarkable is that none of it sounds like showing off — Harrison's command of phrasing means every complex figure resolves musically, serving the song's dark, hypnotic mood. For drummers, the \"Anesthetize\" feature is a graduate-level study in polyrhythm and independence: superimposing one rhythmic grouping over another, maintaining an unshakeable internal pulse while accents pull against it, and transitioning seamlessly between contrasting sections of a long-form arrangement. It demands genuine four-limb independence, deep familiarity with odd groupings and metric modulation, and the patience to keep the part musical at every dynamic level. This is not a track to rush — it rewards months of slow, deliberate practice, breaking each section down, isolating the polyrhythmic layers, and only then stitching them together. Learning even a portion of it expands your rhythmic vocabulary enormously and forces you to think about time the way Harrison does: as something elastic that can be stretched, layered and displaced while still grooving. It stands as a benchmark for progressive-metal drumming and a long-term goal for any player serious about mastering complex, musical odd-time and polyrhythmic playing at the highest level of the instrument.",
    techniques: ['polyrhythms', 'odd-time-signatures', 'independence'],
    techniqueDetails: [
      'Superimpose contrasting rhythmic groupings over the underlying pulse',
      'Maintain an unshakeable internal clock while accents pull against it',
      'Transition seamlessly between contrasting long-form sections',
      'Displace accents between hands and feet for tension and release',
      'Keep every complex figure musical and resolved, never showy',
    ],
    tutorial: {
      youtubeId: 'kgwgtERCVI4',
      startTime: 0,
      title: 'Porcupine Tree - Anesthetize (Live in Tilburg)',
      description: "Gavin Harrison's polyrhythmic drum feature on Anesthetize",
    },
    gearUsed: [
      { name: 'Sonor SQ2 Series Drums', type: 'drums', link: null },
      { name: 'Zildjian K Custom Special Dry Cymbals', type: 'cymbals', link: null },
      { name: 'Sonor Perfect Balance Pedal', type: 'pedals', link: null },
    ],
    learningTips: [
      'Break the feature into short sections and master each in isolation',
      'Practise the polyrhythmic layers hands-only before adding the feet',
      'Keep a steady click underneath so displaced accents stay anchored',
      'Build the part up slowly over weeks — speed is the last priority',
    ],
    seo: {
      title: 'Gavin Harrison Anesthetize - Porcupine Tree Drum Tutorial | MetalForge',
      description: "Learn Gavin Harrison's polyrhythmic drum feature from Porcupine Tree's Anesthetize. Video, technique breakdown, and practice tips.",
      keywords: ['gavin harrison', 'anesthetize drums', 'porcupine tree', 'polyrhythm tutorial', 'progressive metal drumming', 'fear of a blank planet'],
    },
  },
  'gavin-harrison-harridan-groove': {
    slug: 'gavin-harrison-harridan-groove',
    name: 'Harridan Ghost-Note Groove',
    shortName: 'Harridan',
    drummerId: 47,
    drummerName: 'Gavin Harrison',
    drummerSlug: 'gavin-harrison',
    band: 'Porcupine Tree',
    song: 'Harridan',
    album: 'Closure/Continuation (2022)',
    category: 'main-groove',
    style: 'progressive-metal',
    difficulty: 'advanced',
    difficultyRating: 4,
    bpm: 120,
    bpmDisplay: '~120 BPM',
    timeSignature: '4/4 (syncopated)',
    description: "\"Harridan\" opened Porcupine Tree's 2022 comeback album Closure/Continuation and was the first new music from the band in over a decade, so it carried real weight — and Gavin Harrison answered with one of his most immediately gripping grooves. The track is built from the rhythm section up: it opens with Harrison and a driving bass line locked into a syncopated, funk-tinged groove dense with ghost notes, and that interplay is the spine of the entire song. His part is a modern showcase of everything that makes his playing distinctive — buttery ghost-note phrasing on the snare, a deep and deliberate pocket, syncopated kick figures that dance around the bass, and a control of dynamics that lets the groove feel both relaxed and propulsive at once. Even as the song shifts through sections, Harrison keeps the feel grounded and grooving, proving that decades into his career his touch and time are as refined as ever. For drummers, \"Harridan\" is an excellent study in contemporary groove playing: weaving ghost notes into a syncopated backbeat, locking kick patterns to a busy bass line, and using dynamics to make a tight groove breathe. It develops your ghost-note control, your pocket, and your ability to play as half of a rhythm-section conversation rather than just keeping time. Because the core groove is more about feel and coordination than raw speed, it is approachable for committed intermediate-to-advanced players while still offering enormous depth — the ghost notes and the way the kick threads through the bass line take real patience to get clean. Learning it connects you to Harrison's current voice on the instrument and to one of the most satisfying grooves in recent progressive rock, a part that proves how much power lives in restraint, touch and impeccable time. Get the ghost notes and the pocket right and the whole groove locks into place.",
    techniques: ['ghost-notes', 'linear-drumming', 'odd-groupings'],
    techniqueDetails: [
      'Weave buttery snare ghost notes into a syncopated backbeat',
      'Lock syncopated kick figures tightly to the driving bass line',
      'Hold a deep, deliberate pocket beneath the rhythm-section interplay',
      'Use dynamics to make the tight groove breathe and propel',
      'Keep the feel grounded as the arrangement shifts through sections',
    ],
    tutorial: {
      youtubeId: 'AW5v4Ohxk5k',
      startTime: 0,
      title: 'Porcupine Tree - Harridan (Official Lyric Video)',
      description: "Gavin Harrison's syncopated ghost-note groove on Harridan",
    },
    gearUsed: [
      { name: 'Sonor SQ2 Series Drums', type: 'drums', link: null },
      { name: 'Zildjian K Custom Special Dry Cymbals', type: 'cymbals', link: null },
      { name: 'Sonor Perfect Balance Pedal', type: 'pedals', link: null },
    ],
    learningTips: [
      'Practise the ghost notes quietly so they sit beneath the backbeat',
      'Lock your kick to the bass line — play with the recording to feel it',
      'Keep the pocket deep and relaxed rather than rushing the syncopation',
      'Focus on touch and dynamics, not speed, to make the groove breathe',
    ],
    seo: {
      title: 'Gavin Harrison Harridan - Porcupine Tree Drum Tutorial | MetalForge',
      description: "Learn Gavin Harrison's syncopated ghost-note groove from Porcupine Tree's Harridan. Video, technique breakdown, and practice tips.",
      keywords: ['gavin harrison', 'harridan drums', 'porcupine tree', 'ghost notes tutorial', 'progressive metal drumming', 'closure continuation'],
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
        // HowTo steps describe how to play the lick — source them from the
        // technique breakdown (techniqueDetails) per #1010, falling back to
        // learningTips for older entries that predate techniqueDetails.
        "step": ((lick.techniqueDetails && lick.techniqueDetails.length)
          ? lick.techniqueDetails
          : (lick.learningTips || [])
        ).map((text, index) => ({
          "@type": "HowToStep",
          "position": index + 1,
          "name": `Step ${index + 1}`,
          "text": text,
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

/**
 * Generate Schema.org markup for the top-level /licks index hub (Issue #1042).
 * CollectionPage wrapping an ItemList of every signature lick, plus a
 * Home › Licks BreadcrumbList. Each ListItem points at the live per-lick route.
 */
export function generateLicksIndexSchema(licks) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Signature Metal Drum Licks",
    "description": "Browse iconic metal drum licks, fills, and beats from the world's best drummers — with tempo, technique breakdown, and video for each.",
    "url": "https://metalforge.io/licks",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": licks.length,
      "itemListElement": licks.map((lick, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": `${lick.name} — ${lick.drummerName}`,
        "url": `https://metalforge.io/drummers/${lick.drummerSlug}/licks/${lick.slug}`,
      })),
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://metalforge.io" },
        { "@type": "ListItem", "position": 2, "name": "Licks", "item": "https://metalforge.io/licks" },
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
