**Idea: Prompt Template Manager**

**One-Liner**
A prompt library where you save reusable prompt templates with placeholders, fill the form with specific values, and instantly get the completed prompt to copy and send to an AI — no manual edits or repeated clarifications.

**What It Does**
- Save **prompt templates** — pre-written AI prompts containing variables (placeholders like `{name}`, `{age}`, `{topic}`, etc.).
- When you need to use a template, the app detects all placeholders and **generates a form** with labeled input fields for each.
- You fill in the form with the concrete values (e.g., “John”, “34”, “quantum physics”).
- The app merges the values into the template and displays the **final, fully assembled prompt**.
- One-click **copy** to clipboard, ready to paste into ChatGPT, Claude, or any AI tool.
- Organize templates using **tags**, **folders**, or both (to be decided).
- Saves you from manually hunting through a prompt, fixing placeholders, or re-entering the same context repeatedly.

**Core Experience**
1. You create a template:
   `“Explain {concept} to a {age}-year-old, using simple analogies and no jargon.”`
2. Later, you select this template. The app shows:
   - Concept: [________]
   - Age: [________]
3. You type “black holes” and “12”.
4. The app generates:
   `“Explain black holes to a 12-year-old, using simple analogies and no jargon.”`
5. You copy it, paste it into your AI chat, and get the result — no back-and-forth.
6. You can reuse the same template dozens of times with different values, all organized neatly in your library.

**Problem Validation**
- **What real-world friction does this address?**
  Effective AI prompting often requires well-structured, detailed prompts that contain variable parts (name, age, topic, style, etc.). Manually editing those parts every time is error-prone and slow, and you can lose track of good prompt patterns.
- **Is it a surface symptom or a root cause?**
  Root cause: There is no standard, lightweight way to parametrize and reuse prompts without copy-pasting and manually replacing text. This tool bridges the gap between a static text file and a full prompt engineering IDE.
- **What happens if you don’t build it?**
  You might keep prompts in a note app, manually replacing values each time, risking typos, or just not reusing well-crafted prompts, thus wasting time reinventing them.
- **The “to-do app lesson” check:**
  Could you just use a text expander or a simple snippet tool? Some snippet managers support placeholders, but they are not designed for prompt libraries with clear forms and one-click copy. The value here is the dedicated user interface that shows only the required fields and gives you the immediate output. However, this is only worth building if you have a sizeable collection of templates you genuinely reuse. Start by manually tracking how many times you actually reuse a complex prompt. If it’s fewer than once a week, the tool may not earn its keep. A tiny HTML prototype with one template and a form will quickly reveal if the flow feels like a relief or an extra step.

**Open Questions / Decisions**
- **Placeholder syntax**: curly braces `{var}`, double brackets `[[var]]`, or something else?
- **Form generation**: auto-detect all unique placeholders; in what order? Alphabetical, or order of first appearance?
- **Organization**: tags, folders, or both? Tags allow cross-cutting groupings (e.g., “writing”, “coding”).
- **Template storage**: local JSON file, browser localStorage, or a simple backend?
- **Multi-line input**: some placeholders might need paragraphs; should fields be resizable textareas?
- **Preview**: show the assembled prompt live as you type, or only after clicking “Generate”? Live preview is nicer.

**Potential Features to Explore**
- Import/export templates as JSON for sharing.
- Favorite/pin frequently used templates.
- Optional descriptions for templates (what they’re for, example inputs).
- A “test run” button that sends the prompt directly to an API if configured — but that drastically increases scope. Keep it a pure copy tool first.
- Syntax highlighting for placeholders in the template editor.
- A random placeholder filler for quick testing.
