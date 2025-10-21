import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3003";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DeepSeek-OCR — Contextual Optical Compression",
    template: "%s | DeepSeek-OCR",
  },
  description:
    "Explore the boundaries of visual-text compression. vLLM and Transformers inference, native/dynamic modes, prompt examples, and quick start.",
  applicationName: "DeepSeek-OCR",
  authors: [{ name: "DeepSeek contributors" }],
  creator: "DeepSeek contributors",
  publisher: "DeepSeek",
  keywords: [
    "DeepSeek-OCR",
    "OCR",
    "document AI",
    "vision encoder",
    "visual-text compression",
    "vLLM",
    "Transformers",
    "Flash Attention",
    "bfloat16",
  ],
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "DeepSeek-OCR — Contextual Optical Compression",
    description:
      "Explore the boundaries of visual-text compression with dual inference, native/dynamic modes, and prompt examples.",
    images: [
      {
        url: "/next.svg",
        width: 1200,
        height: 630,
        alt: "DeepSeek-OCR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DeepSeek-OCR — Contextual Optical Compression",
    description:
      "Explore the boundaries of visual-text compression with dual inference, native/dynamic modes, and prompt examples.",
    images: ["/next.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  themeColor: "#0f1524",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DeepSeek-OCR",
    url: SITE_URL,
    description:
      "Explore the boundaries of visual-text compression. vLLM and Transformers inference, native/dynamic modes, prompt examples, and quick start.",
  };

  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DeepSeek",
    url: SITE_URL,
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "cming.xu@gmail.com",
        contactType: "customer support",
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
      </body>
      <Analytics />
    </html>
  );
}
