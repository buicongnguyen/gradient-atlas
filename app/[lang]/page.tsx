import { notFound } from "next/navigation";
import { isLanguage, languages, lessons } from "../data/content";
import { AtlasClient } from "../ui/AtlasClient";
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
    <div lang={lang} className="site-shell">
      <SiteHeader language={lang} />
      <main>
        <AtlasClient language={lang} lessons={lessons[lang]} />
      </main>
      <footer className="site-footer">
        <span>Gradient Atlas · 2026</span>
        <span>Original trilingual learning project</span>
      </footer>
    </div>
  );
}
