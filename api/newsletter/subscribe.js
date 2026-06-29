// Vercel Serverless Function - Newsletter Subscription
// Stores emails with rate limiting, validation, GDPR compliance, and notifies
// the owner via Telegram with each new subscriber's email.
//
// No third-party email provider: instead of sending a welcome email, every new
// subscription pings a Telegram bot (same bot the daily digest / watchdog use)
// so the owner sees who subscribed in real time.
//
// Required env (set these in Vercel → Settings → Environment Variables):
//   TELEGRAM_BOT_TOKEN  — the bot token (…:…)
//   TELEGRAM_CHAT_ID    — the chat/owner id to notify
// Optional env:
//   KV_REST_API_URL / KV_REST_API_TOKEN — durable storage + dedupe (Vercel KV)

// Common disposable email domains to reject
const DISPOSABLE_DOMAINS = new Set([
  'tempmail.com', 'throwaway.email', 'guerrillamail.com', 'mailinator.com',
  'temp-mail.org', '10minutemail.com', 'fakeinbox.com', 'trashmail.com',
  'yopmail.com', 'tempail.com', 'getnada.com', 'mohmal.com', 'discard.email',
  'maildrop.cc', 'sharklasers.com', 'spam4.me', 'dispostable.com'
]);

// In-memory rate limiting (per serverless instance - not perfect but helps)
const rateLimitMap = new Map();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in ms

// In-memory subscriber set (fallback when KV not available)
const subscriberSet = new Set();

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Check if email is from disposable domain
function isDisposableEmail(email) {
  const domain = email.toLowerCase().split('@')[1];
  return DISPOSABLE_DOMAINS.has(domain);
}

// Get client IP from request headers
function getClientIP(req) {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
         req.headers['x-real-ip'] ||
         'unknown';
}

// Check rate limit (in-memory fallback)
function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  // Reset if window expired
  if (now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

// Try to use Vercel KV if available
async function getKV() {
  try {
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      const { kv } = await import('@vercel/kv');
      return kv;
    }
  } catch (e) {
    console.log('KV not available:', e.message);
  }
  return null;
}

// Escape text for Telegram HTML parse mode
function escapeHtml(s) {
  return String(s).replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));
}

// Notify the owner via Telegram that someone subscribed.
// Non-blocking for the subscription itself: a failed notification must not lose
// the subscriber, but we report whether it was delivered so the failure is never
// silent.
async function notifySubscriber({ email, ip, source }) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn('[Newsletter] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set — owner notification skipped.');
    console.warn('[Newsletter] Add both in Vercel → Settings → Environment Variables to receive subscriber pings.');
    return { success: false, reason: 'telegram_not_configured' };
  }

  const when = new Date().toISOString().slice(0, 16).replace('T', ' ');
  const text =
    '🆕 <b>New newsletter subscriber</b>\n' +
    `📧 <code>${escapeHtml(email)}</code>\n` +
    `🕒 ${when} UTC · source: ${escapeHtml(source || 'unknown')}` +
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
      console.error(`[Newsletter] Telegram notify failed (${resp.status}): ${body.slice(0, 300)}`);
      return { success: false, reason: 'telegram_send_failed', status: resp.status };
    }

    console.log(`[Newsletter] Telegram notification sent for ${email}`);
    return { success: true };
  } catch (error) {
    console.error('[Newsletter] Exception notifying Telegram:', error.message);
    return { success: false, reason: 'exception', error: error.message };
  }
}

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type')
      .end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Set CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  try {
    const { email, gdprConsent } = req.body || {};

    // Validate required fields
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    if (!gdprConsent) {
      return res.status(400).json({ error: 'GDPR consent is required' });
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Validate email format
    if (!isValidEmail(normalizedEmail)) {
      return res.status(400).json({ error: 'Please enter a valid email address' });
    }

    // Check for disposable email
    if (isDisposableEmail(normalizedEmail)) {
      return res.status(400).json({ error: 'Disposable email addresses are not allowed' });
    }

    // Rate limiting check
    const clientIP = getClientIP(req);

    // Try Vercel KV first
    const kv = await getKV();

    if (kv) {
      // Use KV for persistent rate limiting and storage
      const rateLimitKey = `newsletter:ratelimit:${clientIP}`;
      const rateLimitCount = await kv.get(rateLimitKey) || 0;

      if (rateLimitCount >= RATE_LIMIT_MAX) {
        return res.status(429).json({
          error: 'Too many subscription attempts. Please try again later.'
        });
      }

      // Check for duplicate subscription
      const subscriberKey = `newsletter:subscriber:${normalizedEmail}`;
      const existingSubscriber = await kv.get(subscriberKey);

      if (existingSubscriber) {
        return res.status(409).json({
          error: 'This email is already subscribed to our newsletter'
        });
      }

      // Store the subscription
      const subscription = {
        email: normalizedEmail,
        subscribedAt: new Date().toISOString(),
        gdprConsent: true,
        consentTimestamp: new Date().toISOString(),
        source: 'footer_cta',
      };

      await kv.set(subscriberKey, subscription);
      await kv.sadd('newsletter:subscribers', normalizedEmail);
      await kv.incr(rateLimitKey);
      await kv.expire(rateLimitKey, 3600); // 1 hour

    } else {
      // Fallback: in-memory rate limiting
      if (!checkRateLimit(clientIP)) {
        return res.status(429).json({
          error: 'Too many subscription attempts. Please try again later.'
        });
      }

      // Check in-memory duplicates (per instance only)
      if (subscriberSet.has(normalizedEmail)) {
        return res.status(409).json({
          error: 'This email is already subscribed to our newsletter'
        });
      }

      subscriberSet.add(normalizedEmail);

      // Log for manual processing when KV not available
      console.log('NEW_NEWSLETTER_SUBSCRIBER:', JSON.stringify({
        email: normalizedEmail,
        subscribedAt: new Date().toISOString(),
        gdprConsent: true,
        source: 'footer_cta',
      }));
    }

    // Notify the owner via Telegram (non-blocking — don't fail the subscription
    // if the notification fails, but report whether it was delivered).
    const notifyResult = await notifySubscriber({
      email: normalizedEmail,
      ip: clientIP,
      source: 'footer_cta',
    });

    if (!notifyResult.success) {
      console.warn(`[Newsletter] Owner notification not sent for ${normalizedEmail}: ${notifyResult.reason}`);
      // Still return success — the subscription was saved.
    }

    return res.status(200).json({
      success: true,
      message: 'Successfully subscribed! 🎸 Welcome to the Metal Drummer community.',
      notified: notifyResult.success,
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return res.status(500).json({
      error: 'Something went wrong. Please try again later.'
    });
  }
}
