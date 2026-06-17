import { ContentItemFormat } from "#/common/api/client"
import type { ICliCommand } from "../CliCommand"

export const addNewContentItemCommand: ICliCommand<{
  title: string
  format: ContentItemFormat
}> = {
  code: "anci",
  title: "Add New Content Item",
  description: `...`,
  isItThisCommand: input => input.startsWith("anci:"),
  parse(rawInput) {
    // Everything after the first ":"
    const afterCommand = rawInput.slice(rawInput.indexOf(":") + 1)

    // Find the **last** occurrence of "#" to split title from format
    const lastHashIndex = afterCommand.lastIndexOf("#")
    if (lastHashIndex === -1) {
      return {
        isSuccess: false,
        errorMsg: `Missing '#format'. Expected something like: anci:Title#w`,
      }
    }

    const title = afterCommand.slice(0, lastHashIndex).trim()
    const formatStr = afterCommand
      .slice(lastHashIndex + 1)
      .trim()
      .toLowerCase()

    if (!title) {
      return { isSuccess: false, errorMsg: "Title cannot be empty." }
    }

    const formatMap: Record<string, ContentItemFormat> = {
      w: ContentItemFormat.WATCHABLE,
      r: ContentItemFormat.READABLE,
      l: ContentItemFormat.LISTENABLE,
      m: ContentItemFormat.MIXED,
    }

    const format = formatMap[formatStr]
    if (!format) {
      return {
        isSuccess: false,
        errorMsg: `Unknown format '${formatStr}'. Use w, r, l, or m.`,
      }
    }

    return { isSuccess: true, result: { title, format } }
  },
}
