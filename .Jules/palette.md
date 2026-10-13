## 2025-02-23 - WAI-ARIA Tab Navigation Keyboard Support
**Learning:** In tab lists with `role="tablist"` and `role="tab"`, setting `tabIndex={isActive ? 0 : -1}` is not sufficient for complete accessibility unless arrow key navigation (`ArrowRight`, `ArrowLeft`, `Home`, `End`) is explicitly handled to move focus and activate tabs seamlessly according to WAI-ARIA patterns.
**Action:** Always implement a `handleKeyDown` event handler on `role="tab"` buttons when building custom tab navigation components to ensure keyboard users can switch tabs using arrow keys.

## 2025-05-18 - WCAG Label-in-Name & Container ARIA Overrides
**Learning:** Adding `aria-label` overrides to interactive elements (like buttons or link cards) that already have visible text causes speech-recognition and WCAG 2.5.3 (Label-in-Name) failures, and strips internal semantic elements (such as `<h3>` tags).
**Action:** Preserve visible text as the accessible name for buttons/links. Only add `focus-visible` styling for visible focus indicators and `aria-hidden="true"` to purely decorative icons inside visible text buttons.
