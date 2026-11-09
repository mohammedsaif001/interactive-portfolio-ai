/**
 * The hand-drawn portrait, used as the logo in every header. It sits on its own paper-coloured
 * tile inside a wobbly blob frame, so it looks right on both the paper and the dark theme.
 */
export function DoodleAvatar({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    <span className={`relative inline-block shrink-0 ${className}`} style={{ width: size, height: size }}>
      <span
        className="absolute inset-0 overflow-hidden border-2 border-ink bg-white shadow-[3px_3px_0_var(--shadow)]"
        style={{ borderRadius: "58% 42% 52% 48% / 46% 56% 44% 54%" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/mohammed-doodle.webp" alt="Pencil sketch portrait of Mohammed Saif" width={size} height={size} className="h-full w-full object-cover" />
      </span>
      {/* little doodle sparkle on the corner */}
      <svg aria-hidden viewBox="0 0 24 24" width={size * 0.36} height={size * 0.36} className="float absolute -left-2 -top-2.5 text-accent" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
        <path d="M12 2v6M12 16v6M2 12h6M16 12h6" />
      </svg>
    </span>
  );
}
