**Idea: Note Card Printer (Kanji, Concepts, Flashcard Collecting)**

**One-Liner**
A digital collector for anything you’re learning (kanji, phrases, concepts, vocabulary), with a standout feature: select 16 cards and print a clean sheet of physical cards — front side only, each with a lookup ID, so you can study offline without worrying about double-sided alignment.

**What It Does**
- Create digital “note cards” with a **front side** (the question, character, or concept) and a **back side** (the answer, reading, or definition) – stored in the app for reference and review.
- Cards are generic — useful for Japanese kanji/kana, geography facts, philosophical concepts, vocabulary, or anything with a prompt and response.
- **Print mode**:
  - Select exactly 16 cards.
  - App generates a printer-friendly HTML page.
  - The page shows a grid of 16 small cards, each displaying **only the front side** and a small ID number beneath it.
  - No back side on print — by design.
- Reasons for no printed back:
  - Forces you to actively recall the answer (more effective than flipping a physical card).
  - Eliminates tricky double-sided print alignment problems completely.
  - Simplicity — the physical card becomes a prompt, while the app remains the “answer key” (search by ID).

**Core Experience**
1. As you encounter new things to remember — a kanji, a phrase, a concept — quickly add a card with the front and back in the app.
2. Build up a library of cards over time, all in one place.
3. When you want to study away from a screen, pick 16 cards, click print, and hold a real, tactile sheet of mini prompts in your hand.
4. Quiz yourself: look at a card, try to recall the answer. If stuck, search the small ID in the app to check — no shame, just learning.
5. The physical sheet feels satisfying and permanent, giving your digital collection a tangible presence.

**Problem Validation**
- **What real-world friction does this address?**
  Learning materials get scattered across notebooks, apps, and loose flashcards. Printing physical flashcards is usually a nightmare of alignment and formatting. You just want a simple collector that also lets you “pull out” a piece of your collection into the real world, cleanly.
- **Is it a surface symptom or a root cause?**
  Root cause: The desire for a physical study artifact is real, but most flashcard apps are screen-locked. The printing hassle kills the bridge between digital collection and tangible use. This solves that bridge.
- **What happens if you don’t build it?**
  You might use a generic flashcard app and never print, or hand-write cards (time-consuming). The items you collect remain trapped on screen.
- **The “to-do app lesson” check:**
  Is this just procrasti-engineering a system instead of studying? Possibly — if you spend more time building the collector than learning. But the need is concrete: you want one safe place to gather all your learned items and occasionally print a set. As long as the MVP stays dead simple (add card + print 16), you’re solving a genuine, limited friction, not building a spaceship. You explicitly said “for now, only collect and print” — that’s perfect validation scope.

**Open Questions / Decisions**
- Card format: plain text only, or simple formatting (bold, newlines) for the front/back?
- ID system: auto-increment number? Or a short alphanumeric code?
- Print layout: 4×4 grid on A4/Letter? Margins and cut lines?
- Should the app allow any on-screen review (e.g., simple flip), or is it purely a collector + printer?
- Search by ID: just a text input, or also by tag/keyword? (Likely needed as collection grows.)

**Potential Features to Explore (only later, if at all)**
- Card tagging or grouping (e.g., “JLPT N3”, “Geography Chapter 2”).
- Selection filter: “print 16 random cards from tag X”.
- Very basic on-screen self-quiz mode (show front, tap to reveal back).
- Support for images on card front (e.g., kanji stroke order diagrams) — would complicate printing but might be valuable.
- Print multiple pages at once (e.g., 32 cards = 2 sheets).
- Export card data as JSON/CSV for backup.
