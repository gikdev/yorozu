# 万 (Yorozu)

My awesome all-in-one tool.

## 📋 Prerequisites

- [Bun](https://bun.sh/)
- [Taskfile](https://taskfile.dev/)

## ⚡ Quick Start (The "Zero-Config" Path)

```bash
task app:setup
task app:dev
```

## 🧭 Development Workflow

### The Golden Rule: API Changes
We commit the `openapi.yaml` directly, so:
1. If the backend changes, pull the latest code or update the YAML manually.
2. Run `task api:generate` to regenerate the TypeScript client.
3. Run `task quality:type-check` to make sure nothing has broken on the frontend side.

### Available Commands

All commands are discoverable by running:

```bash
task list
# or
task --list
```

## 📝 Architecture Decision Records (ADRs)

Major technical choices are documented in `docs/adr/`. Start reading with `ADR-001`.
