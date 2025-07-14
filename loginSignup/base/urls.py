from django.urls import path, include
from .views import signupView, loginView, home

urlpatterns = [
    path("", loginView, name="login"),           # root → login page
    path("signup/", signupView, name="signup"),  # /signup → signup page
    path("home/", home, name="home"),            # /home → home page
    path("accounts/", include("django.contrib.auth.urls")),
]
