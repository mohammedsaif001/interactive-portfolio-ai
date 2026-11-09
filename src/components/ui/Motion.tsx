"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

/** Counts up to `value` the first time it scrolls into view (or immediately if `now`). */
export function CountUp({ value, prefix = "", suffix = "", now = false, className = "" }: { value: number; prefix?: string; suffix?: string; now?: boolean; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!now && !inView) return;
    const controls = animate(0, value, { duration: 1.4, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, now, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {n}
      {suffix}
    </span>
  );
}

/** Types out and deletes each word in turn. */
export function Typewriter({ words, className = "" }: { words: string[]; className?: string }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    let delay = deleting ? 35 : 80;
    if (!deleting && text === word) delay = 1400;
    if (deleting && text === "") delay = 250;

    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setI((x) => x + 1);
      } else setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, i, words]);

  return (
    <span className={className}>
      {text}
      <span className="caret ml-0.5 inline-block w-[2px] bg-current align-middle" style={{ height: "1em" }} aria-hidden />
    </span>
  );
}
