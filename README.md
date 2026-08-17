# Gradient Atlas — Machine Learning: From Decisions to Reliable Systems

Gradient Atlas is an original, visual, trilingual guide to machine-learning
foundations. Its recommended path is a six-chapter guided course that builds
one late-delivery risk system from decision framing to monitoring. A separate
116-lesson reference atlas teaches individual models, formulas, workflows, and
failure patterns through topic-specific explanations and worked examples.
Together they form 122 English, Vietnamese, and Korean topics (366 localized
reader routes).

Every localized page uses a book-oriented layout: the six guided chapters
appear first in a persistent left column, followed by collapsible reference
parts. The same contents becomes an accessible off-canvas drawer on mobile.
Guided lessons add prerequisites, warm-ups, a continuing project deliverable,
knowledge checks, curated references, inline bookmarks, reading progress, and
course-only previous/next navigation. Each guided chapter also opens with a
six-step course-position map, states the chapter's purpose, and draws a
four-step reasoning flow. It closes with a dependency-free Python exercise,
expected output and interpretation, two multiple-choice checks with explained
answers, and a dated current-practice note grounded in primary sources.
Every one of the 122 lesson identities also ends with four topic-matched reading
paths. The shelf distinguishes books, courses, and technical guides, explains
why each resource is useful in all three languages, and keeps external rights
separate from Gradient Atlas licensing.

All 116 reference lessons have distinct English, Vietnamese, and Korean core
explanations and worked examples. Each follows with a subject-appropriate
mechanism, four-step decision path, two explicit alternatives, a condition for
reversing the choice, a failure test, a hands-on exercise, and topic-matched
references. The 17 code or exercise routes also include a unique,
dependency-free Python example with an observable result.

Every Vietnamese and Korean lesson displays its canonical English topic name,
and all three editions include a curated terminology panel. Eighty-seven
mathematically substantive topics now include independently written notation
blocks with trilingual explanations and symbol definitions; every algorithm
and code-focused lesson has a mathematical anchor. All 32 algorithm and
code-focused lessons additionally present a variable-length derivation. Every
equation explains its own symbols and role, then states why its result is needed
and which unresolved operation requires the following equation. The sequence
stops only when the lesson reaches its natural result; it is not forced into a
fixed number of formulas.

The reader typography is calibrated for sustained reading rather than dense UI
display. Main prose is approximately 17 px, navigation and explanatory copy are
larger than the original compact scale, and formula components, exercises,
questions, captions, and reading-resource descriptions remain legible on both
desktop and mobile layouts.

Twenty-two core lessons include original, code-native concept diagrams. The
visual set covers data leakage, dataset splitting, the confusion matrix,
linear regression, bias–variance behavior, the end-to-end workflow, learning
types, supervised feedback, clustering, neural-network layers, decision-tree
branching, cross-validation, ROC trade-offs, distribution shift,
reinforcement learning, ensembles, dimensionality reduction, graph learning,
support-vector margins, the training loop, class imbalance, and the course
concept map. They use no copied or hotlinked media.

The guided course adds twelve further code-native teaching visuals: one
course-position map and one chapter-specific thinking flow in each of the six
chapters. They show relationships and sequence rather than decorating the
page, and remain horizontally scrollable on narrow screens.

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

- `npm run check` audits content IDs, routes, localization coverage, reference
  boundaries, source-independent rights records, and preview disclosures.
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

- six guided chapters and 116 topic-specific reference lessons;
- three localized editions per topic;
- one continuing late-delivery project;
- twenty-three dependency-free Python exercises and twelve explained MCQs;
- chapter-level orientation diagrams and dated current-practice guidance;
- four curated continuation resources on every lesson and reference note;
- logic-reviewed technical drafts;
- native-language and independent technical review pending;
- no copied WikiDocs prose, code, or media;
- no third-party assets; the generated social card has a provenance record.

Machine-readable governance lives in:

- `governance/catalog.json`
- `governance/translation-status.json`
- `governance/asset-rights.json`

The detailed architecture, source analysis, rights gates, phased delivery plan,
and logic review are in
[`PROJECT_PLAN_AND_LOGIC_REVIEW.md`](PROJECT_PLAN_AND_LOGIC_REVIEW.md).

## Reference model and WikiDocs history

The guided course uses
[Microsoft Machine Learning for Beginners](https://github.com/microsoft/ML-For-Beginners)
as a project-learning reference,
[Google's Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course)
as a modular and interactive reference, and the
[scikit-learn User Guide](https://scikit-learn.org/stable/user_guide.html)
as a technical verification source. Dive into Deep Learning and An Introduction
to Statistical Learning are further-reading references only.

[DL Bible – 07. Machine Learning Fundamentals](https://wikidocs.net/book/9057)
is preserved only as the historical topic index that prompted the project.
Every atlas note keeps its corresponding link for traceability. Gradient Atlas
does not rely on a WikiDocs reuse license and does not mirror, translate, or
adapt WikiDocs expression or media.

## Licenses

- Software: MIT, see [`LICENSE`](LICENSE).
- Original learning content: CC BY 4.0, see
  [`CONTENT_LICENSE.md`](CONTENT_LICENSE.md).
