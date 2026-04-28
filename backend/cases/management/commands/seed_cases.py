from datetime import timedelta

from django.core.management.base import BaseCommand
from django.utils import timezone

from cases.models import Case, CaseNote


SAMPLE_CASES = [
    {
        "title": "Duplicate billing charge",
        "description": (
            "A customer reports being charged twice for the same service period "
            "and wants a billing review before the end of the week."
        ),
        "category": Case.Category.BILLING,
        "status": Case.Status.OPEN,
        "priority": Case.Priority.URGENT,
        "due_offset": -2,
        "notes": [
            "Confirmed the customer provided two matching transaction timestamps.",
            "Billing team should compare the payment processor logs with invoice history.",
        ],
    },
    {
        "title": "Appointment reschedule request",
        "description": (
            "A customer needs help moving a scheduled service appointment to a "
            "later date after a calendar conflict."
        ),
        "category": Case.Category.SCHEDULING,
        "status": Case.Status.IN_PROGRESS,
        "priority": Case.Priority.HIGH,
        "due_offset": 1,
        "notes": [
            "Scheduling team offered two alternate time windows.",
            "Waiting for customer confirmation on the preferred date.",
        ],
    },
    {
        "title": "Login issue after password reset",
        "description": (
            "A user cannot access their account after completing a password reset "
            "and is seeing an invalid token message."
        ),
        "category": Case.Category.TECHNICAL,
        "status": Case.Status.WAITING,
        "priority": Case.Priority.MEDIUM,
        "due_offset": 0,
        "notes": [
            "Support reproduced the issue with an expired reset link.",
            "Engineering should verify reset-token expiration messaging.",
        ],
    },
    {
        "title": "Document review follow-up",
        "description": (
            "An internal team needs a document reviewed for completeness before "
            "the case can move to the next workflow step."
        ),
        "category": Case.Category.DOCUMENT_REVIEW,
        "status": Case.Status.OPEN,
        "priority": Case.Priority.MEDIUM,
        "due_offset": 3,
        "notes": [
            "Initial checklist is complete except for one missing attachment.",
        ],
    },
    {
        "title": "Refund status request",
        "description": (
            "A customer asks for an update on a refund that was approved but has "
            "not appeared in their account yet."
        ),
        "category": Case.Category.BILLING,
        "status": Case.Status.RESOLVED,
        "priority": Case.Priority.LOW,
        "due_offset": -5,
        "notes": [
            "Refund was confirmed as processed by the billing team.",
            "Case resolved after sending the customer a status update.",
        ],
    },
    {
        "title": "Missing intake form",
        "description": (
            "A workflow is blocked because a required intake form has not been "
            "submitted for review."
        ),
        "category": Case.Category.DOCUMENT_REVIEW,
        "status": Case.Status.OPEN,
        "priority": Case.Priority.HIGH,
        "due_offset": -1,
        "notes": [
            "Reminder sent through the standard follow-up channel.",
        ],
    },
    {
        "title": "Account access escalation",
        "description": (
            "A team member escalated an account access problem after standard "
            "troubleshooting did not restore access."
        ),
        "category": Case.Category.TECHNICAL,
        "status": Case.Status.IN_PROGRESS,
        "priority": Case.Priority.URGENT,
        "due_offset": 2,
        "notes": [
            "Access logs show repeated failed attempts from the same browser session.",
            "Escalated to technical support for deeper account review.",
        ],
    },
    {
        "title": "General next steps question",
        "description": (
            "A customer asks what to expect after submitting their request and "
            "whether any additional action is needed."
        ),
        "category": Case.Category.GENERAL,
        "status": Case.Status.CLOSED,
        "priority": Case.Priority.LOW,
        "due_offset": -10,
        "notes": [
            "Sent a general workflow explanation and closed the case.",
        ],
    },
]


class Command(BaseCommand):
    help = "Seed the local database with fake FlowDesk cases and notes."

    def add_arguments(self, parser):
        parser.add_argument(
            "--clear",
            action="store_true",
            help="Delete all existing cases before seeding sample data.",
        )

    def handle(self, *args, **options):
        today = timezone.localdate()
        sample_titles = [sample["title"] for sample in SAMPLE_CASES]

        if options["clear"]:
            deleted_count, _ = Case.objects.all().delete()
            self.stdout.write(f"Deleted {deleted_count} existing case records.")
        else:
            Case.objects.filter(title__in=sample_titles).delete()

        created_cases = 0
        created_notes = 0

        for sample in SAMPLE_CASES:
            notes = sample["notes"]
            case = Case.objects.create(
                title=sample["title"],
                description=sample["description"],
                category=sample["category"],
                status=sample["status"],
                priority=sample["priority"],
                due_date=today + timedelta(days=sample["due_offset"]),
            )
            created_cases += 1

            for note_body in notes:
                CaseNote.objects.create(case=case, body=note_body)
                created_notes += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Seeded {created_cases} fake cases and {created_notes} notes."
            )
        )
