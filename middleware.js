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
// sync if that list changes (tests/crawler-routing.test.mjs enforces it).
// Tokens are crawler-specific on purpose: in-app browsers (Pinterest for iOS,
// LinkedInApp, FBAN/FBAV, Twitter for iPhone) must keep getting the SPA.
const BOT_UA_RE = /.*(Googlebot|Google-InspectionTool|GoogleOther|Bingbot|bingbot|GPTBot|OAI-SearchBot|ChatGPT-User|ClaudeBot|Claude-SearchBot|Claude-User|Claude-Web|anthropic-ai|PerplexityBot|Perplexity-User|Applebot|cohere-ai|Google-Extended|DuckDuckBot|DuckAssistBot|YandexBot|CCBot|Amazonbot|meta-external|MistralAI-User|facebookexternalhit|Facebot|Twitterbot|Slackbot|WhatsApp|Discordbot|LinkedInBot|TelegramBot|Pinterestbot|redditbot|Cardyb).*/i;

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
      // Issue #5111 (4th occurrence): the rewrite target must include the
      // literal `[...path]` function-file segment, matching every other
      // bot-conditioned rule in vercel.json (e.g. `?path=drummer/:slug`).
      // Without it, `/api/meta/?path=` is just `/api/meta/` with an empty
      // segment, which Vercel 308-redirects to `/api/meta` (dropping the
      // trailing slash) before the rewrite ever reaches the catch-all.
      return withVary(rewrite(new URL('/api/meta/[...path]?path=', request.url)), 'Accept, User-Agent');
    }
    return withVary(next(), 'Accept, User-Agent');
  }

  let target = null;
  if (path === '/') {
    target = '/api/home/markdown';
  } else {
    // Serve the build-generated per-drummer profile (public/llms/drummers/,
    // one file for each of the 72 drummers, ~12 KB each). This used to rewrite
    // to /api/drummer/<slug>/markdown, which only knows 23 drummers, 404s for
    // the rest, and returns a one-line bio.
    const match = path.match(/^\/drummer\/([a-z0-9-]+)$/);
    if (match) target = `/llms/drummers/${match[1]}.md`;
  }

  if (!target) {
    return withVary(next(), 'Accept, User-Agent');
  }

  return withVary(rewrite(new URL(target, request.url)), 'Accept, User-Agent');
}
