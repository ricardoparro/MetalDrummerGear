// Vercel Serverless Function - Quick Facts Page
// Issue #452 - Create Quick Facts page with FAQPage JSON-LD schema

export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');

  const today = new Date().toISOString().split('T')[0];

  // Quick facts about metal drummers
  const facts = [
    // Speed Records
    {
      category: 'Speed Records',
      question: 'Who is the fastest metal drummer?',
      answer: 'George Kollias of Nile holds the record for the fastest recorded double bass drumming, reaching speeds over 280 BPM. Pete Sandoval and Gene Hoglan are also renowned for their extreme speed techniques.',
    },
    {
      category: 'Speed Records',
      question: 'What is the fastest blast beat ever recorded?',
      answer: 'Blast beats have been recorded at speeds exceeding 300 BPM by drummers like Pete Sandoval (Morbid Angel) and Inferno (Behemoth). Sustained blast beats typically range from 180-250 BPM in professional recordings.',
    },
    {
      category: 'Speed Records',
      question: 'What song has the fastest drumming?',
      answer: '"Raining Blood" by Slayer (Dave Lombardo), "Painkiller" by Judas Priest (Scott Travis), and "Bleed" by Meshuggah (Tomas Haake) are frequently cited as having some of the most technically demanding and fastest drumming in metal.',
    },

    // Gear Stats
    {
      category: 'Gear Stats',
      question: 'What is the most popular drum brand among metal drummers?',
      answer: 'Tama and Pearl are the most popular drum brands among professional metal drummers. Other widely used brands include Sonor, DW, and Mapex. Each brand offers signature models for top artists.',
    },
    {
      category: 'Gear Stats',
      question: 'What cymbals do metal drummers prefer?',
      answer: 'Zildjian, Sabian, Meinl, and Paiste are the top cymbal choices. Many metal drummers prefer heavier cymbals like Zildjian A Custom, Sabian AAX, and Meinl Byzance for their cutting power and durability.',
    },
    {
      category: 'Gear Stats',
      question: 'What is the average cost of a professional metal drum kit?',
      answer: 'A professional metal drum kit typically costs between $3,000 and $15,000 for drums alone. With cymbals, hardware, and accessories, a complete setup can range from $5,000 to $30,000 or more.',
    },
    {
      category: 'Gear Stats',
      question: 'What double bass pedal do most metal drummers use?',
      answer: 'The Tama Iron Cobra, Pearl Demon Drive, DW 9000, and Axis A Longboards are among the most popular double bass pedals. Many drummers prefer direct drive pedals for speed and responsiveness.',
    },

    // Drummer Nicknames
    {
      category: 'Nicknames',
      question: 'Why is Gene Hoglan called "The Atomic Clock"?',
      answer: 'Gene Hoglan earned the nickname "The Atomic Clock" due to his legendary timing precision and metronomic accuracy. His ability to maintain perfect tempo during complex passages is unmatched.',
    },
    {
      category: 'Nicknames',
      question: 'Why is Dave Lombardo called "The Godfather of Double Bass"?',
      answer: 'Dave Lombardo pioneered double bass drumming techniques in thrash metal with Slayer. His work on albums like "Reign in Blood" set the standard for speed and aggression in metal drumming.',
    },
    {
      category: 'Nicknames',
      question: 'What is Joey Jordison\'s legacy?',
      answer: 'Joey Jordison (1975-2021) was known for his incredible speed, rotating drum platform, and masked performances with Slipknot. He was voted the best metal drummer of his generation and influenced countless drummers.',
    },

    // Career Records
    {
      category: 'Career Records',
      question: 'Who has been drumming professionally the longest?',
      answer: 'Lars Ulrich has been Metallica\'s drummer since 1981 (over 40 years). Bill Ward drummed for Black Sabbath from 1968. Nicko McBrain has been with Iron Maiden since 1982.',
    },
    {
      category: 'Career Records',
      question: 'Which drummer has played on the most albums?',
      answer: 'Gene Hoglan has recorded with over 30 different bands including Death, Testament, Dark Angel, Dethklok, and Fear Factory. Mike Portnoy has also recorded extensively with Dream Theater and numerous side projects.',
    },
    {
      category: 'Career Records',
      question: 'Who is the youngest metal drummer to achieve fame?',
      answer: 'Joey Jordison was only 24 when Slipknot\'s debut album went double platinum. Jay Weinberg joined Slipknot at 24. Tony Royster Jr. was a prodigious drummer from age 12.',
    },

    // Technical Facts
    {
      category: 'Technical',
      question: 'What is a blast beat?',
      answer: 'A blast beat is a drum pattern consisting of rapid, alternating single strokes between the snare and bass drum, typically played at high speeds (180+ BPM). It originated in grindcore and death metal.',
    },
    {
      category: 'Technical',
      question: 'What is polyrhythmic drumming?',
      answer: 'Polyrhythmic drumming involves playing multiple rhythms simultaneously. Danny Carey (Tool) and Tomas Haake (Meshuggah) are masters of this technique, creating complex, interlocking patterns.',
    },
    {
      category: 'Technical',
      question: 'What is the difference between single and double bass pedals?',
      answer: 'Single bass pedals have one beater for one foot; double bass pedals allow both feet to play the same bass drum using two beaters. Double bass is essential for fast metal drumming.',
    },
  ];

  // Generate FAQPage JSON-LD schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: 'Metal Drummer Quick Facts',
    description: 'Quick facts and frequently asked questions about metal drummers, speed records, gear, techniques, and career records.',
    mainEntity: facts.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  // Group facts by category
  const factsByCategory = facts.reduce((acc, fact) => {
    if (!acc[fact.category]) acc[fact.category] = [];
    acc[fact.category].push(fact);
    return acc;
  }, {});

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Metal Drummer Quick Facts - Speed Records, Gear Stats & More | MetalForge</title>
  <meta name="description" content="Quick facts about metal drummers: speed records, gear statistics, famous nicknames, career records, and drumming techniques explained.">
  <meta name="keywords" content="metal drumming facts, fastest drummers, drum gear, blast beats, double bass, Gene Hoglan, Dave Lombardo, Joey Jordison">
  <link rel="canonical" href="https://metalforge.io/facts">
  
  <!-- Open Graph -->
  <meta property="og:title" content="Metal Drummer Quick Facts | MetalForge">
  <meta property="og:description" content="Speed records, gear stats, famous nicknames, and career records of legendary metal drummers.">
  <meta property="og:url" content="https://metalforge.io/facts">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="MetalForge">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Metal Drummer Quick Facts | MetalForge">
  <meta name="twitter:description" content="Speed records, gear stats, famous nicknames, and career records of legendary metal drummers.">
  <meta name="twitter:site" content="@MetalDrumGear">
  
  <!-- JSON-LD FAQPage Schema -->
  <script type="application/ld+json">
  ${JSON.stringify(faqSchema, null, 2)}
  </script>
  
  <style>
    :root {
      --bg: #1a1a2e;
      --card-bg: #16213e;
      --text: #eaeaea;
      --text-secondary: #a0a0a0;
      --accent: #dc2626;
      --border: #2a2a4e;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      padding: 20px;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
    }
    header {
      text-align: center;
      padding: 40px 0;
      border-bottom: 1px solid var(--border);
      margin-bottom: 40px;
    }
    h1 {
      font-size: 2.5em;
      margin-bottom: 10px;
      color: var(--accent);
    }
    .subtitle {
      color: var(--text-secondary);
      font-size: 1.1em;
    }
    .back-link {
      display: inline-block;
      color: var(--accent);
      text-decoration: none;
      margin-bottom: 20px;
      padding: 10px 20px;
      border: 1px solid var(--accent);
      border-radius: 8px;
      transition: all 0.2s;
    }
    .back-link:hover {
      background: var(--accent);
      color: white;
    }
    .category {
      margin-bottom: 40px;
    }
    .category h2 {
      font-size: 1.5em;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid var(--accent);
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .category h2::before {
      content: '🥁';
    }
    .fact {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 16px;
    }
    .fact h3 {
      color: var(--text);
      font-size: 1.1em;
      margin-bottom: 12px;
    }
    .fact p {
      color: var(--text-secondary);
      font-size: 1em;
    }
    .timestamp {
      text-align: center;
      padding: 40px 0;
      color: var(--text-secondary);
      font-size: 0.9em;
      border-top: 1px solid var(--border);
      margin-top: 40px;
    }
    footer {
      text-align: center;
      padding: 20px;
      color: var(--text-secondary);
    }
    footer a {
      color: var(--accent);
      text-decoration: none;
    }
    @media (max-width: 600px) {
      h1 { font-size: 1.8em; }
      .category h2 { font-size: 1.2em; }
      body { padding: 10px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <a href="/" class="back-link">← Back to Drummers</a>
    
    <header>
      <h1>Metal Drummer Quick Facts</h1>
      <p class="subtitle">Speed records, gear stats, famous nicknames & more</p>
    </header>
    
    <main>
      ${Object.entries(factsByCategory).map(([category, categoryFacts]) => `
        <section class="category">
          <h2>${category}</h2>
          ${categoryFacts.map(f => `
            <article class="fact">
              <h3>${f.question}</h3>
              <p>${f.answer}</p>
            </article>
          `).join('')}
        </section>
      `).join('')}
    </main>
    
    <div class="timestamp">
      <time datetime="${today}">Last updated: February 17, 2026</time>
    </div>
    
    <footer>
      <p>Part of <a href="/">MetalForge.io</a> - The Metal Drummer Gear Database</p>
      <p><a href="/llms.txt">LLM Info</a> | <a href="/llms-full.txt">Full Database</a></p>
    </footer>
  </div>
</body>
</html>`;

  res.status(200).send(html);
}
