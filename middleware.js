// Vercel Edge Middleware - Markdown for Agents + homepage bot-meta rewrite
// Issue #1151: content negotiation so agents sending `Accept: text/markdown` get a
// markdown version of page routes, while browsers keep getting HTML.
//
// Middleware runs BEFORE the filesystem check, which is why this can intercept
// `/` (a static index.html that would otherwise shadow any vercel.json rewrite).
// See https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
//
// Issue #5038 (3rd occurrence of #4368/#4727): `/` is the only bot-conditioned
// route in vercel.json that also has a physical index.html in the Expo static
// export output. Per Vercel's own docs, "precedence is given to the filesystem
// prior to rewrites being applied" — unconditionally, including rewrites with a
// `has: user-agent` condition (vercel.json:534) — so that rewrite can never
// fire for `/` no matter how many times its content is re-fixed. Every sibling
// bot-rewritten route (/drummers, /genre/:slug, ...) has no matching physical
// file, which is why only `/` keeps regressing. This middleware is the only
// layer that runs early enough to intercept `/` for bots too.
import { next, rewrite } from '@vercel/edge';

export const config = {
  // Only page routes that have a markdown equivalent. Assets and /api are untouched.
  matcher: ['/', '/drummer/:slug'],
};

// Same crawler UA list as vercel.json's other bot-conditioned rewrites.
const BOT_UA = /(Googlebot|Bingbot|GPTBot|ChatGPT-User|ClaudeBot|Claude-Web|anthropic-ai|PerplexityBot|Applebot-Extended|cohere-ai|Google-Extended)/;

function withVary(response, vary) {
  // Caches must key on whatever this response actually varies on, so a
  // markdown/bot-meta response is never served to a browser (or vice-versa)
  // for the same URL.
  response.headers.set('Vary', vary);
  return response;
}

export default function middleware(request) {
  const accept = request.headers.get('accept') || '';
  const path = (new URL(request.url).pathname.replace(/\/+$/, '') || '/');

  // Markdown-for-agents negotiation takes priority — an agent explicitly
  // asking for text/markdown should get it even on `/`.
  if (accept.includes('text/markdown')) {
    let target = null;
    if (path === '/') {
      target = '/api/home/markdown';
    } else {
      const match = path.match(/^\/drummer\/([^/]+)$/);
      if (match) target = `/api/drummer/${match[1]}/markdown`;
    }
    if (target) return withVary(rewrite(new URL(target, request.url)), 'Accept');
    return withVary(next(), 'Accept');
  }

  if (path === '/') {
    const userAgent = request.headers.get('user-agent') || '';
    if (BOT_UA.test(userAgent)) {
      // Re-enter Vercel's routing via the already-working generic
      // `/api/meta/:path*` rewrite (vercel.json:526) with zero path segments,
      // which api/meta/[...path].js's own `req.query.path || []` fallback
      // resolves to the homepage meta (same mechanism proven live for
      // /drummer/:slug, /genre/:slug, etc.).
      const response = withVary(rewrite(new URL('/api/meta', request.url)), 'Accept, User-Agent');
      // Diagnostic marker (issue #5038): proves middleware itself fired and
      // issued the rewrite, independent of whether the downstream function's
      // own `X-Meta-Handler` header also shows up in the final response.
      response.headers.set('X-Homepage-Bot-MW', 'v1');
      return response;
    }
    return withVary(next(), 'Accept, User-Agent');
  }

  return withVary(next(), 'Accept');
}
