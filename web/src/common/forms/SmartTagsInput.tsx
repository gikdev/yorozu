import { useFieldContext } from "."
import { fieldContainer } from "../atoms/field-container"
import { btn } from "../atoms/btn"
import { FieldMeta } from "./field-meta"
import {
  ArrowsDownUpIcon,
  PlusIcon,
  XIcon,
} from "@phosphor-icons/react"
import { useState, type ChangeEvent, type KeyboardEvent } from "react"
import { styleInput } from "../atoms/input"
import { BottomSheet } from "../organisms/BottomSheet"

interface SmartTagsInputProps {
  title: string
  allTags: string[]
}

export function SmartTagsInput({ title, allTags }: SmartTagsInputProps) {
  const field = useFieldContext<string[]>()

  const selected = [...(field.state.value ?? [])].sort((a, b) =>
    a.localeCompare(b),
  )
  const hasError = field.state.meta.isTouched && field.state.meta.errors.length > 0

  const addTag = (tag: string) => {
    const trimmed = tag.trim()
    if (!trimmed || selected.includes(trimmed)) return
    field.handleChange([...selected, trimmed])
    field.handleBlur()
  }

  const removeTag = (tag: string) => {
    field.handleChange(selected.filter(t => t !== tag))
    field.handleBlur()
  }

  const handleRawInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const tags = e.target.value
      .split(",")
      .map(t => t.trim().toLowerCase())
      .filter(Boolean)
    field.handleChange([...new Set(tags)])
    field.handleBlur()
  }

  const sortTags = () => {
    field.handleChange([...new Set(selected)].sort((a, b) => a.localeCompare(b)))
    field.handleBlur()
  }

  return (
    <div className={fieldContainer()}>
      {/* ---------- Visible trigger (always shown) ---------- */}
      <BottomSheet.Root>
        <BottomSheet.Trigger
          className={btn({
            theme: hasError ? "danger" : undefined,
            className: "w-full justify-between gap-2",
          })}
        >
          <span className="truncate">{title}</span>
          <span className="text-xs tabular-nums">({selected.length})</span>
        </BottomSheet.Trigger>

        {/* Backdrop (optional, closable) */}
        <BottomSheet.Backdrop closable />

        {/* The tag‑editing UI inside the bottom sheet */}
        <BottomSheet.Container height="h-5/6">
          <BottomSheet.Header title={`Edit ${title}`} />

          <BottomSheet.Content className="flex flex-col gap-3">
            {/* Selected chips */}
            <TagChipList
              tags={selected}
              onRemove={removeTag}
            />

            {/* Input + Add button */}
            <TagInput onAdd={addTag} />

            {/* Suggestions */}
            <TagSuggestionList
              allTags={allTags}
              selected={selected}
              onAdd={addTag}
            />

            {/* Raw textarea + sort */}
            <RawTagsEditor
              selected={selected}
              onChange={handleRawInputChange}
              onSort={sortTags}
            />
          </BottomSheet.Content>
        </BottomSheet.Container>
      </BottomSheet.Root>

      {/* Error message under the trigger */}
      <FieldMeta meta={field.state.meta} />
    </div>
  )
}

// ---------- Sub‑components (kept clean and focused) ----------

/** Grid of removable tag chips */
function TagChipList({
  tags,
  onRemove,
}: {
  tags: string[]
  onRemove: (tag: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2 border border-mist-800 rounded-lg p-2 max-h-40 overflow-y-auto content-start">
      {tags.map(tag => (
        <button
          key={tag}
          type="button"
          onClick={() => onRemove(tag)}
          className={btn({ theme: "glass", size: "sm" })}
        >
          <span>{tag}</span>
          <XIcon size={12} />
        </button>
      ))}
    </div>
  )
}

/** Input field with an "Add" button, supports Enter key */
function TagInput({ onAdd }: { onAdd: (tag: string) => void }) {
  const [input, setInput] = useState("")

  const handleAdd = () => {
    onAdd(input)
    setInput("")
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAdd()
    }
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a tag..."
        className={styleInput({ className: "flex-1" })}
      />
      <button
        type="button"
        onClick={handleAdd}
        className={btn({ isIcon: true, theme: "outline" })}
      >
        <PlusIcon size={24} />
      </button>
    </div>
  )
}

/** List of suggested tags that are not already selected */
function TagSuggestionList({
  allTags,
  selected,
  onAdd,
}: {
  allTags: string[]
  selected: string[]
  onAdd: (tag: string) => void
}) {
  const [query, setQuery] = useState("")
  const suggestions = allTags
    .filter(t => !selected.includes(t) && t.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => a.localeCompare(b))

  return (
    <div className="flex flex-col gap-1">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Filter suggestions..."
        className={styleInput({ className: "w-full" })}
      />
      <div className="flex flex-wrap gap-2 border border-mist-800 rounded-lg p-2 max-h-40 overflow-y-auto">
        {suggestions.map(tag => (
          <button
            key={tag}
            type="button"
            onClick={() => onAdd(tag)}
            className={btn({ size: "sm" })}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}

/** Raw comma‑separated textarea + sort button */
function RawTagsEditor({
  selected,
  onChange,
  onSort,
}: {
  selected: string[]
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  onSort: () => void
}) {
  return (
    <div className="flex flex-col gap-1">
      <textarea
        className={styleInput({ isMultiline: true })}
        value={selected.join(",")}
        onChange={onChange}
        rows={3}
      />
      <button
        type="button"
        onClick={onSort}
        className={btn({ theme: "outline", size: "sm", className: "self-end" })}
      >
        <ArrowsDownUpIcon size={14} />
        <span>Sort</span>
      </button>
    </div>
  )
}
