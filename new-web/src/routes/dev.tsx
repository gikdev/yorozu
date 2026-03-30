import { btn } from "#/common/atoms/btn"
import { TitledOptionsBottomSheet } from "#/common/organisms/titled-options-bottom-sheet"
import { CheckIcon, EyeIcon } from "@phosphor-icons/react"
import { createFileRoute } from "@tanstack/react-router"
import { useMemo, useState, type ComponentProps } from "react"

export const Route = createFileRoute("/dev")({
  component: RouteComponent,
})

function RouteComponent() {
  const [isOpen, setOpen] = useState(false)

  const optionItems: ComponentProps<
    typeof TitledOptionsBottomSheet
  >["optionItems"] = useMemo(
    () => [
      {
        title: "View Todo",
        Icon: EyeIcon,
        helpText: "View the details of todo",
        onClick: () => console.log("Viewing todo..."),
      },
      {
        title: "Check/Uncheck Todo",
        Icon: CheckIcon,
        helpText: "Check/Uncheck the completion status of todo",
        onClick: () => console.log("Check/Unchecking todo..."),
      },
      {
        title: "Edit Todo",
        onClick: () => console.log("Editing todo..."),
      },
      {
        title: "Delete Todo",
        onClick: () => console.log("Deleting todo..."),
      },
    ],
    [],
  )

  return (
    <div className="bg-mist-900 min-h-dvh text-mist-300 flex flex-col">
      <p>hello world!</p>

      <button className={btn()} onClick={() => setOpen(true)}>
        open!
      </button>

      {isOpen && (
        <TitledOptionsBottomSheet
          title="More Options"
          onClose={() => setOpen(false)}
          optionItems={optionItems}
        />
      )}
    </div>
  )
}
