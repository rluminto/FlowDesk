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

## Current Progress

- Backend case and note API is implemented
- Local fake case seed data is available
- Frontend app shell and routing are implemented
- Dashboard can load, search, filter, and create cases
- Case detail page can load cases, update status/priority, and add notes

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

## API Routes

Base URL:

```text
http://127.0.0.1:8000/api/
```

Case endpoints:

```http
GET /api/cases/
POST /api/cases/
GET /api/cases/{id}/
PATCH /api/cases/{id}/
DELETE /api/cases/{id}/
```

Note endpoints:

```http
GET /api/notes/
POST /api/notes/
GET /api/notes/{id}/
PATCH /api/notes/{id}/
DELETE /api/notes/{id}/
```

Case filters:

```http
GET /api/cases/?status=open
GET /api/cases/?priority=urgent
GET /api/cases/?category=billing
GET /api/cases/?search=refund
```

## Local Setup

### Backend

From the repo root:

```powershell
Set-Location backend
python -m venv venv
.\venv\Scripts\python.exe -m pip install --upgrade pip
.\venv\Scripts\python.exe -m pip install -r requirements.txt
.\venv\Scripts\python.exe manage.py migrate
.\venv\Scripts\python.exe manage.py seed_cases
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

### Sample Data

The backend includes a local development seed command that creates fake operational cases and notes:

```powershell
Set-Location backend
.\venv\Scripts\python.exe manage.py seed_cases
```

To reset existing local cases before seeding:

```powershell
.\venv\Scripts\python.exe manage.py seed_cases --clear
```

The seed data is intentionally fake and should not contain real health, customer, or sensitive information.

### Frontend

From the repo root:

```powershell
Set-Location frontend
npm install
npm run dev
```

Frontend URL:

```text
http://127.0.0.1:5173/
```

Frontend environment:

```text
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

## Running Tests

Backend test instructions will be added once the test suite is in place.

Frontend checks:

```powershell
Set-Location frontend
npm run lint
npm run build
```

## Demo

Coming soon.
