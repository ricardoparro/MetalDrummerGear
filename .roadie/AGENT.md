# Roadie Agent Configuration

## Project: Metal Drummer Gear

A web app for metal drummers to discover legendary drummers and their gear setups.

## Tech Stack
- **Frontend:** React Native Web (Expo), JavaScript/TypeScript
- **Backend:** Node.js, Express
- **Package Manager:** npm workspaces

## Architecture
```
packages/
  frontend/    # Expo app (React Native Web)
  backend/     # Express API server
```

## Data Model
- **Drummer:** id, name, band, genre, country, image, gear
- **Gear:** drums, snare, cymbals, hardware

## Commands
- `npm run dev` - Start both frontend and backend
- `npm run frontend` - Start frontend only (Expo web)
- `npm run backend` - Start backend only
- `npm run build` - Build frontend for production

## API Endpoints
- `GET /api/health` - Health check
- `GET /api/drummers` - List drummers (query: genre, search)
- `GET /api/drummers/:id` - Drummer details with gear

## Coding Standards
- Use modern JavaScript/TypeScript
- React Native best practices
- RESTful API design
- Meaningful variable names
- Comment complex logic

## Testing
- Run app in browser: `npm run frontend` then press `w`
- Test API: `curl http://localhost:3001/api/drummers`

## Data Modules
- **Album drum-setup articles** are split into per-drummer modules. Add a new
  article to `packages/frontend/data/albumArticles/<drummer-slug>.js` (create the
  file if the drummer has no module yet — slug = drummer name lowercased with
  non-alphanumeric runs collapsed to `-`; use `various` for programmed/no-drummer
  entries), then register the module in `packages/frontend/data/albumArticles/index.js`
  (one `import` + one spread line). Do **NOT** append to
  `packages/frontend/data/albumArticles.js` — it is now a thin barrel that
  re-exports the composed `ALBUM_ARTICLES` map (and helper functions) unchanged.
  This mirrors the `packages/frontend/data/licks/` per-drummer layout.

## When Fixing Issues
1. Read the issue description carefully
2. Check existing code structure
3. Make minimal, focused changes
4. Test in browser before committing
5. Update relevant documentation
