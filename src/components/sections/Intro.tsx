"use client";

import { motion } from "framer-motion";
import { Brain, Code2, MapPin, Rocket, UserRound } from "lucide-react";
import { profile } from "@/constants";
import { Sketch } from "@/components/ui/Sketch";
import { FloatIcon } from "@/components/ui/Doodles";
import { Typewriter } from "@/components/ui/Motion";
import { TechChip } from "@/components/ui/TechChip";
import { ProfilePhoto } from "@/components/ui/ProfilePhoto";
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
        <ProfilePhoto size="lg" />

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

      <div className="mt-6 border-t-2 border-dashed border-ink/40 pt-4">
        <p className="font-hand text-2xl leading-none text-muted">I work with</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {/* every skill from the skills data, so this row can never drift from the Skills frame */}
          {[...new Set(profile.skills.flatMap((g) => g.items))].map((t) => (
            <li key={t}>
              <TechChip name={t} />
            </li>
          ))}
        </ul>
      </div>
    </Sketch>
  );
}
