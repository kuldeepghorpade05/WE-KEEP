# 🛠️ Technologies Used

This document summarizes all major technologies, tools, and services used in this project.

---

## 🌐 Backend

- **Python** — Primary programming language.
- **Django 5.2.4** — High-level Python web framework for building the backend.
- **Django REST Framework (3.16.0)** — Toolkit for building RESTful APIs.

---

## 🔐 Authentication

- **Django Built-in Auth** — Used for user registration, login, and session management.
- **django-allauth** — Extended authentication for social login support (e.g., Google, GitHub).
- **PyJWT** — For issuing and verifying JSON Web Tokens (JWT) for secure API authentication.

---

## 🗄️ Database

- **PostgreSQL** — Relational database used for data storage.
- **psycopg2-binary** — PostgreSQL adapter for Django.
- **Neon.tech** — Cloud-based serverless PostgreSQL database provider.

---

## 🧪 API Testing

- **Postman** — Used for testing and debugging REST APIs.

---

## 💻 Development Tools

- **Visual Studio Code (VS Code)** — Main code editor.
- **Git** — Version control system to track changes in source code.
- **GitHub** — Code hosting and collaboration platform.

---

## ☁️ Cloud & Containerization

- **Docker** — Used to containerize the application.
- **Google Cloud Platform (GCP)** — Cloud provider used for deployment.
- **Neon** — Hosted PostgreSQL database in the cloud.
- **NGINX** — Used as a reverse proxy server to route traffic to the Django application.

---

## 🎨 Frontend

- **Django Templates** — Used for rendering dynamic HTML pages.
- **HTML5 / CSS3** — Basic structure and styling.
- **Tailwind CSS** — Utility-first CSS framework for styling the frontend.
- **JavaScript** *(optional)* — Used for interactivity, if applicable.

---

## 🧩 Supporting Python Libraries

- **requests**, **urllib3**, **idna**, **certifi**, **charset-normalizer** — HTTP client and network utilities.
- **cryptography**, **cffi**, **pycparser** — Libraries supporting encryption and low-level C functions.
- **asgiref**, **sqlparse** — Django-related helper libraries.

---

## 📦 Dependency Management

- `requirements.txt` — Lists and locks all required Python packages for this project.
