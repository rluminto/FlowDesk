export type CaseStatus =
  | 'open'
  | 'in_progress'
  | 'waiting'
  | 'resolved'
  | 'closed'

export type CasePriority = 'low' | 'medium' | 'high' | 'urgent'

export type CaseCategory =
  | 'billing'
  | 'scheduling'
  | 'technical'
  | 'document_review'
  | 'general'

export type CaseNote = {
  id: number
  case: number
  author: number | null
  body: string
  created_at: string
}

export type CaseItem = {
  id: number
  title: string
  description: string
  category: CaseCategory
  status: CaseStatus
  priority: CasePriority
  assigned_user: number | null
  due_date: string | null
  ai_summary: string
  overdue: boolean
  notes: CaseNote[]
  created_at: string
  updated_at: string
}

export type CaseCreatePayload = {
  title: string
  description: string
  category: CaseCategory
  priority: CasePriority
  due_date?: string | null
}

export type CaseUpdatePayload = Partial<{
  title: string
  description: string
  category: CaseCategory
  status: CaseStatus
  priority: CasePriority
  assigned_user: number | null
  due_date: string | null
}>

export type CaseNoteCreatePayload = {
  case: number
  body: string
  author?: number | null
}

export type CaseFilterValues = {
  search: string
  status: CaseStatus | ''
  priority: CasePriority | ''
  category: CaseCategory | ''
}

export const caseStatusOptions: Array<{ value: CaseStatus; label: string }> = [
  { value: 'open', label: 'Open' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'waiting', label: 'Waiting' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
]

export const casePriorityOptions: Array<{
  value: CasePriority
  label: string
}> = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
]

export const caseCategoryOptions: Array<{
  value: CaseCategory
  label: string
}> = [
  { value: 'billing', label: 'Billing' },
  { value: 'scheduling', label: 'Scheduling' },
  { value: 'technical', label: 'Technical' },
  { value: 'document_review', label: 'Document review' },
  { value: 'general', label: 'General' },
]

export const caseStatusLabels: Record<CaseStatus, string> =
  Object.fromEntries(
    caseStatusOptions.map((option) => [option.value, option.label]),
  ) as Record<CaseStatus, string>

export const casePriorityLabels: Record<CasePriority, string> =
  Object.fromEntries(
    casePriorityOptions.map((option) => [option.value, option.label]),
  ) as Record<CasePriority, string>

export const caseCategoryLabels: Record<CaseCategory, string> =
  Object.fromEntries(
    caseCategoryOptions.map((option) => [option.value, option.label]),
  ) as Record<CaseCategory, string>
