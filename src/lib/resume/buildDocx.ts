import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  AlignmentType,
  BorderStyle,
  Document,
  ExternalHyperlink,
  ImageRun,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableBorders,
  TableCell,
  TableRow,
  TabStopType,
  TextRun,
  WidthType,
  type ParagraphChild,
} from "docx";
import type { ResumeData } from "@/constants/resume";
import { contactIcons } from "@/components/resume/ContactIcon";
import { contactKind } from "./contact";
import { fonts, layouts, parseMarkup, themes, type ResumeStyle } from "./styles";

/** Draws a contact icon to a PNG (Word cannot embed react-icons). */
async function iconPng(kind: keyof typeof contactIcons, color: string): Promise<Uint8Array> {
  const svg = renderToStaticMarkup(createElement(contactIcons[kind], { size: 96, color }));
  const img = new Image();
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  await img.decode();
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 96;
  canvas.getContext("2d")!.drawImage(img, 0, 0, 96, 96);
  const blob: Blob = await new Promise((r) => canvas.toBlob((b) => r(b!), "image/png"));
  return new Uint8Array(await blob.arrayBuffer());
}

const PAGE_W = 11906; // A4 in twips
const PAGE_H = 16838;
const MARGIN_X = 737; // 13mm
const CONTENT_W = PAGE_W - MARGIN_X * 2;
const INK = "1F2328";
const MUTED = "57606A";

const hex = (c: string) => c.replace("#", "");
const hp = (pt: number) => Math.round(pt * 2); // pt -> half-points

export async function buildDocx(data: ResumeData, style: ResumeStyle): Promise<Blob> {
  const t = themes[style.theme];
  const font = fonts[style.font].docx;
  const L = layouts[style.layout];
  const base = +(L.base * fonts[style.font].scale).toFixed(2);
  const H = hex(t.heading);
  const A = hex(t.accent);

  const rich = (text: string, o: { color?: string; size?: number; bold?: boolean } = {}) =>
    parseMarkup(text).map(
      (r) => new TextRun({ text: r.text, bold: r.bold || o.bold, color: r.bold ? "000000" : o.color ?? INK, size: hp(o.size ?? base) }),
    );

  const link = (label: string, href: string, size: number) =>
    href
      ? new ExternalHyperlink({ link: href, children: [new TextRun({ text: label, color: INK, size: hp(size) })] })
      : new TextRun({ text: label, color: INK, size: hp(size) });

  const kinds = Array.from(new Set([...data.contact, ...data.projects.flatMap((p) => p.links)].map(contactKind)));
  const pngs = Object.fromEntries(await Promise.all(kinds.map(async (k) => [k, await iconPng(k, t.accent)])));
  const icon = (kind: keyof typeof contactIcons, size: number) => {
    const px = Math.round(size * 1.15 * 1.333);
    return new ImageRun({ type: "png", data: pngs[kind], transformation: { width: px, height: px }, altText: { title: kind, description: kind, name: kind } });
  };

  const bannerFx = L.banner ? { shading: { type: ShadingType.CLEAR, fill: hex(t.chipBg), color: "auto" }, border: { left: { style: BorderStyle.SINGLE, size: 24, color: A, space: 8 } }, indent: { left: 140 } } : {};

  const heading = (text: string) =>
    new Paragraph({
      spacing: { before: Math.round(L.gap * 20), after: 80 },
      keepNext: true,
      border: { bottom: { style: BorderStyle.SINGLE, size: 10, color: H, space: 1 } },
      children: [new TextRun({ text: text.toUpperCase(), bold: true, color: H, size: hp(base * 1.22), characterSpacing: 16 })],
    });

  const bullet = (text: string) =>
    new Paragraph({
      bullet: { level: 0 },
      indent: { left: 300, hanging: 200 },
      spacing: { after: 30 },
      children: rich(text),
    });

  const headLine = (left: string, right: ParagraphChild[], tab: number) =>
    new Paragraph({
      keepNext: true,
      spacing: { before: 60 },
      tabStops: [{ type: TabStopType.RIGHT, position: tab }],
      children: [new TextRun({ text: left, bold: true, color: H, size: hp(base * 1.12) }), new TextRun({ text: "\t" }), ...right],
    });

  // Right edge for tab stops: width of the column the section sits in.
  const mainW = L.sidebar ? 7000 : CONTENT_W;
  const sideW = CONTENT_W - mainW;
  const mainTab = mainW - (L.sidebar ? 220 : 0);

  const summary = [heading("Summary"), new Paragraph({ children: rich(data.summary, { size: base * 1.02 }) })];

  const experience = [
    heading("Experience"),
    ...data.experience.flatMap((j) => [
      headLine(j.role, [new TextRun({ text: j.period, bold: true, color: MUTED, size: hp(base * 0.97) })], mainTab),
      new Paragraph({
        keepNext: true,
        children: [
          new TextRun({ text: j.company, bold: true, color: A, size: hp(base * 1.02) }),
          ...(j.location ? [new TextRun({ text: ` · ${j.location}`, color: MUTED, size: hp(base) })] : []),
        ],
      }),
      ...j.bullets.map(bullet),
    ]),
  ];

  const projects = [
    heading("Projects"),
    ...data.projects.flatMap((p) => [
      headLine(
        p.name,
        p.links.flatMap((l, i) => [
          new TextRun({ text: i ? "   " : "", size: hp(base * 0.93) }),
          icon(contactKind(l), base * 0.93),
          new TextRun({ text: " ", size: hp(base * 0.93) }),
          link(l.label, l.href, base * 0.93),
        ]),
        mainTab,
      ),
      ...p.bullets.map(bullet),
    ]),
  ];

  const skillLine = (label: string, items: string[], stacked: boolean) => {
    const chipRuns: TextRun[] = items.flatMap((item, i) =>
      t.chips
        ? [
            ...(i ? [new TextRun({ text: " ", size: hp(base) })] : []),
            new TextRun({ text: ` ${item} `, size: hp(base * 0.95), color: INK, shading: { type: ShadingType.CLEAR, fill: hex(t.chipBg), color: "auto" } }),
          ]
        : [new TextRun({ text: (i ? ", " : "") + item, size: hp(base * 0.97), color: INK })],
    );
    const head = new TextRun({ text: stacked ? label : `${label}:  `, bold: true, color: H, size: hp(base * 0.99) });
    return stacked
      ? [new Paragraph({ spacing: { before: 60 }, keepNext: true, children: [head] }), new Paragraph({ spacing: { after: 20, line: 320 }, children: chipRuns })]
      : [new Paragraph({ spacing: { before: 30, after: 30, line: 320 }, children: [head, ...chipRuns] })];
  };

  const skills = [heading("Skills"), ...data.skills.flatMap((s) => skillLine(s.label, s.items, L.sidebar))];

  const education = [
    heading("Education"),
    L.sidebar
      ? new Paragraph({ children: [new TextRun({ text: data.education.degree, bold: true, color: "000000", size: hp(base) })] })
      : new Paragraph({
          tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_W }],
          children: [
            new TextRun({ text: data.education.degree, bold: true, color: "000000", size: hp(base) }),
            new TextRun({ text: ` · ${data.education.school}`, color: INK, size: hp(base) }),
            new TextRun({ text: "\t" }),
            new TextRun({ text: data.education.period, bold: true, color: MUTED, size: hp(base * 0.97) }),
          ],
        }),
    ...(L.sidebar
      ? [
          new Paragraph({ children: [new TextRun({ text: data.education.school, color: INK, size: hp(base) })] }),
          new Paragraph({ children: [new TextRun({ text: data.education.period, bold: true, color: MUTED, size: hp(base * 0.97) })] }),
        ]
      : []),
  ];

  const contactRow = (row: typeof data.contact) =>
    new Paragraph({
      ...bannerFx,
      spacing: { before: 30 },
      children: row.flatMap((c, i) => [
        ...(i ? [new TextRun({ text: "      ", size: hp(base) })] : []),
        icon(contactKind(c), base),
        new TextRun({ text: "  ", size: hp(base) }),
        link(c.label, c.href, base * 0.96),
      ]),
    });
  const contactRuns: Paragraph[] = [contactRow(data.contact.slice(0, 3)), contactRow(data.contact.slice(3))];

  const header = [
    new Paragraph({ ...bannerFx, children: [new TextRun({ text: data.name.toUpperCase(), bold: true, color: H, size: hp(base * 2.55), characterSpacing: 10 })] }),
    new Paragraph({ ...bannerFx, spacing: { before: 10, after: 50 }, children: [new TextRun({ text: data.title, bold: true, color: A, size: hp(base * 1.28) })] }),
    ...contactRuns,
  ];

  let body: (Paragraph | Table)[];
  if (L.sidebar) {
    const cell = (children: Paragraph[], width: number, left: number, right: number) =>
      new TableCell({
        width: { size: width, type: WidthType.DXA },
        margins: { left, right },
        borders: { top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" } },
        children,
      });
    body = [
      new Table({
        width: { size: CONTENT_W, type: WidthType.DXA },
        columnWidths: [mainW, sideW],
        borders: TableBorders.NONE,
        rows: [new TableRow({ children: [cell([...summary, ...experience, ...projects], mainW, 0, 220), cell([...skills, ...education], sideW, 220, 0)] })],
      }),
    ];
  } else {
    body = [...summary, ...skills, ...experience, ...projects, ...education];
  }

  const doc = new Document({
    title: `${data.name} – Resume`,
    creator: data.name,
    styles: { default: { document: { run: { font, size: hp(base), color: INK }, paragraph: { alignment: AlignmentType.LEFT, spacing: { line: 264 } } } } },
    sections: [
      {
        properties: { page: { size: { width: PAGE_W, height: PAGE_H }, margin: { top: 510, bottom: 454, left: MARGIN_X, right: MARGIN_X } } },
        children: [...header, ...body],
      },
    ],
  });
  return Packer.toBlob(doc);
}
