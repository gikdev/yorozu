import { useCallback } from "react"
import {
  BuildingsIcon,
  CrosshairIcon,
  TrashIcon,
  DownloadSimpleIcon,
  ArrowLeftIcon,
} from "@phosphor-icons/react"

import type { IChronoStorage } from "./storage"
import { useChronoTrack } from "./useChronoTrack"
import { buildReport } from "./types"
import { Link } from "@tanstack/react-router"

interface Props {
  storage: IChronoStorage
  backHref?: string
}

export function ChronoTrackPage({ storage, backHref = "/apps" }: Props) {
  const {
    state,
    isPresenceOn,
    isFocusOn,
    togglePresence,
    toggleFocus,
    clearAll,
  } = useChronoTrack(storage)

  const handleDownload = useCallback(() => {
    const report = buildReport(state)
    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `chronotrack-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [state])

  const handleClear = useCallback(() => {
    const confirmed = window.confirm("Delete all recorded sessions?")
    if (!confirmed) return
    clearAll()
  }, [clearAll])

  return (
    <div className="flex flex-col h-screen w-screen bg-neutral-950 overflow-hidden">
      {/* ── Top 2/3 — Presence + Focus ─────────────────────────────────── */}
      <div className="flex flex-row flex-3 min-h-0">
        {/* Presence */}
        <button
          onClick={togglePresence}
          className={[
            "flex-1 flex items-center justify-center transition-colors duration-200 cursor-pointer border-none outline-none",
            isPresenceOn
              ? "bg-sky-500/20"
              : "bg-neutral-900 hover:bg-neutral-800/80",
          ].join(" ")}
        >
          <BuildingsIcon
            weight="duotone"
            className={[
              "transition-all duration-200",
              isPresenceOn
                ? "text-sky-400 opacity-100"
                : "text-neutral-600 opacity-40",
            ].join(" ")}
            style={{
              width: "clamp(80px, 20vw, 140px)",
              height: "clamp(80px, 20vw, 140px)",
            }}
          />
        </button>

        {/* Divider */}
        <div className="w-px bg-neutral-800 shrink-0" />

        {/* Focus */}
        <button
          onClick={isFocusOn || isPresenceOn ? toggleFocus : undefined}
          disabled={!isPresenceOn && !isFocusOn}
          className={[
            "flex-1 flex items-center justify-center transition-colors duration-200 border-none outline-none",
            !isPresenceOn && !isFocusOn
              ? "cursor-not-allowed opacity-40 bg-neutral-900"
              : isFocusOn
                ? "bg-emerald-500/20 cursor-pointer"
                : "bg-neutral-900 hover:bg-neutral-800/80 cursor-pointer",
          ].join(" ")}
        >
          <CrosshairIcon
            weight="duotone"
            className={[
              "transition-all duration-200",
              isFocusOn
                ? "text-emerald-400 opacity-100"
                : "text-neutral-600 opacity-40",
            ].join(" ")}
            style={{
              width: "clamp(80px, 20vw, 140px)",
              height: "clamp(80px, 20vw, 140px)",
            }}
          />
        </button>
      </div>

      {/* Divider */}
      <div className="h-px bg-neutral-800 shrink-0" />

      {/* ── Bottom 1/3 — Actions ────────────────────────────────────────── */}
      <div className="flex flex-1 min-h-0">
        {/* Back */}
        <Link
          to={backHref}
          className="flex-1 flex items-center justify-center bg-neutral-900 hover:bg-neutral-800/80 transition-colors duration-200 group"
        >
          <ArrowLeftIcon
            weight="duotone"
            className="text-neutral-600 opacity-40 group-hover:text-neutral-300 group-hover:opacity-80 transition-all duration-200"
            style={{
              width: "clamp(36px, 8vw, 56px)",
              height: "clamp(36px, 8vw, 56px)",
            }}
          />
        </Link>

        {/* Divider */}
        <div className="w-px bg-neutral-800 shrink-0" />

        {/* Export */}
        <button
          onClick={handleDownload}
          className="flex-1 flex items-center justify-center bg-neutral-900 hover:bg-sky-500/10 transition-colors duration-200 cursor-pointer border-none outline-none group"
        >
          <DownloadSimpleIcon
            weight="duotone"
            className="text-neutral-600 opacity-40 group-hover:text-sky-400 group-hover:opacity-80 transition-all duration-200"
            style={{
              width: "clamp(36px, 8vw, 56px)",
              height: "clamp(36px, 8vw, 56px)",
            }}
          />
        </button>

        {/* Divider */}
        <div className="w-px bg-neutral-800 shrink-0" />

        {/* Delete */}
        <button
          onClick={handleClear}
          className="flex-1 flex items-center justify-center bg-neutral-900 hover:bg-red-500/10 transition-colors duration-200 cursor-pointer border-none outline-none group"
        >
          <TrashIcon
            weight="duotone"
            className="text-neutral-600 opacity-40 group-hover:text-red-400 group-hover:opacity-80 transition-all duration-200"
            style={{
              width: "clamp(36px, 8vw, 56px)",
              height: "clamp(36px, 8vw, 56px)",
            }}
          />
        </button>
      </div>
    </div>
  )
}
