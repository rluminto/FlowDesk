from django.contrib import admin

from .models import Case, CaseNote


@admin.register(Case)
class CaseAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "category",
        "status",
        "priority",
        "assigned_user",
        "due_date",
        "created_at",
    )
    list_filter = ("status", "priority", "category", "due_date")
    search_fields = ("title", "description", "ai_summary")
    ordering = ("-created_at",)


@admin.register(CaseNote)
class CaseNoteAdmin(admin.ModelAdmin):
    list_display = ("case", "author", "created_at")
    list_filter = ("created_at",)
    search_fields = ("case__title", "body")
    ordering = ("-created_at",)
