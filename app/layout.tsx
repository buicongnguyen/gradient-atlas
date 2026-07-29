import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://buicongnguyen.github.io/gradient-atlas/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Gradient Atlas · Machine Learning, clearly mapped",
    template: "%s · Gradient Atlas",
  },
  description:
    "Six guided machine-learning chapters, one continuing project, and a trilingual reference atlas.",
  openGraph: {
    title: "Gradient Atlas",
    description:
      "Six chapters. One project. Machine learning in English, Vietnamese, and Korean.",
    type: "website",
    images: [
      {
        url: new URL("og-course.png", siteUrl).toString(),
        width: 1732,
        height: 908,
        alt: "Gradient Atlas six-chapter machine-learning course",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gradient Atlas",
    description:
      "Six chapters. One project. Machine learning in English, Vietnamese, and Korean.",
    images: [new URL("og-course.png", siteUrl).toString()],
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
