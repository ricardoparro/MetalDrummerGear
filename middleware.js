// Vercel Edge Middleware
// 1) Markdown for Agents - content negotiation so agents sending
//    `Accept: text/markdown` get a markdown version of page routes, while
//    browsers keep getting HTML.
//    See https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
// 2) Homepage bot-UA meta rewrite (issue #5038, 3rd occurrence of #4368/#4727)
//    - see the block below for why this can't just be a vercel.json rewrite.
//
// Middleware runs BEFORE the filesystem check, which is why this can intercept
// `/` (a static index.html that would otherwise shadow any vercel.json rewrite).

import { next, rewrite } from '@vercel/edge';

export const config = {
  // Only page routes that have a markdown equivalent / need the homepage
  // bot rewrite. Assets and /api are untouched.
  matcher: ['/', '/drummer/:slug'],
};

const BOT_UA_PATTERN = /(Googlebot|Bingbot|GPTBot|ChatGPT-User|ClaudeBot|Claude-Web|anthropic-ai|PerplexityBot|Applebot-Extended|cohere-ai|Google-Extended)/i;

function withVary(response) {
  // Caches must key on both Accept (markdown vs HTML) and User-Agent (bot
  // meta-shell vs regular HTML) so a response meant for one client is never
  // served to another for the same URL.
  response.headers.set('Vary', 'Accept, User-Agent');
  return response;
}

export default function middleware(request) {
  const accept = request.headers.get('accept') || '';
  const path = (new URL(request.url).pathname.replace(/\/+$/, '') || '/');

  if (accept.includes('text/markdown')) {
    let target = null;
    if (path === '/') {
      target = '/api/home/markdown';
    } else {
      const match = path.match(/^\/drummer\/([^/]+)$/);
      if (match) target = `/api/drummer/${match[1]}/markdown`;
    }
    if (target) return withVary(rewrite(new URL(target, request.url)));
    return withVary(next());
  }

  // `/` is the only bot-conditioned route in vercel.json that also
  // corresponds to a real physical file (packages/frontend/dist/index.html
  // from the Expo static export). Vercel resolves the filesystem match
  // before evaluating vercel.json's `rewrites`, so the bot-UA rewrite at
  // vercel.json's `"source": "/"` rule is silently never reached — this is
  // why #4368 and #4727 both "fixed" the meta content/rewrite-rule text but
  // production never changed. Middleware runs earlier than the filesystem
  // check, so it's the only place left that can intercept `/` for bots.
  // `__home` is a sentinel: the catch-all meta function ([...path].js)
  // requires at least one real path segment and normalizes it back to `/`.
  if (path === '/') {
    const userAgent = request.headers.get('user-agent') || '';
    if (BOT_UA_PATTERN.test(userAgent)) {
      return withVary(rewrite(new URL('/api/meta/__home', request.url)));
    }
  }

  return withVary(next());
}
