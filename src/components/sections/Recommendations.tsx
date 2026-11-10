"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Heart, Quote, Star } from "lucide-react";
import { profile } from "@/constants";
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
  // +1 when moving forward, -1 when moving back: decides which side the next card slides in from
  const [dir, setDir] = useState(1);
  const x = useMotionValue(0);
  const tilt = useTransform(x, [-220, 0, 220], [-9, -1, 7]);
  const r = recs[i];
  const long = r.quote.length > PREVIEW;
  const shown = open || !long ? r.quote : r.quote.slice(0, PREVIEW).replace(/\s+\S*$/, "").replace(/[\s.,;:!]+$/, "") + "…";

  const go = (n: number, d = n > i ? 1 : -1) => {
    setDir(d);
    setI((n + recs.length) % recs.length);
    setOpen(false);
  };

  // Flashcard swipe: flick the note left for the next one, right for the previous one.
  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -70 || info.velocity.x < -450) go(i + 1, 1);
    else if (info.offset.x > 70 || info.velocity.x > 450) go(i - 1, -1);
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

      <AnimatePresence mode="wait" custom={dir}>
        <motion.figure
          key={i}
          custom={dir}
          variants={{
            enter: (d: number) => ({ opacity: 0, x: d * 140 }),
            center: { opacity: 1, x: 0 },
            exit: (d: number) => ({ opacity: 0, x: d * -140 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.28, ease: "easeOut" }}
          // drag the note sideways; vertical scrolling and the whiteboard's own pan/drag are left alone
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.6}
          onDragEnd={onDragEnd}
          style={{ x, rotate: tilt, background: colors[i % colors.length] }}
          aria-roledescription="slide"
          aria-label={`Recommendation ${i + 1} of ${recs.length}, from ${r.name}`}
          className="sticky-note nodrag nopan relative cursor-grab border-2 border-ink p-5 active:cursor-grabbing"
        >
          <span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-ink bg-coral" aria-hidden />
          <Quote size={20} aria-hidden className="mb-1 opacity-60" />
          {/* nowheel: lets an expanded quote scroll without the wheel also panning the board */}
          <blockquote className={`nowheel whitespace-pre-line text-[15px] leading-relaxed ${open ? "max-h-72 overflow-y-auto pr-1" : ""}`}>&ldquo;{shown}&rdquo;</blockquote>
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

      <p className="mt-3 text-center text-[11px] font-semibold text-muted">Swipe or drag the note · {i + 1} of {recs.length}</p>

      <div className="nodrag mt-2 flex items-center justify-between gap-2">
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
