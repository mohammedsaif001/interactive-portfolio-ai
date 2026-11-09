"use client";

import { startTransition, useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence } from "framer-motion";
import { EntryScreen } from "@/components/views/EntryScreen";
import { Whiteboard } from "@/components/views/Whiteboard";
import { Story } from "@/components/views/Story";
import { QuickOverview } from "@/components/views/QuickOverview";
import { ChatWidget } from "@/components/chat/ChatWidget";

type View = "entry" | "explore" | "overview";

const QUERY = "(min-width: 900px)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export function PortfolioApp() {
  const [view, setView] = useState<View>("entry");
  const isDesktop = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => true,
  );

  // Both desktop screens are heavy to build (the whiteboard: React Flow, hand-drawn borders, animated
  // connectors; the overview: every section on one long page). Building either at the moment of a click
  // froze the screen mid-transition, so they are built in the background once the choice screen has
  // settled, and switching is just a dissolve between two screens that already exist. They stay mounted,
  // which also keeps your rearranged frames when you hop between them.
  const [warm, setWarm] = useState(false);
  const [warmOverview, setWarmOverview] = useState(false);
  const warming = useRef(false);
  const warmUp = useCallback(() => {
    if (warming.current) return;
    warming.current = true;
    // wait for the entry animations to finish, then render at low priority so nothing stutters
    setTimeout(() => startTransition(() => setWarm(true)), 900);
    setTimeout(() => startTransition(() => setWarmOverview(true)), 2200);
  }, []);

  const showBoard = isDesktop && view === "explore";
  const showOverview = isDesktop && view === "overview";
  const boardMounted = isDesktop && (warm || view !== "entry");
  const overviewMounted = isDesktop && (warmOverview || view === "overview");

  // A screen fades in on top (0.5s); the one underneath only hides once the fade is over, so there is never
  // a blank frame in between (`visibility` is delayed by the same 0.5s when a layer goes away).
  const fadeOut = "invisible opacity-0 [transition:opacity_0.5s,visibility_0s_linear_0.5s]";
  const fadeIn = "visible opacity-100 transition-opacity duration-500";

  // The overview scrolls inside its own layer, so the page itself never gets (or loses) a scrollbar when
  // switching, which used to shift the layout. Each visit starts at the top.
  const overviewRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (view === "overview") overviewRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [view]);

  return (
    <>
      <AnimatePresence mode="wait">
        {view === "entry" && <EntryScreen key="entry" isDesktop={isDesktop} onReady={warmUp} onExplore={() => setView("explore")} onOverview={() => setView("overview")} />}
      </AnimatePresence>

      {boardMounted && (
        <div
          inert={!showBoard}
          aria-hidden={!showBoard}
          // Three states: shown; "warm" (already painted behind the choice screen at 1% opacity, so the
          // click only has to fade an existing layer instead of painting the whole board); and hidden.
          className={`fixed inset-0 will-change-[opacity] ${showBoard ? fadeIn : view === "entry" ? "visible opacity-[0.01]" : fadeOut}`}
        >
          <Whiteboard onOverview={() => setView("overview")} />
        </div>
      )}

      {overviewMounted && (
        <div ref={overviewRef} inert={!showOverview} aria-hidden={!showOverview} className={`page-bg fixed inset-0 z-30 overflow-y-auto scroll-smooth will-change-[opacity] ${showOverview ? fadeIn : fadeOut}`}>
          <QuickOverview onBack={() => setView("explore")} />
        </div>
      )}

      {/* Phones get a single experience (the story). The overview is a desktop alternative to the whiteboard:
          on a phone it would be the same sections in the same order, so it is not offered there. */}
      {!isDesktop && view !== "entry" && <Story />}

      <ChatWidget />
    </>
  );
}
