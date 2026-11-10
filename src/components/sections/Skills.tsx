"use client";

import { useState } from "react";
import { Cloud, Cpu, Database, Monitor, Server, Sparkles, type LucideIcon } from "lucide-react";
import { profile } from "@/constants";
import type { SkillGroup } from "@/constants/types";
import { Sketch, SectionTitle } from "@/components/ui/Sketch";
import { TechChip } from "@/components/ui/TechChip";

type Id = SkillGroup["id"];

const icons: Record<Id, LucideIcon> = { frontend: Monitor, backend: Server, genai: Sparkles, data: Database, cloud: Cloud };

/** Small down arrow with a handwritten caption. Only used on narrow screens, where the cards stack in one column. */
function Link({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-2 text-ink sm:hidden" aria-hidden>
      <svg width="22" height="30" viewBox="0 0 22 30" fill="none">
        <path d="M11 1v21" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="flow-line" />
        <path d="M4 18l7 9 7-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-hand text-xl font-bold leading-none opacity-75">{label}</span>
    </div>
  );
}

const ArrowDown = () => (
  <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden className="absolute -bottom-px left-1/2 -translate-x-1/2 text-ink">
    <path d="M1 1l8 9 8-9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const caption = "font-hand absolute whitespace-nowrap rounded-full bg-card px-2 text-lg font-bold leading-6";

export function Skills() {
  const [sel, setSel] = useState<Id>("genai");
  const group = profile.skills.find((s) => s.id === sel)!;
  const get = (id: Id) => profile.skills.find((s) => s.id === id)!;

  const card = (id: Id, seed: number) => {
    const s = get(id);
    const I = icons[id];
    const active = sel === id;
    return (
      <button
        key={id}
        type="button"
        onClick={() => setSel(id)}
        aria-pressed={active}
        className="block h-full w-full text-left transition-transform duration-200 hover:-translate-y-1"
        style={{ transform: active ? "scale(1.02)" : undefined }}
      >
        <Sketch fill={s.color} seed={seed} roughness={1.2} className="h-full">
          <div className={`p-4 ${id === "cloud" ? "sm:flex sm:items-center sm:justify-between sm:gap-5 sm:py-3" : ""}`}>
            <div className={id === "cloud" ? "mb-3 sm:mb-0 sm:shrink-0" : "mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-0.5"}>
              <h3 className="glow font-hand flex items-center gap-2 text-3xl font-bold leading-none">
                <I size={22} aria-hidden />
                {s.title}
              </h3>
              <p className={`text-xs opacity-70 ${id === "cloud" ? "mt-1" : ""}`}>{s.plain}</p>
            </div>
            <div className={`flex flex-wrap gap-1.5 ${id === "cloud" ? "sm:justify-end" : ""}`}>
              {s.items.map((it) => (
                <TechChip key={it} name={it} />
              ))}
            </div>
          </div>
        </Sketch>
      </button>
    );
  };

  return (
    <Sketch seed={51} className="p-6 sm:p-8">
      <SectionTitle icon={Cpu} color="green">
        What I work with
      </SectionTitle>
      <p className="-mt-2 mb-5 text-sm text-muted">My toolkit, drawn as the system I usually build. Tap a block to see what I&apos;ve built with it.</p>

      {/* Two columns, three rows, so the frame stays compact. Reads like the system it describes: the screens
          call the backend, the backend fans out to the AI layer and the data layer, and it all runs on the cloud.
          The gap between columns is 56px (sm:gap-x-14); the connector offsets below are derived from it. */}
      <div>
        <div className="relative grid grid-cols-1 sm:grid-cols-2 sm:gap-x-14">
          {card("frontend", 60)}
          <Link label="calls the API" />
          {card("backend", 61)}
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-ink sm:block">
            <span className={`${caption} -top-7 left-1/2 -translate-x-1/2`}>calls the API</span>
            <svg width="40" height="22" viewBox="0 0 40 22" fill="none">
              <path d="M2 11h30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="flow-line" />
              <path d="M26 3l10 8-10 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* fork: from the backend (right column) down into the data card, and across and down into the AI card */}
        <div aria-hidden className="relative hidden h-20 sm:block">
          <span className="absolute inset-y-0 w-0 border-l-[3px] border-ink" style={{ left: "calc(75% + 14px)" }}>
            <ArrowDown />
            <span className={`${caption} left-3 top-11`}>reads &amp; writes</span>
          </span>
          <span className="absolute top-1/3 border-t-[3px] border-ink" style={{ left: "calc(25% - 14px)", right: "calc(25% - 14px)" }} />
          <span className="absolute bottom-0 top-1/3 w-0 border-l-[3px] border-ink" style={{ left: "calc(25% - 14px)" }}>
            <ArrowDown />
            <span className={`${caption} left-3 top-3`}>asks the AI</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-14">
          <Link label="asks the AI" />
          {card("genai", 62)}
          <Link label="reads & writes" />
          {card("data", 63)}
        </div>

        <p className="font-hand my-3 flex items-center gap-3 text-xl font-bold opacity-75" aria-hidden>
          <span className="h-0 flex-1 border-t-2 border-dashed border-ink/40" />
          all of it runs on
          <span className="h-0 flex-1 border-t-2 border-dashed border-ink/40" />
        </p>

        {card("cloud", 64)}
      </div>

      {/* the readout for whichever block is selected above: its own strip, not part of the diagram */}
      <div className="mt-5 rounded-xl border-2 border-dashed border-ink p-4" aria-live="polite">
        <p className="font-hand text-2xl font-bold leading-none">
          In practice: <span className="marker">{group.title}</span>
        </p>
        <p className="mt-1.5 text-sm leading-relaxed">{group.built}</p>
        <p className="mt-1 text-xs text-muted">Tap any block above to see what I&apos;ve built with it.</p>
      </div>
    </Sketch>
  );
}
