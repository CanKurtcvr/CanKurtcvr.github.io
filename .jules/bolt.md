## 2026-10-05 - Heavy 3D and Charting Libraries Monolithically Bundled on Landing
**Learning:** In single-page React portfolio applications, embedding heavy 3D game engines (Three.js/p5) and charting libraries (Recharts) inside secondary tab components leads to a massive ~3MB monolithic bundle loaded upfront, even when the user only visits the static CV landing page.
**Action:** Always code-split non-default tabs and heavy sub-features using `React.lazy()` at the page boundary, keeping the primary entry point lean (~500KB or less) while loading 3D assets and charts on demand.

## 2026-10-13 - Top-Level Imports in React.lazy Components Pollute Component Chunks
**Learning:** Even when a sub-feature (like `PongGame`) is wrapped in `React.lazy()`, top-level static imports (such as `import p5 from "p5"`) force the heavy 1MB library directly into that component's async chunk.
**Action:** Dynamically import single-use heavy libraries inside lifecycle hooks (`import("p5")` inside `useEffect`) using type-only imports for TypeScript definitions (`import type p5Type from "p5"`). This keeps component chunks ultra-light (~4KB) and defers heavy library execution until mount time.
