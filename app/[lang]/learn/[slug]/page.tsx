import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLesson, isLanguage, languages, lessons, ui } from "../../../data/content";
import { ArrowUpRight, Check, CircleDot } from "../../../ui/icons";
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
    <div lang={lang} className="site-shell">
      <SiteHeader language={lang} pathSuffix={suffix} />
      <main className="reader-shell">
        <aside className="reader-sidebar">
          <Link className="back-to-map" href={`/${lang}/#lessons`}>← {copy.allLessons}</Link>
          <p>{copy.allLessons}</p>
          <nav aria-label={copy.allLessons}>
            {lessonList.map((item) => (
              <Link
                key={item.id}
                href={`/${lang}/learn/${item.slug}/`}
                aria-current={item.id === lesson.id ? "page" : undefined}
              >
                <span>{item.number}</span>{item.title}
              </Link>
            ))}
          </nav>
          <div className="review-card">
            <CircleDot />
            <div><strong>{copy.humanReview}</strong><small>preview · v0.1</small></div>
          </div>
        </aside>

        <article className="lesson-article">
          <header className="article-header">
            <div className="article-kicker">
              <span>PART {lesson.part} · {lesson.number}</span>
              <small><Check />{copy.original}</small>
            </div>
            <h1>{lesson.title}</h1>
            <p>{lesson.summary}</p>
            <dl>
              <div><dt>Time</dt><dd>{lesson.duration} {copy.minutes}</dd></div>
              <div><dt>Outcome</dt><dd>{lesson.outcome}</dd></div>
              <div><dt>Status</dt><dd>{copy.humanReview}</dd></div>
            </dl>
          </header>

          {lesson.sections.map((section, sectionIndex) => (
            <section className="article-section" id={`section-${sectionIndex + 1}`} key={section.heading}>
              <span className="section-number">{String(sectionIndex + 1).padStart(2, "0")}</span>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.formula && <div className="formula-block">{section.formula}</div>}
              {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
              {section.code && <pre><code>{section.code}</code></pre>}
              {section.note && <aside className="article-note"><CircleDot /><p>{section.note}</p></aside>}
            </section>
          ))}

          <section className="exercise-card">
            <span>{copy.exercise}</span>
            <h2>{lesson.exercise}</h2>
            <p>Write your assumptions before checking an answer. The goal is to make the reasoning inspectable.</p>
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

        <aside className="article-outline">
          <p>{copy.onThisPage}</p>
          {lesson.sections.map((section, sectionIndex) => (
            <Link href={`#section-${sectionIndex + 1}`} key={section.heading}>{section.heading}</Link>
          ))}
          <a className="wikidocs-reference" href="https://wikidocs.net/book/9057" target="_blank" rel="noreferrer">
            Related WikiDocs syllabus <ArrowUpRight />
          </a>
        </aside>
      </main>
    </div>
  );
}
