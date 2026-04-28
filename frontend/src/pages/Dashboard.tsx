import { useEffect, useMemo, useState } from 'react'

import { createCase, getCases } from '../api/cases'
import { CaseCard } from '../components/CaseCard'
import { CaseFilters } from '../components/CaseFilters'
import { CaseForm } from '../components/CaseForm'

import type { CaseCreatePayload, CaseFilterValues, CaseItem } from '../types/cases'

const emptyFilters: CaseFilterValues = {
  search: '',
  status: '',
  priority: '',
  category: '',
}

function countBy(cases: CaseItem[], predicate: (caseItem: CaseItem) => boolean) {
  return cases.filter(predicate).length
}

export function Dashboard() {
  const [cases, setCases] = useState<CaseItem[]>([])
  const [filters, setFilters] = useState<CaseFilterValues>(emptyFilters)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let isCurrent = true

    async function loadCases() {
      setIsLoading(true)
      setError('')

      try {
        const nextCases = await getCases(filters)

        if (isCurrent) {
          setCases(nextCases)
        }
      } catch {
        if (isCurrent) {
          setError('Could not load cases. Confirm the backend server is running.')
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false)
        }
      }
    }

    void loadCases()

    return () => {
      isCurrent = false
    }
  }, [filters, refreshKey])

  const queueStats = useMemo(
    () => [
      {
        label: 'Cases shown',
        value: cases.length,
        accent: 'border-teal-500',
      },
      {
        label: 'Open',
        value: countBy(cases, (caseItem) => caseItem.status === 'open'),
        accent: 'border-sky-500',
      },
      {
        label: 'Urgent',
        value: countBy(cases, (caseItem) => caseItem.priority === 'urgent'),
        accent: 'border-red-500',
      },
      {
        label: 'Overdue',
        value: countBy(cases, (caseItem) => caseItem.overdue),
        accent: 'border-amber-500',
      },
    ],
    [cases],
  )

  function handleFilterChange(nextFilters: Partial<CaseFilterValues>) {
    setFilters((current) => ({ ...current, ...nextFilters }))
  }

  function handleClearFilters() {
    setFilters(emptyFilters)
  }

  async function handleCreateCase(payload: CaseCreatePayload) {
    await createCase(payload)
    setFilters(emptyFilters)
    setRefreshKey((current) => current + 1)
  }

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

        <p className="rounded-lg border border-teal-200 bg-teal-50 px-3 py-2 text-sm font-medium text-teal-800">
          {isLoading ? 'Loading cases' : `${cases.length} cases shown`}
        </p>
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

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <section className="min-w-0 rounded-lg border border-slate-200 bg-white">
          <div className="border-b border-slate-200 p-4">
            <CaseFilters
              filters={filters}
              isLoading={isLoading}
              onChange={handleFilterChange}
              onClear={handleClearFilters}
            />
          </div>

          {error ? (
            <div className="p-4">
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            </div>
          ) : null}

          {isLoading ? (
            <div className="divide-y divide-slate-200">
              {[1, 2, 3].map((item) => (
                <div key={item} className="grid gap-3 p-4 md:grid-cols-2">
                  <div>
                    <div className="h-4 max-w-sm rounded bg-slate-100" />
                    <div className="mt-3 h-3 max-w-2xl rounded bg-slate-100" />
                    <div className="mt-2 h-3 max-w-xl rounded bg-slate-100" />
                  </div>
                  <div className="flex gap-2 md:justify-end">
                    <div className="h-7 w-20 rounded-full bg-slate-100" />
                    <div className="h-7 w-20 rounded-full bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {!isLoading && !error && cases.length > 0 ? (
            <div className="divide-y divide-slate-200">
              {cases.map((caseItem) => (
                <CaseCard key={caseItem.id} caseItem={caseItem} />
              ))}
            </div>
          ) : null}

          {!isLoading && !error && cases.length === 0 ? (
            <div className="p-8 text-center">
              <h2 className="text-lg font-semibold text-slate-950">
                No cases found
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Adjust your filters or create a new case to add work to the
                queue.
              </p>
            </div>
          ) : null}
        </section>

        <aside>
          <CaseForm onCreate={handleCreateCase} />
        </aside>
      </div>
    </div>
  )
}
