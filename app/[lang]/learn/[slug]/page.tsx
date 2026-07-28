import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLesson, isLanguage, languages, lessons, ui } from "../../../data/content";
import { ArrowUpRight, Check, CircleDot } from "../../../ui/icons";
import { BookSidebar } from "../../../ui/BookSidebar";
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
  const index = lessonList.findIndex((item) => item.id === lesson.id);
  const previous = lessonList[index - 1];
  const next = lessonList[index + 1];
  const copy = ui[lang];
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
              <span>PART {lesson.part} · {lesson.number}</span>
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
                {lesson.sections.map((section, sectionIndex) => (
                  <Link href={`#section-${sectionIndex + 1}`} key={section.heading}>
                    <span>{String(sectionIndex + 1).padStart(2, "0")}</span>
                    {section.heading}
                  </Link>
                ))}
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
              <div><dt>{copy.time}</dt><dd>{lesson.duration} {copy.minutes}</dd></div>
              <div><dt>{copy.outcome}</dt><dd>{lesson.outcome}</dd></div>
              <div><dt>{copy.status}</dt><dd>{copy.humanReview}</dd></div>
            </dl>
          </header>

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

          <aside className="article-source">
            <a
              href={`https://wikidocs.net/${lesson.sourcePageId}`}
              target="_blank"
              rel="noreferrer"
            >
              {copy.relatedOutline} <ArrowUpRight />
            </a>
            <p>{copy.outlineAttribution}</p>
          </aside>

          <section className="exercise-card">
            <span>{copy.exercise}</span>
            <h2>{lesson.exercise}</h2>
            <p>{copy.exerciseHint}</p>
          </section>

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
