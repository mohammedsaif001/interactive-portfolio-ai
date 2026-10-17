"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Heart, Quote, Star } from "lucide-react";
import { profile } from "@/data/profile";
import { FloatIcon } from "@/components/ui/Doodles";
import { SectionTitle } from "@/components/ui/Sketch";
import { TechLogo } from "@/lib/techLogos";

const colors = ["var(--yellow)", "var(--coral)", "var(--green)", "var(--blue)"];
const PREVIEW = 260; // characters shown before "Read more"

/** Every public LinkedIn recommendation, one sticky note at a time (long ones collapse until asked). */
export function Recommendations() {
  const recs = profile.recommendations;
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const r = recs[i];
  const long = r.quote.length > PREVIEW;
  const shown = open || !long ? r.quote : r.quote.slice(0, PREVIEW).replace(/\s+\S*$/, "").replace(/[\s.,;:!]+$/, "") + "…";

  const go = (n: number) => {
    setI((n + recs.length) % recs.length);
    setOpen(false);
  };

  return (
    <div className="relative p-2 sm:p-4">
      <FloatIcon icon={Star} color="yellow" className="-right-2 top-0" rotate={14} />
      <SectionTitle icon={Heart} color="coral">
        Kind words
      </SectionTitle>
      <p className="-mt-2 mb-4 flex items-center gap-1.5 text-xs font-semibold text-muted">
        <TechLogo name="linkedin" size={14} /> {recs.length} recommendations from colleagues, quoted word for word from LinkedIn
      </p>

      <AnimatePresence mode="wait">
        <motion.figure
          key={i}
          initial={{ opacity: 0, y: 12, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: -1 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="sticky-note relative border-2 border-ink p-5"
          style={{ background: colors[i % colors.length] }}
        >
          <span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-ink bg-coral" aria-hidden />
          <Quote size={20} aria-hidden className="mb-1 opacity-60" />
          {/* nowheel/nodrag/nopan: lets an expanded quote scroll without panning or dragging the board */}
          <blockquote className={`nowheel nodrag nopan whitespace-pre-line text-[15px] leading-relaxed ${open ? "max-h-72 overflow-y-auto pr-1" : ""}`}>&ldquo;{shown}&rdquo;</blockquote>
          {long && (
            <button onClick={() => setOpen((o) => !o)} className="nodrag mt-1 text-xs font-bold underline underline-offset-2">
              {open ? "Show less" : "Read more"}
            </button>
          )}
          <figcaption className="mt-3 border-t-2 border-dashed border-ink/40 pt-2 text-sm">
            <span className="font-bold">{r.name}</span>
            <span className="block text-xs opacity-80">
              {r.title} · {r.date}
            </span>
          </figcaption>
        </motion.figure>
      </AnimatePresence>

      <div className="nodrag mt-4 flex items-center justify-between gap-2">
        <button onClick={() => go(i - 1)} aria-label="Previous recommendation" className="grid h-9 w-9 place-items-center rounded-full border-2 border-ink bg-card shadow-[2px_2px_0_var(--shadow)]">
          <ChevronLeft size={18} />
        </button>
        <div className="flex flex-wrap items-center justify-center gap-1.5" role="tablist" aria-label="Recommendations">
          {recs.map((x, k) => (
            <button
              key={x.name}
              role="tab"
              aria-selected={k === i}
              aria-label={`Recommendation from ${x.name}`}
              onClick={() => go(k)}
              className={`h-2.5 rounded-full border-2 border-ink transition-all ${k === i ? "w-6 bg-accent" : "w-2.5 bg-card"}`}
            />
          ))}
        </div>
        <button onClick={() => go(i + 1)} aria-label="Next recommendation" className="grid h-9 w-9 place-items-center rounded-full border-2 border-ink bg-card shadow-[2px_2px_0_var(--shadow)]">
          <ChevronRight size={18} />
        </button>
      </div>

      <a href={profile.recommendationsUrl} target="_blank" rel="noreferrer" className="nodrag mt-3 flex items-center justify-center gap-1.5 text-xs font-bold underline underline-offset-2">
        See them on LinkedIn <ExternalLink size={12} aria-hidden />
      </a>
    </div>
  );
}
