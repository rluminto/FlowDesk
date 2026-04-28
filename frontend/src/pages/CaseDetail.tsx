import { Link, useParams } from 'react-router-dom'

export function CaseDetail() {
  const { caseId } = useParams()

  return (
    <div className="space-y-4">
      <Link
        to="/"
        className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
      >
        Back to dashboard
      </Link>

      <section className="rounded-lg border border-slate-200 bg-white p-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <p className="text-sm text-slate-500">Case #{caseId}</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-normal text-slate-950">
              Case detail
            </h1>
          </div>

          <div className="flex gap-2">
            <span className="rounded-lg border border-teal-200 bg-teal-50 px-3 py-1 text-sm font-medium text-teal-700">
              Open
            </span>
            <span className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
              Medium
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="space-y-3">
            <div className="h-4 max-w-2xl rounded bg-slate-100" />
            <div className="h-4 max-w-xl rounded bg-slate-100" />
            <div className="h-4 max-w-lg rounded bg-slate-100" />
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <p className="text-sm font-medium text-slate-950">Summary</p>
            <div className="mt-3 space-y-2">
              <div className="h-2 rounded bg-slate-100" />
              <div className="h-2 rounded bg-slate-100" />
              <div className="h-2 w-2/3 rounded bg-slate-100" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
