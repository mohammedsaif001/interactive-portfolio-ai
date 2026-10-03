import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { Sketch, SectionTitle, Tag } from "@/components/ui/Sketch";

export function Projects() {
  return (
    <Sketch seed={31} className="p-6 sm:p-8">
      <SectionTitle n={2} color="blue">
        Things I&apos;ve built
      </SectionTitle>
      <div className="space-y-5">
        {profile.projects.map((p, i) => (
          <Sketch key={p.title} as="a" href={p.href} fill={p.color} seed={40 + i} roughness={1.1} className="block p-4 transition hover:-translate-y-1">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-hand text-3xl font-bold leading-none">{p.title}</h3>
              <ArrowUpRight size={20} aria-hidden />
            </div>
            <p className="mt-1.5 text-sm leading-relaxed">{p.blurb}</p>
            <p className="mt-2 text-sm font-bold">★ {p.impact}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </Sketch>
        ))}
      </div>
    </Sketch>
  );
}
