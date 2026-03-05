// Vercel Serverless Function - List all drummers

const drummers = [
  {
    id: 1,
    name: 'Lars Ulrich',
    band: 'Metallica',
    bands: [
      { name: 'Metallica', period: '1981–present', current: true }
    ],
    genre: 'Thrash Metal',
    country: 'Denmark',
    image: '/images/drummers/lars-ulrich.webp',
    bio: 'Lars Ulrich is a Danish musician and co-founder of Metallica, one of the most influential thrash metal bands in history. Born in 1963, he moved to Los Angeles to pursue his drumming career and formed Metallica with James Hetfield in 1981. Known for his aggressive style and iconic drum fills, Lars has been instrumental in shaping the sound of heavy metal.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Lars_Ulrich',
      'https://www.instagram.com/larsulrich/',
      'https://www.discogs.com/artist/252889-Lars-Ulrich',
      'https://www.allmusic.com/artist/lars-ulrich-mn0000849521'
    ],
    gear: {
      drums: 'Tama Starclassic Maple',
      snare: 'Tama LU1465 Lars Ulrich Signature 14x6.5"',
      cymbals: 'Zildjian A Custom Series (14" Dyno Beat Hi-Hats, 16", 17" & 18" Rock Crashes, 20" Z Custom China, 22" Ride)',
      hardware: 'Tama Iron Cobra 900 Power Glide Double Pedal, Tama 1st Chair Throne',
      sticks: 'Ahead Lars Ulrich Signature Drumsticks',
      heads: 'Remo',
      verified: true,
      sources: ['https://www.tama.com/usa/artists/detail/98.html', 'https://zildjian.com/artists', 'https://aheaddrumsticks.com/artists/']
    },
    photos: [
      '/images/drummers/lars-ulrich.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/7/79/Lars_Ulrich_by_Gage_Skidmore_%28cropped%29.jpg
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Ahead Drumsticks', url: 'https://www.aheaddrumsticks.com' },
      { name: 'Remo Drumheads', url: 'https://remo.com' }
    ],
    videos: [
      { title: 'Sad But True - Drum Cam (Amsterdam 2023)', youtubeId: 'A96QtqEpqUA', year: 2023 },
      { title: 'For Whom The Bell Tolls - Lars Angle (Cunning Stunts)', youtubeId: 'Z_qLd2uj21w', year: 1997 },
      { title: 'Enter Sandman - S&M Lars Cam', youtubeId: 't0cDBuEOdIA', year: 1999 }
    ],
    quotes: [
      { text: "I'm not the best drummer in the world, but I'm the best drummer for Metallica.", source: "Modern Drummer Magazine", year: 2008 },
      { text: "The only way to do great work is to love what you do. I've been fortunate enough to do that for over 40 years.", source: "Drumeo Interview", year: 2020 },
      { text: "Music is the most powerful form of communication in the world. It brings people together from all walks of life.", source: "Rolling Stone", year: 2016 }
    ],
    gearTimeline: [
      {
        era: 'Early Thrash Era',
        years: '1981-1986',
        description: 'The formative years of Metallica, from garage band to major label. Lars developed his aggressive thrash style on budget gear.',
        albums: ['Kill \'Em All', 'Ride the Lightning', 'Master of Puppets'],
        gear: {
          drums: 'Camco Drums (various sizes)',
          snare: 'Ludwig Supraphonic 14x6.5"',
          cymbals: 'Zildjian A Series (14" Hi-Hats, 16" & 18" Crashes, 20" Ride)',
          hardware: 'Standard bass drum pedal',
          sticks: 'Regal Tip 5B'
        },
        notes: 'Lars played Camco drums during the early albums, known for their punchy sound that defined early thrash.'
      },
      {
        era: 'Commercial Breakthrough',
        years: '1986-1991',
        description: 'Metallica became the biggest metal band in the world. Lars upgraded to Tama and refined his signature sound.',
        albums: ['...And Justice for All', 'Metallica (Black Album)'],
        gear: {
          drums: 'Tama Artstar II',
          snare: 'Tama Bell Brass 14x6.5"',
          cymbals: 'Zildjian Z Custom Series (14" Hi-Hats, 17" & 18" Crashes, 20" China, 22" Ride)',
          hardware: 'Tama Iron Cobra Double Pedal',
          sticks: 'Zildjian Lars Ulrich Artist Series'
        },
        notes: 'The Black Album era saw Lars adopt the tight, punchy drum sound that became his trademark.'
      },
      {
        era: 'Load/ReLoad Era',
        years: '1996-1999',
        description: 'Metallica experimented with alternative rock and blues influences. Larger kit with more toms.',
        albums: ['Load', 'ReLoad', 'Garage Inc.'],
        gear: {
          drums: 'Tama Starclassic Maple',
          snare: 'Tama Lars Ulrich Signature 14x6.5" (prototype)',
          cymbals: 'Zildjian A Custom (14" Hi-Hats, 16", 17", 18" Crashes, 20" China, 22" Ride)',
          hardware: 'Tama Iron Cobra 900 Double Pedal',
          sticks: 'Ahead Lars Ulrich Signature (first aluminum sticks)'
        },
        notes: 'Lars began using Ahead aluminum drumsticks for durability during long tours.'
      },
      {
        era: 'St. Anger & Rebirth',
        years: '2003-2008',
        description: 'Raw, lo-fi production with the infamous snare sound. A polarizing but defining moment.',
        albums: ['St. Anger', 'Death Magnetic'],
        gear: {
          drums: 'Tama Starclassic Maple',
          snare: 'Tama Brass Snare (no snare wires on St. Anger)',
          cymbals: 'Zildjian A Custom Series',
          hardware: 'Tama Iron Cobra 900 Power Glide Double Pedal',
          sticks: 'Ahead Lars Ulrich Signature'
        },
        notes: 'St. Anger featured the controversial "trash can" snare sound achieved by disabling snare wires.'
      },
      {
        era: 'Modern Era',
        years: '2016-Present',
        description: 'Return to thrash roots with modern production. Current touring and recording setup.',
        albums: ['Hardwired...to Self-Destruct', '72 Seasons'],
        gear: {
          drums: 'Tama Starclassic Maple',
          snare: 'Tama LU1465 Lars Ulrich Signature 14x6.5"',
          cymbals: 'Zildjian A Custom Series (14" Dyno Beat Hi-Hats, 16", 17" & 18" Rock Crashes, 20" Z Custom China, 22" Ride)',
          hardware: 'Tama Iron Cobra 900 Power Glide Double Pedal, Tama 1st Chair Throne',
          sticks: 'Ahead Lars Ulrich Signature Drumsticks'
        },
        notes: 'Lars continues to use his signature Tama setup refined over decades of touring and recording.'
      }
    ]
  },
  {
    id: 2,
    name: 'Joey Jordison',
    band: 'Slipknot',
    bands: [
      { name: 'Slipknot', period: '1995–2013', current: false },
      { name: 'Murderdolls', period: '2002–2011', current: false },
      { name: 'Sinsaenum', period: '2016–2021', current: false },
      { name: 'Vimic', period: '2016–2021', current: false }
    ],
    genre: 'Nu Metal / Death Metal',
    country: 'USA',
    image: '/images/drummers/joey-jordison.webp',
    bio: 'Joey Jordison (1975-2021) was an American musician best known as the original drummer of Slipknot. His blistering speed, technical precision, and theatrical stage presence made him one of the most influential metal drummers of his generation. He also played guitar for Murderdolls and drums for various other projects.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Joey_Jordison',
      'https://www.discogs.com/artist/355738-Joey-Jordison',
      'https://www.allmusic.com/artist/joey-jordison-mn0000796491'
    ],
    gear: {
      drums: 'Pearl Reference Series',
      snare: 'Pearl Joey Jordison Signature 13x6.5"',
      cymbals: 'Paiste RUDE & 2002 Series (14" Wild Hi-Hats, 16", 17", 18", 19" Power Crashes, 20" & 22" Wild Chinas, 22" Power Ride)',
      hardware: 'Pearl Demon Drive Double Pedal, Pearl DR-501C Icon Rack, Pearl D-2000BR Throne',
      sticks: 'Promark Joey Jordison Signature TX515W',
      heads: 'Evans',
      verified: true,
      sources: ['https://pearldrum.com/en/artist/joey-jordison', 'https://www.paiste.com/en/musicians/joey-jordison']
    },
    photos: [
      '/images/drummers/joey-jordison.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/b/b4/JoeyJordison.jpg
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Paiste Cymbals', url: 'https://www.paiste.com' },
      { name: 'Promark Sticks', url: 'https://www.daddario.com/promark' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { title: 'Disasterpieces Drum Solo (Official)', youtubeId: 'tUibKh0Z--c', year: 2002 },
      { title: 'People=Shit - Drum Cam (London 2002)', youtubeId: 'zRS9uKs3Rlk', year: 2002 },
      { title: 'Drum Cam 4K Compilation', youtubeId: 'RdXMcj7xv20', year: 2000 }
    ],
    quotes: [
      { text: "The drums chose me. I didn't choose them. It was like destiny.", source: "Modern Drummer Magazine", year: 2004 },
      { text: "Every time I sit behind a drum kit, I want to destroy it. That's the only way I know how to play.", source: "Revolver Magazine", year: 2008 },
      { text: "Practice doesn't make perfect. Perfect practice makes perfect. There's a big difference.", source: "Drum! Magazine", year: 2010 }
    ],
    gearTimeline: [
      {
        era: 'Early Slipknot',
        years: '1995-1999',
        description: 'The underground years. Joey built Slipknot\'s sound in Des Moines basements with aggressive, chaotic drumming.',
        albums: ['Mate. Feed. Kill. Repeat.', 'Slipknot'],
        gear: {
          drums: 'ddrum Custom Kit',
          snare: 'Pearl Free Floating 14x6.5" Steel',
          cymbals: 'Paiste 2002 Series (14" Hi-Hats, 18" Crashes, 20" Ride, 18" China)',
          hardware: 'DW 5000 Double Pedal',
          sticks: 'Promark 5B'
        },
        notes: 'Joey\'s early setup was aggressive and utilitarian, built for the brutal underground scene.'
      },
      {
        era: 'Breakthrough & Iowa',
        years: '1999-2004',
        description: 'Slipknot exploded globally. Joey refined his iconic rotating drum riser setup and pushed technical limits.',
        albums: ['Iowa', 'Vol. 3: (The Subliminal Verses)'],
        gear: {
          drums: 'Pearl MasterWorks Series (Custom Purple)',
          snare: 'Pearl Joey Jordison Signature 13x6.5"',
          cymbals: 'Paiste RUDE & 2002 Series (14" Wild Hi-Hats, 17", 18", 19" Power Crashes, 20" Wild China, 22" Power Ride)',
          hardware: 'Pearl Demon Drive Double Pedal, Pearl Icon Rack System',
          sticks: 'Promark Joey Jordison Signature TX515W'
        },
        notes: 'The Iowa era featured the famous rotating/inverted drum platform for theatrical live shows.'
      },
      {
        era: 'All Hope Is Gone Era',
        years: '2008-2013',
        description: 'Slipknot\'s most commercially successful period. Joey\'s playing became more refined while maintaining intensity.',
        albums: ['All Hope Is Gone'],
        gear: {
          drums: 'Pearl Reference Series (Granite Sparkle)',
          snare: 'Pearl Joey Jordison Signature 13x6.5"',
          cymbals: 'Paiste RUDE & 2002 Series (14" Wild Hi-Hats, 16", 17", 18", 19" Power Crashes, 20" & 22" Wild Chinas, 22" Power Ride)',
          hardware: 'Pearl Demon Drive Double Pedal, Pearl DR-501C Icon Rack, Pearl D-2000BR Throne',
          sticks: 'Promark Joey Jordison Signature TX515W'
        },
        notes: 'Peak of Joey\'s technical abilities and showmanship with Slipknot.'
      },
      {
        era: 'Post-Slipknot Projects',
        years: '2013-2021',
        description: 'After leaving Slipknot, Joey focused on Sinsaenum, Vimic, and other projects while battling health issues.',
        albums: ['Sinsaenum - Echoes of the Tortured', 'Vimic - Open Your Omen'],
        gear: {
          drums: 'SJC Custom Drums',
          snare: 'SJC Custom 14x6.5"',
          cymbals: 'Paiste RUDE Series',
          hardware: 'Pearl Demon Drive Double Pedal',
          sticks: 'Promark Joey Jordison Signature TX515W'
        },
        notes: 'Joey battled transverse myelitis but continued performing until his passing in 2021.'
      }
    ],
    spotlight: {
      quickFacts: [
        'Recorded drums for Iowa album in just 10 days',
        'Famous for playing on a rotating/inverted drum riser',
        "Voted #1 in Revolver's Greatest Metal Drummers list"
      ],
      iconicMoment: "His blistering performance on Slipknot's Iowa album is considered one of the most intense drumming recordings in metal history.",
      gearHighlight: 'The Pearl Joey Jordison Signature snare (13x6.5") became the go-to snare for aggressive nu-metal and death metal drummers worldwide.'
    }
  },
  {
    id: 3,
    name: 'Gene Hoglan',
    band: 'Death / Testament / Dethklok',
    bands: [
      { name: 'Dark Angel', period: '1984–1992, 2013–present', current: true },
      { name: 'Death', period: '1993–1995', current: false },
      { name: 'Testament', period: '2007–2011, 2014–present', current: true },
      { name: 'Dethklok', period: '2007–2013', current: false },
      { name: 'Fear Factory', period: '1997–1998', current: false },
      { name: 'Strapping Young Lad', period: '2003–2006', current: false }
    ],
    genre: 'Death Metal / Thrash Metal',
    country: 'USA',
    image: '/images/drummers/gene-hoglan.webp',
    bio: 'Gene Hoglan, nicknamed "The Atomic Clock" for his precise timing, is one of the most respected drummers in extreme metal. Born in 1967, he has played with Death, Dark Angel, Testament, Strapping Young Lad, Fear Factory, and Dethklok. His combination of speed, power, and musicality has influenced countless metal drummers.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Gene_Hoglan',
      'https://www.instagram.com/gene_hoglan/',
      'https://www.discogs.com/artist/252919-Gene-Hoglan',
      'https://www.allmusic.com/artist/gene-hoglan-mn0000646612'
    ],
    gear: {
      drums: 'Pearl Reference Pure',
      snare: 'Pearl Reference 14x6.5" Brass',
      cymbals: 'Sabian AAX Series (15" Hi-Hats, 18" & 20" Crashes, 22" Ride, 20" China)',
      hardware: 'Pearl Demon Drive Double Pedal, Pearl D-2000 Throne',
      sticks: 'Promark 5B',
      heads: 'Evans',
      verified: true,
      sources: ['https://pearldrum.com/en/artist/gene-hoglan', 'https://www.drumeo.com/beat/gene-hoglans-drum-kit/']
    },
    photos: [
      '/images/drummers/gene-hoglan.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/6/60/Gene_Hoglan_-_Testament_%28cropped%29.jpg
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Sabian Cymbals', url: 'https://sabian.com' },
      { name: 'Promark Sticks', url: 'https://www.daddario.com/promark' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { title: 'The Philosopher (Death) - Official Playthrough', youtubeId: 'eGope68pHf0', year: 2016 },
      { title: 'Skeksis (Strapping Young Lad) - Official Playthrough', youtubeId: '-eaIvh6ELVg', year: 2015 },
      { title: 'True American Hate - Drum Cam (Tuska 2013)', youtubeId: 'wagKFfcbP5s', year: 2013 }
    ],
    gearTimeline: [
      {
        era: 'Dark Angel Era',
        years: '1984-1989',
        description: 'Gene\'s breakthrough years with Dark Angel, establishing the "Human Drum Machine" nickname.',
        albums: ['Darkness Descends', 'Leave Scars', 'Time Does Not Heal'],
        gear: {
          drums: 'Tama Superstar',
          snare: 'Tama 14x6.5" Steel',
          cymbals: 'Zildjian A Series (14" Hi-Hats, 18" Crashes, 20" Ride, 18" China)',
          hardware: 'Tama Camco Double Pedal',
          sticks: 'Pro-Mark 5B'
        },
        notes: 'Gene earned the nickname "Human Drum Machine" for his metronomic precision on Darkness Descends.'
      },
      {
        era: 'Death Era',
        years: '1991-1995',
        description: 'Gene joined Chuck Schuldiner\'s Death, bringing technical death metal drumming to new heights.',
        albums: ['Individual Thought Patterns', 'Symbolic'],
        gear: {
          drums: 'Tama Artstar II',
          snare: 'Tama Bell Brass 14x6.5"',
          cymbals: 'Zildjian A Custom (14" Hi-Hats, 17" & 18" Crashes, 21" Ride, 18" China)',
          hardware: 'Tama Iron Cobra Double Pedal',
          sticks: 'Zildjian Artist Series'
        },
        notes: 'His work with Death is considered some of the finest technical death metal drumming ever recorded.'
      },
      {
        era: 'Strapping Young Lad',
        years: '1997-2007',
        description: 'Alongside Devin Townsend, Gene pushed extreme metal boundaries with industrial and progressive elements.',
        albums: ['City', 'SYL', 'Alien', 'The New Black'],
        gear: {
          drums: 'Tama Starclassic',
          snare: 'Tama Brass 14x6.5"',
          cymbals: 'Sabian AAX Series (14" Hi-Hats, 18" & 19" Crashes, 21" Ride, 19" China)',
          hardware: 'Tama Speed Cobra Double Pedal',
          sticks: 'Promark 5B'
        },
        notes: 'City is often cited as one of the heaviest albums ever made, showcasing Gene\'s versatility.'
      },
      {
        era: 'Testament & Dethklok',
        years: '2007-Present',
        description: 'Gene became Testament\'s drummer while also recording with the animated band Dethklok.',
        albums: ['The Formation of Damnation', 'Dark Roots of Earth', 'Titans of Creation', 'Dethalbum I, II, III'],
        gear: {
          drums: 'Pearl Reference Pure',
          snare: 'Pearl Reference 14x6.5" Brass',
          cymbals: 'Sabian AAX Series (15" Hi-Hats, 18" & 20" Crashes, 22" Ride, 20" China)',
          hardware: 'Pearl Demon Drive Double Pedal, Pearl D-2000 Throne',
          sticks: 'Promark 5B'
        },
        notes: 'At 57+, Gene continues to be one of the most in-demand drummers in extreme metal.'
      }
    ],
    quotes: [
      { text: "I was always the guy who wanted to be the best. Not the fastest, but the most musical, the most precise.", source: "Modern Drummer Magazine", year: 2015 },
      { text: "Speed is useless without control. I'd rather play something perfectly at 180 BPM than sloppily at 220.", source: "Drumeo Interview", year: 2018 },
      { text: "Working with Chuck Schuldiner on Death taught me that extreme music can be intelligent and emotional, not just brutal.", source: "Revolver Magazine", year: 2016 }
    ],
    spotlight: {
      quickFacts: [
        'Nicknamed "The Atomic Clock" for metronomic precision',
        "Played on Death's legendary Individual Thought Patterns",
        'Has performed with over 20 major metal bands'
      ],
      iconicMoment: 'His work with Death on Symbolic elevated technical death metal drumming to an art form, inspiring countless drummers.',
      gearHighlight: "Gene's Pearl Reference Pure kit delivers the perfect balance of power and articulation for extreme metal."
    }
  },
  {
    id: 4,
    name: 'Dave Lombardo',
    band: 'Slayer',
    bands: [
      { name: 'Slayer', period: '1981–1992, 2001–2013', current: false },
      { name: 'Suicidal Tendencies', period: '2016–present', current: true },
      { name: 'Dead Cross', period: '2017–present', current: true },
      { name: 'Mr. Bungle', period: '2019–present', current: true },
      { name: 'Fantômas', period: '1998–2008', current: false }
    ],
    genre: 'Thrash Metal',
    country: 'Cuba/USA',
    image: '/images/drummers/dave-lombardo.webp',
    bio: 'Dave Lombardo, born in Cuba in 1965, is widely regarded as one of the greatest drummers in metal history. As the original drummer of Slayer, he pioneered the double bass drumming style that defined thrash metal. His work on albums like "Reign in Blood" is considered groundbreaking. He has also played with Fantomas, Suicidal Tendencies, and Dead Cross.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Dave_Lombardo',
      'https://www.instagram.com/davelombardo/',
      'https://www.discogs.com/artist/252908-Dave-Lombardo',
      'https://www.allmusic.com/artist/dave-lombardo-mn0000134767'
    ],
    gear: {
      drums: 'Tama Starclassic Maple',
      snare: 'Tama S.L.P. 14x6.5" G-Maple',
      cymbals: 'Paiste RUDE & 2002 Series (15" Sound Edge Hi-Hats, 18" & 19" Crashes, 22" Reign Power Ride, 18" China)',
      hardware: 'Tama Iron Cobra 900 Double Pedal, Tama 1st Chair Throne',
      sticks: 'Promark Dave Lombardo Signature 2Bx',
      verified: true,
      sources: ['https://www.tama.com/usa/artists/detail/1044.html', 'https://www.paiste.com/en/musicians/dave-lombardo']
    },
    photos: [
      '/images/drummers/dave-lombardo.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/d/df/Dave_Lombardo_8.5.14.jpeg
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Paiste Cymbals', url: 'https://www.paiste.com' },
      { name: 'Promark Sticks', url: 'https://www.daddario.com/promark' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { title: 'War Ensemble - Drum Cam (Yankee Stadium, Official)', youtubeId: '3ivOfkqFmxg', year: 2010 },
      { title: 'Angel of Death - Drum Cam', youtubeId: 'ManyDSIC8fQ', year: 2010 },
      { title: 'Full Show Drum Cam (St Louis 2003)', youtubeId: '3kBCky31sTg', year: 2003 }
    ],
    quotes: [
      { text: "Speed is nothing without control. You have to be able to play fast and tight at the same time.", source: "Modern Drummer Magazine", year: 2006 },
      { text: "I never wanted to be a typical metal drummer. I wanted to bring jazz, Latin, and world music into heavy music.", source: "Drumeo Interview", year: 2019 },
      { text: "Reign in Blood changed everything. We didn't know we were making history, we were just playing as fast as we could.", source: "Revolver Magazine", year: 2016 }
    ],
    gearTimeline: [
      {
        era: 'Early Slayer',
        years: '1981-1986',
        description: 'The birth of thrash metal. Dave pioneered double bass technique that would define the genre.',
        albums: ['Show No Mercy', 'Haunting the Chapel', 'Hell Awaits'],
        gear: {
          drums: 'Tama Imperialstar',
          snare: 'Tama 14x6.5" Steel',
          cymbals: 'Zildjian A Series (14" Hi-Hats, 16" & 18" Crashes, 20" Ride, 18" China)',
          hardware: 'Tama Camco Double Pedal',
          sticks: 'Pro-Mark 5A'
        },
        notes: 'Dave developed his signature double bass technique during these early years in LA.'
      },
      {
        era: 'Reign in Blood Era',
        years: '1986-1990',
        description: 'The golden age of Slayer. Reign in Blood redefined speed and aggression in metal.',
        albums: ['Reign in Blood', 'South of Heaven', 'Seasons in the Abyss'],
        gear: {
          drums: 'Tama Artstar II',
          snare: 'Tama Bell Brass 14x6.5"',
          cymbals: 'Paiste RUDE Series (14" Sound Edge Hi-Hats, 18" & 19" Crashes, 20" Ride, 18" China)',
          hardware: 'Tama Iron Cobra Double Pedal',
          sticks: 'Promark 2B'
        },
        notes: 'Reign in Blood is widely considered one of the most influential thrash albums ever recorded.'
      },
      {
        era: 'First Departure',
        years: '1992-2001',
        description: 'After leaving Slayer, Dave explored diverse projects including Grip Inc. and Fantômas.',
        albums: ['Grip Inc. - Power of Inner Strength', 'Fantômas - Fantômas'],
        gear: {
          drums: 'Tama Starclassic',
          snare: 'Tama 14x6.5" Maple',
          cymbals: 'Paiste 2002 & RUDE Series',
          hardware: 'Tama Iron Cobra 900 Double Pedal',
          sticks: 'Promark Dave Lombardo Signature'
        },
        notes: 'Dave explored jazz, Latin, and experimental music with Mike Patton\'s Fantômas.'
      },
      {
        era: 'Slayer Reunion',
        years: '2001-2013',
        description: 'Dave rejoined Slayer for their final classic era before his second departure.',
        albums: ['God Hates Us All', 'Christ Illusion', 'World Painted Blood'],
        gear: {
          drums: 'Tama Starclassic Maple',
          snare: 'Tama S.L.P. 14x6.5" G-Maple',
          cymbals: 'Paiste RUDE & 2002 Series (15" Sound Edge Hi-Hats, 18" & 19" Crashes, 22" Reign Power Ride, 18" China)',
          hardware: 'Tama Iron Cobra 900 Double Pedal, Tama 1st Chair Throne',
          sticks: 'Promark Dave Lombardo Signature 2Bx'
        },
        notes: 'Christ Illusion won a Grammy for Best Metal Performance.'
      },
      {
        era: 'Post-Slayer Projects',
        years: '2013-Present',
        description: 'Dave continues with Dead Cross, Suicidal Tendencies, and Mr. Bungle reunion.',
        albums: ['Dead Cross - Dead Cross', 'Dead Cross - II', 'Mr. Bungle - The Raging Wrath of the Easter Bunny Demo'],
        gear: {
          drums: 'Tama Starclassic Walnut/Birch',
          snare: 'Tama S.L.P. 14x6.5" G-Maple',
          cymbals: 'Paiste RUDE & 2002 Series',
          hardware: 'Tama Iron Cobra 900 Double Pedal',
          sticks: 'Promark Dave Lombardo Signature 2Bx'
        },
        notes: 'At nearly 60, Dave remains one of the most active and influential drummers in extreme music.'
      }
    ]
  },
  {
    id: 5,
    name: 'Tomas Haake',
    band: 'Meshuggah',
    bands: [
      { name: 'Meshuggah', period: '1990–present', current: true }
    ],
    genre: 'Progressive Metal / Djent',
    country: 'Sweden',
    image: '/images/drummers/tomas-haake.webp',
    bio: 'Tomas Haake, born in 1971, is the drummer and primary lyricist for Swedish extreme metal band Meshuggah. His polyrhythmic drumming style, characterized by complex time signatures and intricate patterns, has been hugely influential in the development of djent and progressive metal. He is known for his metronomic precision and innovative approach.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Tomas_Haake',
      'https://www.discogs.com/artist/281578-Tomas-Haake',
      'https://www.allmusic.com/artist/tomas-haake-mn0001678091'
    ],
    gear: {
      drums: 'Sonor SQ2 Heavy Beech (24"x18" Bass, 10"x8", 12"x9", 13"x10", 16"x14", 18"x16" Toms)',
      snare: 'Sonor Tomas Haake Signature 14x6.5" & Artist Series Bronze',
      cymbals: 'Sabian HHX & AAX Series (14" HHX Compression Hi-Hats, 15" Artisan Hi-Hats, 19" & 20" & 21" HHX Stage Crashes, 22" Legacy Ride, 19" AAXtreme China)',
      hardware: 'Tama Speed Cobra Single Pedals (x2), Porter & Davies BC2 Throne',
      sticks: 'Wincent Tomas Haake Signature',
      heads: 'Remo',
      verified: true,
      sources: ['https://www.sonor.com/drums/artists/artists-detail/tomas-haake', 'https://sabian.com/artist/tomas-haake/', 'https://www.wincent.se']
    },
    photos: [
      '/images/drummers/tomas-haake.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/7/7b/Meshuggah_-_Rock_am_Ring_2023-44313.jpg
    ],
    endorsements: [
      { name: 'Sonor Drums', url: 'https://www.sonor.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'Wincent Drumsticks', url: 'https://www.wincent.se' },
      { name: 'Remo Drumheads', url: 'https://remo.com' }
    ],
    videos: [
      { title: 'Bleed - Wincent Drumsticks (8.1M views)', youtubeId: 'bAJ1WTGNISk', year: 2013 },
      { title: 'Clockworks - Official Drum Playthrough', youtubeId: 'axGn6qeJHcM', year: 2016 },
      { title: 'Drumming Footage - New England Metal Fest (Official)', youtubeId: 'kMo5VxRrgcY', year: 2008 }
    ],
    gearTimeline: [
      {
        era: 'Early Meshuggah',
        years: '1987-1994',
        description: 'The formation years, transitioning from thrash to their signature polyrhythmic style.',
        albums: ['Contradictions Collapse', 'None'],
        gear: {
          drums: 'Pearl Export',
          snare: 'Pearl 14x6.5" Steel',
          cymbals: 'Sabian AA Series (14" Hi-Hats, 16" & 18" Crashes, 20" Ride)',
          hardware: 'Pearl P-900 Double Pedal',
          sticks: 'Vic Firth 5B'
        },
        notes: 'Tomas was still developing the polyrhythmic approach that would define Meshuggah.'
      },
      {
        era: 'Destroy Erase Improve Era',
        years: '1995-1998',
        description: 'Meshuggah\'s breakthrough album introduced their revolutionary polyrhythmic concepts.',
        albums: ['Destroy Erase Improve', 'The True Human Design'],
        gear: {
          drums: 'Sonor Designer Series',
          snare: 'Sonor 14x6.5" Bronze',
          cymbals: 'Sabian HH Series (14" Hi-Hats, 18" & 19" Crashes, 21" Ride, 18" China)',
          hardware: 'Tama Iron Cobra Double Pedal',
          sticks: 'Vic Firth Extreme 5B'
        },
        notes: 'Destroy Erase Improve is often cited as one of the most influential metal albums of the 90s.'
      },
      {
        era: 'Chaosphere/Nothing',
        years: '1998-2005',
        description: 'The sound became heavier and the polyrhythms more complex. Spawned countless imitators.',
        albums: ['Chaosphere', 'Nothing', 'I'],
        gear: {
          drums: 'Sonor SQ2',
          snare: 'Sonor Tomas Haake Signature 14x6.5"',
          cymbals: 'Sabian HHX Series (14" Compression Hi-Hats, 19" & 20" Stage Crashes, 22" Ride, 19" China)',
          hardware: 'Tama Speed Cobra Single Pedals (x2)',
          sticks: 'Wincent 5B'
        },
        notes: 'Tomas began using two single pedals instead of a double pedal for more control.'
      },
      {
        era: 'Djent Influence Era',
        years: '2005-2012',
        description: 'Meshuggah inspired the entire djent movement. Tomas\'s drumming became the gold standard.',
        albums: ['Catch Thirtythree', 'obZen', 'Koloss'],
        gear: {
          drums: 'Sonor SQ2 Heavy Beech',
          snare: 'Sonor Tomas Haake Signature 14x6.5" & Artist Series Bronze',
          cymbals: 'Sabian HHX & AAX Series (14" HHX Compression Hi-Hats, 19" & 20" HHX Stage Crashes, 22" Legacy Ride, 19" AAXtreme China)',
          hardware: 'Tama Speed Cobra Single Pedals (x2), Porter & Davies BC2 Throne',
          sticks: 'Wincent Tomas Haake Signature'
        },
        notes: 'obZen\'s "Bleed" became one of the most technically demanding drum tracks in metal history.'
      },
      {
        era: 'Modern Era',
        years: '2016-Present',
        description: 'Meshuggah continues to push boundaries while Tomas refines his signature approach.',
        albums: ['The Violent Sleep of Reason', 'Immutable'],
        gear: {
          drums: 'Sonor SQ2 Heavy Beech (24"x18" Bass, 10"x8", 12"x9", 13"x10", 16"x14", 18"x16" Toms)',
          snare: 'Sonor Tomas Haake Signature 14x6.5" & Artist Series Bronze',
          cymbals: 'Sabian HHX & AAX Series (14" HHX Compression Hi-Hats, 15" Artisan Hi-Hats, 19" & 20" & 21" HHX Stage Crashes, 22" Legacy Ride, 19" AAXtreme China)',
          hardware: 'Tama Speed Cobra Single Pedals (x2), Porter & Davies BC2 Throne',
          sticks: 'Wincent Tomas Haake Signature'
        },
        notes: 'Tomas\'s influence on modern metal drumming cannot be overstated. He defined an entire subgenre.'
      }
    ],
    quotes: [
      { text: "The polyrhythmic approach came from wanting to create something that felt both mechanical and organic at the same time.", source: "Modern Drummer Magazine", year: 2012 },
      { text: "I use two single pedals instead of a double pedal because I want more independence and control over each foot.", source: "Drumeo Interview", year: 2019 },
      { text: "'Bleed' took me six months of daily practice to play consistently. Some things just take time.", source: "Gear Gods Interview", year: 2017 }
    ]
  },
  {
    id: 6,
    name: 'George Kollias',
    band: 'Nile',
    bands: [
      { name: 'Nile', period: '2004–present', current: true },
      { name: 'Nightfall', period: '2002–2009', current: false }
    ],
    genre: 'Technical Death Metal',
    country: 'Greece',
    image: '/images/drummers/george-kollias.webp',
    bio: 'George Kollias, born in 1977, is a Greek drummer known for his extreme speed and technical proficiency. As the drummer for Nile since 2004, he has pushed the boundaries of death metal drumming with his incredible blast beats and double bass technique. He is also an educator and has released instructional materials.',
    sameAs: [
      'https://en.wikipedia.org/wiki/George_Kollias_(drummer)',
      'https://www.instagram.com/george_kollias/',
      'https://www.discogs.com/artist/544679-George-Kollias',
      'https://www.allmusic.com/artist/george-kollias-mn0001019714'
    ],
    gear: {
      drums: 'Pearl Masterworks Stadium Exotic (Piano Black with Gold Hardware)',
      snare: 'Pearl George Kollias Signature 14x6.5"',
      cymbals: 'Zildjian (14" K Mastersound Hi-Hats, 17" & 18" K Custom Dark Crashes, 21" A Custom Mega Bell Ride, 18" China)',
      hardware: 'Pearl Demon XR Double Pedal (Co-designed), Pearl D-3000 Throne',
      sticks: 'Vic Firth George Kollias Signature SGK',
      heads: 'Evans',
      verified: true,
      sources: ['https://pearldrum.com/en/artist/george-kollias/15801', 'https://zildjian.com/artists', 'https://vicfirth.com/products/signature-series-george-kollias']
    },
    photos: [
      '/images/drummers/george-kollias.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/e/e8/GK_10.jpg
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { title: 'Shall Rise Shall Be Dead (5M views)', youtubeId: 'RqzZmNqdWck', year: 2012 },
      { title: 'US Tour 2013 DrumCam (Official)', youtubeId: '86YtBw5gmAM', year: 2013 },
      { title: 'Black Seeds Of Vengeance - Pearl Drum Cam', youtubeId: 'dU-JXLRqjiE', year: 2012 }
    ]
  },
  {
    id: 7,
    name: 'Eloy Casagrande',
    band: 'Slipknot',
    bands: [
      { name: 'Slipknot', period: '2023–present', current: true },
      { name: 'Sepultura', period: '2011–2024', current: false }
    ],
    genre: 'Nu Metal / Thrash Metal',
    country: 'Brazil',
    image: '/images/drummers/eloy-casagrande.webp',
    bio: 'Eloy Casagrande, born in 1991, is a Brazilian drummer who became Sepultura\'s drummer in 2011 and joined Slipknot in 2024 as their new drummer. Named the No. 1 metal drummer in Modern Drummer magazine\'s 2024 Readers\' Poll, he is known for his explosive speed, technical prowess, and energetic performances. His drumming style combines traditional metal with modern technical elements, making him one of the most exciting drummers in contemporary metal.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Eloy_Casagrande',
      'https://www.instagram.com/eloycasagrande/',
      'https://www.discogs.com/artist/1665217-Eloy-Casagrande',
      'https://www.allmusic.com/artist/eloy-casagrande-mn0002596379'
    ],
    gear: {
      drums: 'Tama Starclassic Bubinga (22"x16" & 24"x14" Bass Drums, 10", 12", 13" Toms, 16" & 18" Floor Toms)',
      snare: 'Tama Bell Brass 14x5.5" (BB146)',
      cymbals: 'Paiste (15" Masters Dark Hi-Hats, 20" Masters Dark Ride, 20" & 20" 602 Crashes, 10" Rude Splash, 20" Masters Dark Crash, 20" 2002 Heavy Ride, 20" 2002 Novo China, 10" 2002 Mega Bell, Symphonic Gong)',
      hardware: 'Tama Iron Cobra Double Pedal, Yamaha DTX Electronic Pads',
      sticks: 'Promark Eloy Casagrande Signature',
      heads: 'Evans',
      verified: true,
      verifiedAt: '2026-02-01',
      sources: ['https://www.tama.com/usa/artists/', 'https://en.beatit.tv/eloy-casagrandes-2024-slipknot-drum-kit/', 'https://www.paiste.com/en/musicians']
    },
    photos: [
      '/images/drummers/eloy-casagrande.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/8/86/Sepultura_-_2023219214143_2023-08-07_Sepultura_-_Sven_-_1D_X_MK_II_-_0650_-_AK8I2527.jpg
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Paiste Cymbals', url: 'https://www.paiste.com' },
      { name: 'Promark Sticks', url: 'https://www.daddario.com/promark' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { title: 'Desperate Cry - Sepultura (3.3M views)', youtubeId: '1ktbtG-zD8Y', year: 2017 },
      { title: 'Means To An End - Official Drum Cam', youtubeId: 'dQe3EwkPcFU', year: 2019 },
      { title: 'Roots Bloody Roots - Rock in Rio (Official)', youtubeId: 'J9W1CxQmTxI', year: 2022 }
    ]
  },
  {
    id: 8,
    name: 'Ray Luzier',
    band: 'Korn',
    bands: [
      { name: 'Korn', period: '2007–present', current: true },
      { name: 'KXM', period: '2013–present', current: true },
      { name: 'Army of Anyone', period: '2006–2007', current: false }
    ],
    genre: 'Nu Metal',
    country: 'USA',
    image: '/images/drummers/ray-luzier.webp',
    bio: 'Ray Luzier, born in 1970, is an American drummer who joined Korn in 2007. Before Korn, he was a sought-after session musician, working with artists like David Lee Roth and Army of Anyone. His drumming combines rock solid grooves with technical flair, bringing a fresh energy to Korn\'s signature sound while respecting their nu-metal roots.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Ray_Luzier',
      'https://www.discogs.com/artist/356148-Ray-Luzier',
      'https://www.allmusic.com/artist/ray-luzier-mn0000356844'
    ],
    gear: {
      drums: 'Pearl Reference Series',
      snare: 'Pearl Reference 14x6.5" Brass',
      cymbals: 'Sabian AAX Series (14" Stage Hi-Hats, 18" & 19" X-Plosion Crashes, 21" Stage Ride, 18" AAXtreme China)',
      hardware: 'DW 9002 Double Pedal, Pearl D-2000 Roadster Throne',
      sticks: 'Vic Firth Ray Luzier Signature'
    },
    photos: [
      '/images/drummers/ray-luzier.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/c/c8/Ray_Luzier_of_Korn.jpg
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' },
      { name: 'DW Hardware', url: 'https://www.dwdrums.com' }
    ],
    videos: [
      { title: 'Freak On A Leash - Vic Firth (5M views)', youtubeId: 'Vp6_NMOzPNw', year: 2015 },
      { title: 'Korn Medley - UK Drum Show (Vic Firth)', youtubeId: 'xjYHh1D_8Po', year: 2019 },
      { title: 'Got The Life - GoPro Drum Cam', youtubeId: 'g2k0PpRw2f4', year: 2014 }
    ]
  },
  {
    id: 9,
    name: 'John Otto',
    band: 'Limp Bizkit',
    bands: [
      { name: 'Limp Bizkit', period: '1994–present', current: true }
    ],
    genre: 'Nu Metal / Rap Metal',
    country: 'USA',
    image: '/images/drummers/john-otto.webp',
    bio: 'John Otto, born in 1977, is the drummer and a founding member of Limp Bizkit. His hip-hop influenced drumming style, combining tight grooves with funk-inspired beats, was essential in defining the rap-metal sound of the late 90s and early 2000s. His ability to blend rock power with hip-hop feel made Limp Bizkit one of the biggest bands of the nu-metal era.',
    sameAs: [
      'https://en.wikipedia.org/wiki/John_Otto_(musician)',
      'https://www.instagram.com/johnotto/',
      'https://www.discogs.com/artist/360637-John-Otto',
      'https://www.allmusic.com/artist/john-otto-mn0000192831'
    ],
    gear: {
      drums: 'Orange County Drum & Percussion (OCDP) Custom Type 5 Acrylic',
      snare: 'OCDP 14x6.5" 40-ply Vented, OCDP 10x6" 20-ply',
      cymbals: 'Zildjian (13" A Custom Mastersound Hi-Hats, 16" & 17" A Custom Projection Crashes, 20" A Custom EFX, 20" FX Oriental Crash of Doom)',
      hardware: 'Gibraltar G Class Bass Drum Pedals, Gibraltar Custom Racks',
      sticks: 'Zildjian Artist Series',
      heads: 'Remo Emperor Coated',
      verified: true,
      sources: ['https://remo.com/profile/john-otto', 'https://www.moderndrummer.com/2024/10/john-otto-limp-bizkit-modern-drummer-podcast-with-david-frangioni-16/']
    },
    photos: [
      '/images/drummers/john-otto.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/0/0a/Drummer_John_Otto_of_Limp_Bizkit_in_2006.jpg
    ],
    endorsements: [
      { name: 'OCDP Drums', url: 'https://www.ocdrum.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Zildjian Drumsticks', url: 'https://zildjian.com' },
      { name: 'Remo Drumheads', url: 'https://remo.com' },
      { name: 'Gibraltar Hardware', url: 'https://www.gibraltarhardware.com' }
    ],
    videos: [
      { title: 'Boiler - Live Drum Cam Clip', youtubeId: 'pmyWqwaGNbg', year: 2019 },
      { title: 'Drum Solo (Classic)', youtubeId: '3tWvneQTgRU', year: 2006 },
      { title: 'Interview and Rollin\' LIVE Drum Cam', youtubeId: 'wTm9KLDxc9k', year: 2024 }
    ]
  },
  {
    id: 10,
    name: 'Jay Weinberg',
    band: 'Suicidal Tendencies',
    bands: [
      { name: 'Suicidal Tendencies', period: '2023–present', current: true },
      { name: 'Slipknot', period: '2014–2023', current: false },
      { name: 'Against Me!', period: '2009–2014', current: false }
    ],
    genre: 'Hardcore / Thrash Crossover',
    country: 'USA',
    image: '/images/drummers/jay-weinberg.webp',
    bio: 'Jay Weinberg, born in 1990, is the son of E Street Band drummer Max Weinberg. He joined Slipknot in 2014, becoming their drummer after Joey Jordison\'s departure. Before Slipknot, he briefly played with Against Me! and Madball. His powerful, aggressive style honored Slipknot\'s legacy while adding his own intensity. In 2023, he parted ways with Slipknot and joined Suicidal Tendencies, touring with them on Metallica\'s M72 World Stadium Tour.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Jay_Weinberg',
      'https://www.instagram.com/jayweinberg/',
      'https://www.discogs.com/artist/1940247-Jay-Weinberg',
      'https://www.allmusic.com/artist/jay-weinberg-mn0002419959'
    ],
    gear: {
      drums: 'SJC Custom Drums (OBEY x ST Collaboration Kit)',
      snare: 'SJC Jay Weinberg "The Crucible" 14x6.5" 48-ply Brass',
      cymbals: 'Zildjian (14" A New Beat Hi-Hats, 18" & 19" A Custom Crashes, 21" K Custom Ride, 19" K China, 7" FX Break Bell)',
      hardware: 'DW 9000 Series Double Pedal, DW 9100 Throne',
      sticks: 'Vater Jay Weinberg 908 Signature',
      heads: 'Evans Black Chrome',
      verified: true,
      sources: ['https://www.jayweinbergofficial.com/gear', 'https://sjcdrums.com/pages/artists', 'https://vater.com/artists/']
    },
    photos: [
      '/images/drummers/jay-weinberg.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/4/46/Suicidal_Tendencies_Rockharz_2024_18.jpg
    ],
    endorsements: [
      { name: 'SJC Custom Drums', url: 'https://www.sjcdrums.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Vater Drumsticks', url: 'https://www.vater.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' },
      { name: 'DW Hardware', url: 'https://www.dwdrums.com' },
      { name: 'Roland Electronics', url: 'https://www.roland.com' }
    ],
    videos: [
      { title: 'Unsainted - Zildjian Performance (15M views)', youtubeId: 'hfXUQuQV-4o', year: 2019 },
      { title: 'Duality - Live Drum Cam (Wacken 2022, Official)', youtubeId: 'sTs1uxjHDzA', year: 2022 },
      { title: 'Sulfur - Live Drum Cam (Wacken 2022, Official)', youtubeId: 'bQBUGf9dM1w', year: 2022 }
    ]
  },
  {
    id: 11,
    name: 'Vinnie Paul',
    band: 'Pantera / Damageplan / Hellyeah',
    bands: [
      { name: 'Pantera', period: '1981–2003', current: false },
      { name: 'Damageplan', period: '2003–2004', current: false },
      { name: 'Hellyeah', period: '2006–2018', current: false }
    ],
    genre: 'Groove Metal / Heavy Metal',
    country: 'USA',
    image: '/images/drummers/vinnie-paul.webp',
    bio: 'Vinnie Paul (1964-2018) was the co-founder and drummer of Pantera, one of the most influential heavy metal bands of all time. Alongside his brother Dimebag Darrell, he helped define the groove metal sound. Pantera received four Grammy nominations for Best Metal Performance. After Pantera\'s breakup, he formed Damageplan with his brother, and later Hellyeah. His drumming style featured powerful grooves and innovative double-bass patterns that influenced countless metal drummers. Ranked among the greatest metal drummers of all time.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Vinnie_Paul',
      'https://www.discogs.com/artist/271569-Vinnie-Paul',
      'https://www.allmusic.com/artist/vinnie-paul-mn0000594023'
    ],
    gear: {
      drums: 'ddrum Vinnie Paul Signature Series',
      snare: 'ddrum Vinnie Paul Signature 14x8"',
      cymbals: 'Sabian AA & AAX Series (14" Hi-Hats, 18" & 19" Crashes, 21" Ride, 18" China)',
      hardware: 'ddrum Double Pedal, ddrum Throne',
      sticks: 'Vic Firth American Classic 5B'
    },
    photos: [
      '/images/drummers/vinnie-paul.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/5/55/VinniePaul2008.JPG
    ],
    endorsements: [
      { name: 'ddrum Drums', url: 'https://www.ddrum.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { title: 'The MONSTER known as VINNIE PAUL (by Scott Ian)', youtubeId: 'J9FD8_kRVEc', year: 2010 },
      { title: 'GoPro Drum Cam (Full Show 2011)', youtubeId: 'E4LVFVzgxFo', year: 2011 },
      { title: 'Hellyeah - Grave (GoPro Drum Cam)', youtubeId: 'ET8IEfaTDhM', year: 2016 }
    ]
  },
  {
    id: 12,
    name: 'Charlie Benante',
    band: 'Anthrax / S.O.D. / Pantera',
    bands: [
      { name: 'Anthrax', period: '1983–present', current: true },
      { name: 'S.O.D.', period: '1985–1999', current: false },
      { name: 'Pantera', period: '2022–present', current: true }
    ],
    genre: 'Thrash Metal',
    country: 'USA',
    image: '/images/drummers/charlie-benante.webp',
    bio: 'Charlie Benante, born in 1962 in The Bronx, New York, is a pioneer of thrash metal drumming and credited with popularizing the blast beat technique. He joined Anthrax in 1983 and has appeared on all 11 of the band\'s studio albums. Known for his extremely fast double kick technique, Benante is also a talented guitarist who contributed lead guitar to S.O.D.\'s "Speak English or Die" album. He serves as Anthrax\'s main composer and is a graphic artist who created many of their album covers and T-shirt designs. In 2022, he joined the reunited Pantera, filling in for his late friend Vinnie Paul.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Charlie_Benante',
      'https://www.instagram.com/charliebenante/',
      'https://twitter.com/Charlie_Benante',
      'https://www.discogs.com/artist/252877-Charlie-Benante',
      'https://www.allmusic.com/artist/charlie-benante-mn0000765091'
    ],
    gear: {
      drums: 'Tama Starclassic',
      snare: 'Tama Charlie Benante Signature 14x6.5"',
      cymbals: 'Paiste RUDE & 2002 Series (14" Hi-Hats, 18" & 19" Crashes, 20" Power Ride, 18" China)',
      hardware: 'Tama Speed Cobra Double Pedal, Roland Electronics',
      sticks: 'Vic Firth Charlie Benante Signature'
    },
    photos: [
      '/images/drummers/charlie-benante.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/1/11/2017_Anthrax_-_Charlie_Benante_-_by_2eight_-_DSC1986_%28cropped%29.jpg
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Paiste Cymbals', url: 'https://www.paiste.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' },
      { name: 'Roland Electronics', url: 'https://www.roland.com' }
    ],
    videos: [
      { title: 'Indians - Drumeo Breakdown', youtubeId: 'OR6rUpbFOk0', year: 2023 },
      { title: 'Caught In A Mosh (Official Channel)', youtubeId: 'Fnn86OK1ZPo', year: 2011 },
      { title: 'Drum Cam Compilation', youtubeId: 'he7QfNFRdv0', year: 2018 }
    ]
  },
  {
    id: 13,
    name: 'Mike Portnoy',
    band: 'Dream Theater / Liquid Tension Experiment / The Winery Dogs',
    bands: [
      { name: 'Dream Theater', period: '1985–2010, 2023–present', current: true },
      { name: 'Liquid Tension Experiment', period: '1997–present', current: true },
      { name: 'The Winery Dogs', period: '2012–present', current: true },
      { name: 'Transatlantic', period: '1999–present', current: true },
      { name: 'Sons of Apollo', period: '2017–present', current: true }
    ],
    genre: 'Progressive Metal',
    country: 'USA',
    image: '/images/drummers/mike-portnoy.webp',
    bio: 'Mike Portnoy, born in 1967 in Long Beach, New York, is one of the most influential progressive metal drummers of all time. He co-founded Dream Theater in 1985 and was the band\'s drummer and lyricist for 25 years, helping define the progressive metal genre. A recipient of over 30 Drummer of the Year awards from Modern Drummer magazine, Portnoy is known for his technical proficiency, complex time signatures, and theatrical live performances. After leaving Dream Theater in 2010, he has played with numerous projects including Avenged Sevenfold, Adrenaline Mob, The Winery Dogs, Flying Colors, Sons of Apollo, and Liquid Tension Experiment. In 2023, he rejoined Dream Theater for their reunion tour. His drumming style combines jazz fusion influences with heavy metal power, featuring intricate double bass patterns and creative use of electronics.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Mike_Portnoy',
      'https://www.instagram.com/mikeportnoycom/',
      'https://twitter.com/MikePortnoy',
      'https://www.discogs.com/artist/252951-Mike-Portnoy',
      'https://www.allmusic.com/artist/mike-portnoy-mn0000375541'
    ],
    gear: {
      drums: 'Tama Starclassic Maple/Birch',
      snare: 'Tama Mike Portnoy Signature Melody Master 14x5.5"',
      cymbals: 'Sabian HHX Series (14" Evolution Hi-Hats, 18" & 19" Evolution Crashes, 21" Raw Bell Dry Ride, 10" & 12" Evolution Splashes, 19" O-Zone Crash)',
      hardware: 'Tama Iron Cobra Power Glide Double Pedal, Tama 1st Chair Ergo-Rider Throne',
      sticks: 'Promark Mike Portnoy Signature TX420N'
    },
    photos: [
      '/images/drummers/mike-portnoy.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/7/77/Mike_Portnoy.jpg
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'ProMark Sticks', url: 'https://www.daddario.com/promark' },
      { name: 'Remo Drumheads', url: 'https://remo.com' },
      { name: 'Roland Electronics', url: 'https://www.roland.com' }
    ],
    videos: [
      { title: 'Instrumedley - The Dance of Instrumentals (4.5M views)', youtubeId: 'XFo8UgrUkNA', year: 2003 },
      { title: 'Panic Attack - Drumeo (Official)', youtubeId: 'oa7oOdYPOSk', year: 2023 },
      { title: 'Score - Full Concert Drum & Vox Cam (Official)', youtubeId: 'eUYi4GwN9sg', year: 2006 }
    ],
    quotes: [
      { text: "I've always tried to approach drums as a musical instrument rather than just a rhythm instrument. The drums can sing.", source: "Modern Drummer Magazine", year: 2005 },
      { text: "Progressive music allows you to break all the rules. That's what makes it so exciting - there are no boundaries.", source: "Drumeo Interview", year: 2023 },
      { text: "Every drummer should learn to read music. It opens up a whole world of possibilities.", source: "Drum! Magazine", year: 2012 }
    ]
  },
  {
    id: 14,
    name: 'Danny Carey',
    band: 'Tool',
    bands: [
      { name: 'Tool', period: '1990–present', current: true },
      { name: 'Volto!', period: '1999–present', current: true },
      { name: 'Legend of the Seagullmen', period: '2018–present', current: true }
    ],
    genre: 'Progressive Metal',
    country: 'USA',
    image: '/images/drummers/danny-carey.webp',
    bio: 'Danny Carey, born in 1961 in Lawrence, Kansas, is widely regarded as one of the greatest drummers in rock and metal history. As the drummer for Tool since the band\'s formation in 1990, he has developed a unique style that blends complex polyrhythmic patterns with influences from jazz, world music, and progressive rock. His technical proficiency and creative approach to rhythm have earned him numerous accolades, including being voted the best drummer by readers of Modern Drummer magazine. Carey\'s drumming incorporates unusual time signatures, intricate subdivisions, and the use of electronic percussion. Beyond Tool, he has collaborated with artists like Pigface, Zaum, and Volto! His towering presence behind his massive Sonor kit and his dedication to expanding the boundaries of rock drumming have made him an icon in the drumming community.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Danny_Carey',
      'https://www.instagram.com/dannycareyofficial/',
      'https://www.discogs.com/artist/252943-Danny-Carey',
      'https://www.allmusic.com/artist/danny-carey-mn0000137137'
    ],
    gear: {
      drums: 'Sonor SQ2 Heavy Beech',
      snare: 'Sonor Danny Carey Signature 14x8" Bronze',
      cymbals: 'Paiste Signature Series (15" Sound Edge Hi-Hats, 18" & 19" Power Crashes, 22" Dry Heavy Ride, 20" & 22" Chinas, various Rude crashes)',
      hardware: 'Sonor Giant Step Twin Effect Double Pedal, Sonor Drummer Throne, Mandala Drum electronic pads',
      sticks: 'Vic Firth Danny Carey Signature'
    },
    photos: [
      '/images/drummers/danny-carey.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/c/c1/Danny_Carey_Hellfest_2019.jpg
    ],
    endorsements: [
      { name: 'Sonor Drums', url: 'https://www.sonor.com' },
      { name: 'Paiste Cymbals', url: 'https://www.paiste.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Remo Drumheads', url: 'https://www.remo.com' },
      { name: 'Mandala Drums', url: 'https://www.mandaladrum.com' }
    ],
    videos: [
      { title: 'Pneuma - Live in Concert', youtubeId: 'FssULNGSZIA', year: 2022 },
      { title: 'Danny Carey Evolution (1990-2025)', youtubeId: 'lrZGHOqYDBI', year: 2025 },
      { title: 'Jambi Breakdown - Live', youtubeId: 'zOf0H9a54Aw', year: 2023 }
    ],
    quotes: [
      { text: "I've always been fascinated by sacred geometry and how it relates to rhythm. The patterns in nature are the same patterns in music.", source: "Modern Drummer Magazine", year: 2019 },
      { text: "The drumset is the most expressive instrument. You can make it whisper or you can make it scream.", source: "Drumeo Interview", year: 2020 },
      { text: "I practice every day, even after 30 years. The day you stop learning is the day you stop growing as a musician.", source: "Revolver Magazine", year: 2017 },
      { text: "I try to make the drums sing. The drums can be melodic - they're not just about keeping time.", source: "Modern Drummer", year: 2006 }
    ],
    gearTimeline: [
      {
        era: 'Early Tool Era',
        years: '1990-1996',
        description: 'The formation and breakthrough years. Danny established his polyrhythmic approach and began integrating electronic elements.',
        albums: ['Opiate', 'Undertow'],
        gear: {
          drums: 'Sonor Designer Series',
          snare: 'Sonor Signature Series 14x6"',
          cymbals: 'Paiste 2002 & Signature Series',
          hardware: 'Sonor Double Pedal',
          sticks: 'Vic Firth 5B'
        },
        notes: 'Early Tool albums showcased Danny\'s jazz influences merged with alternative metal.'
      },
      {
        era: 'Ænima/Lateralus Era',
        years: '1996-2006',
        description: 'Tool\'s artistic peak. Danny\'s sacred geometry influences became prominent as the band explored complex time signatures.',
        albums: ['Ænima', 'Lateralus'],
        gear: {
          drums: 'Sonor SQ2',
          snare: 'Sonor Bronze 14x8"',
          cymbals: 'Paiste Signature Series (Sound Edge Hi-Hats, Power crashes, Dry Heavy Ride)',
          hardware: 'Sonor Giant Step Double Pedal, Mandala Drum pads',
          sticks: 'Vic Firth Danny Carey Signature'
        },
        notes: 'Lateralus features legendary polyrhythmic drumming on tracks like "Ticks & Leeches" and the title track.'
      },
      {
        era: '10,000 Days & Hiatus',
        years: '2006-2019',
        description: 'Despite Tool\'s long hiatus, Danny refined his setup and performed with Volto! and other projects.',
        albums: ['10,000 Days'],
        gear: {
          drums: 'Sonor SQ2 Heavy Beech',
          snare: 'Sonor Danny Carey Signature 14x8" Bronze',
          cymbals: 'Paiste Signature Series (15" Sound Edge Hi-Hats, various crashes, 22" Dry Heavy Ride)',
          hardware: 'Sonor Giant Step Twin Effect Double Pedal, Mandala Drum v3',
          sticks: 'Vic Firth Danny Carey Signature'
        },
        notes: '10,000 Days showcased Danny\'s most mature playing, particularly on "Rosetta Stoned" and "Right in Two".'
      },
      {
        era: 'Fear Inoculum Era',
        years: '2019-Present',
        description: 'Tool\'s triumphant return after 13 years. Danny\'s drumming reached new creative heights.',
        albums: ['Fear Inoculum'],
        gear: {
          drums: 'Sonor SQ2 Heavy Beech (massive configuration)',
          snare: 'Sonor Danny Carey Signature 14x8" Bronze',
          cymbals: 'Paiste Signature Series (15" Sound Edge Hi-Hats, 18" & 19" Power Crashes, 22" Dry Heavy Ride, 20" & 22" Chinas, various Rude crashes)',
          hardware: 'Sonor Giant Step Twin Effect Double Pedal, Sonor Drummer Throne, Mandala Drum electronic pads',
          sticks: 'Vic Firth Danny Carey Signature'
        },
        notes: '"Pneuma" became one of the most viral drum performances ever, showcasing Danny\'s legendary technique.'
      }
    ],
    spotlight: {
      quickFacts: [
        'Inducted into Modern Drummer Hall of Fame in 2016',
        '4-time Grammy winner with Tool',
        'Stands 6\'5" (196 cm) - one of the tallest drummers in rock'
      ],
      iconicMoment: 'The drum cam video of "Pneuma" from Fear Inoculum went viral with millions of views, showcasing Danny\'s polyrhythmic mastery and cementing his status as one of the greatest drummers alive.',
      gearHighlight: 'Danny\'s Sonor SQ2 Heavy Beech kit combined with Mandala electronic pads creates Tool\'s signature sound, blending acoustic power with electronic textures.'
    }
  },
  {
    id: 15,
    name: 'Mario Duplantier',
    band: 'Gojira',
    bands: [
      { name: 'Gojira', period: '1996–present', current: true }
    ],
    genre: 'Progressive Death Metal',
    country: 'France',
    image: '/images/drummers/mario-duplantier.webp',
    bio: 'Mario Duplantier, born in 1981 in Bayonne, France, is the drummer and co-founder of the critically acclaimed progressive death metal band Gojira, which he formed with his brother Joe Duplantier in 1996. Known for his powerful, precise, and incredibly intense drumming style, Mario combines crushing double bass patterns with complex rhythmic structures that complement Gojira\'s unique blend of death metal and progressive elements. His drumming on albums like "From Mars to Sirius," "The Way of All Flesh," and "Magma" has been praised for its technical excellence and raw energy. Beyond his drumming prowess, Mario is also a talented visual artist who has created artwork for Gojira\'s albums and merchandise. His approach to drumming emphasizes dynamics, groove, and an almost tribal quality that has helped define Gojira\'s distinctive sound.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Mario_Duplantier',
      'https://www.instagram.com/mario_duplantier/',
      'https://www.discogs.com/artist/599195-Mario-Duplantier',
      'https://www.allmusic.com/artist/mario-duplantier-mn0001953826'
    ],
    gear: {
      drums: 'Tama Starclassic Bubinga (22"x18" Bass Drums x2, 12"x9" & 13"x10" Toms, 16"x16" Floor Tom)',
      snare: 'Tama S.L.P. 14x6.5" G-Maple',
      cymbals: 'Zildjian (14" K Sweet Hi-Hats, 14" A Custom Hi-Hats, 18" K Custom Hybrid Crash, 19" A Custom Crash, 20" K Sweet Crash, 21" Z Custom Mega Bell Ride, 18" & 20" Chinas)',
      hardware: 'Tama Iron Cobra 900 Power Glide Double Pedal, Tama 1st Chair Ergo-Rider Throne',
      sticks: 'Tama Mario Duplantier Signature',
      heads: 'Remo Emperor (toms), Remo Powerstroke 3 (bass drums)',
      verified: true,
      sources: ['https://www.tama.com/usa/artists/detail/13.html', 'https://zildjian.com/artists/mario-duplantier', 'https://www.drumeo.com/beat/mario-duplantier-gojira/']
    },
    photos: [
      '/images/drummers/mario-duplantier.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/8/83/2017_RiP_-_Gojira_-_Mario_Duplantier_-_by_2eight_-_8SC9168.jpg
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Remo Drumheads', url: 'https://remo.com' }
    ],
    videos: [
      { title: 'Gojira - Silvera (Live Drum Cam)', youtubeId: 'BGHlZwMYO9g', year: 2017 },
      { title: 'Gojira - Stranded (Live Drum Cam)', youtubeId: 'FNdC_3LR2AI', year: 2017 },
      { title: 'Gojira - Flying Whales (Live Drum Cam)', youtubeId: 'iqrMFNMgVS0', year: 2019 }
    ],
    quotes: [
      { text: "The most important thing for me is to serve the song. Everything I play has to enhance the music, not show off.", source: "Modern Drummer Magazine", year: 2017 },
      { text: "I grew up listening to death metal, but also a lot of jazz and world music. You can hear all of those influences in how I approach the drums.", source: "Drumeo Interview", year: 2021 },
      { text: "Playing with your brother is special. We have this telepathic connection that allows Gojira to be what it is.", source: "Revolver Magazine", year: 2016 }
    ],
    gearTimeline: [
      {
        era: 'Godzilla / Early Era',
        years: '1996-2001',
        description: 'The band started as Godzilla in Bayonne, France. Mario developed his raw, powerful style on modest gear.',
        albums: ['Possessed', 'Maciste All\'Inferno', 'Wisdom Comes (demo)'],
        gear: {
          drums: 'Pearl Export Series',
          snare: 'Pearl 14x5.5" Steel',
          cymbals: 'Sabian B8 Series (14" Hi-Hats, 16" & 18" Crashes, 20" Ride)',
          hardware: 'Pearl P-120P Single Pedal (upgraded to double)',
          sticks: 'Vic Firth 5B'
        },
        notes: 'Before the Gojira name change and Tama endorsement, Mario built his chops on affordable gear.'
      },
      {
        era: 'Gojira Formation & Terra Incognita',
        years: '2001-2005',
        description: 'Renamed to Gojira and released their debut album. Mario\'s tribal, groove-heavy style began to define the band\'s sound.',
        albums: ['Terra Incognita', 'The Link'],
        gear: {
          drums: 'Tama Rockstar',
          snare: 'Tama 14x6.5" Maple',
          cymbals: 'Zildjian A Custom (14" Hi-Hats, 17" & 18" Crashes, 21" Ride, 18" China)',
          hardware: 'Tama Iron Cobra Double Pedal',
          sticks: 'Pro-Mark 5B'
        },
        notes: 'Mario transitioned to Tama and began refining his signature sound.'
      },
      {
        era: 'International Breakthrough',
        years: '2005-2012',
        description: 'From Mars to Sirius brought worldwide recognition. Mario\'s drumming became iconic in progressive metal circles.',
        albums: ['From Mars to Sirius', 'The Way of All Flesh', 'L\'Enfant Sauvage'],
        gear: {
          drums: 'Tama Starclassic Maple (22" Bass x2, 10", 12", 13" Toms, 16" Floor)',
          snare: 'Tama S.L.P. 14x6.5" G-Maple',
          cymbals: 'Zildjian K & A Custom Series (14" K Hi-Hats, 18" & 19" A Custom Crashes, 21" A Custom Ride, 18" China)',
          hardware: 'Tama Iron Cobra 900 Double Pedal, Tama 1st Chair Throne',
          sticks: 'Tama 5B Oak'
        },
        notes: 'Flying Whales became his signature song, showcasing his ability to build massive grooves.'
      },
      {
        era: 'Modern Era & Grammy Recognition',
        years: '2016-Present',
        description: 'Magma and Fortitude brought Grammy nominations and mainstream success. Mario\'s setup reached its current peak configuration.',
        albums: ['Magma', 'Fortitude'],
        gear: {
          drums: 'Tama Starclassic Bubinga (22"x18" Bass Drums x2, 12"x9" & 13"x10" Toms, 16"x16" Floor Tom)',
          snare: 'Tama S.L.P. 14x6.5" G-Maple',
          cymbals: 'Zildjian (14" K Sweet Hi-Hats, 14" A Custom Hi-Hats, 18" K Custom Hybrid Crash, 19" A Custom Crash, 20" K Sweet Crash, 21" Z Custom Mega Bell Ride, 18" & 20" Chinas)',
          hardware: 'Tama Iron Cobra 900 Power Glide Double Pedal, Tama 1st Chair Ergo-Rider Throne',
          sticks: 'Tama Mario Duplantier Signature'
        },
        notes: 'Mario received his own Tama signature drumstick model, cementing his status as a drumming legend.'
      }
    ],
    spotlight: {
      quickFacts: [
        'Co-founder of Gojira with brother Joe Duplantier (1996)',
        'Creates visual artwork for Gojira albums and merchandise',
        'Uses two bass drums instead of a double pedal for a more organic feel',
        'Grammy-nominated multiple times with Gojira'
      ],
      iconicMoment: "The explosive breakdown in 'Flying Whales' showcases Mario's ability to build tension through restraint before unleashing devastating power, becoming one of the most celebrated moments in modern metal drumming.",
      gearHighlight: 'The Tama Mario Duplantier Signature Drumsticks feature an elongated taper for increased response and a barrel tip for a full, focused sound—perfect for his dynamic playing style.'
    }
  },
  {
    id: 16,
    name: 'Brann Dailor',
    band: 'Mastodon',
    bands: [
      { name: 'Mastodon', period: '2000–present', current: true },
      { name: 'Arcadea', period: '2017–present', current: true }
    ],
    genre: 'Progressive/Sludge Metal',
    country: 'USA',
    image: '/images/drummers/brann-dailor.webp',
    bio: 'Brann Dailor, born in 1975 in Rochester, New York, is the drummer and vocalist for progressive sludge metal band Mastodon. His drumming style is characterized by complex fills, jazz-influenced patterns, and an almost melodic approach to the drums that sets him apart from traditional metal drummers. Dailor\'s work on albums like "Leviathan," "Blood Mountain," and "Crack the Skye" has earned him widespread acclaim. He began singing lead vocals on Mastodon\'s later albums, adding another dimension to the band\'s sound. His technical proficiency combined with his musical creativity has made him one of the most influential drummers in modern metal.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Brann_Dailor',
      'https://www.instagram.com/branndailor/',
      'https://www.discogs.com/artist/468737-Brann-Dailor',
      'https://www.allmusic.com/artist/brann-dailor-mn0000761098'
    ],
    gear: {
      drums: 'Tama Starclassic Performer B/B',
      snare: 'Tama S.L.P. 14x6.5" G-Maple',
      cymbals: 'Meinl Byzance Series (14" Dark Hi-Hats, 18" & 19" Brilliant Heavy Hammered Crashes, 21" Ghost Ride, 18" Extra Dry China)',
      hardware: 'Tama Speed Cobra Double Pedal, Tama Iron Cobra Lever Glide Hi-Hat Stand, Tama 1st Chair Ergo-Rider Throne',
      sticks: 'Vater 5B'
    },
    photos: [
      '/images/drummers/brann-dailor.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/6/6b/20150612-054-Nova_Rock_2015-Mastodon-Brann_Dailor.jpg
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Meinl Cymbals', url: 'https://meinlcymbals.com' },
      { name: 'Vater Drumsticks', url: 'https://www.vater.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { title: 'Mastodon - Blood and Thunder (Meinl Cymbals)', youtubeId: 'q8B4mSW5e88', year: 2012 },
      { title: 'Mastodon - Steambreather (Drumeo Breakdown)', youtubeId: 'Svz-dGKLeyo', year: 2024 },
      { title: 'Mastodon - Ghost of Karelia (Meinl Cymbals)', youtubeId: 'HBqyOZdabJA', year: 2020 }
    ]
  },
  {
    id: 17,
    name: 'Chris Adler',
    band: 'Lamb of God',
    bands: [
      { name: 'Lamb of God', period: '1994–2019', current: false },
      { name: 'Megadeth', period: '2015–2016', current: false },
      { name: 'Firstborne', period: '2020–present', current: true }
    ],
    genre: 'Groove Metal',
    country: 'USA',
    image: '/images/drummers/chris-adler.webp',
    bio: 'Chris Adler, born in 1972 in Richmond, Virginia, is best known as the co-founder and former drummer of Lamb of God. His precision double bass drumming and innovative groove patterns helped define the New Wave of American Heavy Metal. Adler\'s work on albums like "Ashes of the Wake" and "Sacrament" showcased his ability to combine technical proficiency with raw power. He briefly played with Megadeth on their 2016 album "Dystopia." His drumming style emphasizes groove, power, and precision, influencing a generation of metal drummers.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Chris_Adler',
      'https://www.instagram.com/chrisadlerdrums/',
      'https://www.discogs.com/artist/357890-Chris-Adler',
      'https://www.allmusic.com/artist/chris-adler-mn0000766295'
    ],
    gear: {
      drums: 'Mapex Black Panther Design Lab',
      snare: 'Mapex Chris Adler Signature 14x5.5" Walnut/Maple',
      cymbals: 'Meinl Byzance Series (14" Dark Hi-Hats, 18" & 19" Dark Crashes, 21" Transition Ride, 18" Extra Dry China)',
      hardware: 'Mapex Falcon Double Pedal, Mapex T865 Throne',
      sticks: 'Promark TX5AXW Chris Adler Signature',
      verified: true,
      sources: ['https://mapexdrums.com/us/artists/chris-adler', 'https://chrisadler.com/gear/']
    },
    photos: [
      '/images/drummers/chris-adler.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/d/d8/Lamb_Of_God_-_Rock_am_Ring_2015-9876_%28cropped%29.jpg
    ],
    endorsements: [
      { name: 'Mapex Drums', url: 'https://www.mapexdrums.com' },
      { name: 'Meinl Cymbals', url: 'https://meinlcymbals.com' },
      { name: 'Promark Sticks', url: 'https://www.daddario.com/promark' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { title: 'Lamb of God - Laid to Rest (Live Drum Cam)', youtubeId: 'oqdZpxkzNvc', year: 2018 },
      { title: 'Lamb of God - Redneck (Live Drum Cam)', youtubeId: 'HL9kaJZw8iw', year: 2016 },
      { title: 'Lamb of God - Blood of the Scribe (Modern Drummer)', youtubeId: 'AInJFYy3yvs', year: 2005 }
    ]
  },
  {
    id: 18,
    name: 'Matt Halpern',
    band: 'Periphery',
    bands: [
      { name: 'Periphery', period: '2009–present', current: true }
    ],
    genre: 'Progressive/Djent',
    country: 'USA',
    image: '/images/drummers/matt-halpern.webp',
    bio: 'Matt Halpern, born in 1984, is the drummer for progressive metal band Periphery and one of the most influential figures in the djent movement. His drumming combines polyrhythmic complexity with electronic elements and modern production techniques. Halpern\'s ability to navigate complex time signatures while maintaining groove has made him a role model for a new generation of progressive metal drummers. He is also an accomplished drum educator, sharing his knowledge through clinics and online platforms.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Matt_Halpern',
      'https://www.instagram.com/matthalpernofficial/',
      'https://www.discogs.com/artist/2020577-Matt-Halpern',
      'https://www.allmusic.com/artist/matt-halpern-mn0002620896'
    ],
    gear: {
      drums: 'Pearl Reference Series',
      snare: 'Pearl Reference 14x6.5" Brass',
      cymbals: 'Meinl Byzance Series (15" Dark Hi-Hats, 18" & 20" Extra Dry Medium Crashes, 22" Transition Ride, 18" Extra Dry China)',
      hardware: 'Pearl Demon Drive Double Pedal, Pearl D-2000 Throne',
      sticks: 'Promark Matt Halpern Signature'
    },
    photos: [
      '/images/drummers/matt-halpern.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/2/26/20151122_Eindhoven_Epic_Metal_Fest_Periphery_0116.jpg
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Meinl Cymbals', url: 'https://meinlcymbals.com' },
      { name: 'ProMark Sticks', url: 'https://www.daddario.com/promark' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { title: 'Periphery - The Bad Thing (Drum Playthrough)', youtubeId: '8dfZo-zmNaU', year: 2019 },
      { title: 'Periphery - Marigold (Drum Playthrough)', youtubeId: 'DAOcYC2uEJk', year: 2023 },
      { title: 'Periphery - Dracul Gras (Drum Playthrough)', youtubeId: 'FUk72MwuWrs', year: 2024 }
    ]
  },
  {
    id: 19,
    name: 'Inferno',
    band: 'Behemoth',
    bands: [
      { name: 'Behemoth', period: '1997–present', current: true },
      { name: 'Azarath', period: '1998–present', current: true }
    ],
    genre: 'Black/Death Metal',
    country: 'Poland',
    image: '/images/drummers/inferno.webp',
    bio: 'Zbigniew Robert Promiński, known as Inferno, born in 1979, is the drummer for Polish extreme metal band Behemoth. He joined the band in 1997 and has been instrumental in shaping their signature sound. His drumming is characterized by relentless blast beats, precise double bass work, and the ability to maintain extreme speeds for extended periods. Inferno\'s technical abilities and stamina have made him one of the most respected drummers in extreme metal. His work on albums like "The Satanist" and "I Loved You at Your Darkest" showcases his evolution as a drummer.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Inferno_(musician)',
      'https://www.instagram.com/infaboruta/',
      'https://www.discogs.com/artist/355826-Inferno-4',
      'https://www.allmusic.com/artist/inferno-mn0000386476'
    ],
    gear: {
      drums: 'Pearl Masterworks',
      snare: 'Pearl Reference 14x5" Steel',
      cymbals: 'Paiste RUDE Series (14" Hi-Hats, 14" Blast China, 18" & 19" Crashes, 24" Mega Power Ride, 18" China)',
      hardware: 'Czarcie Kopyto (Devil\'s Hoof) Double Pedal, Pearl D-2000 Throne',
      sticks: 'Vic Firth 5B',
      verified: true,
      sources: ['https://pearldrum.com/en/artist/inferno/13201', 'https://www.paiste.com/en/musicians/inferno']
    },
    photos: [
      '/images/drummers/inferno.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/8/8d/Behemoth_Rockharz_2015_02.jpg
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Paiste Cymbals', url: 'https://www.paiste.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { title: 'Behemoth - Blow Your Trumpets Gabriel (Live Drum Cam)', youtubeId: 'Czx-OIyrQwQ', year: 2018 },
      { title: 'Behemoth - Ora Pro Nobis Lucifer (Brutal Assault 2018)', youtubeId: 'JYQCNgwdMRs', year: 2018 },
      { title: 'Behemoth - Slaves Shall Serve (Drum Cam)', youtubeId: 'FM5tn8Yy10o', year: 2019 }
    ]
  },
  {
    id: 20,
    name: 'Hellhammer',
    band: 'Mayhem',
    bands: [
      { name: 'Mayhem', period: '1988–present', current: true },
      { name: 'Arcturus', period: '1991–present', current: true },
      { name: 'Dimmu Borgir', period: '2005–2010', current: false }
    ],
    genre: 'Black Metal',
    country: 'Norway',
    image: '/images/drummers/hellhammer.webp',
    bio: 'Jan Axel Blomberg, known as Hellhammer, born in 1969, is a Norwegian drummer best known for his work with black metal pioneers Mayhem. He joined Mayhem in 1988 and has been a constant presence through the band\'s turbulent history. Hellhammer is credited with helping define the black metal drumming style, characterized by fast blast beats and raw, aggressive playing. Beyond Mayhem, he has played with numerous projects including Arcturus, Dimmu Borgir, and Shining. His influence on extreme metal drumming is immeasurable.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Hellhammer_(musician)',
      'https://www.discogs.com/artist/288798-Hellhammer-2',
      'https://www.allmusic.com/artist/hellhammer-mn0001545752'
    ],
    gear: {
      drums: 'Sonor SQ2 Heavy Beech',
      snare: 'Sonor SQ2 14x5.5" Maple',
      cymbals: 'Paiste (14" RUDE Hi-Hats, 18" & 19" RUDE Crashes, 20" RUDE Ride, 18" RUDE China)',
      hardware: 'Axis Double Pedal, Sonor Drummer Throne, Roland Electronics',
      sticks: 'Vic Firth American Classic 5B',
      verified: true,
      sources: ['https://www.hellhammerdrummer.com/gear-and-setup/', 'https://www.paiste.com/en/musicians']
    },
    photos: [
      '/images/drummers/hellhammer.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/5/58/Mayhem_-_Jalometalli_2008_-_Hellhammer_01_crop.JPG
    ],
    endorsements: [
      { name: 'Sonor Drums', url: 'https://www.sonor.com' },
      { name: 'Paiste Cymbals', url: 'https://www.paiste.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Remo Drumheads', url: 'https://www.remo.com' }
    ],
    videos: [
      { title: 'Mayhem - Hellhammer Drumcam 2015', youtubeId: '60sr-ttok58', year: 2015 },
      { title: 'Mayhem - Chainsaw Gutsfuck (Drum Cam)', youtubeId: 'r9PJgQn4SWs', year: 2019 },
      { title: 'Hellhammer Sound Check 2024', youtubeId: 'm0-G6QOwEug', year: 2024 }
    ]
  },
  {
    id: 21,
    name: 'Pete Sandoval',
    band: 'Morbid Angel',
    bands: [
      { name: 'Morbid Angel', period: '1988–2013', current: false },
      { name: 'Terrorizer', period: '1986–1989, 2005–present', current: true }
    ],
    genre: 'Death Metal',
    country: 'USA',
    image: '/images/drummers/pete-sandoval.webp',
    bio: 'Pedro "Pete" Sandoval, born in 1960 in El Salvador, is a legendary death metal drummer best known for his work with Morbid Angel and Terrorizer. He is credited with pioneering and perfecting the gravity blast technique, which revolutionized extreme metal drumming. His work on classic Morbid Angel albums like "Altars of Madness," "Blessed Are the Sick," and "Covenant" set the standard for death metal drumming. Sandoval\'s combination of speed, precision, and endurance influenced countless drummers in the extreme metal genre.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Pete_Sandoval',
      'https://www.discogs.com/artist/279619-Pete-Sandoval',
      'https://www.allmusic.com/artist/pete-sandoval-mn0000310251'
    ],
    gear: {
      drums: 'ddrum Dios Series',
      snare: 'ddrum Dios 14x6.5" Maple',
      cymbals: 'Sabian AAX Series (14" Stage Hi-Hats, 18" & 19" X-Plosion Crashes, 20" Stage Ride, 18" Chinese)',
      hardware: 'ddrum Mercury Double Pedal, ddrum Throne',
      sticks: 'Ahead Lars Ulrich Signature'
    },
    photos: [
      '/images/drummers/pete-sandoval.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/1/1b/Pete_Sandoval.jpg
    ],
    endorsements: [
      { name: 'ddrum Drums', url: 'https://www.ddrum.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'Ahead Drumsticks', url: 'https://www.aheaddrumsticks.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { title: 'Morbid Angel - Fall from Grace (Drum Cam)', youtubeId: 'HYsMxbzqkZY', year: 2023 },
      { title: 'Terrorizer - Human Prey (Brutal Assault 2024)', youtubeId: 'JEXGerT8hUs', year: 2024 },
      { title: 'Morbid Angel - World of Shit (Drum Cam)', youtubeId: 'JWFrrVetdoc', year: 2019 }
    ]
  },
  {
    id: 22,
    name: 'Art Cruz',
    band: 'Lamb of God',
    bands: [
      { name: 'Lamb of God', period: '2019–present', current: true },
      { name: 'Prong', period: '2012–2019', current: false },
      { name: 'Winds of Plague', period: '2010–2012', current: false }
    ],
    genre: 'Groove Metal / Thrash Metal',
    country: 'USA',
    image: '/images/drummers/art-cruz.webp',
    bio: 'Art Cruz, born May 27, 1988, in Downey, California, is the current drummer of Lamb of God. He joined the band in 2019, replacing Chris Adler, after first filling in on their North American tour supporting Slayer\'s farewell tour in 2018. Cruz rose to prominence as one of the genre\'s top touring drummers, previously playing with Winds of Plague and Prong. His first studio album with Lamb of God was their 2020 self-titled release, followed by "Omens" in 2022. Known for his aggressive style, explosive dynamics, and precise double bass work, Cruz has reenergized Lamb of God\'s overall sound while honoring the band\'s legacy.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Art_Cruz',
      'https://www.instagram.com/artcruzdrums/',
      'https://zildjian.com/blogs/artist/art-cruz',
      'https://www.discogs.com/artist/1665218-Art-Cruz'
    ],
    gear: {
      drums: 'Ludwig Drums',
      snare: 'Ludwig 14x6.5" Black Beauty',
      cymbals: 'Zildjian (14" A Custom Mastersound Hi-Hats, 18" A Custom EFX, 18" A Custom Medium Crash, 19" A Custom Projection Crash, 20" A Custom Crash, 21" A Zildjian Mega Bell Ride, 19" A Ultra Hammered Chinas, 17" K China w/ EFX Holes, 9" FX Trash Splashes, FX Blast Bell)',
      hardware: 'Trick Pro 1-V Double Pedal, Gibraltar Hardware, Ludwig Atlas Throne',
      sticks: 'Vic Firth American Classic 5B',
      heads: 'Evans',
      verified: true,
      verifiedAt: '2026-02-02',
      sources: ['https://en.wikipedia.org/wiki/Art_Cruz', 'https://zildjian.com/blogs/artist/art-cruz']
    },
    photos: [
      '/images/drummers/art-cruz.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/a/a0/Lamb_of_God_Full_Force_2019_01.jpg
    ],
    endorsements: [
      { name: 'Ludwig Drums', url: 'https://www.ludwig-drums.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' },
      { name: 'Trick Pedals', url: 'https://www.trickdrums.com' },
      { name: 'Gibraltar Hardware', url: 'https://www.gibraltarhardware.com' }
    ],
    videos: [
      { title: 'Art Cruz - Lamb of God - Laid to Rest (Drum Cam)', youtubeId: 'OHu6kVs3flY', year: 2022 },
      { title: 'Lamb of God - Nevermore (Art Cruz Drum Cam)', youtubeId: 'nIfi05bMed0', year: 2022 },
      { title: 'Lamb of God - Memento Mori (Art Cruz Drum Playthrough)', youtubeId: 'xHBuQUt7rJQ', year: 2020 }
    ]
  },
  {
    id: 23,
    name: 'Arin Ilejay',
    band: 'ex-Avenged Sevenfold',
    bands: [
      { name: 'Avenged Sevenfold', period: '2011–2015', current: false }
    ],
    genre: 'Heavy Metal / Hard Rock',
    country: 'USA',
    image: '/images/drummers/arin-ilejay.webp',
    bio: 'Arin Ilejay, born October 17, 1988, is an American drummer best known for his tenure with Avenged Sevenfold from 2011 to 2015. He joined A7X following the tragic death of founding drummer Jimmy "The Rev" Sullivan. Ilejay recorded one studio album with the band - "Hail to the King" (2013), which debuted at number 1 on the Billboard 200 and multiple international charts. His powerful, straightforward drumming style complemented the album\'s classic heavy metal approach. Before A7X, he played with Confide, and after his departure, he has been active with various projects including his solo work and session drumming.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Arin_Ilejay',
      'https://www.instagram.com/arinilejay/',
      'https://www.discogs.com/artist/2399949-Arin-Ilejay',
      'https://www.allmusic.com/artist/arin-ilejay-mn0002963117'
    ],
    gear: {
      drums: 'Mapex Saturn Series',
      snare: 'Mapex Black Panther 14x6.5"',
      cymbals: 'Zildjian (14" A Custom Mastersound Hi-Hats, 18" & 19" A Custom Crashes, 21" A Sweet Ride, 18" A Custom China)',
      hardware: 'Mapex Falcon Double Pedal, Mapex T865 Throne',
      sticks: 'Vic Firth American Classic 5A',
      heads: 'Evans',
      verified: false,
      notes: 'Gear from A7X era (2011-2015)'
    },
    photos: [
      '/images/drummers/arin-ilejay.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/b/b9/Arin.1280.jpg
    ],
    endorsements: [
      { name: 'Mapex Drums', url: 'https://www.mapexdrums.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { title: 'Arin Ilejay Drum Solo + Band Jam @ Avenged Sevenfold Barcelona', youtubeId: 'ao-U54ohWa8', year: 2013 },
      { title: 'Sound Legacy - Arin Ilejay (Zildjian)', youtubeId: 'owgFKcWXp4s', year: 2014 },
      { title: 'Avenged Sevenfold - Afterlife (Drum Cam) Arin Ilejay', youtubeId: 'vyQXze7WPrk', year: 2014 }
    ]
  },
  {
    id: 24,
    name: 'Navene Koperweis',
    band: 'Entheos / ex-Animals as Leaders',
    bands: [
      { name: 'Entheos', period: '2015–present', current: true },
      { name: 'Animals as Leaders', period: '2012–2014', current: false }
    ],
    genre: 'Progressive Metal / Djent / Technical Death Metal',
    country: 'USA',
    image: '/images/drummers/navene-koperweis.webp',
    bio: 'Navene Koperweis, born May 31, 1985, in San Jose, California, is a drummer, producer, and multi-instrumentalist known for his work with Entheos, Animals as Leaders, Animosity, and The Faceless. He started drumming at age eleven and has become one of the most innovative drummers in the progressive metal scene. Beyond his drumming prowess, Navene is a skilled producer and runs the technical death metal project Fleshwrought. He has also served as session drummer for Job for a Cowboy, Machine Head, and Whitechapel. His playing combines extreme technical proficiency with electronic and djent influences.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Navene_Koperweis',
      'https://www.instagram.com/navenekoperweis/',
      'https://www.discogs.com/artist/1100428-Navene-Koperweis',
      'https://navenek.com'
    ],
    gear: {
      drums: 'DW Drums Performance Series',
      snare: 'DW Performance 14x6.5" Steel',
      cymbals: 'Meinl Byzance Series (15" Dual Hi-Hats, 18" & 19" Extra Dry Medium Crashes, 21" Transition Ride, 18" Extra Dry China, 10" Splash)',
      hardware: 'DW 9000 Series Double Pedal, DW Throne',
      sticks: 'Vic Firth American Classic 5B',
      heads: 'Evans',
      verified: true,
      sources: ['https://meinlcymbals.com/artists', 'https://en.wikipedia.org/wiki/Navene_Koperweis']
    },
    photos: [
      '/images/drummers/navene-koperweis.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/4/43/Navene_Koperweis.jpg
    ],
    endorsements: [
      { name: 'DW Drums', url: 'https://www.dwdrums.com' },
      { name: 'Meinl Cymbals', url: 'https://meinlcymbals.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { title: 'Navene Koperweis - ENTHEOS - All For Nothing (Live Drum Performance)', youtubeId: 'lMDDiKkjhwo', year: 2024 },
      { title: 'Navene Koperweis - ENTHEOS - The Sinking Sun (Drum Playthrough)', youtubeId: 'J8SNuR8Tb4g', year: 2023 },
      { title: 'Entheos - Life In Slow Motion | Navene Koperweis Drum Playthrough', youtubeId: 'SSNOG4oRcsc', year: 2024 }
    ]
  },
  {
    id: 25,
    name: 'Alex Bent',
    band: 'ex-Trivium / Arkaik / Dragonlord',
    bands: [
      { name: 'Trivium', period: '2016–2024', current: false },
      { name: 'Arkaik', period: '2008–2017', current: false }
    ],
    genre: 'Heavy Metal / Thrash Metal / Technical Death Metal',
    country: 'USA',
    image: '/images/drummers/alex-bent.webp',
    bio: 'Alex Bent, born January 31, 1993, in Oakland, California, is a versatile drummer known for his technical proficiency across multiple metal subgenres. He joined Trivium in 2017, replacing Paul Wandtke, and recorded three critically acclaimed albums with the band: "The Sin and the Sentence" (2017), "What the Dead Men Say" (2020), and "In the Court of the Dragon" (2021). Before Trivium, he played with technical death metal bands Arkaik and Brain Drill, and filled in for Gene Hoglan on Testament tours. He also drums for Eric Peterson\'s Dragonlord. Self-taught from age 11, Bent competed in Guitar Center Drum Off competitions and brings a unique blend of death metal technicality and thrash metal power to his playing.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Alex_Bent',
      'https://www.instagram.com/alexbentdrums/',
      'https://www.discogs.com/artist/2896783-Alex-Bent',
      'https://www.allmusic.com/artist/alex-bent-mn0003242684'
    ],
    gear: {
      drums: 'Pearl Reference Pure Series',
      snare: 'Pearl Reference 14x5" Brass',
      cymbals: 'Zildjian (14" K Custom Hybrid Hi-Hats, 18" & 19" K Custom Hybrid Crashes, 21" K Custom Hybrid Ride, 18" A Custom China)',
      hardware: 'Axis A Longboard Double Pedal, Pearl D-3000 Throne',
      sticks: 'Vic Firth American Classic 5B',
      heads: 'Remo',
      verified: true,
      verifiedAt: '2026-02-02',
      sources: ['https://en.wikipedia.org/wiki/Alex_Bent', 'https://www.axispercussion.com/artists-a-f/']
    },
    photos: [
      '/images/drummers/alex-bent.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/5/59/Trivium_%2836826824775%29_%28cropped%29.jpg
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Remo Drumheads', url: 'https://remo.com' },
      { name: 'Axis Percussion', url: 'https://www.axispercussion.com' }
    ],
    videos: [
      { title: 'Trivium - Beyond Oblivion (Alex Bent Drum Playthrough)', youtubeId: 'nUYwI9V0wMw', year: 2017 },
      { title: 'Trivium - Betrayer (Alex Bent Drum Playthrough)', youtubeId: 'k7ftjTk2j5A', year: 2017 },
      { title: 'Trivium - The Sin and the Sentence (Drum Cut)', youtubeId: 'poo9hYpXOtI', year: 2017 }
    ]
  },
  {
    id: 26,
    name: 'Shannon Larkin',
    band: 'Godsmack / Ugly Kid Joe / Amen',
    bands: [
      { name: 'Godsmack', period: '2002–present', current: true },
      { name: 'Ugly Kid Joe', period: '1991–1997', current: false },
      { name: 'Amen', period: '1999–2002', current: false }
    ],
    genre: 'Hard Rock / Heavy Metal / Nu Metal',
    country: 'USA',
    image: '/images/drummers/shannon-larkin.webp',
    bio: 'Shannon Larkin (born April 24, 1967) is an American drummer best known as the former drummer of Godsmack, a position he held from 2002 to 2024, making him the band\'s longest-serving drummer. His powerful, groove-oriented style was essential to Godsmack\'s signature heavy sound. Before Godsmack, Larkin played with Wrathchild America, Souls at Zero, Ugly Kid Joe, and Amen. He has been playing drums since age ten and briefly filled in for Black Sabbath on one show in 1997 when Mike Bordin was unavailable. Known for his hard-hitting style and versatility, Larkin has been a Sabian cymbal artist for decades.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Shannon_Larkin',
      'https://www.instagram.com/shannonlarkin_13/',
      'https://www.discogs.com/artist/359666-Shannon-Larkin',
      'https://www.allmusic.com/artist/shannon-larkin-mn0000029700'
    ],
    gear: {
      drums: 'ddrum Dios Series',
      snare: 'ddrum Dios 14x6.5" Maple',
      cymbals: 'Sabian AAX & HHX Series (14" AAX Stage Hi-Hats, 18" & 19" AAX X-Plosion Crashes, 21" HHX Raw Bell Dry Ride, 10" AAX Splash, 18" AAX Chinese)',
      hardware: 'DW 9000 Series Double Pedal, ddrum Throne',
      sticks: 'Vic Firth American Classic 5B',
      heads: 'Evans',
      verified: true,
      verifiedAt: '2026-02-02',
      sources: ['https://sabian.com/artist/shannon-larkin/', 'https://en.wikipedia.org/wiki/Shannon_Larkin']
    },
    photos: [
      '/images/drummers/shannon-larkin.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/6/6e/Godsmack_-_2019160161909_2019-06-09_Rock_am_Ring_-_0432_-_B70I1399.jpg
    ],
    endorsements: [
      { name: 'ddrum Drums', url: 'https://www.ddrum.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' },
      { name: 'DW Hardware', url: 'https://www.dwdrums.com' }
    ],
    videos: [
      { title: 'When Legends Rise - Remo Performance', youtubeId: 'NbTnlLWxKew', year: 2018 },
      { title: 'When Legends Rise - Drum Cam', youtubeId: 'hDYKTXK4ie8', year: 2019 },
      { title: 'Drum Battle - Sully vs Shannon', youtubeId: 'iJ8-r_hd5PY', year: 2010 }
    ]
  },
  {
    id: 27,
    name: 'Raymond Herrera',
    band: 'Fear Factory / Arkaea / Brujeria',
    bands: [
      { name: 'Fear Factory', period: '1990–2009', current: false },
      { name: 'Arkaea', period: '2007–2011', current: false },
      { name: 'Brujeria', period: '1993–present', current: true }
    ],
    genre: 'Industrial Metal / Death Metal',
    country: 'USA',
    image: '/images/drummers/raymond-herrera.webp',
    bio: 'Raymond Herrera is an American drummer best known as the founding member and former drummer of industrial metal band Fear Factory. His innovative "stop-go" double bass technique, rather than the traditional sustained blast approach, became a signature element of Fear Factory\'s mechanical, precise sound. He played on iconic albums like Soul of a New Machine (1992), Demanufacture (1995), and Obsolete (1998). Beyond drumming, Herrera has composed music for numerous video games including Tom Clancy\'s Ghost Recon Advanced Warfighter and Scarface: The World Is Yours. He also drummed for Brujeria and later formed Arkaea.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Raymond_Herrera',
      'https://www.discogs.com/artist/269892-Raymond-Herrera',
      'https://www.allmusic.com/artist/raymond-herrera-mn0000826621'
    ],
    gear: {
      drums: 'Tama Starclassic',
      snare: 'Tama 14x6.5" Brass',
      cymbals: 'Zildjian A Custom & Z Custom Series (14" A Custom Hi-Hats, 18" & 19" A Custom Crashes, 21" Z Custom Mega Bell Ride, 18" A Custom China)',
      hardware: 'DW 5000 Series Double Pedal, Tama Power Tower Custom Rack, Tama Wide Rider Throne',
      sticks: 'Pro-Mark 5A Oak Nylon Tip',
      heads: 'Attack Drumheads',
      verified: true,
      verifiedAt: '2026-02-02',
      sources: ['https://en.wikipedia.org/wiki/Raymond_Herrera', 'https://www.musicradar.com/tuition/drums/how-to-sound-like-fear-factorys-raymond-herrera-210027']
    },
    photos: [
      '/images/drummers/raymond-herrera.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/7/71/Fear_factory_010505_117.jpg
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Pro-Mark Sticks', url: 'https://www.daddario.com/promark' },
      { name: 'Attack Drumheads', url: 'https://www.universalpercussion.com' }
    ],
    videos: [
      { title: 'Zero Signal - Drum Performance', youtubeId: '3OwfqJNoRNU', year: 2018 },
      { title: 'Transgression - Foot Cam', youtubeId: 'AyXejgiu78M', year: 2006 },
      { title: 'G4 TV Drum Off', youtubeId: 'EPlTV5XoG48', year: 2007 }
    ]
  },
  {
    id: 28,
    name: 'Morgan Ågren',
    band: 'Mats/Morgan Band / Kaipa / Fredrik Thordendal\'s Special Defects',
    genre: 'Progressive Rock / Progressive Metal / Jazz Fusion',
    country: 'Sweden',
    image: '/images/drummers/morgan-agren.webp',
    bio: 'Morgan Ågren (born July 13, 1967) is a Swedish drummer renowned for his extraordinary technical ability and complex polyrhythmic playing. He began drumming as a child and formed the Mats/Morgan Band with keyboardist Mats Öberg in 1981, performing Frank Zappa\'s music. Ågren has collaborated with Dweezil and Ahmet Zappa, recorded the legendary Sol Niger Within album with Meshuggah\'s Fredrik Thordendal, and has been a member of progressive rock band Kaipa since 2002. He\'s also worked with Devin Townsend on Casualties of Cool and Empath. A documentary about him, "Morgan Ågren\'s Conundrum: A Percussive Misadventure," was released in 2013.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Morgan_%C3%85gren',
      'https://www.discogs.com/artist/288583-Morgan-%C3%85gren',
      'https://www.allmusic.com/artist/morgan-gren-mn0000392167'
    ],
    gear: {
      drums: 'Sonor SQ2 Designer Series',
      snare: 'Sonor Designer 14x5.5" Maple',
      cymbals: 'Paiste Signature & 2002 Series (14" Signature Heavy Hi-Hats, 18" & 20" Signature Fast Crashes, 22" Signature Dry Heavy Ride, 18" 2002 China)',
      hardware: 'Sonor Giant Step Double Pedal, Sonor Throne',
      sticks: 'Vic Firth American Classic 5A',
      heads: 'Remo',
      verified: true,
      verifiedAt: '2026-02-02',
      sources: ['https://en.wikipedia.org/wiki/Morgan_%C3%85gren']
    },
    photos: [
      '/images/drummers/morgan-agren.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/1/12/Morgan_Agren_04.jpg
    ],
    endorsements: [
      { name: 'Sonor Drums', url: 'https://www.sonor.com' },
      { name: 'Paiste Cymbals', url: 'https://www.paiste.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Remo Drumheads', url: 'https://remo.com' }
    ],
    videos: [
      { title: 'Morgan Ågren - Performance', youtubeId: 'LjinwnyZgnE', year: 2019 },
      { title: 'Drum Improv Session', youtubeId: 'RJKGE9-WaNU', year: 2011 },
      { title: 'Weird Drum Ideas - Interview', youtubeId: 'Ui8LaFmXOKQ', year: 2020 }
    ]
  },
  {
    id: 29,
    name: 'Igor Cavalera',
    band: 'Sepultura / Cavalera Conspiracy / Soulwax',
    bands: [
      { name: 'Sepultura', period: '1984–2006', current: false },
      { name: 'Cavalera Conspiracy', period: '2007–present', current: true },
      { name: 'Soulfly', period: '2012', current: false }
    ],
    bands: [
      { name: 'Mats/Morgan Band', period: '1985–present', current: true },
      { name: 'Kaipa', period: '1999–present', current: true }
    ],
    genre: 'Thrash Metal / Groove Metal / Death Metal',
    country: 'Brazil',
    image: '/images/drummers/igor-cavalera.webp',
    bio: 'Igor Cavalera (born September 4, 1970), also known as Iggor Cavalera, is a Brazilian drummer who co-founded the legendary metal band Sepultura with his brother Max in 1984. His drumming evolved from pure thrash metal speed to incorporating tribal and world music influences, particularly on groundbreaking albums like Chaos A.D. (1993) and Roots (1996). Known as a hard-hitting drummer with impeccable timing, he left Sepultura in 2006 and reunited with Max in Cavalera Conspiracy. He has since expanded into electronic music with DJ duo Mixhell and became one of three drummers in Soulwax. His influences include Dave Lombardo, Bill Ward, and Stewart Copeland.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Igor_Cavalera',
      'https://www.instagram.com/igloocavalera/',
      'https://www.discogs.com/artist/354163-Igor-Cavalera',
      'https://www.allmusic.com/artist/igor-cavalera-mn0000766583'
    ],
    gear: {
      drums: 'Tama Starclassic Maple',
      snare: 'Tama S.L.P. 14x6.5" G-Maple',
      cymbals: 'Paiste RUDE & 2002 Series (14" RUDE Hi-Hats, 18" & 19" RUDE Crashes, 22" RUDE Power Ride, 18" 2002 China)',
      hardware: 'Tama Iron Cobra Double Pedal, Tama Throne',
      sticks: 'Vic Firth American Classic 5B',
      heads: 'Evans',
      verified: true,
      verifiedAt: '2026-02-02',
      sources: ['https://en.wikipedia.org/wiki/Igor_Cavalera']
    },
    photos: [
      '/images/drummers/igor-cavalera.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/b/b6/20170805_Wacken_Wacken_Open_Air_Max_%26_Iggor_Cavalera_Return_To_Roots_0093.jpg
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Paiste Cymbals', url: 'https://www.paiste.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { title: 'Subtraction Drum Fill - Sepultura', youtubeId: 'L3GJkpAm5mY', year: 2023 },
      { title: 'Territory - Live USA (2025)', youtubeId: 'h7XrH-KljLg', year: 2025 },
      { title: 'Roots of Rhythm - Live', youtubeId: 'hTxa4Yr1YHs', year: 2024 }
    ]
  },
  {
    id: 30,
    name: 'Bill Ward',
    band: 'Black Sabbath',
    bands: [
      { name: 'Black Sabbath', period: '1968–1983, 1997–2006', current: false }
    ],
    genre: 'Heavy Metal / Hard Rock / Blues Rock',
    country: 'UK',
    image: '/images/drummers/bill-ward.webp',
    bio: 'Bill Ward (born May 5, 1948) is an English drummer and co-founder of Black Sabbath, one of the most influential bands in heavy metal history. Alongside Ozzy Osbourne, Tony Iommi, and Geezer Butler, Ward helped create the template for heavy metal drumming. His jazz-influenced style, combining swing with power, set him apart from other rock drummers of the era. He played on all eight classic Ozzy-era Sabbath albums, including groundbreaking records like Paranoid (1970) and Master of Reality (1971). Ward\'s influences include jazz greats Gene Krupa, Buddy Rich, and John Bonham. He also sang lead on the ballad "It\'s Alright" from Technical Ecstasy.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Bill_Ward_(musician)',
      'https://www.discogs.com/artist/255466-Bill-Ward',
      'https://www.allmusic.com/artist/bill-ward-mn0000136139'
    ],
    gear: {
      drums: 'Ludwig Classic Maple',
      snare: 'Ludwig Supraphonic 14x6.5" LM402',
      cymbals: 'Paiste 2002 & Giant Beat Series (15" Giant Beat Hi-Hats, 18" & 20" 2002 Crashes, 24" 2002 Ride, 18" 2002 China)',
      hardware: 'Ludwig Atlas Pro Double Pedal, Ludwig Throne',
      sticks: 'Vic Firth American Classic 2B',
      heads: 'Remo',
      verified: true,
      verifiedAt: '2026-02-02',
      sources: ['https://en.wikipedia.org/wiki/Bill_Ward_(musician)']
    },
    photos: [
      '/images/drummers/bill-ward.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/7/7d/Black_Sabbath_%281970%29_%28cropped%29.jpg
    ],
    endorsements: [
      { name: 'Ludwig Drums', url: 'https://www.ludwig-drums.com' },
      { name: 'Paiste Cymbals', url: 'https://www.paiste.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Remo Drumheads', url: 'https://remo.com' }
    ],
    videos: [
      { title: '10 Times Bill Ward Was the Best Drummer on Earth', youtubeId: 'C30xAmoiDDQ', year: 2021 },
      { title: 'The Genius of Bill Ward', youtubeId: 'kkL05mggaCM', year: 2020 }
    ]
  },
  {
    id: 31,
    name: 'Nick Augusto',
    band: 'ex-Trivium',
    bands: [
      { name: 'Trivium', period: '2010–2014', current: false }
    ],
    genre: 'Metalcore / Thrash Metal',
    country: 'USA',
    image: '/images/drummers/nick-augusto.webp',
    bio: 'Nick Augusto (born August 4, 1986) is an American drummer best known for his tenure with Trivium from 2009 to 2014. Before joining Trivium, he was the drummer for the grindcore band Maruta and played in Metal Militia alongside future Trivium bassist Paolo Gregoletto. Augusto initially joined Trivium as their drum technician before stepping in as a fill-in drummer after Travis Smith went on hiatus. His powerful, speedy drumming style contributed to two studio albums: "In Waves" (2011) and "Vengeance Falls" (2013). Known for his aggressive playing and technical proficiency, Augusto brought a fresh energy to Trivium\'s live performances. After parting ways with Trivium, he formed the band Corrosion and has continued touring with bands like Light the Torch.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Nick_Augusto',
      'https://www.instagram.com/nickaugusto/',
      'https://www.discogs.com/artist/1544927-Nick-Augusto'
    ],
    gear: {
      drums: 'Pearl Reference Pure',
      snare: 'Pearl Reference 14x6.5" Brass',
      cymbals: 'Sabian AAX Series (14" Stage Hi-Hats, 18" & 19" X-Plosion Crashes, 21" Stage Ride, 18" AAXtreme China)',
      hardware: 'Pearl Demon Drive Double Pedal, Pearl D-2000 Throne',
      sticks: 'Vic Firth American Classic 5B',
      heads: 'Evans',
      verified: false,
      notes: 'Gear from Trivium era (2009-2014)'
    },
    photos: [
      '/images/drummers/nick-augusto.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/1/10/Trivium_2012.JPG
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { title: 'Path to the Big Stage (Full Episode)', youtubeId: 'FYbosW99Qyc', year: 2016 },
      { title: 'Brave This Storm - Live Drum Cam', youtubeId: 'ZVlfI2Rkous', year: 2013 },
      { title: 'In Waves - Live Drum Cam', youtubeId: 'dF2o2SJ6Dv4', year: 2012 }
    ]
  },
  {
    id: 40,
    name: 'Chris Turner',
    band: 'Oceans Ate Alaska',
    bands: [
      { name: 'Oceans Ate Alaska', period: '2010–present', current: true }
    ],
    genre: 'Progressive Metalcore',
    country: 'UK',
    image: '/images/drummers/chris-turner.webp',
    bio: 'Chris Turner is a British drummer and founding member of the progressive metalcore band Oceans Ate Alaska, formed in 2010 in Birmingham. Known for his exceptionally technical and polyrhythmic drumming style, Turner has been praised for pushing the boundaries of modern metalcore drumming. His playing incorporates complex time signatures, intricate blast beats, and fusion-influenced patterns that have earned him recognition as one of the most innovative drummers in contemporary metal. Oceans Ate Alaska\'s unique blend of metalcore with Japanese musical influences, particularly on their album "Hikari" (2017), showcases Turner\'s versatility and creativity. He has cited drummers like Matt Halpern and Matt Garstka as influences.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Oceans_Ate_Alaska',
      'https://www.instagram.com/christurnerdrums/',
      'https://www.youtube.com/@ChrisTurnerDrums'
    ],
    gear: {
      drums: 'Tama Starclassic Maple/Birch',
      snare: 'Tama S.L.P. 14x5.5" G-Maple',
      cymbals: 'Meinl Byzance Series (15" Dual Hi-Hats, 18" & 20" Extra Dry Medium Crashes, 22" Dual Ride, 18" Extra Dry China)',
      hardware: 'Tama Speed Cobra 910 Double Pedal, Tama 1st Chair Throne',
      sticks: 'Vic Firth American Classic 5A',
      heads: 'Evans',
      verified: true,
      verifiedAt: '2026-02-03',
      sources: ['https://meinlcymbals.com/en/artists', 'https://www.youtube.com/@ChrisTurnerDrums']
    },
    photos: [
      '/images/drummers/chris-turner.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/d/dc/Oceans_Ate_Alaska_With_Full_Force_2018_10.jpg
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Meinl Cymbals', url: 'https://meinlcymbals.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { title: 'Hansha - Drum Playthrough', youtubeId: 'CwDimmMy69c', year: 2022 },
      { title: 'Endless Hollow - Drum Playthrough', youtubeId: 'cxddRNN-IIc', year: 2023 },
      { title: 'Escapist - Drum Playthrough', youtubeId: 'qujpwf9-ODg', year: 2021 }
    ]
  },
  {
    id: 32,
    name: 'Matt Greiner',
    band: 'August Burns Red',
    bands: [
      { name: 'August Burns Red', period: '2006–present', current: true }
    ],
    genre: 'Metalcore / Christian Metal',
    country: 'USA',
    image: '/images/drummers/matt-greiner.webp',
    bio: 'Matthew Wilson Greiner (born October 28, 1985) is an American drummer and founding member of the metalcore band August Burns Red, formed in 2003 in Manheim, Pennsylvania. Known for his highly technical drumming style, Greiner combines blazing double bass patterns with intricate fills and creative use of dynamics. His work on albums like "Messengers," "Constellations," and "Phantom Anthem" has earned him widespread acclaim in the metal community. In 2012, he co-founded the drum company Greiner & Kilmer with fellow drummer Kaleb Kilmer. A Grammy-nominated artist (Best Metal Performance for "Identity"), Greiner is considered one of the most influential metalcore drummers of his generation. Beyond drumming, he is also an accomplished pianist and an outspoken Christian.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Matt_Greiner',
      'https://www.instagram.com/mattgreinerabr/',
      'https://www.discogs.com/artist/1065411-Matt-Greiner',
      'https://www.allmusic.com/artist/matt-greiner-mn0001869167'
    ],
    gear: {
      drums: 'Meinl Drum Festival Kit / Greiner & Kilmer Custom',
      snare: 'Greiner & Kilmer Custom 14x6.5" Maple',
      cymbals: 'Meinl Byzance Series (15" Dual Hi-Hats, 18" & 19" Dual Crashes, 21" Transition Ride, 18" Extra Dry China, 10" & 12" Splashes)',
      hardware: 'DW 9000 Series Double Pedal, DW 9100 Throne',
      sticks: 'Vic Firth American Classic 5A',
      heads: 'Evans',
      verified: true,
      verifiedAt: '2026-02-03',
      sources: ['https://meinlcymbals.com/en/artists', 'https://en.wikipedia.org/wiki/Matt_Greiner']
    },
    photos: [
      '/images/drummers/matt-greiner.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/f/f8/August_Burns_Red_%E2%80%93_Elbriot_2014_04.jpg
    ],
    endorsements: [
      { name: 'Greiner & Kilmer Drums', url: 'https://www.greinerkilmer.com' },
      { name: 'Meinl Cymbals', url: 'https://meinlcymbals.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' },
      { name: 'DW Hardware', url: 'https://www.dwdrums.com' }
    ],
    videos: [
      { title: 'White Washed - Break Down Series', youtubeId: 'aUnQNahYH-g', year: 2017 },
      { title: 'Paramount - Drum Playthrough', youtubeId: 'i6952GF3pdI', year: 2020 },
      { title: 'Composure - Drum Playthrough', youtubeId: 'iSoU9fs4Umo', year: 2019 }
    ],
    quotes: [
      { text: "I want my drumming to serve the song first. The technical stuff is fun, but it has to make musical sense.", source: "Modern Drummer Magazine", year: 2017 },
      { text: "Being homeschooled gave me extra time to practice. I'd spend 6-8 hours a day just playing drums.", source: "Drumeo Interview", year: 2019 }
    ]
  },
  {
    id: 33,
    name: 'Blake Richardson',
    band: 'Between the Buried and Me',
    bands: [
      { name: 'Between the Buried and Me', period: '2005–present', current: true }
    ],
    genre: 'Progressive Metal / Technical Death Metal',
    country: 'USA',
    image: '/images/drummers/blake-richardson.webp',
    bio: 'Cartland Blake Richardson (born June 29, 1984) is the drummer for American progressive metal band Between the Buried and Me, as well as Glass Casket. Joining BTBAM in early 2005, Richardson replaced former drummer Jason Roe and has been integral to the band\'s evolution ever since. His drumming is characterized by a fusion of death metal precision with jazz influences, featuring complex blast beats, odd time signatures, and fill-heavy arrangements. Richardson\'s work on landmark albums like "Colors," "The Great Misdirect," and "Colors II" has earned him Grammy nominations and widespread acclaim. Inspired by drummers like Terry Bozzio, Dennis Chambers, and Tomas Haake, he is considered one of the most creative and technically proficient drummers in modern progressive metal.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Blake_Richardson_(drummer)',
      'https://www.instagram.com/blakebtbam/',
      'https://www.discogs.com/artist/641825-Blake-Richardson',
      'https://www.grammy.com/artists/blake-richardson/243499'
    ],
    gear: {
      drums: 'Tama Starclassic Bubinga (Custom Finish)',
      snare: 'Tama STARPHONIC 14x6" Brass',
      cymbals: 'Sabian (14" HHX Evolution Hi-Hats, 18" HHX Evolution Crash, 17" & 21" AAX Holy Chinas, 21" HH Raw Bell Dry Ride, 10" HH Duo Splash, 9" Radia Cup Chime)',
      hardware: 'Tama Iron Cobra Power Glide Single Pedals (x2), Tama Hardware',
      sticks: 'Vic Firth American Classic 3A',
      heads: 'Evans (Hybrid on snare, EMAD on kicks, EC2 SST on toms)',
      verified: true,
      verifiedAt: '2026-02-03',
      sources: ['https://en.wikipedia.org/wiki/Blake_Richardson_(drummer)', 'https://sabian.com/artists']
    },
    photos: [
      '/images/drummers/blake-richardson.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/1/1b/Between_the_Buried_and_Me_%40_Euroblast_2015_08.jpg
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { title: 'Voice of Trespass - Live Drum Playthrough', youtubeId: 'GR8bITumSdk', year: 2019 },
      { title: 'BTBAM Grooves & Fills Breakdown', youtubeId: 'RzQ3AQZ-MuA', year: 2020 },
      { title: 'Recording Obfuscation', youtubeId: 'snGxAUBMZHY', year: 2018 }
    ],
    quotes: [
      { text: "I try to approach drums melodically. Every fill, every pattern should have a musical purpose.", source: "Modern Drummer Magazine", year: 2012 },
      { text: "Playing with Mike Portnoy at Progressive Nation 2008 was a dream come true. That guy is a legend.", source: "Drumeo Interview", year: 2021 }
    ]
  },
  {
    id: 34,
    name: 'Ben Koller',
    band: 'Converge / Mutoid Man / Killer Be Killed',
    bands: [
      { name: 'Converge', period: '1999–present', current: true },
      { name: 'Mutoid Man', period: '2012–present', current: true },
      { name: 'Killer Be Killed', period: '2014–present', current: true }
    ],
    genre: 'Metalcore / Hardcore Punk / Grindcore',
    country: 'USA',
    image: '/images/drummers/ben-koller.webp',
    bio: 'Ben Koller (born July 29, 1980) is an American drummer known for his work with Converge, Mutoid Man, Killer Be Killed, and All Pigs Must Die. Joining Converge in late 1999, Koller has been central to the band\'s legendary status, playing on landmark albums like "Jane Doe," "You Fail Me," and "The Dusk in Us." His drumming style combines blistering speed with creative dynamics, drawing from hardcore punk, grindcore, and experimental rock. Beyond Converge, he co-founded the heavy rock band Mutoid Man with Stephen Brodsky of Cave In, and joined the supergroup Killer Be Killed alongside members of Mastodon, The Dillinger Escape Plan, and Soulfly. Koller\'s versatility and intensity have made him one of the most respected drummers in extreme music.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Ben_Koller',
      'https://www.instagram.com/ben_koller/',
      'https://www.discogs.com/artist/427689-Ben-Koller',
      'https://www.allmusic.com/artist/ben-koller-mn0001155282'
    ],
    gear: {
      drums: 'Tama Starclassic Maple',
      snare: 'Tama S.L.P. 14x6" Brass',
      cymbals: 'Zildjian (14" K Dark Thin Hi-Hats, 18" & 19" K Dark Medium Thin Crashes, 21" K Custom Ride, 18" K China)',
      hardware: 'Tama Iron Cobra 900 Double Pedal, Tama Throne',
      sticks: 'Vic Firth American Classic 5B',
      heads: 'Remo',
      verified: true,
      verifiedAt: '2026-02-03',
      sources: ['https://en.wikipedia.org/wiki/Ben_Koller', 'https://zildjian.com/artists']
    },
    photos: [
      '/images/drummers/ben-koller.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/8/8a/Converge_%40_Roadburn_Festival_2018-04-19_002.jpg
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Remo Drumheads', url: 'https://remo.com' }
    ],
    videos: [
      { title: 'Concubine & Dark Horse - GoPro Drum Cam', youtubeId: '5T4iTvQ8ZUg', year: 2016 },
      { title: 'Full Set Live Drum Cam (2016)', youtubeId: 'VvA5P_iPjjY', year: 2016 },
      { title: 'Vengeance (No Heroes) - Live', youtubeId: 'mz6opF7X9A4', year: 2023 }
    ]
  },
  {
    id: 35,
    name: 'Flo Mounier',
    band: 'Cryptopsy',
    bands: [
      { name: 'Cryptopsy', period: '1992–present', current: true }
    ],
    genre: 'Technical Death Metal / Brutal Death Metal',
    country: 'Canada',
    image: '/images/drummers/flo-mounier.webp',
    bio: 'Flo Mounier is a Canadian drummer and the only constant member of technical death metal pioneers Cryptopsy, which he joined in 1992. Born in Montreal, Quebec, Mounier is widely regarded as one of the fastest and most technically proficient drummers in extreme metal. His innovative blast beat techniques, gravity blasts, and complex polyrhythmic patterns have influenced countless death metal drummers. Albums like "None So Vile" (1996) and "Whisper Supremacy" (1998) showcase his legendary speed and precision. Beyond his raw power, Mounier incorporates jazz and fusion elements into his playing, adding musicality to Cryptopsy\'s brutality. He has been endorsed by Pearl, Sabian, and Vic Firth, and has released instructional DVDs sharing his techniques.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Cryptopsy',
      'https://www.discogs.com/artist/313395-Flo-Mounier',
      'https://www.allmusic.com/artist/flo-mounier-mn0000144667'
    ],
    gear: {
      drums: 'Pearl Masters Maple Complete',
      snare: 'Pearl Masters 14x5.5" Maple',
      cymbals: 'Sabian AAX & HHX Series (14" HHX Stage Hi-Hats, 17" & 18" AAX X-Plosion Crashes, 21" HHX Raw Bell Dry Ride, 18" AAXtreme China)',
      hardware: 'Pearl Demon Drive Double Pedal, Pearl D-3000 Throne',
      sticks: 'Vic Firth American Classic 5A',
      heads: 'Evans',
      verified: true,
      verifiedAt: '2026-02-03',
      sources: ['https://pearldrum.com/en/artists', 'https://sabian.com/artists']
    },
    photos: [
      '/images/drummers/flo-mounier.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/b/bc/Cryptopsy_Party.San_Metal_Open_Air_2017_20.jpg
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { title: 'Sire of Sin - Drum Playthrough', youtubeId: '-U6ScIBk4qE', year: 2019 },
      { title: 'Slit Your Guts - Brutal Assault (Drum Cam)', youtubeId: 'Ef_0my8krZc', year: 2017 },
      { title: 'Phobophile - Rehearsal', youtubeId: 'c_1RZcM3zso', year: 2020 }
    ],
    quotes: [
      { text: "Speed means nothing without control. I practice slow to play fast.", source: "Modern Drummer Magazine", year: 2008 },
      { text: "The gravity blast was born out of necessity. I wanted to go faster than traditional blasts would allow.", source: "Drumeo Interview", year: 2020 }
    ]
  },
  {
    id: 37,
    name: 'Jason Bittner',
    band: 'Shadows Fall / Overkill / Category 7',
    bands: [
      { name: 'Overkill', period: '2017–present', current: true },
      { name: 'Shadows Fall', period: '1999–2015', current: false },
      { name: 'Category 7', period: '2024–present', current: true }
    ],
    genre: 'Thrash Metal / Heavy Metal',
    country: 'USA',
    image: '/images/drummers/jason-bittner.webp',
    bio: 'Jason Bittner (born January 11, 1970) is an American drummer best known for his work with Shadows Fall, Overkill, Flotsam and Jetsam, and supergroup Category 7. A Berklee College of Music alumnus, Bittner combines technical precision with raw power, making him a standout in the thrash metal scene. He joined Shadows Fall in 2001 and was integral to their commercial breakthrough, winning multiple "Best Metal Drummer" awards from Modern Drummer magazine. His playing on albums like "The Art of Balance" and "The War Within" earned him widespread recognition. Bittner joined Overkill in 2017, bringing his technical chops to the legendary thrash band. He has also filled in for Charlie Benante of Anthrax on multiple occasions. An accomplished educator, he has released instructional DVDs and written for drum publications worldwide.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Jason_Bittner',
      'https://www.instagram.com/jasonbittner/',
      'https://www.discogs.com/artist/356185-Jason-Bittner',
      'https://www.allmusic.com/artist/jason-bittner-mn0000191015'
    ],
    gear: {
      drums: 'Mapex Saturn V',
      snare: 'Mapex Black Panther 14x6.5" Brass',
      cymbals: 'Zildjian K & A Custom Series (14" K Hi-Hats, 18" & 19" A Custom Crashes, 21" K Custom Ride, 18" K China)',
      hardware: 'Mapex Falcon Double Pedal, Mapex T865 Throne',
      sticks: 'Promark Jason Bittner Signature 5BX',
      heads: 'Evans',
      verified: true,
      verifiedAt: '2026-02-03',
      sources: ['https://en.wikipedia.org/wiki/Jason_Bittner', 'https://mapexdrums.com/artists']
    },
    photos: [
      '/images/drummers/jason-bittner.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/7/74/Overkill_Party.San_Metal_Open_Air_2017_21.jpg
    ],
    endorsements: [
      { name: 'Mapex Drums', url: 'https://www.mapexdrums.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Promark Sticks', url: 'https://www.daddario.com/promark' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { title: 'Mean Green Killing Machine - Drum Performance', youtubeId: 'N4DxwwiGCh0', year: 2019 },
      { title: 'Last Man Standing - Drum Cam (Budapest)', youtubeId: 'W8_4tEyGCoo', year: 2019 },
      { title: 'Overkill Live Performance', youtubeId: 'kPuxxLqvCNw', year: 2020 }
    ],
    quotes: [
      { text: "Berklee taught me discipline, but the road taught me how to play metal.", source: "Modern Drummer Magazine", year: 2006 },
      { text: "Filling in for Charlie Benante was terrifying and amazing. Those are big shoes to fill.", source: "Drumeo Interview", year: 2018 }
    ]
  },
  {
    id: 38,
    name: 'Martin Lopez',
    band: 'Soen / ex-Opeth',
    bands: [
      { name: 'Soen', period: '2010–present', current: true },
      { name: 'Opeth', period: '1997–2006', current: false }
    ],
    genre: 'Progressive Metal / Progressive Death Metal',
    country: 'Sweden',
    image: '/images/drummers/martin-lopez.webp',
    bio: 'Martín Walter López Cardozo (born May 20, 1978) is a Swedish-Uruguayan drummer best known as the former drummer of Opeth and current member/co-founder of progressive metal band Soen. López joined Opeth in 1997 after leaving Amon Amarth, and his drumming was central to their classic albums including "Blackwater Park," "Deliverance," "Damnation," and "Ghost Reveries." His dynamic playing style combines jazz finesse with metal power, featuring creative use of ghost notes, complex hi-hat patterns, and melodic tom work. Health issues led to his departure from Opeth in 2006. In 2010, he co-founded Soen with bassist Steve Di Giorgio, creating a new vehicle for his progressive vision. López\'s drumming emphasizes feel and musicality over pure technicality, making him one of the most tasteful drummers in progressive metal.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Martin_Lopez',
      'https://www.discogs.com/artist/276715-Martin-Lopez',
      'https://www.allmusic.com/artist/martin-lpez-mn0000375628'
    ],
    gear: {
      drums: 'Noble & Cooley Walnut',
      snare: 'Noble & Cooley Solid Shell 14x6" Maple',
      cymbals: 'Zildjian K Dark Series (14" K Dark Thin Hi-Hats, 18" & 20" K Dark Medium Thin Crashes, 22" K Dark Light Ride, 18" K China)',
      hardware: 'Axis Percussion Double Pedal, DW 9100 Throne',
      sticks: 'Vic Firth American Classic 5A',
      heads: 'Remo',
      verified: true,
      verifiedAt: '2026-02-03',
      sources: ['https://en.wikipedia.org/wiki/Martin_Lopez', 'https://zildjian.com/artists']
    },
    photos: [
      '/images/drummers/martin-lopez.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/2/2c/Soen_%40_Euroblast_Festival_2018-10-06_030.jpg
    ],
    endorsements: [
      { name: 'Noble & Cooley Drums', url: 'https://www.noblecooley.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Axis Percussion', url: 'https://www.axispercussion.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Remo Drumheads', url: 'https://remo.com' }
    ],
    videos: [
      { title: 'Ex-Opeth Drummer Performance', youtubeId: '2zRdhNGyRsc', year: 2016 },
      { title: 'Deliverance Outro - Drum Performance', youtubeId: 'kI8w_r9mvBw', year: 2015 },
      { title: 'Ghost of Perdition - Drum Performance', youtubeId: 'wuIt-kMFi60', year: 2018 }
    ],
    quotes: [
      { text: "Less is more. The spaces between the notes are just as important as the notes themselves.", source: "Modern Drummer Magazine", year: 2014 },
      { text: "Playing with Opeth taught me that heavy music can be beautiful and subtle at the same time.", source: "Drumeo Interview", year: 2019 }
    ]
  },
  {
    id: 39,
    name: 'Travis Orbin',
    band: 'Darkest Hour / ex-Periphery',
    bands: [
      { name: 'Darkest Hour', period: '2017–present', current: true },
      { name: 'Periphery', period: '2005–2012', current: false }
    ],
    genre: 'Thrash Metal / Progressive Metal / Djent',
    country: 'USA',
    image: '/images/drummers/travis-orbin.webp',
    bio: 'Travis Orbin (born August 26, 1985) is an American drummer known for his work with Darkest Hour and as the original studio drummer for Periphery. A self-taught drummer from New York, Orbin rose to prominence recording Periphery\'s groundbreaking self-titled debut album (2010), which helped define the djent movement. His complex polyrhythmic patterns, precise double bass work, and creative use of electronic triggers set a new standard for modern metal drumming. After leaving Periphery, he joined thrash metal band Darkest Hour in 2013. Orbin is also a prolific session musician and runs the "Travis Orbin Drum" YouTube channel where he posts playthroughs of his studio work. His influences include Gene Hoglan, Tomas Haake, and Matt Garstka.',
    sameAs: [
      'https://www.instagram.com/travisorbin/',
      'https://www.youtube.com/@TravisOrbinDrum',
      'https://www.discogs.com/artist/1805694-Travis-Orbin'
    ],
    gear: {
      drums: 'SJC Custom Drums',
      snare: 'SJC Custom 14x6.5" Maple',
      cymbals: 'Zildjian K Custom Series (14" K Custom Dark Hi-Hats, 18" & 19" K Custom Dark Crashes, 21" K Custom Ride, 18" K Custom China)',
      hardware: 'DW 9000 Series Double Pedal, Roland SPD-SX Sampling Pad, DW 9100 Throne',
      sticks: 'Vic Firth American Classic 5B',
      heads: 'Evans',
      verified: true,
      verifiedAt: '2026-02-03',
      sources: ['https://sjcdrums.com/pages/artists', 'https://zildjian.com/artists']
    },
    photos: [
      '/images/drummers/travis-orbin.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/3/3e/Darkest_Hour_%282%29.jpg
    ],
    endorsements: [
      { name: 'SJC Custom Drums', url: 'https://www.sjcdrums.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' },
      { name: 'Roland Electronics', url: 'https://www.roland.com' },
      { name: 'DW Hardware', url: 'https://www.dwdrums.com' }
    ],
    videos: [
      { title: 'Zyglrox - Periphery Playalong', youtubeId: 'iUexj385fxQ', year: 2017 },
      { title: 'Totla Mad - Periphery Playalong', youtubeId: 't15pif66cUw', year: 2017 }
    ]
  },
  {
    id: 40,
    name: 'Ryan Van Poederooyen',
    band: 'Devin Townsend Project',
    bands: [
      { name: 'Devin Townsend Project', period: '2009–2018', current: false }
    ],
    genre: 'Progressive Metal / Extreme Metal',
    country: 'Canada',
    image: '/images/drummers/ryan-van-poederooyen.webp',
    bio: 'Ryan Van Poederooyen is a Canadian drummer best known for his longtime collaboration with Devin Townsend in the Devin Townsend Band and Devin Townsend Project. A Montreal native, Van Poederooyen\'s powerful yet dynamic drumming style has been central to Townsend\'s music since the early 2000s. His ability to navigate Townsend\'s complex, genre-defying compositions—from ambient passages to crushing metal sections—showcases his versatility. Key albums include "Accelerated Evolution," "Synchestra," "Addicted," "Deconstruction," and "Transcendence." Van Poederooyen combines heavy metal power with prog-rock finesse, featuring creative tom patterns, tasteful cymbal work, and thunderous double bass. He has also worked as a session drummer and drum teacher in the Montreal area.',
    sameAs: [
      'https://www.instagram.com/ryanvanp/',
      'https://www.discogs.com/artist/407628-Ryan-Van-Poederooyen'
    ],
    gear: {
      drums: 'Pearl Reference Series',
      snare: 'Pearl Reference 14x6.5" Brass',
      cymbals: 'Sabian HHX & AAX Series (14" HHX Evolution Hi-Hats, 18" & 20" HHX Evolution Crashes, 21" HHX Raw Bell Dry Ride, 19" AAXtreme China)',
      hardware: 'Pearl Demon Drive Double Pedal, Pearl D-3000 Throne',
      sticks: 'Vic Firth American Classic 5B',
      heads: 'Evans',
      verified: true,
      verifiedAt: '2026-02-03',
      sources: ['https://pearldrum.com/en/artists', 'https://sabian.com/artists']
    },
    photos: [
      '/images/drummers/ryan-van-poederooyen.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/e/e1/Devin_Townsend_Project_%E2%80%93_Wacken_Open_Air_2014_03.jpg
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { title: 'Regulator - Barcelona Drum Cam', youtubeId: 'M2wHrzRkq5U', year: 2017 },
      { title: 'Higher - Dallas Drum Cam', youtubeId: 'S7auRW4YsLc', year: 2016 },
      { title: 'Failure - Drum Breakdown', youtubeId: 'vyYq8_m6x2k', year: 2020 }
    ],
    quotes: [
      { text: "Working with Devin is never boring. Every album is a completely different challenge.", source: "Modern Drummer Magazine", year: 2015 },
      { text: "I try to approach each song as a unique puzzle. What does the music need from me?", source: "Canadian Musician", year: 2018 }
    ]
  },
  {
    id: 41,
    name: 'Nicko McBrain',
    band: 'Iron Maiden',
    bands: [
      { name: 'Iron Maiden', period: '1982–present', current: true }
    ],
    genre: 'Heavy Metal / NWOBHM',
    country: 'UK',
    image: '/images/drummers/nicko-mcbrain.webp',
    bio: 'Nicko McBrain (born Michael Henry McBrain in 1952) is an English drummer best known as the longtime drummer of Iron Maiden since 1982. With his distinctive galloping style, intricate hi-hat work, and powerful single bass drum technique, Nicko has been instrumental in defining Iron Maiden\'s signature sound. Before joining Maiden, he played with Trust and Pat Travers Band. His drumming on classic albums like "Powerslave," "Somewhere in Time," and "Seventh Son of a Seventh Son" showcases his ability to combine speed, precision, and musicality. Notable for refusing to use a double bass pedal, Nicko achieves remarkable speed with a single pedal technique.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Nicko_McBrain',
      'https://www.instagram.com/nicaboricua/',
      'https://www.discogs.com/artist/252907-Nicko-McBrain',
      'https://www.allmusic.com/artist/nicko-mcbrain-mn0000850059'
    ],
    gear: {
      drums: 'Sonor SQ2 Series',
      snare: 'Sonor Nicko McBrain Signature 14x6.5"',
      cymbals: 'Paiste 2002 & Signature Series (14" Sound Edge Hi-Hats, 16" & 18" Power Crashes, 22" Power Ride, 20" China)',
      hardware: 'Sonor 600 Series Hardware, Single Bass Drum Pedal',
      sticks: 'Vic Firth Nicko McBrain Signature',
      heads: 'Remo Emperor',
      verified: true,
      sources: ['https://www.sonor.com/artists/', 'https://www.paiste.com/en/musicians/nicko-mcbrain']
    },
    photos: [
      '/images/drummers/nicko-mcbrain.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/a/a9/Nicko_McBrain_2.jpg
    ],
    endorsements: [
      { name: 'Sonor Drums', url: 'https://www.sonor.com' },
      { name: 'Paiste Cymbals', url: 'https://www.paiste.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Remo Drumheads', url: 'https://remo.com' }
    ],
    videos: [
      { title: 'The Trooper - Drum Cam (En Vivo 2012)', youtubeId: 'X4bgXH3sJ2Q', year: 2012 },
      { title: 'Aces High - Drum Cam (Rock in Rio 2019)', youtubeId: 'Xg9aQvjMS60', year: 2019 },
      { title: 'Nicko McBrain Drum Solo - Flight of Icarus (Live)', youtubeId: '7QU1nvuxaMA', year: 2008 }
    ],
    quotes: [
      { text: "I've never needed a double bass pedal. One foot is enough if you practice hard.", source: "Modern Drummer", year: 2010 },
      { text: "Iron Maiden is like a family. We've been through everything together.", source: "Classic Rock Magazine", year: 2015 }
    ]
  },
  {
    id: 42,
    name: 'Scott Travis',
    band: 'Judas Priest',
    bands: [
      { name: 'Judas Priest', period: '1989–present', current: true }
    ],
    genre: 'Heavy Metal / Thrash Metal',
    country: 'USA',
    image: '/images/drummers/scott-travis.webp',
    bio: 'Scott Travis (born 1961) is an American drummer who has been the drummer for Judas Priest since 1989. Known for bringing a double bass-driven, thrash-influenced style to the band, Travis revitalized Priest\'s sound starting with the landmark album "Painkiller." His technical precision, powerful double bass work, and ability to play complex patterns at high speeds have made him one of the most respected drummers in heavy metal. Before joining Priest, he played with Racer X alongside Paul Gilbert. Travis has also played with Dio\'s touring band and various other metal projects.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Scott_Travis',
      'https://www.discogs.com/artist/281411-Scott-Travis',
      'https://www.allmusic.com/artist/scott-travis-mn0000317825'
    ],
    gear: {
      drums: 'ddrum Dominion Series',
      snare: 'ddrum Scott Travis Signature 14x6.5"',
      cymbals: 'Paiste RUDE & 2002 Series (14" RUDE Hi-Hats, 18" & 19" RUDE Crashes, 22" RUDE Power Ride, 18" RUDE China)',
      hardware: 'DW 9000 Series Double Pedal, Gibraltar Rack System',
      sticks: 'Vic Firth American Classic 5B',
      heads: 'Remo',
      verified: true,
      sources: ['https://www.paiste.com/en/musicians/scott-travis']
    },
    photos: [
      '/images/drummers/scott-travis.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/3/32/Scott_Travis2005.jpg
    ],
    endorsements: [
      { name: 'ddrum Drums', url: 'https://www.ddrum.com' },
      { name: 'Paiste Cymbals', url: 'https://www.paiste.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Remo Drumheads', url: 'https://remo.com' }
    ],
    videos: [
      { title: 'Painkiller - Live (2015 Drum Cam)', youtubeId: 'WS6-vI70oc0', year: 2015 },
      { title: 'Judas Priest - Firepower Tour (Drum Cam)', youtubeId: 'nKDgFCojiT8', year: 2018 },
      { title: 'Judas Priest - Breaking the Law (Live)', youtubeId: 'L397TWLwrUU', year: 2015 }
    ],
    quotes: [
      { text: "Painkiller was a turning point for the band and for me. We pushed each other to new limits.", source: "Drum! Magazine", year: 2012 },
      { text: "Speed is nothing without control. You have to master both.", source: "Modern Drummer", year: 2018 }
    ]
  },
  {
    id: 43,
    name: 'Mikkey Dee',
    band: 'Scorpions / Motörhead',
    bands: [
      { name: 'Scorpions', period: '2016–present', current: true },
      { name: 'Motörhead', period: '1992–2015', current: false },
      { name: 'King Diamond', period: '1985–1989', current: false }
    ],
    genre: 'Heavy Metal / Hard Rock',
    country: 'Sweden',
    image: '/images/drummers/mikkey-dee.webp',
    bio: 'Mikkey Dee (born Micael Kiriakos Delaoglou in 1963) is a Swedish drummer best known for his work with Motörhead (1992-2015) and currently with Scorpions (since 2016). Before Motörhead, he played with King Diamond and Don Dokken. His powerful, hard-hitting style and incredible stamina made him the perfect drummer for Lemmy Kilmister\'s relentless rock \'n\' roll machine. After Lemmy\'s death, Mikkey joined Scorpions, bringing his thunderous drumming to classic rock anthems. Known for his aggressive approach and incredible live performances, Mikkey is one of the most respected drummers in hard rock and metal.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Mikkey_Dee',
      'https://www.instagram.com/theofficialmikkeydee/',
      'https://www.discogs.com/artist/259028-Mikkey-Dee',
      'https://www.allmusic.com/artist/mikkey-dee-mn0000846668'
    ],
    gear: {
      drums: 'Yamaha Recording Custom',
      snare: 'Yamaha Mikkey Dee Signature 14x8"',
      cymbals: 'Zildjian A Custom & K Series (14" A Custom Hi-Hats, 18" & 19" A Custom Crashes, 22" K Custom Ride, 20" Oriental China)',
      hardware: 'Yamaha FP9 Double Pedal, Yamaha Hardware',
      sticks: 'Vic Firth Mikkey Dee Signature',
      heads: 'Remo',
      verified: true,
      sources: ['https://europe.yamaha.com/en/artists/drums/mikkey-dee/', 'https://zildjian.com/artists']
    },
    photos: [
      '/images/drummers/mikkey-dee.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/b/bb/Mikkey_Dee_%28PK%29_%E2%80%93_Wacken_Open_Air_2015_02.jpg
    ],
    endorsements: [
      { name: 'Yamaha Drums', url: 'https://www.yamaha.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Remo Drumheads', url: 'https://remo.com' }
    ],
    videos: [
      { title: 'Motörhead - Ace of Spades (Official Video)', youtubeId: 'e7kJRGPgvRQ', year: 1980 },
      { title: 'Scorpions - Rock You Like a Hurricane (Official)', youtubeId: 'IjjCp_QU5Qk', year: 2010 },
      { title: 'Mikkey Dee - Drum Interview & Demo', youtubeId: 'kOIj7AgonHM', year: 2016 }
    ],
    quotes: [
      { text: "Playing with Lemmy was like being in a hurricane every night. Pure adrenaline.", source: "Rhythm Magazine", year: 2016 },
      { text: "I hit hard because that's what rock and roll demands. No holding back.", source: "Modern Drummer", year: 2012 }
    ]
  },
  {
    id: 44,
    name: 'Derek Roddy',
    band: 'Hate Eternal / Nile',
    bands: [
      { name: 'Hate Eternal', period: '2000–2002, 2004–2005', current: false },
      { name: 'Nile', period: '2000–2002', current: false },
      { name: 'Malevolent Creation', period: '1996–1999', current: false }
    ],
    genre: 'Death Metal / Technical Death Metal',
    country: 'USA',
    image: '/images/drummers/derek-roddy.webp',
    bio: 'Derek Roddy (born 1972) is an American drummer renowned for his extreme speed, technical proficiency, and endurance. He is considered one of the pioneers of modern extreme metal drumming. Roddy has performed with Hate Eternal, Nile, Aurora Borealis, Council of the Fallen, and Serpents Rise. His blast beats, one-footed bass drum techniques, and overall precision have influenced countless metal drummers. Beyond performing, Derek is a respected educator, having written instructional books and produced educational DVDs on extreme metal drumming techniques.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Derek_Roddy',
      'https://www.instagram.com/derekroddy/',
      'https://www.discogs.com/artist/344700-Derek-Roddy',
      'https://www.allmusic.com/artist/derek-roddy-mn0000251988'
    ],
    gear: {
      drums: 'Tama Starclassic Bubinga',
      snare: 'Tama SLP Black Brass 14x6.5"',
      cymbals: 'Meinl Byzance & Mb20 Series (14" Byzance Heavy Hi-Hats, 18" & 19" Mb20 Heavy Crashes, 21" Mb20 Heavy Ride, 18" Byzance China)',
      hardware: 'Tama Speed Cobra 910 Double Pedal',
      sticks: 'Vic Firth Derek Roddy Signature',
      heads: 'Evans',
      verified: true,
      sources: ['https://www.tama.com/usa/artists/', 'https://meinlcymbals.com/en/artists']
    },
    photos: [
      '/images/drummers/derek-roddy.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/d/d7/Derek_Roddy_2003_%28cropped%29.jpg
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Meinl Cymbals', url: 'https://meinlcymbals.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { title: 'Meeting Erik Rutan - Hate Eternal Interview', youtubeId: 'GHFCf9o3Iy0', year: 2020 },
      { title: 'NAMM Drum Solo', youtubeId: 'hwxjX7-_LJ8', year: 2015 },
      { title: 'Black Seeds of Vengeance - Drum Fill', youtubeId: 'qF-CII9A-Mo', year: 2019 }
    ],
    quotes: [
      { text: "Speed means nothing without control and musicality. Anyone can play fast, but can you play music?", source: "Sick Drummer Magazine", year: 2008 },
      { text: "I developed my one-foot technique because I wanted to prove that triggers aren't necessary.", source: "Modern Drummer", year: 2011 }
    ]
  },
  {
    id: 45,
    name: 'Dirk Verbeuren',
    band: 'Megadeth',
    bands: [
      { name: 'Megadeth', period: '2016–present', current: true },
      { name: 'Soilwork', period: '2004–2016', current: false }
    ],
    genre: 'Thrash Metal / Melodic Death Metal',
    country: 'Belgium',
    image: '/images/drummers/dirk-verbeuren.webp',
    bio: 'Dirk Verbeuren (born 1975) is a Belgian drummer who has been the drummer for Megadeth since 2016. Before joining Megadeth, he was best known for his work with Swedish melodic death metal band Soilwork from 1998 to 2016. His precise, powerful playing combines European metal sensibilities with American thrash aggression. Verbeuren\'s technical abilities, double bass precision, and dynamic range have been praised by critics and fans alike. He has also performed with Devin Townsend, Scarve, and various other metal projects.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Dirk_Verbeuren',
      'https://www.instagram.com/dirkverbeuren/',
      'https://www.discogs.com/artist/481456-Dirk-Verbeuren',
      'https://www.allmusic.com/artist/dirk-verbeuren-mn0000591637'
    ],
    gear: {
      drums: 'Tama Starclassic Walnut/Birch',
      snare: 'Tama S.L.P. Big Black Steel 14x6.5"',
      cymbals: 'Zildjian A Custom & K Custom Series (14" A Custom Hi-Hats, 17", 18", 19" A Custom Crashes, 21" K Custom Hybrid Ride, 18" K China)',
      hardware: 'Tama Speed Cobra 910 Double Pedal, Tama Iron Cobra Hi-Hat Stand',
      sticks: 'Promark Shira Kashi Oak 5B',
      heads: 'Evans',
      verified: true,
      sources: ['https://www.tama.com/usa/artists/', 'https://zildjian.com/artists']
    },
    photos: [
      '/images/drummers/dirk-verbeuren.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/e/e0/Megadeth_-_Wacken_Open_Air_2023_01_%28cropped%29.jpg
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Promark Sticks', url: 'https://www.daddario.com/promark' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { title: 'Mechanix - Drum Playthrough', youtubeId: 'E2AZrt_qFEU', year: 2021 },
      { title: 'The Conjuring - Drum Playthrough', youtubeId: 'kSfJgLDlrIM', year: 2020 },
      { title: 'Tornado of Souls - Live Drum Cam', youtubeId: 'oMvDuxAQNOY', year: 2023 }
    ],
    quotes: [
      { text: "Joining Megadeth was a dream come true. These songs are part of metal history.", source: "Modern Drummer", year: 2017 },
      { text: "Precision and power must work together. One without the other is incomplete.", source: "Drumeo", year: 2019 }
    ]
  },
  {
    id: 46,
    name: 'Frost',
    band: 'Satyricon / 1349',
    bands: [
      { name: 'Satyricon', period: '1993–present', current: true },
      { name: '1349', period: '1997–present', current: true }
    ],
    genre: 'Black Metal',
    country: 'Norway',
    image: '/images/drummers/frost.webp',
    bio: 'Kjetil-Vidar Haraldstad (born 1973), known professionally as Frost, is a Norwegian drummer and a central figure in the Scandinavian black metal scene. He is the drummer for Satyricon since 1993 and 1349 since 2001. Known for his incredible speed, precision, and stamina, Frost is considered one of the greatest extreme metal drummers. His blast beats and hyperspeed drumming have set the standard for black metal percussion. Despite the raw nature of black metal, Frost brings a high level of technicality and discipline to his performances.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Frost_(musician)',
      'https://www.discogs.com/artist/297893-Frost-6',
      'https://www.allmusic.com/artist/frost-mn0001573890'
    ],
    gear: {
      drums: 'Sonor SQ2 Series',
      snare: 'Sonor SQ2 14x6" Maple',
      cymbals: 'Zildjian A Custom & K Series (14" A Custom Hi-Hats, 16", 17", 18" A Custom Crashes, 22" K Custom Dark Ride, 18" K China)',
      hardware: 'Sonor Perfect Balance Pedal, Sonor Hardware',
      sticks: 'Vic Firth American Classic Extreme 5B',
      heads: 'Remo',
      verified: true,
      sources: ['https://www.sonor.com/artists/']
    },
    photos: [
      '/images/drummers/frost.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/4/4c/Satyricon%2C_Tons_of_Rock%2C_Oslo_Norway_%2853845732674%29_%28cropped%29.jpg
    ],
    endorsements: [
      { name: 'Sonor Drums', url: 'https://www.sonor.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Remo Drumheads', url: 'https://remo.com' }
    ],
    videos: [
      { title: 'Satyricon Drumming', youtubeId: 'ZqC73hT5nWQ', year: 2020 },
      { title: 'Forhekset - Live Poland (Drum Cam)', youtubeId: 'tbxS-cpQ6Aw', year: 2025 },
      { title: 'The Pentagram Burns - Live Drum Cam', youtubeId: 'wR9fpU2_yeo', year: 2025 }
    ],
    quotes: [
      { text: "Black metal drumming is about channeling darkness and aggression through precision.", source: "Decibel Magazine", year: 2010 },
      { text: "Physical endurance is crucial. You cannot fake your way through a 90-minute set of blast beats.", source: "Metal Hammer", year: 2018 }
    ]
  },
  {
    id: 47,
    name: 'Gavin Harrison',
    band: 'Porcupine Tree / King Crimson',
    bands: [
      { name: 'Porcupine Tree', period: '2002–2010, 2021–present', current: true },
      { name: 'King Crimson', period: '2007–2021', current: false },
      { name: 'The Pineapple Thief', period: '2016–present', current: true }
    ],
    genre: 'Progressive Metal / Progressive Rock',
    country: 'UK',
    image: '/images/drummers/gavin-harrison.webp',
    bio: 'Gavin Harrison (born 1963) is an English drummer widely regarded as one of the finest drummers in progressive music. He is best known for his work with Porcupine Tree (2002-2010, 2021-present), King Crimson (2008-present), and The Pineapple Thief (2016-present). His intricate, polyrhythmic approach, ghost note mastery, and ability to play complex odd-time signatures with musicality have earned him numerous awards and accolades. Harrison has won multiple awards from Modern Drummer magazine and is considered a major influence on progressive rock and metal drummers worldwide.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Gavin_Harrison',
      'https://www.instagram.com/gavinharrison_official/',
      'https://www.discogs.com/artist/258920-Gavin-Harrison',
      'https://www.allmusic.com/artist/gavin-harrison-mn0000180067'
    ],
    gear: {
      drums: 'Sonor SQ2 Series',
      snare: 'Sonor Gavin Harrison Signature 12x5" & 14x5.25"',
      cymbals: 'Zildjian K Custom Special Dry Series (14" Hi-Hats, 16" & 18" Crashes, 21" Special Dry Ride, 18" Trash China)',
      hardware: 'Sonor Perfect Balance Pedal, Sonor 600 Series Hardware',
      sticks: 'Vic Firth Gavin Harrison Signature',
      heads: 'Remo Ambassador',
      verified: true,
      sources: ['https://www.sonor.com/artists/', 'https://zildjian.com/artists']
    },
    photos: [
      '/images/drummers/gavin-harrison.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/4/49/Gavin_Harrison_Drum_Clinic_2011.jpg
    ],
    endorsements: [
      { name: 'Sonor Drums', url: 'https://www.sonor.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Remo Drumheads', url: 'https://remo.com' }
    ],
    videos: [
      { title: 'White Mist - The Pineapple Thief', youtubeId: 'n7scYYsLdcM', year: 2021 },
      { title: 'Fill Decrypted - Breakdown', youtubeId: 'ymM8Xbb2D1c', year: 2023 }
    ],
    quotes: [
      { text: "Groove is everything. Without groove, all the chops in the world mean nothing.", source: "Modern Drummer", year: 2015 },
      { text: "I always approach the drums melodically. I try to make the drums sing.", source: "Drumeo Interview", year: 2019 }
    ]
  },
  {
    id: 48,
    name: 'Abe Cunningham',
    band: 'Deftones',
    bands: [
      { name: 'Deftones', period: '1988–present', current: true }
    ],
    genre: 'Alternative Metal / Nu Metal',
    country: 'USA',
    image: '/images/drummers/abe-cunningham.webp',
    bio: 'Abraham Joseph Cunningham (born 1973) is an American drummer and founding member of Deftones. His innovative style combines powerful, hard-hitting grooves with atmospheric, nuanced playing that perfectly complements Deftones\' unique blend of heavy and ambient music. Since the band\'s formation in 1988, Abe has been the rhythmic backbone behind albums like "White Pony," "Diamond Eyes," and "Koi No Yokan." His ability to shift between crushing heaviness and delicate dynamics has made him one of the most respected drummers in alternative metal.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Abe_Cunningham',
      'https://www.instagram.com/abecunningham/',
      'https://www.discogs.com/artist/282498-Abe-Cunningham',
      'https://www.allmusic.com/artist/abe-cunningham-mn0000619687'
    ],
    gear: {
      drums: 'SJC Custom Drums',
      snare: 'SJC Custom 14x6.5" Brass',
      cymbals: 'Zildjian K Custom & A Custom Series (14" K Custom Hi-Hats, 18" & 20" K Custom Crashes, 22" K Custom Ride, 19" A Custom China)',
      hardware: 'DW 9000 Series Double Pedal, DW Hardware',
      sticks: 'Vic Firth American Classic 2B',
      heads: 'Remo',
      verified: true,
      sources: ['https://www.sjcdrums.com/artists/', 'https://zildjian.com/artists']
    },
    photos: [
      '/images/drummers/abe-cunningham.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/f/fe/Deftones_-_Rock_am_Ring_2016_-2016156214257_2016-06-04_Rock_am_Ring_-_Sven_-_1D_X_-_0105_-_DV3P9764_mod.jpg
    ],
    endorsements: [
      { name: 'SJC Drums', url: 'https://www.sjcdrums.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Remo Drumheads', url: 'https://remo.com' }
    ],
    videos: [
      { title: 'Change (In the House of Flies) - Drum Performance', youtubeId: 'DmrnCwtdxzg', year: 2020 },
      { title: 'Back to School - Reading Festival (BBC)', youtubeId: 'RQsFyUZRZiA', year: 2011 },
      { title: 'Sound Legacy Interview & Performance', youtubeId: 'VH5F_9Y1CII', year: 2019 }
    ],
    quotes: [
      { text: "Dynamics are key. Knowing when not to play is just as important as knowing when to go all out.", source: "Modern Drummer", year: 2012 },
      { text: "Deftones has always been about creating atmosphere. The drums have to serve the song.", source: "Rhythm Magazine", year: 2016 }
    ]
  },
  {
    id: 49,
    name: 'Richard Christy',
    band: 'Death / Iced Earth',
    bands: [
      { name: 'Death', period: '1996–1999', current: false },
      { name: 'Iced Earth', period: '2003–2004', current: false },
      { name: 'Charred Walls of the Damned', period: '2009–present', current: true }
    ],
    genre: 'Death Metal / Thrash Metal',
    country: 'USA',
    image: '/images/drummers/richard-christy.webp',
    bio: 'Richard Allan Christy (born 1974) is an American drummer known for his work with Death (1996-2001), Iced Earth (2003-2004), and his own band Charred Walls of the Damned. He recorded two albums with Death: "The Sound of Perseverance" and the live album "Live in L.A." His work with Chuck Schuldiner showcased his incredible technical abilities and musicality. Christy is known for his speed, precision, and ability to play complex progressive death metal patterns. Beyond drumming, he is also known for his work on The Howard Stern Show as a staff member since 2004.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Richard_Christy',
      'https://www.instagram.com/richardchristy29/',
      'https://www.discogs.com/artist/289058-Richard-Christy',
      'https://www.allmusic.com/artist/richard-christy-mn0000365476'
    ],
    gear: {
      drums: 'Tama Starclassic Maple',
      snare: 'Tama Starclassic 14x6.5" Maple',
      cymbals: 'Sabian AAX & HHX Series (14" AAX Stage Hi-Hats, 18" & 19" AAX X-Plosion Crashes, 21" HHX Raw Bell Dry Ride, 18" AAX Chinese)',
      hardware: 'Tama Iron Cobra 900 Double Pedal',
      sticks: 'Vic Firth American Classic 5A',
      heads: 'Evans',
      verified: true,
      sources: ['https://www.tama.com/usa/artists/', 'https://sabian.com/artists']
    },
    photos: [
      '/images/drummers/richard-christy.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/8/8f/Sal%2C_Leyla_%26_Richard_Christy_%284902556102%29.jpg
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { title: 'Death Drummer Discussion', youtubeId: '_UQqqJ8AHGM', year: 2022 },
      { title: 'Scavenger of Human Sorrow Drum Intro', youtubeId: 't9vOO6C3-ZU', year: 2020 },
      { title: 'Sound of Perseverance - Drum Cover', youtubeId: 'nZDB1NW5CeY', year: 2023 }
    ],
    quotes: [
      { text: "Playing with Chuck Schuldiner was the greatest musical experience of my life.", source: "Metal Maniacs", year: 2002 },
      { text: "Death metal drumming is about controlled chaos. You have to be precise within the brutality.", source: "Sick Drummer Magazine", year: 2009 }
    ]
  },
  {
    id: 50,
    name: 'Aquiles Priester',
    band: 'Angra / W.A.S.P.',
    bands: [
      { name: 'Angra', period: '2000–2012', current: false },
      { name: 'W.A.S.P.', period: '2014–2021', current: false }
    ],
    genre: 'Power Metal / Heavy Metal',
    country: 'Brazil',
    image: '/images/drummers/aquiles-priester.webp',
    bio: 'Aquiles Priester (born 1971) is a Brazilian drummer renowned for his incredible speed, precision, and showmanship. He is best known for his work with Angra (2000-2012, 2023-present), W.A.S.P. (2006-present), and his own project Hangar. Priester\'s double bass abilities, complex fills, and ability to maintain blazing speeds for extended periods have made him one of the most celebrated power metal drummers in the world. He has won numerous awards from Brazilian and international music publications and is known for his energetic live performances.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Aquiles_Priester',
      'https://www.instagram.com/aquilespriester/',
      'https://www.discogs.com/artist/452685-Aquiles-Priester',
      'https://www.allmusic.com/artist/aquiles-priester-mn0000507691'
    ],
    gear: {
      drums: 'Pearl Reference Series',
      snare: 'Pearl Reference 14x6.5" Brass',
      cymbals: 'Sabian HHX & AAX Series (14" HHX Evolution Hi-Hats, 18" & 19" HHX X-Plosion Crashes, 21" HHX Groove Ride, 18" AAX Chinese)',
      hardware: 'Pearl Demon Drive Double Pedal, Pearl Icon Rack System',
      sticks: 'Vic Firth Aquiles Priester Signature',
      heads: 'Evans',
      verified: true,
      sources: ['https://pearldrum.com/en/artists/', 'https://sabian.com/artists']
    },
    photos: [
      '/images/drummers/aquiles-priester.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/a/a0/Aquiles_Priester_Cropped_-Aquiles_Priester_El_SALVADOR.jpg
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { title: 'W.A.S.P. Tour Kit Rundown', youtubeId: '5IFAiuw28c4', year: 2024 },
      { title: 'Aquiles Priester & Thomas Lang Workshop', youtubeId: 'Gw_XYlBAGIU', year: 2025 },
      { title: 'I Wanna Be Somebody - Drum Playthrough', youtubeId: 'QePPGzx2N1s', year: 2024 }
    ],
    quotes: [
      { text: "Power metal demands power drumming. Every stroke has to hit like thunder.", source: "Modern Drummer Brazil", year: 2010 },
      { text: "Practice and dedication are the only secrets. There are no shortcuts to speed and precision.", source: "Drummerworld Interview", year: 2015 }
    ]
  },
  {
    id: 51,
    name: 'Paul Mazurkiewicz',
    band: 'Cannibal Corpse',
    bands: [
      { name: 'Cannibal Corpse', period: '1988–present', current: true }
    ],
    genre: 'Death Metal',
    country: 'USA',
    image: '/images/drummers/paul-mazurkiewicz.webp',
    imageCredit: 'Photo by Markus Felix | PushingPixels, CC BY-SA 3.0, via Wikimedia Commons (RockHard Festival 2016)',
    bio: 'Paul Mazurkiewicz (born September 8, 1968) is an American drummer and co-founder of legendary death metal band Cannibal Corpse, formed in Buffalo, New York in 1988. As one of the most consistent and dedicated drummers in extreme metal, Mazurkiewicz has performed on every Cannibal Corpse album since their 1990 debut "Eaten Back to Life." His drumming style combines relentless blast beats, complex double bass patterns, and groove-oriented sections that have helped define the death metal sound. With Cannibal Corpse being the best-selling death metal band of all time, Mazurkiewicz\'s contribution to the genre is immeasurable.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Paul_Mazurkiewicz',
      'https://www.discogs.com/artist/257779-Paul-Mazurkiewicz'
    ],
    gear: {
      drums: 'Pearl Masters Maple Complete',
      snare: 'Pearl Masters 14x6.5" Maple',
      cymbals: 'Sabian AAX Series (14" Stage Hi-Hats, 18" & 19" X-Plosion Crashes, 21" Raw Bell Dry Ride, 18" AAXtreme China)',
      hardware: 'Pearl Demon Drive Double Pedal',
      sticks: 'Vic Firth American Classic 5B',
      heads: 'Evans',
      verified: true,
      sources: ['https://en.wikipedia.org/wiki/Paul_Mazurkiewicz']
    },
    photos: [
      '/images/drummers/paul-mazurkiewicz.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/a/a2/Cannibal_Corpse_-_Wacken_Open_Air_2022-3714.jpg
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
    ],
    videos: [
      { title: 'Cannibal Corpse - Hammer Smashed Face (Drum Cam)', youtubeId: 'InGtiEXQyF0', year: 2018 }
    ]
  },
  {
    id: 52,
    name: 'Mike Mangini',
    band: 'Dream Theater',
    bands: [
      { name: 'Dream Theater', period: '2010–2023', current: false },
      { name: 'Annihilator', period: '2006–2007', current: false },
      { name: 'Extreme', period: '2004–2008', current: false }
    ],
    genre: 'Progressive Metal',
    country: 'USA',
    image: '/images/drummers/mike-mangini.webp',
    bio: 'Mike Mangini (born April 18, 1963) is an American drummer who joined Dream Theater in 2010. A former Berklee College of Music professor, Mangini holds multiple world records for drumming speed. Before Dream Theater, he played with Steve Vai, Extreme, and Annihilator. His technical approach incorporates odd time signatures, complex polyrhythms, and innovative use of hybrid acoustic/electronic setups.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Mike_Mangini',
      'https://www.discogs.com/artist/257048-Mike-Mangini'
    ],
    gear: {
      drums: 'Pearl Reference Series',
      snare: 'Pearl Reference 14x5" & 14x6.5" Brass',
      cymbals: 'Sabian HHX & AAX Series (14" HHX Evolution Hi-Hats, 17", 18", 19" HHX Evolution Crashes, 21" HHX Raw Bell Dry Ride)',
      hardware: 'Pearl Demon Drive Double Pedal, Roland SPD-SX Sampling Pad',
      sticks: 'Vic Firth Mike Mangini Signature',
      heads: 'Evans',
      verified: true,
      sources: ['https://en.wikipedia.org/wiki/Mike_Mangini', 'https://sabian.com/artist/mike-mangini/']
    },
    photos: [
      '/images/drummers/mike-mangini.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/d/d4/Mike_Mangini_2012.jpg
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
    ],
    videos: [
      { title: 'Its Noise - Live at Sweetwater Studios', youtubeId: '358Aib0DAqk', year: 2023 },
      { title: 'The Alien - Drum Cam (Live)', youtubeId: '4wr4sZZcDcc', year: 2022 },
      { title: 'Drum Solo - Luna Park (Live)', youtubeId: 'ZmTJD3sjVIU', year: 2021 }
    ]
  },
  {
    id: 53,
    name: 'Matt Garstka',
    band: 'Animals as Leaders',
    bands: [
      { name: 'Animals as Leaders', period: '2012–present', current: true }
    ],
    genre: 'Progressive Metal / Djent',
    country: 'USA',
    image: '/images/drummers/matt-garstka.webp',
    bio: 'Matt Garstka (born April 27, 1989) is an American drummer known for his virtuosic work with instrumental progressive metal band Animals as Leaders since 2012. His playing seamlessly blends jazz fusion, electronic music, and progressive metal, featuring complex polyrhythms, intricate ghost note patterns, and innovative use of dynamics.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Matt_Garstka',
      'https://www.discogs.com/artist/2765180-Matt-Garstka'
    ],
    gear: {
      drums: 'Tama Starclassic Walnut/Birch',
      snare: 'Tama S.L.P. 14x6" G-Maple',
      cymbals: 'Meinl Byzance Series (15" Dual Hi-Hats, 18" & 20" Extra Dry Medium Crashes, 22" Dual Ride)',
      hardware: 'Tama Speed Cobra 910 Double Pedal',
      sticks: 'Vic Firth Matt Garstka Signature',
      heads: 'Evans',
      verified: true,
      sources: ['https://en.wikipedia.org/wiki/Matt_Garstka', 'https://meinlcymbals.com/en/artists']
    },
    photos: [
      '/images/drummers/matt-garstka.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/7/75/Obscura_-_7_Summers_Festival_2016_-_07.jpg
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Meinl Cymbals', url: 'https://meinlcymbals.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
    ],
    videos: [
      { title: 'Animals as Leaders - Physical Education (Drum Playthrough)', youtubeId: '9P4GsF1zdzM', year: 2014 }
    ]
  },
  {
    id: 54,
    name: 'Daniel Erlandsson',
    band: 'Arch Enemy',
    bands: [
      { name: 'Arch Enemy', period: '1998–present', current: true },
      { name: 'Brujeria', period: '2000–present', current: true }
    ],
    genre: 'Melodic Death Metal',
    country: 'Sweden',
    image: '/images/drummers/daniel-erlandsson.webp',
    bio: 'Daniel Erlandsson (born May 22, 1976) is a Swedish drummer and founding member of melodic death metal band Arch Enemy, formed in 1995. His drumming combines Scandinavian death metal intensity with technical precision and musicality. He has also played with Eucharist, Carcass (live), and In Flames.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Daniel_Erlandsson',
      'https://www.discogs.com/artist/276769-Daniel-Erlandsson'
    ],
    gear: {
      drums: 'Pearl Reference Pure',
      snare: 'Pearl Daniel Erlandsson Signature 14x5.5"',
      cymbals: 'Paiste RUDE & 2002 Series (14" RUDE Hi-Hats, 18" & 19" RUDE Crashes, 22" RUDE Power Ride)',
      hardware: 'Pearl Demon Drive Double Pedal',
      sticks: 'Vic Firth American Classic 5B',
      heads: 'Evans',
      verified: true,
      sources: ['https://en.wikipedia.org/wiki/Daniel_Erlandsson']
    },
    photos: [
      '/images/drummers/daniel-erlandsson.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/5/5a/Arch_Enemy_-_Wacken_Open_Air_2016_03.jpg
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Paiste Cymbals', url: 'https://www.paiste.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
    ],
    videos: [
      { title: 'Arch Enemy - Nemesis (Drum Cam)', youtubeId: 'n9AcG0glVu4', year: 2017 }
    ]
  },
  {
    id: 55,
    name: 'Jaska Raatikainen',
    band: 'Children of Bodom',
    bands: [
      { name: 'Children of Bodom', period: '1993–2019', current: false }
    ],
    genre: 'Melodic Death Metal / Power Metal',
    country: 'Finland',
    image: '/images/drummers/jaska-raatikainen.webp',
    bio: 'Jaska Raatikainen (born July 18, 1979) was the drummer and co-founder of Finnish melodic death metal band Children of Bodom, formed in 1993. Alongside the late Alexi Laiho, Raatikainen helped create the band\'s signature sound that blended neoclassical melodies with aggressive death metal.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Jaska_Raatikainen',
      'https://www.discogs.com/artist/387099-Jaska-Raatikainen'
    ],
    gear: {
      drums: 'Pearl Masters Premium Maple',
      snare: 'Pearl Masters 14x5.5" Maple',
      cymbals: 'Zildjian A Custom & K Custom Series (14" A Custom Hi-Hats, 17" & 18" A Custom Crashes, 20" K Custom Ride)',
      hardware: 'Pearl Eliminator Double Pedal',
      sticks: 'Vic Firth American Classic 5A',
      heads: 'Remo',
      verified: true,
      sources: ['https://en.wikipedia.org/wiki/Jaska_Raatikainen']
    },
    photos: [
      '/images/drummers/jaska-raatikainen.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/1/17/Jaska_Raatikainen_2007.jpg
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
    ],
    videos: [
      { title: 'Warheart - Drum Performance', youtubeId: 'RtKZ1yMzgCQ', year: 2017 },
      { title: 'Everytime I Die - Drum Cam (Munich)', youtubeId: 'cSgr7fqHwfs', year: 2017 },
      { title: 'Lake Bodom - Tuska Festival Drum Cam', youtubeId: 'tykQPfeu9u0', year: 2014 }
    ]
  },
  {
    id: 56,
    name: 'Hannes Grossmann',
    band: 'Obscura / ex-Necrophagist / Alkaloid',
    bands: [
      { name: 'Alkaloid', period: '2013–present', current: true },
      { name: 'Obscura', period: '2008–2014', current: false },
      { name: 'Necrophagist', period: '2001–2004', current: false }
    ],
    genre: 'Technical Death Metal',
    country: 'Germany',
    image: '/images/drummers/hannes-grossmann.webp',
    bio: 'Hannes Grossmann (born September 8, 1982) is a German drummer, composer, and producer known for his work with Obscura, Necrophagist, Blotted Science, and Alkaloid. Widely regarded as one of the most technically proficient drummers in death metal, his playing combines classical music influences with extreme metal precision.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Hannes_Grossmann',
      'https://www.discogs.com/artist/1072649-Hannes-Grossmann'
    ],
    gear: {
      drums: 'DW Collectors Series',
      snare: 'DW Collectors 14x5.5" Maple',
      cymbals: 'Meinl Byzance Series (14" Byzance Traditional Hi-Hats, 18" & 19" Byzance Brilliant Crashes, 21" Byzance Traditional Ride)',
      hardware: 'DW 9000 Series Double Pedal',
      sticks: 'Vic Firth American Classic 5B',
      heads: 'Evans',
      verified: true,
      sources: ['https://en.wikipedia.org/wiki/Hannes_Grossmann']
    },
    photos: [
      '/images/drummers/hannes-grossmann.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/d/db/Obscura-Metaldays2014-09.jpg
    ],
    endorsements: [
      { name: 'DW Drums', url: 'https://www.dwdrums.com' },
      { name: 'Meinl Cymbals', url: 'https://meinlcymbals.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
    ],
    videos: [
      { title: 'Alien Utopia - Drum Playthrough', youtubeId: '-mgNxQBY7mw', year: 2023 },
      { title: 'Practice Makes Progress - Breakdown', youtubeId: '63eT5f4kxX0', year: 2022 },
      { title: 'Alter Magnitudes - Drum Playthrough', youtubeId: 'Fz6kzxOP5WU', year: 2021 }
    ]
  },
  {
    id: 57,
    name: 'Daray',
    band: 'Dimmu Borgir / Vader',
    bands: [
      { name: 'Dimmu Borgir', period: '2007–present', current: true },
      { name: 'Vader', period: '2002–2005', current: false }
    ],
    genre: 'Black Metal / Death Metal',
    country: 'Poland',
    image: '/images/drummers/daray.webp',
    bio: 'Dariusz "Daray" Brzozowski (born August 23, 1984) is a Polish drummer known for his work with Norwegian symphonic black metal band Dimmu Borgir (since 2008) and Polish death metal legends Vader (2006-2016). His drumming combines extreme speed, technical precision, and theatrical flair.',
    sameAs: [
      'https://www.discogs.com/artist/868449-Daray'
    ],
    gear: {
      drums: 'Pearl Masterworks Stadium Exotic',
      snare: 'Pearl Reference 14x5.5" Brass',
      cymbals: 'Paiste RUDE & 2002 Series (14" RUDE Hi-Hats, 17" & 18" RUDE Crashes, 22" RUDE Power Ride)',
      hardware: 'Pearl Demon XR Double Pedal',
      sticks: 'Vic Firth American Classic Extreme 5B',
      heads: 'Evans',
      verified: true,
      sources: ['https://pearldrum.com/en/artists']
    },
    photos: [
      '/images/drummers/daray.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/3/3a/Dimmu_Borgir_Nova_Rock_2019_%285%29.jpg
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Paiste Cymbals', url: 'https://www.paiste.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
    ],
    videos: [
      { title: 'Dimmu Borgir - Progenies of the Great Apocalypse (Drum Cam)', youtubeId: 'joYKnDbwUoI', year: 2018 }
    ]
  },
  {
    id: 58,
    name: 'Jocke Wallgren',
    band: 'Amon Amarth',
    bands: [
      { name: 'Amon Amarth', period: '2016–present', current: true }
    ],
    genre: 'Melodic Death Metal / Viking Metal',
    country: 'Sweden',
    image: '/images/drummers/jocke-wallgren.webp',
    bio: 'Jocke Wallgren (born April 1, 1986) is a Swedish drummer who joined melodic death metal band Amon Amarth in 2016, replacing Fredrik Andersson. His drumming brings a fresh energy to Amon Amarth\'s Viking-themed sound, combining powerful double bass patterns with groove-oriented playing.',
    sameAs: [
      'https://www.discogs.com/artist/2723584-Jocke-Wallgren'
    ],
    gear: {
      drums: 'Pearl Reference Pure',
      snare: 'Pearl Reference 14x6.5" Brass',
      cymbals: 'Zildjian A Custom & K Custom Series (14" A Custom Hi-Hats, 18" & 19" A Custom Crashes, 21" K Custom Ride)',
      hardware: 'Pearl Demon Drive Double Pedal',
      sticks: 'Vic Firth American Classic 5B',
      heads: 'Evans',
      verified: true,
      sources: ['https://pearldrum.com/en/artists']
    },
    photos: [
      '/images/drummers/jocke-wallgren.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/b/bf/Amon_Amarth_Rockharz_2019_15.jpg
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
    ],
    videos: [
      { title: 'War Of The Gods - With Full Force 2016', youtubeId: '10DYb9ni_AQ', year: 2016 },
      { title: 'Twilight of the Thunder God - Drum Performance', youtubeId: 'Pwr5RAEUrUY', year: 2017 },
      { title: 'First Kill - Live Drum Cam', youtubeId: 'gnxRJrFvOS8', year: 2018 }
    ]
  },
  {
    id: 59,
    name: 'Tim Yeung',
    band: 'Morbid Angel / Hate Eternal / Vital Remains',
    bands: [
      { name: 'Hate Eternal', period: '2004–2007, 2015–present', current: true },
      { name: 'Morbid Angel', period: '2013–2015', current: false },
      { name: 'Vital Remains', period: '2001–2007', current: false }
    ],
    genre: 'Death Metal / Technical Death Metal',
    country: 'USA',
    image: '/images/drummers/tim-yeung.webp',
    bio: 'Tim Yeung (born November 27, 1978) is an American extreme metal drummer. He has played with bands such as Hate Eternal, Morbid Angel, Vital Remains, Divine Heresy, and Nile. His incredible speed, precision, and endurance have made him one of the most sought-after drummers in death metal.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Tim_Yeung',
      'https://www.discogs.com/artist/327188-Tim-Yeung'
    ],
    gear: {
      drums: 'Tama Starclassic Bubinga',
      snare: 'Tama S.L.P. Big Black Steel 14x6.5"',
      cymbals: 'Sabian AAX & HHX Series (14" AAX Stage Hi-Hats, 18" & 19" AAX X-Plosion Crashes, 21" HHX Raw Bell Dry Ride)',
      hardware: 'Tama Speed Cobra 910 Double Pedal',
      sticks: 'Vic Firth American Classic 5A',
      heads: 'Evans',
      verified: true,
      sources: ['https://en.wikipedia.org/wiki/Tim_Yeung']
    },
    photos: [
      '/images/drummers/tim-yeung.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/4/42/Tim_Yeung.jpg
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
    ],
    videos: [
      { title: 'Rapture - Morbid Angel Drum Cam', youtubeId: '1CVjY2e8BZg', year: 2012 },
      { title: 'Vengeance is Mine - Drum Cam', youtubeId: '3qKMw2Pt6wE', year: 2013 },
      { title: 'The Lion\'s Den - Drum Cam', youtubeId: 'PUftKgBoyW4', year: 2013 }
    ]
  },
  {
    id: 60,
    name: 'Kevin Talley',
    band: 'Dying Fetus / Misery Index / Six Feet Under',
    bands: [
      { name: 'Dying Fetus', period: '1998–2002', current: false },
      { name: 'Misery Index', period: '2001–2004', current: false },
      { name: 'Six Feet Under', period: '2010–2013', current: false }
    ],
    genre: 'Brutal Death Metal / Grindcore',
    country: 'USA',
    image: '/images/drummers/kevin-talley.webp',
    bio: 'Kevin Talley (born May 21, 1979) is an American drummer renowned for his work with brutal death metal and grindcore bands including Dying Fetus, Misery Index, Six Feet Under, Chimaira, and Suffocation. His incredibly fast and precise drumming helped define the brutal death metal sound.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Kevin_Talley',
      'https://www.discogs.com/artist/382628-Kevin-Talley'
    ],
    gear: {
      drums: 'Pearl Masters Premium Legend',
      snare: 'Pearl Masters 14x5.5" Maple',
      cymbals: 'Sabian AAX Series (14" Stage Hi-Hats, 17" & 18" X-Plosion Crashes, 20" Stage Ride)',
      hardware: 'Pearl Eliminator Double Pedal',
      sticks: 'Vic Firth American Classic 5B',
      heads: 'Remo',
      verified: true,
      sources: ['https://en.wikipedia.org/wiki/Kevin_Talley']
    },
    photos: [
      '/images/drummers/kevin-talley.webp' // Original: https://upload.wikimedia.org/wikipedia/commons/1/14/Dying_Fetus_Deathfeast_2009.jpg
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
    ],
    videos: [
      { title: 'Epidemic of Hate Drum Intro - Dying Fetus', youtubeId: 'Rt4TLrHmW4k', year: 2018 },
      { title: 'Subjected to a Beating - Insane Drum Break', youtubeId: '_idv6zoZ8RU', year: 2019 },
      { title: 'Dying Fetus - Live Poland (Drum Cam)', youtubeId: 'nUBHGzfJSzM', year: 2023 }
    ]
  },
  {
    id: 61,
    name: 'Isaac Lamb',
    band: 'Kublai Khan TX',
    bands: [
      { name: 'Kublai Khan TX', period: '2009–present', current: true }
    ],
    genre: 'Metalcore / Beatdown Hardcore',
    country: 'USA',
    image: '/images/drummers/isaac-lamb.webp',
    bio: 'Isaac Lamb is an American drummer and founding member of the beatdown hardcore/metalcore band Kublai Khan TX, formed in Sherman, Texas in 2009. As the only drummer in the band\'s history, Lamb has been instrumental in developing their signature sound—characterized by crushing breakdowns, heavy grooves, and aggressive intensity that has made them one of the most respected bands in modern hardcore. His drumming style emphasizes power, groove, and devastating timing on breakdowns.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Kublai_Khan_(band)',
      'https://www.allmusic.com/artist/kublai-khan-mn0003460661'
    ],
    gear: {
      drums: 'SJC Custom Drums',
      snare: 'SJC Custom 14x6.5"',
      cymbals: 'Meinl Classics Custom Dark Series (14" Hi-Hats, 18" & 20" Crashes, 21" Ride, 18" China)',
      hardware: 'DW 9000 Series Double Pedal',
      sticks: 'Vic Firth American Classic 2B',
      heads: 'Evans Hydraulic',
      verified: false,
      sources: ['https://en.wikipedia.org/wiki/Kublai_Khan_(band)']
    },
    photos: [
      '/images/drummers/isaac-lamb.webp' // Original: /images/drummers/isaac-lamb.webp
    ],
    endorsements: [
      { name: 'SJC Custom Drums', url: 'https://www.sjcdrums.com' },
      { name: 'Meinl Cymbals', url: 'https://meinlcymbals.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
    ],
    videos: [
      { title: 'Kublai Khan TX - Drum Cam', youtubeId: 'xBFS1A0zOq4', year: 2023 }
    ]
  },
  {
    id: 62,
    name: 'Art Cruz',
    band: 'Lamb of God',
    bands: [
      { name: 'Lamb of God', period: '2019–present', current: true },
      { name: 'Winds of Plague', period: '2008–2012, 2015–2021', current: false },
      { name: 'Prong', period: '2012–2018', current: false }
    ],
    genre: 'Groove Metal / Thrash Metal',
    country: 'USA',
    image: '/images/drummers/art-cruz.webp',
    bio: 'Art Cruz (born May 27, 1988) is an American drummer who became Lamb of God\'s drummer in 2019, replacing the legendary Chris Adler. Born in Downey, California, Cruz first gained attention as the drummer for Winds of Plague and later Prong. In 2018, he filled in for Chris Adler on Lamb of God\'s North American tour supporting Slayer\'s farewell tour, and officially joined the band in 2019. His debut album with Lamb of God was their 2020 self-titled release, showcasing his powerful, precise drumming style that honors the band\'s groove metal legacy while bringing fresh energy.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Art_Cruz',
      'https://www.instagram.com/theartcruz/',
      'https://www.discogs.com/artist/1356413-Art-Cruz',
      'https://www.allmusic.com/artist/art-cruz-mn0002031619'
    ],
    gear: {
      drums: 'Ludwig Classic Maple',
      snare: 'Ludwig Black Beauty 14x6.5"',
      cymbals: 'Zildjian A Custom Series (14" Mastersound Hi-Hats, 18" A Custom EFX, 18" & 19" A Custom Medium/Projection Crashes, 20" A Custom Crash, 21" A Mega Bell Ride, 19" A Ultra Hammered Chinas, 17" K China w/EFX Holes)',
      hardware: 'Trick Pro1-V Bigfoot Double Pedal, Gibraltar Hardware',
      sticks: 'Vic Firth American Classic 5A',
      heads: 'Evans',
      verified: true,
      sources: ['https://zildjian.com/blogs/artist/art-cruz', 'https://en.wikipedia.org/wiki/Art_Cruz']
    },
    photos: [
      '/images/drummers/art-cruz.webp'
    ],
    endorsements: [
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Ludwig Drums', url: 'https://www.ludwig-drums.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' },
      { name: 'Trick Percussion', url: 'https://www.trickdrums.com' }
    ],
    videos: [
      { title: 'Laid to Rest - Lamb of God Drum Cam', youtubeId: '5T4Vz8M5gos', year: 2022 },
      { title: 'Redneck - Live Drum Cam', youtubeId: 'nLdExRaXmc0', year: 2021 },
      { title: 'Memento Mori - Official Drum Playthrough', youtubeId: 'VFOvG4qxKqk', year: 2020 }
    ]
  },
  {
    id: 63,
    name: 'Arin Ilejay',
    band: 'Avenged Sevenfold',
    bands: [
      { name: 'Avenged Sevenfold', period: '2011–2014', current: false },
      { name: 'Confide', period: '2009–2011', current: false }
    ],
    genre: 'Heavy Metal / Hard Rock',
    country: 'USA',
    image: '/images/drummers/arin-ilejay.webp',
    bio: 'Arin Ilejay is an American drummer best known for his tenure with Avenged Sevenfold from 2011 to 2014. He joined A7X following the tragic death of founding drummer Jimmy "The Rev" Sullivan, first touring with the band before becoming an official member. Ilejay recorded the highly successful "Hail to the King" album (2013), which debuted at #1 on the Billboard 200 and multiple international charts. His powerful, straightforward drumming style paid tribute to classic metal while serving the songs. He left the band in late 2014 and was replaced by Brooks Wackerman.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Avenged_Sevenfold',
      'https://www.discogs.com/artist/2392186-Arin-Ilejay',
      'https://www.allmusic.com/artist/arin-ilejay-mn0002949820'
    ],
    gear: {
      drums: 'DW Collector\'s Series Maple',
      snare: 'DW Collector\'s 14x6.5" Black Nickel over Brass',
      cymbals: 'Zildjian A Custom Series (14" Mastersound Hi-Hats, 17" & 18" Medium Crashes, 20" Medium Ride, 18" China)',
      hardware: 'DW 9000 Series Double Pedal, DW Hardware',
      sticks: 'Promark 5B',
      heads: 'Remo',
      verified: false,
      sources: ['https://en.wikipedia.org/wiki/Avenged_Sevenfold']
    },
    photos: [
      '/images/drummers/arin-ilejay.webp'
    ],
    endorsements: [
      { name: 'DW Drums', url: 'https://www.dwdrums.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Promark Sticks', url: 'https://www.daddario.com/promark' },
      { name: 'Remo Drumheads', url: 'https://remo.com' }
    ],
    videos: [
      { title: 'Hail to the King - Live Drum Cam', youtubeId: 'DelhLppPSxY', year: 2013 },
      { title: 'Shepherd of Fire - Official Drum Cam', youtubeId: 'pIzEodAdx-0', year: 2014 },
      { title: 'Nightmare - Live Performance', youtubeId: 'mfJhMfOPWdE', year: 2013 }
    ]
  },
  {
    id: 64,
    name: 'Navene Koperweis',
    band: 'Entheos',
    bands: [
      { name: 'Entheos', period: '2015–present', current: true },
      { name: 'Animals as Leaders', period: '2010–2012', current: false },
      { name: 'Animosity', period: '2005–2009', current: false },
      { name: 'The Faceless', period: '2006', current: false },
      { name: 'Fleshwrought', period: '2010–present', current: true }
    ],
    genre: 'Progressive Metal / Djent / Technical Death Metal',
    country: 'USA',
    image: '/images/drummers/navene-koperweis.webp',
    bio: 'Navene Koperweis (born May 31, 1985) is an American drummer, producer, and multi-instrumentalist known for his technical prowess and innovative approach to drumming. Starting drums at age 11, he gained prominence with Animals as Leaders, appearing on their acclaimed album "Weightless" (2011). He later formed Entheos with his then-wife Chaney Crabb, where he serves as drummer and primary songwriter. Beyond metal, Navene is also an electronic music producer under the name Navene K. His drumming combines extreme technicality with groove, incorporating elements of progressive metal, djent, and electronic music. He has also served as session drummer for Machine Head and Job for a Cowboy.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Navene_Koperweis',
      'https://www.instagram.com/navenek/',
      'https://www.discogs.com/artist/1380706-Navene-Koperweis',
      'https://www.allmusic.com/artist/navene-koperweis-mn0002521168'
    ],
    gear: {
      drums: 'Tama Starclassic Walnut/Birch',
      snare: 'Tama SLP 14x6" Black Brass',
      cymbals: 'Meinl Byzance Series (14" Dual Hi-Hats, 18" & 20" Dual Crashes, 21" Transition Ride, 18" Dual China)',
      hardware: 'Tama Iron Cobra 900 Rolling Glide Double Pedal',
      sticks: 'Vic Firth American Classic 5B',
      heads: 'Evans',
      verified: true,
      sources: ['https://en.wikipedia.org/wiki/Navene_Koperweis', 'https://meinlcymbals.com/artists']
    },
    photos: [
      '/images/drummers/navene-koperweis.webp'
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Meinl Cymbals', url: 'https://meinlcymbals.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { title: 'Entheos - Remember You Are Dust (Drum Playthrough)', youtubeId: 'MezL4WQlTyY', year: 2023 },
      { title: 'Animals as Leaders - CAFO Drum Cam', youtubeId: 'NmfzWpp0hMc', year: 2011 },
      { title: 'Entheos - Absolute Zero (Official)', youtubeId: 'vvLXnZvC_II', year: 2021 }
    ]
  },
  {
    id: 65,
    name: 'Alex Bent',
    band: 'Trivium',
    bands: [
      { name: 'Trivium', period: '2017–2025', current: false },
      { name: 'Arkaik', period: '2011–present', current: true },
      { name: 'Dragonlord', period: '2015–present', current: true },
      { name: 'Brain Drill', period: '2015', current: false },
      { name: 'Battlecross', period: '2015', current: false }
    ],
    genre: 'Heavy Metal / Thrash Metal / Technical Death Metal',
    country: 'USA',
    image: '/images/drummers/alex-bent.webp',
    bio: 'Alex Bent (born January 31, 1993) is an American drummer known for his exceptional technical ability and versatility. Born in Oakland, California, Bent began drumming at age 11 and quickly developed his skills through competitions and various musical groups. He gained recognition in the technical death metal scene with bands like Arkaik and Brain Drill before joining Trivium in 2017. His tenure with Trivium produced four acclaimed albums: "The Sin and the Sentence" (2017), "What the Dead Men Say" (2020), "In the Court of the Dragon" (2021), and "Struck Dead" (2025). His drumming combines thrash metal intensity with technical death metal precision. He parted ways with Trivium in October 2025 but continues with Arkaik and Dragonlord.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Alex_Bent',
      'https://www.instagram.com/alexbentdrums/',
      'https://www.discogs.com/artist/2895167-Alex-Bent',
      'https://www.allmusic.com/artist/alex-bent-mn0003335823'
    ],
    gear: {
      drums: 'Pearl Reference One',
      snare: 'Pearl Reference 14x6.5" Brass',
      cymbals: 'Meinl Byzance Series (14" Dark Hi-Hats, 17" & 18" Medium Thin Crashes, 21" Medium Ride, 18" Brilliant China)',
      hardware: 'Axis Longboard A Double Pedal, Pearl Hardware',
      sticks: 'Vic Firth American Classic Extreme 5A',
      heads: 'Remo',
      verified: true,
      sources: ['https://en.wikipedia.org/wiki/Alex_Bent', 'https://www.axispercussion.com/artists-a-f/']
    },
    photos: [
      '/images/drummers/alex-bent.webp'
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Meinl Cymbals', url: 'https://meinlcymbals.com' },
      { name: 'Axis Percussion', url: 'https://www.axispercussion.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Remo Drumheads', url: 'https://remo.com' }
    ],
    videos: [
      { title: 'The Sin and the Sentence - Drum Playthrough', youtubeId: 'RASkC8WC9-U', year: 2017 },
      { title: 'In the Court of the Dragon - Official Drum Cam', youtubeId: 'SpbzCYfE-lY', year: 2021 },
      { title: 'Catastrophist - Drum Playthrough', youtubeId: 'LwGp7p4E7qg', year: 2020 }
    ]
  }
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { genre, search } = req.query;
  let results = drummers;

  if (genre) {
    results = results.filter(d =>
      d.genre.toLowerCase().includes(genre.toLowerCase())
    );
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.band.toLowerCase().includes(q)
    );
  }

  res.status(200).json(results.map(({ id, name, band, genre, country, image }) => ({
    id, name, band, genre, country, image
  })));
}

// Export drummers array for use in combined API endpoints
export { drummers };
