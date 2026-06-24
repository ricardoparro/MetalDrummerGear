/**
 * Signature Gear Spotlight Data Module
 * Issue #739 - Dedicated pages for iconic signature gear pieces
 * 
 * Contains detailed information about legendary signature gear items
 * including stories, specs, media, and affiliate links.
 */

// ==========================================
// SIGNATURE GEAR DATABASE
// ==========================================

export const SIGNATURE_GEAR = {
  // ==========================================
  // #1 PRIORITY: Joey Jordison's Pearl Signature Snare
  // ==========================================
  'joey-jordison-pearl-signature-snare': {
    slug: 'joey-jordison-pearl-signature-snare',
    name: 'Pearl Joey Jordison Signature Snare',
    fullName: 'Pearl Joey Jordison Signature Snare 13x6.5"',
    model: 'Pearl JJ1365N',
    drummerId: 2,
    drummerName: 'Joey Jordison',
    drummerSlug: 'joey-jordison',
    brand: 'Pearl',
    category: 'snare',
    gearType: 'Snare Drum',
    
    // Hero Section
    hero: {
      tagline: 'The Sound That Defined Nu-Metal',
      subtitle: 'The aggressive, cutting snare that powered Slipknot\'s most iconic albums',
      heroImage: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/JoeyJordison.jpg',
      badgeText: 'Signature Series',
    },
    
    // Story Section
    story: {
      title: 'A Legend\'s Weapon of Choice',
      content: `When Joey Jordison joined forces with Pearl Drums in 1999, the goal was clear: create a snare drum as aggressive and uncompromising as Slipknot's music itself. The result was the Pearl Joey Jordison Signature Snare—a 13x6.5" weapon that would define the sound of nu-metal and extreme drumming for a generation.

The development process was intense. Joey worked closely with Pearl's engineers to achieve a specific sound: a snare that could cut through nine musicians playing at maximum intensity while maintaining the crack and body needed for both blast beats and groove-heavy passages. The smaller 13" diameter was unconventional for metal at the time, but it proved to be the secret weapon.

"I wanted something that sounded like a gunshot," Joey explained in a 2004 Modern Drummer interview. "Not warm and pretty—I wanted pure aggression. The 13-inch size gives me that tight, focused crack that cuts through everything."

The Iowa Sessions (2001):
Joey recorded the entire Iowa album with this snare, creating what many consider the most intense drum recording in metal history. The snare's cutting attack punches through the album's dense, down-tuned guitar walls on tracks like "People = Shit," "Disasterpieces," and "The Heretic Anthem."

Production engineer Ross Robinson noted: "That snare was perfect for what we were trying to achieve. It had this almost violent quality—like it was attacking you. Most snares get lost in a mix that heavy, but Joey's cut through like nothing else."

Legacy:
The Pearl Joey Jordison Signature Snare became one of the best-selling signature drums in metal history. Its influence extended beyond Slipknot fans to death metal, hardcore, and industrial drummers seeking that same aggressive bite. Even after Joey's passing in 2021, the snare remains a favorite among metal drummers worldwide.`,
      images: [
        { src: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/JoeyJordison.jpg', alt: 'Joey Jordison with snare during Iowa sessions', caption: 'Iowa recording sessions, 2001' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/4/46/2006-07-06_snare_14.jpg', alt: 'Joey Jordison live performance', caption: 'Disasterpieces tour, 2002' },
      ],
    },
    
    // Specifications Section
    specs: {
      title: 'Technical Specifications',
      dimensions: {
        diameter: '13"',
        depth: '6.5"',
        shell: '6-ply maple with reinforcement rings',
        finish: 'Black Powder Coat / Chrome Hardware',
      },
      features: [
        {
          name: 'Shell Construction',
          value: '6-ply All Maple',
          description: 'Premium maple shell provides warm fundamental with excellent projection',
        },
        {
          name: 'Diameter',
          value: '13 inches',
          description: 'Smaller diameter for tighter, more focused attack',
        },
        {
          name: 'Depth',
          value: '6.5 inches',
          description: 'Standard depth for versatility and body',
        },
        {
          name: 'Bearing Edge',
          value: '45-degree',
          description: 'Sharp edge for maximum head-to-shell contact and attack',
        },
        {
          name: 'Snare Wires',
          value: '20-strand steel',
          description: 'Sensitive response for ghost notes and aggressive crack for rimshots',
        },
        {
          name: 'Lugs',
          value: '8 Bridge Lugs',
          description: 'Low-mass design for maximum shell resonance',
        },
        {
          name: 'Strainer',
          value: 'Pearl SR-150 Gladiator',
          description: 'Quick-release mechanism with precise tension adjustment',
        },
        {
          name: 'Weight',
          value: 'Approximately 11 lbs (5 kg)',
          description: 'Substantial weight for stability and tone',
        },
      ],
      tuningTips: [
        'Joey tuned the batter head medium-tight for maximum crack and rebound',
        'Resonant head should be slightly tighter than batter for snare sensitivity',
        'Use moon gels or tape to control overtones for recording',
        'For the authentic Iowa sound, crank the snare wires tight',
      ],
    },
    
    // Sound Section with YouTube embeds
    sound: {
      title: 'Hear It In Action',
      description: 'The Pearl Joey Jordison Signature Snare defined the sound of Slipknot\'s most aggressive era. Listen to these iconic tracks to hear its cutting attack.',
      videos: [
        {
          youtubeId: 'tUibKh0Z--c',
          title: 'Disasterpieces Drum Solo - Joey Jordison',
          description: 'Joey\'s legendary drum solo showcasing the snare\'s full range',
          year: 2002,
        },
        {
          youtubeId: 'zRS9uKs3Rlk',
          title: 'People = Shit - Drum Cam (London 2002)',
          description: 'Raw drum cam footage demonstrating the snare\'s cutting attack',
          year: 2002,
        },
        {
          youtubeId: 'RdXMcj7xv20',
          title: 'Joey Jordison Drum Cam Compilation',
          description: 'Multiple songs featuring the signature snare sound',
          year: 2000,
        },
      ],
      featuredTracks: [
        { song: 'People = Shit', album: 'Iowa (2001)', note: 'The opening snare hits define the album' },
        { song: 'Disasterpieces', album: 'Iowa (2001)', note: 'Blast beats with crystal-clear snare articulation' },
        { song: 'The Heretic Anthem', album: 'Iowa (2001)', note: 'Aggressive groove showcasing the snare\'s cut' },
        { song: 'Duality', album: 'Vol. 3 (2004)', note: 'Iconic rimshot pattern on intro and verse' },
      ],
    },
    
    // Affiliate CTAs
    affiliate: {
      title: 'Get This Gear',
      description: 'Ready to get that legendary Jordison crack? Here\'s where to find the Pearl Joey Jordison Signature Snare.',
      currentPrice: {
        range: '$400-550',
        note: 'Prices vary by finish and availability',
      },
      alternatives: [
        {
          name: 'Pearl Sensitone Heritage Alloy 13x6.5"',
          price: '$299-399',
          reason: 'Similar size, aggressive attack, more affordable',
        },
        {
          name: 'Pearl Masters Maple Complete 13x6.5"',
          price: '$450-550',
          reason: 'Same shell size, professional quality',
        },
      ],
      retailers: [
        { name: 'Sweetwater', url: 'https://www.sweetwater.com', logo: '/images/retailers/sweetwater.svg' },
        { name: 'Thomann', url: 'https://www.thomann.de', logo: '/images/retailers/thomann.svg' },
        { name: 'Guitar Center', url: 'https://www.guitarcenter.com', logo: '/images/retailers/guitarcenter.svg' },
      ],
      usedMarket: {
        note: 'Original production models are highly collectible',
        priceRange: '$350-500',
        tips: 'Look for models with original Pearl lugs and strainer. Check for dents in the bearing edges.',
      },
    },
    
    // Used On (albums/tours)
    usedOn: {
      title: 'Featured On These Recordings',
      albums: [
        {
          title: 'Iowa',
          artist: 'Slipknot',
          year: 2001,
          cover: '/images/albums/iowa.webp',
          note: 'The definitive Joey Jordison drum sound',
        },
        {
          title: 'Vol. 3: (The Subliminal Verses)',
          artist: 'Slipknot',
          year: 2004,
          cover: '/images/albums/vol3.webp',
          note: 'More refined but still aggressive',
        },
        {
          title: 'All Hope Is Gone',
          artist: 'Slipknot',
          year: 2008,
          cover: '/images/albums/all-hope-is-gone.webp',
          note: 'Grammy-winning drum performances',
        },
        {
          title: 'Beyond the Valley of the Murderdolls',
          artist: 'Murderdolls',
          year: 2002,
          cover: '/images/albums/murderdolls.webp',
          note: 'Joey\'s side project with the same snare',
        },
      ],
      tours: [
        'Tattoo the Earth Festival (2000)',
        'Iowa World Tour (2001-2002)',
        'Disasterpieces Tour (2002)',
        'Subliminal Verses World Tour (2004-2005)',
        'All Hope Is Gone World Tour (2008-2009)',
      ],
    },
    
    // Similar Gear Section
    similarGear: {
      title: 'Similar Gear You Might Like',
      items: [
        {
          name: 'Pearl Sensitone Heritage Alloy 13x6.5"',
          slug: 'pearl-sensitone-heritage-alloy',
          image: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Pearl_MCX_snare_drum.JPG',
          price: '$299-399',
          reason: 'Similar aggressive attack, great alternative',
        },
        {
          name: 'Tama S.L.P. G-Maple 14x6"',
          slug: 'tama-slp-g-maple',
          image: 'https://upload.wikimedia.org/wikipedia/commons/4/46/2006-07-06_snare_14.jpg',
          price: '$400-500',
          reason: 'Maple attack with diagonal grain projection',
        },
        {
          name: 'DW Performance Series 13x6.5"',
          slug: 'dw-performance-series-snare',
          image: 'https://upload.wikimedia.org/wikipedia/commons/4/46/2006-07-06_snare_14.jpg',
          price: '$449-549',
          reason: 'Same size, premium maple construction',
        },
      ],
      drummerAlternatives: [
        {
          drummer: 'Eloy Casagrande',
          drummerSlug: 'eloy-casagrande',
          snare: 'Tama S.L.P. Sonic Steel 14x6"',
          note: 'Current Slipknot drummer\'s choice',
        },
        {
          drummer: 'Jay Weinberg',
          drummerSlug: 'jay-weinberg',
          snare: 'Pearl Reference 14x5"',
          note: 'Slipknot\'s second drummer (2014-2023)',
        },
      ],
    },
    
    // Discussion/Community Section
    discussion: {
      title: 'Join the Discussion',
      topics: [
        'What\'s your favorite Joey Jordison snare moment?',
        'How do you tune your signature snare?',
        'Share your gear setup inspired by Joey',
      ],
      relatedDrummers: [2, 21, 7], // Joey, Jay Weinberg, Eloy
    },
    
    // SEO Data
    seo: {
      title: 'Pearl Joey Jordison Signature Snare 13x6.5" - Complete Guide | MetalForge',
      description: 'Discover the Pearl Joey Jordison Signature Snare that defined Slipknot\'s sound. Full specs, story, videos, and buying guide for the legendary 13x6.5" maple snare.',
      keywords: [
        'joey jordison snare',
        'pearl joey jordison signature',
        'slipknot snare drum',
        'joey jordison drum gear',
        'iowa snare drum',
        'pearl jj1365n',
        '13 inch snare drum',
        'nu metal snare',
      ],
      ogImage: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/JoeyJordison.jpg',
    },
    
    // Schema.org Data
    schema: {
      type: 'Product',
      brand: 'Pearl',
      model: 'Joey Jordison Signature Snare JJ1365N',
      category: 'Musical Instruments > Drums > Snare Drums',
    },
    
    // Metadata
    datePublished: '2026-03-20',
    dateModified: '2026-03-20',
    author: 'MetalForge Editorial',
    status: 'published',
    priority: 1, // Priority in the #739 issue list
  },
  
  // ==========================================
  // #2 PRIORITY: Lars Ulrich's 20" Paiste Rude China
  // ==========================================
  'lars-ulrich-paiste-rude-china': {
    slug: 'lars-ulrich-paiste-rude-china',
    name: 'Paiste 20" Rude China',
    fullName: 'Paiste 20" RUDE Wild China',
    model: 'Paiste RUDE 20" Wild China',
    drummerId: 1,
    drummerName: 'Lars Ulrich',
    drummerSlug: 'lars-ulrich',
    brand: 'Paiste',
    category: 'cymbal',
    gearType: 'China Cymbal',
    
    hero: {
      tagline: 'The Thrash Metal China',
      subtitle: 'The aggressive, trashy china that defined Metallica\'s cymbal sound',
      heroImage: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Lars_Ulrich_2025_Marvel_Stadium_%286%29.jpg',
      badgeText: 'Legendary',
    },
    
    story: {
      title: 'The Sound of Thrash',
      content: `Lars Ulrich's use of the Paiste RUDE China cymbal helped define the sound of thrash metal in the 1980s. Before Lars, china cymbals were rarely used in heavy music. After the Black Album era, they became essential to the metal drummer's arsenal.

The RUDE series was designed specifically for heavy hitters. The "Wild" designation indicates an unlathed bell and aggressive, cutting overtones that slice through any mix. At 20 inches, this china provides the perfect balance of explosive attack and sustain.

Lars discovered the RUDE series during the recording of "...And Justice for All" (1988) and never looked back. The china's trashy, aggressive quality became a signature element of Metallica's live sound, punctuating riffs and marking transitions with unmistakable authority.

Recording engineer Bob Rock noted during the Black Album sessions: "That china cut through everything. Even in the densest parts, you knew exactly when Lars hit it. It became as recognizable as James's rhythm tone."`,
      images: [],
    },
    
    specs: {
      title: 'Technical Specifications',
      dimensions: {
        diameter: '20"',
        weight: 'Heavy',
        alloy: 'CuSn8 Bronze',
        finish: 'Unlathed Bell, Lathed Bow',
      },
      features: [
        { name: 'Diameter', value: '20 inches', description: 'Full-size china for maximum projection' },
        { name: 'Weight', value: 'Heavy', description: 'Designed for powerful, aggressive playing' },
        { name: 'Bell', value: 'Unlathed', description: 'Raw bell for cutting attack' },
        { name: 'Edge', value: 'Upturned', description: 'Traditional china edge for trashy decay' },
        { name: 'Alloy', value: 'CuSn8 Bronze', description: 'Paiste\'s signature bronze formula' },
      ],
      tuningTips: [
        'Mount at a slight angle for optimal stick attack',
        'Heavier felts will control wobble and sustain',
        'Position for easy reach during fill transitions',
      ],
    },
    
    sound: {
      title: 'Hear It In Action',
      description: 'The RUDE China\'s trashy attack cuts through Metallica\'s heaviest moments.',
      videos: [
        { youtubeId: 'A96QtqEpqUA', title: 'Sad But True - Drum Cam', description: 'China accents throughout', year: 2023 },
        { youtubeId: 'Z_qLd2uj21w', title: 'For Whom The Bell Tolls - Lars Angle', description: 'Classic Metallica drum footage', year: 1997 },
      ],
      featuredTracks: [
        { song: 'Enter Sandman', album: 'Metallica (1991)', note: 'Iconic china crashes in the verse' },
        { song: 'Sad But True', album: 'Metallica (1991)', note: 'Aggressive accents throughout' },
        { song: 'One', album: '...And Justice for All (1988)', note: 'Dramatic china hits in the heavy section' },
      ],
    },
    
    affiliate: {
      title: 'Get This Gear',
      description: 'The Paiste RUDE 20" Wild China remains in production and available worldwide.',
      currentPrice: { range: '$350-450', note: 'Price varies by retailer' },
      alternatives: [
        { name: 'Paiste 2002 20" China', price: '$300-350', reason: 'Slightly warmer alternative' },
        { name: 'Sabian AAX 20" Chinese', price: '$280-350', reason: 'Similar aggression, different voice' },
      ],
      retailers: [
        { name: 'Sweetwater', url: 'https://www.sweetwater.com', logo: '/images/retailers/sweetwater.svg' },
        { name: 'Thomann', url: 'https://www.thomann.de', logo: '/images/retailers/thomann.svg' },
      ],
    },
    
    usedOn: {
      title: 'Featured On These Recordings',
      albums: [
        { title: 'Metallica (Black Album)', artist: 'Metallica', year: 1991, cover: '/images/albums/black-album.webp', note: 'Peak Lars china sound' },
        { title: '...And Justice for All', artist: 'Metallica', year: 1988, cover: '/images/albums/justice.webp', note: 'First album with RUDE china' },
      ],
      tours: ['Black Album Tour (1991-1993)', 'Reload Tour (1997-1999)', 'Death Magnetic Tour (2008-2010)'],
    },
    
    similarGear: {
      title: 'Similar Gear',
      items: [
        { name: 'Paiste 2002 20" China', slug: 'paiste-2002-china', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/SABIAN_Paragon_Ride_Limited_Edition_Steampunk.jpg', price: '$300-350', reason: 'Classic Paiste china tone' },
        { name: 'Zildjian Oriental 20" China Trash', slug: 'zildjian-oriental-china', image: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Zildjian_Quick_Beat_Hi_Hat_15.jpg', price: '$280-350', reason: 'Alternative metal china' },
      ],
      drummerAlternatives: [],
    },
    
    discussion: {
      title: 'Join the Discussion',
      topics: ['Best china placement tips', 'RUDE vs 2002 - which do you prefer?'],
      relatedDrummers: [1, 4, 9],
    },
    
    seo: {
      title: 'Paiste RUDE 20" Wild China - Lars Ulrich\'s Signature Sound | MetalForge',
      description: 'Explore the Paiste RUDE 20" Wild China cymbal that defined Metallica\'s cymbal sound. Full specs, videos, and buying guide.',
      keywords: ['lars ulrich china', 'paiste rude china', 'metallica cymbal', 'thrash metal china'],
      ogImage: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Lars_Ulrich_2025_Marvel_Stadium_%286%29.jpg',
    },
    
    schema: {
      type: 'Product',
      brand: 'Paiste',
      model: 'RUDE 20" Wild China',
      category: 'Musical Instruments > Cymbals > China Cymbals',
    },
    
    datePublished: '2026-03-20',
    dateModified: '2026-03-20',
    author: 'MetalForge Editorial',
    status: 'draft',
    priority: 2,
  },
  
  // ==========================================
  // #3 PRIORITY: Danny Carey's Paiste Giant Beat Gongs
  // ==========================================
  'danny-carey-paiste-giant-beat-gongs': {
    slug: 'danny-carey-paiste-giant-beat-gongs',
    name: 'Paiste Giant Beat Gongs',
    fullName: 'Paiste Giant Beat Multi Gong 38"',
    model: 'Paiste Giant Beat Multi Gong',
    drummerId: 14,
    drummerName: 'Danny Carey',
    drummerSlug: 'danny-carey',
    brand: 'Paiste',
    category: 'cymbal',
    gearType: 'Gong',

    hero: {
      tagline: 'The Cosmic Heartbeat of Tool',
      subtitle: 'The massive Paiste gongs that define Tool\'s expansive, atmospheric sound',
      heroImage: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Danny_Carey_Hellfest_2019.jpg',
      badgeText: 'Iconic Setup',
    },

    story: {
      title: 'Tool\'s Signature Sonic Dimension',
      content: `Danny Carey has been a Paiste artist since the early days of Tool, and no element of his kit better illustrates his approach to drumming as architecture than his signature Paiste Giant Beat Gongs. Where most metal drummers reach for speed and impact, Carey reaches for space — and the gong is the ultimate space-maker.

The Paiste Giant Beat series traces its roots to 1963, originally designed for orchestral use and big-band performance. Carey adopted these instruments not merely for dramatic effect but as a compositional tool: the gong's slowly building overtone cloud transforms a percussive attack into a sustained, evolving texture that interacts with Tool's layered guitars and bass in ways a cymbal never could.

Carey's live rig has featured multiple gongs simultaneously. A 38" Symphonic Gong anchors the left side of his massive Sonor kit, while a 60" Earth Gong looms behind him — one of the largest gongs deployed in a rock context. The Giant Beat Multi Gong earns its place because of its balanced response: the B8 bronze formula delivers a clear fundamental surrounded by rich, controllable overtones rather than the unruly wash of cheaper gong alloys.

The Recording Dimension:
On Fear Inoculum (2019), gong textures appear throughout the album's hour-plus runtime. "Pneuma" opens with atmospheric gong swells that establish the album's ceremonial mood before the band enters. "Invincible" uses sustained gong underpinning to create a sense of inevitability beneath its martial rhythm. These are not ornamental touches — they are structural pillars of the arrangement.

Earlier, "Third Eye" from Ænima (1996) introduced many listeners to the gong's role in Tool's palette, with Carey building from silence through escalating gong hits before the full band arrives. On Lateralus (2001), gong accents punctuate key structural moments, emphasizing transitions between Tool's complex, shifting time signatures.

Carey's technique with the gong is as deliberate as his polyrhythmic drumming. He uses a variety of mallets — from soft felt for gentle swells to hard beaters for explosive crashes — and will often damp the gong with his hand or a cloth to control sustain. The result is a dynamic range that mirrors the full emotional arc of Tool's music: from whispered contemplation to overwhelming force.

The Paiste Giant Beat Multi Gong remains in production today, played by symphonic percussionists and adventurous rock drummers alike. In the hands of Danny Carey, it became something more: a symbol of drumming's capacity to conjure atmosphere, space, and ceremony at the same time as power and precision.`,
      images: [
        { src: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Danny_Carey_Hellfest_2019.jpg', alt: 'Danny Carey performing with Paiste gongs', caption: 'Fear Inoculum Tour setup featuring the Paiste Giant Beat Gong' },
      ],
    },

    specs: {
      title: 'Technical Specifications',
      dimensions: {
        diameter: '38"',
        alloy: 'B8 Bronze (CuSn8)',
        finish: 'Brilliant / Natural',
        weight: 'Heavy',
      },
      features: [
        {
          name: 'Diameter',
          value: '38 inches',
          description: 'Large format for maximum sustain and overtone complexity',
        },
        {
          name: 'Alloy',
          value: 'B8 CuSn8 Bronze',
          description: 'Paiste\'s signature bronze formula for balanced fundamental and overtones',
        },
        {
          name: 'Surface',
          value: 'Lathed bands and unlathed areas',
          description: 'Multi-tone character — the Giant Beat is voiced differently from a pure symphonic gong',
        },
        {
          name: 'Mallet Response',
          value: 'Full range — soft to hard beaters',
          description: 'Responds across the full mallet spectrum from gentle swells to explosive attacks',
        },
        {
          name: 'Sustain',
          value: 'Very long — 15–30+ seconds',
          description: 'Enables the layered, evolving textures central to Tool\'s sound',
        },
        {
          name: 'Series Heritage',
          value: 'Introduced 1963',
          description: 'One of Paiste\'s oldest series, trusted by orchestral and rock players for over 60 years',
        },
      ],
      tuningTips: [
        'Use a soft felt mallet for gentle swells; a hard flannel mallet for mid attack; a hard beater for full explosion',
        'Damp with your palm or a cloth to cut sustain and control feedback in live mixes',
        'Position slightly angled toward you so overtones project into the room rather than upward',
        'Multiple gongs at different sizes (e.g., 26" + 38") let you layer contrasting tonal characters',
      ],
    },

    sound: {
      title: 'Hear It In Action',
      description: 'Danny Carey\'s gong work adds a cinematic, ceremonial dimension to Tool\'s music. These videos capture the gong\'s role in live and studio contexts.',
      videos: [
        {
          youtubeId: 'C6ff5fjhFAU',
          title: 'Danny Carey (TOOL) - Schism (Drumcam) Live',
          description: 'Full drum cam showing Carey\'s complete Paiste setup including the giant gong array',
          year: 2011,
        },
        {
          youtubeId: 'q1DBRu-VIx4',
          title: 'Danny Carey — Paiste Cymbal & Gong Setup Walkthrough',
          description: 'Danny Carey personally explains his Paiste setup including the Giant Beat Gongs during the Tool tour',
          year: 2019,
        },
      ],
      featuredTracks: [
        { song: 'Pneuma', album: 'Fear Inoculum (2019)', note: 'Gong swells open the album with ceremonial atmosphere' },
        { song: 'Third Eye', album: 'Ænima (1996)', note: 'Builds from gong silence to full-band eruption' },
        { song: 'Invincible', album: 'Fear Inoculum (2019)', note: 'Sustained gong underpins the track\'s monumental feel' },
        { song: 'Lateralus', album: 'Lateralus (2001)', note: 'Gong accents mark key structural transitions' },
      ],
    },

    affiliate: {
      title: 'Get This Gear',
      description: 'The Paiste Giant Beat Gong series is available in multiple sizes. The 38" model used by Danny Carey is the flagship.',
      currentPrice: {
        range: '$1500-2500',
        note: 'Prices vary significantly by size; 38" is the premium tier',
      },
      alternatives: [
        {
          name: 'Paiste Giant Beat 26" Gong',
          price: '$700-1000',
          reason: 'Smaller format, same alloy and character — more affordable entry point',
        },
        {
          name: 'Meinl Sonic Energy Symphonic Gong 32"',
          price: '$900-1200',
          reason: 'Strong orchestral alternative at a slightly lower price',
        },
      ],
      retailers: [
        { name: 'Sweetwater', url: 'https://www.sweetwater.com', logo: '/images/retailers/sweetwater.svg' },
        { name: 'Thomann', url: 'https://www.thomann.de', logo: '/images/retailers/thomann.svg' },
        { name: 'Guitar Center', url: 'https://www.guitarcenter.com', logo: '/images/retailers/guitarcenter.svg' },
      ],
      usedMarket: {
        note: 'Large gongs rarely appear used — players tend to keep them',
        priceRange: '$800-1800',
        tips: 'Inspect for cracks near the rim and center boss; check the mounting eyelet is intact and undistorted.',
      },
    },

    usedOn: {
      title: 'Featured On These Recordings',
      albums: [
        {
          title: 'Fear Inoculum',
          artist: 'Tool',
          year: 2019,
          cover: '/images/albums/fear-inoculum.webp',
          note: 'Gong textures appear throughout the hour-long album',
        },
        {
          title: 'Lateralus',
          artist: 'Tool',
          year: 2001,
          cover: '/images/albums/lateralus.webp',
          note: 'Gong accents emphasize structural shifts across the album',
        },
        {
          title: 'Ænima',
          artist: 'Tool',
          year: 1996,
          cover: '/images/albums/aenima.webp',
          note: 'Third Eye features defining gong architecture',
        },
      ],
      tours: [
        'Fear Inoculum World Tour (2019–2023)',
        'Lateralus Tour (2001–2002)',
        'Lollapalooza appearances',
      ],
    },

    similarGear: {
      title: 'Similar Gear You Might Like',
      items: [
        {
          name: 'Paiste Symphonic Gong 32"',
          slug: 'paiste-symphonic-gong',
          image: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/SABIAN_Paragon_Ride_Limited_Edition_Steampunk.jpg',
          price: '$900-1400',
          reason: 'Purer orchestral voice from the same Paiste stable',
        },
        {
          name: 'Meinl Sonic Energy Gong 32"',
          slug: 'meinl-sonic-energy-gong',
          image: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Cymbal_Hammering.JPG',
          price: '$900-1200',
          reason: 'Quality orchestral gong at a competitive price',
        },
      ],
      drummerAlternatives: [
        {
          drummer: 'Tomas Haake',
          drummerSlug: 'tomas-haake',
          snare: 'Pearl Reference Pure + Custom Electronics',
          note: 'Fellow progressive metal titan who layers electronics with acoustic percussion',
        },
        {
          drummer: 'Mario Duplantier',
          drummerSlug: 'mario-duplantier',
          snare: 'Tama Starphonic Bronze Snare',
          note: 'Another progressive metal drummer known for rich, textural drumming',
        },
      ],
    },

    faq: [
      {
        question: 'What gong sizes does Danny Carey use?',
        answer: 'Danny Carey\'s live setup has featured a 38" Paiste Giant Beat Multi Gong as the primary gong, alongside a massive 60" Paiste Earth Gong positioned behind his kit. The two gongs provide contrasting tonal characters — the 38" delivers a more focused, articulate attack while the 60" creates enormous, room-filling sustain.',
      },
      {
        question: 'What is the difference between the Paiste Giant Beat Gong and a Symphonic Gong?',
        answer: 'The Giant Beat series was designed for rock and large ensemble use, featuring a combination of lathed and unlathed surface areas that give it a more complex, multi-tonal character compared to the purer fundamental of a Symphonic Gong. The Giant Beat has a slightly brighter, more aggressive initial attack alongside the characteristic long sustain. For pure orchestral work, the Symphonic Gong is preferred; for rock and mixed-use applications, the Giant Beat\'s versatility makes it ideal.',
      },
      {
        question: 'Can I use a Paiste Giant Beat Gong in a metal band without it sounding out of place?',
        answer: 'Absolutely — Danny Carey has proven that gongs enhance rather than clash with heavy music when used thoughtfully. The key is placement and technique: use the gong to build atmosphere before a song begins, mark major transitions, or sustain through quiet passages. Avoid hitting it on every beat, which would create an undifferentiated wash. The gong works best as an architectural element that defines the start and end of sections.',
      },
      {
        question: 'What mallets does Danny Carey use to strike the gong?',
        answer: 'Danny Carey uses a range of mallets matched to the dynamic moment. Soft felt mallets produce slow-building swells ideal for atmospheric intros. Medium flannel mallets generate a more present, tonal strike. Hard beaters produce an explosive initial impact with maximum volume. He also uses his hand to damp the gong during transitions, giving him real-time control over sustain in a live context.',
      },
    ],

    discussion: {
      title: 'Join the Discussion',
      topics: [
        'How do you incorporate gongs into your live setup?',
        'Giant Beat vs. Symphonic Gong — which do you prefer?',
        'Share your favorite Tool gong moment',
      ],
      relatedDrummers: [14, 7, 15],
    },

    seo: {
      title: 'Danny Carey Paiste Giant Beat Gongs — Tool Drummer\'s Iconic Setup | MetalForge',
      description: 'Explore the Paiste Giant Beat Gongs that define Danny Carey\'s Tool drumming. Full specs, story, videos, and buying guide for the legendary 38" gong setup.',
      keywords: [
        'danny carey paiste gongs',
        'tool drummer gongs',
        'paiste giant beat gong',
        'danny carey drum kit',
        'tool drum setup',
        'paiste gong 38 inch',
        'progressive metal gong',
        'danny carey paiste',
      ],
      ogImage: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Danny_Carey_Hellfest_2019.jpg',
    },

    schema: {
      type: 'Product',
      brand: 'Paiste',
      model: 'Giant Beat Multi Gong 38"',
      category: 'Musical Instruments > Percussion > Gongs',
    },

    datePublished: '2026-06-19',
    dateModified: '2026-06-19',
    author: 'MetalForge Editorial',
    status: 'published',
    priority: 3,
  },

  // ==========================================
  // #4 PRIORITY: Mario Duplantier's Tama Starphonic Bronze Snare
  // ==========================================
  'mario-duplantier-tama-starphonic-bronze': {
    slug: 'mario-duplantier-tama-starphonic-bronze',
    name: 'Tama Starphonic Bronze Snare',
    fullName: 'Tama Starphonic Bronze Snare 14x5"',
    model: 'Tama Starphonic SBR145',
    drummerId: 15,
    drummerName: 'Mario Duplantier',
    drummerSlug: 'mario-duplantier',
    brand: 'Tama',
    category: 'snare',
    gearType: 'Snare Drum',

    hero: {
      tagline: 'Gojira\'s Percussive Edge',
      subtitle: 'The cutting bronze snare that drives Gojira\'s crushing progressive death metal',
      heroImage: 'https://upload.wikimedia.org/wikipedia/commons/8/83/2017_RiP_-_Gojira_-_Mario_Duplantier_-_by_2eight_-_8SC9168.jpg',
      badgeText: 'Signature Setup',
    },

    story: {
      title: 'The Snare Behind the Riff',
      content: `Mario Duplantier is widely recognized as one of the most complete drummers in modern metal — a player whose technique, power, and musical intelligence have helped make Gojira one of the most critically acclaimed heavy bands of the 21st century. Central to his sound is his relationship with Tama drums, and the Starphonic Bronze snare is the cutting edge of that setup.

Tama's Starphonic series was designed as a premium single-ply, single-material snare range — each drum built from one type of shell for maximum tonal purity. The Bronze version uses a 1.2mm spun bronze shell that delivers a character distinct from steel or brass: harder and brighter than brass but with a warmer low-end body than steel. The result is a snare with exceptional projection, a crisp crack that cuts through dense guitar tones, and enough body to remain musical at low dynamics.

Mario Duplantier's drumming style demands exactly this profile. Gojira's music operates across a wide dynamic range — from nearly whispered passages to walls of down-tuned guitar — and the snare needs to be audible and articulate at every level. The Starphonic Bronze delivers where lesser drums smear into the mix.

The Gojira Drum Room:
Mario has contributed significantly to Gojira's recording sessions as both drummer and producer, often working alongside his brother and guitarist Joe Duplantier. This insider knowledge of the recording process means Mario understands exactly what his snare needs to do on tape: cut, sustain at the correct length, and trigger clearly in the transient register. The Starphonic Bronze's single-ply construction minimizes internal reflections, producing a fast, clean transient that is easy to compress and eq without smearing.

On Magma (2016), considered by many to be Gojira's most polished production, the snare sits front and center in the mix. "Stranded" — the album's breakout track and a song that introduced Gojira to a mainstream audience — showcases the snare's combination of crack and warmth. The backbeat hits with authority without sounding thin or brittle. On L'Enfant Sauvage (2012), the title track opens with one of metal's most recognizable drum intros: a series of powerful, perfectly placed snare hits that set the tempo and tone for the entire album.

Mario's technique amplifies the drum's natural character. He plays with significant power and accuracy, generating consistent attack velocity that allows the bronze shell's full character to emerge. His use of rimshots is selective and precise — rather than hitting the rim on every backbeat, he uses the technique for emphasis, creating a dynamic contrast that makes every rimshot feel earned.

The Tama Starphonic Bronze Snare is not the most common snare choice in extreme metal, which is precisely what makes it interesting. In an environment dominated by steel and aluminum, the bronze voice cuts from a different frequency pocket — and in Mario Duplantier's hands, that difference defines a generation of progressive death metal drumming.`,
      images: [
        { src: 'https://upload.wikimedia.org/wikipedia/commons/8/83/2017_RiP_-_Gojira_-_Mario_Duplantier_-_by_2eight_-_8SC9168.jpg', alt: 'Mario Duplantier in the studio with his Tama setup', caption: 'Mario Duplantier recording with Gojira' },
      ],
    },

    specs: {
      title: 'Technical Specifications',
      dimensions: {
        diameter: '14"',
        depth: '5"',
        shell: '1.2mm Spun Bronze',
        finish: 'Natural Bronze',
      },
      features: [
        {
          name: 'Shell Material',
          value: 'Single-ply Spun Bronze',
          description: 'Pure bronze shell for maximum tonal purity and a bright, cutting voice',
        },
        {
          name: 'Diameter',
          value: '14 inches',
          description: 'Standard diameter — familiar feel with broad head selection available',
        },
        {
          name: 'Depth',
          value: '5 inches',
          description: 'Shallower depth for a faster, more focused response compared to deeper snares',
        },
        {
          name: 'Hoops',
          value: '2.3mm Triple-flanged',
          description: 'Triple-flanged steel hoops for sensitive snare response and consistent rimshot tone',
        },
        {
          name: 'Snare Wires',
          value: '20-strand steel',
          description: 'Tight response across the full dynamic range',
        },
        {
          name: 'Bearing Edge',
          value: '45-degree',
          description: 'Sharp edge for maximum head contact and attack articulation',
        },
      ],
      tuningTips: [
        'Mario tunes the batter head medium-high for articulate attack without excessive ring',
        'The bronze shell rewards slightly higher tension than steel — experiment above your usual range',
        'A single moon gel or piece of tape near the edge tames the bronze overtone character for recording',
        'For the Gojira live sound, minimal dampening and higher tension are the key',
      ],
    },

    sound: {
      title: 'Hear It In Action',
      description: 'Mario Duplantier\'s snare work is inseparable from Gojira\'s sound. These videos capture his technique and the Tama bronze snare\'s cutting character.',
      videos: [
        {
          youtubeId: 'R2zTNT2YPZE',
          title: 'Mario Duplantier — Gojira "The Art of Dying" (Tama Drums Official)',
          description: 'Mario demonstrating his Tama setup on a classic Gojira track for the official Tama channel',
          year: 2019,
        },
        {
          youtubeId: 'UhHz_2Bo0Cs',
          title: 'Mario Duplantier Drum Solo 2024 "ARMOR"',
          description: 'Mario\'s solo performance showcasing his full dynamic range and snare technique',
          year: 2024,
        },
      ],
      featuredTracks: [
        { song: 'Stranded', album: 'Magma (2016)', note: 'Snare sits front and center in Gojira\'s most accessible production' },
        { song: 'L\'Enfant Sauvage', album: 'L\'Enfant Sauvage (2012)', note: 'Opening snare hits define the album\'s intensity' },
        { song: 'Flying Whales', album: 'From Mars to Sirius (2005)', note: 'Intricate snare patterns in the complex middle section' },
        { song: 'The Heaviest Matter of the Universe', album: 'From Mars to Sirius (2005)', note: 'Driving double bass and snare work at extreme tempos' },
      ],
    },

    affiliate: {
      title: 'Get This Gear',
      description: 'The Tama Starphonic Bronze is a premium single-ply snare available from authorized Tama dealers worldwide.',
      currentPrice: {
        range: '$350-500',
        note: 'Price varies by retailer and current availability',
      },
      alternatives: [
        {
          name: 'Tama Starphonic Steel 14x6.5"',
          price: '$300-400',
          reason: 'Brighter, more cutting — slightly more aggressive attack character',
        },
        {
          name: 'Tama S.L.P. Sonic Steel 14x5"',
          price: '$350-450',
          reason: 'Similar single-ply philosophy from Tama\'s premium range',
        },
      ],
      retailers: [
        { name: 'Sweetwater', url: 'https://www.sweetwater.com', logo: '/images/retailers/sweetwater.svg' },
        { name: 'Thomann', url: 'https://www.thomann.de', logo: '/images/retailers/thomann.svg' },
        { name: 'Guitar Center', url: 'https://www.guitarcenter.com', logo: '/images/retailers/guitarcenter.svg' },
      ],
      usedMarket: {
        note: 'Starphonic drums hold value well and are occasionally found used from retiring players',
        priceRange: '$200-350',
        tips: 'Check the bearing edges closely — single-ply shells are more susceptible to dents. Inspect the seam weld on bronze models.',
      },
    },

    usedOn: {
      title: 'Featured On These Recordings',
      albums: [
        {
          title: 'Magma',
          artist: 'Gojira',
          year: 2016,
          cover: '/images/albums/gojira-magma.webp',
          note: 'Gojira\'s most polished production — snare front and center',
        },
        {
          title: 'L\'Enfant Sauvage',
          artist: 'Gojira',
          year: 2012,
          cover: '/images/albums/gojira-lenfant-sauvage.webp',
          note: 'Complex arrangements with surgical snare precision',
        },
        {
          title: 'From Mars to Sirius',
          artist: 'Gojira',
          year: 2005,
          cover: '/images/albums/gojira-from-mars-to-sirius.webp',
          note: 'The breakout album that established Mario as a world-class drummer',
        },
      ],
      tours: [
        'Magma World Tour (2016–2018)',
        'L\'Enfant Sauvage Tour (2012–2013)',
        'Download Festival (multiple years)',
        'Ozzfest appearances',
      ],
    },

    similarGear: {
      title: 'Similar Gear You Might Like',
      items: [
        {
          name: 'Tama Starphonic Steel 14x5"',
          slug: 'tama-starphonic-steel',
          image: 'https://upload.wikimedia.org/wikipedia/commons/4/46/2006-07-06_snare_14.jpg',
          price: '$280-380',
          reason: 'Same Starphonic series — brighter, more cutting attack character',
        },
        {
          name: 'Pearl Sensitone Premium Brass 14x5"',
          slug: 'pearl-sensitone-premium-brass',
          image: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Pearl_MCX_snare_drum.JPG',
          price: '$300-400',
          reason: 'Warm brass character at a competitive price',
        },
      ],
      drummerAlternatives: [
        {
          drummer: 'Danny Carey',
          drummerSlug: 'danny-carey',
          snare: 'Sonor Danny Carey Signature 14x8" Bronze',
          note: 'Another progressive metal drummer with a bronze snare preference',
        },
        {
          drummer: 'Tomas Haake',
          drummerSlug: 'tomas-haake',
          snare: 'Pearl Custom Alloy Snare',
          note: 'Meshuggah\'s drummer — similarly precise snare placement in dense mixes',
        },
      ],
    },

    faq: [
      {
        question: 'What makes the Tama Starphonic Bronze different from other metal snares?',
        answer: 'The Starphonic Bronze uses a single-ply spun bronze shell rather than the multi-ply wood or steel constructions common in metal drumming. This single-ply approach eliminates internal reflections between shell layers, producing a faster, cleaner transient. Bronze sits between brass (warmer, less bright) and steel (brighter, less warm) in the tonal spectrum — delivering cutting attack with enough body to remain musical at low dynamics. For progressive metal like Gojira, this balance is exactly right.',
      },
      {
        question: 'How does Mario Duplantier tune his snare for Gojira\'s dense mix?',
        answer: 'Mario typically tunes the batter head at medium-to-high tension, allowing the snare\'s natural crack to project above Gojira\'s down-tuned, dense guitar tones. He uses minimal dampening — the bronze shell\'s overtone character is part of the sound rather than something to suppress. For recording, a single piece of tape near the rim is sometimes used to control the longest overtones without killing the drum\'s resonance.',
      },
      {
        question: 'Is the Tama Starphonic Bronze suitable for beginners?',
        answer: 'The Starphonic Bronze is a professional-grade instrument best suited to intermediate and advanced players who already understand snare tuning and head selection. Its single-ply construction is less forgiving of imprecise head tension and bearing edge contact than multi-ply shells, which are more tolerant of suboptimal tuning. That said, it is an extraordinary learning tool for developing ears — the bronze\'s clear voice makes tuning changes very audible, accelerating your ear training.',
      },
      {
        question: 'What drumheads does Mario Duplantier use on his snare?',
        answer: 'Mario has used Remo heads as part of his setup, typically opting for heads that maximize attack clarity. The Remo Ambassador Coated is a common choice for the batter head — it provides the right balance of attack and body without excessive sustain. For recording sessions, he may adjust based on the track\'s requirements, but the emphasis is consistently on clarity and projection over warmth.',
      },
    ],

    discussion: {
      title: 'Join the Discussion',
      topics: [
        'How do you tune your snare for dense, down-tuned guitar mixes?',
        'Bronze vs. steel snares — which do you prefer for metal?',
        'Share your favorite Mario Duplantier snare moment',
      ],
      relatedDrummers: [15, 14, 7],
    },

    seo: {
      title: 'Mario Duplantier Tama Starphonic Bronze Snare — Gojira\'s Drum Sound | MetalForge',
      description: 'Discover the Tama Starphonic Bronze snare behind Gojira\'s crushing sound. Full specs, Mario Duplantier story, videos, and buying guide.',
      keywords: [
        'mario duplantier tama snare',
        'gojira drummer snare',
        'tama starphonic bronze',
        'mario duplantier drum gear',
        'gojira drum setup',
        'tama starphonic sbr145',
        'progressive metal snare',
        'mario duplantier drums',
      ],
      ogImage: 'https://upload.wikimedia.org/wikipedia/commons/8/83/2017_RiP_-_Gojira_-_Mario_Duplantier_-_by_2eight_-_8SC9168.jpg',
    },

    schema: {
      type: 'Product',
      brand: 'Tama',
      model: 'Starphonic Bronze SBR145',
      category: 'Musical Instruments > Drums > Snare Drums',
    },

    datePublished: '2026-06-19',
    dateModified: '2026-06-19',
    author: 'MetalForge Editorial',
    status: 'published',
    priority: 4,
  },

  // ==========================================
  // #5 PRIORITY: Gene Hoglan's Pearl Reference Pure Kit
  // ==========================================
  'gene-hoglan-pearl-reference-kit': {
    slug: 'gene-hoglan-pearl-reference-kit',
    name: 'Pearl Reference Pure Kit',
    fullName: 'Pearl Reference Pure All-Maple Drum Kit',
    model: 'Pearl RFP (Reference Pure)',
    drummerId: 3,
    drummerName: 'Gene Hoglan',
    drummerSlug: 'gene-hoglan',
    brand: 'Pearl',
    category: 'kit',
    gearType: 'Drum Kit',

    hero: {
      tagline: 'The Atomic Clock\'s Arsenal',
      subtitle: 'The Pearl Reference Pure kit that powers Gene Hoglan\'s legendary precision and power',
      heroImage: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Gene_Hoglan_-_Testament_%28cropped%29.jpg',
      badgeText: 'Professional Series',
    },

    story: {
      title: 'Built for the Atomic Clock',
      content: `Gene Hoglan has earned a reputation over four decades as one of the most technically precise and physically powerful drummers in extreme metal. Nicknamed "The Atomic Clock" for the metronomic accuracy of his double bass work, and "The Atomic Clockwork" for the mechanical inevitability of his fills, Hoglan has defined the sound of thrash, death, and progressive metal across legendary bands including Dark Angel, Death, Testament, Strapping Young Lad, and Dethklok.

His relationship with Pearl Drums and specifically the Reference Pure series represents a meeting of equals: a kit engineered for maximum performance in the hands of a drummer who demands maximum performance from himself.

The Pearl Reference Pure series — identified by the RFP designation — uses all-maple shells, distinguishing it from the hybrid birch/maple construction of the standard Pearl Reference line. All-maple shells offer a warmer, fuller fundamental with a smooth, rounded top end compared to the brighter, more cutting birch/maple blend. For a player like Hoglan, who generates enormous velocity and power from his bass pedals and stick technique, the maple shell's ability to handle aggressive playing without becoming harsh or brittle is essential. What might sound clinical on a thinner or more resonant shell blooms into a controlled, articulate blast in the Reference Pure's maple structure.

Dark Angel and the Birth of Precision:
Gene Hoglan's career began in earnest with Dark Angel, recording the seminal albums Darkness Descends (1986) and Leave Scars (1989). While his kit was different in those early years, the drumming blueprint was established: blast beats delivered with note-perfect accuracy, double bass patterns that locked precisely with the band's crushing riffs, and an ability to play technically demanding music at speed without sacrificing musical feel. These qualities are what Pearl's Reference Pure series was engineered to support.

Death and Individual Thought Patterns:
Hoglan joined Death for Individual Thought Patterns (1993) and Human's follow-up, recording some of the most technically advanced death metal drumming in the genre's history. Chuck Schuldiner's compositions demanded a drummer who could navigate constant meter changes while keeping the music coherent — Hoglan delivered, and the Pearl Reference Pure's responsive shells give him the feedback he needs to place every stroke with surgical precision.

The Testament Years and Reference Pure:
During his extensive tenures with Testament — recording Formation of Damnation (2008), Dark Roots of Earth (2012), and Brotherhood of the Snake (2016) — Hoglan solidified his position as the essential thrash metal drummer of the modern era. The Reference Pure kit's combination of warmth and projection means it sits in Testament's dense, riff-heavy mixes without vanishing behind the guitars. Every tom fill, every kick pattern, every snare accent is audible and impactful even at the extreme volumes of Hoglan's playing style.

The Reference Pure Today:
Pearl's Reference Pure remains the flagship of their acoustic drum line. It is chosen by players who need a kit that performs equally well in the recording studio and on large festival stages. For Gene Hoglan, whose career has spanned intimate club shows with Strapping Young Lad and headlining festival appearances with Testament, the kit's versatility across acoustic environments is as important as its tonal character.`,
      images: [
        { src: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Gene_Hoglan_-_Testament_%28cropped%29.jpg', alt: 'Gene Hoglan performing with Pearl Reference Pure kit', caption: 'Gene Hoglan with Testament on the Formation of Damnation tour' },
      ],
    },

    specs: {
      title: 'Technical Specifications',
      dimensions: {
        'Kick Drum': '22x18"',
        'Rack Tom 1': '10x8"',
        'Rack Tom 2': '12x9"',
        'Floor Tom': '16x16"',
        'Shell Material': 'All-Maple (Reference Pure)',
      },
      features: [
        {
          name: 'Shell Formula',
          value: 'All-Maple (RFP Series)',
          description: 'Pure maple construction delivers warm fundamental with smooth highs — distinct from the brighter birch/maple Reference series',
        },
        {
          name: 'Shell Thickness',
          value: '7.5mm (7-ply) to 3mm alternate plies',
          description: 'Alternating ply thickness for controlled resonance and fundamental clarity',
        },
        {
          name: 'Bearing Edge',
          value: '45-degree',
          description: 'Sharp edge for maximum head contact, fast attack, and clean decay',
        },
        {
          name: 'Tom Mounting',
          value: 'Pearl\'s Opti-Mount II',
          description: 'Floating mount system lets shells resonate freely without damping from hardware contact',
        },
        {
          name: 'Kick Drum',
          value: '22x18" — standard deep kick',
          description: 'Deep kick for maximum low-end projection essential for Hoglan\'s double bass patterns',
        },
        {
          name: 'Hardware',
          value: 'Pearl 830 Series',
          description: 'Professional-grade chrome hardware built for road reliability',
        },
      ],
      tuningTips: [
        'Gene Hoglan tunes his toms lower than many metal drummers for a warm, authoritative tone rather than high, cutting attack',
        'Kick drum front head slightly ported for microphone placement; batter tuned medium for rebound and attack',
        'Resonant heads on toms tuned slightly below batter for maximum sustain and downward pitch bend',
        'For the Hoglan live sound, avoid excessive dampening — let the maple shells breathe',
      ],
    },

    sound: {
      title: 'Hear It In Action',
      description: 'Gene Hoglan\'s precision and power are perfectly matched by the Reference Pure\'s warm maple response. These videos capture him in both live and controlled settings.',
      videos: [
        {
          youtubeId: 'TnaKBKKW5CA',
          title: 'Gene Hoglan "Formation of Damnation" Drum Cam',
          description: 'Official drum cam from GeneHoglanOfficial — Testament performance showcasing his complete Pearl setup',
          year: 2008,
        },
        {
          youtubeId: 'eGope68pHf0',
          title: 'Gene Hoglan Plays Death Track "The Philosopher"',
          description: 'Gene performing a classic Death track — from his official DVD, demonstrating his technique in detail',
          year: 2010,
        },
      ],
      featuredTracks: [
        { song: 'Formation of Damnation', album: 'Formation of Damnation (2008)', note: 'Drum cam footage available — Hoglan\'s Testament debut showcasing the full kit' },
        { song: 'The Philosopher', album: 'Individual Thought Patterns (1993)', note: 'Complex Death metal arrangement with Hoglan\'s signature double bass precision' },
        { song: 'Crystal Mountain', album: 'Symbolic (1995)', note: 'Hoglan\'s most celebrated Death performance — powerful groove over complex changes' },
        { song: 'Low', album: 'Brotherhood of the Snake (2016)', note: 'Modern Testament with full Reference Pure kit in a studio production context' },
      ],
    },

    affiliate: {
      title: 'Get This Gear',
      description: 'The Pearl Reference Pure is Pearl\'s flagship all-maple kit, available as shell packs in multiple configurations.',
      currentPrice: {
        range: '$3000-4500',
        note: 'Shell pack price; hardware and cymbals sold separately',
      },
      alternatives: [
        {
          name: 'Pearl Reference 5-piece Shell Pack',
          price: '$2500-3500',
          reason: 'The hybrid birch/maple Reference — brighter, slightly more cutting, lower price',
        },
        {
          name: 'Pearl Masters Maple Complete 5-piece',
          price: '$2000-3000',
          reason: 'All-maple at a lower price point — excellent quality step below Reference Pure',
        },
      ],
      retailers: [
        { name: 'Sweetwater', url: 'https://www.sweetwater.com', logo: '/images/retailers/sweetwater.svg' },
        { name: 'Thomann', url: 'https://www.thomann.de', logo: '/images/retailers/thomann.svg' },
        { name: 'Guitar Center', url: 'https://www.guitarcenter.com', logo: '/images/retailers/guitarcenter.svg' },
      ],
      usedMarket: {
        note: 'Reference Pure kits are uncommon used — professional players rarely part with them',
        priceRange: '$1800-3000',
        tips: 'Inspect bearing edges carefully. On used Pearl kits, check that Opti-Mount tom hardware is complete and undamaged. Verify shell interiors are clean and crack-free.',
      },
    },

    usedOn: {
      title: 'Featured On These Recordings',
      albums: [
        {
          title: 'Formation of Damnation',
          artist: 'Testament',
          year: 2008,
          cover: '/images/albums/testament-formation-of-damnation.webp',
          note: 'Hoglan\'s Testament debut — a landmark of modern thrash production',
        },
        {
          title: 'Dark Roots of Earth',
          artist: 'Testament',
          year: 2012,
          cover: '/images/albums/testament-dark-roots-of-earth.webp',
          note: 'Hoglan solidifies his role as the definitive Testament drummer',
        },
        {
          title: 'Brotherhood of the Snake',
          artist: 'Testament',
          year: 2016,
          cover: '/images/albums/testament-brotherhood-of-the-snake.webp',
          note: 'Modern Testament with the Reference Pure in a state-of-the-art production',
        },
        {
          title: 'Symbolic',
          artist: 'Death',
          year: 1995,
          cover: '/images/albums/death-symbolic.webp',
          note: 'One of Death metal\'s greatest albums with Hoglan at the peak of his craft',
        },
      ],
      tours: [
        'Testament\'s Formation of Damnation World Tour (2008–2009)',
        'Testament\'s Dark Roots of Thrash Tour (2012–2013)',
        'Gigantour (multiple years)',
        'Metal Alliance Tour',
      ],
    },

    similarGear: {
      title: 'Similar Gear You Might Like',
      items: [
        {
          name: 'Pearl Reference 5-Piece Shell Pack',
          slug: 'pearl-reference-shell-pack',
          image: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Acoustic_Drums_Kit_%2829965183378%29.jpg',
          price: '$2500-3500',
          reason: 'Hybrid birch/maple Reference — brighter, step below the Pure',
        },
        {
          name: 'Pearl Masters Maple Complete 5-Piece',
          slug: 'pearl-masters-maple-complete',
          image: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Acoustic_Drums_Kit_%2829965183378%29.jpg',
          price: '$2000-3000',
          reason: 'All-maple at a more accessible price point',
        },
      ],
      drummerAlternatives: [
        {
          drummer: 'Dave Lombardo',
          drummerSlug: 'dave-lombardo',
          snare: 'Pearl Free-Floating Snare',
          note: 'Fellow thrash metal legend with a long Pearl relationship',
        },
        {
          drummer: 'George Kollias',
          drummerSlug: 'george-kollias',
          snare: 'Tama Starclassic Bubinga Kit',
          note: 'Extreme metal drummer with similar precision and power profile',
        },
      ],
    },

    faq: [
      {
        question: 'Why is Gene Hoglan called "The Atomic Clock"?',
        answer: 'The nickname "The Atomic Clock" refers to Gene Hoglan\'s extraordinary metronomic precision, especially in his double bass drumming. Playing at extreme tempos with consistent 16th-note or 32nd-note patterns requires machine-like accuracy, and Hoglan delivers this without electronic assistance. His ability to maintain absolute tempo at high speeds while simultaneously playing complex snare and tom patterns sets him apart even among elite metal drummers. The term reflects admiration from peers who note that his timing is so reliable it could calibrate other musicians.',
      },
      {
        question: 'What makes the Pearl Reference Pure suitable for extreme metal?',
        answer: 'The Pearl Reference Pure\'s all-maple shell construction delivers a warm, full fundamental that holds up at high volumes without becoming harsh. In extreme metal contexts — where guitars are heavily down-tuned, bass is dense, and volume levels are extreme — a kit needs to project clearly in the low-mid frequencies where maple excels. The Reference Pure\'s Opti-Mount II hardware also lets the shells resonate freely, maximizing both the sustain and attack that make tom fills and kick patterns audible in heavy mixes. It\'s a kit designed for professional demands, which matches Hoglan\'s career requirements exactly.',
      },
      {
        question: 'What double bass pedals does Gene Hoglan use with the Pearl Reference Pure?',
        answer: 'Gene Hoglan has worked with various high-performance double bass pedals throughout his career, gravitating toward mechanisms that provide fast response with minimal noise. He has been associated with Pearl\'s own pedal range given his endorsement relationship, but his technique — emphasizing heel-toe motion and consistent stroke weight — is adaptable to multiple pedal types. The key for Hoglan is pedal feel and response time rather than a specific brand loyalty in the pedal department.',
      },
      {
        question: 'How does Gene Hoglan set up his toms on the Reference Pure kit?',
        answer: 'Hoglan\'s setup is generally a relatively compact, ergonomic arrangement emphasizing reach efficiency over visual spectacle. He typically uses a standard rack tom / floor tom configuration rather than the sprawling multiple-rack setups of some metal drummers. The Pearl Opti-Mount II system allows each tom to be positioned independently, and Hoglan positions them for minimal hand and wrist travel between strokes — a practical adaptation given the complexity and duration of many of his performances.',
      },
    ],

    discussion: {
      title: 'Join the Discussion',
      topics: [
        'What\'s your favorite Gene Hoglan performance?',
        'All-maple vs. birch/maple hybrid — which do you prefer for metal?',
        'Tips for developing double bass precision like "The Atomic Clock"',
      ],
      relatedDrummers: [3, 1, 9],
    },

    seo: {
      title: 'Gene Hoglan Pearl Reference Pure Kit — The Atomic Clock\'s Drum Setup | MetalForge',
      description: 'Explore Gene Hoglan\'s Pearl Reference Pure drum kit. Full specs, story of the Atomic Clock\'s legendary career, videos, and buying guide.',
      keywords: [
        'gene hoglan pearl kit',
        'atomic clock drum kit',
        'pearl reference pure metal',
        'gene hoglan drum setup',
        'testament drummer kit',
        'gene hoglan drums',
        'pearl reference pure',
        'extreme metal drum kit',
      ],
      ogImage: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Gene_Hoglan_-_Testament_%28cropped%29.jpg',
    },

    schema: {
      type: 'Product',
      brand: 'Pearl',
      model: 'Reference Pure (RFP) All-Maple Drum Kit',
      category: 'Musical Instruments > Drums > Drum Kits',
    },

    datePublished: '2026-06-19',
    dateModified: '2026-06-19',
    author: 'MetalForge Editorial',
    status: 'published',
    priority: 5,
  },
};

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Get all signature gear items
 * @returns {Array} All signature gear items
 */
export function getAllSignatureGear() {
  return Object.values(SIGNATURE_GEAR).filter(item => item.status === 'published');
}

/**
 * Get signature gear by slug
 * @param {string} slug - The gear slug
 * @returns {Object|null} The gear item or null
 */
export function getSignatureGearBySlug(slug) {
  return SIGNATURE_GEAR[slug] || null;
}

/**
 * Get signature gear for a specific drummer
 * @param {number} drummerId - The drummer's ID
 * @returns {Array} Array of signature gear items for the drummer
 */
export function getSignatureGearForDrummer(drummerId) {
  return Object.values(SIGNATURE_GEAR).filter(item => item.drummerId === drummerId);
}

/**
 * Get signature gear by drummer slug
 * @param {string} drummerSlug - The drummer's URL slug
 * @returns {Array} Array of signature gear items
 */
export function getSignatureGearByDrummerSlug(drummerSlug) {
  return Object.values(SIGNATURE_GEAR).filter(item => item.drummerSlug === drummerSlug);
}

/**
 * Check if a slug is a valid signature gear page
 * @param {string} slug - The gear slug to check
 * @returns {boolean}
 */
export function isSignatureGearSlug(slug) {
  return slug in SIGNATURE_GEAR;
}

/**
 * Get all signature gear slugs
 * @returns {Array} Array of all gear slugs
 */
export function getAllSignatureGearSlugs() {
  return Object.keys(SIGNATURE_GEAR);
}

/**
 * Get gear items by category
 * @param {string} category - 'snare', 'cymbal', 'kit', etc.
 * @returns {Array}
 */
export function getSignatureGearByCategory(category) {
  return Object.values(SIGNATURE_GEAR).filter(item => item.category === category);
}

/**
 * Get featured/published signature gear for homepage or listing
 * @param {number} limit - Maximum items to return
 * @returns {Array}
 */
export function getFeaturedSignatureGear(limit = 5) {
  return Object.values(SIGNATURE_GEAR)
    .filter(item => item.status === 'published')
    .sort((a, b) => a.priority - b.priority)
    .slice(0, limit);
}

/**
 * Generate schema.org Product markup for gear
 * @param {Object} gear - Signature gear item
 * @param {Object} drummer - Drummer data
 * @returns {Object} Schema.org JSON-LD object
 */
export function generateSignatureGearSchema(gear, drummer) {
  const baseUrl = 'https://metalforge.io';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': gear.fullName,
    'brand': {
      '@type': 'Brand',
      'name': gear.brand,
    },
    'description': gear.seo.description,
    'image': `${baseUrl}${gear.hero.heroImage}`,
    'url': `${baseUrl}/drummers/${gear.drummerSlug}/signature/${gear.slug}`,
    'category': gear.schema.category,
    'offers': {
      '@type': 'AggregateOffer',
      'priceCurrency': 'USD',
      'lowPrice': gear.affiliate.currentPrice.range.split('-')[0].replace(/[^0-9]/g, ''),
      'highPrice': gear.affiliate.currentPrice.range.split('-')[1]?.replace(/[^0-9]/g, '') || gear.affiliate.currentPrice.range.split('-')[0].replace(/[^0-9]/g, ''),
      'offerCount': gear.affiliate.retailers.length,
    },
    'review': {
      '@type': 'Review',
      'author': {
        '@type': 'Organization',
        'name': 'MetalForge',
      },
      'reviewBody': gear.story.content.substring(0, 300) + '...',
    },
    'associatedMedia': gear.sound.videos.map(video => ({
      '@type': 'VideoObject',
      'name': video.title,
      'description': video.description,
      'thumbnailUrl': `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`,
      'contentUrl': `https://www.youtube.com/watch?v=${video.youtubeId}`,
    })),
  };
}

/**
 * Generate BreadcrumbList schema for gear page
 * @param {Object} gear - Signature gear item
 * @returns {Object} Schema.org BreadcrumbList
 */
export function generateGearBreadcrumbSchema(gear) {
  const baseUrl = 'https://metalforge.io';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': baseUrl,
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Drummers',
        'item': `${baseUrl}/drummers`,
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': gear.drummerName,
        'item': `${baseUrl}/drummer/${gear.drummerSlug}`,
      },
      {
        '@type': 'ListItem',
        'position': 4,
        'name': 'Signature Gear',
        'item': `${baseUrl}/drummers/${gear.drummerSlug}/signature`,
      },
      {
        '@type': 'ListItem',
        'position': 5,
        'name': gear.name,
        'item': `${baseUrl}/drummers/${gear.drummerSlug}/signature/${gear.slug}`,
      },
    ],
  };
}

export default SIGNATURE_GEAR;
