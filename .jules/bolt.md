## 2026-10-05 - Heavy 3D and Charting Libraries Monolithically Bundled on Landing
**Learning:** In single-page React portfolio applications, embedding heavy 3D game engines (Three.js/p5) and charting libraries (Recharts) inside secondary tab components leads to a massive ~3MB monolithic bundle loaded upfront, even when the user only visits the static CV landing page.
**Action:** Always code-split non-default tabs and heavy sub-features using `React.lazy()` at the page boundary, keeping the primary entry point lean (~500KB or less) while loading 3D assets and charts on demand.

## 2026-10-10 - Replacing Heavy Game Frameworks (p5.js) with Native 2D Canvas
**Learning:** Monolithic game/canvas libraries like p5.js add ~1MB of uncompressed JS to chunk sizes even for simple 2D games (like Pong). Native HTML5 2D Canvas with `requestAnimationFrame` provides identical smooth 60 FPS rendering, full touch/keyboard event handling, and particle VFX in <5KB of zero-dependency TypeScript.
**Action:** Replace heavy canvas wrappers like p5.js with native HTML5 2D Canvas for simple 2D games to achieve a 99.5% bundle reduction without sacrificing features or visual fidelity.
