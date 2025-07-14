from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required

@login_required
def home(request):
    return render(request, "home.html", {})

def signupView(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST or None)
        if form.is_valid():
            form.save()
            return redirect("base:login")
    else:
        form = UserCreationForm()
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
