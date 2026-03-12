// Vercel Serverless Function - Battle Vote API
// Uses Vercel KV for persistent vote storage across all users

import { kv } from '@vercel/kv';

/**
 * Calculate ISO week number
 */
function getISOWeekNumber(date = new Date()) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

/**
 * Generate current battle ID
 */
function getCurrentBattleId() {
  const weekNum = getISOWeekNumber();
  const year = new Date().getFullYear();
  return `battle-${year}-W${weekNum}`;
}

/**
 * Get vote counts for a battle
 */
async function getVotes(battleId) {
  try {
    const votes = await kv.hgetall(`votes:${battleId}`);
    return {
      drummer1: parseInt(votes?.drummer1 || '0', 10),
      drummer2: parseInt(votes?.drummer2 || '0', 10),
    };
  } catch (error) {
    console.error('KV read error:', error);
    // Fallback to zero votes if KV not configured
    return { drummer1: 0, drummer2: 0 };
  }
}

/**
 * Increment vote for a drummer
 */
async function addVote(battleId, choice) {
  try {
    const field = choice === 'drummer1' ? 'drummer1' : 'drummer2';
    await kv.hincrby(`votes:${battleId}`, field, 1);
    return true;
  } catch (error) {
    console.error('KV write error:', error);
    return false;
  }
}

/**
 * Check if IP has already voted (rate limiting)
 */
async function hasVoted(battleId, visitorId) {
  try {
    const voted = await kv.sismember(`voted:${battleId}`, visitorId);
    return voted === 1;
  } catch (error) {
    console.error('KV check error:', error);
    return false;
  }
}

/**
 * Mark visitor as having voted
 */
async function markVoted(battleId, visitorId) {
  try {
    await kv.sadd(`voted:${battleId}`, visitorId);
    // Expire voted set after 1 week
    await kv.expire(`voted:${battleId}`, 60 * 60 * 24 * 7);
    return true;
  } catch (error) {
    console.error('KV mark error:', error);
    return false;
  }
}

/**
 * Generate a simple visitor ID from IP and user agent
 */
function getVisitorId(req) {
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || 
             req.headers['x-real-ip'] || 
             'unknown';
  const ua = req.headers['user-agent'] || '';
  // Simple hash for privacy
  const hash = Buffer.from(ip + ua.slice(0, 50)).toString('base64').slice(0, 16);
  return hash;
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const battleId = req.query.battleId || getCurrentBattleId();
  const visitorId = getVisitorId(req);

  // GET - Fetch current vote counts
  if (req.method === 'GET') {
    const votes = await getVotes(battleId);
    const alreadyVoted = await hasVoted(battleId, visitorId);
    
    return res.status(200).json({
      battleId,
      votes,
      total: votes.drummer1 + votes.drummer2,
      hasVoted: alreadyVoted,
    });
  }

  // POST - Submit a vote
  if (req.method === 'POST') {
    const { choice } = req.body;

    // Validate choice
    if (!choice || !['drummer1', 'drummer2'].includes(choice)) {
      return res.status(400).json({ error: 'Invalid choice. Must be "drummer1" or "drummer2".' });
    }

    // Check if already voted
    const alreadyVoted = await hasVoted(battleId, visitorId);
    if (alreadyVoted) {
      const votes = await getVotes(battleId);
      return res.status(200).json({
        success: false,
        error: 'Already voted',
        battleId,
        votes,
        total: votes.drummer1 + votes.drummer2,
      });
    }

    // Add vote
    const success = await addVote(battleId, choice);
    if (success) {
      await markVoted(battleId, visitorId);
    }

    // Return updated counts
    const votes = await getVotes(battleId);
    
    return res.status(200).json({
      success,
      battleId,
      votes,
      total: votes.drummer1 + votes.drummer2,
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
