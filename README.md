# Strata marketing website

Next.js 15 (App Router) · TypeScript · MUI 9 · Tailwind CSS 4.

Design source: the Strata vault (`Design/Marketing Website.md`, `Brand Guidelines.md`,
`Design Tokens.md`) and the design canvas, boards W1–W6.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Structure

```
src/
├─ app/                  App Router: layout (fonts, metadata), page.tsx (Home), globals.css (tokens)
├─ components/
│  ├─ containers/        Layout (header + main + footer), Section, Providers (MUI)
│  ├─ elements/          Button, Title, Overline, SectionHeader, Description, Logo,
│  │                     PillPattern, DecisionChip, Menu (header), Footer, If
│  ├─ widgets/           One per Home section: Hero, LiveDecision, Problem,
│  │                     HowStrataDecides, MandateSentence, Developers, Trust, CtaBand
│  └─ icons/             24 px line icons, 1.75 stroke
├─ config/               company.ts (facts, [placeholders]), tokens.ts (hex values for MUI)
├─ constraints/          home.ts: every piece of Home copy and sample data
├─ hooks/                useInView, useReveal, usePrefersReducedMotion, useIsMobile
├─ lib/                  theme.ts (MUI theme), OrganizationJsonLd
└─ types/
```

## How styling is split

- **Tokens** live in `src/app/globals.css` as Tailwind v4 `@theme` variables
  (`bg-surface`, `text-fg-muted`, `text-h1`, `rounded-lg`…). Hex values are mirrored in
  `src/config/tokens.ts` for the MUI palette. Change both together.
- **Section themes:** a section with `data-theme="dark"` (ink) or `"cobalt"` flips the
  semantic tokens inside it, so components need no "on dark" variants. `data-theme="light"`
  resets them for a white card placed inside a dark or cobalt section.
- **MUI** handles interactive components (Button, Tabs, Menu, Drawer, Accordion,
  ToggleButton), themed in `src/lib/theme.ts`. Its styles go into `@layer mui`, which sits
  before Tailwind's utilities, so a `className` always overrides MUI defaults.
- **Tailwind** handles layout, spacing and one-off styling.

## Content rules

Only claims that are true today. No invented statistics. Text in `[brackets]` is for the
owner to fill in. Most of it is in `src/constraints/home.ts` and `src/config/company.ts`.
All amounts, agent IDs and ledger entries on the page are sample data, labelled SAMPLE.

## Pattern

`<PillPattern>` draws the shifted-pill field as one SVG `<pattern>` (96 px tile, 64 px
below `md`), centred on the page, with optional lit pills placed by tile column/row.
Its rules are in the vault, under Marketing Website → Pattern system.

## Request demo form

The form on `/demo` posts to `/api/demo`, which validates it and forwards the JSON to
`DEMO_FORM_WEBHOOK_URL` (Slack, Zapier, a CRM...). Copy `.env.example` to `.env.local`.
Without the variable, development accepts the request without sending it; production
answers 503 so the form shows an error instead of a false "sent".

## SEO

- **Domain:** set `NEXT_PUBLIC_SITE_URL` (or fill `COMPANY.url`). Until then every page is
  `noindex` and `robots.txt` disallows everything, so a preview can't be indexed by accident.
  Staging deployments set `NEXT_PUBLIC_NOINDEX=1`.
- **Metadata:** each page calls `pageMetadata()` from `src/lib/seo.ts` (title, description,
  canonical, Open Graph, Twitter). Titles and descriptions live with the page copy
  (`homeMeta`, `productMeta`… in `src/constraints/`): titles ≤ 60 characters, descriptions ≤ 160.
- **Generated files:** `sitemap.xml`, `robots.txt`, `manifest.webmanifest` and `llms.txt` are
  built from `ROUTES` in `src/config/site.ts`; add new pages there. Each route has an
  `opengraph-image.tsx` (shared design in `src/lib/og.tsx`).
- **Structured data** (`src/lib/jsonLd.tsx`): Organization and WebSite on every page,
  BreadcrumbList on inner pages, SoftwareApplication on `/product`, FAQPage for the FAQs.
  Placeholder values and unanswered FAQ items are left out automatically. Only mark up what
  is visible on the page.
