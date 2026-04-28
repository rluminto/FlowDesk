import { NavLink, Route, Routes } from 'react-router-dom'

import { CaseDetail } from './pages/CaseDetail'
import { Dashboard } from './pages/Dashboard'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex min-h-16 w-full max-w-7xl flex-col items-start justify-center gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <p className="text-lg font-semibold tracking-normal">FlowDesk</p>
            <p className="text-sm text-slate-500">Case management dashboard</p>
          </div>

          <nav
            className="flex w-full items-center gap-2 sm:w-auto"
            aria-label="Primary"
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                [
                  'w-full rounded-lg px-3 py-2 text-center text-sm font-medium transition sm:w-auto',
                  isActive
                    ? 'bg-slate-950 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
                ].join(' ')
              }
            >
              Dashboard
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cases/:caseId" element={<CaseDetail />} />
          <Route
            path="*"
            element={
              <section className="rounded-lg border border-slate-200 bg-white p-6">
                <h1 className="text-xl font-semibold">Page not found</h1>
              </section>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
