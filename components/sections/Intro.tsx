"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Brain, Code2, MapPin, Rocket, UserRound } from "lucide-react";
import { profile } from "@/data/profile";
import { Sketch } from "@/components/ui/Sketch";
import { FloatIcon } from "@/components/ui/Doodles";
import { CountUp, Typewriter } from "@/components/ui/Motion";
import { SocialLinks } from "./SocialLinks";

function Sparkle({ className, size = 28 }: { className: string; size?: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" className={`float absolute ${className}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l3.5 3.5M15.5 15.5L19 19M19 5l-3.5 3.5M8.5 15.5L5 19" />
    </svg>
  );
}

export function Intro() {
  return (
    <Sketch fill="card" seed={11} className="p-6 sm:p-8">
      <FloatIcon icon={Rocket} color="coral" className="-right-5 -top-5" rotate={12} />
      <FloatIcon icon={Code2} color="blue" className="-left-5 -top-5" rotate={-10} />
      <FloatIcon icon={Brain} color="green" className="-bottom-5 -right-3" rotate={8} />
      <Sparkle className="-left-4 bottom-28 text-accent" size={22} />

      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <div className="relative shrink-0 -rotate-3">
          <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2" />
          <div className="border-2 border-ink bg-white p-2 pb-8 shadow-[4px_4px_0_var(--shadow)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/avatar.svg" alt={`${profile.name}, profile photo`} width={150} height={150} className="block h-[150px] w-[150px] object-cover" />
          </div>
          <span className="font-hand absolute bottom-1 left-0 right-0 text-center text-xl text-[#1f2430]">that&apos;s me!</span>
          <span aria-hidden className="absolute -bottom-3 -right-3 grid h-9 w-9 place-items-center rounded-full border-2 border-ink bg-mint shadow-[2px_2px_0_var(--shadow)]">
            <BadgeCheck size={20} />
          </span>
        </div>

        <div className="text-center sm:text-left">
          <p className="font-hand flex items-center justify-center gap-2 text-2xl text-muted sm:justify-start">
            <UserRound size={22} aria-hidden /> Hi, I&apos;m
          </p>
          <h1 className="glow font-hand relative text-6xl font-bold leading-[0.95]">
            <span className="marker">{profile.name}</span>
            <svg aria-hidden viewBox="0 0 300 14" className="absolute -bottom-3 left-0 hidden h-3 w-full text-accent sm:block" preserveAspectRatio="none" fill="none">
              <motion.path
                d="M2 9c40-8 80 4 120-2s90-6 176 0"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.8, duration: 0.9 }}
              />
            </svg>
          </h1>
          <p className="mt-4 text-lg font-semibold">
            {profile.role} <span className="text-muted">· {profile.subtitle}</span>
          </p>
          <p className="font-hand mt-1 h-8 text-3xl text-accent">
            <Typewriter words={profile.rotatingRoles} />
          </p>
          <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted">{profile.tagline}</p>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-mint px-3 py-1 text-xs font-bold">
              <span className="relative flex h-2.5 w-2.5">
                <span className="ping-soft absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              Open to opportunities
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium">
              <MapPin size={15} aria-hidden /> {profile.location}
            </span>
          </div>
          <div className="mt-4 flex justify-center sm:justify-start">
            <SocialLinks />
          </div>
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-3 border-t-2 border-dashed border-ink/40 pt-5 sm:grid-cols-4">
        {profile.stats.map((s) => (
          <div key={s.label} className="text-center">
            <dt className="sr-only">{s.label}</dt>
            <dd className="glow font-hand text-5xl font-bold leading-none">
              <CountUp value={s.value} suffix={s.suffix} />
            </dd>
            <p className="mt-1 text-xs font-medium leading-tight text-muted">{s.label}</p>
          </div>
        ))}
      </dl>
    </Sketch>
  );
}
