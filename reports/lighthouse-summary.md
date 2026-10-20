# Lighthouse summary

Lighthouse 13.5.0, run 2026-10-20 against `http://localhost:4322`. Mobile uses Lighthouse's default simulated throttling (Moto G Power, slow 4G).

Run on the `audit` build (identical to the preview but without `noindex`, so the SEO category reflects production; on the noindex preview Lighthouse's SEO score drops by design). The bilingual 404 page is not included. Served locally by `scripts/serve.mjs` with `dist/_headers` applied and no compression, so real-host transfer sizes will be smaller.

Targets (mobile): every category 95 or more, LCP under 2.0 s, CLS under 0.05, page weight under 500 KB.

| Page | Form | Performance | Accessibility | Best practices | SEO | LCP (s) | CLS | Weight (KB) |
|---|---|---|---|---|---|---|---|---|
| / | mobile | 96 | 96 | 100 | 100 | 2.55 | 0.000 | 385 |
| / | desktop | 99 | 96 | 100 | 100 | 0.62 | 0.000 | 423 |
| /cookies/ | mobile | 100 | 100 | 100 | 100 | 1.65 | 0.000 | 109 |
| /cookies/ | desktop | 100 | 100 | 100 | 100 | 0.34 | 0.000 | 109 |
| /es/ | mobile | 96 | 96 | 100 | 100 | 2.48 | 0.000 | 385 |
| /es/ | desktop | 99 | 96 | 100 | 100 | 0.62 | 0.000 | 424 |
| /es/aviso-legal/ | mobile | 100 | 100 | 100 | 100 | 1.65 | 0.000 | 111 |
| /es/aviso-legal/ | desktop | 100 | 100 | 100 | 100 | 0.38 | 0.000 | 111 |
| /es/cookies/ | mobile | 100 | 100 | 100 | 100 | 1.43 | 0.000 | 109 |
| /es/cookies/ | desktop | 100 | 100 | 100 | 100 | 0.34 | 0.000 | 109 |
| /es/privacidad/ | mobile | 100 | 100 | 100 | 100 | 1.73 | 0.000 | 112 |
| /es/privacidad/ | desktop | 100 | 100 | 100 | 100 | 0.40 | 0.000 | 112 |
| /legal-notice/ | mobile | 99 | 100 | 100 | 100 | 1.78 | 0.000 | 111 |
| /legal-notice/ | desktop | 100 | 100 | 100 | 100 | 0.38 | 0.000 | 111 |
| /privacy/ | mobile | 100 | 100 | 100 | 100 | 1.73 | 0.000 | 112 |
| /privacy/ | desktop | 100 | 100 | 100 | 100 | 0.40 | 0.000 | 112 |

**2 mobile run(s) below target.**

**Why the homepage scores 96 for accessibility.** Every failing node (26 in English, 22 in Spanish) is a colour-contrast check in What we do or the footer, and every one has the same cause: the handoff's scroll-linked "grounds blend" effect. Each section starts on the previous section's colour and blends to its own as it scrolls in. Lighthouse checks the page at load, when those sections are below the fold and still on their starting colour. In their settled state all of them pass. Lighthouse cannot reach 100 while the blend applies to the section's own background. See DECISIONS.md.
