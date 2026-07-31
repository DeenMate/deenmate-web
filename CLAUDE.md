# DeenMate Web — Claude Code Project Guide

Marketing site + future SEO content platform for DeenMate at `deenmate.app`. Inherits the org constitution at `../CLAUDE.md` (Islamic Correctness Law, Worldwide Law, API Contract Law).

> **STATUS: PRE-SEEDED, NOT STARTED (build begins Stage 1).** What exists today is a static Coming-Soon page (`index.html` + `styles.css` + `script.js`, GitHub Pages, CNAME `deenmate.app`) — keep it live and untouched until the real site replaces it. These standards exist so the site is **born clean**; don't scaffold without an approved plan task.

## Stack decision (owner-approved 2026-07-11)

**Next.js (App Router) + TypeScript + Tailwind CSS + next-intl.**
Rationale: SEO/SSG for a content-heavy site; first-class locale routing + RTL; the team already runs TypeScript (backend) and Next.js 15 (admin dashboard). Rejected: Astro (weaker ecosystem alignment), SvelteKit (new stack surface). Revisit only via a stage-transition review.

## Born-clean laws (enforced from the first commit)

1. **i18n-first**: NO hardcoded user-facing strings, ever — every string goes through next-intl messages from day one, with **en/bn/ar/ur parity** (org Worldwide Law). Locale-routed paths (`/en/...`, `/bn/...`, `/ar/...`, `/ur/...`) with `hreflang` alternates.
2. **RTL-first**: `dir` set per locale at the root layout; **CSS logical properties only** (`ms-`/`me-`/`ps-`/`pe-` Tailwind utilities, `text-start`/`text-end`) — physical `ml-/mr-/pl-/pr-/text-left/text-right` are banned. Every component must render correctly in ar before it's done.
3. **SEO-first**: every page defines Metadata (title/description/OG) via the Metadata API; sitemap + robots generated; semantic HTML; structured data (JSON-LD) on content pages; Core Web Vitals budget: LCP < 2.5 s, CLS < 0.1 on 4G.
4. **Accessibility**: WCAG AA — landmarks, focus states, contrast, alt text, keyboard navigation.
5. **Contract consumption**: all API data comes from `api.deenmate.app` per `../docs/contracts/` — one typed client module (`src/lib/api/`), no ad-hoc `fetch` shapes scattered in components. Religious content rendered from the API only — never inlined/hardcoded scripture (org Correctness Law; error states are explicit, never placeholder verses).
6. **Design tokens**: Tailwind theme configured from a single tokens file. Open item: reconcile the current web brand purple `#5b44ff` with the app design system (Emerald `#2E7D32` / Gold) — a design decision for the owner at scaffold time, not something to decide silently.

## Conventions (when the scaffold exists)

- Structure: `src/app/[locale]/<route>/page.tsx`; shared UI in `src/components/` (server components by default, `"use client"` only with a reason); utilities in `src/lib/`.
- Commands (standard — confirm at scaffold): `npm run dev` · `npm run build` · `npm run lint` · `npm test`.
- Skills: `scaffold-page` (new pages the born-clean way), `component-conventions`. Agents: `web-coder`, `web-reviewer`.
- Workflow: `web-implement` (at `../.claude/workflows/`) handles planned `[web]` tasks — batched code+review plus RTL/i18n and WCAG gates. It is **stage-gated**: it returns `stage-gated` without spawning anything unless `stageOpen: true` is passed explicitly, because this repo is pre-seeded/not-started and web tasks belong in the plan Backlog. Its agents are still repo-scoped here; per the 2026-07-19 consolidation rule they move to the root `.claude/agents/` when the stage opens (agent discovery walks up, never down), so until then run this workflow from inside `deenmate-web/`.
- Hooks are templated and **self-disabling**: they no-op until `package.json` exists, then enforce lint/format on edit and tests on Stop automatically.
