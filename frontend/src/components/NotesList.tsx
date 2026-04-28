import type { CaseNote } from '../types/cases'

type NotesListProps = {
  notes: CaseNote[]
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

export function NotesList({ notes }: NotesListProps) {
  if (notes.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
        No notes have been added yet.
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {notes.map((note) => (
        <article
          key={note.id}
          className="rounded-lg border border-slate-200 bg-white p-4"
        >
          <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
            {note.body}
          </p>
          <p className="mt-3 text-xs text-slate-500">
            Added {formatDateTime(note.created_at)}
          </p>
        </article>
      ))}
    </div>
  )
}
