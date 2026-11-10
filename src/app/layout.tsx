import type { Metadata, Viewport } from "next";
import { Caveat, Inter } from "next/font/google";
import { ThemeProvider, themeInitScript } from "@/lib/theme";
import { keywords, seoDescription, seoTitle, siteName, siteUrl } from "@/constants/seo";
import { structuredData } from "@/lib/seo";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"

const body = Inter({ variable: "--font-body", subsets: ["latin"] });
const hand = Caveat({ variable: "--font-hand", subsets: ["latin"], weight: ["500", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: seoTitle, template: "%s | Mohammed Saif" },
  description: seoDescription,
  keywords,
  applicationName: siteName,
  authors: [{ name: "Mohammed Saif", url: siteUrl }],
  creator: "Mohammed Saif",
  publisher: "Mohammed Saif",
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: siteUrl,
    siteName,
    title: seoTitle,
    description: seoDescription,
    locale: "en_IN",
    firstName: "Mohammed",
    lastName: "Saif",
    username: "imohdsaif",
  },
  twitter: { card: "summary_large_image", title: seoTitle, description: seoDescription },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  // Paste the codes from Google Search Console / Bing Webmaster into these env vars (see README).
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION, other: process.env.NEXT_PUBLIC_BING_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION } : undefined },
  other: { "geo.region": "IN-KA", "geo.placename": "Bengaluru", "geo.position": "12.9716;77.5946", ICBM: "12.9716, 77.5946" },
  // Icons live in /public (served from the site root), so they are declared here rather than as
  // special files inside src/app.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon.png", type: "image/png", sizes: "128x128" },
    ],
    apple: { url: "/icons/apple-icon.png", sizes: "180x180" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" data-theme="paper" suppressHydrationWarning className={`${body.variable} ${hand.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      </head>
      <body className="min-h-full">
        {/* shared SVG filter: gives edges and arrows a hand-drawn wobble */}
        <svg aria-hidden width="0" height="0" style={{ position: "absolute" }}>
          <filter id="wobble" filterUnits="userSpaceOnUse" x="-100000" y="-100000" width="200000" height="200000">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="3" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="3" />
          </filter>
        </svg>
        <ThemeProvider>{children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
