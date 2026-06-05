// Vercel Serverless Function - Get drummer by ID

import { getQuotesForDrummer } from '../quotes-data.js';
import { getNewsForDrummer } from '../../packages/backend/src/data/news.js';

const drummers = [
  {
    id: 1,
    name: 'Lars Ulrich',
    band: 'Metallica',
    genre: 'Thrash Metal',
    country: 'Denmark',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Lars_Ulrich_by_Gage_Skidmore_%28cropped%29.jpg',
    bio: 'Lars Ulrich is a Danish musician and co-founder of Metallica, one of the most influential thrash metal bands in history. Born in 1963, he moved to Los Angeles to pursue his drumming career and formed Metallica with James Hetfield in 1981. Known for his aggressive style and iconic drum fills, Lars has been instrumental in shaping the sound of heavy metal.',
    gear: {
      drums: 'Tama Star Classic Maple',
      snare: 'Tama LU1465 Lars Ulrich Signature 14x6.5"',
      cymbals: 'Zildjian A Custom Series (14" Hi-Hats, 18" & 19" Crashes, 20" China, 22" Ride)',
      hardware: 'Tama Iron Cobra 900 Power Glide Double Pedal, Tama 1st Chair Throne',
      sticks: 'Ahead Lars Ulrich Signature Drumsticks'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/7/79/Lars_Ulrich_by_Gage_Skidmore_%28cropped%29.jpg'
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
    gearTimeline: [
      {
        era: "Early Metallica",
        years: "1981-1985",
        description: "The garage days and early thrash years. Lars played whatever he could afford.",
        albums: ["Kill 'Em All", "Ride the Lightning"],
        gear: {
          drums: "Camco Drums (various sizes)",
          snare: "Various vintage snares",
          cymbals: "Paiste 2002 Series",
          hardware: "Standard Camco hardware",
          sticks: "Various brands"
        },
        notes: "Lars started with a modest Camco kit, gradually upgrading as Metallica gained success."
      },
      {
        era: "Master of Puppets Era",
        years: "1986-1988",
        description: "Metallica's commercial breakthrough period with more refined production.",
        albums: ["Master of Puppets", "...And Justice for All"],
        gear: {
          drums: "Tama Artstar II",
          snare: "Tama 14x6.5\" Steel",
          cymbals: "Zildjian A Series",
          hardware: "Tama Titan hardware",
          sticks: "Ahead Lars Ulrich Signature (early version)"
        },
        notes: "Lars switched to Tama, beginning a partnership that would last decades."
      },
      {
        era: "Black Album / Load Era",
        years: "1991-1999",
        description: "The commercial peak of Metallica with stadium-sized production.",
        albums: ["Metallica (Black Album)", "Load", "ReLoad", "S&M"],
        gear: {
          drums: "Tama Artstar ES",
          snare: "Tama Lars Ulrich Signature 14x6.5\"",
          cymbals: "Zildjian A Custom Series",
          hardware: "Tama Iron Cobra pedals, Tama 1st Chair Throne",
          sticks: "Ahead Lars Ulrich Signature"
        },
        notes: "Bob Rock's production brought a more polished drum sound."
      },
      {
        era: "St. Anger / Death Magnetic",
        years: "2003-2016",
        description: "Experimentation and return to thrash roots.",
        albums: ["St. Anger", "Death Magnetic", "Hardwired...to Self-Destruct"],
        gear: {
          drums: "Tama Starclassic Maple",
          snare: "Tama LU1465 Lars Ulrich Signature 14x6.5\" (snare off on St. Anger)",
          cymbals: "Zildjian A Custom Series",
          hardware: "Tama Iron Cobra 900 Power Glide Double Pedal",
          sticks: "Ahead Lars Ulrich Signature"
        },
        notes: "The St. Anger snare sound (snares off) was polarizing but intentional."
      },
      {
        era: "Current Setup",
        years: "2016-Present",
        description: "Modern touring configuration with refined classic sound.",
        albums: ["Hardwired...to Self-Destruct", "72 Seasons"],
        gear: {
          drums: "Tama Starclassic Maple",
          snare: "Tama LU1465 Lars Ulrich Signature 14x6.5\"",
          cymbals: "Zildjian A Custom Series (14\" Dyno Beat Hi-Hats, 16\", 17\" & 18\" Rock Crashes, 20\" Z Custom China, 22\" Ride)",
          hardware: "Tama Iron Cobra 900 Power Glide Double Pedal, Tama 1st Chair Throne",
          sticks: "Ahead Lars Ulrich Signature Drumsticks"
        },
        notes: "Lars continues to refine his setup while maintaining the core Tama/Zildjian combination."
      }
    ]
  },
  {
    id: 2,
    name: 'Joey Jordison',
    band: 'Slipknot',
    genre: 'Nu Metal / Death Metal',
    country: 'USA',
    bands: [
      { name: 'Slipknot', period: '1995-2013', current: false },
      { name: 'Murderdolls', period: '2002-2011', current: false },
      { name: 'Sinsaenum', period: '2016-2021', current: false },
      { name: 'Vimic', period: '2016-2017', current: false }
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/JoeyJordison.jpg',
    bio: 'Joey Jordison (1975-2021) was an American musician best known as the original drummer of Slipknot. His blistering speed, technical precision, and theatrical stage presence made him one of the most influential metal drummers of his generation. He also played guitar for Murderdolls and drums for various other projects.',
    gear: {
      drums: 'Pearl Masters Premium Maple',
      snare: 'Pearl Joey Jordison Signature 13x6.5"',
      cymbals: 'Paiste RUDE Series (14" Hi-Hats, 18" & 19" Crashes, 20" Chinas, 22" Power Ride)',
      hardware: 'Pearl Demon Drive Double Pedal, Pearl D-2000 Throne',
      sticks: 'Promark Joey Jordison Signature TX515W'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/b/b4/JoeyJordison.jpg'
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
    gearTimeline: [
      {
        era: "Early Slipknot",
        years: "1995-1999",
        description: "The formation and underground years of Slipknot, raw and chaotic.",
        albums: ["Mate. Feed. Kill. Repeat."],
        gear: {
          drums: "Various budget kits",
          snare: "Pearl 14x5.5\"",
          cymbals: "Paiste RUDE Series",
          hardware: "Standard hardware",
          sticks: "Promark 5B"
        },
        notes: "Joey's early setup was basic but his technique was already blindingly fast."
      },
      {
        era: "Self-Titled Breakthrough",
        years: "1999-2001",
        description: "Slipknot explodes onto the mainstream with their debut album.",
        albums: ["Slipknot"],
        gear: {
          drums: "Pearl Masters MMX",
          snare: "Pearl 14x6.5\" Maple",
          cymbals: "Paiste RUDE & 2002 Series",
          hardware: "Pearl P-2002C Double Pedal",
          sticks: "Promark Joey Jordison Signature TX515W"
        },
        notes: "The first signature sticks deal. Joey's kit began taking shape."
      },
      {
        era: "Iowa / Vol. 3",
        years: "2001-2008",
        description: "Peak Slipknot era with maximum aggression and technicality.",
        albums: ["Iowa", "Vol. 3: (The Subliminal Verses)"],
        gear: {
          drums: "Pearl Masters Premium Maple",
          snare: "Pearl Joey Jordison Signature 13x6.5\"",
          cymbals: "Paiste RUDE & 2002 Series (14\" Wild Hi-Hats, 16\"-19\" Power Crashes, 20\" & 22\" Wild Chinas, 22\" Power Ride)",
          hardware: "Pearl Demon Drive Double Pedal, Pearl DR-501C Icon Rack",
          sticks: "Promark Joey Jordison Signature TX515W"
        },
        notes: "The signature snare arrived. Joey's setup became more elaborate."
      },
      {
        era: "All Hope Is Gone / Final Years",
        years: "2008-2013",
        description: "Slipknot's continued evolution and Joey's final recordings with the band.",
        albums: ["All Hope Is Gone"],
        gear: {
          drums: "Pearl Reference Series",
          snare: "Pearl Joey Jordison Signature 13x6.5\"",
          cymbals: "Paiste RUDE & 2002 Series",
          hardware: "Pearl Demon Drive Double Pedal, Pearl D-2000BR Throne",
          sticks: "Promark Joey Jordison Signature TX515W"
        },
        notes: "Joey switched to Pearl Reference for a more refined tone."
      },
      {
        era: "Sinsaenum / Final Projects",
        years: "2013-2021",
        description: "Post-Slipknot projects and legacy work.",
        albums: ["Sinsaenum releases"],
        gear: {
          drums: "Pearl Reference Series",
          snare: "Pearl Joey Jordison Signature 13x6.5\"",
          cymbals: "Paiste RUDE Series",
          hardware: "Pearl Demon Drive Double Pedal",
          sticks: "Promark Joey Jordison Signature TX515W"
        },
        notes: "Joey continued recording until his passing in 2021."
      }
    ]
  },
  {
    id: 3,
    name: 'Gene Hoglan',
    band: 'Death / Testament / Dethklok',
    genre: 'Death Metal / Thrash Metal',
    country: 'USA',
    bands: [
      { name: 'Dark Angel', period: '1983-1989', current: false },
      { name: 'Death', period: '1991-1995', current: false },
      { name: 'Strapping Young Lad', period: '1994-2007', current: false },
      { name: 'Testament', period: '2007-2017', current: false },
      { name: 'Dethklok', period: '2007-2014', current: false }
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Gene_Hoglan_-_Testament_%28cropped%29.jpg',
    bio: 'Gene Hoglan, nicknamed "The Atomic Clock" for his precise timing, is one of the most respected drummers in extreme metal. Born in 1967, he has played with Death, Dark Angel, Testament, Strapping Young Lad, Fear Factory, and Dethklok. His combination of speed, power, and musicality has influenced countless metal drummers.',
    gear: {
      drums: 'Tama Starclassic Walnut/Birch',
      snare: 'Tama S.L.P. 14x6.5" G-Bubinga',
      cymbals: 'Zildjian A Custom Series (15" Hi-Hats, 18" & 20" Crashes, 22" Ride, 20" China)',
      hardware: 'Tama Iron Cobra 900 Double Pedal, Tama 1st Chair Throne',
      sticks: 'Vic Firth American Classic 5B'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/6/60/Gene_Hoglan_-_Testament_%28cropped%29.jpg'
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Remo Drumheads', url: 'https://remo.com' }
    ],
    videos: [
      { title: 'The Philosopher (Death) - Official Playthrough', youtubeId: 'eGope68pHf0', year: 2016 },
      { title: 'Skeksis (Strapping Young Lad) - Official Playthrough', youtubeId: '-eaIvh6ELVg', year: 2015 },
      { title: 'True American Hate - Drum Cam (Tuska 2013)', youtubeId: 'wagKFfcbP5s', year: 2013 }
    ],
    gearTimeline: [
      {
        era: "Dark Angel",
        years: "1983-1989",
        description: "Gene's early years establishing himself as a thrash metal powerhouse.",
        albums: ["Darkness Descends", "Leave Scars"],
        gear: {
          drums: "Tama Superstar",
          snare: "Tama 14x6.5\" Steel",
          cymbals: "Zildjian A Series",
          hardware: "Tama hardware",
          sticks: "Vic Firth 5B"
        },
        notes: "Gene earned his 'Atomic Clock' nickname during this era."
      },
      {
        era: "Death Years",
        years: "1991-1995",
        description: "Defining technical death metal with Chuck Schuldiner.",
        albums: ["Individual Thought Patterns", "Symbolic"],
        gear: {
          drums: "Tama Granstar",
          snare: "Tama 14x6.5\" Brass",
          cymbals: "Zildjian A Custom Series",
          hardware: "Tama Iron Cobra Double Pedal",
          sticks: "Vic Firth 5B"
        },
        notes: "The Death albums showcased Gene's musicality beyond just speed."
      },
      {
        era: "Strapping Young Lad",
        years: "1994-2007",
        description: "Extreme industrial metal with Devin Townsend.",
        albums: ["City", "Alien", "The New Black"],
        gear: {
          drums: "Tama Starclassic Maple",
          snare: "Tama S.L.P. 14x6.5\" G-Bubinga",
          cymbals: "Sabian AA & AAX Series",
          hardware: "Tama Speed Cobra Double Pedal",
          sticks: "Vic Firth 5B"
        },
        notes: "SYL pushed Gene into more experimental territory."
      },
      {
        era: "Testament / Dethklok",
        years: "2007-2017",
        description: "Thrash metal revival and animated metal mayhem.",
        albums: ["The Formation of Damnation", "Dark Roots of Earth", "Dethalbum II", "Dethalbum III"],
        gear: {
          drums: "Pearl Reference Pure",
          snare: "Pearl Reference 14x6.5\" Brass",
          cymbals: "Sabian AAX Series",
          hardware: "Pearl Demon Drive Double Pedal",
          sticks: "Promark 5B"
        },
        notes: "Gene joined Testament and brought Dethklok to life in the studio."
      },
      {
        era: "Current Era",
        years: "2017-Present",
        description: "Continuing legacy with various projects.",
        albums: ["Titans of Creation", "various sessions"],
        gear: {
          drums: "Pearl Reference Pure",
          snare: "Pearl Reference 14x6.5\" Brass",
          cymbals: "Sabian AAX Series (15\" Hi-Hats, 18\" & 20\" Crashes, 22\" Ride, 20\" China)",
          hardware: "Pearl Demon Drive Double Pedal, Pearl D-2000 Throne",
          sticks: "Promark 5B"
        },
        notes: "Gene continues to be one of the most in-demand session drummers."
      }
    ]
  },
  {
    id: 4,
    name: 'Dave Lombardo',
    band: 'Slayer',
    genre: 'Thrash Metal',
    country: 'Cuba/USA',
    bands: [
      { name: 'Slayer', period: '1981-1992, 2001-2013', current: false },
      { name: 'Fantômas', period: '1998-present', current: true },
      { name: 'Suicidal Tendencies', period: '2016-present', current: true },
      { name: 'Dead Cross', period: '2015-present', current: true }
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Dave_Lombardo_8.5.14.jpeg',
    bio: 'Dave Lombardo, born in Cuba in 1965, is widely regarded as one of the greatest drummers in metal history. As the original drummer of Slayer, he pioneered the double bass drumming style that defined thrash metal. His work on albums like "Reign in Blood" is considered groundbreaking. He has also played with Fantomas, Suicidal Tendencies, and Dead Cross.',
    gear: {
      drums: 'Pearl Reference Series',
      snare: 'Pearl Reference 14x6.5" Brass',
      cymbals: 'Paiste RUDE & 2002 Series (14" Hi-Hats, 18" & 19" Crashes, 20" Power Ride, 18" China)',
      hardware: 'Pearl Demon Drive Double Pedal, Pearl D-2000 Throne',
      sticks: 'Vic Firth American Classic 5B'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/d/df/Dave_Lombardo_8.5.14.jpeg'
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Paiste Cymbals', url: 'https://www.paiste.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Remo Drumheads', url: 'https://remo.com' }
    ],
    videos: [
      { title: 'War Ensemble - Drum Cam (Yankee Stadium, Official)', youtubeId: '3ivOfkqFmxg', year: 2010 },
      { title: 'Angel of Death - Drum Cam', youtubeId: 'ManyDSIC8fQ', year: 2010 },
      { title: 'Full Show Drum Cam (St Louis 2003)', youtubeId: '3kBCky31sTg', year: 2003 }
    ],
    gearTimeline: [
      {
        era: "Early Slayer",
        years: "1981-1985",
        description: "The birth of thrash metal drumming in the LA scene.",
        albums: ["Show No Mercy", "Hell Awaits"],
        gear: {
          drums: "Ludwig Standard",
          snare: "Ludwig Supraphonic 14x6.5\"",
          cymbals: "Paiste 2002 Series",
          hardware: "Ludwig Speed King Single Pedal",
          sticks: "Various brands"
        },
        notes: "Dave developed his double bass technique that would change metal forever."
      },
      {
        era: "Reign in Blood",
        years: "1986-1990",
        description: "The definitive thrash metal era that changed drumming forever.",
        albums: ["Reign in Blood", "South of Heaven", "Seasons in the Abyss"],
        gear: {
          drums: "Tama Artstar II",
          snare: "Tama 14x6.5\" Brass Bell",
          cymbals: "Paiste RUDE Series",
          hardware: "Tama Camco Double Pedal",
          sticks: "Promark 5B"
        },
        notes: "Reign in Blood set the standard for all extreme metal to follow."
      },
      {
        era: "Post-Slayer / Fantômas",
        years: "1992-2001",
        description: "Exploring experimental and avant-garde metal.",
        albums: ["Fantômas", "Director's Cut"],
        gear: {
          drums: "DW Collectors Series",
          snare: "DW 14x6.5\" Brass",
          cymbals: "Paiste Signature Series",
          hardware: "DW 5000 Double Pedal",
          sticks: "Vic Firth 5B"
        },
        notes: "Working with Mike Patton expanded Dave's musical vocabulary."
      },
      {
        era: "Slayer Return / Testament",
        years: "2001-2013",
        description: "Return to Slayer and work with Testament.",
        albums: ["Christ Illusion", "World Painted Blood"],
        gear: {
          drums: "Tama Starclassic Bubinga",
          snare: "Tama S.L.P. 14x6.5\" G-Maple",
          cymbals: "Paiste RUDE & 2002 Series (15\" Sound Edge Hi-Hats, 18\" & 19\" Crashes, 22\" Reign Power Ride)",
          hardware: "Tama Iron Cobra 900 Double Pedal",
          sticks: "Promark Dave Lombardo Signature 2Bx"
        },
        notes: "Dave returned to Slayer and earned two Grammy nominations."
      },
      {
        era: "Dead Cross / Suicidal Tendencies",
        years: "2013-Present",
        description: "Punk, crossover, and continued thrash excellence.",
        albums: ["Dead Cross", "World Gone Mad (Suicidal Tendencies)"],
        gear: {
          drums: "Tama Starclassic Maple",
          snare: "Tama S.L.P. 14x6.5\" G-Maple",
          cymbals: "Paiste RUDE & 2002 Series (15\" Sound Edge Hi-Hats, 18\" & 19\" Crashes, 22\" Reign Power Ride, 18\" China)",
          hardware: "Tama Iron Cobra 900 Double Pedal, Tama 1st Chair Throne",
          sticks: "Promark Dave Lombardo Signature 2Bx"
        },
        notes: "Dave continues to push boundaries while maintaining his thrash legend status."
      }
    ]
  },
  {
    id: 5,
    name: 'Tomas Haake',
    band: 'Meshuggah',
    genre: 'Progressive Metal / Djent',
    country: 'Sweden',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meshuggah_-_Rock_am_Ring_2023-44313.jpg',
    bio: 'Tomas Haake, born in 1971, is the drummer and primary lyricist for Swedish extreme metal band Meshuggah. His polyrhythmic drumming style, characterized by complex time signatures and intricate patterns, has been hugely influential in the development of djent and progressive metal. He is known for his metronomic precision and innovative approach.',
    gear: {
      drums: 'Sonor SQ2 Heavy Beech',
      snare: 'Sonor Tomas Haake Signature 14x6.25"',
      cymbals: 'Sabian HHX Series (14" Rock Hi-Hats, 19" & 20" Stage Crashes, 22" Legacy Ride, 19" AAXtreme China)',
      hardware: 'Trick Pro 1-V Bigfoot Double Pedal, Sonor Drummer Throne',
      sticks: 'Wincent Tomas Haake Signature'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meshuggah_-_Rock_am_Ring_2023-44313.jpg'
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
        era: "Early Meshuggah",
        years: "1990-1995",
        description: "Formation and early experimental years.",
        albums: ["Contradictions Collapse", "None"],
        gear: {
          drums: "Pearl Export",
          snare: "Pearl 14x5.5\" Steel",
          cymbals: "Sabian AA Series",
          hardware: "Pearl hardware",
          sticks: "Various brands"
        },
        notes: "The early period where Meshuggah was finding their unique polyrhythmic voice."
      },
      {
        era: "Destroy Erase Improve",
        years: "1995-1998",
        description: "The breakthrough album that introduced djent to the world.",
        albums: ["Destroy Erase Improve"],
        gear: {
          drums: "Sonor Designer Series",
          snare: "Sonor 14x5.5\" Steel",
          cymbals: "Sabian AA & HH Series",
          hardware: "Sonor hardware, DW 5000 Double Pedal",
          sticks: "Vic Firth 5B"
        },
        notes: "This album introduced the polyrhythmic complexity that became Meshuggah's signature."
      },
      {
        era: "Chaosphere / Nothing",
        years: "1998-2005",
        description: "Refining the Meshuggah sound to extreme precision.",
        albums: ["Chaosphere", "Nothing", "I"],
        gear: {
          drums: "Sonor SQ2 Heavy Beech",
          snare: "Sonor 14x6\" Steel",
          cymbals: "Sabian HHX Series (14\" Rock Hi-Hats, 19\" & 20\" Stage Crashes, 22\" Ride)",
          hardware: "Sonor hardware, Trick Pro 1-V Double Pedal",
          sticks: "Wincent Tomas Haake Signature (early version)"
        },
        notes: "The signature Sonor SQ2 setup emerged. Tomas began his partnership with Sonor."
      },
      {
        era: "obZen / Bleed Era",
        years: "2008-2012",
        description: "The era that defined technical metal drumming for a generation.",
        albums: ["obZen", "Koloss"],
        gear: {
          drums: "Sonor SQ2 Heavy Beech (24\"x18\" Bass, various toms)",
          snare: "Sonor Tomas Haake Signature 14x6.5\"",
          cymbals: "Sabian HHX & AAX Series (14\" HHX Compression Hi-Hats, 19\" & 20\" HHX Stage Crashes, 22\" Legacy Ride, 19\" AAXtreme China)",
          hardware: "Tama Speed Cobra Single Pedals (x2), Porter & Davies BC2 Throne",
          sticks: "Wincent Tomas Haake Signature"
        },
        notes: "'Bleed' became a benchmark for technical drumming."
      },
      {
        era: "Current Setup",
        years: "2016-Present",
        description: "Continued evolution of the most complex drumming in metal.",
        albums: ["The Violent Sleep of Reason", "Immutable"],
        gear: {
          drums: "Sonor SQ2 Heavy Beech (24\"x18\" Bass, 10\"x8\", 12\"x9\", 13\"x10\", 16\"x14\", 18\"x16\" Toms)",
          snare: "Sonor Tomas Haake Signature 14x6.5\" & Artist Series Bronze",
          cymbals: "Sabian HHX & AAX Series (14\" HHX Compression Hi-Hats, 15\" Artisan Hi-Hats, 19\" & 20\" & 21\" HHX Stage Crashes, 22\" Legacy Ride, 19\" AAXtreme China)",
          hardware: "Tama Speed Cobra Single Pedals (x2), Porter & Davies BC2 Throne",
          sticks: "Wincent Tomas Haake Signature"
        },
        notes: "Tomas continues to push the boundaries of what's possible on drums."
      }
    ]
  },
  {
    id: 6,
    name: 'George Kollias',
    band: 'Nile',
    genre: 'Technical Death Metal',
    country: 'Greece',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/GK_10.jpg',
    bio: 'George Kollias, born in 1977, is a Greek drummer known for his extreme speed and technical proficiency. As the drummer for Nile since 2004, he has pushed the boundaries of death metal drumming with his incredible blast beats and double bass technique. He is also an educator and has released instructional materials.',
    gear: {
      drums: 'Pearl Masterworks Stadium Exotic',
      snare: 'Pearl George Kollias Signature 14x6.5"',
      cymbals: 'Zildjian A Custom Series (14" Hi-Hats, 17" & 18" Crashes, 21" Ride, 18" China)',
      hardware: 'Pearl Demon Drive Double Pedal, Pearl D-3000 Throne',
      sticks: 'Vic Firth George Kollias Signature'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/e/e8/GK_10.jpg'
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
    band: 'Sepultura / Slipknot',
    genre: 'Thrash Metal / Nu Metal',
    country: 'Brazil',
    bands: [
      { name: 'Sepultura', period: '2011-2024', current: false },
      { name: 'Slipknot', period: '2024-present', current: true }
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Sepultura_-_2023219214143_2023-08-07_Sepultura_-_Sven_-_1D_X_MK_II_-_0650_-_AK8I2527.jpg',
    bio: 'Eloy Casagrande, born in 1990, is a Brazilian drummer who became Sepultura\'s drummer in 2011 and joined Slipknot in 2024. Known for his explosive speed, technical prowess, and energetic performances, he brought new life to Sepultura\'s sound. His drumming style combines traditional metal with modern technical elements, making him one of the most exciting drummers in contemporary metal.',
    gear: {
      drums: 'Tama Starclassic Bubinga (22"x16" & 24"x14" Bass Drums, 10", 12", 13" Toms, 16" & 18" Floor Toms)',
      snare: 'Tama Bell Brass 14x5.5" (BB146)',
      cymbals: 'Paiste (15" Formula 602 Modern Essentials Hi-Hats, 20" Formula 602 ME Crash, 20" 2002 Wild Crash, 20" Masters Dark Crash, 20" 2002 Novo China, 20" 2002 Power Ride, 10" Signature Splash, 10" 2002 Mega Bell)',
      hardware: 'Tama Iron Cobra Double Pedal, Yamaha DTX Electronic Pads, Evans Drumheads',
      sticks: 'Promark (Signature in development)'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/8/86/Sepultura_-_2023219214143_2023-08-07_Sepultura_-_Sven_-_1D_X_MK_II_-_0650_-_AK8I2527.jpg'
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Paiste Cymbals', url: 'https://www.paiste.com' },
      { name: 'Promark Sticks', url: 'https://www.promark.com' },
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
    genre: 'Nu Metal',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Ray_Luzier_of_Korn.jpg',
    bio: 'Ray Luzier, born in 1970, is an American drummer who joined Korn in 2007. Before Korn, he was a sought-after session musician, working with artists like David Lee Roth and Army of Anyone. His drumming combines rock solid grooves with technical flair, bringing a fresh energy to Korn\'s signature sound while respecting their nu-metal roots.',
    gear: {
      drums: 'Pearl Reference Series',
      snare: 'Pearl Reference 14x6.5" Brass',
      cymbals: 'Sabian AAX Series (14" Stage Hi-Hats, 18" & 19" X-Plosion Crashes, 21" Stage Ride, 18" AAXtreme China)',
      hardware: 'DW 9002 Double Pedal, Pearl D-2000 Roadster Throne',
      sticks: 'Vic Firth Ray Luzier Signature'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/c/c8/Ray_Luzier_of_Korn.jpg'
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
    genre: 'Nu Metal / Rap Metal',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Drummer_John_Otto_of_Limp_Bizkit_in_2006.jpg',
    bio: 'John Otto, born in 1977, is the drummer and a founding member of Limp Bizkit. His hip-hop influenced drumming style, combining tight grooves with funk-inspired beats, was essential in defining the rap-metal sound of the late 90s and early 2000s. His ability to blend rock power with hip-hop feel made Limp Bizkit one of the biggest bands of the nu-metal era.',
    gear: {
      drums: 'Orange County Drum & Percussion (OCDP) Custom',
      snare: 'OCDP 14x7" Maple/Ash',
      cymbals: 'Zildjian K Custom Series (14" Hi-Hats, 17" & 18" Dark Crashes, 20" Ride, 18" China)',
      hardware: 'DW 9000 Series Double Pedal, DW 9100 Throne',
      sticks: 'Zildjian John Otto Signature'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/0/0a/Drummer_John_Otto_of_Limp_Bizkit_in_2006.jpg'
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
    band: 'Slipknot / Suicidal Tendencies',
    genre: 'Nu Metal / Hardcore',
    country: 'USA',
    bands: [
      { name: 'Against Me!', period: '2010', current: false },
      { name: 'Madball', period: '2011-2013', current: false },
      { name: 'Slipknot', period: '2014-2023', current: false },
      { name: 'Suicidal Tendencies', period: '2023-present', current: true }
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Suicidal_Tendencies_Rockharz_2024_18.jpg',
    bio: 'Jay Weinberg, born in 1990, is the son of E Street Band drummer Max Weinberg. He joined Slipknot in 2014, becoming their drummer after Joey Jordison\'s departure. Before Slipknot, he briefly played with Against Me! and Madball. His powerful, aggressive style honored Slipknot\'s legacy while adding his own intensity. In 2023, he joined Suicidal Tendencies.',
    gear: {
      drums: 'SJC Custom Drums',
      snare: 'SJC Jay Weinberg "The Crucible" 14x6.5" Brass',
      cymbals: 'Zildjian A Custom & K Custom Series (14" A New Beat Hi-Hats, 18" & 19" A Custom Crashes, 21" K Custom Ride, 19" K China)',
      hardware: 'DW 9000 Series Double Pedal, DW 9100 Throne',
      sticks: 'Vater Jay Weinberg 908 Signature'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/4/46/Suicidal_Tendencies_Rockharz_2024_18.jpg'
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
    genre: 'Groove Metal / Heavy Metal',
    country: 'USA',
    bands: [
      { name: 'Pantera', period: '1981-2003', current: false },
      { name: 'Damageplan', period: '2003-2004', current: false },
      { name: 'Hellyeah', period: '2006-2018', current: false }
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/55/VinniePaul2008.JPG',
    bio: 'Vinnie Paul (1964-2018) was the co-founder and drummer of Pantera, one of the most influential heavy metal bands of all time. Alongside his brother Dimebag Darrell, he helped define the groove metal sound. Pantera received four Grammy nominations for Best Metal Performance. After Pantera\'s breakup, he formed Damageplan with his brother, and later Hellyeah. His drumming style featured powerful grooves and innovative double-bass patterns that influenced countless metal drummers. Ranked among the greatest metal drummers of all time.',
    gear: {
      drums: 'ddrum Vinnie Paul Signature Series',
      snare: 'ddrum Vinnie Paul Signature 14x8"',
      cymbals: 'Sabian AA & AAX Series (14" Hi-Hats, 18" & 19" Crashes, 21" Ride, 18" China)',
      hardware: 'ddrum Double Pedal, ddrum Throne',
      sticks: 'Vic Firth American Classic 5B'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/5/55/VinniePaul2008.JPG'
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
    genre: 'Thrash Metal',
    country: 'USA',
    bands: [
      { name: 'Anthrax', period: '1983-present', current: true },
      { name: 'Stormtroopers of Death', period: '1985-1999', current: false },
      { name: 'Pantera', period: '2022-present', current: true }
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/11/2017_Anthrax_-_Charlie_Benante_-_by_2eight_-_DSC1986_%28cropped%29.jpg',
    bio: 'Charlie Benante, born in 1962 in The Bronx, New York, is a pioneer of thrash metal drumming and credited with popularizing the blast beat technique. He joined Anthrax in 1983 and has appeared on all 11 of the band\'s studio albums. Known for his extremely fast double kick technique, Benante is also a talented guitarist who contributed lead guitar to S.O.D.\'s "Speak English or Die" album. He serves as Anthrax\'s main composer and is a graphic artist who created many of their album covers and T-shirt designs. In 2022, he joined the reunited Pantera, filling in for his late friend Vinnie Paul.',
    gear: {
      drums: 'Tama Starclassic',
      snare: 'Tama Charlie Benante Signature 14x6.5"',
      cymbals: 'Paiste RUDE & 2002 Series (14" Hi-Hats, 18" & 19" Crashes, 20" Power Ride, 18" China)',
      hardware: 'Tama Speed Cobra Double Pedal, Roland Electronics',
      sticks: 'Vic Firth Charlie Benante Signature'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/1/11/2017_Anthrax_-_Charlie_Benante_-_by_2eight_-_DSC1986_%28cropped%29.jpg'
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
    genre: 'Progressive Metal',
    country: 'USA',
    bands: [
      { name: 'Dream Theater', period: '1985-2010, 2023-present', current: true },
      { name: 'Liquid Tension Experiment', period: '1997-present', current: true },
      { name: 'Transatlantic', period: '1999-present', current: true },
      { name: 'The Winery Dogs', period: '2012-present', current: true },
      { name: 'Sons of Apollo', period: '2017-present', current: true }
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Mike_Portnoy.jpg',
    bio: 'Mike Portnoy, born in 1967 in Long Beach, New York, is one of the most influential progressive metal drummers of all time. He co-founded Dream Theater in 1985 and was the band\'s drummer and lyricist for 25 years, helping define the progressive metal genre. A recipient of over 30 Drummer of the Year awards from Modern Drummer magazine, Portnoy is known for his technical proficiency, complex time signatures, and theatrical live performances. After leaving Dream Theater in 2010, he has played with numerous projects including Avenged Sevenfold, Adrenaline Mob, The Winery Dogs, Flying Colors, Sons of Apollo, and Liquid Tension Experiment. In 2023, he rejoined Dream Theater for their reunion tour. His drumming style combines jazz fusion influences with heavy metal power, featuring intricate double bass patterns and creative use of electronics.',
    gear: {
      drums: 'Tama Starclassic Maple/Birch',
      snare: 'Tama Mike Portnoy Signature Melody Master 14x5.5"',
      cymbals: 'Sabian HHX Series (14" Evolution Hi-Hats, 18" & 19" Evolution Crashes, 21" Raw Bell Dry Ride, 10" & 12" Evolution Splashes, 19" O-Zone Crash)',
      hardware: 'Tama Iron Cobra Power Glide Double Pedal, Tama 1st Chair Ergo-Rider Throne',
      sticks: 'Promark Mike Portnoy Signature TX420N'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/7/77/Mike_Portnoy.jpg'
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
    ]
  },
  {
    id: 14,
    name: 'Danny Carey',
    band: 'Tool',
    genre: 'Progressive Metal',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Danny_Carey_Hellfest_2019.jpg',
    bio: 'Danny Carey, born in 1961 in Lawrence, Kansas, is widely regarded as one of the greatest drummers in rock and metal history. As the drummer for Tool since the band\'s formation in 1990, he has developed a unique style that blends complex polyrhythmic patterns with influences from jazz, world music, and progressive rock. His technical proficiency and creative approach to rhythm have earned him numerous accolades, including being voted the best drummer by readers of Modern Drummer magazine. Carey\'s drumming incorporates unusual time signatures, intricate subdivisions, and the use of electronic percussion. Beyond Tool, he has collaborated with artists like Pigface, Zaum, and Volto! His towering presence behind his massive Sonor kit and his dedication to expanding the boundaries of rock drumming have made him an icon in the drumming community.',
    gear: {
      drums: 'Sonor SQ2 Heavy Beech',
      snare: 'Sonor Danny Carey Signature 14x8" Bronze',
      cymbals: 'Paiste Signature Series (15" Sound Edge Hi-Hats, 18" & 19" Power Crashes, 22" Dry Heavy Ride, 20" & 22" Chinas, various Rude crashes)',
      hardware: 'Sonor Giant Step Twin Effect Double Pedal, Sonor Drummer Throne, Mandala Drum electronic pads',
      sticks: 'Vic Firth Danny Carey Signature'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/c/c1/Danny_Carey_Hellfest_2019.jpg'
    ],
    endorsements: [
      { name: 'Sonor Drums', url: 'https://www.sonor.com' },
      { name: 'Paiste Cymbals', url: 'https://www.paiste.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Remo Drumheads', url: 'https://www.remo.com' },
      { name: 'Mandala Drums', url: 'https://www.mandaladrum.com' }
    ],
    videos: [
      { title: 'Tool - Pneuma (Live Drum Cam)', youtubeId: 'FssULNGSZIA', year: 2019 },
      { title: 'Tool - Forty Six & 2 (Live Drum Cam)', youtubeId: 'qJq9y9xPKWs', year: 2019 },
      { title: 'Tool - Cleveland 2002 (Drum Cam)', youtubeId: 'Lawu_5p8Kg4', year: 2002 }
    ]
  },
  {
    id: 15,
    name: 'Mario Duplantier',
    band: 'Gojira',
    genre: 'Progressive Death Metal',
    country: 'France',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/83/2017_RiP_-_Gojira_-_Mario_Duplantier_-_by_2eight_-_8SC9168.jpg',
    bio: 'Mario Duplantier, born in 1981 in Bayonne, France, is the drummer and co-founder of the critically acclaimed progressive death metal band Gojira, which he formed with his brother Joe Duplantier in 1996. Known for his powerful, precise, and incredibly intense drumming style, Mario combines crushing double bass patterns with complex rhythmic structures that complement Gojira\'s unique blend of death metal and progressive elements. His drumming on albums like "From Mars to Sirius," "The Way of All Flesh," and "Magma" has been praised for its technical excellence and raw energy. Beyond his drumming prowess, Mario is also a talented visual artist who has created artwork for Gojira\'s albums and merchandise. His approach to drumming emphasizes dynamics, groove, and an almost tribal quality that has helped define Gojira\'s distinctive sound.',
    gear: {
      drums: 'Tama Starclassic Walnut/Birch',
      snare: 'Tama S.L.P. 14x6" G-Maple',
      cymbals: 'Meinl Byzance Series (14" Dark Hi-Hats, 18" & 20" Brilliant Heavy Hammered Crashes, 21" Transition Ride, 18" Extra Dry China)',
      hardware: 'Tama Iron Cobra 900 Power Glide Double Pedal, Tama 1st Chair Ergo-Rider Throne',
      sticks: 'Vic Firth X5A'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/8/83/2017_RiP_-_Gojira_-_Mario_Duplantier_-_by_2eight_-_8SC9168.jpg'
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Meinl Cymbals', url: 'https://meinlcymbals.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { title: 'Gojira - Silvera (Live Drum Cam)', youtubeId: 'BGHlZwMYO9g', year: 2017 },
      { title: 'Gojira - Stranded (Live Drum Cam)', youtubeId: 'FNdC_3LR2AI', year: 2017 },
      { title: 'Gojira - Flying Whales (Live Drum Cam)', youtubeId: 'iqrMFNMgVS0', year: 2019 }
    ]
  },
  {
    id: 16,
    name: 'Brann Dailor',
    band: 'Mastodon',
    genre: 'Progressive/Sludge Metal',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/20150612-054-Nova_Rock_2015-Mastodon-Brann_Dailor.jpg',
    bio: 'Brann Dailor, born in 1975 in Rochester, New York, is the drummer and vocalist for progressive sludge metal band Mastodon. His drumming style is characterized by complex fills, jazz-influenced patterns, and an almost melodic approach to the drums that sets him apart from traditional metal drummers. Dailor\'s work on albums like "Leviathan," "Blood Mountain," and "Crack the Skye" has earned him widespread acclaim. He began singing lead vocals on Mastodon\'s later albums, adding another dimension to the band\'s sound. His technical proficiency combined with his musical creativity has made him one of the most influential drummers in modern metal.',
    gear: {
      drums: 'Tama Starclassic Walnut/Birch',
      snare: 'Tama S.L.P. 14x6.5" G-Maple',
      cymbals: 'Meinl Byzance Series (14" Dark Hi-Hats, 18" & 19" Brilliant Heavy Hammered Crashes, 21" Transition Ride, 18" Extra Dry China)',
      hardware: 'Tama Iron Cobra 900 Double Pedal, Tama 1st Chair Throne',
      sticks: 'Vater Brann Dailor Signature'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/6/6b/20150612-054-Nova_Rock_2015-Mastodon-Brann_Dailor.jpg'
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Meinl Cymbals', url: 'https://meinlcymbals.com' },
      { name: 'Vater Drumsticks', url: 'https://www.vater.com' },
      { name: 'Remo Drumheads', url: 'https://www.remo.com' }
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
    genre: 'Groove Metal',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Lamb_Of_God_-_Rock_am_Ring_2015-9876_%28cropped%29.jpg',
    bio: 'Chris Adler, born in 1972 in Richmond, Virginia, is best known as the co-founder and former drummer of Lamb of God. His precision double bass drumming and innovative groove patterns helped define the New Wave of American Heavy Metal. Adler\'s work on albums like "Ashes of the Wake" and "Sacrament" showcased his ability to combine technical proficiency with raw power. He briefly played with Megadeth on their 2016 album "Dystopia." His drumming style emphasizes groove, power, and precision, influencing a generation of metal drummers.',
    gear: {
      drums: 'Mapex Black Panther Design Lab',
      snare: 'Mapex Chris Adler Signature 14x5.5" Walnut/Maple',
      cymbals: 'Meinl Byzance Series (14" Dark Hi-Hats, 18" & 19" Dark Crashes, 21" Transition Ride, 18" Extra Dry China)',
      hardware: 'Mapex Falcon Double Pedal, Mapex T865 Throne',
      sticks: 'Vic Firth Chris Adler Signature'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/d/d8/Lamb_Of_God_-_Rock_am_Ring_2015-9876_%28cropped%29.jpg'
    ],
    endorsements: [
      { name: 'Mapex Drums', url: 'https://www.mapexdrums.com' },
      { name: 'Meinl Cymbals', url: 'https://meinlcymbals.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
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
    genre: 'Progressive/Djent',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/26/20151122_Eindhoven_Epic_Metal_Fest_Periphery_0116.jpg',
    bio: 'Matt Halpern, born in 1984, is the drummer for progressive metal band Periphery and one of the most influential figures in the djent movement. His drumming combines polyrhythmic complexity with electronic elements and modern production techniques. Halpern\'s ability to navigate complex time signatures while maintaining groove has made him a role model for a new generation of progressive metal drummers. He is also an accomplished drum educator, sharing his knowledge through clinics and online platforms.',
    gear: {
      drums: 'Pearl Reference Series',
      snare: 'Pearl Reference 14x6.5" Brass',
      cymbals: 'Meinl Byzance Series (15" Dark Hi-Hats, 18" & 20" Extra Dry Medium Crashes, 22" Transition Ride, 18" Extra Dry China)',
      hardware: 'Pearl Demon Drive Double Pedal, Pearl D-2000 Throne',
      sticks: 'Promark Matt Halpern Signature'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/2/26/20151122_Eindhoven_Epic_Metal_Fest_Periphery_0116.jpg'
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
    genre: 'Black/Death Metal',
    country: 'Poland',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Behemoth_Rockharz_2015_02.jpg',
    bio: 'Zbigniew Robert Promiński, known as Inferno, born in 1979, is the drummer for Polish extreme metal band Behemoth. He joined the band in 1997 and has been instrumental in shaping their signature sound. His drumming is characterized by relentless blast beats, precise double bass work, and the ability to maintain extreme speeds for extended periods. Inferno\'s technical abilities and stamina have made him one of the most respected drummers in extreme metal. His work on albums like "The Satanist" and "I Loved You at Your Darkest" showcases his evolution as a drummer.',
    gear: {
      drums: 'Pearl Reference Pure',
      snare: 'Pearl Reference 14x5" Steel',
      cymbals: 'Paiste RUDE Series (14" Hi-Hats, 18" & 19" Crashes, 22" Power Ride, 18" China)',
      hardware: 'Pearl Demon Drive Double Pedal, Pearl D-2000 Throne',
      sticks: 'Ahead 5B Aluminum'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/8/8d/Behemoth_Rockharz_2015_02.jpg'
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Paiste Cymbals', url: 'https://www.paiste.com' },
      { name: 'Ahead Drumsticks', url: 'https://www.aheaddrumsticks.com' },
      { name: 'Remo Drumheads', url: 'https://www.remo.com' }
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
    genre: 'Black Metal',
    country: 'Norway',
    bands: [
      { name: 'Mayhem', period: '1988-present', current: true },
      { name: 'Arcturus', period: '1991-2007', current: false },
      { name: 'Dimmu Borgir', period: '1999-present', current: true },
      { name: 'Shining', period: '2011-present', current: true }
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Mayhem_-_Jalometalli_2008_-_Hellhammer_01_crop.JPG',
    bio: 'Jan Axel Blomberg, known as Hellhammer, born in 1969, is a Norwegian drummer best known for his work with black metal pioneers Mayhem. He joined Mayhem in 1988 and has been a constant presence through the band\'s turbulent history. Hellhammer is credited with helping define the black metal drumming style, characterized by fast blast beats and raw, aggressive playing. Beyond Mayhem, he has played with numerous projects including Arcturus, Dimmu Borgir, and Shining. His influence on extreme metal drumming is immeasurable.',
    gear: {
      drums: 'Sonor SQ2 Heavy Beech',
      snare: 'Sonor SQ2 14x5.5" Maple',
      cymbals: 'Meinl Byzance Series (14" Dark Hi-Hats, 18" & 19" Dark Crashes, 20" Dark Ride, 18" Dark China)',
      hardware: 'Sonor Giant Step Double Pedal, Sonor Drummer Throne',
      sticks: 'Vic Firth American Classic 5B'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/5/58/Mayhem_-_Jalometalli_2008_-_Hellhammer_01_crop.JPG'
    ],
    endorsements: [
      { name: 'Sonor Drums', url: 'https://www.sonor.com' },
      { name: 'Meinl Cymbals', url: 'https://meinlcymbals.com' },
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
    genre: 'Death Metal',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Pete_Sandoval.jpg',
    bio: 'Pedro "Pete" Sandoval, born in 1960 in El Salvador, is a legendary death metal drummer best known for his work with Morbid Angel and Terrorizer. He is credited with pioneering and perfecting the gravity blast technique, which revolutionized extreme metal drumming. His work on classic Morbid Angel albums like "Altars of Madness," "Blessed Are the Sick," and "Covenant" set the standard for death metal drumming. Sandoval\'s combination of speed, precision, and endurance influenced countless drummers in the extreme metal genre.',
    gear: {
      drums: 'ddrum Dios Series',
      snare: 'ddrum Dios 14x6.5" Maple',
      cymbals: 'Sabian AAX Series (14" Stage Hi-Hats, 18" & 19" X-Plosion Crashes, 20" Stage Ride, 18" Chinese)',
      hardware: 'ddrum Mercury Double Pedal, ddrum Throne',
      sticks: 'Ahead Lars Ulrich Signature'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/1/1b/Pete_Sandoval.jpg'
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
    genre: 'Groove Metal / Thrash Metal',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Lamb_of_God_Full_Force_2019_01.jpg',
    bio: 'Art Cruz, born May 27, 1988, in Downey, California, is the current drummer of Lamb of God. He joined the band in 2019, replacing Chris Adler, after first filling in on their North American tour supporting Slayer\'s farewell tour in 2018. Cruz rose to prominence as one of the genre\'s top touring drummers, previously playing with Winds of Plague and Prong. His first studio album with Lamb of God was their 2020 self-titled release, followed by "Omens" in 2022. Known for his aggressive style, explosive dynamics, and precise double bass work, Cruz has reenergized Lamb of God\'s overall sound while honoring the band\'s legacy.',
    gear: {
      drums: 'Ludwig Drums',
      snare: 'Ludwig 14x6.5" Black Beauty',
      cymbals: 'Zildjian (14" A Custom Mastersound Hi-Hats, 18" A Custom EFX, 18" A Custom Medium Crash, 19" A Custom Projection Crash, 20" A Custom Crash, 21" A Zildjian Mega Bell Ride, 19" A Ultra Hammered Chinas, 17" K China w/ EFX Holes, 9" FX Trash Splashes, FX Blast Bell)',
      hardware: 'Trick Pro 1-V Double Pedal, Gibraltar Hardware, Ludwig Atlas Throne',
      sticks: 'Vic Firth American Classic 5B'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/a/a0/Lamb_of_God_Full_Force_2019_01.jpg'
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
    genre: 'Heavy Metal / Hard Rock',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Arin.1280.jpg',
    bio: 'Arin Ilejay, born October 17, 1988, is an American drummer best known for his tenure with Avenged Sevenfold from 2011 to 2015. He joined A7X following the tragic death of founding drummer Jimmy "The Rev" Sullivan. Ilejay recorded one studio album with the band - "Hail to the King" (2013), which debuted at number 1 on the Billboard 200 and multiple international charts. His powerful, straightforward drumming style complemented the album\'s classic heavy metal approach. Before A7X, he played with Confide, and after his departure, he has been active with various projects including his solo work and session drumming.',
    gear: {
      drums: 'Mapex Saturn Series',
      snare: 'Mapex Black Panther 14x6.5"',
      cymbals: 'Zildjian (14" A Custom Mastersound Hi-Hats, 18" & 19" A Custom Crashes, 21" A Sweet Ride, 18" A Custom China)',
      hardware: 'Mapex Falcon Double Pedal, Mapex T865 Throne',
      sticks: 'Vic Firth American Classic 5A'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/b/b9/Arin.1280.jpg'
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
    genre: 'Progressive Metal / Djent / Technical Death Metal',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Navene_Koperweis.jpg',
    bio: 'Navene Koperweis, born May 31, 1985, in San Jose, California, is a drummer, producer, and multi-instrumentalist known for his work with Entheos, Animals as Leaders, Animosity, and The Faceless. He started drumming at age eleven and has become one of the most innovative drummers in the progressive metal scene. Beyond his drumming prowess, Navene is a skilled producer and runs the technical death metal project Fleshwrought. He has also served as session drummer for Job for a Cowboy, Machine Head, and Whitechapel. His playing combines extreme technical proficiency with electronic and djent influences.',
    gear: {
      drums: 'DW Drums Performance Series',
      snare: 'DW Performance 14x6.5" Steel',
      cymbals: 'Meinl Byzance Series (15" Dual Hi-Hats, 18" & 19" Extra Dry Medium Crashes, 21" Transition Ride, 18" Extra Dry China, 10" Splash)',
      hardware: 'DW 9000 Series Double Pedal, DW Throne',
      sticks: 'Vic Firth American Classic 5B'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/4/43/Navene_Koperweis.jpg'
    ],
    endorsements: [
      { name: 'DW Drums', url: 'https://www.dwdrums.com' },
      { name: 'Meinl Cymbals', url: 'https://meinlcymbals.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { title: 'Navene Koperweis - ENTHEOS - The Interior Wilderness (Drum Playthrough)', youtubeId: 'UyLfmLXIsOA', year: 2021 },
      { title: 'Entheos - The World Without Us (Official Video)', youtubeId: '4jLtE52TNaQ', year: 2020 },
      { title: 'Entheos - Pulse Of A New Era (Official Video)', youtubeId: '3LAozbjsH9Y', year: 2021 }
    ]
  },
  {
    id: 25,
    name: 'Alex Bent',
    band: 'ex-Trivium / Arkaik / Dragonlord',
    genre: 'Heavy Metal / Thrash Metal / Technical Death Metal',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Trivium_%2836826824775%29_%28cropped%29.jpg',
    bio: 'Alex Bent, born January 31, 1993, in Oakland, California, is a versatile drummer known for his technical proficiency across multiple metal subgenres. He joined Trivium in 2017, replacing Paul Wandtke, and recorded three critically acclaimed albums with the band: "The Sin and the Sentence" (2017), "What the Dead Men Say" (2020), and "In the Court of the Dragon" (2021). Before Trivium, he played with technical death metal bands Arkaik and Brain Drill, and filled in for Gene Hoglan on Testament tours. He also drums for Eric Peterson\'s Dragonlord. Self-taught from age 11, Bent competed in Guitar Center Drum Off competitions and brings a unique blend of death metal technicality and thrash metal power to his playing.',
    gear: {
      drums: 'Pearl Reference Pure Series',
      snare: 'Pearl Reference 14x5" Brass',
      cymbals: 'Zildjian (14" K Custom Hybrid Hi-Hats, 18" & 19" K Custom Hybrid Crashes, 21" K Custom Hybrid Ride, 18" A Custom China)',
      hardware: 'Axis A Longboard Double Pedal, Pearl D-3000 Throne',
      sticks: 'Vic Firth American Classic 5B'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/5/59/Trivium_%2836826824775%29_%28cropped%29.jpg'
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Remo Drumheads', url: 'https://remo.com' },
      { name: 'Axis Percussion', url: 'https://www.axispercussion.com' }
    ],
    videos: [
      { title: 'Trivium - Like a Sword Over Damocles (Alex Bent Drum Playthrough @ The Hangar)', youtubeId: 'ErUgzub6qQQ', year: 2022 },
      { title: 'Trivium - Beyond Oblivion (Alex Bent Drum Playthrough)', youtubeId: 'nUYwI9V0wMw', year: 2017 },
      { title: 'Trivium - The Phalanx (Alex Bent Drum Playthrough @ The Hangar)', youtubeId: 'el8BntKgzYk', year: 2023 }
    ]
  },
  {
    id: 26,
    name: 'Shannon Larkin',
    band: 'Godsmack / Ugly Kid Joe / Amen',
    genre: 'Hard Rock / Heavy Metal / Nu Metal',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Godsmack_-_2019160161909_2019-06-09_Rock_am_Ring_-_0432_-_B70I1399.jpg',
    bio: 'Shannon Larkin (born April 24, 1967) is an American drummer best known as the former drummer of Godsmack, a position he held from 2002 to 2024, making him the band\'s longest-serving drummer. His powerful, groove-oriented style was essential to Godsmack\'s signature heavy sound. Before Godsmack, Larkin played with Wrathchild America, Souls at Zero, Ugly Kid Joe, and Amen. He has been playing drums since age ten and briefly filled in for Black Sabbath on one show in 1997 when Mike Bordin was unavailable. Known for his hard-hitting style and versatility, Larkin has been a Sabian cymbal artist for decades.',
    gear: {
      drums: 'ddrum Dios Series',
      snare: 'ddrum Dios 14x6.5" Maple',
      cymbals: 'Sabian AAX & HHX Series (14" AAX Stage Hi-Hats, 18" & 19" AAX X-Plosion Crashes, 21" HHX Raw Bell Dry Ride, 10" AAX Splash, 18" AAX Chinese)',
      hardware: 'DW 9000 Series Double Pedal, ddrum Throne',
      sticks: 'Vic Firth American Classic 5B'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/6/6e/Godsmack_-_2019160161909_2019-06-09_Rock_am_Ring_-_0432_-_B70I1399.jpg'
    ],
    endorsements: [
      { name: 'ddrum Drums', url: 'https://www.ddrum.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' },
      { name: 'DW Hardware', url: 'https://www.dwdrums.com' }
    ],
    videos: [
    ]
  },
  {
    id: 27,
    name: 'Raymond Herrera',
    band: 'Fear Factory / Arkaea / Brujeria',
    genre: 'Industrial Metal / Death Metal',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Fear_factory_010505_117.jpg',
    bio: 'Raymond Herrera is an American drummer best known as the founding member and former drummer of industrial metal band Fear Factory. His innovative "stop-go" double bass technique, rather than the traditional sustained blast approach, became a signature element of Fear Factory\'s mechanical, precise sound. He played on iconic albums like Soul of a New Machine (1992), Demanufacture (1995), and Obsolete (1998). Beyond drumming, Herrera has composed music for numerous video games including Tom Clancy\'s Ghost Recon Advanced Warfighter and Scarface: The World Is Yours. He also drummed for Brujeria and later formed Arkaea.',
    gear: {
      drums: 'Tama Starclassic',
      snare: 'Tama 14x6.5" Brass',
      cymbals: 'Zildjian A Custom & Z Custom Series (14" A Custom Hi-Hats, 18" & 19" A Custom Crashes, 21" Z Custom Mega Bell Ride, 18" A Custom China)',
      hardware: 'DW 5000 Series Double Pedal, Tama Power Tower Custom Rack, Tama Wide Rider Throne',
      sticks: 'Pro-Mark 5A Oak Nylon Tip'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/7/71/Fear_factory_010505_117.jpg'
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Pro-Mark Sticks', url: 'https://www.daddario.com/promark' },
      { name: 'Attack Drumheads', url: 'https://www.universalpercussion.com' }
    ],
    videos: [
    ]
  },
  {
    id: 28,
    name: 'Morgan Ågren',
    band: 'Mats/Morgan Band / Kaipa / Fredrik Thordendal\'s Special Defects',
    genre: 'Progressive Rock / Progressive Metal / Jazz Fusion',
    country: 'Sweden',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Morgan_Agren_04.jpg',
    bio: 'Morgan Ågren (born July 13, 1967) is a Swedish drummer renowned for his extraordinary technical ability and complex polyrhythmic playing. He began drumming as a child and formed the Mats/Morgan Band with keyboardist Mats Öberg in 1981, performing Frank Zappa\'s music. Ågren has collaborated with Dweezil and Ahmet Zappa, recorded the legendary Sol Niger Within album with Meshuggah\'s Fredrik Thordendal, and has been a member of progressive rock band Kaipa since 2002. He\'s also worked with Devin Townsend on Casualties of Cool and Empath. A documentary about him, "Morgan Ågren\'s Conundrum: A Percussive Misadventure," was released in 2013.',
    gear: {
      drums: 'Sonor SQ2 Designer Series',
      snare: 'Sonor Designer 14x5.5" Maple',
      cymbals: 'Paiste Signature & 2002 Series (14" Signature Heavy Hi-Hats, 18" & 20" Signature Fast Crashes, 22" Signature Dry Heavy Ride, 18" 2002 China)',
      hardware: 'Sonor Giant Step Double Pedal, Sonor Throne',
      sticks: 'Vic Firth American Classic 5A'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/1/12/Morgan_Agren_04.jpg'
    ],
    endorsements: [
      { name: 'Sonor Drums', url: 'https://www.sonor.com' },
      { name: 'Paiste Cymbals', url: 'https://www.paiste.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Remo Drumheads', url: 'https://remo.com' }
    ],
    videos: [
      { title: 'Morgan Ågren / Devin Townsend - SPRITE Play Through', youtubeId: 'GjlDDNDQbCc', year: 2020 },
      { title: 'Make Mats/Morgan Great Again (4K)', youtubeId: 'O6CkXqnimk8', year: 2019 },
      { title: 'Morgan Ågren: Drum Solo - PART I', youtubeId: 'Dl_bSxVr1K0', year: 2018 }
    ]
  },
  {
    id: 29,
    name: 'Igor Cavalera',
    band: 'Sepultura / Cavalera Conspiracy / Soulwax',
    genre: 'Thrash Metal / Groove Metal / Death Metal',
    country: 'Brazil',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/20170805_Wacken_Wacken_Open_Air_Max_%26_Iggor_Cavalera_Return_To_Roots_0093.jpg',
    bio: 'Igor Cavalera (born September 4, 1970), also known as Iggor Cavalera, is a Brazilian drummer who co-founded the legendary metal band Sepultura with his brother Max in 1984. His drumming evolved from pure thrash metal speed to incorporating tribal and world music influences, particularly on groundbreaking albums like Chaos A.D. (1993) and Roots (1996). Known as a hard-hitting drummer with impeccable timing, he left Sepultura in 2006 and reunited with Max in Cavalera Conspiracy. He has since expanded into electronic music with DJ duo Mixhell and became one of three drummers in Soulwax. His influences include Dave Lombardo, Bill Ward, and Stewart Copeland.',
    gear: {
      drums: 'Tama Starclassic Maple',
      snare: 'Tama S.L.P. 14x6.5" G-Maple',
      cymbals: 'Paiste RUDE & 2002 Series (14" RUDE Hi-Hats, 18" & 19" RUDE Crashes, 22" RUDE Power Ride, 18" 2002 China)',
      hardware: 'Tama Iron Cobra Double Pedal, Tama Throne',
      sticks: 'Vic Firth American Classic 5B'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/b/b6/20170805_Wacken_Wacken_Open_Air_Max_%26_Iggor_Cavalera_Return_To_Roots_0093.jpg'
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Paiste Cymbals', url: 'https://www.paiste.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
    ]
  },
  {
    id: 30,
    name: 'Bill Ward',
    band: 'Black Sabbath',
    genre: 'Heavy Metal / Hard Rock / Blues Rock',
    country: 'UK',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Black_Sabbath_%281970%29_%28cropped%29.jpg',
    bio: 'Bill Ward (born May 5, 1948) is an English drummer and co-founder of Black Sabbath, one of the most influential bands in heavy metal history. Alongside Ozzy Osbourne, Tony Iommi, and Geezer Butler, Ward helped create the template for heavy metal drumming. His jazz-influenced style, combining swing with power, set him apart from other rock drummers of the era. He played on all eight classic Ozzy-era Sabbath albums, including groundbreaking records like Paranoid (1970) and Master of Reality (1971). Ward\'s influences include jazz greats Gene Krupa, Buddy Rich, and John Bonham. He also sang lead on the ballad "It\'s Alright" from Technical Ecstasy.',
    gear: {
      drums: 'Ludwig Classic Maple',
      snare: 'Ludwig Supraphonic 14x6.5" LM402',
      cymbals: 'Paiste 2002 & Giant Beat Series (15" Giant Beat Hi-Hats, 18" & 20" 2002 Crashes, 24" 2002 Ride, 18" 2002 China)',
      hardware: 'Ludwig Atlas Pro Double Pedal, Ludwig Throne',
      sticks: 'Vic Firth American Classic 2B'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/7/7d/Black_Sabbath_%281970%29_%28cropped%29.jpg'
    ],
    endorsements: [
      { name: 'Ludwig Drums', url: 'https://www.ludwig-drums.com' },
      { name: 'Paiste Cymbals', url: 'https://www.paiste.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Remo Drumheads', url: 'https://remo.com' }
    ],
    videos: [
      { title: 'Black Sabbath - War Pigs (Live Paris 1970)', youtubeId: 'IDJgwUeW7_k', year: 1970 },
    ]
  },
  {
    id: 31,
    name: 'Nick Augusto',
    band: 'ex-Trivium / Corrosion',
    genre: 'Metalcore / Thrash Metal',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Nick_Augusto_2016.jpg',
    bio: 'Nick Augusto (born August 4, 1986) is an American drummer best known for his tenure with Trivium from 2009 to 2014. Originally the band\'s drum technician, he stepped up to fill in for founding drummer Travis Smith and eventually became the full-time drummer. His speedy, aggressive style was perfect for Trivium\'s thrash-influenced metalcore. Augusto recorded two studio albums with Trivium: "In Waves" (2011) and "Vengeance Falls" (2013). Before Trivium, he played in the Florida grindcore band Maruta and Metal Militia with Trivium bassist Paolo Gregoletto. After leaving Trivium in 2014, he formed Corrosion and later toured as the drummer for Light the Torch (2016-2017).',
    gear: {
      drums: 'Pearl Reference Series',
      snare: 'Pearl Reference 14x6.5" Brass',
      cymbals: 'Sabian AAX & HHX Series (14" AAX Stage Hi-Hats, 18" & 19" AAX X-Plosion Crashes, 21" HHX Raw Bell Dry Ride, 18" AAX Chinese)',
      hardware: 'Pearl Demon Drive Double Pedal, Pearl D-2000 Throne',
      sticks: 'Vic Firth American Classic 5B'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/0/06/Nick_Augusto_2016.jpg'
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
    ]
  },
  {
    id: 32,
    name: 'Matt Greiner',
    band: 'August Burns Red',
    genre: 'Metalcore / Christian Metal',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/2017_Matt_Greiner_%28cropped%29.jpg',
    bio: 'Matthew Wilson Greiner (born October 28, 1985) is a founding member and drummer of Grammy-nominated metalcore band August Burns Red. Known for his technical proficiency, complex fills, and dynamic playing style, Greiner has been a driving force behind ABR\'s sound since their formation in 2003 in his basement. He co-founded the drum company Greiner & Kilmer in 2012. An outspoken Christian, Greiner is considered one of the most influential drummers in the Christian metal and metalcore genres. August Burns Red\'s "Identity" was nominated for a Grammy for Best Metal Performance. He also plays piano and has contributed keyboards to ABR\'s recordings.',
    gear: {
      drums: 'Meinl Cymbals & Greiner Kilmer Drums',
      snare: 'Greiner Kilmer 14x6.5" Maple',
      cymbals: 'Meinl Byzance Series (15" Dark Hi-Hats, 18" & 19" Extra Dry Medium Crashes, 21" Transition Ride, 18" Extra Dry China, 10" Splash)',
      hardware: 'DW 9000 Series Double Pedal, DW Throne',
      sticks: 'Vic Firth American Classic 5B'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/1/1e/2017_Matt_Greiner_%28cropped%29.jpg'
    ],
    endorsements: [
      { name: 'Meinl Cymbals', url: 'https://meinlcymbals.com' },
      { name: 'Greiner Kilmer Drums', url: 'https://greinerkilmer.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' },
      { name: 'DW Hardware', url: 'https://www.dwdrums.com' }
    ],
    videos: [
    ]
  },
  {
    id: 33,
    name: 'Blake Richardson',
    band: 'Between the Buried and Me',
    genre: 'Progressive Metal / Technical Death Metal',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Between_the_Buried_and_Me_%C3%A0_Aarau_%2844226638080%29.jpg',
    bio: 'Cartland Blake Richardson (born June 29, 1984) is the drummer for progressive metal titans Between the Buried and Me, joining in 2005. His drumming is characterized by a fusion of death metal blast beats, jazz influences, odd time signatures, and fill-heavy style. Richardson\'s work on albums like "Colors" (2007), "The Parallax" duology, and "Automata" has earned him widespread recognition as one of the most technically accomplished drummers in progressive metal. He also drums for Glass Casket. Nominated for a Grammy Award for Best Metal Performance for "Condemned to the Gallows." His influences include Terry Bozzio, Dennis Chambers, Dave Weckl, Morgan Ågren, and Tomas Haake.',
    gear: {
      drums: 'Tama Starclassic Bubinga (Custom Finish, 2x 22"x14" Kicks, 10"x6.5", 12"x7", 14"x14", 16"x14" Toms, 20"x14" Gong Bass)',
      snare: 'Tama STARPHONIC Brass 14x6"',
      cymbals: 'Sabian (9" Radia Cup Chime, 10" HH Duo Splash, 14" HHX Evolution Hi-Hats, 17" AAX X-treme China, 18" HHX Evolution Crash, 19" AAX Holy China, 21" HH Raw Bell Dry Ride, 21" AA Holy China, 12" Chopper)',
      hardware: 'Tama Iron Cobra Power Glide Single Pedals, Tama Hardware',
      sticks: 'Vic Firth 3A'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/6/6b/Between_the_Buried_and_Me_%C3%A0_Aarau_%2844226638080%29.jpg'
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
    ]
  },
  {
    id: 34,
    name: 'Ben Koller',
    band: 'Converge / Mutoid Man / Killer Be Killed',
    genre: 'Hardcore / Metalcore / Heavy Metal',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Converge_%40_Roadburn_Festival_2018-04-19_002.jpg',
    bio: 'Ben Koller (born July 29, 1980) is an American drummer known for his work with influential hardcore band Converge since 1999, as well as Mutoid Man, Killer Be Killed, and All Pigs Must Die. His drumming on Converge\'s landmark album "Jane Doe" (2001) is considered a defining moment in hardcore and metalcore. Koller\'s style combines blistering speed, chaotic energy, and dynamic control. He has also contributed to recordings by Cave In, The Armed, and Carpenter Brut. His ability to seamlessly move between hardcore punk aggression and more melodic, groove-oriented playing has made him one of the most respected drummers in heavy music.',
    gear: {
      drums: 'Sonor SQ2',
      snare: 'Sonor SQ2 14x5.5" Brass',
      cymbals: 'Zildjian A Custom & K Series (14" K Custom Dark Hi-Hats, 18" & 19" A Custom Crashes, 21" K Custom Ride, 18" A Custom China)',
      hardware: 'DW 9000 Series Double Pedal, DW Throne',
      sticks: 'Vic Firth American Classic 5B'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/5/52/Converge_%40_Roadburn_Festival_2018-04-19_002.jpg'
    ],
    endorsements: [
      { name: 'Sonor Drums', url: 'https://www.sonor.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Remo Drumheads', url: 'https://remo.com' }
    ],
    videos: [
    ]
  },
  {
    id: 35,
    name: 'Flo Mounier',
    band: 'Cryptopsy',
    genre: 'Technical Death Metal / Brutal Death Metal',
    country: 'Canada',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Cryptopsy_Party.San_Metal_Open_Air_2017_20.jpg',
    bio: 'Flo Mounier is a Canadian drummer and the only constant member of influential technical death metal band Cryptopsy since joining in 1992 (originally known as Necrosis). His work on landmark albums like "None So Vile" (1996) and "Whisper Supremacy" (1998) set new standards for extreme metal drumming. Mounier is renowned for his incredible speed, precision, and ability to incorporate jazz and fusion elements into brutal death metal. His innovative approach to blast beats, gravity blasts, and complex polyrhythmic patterns has influenced countless extreme metal drummers. He is also an accomplished drum educator.',
    gear: {
      drums: 'Tama Starclassic Maple',
      snare: 'Tama S.L.P. 14x6.5" Bronze',
      cymbals: 'Sabian AAX & HHX Series (14" HHX Evolution Hi-Hats, 18" & 19" AAX X-Plosion Crashes, 21" HHX Raw Bell Dry Ride, 18" AAX Chinese)',
      hardware: 'Tama Speed Cobra Double Pedal, Tama 1st Chair Throne',
      sticks: 'Vic Firth American Classic 5B'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/9/9a/Cryptopsy_Party.San_Metal_Open_Air_2017_20.jpg'
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
    ]
  },
  {
    id: 36,
    name: 'Paul Mazurkiewicz',
    band: 'Cannibal Corpse',
    genre: 'Death Metal',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/20160515_Gelsenkirchen_RockHard_Festival_Cannibal_Corpse_0037_%28cropped%29.jpg',
    imageCredit: 'Photo by Markus Felix | PushingPixels, CC BY-SA 3.0, via Wikimedia Commons',
    bio: 'Paul Mazurkiewicz Jr. (born September 8, 1968) is a founding member and drummer of legendary death metal band Cannibal Corpse since 1988. Along with bassist Alex Webster, he is one of two remaining original members. Mazurkiewicz developed his craft by emulating Pete Sandoval of Morbid Angel and cites Dave Lombardo as his biggest influence. Beyond drumming, he plays guitar and is the band\'s primary lyricist, composing songs like "Frantic Disembowelment" and "Dead Human Collection." A self-taught drummer, he spray-painted his first drum kit black because it "wasn\'t metal enough." He also co-founded the 70s-style hard rock project Umbilicus and plays in crossover thrash band Heaven\'s Gate with Municipal Waste\'s Tony Foresta.',
    gear: {
      drums: 'Pearl Masters Premium',
      snare: 'Pearl Masters 14x6.5" Maple',
      cymbals: 'Zildjian A Custom Series (14" A Custom Mastersound Hi-Hats, 18" & 19" A Custom Crashes, 21" A Custom Ride, 18" A Custom China)',
      hardware: 'Pearl Demon Drive Double Pedal, Pearl D-2000 Throne',
      sticks: 'Vic Firth American Classic 5B'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/b/b9/20160515_Gelsenkirchen_RockHard_Festival_Cannibal_Corpse_0037_%28cropped%29.jpg'
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { title: 'Cannibal Corpse - Hammer Smashed Face (Live Drum Cam)', youtubeId: 'xyRhUC0Xfag', year: 2014 },
      { title: 'Paul Mazurkiewicz - Zildjian Sound Legacy', youtubeId: 'xyRhUC0Xfag', year: 2014 }
    ]
  },
  {
    id: 37,
    name: 'Dirk Verbeuren',
    band: 'Megadeth / ex-Soilwork',
    genre: 'Thrash Metal / Melodic Death Metal',
    country: 'Belgium',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Megadeth_-_Wacken_Open_Air_2023_01_%28cropped%29.jpg',
    bio: 'Dirk Verbeuren (born January 8, 1975) is a Belgian drummer who joined thrash metal legends Megadeth in 2016 after 12 years with Swedish melodic death metal band Soilwork. His precision, speed, and versatility have made him one of the most sought-after drummers in extreme metal. With Megadeth, he recorded "The Sick, the Dying... and the Dead!" (2022). Verbeuren has worked with numerous bands including Scarve, Bent Sea, Aborted, and The Project Hate MCMXCIX. He cites Dave Lombardo and Gene Hoglan among his major influences. He is also a prolific session musician and has created MIDI drum packs for Toontrack. Verbeuren is vegan.',
    gear: {
      drums: 'Tama Starclassic Walnut/Birch',
      snare: 'Tama S.L.P. 14x6.5" G-Maple',
      cymbals: 'Meinl Byzance Series (15" Byzance Dark Hi-Hats, 18" & 19" Byzance Brilliant Heavy Hammered Crashes, 21" Byzance Transition Ride, 18" Byzance Extra Dry China)',
      hardware: 'Tama Speed Cobra Double Pedal, Tama 1st Chair Throne',
      sticks: 'Tama Dirk Verbeuren Signature'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/0/09/Megadeth_-_Wacken_Open_Air_2023_01_%28cropped%29.jpg'
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Meinl Cymbals', url: 'https://meinlcymbals.com' },
      { name: 'Tama Drumsticks', url: 'https://www.tama.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' },
      { name: 'Toontrack', url: 'https://www.toontrack.com' }
    ],
    videos: [
    ]
  },
  {
    id: 38,
    name: 'Abe Cunningham',
    band: 'Deftones',
    genre: 'Alternative Metal / Nu Metal / Post-Metal',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Deftones_-_Rock_am_Ring_2016_-2016156214257_2016-06-04_Rock_am_Ring_-_Sven_-_1D_X_-_0105_-_DV3P9764_mod.jpg',
    bio: 'Abraham Benjamin Cunningham (born July 27, 1973) is the drummer for alternative metal pioneers Deftones since 1988. Known for his frantic, pounding rhythms and clever usage of tempo, Cunningham notably refuses to indulge in the double bass drum setup common in metal, creating his signature sound through single kick creativity. A BBC reviewer praised his style for displaying "the assured expressiveness of a musician whose abilities stretch further than most metal-scene sticksmen." His influences include Stewart Copeland, Ginger Baker, and Mitch Mitchell. Cunningham has been a long-time endorser of Tama Drums and Zildjian Cymbals, and revealed his Vater "Cool Breeze" signature sticks at NAMM 2017.',
    gear: {
      drums: 'Tama Starclassic Maple',
      snare: 'Tama S.L.P. 14x6" G-Maple',
      cymbals: 'Zildjian (14" K Custom Dark Hi-Hats, 18" & 19" K Custom Dark Crashes, 21" K Custom Ride, 18" A Custom China)',
      hardware: 'Tama Iron Cobra Single Pedal, Tama 1st Chair Throne',
      sticks: 'Vater Abe Cunningham "Cool Breeze" Signature'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/1/1a/Deftones_-_Rock_am_Ring_2016_-2016156214257_2016-06-04_Rock_am_Ring_-_Sven_-_1D_X_-_0105_-_DV3P9764_mod.jpg'
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Vater Drumsticks', url: 'https://www.vater.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { title: 'Deftones - My Own Summer (Shove It) (Live Drum Cam)', youtubeId: 'KvknOXGPzCQ', year: 2017 },
      { title: 'Deftones - Change (In the House of Flies) (Live)', youtubeId: 'WPpDyIJdasg', year: 2018 },
    ]
  },
  {
    id: 39,
    name: 'Jean-Paul Gaster',
    band: 'Clutch / The Bakerton Group',
    genre: 'Hard Rock / Stoner Rock / Blues Rock',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/97/2015_RiP_Clutch_Jean_Paul_Gaster_by_2eight_-_3SC4893.jpg',
    bio: 'Jean-Paul Gaster (born June 19, 1971) is the drummer for hard rock/stoner rock band Clutch since their formation in 1991. His drumming combines influences from 1960s-70s heavy rock (Jimi Hendrix, Cream, Black Sabbath), Washington D.C.\'s Go-go music scene, and jazz drummers like Elvin Jones and Jack DeJohnette. He studied with legendary D.C. drummer and educator Walter Salb. Gaster\'s signature setup has remained largely unchanged since Clutch\'s early days: 14x26 bass drum, 9x13 tom, 16x16 floor tom, and 5.5x14 chrome over brass snare. He notably refuses to use china cymbals, finding them "awful and obnoxious sounding." He has collaborated with Wino, Five Horse Johnson, Mike Westcott, and Mark Morton.',
    gear: {
      drums: 'Ludwig / Gretsch / Slingerland (various vintage and modern)',
      snare: 'Ludwig 5.5x14" Chrome Over Brass (various vintage snares)',
      cymbals: 'Meinl Byzance Series (23" & 24" Medium/Heavy Rides, 20" & 22" Sand Rides, 22" Spectrum Ride, 14" & 15" Vintage Pure Hi-Hats)',
      hardware: 'Ludwig Hardware, Vintage Bass Drum Pedal',
      sticks: 'Vic Firth American Classic 5A'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/9/97/2015_RiP_Clutch_Jean_Paul_Gaster_by_2eight_-_3SC4893.jpg'
    ],
    endorsements: [
      { name: 'Meinl Cymbals', url: 'https://meinlcymbals.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
    ],
    videos: [
      { title: 'Clutch - Electric Worry (Live Drum Cam)', youtubeId: 's4ABpbxIPFI', year: 2018 },
    ]
  },
  {
    id: 40,
    name: 'Chris Turner',
    band: 'Oceans Ate Alaska',
    genre: 'Progressive Metalcore / Djent',
    country: 'UK',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Oceans_Ate_Alaska_-_2018154174826_2018-06-03_Rock_am_Ring_-_1D_X_MK_II_-_0668_-_AK8I0364.jpg',
    bio: 'Chris Turner is a British drummer known for his mind-bending work with progressive metalcore band Oceans Ate Alaska. His drumming showcases extreme technical proficiency, featuring complex polyrhythms, intricate fills, and lightning-fast blast beats combined with djent-influenced grooves. Turner\'s playthrough videos have amassed millions of views on YouTube, earning him recognition as one of the most technically skilled drummers in modern metal. His ability to execute incredibly complex patterns with precision while maintaining musicality has made him a major influence on the younger generation of metal drummers. He is known for his innovative use of odd time signatures and his seamless blending of progressive metal and deathcore elements.',
    gear: {
      drums: 'Tama Starclassic Walnut/Birch',
      snare: 'Tama S.L.P. 14x6.5" G-Maple',
      cymbals: 'Meinl Byzance Series (15" Byzance Dark Hi-Hats, 18" & 19" Byzance Brilliant Medium Crashes, 21" Byzance Transition Ride, 18" Byzance Extra Dry China, 10" Byzance Splash)',
      hardware: 'Tama Speed Cobra Double Pedal, Tama 1st Chair Throne',
      sticks: 'Vic Firth American Classic 5B'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/3/30/Oceans_Ate_Alaska_-_2018154174826_2018-06-03_Rock_am_Ring_-_1D_X_MK_II_-_0668_-_AK8I0364.jpg'
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Meinl Cymbals', url: 'https://meinlcymbals.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
    ]
  },
  {
    id: 41,
    name: 'Nicko McBrain',
    band: 'Iron Maiden',
    genre: 'Heavy Metal / NWOBHM',
    country: 'UK',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Nicko_McBrain_2.jpg',
    bio: 'Nicko McBrain (born Michael Henry McBrain in 1952) is an English drummer best known as the longtime drummer of Iron Maiden since 1982. With his distinctive galloping style, intricate hi-hat work, and powerful single bass drum technique, Nicko has been instrumental in defining Iron Maiden\'s signature sound. Before joining Maiden, he played with Trust and Pat Travers Band. His drumming on classic albums like "Powerslave," "Somewhere in Time," and "Seventh Son of a Seventh Son" showcases his ability to combine speed, precision, and musicality. Notable for refusing to use a double bass pedal, Nicko achieves remarkable speed with a single pedal technique.',
    gear: {
      drums: 'Sonor SQ2 Series',
      snare: 'Sonor Nicko McBrain Signature 14x6.5"',
      cymbals: 'Paiste 2002 & Signature Series (14" Sound Edge Hi-Hats, 16" & 18" Power Crashes, 22" Power Ride, 20" China)',
      hardware: 'Sonor 600 Series Hardware, Single Bass Drum Pedal',
      sticks: 'Vic Firth Nicko McBrain Signature'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/a/a9/Nicko_McBrain_2.jpg'
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
    ]
  },
  {
    id: 42,
    name: 'Scott Travis',
    band: 'Judas Priest',
    genre: 'Heavy Metal / Thrash Metal',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Scott_Travis2005.jpg',
    bio: 'Scott Travis (born 1961) is an American drummer who has been the drummer for Judas Priest since 1989. Known for bringing a double bass-driven, thrash-influenced style to the band, Travis revitalized Priest\'s sound starting with the landmark album "Painkiller." His technical precision, powerful double bass work, and ability to play complex patterns at high speeds have made him one of the most respected drummers in heavy metal. Before joining Priest, he played with Racer X alongside Paul Gilbert. Travis has also played with Dio\'s touring band and various other metal projects.',
    gear: {
      drums: 'ddrum Dominion Series',
      snare: 'ddrum Scott Travis Signature 14x6.5"',
      cymbals: 'Paiste RUDE & 2002 Series (14" RUDE Hi-Hats, 18" & 19" RUDE Crashes, 22" RUDE Power Ride, 18" RUDE China)',
      hardware: 'DW 9000 Series Double Pedal, Gibraltar Rack System',
      sticks: 'Vic Firth American Classic 5B'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/3/32/Scott_Travis2005.jpg'
    ],
    endorsements: [
      { name: 'ddrum Drums', url: 'https://www.ddrum.com' },
      { name: 'Paiste Cymbals', url: 'https://www.paiste.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Remo Drumheads', url: 'https://remo.com' }
    ],
    videos: [
      { title: 'Painkiller - Live (2015 Drum Cam)', youtubeId: 'WS6-vI70oc0', year: 2015 },
    ]
  },
  {
    id: 43,
    name: 'Mikkey Dee',
    band: 'Scorpions / Motörhead',
    genre: 'Heavy Metal / Hard Rock',
    country: 'Sweden',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Mikkey_Dee_%28PK%29_%E2%80%93_Wacken_Open_Air_2015_02.jpg',
    bio: 'Mikkey Dee (born Micael Kiriakos Delaoglou in 1963) is a Swedish drummer best known for his work with Motörhead (1992-2015) and currently with Scorpions (since 2016). Before Motörhead, he played with King Diamond and Don Dokken. His powerful, hard-hitting style and incredible stamina made him the perfect drummer for Lemmy Kilmister\'s relentless rock \'n\' roll machine. After Lemmy\'s death, Mikkey joined Scorpions, bringing his thunderous drumming to classic rock anthems. Known for his aggressive approach and incredible live performances, Mikkey is one of the most respected drummers in hard rock and metal.',
    gear: {
      drums: 'Yamaha Recording Custom',
      snare: 'Yamaha Mikkey Dee Signature 14x8"',
      cymbals: 'Zildjian A Custom & K Series (14" A Custom Hi-Hats, 18" & 19" A Custom Crashes, 22" K Custom Ride, 20" Oriental China)',
      hardware: 'Yamaha FP9 Double Pedal, Yamaha Hardware',
      sticks: 'Vic Firth Mikkey Dee Signature'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/b/bb/Mikkey_Dee_%28PK%29_%E2%80%93_Wacken_Open_Air_2015_02.jpg'
    ],
    endorsements: [
      { name: 'Yamaha Drums', url: 'https://www.yamaha.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Remo Drumheads', url: 'https://remo.com' }
    ],
    videos: [
      { title: 'Ace of Spades - Drum Cam (Wacken 2011)', youtubeId: 'pWB5JZRGl0U', year: 2011 },
      { title: 'Scorpions - Rock You Like a Hurricane (Drum Cam)', youtubeId: 'sxdmw4tJJ1Y', year: 2019 }
    ]
  },
  {
    id: 44,
    name: 'Derek Roddy',
    band: 'Hate Eternal / Nile',
    genre: 'Death Metal / Technical Death Metal',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Derek_Roddy_2003_%28cropped%29.jpg',
    bio: 'Derek Roddy (born 1972) is an American drummer renowned for his extreme speed, technical proficiency, and endurance. He is considered one of the pioneers of modern extreme metal drumming. Roddy has performed with Hate Eternal, Nile, Aurora Borealis, Council of the Fallen, and Serpents Rise. His blast beats, one-footed bass drum techniques, and overall precision have influenced countless metal drummers. Beyond performing, Derek is a respected educator, having written instructional books and produced educational DVDs on extreme metal drumming techniques.',
    gear: {
      drums: 'Tama Starclassic Bubinga',
      snare: 'Tama SLP Black Brass 14x6.5"',
      cymbals: 'Meinl Byzance & Mb20 Series (14" Byzance Heavy Hi-Hats, 18" & 19" Mb20 Heavy Crashes, 21" Mb20 Heavy Ride, 18" Byzance China)',
      hardware: 'Tama Speed Cobra 910 Double Pedal',
      sticks: 'Vic Firth Derek Roddy Signature'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/d/d7/Derek_Roddy_2003_%28cropped%29.jpg'
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Meinl Cymbals', url: 'https://meinlcymbals.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
    ]
  },
  {
    id: 45,
    name: 'Dirk Verbeuren',
    band: 'Megadeth',
    genre: 'Thrash Metal / Melodic Death Metal',
    country: 'Belgium',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Megadeth_-_Wacken_Open_Air_2023_01_%28cropped%29.jpg',
    bio: 'Dirk Verbeuren (born 1975) is a Belgian drummer who has been the drummer for Megadeth since 2016. Before joining Megadeth, he was best known for his work with Swedish melodic death metal band Soilwork from 1998 to 2016. His precise, powerful playing combines European metal sensibilities with American thrash aggression. Verbeuren\'s technical abilities, double bass precision, and dynamic range have been praised by critics and fans alike. He has also performed with Devin Townsend, Scarve, and various other metal projects.',
    gear: {
      drums: 'Tama Starclassic Walnut/Birch',
      snare: 'Tama S.L.P. Big Black Steel 14x6.5"',
      cymbals: 'Zildjian A Custom & K Custom Series (14" A Custom Hi-Hats, 17", 18", 19" A Custom Crashes, 21" K Custom Hybrid Ride, 18" K China)',
      hardware: 'Tama Speed Cobra 910 Double Pedal, Tama Iron Cobra Hi-Hat Stand',
      sticks: 'Promark Shira Kashi Oak 5B'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/e/e0/Megadeth_-_Wacken_Open_Air_2023_01_%28cropped%29.jpg'
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Promark Sticks', url: 'https://www.daddario.com/promark' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { title: 'Megadeth - Symphony of Destruction (Drum Cam 2017)', youtubeId: 'vfpgpf6QVnI', year: 2017 },
    ]
  },
  {
    id: 46,
    name: 'Frost',
    band: 'Satyricon / 1349',
    genre: 'Black Metal',
    country: 'Norway',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Satyricon%2C_Tons_of_Rock%2C_Oslo_Norway_%2853845732674%29_%28cropped%29.jpg',
    bio: 'Kjetil-Vidar Haraldstad (born 1973), known professionally as Frost, is a Norwegian drummer and a central figure in the Scandinavian black metal scene. He is the drummer for Satyricon since 1993 and 1349 since 2001. Known for his incredible speed, precision, and stamina, Frost is considered one of the greatest extreme metal drummers. His blast beats and hyperspeed drumming have set the standard for black metal percussion. Despite the raw nature of black metal, Frost brings a high level of technicality and discipline to his performances.',
    gear: {
      drums: 'Sonor SQ2 Series',
      snare: 'Sonor SQ2 14x6" Maple',
      cymbals: 'Zildjian A Custom & K Series (14" A Custom Hi-Hats, 16", 17", 18" A Custom Crashes, 22" K Custom Dark Ride, 18" K China)',
      hardware: 'Sonor Perfect Balance Pedal, Sonor Hardware',
      sticks: 'Vic Firth American Classic Extreme 5B'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/4/4c/Satyricon%2C_Tons_of_Rock%2C_Oslo_Norway_%2853845732674%29_%28cropped%29.jpg'
    ],
    endorsements: [
      { name: 'Sonor Drums', url: 'https://www.sonor.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Remo Drumheads', url: 'https://remo.com' }
    ],
    videos: [
    ]
  },
  {
    id: 47,
    name: 'Gavin Harrison',
    band: 'Porcupine Tree / King Crimson',
    genre: 'Progressive Metal / Progressive Rock',
    country: 'UK',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Gavin_Harrison_Drum_Clinic_2011.jpg',
    bio: 'Gavin Harrison (born 1963) is an English drummer widely regarded as one of the finest drummers in progressive music. He is best known for his work with Porcupine Tree (2002-2010, 2021-present), King Crimson (2008-present), and The Pineapple Thief (2016-present). His intricate, polyrhythmic approach, ghost note mastery, and ability to play complex odd-time signatures with musicality have earned him numerous awards and accolades. Harrison has won multiple awards from Modern Drummer magazine and is considered a major influence on progressive rock and metal drummers worldwide.',
    gear: {
      drums: 'Sonor SQ2 Series',
      snare: 'Sonor Gavin Harrison Signature 12x5" & 14x5.25"',
      cymbals: 'Zildjian K Custom Special Dry Series (14" Hi-Hats, 16" & 18" Crashes, 21" Special Dry Ride, 18" Trash China)',
      hardware: 'Sonor Perfect Balance Pedal, Sonor 600 Series Hardware',
      sticks: 'Vic Firth Gavin Harrison Signature'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/4/49/Gavin_Harrison_Drum_Clinic_2011.jpg'
    ],
    endorsements: [
      { name: 'Sonor Drums', url: 'https://www.sonor.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Remo Drumheads', url: 'https://remo.com' }
    ],
    videos: [
      { title: 'Porcupine Tree - Anesthetize (Live)', youtubeId: 'MSEQZ8reJA4', year: 2010 },
    ]
  },
  {
    id: 48,
    name: 'Abe Cunningham',
    band: 'Deftones',
    genre: 'Alternative Metal / Nu Metal',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Deftones_-_Rock_am_Ring_2016_-2016156214257_2016-06-04_Rock_am_Ring_-_Sven_-_1D_X_-_0105_-_DV3P9764_mod.jpg',
    bio: 'Abraham Joseph Cunningham (born 1973) is an American drummer and founding member of Deftones. His innovative style combines powerful, hard-hitting grooves with atmospheric, nuanced playing that perfectly complements Deftones\' unique blend of heavy and ambient music. Since the band\'s formation in 1988, Abe has been the rhythmic backbone behind albums like "White Pony," "Diamond Eyes," and "Koi No Yokan." His ability to shift between crushing heaviness and delicate dynamics has made him one of the most respected drummers in alternative metal.',
    gear: {
      drums: 'SJC Custom Drums',
      snare: 'SJC Custom 14x6.5" Brass',
      cymbals: 'Zildjian K Custom & A Custom Series (14" K Custom Hi-Hats, 18" & 20" K Custom Crashes, 22" K Custom Ride, 19" A Custom China)',
      hardware: 'DW 9000 Series Double Pedal, DW Hardware',
      sticks: 'Vic Firth American Classic 2B'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/f/fe/Deftones_-_Rock_am_Ring_2016_-2016156214257_2016-06-04_Rock_am_Ring_-_Sven_-_1D_X_-_0105_-_DV3P9764_mod.jpg'
    ],
    endorsements: [
      { name: 'SJC Drums', url: 'https://www.sjcdrums.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Remo Drumheads', url: 'https://remo.com' }
    ],
    videos: [
      { title: 'My Own Summer - Drum Cam (Live 2017)', youtubeId: 'XOzs1FehYOA', year: 2017 },
    ]
  },
  {
    id: 49,
    name: 'Richard Christy',
    band: 'Death / Iced Earth',
    genre: 'Death Metal / Thrash Metal',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Sal%2C_Leyla_%26_Richard_Christy_%284902556102%29.jpg',
    bio: 'Richard Allan Christy (born 1974) is an American drummer known for his work with Death (1996-2001), Iced Earth (2003-2004), and his own band Charred Walls of the Damned. He recorded two albums with Death: "The Sound of Perseverance" and the live album "Live in L.A." His work with Chuck Schuldiner showcased his incredible technical abilities and musicality. Christy is known for his speed, precision, and ability to play complex progressive death metal patterns. Beyond drumming, he is also known for his work on The Howard Stern Show as a staff member since 2004.',
    gear: {
      drums: 'Tama Starclassic Maple',
      snare: 'Tama Starclassic 14x6.5" Maple',
      cymbals: 'Sabian AAX & HHX Series (14" AAX Stage Hi-Hats, 18" & 19" AAX X-Plosion Crashes, 21" HHX Raw Bell Dry Ride, 18" AAX Chinese)',
      hardware: 'Tama Iron Cobra 900 Double Pedal',
      sticks: 'Vic Firth American Classic 5A'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/8/8f/Sal%2C_Leyla_%26_Richard_Christy_%284902556102%29.jpg'
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { title: 'Death - The Flesh and the Power It Holds (Drum Playthrough)', youtubeId: 'xk3BvNLeNgw', year: 2015 },
    ]
  },
  {
    id: 50,
    name: 'Aquiles Priester',
    band: 'Angra / W.A.S.P.',
    genre: 'Power Metal / Heavy Metal',
    country: 'Brazil',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Aquiles_Priester_Cropped_-Aquiles_Priester_El_SALVADOR.jpg',
    bio: 'Aquiles Priester (born 1971) is a Brazilian drummer renowned for his incredible speed, precision, and showmanship. He is best known for his work with Angra (2000-2012, 2023-present), W.A.S.P. (2006-present), and his own project Hangar. Priester\'s double bass abilities, complex fills, and ability to maintain blazing speeds for extended periods have made him one of the most celebrated power metal drummers in the world. He has won numerous awards from Brazilian and international music publications and is known for his energetic live performances.',
    gear: {
      drums: 'Pearl Reference Series',
      snare: 'Pearl Reference 14x6.5" Brass',
      cymbals: 'Sabian HHX & AAX Series (14" HHX Evolution Hi-Hats, 18" & 19" HHX X-Plosion Crashes, 21" HHX Groove Ride, 18" AAX Chinese)',
      hardware: 'Pearl Demon Drive Double Pedal, Pearl Icon Rack System',
      sticks: 'Vic Firth Aquiles Priester Signature'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/a/a0/Aquiles_Priester_Cropped_-Aquiles_Priester_El_SALVADOR.jpg'
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
    ]
  },
  {
    id: 51,
    name: 'Paul Mazurkiewicz',
    band: 'Cannibal Corpse',
    genre: 'Death Metal',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/20160515_Gelsenkirchen_RockHard_Festival_Cannibal_Corpse_0037_%28cropped%29.jpg',
    bio: 'Paul Mazurkiewicz (born September 8, 1968) is an American drummer and co-founder of legendary death metal band Cannibal Corpse, formed in Buffalo, New York in 1988. As one of the most consistent and dedicated drummers in extreme metal, Mazurkiewicz has performed on every Cannibal Corpse album since their 1990 debut "Eaten Back to Life." His drumming style combines relentless blast beats, complex double bass patterns, and groove-oriented sections that have helped define the death metal sound. With Cannibal Corpse being the best-selling death metal band of all time, Mazurkiewicz\'s contribution to the genre is immeasurable.',
    gear: {
      drums: 'Pearl Masters Maple Complete',
      snare: 'Pearl Masters 14x6.5" Maple',
      cymbals: 'Sabian AAX Series (14" Stage Hi-Hats, 18" & 19" X-Plosion Crashes, 21" Raw Bell Dry Ride, 18" AAXtreme China)',
      hardware: 'Pearl Demon Drive Double Pedal',
      sticks: 'Vic Firth American Classic 5B'
    },
    photos: [],
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
    genre: 'Progressive Metal',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Mike_Mangini_at_Moscow_12_Jul_2011_%28cropped%29.jpg',
    bio: 'Mike Mangini (born April 18, 1963) is an American drummer who joined Dream Theater in 2010. A former Berklee College of Music professor, Mangini holds multiple world records for drumming speed. Before Dream Theater, he played with Steve Vai, Extreme, and Annihilator. His technical approach incorporates odd time signatures, complex polyrhythms, and innovative use of hybrid acoustic/electronic setups.',
    gear: {
      drums: 'Pearl Reference Series',
      snare: 'Pearl Reference 14x5" & 14x6.5" Brass',
      cymbals: 'Sabian HHX & AAX Series (14" HHX Evolution Hi-Hats, 17", 18", 19" HHX Evolution Crashes, 21" HHX Raw Bell Dry Ride)',
      hardware: 'Pearl Demon Drive Double Pedal, Roland SPD-SX Sampling Pad',
      sticks: 'Vic Firth Mike Mangini Signature'
    },
    photos: [],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
    ],
    videos: [
    ]
  },
  {
    id: 53,
    name: 'Matt Garstka',
    band: 'Animals as Leaders',
    genre: 'Progressive Metal / Djent',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Matt_Garstka_-_2014_NAMM_Show_%28cropped%29.jpg',
    bio: 'Matt Garstka (born April 27, 1989) is an American drummer known for his virtuosic work with instrumental progressive metal band Animals as Leaders since 2012. His playing seamlessly blends jazz fusion, electronic music, and progressive metal, featuring complex polyrhythms, intricate ghost note patterns, and innovative use of dynamics.',
    gear: {
      drums: 'Tama Starclassic Walnut/Birch',
      snare: 'Tama S.L.P. 14x6" G-Maple',
      cymbals: 'Meinl Byzance Series (15" Dual Hi-Hats, 18" & 20" Extra Dry Medium Crashes, 22" Dual Ride)',
      hardware: 'Tama Speed Cobra 910 Double Pedal',
      sticks: 'Vic Firth Matt Garstka Signature'
    },
    photos: [],
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
    genre: 'Melodic Death Metal',
    country: 'Sweden',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/2023_Rock_im_Park_-_Arch_Enemy_-_Daniel_Erlandsson_-_by_2eight_-_ZSC4502.jpg',
    bio: 'Daniel Erlandsson (born May 22, 1976) is a Swedish drummer and founding member of melodic death metal band Arch Enemy, formed in 1995. His drumming combines Scandinavian death metal intensity with technical precision and musicality. He has also played with Eucharist, Carcass (live), and In Flames.',
    gear: {
      drums: 'Pearl Reference Pure',
      snare: 'Pearl Daniel Erlandsson Signature 14x5.5"',
      cymbals: 'Paiste RUDE & 2002 Series (14" RUDE Hi-Hats, 18" & 19" RUDE Crashes, 22" RUDE Power Ride)',
      hardware: 'Pearl Demon Drive Double Pedal',
      sticks: 'Vic Firth American Classic 5B'
    },
    photos: [],
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
    genre: 'Melodic Death Metal / Power Metal',
    country: 'Finland',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Jaska_Raatikainen_-_Ilosaarirock_2009_%28cropped%29.jpg',
    bio: 'Jaska Raatikainen (born July 18, 1979) was the drummer and co-founder of Finnish melodic death metal band Children of Bodom, formed in 1993. Alongside the late Alexi Laiho, Raatikainen helped create the band\'s signature sound that blended neoclassical melodies with aggressive death metal.',
    gear: {
      drums: 'Pearl Masters Premium Maple',
      snare: 'Pearl Masters 14x5.5" Maple',
      cymbals: 'Zildjian A Custom & K Custom Series (14" A Custom Hi-Hats, 17" & 18" A Custom Crashes, 20" K Custom Ride)',
      hardware: 'Pearl Eliminator Double Pedal',
      sticks: 'Vic Firth American Classic 5A'
    },
    photos: [],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
    ],
    videos: [
    ]
  },
  {
    id: 56,
    name: 'Hannes Grossmann',
    band: 'Obscura / ex-Necrophagist / Alkaloid',
    genre: 'Technical Death Metal',
    country: 'Germany',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Hannes_wiki2.jpg',
    bio: 'Hannes Grossmann (born September 8, 1982) is a German drummer, composer, and producer known for his work with Obscura, Necrophagist, Blotted Science, and Alkaloid. Widely regarded as one of the most technically proficient drummers in death metal, his playing combines classical music influences with extreme metal precision.',
    gear: {
      drums: 'DW Collectors Series',
      snare: 'DW Collectors 14x5.5" Maple',
      cymbals: 'Meinl Byzance Series (14" Byzance Traditional Hi-Hats, 18" & 19" Byzance Brilliant Crashes, 21" Byzance Traditional Ride)',
      hardware: 'DW 9000 Series Double Pedal',
      sticks: 'Vic Firth American Classic 5B'
    },
    photos: [],
    endorsements: [
      { name: 'DW Drums', url: 'https://www.dwdrums.com' },
      { name: 'Meinl Cymbals', url: 'https://meinlcymbals.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
    ],
    videos: [
    ]
  },
  {
    id: 57,
    name: 'Daray',
    band: 'Dimmu Borgir / Vader',
    genre: 'Black Metal / Death Metal',
    country: 'Poland',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Dariusz_Brzozowski.jpg',
    bio: 'Dariusz "Daray" Brzozowski (born August 23, 1984) is a Polish drummer known for his work with Norwegian symphonic black metal band Dimmu Borgir (since 2008) and Polish death metal legends Vader (2006-2016). His drumming combines extreme speed, technical precision, and theatrical flair.',
    gear: {
      drums: 'Pearl Masterworks Stadium Exotic',
      snare: 'Pearl Reference 14x5.5" Brass',
      cymbals: 'Paiste RUDE & 2002 Series (14" RUDE Hi-Hats, 17" & 18" RUDE Crashes, 22" RUDE Power Ride)',
      hardware: 'Pearl Demon XR Double Pedal',
      sticks: 'Vic Firth American Classic Extreme 5B'
    },
    photos: [],
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
    genre: 'Melodic Death Metal / Viking Metal',
    country: 'Sweden',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Amon_Amarth_%2827839859354%29.jpg',
    bio: 'Jocke Wallgren (born April 1, 1986) is a Swedish drummer who joined melodic death metal band Amon Amarth in 2016, replacing Fredrik Andersson. His drumming brings a fresh energy to Amon Amarth\'s Viking-themed sound, combining powerful double bass patterns with groove-oriented playing.',
    gear: {
      drums: 'Pearl Reference Pure',
      snare: 'Pearl Reference 14x6.5" Brass',
      cymbals: 'Zildjian A Custom & K Custom Series (14" A Custom Hi-Hats, 18" & 19" A Custom Crashes, 21" K Custom Ride)',
      hardware: 'Pearl Demon Drive Double Pedal',
      sticks: 'Vic Firth American Classic 5B'
    },
    photos: [],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
    ],
    videos: [
    ]
  },
  {
    id: 59,
    name: 'Tim Yeung',
    band: 'Morbid Angel / Hate Eternal / Vital Remains',
    genre: 'Death Metal / Technical Death Metal',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/79/DevineHerecy002_sharp.jpg',
    bio: 'Tim Yeung (born November 27, 1978) is an American extreme metal drummer. He has played with bands such as Hate Eternal, Morbid Angel, Vital Remains, Divine Heresy, and Nile. His incredible speed, precision, and endurance have made him one of the most sought-after drummers in death metal.',
    gear: {
      drums: 'Tama Starclassic Bubinga',
      snare: 'Tama S.L.P. Big Black Steel 14x6.5"',
      cymbals: 'Sabian AAX & HHX Series (14" AAX Stage Hi-Hats, 18" & 19" AAX X-Plosion Crashes, 21" HHX Raw Bell Dry Ride)',
      hardware: 'Tama Speed Cobra 910 Double Pedal',
      sticks: 'Vic Firth American Classic 5A'
    },
    photos: [],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
    ],
    videos: [
    ]
  },
  {
    id: 60,
    name: 'Kevin Talley',
    band: 'Dying Fetus / Misery Index / Six Feet Under',
    genre: 'Brutal Death Metal / Grindcore',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/MiseryIndex_band1.jpg',
    bio: 'Kevin Talley (born May 21, 1979) is an American drummer renowned for his work with brutal death metal and grindcore bands including Dying Fetus, Misery Index, Six Feet Under, Chimaira, and Suffocation. His incredibly fast and precise drumming helped define the brutal death metal sound.',
    gear: {
      drums: 'Pearl Masters Premium Legend',
      snare: 'Pearl Masters 14x5.5" Maple',
      cymbals: 'Sabian AAX Series (14" Stage Hi-Hats, 17" & 18" X-Plosion Crashes, 20" Stage Ride)',
      hardware: 'Pearl Eliminator Double Pedal',
      sticks: 'Vic Firth American Classic 5B'
    },
    photos: [],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
    ],
    videos: [
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

  const { id } = req.query;
  const drummer = drummers.find(d => d.id === parseInt(id));

  if (!drummer) {
    return res.status(404).json({ error: 'Drummer not found' });
  }

  // Add quotes for this drummer
  const quotes = getQuotesForDrummer(drummer.id);
  
  // Add news for this drummer (Phase 3 - #511)
  const drummerNews = getNewsForDrummer(drummer.name).slice(0, 5);
  
  res.status(200).json({
    ...drummer,
    quotes: quotes.length > 0 ? quotes : null,
    news: drummerNews.length > 0 ? drummerNews : null,
  });
}
