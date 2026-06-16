import type { ContentUnitSpecRto, Genre } from "#/common/api/client"
import {
  TagSimpleIcon,
  AirplayIcon,
  QueueIcon,
  SquaresFourIcon,
  CaretUpIcon,
  CaretDownIcon,
} from "@phosphor-icons/react"
import { contentItemFormatIconMap } from "../contentItemFormatIconMap"
import { btn } from "#/common/atoms/btn"
import { tv } from "tailwind-variants"
import { Activity, useState } from "react"
import { IconChip } from "./IconChip"

const styleChipsContainer = tv({ base: "flex flex-wrap gap-1 justify-center" })
const styleChipsContainersContainer = tv({ base: "flex flex-col gap-2" })

interface ChipsSectionProps {
  format: "Readable" | "Listenable" | "Mixed" | "Watchable"
  tags: string[]
  genres: Genre[]
  unitSpec: ContentUnitSpecRto | null
}

export function ChipsSection(p: ChipsSectionProps) {
  const [showsMore, setShowsMore] = useState(false)
  const CaretIcon = showsMore ? CaretUpIcon : CaretDownIcon
  const FormatIcon = contentItemFormatIconMap[p.format]

  return (
    <div className={styleChipsContainersContainer()}>
      <div className={styleChipsContainer()}>
        <IconChip icon={FormatIcon} label={p.format} />

        {p.unitSpec?.isOngoing && (
          <IconChip icon={AirplayIcon} label="Ongoing" />
        )}

        {p.unitSpec && (
          <IconChip
            icon={QueueIcon}
            label={`${p.unitSpec.totalUnits || "??"} ${p.unitSpec.unitType}`}
          />
        )}
      </div>

      <Activity mode={showsMore ? "visible" : "hidden"}>
        <div className={styleChipsContainer()}>
          {p.genres.map(g => (
            <IconChip key={g} label={g} icon={SquaresFourIcon} />
          ))}
        </div>

        <div className={styleChipsContainer()}>
          {p.tags.map(t => (
            <IconChip key={t} label={t} icon={TagSimpleIcon} />
          ))}
        </div>
      </Activity>

      <button
        className={btn({ size: "sm", className: "mx-auto" })}
        onClick={() => setShowsMore(p => !p)}
      >
        <CaretIcon size={16} />
      </button>
    </div>
  )
}
