import { createFileRoute } from "@tanstack/react-router"
import { version } from "#/app/data/version.json"
import { appShortcuts } from "./-app-shortcuts"
import { Header } from "./-header"
import { AppShortcut } from "./-app-shortcut"

export const Route = createFileRoute("/(home)/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="bg-slate-200 dark:bg-mist-900 min-h-dvh text-mist-700 dark:text-mist-300 flex flex-col">
      <Header version={version} />

      <main className="flex flex-wrap justify-center py-4 px-8">
        {appShortcuts.map(shortcut => (
          <AppShortcut shortcut={shortcut} key={shortcut.id} />
        ))}
      </main>
    </div>
  )
}
