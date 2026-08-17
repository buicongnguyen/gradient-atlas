import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { curriculumSeeds } from "../app/data/full-curriculum.ts";
import { formulaSupportBySlug } from "../app/data/learning-support.ts";

const globalStyles = readFileSync(
  new URL("../app/globals.css", import.meta.url),
  "utf8",
);
const pagesWorkflow = readFileSync(
  new URL("../.github/workflows/pages.yml", import.meta.url),
  "utf8",
);
const ciWorkflow = readFileSync(
  new URL("../.github/workflows/ci.yml", import.meta.url),
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
  assert.match(html, /Machine Learning:/);
  assert.match(html, /From Decisions to Reliable Systems/);
  assert.match(html, /adaptable way of thinking/);
  assert.match(html, /<title>Gradient Atlas — Machine Learning: From Decisions to Reliable Systems<\/title>/);
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
  const localizedBookTitles = {
    en: ["Machine Learning:", "From Decisions to Reliable Systems"],
    vi: ["Học máy:", "Từ quyết định đến hệ thống đáng tin cậy"],
    ko: ["머신러닝:", "의사결정에서 신뢰할 수 있는 시스템까지"],
  };
  const localizedIntroductions = {
    en: "adaptable way of thinking",
    vi: "cách tư duy linh hoạt",
    ko: "유연한 사고방식",
  };
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
    for (const titlePart of localizedBookTitles[locale]) {
      assert.match(html, new RegExp(titlePart));
    }
    assert.match(html, new RegExp(localizedIntroductions[locale]));
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
  assert.match(html, /id="decision-path"/);
  assert.match(html, /class="decision-guide-steps"/);
  assert.equal((html.match(/class="decision-guide-checks"/g) ?? []).length, 1);
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
  assert.match(html, /116\s+topic-specific reference lessons/i);
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

test("gates publication on the complete code and route review", () => {
  assert.match(pagesWorkflow, /- run: npm run lint/);
  assert.match(pagesWorkflow, /- run: npm test/);
  assert.match(pagesWorkflow, /- run: npm run build:pages/);
  assert.ok(
    pagesWorkflow.indexOf("npm test") < pagesWorkflow.indexOf("npm run build:pages"),
  );
  assert.match(ciWorkflow, /- run: npm run lint/);
  assert.match(ciWorkflow, /- run: npm test/);
});

test("keeps long-form lessons compact without undersized reading text", () => {
  assert.match(globalStyles, /\.hero h1\s*\{[^}]*font-size:\s*clamp\(2\.4rem,\s*3\.8vw,\s*3\.75rem\);/);
  assert.match(globalStyles, /\.language-gate h1\s*\{[^}]*font-size:\s*clamp\(2\.4rem,\s*5vw,\s*4\.2rem\);/);
  assert.match(globalStyles, /\.article-header h1\s*\{[^}]*font-size:\s*clamp\(2\.25rem,\s*4vw,\s*3\.8rem\);/);
  assert.match(globalStyles, /\.article-section h2\s*\{[^}]*font-size:\s*1\.7rem;/);
  assert.match(globalStyles, /\.guided-block-heading h2\s*\{[^}]*font-size:\s*clamp\(1\.55rem,\s*3vw,\s*2\.15rem\);/);
  assert.match(globalStyles, /\.reading-shelf-header h2\s*\{[^}]*font-size:\s*clamp\(1\.5rem,\s*3vw,\s*2\.05rem\);/);
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
    /\.article-section > p\s*\{[^}]*font-size:\s*1\.06rem;[^}]*line-height:\s*1\.72;/,
  );
  assert.match(globalStyles, /\.book-page-link\s*\{[^}]*font-size:\s*\.84rem;/);
  assert.match(globalStyles, /\.formula-components li\s*\{[^}]*font:\s*\.76rem\/1\.5/);
  assert.match(globalStyles, /\.reading-resource-card p\s*\{[^}]*font-size:\s*\.82rem;/);
  assert.match(globalStyles, /\.formula-flow-steps\s*\{[^}]*grid-auto-flow:\s*column;/);
  assert.match(globalStyles, /\.formula-flow-steps\s*\{[^}]*overflow-x:\s*auto;/);
  assert.match(globalStyles, /grid-template-areas:\s*"label components formula"/);
  assert.match(globalStyles, /\.decision-guide-steps\s*\{[^}]*grid-template-columns:\s*repeat\(4,/);
});

test("keeps every shared page family safe at phone widths", () => {
  assert.match(globalStyles, /@media \(max-width:\s*720px\)[\s\S]*?\.hero h1,\s*\.language-gate h1\s*\{[^}]*font-size:\s*clamp\(2\.1rem,\s*7\.5vw,\s*2\.8rem\);/);
  assert.match(globalStyles, /@media \(max-width:\s*420px\)[\s\S]*?\.article-header h1\s*\{[^}]*font-size:\s*clamp\(2rem,\s*9vw,\s*2\.9rem\);/);
  assert.match(globalStyles, /html\s*\{[^}]*overflow-x:\s*clip;/);
  assert.match(globalStyles, /\.book-page-content\s*\{[^}]*overflow-x:\s*clip;/);
  assert.match(
    globalStyles,
    /@media \(max-width:\s*720px\)[\s\S]*?\.hero\s*\{[^}]*overflow:\s*clip;/,
  );
  assert.match(
    globalStyles,
    /@media \(max-width:\s*720px\)[\s\S]*?\.orbit-one,\s*\.orbit-two\s*\{[^}]*display:\s*none;/,
  );
  assert.match(
    globalStyles,
    /\.book-menu-button\s*\{[^}]*width:\s*44px;[^}]*height:\s*44px;/,
  );
  assert.match(
    globalStyles,
    /\.locale-switch a\s*\{[^}]*min-width:\s*44px;[^}]*min-height:\s*44px;/,
  );
  assert.match(
    globalStyles,
    /@media \(max-width:\s*720px\)[\s\S]*?\.formula-flow-steps\s*\{[^}]*grid-auto-columns:\s*minmax\(620px,\s*86vw\);/,
  );
  assert.match(
    globalStyles,
    /@media \(max-width:\s*720px\)[\s\S]*?\.decision-guide-steps\s*\{[^}]*grid-auto-columns:\s*minmax\(255px,\s*82vw\);/,
  );
  assert.match(
    globalStyles,
    /@media \(max-width:\s*420px\)[\s\S]*?\.book-header \.brand\s*\{[^}]*display:\s*none;/,
  );
  assert.match(globalStyles, /overflow-wrap:\s*anywhere/);
  assert.match(globalStyles, /touch-action:\s*pan-x pan-y/);
});

test("renders every source-corresponding page in every locale", async () => {
  assert.equal(curriculumSeeds.length, 122);
  const readingRoutes = new Set();
  const genericReadingPages = new Set([
    "https://github.com/microsoft/ML-For-Beginners",
    "https://developers.google.com/machine-learning/crash-course",
    "https://d2l.ai/",
    "https://scikit-learn.org/stable/user_guide.html",
    "https://www.statlearning.com/",
    "https://mml-book.github.io/",
    "https://www.deeplearningbook.org/",
    "https://inria.github.io/scikit-learn-mooc/",
    "https://docs.pytorch.org/tutorials/",
  ]);
  for (const seed of curriculumSeeds) {
    const localizedShapes = {};
    for (const locale of ["en", "vi", "ko"]) {
      const response = await render(`/${locale}/learn/${seed.slug}/`);
      assert.equal(response.status, 200, `${locale}/${seed.slug}`);
      const html = await response.text();
      assert.match(html, new RegExp(`<div lang="${locale}" class="site-shell book-site"`), `${locale}/${seed.slug}`);
      assert.match(html, /<meta name="viewport" content="width=device-width, initial-scale=1"\s*\/>/, `${locale}/${seed.slug}`);
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
      const route = html.match(/data-reading-route="([^"]+)"/)?.[1];
      assert.ok(route, `${locale}/${seed.slug} needs a subject-specific reading route`);
      readingRoutes.add(route);
      const readingUrls = [...html.matchAll(/class="reading-resource-card"[^>]*href="([^"]+)"/g)].map((match) => match[1].replaceAll("&amp;", "&"));
      assert.equal(new Set(readingUrls).size, 4, `${locale}/${seed.slug} repeats a reading URL`);
      for (const url of readingUrls) {
        assert.match(url, /^https:\/\//, `${locale}/${seed.slug} reading link must use HTTPS`);
        assert.ok(!genericReadingPages.has(url), `${locale}/${seed.slug} links to a generic resource home page`);
      }
      assert.doesNotMatch(html, /Choose the next depth|Chọn mức đào sâu tiếp theo|다음 심화 경로를 선택하세요/, `${locale}/${seed.slug} repeats the generic shelf title`);
      assert.match(html, /class="terminology-panel"/, `${locale}/${seed.slug}`);
      if (!seed.featured) {
        assert.match(html, /id="decision-path"/, `${locale}/${seed.slug}`);
        assert.equal((html.match(/class="decision-guide-steps"/g) ?? []).length, 1, `${locale}/${seed.slug}`);
      }
      assert.doesNotMatch(
        html,
        /Build a practical mental model|Xây dựng mô hình tư duy thực tế|실용적인 사고 모형/,
        `${locale}/${seed.slug} still renders placeholder copy`,
      );
      if (seed.kind === "code" || seed.kind === "exercise") {
        assert.match(html, /<pre><code>/, `${locale}/${seed.slug} needs its Python practice`);
        assert.match(html, /print\(|assert /, `${locale}/${seed.slug} practice needs an observable result`);
      }
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
  assert.equal(readingRoutes.size, 13, "Every subject-specific reading route should be used");
});
