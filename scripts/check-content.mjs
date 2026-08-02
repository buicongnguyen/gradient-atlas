import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { curriculumSeeds } from "../app/data/full-curriculum.ts";
import {
  formulaSupportBySlug,
  localizedTerminology,
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
import { topicDepthBySlug } from "../app/data/topic-depth.ts";
import { topicCodeBySlug } from "../app/data/topic-code.ts";
import { getDecisionGuide } from "../app/data/decision-guides.ts";

const catalog = JSON.parse(await readFile("governance/catalog.json", "utf8"));
const status = JSON.parse(await readFile("governance/translation-status.json", "utf8"));
const assetRights = JSON.parse(await readFile("governance/asset-rights.json", "utf8"));
const contentSource = await readFile("app/data/content.ts", "utf8");
const diagramSource = await readFile("app/ui/LessonDiagram.tsx", "utf8");
const plan = await readFile("PROJECT_PLAN_AND_LOGIC_REVIEW.md", "utf8");
const pythonCommand = ["python3", "python"].find((command) =>
  spawnSync(command, ["--version"], { encoding: "utf8" }).status === 0,
);

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
  const englishTerminology = localizedTerminology("en", seed);
  const koreanTerminology = localizedTerminology("ko", seed);
  assert.equal(
    englishTerminology.length,
    terminology.length,
    `${seed.id} English terminology differs from Vietnamese`,
  );
  assert.equal(
    koreanTerminology.length,
    terminology.length,
    `${seed.id} Korean terminology differs from Vietnamese`,
  );
  assert.equal(englishTerminology[0].local, seed.titles.en);
  assert.equal(koreanTerminology[0].local, seed.titles.ko);
  assert.equal(koreanTerminology[0].english, seed.titles.en);
}

const formulaEntries = Object.entries(formulaSupportBySlug);
assert.ok(formulaEntries.length >= 87, "Expected broad mathematical coverage");
for (const [slug, formula] of formulaEntries) {
  assert.ok(curriculumSeeds.some((seed) => seed.slug === slug), `Unknown formula slug: ${slug}`);
  assert.ok(formula.expression.trim(), `${slug} missing formula expression`);
  assert.ok(formula.explanation.en.trim(), `${slug} missing English formula explanation`);
  assert.ok(formula.explanation.vi.trim(), `${slug} missing Vietnamese formula explanation`);
  assert.ok(formula.explanation.ko.trim(), `${slug} missing Korean formula explanation`);
  assert.ok(formula.variables?.length, `${slug} missing formula symbol definitions`);
  assert.ok(formula.variables.every((variable) => variable.trim()), `${slug} has an empty symbol definition`);
  assert.doesNotMatch(formula.expression, /wikidocs|https?:\/\//i, `${slug} formula must be source-independent`);
  for (const [index, formulaStep] of (formula.steps ?? []).entries()) {
    assert.ok(formulaStep.expression.trim(), `${slug} formula step ${index + 1} is empty`);
    assert.ok(formulaStep.explanation.en.trim(), `${slug} formula step ${index + 1} lacks English`);
    assert.ok(formulaStep.explanation.vi.trim(), `${slug} formula step ${index + 1} lacks Vietnamese`);
    assert.ok(formulaStep.explanation.ko.trim(), `${slug} formula step ${index + 1} lacks Korean`);
    assert.ok(formulaStep.components?.length, `${slug} formula step ${index + 1} lacks component definitions`);
    assert.ok(formulaStep.components.every((component) => component.includes(":")), `${slug} formula step ${index + 1} has an unexplained component`);
    assert.doesNotMatch(formulaStep.expression, /wikidocs|https?:\/\//i, `${slug} flow must be source-independent`);
  }
}
const technicalSeeds = curriculumSeeds.filter((item) => item.kind === "algorithm" || item.kind === "code");
for (const seed of technicalSeeds) {
  assert.ok(formulaSupportBySlug[seed.slug], `${seed.slug} technical page needs a mathematical anchor`);
  assert.ok(formulaSupportBySlug[seed.slug].steps?.length >= 2, `${seed.slug} needs a multi-equation solution flow`);
}
assert.ok(technicalSeeds.some((seed) => formulaSupportBySlug[seed.slug].steps.length > 2), "Formula flows must not be fixed to three equations");

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
const referenceSeeds = curriculumSeeds.filter((seed) => !guidedSlugs.includes(seed.slug));
assert.equal(referenceSeeds.length, 116, "Expected 116 non-guided lessons");
assert.equal(Object.keys(topicDepthBySlug).length, 116, "Every non-guided lesson needs topic-specific depth");
for (const seed of referenceSeeds) {
  const depth = topicDepthBySlug[seed.slug];
  assert.ok(depth, `${seed.slug} still relies on placeholder lesson content`);
  for (const locale of ["en", "vi", "ko"]) {
    const minimumLength = locale === "ko" ? 45 : 80;
    assert.ok(depth.core[locale].trim().length >= minimumLength, `${locale}/${seed.slug} core explanation is too thin`);
    assert.ok(depth.example[locale].trim().length >= minimumLength, `${locale}/${seed.slug} worked example is too thin`);
    assert.doesNotMatch(depth.core[locale], /practical mental model|mô hình tư duy thực tế|실용적인 사고 모형/i);
    const guide = getDecisionGuide(locale, seed, depth);
    assert.ok(guide.question.includes(seed.titles[locale]), `${locale}/${seed.slug} decision question must name the topic`);
    assert.equal(guide.steps.length, 4, `${locale}/${seed.slug} needs a four-step decision path`);
    assert.equal(guide.alternatives.length, 2, `${locale}/${seed.slug} needs two explicit alternatives`);
    assert.ok(guide.steps.every((step) => step.label.trim() && step.prompt.trim() && step.action.trim()), `${locale}/${seed.slug} has an incomplete decision step`);
    assert.equal(new Set(guide.steps.map((step) => step.prompt)).size, 4, `${locale}/${seed.slug} decision prompts repeat`);
    assert.ok(guide.reconsider.trim().length >= minimumLength, `${locale}/${seed.slug} reconsideration rule is too thin`);
    assert.doesNotMatch(guide.reconsider, /result of this step is the input needed next/i, `${locale}/${seed.slug} uses the old generic transition`);
  }
}
for (const locale of ["en", "vi", "ko"]) {
  const cores = referenceSeeds.map((seed) => topicDepthBySlug[seed.slug].core[locale]);
  const examples = referenceSeeds.map((seed) => topicDepthBySlug[seed.slug].example[locale]);
  assert.equal(new Set(cores).size, cores.length, `${locale} has duplicate core explanations`);
  assert.equal(new Set(examples).size, examples.length, `${locale} has duplicate worked examples`);
  const decisionSignatures = referenceSeeds.map((seed) => {
    const guide = getDecisionGuide(locale, seed, topicDepthBySlug[seed.slug]);
    return `${guide.question}|${guide.steps.map((step) => step.action).join("|")}`;
  });
  assert.equal(new Set(decisionSignatures).size, decisionSignatures.length, `${locale} has duplicate decision paths`);
}
const decisionProfileCases = {
  "linear-regression": /Tree or spline/,
  "decision-trees": /Pruned single tree/,
  clustering: /Alternative representation or distance/,
  "graph-machine-learning": /Row-only model/,
  "gaussian-processes": /Bootstrap or calibrated baseline/,
  "model-evaluation": /Alternative split or cost-aware metric/,
  "model-deployment": /Rule-based fallback/,
  "distribution-shift": /Reference-period replay/,
};
for (const [slug, expectedAlternative] of Object.entries(decisionProfileCases)) {
  const seed = referenceSeeds.find((item) => item.slug === slug);
  assert.ok(seed, `${slug} missing from reference curriculum`);
  const guide = getDecisionGuide("en", seed, topicDepthBySlug[slug]);
  assert.match(guide.alternatives.join(" | "), expectedAlternative, `${slug} uses the wrong decision family`);
}
const practiceSeeds = curriculumSeeds.filter((seed) => seed.kind === "code" || seed.kind === "exercise");
assert.equal(practiceSeeds.length, 17, "Expected 17 code or exercise lessons");
assert.equal(Object.keys(topicCodeBySlug).length, 17, "Every code or exercise lesson needs a distinct Python example");
for (const seed of practiceSeeds) {
  const code = topicCodeBySlug[seed.slug];
  assert.ok(code, `${seed.slug} is missing its Python example`);
  assert.match(code, /print\(|assert /, `${seed.slug} Python example needs an observable check`);
  assert.doesNotMatch(code, /wikidocs|https?:\/\//i);
  if (pythonCommand) {
    const execution = spawnSync(pythonCommand, ["-c", code], {
      encoding: "utf8",
      timeout: 5_000,
    });
    assert.equal(execution.status, 0, `${seed.slug} Python example failed: ${execution.stderr}`);
    assert.ok(execution.stdout.trim(), `${seed.slug} Python example produced no observable output`);
  }
}
assert.equal(new Set(Object.values(topicCodeBySlug)).size, 17, "Python examples must be page-specific");
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
    assert.ok(depth.purpose.trim(), `${locale}/${slug} missing purpose`);
    assert.equal(depth.thinkingFlow.length, 4, `${locale}/${slug} needs a four-step reasoning flow`);
    for (const step of depth.thinkingFlow) {
      assert.ok(step.label.trim(), `${locale}/${slug} thinking step missing label`);
      assert.ok(step.detail.trim(), `${locale}/${slug} thinking step missing detail`);
    }
    assert.ok(Number(depth.estimatedMinutes) >= 15, `${locale}/${slug} reading time is too short`);
    for (const field of ["title", "setup", "interpretation", "challenge"]) {
      assert.ok(depth.practice[field].trim(), `${locale}/${slug} practice missing ${field}`);
    }
    assert.equal(depth.quiz.length, 2, `${locale}/${slug} needs two MCQs`);
    for (const quiz of depth.quiz) {
      assert.ok(quiz.question.trim(), `${locale}/${slug} MCQ missing question`);
      assert.equal(quiz.options.length, 4, `${locale}/${slug} MCQ needs four options`);
      assert.ok(quiz.options.every((option) => option.trim()), `${locale}/${slug} MCQ has an empty option`);
      assert.ok(quiz.answer >= 0 && quiz.answer < quiz.options.length, `${locale}/${slug} MCQ answer is out of range`);
      assert.ok(quiz.explanation.trim(), `${locale}/${slug} MCQ missing explanation`);
    }
    assert.ok(depth.trend.title.trim(), `${locale}/${slug} trend missing title`);
    assert.ok(depth.trend.body.trim(), `${locale}/${slug} trend missing body`);
    assert.ok(depth.trend.watch.length >= 3, `${locale}/${slug} trend note needs practical signals`);
    assert.ok(depth.trend.watch.every((item) => item.trim()), `${locale}/${slug} trend has an empty signal`);
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

console.log(`Content audit passed: 122 topics × 3 structurally matched locales, 116 topic-specific reference lessons with unique cores, worked examples, four-step decision paths, explicit alternatives, and reversal conditions; 17 page-specific Python practices, ${formulaEntries.length} mathematical anchors and ${technicalSeeds.length} variable-length derivation flows with per-equation components and trilingual reasoning bridges, localized terminology parity, a 24-source reading and verification library, 6 deep guided chapters, 22 concept diagrams, 6 guided Python practices, and 12 MCQs.`);
