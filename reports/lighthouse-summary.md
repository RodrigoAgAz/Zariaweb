# Lighthouse summary

Lighthouse 13.5.0, run 2026-10-20 against `http://localhost:4322`. Mobile uses Lighthouse's default simulated throttling (Moto G Power, slow 4G).

Run on the `audit` build (identical to the preview but without `noindex`, so the SEO category reflects production; on the noindex preview Lighthouse's SEO score drops by design). The bilingual 404 page is not included. Served locally by `scripts/serve.mjs` with `dist/_headers` applied and no compression, so real-host transfer sizes will be smaller.

Targets (mobile): every category 95 or more, LCP under 2.0 s, CLS under 0.05, page weight under 500 KB.

| Page | Form | Performance | Accessibility | Best practices | SEO | LCP (s) | CLS | Weight (KB) |
|---|---|---|---|---|---|---|---|---|
| / | mobile | 95 | 96 | 100 | 100 | 2.63 | 0.000 | 397 |
| / | desktop | 99 | 96 | 100 | 100 | 0.64 | 0.000 | 435 |

**1 mobile run(s) below target.**

Accessibility 96: every failing node is a colour-contrast check caused by the scroll-linked section blends, which Lighthouse measures at load, before each section's ground settles. The owner chose to keep the blend (see DECISIONS.md).
