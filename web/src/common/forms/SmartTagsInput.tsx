import { useFieldContext } from "."
import { fieldContainer } from "../atoms/field-container"
import { btn } from "../atoms/btn"
import { FieldMeta } from "./field-meta"
import { CaretDownIcon, PlusIcon, XIcon } from "@phosphor-icons/react"
import { useState, type ChangeEvent, type KeyboardEvent } from "react"
import { tv } from "tailwind-variants"
import { styleInput } from "../atoms/input"

const styleCaret = tv({
  base: "transition-transform duration-200",
  variants: {
    open: {
      true: "rotate-180",
    },
  },
})

const styleTagsContainer = tv({
  base: "flex flex-wrap gap-2 border border-mist-800 rounded-lg p-2 h-60 overflow-y-auto content-start justify-start",
})

interface SmartTagsInputProps {
  title: string
  allTags: string[]
}

export function SmartTagsInput(p: SmartTagsInputProps) {
  const field = useFieldContext<string[]>()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")

  const selected = field.state.value ?? []
  const query = input.trim().toLowerCase()

  const addTag = (tag: string) => {
    const trimmed = tag.trim()
    if (!trimmed || selected.includes(trimmed)) return
    field.handleChange([...selected, trimmed])
    field.handleBlur()
    setInput("")
  }

  const removeTag = (tag: string) => {
    field.handleChange(selected.filter(t => t !== tag))
    field.handleBlur()
  }

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag(input)
    }
  }

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const tags = e.target.value
      .split(",")
      .map(t => t.trim().toLowerCase())
      .filter(Boolean)

    field.handleChange([...new Set(tags)])
    field.handleBlur()
  }

  const suggestions = p.allTags.filter(
    t => !selected.includes(t) && t.toLowerCase().includes(query),
  )

  return (
    <div className={fieldContainer()}>
      {/* Header toggle */}
      <button type="button" className={btn()} onClick={() => setOpen(!open)}>
        <span className="me-auto">{p.title}</span>
        <span className="text-xs">({selected.length})</span>
        <CaretDownIcon size={20} className={styleCaret({ open })} />
      </button>

      {open && (
        <div className="flex flex-col gap-3 mt-2">
          {/* Selected chips */}
          <div className={styleTagsContainer()}>
            {selected.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => removeTag(tag)}
                className={btn({ theme: "glass", size: "sm" })}
              >
                <span>{tag}</span>
                <XIcon size={12} />
              </button>
            ))}
          </div>

          {/* Input + add button */}
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              onBlur={field.handleBlur}
              placeholder="Type a tag..."
              className={styleInput({ className: "flex-1" })}
            />
            <button
              type="button"
              onClick={() => addTag(input)}
              className={btn({ isIcon: true, theme: "outline" })}
            >
              <PlusIcon size={24} />
            </button>
          </div>

          {/* Suggestions */}
          <div className={styleTagsContainer()}>
            {suggestions.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => addTag(tag)}
                className={btn({ size: "sm" })}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Raw Input */}
          <textarea
            className={styleInput({ isMultiline: true })}
            value={selected.join(",")}
            onChange={handleTextareaChange}
          />
        </div>
      )}

      <FieldMeta meta={field.state.meta} />
    </div>
  )
}
