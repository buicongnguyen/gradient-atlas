# DL Bible Machine Learning — Trilingual GitHub and GitHub Pages Plan

Status: planning and logic review  
Prepared: 2026-07-28  
Target languages: Korean (`ko`), English (`en`), Vietnamese (`vi`)  
Reference implementation: local `helloalgo` repository  
Analyzed source: [WikiDocs book 9057](https://wikidocs.net/book/9057)

> **2026-07-30 reconstruction decision:** Sections 1–16 preserve the original
> investigation and implementation history. Their earlier assumption that the
> WikiDocs outline could be adapted under CC BY 4.0 is no longer relied on.
> The current release is independently authored, uses WikiDocs only as a
> historical topic-link index, and does not copy, translate, or adapt WikiDocs
> expression or media.

## Current reader-first reconstruction

The former 122-page sequence is too fragmented for a beginner reading from
start to finish. It combines two collections, repeats broad concepts, and gives
small topics the same navigational weight as foundational decisions. The
reconstruction therefore exposes two deliberate modes:

1. **Guided course:** six editorial chapters in a fixed dependency order.
2. **Reference atlas:** 116 supporting notes grouped for lookup rather than
   presented as required sequential reading.

The guided course builds one late-delivery risk system:

1. frame the decision and costly errors;
2. audit features, labels, timestamps, and leakage;
3. protect train, validation, and test evaluation;
4. choose metrics and a decision threshold;
5. diagnose bias, variance, overfitting, and shift;
6. connect the model to deployment, fallback, monitoring, and retraining.

Each chapter now has prerequisites, a warm-up with revealed reasoning, one
project deliverable, a knowledge check, and selected further reading. Previous
and next links stay inside the guided course. Reference notes have their own
navigation sequence, so a learner is never pushed from a coherent chapter into
an unrelated historical topic.

### Reference stack

- Microsoft Machine Learning for Beginners informs project pacing, checks, and
  assignments.
- Google Machine Learning Crash Course informs short modules, interactive
  intuition, and the path from models to production systems.
- Dive into Deep Learning informs the proximity of explanation, mathematics,
  and runnable examples; no passages, figures, or code are adapted.
- The scikit-learn User Guide is the technical verification source for model
  selection, preprocessing, evaluation, pipelines, and implementation behavior.
- An Introduction to Statistical Learning is recommendation-only because its
  site states that the work is all rights reserved.
- WikiDocs is a historical topic-link index only; its reuse license is not
  assumed or required.

### Reconstruction logic review

`Risk: a larger source list creates a patchwork rather than a course`

Resolution: the reference stack does not define the table of contents. One
original six-step project spine defines the course; sources have narrowly
documented roles and appear only as further reading or technical verification.

`Risk: reference material is accidentally copied under incompatible terms`

Resolution: the release contains no third-party passages, figures, media, or
code. Governance records `sourceReuse: none` and
`sourceLicenseReliedOn: false` for every historical WikiDocs link. External
works retain their own licenses, including D2L's share-alike terms and the
all-rights-reserved Statistical Learning book.

`Risk: generated topic coverage is mistaken for a polished textbook`

Resolution: the interface labels the six editorial chapters as the recommended
course and the other 116 items as reference notes. All localized editions
remain preview material pending independent technical and native-language
review.

`Risk: multiple languages drift into different courses`

Resolution: the six guided slugs, project milestones, checkpoints, and source
identities are shared across English, Vietnamese, and Korean. Localized prose
can be reviewed independently without changing course structure or routes.

## 1. Executive decision

The project is technically feasible, but full content mirroring and translation should not begin until the source and asset rights are confirmed with the authors.

Recommended decision:

1. Build one repository and one static GitHub Pages site with three parallel locale trees.
2. Reuse the architectural ideas from `helloalgo`: stable cross-language routes, a translation ledger, locked source revisions, structural audits, human-review states, static search, and GitHub Actions deployment.
3. Do not copy the `helloalgo` build scripts unchanged. They are tightly coupled to 119 Hello Algo documents, English as the only source language, and fixed Vietnamese/Korean manifests.
4. Treat WikiDocs page IDs as permanent external identities and use project-owned stable slugs for public URLs.
5. Separate the book's older A–D material from the newer Machine Learning Fundamentals curriculum instead of presenting both as one flat table of contents.
6. Import only pages with meaningful content. Keep one-character placeholder pages in the catalog as `planned`, but do not publish them as finished lessons.
7. Use an author-approved export or GitHub source. Do not build an unattended scraper against WikiDocs.

## 2. Evidence gathered

### 2.1 `helloalgo` reference project

The local reference is a fork of `krahets/hello-algo` with:

- Korean, English, and Vietnamese Atlas pages;
- 119 reader documents per language;
- exact cross-language page switching;
- Markdown content plus a custom Node.js static build;
- `translation-status.json` manifests;
- locked source commits;
- generated parity reports;
- checks for headings, images, code, math, tables, callouts, routes, and runnable examples;
- GitHub Actions for CI and GitHub Pages deployment;
- a generated sitemap, robots file, `.nojekyll`, 404 page, theme control, responsive reader, local search, and article outlines.

The current reference validation passes:

- 119 locked English documents;
- 119 Vietnamese and 119 Korean documents;
- 165 code groups per localized edition;
- 158 runnable examples and 20 correctness probes.

Useful patterns to retain:

- content and presentation are separate;
- every translated page maps to one immutable source identity;
- translation status is machine-readable;
- “draft” is not presented as “published”;
- structural parity and human review are separate quality gates;
- the deploy workflow publishes only a validated static artifact.

Patterns that must be redesigned:

- the catalog assumes exactly 119 documents;
- routes are derived from the Hello Algo MkDocs structure;
- only `vi` and `ko` are modeled as target languages;
- source locking assumes an upstream Git commit, while WikiDocs currently exposes page IDs and edit timestamps;
- current builders duplicate language-specific logic;
- many checks know Hello Algo-specific file names, code-tab syntax, and asset locations.

### 2.2 WikiDocs book structure

The live sidebar contains 122 unique page entries:

- 43 entries in the older structure:
  - architecture overview;
  - Part A: What machine learning is;
  - Part B: approaches;
  - Part C: models;
  - Part D: neural networks to deep learning and source/reference chapters.
- 79 entries in the newer curriculum:
  - Part A: What Is Machine Learning;
  - Part B: Data, Features, and Labels;
  - Part C: Training, Validation, and Test;
  - Part D: Evaluation Metrics;
  - Part E: Overfitting and Underfitting;
  - Part F: End-to-End ML Workflow;
  - Part G: Practical ML System Design;
  - Part H: Common ML Pitfalls;
  - Part K: Summary and Exercises.

The book already has a separate [English WikiDocs volume](https://wikidocs.net/book/9413) with a matching broad outline. Therefore, English should be imported and reviewed where it exists, not regenerated automatically from Korean.

The current outline is not equivalent to 122 completed lessons. Live samples from the new curriculum, including `00_Definition_of_ML` and `06_Debugging_Strategies [w/Code]`, contain only `x`. Recent-page summaries show the same placeholder pattern on several other new leaves. Some part-level pages contain substantive prose. Completeness must therefore be measured page by page.

The book is an actively changing source. A source snapshot needs:

- WikiDocs book ID;
- WikiDocs page ID;
- source language;
- source URL;
- page title;
- parent page ID and ordering;
- captured edit timestamp;
- normalized content hash;
- asset inventory and hashes;
- capture date;
- permission/license evidence.

### 2.3 Copyright and access constraints

The live copyright badge links to [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/deed.ko). CC BY 4.0 permits sharing and adaptation, including translation, if attribution is provided, modifications are identified, and no additional restrictions are imposed.

This does not automatically clear every embedded item. The book states that substantial portions came from earlier researchers. Images, long quotations, code, datasets, figures, screenshots, and imported text may have separate licenses or attribution requirements.

WikiDocs' [terms](https://wikidocs.net/help/terms) prohibit collecting user content by automated scraping without WikiDocs permission. The ingestion workflow should therefore use one of:

1. an author-provided repository or export;
2. the newer WikiDocs GitHub integration controlled by the authors;
3. explicit written permission from both the authors and WikiDocs for automated collection;
4. manual author-approved source delivery.

Attribution must be page-level, not only repository-level. Each page should identify:

- original title and authors;
- original WikiDocs page URL;
- source revision/capture date;
- CC BY 4.0;
- target-language translator/reviewer;
- a notice that the page is a translation or adaptation;
- third-party credits and licenses for individual assets.

## 3. Proposed information architecture

Do not flatten all 122 entries into one navigation tree.

### 3.1 Public content collections

`Fundamentals`

- The newer 79-entry curriculum.
- This is the primary learning path.
- Empty leaves are hidden from the default reader navigation and shown on a roadmap as “planned.”

`Legacy and references`

- The older 43-entry A–D collection.
- Preserve it as an archive/reference library.
- Do not silently merge overlapping topics with the new curriculum.
- Add redirects only after a human maps true equivalents.

### 3.2 Locale routes

Recommended routes:

```text
/
/ko/
/en/
/vi/
/ko/learn/<stable-slug>/
/en/learn/<stable-slug>/
/vi/learn/<stable-slug>/
/ko/legacy/<stable-slug>/
/en/legacy/<stable-slug>/
/vi/legacy/<stable-slug>/
```

The root should show a language chooser and may remember a reader's choice. It should not permanently redirect all users to one language.

Every page must use the same internal document ID across languages. A language switch changes only the locale segment. If a translation is unavailable, the switch should say “not translated yet” and offer the available source page; it must not return a 404.

### 3.3 Atlas-style landing page

The visual direction can resemble `helloalgo` without copying its book-specific content:

- dark/light theme;
- compact sticky navigation;
- learning-roadmap graph for Parts A–K;
- cards showing prerequisites, outcomes, and completion state;
- interactive evaluation-metrics lab;
- train/validation/test split visualizer;
- bias–variance or overfitting visualizer;
- end-to-end pipeline diagram;
- filters for concept, code, exercise, project, and review state;
- direct links from each Atlas node to the matching reader lesson;
- a visible three-language switch.

Animations and labs must be independently implemented and tested. They should explain this book's machine-learning concepts instead of rebranding Hello Algo's data-structure labs.

## 4. Repository design

Working repository name: `dl-bible-machine-learning`  
Potential Pages URL: `https://buicongnguyen.github.io/dl-bible-machine-learning/`

```text
dl-bible-machine-learning/
├─ .github/
│  ├─ ISSUE_TEMPLATE/
│  ├─ PULL_REQUEST_TEMPLATE.md
│  └─ workflows/
│     ├─ ci.yml
│     ├─ source-drift.yml
│     └─ pages.yml
├─ content/
│  ├─ catalog.json
│  ├─ ko/
│  │  ├─ fundamentals/
│  │  └─ legacy/
│  ├─ en/
│  │  ├─ fundamentals/
│  │  └─ legacy/
│  └─ vi/
│     ├─ fundamentals/
│     └─ legacy/
├─ governance/
│  ├─ attribution.md
│  ├─ asset-rights.json
│  ├─ glossary-ko-en-vi.csv
│  ├─ source-permission.md
│  ├─ style-en.md
│  ├─ style-ko.md
│  ├─ style-vi.md
│  └─ translation-status.json
├─ public/
│  └─ assets/
├─ scripts/
│  ├─ audit-content.mjs
│  ├─ audit-links.mjs
│  ├─ audit-rights.mjs
│  ├─ audit-translations.mjs
│  ├─ build-site.mjs
│  ├─ check-code.mjs
│  └─ snapshot-source.mjs
├─ site/
│  ├─ atlas/
│  ├─ reader/
│  ├─ search/
│  └─ shared/
├─ tests/
├─ LICENSE
├─ README.md
└─ package.json
```

### 4.1 Catalog identity

Example catalog record:

```json
{
  "id": "mlf-a-00-definition",
  "collection": "fundamentals",
  "order": 10,
  "parentId": "mlf-part-a",
  "source": {
    "bookId": 9057,
    "pageId": 351847,
    "language": "ko",
    "url": "https://wikidocs.net/351847",
    "capturedAt": "2026-07-28",
    "contentHash": "sha256:..."
  },
  "slug": "definition-of-machine-learning",
  "contentState": "placeholder",
  "locales": {
    "ko": {"status": "source-placeholder"},
    "en": {"status": "source-placeholder"},
    "vi": {"status": "planned"}
  }
}
```

Never derive identity from a translated title. Titles and slugs can change; the internal ID and WikiDocs page ID remain stable.

### 4.2 Translation states

Use orthogonal states instead of one overloaded status:

```text
sourceState: missing | placeholder | captured | changed
translationState: planned | draft | complete
technicalReview: pending | self-reviewed | independently-reviewed
languageReview: pending | self-reviewed | independently-reviewed
rightsReview: pending | cleared | restricted
publicationState: hidden | preview | published | archived
```

Publication rule:

```text
published =
  sourceState == captured
  AND translationState == complete
  AND technicalReview == independently-reviewed
  AND languageReview == independently-reviewed
  AND rightsReview == cleared
  AND all automated checks pass
```

Korean source pages also require technical and rights review. “Source language” does not mean “factually correct” or “cleared for redistribution.”

## 5. Source and translation workflow

### 5.1 Establish the canonical source per page

Do not assume one canonical language for the entire book.

For each page:

1. Compare the Korean and English WikiDocs versions.
2. Ask the authors which language/version is authoritative.
3. Record whether one is an original, a translation, or an independent adaptation.
4. Lock the approved source revision.
5. Translate Vietnamese from that approved source.
6. Repair Korean or English only through a separately reviewed edit.

If Korean and English disagree, do not average or merge them automatically. Open a source-resolution issue.

### 5.2 Content normalization

Normalize author-provided source into Markdown while preserving:

- heading hierarchy;
- paragraphs and lists;
- formulas and symbols;
- code language and indentation;
- tables;
- callouts;
- citations and external links;
- figure placement, captions, credits, and license;
- exercise numbering;
- intentional terminology in English;
- page-to-page ordering.

Raw HTML should be allowlisted and sanitized. Remote scripts, iframes, event handlers, trackers, and unsafe URLs must not enter the generated site.

### 5.3 Translation process

Per page:

1. Freeze the source hash.
2. Extract terms into the trilingual glossary.
3. Produce a draft while preserving code, formulas, citations, and structure.
4. Run structural checks.
5. Run code and link tests.
6. Conduct ML technical review.
7. Conduct native-language review.
8. Verify attribution and assets.
9. Preview the built page at desktop and mobile sizes.
10. Mark published only after independent approvals.

Machine-assisted translation is acceptable for a draft, but it must be disclosed and cannot satisfy independent language or technical review.

### 5.4 Source update handling

For an approved export:

1. Capture the new source.
2. Compare normalized hashes.
3. Mark affected translations `sourceState: changed`.
4. Produce a semantic diff excluding formatting-only changes.
5. Keep the last reviewed translation live with an “upstream changed” notice.
6. Re-review only impacted sections.
7. Never overwrite translated text automatically.

## 6. Quality and CI gates

### 6.1 Content checks

- unique document IDs, slugs, and routes;
- valid parent/child ordering;
- no `x`, TODO-only, or empty pages published;
- exact cross-language identity mapping;
- matching required heading, image, table, formula, callout, and code-block counts;
- no unexpected untranslated Korean in English/Vietnamese prose;
- terminology checks against the glossary;
- valid internal and external links;
- local availability of approved assets;
- alt text and figure captions;
- attribution block on every page;
- generated sitemap and `hreflang` links.

Structural parity is necessary but insufficient. It can prove that two pages contain the same number of headings while both contain incorrect explanations.

### 6.2 Technical checks

- syntax checks for every code block with a declared language;
- executable tests for self-contained Python examples;
- deterministic seeds where examples claim reproducibility;
- dependency/version declarations;
- assertions for metrics and preprocessing examples;
- no training example that silently uses test data;
- no data leakage in example pipelines;
- formula review for notation and rendered output;
- responsive layout and keyboard navigation;
- reduced-motion behavior;
- HTML validation and basic accessibility audit;
- build with the GitHub Pages repository base path, not only `/`.

### 6.3 Rights checks

CI should fail publication when:

- a page lacks source URL, author, license, or modification notice;
- an image has no creator/source/license record;
- a code sample's origin or license is unknown;
- a third-party excerpt exceeds the approved use;
- the rights status is `pending` or `restricted`.

## 7. GitHub and GitHub Pages workflow

### 7.1 Branch and review policy

- `main`: deployable, reviewed content only;
- short-lived feature branches;
- protected `main`;
- required CI;
- at least one technical reviewer and one language reviewer for `published`;
- CODEOWNERS by content area and locale;
- translation PR template with source hash and review checklist;
- issue forms for translation, technical error, source drift, and rights concern.

### 7.2 Actions

`ci.yml`

- install a pinned Node version;
- validate catalog and manifests;
- audit content, rights, links, and translations;
- run code tests;
- build the site;
- inspect the generated artifact.

`pages.yml`

- run only after CI succeeds on `main`;
- build once;
- upload `dist/`;
- deploy through GitHub Pages OIDC;
- use deployment concurrency to cancel superseded builds.

`source-drift.yml`

- only after author/WikiDocs-approved source access exists;
- compare approved source metadata;
- open or update an issue when pages change;
- never commit imported text or translations automatically.

### 7.3 Static-site constraints

GitHub Pages is a good fit for reading, search indexes, client-side labs, and language routing. It does not provide server-side search, private drafts, or authenticated editorial workflows. Draft previews should use pull-request artifacts or a separate preview mechanism; comments can use GitHub Discussions/Giscus only after repository discussion settings and privacy implications are agreed.

## 8. Detailed delivery phases

### Phase 0 — Permission and scope gate

Deliverables:

- written confirmation from both listed authors;
- confirmation of CC BY 4.0 scope;
- approved source-transfer method;
- explicit treatment of third-party assets and code;
- decision on whether the older 43-page collection is in scope;
- decision on repository name and owner.

Exit criteria:

- `source-permission.md` is complete;
- no scraping is required;
- at least one pilot chapter has clear rights.

Do not publish source text before this gate passes.

### Phase 1 — Inventory and source freeze

Deliverables:

- complete catalog of 122 current WikiDocs entries;
- separation of legacy and fundamentals collections;
- Korean↔English page mapping;
- content-state report: substantive, partial, placeholder, duplicate, or obsolete;
- asset and citation inventory;
- source hashes and timestamps.

Exit criteria:

- every page has a stable project ID;
- no duplicate route or ambiguous parent;
- every source page has a defined canonical-language decision or an open blocker.

### Phase 2 — Site foundation

Deliverables:

- repository initialization;
- static build and local server;
- three locale roots;
- shared reader shell;
- Atlas landing-page shell;
- language switch;
- responsive navigation;
- local search;
- theme and reduced-motion support;
- CI and Pages workflows;
- 404, sitemap, robots, canonical, and `hreflang`.

Exit criteria:

- a synthetic/sample content set builds and deploys correctly under a repository subpath;
- all route, accessibility, and artifact checks pass.

### Phase 3 — Pilot content

Recommended pilot:

- one substantive Part A overview;
- one math-heavy lesson;
- one code lesson;
- one figure-heavy legacy/reference lesson;
- one exercise/project page;
- one placeholder page represented only in the roadmap.

Deliverables:

- Korean, English, and Vietnamese versions;
- trilingual glossary seed;
- complete attribution and asset records;
- technical and language review evidence;
- rendered desktop/mobile QA.

Exit criteria:

- exact language switching;
- code and formulas verified;
- no unresolved rights items;
- reviewers accept terminology and style;
- the process produces measurable review effort per page.

### Phase 4 — Batch translation

Batch by coherent learning unit, not arbitrary page count:

1. Part A — foundations;
2. Part B — data/features/labels;
3. Part C — training/validation/test;
4. Part D — metrics;
5. Part E — fitting and generalization;
6. Part F — workflow;
7. Part G — system design;
8. Part H — pitfalls;
9. Part K — summary/exercises/projects;
10. legacy/reference material.

Each batch repeats source lock → draft → automated checks → technical review → language review → rights review → preview → publish.

### Phase 5 — Public beta

Deliverables:

- only reviewed pages marked stable;
- draft/preview badges where applicable;
- issue forms and contribution guide;
- source-drift notices;
- analytics decision that respects privacy;
- broken-link and accessibility reports.

Exit criteria:

- no critical content, rights, security, route, or accessibility failures;
- rollback procedure tested;
- attribution visible on every page.

### Phase 6 — Stable operation

- monthly source-drift review;
- glossary versioning;
- dependency updates through reviewed PRs;
- quarterly link and asset audit;
- published correction log;
- archived source snapshots and build artifacts;
- clear deprecation/redirect policy when WikiDocs reorganizes pages.

## 9. Logic review

### Blocker — Permission and provenance

CC BY 4.0 is favorable, but the book contains or references third-party material and WikiDocs restricts unauthorized automated collection. Obtain author-approved sources and asset-level provenance before mirroring.

### High — Two competing information architectures

The current sidebar combines 43 older entries and 79 newer entries. Publishing the flat tree would confuse readers, duplicate topics, and make translation status misleading. Separate `fundamentals` and `legacy`.

### High — Page count is not completion

Some new leaf pages contain only `x`. A 122/122 route claim would measure URLs, not educational content. Track `sourceState` and hide placeholders from the finished reader.

### High — Canonical-language ambiguity

An English book already exists. Translating Korean→English blindly would create a third version and introduce drift. Resolve authority per page and reuse author-approved English content where appropriate.

### High — Reference scripts are overfitted

The `helloalgo` implementation proves the workflow, but its registry and checks are hard-coded around Hello Algo. Refactor to data-driven catalogs and generic locale arrays before adding content.

### Medium — Structural parity can create false confidence

Matching headings, formulas, and images does not prove conceptual correctness. Independent ML review and executable examples are mandatory.

### Medium — Moving source

WikiDocs remains editable. Without immutable hashes and drift handling, translations become stale silently. Every publication must point to a frozen source revision.

### Medium — Route instability

Translated titles and WikiDocs ordering can change. Identity must use an internal ID plus external page ID, not title-derived paths alone.

### Medium — Asset hotlinking

Hotlinked WikiDocs images can disappear and may have unclear rights. Store only cleared assets locally and preserve credits; otherwise use a link to the original instead of copying.

### Medium — ML example validity

Code that runs can still contain leakage, invalid evaluation, non-reproducibility, or misleading claims. Tests must include ML-specific assertions, not syntax alone.

### Low — GitHub Pages limitations

Client-side search and static labs work well, but editorial permissions and private previews require GitHub workflows or another preview service.

## 10. Definition of done

The project is complete only when:

- the rights and source-transfer gate is documented;
- every published page has stable identity and source hash;
- Korean, English, and Vietnamese routes switch exactly;
- placeholders are never described as completed translations;
- technical, language, and rights reviews are independently recorded;
- code, math, links, assets, routes, accessibility, and the generated artifact pass CI;
- GitHub Pages deploys only from reviewed `main`;
- attribution and modification notices appear on every page;
- source drift is detectable and does not overwrite reviewed translations;
- the live site can be rebuilt from a clean clone with documented commands.

## 11. Immediate next actions

1. Contact 고민수 and 장선진 with a concrete request to republish and translate book 9057 on GitHub/GitHub Pages under CC BY 4.0, including its images and code.
2. Ask for an official export or author-controlled GitHub source and identify the canonical language for each collection.
3. Decide whether the project covers only the newer 79-entry curriculum or also the 43-entry legacy/reference tree.
4. After those decisions, initialize this empty directory as the new repository and implement Phase 1 cataloging plus the Phase 2 site shell.
5. Run the six-page pilot before estimating the full translation schedule.

## 12. Execution addendum — permission-safe pilot

Decision date: 2026-07-28

The approved execution path is an original “Gradient Atlas” pilot. The project
does not ingest, mirror, scrape, or translate WikiDocs prose or media. WikiDocs
book 9057 is used only to understand the general subject area and is linked as
related reading.

### 12.1 Implemented scope

- one language-selection route;
- Korean, English, and Vietnamese Atlas routes;
- six exact trilingual lesson counterparts;
- a nine-part learning roadmap;
- interactive split, threshold, and generalization labs;
- responsive lesson reader with previous/next navigation and article outline;
- dark/light theme and reduced-motion behavior;
- source and rights policy page;
- original-content, review, and rights status ledgers;
- separate MIT software and CC BY 4.0 content licenses;
- production worker build for hosted deployment;
- pilot static export containing 25 routes for GitHub Pages (superseded by the
  376-file full-corpus export in Section 13);
- CI and GitHub Pages deployment workflows;
- route-render, content-governance, and translation-identity tests.

### 12.2 Pilot lesson matrix

| Part | Stable ID | Stable slug | Primary teaching decision |
|---|---|---|---|
| A | `mlf-a-01` | `what-machine-learning-learns` | Define task, representation, objective, and evidence |
| B | `mlf-b-01` | `data-features-and-labels` | Treat data as a measurement process |
| C | `mlf-c-01` | `train-validation-and-test` | Separate fitting, choosing, and claiming |
| D | `mlf-d-01` | `metrics-and-thresholds` | Choose metrics and operating thresholds from error costs |
| E | `mlf-e-01` | `bias-variance-and-overfitting` | Diagnose generalization failure |
| F | `mlf-f-01` | `end-to-end-ml-workflow` | Join decisions into an observable operating loop |

Each ID has Korean, English, and Vietnamese content. The slug is deliberately
language-neutral so changing language replaces only the locale segment.

### 12.3 Execution logic review

`Risk: public pages could look authoritatively finished`

Resolution:

- every lesson is `publicationState: preview`;
- language review is `pending`;
- the header, home page, reader sidebar, and source policy disclose the review
  state;
- no “independently reviewed” claim is generated by automated checks.

`Risk: topic inspiration could be confused with copied expression`

Resolution:

- no WikiDocs page body was imported;
- no WikiDocs page ID occurs in the authored lesson source;
- no third-party images, code, or datasets ship in the pilot;
- the relationship is described as topic-level reference and external reading;
- future adaptations still require the Phase 0 rights gate.

`Risk: one build architecture might not serve both GitHub Pages and hosted
production`

Resolution:

- the normal build produces a Cloudflare Worker-compatible artifact;
- `build:pages` performs a separate static export;
- all language and lesson parameters are enumerated at build time;
- trailing-slash routes work on static hosting;
- the GitHub repository base path is added only for the Pages target.

`Risk: localized titles could break language switching`

Resolution:

- all locales share one stable English slug and one internal document ID;
- language links preserve the current lesson slug;
- build tests render the same metrics lesson in all three languages.

`Risk: structural checks could overstate quality`

Resolution:

- automated checks prove identity, coverage, rights state, and renderability;
- they do not promote content to stable status;
- independent ML and native-language review remain explicit human gates.

`Risk: interactive demonstrations could imply empirical scientific results`

Resolution:

- the three labs are labeled conceptual demonstrations;
- their deterministic values illustrate trade-offs rather than reporting a
  dataset or experiment;
- the accompanying lessons explain the assumptions behind each visualization.

### 12.4 Pilot acceptance matrix

| Gate | Automated evidence | Release decision |
|---|---|---|
| Content identity | 6 unique IDs and slugs | Required |
| Locale coverage | 6 documents × 3 locales | Required |
| Rights | All pilot documents `original`; asset list empty | Required |
| Review honesty | All documents `preview`; language review pending | Required |
| Worker rendering | Root, 3 Atlas routes, lesson counterparts, policy | Required |
| Static publishing | 25 prerendered pages | Required |
| Interactions | Three keyboard/touch-compatible range controls | Required |
| Accessibility baseline | Semantic headings, labels, nav landmarks, focus styles, reduced motion | Required |
| Human ML review | Pending | Blocks stable label, not preview |
| Native-language review | Pending | Blocks stable label, not preview |

### 12.5 Pilot-era next content gate (superseded)

At the pilot checkpoint, Parts G, H, and K remained roadmap-only. That gate was
later resolved by the rights-safe full-corpus strategy in Section 13. The
original conditions were:

1. the six pilot lessons receive human feedback;
2. glossary and style corrections are folded back into all three locales;
3. the review effort per lesson is measured;
4. the project decides whether future material remains fully original or uses
   author-approved CC BY adaptations.

## 13. Full-corpus execution addendum (implemented 2026-07-28)

The project proceeded with the rights-safe path selected in the review:
WikiDocs book 9057 is retained only as a historical topic-link index. Gradient
Atlas does not rely on a WikiDocs reuse license and supplies independently
written explanations, exercises, examples, interface, and interactive
demonstrations.

### 13.1 Delivered scope

- 122 stable curriculum identities: 43 legacy/reference and 79 fundamentals.
- 366 localized reader routes: English, Vietnamese, and Korean for every page.
- Exact page-level historical WikiDocs links and a no-reproduction disclosure.
- One searchable, filterable catalog per language.
- Six expanded editorial showcase chapters retained inside the full catalog.
- Generated governance records for all 122 documents and all three locales.
- Static generation for the root, locale homes, catalogs, policy, and readers.

### 13.2 Full-corpus logic review

`Risk: catalog, routes, and governance ledgers drift apart`

Resolution: `app/data/full-curriculum.ts` is the single identity source. Runtime
lessons and generated governance records derive from it. Automated checks assert
122 unique IDs, slugs, and source page IDs plus the 43/79 collection split.

`Risk: 122 links make the home page and reader unusable`

Resolution: the home page retains six editorial showcase cards; a dedicated
catalog adds search and collection filters. The reader sidebar shows the
current part while previous/next navigation preserves global reading order.

`Risk: language switching loses the current document`

Resolution: all locales share stable slugs. Locale links preserve either
`/catalog/` or `/learn/<slug>/`, and the build enumerates the same 122 slugs for
each language.

`Risk: outline adaptation is mistaken for copied prose`

Resolution: every page carries its exact historical topic link and a localized
notice that the linked expression is not reproduced or translated. Governance
records `sourceLicenseReliedOn: false` and `bodyRights: original`; no WikiDocs
prose, images, code, equations, or media are imported.

`Risk: generated coverage is mistaken for independent editorial approval`

Resolution: all 366 pages remain clearly labeled public preview. Automated
logic, structure, rights, build, and route checks do not change the pending
native-language and independent technical review status.

## 14. Book-reader interface review (implemented after reference audit)

Reference behavior was reviewed against the Hello Algo Vietnamese reader. The
useful design pattern is structural rather than visual copying: a sticky global
header, an independently scrollable chapter tree, a centered long-form reading
column, an inline section index, current-page context, and an off-canvas mobile
contents drawer.

### 14.1 Implemented reader behavior

- all 122 pages remain visible in a chapter-grouped left navigation;
- the chapter tree scrolls independently from the article;
- the current page is highlighted and automatically centered in the tree;
- title and concept search filters the navigation without changing routes;
- the article exposes a native, collapsible “on this page” section index;
- a top progress line reflects document scroll position;
- mobile navigation uses a labeled drawer, backdrop, Escape handling, scroll
  locking, and removes hidden links from keyboard navigation;
- previous/next links preserve the canonical 122-page reading order.

### 14.2 Logic review

`Risk: 122 links make the document itself difficult to scroll`

Resolution: the contents panel has its own viewport and overscroll boundary.
The article remains normal document flow, so browser find, anchor links, and
reading position behave conventionally.

`Risk: mobile navigation disappears or traps keyboard users`

Resolution: the same chapter tree becomes an off-canvas drawer. Its toggle
exposes `aria-controls` and `aria-expanded`; when closed on narrow screens, the
drawer is inert and hidden from assistive navigation.

`Risk: copying the reference creates a derivative visual identity`

Resolution: only the information architecture and interaction pattern are
adopted. Gradient Atlas retains its own typography, palette, icon language,
content cards, and editorial disclosures.

`Risk: source attribution becomes secondary in the new layout`

Resolution: the historical-link disclosure stays inside the article flow on
every breakpoint, links the exact page, and says that Gradient Atlas does not
reproduce or translate it. Original Gradient Atlas material has a separate
CC BY 4.0 policy.

## 15. Trilingual terminology and mathematical notation review

The Vietnamese and Korean readers preserve a canonical English reference beside
every localized lesson title. Curated terminology panels pair recurring local
terms with their English equivalents, while the English edition exposes the
same key-concept set without repeating an English-title label.

Mathematical notation is added only when a formula materially clarifies the
topic. The formula catalog now covers 87 of 122 topics, including every
algorithm and code-focused page. It spans learning objectives, sampling,
feature transformations, label noise, leakage timing, split integrity,
clustering, dimensionality reduction, reinforcement learning, neural networks,
regression, probabilistic models, optimization, evaluation metrics, fitting
diagnostics, regularization, deployment latency, monitoring, and scalability.
Each entry is independently typeset and accompanied by an original trilingual
explanation and symbol definitions. All 32 algorithm and code-focused pages go
one level deeper with variable-length derivations. Each equation states its
purpose, defines every displayed component, and ends with an explicit reasoning
bridge explaining why the following equation is needed. A derivation ends at
its natural mathematical result rather than at an arbitrary three-step limit.
Each stage is a full-width horizontal content row: step label, component
definitions, then a wide formula-and-reasoning area. Rows stack in derivation
order so long notation and explanatory text do not compete for narrow columns.

### 15.1 Logic review

`Risk: English terminology overwhelms the Vietnamese lesson`

Resolution: the localized title remains the primary heading. The canonical
English title appears as a compact reference, and the terminology panel is
limited to the main topic plus at most three verified recurring terms.

`Risk: a formula is decorative or misleading`

Resolution: formula support is keyed to specific mathematically substantive
topics. Historical, policy, and other prose-first pages are not forced to
contain equations. Automated checks reject unknown lesson keys, missing
localized explanations or symbol definitions, technical pages without a
mathematical anchor, technical flows with fewer than two intermediate steps,
steps without component definitions, missing localized explanations, source
URLs inside formulas, and coverage below the reviewed baseline. The audit also
requires at least one reviewed derivation beyond three equations so the data
model cannot regress to a fixed three-card template.

`Risk: mathematical facts are confused with copied exposition`

Resolution: notation is independently selected and typeset. WikiDocs equations,
images, examples, and prose are not imported. The accompanying teaching text
and symbol definitions are original Gradient Atlas content.

`Risk: long notation breaks the mobile reader`

Resolution: individual expressions remain horizontally scrollable and keep
their semantic math label. Formula flows use full-width rows with downward
sequence arrows. On narrow screens, each row reflows internally to a single
column while preserving the same component → formula → reasoning order.

## 16. Original concept-diagram review

Twenty-two high-value lessons now contain code-native diagrams. The original set
covers data leakage, train/validation/test splitting, the confusion matrix,
linear regression, bias–variance behavior, and the end-to-end ML workflow. The
expanded set adds the learning-type taxonomy, supervised-learning feedback,
cluster geometry, neural-network layers, decision-tree branching,
cross-validation rotation, the ROC trade-off curve, and distribution shift.
The second-pass set adds the reinforcement-learning loop, ensemble aggregation,
dimensionality projection, graph message passing, support-vector margins, the
batch training loop, class imbalance, and the course concept map.
The diagrams use only project-authored HTML and CSS, retain the Gradient Atlas
visual system, and are captioned as original CC BY 4.0 illustrations.

### 16.1 Logic review

`Risk: an illustration silently reuses uncertain WikiDocs media`

Resolution: the diagram component contains no image, video, iframe, or SVG
asset. Automated checks enforce that boundary, and the content license states
that WikiDocs media is neither copied nor hotlinked.

`Risk: a diagram simplifies the concept into an incorrect claim`

Resolution: each visual encodes one narrow relationship: the decision-time
boundary, the different responsibilities of three data partitions, the four
exclusive confusion-matrix outcomes, residuals around a fitted line, the
train–validation error gap, feedback in an ML workflow, taxonomy branches,
label-driven feedback, spatial grouping, layer-wise transformation,
question-based partitioning, fold rotation, threshold trade-offs, or changing
feature distributions. The second-pass diagrams separately encode an
action–reward cycle, parallel model aggregation, neighborhood-preserving
projection, graph message passing, maximum-margin geometry, iterative parameter
updates, skewed class prevalence, and curriculum dependencies. The surrounding
lesson and caption explain the limits of the model.

`Risk: the visual is inaccessible or language-specific`

Resolution: every figure has localized visible labels, a localized descriptive
accessible name, explanatory caption text, and a license notice in English,
Vietnamese, and Korean.

`Risk: a wide visual breaks the mobile reader`

Resolution: the figure viewport permits horizontal scrolling for diagrams that
need a stable coordinate system. The bias–variance panels stack vertically,
and captions continue to wrap normally.

### 16.2 Placement review

A visual is added only when it reduces a specific reasoning burden: comparing
several categories, following a feedback loop, seeing spatial separation,
tracking layered or branching structure, comparing repeated evaluation rounds,
reading a two-axis trade-off, or noticing a distribution change. Topics that
are already clearer as prose, formulas, or short lists remain text-only. This
keeps diagrams instructional and avoids a decorative illustration quota.

## 17. Deeper guided-learning review (implemented 2026-07-30)

### 17.1 Evaluation of the proposal

The proposal correctly identifies the main weakness of the previous guided
course: it had a coherent project narrative, but the reasoning path was not
visible enough at the point of reading. A reader could understand an individual
section yet still lose track of why the chapter exists, how it connects to the
other five chapters, and how to test the idea.

The improved learning loop is:

1. **Locate** — show the current chapter inside the six-step course.
2. **Orient** — state the chapter purpose and draw its four-step reasoning flow.
3. **Explain** — preserve the deeper prose, notation, and topic-specific visual.
4. **Try** — run a small dependency-free Python example and inspect its output.
5. **Check** — answer two concept-focused MCQs before revealing explanations.
6. **Transfer** — connect the stable principle to dated current practice and
   primary references.

This pattern is applied only to the six recommended chapters. The 116 reference
notes remain concise lookup material; forcing the full loop onto them would
blur the distinction between a course and an encyclopedia.

### 17.2 Implemented scope

- one six-step course-position map on every guided chapter;
- one localized four-step thinking-flow diagram per guided chapter;
- a visible chapter purpose before the detailed explanation;
- six original, dependency-free Python examples with expected output,
  interpretation, and a small extension challenge;
- two four-option MCQs with an explained answer on every guided chapter;
- dated current-practice guidance in English, Vietnamese, and Korean;
- primary-source links from Google, scikit-learn, NIST, and Stanford HAI;
- larger desktop sidebar type and width without changing the mobile drawer;
- dynamic in-page numbering so future section counts cannot make the outline
  labels incorrect.

### 17.3 Logic review

`Risk: diagrams become decoration or repeat the prose`

Resolution: the position map answers “where am I?” and the thinking flow answers
“what reasoning should I perform?” They encode different relationships. Existing
concept diagrams remain only on topics where geometry or system flow adds a
third distinct explanation.

`Risk: examples look runnable but depend on an unmentioned environment`

Resolution: every example uses only the Python standard language, has fixed
inputs and deterministic output, and is executed during release review. The
small late-delivery scenario continues the same project instead of introducing
six unrelated toy domains.

`Risk: MCQs reward wording recognition instead of judgment`

Resolution: each question tests a decision boundary, evaluation choice, failure
mode, or operational consequence. Each has four plausible options and an
explanation of why the selected answer follows from the chapter. Display order
rotates deterministically across chapters so the answer position does not teach
a repeated guessing pattern.

`Risk: “current trends” age quickly or overstate consensus`

Resolution: the section is called current practice, carries a July 2026 review
date, separates stable advice from watch items, and links to primary technical
or standards sources. It does not copy source prose or imply that a citation's
content is CC BY 4.0.

`Risk: the expanded chapter becomes too dense`

Resolution: orientation, practice, review, and trend material are visually
separated; code and wide flows scroll safely; answers use native disclosure
controls; the inline outline links directly to the new blocks. Estimated reading
times were increased to reflect the real work.

`Risk: larger sidebar text reduces usable navigation`

Resolution: the desktop rail is widened with the type increase and remains
independently scrollable. At responsive breakpoints it still becomes the tested
off-canvas contents drawer.

`Risk: legal boundaries regress while adding current sources`

Resolution: all new prose, diagrams, questions, and Python examples are original.
External material is linked as reference-only and retains its own rights. No
third-party media, code, or passages were imported, and WikiDocs remains a
historical topic link only.

## 18. Topic-matched reading shelf (implemented 2026-07-30)

The reference library now serves two clearly separated purposes:

1. **traceability and verification** — sources used to check a technical claim
   or explain the project’s learning design;
2. **continued learning** — external books, courses, and technical guides a
   reader can choose after completing a lesson.

Every one of the 122 lesson identities receives four recommendations. Selection
uses the lesson slug and teaching tags to choose one primary profile:
foundations, data, evaluation, mathematics, deep learning, NLP, computer vision,
reinforcement learning, production, or responsible AI. Guided chapters preserve
their existing reviewed references, then fill the remaining positions with
profile-matched material.

The expanded shelf includes Mathematics for Machine Learning, Probabilistic
Machine Learning, the Deep Learning textbook, the scikit-learn MOOC, fast.ai’s
Practical Deep Learning for Coders, official PyTorch tutorials, the Hugging Face
LLM Course, and Full Stack Deep Learning.

### 18.1 Logic review

`Risk: every page receives the same generic links`

Resolution: a deterministic profile matcher selects books and courses by topic.
Automated checks require exactly four unique recommendations for every lesson.

`Risk: a long resource list overwhelms the lesson`

Resolution: the page shows four cards only. Each card identifies whether it is a
book, course, or technical guide and explains why the reader might choose it.

`Risk: a recommendation is confused with copied source material`

Resolution: the reading shelf is visually and structurally separate from the
historical WikiDocs disclosure. Cards link outward, retain the external rights
label, and reproduce no passages, figures, code, or book assets.

`Risk: the historical WikiDocs page becomes a recommended learning path`

Resolution: recommendation checks explicitly reject `wikidocs-index`. WikiDocs
remains a page-level historical topic link only.

`Risk: links exist only on the six editorial chapters`

Resolution: the shelf renders on all English, Vietnamese, and Korean lesson
routes, including the 116 reference notes. Route tests verify four cards on all
366 localized pages.

## 19. Reader typography review (implemented 2026-08-01)

The live desktop and mobile audit found that main lesson prose was already
readable at 16 px, but several supporting surfaces were materially smaller:
formula component definitions were about 9 px, sidebar descriptions about
11 px, chapter links about 12 px, and reading-resource explanations about
11 px. These sizes made the book feel compressed even when its main paragraphs
were acceptable.

The revised scale raises main lesson prose to approximately 17 px and moves
navigation, formula explanations, exercises, quiz answers, references, and
secondary descriptions into a practical 12–15 px range. Small uppercase labels
remain visually subordinate but no longer carry essential explanatory content
at the old micro-text scale.

### 19.1 Logic review

`Risk: globally enlarging every rem value breaks diagrams and navigation`

Resolution: the change is targeted by semantic surface rather than changing
the root font size. Dense diagrams retain their geometry, while the sidebar,
article, formulas, practice blocks, questions, and resources receive explicit
readability increases.

`Risk: larger text recreates excessive vertical scrolling`

Resolution: spacing and card counts stay unchanged. The typography pass changes
font size and line height, while preserving the compact section rhythm and the
full-width formula-row layout.

`Risk: desktop improves while mobile remains difficult`

Resolution: the same semantic sizes apply on mobile, where full-width formula
rows already reflow internally. Automated checks protect the reviewed body,
sidebar, formula-component, and resource-description minimums.

## 20. Complete reference-lesson reconstruction (implemented 2026-08-02)

### 20.1 Completion audit

The route and localization audits were structurally green, but the content
audit found a deeper editorial defect: 116 of 122 topics were produced by the
same generic three-section function. Titles and terminology changed, yet the
central explanation, workflow advice, failure discussion, and exercise were
substantially repeated. These routes were valid pages but weak lessons.

The six guided chapters already had manually written depth. The remaining 116
routes are now backed by explicit topic-knowledge records. Every record contains
a unique core explanation and worked example in English, Vietnamese, and
Korean. A relevant learning profile adds the mechanism, four-step reasoning
checklist, and failure test for its subject family. The page closes with a
hands-on reconstruction exercise, mathematical support where applicable, and
four topic-matched continuation resources.

Seventeen code and exercise routes now include distinct dependency-free Python
examples with observable output or assertions. Together with the six guided
practices, the site contains 23 runnable small exercises.

### 20.2 Research and rights boundary

The reconstruction uses the existing 24-source library as a verification and
further-reading layer. The main technical routing was checked against the
official scikit-learn User Guide for supervised learning, unsupervised
learning, preprocessing, model selection, evaluation, pipelines, and common
pitfalls; official PyTorch tutorials for tensor, neural-network, training, and
transformer workflows; Dive into Deep Learning for the explanation–math–code
sequence; Hugging Face's official course for modern NLP workflows; Google's ML
materials for problem framing and production monitoring; and NIST guidance for
risk and deployed-system review.

No source passage, figure, or sample program is reproduced. The lessons use
independently written explanations, small original examples, mathematical
notation, and original Python. WikiDocs remains a page-level historical topic
link and is not used as a reuse-license basis.

### 20.3 Logic review

`Risk: replacing one template with several family templates still feels repetitive`

Resolution: the family profile supplies only the reusable learning scaffold.
The definition and worked example—the two parts that establish topic meaning—
are unique for all 116 lessons and every locale. Automated checks reject a
missing topic record, duplicate core, duplicate worked example, or the former
placeholder phrases.

`Risk: translated pages drift structurally or omit the new depth`

Resolution: every topic record is a single trilingual unit and the renderer
selects one locale from the same structure. Existing route tests continue to
compare section, formula, note, code, diagram, exercise, and terminology shape
for English, Vietnamese, and Korean.

`Risk: a page labeled “with code” still contains only prose`

Resolution: the audit enumerates every `code` and `exercise` route and requires
one unique Python example with an observable `print` or `assert`. It rejects
unknown, duplicated, copied, or URL-dependent samples.

`Risk: more content recreates excessive scrolling`

Resolution: each reference lesson uses three focused instructional sections:
core idea, mechanism, and worked example plus failure check. Mathematical flows
and code appear only where relevant, and deeper books or official guides remain
in the continuation shelf instead of being paraphrased into oversized pages.

## 21. Mobile layout completion audit (implemented 2026-08-02)

### 21.1 Audit model

The mobile review covers the language gate, all three localized book homes,
all three catalogs, the source-policy page, and the shared lesson renderer used
by all 366 localized lesson routes. The narrowest supported viewport is 320 px;
360–390 px phone layouts are the primary review range, with the 720 px drawer
breakpoint protecting small tablets and landscape phones.

The first rendered phone check found a document-level horizontal scrollbar on
localized home pages. Large decorative hero orbits extended beyond the hero,
and `.book-site` intentionally allowed visible overflow. This made the whole
page roughly twice the viewport width even though the learning content itself
was responsive.

### 21.2 Implemented corrections

- Decorative hero orbits are removed below 720 px, edge nodes are pulled
  inside the visual, and the hero plus page-content boundary clip decoration.
- The mobile reader menu and locale/theme controls now meet a 44 px touch
  target. At very narrow widths the redundant header wordmark is hidden so the
  controls cannot collide.
- Long lesson titles, catalog entries, source labels, and code-header labels can
  wrap without widening the document.
- Formula derivations retain the requested row layout and scroll inside their
  own bounded panel. Code, thinking flows, course maps, and wide original
  diagrams use the same contained touch-scroll behavior.
- Cards, source-policy actions, lesson metadata, and reference headers reflow at
  420 px without shrinking the main reading text.

### 21.3 Logic review

`Risk: hiding overflow conceals inaccessible learning content`

Resolution: only decorative page-level overflow is clipped. Information that
is inherently wide—formula rows, diagrams, code, the course map, and thinking
flows—keeps an explicit inner horizontal scroller with touch panning and a
visible thin scrollbar.

`Risk: enlarging header controls creates a new collision on 320 px screens`

Resolution: the book wordmark is redundant with the page identity and is hidden
only below 420 px. The fixed menu, three locale targets, and theme target then
fit with safe gaps at the minimum supported width.

`Risk: one inspected lesson does not represent the complete atlas`

Resolution: all lessons share the same header, drawer, article, formula,
diagram, exercise, reference, and pagination components. Automated tests still
render every locale/topic pair and now also require viewport metadata and the
responsive safeguards used by those shared components.
