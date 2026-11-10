import { TechLogo } from "@/lib/techLogos";

/** A skill pill with its logo. Always white with dark text so brand colours read in both themes. */
export function TechChip({ name, size = "sm" }: { name: string; size?: "sm" | "lg" }) {
  const lg = size === "lg";
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
