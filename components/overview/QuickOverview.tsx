"use client";

import { ArrowLeft } from "lucide-react";
import { profile } from "@/data/profile";
import { Sketch, Tag } from "@/components/ui/Sketch";
import { SocialLinks } from "@/components/sections/SocialLinks";
import { ResumeButton } from "@/components/sections/Contact";
import { ThemeToggle } from "@/lib/theme";

/** Plain-language, no-panning summary aimed at recruiters and HR. */
export function QuickOverview({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-dvh pb-28">
      <div className="mx-auto max-w-3xl px-4 py-6 sm:py-10">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-lg border-2 border-ink bg-card px-3 py-1.5 text-sm font-bold shadow-[2px_2px_0_var(--shadow)]"
          >
            <ArrowLeft size={16} aria-hidden /> Back to the whiteboard
          </button>
          <ThemeToggle />
        </div>

        <Sketch seed={5} className="p-6 sm:p-8">
          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/avatar.svg" alt={`${profile.name}, profile photo`} width={110} height={110} className="h-[110px] w-[110px] rounded-full border-2 border-ink object-cover" />
            <div>
              <h1 className="font-hand text-5xl font-bold leading-none">
                <span className="marker">{profile.name}</span>
              </h1>
              <p className="mt-2 text-lg font-semibold">
                {profile.role} · {profile.subtitle}
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{profile.bio}</p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <ResumeButton />
            <SocialLinks />
          </div>
        </Sketch>

        <h2 className="font-hand mt-10 mb-3 text-4xl font-bold">At a glance</h2>
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {profile.facts.map((f, i) => (
            <Sketch key={f.label} seed={80 + i} fill={(["yellow", "blue", "coral", "green"] as const)[i]} className="p-3">
              <dt className="text-xs font-semibold uppercase tracking-wide">{f.label}</dt>
              <dd className="font-hand text-2xl font-bold leading-tight">{f.value}</dd>
            </Sketch>
          ))}
        </dl>

        <h2 className="font-hand mt-10 mb-3 text-4xl font-bold">Career in plain English</h2>
        <ol className="space-y-3">
          {profile.experience.map((j) => (
            <li key={j.company} className="rounded-xl border-2 border-ink bg-card p-4">
              <p className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-bold">
                  {j.role}, <span className="text-muted">{j.company}</span>
                </span>
                <span className="font-hand text-xl text-muted">{j.period}</span>
              </p>
              <p className="mt-1 text-sm leading-relaxed">{j.plain}</p>
            </li>
          ))}
        </ol>

        <h2 className="font-hand mt-10 mb-3 text-4xl font-bold">What he&apos;s good at</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {profile.skills.map((s) => (
            <li key={s.id} className="rounded-xl border-2 border-ink p-4" style={{ background: `var(--${s.color})` }}>
              <p className="font-hand text-2xl font-bold leading-none">{s.title}</p>
              <p className="mb-2 text-sm">{s.plain}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.items.map((it) => (
                  <Tag key={it}>{it}</Tag>
                ))}
              </div>
            </li>
          ))}
        </ul>

        <h2 className="font-hand mt-10 mb-3 text-4xl font-bold">Highlights</h2>
        <ul className="space-y-2">
          {profile.projects.map((p) => (
            <li key={p.title} className="flex gap-2 text-[15px]">
              <span aria-hidden>★</span>
              <span>
                <b>{p.title}</b>: {p.blurb} <span className="text-muted">({p.impact})</span>
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-10 rounded-xl border-2 border-dashed border-ink p-4 text-center text-sm">
          Questions? Tap the chat bubble and ask anything about {profile.name.split(" ")[0]}&apos;s background.
        </p>
      </div>
    </div>
  );
}
