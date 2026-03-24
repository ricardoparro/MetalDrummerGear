// Vercel Serverless Function - Embed Widget Gallery
// Issue #768: Embeddable Gear Widgets — Distributed Marketing Engine
//
// Showcase page for embed widgets with copy-paste embed codes.
// Features live previews, theme options, and usage examples.
//
// Usage: https://metalforge.io/embed/gallery

import { drummers } from '../drummers/index.js';

// Generate URL-friendly slug from drummer name
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Featured drummers (iconic metal drummers for showcase)
const FEATURED_SLUGS = [
  'joey-jordison',
  'lars-ulrich', 
  'george-kollias',
  'mario-duplantier',
  'brann-dailor',
  'dave-lombardo',
  'gene-hoglan',
  'chris-adler'
];

function generateGalleryHTML() {
  const featuredDrummers = drummers
    .filter(d => FEATURED_SLUGS.includes(generateSlug(d.name)))
    .slice(0, 8);
  
  // If we don't have all featured, add some more
  if (featuredDrummers.length < 5) {
    const remaining = drummers
      .filter(d => !FEATURED_SLUGS.includes(generateSlug(d.name)))
      .slice(0, 5 - featuredDrummers.length);
    featuredDrummers.push(...remaining);
  }
  
  const drummerCards = featuredDrummers.map(drummer => {
    const slug = generateSlug(drummer.name);
    const embedCode = `<iframe src="https://metalforge.io/embed/${slug}" width="400" height="600" frameborder="0" style="border-radius: 12px;"></iframe>`;
    const embedCodeLight = `<iframe src="https://metalforge.io/embed/${slug}?theme=light" width="400" height="600" frameborder="0" style="border-radius: 12px;"></iframe>`;
    
    return `
      <div class="drummer-showcase" data-slug="${slug}">
        <div class="showcase-header">
          <h3>${drummer.name}</h3>
          <span class="badge">${drummer.band}</span>
        </div>
        
        <div class="preview-container">
          <div class="preview-frame">
            <iframe 
              src="https://metalforge.io/embed/${slug}" 
              width="100%" 
              height="500"
              frameborder="0"
              loading="lazy"
            ></iframe>
          </div>
          
          <div class="embed-options">
            <div class="theme-toggle">
              <button class="theme-btn active" data-theme="dark" data-slug="${slug}">🌙 Dark</button>
              <button class="theme-btn" data-theme="light" data-slug="${slug}">☀️ Light</button>
            </div>
            
            <div class="code-block">
              <div class="code-header">
                <span>Embed Code</span>
                <button class="copy-btn" data-code="${encodeURIComponent(embedCode)}">📋 Copy</button>
              </div>
              <pre class="code-content" id="code-${slug}">${escapeHtml(embedCode)}</pre>
            </div>
            
            <div class="size-options">
              <label>Size:</label>
              <select class="size-select" data-slug="${slug}">
                <option value="400x600">Standard (400×600)</option>
                <option value="320x500">Compact (320×500)</option>
                <option value="500x700">Large (500×700)</option>
                <option value="100%x600">Full Width (100%×600)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Embeddable Gear Widgets | MetalForge</title>
  <meta name="description" content="Add interactive drummer gear widgets to your YouTube descriptions, blog posts, forums, and more. Free embeddable widgets for metal content creators.">
  <meta property="og:title" content="Embeddable Gear Widgets | MetalForge">
  <meta property="og:description" content="Add interactive drummer gear widgets to your content. Free for creators.">
  <meta property="og:image" content="https://metalforge.io/og-image.png">
  <meta property="og:url" content="https://metalforge.io/embed/gallery">
  <link rel="icon" href="https://metalforge.io/favicon.svg" type="image/svg+xml">
  <style>
    :root {
      --bg-primary: #0a0a0a;
      --bg-secondary: #1a1a2e;
      --bg-card: #16213e;
      --text-primary: #ffffff;
      --text-secondary: #888;
      --accent: #FF6B35;
      --accent-hover: #e55a2b;
      --border: #333;
      --success: #4ECDC4;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      background: var(--bg-primary);
      color: var(--text-primary);
      line-height: 1.6;
    }
    
    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    
    header {
      text-align: center;
      margin-bottom: 60px;
    }
    
    .logo {
      font-size: 32px;
      margin-bottom: 8px;
    }
    
    h1 {
      font-size: 42px;
      font-weight: 800;
      margin-bottom: 16px;
      background: linear-gradient(135deg, var(--accent) 0%, #ff8f6b 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .subtitle {
      font-size: 20px;
      color: var(--text-secondary);
      max-width: 600px;
      margin: 0 auto 30px;
    }
    
    .benefits {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 20px;
      margin-bottom: 40px;
    }
    
    .benefit {
      background: var(--bg-secondary);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 20px 24px;
      display: flex;
      align-items: center;
      gap: 12px;
      transition: transform 0.2s ease;
    }
    
    .benefit:hover {
      transform: translateY(-2px);
    }
    
    .benefit-icon {
      font-size: 24px;
    }
    
    .benefit-text {
      font-size: 14px;
      font-weight: 600;
    }
    
    .how-it-works {
      background: var(--bg-secondary);
      border-radius: 16px;
      padding: 40px;
      margin-bottom: 60px;
    }
    
    .how-it-works h2 {
      text-align: center;
      font-size: 28px;
      margin-bottom: 30px;
    }
    
    .steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
    }
    
    .step {
      text-align: center;
    }
    
    .step-number {
      width: 48px;
      height: 48px;
      background: var(--accent);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: 700;
      margin: 0 auto 16px;
    }
    
    .step h3 {
      font-size: 18px;
      margin-bottom: 8px;
    }
    
    .step p {
      color: var(--text-secondary);
      font-size: 14px;
    }
    
    .gallery-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }
    
    .gallery-header h2 {
      font-size: 28px;
    }
    
    .search-box {
      display: flex;
      gap: 10px;
    }
    
    .search-input {
      background: var(--bg-secondary);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 12px 16px;
      color: var(--text-primary);
      font-size: 14px;
      width: 250px;
    }
    
    .search-input:focus {
      outline: none;
      border-color: var(--accent);
    }
    
    .search-input::placeholder {
      color: var(--text-secondary);
    }
    
    .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
      gap: 30px;
      margin-bottom: 60px;
    }
    
    @media (max-width: 500px) {
      .gallery {
        grid-template-columns: 1fr;
      }
    }
    
    .drummer-showcase {
      background: var(--bg-secondary);
      border: 1px solid var(--border);
      border-radius: 16px;
      overflow: hidden;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .drummer-showcase:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 30px rgba(255, 107, 53, 0.1);
    }
    
    .showcase-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      border-bottom: 1px solid var(--border);
    }
    
    .showcase-header h3 {
      font-size: 20px;
    }
    
    .badge {
      background: var(--accent);
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }
    
    .preview-container {
      padding: 20px;
    }
    
    .preview-frame {
      background: var(--bg-primary);
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 20px;
    }
    
    .preview-frame iframe {
      display: block;
      width: 100%;
      border: none;
      border-radius: 12px;
    }
    
    .embed-options {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .theme-toggle {
      display: flex;
      gap: 10px;
    }
    
    .theme-btn {
      flex: 1;
      padding: 10px 16px;
      border: 2px solid var(--border);
      border-radius: 8px;
      background: transparent;
      color: var(--text-primary);
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .theme-btn:hover {
      border-color: var(--accent);
    }
    
    .theme-btn.active {
      background: var(--accent);
      border-color: var(--accent);
    }
    
    .code-block {
      background: var(--bg-primary);
      border-radius: 8px;
      overflow: hidden;
    }
    
    .code-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 16px;
      background: var(--bg-card);
      border-bottom: 1px solid var(--border);
    }
    
    .code-header span {
      font-size: 12px;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .copy-btn {
      background: var(--accent);
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s ease;
    }
    
    .copy-btn:hover {
      background: var(--accent-hover);
    }
    
    .copy-btn.copied {
      background: var(--success);
    }
    
    .code-content {
      padding: 16px;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 12px;
      line-height: 1.5;
      overflow-x: auto;
      white-space: pre-wrap;
      word-break: break-all;
      color: #e0e0e0;
    }
    
    .size-options {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .size-options label {
      font-size: 14px;
      color: var(--text-secondary);
    }
    
    .size-select {
      flex: 1;
      background: var(--bg-primary);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 10px 12px;
      color: var(--text-primary);
      font-size: 14px;
      cursor: pointer;
    }
    
    .size-select:focus {
      outline: none;
      border-color: var(--accent);
    }
    
    .use-cases {
      background: var(--bg-secondary);
      border-radius: 16px;
      padding: 40px;
      margin-bottom: 60px;
    }
    
    .use-cases h2 {
      text-align: center;
      font-size: 28px;
      margin-bottom: 30px;
    }
    
    .use-case-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }
    
    .use-case {
      background: var(--bg-card);
      border-radius: 12px;
      padding: 24px;
      text-align: center;
      transition: transform 0.2s ease;
    }
    
    .use-case:hover {
      transform: translateY(-4px);
    }
    
    .use-case-icon {
      font-size: 36px;
      margin-bottom: 12px;
    }
    
    .use-case h4 {
      font-size: 16px;
      margin-bottom: 8px;
    }
    
    .use-case p {
      font-size: 13px;
      color: var(--text-secondary);
    }
    
    footer {
      text-align: center;
      padding: 40px 20px;
      border-top: 1px solid var(--border);
    }
    
    footer a {
      color: var(--accent);
      text-decoration: none;
    }
    
    footer a:hover {
      text-decoration: underline;
    }
    
    .cta-section {
      text-align: center;
      padding: 60px 40px;
      background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-card) 100%);
      border-radius: 16px;
      margin-bottom: 40px;
    }
    
    .cta-section h2 {
      font-size: 32px;
      margin-bottom: 16px;
    }
    
    .cta-section p {
      color: var(--text-secondary);
      margin-bottom: 24px;
    }
    
    .cta-btn {
      display: inline-block;
      background: var(--accent);
      color: white;
      padding: 14px 32px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      text-decoration: none;
      transition: background 0.2s ease;
    }
    
    .cta-btn:hover {
      background: var(--accent-hover);
      text-decoration: none;
    }
    
    .all-drummers-link {
      display: block;
      text-align: center;
      margin-top: 30px;
    }
    
    .all-drummers-link a {
      color: var(--accent);
      text-decoration: none;
      font-weight: 600;
    }
    
    .all-drummers-link a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="logo">🔥</div>
      <h1>Embeddable Gear Widgets</h1>
      <p class="subtitle">Add interactive drummer gear cards to your YouTube descriptions, blog posts, forums, and anywhere you can embed HTML.</p>
      
      <div class="benefits">
        <div class="benefit">
          <span class="benefit-icon">🎯</span>
          <span class="benefit-text">Free Forever</span>
        </div>
        <div class="benefit">
          <span class="benefit-icon">⚡</span>
          <span class="benefit-text">Fast Loading</span>
        </div>
        <div class="benefit">
          <span class="benefit-icon">📱</span>
          <span class="benefit-text">Mobile Friendly</span>
        </div>
        <div class="benefit">
          <span class="benefit-icon">🌙</span>
          <span class="benefit-text">Dark/Light Themes</span>
        </div>
        <div class="benefit">
          <span class="benefit-icon">🔄</span>
          <span class="benefit-text">Auto Updates</span>
        </div>
      </div>
    </header>
    
    <section class="how-it-works">
      <h2>How It Works</h2>
      <div class="steps">
        <div class="step">
          <div class="step-number">1</div>
          <h3>Choose a Drummer</h3>
          <p>Browse our collection of iconic metal drummers and their complete gear setups.</p>
        </div>
        <div class="step">
          <div class="step-number">2</div>
          <h3>Copy Embed Code</h3>
          <p>Click the copy button to get the HTML embed code for your chosen drummer.</p>
        </div>
        <div class="step">
          <div class="step-number">3</div>
          <h3>Paste & Done</h3>
          <p>Paste the code into your blog, forum post, or anywhere that accepts HTML.</p>
        </div>
      </div>
    </section>
    
    <section class="gallery-section">
      <div class="gallery-header">
        <h2>🥁 Widget Gallery</h2>
        <div class="search-box">
          <input type="text" class="search-input" id="search" placeholder="Search drummers...">
        </div>
      </div>
      
      <div class="gallery" id="gallery">
        ${drummerCards}
      </div>
      
      <div class="all-drummers-link">
        <a href="https://metalforge.io/drummers" target="_blank">View all ${drummers.length} drummers →</a>
      </div>
    </section>
    
    <section class="use-cases">
      <h2>Where to Use These Widgets</h2>
      <div class="use-case-grid">
        <div class="use-case">
          <div class="use-case-icon">🎬</div>
          <h4>YouTube Descriptions</h4>
          <p>Add gear specs below your drum covers and reaction videos.</p>
        </div>
        <div class="use-case">
          <div class="use-case-icon">📝</div>
          <h4>Blog Posts</h4>
          <p>Enhance gear reviews with live, interactive widgets.</p>
        </div>
        <div class="use-case">
          <div class="use-case-icon">💬</div>
          <h4>Forum Signatures</h4>
          <p>Show your favorite drummer's setup in your signature.</p>
        </div>
        <div class="use-case">
          <div class="use-case-icon">📚</div>
          <h4>Reddit Wikis</h4>
          <p>Upgrade text lists to visual gear guides.</p>
        </div>
        <div class="use-case">
          <div class="use-case-icon">🌐</div>
          <h4>Personal Websites</h4>
          <p>Add dynamic content to your drummer portfolio.</p>
        </div>
        <div class="use-case">
          <div class="use-case-icon">📰</div>
          <h4>Newsletters</h4>
          <p>Include gear widgets in email campaigns (HTML emails).</p>
        </div>
      </div>
    </section>
    
    <section class="cta-section">
      <h2>Can't Find Your Drummer?</h2>
      <p>We're always adding new drummers. Visit MetalForge to explore our full database or request a new drummer.</p>
      <a href="https://metalforge.io" target="_blank" class="cta-btn">Explore MetalForge →</a>
    </section>
  </div>
  
  <footer>
    <p>
      Made with 🔥 by <a href="https://metalforge.io" target="_blank">MetalForge.io</a>
      &nbsp;•&nbsp;
      <a href="https://metalforge.io/drummers" target="_blank">All Drummers</a>
      &nbsp;•&nbsp;
      <a href="https://twitter.com/MetalDrumGear" target="_blank">@MetalDrumGear</a>
    </p>
  </footer>
  
  <script>
    // Theme toggle functionality
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const slug = this.dataset.slug;
        const theme = this.dataset.theme;
        const showcase = this.closest('.drummer-showcase');
        const iframe = showcase.querySelector('iframe');
        const codeEl = document.getElementById('code-' + slug);
        
        // Update active state
        showcase.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Update iframe
        const url = new URL(iframe.src);
        if (theme === 'light') {
          url.searchParams.set('theme', 'light');
        } else {
          url.searchParams.delete('theme');
        }
        iframe.src = url.toString();
        
        // Update code
        const sizeSelect = showcase.querySelector('.size-select');
        updateEmbedCode(slug, theme, sizeSelect.value);
      });
    });
    
    // Size select functionality
    document.querySelectorAll('.size-select').forEach(select => {
      select.addEventListener('change', function() {
        const slug = this.dataset.slug;
        const showcase = this.closest('.drummer-showcase');
        const activeTheme = showcase.querySelector('.theme-btn.active').dataset.theme;
        updateEmbedCode(slug, activeTheme, this.value);
      });
    });
    
    function updateEmbedCode(slug, theme, size) {
      const [width, height] = size.split('x');
      const themeParam = theme === 'light' ? '?theme=light' : '';
      const code = '<iframe src="https://metalforge.io/embed/' + slug + themeParam + '" width="' + width + '" height="' + height + '" frameborder="0" style="border-radius: 12px;"></iframe>';
      
      const codeEl = document.getElementById('code-' + slug);
      codeEl.textContent = code;
      
      // Update copy button data
      const showcase = codeEl.closest('.drummer-showcase');
      const copyBtn = showcase.querySelector('.copy-btn');
      copyBtn.dataset.code = encodeURIComponent(code);
    }
    
    // Copy functionality
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', async function() {
        const code = decodeURIComponent(this.dataset.code);
        
        try {
          await navigator.clipboard.writeText(code);
          this.textContent = '✓ Copied!';
          this.classList.add('copied');
          
          setTimeout(() => {
            this.textContent = '📋 Copy';
            this.classList.remove('copied');
          }, 2000);
        } catch (err) {
          // Fallback for older browsers
          const textarea = document.createElement('textarea');
          textarea.value = code;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          
          this.textContent = '✓ Copied!';
          this.classList.add('copied');
          
          setTimeout(() => {
            this.textContent = '📋 Copy';
            this.classList.remove('copied');
          }, 2000);
        }
      });
    });
    
    // Search functionality
    document.getElementById('search').addEventListener('input', function(e) {
      const query = e.target.value.toLowerCase();
      document.querySelectorAll('.drummer-showcase').forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const band = card.querySelector('.badge').textContent.toLowerCase();
        const matches = name.includes(query) || band.includes(query);
        card.style.display = matches ? 'block' : 'none';
      });
    });
  </script>
</body>
</html>`;
}

// Escape HTML entities
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default function handler(req, res) {
  // Standard page headers (not iframe headers)
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  
  return res.status(200).send(generateGalleryHTML());
}
