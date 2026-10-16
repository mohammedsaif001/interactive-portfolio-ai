/**
 * A pencil-sketch version of the portrait, used as the logo in every header.
 * The sketch is a mask (public/mohammed-saif-sketch.png), so the strokes are painted in the theme's
 * ink colour and stay readable in both the paper and the dark theme.
 */
export function DoodleAvatar({ size = 48, className = "" }: { size?: number; className?: string }) {
  const mask = "url(/mohammed-saif-sketch.png)";
  return (
    <span
      role="img"
      aria-label="Sketch portrait of Mohammed Saif"
      className={`relative inline-block shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* hand-drawn blob frame: uneven radii so it never looks like a perfect circle */}
      <span
        className="absolute inset-0 overflow-hidden border-2 border-ink shadow-[3px_3px_0_var(--shadow)]"
        style={{ borderRadius: "58% 42% 52% 48% / 46% 56% 44% 54%", background: "var(--yellow)" }}
      >
        <span
          className="block h-full w-full"
          style={{
            backgroundColor: "var(--ink)",
            WebkitMaskImage: mask,
            maskImage: mask,
            WebkitMaskSize: "cover",
            maskSize: "cover",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        />
      </span>
      {/* little doodle sparkle on the corner */}
      <svg aria-hidden viewBox="0 0 24 24" width={size * 0.36} height={size * 0.36} className="float absolute -right-1.5 -top-2 text-accent" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
        <path d="M12 2v6M12 16v6M2 12h6M16 12h6" />
      </svg>
    </span>
  );
}
