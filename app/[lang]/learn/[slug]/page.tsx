import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLesson, isLanguage, languages, lessons, ui } from "../../../data/content";
import { getGuidedDepth, guidedDepthUi } from "../../../data/guided-depth";
import {
  courseUi,
  getGuidedSupport,
  getReference,
  guidedSlugs,
  type GuidedSlug,
} from "../../../data/guided-course";
import { ArrowUpRight, Check, CircleDot } from "../../../ui/icons";
import { BookSidebar } from "../../../ui/BookSidebar";
import {
  GuidedOrientation,
  GuidedPracticeReview,
} from "../../../ui/GuidedLearningBlocks";
import { LessonDiagram } from "../../../ui/LessonDiagram";
import { SiteHeader } from "../../../ui/SiteHeader";

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
        <BookSidebar language={lang} lessons={lessonList} currentLesson={lesson} />

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
              </nav>
            </details>
            <h1>{lesson.title}</h1>
            {lang === "vi" && lesson.englishTitle && (
              <p className="canonical-english-term">
                <span>{copy.englishTerm}</span>
                <strong lang="en">{lesson.englishTitle}</strong>
              </p>
            )}
            {lang === "vi" && lesson.terminology && (
              <aside className="terminology-panel" aria-label={copy.terminology}>
                <strong>{copy.terminology}</strong>
                <dl>
                  {lesson.terminology.map((term) => (
                    <div key={`${term.local}:${term.english}`}>
                      <dt>{term.local}</dt>
                      <dd lang="en">{term.english}</dd>
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

          <LessonDiagram language={lang} slug={lesson.slug} />

          {lesson.sections.map((section, sectionIndex) => (
            <section className="article-section" id={`section-${sectionIndex + 1}`} key={section.heading}>
              <span className="section-number">{String(sectionIndex + 1).padStart(2, "0")}</span>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.formula && (
                <figure className="formula-block">
                  <div className="formula-expression" role="math" aria-label={section.formula}>
                    {section.formula}
                  </div>
                  {section.formulaVariables && (
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

          {support && (
            <section className="lesson-references">
              <span>{course.furtherReading}</span>
              <div>
                {support.references.map((referenceId) => {
                  const reference = getReference(referenceId);
                  if (!reference) return null;
                  return (
                    <a href={reference.url} target="_blank" rel="noreferrer" key={reference.id}>
                      <strong>{reference.title}<ArrowUpRight /></strong>
                      <small>{reference.license}</small>
                      <p>{reference.use[lang]}</p>
                    </a>
                  );
                })}
              </div>
            </section>
          )}

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
