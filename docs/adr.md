# ADR Log

- Commitizen for commits
  - **Because**: Consistent commit messages, automatic organization! no need to waste brain energy! 🥳

- Taskfile for automation
  - **Because**: No more messy `package.json`s, and no platform difference! (TaskFile in C#, TS, Rust, etc.)

- Monorepo structure (api/ + web/)
  - **Because**: All of project in one Git repo.

- SQLite for local development (instead of Docker/PostgreSQL)
  - **Because**: Zero setup, no Docker needed, single `.db` file, use the app like a desktop app!

- Biome for linting + formatting (frontend)
  - **Because**: 10x faster, single config file, easier to understand & work with than that "ESLint" monster.

- CQRS with MediatR (backend)
  - **Because**: Thin controllers, finally some way of thinking about the app layer that my brain can digest!

- OpenAPI specification committed to Git (`web/openapi.yaml`)
  - **Because**: Setup works without backend running. Backend -> poof, `git diff` -> why?.

- Scalar.AspNetCore for API docs
  - **Because**: Cleaner UI, Swagger UI dead!

- Bun as package manager and runtime
  - **Because**: Freakingly faster & better UX.

- Entity Framework Core with PostgreSQL (prod) + SQLite (local)
  - **Because**: Code-first migrations, LINQ support, works with both DBs.

- Zustand for global state management
  - **Because**: Lightweight, simple API, no boilerplate like Redux. Works great for side projects.

- TanStack React Query for server data fetching
  - **Because**: どんなバカ writes fetch by hand???

- TanStack React Router
  - **Because**: TYPE-SAFE EVERYTHING, file-based routing, better DX than React Router.

- Tailwind CSS for styling
  - **Because**: Fast dev, CSS=🤢.

- Zod for runtime validation
  - **Because**: TYPE-SAFE validation. Works with API responses, forms, and environment variables.

- TanStack React Form for form handling
  - **Because**: TYPE-SAFE. AWESOME mental model when it comes to forms. AWESOME control over the form.

- Axios for HTTP requests
  - **Because**: Interceptors for auth tokens, automatic JSON parsing, cleaner error handling.

- Phosphor Icons
  - **Because**: Cleaner design, better React integration, Figma version.
