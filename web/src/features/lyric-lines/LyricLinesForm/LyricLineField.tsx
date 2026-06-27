import { btn } from "#/common/atoms/btn"
import { styleInput } from "#/common/atoms/input"
import { fieldContainer } from "#/common/atoms/field-container"
import {
  TrashIcon,
  ClockIcon,
  ArrowCounterClockwiseIcon,
  CaretDownIcon,
  CaretUpIcon,
} from "@phosphor-icons/react"
import { useFieldContext } from "#/common/forms"
import { type LyricLine, type TextFieldKey } from "./LyricLinesFormSchema"
import { useSongPlayerStore } from "#/features/song/useSongPlayerStore"
import { useState } from "react"

const textFields: { key: TextFieldKey; label: string }[] = [
  { key: "persian", label: "Persian" },
  { key: "english", label: "English" },
  { key: "arabic", label: "Arabic" },
  { key: "spanish", label: "Spanish" },
  { key: "japanese", label: "Japanese" },
  { key: "romaji", label: "Romaji" },
  { key: "annotation", label: "Annotation" },
]

interface LyricLineFieldProps {
  onRemove: () => void
  defaultExpanded?: boolean
}

export function LyricLineField(p: LyricLineFieldProps) {
  const [isExpanded, setIsExpanded] = useState(p.defaultExpanded ?? false)
  const currentTime = useSongPlayerStore(s => s.currentTime)
  const field = useFieldContext<LyricLine>()

  const line = field.state.value
  const mainLanguage = line.mainLanguage

  const previewText = mainLanguage ? (line[mainLanguage] ?? null) : null

  return (
    <div className="flex flex-col bg-mist-900 rounded-lg overflow-hidden">

      {/* Header / collapsed view */}
      <div className="flex items-center gap-2 p-3">
        <button
          type="button"
          className={btn({ isIcon: true, theme: "outline", size: "sm" })}
          onClick={() => setIsExpanded(v => !v)}
        >
          {isExpanded ? <CaretUpIcon size={16} /> : <CaretDownIcon size={16} />}
        </button>

        <span className="text-sm tabular-nums text-sky-400 w-16 shrink-0">
          {line.timestamp != null ? `${line.timestamp.toFixed(1)}s` : "—"}
        </span>

        <span className="text-xs truncate flex-1">
          {previewText ?? <span className="italic">empty</span>}
        </span>


        <button
          type="button"
          title="Copy current time"
          className={btn({ isIcon: true, theme: "outline", size: "sm" })}
          onClick={() =>
            field.setValue(v => ({ ...v, timestamp: currentTime }))
          }
        >
          <ClockIcon size={24} />
        </button>

        <button
          type="button"
          title="Reset timestamp"
          className={btn({ isIcon: true, theme: "outline", size: "sm" })}
          onClick={() => field.setValue(v => ({ ...v, timestamp: null }))}
        >
          <ArrowCounterClockwiseIcon size={24} />
        </button>

        <button
          type="button"
          className={btn({ isIcon: true, theme: "danger", size: "sm" })}
          onClick={p.onRemove}
        >
          <TrashIcon size={16} />
        </button>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="flex flex-col gap-3 px-4 pb-4 border-t border-mist-700 pt-3">

          {/* Timestamp */}
          <div className={fieldContainer()}>
            <p>Timestamp</p>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                step={0.1}
                min={0}
                value={line.timestamp ?? ""}
                onChange={e =>
                  field.setValue(v => ({
                    ...v,
                    timestamp: e.target.value === "" ? null : +e.target.value,
                  }))
                }
                className={styleInput({ className: "flex-1" })}
              />

              <button
                type="button"
                title="Copy current time"
                className={btn({ isIcon: true, theme: "outline" })}
                onClick={() =>
                  field.setValue(v => ({ ...v, timestamp: currentTime }))
                }
              >
                <ClockIcon size={24} />
              </button>

              <button
                type="button"
                title="Reset timestamp"
                className={btn({ isIcon: true, theme: "outline" })}
                onClick={() => field.setValue(v => ({ ...v, timestamp: null }))}
              >
                <ArrowCounterClockwiseIcon size={24} />
              </button>
            </div>
          </div>

          {/* Text fields */}
          {textFields.map(({ key, label }) => (
            <div key={key} className={fieldContainer()}>
              <div className="flex items-center justify-between">
                <p>{label}</p>
                <label className="flex items-center gap-1 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name={field.name}
                    value={key}
                    checked={mainLanguage === key}
                    onChange={() =>
                      field.setValue(v => ({ ...v, mainLanguage: key }))
                    }
                    className="accent-sky-500"
                  />
                  <span>Primary</span>
                </label>
              </div>

              <input
                type="text"
                value={line[key] ?? ""}
                onChange={e =>
                  field.setValue(v => ({
                    ...v,
                    [key]: e.target.value === "" ? null : e.target.value,
                  }))
                }
                placeholder={label}
                className={styleInput()}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
