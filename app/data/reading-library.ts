import type { Language, Lesson } from "./content";
import {
  getReference,
  type ReferenceId,
  type ReferenceSource,
} from "./guided-course";

type ResourceKind = "book" | "course" | "guide";

type ReadingShelfCopy = {
  eyebrow: string;
  title: string;
  body: string;
  open: string;
  kinds: Record<ResourceKind, string>;
};

export const readingShelfUi: Record<Language, ReadingShelfCopy> = {
  en: {
    eyebrow: "Continue learning",
    title: "Choose the next depth",
    body:
      "These recommendations match this topic. Start with one; use the others when you need more mathematics, implementation detail, or system context.",
    open: "Open resource",
    kinds: { book: "Book", course: "Course", guide: "Technical guide" },
  },
  vi: {
    eyebrow: "Học tiếp",
    title: "Chọn mức đào sâu tiếp theo",
    body:
      "Các tài liệu này được chọn theo chủ đề của bài. Hãy bắt đầu với một tài liệu; dùng phần còn lại khi cần thêm toán học, chi tiết triển khai hoặc bối cảnh hệ thống.",
    open: "Mở tài liệu",
    kinds: { book: "Sách", course: "Khóa học", guide: "Hướng dẫn kỹ thuật" },
  },
  ko: {
    eyebrow: "계속 학습하기",
    title: "다음 심화 경로를 선택하세요",
    body:
      "이 주제에 맞춰 고른 자료입니다. 하나부터 시작하고, 수학·구현·시스템 맥락이 더 필요할 때 나머지를 활용하세요.",
    open: "자료 열기",
    kinds: { book: "도서", course: "과정", guide: "기술 가이드" },
  },
};

const resourceKinds: Partial<Record<ReferenceId, ResourceKind>> = {
  "microsoft-ml-for-beginners": "course",
  "google-ml-crash-course": "course",
  "dive-into-deep-learning": "book",
  "scikit-learn": "guide",
  "statistical-learning": "book",
  "mathematics-for-ml": "book",
  "probabilistic-ml": "book",
  "deep-learning-book": "book",
  "sklearn-mooc": "course",
  "fastai-book": "book",
  "pytorch-tutorials": "guide",
  "huggingface-course": "course",
  "full-stack-deep-learning": "course",
  "google-problem-framing": "guide",
  "google-production-monitoring": "guide",
  "nist-ai-rmf": "guide",
};

const profiles: Record<string, ReferenceId[]> = {
  foundation: [
    "google-ml-crash-course",
    "microsoft-ml-for-beginners",
    "sklearn-mooc",
    "statistical-learning",
  ],
  data: [
    "sklearn-mooc",
    "scikit-learn",
    "google-ml-crash-course",
    "microsoft-ml-for-beginners",
  ],
  evaluation: [
    "sklearn-mooc",
    "scikit-learn",
    "statistical-learning",
    "google-ml-crash-course",
  ],
  math: [
    "mathematics-for-ml",
    "probabilistic-ml",
    "statistical-learning",
    "dive-into-deep-learning",
  ],
  deep: [
    "dive-into-deep-learning",
    "deep-learning-book",
    "fastai-book",
    "pytorch-tutorials",
  ],
  nlp: [
    "huggingface-course",
    "dive-into-deep-learning",
    "pytorch-tutorials",
    "fastai-book",
  ],
  vision: [
    "fastai-book",
    "pytorch-tutorials",
    "dive-into-deep-learning",
    "deep-learning-book",
  ],
  reinforcement: [
    "dive-into-deep-learning",
    "pytorch-tutorials",
    "probabilistic-ml",
    "deep-learning-book",
  ],
  production: [
    "full-stack-deep-learning",
    "google-production-monitoring",
    "nist-ai-rmf",
    "scikit-learn",
  ],
  responsible: [
    "nist-ai-rmf",
    "full-stack-deep-learning",
    "google-ml-crash-course",
    "microsoft-ml-for-beginners",
  ],
};

const profileMatchers: Array<[string, RegExp]> = [
  ["nlp", /natural-language|nlp|language-model|transformer|token|attention/],
  ["vision", /computer-vision|convolution|image|object-detection|vision/],
  ["reinforcement", /reinforcement|q-learning|policy-gradient|reward/],
  ["production", /workflow|production|deployment|monitor|mlops|pipeline|serving|reproducib|ingestion|feedback-loop|system-thinking|scalab|model-updating|case-study|end-to-end-project/],
  ["responsible", /ethic|fairness|responsib|risk-management|bias-and-fairness/],
  ["deep", /deep-learning|neural|perceptron|autoencoder|generative|gan|rnn|lstm/],
  ["math", /linear-regression|regression-analysis|probab|bayes|gaussian|optimization|gradient|matrix|dimensionality|support-vector|loss/],
  ["evaluation", /evaluation|metric|confusion|roc|validation|test|overfit|variance|threshold|model-selection|cross-validation/],
  ["data", /data|feature|label|preprocess|normalization|imbalance|leakage|sampling/],
];

export type ReadingRecommendation = {
  source: ReferenceSource;
  kind: ResourceKind;
};

export function getReadingRecommendations(
  lesson: Lesson,
  existing: ReferenceId[] = [],
): ReadingRecommendation[] {
  const searchable = `${lesson.slug} ${lesson.tags.join(" ")}`.toLowerCase();
  const profile =
    profileMatchers.find(([, pattern]) => pattern.test(searchable))?.[0] ??
    "foundation";
  const ids: ReferenceId[] = existing.filter(
    (id) => id !== "wikidocs-index",
  );

  for (const id of profiles[profile]) {
    if (!ids.includes(id)) ids.push(id);
    if (ids.length === 4) break;
  }

  for (const id of profiles.foundation) {
    if (!ids.includes(id)) ids.push(id);
    if (ids.length === 4) break;
  }

  return ids.slice(0, 4).flatMap((id) => {
    const source = getReference(id);
    return source
      ? [{ source, kind: resourceKinds[id] ?? "guide" }]
      : [];
  });
}
