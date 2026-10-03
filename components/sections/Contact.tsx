import { Download, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { Sketch, SectionTitle } from "@/components/ui/Sketch";
import { SocialLinks } from "./SocialLinks";

export function ResumeButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={profile.resumeHref}
      download
      className={`inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-coral px-5 py-3 text-base font-bold shadow-[4px_4px_0_#1f2430] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#1f2430] active:translate-y-0.5 active:shadow-[2px_2px_0_#1f2430] ${className}`}
    >
      <Download size={18} aria-hidden /> Download resume
    </a>
  );
}

export function Contact() {
  return (
    <Sketch seed={71} fill="yellow" className="p-6 sm:p-8">
      <SectionTitle n={5} color="coral">
        Let&apos;s talk
      </SectionTitle>
      <p className="mb-5 text-[15px] leading-relaxed">
        {profile.availability}. Grab my resume, or say hi.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <ResumeButton />
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-card px-5 py-3 font-bold shadow-[4px_4px_0_#1f2430] transition hover:-translate-y-0.5"
        >
          <Mail size={18} aria-hidden /> {profile.email}
        </a>
      </div>
      <div className="mt-5">
        <SocialLinks />
      </div>
    </Sketch>
  );
}
