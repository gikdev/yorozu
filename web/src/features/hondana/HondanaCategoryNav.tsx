import { BookOpenIcon, ListChecksIcon } from "@phosphor-icons/react"
import { CompactNavLink } from "#/common/molecules/CompactNavLink"

export const HondanaCategoryNav = () => (
  <section className="flex flex-wrap gap-2">
    <CompactNavLink
      to="/"
      search={{ q: "" }}
      label="Items"
      icon={BookOpenIcon}
      borderHoverClassName="hover:border-sky-400/40"
      iconClassName="group-hover:text-sky-400"
    />

    <CompactNavLink
      to="/"
      search={{ q: "" }}
      label="Tracks"
      icon={ListChecksIcon}
      borderHoverClassName="hover:border-emerald-400/40"
      iconClassName="group-hover:text-emerald-400"
    />
  </section>
)
