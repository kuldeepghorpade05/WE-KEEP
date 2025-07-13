from django.urls import path, include
from .views import authview, home

urlpatterns = [
    path("", home, name="home"),
    path("accounts/", include("django.contrib.auth.urls")),
    path("signup/", authview, name="authview"),
]
