.PHONY: up down logs restart build clean migrate superuser

# ── Docker Compose Commands ──

up:
	docker compose up --build

up-d:
	docker compose up --build -d

down:
	docker compose down

restart:
	docker compose restart

logs:
	docker compose logs -f

build:
	docker compose build

clean:
	docker compose down -v --rmi local

# ── Django Management ──

migrate:
	docker compose exec db_admin python manage.py migrate

superuser:
	docker compose exec db_admin python manage.py createsuperuser

shell:
	docker compose exec db_admin python manage.py shell

# ── Service Logs ──

logs-backend:
	docker compose logs -f backend

logs-frontend:
	docker compose logs -f frontend

logs-db:
	docker compose logs -f db

logs-admin:
	docker compose logs -f db_admin

# ── Health Checks ──

health:
	@echo "Checking services..."
	@curl -sf http://localhost:3000/api/health && echo " ✅ Go API" || echo " ❌ Go API"
	@curl -sf http://localhost:8000/admin/ && echo " ✅ Django Admin" || echo " ❌ Django Admin"
	@curl -sf http://localhost:5173/ && echo " ✅ Frontend" || echo " ❌ Frontend"
