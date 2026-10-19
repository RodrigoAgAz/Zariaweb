# Lighthouse summary

Lighthouse 13.5.0, run 2026-10-19 against `http://localhost:4322`. Mobile uses Lighthouse's default simulated throttling (Moto G Power, slow 4G).

Run on the `audit` build (identical to the preview but without `noindex`, so the SEO category reflects production; on the noindex preview Lighthouse's SEO score drops by design). The bilingual 404 page is not included. Served locally by `scripts/serve.mjs` with `dist/_headers` applied and no compression, so real-host transfer sizes will be smaller.

Targets (mobile): every category 95 or more, LCP under 2.0 s, CLS under 0.05, page weight under 500 KB.

| Page | Form | Performance | Accessibility | Best practices | SEO | LCP (s) | CLS | Weight (KB) |
|---|---|---|---|---|---|---|---|---|
| / | mobile | 100 | 100 | 100 | 100 | 1.43 | 0.000 | 82 |
| / | desktop | 100 | 100 | 100 | 100 | 0.38 | 0.000 | 96 |
| /contact/ | mobile | 100 | 100 | 100 | 100 | 1.50 | 0.000 | 77 |
| /contact/ | desktop | 100 | 100 | 100 | 100 | 0.32 | 0.000 | 91 |
| /cookies/ | mobile | 100 | 100 | 100 | 100 | 1.35 | 0.000 | 77 |
| /cookies/ | desktop | 100 | 100 | 100 | 100 | 0.32 | 0.000 | 91 |
| /es/ | mobile | 100 | 100 | 100 | 100 | 1.58 | 0.000 | 82 |
| /es/ | desktop | 100 | 100 | 100 | 100 | 0.39 | 0.000 | 96 |
| /es/aviso-legal/ | mobile | 100 | 100 | 100 | 100 | 1.50 | 0.000 | 80 |
| /es/aviso-legal/ | desktop | 100 | 100 | 100 | 100 | 0.36 | 0.000 | 94 |
| /es/contacto/ | mobile | 100 | 100 | 100 | 100 | 1.35 | 0.000 | 77 |
| /es/contacto/ | desktop | 100 | 100 | 100 | 100 | 0.32 | 0.000 | 91 |
| /es/cookies/ | mobile | 100 | 100 | 100 | 100 | 1.35 | 0.000 | 77 |
| /es/cookies/ | desktop | 100 | 100 | 100 | 100 | 0.32 | 0.000 | 91 |
| /es/equipo/ | mobile | 100 | 100 | 100 | 100 | 1.35 | 0.000 | 77 |
| /es/equipo/ | desktop | 100 | 100 | 100 | 100 | 0.32 | 0.000 | 91 |
| /es/firma/ | mobile | 100 | 100 | 100 | 100 | 1.35 | 0.000 | 130 |
| /es/firma/ | desktop | 100 | 100 | 100 | 100 | 0.35 | 0.000 | 183 |
| /es/informacion-regulatoria/ | mobile | 100 | 100 | 100 | 100 | 1.35 | 0.000 | 78 |
| /es/informacion-regulatoria/ | desktop | 100 | 100 | 100 | 100 | 0.33 | 0.000 | 92 |
| /es/privacidad/ | mobile | 100 | 100 | 100 | 100 | 1.50 | 0.000 | 80 |
| /es/privacidad/ | desktop | 100 | 100 | 100 | 100 | 0.36 | 0.000 | 94 |
| /es/que-hacemos/ | mobile | 100 | 100 | 100 | 100 | 1.36 | 0.000 | 77 |
| /es/que-hacemos/ | desktop | 100 | 100 | 100 | 100 | 0.32 | 0.000 | 91 |
| /firm/ | mobile | 100 | 100 | 100 | 100 | 1.44 | 0.000 | 130 |
| /firm/ | desktop | 100 | 100 | 100 | 100 | 0.34 | 0.000 | 183 |
| /legal-notice/ | mobile | 100 | 100 | 100 | 100 | 1.50 | 0.000 | 80 |
| /legal-notice/ | desktop | 100 | 100 | 100 | 100 | 0.36 | 0.000 | 94 |
| /people/ | mobile | 100 | 100 | 100 | 100 | 1.28 | 0.000 | 77 |
| /people/ | desktop | 100 | 100 | 100 | 100 | 0.32 | 0.000 | 90 |
| /privacy/ | mobile | 100 | 100 | 100 | 100 | 1.50 | 0.000 | 80 |
| /privacy/ | desktop | 100 | 100 | 100 | 100 | 0.36 | 0.000 | 94 |
| /regulatory/ | mobile | 100 | 100 | 100 | 100 | 1.35 | 0.000 | 78 |
| /regulatory/ | desktop | 100 | 100 | 100 | 100 | 0.32 | 0.000 | 92 |
| /what-we-do/ | mobile | 100 | 100 | 100 | 100 | 1.35 | 0.000 | 77 |
| /what-we-do/ | desktop | 100 | 100 | 100 | 100 | 0.32 | 0.000 | 91 |

**Every page meets every target on mobile.**
