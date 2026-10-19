# Decisions

Newest first. Decisions taken by the owner are marked **(owner)**; defaults taken by the build are marked **(build)**.

## 2026-10-19 (second owner review)

- **Hero rethought (owner).** A tall dark hero above a separate photo band looked odd. The Madrid photograph is now the hero itself, tinted with the house green, with the headline and corridors over it and the header on top.
- **No local times (owner).** The Madrid and Abu Dhabi clocks are removed.
- **One voice, no repetition (owner).** "The firm" is written in the third person to match the founder's bio; the separate "Founder and CEO" line under his name is removed because the bio opens with it.
- **Founder's bio is the owner's text (owner),** verbatim in English, translated into Spanish.
- **Founder photo.** The site shows it in black and white once the file is in `src/assets/people/`. The image could not be downloaded from here (the network policy blocks image hosts). If the chosen photo comes from a news site, its publisher or photographer owns it; use one the firm holds the rights to.

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
