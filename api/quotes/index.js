// Vercel Serverless Function - List all quotes with filtering

// Import drummers data to extract quotes
const drummers = require('../drummers/index.js').drummers || [];

// Fallback drummers with quotes if import fails
const fallbackDrummers = [
  {
    id: 1,
    name: 'Lars Ulrich',
    band: 'Metallica',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Lars_Ulrich_by_Gage_Skidmore_%28cropped%29.jpg',
    quotes: [
      { text: "I'm not the best drummer in the world, but I'm the best drummer for Metallica.", source: "Modern Drummer Magazine", year: 2008, topic: 'philosophy' },
      { text: "The only way to do great work is to love what you do. I've been fortunate enough to do that for over 40 years.", source: "Drumeo Interview", year: 2020, topic: 'career' },
      { text: "Music is the most powerful form of communication in the world. It brings people together from all walks of life.", source: "Rolling Stone", year: 2016, topic: 'philosophy' }
    ]
  },
  {
    id: 2,
    name: 'Joey Jordison',
    band: 'Slipknot',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/JoeyJordison.jpg',
    quotes: [
      { text: "The drums chose me. I didn't choose them. It was like destiny.", source: "Modern Drummer Magazine", year: 2004, topic: 'philosophy' },
      { text: "Every time I sit behind a drum kit, I want to destroy it. That's the only way I know how to play.", source: "Revolver Magazine", year: 2008, topic: 'technique' },
      { text: "Practice doesn't make perfect. Perfect practice makes perfect. There's a big difference.", source: "Drum! Magazine", year: 2010, topic: 'technique' }
    ]
  },
  {
    id: 4,
    name: 'Dave Lombardo',
    band: 'Slayer',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Dave_Lombardo_8.5.14.jpeg',
    quotes: [
      { text: "Speed is nothing without control. You have to be able to play fast and tight at the same time.", source: "Modern Drummer Magazine", year: 2006, topic: 'technique' },
      { text: "I never wanted to be a typical metal drummer. I wanted to bring jazz, Latin, and world music influences into heavy music.", source: "Drumeo Interview", year: 2019, topic: 'philosophy' },
      { text: "Reign in Blood changed everything. We didn't know we were making history, we were just playing as fast and hard as we could.", source: "Revolver Magazine", year: 2016, topic: 'career' }
    ]
  },
  {
    id: 13,
    name: 'Mike Portnoy',
    band: 'Dream Theater',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Mike_Portnoy.jpg',
    quotes: [
      { text: "I've always tried to approach drums as a musical instrument rather than just a rhythm instrument. The drums can sing.", source: "Modern Drummer Magazine", year: 2005, topic: 'philosophy' },
      { text: "Progressive music allows you to break all the rules. That's what makes it so exciting - there are no boundaries.", source: "Drumeo Interview", year: 2023, topic: 'philosophy' },
      { text: "Every drummer should learn to read music. It opens up a whole world of possibilities and makes you a better musician.", source: "Drum! Magazine", year: 2012, topic: 'technique' }
    ]
  },
  {
    id: 14,
    name: 'Danny Carey',
    band: 'Tool',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Danny_Carey_Hellfest_2019.jpg',
    quotes: [
      { text: "I've always been fascinated by sacred geometry and how it relates to rhythm. The patterns in nature are the same patterns in music.", source: "Modern Drummer Magazine", year: 2019, topic: 'philosophy' },
      { text: "The drumset is the most expressive instrument. You can make it whisper or you can make it scream.", source: "Drumeo Interview", year: 2020, topic: 'gear' },
      { text: "I practice every day, even after 30 years. The day you stop learning is the day you stop growing as a musician.", source: "Revolver Magazine", year: 2017, topic: 'technique' }
    ]
  },
  {
    id: 3,
    name: 'Gene Hoglan',
    band: 'Death / Testament',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Gene_Hoglan_-_Testament_%28cropped%29.jpg',
    quotes: [
      { text: "Being called 'The Atomic Clock' is humbling. I've always prioritized precision and timing over raw speed.", source: "Modern Drummer Magazine", year: 2015, topic: 'technique' },
      { text: "Chuck Schuldiner taught me that death metal could be intelligent. It changed how I approach drumming.", source: "Decibel Magazine", year: 2018, topic: 'career' },
      { text: "Your kick drum should be an extension of your heartbeat. Control it, and you control the song.", source: "Drumeo Interview", year: 2021, topic: 'technique' }
    ]
  },
  {
    id: 5,
    name: 'Tomas Haake',
    band: 'Meshuggah',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meshuggah_-_Rock_am_Ring_2023-44313.jpg',
    quotes: [
      { text: "Polyrhythms aren't about complexity for complexity's sake. They're about creating tension and release.", source: "Modern Drummer Magazine", year: 2012, topic: 'technique' },
      { text: "The hi-hat is the conductor. Everything else follows its lead.", source: "Drumeo Interview", year: 2019, topic: 'technique' },
      { text: "I spent months learning 'Bleed.' If I can struggle, so can everyone else. That's okay.", source: "Revolver Magazine", year: 2008, topic: 'technique' }
    ]
  },
  {
    id: 6,
    name: 'George Kollias',
    band: 'Nile',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/GK_10.jpg',
    quotes: [
      { text: "Extreme speed is worthless if it's not musical. Serve the song first, then push your limits.", source: "Modern Drummer Magazine", year: 2014, topic: 'technique' },
      { text: "I practice blast beats the way a pianist practices scales. Fundamentals never get old.", source: "Sick Drummer Magazine", year: 2016, topic: 'technique' },
      { text: "Your body is your instrument. Treat it like an athlete treats theirs.", source: "Drumeo Interview", year: 2020, topic: 'technique' }
    ]
  },
  {
    id: 11,
    name: 'Vinnie Paul',
    band: 'Pantera',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/55/VinniePaul2008.JPG',
    quotes: [
      { text: "Groove is king. You can have all the chops in the world, but if you can't groove, you've got nothing.", source: "Modern Drummer Magazine", year: 2004, topic: 'technique' },
      { text: "Dime and I didn't just play together—we breathed together. That's what made Pantera special.", source: "Guitar World", year: 2010, topic: 'career' },
      { text: "The Cowboys From Hell drum sound came from close-miking and a lot of attack. Keep it simple, make it hit hard.", source: "Mix Magazine", year: 2001, topic: 'gear' }
    ]
  },
  {
    id: 15,
    name: 'Mario Duplantier',
    band: 'Gojira',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Mario_Duplantier_Gojira_2012.jpg',
    quotes: [
      { text: "Metal drumming can be primal and sophisticated at the same time. That's what we try to do in Gojira.", source: "Modern Drummer Magazine", year: 2017, topic: 'philosophy' },
      { text: "I visualize the drums as a tribal instrument. Every hit should have intention and power.", source: "Drumeo Interview", year: 2021, topic: 'technique' },
      { text: "Environmental consciousness and heavy music aren't contradictions. Art reflects who you are.", source: "Revolver Magazine", year: 2016, topic: 'philosophy' }
    ]
  },
  {
    id: 16,
    name: 'Brann Dailor',
    band: 'Mastodon',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Ursynalia_2012%2C_Mastodon_03.jpg',
    quotes: [
      { text: "I never wanted to just be a metal drummer. I wanted to bring jazz, prog, and punk all together.", source: "Modern Drummer Magazine", year: 2011, topic: 'philosophy' },
      { text: "The fills should tell a story. They're not just transitions—they're musical statements.", source: "Drumeo Interview", year: 2018, topic: 'technique' },
      { text: "Singing while drumming forced me to simplify. Sometimes less really is more.", source: "Revolver Magazine", year: 2017, topic: 'technique' }
    ]
  },
  {
    id: 7,
    name: 'Eloy Casagrande',
    band: 'Slipknot',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Sepultura_-_2023219214143_2023-08-07_Sepultura_-_Sven_-_1D_X_MK_II_-_0650_-_AK8I2527.jpg',
    quotes: [
      { text: "Joining Slipknot is a dream and a responsibility. Joey's legacy is something I honor every show.", source: "Revolver Magazine", year: 2024, topic: 'career' },
      { text: "Brazilian drummers grow up with rhythm in our blood. It's not taught—it's felt.", source: "Modern Drummer Magazine", year: 2022, topic: 'philosophy' }
    ]
  }
];

// Helper function to extract all quotes from drummers
function getAllQuotes(drummerList) {
  const quotes = [];
  const drumsData = drummerList.length > 0 ? drummerList : fallbackDrummers;
  
  drumsData.forEach(drummer => {
    if (drummer.quotes && Array.isArray(drummer.quotes)) {
      drummer.quotes.forEach((quote, index) => {
        quotes.push({
          id: `${drummer.id}-${index}`,
          text: quote.text,
          source: quote.source,
          sourceUrl: quote.sourceUrl || null,
          year: quote.year || null,
          topic: quote.topic || 'philosophy',
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
  
  return quotes;
}

module.exports = (req, res) => {
  const { drummer, topic, limit = 50, offset = 0 } = req.query;
  
  let quotes = getAllQuotes(drummers);
  
  // Filter by drummer ID or name
  if (drummer) {
    const drummerLower = drummer.toLowerCase();
    quotes = quotes.filter(q => 
      q.drummer.id.toString() === drummer ||
      q.drummer.name.toLowerCase().includes(drummerLower)
    );
  }
  
  // Filter by topic
  if (topic) {
    const topicLower = topic.toLowerCase();
    quotes = quotes.filter(q => q.topic && q.topic.toLowerCase() === topicLower);
  }
  
  // Pagination
  const total = quotes.length;
  const paginatedQuotes = quotes.slice(parseInt(offset), parseInt(offset) + parseInt(limit));
  
  res.json({
    quotes: paginatedQuotes,
    total,
    limit: parseInt(limit),
    offset: parseInt(offset)
  });
};
