import { btn } from "#/common/atoms/btn";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useTheme } from "./-use-theme";

export function ToggleThemeBtn() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button className={btn({ isIcon: true })} onClick={toggleTheme}>
      {theme === "light" ? (
        <MoonIcon size={24} />
      ) : (
        <SunIcon size={24} />
      )}
    </button>
  )
}
