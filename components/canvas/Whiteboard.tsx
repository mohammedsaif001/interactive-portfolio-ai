"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  MarkerType,
  MiniMap,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { LayoutList } from "lucide-react";
import { profile, sections, type SectionId } from "@/data/profile";
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

const widths: Record<SectionId, number> = {
  intro: 640,
  experience: 520,
  projects: 520,
  recs: 460,
  skills: 700,
  contact: 560,
};

// Approximate rendered heights. Only used so the minimap can draw frames; real sizes are measured by React Flow.
const heights: Record<SectionId, number> = {
  intro: 373,
  experience: 610,
  projects: 643,
  recs: 581,
  skills: 440,
  contact: 297,
};

const hidden = { opacity: 0, pointerEvents: "none" as const, width: 1, height: 1 };

// A node is one whiteboard "frame". Hidden handles on every side let edges attach anywhere.
function FrameNode({ data }: NodeProps<Node<{ id: SectionId }>>) {
  return (
    <div style={{ width: widths[data.id] }}>
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

const nodeTypes = { frame: FrameNode };

// Reading path snakes: intro -> experience -> projects, down to kind words, left to skills, left to contact.
const positions: Record<SectionId, { x: number; y: number }> = {
  intro: { x: 0, y: 0 },
  experience: { x: 780, y: -90 },
  projects: { x: 1480, y: -90 },
  recs: { x: 1510, y: 880 },
  skills: { x: 720, y: 700 },
  contact: { x: 0, y: 640 },
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

const edge = (id: string, source: SectionId, sh: string, target: SectionId, th: string): Edge => ({
  id,
  source,
  sourceHandle: sh,
  target,
  targetHandle: th,
  type: "default",
  animated: false,
  style: { stroke: "#1f2430", strokeWidth: 3, strokeDasharray: "2 9", strokeLinecap: "round" },
  markerEnd: { type: MarkerType.ArrowClosed, color: "#1f2430", width: 22, height: 22 },
});

const edges: Edge[] = [
  edge("e1", "intro", "sr", "experience", "tl"),
  edge("e2", "experience", "sr", "projects", "tl"),
  edge("e3", "projects", "sb", "recs", "tt"),
  edge("e4", "recs", "sl", "skills", "tr"),
  edge("e5", "skills", "sl", "contact", "tr"),
];

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
    const t = setTimeout(() => rf.fitView({ nodes: [{ id: "intro" }], duration: 0, padding: 0.35, maxZoom: 1 }), 80);
    return () => clearTimeout(t);
  }, [rf]);

  const miniColors = useMemo(() => ["#ffe27a", "#9cc9ff", "#ff9b85", "#a9e6b8"], []);

  return (
    <div className="fixed inset-0">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
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
        <Background variant={BackgroundVariant.Dots} gap={22} size={1.4} color="rgba(31,36,48,0.18)" />
        <Controls showInteractive={false} position="top-left" style={{ marginTop: 84 }} />
        <MiniMap
          pannable
          zoomable
          position="bottom-left"
          nodeStrokeColor="#1f2430"
          nodeStrokeWidth={6}
          nodeColor={(n) => miniColors[sections.findIndex((s) => s.id === n.id) % 4]}
          maskColor="rgba(250,246,236,0.7)"
          style={{ width: 170, height: 110 }}
        />
      </ReactFlow>

      {/* top bar */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-4">
        <div className="pointer-events-auto rounded-xl border-2 border-ink bg-card px-4 py-2 shadow-[3px_3px_0_#1f2430]">
          <p className="font-hand text-2xl font-bold leading-none">{profile.name}</p>
          <p className="text-xs text-muted">{profile.role}</p>
        </div>

        <nav aria-label="Sections" className="pointer-events-auto hidden flex-wrap justify-center gap-2 lg:flex">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => flyTo(s.id)}
              aria-current={active === s.id}
              className={`rounded-full border-2 border-ink px-4 py-1.5 text-sm font-bold shadow-[2px_2px_0_#1f2430] transition hover:-translate-y-0.5 ${
                active === s.id ? "bg-sun" : "bg-card"
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <button
          onClick={onOverview}
          className="pointer-events-auto flex items-center gap-2 rounded-xl border-2 border-ink bg-mint px-4 py-2 text-sm font-bold shadow-[3px_3px_0_#1f2430] transition hover:-translate-y-0.5"
        >
          <LayoutList size={16} aria-hidden /> Quick overview
        </button>
      </header>

      <p className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 rounded-full border-2 border-ink bg-card px-4 py-1 text-xs font-semibold shadow-[2px_2px_0_#1f2430] md:block">
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
