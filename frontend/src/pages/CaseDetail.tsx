import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { createNote, generateSummary, getCase, updateCase } from '../api/cases'
import { NoteForm } from '../components/NoteForm'
import { NotesList } from '../components/NotesList'
import { SummaryPanel } from '../components/SummaryPanel'

import type { CaseItem, CasePriority, CaseStatus } from '../types/cases'
import {
  caseCategoryLabels,
  casePriorityLabels,
  casePriorityOptions,
  caseStatusLabels,
  caseStatusOptions,
} from '../types/cases'

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

function formatDate(value: string | null) {
  if (!value) {
    return 'No due date'
  }

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${value}T00:00:00`))
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value))
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium text-slate-950">{value}</dd>
    </div>
  )
}

export function CaseDetail() {
  const { caseId } = useParams()
  const numericCaseId = Number(caseId)
  const hasValidCaseId = Number.isInteger(numericCaseId) && numericCaseId > 0

  const [caseItem, setCaseItem] = useState<CaseItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false)
  const [error, setError] = useState('')
  const [actionError, setActionError] = useState('')
  const [summaryError, setSummaryError] = useState('')

  useEffect(() => {
    let isCurrent = true

    async function loadCase() {
      setIsLoading(true)
      setError('')
      setActionError('')
      setSummaryError('')

      if (!hasValidCaseId) {
        if (isCurrent) {
          setCaseItem(null)
          setError('This case link is invalid.')
          setIsLoading(false)
        }
        return
      }

      try {
        const nextCase = await getCase(numericCaseId)

        if (isCurrent) {
          setCaseItem(nextCase)
        }
      } catch {
        if (isCurrent) {
          setCaseItem(null)
          setError('Could not load this case.')
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false)
        }
      }
    }

    void loadCase()

    return () => {
      isCurrent = false
    }
  }, [hasValidCaseId, numericCaseId])

  async function handleStatusChange(status: CaseStatus) {
    if (!caseItem) {
      return
    }

    setIsUpdating(true)
    setActionError('')

    try {
      const updatedCase = await updateCase(caseItem.id, { status })
      setCaseItem(updatedCase)
    } catch {
      setActionError('Could not update the case status.')
    } finally {
      setIsUpdating(false)
    }
  }

  async function handlePriorityChange(priority: CasePriority) {
    if (!caseItem) {
      return
    }

    setIsUpdating(true)
    setActionError('')

    try {
      const updatedCase = await updateCase(caseItem.id, { priority })
      setCaseItem(updatedCase)
    } catch {
      setActionError('Could not update the case priority.')
    } finally {
      setIsUpdating(false)
    }
  }

  async function handleCreateNote(body: string) {
    if (!caseItem) {
      return
    }

    setActionError('')
    await createNote({ case: caseItem.id, body })
    const updatedCase = await getCase(caseItem.id)
    setCaseItem(updatedCase)
  }

  async function handleGenerateSummary() {
    if (!caseItem) {
      return
    }

    setIsGeneratingSummary(true)
    setSummaryError('')

    try {
      const updatedCase = await generateSummary(caseItem.id)
      setCaseItem(updatedCase)
    } catch {
      setSummaryError('Could not generate a summary. Please try again.')
    } finally {
      setIsGeneratingSummary(false)
    }
  }

  return (
    <div className="space-y-4">
      <Link
        to="/"
        className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
      >
        Back to dashboard
      </Link>

      {isLoading ? (
        <section className="rounded-lg border border-slate-200 bg-white p-6">
          <div className="h-4 w-24 rounded bg-slate-100" />
          <div className="mt-4 h-8 max-w-xl rounded bg-slate-100" />
          <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-3">
              <div className="h-4 rounded bg-slate-100" />
              <div className="h-4 max-w-2xl rounded bg-slate-100" />
              <div className="h-4 max-w-xl rounded bg-slate-100" />
            </div>
            <div className="h-40 rounded-lg bg-slate-100" />
          </div>
        </section>
      ) : null}

      {!isLoading && error ? (
        <section className="rounded-lg border border-red-200 bg-red-50 p-6">
          <h1 className="text-lg font-semibold text-red-900">Case unavailable</h1>
          <p className="mt-2 text-sm text-red-700">{error}</p>
        </section>
      ) : null}

      {!isLoading && caseItem ? (
        <div className="space-y-6">
          <section className="rounded-lg border border-slate-200 bg-white p-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div className="min-w-0">
                <p className="text-sm text-slate-500">Case #{caseItem.id}</p>
                <h1 className="mt-2 text-2xl font-semibold tracking-normal text-slate-950">
                  {caseItem.title}
                </h1>
                <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                  {caseItem.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 md:justify-end">
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
                {caseItem.overdue ? (
                  <span className="rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
                    Overdue
                  </span>
                ) : null}
              </div>
            </div>

            {actionError ? (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {actionError}
              </div>
            ) : null}

            <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
              <dl className="grid gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2">
                <DetailField
                  label="Category"
                  value={caseCategoryLabels[caseItem.category]}
                />
                <DetailField label="Due date" value={formatDate(caseItem.due_date)} />
                <DetailField
                  label="Created"
                  value={formatDateTime(caseItem.created_at)}
                />
                <DetailField
                  label="Updated"
                  value={formatDateTime(caseItem.updated_at)}
                />
              </dl>

              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <h2 className="text-base font-semibold text-slate-950">
                  Case controls
                </h2>

                <div className="mt-4 space-y-4">
                  <label className="block text-sm font-medium text-slate-700">
                    Status
                    <select
                      value={caseItem.status}
                      onChange={(event) =>
                        void handleStatusChange(event.target.value as CaseStatus)
                      }
                      disabled={isUpdating}
                      className="mt-1 h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                    >
                      {caseStatusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block text-sm font-medium text-slate-700">
                    Priority
                    <select
                      value={caseItem.priority}
                      onChange={(event) =>
                        void handlePriorityChange(
                          event.target.value as CasePriority,
                        )
                      }
                      disabled={isUpdating}
                      className="mt-1 h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                    >
                      {casePriorityOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  {isUpdating ? (
                    <p className="text-sm text-slate-500">Saving changes...</p>
                  ) : null}
                </div>
              </div>
            </div>
          </section>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <section className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">Notes</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Internal history and follow-up context
                </p>
              </div>

              <NoteForm onCreate={handleCreateNote} />
              <NotesList notes={caseItem.notes} />
            </section>

            <aside>
              <SummaryPanel
                summary={caseItem.ai_summary}
                error={summaryError}
                isGenerating={isGeneratingSummary}
                onGenerate={handleGenerateSummary}
              />
            </aside>
          </div>
        </div>
      ) : null}
    </div>
  )
}
