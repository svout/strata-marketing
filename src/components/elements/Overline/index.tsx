import clsx from "clsx";

/** Eyebrow: Geist Mono, caps, +10% tracking, cobalt-light (v2). */
export function Overline({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={clsx(
        "font-mono text-[12px] uppercase tracking-[0.1em] text-cobalt-light",
        className,
      )}
    >
      {children}
    </p>
  );
}

export default Overline;
