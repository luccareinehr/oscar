import type { SavedPrompt } from './types'

const KEY = 'oscar:saved:v1'

export function loadSaved(): SavedPrompt[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as SavedPrompt[]) : []
  } catch {
    return []
  }
}

export function persistSaved(list: SavedPrompt[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(list))
  } catch {
    // storage unavailable or full, non-fatal for a prompt builder
  }
}

export function makeId(): string {
  return `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}
