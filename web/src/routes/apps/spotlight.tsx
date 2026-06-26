import { Spotlight } from "#/features/Spotlight"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import toast from "react-hot-toast"

export const Route = createFileRoute("/apps/spotlight")({
  component: RouteComponent,
})

const LS_KEY = "spotlight:active-item"

function RouteComponent() {
  const navigate = useNavigate()
  const [activeItem, setActiveItem] = useState<string | null>(() =>
    localStorage.getItem(LS_KEY),
  )

  const handleBack = () => navigate({ to: "/apps" })
  const handleCancel = () => {
    localStorage.removeItem(LS_KEY)
    setActiveItem(null)
  }
  const handleStart = (item: string): void => {
    localStorage.setItem(LS_KEY, item)
    setActiveItem(item)
  }
  const handleDone = () => {
    toast.success("お疲れ様！")
    localStorage.removeItem(LS_KEY)
    setActiveItem(null)
  }

  return (
    <>
      <title>Spotlight</title>
      <Spotlight
        activeItem={activeItem}
        onBack={handleBack}
        onCancel={handleCancel}
        onStart={handleStart}
        onDone={handleDone}
      />
    </>
  )
}
