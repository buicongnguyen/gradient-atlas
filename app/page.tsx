import Link from "next/link";
import { ArrowUpRight, CircleDot, Languages } from "./ui/icons";

export default function RootLanding() {
  return (
    <main className="root-landing">
      <div className="root-grid" aria-hidden="true" />
      <section className="language-gate">
        <div className="gate-mark">
          <CircleDot />
        </div>
        <p className="eyebrow">Original · Trilingual · Open learning</p>
        <h1>
          Machine learning,
          <br />
          <em>clearly mapped.</em>
        </h1>
        <p className="gate-lede">
          Gradient Atlas is a visual field guide to the decisions behind useful,
          reliable machine-learning systems.
        </p>
        <div className="language-label">
          <Languages />
          Choose your reading language
        </div>
        <nav className="language-cards" aria-label="Choose language">
          <Link href="/en/" lang="en">
            <span>EN</span>
            <strong>English</strong>
            <ArrowUpRight />
          </Link>
          <Link href="/vi/" lang="vi">
            <span>VI</span>
            <strong>Tiếng Việt</strong>
            <ArrowUpRight />
          </Link>
          <Link href="/ko/" lang="ko">
            <span>KO</span>
            <strong>한국어</strong>
            <ArrowUpRight />
          </Link>
        </nav>
        <aside className="gate-source" aria-labelledby="gate-source-title">
          <div>
            <p className="eyebrow" id="gate-source-title">References · Tham khảo · 참고 자료</p>
            <h2>Reconstructed for a continuous reading path</h2>
            <p lang="en">
              Microsoft ML for Beginners informs the project rhythm, Google
              ML Crash Course the concise interactive modules, D2L the
              math–code pairing, and scikit-learn the implementation checks.
              WikiDocs is retained only as the historical topic index that
              prompted the reconstruction.
            </p>
          </div>
          <div className="gate-source-actions">
            <a href="https://wikidocs.net/book/9057">
              Historical WikiDocs index
              <ArrowUpRight />
            </a>
            <Link href="/source-policy/">
              Read reference policy
              <ArrowUpRight />
            </Link>
          </div>
        </aside>
        <p className="gate-note">
          6 guided chapters · 116 reference notes · 22 original diagrams · Human review pending
        </p>
      </section>
    </main>
  );
}
