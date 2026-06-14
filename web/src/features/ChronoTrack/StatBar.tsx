// ─────────────────────────────────────────────────────────────────────────────
// ChronoTrack — StatBar
// ─────────────────────────────────────────────────────────────────────────────

import styles from "./ChronoTrack.module.css"

interface Props {
  label: string
  value: string
  accentVar: string
  sessionCount: number
}

export function StatBar({ label, value, accentVar, sessionCount }: Props) {
  return (
    <div
      className={styles.statBar}
      style={{ "--accent": `var(${accentVar})` } as React.CSSProperties}
    >
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statCount}>
        {sessionCount} session{sessionCount !== 1 ? "s" : ""}
      </span>
    </div>
  )
}
