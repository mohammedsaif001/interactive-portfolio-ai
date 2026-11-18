"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { FileText, Pencil, Printer, RotateCcw } from "lucide-react";
import { resumeDefaults, resumeFileName, type ResumeData } from "@/constants/resume";
import { defaultStyle, fonts, layouts, themes, type ResumeStyle } from "@/lib/resume/styles";
import { ResumePreview } from "./ResumePreview";

type State = { data: ResumeData; style: ResumeStyle };
// The key includes a hash of the default content, so when resume.ts changes, old saved edits
// stop overriding it instead of silently showing stale text.
const hash = (str: string) => Array.from(str).reduce((h, c) => (Math.imul(h, 31) + c.charCodeAt(0)) | 0, 7).toString(36);
const KEY = `resume-builder-${hash(JSON.stringify(resumeDefaults))}`;
const defaults: State = { data: resumeDefaults, style: defaultStyle };

// Edits persist in localStorage; useSyncExternalStore keeps SSR and hydration consistent.
const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
};
const read = () => {
  try {
    return localStorage.getItem(KEY) ?? "";
  } catch {
    return "";
  }
};
const write = (s: State | null) => {
  try {
    if (s) localStorage.setItem(KEY, JSON.stringify(s));
    else localStorage.removeItem(KEY);
  } catch {}
  listeners.forEach((l) => l());
};

const A4_PX = (297 * 96) / 25.4;

function Choice<K extends string>({ label, value, options, onChange }: { label: string; value: K; options: Record<K, { label: string }>; onChange: (k: K) => void }) {
  return (
    <div>
      <div className="mb-1.5 text-xs font-bold uppercase tracking-wide opacity-60">{label}</div>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(options) as K[]).map((k) => (
          <button
            key={k}
            onClick={() => onChange(k)}
            className={`rounded-lg border-2 border-ink px-3 py-1.5 text-sm font-bold transition ${value === k ? "bg-coral shadow-[2px_2px_0_var(--shadow)]" : "bg-card hover:-translate-y-0.5"}`}
          >
            {options[k].label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ResumeBuilder() {
  const snap = useSyncExternalStore(subscribe, read, () => "");
  const state = useMemo<State>(() => {
    if (!snap) return defaults;
    try {
      return JSON.parse(snap) as State;
    } catch {
      return defaults;
    }
  }, [snap]);
  const { data, style } = state;

  const sheet = useRef<HTMLDivElement>(null);
  const [tooLong, setTooLong] = useState(false);
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState(false);

  // Warn when the content no longer fits on one A4 page.
  useEffect(() => {
    const el = sheet.current;
    if (!el) return;
    const check = () => setTooLong(el.scrollHeight > A4_PX + 2);
    const ro = new ResizeObserver(check);
    ro.observe(el);
    check();
    return () => ro.disconnect();
  }, [data, style]);

  const edit = useCallback(
    (fn: (d: ResumeData) => void) => {
      const next = structuredClone(state);
      fn(next.data);
      write(next);
    },
    [state],
  );
  const setStyle = (patch: Partial<ResumeStyle>) => write({ ...state, style: { ...style, ...patch } });

  const downloadPdf = useCallback(() => {
    const prev = document.title;
    document.title = resumeFileName;
    window.addEventListener("afterprint", () => (document.title = prev), { once: true });
    window.print();
  }, []);

  // /resume?download=pdf (the site's Resume buttons) opens the print dialog once the page has rendered.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("download") !== "pdf") return;
    const id = setTimeout(downloadPdf, 700);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const downloadDocx = async () => {
    setBusy(true);
    try {
      const { buildDocx } = await import("@/lib/resume/buildDocx");
      const blob = await buildDocx(data, style);
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${resumeFileName}.docx`;
      a.click();
      URL.revokeObjectURL(a.href);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#e9e9ee] px-4 py-6 text-[#1f2328] print:bg-white print:p-0">
      <style>{`@media print{html,body{background:#fff!important}.no-print{display:none!important}}`}</style>
      <div className="mx-auto flex max-w-[1180px] flex-col gap-6 lg:flex-row lg:items-start">
        <aside className="no-print flex w-full flex-col gap-5 rounded-2xl border-2 border-ink bg-white p-5 shadow-[4px_4px_0_var(--shadow)] lg:sticky lg:top-6 lg:w-80 lg:shrink-0">
          <div>
            <h1 className="text-xl font-extrabold">Resume builder</h1>
            <p className="mt-1 text-sm opacity-70">Pick a look, then download as PDF or Word.</p>
          </div>
          <Choice label="Color" value={style.theme} options={themes} onChange={(theme) => setStyle({ theme })} />
          <Choice label="Font" value={style.font} options={fonts} onChange={(font) => setStyle({ font })} />
          <Choice label="Layout" value={style.layout} options={layouts} onChange={(layout) => setStyle({ layout })} />

          <div className="flex flex-col gap-3 rounded-xl border-2 border-dashed border-ink/40 p-3">
            <button onClick={() => setEditing((e) => !e)} className={`flex items-center justify-center gap-2 rounded-lg border-2 border-ink px-3 py-2 text-sm font-bold ${editing ? "bg-sun" : "bg-white"}`}>
              <Pencil size={15} aria-hidden /> {editing ? "Done editing" : "Edit content"}
            </button>
            <p className="text-xs opacity-70">Edits stay in this browser only. Nobody else sees them and the site is not changed.</p>
            {editing && (
              <>
                <p className="text-xs font-semibold">Click any text on the page to change it. Hover a bullet to move or remove it.</p>
          <div>
                  <div className="mb-1.5 text-xs font-bold uppercase tracking-wide opacity-60">Skills (comma separated)</div>
                  <div className="flex flex-col gap-2">
                    {data.skills.map((s, i) => (
                      <label key={s.label} className="text-sm font-bold">
                        {s.label}
                        <input
                          key={s.items.join(",")}
                          defaultValue={s.items.join(", ")}
                          onBlur={(e) => edit((d) => void (d.skills[i].items = e.target.value.split(",").map((x) => x.trim()).filter(Boolean)))}
                          className="mt-0.5 w-full rounded-md border border-ink/40 px-2 py-1 text-sm font-normal"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <button onClick={() => confirm("Discard all your edits and reset to the default resume?") && write(null)} className="flex items-center justify-center gap-2 text-sm font-semibold opacity-70 hover:opacity-100">
                  <RotateCcw size={14} aria-hidden /> Reset to default
                </button>
              </>
            )}
          </div>

          {tooLong && <p className="rounded-lg bg-amber-100 p-2 text-sm font-semibold text-amber-900">Content runs past one page. Trim a bullet, shorten the skills, or pick the Compact layout.</p>}

          <div className="flex flex-col gap-2">
            <button onClick={downloadDocx} disabled={busy} className="flex items-center justify-center gap-2 rounded-xl border-2 border-ink bg-coral px-4 py-2.5 font-bold shadow-[3px_3px_0_var(--shadow)] disabled:opacity-60">
              <FileText size={18} aria-hidden /> {busy ? "Building…" : "Download Word (.docx)"}
            </button>
            <button onClick={downloadPdf} className="flex items-center justify-center gap-2 rounded-xl border-2 border-ink bg-white px-4 py-2.5 font-bold shadow-[3px_3px_0_var(--shadow)]">
              <Printer size={18} aria-hidden /> Download PDF
            </button>
            <p className="text-xs opacity-60">PDF opens your print dialog: choose “Save as PDF”, paper A4, margins None.</p>
          </div>
        </aside>

        <div className="min-w-0 flex-1 overflow-x-auto print:overflow-visible">
          <div className="mx-auto w-[210mm] shadow-[0_4px_24px_rgba(0,0,0,.18)] print:shadow-none">
            <ResumePreview ref={sheet} data={data} style={style} edit={edit} editable={editing} />
          </div>
        </div>
      </div>
    </main>
  );
}
