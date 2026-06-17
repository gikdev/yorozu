import type { ICliCommand } from "./CliCommand"
import { addNewContentItemCommand } from "./commands/addNewContentItemCommand"
import { helpCommand } from "./commands/helpCommand"

export const commandRegistry: ICliCommand<any>[] = [addNewContentItemCommand]

commandRegistry.push(helpCommand)
