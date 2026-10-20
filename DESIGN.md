# Zaria Capital website: design

The homepage follows the approved redesign handoff (`HANDOFF.md` and the `Main`, `Mobile` and `Share` mockups in the handoff pack). Where this file and the handoff differ, the handoff wins.

## Positioning
A discreet presence, not a services brochure. One page plus the legal pages the law requires, linked from the footer. No team page, no addresses, no office times, no portrait, no contact form or call to action, no client names, no statistics.

## Structure (homepage)
1. **Header**, fixed: white horizontal logo, caps links (Where we work, What we do, Founder, Contact), EN / ES. Transparent over the hero; after 120 px of scroll it condenses to a blurred deep-green bar with the Z mark and a gold reading-progress line. Below 860 px the links move into a full-screen menu. Without JavaScript the header is not fixed and the menu opens through its `#site-menu` anchor.
2. **Hero**: the Madrid photograph (slow 30 s zoom), tinted, with grain and a faint vertical grid; eyebrow "Advisory · Financing · Investing"; the H1 "Independent advice and *investment.*" rising line by line; the three corridors as a strip that advances every 6.5 s with a gold progress bar, plus the photo caption. On the first visit of a session a Z-shaped window opens onto the photograph (the opening animation); later visits skip it.
3. **01 Where we work** (dark green): "Three corridors. *One network.*", the dot map with the route Abu Dhabi, Madrid, New York, San Francisco, Mexico City, Guayaquil, Buenos Aires, and three corridor toggles that dim the other corridors.
4. **02 What we do** (ivory): one statement and three numbered rows (Advisory, Financing, Investing) with italic gold numerals and a caps list each.
5. **03 Founder** (ivory): role, name, lead, Career and Boards lists.
6. **Footer** (deep green, also the Contact anchor): logo, email, legal links, EN / ES, regulatory sentences once supplied, the disclaimer, copyright.

Inner (legal) pages open with a dark green band carrying their H1 and the Z diagonal.

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
- Map: where the browser supports scroll timelines, the legs draw with the scroll in route order and the labels follow; elsewhere the route draws in sequence when the map enters the viewport. Without JavaScript it is simply drawn.
- Sections morph in on scroll where scroll timelines are supported.
- `prefers-reduced-motion`: no intro, no zoom, no pulses, no auto-advance; everything is shown in its final state.

## Pages

| Page | English | Spanish |
|---|---|---|
| Home | `/` | `/es/` |
| Legal notice | `/legal-notice/` | `/es/aviso-legal/` |
| Privacy | `/privacy/` | `/es/privacidad/` |
| Cookies | `/cookies/` | `/es/cookies/` |
| Regulatory information (published only once an entity's details or regulatory sentence are supplied) | `/regulatory/` | `/es/informacion-regulatoria/` |
