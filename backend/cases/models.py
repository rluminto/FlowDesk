from django.conf import settings
from django.db import models
from django.utils import timezone


class Case(models.Model):
    class Status(models.TextChoices):
        OPEN = "open", "Open"
        IN_PROGRESS = "in_progress", "In Progress"
        WAITING = "waiting", "Waiting"
        RESOLVED = "resolved", "Resolved"
        CLOSED = "closed", "Closed"

    class Priority(models.TextChoices):
        LOW = "low", "Low"
        MEDIUM = "medium", "Medium"
        HIGH = "high", "High"
        URGENT = "urgent", "Urgent"

    class Category(models.TextChoices):
        BILLING = "billing", "Billing"
        SCHEDULING = "scheduling", "Scheduling"
        TECHNICAL = "technical", "Technical"
        DOCUMENT_REVIEW = "document_review", "Document Review"
        GENERAL = "general", "General"

    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(
        max_length=50,
        choices=Category.choices,
        default=Category.GENERAL,
    )
    status = models.CharField(
        max_length=50,
        choices=Status.choices,
        default=Status.OPEN,
    )
    priority = models.CharField(
        max_length=50,
        choices=Priority.choices,
        default=Priority.MEDIUM,
    )
    assigned_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="assigned_cases",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    due_date = models.DateField(null=True, blank=True)
    ai_summary = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def is_overdue(self):
        if self.due_date is None:
            return False

        if self.status in {self.Status.RESOLVED, self.Status.CLOSED}:
            return False

        return self.due_date < timezone.localdate()

    def __str__(self):
        return self.title


class CaseNote(models.Model):
    case = models.ForeignKey(Case, related_name="notes", on_delete=models.CASCADE)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="case_notes",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Note for {self.case.title}"
