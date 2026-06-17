import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface SecretModeStore {
  isUnlocked: boolean
  unlock: () => void
  lock: () => void
}

const name = "YOROZU_SECRET_MODE"
const storage = createJSONStorage(() => window.sessionStorage)

export const useSecretModeStore = create<SecretModeStore>()(
  persist(
    set => ({
      isUnlocked: false,
      unlock: () => set({ isUnlocked: true }),
      lock: () => set({ isUnlocked: false }),
    }),
    { name, storage },
  ),
)

export const useIsUnlocked = () => useSecretModeStore(s => s.isUnlocked)
