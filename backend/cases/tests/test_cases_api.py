from datetime import timedelta

import pytest
from django.urls import reverse
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APIClient

from cases.models import Case, CaseNote


pytestmark = pytest.mark.django_db


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def case_item():
    return Case.objects.create(
        title="Duplicate billing charge",
        description="Customer reports a duplicate billing charge.",
        category=Case.Category.BILLING,
        status=Case.Status.OPEN,
        priority=Case.Priority.URGENT,
        due_date=timezone.localdate() + timedelta(days=2),
    )


def create_case(**overrides):
    data = {
        "title": "Case",
        "description": "Operational case description.",
        "category": Case.Category.GENERAL,
        "status": Case.Status.OPEN,
        "priority": Case.Priority.MEDIUM,
    }
    data.update(overrides)
    return Case.objects.create(**data)


def test_create_case(api_client):
    payload = {
        "title": "Appointment reschedule request",
        "description": "Customer needs to move an appointment.",
        "category": Case.Category.SCHEDULING,
        "priority": Case.Priority.HIGH,
        "due_date": "2026-05-10",
    }

    response = api_client.post(reverse("case-list"), payload, format="json")

    assert response.status_code == status.HTTP_201_CREATED
    assert response.data["title"] == payload["title"]
    assert response.data["status"] == Case.Status.OPEN
    assert response.data["overdue"] is False
    assert Case.objects.filter(title=payload["title"]).exists()


def test_list_cases(api_client):
    create_case(title="First case")
    create_case(title="Second case")

    response = api_client.get(reverse("case-list"))

    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) == 2


def test_retrieve_case(api_client, case_item):
    response = api_client.get(reverse("case-detail", args=[case_item.id]))

    assert response.status_code == status.HTTP_200_OK
    assert response.data["id"] == case_item.id
    assert response.data["title"] == case_item.title


def test_update_case_status(api_client, case_item):
    response = api_client.patch(
        reverse("case-detail", args=[case_item.id]),
        {"status": Case.Status.IN_PROGRESS},
        format="json",
    )

    case_item.refresh_from_db()

    assert response.status_code == status.HTTP_200_OK
    assert response.data["status"] == Case.Status.IN_PROGRESS
    assert case_item.status == Case.Status.IN_PROGRESS


def test_filter_cases_by_status(api_client):
    open_case = create_case(title="Open case", status=Case.Status.OPEN)
    create_case(title="Closed case", status=Case.Status.CLOSED)

    response = api_client.get(reverse("case-list"), {"status": Case.Status.OPEN})

    assert response.status_code == status.HTTP_200_OK
    assert [item["id"] for item in response.data] == [open_case.id]


def test_filter_cases_by_priority(api_client):
    urgent_case = create_case(title="Urgent case", priority=Case.Priority.URGENT)
    create_case(title="Low case", priority=Case.Priority.LOW)

    response = api_client.get(
        reverse("case-list"),
        {"priority": Case.Priority.URGENT},
    )

    assert response.status_code == status.HTTP_200_OK
    assert [item["id"] for item in response.data] == [urgent_case.id]


def test_filter_cases_by_category(api_client):
    billing_case = create_case(title="Billing case", category=Case.Category.BILLING)
    create_case(title="Technical case", category=Case.Category.TECHNICAL)

    response = api_client.get(
        reverse("case-list"),
        {"category": Case.Category.BILLING},
    )

    assert response.status_code == status.HTTP_200_OK
    assert [item["id"] for item in response.data] == [billing_case.id]


def test_search_cases_by_title(api_client):
    matching_case = create_case(title="Refund request")
    create_case(title="Login issue")

    response = api_client.get(reverse("case-list"), {"search": "refund"})

    assert response.status_code == status.HTTP_200_OK
    assert [item["id"] for item in response.data] == [matching_case.id]


def test_search_cases_by_description(api_client):
    matching_case = create_case(
        title="Payment question",
        description="Customer mentions duplicate charge on invoice.",
    )
    create_case(title="Document review", description="Missing attachment.")

    response = api_client.get(reverse("case-list"), {"search": "duplicate"})

    assert response.status_code == status.HTTP_200_OK
    assert [item["id"] for item in response.data] == [matching_case.id]


def test_create_note(api_client, case_item):
    response = api_client.post(
        reverse("note-list"),
        {"case": case_item.id, "body": "Reviewed billing history."},
        format="json",
    )

    assert response.status_code == status.HTTP_201_CREATED
    assert response.data["body"] == "Reviewed billing history."
    assert CaseNote.objects.filter(case=case_item).count() == 1


def test_case_detail_includes_notes(api_client, case_item):
    note = CaseNote.objects.create(case=case_item, body="Follow up before Friday.")

    response = api_client.get(reverse("case-detail", args=[case_item.id]))

    assert response.status_code == status.HTTP_200_OK
    assert len(response.data["notes"]) == 1
    assert response.data["notes"][0]["id"] == note.id
    assert response.data["notes"][0]["body"] == note.body


def test_generate_summary_saves_ai_summary(api_client, case_item):
    CaseNote.objects.create(case=case_item, body="Billing team should review logs.")

    response = api_client.post(
        reverse("case-generate-summary", args=[case_item.id]),
    )
    case_item.refresh_from_db()

    assert response.status_code == status.HTTP_200_OK
    assert case_item.ai_summary
    assert response.data["ai_summary"] == case_item.ai_summary
    assert "Recent notes:" in response.data["ai_summary"]


def test_generate_summary_without_notes_uses_fallback(api_client, case_item):
    response = api_client.post(
        reverse("case-generate-summary", args=[case_item.id]),
    )

    assert response.status_code == status.HTTP_200_OK
    assert "No internal notes have been added yet." in response.data["ai_summary"]
