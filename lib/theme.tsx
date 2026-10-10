"use client";

import { createContext, useCallback, useContext, useSyncExternalStore, type ReactNode } from "react";
import { Moon, Sun } from "lucide-react";

export type Theme = "paper" | "dark";
const KEY = "portfolio-theme";

const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({ theme: "paper", toggle: () => {} });

export const useTheme = () => useContext(ThemeCtx);

const subscribe = (cb: () => void) => {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
};
const getTheme = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "paper");

export function ThemeProvider({ children }: { children: ReactNode }) {
  // layout.tsx sets data-theme before paint; the attribute is the single source of truth
  const theme = useSyncExternalStore(subscribe, getTheme, () => "paper" as Theme);

  const toggle = useCallback(() => {
    const next: Theme = getTheme() === "paper" ? "dark" : "paper";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {}
  }, []);

  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>;
}

export const themeInitScript = `try{var t=localStorage.getItem("${KEY}");document.documentElement.dataset.theme=(t==="dark"||t==="paper")?t:"paper"}catch(e){document.documentElement.dataset.theme="paper"}`;

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const toDark = theme === "paper";
  return (
    <button
      onClick={toggle}
      aria-label={toDark ? "Switch to dark theme" : "Switch to light paper theme"}
      title={toDark ? "Dark mode" : "Light mode"}
      className={`grid h-10 w-10 place-items-center rounded-xl border-2 border-ink bg-card shadow-[3px_3px_0_var(--shadow)] transition hover:-translate-y-0.5 ${className}`}
    >
      {toDark ? <Moon size={18} aria-hidden /> : <Sun size={18} aria-hidden />}
    </button>
  );
}
