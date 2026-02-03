// Vercel Serverless Function - Get all quote topics

const fs = require('fs');
const path = require('path');

function getAllTopics() {
  const content = fs.readFileSync(path.join(__dirname, '../drummers/index.js'), 'utf8');
  const topics = new Set();
  
  // Find all topic values in quotes
  const topicPattern = /topic:\s*["'`]([^"'`]+)["'`]/g;
  let match;
  while ((match = topicPattern.exec(content)) !== null) {
    topics.add(match[1]);
  }
  
  // Add default topics if none found (these are commonly used)
  if (topics.size === 0) {
    ['gear', 'technique', 'philosophy', 'career'].forEach(t => topics.add(t));
  }
  
  return Array.from(topics).sort();
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const topics = getAllTopics();
  return res.status(200).json(topics);
}
