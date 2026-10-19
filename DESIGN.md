# Zaria Capital website: design

## Direction
A restrained European partnership site. White ground, one house serif, hairlines, square corners. The boldness is spent in one place: the 56 degree diagonal of the Z, drawn as an independent device in a single pale tint. Everything else is quiet: confident short sentences, generous whitespace, left-aligned text, no imagery unless it is the house photograph.

Checkpoint 1 compared **A, typographic** (one-sentence H1 on white, the Z diagonal entering from the right) with **B, two cities** (Madrid and Abu Dhabi photographs meeting along a 56 degree seam, H1 below). **A was chosen**; see `DECISIONS.md` and `screenshots/checkpoint-1/`.

## Type
One family, **Zaria Serif** (EB Garamond files until the Perpetua licence is confirmed), regular and italic only. No bold, no sans-serif, no uppercase transforms, no letter-spacing tricks. Old-style figures in prose; lining tabular figures in addresses and clocks.

| Role | Mobile | Desktop (from 768 px) | Line height |
|---|---|---|---|
| H1 | 36 px (fluid) | 60 px at 1440 | 1.15 |
| Corridor list (home) | 28 px | 28 to 42 px, sized to its column | 1.2 |
| H2 | 28 px | 34 px | 1.2 |
| H3 | 22 px | 25 px | 1.25 |
| Lead | 20 px | 23 px | 1.45 |
| Body, nav | 18 px | 19 px | 1.5 |
| Small (footer, captions, clocks) | 16 px | 16 px | 1.5 |

Body measure is capped at 34em (about 66 characters). Headings use `text-wrap: balance`, paragraphs `text-wrap: pretty`.

## Space and layout
Scale (px): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Section spacing is fluid, 64 to 128 px. Page width 1240 px plus a gutter of 16 px at 320 px wide rising to 64 px. From 1024 px, content sections use a 12-column grid: the section heading in columns 1 to 4 and the content in columns 5 to 12. Below that everything is a single column. Separation is by 1 px hairlines (#BFBFBF) and whitespace; there are no cards, shadows or rounded corners.

## Colour (all values from `brand/tokens.css`)
- Ground #FFFFFF; one alternate band #F5F8F2 (Where we work).
- Headings #1B331B (logo ink); body #333333; small secondary #6B6B6B.
- Dark green #2A4520: links (always underlined in prose), focus rings, the footer band.
- Gold #B28B33: exactly one element, the short rule on the hero diagonal. Never text.
- Z device: #EEF2EB.
- Footer: #2A4520 ground, white text and links, #EEF2EB secondary, #4E7A3A hairline, white focus ring.

## The Z device
The mark's diagonals sit at 56 degrees (`--zc-angle: 56deg`). The site uses that geometry, never the logo artwork:
1. **Hero:** one wide diagonal running into the lower horizontal bar, in #EEF2EB, cropped by the hero's bottom and right edges so it reads as geometry, not as a second logo. A 2 px gold rule lies on its upper left edge.
2. **Section cuts:** the Where we work band and the footer have their top inline-start corner sliced at 56 degrees (`.cut-start`), like the end of the Z's lower bar.
3. **Corridors:** the three corridors on the home page are set large, one per line, and from 768 px each line steps in by `row height / tan(56°)`, so their left ends fall on the Z diagonal. Their size follows the column width (container query units), so the longest line and its indent always fit.

## Motion
One moment: on first load the hero diagonal settles 32 px down its own angle while fading in (1.4 s, CSS only). Nothing else animates. Under `prefers-reduced-motion: reduce` nothing moves. No JavaScript animation, scroll effects, parallax or video.

## Components
- Header: horizontal logo from 768 px, the mark below that; four nav items and an EN / ES switch. Below 768 px the nav sits on its own row under the logo (17 px type below 360 px so all four items fit at 320 px), so no menu button or JavaScript is needed.
- Inner pages: H1 and lead, then sections in the heading-left grid; legal pages use tighter section spacing.
- People: one row per person, photo in columns 1 to 4 (4:5, black and white), text in 5 to 12; a single founder reads as a profile, not a grid with one tile.
- Footer: the one dark band, white horizontal logo, nav, cities, regulatory sentences, legal links, copyright year computed at build.
- Office clocks: live local time from `Europe/Madrid` and `Asia/Dubai`, with text fallbacks when JavaScript is off.

## Route map
Defined once in `src/lib/routes.ts`; it drives page generation, the language switcher, hreflang and the sitemap.

| Page | English | Spanish |
|---|---|---|
| Home | `/` | `/es/` |
| Firm | `/firm/` | `/es/firma/` |
| What we do | `/what-we-do/` | `/es/que-hacemos/` |
| People | `/people/` | `/es/equipo/` |
| Contact | `/contact/` | `/es/contacto/` |
| Legal notice | `/legal-notice/` | `/es/aviso-legal/` |
| Privacy | `/privacy/` | `/es/privacidad/` |
| Cookies | `/cookies/` | `/es/cookies/` |
| Regulatory information | `/regulatory/` | `/es/informacion-regulatoria/` |
