import { btn } from "#/common/atoms/btn"
import { useAppForm } from "#/common/forms"
import { PlusIcon } from "@phosphor-icons/react"
import { v4 as uuidv4 } from "uuid"
import {
  emptyLyricLine,
  emptyLyricLinesFormValues,
  lyricLinesFormSchema,
  type LyricLinesFormValues,
} from "./LyricLinesFormSchema"
import { saveLyricLines } from "./useLyricLinesFormStorage"
import { useEffect, useState } from "react"
import { styleInput } from "#/common/atoms/input"
import toast from "react-hot-toast"
import { extractErrorMessage } from "#/common/helpers/errors"

const sortByTimestamp = (lines: LyricLinesFormValues["lines"]) =>
  [...lines].sort((a, b) => {
    if (a.timestamp === null) return 1
    if (b.timestamp === null) return -1
    return a.timestamp - b.timestamp
  })

type LyricLinesFormProps =
  | {
      mode: "CREATE"
      onSubmit: (values: LyricLinesFormValues) => Promise<void>
    }
  | {
      mode: "EDIT"
      initialValues: LyricLinesFormValues
      onSubmit: (values: LyricLinesFormValues) => Promise<void>
    }

export function LyricLinesForm(p: LyricLinesFormProps) {
  const [expandedNewId, setExpandedNewId] = useState<string | null>(null)

  const form = useAppForm({
    defaultValues:
      p.mode === "EDIT" ? p.initialValues : emptyLyricLinesFormValues,
    validators: {
      onSubmit: lyricLinesFormSchema,
    },
    listeners: {
      onChange: p => saveLyricLines(p.formApi.state.values),
    },
    async onSubmit({ value }) {
      await p.onSubmit(value)
    },
  })

  const handleAddLine = () => {
    const current = form.getFieldValue("lines")
    const newLine = { ...emptyLyricLine(), tempId: uuidv4() }
    setExpandedNewId(newLine.tempId)
    form.setFieldValue("lines", sortByTimestamp([...current, newLine]))
  }

  const handleRemoveLine = (index: number) => {
    const current = form.getFieldValue("lines")
    form.setFieldValue(
      "lines",
      current.filter((_, i) => i !== index),
    )
  }

  return (
    <form.AppForm>
      <div className="flex flex-col gap-4">
        <form.Subscribe selector={state => state.values.lines}>
          {lines =>
            lines.map((line, index) => (
              <form.AppField key={line.tempId} name={`lines[${index}]`}>
                {field => (
                  <field.LyricLineField
                    onRemove={() => handleRemoveLine(index)}
                    defaultExpanded={line.tempId === expandedNewId}
                  />
                )}
              </form.AppField>
            ))
          }
        </form.Subscribe>

        <button
          type="button"
          className={btn({ theme: "outline" })}
          onClick={handleAddLine}
        >
          <PlusIcon size={20} />
          <span>Add Line</span>
        </button>

        <form.Subscribe selector={s => s.values}>
          {values => (
            <RawJsonEditor
              values={values}
              onApply={parsed => form.setFieldValue("lines", parsed.lines)}
            />
          )}
        </form.Subscribe>

        <form.SimpleSubmitBtn
          className={btn({ theme: "primary" })}
          title="Export JSON"
        />
      </div>
    </form.AppForm>
  )
}

function RawJsonEditor(p: {
  values: LyricLinesFormValues
  onApply: (values: LyricLinesFormValues) => void
}) {
  const [raw, setRaw] = useState(JSON.stringify(p.values, null, 2))

  useEffect(() => {
    setRaw(JSON.stringify(p.values, null, 2))
  }, [p.values])

  return (
    <div className="flex flex-col gap-2">
      <textarea
        className={styleInput({ isMultiline: true, class: "font-mono" })}
        value={raw}
        rows={10}
        onChange={e => setRaw(e.target.value)}
      />
      <button
        type="button"
        className={btn({ theme: "outline", size: "sm", className: "self-end" })}
        onClick={() => {
          try {
            const parsed = JSON.parse(raw)
            p.onApply({ ...parsed, lines: sortByTimestamp(parsed.lines) })
          } catch (err) {
            toast.error(extractErrorMessage(err))
          }
        }}
      >
        Apply
      </button>
    </div>
  )
}
