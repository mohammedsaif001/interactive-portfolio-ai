"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { Color } from "@/data/profile";

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

/** A hand-drawn curly arrow that keeps re-drawing itself, with an optional handwritten label. */
export function CurvyArrow({ label, className = "" }: { label?: string; className?: string }) {
  return (
    <span aria-hidden className={`pointer-events-none absolute z-10 flex items-start gap-1 text-accent ${className}`}>
      {label && <span className="font-hand mt-4 text-2xl font-bold leading-none text-ink">{label}</span>}
      <svg width="72" height="58" viewBox="0 0 72 58" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="wobble">
        <motion.path
          d="M68 6C56 2 32 8 20 36"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, times: [0, 0.35, 0.85, 1], ease: "easeInOut" }}
        />
        <motion.path
          d="M32 36l-12 2-4-12"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 1, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, times: [0, 0.3, 0.45, 0.85, 1] }}
        />
      </svg>
    </span>
  );
}
