import { btn } from "#/common/atoms/btn"
import { styleInput } from "#/common/atoms/input"
import { AppShell } from "#/common/molecules/AppShell"
import {
  PageHeader,
  PageHeaderBackButton,
} from "#/common/molecules/page-header"
import { TerminalIcon } from "@phosphor-icons/react"
import { createFileRoute, linkOptions } from "@tanstack/react-router"
import { useState } from "react"
import { commandRegistry } from "./-cli/commandRegistry"
import toast from "react-hot-toast"
import { addNewContentItemCommand } from "./-cli/commands/addNewContentItemCommand"
import { useMutation } from "@tanstack/react-query"
import { createContentItemMutation } from "#/common/api/client"
import { extractErrorMessage } from "#/common/helpers/errors"

export const Route = createFileRoute("/apps/hondana/cli")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AppShell>
      <PageHeader
        title="CLI"
        left={
          <PageHeaderBackButton to={linkOptions({ to: "/apps/hondana" }).to} />
        }
      />
      <main className="flex-1 flex flex-col gap-4 p-4 overflow-y-auto min-h-0 font-mono">
        <MiniCli />
      </main>
    </AppShell>
  )
}

function MiniCli() {
  const [input, setInput] = useState("")

  const cciM = useMutation(createContentItemMutation())

  const handleAddNewContentItemCommand = (result: any) => {
    toast.promise(
      cciM.mutateAsync({
        body: {
          format: result.format,
          fullTitle: result.title,
        },
      }),
      {
        loading: `Adding "${result.title}"...`,
        error: err => extractErrorMessage(err),
        success: () => {
          setInput("") // clear input on success
          return `"${result.title}" added successfully!`
        },
      },
    )
  }

  const handleClick = () => {
    const command = commandRegistry.find(cmd => cmd.isItThisCommand(input))
    if (!command) return void toast.error("Unknown command")

    const result = command.parse(input)
    if (!result.isSuccess) return void toast.error(result.errorMsg)

    if (command.code === addNewContentItemCommand.code) {
      handleAddNewContentItemCommand(result.result)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full gap-2 flex-1">
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        className={styleInput({
          isMultiline: true,
          className: "w-full min-h-40",
        })}
      />
      <button
        className={btn({
          theme: "primary",
          className: "justify-between w-full",
        })}
        onClick={handleClick}
      >
        <span>Run</span>
        <TerminalIcon size={24} />
      </button>
    </div>
  )
}
