"use client";

import { Fragment, useState, type ReactNode } from "react";
import { LayoutList } from "lucide-react";
import { profile } from "@/data/profile";
import { sections, type SectionId } from "@/data/sections";
import { DownArrow } from "@/components/ui/Sketch";
import { ThemeToggle } from "@/lib/theme";
import { sectionIcons } from "@/lib/sectionIcons";
import { BigScreenNotice } from "@/components/ui/BigScreenNotice";
import { Intro } from "@/components/sections/Intro";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Recommendations } from "@/components/sections/Recommendations";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";

const content: Record<SectionId, ReactNode> = {
  intro: <Intro />,
  about: <About />,
  experience: <Experience />,
  projects: <Projects />,
  recs: <Recommendations />,
  skills: <Skills />,
  contact: <Contact />,
};

/** Mobile version of the whiteboard: same frames, stacked vertically with drawn arrows. */
export function Story({ onOverview }: { onOverview: () => void }) {
  const [showNotice, setShowNotice] = useState(true);
  return (
    <div className="min-h-dvh overflow-x-clip pb-28">
      <header className="sticky top-0 z-20 border-b-2 border-ink bg-paper/95 backdrop-blur">
        <div className="flex items-center gap-2.5 px-3.5 py-2.5">
          <p className="font-hand whitespace-nowrap text-2xl font-bold leading-none">{profile.name}</p>
          <ThemeToggle className="ml-auto !h-8 !w-8 shrink-0" />
          <button
            onClick={onOverview}
            className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border-2 border-ink bg-mint px-2.5 py-1.5 text-xs font-bold shadow-[2px_2px_0_var(--shadow)]"
          >
            <LayoutList size={14} aria-hidden /> Overview
          </button>
        </div>
        <nav aria-label="Sections" className="flex gap-2 overflow-x-auto px-4 pb-2.5 [scrollbar-width:none]">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="flex shrink-0 items-center gap-1.5 rounded-full border-2 border-ink bg-card px-3 py-1 text-xs font-bold"
            >
              {(() => {
                const Icon = sectionIcons[s.id];
                return <Icon size={13} aria-hidden />;
              })()}
              {s.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-xl px-4 pt-6">
        {showNotice && <BigScreenNotice variant="banner" onDismiss={() => setShowNotice(false)} />}
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
