from django.db.models import Q
from rest_framework import decorators, response, viewsets

from .models import Case, CaseNote
from .serializers import CaseNoteSerializer, CaseSerializer
from .services.summaries import generate_case_summary


class CaseViewSet(viewsets.ModelViewSet):
    serializer_class = CaseSerializer

    def get_queryset(self):
        queryset = (
            Case.objects.select_related("assigned_user")
            .prefetch_related("notes", "notes__author")
            .order_by("-created_at")
        )

        status = self.request.query_params.get("status")
        priority = self.request.query_params.get("priority")
        category = self.request.query_params.get("category")
        search = self.request.query_params.get("search")

        if status:
            queryset = queryset.filter(status=status)

        if priority:
            queryset = queryset.filter(priority=priority)

        if category:
            queryset = queryset.filter(category=category)

        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | Q(description__icontains=search)
            )

        return queryset

    @decorators.action(detail=True, methods=["post"])
    def generate_summary(self, request, pk=None):
        case = self.get_object()
        case.ai_summary = generate_case_summary(case)
        case.save(update_fields=["ai_summary", "updated_at"])

        return response.Response(self.get_serializer(case).data)


class CaseNoteViewSet(viewsets.ModelViewSet):
    serializer_class = CaseNoteSerializer

    def get_queryset(self):
        queryset = CaseNote.objects.select_related("case", "author").order_by(
            "-created_at"
        )

        case_id = self.request.query_params.get("case")
        if case_id:
            queryset = queryset.filter(case_id=case_id)

        return queryset
