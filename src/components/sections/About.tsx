"use client";

import { motion } from "framer-motion";
import { Brain, LayoutDashboard, Sparkles, UserRound, Users, type LucideIcon } from "lucide-react";
import { profile } from "@/data/profile";
import { Sketch, SectionTitle } from "@/components/ui/Sketch";
import { FloatIcon } from "@/components/ui/Doodles";

const icons: Record<string, LucideIcon> = { ai: Brain, frontend: LayoutDashboard, lead: Users };
const colors = ["coral", "blue", "green"] as const;

/** "About me": one short summary and three things a recruiter can scan in seconds. */
export function About() {
  const { summary, strengths } = profile.about;
  return (
    <Sketch fill="card" seed={31} className="p-6 sm:p-8">
      <FloatIcon icon={Sparkles} color="yellow" className="-right-5 -top-5" rotate={12} />
      <SectionTitle icon={UserRound} color="blue">
        About me
      </SectionTitle>
      <p className="text-[15px] leading-relaxed">{summary}</p>

      <ul className="mt-5 space-y-3">
        {strengths.map((s, i) => {
          const Icon = icons[s.icon] ?? Sparkles;
          return (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              className="flex items-center gap-3 rounded-xl border-2 border-ink p-3"
              style={{ background: `var(--${colors[i % 3]})` }}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-ink bg-card">
                <Icon size={20} aria-hidden />
              </span>
              <span>
                <span className="font-hand block text-2xl font-bold leading-none">{s.title}</span>
                <span className="text-sm leading-snug">{s.text}</span>
              </span>
            </motion.li>
          );
        })}
      </ul>
    </Sketch>
  );
}
