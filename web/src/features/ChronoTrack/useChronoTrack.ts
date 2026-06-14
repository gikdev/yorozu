// ─────────────────────────────────────────────────────────────────────────────
// ChronoTrack — useChronoTrack hook
// All business logic lives here; components stay pure UI.
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useRef, useState } from "react"
import type { IChronoStorage } from "./storage"
import { type ChronoState, type Session, emptyState, generateId } from "./types"

interface UseChronoTrackReturn {
  state: ChronoState
  isPresenceOn: boolean
  isFocusOn: boolean
  togglePresence: () => void
  toggleFocus: () => void
  clearAll: () => void
  /** ms elapsed in the currently-open presence session (0 if none) */
  presenceLiveMs: number
  /** ms elapsed in the currently-open focus session (0 if none) */
  focusLiveMs: number
  isLoading: boolean
  error: string | null
}

export function useChronoTrack(storage: IChronoStorage): UseChronoTrackReturn {
  const [state, setState] = useState<ChronoState>(emptyState())
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [now, setNow] = useState(() => Date.now())

  // Tick every second to drive live timers
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  // ── Load on mount ────────────────────────────────────────────────────────
  useEffect(() => {
    storage
      .load()
      .then(raw => {
        if (raw) {
          try {
            setState(JSON.parse(raw) as ChronoState)
          } catch {
            setError("Stored data was corrupted and has been reset.")
            setState(emptyState())
          }
        }
      })
      .catch(e => setError(String(e)))
      .finally(() => setIsLoading(false))
  }, [storage])

  // ── Persist on every state change (after initial load) ───────────────────
  const didMountRef = useRef(false)
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true
      return
    }
    storage.save(JSON.stringify(state)).catch(e => setError(String(e)))
  }, [state, storage])

  // ── Helpers ──────────────────────────────────────────────────────────────
  const closeSession = (
    sessions: Session[],
    id: string,
    at: number,
  ): Session[] => sessions.map(s => (s.id === id ? { ...s, endedAt: at } : s))

  const togglePresence = useCallback(() => {
    setState(prev => {
      const at = Date.now()
      if (prev.presenceSessionId) {
        // Close presence — also close focus if open
        let sessions = closeSession(prev.sessions, prev.presenceSessionId, at)
        let focusSessionId = prev.focusSessionId
        if (focusSessionId) {
          sessions = closeSession(sessions, focusSessionId, at)
          focusSessionId = null
        }
        return { ...prev, sessions, presenceSessionId: null, focusSessionId }
      } else {
        const newSession: Session = {
          id: generateId(),
          kind: "presence",
          startedAt: at,
          endedAt: null,
        }
        return {
          ...prev,
          sessions: [...prev.sessions, newSession],
          presenceSessionId: newSession.id,
        }
      }
    })
  }, [])

  const toggleFocus = useCallback(() => {
    setState(prev => {
      // Can only enable focus while presence is active
      if (!prev.presenceSessionId && !prev.focusSessionId) return prev
      const at = Date.now()
      if (prev.focusSessionId) {
        return {
          ...prev,
          sessions: closeSession(prev.sessions, prev.focusSessionId, at),
          focusSessionId: null,
        }
      } else {
        const newSession: Session = {
          id: generateId(),
          kind: "focus",
          startedAt: at,
          endedAt: null,
        }
        return {
          ...prev,
          sessions: [...prev.sessions, newSession],
          focusSessionId: newSession.id,
        }
      }
    })
  }, [])

  const clearAll = useCallback(() => {
    const fresh = emptyState()
    setState(fresh)
    storage.clear().catch(e => setError(String(e)))
  }, [storage])

  // ── Live timer values ────────────────────────────────────────────────────
  const presenceLiveMs = (() => {
    if (!state.presenceSessionId) return 0
    const s = state.sessions.find(s => s.id === state.presenceSessionId)
    return s ? now - s.startedAt : 0
  })()

  const focusLiveMs = (() => {
    if (!state.focusSessionId) return 0
    const s = state.sessions.find(s => s.id === state.focusSessionId)
    return s ? now - s.startedAt : 0
  })()

  return {
    state,
    isPresenceOn: !!state.presenceSessionId,
    isFocusOn: !!state.focusSessionId,
    togglePresence,
    toggleFocus,
    clearAll,
    presenceLiveMs,
    focusLiveMs,
    isLoading,
    error,
  }
}
