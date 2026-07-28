import assert from "node:assert/strict";
import test from "node:test";
import { curriculumSeeds } from "../app/data/full-curriculum.ts";
import { formulaSupportBySlug } from "../app/data/learning-support.ts";

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
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/);
});

test("renders all locale atlas routes with labs and preview disclosure", async () => {
  for (const locale of ["en", "vi", "ko"]) {
    const response = await render(`/${locale}/`);
    assert.equal(response.status, 200, locale);
    const html = await response.text();
    assert.match(html, /Gradient Atlas/);
    assert.match(html, /type="range"/);
    assert.match(html, /WikiDocs/);
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
    assert.match(html, /architecture-of-deep-learning-bible/);
    assert.match(html, /projects/);
  }
});

test("renders bilingual Vietnamese terminology and original mathematical notation", async () => {
  const terminologyResponse = await render("/vi/learn/linear-regression/");
  assert.equal(terminologyResponse.status, 200);
  const terminologyHtml = await terminologyResponse.text();
  assert.match(terminologyHtml, /canonical-english-term/);
  assert.match(terminologyHtml, /terminology-panel/);
  assert.match(terminologyHtml, /Hồi quy tuyến tính/);
  assert.match(terminologyHtml, /Linear regression/);
  assert.match(terminologyHtml, /formula-expression/);
  assert.match(terminologyHtml, /role="math"/);
  assert.match(terminologyHtml, /Ký hiệu/);

  assert.ok(Object.keys(formulaSupportBySlug).length >= 30);
  for (const slug of Object.keys(formulaSupportBySlug)) {
    for (const locale of ["en", "vi", "ko"]) {
      const response = await render(`/${locale}/learn/${slug}/`);
      assert.equal(response.status, 200, `${locale}/${slug}`);
      assert.match(await response.text(), /formula-expression/, `${locale}/${slug}`);
    }
  }
});

test("renders six original localized concept diagrams", async () => {
  const diagramSlugs = [
    "data-leakage",
    "train-validation-and-test",
    "confusion-matrix",
    "linear-regression",
    "bias-variance-and-overfitting",
    "end-to-end-ml-workflow",
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
  assert.match(html, /do not reproduce WikiDocs prose or media/);
  assert.match(html, /CC BY 4.0/);
});

test("renders every source-corresponding page in every locale", async () => {
  assert.equal(curriculumSeeds.length, 122);
  for (const seed of curriculumSeeds) {
    for (const locale of ["en", "vi", "ko"]) {
      const response = await render(`/${locale}/learn/${seed.slug}/`);
      assert.equal(response.status, 200, `${locale}/${seed.slug}`);
      const html = await response.text();
      assert.match(html, new RegExp(`<div lang="${locale}" class="site-shell book-site"`), `${locale}/${seed.slug}`);
      assert.match(html, new RegExp(`https://wikidocs.net/${seed.sourcePageId}`));
      assert.match(html, /CC BY 4\.0/);
      if (locale === "vi") {
        assert.match(html, /canonical-english-term/, `${locale}/${seed.slug}`);
        assert.match(html, /terminology-panel/, `${locale}/${seed.slug}`);
      }
    }
  }
});
