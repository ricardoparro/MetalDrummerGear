// Vercel Serverless Function - Battle Vote API (Issue #689)
// Handles vote submission and retrieval for drummer battles

// In-memory vote storage (for MVP - would use database in production)
// Note: This resets on cold starts. For production, use Vercel KV, Redis, or a database.
const battleVotes = new Map();

/**
 * Get or initialize battle vote counts
 * @param {string} battleId 
 * @returns {{ votes1: number, votes2: number }}
 */
function getVotes(battleId) {
  if (!battleVotes.has(battleId)) {
    battleVotes.set(battleId, { votes1: 0, votes2: 0 });
  }
  return battleVotes.get(battleId);
}

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

export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const battleId = req.query.battleId || getCurrentBattleId();

  // GET - Retrieve current vote counts
  if (req.method === 'GET') {
    const votes = getVotes(battleId);
    return res.status(200).json({
      success: true,
      battleId,
      votes1: votes.votes1,
      votes2: votes.votes2,
      total: votes.votes1 + votes.votes2,
    });
  }

  // POST - Submit a vote
  if (req.method === 'POST') {
    try {
      const { drummerId, drummerPosition } = req.body;

      if (!drummerId || !drummerPosition) {
        return res.status(400).json({
          success: false,
          error: 'Missing drummerId or drummerPosition',
        });
      }

      if (drummerPosition !== 1 && drummerPosition !== 2) {
        return res.status(400).json({
          success: false,
          error: 'drummerPosition must be 1 or 2',
        });
      }

      const votes = getVotes(battleId);
      
      // Increment vote count
      if (drummerPosition === 1) {
        votes.votes1 += 1;
      } else {
        votes.votes2 += 1;
      }

      battleVotes.set(battleId, votes);

      return res.status(200).json({
        success: true,
        battleId,
        drummerId,
        votes1: votes.votes1,
        votes2: votes.votes2,
        total: votes.votes1 + votes.votes2,
        message: 'Vote recorded successfully!',
      });
    } catch (error) {
      console.error('Vote error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to record vote',
      });
    }
  }

  // Method not allowed
  return res.status(405).json({
    success: false,
    error: 'Method not allowed',
  });
}
