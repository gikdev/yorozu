**Idea: Single-Task Focus (“What Are You Doing Right Now?”)**

**One-Liner**
A minimal commitment device that asks what you want to do right now, then displays that single task in large text on screen with only three choices—cancel, edit, done—to kill multitasking and force singular focus.

**What It Does**
- Presents a simple text input: “What do you want to do right now?”
- You type a specific, concrete action (e.g., “Finish page 20 of Harry Potter”, “Draft the email to Alex”).
- Hit **Start**.
- The screen then shows that task **in huge, centered text** — no distractions, no lists, no notifications.
- Three buttons appear:
  - **Cancel** – abandon the task (if it’s no longer relevant).
  - **Edit** – change the wording (if you realized it needs clarification).
  - **Done** – mark as finished.
- There is nothing else on screen. No to-do list. No background music. No other tasks.
- If you lose track, you return to the app and immediately see what you committed to.
- Acts as an external “prefrontal cortex” — a single-post-it-note that fights the urge to switch tasks.

**Core Experience**
1. You notice you’re about to work, but your mind is buzzing with possibilities.
2. You open the app, type exactly one thing you’re about to do, and hit Start.
3. Your screen now shows that task in giant letters. All other digital temptations are behind this full-screen “guard”.
4. You work on it. When done, you hit Done. If interrupted, you hit Cancel. If you realize the task was poorly phrased, Edit.
5. That’s it. You’ve trained your brain that this app means “one thing at a time, right now.”

**Problem Validation**
- **What real-world friction does this address?**
  Multitasking and context switching are huge productivity killers. We often sit down to work, but our brains jump to another task within minutes, especially if the current task feels hard. There’s nothing in the digital environment that gently (or forcefully) holds us to a single intention.
- **Is it a surface symptom or a root cause?**
  Root cause: The human working memory can only hold a single focused intention weakly; digital environments are designed to distract. This is a prosthetic for intention-holding.
- **What happens if you don’t build it?**
  You might try to focus, but keep flipping to other tabs, tasks, or thoughts. You could use a sticky note, but it lacks the “ceremonial” start and the commitment of seeing the task in huge letters on the very device that normally distracts you.
- **The “to-do app lesson” check:**
  Is this just another tool when you could simply write on paper? Possibly — but the act of typing your intention and seeing it fill the screen is a psychological contract that paper may not match (especially if the paper gets buried under other papers). However, this is extremely easy to prototype: a single HTML page with an input and a large-text display. If you use it for three days and find yourself returning to it, it’s a keeper. If it feels like unnecessary ceremony, you’ll know quickly. The scope is so small that over-investment is nearly impossible.

**Open Questions / Decisions**
- **Platform**: web, mobile widget, or both? (Mobile widget on home screen could be even more powerful.)
- **Persistence**: should the task survive closing the browser/app, or should it reset? (Probably survive, so if you close and reopen, you’re reminded.)
- **Full-screen mode**: should it automatically go full-screen when started to hide browser tabs?
- **Sound**: any audio cue on “Done” for a tiny dopamine hit, or keep it entirely silent?
- **History**: keep a log of completed tasks, or no tracking at all to avoid turning it into a productivity tracker?

**Potential Features to Explore (only if need is proven)**
- A subtle “time spent” display that appears after hitting Done (purely informative).
- Dark/light mode.
- Ability to “focus” for a set amount of time (timer mode) — but that adds complexity.
- A gentle nudge if the window loses focus (e.g., “Still working on … ?” in the title bar).
