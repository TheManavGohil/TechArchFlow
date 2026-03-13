# TechArchFlow — Optimal Full-Stack Starter Kit (NPM Package)

An `npx`-runnable CLI that scaffolds a production-ready, fully containerized project with:

| Layer | Technology | Why |
|-------|-----------|-----|
| **API Backend** | Go 1.23 (`net/http` + GORM) | Fastest memory/latency; Air hot-reload |
| **DB Admin/ORM** | Django 5 Admin (psycopg) | Best-in-class DB management UI + migrations |
| **Frontend** | SvelteKit 5 + Tailwind 4 + DaisyUI | No virtual DOM, compiler-first, lighter than React |
| **Database** | PostgreSQL 16 | ACID, advanced queries, battle-tested |
| **Orchestration** | Docker Compose | One command `docker compose up` boots everything |

> [!IMPORTANT]
> All code lives in `npm_packageee/`. We'll do incremental git commits to GitHub (`TheManavGohil/TechArchFlow`) so it looks professionally built, not vibe-coded.

---

## Proposed Changes

### CLI Package Root

#### [NEW] [package.json](file:///c:/Users/PRIYESH SINGH/OneDrive/Desktop/manav/student-management-system/npm_packageee/package.json)
- Package name: `create-techarchflow`
- [bin](file:///c:/Users/PRIYESH%20SINGH/OneDrive/Desktop/manav/student-management-system/database/database.go#14-17) entry pointing to `bin/create-techarchflow.js`
- Minimal deps: only Node built-ins (no heavy frameworks)

#### [NEW] [bin/create-techarchflow.js](file:///c:/Users/PRIYESH SINGH/OneDrive/Desktop/manav/student-management-system/npm_packageee/bin/create-techarchflow.js)
- Executable CLI entry — `#!/usr/bin/env node`
- Accepts project name as argument (or prompts interactively)
- Copies `template/` directory to target folder
- Replaces `{{PROJECT_NAME}}` placeholders in key files
- Prints post-setup instructions (colored terminal output)

#### [NEW] [README.md](file:///c:/Users/PRIYESH SINGH/OneDrive/Desktop/manav/student-management-system/npm_packageee/README.md)
- Architecture overview, usage guide, tech justification

---

### Go Backend Template

#### [NEW] template/backend/Dockerfile
- Multi-stage: Go 1.23 + Air hot-reload
- `WORKDIR /usr/src/app`, installs Air, copies source, runs `go mod tidy`

#### [NEW] template/backend/.air.toml
- Watch [.go](file:///c:/Users/PRIYESH%20SINGH/OneDrive/Desktop/manav/student-management-system/cmd/main.go), [.html](file:///c:/Users/PRIYESH%20SINGH/OneDrive/Desktop/manav/student-management-system/frontend/src/app.html), `.tmpl` files; exclude `tmp`, `vendor`, `node_modules`
- Rebuild command: `go build -o ./tmp/main ./cmd`

#### [NEW] template/backend/go.mod
- Module `{{PROJECT_NAME}}/backend` with Go 1.23
- Deps: `gorm.io/gorm`, `gorm.io/driver/postgres`, `github.com/golang-jwt/jwt/v5`

#### [NEW] template/backend/cmd/main.go
- `net/http` router with middleware chain (CORS → Logging → Auth)
- Example routes: `GET /api/health`, `GET /api/items`, `POST /api/items`, `GET /api/items/{id}`
- Clean separation: DB connect → register routes → start server

#### [NEW] template/backend/database/database.go
- GORM PostgreSQL connection using env vars (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`)
- Auto-migration for example models

#### [NEW] template/backend/models/models.go
- Example `Item` model with `gorm.Model` base (ID, CreatedAt, UpdatedAt, DeletedAt)
- Fields: Name, Description, Status, Priority

#### [NEW] template/backend/handlers/items.go
- Full CRUD: List, Get by ID, Create, Update, Delete
- JSON request/response, proper error handling

#### [NEW] template/backend/middlewares/middlewares.go
- [CORSMiddleware](file:///c:/Users/PRIYESH%20SINGH/OneDrive/Desktop/manav/student-management-system/middlewares/middlewares.go#81-98) — allows frontend origin, credentials
- [LoggingMiddleware](file:///c:/Users/PRIYESH%20SINGH/OneDrive/Desktop/manav/student-management-system/middlewares/middlewares.go#29-59) — method, path, duration
- [AuthMiddleware](file:///c:/Users/PRIYESH%20SINGH/OneDrive/Desktop/manav/student-management-system/middlewares/middlewares.go#99-145) — JWT cookie validation with excluded paths
- [ChainMiddlewares](file:///c:/Users/PRIYESH%20SINGH/OneDrive/Desktop/manav/student-management-system/middlewares/middlewares.go#21-28) — composable middleware pattern

---

### Django Admin Template

#### [NEW] template/db_admin/Dockerfile
- Python 3.12-alpine, `WORKDIR /code`, pip install from requirements.txt

#### [NEW] template/db_admin/requirements.txt
- Django 5.1, psycopg 3.2, gunicorn

#### [NEW] template/db_admin/entrypoint.sh
- Waits for PostgreSQL to be ready (`pg_isready` loop)
- Runs `python manage.py migrate`
- Creates Django superuser from env vars (non-interactive)
- Starts `python manage.py runserver 0.0.0.0:8000`

#### [NEW] template/db_admin/manage.py
- Standard Django management script

#### [NEW] template/db_admin/db_admin/settings.py
- PostgreSQL config from env vars (`DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`)
- `ALLOWED_HOSTS = ['*']` for Docker networking
- Registers the example `items` app

#### [NEW] template/db_admin/db_admin/urls.py
- Admin URL at `/admin/`

#### [NEW] template/db_admin/items/ (app)
- `models.py` — mirrors Go's `Item` model (same DB table)
- `admin.py` — registers Item with search/filter/list display

---

### SvelteKit Frontend Template

#### [NEW] template/frontend/Dockerfile
- Node 22-alpine, pnpm install, `pnpm run dev --host`

#### [NEW] template/frontend/package.json
- SvelteKit 5, Tailwind 4, DaisyUI 5, vite, svelte-check
- Scripts: dev, build, preview

#### [NEW] template/frontend/svelte.config.js
- `adapter-node` for Docker deployment

#### [NEW] template/frontend/vite.config.js
- SvelteKit + Tailwind vite plugins

#### [NEW] template/frontend/src/app.html
- Standard SvelteKit HTML shell with meta tags

#### [NEW] template/frontend/src/app.css
- Tailwind import + DaisyUI theme config

#### [NEW] template/frontend/src/routes/+layout.svelte
- Navbar with project name, responsive sidebar layout

#### [NEW] template/frontend/src/routes/+page.svelte
- Landing/dashboard page showing stack info and links

#### [NEW] template/frontend/src/routes/items/+page.svelte
- Example page fetching from Go API (`GET /api/items`), displays in a table

#### [NEW] template/frontend/src/routes/items/+page.server.js
- SvelteKit load function calling the Go backend API

---

### Docker Compose & Root Config

#### [NEW] template/docker-compose.yml
Four services, all on a shared network:

| Service | Image/Build | Port | Notes |
|---------|------------|------|-------|
| `db` | `postgres:16-alpine` | 5432 | Volume for persistence, healthcheck |
| `backend` | `./backend` | 3000 | Depends on db (healthy), Air dev server |
| `db_admin` | `./db_admin` | 8000 | Depends on db (healthy), auto-migrate + superuser |
| `frontend` | `./frontend` | 5173 | Depends on backend, pnpm dev |

#### [NEW] template/.env.example
```
DB_NAME=techarchflow
DB_USER=admin
DB_PASSWORD=changeme
DB_HOST=db
DJANGO_SUPERUSER_USERNAME=admin
DJANGO_SUPERUSER_PASSWORD=admin123
DJANGO_SUPERUSER_EMAIL=admin@example.com
JWT_SECRET=your-jwt-secret-here
```

#### [NEW] template/Makefile
- `make up` — `docker compose up --build`
- `make down` — `docker compose down`
- `make logs` — `docker compose logs -f`
- `make migrate` — run Django migrations inside container
- `make superuser` — create Django superuser

#### [NEW] template/README.md
- Quick start, architecture diagram (ASCII), port map, dev workflow

---

## Git Commit Strategy

We'll push incrementally to `TheManavGohil/TechArchFlow` (main branch):

1. **Commit 1**: CLI foundation — [package.json](file:///c:/Users/PRIYESH%20SINGH/OneDrive/Desktop/manav/student-management-system/frontend/package.json), [bin/](file:///c:/Users/PRIYESH%20SINGH/OneDrive/Desktop/manav/student-management-system/database/database.go#14-17), [README.md](file:///c:/Users/PRIYESH%20SINGH/OneDrive/Desktop/manav/student-management-system/README.md), [.gitignore](file:///c:/Users/PRIYESH%20SINGH/OneDrive/Desktop/manav/student-management-system/.gitignore)
2. **Commit 2**: Go backend template — Dockerfile, cmd/, handlers/, models/, middlewares/
3. **Commit 3**: Django Admin template — Dockerfile, settings, models, entrypoint
4. **Commit 4**: SvelteKit frontend template — package.json, routes, components
5. **Commit 5**: Docker Compose, `.env.example`, Makefile, final README

---

## Verification Plan

### Automated Tests
1. **CLI Smoke Test**: Run `node bin/create-techarchflow.js test-project` and verify all template files are copied + placeholders replaced
2. **Docker Compose Boot**: Copy generated template, run `docker compose up --build`, verify all 4 containers reach healthy state
3. **API Health Check**: `curl http://localhost:3000/api/health` returns 200
4. **Django Admin**: `curl http://localhost:8000/admin/` returns 200 (login page)
5. **Frontend**: `curl http://localhost:5173` returns SvelteKit page

### Manual Verification
1. User runs `npx create-techarchflow my-app`, verifies folder structure is created
2. User runs `cd my-app && docker compose up`, confirms all services boot
3. User visits `http://localhost:8000/admin/` and logs in with the superuser credentials
4. User visits `http://localhost:5173` and sees the dashboard page
5. User visits `http://localhost:3000/api/health` and sees the JSON response
