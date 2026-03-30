import { btn } from "#/common/atoms/btn"
import { PlusCircleIcon } from "@phosphor-icons/react"
import { Link } from "@tanstack/react-router"

export const CreateNewTodoFab = () => (
  <Link
    to="/apps/todos/todos/new"
    className={btn({
      className: "fixed bottom-6 right-6",
      isIcon: true,
      theme: "primary",
    })}
  >
    <PlusCircleIcon weight="fill" size={24} />
  </Link>
)
