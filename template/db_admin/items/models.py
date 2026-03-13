from django.db import models


class Item(models.Model):
    """
    Mirrors the Go backend's Item model.
    Both GORM and Django manage the same 'items' table.
    GORM handles auto-migration; Django provides the admin UI.
    """
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, default='')
    status = models.CharField(max_length=50, default='pending')
    priority = models.IntegerField(default=0)

    # GORM-compatible timestamp fields
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True, db_index=True)

    class Meta:
        db_table = 'items'
        ordering = ['-created_at']

    def __str__(self):
        return self.name
