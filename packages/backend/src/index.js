const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Sample data - legendary metal drummers
const drummers = [
  {
    id: 1,
    name: 'Lars Ulrich',
    band: 'Metallica',
    genre: 'Thrash Metal',
    genres: ['Thrash Metal'],
    country: 'Denmark',
    era: '80s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Lars_Ulrich_by_Gage_Skidmore_%28cropped%29.jpg',
    bio: 'Lars Ulrich is a Danish musician and co-founder of Metallica, one of the most influential thrash metal bands in history. Born in 1963, he moved to Los Angeles to pursue his drumming career and formed Metallica with James Hetfield in 1981. Known for his aggressive style and iconic drum fills, Lars has been instrumental in shaping the sound of heavy metal.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Lars_Ulrich',
      'https://www.instagram.com/larsulrich/',
      'https://www.discogs.com/artist/252889-Lars-Ulrich',
      'https://www.allmusic.com/artist/lars-ulrich-mn0000849521'
    ],
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
      { name: 'Ahead Drumsticks', url: 'https://www.aheaddrumsticks.com' }
    ],
    quotes: [
      { text: "I'm not the best drummer in the world, but I'm the best drummer for Metallica.", source: "Modern Drummer Magazine", year: 2008 },
      { text: "The only way to do great work is to love what you do. I've been fortunate enough to do that for over 40 years.", source: "Drumeo Interview", year: 2020 },
      { text: "Music is the most powerful form of communication in the world. It brings people together from all walks of life.", source: "Rolling Stone", year: 2016 }
    ],
    spotlight: {
      quickFacts: [
        "Co-founded Metallica in a Los Angeles newspaper ad in 1981",
        "Has played over 1,500 live shows with Metallica",
        "First drummer to use Ahead aluminum drumsticks professionally"
      ],
      iconicMoment: "The Black Album sessions (1991) - helping craft the most commercially successful metal album of all time",
      gearHighlight: "His signature Tama LU1465 snare drum, known for its cutting attack and projection"
    },
    gearTimeline: [
      {
        era: 'Early Years',
        years: '1981-1985',
        description: "Metallica's formation and first albums",
        albums: ["Kill 'Em All", "Ride the Lightning"],
        gear: {
          drums: 'Camco Drums',
          snare: 'Camco 14x5" Snare',
          cymbals: 'Zildjian A Series',
          hardware: 'Standard hardware'
        },
        notes: "Lars started with modest gear, using second-hand Camco drums during Metallica's early days in the LA thrash scene."
      },
      {
        era: 'Thrash Explosion',
        years: '1986-1991',
        description: 'Master of Puppets through the Black Album',
        albums: ['Master of Puppets', '...And Justice for All', 'The Black Album'],
        gear: {
          drums: 'Tama Artstar II',
          snare: 'Tama Bell Brass 14x6.5"',
          cymbals: 'Zildjian A Custom Series',
          hardware: 'Tama Titan Hardware, DW 5000 Double Pedal'
        },
        notes: 'Switched to Tama, developing his signature sound. The Black Album marked a refined, stadium-ready setup.'
      },
      {
        era: 'Load Era',
        years: '1992-1999',
        description: 'Experimentation and mainstream success',
        albums: ['Load', 'ReLoad', 'Garage Inc.'],
        gear: {
          drums: 'Tama Granstar',
          snare: 'Tama Lars Ulrich Signature 14x6.5"',
          cymbals: 'Zildjian A Custom Series',
          hardware: 'Tama Iron Cobra Double Pedal'
        },
        notes: 'First signature snare drum introduced. Larger kit configurations for arena shows.'
      },
      {
        era: 'St. Anger & Return',
        years: '2000-2010',
        description: 'Documentary era and return to form',
        albums: ['St. Anger', 'Death Magnetic'],
        gear: {
          drums: 'Tama Starclassic Maple',
          snare: 'Tama LU1465 Signature 14x6.5" (St. Anger: snare wires off)',
          cymbals: 'Zildjian A Custom Series',
          hardware: 'Tama Iron Cobra 900 Double Pedal'
        },
        notes: 'St. Anger featured controversial snare sound without snare wires. Death Magnetic returned to classic setup.'
      },
      {
        era: 'Modern Era',
        years: '2011-Present',
        description: 'Hardwired and touring machine',
        albums: ['Hardwired... to Self-Destruct', '72 Seasons'],
        gear: {
          drums: 'Tama Star Classic Maple',
          snare: 'Tama LU1465 Lars Ulrich Signature 14x6.5"',
          cymbals: 'Zildjian A Custom Series',
          hardware: 'Tama Iron Cobra 900 Power Glide Double Pedal',
          sticks: 'Ahead Lars Ulrich Signature'
        },
        notes: 'Current setup optimized for massive stadium tours. Uses Ahead aluminum sticks for durability.'
      }
    ],
    spotlight: {
      quickFacts: [
        'Co-founded Metallica in 1981 with James Hetfield in Los Angeles',
        'First Danish musician inducted into the Rock and Roll Hall of Fame',
        'Known for his aggressive fills and iconic double bass patterns on classic thrash albums'
      ],
      iconicMoment: 'His drumming on "Master of Puppets" helped define the thrash metal sound that influenced generations',
      gearHighlight: 'His Tama Starclassic Maple kit and signature snare deliver the punchy attack Metallica is known for'
    }
  },
  {
    id: 2,
    name: 'Joey Jordison',
    band: 'Slipknot',
    genre: 'Nu Metal / Death Metal',
    genres: ['Nu-Metal', 'Death Metal'],
    country: 'USA',
    era: '90s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/JoeyJordison.jpg',
    bio: 'Joey Jordison (1975-2021) was an American musician best known as the original drummer of Slipknot. His blistering speed, technical precision, and theatrical stage presence made him one of the most influential metal drummers of his generation. He also played guitar for Murderdolls and drums for various other projects.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Joey_Jordison',
      'https://www.discogs.com/artist/355738-Joey-Jordison',
      'https://www.allmusic.com/artist/joey-jordison-mn0000796491'
    ],
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
      { name: 'Promark Sticks', url: 'https://www.daddario.com/promark' }
    ],
    quotes: [
      { text: "The drums chose me. I didn't choose them. It was like destiny.", source: "Modern Drummer Magazine", year: 2004 },
      { text: "Every time I sit behind a drum kit, I want to destroy it. That's the only way I know how to play.", source: "Revolver Magazine", year: 2008 },
      { text: "Practice doesn't make perfect. Perfect practice makes perfect. There's a big difference.", source: "Drum! Magazine", year: 2010 }
    ],
    spotlight: {
      quickFacts: [
        "Recorded drums for Iowa album in just 10 days",
        "Designed the iconic #1 mask himself as part of Slipknot's visual identity",
        "Could play at 280+ BPM with precision timing"
      ],
      iconicMoment: "The Iowa era (2001) - creating the most brutal and technically demanding Slipknot album",
      gearHighlight: "His signature 13\" Pearl snare drum designed for machine-gun fills and rapid-fire patterns"
    },
    gearTimeline: [
      {
        era: 'Pre-Slipknot',
        years: '1991-1995',
        description: 'Des Moines local scene and early bands',
        albums: ['Modifidious demos', 'The Pale Ones demos'],
        gear: {
          drums: 'Various second-hand kits',
          snare: 'Generic 14x5.5"',
          cymbals: 'Zildjian ZBT Series',
          hardware: 'Mixed brands'
        },
        notes: 'Joey developed his skills playing in local Des Moines bands, using whatever gear he could afford.'
      },
      {
        era: 'Slipknot Rise',
        years: '1996-2001',
        description: "Slipknot's breakthrough era",
        albums: ['Mate. Feed. Kill. Repeat.', 'Slipknot', 'Iowa'],
        gear: {
          drums: 'Pearl Export (early), Pearl Masters MMX',
          snare: 'Pearl Masters 14x6.5" Steel',
          cymbals: 'Paiste 2002 & RUDE Series',
          hardware: 'Pearl P-2002C Power Shifter Double Pedal'
        },
        notes: 'Signed with Pearl. Iowa era featured brutal sound with RUDE cymbals cutting through the chaos.'
      },
      {
        era: 'Signature Series',
        years: '2002-2008',
        description: 'Vol. 3 and All Hope Is Gone',
        albums: ['Vol. 3: (The Subliminal Verses)', 'All Hope Is Gone'],
        gear: {
          drums: 'Pearl Masters Premium Maple',
          snare: 'Pearl Joey Jordison Signature 13x6.5"',
          cymbals: 'Paiste RUDE Series',
          hardware: 'Pearl Demon Drive Double Pedal'
        },
        notes: 'First signature snare released - 13" diameter for rapid response and machine-gun fills.'
      },
      {
        era: 'Side Projects',
        years: '2009-2013',
        description: 'Murderdolls, Rob Zombie, Scar the Martyr',
        albums: ['Women and Children Last', 'Scar the Martyr'],
        gear: {
          drums: 'Pearl Reference Pure',
          snare: 'Pearl Joey Jordison Signature 13x6.5"',
          cymbals: 'Paiste RUDE & Signature Series',
          hardware: 'Pearl Demon Drive Double Pedal'
        },
        notes: 'Expanded his sound with different projects, temporarily played with Rob Zombie.'
      },
      {
        era: 'VIMIC & Legacy',
        years: '2014-2021',
        description: 'New projects and final years',
        albums: ['VIMIC demos', 'Sinsaenum'],
        gear: {
          drums: 'ddrum Hybrid Series',
          snare: 'ddrum 14x6.5" Maple',
          cymbals: 'Paiste RUDE Series',
          hardware: 'ddrum Mercury Double Pedal'
        },
        notes: 'Switched to ddrum. Battled health issues but continued performing and recording until his passing in 2021.'
      }
    ]
  },
  {
    id: 3,
    name: 'Gene Hoglan',
    band: 'Death / Testament / Dethklok',
    genre: 'Death Metal / Thrash Metal',
    genres: ['Death Metal', 'Progressive Metal'],
    country: 'USA',
    era: '80s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Gene_Hoglan_-_Testament_%28cropped%29.jpg',
    bio: 'Gene Hoglan, nicknamed "The Atomic Clock" for his precise timing, is one of the most respected drummers in extreme metal. Born in 1967, he has played with Death, Dark Angel, Testament, Strapping Young Lad, Fear Factory, and Dethklok. His combination of speed, power, and musicality has influenced countless metal drummers.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Gene_Hoglan',
      'https://www.instagram.com/gene_hoglan/',
      'https://www.discogs.com/artist/252919-Gene-Hoglan',
      'https://www.allmusic.com/artist/gene-hoglan-mn0000646612'
    ],
    gear: {
      drums: 'Tama Starclassic Walnut/Birch',
      snare: 'Tama Gene Hoglan Signature 14x8"',
      cymbals: 'Zildjian A Custom Series (15" Hi-Hats, 18" & 20" Crashes, 22" Ride, 20" China)',
      hardware: 'Tama Speed Cobra 910 Double Pedal, Tama 1st Chair Round Rider Throne',
      sticks: 'Vater 5B Wood Tip'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/6/60/Gene_Hoglan_-_Testament_%28cropped%29.jpg'
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Vater Drumsticks', url: 'https://www.vater.com' }
    ],
    videos: [
      { youtubeId: 'uS5xR7jBxDw', title: 'Gene Hoglan - Death "Crystal Mountain" (Drum Cam)', year: '2018' },
      { youtubeId: 'Jg4-gLPbngg', title: 'Gene Hoglan - Testament "Into The Pit" (Live Drum Cam)', year: '2017' },
      { youtubeId: 'q3jPgKjPqE4', title: 'Gene Hoglan - Dethklok "Thunderhorse" (Drum Playthrough)', year: '2019' }
    ],
    spotlight: {
      quickFacts: [
        "Nicknamed 'The Atomic Clock' for his metronomic precision without click tracks",
        "Dark Angel's 'Time Does Not Heal' features 246 riffs - he memorized the entire 60-minute album",
        "Stands 6'3\" and weighs over 250 lbs, earning him the nickname 'The Human Drum Machine'"
      ],
      iconicMoment: "Recording Death's 'Individual Thought Patterns' (1993) - elevating progressive death metal drumming to new heights",
      gearHighlight: "His signature Tama 14x8\" deep snare, designed for thunderous power and cutting attack"
    },
    gearTimeline: [
      {
        era: 'Dark Angel Era',
        years: '1983-1991',
        description: 'Pioneering extreme thrash metal',
        albums: ['We Have Arrived', 'Darkness Descends', 'Leave Scars', 'Time Does Not Heal'],
        gear: {
          drums: 'Tama Superstar',
          snare: 'Tama Superstar 14x6.5"',
          cymbals: 'Zildjian A Series',
          hardware: 'Tama Camco-style pedals'
        },
        notes: 'Developed his "Atomic Clock" precision during this era. Time Does Not Heal featured 246 tempo changes.'
      },
      {
        era: 'Death Era',
        years: '1991-1995',
        description: 'Death metal complexity with Chuck Schuldiner',
        albums: ['Individual Thought Patterns', 'Symbolic'],
        gear: {
          drums: 'Tama Artstar II',
          snare: 'Tama Bell Brass 14x6.5"',
          cymbals: 'Zildjian A Custom Series',
          hardware: 'Tama Iron Cobra Double Pedal'
        },
        notes: 'Brought technical finesse to Death\'s progressive death metal sound. "Atomic Clock" nickname solidified.'
      },
      {
        era: 'Strapping Young Lad',
        years: '1995-2007',
        description: 'Industrial extreme metal with Devin Townsend',
        albums: ['Heavy as a Really Heavy Thing', 'City', 'Alien', 'The New Black'],
        gear: {
          drums: 'Tama Starclassic Performer',
          snare: 'Tama Bell Brass 14x8"',
          cymbals: 'Zildjian A Custom Projection',
          hardware: 'Tama Iron Cobra 900 Double Pedal'
        },
        notes: "Massive sound to match Devin's wall of sound. Moved to deeper snare drums during this period."
      },
      {
        era: 'Testament & Dethklok',
        years: '2008-2017',
        description: 'Dual roles in thrash revival and animated metal',
        albums: ['The Formation of Damnation', 'Dark Roots of Earth', 'The Dethalbum II & III'],
        gear: {
          drums: 'Tama Starclassic Bubinga',
          snare: 'Tama Gene Hoglan Signature 14x8"',
          cymbals: 'Zildjian A Custom Series',
          hardware: 'Tama Speed Cobra 910 Double Pedal'
        },
        notes: 'First signature snare - 14x8" deep for thunderous sound. Balanced live thrash with studio animation work.'
      },
      {
        era: 'Modern Era',
        years: '2018-Present',
        description: 'Testament continued, guest appearances, clinics',
        albums: ['Titans of Creation', 'Galaktikon II'],
        gear: {
          drums: 'Tama Starclassic Walnut/Birch',
          snare: 'Tama Gene Hoglan Signature 14x8"',
          cymbals: 'Zildjian A Custom Series',
          hardware: 'Tama Speed Cobra 910 Double Pedal',
          sticks: 'Vater 5B Wood Tip'
        },
        notes: 'Current setup refined for touring. Known for marathon clinics sharing decades of metal drumming wisdom.'
      }
    ]
  },
  {
    id: 4,
    name: 'Dave Lombardo',
    band: 'Slayer',
    genre: 'Thrash Metal',
    genres: ['Thrash Metal'],
    country: 'Cuba/USA',
    era: '80s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Dave_Lombardo_8.5.14.jpeg',
    bio: 'Dave Lombardo, born in Cuba in 1965, is widely regarded as one of the greatest drummers in metal history. As the original drummer of Slayer, he pioneered the double bass drumming style that defined thrash metal. His work on albums like "Reign in Blood" is considered groundbreaking. He has also played with Fantomas, Suicidal Tendencies, and Dead Cross.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Dave_Lombardo',
      'https://www.instagram.com/davelombardo/',
      'https://www.discogs.com/artist/252908-Dave-Lombardo',
      'https://www.allmusic.com/artist/dave-lombardo-mn0000134767'
    ],
    gear: {
      drums: 'Pearl Masters Maple Complete',
      snare: 'Pearl Dave Lombardo Signature 14x5.5"',
      cymbals: 'Paiste RUDE & 2002 Series (14" Hi-Hats, 18" & 19" Crashes, 20" Power Ride, 18" China)',
      hardware: 'Pearl Demon Drive Double Pedal, Pearl D-2000BR Throne',
      sticks: 'Vic Firth American Classic 5B'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/d/df/Dave_Lombardo_8.5.14.jpeg'
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Paiste Cymbals', url: 'https://www.paiste.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
    ],
    videos: [
      { youtubeId: 'QZQN8FvKvdM', title: 'Dave Lombardo - Slayer "Raining Blood" (Live Drum Cam)', year: '2017' },
      { youtubeId: 'YeINWQDg7zI', title: 'Dave Lombardo - Slayer "Angel of Death" (Live Drum Cam)', year: '2018' },
      { youtubeId: 'r7cWi41XGCM', title: 'Dave Lombardo Drum Solo (Live)', year: '2019' }
    ],
    quotes: [
      { text: "Speed is nothing without control. You have to be able to play fast and tight at the same time.", source: "Modern Drummer Magazine", year: 2006 },
      { text: "I never wanted to be a typical metal drummer. I wanted to bring jazz, Latin, and world music influences into heavy music.", source: "Drumeo Interview", year: 2019 },
      { text: "Reign in Blood changed everything. We didn't know we were making history, we were just playing as fast and hard as we could.", source: "Revolver Magazine", year: 2016 }
    ],
    spotlight: {
      quickFacts: [
        "Born in Havana, Cuba - brought Latin rhythmic sensibility to thrash metal",
        "Reign in Blood (1986) was recorded in just 3 weeks",
        "Has collaborated with Mike Patton, John Zorn, and Fantômas outside of metal"
      ],
      iconicMoment: "Recording 'Reign in Blood' (1986) - 28 minutes that redefined extreme metal drumming forever",
      gearHighlight: "His signature Pearl snare and preference for Paiste RUDE cymbals that cut through Slayer's wall of sound"
    }
  },
  {
    id: 5,
    name: 'Tomas Haake',
    band: 'Meshuggah',
    genre: 'Progressive Metal / Djent',
    genres: ['Progressive Metal', 'Metalcore/Djent'],
    country: 'Sweden',
    era: '90s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meshuggah_-_Rock_am_Ring_2023-44313.jpg',
    bio: 'Tomas Haake, born in 1971, is the drummer and primary lyricist for Swedish extreme metal band Meshuggah. His polyrhythmic drumming style, characterized by complex time signatures and intricate patterns, has been hugely influential in the development of djent and progressive metal. He is known for his metronomic precision and innovative approach.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Tomas_Haake',
      'https://www.discogs.com/artist/281578-Tomas-Haake',
      'https://www.allmusic.com/artist/tomas-haake-mn0001678091'
    ],
    gear: {
      drums: 'Sonor SQ2 Heavy Beech',
      snare: 'Sonor Tomas Haake Signature 14x6.25"',
      cymbals: 'Meinl Byzance Series (15" Dark Hi-Hats, 18" & 19" Dark Crashes, 21" Transition Ride, 18" Dark China)',
      hardware: 'Sonor Giant Step Double Pedal, Sonor Drummer Throne',
      sticks: 'Vic Firth Tomas Haake Signature'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meshuggah_-_Rock_am_Ring_2023-44313.jpg'
    ],
    endorsements: [
      { name: 'Sonor Drums', url: 'https://www.sonor.com' },
      { name: 'Meinl Cymbals', url: 'https://meinlcymbals.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
    ],
    videos: [
      { youtubeId: 'HUBZ_9BBevw', title: 'Tomas Haake - Meshuggah "Bleed" (Live Drum Cam)', year: '2019' },
      { youtubeId: 'qc98u-eGzlc', title: 'Tomas Haake - Meshuggah "Future Breed Machine" (Live Drum Cam)', year: '2018' },
      { youtubeId: '4A_tSyJBsRQ', title: 'Tomas Haake - Meshuggah "Rational Gaze" (Live Drum Cam)', year: '2017' }
    ],
    spotlight: {
      quickFacts: [
        "Pioneer of polyrhythmic drumming - plays in 4/4 while guitars play in odd meters",
        "The song 'Bleed' took him 6 months to master due to its insane double bass pattern",
        "Uses a custom Sonor kit tuned extremely low for Meshuggah's signature sound"
      ],
      iconicMoment: "Recording 'obZen' (2008) - the album that cemented Meshuggah's influence on the djent movement",
      gearHighlight: "His signature Sonor snare and Meinl Byzance cymbals deliver the dry, cutting tones essential to Meshuggah's sound"
    }
  },
  {
    id: 6,
    name: 'George Kollias',
    band: 'Nile',
    genre: 'Technical Death Metal',
    genres: ['Death Metal'],
    country: 'Greece',
    era: '2000s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/GK_10.jpg',
    bio: 'George Kollias, born in 1977, is a Greek drummer known for his extreme speed and technical proficiency. As the drummer for Nile since 2004, he has pushed the boundaries of death metal drumming with his incredible blast beats and double bass technique. He is also an educator and has released instructional materials.',
    sameAs: [
      'https://en.wikipedia.org/wiki/George_Kollias_(drummer)',
      'https://www.instagram.com/george_kollias/',
      'https://www.discogs.com/artist/544679-George-Kollias',
      'https://www.allmusic.com/artist/george-kollias-mn0001019714'
    ],
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
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
    ],
    videos: [
      { youtubeId: 'lhsasLJfYlY', title: 'George Kollias - Nile "Kafir!" (Live Drum Cam)', year: '2019' },
      { youtubeId: 'Dg_gZwV3XM8', title: 'George Kollias - Extreme Drumming Masterclass', year: '2018' },
      { youtubeId: 'yabkzIdKl9Y', title: 'George Kollias - Nile "Black Seeds of Vengeance" (Drum Playthrough)', year: '2017' }
    ]
  },
  {
    id: 7,
    name: 'Eloy Casagrande',
    band: 'Sepultura / Slipknot',
    genre: 'Thrash Metal / Nu Metal',
    genres: ['Thrash Metal', 'Nu-Metal'],
    country: 'Brazil',
    era: '2010s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Sepultura_-_2023219214143_2023-08-07_Sepultura_-_Sven_-_1D_X_MK_II_-_0650_-_AK8I2527.jpg',
    bio: 'Eloy Casagrande, born in 1990, is a Brazilian drummer who became Sepultura\'s drummer in 2011 and joined Slipknot in 2024. Known for his explosive speed, technical prowess, and energetic performances, he brought new life to Sepultura\'s sound. His drumming style combines traditional metal with modern technical elements, making him one of the most exciting drummers in contemporary metal.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Eloy_Casagrande',
      'https://www.instagram.com/eloycasagrande/',
      'https://www.discogs.com/artist/1665217-Eloy-Casagrande',
      'https://www.allmusic.com/artist/eloy-casagrande-mn0002596379'
    ],
    gear: {
      drums: 'Tama Starclassic Bubinga',
      snare: 'Tama Bell Brass 14x6.5"',
      cymbals: 'Paiste (15" Masters Dark Hi-Hats, 20" Formula 602 Modern Essentials Crash, 20" 2002 Wild Crash, 20" Masters Dark Crash, 20" 2002 Novo China, 20" 2002 Power Ride)',
      hardware: 'Tama Iron Cobra Power Glide Double Pedal, Tama Road Pro Hardware',
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
    ]
  },
  {
    id: 8,
    name: 'Ray Luzier',
    band: 'Korn',
    genre: 'Nu Metal',
    genres: ['Nu-Metal'],
    country: 'USA',
    era: '2000s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Ray_Luzier_of_Korn.jpg',
    bio: 'Ray Luzier, born in 1970, is an American drummer who joined Korn in 2007. Before Korn, he was a sought-after session musician, working with artists like David Lee Roth and Army of Anyone. His drumming combines rock solid grooves with technical flair, bringing a fresh energy to Korn\'s signature sound while respecting their nu-metal roots.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Ray_Luzier',
      'https://www.instagram.com/rikirockett/',
      'https://www.discogs.com/artist/356148-Ray-Luzier',
      'https://www.allmusic.com/artist/ray-luzier-mn0000356844'
    ],
    gear: {
      drums: 'Pearl Masters Maple Complete',
      snare: 'Pearl Reference 14x6.5" Brass',
      cymbals: 'Sabian AAX Series (14" Stage Hi-Hats, 18" & 19" X-Plosion Crashes, 21" Stage Ride, 18" AAXtreme China)',
      hardware: 'Pearl Demon Drive Double Pedal, Pearl D-2000 Roadster Throne',
      sticks: 'Promark Ray Luzier Signature TX420X'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/c/c8/Ray_Luzier_of_Korn.jpg'
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'Promark Sticks', url: 'https://www.daddario.com/promark' }
    ]
  },
  {
    id: 9,
    name: 'John Otto',
    band: 'Limp Bizkit',
    genre: 'Nu Metal / Rap Metal',
    genres: ['Nu-Metal'],
    country: 'USA',
    era: '90s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Drummer_John_Otto_of_Limp_Bizkit_in_2006.jpg',
    bio: 'John Otto, born in 1977, is the drummer and a founding member of Limp Bizkit. His hip-hop influenced drumming style, combining tight grooves with funk-inspired beats, was essential in defining the rap-metal sound of the late 90s and early 2000s. His ability to blend rock power with hip-hop feel made Limp Bizkit one of the biggest bands of the nu-metal era.',
    sameAs: [
      'https://en.wikipedia.org/wiki/John_Otto_(musician)',
      'https://www.instagram.com/johnotto/',
      'https://www.discogs.com/artist/360637-John-Otto',
      'https://www.allmusic.com/artist/john-otto-mn0000192831'
    ],
    gear: {
      drums: 'Orange County Drum & Percussion (OCDP) Custom',
      snare: 'OCDP 14x7" Maple/Ash',
      cymbals: 'Zildjian K Custom Series (14" Hi-Hats, 17" & 18" Dark Crashes, 20" Ride, 18" China)',
      hardware: 'DW 9000 Series Double Pedal, DW 9100 Throne',
      sticks: 'Promark 747 Rock Wood Tip'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/0/0a/Drummer_John_Otto_of_Limp_Bizkit_in_2006.jpg'
    ],
    endorsements: [
      { name: 'OCDP Drums', url: 'https://www.ocdrum.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Promark Sticks', url: 'https://www.daddario.com/promark' }
    ]
  },
  {
    id: 10,
    name: 'Jay Weinberg',
    band: 'Slipknot / Suicidal Tendencies',
    genre: 'Nu Metal / Hardcore',
    genres: ['Nu-Metal', 'Metalcore/Djent'],
    country: 'USA',
    era: '2010s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Suicidal_Tendencies_Rockharz_2024_18.jpg',
    bio: 'Jay Weinberg, born in 1990, is the son of E Street Band drummer Max Weinberg. He joined Slipknot in 2014, becoming their drummer after Joey Jordison\'s departure. Before Slipknot, he briefly played with Against Me! and Madball. His powerful, aggressive style honored Slipknot\'s legacy while adding his own intensity. In 2023, he joined Suicidal Tendencies.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Jay_Weinberg',
      'https://www.instagram.com/jayweinberg/',
      'https://www.discogs.com/artist/1940247-Jay-Weinberg',
      'https://www.allmusic.com/artist/jay-weinberg-mn0002419959'
    ],
    gear: {
      drums: 'Pearl Masterworks Custom',
      snare: 'Pearl Reference 14x6.5" Steel',
      cymbals: 'Zildjian A Custom & K Custom Series (14" A New Beat Hi-Hats, 18" & 19" A Custom Crashes, 21" K Custom Ride, 19" K China)',
      hardware: 'Pearl Demon Drive Double Pedal, Pearl D-2000 Throne',
      sticks: 'Promark ActiveGrip 5B'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/4/46/Suicidal_Tendencies_Rockharz_2024_18.jpg'
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Promark Sticks', url: 'https://www.daddario.com/promark' }
    ]
  },
  {
    id: 11,
    name: 'Vinnie Paul',
    band: 'Pantera / Damageplan / Hellyeah',
    genre: 'Groove Metal / Heavy Metal',
    genres: ['Groove Metal'],
    country: 'USA',
    era: '80s',
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
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
    ],
    videos: [
      { youtubeId: 'AkFqg5wAuFk', title: 'Pantera - Walk (Live Drum Cam)', year: '1997' },
      { youtubeId: '2DfYLar2QGI', title: 'Pantera - Cowboys From Hell (Live Drum Cam)', year: '1992' },
      { youtubeId: 'i97OkCXwotE', title: 'Vinnie Paul - Dimebash Drum Solo', year: '2018' }
    ]
  },
  {
    id: 12,
    name: 'Charlie Benante',
    band: 'Anthrax / S.O.D. / Pantera',
    genre: 'Thrash Metal',
    genres: ['Thrash Metal'],
    country: 'USA',
    era: '80s',
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
    ]
  },
  {
    id: 13,
    name: 'Mike Portnoy',
    band: 'Dream Theater / Liquid Tension Experiment / The Winery Dogs',
    genre: 'Progressive Metal',
    genres: ['Progressive Metal'],
    country: 'USA',
    era: '80s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Mike_Portnoy_2025_Tons_of_Rock-2.jpg',
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
      'https://upload.wikimedia.org/wikipedia/commons/2/28/Mike_Portnoy_2025_Tons_of_Rock-2.jpg'
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'Promark Sticks', url: 'https://www.daddario.com/promark' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' },
      { name: 'Roland Electronics', url: 'https://www.roland.com' }
    ],
    quotes: [
      { text: "I've always tried to approach drums as a musical instrument rather than just a rhythm instrument. The drums can sing.", source: "Modern Drummer Magazine", year: 2005 },
      { text: "Progressive music allows you to break all the rules. That's what makes it so exciting - there are no boundaries.", source: "Drumeo Interview", year: 2023 },
      { text: "Every drummer should learn to read music. It opens up a whole world of possibilities and makes you a better musician.", source: "Drum! Magazine", year: 2012 }
    ]
  },
  {
    id: 14,
    name: 'Danny Carey',
    band: 'Tool',
    genre: 'Progressive Metal',
    genres: ['Progressive Metal'],
    country: 'USA',
    era: '90s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Danny_Carey_Hellfest_2019.jpg',
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
      { youtubeId: 'FssULNGSZIA', title: 'Tool - Pneuma (Live Drum Cam)', year: '2019' },
      { youtubeId: 'qJq9y9xPKWs', title: 'Tool - Forty Six & 2 (Live Drum Cam)', year: '2019' },
      { youtubeId: 'Z45VCJfnWZ0', title: 'Tool - Chocolate Chip Trip (Live Drum Solo)', year: '2020' }
    ],
    quotes: [
      { text: "I've always been fascinated by sacred geometry and how it relates to rhythm. The patterns in nature are the same patterns in music.", source: "Modern Drummer Magazine", year: 2019 },
      { text: "The drumset is the most expressive instrument. You can make it whisper or you can make it scream.", source: "Drumeo Interview", year: 2020 },
      { text: "I practice every day, even after 30 years. The day you stop learning is the day you stop growing as a musician.", source: "Revolver Magazine", year: 2017 }
    ]
  },
  {
    id: 15,
    name: 'Mario Duplantier',
    band: 'Gojira',
    genre: 'Progressive Death Metal',
    genres: ['Progressive Metal', 'Death Metal'],
    country: 'France',
    era: '2000s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Mario_Duplantier_Gojira_2012.jpg',
    bio: 'Mario Duplantier, born in 1981 in Bayonne, France, is the drummer and co-founder of the critically acclaimed progressive death metal band Gojira, which he formed with his brother Joe Duplantier in 1996. Known for his powerful, precise, and incredibly intense drumming style, Mario combines crushing double bass patterns with complex rhythmic structures that complement Gojira\'s unique blend of death metal and progressive elements. His drumming on albums like "From Mars to Sirius," "The Way of All Flesh," and "Magma" has been praised for its technical excellence and raw energy. Beyond his drumming prowess, Mario is also a talented visual artist who has created artwork for Gojira\'s albums and merchandise. His approach to drumming emphasizes dynamics, groove, and an almost tribal quality that has helped define Gojira\'s distinctive sound.',
    gear: {
      drums: 'Tama Starclassic Walnut/Birch',
      snare: 'Tama S.L.P. 14x6" G-Maple',
      cymbals: 'Meinl Byzance Series (14" Dark Hi-Hats, 18" & 20" Brilliant Heavy Hammered Crashes, 21" Transition Ride, 18" Extra Dry China)',
      hardware: 'Tama Iron Cobra 900 Power Glide Double Pedal, Tama 1st Chair Ergo-Rider Throne',
      sticks: 'Vic Firth X5A'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/0/00/Mario_Duplantier_Gojira_2012.jpg'
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Meinl Cymbals', url: 'https://meinlcymbals.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { youtubeId: 'BGHlZwMYO9g', title: 'Gojira - Silvera (Live Drum Cam)', year: '2017' },
      { youtubeId: 'FNdC_3LR2AI', title: 'Gojira - Stranded (Live Drum Cam)', year: '2017' },
      { youtubeId: 'iqrMFNMgVS0', title: 'Gojira - Flying Whales (Live Drum Cam)', year: '2019' }
    ]
  },
  {
    id: 16,
    name: 'Brann Dailor',
    band: 'Mastodon',
    genre: 'Progressive/Sludge Metal',
    genres: ['Progressive Metal'],
    country: 'USA',
    era: '2000s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Ursynalia_2012%2C_Mastodon_03.jpg',
    bio: 'Brann Dailor, born in 1975 in Rochester, New York, is the drummer and vocalist for progressive sludge metal band Mastodon. His drumming style is characterized by complex fills, jazz-influenced patterns, and an almost melodic approach to the drums that sets him apart from traditional metal drummers. Dailor\'s work on albums like "Leviathan," "Blood Mountain," and "Crack the Skye" has earned him widespread acclaim. He began singing lead vocals on Mastodon\'s later albums, adding another dimension to the band\'s sound. His technical proficiency combined with his musical creativity has made him one of the most influential drummers in modern metal.',
    gear: {
      drums: 'DW Collector\'s Series Maple',
      snare: 'DW Collector\'s Series 14x6.5" Brass',
      cymbals: 'Sabian AAX Series (14" Stage Hi-Hats, 18" & 19" X-Plosion Crashes, 21" Raw Bell Dry Ride, 18" Chinese)',
      hardware: 'DW 9000 Series Double Pedal, DW 9100 Throne',
      sticks: 'Vater Brann Dailor Signature'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/c/cc/Ursynalia_2012%2C_Mastodon_03.jpg'
    ],
    endorsements: [
      { name: 'DW Drums', url: 'https://www.dwdrums.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'Vater Drumsticks', url: 'https://www.vater.com' },
      { name: 'Remo Drumheads', url: 'https://www.remo.com' }
    ],
    videos: [
      { youtubeId: 'Og39wIaLzlQ', title: 'Mastodon - Blood and Thunder (Live Drum Cam)', year: '2019' },
      { youtubeId: 'hwgqenKiMQw', title: 'Mastodon - Oblivion (Live Drum Cam)', year: '2018' },
      { youtubeId: 'mLpYJbvwgXg', title: 'Mastodon - The Motherload (Drum Playthrough)', year: '2017' }
    ]
  },
  {
    id: 17,
    name: 'Chris Adler',
    band: 'Lamb of God',
    genre: 'Groove Metal',
    genres: ['Groove Metal'],
    country: 'USA',
    era: '2000s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/44/2015_RiP_Lamb_of_God_-_Chris_Adler_by_2eight_-_3SC5483.jpg',
    bio: 'Chris Adler, born in 1972 in Richmond, Virginia, is best known as the co-founder and former drummer of Lamb of God. His precision double bass drumming and innovative groove patterns helped define the New Wave of American Heavy Metal. Adler\'s work on albums like "Ashes of the Wake" and "Sacrament" showcased his ability to combine technical proficiency with raw power. He briefly played with Megadeth on their 2016 album "Dystopia." His drumming style emphasizes groove, power, and precision, influencing a generation of metal drummers.',
    gear: {
      drums: 'Mapex Black Panther Design Lab',
      snare: 'Mapex Chris Adler Signature 14x5.5" Walnut/Maple',
      cymbals: 'Meinl Byzance Series (14" Dark Hi-Hats, 18" & 19" Dark Crashes, 21" Transition Ride, 18" Extra Dry China)',
      hardware: 'Mapex Falcon Double Pedal, Mapex T865 Throne',
      sticks: 'Vic Firth Chris Adler Signature'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/4/44/2015_RiP_Lamb_of_God_-_Chris_Adler_by_2eight_-_3SC5483.jpg'
    ],
    endorsements: [
      { name: 'Mapex Drums', url: 'https://www.mapexdrums.com' },
      { name: 'Meinl Cymbals', url: 'https://meinlcymbals.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { youtubeId: 'oqdZpxkzNvc', title: 'Lamb of God - Laid to Rest (Live Drum Cam)', year: '2018' },
      { youtubeId: 'HL9kaJZw8iw', title: 'Lamb of God - Redneck (Live Drum Cam)', year: '2016' },
      { youtubeId: '7t2xmGPPw5g', title: 'Lamb of God - Now You\'ve Got Something to Die For (Drum Playthrough)', year: '2019' }
    ]
  },
  {
    id: 18,
    name: 'Matt Halpern',
    band: 'Periphery',
    genre: 'Progressive/Djent',
    genres: ['Progressive Metal', 'Metalcore/Djent'],
    country: 'USA',
    era: '2010s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Periphery_07_%285587554964%29.jpg',
    bio: 'Matt Halpern, born in 1984, is the drummer for progressive metal band Periphery and one of the most influential figures in the djent movement. His drumming combines polyrhythmic complexity with electronic elements and modern production techniques. Halpern\'s ability to navigate complex time signatures while maintaining groove has made him a role model for a new generation of progressive metal drummers. He is also an accomplished drum educator, sharing his knowledge through clinics and online platforms.',
    gear: {
      drums: 'Mapex Saturn V MH Exotic',
      snare: 'Mapex Black Panther Sledgehammer 14x6.5"',
      cymbals: 'Meinl Byzance Series (15" Dark Hi-Hats, 18" & 20" Extra Dry Medium Crashes, 22" Transition Ride, 18" Extra Dry China)',
      hardware: 'Mapex Falcon Double Pedal, Mapex T865 Throne',
      sticks: 'Vic Firth Matt Halpern Signature'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/8/80/Periphery_07_%285587554964%29.jpg'
    ],
    endorsements: [
      { name: 'Mapex Drums', url: 'https://www.mapexdrums.com' },
      { name: 'Meinl Cymbals', url: 'https://meinlcymbals.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { youtubeId: 'tUl5Y5GMFM4', title: 'Periphery - Marigold (Live Drum Cam)', year: '2019' },
      { youtubeId: 'eLK3xMO1YvY', title: 'Periphery - The Way the News Goes (Drum Playthrough)', year: '2017' },
      { youtubeId: 'Y8F3B-qCQxk', title: 'Periphery - Scarlet (Live Drum Cam)', year: '2020' }
    ]
  },
  {
    id: 19,
    name: 'Inferno',
    band: 'Behemoth',
    genre: 'Black/Death Metal',
    genres: ['Black Metal'],
    country: 'Poland',
    era: '90s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Behemoth_-_Reload_Festival_2024_01.jpg',
    bio: 'Zbigniew Robert Promiński, known as Inferno, born in 1979, is the drummer for Polish extreme metal band Behemoth. He joined the band in 1997 and has been instrumental in shaping their signature sound. His drumming is characterized by relentless blast beats, precise double bass work, and the ability to maintain extreme speeds for extended periods. Inferno\'s technical abilities and stamina have made him one of the most respected drummers in extreme metal. His work on albums like "The Satanist" and "I Loved You at Your Darkest" showcases his evolution as a drummer.',
    gear: {
      drums: 'Pearl Reference Pure',
      snare: 'Pearl Reference 14x5" Steel',
      cymbals: 'Paiste RUDE Series (14" Hi-Hats, 18" & 19" Crashes, 22" Power Ride, 18" China)',
      hardware: 'Pearl Demon Drive Double Pedal, Pearl D-2000 Throne',
      sticks: 'Ahead 5B Aluminum'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Behemoth_-_Reload_Festival_2024_01.jpg'
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Paiste Cymbals', url: 'https://www.paiste.com' },
      { name: 'Ahead Drumsticks', url: 'https://www.aheaddrumsticks.com' },
      { name: 'Remo Drumheads', url: 'https://www.remo.com' }
    ],
    videos: [
      { youtubeId: 'Czx-OIyrQwQ', title: 'Behemoth - Blow Your Trumpets Gabriel (Live Drum Cam)', year: '2018' },
      { youtubeId: 'NkaslVgXhNw', title: 'Behemoth - Ora Pro Nobis Lucifer (Live Drum Cam)', year: '2019' },
      { youtubeId: 'MCsoZ_2ROmY', title: 'Behemoth - Bartzabel (Drum Playthrough)', year: '2020' }
    ]
  },
  {
    id: 20,
    name: 'Hellhammer',
    band: 'Mayhem',
    genre: 'Black Metal',
    genres: ['Black Metal'],
    country: 'Norway',
    era: '80s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Hellhammer_Midgardsblot_2025.jpg',
    bio: 'Jan Axel Blomberg, known as Hellhammer, born in 1969, is a Norwegian drummer best known for his work with black metal pioneers Mayhem. He joined Mayhem in 1988 and has been a constant presence through the band\'s turbulent history. Hellhammer is credited with helping define the black metal drumming style, characterized by fast blast beats and raw, aggressive playing. Beyond Mayhem, he has played with numerous projects including Arcturus, Dimmu Borgir, and Shining. His influence on extreme metal drumming is immeasurable.',
    gear: {
      drums: 'Pearl Masters Premium',
      snare: 'Pearl Sensitone 14x5.5" Steel',
      cymbals: 'Meinl Byzance Series (14" Dark Hi-Hats, 18" & 19" Dark Crashes, 20" Dark Ride, 18" Dark China)',
      hardware: 'Pearl Eliminator Double Pedal, Pearl D-1500 Throne',
      sticks: 'Vic Firth American Classic 5B'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/8/8d/Hellhammer_Midgardsblot_2025.jpg'
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Meinl Cymbals', url: 'https://meinlcymbals.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Remo Drumheads', url: 'https://www.remo.com' }
    ],
    videos: [
      { youtubeId: 'XdV4b1rI4rY', title: 'Mayhem - Freezing Moon (Live Drum Cam)', year: '2017' },
      { youtubeId: 'bZyvI73vDJs', title: 'Mayhem - Chainsaw Gutsfuck (Live Drum Cam)', year: '2018' },
      { youtubeId: 'zT2T69bxWH4', title: 'Mayhem - Pagan Fears (Live Drum Cam)', year: '2019' }
    ]
  },
  {
    id: 21,
    name: 'Pete Sandoval',
    band: 'Morbid Angel',
    genre: 'Death Metal',
    genres: ['Death Metal'],
    country: 'USA',
    era: '80s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Pete_Sandoval_practising_the_drums.jpg',
    bio: 'Pedro "Pete" Sandoval, born in 1960 in El Salvador, is a legendary death metal drummer best known for his work with Morbid Angel and Terrorizer. He is credited with pioneering and perfecting the gravity blast technique, which revolutionized extreme metal drumming. His work on classic Morbid Angel albums like "Altars of Madness," "Blessed Are the Sick," and "Covenant" set the standard for death metal drumming. Sandoval\'s combination of speed, precision, and endurance influenced countless drummers in the extreme metal genre.',
    gear: {
      drums: 'ddrum Dios Series',
      snare: 'ddrum Dios 14x6.5" Maple',
      cymbals: 'Sabian AAX Series (14" Stage Hi-Hats, 18" & 19" X-Plosion Crashes, 20" Stage Ride, 18" Chinese)',
      hardware: 'ddrum Mercury Double Pedal, ddrum Throne',
      sticks: 'Ahead Lars Ulrich Signature'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/2/2d/Pete_Sandoval_practising_the_drums.jpg'
    ],
    endorsements: [
      { name: 'ddrum Drums', url: 'https://www.ddrum.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'Ahead Drumsticks', url: 'https://www.aheaddrumsticks.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { youtubeId: 'QoNbazpnRH4', title: 'Morbid Angel - Immortal Rites (Live Drum Cam)', year: '2017' },
      { youtubeId: 'O2G7JW6lBz8', title: 'Morbid Angel - Chapel of Ghouls (Live Drum Cam)', year: '2018' },
      { youtubeId: 'fT_UqTtpZKE', title: 'Morbid Angel - Maze of Torment (Drum Playthrough)', year: '2016' }
    ]
  },
  {
    id: 22,
    name: 'Shannon Larkin',
    band: 'Godsmack / Ugly Kid Joe / Wrathchild America',
    genre: 'Alternative Metal / Hard Rock',
    genres: ['Nu-Metal', 'Groove Metal'],
    country: 'USA',
    era: '90s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/2019_RiP_Godsmack_-_by_2eight_-_8SC8529_%28cropped%29.jpg',
    bio: 'Shannon Larkin, born in 1967 in Chicago, is an American drummer best known as the longtime drummer of Godsmack (2002-2024). His powerful, groove-oriented drumming style helped define Godsmack\'s hard rock sound across six studio albums including "Faceless," "IV," and "The Oracle." Before Godsmack, he played with Ugly Kid Joe, Wrathchild America (later Souls at Zero), Amen, and Candlebox. Known for his solid grooves, dynamic fills, and energetic live performances.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Shannon_Larkin',
      'https://www.instagram.com/shannonlarkin_13/'
    ],
    gear: {
      drums: 'Pearl Reference Pure',
      snare: 'Pearl Reference 14x6.5" Brass',
      cymbals: 'Sabian AAX Series (14" Stage Hi-Hats, 18" & 19" X-Plosion Crashes, 21" Raw Bell Dry Ride, 18" AAX Chinese)',
      hardware: 'Pearl Demon Drive Double Pedal, Pearl D-2000 Roadster Throne',
      sticks: 'Promark Shannon Larkin Signature'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/e/eb/2019_RiP_Godsmack_-_by_2eight_-_8SC8529_%28cropped%29.jpg'
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'Promark Sticks', url: 'https://www.daddario.com/promark' }
    ],
    videos: [
      { youtubeId: 'yDT7GDw6TEw', title: 'Godsmack - I Stand Alone (Live Drum Cam)', year: '2019' },
      { youtubeId: 'awT8FFHKikc', title: 'Godsmack - Whatever (Live Drum Cam)', year: '2018' }
    ]
  },
  {
    id: 23,
    name: 'Raymond Herrera',
    band: 'Fear Factory / Arkaea / Brujeria',
    genre: 'Industrial Metal / Extreme Metal',
    genres: ['Groove Metal', 'Death Metal'],
    country: 'USA',
    era: '90s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Fear_Factory_-_Elbriot_2016_02_%28cropped%29.jpg',
    bio: 'Raymond Herrera is an American musician and founding member of the industrial metal band Fear Factory. His innovative "stop-go" double bass technique helped define Fear Factory\'s signature sound on classic albums like "Demanufacture" and "Obsolete." He also composed music for video games including Tom Clancy\'s Ghost Recon Advanced Warfighter and Iron Man 2.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Raymond_Herrera'
    ],
    gear: {
      drums: 'Tama Starclassic Performer',
      snare: 'Tama S.L.P. 14x5.5" Steel',
      cymbals: 'Zildjian A Custom Series (14" Hi-Hats, 17" & 18" Crashes, 20" Ride, 18" China)',
      hardware: 'DW 5000 Series Double Pedal, Tama Wide Rider Throne',
      sticks: 'Promark 5A Oak Nylon Tip'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/d/d1/Fear_Factory_-_Elbriot_2016_02_%28cropped%29.jpg'
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'DW Hardware', url: 'https://www.dwdrums.com' }
    ],
    videos: [
      { youtubeId: 'iZrTYPSL_2E', title: 'Fear Factory - Replica (Live Drum Cam)', year: '2005' },
      { youtubeId: 'uFLwAm2rIEY', title: 'Fear Factory - Demanufacture (Live)', year: '2004' }
    ]
  },
  {
    id: 24,
    name: 'Morgan Ågren',
    band: 'Mats/Morgan Band / Kaipa / Fredrik Thordendal\'s Special Defects',
    genre: 'Progressive Rock / Jazz Fusion',
    genres: ['Progressive Metal'],
    country: 'Sweden',
    era: '90s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Morgan_Agren_04.jpg',
    bio: 'Morgan Ågren, born in 1967 in Umeå, Sweden, is one of the most technically accomplished drummers in progressive rock and fusion. He gained metal recognition for his work on Fredrik Thordendal\'s (Meshuggah) solo album "Sol Niger Within." He has collaborated with Dweezil Zappa, Devin Townsend (Casualties of Cool, Empath), and Bill Laswell.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Morgan_%C3%85gren'
    ],
    gear: {
      drums: 'Sonor SQ2 Beech',
      snare: 'Sonor Designer 14x5.5" Maple',
      cymbals: 'Meinl Byzance Series (15" Sand Hi-Hats, 18" & 20" Extra Dry Crashes, 22" Foundry Reserve Ride)',
      hardware: 'Sonor Giant Step Double Pedal, Sonor Drummer Throne',
      sticks: 'Vic Firth American Classic 5A'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/1/12/Morgan_Agren_04.jpg'
    ],
    endorsements: [
      { name: 'Sonor Drums', url: 'https://www.sonor.com' },
      { name: 'Meinl Cymbals', url: 'https://meinlcymbals.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
    ],
    videos: [
      { youtubeId: 'W1OBtP4_xNc', title: 'Mats/Morgan Band - Live Performance', year: '2018' },
      { youtubeId: 'JNz2FB9ABYQ', title: 'Morgan Ågren - Drum Solo (Mats/Morgan)', year: '2017' }
    ]
  },
  {
    id: 25,
    name: 'Igor Cavalera',
    band: 'Sepultura / Cavalera Conspiracy / Soulwax',
    genre: 'Thrash Metal / Groove Metal',
    genres: ['Thrash Metal', 'Groove Metal'],
    country: 'Brazil',
    era: '80s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Iggor_Cavalera_in_Sao_Paulo%2C_2006.jpg',
    bio: 'Igor Cavalera, born in 1970 in Belo Horizonte, Brazil, is best known as the co-founder and original drummer of Sepultura, one of the most influential thrash/death metal bands to emerge from South America. He co-founded the band with his brother Max in 1984 when he was just 13 years old. His tribal-influenced drumming style helped define Sepultura\'s unique sound, particularly on landmark albums like "Beneath the Remains," "Arise," and "Roots." After leaving Sepultura in 2006, he reunited with Max in Cavalera Conspiracy and has expanded into electronic music with his DJ project Mixhell.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Igor_Cavalera',
      'https://www.instagram.com/igloocavalera/',
      'https://www.discogs.com/artist/252932-Igor-Cavalera',
      'https://www.allmusic.com/artist/igor-cavalera-mn0000080913'
    ],
    gear: {
      drums: 'ddrum Hybrid Kit',
      snare: 'ddrum 14x6.5" Maple',
      cymbals: 'Zildjian A Custom Series (14" Hi-Hats, 18" & 19" Crashes, 21" Ride, 18" China)',
      hardware: 'DW 5000 Series Double Pedal, ddrum Throne',
      sticks: 'Vic Firth American Classic 5B'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/5/57/Iggor_Cavalera_in_Sao_Paulo%2C_2006.jpg'
    ],
    endorsements: [
      { name: 'ddrum Drums', url: 'https://www.ddrum.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Remo Drumheads', url: 'https://www.remo.com' }
    ],
    videos: [
      { youtubeId: 'F_6IjeprfEs', title: 'Sepultura - Roots Bloody Roots (Live Drum Cam)', year: '1996' },
      { youtubeId: '6ODNxy3YOPU', title: 'Sepultura - Arise (Live Drum Cam)', year: '2017' },
      { youtubeId: 'NiwqRSCWw2g', title: 'Cavalera Conspiracy - Inflikted (Live)', year: '2018' }
    ]
  },
  {
    id: 26,
    name: 'Scott Travis',
    band: 'Judas Priest / Racer X / Thin Lizzy',
    genre: 'Heavy Metal / Speed Metal',
    genres: ['Thrash Metal', 'Progressive Metal'],
    country: 'USA',
    era: '80s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Scott_Travis.jpg',
    bio: 'Scott Travis, born in 1961 in Norfolk, Virginia, is an American drummer best known as the drummer for Judas Priest since 1989. He made his debut on the landmark album "Painkiller," which reinvigorated the band with its aggressive, speed metal approach. Travis was the first non-British member of Judas Priest and brought a new level of technical proficiency to the band. Before Priest, he played with Racer X and has since also performed with Thin Lizzy, Fight, and Elegant Weapons. He was inducted into the Rock and Roll Hall of Fame as a member of Judas Priest in 2022.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Scott_Travis',
      'https://www.discogs.com/artist/271377-Scott-Travis',
      'https://www.allmusic.com/artist/scott-travis-mn0000301024'
    ],
    gear: {
      drums: 'DW Collector\'s Series Maple',
      snare: 'DW Collector\'s 14x6.5" Bronze',
      cymbals: 'Paiste RUDE & 2002 Series (14" Hi-Hats, 18" & 19" Crashes, 22" Power Ride, 20" China)',
      hardware: 'DW 9000 Series Double Pedal, DW 9100 Throne',
      sticks: 'Vic Firth American Classic 5B'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/8/83/Scott_Travis.jpg'
    ],
    endorsements: [
      { name: 'DW Drums', url: 'https://www.dwdrums.com' },
      { name: 'Paiste Cymbals', url: 'https://www.paiste.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Remo Drumheads', url: 'https://www.remo.com' }
    ],
    videos: [
      { youtubeId: 'nM__lPTWThU', title: 'Judas Priest - Painkiller (Live Drum Cam)', year: '2019' },
      { youtubeId: 'TQtpmHbcL_o', title: 'Judas Priest - Electric Eye (Live Drum Cam)', year: '2018' },
      { youtubeId: '0p_1QSUsbsM', title: 'Scott Travis Drum Solo (Judas Priest Live)', year: '2019' }
    ]
  },
  {
    id: 27,
    name: 'Paul Bostaph',
    band: 'Slayer / Testament / Forbidden / Exodus',
    genre: 'Thrash Metal',
    genres: ['Thrash Metal'],
    country: 'USA',
    era: '90s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Paul_Bostaph_with_Slayer_in_2013_%28cropped%29.jpg',
    bio: 'Paul Bostaph, born in 1964 in Newark, California, is an American drummer best known for his tenure with Slayer, serving as their drummer from 1992-2001, 2013-2019, and returning for their 2024 reunion. He replaced Dave Lombardo and recorded classic albums including "Divine Intervention" and "Diabolus in Musica." Before Slayer, he was a founding member of Forbidden, recording "Forbidden Evil" and "Twisted into Form." He has also played with Testament, Exodus, and Systematic.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Paul_Bostaph',
      'https://www.instagram.com/paulbostaph/',
      'https://www.discogs.com/artist/252900-Paul-Bostaph',
      'https://www.allmusic.com/artist/paul-bostaph-mn0000339180'
    ],
    gear: {
      drums: 'ddrum Paladin Series',
      snare: 'ddrum Paladin 14x6.5" Maple',
      cymbals: 'Zildjian A Custom Series (14" Hi-Hats, 18" & 19" Crashes, 21" Ride, 18" China)',
      hardware: 'ddrum Mercury Double Pedal, ddrum Throne',
      sticks: 'Vic Firth American Classic 5B'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/b/b7/Paul_Bostaph_with_Slayer_in_2013_%28cropped%29.jpg'
    ],
    endorsements: [
      { name: 'ddrum Drums', url: 'https://www.ddrum.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { youtubeId: 'z8ZqFlw6hYg', title: 'Slayer - Raining Blood (Live Drum Cam)', year: '2018' },
      { youtubeId: 'r7cWi41XGCM', title: 'Slayer - Angel of Death (Live Drum Cam)', year: '2019' },
      { youtubeId: 'K6_zsJ8KPP0', title: 'Paul Bostaph - Slayer Drum Solo', year: '2017' }
    ]
  },
  {
    id: 28,
    name: 'Flo Mounier',
    band: 'Cryptopsy',
    genre: 'Technical Death Metal',
    genres: ['Death Metal'],
    country: 'Canada',
    era: '90s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Cryptopsy_Party.San_Metal_Open_Air_2017_10.jpg',
    bio: 'Flo Mounier is a Canadian drummer and the only constant member of technical death metal pioneers Cryptopsy since joining in 1992. His drumming on landmark albums like "None So Vile" and "Whisper Supremacy" set new standards for extreme metal drumming, featuring incredibly fast blast beats, complex patterns, and inhuman stamina. Mounier is widely regarded as one of the most technically proficient drummers in death metal.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Cryptopsy',
      'https://www.instagram.com/flomounier/',
      'https://www.discogs.com/artist/306936-Flo-Mounier',
      'https://www.allmusic.com/artist/flo-mounier-mn0001545138'
    ],
    gear: {
      drums: 'Pearl Reference Series',
      snare: 'Pearl Reference 14x5" Steel',
      cymbals: 'Sabian AAX Series (14" Stage Hi-Hats, 17" & 18" X-Plosion Crashes, 21" Raw Bell Dry Ride, 18" AAXtreme China)',
      hardware: 'Pearl Demon Drive Double Pedal, Pearl D-2000 Throne',
      sticks: 'Vater Power 5B'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/8/89/Cryptopsy_Party.San_Metal_Open_Air_2017_10.jpg'
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'Vater Drumsticks', url: 'https://www.vater.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { youtubeId: 'q3JeR9z3_GA', title: 'Cryptopsy - Phobophile (Live Drum Cam)', year: '2018' },
      { youtubeId: 'PXTY7IUcDjA', title: 'Cryptopsy - Crown of Horns (Live Drum Cam)', year: '2017' },
      { youtubeId: 'VA0qlVIw0hw', title: 'Flo Mounier - Extreme Drumming Masterclass', year: '2019' }
    ]
  },
  {
    id: 29,
    name: 'Richard Christy',
    band: 'Death / Control Denied / Iced Earth / Charred Walls of the Damned',
    genre: 'Technical Death Metal / Progressive Metal',
    genres: ['Death Metal', 'Progressive Metal'],
    country: 'USA',
    era: '90s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Sal%2C_Leyla_%26_Richard_Christy_%284902556102%29.jpg',
    bio: 'Richard Christy, born in 1974 in Fort Scott, Kansas, is an American drummer known for his work with Death, Control Denied, Iced Earth, and his own band Charred Walls of the Damned. His drumming on Death\'s "The Sound of Perseverance" and Control Denied\'s "The Fragile Art of Existence" showcased his exceptional technical ability and musicality. Christy later joined Iced Earth before transitioning to entertainment on The Howard Stern Show.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Richard_Christy',
      'https://www.instagram.com/richardchristy/',
      'https://www.discogs.com/artist/254393-Richard-Christy',
      'https://www.allmusic.com/artist/richard-christy-mn0000321789'
    ],
    gear: {
      drums: 'Tama Starclassic Maple',
      snare: 'Tama S.L.P. 14x6.5" G-Maple',
      cymbals: 'Meinl Byzance Series (14" Dark Hi-Hats, 18" & 19" Dark Crashes, 21" Transition Ride, 18" Extra Dry China)',
      hardware: 'Tama Iron Cobra 900 Double Pedal, Tama 1st Chair Throne',
      sticks: 'Vater Power 5B'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/8/8f/Sal%2C_Leyla_%26_Richard_Christy_%284902556102%29.jpg'
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Meinl Cymbals', url: 'https://meinlcymbals.com' },
      { name: 'Vater Drumsticks', url: 'https://www.vater.com' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' }
    ],
    videos: [
      { youtubeId: 'l5x7D0DJyYg', title: 'Death - The Flesh and the Power It Holds (Drum Cam)', year: '2018' },
      { youtubeId: 'zqfFrJUrKbw', title: 'Iced Earth - Dracula (Live Drum Cam)', year: '2017' },
      { youtubeId: 'bKdMXv2k8d8', title: 'Charred Walls of the Damned - Ghost Town (Drum Playthrough)', year: '2019' }
    ]
  },
  {
    id: 30,
    name: 'Derek Roddy',
    band: 'Hate Eternal / Nile / Malevolent Creation / Serpents Rise',
    genre: 'Technical Death Metal',
    genres: ['Death Metal'],
    country: 'USA',
    era: '2000s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Derek_Roddy_2003_%28cropped%29.jpg',
    bio: 'Derek Roddy, born in 1972 in Myrtle Beach, South Carolina, is an American drummer known for his extreme speed and technical proficiency. His ability to record entire drum tracks in one or two takes earned him the nickname "One Take." He gained prominence with Hate Eternal, recording "King of All Kings" and "I, Monarch," and also recorded with Nile, Malevolent Creation, and Today Is the Day. Roddy is also an accomplished drum educator.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Derek_Roddy',
      'https://www.instagram.com/derekroddyofficial/',
      'https://www.discogs.com/artist/301166-Derek-Roddy',
      'https://www.allmusic.com/artist/derek-roddy-mn0000657182'
    ],
    gear: {
      drums: 'DW Collector\'s Series Maple',
      snare: 'DW Collector\'s 14x6.5" Bronze',
      cymbals: 'Meinl Byzance Series (13" Serpents Hi-Hats, 16" & 18" Soundcaster Crashes, 21" Byzance Serpents Ride, 18" Mb20 Rock China)',
      hardware: 'Axis A Longboard Double Pedal, DW 9100 Throne',
      sticks: 'Vater Derek Roddy Signature'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/d/d7/Derek_Roddy_2003_%28cropped%29.jpg'
    ],
    endorsements: [
      { name: 'DW Drums', url: 'https://www.dwdrums.com' },
      { name: 'Meinl Cymbals', url: 'https://meinlcymbals.com' },
      { name: 'Vater Drumsticks', url: 'https://www.vater.com' },
      { name: 'Axis Percussion', url: 'https://www.axispercussion.com' },
      { name: 'Remo Drumheads', url: 'https://www.remo.com' }
    ],
    videos: [
      { youtubeId: 'Jx7rHzP9fXg', title: 'Hate Eternal - King of All Kings (Live Drum Cam)', year: '2018' },
      { youtubeId: 'RzK3nJh6c2g', title: 'Nile - Black Seeds of Vengeance (Drum Playthrough)', year: '2017' },
      { youtubeId: '9fD_xYRBhNQ', title: 'Derek Roddy - Extreme Drumming Techniques', year: '2019' }
    ]
  },
  {
    id: 51,
    name: 'Paul Mazurkiewicz',
    band: 'Cannibal Corpse',
    genre: 'Death Metal',
    genres: ['Death Metal'],
    country: 'USA',
    era: '80s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Cannibal_Corpse_Rockharz_2018_03.jpg',
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
      sticks: 'Vic Firth American Classic 5B'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/8/8e/Cannibal_Corpse_Rockharz_2018_03.jpg'
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
    ],
    videos: [
      { youtubeId: 'InGtiEXQyF0', title: 'Cannibal Corpse - Hammer Smashed Face (Drum Cam)', year: '2018' }
    ]
  },
  {
    id: 52,
    name: 'Mike Mangini',
    band: 'Dream Theater',
    genre: 'Progressive Metal',
    genres: ['Progressive Metal'],
    country: 'USA',
    era: '2010s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Mike_Mangini_at_Moscow_12_Jul_2011_%28cropped%29.jpg',
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
      sticks: 'Vic Firth Mike Mangini Signature'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/b/bf/Mike_Mangini_at_Moscow_12_Jul_2011_%28cropped%29.jpg'
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
    ],
    videos: [
      { youtubeId: 'FwkcRTNMsWs', title: 'Dream Theater - The Dance of Eternity (Drum Cam)', year: '2019' }
    ]
  },
  {
    id: 53,
    name: 'Matt Garstka',
    band: 'Animals as Leaders',
    genre: 'Progressive Metal / Djent',
    genres: ['Progressive Metal', 'Metalcore/Djent'],
    country: 'USA',
    era: '2010s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Matt_Garstka_-_2014_NAMM_Show_%28cropped%29.jpg',
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
      sticks: 'Vic Firth Matt Garstka Signature'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/f/f8/Matt_Garstka_-_2014_NAMM_Show_%28cropped%29.jpg'
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Meinl Cymbals', url: 'https://meinlcymbals.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
    ],
    videos: [
      { youtubeId: '9P4GsF1zdzM', title: 'Animals as Leaders - Physical Education (Drum Playthrough)', year: '2014' }
    ]
  },
  {
    id: 54,
    name: 'Daniel Erlandsson',
    band: 'Arch Enemy',
    genre: 'Melodic Death Metal',
    genres: ['Death Metal'],
    country: 'Sweden',
    era: '90s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/2023_Rock_im_Park_-_Arch_Enemy_-_Daniel_Erlandsson_-_by_2eight_-_ZSC4502.jpg',
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
      sticks: 'Vic Firth American Classic 5B'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/f/f4/2023_Rock_im_Park_-_Arch_Enemy_-_Daniel_Erlandsson_-_by_2eight_-_ZSC4502.jpg'
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Paiste Cymbals', url: 'https://www.paiste.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
    ],
    videos: [
      { youtubeId: 'n9AcG0glVu4', title: 'Arch Enemy - Nemesis (Drum Cam)', year: '2017' }
    ]
  },
  {
    id: 55,
    name: 'Jaska Raatikainen',
    band: 'Children of Bodom',
    genre: 'Melodic Death Metal / Power Metal',
    genres: ['Death Metal', 'Progressive Metal'],
    country: 'Finland',
    era: '90s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Jaska_Raatikainen_-_Ilosaarirock_2009_%28cropped%29.jpg',
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
      sticks: 'Vic Firth American Classic 5A'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/c/c1/Jaska_Raatikainen_-_Ilosaarirock_2009_%28cropped%29.jpg'
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
    ],
    videos: [
      { youtubeId: 'pQvHwCaQYio', title: 'Children of Bodom - In Your Face (Drum Cam)', year: '2011' }
    ]
  },
  {
    id: 56,
    name: 'Hannes Grossmann',
    band: 'Obscura / ex-Necrophagist / Alkaloid',
    genre: 'Technical Death Metal',
    genres: ['Death Metal'],
    country: 'Germany',
    era: '2000s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Hannes_wiki2.jpg',
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
      sticks: 'Vic Firth American Classic 5B'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/c/c1/Hannes_wiki2.jpg'
    ],
    endorsements: [
      { name: 'DW Drums', url: 'https://www.dwdrums.com' },
      { name: 'Meinl Cymbals', url: 'https://meinlcymbals.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
    ],
    videos: [
      { youtubeId: 'L4sQvHXaYEE', title: 'Obscura - Anticosmic Overload (Drum Playthrough)', year: '2016' }
    ]
  },
  {
    id: 57,
    name: 'Daray',
    band: 'Dimmu Borgir / Vader',
    genre: 'Black Metal / Death Metal',
    genres: ['Black Metal', 'Death Metal'],
    country: 'Poland',
    era: '2000s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Dariusz_Brzozowski.jpg',
    bio: 'Dariusz "Daray" Brzozowski (born August 23, 1984) is a Polish drummer known for his work with Norwegian symphonic black metal band Dimmu Borgir (since 2008) and Polish death metal legends Vader (2006-2016). His drumming combines extreme speed, technical precision, and theatrical flair.',
    sameAs: [
      'https://www.discogs.com/artist/868449-Daray'
    ],
    gear: {
      drums: 'Pearl Masterworks Stadium Exotic',
      snare: 'Pearl Reference 14x5.5" Brass',
      cymbals: 'Paiste RUDE & 2002 Series (14" RUDE Hi-Hats, 17" & 18" RUDE Crashes, 22" RUDE Power Ride)',
      hardware: 'Pearl Demon XR Double Pedal',
      sticks: 'Vic Firth American Classic Extreme 5B'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/4/49/Dariusz_Brzozowski.jpg'
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Paiste Cymbals', url: 'https://www.paiste.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
    ],
    videos: [
      { youtubeId: 'joYKnDbwUoI', title: 'Dimmu Borgir - Progenies of the Great Apocalypse (Drum Cam)', year: '2018' }
    ]
  },
  {
    id: 58,
    name: 'Jocke Wallgren',
    band: 'Amon Amarth',
    genre: 'Melodic Death Metal / Viking Metal',
    genres: ['Death Metal'],
    country: 'Sweden',
    era: '2010s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Amon_Amarth_%2827839859354%29.jpg',
    bio: 'Jocke Wallgren (born April 1, 1986) is a Swedish drummer who joined melodic death metal band Amon Amarth in 2016, replacing Fredrik Andersson. His drumming brings a fresh energy to Amon Amarth\'s Viking-themed sound, combining powerful double bass patterns with groove-oriented playing.',
    sameAs: [
      'https://www.discogs.com/artist/2723584-Jocke-Wallgren'
    ],
    gear: {
      drums: 'Pearl Reference Pure',
      snare: 'Pearl Reference 14x6.5" Brass',
      cymbals: 'Zildjian A Custom & K Custom Series (14" A Custom Hi-Hats, 18" & 19" A Custom Crashes, 21" K Custom Ride)',
      hardware: 'Pearl Demon Drive Double Pedal',
      sticks: 'Vic Firth American Classic 5B'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/1/1d/Amon_Amarth_%2827839859354%29.jpg'
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
    ],
    videos: [
      { youtubeId: 'mLpxoixOUPE', title: 'Amon Amarth - Raise Your Horns (Drum Cam)', year: '2018' }
    ]
  },
  {
    id: 59,
    name: 'Tim Yeung',
    band: 'Morbid Angel / Hate Eternal / Vital Remains',
    genre: 'Death Metal / Technical Death Metal',
    genres: ['Death Metal'],
    country: 'USA',
    era: '2000s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/79/DevineHerecy002_sharp.jpg',
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
      sticks: 'Vic Firth American Classic 5A'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/7/79/DevineHerecy002_sharp.jpg'
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
    ],
    videos: [
      { youtubeId: 'xJj5XLSz2Uk', title: 'Morbid Angel - Immortal Rites (Live Drum Cam)', year: '2019' }
    ]
  },
  {
    id: 60,
    name: 'Kevin Talley',
    band: 'Dying Fetus / Misery Index / Six Feet Under',
    genre: 'Brutal Death Metal / Grindcore',
    genres: ['Death Metal'],
    country: 'USA',
    era: '2000s',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/MiseryIndex_band1.jpg',
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
      sticks: 'Vic Firth American Classic 5B'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/a/ad/MiseryIndex_band1.jpg'
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
    ],
    videos: [
      { youtubeId: 'mC6qAs9M3Kk', title: 'Dying Fetus - Destroy the Opposition (Drum Cam)', year: '2008' }
    ]
  }
];

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// List all drummers
app.get('/api/drummers', (req, res) => {
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

  res.json(results.map(({ id, name, band, genre, genres, country, image, quotes }) => ({
    id, name, band, genre, genres, country, image, quotes
  })));
});

// Get drummer details
app.get('/api/drummers/:id', (req, res) => {
  const drummer = drummers.find(d => d.id === parseInt(req.params.id));
  if (!drummer) {
    return res.status(404).json({ error: 'Drummer not found' });
  }
  res.json(drummer);
});

// Gear items data
const gearItems = [
  {
    id: 1,
    slug: 'tama-iron-cobra-900-double-pedal',
    name: 'Tama Iron Cobra 900 Power Glide Double Pedal',
    category: 'hardware',
    brand: 'Tama',
    description: 'The Tama Iron Cobra 900 is one of the most popular double bass pedals in metal drumming. Known for its smooth Power Glide cam, quick response, and durability, it has been the pedal of choice for many legendary drummers. The Iron Cobra features a rolling glide design that provides a linear feel throughout the stroke.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Speed_Cobra_Single.jpg',
    specs: {
      camType: 'Power Glide',
      beaterType: 'Dual-surface (felt/plastic)',
      footboard: 'Speed Cobra-style footboard',
      case: 'Included hard case'
    },
    priceEur: 450,
    priceUsd: 486,
    drummerIds: [1, 3, 7, 15, 16, 13]
  },
  {
    id: 2,
    slug: 'meinl-byzance-series-cymbals',
    name: 'Meinl Byzance Series Cymbals',
    category: 'cymbals',
    brand: 'Meinl',
    description: 'Meinl Byzance cymbals are hand-hammered in Turkey using traditional B20 bronze alloy. The series offers a wide range of sounds from dark and trashy to bright and cutting. Popular with progressive and extreme metal drummers for their complex overtones and dynamic response.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/49/2006-07-06_crash_paiste_16.jpg',
    specs: {
      material: 'B20 Bronze',
      finish: 'Traditional/Brilliant/Extra Dry',
      manufacturing: 'Hand-hammered',
      origin: 'Turkey'
    },
    priceEur: 2400,
    priceUsd: 2592,
    drummerIds: [15, 16, 17, 18, 20]
  },
  {
    id: 3,
    slug: 'paiste-rude-series-cymbals',
    name: 'Paiste RUDE Series Cymbals',
    category: 'cymbals',
    brand: 'Paiste',
    description: 'Paiste RUDE cymbals are designed specifically for heavy hitting drummers. Made from CuSn8 bronze (2002 Bronze), they deliver cutting, aggressive tones that cut through the loudest stage volumes. A staple in thrash and death metal drumming since the 1980s.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Paiste_cymbal_close.jpg',
    specs: {
      material: 'CuSn8 Bronze (2002 Bronze)',
      finish: 'Colored finish (various)',
      manufacturing: 'Machine-made',
      origin: 'Switzerland'
    },
    priceEur: 2000,
    priceUsd: 2160,
    drummerIds: [2, 4, 12, 19]
  },
  {
    id: 4,
    slug: 'zildjian-a-custom-series-cymbals',
    name: 'Zildjian A Custom Series Cymbals',
    category: 'cymbals',
    brand: 'Zildjian',
    description: 'The Zildjian A Custom series delivers bright, cutting tones with a quick response. Created with a proprietary process that includes machine hammering and brilliant finishing, A Customs have become a standard in rock and metal drumming for their projection and clarity.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Zildjian_a_18_inch_china_cymbal.JPG',
    specs: {
      material: 'B20 Bronze',
      finish: 'Brilliant',
      manufacturing: 'Machine-hammered',
      origin: 'USA'
    },
    priceEur: 2200,
    priceUsd: 2376,
    drummerIds: [1, 3, 6, 10]
  },
  {
    id: 5,
    slug: 'vic-firth-american-classic-5b',
    name: 'Vic Firth American Classic 5B Drumsticks',
    category: 'sticks',
    brand: 'Vic Firth',
    description: 'The Vic Firth American Classic 5B is one of the most popular drumstick models in the world. Slightly larger than a 5A with a bold sound and full feel, the 5B offers excellent balance and durability. The tear drop tip produces a rich, full tone on cymbals.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/32/2006-07-05_sticks.jpg',
    specs: {
      length: '16"',
      diameter: '.595"',
      tip: 'Tear drop wood',
      material: 'Hickory'
    },
    priceEur: 12,
    priceUsd: 13,
    drummerIds: [3, 4, 11, 20]
  },
  {
    id: 6,
    slug: 'pearl-demon-drive-double-pedal',
    name: 'Pearl Demon Drive Double Pedal',
    category: 'hardware',
    brand: 'Pearl',
    description: 'The Pearl Demon Drive is an advanced double bass pedal featuring the innovative NiNjA Bearing technology for ultra-smooth action. With interchangeable cams and click-lock spring tension, it offers unparalleled customization for demanding drummers.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Speed_Cobra_Single.jpg',
    specs: {
      camType: 'Interchangeable (Direct/Standard)',
      beaterType: 'Demon Beater (switchable)',
      footboard: 'PowerShifter Long Board',
      bearings: 'NiNjA Bearings'
    },
    priceEur: 550,
    priceUsd: 594,
    drummerIds: [2, 4, 18, 19]
  },
  {
    id: 7,
    slug: 'tama-starclassic-walnut-birch-drums',
    name: 'Tama Starclassic Walnut/Birch Drums',
    category: 'drums',
    brand: 'Tama',
    description: 'Tama Starclassic Walnut/Birch drums combine the warmth and low-end of walnut with the attack and projection of birch. This hybrid shell construction delivers a versatile sound suitable for studio and stage, favored by many professional metal drummers.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/df/2006-07-06_drum_set.jpg',
    specs: {
      shells: 'Walnut/Birch hybrid',
      plies: '6mm (5-ply)',
      hoops: 'Die-Cast',
      lugs: 'Star-Cast mounting system'
    },
    priceEur: 3800,
    priceUsd: 4104,
    drummerIds: [3, 15, 16]
  },
  {
    id: 8,
    slug: 'pearl-reference-series-drums',
    name: 'Pearl Reference Series Drums',
    category: 'drums',
    brand: 'Pearl',
    description: 'Pearl Reference drums feature the innovative Reference Shell construction with birch, maple, and mahogany plies. Each shell size is specifically designed with optimal wood combinations for that drum\'s role, delivering focused tone and maximum projection.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/df/2006-07-06_drum_set.jpg',
    specs: {
      shells: 'Birch/Maple/Mahogany hybrid',
      plies: 'Size-specific',
      hoops: 'MasterCast',
      lugs: 'Reference lug design'
    },
    priceEur: 3500,
    priceUsd: 3780,
    drummerIds: [4, 8, 18]
  },
  {
    id: 9,
    slug: 'sonor-sq2-heavy-beech-drums',
    name: 'Sonor SQ2 Heavy Beech Drums',
    category: 'drums',
    brand: 'Sonor',
    description: 'Sonor SQ2 drums with Heavy Beech shells are custom-built in Germany. The dense beech wood delivers powerful projection and sustain, making them ideal for heavy music. The SQ2 system allows complete customization of shell configurations.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/df/2006-07-06_drum_set.jpg',
    specs: {
      shells: 'Heavy Beech',
      plies: '9mm (7-ply)',
      hoops: 'Die-Cast',
      hardware: 'TAR (Tube And Ring) mount'
    },
    priceEur: 5500,
    priceUsd: 5940,
    drummerIds: [5, 14, 20]
  },
  {
    id: 10,
    slug: 'sabian-hhx-series-cymbals',
    name: 'Sabian HHX Series Cymbals',
    category: 'cymbals',
    brand: 'Sabian',
    description: 'Sabian HHX cymbals combine hand-hammering with modern manufacturing for a dark, complex sound. The HHX line offers excellent dynamic range and musical warmth, making them popular with progressive and modern metal drummers.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Sabian_O-zone_cymbal.jpg',
    specs: {
      material: 'B20 Bronze',
      finish: 'Natural/Brilliant',
      manufacturing: 'Hand-hammered',
      origin: 'Canada'
    },
    priceEur: 2200,
    priceUsd: 2376,
    drummerIds: [5, 13]
  }
];

// Get related gear items (same category or brand)
function getRelatedGear(gear) {
  return gearItems
    .filter(g => g.id !== gear.id && (g.category === gear.category || g.brand === gear.brand))
    .slice(0, 4)
    .map(({ id, slug, name, category, brand, image, priceEur }) => ({
      id, slug, name, category, brand, image, priceEur
    }));
}

// List all gear items
app.get('/api/gear', (req, res) => {
  const { category, brand } = req.query;
  let results = gearItems;

  if (category) {
    results = results.filter(g =>
      g.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (brand) {
    results = results.filter(g =>
      g.brand.toLowerCase().includes(brand.toLowerCase())
    );
  }

  res.json(results.map(({ id, slug, name, category, brand, image, priceEur, priceUsd }) => ({
    id, slug, name, category, brand, image, priceEur, priceUsd
  })));
});

// Get gear by slug
app.get('/api/gear/:slug', (req, res) => {
  const gear = gearItems.find(g => g.slug === req.params.slug);
  if (!gear) {
    return res.status(404).json({ error: 'Gear not found' });
  }

  // Get the drummers who use this gear
  const usedBy = gear.drummerIds
    .map(id => drummers.find(d => d.id === id))
    .filter(Boolean)
    .map(d => ({ id: d.id, name: d.name, band: d.band, image: d.image }));

  // Get related gear
  const relatedGear = getRelatedGear(gear);

  res.json({
    ...gear,
    usedBy,
    relatedGear
  });
});

// Get all drummers with spotlight data
app.get('/api/spotlights', (req, res) => {
  const spotlightDrummers = drummers
    .filter(d => d.spotlight)
    .map(({ id, name, band, genre, genres, country, image, spotlight }) => ({
      id, name, band, genre, genres, country, image, spotlight
    }));
  res.json(spotlightDrummers);
});

// Get current week's spotlight drummer (deterministic based on week number)
app.get('/api/spotlight/current', (req, res) => {
  const spotlightDrummers = drummers.filter(d => d.spotlight);
  if (spotlightDrummers.length === 0) {
    return res.status(404).json({ error: 'No spotlight drummers available' });
  }
  
  // Get week number of the year for rotation
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const weekNumber = Math.floor((now - startOfYear) / (7 * 24 * 60 * 60 * 1000));
  
  // Use week number to select a drummer (cycles through available spotlights)
  const index = weekNumber % spotlightDrummers.length;
  const drummer = spotlightDrummers[index];
  
  res.json({
    id: drummer.id,
    name: drummer.name,
    band: drummer.band,
    genre: drummer.genre,
    genres: drummer.genres,
    country: drummer.country,
    image: drummer.image,
    spotlight: drummer.spotlight,
    weekNumber: weekNumber,
    totalSpotlights: spotlightDrummers.length
  });
});

// Get all quotes from all drummers
app.get('/api/quotes', (req, res) => {
  const limit = parseInt(req.query.limit) || 100;
  
  // Extract quotes from all drummers
  const allQuotes = [];
  drummers.forEach(drummer => {
    if (drummer.quotes && Array.isArray(drummer.quotes)) {
      drummer.quotes.forEach((quote, index) => {
        allQuotes.push({
          id: `${drummer.id}-${index}`,
          text: quote.text,
          source: quote.source || null,
          year: quote.year || null,
          drummer: {
            id: drummer.id,
            name: drummer.name,
            band: drummer.band,
            image: drummer.image
          }
        });
      });
    }
  });
  
  // Return limited results
  res.json({
    quotes: allQuotes.slice(0, limit),
    total: allQuotes.length
  });
});

// Get a random quote
app.get('/api/quotes/random', (req, res) => {
  const allQuotes = [];
  drummers.forEach(drummer => {
    if (drummer.quotes && Array.isArray(drummer.quotes)) {
      drummer.quotes.forEach((quote, index) => {
        allQuotes.push({
          id: `${drummer.id}-${index}`,
          text: quote.text,
          source: quote.source || null,
          year: quote.year || null,
          drummer: {
            id: drummer.id,
            name: drummer.name,
            band: drummer.band,
            image: drummer.image
          }
        });
      });
    }
  });
  
  if (allQuotes.length === 0) {
    return res.status(404).json({ error: 'No quotes available' });
  }
  
  const randomIndex = Math.floor(Math.random() * allQuotes.length);
  res.json(allQuotes[randomIndex]);
});

// Get unique topics/drummers with quotes
app.get('/api/quotes/topics', (req, res) => {
  const drummersWithQuotes = drummers
    .filter(d => d.quotes && d.quotes.length > 0)
    .map(d => ({
      id: d.id,
      name: d.name,
      band: d.band,
      image: d.image,
      quoteCount: d.quotes.length
    }));
  
  res.json({
    topics: drummersWithQuotes,
    total: drummersWithQuotes.length
  });
});

app.listen(PORT, () => {
  console.log(`🥁 Metal Drummer Gear API running on http://localhost:${PORT}`);
});
