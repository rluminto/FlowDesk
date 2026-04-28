from rest_framework.routers import DefaultRouter

from .views import CaseNoteViewSet, CaseViewSet

router = DefaultRouter()
router.register("cases", CaseViewSet, basename="case")
router.register("notes", CaseNoteViewSet, basename="note")

urlpatterns = router.urls
