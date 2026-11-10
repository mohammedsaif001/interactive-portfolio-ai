import { profile } from "@/constants";
import { TechLogo } from "@/lib/techLogos";

export function SocialLinks({ showHandle = false }: { showHandle?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-3">
      {profile.socials.map((s) => (
        <li key={s.id}>
          <a
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            className="group flex items-center gap-2 rounded-full border-2 border-ink bg-card py-1 pl-1 pr-3 text-sm font-semibold shadow-[2px_2px_0_var(--shadow)] transition hover:-translate-y-0.5 hover:bg-sun"
          >
            {/* white tile so the original brand colours show in both themes */}
            <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-ink bg-white">
              <TechLogo name={s.id} size={16} />
            </span>
            {s.label}
            {showHandle && <span className="font-normal text-muted">{s.handle}</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}
