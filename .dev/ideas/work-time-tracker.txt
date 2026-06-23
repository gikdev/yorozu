**Idea: Focus Session Tracker**

**One-Liner**
A dead-simple work focus timer with one big play/pause button; start a session, stop it, and at the end of the day see exactly how many focused sessions you had and total raw work time — nothing more.

**What It Does**
- Displays a large **Play/Pause button** in the center of the screen.
- **Start** click: begins a new focus session, timer starts counting up.
- **Stop** click: ends the session, saves its duration, resets for next session.
- At any point (or at end of day), the user can ask for a **summary** (via a button, or an alert window).
- The summary shows:
  - **Number of sessions** (how many times you sat down to focus).
  - **Total focused time** (e.g., “4 sessions, total 2 hours 30 minutes”).
- No projects, no tags, no categories, no manual entries. Just session count and accumulated time for the day.
- Resets automatically the next day (or user can manually clear).

**Core Experience**
1. You arrive at work, ready to do a focused task.
2. You open the app, hit the **Play** button.
3. You work without distraction. When you’re done (or interrupted), you hit **Stop**.
4. Later, you start another session — Play, then Stop.
5. At the end of the day, you click “Summary” and see: “5 sessions, 3 hours 45 minutes of raw focused work.”
6. That number tells you the truth: how much deep work actually happened, not just time spent at the desk.

**Problem Validation**
- **What real-world friction does this address?**
  Feeling busy at work but unsure how much *real* focused output you produced. Standard time tracking is too granular (projects, tasks) or absent. You just want a simple metric: “Did I actually focus today, and for how long, in how many attempts?”
- **Is it a surface symptom or a root cause?**
  Root cause: Lack of visibility into your own focus rhythm can lead to overestimating productivity and not protecting deep work time. This tool provides a clear, undeniable number.
- **What happens if you don’t build it?**
  You might try to estimate mentally, use a stopwatch app that doesn’t show session count, or write down times on paper. All add enough friction that you might skip it, leaving you with no data.
- **The “to-do app lesson” check:**
  Could you just use a phone stopwatch and a tally counter? Yes, but the combo app that tracks both sessions and total time with one tap is the exact minimal step you need. The risk of overcomplication is zero because it’s literally two states. This is a pure utility that you’ve already proven you need at work — you’re solving a real, immediate problem.

**Open Questions / Decisions**
- **Reset time**: midnight automatic reset? Or a manual “New Day” button?
- **Session minimum**: do you want to ignore accidental clicks? (Maybe a session under 1 minute is auto-discarded?)
- **Summary display**: simple browser alert, or a dedicated stats panel?
- **Persistence**: browser `localStorage` enough? (Since it’s daily, no need for a backend.)
- **Title bar**: show current session duration while working, e.g., “12:34 – Focused”.

**Potential Features to Explore (only if truly missing)**
- A tiny history of past days for weekly trend (e.g., “This week: 14 sessions, 9h 20m”).
- An idle detection warning (“Still focusing?” if no mouse/keyboard after a while) — but that adds complexity.
- Keyboard shortcut (spacebar) for Play/Pause.
- Dark/light mode.
