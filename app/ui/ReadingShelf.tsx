import type { Language, Lesson } from "../data/content";
import {
  getReadingRecommendations,
  getReadingRouteId,
  getReadingShelfCopy,
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
  const copy = getReadingShelfCopy(lesson, language);
  const resources = getReadingRecommendations(lesson, existing);
  const routeId = getReadingRouteId(lesson);

  return (
    <section className="lesson-references" id="continue-learning" data-reading-route={routeId}>
      <header className="reading-shelf-header">
        <span>{copy.eyebrow}</span>
        <h2>{copy.title}</h2>
        <p>{copy.body}</p>
      </header>
      <div>
        {resources.map(({ source, kind }, index) => (
          <a
            className="reading-resource-card"
            data-resource-id={`${routeId}-${source.id}-${index + 1}`}
            href={source.url}
            target="_blank"
            rel="noreferrer"
            key={`${source.id}-${source.url}`}
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
