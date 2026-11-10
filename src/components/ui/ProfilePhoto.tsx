"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, Pencil } from "lucide-react";
import { profile } from "@/constants";

const sizes = {
  lg: "h-[170px] w-[170px] sm:h-[210px] sm:w-[210px]",
  md: "h-[120px] w-[120px] sm:h-[140px] sm:w-[140px]",
};

const face = "absolute inset-0 h-full w-full object-cover [backface-visibility:hidden]";

/**
 * The real photo as a taped-on polaroid. Hover it (or tap it on a phone) and it flips over to the
 * ink-sketch portrait. The photo stays the default because it is what makes the page credible.
 */
export function ProfilePhoto({ size = "lg", className = "" }: { size?: keyof typeof sizes; className?: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className={`relative shrink-0 -rotate-3 ${className}`}>
      <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2" />
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        // only a real mouse flips on hover; touch devices use the tap so a scroll never flips it
        onPointerEnter={(e) => e.pointerType === "mouse" && setFlipped(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setFlipped(false)}
        aria-pressed={flipped}
        aria-label={flipped ? "Show my photo" : "Show my sketched portrait"}
        className="block border-2 border-ink bg-white p-2 pb-9 shadow-[4px_4px_0_var(--shadow)] [perspective:900px]"
      >
        <motion.span
          className={`relative block ${sizes[size]} [transform-style:preserve-3d]`}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 140, damping: 16 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={profile.photo} alt={`${profile.name}, profile photo`} className={`${face} object-[50%_30%]`} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/mohammed-ink.webp" alt="" aria-hidden className={`${face} object-[50%_45%] [transform:rotateY(180deg)]`} />
        </motion.span>
      </button>
      <span className="font-hand pointer-events-none absolute bottom-1 left-0 right-0 text-center text-xl text-[#1f2430]">{flipped ? "sketched me!" : "that’s me!"}</span>
      <span aria-hidden className="pointer-events-none absolute -bottom-3 -right-3 grid h-9 w-9 place-items-center rounded-full border-2 border-ink bg-mint shadow-[2px_2px_0_var(--shadow)]">
        {flipped ? <Pencil size={18} /> : <BadgeCheck size={20} />}
      </span>
    </div>
  );
}
