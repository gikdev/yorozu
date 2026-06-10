import { useDigitalCardStore } from "./useDigitalCardStore"

export function useLang() {
  return useDigitalCardStore(s => s.lang)
}
