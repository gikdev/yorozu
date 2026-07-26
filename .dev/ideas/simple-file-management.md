**Idea: Shared File Manager (Infrastructure Module)**

**Type:** Shared service / module — not a standalone application, but a foundational layer for all other tools in the mono-repo.

**One-Liner**
A centralized file storage and metadata service that lets you upload files once, tag and describe them, then reference them by unique ID from any other app (Music Library, Notebooks, etc.) — eliminating duplicate uploads and scattered file handling.

**What It Does**
- Provides a uniform **file upload endpoint** for the entire platform.
- Each uploaded file gets:
  - **Title** (user-friendly name).
  - **Description** (optional free-text note).
  - **Tags** (for categorization and search).
  - **Unique identifier** (GUID or integer).
- **Search & browse** files by title, tag, or description.
- Other domain models (e.g., a Song in the Music Library, an attachment in a Notebook page) store just the file’s unique ID — not the file itself.
- When you need the actual file (play audio, display image, download), you request it via the file manager service using that ID.
- Single source of truth: no duplicate uploads of the same audio file, no orphaned files stuck inside one app.

**Core Experience (across the platform)**
1. You want to add a new song to your Music Library.
2. First, you go to the File Manager (or an embedded widget) and upload the `.mp3` file. You give it a title (“SongName - Artist”), maybe a tag (“anime OST”), and a description.
3. The file manager stores the file and returns a unique ID (e.g., `f47ac10b-58cc-4372-a567-0e02b2c3d479`).
4. Back in the Music Library’s “Add Song” form, you search for the file by title or tag, select it, and the song record simply saves that ID.
5. When you press Play, the audio player calls the file manager with that ID and streams the file.
6. Across all apps — Expense Tracker (receipt images), Notebooks (embeds/attachments), Contact Manager (profile pictures) — you reuse the same upload flow and referencing pattern.

**Problem Validation**
- **What real-world friction does this address?**
  Building multiple personal apps that all need file storage would otherwise mean duplicating upload UIs, storage logic, and dealing with files scattered in different folders or databases. Manually linking them is messy.
- **Is it a surface symptom or a root cause?**
  Root cause: A mono-repo of tools needs a shared infrastructure layer to stay clean and avoid reinventing the wheel. This is an architectural necessity, not a nice-to-have.
- **What happens if you don’t build it?**
  Each app will implement its own file handling, leading to redundant code, inconsistent metadata, and possibly files that can’t be reused across apps. You’ll spend more time managing duplication than building features.
- **The “to-do app lesson” check:**
  This isn’t an over-engineered solution to a behavior problem; it’s a technical foundation that directly enables all your other ideas. As long as you keep it simple — upload, tag, search, serve — it will save you work. The only risk is if you build a massive enterprise-grade DAM; keep it minimal and it’s pure value.

**Open Questions / Decisions**
- **Storage backend**: local disk (on the ASP.NET server), or cloud blob storage (Azure, S3)?
- **Referencing strategy**: GUID vs. auto-increment integer? (GUID is safer for import/export).
- **Tag system**: same shared tag module used across all apps, or a simple string array on the file record?
- **File size limits** and **allowed MIME types** — necessary to define early.
- **Security**: all uploads are personal; do you need any authentication or is this local/trusted only?
- **Integration API**: direct service call from React, or through a REST endpoint?

**Potential Features to Explore**
- Duplicate detection (hash-based) to avoid storing the same file twice.
- Thumbnail generation for images/videos.
- Soft delete with trash bin to recover accidentally removed files.
- File versioning (e.g., updating a profile picture without breaking old references).
