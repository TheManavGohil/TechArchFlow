from django.contrib import admin
from .models import Item


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'status', 'priority', 'created_at', 'updated_at')
    list_filter = ('status', 'priority')
    search_fields = ('name', 'description')
    list_editable = ('status', 'priority')
    list_per_page = 25
    ordering = ('-created_at',)

    fieldsets = (
        (None, {
            'fields': ('name', 'description')
        }),
        ('Status', {
            'fields': ('status', 'priority')
        }),
    )
