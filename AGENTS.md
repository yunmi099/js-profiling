# Repository Guidelines

These guidelines help contributors work consistently on this Node.js profiling project. Keep changes focused, reproducible, and easy to profile before/after.

## Project Structure & Module Organization
- `src/`: Runtime code (`index.js|ts`, `lib/`, `utils/`, optional `cli/`).
- `examples/`: Minimal apps to reproduce specific performance scenarios.
- `test/`: Unit/integration tests (`*.test.{js,ts}` or `__tests__/`).
- `scripts/`: Developer utilities (profiling helpers, cleanups).
- `profiles/`: Local profiling outputs (`.cpuprofile`, flamegraphs). Add to `.gitignore`.

## Build, Test, and Development Commands
- `npm i`: Install dependencies.
- `npm run dev`: Start local app (e.g., `nodemon src/index.js`).
- `npm test`: Run test suite once.
- `npm run test:watch`: Watch tests during development.
- `npm run lint` / `npm run format`: Lint and auto-format.
- `npm run build`: Compile TypeScript (if present).
- Profiling examples:
  - CPU: `node --cpu-prof src/index.js` (outputs to `profiles/`).
  - Inspector: `node --inspect-brk src/index.js` (attach Chrome DevTools).
  - Heap: `node --heap-prof src/index.js`.

## Coding Style & Naming Conventions
- Indentation: 2 spaces; max line length 100–120.
- Naming: `camelCase` for vars/functions, `PascalCase` for classes, `kebab-case` for files.
- Imports: path-aliases over deep relatives where configured.
- Tools: ESLint + Prettier. Run `npm run lint` and `npm run format` before pushing.

## Testing Guidelines
- Framework: Jest or Vitest; target ≥80% coverage for touched code.
- Naming: mirror source paths; use `*.test.{js,ts}`.
- Fast tests: avoid real network and timers; prefer fakes.
- Run: `npm test` (CI), `npm run test:watch` locally.

## Commit & Pull Request Guidelines
- Commits: Conventional Commits (`feat:`, `fix:`, `perf:`, `test:`, `docs:`, `chore:`). Present tense, short subject, details in body.
- PRs: clear description, motivation, and risk; link issues; include profiling evidence (before/after flamegraph or `.cpuprofile` summary) when performance-related; add screenshots for CLI/outputs; update docs.

## Security & Configuration Tips
- Do not commit secrets; provide `.env.example` and use `dotenv` locally.
- Add `profiles/` and large artifacts to `.gitignore`.
- Avoid exposing `--inspect` to public interfaces; bind to `127.0.0.1`.

## Profiling Workflow
1) Create a minimal case in `examples/`. 2) Capture baseline (`profiles/baseline-*`). 3) Change code. 4) Reprofile and compare. 5) Summarize findings in the PR.

