# Zaria Capital website: design

## Positioning
A discreet presence, not a services brochure. The model is the small elite boutique: Robey Warshaw's one page (what the firm does, an address, an email), Zaoui & Co's single paragraph and founders' background. The site therefore has **one page** (statement, the firm, the founder, contact) plus the legal pages the law requires, linked from the footer. No team page, no service catalogue, no client types beyond one sentence, no numbers.

## Structure
1. **Header** on the dark green ground: white horizontal logo (white mark below 768 px), links to the three sections of the home page (The firm, Founder, Contact), EN / ES.
2. **Hero**, dark green (#1B331B, the logo ink): the H1 "Independent advice and investment.", the three corridors beneath it separated by hairlines, and the two offices with their live local time along the bottom. The Z diagonal sits behind it in #2A4520, tone on tone, cropped by the hero edges, with the one gold rule on its edge.
3. **Madrid photograph**, full width (21:9 from 768 px, a square crop on the Metrópolis dome and Gran Vía below).
4. **The firm**: three short paragraphs.
5. **Founder**: name, title, three-sentence background.
6. **Contact**: both offices with a map link each, and the general email.
7. **Footer**, dark green: white logo, legal links, the no-offer line, regulatory sentences once supplied, copyright.

Inner (legal) pages open with the same dark band carrying their H1.

## Type
One family, **Zaria Serif** (EB Garamond files until the Perpetua WOFF2 files are supplied), regular and italic only, no bold, no sans-serif, no uppercase.

| Role | Mobile | From 768 px | From 1440 px |
|---|---|---|---|
| H1 (home) | 40 px | fluid | 104 px at 1920 |
| H1 (legal pages) | 40 px | fluid | 84 px |
| H2 | 32 px | 44 px | 52 px |
| H3 | 24 px | 30 px | 30 px |
| Corridors, lead, section text | 21 to 22 px | 26 px | 28 to 36 px |
| Body | 18 px | 20 px | 21 px |
| Small (footer, clocks) | 15 to 16 px | | |

## Layout and colour
Content up to 1440 px wide with a 20 to 96 px gutter; sections use a 12-column grid from 1024 px (heading in columns 1 to 4, text in 5 to 12). Square corners, no shadows, no gradients, 1 px hairlines.
- Dark ground #1B331B (header, page openings, hero, footer); white headings and links; #EEF2EB text; #BFBFBF secondary.
- Light ground #FFFFFF; headings #1B331B; body #333333; links #2A4520 underlined.
- Gold #B28B33: one rule, in the hero only.

## Motion
One moment: the hero diagonal settles into place along its own angle on load (CSS only). Nothing moves under `prefers-reduced-motion`.

## Pages

| Page | English | Spanish |
|---|---|---|
| Home | `/` | `/es/` |
| Legal notice | `/legal-notice/` | `/es/aviso-legal/` |
| Privacy | `/privacy/` | `/es/privacidad/` |
| Cookies | `/cookies/` | `/es/cookies/` |
| Regulatory information (published only once an entity's details or regulatory sentence are supplied) | `/regulatory/` | `/es/informacion-regulatoria/` |
