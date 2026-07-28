"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Language, ui } from "../data/content";
import { CircleDot, Moon } from "./icons";

export function SiteHeader({
  language,
  pathSuffix = "",
}: {
  language: Language;
  pathSuffix?: string;
}) {
  const copy = ui[language];

  useEffect(() => {
    document.documentElement.lang = language;
    const saved = window.localStorage.getItem("gradient-atlas-theme");
    const useLight =
      saved === "light" ||
      (!saved && window.matchMedia("(prefers-color-scheme: light)").matches);
    document.documentElement.dataset.theme = useLight ? "light" : "dark";
  }, [language]);

  function toggleTheme() {
    const next = document.documentElement.dataset.theme !== "light";
    document.documentElement.dataset.theme = next ? "light" : "dark";
    window.localStorage.setItem("gradient-atlas-theme", next ? "light" : "dark");
  }

  return (
    <header className="site-header">
      <Link className="brand" href={`/${language}/`}>
        <span className="brand-mark"><CircleDot /></span>
        <span>
          <strong>{copy.siteTitle}</strong>
          <small>{copy.siteSubtitle}</small>
        </span>
      </Link>
      <nav className="main-nav" aria-label="Primary navigation">
        <Link href={`/${language}/#map`}>{copy.nav.map}</Link>
        <Link href={`/${language}/catalog/`}>{copy.nav.lessons}</Link>
        <Link href={`/${language}/#labs`}>{copy.nav.labs}</Link>
        <Link href={`/${language}/#about`}>{copy.nav.about}</Link>
      </nav>
      <div className="header-actions">
        <div className="locale-switch" aria-label="Language">
          {(["ko", "en", "vi"] as Language[]).map((locale) => (
            <Link
              key={locale}
              href={`/${locale}${pathSuffix}`}
              lang={locale}
              aria-current={locale === language ? "page" : undefined}
            >
              {locale.toUpperCase()}
            </Link>
          ))}
        </div>
        <button
          className="theme-button"
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle color theme"
        >
          <Moon />
        </button>
      </div>
    </header>
  );
}
