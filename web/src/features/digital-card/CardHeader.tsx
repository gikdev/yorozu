import { useContentT } from "./useContentT"

export function CardHeader() {
  const fullName = useContentT("fullName")
  const nickname = useContentT("nickname")
  const tagline = useContentT("tagline")
  const description = useContentT("description")

  return (
    <div className="flex flex-col items-center p-4 text-center gap-2">
      <img
        src="/digital-card/me.png"
        alt={fullName}
        className="w-24 h-24 rounded-full border-2 border-sky-500 object-cover"
      />

      <div>
        <h1 className="text-xl font-medium text-mist-100">{fullName}</h1>
        <p className="text-sky-400">{nickname}</p>
      </div>

      <p className="text-mist-400 leading-relaxed">{tagline}</p>

      <p className="text-xs text-mist-500 leading-relaxed max-w-xs">
        {description}
      </p>
    </div>
  )
}
