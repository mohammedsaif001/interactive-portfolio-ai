"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { profile } from "@/data/profile";
import { DoodleAvatar } from "@/components/ui/DoodleAvatar";
import { mockReply, suggestedPrompts } from "@/lib/mockAgent";

type Msg = { role: "user" | "bot"; text: string };

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: `Hi! I'm ${profile.name.split(" ")[0]}'s assistant. Ask me anything about his work, skills or availability.` },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, busy, open]);

  // While the chat is open: Escape closes it, and on a phone the page behind it stops scrolling.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const phone = window.matchMedia("(max-width: 639px)").matches;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    if (phone) html.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      html.style.overflow = prevOverflow;
    };
  }, [open]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t || busy) return;
    setMsgs((m) => [...m, { role: "user", text: t }]);
    setInput("");
    setBusy(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "bot", text: mockReply(t) }]);
      setBusy(false);
    }, 700);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <>
      {/* Phones only: dim and blur the page so the chat reads as its own layer. Tap it to close. */}
      {open && <div aria-hidden onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-black/55 backdrop-blur-[3px] sm:hidden" />}

    <div className="fixed bottom-4 right-4 z-50">
      {open && (
        <motion.section
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          aria-label="Ask about me"
          // phone: a bottom sheet across the full width; sm and up: the small floating panel
          className="mb-3 flex h-[min(520px,70dvh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border-2 border-ink bg-card shadow-[5px_5px_0_var(--shadow)] max-sm:fixed max-sm:inset-x-0 max-sm:bottom-0 max-sm:mb-0 max-sm:h-[82dvh] max-sm:w-auto max-sm:rounded-b-none max-sm:rounded-t-3xl max-sm:border-x-0 max-sm:border-b-0 max-sm:shadow-[0_-6px_0_var(--shadow)]"
        >
          <header className="flex items-center justify-between border-b-2 border-ink bg-sun px-4 py-2.5">
            <div className="flex items-center gap-2.5">
              <DoodleAvatar size={38} />
              <div>
                <p className="font-hand text-2xl font-bold leading-none">Ask about {profile.name.split(" ")[0]}</p>
                <p className="text-[11px]">AI assistant · preview mode</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-md p-1 hover:bg-ink/10">
              <X size={18} />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <p
                  className={`max-w-[85%] whitespace-pre-line rounded-2xl border-2 border-ink px-3 py-2 text-sm leading-relaxed ${
                    m.role === "user" ? "bg-sky" : "bg-card"
                  }`}
                >
                  {m.text}
                </p>
              </div>
            ))}
            {busy && <p className="font-hand text-xl text-muted">thinking…</p>}
            {msgs.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {suggestedPrompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => send(p)}
                    className="rounded-full border-2 border-ink bg-card px-3 py-1 text-xs font-semibold hover:bg-sun"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form onSubmit={onSubmit} className="flex gap-2 border-t-2 border-ink p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything…"
              aria-label="Your question"
              className="min-w-0 flex-1 rounded-lg border-2 border-ink bg-card px-3 py-2 text-sm outline-none focus:bg-sun/30"
            />
            <button type="submit" aria-label="Send" className="grid w-11 place-items-center rounded-lg border-2 border-ink bg-coral">
              <Send size={16} />
            </button>
          </form>
        </motion.section>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Ask me anything"}
        className={`ml-auto flex items-center gap-2 rounded-full border-2 border-ink bg-coral p-3 font-bold shadow-[4px_4px_0_var(--shadow)] sm:px-4 transition hover:-translate-y-0.5 ${open ? "max-sm:hidden" : ""}`}
      >
        <MessageCircle size={20} aria-hidden />
        <span className="font-hand hidden text-xl leading-none sm:inline">Ask me anything</span>
      </button>
    </div>
    </>
  );
}
