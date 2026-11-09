"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { Color } from "@/data/types";

/** A round, bordered icon sticker that bobs gently. Position it with className. */
export function FloatIcon({ icon: Icon, className = "", color = "yellow", rotate = -8, size = 22 }: { icon: LucideIcon; className?: string; color?: Color; rotate?: number; size?: number }) {
  return (
    <span
      aria-hidden
      className={`float pointer-events-none absolute z-10 grid h-11 w-11 place-items-center rounded-full border-2 border-ink shadow-[3px_3px_0_var(--shadow)] ${className}`}
      style={{ background: `var(--${color})`, ["--r" as string]: `${rotate}deg` }}
    >
      <Icon size={size} strokeWidth={2.2} />
    </span>
  );
}

const dashTiming = { duration: 3.4, repeat: Infinity, times: [0, 0.35, 0.85, 1], ease: "easeInOut" as const };

/**
 * A hand-drawn curly arrow that keeps re-drawing itself, with an optional handwritten label.
 * `up` draws it rising from the label to a target above it: place it just under the thing it points at
 * (the arrow tip is at the svg's top, 44px from its left edge).
 */
export function CurvyArrow({ label, className = "", up = false }: { label?: string; className?: string; up?: boolean }) {
  const text = label && <span className={`font-hand text-2xl font-bold leading-none text-ink ${up ? "mb-1" : "mt-4"}`}>{label}</span>;
  return (
    <span aria-hidden className={`pointer-events-none absolute z-10 flex gap-1 text-accent ${up ? "items-end" : "items-start"} ${className}`}>
      {!up && text}
      <svg width="72" height="58" viewBox="0 0 72 58" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="wobble">
        <motion.path
          d={up ? "M10 54C12 34 28 14 43 7" : "M68 6C56 2 32 8 20 36"}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={dashTiming}
        />
        <motion.path
          d={up ? "M32 4L44 6L38 17" : "M32 36l-12 2-4-12"}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 1, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, times: [0, 0.3, 0.45, 0.85, 1] }}
        />
      </svg>
      {up && text}
    </span>
  );
}
