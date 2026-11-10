"use client";

import { motion } from "framer-motion";
import { Mail, Sparkles, UserRound } from "lucide-react";
import { profile } from "@/constants";
import { Sketch, SectionTitle } from "@/components/ui/Sketch";
import { FloatIcon } from "@/components/ui/Doodles";


/** "About me": a short professional intro, then an invitation for recruiters. */
export function About() {
  const { story, closing } = profile.about;
  return (
    <Sketch fill="card" seed={31} className="p-6 sm:p-8">
      <FloatIcon icon={Sparkles} color="yellow" className="-right-5 -top-5" rotate={12} />
      <SectionTitle icon={UserRound} color="blue">
        About me
      </SectionTitle>
      <div className="space-y-3 text-[15px] leading-relaxed">
        {story.map((para, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            {para}
          </motion.p>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.4 }}
        className="mt-6 rounded-xl border-2 border-dashed border-ink bg-mint p-4"
      >
        <p className="font-hand text-2xl font-bold leading-none">{closing.title}</p>
        <p className="mt-1.5 text-sm leading-relaxed">{closing.text}</p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-3 inline-flex items-center gap-2 rounded-lg border-2 border-ink bg-card px-3 py-1.5 text-sm font-bold shadow-[2px_2px_0_var(--shadow)] transition hover:-translate-y-0.5"
        >
          <Mail size={15} aria-hidden /> {profile.email}
        </a>
      </motion.div>
    </Sketch>
  );
}
