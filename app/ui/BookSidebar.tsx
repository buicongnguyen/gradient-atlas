"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Language, Lesson } from "../data/content";
import { ui } from "../data/content";

type LessonGroup = {
  key: string;
  collection: "legacy" | "fundamentals";
  part: string;
  lessons: Lesson[];
};

export function BookSidebar({
  language,
  lessons,
  currentLesson,
  currentLocation = "lesson",
}: {
  language: Language;
  lessons: Lesson[];
  currentLesson?: Lesson;
  currentLocation?: "home" | "catalog" | "lesson" | "policy";
}) {
  const copy = ui[language];
  const [open, setOpen] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);
  const [query, setQuery] = useState("");
  const [progress, setProgress] = useState(0);
  const sidebarRef = useRef<HTMLElement>(null);
  const currentRef = useRef<HTMLAnchorElement>(null);
  const normalizedQuery = query.trim().toLocaleLowerCase(language);

  const groups = useMemo(() => {
    const grouped = new Map<string, LessonGroup>();
    for (const lesson of lessons) {
      const collection = lesson.collection;
      const key = `${collection}:${lesson.part}`;
      if (!grouped.has(key)) {
        grouped.set(key, { key, collection, part: lesson.part, lessons: [] });
      }
      const searchText = [lesson.title, lesson.summary, ...lesson.tags]
        .join(" ")
        .toLocaleLowerCase(language);
      if (!normalizedQuery || searchText.includes(normalizedQuery)) {
        grouped.get(key)?.lessons.push(lesson);
      }
    }
    return [...grouped.values()].filter((group) => group.lessons.length > 0);
  }, [language, lessons, normalizedQuery]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 720px)");
    const update = () => setIsNarrow(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    const current = currentRef.current;
    if (sidebar && current && !normalizedQuery) {
      sidebar.scrollTop =
        current.offsetTop - sidebar.clientHeight / 2 + current.clientHeight / 2;
    }
  }, [currentLesson?.id, normalizedQuery]);

  useEffect(() => {
    function updateProgress() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0);
    }
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("reader-drawer-open", open);
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.documentElement.classList.remove("reader-drawer-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <>
      <div
        className="reading-progress"
        aria-hidden="true"
        style={{ "--reading-progress": `${progress}%` } as React.CSSProperties}
      />
      <button
        className="book-menu-button"
        type="button"
        aria-controls="book-contents"
        aria-expanded={open}
        aria-label={open ? copy.closeContents : copy.openContents}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>
      <button
        className={`reader-backdrop ${open ? "visible" : ""}`}
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        onClick={() => setOpen(false)}
      />
      <aside
        id="book-contents"
        ref={sidebarRef}
        className={`reader-sidebar book-sidebar ${open ? "open" : ""}`}
        aria-label={copy.bookContents}
        aria-hidden={isNarrow && !open ? true : undefined}
        inert={isNarrow && !open ? true : undefined}
      >
        <div className="book-sidebar-intro">
          <strong>{copy.bookContents}</strong>
          <span>122 × EN · VI · KO</span>
          <nav className="book-sidebar-destinations" aria-label={copy.bookContents}>
            <Link
              href={`/${language}/`}
              aria-current={currentLocation === "home" ? "page" : undefined}
            >
              {copy.siteTitle}
            </Link>
            <Link
              href={`/${language}/catalog/`}
              aria-current={currentLocation === "catalog" ? "page" : undefined}
            >
              {copy.catalog}
            </Link>
            <Link
              href="/source-policy/"
              aria-current={currentLocation === "policy" ? "page" : undefined}
            >
              {copy.sourcePolicy}
            </Link>
          </nav>
        </div>
        <label className="book-search">
          <span>{copy.search}</span>
          <input
            type="search"
            aria-label={copy.search}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.search}
          />
        </label>
        <nav aria-label={copy.bookContents}>
          {groups.map((group) => {
            const containsCurrent = group.lessons.some(
              (item) => item.id === currentLesson?.id,
            );
            return (
            <details
              className="book-chapter"
              key={group.key}
              open={Boolean(normalizedQuery) || containsCurrent}
            >
              <summary>
                <span>
                  <small>
                  {group.collection === "fundamentals" ? copy.fundamentals : copy.legacy}
                  </small>
                  <strong>PART {group.part}</strong>
                </span>
                <i>{group.lessons.length}</i>
              </summary>
              <div className="book-chapter-pages">
                {group.lessons.map((item) => (
                  <Link
                    className="book-page-link"
                    ref={item.id === currentLesson?.id ? currentRef : undefined}
                    key={item.id}
                    href={`/${language}/learn/${item.slug}/`}
                    aria-current={item.id === currentLesson?.id ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    <span>{item.number}</span>
                    <span>{item.title}</span>
                    {item.id === currentLesson?.id && <i>{copy.currentPage}</i>}
                  </Link>
                ))}
              </div>
            </details>
          )})}
        </nav>
        {groups.length === 0 && <p className="book-empty">0 {copy.pages}</p>}
      </aside>
    </>
  );
}
