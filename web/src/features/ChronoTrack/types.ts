// ─────────────────────────────────────────────────────────────────────────────
// ChronoTrack — Types
// ─────────────────────────────────────────────────────────────────────────────

export type SessionKind = "presence" | "focus"

export interface Session {
  id: string
  kind: SessionKind
  startedAt: number // Unix ms
  endedAt: number | null // null = still running
}

export interface ChronoState {
  sessions: Session[]
  /** ID of the currently open presence session (if any) */
  presenceSessionId: string | null
  /** ID of the currently open focus session (if any) */
  focusSessionId: string | null
}

export const emptyState = (): ChronoState => ({
  sessions: [],
  presenceSessionId: null,
  focusSessionId: null,
})

// ── Derived helpers ───────────────────────────────────────────────────────────

export function totalMs(
  sessions: Session[],
  kind: SessionKind,
  now: number,
): number {
  return sessions
    .filter(s => s.kind === kind)
    .reduce((acc, s) => {
      const end = s.endedAt ?? now
      return acc + (end - s.startedAt)
    }, 0)
}

export function formatDuration(ms: number): string {
  const totalSec = Math.floor(ms / 1000)
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60
  return [h, m, s].map(v => String(v).padStart(2, "0")).join(":")
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

// ── Report generation ─────────────────────────────────────────────────────────

export interface ChronoReport {
  exportedAt: string
  summary: {
    totalPresenceTime: string
    totalFocusTime: string
    presenceSessions: number
    focusSessions: number
    efficiency: string // focus / presence %
  }
  sessions: Array<{
    id: string
    kind: SessionKind
    startedAt: string
    endedAt: string | null
    duration: string
  }>
  raw: ChronoState
}

export function buildReport(state: ChronoState): ChronoReport {
  const now = Date.now()
  const presenceMs = totalMs(state.sessions, "presence", now)
  const focusMs = totalMs(state.sessions, "focus", now)
  const efficiency =
    presenceMs > 0 ? ((focusMs / presenceMs) * 100).toFixed(1) + "%" : "N/A"

  return {
    exportedAt: new Date().toISOString(),
    summary: {
      totalPresenceTime: formatDuration(presenceMs),
      totalFocusTime: formatDuration(focusMs),
      presenceSessions: state.sessions.filter(s => s.kind === "presence")
        .length,
      focusSessions: state.sessions.filter(s => s.kind === "focus").length,
      efficiency,
    },
    sessions: state.sessions.map(s => ({
      id: s.id,
      kind: s.kind,
      startedAt: new Date(s.startedAt).toISOString(),
      endedAt: s.endedAt ? new Date(s.endedAt).toISOString() : null,
      duration: formatDuration((s.endedAt ?? now) - s.startedAt),
    })),
    raw: state,
  }
}
