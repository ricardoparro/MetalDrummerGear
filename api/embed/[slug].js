// Vercel Serverless Function - Embeddable Gear Widget
// Issue #744: Embeddable Gear Widget — Distributed Marketing via Content Creators
//
// Widget Types:
// - Single Drummer Setup (default): Compact card showing drummer + gear summary
// - Usage: <iframe src="https://metalforge.io/embed/joey-jordison" width="400" height="600"></iframe>
//
// Features:
// - Responsive design (works mobile + desktop)
// - Lightweight (no heavy JS)
// - Click → opens full setup on MetalForge.io (new tab)
// - "Powered by MetalForge" badge (branding + backlink)
// - Dark/light theme options (?theme=dark|light)

import { drummers } from '../drummers/index.js';

// Generate URL-friendly slug from drummer name
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Find drummer by slug
function findDrummerBySlug(slug) {
  return drummers.find(d => generateSlug(d.name) === slug);
}

// Generate minimal CSS for the widget
function generateCSS(theme = 'dark') {
  const isDark = theme === 'dark';
  
  return `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      background: ${isDark ? '#0a0a0a' : '#ffffff'};
      color: ${isDark ? '#ffffff' : '#1a1a1a'};
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    .widget {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 16px;
      max-width: 100%;
      overflow: hidden;
    }
    
    .widget-link {
      text-decoration: none;
      color: inherit;
      display: block;
      flex: 1;
    }
    
    .widget-link:hover .drummer-card {
      border-color: #FF6B35;
      transform: translateY(-2px);
    }
    
    .drummer-card {
      background: ${isDark ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'};
      border: 2px solid ${isDark ? '#333' : '#dee2e6'};
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.2s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    
    .drummer-header {
      display: flex;
      align-items: center;
      padding: 16px;
      gap: 12px;
      border-bottom: 1px solid ${isDark ? '#333' : '#dee2e6'};
    }
    
    .drummer-image {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #FF6B35;
      flex-shrink: 0;
    }
    
    .drummer-info {
      flex: 1;
      min-width: 0;
    }
    
    .drummer-name {
      font-size: 18px;
      font-weight: 700;
      color: ${isDark ? '#ffffff' : '#1a1a1a'};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .drummer-band {
      font-size: 14px;
      color: #FF6B35;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .drummer-genre {
      font-size: 12px;
      color: ${isDark ? '#888' : '#6c757d'};
      margin-top: 2px;
    }
    
    .gear-section {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
    }
    
    .gear-title {
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: ${isDark ? '#888' : '#6c757d'};
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    
    .gear-item {
      margin-bottom: 12px;
    }
    
    .gear-label {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      color: #FF6B35;
      margin-bottom: 2px;
    }
    
    .gear-value {
      font-size: 13px;
      color: ${isDark ? '#ccc' : '#495057'};
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .verified-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      color: #4ECDC4;
      margin-top: 8px;
      padding: 4px 8px;
      background: ${isDark ? 'rgba(78, 205, 196, 0.1)' : 'rgba(78, 205, 196, 0.15)'};
      border-radius: 4px;
    }
    
    .cta-button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 12px 16px;
      background: linear-gradient(135deg, #FF6B35 0%, #e55a2b 100%);
      color: white;
      font-size: 14px;
      font-weight: 600;
      border-radius: 8px;
      margin: 0 16px 8px;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    
    .cta-button:hover {
      background: linear-gradient(135deg, #e55a2b 0%, #FF6B35 100%);
      transform: scale(1.02);
    }
    
    .powered-by {
      text-align: center;
      padding: 8px;
      font-size: 11px;
      color: ${isDark ? '#666' : '#adb5bd'};
      border-top: 1px solid ${isDark ? '#222' : '#e9ecef'};
    }
    
    .powered-by a {
      color: #FF6B35;
      text-decoration: none;
      font-weight: 600;
    }
    
    .powered-by a:hover {
      text-decoration: underline;
    }
    
    @media (max-width: 320px) {
      .drummer-name {
        font-size: 16px;
      }
      .drummer-image {
        width: 48px;
        height: 48px;
      }
    }
  `;
}

// Generate HTML for the widget
function generateHTML(drummer, theme = 'dark', referrer = '') {
  const slug = generateSlug(drummer.name);
  const fullUrl = `https://metalforge.io/drummer/${slug}`;
  const trackingUrl = referrer ? `${fullUrl}?ref=embed&source=${encodeURIComponent(referrer)}` : `${fullUrl}?ref=embed`;
  
  // Get image URL - use local path or fallback
  const imageUrl = drummer.image?.startsWith('/') 
    ? `https://metalforge.io${drummer.image}`
    : drummer.image || 'https://metalforge.io/images/placeholder-drummer.webp';
  
  const gear = drummer.gear || {};
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <title>${drummer.name} - Gear Setup | MetalForge</title>
  <style>${generateCSS(theme)}</style>
</head>
<body>
  <div class="widget">
    <a href="${trackingUrl}" target="_blank" rel="noopener" class="widget-link">
      <div class="drummer-card">
        <div class="drummer-header">
          <img 
            src="${imageUrl}" 
            alt="${drummer.name}" 
            class="drummer-image"
            loading="eager"
            onerror="this.src='https://metalforge.io/images/placeholder-drummer.webp'"
          >
          <div class="drummer-info">
            <div class="drummer-name">${drummer.name}</div>
            <div class="drummer-band">${drummer.band}</div>
            <div class="drummer-genre">${drummer.genre}</div>
          </div>
        </div>
        
        <div class="gear-section">
          <div class="gear-title">🥁 Gear Setup</div>
          
          ${gear.drums ? `
          <div class="gear-item">
            <div class="gear-label">Drums</div>
            <div class="gear-value">${gear.drums}</div>
          </div>
          ` : ''}
          
          ${gear.snare ? `
          <div class="gear-item">
            <div class="gear-label">Snare</div>
            <div class="gear-value">${gear.snare}</div>
          </div>
          ` : ''}
          
          ${gear.cymbals ? `
          <div class="gear-item">
            <div class="gear-label">Cymbals</div>
            <div class="gear-value">${gear.cymbals}</div>
          </div>
          ` : ''}
          
          ${gear.hardware ? `
          <div class="gear-item">
            <div class="gear-label">Hardware</div>
            <div class="gear-value">${gear.hardware}</div>
          </div>
          ` : ''}
          
          ${gear.sticks ? `
          <div class="gear-item">
            <div class="gear-label">Sticks</div>
            <div class="gear-value">${gear.sticks}</div>
          </div>
          ` : ''}
          
          ${gear.verified ? `
          <div class="verified-badge">
            ✓ Verified Gear
          </div>
          ` : ''}
        </div>
      </div>
    </a>
    
    <a href="${trackingUrl}" target="_blank" rel="noopener" class="cta-button">
      View Full Setup →
    </a>
    
    <div class="powered-by">
      Powered by <a href="https://metalforge.io?ref=embed" target="_blank" rel="noopener">🔥 MetalForge.io</a>
    </div>
  </div>
  
  <script>
    // Track embed view (minimal analytics)
    (function() {
      try {
        var img = new Image();
        img.src = 'https://metalforge.io/api/embed/track?slug=${slug}&referrer=' + encodeURIComponent(document.referrer);
      } catch(e) {}
    })();
  </script>
</body>
</html>`;
}

// Generate 404 page
function generate404HTML(slug, theme = 'dark') {
  const isDark = theme === 'dark';
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Drummer Not Found | MetalForge</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: ${isDark ? '#0a0a0a' : '#ffffff'};
      color: ${isDark ? '#ffffff' : '#1a1a1a'};
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 20px;
    }
    .error-container {
      max-width: 300px;
    }
    .error-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }
    .error-title {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .error-message {
      font-size: 14px;
      color: ${isDark ? '#888' : '#6c757d'};
      margin-bottom: 16px;
    }
    .error-link {
      color: #FF6B35;
      text-decoration: none;
    }
    .error-link:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="error-container">
    <div class="error-icon">🥁</div>
    <div class="error-title">Drummer Not Found</div>
    <div class="error-message">We couldn't find "${slug}" in our database.</div>
    <a href="https://metalforge.io/drummers" target="_blank" rel="noopener" class="error-link">
      Browse All Drummers →
    </a>
  </div>
</body>
</html>`;
}

export default function handler(req, res) {
  // CORS headers - allow embedding from any domain
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Allow iframe embedding from any domain
  res.setHeader('X-Frame-Options', 'ALLOWALL');
  res.setHeader('Content-Security-Policy', "frame-ancestors *");
  
  // Cache for 1 hour, stale-while-revalidate for 1 day
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { slug } = req.query;
  const theme = req.query.theme === 'light' ? 'light' : 'dark';
  const referrer = req.headers.referer || req.headers.referrer || '';
  
  if (!slug) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(400).send(generate404HTML('unknown', theme));
  }

  const drummer = findDrummerBySlug(slug);
  
  if (!drummer) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(404).send(generate404HTML(slug, theme));
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.status(200).send(generateHTML(drummer, theme, referrer));
}
