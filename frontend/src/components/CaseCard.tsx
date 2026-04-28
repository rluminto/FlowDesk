import { Link } from 'react-router-dom'

import type { CaseItem, CasePriority, CaseStatus } from '../types/cases'
import {
  caseCategoryLabels,
  casePriorityLabels,
  caseStatusLabels,
} from '../types/cases'

type CaseCardProps = {
  caseItem: CaseItem
}

const statusStyles: Record<CaseStatus, string> = {
  open: 'border-teal-200 bg-teal-50 text-teal-700',
  in_progress: 'border-sky-200 bg-sky-50 text-sky-700',
  waiting: 'border-amber-200 bg-amber-50 text-amber-700',
  resolved: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  closed: 'border-slate-200 bg-slate-100 text-slate-600',
}

const priorityStyles: Record<CasePriority, string> = {
  low: 'border-slate-200 bg-slate-50 text-slate-600',
  medium: 'border-indigo-200 bg-indigo-50 text-indigo-700',
  high: 'border-orange-200 bg-orange-50 text-orange-700',
  urgent: 'border-red-200 bg-red-50 text-red-700',
}

function formatDate(date: string | null) {
  if (!date) {
    return 'No due date'
  }

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`))
}

export function CaseCard({ caseItem }: CaseCardProps) {
  const hasSummary = Boolean(caseItem.ai_summary.trim())

  return (
    <article className="grid gap-4 p-4 transition hover:bg-slate-50 md:grid-cols-[minmax(0,1fr)_auto]">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to={`/cases/${caseItem.id}`}
            className="text-base font-semibold text-slate-950 transition hover:text-teal-700"
          >
            {caseItem.title}
          </Link>

          {caseItem.overdue ? (
            <span className="rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
              Overdue
            </span>
          ) : null}
        </div>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
          {caseItem.description}
        </p>

        {hasSummary ? (
          <p className="mt-3 rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-sm leading-6 text-violet-800">
            {caseItem.ai_summary}
          </p>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
          <span>{caseCategoryLabels[caseItem.category]}</span>
          <span aria-hidden="true">/</span>
          <span>{formatDate(caseItem.due_date)}</span>
          <span aria-hidden="true">/</span>
          <span>
            {caseItem.notes.length}{' '}
            {caseItem.notes.length === 1 ? 'note' : 'notes'}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-start gap-2 md:justify-end">
        <span
          className={`rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[caseItem.status]}`}
        >
          {caseStatusLabels[caseItem.status]}
        </span>
        <span
          className={`rounded-full border px-2.5 py-1 text-xs font-medium ${priorityStyles[caseItem.priority]}`}
        >
          {casePriorityLabels[caseItem.priority]}
        </span>
      </div>
    </article>
  )
}
