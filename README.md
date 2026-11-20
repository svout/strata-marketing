# Strata marketing website

Next.js 15 (App Router) · TypeScript · MUI 9 · Tailwind CSS 4.

Design: **v2** (dark, Scope 360-style layout; Strata logo and cobalt pattern kept). The
handoff package is in `docs/design/website-v2/`: `SPEC.md` (copy, behaviour, responsive
rules), `screens/` (every section at 1440 px), `source/` (exact values), `tokens/`, `icons/`
and `assets/`. Live design: the canvas page "V2 · Website".

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Structure

```
src/
├─ app/                  Routes, layout (fonts, metadata), globals.css (tokens), OG images
├─ components/
│  ├─ containers/        Layout (header + main + footer), Section, Providers (MUI)
│  ├─ elements/          V2 (Btn, Chip, Tag, TwoTone, GlowTile, LogoTile, V2Section…),
│  │                     V2/client (Reveal, useAutoTabs, ProgressTabs, PauseButton),
│  │                     PatternFrame, Menu (header), Footer, Logo, CodeBlock, …
│  ├─ widgets/
│  │  ├─ Home/           W1 Hero, W2 Connect, W3 HowItDecides, W4 Review,
│  │  │                  W5 Features, W6 Developers, W8 Pricing
│  │  ├─ Faq (W7), ClosingBand (W9), PageHero, Plans: shared by every page
│  │  └─ Product*, Dev*, SecurityPage, Pricing, Blog, DemoPage: page sections
│  └─ icons/             v1 line icons (index.tsx) and the v2 set (v2.tsx, from docs/…/icons)
├─ config/               company.ts, navigation.ts (header + footer), tokens.ts, site.ts, blog.ts
├─ constraints/          Copy and sample data per page (home.ts is the v2 Home)
├─ hooks/                useInView, useReveal, usePrefersReducedMotion, useScrolled
├─ lib/                  theme.ts (MUI), ui.ts (button classes), og.tsx, seo.ts, jsonLd.tsx, blog.ts
└─ types/
```

## How styling is split

- **Tokens** live in `src/app/globals.css` as Tailwind v4 `@theme` variables. v2 names are
  used directly (`bg-bg`, `bg-surface-1`, `text-text-2`, `bg-cobalt`, `text-approved`,
  `rounded-button`, `shadow-edge`, `text-h2`…). The older semantic names (`bg-surface`,
  `text-fg-muted`, `bg-elevated`…) point at the v2 values, so v1-era components are dark
  too. Hex values are mirrored in `src/config/tokens.ts` (`v2`) for MUI and the social
  images. Change both together.
- **Type:** Geist (400–700) and Geist Mono from the `geist` package; Instrument Sans 600 (from
  `@fontsource/instrument-sans`, via `next/font/local`) only for the "strata" wordmark. All fonts
  are self-hosted: `next/font/google` + Turbopack breaks on Geist's Google URL. Every `h1`/`h2` is Geist 700 with −0.05em tracking (globals.css).
- **Two-tone headings:** `<TwoTone lines={[a, b]} order="claim" | "question" | "white" />`.
- **Buttons:** `<Btn variant="primary" | "accent" | "ghost" | "link">` for links, or
  `btn(variant)` from `lib/ui.ts` for anything else. MUI Buttons map onto the same looks.
- **Pattern:** `<PatternFrame>` draws the cobalt pattern as a frame around a dark container
  (heroes and the closing band). It is never used under text.
- **MUI** handles Tabs, Drawer and Accordion, themed in `src/lib/theme.ts` (dark). Its styles
  go into `@layer mui`, before Tailwind's utilities, so a `className` always wins.

## Content rules

Only claims that are true today. No invented statistics. Text in `[brackets]` is for the
owner to fill in and renders as written. Every amount, agent ID, time and ledger entry in the
product mock-ups is sample data. Prices live in `src/constraints/pricing.ts` (`PRICES`).

## Where v2 differs from the spec, and why

- **text-3** is `#7C8089`, not `#62666D`: the spec value measures 3.4:1 on the page
  background, below the checklist's 4.5:1.
- **W3:** inactive check groups turn grey instead of dropping to 45% opacity, and the Request
  group stays at full strength, so every label keeps 4.5:1 contrast.
- **W3, W5, W6** have a small pause button for the auto-advancing tabs (WCAG 2.2.2). It's
  hidden for visitors who prefer reduced motion, since nothing advances for them.
- **W8** shows the agreed pricing (Strata agents, Platform, Custom, plus Sandbox and
  Enterprise) in the v2 card style. The highlighted card says "Platform included", not
  "Most popular", which we can't back yet. Yearly prices are `[placeholders]`.
- **Nav:** "Log in" appears once `COMPANY.appUrl` is filled in. Footer and nav links with no
  page yet (About, Status, Terms, Privacy, GitHub…) render as plain text, not dead links.
  Security is added to the footer's Product column so the page stays reachable.
- **Canonical:** pages use their own path (e.g. `/`), not `/gb`; there's no locale routing.

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

## Blog

Posts are Markdown files in `content/blog/<slug>.md`; the slug is the URL (`/blog/<slug>`).
Start from `content/blog/_template.md`. Files starting with `_` are ignored.

- **Series** match the LinkedIn images: `build-notes` (ink), `build-log` (paper),
  `milestone` (cobalt). Each post's card, page header and social image use that surface,
  so a reader coming from LinkedIn sees the same post.
- **Drafts** (`status: draft`) show in `npm run dev` with a yellow banner, and are left out
  of production builds, the sitemap, RSS and `llms.txt`. Preview them in a production build
  with `BLOG_SHOW_DRAFTS=1`.
- **SEO:** each post gets its own title, description, canonical URL, `article` Open Graph
  tags, a 1200×630 social image, BlogPosting and breadcrumb JSON-LD, a sitemap entry with
  its own date, and an RSS item (`/blog/rss.xml`).
- Fill in `AUTHOR.linkedin` and `AUTHOR.x` in `src/config/blog.ts`: they turn on the
  "Follow on LinkedIn" buttons and the author profile in structured data.

### Publishing with LinkedIn

1. Write the long version in Obsidian (`Marketing/Posts/NN title.md`) and copy it into
   `content/blog/`. Use the same headline and supporting line as the LinkedIn image.
2. Set `status: published` and deploy.
3. Post on LinkedIn with the blog link in the first comment, using the UTM link from the
   draft banner (`?utm_source=linkedin&utm_medium=social&utm_campaign=<slug>`).
4. Paste the LinkedIn post URL into `linkedin:` and redeploy. The post then shows
   "Join the discussion on LinkedIn" and links the two versions in structured data.

