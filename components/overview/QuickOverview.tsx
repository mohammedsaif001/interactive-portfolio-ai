"use client";

import type { ReactNode } from "react";
import { ArrowLeft, Download } from "lucide-react";
import { profile, sections, type SectionId } from "@/data/profile";
import { sectionIcons } from "@/lib/sectionIcons";
import { Sketch } from "@/components/ui/Sketch";
import { Intro } from "@/components/sections/Intro";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Recommendations } from "@/components/sections/Recommendations";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { ThemeToggle } from "@/lib/theme";
import { DoodleAvatar } from "@/components/ui/DoodleAvatar";

// The overview renders the very same sections, in the same order and from the same data, as the
// whiteboard. It just lays them out as one calm column (plus a plain-English line per job).
const content: Record<SectionId, ReactNode> = {
  intro: <Intro />,
  about: <About />,
  experience: <Experience showPlain />,
  projects: <Projects />,
  recs: <Recommendations />,
  skills: <Skills />,
  contact: <Contact />,
};

const tints = ["yellow", "blue", "coral", "green"] as const;

/** Plain-language, no-panning version of the whiteboard, aimed at recruiters and HR. */
export function QuickOverview({ onBack }: { onBack: () => void }) {
  return (
    // overflow-x-clip (not hidden): shadows and floating icons can never cause sideways scrolling,
    // and unlike `hidden` it does not create a scroll container, so the sticky header keeps working.
    <div className="min-h-dvh overflow-x-clip pb-28">
      <header className="sticky top-0 z-30 border-b-2 border-ink bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5">
          <button onClick={onBack} aria-label="Back to the interactive version" className="flex h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border-2 border-ink bg-card px-3 text-sm font-bold shadow-[3px_3px_0_var(--shadow)]">
            <ArrowLeft size={16} aria-hidden /> <span className="hidden sm:inline">Interactive</span>
          </button>

          <DoodleAvatar size={46} />
          <div className="min-w-0 flex-1 xl:flex-none xl:shrink-0">
            <p className="glow font-hand truncate text-3xl font-bold leading-none">{profile.name}</p>
            <p className="hidden truncate text-xs text-muted sm:block xl:whitespace-nowrap">
              {profile.role} · Quick overview
            </p>
          </div>

          <nav aria-label="Page sections" className="ml-auto hidden items-center gap-1.5 xl:flex">
            {sections.map((s) => {
              const Icon = sectionIcons[s.id];
              return (
                <a key={s.id} href={`#${s.id}`} className="flex items-center gap-1.5 whitespace-nowrap rounded-full border-2 border-transparent px-3 py-1 text-sm font-bold hover:border-ink hover:bg-sun">
                  <Icon size={14} aria-hidden /> {s.label}
                </a>
              );
            })}
          </nav>

          {profile.resumeHref && (
            <a href={profile.resumeHref} download className="flex h-10 items-center gap-2 rounded-xl border-2 border-ink bg-coral px-3 text-sm font-bold shadow-[3px_3px_0_var(--shadow)]">
              <Download size={16} aria-hidden /> <span className="hidden sm:inline">Resume</span>
            </a>
          )}
          <ThemeToggle className="max-xl:ml-auto" />
        </div>

        <nav aria-label="Page sections" className="flex gap-2 overflow-x-auto px-4 pb-2.5 [scrollbar-width:none] xl:hidden">
          {sections.map((s) => {
            const Icon = sectionIcons[s.id];
            return (
              <a key={s.id} href={`#${s.id}`} className="flex shrink-0 items-center gap-1.5 rounded-full border-2 border-ink bg-card px-3 py-1 text-xs font-bold">
                <Icon size={13} aria-hidden /> {s.label}
              </a>
            );
          })}
        </nav>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        {sections.map((s, i) => (
          <section key={s.id} id={s.id} className={`scroll-mt-32 ${i === 0 ? "" : "mt-14"}`}>
            {content[s.id]}
            {s.id === "intro" && (
              <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {profile.facts.map((f, k) => (
                  <Sketch key={f.label} seed={80 + k} fill={tints[k % 4]} className="p-4 text-center">
                    <dt className="text-xs font-semibold uppercase tracking-wide opacity-70">{f.label}</dt>
                    <dd className="font-hand mt-1 text-3xl font-bold leading-none">{f.value}</dd>
                  </Sketch>
                ))}
              </dl>
            )}
          </section>
        ))}

        <p className="mt-10 rounded-xl border-2 border-dashed border-ink p-4 text-center text-sm">
          Questions? Tap the chat bubble and ask anything about {profile.name.split(" ")[0]}&apos;s background.
        </p>
      </main>
    </div>
  );
}
