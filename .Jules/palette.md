## 2025-02-23 - WAI-ARIA Tab Navigation Keyboard Support
**Learning:** In tab lists with `role="tablist"` and `role="tab"`, setting `tabIndex={isActive ? 0 : -1}` is not sufficient for complete accessibility unless arrow key navigation (`ArrowRight`, `ArrowLeft`, `Home`, `End`) is explicitly handled to move focus and activate tabs seamlessly according to WAI-ARIA patterns.
**Action:** Always implement a `handleKeyDown` event handler on `role="tab"` buttons when building custom tab navigation components to ensure keyboard users can switch tabs using arrow keys.
