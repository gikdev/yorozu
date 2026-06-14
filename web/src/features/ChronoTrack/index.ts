// ─────────────────────────────────────────────────────────────────────────────
// ChronoTrack — public API
// ─────────────────────────────────────────────────────────────────────────────

export { ChronoTrackPage } from "./ChronoTrackPage"
export { localStorageAdapter, createRestAdapter } from "./storage"
export type { IChronoStorage } from "./storage"
export type { ChronoState, Session, SessionKind, ChronoReport } from "./types"

// Usage:
// import { ChronoTrackPage, localStorageAdapter } from "#/features/chronotrack";
// <ChronoTrackPage storage={localStorageAdapter} backHref="/apps" />
