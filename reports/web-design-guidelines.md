# Web Interface Guidelines review

Skill: `web-design-guidelines` (Vercel), installed with `npx skills add vercel-labs/agent-skills --skill web-design-guidelines -a claude-code` (telemetry disabled). Rules fetched from `vercel-labs/web-interface-guidelines/main/command.md` on 2026-10-19 and applied to `src/`.

## Fixed during the review

- `src/layouts/Base.astro`: `<main tabindex="-1">` removed; the skip link targets `#main` without making the whole main region a focusable box with a focus ring.
- `src/styles/global.css`: negative letter-spacing on H1 removed (the brief rules out letter-spaced text).
- `src/lib/content.ts`: hyphenated compounds (cross-border, sovereign-linked, co-investments) kept on one line so no line ends on a hanging hyphen.

## Passing

- Skip link to `#main`; one H1 per page; headings in order (H1, H2, H3); landmarks: header, two labelled navs, main, footer.
- Visible `:focus-visible` outline everywhere (2 px #2A4520, white on the footer); no `outline: none`.
- Every `<img>` has `width` and `height`; decorative logos have `alt=""` with the name on the link; the one content photograph (Firm, behind the rights flag) has written alt text.
- Motion: one CSS animation, `transform` and `opacity` only, disabled under `prefers-reduced-motion`; no `transition: all`.
- Fonts: regular Latin file preloaded, `font-display: swap`, metric-matched fallback.
- `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs; lining tabular figures for addresses and clocks; old-style figures in prose.
- Clocks use `Intl.DateTimeFormat` with IANA zones; no `aria-live`.
- `scroll-padding-block-start` set for anchor targets (What we do sections).
- No zoom blocking in the viewport meta; `theme-color` matches the white ground.
- No forms, no click handlers on non-interactive elements; all navigation is `<a>`.
- No horizontal scroll at 320, 375, 768 or 1440 px (checked by `scripts/screenshot.mjs`).

## Not applied, with reasons

- Title Case headings, second-person copy: the brief sets sentence case and the firm's own "we" voice.
- `touch-action: manipulation`, `-webkit-tap-highlight-color`: no custom tap targets; browser defaults are appropriate with `width=device-width`.
- `translate="no"` on the brand name: the name appears as a logo image in the header and footer; in prose it is left translatable so machine translation reads naturally.
- Forms, virtualisation, hydration rules: not applicable (static pages, no forms, no client framework).
