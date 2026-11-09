import { Download, Mail, Send, Smile } from "lucide-react";
import { profile } from "@/data/profile";
import { Sketch, SectionTitle } from "@/components/ui/Sketch";
import { SocialLinks } from "./SocialLinks";
import { CurvyArrow, FloatIcon } from "@/components/ui/Doodles";

export function ResumeButton({ className = "" }: { className?: string }) {
  if (!profile.resumeHref) return null; // no PDF yet: hide the button instead of linking to a 404
  return (
    <a
      href={profile.resumeHref}
      download
      className={`inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-coral px-5 py-3 text-base font-bold shadow-[4px_4px_0_var(--shadow)] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--shadow)] active:translate-y-0.5 active:shadow-[2px_2px_0_var(--shadow)] ${className}`}
    >
      <Download size={18} aria-hidden /> Download resume
    </a>
  );
}

/** Contact card. `hideTitle` is for places (like the overview) that already render their own heading. */
export function Contact({ hideTitle = false }: { hideTitle?: boolean }) {
  return (
    <Sketch seed={71} fill="yellow" className="p-6 sm:p-8">
      <FloatIcon icon={Smile} color="green" className="-right-5 -top-5" rotate={10} />
      {!hideTitle && (
        <SectionTitle icon={Send} color="coral">
          Let&apos;s talk
        </SectionTitle>
      )}
      <p className="mb-5 text-[15px] leading-relaxed">
        {profile.availability}. {profile.resumeHref ? "Grab my resume, or say hi." : "Say hi."}
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <ResumeButton />
        {/* the doodle hangs off this wrapper, so it stays pointed at the email button however the row wraps */}
        <div className="relative">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-card px-5 py-3 font-bold shadow-[4px_4px_0_var(--shadow)] transition hover:-translate-y-0.5"
          >
            <Mail size={18} aria-hidden /> {profile.email}
          </a>
          <CurvyArrow up label="say hi!" className="left-1/2 top-full -ml-11 mt-2" />
        </div>
      </div>
      <div className="mt-20">
        <SocialLinks />
      </div>
    </Sketch>
  );
}
