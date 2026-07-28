# Gradient Atlas

Gradient Atlas is an original, visual, trilingual guide to machine-learning
foundations. It publishes 122 linked Korean, English, and Vietnamese learning
pages (366 localized reader routes), a searchable catalog, and interactive
demonstrations for dataset splitting, classification thresholds, and
generalization.

Every localized page uses a book-oriented layout: a persistent, independently
scrollable 122-page chapter tree on desktop and an accessible off-canvas
contents drawer on mobile. The homepage, catalog, source policy, and lessons
share collapsible part headings, chapter search, and current-location
highlighting; lessons add inline section bookmarks, reading progress, and
previous/next navigation.

Every Vietnamese lesson displays its canonical English topic name and a curated
Vietnamese–English terminology panel. Mathematically substantive lessons also
include independently written notation blocks with short explanations and
symbol definitions.

Twenty-two core lessons include original, code-native concept diagrams. The
visual set covers data leakage, dataset splitting, the confusion matrix,
linear regression, bias–variance behavior, the end-to-end workflow, learning
types, supervised feedback, clustering, neural-network layers, decision-tree
branching, cross-validation, ROC trade-offs, distribution shift,
reinforcement learning, ensembles, dimensionality reduction, graph learning,
support-vector margins, the training loop, class imbalance, and the course
concept map. They use no copied or hotlinked media.

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
/en/catalog/  /vi/catalog/  /ko/catalog/
/en/learn/<slug>/
/vi/learn/<slug>/
/ko/learn/<slug>/
/source-policy/
```

## Editorial status

This release is a public preview:

- 122 outline pages and three locales per page;
- 43 legacy/reference pages and 79 fundamentals pages;
- six expanded editorial showcase lessons;
- logic-reviewed technical drafts;
- native-language and independent technical review pending;
- no copied WikiDocs prose, code, or media;
- no third-party assets.

Machine-readable governance lives in:

- `governance/catalog.json`
- `governance/translation-status.json`
- `governance/asset-rights.json`

The detailed architecture, source analysis, rights gates, phased delivery plan,
and logic review are in
[`PROJECT_PLAN_AND_LOGIC_REVIEW.md`](PROJECT_PLAN_AND_LOGIC_REVIEW.md).

## Relationship to WikiDocs

The page sequence and topic outline are adapted from
[DL Bible – 07. Machine Learning Fundamentals](https://wikidocs.net/book/9057)
under its displayed CC BY 4.0 license. Every reader page links to its exact
source page. Gradient Atlas independently authors the explanatory prose,
examples, exercises, and interface; it does not mirror WikiDocs text or assets.

## Licenses

- Software: MIT, see [`LICENSE`](LICENSE).
- Original learning content: CC BY 4.0, see
  [`CONTENT_LICENSE.md`](CONTENT_LICENSE.md).
