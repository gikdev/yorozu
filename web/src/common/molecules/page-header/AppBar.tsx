import { type ReactNode } from "react"
import { Link, useRouter, type LinkOptions } from "@tanstack/react-router"
import { ArrowLeftIcon, ArrowUpIcon } from "@phosphor-icons/react"
import { btn } from "#/common/atoms/btn"

interface AppBarProps {
  parentPath?: LinkOptions
  title?: ReactNode
  children?: ReactNode
}

export function AppBar(p: AppBarProps) {
  const router = useRouter()
  const canGoBack = router.history.length > 1

  return (
    <header className="bg-mist-950 border-b-2 border-mist-900 min-h-16 flex items-center gap-4 px-2">
      <div className="flex items-center gap-1">
        {canGoBack && (
          <button
            type="button"
            aria-label="Go back"
            onClick={() => router.history.back()}
            className={btn({ isIcon: true })}
          >
            <ArrowLeftIcon size={24} />
          </button>
        )}

        {p.parentPath && (
          <Link
            aria-label="Go to parent"
            {...p.parentPath}
            className={btn({ isIcon: true })}
          >
            <ArrowUpIcon size={24} />
          </Link>
        )}
      </div>

      <div className="text-mist-100 font-bold text-xl text-start">
        {p.title}
      </div>

      <div className="flex flex-1 justify-end">{p.children}</div>
    </header>
  )
}
