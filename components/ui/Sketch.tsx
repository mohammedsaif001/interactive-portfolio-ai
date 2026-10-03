"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import rough from "roughjs";
import type { Color } from "@/data/profile";

export const colorVar: Record<Color | "card" | "ink", string> = {
  yellow: "#ffe27a",
  coral: "#ff9b85",
  blue: "#9cc9ff",
  green: "#a9e6b8",
  card: "#fffdf7",
  ink: "#1f2430",
};

/** Draws a hand-drawn (rough.js) box with an offset shadow behind its parent. */
function RoughBorder({ fill, seed, roughness }: { fill: string; seed: number; roughness: number }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    const parent = svg?.parentElement;
    if (!svg || !parent) return;

    const draw = () => {
      // offsetWidth/Height ignore CSS transforms (React Flow zoom), unlike getBoundingClientRect
      const w = parent.offsetWidth;
      const h = parent.offsetHeight;
      if (!w || !h) return;
      svg.setAttribute("width", String(w));
      svg.setAttribute("height", String(h));
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      svg.replaceChildren();
      const rc = rough.svg(svg);
      svg.appendChild(
        rc.rectangle(9, 9, w - 12, h - 12, { fill: colorVar.ink, fillStyle: "solid", stroke: "none", roughness: 0.6, seed }),
      );
      svg.appendChild(
        rc.rectangle(3, 3, w - 12, h - 12, {
          fill,
          fillStyle: "solid",
          stroke: colorVar.ink,
          strokeWidth: 2,
          roughness,
          seed,
        }),
      );
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(parent);
    return () => ro.disconnect();
  }, [fill, seed, roughness]);

  return <svg ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-visible" />;
}

type SketchProps = {
  children: ReactNode;
  className?: string;
  fill?: Color | "card";
  seed?: number;
  roughness?: number;
  style?: CSSProperties;
  as?: "div" | "a" | "li" | "article";
  href?: string;
};

export function Sketch({
  children,
  className = "",
  fill = "card",
  seed = 7,
  roughness = 1.3,
  style,
  as = "div",
  href,
}: SketchProps) {
  const Tag = as as "div";
  const extra = as === "a" ? { href, target: "_blank", rel: "noreferrer" } : {};
  return (
    <Tag className={`relative ${className}`} style={style} {...extra}>
      <RoughBorder fill={colorVar[fill]} seed={seed} roughness={roughness} />
      <div className="relative">{children}</div>
    </Tag>
  );
}

export function Tag({ children, color = "card" }: { children: ReactNode; color?: Color | "card" }) {
  return (
    <span
      className="inline-block rounded-full border-2 border-ink px-2.5 py-0.5 text-xs font-semibold"
      style={{ background: colorVar[color] }}
    >
      {children}
    </span>
  );
}

/** Hand-drawn connector arrow used between sections on mobile. */
export function DownArrow() {
  return (
    <svg aria-hidden width="48" height="64" viewBox="0 0 48 64" fill="none" className="mx-auto" style={{ filter: "url(#wobble)" }}>
      <path d="M24 2c-6 14 6 24-2 36 -2 8 2 14 2 18" stroke="#1f2430" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 7" />
      <path d="M12 46l12 14 12-14" stroke="#1f2430" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SectionTitle({ n, children, color = "yellow" }: { n: number; children: ReactNode; color?: Color }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-ink font-hand text-xl font-bold"
        style={{ background: colorVar[color] }}
      >
        {n}
      </span>
      <h2 className="font-hand text-4xl font-bold leading-none">{children}</h2>
    </div>
  );
}
