import toast from "react-hot-toast"
import { extractErrorMessage } from "#/common/helpers/errors"

export function TimestampCard(p: { timestamp: number | null; label: string }) {
  const timestampDisplay =
    p.timestamp == null ? "N/A" : p.timestamp.toFixed(1).padStart(5, "0")

  const handleCopy = () => {
    navigator.clipboard
      .writeText(timestampDisplay)
      .then(() => toast.success("Copied!"))
      .catch(err => toast.error(extractErrorMessage(err)))
  }

  return (
    <div className="flex flex-col gap-2 p-8 rounded-lg items-center text-center border border-mist-800">
      <code
        onAuxClick={handleCopy}
        className="text-mist-100 font-bold text-3xl"
      >
        {timestampDisplay}
      </code>
      <p className="text-xs">{p.label}</p>
    </div>
  )
}
