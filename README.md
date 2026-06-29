# Metal Drummer Gear 🥁🤘

A web app for metal drummers to discover legendary drummers and their gear setups.

## Tech Stack

- **Frontend:** React Native Web (Expo)
- **Backend:** Node.js + Express
- **Structure:** npm workspaces monorepo

## Features

- Browse legendary metal drummers
- View detailed gear setups (drums, cymbals, hardware)
- Search by band, genre, or drummer name
- Dark mode support

## Quick Start

```bash
# Install dependencies
npm install

# Run both frontend and backend
npm run dev

# Or run separately
npm run frontend  # Then press 'w' for web
npm run backend
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/drummers` - List all drummers
- `GET /api/drummers/:id` - Get drummer details with gear

## Featured Drummers

- **Lars Ulrich** (Metallica)
- **Joey Jordison** (Slipknot)
- **Gene Hoglan** (Death, Testament)
- **Dave Lombardo** (Slayer)
- **Tomas Haake** (Meshuggah)
- **George Kollias** (Nile)

## Roadie Integration

This project uses Roadie for autonomous issue fixing:

1. Create a GitHub issue with the `ai-fix` label
2. Roadie will pick it up and create a fix
3. A PR will be created automatically

## Project Structure

```
packages/
  frontend/     # Expo app (React Native Web)
  backend/      # Express API server
.roadie/        # Roadie agent configuration
```

## Newsletter Subscription Notifications

The newsletter form does not use a third-party email provider. Instead, each new
subscription pings a **Telegram bot** with the subscriber's email so the owner
sees who signed up in real time (the same bot the daily digest and watchdog use).

Set both env vars in **Vercel → Settings → Environment Variables** (the
serverless function runs on Vercel and can't read GitHub Actions secrets):

```bash
TELEGRAM_BOT_TOKEN=123456789:xxxxx   # the bot token
TELEGRAM_CHAT_ID=123456789           # the chat/owner id to notify
```

Without these, subscriptions still succeed and are stored/logged, but no Telegram
ping is sent (the API logs a warning). Subscribers are persisted in Vercel KV when
`KV_REST_API_URL`/`KV_REST_API_TOKEN` are set, otherwise logged for manual pickup.

## Documentation

- [Automation loops — system map](docs/loops.md) - Canonical index of every autonomous loop (production pipeline, L1/L2/L3 verifiers, monitoring, CI gates)
- [Loop Watchdog](docs/watchdog.md) - Scheduled liveness check that alerts via Telegram (+ an `ops` umbrella issue) when a loop fails, goes stale, or Roadie stalls with 0 PRs
- [Vercel Spend Management](docs/vercel-spend-management.md) - Cost controls and usage alerts setup
- [Broken-image check](docs/broken-image-check.md) - Weekly crawler + umbrella issue model
- [LLM citation check (L2)](docs/llm-citation-check.md) - Weekly auto-test for the "AI citations / week" sub-KPI
- [GSC watch loop (L1)](docs/gsc-watch-loop.md) - Weekly Google organic verifier for the SEO Agent / Roadie pipeline
- [Indexation health loop (L3)](docs/indexation-loop.md) - Weekly check on how many sitemap URLs Google actually indexes
- [Structured-data validation loop](docs/structured-data-loop.md) - Weekly JSON-LD validator that asserts Google-required fields per `@type` (no API key)
- [Prune Proposals](docs/prune-proposals.md) - Daily backstop that bounds the `seo-proposal` idea bank (auto-closes stale/over-cap proposals) so open issues stop accumulating

---
*Built for metalheads, by metalheads* 🤘
