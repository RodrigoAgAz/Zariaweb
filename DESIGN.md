# Zaria Capital website: design

The homepage follows the approved redesign handoff (`HANDOFF.md` and the `Main`, `Mobile` and `Share` mockups in the handoff pack). Where this file and the handoff differ, the handoff wins.

## Positioning
A discreet presence, not a services brochure. One page. No legal notice, privacy or cookies pages (owner decision); Regulatory information appears, linked from the footer, only once entity details are supplied. No team page, no addresses, no office times, no portrait, no contact form or call to action, no client names, no statistics.

## Structure (homepage)
1. **Header**, fixed: white horizontal logo, caps links (Where we work, What we do, Founder, Contact). English only. Transparent over the hero; after 120 px of scroll it condenses to a blurred deep-green bar with the Z mark and a gold reading-progress line. Below 860 px the links move into a full-screen menu. Without JavaScript the header is not fixed and the menu opens through its `#site-menu` anchor.
2. **Hero**: the Madrid photograph (slow 30 s zoom), tinted, with grain and a faint vertical grid; eyebrow "Advisory · Financing · Investing"; the H1 "Independent advice and *investment.*" rising line by line; the three corridors as a strip that advances every 6.5 s with a gold progress bar, plus the photo caption. On the first visit of a session a Z-shaped window opens onto the photograph (the opening animation); later visits skip it.
3. **01 Where we work** (dark green): "Three corridors. *One network.*", the dot map with the firm's network: 21 routes linking Abu Dhabi, Madrid, Washington, New York, San Francisco, Mexico City, Bogotá, Guayaquil, Lima, Santiago and Buenos Aires to one another, crossing freely, with lights running along them in both directions (on phones New York and Washington share one label); and the three corridors as a plain numbered list. The map always shows the whole network.
4. **02 What we do** (ivory): one statement and three numbered rows (Advisory, Financing, Investing) with italic gold numerals and a caps list each.
5. **03 Founder** (ivory): role, name, lead, Career and Boards lists.
6. **Footer** (deep green, also the Contact anchor): logo, email, the Regulatory information link once published, regulatory sentences once supplied, the disclaimer, copyright.

Regulatory information, when published, opens with a dark green band carrying its H1 and the Z diagonal.

## Type
One family, **Zaria Serif** (EB Garamond files until the Perpetua WOFF2 files are supplied), regular and italic, no bold, no sans-serif. The redesign introduces letter-spaced caps (12.5 px, 12 px on phones, 0.2 em tracking) for navigation, labels and lists, and italic gold numerals.

## Colour
- Deep green #0F1F10 (condensed header, footer), logo ink #1B331B (Where we work, menu), ivory #F4F1EA (What we do, Founder).
- Text on dark #F3F0E8, headings #F6F3EC, champagne #E9DCB8 for italic accents and the email.
- Gold: #C9A55A on dark (route, rules, progress), #9A7629 numerals and #7D6224 text on ivory (both pass contrast at their sizes).
- Square corners, no shadows, 1 px hairlines.

## Motion
CSS plus three small vanilla modules (`src/scripts/`); no libraries.
- Opening Z reveal (first visit per session), hero line rise, corridor strip.
- Map: where the browser supports scroll timelines, the routes draw with the scroll, one after another, and are complete before the map reaches the middle of the screen; the labels and lights follow. Elsewhere the routes draw in sequence when the map enters the viewport. Without JavaScript they are simply drawn. Each route's light runs from one city to the other, rests and repeats, timed to the route's length; directions are mixed so traffic crosses the map both ways. Routes and timings come from `scripts/map/gen-routes.mjs`.
- Sections morph in on scroll where scroll timelines are supported.
- `prefers-reduced-motion`: no intro, no zoom, no pulses, no auto-advance; everything is shown in its final state.

## Pages

| Page | Path |
|---|---|
| Home | `/` |
| Regulatory information (published only once an entity's details or regulatory sentence are supplied) | `/regulatory/` |
