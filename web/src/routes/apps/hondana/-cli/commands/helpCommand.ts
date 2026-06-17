import type { ICliCommand } from "../CliCommand"
import { commandRegistry } from "../commandRegistry"

export const helpCommand: ICliCommand<string> = {
  code: "help",
  title: "Help",
  description: null,
  isItThisCommand: input => input.startsWith("help:"),
  parse(rawInput) {
    const commandCode = rawInput.slice("help:".length).trim()
    if (!commandCode) {
      return {
        isSuccess: false,
        errorMsg: "Usage: help:<command code>",
      }
    }

    const target = commandRegistry.find(cmd => cmd.code === commandCode)
    if (!target) {
      return {
        isSuccess: false,
        errorMsg: `Unknown command '${commandCode}'.`,
      }
    }

    const description = target.description ?? "No description available."

    return { isSuccess: true, result: description }
  },
}
