import { SpotlightActive } from "./SpotlightActive"
import { SpotlightEmpty } from "./SpotlightEmpty"

interface SpotlightProps {
  activeItem: string | null
  onStart: (item: string) => void
  onCancel: () => void
  onDone: () => void
  onBack: () => void
}

export const Spotlight = (p: SpotlightProps) =>
  p.activeItem === null ? (
    <SpotlightEmpty onStart={p.onStart} onBack={p.onBack} />
  ) : (
    <SpotlightActive
      activeItem={p.activeItem}
      onCancel={p.onCancel}
      onDone={p.onDone}
      onBack={p.onBack}
    />
  )
