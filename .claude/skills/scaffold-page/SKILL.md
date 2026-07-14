---
name: scaffold-page
description: Create a new page/route on the DeenMate website the born-clean way — locale routing, metadata, i18n messages, RTL check, sitemap. Use whenever adding a page, route, or landing section.
argument-hint: "<route path — page purpose>"
---

# Scaffold Page

Prereq: the Next.js scaffold exists (Stage 1+). If `package.json` is missing, stop — the site hasn't started yet.

1. **Route**: `src/app/[locale]/<route>/page.tsx` — server component. Dynamic segments typed; `generateStaticParams` for finite sets (locales × known slugs) so SSG applies.
2. **Metadata**: `generateMetadata` with localized title + description (from messages, not literals), OG tags, and canonical/hreflang alternates for all four locales.
3. **Strings**: create the message namespace in **all four** files (`messages/en.json`, `bn.json`, `ar.json`, `ur.json`) in the same commit. Untranslated entries get the English text plus a `"//TODO-translation"` sibling note — never a hardcoded string in the component, never a missing key (runtime error in strict next-intl).
4. **Layout & RTL**: logical Tailwind utilities only; run the page mentally (and, once tooling exists, visually) under `dir="rtl"` — flag any icon/arrow needing `rtl:` mirroring.
5. **Data**: if the page consumes the API, add/extend the typed function in `src/lib/api/` matching `../docs/contracts/` — with explicit loading/error/empty renderings. Religious content: API-only, explicit error state, never placeholder text.
6. **SEO plumbing**: add to the sitemap source; JSON-LD structured data if the page is content (article/FAQ); check heading hierarchy (exactly one `h1`).
7. **Accessibility pass**: landmarks, alt text, focus order, labels.
8. **Verify**: `npm run lint && npx tsc --noEmit && npm run build`; confirm the route renders in `en` and `ar` (RTL) at minimum. Report what's TODO-translation so the owner can commission real translations.
