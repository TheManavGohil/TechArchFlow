"""
ASGI config for db_admin project.
"""

import os
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'db_admin.settings')
application = get_asgi_application()
