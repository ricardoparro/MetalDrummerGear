// Vercel Serverless Function - List all quotes with filtering
// Note: This file exists for Vercel routing compatibility (some versions need quotes.js
// in addition to quotes/index.js for the /api/quotes endpoint to work)

const quotesData = require('./quotes-data.js');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { drummer, topic, limit = 50, offset = 0 } = req.query;
  
  let quotes = quotesData.getAllQuotes();
  
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
