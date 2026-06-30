import { createFileRoute, linkOptions } from "@tanstack/react-router"
import { AppBar } from "#/common/molecules/page-header"
import { btn } from "#/common/atoms/btn"
import { useState } from "react"
import { Scanner } from "@yudiel/react-qr-scanner"
import { ClipboardIcon } from "@phosphor-icons/react"

const TITLE = "QR Reader"

export const Route = createFileRoute("/apps/qr-reader")({
  head: () => ({ meta: [{ title: TITLE }] }),
  component: RouteComponent,
})

function RouteComponent() {
  const [result, setResult] = useState("")
  const [isPaused, setIsPaused] = useState(false)

  function copyResult() {
    navigator.clipboard.writeText(result)
  }

  return (
    <div className="h-dvh flex flex-col overflow-hidden bg-mist-950 text-mist-400 max-w-240 mx-auto w-full">
      <AppBar title={TITLE} parentPath={linkOptions({ to: "/apps" })}>
        <button
          className={btn({ isIcon: true })}
          onClick={copyResult}
          disabled={!result}
          aria-label="Copy result"
        >
          <ClipboardIcon size={24} />
        </button>
      </AppBar>

      <main className="flex-1 flex flex-col gap-4 p-4 overflow-y-auto min-h-0">
        <div className="rounded overflow-hidden">
          <Scanner
            paused={isPaused}
            onScan={(codes) => {
              const value = codes[0]?.rawValue
              if (value) {
                setResult(value)
                setIsPaused(true) // freeze on first hit; resume manually below
              }
            }}
          />
        </div>

        {result && (
          <div className="flex flex-col gap-2">
            <div className="rounded bg-mist-900 px-3 py-2 text-sm break-all">{result}</div>
            <button className={btn()} onClick={() => { setResult(""); setIsPaused(false) }}>
              Scan again
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
