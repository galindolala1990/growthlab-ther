# Copilot Instructions for GrowthLab Figma Plugin

## Project Overview
- This is a Figma plugin for visualizing experiment flows (A/B, multi-step) as diagrams inside Figma.
- Main plugin logic is in `figma-plugin/`.
- UI is built with React + Tailwind CSS, bundled via Vite.
- Core data model: `model.ts` (ExperimentFlow, StepNode, VariantNode, Edge).
- Plugin entry: `code.ts` (handles Figma <-> UI messaging, persists model).
- UI entry: `ui.tsx` (React, posts messages to plugin code).

## Architecture & Data Flow
- `code.ts` listens for messages from the UI, updates the experiment model, and creates/updates Figma nodes using helpers in `figma-nodes.ts`.
- All experiment state is persisted in Figma's plugin data (`figma.root.setPluginData`).
- UI actions (e.g., create experiment) send messages via `parent.postMessage`.
- Data model is pure TypeScript (see `model.ts`).
- Node creation and layout logic is in `figma-nodes.ts` and `layout.ts`.

## Build & Development
- Build command: `npm run build` (runs Vite, outputs to `dist/`).
- UI HTML is referenced in `manifest.json` as `dist/ui.html`.
- No test suite is present (`npm test` is a placeholder).
- Hot reload is not configured; rebuild after changes.

## Patterns & Conventions
- All Figma node creation uses helpers in `figma-nodes.ts`.
- Data model changes should be pure functions in `logic.ts`.
- UI components use Tailwind CSS and are located in `src/` and root.
- Use `parent.postMessage({ pluginMessage: { type: ... } }, '*')` for UI -> plugin communication.
- Plugin messages are handled in a switch statement in `code.ts`.
- Use `figma.root.setPluginData` and `figma.root.getPluginData` for persistence.
- React components should be functional and use hooks if needed.

## Integration Points
- External dependencies: React, Tailwind CSS, Vite, Figma Plugin API.
- No backend or external API calls; all data is local to Figma.
- UI and plugin code communicate only via postMessage.

## Key Files
- `code.ts`: Plugin entry, message handler, persistence.
- `ui.tsx`: UI entry, React root, message sender.
- `model.ts`: Data model definitions.
- `logic.ts`: Pure functions for model manipulation.
- `figma-nodes.ts`: Figma node creation helpers.
- `manifest.json`: Figma plugin manifest.
- `vite.config.mts`: Vite build config.

## Example: Adding a Step
- UI posts `{ type: 'ADD_STEP', ... }` message.
- `code.ts` handles message, updates model via `addStepAfterVariant` in `logic.ts`.
- Model is persisted, Figma nodes updated.

---

If unclear or missing, ask for clarification or examples from the user. Update this file as project conventions evolve.
