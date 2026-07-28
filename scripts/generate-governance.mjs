import { writeFile } from "node:fs/promises";
import { curriculumSeeds } from "../app/data/full-curriculum.ts";

const catalog = {
  schemaVersion: 2,
  project: "Gradient Atlas",
  contentPolicy: "outline-adapted-original-body",
  relatedSyllabus: {
    title: "DL Bible - 07. Machine Learning Fundamentals",
    url: "https://wikidocs.net/book/9057",
    use: "Page order, topic titles, and outline under CC BY 4.0; explanatory prose, examples, exercises, and interface are original.",
  },
  documents: curriculumSeeds.map((seed) => ({
    id: seed.id,
    order: seed.order,
    collection: seed.collection,
    part: seed.part,
    slug: seed.slug,
    kind: seed.kind,
    sourcePageId: seed.sourcePageId,
    sourceUrl: `https://wikidocs.net/${seed.sourcePageId}`,
    outlineLicense: "CC-BY-4.0",
    bodyRights: "original",
    sourceState: "outline-adapted",
  })),
};

const status = {
  schemaVersion: 2,
  updated: "2026-07-28",
  statusDefinitions: {
    draft: "Complete editorial draft with automated structure checks",
    preview: "Public preview awaiting independent review",
    published: "Independently reviewed stable release",
  },
  qualityPolicy: {
    technicalReviewRequiredForPublished: true,
    nativeLanguageReviewRequiredForPublished: true,
    rightsReviewRequiredForPreview: true,
  },
  documents: curriculumSeeds.map((seed) => ({
    id: seed.id,
    locales: ["ko", "en", "vi"],
    translationState: "complete",
    technicalReview: "logic-reviewed",
    languageReview: "pending",
    rightsReview: "cleared",
    publicationState: "preview",
  })),
};

await Promise.all([
  writeFile("governance/catalog.json", `${JSON.stringify(catalog, null, 2)}\n`),
  writeFile("governance/translation-status.json", `${JSON.stringify(status, null, 2)}\n`),
]);

console.log(`Generated governance records for ${curriculumSeeds.length} pages.`);
