# FlowDesk Project Plan

For the step-by-step execution checklist, use `roadmap.md`. This file explains the full product idea and overall plan; `roadmap.md` is the part-by-part build tracker.

## Quick Take

FlowDesk is a strong project idea because it sits in the sweet spot between "small enough to finish" and "real enough to discuss in interviews." It is not just another to-do list. It looks like a practical internal tool: a dashboard where a team can create cases, assign ownership, track priority, add notes, filter work, and generate a concise AI-style summary.

The best version of this project is not huge. The goal is to build a polished full-stack MVP that demonstrates good product thinking, clean API design, useful frontend state management, tests, and a believable AI-assisted workflow.

Do not use real health data, patient data, customer records, or anything sensitive. Use fake operational cases only.

## Project Summary

Name:

```text
FlowDesk
```

Short description:

```text
An AI-assisted case management dashboard that helps teams create, assign, track, and summarize operational cases.
```

Longer description:

```text
FlowDesk is a full-stack case management application for support, operations, and internal workflow teams. Users can create cases, categorize them, assign priority and due dates, add internal notes, search and filter the case list, identify overdue work, and generate short AI-style summaries from case descriptions and notes.
```

Core value:

```text
FlowDesk helps a team quickly understand what needs attention, who owns it, what has happened so far, and what the next step should be.
```

## Why This Is Worth Building

This is a good resume and interview project because it demonstrates:

- React frontend development.
- TypeScript usage.
- Django backend development.
- Django REST Framework API design.
- SQL-backed data modeling.
- CRUD workflows.
- Search, filtering, and sorting.
- Derived fields such as overdue status.
- Related models such as cases and notes.
- Authentication, if added after the core MVP.
- Tests.
- Basic deployment.
- AI-assisted workflow design.
- Product judgment around internal tools.

It also gives you natural talking points for interviews:

- How you designed the data model.
- How the frontend talks to the backend.
- How filtering works.
- How you handled overdue cases.
- How you mocked AI first and left room for a real AI API later.
- How you tested important behavior.
- How you would improve it with more time.

## Current Repo State

The current folder is already:

```text
C:\Users\reine\Documents\Codes\FlowDesk
```

So do not create another nested `flowdesk` folder inside it.

Current files:

```text
FlowDesk/
  idea.txt
  plan.md
```

Recommended target structure:

```text
FlowDesk/
  backend/
  frontend/
  docs/
  screenshots/
  .gitignore
  README.md
  plan.md
  idea.txt
```

## Product Boundaries

FlowDesk should feel like a lightweight operations dashboard, not a medical app.

Good fake case examples:

- Customer refund request.
- Appointment scheduling issue.
- Billing question.
- Technical support ticket.
- Follow-up needed.
- Document review.
- Account access issue.
- Missing form.
- Escalation request.
- Duplicate charge review.

Avoid:

- Real patient data.
- Real names from actual people.
- Medical diagnoses.
- Insurance identifiers.
- Real addresses.
- Real phone numbers.
- Any protected health information.

## Target User

Primary user:

```text
An operations teammate who manages incoming cases and needs to know what needs action today.
```

Secondary user:

```text
A team lead who wants to scan work by priority, status, category, and overdue state.
```

## Core User Stories

MVP user stories:

- As a user, I can view a dashboard of all cases.
- As a user, I can create a new case with title, description, category, priority, and due date.
- As a user, I can open a case detail page.
- As a user, I can update a case status.
- As a user, I can update a case priority.
- As a user, I can add notes to a case.
- As a user, I can search cases by title or description.
- As a user, I can filter cases by status.
- As a user, I can filter cases by priority.
- As a user, I can filter cases by category.
- As a user, I can see when a case is overdue.
- As a user, I can generate an AI-style summary for a case.

Post-MVP user stories:

- As a user, I can sign up and log in.
- As a user, I can see only cases assigned to me.
- As a team lead, I can assign cases to users.
- As a user, I can sort cases by due date, priority, or created date.
- As a user, I can archive closed cases.
- As a user, I can see simple dashboard metrics.
- As a user, I can regenerate a summary after notes change.

## MVP Scope

The MVP should include:

- Backend Django project.
- `cases` Django app.
- `Case` model.
- `CaseNote` model.
- REST API endpoints for cases.
- REST API endpoints for notes.
- Search/filter support on the case list.
- Fake AI summary endpoint.
- React + Vite + TypeScript frontend.
- Dashboard page.
- Case creation form.
- Case cards or table rows.
- Filter controls.
- Case detail page.
- Add note form.
- Generate summary button.
- Basic backend tests.
- README with setup instructions.

The MVP should not include at first:

- Complex authentication.
- Role-based permissions.
- Real AI API calls.
- Complex analytics.
- Notifications.
- File uploads.
- Real customer or health data.

Authentication is still valuable, but it should come after the basic product works. Auth can slow the project down early because it touches routing, API permissions, frontend state, error handling, and deployment configuration.

## Recommended Tech Stack

Frontend:

```text
React
Vite
TypeScript
Tailwind CSS
Axios or Fetch
React Router
```

Backend:

```text
Python
Django
Django REST Framework
django-cors-headers
pytest
pytest-django
```

Database:

```text
SQLite for local MVP
PostgreSQL for deployment or resume polish
```

Deployment:

```text
Frontend: Vercel, Netlify, or Render static site
Backend: Render, Railway, Fly.io, or similar
Database: Render/Railway PostgreSQL if using Postgres
```

Recommended early choice:

```text
Use SQLite locally first. Switch to PostgreSQL only when the app works.
```

## Architecture

High-level flow:

```text
React frontend
  |
  | HTTP requests
  v
Django REST Framework API
  |
  | ORM queries
  v
SQL database
```

AI summary flow:

```text
User clicks "Generate summary"
  |
  v
Frontend sends POST /api/cases/:id/generate_summary/
  |
  v
Backend collects case title, description, priority, category, and notes
  |
  v
Backend creates mock summary text
  |
  v
Backend saves summary on Case.ai_summary
  |
  v
Frontend displays updated summary
```

Future real AI flow:

```text
User clicks "Generate summary"
  |
  v
Backend builds prompt from case data
  |
  v
Backend calls AI provider
  |
  v
Backend validates and saves summary
  |
  v
Frontend displays updated summary
```

## Data Model

### Case

Fields:

```text
id
title
description
category
status
priority
assigned_user
due_date
ai_summary
created_at
updated_at
```

Recommended choices:

```text
status:
  open
  in_progress
  waiting
  resolved
  closed

priority:
  low
  medium
  high
  urgent

category:
  billing
  scheduling
  technical
  document_review
  general
```

Notes:

- `title` should be short and scannable.
- `description` should capture the case details.
- `category` helps filtering and dashboard grouping.
- `status` tracks lifecycle.
- `priority` tracks urgency.
- `assigned_user` can be nullable for MVP.
- `due_date` allows overdue logic.
- `ai_summary` stores the generated summary.
- `created_at` and `updated_at` support sorting and auditability.

Overdue logic:

```text
A case is overdue when:
  due_date exists
  due_date is before today's date
  status is not resolved
  status is not closed
```

### CaseNote

Fields:

```text
id
case
author
body
created_at
```

Notes:

- `case` is a foreign key to `Case`.
- `author` can be nullable for MVP.
- `body` stores note content.
- `created_at` lets the UI show note history.

## API Design

Base URL:

```text
http://127.0.0.1:8000/api/
```

### Case Endpoints

List cases:

```http
GET /api/cases/
```

Create case:

```http
POST /api/cases/
```

Retrieve case:

```http
GET /api/cases/{id}/
```

Update case:

```http
PATCH /api/cases/{id}/
```

Delete case:

```http
DELETE /api/cases/{id}/
```

Generate summary:

```http
POST /api/cases/{id}/generate_summary/
```

### Case Query Params

Recommended filters:

```text
status=open
priority=urgent
category=billing
search=refund
ordering=due_date
```

Example:

```http
GET /api/cases/?status=open&priority=urgent&search=refund
```

### Note Endpoints

List notes:

```http
GET /api/notes/
```

Create note:

```http
POST /api/notes/
```

Retrieve note:

```http
GET /api/notes/{id}/
```

Update note:

```http
PATCH /api/notes/{id}/
```

Delete note:

```http
DELETE /api/notes/{id}/
```

Optional better nested route later:

```http
GET /api/cases/{id}/notes/
POST /api/cases/{id}/notes/
```

For the MVP, simple `/api/notes/` is fine.

## Frontend Pages

### Dashboard

Route:

```text
/
```

Purpose:

```text
Show the user's working queue and give fast controls for finding cases.
```

Should include:

- Header with app name.
- Search input.
- Status filter.
- Priority filter.
- Category filter.
- Clear filters button.
- Create case button or inline form.
- Case list.
- Empty state when no cases match.
- Loading state while fetching cases.
- Error state if API request fails.

Each case card or row should show:

- Title.
- Category.
- Status.
- Priority.
- Due date.
- Overdue badge if overdue.
- Short description preview.
- Link to detail page.
- Generate summary action, if practical.

### Case Detail

Route:

```text
/cases/:id
```

Purpose:

```text
Show the full case context and allow updates.
```

Should include:

- Title.
- Description.
- Category.
- Status control.
- Priority control.
- Assigned user display or placeholder.
- Due date.
- Overdue state.
- AI summary panel.
- Generate summary button.
- Notes list.
- Add note form.
- Back to dashboard link.

### Create Case

This can be either:

```text
Inline form on dashboard
```

or:

```text
/cases/new page
```

Recommended MVP choice:

```text
Use an inline form or modal on the dashboard first.
```

Required fields:

- Title.
- Description.
- Category.
- Priority.

Optional fields:

- Due date.
- Status.
- Assigned user.

## Frontend Component Plan

Recommended files:

```text
frontend/src/
  api/
    cases.ts
  components/
    AppShell.tsx
    CaseCard.tsx
    CaseFilters.tsx
    CaseForm.tsx
    CaseStatusBadge.tsx
    EmptyState.tsx
    LoadingState.tsx
    NoteForm.tsx
    NotesList.tsx
    SummaryPanel.tsx
  pages/
    Dashboard.tsx
    CaseDetail.tsx
  types/
    cases.ts
  App.tsx
  main.tsx
```

Start smaller if needed:

```text
CaseCard.tsx
CaseForm.tsx
CaseFilters.tsx
Dashboard.tsx
CaseDetail.tsx
api/cases.ts
```

Add more components only when the files become hard to scan.

## UI Direction

FlowDesk should look like a work tool:

- Clear.
- Calm.
- Organized.
- Fast to scan.
- Not overly decorative.
- Not like a marketing landing page.

Suggested layout:

```text
Top bar:
  FlowDesk name
  Small subtitle or environment indicator

Main dashboard:
  Left/top controls for search and filters
  Main list or table of cases
  Create case action near the controls

Case detail:
  Main case information
  Side panel for status, priority, due date
  Notes and summary sections below
```

Good visual choices:

- Use badges for status and priority.
- Use a red or amber badge for overdue cases.
- Use compact cards or a table-like list.
- Keep forms simple and aligned.
- Use responsive layout for mobile.

Avoid:

- A giant landing page.
- Overly playful graphics.
- Too many colors.
- Huge cards with little information.
- Decorative UI that does not help the workflow.

## Backend Build Steps

### 1. Create Backend Folder

From the existing `FlowDesk` folder:

```powershell
New-Item -ItemType Directory -Force backend
Set-Location backend
```

### 2. Create Virtual Environment

PowerShell:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

If activation is blocked:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\venv\Scripts\Activate.ps1
```

### 3. Install Dependencies

```powershell
pip install django djangorestframework django-cors-headers pytest pytest-django
pip freeze > requirements.txt
```

Optional later:

```powershell
pip install djangorestframework-simplejwt django-filter psycopg[binary] gunicorn whitenoise
pip freeze > requirements.txt
```

### 4. Start Django Project

Inside `backend/`:

```powershell
django-admin startproject config .
python manage.py startapp cases
```

### 5. Configure Django Settings

Update `backend/config/settings.py`:

```python
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "corsheaders",
    "cases",
]
```

Add middleware:

```python
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]
```

Add CORS for local frontend:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
```

Optional DRF defaults:

```python
REST_FRAMEWORK = {
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
        "rest_framework.renderers.BrowsableAPIRenderer",
    ],
}
```

### 6. Create Models

Create `Case` and `CaseNote` in:

```text
backend/cases/models.py
```

Implementation notes:

- Use Django `User` for `assigned_user` and `author`.
- Allow assigned user to be blank at first.
- Add `related_name="notes"` to `CaseNote.case`.
- Put overdue logic on the model.

### 7. Run Migrations

```powershell
python manage.py makemigrations
python manage.py migrate
```

### 8. Register Models in Admin

Update:

```text
backend/cases/admin.py
```

Register:

- `Case`
- `CaseNote`

This gives you a quick way to inspect data while building.

### 9. Create Serializers

Create:

```text
backend/cases/serializers.py
```

Serializers:

- `CaseNoteSerializer`
- `CaseSerializer`

`CaseSerializer` should include:

- Nested read-only notes.
- `overdue` computed field.
- Read-only timestamps.
- Read-only `ai_summary` if summaries are only generated by endpoint.

### 10. Create ViewSets

Update:

```text
backend/cases/views.py
```

Create:

- `CaseViewSet`
- `CaseNoteViewSet`

`CaseViewSet.get_queryset()` should support:

- `status`
- `priority`
- `category`
- `search`

Search should check at least:

- `title`
- `description`

Use `Q` objects for multi-field search:

```python
from django.db.models import Q
```

### 11. Add Fake AI Summary Endpoint

Add custom DRF action:

```python
@decorators.action(detail=True, methods=["post"])
def generate_summary(self, request, pk=None):
    ...
```

The fake summary should:

- Use case title.
- Use category.
- Use priority.
- Use part of description.
- Use recent notes.
- Produce a concise paragraph.

Keep it deterministic for tests.

### 12. Wire URLs

Create:

```text
backend/cases/urls.py
```

Use DRF router:

```python
from rest_framework.routers import DefaultRouter
```

Update:

```text
backend/config/urls.py
```

Include:

```python
path("api/", include("cases.urls"))
```

### 13. Run Backend Server

```powershell
python manage.py runserver
```

Check:

```text
http://127.0.0.1:8000/api/cases/
```

## Frontend Build Steps

### 1. Create Frontend App

From the existing `FlowDesk` folder:

```powershell
New-Item -ItemType Directory -Force frontend
Set-Location frontend
npm create vite@latest . -- --template react-ts
npm install
```

### 2. Install Dependencies

```powershell
npm install axios react-router-dom
npm install -D tailwindcss postcss autoprefixer
```

Tailwind setup depends on the installed Tailwind version. If the standard command works:

```powershell
npx tailwindcss init -p
```

If Tailwind's newer setup differs, follow the package output and keep the config minimal.

### 3. Configure Environment Variable

Create:

```text
frontend/.env
```

Add:

```text
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

This is better than hardcoding the API URL in multiple files.

### 4. Create API Layer

Create:

```text
frontend/src/api/cases.ts
```

Functions:

- `getCases(params)`
- `getCase(id)`
- `createCase(data)`
- `updateCase(id, data)`
- `deleteCase(id)`
- `createNote(data)`
- `generateSummary(id)`

### 5. Create Types

Create:

```text
frontend/src/types/cases.ts
```

Types:

```ts
export type CaseStatus = "open" | "in_progress" | "waiting" | "resolved" | "closed";
export type CasePriority = "low" | "medium" | "high" | "urgent";
export type CaseCategory = "billing" | "scheduling" | "technical" | "document_review" | "general";
```

Main case type:

```ts
export type CaseItem = {
  id: number;
  title: string;
  description: string;
  category: CaseCategory;
  status: CaseStatus;
  priority: CasePriority;
  assigned_user: number | null;
  due_date: string | null;
  ai_summary: string;
  overdue: boolean;
  notes: CaseNote[];
  created_at: string;
  updated_at: string;
};
```

Note type:

```ts
export type CaseNote = {
  id: number;
  case: number;
  author: number | null;
  body: string;
  created_at: string;
};
```

### 6. Set Up Routing

Routes:

```text
/
/cases/:id
```

Optional later:

```text
/cases/new
/login
/signup
```

### 7. Build Dashboard

Dashboard state:

- `cases`
- `search`
- `status`
- `priority`
- `category`
- `isLoading`
- `error`

Dashboard actions:

- Fetch cases on load.
- Refetch cases when filters change.
- Create case.
- Clear filters.
- Navigate to detail page.

### 8. Build Case Form

Fields:

- Title.
- Description.
- Category.
- Priority.
- Due date.

Validation:

- Title is required.
- Description is required.
- Category is required.
- Priority is required.
- Due date is optional.

After submit:

- POST to backend.
- Clear form.
- Refresh case list.
- Show the created case in the dashboard.

### 9. Build Case Card

Display:

- Title.
- Status badge.
- Priority badge.
- Category.
- Due date.
- Overdue badge.
- Description preview.
- Summary preview if available.

Actions:

- Open details.
- Generate summary, optional on dashboard.

### 10. Build Case Detail

On load:

- Fetch case by ID.

Allow:

- Update status.
- Update priority.
- Generate summary.
- Add note.

After each action:

- Update local state with response data, or refetch the case.

Recommended first implementation:

```text
Refetch after mutating.
```

This is simple and reliable.

## Testing Plan

Prioritize backend tests first because they prove the main business logic.

### Backend Tests

Use:

```text
pytest
pytest-django
DRF APIClient
```

Create:

```text
backend/pytest.ini
backend/cases/tests/
  test_cases_api.py
  test_models.py
```

Test cases:

- Can create a case.
- Can list cases.
- Can retrieve a case.
- Can update case status.
- Can filter by status.
- Can filter by priority.
- Can filter by category.
- Can search by title.
- Can search by description.
- Can create a note.
- Case response includes notes.
- Overdue is true for past due open case.
- Overdue is false for resolved past due case.
- Generate summary saves `ai_summary`.
- Generate summary includes case context.

Run:

```powershell
pytest
```

### Frontend Tests

Optional for MVP, useful for polish.

Use:

```text
Vitest
React Testing Library
```

Good tests:

- Dashboard renders loading state.
- Dashboard renders cases from mocked API.
- Filters update API request params.
- Case form validates required fields.
- Case detail shows summary after generation.

## README Plan

Create or update:

```text
README.md
```

Recommended sections:

```md
# FlowDesk

## Overview
## Features
## Tech Stack
## Screenshots
## Architecture
## API Routes
## Local Setup
## Running Tests
## Deployment
## What I Learned
## Future Improvements
```

The README should make the project easy to understand in under 60 seconds.

## Git Plan

This folder is not currently a Git repo. Once ready:

```powershell
git init
```

Recommended `.gitignore`:

```text
backend/venv/
backend/db.sqlite3
backend/.env
backend/__pycache__/
backend/**/__pycache__/
frontend/node_modules/
frontend/dist/
frontend/.env
.DS_Store
```

Suggested commit history:

```text
Initial project plan
Add Django project and cases app
Add case and note models
Add case API serializers and viewsets
Add filtering and mock summary endpoint
Add React TypeScript frontend
Add dashboard case list and filters
Add case creation form
Add case detail page and notes
Add summary generation UI
Add backend tests
Update README with setup and screenshots
Prepare deployment configuration
```

## Three-Day MVP Schedule

### Day 1: Backend

Goal:

```text
Have a working API that can create, list, filter, update, and summarize cases.
```

Tasks:

- Create backend folder.
- Create virtual environment.
- Install Django dependencies.
- Start Django project.
- Start `cases` app.
- Configure DRF and CORS.
- Add `Case` model.
- Add `CaseNote` model.
- Run migrations.
- Register models in admin.
- Add serializers.
- Add viewsets.
- Add URLs.
- Add filtering and search.
- Add fake AI summary endpoint.
- Manually test API in browser or with curl.

Done when:

- `GET /api/cases/` works.
- `POST /api/cases/` creates a case.
- `PATCH /api/cases/{id}/` updates a case.
- Query filters work.
- `POST /api/cases/{id}/generate_summary/` creates summary text.

### Day 2: Frontend

Goal:

```text
Have a usable dashboard connected to the backend.
```

Tasks:

- Create Vite React TypeScript app.
- Install frontend dependencies.
- Configure Tailwind.
- Add API helper.
- Add TypeScript types.
- Add router.
- Build dashboard page.
- Build case filters.
- Build create case form.
- Build case card/list.
- Build case detail page.
- Add note form.
- Add generate summary button.
- Add loading and error states.

Done when:

- User can see cases from backend.
- User can create a case from the UI.
- User can filter/search cases.
- User can open case details.
- User can add notes.
- User can generate and view a summary.

### Day 3: Polish, Tests, README

Goal:

```text
Make the project presentable and explainable.
```

Tasks:

- Add backend tests.
- Run and fix tests.
- Improve empty states.
- Improve form validation.
- Add seed/sample data command or fixture if time allows.
- Create README.
- Add screenshots.
- Write resume bullets.
- Make deployment attempt or document deployment plan.

Done when:

- Backend tests pass.
- README explains the app clearly.
- Screenshots show the dashboard and case detail.
- Project has a clean setup path.
- You can explain the architecture out loud.

## Two-Week Stretch Plan

### Week 1

Focus:

```text
Build and stabilize the full MVP.
```

Milestones:

- Backend API complete.
- Frontend dashboard complete.
- Case detail complete.
- Notes complete.
- Mock AI summary complete.
- Backend tests complete.
- README first version complete.

### Week 2

Focus:

```text
Make it resume-grade.
```

Milestones:

- Add authentication.
- Add PostgreSQL support.
- Add deployment.
- Add screenshots.
- Improve UI polish.
- Add seed data.
- Add API documentation.
- Add frontend tests if time allows.
- Finalize resume bullets.

## Authentication Plan

Recommended timing:

```text
Add auth after the core case workflow works.
```

Simple option:

```text
Django session auth for local/browser usage.
```

API-oriented option:

```text
JWT with djangorestframework-simplejwt.
```

For a resume project, JWT is useful because it shows API auth knowledge.

Auth tasks:

- Install Simple JWT.
- Add login endpoint.
- Add refresh endpoint.
- Add signup endpoint.
- Protect case endpoints.
- Store token in frontend.
- Add logout.
- Add authenticated API helper.
- Associate created cases with user when appropriate.

Important:

```text
Do not let auth block the MVP.
```

## Mock AI Summary Plan

The first version should not call a real AI service.

Mock summary behavior:

- Collect case title.
- Collect category.
- Collect priority.
- Collect description.
- Collect latest notes.
- Return a concise summary.

Example input:

```text
Title: Duplicate charge on account
Description: Customer says they were charged twice and has contacted support twice before. They want an update by Friday.
Priority: high
Category: billing
Notes: Billing team needs to verify payment processor logs.
```

Example output:

```text
Customer is requesting help with a duplicate charge and has followed up multiple times. Billing review is needed, with attention to payment logs and a requested update by Friday.
```

Later real AI upgrade:

- Add `AI_PROVIDER` setting.
- Add `OPENAI_API_KEY` or provider key in environment.
- Move summary generation into a service function.
- Keep endpoint the same.
- Add tests that mock the AI service.

Suggested backend structure later:

```text
backend/cases/services/
  summaries.py
```

This keeps AI logic out of the viewset.

## Seed Data Plan

Seed data makes screenshots and demos easier.

Create a Django management command later:

```text
backend/cases/management/commands/seed_cases.py
```

Command:

```powershell
python manage.py seed_cases
```

Sample cases:

- Duplicate billing charge.
- Appointment reschedule request.
- Technical login issue.
- Document review follow-up.
- Refund status request.
- Missing intake form.
- Account access escalation.
- General question about next steps.

Include a mix of:

- Statuses.
- Priorities.
- Categories.
- Due dates.
- Overdue cases.
- Cases with notes.
- Cases with and without summaries.

## Deployment Plan

MVP deployment path:

```text
Frontend: Vercel or Netlify
Backend: Render or Railway
Database: SQLite for demo only, PostgreSQL for stronger deployment
```

Better resume deployment:

```text
Frontend on Vercel
Backend on Render
PostgreSQL on Render
```

Backend deployment checklist:

- Move secrets to environment variables.
- Set `DEBUG=False`.
- Set `ALLOWED_HOSTS`.
- Configure CORS for deployed frontend URL.
- Configure database URL.
- Run migrations in deployment.
- Add static files setup if needed.
- Add health check route if platform needs it.

Frontend deployment checklist:

- Set `VITE_API_BASE_URL` to deployed backend URL.
- Build frontend.
- Verify API requests work.
- Verify CORS.
- Verify routing refresh works on detail page.

## Quality Checklist

Backend:

- Models have clear field choices.
- Migrations are committed.
- Serializers expose only needed fields.
- Viewsets support required filters.
- Search works on title and description.
- Summary endpoint works.
- Tests cover important behavior.
- No real sensitive data in seed files.

Frontend:

- Dashboard loads from API.
- Form validation works.
- Filters are easy to use.
- Empty states exist.
- Error states exist.
- Loading states exist.
- Detail page works on refresh.
- Summary button has visible feedback.
- Notes appear after creation.
- UI works on desktop and mobile.

Docs:

- README has project summary.
- README has setup instructions.
- README has API route summary.
- README has screenshots.
- README has test instructions.
- README has future improvements.

Resume:

- Project has clean GitHub repo.
- Project has meaningful commits.
- Project has screenshots.
- Project has tests.
- Project is deployed or has a clear demo path.

## Acceptance Criteria

The project is MVP-complete when:

- A user can open the frontend dashboard.
- The dashboard displays cases from the backend.
- A user can create a case.
- A user can filter by status, priority, and category.
- A user can search cases.
- A user can open a case detail page.
- A user can update status and priority.
- A user can add a note.
- A user can generate a summary.
- Overdue cases are clearly marked.
- Backend tests pass.
- README explains how to run the app.

The project is resume-ready when:

- The UI looks intentional and readable.
- There are screenshots in the README.
- Tests are included.
- Setup instructions work from a clean clone.
- There is either a live demo or a documented deployment attempt.
- The repo has a clean commit history.
- The project can be explained in a 60-second interview answer.

## Interview Explanation

Short version:

```text
FlowDesk is a full-stack case management dashboard I built with React, TypeScript, Django REST Framework, and SQL. It lets users create operational cases, track status and priority, add internal notes, filter and search work, detect overdue cases, and generate AI-style summaries from case context.
```

More detailed version:

```text
I built FlowDesk to practice full-stack product development with a realistic workflow. The backend is a Django REST Framework API with models for cases and notes, filtering/search endpoints, and a custom summary-generation action. The frontend is a React and TypeScript dashboard that consumes the API, manages filters and form state, and gives users a case detail workflow. I started with a mock AI summary function so the app stayed buildable without API keys, but I designed the endpoint so it could be replaced by a real AI service later.
```

Technical talking points:

- Why `Case` and `CaseNote` are separate models.
- How `related_name="notes"` makes nested note data easy.
- How overdue status is derived instead of manually entered.
- How query params drive filtering.
- Why the summary endpoint is a custom action.
- Why auth was delayed until after the core workflow.
- How tests prove filtering, overdue logic, and summary behavior.

## Resume Bullets

Basic:

```text
Built FlowDesk, a full-stack AI-assisted case management dashboard using React, TypeScript, Django REST Framework, and SQL, enabling users to create, filter, prioritize, and summarize operational cases.
```

Stronger:

```text
Developed a full-stack case management platform with React, TypeScript, Django REST Framework, and PostgreSQL, implementing RESTful CRUD APIs, search/filtering, overdue task detection, internal notes, and AI-generated case summaries.
```

Deployment version:

```text
Deployed a full-stack workflow management app using React, TypeScript, Django REST Framework, and PostgreSQL; added automated backend tests, REST API documentation, and an AI-assisted summary feature to streamline case review.
```

## Risks And How To Avoid Them

Risk:

```text
Trying to build too much at once.
```

Avoid it by:

```text
Build the case workflow first. Add auth and deployment after the dashboard works.
```

Risk:

```text
Getting stuck on AI integration.
```

Avoid it by:

```text
Use a mock summary function first. Keep the endpoint name realistic so the implementation can change later.
```

Risk:

```text
Frontend becomes messy.
```

Avoid it by:

```text
Use a small API layer, shared types, and focused components.
```

Risk:

```text
README stays unfinished.
```

Avoid it by:

```text
Update the README as features land instead of waiting until the end.
```

Risk:

```text
Deployment takes too long.
```

Avoid it by:

```text
Treat deployment as polish. The local MVP with tests and screenshots is already valuable.
```

## Immediate Next Steps

Do these next:

1. Initialize Git.
2. Add `.gitignore`.
3. Create `README.md`.
4. Create `backend/`.
5. Build the Django API.
6. Manually test the API.
7. Create `frontend/`.
8. Build the React dashboard.
9. Add tests.
10. Add screenshots and polish README.

Suggested first commands from this folder:

```powershell
git init
New-Item -ItemType Directory -Force backend
New-Item -ItemType Directory -Force frontend
New-Item -ItemType Directory -Force docs
New-Item -ItemType Directory -Force screenshots
New-Item -ItemType File -Force README.md
New-Item -ItemType File -Force .gitignore
```

Then start backend work:

```powershell
Set-Location backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install django djangorestframework django-cors-headers pytest pytest-django
pip freeze > requirements.txt
django-admin startproject config .
python manage.py startapp cases
```

## Recommendation

Build FlowDesk.

Keep the first version practical and focused. A complete, understandable, tested case dashboard is much more impressive than a half-finished app with every possible feature. The strongest path is:

```text
Backend CRUD API -> React dashboard -> notes -> mock AI summary -> tests -> README -> deployment/auth polish
```

That gives you something useful for interview practice and something credible for GitHub.
