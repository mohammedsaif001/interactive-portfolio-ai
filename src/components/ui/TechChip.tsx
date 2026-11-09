import { TechLogo } from "@/lib/techLogos";

/** A skill pill with its logo. Always white with dark text so brand colours read in both themes. */
export function TechChip({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-white py-0.5 pl-1.5 pr-2.5 text-xs font-semibold text-[#1f2430] transition duration-200 hover:-translate-y-0.5 hover:rotate-2">
      <TechLogo name={name} size={15} />
      {name}
    </span>
  );
}
