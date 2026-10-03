import { profile } from "@/data/profile";
import { Sketch, SectionTitle, Tag } from "@/components/ui/Sketch";

function FlowArrow({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden width="44" height="20" viewBox="0 0 44 20" fill="none" className={className} style={{ filter: "url(#wobble)" }}>
      <path d="M2 10h36M30 3l9 7-9 7" stroke="#1f2430" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Skills drawn as a tiny system-architecture diagram: client -> API -> AI -> cloud. */
export function Skills() {
  return (
    <Sketch seed={51} className="p-6 sm:p-8">
      <SectionTitle n={4} color="green">
        What I work with
      </SectionTitle>
      <p className="-mt-2 mb-5 text-sm text-muted">My toolkit, drawn as the system I usually build.</p>
      <div className="grid grid-cols-1 items-center gap-y-3 sm:grid-cols-[1fr_auto_1fr]">
        {profile.skills.map((s, i) => (
          <SkillNode key={s.id} index={i} />
        ))}
      </div>
    </Sketch>
  );
}

function SkillNode({ index }: { index: number }) {
  const s = profile.skills[index];
  const box = (
    <Sketch fill={s.color} seed={60 + index} roughness={1.2} className="p-4">
      <h3 className="font-hand text-3xl font-bold leading-none">{s.title}</h3>
      <p className="mb-2 text-xs text-ink/70">{s.plain}</p>
      <div className="flex flex-wrap gap-1.5">
        {s.items.map((it) => (
          <Tag key={it}>{it}</Tag>
        ))}
      </div>
    </Sketch>
  );
  // grid is 2 columns of boxes with an arrow gutter; arrows sit after boxes 0 and 2 (row-wise)
  if (index % 2 === 0) {
    return (
      <>
        {box}
        <FlowArrow className="mx-auto hidden sm:block" />
      </>
    );
  }
  return box;
}
