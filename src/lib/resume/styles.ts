// Style tokens shared by the HTML preview (and so the PDF) and the Word export.

export const themes = {
  navy: { label: "Navy & Orange", heading: "#1b2f6b", accent: "#e8710a", chipBg: "#eef2fa", chips: true },
  teal: { label: "Slate & Teal", heading: "#1f3a4d", accent: "#0f8b8d", chipBg: "#e6f2f2", chips: true },
  mono: { label: "Classic Mono", heading: "#111111", accent: "#444444", chipBg: "#efefef", chips: false },
  indigo: { label: "Indigo & Violet", heading: "#2e2a78", accent: "#6d4ee0", chipBg: "#eeecfb", chips: true },
  graphite: { label: "Graphite & Sky", heading: "#1f2937", accent: "#0369a1", chipBg: "#e8f1f8", chips: true },
  forest: { label: "Forest & Amber", heading: "#14532d", accent: "#b45309", chipBg: "#e8f3ec", chips: true },
  burgundy: { label: "Burgundy & Slate", heading: "#6b1d2a", accent: "#475569", chipBg: "#f6ecee", chips: true },
} as const;

export const fonts = {
  sans: { label: "Calibri (sans)", css: 'Calibri, "Segoe UI", Carlito, Arial, sans-serif', docx: "Calibri", scale: 1 },
  serif: { label: "Georgia (serif)", css: 'Georgia, "Times New Roman", serif', docx: "Georgia", scale: 0.92 },
  arial: { label: "Arial (neutral)", css: "Arial, Helvetica, sans-serif", docx: "Arial", scale: 0.93 },
} as const;

// scale evens out how much room each font takes
// base = body size in pt; gap = space above each section heading in pt
export const layouts = {
  single: { label: "Single column", base: 10.2, gap: 11, sidebar: false, banner: false },
  banner: { label: "Banner header", base: 10, gap: 10, sidebar: false, banner: true },
  sidebar: { label: "Two column", base: 10, gap: 11, sidebar: true, banner: false },
  compact: { label: "Compact", base: 9.4, gap: 8, sidebar: false, banner: false },
} as const;

export type ThemeKey = keyof typeof themes;
export type FontKey = keyof typeof fonts;
export type LayoutKey = keyof typeof layouts;
export type ResumeStyle = { theme: ThemeKey; font: FontKey; layout: LayoutKey };

export const defaultStyle: ResumeStyle = { theme: "navy", font: "sans", layout: "single" };

export type Run = { text: string; bold: boolean };

/** Splits `plain **bold** plain` into runs. */
export function parseMarkup(s: string): Run[] {
  return s
    .split("**")
    .map((text, i) => ({ text, bold: i % 2 === 1 }))
    .filter((r) => r.text);
}
