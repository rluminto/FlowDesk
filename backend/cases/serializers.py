from rest_framework import serializers

from .models import Case, CaseNote


class CaseNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = CaseNote
        fields = ["id", "case", "author", "body", "created_at"]
        read_only_fields = ["id", "created_at"]


class CaseSerializer(serializers.ModelSerializer):
    notes = CaseNoteSerializer(many=True, read_only=True)
    overdue = serializers.SerializerMethodField()

    class Meta:
        model = Case
        fields = [
            "id",
            "title",
            "description",
            "category",
            "status",
            "priority",
            "assigned_user",
            "due_date",
            "ai_summary",
            "overdue",
            "notes",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "ai_summary", "created_at", "updated_at"]

    def get_overdue(self, obj):
        return obj.is_overdue()
