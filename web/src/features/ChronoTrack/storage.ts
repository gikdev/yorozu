// ─────────────────────────────────────────────────────────────────────────────
// ChronoTrack — Storage abstraction
// Plug any implementation that satisfies IChronoStorage.
// The REST adapter expects the remote to GET/POST a single JSON string.
// ─────────────────────────────────────────────────────────────────────────────

export interface IChronoStorage {
  load(): Promise<string | null>
  save(data: string): Promise<void>
  clear(): Promise<void>
}

// ── LocalStorage adapter ──────────────────────────────────────────────────────

const LS_KEY = "chronotrack_data"

export const localStorageAdapter: IChronoStorage = {
  async load() {
    return localStorage.getItem(LS_KEY)
  },
  async save(data) {
    localStorage.setItem(LS_KEY, data)
  },
  async clear() {
    localStorage.removeItem(LS_KEY)
  },
}

// ── REST adapter factory ──────────────────────────────────────────────────────
// The API must expose:
//   GET  <baseUrl>  → 200 plain text (the stored JSON string), or 204 if empty
//   POST <baseUrl>  → body: plain text (the JSON string to store)
//   DELETE <baseUrl>

export function createRestAdapter(baseUrl: string): IChronoStorage {
  return {
    async load() {
      const res = await fetch(baseUrl, { method: "GET" })
      if (res.status === 204 || res.status === 404) return null
      if (!res.ok)
        throw new Error(`ChronoTrack REST load failed: ${res.status}`)
      return res.text()
    },
    async save(data) {
      const res = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: data,
      })
      if (!res.ok)
        throw new Error(`ChronoTrack REST save failed: ${res.status}`)
    },
    async clear() {
      const res = await fetch(baseUrl, { method: "DELETE" })
      if (!res.ok)
        throw new Error(`ChronoTrack REST clear failed: ${res.status}`)
    },
  }
}
