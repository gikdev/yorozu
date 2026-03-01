import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './routing/router'

const TARGET = '#root'

const targetElement = document.querySelector(TARGET)
if (targetElement == null)
  throw new Error(`The element '${TARGET}' was not found!`)

const root = createRoot(targetElement)
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
