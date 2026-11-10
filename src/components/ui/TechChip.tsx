import { TechLogo } from "@/lib/techLogos";

/** A skill pill with its logo. Always white with dark text so brand colours read in both themes. */
export function TechChip({ name, size = "sm", iconOnly = false }: { name: string; size?: "sm" | "lg"; iconOnly?: boolean }) {
  const lg = size === "lg";
  // logo-only pill: the name stays as a tooltip and screen-reader label
  if (iconOnly) {
    return (
      <span title={name} role="img" aria-label={name} className="inline-grid h-7 w-7 place-items-center rounded-full border-2 border-ink bg-white transition duration-200 hover:-translate-y-0.5 hover:rotate-2">
        <TechLogo name={name} size={16} />
      </span>
    );
  }
  return (
    <span
      className={`inline-flex items-center border-2 border-ink bg-white font-semibold text-[#1f2430] transition duration-200 hover:-translate-y-0.5 hover:rotate-1 ${
        lg ? "gap-2 rounded-xl py-1.5 pl-2.5 pr-3.5 text-sm shadow-[2px_2px_0_var(--shadow)]" : "gap-1.5 rounded-full py-0.5 pl-1.5 pr-2.5 text-xs hover:rotate-2"
      }`}
    >
      <TechLogo name={name} size={lg ? 18 : 15} />
      {name}
    </span>
  );
}
