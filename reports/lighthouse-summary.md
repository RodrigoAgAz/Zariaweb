# Lighthouse summary

Lighthouse 13.5.0, run 2026-10-20 against `http://localhost:4322`. Mobile uses Lighthouse's default simulated throttling (Moto G Power, slow 4G).

Run on the `audit` build (identical to the preview but without `noindex`, so the SEO category reflects production; on the noindex preview Lighthouse's SEO score drops by design). The bilingual 404 page is not included. Served locally by `scripts/serve.mjs` with `dist/_headers` applied and no compression, so real-host transfer sizes will be smaller.

Targets (mobile): every category 95 or more, LCP under 2.0 s, CLS under 0.05, page weight under 500 KB.

| Page | Form | Performance | Accessibility | Best practices | SEO | LCP (s) | CLS | Weight (KB) |
|---|---|---|---|---|---|---|---|---|
| / | mobile | 96 | 96 | 100 | 100 | 2.48 | 0.000 | 386 |
| / | desktop | 99 | 96 | 100 | 100 | 0.62 | 0.000 | 425 |
| /es/ | mobile | 96 | 96 | 100 | 100 | 2.55 | 0.000 | 387 |
| /es/ | desktop | 99 | 96 | 100 | 100 | 0.61 | 0.000 | 425 |

**2 mobile run(s) below target.**

**Why the homepage scores 96 for accessibility.** Every failing node is a colour-contrast check in What we do or the footer, caused by the handoff's scroll-linked "grounds blend": each section starts on the previous section's colour and blends to its own as it scrolls in, and Lighthouse checks at load, before that happens. In their settled state all of them pass. The owner chose to keep the blend (see DECISIONS.md).
