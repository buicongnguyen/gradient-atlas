"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Language, Lesson } from "../data/content";
import { ui } from "../data/content";
import { courseUi } from "../data/guided-course";
import { ArrowUpRight } from "./icons";

type Filter = "all" | "guided" | "reference";

export function CatalogClient({
  language,
  lessons,
}: {
  language: Language;
  lessons: Lesson[];
}) {
  const copy = ui[language];
  const course = courseUi[language];
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const normalizedQuery = query.trim().toLocaleLowerCase(language);
  const visible = useMemo(
    () =>
      lessons.filter((lesson) => {
        const collectionMatch =
          filter === "all" ||
          (filter === "guided" ? lesson.featured : !lesson.featured);
        const searchText = [lesson.title, lesson.summary, ...(lesson.tags ?? [])]
          .join(" ")
          .toLocaleLowerCase(language);
        return collectionMatch && (!normalizedQuery || searchText.includes(normalizedQuery));
      }),
    [filter, language, lessons, normalizedQuery],
  );

  const groups = useMemo(() => {
    const grouped = new Map<string, Lesson[]>();
    for (const lesson of visible) {
      const key = `${lesson.featured ? "guided" : lesson.collection}:${lesson.part}`;
      grouped.set(key, [...(grouped.get(key) ?? []), lesson]);
    }
    return [...grouped.entries()];
  }, [visible]);

  return (
    <main className="catalog-page" id="catalog-content">
      <header className="catalog-hero">
        <p className="eyebrow">6 {course.guided} · 116 {course.referenceAtlas} · EN · VI · KO</p>
        <h1>{copy.catalogTitle}</h1>
        <p>{copy.catalogBody}</p>
      </header>

      <section className="catalog-controls" aria-label={copy.catalogTitle}>
        <label>
          <span>{copy.search}</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.search}
          />
        </label>
        <div className="catalog-filters" role="group" aria-label={copy.allCollections}>
          {([
            ["all", copy.allCollections],
            ["guided", course.guided],
            ["reference", course.referenceAtlas],
          ] as [Filter, string][]).map(([value, label]) => (
            <button
              type="button"
              key={value}
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>
        <output>{visible.length} {copy.pages}</output>
      </section>

      <div className="catalog-groups">
        {groups.map(([key, group]) => {
          const [collection, part] = key.split(":");
          return (
            <section className="catalog-group" key={key}>
              <header>
                <span>
                  {collection === "guided"
                    ? course.guided
                    : collection === "fundamentals"
                      ? copy.fundamentals
                      : copy.legacy}
                </span>
                <h2>PART {part}</h2>
                <small>{group.length} {copy.pages}</small>
              </header>
              <div className="catalog-list">
                {group.map((lesson) => (
                  <Link key={lesson.id} href={`/${language}/learn/${lesson.slug}/`}>
                    <span>{lesson.number}</span>
                    <div>
                      <strong>{lesson.title}</strong>
                      <small>{lesson.summary}</small>
                    </div>
                    <ArrowUpRight />
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
