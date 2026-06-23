**Idea: Music Library with Multilingual Timed Lyrics & Instrumental Skip**

**One-Liner**
A self-hosted music library that combines standard player features with a powerful lyrics engine: enter time-stamped, multilingual lyrics (with translations), mark favorite lines, skip instrumental sections, and export lyrics as printable PDFs.

**What It Does**
- **Core Music Player Features**
  - Dedicated player view with standard controls.
  - Create and manage playlists.
  - Categorize music (tags, folders, or custom groupings).
  - Add/delete music files directly on the server (self-hosted).
  - Heart/bookmark songs for quick access.
- **Lyrics Engine (Key Differentiator)**
  - Built-in editor to enter **time-stamped, multilingual lyrics** per song.
  - Define a **primary language** (e.g., Japanese for an anime ending).
  - Add multiple translation tracks for each line: e.g., Romaji, English, Persian — all synced to the same timestamp.
  - During playback, lyrics display karaoke-style, with the option to show/hide each language layer.
  - **Favorite lyric lines**: tap a heart on any line that resonates with you; later, you can view all your liked lines across songs.
  - **Instrumental Skip toggle**: when enabled, the player automatically jumps from the end of one vocal section to the start of the next, skipping pure music passages (e.g., a 10-second guitar solo between verses).
- **Export Lyrics by PDF**
  - Generate a clean, printable page of full lyrics (primary + selected translations).
  - Save as PDF or print directly for offline reading.
- **Tag System**
  - Assign mood or genre tags to songs (e.g., "sad", "energetic", "calm").
  - Filter library by tag to match your current mood without focusing on lyrics.

**Core Experience**
1. You add your music files to the library, whether anime OSTs, foreign songs, or anything with lyrics you want to study.
2. For a song you love, you open the lyrics editor and paste/type the original lyrics with timestamps, then add translations for each line (Romaji, English, Persian).
3. During playback, you see a rich, synced display: Japanese on top, Romaji below, English below that — all moving in time.
4. A specific line hits you hard; you tap the heart icon next to it, and it's saved to your "Favorite Lyrics" collection.
5. You toggle Instrumental Skip to jump straight to the next vocal part, avoiding long music-only breaks.
6. One click exports the full lyrics as a beautifully formatted PDF — perfect for reading on the go or singing along offline.
7. On a sad day, you filter by the "sad" tag and let the player shuffle through songs that match your mood.

**Problem Validation**
- **What real-world friction does this address?**
  Listening to foreign-language songs often means juggling multiple apps: one for audio, one for lyrics (often not synced), and another for translations. You can't mark specific lines as meaningful, skip instrumental sections, or export clean translations in one workflow.
- **Is it a surface symptom or a root cause?**
  Root cause: No single tool combines a personal music library with deep, user-controlled multilingual lyrics and translation management. Existing solutions are either streaming-only, lack translation layers, or don't allow user-generated time-synced content.
- **What happens if you don't build it?**
  You might continue with separate apps, manually scrolling lyrics and toggling translations, never capturing favorite lines, and tolerating instrumentals when you just want vocals. You might lose the translations you painstakingly collected.
- **The “to-do app lesson” check:**
  Could you just use a generic music player and a separate note app for lyrics? Yes — but the friction of syncing timestamps manually and switching contexts is high. The question is whether you'll actually invest time in entering time-stamped lyrics for a significant number of songs. If you only do it for 2-3 favorite songs, the tool might be overkill. Prototype with one song's lyrics in a simple timed display to gauge if the editing and syncing feel rewarding or like a chore. The "like a lyric line" feature is genuinely novel and could be the emotional hook.

**Open Questions / Decisions**
- **Storage**: files on a local server; how to handle metadata and lyrics — database? JSON sidecar files per song?
- **Lyric editor UI**: how to input timestamps? Tap to mark current playback time, then type the line? Or bulk import from LRC files?
- **Translation layers**: fixed slots (e.g., Translation 1, Translation 2) or custom named layers?
- **Instrumental skip**: automatic detection (complex) or require user to mark "instrumental" segments in the lyric editor? Latter is simpler.
- **PDF export**: which languages to include? All, or user-selectable?
- **Self-hosted scope**: web app? Desktop? Mobile companion?

**Potential Features to Explore**
- Import existing LRC files and enhance with extra translation layers.
- Search lyrics across all songs (e.g., find all lines containing a certain word).
- "Genius-style" annotation for specific lines (explain cultural references).
- Dark/light theme for player view.
- Option to auto-fetch lyrics from an API as a starting point, then manually refine timestamps and translations.
