import { useState } from "react"

interface ConsumptionCardImageProps {
  src?: string | null
  fallbackLetter: string
  alt?: string
}

export function ConsumptionCardImage(p: ConsumptionCardImageProps) {
  const [hasError, setHasError] = useState(false)

  if (!p.src || hasError) {
    return (
      <div className="w-24 h-32 flex items-center justify-center bg-mist-800 rounded-none text-mist-400 text-3xl font-bold select-none">
        {p.fallbackLetter.charAt(0).toUpperCase()}
      </div>
    )
  }

  return (
    <img
      className="w-24 h-32 rounded-none object-cover"
      src={p.src}
      alt={p.alt ?? ""}
      onError={() => setHasError(true)}
    />
  )
}
