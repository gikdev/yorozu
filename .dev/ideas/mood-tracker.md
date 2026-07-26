**Idea: Deep Mood Tracker with Context & Pattern Discovery**

**One-Liner**
A granular mood tracker that goes far beyond happy/sad, capturing over 40 specific feelings along with detailed context (where, with whom, time, food) to uncover hidden emotional patterns for therapy and self-understanding.

**What It Does**
- Offers a rich palette of **40+ distinct feelings** (not just “happy” or “sad”), each:
  - Placed in a quadrant: high/low energy × positive/negative energy.
  - Paired with a short explanation so you can accurately name what you’re experiencing.
- For every mood entry, captures **contextual data**:
  - **Location** – where you are.
  - **People** – who you’re with (or alone).
  - **Time** – time of day, and possibly day of week.
  - **Physical state** – what you ate that day, optionally sleep, exercise, etc.
- All data is stored for later analysis.
- Over time, the app helps you spot **patterns**:
  - “I’m significantly more nervous around my dad than during an exam.”
  - “I feel depleted every Wednesday afternoon after a specific meeting.”
  - “Eating heavy carbs at lunch correlates with low-energy negative moods by evening.”
- Can be used for personal therapy, journaling, or simply knowing yourself better.

**Core Experience**
1. You notice a strong feeling and open the app.
2. Instead of settling for a generic “bad”, you scan the 40+ feelings (categorized by energy/valence) and find “anxious, high-energy negative”. You read the explanation and confirm — it fits.
3. You quickly log the context: at home, with family, after dinner, ate pasta.
4. Weeks later, you browse patterns: a chart or insight list reveals that “anxious” spikes whenever you’re with your dad, regardless of food or time — that’s a revelation.
5. The data acts as a mirror, showing you emotional truths you might never have assembled consciously.

**Problem Validation**
- **What real-world friction does this address?**
  We often feel complex emotions but lack the vocabulary to name them precisely. We also miss cause-effect links because we don’t record the surrounding context systematically. Therapy can help, but the daily data is missing.
- **Is it a surface symptom or a root cause?**
  Root cause: low emotional granularity (the ability to differentiate feelings) and no systematic link between context and mood. This tool directly addresses both — it teaches emotional nuance and collects the evidence.
- **What happens if you don’t build it?**
  You continue to use broad labels (“stressed”) that mask real drivers. You might stay unaware that certain people or situations drain you, missing chances to adjust your life.
- **The “to-do app lesson” check:**
  Is this just a fancy diary that you could do in a notebook? The granular emotion picker with explanations adds unique value — it’s hard to list 40 feelings from memory. The pattern analysis across many data points is tough to do manually. Crucially, you already have proof it works: your own example (“more nervous around dad than exams”) demonstrates real insight. This idea is solving a real problem you’ve personally validated. Just ensure you keep the MVP focused on easy input first — if logging feels like a chore, pattern discovery won’t save it.

**Open Questions / Decisions**
- How to present the 40+ feelings? A 2D grid (energy vs. valence), a list with search, or a “feeling wheel” interface?
- Context fields: fixed set (location, people, time, food) or customizable? Fixed is simpler to analyze later.
- Data visualization: correlation charts, simple sentence-based insights (“You feel X 80% of the time when with Y”), or timeline views?
- Privacy: highly sensitive emotional data — must be local-first, encrypted, with no cloud unless user explicitly opts in.
- Frequency: do you log on a schedule (nudge every 3 hours) or purely on-demand when a feeling hits?

**Potential Features to Explore**
- Prompts to log if you haven’t in a while (gentle, skippable).
- Saving “favorite” or frequently used feelings for quicker entry.
- Adding a short free-text note per entry, alongside structured data.
- Exporting reports for a therapist.
- Correlating multiple contexts together (e.g., location + people).
- Optional photo capture (e.g., snap of the room) for visual context — but that might overcomplicate.
