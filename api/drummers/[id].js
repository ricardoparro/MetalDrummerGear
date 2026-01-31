// Vercel Serverless Function - Get drummer by ID

const drummers = [
  {
    id: 1,
    name: 'Lars Ulrich',
    band: 'Metallica',
    genre: 'Thrash Metal',
    country: 'Denmark',
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
    gear: {
      drums: 'Pearl Masterworks',
      snare: 'Pearl George Kollias Signature',
      cymbals: 'Zildjian A Custom',
      hardware: 'Pearl Demon Drive pedals'
    }
  }
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const { id } = req.query;
  const drummer = drummers.find(d => d.id === parseInt(id));
  
  if (!drummer) {
    return res.status(404).json({ error: 'Drummer not found' });
  }
  
  res.status(200).json(drummer);
}
