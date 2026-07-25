// Vercel Edge Middleware - Markdown for Agents + homepage bot meta
// Issue: content negotiation so agents sending `Accept: text/markdown` get a
// markdown version of page routes, while browsers keep getting HTML.
//
// Middleware runs BEFORE the filesystem check, which is why this can intercept
// `/` (a static index.html that would otherwise shadow any vercel.json rewrite).
// See https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
//
// Issue #5038 (3rd occurrence of #4368/#4727): the same filesystem-shadow gap
// also swallows vercel.json:534's bot-UA rewrite for "/" (Vercel docs: "the
// source property should NOT be a file because precedence is given to the
// filesystem prior to rewrites being applied"). Every other bot-conditioned
// route works because it has no physical file to shadow it - only "/" does.
// Reuse this same before-the-filesystem-check hook to route bot UAs on "/" to
// the full meta handler (api/home/meta.js) directly, instead of depending on
// a vercel.json rewrite that structurally can never fire for this one route.
import { next, rewrite } from '@vercel/edge';

export const config = {
  // Only page routes that have a markdown equivalent. Assets and /api are untouched.
  matcher: ['/', '/drummer/:slug'],
};

const BOT_UA_RE = /(Googlebot|Bingbot|GPTBot|ChatGPT-User|ClaudeBot|Claude-Web|anthropic-ai|PerplexityBot|Applebot-Extended|cohere-ai|Google-Extended)/;

function withVary(response, path) {
  // Caches must key on Accept so a markdown response is never served to a
  // browser (or vice-versa) for the same URL. "/" additionally varies by
  // User-Agent (bot meta HTML vs. the human SPA shell) - see #5038 above.
  response.headers.set('Vary', path === '/' ? 'Accept, User-Agent' : 'Accept');
  return response;
}

export default function middleware(request) {
  const path = (new URL(request.url).pathname.replace(/\/+$/, '') || '/');
  const accept = request.headers.get('accept') || '';

  // An agent explicitly asking for markdown keeps getting it, even on "/" for
  // a UA that's also in BOT_UA_RE below - Accept is the more specific signal.
  if (accept.includes('text/markdown')) {
    let target = null;
    if (path === '/') {
      target = '/api/home/markdown';
    } else {
      const match = path.match(/^\/drummer\/([^/]+)$/);
      if (match) target = `/api/drummer/${match[1]}/markdown`;
    }

    if (target) {
      return withVary(rewrite(new URL(target, request.url)), path);
    }
  }

  const userAgent = request.headers.get('user-agent') || '';
  if (path === '/' && BOT_UA_RE.test(userAgent)) {
    return withVary(rewrite(new URL('/api/home/meta', request.url)), path);
  }

  return withVary(next(), path);
}
