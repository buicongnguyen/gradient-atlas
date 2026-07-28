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
          The six pilot lessons, interactive demonstrations, diagrams, interface,
          and examples in Gradient Atlas were written specifically for this
          project. They do not reproduce WikiDocs prose or media.
        </p>
      </section>
      <section>
        <h2>How WikiDocs is used</h2>
        <p>
          The public book at <a href="https://wikidocs.net/book/9057">WikiDocs book 9057</a> informed
          the general subject scope. Gradient Atlas links to it as related reading.
          A topic name such as “evaluation metrics” identifies a field of knowledge;
          the explanations and learning design here are independent.
        </p>
      </section>
      <section>
        <h2>Future adaptations</h2>
        <p>
          Any future page adapted from a third party must record its author,
          original URL, captured revision, license, modifications, and asset-level
          rights. Unknown or restricted material remains unpublished.
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
