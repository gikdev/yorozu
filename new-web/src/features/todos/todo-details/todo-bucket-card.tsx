import type { TodoBucket } from "#/common/api/client"
import { SquaresFourIcon } from "@phosphor-icons/react"

interface TodoBucketCardProps {
  bucket: TodoBucket
}

export function TodoBucketCard(p: TodoBucketCardProps) {
  let title = "-"

  switch (p.bucket) {
    case "Uncategorized":
      title = "Uncategorized"
      break
    case "NextActions":
      title = "Next Actions"
      break
    case "Waiting":
      title = "Waiting"
      break
    case "SomedayMaybe":
      title = "Someday/Maybe"
      break
  }

  return (
    <div className="flex flex-col items-center" title={`Bucket: ${title}`}>
      <p className="text-2xl font-bold text-mist-100">{title}</p>

      <p className="flex gap-1 items-center">
        <SquaresFourIcon size={16} />
        <span>Bucket</span>
      </p>
    </div>
  )
}
