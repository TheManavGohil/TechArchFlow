# {{PROJECT_NAME}}

> Built with [TechArchFlow](https://github.com/TheManavGohil/TechArchFlow) — the most optimal full-stack starter kit.

## 🚀 Quick Start

```bash
# 1. Copy environment file
cp .env.example .env

# 2. Start all services
docker compose up --build
```

**That's it!** All four services will boot up:

| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend** | http://localhost:5173 | SvelteKit + Tailwind + DaisyUI |
| **Go API** | http://localhost:3000/api/health | REST API with GORM |
| **Django Admin** | http://localhost:8000/admin | Database management UI |
| **PostgreSQL** | localhost:5432 | Database |

## 🏗️ Architecture

```
┌─────────────────┐      ┌─────────────────┐
│    SvelteKit     │─────▶│     Go API      │
│   (Frontend)     │      │   (Backend)     │
│   Port: 5173     │      │   Port: 3000    │
└─────────────────┘      └────────┬────────┘
                                  │
                          ┌───────▼────────┐
                          │  PostgreSQL    │
                          │  Port: 5432    │
                          └───────┬────────┘
                                  │
                          ┌───────▼────────┐
                          │  Django Admin  │
                          │  Port: 8000    │
                          └────────────────┘
```

Both Go (GORM) and Django share the same PostgreSQL database. Go handles API requests while Django provides the admin UI.

## 📁 Project Structure

```
{{PROJECT_NAME}}/
├── backend/               # Go API server
│   ├── cmd/main.go        # Entry point & router
│   ├── handlers/          # Request handlers (CRUD)
│   ├── models/            # GORM models
│   ├── middlewares/        # CORS, logging, JWT auth
│   ├── database/          # DB connection
│   ├── .air.toml          # Hot-reload config
│   └── Dockerfile
├── db_admin/              # Django Admin
│   ├── db_admin/          # Django project settings
│   ├── items/             # Example app (models + admin)
│   ├── entrypoint.sh      # Wait for DB, migrate, create superuser
│   └── Dockerfile
├── frontend/              # SvelteKit app
│   ├── src/
│   │   ├── routes/        # Pages (/, /items)
│   │   ├── app.html       # HTML shell
│   │   └── app.css        # Tailwind + DaisyUI
│   └── Dockerfile
├── docker-compose.yml     # Orchestration
├── .env.example           # Environment template
├── Makefile               # Convenience commands
└── README.md              # This file
```

## 🛠️ Useful Commands

```bash
make up              # Start all services (with build)
make down            # Stop all services
make logs            # Follow all logs
make logs-backend    # Follow Go API logs only
make logs-frontend   # Follow frontend logs only
make migrate         # Run Django migrations
make superuser       # Create Django superuser
make health          # Check all service health
make clean           # Remove containers, volumes, images
```

## 🔐 Default Credentials

| Service | Username | Password |
|---------|----------|----------|
| Django Admin | admin | admin123 |
| PostgreSQL | admin | changeme |

> ⚠️ **Change these in `.env` before deploying to production!**

## 🔄 Development Workflow

1. **Go API** — Edit files in `backend/`. Air watches for changes and hot-reloads automatically.
2. **SvelteKit** — Edit files in `frontend/src/`. Vite HMR handles instant updates.
3. **Django** — Edit files in `db_admin/`. Django's dev server auto-reloads.
4. **Database** — Use Django Admin at http://localhost:8000/admin to manage data visually.

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/items` | List all items |
| GET | `/api/items/:id` | Get item by ID |
| POST | `/api/items` | Create new item |
| PUT | `/api/items/:id` | Update item |
| DELETE | `/api/items/:id` | Delete item |

## 🧩 Adding New Features

### Add a new API endpoint (Go)

1. Create a new model in `backend/models/`
2. Register it in `backend/database/database.go` (AutoMigrate)
3. Create handlers in `backend/handlers/`
4. Register routes in `backend/cmd/main.go`

### Add a new Django admin model

1. Create a model in `db_admin/items/models.py` (or create a new app)
2. Register it in the corresponding `admin.py`
3. Run `make migrate`

### Add a new frontend page (SvelteKit)

1. Create a new directory in `frontend/src/routes/`
2. Add `+page.svelte` (and optionally `+page.server.js` for SSR data loading)

## License

MIT
