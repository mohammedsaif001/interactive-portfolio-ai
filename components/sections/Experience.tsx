import { profile } from "@/data/profile";
import { Sketch, SectionTitle } from "@/components/ui/Sketch";

export function Experience() {
  return (
    <Sketch seed={21} className="p-6 sm:p-8">
      <SectionTitle n={1} color="yellow">
        Where I&apos;ve worked
      </SectionTitle>
      <ol className="relative ml-3 border-l-[3px] border-dashed border-ink/60 pl-6">
        {profile.experience.map((job, i) => (
          <li key={job.company} className="relative pb-6 last:pb-0">
            <span
              className="absolute -left-[37px] top-1 h-5 w-5 rounded-full border-2 border-ink"
              style={{ background: i === 0 ? "#ff9b85" : "#fffdf7" }}
            />
            <p className="font-hand text-xl text-muted">{job.period}</p>
            <h3 className="text-lg font-bold leading-tight">{job.role}</h3>
            <p className="font-semibold text-muted">{job.company}</p>
            <ul className="mt-2 space-y-1 text-sm leading-relaxed">
              {job.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span aria-hidden>✦</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Sketch>
  );
}
