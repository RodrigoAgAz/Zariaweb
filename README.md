# Zaria Capital website

The public website of Zaria Capital: a static, bilingual (English and Spanish) site built with [Astro](https://astro.build) 7. No CMS, no forms, no cookies, no database, no third-party requests.

- **Preview:** `https://rodrigoagaz.github.io/Zariaweb/` (GitHub Pages, every page `noindex`). See [Deploy](#deploy).
- **Design:** [`DESIGN.md`](DESIGN.md). **Decisions:** [`DECISIONS.md`](DECISIONS.md).
- **Screenshots:** [`screenshots/`](screenshots/) (every page at 375, 768 and 1440 px). **Audits:** [`reports/`](reports/).

## Before launch: what is still missing

The site shows `[TBC: …]` wherever Zaria Capital has not yet supplied information. The production build refuses to finish while any remains. Every value is entered in **one file**, [`src/content/settings.yaml`](src/content/settings.yaml), except the founder's details, which are in [`src/content/people/alonso-aznar.yaml`](src/content/people/alonso-aznar.yaml).

| Missing input | Where it appears (English / Spanish) | Where to enter it |
|---|---|---|
| Regulatory sentence for the Spanish entity | Footer of every page; Regulatory information | `entities.spain.regulatoryStatement` (en and es) |
| Regulatory sentence for the ADGM entity (FSRA authorisation and activities, or what it is if not authorised) | Footer of every page; Regulatory information | `entities.adgm.regulatoryStatement` (en and es) |
| Spanish entity registered name | Legal notice, Privacy, Regulatory / Aviso legal, Privacidad, Información regulatoria | `entities.spain.legalName` |
| NIF/CIF | same three pages | `entities.spain.taxId` |
| Registered address | same three pages | `entities.spain.registeredAddress` |
| Registro Mercantil details | Legal notice, Regulatory | `entities.spain.registry` (en and es) |
| ADGM entity legal name, registration number, address | Regulatory / Información regulatoria | `entities.adgm.*` |
| General contact email | Contact, Legal notice, Privacy (and JSON-LD once supplied) | `email` |
| Official email domains (anti-impersonation note) | Contact / Contacto | `officialEmailDomains` |
| Abu Dhabi street address (also enables its "View on map" link) | Contact / Contacto | `offices.abuDhabi.streetAddress` |
| Hosting provider, and its log retention, location and transfer safeguard | Privacy / Privacidad | `hosting.provider`, `hosting.logDetails` |
| Founder's headshot, office, languages | People / Equipo | `alonso-aznar.yaml`: `photo`, `office`, `languages` |
| Telephone per office (optional: omitted, not shown as TBC) | Contact | `offices.*.phone` |
| Confirmation of web rights to the Madrid photograph (optional: the site works without it) | Firm / Firma, once enabled | `madridPhotoWebRights: true` |
| Perpetua web-font licence, or decision to stay on EB Garamond | Every page | See [Switching to Perpetua](#switching-eb-garamond-to-perpetua) |
| Production domain (zariacapital.es and/or .com) | Canonicals, hreflang, sitemap, OG tags | `site` in `astro.config.mjs` (currently `https://zariacapital.es`) |
| Team beyond the founder | People / Equipo | [Adding a person](#adding-a-person) |
| Designer's master logo file (AI, EPS, PDF or SVG) | Header, footer, 404, OG image | Replace the files in `brand/logo/` (the current wordmark is traced from the deck artwork) |

## Pre-launch sign-offs (outside this build)

1. **A Spanish lawyer** reviews the Legal notice / Aviso legal, Privacy / Política de privacidad and Cookies pages in both languages (LSSI-CE, GDPR, LOPDGDD).
2. **Regulatory counsel in Spain and in ADGM** confirms that the three service descriptions (Strategic Advisory, Financing Solutions, Principal Investing) and the regulatory sentences are appropriate for a public website. Note: the copy deliberately says Zaria "works on" financing rather than "arranges" it, because arranging is a defined regulated activity; counsel should confirm or correct this.
3. **A native Spanish speaker** reviews all Spanish copy (`src/content/pages/es/`, `src/content/ui/es.yaml`, the Spanish bio). Points to check: "empresarios" for *principals*, "instituciones vinculadas a Estados" for *sovereign-linked institutions*, "Inversión directa" for *Principal Investing*, the loanword "joint ventures", and "Abu Dabi" (Fundéu spelling) versus "Abu Dhabi".
4. **Alonso Aznar approves his bio** (both languages) and the home page founder line.

## Run, build, deploy

Requires Node 22.

```sh
npm ci
npm run dev                # local development at http://localhost:4321
npm run build              # preview build: every page noindex; [TBC] allowed
npm run build:production   # production build: fails while any [TBC] remains; pages indexable
npm run build:audit        # local Lighthouse runs only: like preview but without noindex. Never deploy.
```

`ZARIA_BASE` sets the path the site is served from: `/` in production (default), `/Zariaweb/` on the GitHub Pages preview.

### Checks

```sh
npm run build:audit && npm run serve   # serves dist/ on :4322 applying dist/_headers, like a static host
npm run check:csp                      # every page: CSP violations, console errors, third-party requests, cookies
npm run screenshots                    # every page at 375, 768 and 1440 px into screenshots/
npm run lighthouse                     # Lighthouse mobile and desktop for every page into reports/
```

Screenshots and Lighthouse use the Chromium at `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`; set `CHROMIUM_PATH` / `CHROME_PATH` to use another.

### Deploy

**Preview (GitHub Pages).** `.github/workflows/deploy.yml` builds with `ZARIA_BUILD=preview` and `ZARIA_BASE=/Zariaweb/` and publishes on every push to `main`. One-time setup by the repository owner: *Settings → Pages → Build and deployment → Source: GitHub Actions*. Publishing Pages from a private repository needs a paid GitHub plan, and the published site is public (anyone with the link can open it) even though the repository is private.

GitHub Pages limitations, accepted for the preview only:
- It ignores `public/_headers` and `public/_redirects`. The Content-Security-Policy is still enforced through a `<meta>` tag Astro generates with script and style hashes, and the referrer policy through `<meta name="referrer">`. HSTS, `X-Content-Type-Options`, `Permissions-Policy` and `frame-ancestors` cannot be set on GitHub Pages.
- No server-side redirects.

**Production.** Use a static host that honours `_headers` (Cloudflare Pages, Netlify or similar). Build with `npm run build:production` and publish `dist/`. After each build, `dist/_headers` contains the full CSP (the union of every page's hashes, plus `frame-ancestors 'none'`), HSTS, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options` and long-lived caching for `/_astro/*`.

**Header verification.** The headers could not be verified on a deployed host: GitHub Pages does not serve them, and the session had no access to Cloudflare. They were verified locally with `scripts/serve.mjs`, which applies `dist/_headers` the way a static host does: all five headers present, 19 pages loaded with no CSP violations, no console errors, no third-party requests and no cookies (`npm run check:csp`). Repeat that check against the production host after the first deploy, and confirm in the browser's storage panel that the host sets no bot-management cookies (on Cloudflare, keep Bot Fight Mode and similar cookie-setting features off).

### Yearly rebuild

The footer reads "© {year} Zaria Capital", with the year computed at build time. The deploy workflow also runs on a schedule at 00:05 UTC on 1 January (`cron: '5 0 1 1 *'`), so the year changes without anyone pushing. On a production host, add the equivalent: a deploy hook called by a scheduled job on 1 January (for example a GitHub Actions workflow with the same cron that `curl`s the host's deploy-hook URL, stored as a repository secret).

## Editing content

All copy lives in `src/content/`, separate from the components.

- `src/content/pages/en/*.yaml` and `src/content/pages/es/*.yaml`: one file per page per language. Each has `title`, `description` (must be 140 to 160 characters; the build fails otherwise) and `h1`, then the page's sections.
- `src/content/ui/en.yaml`, `es.yaml`: navigation labels, footer and other interface text.
- `src/content/settings.yaml`: the owner inputs listed above.
- In paragraph text you can write `[link text](https://…)`, `*italic*`, and `{tokens}` such as `{email}` or `{spainName}` that pull in owner inputs (the full list is in `src/lib/tokens.ts`).

Copy rules (from the brief): only the facts the firm has approved; no clients, deals, numbers or rankings; no em or en dashes; typographic quotes and apostrophes; "Zaria Capital", never "Zaria Capital Partners"; no "leading", "premier", "world-class".

### Adding a person

1. Add a black and white headshot to `src/assets/people/` (portrait, at least 720 × 900 px; the site crops to 4:5 and renders AVIF/WebP).
2. Copy `src/content/people/alonso-aznar.yaml` to `src/content/people/<first-last>.yaml` and fill in `order` (display order; the founder is 1), `name`, `photo` (e.g. `../../assets/people/first-last.jpg`), `title`, `office`, `languages` and a 2 to 4 sentence `bio`, each in English and Spanish. No personal emails or phone numbers.
3. Build. The People page lists everyone in `order`.

### URLs

Every URL in both languages is defined once in `src/lib/routes.ts`. That map generates the pages, the language switcher, `hreflang` links, navigation and `sitemap.xml`. To rename a URL, change it there and add a redirect for the old one to `public/_redirects`.

## Switching EB Garamond to Perpetua

The site declares one family, "Zaria Serif". Until the Perpetua web licence (Monotype) is confirmed, its files are EB Garamond (SIL Open Font License, `src/assets/fonts/OFL-EB-Garamond.txt`), self-hosted, regular and italic, Latin and Latin Extended subsets.

To switch: put the licensed Perpetua WOFF2 files (regular and italic, Latin and Latin Extended subsets) in `src/assets/fonts/` and change the four `src` paths in the `fonts` block of `astro.config.mjs`. Nothing else changes: the metric-matched fallback is regenerated from the new files, and only the regular Latin file is preloaded. Never add a `local("Perpetua")` source: visitors with Microsoft Office have Perpetua installed and would see a different version from everyone else.

## WordPress cut-over plan

The current zariacapital.es runs on WordPress. This build does not touch its DNS or hosting.

1. **List the old URLs.** Fetch `https://zariacapital.es/wp-json/wp/v2/pages?per_page=100` and `/wp-json/wp/v2/posts?per_page=100` (and the sitemap at `/wp-sitemap.xml` if present), and note every public URL, including `/en/` or language-prefixed variants. This could not be done from the build environment, whose network policy blocked the domain.
2. **Map them** in `public/_redirects`, one line each, to the nearest new page with status 301 (e.g. `/about-us/ /firm/ 301`, `/servicios/ /es/que-hacemos/ 301`). Send anything without an equivalent to the home page of its language. The old News/Insights link pointed to `#` and needs no redirect.
3. **Deploy to the production host** on its temporary address. Run `npm run check:csp` against it and check every redirect.
4. **Check other subdomains** (mail, webmail, `www`, any client portals) before adding `includeSubDomains` to HSTS. The shipped header is `max-age=31536000` without `includeSubDomains`; add it, and consider preload, only once every subdomain serves HTTPS.
5. **Switch DNS** for `zariacapital.es` (and `www`) to the new host, keeping MX and other mail records unchanged. Keep the WordPress site available on another address for a few weeks, then retire it.
6. **After launch:** submit `https://zariacapital.es/sitemap.xml` in Google Search Console and Bing Webmaster Tools. If `.com` is owned, redirect it with 301s to the `.es` equivalents.

## Images, fonts and licences

| Asset | Source | Licence / status |
|---|---|---|
| Logos (`brand/logo/`) | Zaria Capital deck template; mark rebuilt geometrically, wordmark traced from the deck artwork | Zaria Capital. Replace with the designer's master file when available. |
| Favicons (`brand/favicon/`, copied to `public/`) | Zaria brand kit | Zaria Capital. The manifest's icon paths are made relative in `public/` so they work on the preview subpath. |
| Madrid aerial (`brand/imagery/`, `src/assets/images/`) | Zaria Capital deck covers | **Web rights unconfirmed.** Not published: the Firm page shows it only when `madridPhotoWebRights: true`. Narrow screens get a square crop centred on the Metrópolis dome and Gran Vía. |
| OG image (`public/og-image.png`) | Generated by `scripts/og-image.mjs` from the stacked logo | Zaria Capital |
| EB Garamond | Google Fonts via `@fontsource/eb-garamond` | SIL Open Font License 1.1 |

No Abu Dhabi image is used. None was proposed: a generic skyline would work against the positioning (see `DECISIONS.md`).

## Tools used in the build

| Tool (brief section 1) | Status in this environment | What it executes |
|---|---|---|
| frontend-design | Plugin not installed; `SKILL.md` fetched from `anthropics/skills` into `.claude/skills/frontend-design/` | Nothing: guidance text only |
| Playwright | MCP not installed; `playwright` npm package with the preinstalled Chromium (`scripts/screenshot.mjs`, `scripts/check-csp.mjs`) | Headless Chromium; no browser download |
| web-design-guidelines | Installed with `npx skills add … -a claude-code` (telemetry disabled) | The `skills` CLI runs `git clone`; the skill itself is guidance text that fetches its rules from GitHub. Findings: `reports/web-design-guidelines.md` |
| Chrome DevTools MCP, web-quality-skills | Not installed; Lighthouse CLI fallback (`scripts/lighthouse.mjs`) | Headless Chromium |
| Impeccable | Not used (not approved) | — |

## Structure

```
brand/                 brand kit, unchanged (tokens.css, logos, favicons, imagery)
src/content/           all copy and owner inputs (YAML)
src/lib/routes.ts      the route map
src/lib/               content helpers, tokens, JSON-LD, launch gate, security headers
src/components/        header, footer, Z device, clocks, page templates
src/pages/             [...path].astro generates every page from the route map; 404; sitemap.xml
src/styles/global.css  site scale on top of brand/tokens.css
public/                favicons, manifest, OG image, robots.txt, _headers, _redirects, logo.png (JSON-LD)
scripts/               screenshots, Lighthouse, CSP check, local server, OG image
```
