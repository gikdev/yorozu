import type { ReactNode } from 'react'

export const Show = (p: { if: boolean; children: ReactNode }) =>
  p.if ? p.children : null
