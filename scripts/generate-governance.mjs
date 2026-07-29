import { writeFile } from "node:fs/promises";
import { curriculumSeeds } from "../app/data/full-curriculum.ts";

const catalog = {
  schemaVersion: 3,
  project: "Gradient Atlas",
  contentPolicy: "independently-authored-with-cited-references",
  historicalTopicIndex: {
    title: "DL Bible - 07. Machine Learning Fundamentals",
    creators: ["고민수", "장선진"],
    url: "https://wikidocs.net/book/9057",
    use: "Historical topic links only. This release does not rely on a WikiDocs reuse license and does not reproduce or translate WikiDocs expression or media.",
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
    creators: ["고민수", "장선진"],
    sourceRole: "historical-topic-link",
    sourceReuse: "none",
    sourceLicenseReliedOn: false,
    modifications: [],
    bodyRights: "original",
    sourceState: "independently-authored",
  })),
};

const status = {
  schemaVersion: 3,
  updated: "2026-07-30",
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
    rightsReview: "original-content-only",
    publicationState: "preview",
  })),
};

await Promise.all([
  writeFile("governance/catalog.json", `${JSON.stringify(catalog, null, 2)}\n`),
  writeFile("governance/translation-status.json", `${JSON.stringify(status, null, 2)}\n`),
]);

console.log(`Generated governance records for ${curriculumSeeds.length} pages.`);
