import { btn } from "#/common/atoms/btn"
import { ArrowsClockwiseIcon } from "@phosphor-icons/react"
import { en } from "../i18n/en"

interface ErrorCardProps {
  message: string | null | undefined
  onRetry: (() => void) | null | undefined
}

export function ErrorCard({ message, onRetry }: ErrorCardProps) {
  return (
    <div className="bg-red-900 text-red-100 p-4 flex flex-col items-center gap-2 rounded-md">
      <p>{message || en.errors.fallback}</p>

      {onRetry && (
        <button
          className={btn({
            className: "flex w-full justify-between",
          })}
          onClick={onRetry}
        >
          <span>{en.actions.retry}</span>
          <ArrowsClockwiseIcon size={20} />
        </button>
      )}
    </div>
  )
}
