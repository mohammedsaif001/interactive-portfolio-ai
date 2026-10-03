"use client";

import { motion } from "framer-motion";
import { Compass, LayoutList } from "lucide-react";
import { profile } from "@/data/profile";
import { Sketch } from "@/components/ui/Sketch";

export function EntryScreen({ onExplore, onOverview, isDesktop }: { onExplore: () => void; onOverview: () => void; isDesktop: boolean }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.4 }}
      className="grid min-h-dvh place-items-center px-4 py-10"
    >
      <div className="w-full max-w-2xl text-center">
        <motion.p initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }} className="font-hand text-3xl text-muted">
          Welcome to my whiteboard
        </motion.p>
        <motion.h1
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="font-hand text-7xl font-bold leading-[0.9] sm:text-8xl"
        >
          <span className="marker">{profile.name}</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mx-auto mt-4 max-w-md text-lg text-muted">
          {profile.role} · {profile.subtitle}
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="mt-10 grid gap-5 sm:grid-cols-2"
        >
          <button onClick={onExplore} className="text-left transition hover:-translate-y-1">
            <Sketch fill="yellow" seed={91} className="p-5">
              <Compass size={28} aria-hidden />
              <p className="font-hand mt-2 text-3xl font-bold leading-none">{isDesktop ? "Explore the whiteboard" : "Take the tour"}</p>
              <p className="mt-1 text-sm">{isDesktop ? "Pan around my story, projects and skills." : "Scroll through my story, projects and skills."}</p>
            </Sketch>
          </button>
          <button onClick={onOverview} className="text-left transition hover:-translate-y-1">
            <Sketch fill="green" seed={92} className="p-5">
              <LayoutList size={28} aria-hidden />
              <p className="font-hand mt-2 text-3xl font-bold leading-none">Quick overview</p>
              <p className="mt-1 text-sm">Short on time? Everything on one simple page, plus my resume.</p>
            </Sketch>
          </button>
        </motion.div>
      </div>
    </motion.main>
  );
}
