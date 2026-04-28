type SummaryPanelProps = {
  summary: string
  error: string
  isGenerating: boolean
  onGenerate: () => Promise<void>
}

export function SummaryPanel({
  summary,
  error,
  isGenerating,
  onGenerate,
}: SummaryPanelProps) {
  const hasSummary = Boolean(summary.trim())

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <h2 className="text-base font-semibold text-slate-950">AI summary</h2>
          <p className="mt-1 text-sm text-slate-500">
            Mock summary generated from the case and notes.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void onGenerate()}
          disabled={isGenerating}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-violet-700 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isGenerating
            ? 'Generating...'
            : hasSummary
              ? 'Regenerate'
              : 'Generate'}
        </button>
      </div>

      {error ? (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      {hasSummary ? (
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
