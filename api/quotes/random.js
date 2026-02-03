// Vercel Serverless Function - Get a random quote

const fs = require('fs');
const path = require('path');

function getAllQuotes() {
  const content = fs.readFileSync(path.join(__dirname, '../drummers/index.js'), 'utf8');
  const allQuotes = [];
  
  const drummerPattern = /{\s*id:\s*(\d+),\s*\n\s*name:\s*["'`]([^"'`]+)["'`],\s*\n\s*band:\s*["'`]([^"'`]+)["'`]/g;
  
  const drummersList = [];
  let match;
  while ((match = drummerPattern.exec(content)) !== null) {
    drummersList.push({
      id: parseInt(match[1]),
      name: match[2],
      band: match[3]
    });
  }
  
  const sections = content.split(/{\s*id:\s*\d+,/);
  
  drummersList.forEach((drummer, idx) => {
    if (idx + 1 < sections.length) {
      const section = sections[idx + 1];
      const quotesMatch = section.match(/quotes:\s*\[([\s\S]*?)\]/);
      if (quotesMatch) {
        const quotesSection = quotesMatch[1];
        const singleQuotePattern = /{\s*text:\s*["'`]([^"'`]+)["'`],\s*source:\s*["'`]([^"'`]+)["'`](?:,\s*year:\s*(\d+))?(?:,\s*topic:\s*["'`]([^"'`]+)["'`])?\s*}/g;
        let quoteMatch;
        while ((quoteMatch = singleQuotePattern.exec(quotesSection)) !== null) {
          allQuotes.push({
            text: quoteMatch[1],
            source: quoteMatch[2],
            year: quoteMatch[3] ? parseInt(quoteMatch[3]) : null,
            topic: quoteMatch[4] || null,
            drummerId: drummer.id,
            drummerName: drummer.name,
            drummerBand: drummer.band
          });
        }
      }
    }
  });
  
  return allQuotes;
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const quotes = getAllQuotes();
  
  if (quotes.length === 0) {
    return res.status(404).json({ error: 'No quotes found' });
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  return res.status(200).json(randomQuote);
}
