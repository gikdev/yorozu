import { useState } from 'react'
import { tv } from 'tailwind-variants'

const styleCoverImage = tv({ base: 'w-48 h-72 object-cover rounded-none' })
const styleCoverPlaceholder = tv({
  base: 'w-48 h-72 rounded-none flex items-center justify-center text-6xl font-bold',
})

interface CoverImageProps {
  coverImageUrl: string | null
  placeholderColor: string
  placeholderLetter: string
  title: string
}

export function CoverImage(p: CoverImageProps) {
  const [errored, setErrored] = useState(false)

  if (p.coverImageUrl && !errored) {
    return (
      <img
        src={p.coverImageUrl}
        alt={p.title}
        className={styleCoverImage()}
        onError={() => setErrored(true)}
      />
    )
  }

  return (
    <div
      className={styleCoverPlaceholder()}
      style={{ backgroundColor: p.placeholderColor }}
    >
      {p.placeholderLetter}
    </div>
  )
}
