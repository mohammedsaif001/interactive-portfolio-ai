"use client";

import { useEffect, useRef, useState } from "react";
import { Cloud, Cpu, Database, Monitor, Server, Sparkles, type LucideIcon } from "lucide-react";
import { profile, type SkillGroup } from "@/data/profile";
import { Sketch, SectionTitle, Tag } from "@/components/ui/Sketch";

// Logical size of the diagram in px. It is drawn at this size and scaled to fit its container.
const W = 700;
const H = 580;
const NW = 190;
const NH = 176; // tall enough for a title, a caption and up to three rows of tags

const icons: Record<SkillGroup["id"], LucideIcon> = { frontend: Monitor, backend: Server, genai: Sparkles, data: Database, cloud: Cloud };

type Pos = { x: number; y: number };
const pos: Record<SkillGroup["id"], Pos> = {
  frontend: { x: 20, y: 24 },
  backend: { x: 255, y: 24 },
  genai: { x: 490, y: 24 },
  data: { x: 372, y: 240 },
  cloud: { x: 20, y: 446 },
};

// system flow: UI -> API -> LLM, API/LLM -> data store, everything runs on cloud
const flows = [
  { id: "f1", d: "M210 112 L253 112" },
  { id: "f2", d: "M445 112 L488 112" },
  { id: "f3", d: "M350 200 C350 228 440 224 460 238" },
  { id: "f4", d: "M585 200 C585 228 500 224 480 238" },
  { id: "f5", d: "M467 416 L467 444" },
];

/** Tracks an element's width so the diagram can scale, or fall back to a list, as the frame is resized. */
function useWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(el.offsetWidth));
    ro.observe(el);
    setW(el.offsetWidth);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

export function Skills() {
  const [ref, width] = useWidth();
  const [sel, setSel] = useState<SkillGroup["id"]>("genai");
  const group = profile.skills.find((s) => s.id === sel)!;
  // Below ~560px the diagram would shrink to unreadable text, so show a stacked flow instead.
  const wide = width >= 560;
  const scale = Math.min(1, width / W);

  return (
    <Sketch seed={51} className="p-6 sm:p-8">
      <SectionTitle icon={Cpu} color="green">
        What I work with
      </SectionTitle>
      <p className="-mt-2 mb-5 text-sm text-muted">My toolkit, drawn as the system I usually build. Tap a block to see what I&apos;ve built with it.</p>

      <div ref={ref} className="nopan nodrag">
        {wide ? (
          <div style={{ width: W * scale, height: H * scale }}>
            <div className="relative origin-top-left" style={{ width: W, height: H, transform: `scale(${scale})` }}>
              <svg aria-hidden width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 text-ink" fill="none">
                <defs>
                  <marker id="sk-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                    <path d="M1 1l8 4-8 4z" fill="currentColor" />
                  </marker>
                </defs>
                {flows.map((f, i) => (
                  <g key={f.id}>
                    <path id={f.id} d={f.d} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="flow-line wobble" markerEnd="url(#sk-arrow)" />
                    <circle r="5" fill="var(--accent)" stroke="currentColor" strokeWidth="1.5">
                      <animateMotion dur="2.2s" begin={`${i * 0.45}s`} repeatCount="indefinite">
                        <mpath href={`#${f.id}`} />
                      </animateMotion>
                    </circle>
                  </g>
                ))}
                <text x={pos.cloud.x + 8} y={pos.cloud.y - 8} className="font-hand" fontSize="22" fill="currentColor" opacity="0.7">
                  everything runs on ↓
                </text>
              </svg>

              {profile.skills.map((s, i) => {
                const p = pos[s.id];
                const isCloud = s.id === "cloud";
                const active = sel === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSel(s.id)}
                    aria-pressed={active}
                    className="absolute text-left transition-transform duration-200 hover:-translate-y-1"
                    style={{ left: p.x, top: p.y, width: isCloud ? 660 : NW, height: isCloud ? 120 : NH, transform: active ? "scale(1.04)" : undefined, zIndex: active ? 2 : 1 }}
                  >
                    <Sketch fill={s.color} seed={60 + i} roughness={1.2} className="h-full">
                      <div className="p-3.5">
                        <h3 className="glow font-hand flex items-center gap-2 text-3xl font-bold leading-none">
                          {(() => { const I = icons[s.id]; return <I size={22} aria-hidden />; })()}
                          {s.title}
                        </h3>
                        <p className="mb-2 text-xs opacity-70">{s.plain}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {s.items.map((it) => (
                            <Tag key={it}>{it}</Tag>
                          ))}
                        </div>
                      </div>
                    </Sketch>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            {profile.skills.map((s, i) => (
              <div key={s.id}>
                <Sketch as="button" onClick={() => setSel(s.id)} fill={s.color} seed={60 + i} className="block w-full text-left">
                  <div className="p-4">
                    <h3 className="font-hand flex items-center gap-2 text-3xl font-bold leading-none">
                      {(() => { const I = icons[s.id]; return <I size={22} aria-hidden />; })()}
                      {s.title}
                    </h3>
                    <p className="mb-2 text-xs opacity-70">{s.plain}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {s.items.map((it) => (
                        <Tag key={it}>{it}</Tag>
                      ))}
                    </div>
                  </div>
                </Sketch>
                {i < profile.skills.length - 1 && (
                  <svg aria-hidden width="24" height="30" viewBox="0 0 24 30" className="mx-auto block text-ink" fill="none">
                    <path d="M12 0v22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="flow-line" />
                    <path d="M5 18l7 9 7-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-5 rounded-xl border-2 border-dashed border-ink p-4" aria-live="polite">
        <p className="font-hand text-2xl font-bold">
          In practice: <span className="marker">{group.title}</span>
        </p>
        <p className="mt-1 text-sm leading-relaxed">{group.built}</p>
      </div>
    </Sketch>
  );
}
