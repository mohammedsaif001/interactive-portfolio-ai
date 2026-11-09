"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Compass, LayoutList } from "lucide-react";
import { profile } from "@/data/profile";
import { Sketch } from "@/components/ui/Sketch";
import { ProfilePhoto } from "@/components/ui/ProfilePhoto";
import { Typewriter } from "@/components/ui/Motion";
import { ThemeToggle } from "@/lib/theme";
import { BigScreenNotice } from "@/components/ui/BigScreenNotice";

// Lines of the fake terminal shown while the page "boots". Purely decorative.
const BOOT = [
  { text: 'portfolio --user "mohammed"', prompt: true },
  { text: "loading experience ........ done" },
  { text: "loading projects .......... done" },
  { text: "drawing the whiteboard .... done" },
  { text: "waking up the AI agent .... online" },
];

type Props = { onExplore: () => void; onOverview: () => void; isDesktop: boolean; onReady?: () => void };

export function EntryScreen({ onExplore, onOverview, isDesktop, onReady }: Props) {
  const [booted, setPhase] = useState<"boot" | "ready">("boot");
  const [lines, setLines] = useState(0);
  const reduced = useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  // Visitors who prefer reduced motion skip the boot sequence and go straight to the reveal.
  const phase = reduced ? "ready" : booted;

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setLines((n) => n + 1), 480);
    return () => clearInterval(id);
  }, [reduced]);

  // Tell the parent when the choice screen is showing, so it can quietly build the whiteboard behind it.
  useEffect(() => {
    if (phase === "ready") onReady?.();
  }, [phase, onReady]);

  useEffect(() => {
    if (phase === "boot" && lines > BOOT.length) {
      const t = setTimeout(() => setPhase("ready"), 450);
      return () => clearTimeout(t);
    }
  }, [lines, phase]);

  // The exit is a fade only. A scale-up exit made this full-screen element poke past the window edges,
  // which briefly made the page scrollable (scrollbars flashed in, then vanished and shifted the layout).
  return (
    <motion.main exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="relative grid min-h-dvh place-items-center overflow-hidden px-4 py-10">
      <ThemeToggle className="fixed right-4 top-4 z-10" />

      <AnimatePresence mode="wait">
        {phase === "boot" ? (
          <motion.section
            key="boot"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="w-full max-w-xl"
            aria-label="Loading portfolio"
          >
            <Sketch seed={3} className="p-5 sm:p-6">
              <div className="mb-4 flex gap-2" aria-hidden>
                <span className="h-3 w-3 rounded-full border-2 border-ink bg-coral" />
                <span className="h-3 w-3 rounded-full border-2 border-ink bg-sun" />
                <span className="h-3 w-3 rounded-full border-2 border-ink bg-mint" />
              </div>
              <ul className="min-h-[170px] space-y-1.5 font-mono text-sm sm:text-[15px]">
                {BOOT.slice(0, lines).map((l, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
                    <span className="text-accent">{l.prompt ? "$ " : "✔ "}</span>
                    {l.text}
                  </motion.li>
                ))}
                {lines <= BOOT.length && (
                  <li>
                    <span className="caret inline-block h-4 w-2 bg-current align-middle" aria-hidden />
                  </li>
                )}
              </ul>
            </Sketch>
            <button onClick={() => setPhase("ready")} className="mx-auto mt-5 block text-sm font-semibold text-muted underline-offset-4 hover:underline">
              Skip intro
            </button>
          </motion.section>
        ) : (
          <motion.section key="ready" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-2xl text-center">
            <motion.div initial={{ y: -16, opacity: 0, scale: 0.9 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ type: "spring", damping: 14, delay: 0.05 }} className="mb-6 flex justify-center">
              <ProfilePhoto size="md" />
            </motion.div>
            <motion.p initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="font-hand text-3xl text-muted">
              Welcome to my whiteboard
            </motion.p>
            <motion.h1
              initial={{ y: 24, opacity: 0, scale: 0.92 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", damping: 16 }}
              className="glow font-hand text-7xl font-bold leading-[0.9] sm:text-8xl"
            >
              <span className="marker">{profile.name}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-4 text-lg text-muted">
              {profile.role} · {profile.subtitle}
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="font-hand mt-1 h-9 text-3xl text-accent">
              <Typewriter words={profile.rotatingRoles} />
            </motion.p>

            {!isDesktop && (
              <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }} className="mt-8">
                <BigScreenNotice />
              </motion.div>
            )}

            <motion.div initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.75 }} className={`${isDesktop ? "mt-9" : "mt-0"} grid gap-5 sm:grid-cols-2`}>
              <button onClick={onExplore} autoFocus className="text-left transition hover:-translate-y-1">
                <Sketch fill="yellow" seed={91} className="p-5">
                  <Compass size={28} aria-hidden />
                  <p className="font-hand mt-2 text-3xl font-bold leading-none">{isDesktop ? "Explore the whiteboard" : "Continue on mobile"}</p>
                  <p className="mt-1 text-sm">{isDesktop ? "Pan around my work, projects and skills." : "Scroll through my work, projects and skills."}</p>
                </Sketch>
              </button>
              <button onClick={onOverview} className="text-left transition hover:-translate-y-1">
                <Sketch fill="green" seed={92} className="p-5">
                  <LayoutList size={28} aria-hidden />
                  <p className="font-hand mt-2 text-3xl font-bold leading-none">Quick overview</p>
                  <p className="mt-1 text-sm">Short on time? Everything on one simple page.</p>
                </Sketch>
              </button>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
