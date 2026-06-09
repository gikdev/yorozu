import type { Content } from "./Content"

interface CardHeaderProps extends Content {}

export function CardHeader(p: CardHeaderProps) {
  return (
    <div className="flex flex-col items-center p-4 text-center gap-2">
      <img
        src="/digital-card/me.png"
        alt="Mohammad Mahdi Bahrami"
        className="w-24 h-24 rounded-full border-2 border-sky-500 object-cover"
      />

      <div>
        <h1 className="text-xl font-medium text-mist-100">{p.fullName}</h1>

        <p className="text-sky-400">{p.nickname}</p>
      </div>

      <p className="text-mist-400 leading-relaxed">{p.tagline}</p>

      <p className="text-xs text-mist-500 leading-relaxed max-w-xs">
        {p.description}
      </p>
    </div>
  )
}
