from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from rest_framework.routers import DefaultRouter
from base.views import NoteDataViewSet

router = DefaultRouter()
router.register(r'notes', NoteDataViewSet, basename='notedata')

urlpatterns = [
    path('admin/', admin.site.urls),

    # Main app routes
    path("", include(("base.urls", "base"), namespace="base")),

    #  Django Allauth for OAuth sign-in
    path('accounts/', include('allauth.urls')),

    # Django built-in auth for logout, password change/reset
    path('accounts/', include('django.contrib.auth.urls')),

    # DRF API endpoints
    path('api/', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
