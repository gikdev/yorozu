// ========================
// Date Row
// ========================

export function DateRow({
  label,
  date,
}: {
  label: string
  date: string | null
}) {
  if (!date) return null

  return (
    <div className="flex justify-between items-baseline">
      <dt className="text-mist-400">{label}</dt>
      <dd className="text-mist-200 font-mono text-sm">
        {new Date(date).toLocaleDateString()}
      </dd>
    </div>
  )
}
