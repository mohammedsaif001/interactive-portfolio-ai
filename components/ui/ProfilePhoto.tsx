import { BadgeCheck } from "lucide-react";
import { profile } from "@/data/profile";

const sizes = {
  lg: "h-[170px] w-[170px] sm:h-[210px] sm:w-[210px]",
  md: "h-[120px] w-[120px] sm:h-[140px] sm:w-[140px]",
};

/** The real photo as a taped-on polaroid. */
export function ProfilePhoto({ size = "lg", className = "" }: { size?: keyof typeof sizes; className?: string }) {
  return (
    <div className={`relative shrink-0 -rotate-3 ${className}`}>
      <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2" />
      <div className="border-2 border-ink bg-white p-2 pb-9 shadow-[4px_4px_0_var(--shadow)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={profile.photo} alt={`${profile.name}, profile photo`} className={`block object-cover object-[50%_30%] ${sizes[size]}`} />
      </div>
      <span className="font-hand absolute bottom-1 left-0 right-0 text-center text-xl text-[#1f2430]">that&apos;s me!</span>
      <span aria-hidden className="absolute -bottom-3 -right-3 grid h-9 w-9 place-items-center rounded-full border-2 border-ink bg-mint shadow-[2px_2px_0_var(--shadow)]">
        <BadgeCheck size={20} />
      </span>
    </div>
  );
}
