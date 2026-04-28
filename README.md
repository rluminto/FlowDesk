# FlowDesk

FlowDesk is an AI-assisted case management dashboard for tracking operational cases, priorities, notes, due dates, and summaries.

The project is designed as a realistic full-stack portfolio app using a React frontend and a Django REST Framework backend. It uses fake operational cases only; no real health, customer, or sensitive data should be used.

## Planned Features

- Create, view, update, and manage cases
- Filter cases by status, priority, and category
- Search cases by title or description
- Track due dates and overdue cases
- Add internal notes to cases
- Generate mock AI-style case summaries
- REST API built with Django REST Framework
- React frontend with TypeScript
- Backend tests with pytest

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Python
- Django
- Django REST Framework
- SQLite for local development
- PostgreSQL planned for deployment
- pytest

## Project Structure

```text
FlowDesk/
  backend/
  frontend/
  docs/
  screenshots/
  idea.txt
  plan.md
  roadmap.md
  README.md
```

## Build Roadmap

The project is being built in parts so each step leaves the app in a working state.

See [roadmap.md](roadmap.md) for the active execution checklist.

See [plan.md](plan.md) for the full product plan and project rationale.

## Local Setup

### Backend

From the repo root:

```powershell
Set-Location backend
python -m venv venv
.\venv\Scripts\python.exe -m pip install --upgrade pip
.\venv\Scripts\python.exe -m pip install -r requirements.txt
.\venv\Scripts\python.exe manage.py migrate
.\venv\Scripts\python.exe manage.py runserver
```

Backend URL:

```text
http://127.0.0.1:8000/
```

Admin login page:

```text
http://127.0.0.1:8000/admin/login/
```

### Frontend

Frontend setup instructions will be added once the React app is created.

## Running Tests

Backend test instructions will be added once the test suite is in place.

## Demo

Coming soon.
