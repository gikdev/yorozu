import type { PropsWithChildren } from 'react'

export const AppShell = (p: PropsWithChildren) => (
  <div className='h-dvh flex flex-col overflow-hidden bg-mist-950 text-mist-400 max-w-160 mx-auto w-full'>
    {p.children}
  </div>
)
