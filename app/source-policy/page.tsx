import Link from "next/link";

export default function SourcePolicyPage() {
  return (
    <main className="policy-page">
      <Link href="/en/">← Gradient Atlas</Link>
      <p className="eyebrow">Source and rights policy</p>
      <h1>Original first.<br /><em>Traceable always.</em></h1>
      <section>
        <h2>What this release contains</h2>
        <p>
          Gradient Atlas contains 122 learning pages in English, Vietnamese,
          and Korean. Its explanatory prose, examples, exercises, interactive
          demonstrations, diagrams, and interface were written specifically
          for this project. They do not reproduce WikiDocs prose or media.
        </p>
      </section>
      <section>
        <h2>How WikiDocs is used</h2>
        <p>
          The page sequence and topic outline are adapted from the public
          <a href="https://wikidocs.net/book/9057"> WikiDocs book 9057</a> under
          its displayed <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0 license</a>.
          The named authors are 고민수 and 장선진.
          Every reader page links to its exact WikiDocs source page. The
          outline changes include translation and restructuring; the
          explanations and learning design are independently authored.
        </p>
      </section>
      <section>
        <h2>Attribution record</h2>
        <p>
          The machine-readable catalog records each original URL, source page
          ID, outline license, modification state, and original-body status.
          No third-party image, code sample, or media asset is included.
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
  );
}
