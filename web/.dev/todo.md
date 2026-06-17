## 1. Track list on a Content Item’s detail page

This is the most natural place to see tracks. When viewing a content item, show a section “Tracks” below the item’s info.

**For each track, display:**

- Title (e.g., “Fun #1”)
- A status badge (Idle / In Progress / On Hold / Completed / Dropped) — use color coding.
- Progress: `{CurrentUnit}/{TotalUnits}` (if TotalUnits exists), or just a progress bar.
- A small row of action buttons, **only enabled according to the computed booleans**:
  - **Start** (canStart)
  - **Pause** (canPause)
  - **Resume** (canResume)
  - **Complete** (canComplete)
  - **Drop** (canDrop)
- A button to delete the track (always available, but maybe ask for confirmation).
- An edit button (to change title/description/type) — can open a modal or inline form.

**Empty state:** If a content item has no tracks, show a friendly message like “No tracks yet. Start tracking your progress by creating one.” and a “Create Track” button.

**Create Track button:** This opens a simple form (modal or inline) with:

- Title (required)
- Type (dropdown: Unknown, Education, Fun — or adjust to your actual values)
- Description (optional)
- Then `POST /content-items/{id}/tracks`

---

## 2. Track progress update

The PATCH endpoint expects `{ action: "Set" | "Increment" | "Decrement", amount: number }`. You can offer three UI patterns (pick what feels right):

- **Simple: +/- buttons next to the current unit, plus a direct input for Set.**
  Example: `[ – ] 5 / 24 [ + ]` with a small edit icon to set manually.
- **Or: a dropdown with “Set”, “Increment”, “Decrement” and an amount field.**
  Not the prettiest, but covers all cases.

When incrementing/decrementing, you might want to enforce a minimum step (usually 1). Use the booleans `canProgress` and `canDecrement` to disable the buttons when not allowed.

---

## 3. Global “All Tracks” page

This page shows every track across all content items. It’s useful for an overview. For now, just list all tracks with the same card design as above, but also show the **content item title** and its cover image (which the API already returns).

You can later add client-side filtering/sorting, but start with the full list.

---

## 4. State transition feedback

Since state changes (start, pause, etc.) return the updated track DTO, you can just replace the track in your local state after the API call. No need for optimistic updates right away (though they make it snappier). Show a brief visual feedback (like a color change or a small animation) when the status changes.

---

## 5. Edit track modal

When the user clicks “Edit” on a track, open a modal pre-filled with the current title, description, and type. On save, call `PUT /tracks/{id}` with the new values. The returned DTO updates the list.

---

## 6. Visual suggestions

- Use subtle color badges for status:
  Idle = grey, InProgress = blue, OnHold = orange, Completed = green, Dropped = red.
- For progress, a horizontal bar with the current unit over total units works well.
- Make the action buttons compact icons (play, pause, etc.) with tooltips.
- Use card-like containers for each track, maybe with a slight elevation.
