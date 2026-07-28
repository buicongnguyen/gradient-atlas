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
    "An original Korean, English, and Vietnamese visual guide to machine-learning foundations.",
  openGraph: {
    title: "Gradient Atlas",
    description:
      "Machine-learning foundations, mapped in Korean, English, and Vietnamese.",
    type: "website",
    images: [
      {
        url: new URL("og.png", siteUrl).toString(),
        width: 1728,
        height: 908,
        alt: "Gradient Atlas machine-learning evidence loop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gradient Atlas",
    description:
      "Machine-learning foundations, mapped in Korean, English, and Vietnamese.",
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
