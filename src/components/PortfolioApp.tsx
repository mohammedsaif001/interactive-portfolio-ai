"use client";

import { useState, useSyncExternalStore } from "react";
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

  return (
    <>
      <AnimatePresence mode="wait">
        {view === "entry" && <EntryScreen key="entry" isDesktop={isDesktop} onExplore={() => setView("explore")} onOverview={() => setView("overview")} />}
      </AnimatePresence>

      {view === "explore" && (isDesktop ? <Whiteboard onOverview={() => setView("overview")} /> : <Story onOverview={() => setView("overview")} />)}
      {view === "overview" && <QuickOverview onBack={() => setView("explore")} />}

      <ChatWidget />
    </>
  );
}
