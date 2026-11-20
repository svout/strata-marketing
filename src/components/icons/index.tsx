/**
 * Line icons on a 24 px grid, 1.75 stroke, round caps (Brand Guidelines
 * → Graphic language). They inherit currentColor; ink by default, cobalt
 * when active. All are decorative (aria-hidden): the control that holds
 * them carries the accessible name.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const Base = ({ size = 24, children, ...rest }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    focusable="false"
    {...rest}
  >
    {children}
  </svg>
);

/** Menu: three shifted lines, echoing the mark (W6 header) */
const Menu = (p: IconProps) => (
  <Base {...p}>
    <path d="M8 7h12M6 12h12M4 17h12" />
  </Base>
);
const Close = (p: IconProps) => (
  <Base {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Base>
);
const ArrowRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Base>
);
const ChevronDown = (p: IconProps) => (
  <Base {...p}>
    <path d="m6 9 6 6 6-6" />
  </Base>
);
const Check = (p: IconProps) => (
  <Base {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Base>
);
const Alert = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 4 3 19.5h18z" />
    <path d="M12 10v4M12 16.8v.2" />
  </Base>
);
const Shield = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
    <path d="M9 12l2 2 4-4" />
  </Base>
);
/** Ledger: a page of entries (Security pillars) */
const Ledger = (p: IconProps) => (
  <Base {...p}>
    <rect x="4" y="3" width="16" height="18" rx="3" />
    <path d="M8 8h8M8 12h8M8 16h5" />
  </Base>
);
const Pulse = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 12h4l2-6 4 12 2-6h6" />
  </Base>
);
const Download = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </Base>
);
const Pause = (p: IconProps) => (
  <Base {...p}>
    <path d="M9 6v12M15 6v12" />
  </Base>
);
const Play = (p: IconProps) => (
  <Base {...p}>
    <path d="M8 5.5v13l10-6.5z" />
  </Base>
);

/** Link: two chain halves (copy link) */
const Link = (p: IconProps) => (
  <Base {...p}>
    <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1" />
    <path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1" />
  </Base>
);
/** LinkedIn, drawn in the same line style as the set (share and follow links) */
const LinkedIn = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <path d="M8 10.5V17M8 7.5v.01M12 17v-6.5M12 13.5a2.5 2.5 0 0 1 5 0V17" />
  </Base>
);
/** X (formerly Twitter) */
const X = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 4h4.5L20 20h-4.5z" />
    <path d="M19.5 4l-6.6 7.2M4.5 20l6.6-7.2" />
  </Base>
);
/** RSS feed */
const Rss = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 19h.01M5 12a7 7 0 0 1 7 7M5 5a14 14 0 0 1 14 14" />
  </Base>
);

export const Icons = {
  Menu,
  Close,
  ArrowRight,
  ChevronDown,
  Check,
  Alert,
  Shield,
  Ledger,
  Pulse,
  Download,
  Pause,
  Play,
  Link,
  LinkedIn,
  X,
  Rss,
};
