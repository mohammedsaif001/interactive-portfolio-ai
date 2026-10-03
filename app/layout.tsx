import type { Metadata, Viewport } from "next";
import { Caveat, Inter } from "next/font/google";
import "./globals.css";

const body = Inter({ variable: "--font-body", subsets: ["latin"] });
const hand = Caveat({ variable: "--font-hand", subsets: ["latin"], weight: ["500", "700"] });

export const metadata: Metadata = {
  title: "Mohammed Saif | Senior Software Engineer · Full-stack · GenAI",
  description: "Interactive portfolio of Mohammed Saif, senior full-stack and GenAI engineer.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf6ec",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${body.variable} ${hand.variable} h-full antialiased`}>
      <body className="min-h-full">
        {/* shared SVG filter: gives edges and arrows a hand-drawn wobble */}
        <svg aria-hidden width="0" height="0" style={{ position: "absolute" }}>
          <filter id="wobble">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="3" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="3" />
          </filter>
        </svg>
        {children}
      </body>
    </html>
  );
}
