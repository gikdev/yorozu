import type { ReactNode } from 'react'

type SuccessProps<T> =
  | {
      isList: false
      item: T
      successView: (item: T) => ReactNode
    }
  | {
      isList: true
      listCount: number
      emptyView: ReactNode
      items: T[]
      fullView: (items: T[]) => ReactNode
    }

function renderSuccess<T>(p: SuccessProps<T>) {
  if (!p.isList) return p.successView(p.item)
  return p.listCount < 1 ? p.emptyView : p.fullView(p.items)
}

type RenderQueryProps<T> = {
  status: 'error' | 'success' | 'pending'
  errorView: ReactNode
  loadingView: ReactNode
} & SuccessProps<T>

export function RenderQuery<T>(p: RenderQueryProps<T>) {
  if (p.status === 'pending') return p.loadingView
  if (p.status === 'error') return p.errorView
  if (p.status === 'success') return renderSuccess(p)
  return null
}
