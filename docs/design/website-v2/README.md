# Strata website v2: handoff package

This is everything needed to rebuild the marketing website on the v2 design (dark, Scope 360-style layout; Strata logo and cobalt pattern kept).

| Folder or file | What it is |
|---|---|
| `PROMPT.md` | The prompt to paste into Claude in your website repo |
| `SPEC.md` | Build spec: tokens, components, every section's layout, copy, behaviour and responsive rules, SEO, motion, acceptance checklist |
| `screens/` | 19 screenshots at 1440 px: every section plus the extra tab states (W3 risk/ledger, W5 five features, W6 three snippets) |
| `source/` | The design boards' HTML (exact inline values and sample data). Reference only, not runnable |
| `tokens/` | `tokens.json`, `tokens.css` (CSS variables plus base classes), `theme.js` (Tailwind or MUI theme values) |
| `assets/` | Logo mark (cobalt, white), app tile, dark lockup, cobalt pattern tile |
| `icons/` | 39 stroke icons (24 px, stroke 1.6, currentColor) |

**How to use it**
1. Copy this folder into the repo as `docs/design/website-v2/`.
2. Open Claude Code in the repo and paste `PROMPT.md`.
3. Approve its plan, then review the foundations, then each section against `screens/`.

**Still to decide** (they show as [placeholders]):
- the domain;
- prices and plan limits;
- FAQ answers 2–6;
- the fail-open or fail-closed rule;
- SDK names and languages;
- which payment providers to name.

**Live design:** https://claude.ai/artifact/2XnALuFArjifvpPvNg2HxN, page "V2 · Website".
