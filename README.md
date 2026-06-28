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

## Newsletter Email Configuration

The newsletter subscription sends welcome emails via [Resend](https://resend.com). To enable:

1. Create a Resend account at https://resend.com
2. Add your domain or use the free tier with `onboarding@resend.dev`
3. Set environment variables in Vercel:

```bash
RESEND_API_KEY=re_xxxxx          # Your Resend API key
RESEND_FROM_EMAIL=MetalForge <noreply@metalforge.io>  # Optional, defaults shown
```

Without `RESEND_API_KEY`, subscriptions still work but no welcome email is sent.

## Documentation

- [Automation loops — system map](docs/loops.md) - Canonical index of every autonomous loop (production pipeline, L1/L2/L3 verifiers, monitoring, CI gates)
- [Vercel Spend Management](docs/vercel-spend-management.md) - Cost controls and usage alerts setup
- [Broken-image check](docs/broken-image-check.md) - Weekly crawler + umbrella issue model
- [LLM citation check (L2)](docs/llm-citation-check.md) - Weekly auto-test for the "AI citations / week" sub-KPI
- [GSC watch loop (L1)](docs/gsc-watch-loop.md) - Weekly Google organic verifier for the SEO Agent / Roadie pipeline
- [Indexation health loop (L3)](docs/indexation-loop.md) - Weekly check on how many sitemap URLs Google actually indexes
- [Structured-data validation loop](docs/structured-data-loop.md) - Weekly JSON-LD validator that asserts Google-required fields per `@type` (no API key)

---
*Built for metalheads, by metalheads* 🤘
