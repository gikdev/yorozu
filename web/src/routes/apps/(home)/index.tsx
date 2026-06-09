import { createFileRoute } from "@tanstack/react-router"
import { version } from "#/app/data/version.json"
import { appShortcuts } from "./-appShortcuts"
import { AppShortcut } from "./-AppShortcut"
import { header } from "#/common/atoms/header"
import { fullPage } from "#/common/atoms/full-page"
import { phonePage } from "#/common/atoms/phone-page"

export const Route = createFileRoute("/apps/(home)/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className={fullPage()}>
      <div className={phonePage()}>
        <header className={header()}>
          <img src="/yorozu.png" className="size-10 rounded-md" />

          <p className="gap-1 items-center flex">
            <span className="text-lg sm:text-2xl font-bold text-sky-500 dark:text-sky-500">
              Yorozu
            </span>

            <sup>v{version}</sup>
          </p>
        </header>

        <main className="flex flex-wrap justify-center py-4 px-8">
          {appShortcuts.map(shortcut => (
            <AppShortcut shortcut={shortcut} key={shortcut.id} />
          ))}
        </main>
      </div>
    </div>
  )
}
