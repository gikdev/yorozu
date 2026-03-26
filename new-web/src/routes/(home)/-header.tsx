import { ToggleThemeBtn } from "./-toggle-theme-btn"

export function Header({ version }: { version: number }) {
  return (
    <header className="flex items-center gap-2 border-b-2 border-mist-300 dark:border-mist-800 p-2">
      <img src="/fanoos.png" className="size-10 rounded-md" />

      <p className="gap-1 items-center flex">
        <span className="text-lg sm:text-2xl font-bold text-sky-500 dark:text-sky-500">Fanoos</span>
        <sup>v{version}</sup>
      </p>

      <div className="flex-1" />

      <ToggleThemeBtn />
    </header>
  )
}
