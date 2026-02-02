// Vercel Serverless Function - List all drummers

const drummers = [
  {
    id: 1,
    name: 'Lars Ulrich',
    band: 'Metallica',
    genre: 'Thrash Metal',
    country: 'Denmark',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Lars_Ulrich_by_Gage_Skidmore_%28cropped%29.jpg',
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
    ]
  },
  {
    id: 2,
    name: 'Joey Jordison',
    band: 'Slipknot',
    genre: 'Nu Metal / Death Metal',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/JoeyJordison.jpg',
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
    ]
  },
  {
    id: 3,
    name: 'Gene Hoglan',
    band: 'Death / Testament / Dethklok',
    genre: 'Death Metal / Thrash Metal',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Gene_Hoglan_-_Testament_%28cropped%29.jpg',
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
      'https://upload.wikimedia.org/wikipedia/commons/6/60/Gene_Hoglan_-_Testament_%28cropped%29.jpg'
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
    ]
  },
  {
    id: 4,
    name: 'Dave Lombardo',
    band: 'Slayer',
    genre: 'Thrash Metal',
    country: 'Cuba/USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Dave_Lombardo_8.5.14.jpeg',
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
      'https://upload.wikimedia.org/wikipedia/commons/d/df/Dave_Lombardo_8.5.14.jpeg'
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
    band: 'Slipknot',
    genre: 'Nu Metal / Thrash Metal',
    country: 'Brazil',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Sepultura_-_2023219214143_2023-08-07_Sepultura_-_Sven_-_1D_X_MK_II_-_0650_-_AK8I2527.jpg',
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
      'https://upload.wikimedia.org/wikipedia/commons/8/86/Sepultura_-_2023219214143_2023-08-07_Sepultura_-_Sven_-_1D_X_MK_II_-_0650_-_AK8I2527.jpg'
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
    genre: 'Nu Metal',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Ray_Luzier_of_Korn.jpg',
    bio: 'Ray Luzier, born in 1970, is an American drummer who joined Korn in 2007. Before Korn, he was a sought-after session musician, working with artists like David Lee Roth and Army of Anyone. His drumming combines rock solid grooves with technical flair, bringing a fresh energy to Korn\'s signature sound while respecting their nu-metal roots.',
    sameAs: [
      'https://en.wikipedia.org/wiki/Ray_Luzier',
      'https://www.instagram.com/rikirockett/',
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
    band: 'Suicidal Tendencies',
    genre: 'Hardcore / Thrash Crossover',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Suicidal_Tendencies_Rockharz_2024_18.jpg',
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/55/VinniePaul2008.JPG',
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/11/2017_Anthrax_-_Charlie_Benante_-_by_2eight_-_DSC1986_%28cropped%29.jpg',
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Mike_Portnoy.jpg',
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
      sticks: 'Tama Mario Duplantier Signature'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/8/83/2017_RiP_-_Gojira_-_Mario_Duplantier_-_by_2eight_-_8SC9168.jpg'
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
      'https://upload.wikimedia.org/wikipedia/commons/6/6b/20150612-054-Nova_Rock_2015-Mastodon-Brann_Dailor.jpg'
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
    genre: 'Groove Metal',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Lamb_Of_God_-_Rock_am_Ring_2015-9876_%28cropped%29.jpg',
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
      'https://upload.wikimedia.org/wikipedia/commons/d/d8/Lamb_Of_God_-_Rock_am_Ring_2015-9876_%28cropped%29.jpg'
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
    genre: 'Progressive/Djent',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/26/20151122_Eindhoven_Epic_Metal_Fest_Periphery_0116.jpg',
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
      'https://upload.wikimedia.org/wikipedia/commons/8/8d/Behemoth_Rockharz_2015_02.jpg'
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
    genre: 'Black Metal',
    country: 'Norway',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Mayhem_-_Jalometalli_2008_-_Hellhammer_01_crop.JPG',
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
      'https://upload.wikimedia.org/wikipedia/commons/5/58/Mayhem_-_Jalometalli_2008_-_Hellhammer_01_crop.JPG'
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
    genre: 'Death Metal',
    country: 'USA',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Pete_Sandoval.jpg',
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
  }
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
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
