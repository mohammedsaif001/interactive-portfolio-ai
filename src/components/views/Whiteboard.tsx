"use client";

import { useCallback, useState, type ReactNode } from "react";
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
  NodeResizeControl,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useReactFlow,
  type Edge,
  type EdgeProps,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { motion } from "framer-motion";
import { GripVertical, LayoutList, RotateCcw } from "lucide-react";
import { profile } from "@/constants";
import { sections, type SectionId } from "@/constants/sections";
import { ThemeToggle } from "@/lib/theme";
import { sectionIcons } from "@/lib/sectionIcons";
import { Intro } from "@/components/sections/Intro";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Recommendations } from "@/components/sections/Recommendations";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";

const content: Record<SectionId, ReactNode> = {
  intro: <Intro />,
  about: <About />,
  experience: <Experience />,
  projects: <Projects />,
  recs: <Recommendations />,
  skills: <Skills />,
  contact: <Contact />,
};

const widths: Record<SectionId, number> = { intro: 720, about: 520, experience: 540, projects: 520, recs: 460, skills: 760, contact: 560 };
// Approximate rendered heights, only so the minimap can draw frames; real sizes are measured by React Flow.
const heights: Record<SectionId, number> = { intro: 418, about: 586, experience: 695, projects: 1248, recs: 504, skills: 962, contact: 340 };

const hidden = { opacity: 0, pointerEvents: "none" as const, width: 1, height: 1 };

// A node is one whiteboard "frame". Hidden handles on every side let edges attach anywhere.
function FrameNode({ data }: NodeProps<Node<{ id: SectionId }>>) {
  return (
    // pointer-events-auto: React Flow can mark nodes as inert, which would make every button and link
    // inside a frame unclickable. `group` lets the resize handle fade in on hover.
    <div className="group pointer-events-auto w-full cursor-grab active:cursor-grabbing">
      {/* Right-edge handle. Horizontal only, because height must follow the content. nodrag/nopan keep
          the gesture from also dragging the frame or panning the board. */}
      <NodeResizeControl position="right" resizeDirection="horizontal" minWidth={420} maxWidth={1300} className="nodrag nopan" style={{ background: "transparent", border: "none", width: 22, height: "100%", right: -11, cursor: "ew-resize", zIndex: 6 }}>
        <span className="absolute left-1/2 top-1/2 grid h-12 w-5 opacity-0 transition-opacity group-hover:opacity-100 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-ink bg-card shadow-[2px_2px_0_var(--shadow)]" title="Drag to resize">
          <GripVertical size={14} aria-hidden />
        </span>
      </NodeResizeControl>
      <Handle id="tl" type="target" position={Position.Left} style={hidden} />
      <Handle id="tt" type="target" position={Position.Top} style={hidden} />
      <Handle id="tb" type="target" position={Position.Bottom} style={hidden} />
      <Handle id="tr" type="target" position={Position.Right} style={hidden} />
      <Handle id="st" type="source" position={Position.Top} style={hidden} />
      {/* corner handles, so two arrows never have to leave from the same point */}
      <Handle id="sbl" type="source" position={Position.Bottom} style={{ ...hidden, left: "4%" }} />
      <Handle id="slt" type="source" position={Position.Left} style={{ ...hidden, top: "12%" }} />
      <Handle id="sr" type="source" position={Position.Right} style={hidden} />
      <Handle id="sb" type="source" position={Position.Bottom} style={hidden} />
      <Handle id="sl" type="source" position={Position.Left} style={hidden} />
      {data.id === "intro" && (
        <div className="font-hand pointer-events-none absolute -bottom-10 -left-16 z-[5] flex -rotate-6 items-center gap-1 whitespace-nowrap text-2xl font-bold text-accent">
          start here
          <svg aria-hidden width="38" height="30" viewBox="0 0 38 30" fill="none" className="wobble mt-[-14px]">
            <path d="M3 27C10 22 14 12 32 4" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
            <path d="M22 3l11 1-4 10" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
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
          {/* z-[5]: labels sit at the middle of each connector and must paint above the cards,
              otherwise a short connector leaves its label half hidden behind a frame. */}
          <div
            className="nodrag nopan font-hand pointer-events-none absolute z-[5] whitespace-nowrap rounded-full border-2 border-ink bg-card px-3 py-0.5 text-2xl font-bold shadow-[2px_2px_0_var(--shadow)]"
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

// Hub and spoke, spread wide: the intro card sits in the middle and every other section branches off it, about
// 260px away so connector labels stay clear of the cards. The tall frames (skills ~960px, projects ~1250px)
// take the left and right axes so the board is wide rather than tall and fills a landscape screen when fitted.
//                           contact (top)
//                about                              projects
//   skills <-----          INTRO          ----->     (level with intro)
//                experience   recs (bottom)
// If you add more projects, nothing else needs to move: projects hangs down the right with empty space around it.
const positions: Record<SectionId, { x: number; y: number }> = {
  intro: { x: 0, y: 0 },
  skills: { x: -1800, y: -270 },
  about: { x: -780, y: -560 },
  experience: { x: -780, y: 420 },
  projects: { x: 1000, y: -415 },
  recs: { x: 130, y: 620 },
  contact: { x: 200, y: -540 },
};

// Frames start at a fixed width (so the resizer can change it) but never get a fixed height:
// the content decides how tall each frame is. initialHeight only helps the minimap draw frames.
const initialNodes: Node[] = sections.map((s) => ({
  id: s.id,
  type: "frame",
  position: positions[s.id],
  data: { id: s.id },
  width: widths[s.id],
  initialHeight: heights[s.id],
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
  edge("e1", "intro", "slt", "about", "tr", "about me"),
  edge("e2", "intro", "sl", "skills", "tr", "my toolkit"),
  edge("e3", "intro", "sbl", "experience", "tr", "my work"),
  edge("e4", "intro", "sr", "projects", "tl", "what I built"),
  edge("e5", "intro", "sb", "recs", "tt", "what people say"),
  edge("e6", "intro", "st", "contact", "tb", "let's talk"),
];

// Room kept clear for the floating top bar and the bottom hint bar when the whole board is fitted.
const fitAllPadding = { top: "96px", bottom: "84px", left: "32px", right: "32px" } as const;

const miniColors = ["var(--yellow)", "var(--blue)", "var(--coral)", "var(--green)"];

function Board({ onOverview }: { onOverview: () => void }) {
  const rf = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [active, setActive] = useState<SectionId>("intro");

  const flyTo = useCallback(
    (id: SectionId) => {
      setActive(id);
      // fitView with a node filter can be swallowed by the initial fitView still being queued (that is why
      // the first click did nothing). Computing the bounds ourselves and calling fitBounds always runs.
      const node = rf.getNode(id);
      if (!node) return;
      const bounds = rf.getNodesBounds([node]);
      rf.fitBounds(bounds, { duration: 900, padding: 0.12 });
    },
    [rf],
  );

  // Put every frame back in its default place and re-frame the whole board.
  const resetLayout = useCallback(() => {
    setNodes(initialNodes);
    setTimeout(() => rf.fitView({ duration: 800, padding: fitAllPadding }), 250);
  }, [rf, setNodes]);

  return (
    <div className="fixed inset-0">
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        /* React Flow frames the Hello card itself as soon as the nodes are measured, before the first
           paint. (A delayed fitView call used to run after the board was visible, so the card
           appeared on the left and then jumped to the middle.) */
        fitView
        fitViewOptions={{ nodes: [{ id: "intro" }], padding: 0.3, maxZoom: 1 }}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        minZoom={0.15}
        maxZoom={1.6}
        nodesDraggable
        /* ignore tiny movements so a click on a card is never mistaken for a drag */
        nodeDragThreshold={4}
        /* double-click (or double-tap) a frame to zoom onto it and highlight it in the top nav; the
           default double-click-to-zoom-in is turned off so the two do not fight */
        zoomOnDoubleClick={false}
        onNodeDoubleClick={(_, node) => flyTo(node.id as SectionId)}
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
              aria-current={active === s.id ? "true" : undefined}
              aria-label={`Go to ${s.label}`}
              className={`relative flex items-center gap-1.5 rounded-full border-2 border-ink px-3.5 py-1.5 text-sm font-bold shadow-[2px_2px_0_var(--shadow)] transition hover:-translate-y-0.5 ${active === s.id ? "bg-sun" : "bg-card"}`}
            >
              {(() => {
                const Icon = sectionIcons[s.id];
                return <Icon size={15} aria-hidden />;
              })()}
              {s.label}
              {active === s.id && (
                <motion.svg layoutId="nav-squiggle" aria-hidden viewBox="0 0 60 8" className="wobble pointer-events-none absolute -bottom-2.5 left-1/2 h-2 w-14 -translate-x-1/2 text-accent" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M2 4c5-5 8 5 14 0s8 5 14 0 8 5 14 0 8 3 14 0" />
                </motion.svg>
              )}
            </button>
          ))}
        </nav>

        <div className="pointer-events-auto flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={onOverview}
            aria-label="Switch to the quick overview page"
            className="flex h-10 items-center gap-2 rounded-xl border-2 border-ink bg-mint px-4 text-sm font-bold shadow-[3px_3px_0_var(--shadow)] transition hover:-translate-y-0.5"
          >
            <LayoutList size={16} aria-hidden /> Quick overview
          </button>
        </div>
      </header>

      <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 items-center gap-2 md:flex">
        <p className="pointer-events-none rounded-full border-2 border-ink bg-card px-4 py-1 text-xs font-semibold shadow-[2px_2px_0_var(--shadow)]">
          Double-click a frame to focus it · drag to rearrange · Ctrl + scroll to zoom
        </p>
        <button onClick={resetLayout} aria-label="Reset the frame layout to default" className="flex items-center gap-1.5 rounded-full border-2 border-ink bg-card px-3 py-1 text-xs font-bold shadow-[2px_2px_0_var(--shadow)] transition hover:-translate-y-0.5">
          <RotateCcw size={13} aria-hidden /> Reset layout
        </button>
      </div>
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
