"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  Background,
  BackgroundVariant,
  Controls,
  getBezierPath,
  Handle,
  MarkerType,
  MiniMap,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  type Edge,
  type EdgeProps,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { LayoutList } from "lucide-react";
import { profile, sections, type SectionId } from "@/data/profile";
import { ThemeToggle } from "@/lib/theme";
import { Intro } from "@/components/sections/Intro";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Recommendations } from "@/components/sections/Recommendations";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";

const content: Record<SectionId, ReactNode> = {
  intro: <Intro />,
  experience: <Experience />,
  projects: <Projects />,
  recs: <Recommendations />,
  skills: <Skills />,
  contact: <Contact />,
};

const widths: Record<SectionId, number> = { intro: 720, experience: 540, projects: 520, recs: 460, skills: 760, contact: 560 };
// Approximate rendered heights, only so the minimap can draw frames; real sizes are measured by React Flow.
const heights: Record<SectionId, number> = { intro: 470, experience: 700, projects: 660, recs: 581, skills: 780, contact: 297 };

const hidden = { opacity: 0, pointerEvents: "none" as const, width: 1, height: 1 };

// A node is one whiteboard "frame". Hidden handles on every side let edges attach anywhere.
function FrameNode({ data }: NodeProps<Node<{ id: SectionId }>>) {
  return (
    <div className="pointer-events-auto" style={{ width: widths[data.id] }}>
      <Handle id="tl" type="target" position={Position.Left} style={hidden} />
      <Handle id="tt" type="target" position={Position.Top} style={hidden} />
      <Handle id="tr" type="target" position={Position.Right} style={hidden} />
      <Handle id="sr" type="source" position={Position.Right} style={hidden} />
      <Handle id="sb" type="source" position={Position.Bottom} style={hidden} />
      <Handle id="sl" type="source" position={Position.Left} style={hidden} />
      {content[data.id]}
    </div>
  );
}

// A dotted, hand-drawn edge: dashes flow along it, glowing "data packets" ride it, and a handwritten label sits on top.
function FlowEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, markerEnd, style, data }: EdgeProps) {
  const [path, lx, ly] = getBezierPath({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition });
  const label = (data as { label?: string } | undefined)?.label;
  return (
    <>
      <BaseEdge id={id} path={path} markerEnd={markerEnd} style={style} />
      {[0, 0.9, 1.8].map((begin, k) => (
        <circle key={begin} className="packet" r={7 - k * 1.5} fill="var(--accent)" stroke="var(--ink)" strokeWidth={2} opacity={1 - k * 0.25}>
          <animateMotion dur="2.7s" begin={`${begin}s`} repeatCount="indefinite" path={path} />
        </circle>
      ))}
      {label && (
        <EdgeLabelRenderer>
          <div
            className="nodrag nopan font-hand pointer-events-none absolute -rotate-3 whitespace-nowrap rounded-full border-2 border-ink bg-card px-3 py-0.5 text-2xl font-bold shadow-[2px_2px_0_var(--shadow)]"
            style={{ transform: `translate(-50%, -50%) translate(${lx}px, ${ly}px) rotate(-3deg)` }}
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

const nodeTypes = { frame: FrameNode };
const edgeTypes = { flow: FlowEdge };

// Reading path snakes: intro -> experience -> projects, down to kind words, left to skills, left to contact.
const positions: Record<SectionId, { x: number; y: number }> = {
  intro: { x: 0, y: 0 },
  experience: { x: 880, y: -110 },
  projects: { x: 1560, y: -110 },
  recs: { x: 1590, y: 920 },
  skills: { x: 730, y: 800 },
  contact: { x: 0, y: 760 },
};

const nodes: Node[] = sections.map((s) => ({
  id: s.id,
  type: "frame",
  position: positions[s.id],
  data: { id: s.id },
  initialWidth: widths[s.id],
  initialHeight: heights[s.id],
  draggable: false,
  selectable: false,
}));

const edge = (id: string, source: SectionId, sh: string, target: SectionId, th: string, label: string): Edge => ({
  id,
  source,
  sourceHandle: sh,
  target,
  targetHandle: th,
  type: "flow",
  data: { label },
  style: { strokeWidth: 3, strokeDasharray: "2 9", strokeLinecap: "round" },
  markerEnd: { type: MarkerType.ArrowClosed, width: 22, height: 22 },
});

const edges: Edge[] = [
  edge("e1", "intro", "sr", "experience", "tl", "my story"),
  edge("e2", "experience", "sr", "projects", "tl", "what I built"),
  edge("e3", "projects", "sb", "recs", "tt", "what people say"),
  edge("e4", "recs", "sl", "skills", "tr", "how I do it"),
  edge("e5", "skills", "sl", "contact", "tr", "let's talk"),
];

const miniColors = ["var(--yellow)", "var(--blue)", "var(--coral)", "var(--green)"];

function Board({ onOverview }: { onOverview: () => void }) {
  const rf = useReactFlow();
  const [active, setActive] = useState<SectionId>("intro");

  const flyTo = useCallback(
    (id: SectionId) => {
      setActive(id);
      rf.fitView({ nodes: [{ id }], duration: 900, padding: 0.12, maxZoom: 1.1 });
    },
    [rf],
  );

  // fit the intro once the nodes have been measured
  useEffect(() => {
    const t = setTimeout(() => rf.fitView({ nodes: [{ id: "intro" }], duration: 0, padding: 0.3, maxZoom: 1 }), 80);
    return () => clearTimeout(t);
  }, [rf]);

  return (
    <div className="fixed inset-0">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        minZoom={0.15}
        maxZoom={1.6}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnScroll
        zoomOnScroll={false}
        zoomOnPinch
        panOnDrag
        proOptions={{ hideAttribution: true }}
      >
        {/* two grid layers give the board some depth */}
        <Background id="fine" variant={BackgroundVariant.Dots} gap={22} size={1.4} color="var(--grid)" />
        <Background id="coarse" variant={BackgroundVariant.Lines} gap={176} lineWidth={1} color="var(--grid)" style={{ opacity: 0.55 }} />
        <Controls showInteractive={false} position="top-left" style={{ marginTop: 84 }} />
        <MiniMap
          pannable
          zoomable
          position="bottom-left"
          nodeStrokeColor="var(--ink)"
          nodeStrokeWidth={6}
          nodeColor={(n) => miniColors[sections.findIndex((s) => s.id === n.id) % 4]}
          maskColor="color-mix(in srgb, var(--paper) 70%, transparent)"
          style={{ width: 170, height: 110 }}
        />
      </ReactFlow>

      {/* top bar */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-4">
        <div className="pointer-events-auto rounded-xl border-2 border-ink bg-card px-4 py-2 shadow-[3px_3px_0_var(--shadow)]">
          <p className="glow font-hand text-2xl font-bold leading-none">{profile.name}</p>
          <p className="text-xs text-muted">{profile.role}</p>
        </div>

        <nav aria-label="Sections" className="pointer-events-auto hidden flex-wrap justify-center gap-2 lg:flex">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => flyTo(s.id)}
              aria-current={active === s.id}
              className={`rounded-full border-2 border-ink px-4 py-1.5 text-sm font-bold shadow-[2px_2px_0_var(--shadow)] transition hover:-translate-y-0.5 ${active === s.id ? "bg-sun" : "bg-card"}`}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <div className="pointer-events-auto flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={onOverview}
            className="flex h-10 items-center gap-2 rounded-xl border-2 border-ink bg-mint px-4 text-sm font-bold shadow-[3px_3px_0_var(--shadow)] transition hover:-translate-y-0.5"
          >
            <LayoutList size={16} aria-hidden /> Quick overview
          </button>
        </div>
      </header>

      <p className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 rounded-full border-2 border-ink bg-card px-4 py-1 text-xs font-semibold shadow-[2px_2px_0_var(--shadow)] md:block">
        Drag or scroll to move · Ctrl + scroll to zoom
      </p>
    </div>
  );
}

export function Whiteboard({ onOverview }: { onOverview: () => void }) {
  return (
    <ReactFlowProvider>
      <Board onOverview={onOverview} />
    </ReactFlowProvider>
  );
}
