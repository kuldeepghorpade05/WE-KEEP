from django.urls import path, include
from .views import signupView, loginView, home

urlpatterns = [
    path("", loginView, name="login"),
    path("signup/", signupView, name="signup"),
    path("home/", home, name="home"),

    # ✅ Use Django's built-in auth routes (login/logout/password reset)
    path("accounts/", include("django.contrib.auth.urls")),
]
