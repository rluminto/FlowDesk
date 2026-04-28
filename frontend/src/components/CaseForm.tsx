import { useState } from 'react'

import type { FormEvent } from 'react'

import type {
  CaseCategory,
  CaseCreatePayload,
  CasePriority,
} from '../types/cases'
import { caseCategoryOptions, casePriorityOptions } from '../types/cases'

type CaseFormProps = {
  onCreate: (payload: CaseCreatePayload) => Promise<void>
}

type FormState = {
  title: string
  description: string
  category: CaseCategory
  priority: CasePriority
  due_date: string
}

const initialFormState: FormState = {
  title: '',
  description: '',
  category: 'general',
  priority: 'medium',
  due_date: '',
}

const inputClass =
  'mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:cursor-not-allowed disabled:bg-slate-100'

export function CaseForm({ onCreate }: CaseFormProps) {
  const [form, setForm] = useState<FormState>(initialFormState)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function updateForm(nextForm: Partial<FormState>) {
    setForm((current) => ({ ...current, ...nextForm }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    const title = form.title.trim()
    const description = form.description.trim()

    if (!title || !description) {
      setError('Title and description are required.')
      return
    }

    const payload: CaseCreatePayload = {
      title,
      description,
      category: form.category,
      priority: form.priority,
      due_date: form.due_date || null,
    }

    try {
      setIsSubmitting(true)
      await onCreate(payload)
      setForm(initialFormState)
    } catch {
      setError('Could not create the case. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-slate-200 bg-white p-4"
    >
      <div>
        <h2 className="text-base font-semibold text-slate-950">Create case</h2>
        <p className="mt-1 text-sm text-slate-500">
          Add a fake operational case to the queue.
        </p>
      </div>

      <div className="mt-4 space-y-4">
        <label className="block text-sm font-medium text-slate-700">
          Title
          <input
            value={form.title}
            onChange={(event) => updateForm({ title: event.target.value })}
            className={inputClass}
            disabled={isSubmitting}
            maxLength={200}
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Description
          <textarea
            value={form.description}
            onChange={(event) =>
              updateForm({ description: event.target.value })
            }
            className={`${inputClass} min-h-28 resize-y`}
            disabled={isSubmitting}
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <label className="block text-sm font-medium text-slate-700">
            Category
            <select
              value={form.category}
              onChange={(event) =>
                updateForm({ category: event.target.value as CaseCategory })
              }
              className={inputClass}
              disabled={isSubmitting}
            >
              {caseCategoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Priority
            <select
              value={form.priority}
              onChange={(event) =>
                updateForm({ priority: event.target.value as CasePriority })
              }
              className={inputClass}
              disabled={isSubmitting}
            >
              {casePriorityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block text-sm font-medium text-slate-700">
          Due date
          <input
            value={form.due_date}
            onChange={(event) => updateForm({ due_date: event.target.value })}
            className={inputClass}
            disabled={isSubmitting}
            type="date"
          />
        </label>

        {error ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-teal-700 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Creating...' : 'Create case'}
        </button>
      </div>
    </form>
  )
}
