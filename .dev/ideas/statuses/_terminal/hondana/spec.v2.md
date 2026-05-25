# 📋 Hondana (本棚) — Specification v2

---

## 1. Purpose

Hondana is a personal, private library manager for all the content you consume: anime, books, courses, podcasts, and more. It tracks *what* you consume, *where* you are in it, *why* you're consuming it (fun, learning, immersion, etc.), and preserves your notes, quotes, actions. It replaces scattered mental notes, text files, and platform-specific tracking services with a single, calm home.

---

## 2. Core Concepts (Ubiquitous Language)

- **Content Item** — Any consumable media. Has a title, type, total length (if known), and optional cover art.
  - 🔹 **Option A:** `Type` is a fixed enum: Anime, Book, Course, Podcast, Other.
  - 🔹 **Option B:** `Type` is a string with predefined suggestions, allowing custom types (e.g., "Manga", "Audiobook") for full flexibility.

- **Intention Track** — A *reason* you engage with a Content Item. Each track is independent.
  - 🔹 **Option A:** Standard intentions are a fixed enum: Fun, Learning, Immersion, Teaching, Custom.
  - ✅ **Option B:** Fully freeform — just a string, but with the ability to create saved "presets" for reuse.

- **Status** — The state of an Intention Track. Values: `PlanToStart`, `InProgress`, `Completed`, `OnHold`, `Dropped`. (Fixed, no options.)

- **Goal** — A specific objective attached to an Intention Track. Multiple allowed. Has a description, due date, and completion flag. (Fixed.)

- **Progress** — Units completed on a track. Always ≤ total units if total is defined and item is not ongoing.

- **Recommendation Inbox** — A separate holding area for content you might want to consume later.
  - ✅ **Option A:** Recommendations are stored as a separate, simpler entity (just title, type, link, note). When you promote, a full `ContentItem` is created and the recommendation is deleted.
  - 🔹 **Option B:** Recommendations are actually regular `ContentItem` records but with a special `IsRecommendation` flag and hidden from main views until promoted. Promotion just flips the flag and requires adding at least one IntentionTrack.

- **Secret Mode** — A toggle on a Content Item that hides it completely.
  - 🔹 **Option A:** Unlock via a simple global "Show Hidden Items" toggle with a confirmation. The toggle is placed discreetly in settings.
  - ✅ **Option B:** Unlock with a 4-digit PIN that you set. After entering, secret items become visible until you lock again or close the app.
  - 🔹 **Option C:** Biometric (fingerprint) unlock, but that's only possible if you wrap the frontend in a desktop app. (Probably overkill.)

- **Person** — A real-world individual linked to Content Items. Role is on the relationship (`ContentPerson`). Fixed.

- **Location** — Where the content is stored. Each location has a type (FilePath, URL, Physical) and a value string. Fixed.

- **Note** — Text block with type: General, Quote, Phrase, Actionable. Fixed.

- **Tag** — Freeform custom label. Fixed.

- **Genre** — Predefined category (Romance, Comedy, Slice of Life, etc.). Multi-select.
  - ✅ **Option A:** Genres are a hardcoded list that you can edit via config.
  - 🔹 **Option B:** Genres are a separate table, and you can add/remove genre definitions from within the app. Gives full control.

- **Heart / Bookmark** — Quick flags. Fixed.

- **Cover Image** — Gallery of images, one primary.
  - 🔹 **Option A:** Images are stored as URLs only (could be local file:// paths or web URLs). No upload to the database.
  - 🔹 **Option B:** You can upload an image file, and the backend saves it to a local folder and stores a relative path. This keeps images with the database but increases complexity.
  - 🔹 **Option C:** Base64 encode images and store them directly in the database (not recommended for performance, but keeps everything in one SQLite file).
  - ✅ **Option D:** URL or file.
  - Fallback: letter + color.
    - 🔹 **Option A:** Color is automatically extracted from the image (if exists) using a simple algorithm (e.g., average color).
    - ✅ **Option B:** You manually pick a color per item (or a default per type) for the fallback. Simpler, more consistent.

- **Airing / Ongoing** — If true, total units can be null and progress bound is not enforced. Fixed.

---

## 3. Detailed Features & User Stories

### 3.1 Managing Content Items

- **Create Item:** You enter Title, select Type from dropdown, optionally input TotalUnits, UnitType, Description, toggle Secret, toggle IsAiring. All fields except Title and Type are optional.
- **Edit Item:** Open detail view, modify any field, save.
- **Delete Item:** Confirmation dialog; cascades to delete all tracks, goals, notes, images, locations, people links.
  - ✅ **Option A:** Soft-delete (move to trash, can be restored within 30 days).
  - 🔹 **Option B:** Hard delete with a clear warning. Simpler, less code, but no undo.
- **Add Genres:** Select from a predefined list (or custom list, per Genre Option B).
- **Add Tags:** Type a tag name, press enter or comma; auto-suggest from existing tags.
- **Images:** "Add Image" button opens file picker (if using file uploads) or prompts for URL. Set as primary by clicking a star icon. Reorder by drag-and-drop.
- **People Linking:** "Add Person" — search existing people or create new. Assign role from dropdown (Director, Author, VoiceActor, Creator, etc.). One person can have multiple roles on the same item?
  - 🔹 **Option A:** Only one role per person per content item. If they have multiple roles, add them multiple times.
  - ✅ **Option B:** Allow multiple roles on a single link (e.g., "Hayao Miyazaki — Director, Writer"). Keeps relationship list cleaner.
- **Locations:** Add location with type dropdown, value string, optional label.

### 3.2 Intention Tracks, Goals & Progress
- **Viewing Tracks:** On an item's detail page, a section shows all tracks. Each track card shows: intention name, status badge, progress bar (with +/- buttons and direct number input), list of goals with due dates and checkboxes.
- **Add Track:** Choose intention (enum/string). Status defaults to `PlanToStart`, progress 0.
- **Update Progress:** Click + or - increments by 1 (or custom step?
  - ✅ **Option A:** Step is always 1 unit (episode/page).
  - 🔹 **Option B:** You can configure a custom step per item (e.g., for a course with 5-minute units, step by 5). But this might add UI complexity; start with 1.
- **Complete Track:** When progress reaches TotalUnits (if set) and status isn't already `Completed`, a prompt asks if you want to mark it completed. If auto-mark is desired, we can do it automatically.
  - ✅ **Option A:** Auto-mark as Completed when progress equals total.
  - 🔹 **Option B:** Manual only: you click "Mark Completed" separately. Allows you to have progress complete but still consider it not finished if you want to rewatch? (But then you could just not mark it.)
- **Goals:** Each track can have zero or more goals. Add goal: description, due date, optional alarm? (Probably no alarm, just visual indicator.) Goals shown with a checkbox and due date. Overdue goals highlighted in amber.

### 3.3 Recommendation Inbox

- **Add Recommendation:** Simple form: title, type, link (optional). Saves to Recommendation list.
- **View Inbox:** Separate screen/tab. Shows list of recommendations with type icon.
- **Promote:** Button per item. When promoted, a full `ContentItem` is created (you are taken to the create/edit screen to fill in details), and the recommendation is removed.
- **Delete/Archive Recommendation:** Just delete. No archive needed.
  - ✅ **Option A:** Keep recommendations as separate lightweight records.
  - 🔹 **Option B:** Use `ContentItem` with a flag (as in Option B earlier). Decide based on whether you want the flexibility to easily view recommendations alongside real content in the future. For a clean library, Option A is better.

### 3.4 Secret Mode
- **Setting Secret:** On create/edit, a toggle switch. When active, a small 🔒 icon appears next to the item in list (but item is hidden unless unlocked).
- **Unlocking:** According to chosen unlock mechanism (toggle or PIN), when unlocked, a banner appears "Secret Mode: Visible" and hidden items are shown with a distinct background tint (maybe a subtle red or purple) and the 🔒 icon.
- **Auto-relock:**
  - ✅ **Option A:** Secret mode stays unlocked until you manually relock.
  - 🔹 **Option B:** It auto-locks after 15 minutes of inactivity, or when you minimize the app. More secure.

### 3.5 Discovery & Decision Help
- **Filters:** A filter bar on the library home. You can filter by type, genre, tag, intention, status, length (range), due date (overdue, due this week). Filters persist in URL or local state.
- **Export Filtered List:** Button to export current filtered list as JSON (including basic info + tracks) or as a simple text list you can paste into a chat.
  - 🔹 **Option A:** JSON full export (machine-readable).
  - 🔹 **Option B:** Human-readable text export with options: "Title — Ep 5/12 (Fun), Ep 3/12 (Learning)".
  - ✅ Maybe both.
- **Future Smart Suggest:** Out of scope for now, but the data model supports it.

### 3.6 Notes & Emotional Preservation
- **Adding Notes:** On item detail, a Notes tab. "New Note" opens a small editor (plain text or markdown?).
  - 🔹 **Option A:** Plain text only for simplicity.
  - ✅ **Option B:** Markdown with preview (like a tiny GitHub-flavored editor). More expressive for quotes.
- **Note Type:** Choose from dropdown. Optionally link to a specific IntentionTrack (e.g., a phrase learned during Immersion).
- **Display:** Notes shown in chronological order, with type badge, linked track indicator, and timestamp. Searchable via a global notes search.

### 3.7 Dashboard & Reflection
- **Dashboard layout:**
  - 🔹 **Option A:** A dedicated page with cards: "Upcoming Goals", "Recently Completed", "Current Progress Overview" (bar charts), "Year Stats".
  - 🔹 **Option B:** Integrate these widgets into the library home page as collapsible sections, so you don't need a separate dashboard.
- **Year in Review:** Sum of completed items per type, per intention. Total units consumed. Top genres, top creators. Could be a generated report (PDF?
  - 🔹 **Option A:** PDF export (requires a library like QuestPDF or jsPDF). Complex.
  - ✅ **Option B:** Simple on-screen view with option to print/save as PDF via browser print. Simpler.

### 3.8 Data Ownership, Import & Export
- **Full Export:** Export all data (items, tracks, goals, notes, images refs, people, locations) as a single JSON file.
  - 🔹 **Option A:** Include image file contents as base64 in JSON (makes file huge, but fully self-contained).
  - 🔹 **Option B:** Include only image references (URLs/paths), and separately backup the image folder. That's more practical.
- **Import:** Accept a JSON file (full or partial). On import, add items; if an item with same ID exists, ask whether to skip, overwrite, or duplicate.
- **Auto-backup:** Could periodically save a JSON snapshot to a designated folder.
  - 🔹 **Option A:** Manual export only.
  - 🔹 **Option B:** Auto-save backup on application close (if using desktop wrapper). Might be nice for peace of mind.

### 3.9 People Directory
- **Manage People:** A separate list of all persons. Each has name, optional photo URL, bio. You can edit, delete. Deleting a person prompts if they are linked to items.
- **View Linked Content:** From a person's detail, see all items they are associated with, grouped by role.

### 3.10 UI/UX Principles
- **Theme:** Dark background (#121212 or similar), cyan accents (#00FFFF), clean sans-serif font. Minimalist.
- **Empty states:** Friendly illustrations or messages. E.g., "Your library is empty. Add your first anime or book to get started!"
- **Microcopy:** Use phrases like "Got it!", "Looking good!", "Your progress is safe here." Avoid robotic language.
- **Mobile responsiveness:** Flexbox/Grid, cards stack, filter bar collapses, bottom nav for main sections.

---

## 4. Domain Invariants (Rules) — with possible alternatives

1. **Progress Bound:** `Progress ≤ TotalUnits` if `TotalUnits` is not null and `IsAiring == false`.
   - ✅ **Option A:** Enforce strictly: saving an invalid progress shows an error.
   - 🔹 **Option B:** Auto-cap progress to `TotalUnits` when saving. More forgiving but might hide mistakes.

2. **Status Consistency:** `Completed` → `Progress == TotalUnits` (if total set). Auto-set `CompletedAt`.
   - ✅ **Option A:** Enforce at API level: cannot set status to Completed unless condition met.
   - 🔹 **Option B:** Allow it, but show a warning. Gives flexibility if you finished early somehow (dropped? but then you'd use Dropped). I'd go with A.

3. **Secret Isolation:** Enforced in backend queries; frontend also hides.

4. **Single Primary Image:** Exactly one image marked `IsPrimary` if any images exist. If only one image, it's primary by default.

5. **Unique Intention per Track:** Enforced by unique constraint on `ContentItemId` + `Intention`.

6. **Person Link Integrity:** On deleting a Person, handle links:
   - ✅ **Option A:** Delete all `ContentPerson` links referencing that person (cascade).
   - 🔹 **Option B:** Prevent deletion if any links exist; you must unlink first.

7. **Export Completeness:** JSON export structure must include all nested data.
8. **Gradual Entry:** All fields optional except `Title` and `Type`.
9. **Recommendation Isolation:** Depending on Option A or B, invariant ensures recommendations are not mixed with main library until promotion.
