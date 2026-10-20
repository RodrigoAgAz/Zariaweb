# Zaria Capital website

The public website of Zaria Capital: a static, English-only site built with [Astro](https://astro.build) 7. No CMS, no forms, no cookies, no database, no third-party requests.

- **Preview:** `https://rodrigoagaz.github.io/Zariaweb/` (GitHub Pages, every page `noindex`), live once Pages is switched on (see [Deploy](#deploy)). The production host will be chosen later.
- **Design:** [`DESIGN.md`](DESIGN.md). **Decisions:** [`DECISIONS.md`](DECISIONS.md).
- **Screenshots:** [`screenshots/`](screenshots/) (every page at 375, 768, 1440 and 1920 px). **Audits:** [`reports/`](reports/).

## What the site shows, and what it leaves out

The site is one page (the hero with its Z reveal, 01 Where we work with the corridor map, 02 What we do, 03 Founder, and the footer, which is also the Contact anchor). There are no legal notice, privacy or cookies pages (owner decision, see `DECISIONS.md`). The homepage design is specified in the redesign handoff (`HANDOFF.md` in the handoff pack); the map geometry and its generator are in `scripts/map/`. Nothing is shown for information Zaria Capital has not supplied: sentences, rows and sections that need it are simply left out, and the Regulatory information page is published only once there is something to put on it.

Owner inputs are all in [`src/content/settings.yaml`](src/content/settings.yaml); all homepage copy, the founder's career and boards included, is in `src/content/pages/en/home.yaml`. The Spanish version was removed (owner decision); old `/es/` links should redirect to the homepage (`public/_redirects`, or the equivalent line in the live host's `.htaccess`).

| Not yet supplied | What appears once it is | Where to enter it |
|---|---|---|
| Spanish entity: registered name, NIF, registered address, Registro Mercantil details | Regulatory information page | `entities.spain.*` |
| ADGM entity: legal name, registration number, address | Regulatory information page | `entities.adgm.*` |
| One regulatory sentence per entity | Footer of every page; Regulatory information page | `entities.*.regulatoryStatement.en` |
| Perpetua WOFF2 files | The house face everywhere | See [Switching to Perpetua](#switching-eb-garamond-to-perpetua) |
| Production domain | Canonicals, sitemap | `site` in `astro.config.mjs` (currently `https://zariacapital.es`) |

A caution before the site goes live on the real domain: Spanish law (LSSI-CE, article 10) requires a business website to identify its owner (registered name, NIF, registered address, registry details), and the GDPR expects a privacy notice wherever personal data is processed (the host's server logs, emails sent to the published address). The legal notice and privacy pages were removed at the owner's request; filling in `entities.spain.*` publishes the identification on the Regulatory information page, which is the quickest way back to compliance.

## Pre-launch sign-offs (outside this build)

1. **A Spanish lawyer** confirms the site can launch without a legal notice and privacy notice (LSSI-CE, GDPR, LOPDGDD).
2. **Regulatory counsel in Spain and in ADGM** confirms that "The firm" paragraphs (advice on M&A, partnerships, market entry, capital formation and structured financing; principal investment) and the regulatory sentences are appropriate for a public website.
3. **Alonso Aznar approves the founder section** (lead, career and boards).

## Run, build, deploy

Requires Node 22.

```sh
npm ci
npm run dev                # local development at http://localhost:4321
npm run build              # preview build (GitHub Pages): every page noindex
npm run build:production   # production build: pages indexable
npm run build:audit        # local Lighthouse runs only: like preview but without noindex. Never deploy.
```

`ZARIA_BASE` sets the path the site is served from: `/` in production (default), `/Zariaweb/` on the GitHub Pages preview.

### Checks

```sh
npm run build:audit && npm run serve   # serves dist/ on :4322 applying dist/_headers, like a static host
npm run check:csp                      # every page: CSP violations, console errors, third-party requests, cookies
npm run screenshots                    # every page at 375, 768 and 1440 px into screenshots/ (set WIDTHS=375,768,1440,1920 for more)
npm run lighthouse                     # Lighthouse mobile and desktop for every page into reports/
```

Screenshots and Lighthouse use the Chromium at `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`; set `CHROMIUM_PATH` / `CHROME_PATH` to use another.

### Deploy

**Preview (GitHub Pages).** `.github/workflows/deploy.yml` builds with `ZARIA_BUILD=preview` and `ZARIA_BASE=/Zariaweb/` and publishes on every push to `main`. One-time setup by the repository owner: *Settings → Pages → Build and deployment → Source: GitHub Actions*. Publishing Pages from a private repository needs a paid GitHub plan, and the published site is public (anyone with the link can open it) even though the repository is private.

GitHub Pages limitations, accepted for the preview only:
- It ignores `public/_headers` and `public/_redirects`. The Content-Security-Policy is still enforced through a `<meta>` tag Astro generates with script and style hashes, and the referrer policy through `<meta name="referrer">`. HSTS, `X-Content-Type-Options`, `Permissions-Policy` and `frame-ancestors` cannot be set on GitHub Pages.
- No server-side redirects.

**Production.** Use a static host that honours `_headers` (Cloudflare Pages, Netlify or similar). Build with `npm run build:production` and publish `dist/`. After each build, `dist/_headers` contains the full CSP (the union of every page's hashes, plus `frame-ancestors 'none'`), HSTS, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options` and long-lived caching for `/_astro/*`.

**Header verification.** The headers could not be verified on a deployed host: GitHub Pages does not serve them, and the session had no access to Cloudflare. They were verified locally with `scripts/serve.mjs`, which applies `dist/_headers` the way a static host does: all five headers present, every page loaded with no CSP violations, no console errors, no third-party requests and no cookies (`npm run check:csp`). Repeat that check against the production host after the first deploy, and confirm in the browser's storage panel that the host sets no bot-management cookies (on Cloudflare, keep Bot Fight Mode and similar cookie-setting features off).

### Yearly rebuild

The footer reads "© {year} Zaria Capital", with the year computed at build time. The deploy workflow also runs on a schedule at 00:05 UTC on 1 January (`cron: '5 0 1 1 *'`), so the year changes without anyone pushing. On a production host, add the equivalent: a deploy hook called by a scheduled job on 1 January (for example a GitHub Actions workflow with the same cron that `curl`s the host's deploy-hook URL, stored as a repository secret).

## Editing content

All copy lives in `src/content/`, separate from the components.

- `src/content/pages/en/home.yaml`: the home page (hero lines and corridors, the map's cities, the three services, the founder's lead, career and boards, the share-image alt text).
- `src/content/pages/en/regulatory.yaml`: Regulatory information (published once entity details are supplied).
- `src/content/ui/en.yaml`: header, footer and other interface text.
- `src/content/settings.yaml`: owner inputs (email, entities).
- Every page file has `title` and `description` (140 to 160 characters; the build fails otherwise). In paragraph text you can write `[link text](https://…)`, `*italic*`, and `{tokens}` such as `{email}` or `{spainName}` (full list in `src/lib/tokens.ts`); a paragraph whose token has no value is left out.

Copy rules: only facts the firm has approved; no clients, deals, numbers, rankings or government references; no em or en dashes; "Zaria Capital", never "Zaria Capital Partners".

### URLs

Every URL is defined once in `src/lib/routes.ts`; it generates the pages and `sitemap.xml`.

## Switching EB Garamond to Perpetua

The site declares one family, "Zaria Serif". Zaria holds a Perpetua licence (Monotype); until the web font files are added, its files are EB Garamond (SIL Open Font License, `src/assets/fonts/OFL-EB-Garamond.txt`), self-hosted, regular and italic, Latin and Latin Extended subsets.

To switch: put the licensed Perpetua WOFF2 files (regular and italic, Latin and Latin Extended subsets) in `src/assets/fonts/` and change the four `src` paths in the `fonts` block of `astro.config.mjs`. Nothing else changes: the metric-matched fallback is regenerated from the new files, and only the regular Latin file is preloaded. Never add a `local("Perpetua")` source: visitors with Microsoft Office have Perpetua installed and would see a different version from everyone else.

## WordPress cut-over plan

The current zariacapital.es runs on WordPress. This build does not touch its DNS or hosting.

1. **List the old URLs.** Fetch `https://zariacapital.es/wp-json/wp/v2/pages?per_page=100` and `/wp-json/wp/v2/posts?per_page=100` (and the sitemap at `/wp-sitemap.xml` if present), and note every public URL, including `/en/` or language-prefixed variants. This could not be done from the build environment, whose network policy blocked the domain.
2. **Map them** in `public/_redirects`, one line each, to the nearest new page with status 301 (e.g. `/about-us/ / 301`). Send anything without an equivalent to the home page. The old News/Insights link pointed to `#` and needs no redirect.
3. **Deploy to the production host** on its temporary address. Run `npm run check:csp` against it and check every redirect.
4. **Check other subdomains** (mail, webmail, `www`, any client portals) before adding `includeSubDomains` to HSTS. The shipped header is `max-age=31536000` without `includeSubDomains`; add it, and consider preload, only once every subdomain serves HTTPS.
5. **Switch DNS** for `zariacapital.es` (and `www`) to the new host, keeping MX and other mail records unchanged. Keep the WordPress site available on another address for a few weeks, then retire it.
6. **After launch:** submit `https://zariacapital.es/sitemap.xml` in Google Search Console and Bing Webmaster Tools. If `.com` is owned, redirect it with 301s to the `.es` equivalents.

## Images, fonts and licences

| Asset | Source | Licence / status |
|---|---|---|
| Logos (`brand/logo/`) | Zaria Capital deck template; mark rebuilt geometrically, wordmark traced from the deck artwork | Zaria Capital. Replace with the designer's master file when available. |
| Favicons (`brand/favicon/`, copied to `public/`) | Zaria brand kit | Zaria Capital. The manifest's icon paths are made relative in `public/` so they work on the preview subpath. |
| Madrid aerial (`brand/imagery/`, `src/assets/images/`) | Zaria Capital deck covers | Zaria holds web rights (confirmed by the owner, 19 October 2026). The homepage hero. Narrow screens get a square crop centred on the Metrópolis dome and Gran Vía. |
| Dot map, Z mask, grain (`src/assets/home/`) | Redesign handoff pack | Zaria Capital |
| Share images (`public/og-image.png`, `public/og-image-es.png`) | Redesign handoff pack (`mockups/Share.dc.html`), 1200 x 630 | Zaria Capital |
| EB Garamond | Google Fonts via `@fontsource/eb-garamond` | SIL Open Font License 1.1 |

No Abu Dhabi or Americas image is used yet. The handoff lists both as optional photography for a future hero crossfade; nothing is built for them until they are supplied.

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
src/components/        header, footer, home sections (src/components/home/), Z device, Regulatory information template
src/scripts/           small vanilla modules: header condensing and menu, hero corridors, map toggles
src/pages/             [...path].astro generates every page from the route map; 404; sitemap.xml
src/styles/global.css  site scale on top of brand/tokens.css
public/                favicons, manifest, OG image, robots.txt, _headers, _redirects, logo.png (JSON-LD)
scripts/               screenshots, Lighthouse, CSP check, local server; scripts/map/ holds the map geometry and its generator
```
