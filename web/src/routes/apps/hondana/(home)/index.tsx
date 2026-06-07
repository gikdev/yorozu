import { createFileRoute } from "@tanstack/react-router"
import { BottomNav } from "../-common/BottomNav"
import { PageHeader } from "#/common/molecules/page-header"
import { PhonePage } from "#/common/molecules/PhonePage"
import { IntentionTypesTextTab } from "./-IntentionTypesTextTab"
import { MonitorPlayIcon, PlusIcon } from "@phosphor-icons/react"
import { ConsumptionCard } from "#/features/consumption-tracks/ConsumptionCard"

export const Route = createFileRoute("/apps/hondana/(home)/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PhonePage>
      <PageHeader title="本棚" />

      <main className="flex-1 flex flex-col px-4">
        <IntentionTypesTextTab />

        <div className="py-4 flex justify-between items-center text-xs">
          <span>Consumption Tracks</span>
          <span>3 total</span>
        </div>

        <div className="flex flex-col gap-4">
          <ConsumptionTrackItem />
          <ConsumptionTrackItem />
          <ConsumptionTrackItem />
        </div>
      </main>

      <BottomNav activeTabId="home" />
    </PhonePage>
  )
}

function ConsumptionTrackItem() {
  return (
    <div className="flex gap-2 rounded-lg bg-mist-900 border border-mist-800 overflow-clip">
      <img className="w-24 h-32 rounded-none" src="https://animegate.ir/storage/anime/images/2024/10/1a69f7eb-c9a4-491a-98ad-3fc9882c77aa.webp" alt="" />

      <div className="flex-1 flex flex-col justify-between py-2">
<ConsumptionCard
  imageSrc="https://animegate.ir/..."
  imageFallbackLetter="H"
  title="First watch"
  subtitle="本好き S4"
  formatType="watchable"
  current={9}
  total={12}
  onAdd={() => {}}
/>

<ConsumptionCard
  imageSrc={null}
  imageFallbackLetter="S"
  title="Currently watching"
  subtitle="Solo Leveling S2"
  formatType="readable"
  current={5}
  total={null}
  onAdd={() => {}}
/>



        <div className="flex flex-col gap-1">
          <p className="font-bold text-mist-100">First watch</p>

          <p className="text-xs flex gap-1 items-center">
            <MonitorPlayIcon size={16} />
            <span className="">本好き S4</span>
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <div className="bg-mist-800 rounded-sm h-2 flex items-center justify-start">
            <div className="h-full bg-sky-500 w-16 rounded-sm" />
          </div>

          <p className="flex items-center justify-between">
            <span className="">9 / 12 episodes</span>
            <span className="font-bold text-sky-500">75%</span>
          </p>
        </div>
      </div>

      <button className="w-16 h-32 p-4 rounded-none bg-sky-950 flex items-center justify-center text-sky-400 hover:bg-sky-900 hover:text-sky-100 cursor-pointer">
        <PlusIcon size={24} />
      </button>
    </div>
  )
}
