import { notFound } from "next/navigation";
import { isLanguage, languages, lessonNavigationItems, lessons, ui } from "../data/content";
import { AtlasClient } from "../ui/AtlasClient";
import { BookSidebar } from "../ui/BookSidebar";
import { SiteHeader } from "../ui/SiteHeader";

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();

  return (
    <div lang={lang} className="site-shell book-site">
      <a className="skip-link" href="#home-content">{ui[lang].skipToArticle}</a>
      <SiteHeader language={lang} bookMode />
      <div className="reader-shell">
        <BookSidebar
          language={lang}
          lessons={lessonNavigationItems(lessons[lang])}
          currentLocation="home"
        />
        <div className="book-page-content">
          <main id="home-content">
            <AtlasClient language={lang} lessons={lessons[lang]} />
          </main>
          <footer className="site-footer">
            <span>Gradient Atlas — {ui[lang].siteSubtitle} · 2026</span>
            <span>Original trilingual learning project</span>
          </footer>
        </div>
      </div>
    </div>
  );
}
