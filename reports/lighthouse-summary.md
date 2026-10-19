# Lighthouse summary

Lighthouse 13.5.0, run 2026-10-19 against `http://localhost:4322`. Mobile uses Lighthouse's default simulated throttling (Moto G Power, slow 4G).

Run on the `audit` build (identical to the preview but without `noindex`, so the SEO category reflects production; on the noindex preview Lighthouse's SEO score drops by design). The bilingual 404 page is not included. Served locally by `scripts/serve.mjs` with `dist/_headers` applied and no compression, so real-host transfer sizes will be smaller.

Targets (mobile): every category 95 or more, LCP under 2.0 s, CLS under 0.05, page weight under 500 KB.

| Page | Form | Performance | Accessibility | Best practices | SEO | LCP (s) | CLS | Weight (KB) |
|---|---|---|---|---|---|---|---|---|
| / | mobile | 100 | 100 | 100 | 100 | 1.58 | 0.000 | 129 |
| / | desktop | 100 | 100 | 100 | 100 | 0.36 | 0.000 | 154 |
| /cookies/ | mobile | 100 | 100 | 100 | 100 | 1.35 | 0.000 | 71 |
| /cookies/ | desktop | 100 | 100 | 100 | 100 | 0.32 | 0.000 | 69 |
| /es/ | mobile | 99 | 100 | 100 | 100 | 1.95 | 0.000 | 129 |
| /es/ | desktop | 100 | 100 | 100 | 100 | 0.46 | 0.000 | 154 |
| /es/aviso-legal/ | mobile | 100 | 100 | 100 | 100 | 1.28 | 0.000 | 73 |
| /es/aviso-legal/ | desktop | 100 | 100 | 100 | 100 | 0.32 | 0.000 | 71 |
| /es/cookies/ | mobile | 100 | 100 | 100 | 100 | 1.36 | 0.000 | 71 |
| /es/cookies/ | desktop | 100 | 100 | 100 | 100 | 0.32 | 0.000 | 69 |
| /es/privacidad/ | mobile | 100 | 100 | 100 | 100 | 1.28 | 0.000 | 74 |
| /es/privacidad/ | desktop | 100 | 100 | 100 | 100 | 0.32 | 0.000 | 72 |
| /legal-notice/ | mobile | 100 | 100 | 100 | 100 | 1.35 | 0.000 | 73 |
| /legal-notice/ | desktop | 100 | 100 | 100 | 100 | 0.32 | 0.000 | 71 |
| /privacy/ | mobile | 100 | 100 | 100 | 100 | 1.35 | 0.000 | 74 |
| /privacy/ | desktop | 100 | 100 | 100 | 100 | 0.32 | 0.000 | 71 |

**Every page meets every target on mobile.**
