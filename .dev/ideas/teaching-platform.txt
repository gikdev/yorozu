**Idea: Teaching Platform with Integrated Roadmap**

**One-Liner**
A learning platform that combines courses, an exercise/project library, and a linear roadmap that sequences everything into a clear path — eliminating the "what do I learn next?" confusion that plagues self-taught developers.

**What It Does**
- **Courses**: upload and organize lessons (videos, text, etc.) on various topics (e.g., Windows file system, HTML, CSS, JavaScript, React).
- **Exercise & Project Library**: a curated collection of coding challenges, puzzles, exercises, and full projects (e.g., "Personal Card Website", "To-Do App with React").
- **Roadmap Engine** (the core differentiator):
  - A roadmap is a structured sequence that interleaves **lessons**, **exercises**, and **projects** in a specific, intentional order.
  - Example:
    1. Lesson: Windows file system basics
    2. Lesson: HTML – creating a simple file
    3. Exercise: Write your first HTML page
    4. Lesson: CSS – changing text color and background
    5. Project: Personal Card Website
  - Roadmaps can target specific goals (e.g., "Become a Front-End Developer", "Learn Python for Data Science").
- Solves the paralysis of self-directed learning: instead of wondering what to study next, the learner simply follows the roadmap step by step.
- Platform admins/instructors can create multiple roadmaps by linking existing courses and exercises/projects together, reusing content across paths.

**Core Experience**
1. A learner selects a goal: "Become a Front-End Developer".
2. They see a linear roadmap: Lesson → Lesson → Exercise → Project → Lesson → ... all laid out clearly.
3. They start at step 1. Each step is either a piece of content (video/article), a coding exercise (with automated checks or manual submission), or a mini-project (with requirements and a solution guide).
4. They complete one step, mark it done, and the next unlocks (or is simply highlighted).
5. They never face the blank-page terror of "what should I build?" or "am I learning the right things?" — the path is already proven.
6. After finishing the roadmap, they have a portfolio of projects and the skills to actually get a job.

**Problem Validation**
- **What real-world friction does this address?**
  Online learning is fragmented: courses on one platform, exercises on another, projects left to the learner's imagination. The biggest pain point is **sequencing** — learners don't know the optimal order to consume resources, leading to tutorial hell, gaps, and giving up.
- **Is it a surface symptom or a root cause?**
  Root cause: The lack of a coherent, expert-designed curriculum that blends theory and practice is a fundamental flaw in self-paced education. This directly solves that.
- **What happens if you don't build it?**
  Learners (including perhaps yourself) will continue to bounce between resources, never building real projects, and struggle to reach employable skill levels. The problem is real and widely felt.
- **The “to-do app lesson” check:**
  This is not a simple utility tool, but a full platform. The risk of overbuilding is high. However, the need is clear and validated by the entire ed-tech market's shortcomings. To avoid the "to-do app trap", your MVP should be extremely scoped: one single roadmap with a handful of lessons and projects, all hardcoded, to test whether the guided-path UX actually keeps learners engaged. If that tiny version proves valuable (maybe just for your own learning), then expand.

**Open Questions / Decisions**
- **Content creation**: will you manually create all courses/exercises, allow user-generated content, or curate from external links? Start with manual.
- **Progress tracking**: simple "done" checkbox per step, or more detailed state (in-progress, skipped)?
- **Exercise evaluation**: auto-graded (coding challenges with test cases) or self-assessment (solution provided)?
- **Roadmap flexibility**: linear and fixed, or can learners branch/skip? Fixed is simpler and reinforces focus.
- **Admin interface**: needed if you plan to build multiple roadmaps later; for MVP, define the roadmap directly in code/config.
- **Audience**: just you, or will you open it to others? That changes authentication, multi-user, etc.

**Potential Features to Explore (after MVP validation)**
- Multiple roadmaps for different career tracks.
- "Skill tree" visualization of prerequisites.
- Community-submitted roadmaps (like learning paths).
- Integration with GitHub for project submissions.
- Progress dashboard with estimated time to completion.
- Badges/certificates for finishing a roadmap (low priority, but motivating for some).
