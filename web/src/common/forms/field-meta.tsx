import type { AnyFieldMeta } from "@tanstack/react-form"
import { en } from "../i18n/en"

export function FieldMeta({ meta }: { meta: AnyFieldMeta }) {
  const errorMsg = meta.errors.map(e => e?.message).join(", ")

  if (meta.isValidating) {
    return <p className="text-mist-500 text-xs">{en.common.validating}...</p>
  }

  if (!meta.isValid) {
    return <p className="text-red-500 text-xs">{errorMsg}</p>
  }

  return <p>&nbsp;</p>
}
