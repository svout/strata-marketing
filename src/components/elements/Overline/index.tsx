import clsx from "clsx";

/** mono/overline: Plex Mono, caps, wide tracking, brand-on-subtle colour. */
export function Overline({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={clsx(
        "font-mono text-overline uppercase tracking-[0.1em] text-brand-on-subtle md:text-label md:font-medium",
        className,
      )}
    >
      {children}
    </p>
  );
}

export default Overline;
