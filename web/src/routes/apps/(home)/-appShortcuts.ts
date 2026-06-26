import {
  BooksIcon,
  FileAudioIcon,
  KanbanIcon,
  ListChecksIcon,
  BookmarkIcon,
  ClipboardIcon,
  UserIcon,
  CalendarCheckIcon,
  CardsIcon,
  SmileyIcon,
  MusicNotesIcon,
  NotebookIcon,
  ChatIcon,
  PencilIcon,
  TimerIcon,
  CubeFocusIcon,
  CoinIcon,
  FolderIcon,
  ChalkboardTeacherIcon,
  GearIcon,
} from "@phosphor-icons/react"
import type { IAppShortcut } from "./-IAppShortcut"
import { linkOptions } from "@tanstack/react-router"

export const appShortcuts: IAppShortcut[] = [
  {
    id: "hondana",
    name: "本棚",
    icon: BooksIcon,
    url: linkOptions({ to: "/apps/hondana" }).to,
    type: "APP",
  },
  {
    id: "spotlight",
    name: "Spotlight",
    icon: CubeFocusIcon,
    url: linkOptions({ to: "/apps/spotlight" }).to,
    type: "APP",
  },
  {
    id: "time-log",
    name: "Time Log",
    icon: TimerIcon,
    url: linkOptions({ to: "/apps/time-log" }).to,
    type: "APP",
  },

  {
    id: "choice",
    name: "Choice",
    icon: ListChecksIcon,
    url: linkOptions({ to: "/apps/choice" }).to,
    type: "MVP",
  },
  {
    id: "kanban",
    name: "Kanban",
    icon: KanbanIcon,
    url: linkOptions({ to: "/apps/kanban" }).to,
    type: "MVP",
  },
  {
    id: "lyrics",
    name: "Lyrics",
    icon: FileAudioIcon,
    url: linkOptions({ to: "/apps/lyrics" }).to,
    type: "MVP",
  },
  {
    id: "writing",
    name: "Writing Area",
    icon: PencilIcon,
    type: "MVP",
    url: linkOptions({ to: "/apps/writing-area" }).to,
  },

  {
    id: "bookmarks",
    name: "Bookmarks",
    icon: BookmarkIcon,
    type: "IDEA",
    description:
      "A fast, visual bookmark manager with quick access, color coding, and flexible organization via folders and/or tags.",
  },
  {
    id: "checklists",
    name: "Checklists",
    icon: ClipboardIcon,
    type: "IDEA",
    description:
      "A reusable, stateful checklist tool for repeatable processes, with optional items, notes, cloning, sharing, and beautiful printable output.",
  },
  {
    id: "contacts",
    name: "Contacts",
    icon: UserIcon,
    type: "IDEA",
    description:
      "A curated, rich contact manager designed for the people who matter—more detailed than a phone’s address book, with quick-access shortcuts, relationship reminders, and mixed-language name support.",
  },
  {
    id: "expense",
    name: "Expense",
    icon: CoinIcon,
    type: "IDEA",
    description:
      "A personal finance tool that uses a fictional internal currency to avoid real-world decimal headaches, tracks debt and assets, charts net wealth over time, and optionally captures emotional context around spending.",
  },
  {
    id: "file-manager",
    name: "Files",
    icon: FolderIcon,
    type: "IDEA",
    description:
      "A centralized file storage and metadata service that lets you upload files once, tag and describe them, then reference them by unique ID from any other app (Music Library, Notebooks, etc.) — eliminating duplicate uploads and scattered file handling.",
  },
  {
    id: "habits",
    name: "Habit Tracker",
    icon: CalendarCheckIcon,
    type: "IDEA",
    description:
      "A minimal habit tracker that distinguishes between done, intentionally skipped (couldn’t do it), simplified (did a lighter version), and forgotten — plus a dense printable report for reflection.",
  },
  {
    id: "mood",
    name: "Mood Tracker",
    icon: SmileyIcon,
    type: "IDEA",
    description:
      "A granular mood tracker that goes far beyond happy/sad, capturing over 40 specific feelings along with detailed context (where, with whom, time, food) to uncover hidden emotional patterns for therapy and self-understanding.",
  },
  {
    id: "music",
    name: "Music Library",
    icon: MusicNotesIcon,
    type: "IDEA",
    description:
      "A self-hosted music library that combines standard player features with a powerful lyrics engine: enter time-stamped, multilingual lyrics (with translations), mark favorite lines, skip instrumental sections, and export lyrics as printable PDFs.",
  },
  {
    id: "note-cards",
    name: "Note Cards",
    icon: CardsIcon,
    type: "IDEA",
    description:
      "A digital collector for anything you’re learning (kanji, phrases, concepts, vocabulary), with a standout feature: select 16 cards and print a clean sheet of physical cards — front side only, each with a lookup ID, so you can study offline without worrying about double-sided alignment.",
  },
  {
    id: "notebooks",
    name: "Notebooks",
    icon: NotebookIcon,
    type: "IDEA",
    description:
      "A digital notebook system that mimics a physical bookshelf — stacked, colorful notebooks containing folders and infinite pages — supporting rich content (text, drawings, embeds, code, file uploads) with optional PDF export.",
  },
  {
    id: "prompts",
    name: "Prompt Manager",
    icon: ChatIcon,
    type: "IDEA",
    description:
      "A prompt library where you save reusable prompt templates with placeholders, fill the form with specific values, and instantly get the completed prompt to copy and send to an AI — no manual edits or repeated clarifications.",
  },
  {
    id: "teaching-platform",
    name: "Teaching Platform",
    icon: ChalkboardTeacherIcon,
    type: "IDEA",
    description:
      "A learning platform that combines courses, an exercise/project library, and a linear roadmap that sequences everything into a clear path — eliminating the 'what do I learn next?' confusion that plagues self-taught developers.",
  },

  {
    id: "settings",
    name: "Settings",
    icon: GearIcon,
    type: "IDEA",
    description:
      "The global settings for Yorozu. Might include stuff like: account, data import/export, language, theme, preferences, etc.",
  },
]
