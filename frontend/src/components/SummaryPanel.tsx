type SummaryPanelProps = {
  summary: string
}

export function SummaryPanel({ summary }: SummaryPanelProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <div>
        <h2 className="text-base font-semibold text-slate-950">AI summary</h2>
        <p className="mt-1 text-sm text-slate-500">
          Summary generation will be added in the next part.
        </p>
      </div>

      {summary.trim() ? (
        <p className="mt-4 rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-sm leading-6 text-violet-800">
          {summary}
        </p>
      ) : (
        <div className="mt-4 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
          No summary has been generated yet.
        </div>
      )}
    </section>
  )
}
