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
        <p className="gate-note">
          Six pilot lessons · Three interactive labs · Human review pending
        </p>
      </section>
    </main>
  );
}
