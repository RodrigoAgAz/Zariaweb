# Zaria Capital website: design

## Positioning
A discreet presence, not a services brochure. The model is the small elite boutique: Robey Warshaw's one page (what the firm does, an address, an email), Zaoui & Co's single paragraph and founders' background. The site therefore has **one page** (statement, the firm, the founder, contact) plus the legal pages the law requires, linked from the footer. No team page, no service catalogue, no client types beyond one sentence, no numbers.

## Structure
1. **Header**: white horizontal logo (white mark below 768 px), links to the three sections of the home page (The firm, Founder, Contact), EN / ES. On the home page it sits over the hero; elsewhere on the dark green ground.
2. **Hero**: the Madrid photograph, tinted with the house green (#1B331B at 74%), with the H1 "Independent advice and investment." and the three corridors beneath it, separated by hairlines. Square crop on the Metrópolis dome and Gran Vía below 768 px.
3. **The firm**: three short paragraphs, third person.
4. **Founder**: name and the founder's own three-paragraph background (photo beside it once supplied, in black and white).
5. **Contact**: both offices with a map link each, and the general email.
6. **Footer**, dark green: white logo, legal links, the no-offer line, regulatory sentences once supplied, copyright.

Inner (legal) pages open with a dark green band carrying their H1 and the Z diagonal, tone on tone, at the right.

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
| Small (footer) | 15 to 16 px | | |

## Layout and colour
Content up to 1440 px wide with a 20 to 96 px gutter; sections use a 12-column grid from 1024 px (heading in columns 1 to 4, text in 5 to 12). Square corners, no shadows, no gradients, 1 px hairlines.
- Dark ground #1B331B (header, page openings, hero, footer); white headings and links; #EEF2EB text; #BFBFBF secondary.
- Light ground #FFFFFF; headings #1B331B; body #333333; links #2A4520 underlined.
- Gold: not used. The single gold rule lived on the old hero diagonal and went with it.

## Motion
One moment: the Z diagonal on the legal page openings settles into place along its own angle on load (CSS only). Nothing moves under `prefers-reduced-motion`.

## Pages

| Page | English | Spanish |
|---|---|---|
| Home | `/` | `/es/` |
| Legal notice | `/legal-notice/` | `/es/aviso-legal/` |
| Privacy | `/privacy/` | `/es/privacidad/` |
| Cookies | `/cookies/` | `/es/cookies/` |
| Regulatory information (published only once an entity's details or regulatory sentence are supplied) | `/regulatory/` | `/es/informacion-regulatoria/` |
