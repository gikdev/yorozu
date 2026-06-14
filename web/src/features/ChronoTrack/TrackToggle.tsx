// ─────────────────────────────────────────────────────────────────────────────
// ChronoTrack — TrackToggle
// Large pill toggle with a live elapsed timer.
// ─────────────────────────────────────────────────────────────────────────────

import { formatDuration } from "./types"
import styles from "./ChronoTrack.module.css"

interface Props {
  label: string
  description: string
  isOn: boolean
  onToggle: () => void
  liveMs: number
  accentVar: string
  disabled?: boolean
  disabledReason?: string
}

export function TrackToggle({
  label,
  description,
  isOn,
  onToggle,
  liveMs,
  accentVar,
  disabled = false,
  disabledReason,
}: Props) {
  return (
    <div
      className={`${styles.toggleCard} ${isOn ? styles.toggleCardOn : ""} ${
        disabled ? styles.toggleCardDisabled : ""
      }`}
      style={{ "--accent": `var(${accentVar})` } as React.CSSProperties}
      title={disabled ? disabledReason : undefined}
    >
      <div className={styles.toggleInfo}>
        <span className={styles.toggleLabel}>{label}</span>
        <span className={styles.toggleDesc}>{description}</span>
        {isOn && (
          <span className={styles.toggleTimer}>{formatDuration(liveMs)}</span>
        )}
      </div>

      <button
        className={`${styles.toggleSwitch} ${isOn ? styles.toggleSwitchOn : ""}`}
        onClick={disabled ? undefined : onToggle}
        role="switch"
        aria-checked={isOn}
        aria-disabled={disabled}
        aria-label={`${label} toggle`}
      >
        <span className={styles.toggleThumb} />
      </button>

      {isOn && <span className={styles.pulseDot} />}
    </div>
  )
}
