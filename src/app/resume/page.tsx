import type { Metadata } from "next";
import { ResumeBuilder } from "@/components/resume/ResumeBuilder";

export const metadata: Metadata = {
  title: "Resume",
  description: "Mohammed Saif's resume: pick a color, font and layout, then download it as Word or PDF.",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return <ResumeBuilder />;
}
