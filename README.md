# Gradient Atlas

Gradient Atlas is an original, visual, trilingual guide to machine-learning
foundations. It publishes exact Korean, English, and Vietnamese counterparts
for six pilot lessons and includes interactive demonstrations for dataset
splitting, classification thresholds, and generalization.

## Read locally

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

The local site opens at `http://localhost:3000/`.

## Validate

```bash
npm run check
npm test
npm run build:pages
```

- `npm run check` audits content IDs, routes, translation coverage, rights
  status, and preview disclosures.
- `npm test` builds the production worker and renders the language gate, all
  locale Atlas routes, trilingual lesson counterparts, and source policy.
- `npm run build:pages` creates the static `out/` artifact used by GitHub
  Pages.

## Published routes

```text
/
/en/  /vi/  /ko/
/en/learn/<slug>/
/vi/learn/<slug>/
/ko/learn/<slug>/
/source-policy/
```

## Editorial status

This release is a public preview:

- six original lessons;
- three locales per lesson;
- self-reviewed technical drafts;
- native-language and independent technical review pending;
- no copied WikiDocs prose, code, or media;
- no third-party assets in the pilot.

Machine-readable governance lives in:

- `governance/catalog.json`
- `governance/translation-status.json`
- `governance/asset-rights.json`

The detailed architecture, source analysis, rights gates, phased delivery plan,
and logic review are in
[`PROJECT_PLAN_AND_LOGIC_REVIEW.md`](PROJECT_PLAN_AND_LOGIC_REVIEW.md).

## Relationship to WikiDocs

[DL Bible – 07. Machine Learning Fundamentals](https://wikidocs.net/book/9057)
informed the general topic scope and is linked as related reading. Gradient
Atlas was written independently and does not mirror its text or assets.

## Licenses

- Software: MIT, see [`LICENSE`](LICENSE).
- Original learning content: CC BY 4.0, see
  [`CONTENT_LICENSE.md`](CONTENT_LICENSE.md).
