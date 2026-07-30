import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { curriculumSeeds } from "../app/data/full-curriculum.ts";
import {
  formulaSupportBySlug,
  vietnameseTerminology,
} from "../app/data/learning-support.ts";
import {
  getGuidedDepth,
  practiceCodeBySlug,
  practiceOutputBySlug,
} from "../app/data/guided-depth.ts";
import {
  guidedSlugs,
  referenceSources,
} from "../app/data/guided-course.ts";

const catalog = JSON.parse(await readFile("governance/catalog.json", "utf8"));
const status = JSON.parse(await readFile("governance/translation-status.json", "utf8"));
const assetRights = JSON.parse(await readFile("governance/asset-rights.json", "utf8"));
const contentSource = await readFile("app/data/content.ts", "utf8");
const diagramSource = await readFile("app/ui/LessonDiagram.tsx", "utf8");
const plan = await readFile("PROJECT_PLAN_AND_LOGIC_REVIEW.md", "utf8");

assert.equal(curriculumSeeds.length, 122, "Expected the verified 122-page outline");
assert.equal(catalog.documents.length, 122, "Catalog must cover every outline page");
assert.equal(status.documents.length, 122, "Translation ledger must cover every outline page");
assert.equal(assetRights.assets.length, 1, "Every shipped raster asset needs a rights record");
assert.equal(assetRights.assets[0].path, "public/og.png");
assert.equal(assetRights.assets[0].sourceType, "project-generated");
assert.deepEqual(assetRights.assets[0].externalInputs, []);
assert.equal(new Set(curriculumSeeds.map((item) => item.id)).size, 122, "Duplicate content ID");
assert.equal(new Set(curriculumSeeds.map((item) => item.slug)).size, 122, "Duplicate slug");
assert.equal(new Set(curriculumSeeds.map((item) => item.sourcePageId)).size, 122, "Duplicate WikiDocs source page");
assert.equal(curriculumSeeds.filter((item) => item.collection === "legacy").length, 43);
assert.equal(curriculumSeeds.filter((item) => item.collection === "fundamentals").length, 79);
for (const seed of curriculumSeeds) {
  assert.ok(seed.titles.en.trim(), `${seed.id} missing English title`);
  assert.ok(seed.titles.vi.trim(), `${seed.id} missing Vietnamese title`);
  assert.ok(seed.titles.ko.trim(), `${seed.id} missing Korean title`);
  assert.ok(new Set(Object.values(seed.titles)).size >= 2, `${seed.id} titles are not localized`);
  assert.ok(seed.tags.length >= 2, `${seed.id} needs at least two teaching concepts`);
  const terminology = vietnameseTerminology(seed);
  assert.ok(terminology.length >= 1, `${seed.id} missing Vietnamese–English terminology`);
  assert.equal(terminology[0].local, seed.titles.vi);
  assert.equal(terminology[0].english, seed.titles.en);
}

const formulaEntries = Object.entries(formulaSupportBySlug);
assert.ok(formulaEntries.length >= 30, "Expected broad mathematical coverage");
for (const [slug, formula] of formulaEntries) {
  assert.ok(curriculumSeeds.some((seed) => seed.slug === slug), `Unknown formula slug: ${slug}`);
  assert.ok(formula.expression.trim(), `${slug} missing formula expression`);
  assert.ok(formula.explanation.en.trim(), `${slug} missing English formula explanation`);
  assert.ok(formula.explanation.vi.trim(), `${slug} missing Vietnamese formula explanation`);
  assert.ok(formula.explanation.ko.trim(), `${slug} missing Korean formula explanation`);
  assert.doesNotMatch(formula.expression, /wikidocs|https?:\/\//i, `${slug} formula must be source-independent`);
}

for (const document of catalog.documents) {
  const seed = curriculumSeeds.find((item) => item.id === document.id);
  assert.ok(seed, `${document.id} missing from curriculum source`);
  assert.equal(document.slug, seed.slug);
  assert.equal(document.sourcePageId, seed.sourcePageId);
  assert.deepEqual(document.creators, ["고민수", "장선진"]);
  assert.equal(document.sourceRole, "historical-topic-link");
  assert.equal(document.sourceReuse, "none");
  assert.equal(document.sourceLicenseReliedOn, false);
  assert.deepEqual(document.modifications, []);
  assert.equal(document.bodyRights, "original");
  assert.equal(document.sourceState, "independently-authored");
  const translation = status.documents.find((item) => item.id === document.id);
  assert.ok(translation, `${document.id} missing translation status`);
  assert.deepEqual(translation.locales, ["ko", "en", "vi"]);
  assert.equal(translation.rightsReview, "original-content-only");
  assert.equal(translation.publicationState, "preview");
  assert.notEqual(translation.languageReview, "independently-reviewed");
}

for (const marker of ["lessonsEn", "lessonsVi", "lessonsKo"]) {
  assert.match(contentSource, new RegExp(`const ${marker}`));
}
assert.match(contentSource, /function generatedLesson/);
assert.match(contentSource, /function mergePilot/);
assert.equal(guidedSlugs.length, 6, "Guided course must contain six chapters");
assert.equal(new Set(guidedSlugs).size, 6, "Guided course contains duplicate chapters");
for (const slug of guidedSlugs) {
  assert.ok(curriculumSeeds.some((seed) => seed.slug === slug), `Unknown guided slug: ${slug}`);
}
assert.ok(referenceSources.length >= 24, "Expected the expanded reading and verification library");
assert.equal(new Set(referenceSources.map((source) => source.id)).size, referenceSources.length);
for (const source of referenceSources) {
  assert.match(source.url, /^https:\/\//, `${source.id} must use an HTTPS source URL`);
  assert.ok(source.license.trim(), `${source.id} missing rights boundary`);
}
assert.ok(referenceSources.some((source) => source.id === "wikidocs-index" && /not relied on/i.test(source.license)));
assert.ok(referenceSources.some((source) => source.id === "statistical-learning" && /all rights reserved/i.test(source.license)));

for (const slug of guidedSlugs) {
  assert.ok(practiceCodeBySlug[slug].includes("print("), `${slug} needs runnable Python output`);
  assert.ok(practiceOutputBySlug[slug].trim(), `${slug} missing expected Python output`);
  assert.doesNotMatch(practiceCodeBySlug[slug], /wikidocs|https?:\/\//i);
  for (const locale of ["en", "vi", "ko"]) {
    const depth = getGuidedDepth(locale, slug);
    assert.ok(depth, `${locale}/${slug} missing guided depth`);
    assert.equal(depth.thinkingFlow.length, 4, `${locale}/${slug} needs a four-step reasoning flow`);
    assert.ok(Number(depth.estimatedMinutes) >= 15, `${locale}/${slug} reading time is too short`);
    assert.equal(depth.quiz.length, 2, `${locale}/${slug} needs two MCQs`);
    for (const quiz of depth.quiz) {
      assert.equal(quiz.options.length, 4, `${locale}/${slug} MCQ needs four options`);
      assert.ok(quiz.answer >= 0 && quiz.answer < quiz.options.length, `${locale}/${slug} MCQ answer is out of range`);
      assert.ok(quiz.explanation.trim(), `${locale}/${slug} MCQ missing explanation`);
    }
    assert.ok(depth.trend.watch.length >= 3, `${locale}/${slug} trend note needs practical signals`);
    for (const referenceId of depth.trend.references) {
      assert.ok(referenceSources.some((source) => source.id === referenceId), `${locale}/${slug} has unknown trend reference ${referenceId}`);
    }
  }
}

assert.match(contentSource, /Human review pending|human review pending/i);
assert.match(plan, /122 unique page entries/);
assert.match(plan, /Do not publish source text before this gate passes/);
assert.match(contentSource, /outlineAttribution/);
const expectedDiagramSlugs = [
  "data-leakage",
  "train-validation-and-test",
  "confusion-matrix",
  "linear-regression",
  "bias-variance-and-overfitting",
  "end-to-end-ml-workflow",
  "types-of-learning",
  "supervised-learning",
  "clustering",
  "artificial-neural-networks",
  "decision-trees",
  "cross-validation",
  "roc-auc",
  "distribution-shift",
  "reinforcement-learning",
  "ensemble-learning",
  "dimensionality-reduction-and-metric-learning",
  "graph-machine-learning",
  "support-vector-machines",
  "training-loop",
  "data-imbalance",
  "concept-map",
];
assert.equal(new Set(expectedDiagramSlugs).size, 22);
assert.doesNotMatch(diagramSource, /<(?:img|video|iframe|svg)\b/i);
for (const slug of expectedDiagramSlugs) {
  assert.match(diagramSource, new RegExp(`"${slug}"`));
}
await access("CONTENT_LICENSE.md");
await access("LICENSE");

console.log("Content audit passed: 122 topics × 3 locales, a 24-source reading and verification library, 6 deep guided chapters, 12 orientation visuals, 6 Python practices, and 12 MCQs.");
