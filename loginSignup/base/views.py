from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm
from .forms import CustomUserCreationForm

from rest_framework import viewsets, permissions
from .models import NoteData
from .serializers import NoteDataSerializer


@login_required
def home(request):
    """
    Renders the main notes frontend page after login.
    Passes the logged-in user's name to the template.
    """
    return render(
        request,
        "frontend/index.html",
        {"username": request.user.first_name or request.user.username}
    )


def signupView(request):
    """
    Custom signup view using CustomUserCreationForm.
    Saves first name, last name, and email.
    Redirects to login page after successful signup.
    """
    if request.method == "POST":
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.first_name = form.cleaned_data.get("first_name")
            user.last_name = form.cleaned_data.get("last_name")
            user.email = form.cleaned_data.get("email")
            user.save()
            return redirect("base:login")
    else:
        form = CustomUserCreationForm()

    return render(request, "registration/signup.html", {"form": form})


def loginView(request):
    """
    Custom login view using AuthenticationForm.
    Authenticates user and redirects to notes frontend on success.
    """
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            login(request, form.get_user())
            return redirect("base:home")
    else:
        form = AuthenticationForm()

    return render(request, "registration/login.html", {"form": form})


class NoteDataViewSet(viewsets.ModelViewSet):
    """
    DRF API for CRUD operations on NoteData.
    Filters notes by the authenticated user.
    """
    serializer_class = NoteDataSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return NoteData.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
