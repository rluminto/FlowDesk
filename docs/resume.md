# FlowDesk Resume Notes

## Short Pitch

FlowDesk is a full-stack AI-assisted case management dashboard built with React, TypeScript, Django REST Framework, and SQL. It lets users create operational cases, search and filter the queue, track priority and due dates, add internal notes, and generate mock AI summaries from case context.

## Resume Bullets

```text
Built FlowDesk, a full-stack AI-assisted case management dashboard using React, TypeScript, Django REST Framework, and SQL, enabling users to create, filter, prioritize, and summarize operational cases.
```

```text
Developed a full-stack case management platform with React, TypeScript, Django REST Framework, and SQLite, implementing RESTful CRUD APIs, search/filtering, overdue task detection, internal notes, mock AI summaries, and backend test coverage.
```

```text
Implemented a Django REST Framework API and React TypeScript dashboard for operational case tracking, including nested note data, computed overdue status, query-based filtering, local seed data, and pytest coverage for core workflows.
```

## Interview Talking Points

- The `Case` and `CaseNote` models are separate because notes are a one-to-many timeline attached to each case.
- Overdue state is derived from `due_date` and `status` instead of manually stored.
- The dashboard uses query params against the API for search and filtering.
- The mock AI summary lives behind a stable backend endpoint so it can later be replaced by a real provider without changing the frontend workflow.
- The project was built in staged commits so each part left the app working.
- Backend tests cover CRUD, filtering, search, notes, overdue logic, and summary generation.

## Next Improvements To Mention

- Add JWT authentication and user-specific cases.
- Deploy with PostgreSQL.
- Replace the mock summary function with a real AI API call.
- Add frontend tests and API schema documentation.
