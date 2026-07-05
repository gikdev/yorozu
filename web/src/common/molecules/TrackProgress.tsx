interface ConsumptionCardProgressProps {
  /** Current value */
  current: number

  /** Total value, if null, it means it's ongoing */
  total: number | null

  /** Name of a unit... e.g. `Episode`, or `Page` */
  unit: string

  /** Plural name of a unit... e.g. `episodes`, or `pages` */
  units: string
}

export function TrackProgress(p: ConsumptionCardProgressProps) {
  // Airing mode
  if (p.total == null) {
    return (
      <div className='flex flex-col gap-1'>
        <div className='flex items-center gap-2 text-xs'>
          <span className='relative flex h-2 w-2'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75' />
            <span className='relative inline-flex rounded-full h-2 w-2 bg-sky-500' />
          </span>
          <span className='text-sky-400 font-bold'>Ongoing</span>
        </div>
        <p className='text-xs'>
          {p.unit} {p.current}
        </p>
      </div>
    )
  }

  // Normal mode
  const percent = Math.round((p.current / p.total) * 100)
  const barWidth = `${percent}%`

  return (
    <div className='flex flex-col gap-1'>
      <div className='bg-mist-800 rounded-sm h-2'>
        <div
          className='h-full bg-sky-500 rounded-sm transition-all duration-300'
          style={{ width: barWidth }}
        />
      </div>
      <p className='flex items-center justify-between text-xs'>
        <span>
          {p.current} / {p.total} {p.units}
        </span>
        <span className='font-bold text-sky-500'>{percent}%</span>
      </p>
    </div>
  )
}
