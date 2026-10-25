import clsx from "clsx";
import type { CodeLine } from "@/types/home";

/**
 * Highlighted code for dark surfaces. Lines are [text, kind] tokens from
 * the content files, so there's no highlighter library and the colours
 * come from the brand palette:
 * strings mint, numbers amber, keys cobalt-300, comments mist.
 *
 * The <pre> is focusable and scrolls sideways on its own, so long lines
 * never make the page scroll horizontally.
 */
const tokenColour = {
  plain: "text-[#C9CBD1]",
  comment: "text-mist",
  str: "text-mint",
  num: "text-amber",
  key: "text-cobalt-300",
} as const;

type CodeBlockProps = {
  lines?: CodeLine[];
  /** Plain code (no highlighting), e.g. the quickstart steps */
  text?: string;
  label: string;
  className?: string;
};

export function CodeBlock({ lines, text, label, className }: CodeBlockProps) {
  return (
    <pre
      aria-label={label}
      tabIndex={0}
      className={clsx("overflow-x-auto font-mono text-[13px] leading-[1.85] md:text-[14px]", className)}
    >
      <code>
        {lines
          ? lines.map((line, i) => (
              <span key={i} className="block">
                {line.map(([t, kind], j) => (
                  <span key={j} className={tokenColour[kind]}>
                    {t}
                  </span>
                ))}
              </span>
            ))
          : <span className="text-[#E4E6EB]">{text}</span>}
      </code>
    </pre>
  );
}

export default CodeBlock;
