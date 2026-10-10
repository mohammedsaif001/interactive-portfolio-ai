"use client";

import { motion } from "framer-motion";
import { Briefcase, Trophy } from "lucide-react";
import { profile } from "@/data/profile";
import { Sketch, SectionTitle } from "@/components/ui/Sketch";
import { CountUp } from "@/components/ui/Motion";
import { FloatIcon } from "@/components/ui/Doodles";

export function Experience() {
  return (
    <Sketch seed={21} className="p-6 sm:p-8">
      <FloatIcon icon={Trophy} color="coral" className="-right-5 -top-5" rotate={10} />
      <SectionTitle icon={Briefcase} color="yellow">
        Where I&apos;ve worked
      </SectionTitle>
      <ol className="relative ml-3 border-l-[3px] border-dashed border-ink/60 pl-6">
        {profile.experience.map((job, i) => (
          <motion.li
            key={job.company}
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            className="relative pb-7 last:pb-0"
          >
            <span className="absolute -left-[37px] top-1 h-5 w-5 rounded-full border-2 border-ink" style={{ background: i === 0 ? "var(--coral)" : "var(--card)" }}>
              {i === 0 && <span className="ping-soft absolute inset-0 rounded-full bg-coral" />}
            </span>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-hand text-xl text-muted">{job.period}</p>
                <h3 className="text-lg font-bold leading-tight">{job.role}</h3>
                <p className="font-semibold text-muted">{job.company}</p>
              </div>
              <div className="shrink-0 rotate-2 rounded-lg border-2 border-ink px-2.5 py-1 text-center" style={{ background: "var(--yellow)" }}>
                <p className="font-hand text-3xl font-bold leading-none">
                  <CountUp value={job.stat.value} suffix={job.stat.suffix} />
                </p>
                <p className="text-[10px] font-semibold leading-tight">{job.stat.label}</p>
              </div>
            </div>
            <ul className="mt-2 space-y-1 text-sm leading-relaxed">
              {job.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span aria-hidden className="text-accent">
                    ✦
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
    </Sketch>
  );
}
