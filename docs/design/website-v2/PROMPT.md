# Prompt to paste into Claude (Claude Code, in your marketing website repo)

Before you start: unzip this folder into the repo as `docs/design/website-v2/` (or anywhere Claude can read it). Then paste the prompt below.

---

We're rebuilding the Strata marketing website on a new design (v2). The current site is the v1 design; keep the repo's stack, routing, SEO setup and deployment, and replace the visual design and the Home page sections.

Everything you need is in `docs/design/website-v2/`:
- `SPEC.md`: the build spec. Read it fully first; it is the source of truth for copy and behaviour.
- `screens/*.png`: a screenshot of every section at 1440 px, plus the extra tab states for W3, W5 and W6.
- `source/*.dc.html`: the design boards' HTML with exact inline values (sizes, colours, spacing, sample data). Use them to read exact numbers. They are NOT runnable as they are (they use a design-tool runtime), so don't copy them in wholesale.
- `tokens/tokens.json`, `tokens/tokens.css`, `tokens/theme.js`: design tokens.
- `assets/`: logo mark, tile, dark lockup and the cobalt pattern tile (SVG).
- `icons/`: the stroke icons used. Swap for our icon library's closest match if we have one.

How I want you to work:
1. First explore the repo and tell me in a few lines: the stack, where the Home page and its sections live, how styling and tokens are done now, and what you'll reuse. Then propose a short plan (files to add or change, in order) and wait for my OK.
2. Start with the foundations: fonts (Geist, Geist Mono, Instrument Sans for the wordmark only), tokens wired into our styling system (CSS variables plus theme config), and the base components (Button: primary, accent, ghost, link; Chip; Tag; Card; TwoToneHeading; Tabs with progress). Show me those before building sections.
3. Then build the sections in order W1 → W9, one per commit. Keep copy and sample data in typed content files, not hard-coded in JSX.
4. Keep every [placeholder] visible exactly as written. Don't invent numbers, partner names, prices or quotes.
5. After each section, compare it against its screenshot and list anything that differs. Run lint, typecheck and build before saying a step is done.
6. Finish with the checklist in SPEC.md section 5, and tell me which items pass and which don't.

Design canvas (for reference if you can open it): https://claude.ai/artifact/2XnALuFArjifvpPvNg2HxN, page "V2 · Website".
