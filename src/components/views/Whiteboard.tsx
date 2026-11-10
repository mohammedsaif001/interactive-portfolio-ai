"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
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

const widths: Record<SectionId, number> = { intro: 720, about: 520, experience: 540, projects: 1000, recs: 460, skills: 760, contact: 560 };
// Approximate rendered heights, only so the minimap can draw frames; real sizes are measured by React Flow.
const heights: Record<SectionId, number> = { intro: 418, about: 586, experience: 695, projects: 830, recs: 504, skills: 908, contact: 480 };

const hidden = { opacity: 0, pointerEvents: "none" as const, width: 1, height: 1 };

// A node is one whiteboard "frame". Hidden handles on every side let edges attach anywhere.
function FrameNode({ data }: NodeProps<Node<{ id: SectionId }>>) {
  return (
    // pointer-events-auto: React Flow can mark nodes as inert, which would make every button and link
    // inside a frame unclickable. `group` lets the resize handle fade in on hover.
    <div className="group pointer-events-auto w-full cursor-grab active:cursor-grabbing">
      {/* Right-edge handle. Horizontal only, because height must follow the content. nodrag/nopan keep
          the gesture from also dragging the frame or panning the board. It is a small fixed-size pill, not
          full height: React Flow scales the control with zoom, so a 100%-tall strip stuck out far past the
          card when the board was zoomed out. */}
      <NodeResizeControl position="right" resizeDirection="horizontal" minWidth={420} maxWidth={1300} className="nodrag nopan" style={{ background: "transparent", border: "none", width: 22, height: 64, top: "50%", marginTop: -32, right: -11, cursor: "ew-resize", zIndex: 6 }}>
        <span className="absolute left-1/2 top-1/2 grid h-12 w-5 opacity-0 transition-opacity group-hover:opacity-100 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-ink bg-card shadow-[2px_2px_0_var(--shadow)]" title="Drag to resize">
          <GripVertical size={14} aria-hidden />
        </span>
      </NodeResizeControl>
      <Handle id="tl" type="target" position={Position.Left} style={hidden} />
      <Handle id="tt" type="target" position={Position.Top} style={hidden} />
      <Handle id="tr" type="target" position={Position.Right} style={hidden} />
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

// A "]" path: the top row runs left to right, the path drops down the right edge, and the bottom row runs
// back right to left. Gaps between frames are about 240px so connector labels stay clear of the cards.
//   intro -> about -> skills -> experience
//                                  |
//                  contact <- recs <- projects
// Projects is wide (two columns of cards) so the board stays landscape. Frames in the top row are centred on
// the same line so the arrows run straight.
const positions: Record<SectionId, { x: number; y: number }> = {
  intro: { x: 0, y: 272 },
  about: { x: 960, y: 188 },
  skills: { x: 1720, y: 27 },
  experience: { x: 2720, y: 134 },
  projects: { x: 2260, y: 1049 },
  recs: { x: 1560, y: 1212 },
  contact: { x: 760, y: 1224 },
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
  edge("e1", "intro", "sr", "about", "tl", "about me"),
  edge("e2", "about", "sr", "skills", "tl", "my toolkit"),
  edge("e3", "skills", "sr", "experience", "tl", "my work"),
  edge("e4", "experience", "sb", "projects", "tt", "what I built"),
  edge("e5", "projects", "sl", "recs", "tr", "what people say"),
  edge("e6", "recs", "sl", "contact", "tr", "let's talk"),
];

const FLY_MS = 650;
const RESET_MS = 800;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

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
      // "linear" glides straight to the target. The default ("smooth") zooms out and back in along an arc,
      // which takes noticeably longer to read as arriving on a board this wide.
      rf.fitBounds(bounds, { duration: FLY_MS, padding: 0.12, ease: easeInOut, interpolate: "linear" });
    },
    [rf],
  );

  // Put every frame back in its default place and re-frame the whole board, both animated together: the frames
  // glide home (position and width) while the camera glides to where the finished layout will be.
  const raf = useRef(0);
  useEffect(() => () => cancelAnimationFrame(raf.current), []);
  const resetLayout = useCallback(() => {
    cancelAnimationFrame(raf.current);
    const from = new Map(rf.getNodes().map((n) => [n.id, { x: n.position.x, y: n.position.y, w: n.width ?? n.measured?.width ?? widths[n.id as SectionId] }]));
    const target = new Map(initialNodes.map((n) => [n.id, { x: n.position.x, y: n.position.y, w: n.width ?? widths[n.id as SectionId] }]));

    // bounds of the finished layout, from the known default frame sizes
    const box = initialNodes.reduce(
      (b, n) => {
        const t = target.get(n.id)!;
        return { x1: Math.min(b.x1, t.x), y1: Math.min(b.y1, t.y), x2: Math.max(b.x2, t.x + t.w), y2: Math.max(b.y2, t.y + heights[n.id as SectionId]) };
      },
      { x1: Infinity, y1: Infinity, x2: -Infinity, y2: -Infinity },
    );
    // fit that box between the floating top bar and bottom hint bar (fitBounds only takes a single ratio)
    const [pt, pb, pl, pr] = [96, 84, 32, 32];
    const bw = box.x2 - box.x1;
    const bh = box.y2 - box.y1;
    const zoom = Math.min((window.innerWidth - pl - pr) / bw, (window.innerHeight - pt - pb) / bh, 1);
    const x = pl + (window.innerWidth - pl - pr - bw * zoom) / 2 - box.x1 * zoom;
    const y = pt + (window.innerHeight - pt - pb - bh * zoom) / 2 - box.y1 * zoom;
    rf.setViewport({ x, y, zoom }, { duration: RESET_MS, ease: easeInOut, interpolate: "linear" });

    const t0 = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / RESET_MS);
      const e = easeInOut(t);
      setNodes((prev) =>
        prev.map((n) => {
          const f = from.get(n.id);
          const g = target.get(n.id);
          if (!f || !g) return n;
          return { ...n, position: { x: f.x + (g.x - f.x) * e, y: f.y + (g.y - f.y) * e }, width: f.w + (g.w - f.w) * e };
        }),
      );
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
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
