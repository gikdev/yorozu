import {
  BookmarkIcon,
  CalendarCheckIcon,
  CardsIcon,
  ChalkboardTeacherIcon,
  ChatIcon,
  ClipboardIcon,
  CoinIcon,
  CubeFocusIcon,
  FolderIcon,
  GearIcon,
  KanbanIcon,
  ListChecksIcon,
  MicrophoneIcon,
  MusicNoteIcon,
  NotebookIcon,
  PasswordIcon,
  PencilIcon,
  QrCodeIcon,
  SmileyIcon,
  TimerIcon,
  UserIcon,
  VideoIcon,
} from '@phosphor-icons/react'
import { linkOptions } from '@tanstack/react-router'
import type { IAppShortcut } from './-IAppShortcut'

export const appShortcuts: IAppShortcut[] = [
  {
    id: 'phrase-player',
    name: 'Phrase Player',
    icon: MusicNoteIcon,
    url: linkOptions({ to: '/apps/phrase-player' }).to,
    type: 'MVP',
    description: 'A music with phrases player',
  },
  {
    id: 'spotlight',
    name: 'Spotlight',
    icon: CubeFocusIcon,
    url: linkOptions({ to: '/apps/spotlight' }).to,
    type: 'APP',
    description:
      'A minimal commitment device that asks what you want to do right now, then displays that single task in large text on screen with only three choices—cancel, edit, done—to kill multitasking and force singular focus.',
  },
  {
    id: 'time-log',
    name: 'Time Log',
    icon: TimerIcon,
    url: linkOptions({ to: '/apps/time-log' }).to,
    type: 'APP',
    description:
      'A dead-simple work focus timer with one big play/pause button; start a session, stop it, and at the end of the day see exactly how many focused sessions you had and total raw work time — nothing more.',
  },
  {
    id: 'choice',
    name: 'Choice',
    icon: ListChecksIcon,
    url: linkOptions({ to: '/apps/choice' }).to,
    type: 'MVP',
    description:
      'A decision-making tool that uses pairwise comparisons to help you pick a single winner or rank an entire list, eliminating choice paralysis.',
  },
  {
    id: 'kanban',
    name: 'Kanban',
    icon: KanbanIcon,
    url: linkOptions({ to: '/apps/kanban' }).to,
    type: 'MVP',
    description:
      'A lightweight, no-frills kanban board for storing all tasks related to a specific project, with nothing more than a title and a status.',
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    icon: PasswordIcon,
    type: 'TOOL',
    url: linkOptions({ to: '/apps/password-generator' }).to,
    description: 'Quickly generate passwords.',
  },
  {
    id: 'qr-generator',
    name: 'QR Generator',
    icon: QrCodeIcon,
    type: 'TOOL',
    url: linkOptions({ to: '/apps/qr-generator' }).to,
    description: 'Generate QR codes.',
  },
  {
    id: 'video-player',
    name: 'Video Player',
    icon: VideoIcon,
    type: 'TOOL',
    url: linkOptions({ to: '/apps/video-player' }).to,
    description: 'Play videos from URLs or files with a great video player!',
  },
  {
    id: 'voice-notes',
    name: 'Voice Notes',
    icon: MicrophoneIcon,
    type: 'TOOL',
    url: linkOptions({ to: '/apps/voice-notes' }).to,
    description: 'Take notes with your voice.',
  },
  {
    id: 'writing',
    name: 'Writing Area',
    icon: PencilIcon,
    type: 'MVP',
    url: linkOptions({ to: '/apps/writing-area' }).to,
    description:
      'A full-screen, distraction-free text area that saves automatically to local storage, with selectable fonts, themes, font sizing, word wrap, and file open/save — so you can write comfortably in any language or mood.',
  },
  {
    id: 'bookmarks',
    name: 'Bookmarks',
    icon: BookmarkIcon,
    type: 'IDEA',
    url: linkOptions({ to: '.' }).to,
    description:
      'A fast, visual bookmark manager with quick access, color coding, and flexible organization via folders and/or tags.',
  },
  {
    id: 'checklists',
    name: 'Checklists',
    icon: ClipboardIcon,
    type: 'IDEA',
    url: linkOptions({ to: '.' }).to,
    description:
      'A reusable, stateful checklist tool for repeatable processes, with optional items, notes, cloning, sharing, and beautiful printable output.',
  },
  {
    id: 'contacts',
    name: 'Contacts',
    icon: UserIcon,
    type: 'IDEA',
    url: linkOptions({ to: '.' }).to,
    description:
      'A curated, rich contact manager designed for the people who matter—more detailed than a phone’s address book, with quick-access shortcuts, relationship reminders, and mixed-language name support.',
  },
  {
    id: 'expense',
    name: 'Expense',
    icon: CoinIcon,
    type: 'IDEA',
    url: linkOptions({ to: '.' }).to,
    description:
      'A personal finance tool that uses a fictional internal currency to avoid real-world decimal headaches, tracks debt and assets, charts net wealth over time, and optionally captures emotional context around spending.',
  },
  {
    id: 'file-manager',
    name: 'Files',
    icon: FolderIcon,
    type: 'IDEA',
    url: linkOptions({ to: '.' }).to,
    description:
      'A centralized file storage and metadata service that lets you upload files once, tag and describe them, then reference them by unique ID from any other app (Music Library, Notebooks, etc.) — eliminating duplicate uploads and scattered file handling.',
  },
  {
    id: 'habits',
    name: 'Habit Tracker',
    icon: CalendarCheckIcon,
    type: 'IDEA',
    url: linkOptions({ to: '.' }).to,
    description:
      'A minimal habit tracker that distinguishes between done, intentionally skipped (couldn’t do it), simplified (did a lighter version), and forgotten — plus a dense printable report for reflection.',
  },
  {
    id: 'mood',
    name: 'Mood Tracker',
    icon: SmileyIcon,
    type: 'IDEA',
    url: linkOptions({ to: '.' }).to,
    description:
      'A granular mood tracker that goes far beyond happy/sad, capturing over 40 specific feelings along with detailed context (where, with whom, time, food) to uncover hidden emotional patterns for therapy and self-understanding.',
  },
  {
    id: 'note-cards',
    name: 'Note Cards',
    icon: CardsIcon,
    type: 'IDEA',
    url: linkOptions({ to: '.' }).to,
    description:
      'A digital collector for anything you’re learning (kanji, phrases, concepts, vocabulary), with a standout feature: select 16 cards and print a clean sheet of physical cards — front side only, each with a lookup ID, so you can study offline without worrying about double-sided alignment.',
  },
  {
    id: 'notebooks',
    name: 'Notebooks',
    icon: NotebookIcon,
    type: 'IDEA',
    url: linkOptions({ to: '.' }).to,
    description:
      'A digital notebook system that mimics a physical bookshelf — stacked, colorful notebooks containing folders and infinite pages — supporting rich content (text, drawings, embeds, code, file uploads) with optional PDF export.',
  },
  {
    id: 'prompts',
    name: 'Prompt Manager',
    icon: ChatIcon,
    type: 'IDEA',
    url: linkOptions({ to: '.' }).to,
    description:
      'A prompt library where you save reusable prompt templates with placeholders, fill the form with specific values, and instantly get the completed prompt to copy and send to an AI — no manual edits or repeated clarifications.',
  },
  {
    id: 'teaching-platform',
    name: 'Teaching Platform',
    icon: ChalkboardTeacherIcon,
    type: 'IDEA',
    url: linkOptions({ to: '.' }).to,
    description:
      "A learning platform that combines courses, an exercise/project library, and a linear roadmap that sequences everything into a clear path — eliminating the 'what do I learn next?' confusion that plagues self-taught developers.",
  },
  {
    id: 'settings',
    url: linkOptions({ to: '.' }).to,
    name: 'Settings',
    icon: GearIcon,
    type: 'IDEA',
    description:
      'The global settings for Yorozu. Might include stuff like: account, data import/export, language, theme, preferences, etc.',
  },
]
