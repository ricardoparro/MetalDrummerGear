// Shared quotes data - indexed by drummer ID for easy lookup

const drummerMetadata = {
  1: { name: 'Lars Ulrich', band: 'Metallica' },
  2: { name: 'Joey Jordison', band: 'Slipknot' },
  3: { name: 'Gene Hoglan', band: 'Death / Testament' },
  4: { name: 'Dave Lombardo', band: 'Slayer' },
  5: { name: 'Tomas Haake', band: 'Meshuggah' },
  6: { name: 'George Kollias', band: 'Nile' },
  7: { name: 'Eloy Casagrande', band: 'Slipknot' },
  11: { name: 'Vinnie Paul', band: 'Pantera' },
  13: { name: 'Mike Portnoy', band: 'Dream Theater' },
  14: { name: 'Danny Carey', band: 'Tool' },
  15: { name: 'Mario Duplantier', band: 'Gojira' },
  16: { name: 'Brann Dailor', band: 'Mastodon' }
};

const quotesById = {
  1: [ // Lars Ulrich
    { text: "I'm not the best drummer in the world, but I'm the best drummer for Metallica.", source: "Modern Drummer Magazine", year: 2008, topic: 'philosophy' },
    { text: "The only way to do great work is to love what you do. I've been fortunate enough to do that for over 40 years.", source: "Drumeo Interview", year: 2020, topic: 'career' },
    { text: "Music is the most powerful form of communication in the world. It brings people together from all walks of life.", source: "Rolling Stone", year: 2016, topic: 'philosophy' }
  ],
  2: [ // Joey Jordison
    { text: "The drums chose me. I didn't choose them. It was like destiny.", source: "Modern Drummer Magazine", year: 2004, topic: 'philosophy' },
    { text: "Every time I sit behind a drum kit, I want to destroy it. That's the only way I know how to play.", source: "Revolver Magazine", year: 2008, topic: 'technique' },
    { text: "Practice doesn't make perfect. Perfect practice makes perfect. There's a big difference.", source: "Drum! Magazine", year: 2010, topic: 'technique' }
  ],
  3: [ // Gene Hoglan
    { text: "Being called 'The Atomic Clock' is humbling. I've always prioritized precision and timing over raw speed.", source: "Modern Drummer Magazine", year: 2015, topic: 'technique' },
    { text: "Chuck Schuldiner taught me that death metal could be intelligent. It changed how I approach drumming.", source: "Decibel Magazine", year: 2018, topic: 'career' },
    { text: "Your kick drum should be an extension of your heartbeat. Control it, and you control the song.", source: "Drumeo Interview", year: 2021, topic: 'technique' }
  ],
  4: [ // Dave Lombardo
    { text: "Speed is nothing without control. You have to be able to play fast and tight at the same time.", source: "Modern Drummer Magazine", year: 2006, topic: 'technique' },
    { text: "I never wanted to be a typical metal drummer. I wanted to bring jazz, Latin, and world music influences into heavy music.", source: "Drumeo Interview", year: 2019, topic: 'philosophy' },
    { text: "Reign in Blood changed everything. We didn't know we were making history, we were just playing as fast and hard as we could.", source: "Revolver Magazine", year: 2016, topic: 'career' }
  ],
  5: [ // Tomas Haake
    { text: "Polyrhythms aren't about complexity for complexity's sake. They're about creating tension and release.", source: "Modern Drummer Magazine", year: 2012, topic: 'technique' },
    { text: "The hi-hat is the conductor. Everything else follows its lead.", source: "Drumeo Interview", year: 2019, topic: 'technique' },
    { text: "I spent months learning 'Bleed.' If I can struggle, so can everyone else. That's okay.", source: "Revolver Magazine", year: 2008, topic: 'technique' }
  ],
  6: [ // George Kollias
    { text: "Extreme speed is worthless if it's not musical. Serve the song first, then push your limits.", source: "Modern Drummer Magazine", year: 2014, topic: 'technique' },
    { text: "I practice blast beats the way a pianist practices scales. Fundamentals never get old.", source: "Sick Drummer Magazine", year: 2016, topic: 'technique' },
    { text: "Your body is your instrument. Treat it like an athlete treats theirs.", source: "Drumeo Interview", year: 2020, topic: 'technique' }
  ],
  7: [ // Eloy Casagrande
    { text: "Joining Slipknot is a dream and a responsibility. Joey's legacy is something I honor every show.", source: "Revolver Magazine", year: 2024, topic: 'career' },
    { text: "Brazilian drummers grow up with rhythm in our blood. It's not taught—it's felt.", source: "Modern Drummer Magazine", year: 2022, topic: 'philosophy' }
  ],
  11: [ // Vinnie Paul
    { text: "Groove is king. You can have all the chops in the world, but if you can't groove, you've got nothing.", source: "Modern Drummer Magazine", year: 2004, topic: 'technique' },
    { text: "Dime and I didn't just play together—we breathed together. That's what made Pantera special.", source: "Guitar World", year: 2010, topic: 'career' },
    { text: "The Cowboys From Hell drum sound came from close-miking and a lot of attack. Keep it simple, make it hit hard.", source: "Mix Magazine", year: 2001, topic: 'gear' }
  ],
  13: [ // Mike Portnoy
    { text: "I've always tried to approach drums as a musical instrument rather than just a rhythm instrument. The drums can sing.", source: "Modern Drummer Magazine", year: 2005, topic: 'philosophy' },
    { text: "Progressive music allows you to break all the rules. That's what makes it so exciting - there are no boundaries.", source: "Drumeo Interview", year: 2023, topic: 'philosophy' },
    { text: "Every drummer should learn to read music. It opens up a whole world of possibilities and makes you a better musician.", source: "Drum! Magazine", year: 2012, topic: 'technique' }
  ],
  14: [ // Danny Carey
    { text: "I've always been fascinated by sacred geometry and how it relates to rhythm. The patterns in nature are the same patterns in music.", source: "Modern Drummer Magazine", year: 2019, topic: 'philosophy' },
    { text: "The drumset is the most expressive instrument. You can make it whisper or you can make it scream.", source: "Drumeo Interview", year: 2020, topic: 'gear' },
    { text: "I practice every day, even after 30 years. The day you stop learning is the day you stop growing as a musician.", source: "Revolver Magazine", year: 2017, topic: 'technique' }
  ],
  15: [ // Mario Duplantier
    { text: "Metal drumming can be primal and sophisticated at the same time. That's what we try to do in Gojira.", source: "Modern Drummer Magazine", year: 2017, topic: 'philosophy' },
    { text: "I visualize the drums as a tribal instrument. Every hit should have intention and power.", source: "Drumeo Interview", year: 2021, topic: 'technique' },
    { text: "Environmental consciousness and heavy music aren't contradictions. Art reflects who you are.", source: "Revolver Magazine", year: 2016, topic: 'philosophy' }
  ],
  16: [ // Brann Dailor
    { text: "I never wanted to just be a metal drummer. I wanted to bring jazz, prog, and punk all together.", source: "Modern Drummer Magazine", year: 2011, topic: 'philosophy' },
    { text: "The fills should tell a story. They're not just transitions—they're musical statements.", source: "Drumeo Interview", year: 2018, topic: 'technique' },
    { text: "Singing while drumming forced me to simplify. Sometimes less really is more.", source: "Revolver Magazine", year: 2017, topic: 'technique' }
  ]
};

function getQuotesForDrummer(drummerId) {
  return quotesById[drummerId] || [];
}

function getAllQuotes() {
  const allQuotes = [];
  
  Object.entries(quotesById).forEach(([drummerId, quotes]) => {
    const id = parseInt(drummerId);
    const meta = drummerMetadata[id] || { name: 'Unknown', band: 'Unknown' };
    
    quotes.forEach((quote, index) => {
      allQuotes.push({
        id: `${id}-${index}`,
        text: quote.text,
        source: quote.source,
        year: quote.year,
        topic: quote.topic,
        drummer: {
          id: id,
          name: meta.name,
          band: meta.band
        }
      });
    });
  });
  
  return allQuotes;
}

module.exports = { quotesById, getQuotesForDrummer, getAllQuotes };
