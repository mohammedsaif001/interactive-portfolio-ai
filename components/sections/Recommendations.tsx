import { profile } from "@/data/profile";
import { SectionTitle } from "@/components/ui/Sketch";

const notes = [
  { bg: "#ffe27a", rot: "-rotate-2" },
  { bg: "#ff9b85", rot: "rotate-1" },
  { bg: "#a9e6b8", rot: "-rotate-1" },
];

export function Recommendations() {
  return (
    <div className="p-2 sm:p-4">
      <SectionTitle n={3} color="coral">
        Kind words
      </SectionTitle>
      <div className="space-y-5">
        {profile.recommendations.map((r, i) => (
          <figure key={i} className={`sticky relative border-2 border-ink p-5 ${notes[i % 3].rot}`} style={{ background: notes[i % 3].bg }}>
            <span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-ink bg-coral" aria-hidden />
            <blockquote className="font-hand text-[26px] leading-[1.1]">&ldquo;{r.quote}&rdquo;</blockquote>
            <figcaption className="mt-3 text-sm font-semibold">
              {r.name} <span className="font-normal">· {r.title}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
