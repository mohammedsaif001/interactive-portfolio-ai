"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send, Sparkles, User, X } from "lucide-react";
import { profile } from "@/data/profile";
import { DoodleAvatar } from "@/components/ui/DoodleAvatar";
import { mockReply, suggestedPrompts } from "@/lib/mockAgent";

type Msg = { role: "user" | "bot"; text: string; time: string };

const now = () => new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

/** Small round avatar beside each message: the sketch for the assistant, a person glyph for the visitor. */
function ChatAvatar({ role }: { role: Msg["role"] }) {
  if (role === "user") {
    return (
      <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-full border-2 border-ink bg-sky shadow-[2px_2px_0_var(--shadow)]">
        <User size={16} strokeWidth={2.4} />
      </span>
    );
  }
  return (
    <span aria-hidden className="relative size-8 shrink-0">
      <span className="absolute inset-0 overflow-hidden rounded-full border-2 border-ink bg-white shadow-[2px_2px_0_var(--shadow)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/mohammed-doodle.webp" alt="" width={32} height={32} className="h-full w-full object-cover" />
      </span>
      <span className="absolute -bottom-1 -right-1 grid size-4 place-items-center rounded-full border-[1.5px] border-ink bg-sun">
        <Sparkles size={9} strokeWidth={2.6} />
      </span>
    </span>
  );
}

function TypingBubble() {
  return (
    <div className="flex items-end gap-2" role="status" aria-label="Assistant is typing">
      <ChatAvatar role="bot" />
      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border-2 border-ink bg-card px-4 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="size-2 rounded-full bg-ink"
            animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: `Hi! I'm ${profile.name.split(" ")[0]}'s assistant. Ask me anything about his work, skills or availability.`, time: "" },
  ]);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, busy, open]);

  // Keep the cursor in the box on desktop (not on phones, where it would pop the keyboard up).
  useEffect(() => {
    if (open && !window.matchMedia("(max-width: 639px)").matches) inputRef.current?.focus();
  }, [open, busy]);

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
    setMsgs((m) => [...m, { role: "user", text: t, time: now() }]);
    setInput("");
    setBusy(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "bot", text: mockReply(t), time: now() }]);
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
          role="dialog"
          aria-label="Ask about me"
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
          // phone: a bottom sheet across the full width; sm and up: the small floating panel
          className="mb-3 flex h-[min(520px,70dvh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border-2 border-ink bg-card shadow-[5px_5px_0_var(--shadow)] max-sm:fixed max-sm:inset-x-0 max-sm:bottom-0 max-sm:mb-0 max-sm:h-[82dvh] max-sm:w-auto max-sm:rounded-b-none max-sm:rounded-t-3xl max-sm:border-x-0 max-sm:border-b-0 max-sm:shadow-[0_-6px_0_var(--shadow)]"
        >
          <header className="flex items-center justify-between border-b-2 border-ink bg-sun px-4 py-2.5">
            <div className="flex items-center gap-2.5">
              <DoodleAvatar size={38} />
              <div>
                <p className="font-hand text-2xl font-bold leading-none">Ask about {profile.name.split(" ")[0]}</p>
                <p className="flex items-center gap-1.5 text-[11px]">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-70" />
                    <span className="relative inline-flex size-2 rounded-full border border-ink bg-mint" />
                  </span>
                  Online · AI assistant · preview
                </p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-md p-1 hover:bg-ink/10">
              <X size={18} aria-hidden />
            </button>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto bg-[radial-gradient(color-mix(in_srgb,var(--ink)_16%,transparent)_0.8px,transparent_0.8px)] [background-size:16px_16px] bg-fixed p-4" role="log" aria-live="polite" aria-label="Conversation" aria-busy={busy}>
            {msgs.map((m, i) => {
              const user = m.role === "user";
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={`flex items-end gap-2 ${user ? "flex-row-reverse" : ""}`}
                >
                  <ChatAvatar role={m.role} />
                  <div className={`flex min-w-0 max-w-[80%] flex-col ${user ? "items-end" : "items-start"}`}>
                    <p
                      className={`whitespace-pre-line break-words rounded-2xl border-2 border-ink px-3 py-2 text-sm leading-relaxed ${
                        user ? "rounded-br-sm bg-sky" : "rounded-bl-sm bg-card"
                      }`}
                    >
                      {m.text}
                    </p>
                    <span className="mt-1 px-1 text-[10px] text-muted">
                      <span className="sr-only">{user ? "You said, " : "Reply, "}</span>
                      {user ? "You" : profile.name.split(" ")[0]}{m.time && ` · ${m.time}`}
                    </span>
                  </div>
                </motion.div>
              );
            })}
            {busy && <TypingBubble />}
            {msgs.length === 1 && (
              <div className="flex flex-wrap gap-2 pl-10 pt-1">
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

          <form onSubmit={onSubmit} className="flex gap-2 border-t-2 border-ink bg-card p-3">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything…"
              aria-label="Your question"
              className="min-w-0 flex-1 rounded-full border-2 border-ink bg-card px-4 py-2 text-sm outline-none focus:bg-sun/30"
            />
            <button type="submit" aria-label="Send" disabled={!input.trim() || busy} className="grid size-11 place-items-center rounded-full border-2 border-ink bg-coral shadow-[2px_2px_0_var(--shadow)] transition enabled:hover:-translate-y-0.5 disabled:opacity-50">
              <Send size={16} aria-hidden />
            </button>
          </form>
        </motion.section>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Ask me anything"}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={`ml-auto flex items-center gap-2 rounded-full border-2 border-ink bg-coral p-3 font-bold shadow-[4px_4px_0_var(--shadow)] sm:px-4 transition hover:-translate-y-0.5 ${open ? "max-sm:hidden" : ""}`}
      >
        <MessageCircle size={20} aria-hidden />
        <span className="font-hand hidden text-xl leading-none sm:inline">Ask me anything</span>
      </button>
    </div>
    </>
  );
}
