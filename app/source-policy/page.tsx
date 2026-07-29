import Link from "next/link";
import { lessons, ui } from "../data/content";
import { referenceSources } from "../data/guided-course";
import { BookSidebar } from "../ui/BookSidebar";
import { SiteHeader } from "../ui/SiteHeader";

export default function SourcePolicyPage() {
  return (
    <div lang="en" className="site-shell book-site">
      <a className="skip-link" href="#policy-content">{ui.en.skipToArticle}</a>
      <SiteHeader language="en" bookMode />
      <div className="reader-shell">
        <BookSidebar
          language="en"
          lessons={lessons.en}
          currentLocation="policy"
        />
        <main className="policy-page" id="policy-content">
          <Link href="/en/">← Gradient Atlas</Link>
          <p className="eyebrow">Source and rights policy</p>
          <h1>Original first.<br /><em>Traceable always.</em></h1>
          <section id="original-content">
            <h2>What this release contains</h2>
            <p>
              Gradient Atlas contains a six-chapter guided course and 116
              supporting reference notes in English, Vietnamese, and Korean.
              Its explanatory prose, examples, exercises, interactive
              demonstrations, diagrams, and interface were written specifically
              for this project.
            </p>
          </section>
          <section id="reference-library">
            <h2>Reference library</h2>
            <p>
              These sources were selected for different strengths. A reference
              shapes the learning design or verifies a technical claim; it does
              not imply that its expression, figures, or code were copied.
            </p>
            <div className="policy-reference-list">
              {referenceSources.map((source) => (
                <a href={source.url} key={source.id}>
                  <strong>{source.title}</strong>
                  <small>{source.license}</small>
                  <p>{source.use.en}</p>
                </a>
              ))}
            </div>
          </section>
          <section id="wikidocs-history">
            <h2>How WikiDocs is used</h2>
            <p>
              The <a href="https://wikidocs.net/book/9057">DL Bible 07 WikiDocs
              book</a> is retained as the historical, fragmented topic index
              that prompted this reconstruction. Every atlas note preserves the
              corresponding topic link for traceability. Gradient Atlas does not
              rely on a WikiDocs reuse license and does not reproduce or
              translate its prose, code, equations, images, or other media.
            </p>
          </section>
          <section>
            <h2>Licensing boundary</h2>
            <p>
              Original Gradient Atlas content is published under CC BY 4.0.
              External references keep their own licenses. The current release
              cites them as reading and verification sources rather than
              adapting their expression. In particular, the all-rights-reserved
              Statistical Learning book is recommendation-only, and D2L passages
              and figures are not adapted.
            </p>
          </section>
          <section>
            <h2>Review status</h2>
            <p>
              This is an editorial preview. Automated structure and build checks have
              run, but independent machine-learning and native-language review remain
              pending. Corrections are welcome through the project repository.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
