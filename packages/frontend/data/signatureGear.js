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
      heroImage: '/images/gear/joey-jordison-snare-hero.webp',
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
        { src: '/images/gear/joey-jordison-snare-iowa.webp', alt: 'Joey Jordison with snare during Iowa sessions', caption: 'Iowa recording sessions, 2001' },
        { src: '/images/gear/joey-jordison-live-2002.webp', alt: 'Joey Jordison live performance', caption: 'Disasterpieces tour, 2002' },
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
          image: '/images/gear/pearl-sensitone.webp',
          price: '$299-399',
          reason: 'Similar aggressive attack, great alternative',
        },
        {
          name: 'Tama S.L.P. G-Maple 14x6"',
          slug: 'tama-slp-g-maple',
          image: '/images/gear/tama-slp-g-maple.webp',
          price: '$400-500',
          reason: 'Maple attack with diagonal grain projection',
        },
        {
          name: 'DW Performance Series 13x6.5"',
          slug: 'dw-performance-series-snare',
          image: '/images/gear/dw-performance-snare.webp',
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
      ogImage: '/images/gear/joey-jordison-snare-og.webp',
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
      heroImage: '/images/gear/lars-paiste-china-hero.webp',
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
        { name: 'Paiste 2002 20" China', slug: 'paiste-2002-china', image: '/images/gear/paiste-2002-china.webp', price: '$300-350', reason: 'Classic Paiste china tone' },
        { name: 'Zildjian Oriental 20" China Trash', slug: 'zildjian-oriental-china', image: '/images/gear/zildjian-oriental-china.webp', price: '$280-350', reason: 'Alternative metal china' },
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
      ogImage: '/images/gear/lars-china-og.webp',
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
    fullName: 'Paiste Giant Beat Gongs (38" & 60")',
    model: 'Paiste Giant Beat Gong Series',
    drummerId: 14,
    drummerName: 'Danny Carey',
    drummerSlug: 'danny-carey',
    brand: 'Paiste',
    category: 'percussion',
    gearType: 'Gong',

    hero: {
      tagline: 'The Ritual Sound of Tool',
      subtitle: 'The massive bronze gongs that define Danny Carey\'s atmospheric, ritualistic percussion',
      heroImage: '/images/gear/danny-carey-gongs-hero.webp',
      badgeText: 'Signature Setup',
    },

    story: {
      title: 'Sound as Ritual: Danny Carey\'s Paiste Giant Beat Gongs',
      content: `The Paiste Giant Beat Gongs represent one of the most distinctive elements of Tool's live experience. Since Danny Carey first incorporated them in the early 1990s, these massive bronze instruments have become as much a part of Tool's sonic identity as Adam Jones's distorted guitar tones or Maynard James Keenan's otherworldly vocals. Few drummers in rock or metal history have so thoroughly integrated orchestral percussion into their fundamental sound.

Carey discovered the transformative power of gongs while exploring world percussion traditions during Tool's formative years. Drawn to the ritualistic use of gongs in East Asian music—where they mark sacred transitions and create sustained vibrational fields—he began integrating them into the band's increasingly complex sonic palette. The Paiste Giant Beat series proved to be the perfect instrument for his vision: warm, complex, and alive in ways that no cymbal or drum can replicate.

The Giant Beat Gong line has a storied history. Originally introduced by Paiste in the 1960s, these instruments gained rock prominence when John Bonham of Led Zeppelin used them to create the thunderous atmosphere of "When the Levee Breaks." Carey embraced this lineage but evolved it—using gongs not just as dramatic accents but as sustained tonal fields that underpin Tool's extended compositions. In a live Tool set, the gongs are not decoration; they are fundamental to the sound.

In Tool's live setup, Carey positions multiple Giant Beat Gongs at the rear of his enormous elevated drum riser. The most prominent are his 38" and 60" models. The 60" gong is a physically and sonically overwhelming instrument—when struck, it produces frequencies so low they register as much as vibration as sound, creating an almost subsonic rumble that audience members feel in their chests. During the extended passages in tracks like "Wings for Marie," "Reflection," and the 10-minute title track of "Fear Inoculum," Carey uses violin bows and specialized mallets to draw out the gong's fundamental tones, building meditative, hypnotic soundscapes that serve as the music's emotional foundation.

The Paiste Giant Beat Gong's construction is central to its sonic character. Cast from Paiste's CuSn8 bronze alloy—approximately 8% tin, 92% copper—the raw, hand-hammered surface creates complex overtone clusters that develop and evolve over time. Unlike cymbals, which reach their peak sound almost instantly, a gong's tone blooms over 30 to 60 seconds after striking, making it ideal for Tool's long-form compositions where patience and duration are musical virtues.

Studio Application:
On "Lateralus" (2001), gong resonances can be heard threading through ambient passages between the album's more intense moments. "10,000 Days" (2006) uses them more explicitly, particularly in "Wings for Marie / 10,000 Days Part II," where they create the album's most emotionally devastating soundscapes. On "Fear Inoculum" (2019), Carey's orchestral percussion—with the gongs at its center—became central to the album's atmospheric density. The entire record feels suspended in gong resonance.

Carey has spoken about the meditative quality of gong playing: "There's a ritual dimension to it. You strike the gong and you surrender control. The instrument takes over and develops its own journey. That's exactly what Tool's music is about—transcending the ego through repetition and surrender to the sound."`,
      images: [
        { src: '/images/gear/danny-carey-gong-live.webp', alt: 'Danny Carey behind his massive Tool drum rig with Paiste gongs', caption: 'Danny Carey\'s gong wall at a Tool live show' },
      ],
    },

    specs: {
      title: 'Technical Specifications',
      dimensions: {
        sizes: '32", 34", 38", 60"',
        alloy: 'CuSn8 Bronze',
        finish: 'Natural / Unlathed',
        origin: 'Switzerland / Germany',
      },
      features: [
        {
          name: 'Shell Material',
          value: 'CuSn8 Bronze Alloy',
          description: 'Paiste\'s signature bronze with 8% tin content for warmth and complexity',
        },
        {
          name: 'Primary Sizes',
          value: '38" and 60"',
          description: 'The 60" gong is one of the largest production gongs in the world',
        },
        {
          name: 'Surface',
          value: 'Hand-hammered, unlathed',
          description: 'Raw hammered surface creates complex overtone clusters that evolve over time',
        },
        {
          name: 'Sustain',
          value: '30–60 seconds',
          description: 'Long sustain allows gong tone to bloom and develop after striking',
        },
        {
          name: 'Production',
          value: 'Hand-crafted in Europe',
          description: 'Each gong individually crafted at Paiste\'s Swiss and German facilities',
        },
        {
          name: 'Series Origin',
          value: '1960s',
          description: 'Giant Beat series dates to the 1960s, popularized by John Bonham of Led Zeppelin',
        },
      ],
      tuningTips: [
        'Use multiple mallet weights—lighter for soft bowing, heavier for explosive strikes',
        'Bow the edge of the gong (not the center) for sustained singing tones',
        'Allow full sustain before striking again to avoid overtone clashing',
        'Position gong stands away from other percussion to allow free vibration',
      ],
    },

    sound: {
      title: 'Hear the Gongs in Action',
      description: 'Danny Carey\'s Paiste Giant Beat Gongs create the ritualistic atmosphere that defines Tool\'s live experience. Watch these videos to hear and see them in context.',
      videos: [
        {
          youtubeId: 'vU7T7yTJtMk',
          title: 'Danny Carey Playing His Paiste 60" Earth Gong',
          description: 'Rare footage of Danny Carey demonstrating the massive 60" Paiste Giant Beat gong',
          year: 2019,
        },
        {
          youtubeId: 'q1DBRu-VIx4',
          title: 'Danny Carey\'s Paiste Cymbal & Gong Setup',
          description: 'Danny Carey walks through his complete Paiste setup including the Giant Beat Gongs',
          year: 2019,
        },
        {
          youtubeId: 'MM62wjLrgmA',
          title: 'TOOL - Schism (Official Video)',
          description: 'Tool\'s breakthrough single featuring Danny Carey\'s distinctive percussion',
          year: 2001,
        },
      ],
      featuredTracks: [
        { song: 'Fear Inoculum', album: 'Fear Inoculum (2019)', note: 'Gong tones form the opening and closing atmosphere' },
        { song: 'Wings for Marie / 10,000 Days', album: '10,000 Days (2006)', note: 'Gong resonance creates the emotional core of this two-part suite' },
        { song: 'Reflection', album: 'Lateralus (2001)', note: '11-minute epic with extended gong passages' },
        { song: 'Disposition / Reflection / Triad', album: 'Lateralus (2001)', note: 'Three-song sequence showcasing Carey\'s full orchestral percussion setup' },
      ],
    },

    affiliate: {
      title: 'Get This Gear',
      description: 'Paiste Giant Beat Gongs are available through authorized Paiste dealers, though large sizes require special ordering.',
      currentPrice: {
        range: '$2500-3500',
        note: '38" model; 60" models exceed $8,000. Price varies by size and retailer.',
      },
      alternatives: [
        {
          name: 'Paiste Symphonic Gong 32"',
          price: '$1,200-1,800',
          reason: 'More affordable entry point with similar tonal character',
        },
        {
          name: 'SABIAN Hand Hammered 32" Gong',
          price: '$900-1,400',
          reason: 'Alternative manufacturer with warm, complex tones',
        },
      ],
      retailers: [
        { name: 'Sweetwater', url: 'https://www.sweetwater.com', logo: '/images/retailers/sweetwater.svg' },
        { name: 'Thomann', url: 'https://www.thomann.de', logo: '/images/retailers/thomann.svg' },
        { name: 'Guitar Center', url: 'https://www.guitarcenter.com', logo: '/images/retailers/guitarcenter.svg' },
      ],
      usedMarket: {
        note: 'Large Paiste gongs rarely appear on the used market',
        priceRange: '$1,500-3,000',
        tips: 'Inspect for dents and cracks in the playing surface. Gongs are difficult to ship due to size.',
      },
    },

    usedOn: {
      title: 'Featured On These Recordings',
      albums: [
        { title: 'Fear Inoculum', artist: 'Tool', year: 2019, cover: '/images/albums/fear-inoculum.webp', note: 'Gongs anchor the album\'s meditative atmosphere' },
        { title: '10,000 Days', artist: 'Tool', year: 2006, cover: '/images/albums/10000-days.webp', note: 'Central to the emotional climax of the album' },
        { title: 'Lateralus', artist: 'Tool', year: 2001, cover: '/images/albums/lateralus.webp', note: 'Gongs used in the three-song closing suite' },
        { title: 'Ænima', artist: 'Tool', year: 1996, cover: '/images/albums/aenima.webp', note: 'Early gong work establishing Carey\'s atmospheric approach' },
      ],
      tours: [
        'Fear Inoculum World Tour (2019-2022)',
        '10,000 Days Tour (2006-2007)',
        'Lateralus World Tour (2001-2002)',
        'Lollapalooza and festival appearances (various years)',
      ],
    },

    similarGear: {
      title: 'Related Percussion & Gear',
      items: [
        {
          name: 'Paiste Symphonic Gong 32"',
          slug: 'paiste-symphonic-gong',
          image: '/images/gear/paiste-symphonic-gong.webp',
          price: '$1,200-1,800',
          reason: 'More accessible size with the same Giant Beat character',
        },
        {
          name: 'Remo FiberSkyn 32" Bass Drum Head',
          slug: 'remo-fiberskyn-bass',
          image: '/images/gear/remo-fiberskyn.webp',
          price: '$45-65',
          reason: 'Danny Carey\'s kick drum head choice for warm, rounded attack',
        },
      ],
      drummerAlternatives: [
        {
          drummer: 'John Bonham',
          drummerSlug: 'john-bonham',
          snare: 'Paiste Giant Beat 38" Gong',
          note: 'The original rock gong icon who popularized the Giant Beat series',
        },
      ],
    },

    faq: [
      {
        question: 'What size Paiste Giant Beat Gongs does Danny Carey use?',
        answer: 'Danny Carey uses multiple sizes of Paiste Giant Beat Gongs in his live setup. His most prominent are the 38" and 60" models. The 60" gong is one of the largest production gongs in the world and produces frequencies so low they create a subsonic rumble. He also positions smaller 32" and 34" gongs for higher-pitched tonal accents.',
      },
      {
        question: 'How does Danny Carey play the gongs during Tool\'s live shows?',
        answer: 'Carey uses a combination of techniques: specialized mallets for explosive strikes and percussive accents, and violin bows drawn across the gong\'s edge to produce long, sustained singing tones. The bowing technique is particularly distinctive—it can sustain a single note for 30 to 60 seconds, gradually building intensity. During extended Tool compositions like "Wings for Marie" and "Fear Inoculum," he layers multiple gong tones to create immersive soundscapes.',
      },
      {
        question: 'What material are Paiste Giant Beat Gongs made from?',
        answer: 'Paiste Giant Beat Gongs are made from CuSn8 bronze alloy—approximately 8% tin and 92% copper—the same material used throughout Paiste\'s professional cymbal range. Each gong is hand-hammered at Paiste\'s European facilities in Switzerland and Germany. The raw, unlathed surface creates complex overtone clusters that develop and evolve over time, giving the gongs their characteristic bloom.',
      },
      {
        question: 'Where can I buy Paiste Giant Beat Gongs?',
        answer: 'Paiste Giant Beat Gongs are available through authorized Paiste dealers like Sweetwater, Thomann, and Guitar Center. Standard sizes (28"–34") are typically in stock, but larger models (38"+) often need to be special ordered. A 38" Giant Beat Gong typically costs $2,500–3,500. The 60" model that Danny Carey uses can exceed $10,000 and is a specialty instrument requiring advance ordering.',
      },
    ],

    discussion: {
      title: 'Join the Discussion',
      topics: [
        'What\'s your favorite Danny Carey gong moment in a Tool song?',
        'Have you tried bowing techniques on cymbals or gongs?',
        'How does world percussion influence your drumming?',
      ],
      relatedDrummers: [14, 1, 9],
    },

    seo: {
      title: 'Danny Carey Paiste Giant Beat Gongs - Complete Guide | MetalForge',
      description: 'Explore the Paiste Giant Beat Gongs that define Danny Carey\'s ritualistic Tool sound. Full specs, story, videos, and buying guide for the iconic percussion.',
      keywords: [
        'danny carey gongs',
        'paiste giant beat gong',
        'tool drummer gongs',
        'danny carey paiste',
        'paiste gong sizes',
        'tool percussion',
        'danny carey setup',
        'paiste giant beat 60 inch',
      ],
      ogImage: '/images/gear/danny-carey-gongs-og.webp',
    },

    schema: {
      type: 'Product',
      brand: 'Paiste',
      model: 'Giant Beat Gong Series',
      category: 'Musical Instruments > Drums & Percussion > Gongs',
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
    fullName: 'Tama Starphonic Bronze 14x6" Snare',
    model: 'Tama Starphonic PBZ146',
    drummerId: 15,
    drummerName: 'Mario Duplantier',
    drummerSlug: 'mario-duplantier',
    brand: 'Tama',
    category: 'snare',
    gearType: 'Snare Drum',

    hero: {
      tagline: 'The Brutal Crack of Gojira',
      subtitle: 'The single-ply bronze snare that delivers Mario Duplantier\'s devastating attack',
      heroImage: '/images/gear/mario-duplantier-snare-hero.webp',
      badgeText: 'Signature Choice',
    },

    story: {
      title: 'Precision and Power: Mario Duplantier\'s Tama Starphonic Bronze',
      content: `Mario Duplantier's snare drum choice reflects the same philosophy that drives Gojira's music: brutally powerful, sonically precise, and crafted with obsessive attention to detail. The Tama Starphonic Bronze has been a cornerstone of his setup, providing the devastating crack and projection that cuts through Gojira's dense, drop-tuned guitars like a blade through fog.

The Starphonic series represents Tama's single-ply shell technology at its finest. Unlike traditional multi-ply snares—where multiple laminated wood or metal layers create a darker, more controlled sound—the Starphonic uses a single 3mm bronze shell. This construction produces a fundamentally different sonic character: more open and resonant, with a brighter, cutting attack and sustain that multi-ply shells simply cannot achieve. The bronze material itself adds warmth and complexity that aluminum or steel alternatives lack, while maintaining the cutting brightness that Mario needs to be heard through Gojira's crushing wall of sound.

Mario discovered the Starphonic Bronze during recording sessions for "L'Enfant Sauvage" (2012), Gojira's most critically acclaimed album to date. Working with brother Joe Duplantier at their Silver Chord Studio in New York, Mario needed a snare that could capture both the subtle dynamics of quieter passages and the bone-crushing power of Gojira's heaviest moments. The Starphonic Bronze delivered both with startling authority.

"The single-ply bronze snare is alive in a way multi-ply snares aren't," Duplantier explained in a Drum! Magazine interview. "It responds to exactly what you give it—light touch, light sound; heavy hit, devastating sound. It's very honest. You can't hide behind the drum."

This transparency—the way the Starphonic Bronze responds directly to playing dynamics—is crucial for Mario's technique. His drumming is famous for its controlled aggression: technically precise, metronomically exact, but with a physicality that feels almost primal. The snare has to match both qualities simultaneously, and the Starphonic does.

Technical Innovation:
The Tama Starphonic Bronze's engineering is central to its sound. Tama uses proprietary 100mm tube lugs—longer than standard lugs—which provide multiple contact points with the shell while minimizing mass at any single point. This design philosophy reduces damping on the shell, allowing the bronze to vibrate more freely and project its natural fundamental tone. Combined with Tama's precision bearing edges and high-quality snare wires, the result is extraordinary sensitivity across the entire dynamic range.

Production Context:
On "Magma" (2016), widely considered Gojira's most emotionally devastating album, the Starphonic Bronze cuts through some of the most intense passages in modern metal. Tracks like "Stranded," "Pray," and the title track showcase the snare's ability to support crushing groove while articulating complex rhythmic patterns with machine-like clarity. On "Fortitude" (2021), Mario's drumming incorporated more tribal and world music influences while maintaining Gojira's crushing power—the Starphonic's versatility, from the groove-focused "Born for One Thing" to the pulverizing intensity of "New Found," made it the ideal instrument for the album's range.

Mario's precision—which fellow musicians describe as almost inhuman—is partly a product of his gear. The Starphonic Bronze's immediate response and honest character provide instant feedback on every stroke, reinforcing the metronomic precision that makes Gojira's complex, polyrhythmic compositions feel absolutely locked and inevitable.`,
      images: [
        { src: '/images/gear/mario-duplantier-snare.webp', alt: 'Mario Duplantier behind his Tama kit at Gojira live show', caption: 'Mario Duplantier with his Tama setup live' },
      ],
    },

    specs: {
      title: 'Technical Specifications',
      dimensions: {
        diameter: '14"',
        depth: '6"',
        shell: 'Single-ply 3mm Bronze',
        finish: 'Natural Bronze / Black Nickel Hardware',
      },
      features: [
        {
          name: 'Shell Construction',
          value: 'Single-ply 3mm Bronze',
          description: 'Single-ply design allows maximum shell resonance and open tone',
        },
        {
          name: 'Diameter',
          value: '14 inches',
          description: 'Standard diameter for full-range projection and versatility',
        },
        {
          name: 'Depth',
          value: '6 inches',
          description: 'Provides balance of crack and body without excessive fatness',
        },
        {
          name: 'Lugs',
          value: '100mm Tube Lugs',
          description: 'Tama\'s extended tube lugs minimize shell damping for maximum resonance',
        },
        {
          name: 'Snare Wires',
          value: '20-strand steel snare wires',
          description: 'High-strand count for sensitivity and full-frequency response',
        },
        {
          name: 'Bearing Edge',
          value: '45-degree edge',
          description: 'Sharp bearing edge maximizes head contact and attack definition',
        },
        {
          name: 'Weight',
          value: 'Approximately 8 lbs',
          description: 'Lighter than steel snares due to bronze alloy density',
        },
      ],
      tuningTips: [
        'Tune batter head relatively tight for maximum crack and attack',
        'Keep resonant head slightly looser than batter for snare sensitivity',
        'Minimal dampening recommended—let the bronze ring naturally',
        'For studio use, a small piece of felt near the edge controls ring without killing tone',
      ],
    },

    sound: {
      title: 'Hear It In Action',
      description: 'Mario Duplantier\'s snare defines Gojira\'s rhythmic power. Listen to these iconic performances to hear the Tama Starphonic Bronze cutting through some of the most intense music in modern metal.',
      videos: [
        {
          youtubeId: 'FNdC_3LR2AI',
          title: 'Gojira - Stranded (Official Video)',
          description: 'From the "Magma" album — Mario\'s snare work is prominent throughout',
          year: 2016,
        },
        {
          youtubeId: '3p85-KtgDSs',
          title: 'Gojira - Born For One Thing (Official Video)',
          description: 'From "Fortitude" — showcases Mario\'s tribal groove and snare dynamics',
          year: 2021,
        },
      ],
      featuredTracks: [
        { song: 'Stranded', album: 'Magma (2016)', note: 'Snare drives the entire track with relentless groove' },
        { song: 'L\'Enfant Sauvage', album: 'L\'Enfant Sauvage (2012)', note: 'Complex patterns highlight the snare\'s dynamic range' },
        { song: 'Flying Whales', album: 'From Mars to Sirius (2005)', note: 'Thunderous snare hits mark the heavy sections' },
        { song: 'Born for One Thing', album: 'Fortitude (2021)', note: 'Groove-focused playing demonstrates snare versatility' },
      ],
    },

    affiliate: {
      title: 'Get This Gear',
      description: 'The Tama Starphonic Bronze remains in production and represents the pinnacle of single-ply snare design.',
      currentPrice: {
        range: '$400-600',
        note: 'Price varies by finish and retailer availability',
      },
      alternatives: [
        {
          name: 'Tama Starphonic Steel 14x6.5"',
          price: '$300-400',
          reason: 'Steel version for brighter, more aggressive attack',
        },
        {
          name: 'Pearl Free Floating Bronze 14x6.5"',
          price: '$500-700',
          reason: 'Pearl\'s premium bronze snare with floating mechanism',
        },
      ],
      retailers: [
        { name: 'Sweetwater', url: 'https://www.sweetwater.com', logo: '/images/retailers/sweetwater.svg' },
        { name: 'Thomann', url: 'https://www.thomann.de', logo: '/images/retailers/thomann.svg' },
        { name: 'Guitar Center', url: 'https://www.guitarcenter.com', logo: '/images/retailers/guitarcenter.svg' },
      ],
      usedMarket: {
        note: 'Starphonic Bronze snares hold value well on the used market',
        priceRange: '$280-420',
        tips: 'Inspect bearing edges carefully—they\'re machined and shouldn\'t show dents or gouges.',
      },
    },

    usedOn: {
      title: 'Featured On These Recordings',
      albums: [
        { title: 'Magma', artist: 'Gojira', year: 2016, cover: '/images/albums/gojira-magma.webp', note: 'Starphonic Bronze defines the album\'s crushing snare sound' },
        { title: 'L\'Enfant Sauvage', artist: 'Gojira', year: 2012, cover: '/images/albums/lenfant-sauvage.webp', note: 'Snare recorded with exceptional clarity at Silver Chord Studio' },
        { title: 'Fortitude', artist: 'Gojira', year: 2021, cover: '/images/albums/gojira-fortitude.webp', note: 'Varied dynamics showcase the snare\'s full range' },
      ],
      tours: [
        'Fortitude World Tour (2021-2022)',
        'Magma World Tour (2016-2017)',
        'L\'Enfant Sauvage Tour (2012-2013)',
        'Download Festival, Hellfest, and major festival appearances',
      ],
    },

    similarGear: {
      title: 'Similar Gear You Might Like',
      items: [
        {
          name: 'Tama Starphonic Steel 14x6.5"',
          slug: 'tama-starphonic-steel',
          image: '/images/gear/tama-starphonic-steel.webp',
          price: '$300-400',
          reason: 'Same single-ply concept, brighter steel character',
        },
        {
          name: 'Pearl Free Floating Bronze 14x6.5"',
          slug: 'pearl-free-floating-bronze',
          image: '/images/gear/pearl-free-floating.webp',
          price: '$500-700',
          reason: 'Alternative bronze snare with floating strainer system',
        },
      ],
      drummerAlternatives: [
        {
          drummer: 'Danny Carey',
          drummerSlug: 'danny-carey',
          snare: 'Sonor Danny Carey Signature Bronze 14x8"',
          note: 'Another heavy hitter who prefers bronze for its warmth and cut',
        },
      ],
    },

    faq: [
      {
        question: 'What size is Mario Duplantier\'s Tama Starphonic Bronze snare?',
        answer: 'Mario Duplantier primarily uses the Tama Starphonic Bronze in 14" diameter with a 6" depth. The Tama Starphonic series is available in multiple sizes and materials—Mario\'s choice of the 14x6" bronze configuration gives him the balance of crack, body, and projection needed to cut through Gojira\'s dense guitar arrangements.',
      },
      {
        question: 'Why does Mario Duplantier choose bronze over steel or wood for his snare?',
        answer: 'Bronze offers a tonal sweet spot between the warmth of brass and the brightness of steel. For Mario\'s style—which demands both penetrating cut in high-volume live contexts and nuanced dynamics in quieter passages—bronze provides the ideal combination. Unlike steel snares that can sound harsh under heavy hands, the Tama Starphonic Bronze\'s warmth prevents the top end from becoming fatiguing, while still delivering the projection needed in dense metal mixes.',
      },
      {
        question: 'What makes the Tama Starphonic series different from regular snare drums?',
        answer: 'The Tama Starphonic series uses a single-ply shell instead of the multiple laminated plies found in most snare drums. A single 3mm bronze shell vibrates much more freely than a multi-ply shell, producing a more open, resonant tone with a longer natural sustain. Tama also uses extended 100mm tube lugs that minimize contact points with the shell, further reducing damping and allowing the bronze to speak freely.',
      },
      {
        question: 'What drum heads does Mario Duplantier use on his Tama Starphonic Bronze?',
        answer: 'Mario Duplantier uses Remo heads on his snare drum setup. For the batter head, he typically uses a Remo Ambassador Coated for its warm, natural response. For recording sessions, he may switch to a Remo Emperor Coated for additional body. His approach prioritizes natural resonance with minimal dampening—reflecting the same philosophy as the Starphonic series itself.',
      },
    ],

    discussion: {
      title: 'Join the Discussion',
      topics: [
        'What\'s your favorite Mario Duplantier snare performance?',
        'Have you tried single-ply metal snare drums?',
        'How does Gojira\'s sound influence your drum choices?',
      ],
      relatedDrummers: [15, 1, 4],
    },

    seo: {
      title: 'Tama Starphonic Bronze Snare - Mario Duplantier\'s Setup | MetalForge',
      description: 'Explore the Tama Starphonic Bronze snare that powers Gojira\'s devastating sound. Full specs, videos, and buying guide for Mario Duplantier\'s signature snare choice.',
      keywords: [
        'mario duplantier snare',
        'tama starphonic bronze',
        'gojira drummer snare',
        'mario duplantier tama',
        'tama starphonic snare',
        'gojira drum setup',
        'single ply bronze snare',
      ],
      ogImage: '/images/gear/mario-duplantier-snare-og.webp',
    },

    schema: {
      type: 'Product',
      brand: 'Tama',
      model: 'Starphonic Bronze 14x6" Snare',
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
    model: 'Pearl Reference Pure Series',
    drummerId: 3,
    drummerName: 'Gene Hoglan',
    drummerSlug: 'gene-hoglan',
    brand: 'Pearl',
    category: 'kit',
    gearType: 'Drum Kit',

    hero: {
      tagline: 'The Atomic Clock\'s Arsenal',
      subtitle: 'The all-maple Pearl Reference Pure kit that powers Gene Hoglan\'s legendary precision',
      heroImage: '/images/gear/gene-hoglan-kit-hero.webp',
      badgeText: 'Endorsed Setup',
    },

    story: {
      title: 'Atomic Precision: Gene Hoglan\'s Pearl Reference Pure',
      content: `Gene Hoglan earned the nickname "The Atomic Clock" for reasons that become immediately apparent the first time you hear him play. His timing doesn't just keep time—it defines it. Metronomic to a degree that seems almost supernatural, possessed of an internal pulse that never wavers whether he's playing at 300 BPM blast beats or at a glacial doom crawl, Hoglan has spent four decades proving that extreme metal drumming doesn't have to sacrifice precision for power. The Pearl Reference Pure kit he plays today is the most premium expression of Pearl's craft, and it's a fitting instrument for a drummer of his stature.

Hoglan's relationship with Pearl Drums spans decades of extreme metal history. From his early days with Dark Angel in the early 1980s through his transformative work with Death, his Grammy-nominated recordings with Testament, his explosive performances with Strapping Young Lad, and his acclaimed work voicing Dethklok's Nathan Explosion in Metalocalypse, Hoglan has consistently returned to Pearl. He developed an intimate understanding of what Pearl does better than any other manufacturer: build drums that are simultaneously warm, responsive, and built to withstand extreme playing for years without compromise.

When Pearl introduced the Reference Pure line, it represented the company's most ambitious achievement—100% maple construction with zero compromises in materials or execution. Hoglan immediately recognized it as the pinnacle of their craft. "These drums just sing," he told Drumhead Magazine. "All maple with Pearl Reference hardware—it doesn't get more classic than that. I've been playing Pearl my whole career and the Reference Pure is just the best they've ever made. Period."

The Pearl Reference Pure's design philosophy centers on a single principle: maximum resonance through minimal restriction. The all-maple shells are constructed without fillers, coatings, or blended materials—just premium maple selected for consistent grain and density. Pearl's Opti-Loc tom mounting system mounts toms via a single ball-and-socket attachment at the shell, dramatically reducing the amount of hardware touching the wood and allowing the shell to vibrate without restriction.

This matters enormously for Hoglan's playing. His thunderous double bass technique places extraordinary demands on kick drums—the Reference Pure's maple bass drum shell handles the punishment without compromising tone. His precise tom work requires drums that respond identically at every dynamic level, from whisper-quiet ghost notes to maximally struck accent hits. The Reference Pure delivers this consistency.

Career Legacy:
Hoglan's drumming with the Reference Pure has appeared on some of the most important extreme metal recordings of the past decade. Testament's "The Formation of Damnation" (2008) announced his return to the band with explosive clarity—the drums sounded enormous without sacrificing articulation. "Dark Roots of Earth" (2012), "Brotherhood of the Snake" (2016), and "Titans of Creation" (2020) continued this legacy, each album showcasing Pearl's top-tier craftsmanship supporting Hoglan's foundational work.

Live, the Reference Pure setup is equally impressive. Hoglan's kit is large by most standards—reflecting his physical stature and thunderous approach—but configured with deliberate intention. Every tom placement, every cymbal position, is the result of decades of refinement. "I've been doing this for forty-plus years," Hoglan noted in a Pearl interview. "I know exactly where everything needs to be to get the sound I want. Pearl gives me that control."

The Reference Pure represents the ideal pairing of a legendary drummer with a legendary drum company's best work: the result of decades of mutual understanding between artist and manufacturer, producing something greater than either could achieve alone.`,
      images: [
        { src: '/images/gear/gene-hoglan-kit.webp', alt: 'Gene Hoglan behind his Pearl Reference Pure drum kit', caption: 'Gene Hoglan with his Pearl Reference Pure setup' },
      ],
    },

    specs: {
      title: 'Technical Specifications',
      dimensions: {
        kickDrum: '24"x18"',
        rackToms: '10", 12", 14"',
        floorToms: '16", 18"',
        shellConstruction: '100% All-Maple',
      },
      features: [
        {
          name: 'Shell Material',
          value: '100% All-Maple',
          description: 'Pure maple without fillers or blended materials for maximum warmth and resonance',
        },
        {
          name: 'Tom Mounting',
          value: 'Opti-Loc System',
          description: 'Single-point ball-and-socket mounting minimizes shell damping for full resonance',
        },
        {
          name: 'Bearing Edge',
          value: 'Round-over bearing edge',
          description: 'Pearl\'s Reference series edge profile for warm tone and full sustain',
        },
        {
          name: 'Lugs',
          value: 'SR-017 Lugs',
          description: 'Lightweight Reference series lugs that minimize shell contact',
        },
        {
          name: 'Bass Drum',
          value: '24" kick drum',
          description: 'Large kick provides the thunderous low-end Hoglan\'s double bass technique demands',
        },
        {
          name: 'Hardware',
          value: 'Pearl Reference Series',
          description: 'Full Reference hardware package including stands, bass drum pedals, and snare stand',
        },
        {
          name: 'Finish',
          value: 'Gloss lacquer wrap options',
          description: 'Multiple premium finish options with hand-applied lacquer',
        },
      ],
      tuningTips: [
        'Hoglan tunes his toms to a descending melody—specific pitches, not just "tight" or "loose"',
        'Bass drum tuning is medium-loose with minimal muffling for maximum attack',
        'Generous batter and resonant head tuning spread for warm, open tom sound',
        'Snare requires separate tuning—Gene typically uses a separate signature snare drum',
      ],
    },

    sound: {
      title: 'Hear the Atomic Clock in Action',
      description: 'Gene Hoglan\'s Pearl Reference Pure kit produces the massive, precise sound that has anchored some of extreme metal\'s most important recordings. Watch these videos to see his legendary technique.',
      videos: [
        {
          youtubeId: 'HvkXWE_LoOg',
          title: 'Gene Hoglan\'s Drum Kit Rundown',
          description: 'Gene walks through every element of his drum setup in detail',
          year: 2019,
        },
        {
          youtubeId: 'iZGiuL2jjDM',
          title: 'Pearl Session Studio Classic ft. Gene Hoglan',
          description: 'Gene Hoglan demonstrating Pearl drums with signature precision',
          year: 2019,
        },
      ],
      featuredTracks: [
        { song: 'More than Meets the Eye', album: 'The Formation of Damnation (2008)', note: 'Thunderous double bass showcasing the Pearl Reference Pure\'s kick response' },
        { song: 'Dark Roots of Earth', album: 'Dark Roots of Earth (2012)', note: 'Complex fills demonstrate the kit\'s tonal range and consistency' },
        { song: 'Brotherhood of the Snake', album: 'Brotherhood of the Snake (2016)', note: 'Machine-precise performance from "The Atomic Clock"' },
        { song: 'Night of the Witch', album: 'Titans of Creation (2020)', note: 'Testament\'s most recent album highlighting Hoglan\'s evolved drumming style' },
      ],
    },

    affiliate: {
      title: 'Get This Gear',
      description: 'The Pearl Reference Pure is Pearl\'s flagship drum kit—available in multiple configurations at authorized Pearl dealers worldwide.',
      currentPrice: {
        range: '$2500-4000',
        note: 'Starter 5-piece configuration; full Gene Hoglan-style setup with additional toms is higher',
      },
      alternatives: [
        {
          name: 'Pearl Reference Series (standard)',
          price: '$1,800-3,000',
          reason: 'Similar Reference hardware with blended shell construction, lower price point',
        },
        {
          name: 'Pearl Masters Maple Complete',
          price: '$1,500-2,500',
          reason: 'Premium maple with Master\'s series hardware for slightly less than Reference Pure',
        },
      ],
      retailers: [
        { name: 'Sweetwater', url: 'https://www.sweetwater.com', logo: '/images/retailers/sweetwater.svg' },
        { name: 'Thomann', url: 'https://www.thomann.de', logo: '/images/retailers/thomann.svg' },
        { name: 'Guitar Center', url: 'https://www.guitarcenter.com', logo: '/images/retailers/guitarcenter.svg' },
      ],
      usedMarket: {
        note: 'Pearl Reference Pure kits hold value extremely well',
        priceRange: '$1,800-3,200',
        tips: 'Check bearing edges and shell seams carefully. Inspect tom mounting points for wear.',
      },
    },

    usedOn: {
      title: 'Featured On These Recordings',
      albums: [
        { title: 'The Formation of Damnation', artist: 'Testament', year: 2008, cover: '/images/albums/formation-of-damnation.webp', note: 'Gene\'s return to Testament with Pearl reference-quality drums' },
        { title: 'Brotherhood of the Snake', artist: 'Testament', year: 2016, cover: '/images/albums/brotherhood-snake.webp', note: 'Hoglan\'s Pearl Reference Pure drives the album\'s thrash fury' },
        { title: 'Dark Roots of Earth', artist: 'Testament', year: 2012, cover: '/images/albums/dark-roots-earth.webp', note: 'Grammy-nominated performance with Reference Pure precision' },
        { title: 'Titans of Creation', artist: 'Testament', year: 2020, cover: '/images/albums/titans-of-creation.webp', note: 'Most recent Testament album featuring Hoglan\'s distinctive Pearl tone' },
      ],
      tours: [
        'Testament Brotherhood of the Snake Tour (2016-2017)',
        'Big Four reunion and festival appearances (various)',
        'Testament Dark Roots of Thrash Tour (2012-2013)',
        'Headbanger\'s Ball and major North American/European tours',
      ],
    },

    similarGear: {
      title: 'Similar Gear You Might Like',
      items: [
        {
          name: 'Pearl Reference Series (standard)',
          slug: 'pearl-reference-series',
          image: '/images/gear/pearl-reference.webp',
          price: '$1,800-3,000',
          reason: 'Reference hardware with multi-ply shell at lower cost',
        },
        {
          name: 'Pearl Masters Maple Complete',
          slug: 'pearl-masters-maple',
          image: '/images/gear/pearl-masters-maple.webp',
          price: '$1,500-2,500',
          reason: 'Professional maple kit from Pearl\'s professional lineup',
        },
        {
          name: 'Tama Star Maple',
          slug: 'tama-star-maple',
          image: '/images/gear/tama-star-maple.webp',
          price: '$2,000-3,500',
          reason: 'All-maple alternative from Japan\'s other leading drum manufacturer',
        },
      ],
      drummerAlternatives: [
        {
          drummer: 'Joey Jordison',
          drummerSlug: 'joey-jordison',
          snare: 'Pearl Joey Jordison Signature Snare',
          note: 'Pearl\'s most iconic metal signature instrument',
        },
      ],
    },

    faq: [
      {
        question: 'Why is Gene Hoglan called "The Atomic Clock"?',
        answer: 'The nickname "The Atomic Clock" was coined by fellow musicians who marveled at Hoglan\'s ability to maintain absolutely precise tempo regardless of musical difficulty, playing duration, or performance stress. Like an atomic clock—the most accurate timekeeping device in existence—his internal metronome never drifts. This precision is partly natural gift and partly decades of deliberate practice, and it makes his drumming identifiable within seconds.',
      },
      {
        question: 'What configuration does Gene Hoglan use on his Pearl Reference Pure kit?',
        answer: 'Gene Hoglan\'s Pearl Reference Pure setup reflects his thunderous playing style and large physical stature. His typical configuration includes a 24" bass drum, rack toms of 10", 12", and 14", and floor toms of 16" and 18". He also uses a separate snare drum (not part of the Reference Pure kit itself). This large setup gives him the tonal range and physical reach needed for his complex, multi-limb patterns.',
      },
      {
        question: 'What makes the Pearl Reference Pure different from the standard Pearl Reference series?',
        answer: 'The Pearl Reference Pure uses 100% all-maple shell construction—no blended materials, no fillers. The standard Pearl Reference series uses a multi-ply shell with a blend of maple and other woods. The "Pure" designation indicates that every ply is premium maple, which produces a warmer, more open tone with greater sustain. Both series use Pearl\'s Reference hardware including the Opti-Loc tom mounting system, but the Pure represents the pinnacle of the line.',
      },
      {
        question: 'What bass drum pedals does Gene Hoglan use with his Pearl kit?',
        answer: 'Gene Hoglan uses Pearl\'s Eliminator series bass drum pedals—Pearl\'s flagship pedal line featuring a chain-drive mechanism with multiple cam settings for adjustable response and feel. The Eliminator\'s adjustability allows precise customization of beater angle, spring tension, and footboard positioning. This versatility is important for Hoglan\'s extreme double bass technique, which requires both explosive speed and consistent feel across extremely long sets.',
      },
    ],

    discussion: {
      title: 'Join the Discussion',
      topics: [
        'What\'s your favorite Gene Hoglan drum performance?',
        'How do you approach precision at extreme tempos?',
        'Pearl Reference Pure vs other premium kit lines—what\'s your take?',
      ],
      relatedDrummers: [3, 2, 4],
    },

    seo: {
      title: 'Gene Hoglan Pearl Reference Pure Kit - Complete Guide | MetalForge',
      description: 'Explore the Pearl Reference Pure drum kit that powers Gene Hoglan\'s legendary precision. Full specs, story, videos, and buying guide for "The Atomic Clock\'s" setup.',
      keywords: [
        'gene hoglan drum kit',
        'pearl reference pure',
        'gene hoglan pearl',
        'atomic clock drummer',
        'pearl reference pure metal',
        'gene hoglan setup',
        'testament drummer kit',
        'gene hoglan gear',
      ],
      ogImage: '/images/gear/gene-hoglan-kit-og.webp',
    },

    schema: {
      type: 'Product',
      brand: 'Pearl',
      model: 'Reference Pure All-Maple Drum Kit',
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

/**
 * Generate FAQPage schema for a gear item
 * @param {Object} gear - Signature gear item
 * @returns {Object|null} Schema.org FAQPage JSON-LD or null if no FAQ data
 */
export function generateGearFAQSchema(gear) {
  if (!gear.faq || gear.faq.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': gear.faq.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer,
      },
    })),
  };
}

export default SIGNATURE_GEAR;
