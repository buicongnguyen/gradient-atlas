import type { Language } from "../data/content";
import {
  getGuidedDepth,
  guidedDepthUi,
  practiceCodeBySlug,
  practiceOutputBySlug,
} from "../data/guided-depth";
import {
  getGuidedSupport,
  getReference,
  guidedSlugs,
  type GuidedSlug,
} from "../data/guided-course";
import { ArrowUpRight } from "./icons";

function answerLetter(index: number) {
  return String.fromCharCode(65 + index);
}

function presentQuiz(
  options: string[],
  answer: number,
  chapterIndex: number,
  questionIndex: number,
) {
  const offset = (chapterIndex + questionIndex * 2) % options.length;
  return {
    options: options.map(
      (_, displayIndex) => options[(displayIndex + offset) % options.length],
    ),
    answer: (answer - offset + options.length) % options.length,
  };
}

export function GuidedOrientation({
  language,
  slug,
}: {
  language: Language;
  slug: GuidedSlug;
}) {
  const depth = getGuidedDepth(language, slug)!;
  const labels = guidedDepthUi[language];
  const currentIndex = guidedSlugs.indexOf(slug);

  return (
    <section className="guided-orientation" id="big-picture">
      <header className="guided-block-heading">
        <span>{labels.bigPicture}</span>
        <h2>{labels.whereYouAre}</h2>
      </header>

      <figure className="course-position-map">
        <figcaption>{labels.courseMap}</figcaption>
        <ol
          aria-label={`${labels.courseMap}. ${labels.currentStep}: ${currentIndex + 1}`}
        >
          {guidedSlugs.map((stepSlug, index) => {
            const support = getGuidedSupport(language, stepSlug);
            const state =
              index < currentIndex
                ? "complete"
                : index === currentIndex
                  ? "current"
                  : "upcoming";
            return (
              <li
                className={state}
                key={stepSlug}
                aria-current={state === "current" ? "step" : undefined}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{support?.step}</strong>
                {state === "current" && <small>{labels.currentStep}</small>}
              </li>
            );
          })}
        </ol>
      </figure>

      <div className="guided-purpose">
        <span>{labels.purpose}</span>
        <p>{depth.purpose}</p>
      </div>

      <figure className="thinking-flow">
        <figcaption>{labels.thinkingFlow}</figcaption>
        <ol aria-label={labels.thinkingFlow}>
          {depth.thinkingFlow.map((item, index) => (
            <li key={item.label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.label}</strong>
              <p>{item.detail}</p>
              {index < depth.thinkingFlow.length - 1 && (
                <i aria-hidden="true">→</i>
              )}
            </li>
          ))}
        </ol>
      </figure>
    </section>
  );
}

export function GuidedPracticeReview({
  language,
  slug,
}: {
  language: Language;
  slug: GuidedSlug;
}) {
  const depth = getGuidedDepth(language, slug)!;
  const labels = guidedDepthUi[language];

  return (
    <>
      <section className="guided-practice" id="try-it-yourself">
        <header className="guided-block-heading">
          <span>{labels.tryIt}</span>
          <h2>{depth.practice.title}</h2>
          <p>{depth.practice.setup}</p>
        </header>
        <div className="practice-code-shell">
          <div>
            <span>{labels.python}</span>
            <code>late_delivery_example.py</code>
          </div>
          <pre aria-label={`${labels.tryIt}: Python`}>
            <code>{practiceCodeBySlug[slug]}</code>
          </pre>
        </div>
        <div className="practice-result-grid">
          <section>
            <span>{labels.expected}</span>
            <pre><code>{practiceOutputBySlug[slug]}</code></pre>
          </section>
          <section>
            <span>{labels.interpretation}</span>
            <p>{depth.practice.interpretation}</p>
          </section>
        </div>
        <aside className="practice-challenge">
          <strong>{labels.challenge}</strong>
          <p>{depth.practice.challenge}</p>
        </aside>
      </section>

      <section className="guided-quiz" id="mcq-review">
        <header className="guided-block-heading">
          <span>{labels.quiz}</span>
          <h2>{labels.chooseBeforeReveal}</h2>
        </header>
        <div className="mcq-grid">
          {depth.quiz.map((quiz, questionIndex) => {
            const presented = presentQuiz(
              quiz.options,
              quiz.answer,
              guidedSlugs.indexOf(slug),
              questionIndex,
            );
            return (
              <article className="mcq-card" key={quiz.question}>
                <span>{labels.question} {questionIndex + 1}</span>
                <h3>{quiz.question}</h3>
                <ol>
                  {presented.options.map((option, optionIndex) => (
                    <li key={option}>
                      <b>{answerLetter(optionIndex)}</b>
                      <p>{option}</p>
                    </li>
                  ))}
                </ol>
                <details>
                  <summary>{labels.showAnswer}</summary>
                  <div>
                    <strong>
                      {labels.correctAnswer}: {answerLetter(presented.answer)} ·{" "}
                      {presented.options[presented.answer]}
                    </strong>
                    <p>{quiz.explanation}</p>
                  </div>
                </details>
              </article>
            );
          })}
        </div>
      </section>

      <section className="guided-trend" id="current-practice">
        <header className="guided-block-heading">
          <span>{labels.currentTrend} · {labels.asOf}</span>
          <h2>{depth.trend.title}</h2>
          <p>{depth.trend.body}</p>
        </header>
        <div className="trend-grid">
          <section>
            <strong>{labels.watch}</strong>
            <ul>
              {depth.trend.watch.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>
          <nav aria-label={labels.currentTrend}>
            {depth.trend.references.map((referenceId) => {
              const reference = getReference(referenceId);
              if (!reference) return null;
              return (
                <a
                  href={reference.url}
                  key={reference.id}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>{reference.license}</span>
                  <strong>{reference.title}</strong>
                  <ArrowUpRight />
                </a>
              );
            })}
          </nav>
        </div>
      </section>
    </>
  );
}
