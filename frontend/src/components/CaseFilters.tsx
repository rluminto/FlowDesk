import type { CaseFilterValues } from '../types/cases'
import {
  caseCategoryOptions,
  casePriorityOptions,
  caseStatusOptions,
} from '../types/cases'

type CaseFiltersProps = {
  filters: CaseFilterValues
  isLoading: boolean
  onChange: (filters: Partial<CaseFilterValues>) => void
  onClear: () => void
}

const controlClass =
  'h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:cursor-not-allowed disabled:bg-slate-100'

export function CaseFilters({
  filters,
  isLoading,
  onChange,
  onClear,
}: CaseFiltersProps) {
  const hasActiveFilters = Object.values(filters).some(Boolean)

  return (
    <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_160px_160px_180px_auto]">
      <label className="block">
        <span className="sr-only">Search cases</span>
        <input
          value={filters.search}
          onChange={(event) => onChange({ search: event.target.value })}
          className={controlClass}
          placeholder="Search by title or description"
          type="search"
        />
      </label>

      <label className="block">
        <span className="sr-only">Status</span>
        <select
          value={filters.status}
          onChange={(event) =>
            onChange({ status: event.target.value as CaseFilterValues['status'] })
          }
          className={controlClass}
        >
          <option value="">All statuses</option>
          {caseStatusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="sr-only">Priority</span>
        <select
          value={filters.priority}
          onChange={(event) =>
            onChange({
              priority: event.target.value as CaseFilterValues['priority'],
            })
          }
          className={controlClass}
        >
          <option value="">All priorities</option>
          {casePriorityOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="sr-only">Category</span>
        <select
          value={filters.category}
          onChange={(event) =>
            onChange({
              category: event.target.value as CaseFilterValues['category'],
            })
          }
          className={controlClass}
        >
          <option value="">All categories</option>
          {caseCategoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <button
        type="button"
        onClick={onClear}
        disabled={!hasActiveFilters || isLoading}
        className="h-10 rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Clear
      </button>
    </div>
  )
}
