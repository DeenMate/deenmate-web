---
name: component-conventions
description: Component rules for the DeenMate website — server-first, tokens, variants, RTL-safe primitives. Use when creating or modifying shared components in src/components/.
---

# Component Conventions

1. **Server components by default.** `"use client"` only for genuine interactivity (state, effects, browser APIs) — and as deep in the tree as possible, with a one-line justification comment at the directive.
2. **Placement**: shared UI in `src/components/<domain>/`; page-private pieces stay co-located next to their `page.tsx`. Promote to shared only on the second real use — no speculative generalization.
3. **Styling**: Tailwind utilities driven by the tokens in `tailwind.config` (single source — no arbitrary hex values in components; extend the theme instead). Logical properties only (`ms-/me-/ps-/pe-`, `text-start/end`, `rtl:` variants for the rare unavoidable mirror). Dark mode via the `dark:` variant from day one.
4. **Variants** via a single `cva`-style pattern (or plain discriminated props) — no boolean-prop explosions (`isBig isGreen isOutline`).
5. **Text**: components receive translated strings or a message key via next-intl — a shared component never calls a hardcoded literal into the DOM.
6. **Arabic/Quranic text** gets dedicated typographic components (proper font stack, line-height, `lang` + `dir` attributes) — never raw `<p>` for scripture; and scripture content itself always arrives from the API layer (org Correctness Law).
7. **Accessibility is part of the component contract**: interactive components ship with keyboard handling, ARIA where semantics don't suffice, and visible focus styles — reviewers treat their absence as a defect, not a polish item.
8. **Testing**: logic-bearing components (formatting, variants, state machines) get a colocated `.test.tsx`; purely presentational ones don't need tests, they need the RTL/a11y check.
