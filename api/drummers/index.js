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
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Sepultura_-_2023219214143_2023-08-07_Sepultura_-_Sven_-_1D_X_MK_II_-_0650_-_AK8I2527.jpg',
    bio: 'Eloy Casagrande, born in 1990, is a Brazilian drummer who became Sepultura\'s drummer in 2011 and joined Slipknot in 2024. Known for his explosive speed, technical prowess, and energetic performances, he brought new life to Sepultura\'s sound. His drumming style combines traditional metal with modern technical elements, making him one of the most exciting drummers in contemporary metal.',
    gear: {
      drums: 'Pearl Reference Pure Shell Pack',
      snare: 'Pearl Reference 14x5" Steel',
      cymbals: 'Meinl Byzance Brilliant Series (14" Heavy Hi-Hats, 18" & 19" Heavy Crashes, 21" Heavy Ride, 18" China Brilliant)',
      hardware: 'Pearl Demon Drive Double Pedal, Pearl D-2000 Throne',
      sticks: 'Vic Firth Eloy Casagrande Signature'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/8/86/Sepultura_-_2023219214143_2023-08-07_Sepultura_-_Sven_-_1D_X_MK_II_-_0650_-_AK8I2527.jpg'
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Meinl Cymbals', url: 'https://meinlcymbals.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
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
      sticks: 'Promark 747 Rock Wood Tip'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/0/0a/Drummer_John_Otto_of_Limp_Bizkit_in_2006.jpg'
    ],
    endorsements: [
      { name: 'OCDP Drums', url: 'https://www.ocdrum.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Promark Sticks', url: 'https://www.daddario.com/promark' }
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Suicidal_Tendencies_Rockharz_2024_18.jpg',
    bio: 'Jay Weinberg, born in 1990, is the son of E Street Band drummer Max Weinberg. He joined Slipknot in 2014, becoming their drummer after Joey Jordison\'s departure. Before Slipknot, he briefly played with Against Me! and Madball. His powerful, aggressive style honored Slipknot\'s legacy while adding his own intensity. In 2023, he joined Suicidal Tendencies.',
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/2017_Anthrax_-_Charlie_Benante_-_by_2eight_-_DSC1986_%28cropped%29.jpg',
    bio: 'Charlie Benante, born in 1962 in The Bronx, New York, is a pioneer of thrash metal drumming and credited with popularizing the blast beat technique. He joined Anthrax in 1983 and has appeared on all 11 of the band\'s studio albums. Known for his extremely fast double kick technique, Benante is also a talented guitarist who contributed lead guitar to S.O.D.\'s "Speak English or Die" album. He serves as Anthrax\'s main composer and is a graphic artist who created many of their album covers and T-shirt designs. In 2022, he joined the reunited Pantera, filling in for his late friend Vinnie Paul.',
    gear: {
      drums: 'Tama Starclassic',
      snare: 'Tama Charlie Benante Signature 14x6.5"',
      cymbals: 'Paiste RUDE & 2002 Series (14" Hi-Hats, 18" & 19" Crashes, 20" Power Ride, 18" China)',
      hardware: 'Tama Speed Cobra Double Pedal, Roland Electronics',
      sticks: 'Vic Firth Charlie Benante Signature'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/0/0a/2017_Anthrax_-_Charlie_Benante_-_by_2eight_-_DSC1986_%28cropped%29.jpg'
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Mike_Portnoy_-_Adrenaline_Mob%2C_2012-04-13.jpg',
    bio: 'Mike Portnoy, born in 1967 in Long Beach, New York, is one of the most influential progressive metal drummers of all time. He co-founded Dream Theater in 1985 and was the band\'s drummer and lyricist for 25 years, helping define the progressive metal genre. A recipient of over 30 Drummer of the Year awards from Modern Drummer magazine, Portnoy is known for his technical proficiency, complex time signatures, and theatrical live performances. After leaving Dream Theater in 2010, he has played with numerous projects including Avenged Sevenfold, Adrenaline Mob, The Winery Dogs, Flying Colors, Sons of Apollo, and Liquid Tension Experiment. In 2023, he rejoined Dream Theater for their reunion tour. His drumming style combines jazz fusion influences with heavy metal power, featuring intricate double bass patterns and creative use of electronics.',
    gear: {
      drums: 'Tama Starclassic Maple/Birch',
      snare: 'Tama Mike Portnoy Signature Melody Master 14x5.5"',
      cymbals: 'Sabian HHX Series (14" Evolution Hi-Hats, 18" & 19" Evolution Crashes, 21" Raw Bell Dry Ride, 10" & 12" Evolution Splashes, 19" O-Zone Crash)',
      hardware: 'Tama Iron Cobra Power Glide Double Pedal, Tama 1st Chair Ergo-Rider Throne',
      sticks: 'Promark Mike Portnoy Signature TX420N'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/a/a4/Mike_Portnoy_-_Adrenaline_Mob%2C_2012-04-13.jpg'
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Sabian Cymbals', url: 'https://www.sabian.com' },
      { name: 'Promark Sticks', url: 'https://www.daddario.com/promark' },
      { name: 'Evans Drumheads', url: 'https://www.daddario.com/evans' },
      { name: 'Roland Electronics', url: 'https://www.roland.com' }
    ],
    videos: [
      { title: 'Instrumedley - The Dance of Instrumentals (4.5M views)', youtubeId: 'XFo8UgrUkNA', year: 2003 },
      { title: 'Panic Attack - Drumeo (Official)', youtubeId: 'oa7oOdYPOSk', year: 2023 },
      { title: 'Score - Full Concert Drum & Vox Cam (Official)', youtubeId: 'eUYi4GwN9sg', year: 2006 }
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
