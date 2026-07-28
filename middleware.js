// Vercel Edge Middleware - Markdown for Agents
// Issue: content negotiation so agents sending `Accept: text/markdown` get a
// markdown version of page routes, while browsers keep getting HTML.
//
// Middleware runs BEFORE the filesystem check, which is why this can intercept
// `/` (a static index.html that would otherwise shadow any vercel.json rewrite).
// See https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/

import { next, rewrite } from '@vercel/edge';

export const config = {
  // Only page routes that have a markdown equivalent. Assets and /api are untouched.
  matcher: ['/', '/drummer/:slug'],
};

// Issue #5038 (3rd occurrence of #4368/#4727): vercel.json's bot-conditioned
// rewrite for `/` -> /api/meta/[...path]?path= never fires because `/` is the
// only bot-rewritten route that also has a physical index.html in the static
// export, and Vercel's filesystem check runs *after* middleware but *before*
// vercel.json rewrites, so the static file always wins for that one route.
// Same bot UA list as vercel.json's other bot-conditioned rewrites — keep in
// sync if that list changes.
const BOT_UA_RE = /.*(Googlebot|Bingbot|GPTBot|ChatGPT-User|ClaudeBot|Claude-Web|anthropic-ai|PerplexityBot|Applebot-Extended|cohere-ai|Google-Extended).*/;

function withVary(response, varyOn) {
  // Caches must key on the same headers we branch on, so a bot/markdown
  // response is never served to a browser (or vice-versa) for the same URL.
  response.headers.set('Vary', varyOn);
  return response;
}

export default function middleware(request) {
  const accept = request.headers.get('accept') || '';
  const userAgent = request.headers.get('user-agent') || '';
  const path = (new URL(request.url).pathname.replace(/\/+$/, '') || '/');

  // Browsers/default clients never send text/markdown -> serve HTML as usual,
  // except the homepage still needs the bot-UA meta-shell rewrite below since
  // that's the one route the filesystem shadows.
  if (!accept.includes('text/markdown')) {
    if (path === '/' && BOT_UA_RE.test(userAgent)) {
      // Issue #5111 (4th occurrence): must target the function's own bracket
      // path literally, exactly like every sibling bot-conditioned rewrite in
      // vercel.json (e.g. `/api/meta/[...path]?path=drummers`). The #5038 fix
      // dropped the `[...path]` segment, rewriting to a bare `/api/meta/?path=`
      // directory path instead — Vercel normalizes that trailing slash away
      // with a 308 *before* the rewrite ever reaches the function, so the
      // redirect response was served with none of the homepage JSON-LD.
      return withVary(rewrite(new URL('/api/meta/[...path]?path=', request.url)), 'Accept, User-Agent');
    }
    return withVary(next(), 'Accept, User-Agent');
  }

  let target = null;
  if (path === '/') {
    target = '/api/home/markdown';
  } else {
    const match = path.match(/^\/drummer\/([^/]+)$/);
    if (match) target = `/api/drummer/${match[1]}/markdown`;
  }

  if (!target) {
    return withVary(next(), 'Accept, User-Agent');
  }

  return withVary(rewrite(new URL(target, request.url)), 'Accept, User-Agent');
}
