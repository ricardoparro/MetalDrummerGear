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
    country: 'Denmark',
    image: 'https://ui-avatars.com/api/?name=Drummer&background=1a1a2e&color=fff&size=200',
    bio: 'Lars Ulrich is a Danish musician and co-founder of Metallica, one of the most influential thrash metal bands in history. Born in 1963, he moved to Los Angeles to pursue his drumming career and formed Metallica with James Hetfield in 1981. Known for his aggressive style and iconic drum fills, Lars has been instrumental in shaping the sound of heavy metal.',
    gear: {
      drums: 'Tama Star Classic Maple',
      snare: 'Tama LU1465 Lars Ulrich Signature 14x6.5"',
      cymbals: 'Zildjian A Custom Series (14" Hi-Hats, 18" & 19" Crashes, 20" China, 22" Ride)',
      hardware: 'Tama Iron Cobra 900 Power Glide Double Pedal, Tama 1st Chair Throne',
      sticks: 'Ahead Lars Ulrich Signature Drumsticks'
    },
    photos: [
      'https://ui-avatars.com/api/?name=Drummer&background=1a1a2e&color=fff&size=200'
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Ahead Drumsticks', url: 'https://www.aheaddrumsticks.com' }
    ]
  },
  {
    id: 2,
    name: 'Joey Jordison',
    band: 'Slipknot',
    genre: 'Nu Metal / Death Metal',
    country: 'USA',
    image: 'https://ui-avatars.com/api/?name=Drummer&background=1a1a2e&color=fff&size=200',
    bio: 'Joey Jordison (1975-2021) was an American musician best known as the original drummer of Slipknot. His blistering speed, technical precision, and theatrical stage presence made him one of the most influential metal drummers of his generation. He also played guitar for Murderdolls and drums for various other projects.',
    gear: {
      drums: 'Pearl Masters Premium Maple',
      snare: 'Pearl Joey Jordison Signature 13x6.5"',
      cymbals: 'Paiste RUDE Series (14" Hi-Hats, 18" & 19" Crashes, 20" Chinas, 22" Power Ride)',
      hardware: 'Pearl Demon Drive Double Pedal, Pearl D-2000 Throne',
      sticks: 'Promark Joey Jordison Signature TX515W'
    },
    photos: [
      'https://ui-avatars.com/api/?name=Drummer&background=1a1a2e&color=fff&size=200'
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Paiste Cymbals', url: 'https://www.paiste.com' },
      { name: 'Promark Sticks', url: 'https://www.daddario.com/promark' }
    ]
  },
  {
    id: 3,
    name: 'Gene Hoglan',
    band: 'Death / Testament / Dethklok',
    genre: 'Death Metal / Thrash Metal',
    country: 'USA',
    image: 'https://ui-avatars.com/api/?name=Drummer&background=1a1a2e&color=fff&size=200',
    bio: 'Gene Hoglan, nicknamed "The Atomic Clock" for his precise timing, is one of the most respected drummers in extreme metal. Born in 1967, he has played with Death, Dark Angel, Testament, Strapping Young Lad, Fear Factory, and Dethklok. His combination of speed, power, and musicality has influenced countless metal drummers.',
    gear: {
      drums: 'Tama Starclassic Walnut/Birch',
      snare: 'Tama Gene Hoglan Signature 14x8"',
      cymbals: 'Zildjian A Custom Series (15" Hi-Hats, 18" & 20" Crashes, 22" Ride, 20" China)',
      hardware: 'Tama Speed Cobra 910 Double Pedal, Tama 1st Chair Round Rider Throne',
      sticks: 'Vater 5B Wood Tip'
    },
    photos: [
      'https://ui-avatars.com/api/?name=Drummer&background=1a1a2e&color=fff&size=200'
    ],
    endorsements: [
      { name: 'Tama Drums', url: 'https://www.tama.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Vater Drumsticks', url: 'https://www.vater.com' }
    ]
  },
  {
    id: 4,
    name: 'Dave Lombardo',
    band: 'Slayer',
    genre: 'Thrash Metal',
    country: 'Cuba/USA',
    image: 'https://ui-avatars.com/api/?name=Drummer&background=1a1a2e&color=fff&size=200',
    bio: 'Dave Lombardo, born in Cuba in 1965, is widely regarded as one of the greatest drummers in metal history. As the original drummer of Slayer, he pioneered the double bass drumming style that defined thrash metal. His work on albums like "Reign in Blood" is considered groundbreaking. He has also played with Fantomas, Suicidal Tendencies, and Dead Cross.',
    gear: {
      drums: 'Pearl Masters Maple Complete',
      snare: 'Pearl Dave Lombardo Signature 14x5.5"',
      cymbals: 'Paiste RUDE & 2002 Series (14" Hi-Hats, 18" & 19" Crashes, 20" Power Ride, 18" China)',
      hardware: 'Pearl Demon Drive Double Pedal, Pearl D-2000BR Throne',
      sticks: 'Vic Firth American Classic 5B'
    },
    photos: [
      'https://ui-avatars.com/api/?name=Drummer&background=1a1a2e&color=fff&size=200'
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Paiste Cymbals', url: 'https://www.paiste.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
    ]
  },
  {
    id: 5,
    name: 'Tomas Haake',
    band: 'Meshuggah',
    genre: 'Progressive Metal / Djent',
    country: 'Sweden',
    image: 'https://ui-avatars.com/api/?name=Drummer&background=1a1a2e&color=fff&size=200',
    bio: 'Tomas Haake, born in 1971, is the drummer and primary lyricist for Swedish extreme metal band Meshuggah. His polyrhythmic drumming style, characterized by complex time signatures and intricate patterns, has been hugely influential in the development of djent and progressive metal. He is known for his metronomic precision and innovative approach.',
    gear: {
      drums: 'Sonor SQ2 Heavy Beech',
      snare: 'Sonor Tomas Haake Signature 14x6.25"',
      cymbals: 'Meinl Byzance Series (15" Dark Hi-Hats, 18" & 19" Dark Crashes, 21" Transition Ride, 18" Dark China)',
      hardware: 'Sonor Giant Step Double Pedal, Sonor Drummer Throne',
      sticks: 'Vic Firth Tomas Haake Signature'
    },
    photos: [
      'https://ui-avatars.com/api/?name=Drummer&background=1a1a2e&color=fff&size=200'
    ],
    endorsements: [
      { name: 'Sonor Drums', url: 'https://www.sonor.com' },
      { name: 'Meinl Cymbals', url: 'https://meinlcymbals.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
    ]
  },
  {
    id: 6,
    name: 'George Kollias',
    band: 'Nile',
    genre: 'Technical Death Metal',
    country: 'Greece',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Sepultura_-_2023219214143_2023-08-07_Sepultura_-_Sven_-_1D_X_MK_II_-_0650_-_AK8I2527.jpg',
    bio: 'George Kollias, born in 1977, is a Greek drummer known for his extreme speed and technical proficiency. As the drummer for Nile since 2004, he has pushed the boundaries of death metal drumming with his incredible blast beats and double bass technique. He is also an educator and has released instructional materials.',
    gear: {
      drums: 'Pearl Masterworks Stadium Exotic',
      snare: 'Pearl George Kollias Signature 14x6.5"',
      cymbals: 'Zildjian A Custom Series (14" Hi-Hats, 17" & 18" Crashes, 21" Ride, 18" China)',
      hardware: 'Pearl Demon Drive Double Pedal, Pearl D-3000 Throne',
      sticks: 'Vic Firth George Kollias Signature'
    },
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/8/86/Sepultura_-_2023219214143_2023-08-07_Sepultura_-_Sven_-_1D_X_MK_II_-_0650_-_AK8I2527.jpg'
    ],
    endorsements: [
      { name: 'Pearl Drums', url: 'https://pearldrum.com' },
      { name: 'Zildjian Cymbals', url: 'https://zildjian.com' },
      { name: 'Vic Firth Sticks', url: 'https://vicfirth.zildjian.com' }
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

  res.json(results.map(({ id, name, band, genre, country, image }) => ({
    id, name, band, genre, country, image
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

app.listen(PORT, () => {
  console.log(`🥁 Metal Drummer Gear API running on http://localhost:${PORT}`);
});
