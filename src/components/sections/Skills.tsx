"use client";

import { useState } from "react";
import { Cloud, Cpu, Database, Monitor, Server, Sparkles, type LucideIcon } from "lucide-react";
import { profile } from "@/constants";
import type { SkillGroup } from "@/constants/types";
import { Sketch, SectionTitle } from "@/components/ui/Sketch";
import { TechChip } from "@/components/ui/TechChip";

type Id = SkillGroup["id"];

const icons: Record<Id, LucideIcon> = { frontend: Monitor, backend: Server, genai: Sparkles, data: Database, cloud: Cloud };

/** A short hand-drawn arrow with a travelling dot. Vertical by default; `horizontal` is used between side-by-side cards. */
function Link({ label, horizontal = false }: { label: string; horizontal?: boolean }) {
  return (
    <div className={`flex items-center justify-center gap-2 text-ink ${horizontal ? "flex-row sm:flex-col" : "flex-row py-1.5"}`} aria-hidden>
      <svg width="22" height="30" viewBox="0 0 22 30" fill="none" className={horizontal ? "sm:hidden" : ""}>
        <path d="M11 1v21" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="flow-line" />
        <path d="M4 18l7 9 7-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {horizontal && (
        <svg width="34" height="22" viewBox="0 0 34 22" fill="none" className="hidden sm:block">
          <path d="M1 11h24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="flow-line" />
          <path d="M20 4l10 7-10 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      <span className="font-hand text-lg font-bold leading-none opacity-70">{label}</span>
    </div>
  );
}

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
          <div className="p-4">
            <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
              <h3 className="glow font-hand flex items-center gap-2 text-3xl font-bold leading-none">
                <I size={22} aria-hidden />
                {s.title}
              </h3>
              <p className="text-xs opacity-70">{s.plain}</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
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

      {/* Layers, top to bottom: what people see, the engine and the AI beside it, the data, then the cloud under it all. */}
      <div>
        {card("frontend", 60)}
        <Link label="calls" />
        <div className="grid items-stretch gap-1 sm:grid-cols-[1fr_auto_1fr]">
          {card("backend", 61)}
          <Link label="prompts" horizontal />
          {card("genai", 62)}
        </div>
        <Link label="reads & writes" />
        {card("data", 63)}
        <Link label="all of it runs on" />
        {card("cloud", 64)}
      </div>

      <div className="mt-5 rounded-xl border-2 border-dashed border-ink p-4" aria-live="polite">
        <p className="font-hand text-2xl font-bold">
          In practice: <span className="marker">{group.title}</span>
        </p>
        <p className="mt-1 text-sm leading-relaxed">{group.built}</p>
      </div>
    </Sketch>
  );
}
