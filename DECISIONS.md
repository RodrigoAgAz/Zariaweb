# Decisions

Newest first. Decisions taken by the owner are marked **(owner)**; defaults taken by the build are marked **(build)**.


## 2026-10-20 (evening)

- **English only (owner).** The Spanish site is removed: no `/es/` pages, no language switch, no hreflang, one share image. Old `/es/` links should redirect to the homepage (`public/_redirects`; on the live Apache host this needs the same rule in `.htaccess`).
- **The network replaces the spokes (owner).** Routes no longer all start in Abu Dhabi: 21 routes link the eleven cities to one another and may cross; each has its own light, and directions are mixed so lights cross the map both ways. Routes are listed in `scripts/map/gen-routes.mjs`, which writes the paths and their timing.
- **Corridors no longer change the map (owner).** The three corridors are a plain list; the map always shows the whole network. The toggle, its script and the dimming rules were removed.
- **Repetition removed from What we do and Founder (owner request).** "Companies, families and institutions" and "complex cross-border situations" now appear once (the opening statement); "cross-border" no longer recurs in the service texts; the relationships line stays only in the founder's lead; Principal Investing no longer repeats its own list ("joint ventures, co-investments, operational involvement") or its title. New wording for the client to approve (Advisory and Principal Investing revised again at the owner's request): Advisory "Counsel to owners and boards, from the first conversation to the close"; Financing "Capital for transactions, from investors and lenders across the firm's three corridors"; Principal Investing "The firm's own capital, invested in Spain and Abu Dhabi, with a seat at the table"; founder lead "Advises and invests across Southern Europe and Latin America, the Middle East and the United States, much of it originating from relationships built over more than twenty years."
- **Arsenale Group: Italy (owner).**

## 2026-10-20 (later)

- **Final city list (owner):** Abu Dhabi, Madrid, Washington, New York, San Francisco, Mexico City, Bogotá, Guayaquil, Santiago, Lima, Buenos Aires. Washington added (United States corridor); nothing removed. On phones New York and Washington are about 7 px apart, too close for a label each, so they share one label, "New York · Washington". Labels were re-placed for both languages: on the Spanish map "Ciudad de México" had run off the phone's left edge and crossed its route on desktop.
- **Santiago label (build).** The owner's list says "Santiago de Chile"; the map keeps "Santiago", which is unambiguous beside Buenos Aires and fits the crowded Southern Cone.
- **Bogotá, Lima and Santiago added (owner).** Nine routes now leave Abu Dhabi; the three new cities join the Southern Europe and Latin America corridor. Positions come from the same projection as the original seven (`scripts/map/`). On phones the Abu Dhabi and Madrid labels drop from 44 to 36 map units, the largest size that fits beside Madrid between the New York, Mexico City and Bogotá routes.

## 2026-10-20 (owner review of the redesign)

- **Score not a target (owner).** The grounds blend stays; homepage Lighthouse accessibility stays at 96 for the reason below.
- **Routes radiate from Abu Dhabi (owner, departing from the handoff).** The map no longer draws one chain from Abu Dhabi to Buenos Aires: six routes leave Abu Dhabi, one to each city, each with its own travelling light. Corridor toggles: Southern Europe and Latin America lights Madrid, Mexico City, Guayaquil and Buenos Aires; the United States lights New York and San Francisco; the Middle East is the hub every route leaves from, so it keeps all of them lit. Labels were repositioned to clear the new lines.
- **Founder lead without a pronoun (owner).** "He advises and invests…" became "Advises and invests…", matching the Spanish, which already had no pronoun.
- **Legal notice, privacy and cookies pages removed (owner).** The footer carries the email, EN / ES, the disclaimer and the copyright; Regulatory information still appears once entity details are supplied. Risk recorded: LSSI-CE article 10 requires a Spanish business website to identify its owner, and a privacy notice is expected where personal data is processed (host logs, emails to the published address). The site sets no cookies, so the cookies page was not required. The `hosting` and `offices` settings, used only by those pages, were removed.
- **Scroll-linked map and header progress line fixed (build).** In the first redesign deploy they never ran in Chrome: the CSS minifier folded each `animation` shorthand and its `animation-timeline` into one declaration that browsers reject, so the map fell back to its timed draw and the lights stayed hidden; the section's `overflow: hidden` also made it a scroll container, which would have frozen the map's timeline. Both are fixed (animation longhands; `overflow: clip`).

## 2026-10-20 (homepage redesign, branch `redesign-homepage`)

- **Approved redesign implemented (owner).** The homepage follows the handoff pack (`PROMPT.md`, `HANDOFF.md`, mockups). It supersedes several earlier rules: letter-spaced caps are now used for navigation, labels and lists; ivory replaces white for the light sections; gold returns (route, rules, numerals); the header is fixed and condenses on scroll.
- **CSP unchanged in strictness (build).** The mockups' inline styles became classes and their scripts became bundled modules. The one inline script (the boot script that sets the `js` class and remembers the opening animation for the session) is hashed in `astro.config.mjs` from the same source string, because Astro does not hash `is:inline` scripts itself.
- **Map drawn as two SVG variants (build).** The desktop and phone mockups place labels, dot sizes and glow differently, so the map ships a desktop and a phone SVG over one dot-map image rather than rescaling one drawing.
- **No-JavaScript map (build).** The scroll-linked draw is applied only when JavaScript runs, so a page without it always shows the full route (acceptance checklist).
- **Grounds blend kept as specified; Lighthouse accessibility 96 (build, open for the owner).** The blend starts What we do and the footer on the previous section's colour, so a load-time audit sees dark text on dark green, and readers see reduced contrast while they scroll through each blend. The settled state passes everywhere. Lighthouse reaches 100 only if the blend is removed, or moved to an overlay the checker cannot read. The overlay would score 100 without changing what readers see, so it was not done.
- **Removed with the old homepage (build):** the separate founder file (`src/content/people/`), the Madrid photo band component, the `madridPhotoWebRights` setting (rights are confirmed and the photograph is now the hero) and the OG image generator (the share images come from the pack, one per language).

## 2026-10-19 (second owner review)

- **Hero rethought (owner).** A tall dark hero above a separate photo band looked odd. The Madrid photograph is now the hero itself, tinted with the house green, with the headline and corridors over it and the header on top.
- **No local times (owner).** The Madrid and Abu Dhabi clocks are removed.
- **One voice, no repetition (owner).** "The firm" is written in the third person to match the founder's bio; the separate "Founder and CEO" line under his name is removed because the bio opens with it.
- **Founder's bio is the owner's text (owner),** verbatim in English, translated into Spanish.
- **No founder photo (owner).** The site carries no photograph of the founder; the photo support was removed.

## 2026-10-19 (owner review of the live preview)

- **One page, not a brochure (owner).** The owner rejected the first preview (narrow column on wide screens, washed-out Z shape, timid type) and asked for a simpler site modelled on small elite boutiques, not used to sell services. Research (Robey Warshaw's single page; Zaoui & Co's short paragraph and founders page; Ondra's team page existing only because it has a team) led to: one home page with the statement, the firm, the founder and contact, plus legal pages in the footer. The Firm, What we do, People and Contact pages were removed.
- **No government or sovereign references (owner).** "Sovereign-linked institutions" and "sovereign-linked issuers" are removed everywhere; client types are reduced to one clause (companies, families and investors).
- **No placeholders on the site (owner).** Nothing the owner has not supplied is shown: sentences, rows and sections that need a missing value are left out, the Regulatory information page is published only once there is something to put on it, and the footer shows regulatory sentences only once supplied. The founder's office, languages and photo are not shown.
- **Dark green header, page openings and hero (owner direction, departing from the brief).** The brief kept dark green for the footer only; the owner found the white-ground version weak. The header and openings now sit on #1B331B with the kit's white logo files, and the Z diagonal is drawn tone on tone in #2A4520.
- **Madrid photograph on the home page.** Full width below the hero, with web rights confirmed.

## 2026-10-19 (after Checkpoint 2)

- **General email: info@zariacapital.es (owner).** Shown on Contact and the legal pages, and included in the JSON-LD.
- **No anti-impersonation note (owner).** The official-email-domains warning required by the brief is removed from Contact.
- **No Abu Dhabi street address (owner).** Contact shows "ADGM, Abu Dhabi, United Arab Emirates"; its map link searches for Abu Dhabi Global Market.
- **Madrid photograph: web rights held (owner).** Now published once, on the Firm page, with an art-directed square crop on narrow screens. The homepage stays typographic (Direction A).
- **Perpetua licence held (owner).** The switch needs the licensed WOFF2 files (regular and italic); until they are supplied the site stays on EB Garamond.
- **Hosting: GitHub Pages for now; production host to be decided (owner).** The privacy notice keeps a `[TBC]` for the host and its log details until then.

## 2026-10-19

- **Homepage direction: A, typographic (owner, Checkpoint 1).** White ground, one-sentence H1, the Z diagonal as the only graphic element. Direction B (Madrid and Abu Dhabi photographs meeting along a 56 degree seam) was built, screenshotted (`screenshots/checkpoint-1/`) and set aside: it depended on two images that cannot yet be published (Madrid web rights unconfirmed, no Abu Dhabi image), it made the largest paint a photograph, and a generic Gulf skyline would undercut the positioning. The Madrid photograph can still appear once on the Firm page when rights are confirmed (`madridPhotoWebRights` in `src/content/settings.yaml`).
- **Hosting: GitHub Pages preview, not Cloudflare (owner).** The preview is published from this private repository by GitHub Actions at `https://rodrigoagaz.github.io/Zariaweb/`. Consequences: GitHub Pages ignores `public/_headers` and `public/_redirects`, so the CSP is delivered as a `<meta>` tag (no `frame-ancestors`, which browsers ignore in meta), and HSTS, `X-Content-Type-Options` and `Permissions-Policy` cannot be set there. `public/_headers` and `public/_redirects` are kept for the production host. A GitHub Pages site is public even when the repository is private.
- **Brand kit supplied by upload (owner).** Copied into `/brand` unchanged, without `PROMPT.md`.
- **Network access (build).** The environment's network policy blocks `zariacapital.es`, so the WordPress page list for the 301 map could not be fetched; the README gives the steps instead.
- **Every preview page is noindex (build).** The brief requires noindex while any `[TBC]` remains; a preview on a github.io address should never be indexed at all, so preview builds are always noindex and only `npm run build:production` can produce indexable pages (and it fails while any `[TBC]` remains).
- **Font fallback naming (build).** Astro's Fonts API generates the metric-matched fallback (`size-adjust`, `ascent-override`, `descent-override` against Times New Roman) and names it itself, rather than "Zaria Serif Fallback". Behaviour is as the brief asks; only the internal name differs.
- **`public/logo.png` (build).** The JSON-LD `logo` needs a stable, unhashed URL, so the stacked logo PNG from the kit sits in `/public`. It is the only file there beyond favicons, manifest, OG image and robots.txt.
- **Spanish office name (build).** Spanish copy uses "Abu Dabi" (Fundéu/RAE spelling); English uses "Abu Dhabi". Flagged for the native-speaker review.
- **"Financing Solutions" wording (build).** The copy says Zaria "works on" capital formation and structured financing rather than "arranges" it, because "arranging deals in investments" is a defined regulated activity in ADGM and elsewhere. Regulatory counsel should confirm all three service descriptions.
