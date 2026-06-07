import { useState } from "react"
import { intentionTypesTabs } from "./-intentionTypesTabs"
import { TextTabs } from "#/common/molecules/text-tabs"

export function IntentionTypesTextTab() {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <TextTabs
      items={intentionTypesTabs}
      activeTabId={activeTab}
      onTabChange={setActiveTab}
    />
  )
}
