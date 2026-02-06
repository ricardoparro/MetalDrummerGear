// Vercel Serverless Function - Newsletter Subscription
// Stores emails with rate limiting, validation, GDPR compliance, and sends welcome email

import { Resend } from 'resend';

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

// Generate welcome email HTML
function getWelcomeEmailHtml(email) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to MetalForge!</title>
</head>
<body style="margin: 0; padding: 0; background-color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #1a1a1a;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #2a2a2a; border-radius: 12px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold;">🥁 MetalForge</h1>
              <p style="margin: 10px 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">Gear Updates from the Legends</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px; color: #ffffff; font-size: 24px;">Welcome to the Community! 🤘</h2>
              
              <p style="margin: 0 0 20px; color: #d1d5db; font-size: 16px; line-height: 1.6;">
                You're now part of an exclusive community of metal drummers who want to stay ahead of the game.
              </p>
              
              <p style="margin: 0 0 20px; color: #d1d5db; font-size: 16px; line-height: 1.6;">
                Here's what you can expect:
              </p>
              
              <ul style="margin: 0 0 30px; padding-left: 20px; color: #d1d5db; font-size: 16px; line-height: 1.8;">
                <li>🎯 <strong style="color: #ffffff;">Pro Gear Setups</strong> — Discover what your favorite drummers actually use</li>
                <li>🆕 <strong style="color: #ffffff;">New Gear Alerts</strong> — Be the first to know about new releases</li>
                <li>💡 <strong style="color: #ffffff;">Exclusive Tips</strong> — Insights from legendary metal drummers</li>
                <li>🔥 <strong style="color: #ffffff;">Community Content</strong> — Curated content just for metal drummers</li>
              </ul>
              
              <p style="margin: 0 0 30px; color: #d1d5db; font-size: 16px; line-height: 1.6;">
                In the meantime, check out our latest gear guides and drummer profiles at <a href="https://metalforge.io" style="color: #dc2626; text-decoration: none; font-weight: bold;">metalforge.io</a>
              </p>
              
              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                <tr>
                  <td style="border-radius: 8px; background-color: #dc2626;">
                    <a href="https://metalforge.io" style="display: inline-block; padding: 16px 32px; color: #ffffff; font-size: 16px; font-weight: bold; text-decoration: none;">
                      Explore MetalForge →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #1f1f1f; padding: 30px; text-align: center; border-top: 1px solid #333;">
              <p style="margin: 0 0 10px; color: #9ca3af; font-size: 14px;">
                You're receiving this because you subscribed at metalforge.io
              </p>
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                © ${new Date().getFullYear()} MetalForge. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

// Generate welcome email plain text
function getWelcomeEmailText() {
  return `
Welcome to MetalForge! 🤘

You're now part of an exclusive community of metal drummers who want to stay ahead of the game.

Here's what you can expect:
- Pro Gear Setups — Discover what your favorite drummers actually use
- New Gear Alerts — Be the first to know about new releases  
- Exclusive Tips — Insights from legendary metal drummers
- Community Content — Curated content just for metal drummers

Check out our latest gear guides and drummer profiles at https://metalforge.io

Rock on! 🥁

---
You're receiving this because you subscribed at metalforge.io
© ${new Date().getFullYear()} MetalForge. All rights reserved.
`;
}

// Send welcome email via Resend
async function sendWelcomeEmail(email) {
  // Check if Resend API key is configured
  if (!process.env.RESEND_API_KEY) {
    console.log('RESEND_API_KEY not configured, skipping welcome email');
    return { success: false, reason: 'api_key_not_configured' };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'MetalForge <noreply@metalforge.io>',
      to: [email],
      subject: '🥁 Welcome to MetalForge — You\'re In!',
      html: getWelcomeEmailHtml(email),
      text: getWelcomeEmailText(),
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, reason: 'send_failed', error };
    }

    console.log('Welcome email sent:', data?.id);
    return { success: true, emailId: data?.id };
  } catch (error) {
    console.error('Failed to send welcome email:', error);
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

    // Send welcome email (non-blocking - don't fail subscription if email fails)
    const emailResult = await sendWelcomeEmail(normalizedEmail);
    
    if (!emailResult.success) {
      console.warn('Welcome email not sent:', emailResult.reason);
      // Still return success - subscription was saved
    }

    return res.status(200).json({ 
      success: true,
      message: 'Successfully subscribed! 🎸 Welcome to the Metal Drummer community.',
      emailSent: emailResult.success,
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return res.status(500).json({ 
      error: 'Something went wrong. Please try again later.' 
    });
  }
}
