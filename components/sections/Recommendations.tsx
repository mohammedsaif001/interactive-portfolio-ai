import { Heart, Quote, Star } from "lucide-react";
import { profile } from "@/data/profile";
import { FloatIcon } from "@/components/ui/Doodles";
import { SectionTitle } from "@/components/ui/Sketch";

const notes = [
  { bg: "var(--yellow)", rot: "-rotate-2", delay: "0s" },
  { bg: "var(--coral)", rot: "rotate-1", delay: "1.2s" },
  { bg: "var(--green)", rot: "-rotate-1", delay: "2.4s" },
];

export function Recommendations() {
  return (
    <div className="relative p-2 sm:p-4">
      <FloatIcon icon={Star} color="yellow" className="-right-2 top-0" rotate={14} />
      <SectionTitle icon={Heart} color="coral">
        Kind words
      </SectionTitle>
      <div className="space-y-5">
        {profile.recommendations.map((r, i) => (
          <figure key={i} className={`sticky relative border-2 border-ink p-5 ${notes[i % 3].rot}`} style={{ background: notes[i % 3].bg }}>
            <span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-ink bg-coral" aria-hidden />
            <Quote size={20} aria-hidden className="mb-1 opacity-60" />
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
