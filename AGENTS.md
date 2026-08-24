# AGENTS.md

This file provides guidance to AI coding agents working with this repository.

## Project Overview

A set of basic `vite` configurations built for `react` project development, which can be extended to support TypeScript. Application built with **React 19 + TypeScript 6 + Vite 8**. Requires Node.js >= 22.22.1.

## Commands

```bash
pnpm install              # Install dependencies
pnpm dev                  # Dev server (port from env/.env.development, default 5000)
pnpm build                # Production build
pnpm preview              # Preview production build
pnpm test                 # Run tests (vitest, happy-dom)
pnpm test -- --run path/to/file.test.ts  # Run single test file
```

Vitest coverage is enabled by default. When running a small subset of tests locally, use `--coverage.enabled=false` if the tests pass but global coverage thresholds fail.

Pre-commit hooks run lint-staged (eslint --fix, prettier, stylelint). Commit messages **must follow Conventional Commits** (header and body lines max 150 chars).

## Tech Stack

- React 19 + TypeScript (strict mode)
- Vite 8 (configs in `build/`, not vite.config.ts)
- Tailwind CSS 4 (CSS-based in `src/styles/tailwind.css`, no `tailwind.config.*`) + SCSS
- Axios, lodash-es

## Architecture

### Key conventions

- Path alias: `@/` -> project root (`./`)
- Vite configs live in `build/`: `base.config.mts`, `dev.config.mts`, `prod.config.mts`, `helper.mts`
- Env files live in `envs/` (not project root): `.env` (shared) + `.env.<mode>` per build mode
- Common env vars: `REACT_APP_API_BASE`
- Component structure: `ComponentName.tsx` + `ComponentName.types.ts` + `index.ts` (barrel export), use `defineOptions({ name: 'ComponentName' })`

### Source structure

- `src/index.ts` - SPA app bootstrap
- `src/router/` - Route definitions and route names
- `src/apis/core/request.ts` - Axios instance and `wrapRequest()`
- `src/apis/<domain>/` - Per-domain API modules
- `src/types/` - Interfaces/enums by domain
- `src/utils/` - Pure utility functions
- `src/styles/` - Tailwind, SCSS entry, and base styles
- `src/components/` - Shared components
- `src/pages/` - Feature modules

### API response format

- Check `res.success` before accessing `res.data`. Do not rely solely on try/catch; the response interceptor handles errors and shows toast notifications.

## Testing

- Tests live in `tests/` and mirror `src/` structure. Uses vitest + happy-dom + @testing-library/jest-dom + @testing-library/react.
- Setup lives in `tests/setup.ts`
- Coverage uses `@vitest/coverage-v8`, thresholds 70%.
- Coverage excludes `apis/`, `types/`, `styles/`, `**/*main.ts`, `**/*types.ts`, `**/*index.ts`, `**/*.d.ts`, and test files.

### Testing patterns

- **Blackbox**: Test from the user's perspective. Use VTU methods (`find`, `trigger`, `setValue`, etc.) and avoid asserting internal state.
- **Mock API**: `vi.mock('@/apis/<domain>')` at module level. Use `{ success: true as const }` for WrapRequestResponse narrowing.
- **`defineModel`**: Always pass model value as prop in tests (parent is source of truth).
- **Entry files**: Prefer testing extracted helpers/components instead of `main.ts` bootstrap wiring.

## Coding Conventions

TypeScript strict mode, ESLint naming conventions, and Prettier formatting are enforced by linters.

- `any` is error level (`@typescript-eslint/no-explicit-any`). Avoid it.
- Interfaces: `StrictPascalCase` with `I` prefix.
- Enums: `const enum`, `UPPER_CASE` or `StrictPascalCase` members
- Naming: `strictCamelCase`, `snake_case`, `StrictPascalCase`, or `UPPER_CASE` (leading `_` allowed, trailing `_` forbidden)
- Type imports: use `import { IFoo }` (no `type` keyword)
- Equality: `===` only (`eqeqeq: error`), curly braces required for all blocks
- File size: `max-lines: 350`, `max-lines-per-function: 80` for all `src/` files (excluding `src/types/`, and `src/apis/`)
- `<script setup lang="ts">` always; scoped styles `<style lang="scss" scoped>`
- Commit messages: Conventional Commits, max 150 chars for header and body lines

## AI Agent Rules

- Follow this file and installed skills in `.agents/skills/` when applicable.
- Reuse existing components/utils first.
- Keep code style consistent with the project.
- Add comments for complex logic; use JSDoc for key functions.
- Do not modify core configs without confirmation; when the user explicitly asks for config changes, explain why and how they were validated.
- When committing as an AI agent, include a useful commit body for non-trivial changes; explain the why, key behavior change, and validation when relevant.
- When committing as an AI agent, add a `Co-Authored-By` trailer that matches the actual agent identity, for example `Co-Authored-By: Codex <noreply@openai.com>` or the equivalent Claude identity.
