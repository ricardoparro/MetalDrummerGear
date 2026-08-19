// Vercel Serverless Function - Site Feedback & Feature Ideas
// Forwards free-text feedback to the owner via Telegram (same bot the daily
// digest / watchdog / newsletter-subscribe use). No third-party feedback
// board, no new accounts — see docs/loops.md's feedback-loop note for why.
//
// Deliberately does NOT write to GitHub Issues: this repo is PUBLIC and its
// issue queue is read and acted on by autonomous agents (CEO/SEO/Roadie). An
// unmoderated public form writing straight into that queue would let a
// visitor's "feedback" contain disguised instructions the agents might later
// treat as real (prompt injection). Telegram keeps a human in the loop —
// the founder decides which ideas become real work.
//
// Required env (already set in Vercel for api/newsletter/subscribe.js):
//   TELEGRAM_BOT_TOKEN  — the bot token (…:…)
//   TELEGRAM_CHAT_ID    — the chat/owner id to notify

const MESSAGE_MIN_LEN = 5;
const MESSAGE_MAX_LEN = 2000;

// In-memory rate limiting (per serverless instance — not perfect but helps;
// same fallback pattern as api/newsletter/subscribe.js, no KV dependency).
const rateLimitMap = new Map();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in ms

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getClientIP(req) {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
         req.headers['x-real-ip'] ||
         'unknown';
}

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }
  if (record.count >= RATE_LIMIT_MAX) return false;
  record.count++;
  return true;
}

function escapeHtml(s) {
  return String(s).replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));
}

async function notifyFeedback({ message, email, page, ip }) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn('[Feedback] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set — feedback logged but not delivered.');
    console.log('FEEDBACK_UNDELIVERED:', JSON.stringify({ message, email, page, ip, at: new Date().toISOString() }));
    return { success: false, reason: 'telegram_not_configured' };
  }

  const when = new Date().toISOString().slice(0, 16).replace('T', ' ');
  const text =
    '💡 <b>New site feedback</b>\n\n' +
    `${escapeHtml(message)}\n\n` +
    (email ? `📧 ${escapeHtml(email)}\n` : '') +
    `🕒 ${when} UTC` +
    (page ? ` · page: ${escapeHtml(page)}` : '') +
    (ip && ip !== 'unknown' ? ` · ip: ${escapeHtml(ip)}` : '');

  try {
    const resp = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    if (!resp.ok) {
      const body = await resp.text().catch(() => '');
      console.error(`[Feedback] Telegram notify failed (${resp.status}): ${body.slice(0, 300)}`);
      return { success: false, reason: 'telegram_send_failed', status: resp.status };
    }
    return { success: true };
  } catch (error) {
    console.error('[Feedback] Exception notifying Telegram:', error.message);
    return { success: false, reason: 'exception', error: error.message };
  }
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type')
      .end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  Object.entries(corsHeaders).forEach(([key, value]) => res.setHeader(key, value));

  try {
    const { message, email, page, hp } = req.body || {};

    // Honeypot: a hidden field real users never fill. If it's filled, this is
    // a bot — return a fake success so the bot doesn't learn to adapt, but
    // never actually send/store anything.
    if (hp) {
      return res.status(200).json({ success: true, message: 'Thanks for the feedback!' });
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Please write a message before sending.' });
    }
    const trimmed = message.trim();
    if (trimmed.length < MESSAGE_MIN_LEN) {
      return res.status(400).json({ error: 'Message is too short — a few more words would help.' });
    }
    if (trimmed.length > MESSAGE_MAX_LEN) {
      return res.status(400).json({ error: `Message is too long (max ${MESSAGE_MAX_LEN} characters).` });
    }

    let normalizedEmail = null;
    if (email && typeof email === 'string' && email.trim()) {
      normalizedEmail = email.toLowerCase().trim();
      if (!isValidEmail(normalizedEmail)) {
        return res.status(400).json({ error: 'That email address doesn\'t look right — leave it blank if you prefer.' });
      }
    }

    const clientIP = getClientIP(req);
    if (!checkRateLimit(clientIP)) {
      return res.status(429).json({ error: 'Too many messages sent. Please try again later.' });
    }

    const pageStr = typeof page === 'string' ? page.slice(0, 200) : null;
    const notifyResult = await notifyFeedback({ message: trimmed, email: normalizedEmail, page: pageStr, ip: clientIP });

    if (!notifyResult.success) {
      console.warn(`[Feedback] Not delivered: ${notifyResult.reason}`);
      // Still return success to the visitor — we logged it server-side even
      // when Telegram delivery fails; don't make them feel their input vanished.
    }

    return res.status(200).json({
      success: true,
      message: 'Thanks! Your feedback goes straight to the founder. 🤘',
      notified: notifyResult.success,
    });
  } catch (error) {
    console.error('Feedback submission error:', error);
    return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
}
