import type { ReactNode } from "react"

type SuccessProps = (
  | {
    isList: false
    successView: ReactNode
  }
  | {
    isList: true
    listCount: number
    emptyView: ReactNode
    fullView: ReactNode
  }
)

function renderSuccess(p: SuccessProps) {
  if (!p.isList) return p.successView
  return p.listCount < 1 ? p.emptyView : p.fullView
}

type RenderQueryProps = {
  status: "error" | "success" | "pending"
  errorView: ReactNode
  loadingView: ReactNode
} & SuccessProps

export function RenderQuery(p: RenderQueryProps) {
  if (p.status === "pending") return p.loadingView
  if (p.status === "error") return p.errorView
  return renderSuccess(p)
}
