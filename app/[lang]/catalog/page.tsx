import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLanguage, languages, lessonNavigationItems, lessons, ui } from "../../data/content";
import { CatalogClient } from "../../ui/CatalogClient";
import { BookSidebar } from "../../ui/BookSidebar";
import { SiteHeader } from "../../ui/SiteHeader";

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) return {};
  return { title: ui[lang].catalogTitle, description: ui[lang].catalogBody };
}

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();

  return (
    <div lang={lang} className="site-shell book-site">
      <a className="skip-link" href="#catalog-content">{ui[lang].skipToArticle}</a>
      <SiteHeader language={lang} pathSuffix="/catalog/" bookMode />
      <div className="reader-shell">
        <BookSidebar
          language={lang}
          lessons={lessonNavigationItems(lessons[lang])}
          currentLocation="catalog"
        />
        <CatalogClient language={lang} lessons={lessons[lang]} />
      </div>
    </div>
  );
}
