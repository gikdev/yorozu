import { create } from "zustand"

interface SecretModeStore {
  isUnlocked: boolean
  unlock: () => void
  lock: () => void
}

export const useSecretModeStore = create<SecretModeStore>(set => ({
  isUnlocked: false,
  unlock: () => set({ isUnlocked: true }),
  lock: () => set({ isUnlocked: false }),
}))

export const useIsUnlocked = () => useSecretModeStore(s => s.isUnlocked)
