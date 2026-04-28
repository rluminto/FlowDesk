from datetime import timedelta

import pytest
from django.utils import timezone

from cases.models import Case


pytestmark = pytest.mark.django_db


def create_case(**overrides):
    data = {
        "title": "Billing follow-up",
        "description": "Customer needs a billing update.",
        "category": Case.Category.BILLING,
        "status": Case.Status.OPEN,
        "priority": Case.Priority.MEDIUM,
    }
    data.update(overrides)
    return Case.objects.create(**data)


def test_open_past_due_case_is_overdue():
    case = create_case(due_date=timezone.localdate() - timedelta(days=1))

    assert case.is_overdue() is True


def test_case_without_due_date_is_not_overdue():
    case = create_case(due_date=None)

    assert case.is_overdue() is False


def test_resolved_past_due_case_is_not_overdue():
    case = create_case(
        status=Case.Status.RESOLVED,
        due_date=timezone.localdate() - timedelta(days=1),
    )

    assert case.is_overdue() is False


def test_closed_past_due_case_is_not_overdue():
    case = create_case(
        status=Case.Status.CLOSED,
        due_date=timezone.localdate() - timedelta(days=1),
    )

    assert case.is_overdue() is False
