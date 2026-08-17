import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://buicongnguyen.github.io/gradient-atlas/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Gradient Atlas — Machine Learning: From Decisions to Reliable Systems",
    template: "%s · Gradient Atlas",
  },
  description:
    "A visual, practical guide to reasoning from problem framing and data to models, evaluation, and reliable production systems.",
  openGraph: {
    title: "Gradient Atlas — Machine Learning: From Decisions to Reliable Systems",
    description:
      "See the big picture, reason through the flow, try Python, and check your understanding—in English, Vietnamese, and Korean.",
    type: "website",
    images: [
      {
        url: new URL("og.png", siteUrl).toString(),
        width: 1727,
        height: 910,
        alt: "Gradient Atlas — Machine Learning: From Decisions to Reliable Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gradient Atlas — Machine Learning: From Decisions to Reliable Systems",
    description:
      "See the big picture, reason through the flow, try Python, and check your understanding—in English, Vietnamese, and Korean.",
    images: [new URL("og.png", siteUrl).toString()],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
