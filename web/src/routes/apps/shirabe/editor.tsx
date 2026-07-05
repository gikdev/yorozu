import { FilePlusIcon, PlusIcon } from "@phosphor-icons/react"
import { createFileRoute, linkOptions } from "@tanstack/react-router"
import { type ChangeEvent, useState } from "react"
import toast from "react-hot-toast"
import { btn } from "#/common/atoms/btn"
import { styleInput } from "#/common/atoms/input"
import { extractErrorMessage } from "#/common/helpers/errors"
import { PageHeaderBackButton } from "#/common/molecules/page-header"
import { stylePageHeader } from "#/common/molecules/page-header/stylePageHeader"
import { LyricLinesForm } from "#/features/lyric-lines/LyricLinesForm"
import type { LyricLinesFormValues } from "#/features/lyric-lines/LyricLinesForm/LyricLinesFormSchema"
import {
  clearLyricLines,
  loadLyricLines,
} from "#/features/lyric-lines/LyricLinesForm/useLyricLinesFormStorage"
import { TimestampSongPlayer } from "#/features/song/TimestampSongPlayer"

export const Route = createFileRoute("/apps/shirabe/editor")({
  component: RouteComponent,
})

type PageState =
  | { mode: "LANDING" }
  | { mode: "CREATE" }
  | { mode: "EDIT"; initialValues: LyricLinesFormValues }

function downloadJson(values: LyricLinesFormValues, filename: string) {
  const blob = new Blob([JSON.stringify(values, null, 2)], {
    type: "application/json",
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename.endsWith(".json") ? filename : `${filename}.json`
  a.click()
  URL.revokeObjectURL(url)
}

function RouteComponent() {
  const [pageState, setPageState] = useState<PageState>(() => {
    const wip = loadLyricLines()
    if (wip && wip.lines.length > 0) return { mode: "EDIT", initialValues: wip }
    return { mode: "LANDING" }
  })
  const [filename, setFilename] = useState("lyrics")

  const handleImport = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      try {
        const parsed = JSON.parse(ev.target?.result as string)
        const values: LyricLinesFormValues = Array.isArray(parsed)
          ? { lines: parsed }
          : parsed
        setPageState({ mode: "EDIT", initialValues: values })
      } catch (err) {
        toast.error(extractErrorMessage(err))
      }
    }
    reader.readAsText(file)
    e.target.value = ""
  }

  const handleSubmit = async (values: LyricLinesFormValues) => {
    downloadJson(values, filename)
    clearLyricLines()
  }

  const handleNew = () => {
    clearLyricLines()
    setPageState({ mode: "CREATE" })
  }

  return (
    <div className="h-dvh flex flex-col overflow-hidden bg-mist-950 text-mist-400 mx-auto w-full">
      <title>調べ</title>

      <header className={stylePageHeader()}>
        <div className="flex justify-start">
          <PageHeaderBackButton to={linkOptions({ to: "/apps" }).to} />
        </div>

        <div className="text-mist-100 font-bold text-xl text-center">調べ</div>

        <div className="flex justify-end items-center gap-1">
          {pageState.mode !== "LANDING" && (
            <button
              type="button"
              className={btn({ theme: "outline", size: "sm" })}
              onClick={() => setPageState({ mode: "LANDING" })}
            >
              ← Back
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 flex flex-col overflow-y-auto min-h-0 gap-8 p-8">
        {pageState.mode === "LANDING" && (
          <div className="flex flex-col gap-4 items-center justify-center flex-1">
            <p className="text-mist-300 text-lg font-semibold">調べ Editor</p>
            <p className="text-mist-500 text-sm">What would you like to do?</p>

            <div className="flex gap-3">
              <button
                type="button"
                className={btn({ theme: "primary" })}
                onClick={handleNew}
              >
                <PlusIcon size={20} />
                <span>New</span>
              </button>

              <label className={btn({ theme: "outline" })}>
                <FilePlusIcon size={20} />
                <span>Load JSON</span>
                <input
                  className="hidden"
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                />
              </label>
            </div>
          </div>
        )}

        {pageState.mode !== "LANDING" && (
          <div className="flex gap-8 items-start">
            {/* Left column */}
            <div className="flex flex-col gap-4 flex-1 sticky top-0">
              <TimestampSongPlayer />

              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={filename}
                  onChange={e => setFilename(e.target.value)}
                  placeholder="filename"
                  className={styleInput({ className: "flex-1" })}
                />
                <span className="text-mist-500 text-sm">.json</span>
              </div>
            </div>

            {/* Right column */}
            <div className="flex-1 min-w-0">
              {pageState.mode === "EDIT" ? (
                <LyricLinesForm
                  mode="EDIT"
                  initialValues={pageState.initialValues}
                  onSubmit={handleSubmit}
                />
              ) : (
                <LyricLinesForm mode="CREATE" onSubmit={handleSubmit} />
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
