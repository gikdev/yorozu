**Idea: Choice Helper**

**One-Liner**
A decision-making tool that uses pairwise comparisons to help you pick a single winner or rank an entire list, eliminating choice paralysis.

**What It Does**
- You give the app a list of items (e.g., 5 food options, books to read, things to buy).
- Two modes: **Winner** (find the best one) or **Ranked** (sort all items from best to worst).
- The app repeatedly presents **two items at a time** and asks “Which one do you want?” / “Which is better?”
- It **never asks the same pair twice** — it remembers all your answers to save time.
- **Winner mode**: continues head-to-head until only one item remains — that’s the winner.
- **Ranking mode**:
  - Runs the winner process on the full list.
  - Removes that winner, then re-runs the process on the rest.
  - Uses stored past comparisons so you never re-answer the same pair.
  - Repeats until all items are ranked in order.
- Core insight: Human brains are much faster and more accurate comparing **two options** than scanning a whole set — you won’t miss a nuance.

**Core Experience**
1. Enter a list of options (manually, or perhaps paste a list).
2. Choose mode: “Pick Winner” or “Rank All”.
3. See a clear, distraction-free interface showing two options side-by-side.
4. Tap/click the one you prefer — next pair appears instantly.
5. At the end, get the single winner (or a full ordered ranking) with minimal mental fatigue.

**Problem Validation**
- **What real-world friction does this address?**
  Decision fatigue and paralysis when facing many equally valid options (menu, shopping, reading list, feature priorities).
- **Is it a surface symptom or a root cause?**
  Root cause: Working memory and comparative judgment are biologically limited. Forcing a one-shot ranking of 5+ items is error-prone. Pairwise comparison aligns with how our preference circuits work.
- **What happens if you don’t build it?**
  You stare at a list, mentally juggle pros/cons, possibly make impulsive or random choices, or just avoid deciding. Manual workarounds exist (coin flip, ask a friend) but lack systematic accuracy.
- **The “to-do app lesson” check:**
  Are you masking a need to just decide faster or be more self-trusting? Possibly a little — but this tool is a genuine cognitive prosthetic, not a band-aid on poor task management. The pairwise method is backed by decision science (e.g., Analytic Hierarchy Process). As long as you don’t use it for trivial daily choices that should be automatic, it solves a real, recurrent problem.

**Open Questions / Decisions**
- How many items is too many? If you enter 50 items, the number of pairwise comparisons grows — might need a “I don’t care” / “skip” option for some pairs.
- How to input items: simple text box (one per line) or richer (with optional images for visual decisions)?
- Progress indicator: show remaining comparisons? It could reduce anxiety.
- Storing past answers: for ranked mode, does it automatically reuse comparisons? Yes — must track a matrix of asked pairs.
- Could there be a “tie” option? If user truly can’t choose, maybe skip and resolve later.

**Potential Features to Explore**
- Random shuffle before starting to avoid position bias.
- Undo last comparison if mis-clicked.
- Share/export the final ranking.
- Add short notes to items (e.g., price, calories) visible during comparison, though that might overload the simplicity.
- A “quick pick” mode that uses tournament seeding (like sports brackets) to reduce total comparisons for large lists.
