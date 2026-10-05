## 2026-10-05 - Heavy 3D and Charting Libraries Monolithically Bundled on Landing
**Learning:** In single-page React portfolio applications, embedding heavy 3D game engines (Three.js/p5) and charting libraries (Recharts) inside secondary tab components leads to a massive ~3MB monolithic bundle loaded upfront, even when the user only visits the static CV landing page.
**Action:** Always code-split non-default tabs and heavy sub-features using `React.lazy()` at the page boundary, keeping the primary entry point lean (~500KB or less) while loading 3D assets and charts on demand.
