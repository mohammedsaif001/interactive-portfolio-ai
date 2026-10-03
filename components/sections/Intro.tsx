import { MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { Sketch } from "@/components/ui/Sketch";
import { SocialLinks } from "./SocialLinks";

export function Intro() {
  return (
    <Sketch fill="card" seed={11} className="p-6 sm:p-8">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <div className="relative shrink-0 -rotate-3">
          <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2" />
          <div className="border-2 border-ink bg-white p-2 pb-8 shadow-[4px_4px_0_#1f2430]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/avatar.svg" alt={`${profile.name}, profile photo`} width={150} height={150} className="block h-[150px] w-[150px] object-cover" />
          </div>
          <span className="font-hand absolute bottom-1 left-0 right-0 text-center text-xl">that&apos;s me!</span>
        </div>

        <div className="text-center sm:text-left">
          <p className="font-hand text-2xl text-muted">Hi, I&apos;m</p>
          <h1 className="font-hand text-6xl font-bold leading-[0.95]">
            <span className="marker">{profile.name}</span>
          </h1>
          <p className="mt-3 text-lg font-semibold">
            {profile.role} <span className="text-muted">· {profile.subtitle}</span>
          </p>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">{profile.tagline}</p>
          <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium">
            <MapPin size={15} /> {profile.location}
          </p>
          <div className="mt-4 flex justify-center sm:justify-start">
            <SocialLinks />
          </div>
        </div>
      </div>
    </Sketch>
  );
}
