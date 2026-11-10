"use client";

import { Fragment, useState, type ReactNode } from "react";
import { useSectionSpy } from "@/lib/useSectionSpy";
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
export function Story() {
  const [showNotice, setShowNotice] = useState(true);
  const { active, go, headerRef, navRef } = useSectionSpy();

  return (
    <div className="min-h-dvh overflow-x-clip pb-28">
      <a href="#story-main" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:border-2 focus:border-ink focus:bg-sun focus:px-3 focus:py-2 focus:text-sm focus:font-bold">
        Skip to content
      </a>
      <header ref={headerRef} className="sticky top-0 z-20 border-b-2 border-ink bg-paper/95 backdrop-blur">
        <div className="flex items-center gap-2.5 px-3.5 py-2.5">
          <div className="min-w-0">
            <p className="font-hand whitespace-nowrap pr-1.5 text-[26px] font-bold leading-none">{profile.name}</p>
            <p className="truncate text-[11px] text-muted">{profile.role}</p>
          </div>
          <ThemeToggle className="ml-auto !h-9 !w-9 shrink-0" />
        </div>
        <nav ref={navRef}aria-label="Sections" className="relative flex gap-2 overflow-x-auto px-4 pb-2.5 [scrollbar-width:none]">
          {sections.map((s) => {
            const Icon = sectionIcons[s.id];
            const on = s.id === active;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                data-id={s.id}
                onClick={(e) => go(e, s.id)}
                aria-current={on ? "location" : undefined}
                className={`flex shrink-0 items-center gap-1.5 rounded-full border-2 border-ink px-3 py-1 text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  on ? "bg-sun shadow-[2px_2px_0_var(--shadow)]" : "bg-card"
                }`}
              >
                <Icon size={13} aria-hidden />
                {s.label}
              </a>
            );
          })}
        </nav>
      </header>

      <main id="story-main" tabIndex={-1} aria-label={`${profile.name}'s portfolio`} className="mx-auto max-w-xl px-4 pt-6 outline-none">
        {showNotice && <BigScreenNotice variant="banner" onDismiss={() => setShowNotice(false)} />}
        {sections.map((s, i) => (
          <Fragment key={s.id}>
            <section id={s.id} tabIndex={-1} aria-label={s.label} className="scroll-mt-28 outline-none">
              {content[s.id]}
            </section>
            {i < sections.length - 1 && (
              <div className="py-3" aria-hidden>
                <DownArrow />
              </div>
            )}
          </Fragment>
        ))}
      </main>
    </div>
  );
}
