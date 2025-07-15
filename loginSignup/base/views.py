from django.shortcuts import render, redirect
# from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from .forms import CustomUserCreationForm
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required

@login_required
def home(request):
    return render(request, "home.html", {})

def signupView(request):
    if request.method == "POST":
        form = CustomUserCreationForm(request.POST)  # ✅ use your custom form!
        if form.is_valid():
            user = form.save(commit=False)
            user.first_name = form.cleaned_data.get("first_name")
            user.last_name = form.cleaned_data.get("last_name")
            user.email = form.cleaned_data.get("email")
            user.save()
            return redirect("base:login")
    else:
        form = CustomUserCreationForm()  # ✅ use your custom form!
    return render(request, "registration/signup.html", {"form": form})

def loginView(request):
    # if request.user.is_authenticated:
    #     return redirect("base:home")

    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            login(request, form.get_user())
            return redirect("base:home")
    else:
        form = AuthenticationForm()

    return render(request, "registration/login.html", {"form": form})
