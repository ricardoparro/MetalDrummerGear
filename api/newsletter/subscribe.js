// Vercel Serverless Function - Newsletter Subscription
// Stores emails with rate limiting, validation, and GDPR compliance

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
    const { email, gdprConsent } = req.body;

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

    return res.status(200).json({ 
      success: true,
      message: 'Successfully subscribed! 🎸 Welcome to the Metal Drummer community.'
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return res.status(500).json({ 
      error: 'Something went wrong. Please try again later.' 
    });
  }
}
