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
            <p className="eyebrow" id="gate-source-title">Source · Nguồn · 출처</p>
            <h2>DL Bible – 07. Machine Learning Fundamentals</h2>
            <p lang="en">
              The public outline by 고민수 and 장선진 is translated and
              restructured under CC BY 4.0. Gradient Atlas explanations,
              examples, diagrams, and code are original; WikiDocs prose and
              media are not copied.
            </p>
          </div>
          <div className="gate-source-actions">
            <a href="https://wikidocs.net/book/9057">
              Open WikiDocs source
              <ArrowUpRight />
            </a>
            <Link href="/source-policy/">
              Read source policy
              <ArrowUpRight />
            </Link>
          </div>
        </aside>
        <p className="gate-note">
          122 learning pages · 22 visual lessons · Human review pending
        </p>
      </section>
    </main>
  );
}
