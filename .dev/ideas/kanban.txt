**Idea: Simple Kanban**

**One-Liner**
A lightweight, no-frills kanban board for storing all tasks related to a specific project, with nothing more than a title and a status.

**What It Does**
- Maintain a list of projects.
- Each project contains a flat list of to-do items (no nesting).
- Each to-do has exactly two things:
  - **Title** – the task description
  - **Status** – one of four states:
    - Idle (not yet started)
    - In Progress
    - On Hold
    - Done
- Items can be moved between statuses (drag-and-drop or simple dropdown).
- That’s it. No descriptions, no subtasks, no file attachments, no assignees, no due dates. Intentionally barebones.

**Core Experience**
1. Create a project, e.g., “Website Redesign”.
2. Brain-dump all tasks related to that project into the idle column: “Update hero image”, “Fix broken links”, “Draft new copy”.
3. When you start working on something, drag it to “In Progress”.
4. When blocked or waiting, move to “On Hold”.
5. When done, move to “Done” and optionally archive.
6. The board acts purely as a visual holding pen for all project-specific tasks that don’t belong in your daily bullet journal or general to-do list.

**Problem Validation**
- **What real-world friction does this address?**
  Project tasks scatter across notebooks, fleeting thoughts, and separate daily planners. A bullet journal or daily planning page can’t hold 10+ tasks for multiple projects without becoming a mess. You need a dedicated, minimal space to keep them in one place.
- **Is it a surface symptom or a root cause?**
  Root cause: having project-related ideas and tasks without a simple, persistent home outside of your day’s agenda. This gives that home.
- **What happens if you don’t build it?**
  You either overload your daily planner with long-term project tasks (drowning out today’s priorities), or you forget them entirely.
- **The “to-do app lesson” check:**
  Could you just use a dedicated section in your bullet journal or a plain text file? Possibly, but a visual kanban with status columns makes the state of each task immediately obvious without re-reading or rewriting lists. The important self-awareness is that you’re resisting feature creep (descriptions, attachments, subtasks) because you know from experience you don’t need them. This is a strong sign the idea is well-scoped and solves a real, narrow problem.

**Open Questions / Decisions**
- Layout: classic columns side by side, or a single list with status filters? Columns are more kanban-like.
- Multiple projects visible at once, or one project at a time?
- Archive policy: do done items disappear or stay visible in a collapsed section?
- Data persistence: local storage in the browser, or a simple JSON file export?
- Need for a very occasional description field? Prototype without first; only add if actively missing.

**Potential Features to Explore (only if truly needed, tested with MVP)**
- Optional color-coded projects for differentiation.
- A simple “add task” input that pre-fills the status as idle.
- Quick keyboard navigation between tasks.
- Export/print a project’s task list as plain text.
