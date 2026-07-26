**Idea: Habit Tracker with Intentional Skip**

**One-Liner**
A minimal habit tracker that distinguishes between *done*, *intentionally skipped* (couldn’t do it), *simplified* (did a lighter version), and *forgotten* — plus a dense printable report for reflection.

**What It Does**
- Add a habit and define its target frequency:
  - N times per day / week / month
  - Or on specific days (Monday, Wednesday, Friday)
- Track each day’s outcome with four distinct states:
  - ✅ **Done** – completed as intended
  - ⏭️ **Skipped** – remembered, but genuinely couldn’t do it (no time, sick, etc.)
  - 🌱 **Simplified** – did a minimal, “good enough” version instead of the full habit
  - ❌ **Missed** – completely forgot to do it
- The distinction matters: skipped/simplified means you still *showed up mentally*; missed means the habit fell off your radar entirely.
- **PDF Export**: generates a clean, dense, printer-friendly report per habit (or all habits) — a white page with stats and daily grids, ready for “Save as PDF” via the browser.
- Simple, distraction-free interface — intentionally not gamified, just honest tracking.

**Core Experience**
1. Set up a habit: “Read 30 minutes — daily”.
2. At the end of each day, mark it: done, skipped, simplified, or missed.
3. Over time, see patterns: “I skipped many days this week due to late work, but I rarely forgot — that means the habit is still alive, just under pressure.”
4. At month-end, export a PDF report to review offline or share with an accountability partner.
5. No guilt-trip streaks, no flashy animations — just clarity on what’s actually happening versus what you wish was happening.

**Problem Validation**
- **What real-world friction does this address?**
  Most habit trackers only have binary “done/not done”. Life isn’t binary — some days you simply can’t, and that’s different from forgetting. Treating both as “failure” creates false guilt and hides the real problem (forgetting vs. capacity).
- **Is it a surface symptom or a root cause?**
  Root cause: binary tracking masks *why* a habit broke. Did it break because your routine is broken (forgetting), or because your life capacity is temporarily reduced (skip)? The fix is different — reminder vs. self-compassion and scaling back. This tracker surfaces that insight.
- **What happens if you don’t build it?**
  You either use a binary tracker that demoralizes you when you skip, or you don’t track at all. You lose the nuanced data that helps you adjust the habit realistically.
- **The “to-do app lesson” check:**
  Could you just track in a notebook with symbols for skip/simplify? Yes, but the friction of drawing grids and manually compiling reports might stop you. The question is whether the digital convenience is worth building. The PDF export is a small but nice touch if you actually print and review. Prototype with just a simple daily grid with the four options — if you use it consistently, it’s a keeper.

**Open Questions / Decisions**
- How to handle rollover: if a daily habit isn’t marked, does it default to “missed” or stay blank?
- PDF layout: per-habit vertical timeline, or a calendar-style grid?
- Any reminders? A subtle nudge to mark the day’s habits, or completely manual to avoid notification fatigue.
- “Simplified” vs “Skipped” — are both necessary, or could they merge? (You mentioned both, but prototype will tell.)

**Potential Features to Explore**
- Weekly summary: “You remembered your habit 6/7 days, completed 4, skipped 2 — no missed days.”
- Flexible habit pausing (e.g., vacation mode) without breaking historical data.
- Optional notes per day (why skipped/simplified).
- Dark/light mode, print-optimized style separate from screen UI.
- Simple import/export of habit definitions.
