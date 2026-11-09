"use client";

import { useState } from "react";
import { Check, Copy, Laptop, Tablet, X } from "lucide-react";

// Phones get the native share sheet; everything else falls back to copying the link.
async function shareOrCopy(): Promise<"shared" | "copied" | "failed"> {
  const url = window.location.href;
  try {
    if (navigator.share) {
      await navigator.share({ title: document.title, url });
      return "shared";
    }
    await navigator.clipboard.writeText(url);
    return "copied";
  } catch {
    return "failed";
  }
}

/** Shown on phones: this portfolio is designed for laptop / tablet screens. */
export function BigScreenNotice({ variant = "card", onDismiss }: { variant?: "card" | "banner"; onDismiss?: () => void }) {
  const [state, setState] = useState<"idle" | "done">("idle");

  const copy = async () => {
    const r = await shareOrCopy();
    if (r !== "failed") {
      setState("done");
      setTimeout(() => setState("idle"), 2200);
    }
  };

  const button = (
    <button onClick={copy} className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border-2 border-ink bg-sun px-3 py-1.5 text-xs font-bold shadow-[2px_2px_0_var(--shadow)]">
      {state === "done" ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
      {state === "done" ? "Link ready!" : "Send me the link"}
    </button>
  );

  if (variant === "banner") {
    return (
      <div role="note" className="relative mx-auto mb-5 flex max-w-xl items-start gap-3 rounded-xl border-2 border-dashed border-ink bg-card p-3 pr-9">
        <Laptop size={22} className="mt-0.5 shrink-0" aria-hidden />
        <div className="text-sm leading-snug">
          <p className="font-bold">Better on a bigger screen</p>
          <p className="text-muted">This is a lighter mobile version. Open it on a laptop or tablet for the full interactive whiteboard.</p>
          <div className="mt-2">{button}</div>
        </div>
        {onDismiss && (
          <button onClick={onDismiss} aria-label="Dismiss" className="absolute right-2 top-2 rounded-md p-1">
            <X size={16} />
          </button>
        )}
      </div>
    );
  }

  return (
    <div role="note" className="mx-auto mb-6 max-w-md rounded-2xl border-2 border-ink bg-card p-4 text-left shadow-[4px_4px_0_var(--shadow)]">
      <div className="flex items-center gap-2" aria-hidden>
        <Laptop size={26} />
        <Tablet size={22} />
      </div>
      <p className="font-hand mt-1 text-3xl font-bold leading-none">Best on a laptop or tablet</p>
      <p className="mt-1 text-sm leading-relaxed text-muted">I built this as an interactive whiteboard you can drag around. On a phone you get a simplified version, so open it on a bigger screen for the full experience.</p>
      <div className="mt-3">{button}</div>
    </div>
  );
}
