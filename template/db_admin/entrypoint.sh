#!/bin/sh
set -e

echo "⏳ Waiting for PostgreSQL to be ready..."

while ! pg_isready -h "$DB_HOST" -p "${DB_PORT:-5432}" -U "$DB_USER" -q; do
  sleep 1
done

echo "✅ PostgreSQL is ready"

echo "📦 Running Django migrations..."
python manage.py migrate --noinput

echo "👤 Creating superuser (if not exists)..."
python manage.py shell -c "
from django.contrib.auth import get_user_model
User = get_user_model()
import os
username = os.environ.get('DJANGO_SUPERUSER_USERNAME', 'admin')
email = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'admin@example.com')
password = os.environ.get('DJANGO_SUPERUSER_PASSWORD', 'admin123')
if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username=username, email=email, password=password)
    print(f'Superuser {username} created')
else:
    print(f'Superuser {username} already exists')
"

echo "🚀 Starting Django development server..."
python manage.py runserver 0.0.0.0:8000
