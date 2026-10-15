"use client";

import { ArrowLeft, Briefcase, Cpu, Download, Heart, Rocket, Send, Sparkles, UserRound, type LucideIcon } from "lucide-react";
import { profile, type Metric } from "@/data/profile";
import { Sketch, SectionTitle, Tag } from "@/components/ui/Sketch";
import { CountUp } from "@/components/ui/Motion";
import { FloatIcon } from "@/components/ui/Doodles";
import { SocialLinks } from "@/components/sections/SocialLinks";
import { Contact } from "@/components/sections/Contact";
import { ThemeToggle } from "@/lib/theme";

// Anchor links shown in the sticky header (and as a scrolling chip row on smaller screens).
const nav: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "about", label: "About", icon: UserRound },
  { id: "career", label: "Career", icon: Briefcase },
  { id: "skills", label: "Skills", icon: Cpu },
  { id: "work", label: "Highlights", icon: Rocket },
  { id: "words", label: "Kind words", icon: Heart },
  { id: "contact", label: "Contact", icon: Send },
];

/** Plain-language, no-panning summary aimed at recruiters and HR. */
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

          <div className="min-w-0 flex-1 xl:flex-none xl:shrink-0">
            <p className="glow font-hand truncate text-3xl font-bold leading-none">{profile.name}</p>
            <p className="hidden truncate text-xs text-muted sm:block xl:whitespace-nowrap">
              {profile.role} · Quick overview
            </p>
          </div>

          <nav aria-label="Page sections" className="ml-auto hidden items-center gap-1.5 xl:flex">
            {nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="flex items-center gap-1.5 whitespace-nowrap rounded-full border-2 border-transparent px-3 py-1 text-sm font-bold hover:border-ink hover:bg-sun">
                <n.icon size={14} aria-hidden /> {n.label}
              </a>
            ))}
          </nav>

          <a href={profile.resumeHref} download className="flex h-10 items-center gap-2 rounded-xl border-2 border-ink bg-coral px-3 text-sm font-bold shadow-[3px_3px_0_var(--shadow)]">
            <Download size={16} aria-hidden /> <span className="hidden sm:inline">Resume</span>
          </a>
          <ThemeToggle />
        </div>

        <nav aria-label="Page sections" className="flex gap-2 overflow-x-auto px-4 pb-2.5 [scrollbar-width:none] xl:hidden">
          {nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="flex shrink-0 items-center gap-1.5 rounded-full border-2 border-ink bg-card px-3 py-1 text-xs font-bold">
              <n.icon size={13} aria-hidden /> {n.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        {/* About */}
        <section id="about" className="scroll-mt-32">
          <Sketch seed={5} className="p-6 sm:p-8">
            <FloatIcon icon={Sparkles} color="yellow" className="-right-4 -top-5" rotate={12} />
            <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/avatar.svg" alt={`${profile.name}, profile photo`} width={130} height={130} className="h-[130px] w-[130px] shrink-0 rounded-full border-2 border-ink object-cover shadow-[4px_4px_0_var(--shadow)]" />
              <div>
                <h1 className="glow font-hand text-5xl font-bold leading-none sm:text-6xl">
                  <span className="marker">{profile.name}</span>
                </h1>
                <p className="mt-2 text-lg font-semibold">
                  {profile.role} · {profile.subtitle}
                </p>
                <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted">{profile.bio}</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <SocialLinks />
            </div>
          </Sketch>

          <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {profile.stats.map((s, i) => (
              <Sketch key={s.label} seed={80 + i} fill={(["yellow", "blue", "coral", "green"] as const)[i]} className="p-4 text-center">
                <dd className="glow font-hand text-5xl font-bold leading-none">
                  <CountUp value={s.value} suffix={s.suffix} />
                </dd>
                <dt className="mt-1 text-xs font-semibold leading-tight">{s.label}</dt>
              </Sketch>
            ))}
          </dl>
        </section>

        {/* Career */}
        <section id="career" className="mt-14 scroll-mt-32">
          <SectionTitle icon={Briefcase} color="yellow">
            Career in plain English
          </SectionTitle>
          <ol className="space-y-4">
            {profile.experience.map((j) => (
              <li key={j.company} className="rounded-2xl border-2 border-ink bg-card p-5 shadow-[4px_4px_0_var(--shadow)] transition hover:-translate-y-0.5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-lg font-bold">
                    {j.role}, <span className="text-muted">{j.company}</span>
                  </p>
                  <span className="font-hand text-2xl text-muted">{j.period}</span>
                </div>
                <p className="mt-1 text-[15px] leading-relaxed">{j.plain}</p>
                <p className="mt-2 inline-flex items-center gap-2 rounded-full border-2 border-ink px-3 py-0.5 text-xs font-bold" style={{ background: "var(--yellow)" }}>
                  <CountUp value={j.stat.value} suffix={j.stat.suffix} /> {j.stat.label}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Skills */}
        <section id="skills" className="mt-14 scroll-mt-32">
          <SectionTitle icon={Cpu} color="green">
            What he&apos;s good at
          </SectionTitle>
          <ul className="grid gap-4 sm:grid-cols-2">
            {profile.skills.map((s) => (
              <li key={s.id} className="rounded-2xl border-2 border-ink p-5 shadow-[4px_4px_0_var(--shadow)] transition hover:-translate-y-0.5" style={{ background: `var(--${s.color})` }}>
                <p className="font-hand text-3xl font-bold leading-none">{s.title}</p>
                <p className="mb-3 text-sm opacity-80">{s.plain}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.items.map((it) => (
                    <Tag key={it}>{it}</Tag>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Highlights */}
        <section id="work" className="mt-14 scroll-mt-32">
          <SectionTitle icon={Rocket} color="blue">
            Highlights
          </SectionTitle>
          <ul className="grid gap-4 md:grid-cols-3">
            {profile.projects.map((p) => (
              <li key={p.title} className="flex flex-col rounded-2xl border-2 border-ink p-5 shadow-[4px_4px_0_var(--shadow)] transition hover:-translate-y-0.5" style={{ background: `var(--${p.color})` }}>
                <p className="glow font-hand text-5xl font-bold leading-none">
                  <CountUp value={(p.metrics[0] as Metric).value} prefix={(p.metrics[0] as Metric).prefix} suffix={(p.metrics[0] as Metric).suffix} />
                </p>
                <p className="text-xs font-semibold">{(p.metrics[0] as Metric).label}</p>
                <h3 className="font-hand mt-3 text-3xl font-bold leading-none">{p.title}</h3>
                <p className="mt-1 flex-1 text-sm leading-relaxed">{p.blurb}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 3).map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Kind words */}
        <section id="words" className="mt-14 scroll-mt-32">
          <SectionTitle icon={Heart} color="coral">
            Kind words
          </SectionTitle>
          <ul className="grid gap-4 md:grid-cols-3">
            {profile.recommendations.map((r, i) => (
              <li key={i} className="sticky border-2 border-ink p-5" style={{ background: `var(--${(["yellow", "coral", "green"] as const)[i % 3]})` }}>
                <blockquote className="font-hand text-[26px] leading-[1.1]">&ldquo;{r.quote}&rdquo;</blockquote>
                <p className="mt-3 text-sm font-semibold">
                  {r.name} <span className="font-normal">· {r.title}</span>
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Contact */}
        <section id="contact" className="mt-14 scroll-mt-32">
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-11 w-11 -rotate-6 place-items-center rounded-full border-2 border-ink shadow-[3px_3px_0_var(--shadow)]" style={{ background: "var(--coral)" }}>
              <Send size={22} aria-hidden />
            </span>
            <h2 className="glow font-hand text-4xl font-bold leading-none">Get in touch</h2>
          </div>
          <Contact hideTitle />
        </section>

        <p className="mt-10 rounded-xl border-2 border-dashed border-ink p-4 text-center text-sm">
          Questions? Tap the chat bubble and ask anything about {profile.name.split(" ")[0]}&apos;s background.
        </p>
      </main>
    </div>
  );
}
