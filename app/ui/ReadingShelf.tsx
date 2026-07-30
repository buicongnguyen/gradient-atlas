import type { Language, Lesson } from "../data/content";
import {
  getReadingRecommendations,
  readingShelfUi,
} from "../data/reading-library";
import type { ReferenceId } from "../data/guided-course";
import { ArrowUpRight } from "./icons";

export function ReadingShelf({
  language,
  lesson,
  existing = [],
}: {
  language: Language;
  lesson: Lesson;
  existing?: ReferenceId[];
}) {
  const copy = readingShelfUi[language];
  const resources = getReadingRecommendations(lesson, existing);

  return (
    <section className="lesson-references" id="continue-learning">
      <header className="reading-shelf-header">
        <span>{copy.eyebrow}</span>
        <h2>{copy.title}</h2>
        <p>{copy.body}</p>
      </header>
      <div>
        {resources.map(({ source, kind }) => (
          <a
            className="reading-resource-card"
            data-resource-id={source.id}
            href={source.url}
            target="_blank"
            rel="noreferrer"
            key={source.id}
          >
            <div>
              <span>{copy.kinds[kind]}</span>
              <small>{source.license}</small>
            </div>
            <strong>{source.title}<ArrowUpRight /></strong>
            <p>{source.use[language]}</p>
            <b>{copy.open}</b>
          </a>
        ))}
      </div>
    </section>
  );
}
