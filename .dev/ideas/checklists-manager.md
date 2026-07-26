**Idea: Smart Checklist Manager**

**One-Liner**
A reusable, stateful checklist tool for repeatable processes, with optional items, notes, cloning, sharing, and beautiful printable output.

**What It Does**
- Define a checklist once, with ordered or unordered items.
- Each item can be **required** or **optional**.
- Items support **substeps** and **freeform notes** (e.g., record price, substitutions).
- Multiple states per item: *not started*, *in progress*, *done*, *skipped*.
- **Cloning** – create a new checklist from an existing one:
  - *Clean clone*: fresh start, all items reset to “not started”.
  - *Literal clone*: keep current progress/states (for pausing/resuming).
- **Lifecycle** – after use, you can **reset** (clear all progress), **archive** (save for reference), or **delete**.
- **Print-ready** – designed to look beautiful on paper, for offline use or sharing.
- **Categories/tags** for organizing sets of checklists (e.g., Health, Dev, Travel).
- **Export/import** – share refined checklists (e.g., “Deploy a full-stack app” by a DevOps expert). Others import, clone, rename (e.g., “WebApp234 – Deployment”), run through it, then delete or archive.

**Core Experience**
1. You create a checklist (or import one from an expert) for a repeatable process that’s easy to forget.
2. While executing, you check off items, mark some as skipped if optional, add notes on the fly.
3. You can clone a master checklist for each new instance (a new deployment, a new shopping trip) without rebuilding it.
4. When done, you archive or delete; the original template stays untouched.
5. Need to follow it on paper? Hit print – layout is clean and readable.

**Problem Validation**
- **What real-world friction does this address?**
  Cognitive load of remembering multi-step procedures (deployment, migration, shopping, health routines). Prevents forgetting critical steps.
- **Is it a surface symptom or a root cause?**
  Root cause: human memory is fallible for sequential or conditional tasks. This externalizes the checklist so you can focus on execution, not recall.
- **What happens if you don’t build it?**
  You rely on mental checklists, scribbled notes, or generic apps not tailored for stateful cloning/sharing. Errors and omissions are more likely.
- **The “to-do app lesson” check:**
  Are you just overcomplicating a simple process that could be solved by slowing down? Not here – checklists are a well-established cognitive tool, especially for repeatable technical/procedural work. The sharing angle adds genuine value for teams and communities.

**Open Questions / Decisions**
- Ordering: purely manual drag-and-drop or auto-sort by state?
- Nested substeps: how deep? Just one level, or recursive?
- Print layout: A4/Letter optimized? Include checkboxes drawn as squares?
- Export format: JSON, Markdown, or a custom `.cl` file?

**Potential Features to Explore**
- Progress summary (e.g., “3/7 required items done”).
- Template gallery for common checklists.
- Optional due dates / reminders (but maybe that complicates the clean simplicity).
- Dark mode for in-app use, separate from print styling.
