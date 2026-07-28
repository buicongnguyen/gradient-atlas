import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { curriculumSeeds } from "../app/data/full-curriculum.ts";

const catalog = JSON.parse(await readFile("governance/catalog.json", "utf8"));
const status = JSON.parse(await readFile("governance/translation-status.json", "utf8"));
const contentSource = await readFile("app/data/content.ts", "utf8");
const plan = await readFile("PROJECT_PLAN_AND_LOGIC_REVIEW.md", "utf8");

assert.equal(curriculumSeeds.length, 122, "Expected the verified 122-page outline");
assert.equal(catalog.documents.length, 122, "Catalog must cover every outline page");
assert.equal(status.documents.length, 122, "Translation ledger must cover every outline page");
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
}

for (const document of catalog.documents) {
  const seed = curriculumSeeds.find((item) => item.id === document.id);
  assert.ok(seed, `${document.id} missing from curriculum source`);
  assert.equal(document.slug, seed.slug);
  assert.equal(document.sourcePageId, seed.sourcePageId);
  assert.deepEqual(document.creators, ["고민수", "장선진"]);
  assert.equal(document.outlineLicense, "CC-BY-4.0");
  assert.deepEqual(document.modifications, ["translation", "restructuring"]);
  assert.equal(document.bodyRights, "original");
  const translation = status.documents.find((item) => item.id === document.id);
  assert.ok(translation, `${document.id} missing translation status`);
  assert.deepEqual(translation.locales, ["ko", "en", "vi"]);
  assert.equal(translation.rightsReview, "cleared");
  assert.equal(translation.publicationState, "preview");
  assert.notEqual(translation.languageReview, "independently-reviewed");
}

for (const marker of ["lessonsEn", "lessonsVi", "lessonsKo"]) {
  assert.match(contentSource, new RegExp(`const ${marker}`));
}
assert.match(contentSource, /function generatedLesson/);
assert.match(contentSource, /function mergePilot/);

assert.match(contentSource, /Human review pending|human review pending/i);
assert.match(plan, /122 unique page entries/);
assert.match(plan, /Do not publish source text before this gate passes/);
assert.match(contentSource, /outlineAttribution/);
await access("CONTENT_LICENSE.md");
await access("LICENSE");

console.log("Content audit passed: 122 pages × 3 locales, 43/79 collection split, unique IDs/routes/sources, rights-cleared preview status.");
