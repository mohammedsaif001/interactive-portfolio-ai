"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import rough from "roughjs";
import type { LucideIcon } from "lucide-react";
import type { Color } from "@/data/profile";
import { useTheme } from "@/lib/theme";

export type Fill = Color | "card";

const cssVar = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

/** Draws a hand-drawn (rough.js) box with an offset shadow behind its parent. Theme-aware; draws itself in on first paint. */
function RoughBorder({ fill, seed, roughness }: { fill: Fill; seed: number; roughness: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const { theme } = useTheme();
  const first = useRef(true);

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
      const ink = cssVar("--ink");
      const rc = rough.svg(svg);
      svg.appendChild(rc.rectangle(9, 9, w - 12, h - 12, { fill: cssVar("--shadow"), fillStyle: "solid", stroke: "none", roughness: 0.6, seed }));
      svg.appendChild(
        rc.rectangle(3, 3, w - 12, h - 12, { fill: cssVar(`--${fill}`), fillStyle: "solid", stroke: ink, strokeWidth: 2, roughness, seed }),
      );

      if (first.current) {
        svg.classList.add("rough-draw");
        svg.querySelectorAll("path").forEach((p) => {
          if (p.getAttribute("fill") === "none" && p.getAttribute("stroke") !== "none") {
            p.style.setProperty("--len", String(Math.ceil(p.getTotalLength())));
          }
        });
        first.current = false;
      } else {
        svg.classList.remove("rough-draw");
      }
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(parent);
    return () => ro.disconnect();
  }, [fill, seed, roughness, theme]);

  return <svg ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-visible" />;
}

type SketchProps = {
  children: ReactNode;
  className?: string;
  fill?: Fill;
  seed?: number;
  roughness?: number;
  style?: CSSProperties;
  as?: "div" | "a" | "li" | "article" | "button";
  href?: string;
  onClick?: () => void;
};

export function Sketch({ children, className = "", fill = "card", seed = 7, roughness = 1.3, style, as = "div", href, onClick }: SketchProps) {
  const Tag = as as "div";
  const extra = as === "a" ? { href, target: "_blank", rel: "noreferrer" } : as === "button" ? { type: "button" as const, onClick } : {};
  return (
    <Tag className={`relative ${className}`} style={style} {...extra}>
      <RoughBorder fill={fill} seed={seed} roughness={roughness} />
      <div className="relative">{children}</div>
    </Tag>
  );
}

export function Tag({ children, color = "card" }: { children: ReactNode; color?: Fill }) {
  return (
    <span className="inline-block rounded-full border-2 border-ink px-2.5 py-0.5 text-xs font-semibold" style={{ background: `var(--${color})` }}>
      {children}
    </span>
  );
}

/** Hand-drawn connector arrow used between sections on mobile, with a dot travelling down it. */
export function DownArrow() {
  return (
    <svg aria-hidden width="48" height="72" viewBox="0 0 48 72" fill="none" className="wobble mx-auto" style={{ color: "var(--ink)" }}>
      <path id="da" d="M24 2c-6 14 6 24-2 36 -2 8 2 14 2 22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 7" />
      <path d="M12 54l12 14 12-14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle r="4.5" fill="var(--accent)" stroke="currentColor" strokeWidth="1.5">
        <animateMotion dur="2.4s" repeatCount="indefinite" path="M24 2c-6 14 6 24-2 36 -2 8 2 14 2 22" />
      </circle>
    </svg>
  );
}

export function SectionTitle({ icon: Icon, children, color = "yellow" }: { icon: LucideIcon; children: ReactNode; color?: Color }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="grid h-11 w-11 shrink-0 -rotate-6 place-items-center rounded-full border-2 border-ink shadow-[3px_3px_0_var(--shadow)]" style={{ background: `var(--${color})` }}>
        <Icon size={22} strokeWidth={2.2} aria-hidden />
      </span>
      <h2 className="glow font-hand text-4xl font-bold leading-none">{children}</h2>
    </div>
  );
}
