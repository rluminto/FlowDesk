import { useState } from 'react'

import type { FormEvent } from 'react'

type NoteFormProps = {
  onCreate: (body: string) => Promise<void>
}

export function NoteForm({ onCreate }: NoteFormProps) {
  const [body, setBody] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    const trimmedBody = body.trim()

    if (!trimmedBody) {
      setError('Note body is required.')
      return
    }

    try {
      setIsSubmitting(true)
      await onCreate(trimmedBody)
      setBody('')
    } catch {
      setError('Could not add the note. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-slate-200 bg-white p-4"
    >
      <label className="block text-sm font-medium text-slate-700">
        Add note
        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          disabled={isSubmitting}
          className="mt-2 min-h-28 w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:cursor-not-allowed disabled:bg-slate-100"
          placeholder="Add the latest case context or next step"
        />
      </label>

      {error ? (
        <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-3 inline-flex h-10 items-center justify-center rounded-lg bg-teal-700 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? 'Adding note...' : 'Add note'}
      </button>
    </form>
  )
}
