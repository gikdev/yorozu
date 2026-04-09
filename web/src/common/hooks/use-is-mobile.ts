import { useEffect, useState } from "react"

export function useIsMobile(breakpoint: number = 768): boolean {
  const getMatch = () => {
    if (typeof window === "undefined") return false
    return window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches
  }

  const [isMobile, setIsMobile] = useState<boolean>(getMatch)

  useEffect(() => {
    if (typeof window === "undefined") return

    const media = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)

    const listener = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }

    setIsMobile(media.matches)
    media.addEventListener("change", listener)

    return () => {
      media.removeEventListener("change", listener)
    }
  }, [breakpoint])

  return isMobile
}
