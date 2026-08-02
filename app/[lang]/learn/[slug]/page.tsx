import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLesson, isLanguage, languages, lessonNavigationItems, lessons, ui } from "../../../data/content";
import { getGuidedDepth, guidedDepthUi } from "../../../data/guided-depth";
import {
  courseUi,
  getGuidedSupport,
  guidedSlugs,
  type GuidedSlug,
} from "../../../data/guided-course";
import { readingShelfUi } from "../../../data/reading-library";
import { ArrowUpRight, Check, CircleDot } from "../../../ui/icons";
import { BookSidebar } from "../../../ui/BookSidebar";
import {
  GuidedOrientation,
  GuidedPracticeReview,
} from "../../../ui/GuidedLearningBlocks";
import { LessonDiagram } from "../../../ui/LessonDiagram";
import { ReadingShelf } from "../../../ui/ReadingShelf";
import { SiteHeader } from "../../../ui/SiteHeader";

const formulaFlowCopy = {
  en: { components: "Components", whyNext: "Why the next equation?" },
  vi: { components: "Các thành phần", whyNext: "Vì sao cần công thức tiếp theo?" },
  ko: { components: "구성요소", whyNext: "왜 다음 식이 필요한가요?" },
};

const decisionGuideCopy = {
  en: {
    eyebrow: "Decision path",
    title: "Choose with a reason",
    alternatives: "Compare before choosing",
    reconsider: "Change course when",
  },
  vi: {
    eyebrow: "Luồng quyết định",
    title: "Lựa chọn có lý do",
    alternatives: "So sánh trước khi chọn",
    reconsider: "Khi nào cần đổi hướng",
  },
  ko: {
    eyebrow: "의사결정 흐름",
    title: "근거를 갖고 선택하기",
    alternatives: "선택 전 비교",
    reconsider: "방향을 바꿀 때",
  },
};

export function generateStaticParams() {
  return languages.flatMap((lang) =>
    lessons[lang].map((lesson) => ({ lang, slug: lesson.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLanguage(lang)) return {};
  const lesson = getLesson(lang, slug);
  return lesson ? { title: lesson.title, description: lesson.summary } : {};
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLanguage(lang)) notFound();
  const lesson = getLesson(lang, slug);
  if (!lesson) notFound();

  const lessonList = lessons[lang];
  const support = getGuidedSupport(lang, lesson.slug);
  const readingSequence = support
    ? guidedSlugs
        .map((guidedSlug) => lessonList.find((item) => item.slug === guidedSlug))
        .filter((item): item is (typeof lessonList)[number] => Boolean(item))
    : lessonList.filter((item) => !guidedSlugs.includes(item.slug as (typeof guidedSlugs)[number]));
  const index = readingSequence.findIndex((item) => item.id === lesson.id);
  const previous = readingSequence[index - 1];
  const next = readingSequence[index + 1];
  const copy = ui[lang];
  const course = courseUi[lang];
  const depthLabels = guidedDepthUi[lang];
  const guidedSlug = support ? lesson.slug as GuidedSlug : undefined;
  const depth = guidedSlug ? getGuidedDepth(lang, guidedSlug) : undefined;
  const suffix = `/learn/${lesson.slug}/`;

  return (
    <div lang={lang} className="site-shell book-site">
      <a className="skip-link" href="#article">{copy.skipToArticle}</a>
      <SiteHeader
        language={lang}
        pathSuffix={suffix}
        bookMode
        readingPosition={`${lesson.number} / ${lessonList.length}`}
      />
      <main className="reader-shell">
        <BookSidebar
          language={lang}
          lessons={lessonNavigationItems(lessonList)}
          currentLesson={lessonNavigationItems([lesson])[0]}
        />

        <article className="lesson-article" id="article">
          <header className="article-header">
            <div className="article-kicker">
              <span>
                {support
                  ? `${course.step} ${String(index + 1).padStart(2, "0")} / ${readingSequence.length}`
                  : `PART ${lesson.part} · ${lesson.number}`}
              </span>
              <small><Check />{copy.original}</small>
            </div>
            <aside className="reader-review-banner">
              <CircleDot />
              <div>
                <strong>{copy.humanReview}</strong>
                <p>{copy.preview}</p>
              </div>
            </aside>
            <details className="book-outline">
              <summary>{copy.onThisPage}</summary>
              <nav aria-label={copy.onThisPage}>
                {support && (
                  <Link href="#big-picture">
                    <span>00</span>
                    {depthLabels.bigPicture}
                  </Link>
                )}
                {!support && lesson.decisionGuide && (
                  <Link href="#decision-path">
                    <span>00</span>
                    {decisionGuideCopy[lang].eyebrow}
                  </Link>
                )}
                {lesson.sections.map((section, sectionIndex) => (
                  <Link href={`#section-${sectionIndex + 1}`} key={section.heading}>
                    <span>{String(sectionIndex + 1).padStart(2, "0")}</span>
                    {section.heading}
                  </Link>
                ))}
                {support && (
                  <>
                    <Link href="#try-it-yourself">
                      <span>{String(lesson.sections.length + 1).padStart(2, "0")}</span>
                      {depthLabels.tryIt}
                    </Link>
                    <Link href="#mcq-review">
                      <span>{String(lesson.sections.length + 2).padStart(2, "0")}</span>
                      {depthLabels.quiz}
                    </Link>
                    <Link href="#current-practice">
                      <span>{String(lesson.sections.length + 3).padStart(2, "0")}</span>
                      {depthLabels.currentTrend}
                    </Link>
                  </>
                )}
                <Link href="#continue-learning">
                  <span>
                    {String(
                      lesson.sections.length + (support ? 4 : 1),
                    ).padStart(2, "0")}
                  </span>
                  {readingShelfUi[lang].eyebrow}
                </Link>
              </nav>
            </details>
            <h1>{lesson.title}</h1>
            {lang !== "en" && lesson.englishTitle && (
              <p className="canonical-english-term">
                <span>{copy.englishTerm}</span>
                <strong lang="en">{lesson.englishTitle}</strong>
              </p>
            )}
            {lesson.terminology && (
              <aside className="terminology-panel" aria-label={copy.terminology}>
                <strong>{copy.terminology}</strong>
                <dl>
                  {lesson.terminology.map((term) => (
                    <div key={`${term.local}:${term.english}`}>
                      <dt>{term.local}</dt>
                      {term.local.toLocaleLowerCase() !== term.english.toLocaleLowerCase() && (
                        <dd lang="en">{term.english}</dd>
                      )}
                    </div>
                  ))}
                </dl>
              </aside>
            )}
            <p>{lesson.summary}</p>
            <dl>
              <div><dt>{copy.time}</dt><dd>{depth?.estimatedMinutes ?? lesson.duration} {copy.minutes}</dd></div>
              <div><dt>{copy.outcome}</dt><dd>{lesson.outcome}</dd></div>
              <div><dt>{copy.status}</dt><dd>{copy.humanReview}</dd></div>
            </dl>
          </header>

          {guidedSlug && (
            <GuidedOrientation language={lang} slug={guidedSlug} />
          )}

          {support && (
            <section className="lesson-scaffold" aria-label={course.guided}>
              <div className="lesson-prerequisites">
                <span>{course.prerequisites}</span>
                <ul>
                  {support.prerequisites.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <article className="lesson-warmup">
                <span>{course.warmup}</span>
                <h2>{support.warmup.question}</h2>
                <details>
                  <summary>{course.reveal}</summary>
                  <p>{support.warmup.answer}</p>
                </details>
              </article>
              <article className="course-project-card">
                <span>{course.project}</span>
                <h2>{support.project.action}</h2>
                <p><strong>{course.deliverable}</strong>{support.project.deliverable}</p>
              </article>
            </section>
          )}

          {!support && lesson.decisionGuide && (
            <section className="decision-guide" id="decision-path">
              <header className="decision-guide-heading">
                <span>{decisionGuideCopy[lang].eyebrow}</span>
                <h2>{decisionGuideCopy[lang].title}</h2>
                <p>{lesson.decisionGuide.question}</p>
              </header>
              <ol className="decision-guide-steps">
                {lesson.decisionGuide.steps.map((step, stepIndex) => (
                  <li key={`${step.label}:${step.prompt}`}>
                    <span>{String(stepIndex + 1).padStart(2, "0")}</span>
                    <strong>{step.label}</strong>
                    <h3>{step.prompt}</h3>
                    <p>{step.action}</p>
                    {stepIndex < lesson.decisionGuide!.steps.length - 1 && (
                      <i aria-hidden="true">→</i>
                    )}
                  </li>
                ))}
              </ol>
              <div className="decision-guide-checks">
                <section>
                  <strong>{decisionGuideCopy[lang].alternatives}</strong>
                  <ul>
                    {lesson.decisionGuide.alternatives.map((alternative) => (
                      <li key={alternative}>{alternative}</li>
                    ))}
                  </ul>
                </section>
                <section>
                  <strong>{decisionGuideCopy[lang].reconsider}</strong>
                  <p>{lesson.decisionGuide.reconsider}</p>
                </section>
              </div>
            </section>
          )}

          <LessonDiagram language={lang} slug={lesson.slug} />

          {lesson.sections.map((section, sectionIndex) => (
            <section className="article-section" id={`section-${sectionIndex + 1}`} key={section.heading}>
              <span className="section-number">{String(sectionIndex + 1).padStart(2, "0")}</span>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.formula && (
                <figure className={`formula-block${section.formulaSteps ? " formula-flow" : ""}`}>
                  {section.formulaSteps && (
                    <ol className="formula-flow-steps">
                      {section.formulaSteps.map((formulaStep) => (
                        <li className={formulaStep.isResult ? "formula-flow-result" : undefined} key={formulaStep.expression}>
                          <span className="formula-step-label">{formulaStep.label}</span>
                          <div className="formula-components">
                            <strong>{formulaFlowCopy[lang].components}</strong>
                            <ul>
                              {formulaStep.components.map((component) => <li key={component}>{component}</li>)}
                            </ul>
                          </div>
                          <div className="formula-expression" role="math" aria-label={formulaStep.expression}>
                            {formulaStep.expression}
                          </div>
                          <p>{formulaStep.explanation}</p>
                          {formulaStep.nextReason && (
                            <aside className="formula-transition">
                              <strong>{formulaFlowCopy[lang].whyNext}</strong>
                              <p>{formulaStep.nextReason}</p>
                            </aside>
                          )}
                        </li>
                      ))}
                    </ol>
                  )}
                  {!section.formulaSteps && (
                    <div className="formula-expression" role="math" aria-label={section.formula}>
                      {section.formula}
                    </div>
                  )}
                  {section.formulaVariables && !section.formulaSteps && (
                    <figcaption>
                      <strong>{copy.formulaVariables}</strong>
                      <ul>
                        {section.formulaVariables.map((variable) => <li key={variable}>{variable}</li>)}
                      </ul>
                    </figcaption>
                  )}
                </figure>
              )}
              {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
              {section.code && <pre><code>{section.code}</code></pre>}
              {section.note && <aside className="article-note"><CircleDot /><p>{section.note}</p></aside>}
            </section>
          ))}

          {support && (
            <section className="knowledge-check">
              <span>{course.checkpoint}</span>
              <h2>{support.checkpoint.question}</h2>
              <details>
                <summary>{course.reveal}</summary>
                <p>{support.checkpoint.answer}</p>
              </details>
            </section>
          )}

          <section className="exercise-card">
            <span>{copy.exercise}</span>
            <h2>{lesson.exercise}</h2>
            <p>{copy.exerciseHint}</p>
          </section>

          {guidedSlug && (
            <GuidedPracticeReview language={lang} slug={guidedSlug} />
          )}

          <ReadingShelf
            language={lang}
            lesson={lesson}
            existing={support?.references}
          />

          <aside className="article-source historical-source">
            <a
              href={`https://wikidocs.net/${lesson.sourcePageId}`}
              target="_blank"
              rel="noreferrer"
            >
              {course.historicalOutline} <ArrowUpRight />
            </a>
            <p>{course.historicalOutlineBody}</p>
          </aside>

          <nav className="article-pagination" aria-label="Lesson pagination">
            {previous ? (
              <Link href={`/${lang}/learn/${previous.slug}/`}><span>← {copy.previous}</span><strong>{previous.title}</strong></Link>
            ) : <span />}
            {next && (
              <Link href={`/${lang}/learn/${next.slug}/`}><span>{copy.next} →</span><strong>{next.title}</strong></Link>
            )}
          </nav>
        </article>
      </main>
    </div>
  );
}
