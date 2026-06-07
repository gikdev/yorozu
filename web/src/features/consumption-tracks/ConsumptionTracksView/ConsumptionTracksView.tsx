import { ConsumptionCard } from "../ConsumptionCard"
import { IntentionTypesTextTab } from "./IntentionTypesTextTab"

export function ConsumptionTracksView() {
  return (
    <>
      <IntentionTypesTextTab />

      <div className="flex flex-col gap-4">
        <ConsumptionCard
          imageSrc="https://animegate.ir/storage/anime/images/2024/10/1a69f7eb-c9a4-491a-98ad-3fc9882c77aa.webp"
          imageFallbackLetter="本"
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
      </div>
    </>
  )
}
