"use client";

import { Fragment, type ReactNode } from "react";
import { LayoutList } from "lucide-react";
import { profile, sections, type SectionId } from "@/data/profile";
import { DownArrow } from "@/components/ui/Sketch";
import { Intro } from "@/components/sections/Intro";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Recommendations } from "@/components/sections/Recommendations";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";

const content: Record<SectionId, ReactNode> = {
  intro: <Intro />,
  experience: <Experience />,
  projects: <Projects />,
  recs: <Recommendations />,
  skills: <Skills />,
  contact: <Contact />,
};

/** Mobile version of the whiteboard: same frames, stacked vertically with drawn arrows. */
export function Story({ onOverview }: { onOverview: () => void }) {
  return (
    <div className="min-h-dvh pb-28">
      <header className="sticky top-0 z-20 border-b-2 border-ink bg-paper/95 backdrop-blur">
        <div className="flex items-center justify-between gap-2 px-4 py-2.5">
          <p className="font-hand text-2xl font-bold leading-none">{profile.name}</p>
          <button
            onClick={onOverview}
            className="flex items-center gap-1.5 rounded-lg border-2 border-ink bg-mint px-3 py-1.5 text-xs font-bold shadow-[2px_2px_0_#1f2430]"
          >
            <LayoutList size={14} aria-hidden /> Quick overview
          </button>
        </div>
        <nav aria-label="Sections" className="flex gap-2 overflow-x-auto px-4 pb-2.5 [scrollbar-width:none]">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="shrink-0 rounded-full border-2 border-ink bg-card px-3 py-1 text-xs font-bold"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-xl px-4 pt-6">
        {sections.map((s, i) => (
          <Fragment key={s.id}>
            <section id={s.id} className="scroll-mt-28">
              {content[s.id]}
            </section>
            {i < sections.length - 1 && (
              <div className="py-3">
                <DownArrow />
              </div>
            )}
          </Fragment>
        ))}
      </main>
    </div>
  );
}
