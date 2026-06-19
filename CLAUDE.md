# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Oscar is a **prompt generator** for architecture renders, not an image generator. It is a
pure client-side SPA (Vite + React + TypeScript + Tailwind) with **no backend and no API
calls**. The user picks a scenario, tunes bounded settings, and the app assembles an
English text prompt they paste into a free Google UI (Gemini app / AI Studio) together
with their own image. The roadmap (free prompt generator → paid Nano Banana Pro direct
generation → ControlNet geometry-preserving pipeline) is in `README.md`.

## Workflow for new functionality

Follow this sequence for any new functionality request. Do not skip ahead to coding.

1. **Plan first.** Sketch an execution plan describing how you intend to implement the
   request and present it to the user. Ask the user to confirm the plan makes sense before
   continuing.
2. **Then unit tests.** After the user confirms the plan, suggest that unit tests be
   written and ask the user for high-level test suggestions, or whether they do not want
   unit tests. Only start coding after the user confirms the tests make sense, or that
   tests are not necessary.
3. **Then code.** Implement according to the confirmed plan.
4. **Then verify.** After coding, run the unit tests if any were written. If any test
   fails, iterate on the code until the tests pass.

## Commands

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc --noEmit && vite build  (this is the ONLY check; see below)
npm run preview  # serve the production build
```

There is **no linter and no test framework configured**. `npm run build` is the gate:
`tsc --noEmit` runs first, so a type error fails the build. `tsconfig.json` has
`noUnusedLocals`/`noUnusedParameters` set to **false**, so unused symbols do not fail.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes to
GitHub Pages at `https://luccareinehr.github.io/oscar/`. `vite.config.ts` uses a
**relative `base` on build** so assets resolve under that subpath; do not change it to an
absolute base. Pushing to `main` is the intended deploy mechanism (the repo is a personal
project, not trunk-protected).

## Architecture

The whole app is data-driven from a few small modules. To add or change behavior you
almost always touch the same set of files together.

- **`src/lib/prompts.ts` is the core value.** `buildPrompt(scenario, settings)` assembles
  the "sober but not bland" prompt: `PREAMBLE` (rich-but-restrained quality contract) +
  the scenario body + a fidelity-lock line + a quality line + output spec + `NEGATIVE`
  (the explicit "don'ts"). Fragment helpers (`lightingFragment`, `vegetationFragment`,
  etc.) turn enum settings into prose. Tuning render quality means editing this file, not
  the UI.

- **Scenarios are plugins.** Each `src/scenarios/<id>.ts` exports a `ScenarioDef`
  (`id`, `label`, `blurb`, `fields`, `buildBody`). `src/scenarios/index.ts` aggregates them
  into `SCENARIOS` and defines `DEFAULT_SETTINGS`. The `fields: FieldKey[]` array is what
  drives which controls `SettingsPanel` renders for that scenario; there is one shared
  `Settings` object (`src/lib/types.ts`) and each scenario reads only the subset it lists.

- **i18n: UI is translated, the generated prompt is not.** `src/i18n/strings.ts` is a flat
  `pt`/`en` dictionary; `LanguageContext` exposes `t(key)`; **Portuguese is the default**
  (persisted to localStorage). Critical: option/label *display text* is translated via
  `t('opt.<field>.<value>')`, but the underlying enum *value* stays English and is what
  feeds `buildPrompt`. The prompt output is intentionally **always English** (most reliable
  for the Gemini image model). Do not translate `buildBody` output.

- **Generation is explicit, never automatic.** `App.tsx` holds a `generated: string | null`.
  The prompt only appears when the user clicks "Generate prompt". Any edit to scenario,
  settings, or custom text clears `generated` (via `changeScenario` / `patch` /
  `changeCustom`) so a stale prompt is never shown. `loadItem` sets state directly and
  deliberately keeps its saved prompt. Saved prompts persist through `src/lib/store.ts`.

- **Design system.** Monochrome dark, serif (Cormorant Garamond for display, EB Garamond
  for body, loaded from Google Fonts in `index.html`). `src/index.css` defines the
  `.glass`, `.glass-soft`, and `.eyebrow` (tracked-uppercase) component classes used across
  panels. The header photo is a real asset (`src/assets/hero.jpg`) imported through Vite
  (needs `src/vite-env.d.ts`). All other graphics are inline line-art SVG (`Logo.tsx`,
  `icons.tsx`, `illustrations.tsx`).

## Conventions and gotchas

- **Comments describe what the code does or why a non-obvious decision was made**, never
  its history, origin, or relation to a request. Never write "(existing)", "(new)",
  "(added for X feature)" and the like; that context belongs in commit messages, not
  source code. No emojis in comments.
- **No em dashes** anywhere: UI copy, prompt text, and code comments. Use commas, colons,
  or parentheses instead.
- **Do not modify existing code that is not directly required by the task.** This includes
  rewriting comments, renaming variables, reformatting, or any other cosmetic change. If
  existing naming or comments are notably poor, flag them in the review summary instead of
  changing them unilaterally.
- **`<select>` must use `appearance-none`** plus the custom chevron in `ui.tsx`; native
  macOS select chrome otherwise overrides the styling.
- In `SettingsPanel.tsx` the `opts()` helper requires `as const` on its value arrays so TS
  keeps the literal union type instead of widening to `string` (which breaks the typed
  `onChange`).

### Adding a setting/option

Add the enum to `src/lib/types.ts`, handle it in `prompts.ts` (a fragment) or the relevant
scenario `buildBody`, add the control in `SettingsPanel.tsx`, add the field key to the
scenario's `fields` array, and add `field.*` / `opt.*` keys in **both** `pt` and `en` in
`strings.ts`.

### Adding a scenario

Create `src/scenarios/<id>.ts` exporting a `ScenarioDef`, register it in
`scenarios/index.ts`, add `scenario.<id>.label` / `.blurb` strings (pt + en), and add an
illustration entry to the `MAP` in `illustrations.tsx`.
