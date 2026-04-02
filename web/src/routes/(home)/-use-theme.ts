import { useEffect, useState } from "react"

export function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light" | null>(null)

  const toggleTheme = () => {
    setTheme(p => (p === "dark" ? "light" : "dark"))
  }

  useEffect(() => {
    switch (theme) {
      case "light":
        document.documentElement.classList.remove("theme-dark")
        break
      case "dark":
        document.documentElement.classList.add("theme-dark")
        break
      default:
        return
    }
  }, [theme])

  useEffect(() => {
    const isDarkTheme =
      document.documentElement.classList.contains("theme-dark")
    setTheme(isDarkTheme ? "dark" : "light")
  }, [])

  return { theme, toggleTheme }
}
