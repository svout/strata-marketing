import clsx from "clsx";
import Title from "../Title";
import { Overline } from "../Overline";

/**
 * Overline + section title on the left, an optional aside (text or
 * buttons) on the right that drops below on narrow screens.
 * `titleId` is used by the section's aria-labelledby.
 */
type SectionHeaderProps = {
  overline: string;
  title: React.ReactNode;
  titleId: string;
  lede?: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
};

export function SectionHeader({ overline, title, titleId, lede, aside, className }: SectionHeaderProps) {
  return (
    <div className={clsx("flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16", className)}>
      <div className="flex max-w-[780px] flex-col gap-4 md:gap-5">
        <Overline>{overline}</Overline>
        <Title as="h2" variant="h1" id={titleId}>
          {title}
        </Title>
        {lede && <p className="text-body-lg text-fg-muted md:text-lg">{lede}</p>}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </div>
  );
}

export default SectionHeader;
