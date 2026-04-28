# FlowDesk Build Roadmap

This file is the working roadmap for building FlowDesk in clean, manageable parts. `plan.md` explains the full product idea. This file tells us what to build next, how to know each part is done, and when it is safe to move forward.

## How We Will Work

For every part, we will follow this loop:

1. Read the relevant existing files.
2. Build the smallest complete version of that part.
3. Run the app or tests that prove it works.
4. Fix issues before expanding scope.
5. Update documentation or notes if the project shape changes.
6. Commit the completed part when it is stable.

The rule:

```text
One part should leave the app in a working state.
```

If a part is too big, we split it before coding.

## Current Status

Current project state:

```text
FlowDesk/
  backend/
  frontend/
  docs/
  screenshots/
  .gitignore
  README.md
  idea.txt
  plan.md
  roadmap.md
```

Current active part:

```text
Part 10 - README, screenshots, and resume polish
```

## Part Overview

Recommended build order:

```text
Part 0  - Project foundation
Part 1  - Backend project setup
Part 2  - Case and note data model
Part 3  - REST API for cases and notes
Part 4  - Backend quality pass and seed data
Part 5  - Frontend project setup
Part 6  - Dashboard list, filters, and create form
Part 7  - Case detail page, notes, and updates
Part 8  - Mock AI summary workflow
Part 9  - Tests and reliability pass
Part 10 - README, screenshots, and resume polish
Part 11 - Authentication
Part 12 - Deployment
Part 13 - Optional stretch features
```

Parts 0 through 10 are the core resume-worthy MVP.

Parts 11 through 13 make it stronger, but they should come after the core app works.

## Part 0 - Project Foundation

Goal:

```text
Create a clean repo foundation so the project starts organized.
```

Why this matters:

```text
This keeps the project easy to navigate and makes the GitHub repo look intentional from the first commit.
```

Expected files and folders:

```text
FlowDesk/
  backend/
  frontend/
  docs/
  screenshots/
  .gitignore
  README.md
  idea.txt
  plan.md
  roadmap.md
```

Tasks:

- [x] Initialize Git.
- [x] Create `backend/`.
- [x] Create `frontend/`.
- [x] Create `docs/`.
- [x] Create `screenshots/`.
- [x] Create `.gitignore`.
- [x] Create first version of `README.md`.
- [x] Add a short project summary to `README.md`.
- [x] Add a local setup placeholder to `README.md`.
- [x] Make first commit.

Suggested commands:

```powershell
git init
New-Item -ItemType Directory -Force backend
New-Item -ItemType Directory -Force frontend
New-Item -ItemType Directory -Force docs
New-Item -ItemType Directory -Force screenshots
New-Item -ItemType File -Force README.md
New-Item -ItemType File -Force .gitignore
```

`.gitignore` should include:

```text
backend/venv/
backend/db.sqlite3
backend/.env
backend/.pytest_cache/
backend/**/__pycache__/
frontend/node_modules/
frontend/dist/
frontend/.env
.DS_Store
```

Move-on gate:

- [x] `git status` works.
- [x] Project folders exist.
- [x] README exists.
- [x] `.gitignore` exists.
- [x] First commit is created.

Suggested commit:

```text
Initialize FlowDesk project structure
```

## Part 1 - Backend Project Setup

Goal:

```text
Create a working Django backend with Django REST Framework and CORS configured.
```

Why this matters:

```text
The backend becomes the source of truth for cases, notes, filtering, and summary generation.
```

Expected backend structure:

```text
backend/
  config/
  cases/
  manage.py
  requirements.txt
  pytest.ini
```

Tasks:

- [x] Create Python virtual environment.
- [x] Install Django dependencies.
- [x] Save `requirements.txt`.
- [x] Start Django project named `config`.
- [x] Start Django app named `cases`.
- [x] Add `rest_framework`, `corsheaders`, and `cases` to `INSTALLED_APPS`.
- [x] Add CORS middleware.
- [x] Allow local frontend origin.
- [x] Run initial migrations.
- [x] Start Django dev server.
- [x] Verify Django loads in the browser.

Suggested commands:

```powershell
Set-Location backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install django djangorestframework django-cors-headers pytest pytest-django
pip freeze > requirements.txt
django-admin startproject config .
python manage.py startapp cases
python manage.py migrate
python manage.py runserver
```

Verification:

```text
http://127.0.0.1:8000/
```

Move-on gate:

- [x] Django server runs.
- [x] No migration errors.
- [x] `requirements.txt` exists.
- [x] `cases` app is installed.
- [x] CORS is configured for Vite.

Suggested commit:

```text
Add Django backend foundation
```

## Part 2 - Case And Note Data Model

Goal:

```text
Create the database model for cases and notes.
```

Why this matters:

```text
The data model controls everything else: API shape, frontend types, filters, tests, and summary generation.
```

Models:

```text
Case
CaseNote
```

`Case` fields:

- [x] `title`
- [x] `description`
- [x] `category`
- [x] `status`
- [x] `priority`
- [x] `assigned_user`
- [x] `due_date`
- [x] `ai_summary`
- [x] `created_at`
- [x] `updated_at`

`CaseNote` fields:

- [x] `case`
- [x] `author`
- [x] `body`
- [x] `created_at`

Status choices:

```text
open
in_progress
waiting
resolved
closed
```

Priority choices:

```text
low
medium
high
urgent
```

Category choices:

```text
billing
scheduling
technical
document_review
general
```

Backend logic:

- [x] Add `Case.is_overdue()`.
- [x] A case is overdue only when due date is in the past and status is not `resolved` or `closed`.
- [x] Add helpful `__str__` methods.
- [x] Register models in Django admin.
- [x] Create migrations.
- [x] Apply migrations.

Verification:

```powershell
python manage.py makemigrations
python manage.py migrate
python manage.py check
```

Optional admin verification:

```powershell
python manage.py createsuperuser
python manage.py runserver
```

Then visit:

```text
http://127.0.0.1:8000/admin/
```

Move-on gate:

- [x] Models migrate successfully.
- [x] `Case` and `CaseNote` appear in admin.
- [x] Overdue logic exists.
- [x] No Django check errors.

Suggested commit:

```text
Add case and note models
```

## Part 3 - REST API For Cases And Notes

Goal:

```text
Expose cases and notes through a REST API.
```

Why this matters:

```text
The React frontend will depend on these endpoints for every core workflow.
```

Expected files:

```text
backend/cases/serializers.py
backend/cases/views.py
backend/cases/urls.py
backend/config/urls.py
```

Tasks:

- [x] Create `CaseNoteSerializer`.
- [x] Create `CaseSerializer`.
- [x] Include nested read-only notes on case responses.
- [x] Include computed `overdue` field.
- [x] Create `CaseViewSet`.
- [x] Create `CaseNoteViewSet`.
- [x] Add DRF router.
- [x] Include API URLs under `/api/`.
- [x] Support filtering by status.
- [x] Support filtering by priority.
- [x] Support filtering by category.
- [x] Support search by title and description.
- [x] Add ordering by newest first.

API endpoints:

```http
GET /api/cases/
POST /api/cases/
GET /api/cases/{id}/
PATCH /api/cases/{id}/
DELETE /api/cases/{id}/
GET /api/notes/
POST /api/notes/
GET /api/notes/{id}/
PATCH /api/notes/{id}/
DELETE /api/notes/{id}/
```

Example filter URLs:

```http
GET /api/cases/?status=open
GET /api/cases/?priority=urgent
GET /api/cases/?category=billing
GET /api/cases/?search=refund
```

Verification:

- [x] Open `/api/cases/` in the browser.
- [x] Create a case using DRF browsable API.
- [x] Create a note using DRF browsable API.
- [x] Confirm case detail includes notes.
- [x] Try each filter query.
- [x] Try search query.

Move-on gate:

- [x] Case CRUD works.
- [x] Note CRUD works.
- [x] Filters work.
- [x] Search works.
- [x] Case response includes overdue.
- [x] Case response includes notes.

Suggested commit:

```text
Add case and note REST API
```

## Part 4 - Backend Quality Pass And Seed Data

Goal:

```text
Make the backend easier to demo and safer to build against.
```

Why this matters:

```text
Realistic sample data helps the frontend look like an actual product and makes screenshots easier later.
```

Tasks:

- [x] Add simple sample data path.
- [x] Decide between fixture or management command.
- [x] Create several fake cases.
- [x] Include different statuses.
- [x] Include different priorities.
- [x] Include different categories.
- [x] Include due dates.
- [x] Include at least one overdue case.
- [x] Include notes on some cases.
- [x] Verify API response with sample data.

Preferred option:

```text
Create a Django management command: python manage.py seed_cases
```

Expected file:

```text
backend/cases/management/commands/seed_cases.py
```

Sample cases:

- Duplicate billing charge.
- Appointment reschedule request.
- Login issue.
- Document review follow-up.
- Refund status request.
- Missing intake form.
- Account access escalation.

Verification:

```powershell
python manage.py seed_cases
python manage.py runserver
```

Then visit:

```text
http://127.0.0.1:8000/api/cases/
```

Move-on gate:

- [x] Seed command or fixture exists.
- [x] Fake data appears in API.
- [x] No sensitive or real personal data exists.
- [x] Frontend will have useful data to display.

Suggested commit:

```text
Add sample case data
```

## Part 5 - Frontend Project Setup

Goal:

```text
Create a working React, Vite, TypeScript frontend.
```

Why this matters:

```text
This gives us a clean app shell before we start building workflows.
```

Expected frontend structure:

```text
frontend/
  src/
    api/
    components/
    pages/
    types/
    App.tsx
    main.tsx
  package.json
  vite.config.ts
  .env
```

Tasks:

- [x] Create Vite React TypeScript app.
- [x] Install dependencies.
- [x] Install and configure Tailwind CSS.
- [x] Install React Router.
- [x] Create `.env` with `VITE_API_BASE_URL`.
- [x] Create basic app shell.
- [x] Create routes for dashboard and case detail.
- [x] Confirm Vite dev server works.

Suggested commands:

```powershell
Set-Location frontend
npm create vite@latest . -- --template react-ts
npm install
npm install axios react-router-dom
npm install -D tailwindcss postcss autoprefixer
```

Environment variable:

```text
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

Verification:

```powershell
npm run dev
```

Then visit:

```text
http://localhost:5173/
```

Move-on gate:

- [x] Vite app runs.
- [x] TypeScript compiles.
- [x] Tailwind styles apply.
- [x] Router works.
- [x] API base URL is configured.

Suggested commit:

```text
Add React frontend foundation
```

## Part 6 - Dashboard List, Filters, And Create Form

Goal:

```text
Build the main dashboard where users can view, search, filter, and create cases.
```

Why this matters:

```text
This is the main user-facing workflow and the first screen someone will judge.
```

Expected files:

```text
frontend/src/api/cases.ts
frontend/src/types/cases.ts
frontend/src/pages/Dashboard.tsx
frontend/src/components/CaseCard.tsx
frontend/src/components/CaseFilters.tsx
frontend/src/components/CaseForm.tsx
```

Tasks:

- [x] Define case TypeScript types.
- [x] Create API functions for listing and creating cases.
- [x] Build dashboard loading state.
- [x] Build dashboard error state.
- [x] Fetch cases from backend.
- [x] Render case list.
- [x] Add search input.
- [x] Add status filter.
- [x] Add priority filter.
- [x] Add category filter.
- [x] Add clear filters button.
- [x] Build create case form.
- [x] Validate required fields.
- [x] Refresh list after creating a case.
- [x] Show overdue badge.
- [x] Add empty state for no matching cases.

Dashboard should show:

- Case title.
- Description preview.
- Status.
- Priority.
- Category.
- Due date.
- Overdue state.
- Summary preview if available.

Verification:

- [x] Start backend.
- [x] Start frontend.
- [x] Dashboard loads cases from backend.
- [x] Search updates results.
- [x] Filters update results.
- [x] Create form creates a real backend case.
- [x] New case appears in list.
- [x] Empty state appears when filters match nothing.

Move-on gate:

- [x] User can create and browse cases from UI.
- [x] User can search and filter cases from UI.
- [x] UI is readable on desktop and mobile.
- [x] No TypeScript errors.

Suggested commit:

```text
Add dashboard case list and filters
```

## Part 7 - Case Detail Page, Notes, And Updates

Goal:

```text
Build the full case detail workflow.
```

Why this matters:

```text
The dashboard is for scanning, but the detail page is where the case work actually happens.
```

Expected files:

```text
frontend/src/pages/CaseDetail.tsx
frontend/src/components/NotesList.tsx
frontend/src/components/NoteForm.tsx
frontend/src/components/SummaryPanel.tsx
```

Tasks:

- [x] Add API function to retrieve one case.
- [x] Add API function to update one case.
- [x] Add API function to create a note.
- [x] Build case detail loading state.
- [x] Build case detail error state.
- [x] Display full case information.
- [x] Add status update control.
- [x] Add priority update control.
- [x] Display due date and overdue state.
- [x] Display notes.
- [x] Add note form.
- [x] Refresh case after adding note.
- [x] Add back link to dashboard.

Detail page should show:

- Title.
- Description.
- Category.
- Status.
- Priority.
- Due date.
- Created date.
- Updated date.
- Overdue badge.
- AI summary area.
- Notes.

Verification:

- [x] Click case from dashboard.
- [x] Detail page loads from backend.
- [x] Status can be updated.
- [x] Priority can be updated.
- [x] Note can be added.
- [x] Added note appears without manual database editing.
- [x] Browser refresh on detail page still works.

Move-on gate:

- [x] Case detail workflow works end to end.
- [x] Notes are usable.
- [x] Status and priority updates persist.
- [x] No TypeScript errors.

Suggested commit:

```text
Add case detail and notes workflow
```

## Part 8 - Mock AI Summary Workflow

Goal:

```text
Add the AI-assisted summary feature with a mock backend implementation.
```

Why this matters:

```text
This gives the app a distinctive feature while avoiding API key setup until later.
```

Backend tasks:

- [x] Add summary generation service or helper.
- [x] Add `generate_summary` action to `CaseViewSet`.
- [x] Use title, description, category, priority, and notes.
- [x] Save result to `Case.ai_summary`.
- [x] Return updated case.

Frontend tasks:

- [x] Add API function for summary generation.
- [x] Add button on case detail page.
- [x] Show loading state while generating.
- [x] Display summary after generation.
- [x] Handle errors clearly.

Recommended API:

```http
POST /api/cases/{id}/generate_summary/
```

Mock summary should be:

- Concise.
- Deterministic.
- Based on real case fields.
- Good enough to look useful in screenshots.

Verification:

- [x] Case with no notes can generate summary.
- [x] Case with notes can generate better summary.
- [x] Summary is saved to database.
- [x] Refreshing page still shows summary.
- [x] Summary button does not break when clicked twice.

Move-on gate:

- [x] User can generate a summary from UI.
- [x] Summary persists.
- [x] Backend endpoint works directly.
- [x] Error and loading states exist.

Suggested commit:

```text
Add mock AI summary workflow
```

## Part 9 - Tests And Reliability Pass

Goal:

```text
Add tests for the most important backend behavior and fix reliability issues.
```

Why this matters:

```text
Tests make the project feel professional and give you strong interview talking points.
```

Backend test files:

```text
backend/cases/tests/test_models.py
backend/cases/tests/test_cases_api.py
```

Test coverage:

- [x] Create a case.
- [x] List cases.
- [x] Retrieve a case.
- [x] Update case status.
- [x] Filter by status.
- [x] Filter by priority.
- [x] Filter by category.
- [x] Search by title.
- [x] Search by description.
- [x] Create a note.
- [x] Case detail includes notes.
- [x] Overdue is true for past due open case.
- [x] Overdue is false for resolved past due case.
- [x] Overdue is false for closed past due case.
- [x] Generate summary saves `ai_summary`.

Commands:

```powershell
Set-Location backend
pytest
python manage.py check
```

Optional frontend checks:

```powershell
Set-Location frontend
npm run build
```

Move-on gate:

- [x] Backend tests pass.
- [x] Django check passes.
- [x] Frontend build passes.
- [x] Any known bugs are documented or fixed.

Suggested commit:

```text
Add backend tests for case workflows
```

## Part 10 - README, Screenshots, And Resume Polish

Goal:

```text
Make the project understandable and presentable on GitHub.
```

Why this matters:

```text
A polished README turns a working app into something recruiters and interviewers can quickly understand.
```

README sections:

- [ ] Overview.
- [ ] Features.
- [ ] Tech stack.
- [ ] Screenshots.
- [ ] Architecture.
- [ ] API routes.
- [ ] Local setup.
- [ ] Running tests.
- [ ] Deployment notes.
- [ ] What I learned.
- [ ] Future improvements.

Screenshots to capture:

- [ ] Dashboard.
- [ ] Create case form.
- [ ] Filtered case list.
- [ ] Case detail page.
- [ ] Notes area.
- [ ] AI summary example.

Resume bullets:

- [ ] Basic version.
- [ ] Stronger technical version.
- [ ] Deployed version if deployment is complete.

Move-on gate:

- [ ] README looks complete.
- [ ] Screenshots are added.
- [ ] Setup instructions are accurate.
- [ ] Test instructions are accurate.
- [ ] Resume bullet is ready.

Suggested commit:

```text
Update README with screenshots and setup
```

## Part 11 - Authentication

Goal:

```text
Add user accounts after the core product works.
```

Why this matters:

```text
Authentication makes the project more realistic, but it touches many areas, so it belongs after the MVP.
```

Recommended approach:

```text
JWT authentication with djangorestframework-simplejwt.
```

Backend tasks:

- [ ] Install Simple JWT.
- [ ] Add login endpoint.
- [ ] Add token refresh endpoint.
- [ ] Add signup endpoint.
- [ ] Protect case endpoints.
- [ ] Associate created cases with users where appropriate.
- [ ] Add permission rules.

Frontend tasks:

- [ ] Add login page.
- [ ] Add signup page.
- [ ] Store access token.
- [ ] Attach token to API requests.
- [ ] Add logout.
- [ ] Protect app routes.
- [ ] Handle expired sessions.

Move-on gate:

- [ ] User can sign up.
- [ ] User can log in.
- [ ] Authenticated API requests work.
- [ ] User can log out.
- [ ] Unauthenticated users cannot access protected API routes.

Suggested commit:

```text
Add JWT authentication
```

## Part 12 - Deployment

Goal:

```text
Deploy the app or prepare a clear deployment path.
```

Why this matters:

```text
A live project is stronger for resumes and easier to share.
```

Recommended deployment:

```text
Frontend: Vercel or Netlify
Backend: Render or Railway
Database: PostgreSQL
```

Backend tasks:

- [ ] Move secrets to environment variables.
- [ ] Set `DEBUG=False` in production.
- [ ] Configure `ALLOWED_HOSTS`.
- [ ] Configure production CORS.
- [ ] Configure PostgreSQL.
- [ ] Add production requirements.
- [ ] Run migrations in deployed environment.
- [ ] Verify API works online.

Frontend tasks:

- [ ] Set deployed `VITE_API_BASE_URL`.
- [ ] Build app.
- [ ] Deploy frontend.
- [ ] Verify frontend can call backend.
- [ ] Verify detail page refresh works.

Move-on gate:

- [ ] Deployed frontend works.
- [ ] Deployed backend works.
- [ ] CORS works.
- [ ] Database works.
- [ ] README includes live demo link or deployment notes.

Suggested commit:

```text
Prepare app for deployment
```

## Part 13 - Optional Stretch Features

Only do these after the MVP is already strong.

Good stretch features:

- [ ] Sort by due date, priority, and created date.
- [ ] Dashboard metrics cards.
- [ ] "My cases" view.
- [ ] Archive closed cases.
- [ ] Activity history.
- [ ] Better AI prompt and real AI API integration.
- [ ] Docker setup.
- [ ] API documentation with drf-spectacular.
- [ ] Frontend tests.
- [ ] Bulk status updates.
- [ ] CSV export.

Avoid until later:

- [ ] Complex role-based permissions.
- [ ] File uploads.
- [ ] Notifications.
- [ ] Real-time websockets.
- [ ] Multi-tenant organizations.

## Quality Standards

Use these standards throughout the build:

Backend:

- Keep models simple and clear.
- Put business logic in model methods or service helpers when it grows.
- Keep serializers explicit.
- Keep viewsets readable.
- Test important behavior.
- Use fake data only.

Frontend:

- Keep components focused.
- Keep API calls in `src/api`.
- Keep shared types in `src/types`.
- Show loading, error, and empty states.
- Make forms usable and clear.
- Keep the dashboard efficient to scan.
- Avoid overdesigned landing-page styling.

Documentation:

- Update README when setup steps change.
- Keep screenshots current.
- Keep resume bullets honest.
- Explain tradeoffs clearly.

## Part Completion Template

When finishing each part, record:

```text
Part completed:
What changed:
Files changed:
How it was tested:
Known issues:
Next part:
Suggested commit:
```

Example:

```text
Part completed: Part 3 - REST API For Cases And Notes
What changed: Added serializers, viewsets, filtering, search, and routes.
Files changed: backend/cases/serializers.py, backend/cases/views.py, backend/cases/urls.py, backend/config/urls.py
How it was tested: Created cases and notes in DRF browsable API; verified filters and search manually.
Known issues: No automated tests yet.
Next part: Part 4 - Backend Quality Pass And Seed Data
Suggested commit: Add case and note REST API
```

## The Main Principle

Build the project in layers:

```text
Working backend
Working API
Working frontend
Working workflow
Tested behavior
Polished presentation
Deployment and auth
```

That order gives us the best chance of ending with a project that is complete, understandable, and worth showing.
