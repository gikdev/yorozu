import { BottomNav as BottomNavMolecule } from "#/common/molecules/bottom-nav"
import { bottomNavTabs } from "./bottomNavTabs"

interface BottomNavProps {
  activeTabId: string | null
}

export const BottomNav = (p: BottomNavProps) => (
  <BottomNavMolecule items={bottomNavTabs} activeTabId={p.activeTabId} />
)
