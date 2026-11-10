"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { sections, type SectionId } from "@/data/sections";

/** Nearest ancestor that actually scrolls vertically, or null when the page (window) scrolls. */
function scrollParent(el: HTMLElement | null): HTMLElement | null {
  for (let p = el?.parentElement ?? null; p; p = p.parentElement) {
    const o = getComputedStyle(p).overflowY;
    if ((o === "auto" || o === "scroll") && p !== document.body && p !== document.documentElement) return p;
  }
  return null;
}

/**
 * Scroll-spy for a sticky section nav. Works whether the window or an inner layer scrolls.
 * - `active` follows the section currently under the sticky header
 * - the active pill is centred in the (horizontally scrolling) nav
 * - `go` smooth-scrolls to a section, highlights it at once and moves focus there
 */
export function useSectionSpy() {
  const [active, setActive] = useState<SectionId>("intro");
  const headerRef = useRef<HTMLElement>(null);
  const navRefs = useRef(new Set<HTMLElement>());
  const lockUntil = useRef(0);

  /** Ref callback for every nav that should follow the active section. */
  const navRef = useCallback((el: HTMLElement | null) => {
    if (el) navRefs.current.add(el);
  }, []);

  useEffect(() => {
    const scroller = scrollParent(headerRef.current);
    const target: HTMLElement | Window = scroller ?? window;

    const update = () => {
      if (Date.now() < lockUntil.current) return;
      const offset = (headerRef.current?.offsetHeight ?? 100) + 24;
      const top = scroller ? scroller.getBoundingClientRect().top : 0;
      let current: SectionId = "intro";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top - top - offset <= 0) current = s.id;
      }
      const atEnd = scroller
        ? scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 4
        : window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atEnd) current = sections[sections.length - 1].id;
      setActive(current);
    };

    update();
    target.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      target.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // keep the highlighted pill centred in whichever nav is scrollable
  useEffect(() => {
    navRefs.current.forEach((nav) => {
      if (!nav.isConnected || nav.scrollWidth <= nav.clientWidth) return;
      const pill = nav.querySelector<HTMLElement>(`[data-id="${active}"]`);
      if (!pill) return;
      nav.scrollTo({ left: pill.offsetLeft - (nav.clientWidth - pill.offsetWidth) / 2, behavior: "smooth" });
    });
  }, [active]);

  const go = useCallback((e: MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    setActive(id);
    lockUntil.current = Date.now() + 900;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    // scroll-spy resumes once the smooth scroll has settled
    window.setTimeout(() => (lockUntil.current = 0), 950);
    history.replaceState(null, "", `#${id}`);
    el.focus({ preventScroll: true });
  }, []);

  return { active, go, headerRef, navRef };
}
