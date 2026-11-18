"use client";

import { createContext, forwardRef, useContext, type CSSProperties, type KeyboardEvent, type ClipboardEvent } from "react";
import type { ResumeData } from "@/constants/resume";
import { contactKind } from "@/lib/resume/contact";
import { contactIcons } from "./ContactIcon";
import { fonts, layouts, parseMarkup, themes, type ResumeStyle } from "@/lib/resume/styles";

function move<T>(arr: T[], i: number, dir: -1 | 1) {
  const j = i + dir;
  if (j < 0 || j >= arr.length) return;
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

export type Edit = (fn: (d: ResumeData) => void) => void;

const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const toHtml = (s: string) => parseMarkup(s).map((r) => (r.bold ? `<b>${escapeHtml(r.text)}</b>` : escapeHtml(r.text))).join("");

/** Reads an edited element back into `**bold**` markup. */
function fromNode(root: HTMLElement): string {
  const walk = (n: Node): string => {
    if (n.nodeType === 3) return n.textContent ?? "";
    if (n.nodeName === "BR") return " ";
    const el = n as HTMLElement;
    const inner = Array.from(el.childNodes).map(walk).join("");
    const bold = el.nodeName === "B" || el.nodeName === "STRONG" || parseInt(el.style?.fontWeight || "0", 10) >= 600;
    return bold && inner.trim() ? `**${inner}**` : inner;
  };
  return Array.from(root.childNodes).map(walk).join("").replace(/\*\*\*\*/g, "").replace(/\s+/g, " ").trim();
}

const EditableContext = createContext(false);

function Ed({ value, onCommit, className }: { value: string; onCommit: (v: string) => void; className?: string }) {
  const editable = useContext(EditableContext);
  return (
    <span
      className={className}
      contentEditable={editable}
      suppressContentEditableWarning
      spellCheck={false}
      dangerouslySetInnerHTML={{ __html: toHtml(value) }}
      onKeyDown={(e: KeyboardEvent<HTMLElement>) => {
        if (e.key === "Enter") {
          e.preventDefault();
          e.currentTarget.blur();
        }
      }}
      onPaste={(e: ClipboardEvent<HTMLElement>) => {
        e.preventDefault();
        document.execCommand("insertText", false, e.clipboardData.getData("text/plain").replace(/\s+/g, " "));
      }}
      onBlur={(e) => {
        const next = fromNode(e.currentTarget);
        if (next !== value) onCommit(next);
      }}
    />
  );
}

const css = `
.rs{background:#fff;color:#1f2328;width:210mm;min-height:297mm;box-sizing:border-box;padding:9mm 13mm 8mm;font-family:var(--ff);font-size:var(--base);line-height:1.4;text-align:left}
.rs *{box-sizing:border-box}
.rs p,.rs ul,.rs h1,.rs h2{margin:0;padding:0}
.rs b{font-weight:700;color:#000}
.rs a{color:inherit;text-decoration:none}
.rs h1{font-size:calc(var(--base)*2.55);line-height:1.05;color:var(--h);letter-spacing:.5px;text-transform:uppercase;font-weight:700}
.rs .title{font-size:calc(var(--base)*1.28);font-weight:600;color:var(--a);margin:2px 0 6px}
.rs .contact{font-size:calc(var(--base)*.96);line-height:1.4;margin-top:2px}
.rs .contact{display:flex;flex-direction:column;gap:3px}
.rs .crow{display:flex;flex-wrap:wrap;gap:0 20px}
.rs .citem{display:inline-flex;align-items:center;gap:6px;white-space:nowrap}
.rs .plink{display:inline-flex;align-items:center;gap:4px;margin-left:12px}
.rs .plink svg{color:var(--a);width:1em;height:1em}
.rs .banner{background:var(--chip);border-left:4px solid var(--a);padding:9px 14px 10px;margin:0 0 2px;border-radius:0 4px 4px 0}
.rs .citem svg{color:var(--a);flex:none;width:1.05em;height:1.05em}
.rs h2{font-size:calc(var(--base)*1.22);color:var(--h);text-transform:uppercase;letter-spacing:.8px;margin-top:var(--gap);margin-bottom:6px;padding-bottom:2px;border-bottom:1.5px solid var(--h);font-weight:700}
.rs .job{margin-bottom:var(--jobgap);position:relative}
.rs .head{display:flex;justify-content:space-between;align-items:baseline;gap:8px}
.rs .role{font-size:calc(var(--base)*1.12);font-weight:700;color:var(--h)}
.rs .dates{font-size:calc(var(--base)*.97);font-weight:600;color:#57606a;white-space:nowrap}
.rs .company{font-size:calc(var(--base)*1.02);font-weight:600;color:var(--a);margin-bottom:2px}
.rs .company .loc{color:#57606a;font-weight:400}
.rs ul{margin-top:3px;padding-left:15px;list-style:disc}
.rs li{margin-bottom:var(--li);position:relative}
.rs li::marker{color:var(--h)}
.rs .grid{display:grid;grid-template-columns:112px 1fr;row-gap:6px;align-items:baseline}
.rs .stack{margin-bottom:5px}
.rs .label{font-weight:700;color:var(--h);font-size:calc(var(--base)*.99)}
.rs .chips span.chip{display:inline-block;font-size:calc(var(--base)*.95);font-weight:600;padding:1px 7px;margin:0 3px 3px 0;border-radius:4px;background:var(--chip);color:#1f2328}
.rs .plain{font-size:calc(var(--base)*.97)}
.rs .cols{display:grid;grid-template-columns:1fr 31%;column-gap:6mm}
.rs [contenteditable="true"]{outline:none;border-radius:2px;cursor:text}
.rs [contenteditable="true"]:hover{background:rgba(232,113,10,.08)}
.rs [contenteditable="true"]:focus{background:rgba(232,113,10,.14)}
.rs .ctl{position:absolute;left:-40px;top:0;display:flex;gap:1px;opacity:0}
.rs .ctl button{border:0;background:none;color:#8c959f;cursor:pointer;font-size:9px;line-height:1.5;padding:0 2px}
.rs .ctl button:hover:not(:disabled){color:var(--a)}
.rs .ctl button:disabled{opacity:.25;cursor:default}
.rs .ctl .x{color:#c0392b;font-size:12px}
.rs li:hover .ctl{opacity:1}
.rs .add{position:absolute;right:0;bottom:0;border:0;background:#fff;color:#8c959f;cursor:pointer;font:inherit;font-size:calc(var(--base)*.9);padding:0 4px;opacity:0}
.rs .job:hover .add{opacity:1}
@media print{
 @page{size:A4;margin:0}
 .rs{height:297mm;overflow:hidden;box-shadow:none!important;margin:0!important}
 .rs [contenteditable="true"]:hover,.rs [contenteditable="true"]:focus{background:none}
 .rs .ctl,.rs .add{display:none}
}
`;

const Bullets = ({ list, onChange, onRemove, onMove, onAdd }: { list: string[]; onChange: (i: number, v: string) => void; onRemove: (i: number) => void; onMove: (i: number, dir: -1 | 1) => void; onAdd: () => void }) => (
  <BulletList list={list} onChange={onChange} onRemove={onRemove} onMove={onMove} onAdd={onAdd} />
);

function BulletList({ list, onChange, onRemove, onMove, onAdd }: { list: string[]; onChange: (i: number, v: string) => void; onRemove: (i: number) => void; onMove: (i: number, dir: -1 | 1) => void; onAdd: () => void }) {
  const editable = useContext(EditableContext);
  return (
  <>
    <ul>
      {list.map((b, i) => (
        <li key={i}>
          {editable && <span className="ctl">
            <button title="Move up" disabled={i === 0} onClick={() => onMove(i, -1)}>▲</button>
            <button title="Move down" disabled={i === list.length - 1} onClick={() => onMove(i, 1)}>▼</button>
            <button title="Remove bullet" className="x" onClick={() => onRemove(i)}>×</button>
          </span>}
          <Ed value={b} onCommit={(v) => onChange(i, v)} />
        </li>
      ))}
    </ul>
    {editable && <button className="add" onClick={onAdd}>+ add bullet</button>}
  </>
  );
}

export const ResumePreview = forwardRef<HTMLDivElement, { data: ResumeData; style: ResumeStyle; edit: Edit; editable: boolean }>(function ResumePreview({ data, style, edit, editable }, ref) {
  const t = themes[style.theme];
  const L = layouts[style.layout];
  const vars = { "--h": t.heading, "--a": t.accent, "--chip": t.chipBg, "--ff": fonts[style.font].css, "--base": `${+(L.base * fonts[style.font].scale).toFixed(2)}pt`, "--gap": `${L.gap}pt`, "--jobgap": `${L.gap * 0.7}pt`, "--li": `${L.gap * 0.3}pt` } as CSSProperties;

  const summary = (
    <>
      <h2>Summary</h2>
      <p>
        <Ed value={data.summary} onCommit={(v) => edit((d) => void (d.summary = v))} />
      </p>
    </>
  );

  const experience = (
    <>
      <h2>Experience</h2>
      {data.experience.map((j, ji) => (
        <div className="job" key={ji}>
          <div className="head">
            <Ed className="role" value={j.role} onCommit={(v) => edit((d) => void (d.experience[ji].role = v))} />
            <Ed className="dates" value={j.period} onCommit={(v) => edit((d) => void (d.experience[ji].period = v))} />
          </div>
          <p className="company">
            <Ed value={j.company} onCommit={(v) => edit((d) => void (d.experience[ji].company = v))} />
            <span className="loc"> · <Ed value={j.location} onCommit={(v) => edit((d) => void (d.experience[ji].location = v))} /></span>
          </p>
          <Bullets
            list={j.bullets}
            onChange={(i, v) => edit((d) => void (d.experience[ji].bullets[i] = v))}
            onRemove={(i) => edit((d) => void d.experience[ji].bullets.splice(i, 1))}
            onMove={(i, dir) => edit((d) => move(d.experience[ji].bullets, i, dir))}
            onAdd={() => edit((d) => void d.experience[ji].bullets.push("New bullet"))}
          />
        </div>
      ))}
    </>
  );

  const projects = (
    <>
      <h2>Projects</h2>
      {data.projects.map((p, pi) => (
        <div className="job" key={pi}>
          <div className="head">
            <Ed className="role" value={p.name} onCommit={(v) => edit((d) => void (d.projects[pi].name = v))} />
            <span className="dates">
              {p.links.map((l, i) => {
                const Icon = contactIcons[contactKind(l)];
                return (
                  <span className="plink" key={i}>
                    <Icon aria-hidden />
                    <a href={l.href}>{l.label}</a>
                  </span>
                );
              })}
            </span>
          </div>
          <Bullets
            list={p.bullets}
            onChange={(i, v) => edit((d) => void (d.projects[pi].bullets[i] = v))}
            onRemove={(i) => edit((d) => void d.projects[pi].bullets.splice(i, 1))}
            onMove={(i, dir) => edit((d) => move(d.projects[pi].bullets, i, dir))}
            onAdd={() => edit((d) => void d.projects[pi].bullets.push("New bullet"))}
          />
        </div>
      ))}
    </>
  );

  const items = (list: string[]) =>
    t.chips
      ? list.map((s) => <span className="chip" key={s}>{s} </span>)
      : list.join(", ");

  const skills = (
    <>
      <h2>Skills</h2>
      <div className={L.sidebar ? undefined : "grid"}>
        {data.skills.map((s) =>
          L.sidebar ? (
            <div className="stack" key={s.label}>
              <div className="label">{s.label}</div>
              <div className={t.chips ? "chips" : "plain"}>{items(s.items)}</div>
            </div>
          ) : (
            <div key={s.label} style={{ display: "contents" }}>
              <span className="label">{s.label}</span>
              <span className={t.chips ? "chips" : "plain"}>{items(s.items)}</span>
            </div>
          ),
        )}
      </div>
    </>
  );

  const e = data.education;
  const education = (
    <>
      <h2>Education</h2>
      {L.sidebar ? (
        <div>
          <b><Ed value={e.degree} onCommit={(v) => edit((d) => void (d.education.degree = v))} /></b>
          <div><Ed value={e.school} onCommit={(v) => edit((d) => void (d.education.school = v))} /></div>
          <div className="dates"><Ed value={e.period} onCommit={(v) => edit((d) => void (d.education.period = v))} /></div>
        </div>
      ) : (
        <div className="head">
          <span>
            <b><Ed value={e.degree} onCommit={(v) => edit((d) => void (d.education.degree = v))} /></b> · <Ed value={e.school} onCommit={(v) => edit((d) => void (d.education.school = v))} />
          </span>
          <Ed className="dates" value={e.period} onCommit={(v) => edit((d) => void (d.education.period = v))} />
        </div>
      )}
    </>
  );

  return (
    <EditableContext.Provider value={editable}>
    <div ref={ref} id="resume-sheet" className="rs" style={vars}>
      <style>{css}</style>
      <header className={L.banner ? "banner" : undefined}>
        <h1><Ed value={data.name} onCommit={(v) => edit((d) => void (d.name = v))} /></h1>
        <p className="title"><Ed value={data.title} onCommit={(v) => edit((d) => void (d.title = v))} /></p>
        <div className="contact">
          {[data.contact.slice(0, 3), data.contact.slice(3)].map((row, r) => (
            <div className="crow" key={r}>
              {row.map((c, i) => {
                const Icon = contactIcons[contactKind(c)];
                return (
                  <span className="citem" key={i}>
                    <Icon aria-hidden />
                    {c.href ? <a href={c.href}>{c.label}</a> : c.label}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </header>
      {L.sidebar ? (
        <div className="cols">
          <div>{summary}{experience}{projects}</div>
          <div>{skills}{education}</div>
        </div>
      ) : (
        <>
          {summary}
          {skills}
          {experience}
          {projects}
          {education}
        </>
      )}
    </div>
    </EditableContext.Provider>
  );
});
