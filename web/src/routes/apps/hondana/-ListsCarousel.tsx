import { ArrowRightIcon, ListBulletsIcon } from "@phosphor-icons/react"
import { Link } from "@tanstack/react-router"
import { AccentCardLink } from "#/common/molecules/AccentCardLink"
import { CardCarousel } from "#/common/molecules/CardCarousel"
import { fakeListOfLists } from "./-fakeListOfLists"

export function ListsCarousel() {
  return (
    <section className="flex flex-col gap-2">
      <p className="text-mist-100 font-bold text-xl">Lists</p>

      <CardCarousel>
        {fakeListOfLists.map(list => (
          <AccentCardLink
            key={list.id}
            to="/apps/hondana/library"
            search={{ q: "" }}
            title={list.title}
            icon={ListBulletsIcon}
            cardClassName="bg-linear-to-br from-sky-500/20 to-mist-900 border-sky-500/30 hover:border-sky-400/50"
            iconClassName="text-sky-400"
          />
        ))}

        <Link
          to="/apps/hondana/library"
          search={{ q: "" }}
          className="snap-start shrink-0 w-40 grow group flex flex-col items-center justify-center gap-1 rounded-xl p-4 h-24 border border-mist-800 hover:border-sky-400/50 transition-colors text-mist-500 hover:text-sky-400"
        >
          <ArrowRightIcon size={24} className="group-hover:translate-x-0.5 transition-transform" />
          <span>See All</span>
        </Link>
      </CardCarousel>
    </section>
  )
}
