// Vercel Serverless Function - Image Optimization Proxy
// Proxies and optimizes external images through Vercel's CDN
// Supports resizing, WebP conversion, and aggressive caching

const ALLOWED_DOMAINS = [
  'upload.wikimedia.org',
  'commons.wikimedia.org',
  'img.youtube.com',
  'i.ytimg.com',
];

const MAX_AGE = 31536000; // 1 year in seconds
const STALE_WHILE_REVALIDATE = 86400 * 7; // 7 days

// Supported image widths for responsive images (prevents cache fragmentation)
const ALLOWED_WIDTHS = [64, 128, 200, 256, 384, 512, 640, 750, 828, 1080, 1200, 1920];
const DEFAULT_QUALITY = 80;
const MAX_QUALITY = 100;
const MIN_QUALITY = 10;

function getNearestWidth(width) {
  // Find the smallest allowed width that's >= requested width
  const w = parseInt(width, 10);
  if (isNaN(w) || w <= 0) return null;
  
  for (const allowedWidth of ALLOWED_WIDTHS) {
    if (allowedWidth >= w) return allowedWidth;
  }
  return ALLOWED_WIDTHS[ALLOWED_WIDTHS.length - 1];
}

function getQuality(q) {
  const quality = parseInt(q, 10);
  if (isNaN(quality)) return DEFAULT_QUALITY;
  return Math.min(MAX_QUALITY, Math.max(MIN_QUALITY, quality));
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url, w, q, f } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  // Decode and validate URL
  let imageUrl;
  try {
    imageUrl = decodeURIComponent(url);
    const parsedUrl = new URL(imageUrl);
    
    // Security: Only allow whitelisted domains
    if (!ALLOWED_DOMAINS.some(domain => parsedUrl.hostname.endsWith(domain))) {
      return res.status(403).json({ 
        error: 'Domain not allowed',
        allowed: ALLOWED_DOMAINS 
      });
    }
  } catch (e) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  // Process width and quality parameters
  const width = w ? getNearestWidth(w) : null;
  const quality = getQuality(q);
  const format = f === 'webp' || f === 'avif' ? f : null;

  // For Wikipedia Commons, we can request specific sizes directly
  // This reduces bandwidth on their end and ours
  let optimizedUrl = imageUrl;
  if (width && imageUrl.includes('upload.wikimedia.org')) {
    // Wikipedia Commons supports on-the-fly resizing via /thumb/ URLs
    // Example: /wikipedia/commons/thumb/a/ab/Image.jpg/300px-Image.jpg
    const match = imageUrl.match(/\/wikipedia\/commons\/([^/]+)\/([^/]+)\/(.+)$/);
    if (match && !imageUrl.includes('/thumb/')) {
      const [, hash1, hash2, filename] = match;
      optimizedUrl = `https://upload.wikimedia.org/wikipedia/commons/thumb/${hash1}/${hash2}/${filename}/${width}px-${filename}`;
      // Handle .svg files - Wikipedia converts them to PNG
      if (filename.endsWith('.svg')) {
        optimizedUrl = optimizedUrl.replace(/\.svg$/, '.svg.png');
      }
    } else if (imageUrl.includes('/thumb/')) {
      // Already a thumb URL, just replace the width
      optimizedUrl = imageUrl.replace(/\/\d+px-/, `/${width}px-`);
    }
  }

  try {
    // Fetch the image (optimized URL if available)
    const response = await fetch(optimizedUrl, {
      headers: {
        'User-Agent': 'MetalDrummerGear/1.0 (https://metalforge.io; contact: admin@metalforge.io)',
        'Accept': 'image/webp,image/avif,image/*,*/*;q=0.8',
      },
    });

    if (!response.ok) {
      // If optimized URL fails, fall back to original
      if (optimizedUrl !== imageUrl) {
        const fallbackResponse = await fetch(imageUrl, {
          headers: {
            'User-Agent': 'MetalDrummerGear/1.0 (https://metalforge.io)',
            'Accept': 'image/*',
          },
        });
        if (!fallbackResponse.ok) {
          return res.status(response.status).json({ 
            error: `Failed to fetch image: ${response.status}` 
          });
        }
        const buffer = await fallbackResponse.arrayBuffer();
        const contentType = fallbackResponse.headers.get('content-type');
        
        setCacheHeaders(res, contentType);
        return res.status(200).send(Buffer.from(buffer));
      }
      return res.status(response.status).json({ 
        error: `Failed to fetch image: ${response.status}` 
      });
    }

    const contentType = response.headers.get('content-type');
    
    // Only allow image content types
    if (!contentType || !contentType.startsWith('image/')) {
      return res.status(400).json({ error: 'Not an image' });
    }

    const buffer = await response.arrayBuffer();
    
    // Set caching headers
    setCacheHeaders(res, contentType);
    
    // Add optimization hints for debugging
    res.setHeader('X-Optimized-Width', width || 'original');
    res.setHeader('X-Optimized-Quality', quality);
    res.setHeader('X-Original-Url', imageUrl.substring(0, 100));

    return res.status(200).send(Buffer.from(buffer));
  } catch (error) {
    console.error('Image proxy error:', error);
    return res.status(500).json({ error: 'Failed to proxy image' });
  }
}

function setCacheHeaders(res, contentType) {
  res.setHeader('Content-Type', contentType);
  res.setHeader('Cache-Control', `public, max-age=${MAX_AGE}, s-maxage=${MAX_AGE}, stale-while-revalidate=${STALE_WHILE_REVALIDATE}, immutable`);
  res.setHeader('CDN-Cache-Control', `public, max-age=${MAX_AGE}`);
  res.setHeader('Vercel-CDN-Cache-Control', `public, max-age=${MAX_AGE}`);
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Vary', 'Accept');
}
