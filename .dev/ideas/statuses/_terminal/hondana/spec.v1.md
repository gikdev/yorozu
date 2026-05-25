# 📋 Hondana (本棚) - Domain Specification v1.0

## 1. Purpose
Hondana is a personal, private library manager for all the content you consume: anime, books, courses, podcasts, and more. It tracks *what* you consume, *where* you are in it, *why* you're consuming it (fun, learning, immersion, etc.), and preserves your notes, quotes, and emotional connection to the material. It replaces scattered mental notes, text files, and platform-specific tracking services with a single, calm, offline-first home.

---

## 2. Core Concepts (Ubiquitous Language)

- **Content Item** — Any consumable media (an anime series, a novel, a video course, a podcast). Has a title, type, total length (if known), and optional cover art.
- **Intention Track** — A *reason* you engage with a Content Item. Standard intentions: **Fun**, **Learning**, **Immersion (Animersion)**, **Teaching**, or **Custom**. Each track is independent, with its own progress, status, goals, and optional due dates.
- **Status** — The state of an Intention Track. Values: `PlanToStart`, `InProgress`, `Completed`, `OnHold`, `Dropped`.
- **Goal** — A specific objective attached to an Intention Track. Has a description, a due date, and a completion flag. Multiple goals per track are allowed.
- **Progress** — How many units (episodes, pages, chapters, minutes) you've completed on a specific track. Always ≤ total units if total is defined and the item is not ongoing.
- **Recommendation Inbox** — A separate list for content you might want to watch/read/study later. Items here are *not* in the main library. You can promote a recommendation to a full Content Item when you decide to start.
- **Secret Mode** — A toggle on a Content Item that makes it **completely invisible** throughout the app unless a special unlock action is performed (e.g., entering a PIN, flipping a global reveal switch). When active, the item is hidden from all lists, search, and dashboard.
- **Person** — A real-world individual (author, director, voice actor). Linked to Content Items via a relationship that defines their role.
- **Location** — Where a Content Item is stored: digital file path, URL, or physical place ("Home kitchen shelf"). Multiple locations per item.
- **Note** — A text block attached to a Content Item or a specific Intention Track. Types: General Note, Quote, Phrase, Actionable.
- **Tag** — A freeform label you create (e.g., "Ferdinand-core", "comfort food", "N3 vocab").
- **Genre** — A predefined category (Romance, Comedy, Slice of Life, etc.). Multi-select per item.
- **Heart / Bookmark** — Quick-access flags for favorites and temporary pinned items.
- **Cover Image** — An item can have a primary image and a gallery of additional images. Fallback: a letter + background color if no image is provided.
- **Airing / Ongoing** — A flag for items whose total length is not yet known (e.g., currently airing anime, an ongoing course). Total units can be left blank; progress can still be logged.

---

## 3. Features (Organized by Use Case)

### 3.1 Managing Content Items
- Create, edit, delete a Content Item with: title, type (Anime, Book, Course, Podcast, Other), total units (nullable if ongoing), unit type (Episode, Page, Chapter, Minute, etc.), description, and secret toggle.
- Assign multiple genres and custom tags.
- Add, remove, reorder cover images; designate one as primary.
- Link people to the item with a role (e.g., "Hayao Miyazaki — Director").
- Manage locations: add multiple paths/URLs/physical descriptions with labels.
- Mark an item as **airing/ongoing** — total units can be blank; progress tracking still works.

### 3.2 Intention Tracks, Goals & Progress
- For each Content Item, create multiple independent intention tracks (Fun, Learning, Immersion, etc.).
- Each track has its own status and progress (units completed). Progress cannot exceed total units if total units is set and the item is not ongoing.
- Add one or more **goals** to a track. Each goal has: description, due date, and a completed/not completed flag.
- Update progress via quick +/- buttons or direct input.
- Mark a track as Completed, On Hold, or Dropped; timestamps are recorded automatically.
- View all active tracks in a dashboard, filterable by status, intention, and due date proximity of goals.

### 3.3 Recommendation Inbox
- A **separate list** for content you haven't committed to yet. Does not pollute the main library.
- Add items with minimal fields: title, type, optional link.
- **Promote** a recommendation to a full Content Item when ready. At that point, you choose an initial intention track and status.
- Delete or archive recommendations without touching the main library.

### 3.4 Secret / Private Mode
- Toggle per item: when ON, the item and all its tracks, notes, locations, etc., vanish from every view.
- Unlocking: user-configured method (PIN input, global toggle with confirmation). Once unlocked, secret items appear in a distinct list with a clear indicator.
- Secret items remain hidden during export unless explicitly included.

### 3.5 Discovery & Decision Help
- Filter content by type, genre, tag, intention, status, length, due date.
- Export filtered list (JSON/CSV) to use with external tools or AI conversations.
- Optional future: smart suggestion based on available time/mood.
- The Recommendation Inbox serves as a lightweight "maybe later" collection.

### 3.6 Notes, Quotes & Emotional Preservation
- Add notes to a Content Item generally, or attach a note to a specific intention track.
- Note types: General, Quote, Phrase, Actionable.
- Search and filter notes across the entire library.
- Gradual data entry: most fields optional; UI encourages adding details over time without friction.

### 3.7 Dashboard & Reflection
- Overview of all active tracks, progress bars, upcoming goals (due soon).
- "Year in Review" style stats: total completed, most consumed genres, top creators.
- Gentle visual nudges: cyan glow when on track, amber when approaching a goal's due date.
- Timeline view: when each track started, completed, or was dropped.

### 3.8 Data Ownership, Import & Export
- All data stored locally in a database you control (SQLite via EF Core).
- Full import/export: export entire library or a filtered subset to JSON; import from JSON to restore or bulk-add.
- No dependency on external services; works offline forever.

### 3.9 People Directory
- Manage people (authors, directors, creators) independently.
- View all Content Items linked to a person, with roles displayed.
- Roles are defined per link (e.g., "Hayao Miyazaki — Director for Spirited Away", "Hayao Miyazaki — Author for the manga version").

### 3.10 UI/UX Principles
- Dark theme with cyan (#00FFFF or similar) accents, calm and minimal.
- Mobile-responsive (React frontend).
- Gradual onboarding: empty states are friendly, not intimidating.
- Microcopy is warm and human, never cold or robotic.

---

## 4. Domain Invariants (Rules)

1. **Progress Bound:** For any IntentionTrack, `Progress ≤ ContentItem.TotalUnits` if `TotalUnits` is not null and `ContentItem.IsAiring` is false. If `IsAiring` is true, no upper bound is enforced.
2. **Status Consistency:** An IntentionTrack with `Status = Completed` should have `Progress == TotalUnits` (if total is set and not ongoing). `CompletedAt` is set automatically.
3. **Secret Isolation:** If `ContentItem.IsSecret == true`, the item must not appear in any query result, list, or aggregate view unless the user has explicitly unlocked secret mode.
4. **Single Primary Image:** At most one `ContentImage` per `ContentItem` can be marked `IsPrimary`. If no images exist, UI generates a fallback (letter + color).
5. **Unique Intention per Track:** A `ContentItem` cannot have two `IntentionTracks` with the same `Intention` value. The combination `ContentItemId + Intention` is unique.
6. **Person Link Integrity:** A `Person` can be linked to many `ContentItem` entities with different roles. Deleting a `Person` removes all links (or warns, depending on UX).
7. **Export Completeness:** Exported data (JSON) must include all related entities (tracks, goals, locations, notes, images, people links) to allow full reconstruction on import.
8. **Gradual Entry:** All metadata fields except `Title` and `Type` are optional at creation time. The system must not enforce completeness.
9. **Recommendation Isolation:** Items in the Recommendation Inbox are not full `ContentItem` entities; they have a simplified structure. Promotion creates a new `ContentItem` and removes the recommendation.

---

## 5. UI Flow Concepts (Brief)

- **Library Home:** Grid/list of all non-secret items. Filters by type, genre, tag, intention, status. Separate "Secret" section visible only when unlocked.
- **Recommendation Inbox:** A distinct tab or sidebar link. Simple list with promote/delete actions.
- **Item Detail:** Tabs/sections for Overview (cover, metadata), Intention Tracks (progress bars, goals, update buttons), Notes, Images, People, Locations.
- **Add/Edit Item:** Essential fields upfront; collapsible sections for metadata, images, locations, people.
- **Dashboard:** Cards for upcoming goals, recently completed tracks, yearly stats.
- **Import/Export:** Settings area with clear buttons.

---

## 6. Technical Implementation Notes (for Spec)

- **Backend:** .NET 10 Minimal API, EF Core with SQLite. Clean architecture.
- **Frontend:** React + TypeScript (your existing app shell). React Context for state, fetch API for data.
- **Start with vertical slice:** basic CRUD for `ContentItem` + `IntentionTracks`, then add goals, people, locations, notes, export incrementally.
- **Secret mode implementation:** backend query filter + frontend global state.
- **Recommendation Inbox:** can be a simple separate table (`Recommendations`) until promotion.
