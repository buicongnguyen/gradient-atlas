import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { curriculumSeeds } from "../app/data/full-curriculum.ts";
import { formulaSupportBySlug } from "../app/data/learning-support.ts";

const globalStyles = readFileSync(
  new URL("../app/globals.css", import.meta.url),
  "utf8",
);
const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

async function render(pathname) {
  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the language gate without starter metadata", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Machine learning,/);
  assert.match(html, /English/);
  assert.match(html, /Tiếng Việt/);
  assert.match(html, /한국어/);
  assert.match(html, /Microsoft ML for Beginners/);
  assert.match(html, /Google\s+ML Crash Course/);
  assert.match(html, /six|6 guided chapters/i);
  assert.match(html, /https:\/\/wikidocs\.net\/book\/9057/);
  assert.match(html, /historical topic index/i);
  assert.doesNotMatch(html, /WikiDocs.*CC BY 4\.0/i);
  assert.match(html, /href="\/source-policy\/"/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/);
});

test("renders all locale atlas routes with labs and preview disclosure", async () => {
  const localizedPartNames = {
    en: ['data-part-label="PART B"', "Learning approaches"],
    vi: ['data-part-label="PHẦN B"', "Các phương pháp học"],
    ko: ['data-part-label="파트 B"', "학습 접근법"],
  };
  for (const locale of ["en", "vi", "ko"]) {
    const response = await render(`/${locale}/`);
    assert.equal(response.status, 200, locale);
    const html = await response.text();
    assert.match(html, /Gradient Atlas/);
    assert.match(html, /type="range"/);
    assert.match(html, /Microsoft ML for Beginners/);
    assert.match(html, /Google MLCC/);
    assert.match(html, /href="\/source-policy\/#reference-library"/);
    assert.match(html, /class="reader-shell"/);
    assert.match(html, /class="reader-sidebar book-sidebar/);
    assert.match(html, /class="book-menu-button"/);
    assert.match(html, /class="book-chapter"/);
    assert.match(html, /class="book-chapter-title"/);
    for (const label of localizedPartNames[locale]) {
      assert.match(html, new RegExp(label));
    }
    assert.equal((html.match(/class="book-guided-link"/g) ?? []).length, 6);
    assert.equal((html.match(/class="book-page-link"/g) ?? []).length, 116);
    assert.match(html, /class="reference-atlas-card"/);
    assert.match(html, /preview|xem trước|프리뷰/i);
  }
});

test("renders searchable catalogs with the complete corpus", async () => {
  for (const locale of ["en", "vi", "ko"]) {
    const response = await render(`/${locale}/catalog/`);
    assert.equal(response.status, 200, locale);
    const html = await response.text();
    assert.match(html, /122/);
    assert.match(html, /architecture-of-deep-learning-bible/);
    assert.match(html, /projects/);
    assert.match(html, /type="search"/);
    assert.match(html, /class="reader-sidebar book-sidebar/);
    assert.match(html, /class="book-menu-button"/);
    assert.equal((html.match(/class="book-guided-link"/g) ?? []).length, 6);
    assert.equal((html.match(/class="book-page-link"/g) ?? []).length, 116);
  }
});

test("renders exact trilingual lesson counterparts", async () => {
  const slug = "metrics-and-thresholds";
  const expected = {
    en: "Metrics and decision thresholds",
    vi: "Chỉ số và ngưỡng quyết định",
    ko: "평가 지표와 결정 임곗값",
  };

  for (const [locale, title] of Object.entries(expected)) {
    const response = await render(`/${locale}/learn/${slug}/`);
    assert.equal(response.status, 200, locale);
    const html = await response.text();
    assert.match(html, new RegExp(title));
    assert.match(html, /precision = TP/);
    assert.match(html, /Human review pending|Đang chờ phản biện|사람의 검토 대기 중/);
    assert.match(html, /book-menu-button/);
    assert.match(html, /book-sidebar/);
    assert.match(html, /book-outline/);
    assert.match(html, /lesson-scaffold/);
    assert.match(html, /course-project-card/);
    assert.match(html, /knowledge-check/);
    assert.match(html, /lesson-references/);
    assert.match(html, /late-delivery|giao hàng trễ|배송 지연/i);
  }
});

test("renders the complete guided learning loop in every chapter and locale", async () => {
  const guidedSlugs = [
    "what-machine-learning-learns",
    "data-features-and-labels",
    "train-validation-and-test",
    "metrics-and-thresholds",
    "bias-variance-and-overfitting",
    "end-to-end-ml-workflow",
  ];
  const datedTrendLabels = {
    en: "Reviewed July 2026",
    vi: "Đã rà soát tháng 7/2026",
    ko: "2026년 7월 검토",
  };

  for (const slug of guidedSlugs) {
    for (const locale of ["en", "vi", "ko"]) {
      const response = await render(`/${locale}/learn/${slug}/`);
      assert.equal(response.status, 200, `${locale}/${slug}`);
      const html = await response.text();
      assert.match(html, /id="big-picture"/, `${locale}/${slug}`);
      assert.match(html, /class="course-position-map"/, `${locale}/${slug}`);
      assert.equal(
        (html.match(/aria-current="step"/g) ?? []).length,
        1,
        `${locale}/${slug}`,
      );
      assert.match(html, /class="thinking-flow"/, `${locale}/${slug}`);
      assert.match(html, /id="try-it-yourself"/, `${locale}/${slug}`);
      assert.match(html, /late_delivery_example\.py/, `${locale}/${slug}`);
      assert.match(html, /id="mcq-review"/, `${locale}/${slug}`);
      assert.equal(
        (html.match(/class="mcq-card"/g) ?? []).length,
        2,
        `${locale}/${slug}`,
      );
      assert.match(html, /id="current-practice"/, `${locale}/${slug}`);
      assert.match(html, new RegExp(datedTrendLabels[locale]), `${locale}/${slug}`);
      assert.match(
        html,
        /developers\.google\.com|scikit-learn\.org|nist\.gov|stanford\.edu/,
        `${locale}/${slug}`,
      );
    }
  }
});

test("keeps the deeper guided blocks out of reference-only notes", async () => {
  const response = await render("/en/learn/about-artificial-intelligence/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.doesNotMatch(html, /id="big-picture"/);
  assert.doesNotMatch(html, /id="try-it-yourself"/);
  assert.doesNotMatch(html, /id="mcq-review"/);
  assert.doesNotMatch(html, /id="current-practice"/);
  assert.match(html, /id="continue-learning"/);
  assert.equal((html.match(/class="reading-resource-card"/g) ?? []).length, 4);
});

test("renders matched trilingual terminology and original mathematical notation", async () => {
  const terminologyCases = {
    en: [/Key terminology/, /Linear regression/, /Components/, /Why the next equation/],
    vi: [/canonical-english-term/, /Thuật ngữ Việt–Anh/, /Hồi quy tuyến tính/, /Linear regression/, /Các thành phần/, /Vì sao cần công thức tiếp theo/],
    ko: [/canonical-english-term/, /한영 핵심 용어/, /선형 회귀/, /Linear regression/, /구성요소/, /왜 다음 식이 필요한가요/],
  };
  for (const [locale, patterns] of Object.entries(terminologyCases)) {
    const terminologyResponse = await render(`/${locale}/learn/linear-regression/`);
    assert.equal(terminologyResponse.status, 200, locale);
    const terminologyHtml = await terminologyResponse.text();
    assert.match(terminologyHtml, /terminology-panel/, locale);
    assert.match(terminologyHtml, /formula-expression/, locale);
    assert.match(terminologyHtml, /role="math"/, locale);
    for (const pattern of patterns) assert.match(terminologyHtml, pattern, locale);
  }

  assert.ok(Object.keys(formulaSupportBySlug).length >= 87);
  for (const slug of Object.keys(formulaSupportBySlug)) {
    for (const locale of ["en", "vi", "ko"]) {
      const response = await render(`/${locale}/learn/${slug}/`);
      assert.equal(response.status, 200, `${locale}/${slug}`);
      assert.match(await response.text(), /formula-expression/, `${locale}/${slug}`);
    }
  }

  const technicalSeeds = curriculumSeeds.filter((item) => item.kind === "algorithm" || item.kind === "code");
  assert.equal(technicalSeeds.length, 32);
  for (const seed of technicalSeeds) {
    assert.ok(formulaSupportBySlug[seed.slug].steps?.length >= 2, seed.slug);
    for (const locale of ["en", "vi", "ko"]) {
      const response = await render(`/${locale}/learn/${seed.slug}/`);
      const html = await response.text();
      assert.match(html, /formula-flow-steps/, `${locale}/${seed.slug}`);
      assert.match(html, /formula-components/, `${locale}/${seed.slug}`);
      assert.match(html, /formula-transition/, `${locale}/${seed.slug}`);
      assert.equal((html.match(/class="formula-expression"/g) ?? []).length >= formulaSupportBySlug[seed.slug].steps.length + 1, true, `${locale}/${seed.slug}`);
    }
  }
});

test("renders twenty-two original localized concept diagrams", async () => {
  const diagramSlugs = [
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
  const licenseCaptions = {
    en: "Original Gradient Atlas illustration",
    vi: "Minh họa gốc của Gradient Atlas",
    ko: "Gradient Atlas 원본 도해",
  };

  for (const slug of diagramSlugs) {
    for (const locale of ["en", "vi", "ko"]) {
      const response = await render(`/${locale}/learn/${slug}/`);
      assert.equal(response.status, 200, `${locale}/${slug}`);
      const html = await response.text();
      assert.equal((html.match(/class="concept-diagram"/g) ?? []).length, 1, `${locale}/${slug}`);
      assert.match(html, new RegExp(`data-diagram="${slug}"`));
      assert.match(html, /role="img"/);
      assert.match(html, new RegExp(licenseCaptions[locale]));
      assert.match(html, /CC BY 4\.0/);
    }
  }

  const plainResponse = await render("/vi/learn/about-artificial-intelligence/");
  assert.doesNotMatch(await plainResponse.text(), /class="concept-diagram"/);
});

test("renders the source policy", async () => {
  const response = await render("/source-policy/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Original first/);
  assert.match(html, /does not reproduce or\s+translate its prose/i);
  assert.match(html, /CC BY 4.0/);
  assert.match(html, /id="original-content"/);
  assert.match(html, /id="reference-library"/);
  assert.match(html, /id="wikidocs-history"/);
  assert.match(html, /Microsoft · Machine Learning for Beginners/);
  assert.match(html, /Google · Machine Learning Crash Course/);
  assert.match(html, /NIST · AI Risk Management Framework Playbook/);
  assert.match(html, /Stanford HAI · 2026 AI Index/);
  assert.match(html, /Mathematics for Machine Learning/);
  assert.match(html, /Probabilistic Machine Learning · An Introduction/);
  assert.match(html, /Practical Deep Learning for Coders · fast\.ai/);
  assert.match(html, /Full Stack Deep Learning/);
  assert.match(html, /Dive into Deep Learning/);
  assert.match(html, /scikit-learn User Guide/);
  assert.match(html, /All rights reserved/);
  assert.match(html, /does not\s+rely on a WikiDocs reuse license/i);
  assert.match(html, /https:\/\/wikidocs\.net\/book\/9057/);
  assert.match(html, /class="reader-sidebar book-sidebar/);
  assert.match(html, /class="book-menu-button"/);
  assert.equal((html.match(/class="book-guided-link"/g) ?? []).length, 6);
  assert.equal((html.match(/class="book-page-link"/g) ?? []).length, 116);
  assert.equal((html.match(/class="policy-reference-card"/g) ?? []).length, 24);
});

test("keeps long-form lesson pages in a compact reading rhythm", () => {
  assert.match(
    globalStyles,
    /\.article-section\s*\{[^}]*padding:\s*2\.75rem 0 \.35rem;/,
  );
  assert.match(
    globalStyles,
    /\.guided-orientation,\s*\.guided-practice,\s*\.guided-quiz,\s*\.guided-trend\s*\{[^}]*margin-top:\s*2\.75rem;/,
  );
  assert.match(
    globalStyles,
    /\.reading-resource-card\s*\{[^}]*min-height:\s*190px;/,
  );
  assert.match(
    globalStyles,
    /\.article-section > p\s*\{[^}]*line-height:\s*1\.68;/,
  );
  assert.match(globalStyles, /\.formula-flow-steps\s*\{[^}]*grid-template-columns:\s*1fr;/);
  assert.match(globalStyles, /grid-template-areas:\s*"label components formula"/);
  assert.doesNotMatch(globalStyles, /\.formula-flow-steps\s*\{[^}]*grid-auto-flow:\s*column;/);
});

test("renders every source-corresponding page in every locale", async () => {
  assert.equal(curriculumSeeds.length, 122);
  for (const seed of curriculumSeeds) {
    const localizedShapes = {};
    for (const locale of ["en", "vi", "ko"]) {
      const response = await render(`/${locale}/learn/${seed.slug}/`);
      assert.equal(response.status, 200, `${locale}/${seed.slug}`);
      const html = await response.text();
      assert.match(html, new RegExp(`<div lang="${locale}" class="site-shell book-site"`), `${locale}/${seed.slug}`);
      assert.match(html, new RegExp(`https://wikidocs.net/${seed.sourcePageId}`));
      assert.match(html, /historical-source/);
      assert.match(html, /id="continue-learning"/, `${locale}/${seed.slug}`);
      assert.equal(
        (html.match(/class="reading-resource-card"/g) ?? []).length,
        4,
        `${locale}/${seed.slug}`,
      );
      const resourceIds = [
        ...html.matchAll(/data-resource-id="([^"]+)"/g),
      ].map((match) => match[1]);
      assert.equal(new Set(resourceIds).size, 4, `${locale}/${seed.slug}`);
      assert.ok(!resourceIds.includes("wikidocs-index"), `${locale}/${seed.slug}`);
      assert.match(html, /class="terminology-panel"/, `${locale}/${seed.slug}`);
      if (locale !== "en") {
        assert.match(html, /canonical-english-term/, `${locale}/${seed.slug}`);
      } else {
        assert.doesNotMatch(html, /canonical-english-term/, `${locale}/${seed.slug}`);
      }
      localizedShapes[locale] = {
        sections: (html.match(/class="article-section"/g) ?? []).length,
        formulas: (html.match(/class="formula-block"/g) ?? []).length,
        notes: (html.match(/class="article-note"/g) ?? []).length,
        codeBlocks: (html.match(/<pre/g) ?? []).length,
        diagrams: (html.match(/class="concept-diagram"/g) ?? []).length,
        exercises: (html.match(/class="exercise-card"/g) ?? []).length,
        terminology: (html.match(/class="terminology-panel"/g) ?? []).length,
      };
    }
    assert.deepEqual(localizedShapes.en, localizedShapes.vi, `${seed.slug}: en/vi shape`);
    assert.deepEqual(localizedShapes.ko, localizedShapes.vi, `${seed.slug}: ko/vi shape`);
  }
});
