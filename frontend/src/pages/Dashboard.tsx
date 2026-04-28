const queueStats = [
  { label: 'Open', value: '--', accent: 'border-teal-500' },
  { label: 'Urgent', value: '--', accent: 'border-red-500' },
  { label: 'Overdue', value: '--', accent: 'border-amber-500' },
  { label: 'Waiting', value: '--', accent: 'border-sky-500' },
]

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal text-slate-950">
            Cases
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Operational queue and case priorities
          </p>
        </div>

        <button
          type="button"
          className="inline-flex h-10 items-center justify-center rounded-lg bg-slate-950 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
        >
          New case
        </button>
      </div>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {queueStats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-lg border border-slate-200 border-l-4 ${stat.accent} bg-white p-4`}
          >
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">
              {stat.value}
            </p>
          </div>
        ))}
      </section>

      <section className="rounded-lg border border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-4">
          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_160px_160px_160px]">
            <div className="h-10 rounded-lg border border-slate-200 bg-slate-50" />
            <div className="h-10 rounded-lg border border-slate-200 bg-slate-50" />
            <div className="h-10 rounded-lg border border-slate-200 bg-slate-50" />
            <div className="h-10 rounded-lg border border-slate-200 bg-slate-50" />
          </div>
        </div>

        <div className="divide-y divide-slate-200">
          {['Billing review', 'Access escalation', 'Document follow-up'].map(
            (title) => (
              <div
                key={title}
                className="grid gap-3 p-4 md:grid-cols-[minmax(0,1fr)_120px_120px]"
              >
                <div>
                  <p className="font-medium text-slate-950">{title}</p>
                  <div className="mt-2 h-2 max-w-lg rounded bg-slate-100" />
                </div>
                <div className="h-7 rounded bg-slate-100" />
                <div className="h-7 rounded bg-slate-100" />
              </div>
            ),
          )}
        </div>
      </section>
    </div>
  )
}
