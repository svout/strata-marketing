# Strata marketing website v2: build spec

The v2 redesign of the Strata Home page. It is dark and quiet, using the Scope 360 site's layout language. The Strata logo and the cobalt pattern are carried over from v1.

The design source is the canvas https://claude.ai/artifact/2XnALuFArjifvpPvNg2HxN, page **"V2 · Website"**. Every section here has:
- a screenshot in `screens/`
- the board's HTML in `source/` (inline styles with exact values)

When this spec and a screenshot disagree, the `source/` file wins for numbers (sizes, colours, spacing) and this spec wins for behaviour.

---

## 0. Ground rules

- **Copy is final** unless it is in [square brackets]. Brackets mark a placeholder. Render it visibly (keep the brackets) so nobody ships it by accident.
- **No invented numbers.** Every amount, ID and time in the product mock-ups is sample data, and the page should say so where the design does (for example "SAMPLE").
- **British English** in copy (behaviour, colour, cheque).
- **One H1** per page: the hero headline. Each section gets one H2; cards get H3.
- **Desktop design width** is 1440 px, with a content column of 1200 px (`max-width: 1200px; margin: 0 auto; padding: 0 20px`). Every section must also work at 390 px. Responsive rules are in each section.
- **Scope 360 is the style reference only.** Do not copy its copy, logo, icons or images.

## 1. Foundations

The full token list is in `tokens/tokens.json` and `tokens/tokens.css`.

| Token | Value | Use |
|---|---|---|
| bg | #08090A | Page background everywhere |
| surface-1 | #0E0F11 | Cards, panels, product windows |
| surface-2 | #141518 | Inputs, inner cards, code cards |
| surface-3 | #1C1D21 | Selected tab, ghost button |
| line | #1F2125 | Hairlines between sections, table rows |
| line-strong | #2A2C31 | Input and ghost-button borders |
| text-1 / 2 / 3 | #F7F8F8 / #8A8F98 / #62666D | Primary, secondary (and the grey half of headings), labels |
| cobalt | #2B59FF | Accent button, logo tile, focus, glows |
| cobalt-light | #729EFF | Icons on dark, eyebrow text |
| cobalt-pale | #A1BBFF | Ledger IDs, info chips |
| approved / review / blocked | #56B683 / #FFCC00 / #F18169 | Decision chips, always on their tinted backgrounds |

**Card edge.** Use `box-shadow: inset 0 0 0 1px rgba(255,255,255,.06)`, or `.08` on floating panels. There are no solid borders on cards.

**Type.**
- Families:
  - Geist (400, 500, 600, 700) for everything.
  - Geist Mono (400, 500) for data, amounts, IDs and code.
  - The wordmark "strata" is Instrument Sans 600 with −0.05em tracking. Use the SVG in `assets/` where you can.
- Sizes:

| Style | Size | Weight | Tracking | Leading |
|---|---|---|---|---|
| Hero H1 | 76 | 700 | −0.055em | 1.0 |
| H2 | 44 (48 in Review and Developers) | 700 | −0.05em | 1.04 |
| Body / lede | 16 (18 in hero) | 400 | normal | 1.6, colour text-2 |
| Card title | 17–22 | 600 | — | — |
| Data | Geist Mono 12–13 | — | — | — |

**Two-tone headings** (the signature move). A heading is two sentences on two lines. One line is white (text-1) and the other grey (text-2).
- **White then grey:** used when the first line is the claim ("Give your agents a budget, / not a blank cheque.").
- **Grey then white:** used when the first line is a question ("Why did that payment stop? / Every decision explains itself.").

Each section below says which order it uses.

**Buttons.** All buttons are 40 px high, with 8 px radius, 16 px side padding and Geist 14/500.
- Primary: white with dark text.
- Accent: cobalt with white text. Used at most once per section.
- Ghost: surface-3 with a line-strong inset border.
- Link: text-1 followed by a grey "›".

**Chips and tags.**
- Decision chip: 22 px high, radius 6, a 6 px dot in front, 12/500, tinted background.
- Data tag: 20 px high, radius 4, Geist Mono 11.

**Cobalt pattern.**
- The pattern is a 96 px tile with three 48×18 pills (rx 9) at (36,14), (24,39) and (12,64), in #4169FF on a #2B59FF background (see `assets/pattern-tile-*.svg`).
- Scatter 4–6 "lit" pills: white at full or 60% opacity, and one #08090A pill.
- It is only ever used as a frame around a dark rounded container (hero, closing band, sign-in). Never put text directly on it.

**Icons.** Use 24 px stroke icons with stroke 1.6, round caps and `currentColor` (`icons/`). Replace them with your icon library's closest match if the repo has one (for example Lucide).

**Section rhythm.**
- A section has 120 px top padding and about 100–120 px bottom padding.
- Sections W3, W5 and W6 begin with a 1 px `line` hairline across the 1200 px column, as on Scope 360.

## 2. Page structure (Home)

| # | Section | Screenshot | Source |
|---|---|---|---|
| — | Nav (inside hero) | 01-hero.png | 01-hero.dc.html |
| W1 | Hero + product window | 01-hero.png | 01-hero.dc.html |
| W2 | Connect | 02-connect.png | 02-connect.dc.html |
| W3 | How it decides (tabs) | 03-how-it-decides*.png | 03-how-it-decides.dc.html |
| W4 | Review | 04-review.png | 04-review.dc.html |
| W5 | Features (vertical tabs) | 05-features*.png | 05-features.dc.html |
| W6 | Developers (tabs) | 06-developers*.png | 06-developers.dc.html |
| W7 | FAQ | 07-faq.png | 07-faq.dc.html |
| W8 | Pricing | 08-pricing.png | 08-pricing.dc.html |
| W9 | Closing CTA + footer | 09-cta-footer.png | 09-cta-footer.dc.html |

Build each section as its own component (for example `components/home/Hero.tsx`), with its copy and sample data in a typed constant at the top of the file or in `content/home.ts`.

---

## W1 · Hero (`01-hero.png`)

**Layout.**
- The full-width cobalt pattern sits behind everything.
- A dark container (`bg`, radius 24 24 0 0, edge shadow) starts 72 px from the top, 16 px in from both sides, and runs to the bottom of the section. The pattern shows as a frame around it.
- Above the container, centred over the pattern, is an **announcement pill**. It is 36 px high, radius 10, with background rgba(8,9,10,.55) and a 1 px white/18% border. Inside:
  - a small sub-pill "[logo mark] New" (white/14% background);
  - the text "Watch three payments go through Strata";
  - "›".

  It links to W3.

**Nav** (inside the container, 72 px high, 32 px side padding):
- Left: the logo (26 px tile and wordmark).
- Centre: "Product", "How it works", "Developers", "FAQ" and "Pricing" in text-2, 14 px, 32 px apart. They link to the section anchors.
- Right: a "Log in" link button, then a "Get started" primary button (36 px high).
- On scroll, the nav becomes sticky with a background of `rgba(8,9,10,.8)` and `backdrop-filter: blur(12px)`.

**Copy** (centred, 96 px below the nav):
- **H1** (white, 76 px, two lines): "Your agents can spend." / "You set the limits."
- **Lede** (18 px, text-2, max-width 600): "Spending controls for AI agents. Every payment is checked against your rules, scored for risk and recorded before any money moves."
- **Buttons:** "Request demo" (accent) and "Read the docs" (link).

**Product window.**
- It sits 560 px from the container top, with 84 px insets. It uses surface-1, radius 16, edge plus `0 -20px 80px rgba(43,89,255,.12)`.
- It shows a decisions table in the style of Scope's journal:
  - **Toolbar:** "[Workspace]" select, then on the right "Today · 20 Nov", "Search" and "Filters".
  - **Title row:** "Decisions", tabs Today / Week / Month / All / Custom, and chips "1,241 approved", "3 waiting", "40 blocked".
  - **Columns:** Agent (mono) · Decision (chip) · Time (mono, grey) · Merchant · Category (grey) · Amount (mono, right-aligned) · Risk (tag) · Ledger (mono, cobalt-pale).
  - **Rows:** 44 px each, with a 1 px top line.
- The ten sample rows are in `source/01-hero.dc.html`, starting with `agt_travel-booker · Approved · 14:02:11 · [Airline] · Travel · £412.00 · 0.08 · #1039`.
- A 260 px gradient from transparent to `bg` covers the bottom, so the table fades into W2.

**Responsive.**
- Below 900 px: the nav links collapse into a menu button and the H1 drops to 44 px.
- The product window keeps its desktop layout inside a box that scrolls sideways (min-width 900). On phones, show only 4 rows.

## W2 · Connect (`02-connect.png`)

- **H2** (centred, white then grey): "Start controlling agent spend in minutes." / "Put Strata in front of the rails your agents already pay through."
- **Rail row:** eight 56 px icon tiles (surface-2, radius 14, line-strong border) with 12 px labels below. The labels are Card issuing, Open banking, Payouts, Invoices, Wallets, Subscriptions, Marketplaces and Payment links.
  - These are categories, not partner logos; real logos only once a partnership exists.
  - The first tile is "selected": white icon, white label and a cobalt glow `0 0 24px rgba(43,89,255,.5)`.
- **Connector:** an 80 px tall SVG under the row. Each tile drops a 1.5 px line down and curves to the centre. The selected tile's line is cobalt and the others are line-strong. A single line then drops to a 3 px dot.
- **Connection panel:** surface-1, radius 20, padding 32, height 400. It has two columns: `1fr` and `420px`.
  - **Left column:**
    - Top: the label "Card issuing connection" (text-2).
    - Bottom: "**Strata in test mode. Every feature, free.** Connect a sandbox account, register an agent and watch real decisions on fake money." (the second sentence in text-2).
    - Then a "Get test keys" accent button.
  - **Right column:** an inner card (surface-2, radius 14) titled "Connection manager".
    - Label "Workspaces".
    - Rows "Production · 3 agents · live", "Test mode · 5 agents · sk_test_" (selected, surface-3) and "Staging · 2 agents".
    - Then "+ Add workspace".
- **Behaviour:** clicking a rail tile selects it, moves the glow and the cobalt connector line, and changes the left label to "<Rail> connection".
- **Responsive:** tiles in a 4×2 grid, connector hidden, panel stacked.

## W3 · How it decides (`03-how-it-decides.png`, `-risk.png`, `-ledger.png`)

Follows Scope's "Prefer to log trades by hand?" pattern.

- **Header:** a two-column grid (`1fr 380px`, gap 80).
  - Left H2 (grey then white): "Why did that payment stop?" / "Every decision explains itself."
  - Right paragraph (text-2): "Each payment runs through the mandate, the risk check and the ledger, in that order. What comes back is the decision, the reason, and the ledger entry that proves it."
- **Visual:** a 640 px tall stage with three layers.
  1. **Back layer:** a faded decisions table on the left (560 px wide, 55% opacity), with columns Agent / Side / Amount / Time and coloured arrows (↗ approved, ▲ review, ✕ blocked).
  2. **Middle layer:** a mask fading that table into `bg` on all edges.
  3. **Front layer:** a floating "Payment decision" panel on the right.
     - Size and style: 680 px wide, surface-1, radius 18, float shadow.
     - Header: "Payment decision", a "Review" chip, and "pay_8Hc2…" in mono on the right.
     - Four groups with Geist Mono values:
       - **Request:** Agent agt_procure-bot · Amount £9,800.00 · Merchant [Supplier] · Time 14:02:19.
       - **01 · Mandate:** Merchant allowed "in procurement-v3" ✓ · Per-payment cap £10,000 ✓ · Active hours Mon–Fri 07–20 ✓.
       - **02 · Risk:** Risk score "0.71 · unusual" ▲ (review colour) · Reasons "3× usual size · over daily cap".
       - **03 · Ledger:** Entry #1042 (cobalt-pale) · Hash · previous "91ab…3e ← a41f…9c" ✓.
     - Footer buttons: "Decline" (ghost, 34 px) and "Approve" (accent, 34 px).
- **Tabs** (below the stage): three equal columns.
  - Each tab has a title (16/500), a description (14, text-2) and a 2 px progress track (line-strong) with a white fill.
  - Tabs:
    - "01 Mandate": "Is the agent allowed to do this?"
    - "02 Risk": "Does this payment look normal?"
    - "03 Ledger": "Write the outcome down, chained."
- **Behaviour (this is the point of the section):**
  - The active tab's group in the panel gets `background: rgba(43,89,255,.08)` and an inset 2 px cobalt left bar. The other groups drop to 45% opacity, and Request stays at 80%.
  - The tabs advance by themselves every 5 s. The active progress fill animates from 0 to 100%, earlier tabs show full, later ones empty.
  - Clicking a tab jumps to it and restarts the timer.
  - Pause when the section is off-screen (IntersectionObserver).
  - With `prefers-reduced-motion`: no auto-advance and no fill animation.
- **Tabs are real buttons:** `role="tablist"`, `role="tab"` and `aria-selected`.
- **Responsive:** the header stacks, the faded table is hidden, the panel goes full width, and the tabs become a horizontal scroll row.

## W4 · Review (`04-review.png`)

Follows Scope's "AI that works with your expertise" pattern.

- **Background:** a 520 px gradient from #111A3D to transparent at the top of the section.
- **Header** (centred):
  - A 64 px icon tile (gradient #2A3A7A→#141B3A, radius 17) with the white logo mark and a cobalt glow.
  - H2 (48 px, white then grey): "Approvals that come to you," / "not a dashboard you have to watch."
  - Lede: "When a payment looks unusual, Strata pauses it and asks the right person, with the reasons, in one message."
  - A "See the review flow" primary button.
- **Panel:** a "Strata Review" conversation panel (surface-1, radius 20).
  - Header: logo tile, "Strata Review" and a "3 waiting" review chip.
  - Messages:
    1. **Left bubble (surface-2):** "**agt_procure-bot** wants to pay **£9,800.00** to [Supplier]." Then reasons "▲ Over the £5,000 daily cap" and "▲ About 3× this agent's usual size". Then tags "risk 0.71" (review), "mandate ✓" (approved) and "ledger #1042" (info).
    2. **Right bubble (cobalt):** "Approve once."
    3. **Left bubble:** "Approved by [name] at 14:04. Paid and recorded as #1043." (#1043 in mono, cobalt-pale).
  - Suggestion chips: "Approve once", "Raise daily cap to £10,000" and "Always ask for this supplier".
  - Input bar: "Reply, or ask why this payment was flagged…" with a 32 px cobalt send button.
- **Behaviour (optional, nice to have):** when scrolled into view, play the three messages in with a typing delay, like Scope's typing input.

## W5 · Features (`05-features.png` plus five `05-features-*.png` states)

Follows Scope's "Your trades, always in your pocket" pattern: vertical tabs with a showcase.

- **Grid:** `440px 1fr`, gap 80, vertically centred.
- **Left column:**
  - H2 (white then grey): "Everything around the payment," / "in one console."
  - Lede: "Set the rules, see the risk, approve what needs a person, and keep a record no one can quietly change."
  - A list of six items. Each has a 2 px left bar (white when active, line-strong otherwise) and a 17 px title (text-1 when active, text-3 otherwise). Only the active item shows its 14 px description.

| Item | Description | Panel shows (see screenshot) |
|---|---|---|
| Mandates | Decide what each agent may buy, where, and how much: per payment, per day and per month. | agt_travel-booker card: Flights / Hotels / Rail, caps £800 / £2,000 / review over £500, "Used today" bar 25% |
| Risk scoring | Every payment is compared with the agent's normal behaviour and scored, with reasons. | 20-bar histogram, last bar in review colour, tag 0.71, two ▲ reasons |
| Human review | Unusual payments wait for a person, who approves from their phone or inbox. | Notification card: "Strata · needs your approval", £9,800.00, Approve / Decline |
| Tamper-evident ledger | Every attempt, approval and rule change is hash-chained, so any edit shows. | Four ledger rows (#1043…#1040) and a green "Chain verified · every hash matches" bar |
| Webhooks | Your systems hear about every approval, block and review the moment it happens. | Four POST rows: decision.approved / review / blocked, review.resolved, each 200 |
| Test mode | Try every rule against fake payments with test keys. Same API, no real money. | Test-mode toggle, sk_test_••••3f9a, three simulated payments, "Simulated · no money moves" |

- **Right column:** a panel 720 px tall (surface-1, radius 24) with a soft cobalt radial glow in the middle. The top-left label reads "[tile] Strata console". The active feature's card floats in the centre (460 px wide, surface-2, radius 16, float shadow).
- **Behaviour:**
  - Click or press Enter to select an item.
  - Auto-advance every 6 s while in view (respect reduced motion).
  - The card cross-fades (200 ms) and rises 8 px.
- **Responsive:** the list becomes a horizontal pill row above the panel, and the panel height drops to auto.

## W6 · Developers (`06-developers.png` plus three `06-developers-*.png` states)

Also follows Scope's AI-section pattern.

- **Background:** a 560 px gradient from #101A3F to transparent at the top.
- **Header** (centred):
  - A 64 px tile (gradient #23252B→#141518) holding a cobalt-light `<>` icon, with a cobalt glow.
  - H2 (48 px, all white): "Built for the agent" / "you are writing."
  - Lede: "Put Strata in front of every payment with one call. Decisions, reasons and ledger IDs come straight back."
  - A "Read the quickstart" primary button.
- **Panel:** 1200×520, surface-1, radius 22.
  - Top-left: "[tile] strata · quickstart". Top-right: a small pause glyph.
  - In the centre floats a **code card** (760 px wide, surface-2, radius 16, float shadow):
    - Top bar: tags "Python", "TypeScript" and "Go", plus a copy icon.
    - Body: code in Geist Mono 14 / 1.8. Comments are text-3, strings approved-green, numbers review-yellow.
    - Footer: "Response" plus key/value chips.
- **Tabs below** (four columns, the same component as W3):

| Tab | Description | Code | Response chips |
|---|---|---|---|
| Send a payment | One call, one decision. | `decision = strata.pay(agent="agt_procure-bot", amount=9800_00, currency="GBP", merchant="[supplier_id]")` | outcome review · layer risk · ledger #1042 |
| Handle a review | Hear when a person decides. | `@app.post("/strata/webhooks") def on_event(event): if event.type == "review.resolved": release_order(event.payment_id, event.outcome)` | event review.resolved · outcome approved |
| Verify the ledger | Prove nothing was edited. | `report = strata.ledger.verify(since="2026-11-01")` | verified true · entries [n] |
| Test mode | Same API, fake money. | `strata = Strata(api_key="sk_test_…")` then `strata.pay(...)` | mode test · outcome approved |

The exact line breaks are in `source/06-developers.dc.html`. The SDK method names are illustrative until the real SDK exists; keep them in one constant so they are easy to update.

- **Behaviour:** the same tabs logic as W3. Also: the language tags switch the snippet language (TypeScript and Go are placeholders for now, so show "[coming soon]"), and the copy icon copies the code to the clipboard.

## W7 · FAQ (`07-faq.png`)

- **Grid:** `420px 1fr`, gap 80.
- **Left column:**
  - H2 (white then grey): "Questions," / "answered."
  - Lede: "Can't find what you need? Talk to the people building Strata."
  - Buttons: "Talk to us" (ghost) and "Read the docs" (link).
- **Right column:** an accordion. Each row has a 1 px top line and 22 px vertical padding. The question is 17/500, with a "+" icon that becomes "×" when the row is open. Answers are 15 px, text-2, max-width 560. The first row is open by default.
  1. Does Strata hold our money? **No. Strata decides whether a payment may go ahead. Your existing payment provider still moves the money.**
  2. Which payment providers does it work with? [Supported providers]
  3. Can a person override a decision? [Answer: yes, through human review; confirm wording]
  4. How is the ledger tamper-evident? [Answer: each entry is hash-chained to the previous one; confirm wording]
  5. What happens if Strata can't be reached? [Product decision: fail closed or fail open]
  6. Is there a test mode? [Answer: yes, sk_test_ keys, same API, no real money]
- **Accessibility:** use `<details>`/`<summary>` or buttons with `aria-expanded`.
- **SEO:** add FAQPage JSON-LD only for answered questions.

## W8 · Pricing (`08-pricing.png`)

- **Header:**
  - H2 (centred, white then grey): "Simple plans that grow" / "with your agents."
  - A Monthly / Yearly segmented toggle; Yearly carries a "[−x%]" approved tag.
- **Cards:** three, gap 16. Each is surface-1, radius 20, padding 28. The middle card has a cobalt inset border, a `0 0 60px rgba(43,89,255,.25)` glow and a "Most popular" info chip.

| Plan | Price | Note | Button | Features |
|---|---|---|---|---|
| Sandbox | £0 forever | Test keys and fake money. Try every check. | Start free (ghost) | Test mode with all features · Up to [n] agents · Ledger and CSV export · Community support |
| Team | [£—] / month | For teams putting agents in charge of real spend. | Get started (primary) | Everything in Sandbox · Live payments · Human review by email and phone · Webhooks and reason codes · [n] seats |
| Enterprise | Custom | For larger teams with audit and security needs. | Talk to us (ghost) | Everything in Team · SSO and roles · Dedicated support · [Data residency options] |

- **Feature list:** each feature has a green check icon, 14 px, text-2.
- **Footnote:** "No card needed for Sandbox · cancel anytime · [prices to be decided]".
- **Toggle:** swaps the prices once real ones exist. Keep prices in data, not markup.

## W9 · Closing CTA + footer (`09-cta-footer.png`)

- **CTA band:** the cobalt pattern runs across the top 560 px. A dark container (radius 24, 16 px side insets, 420 px tall, starting 72 px down) holds, centred:
  - a 56 px glow tile with the cobalt-light logo mark;
  - H2 (56 px, white then grey): "Give your agents a budget," / "not a blank cheque.";
  - buttons "Get started" (primary) and "Request demo" (link).
- **Footer:** on `bg`, with a cobalt radial glow at the bottom: `radial-gradient(ellipse 70% 100% at 50% 100%, rgba(43,89,255,.35), transparent 70%)`.
  - **Grid:** `1.6fr` plus four equal columns.
  - **Brand column:** the large logo (48 px tile, 38 px wordmark) and "Spending controls for AI agents."
  - **Columns:**
    - Product: Mandates, Risk scoring, Human review, Ledger, Pricing
    - Developers: Docs, API reference, SDKs, Status
    - Company: About, Blog, Contact, Design partners
    - Join us: LinkedIn, X, GitHub
  - **Bottom row** (1 px top line, 13 px, text-3): "© 2026 Strata · All rights reserved" on the left and "Terms · Privacy · United Kingdom (English)" on the right.

---

## 3. SEO and meta (carry over from v1, update visuals)

- **Title:** "Strata | Spending Controls for AI Agent Payments".
- **Meta description:** "Strata checks every payment an AI agent tries to make against your rules, scores it for risk and records it on a tamper-evident ledger, before any money moves."
- **Canonical:** `https://[domain]/gb`. Add og:type/url/title/description/image and twitter:card `summary_large_image`.
- **OG image:** make a new one at 1200×630. Use the cobalt pattern frame with a dark container, the logo, and the H1 in white.
- **JSON-LD:** Organization, SoftwareApplication and WebSite. Add FAQPage once the FAQ answers are final.
- **Semantics:** use `<header>`, `<main>` and `<footer>`; give each section an `id` for nav anchors (#how-it-works, #developers, #faq, #pricing).

## 4. Motion summary

| Where | What | Reduced motion |
|---|---|---|
| Nav | Background blurs in on scroll | Instant |
| W1 | Product window rises 24 px and fades in on load | Static |
| W3, W6 | Tabs auto-advance (5 s), with an animated progress fill | No auto-advance |
| W5 | Feature cycle (6 s), card cross-fade | No auto-advance |
| W4 | Messages type in on first view | Shown at once |
| All sections | Content fades up 16 px on entering the viewport (once) | Static |

Use CSS transitions and IntersectionObserver. There is no need for a heavy animation library.

## 5. Acceptance checklist

- [ ] Every section matches its screenshot at 1440 px, within normal browser font rendering.
- [ ] Colours, radii and type come from tokens; there are no stray hex values in components.
- [ ] Geist and Geist Mono load, with system fallbacks.
- [ ] The W3, W5 and W6 tabs work by mouse and keyboard, auto-advance, and pause off-screen.
- [ ] Every page works at 390 px with no sideways page scroll; only the product table scrolls inside its own box.
- [ ] There is exactly one H1, every section has an H2, and there are no skipped heading levels.
- [ ] Text contrast is at least 4.5:1, including grey labels on surface-1.
- [ ] All [placeholders] are still visible, and none are filled with made-up facts.
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO 100.
