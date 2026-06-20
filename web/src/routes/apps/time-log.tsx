import { TimeLog, type Session } from "#/features/TimeLog"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useState } from "react"

const LS_KEY = "time-log:sessions"

export const Route = createFileRoute("/apps/time-log")({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const [sessions, setSessions] = useState<Session[]>(loadSessions)

  const activeSession = sessions.find(s => s.endedAt === null)
  const isRunning = !!activeSession

  const startNewSession = () => {
    const isConfirmed = window.confirm("Sure?")
    if (!isConfirmed) return

    const newSession: Session = { startedAt: Date.now(), endedAt: null }
    const updated = [...sessions, newSession]

    setSessions(updated)
    saveSessions(updated)
  }

  const endCurrentSession = () => {
    const isConfirmed = window.confirm("Sure?")
    if (!isConfirmed) return

    const updated = sessions.map(s =>
      s.endedAt === null ? { ...s, endedAt: Date.now() } : s,
    )
    setSessions(updated)
    saveSessions(updated)
  }

  const toggle = () => (isRunning ? endCurrentSession() : startNewSession())

  const deleteAll = () => {
    const isConfirmed = window.confirm("Clear all sessions?")
    if (!isConfirmed) return

    setSessions([])
    localStorage.removeItem(LS_KEY)
  }

  return (
    <TimeLog
      isRunning={isRunning}
      sessions={sessions}
      onToggle={toggle}
      onBack={() => navigate({ to: "/apps" })}
      onDelete={deleteAll}
    />
  )
}

function loadSessions(): Session[] {
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveSessions(sessions: Session[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(sessions))
}
