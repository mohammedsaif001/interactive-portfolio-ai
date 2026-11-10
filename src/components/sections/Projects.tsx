"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ExternalLink, Rocket, X, Zap } from "lucide-react";
import { profile } from "@/constants";
import type { Project } from "@/constants/types";
import { Sketch, SectionTitle, Tag } from "@/components/ui/Sketch";
import { TechChip } from "@/components/ui/TechChip";
import { CurvyArrow, FloatIcon } from "@/components/ui/Doodles";

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <Sketch seed={31} className="@container p-6 sm:p-8">
      <FloatIcon icon={Zap} color="yellow" className="-right-5 -top-5" rotate={12} />
      <CurvyArrow label="click one!" className="right-5 top-12" />
      <SectionTitle icon={Rocket} color="blue">
        Things I&apos;ve built
      </SectionTitle>
      <p className="-mt-2 mb-4 text-sm text-muted">Tap a project for the full case study.</p>
      {/* one column when narrow, two when the frame is resized wide (container query, so it follows the frame, not the screen) */}
      <div className="grid gap-5 @2xl:grid-cols-2">
        {profile.projects.map((p, i) => (
          <Sketch key={p.title} as="button" aria-haspopup="dialog" aria-label={`${p.title}: open case study`} onClick={() => setOpen(p)} fill={p.color} seed={40 + i} roughness={1.1} className="group block w-full cursor-pointer text-left transition hover:-translate-y-1 hover:rotate-[-0.4deg]">
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-hand text-3xl font-bold leading-none">{p.title}</h3>
                <ArrowRight size={20} aria-hidden className="transition group-hover:translate-x-1" />
              </div>
              <p className="mt-1.5 text-sm leading-relaxed">{p.blurb}</p>
              <p className="mt-2 text-sm font-bold">★ {p.impact}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
          </Sketch>
        ))}
      </div>
      <CaseStudy project={open} onClose={() => setOpen(null)} />
    </Sketch>
  );
}

/** Modal with the full write-up for one project. Closes on backdrop click, the X button or Escape. */
function CaseStudy({ project, onClose }: { project: Project | null; onClose: () => void }) {
  // false on the server and true in the browser, so the portal never renders during SSR
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const dialogRef = useRef<HTMLElement>(null);

  // Escape closes; Tab is kept inside the dialog; focus moves in on open and back to the card on close.
  useEffect(() => {
    if (!project) return;
    const opener = document.activeElement as HTMLElement | null;
    const focusables = () =>
      Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      opener?.focus?.();
    };
  }, [project, onClose]);

  if (!mounted) return null;

  // portal: the canvas is CSS-transformed, which would break `position: fixed`
  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={onClose}
        >
          <motion.article
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
            initial={{ y: 60, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", damping: 24, stiffness: 260 }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border-2 border-ink p-6 shadow-[6px_6px_0_var(--shadow)] sm:rounded-3xl sm:p-8"
            style={{ background: "var(--card)", color: "var(--ink)" }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-hand text-2xl text-muted">Case study</p>
                <h2 id="case-study-title" className="glow font-hand text-5xl font-bold leading-none">
                  <span className="marker">{project.title}</span>
                </h2>
                <p className="mt-2 text-sm font-semibold text-muted">{project.role}</p>
              </div>
              <button onClick={onClose} aria-label="Close case study" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border-2 border-ink hover:bg-sun">
                <X size={18} aria-hidden />
              </button>
            </div>

            <section aria-label="Built with" className="mt-6">
              <h3 className="font-hand text-3xl font-bold">Built with</h3>
              <ul className="mt-2 flex flex-wrap gap-2.5">
                {(project.stack ?? project.tags).map((tag) => (
                  <li key={tag}>
                    <TechChip name={tag} size="lg" />
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <section>
                <h3 className="font-hand text-3xl font-bold">The problem</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-muted">{project.problem}</p>
              </section>
              <section>
                <h3 className="font-hand text-3xl font-bold">What I did</h3>
                {project.approach.split("\n\n").map((para, i) => (
                  <p key={i} className="mt-1 text-[15px] leading-relaxed text-muted [&:not(:first-of-type)]:mt-3">
                    {para}
                  </p>
                ))}
              </section>
            </div>

            <h3 className="font-hand mt-6 text-3xl font-bold">How it fits together</h3>
            <ol className="mt-3 flex flex-wrap items-center gap-y-3">
              {project.architecture.map((step, i) => (
                <motion.li key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.12 }} className="flex items-center">
                  <span className="rounded-lg border-2 border-ink px-3 py-1.5 text-sm font-bold" style={{ background: `var(--${project.color})` }}>
                    {step}
                  </span>
                  {i < project.architecture.length - 1 && <ArrowRight size={18} className="mx-1.5 shrink-0 text-accent" aria-hidden />}
                </motion.li>
              ))}
            </ol>

            {project.href && (
              <div className="mt-6">
                <a href={project.href} target="_blank" rel="noreferrer" aria-label={`View ${project.title} (opens in a new tab)`} className="inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-coral px-4 py-2 text-sm font-bold shadow-[3px_3px_0_var(--shadow)] transition hover:-translate-y-0.5">
                  View project <ExternalLink size={15} aria-hidden />
                </a>
              </div>
            )}
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
