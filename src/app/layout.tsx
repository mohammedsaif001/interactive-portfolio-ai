import type { Metadata, Viewport } from "next";
import { Caveat, Inter } from "next/font/google";
import { ThemeProvider, themeInitScript } from "@/lib/theme";
import "./globals.css";

const body = Inter({ variable: "--font-body", subsets: ["latin"] });
const hand = Caveat({ variable: "--font-hand", subsets: ["latin"], weight: ["500", "700"] });

export const metadata: Metadata = {
  title: "Mohammed Saif | Senior Software Engineer · Full-stack · GenAI",
  description: "Interactive portfolio of Mohammed Saif, senior full-stack and GenAI engineer.",
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
    <html lang="en" data-theme="paper" suppressHydrationWarning className={`${body.variable} ${hand.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full">
        {/* shared SVG filter: gives edges and arrows a hand-drawn wobble */}
        <svg aria-hidden width="0" height="0" style={{ position: "absolute" }}>
          <filter id="wobble" filterUnits="userSpaceOnUse" x="-100000" y="-100000" width="200000" height="200000">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="3" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="3" />
          </filter>
        </svg>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
