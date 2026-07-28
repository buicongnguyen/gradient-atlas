import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const catalog = JSON.parse(await readFile("governance/catalog.json", "utf8"));
const status = JSON.parse(await readFile("governance/translation-status.json", "utf8"));
const contentSource = await readFile("app/data/content.ts", "utf8");
const plan = await readFile("PROJECT_PLAN_AND_LOGIC_REVIEW.md", "utf8");

assert.equal(catalog.documents.length, 6, "Expected six pilot lessons");
assert.equal(new Set(catalog.documents.map((item) => item.id)).size, 6, "Duplicate content ID");
assert.equal(new Set(catalog.documents.map((item) => item.slug)).size, 6, "Duplicate slug");
assert.equal(status.documents.length, 6, "Translation ledger must cover every lesson");

for (const document of catalog.documents) {
  assert.equal(document.rights, "original", `${document.id} is not rights-cleared original content`);
  assert.match(contentSource, new RegExp(`id: "${document.id}"`), `${document.id} missing from content`);
  assert.match(contentSource, new RegExp(`slug: "${document.slug}"`), `${document.slug} missing from content`);
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

assert.match(contentSource, /Human review pending|human review pending/i);
assert.match(plan, /122 unique page entries/);
assert.match(plan, /Do not publish source text before this gate passes/);
assert.doesNotMatch(contentSource, /195334|351847|351962/);
await access("CONTENT_LICENSE.md");
await access("LICENSE");

console.log("Content audit passed: 6 original lessons × 3 locales, rights-cleared preview status, stable IDs and routes.");
