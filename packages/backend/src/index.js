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
    image: 'https://example.com/lars.jpg',
    gear: {
      drums: 'Tama Star Classic',
      snare: 'Tama LU1465 Signature',
      cymbals: 'Zildjian A Custom',
      hardware: 'Tama Iron Cobra pedals'
    }
  },
  {
    id: 2,
    name: 'Joey Jordison',
    band: 'Slipknot',
    genre: 'Nu Metal / Death Metal',
    country: 'USA',
    image: 'https://example.com/joey.jpg',
    gear: {
      drums: 'Pearl Masters Premium',
      snare: 'Pearl Joey Jordison Signature',
      cymbals: 'Paiste RUDE',
      hardware: 'Pearl Demon Drive pedals'
    }
  },
  {
    id: 3,
    name: 'Gene Hoglan',
    band: 'Death / Testament / Dethklok',
    genre: 'Death Metal / Thrash Metal',
    country: 'USA',
    image: 'https://example.com/gene.jpg',
    gear: {
      drums: 'Tama Starclassic',
      snare: 'Tama Gene Hoglan Signature',
      cymbals: 'Zildjian A Custom',
      hardware: 'Tama Speed Cobra pedals'
    }
  },
  {
    id: 4,
    name: 'Dave Lombardo',
    band: 'Slayer',
    genre: 'Thrash Metal',
    country: 'Cuba/USA',
    image: 'https://example.com/dave.jpg',
    gear: {
      drums: 'Pearl Masters Maple',
      snare: 'Pearl Dave Lombardo Signature',
      cymbals: 'Paiste RUDE / 2002',
      hardware: 'Pearl Demon Drive pedals'
    }
  },
  {
    id: 5,
    name: 'Tomas Haake',
    band: 'Meshuggah',
    genre: 'Progressive Metal / Djent',
    country: 'Sweden',
    image: 'https://example.com/tomas.jpg',
    gear: {
      drums: 'Sonor SQ2',
      snare: 'Sonor Tomas Haake Signature',
      cymbals: 'Meinl Byzance',
      hardware: 'Sonor Giant Step pedals'
    }
  },
  {
    id: 6,
    name: 'George Kollias',
    band: 'Nile',
    genre: 'Technical Death Metal',
    country: 'Greece',
    image: 'https://example.com/george.jpg',
    gear: {
      drums: 'Pearl Masterworks',
      snare: 'Pearl George Kollias Signature',
      cymbals: 'Zildjian A Custom',
      hardware: 'Pearl Demon Drive pedals'
    }
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
  
  res.json(results.map(({ id, name, band, genre, country }) => ({
    id, name, band, genre, country
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
