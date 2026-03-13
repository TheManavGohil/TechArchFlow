# 🚀 create-techarchflow-manav

Scaffold a **production-ready, fully containerized** full-stack project in seconds.

## The Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **API** | Go 1.23 (net/http + GORM) | Fastest memory & latency; Air hot-reload |
| **DB Admin** | Django 5 Admin | Best-in-class database management UI + migrations |
| **Frontend** | SvelteKit 5 + Tailwind 4 + DaisyUI | No virtual DOM, compiler-first, lighter than React |
| **Database** | PostgreSQL 16 | ACID, advanced queries, battle-tested |
| **Orchestration** | Docker Compose | One command boots everything |

## Quick Start

```bash
npx create-techarchflow-manav my-app
cd my-app
docker compose up --build
```

That's it. Four services spin up:

| Service | URL | Port |
|---------|-----|------|
| Frontend (SvelteKit) | http://localhost:5173 | 5173 |
| Go API | http://localhost:3000/api/health | 3000 |
| Django Admin | http://localhost:8000/admin | 8000 |
| PostgreSQL | — | 5432 |

## Architecture

```
┌────────────┐     ┌────────────┐
│  SvelteKit │────▶│   Go API   │
│   :5173    │     │   :3000    │
└────────────┘     └─────┬──────┘
                         │
                   ┌─────▼──────┐
                   │ PostgreSQL │
                   │   :5432    │
                   └─────┬──────┘
                         │
                   ┌─────▼──────┐
                   │   Django   │
                   │   Admin    │
                   │   :8000    │
                   └────────────┘
```

## Project Structure

```
my-app/
├── backend/          # Go API server
│   ├── cmd/          # Entry point
│   ├── handlers/     # Route handlers
│   ├── models/       # GORM models
│   ├── middlewares/   # CORS, logging, auth
│   ├── database/     # DB connection
│   └── Dockerfile
├── db_admin/         # Django Admin
│   ├── db_admin/     # Django settings
│   ├── items/        # Example app
│   └── Dockerfile
├── frontend/         # SvelteKit app
│   ├── src/routes/   # Pages
│   └── Dockerfile
├── docker-compose.yml
├── .env.example
├── Makefile
└── README.md
```

## Useful Commands

```bash
make up          # docker compose up --build
make down        # docker compose down
make logs        # docker compose logs -f
make migrate     # Run Django migrations
make superuser   # Create Django superuser
```

## Default Credentials

| Service | Username | Password |
|---------|----------|----------|
| Django Admin | admin | admin123 |
| PostgreSQL | admin | changeme |

> ⚠️ Change these in `.env` before deploying to production.

## Development

- **Go API**: Edit files in `backend/` — Air watches for changes and hot-reloads
- **SvelteKit**: Edit files in `frontend/src/` — Vite HMR handles hot-reload
- **Django**: Edit files in `db_admin/` — Django dev server auto-reloads

## Why This Stack?

- **Go** is the fastest option for HTTP APIs — minimal memory footprint, incredible latency
- **Django Admin** gives you a complete database management UI out of the box without writing a single line of frontend code for admin operations
- **SvelteKit** compiles away the framework — no virtual DOM overhead, smaller bundles, faster TTI than React/Next.js
- **PostgreSQL** is the most capable open-source database — JSONB, full-text search, window functions, CTEs

## License

MIT
