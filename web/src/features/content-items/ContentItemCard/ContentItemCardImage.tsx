import { useState } from "react"

interface ContentItemCardImageProps {
  src?: string | null
  fallbackLetter: string
  alt?: string
}

export function ContentItemCardImage(p: ContentItemCardImageProps) {
  const [hasError, setHasError] = useState(false)

  if (!p.src || hasError) {
    return (
      <div className="aspect-square rounded-lg w-full flex items-center justify-center bg-mist-800 text-mist-400 text-3xl font-bold select-none">
        {p.fallbackLetter.charAt(0).toUpperCase()}
      </div>
    )
  }

  return (
    <img
      className="aspect-square w-full rounded-lg object-cover"
      src={p.src}
      alt={p.alt ?? ""}
      onError={() => setHasError(true)}
    />
  )
}
