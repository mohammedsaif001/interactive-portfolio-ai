"use client";

import { startTransition, useCallback, useRef, useState, useSyncExternalStore } from "react";
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

  // The whiteboard is heavy to build (React Flow, hand-drawn borders, animated connectors). Building it
  // at the moment of the click froze the screen mid-transition, so it is built in the background once
  // the choice screen has settled, then simply faded in. It stays mounted afterwards, which also keeps
  // your rearranged frames when you hop to the overview and back.
  const [warm, setWarm] = useState(false);
  const warming = useRef(false);
  const warmUp = useCallback(() => {
    if (warming.current) return;
    warming.current = true;
    // wait for the entry animations to finish, then render at low priority so nothing stutters
    setTimeout(() => startTransition(() => setWarm(true)), 900);
  }, []);

  const showBoard = isDesktop && view === "explore";
  const boardMounted = isDesktop && (warm || view !== "entry");

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
          className={`fixed inset-0 will-change-[opacity] ${
            showBoard ? "visible opacity-100 transition-opacity duration-500" : view === "entry" ? "visible opacity-[0.01]" : "invisible opacity-0"
          }`}
        >
          <Whiteboard onOverview={() => setView("overview")} />
        </div>
      )}
      {view === "explore" && !isDesktop && <Story onOverview={() => setView("overview")} />}
      {view === "overview" && <QuickOverview onBack={() => setView("explore")} />}

      <ChatWidget />
    </>
  );
}
