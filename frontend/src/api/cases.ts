import { apiClient } from './client'

import type {
  CaseCreatePayload,
  CaseFilterValues,
  CaseItem,
  CaseNote,
  CaseNoteCreatePayload,
  CaseUpdatePayload,
} from '../types/cases'

function buildCaseParams(filters: CaseFilterValues) {
  const params: Record<string, string> = {}

  if (filters.search.trim()) {
    params.search = filters.search.trim()
  }

  if (filters.status) {
    params.status = filters.status
  }

  if (filters.priority) {
    params.priority = filters.priority
  }

  if (filters.category) {
    params.category = filters.category
  }

  return params
}

export async function getCases(filters: CaseFilterValues) {
  const response = await apiClient.get<CaseItem[]>('/cases/', {
    params: buildCaseParams(filters),
  })

  return response.data
}

export async function createCase(payload: CaseCreatePayload) {
  const response = await apiClient.post<CaseItem>('/cases/', payload)
  return response.data
}

export async function getCase(id: number) {
  const response = await apiClient.get<CaseItem>(`/cases/${id}/`)
  return response.data
}

export async function updateCase(id: number, payload: CaseUpdatePayload) {
  const response = await apiClient.patch<CaseItem>(`/cases/${id}/`, payload)
  return response.data
}

export async function createNote(payload: CaseNoteCreatePayload) {
  const response = await apiClient.post<CaseNote>('/notes/', payload)
  return response.data
}

export async function generateSummary(id: number) {
  const response = await apiClient.post<CaseItem>(
    `/cases/${id}/generate_summary/`,
  )
  return response.data
}
